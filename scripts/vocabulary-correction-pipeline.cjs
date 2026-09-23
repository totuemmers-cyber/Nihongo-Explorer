// Version 2: evidence-backed corrections and full-corpus editorial coverage.
// Research is deliberately separate from this deterministic, offline importer.
const assert = require('assert');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const {root, read, levels, key, loadVocabulary} = require('./vocabulary-tools.cjs');
const {requirements:reviewRequirements,SUPPORTED_POLICY_IDS} = require('./vocabulary-review-policy.cjs');
const hash = v => crypto.createHash('sha256').update(JSON.stringify(v)).digest('hex');
const clone = v => JSON.parse(JSON.stringify(v));
const text = v => typeof v === 'string' && v.trim().length > 0;
const fields = ['word','reading','romaji','meaning','type','category','level','notes','examples','aliases','pitch',
  'verbGroup','conjugation','conjugationKind','conjugationReading','conjugationVariants','conjugationReason','verbReading',
  'pitchVariants','pitchProvenance','senseKey','conjugationOverrides'];
const project = v => Object.fromEntries(fields.filter(f=>Object.hasOwn(v,f)).map(f=>[f,v[f]]));
const same = (a,b,message) => assert.deepStrictEqual(a===undefined?a:clone(a),b===undefined?b:clone(b),message);
const config = () => JSON.parse(read(fs.existsSync(path.join(root,'scripts/vocabulary-review-workflow.json'))
  ? 'scripts/vocabulary-review-workflow.json' : 'scripts/vocabulary-correction-review.json'));
const rulesFile = rules => '// Reviewed normalization and correction rules; see scripts/vocabulary-correction-review.json.\nwindow.VOCAB_CORRECTION_RULES = '+JSON.stringify(rules,null,2)+';\n';

