const assert = require('assert');
const fs = require('fs');
const path = require('path');
const os = require('os');
const {spawnSync} = require('child_process');
const {root} = require('./vocabulary-tools.cjs');
const temp = fs.realpathSync(os.tmpdir());
const fixture = fs.mkdtempSync(path.join(temp,'nihongo-vocabulary-completion-'));
const files = ['vocab-n5.js','vocab-n4.js','vocab-n3.js','vocab-n2.js','vocab-n1.js','vocab-correction-rules.js'];
const snapshot = () => files.map(f=>fs.readFileSync(path.join(fixture,f),'utf8'));
function run(script,args=[],success=true) {
  const result=spawnSync(process.execPath,[script,...args],{cwd:fixture,encoding:'utf8'});
  assert(!result.error,result.error?.message);
  assert.equal(result.status===0,success,result.stderr||result.stdout);
}
try {
  for (const name of fs.readdirSync(root)) if (/\.js$/.test(name)) fs.copyFileSync(path.join(root,name),path.join(fixture,name));
  fs.cpSync(path.join(root,'scripts'),path.join(fixture,'scripts'),{recursive:true});
  assert(!fs.existsSync(path.join(fixture,'.content-cache')),'Fixture must have no research cache');
  run('scripts/import-vocabulary-completion.cjs');
  const once = snapshot();
  run('scripts/import-vocabulary-completion.cjs');
  assert.deepStrictEqual(snapshot(),once,'Repeated completion import changes files');
  run('scripts/audit-vocabulary-completion.cjs',['--progress']);
  run('scripts/audit-vocabulary-completion.cjs',[],false);
  // The legacy content editor writes diagnostics here; no reference inputs.
  fs.mkdirSync(path.join(fixture,'.content-cache'));
  for (const legacy of ['scripts/import-vocabulary-additions.cjs','scripts/edit-content.cjs']) {
    run(legacy);
    run('scripts/audit-vocabulary-completion.cjs',['--progress']);
    run('scripts/import-vocabulary-completion.cjs');
    const replay = snapshot();
    for (let i=0;i<files.length;i++) if(replay[i]!==once[i]) {
      let offset=0; while(replay[i][offset]===once[i][offset]) offset++;
      throw new Error(legacy+' changes '+files[i]+' at '+offset+': '+JSON.stringify([once[i].slice(offset,offset+140),replay[i].slice(offset,offset+140)]));
    }
  }
  const batchFile = path.join(fixture,'scripts/vocabulary-completion/001.json');
  const authored = JSON.parse(fs.readFileSync(batchFile,'utf8'));
  const invalid = [
    b=>{b.additions[0].entry.examples[1].japanese=b.additions[0].entry.examples[0].japanese;},
    b=>{b.additions[0].entry.examples[0].romaji='';},
    b=>{b.updates[0].id='vocab-n5:999999';},
    b=>{b.updates[0].originalMeaning='unrelated sense';},
    b=>{b.updates[0].patch.level='N1';},
    b=>{b.decisions[0].targets=['nonexistent|むこう'];},
    b=>{b.decisions.push(b.decisions[0]);},
    b=>{b.additions[0].evidence=[];},
    b=>{delete b.updates[0].review.contexts;},
    b=>{b.updates[0].patch.aliases='not-an-array';}
  ];
  for (const mutate of invalid) {
    const b=structuredClone(authored); mutate(b);
    fs.writeFileSync(batchFile,JSON.stringify(b));
    run('scripts/import-vocabulary-completion.cjs',[],false);
    assert.deepStrictEqual(snapshot(),once,'Rejected authoring wrote data');
  }
  console.log('Completion import: offline replay, stable identities, legacy replay, open completion gate, and '+invalid.length+' rejection-before-write cases passed.');
} finally {
  const resolved=fs.realpathSync(fixture);
  assert.equal(path.dirname(resolved).toLowerCase(),temp.toLowerCase());
  assert(path.basename(resolved).startsWith('nihongo-vocabulary-completion-'));
  fs.rmSync(resolved,{recursive:true,force:true});
}
