const assert = require('assert');
const crypto = require('crypto');

const POLICY_ID = 'risk-based-v2';
const SUPPORTED_POLICY_IDS = new Set(['risk-based-v1', POLICY_ID]);
const contentHash = value => crypto.createHash('sha256').update(JSON.stringify(value)).digest('hex');
const same = (a,b) => JSON.stringify(a)===JSON.stringify(b);
const japanese = value => (value.normalize('NFC').match(/「[^」]*」|『[^』]*』|[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Mark}\u3000-\u303f\uff00-\uffefー]+/gu)||[]);
const SAMPLE_SEED = 'vocabulary-risk-review-2026-09-22';
const CONSEQUENTIAL_FIELDS = new Set([
  'word','reading','romaji','meaning','type','category','level','notes','examples','aliases','pitch',
  'verbGroup','conjugation','conjugationKind','conjugationReading','conjugationVariants',
  'conjugationReason','verbReading','pitchVariants','senseKey','conjugationOverrides'
]);
const ENRICHMENT_REASONS = new Set([
  'addition','additional-sense','ambiguous-sense','ambiguous-grammar','competing-form','register','transitivity','additional-reading'
]);
const text = value => typeof value === 'string' && value.trim().length > 0;
const sampleHash = id => crypto.createHash('sha256').update(SAMPLE_SEED+'\0'+id).digest('hex');
const selectedForBatch = ids => new Set([...ids].sort((a,b)=>sampleHash(a).localeCompare(sampleHash(b))||a.localeCompare(b))
  .slice(0,Math.ceil(ids.length/10)));

// Structural eligibility is narrow; semantic equivalence is a separate,
// explicit editorial finding bound to both exact projected snapshots.
function germanEditEligible(before,after) {
  if (!before || !after) return false;
  let changed=false;
  for (const field of new Set([...Object.keys(before),...Object.keys(after)])) {
    // Evidence hydration does not change the lexical pitch claim. Its exact
    // content is still bound by editorial and independent approval hashes.
    if (field==='pitchProvenance') continue;
    if (same(before[field],after[field])) continue;
    changed=true;
    if (['meaning','notes'].includes(field)) {
      if (!text(before[field]) || !text(after[field]) || !same(japanese(before[field]),japanese(after[field]))) return false;
    } else if (field==='examples') {
      if (!Array.isArray(before.examples) || !Array.isArray(after.examples) || before.examples.length!==after.examples.length) return false;
      for (let i=0;i<before.examples.length;i++) {
        const a=before.examples[i],b=after.examples[i];
        if (!a || !b || !text(a.german) || !text(b.german)) return false;
        if (!same(Object.fromEntries(Object.entries(a).filter(([f])=>f!=='german')),
          Object.fromEntries(Object.entries(b).filter(([f])=>f!=='german')))) return false;
        if (!same(japanese(a.german),japanese(b.german))) return false;
      }
    } else return false;
  }
  return changed;
}

function requirements(record,{id=record.id,addition=false,additionIdentity=addition,patch={},kind='entry',before,after}={}) {
  if (!record.policy) return {id:'strict-full-v1',risk:'consequential',sampled:false,
    enrichmentRequired:true,independentReviewRequired:true};
  const policy=record.policy;
  assert(SUPPORTED_POLICY_IDS.has(policy.id),'Unsupported review policy');
  assert(['routine','consequential'].includes(policy.risk),'Invalid review risk');
  assert(Array.isArray(policy.reasons) && policy.reasons.every(text),'Invalid review risk reasons');
  assert.equal(new Set(policy.reasons).size,policy.reasons.length,'Repeated review risk reason');
  assert.equal(typeof policy.enrichmentRequired,'boolean','Missing enrichment decision');
  assert.equal(typeof policy.sampled,'boolean','Missing deterministic sample decision');
  const changed=Object.keys(patch).filter(field=>CONSEQUENTIAL_FIELDS.has(field));
  let exemptGermanEdit=false;
  if (policy.id===POLICY_ID && policy.risk==='routine' && changed.length) {
    assert(germanEditEligible(before,after),'Routine German edit changes protected content or adds teaching content');
    const finding=policy.germanEdit;
    assert(finding?.preservesMeaning===true && text(finding.reviewer) && text(finding.finding),
      'Routine German edit needs an explicit meaning-preserving editorial finding');
    assert.equal(finding.reviewer,record.review?.reviewer,'German edit finding must belong to the editorial reviewer');
    assert.equal(finding.beforeHash,contentHash(before),'German edit source finding is stale');
    assert.equal(finding.afterHash,contentHash(after),'German edit final finding is stale');
    exemptGermanEdit=true;
  }
  const inherentlyConsequential=kind!=='entry' || addition || changed.length>0 && !exemptGermanEdit;
  if (inherentlyConsequential) assert.equal(policy.risk,'consequential','Changed content requires consequential review');
  if (policy.risk==='routine') assert.equal(inherentlyConsequential,false,'Routine review cannot cover consequential work');
  if (policy.risk==='consequential') assert(policy.reasons.length,'Consequential review needs a reason');
  else assert.equal(policy.reasons.length,0,'Routine review cannot claim consequential reasons');
  if (policy.risk==='consequential') assert.equal(policy.sampled,false,'Consequential work is not part of the routine sample');
  if (addition) assert(policy.reasons.includes('addition'),'Addition risk reason required');
  const requiresEnrichment=additionIdentity || policy.reasons.some(reason=>ENRICHMENT_REASONS.has(reason));
  if (requiresEnrichment) assert(policy.enrichmentRequired,'This review reason requires teaching enrichment');
  const sampled=policy.risk==='routine' && policy.sampled;
  return {id:policy.id,risk:policy.risk,sampled,enrichmentRequired:policy.enrichmentRequired,
    independentReviewRequired:policy.risk==='consequential' || sampled};
}

module.exports={POLICY_ID,SUPPORTED_POLICY_IDS,SAMPLE_SEED,requirements,selectedForBatch,germanEditEligible};
