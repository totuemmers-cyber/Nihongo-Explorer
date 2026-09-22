"""Import documented general radicals and missing, animated KanjiVG diagrams.

Input: .content-cache/kanjivg.zip from the upstream repository and its commit JSON.
Existing AnimCJK assets are preserved. Never guesses a radical from visual position.
"""
import json
import re
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
KVG = '{http://kanjivg.tagaini.net}'
SVG = '{http://www.w3.org/2000/svg}'
archive = zipfile.ZipFile(ROOT / '.content-cache/kanjivg.zip')
prefix = archive.namelist()[0]
radicals = json.loads((ROOT / '.content-cache/radicals.json').read_text(encoding='utf-8'))
# Correct three inventory transcription errors by their stable Kangxi numbers.
radical_file = ROOT / 'kangxi-radicals-data.js'
radical_text = radical_file.read_text(encoding='utf-8')
for number, radical in [(54, '廴'), (96, '玉'), (162, '辵')]:
    radicals[number-1] = radical
    radical_text = re.sub(r'(number: '+str(number)+r', radical: )"[^"]+"', lambda m: m[1]+json.dumps(radical,ensure_ascii=False), radical_text)
radical_file.write_text(radical_text,encoding='utf-8')
radical_text = re.sub(r'(number: 54,[^\n]*?strokes: )3',r'\g<1>2',radical_text)
radical_text = re.sub(r'(number: 96,[^\n]*?strokes: )4',r'\g<1>5',radical_text)
radical_text = radical_text.replace('Juwel / K\\u00F6nig', 'Jade / Edelstein')
radical_text = radical_text.replace('Drei Querstriche durch einen Senkrechten – ursprünglich ein Jadeschmuck.', '玉 bedeutet Jade oder Edelstein und hat fünf Striche. Die häufige Seitenform 王 hat vier Striche.')
radical_file.write_text(radical_text,encoding='utf-8')
canonical = set(radicals)
aliases = dict(zip('亻氵忄扌灬犭礻衤罒艹辶釒飠糹訁阝', '人水心手火犬示衣网艸辵金食糸言阜'))
aliases.update({'王':'玉','耂':'老','月':'月','⺮':'竹','爫':'爪','丬':'爿','龸':'小','龹':'八','⺌':'小','⺍':'小'})
aliases.update({'彑':'彐','⺕':'彐','戸':'戶','靑':'青','黃':'黄','巛':'川','麥':'麦','黑':'黒','龜':'亀'})
missing, unresolved, imported, mapped = [], [], [], {}
for filename in ['kanji-data.js', 'kanji-n1.js']:
    text = (ROOT / filename).read_text(encoding='utf-8')
    def enrich(match):
        item = json.loads(match.group(1))
        char = item['kanji']
        name = f'{prefix}kanji/{ord(char):05x}.svg'
        if name not in archive.namelist():
            missing.append(char)
            return match.group(0)
        raw = archive.read(name).decode('utf-8')
        tree = ET.fromstring(raw)
        candidates = []
        groups = list(tree.iter(SVG+'g'))
        standard = 'general' if any(g.get(KVG+'radical') == 'general' for g in groups) else 'tradit'
        for g in groups:
            if g.get(KVG+'radical') != standard:
                continue
            for value in [g.get(KVG+'original'), g.get(KVG+'element')]:
                element = aliases.get(value, value)
                if element in canonical:
                    candidates.append(element)
                    break
        unique = set(candidates)
        if len(unique) == 1:
            item['primaryRadical'] = next(iter(unique))
            item['primaryRadicalSource'] = 'KanjiVG ' + standard
            mapped[char] = item['primaryRadical']
        else:
            unresolved.append({'kanji':char,'candidates':candidates})
        target = ROOT / 'stroke-order' / f'{ord(char)}.svg'
        if not target.exists():
            # Keep upstream attribution, paths and stroke order; add SMIL animation.
            paths = list(tree.iter(SVG+'path'))
            for index, p in enumerate(paths):
                p.set('pathLength', '1')
                p.set('stroke-dasharray', '1')
                p.set('stroke-dashoffset', '1')
                animation = ET.SubElement(p, SVG+'animate', {
                    'attributeName':'stroke-dashoffset','from':'1','to':'0',
                    'dur':'0.35s','begin':f'{index*0.4:.2f}s','fill':'freeze'})
            ET.register_namespace('', 'http://www.w3.org/2000/svg')
            ET.register_namespace('kvg', 'http://kanjivg.tagaini.net')
            comments = '\n'.join(re.findall(r'<!--[\s\S]*?-->',raw))
            target.write_text(comments+'\n<!-- Animation added by Nihongo Explorer; CC BY-SA 3.0. -->\n'+ET.tostring(tree,encoding='unicode'), encoding='utf-8')
            imported.append(char)
        return '  '+json.dumps(item,ensure_ascii=False)
    text = re.sub(r'^  (\{.*"kanji":.*\})(?=,?$)', enrich, text, flags=re.M)
    (ROOT / filename).write_text(text,encoding='utf-8')
result = {'mapped':len(mapped),'imported':imported,'missingUpstream':missing,'unresolved':unresolved}
(ROOT / '.content-cache/kanjivg-result.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(result,ensure_ascii=False))
