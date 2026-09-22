# Uses the native Windows speech API and preserves its 16 kHz PCM output.
param([string]$Only = '')
$ErrorActionPreference = 'Stop'
# WinRT projection requires Windows PowerShell/.NET Framework. The override is process-local.
if ($PSVersionTable.PSVersion.Major -ge 6) {
  & "$env:WINDIR/System32/WindowsPowerShell/v1.0/powershell.exe" -NoProfile -ExecutionPolicy Bypass -File $PSCommandPath -Only $Only
  if ($LASTEXITCODE -ne 0) { throw "Native audio generation failed ($LASTEXITCODE)" }
  exit 0
}
Add-Type -AssemblyName System.Runtime.WindowsRuntime
[Windows.Media.SpeechSynthesis.SpeechSynthesizer,Windows.Media.SpeechSynthesis,ContentType=WindowsRuntime] | Out-Null
[Windows.Storage.Streams.DataReader,Windows.Storage.Streams,ContentType=WindowsRuntime] | Out-Null
$asTask = [System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object { $_.Name -eq 'AsTask' -and $_.IsGenericMethod -and $_.GetParameters().Count -eq 1 -and $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncOperation`1' } | Select-Object -First 1
function Await-Result($operation, [Type]$resultType) {
  $task = $asTask.MakeGenericMethod($resultType).Invoke($null, @($operation))
  $task.GetAwaiter().GetResult()
}
$projectRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$manifest = Get-Content -LiteralPath (Join-Path $projectRoot 'audio-manifest.json') -Raw -Encoding utf8 | ConvertFrom-Json
$stagingRoot = Join-Path $projectRoot '.content-cache/native-audio'
New-Item -ItemType Directory -Path $stagingRoot -Force | Out-Null
$synth = [Windows.Media.SpeechSynthesis.SpeechSynthesizer]::new()
try {
  foreach ($unit in $manifest) {
    if ($Only -and $unit.id -ne $Only) { continue }
    if ($unit.id -notmatch '^listening-n[1-5]-[1-9][0-9]*$') { throw 'Unexpected unit ID' }
    $synth.Options.SpeakingRate = $unit.speakingRate
    $index = 0
    foreach ($segment in $unit.segments) {
      $voice = [Windows.Media.SpeechSynthesis.SpeechSynthesizer]::AllVoices | Where-Object { $_.DisplayName -eq $segment.voice -and $_.Language -eq 'ja-JP' } | Select-Object -First 1
      if (-not $voice) { throw ('Missing Japanese voice: ' + $segment.voice) }
      $synth.Voice = $voice
      $stream = Await-Result ($synth.SynthesizeTextToStreamAsync($segment.text)) ([Windows.Media.SpeechSynthesis.SpeechSynthesisStream])
      $reader = [Windows.Storage.Streams.DataReader]::new($stream)
      try {
        $null = Await-Result ($reader.LoadAsync([uint32]$stream.Size)) ([uint32])
        $bytes = New-Object byte[] ([int]$stream.Size)
        $reader.ReadBytes($bytes)
        [IO.File]::WriteAllBytes((Join-Path $stagingRoot ($unit.id + '-' + $index + '.wav')), $bytes)
      } finally { $reader.Dispose(); $stream.Dispose() }
      $index++
    }
    Write-Output ($unit.id + ': ' + $index + ' native speech segments')
  }
} finally { $synth.Dispose() }
# Validate and package every selected unit before replacing bundled assets.
& node (Join-Path $PSScriptRoot 'pack-comprehension-audio.cjs') $Only
if ($LASTEXITCODE -ne 0) { throw 'Audio packaging failed' }
