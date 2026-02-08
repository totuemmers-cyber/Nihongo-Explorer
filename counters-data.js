// === Zahlen & Zählwörter (Numbers & Counters) Data ===
window.COUNTERS_DATA = {
  // === Grundzahlen (Basic Numbers) ===
  basicNumbers: [
    { number: 1, kanji: '一', hiragana: 'いち', romaji: 'ichi', notes: '' },
    { number: 2, kanji: '二', hiragana: 'に', romaji: 'ni', notes: '' },
    { number: 3, kanji: '三', hiragana: 'さん', romaji: 'san', notes: '' },
    { number: 4, kanji: '四', hiragana: 'し / よん', romaji: 'shi / yon', notes: 'し (shi) ist die On-Lesung, よん (yon) ist die Kun-Lesung. よん wird bevorzugt, da し auch „Tod" (死) bedeuten kann.' },
    { number: 5, kanji: '五', hiragana: 'ご', romaji: 'go', notes: '' },
    { number: 6, kanji: '六', hiragana: 'ろく', romaji: 'roku', notes: '' },
    { number: 7, kanji: '七', hiragana: 'しち / なな', romaji: 'shichi / nana', notes: 'なな (nana) wird oft bevorzugt, da しち mit いち (1) verwechselt werden kann.' },
    { number: 8, kanji: '八', hiragana: 'はち', romaji: 'hachi', notes: '' },
    { number: 9, kanji: '九', hiragana: 'きゅう / く', romaji: 'kyū / ku', notes: 'きゅう (kyū) ist häufiger. く (ku) kann „Leid" (苦) bedeuten und wird vermieden.' },
    { number: 10, kanji: '十', hiragana: 'じゅう', romaji: 'jū', notes: '' },
    { number: 100, kanji: '百', hiragana: 'ひゃく', romaji: 'hyaku', notes: '300 = さんびゃく, 600 = ろっぴゃく, 800 = はっぴゃく (Lautverschiebungen!)' },
    { number: 1000, kanji: '千', hiragana: 'せん', romaji: 'sen', notes: '3000 = さんぜん, 8000 = はっせん (Lautverschiebungen!)' },
    { number: 10000, kanji: '万', hiragana: 'まん', romaji: 'man', notes: 'Japanisch zählt in 10.000er-Einheiten statt Millionen.' }
  ],

  // === Zählwörter (Counter Words) ===
  counters: [
    // ===== MENSCHEN =====
    {
      id: 'nin',
      kanji: '人',
      reading: 'にん / り',
      romaji: 'nin / ri',
      meaning: 'Menschen, Personen',
      usage: 'Zum Zählen von Personen',
      category: 'Menschen',
      questionWord: { kanji: '何人', reading: 'なんにん', romaji: 'nannin' },
      counts: [
        { num: 1, kanji: '一人', reading: 'ひとり', romaji: 'hitori', shift: true },
        { num: 2, kanji: '二人', reading: 'ふたり', romaji: 'futari', shift: true },
        { num: 3, kanji: '三人', reading: 'さんにん', romaji: 'sannin', shift: false },
        { num: 4, kanji: '四人', reading: 'よにん', romaji: 'yonin', shift: false },
        { num: 5, kanji: '五人', reading: 'ごにん', romaji: 'gonin', shift: false },
        { num: 6, kanji: '六人', reading: 'ろくにん', romaji: 'rokunin', shift: false },
        { num: 7, kanji: '七人', reading: 'しちにん / ななにん', romaji: 'shichinin / nananin', shift: false },
        { num: 8, kanji: '八人', reading: 'はちにん', romaji: 'hachinin', shift: false },
        { num: 9, kanji: '九人', reading: 'きゅうにん / くにん', romaji: 'kyūnin / kunin', shift: false },
        { num: 10, kanji: '十人', reading: 'じゅうにん', romaji: 'jūnin', shift: false }
      ],
      specialCounts: [
        { num: 4, kanji: '四人', reading: 'よにん', romaji: 'yonin', note: 'よ (nicht し)' },
        { num: 14, kanji: '十四人', reading: 'じゅうよにん', romaji: 'jūyonin', note: '' }
      ],
      examples: [
        { japanese: '三人の学生がいます。', romaji: 'Sannin no gakusei ga imasu.', german: 'Es gibt drei Studenten.' },
        { japanese: '一人で来ました。', romaji: 'Hitori de kimashita.', german: 'Ich bin alleine gekommen.' }
      ],
      notes: '1 und 2 sind komplett unregelmäßig (ひとり, ふたり). Ab 3 wird にん verwendet.'
    },

    // ===== OBJEKTE =====
    {
      id: 'ko',
      kanji: '個',
      reading: 'こ',
      romaji: 'ko',
      meaning: 'Kleine Objekte, allgemeiner Zähler',
      usage: 'Kleine, kompakte Gegenstände (Äpfel, Eier, Bälle usw.)',
      category: 'Objekte',
      questionWord: { kanji: '何個', reading: 'なんこ', romaji: 'nanko' },
      counts: [
        { num: 1, kanji: '一個', reading: 'いっこ', romaji: 'ikko', shift: true },
        { num: 2, kanji: '二個', reading: 'にこ', romaji: 'niko', shift: false },
        { num: 3, kanji: '三個', reading: 'さんこ', romaji: 'sanko', shift: false },
        { num: 4, kanji: '四個', reading: 'よんこ', romaji: 'yonko', shift: false },
        { num: 5, kanji: '五個', reading: 'ごこ', romaji: 'goko', shift: false },
        { num: 6, kanji: '六個', reading: 'ろっこ', romaji: 'rokko', shift: true },
        { num: 7, kanji: '七個', reading: 'ななこ', romaji: 'nanako', shift: false },
        { num: 8, kanji: '八個', reading: 'はっこ', romaji: 'hakko', shift: true },
        { num: 9, kanji: '九個', reading: 'きゅうこ', romaji: 'kyūko', shift: false },
        { num: 10, kanji: '十個', reading: 'じゅっこ', romaji: 'jukko', shift: true }
      ],
      specialCounts: [],
      examples: [
        { japanese: 'りんごを三個ください。', romaji: 'Ringo o sanko kudasai.', german: 'Drei Äpfel, bitte.' },
        { japanese: '卵を六個買いました。', romaji: 'Tamago o rokko kaimashita.', german: 'Ich habe sechs Eier gekauft.' }
      ],
      notes: 'Universeller Zähler für kleine, kompakte Objekte. Kann auch als allgemeiner Zähler verwendet werden, wenn man den spezifischen Zähler nicht kennt.'
    },
    {
      id: 'mai',
      kanji: '枚',
      reading: 'まい',
      romaji: 'mai',
      meaning: 'Flache Dinge',
      usage: 'Papier, Teller, T-Shirts, Tickets, Scheiben, Blätter',
      category: 'Objekte',
      questionWord: { kanji: '何枚', reading: 'なんまい', romaji: 'nanmai' },
      counts: [
        { num: 1, kanji: '一枚', reading: 'いちまい', romaji: 'ichimai', shift: false },
        { num: 2, kanji: '二枚', reading: 'にまい', romaji: 'nimai', shift: false },
        { num: 3, kanji: '三枚', reading: 'さんまい', romaji: 'sanmai', shift: false },
        { num: 4, kanji: '四枚', reading: 'よんまい', romaji: 'yonmai', shift: false },
        { num: 5, kanji: '五枚', reading: 'ごまい', romaji: 'gomai', shift: false },
        { num: 6, kanji: '六枚', reading: 'ろくまい', romaji: 'rokumai', shift: false },
        { num: 7, kanji: '七枚', reading: 'ななまい', romaji: 'nanamai', shift: false },
        { num: 8, kanji: '八枚', reading: 'はちまい', romaji: 'hachimai', shift: false },
        { num: 9, kanji: '九枚', reading: 'きゅうまい', romaji: 'kyūmai', shift: false },
        { num: 10, kanji: '十枚', reading: 'じゅうまい', romaji: 'jūmai', shift: false }
      ],
      specialCounts: [],
      examples: [
        { japanese: '切手を五枚買いました。', romaji: 'Kitte o gomai kaimashita.', german: 'Ich habe fünf Briefmarken gekauft.' },
        { japanese: '紙が何枚ありますか。', romaji: 'Kami ga nanmai arimasu ka.', german: 'Wie viele Blätter Papier gibt es?' }
      ],
      notes: 'Einer der einfachsten Zähler – keine Lautverschiebungen! Wird für alles Flache und Dünne verwendet.'
    },
    {
      id: 'hon',
      kanji: '本',
      reading: 'ほん',
      romaji: 'hon',
      meaning: 'Lange, zylindrische Objekte',
      usage: 'Stifte, Flaschen, Regenschirme, Bäume, Filme, Telefonanrufe',
      category: 'Objekte',
      questionWord: { kanji: '何本', reading: 'なんぼん', romaji: 'nanbon' },
      counts: [
        { num: 1, kanji: '一本', reading: 'いっぽん', romaji: 'ippon', shift: true },
        { num: 2, kanji: '二本', reading: 'にほん', romaji: 'nihon', shift: false },
        { num: 3, kanji: '三本', reading: 'さんぼん', romaji: 'sanbon', shift: true },
        { num: 4, kanji: '四本', reading: 'よんほん', romaji: 'yonhon', shift: false },
        { num: 5, kanji: '五本', reading: 'ごほん', romaji: 'gohon', shift: false },
        { num: 6, kanji: '六本', reading: 'ろっぽん', romaji: 'roppon', shift: true },
        { num: 7, kanji: '七本', reading: 'ななほん', romaji: 'nanahon', shift: false },
        { num: 8, kanji: '八本', reading: 'はっぽん', romaji: 'happon', shift: true },
        { num: 9, kanji: '九本', reading: 'きゅうほん', romaji: 'kyūhon', shift: false },
        { num: 10, kanji: '十本', reading: 'じゅっぽん', romaji: 'juppon', shift: true }
      ],
      specialCounts: [],
      examples: [
        { japanese: 'ペンを三本持っています。', romaji: 'Pen o sanbon motte imasu.', german: 'Ich habe drei Stifte.' },
        { japanese: '映画を一本見ました。', romaji: 'Eiga o ippon mimashita.', german: 'Ich habe einen Film gesehen.' }
      ],
      notes: 'Klassisches Beispiel für Lautverschiebungen: ほん → ぼん (nach ん) und ぽん (nach っ). Wird auch für abstrakt „lange" Dinge wie Filme und Anrufe verwendet.'
    },
    {
      id: 'dai',
      kanji: '台',
      reading: 'だい',
      romaji: 'dai',
      meaning: 'Maschinen, Fahrzeuge',
      usage: 'Autos, Computer, Fernseher, Waschmaschinen',
      category: 'Objekte',
      questionWord: { kanji: '何台', reading: 'なんだい', romaji: 'nandai' },
      counts: [
        { num: 1, kanji: '一台', reading: 'いちだい', romaji: 'ichidai', shift: false },
        { num: 2, kanji: '二台', reading: 'にだい', romaji: 'nidai', shift: false },
        { num: 3, kanji: '三台', reading: 'さんだい', romaji: 'sandai', shift: false },
        { num: 4, kanji: '四台', reading: 'よんだい', romaji: 'yondai', shift: false },
        { num: 5, kanji: '五台', reading: 'ごだい', romaji: 'godai', shift: false },
        { num: 6, kanji: '六台', reading: 'ろくだい', romaji: 'rokudai', shift: false },
        { num: 7, kanji: '七台', reading: 'ななだい', romaji: 'nanadai', shift: false },
        { num: 8, kanji: '八台', reading: 'はちだい', romaji: 'hachidai', shift: false },
        { num: 9, kanji: '九台', reading: 'きゅうだい', romaji: 'kyūdai', shift: false },
        { num: 10, kanji: '十台', reading: 'じゅうだい', romaji: 'jūdai', shift: false }
      ],
      specialCounts: [],
      examples: [
        { japanese: '車が二台あります。', romaji: 'Kuruma ga nidai arimasu.', german: 'Es gibt zwei Autos.' },
        { japanese: 'パソコンを一台買いました。', romaji: 'Pasokon o ichidai kaimashita.', german: 'Ich habe einen Computer gekauft.' }
      ],
      notes: 'Keine Lautverschiebungen – ein einfacher Zähler. Wird für alle mechanischen oder elektronischen Geräte verwendet.'
    },
    {
      id: 'satsu',
      kanji: '冊',
      reading: 'さつ',
      romaji: 'satsu',
      meaning: 'Bücher, gebundene Werke',
      usage: 'Bücher, Hefte, Magazine, Notizbücher',
      category: 'Objekte',
      questionWord: { kanji: '何冊', reading: 'なんさつ', romaji: 'nansatsu' },
      counts: [
        { num: 1, kanji: '一冊', reading: 'いっさつ', romaji: 'issatsu', shift: true },
        { num: 2, kanji: '二冊', reading: 'にさつ', romaji: 'nisatsu', shift: false },
        { num: 3, kanji: '三冊', reading: 'さんさつ', romaji: 'sansatsu', shift: false },
        { num: 4, kanji: '四冊', reading: 'よんさつ', romaji: 'yonsatsu', shift: false },
        { num: 5, kanji: '五冊', reading: 'ごさつ', romaji: 'gosatsu', shift: false },
        { num: 6, kanji: '六冊', reading: 'ろくさつ', romaji: 'rokusatsu', shift: false },
        { num: 7, kanji: '七冊', reading: 'ななさつ', romaji: 'nanasatsu', shift: false },
        { num: 8, kanji: '八冊', reading: 'はっさつ', romaji: 'hassatsu', shift: true },
        { num: 9, kanji: '九冊', reading: 'きゅうさつ', romaji: 'kyūsatsu', shift: false },
        { num: 10, kanji: '十冊', reading: 'じゅっさつ', romaji: 'jussatsu', shift: true }
      ],
      specialCounts: [],
      examples: [
        { japanese: '本を三冊読みました。', romaji: 'Hon o sansatsu yomimashita.', german: 'Ich habe drei Bücher gelesen.' },
        { japanese: '雑誌を一冊ください。', romaji: 'Zasshi o issatsu kudasai.', german: 'Ein Magazin, bitte.' }
      ],
      notes: 'Lautverschiebungen bei 1 (いっさつ), 8 (はっさつ), 10 (じゅっさつ).'
    },
    {
      id: 'hai',
      kanji: '杯',
      reading: 'はい',
      romaji: 'hai',
      meaning: 'Getränke, Gefäße',
      usage: 'Tassen, Gläser, Schüsseln (Kaffee, Tee, Reis, Bier)',
      category: 'Objekte',
      questionWord: { kanji: '何杯', reading: 'なんばい', romaji: 'nanbai' },
      counts: [
        { num: 1, kanji: '一杯', reading: 'いっぱい', romaji: 'ippai', shift: true },
        { num: 2, kanji: '二杯', reading: 'にはい', romaji: 'nihai', shift: false },
        { num: 3, kanji: '三杯', reading: 'さんばい', romaji: 'sanbai', shift: true },
        { num: 4, kanji: '四杯', reading: 'よんはい', romaji: 'yonhai', shift: false },
        { num: 5, kanji: '五杯', reading: 'ごはい', romaji: 'gohai', shift: false },
        { num: 6, kanji: '六杯', reading: 'ろっぱい', romaji: 'roppai', shift: true },
        { num: 7, kanji: '七杯', reading: 'ななはい', romaji: 'nanahai', shift: false },
        { num: 8, kanji: '八杯', reading: 'はっぱい', romaji: 'happai', shift: true },
        { num: 9, kanji: '九杯', reading: 'きゅうはい', romaji: 'kyūhai', shift: false },
        { num: 10, kanji: '十杯', reading: 'じゅっぱい', romaji: 'juppai', shift: true }
      ],
      specialCounts: [],
      examples: [
        { japanese: 'コーヒーを一杯飲みました。', romaji: 'Kōhī o ippai nomimashita.', german: 'Ich habe eine Tasse Kaffee getrunken.' },
        { japanese: 'ビールを三杯注文しました。', romaji: 'Bīru o sanbai chūmon shimashita.', german: 'Ich habe drei Gläser Bier bestellt.' }
      ],
      notes: 'Gleiche Lautverschiebungsmuster wie 本: は→ば (nach ん) und ぱ (nach っ). いっぱい bedeutet auch „voll" oder „viel"!'
    },

    // ===== TIERE =====
    {
      id: 'hiki',
      kanji: '匹',
      reading: 'ひき',
      romaji: 'hiki',
      meaning: 'Kleine Tiere',
      usage: 'Katzen, Hunde, Fische, Insekten, kleine bis mittelgroße Tiere',
      category: 'Tiere',
      questionWord: { kanji: '何匹', reading: 'なんびき', romaji: 'nanbiki' },
      counts: [
        { num: 1, kanji: '一匹', reading: 'いっぴき', romaji: 'ippiki', shift: true },
        { num: 2, kanji: '二匹', reading: 'にひき', romaji: 'nihiki', shift: false },
        { num: 3, kanji: '三匹', reading: 'さんびき', romaji: 'sanbiki', shift: true },
        { num: 4, kanji: '四匹', reading: 'よんひき', romaji: 'yonhiki', shift: false },
        { num: 5, kanji: '五匹', reading: 'ごひき', romaji: 'gohiki', shift: false },
        { num: 6, kanji: '六匹', reading: 'ろっぴき', romaji: 'roppiki', shift: true },
        { num: 7, kanji: '七匹', reading: 'ななひき', romaji: 'nanahiki', shift: false },
        { num: 8, kanji: '八匹', reading: 'はっぴき', romaji: 'happiki', shift: true },
        { num: 9, kanji: '九匹', reading: 'きゅうひき', romaji: 'kyūhiki', shift: false },
        { num: 10, kanji: '十匹', reading: 'じゅっぴき', romaji: 'juppiki', shift: true }
      ],
      specialCounts: [],
      examples: [
        { japanese: '猫を二匹飼っています。', romaji: 'Neko o nihiki katte imasu.', german: 'Ich halte zwei Katzen.' },
        { japanese: '魚が五匹泳いでいます。', romaji: 'Sakana ga gohiki oyoide imasu.', german: 'Fünf Fische schwimmen.' }
      ],
      notes: 'Gleiche Lautverschiebungsmuster wie 本 und 杯: ひ→び (nach ん) und ぴ (nach っ). Für große Tiere wird 頭 verwendet.'
    },
    {
      id: 'tou',
      kanji: '頭',
      reading: 'とう',
      romaji: 'tō',
      meaning: 'Große Tiere',
      usage: 'Pferde, Kühe, Elefanten, Wale – große Tiere',
      category: 'Tiere',
      questionWord: { kanji: '何頭', reading: 'なんとう', romaji: 'nantō' },
      counts: [
        { num: 1, kanji: '一頭', reading: 'いっとう', romaji: 'ittō', shift: true },
        { num: 2, kanji: '二頭', reading: 'にとう', romaji: 'nitō', shift: false },
        { num: 3, kanji: '三頭', reading: 'さんとう', romaji: 'santō', shift: false },
        { num: 4, kanji: '四頭', reading: 'よんとう', romaji: 'yontō', shift: false },
        { num: 5, kanji: '五頭', reading: 'ごとう', romaji: 'gotō', shift: false },
        { num: 6, kanji: '六頭', reading: 'ろくとう', romaji: 'rokutō', shift: false },
        { num: 7, kanji: '七頭', reading: 'ななとう', romaji: 'nanatō', shift: false },
        { num: 8, kanji: '八頭', reading: 'はっとう', romaji: 'hattō', shift: true },
        { num: 9, kanji: '九頭', reading: 'きゅうとう', romaji: 'kyūtō', shift: false },
        { num: 10, kanji: '十頭', reading: 'じゅっとう', romaji: 'juttō', shift: true }
      ],
      specialCounts: [],
      examples: [
        { japanese: '牧場に馬が三頭います。', romaji: 'Bokujō ni uma ga santō imasu.', german: 'Auf der Weide sind drei Pferde.' },
        { japanese: '動物園に象が一頭います。', romaji: 'Dōbutsuen ni zō ga ittō imasu.', german: 'Im Zoo ist ein Elefant.' }
      ],
      notes: 'Wird für Tiere verwendet, die ungefähr so groß wie ein Mensch oder größer sind. Wenige Lautverschiebungen (1, 8, 10).'
    },

    // ===== ZEIT =====
    {
      id: 'kai-floor',
      kanji: '階',
      reading: 'かい',
      romaji: 'kai',
      meaning: 'Stockwerke',
      usage: 'Gebäudestockwerke, Etagen',
      category: 'Zeit',
      questionWord: { kanji: '何階', reading: 'なんがい', romaji: 'nangai' },
      counts: [
        { num: 1, kanji: '一階', reading: 'いっかい', romaji: 'ikkai', shift: true },
        { num: 2, kanji: '二階', reading: 'にかい', romaji: 'nikai', shift: false },
        { num: 3, kanji: '三階', reading: 'さんがい', romaji: 'sangai', shift: true },
        { num: 4, kanji: '四階', reading: 'よんかい', romaji: 'yonkai', shift: false },
        { num: 5, kanji: '五階', reading: 'ごかい', romaji: 'gokai', shift: false },
        { num: 6, kanji: '六階', reading: 'ろっかい', romaji: 'rokkai', shift: true },
        { num: 7, kanji: '七階', reading: 'ななかい', romaji: 'nanakai', shift: false },
        { num: 8, kanji: '八階', reading: 'はっかい', romaji: 'hakkai', shift: true },
        { num: 9, kanji: '九階', reading: 'きゅうかい', romaji: 'kyūkai', shift: false },
        { num: 10, kanji: '十階', reading: 'じゅっかい', romaji: 'jukkai', shift: true }
      ],
      specialCounts: [
        { num: 'B1', kanji: '地下一階', reading: 'ちかいっかい', romaji: 'chika ikkai', note: 'Untergeschoss' }
      ],
      examples: [
        { japanese: '私の部屋は三階にあります。', romaji: 'Watashi no heya wa sangai ni arimasu.', german: 'Mein Zimmer ist im dritten Stock.' },
        { japanese: 'エレベーターで五階まで行きました。', romaji: 'Erebētā de gokai made ikimashita.', german: 'Ich bin mit dem Aufzug in den fünften Stock gefahren.' }
      ],
      notes: '3階 ist さんがい (nicht さんかい) – eine häufig geprüfte Ausnahme! Das Fragewort 何階 wird なんがい gelesen.'
    },
    {
      id: 'kai-times',
      kanji: '回',
      reading: 'かい',
      romaji: 'kai',
      meaning: 'Häufigkeit, Mal',
      usage: 'Anzahl der Male, Wiederholungen',
      category: 'Zeit',
      questionWord: { kanji: '何回', reading: 'なんかい', romaji: 'nankai' },
      counts: [
        { num: 1, kanji: '一回', reading: 'いっかい', romaji: 'ikkai', shift: true },
        { num: 2, kanji: '二回', reading: 'にかい', romaji: 'nikai', shift: false },
        { num: 3, kanji: '三回', reading: 'さんかい', romaji: 'sankai', shift: false },
        { num: 4, kanji: '四回', reading: 'よんかい', romaji: 'yonkai', shift: false },
        { num: 5, kanji: '五回', reading: 'ごかい', romaji: 'gokai', shift: false },
        { num: 6, kanji: '六回', reading: 'ろっかい', romaji: 'rokkai', shift: true },
        { num: 7, kanji: '七回', reading: 'ななかい', romaji: 'nanakai', shift: false },
        { num: 8, kanji: '八回', reading: 'はっかい', romaji: 'hakkai', shift: true },
        { num: 9, kanji: '九回', reading: 'きゅうかい', romaji: 'kyūkai', shift: false },
        { num: 10, kanji: '十回', reading: 'じゅっかい', romaji: 'jukkai', shift: true }
      ],
      specialCounts: [],
      examples: [
        { japanese: '日本に三回行きました。', romaji: 'Nihon ni sankai ikimashita.', german: 'Ich war drei Mal in Japan.' },
        { japanese: '一回やってみてください。', romaji: 'Ikkai yatte mite kudasai.', german: 'Versuchen Sie es einmal.' }
      ],
      notes: 'Anders als 階 hat 回 bei 3 keine Lautverschiebung: さんかい (nicht さんがい).'
    },
    {
      id: 'sai',
      kanji: '歳',
      reading: 'さい',
      romaji: 'sai',
      meaning: 'Alter (Jahre)',
      usage: 'Lebensalter von Personen',
      category: 'Zeit',
      questionWord: { kanji: '何歳', reading: 'なんさい', romaji: 'nansai' },
      counts: [
        { num: 1, kanji: '一歳', reading: 'いっさい', romaji: 'issai', shift: true },
        { num: 2, kanji: '二歳', reading: 'にさい', romaji: 'nisai', shift: false },
        { num: 3, kanji: '三歳', reading: 'さんさい', romaji: 'sansai', shift: false },
        { num: 4, kanji: '四歳', reading: 'よんさい', romaji: 'yonsai', shift: false },
        { num: 5, kanji: '五歳', reading: 'ごさい', romaji: 'gosai', shift: false },
        { num: 6, kanji: '六歳', reading: 'ろくさい', romaji: 'rokusai', shift: false },
        { num: 7, kanji: '七歳', reading: 'ななさい', romaji: 'nanasai', shift: false },
        { num: 8, kanji: '八歳', reading: 'はっさい', romaji: 'hassai', shift: true },
        { num: 9, kanji: '九歳', reading: 'きゅうさい', romaji: 'kyūsai', shift: false },
        { num: 10, kanji: '十歳', reading: 'じゅっさい', romaji: 'jussai', shift: true }
      ],
      specialCounts: [
        { num: 20, kanji: '二十歳', reading: 'はたち', romaji: 'hatachi', note: 'Komplett unregelmäßig! Wichtiges Alter (Volljährigkeit).' }
      ],
      examples: [
        { japanese: '私は二十五歳です。', romaji: 'Watashi wa nijūgo-sai desu.', german: 'Ich bin 25 Jahre alt.' },
        { japanese: '娘は三歳になりました。', romaji: 'Musume wa sansai ni narimashita.', german: 'Meine Tochter ist drei Jahre alt geworden.' }
      ],
      notes: '20歳 = はたち ist eine der bekanntesten Ausnahmen im Japanischen. 才 ist eine vereinfachte Schreibweise von 歳.'
    },
    {
      id: 'ji',
      kanji: '時',
      reading: 'じ',
      romaji: 'ji',
      meaning: 'Uhrzeit (Stunden)',
      usage: 'Volle Stunden bei der Uhrzeitangabe',
      category: 'Zeit',
      questionWord: { kanji: '何時', reading: 'なんじ', romaji: 'nanji' },
      counts: [
        { num: 1, kanji: '一時', reading: 'いちじ', romaji: 'ichiji', shift: false },
        { num: 2, kanji: '二時', reading: 'にじ', romaji: 'niji', shift: false },
        { num: 3, kanji: '三時', reading: 'さんじ', romaji: 'sanji', shift: false },
        { num: 4, kanji: '四時', reading: 'よじ', romaji: 'yoji', shift: true },
        { num: 5, kanji: '五時', reading: 'ごじ', romaji: 'goji', shift: false },
        { num: 6, kanji: '六時', reading: 'ろくじ', romaji: 'rokuji', shift: false },
        { num: 7, kanji: '七時', reading: 'しちじ', romaji: 'shichiji', shift: true },
        { num: 8, kanji: '八時', reading: 'はちじ', romaji: 'hachiji', shift: false },
        { num: 9, kanji: '九時', reading: 'くじ', romaji: 'kuji', shift: true },
        { num: 10, kanji: '十時', reading: 'じゅうじ', romaji: 'jūji', shift: false }
      ],
      specialCounts: [
        { num: 12, kanji: '十二時', reading: 'じゅうにじ', romaji: 'jūniji', note: '12 Uhr (Mittag/Mitternacht)' }
      ],
      examples: [
        { japanese: '今、三時です。', romaji: 'Ima, sanji desu.', german: 'Es ist jetzt drei Uhr.' },
        { japanese: '七時に起きます。', romaji: 'Shichiji ni okimasu.', german: 'Ich stehe um sieben Uhr auf.' }
      ],
      notes: 'Achtung: 4時 = よじ (nicht よんじ), 7時 = しちじ (nicht ななじ), 9時 = くじ (nicht きゅうじ). Diese Ausnahmen werden häufig in Prüfungen abgefragt!'
    },
    {
      id: 'fun',
      kanji: '分',
      reading: 'ふん',
      romaji: 'fun',
      meaning: 'Minuten',
      usage: 'Minutenangaben bei Uhrzeiten und Zeitdauern',
      category: 'Zeit',
      questionWord: { kanji: '何分', reading: 'なんぷん', romaji: 'nanpun' },
      counts: [
        { num: 1, kanji: '一分', reading: 'いっぷん', romaji: 'ippun', shift: true },
        { num: 2, kanji: '二分', reading: 'にふん', romaji: 'nifun', shift: false },
        { num: 3, kanji: '三分', reading: 'さんぷん', romaji: 'sanpun', shift: true },
        { num: 4, kanji: '四分', reading: 'よんぷん', romaji: 'yonpun', shift: true },
        { num: 5, kanji: '五分', reading: 'ごふん', romaji: 'gofun', shift: false },
        { num: 6, kanji: '六分', reading: 'ろっぷん', romaji: 'roppun', shift: true },
        { num: 7, kanji: '七分', reading: 'ななふん', romaji: 'nanafun', shift: false },
        { num: 8, kanji: '八分', reading: 'はっぷん', romaji: 'happun', shift: true },
        { num: 9, kanji: '九分', reading: 'きゅうふん', romaji: 'kyūfun', shift: false },
        { num: 10, kanji: '十分', reading: 'じゅっぷん', romaji: 'juppun', shift: true }
      ],
      specialCounts: [
        { num: 30, kanji: '三十分', reading: 'さんじゅっぷん / はん', romaji: 'sanjuppun / han', note: 'はん (半) = halb, z.B. 三時半 = halb vier' }
      ],
      examples: [
        { japanese: '五分待ってください。', romaji: 'Gofun matte kudasai.', german: 'Bitte warten Sie fünf Minuten.' },
        { japanese: '駅まで十分かかります。', romaji: 'Eki made juppun kakarimasu.', german: 'Bis zum Bahnhof dauert es zehn Minuten.' }
      ],
      notes: 'Besonders viele Lautverschiebungen! ふん wechselt zu ぷん bei 1, 3, 4, 6, 8, 10. 十分 (じゅっぷん) als Minuten vs. 十分 (じゅうぶん) = „genug".'
    },
    {
      id: 'shukan',
      kanji: '週間',
      reading: 'しゅうかん',
      romaji: 'shūkan',
      meaning: 'Wochen (Dauer)',
      usage: 'Zeitdauer in Wochen',
      category: 'Zeit',
      questionWord: { kanji: '何週間', reading: 'なんしゅうかん', romaji: 'nanshūkan' },
      counts: [
        { num: 1, kanji: '一週間', reading: 'いっしゅうかん', romaji: 'isshūkan', shift: true },
        { num: 2, kanji: '二週間', reading: 'にしゅうかん', romaji: 'nishūkan', shift: false },
        { num: 3, kanji: '三週間', reading: 'さんしゅうかん', romaji: 'sanshūkan', shift: false },
        { num: 4, kanji: '四週間', reading: 'よんしゅうかん', romaji: 'yonshūkan', shift: false },
        { num: 5, kanji: '五週間', reading: 'ごしゅうかん', romaji: 'goshūkan', shift: false },
        { num: 6, kanji: '六週間', reading: 'ろくしゅうかん', romaji: 'rokushūkan', shift: false },
        { num: 7, kanji: '七週間', reading: 'ななしゅうかん', romaji: 'nanashūkan', shift: false },
        { num: 8, kanji: '八週間', reading: 'はっしゅうかん', romaji: 'hasshūkan', shift: true },
        { num: 9, kanji: '九週間', reading: 'きゅうしゅうかん', romaji: 'kyūshūkan', shift: false },
        { num: 10, kanji: '十週間', reading: 'じゅっしゅうかん', romaji: 'jusshūkan', shift: true }
      ],
      specialCounts: [],
      examples: [
        { japanese: '二週間日本にいました。', romaji: 'Nishūkan Nihon ni imashita.', german: 'Ich war zwei Wochen in Japan.' },
        { japanese: '一週間に三回運動します。', romaji: 'Isshūkan ni sankai undō shimasu.', german: 'Ich treibe drei Mal pro Woche Sport.' }
      ],
      notes: 'Lautverschiebungen bei 1 (いっしゅうかん), 8 (はっしゅうかん), 10 (じゅっしゅうかん). Nicht verwechseln mit 習慣 (しゅうかん = Gewohnheit).'
    },
    {
      id: 'kagetsu',
      kanji: 'ヶ月',
      reading: 'かげつ',
      romaji: 'kagetsu',
      meaning: 'Monate (Dauer)',
      usage: 'Zeitdauer in Monaten',
      category: 'Zeit',
      questionWord: { kanji: '何ヶ月', reading: 'なんかげつ', romaji: 'nankagetsu' },
      counts: [
        { num: 1, kanji: '一ヶ月', reading: 'いっかげつ', romaji: 'ikkagetsu', shift: true },
        { num: 2, kanji: '二ヶ月', reading: 'にかげつ', romaji: 'nikagetsu', shift: false },
        { num: 3, kanji: '三ヶ月', reading: 'さんかげつ', romaji: 'sankagetsu', shift: false },
        { num: 4, kanji: '四ヶ月', reading: 'よんかげつ', romaji: 'yonkagetsu', shift: false },
        { num: 5, kanji: '五ヶ月', reading: 'ごかげつ', romaji: 'gokagetsu', shift: false },
        { num: 6, kanji: '六ヶ月', reading: 'ろっかげつ', romaji: 'rokkagetsu', shift: true },
        { num: 7, kanji: '七ヶ月', reading: 'ななかげつ', romaji: 'nanakagetsu', shift: false },
        { num: 8, kanji: '八ヶ月', reading: 'はっかげつ', romaji: 'hakkagetsu', shift: true },
        { num: 9, kanji: '九ヶ月', reading: 'きゅうかげつ', romaji: 'kyūkagetsu', shift: false },
        { num: 10, kanji: '十ヶ月', reading: 'じゅっかげつ', romaji: 'jukkagetsu', shift: true }
      ],
      specialCounts: [],
      examples: [
        { japanese: '日本語を六ヶ月勉強しました。', romaji: 'Nihongo o rokkagetsu benkyō shimashita.', german: 'Ich habe sechs Monate Japanisch gelernt.' },
        { japanese: '赤ちゃんは十ヶ月で生まれます。', romaji: 'Akachan wa jukkagetsu de umaremasu.', german: 'Ein Baby wird nach zehn Monaten geboren.' }
      ],
      notes: 'ヶ wird auch als か, カ oder 箇 geschrieben. Nicht verwechseln mit den Monatsnamen (一月 = いちがつ = Januar)!'
    },
    {
      id: 'nen',
      kanji: '年',
      reading: 'ねん',
      romaji: 'nen',
      meaning: 'Jahre (Dauer/Jahreszahl)',
      usage: 'Zeitdauer in Jahren, Jahreszahlen, Schuljahre',
      category: 'Zeit',
      questionWord: { kanji: '何年', reading: 'なんねん', romaji: 'nannen' },
      counts: [
        { num: 1, kanji: '一年', reading: 'いちねん', romaji: 'ichinen', shift: false },
        { num: 2, kanji: '二年', reading: 'にねん', romaji: 'ninen', shift: false },
        { num: 3, kanji: '三年', reading: 'さんねん', romaji: 'sannen', shift: false },
        { num: 4, kanji: '四年', reading: 'よねん', romaji: 'yonen', shift: true },
        { num: 5, kanji: '五年', reading: 'ごねん', romaji: 'gonen', shift: false },
        { num: 6, kanji: '六年', reading: 'ろくねん', romaji: 'rokunen', shift: false },
        { num: 7, kanji: '七年', reading: 'ななねん / しちねん', romaji: 'nananen / shichinen', shift: false },
        { num: 8, kanji: '八年', reading: 'はちねん', romaji: 'hachinen', shift: false },
        { num: 9, kanji: '九年', reading: 'きゅうねん', romaji: 'kyūnen', shift: false },
        { num: 10, kanji: '十年', reading: 'じゅうねん', romaji: 'jūnen', shift: false }
      ],
      specialCounts: [
        { num: 4, kanji: '四年', reading: 'よねん', romaji: 'yonen', note: 'よねん (nicht よんねん!)' }
      ],
      examples: [
        { japanese: '三年間日本に住んでいました。', romaji: 'Sannenkan Nihon ni sunde imashita.', german: 'Ich habe drei Jahre in Japan gewohnt.' },
        { japanese: '今年は2025年です。', romaji: 'Kotoshi wa nisen nijūgo nen desu.', german: 'Dieses Jahr ist 2025.' }
      ],
      notes: '4年 = よねん (nicht よんねん). Zeitdauer: ～年間 (ねんかん). 今年 (ことし) = dieses Jahr, 来年 (らいねん) = nächstes Jahr, 去年 (きょねん) = letztes Jahr.'
    }
  ]
};
