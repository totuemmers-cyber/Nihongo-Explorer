# Review: Kanji- und Radikale-Sektion — Faktenprüfung & Korrekturplan

Datum: 2026-07-05 · Geprüfte Dateien: `kangxi-radicals-data.js`, `kanji-data.js`, `kanji-n1.js`, `app-constants.js` (Radikal-Zuordnung), `section-configs.js` / `quiz.js` (Verwendung der Daten)

## Methodik

- **Kanji-Daten (2 447 Einträge)** wurden programmatisch gegen zwei unabhängige Referenzen geprüft:
  - KANJIDIC-abgeleitete Daten (Strichzahlen, On-/Kun-Lesungen, JLPT-Level)
  - KRADFILE-U (Komponenten-Zerlegung) und die im Repo liegenden AnimCJK-SVGs (`stroke-order/`, 2 Pfade pro Strich → unabhängige Strichzahl-Referenz)
- **Radikale-Daten (214 Einträge)** wurden vollständig manuell gegen die kanonische Kangxi-Liste geprüft (Zeichen, Nummer, Strichzahl, Name/Lesung, Bedeutung, Erklärungstext, Beispiel-Kanji).
- Deutsche Bedeutungen: alle N5/N4-Einträge sowie eine Stichprobe von 120 N3–N1-Einträgen wurden gegen KANJIDIC-Glossen gelesen.

**Gesamtbild:** Die Kanji-Daten sind sehr sauber (JLPT-Level: 0 Abweichungen, Lesungen: nur Einzelfälle, Bedeutungen: durchweg korrekt). Die Radikale-Datei enthält dagegen **eine erhebliche Zahl faktischer Fehler** in Beispiel-Kanji und Erklärungstexten sowie 3 falsche Radikal-Zeichen. Dazu kommen zwei **strukturelle Probleme**, die die Radikal-Verknüpfung für ~22 % aller Kanji aussetzen.

---

## Teil 1 — Fehler in `kangxi-radicals-data.js`

### 1.1 Falsche Radikal-Zeichen (kritisch)

| # | Ist | Soll | Problem |
|---|-----|------|---------|
| 54 | `廾` | `廴` (えんにょう) | Duplikat von #55 — das Zeichen für #54 ist falsch; Lesung/Erklärung/Beispiele (建, 延) beschreiben korrekt 廴. |
| 63 | `戶` (traditionell) | `戸` (jap. Form) | Die Kanji-Daten verwenden `戸` als Komponente → **kein einziges Kanji verlinkt derzeit auf Radikal 63**. |
| 162 | `辺` | `辶` (bzw. 辵) | `辺` ist ein Kanji, nicht das Radikal. Die Kanji-Daten verwenden `辶`/`⻌` → **kein Kanji verlinkt auf Radikal 162** (57 Kanji betroffen). |

Ebenso praxisrelevant: #66 ist als `攴` gespeichert, die Kanji-Komponenten verwenden aber die Seitenform `攵` (27 Kanji ohne Verlinkung). → Lösung über Varianten-Mapping, siehe Teil 3.

### 1.2 Strichzahlen / Glyphen-Inkonsistenzen

Die Datei mischt japanische Shinjitai-Glyphen mit traditionellen Strichzahlen (bzw. umgekehrt traditionelle Glyphen, wo die Beispiele Shinjitai sind):

| # | Zeichen | Strichzahl (Datei) | Problem / Empfehlung |
|---|---------|--------------------|-----------------------|
| 199 | 麦 | 11 | 麦 hat **7** Striche (11 gilt für 麥). Glyphe behalten, Strichzahl 7. |
| 213 | 亀 | 16 | 亀 hat **11** Striche (16 gilt für 龜). |
| 210 | 齊 | 14 | Beispiele sind Shinjitai (斉, 斎). Empfehlung: Zeichen → 斉, Strichzahl 8. |
| 211 | 齒 | 15 | Beispiele sind Shinjitai (歯, 齢). Empfehlung: Zeichen → 歯, Strichzahl 12. |
| 96 | 王 | 4 | Kanonisch ist Radikal 96 = 玉 (5 Striche). `王` als Anzeige ist vertretbar (matcht die Komponenten), sollte aber bewusst entschieden und die Erklärung entsprechend formuliert werden. |

