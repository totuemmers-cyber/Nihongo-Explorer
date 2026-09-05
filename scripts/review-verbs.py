"""Offline JMdict review. Input: cached dated XML gzip and frozen baseline.
Run from the repository root. No network access or application dependencies.
"""
import gzip, re, json, hashlib, pathlib, sys, xml.etree.ElementTree as ET
sys.stdout.reconfigure(encoding='utf-8')
root = pathlib.Path('.')
raw = (root / '.content-cache/JMdict_e.gz').read_bytes()
xml = gzip.decompress(raw).decode('utf-8')
# Preserve POS entity identifiers, rather than expanding them into prose.
xml = re.sub(r'&([\w-]+);', lambda m: m[0] if m[1] in ['amp','lt','gt','quot','apos'] else m[1], xml)
doc = ET.fromstring(xml)
baseline_path = root / 'scripts/verb-baseline.json'
if not baseline_path.exists():
    baseline = json.loads((root / '.content-cache/verb-baseline.json').read_text(encoding='utf-8'))
    baseline = [{k:v[k] for k in ['word','reading','meaning','type','level','__sourceName','__sourceIndex','verbGroup','conjugationReading'] if k in v} for v in baseline]
    baseline_path.write_text(json.dumps(baseline,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
baseline = json.loads(baseline_path.read_text(encoding='utf-8'))
index = {}
for entry in doc.findall('entry'):
    for r in entry.findall('r_ele'):
        index.setdefault(r.findtext('reb'), []).append((entry,r))
def match(word, reading):
    found=[]
    for e,r in index.get(reading,[]):
        spellings=[x.text for x in e.findall('k_ele/keb')]
        if word != reading and word not in spellings: continue
        restrict=[x.text for x in r.findall('re_restr')]
        if restrict and word not in restrict: continue
        if r.find('re_nokanji') is not None and word != reading: continue
        pos=[]
        for i,s in enumerate(e.findall('sense')):
            pos=[x.text for x in s.findall('pos')] or pos
            stagk=[x.text for x in s.findall('stagk')]
            stagr=[x.text for x in s.findall('stagr')]
            if stagk and word not in stagk: continue
            if stagr and reading not in stagr: continue
            found.append(dict(entry=e.findtext('ent_seq'),sense=i+1,pos=pos,gloss=[x.text for x in s.findall('gloss')],stagk=stagk,stagr=stagr,readingRestrictions=restrict))
    return found
def group(pos):
    if pos in ['v1','v1-s']: return 'ichidan'
    if pos.startswith('v5'): return 'godan'
    if pos == 'vk': return 'kuru'
    if pos in ['vs','vs-i','vs-s']: return 'suru'
    if pos == 'vz': return 'zuru'
review=[]
for b in baseline:
    word,reading=b['word'],b['reading']
    evidence=match(word,reading)
    nominal=False
    if not evidence and word.endswith('する') and reading.endswith('する'):
        evidence=match(word[:-2],reading[:-2]); nominal=True
    # Sense choices reviewed against the existing German teaching gloss.
    selected={'する':'1157170','いる':'1577980','かける':'1207610','できる':'1340450',
              'くれる':'1269130','駆ける':'1244720','伏せる':'1500220'}.get(word)
    candidates=evidence
    if selected: evidence=[e for e in evidence if e['entry']==selected]
    if word=='左右': evidence=[e for e in evidence if e['entry']=='1290810' and e['sense']==1]
    groups=sorted(set(group(p) for e in evidence for p in e['pos'] if group(p)))
    meta={}; disposition='excluded'; reason='No unambiguous supported modern verb class for this spelling and reading.'
    if len(groups)==1:
        g=groups[0]
        if g=='suru' and not reading.endswith('する'): nominal=True
        cr=reading+'する' if nominal and not reading.endswith('する') else reading
        if reading=='ある' and g=='godan': g='aru'
        meta=dict(verbGroup=g,conjugationReading=cr,conjugationKind='nominal-suru' if cr!=reading else 'verb')
        disposition='verified'; reason='Compatible JMdict senses agree on the supported class.'
    elif len(groups)>1:
        reason='Conflicting sense classes; excluded pending semantic review.'
    elif evidence and not nominal:
        pos=set(p for e in evidence for p in e['pos'])
        if not any(p.startswith('v') for p in pos):
            meta['type']='Nomen' if 'n' in pos else 'Adverb' if 'adv' in pos else 'Ausdruck'
            disposition='nonverb'; reason='No verb POS in compatible JMdict senses.'
    if disposition!='verified': meta.update(conjugationKind='excluded',verbGroup=None,conjugationReading=None)
    tags=set(p for e in evidence for p in e['pos'])
    overrides={}; variants={}
    if disposition=='verified':
        cr=meta['conjugationReading']; g=meta['verbGroup']
        if 'v5u-s' in tags:
            overrides.update(te=cr[:-1]+'うて',past=cr[:-1]+'うた',conditionalTara=cr[:-1]+'うたら')
        if 'v5k-s' in tags:
            overrides.update(te=cr[:-1]+'って',past=cr[:-1]+'った',conditionalTara=cr[:-1]+'ったら')
        if 'vs-s' in tags:
            # Potential is lexical: do not invent nominal + dekiru forms.
            overrides['potential']=cr[:-2]+'せる' if word in ['愛する','察する','罰する','達する'] else None
            overrides['imperative']=cr[:-2]+'せよ'
        if word=='愛する':
            overrides.update(negative='あいさない',pastNeg='あいさなかった')
            variants.update(negative=['あいしない'],pastNeg=['あいしなかった'],volitional=['あいそう'],imperative=['あいせ','あいせよ'])
        if 'v1-s' in tags: overrides['imperative']=cr[:-2]+'れ'
        if word in ['できる','出来る']:
            overrides.update(potential=None,passive=None,causative=None,causPas=None,imperative=None,volitional=None)
        if g=='aru':
            overrides.update(potential=None,passive=None,causative=None,causPas=None)
        if g in ['ichidan','kuru'] and 'v1-s' not in tags:
            variants['imperative']=[cr[:-1]+'よ'] if g=='ichidan' else []
        if g=='suru' and 'imperative' not in variants: variants['imperative']=[cr[:-2]+'せよ']
        if g=='godan' and not cr.endswith('す'):
            a={'う':'わ','く':'か','ぐ':'が','つ':'た','ぬ':'な','ぶ':'ば','む':'ま','る':'ら'}[cr[-1]]
            variants['causPas']=[cr[:-1]+a+'される']
    if overrides: meta['conjugationOverrides']=overrides
    if variants: meta['conjugationVariants']=variants
    if selected: reason='German teaching gloss selects JMdict entry '+selected+'; other homophones are not used.'
    review.append(dict(source=b['__sourceName'],index=b['__sourceIndex'],word=word,reading=reading,disposition=disposition,reason=reason,metadata=meta,evidence=evidence,rejectedEvidence=[e for e in candidates if e not in evidence]))
out=dict(source=dict(url='https://www.edrdg.org/pub/Nihongo/JMdict_e.gz',retrieved='2026-09-05',creation=re.findall(r'JMdict created[^\n]*',xml)[:1],sha256=hashlib.sha256(raw).hexdigest(),license='CC BY-SA 4.0',attribution='JMdict, Electronic Dictionary Research and Development Group'),entries=review)
(root/'scripts/verb-review.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
from collections import Counter
print(Counter(x['disposition'] for x in review))
print(Counter(x['metadata']['verbGroup'] for x in review))
for x in review:
    if x['disposition']!='verified': print(x['word'],x['reading'],x['disposition'],x['reason'])
