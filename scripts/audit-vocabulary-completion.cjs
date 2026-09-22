const assert = require('assert');
const {loadVocabulary} = require('./vocabulary-tools.cjs');
const {prepare,report} = require('./import-vocabulary-completion.cjs');
const plan = prepare();
// Compare actual runtime data, not merely a successful hypothetical import.
assert.equal(JSON.stringify(loadVocabulary().items),JSON.stringify(plan.items),'Committed runtime differs from completion authoring; run the completion importer');
const result = report(plan);
console.log(JSON.stringify(result,null,2));
if (!process.argv.includes('--progress')) assert(result.complete,'Vocabulary completion remains open; see counts above');
