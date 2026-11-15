const assert = require('assert');
const {loadVocabulary,read} = require('./vocabulary-tools.cjs');
const {prepare,report} = require('./import-vocabulary-completion.cjs');
// Compare actual runtime data, not merely a successful hypothetical import.
function auditCompletion(plan = prepare(), {level = null} = {}) {
  assert.equal(JSON.stringify(loadVocabulary().items),JSON.stringify(plan.items),'Committed runtime differs from completion authoring; run the completion importer');
  assert.equal(read('scripts/vocabulary-completion/ledger.json'),plan.files['scripts/vocabulary-completion/ledger.json'],'Committed review ledger is stale');
  const result = report(plan);
  result.phases = require('./vocabulary-phase-report.cjs').phaseReports(plan);
  if (level) {
    result.selectedLevel = level;
    assert(Object.hasOwn(result.phases, result.selectedLevel), 'Use --level=N5, N4, N3, N2 or N1');
  }
  return result;
}
// The completion gate: the whole review (or one level, or strict enrichment) must be closed.
function assertComplete(result, {strict = false} = {}) {
  if (result.selectedLevel) assert(result.phases[result.selectedLevel].complete, result.selectedLevel + ' vocabulary enrichment remains open; see phase counts above');
  else assert(strict?result.strictComplete:result.complete,strict?'Full vocabulary enrichment remains open; see counts above':'Vocabulary review remains open; see counts above');
}
module.exports = {auditCompletion, assertComplete};
if (require.main === module) {
  const levelArg = process.argv.find(arg => arg.startsWith('--level='));
  const result = auditCompletion(prepare(), {level: levelArg && levelArg.slice('--level='.length)});
  console.log(JSON.stringify(result,null,2));
  if (!process.argv.includes('--progress')) assertComplete(result, {strict: process.argv.includes('--strict-enrichment')});
}
