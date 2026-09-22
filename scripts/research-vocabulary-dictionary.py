"""Offline JMdict research index. Matches are leads, never editorial approvals.

Input: cached original JMdict_e.gz and exported runtime inventory. Reading and
sense restrictions are applied independently; homophones are not merged.
"""
import gzip
import hashlib
import json
from pathlib import Path
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parent.parent
CACHE = ROOT / '.content-cache'


def research():
    source = CACHE / 'JMdict_e.gz'
    inventory = json.loads((CACHE / 'correction-inventory.json').read_text(encoding='utf-8'))
    candidates = json.loads((ROOT / 'scripts/vocabulary-completion.json').read_text(encoding='utf-8'))['candidates']
    wanted = {(v['word'], v['reading']) for v in inventory + candidates}
    wanted.update((r['word'], r['reading']) for c in candidates for r in c['references'])
    # The confirmed correction is also researched before it changes the runtime.
    wanted.add(('宥す', 'ゆるす'))
    matches = {pair: [] for pair in wanted}
    words = {w for w, _ in wanted}
    with gzip.open(source, 'rb') as stream:
        for _, entry in ET.iterparse(stream, events=('end',)):
            if entry.tag != 'entry':
                continue
            spellings = [x.text for x in entry.findall('k_ele/keb')]
            readings = entry.findall('r_ele')
            if not words.intersection(spellings + [r.findtext('reb') for r in readings]):
                entry.clear()
                continue
            for reading in readings:
                kana = reading.findtext('reb')
                restricted = [x.text for x in reading.findall('re_restr')]
                forms = restricted or spellings or [kana]
                if reading.find('re_nokanji') is not None:
                    forms = [kana]
                for word in dict.fromkeys(forms + [kana]):
                    if (word, kana) not in wanted:
                        continue
                    senses = []
                    pos = []
                    for number, sense in enumerate(entry.findall('sense'), 1):
                        pos = [x.text for x in sense.findall('pos')] or pos
                        stagk = [x.text for x in sense.findall('stagk')]
                        stagr = [x.text for x in sense.findall('stagr')]
                        if (stagk and word not in stagk and not (word == kana and set(stagk).intersection(forms))) or (stagr and kana not in stagr):
                            continue
                        senses.append({'sense': number, 'pos': pos, 'stagk': stagk, 'stagr': stagr,
                                       'misc': [x.text for x in sense.findall('misc')],
                                       'gloss': [x.text for x in sense.findall('gloss')],
                                       'notes': [x.text for x in sense.findall('s_inf')]})
                    if senses:
                        matches[(word, kana)].append({'sequence': entry.findtext('ent_seq'),
                            'spelling': word, 'reading': kana, 'readingRestrictions': restricted,
                            'spellingInfo': [x.text for k in entry.findall('k_ele') if k.findtext('keb') == word for x in k.findall('ke_inf')],
                            'senses': senses})
            entry.clear()
    result = {'source': 'JMdict_e', 'sha256': hashlib.sha256(source.read_bytes()).hexdigest(),
              'attribution': 'JMdict, EDRDG, CC BY-SA 4.0; https://www.edrdg.org/jmdict/j_jmdict.html',
              'entries': [{'id': v['id'], 'word': v['word'], 'reading': v['reading'],
                           'matches': matches[(v['word'], v['reading'])]} for v in inventory],
              'candidates': [{'key': v['key'], 'matches': matches[(v['word'], v['reading'])],
                  'references': [{'index': i, 'reference': r, 'matches': matches[(r['word'], r['reading'])]}
                                 for i, r in enumerate(v['references'])]} for v in candidates],
              'confirmedCorrection': matches[('宥す', 'ゆるす')]}
    (CACHE / 'correction-dictionary-research.json').write_text(json.dumps(result, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
    print(json.dumps({'entries': len(inventory), 'exactRestrictedMatches': sum(bool(v['matches']) for v in result['entries']),
                      'candidates': len(candidates), 'candidateMatches': sum(bool(v['matches']) for v in result['candidates']),
                      'confirmedCorrection': result['confirmedCorrection']}, ensure_ascii=False))


if __name__ == '__main__':
    research()