Die Strichzahl speist den Filter `data-rstrokes` der Radikale-Sektion — falsche Werte sortieren Radikale in falsche Filtergruppen.

### 1.3 Falsche Kanji in `examples` / Erklärungstexten

Beispiel-Kanji, die **nicht** zum jeweiligen Radikal gehören (Kanji ist unter einem anderen Radikal indexiert und enthält das genannte Radikal auch nicht als Komponente, sofern nicht anders vermerkt):

| # | Radikal | Falsch | Richtig wäre z. B. | Anmerkung |
|---|---------|--------|--------------------|-----------|
| 8 | 亠 | 親 | 亡, 京 | 親 gehört zu 見. |
| 14 | 冖 | 冬 | 写, 冠 | 冬 gehört zu 夂/冫 (steht korrekt schon bei #15). |
| 16 | 几 | 風 | 凡, 処 | 風 ist selbst Radikal #182. |
| 20 | 勹 | 化 (auch im Text) | 包, 勾 | 化 = 亻+匕, enthält kein 勹. |
| 28 | 厶 | 反 (auch im Text) | 去, 参 | 反 = 厂+又. |
| 32 | 土 | 売 | 地, 場, 報 | 売 gehört zu 士 (#33 nennt es korrekt). |
| 34 | 夂 | 外 (auch im Text) | 夏 | 外 = 夕+卜, gehört zu 夕. |
| 43 | 尢 | — | 就 | Erklärungstext beschreibt komplett die 尸-Kanji von #44 (尻尾届屋展) — Text ersetzen. |
| 45 | 屮 | — | — | Behauptung, 屮 spiele „in der Struktur von 山“ eine Rolle, ist falsch. |
| 56 | 弋 | 引 (auch im Text) | 式, 弐 | 引 gehört zu 弓 (#57 nennt es korrekt). |
| 58 | 彐 | 形 (auch im Text) | 当 | 形 gehört zu 彡 (#59 nennt es korrekt). |
| 65 | 支 | 改, 放 (auch im Text) | 支 | Beide gehören zu 攵 (#66 nennt sie korrekt). |
| 69 | 斤 | 施 (auch im Text) | 新, 断 | 施 gehört zu 方. |
| 70 | 方 | 日 (in examples) | 旅, 族, 施 | 日 ist selbst Radikal #72. |
| 71 | 无 | 早 (auch im Text) | 既 | 早 gehört zu 日. |
| 72 | 日 | 書, 最 | 明, 時, 早, 晩 | Beide werden traditionell unter 曰 (#73) indexiert. |
| 89 | 爻 | 片 (auch im Text) | 爽 | 片 ist selbst Radikal #91. |
| 90 | 爿 | 版 (auch im Text) | — (leer + Hinweis „selten“) | 版 gehört zu 片 (#91 nennt es korrekt). |
| 95 | 玄 | — | 率 | Behauptung, 玄 sei „Bestandteil in 王“, ist falsch. |
| 100 | 生 | 用 (im Text) | 産 | 用 ist selbst Radikal #101. |
| 109 | 目 | 知, 研 (auch im Text) | 直, 看, 着, 眠, 眼 | 知 → 矢 (#111), 研 → 石 (#112) — dort jeweils korrekt gelistet. |
| 114 | 禸 | 秀, 私 (auch im Text) | — (leer + Hinweis) | Beide gehören zu 禾 und enthalten kein 禸. |
| 119 | 米 | 約 | 粉 | 約 gehört zu 糸 (#120); der Text nennt 粉 bereits korrekt. |
| 138 | 艮 | 色 (im Text) | 良 | 色 = ⺈+巴, enthält kein 艮. Zudem Bedeutung „gut“ streichen (艮 = „innehalten/stur“; „gut“ ist 良). |
| 144 | 行 | 表 (auch im Text) | 術, 街, 衛 | 表 gehört zu 衣 (#145). |
| 146 | 襾 | 見 (im Text) | 要, 覆 | 見 enthält kein 襾. |
| 147 | 見 | 角 | 覚 | 角 ist selbst Radikal #148 (Tippfehler: 覚 U+899A vs. 角 U+89D2 wahrscheinlich). |
| 151 | 豆 | 短 | 豊, 豆 | 短 gehört zu 矢 (#111 nennt es korrekt); enthält 豆 nur als Komponente. |
| 153 | 豸 | 貞, 貨 (auch im Text) | 豹 oder leer | Beide gehören zu 貝 und enthalten kein 豸. |
| 160 | 辛 | 辰 (im Text) | 辛, 辞 | 辰 ist selbst Radikal #161. |
| 165 | 釆 | 重 (auch im Text) | 釈 | 重 gehört zu 里 (#166 nennt es korrekt) und enthält kein 釆. |
| 171 | 隶 | 難, 雨 (auch im Text) | 隷 | Beide komplett falsch (難 → 隹, 雨 = #173); 隷 ist in den Kanji-Daten vorhanden. |
| 178 | 韋 | 韻 (auch im Text) | 韓 | 韻 gehört zu 音 (#180). |
| 179 | 韭 | — | — | Behauptung, 韭 sei „Bestandteil in 音“, ist falsch. |
| 196 | 鳥 | **鸡** | 鶏 (bereits gelistet) | 鸡 ist **vereinfachtes Chinesisch**, kein japanisches Zeichen — entfernen. |
| 197 | 鹵 | 塩 | — | Shinjitai 塩 wird unter 土 indexiert; nur das traditionelle 鹽 gehört zu 鹵. Erklärung präzisieren. |
| 200 | 麻 | 麹 | 麻, 磨 | 麹 gehört zu 麦 (#199). |

Weitere Nicht-Shinjitai-Zeichen in Beispielen: 體 (bei #188, → durch 骸 ersetzen), 爸 (bei #87 — chinesisches Umgangswort, → 爵 ersetzen), 尨 (bei #43 — extrem selten, 就 wäre lernrelevanter).

### 1.4 Namen/Bedeutungen (kleinere Korrekturen)

- **#22 匚**: Lesung „かたがまえ/katagamae“ → Standard ist **はこがまえ (hakogamae)**.
- **#54 廴**: „いんにょう“ ist belegt, üblicher ist **えんにょう** (optional).
- **#56 弋**: Bedeutung „Armbrust-Schaft“ ist zweifelhaft; üblich: „Pfahl; Pfeil mit Fangleine“.
- **#138 艮**: Bedeutung „gut“ streichen (s. o.).
- **#183 飛**: „eines der komplexesten einsilbigen Kanji“ — sachlich sinnfreie Aussage, streichen.

### 1.5 Hinweis: `examples` wird von der UI nicht genutzt

Die Radikal-Detailansicht baut ihre Kanji-Listen aus `getPrimaryKanjiRadical`/`components` der Kanji-Daten; die `examples`-Arrays der Radikale-Datei werden aktuell nirgends gerendert. Sie sind trotzdem korrekturwürdig (Suche/zukünftige Nutzung), aber die Fehler in **Erklärungstexten** sind die nutzersichtbaren.

---

## Teil 2 — Befunde in `kanji-data.js` / `kanji-n1.js`

Positiv: keine Duplikate, 100 % SVG-Abdeckung, JLPT-Level konsistent mit KANJIDIC, Bedeutungen in der geprüften Menge korrekt.

### 2.1 Bestätigte Fehler

| Kanji | Feld | Ist | Soll |
|-------|------|-----|------|
| 衷 | strokes | 9 | **10** (KANJIDIC + SVG bestätigen) |
| 瀕 | strokes | 20 | **19** |
| 牙 | strokes | 5 | **4** (offizielle jap. Zählung; 5 ist eine Variantenzählung) |
| 旅 | meanings | „Reise, Reise“ | Duplikat entfernen |
| 化 | kun | か.わる | streichen (かわる ist 変わる; 化 hat ば.ける/ば.かす) |
| 詫 | on | タク | **タ** (詫び わび; On-Lesung ist タ) |
| 昆 | kun | むし | streichen (keine Kun-Lesung; 昆虫 ist コン) |
| 娘 | example | お嬢さん | enthält 娘 nicht → z. B. 一人娘 (ひとりむすめ) |
| 崎 | example | 岬 | enthält 崎 nicht → z. B. 長崎 (ながさき) |
| 慧 | example | 知恵 | enthält 慧 nicht → 智慧 (ちえ) oder 慧眼 (けいがん) |
| 房 | example | 部屋 | enthält 房 nicht → 暖房 (だんぼう) / 文房具 |
| 搖 | Eintrag | Kyūjitai | **揺 existiert bereits als eigener Eintrag** → 搖 entfernen oder als Variante kennzeichnen |
| 曾 | Eintrag | Kyūjitai | Jōyō-Form ist **曽** → Eintrag umstellen (曾 ggf. als Variante erwähnen) |

Komponenten-Beschriftungen, die die falsche Form benennen (mnemotechnisch irreführend): 買 „四“ → 罒 (Netz); 写 „宀“ → 冖; 夢 „目“ → 罒; 髪 „犬“ → streichen (Shinjitai hat 友); 春 „屯“ → streichen (Oberteil ist 𡗗); 発 „殳“ → 癶-Teile; 乗 „北“ → streichen; 単 „口“ → ⺌/田.

### 2.2 Grenzfälle (Entscheidung nötig, keine harten Fehler)

- **Rendaku als On-Lesung gelistet:** 山 „ザン“, 済 „ザイ“ — nur in Komposita (登山, 経済). Empfehlung: entfernen oder als Hinweis in Beispiele verlagern; als eigenständige On-Lesung sind sie unüblich.
- **する-Verben als Kun:** 屈 „くっ.する“, 瀕 „ひん.する“ — das sind On+する, keine Kun-Lesungen. In On-Beispiele verschieben.
- **Namenslesung als Kun:** 亮 „あきら“ (Nanori). Kennzeichnen oder entfernen.
- **噌**: Bedeutung „lärmend, laut“ ist wörtlich korrekt, aber für Lernende irreführend — praktisch existiert das Zeichen nur in 味噌. Bedeutung ergänzen: „(in) Miso“.
- **龍 und 竜 sind beide als Einträge vorhanden** — vertretbar (竜 = Jōyō, 龍 in Namen), sollte aber bewusst so bleiben.

### 2.3 Strichzahl-Politik bei Glyphenvarianten (26 Kanji)

Für die 2010er Jōyō-Zugänge u. ä. zählt die Datei die *vereinfachte Bildschirmvariante*, während die mitgelieferten Stroke-Order-SVGs (und die amtliche Zählung) die Druckform animieren — z. B. 葛 11 vs. 12, 餅 14 vs. 15, 謎 16 vs. 17, 遡 13 vs. 14, 遜 13 vs. 14, 賭 15 vs. 16, 僅 12 vs. 13, 櫛 17 vs. 19 … (vollständige Liste: 葛賭餅餌襖噌謎薯遜僅晦槌歎灘蝕辿迂遡榊櫛煉禰辻逗鑓漣 + 衷/瀕 oben).

**Empfehlung:** Strichzahl an die ausgelieferten SVGs angleichen (der Nutzer sieht die Animation; Zahl und Animation sollten übereinstimmen) — das entspricht zugleich der amtlichen Zählung.

---

## Teil 3 — Strukturelle Probleme (größter Hebel)

### 3.1 540 von 2 447 Kanji (22 %) haben keine Radikal-Verknüpfung

`getCanonicalRadicalMap()` matcht Komponenten nur gegen das exakte Zeichen der Radikale-Datei. Die Kanji-Daten verwenden aber überwiegend **Seitenformen**: 氵(132×), 亻(99×), 扌(98×), 艹(66×), 辶(57×), 阝(41×), 忄(35×), 刂(30×), 攵(27×), 犭(19×), 灬(18×), ⺮(16×), 礻(15×), 衤(13×), 罒(10×) … — zusammen ~690 Komponenten-Instanzen, die derzeit ins Leere laufen. Folgen:

- Radikal-Detailseiten (z. B. 水) zeigen keins der 132 氵-Kanji.
- Diese Kanji können nicht in der Radikal-Quizfrage erscheinen.
- `audit-kanji-radicals.js` pinnt das Problem mit `maxNoCanonical: 540` fest, statt es zu lösen.

**Fix:** Varianten-Tabelle im Radikal-Map (Variante → Kangxi-Nummer):
`亻→9, 刂→18, ⺌→42, 川↔巛, 忄→61, 戸→63, 扌→64, 攵→66, 氵→85, 灬→86, 爫→87, 犭→94, 王→96(玉), ⺹→125, 罒→122, 耂→125, ⺾/艹→140, 衤→145, 覀→146, 辶/⻌→162, ⻏(rechts)→163, ⻖(links)→170, 飠→184, ヨ/⺕→58, ⺮→118, ⺼→130` — plus die Zeichenkorrekturen aus 1.1. Damit sinkt `noCanonical` von 540 auf nahe 0, und der Audit-Schwellwert kann drastisch verschärft werden.

### 3.2 29 Kanji, die selbst Radikale sind, bekommen ein falsches Primärradikal

Die „erste-Komponente“-Heuristik liefert z. B.: 見→目, 貝→目, 赤→土, 走→土, 足→口, 音→立, 魚→田, 黒→里, 糸→幺, 里→田, 香→禾, 士→十, 谷→八, 舌→口, 穴→宀, 頁→一, 鬼→田, 龍→立 … (vollständige Liste im Audit reproduzierbar). Im Quiz („Welches Radikal ist in diesem Kanji enthalten?“) und auf den Detailseiten ist das lexikografisch falsch.

**Fix (klein):** In `getPrimaryKanjiRadical` eine Selbst-Radikal-Regel ergänzen: Ist `item.kanji` selbst ein kanonisches Radikal (inkl. Shinjitai-Äquivalent wie 竜→龍), dann ist es sein eigenes Primärradikal. Alternativ die 29 Einträge in `KANJI_PRIMARY_RADICAL_OVERRIDES` eintragen (der Mechanismus existiert bereits und ist leer).

---

## Korrekturplan

### Phase 1 — Mechanische Datenfixes (geringes Risiko, hoher Faktengewinn) ✅ umgesetzt (2026-07-05)

Zusätzlich umgesetzt: Beispiel 军 (vereinfachtes Chinesisch) bei #14 → 軍; 亲 bei #8 → 亡; Eintrag 搖 entfernt (揺 existiert); 曾 → 曽 inkl. neuem Stroke-Order-SVG (26365.svg aus AnimCJK); Komponenten von 揺/遥 korrigiert (referenzierten die Kyūjitai-Einträge). Hinweis: Strichzahlen 瀕=19 und 牙=4 folgen Kanjipedia/KanjiVG; die KANJIDIC-Ableitung nennt 20/5 (Variantenzählung).

1. `kangxi-radicals-data.js`: Radikal-Zeichen #54 → 廴, #63 → 戸, #162 → 辶; Strichzahlen #199 → 7, #213 → 11; Glyphen #210 → 斉 (8), #211 → 歯 (12).
2. Alle falschen Beispiel-Kanji gemäß Tabelle 1.3 ersetzen/entfernen (inkl. 鸡, 體, 爸); betroffene Erklärungssätze mitkorrigieren (insb. #43 komplett neu).
3. Namen/Bedeutungen aus 1.4 (はこがまえ usw.).
4. `kanji-data.js`/`kanji-n1.js`: Fixes aus Tabelle 2.1 (衷, 瀕, 牙, 旅, 化, 詫, 昆, 4 Beispielwörter, 搖/曾-Varianten) und Komponenten-Beschriftungen.

### Phase 2 — Strukturfixes (mittlerer Aufwand, größter Nutzen) ✅ umgesetzt (2026-07-05)

Umsetzung: Varianten-Tabelle `KANJI_RADICAL_VARIANTS` in `app-constants.js` (inkl. Lazy-Load-sicherem Cache); Selbst-Radikal-Regel in `getPrimaryKanjiRadical`; die 41 mehrdeutigen `阝`-Komponenten in den Kanji-Daten nach ⻏ (rechts, 邑) / ⻖ (links, 阜) aufgeteilt (隷 hatte fälschlich ein 阝 — entfernt); ~60 wörterbuch-verifizierte Einträge in `KANJI_PRIMARY_RADICAL_OVERRIDES` (klassische Ausnahmen wie 初→刀, 酒→酉, 化→匕, 愛→心, 染→木 sowie alle komponentenlosen Kanji wie 五/九/世); Komponentenfixes 剤 (齊→斉) und 服 (⺼→月); UI-Konsumenten (`section-configs.js` Komponenten-Tags + Sekundärliste, `app.js` openRadicalInTab) lösen Variantenformen jetzt kanonisch auf. Ergebnis: `noCanonical` 540 → 40 (Schwellwert auf 45 verschärft), **alle 2 446 Kanji haben ein Primärradikal** (neuer Audit-Schwellwert `maxNoPrimary: 0`); alle 653 Primärradikal-Änderungen wurden gruppiert reviewt.

5. Varianten-Mapping in `getCanonicalRadicalMap()` (3.1) — als Daten (`variants: []` pro Radikal-Eintrag) oder als Tabelle in `app-constants.js`.
6. Selbst-Radikal-Regel bzw. Overrides für die 29 Kanji (3.2).
7. `audit-kanji-radicals.js`: `maxNoCanonical` von 540 auf den neuen Ist-Wert (+kleiner Puffer) senken, damit Regressionen auffallen.

### Phase 3 — Politik-Entscheidungen & Kür ✅ umgesetzt (2026-07-05)

Umsetzung: **Strichzahl-Politik festgelegt** — die Strichzahl folgt der mitgelieferten Stroke-Order-Animation (AnimCJK, entspricht der amtlichen Druckform); die 26 Glyphenvarianten-Kanji wurden angeglichen und `scripts/stroke-count-test.js` (Teil von `npm test`) sichert die Übereinstimmung aller 2 446 Kanji dauerhaft ab. **Lesungs-Bereinigung:** Rendaku-On-Lesungen entfernt (山 ザン, 済 ザイ, 旛 バン), する-Verben aus Kun entfernt (屈 くっ.する → かが.める ergänzt, 瀕 ひん.する), Namenslesungen entfernt (亮 あきら, 斐 あや), Duplikat-Kun 呆 ぼう → ほ.ける, 噌-Bedeutung um »Miso (in 味噌)« ergänzt. **Externes Prüfskript:** `npm run audit:kanji-external` (manuell, lädt KANJIDIC-Referenz in gitignorierten Cache; EDRDG CC BY-SA-Attribution im Skriptkopf) validiert Lesungen/JLPT mit dokumentierter Whitelist der 46 geprüften, bewusst abweichenden Einträge — läuft aktuell fehlerfrei.

8. Strichzahl-Politik für Glyphenvarianten festlegen (Empfehlung: an SVGs/amtliche Zählung angleichen, 26 Einträge).
9. Rendaku-/Nanori-/する-Lesungen bereinigen oder kennzeichnen (2.2).
10. Optional: Prüfskript nach `scripts/` übernehmen (KANJIDIC/KRADFILE-Abgleich als CI-Check; Achtung: EDRDG-Daten sind CC BY-SA, Attribution nötig, oder nur lokal/manuell laufen lassen).
11. Optional: `examples` der Radikale entweder in der Detailansicht rendern oder als „kanonische Mitglieder“ dokumentieren — dann gelten die strengeren Zugehörigkeitsregeln aus 1.3 dauerhaft.

### Verifikation

- `node audit-kanji-radicals.js` (nach Phase 2 mit verschärften Schwellwerten)
- `node scripts/smoke-test.js` / bestehende Test-Workflow-Checks
- Stichprobe der Radikal-Detailseiten (水, 手, 心, 辶, 戸) — die Seitenform-Kanji müssen jetzt erscheinen.
