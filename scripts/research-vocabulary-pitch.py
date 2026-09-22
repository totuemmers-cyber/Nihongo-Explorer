"""Extract exact UniDic accent leads, preserving forms and byte locators.

No phrase decomposition or accent prediction. Matching rows require editorial
POS/sense review before being used in completion authoring.
"""
import csv
import hashlib
import json
from pathlib import Path
import struct
import zipfile

ROOT = Path(__file__).resolve().parent.parent
CACHE = ROOT / '.content-cache'
VERSION = '2025.12'


def katakana(value):
    return ''.join(chr(ord(c) + 96) if 'ぁ' <= c <= 'ゖ' else c for c in value)


def research():
    inventory = json.loads((CACHE / 'correction-inventory.json').read_text(encoding='utf-8'))
    candidates = json.loads((ROOT / 'scripts/vocabulary-completion.json').read_text(encoding='utf-8'))['candidates']
    wanted = {(v['word'], katakana(v['reading'])) for v in inventory + candidates}
    wanted.update((r['word'], katakana(r['reading'])) for c in candidates for r in c['references'])
    wanted.add(('宥す', 'ユルス'))
    matches = {p: [] for p in wanted}
    archive = CACHE / 'unidic-cwj-202512.zip'
    with zipfile.ZipFile(archive) as package:
        data = package.read('sys.dic')
        license_text = package.read('license/BSD').decode('utf-8')
        assert 'ver. 2025.12' in package.read('README.md').decode('utf-8')
        assert '# $25: aType' in package.read('rewrite.def').decode('utf-8')
    # MeCab dictionary.cpp: ten uint32s, 32-byte charset, trie, tokens, features.
    header = struct.unpack('<10I', data[:40])
    assert header[0] ^ 0xef718f77 == len(data) and header[1] == 102
    start = 72 + header[6] + header[7]
    assert start + header[8] == len(data)
    offset = start
    for raw in data[start:].split(b'\0'):
        if raw:
            row = next(csv.reader([raw.decode('utf-8')]))
            assert len(row) == 29
            pair = (row[8], row[20])  # actual orthography and actual kana form
            if pair in wanted:
                matches[pair].append({'locator': f'sys.dic@{offset}', 'orth': row[8], 'kana': row[20],
                    'pron': row[9], 'lemma': row[7], 'pos': row[:4], 'cType': row[4], 'cForm': row[5],
                    'aType': row[24], 'lemmaId': row[28], 'formId': row[27]})
        offset += len(raw) + 1
    result = {'source': '現代書き言葉UniDic', 'version': VERSION,
              'url': 'https://clrd.ninjal.ac.jp/unidic_archive/2512/unidic-cwj-202512.zip',
              'sha256': hashlib.sha256(archive.read_bytes()).hexdigest(),
              'sysDicSha256': hashlib.sha256(data).hexdigest(),
              'attribution': 'National Institute for Japanese Language and Linguistics; modified BSD license',
              'entries': [{'id': v['id'], 'word': v['word'], 'reading': v['reading'],
                           'matches': matches[(v['word'], katakana(v['reading']))]} for v in inventory],
              'candidates': [{'key': v['key'], 'matches': matches[(v['word'], katakana(v['reading']))],
                  'references': [{'index': i, 'reference': r, 'matches': matches[(r['word'], katakana(r['reading']))]}
                                 for i, r in enumerate(v['references'])]} for v in candidates],
              'confirmedCorrection': matches[('宥す', 'ユルス')]}
    (CACHE / 'correction-pitch-research.json').write_text(json.dumps(result, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
    (ROOT / 'scripts/vocabulary-completion/UNIDIC-LICENSE.txt').write_text(license_text, encoding='utf-8')
    print(json.dumps({'entries': len(inventory), 'withExactRows': sum(bool(v['matches']) for v in result['entries']),
                      'candidates': len(candidates), 'withCandidateRows': sum(bool(v['matches']) for v in result['candidates']),
                      'confirmedCorrection': result['confirmedCorrection']}, ensure_ascii=False))


if __name__ == '__main__':
    research()