function evidence(records) {
  assert(Array.isArray(records) && records.length, 'Missing evidence');
  for (const e of records) for (const f of ['source','version','locator','finding']) assert(text(e[f]), 'Missing evidence '+f);
}
function review(record, item, requirements={id:'strict-full-v1',enrichmentRequired:true,independentReviewRequired:true}) {
  const {validateContent,validateReview} = require('./import-vocabulary-completion.cjs');
  validateContent(item,{enrichmentRequired:requirements.enrichmentRequired});
  if (item.senseKey !== undefined) assert(text(item.senseKey),'Invalid separate sense key');
  assert(Array.isArray(record.review?.contexts),'Context review must identify each example');
  validateReview({...record,review:{...record.review,contexts:record.review.contexts.join('; ')}});
  evidence(record.evidence);
  for (const f of ['lexical','register','transitivity','conjugation','level']) assert(text(record.review[f]), 'Missing review '+f);
  if (SUPPORTED_POLICY_IDS.has(requirements.id)) {
    assert(record.firstPass?.decision==='accepted' && text(record.firstPass.reviewer) && text(record.firstPass.finding),'Missing first-pass acceptance');
    assert.equal(record.firstPass.reviewer,record.review.reviewer,'First-pass reviewer differs from editorial review');
    assert.equal(record.firstPass.contentHash,hash(project(item)),'First pass is stale');
  }
  if (requirements.independentReviewRequired) {
    assert(record.secondPass && text(record.secondPass.reviewer) && text(record.secondPass.finding),'Missing independent editorial pass');
    if (SUPPORTED_POLICY_IDS.has(requirements.id)) {
      assert.equal(record.secondPass.decision,'accepted','Explicit independent acceptance required');
      assert.notEqual(record.secondPass.reviewer,record.review.reviewer,'Independent reviewer must differ from first reviewer');
    }
    assert.equal(record.secondPass.contentHash,hash(project(item)), 'Second pass is stale');
  }
  assert.equal(record.review.contexts.length,item.examples.length,'Every example needs a context review');
  assert(record.review.contexts.every(text) && new Set(record.review.contexts).size >= (requirements.enrichmentRequired?2:1),
    requirements.enrichmentRequired?'Two distinct editorial contexts required':'Reviewed example context required');
  if (item.type === 'Verb') {
    assert(['godan','ichidan','suru','kuru','zuru','aru'].includes(item.verbGroup) || item.conjugationKind === 'excluded','Missing reviewed verb group');
    if (item.conjugationKind === 'excluded') assert(text(item.conjugationReason),'Excluded conjugation needs a reason');
    else assert(text(item.conjugationReading),'Missing conjugation reading');
    if (item.conjugation) for (const [f,v] of Object.entries(item.conjugation)) same(item[f],v,'Conflicting conjugation metadata '+f);
  }
}
function validatePitch(pitch, item) {
  assert(pitch && ['verified','unknown'].includes(pitch.status), 'Missing investigated pitch disposition');
  evidence(pitch.evidence);
  assert(text(pitch.rationale),'Missing pitch matching rationale');
  for (const e of pitch.evidence) assert(text(e.attribution),'Missing pitch attribution');
  if (pitch.status === 'unknown') {
    assert.equal(item.pitch,null,'Unknown pitch must be null');
    assert(!item.pitchVariants || !item.pitchVariants.length,'Unknown pitch cannot have variants');
    assert(!item.pitchProvenance || !item.pitchProvenance.length,'Unknown pitch cannot retain verified runtime provenance');
  } else {
    const morae = [...item.reading.replace(/[ゃゅょャュョぁぃぅぇぉァィゥェォ]/g,'')].length;
    assert(Number.isInteger(item.pitch) && item.pitch >= 0 && item.pitch <= morae,'Invalid primary pitch');
    const patterns = [item.pitch,...(item.pitchVariants || [])];
    assert.equal(new Set(patterns).size,patterns.length,'Duplicate pitch variant');
    assert(patterns.every(p=>Number.isInteger(p)&&p>=0&&p<=morae),'Invalid pitch variant');
    same(item.pitchProvenance,pitch.evidence,'Runtime pitch provenance differs');
    for (const e of pitch.evidence) {
      assert(Array.isArray(e.patterns) && e.patterns.length && e.patterns.every(p=>Number.isInteger(p)&&p>=0&&p<=morae),'Invalid attested pitch patterns');
      assert(e.match && e.match.word === item.word && e.match.reading === item.reading,'Pitch evidence matches a different form');
      assert(text(e.match.grammaticalForm) && text(e.match.sense),'Missing grammatical/sense match for pitch');
    }
    for (const p of patterns) assert(pitch.evidence.some(e=>Array.isArray(e.patterns)&&e.patterns.includes(p)),'Unattested pitch pattern');
  }
}

