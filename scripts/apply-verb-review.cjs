// Apply the committed review without consulting a dictionary or the network.
const fs = require('fs');
const vm = require('vm');
const review = require('./verb-review.json');
const baseline = require('./verb-baseline.json');
if (review.entries.length !== 2389 || baseline.length !== 2389) throw Error('Baseline coverage changed');
for (const source of [...new Set(review.entries.map(e => e.source))]) {
  const file = source + '.js';
  const text = fs.readFileSync(file, 'utf8');
  const name = text.match(/window\.(\w+)\s*=/)[1];
  const c = { window: {} }; vm.runInNewContext(text,c);
  for (const e of review.entries.filter(e => e.source === source)) {
    const item=c.window[name][e.index];
    const b=baseline.find(b=>b.__sourceName===source && b.__sourceIndex===e.index);
    if (!item || !b) throw Error('Missing baseline entry');
    item.conjugation = e.metadata;
  }
  fs.writeFileSync(file, text.slice(0,text.indexOf('window.'))+'window.'+name+' = '+JSON.stringify(c.window[name],null,2)+';\n');
}
