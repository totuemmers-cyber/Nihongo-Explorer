"""Record wordfreq Zipf frequencies for the vocabulary-level calibration.

Usage (from the repository root):
    pip install 'wordfreq[mecab]==3.1.1'
    node scripts/build-vocabulary-levels.cjs --words
    python3 -I scripts/research-vocabulary-frequency.py .content-cache/vocabulary-levels

Reads words.json from the cache folder and writes frequency.json next to it.
wordfreq data: CC BY-SA 4.0, https://github.com/rspeer/wordfreq
"""
import json
import sys
from importlib import metadata
from pathlib import Path

import wordfreq


def main():
    folder = Path(sys.argv[1])
    words = json.loads((folder / 'words.json').read_text(encoding='utf-8'))
    values = {}
    for word in words:
        bare = word.replace('〜', '').replace('～', '').replace('~', '')
        values[word] = {
            'zipf': wordfreq.zipf_frequency(bare, 'ja'),
            'tokens': len(wordfreq.tokenize(bare, 'ja')),
        }
    versions = {name: metadata.version(name) for name in ('wordfreq', 'mecab-python3', 'ipadic')}
    out = {'source': 'wordfreq', 'language': 'ja', 'versions': versions, 'values': values}
    (folder / 'frequency.json').write_text(json.dumps(out, ensure_ascii=False, sort_keys=True), encoding='utf-8')
    print('wrote', len(values), 'frequencies with', versions)


if __name__ == '__main__':
    main()