function prepareCorrections(legacy, options) {
  const m = options?.manifest || config();
  if (m.version === 3) return require('./vocabulary-review-workflow.cjs').prepareWorkflow(legacy,{...options,manifest:m});
  assert.equal(m.version,2,'Unsupported correction manifest');
  const baseline = options?.baseline || JSON.parse(read(m.baseline));
  assert.equal(hash(baseline),m.baselineHash,'Correction baseline changed');
  const batches = options?.batches || m.authoringFiles.map(file=> {
    assert(/^scripts\/vocabulary-completion\/[\w-]+\.json$/.test(file),'Invalid correction authoring path');
    return JSON.parse(read(file));
  });
  const original = new Map(legacy.items.map(v=>[v.id,v]));
  for (const b of baseline.entries) {
    const v = original.get(b.id);
    assert(v && v.source === b.source && v.__sourceIndex === b.index,'Correction source identity changed '+b.id);
    assert.equal(hash(project(v)),b.hash,'Undocumented baseline change '+b.id);
  }
  assert.equal(original.size,baseline.entries.length,'Undocumented baseline additions');
  const files = {...legacy.files};
  const runtime = loadVocabulary(files);
  const rules = clone(runtime.c.VOCAB_CORRECTION_RULES);
  rules.correctionsBySource = {};
  rules.completionRedirects = {};
  rules.stableIdsBySource = {};
  const reviews = new Map(), changes = new Map(), additions = [], merges = [], decisions = new Map(legacy.decisions);
  const expected = new Map([...original].map(([id,v])=>[id,clone(v)]));
  for (const batch of batches) {
    assert.equal(batch.version,2,'Unsupported correction batch');
    for (const record of batch.reviews || []) {
      assert(original.has(record.id) && !reviews.has(record.id),'Unknown or repeated review '+record.id);
      const old = original.get(record.id);
      assert.equal(record.originalHash,hash(project(old)),'Original snapshot mismatch');
      const patch = record.replacement || {};
      assert(Object.keys(patch).every(f=>fields.includes(f)),'Unsupported correction field');
      const originals = Object.fromEntries(Object.keys(patch).map(f=>[f,Object.hasOwn(old,f)?old[f]:null]));
      same(record.original || {},originals,'Original correction values mismatch');
      if (Object.keys(patch).length) assert(text(record.rationale),'Missing correction rationale');
      if (patch.level && patch.level !== old.level) assert(text(record.levelBasis),'Level change needs evidence and rationale');
      const result = {...clone(old),...clone(patch)};
      review(record,result,options?.revisionReplay && record.workflowRequirements?record.workflowRequirements:record.policy?reviewRequirements(record,{id:record.id,patch}):
        {id:'strict-full-v1',enrichmentRequired:true,independentReviewRequired:true});
      validatePitch(record.pitch,result);
      (rules.correctionsBySource[old.source] ||= {})[old.__sourceIndex] = patch;
      (rules.stableIdsBySource[old.source] ||= {})[old.__sourceIndex] = old.id;
      expected.set(record.id,result);
      reviews.set(record.id,record);
      if (Object.keys(patch).length) changes.set(record.id,patch);
    }
    for (const addition of batch.additions || []) {
      assert(text(addition.id) && /^vocab-(n[1-5]):correction:[a-z0-9-]+$/.test(addition.id),'Invalid explicit addition ID');
      assert(!expected.has(addition.id),'Duplicate addition ID');
      assert(Object.keys(addition.entry).every(f=>fields.includes(f)),'Unsupported addition field');
      review(addition,addition.entry,options?.revisionReplay && addition.workflowRequirements?addition.workflowRequirements:addition.policy?reviewRequirements(addition,{id:addition.id,addition:true}):
        {id:'strict-full-v1',enrichmentRequired:true,independentReviewRequired:true});
      validatePitch(addition.pitch,addition.entry);
      assert(text(addition.levelBasis),'Missing addition level basis');
      assert(text(addition.reason),'Missing addition reason');
      const source = options?.revisionReplay ? addition.id.split(':')[0] : 'vocab-'+addition.entry.level.toLowerCase();
      assert(addition.id.startsWith(source+':'),'Addition source/level mismatch');
      const array = runtime.c['VOCAB_'+source.slice(-2).toUpperCase()];
      const prior = array.findIndex(v=>v.correctionId===addition.id);
      const index = prior < 0 ? array.length : prior;
      array[index] = {...clone(addition.entry),correctionId:addition.id};
      (rules.stableIdsBySource[source] ||= {})[index] = addition.id;
      // Explicitly override historical rules that happen to match a new spelling.
      (rules.correctionsBySource[source] ||= {})[index] = clone(addition.entry);
      expected.set(addition.id,{...addition.entry,id:addition.id,source,__sourceIndex:index});
      reviews.set(addition.id,addition);
      additions.push(addition);
    }
    for (const d of batch.decisions || []) {
      assert(legacy.manifest.candidates.some(c=>c.key===d.key) && !decisions.has(d.key),'Unknown or repeated candidate');
      evidence(d.evidence);
      assert(['added','verified-spelling-variant','additional-sense','additional-reading','excluded'].includes(d.disposition),'Invalid candidate disposition');
      assert(text(d.reason) && text(d.secondPass),'Missing candidate editorial rationale/second pass');
      assert(Array.isArray(d.targets) && (d.disposition==='excluded'?d.targets.length===0:d.targets.length>0),'Invalid candidate targets');
      decisions.set(d.key,d);
    }
    merges.push(...(batch.merges || []));
  }
  for (const merge of merges) {
    assert(expected.has(merge.from) && expected.has(merge.to) && merge.from !== merge.to,'Invalid merge IDs');
    assert(!rules.completionRedirects[merge.from],'Repeated merge');
    const from = expected.get(merge.from), to = expected.get(merge.to);
    // A retirement redirects an invalid or variant entry (e.g. an invented compound) to its
    // closest surviving entry; it needs an explicit reason and relationship instead of equal readings.
    if (merge.retirement) assert(text(merge.retirement.reason) && text(merge.retirement.relationship),'Retirement needs reason and relationship');
    else assert.equal(from.reading,to.reading,'Cannot merge distinct readings');
    assert(text(merge.equivalentSense) && text(merge.preservedContent) && text(merge.secondPass),'Unreviewed sense merge');
    evidence(merge.evidence);
    assert(reviews.has(merge.from)&&reviews.has(merge.to),'Both merged entries require review');
    rules.completionRedirects[merge.from] = merge.to;
  }
  for (const id of Object.keys(rules.completionRedirects)) {
    const seen = new Set(); let next = id;
    while (rules.completionRedirects[next]) {
      assert(!seen.has(next),'Redirect cycle'); seen.add(next); next = rules.completionRedirects[next];
    }
    assert(expected.has(next),'Missing redirect target');
    rules.completionRedirects[id] = next;
  }
  for (const l of levels) files['vocab-'+l.toLowerCase()+'.js'] = '// Teaching data; historical and completion authoring are documented in scripts.\nwindow.VOCAB_'+l+' = '+JSON.stringify(runtime.c['VOCAB_'+l],null,2)+';\n';
  files['vocab-correction-rules.js'] = rulesFile(rules);
  const proposed = loadVocabulary(files);
  const after = proposed.items;
  const byId = new Map(after.map(v=>[v.id,v]));
  assert.equal(byId.size,after.length,'Duplicate corrected IDs');
  assert.equal(after.length,expected.size-merges.length,'Unapproved correction collision or runtime addition');
  for (const [id,v] of expected) {
    if (rules.completionRedirects[id]) {
      assert(!byId.has(id) && byId.has(rules.completionRedirects[id]),'Invalid retired identity');
      continue;
    }
    assert(byId.has(id),'Lost identity (possible sense collision): '+id);
    same(project(byId.get(id)),project(v),'Correction lost or undocumented change: '+id);
    if (reviews.has(id) && v.type==='Verb' && v.conjugationKind!=='excluded') {
      assert(proposed.c.resolveVocabVerbConjugation(byId.get(id)),'Invalid reviewed conjugation behavior: '+id);
    }
  }
  for (const d of [...decisions.values()].filter(d=>!legacy.decisions.has(d.key))) {
    for (const target of d.targets) {
      const v = byId.get(target);
      assert(v,'Missing surviving candidate target');
      assert(reviews.has(target),'Candidate target requires full review');
      if (['added','additional-reading'].includes(d.disposition)) assert(additions.some(a=>a.id===target),'Claimed addition absent');
      if (d.disposition==='additional-sense') assert(changes.get(target)?.meaning,'Missing additional sense');
      if (d.disposition==='verified-spelling-variant') {
        const candidate = legacy.manifest.candidates.find(c=>c.key===d.key);
        assert.equal(candidate.reading.normalize('NFKC'),v.reading.normalize('NFKC'),'Variant reading differs');
        assert((v.aliases || []).includes(candidate.word),'Missing variant alias');
      }
    }
  }
  const ledger = after.map(v=>({id:v.id,source:v.source,index:v.__sourceIndex,contentHash:hash(project(v)),
    editorial:reviews.has(v.id)?'reviewed':'pending',pitch:reviews.get(v.id)?.pitch.status || 'pending'}));
  files['scripts/vocabulary-completion/ledger.json'] = JSON.stringify({version:2,entries:ledger,redirects:rules.completionRedirects},null,2)+'\n';
  return {...legacy,files,items:after,decisions,correctionReviews:reviews,corrections:changes,correctionAdditions:additions,merges,ledger};
}
function correctionReport(plan, legacy) {
  const {items,ledger,decisions,corrections,correctionAdditions,merges,correctionReviews} = plan;
  const byId=new Map(items.map(v=>[v.id,v]));
  const distinctExamples=v=>new Set((v.examples||[]).map(e=>(e.japanese||'').normalize('NFKC').replace(/[\s。、！？!?.,]/g,''))).size;
  const required=ledger.filter(v=>v.editorial==='reviewed' && v.enrichmentRequired!==false);
  const result = {...legacy,total:items.length,counts:Object.fromEntries(levels.map(l=>[l,items.filter(v=>v.level===l).length])),
    reviewed:ledger.filter(v=>v.editorial==='reviewed').length,
    unreviewedEntries:ledger.filter(v=>v.editorial!=='reviewed').length,
    lackingReviewedDistinctContexts:ledger.filter(v=>v.editorial!=='reviewed' || (plan.reviewedDistinctContextIds
      ? !plan.reviewedDistinctContextIds.has(v.id)
      : new Set((correctionReviews.get(v.id)?.review?.contexts||[]).filter(text)).size<2)).length,
    corrections:corrections.size,added:legacy.added+correctionAdditions.length,merges:merges.length,
    pitchVerified:ledger.filter(v=>v.pitch==='verified').length,pitchUnknown:ledger.filter(v=>v.pitch==='unknown').length,
    pitchUninvestigated:ledger.filter(v=>v.pitch==='pending').length,
    missingRequiredNotes:required.filter(v=>!text(byId.get(v.id)?.notes)).length,
    fewerThanRequiredContexts:required.filter(v=>distinctExamples(byId.get(v.id)||{})<2).length,
    optionalEnrichmentMissingNotes:ledger.filter(v=>v.editorial==='reviewed' && v.enrichmentRequired===false && !text(byId.get(v.id)?.notes)).length,
    optionalEnrichmentFewerThanTwo:ledger.filter(v=>v.editorial==='reviewed' && v.enrichmentRequired===false && distinctExamples(byId.get(v.id)||{})<2).length,
    sampledRoutineReviews:ledger.filter(v=>v.sampled).length,
    independentlyReviewed:ledger.filter(v=>v.editorial==='reviewed' && v.independentReviewRequired).length,
    unresolvedCandidates:plan.manifest.candidates.length-decisions.size,
    dispositions:Object.fromEntries([...new Set([...decisions.values()].map(d=>d.disposition))].map(s=>[s,[...decisions.values()].filter(d=>d.disposition===s).length]))};
  if (plan.workStates) {
    result.workStates = plan.workStates;
    result.pendingAdditions = plan.pendingAdditions;
    result.unresolvedCandidateReferences = plan.candidateLedger.reduce((n,c)=>n+c.references.filter(r=>r.state!=='accepted').length,0);
    result.candidateReferenceStates = Object.fromEntries(['pending','researching','drafted','needs revision','accepted'].map(s=>
      [s,plan.candidateLedger.reduce((n,c)=>n+c.references.filter(r=>r.state===s).length,0)]));
    result.openSampleDefects = plan.openSampleDefects || 0;
  }
  result.enrichmentComplete = ['missingNotes','fewerThanTwo','incompleteExamples'].every(f=>result[f]===0);
  result.strictComplete = result.enrichmentComplete && ['unreviewedEntries','unresolvedCandidates','pitchUninvestigated','lackingReviewedDistinctContexts'].every(f=>result[f]===0)
    && !(result.pendingAdditions || result.unresolvedCandidateReferences || result.openSampleDefects);
  result.complete = ['incompleteExamples','unreviewedEntries','unresolvedCandidates','pitchUninvestigated','missingRequiredNotes','fewerThanRequiredContexts'].every(f=>result[f]===0)
    && !(result.pendingAdditions || result.unresolvedCandidateReferences || result.openSampleDefects);
  return result;
}
module.exports = {prepareCorrections,correctionReport,hash,project,validatePitch,validateReviewRecord:review};
