"""Tokenize comprehension passages with MeCab + UniDic for scripts/build-comprehension-links.cjs.

Usage: python -I tokenize-comprehension.py <unidic-dir> <texts.json> <tokens.json>
texts.json maps passage id -> plain text. tokens.json maps passage id -> list of
[start, surface, pos1, pos2, pos3, orthBase, lemma, lemmaKana, kana, kanaBase].
"""
import json, sys
import fugashi

unidic, source, target = sys.argv[1:4]
tagger = fugashi.GenericTagger('-d "%s" -r "%s/dicrc"' % (unidic, unidic))

def field(node, index):
    return node.feature[index] if len(node.feature) > index else '*'

texts = json.load(open(source, encoding='utf-8'))
out = {}
for pid, text in texts.items():
    tokens, cursor = [], 0
    for node in tagger(text):
        start = text.find(node.surface, cursor)
        if start < 0:
            raise SystemExit('Token %r not found in %s' % (node.surface, pid))
        cursor = start + len(node.surface)
        tokens.append([start, node.surface, field(node, 0), field(node, 1), field(node, 2), field(node, 10), field(node, 7),
                       field(node, 6), field(node, 20), field(node, 21)])
    out[pid] = tokens
json.dump(out, open(target, 'w', encoding='utf-8'), ensure_ascii=False)
print(len(out), 'passages tokenized')
