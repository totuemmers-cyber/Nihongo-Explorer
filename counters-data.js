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
      level: 'N5',
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
    {
      id: 'mei',
      kanji: '名',
      reading: 'めい',
      romaji: 'mei',
      meaning: 'Personen (formell)',
      usage: 'Formelles Zählen von Personen (Reservierungen, Formulare, Ankündigungen)',
      category: 'Menschen',
      level: 'N3',
      questionWord: { kanji: '何名', reading: 'なんめい', romaji: 'nanmei' },
      counts: [
        { num: 1, kanji: '一名', reading: 'いちめい', romaji: 'ichimei', shift: false },
        { num: 2, kanji: '二名', reading: 'にめい', romaji: 'nimei', shift: false },
        { num: 3, kanji: '三名', reading: 'さんめい', romaji: 'sanmei', shift: false },
        { num: 4, kanji: '四名', reading: 'よんめい', romaji: 'yonmei', shift: false },
        { num: 5, kanji: '五名', reading: 'ごめい', romaji: 'gomei', shift: false },
        { num: 6, kanji: '六名', reading: 'ろくめい', romaji: 'rokumei', shift: false },
        { num: 7, kanji: '七名', reading: 'ななめい', romaji: 'nanamei', shift: false },
        { num: 8, kanji: '八名', reading: 'はちめい', romaji: 'hachimei', shift: false },
        { num: 9, kanji: '九名', reading: 'きゅうめい', romaji: 'kyūmei', shift: false },
        { num: 10, kanji: '十名', reading: 'じゅうめい', romaji: 'jūmei', shift: false }
      ],
      specialCounts: [],
      examples: [
        { japanese: '三名様でお待ちのお客様。', romaji: 'Sanmei-sama de omachi no okyaku-sama.', german: 'Die Gäste, die zu dritt warten.' },
        { japanese: '参加者は二十名です。', romaji: 'Sankasha wa nijūmei desu.', german: 'Es sind zwanzig Teilnehmer.' }
      ],
      notes: 'Formelle Version von 人. Wird in Restaurants (三名様), bei Reservierungen und in offiziellen Kontexten verwendet. Keine Lautverschiebungen.'
    },

    // ===== OBJEKTE =====
    {
      id: 'tsu',
      kanji: 'つ',
      reading: 'つ',
      romaji: 'tsu',
      meaning: 'Universalzähler',
      usage: 'Allgemeiner Zähler für Dinge (1-10), wenn man den spezifischen Zähler nicht kennt',
      category: 'Objekte',
      level: 'N5',
      questionWord: { kanji: 'いくつ', reading: 'いくつ', romaji: 'ikutsu' },
      counts: [
        { num: 1, kanji: '一つ', reading: 'ひとつ', romaji: 'hitotsu', shift: true },
        { num: 2, kanji: '二つ', reading: 'ふたつ', romaji: 'futatsu', shift: true },
        { num: 3, kanji: '三つ', reading: 'みっつ', romaji: 'mittsu', shift: true },
        { num: 4, kanji: '四つ', reading: 'よっつ', romaji: 'yottsu', shift: true },
        { num: 5, kanji: '五つ', reading: 'いつつ', romaji: 'itsutsu', shift: true },
        { num: 6, kanji: '六つ', reading: 'むっつ', romaji: 'muttsu', shift: true },
        { num: 7, kanji: '七つ', reading: 'ななつ', romaji: 'nanatsu', shift: true },
        { num: 8, kanji: '八つ', reading: 'やっつ', romaji: 'yattsu', shift: true },
        { num: 9, kanji: '九つ', reading: 'ここのつ', romaji: 'kokonotsu', shift: true },
        { num: 10, kanji: '十', reading: 'とお', romaji: 'tō', shift: true }
      ],
      specialCounts: [],
      examples: [
        { japanese: 'りんごを三つください。', romaji: 'Ringo o mittsu kudasai.', german: 'Drei Äpfel, bitte.' },
        { japanese: '理由が二つあります。', romaji: 'Riyū ga futatsu arimasu.', german: 'Es gibt zwei Gründe.' }
      ],
      notes: 'Der wichtigste Zähler! Verwendet die japanischen Kun-Lesungen der Zahlen. Nur für 1-10 verfügbar – ab 11 muss ein spezifischer Zähler verwendet werden. Auch für das Alter kleiner Kinder gebräuchlich (三つ = 3 Jahre alt).'
    },
    {
      id: 'ko',
      kanji: '個',
      reading: 'こ',
      romaji: 'ko',
      meaning: 'Kleine Objekte, allgemeiner Zähler',
      usage: 'Kleine, kompakte Gegenstände (Äpfel, Eier, Bälle usw.)',
      category: 'Objekte',
      level: 'N5',
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
      level: 'N5',
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
      level: 'N5',
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
      level: 'N5',
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
      level: 'N5',
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
      level: 'N5',
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
    {
      id: 'en',
      kanji: '円',
      reading: 'えん',
      romaji: 'en',
      meaning: 'Yen (Währung)',
      usage: 'Japanische Währung, Geldbeträge',
      category: 'Objekte',
      level: 'N5',
      questionWord: { kanji: '何円', reading: 'なんえん', romaji: 'nan\'en' },
      counts: [
        { num: 1, kanji: '一円', reading: 'いちえん', romaji: 'ichien', shift: false },
        { num: 2, kanji: '二円', reading: 'にえん', romaji: 'nien', shift: false },
        { num: 3, kanji: '三円', reading: 'さんえん', romaji: 'san\'en', shift: false },
        { num: 4, kanji: '四円', reading: 'よえん', romaji: 'yoen', shift: true },
        { num: 5, kanji: '五円', reading: 'ごえん', romaji: 'goen', shift: false },
        { num: 6, kanji: '六円', reading: 'ろくえん', romaji: 'rokuen', shift: false },
        { num: 7, kanji: '七円', reading: 'ななえん', romaji: 'nanaen', shift: false },
        { num: 8, kanji: '八円', reading: 'はちえん', romaji: 'hachien', shift: false },
        { num: 9, kanji: '九円', reading: 'きゅうえん', romaji: 'kyūen', shift: false },
        { num: 10, kanji: '十円', reading: 'じゅうえん', romaji: 'jūen', shift: false }
      ],
      specialCounts: [
        { num: 100, kanji: '百円', reading: 'ひゃくえん', romaji: 'hyakuen', note: '100-Yen-Münze' },
        { num: 1000, kanji: '千円', reading: 'せんえん', romaji: 'sen\'en', note: '1000-Yen-Schein' },
        { num: 10000, kanji: '一万円', reading: 'いちまんえん', romaji: 'ichiman\'en', note: '10.000-Yen-Schein' }
      ],
      examples: [
        { japanese: 'これは五百円です。', romaji: 'Kore wa gohyakuen desu.', german: 'Das kostet 500 Yen.' },
        { japanese: '千円でお願いします。', romaji: 'Sen\'en de onegai shimasu.', german: 'Mit einem Tausend-Yen-Schein, bitte.' }
      ],
      notes: '4円 = よえん (nicht よんえん). 五円 (ごえん) klingt wie ご縁 (Schicksal/Verbindung) – daher werden 5-Yen-Münzen als Glücksbringer in Schreinen geopfert.'
    },
    {
      id: 'ban',
      kanji: '番',
      reading: 'ばん',
      romaji: 'ban',
      meaning: 'Nummer, Reihenfolge',
      usage: 'Ordnungszahlen, Rangfolge, Nummern (Hausnummern, Busse, Züge)',
      category: 'Objekte',
      level: 'N5',
      questionWord: { kanji: '何番', reading: 'なんばん', romaji: 'nanban' },
      counts: [
        { num: 1, kanji: '一番', reading: 'いちばん', romaji: 'ichiban', shift: false },
        { num: 2, kanji: '二番', reading: 'にばん', romaji: 'niban', shift: false },
        { num: 3, kanji: '三番', reading: 'さんばん', romaji: 'sanban', shift: false },
        { num: 4, kanji: '四番', reading: 'よんばん', romaji: 'yonban', shift: false },
        { num: 5, kanji: '五番', reading: 'ごばん', romaji: 'goban', shift: false },
        { num: 6, kanji: '六番', reading: 'ろくばん', romaji: 'rokuban', shift: false },
        { num: 7, kanji: '七番', reading: 'ななばん', romaji: 'nanaban', shift: false },
        { num: 8, kanji: '八番', reading: 'はちばん', romaji: 'hachiban', shift: false },
        { num: 9, kanji: '九番', reading: 'きゅうばん', romaji: 'kyūban', shift: false },
        { num: 10, kanji: '十番', reading: 'じゅうばん', romaji: 'jūban', shift: false }
      ],
      specialCounts: [],
      examples: [
        { japanese: '一番好きな食べ物は何ですか。', romaji: 'Ichiban sukina tabemono wa nan desu ka.', german: 'Was ist dein Lieblingsessen?' },
        { japanese: '三番のバスに乗ってください。', romaji: 'Sanban no basu ni notte kudasai.', german: 'Bitte nehmen Sie Bus Nummer 3.' }
      ],
      notes: '一番 (ichiban) bedeutet auch „am meisten" und wird als Superlativ verwendet: 一番高い = am teuersten. Keine Lautverschiebungen.'
    },
    {
      id: 'soku',
      kanji: '足',
      reading: 'そく',
      romaji: 'soku',
      meaning: 'Schuhe, Socken (Paare)',
      usage: 'Paarweise getragene Fußbekleidung (Schuhe, Socken, Strümpfe, Stiefel)',
      category: 'Objekte',
      level: 'N4',
      questionWord: { kanji: '何足', reading: 'なんぞく', romaji: 'nanzoku' },
      counts: [
        { num: 1, kanji: '一足', reading: 'いっそく', romaji: 'issoku', shift: true },
        { num: 2, kanji: '二足', reading: 'にそく', romaji: 'nisoku', shift: false },
        { num: 3, kanji: '三足', reading: 'さんぞく', romaji: 'sanzoku', shift: true },
        { num: 4, kanji: '四足', reading: 'よんそく', romaji: 'yonsoku', shift: false },
        { num: 5, kanji: '五足', reading: 'ごそく', romaji: 'gosoku', shift: false },
        { num: 6, kanji: '六足', reading: 'ろくそく', romaji: 'rokusoku', shift: false },
        { num: 7, kanji: '七足', reading: 'ななそく', romaji: 'nanasoku', shift: false },
        { num: 8, kanji: '八足', reading: 'はっそく', romaji: 'hassoku', shift: true },
        { num: 9, kanji: '九足', reading: 'きゅうそく', romaji: 'kyūsoku', shift: false },
        { num: 10, kanji: '十足', reading: 'じゅっそく', romaji: 'jussoku', shift: true }
      ],
      specialCounts: [],
      examples: [
        { japanese: '靴を二足買いました。', romaji: 'Kutsu o nisoku kaimashita.', german: 'Ich habe zwei Paar Schuhe gekauft.' },
        { japanese: '靴下は三足でセットです。', romaji: 'Kutsushita wa sanzoku de setto desu.', german: 'Die Socken gibt es im Dreierpack.' }
      ],
      notes: 'Zählt immer Paare, nicht einzelne Schuhe/Socken. Lautverschiebungen bei 1 (いっそく), 3 (さんぞく), 8 (はっそく), 10 (じゅっそく).'
    },
    {
      id: 'chaku',
      kanji: '着',
      reading: 'ちゃく',
      romaji: 'chaku',
      meaning: 'Kleidungsstücke',
      usage: 'Anzüge, Kleider, Hemden, Jacken – Oberbekleidung',
      category: 'Objekte',
      level: 'N4',
      questionWord: { kanji: '何着', reading: 'なんちゃく', romaji: 'nanchaku' },
      counts: [
        { num: 1, kanji: '一着', reading: 'いっちゃく', romaji: 'icchaku', shift: true },
        { num: 2, kanji: '二着', reading: 'にちゃく', romaji: 'nichaku', shift: false },
        { num: 3, kanji: '三着', reading: 'さんちゃく', romaji: 'sanchaku', shift: false },
        { num: 4, kanji: '四着', reading: 'よんちゃく', romaji: 'yonchaku', shift: false },
        { num: 5, kanji: '五着', reading: 'ごちゃく', romaji: 'gochaku', shift: false },
        { num: 6, kanji: '六着', reading: 'ろくちゃく', romaji: 'rokuchaku', shift: false },
        { num: 7, kanji: '七着', reading: 'ななちゃく', romaji: 'nanachaku', shift: false },
        { num: 8, kanji: '八着', reading: 'はっちゃく', romaji: 'hacchaku', shift: true },
        { num: 9, kanji: '九着', reading: 'きゅうちゃく', romaji: 'kyūchaku', shift: false },
        { num: 10, kanji: '十着', reading: 'じゅっちゃく', romaji: 'jucchaku', shift: true }
      ],
      specialCounts: [],
      examples: [
        { japanese: 'ワンピースを一着買いました。', romaji: 'Wanpīsu o icchaku kaimashita.', german: 'Ich habe ein Kleid gekauft.' },
        { japanese: 'スーツが三着あります。', romaji: 'Sūtsu ga sanchaku arimasu.', german: 'Ich habe drei Anzüge.' }
      ],
      notes: 'Wird hauptsächlich für Oberbekleidung verwendet. Für flache Kleidungsstücke wie T-Shirts wird oft auch 枚 benutzt. 着 bedeutet auch „Ankunft" (到着).'
    },
    {
      id: 'ken',
      kanji: '軒',
      reading: 'けん',
      romaji: 'ken',
      meaning: 'Häuser, Geschäfte',
      usage: 'Gebäude, Häuser, Läden, Restaurants',
      category: 'Objekte',
      level: 'N3',
      questionWord: { kanji: '何軒', reading: 'なんげん', romaji: 'nangen' },
      counts: [
        { num: 1, kanji: '一軒', reading: 'いっけん', romaji: 'ikken', shift: true },
        { num: 2, kanji: '二軒', reading: 'にけん', romaji: 'niken', shift: false },
        { num: 3, kanji: '三軒', reading: 'さんげん', romaji: 'sangen', shift: true },
        { num: 4, kanji: '四軒', reading: 'よんけん', romaji: 'yonken', shift: false },
        { num: 5, kanji: '五軒', reading: 'ごけん', romaji: 'goken', shift: false },
        { num: 6, kanji: '六軒', reading: 'ろっけん', romaji: 'rokken', shift: true },
        { num: 7, kanji: '七軒', reading: 'ななけん', romaji: 'nanaken', shift: false },
        { num: 8, kanji: '八軒', reading: 'はっけん', romaji: 'hakken', shift: true },
        { num: 9, kanji: '九軒', reading: 'きゅうけん', romaji: 'kyūken', shift: false },
        { num: 10, kanji: '十軒', reading: 'じゅっけん', romaji: 'jukken', shift: true }
      ],
      specialCounts: [
        { num: 3, kanji: '三軒', reading: 'さんげん', romaji: 'sangen', note: 'Bekannt aus 三軒茶屋 (Sangenjaya) in Tokyo' }
      ],
      examples: [
        { japanese: 'この通りにレストランが五軒あります。', romaji: 'Kono tōri ni resutoran ga goken arimasu.', german: 'Es gibt fünf Restaurants auf dieser Straße.' },
        { japanese: '一軒家に住んでいます。', romaji: 'Ikkenya ni sunde imasu.', german: 'Ich wohne in einem Einfamilienhaus.' }
      ],
      notes: '三軒 = さんげん (nicht さんけん) – Lautverschiebung zu が行 nach ん. 一軒家 (いっけんや) = Einfamilienhaus ist ein häufiges Kompositum.'
    },
    {
      id: 'tsuu',
      kanji: '通',
      reading: 'つう',
      romaji: 'tsū',
      meaning: 'Briefe, Dokumente',
      usage: 'Briefe, E-Mails, Postkarten, Dokumente, Bewerbungen',
      category: 'Objekte',
      level: 'N3',
      questionWord: { kanji: '何通', reading: 'なんつう', romaji: 'nantsū' },
      counts: [
        { num: 1, kanji: '一通', reading: 'いっつう', romaji: 'ittsū', shift: true },
        { num: 2, kanji: '二通', reading: 'につう', romaji: 'nitsū', shift: false },
        { num: 3, kanji: '三通', reading: 'さんつう', romaji: 'santsū', shift: false },
        { num: 4, kanji: '四通', reading: 'よんつう', romaji: 'yontsū', shift: false },
        { num: 5, kanji: '五通', reading: 'ごつう', romaji: 'gotsū', shift: false },
        { num: 6, kanji: '六通', reading: 'ろくつう', romaji: 'rokutsū', shift: false },
        { num: 7, kanji: '七通', reading: 'ななつう', romaji: 'nanatsū', shift: false },
        { num: 8, kanji: '八通', reading: 'はっつう', romaji: 'hattsū', shift: true },
        { num: 9, kanji: '九通', reading: 'きゅうつう', romaji: 'kyūtsū', shift: false },
        { num: 10, kanji: '十通', reading: 'じゅっつう', romaji: 'juttsū', shift: true }
      ],
      specialCounts: [],
      examples: [
        { japanese: 'メールを三通送りました。', romaji: 'Mēru o santsū okurimashita.', german: 'Ich habe drei E-Mails geschickt.' },
        { japanese: '手紙が一通届きました。', romaji: 'Tegami ga ittsū todokimashita.', german: 'Ein Brief ist angekommen.' }
      ],
      notes: 'Wird auch für moderne Kommunikation wie E-Mails verwendet. 一通り (ひととおり) = „einmal durchgehend" ist ein verwandter, häufiger Ausdruck.'
    },
    {
      id: 'ken-case',
      kanji: '件',
      reading: 'けん',
      romaji: 'ken',
      meaning: 'Fälle, Angelegenheiten',
      usage: 'Vorfälle, Fälle, Beschwerden, Nachrichten, Angelegenheiten',
      category: 'Objekte',
      level: 'N3',
      questionWord: { kanji: '何件', reading: 'なんけん', romaji: 'nanken' },
      counts: [
        { num: 1, kanji: '一件', reading: 'いっけん', romaji: 'ikken', shift: true },
        { num: 2, kanji: '二件', reading: 'にけん', romaji: 'niken', shift: false },
        { num: 3, kanji: '三件', reading: 'さんけん', romaji: 'sanken', shift: false },
        { num: 4, kanji: '四件', reading: 'よんけん', romaji: 'yonken', shift: false },
        { num: 5, kanji: '五件', reading: 'ごけん', romaji: 'goken', shift: false },
        { num: 6, kanji: '六件', reading: 'ろっけん', romaji: 'rokken', shift: true },
        { num: 7, kanji: '七件', reading: 'ななけん', romaji: 'nanaken', shift: false },
        { num: 8, kanji: '八件', reading: 'はっけん', romaji: 'hakken', shift: true },
        { num: 9, kanji: '九件', reading: 'きゅうけん', romaji: 'kyūken', shift: false },
        { num: 10, kanji: '十件', reading: 'じゅっけん', romaji: 'jukken', shift: true }
      ],
      specialCounts: [],
      examples: [
        { japanese: '今日は問い合わせが十件ありました。', romaji: 'Kyō wa toiawase ga jukken arimashita.', german: 'Heute gab es zehn Anfragen.' },
        { japanese: 'その件について話しましょう。', romaji: 'Sono ken ni tsuite hanashimashō.', german: 'Lasst uns über diese Angelegenheit sprechen.' }
      ],
      notes: 'Häufig in geschäftlichen und formellen Kontexten. 事件 (じけん) = Vorfall/Ereignis. Gleiche Lautverschiebungsmuster wie 軒.'
    },
    {
      id: 'kyoku',
      kanji: '曲',
      reading: 'きょく',
      romaji: 'kyoku',
      meaning: 'Musikstücke, Lieder',
      usage: 'Lieder, Songs, Musikstücke, Kompositionen',
      category: 'Objekte',
      level: 'N3',
      questionWord: { kanji: '何曲', reading: 'なんきょく', romaji: 'nankyoku' },
      counts: [
        { num: 1, kanji: '一曲', reading: 'いっきょく', romaji: 'ikkyoku', shift: true },
        { num: 2, kanji: '二曲', reading: 'にきょく', romaji: 'nikyoku', shift: false },
        { num: 3, kanji: '三曲', reading: 'さんきょく', romaji: 'sankyoku', shift: false },
        { num: 4, kanji: '四曲', reading: 'よんきょく', romaji: 'yonkyoku', shift: false },
        { num: 5, kanji: '五曲', reading: 'ごきょく', romaji: 'gokyoku', shift: false },
        { num: 6, kanji: '六曲', reading: 'ろっきょく', romaji: 'rokkyoku', shift: true },
        { num: 7, kanji: '七曲', reading: 'ななきょく', romaji: 'nanakyoku', shift: false },
        { num: 8, kanji: '八曲', reading: 'はっきょく', romaji: 'hakkyoku', shift: true },
        { num: 9, kanji: '九曲', reading: 'きゅうきょく', romaji: 'kyūkyoku', shift: false },
        { num: 10, kanji: '十曲', reading: 'じゅっきょく', romaji: 'jukkyoku', shift: true }
      ],
      specialCounts: [],
      examples: [
        { japanese: 'カラオケで五曲歌いました。', romaji: 'Karaoke de gokyoku utaimashita.', german: 'Ich habe fünf Lieder beim Karaoke gesungen.' },
        { japanese: '新しいアルバムには十二曲入っています。', romaji: 'Atarashii arubamu ni wa jūnikyoku haitte imasu.', german: 'Das neue Album enthält zwölf Songs.' }
      ],
      notes: 'Wird auch für klassische Musik und instrumentale Stücke verwendet. 名曲 (めいきょく) = Meisterwerk (Musik).'
    },
    {
      id: 'ten',
      kanji: '点',
      reading: 'てん',
      romaji: 'ten',
      meaning: 'Punkte, Gegenstände (formal)',
      usage: 'Prüfungspunkte, Bewertungen, Ausstellungsstücke, Waren',
      category: 'Objekte',
      level: 'N3',
      questionWord: { kanji: '何点', reading: 'なんてん', romaji: 'nanten' },
      counts: [
        { num: 1, kanji: '一点', reading: 'いってん', romaji: 'itten', shift: true },
        { num: 2, kanji: '二点', reading: 'にてん', romaji: 'niten', shift: false },
        { num: 3, kanji: '三点', reading: 'さんてん', romaji: 'santen', shift: false },
        { num: 4, kanji: '四点', reading: 'よんてん', romaji: 'yonten', shift: false },
        { num: 5, kanji: '五点', reading: 'ごてん', romaji: 'goten', shift: false },
        { num: 6, kanji: '六点', reading: 'ろくてん', romaji: 'rokuten', shift: false },
        { num: 7, kanji: '七点', reading: 'ななてん', romaji: 'nanaten', shift: false },
        { num: 8, kanji: '八点', reading: 'はってん', romaji: 'hatten', shift: true },
        { num: 9, kanji: '九点', reading: 'きゅうてん', romaji: 'kyūten', shift: false },
        { num: 10, kanji: '十点', reading: 'じゅってん', romaji: 'jutten', shift: true }
      ],
      specialCounts: [
        { num: 100, kanji: '百点', reading: 'ひゃくてん', romaji: 'hyakuten', note: 'Volle Punktzahl (100 Punkte)' }
      ],
      examples: [
        { japanese: 'テストで九十点を取りました。', romaji: 'Tesuto de kyūjutten o torimashita.', german: 'Ich habe 90 Punkte im Test bekommen.' },
        { japanese: 'お買い上げは三点です。', romaji: 'Okariage wa santen desu.', german: 'Sie kaufen drei Artikel.' }
      ],
      notes: '点 wird in zwei Kontexten verwendet: Punkte/Bewertungen (百点 = 100 Punkte) und als formeller Zähler für Gegenstände (besonders im Einzelhandel und in Museen).'
    },
    {
      id: 'wari',
      kanji: '割',
      reading: 'わり',
      romaji: 'wari',
      meaning: 'Zehntel, Prozentangaben',
      usage: 'Angaben in 10%-Schritten (1割 = 10%, 3割 = 30%)',
      category: 'Objekte',
      level: 'N2',
      questionWord: { kanji: '何割', reading: 'なんわり', romaji: 'nanwari' },
      counts: [
        { num: 1, kanji: '一割', reading: 'いちわり', romaji: 'ichiwari', shift: false },
        { num: 2, kanji: '二割', reading: 'にわり', romaji: 'niwari', shift: false },
        { num: 3, kanji: '三割', reading: 'さんわり', romaji: 'sanwari', shift: false },
        { num: 4, kanji: '四割', reading: 'よんわり', romaji: 'yonwari', shift: false },
        { num: 5, kanji: '五割', reading: 'ごわり', romaji: 'gowari', shift: false },
        { num: 6, kanji: '六割', reading: 'ろくわり', romaji: 'rokuwari', shift: false },
        { num: 7, kanji: '七割', reading: 'ななわり', romaji: 'nanawari', shift: false },
        { num: 8, kanji: '八割', reading: 'はちわり', romaji: 'hachiwari', shift: false },
        { num: 9, kanji: '九割', reading: 'きゅうわり', romaji: 'kyūwari', shift: false },
        { num: 10, kanji: '十割', reading: 'じゅうわり', romaji: 'jūwari', shift: false }
      ],
      specialCounts: [],
      examples: [
        { japanese: '学生の八割が合格しました。', romaji: 'Gakusei no hachiwari ga gōkaku shimashita.', german: '80% der Studenten haben bestanden.' },
        { japanese: 'この商品は三割引です。', romaji: 'Kono shōhin wa sanwaribiki desu.', german: 'Dieses Produkt hat 30% Rabatt.' }
      ],
      notes: 'Keine Lautverschiebungen. 割引 (わりびき) = Rabatt ist ein sehr häufiges Wort. 割り勘 (わりかん) = geteilte Rechnung. Im Baseball wird der Schlagdurchschnitt in 割 angegeben.'
    },
    {
      id: 'bu',
      kanji: '部',
      reading: 'ぶ',
      romaji: 'bu',
      meaning: 'Exemplare, Kopien',
      usage: 'Zeitungen, Zeitschriften, Kopien, gedruckte Materialien',
      category: 'Objekte',
      level: 'N2',
      questionWord: { kanji: '何部', reading: 'なんぶ', romaji: 'nanbu' },
      counts: [
        { num: 1, kanji: '一部', reading: 'いちぶ', romaji: 'ichibu', shift: false },
        { num: 2, kanji: '二部', reading: 'にぶ', romaji: 'nibu', shift: false },
        { num: 3, kanji: '三部', reading: 'さんぶ', romaji: 'sanbu', shift: false },
        { num: 4, kanji: '四部', reading: 'よんぶ', romaji: 'yonbu', shift: false },
        { num: 5, kanji: '五部', reading: 'ごぶ', romaji: 'gobu', shift: false },
        { num: 6, kanji: '六部', reading: 'ろくぶ', romaji: 'rokubu', shift: false },
        { num: 7, kanji: '七部', reading: 'ななぶ', romaji: 'nanabu', shift: false },
        { num: 8, kanji: '八部', reading: 'はちぶ', romaji: 'hachibu', shift: false },
        { num: 9, kanji: '九部', reading: 'きゅうぶ', romaji: 'kyūbu', shift: false },
        { num: 10, kanji: '十部', reading: 'じゅうぶ', romaji: 'jūbu', shift: false }
      ],
      specialCounts: [],
      examples: [
        { japanese: 'この資料を十部コピーしてください。', romaji: 'Kono shiryō o jūbu kopī shite kudasai.', german: 'Bitte kopieren Sie dieses Dokument zehn Mal.' },
        { japanese: '新聞を一部ください。', romaji: 'Shinbun o ichibu kudasai.', german: 'Eine Zeitung, bitte.' }
      ],
      notes: 'Keine Lautverschiebungen. Achtung: 一部 (いちぶ) als Zähler = „ein Exemplar", aber 一部 kann auch „ein Teil" bedeuten (z.B. 一部の人 = einige Leute).'
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
      level: 'N5',
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
      id: 'wa',
      kanji: '羽',
      reading: 'わ',
      romaji: 'wa',
      meaning: 'Vögel, Hasen',
      usage: 'Vögel, Hühner, Hasen (historisch als „Flügeltiere" gezählt)',
      category: 'Tiere',
      level: 'N2',
      questionWord: { kanji: '何羽', reading: 'なんわ', romaji: 'nanwa' },
      counts: [
        { num: 1, kanji: '一羽', reading: 'いちわ', romaji: 'ichiwa', shift: false },
        { num: 2, kanji: '二羽', reading: 'にわ', romaji: 'niwa', shift: false },
        { num: 3, kanji: '三羽', reading: 'さんわ / さんば', romaji: 'sanwa / sanba', shift: true },
        { num: 4, kanji: '四羽', reading: 'よんわ', romaji: 'yonwa', shift: false },
        { num: 5, kanji: '五羽', reading: 'ごわ', romaji: 'gowa', shift: false },
        { num: 6, kanji: '六羽', reading: 'ろくわ / ろっぱ', romaji: 'rokuwa / roppa', shift: true },
        { num: 7, kanji: '七羽', reading: 'ななわ', romaji: 'nanawa', shift: false },
        { num: 8, kanji: '八羽', reading: 'はちわ / はっぱ', romaji: 'hachiwa / happa', shift: true },
        { num: 9, kanji: '九羽', reading: 'きゅうわ', romaji: 'kyūwa', shift: false },
        { num: 10, kanji: '十羽', reading: 'じゅうわ / じゅっぱ', romaji: 'jūwa / juppa', shift: true }
      ],
      specialCounts: [],
      examples: [
        { japanese: '池にアヒルが三羽います。', romaji: 'Ike ni ahiru ga sanwa imasu.', german: 'Im Teich sind drei Enten.' },
        { japanese: '鶴を千羽折りました。', romaji: 'Tsuru o senba orimashita.', german: 'Ich habe tausend Kraniche gefaltet.' }
      ],
      notes: 'Hasen werden mit 羽 gezählt, weil buddhistische Mönche sie als „Vögel" deklarierten, um sie essen zu dürfen. 千羽鶴 (せんばづる) = 1000 gefaltete Papierkraniche (Glückssymbol). Bei 3, 6, 8, 10 existieren alternative Lesungen mit ば/ぱ.'
    },
    {
      id: 'tou',
      kanji: '頭',
      reading: 'とう',
      romaji: 'tō',
      meaning: 'Große Tiere',
      usage: 'Pferde, Kühe, Elefanten, Wale – große Tiere',
      category: 'Tiere',
      level: 'N2',
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
      category: 'Objekte',
      level: 'N5',
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
      level: 'N5',
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
      level: 'N5',
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
      level: 'N5',
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
      level: 'N5',
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
      id: 'nichi',
      kanji: '日',
      reading: 'にち / か',
      romaji: 'nichi / ka',
      meaning: 'Tage',
      usage: 'Tage des Monats (Datum) und Zeitdauer in Tagen',
      category: 'Zeit',
      level: 'N5',
      questionWord: { kanji: '何日', reading: 'なんにち', romaji: 'nannichi' },
      counts: [
        { num: 1, kanji: '一日', reading: 'ついたち', romaji: 'tsuitachi', shift: true },
        { num: 2, kanji: '二日', reading: 'ふつか', romaji: 'futsuka', shift: true },
        { num: 3, kanji: '三日', reading: 'みっか', romaji: 'mikka', shift: true },
        { num: 4, kanji: '四日', reading: 'よっか', romaji: 'yokka', shift: true },
        { num: 5, kanji: '五日', reading: 'いつか', romaji: 'itsuka', shift: true },
        { num: 6, kanji: '六日', reading: 'むいか', romaji: 'muika', shift: true },
        { num: 7, kanji: '七日', reading: 'なのか', romaji: 'nanoka', shift: true },
        { num: 8, kanji: '八日', reading: 'ようか', romaji: 'yōka', shift: true },
        { num: 9, kanji: '九日', reading: 'ここのか', romaji: 'kokonoka', shift: true },
        { num: 10, kanji: '十日', reading: 'とおか', romaji: 'tōka', shift: true }
      ],
      specialCounts: [
        { num: 1, kanji: '一日', reading: 'ついたち', romaji: 'tsuitachi', note: 'Als Datum: 1. des Monats. Als Dauer: いちにち (ein Tag).' },
        { num: 14, kanji: '十四日', reading: 'じゅうよっか', romaji: 'jūyokka', note: '' },
        { num: 20, kanji: '二十日', reading: 'はつか', romaji: 'hatsuka', note: 'Komplett unregelmäßig!' },
        { num: 24, kanji: '二十四日', reading: 'にじゅうよっか', romaji: 'nijūyokka', note: '' }
      ],
      examples: [
        { japanese: '三日間京都にいました。', romaji: 'Mikkakan Kyōto ni imashita.', german: 'Ich war drei Tage in Kyoto.' },
        { japanese: '誕生日は五月二十日です。', romaji: 'Tanjōbi wa gogatsu hatsuka desu.', german: 'Mein Geburtstag ist am 20. Mai.' }
      ],
      notes: '1日～10日 und 20日 verwenden die traditionellen japanischen Lesungen (Kun-Yomi) und sind komplett unregelmäßig. Ab 11日 wird ～にち verwendet (じゅういちにち, じゅうににち usw.). 一日 hat zwei Bedeutungen: ついたち (1. des Monats) und いちにち (ein ganzer Tag).'
    },
    {
      id: 'shukan',
      kanji: '週間',
      reading: 'しゅうかん',
      romaji: 'shūkan',
      meaning: 'Wochen (Dauer)',
      usage: 'Zeitdauer in Wochen',
      category: 'Zeit',
      level: 'N5',
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
      level: 'N5',
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
      level: 'N5',
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
        { japanese: '今年は2026年です。', romaji: 'Kotoshi wa nisen nijuuroku nen desu.', german: 'Dieses Jahr ist 2026.' }
      ],
      notes: '4年 = よねん (nicht よんねん). Zeitdauer: ～年間 (ねんかん). 今年 (ことし) = dieses Jahr, 来年 (らいねん) = nächstes Jahr, 去年 (きょねん) = letztes Jahr.'
    },
    {
      id: 'haku',
      kanji: '泊',
      reading: 'はく',
      romaji: 'haku',
      meaning: 'Übernachtungen',
      usage: 'Hotelübernachtungen, Reisedauer in Nächten',
      category: 'Zeit',
      level: 'N4',
      questionWord: { kanji: '何泊', reading: 'なんぱく', romaji: 'nanpaku' },
      counts: [
        { num: 1, kanji: '一泊', reading: 'いっぱく', romaji: 'ippaku', shift: true },
        { num: 2, kanji: '二泊', reading: 'にはく', romaji: 'nihaku', shift: false },
        { num: 3, kanji: '三泊', reading: 'さんぱく', romaji: 'sanpaku', shift: true },
        { num: 4, kanji: '四泊', reading: 'よんはく', romaji: 'yonhaku', shift: false },
        { num: 5, kanji: '五泊', reading: 'ごはく', romaji: 'gohaku', shift: false },
        { num: 6, kanji: '六泊', reading: 'ろっぱく', romaji: 'roppaku', shift: true },
        { num: 7, kanji: '七泊', reading: 'ななはく', romaji: 'nanahaku', shift: false },
        { num: 8, kanji: '八泊', reading: 'はっぱく', romaji: 'happaku', shift: true },
        { num: 9, kanji: '九泊', reading: 'きゅうはく', romaji: 'kyūhaku', shift: false },
        { num: 10, kanji: '十泊', reading: 'じゅっぱく', romaji: 'juppaku', shift: true }
      ],
      specialCounts: [],
      examples: [
        { japanese: '二泊三日の旅行に行きます。', romaji: 'Nihaku mikka no ryokō ni ikimasu.', german: 'Ich mache eine Reise mit zwei Übernachtungen und drei Tagen.' },
        { japanese: '一泊いくらですか。', romaji: 'Ippaku ikura desu ka.', german: 'Wie viel kostet eine Übernachtung?' }
      ],
      notes: '二泊三日 (にはくみっか) = „2 Nächte, 3 Tage" ist die typische japanische Reisebeschreibung. Gleiche Lautverschiebungsmuster wie 杯: は→ぱ bei 1, 3, 6, 8, 10.'
    },
    {
      id: 'do',
      kanji: '度',
      reading: 'ど',
      romaji: 'do',
      meaning: 'Grad, Mal (Häufigkeit)',
      usage: 'Temperatur, Winkel, Häufigkeit (formeller als 回)',
      category: 'Zeit',
      level: 'N4',
      questionWord: { kanji: '何度', reading: 'なんど', romaji: 'nando' },
      counts: [
        { num: 1, kanji: '一度', reading: 'いちど', romaji: 'ichido', shift: false },
        { num: 2, kanji: '二度', reading: 'にど', romaji: 'nido', shift: false },
        { num: 3, kanji: '三度', reading: 'さんど', romaji: 'sando', shift: false },
        { num: 4, kanji: '四度', reading: 'よんど', romaji: 'yondo', shift: false },
        { num: 5, kanji: '五度', reading: 'ごど', romaji: 'godo', shift: false },
        { num: 6, kanji: '六度', reading: 'ろくど', romaji: 'rokudo', shift: false },
        { num: 7, kanji: '七度', reading: 'ななど', romaji: 'nanado', shift: false },
        { num: 8, kanji: '八度', reading: 'はちど', romaji: 'hachido', shift: false },
        { num: 9, kanji: '九度', reading: 'きゅうど', romaji: 'kyūdo', shift: false },
        { num: 10, kanji: '十度', reading: 'じゅうど', romaji: 'jūdo', shift: false }
      ],
      specialCounts: [],
      examples: [
        { japanese: '今日は三十度です。', romaji: 'Kyō wa sanjūdo desu.', german: 'Heute sind es 30 Grad.' },
        { japanese: '一度日本に行ってみたいです。', romaji: 'Ichido Nihon ni itte mitai desu.', german: 'Ich möchte einmal nach Japan fahren.' }
      ],
      notes: 'Keine Lautverschiebungen. 一度 (いちど) = „einmal" ist sehr häufig. 何度も (なんども) = „immer wieder". Als Temperatur: 38度 (さんじゅうはちど) = 38 Grad (z.B. Fieber).'
    },
    {
      id: 'shoku',
      kanji: '食',
      reading: 'しょく',
      romaji: 'shoku',
      meaning: 'Mahlzeiten',
      usage: 'Mahlzeiten pro Tag, inkludierte Mahlzeiten bei Reisen',
      category: 'Zeit',
      level: 'N3',
      questionWord: { kanji: '何食', reading: 'なんしょく', romaji: 'nanshoku' },
      counts: [
        { num: 1, kanji: '一食', reading: 'いっしょく', romaji: 'isshoku', shift: true },
        { num: 2, kanji: '二食', reading: 'にしょく', romaji: 'nishoku', shift: false },
        { num: 3, kanji: '三食', reading: 'さんしょく', romaji: 'sanshoku', shift: false },
        { num: 4, kanji: '四食', reading: 'よんしょく', romaji: 'yonshoku', shift: false },
        { num: 5, kanji: '五食', reading: 'ごしょく', romaji: 'goshoku', shift: false },
        { num: 6, kanji: '六食', reading: 'ろくしょく', romaji: 'rokushoku', shift: false },
        { num: 7, kanji: '七食', reading: 'ななしょく', romaji: 'nanashoku', shift: false },
        { num: 8, kanji: '八食', reading: 'はっしょく', romaji: 'hasshoku', shift: true },
        { num: 9, kanji: '九食', reading: 'きゅうしょく', romaji: 'kyūshoku', shift: false },
        { num: 10, kanji: '十食', reading: 'じゅっしょく', romaji: 'jusshoku', shift: true }
      ],
      specialCounts: [],
      examples: [
        { japanese: '一日三食食べています。', romaji: 'Ichinichi sanshoku tabete imasu.', german: 'Ich esse drei Mahlzeiten am Tag.' },
        { japanese: '一泊二食付きのプランです。', romaji: 'Ippaku nishoku tsuki no puran desu.', german: 'Es ist ein Plan mit einer Übernachtung und zwei Mahlzeiten.' }
      ],
      notes: '一日三食 (いちにちさんしょく) = „drei Mahlzeiten am Tag" ist ein sehr häufiger Ausdruck. Bei Hotels: 一泊二食付き = Übernachtung mit Frühstück und Abendessen.'
    },

// ===== ESSEN & TRINKEN =====

    {
      id: 'kire',
      kanji: '切れ',
      reading: 'きれ',
      romaji: 'kire',
      meaning: 'Scheiben, Stücke',
      usage: 'Geschnittene Dinge (Fisch, Brot, Fleisch, Kuchen)',
      category: 'Essen & Trinken',
      level: 'N4',
      questionWord: { kanji: '何切れ', reading: 'なんきれ', romaji: 'nankire' },
      counts: [
        { num: 1, kanji: '一切れ', reading: 'ひときれ', romaji: 'hitokire', shift: true },
        { num: 2, kanji: '二切れ', reading: 'ふたきれ', romaji: 'futakire', shift: true },
        { num: 3, kanji: '三切れ', reading: 'さんきれ', romaji: 'sankire', shift: false },
        { num: 4, kanji: '四切れ', reading: 'よんきれ', romaji: 'yonkire', shift: false },
        { num: 5, kanji: '五切れ', reading: 'ごきれ', romaji: 'gokire', shift: false },
        { num: 6, kanji: '六切れ', reading: 'ろっきれ', romaji: 'rokkire', shift: true },
        { num: 7, kanji: '七切れ', reading: 'ななきれ', romaji: 'nanakire', shift: false },
        { num: 8, kanji: '八切れ', reading: 'はっきれ', romaji: 'hakkire', shift: true },
        { num: 9, kanji: '九切れ', reading: 'きゅうきれ', romaji: 'kyūkire', shift: false },
        { num: 10, kanji: '十切れ', reading: 'じゅっきれ', romaji: 'jukkire', shift: true }
      ],
      specialCounts: [],
      examples: [
        { japanese: 'パンを二切れ食べました。', romaji: 'Pan o futakire tabemashita.', german: 'Ich habe zwei Scheiben Brot gegessen.' },
        { japanese: '刺身を三切れ注文しました。', romaji: 'Sashimi o sankire chūmon shimashita.', german: 'Ich habe drei Scheiben Sashimi bestellt.' }
      ],
      notes: '1 und 2 verwenden die kun-Lesungen ひと und ふた, ab 3 werden die regulären on-Lesungen verwendet.'
    },
    {
      id: 'tsubu',
      kanji: '粒',
      reading: 'つぶ',
      romaji: 'tsubu',
      meaning: 'Körner, kleine runde Dinge',
      usage: 'Reiskörner, Perlen, Samen, Tabletten',
      category: 'Essen & Trinken',
      level: 'N2',
      questionWord: { kanji: '何粒', reading: 'なんつぶ', romaji: 'nantsubu' },
      counts: [
        { num: 1, kanji: '一粒', reading: 'ひとつぶ', romaji: 'hitotsubu', shift: true },
        { num: 2, kanji: '二粒', reading: 'ふたつぶ', romaji: 'futatsubu', shift: true },
        { num: 3, kanji: '三粒', reading: 'さんつぶ', romaji: 'santsubu', shift: false },
        { num: 4, kanji: '四粒', reading: 'よんつぶ', romaji: 'yontsubu', shift: false },
        { num: 5, kanji: '五粒', reading: 'ごつぶ', romaji: 'gotsubu', shift: false },
        { num: 6, kanji: '六粒', reading: 'ろくつぶ', romaji: 'rokutsubu', shift: false },
        { num: 7, kanji: '七粒', reading: 'ななつぶ', romaji: 'nanatsubu', shift: false },
        { num: 8, kanji: '八粒', reading: 'はちつぶ', romaji: 'hachitsubu', shift: false },
        { num: 9, kanji: '九粒', reading: 'きゅうつぶ', romaji: 'kyūtsubu', shift: false },
        { num: 10, kanji: '十粒', reading: 'じゅっつぶ', romaji: 'juttsubu', shift: true }
      ],
      specialCounts: [],
      examples: [
        { japanese: '薬を二粒飲んでください。', romaji: 'Kusuri o futatsubu nonde kudasai.', german: 'Bitte nehmen Sie zwei Tabletten ein.' },
        { japanese: '一粒の米も無駄にしない。', romaji: 'Hitotsubu no kome mo muda ni shinai.', german: 'Nicht ein einziges Reiskorn verschwenden.' }
      ],
      notes: '1 und 2 verwenden die kun-Lesungen ひと und ふた. Wird für sehr kleine, körnige oder runde Gegenstände verwendet.'
    },
    {
      id: 'sara',
      kanji: '皿',
      reading: 'さら',
      romaji: 'sara',
      meaning: 'Teller, Portionen',
      usage: 'Teller/Portionen von Essen (besonders Sushi, Tapas)',
      category: 'Essen & Trinken',
      level: 'N4',
      questionWord: { kanji: '何皿', reading: 'なんさら', romaji: 'nansara' },
      counts: [
        { num: 1, kanji: '一皿', reading: 'ひとさら', romaji: 'hitosara', shift: true },
        { num: 2, kanji: '二皿', reading: 'ふたさら', romaji: 'futasara', shift: true },
        { num: 3, kanji: '三皿', reading: 'さんさら', romaji: 'sansara', shift: false },
        { num: 4, kanji: '四皿', reading: 'よんさら', romaji: 'yonsara', shift: false },
        { num: 5, kanji: '五皿', reading: 'ごさら', romaji: 'gosara', shift: false },
        { num: 6, kanji: '六皿', reading: 'ろくさら', romaji: 'rokusara', shift: false },
        { num: 7, kanji: '七皿', reading: 'ななさら', romaji: 'nanasara', shift: false },
        { num: 8, kanji: '八皿', reading: 'はちさら', romaji: 'hachisara', shift: false },
        { num: 9, kanji: '九皿', reading: 'きゅうさら', romaji: 'kyūsara', shift: false },
        { num: 10, kanji: '十皿', reading: 'じゅっさら', romaji: 'jussara', shift: true }
      ],
      specialCounts: [],
      examples: [
        { japanese: '回転寿司で五皿食べました。', romaji: 'Kaiten-zushi de gosara tabemashita.', german: 'Ich habe beim Fließbandsushi fünf Teller gegessen.' },
        { japanese: 'サラダを一皿注文しました。', romaji: 'Sarada o hitosara chūmon shimashita.', german: 'Ich habe einen Teller Salat bestellt.' }
      ],
      notes: '1 und 2 verwenden die kun-Lesungen ひと und ふた. Besonders gebräuchlich beim Fließbandsushi (回転寿司).'
    },
    {
      id: 'cho',
      kanji: '丁',
      reading: 'ちょう',
      romaji: 'chō',
      meaning: 'Blöcke, Portionen',
      usage: 'Tofu-Blöcke, Portionen',
      category: 'Essen & Trinken',
      level: 'N4',
      questionWord: { kanji: '何丁', reading: 'なんちょう', romaji: 'nanchō' },
      counts: [
        { num: 1, kanji: '一丁', reading: 'いっちょう', romaji: 'itchō', shift: true },
        { num: 2, kanji: '二丁', reading: 'にちょう', romaji: 'nichō', shift: false },
        { num: 3, kanji: '三丁', reading: 'さんちょう', romaji: 'sanchō', shift: false },
        { num: 4, kanji: '四丁', reading: 'よんちょう', romaji: 'yonchō', shift: false },
        { num: 5, kanji: '五丁', reading: 'ごちょう', romaji: 'gochō', shift: false },
        { num: 6, kanji: '六丁', reading: 'ろくちょう', romaji: 'rokuchō', shift: false },
        { num: 7, kanji: '七丁', reading: 'ななちょう', romaji: 'nanachō', shift: false },
        { num: 8, kanji: '八丁', reading: 'はっちょう', romaji: 'hatchō', shift: true },
        { num: 9, kanji: '九丁', reading: 'きゅうちょう', romaji: 'kyūchō', shift: false },
        { num: 10, kanji: '十丁', reading: 'じゅっちょう', romaji: 'jutchō', shift: true }
      ],
      specialCounts: [],
      examples: [
        { japanese: '豆腐を一丁買いました。', romaji: 'Tōfu o itchō kaimashita.', german: 'Ich habe einen Block Tofu gekauft.' },
        { japanese: '冷奴を二丁ください。', romaji: 'Hiyayakko o nichō kudasai.', german: 'Zwei Portionen kalten Tofu, bitte.' }
      ],
      notes: 'Wird hauptsächlich für Tofu verwendet. 一丁 kann auch umgangssprachlich „Los geht\'s!" bedeuten.'
    },
    {
      id: 'kan',
      kanji: '缶',
      reading: 'かん',
      romaji: 'kan',
      meaning: 'Dosen',
      usage: 'Getränkedosen, Konservendosen',
      category: 'Essen & Trinken',
      level: 'N3',
      questionWord: { kanji: '何缶', reading: 'なんかん', romaji: 'nankan' },
      counts: [
        { num: 1, kanji: '一缶', reading: 'いっかん', romaji: 'ikkan', shift: true },
        { num: 2, kanji: '二缶', reading: 'にかん', romaji: 'nikan', shift: false },
        { num: 3, kanji: '三缶', reading: 'さんかん', romaji: 'sankan', shift: false },
        { num: 4, kanji: '四缶', reading: 'よんかん', romaji: 'yonkan', shift: false },
        { num: 5, kanji: '五缶', reading: 'ごかん', romaji: 'gokan', shift: false },
        { num: 6, kanji: '六缶', reading: 'ろっかん', romaji: 'rokkan', shift: true },
        { num: 7, kanji: '七缶', reading: 'ななかん', romaji: 'nanakan', shift: false },
        { num: 8, kanji: '八缶', reading: 'はっかん', romaji: 'hakkan', shift: true },
        { num: 9, kanji: '九缶', reading: 'きゅうかん', romaji: 'kyūkan', shift: false },
        { num: 10, kanji: '十缶', reading: 'じゅっかん', romaji: 'jukkan', shift: true }
      ],
      specialCounts: [],
      examples: [
        { japanese: 'ビールを三缶買いました。', romaji: 'Bīru o sankan kaimashita.', german: 'Ich habe drei Dosen Bier gekauft.' },
        { japanese: '一缶百円のジュースです。', romaji: 'Ikkan hyaku-en no jūsu desu.', german: 'Das ist ein Saft für hundert Yen pro Dose.' }
      ],
      notes: 'Wird für alle Arten von Dosen verwendet, sowohl Getränke- als auch Konservendosen.'
    },
    {
      id: 'bin',
      kanji: '瓶',
      reading: 'びん',
      romaji: 'bin',
      meaning: 'Flaschen',
      usage: 'Flaschen (Wein, Bier, Milch, Wasser)',
      category: 'Essen & Trinken',
      level: 'N3',
      questionWord: { kanji: '何瓶', reading: 'なんびん', romaji: 'nanbin' },
      counts: [
        { num: 1, kanji: '一瓶', reading: 'いちびん', romaji: 'ichibin', shift: false },
        { num: 2, kanji: '二瓶', reading: 'にびん', romaji: 'nibin', shift: false },
        { num: 3, kanji: '三瓶', reading: 'さんびん', romaji: 'sanbin', shift: false },
        { num: 4, kanji: '四瓶', reading: 'よんびん', romaji: 'yonbin', shift: false },
        { num: 5, kanji: '五瓶', reading: 'ごびん', romaji: 'gobin', shift: false },
        { num: 6, kanji: '六瓶', reading: 'ろくびん', romaji: 'rokubin', shift: false },
        { num: 7, kanji: '七瓶', reading: 'ななびん', romaji: 'nanabin', shift: false },
        { num: 8, kanji: '八瓶', reading: 'はちびん', romaji: 'hachibin', shift: false },
        { num: 9, kanji: '九瓶', reading: 'きゅうびん', romaji: 'kyūbin', shift: false },
        { num: 10, kanji: '十瓶', reading: 'じゅうびん', romaji: 'jūbin', shift: false }
      ],
      specialCounts: [],
      examples: [
        { japanese: 'ワインを二瓶注文しました。', romaji: 'Wain o nibin chūmon shimashita.', german: 'Ich habe zwei Flaschen Wein bestellt.' },
        { japanese: '牛乳を一瓶買ってきて。', romaji: 'Gyūnyū o ichibin katte kite.', german: 'Kauf bitte eine Flasche Milch.' }
      ],
      notes: 'Da びん bereits mit einem stimmhaften Konsonanten beginnt, gibt es keine Lautverschiebungen.'
    },
    {
      id: 'kuchi',
      kanji: '口',
      reading: 'くち',
      romaji: 'kuchi',
      meaning: 'Bissen, Anteile',
      usage: 'Bissen beim Essen; auch Bankkonten, Spenden, Loseinteilungen',
      category: 'Essen & Trinken',
      level: 'N3',
      questionWord: { kanji: '何口', reading: 'なんくち', romaji: 'nankuchi' },
      counts: [
        { num: 1, kanji: '一口', reading: 'ひとくち', romaji: 'hitokuchi', shift: true },
        { num: 2, kanji: '二口', reading: 'ふたくち', romaji: 'futakuchi', shift: true },
        { num: 3, kanji: '三口', reading: 'さんくち', romaji: 'sankuchi', shift: false },
        { num: 4, kanji: '四口', reading: 'よんくち', romaji: 'yonkuchi', shift: false },
        { num: 5, kanji: '五口', reading: 'ごくち', romaji: 'gokuchi', shift: false },
        { num: 6, kanji: '六口', reading: 'ろっくち', romaji: 'rokkuchi', shift: true },
        { num: 7, kanji: '七口', reading: 'ななくち', romaji: 'nanakuchi', shift: false },
        { num: 8, kanji: '八口', reading: 'はっくち', romaji: 'hakkuchi', shift: true },
        { num: 9, kanji: '九口', reading: 'きゅうくち', romaji: 'kyūkuchi', shift: false },
        { num: 10, kanji: '十口', reading: 'じゅっくち', romaji: 'jukkuchi', shift: true }
      ],
      specialCounts: [],
      examples: [
        { japanese: '一口食べてみてください。', romaji: 'Hitokuchi tabete mite kudasai.', german: 'Probieren Sie bitte einen Bissen.' },
        { japanese: '寄付を二口申し込みました。', romaji: 'Kifu o futakuchi mōshikomimashita.', german: 'Ich habe mich für zwei Spendenanteile angemeldet.' }
      ],
      notes: '1 und 2 verwenden die kun-Lesungen ひと und ふた. Vielseitiger Zähler: neben Bissen auch für Bankkonten und Spenden.'
    },
    {
      id: 'zen',
      kanji: '膳',
      reading: 'ぜん',
      romaji: 'zen',
      meaning: 'Essstäbchenpaare, Mahlzeiten',
      usage: 'Paare von Essstäbchen; formelle Mahlzeiten-Sets',
      category: 'Essen & Trinken',
      level: 'N4',
      questionWord: { kanji: '何膳', reading: 'なんぜん', romaji: 'nanzen' },
      counts: [
        { num: 1, kanji: '一膳', reading: 'いちぜん', romaji: 'ichizen', shift: false },
        { num: 2, kanji: '二膳', reading: 'にぜん', romaji: 'nizen', shift: false },
        { num: 3, kanji: '三膳', reading: 'さんぜん', romaji: 'sanzen', shift: false },
        { num: 4, kanji: '四膳', reading: 'よんぜん', romaji: 'yonzen', shift: false },
        { num: 5, kanji: '五膳', reading: 'ごぜん', romaji: 'gozen', shift: false },
        { num: 6, kanji: '六膳', reading: 'ろくぜん', romaji: 'rokuzen', shift: false },
        { num: 7, kanji: '七膳', reading: 'ななぜん', romaji: 'nanazen', shift: false },
        { num: 8, kanji: '八膳', reading: 'はちぜん', romaji: 'hachizen', shift: false },
        { num: 9, kanji: '九膳', reading: 'きゅうぜん', romaji: 'kyūzen', shift: false },
        { num: 10, kanji: '十膳', reading: 'じゅうぜん', romaji: 'jūzen', shift: false }
      ],
      specialCounts: [],
      examples: [
        { japanese: 'お箸を三膳ください。', romaji: 'Ohashi o sanzen kudasai.', german: 'Drei Paar Essstäbchen, bitte.' },
        { japanese: '一膳のご飯で足りますか。', romaji: 'Ichizen no gohan de tarimasu ka.', german: 'Reicht eine Schale Reis?' }
      ],
      notes: 'Da ぜん bereits mit einem stimmhaften Konsonanten beginnt, gibt es keine Lautverschiebungen. Wird sowohl für Essstäbchenpaare als auch für Mahlzeiten-Sets verwendet.'
    },
    {
      id: 'tama',
      kanji: '玉',
      reading: 'たま',
      romaji: 'tama',
      meaning: 'Kugeln, runde Objekte',
      usage: 'Runde Dinge (Kohl, Zwiebeln, Wollknäuel)',
      category: 'Essen & Trinken',
      level: 'N4',
      questionWord: { kanji: '何玉', reading: 'なんたま', romaji: 'nantama' },
      counts: [
        { num: 1, kanji: '一玉', reading: 'ひとたま', romaji: 'hitotama', shift: true },
        { num: 2, kanji: '二玉', reading: 'ふたたま', romaji: 'futatama', shift: true },
        { num: 3, kanji: '三玉', reading: 'さんたま', romaji: 'santama', shift: false },
        { num: 4, kanji: '四玉', reading: 'よんたま', romaji: 'yontama', shift: false },
        { num: 5, kanji: '五玉', reading: 'ごたま', romaji: 'gotama', shift: false },
        { num: 6, kanji: '六玉', reading: 'ろくたま', romaji: 'rokutama', shift: false },
        { num: 7, kanji: '七玉', reading: 'ななたま', romaji: 'nanatama', shift: false },
        { num: 8, kanji: '八玉', reading: 'はちたま', romaji: 'hachitama', shift: false },
        { num: 9, kanji: '九玉', reading: 'きゅうたま', romaji: 'kyūtama', shift: false },
        { num: 10, kanji: '十玉', reading: 'じゅったま', romaji: 'juttama', shift: true }
      ],
      specialCounts: [],
      examples: [
        { japanese: 'キャベツを一玉買いました。', romaji: 'Kyabetsu o hitotama kaimashita.', german: 'Ich habe einen Kohlkopf gekauft.' },
        { japanese: 'うどんを二玉ゆでてください。', romaji: 'Udon o futatama yudete kudasai.', german: 'Bitte kochen Sie zwei Portionen Udon.' }
      ],
      notes: '1 und 2 verwenden die kun-Lesungen ひと und ふた. Wird für runde, kugelige Gegenstände verwendet, besonders Kohlköpfe und Udon-Portionen.'
    },

    // ===== GEBÄUDE & RÄUME =====

    {
      id: 'shitsu',
      kanji: '室',
      reading: 'しつ',
      romaji: 'shitsu',
      meaning: 'Zimmer (formal)',
      usage: 'Hotelzimmer, Krankenhauszimmer, Büros (formell)',
      category: 'Gebäude & Räume',
      level: 'N3',
      questionWord: { kanji: '何室', reading: 'なんしつ', romaji: 'nanshitsu' },
      counts: [
        { num: 1, kanji: '一室', reading: 'いっしつ', romaji: 'isshitsu', shift: true },
        { num: 2, kanji: '二室', reading: 'にしつ', romaji: 'nishitsu', shift: false },
        { num: 3, kanji: '三室', reading: 'さんしつ', romaji: 'sanshitsu', shift: false },
        { num: 4, kanji: '四室', reading: 'よんしつ', romaji: 'yonshitsu', shift: false },
        { num: 5, kanji: '五室', reading: 'ごしつ', romaji: 'goshitsu', shift: false },
        { num: 6, kanji: '六室', reading: 'ろくしつ', romaji: 'rokushitsu', shift: false },
        { num: 7, kanji: '七室', reading: 'ななしつ', romaji: 'nanashitsu', shift: false },
        { num: 8, kanji: '八室', reading: 'はっしつ', romaji: 'hasshitsu', shift: true },
        { num: 9, kanji: '九室', reading: 'きゅうしつ', romaji: 'kyūshitsu', shift: false },
        { num: 10, kanji: '十室', reading: 'じゅっしつ', romaji: 'jusshitsu', shift: true }
      ],
      specialCounts: [],
      examples: [
        { japanese: 'このホテルは全部で百室あります。', romaji: 'Kono hoteru wa zenbu de hyakushitsu arimasu.', german: 'Dieses Hotel hat insgesamt hundert Zimmer.' },
        { japanese: '一室だけ空いています。', romaji: 'Isshitsu dake aite imasu.', german: 'Nur ein Zimmer ist frei.' }
      ],
      notes: 'Formeller Zähler für Zimmer. Im Alltag wird eher 部屋 (へや) verwendet, 室 ist typisch für Hotels und offizielle Angaben.'
    },
    {
      id: 'to-bldg',
      kanji: '棟',
      reading: 'とう',
      romaji: 'tō',
      meaning: 'Gebäude, Gebäudetrakte',
      usage: 'Gebäude, Wohnblöcke, Gebäudekomplexe',
      category: 'Gebäude & Räume',
      level: 'N3',
      questionWord: { kanji: '何棟', reading: 'なんとう', romaji: 'nantō' },
      counts: [
        { num: 1, kanji: '一棟', reading: 'いっとう', romaji: 'ittō', shift: true },
        { num: 2, kanji: '二棟', reading: 'にとう', romaji: 'nitō', shift: false },
        { num: 3, kanji: '三棟', reading: 'さんとう', romaji: 'santō', shift: false },
        { num: 4, kanji: '四棟', reading: 'よんとう', romaji: 'yontō', shift: false },
        { num: 5, kanji: '五棟', reading: 'ごとう', romaji: 'gotō', shift: false },
        { num: 6, kanji: '六棟', reading: 'ろくとう', romaji: 'rokutō', shift: false },
        { num: 7, kanji: '七棟', reading: 'ななとう', romaji: 'nanatō', shift: false },
        { num: 8, kanji: '八棟', reading: 'はっとう', romaji: 'hattō', shift: true },
        { num: 9, kanji: '九棟', reading: 'きゅうとう', romaji: 'kyūtō', shift: false },
        { num: 10, kanji: '十棟', reading: 'じゅっとう', romaji: 'juttō', shift: true }
      ],
      specialCounts: [],
      examples: [
        { japanese: 'この団地には五棟のマンションがあります。', romaji: 'Kono danchi ni wa gotō no manshon ga arimasu.', german: 'In dieser Wohnanlage gibt es fünf Wohngebäude.' },
        { japanese: '新しいビルが二棟建てられました。', romaji: 'Atarashii biru ga nitō tateraremashita.', german: 'Zwei neue Gebäude wurden errichtet.' }
      ],
      notes: 'Wird für ganze Gebäude oder Gebäudetrakte verwendet, nicht für einzelne Zimmer.'
    },
    {
      id: 'seki',
      kanji: '席',
      reading: 'せき',
      romaji: 'seki',
      meaning: 'Sitzplätze',
      usage: 'Sitzplätze (Restaurant, Theater, Flugzeug)',
      category: 'Gebäude & Räume',
      level: 'N3',
      questionWord: { kanji: '何席', reading: 'なんせき', romaji: 'nanseki' },
      counts: [
        { num: 1, kanji: '一席', reading: 'いっせき', romaji: 'isseki', shift: true },
        { num: 2, kanji: '二席', reading: 'にせき', romaji: 'niseki', shift: false },
        { num: 3, kanji: '三席', reading: 'さんせき', romaji: 'sanseki', shift: false },
        { num: 4, kanji: '四席', reading: 'よんせき', romaji: 'yonseki', shift: false },
        { num: 5, kanji: '五席', reading: 'ごせき', romaji: 'goseki', shift: false },
        { num: 6, kanji: '六席', reading: 'ろくせき', romaji: 'rokuseki', shift: false },
        { num: 7, kanji: '七席', reading: 'ななせき', romaji: 'nanaseki', shift: false },
        { num: 8, kanji: '八席', reading: 'はっせき', romaji: 'hasseki', shift: true },
        { num: 9, kanji: '九席', reading: 'きゅうせき', romaji: 'kyūseki', shift: false },
        { num: 10, kanji: '十席', reading: 'じゅっせき', romaji: 'jusseki', shift: true }
      ],
      specialCounts: [],
      examples: [
        { japanese: '二席空いていますか。', romaji: 'Niseki aite imasu ka.', german: 'Sind zwei Plätze frei?' },
        { japanese: 'このレストランは全部で五十席あります。', romaji: 'Kono resutoran wa zenbu de gojusseki arimasu.', german: 'Dieses Restaurant hat insgesamt fünfzig Sitzplätze.' }
      ],
      notes: 'Wird für Sitzplätze in Restaurants, Theatern, Flugzeugen und anderen öffentlichen Einrichtungen verwendet.'
    },
    {
      id: 'ma',
      kanji: '間',
      reading: 'ま',
      romaji: 'ma',
      meaning: 'Räume (traditionell)',
      usage: 'Traditionelle japanische Räume, Zimmerangabe in Immobilien',
      category: 'Gebäude & Räume',
      level: 'N2',
      questionWord: { kanji: '何間', reading: 'なんま', romaji: 'nanma' },
      counts: [
        { num: 1, kanji: '一間', reading: 'ひとま', romaji: 'hitoma', shift: true },
        { num: 2, kanji: '二間', reading: 'ふたま', romaji: 'futama', shift: true },
        { num: 3, kanji: '三間', reading: 'さんま', romaji: 'sanma', shift: false },
        { num: 4, kanji: '四間', reading: 'よんま', romaji: 'yonma', shift: false },
        { num: 5, kanji: '五間', reading: 'ごま', romaji: 'goma', shift: false },
        { num: 6, kanji: '六間', reading: 'ろくま', romaji: 'rokuma', shift: false },
        { num: 7, kanji: '七間', reading: 'ななま', romaji: 'nanama', shift: false },
        { num: 8, kanji: '八間', reading: 'はちま', romaji: 'hachima', shift: false },
        { num: 9, kanji: '九間', reading: 'きゅうま', romaji: 'kyūma', shift: false },
        { num: 10, kanji: '十間', reading: 'じゅうま', romaji: 'jūma', shift: false }
      ],
      specialCounts: [],
      examples: [
        { japanese: 'この家には三間あります。', romaji: 'Kono ie ni wa sanma arimasu.', german: 'Dieses Haus hat drei Zimmer.' },
        { japanese: '一間を書斎にしました。', romaji: 'Hitoma o shosai ni shimashita.', german: 'Ich habe ein Zimmer zum Arbeitszimmer gemacht.' }
      ],
      notes: '1 und 2 verwenden die kun-Lesungen ひと und ふた. Wird für traditionelle japanische Räume und in Immobilienanzeigen verwendet.'
    },
    {
      id: 'jo-tatami',
      kanji: '畳',
      reading: 'じょう',
      romaji: 'jō',
      meaning: 'Tatami-Matten (Raumgröße)',
      usage: 'Raumgröße in Tatami-Einheiten (1畳 ≈ 1,65 m²)',
      category: 'Gebäude & Räume',
      level: 'N3',
      questionWord: { kanji: '何畳', reading: 'なんじょう', romaji: 'nanjō' },
      counts: [
        { num: 1, kanji: '一畳', reading: 'いちじょう', romaji: 'ichijō', shift: false },
        { num: 2, kanji: '二畳', reading: 'にじょう', romaji: 'nijō', shift: false },
        { num: 3, kanji: '三畳', reading: 'さんじょう', romaji: 'sanjō', shift: false },
        { num: 4, kanji: '四畳', reading: 'よじょう', romaji: 'yojō', shift: false },
        { num: 5, kanji: '五畳', reading: 'ごじょう', romaji: 'gojō', shift: false },
        { num: 6, kanji: '六畳', reading: 'ろくじょう', romaji: 'rokujō', shift: false },
        { num: 7, kanji: '七畳', reading: 'ななじょう', romaji: 'nanajō', shift: false },
        { num: 8, kanji: '八畳', reading: 'はちじょう', romaji: 'hachijō', shift: false },
        { num: 9, kanji: '九畳', reading: 'きゅうじょう', romaji: 'kyūjō', shift: false },
        { num: 10, kanji: '十畳', reading: 'じゅうじょう', romaji: 'jūjō', shift: false }
      ],
      specialCounts: [
        { num: 4.5, kanji: '四畳半', reading: 'よじょうはん', romaji: 'yojōhan', note: 'Klassische Raumgröße für Teezeremonien' }
      ],
      examples: [
        { japanese: '私の部屋は六畳です。', romaji: 'Watashi no heya wa rokujō desu.', german: 'Mein Zimmer ist sechs Tatami groß.' },
        { japanese: '四畳半の和室があります。', romaji: 'Yojōhan no washitsu ga arimasu.', german: 'Es gibt ein japanisches Zimmer mit viereinhalb Tatami.' }
      ],
      notes: 'Bei 4 wird よじょう (nicht よんじょう) verwendet. 四畳半 (よじょうはん) ist die klassische Raumgröße für Teezeremonien. Da じょう mit einem stimmhaften Konsonanten beginnt, gibt es keine Lautverschiebungen.'
    },
    {
      id: 'kasho',
      kanji: 'ヶ所',
      reading: 'かしょ',
      romaji: 'kasho',
      meaning: 'Orte, Stellen',
      usage: 'Orte, Standorte, Stellen (z.B. Fehler im Text, Touristenattraktionen)',
      category: 'Gebäude & Räume',
      level: 'N3',
      questionWord: { kanji: '何ヶ所', reading: 'なんかしょ', romaji: 'nankasho' },
      counts: [
        { num: 1, kanji: '一ヶ所', reading: 'いっかしょ', romaji: 'ikkasho', shift: true },
        { num: 2, kanji: '二ヶ所', reading: 'にかしょ', romaji: 'nikasho', shift: false },
        { num: 3, kanji: '三ヶ所', reading: 'さんかしょ', romaji: 'sankasho', shift: false },
        { num: 4, kanji: '四ヶ所', reading: 'よんかしょ', romaji: 'yonkasho', shift: false },
        { num: 5, kanji: '五ヶ所', reading: 'ごかしょ', romaji: 'gokasho', shift: false },
        { num: 6, kanji: '六ヶ所', reading: 'ろっかしょ', romaji: 'rokkasho', shift: true },
        { num: 7, kanji: '七ヶ所', reading: 'ななかしょ', romaji: 'nanakasho', shift: false },
        { num: 8, kanji: '八ヶ所', reading: 'はっかしょ', romaji: 'hakkasho', shift: true },
        { num: 9, kanji: '九ヶ所', reading: 'きゅうかしょ', romaji: 'kyūkasho', shift: false },
        { num: 10, kanji: '十ヶ所', reading: 'じゅっかしょ', romaji: 'jukkasho', shift: true }
      ],
      specialCounts: [],
      examples: [
        { japanese: '間違いが三ヶ所あります。', romaji: 'Machigai ga sankasho arimasu.', german: 'Es gibt drei Fehler.' },
        { japanese: '京都で五ヶ所のお寺を訪れました。', romaji: 'Kyōto de gokasho no otera o otozuremashita.', german: 'Ich habe in Kyoto fünf Tempel besucht.' }
      ],
      notes: 'Sehr häufiger Zähler für Orte und Stellen. Kann auch als 箇所 geschrieben werden.'
    },

    // ===== TRANSPORT =====

    {
      id: 'bin-transport',
      kanji: '便',
      reading: 'びん',
      romaji: 'bin',
      meaning: 'Flüge, Postlieferungen',
      usage: 'Flüge, Busverbindungen, Postlieferungen',
      category: 'Transport',
      level: 'N3',
      questionWord: { kanji: '何便', reading: 'なんびん', romaji: 'nanbin' },
      counts: [
        { num: 1, kanji: '一便', reading: 'いちびん', romaji: 'ichibin', shift: false },
        { num: 2, kanji: '二便', reading: 'にびん', romaji: 'nibin', shift: false },
        { num: 3, kanji: '三便', reading: 'さんびん', romaji: 'sanbin', shift: false },
        { num: 4, kanji: '四便', reading: 'よんびん', romaji: 'yonbin', shift: false },
        { num: 5, kanji: '五便', reading: 'ごびん', romaji: 'gobin', shift: false },
        { num: 6, kanji: '六便', reading: 'ろくびん', romaji: 'rokubin', shift: false },
        { num: 7, kanji: '七便', reading: 'ななびん', romaji: 'nanabin', shift: false },
        { num: 8, kanji: '八便', reading: 'はちびん', romaji: 'hachibin', shift: false },
        { num: 9, kanji: '九便', reading: 'きゅうびん', romaji: 'kyūbin', shift: false },
        { num: 10, kanji: '十便', reading: 'じゅうびん', romaji: 'jūbin', shift: false }
      ],
      specialCounts: [],
      examples: [
        { japanese: '次の便は十四時発です。', romaji: 'Tsugi no bin wa jūyoji hatsu desu.', german: 'Der nächste Flug startet um vierzehn Uhr.' },
        { japanese: '一日三便のバスがあります。', romaji: 'Ichinichi sanbin no basu ga arimasu.', german: 'Es gibt drei Busverbindungen pro Tag.' }
      ],
      notes: 'Da びん bereits mit einem stimmhaften Konsonanten beginnt, gibt es keine Lautverschiebungen. Wird oft für Flugnummern und Postdienste verwendet.'
    },
    {
      id: 'ryo',
      kanji: '両',
      reading: 'りょう',
      romaji: 'ryō',
      meaning: 'Zugwaggons',
      usage: 'Eisenbahnwaggons, Straßenbahnwagen',
      category: 'Transport',
      level: 'N2',
      questionWord: { kanji: '何両', reading: 'なんりょう', romaji: 'nanryō' },
      counts: [
        { num: 1, kanji: '一両', reading: 'いちりょう', romaji: 'ichiryō', shift: false },
        { num: 2, kanji: '二両', reading: 'にりょう', romaji: 'niryō', shift: false },
        { num: 3, kanji: '三両', reading: 'さんりょう', romaji: 'sanryō', shift: false },
        { num: 4, kanji: '四両', reading: 'よんりょう', romaji: 'yonryō', shift: false },
        { num: 5, kanji: '五両', reading: 'ごりょう', romaji: 'goryō', shift: false },
        { num: 6, kanji: '六両', reading: 'ろくりょう', romaji: 'rokuryō', shift: false },
        { num: 7, kanji: '七両', reading: 'ななりょう', romaji: 'nanaryō', shift: false },
        { num: 8, kanji: '八両', reading: 'はちりょう', romaji: 'hachiryō', shift: false },
        { num: 9, kanji: '九両', reading: 'きゅうりょう', romaji: 'kyūryō', shift: false },
        { num: 10, kanji: '十両', reading: 'じゅうりょう', romaji: 'jūryō', shift: false }
      ],
      specialCounts: [],
      examples: [
        { japanese: 'この電車は十両編成です。', romaji: 'Kono densha wa jūryō hensei desu.', german: 'Dieser Zug besteht aus zehn Waggons.' },
        { japanese: '先頭から三両目に乗ってください。', romaji: 'Sentō kara sanryōme ni notte kudasai.', german: 'Bitte steigen Sie in den dritten Waggon von vorne ein.' }
      ],
      notes: 'Wird ausschließlich für Eisenbahnwaggons und Straßenbahnwagen verwendet. Keine Lautverschiebungen, da りょう mit r beginnt.'
    },

    // ===== SPRACHE & SCHRIFT =====

    {
      id: 'ji-char',
      kanji: '字',
      reading: 'じ',
      romaji: 'ji',
      meaning: 'Schriftzeichen',
      usage: 'Buchstaben, Schriftzeichen, Zeichen',
      category: 'Sprache & Schrift',
      level: 'N3',
      questionWord: { kanji: '何字', reading: 'なんじ', romaji: 'nanji' },
      counts: [
        { num: 1, kanji: '一字', reading: 'いちじ', romaji: 'ichiji', shift: false },
        { num: 2, kanji: '二字', reading: 'にじ', romaji: 'niji', shift: false },
        { num: 3, kanji: '三字', reading: 'さんじ', romaji: 'sanji', shift: false },
        { num: 4, kanji: '四字', reading: 'よじ', romaji: 'yoji', shift: false },
        { num: 5, kanji: '五字', reading: 'ごじ', romaji: 'goji', shift: false },
        { num: 6, kanji: '六字', reading: 'ろくじ', romaji: 'rokuji', shift: false },
        { num: 7, kanji: '七字', reading: 'ななじ', romaji: 'nanaji', shift: false },
        { num: 8, kanji: '八字', reading: 'はちじ', romaji: 'hachiji', shift: false },
        { num: 9, kanji: '九字', reading: 'きゅうじ', romaji: 'kyūji', shift: false },
        { num: 10, kanji: '十字', reading: 'じゅうじ', romaji: 'jūji', shift: false }
      ],
      specialCounts: [],
      examples: [
        { japanese: '名前は漢字で四字です。', romaji: 'Namae wa kanji de yoji desu.', german: 'Der Name besteht aus vier Kanji.' },
        { japanese: 'パスワードは八字以上必要です。', romaji: 'Pasuwādo wa hachiji ijō hitsuyō desu.', german: 'Das Passwort muss mindestens acht Zeichen lang sein.' }
      ],
      notes: 'Bei 4 wird よじ (nicht よんじ) verwendet. 四字熟語 (よじじゅくご) ist ein bekannter Begriff für vierzeichige Kanji-Redewendungen. Da じ mit einem stimmhaften Konsonanten beginnt, gibt es keine Lautverschiebungen.'
    },
    {
      id: 'go-word',
      kanji: '語',
      reading: 'ご',
      romaji: 'go',
      meaning: 'Wörter',
      usage: 'Wörter (beim Zählen von Vokabular)',
      category: 'Sprache & Schrift',
      level: 'N3',
      questionWord: { kanji: '何語', reading: 'なんご', romaji: 'nango' },
      counts: [
        { num: 1, kanji: '一語', reading: 'いちご', romaji: 'ichigo', shift: false },
        { num: 2, kanji: '二語', reading: 'にご', romaji: 'nigo', shift: false },
        { num: 3, kanji: '三語', reading: 'さんご', romaji: 'sango', shift: false },
        { num: 4, kanji: '四語', reading: 'よんご', romaji: 'yongo', shift: false },
        { num: 5, kanji: '五語', reading: 'ごご', romaji: 'gogo', shift: false },
        { num: 6, kanji: '六語', reading: 'ろくご', romaji: 'rokugo', shift: false },
        { num: 7, kanji: '七語', reading: 'ななご', romaji: 'nanago', shift: false },
        { num: 8, kanji: '八語', reading: 'はちご', romaji: 'hachigo', shift: false },
        { num: 9, kanji: '九語', reading: 'きゅうご', romaji: 'kyūgo', shift: false },
        { num: 10, kanji: '十語', reading: 'じゅうご', romaji: 'jūgo', shift: false }
      ],
      specialCounts: [],
      examples: [
        { japanese: '毎日十語の新しい単語を覚えます。', romaji: 'Mainichi jūgo no atarashii tango o oboemasu.', german: 'Ich lerne jeden Tag zehn neue Vokabeln.' },
        { japanese: 'この文は五語からなっています。', romaji: 'Kono bun wa gogo kara natte imasu.', german: 'Dieser Satz besteht aus fünf Wörtern.' }
      ],
      notes: 'Da ご bereits mit einem stimmhaften Konsonanten beginnt, gibt es keine Lautverschiebungen. Nicht verwechseln mit der Bedeutung „Sprache" (日本語, 英語 usw.).'
    },
    {
      id: 'bun-sentence',
      kanji: '文',
      reading: 'ぶん',
      romaji: 'bun',
      meaning: 'Sätze',
      usage: 'Sätze (in Texten, Übungen)',
      category: 'Sprache & Schrift',
      level: 'N3',
      questionWord: { kanji: '何文', reading: 'なんぶん', romaji: 'nanbun' },
      counts: [
        { num: 1, kanji: '一文', reading: 'いちぶん', romaji: 'ichibun', shift: false },
        { num: 2, kanji: '二文', reading: 'にぶん', romaji: 'nibun', shift: false },
        { num: 3, kanji: '三文', reading: 'さんぶん', romaji: 'sanbun', shift: false },
        { num: 4, kanji: '四文', reading: 'よんぶん', romaji: 'yonbun', shift: false },
        { num: 5, kanji: '五文', reading: 'ごぶん', romaji: 'gobun', shift: false },
        { num: 6, kanji: '六文', reading: 'ろくぶん', romaji: 'rokubun', shift: false },
        { num: 7, kanji: '七文', reading: 'ななぶん', romaji: 'nanabun', shift: false },
        { num: 8, kanji: '八文', reading: 'はちぶん', romaji: 'hachibun', shift: false },
        { num: 9, kanji: '九文', reading: 'きゅうぶん', romaji: 'kyūbun', shift: false },
        { num: 10, kanji: '十文', reading: 'じゅうぶん', romaji: 'jūbun', shift: false }
      ],
      specialCounts: [],
      examples: [
        { japanese: '日本語で三文書いてください。', romaji: 'Nihongo de sanbun kaite kudasai.', german: 'Bitte schreiben Sie drei Sätze auf Japanisch.' },
        { japanese: '最初の一文がとても大切です。', romaji: 'Saisho no ichibun ga totemo taisetsu desu.', german: 'Der erste Satz ist sehr wichtig.' }
      ],
      notes: 'Da ぶん bereits mit einem stimmhaften Konsonanten beginnt, gibt es keine Lautverschiebungen. Nicht verwechseln mit 分 (ぶん, Anteil/Minute).'
    },
    {
      id: 'gyo',
      kanji: '行',
      reading: 'ぎょう',
      romaji: 'gyō',
      meaning: 'Zeilen',
      usage: 'Textzeilen, Programmzeilen',
      category: 'Sprache & Schrift',
      level: 'N3',
      questionWord: { kanji: '何行', reading: 'なんぎょう', romaji: 'nangyō' },
      counts: [
        { num: 1, kanji: '一行', reading: 'いちぎょう', romaji: 'ichigyō', shift: false },
        { num: 2, kanji: '二行', reading: 'にぎょう', romaji: 'nigyō', shift: false },
        { num: 3, kanji: '三行', reading: 'さんぎょう', romaji: 'sangyō', shift: false },
        { num: 4, kanji: '四行', reading: 'よんぎょう', romaji: 'yongyō', shift: false },
        { num: 5, kanji: '五行', reading: 'ごぎょう', romaji: 'gogyō', shift: false },
        { num: 6, kanji: '六行', reading: 'ろくぎょう', romaji: 'rokugyō', shift: false },
        { num: 7, kanji: '七行', reading: 'ななぎょう', romaji: 'nanagyō', shift: false },
        { num: 8, kanji: '八行', reading: 'はちぎょう', romaji: 'hachigyō', shift: false },
        { num: 9, kanji: '九行', reading: 'きゅうぎょう', romaji: 'kyūgyō', shift: false },
        { num: 10, kanji: '十行', reading: 'じゅうぎょう', romaji: 'jūgyō', shift: false }
      ],
      specialCounts: [],
      examples: [
        { japanese: 'この詩は五行で書かれています。', romaji: 'Kono shi wa gogyō de kakarete imasu.', german: 'Dieses Gedicht ist in fünf Zeilen geschrieben.' },
        { japanese: 'レポートを三行で要約してください。', romaji: 'Repōto o sangyō de yōyaku shite kudasai.', german: 'Bitte fassen Sie den Bericht in drei Zeilen zusammen.' }
      ],
      notes: 'Da ぎょう bereits mit einem stimmhaften Konsonanten beginnt, gibt es keine Lautverschiebungen. 行 hat auch die Lesung こう (z.B. 銀行) und いく/ゆく (gehen).'
    },
    {
      id: 'peji',
      kanji: 'ページ',
      reading: 'ページ',
      romaji: 'pēji',
      meaning: 'Seiten',
      usage: 'Buchseiten, Dokumentenseiten',
      category: 'Sprache & Schrift',
      level: 'N4',
      questionWord: { kanji: '何ページ', reading: 'なんページ', romaji: 'nan pēji' },
      counts: [
        { num: 1, kanji: '一ページ', reading: 'いちページ', romaji: 'ichi pēji', shift: false },
        { num: 2, kanji: '二ページ', reading: 'にページ', romaji: 'ni pēji', shift: false },
        { num: 3, kanji: '三ページ', reading: 'さんページ', romaji: 'san pēji', shift: false },
        { num: 4, kanji: '四ページ', reading: 'よんページ', romaji: 'yon pēji', shift: false },
        { num: 5, kanji: '五ページ', reading: 'ごページ', romaji: 'go pēji', shift: false },
        { num: 6, kanji: '六ページ', reading: 'ろくページ', romaji: 'roku pēji', shift: false },
        { num: 7, kanji: '七ページ', reading: 'ななページ', romaji: 'nana pēji', shift: false },
        { num: 8, kanji: '八ページ', reading: 'はちページ', romaji: 'hachi pēji', shift: false },
        { num: 9, kanji: '九ページ', reading: 'きゅうページ', romaji: 'kyū pēji', shift: false },
        { num: 10, kanji: '十ページ', reading: 'じゅうページ', romaji: 'jū pēji', shift: false }
      ],
      specialCounts: [],
      examples: [
        { japanese: '教科書の三十ページを開いてください。', romaji: 'Kyōkasho no sanjuppēji o hiraite kudasai.', german: 'Bitte schlagen Sie Seite dreißig im Lehrbuch auf.' },
        { japanese: 'この本は二百ページあります。', romaji: 'Kono hon wa nihyaku pēji arimasu.', german: 'Dieses Buch hat zweihundert Seiten.' }
      ],
      notes: 'Lehnwort aus dem Englischen „page". Da es ein Katakana-Zählwort ist, gibt es keine Lautverschiebungen.'
    },
    {
      id: 'sho',
      kanji: '章',
      reading: 'しょう',
      romaji: 'shō',
      meaning: 'Kapitel',
      usage: 'Buchkapitel, Abschnitte',
      category: 'Sprache & Schrift',
      level: 'N2',
      questionWord: { kanji: '何章', reading: 'なんしょう', romaji: 'nanshō' },
      counts: [
        { num: 1, kanji: '一章', reading: 'いっしょう', romaji: 'isshō', shift: true },
        { num: 2, kanji: '二章', reading: 'にしょう', romaji: 'nishō', shift: false },
        { num: 3, kanji: '三章', reading: 'さんしょう', romaji: 'sanshō', shift: false },
        { num: 4, kanji: '四章', reading: 'よんしょう', romaji: 'yonshō', shift: false },
        { num: 5, kanji: '五章', reading: 'ごしょう', romaji: 'goshō', shift: false },
        { num: 6, kanji: '六章', reading: 'ろくしょう', romaji: 'rokushō', shift: false },
        { num: 7, kanji: '七章', reading: 'ななしょう', romaji: 'nanashō', shift: false },
        { num: 8, kanji: '八章', reading: 'はっしょう', romaji: 'hasshō', shift: true },
        { num: 9, kanji: '九章', reading: 'きゅうしょう', romaji: 'kyūshō', shift: false },
        { num: 10, kanji: '十章', reading: 'じゅっしょう', romaji: 'jusshō', shift: true }
      ],
      specialCounts: [],
      examples: [
        { japanese: '第三章を読み終わりました。', romaji: 'Daisanshō o yomiowarimashita.', german: 'Ich habe das dritte Kapitel fertig gelesen.' },
        { japanese: 'この小説は全部で十二章あります。', romaji: 'Kono shōsetsu wa zenbu de jūnishō arimasu.', german: 'Dieser Roman hat insgesamt zwölf Kapitel.' }
      ],
      notes: 'Wird oft mit dem Präfix 第 (だい) verwendet: 第一章, 第二章 usw.'
    },
    {
      id: 'kan-vol',
      kanji: '巻',
      reading: 'かん',
      romaji: 'kan',
      meaning: 'Bände',
      usage: 'Manga-Bände, Buchreihen, Filmserien',
      category: 'Sprache & Schrift',
      level: 'N2',
      questionWord: { kanji: '何巻', reading: 'なんかん', romaji: 'nankan' },
      counts: [
        { num: 1, kanji: '一巻', reading: 'いっかん', romaji: 'ikkan', shift: true },
        { num: 2, kanji: '二巻', reading: 'にかん', romaji: 'nikan', shift: false },
        { num: 3, kanji: '三巻', reading: 'さんかん', romaji: 'sankan', shift: false },
        { num: 4, kanji: '四巻', reading: 'よんかん', romaji: 'yonkan', shift: false },
        { num: 5, kanji: '五巻', reading: 'ごかん', romaji: 'gokan', shift: false },
        { num: 6, kanji: '六巻', reading: 'ろっかん', romaji: 'rokkan', shift: true },
        { num: 7, kanji: '七巻', reading: 'ななかん', romaji: 'nanakan', shift: false },
        { num: 8, kanji: '八巻', reading: 'はっかん', romaji: 'hakkan', shift: true },
        { num: 9, kanji: '九巻', reading: 'きゅうかん', romaji: 'kyūkan', shift: false },
        { num: 10, kanji: '十巻', reading: 'じゅっかん', romaji: 'jukkan', shift: true }
      ],
      specialCounts: [],
      examples: [
        { japanese: 'ワンピースの百巻を買いました。', romaji: 'Wan Pīsu no hyakkan o kaimashita.', german: 'Ich habe Band hundert von One Piece gekauft.' },
        { japanese: 'このシリーズは全部で二十巻あります。', romaji: 'Kono shirīzu wa zenbu de nijukkan arimasu.', german: 'Diese Reihe hat insgesamt zwanzig Bände.' }
      ],
      notes: 'Sehr gebräuchlich für Manga und Buchreihen. Gleiche Lesung und Lautverschiebungen wie der Zähler 缶 (かん, Dosen).'
    },
    {
      id: 'wa-ep',
      kanji: '話',
      reading: 'わ',
      romaji: 'wa',
      meaning: 'Episoden, Geschichten',
      usage: 'TV-Episoden, Anime-Folgen, Geschichten, Manga-Kapitel',
      category: 'Sprache & Schrift',
      level: 'N2',
      questionWord: { kanji: '何話', reading: 'なんわ', romaji: 'nanwa' },
      counts: [
        { num: 1, kanji: '一話', reading: 'いちわ', romaji: 'ichiwa', shift: false },
        { num: 2, kanji: '二話', reading: 'にわ', romaji: 'niwa', shift: false },
        { num: 3, kanji: '三話', reading: 'さんわ', romaji: 'sanwa', shift: false },
        { num: 4, kanji: '四話', reading: 'よんわ', romaji: 'yonwa', shift: false },
        { num: 5, kanji: '五話', reading: 'ごわ', romaji: 'gowa', shift: false },
        { num: 6, kanji: '六話', reading: 'ろくわ', romaji: 'rokuwa', shift: false },
        { num: 7, kanji: '七話', reading: 'ななわ', romaji: 'nanawa', shift: false },
        { num: 8, kanji: '八話', reading: 'はちわ', romaji: 'hachiwa', shift: false },
        { num: 9, kanji: '九話', reading: 'きゅうわ', romaji: 'kyūwa', shift: false },
        { num: 10, kanji: '十話', reading: 'じゅうわ', romaji: 'jūwa', shift: false }
      ],
      specialCounts: [],
      examples: [
        { japanese: 'アニメの第五話を見ました。', romaji: 'Anime no daigowa o mimashita.', german: 'Ich habe die fünfte Folge des Anime gesehen.' },
        { japanese: 'このドラマは全部で十二話あります。', romaji: 'Kono dorama wa zenbu de jūniwa arimasu.', german: 'Dieses Drama hat insgesamt zwölf Episoden.' }
      ],
      notes: 'Da わ mit w beginnt, gibt es keine Lautverschiebungen. Wird oft mit dem Präfix 第 (だい) verwendet: 第一話, 第二話 usw.'
    },

// ===== SPRACHE & SCHRIFT =====
    {
      id: 'mon',
      kanji: '問',
      reading: 'もん',
      romaji: 'mon',
      meaning: 'Fragen, Aufgaben',
      usage: 'Testfragen, Prüfungsaufgaben, Quizfragen',
      category: 'Sprache & Schrift',
      level: 'N3',
      questionWord: { kanji: '何問', reading: 'なんもん', romaji: 'nanmon' },
      counts: [
        { num: 1, kanji: '一問', reading: 'いちもん', romaji: 'ichimon', shift: false },
        { num: 2, kanji: '二問', reading: 'にもん', romaji: 'nimon', shift: false },
        { num: 3, kanji: '三問', reading: 'さんもん', romaji: 'sanmon', shift: false },
        { num: 4, kanji: '四問', reading: 'よんもん', romaji: 'yonmon', shift: false },
        { num: 5, kanji: '五問', reading: 'ごもん', romaji: 'gomon', shift: false },
        { num: 6, kanji: '六問', reading: 'ろくもん', romaji: 'rokumon', shift: false },
        { num: 7, kanji: '七問', reading: 'ななもん', romaji: 'nanamon', shift: false },
        { num: 8, kanji: '八問', reading: 'はちもん', romaji: 'hachimon', shift: false },
        { num: 9, kanji: '九問', reading: 'きゅうもん', romaji: 'kyūmon', shift: false },
        { num: 10, kanji: '十問', reading: 'じゅうもん', romaji: 'jūmon', shift: false }
      ],
      specialCounts: [],
      examples: [
        { japanese: 'テストは全部で十問あります。', romaji: 'Tesuto wa zenbu de jūmon arimasu.', german: 'Der Test hat insgesamt zehn Fragen.' },
        { japanese: '五問中三問正解でした。', romaji: 'Gomon chū sanmon seikai deshita.', german: 'Von fünf Fragen waren drei richtig.' }
      ],
      notes: 'Keine Lautverschiebungen. Wird für Fragen in Tests und Prüfungen verwendet. 何問 (なんもん) = „Wie viele Fragen?"'
    },
    {
      id: 'ka',
      kanji: '課',
      reading: 'か',
      romaji: 'ka',
      meaning: 'Lektionen',
      usage: 'Lektionen in Lehrbüchern, Kapitel in Sprachkursen',
      category: 'Sprache & Schrift',
      level: 'N4',
      questionWord: { kanji: '何課', reading: 'なんか', romaji: 'nanka' },
      counts: [
        { num: 1, kanji: '一課', reading: 'いっか', romaji: 'ikka', shift: true },
        { num: 2, kanji: '二課', reading: 'にか', romaji: 'nika', shift: false },
        { num: 3, kanji: '三課', reading: 'さんか', romaji: 'sanka', shift: false },
        { num: 4, kanji: '四課', reading: 'よんか', romaji: 'yonka', shift: false },
        { num: 5, kanji: '五課', reading: 'ごか', romaji: 'goka', shift: false },
        { num: 6, kanji: '六課', reading: 'ろっか', romaji: 'rokka', shift: true },
        { num: 7, kanji: '七課', reading: 'ななか', romaji: 'nanaka', shift: false },
        { num: 8, kanji: '八課', reading: 'はっか', romaji: 'hakka', shift: true },
        { num: 9, kanji: '九課', reading: 'きゅうか', romaji: 'kyūka', shift: false },
        { num: 10, kanji: '十課', reading: 'じゅっか', romaji: 'jukka', shift: true }
      ],
      specialCounts: [],
      examples: [
        { japanese: '今日は第三課を勉強します。', romaji: 'Kyō wa dai sanka o benkyō shimasu.', german: 'Heute lernen wir Lektion drei.' },
        { japanese: 'この教科書は二十課まであります。', romaji: 'Kono kyōkasho wa nijukka made arimasu.', german: 'Dieses Lehrbuch hat bis Lektion zwanzig.' }
      ],
      notes: 'Folgt dem k-Lautverschiebungsmuster: 1→いっか, 6→ろっか, 8→はっか, 10→じゅっか. Typisch für Japanisch-Lehrbücher wie „みんなの日本語" oder „Genki".'
    },

    // ===== GRUPPEN & MENGEN =====
    {
      id: 'kumi',
      kanji: '組',
      reading: 'くみ',
      romaji: 'kumi',
      meaning: 'Gruppen, Sets',
      usage: 'Gruppen, Paare, Sets, Schulklassen',
      category: 'Gruppen & Mengen',
      level: 'N3',
      questionWord: { kanji: '何組', reading: 'なんくみ', romaji: 'nankumi' },
      counts: [
        { num: 1, kanji: '一組', reading: 'ひとくみ', romaji: 'hitokumi', shift: true },
        { num: 2, kanji: '二組', reading: 'ふたくみ', romaji: 'futakumi', shift: true },
        { num: 3, kanji: '三組', reading: 'さんくみ', romaji: 'sankumi', shift: false },
        { num: 4, kanji: '四組', reading: 'よんくみ', romaji: 'yonkumi', shift: false },
        { num: 5, kanji: '五組', reading: 'ごくみ', romaji: 'gokumi', shift: false },
        { num: 6, kanji: '六組', reading: 'ろくくみ', romaji: 'rokukumi', shift: false },
        { num: 7, kanji: '七組', reading: 'ななくみ', romaji: 'nanakumi', shift: false },
        { num: 8, kanji: '八組', reading: 'はちくみ', romaji: 'hachikumi', shift: false },
        { num: 9, kanji: '九組', reading: 'きゅうくみ', romaji: 'kyūkumi', shift: false },
        { num: 10, kanji: '十組', reading: 'じゅうくみ', romaji: 'jūkumi', shift: false }
      ],
      specialCounts: [],
      examples: [
        { japanese: '箸を二組ください。', romaji: 'Hashi o futakumi kudasai.', german: 'Zwei Paar Essstäbchen, bitte.' },
        { japanese: '私は三年二組です。', romaji: 'Watashi wa sannen nikumi desu.', german: 'Ich bin in der Klasse 2 des dritten Jahrgangs.' }
      ],
      notes: '1 und 2 verwenden die Kun-Lesungen ひとくみ und ふたくみ. Ab 3 wird die On-Lesung verwendet. In Schulen bezeichnet 組 die Klasse (z.B. 一組 = Klasse 1).'
    },
    {
      id: 'taba',
      kanji: '束',
      reading: 'たば',
      romaji: 'taba',
      meaning: 'Bündel',
      usage: 'Blumensträuße, Papierstapel, Geldscheinbündel, Strohbündel',
      category: 'Gruppen & Mengen',
      level: 'N3',
      questionWord: { kanji: '何束', reading: 'なんたば', romaji: 'nantaba' },
      counts: [
        { num: 1, kanji: '一束', reading: 'ひとたば', romaji: 'hitotaba', shift: true },
        { num: 2, kanji: '二束', reading: 'ふたたば', romaji: 'futataba', shift: true },
        { num: 3, kanji: '三束', reading: 'さんたば', romaji: 'santaba', shift: false },
        { num: 4, kanji: '四束', reading: 'よんたば', romaji: 'yontaba', shift: false },
        { num: 5, kanji: '五束', reading: 'ごたば', romaji: 'gotaba', shift: false },
        { num: 6, kanji: '六束', reading: 'ろくたば', romaji: 'rokutaba', shift: false },
        { num: 7, kanji: '七束', reading: 'ななたば', romaji: 'nanataba', shift: false },
        { num: 8, kanji: '八束', reading: 'はちたば', romaji: 'hachitaba', shift: false },
        { num: 9, kanji: '九束', reading: 'きゅうたば', romaji: 'kyūtaba', shift: false },
        { num: 10, kanji: '十束', reading: 'じゅったば', romaji: 'juttaba', shift: true }
      ],
      specialCounts: [],
      examples: [
        { japanese: '花を一束買いました。', romaji: 'Hana o hitotaba kaimashita.', german: 'Ich habe ein Bündel Blumen gekauft.' },
        { japanese: '書類を三束にまとめてください。', romaji: 'Shorui o santaba ni matomete kudasai.', german: 'Bitte fassen Sie die Dokumente in drei Bündel zusammen.' }
      ],
      notes: '1 und 2 verwenden die Kun-Lesungen ひとたば und ふたたば. 一束 (ひとたば) Blumen ist ein sehr gebräuchlicher Ausdruck beim Blumenkauf.'
    },
    {
      id: 'fukuro',
      kanji: '袋',
      reading: 'ふくろ',
      romaji: 'fukuro',
      meaning: 'Tüten, Beutel',
      usage: 'Plastiktüten, Papiertüten, Beutel mit Lebensmitteln',
      category: 'Gruppen & Mengen',
      level: 'N3',
      questionWord: { kanji: '何袋', reading: 'なんふくろ', romaji: 'nanfukuro' },
      counts: [
        { num: 1, kanji: '一袋', reading: 'ひとふくろ', romaji: 'hitofukuro', shift: true },
        { num: 2, kanji: '二袋', reading: 'ふたふくろ', romaji: 'futafukuro', shift: true },
        { num: 3, kanji: '三袋', reading: 'さんふくろ', romaji: 'sanfukuro', shift: false },
        { num: 4, kanji: '四袋', reading: 'よんふくろ', romaji: 'yonfukuro', shift: false },
        { num: 5, kanji: '五袋', reading: 'ごふくろ', romaji: 'gofukuro', shift: false },
        { num: 6, kanji: '六袋', reading: 'ろくふくろ', romaji: 'rokufukuro', shift: false },
        { num: 7, kanji: '七袋', reading: 'ななふくろ', romaji: 'nanafukuro', shift: false },
        { num: 8, kanji: '八袋', reading: 'はちふくろ', romaji: 'hachifukuro', shift: false },
        { num: 9, kanji: '九袋', reading: 'きゅうふくろ', romaji: 'kyūfukuro', shift: false },
        { num: 10, kanji: '十袋', reading: 'じゅうふくろ', romaji: 'jūfukuro', shift: false }
      ],
      specialCounts: [],
      examples: [
        { japanese: 'お菓子を二袋買いました。', romaji: 'Okashi o futafukuro kaimashita.', german: 'Ich habe zwei Tüten Süßigkeiten gekauft.' },
        { japanese: 'レジ袋は一袋三円です。', romaji: 'Rejibukuro wa hitofukuro san-en desu.', german: 'Eine Plastiktüte an der Kasse kostet drei Yen.' }
      ],
      notes: '1 und 2 verwenden die Kun-Lesungen ひとふくろ und ふたふくろ. Als mehrsilbiger Kun-Zähler gibt es keine typischen Lautverschiebungen bei 3, 6, 8, 10.'
    },
    {
      id: 'hako',
      kanji: '箱',
      reading: 'はこ',
      romaji: 'hako',
      meaning: 'Schachteln, Kartons',
      usage: 'Kisten, Schachteln, Kartons mit Waren',
      category: 'Gruppen & Mengen',
      level: 'N3',
      questionWord: { kanji: '何箱', reading: 'なんはこ', romaji: 'nanhako' },
      counts: [
        { num: 1, kanji: '一箱', reading: 'ひとはこ', romaji: 'hitohako', shift: true },
        { num: 2, kanji: '二箱', reading: 'ふたはこ', romaji: 'futahako', shift: true },
        { num: 3, kanji: '三箱', reading: 'さんはこ', romaji: 'sanhako', shift: false },
        { num: 4, kanji: '四箱', reading: 'よんはこ', romaji: 'yonhako', shift: false },
        { num: 5, kanji: '五箱', reading: 'ごはこ', romaji: 'gohako', shift: false },
        { num: 6, kanji: '六箱', reading: 'ろくはこ', romaji: 'rokuhako', shift: false },
        { num: 7, kanji: '七箱', reading: 'ななはこ', romaji: 'nanahako', shift: false },
        { num: 8, kanji: '八箱', reading: 'はちはこ', romaji: 'hachihako', shift: false },
        { num: 9, kanji: '九箱', reading: 'きゅうはこ', romaji: 'kyūhako', shift: false },
        { num: 10, kanji: '十箱', reading: 'じゅうはこ', romaji: 'jūhako', shift: false }
      ],
      specialCounts: [],
      examples: [
        { japanese: 'みかんを一箱注文しました。', romaji: 'Mikan o hitohako chūmon shimashita.', german: 'Ich habe eine Kiste Mandarinen bestellt.' },
        { japanese: 'チョコレートを三箱もらいました。', romaji: 'Chokorēto o sanhako moraimashita.', german: 'Ich habe drei Schachteln Schokolade bekommen.' }
      ],
      notes: '1 und 2 verwenden die Kun-Lesungen ひとはこ und ふたはこ. Als mehrsilbiger Kun-Zähler gibt es keine typischen Lautverschiebungen.'
    },
    {
      id: 'retsu',
      kanji: '列',
      reading: 'れつ',
      romaji: 'retsu',
      meaning: 'Reihen',
      usage: 'Warteschlangen, Sitzreihen, Tabellenzeilen',
      category: 'Gruppen & Mengen',
      level: 'N2',
      questionWord: { kanji: '何列', reading: 'なんれつ', romaji: 'nanretsu' },
      counts: [
        { num: 1, kanji: '一列', reading: 'いちれつ', romaji: 'ichiretsu', shift: false },
        { num: 2, kanji: '二列', reading: 'にれつ', romaji: 'niretsu', shift: false },
        { num: 3, kanji: '三列', reading: 'さんれつ', romaji: 'sanretsu', shift: false },
        { num: 4, kanji: '四列', reading: 'よんれつ', romaji: 'yonretsu', shift: false },
        { num: 5, kanji: '五列', reading: 'ごれつ', romaji: 'goretsu', shift: false },
        { num: 6, kanji: '六列', reading: 'ろくれつ', romaji: 'rokuretsu', shift: false },
        { num: 7, kanji: '七列', reading: 'ななれつ', romaji: 'nanaretsu', shift: false },
        { num: 8, kanji: '八列', reading: 'はちれつ', romaji: 'hachiretsu', shift: false },
        { num: 9, kanji: '九列', reading: 'きゅうれつ', romaji: 'kyūretsu', shift: false },
        { num: 10, kanji: '十列', reading: 'じゅうれつ', romaji: 'jūretsu', shift: false }
      ],
      specialCounts: [],
      examples: [
        { japanese: '一列に並んでください。', romaji: 'Ichiretsu ni narande kudasai.', german: 'Bitte stellen Sie sich in einer Reihe auf.' },
        { japanese: '座席は三列目です。', romaji: 'Zaseki wa sanretsu-me desu.', german: 'Die Sitzplätze sind in der dritten Reihe.' }
      ],
      notes: 'Keine Lautverschiebungen. 一列 (いちれつ) = „eine Reihe" ist sehr häufig. 行列 (ぎょうれつ) = Warteschlange. 列目 (れつめ) wird für die Ordnungszahl verwendet: 三列目 = „dritte Reihe".'
    },
    {
      id: 'kakoku',
      kanji: 'ヶ国',
      reading: 'かこく',
      romaji: 'kakoku',
      meaning: 'Länder',
      usage: 'Anzahl von Ländern, Nationen',
      category: 'Gruppen & Mengen',
      level: 'N3',
      questionWord: { kanji: '何ヶ国', reading: 'なんかこく', romaji: 'nankakoku' },
      counts: [
        { num: 1, kanji: '一ヶ国', reading: 'いっかこく', romaji: 'ikkakoku', shift: true },
        { num: 2, kanji: '二ヶ国', reading: 'にかこく', romaji: 'nikakoku', shift: false },
        { num: 3, kanji: '三ヶ国', reading: 'さんかこく', romaji: 'sankakoku', shift: false },
        { num: 4, kanji: '四ヶ国', reading: 'よんかこく', romaji: 'yonkakoku', shift: false },
        { num: 5, kanji: '五ヶ国', reading: 'ごかこく', romaji: 'gokakoku', shift: false },
        { num: 6, kanji: '六ヶ国', reading: 'ろっかこく', romaji: 'rokkakoku', shift: true },
        { num: 7, kanji: '七ヶ国', reading: 'ななかこく', romaji: 'nanakakoku', shift: false },
        { num: 8, kanji: '八ヶ国', reading: 'はっかこく', romaji: 'hakkakoku', shift: true },
        { num: 9, kanji: '九ヶ国', reading: 'きゅうかこく', romaji: 'kyūkakoku', shift: false },
        { num: 10, kanji: '十ヶ国', reading: 'じゅっかこく', romaji: 'jukkakoku', shift: true }
      ],
      specialCounts: [],
      examples: [
        { japanese: '三ヶ国語を話せます。', romaji: 'Sankakokugo o hanasemasu.', german: 'Ich kann drei Sprachen sprechen.' },
        { japanese: 'ヨーロッパで五ヶ国を訪れました。', romaji: 'Yōroppa de gokakoku o otozuremashita.', german: 'Ich habe fünf Länder in Europa besucht.' }
      ],
      notes: 'Folgt dem k-Lautverschiebungsmuster: 1→いっかこく, 6→ろっかこく, 8→はっかこく, 10→じゅっかこく. ヶ国語 (かこくご) wird für die Anzahl der Sprachen verwendet.'
    },
    {
      id: 'shu-type',
      kanji: '種',
      reading: 'しゅ',
      romaji: 'shu',
      meaning: 'Arten, Sorten',
      usage: 'Arten, Typen, Sorten, Spezies',
      category: 'Gruppen & Mengen',
      level: 'N2',
      questionWord: { kanji: '何種', reading: 'なんしゅ', romaji: 'nanshu' },
      counts: [
        { num: 1, kanji: '一種', reading: 'いっしゅ', romaji: 'isshu', shift: true },
        { num: 2, kanji: '二種', reading: 'にしゅ', romaji: 'nishu', shift: false },
        { num: 3, kanji: '三種', reading: 'さんしゅ', romaji: 'sanshu', shift: false },
        { num: 4, kanji: '四種', reading: 'よんしゅ', romaji: 'yonshu', shift: false },
        { num: 5, kanji: '五種', reading: 'ごしゅ', romaji: 'goshu', shift: false },
        { num: 6, kanji: '六種', reading: 'ろくしゅ', romaji: 'rokushu', shift: false },
        { num: 7, kanji: '七種', reading: 'ななしゅ', romaji: 'nanashu', shift: false },
        { num: 8, kanji: '八種', reading: 'はっしゅ', romaji: 'hasshu', shift: true },
        { num: 9, kanji: '九種', reading: 'きゅうしゅ', romaji: 'kyūshu', shift: false },
        { num: 10, kanji: '十種', reading: 'じゅっしゅ', romaji: 'jusshu', shift: true }
      ],
      specialCounts: [],
      examples: [
        { japanese: 'このレストランには三種類のカレーがあります。', romaji: 'Kono resutoran ni wa sanshurui no karē ga arimasu.', german: 'Dieses Restaurant hat drei Sorten Curry.' },
        { japanese: '五種類の花を植えました。', romaji: 'Goshurui no hana o uemashita.', german: 'Ich habe fünf Arten von Blumen gepflanzt.' }
      ],
      notes: 'Folgt dem sh-Lautverschiebungsmuster: 1→いっしゅ, 8→はっしゅ, 10→じゅっしゅ. Meistens als 種類 (しゅるい) verwendet: 三種類 = „drei Arten/Sorten".'
    },

    // ===== EREIGNISSE =====
    {
      id: 'hatsu',
      kanji: '発',
      reading: 'はつ',
      romaji: 'hatsu',
      meaning: 'Schüsse, Abschüsse',
      usage: 'Schüsse, Kugeln, Feuerwerk, Raketen',
      category: 'Ereignisse',
      level: 'N2',
      questionWord: { kanji: '何発', reading: 'なんぱつ', romaji: 'nanpatsu' },
      counts: [
        { num: 1, kanji: '一発', reading: 'いっぱつ', romaji: 'ippatsu', shift: true },
        { num: 2, kanji: '二発', reading: 'にはつ', romaji: 'nihatsu', shift: false },
        { num: 3, kanji: '三発', reading: 'さんぱつ', romaji: 'sanpatsu', shift: true },
        { num: 4, kanji: '四発', reading: 'よんはつ', romaji: 'yonhatsu', shift: false },
        { num: 5, kanji: '五発', reading: 'ごはつ', romaji: 'gohatsu', shift: false },
        { num: 6, kanji: '六発', reading: 'ろっぱつ', romaji: 'roppatsu', shift: true },
        { num: 7, kanji: '七発', reading: 'ななはつ', romaji: 'nanahatsu', shift: false },
        { num: 8, kanji: '八発', reading: 'はっぱつ', romaji: 'happatsu', shift: true },
        { num: 9, kanji: '九発', reading: 'きゅうはつ', romaji: 'kyūhatsu', shift: false },
        { num: 10, kanji: '十発', reading: 'じゅっぱつ', romaji: 'juppatsu', shift: true }
      ],
      specialCounts: [],
      examples: [
        { japanese: '花火を五発打ち上げました。', romaji: 'Hanabi o gohatsu uchiage mashita.', german: 'Es wurden fünf Feuerwerkskörper abgefeuert.' },
        { japanese: '一発で当てました。', romaji: 'Ippatsu de atemashita.', german: 'Ich habe es beim ersten Schuss getroffen.' }
      ],
      notes: 'Folgt dem h-Lautverschiebungsmuster: 1→いっぱつ, 3→さんぱつ, 6→ろっぱつ, 8→はっぱつ, 10→じゅっぱつ. 一発 (いっぱつ) wird auch idiomatisch für „beim ersten Versuch" verwendet.'
    },
    {
      id: 'ho',
      kanji: '歩',
      reading: 'ほ',
      romaji: 'ho',
      meaning: 'Schritte',
      usage: 'Schritte beim Gehen, Schrittzähler',
      category: 'Ereignisse',
      level: 'N3',
      questionWord: { kanji: '何歩', reading: 'なんぽ', romaji: 'nanpo' },
      counts: [
        { num: 1, kanji: '一歩', reading: 'いっぽ', romaji: 'ippo', shift: true },
        { num: 2, kanji: '二歩', reading: 'にほ', romaji: 'niho', shift: false },
        { num: 3, kanji: '三歩', reading: 'さんぽ', romaji: 'sanpo', shift: true },
        { num: 4, kanji: '四歩', reading: 'よんほ', romaji: 'yonho', shift: false },
        { num: 5, kanji: '五歩', reading: 'ごほ', romaji: 'goho', shift: false },
        { num: 6, kanji: '六歩', reading: 'ろっぽ', romaji: 'roppo', shift: true },
        { num: 7, kanji: '七歩', reading: 'ななほ', romaji: 'nanaho', shift: false },
        { num: 8, kanji: '八歩', reading: 'はっぽ', romaji: 'happo', shift: true },
        { num: 9, kanji: '九歩', reading: 'きゅうほ', romaji: 'kyūho', shift: false },
        { num: 10, kanji: '十歩', reading: 'じゅっぽ', romaji: 'juppo', shift: true }
      ],
      specialCounts: [],
      examples: [
        { japanese: '毎日一万歩歩いています。', romaji: 'Mainichi ichiman-po aruite imasu.', german: 'Ich gehe jeden Tag zehntausend Schritte.' },
        { japanese: '散歩は「三歩」から来ています。', romaji: 'Sanpo wa "sanpo" kara kite imasu.', german: '„Sanpo" (Spaziergang) kommt von „drei Schritte".' }
      ],
      notes: 'Folgt dem h-Lautverschiebungsmuster. 散歩 (さんぽ) = „Spaziergang" enthält dasselbe 歩 und dieselbe Lautverschiebung! 一歩 (いっぽ) = „ein Schritt" wird auch metaphorisch für „ein Schritt vorwärts" verwendet.'
    },
    {
      id: 'sho-win',
      kanji: '勝',
      reading: 'しょう',
      romaji: 'shō',
      meaning: 'Siege',
      usage: 'Siege in Sportwettbewerben, Spielen, Turnieren',
      category: 'Ereignisse',
      level: 'N2',
      questionWord: { kanji: '何勝', reading: 'なんしょう', romaji: 'nanshō' },
      counts: [
        { num: 1, kanji: '一勝', reading: 'いっしょう', romaji: 'isshō', shift: true },
        { num: 2, kanji: '二勝', reading: 'にしょう', romaji: 'nishō', shift: false },
        { num: 3, kanji: '三勝', reading: 'さんしょう', romaji: 'sanshō', shift: false },
        { num: 4, kanji: '四勝', reading: 'よんしょう', romaji: 'yonshō', shift: false },
        { num: 5, kanji: '五勝', reading: 'ごしょう', romaji: 'goshō', shift: false },
        { num: 6, kanji: '六勝', reading: 'ろくしょう', romaji: 'rokushō', shift: false },
        { num: 7, kanji: '七勝', reading: 'ななしょう', romaji: 'nanashō', shift: false },
        { num: 8, kanji: '八勝', reading: 'はっしょう', romaji: 'hasshō', shift: true },
        { num: 9, kanji: '九勝', reading: 'きゅうしょう', romaji: 'kyūshō', shift: false },
        { num: 10, kanji: '十勝', reading: 'じゅっしょう', romaji: 'jusshō', shift: true }
      ],
      specialCounts: [],
      examples: [
        { japanese: '今シーズンは十勝五敗です。', romaji: 'Kon shīzun wa jusshō gohai desu.', german: 'Diese Saison steht es zehn Siege und fünf Niederlagen.' },
        { japanese: 'チームは三勝しました。', romaji: 'Chīmu wa sanshō shimashita.', german: 'Das Team hat drei Siege errungen.' }
      ],
      notes: 'Folgt dem sh-Lautverschiebungsmuster: 1→いっしょう, 8→はっしょう, 10→じゅっしょう. Oft zusammen mit 敗 (はい) verwendet: 三勝二敗 = 3 Siege, 2 Niederlagen.'
    },
    {
      id: 'hai-defeat',
      kanji: '敗',
      reading: 'はい',
      romaji: 'hai',
      meaning: 'Niederlagen',
      usage: 'Niederlagen in Sportwettbewerben, Spielen, Turnieren',
      category: 'Ereignisse',
      level: 'N2',
      questionWord: { kanji: '何敗', reading: 'なんぱい', romaji: 'nanpai' },
      counts: [
        { num: 1, kanji: '一敗', reading: 'いっぱい', romaji: 'ippai', shift: true },
        { num: 2, kanji: '二敗', reading: 'にはい', romaji: 'nihai', shift: false },
        { num: 3, kanji: '三敗', reading: 'さんぱい', romaji: 'sanpai', shift: true },
        { num: 4, kanji: '四敗', reading: 'よんはい', romaji: 'yonhai', shift: false },
        { num: 5, kanji: '五敗', reading: 'ごはい', romaji: 'gohai', shift: false },
        { num: 6, kanji: '六敗', reading: 'ろっぱい', romaji: 'roppai', shift: true },
        { num: 7, kanji: '七敗', reading: 'ななはい', romaji: 'nanahai', shift: false },
        { num: 8, kanji: '八敗', reading: 'はっぱい', romaji: 'happai', shift: true },
        { num: 9, kanji: '九敗', reading: 'きゅうはい', romaji: 'kyūhai', shift: false },
        { num: 10, kanji: '十敗', reading: 'じゅっぱい', romaji: 'juppai', shift: true }
      ],
      specialCounts: [],
      examples: [
        { japanese: '今シーズンはまだ一敗しかしていません。', romaji: 'Kon shīzun wa mada ippai shika shite imasen.', german: 'Diese Saison haben wir erst eine Niederlage.' },
        { japanese: '五勝三敗の成績です。', romaji: 'Goshō sanpai no seiseki desu.', german: 'Die Bilanz ist fünf Siege und drei Niederlagen.' }
      ],
      notes: 'Folgt dem h-Lautverschiebungsmuster wie 杯. Wird fast immer zusammen mit 勝 (しょう) verwendet, z.B. 十勝二敗 (じゅっしょうにはい). Achtung: 一敗 (いっぱい) klingt wie いっぱい (voll/viel)!'
    },
    {
      id: 'dan',
      kanji: '段',
      reading: 'だん',
      romaji: 'dan',
      meaning: 'Stufen, Ränge',
      usage: 'Treppenstufen, Regale, Kampfkunst-Ränge (Judo, Karate), Go-Ränge',
      category: 'Ereignisse',
      level: 'N3',
      questionWord: { kanji: '何段', reading: 'なんだん', romaji: 'nandan' },
      counts: [
        { num: 1, kanji: '一段', reading: 'いちだん', romaji: 'ichidan', shift: false },
        { num: 2, kanji: '二段', reading: 'にだん', romaji: 'nidan', shift: false },
        { num: 3, kanji: '三段', reading: 'さんだん', romaji: 'sandan', shift: false },
        { num: 4, kanji: '四段', reading: 'よんだん', romaji: 'yondan', shift: false },
        { num: 5, kanji: '五段', reading: 'ごだん', romaji: 'godan', shift: false },
        { num: 6, kanji: '六段', reading: 'ろくだん', romaji: 'rokudan', shift: false },
        { num: 7, kanji: '七段', reading: 'ななだん', romaji: 'nanadan', shift: false },
        { num: 8, kanji: '八段', reading: 'はちだん', romaji: 'hachidan', shift: false },
        { num: 9, kanji: '九段', reading: 'きゅうだん', romaji: 'kyūdan', shift: false },
        { num: 10, kanji: '十段', reading: 'じゅうだん', romaji: 'jūdan', shift: false }
      ],
      specialCounts: [],
      examples: [
        { japanese: '彼は柔道三段です。', romaji: 'Kare wa jūdō sandan desu.', german: 'Er hat den dritten Dan im Judo.' },
        { japanese: 'この階段は五十段あります。', romaji: 'Kono kaidan wa gojūdan arimasu.', german: 'Diese Treppe hat fünfzig Stufen.' }
      ],
      notes: 'Keine Lautverschiebungen. Wird in Kampfkünsten für Ränge verwendet (初段 = erster Dan). In der Grammatik: 一段動詞 (いちだんどうし) = ichidan-Verb, 五段動詞 (ごだんどうし) = godan-Verb.'
    },
    {
      id: 'shu',
      kanji: '周',
      reading: 'しゅう',
      romaji: 'shū',
      meaning: 'Runden, Umrundungen',
      usage: 'Runden auf der Rennstrecke, Umrundungen, Läufe um etwas',
      category: 'Ereignisse',
      level: 'N2',
      questionWord: { kanji: '何周', reading: 'なんしゅう', romaji: 'nanshū' },
      counts: [
        { num: 1, kanji: '一周', reading: 'いっしゅう', romaji: 'isshū', shift: true },
        { num: 2, kanji: '二周', reading: 'にしゅう', romaji: 'nishū', shift: false },
        { num: 3, kanji: '三周', reading: 'さんしゅう', romaji: 'sanshū', shift: false },
        { num: 4, kanji: '四周', reading: 'よんしゅう', romaji: 'yonshū', shift: false },
        { num: 5, kanji: '五周', reading: 'ごしゅう', romaji: 'goshū', shift: false },
        { num: 6, kanji: '六周', reading: 'ろくしゅう', romaji: 'rokushū', shift: false },
        { num: 7, kanji: '七周', reading: 'ななしゅう', romaji: 'nanashū', shift: false },
        { num: 8, kanji: '八周', reading: 'はっしゅう', romaji: 'hasshū', shift: true },
        { num: 9, kanji: '九周', reading: 'きゅうしゅう', romaji: 'kyūshū', shift: false },
        { num: 10, kanji: '十周', reading: 'じゅっしゅう', romaji: 'jusshū', shift: true }
      ],
      specialCounts: [],
      examples: [
        { japanese: '校庭を三周走りました。', romaji: 'Kōtei o sanshū hashirimashita.', german: 'Ich bin drei Runden um den Schulhof gelaufen.' },
        { japanese: '世界一周の旅に出ました。', romaji: 'Sekai isshū no tabi ni demashita.', german: 'Ich bin auf eine Weltreise gegangen.' }
      ],
      notes: 'Folgt dem sh-Lautverschiebungsmuster: 1→いっしゅう, 8→はっしゅう, 10→じゅっしゅう. 世界一周 (せかいいっしゅう) = „Weltumrundung" ist ein berühmter Ausdruck.'
    },
    {
      id: 'rui',
      kanji: '塁',
      reading: 'るい',
      romaji: 'rui',
      meaning: 'Bases (Baseball)',
      usage: 'Bases im Baseball',
      category: 'Ereignisse',
      level: 'N1',
      questionWord: { kanji: '何塁', reading: 'なんるい', romaji: 'nanrui' },
      counts: [
        { num: 1, kanji: '一塁', reading: 'いちるい', romaji: 'ichirui', shift: false },
        { num: 2, kanji: '二塁', reading: 'にるい', romaji: 'nirui', shift: false },
        { num: 3, kanji: '三塁', reading: 'さんるい', romaji: 'sanrui', shift: false },
        { num: 4, kanji: '四塁', reading: 'よんるい', romaji: 'yonrui', shift: false },
        { num: 5, kanji: '五塁', reading: 'ごるい', romaji: 'gorui', shift: false },
        { num: 6, kanji: '六塁', reading: 'ろくるい', romaji: 'rokurui', shift: false },
        { num: 7, kanji: '七塁', reading: 'ななるい', romaji: 'nanarui', shift: false },
        { num: 8, kanji: '八塁', reading: 'はちるい', romaji: 'hachirui', shift: false },
        { num: 9, kanji: '九塁', reading: 'きゅうるい', romaji: 'kyūrui', shift: false },
        { num: 10, kanji: '十塁', reading: 'じゅうるい', romaji: 'jūrui', shift: false }
      ],
      specialCounts: [],
      examples: [
        { japanese: 'ランナーは一塁にいます。', romaji: 'Rannā wa ichirui ni imasu.', german: 'Der Läufer ist auf der ersten Base.' },
        { japanese: '二塁打を打ちました。', romaji: 'Niruida o uchimashita.', german: 'Er hat einen Doppelschlag (Two-Base-Hit) geschlagen.' }
      ],
      notes: 'Keine Lautverschiebungen. Baseball ist in Japan sehr populär. 一塁 = erste Base, 二塁 = zweite Base, 三塁 = dritte Base. 本塁 (ほんるい) = Home Plate. 盗塁 (とうるい) = gestohlene Base.'
    },

    // ===== NATUR =====
    {
      id: 'rin',
      kanji: '輪',
      reading: 'りん',
      romaji: 'rin',
      meaning: 'Blumen, Räder',
      usage: 'Blumen (einzelne Blüten), Räder, Ringe',
      category: 'Natur',
      level: 'N2',
      questionWord: { kanji: '何輪', reading: 'なんりん', romaji: 'nanrin' },
      counts: [
        { num: 1, kanji: '一輪', reading: 'いちりん', romaji: 'ichirin', shift: false },
        { num: 2, kanji: '二輪', reading: 'にりん', romaji: 'nirin', shift: false },
        { num: 3, kanji: '三輪', reading: 'さんりん', romaji: 'sanrin', shift: false },
        { num: 4, kanji: '四輪', reading: 'よんりん', romaji: 'yonrin', shift: false },
        { num: 5, kanji: '五輪', reading: 'ごりん', romaji: 'gorin', shift: false },
        { num: 6, kanji: '六輪', reading: 'ろくりん', romaji: 'rokurin', shift: false },
        { num: 7, kanji: '七輪', reading: 'ななりん', romaji: 'nanarin', shift: false },
        { num: 8, kanji: '八輪', reading: 'はちりん', romaji: 'hachirin', shift: false },
        { num: 9, kanji: '九輪', reading: 'きゅうりん', romaji: 'kyūrin', shift: false },
        { num: 10, kanji: '十輪', reading: 'じゅうりん', romaji: 'jūrin', shift: false }
      ],
      specialCounts: [],
      examples: [
        { japanese: '庭に一輪のバラが咲いています。', romaji: 'Niwa ni ichirin no bara ga saite imasu.', german: 'Im Garten blüht eine einzelne Rose.' },
        { japanese: '五輪はオリンピックの別名です。', romaji: 'Gorin wa Orinpikku no betsumei desu.', german: '„Gorin" (fünf Ringe) ist ein anderer Name für die Olympischen Spiele.' }
      ],
      notes: 'Keine Lautverschiebungen. 一輪車 (いちりんしゃ) = Einrad, 二輪車 (にりんしゃ) = Motorrad, 四輪車 (よんりんしゃ) = Auto. 五輪 (ごりん) = die fünf olympischen Ringe = Olympische Spiele.'
    },
    {
      id: 'kabu',
      kanji: '株',
      reading: 'かぶ',
      romaji: 'kabu',
      meaning: 'Pflanzen, Sträucher',
      usage: 'Pflanzen, Sträucher, Büsche, Aktien (Finanzwelt)',
      category: 'Natur',
      level: 'N2',
      questionWord: { kanji: '何株', reading: 'なんかぶ', romaji: 'nankabu' },
      counts: [
        { num: 1, kanji: '一株', reading: 'ひとかぶ', romaji: 'hitokabu', shift: true },
        { num: 2, kanji: '二株', reading: 'ふたかぶ', romaji: 'futakabu', shift: true },
        { num: 3, kanji: '三株', reading: 'さんかぶ', romaji: 'sankabu', shift: false },
        { num: 4, kanji: '四株', reading: 'よんかぶ', romaji: 'yonkabu', shift: false },
        { num: 5, kanji: '五株', reading: 'ごかぶ', romaji: 'gokabu', shift: false },
        { num: 6, kanji: '六株', reading: 'ろくかぶ', romaji: 'rokukabu', shift: false },
        { num: 7, kanji: '七株', reading: 'ななかぶ', romaji: 'nanakabu', shift: false },
        { num: 8, kanji: '八株', reading: 'はちかぶ', romaji: 'hachikabu', shift: false },
        { num: 9, kanji: '九株', reading: 'きゅうかぶ', romaji: 'kyūkabu', shift: false },
        { num: 10, kanji: '十株', reading: 'じゅうかぶ', romaji: 'jūkabu', shift: false }
      ],
      specialCounts: [],
      examples: [
        { japanese: 'トマトの苗を三株植えました。', romaji: 'Tomato no nae o sankabu uemashita.', german: 'Ich habe drei Tomatenpflanzen eingepflanzt.' },
        { japanese: 'この会社の株を百株持っています。', romaji: 'Kono kaisha no kabu o hyakukabu motte imasu.', german: 'Ich besitze hundert Aktien dieser Firma.' }
      ],
      notes: '1 und 2 verwenden die Kun-Lesungen ひとかぶ und ふたかぶ. In der Finanzwelt bedeutet 株 auch „Aktie": 株価 (かぶか) = Aktienkurs, 株式 (かぶしき) = Aktien.'
    },

    // ===== MEDIZIN =====
    {
      id: 'jo-pill',
      kanji: '錠',
      reading: 'じょう',
      romaji: 'jō',
      meaning: 'Tabletten, Pillen',
      usage: 'Tabletten, Pillen, Kapseln, Medikamente',
      category: 'Medizin',
      level: 'N2',
      questionWord: { kanji: '何錠', reading: 'なんじょう', romaji: 'nanjō' },
      counts: [
        { num: 1, kanji: '一錠', reading: 'いちじょう', romaji: 'ichijō', shift: false },
        { num: 2, kanji: '二錠', reading: 'にじょう', romaji: 'nijō', shift: false },
        { num: 3, kanji: '三錠', reading: 'さんじょう', romaji: 'sanjō', shift: false },
        { num: 4, kanji: '四錠', reading: 'よんじょう', romaji: 'yonjō', shift: false },
        { num: 5, kanji: '五錠', reading: 'ごじょう', romaji: 'gojō', shift: false },
        { num: 6, kanji: '六錠', reading: 'ろくじょう', romaji: 'rokujō', shift: false },
        { num: 7, kanji: '七錠', reading: 'ななじょう', romaji: 'nanajō', shift: false },
        { num: 8, kanji: '八錠', reading: 'はちじょう', romaji: 'hachijō', shift: false },
        { num: 9, kanji: '九錠', reading: 'きゅうじょう', romaji: 'kyūjō', shift: false },
        { num: 10, kanji: '十錠', reading: 'じゅうじょう', romaji: 'jūjō', shift: false }
      ],
      specialCounts: [],
      examples: [
        { japanese: 'この薬は一回二錠飲んでください。', romaji: 'Kono kusuri wa ikkai nijō nonde kudasai.', german: 'Nehmen Sie dieses Medikament zwei Tabletten pro Einnahme.' },
        { japanese: '頭痛薬を一錠もらえますか。', romaji: 'Zutsūyaku o ichijō moraemasu ka.', german: 'Kann ich eine Kopfschmerztablette bekommen?' }
      ],
      notes: 'Keine Lautverschiebungen. Häufig in Apotheken und beim Arzt: 一日三回、一回二錠 = „dreimal täglich, zwei Tabletten pro Einnahme".'
    },
    {
      id: 'teki',
      kanji: '滴',
      reading: 'てき',
      romaji: 'teki',
      meaning: 'Tropfen',
      usage: 'Augentropfen, Medizintropfen, Flüssigkeitstropfen',
      category: 'Medizin',
      level: 'N1',
      questionWord: { kanji: '何滴', reading: 'なんてき', romaji: 'nanteki' },
      counts: [
        { num: 1, kanji: '一滴', reading: 'いってき', romaji: 'itteki', shift: true },
        { num: 2, kanji: '二滴', reading: 'にてき', romaji: 'niteki', shift: false },
        { num: 3, kanji: '三滴', reading: 'さんてき', romaji: 'santeki', shift: false },
        { num: 4, kanji: '四滴', reading: 'よんてき', romaji: 'yonteki', shift: false },
        { num: 5, kanji: '五滴', reading: 'ごてき', romaji: 'goteki', shift: false },
        { num: 6, kanji: '六滴', reading: 'ろくてき', romaji: 'rokuteki', shift: false },
        { num: 7, kanji: '七滴', reading: 'ななてき', romaji: 'nanateki', shift: false },
        { num: 8, kanji: '八滴', reading: 'はってき', romaji: 'hatteki', shift: true },
        { num: 9, kanji: '九滴', reading: 'きゅうてき', romaji: 'kyūteki', shift: false },
        { num: 10, kanji: '十滴', reading: 'じゅってき', romaji: 'jutteki', shift: true }
      ],
      specialCounts: [],
      examples: [
        { japanese: '目薬を両目に二滴ずつさしてください。', romaji: 'Megusuri o ryōme ni niteki zutsu sashite kudasai.', german: 'Geben Sie jeweils zwei Tropfen Augentropfen in beide Augen.' },
        { japanese: '水を一滴も残さず飲みました。', romaji: 'Mizu o itteki mo nokosazu nomimashita.', german: 'Ich habe das Wasser bis auf den letzten Tropfen getrunken.' }
      ],
      notes: 'Folgt dem t-Lautverschiebungsmuster: 1→いってき, 8→はってき, 10→じゅってき. 一滴 (いってき) wird auch poetisch verwendet: 一滴も〜ない = „nicht ein einziger Tropfen".'
    },

    // ===== ZEIT =====
    {
      id: 'ko-lesson',
      kanji: 'コマ',
      reading: 'こま',
      romaji: 'koma',
      meaning: 'Unterrichtsstunden',
      usage: 'Unterrichtsstunden, Vorlesungen, Manga-Panels',
      category: 'Zeit',
      level: 'N3',
      questionWord: { kanji: '何コマ', reading: 'なんこま', romaji: 'nankoma' },
      counts: [
        { num: 1, kanji: '一コマ', reading: 'ひとこま', romaji: 'hitokoma', shift: true },
        { num: 2, kanji: '二コマ', reading: 'ふたこま', romaji: 'futakoma', shift: true },
        { num: 3, kanji: '三コマ', reading: 'さんこま', romaji: 'sankoma', shift: false },
        { num: 4, kanji: '四コマ', reading: 'よんこま', romaji: 'yonkoma', shift: false },
        { num: 5, kanji: '五コマ', reading: 'ごこま', romaji: 'gokoma', shift: false },
        { num: 6, kanji: '六コマ', reading: 'ろくこま', romaji: 'rokukoma', shift: false },
        { num: 7, kanji: '七コマ', reading: 'ななこま', romaji: 'nanakoma', shift: false },
        { num: 8, kanji: '八コマ', reading: 'はちこま', romaji: 'hachikoma', shift: false },
        { num: 9, kanji: '九コマ', reading: 'きゅうこま', romaji: 'kyūkoma', shift: false },
        { num: 10, kanji: '十コマ', reading: 'じゅうこま', romaji: 'jūkoma', shift: false }
      ],
      specialCounts: [],
      examples: [
        { japanese: '今日は授業が三コマあります。', romaji: 'Kyō wa jugyō ga sankoma arimasu.', german: 'Heute habe ich drei Unterrichtsstunden.' },
        { japanese: '四コマ漫画が好きです。', romaji: 'Yonkoma manga ga suki desu.', german: 'Ich mag Vier-Panel-Comics.' }
      ],
      notes: '1 und 2 verwenden die Kun-Lesungen ひとこま und ふたこま. 四コマ漫画 (よんこままんが) = Vier-Panel-Manga ist ein beliebtes Format in Japan. An Universitäten wird die Stundenplaneinheit als コマ gezählt.'
    },
    {
      id: 'byou',
      kanji: '秒',
      reading: 'びょう',
      romaji: 'byō',
      meaning: 'Sekunden',
      usage: 'Sekunden (Zeiteinheit), Stoppuhr, Countdowns',
      category: 'Zeit',
      level: 'N5',
      questionWord: { kanji: '何秒', reading: 'なんびょう', romaji: 'nanbyō' },
      counts: [
        { num: 1, kanji: '一秒', reading: 'いちびょう', romaji: 'ichibyō', shift: false },
        { num: 2, kanji: '二秒', reading: 'にびょう', romaji: 'nibyō', shift: false },
        { num: 3, kanji: '三秒', reading: 'さんびょう', romaji: 'sanbyō', shift: false },
        { num: 4, kanji: '四秒', reading: 'よんびょう', romaji: 'yonbyō', shift: false },
        { num: 5, kanji: '五秒', reading: 'ごびょう', romaji: 'gobyō', shift: false },
        { num: 6, kanji: '六秒', reading: 'ろくびょう', romaji: 'rokubyō', shift: false },
        { num: 7, kanji: '七秒', reading: 'ななびょう', romaji: 'nanabyō', shift: false },
        { num: 8, kanji: '八秒', reading: 'はちびょう', romaji: 'hachibyō', shift: false },
        { num: 9, kanji: '九秒', reading: 'きゅうびょう', romaji: 'kyūbyō', shift: false },
        { num: 10, kanji: '十秒', reading: 'じゅうびょう', romaji: 'jūbyō', shift: false }
      ],
      specialCounts: [],
      examples: [
        { japanese: '百メートルを十秒で走りました。', romaji: 'Hyaku mētoru o jūbyō de hashirimashita.', german: 'Ich bin hundert Meter in zehn Sekunden gelaufen.' },
        { japanese: 'あと三秒で始まります。', romaji: 'Ato sanbyō de hajimarimasu.', german: 'Es beginnt in drei Sekunden.' }
      ],
      notes: 'Keine Lautverschiebungen. Die Grundlesung びょう bleibt unverändert. Zeitangaben: 分 (ふん) = Minuten, 秒 (びょう) = Sekunden. 三分二十秒 = 3 Minuten und 20 Sekunden.'
    },

    // ===== ESSEN & TRINKEN =====
    {
      id: 'ninmae',
      kanji: '人前',
      reading: 'にんまえ',
      romaji: 'ninmae',
      meaning: 'Portionen',
      usage: 'Portionen für eine bestimmte Anzahl von Personen (beim Kochen, im Restaurant)',
      category: 'Essen & Trinken',
      level: 'N3',
      questionWord: { kanji: '何人前', reading: 'なんにんまえ', romaji: 'nanninmae' },
      counts: [
        { num: 1, kanji: '一人前', reading: 'いちにんまえ', romaji: 'ichininmae', shift: false },
        { num: 2, kanji: '二人前', reading: 'ににんまえ', romaji: 'nininmae', shift: false },
        { num: 3, kanji: '三人前', reading: 'さんにんまえ', romaji: 'sanninmae', shift: false },
        { num: 4, kanji: '四人前', reading: 'よにんまえ', romaji: 'yoninmae', shift: false },
        { num: 5, kanji: '五人前', reading: 'ごにんまえ', romaji: 'goninmae', shift: false },
        { num: 6, kanji: '六人前', reading: 'ろくにんまえ', romaji: 'rokuninmae', shift: false },
        { num: 7, kanji: '七人前', reading: 'ななにんまえ', romaji: 'nananinmae', shift: false },
        { num: 8, kanji: '八人前', reading: 'はちにんまえ', romaji: 'hachininmae', shift: false },
        { num: 9, kanji: '九人前', reading: 'きゅうにんまえ', romaji: 'kyūninmae', shift: false },
        { num: 10, kanji: '十人前', reading: 'じゅうにんまえ', romaji: 'jūninmae', shift: false }
      ],
      specialCounts: [],
      examples: [
        { japanese: '餃子を二人前注文しました。', romaji: 'Gyōza o nininmae chūmon shimashita.', german: 'Ich habe zwei Portionen Gyoza bestellt.' },
        { japanese: 'このレシピは四人前です。', romaji: 'Kono reshipi wa yoninmae desu.', german: 'Dieses Rezept ist für vier Portionen.' }
      ],
      notes: 'Keine Lautverschiebungen. 一人前 (いちにんまえ) hat auch die übertragene Bedeutung „vollwertig/erwachsen": 一人前の大人 = ein vollwertiger Erwachsener. Im Restaurant sehr gebräuchlich.'
    },
    {
      id: 'saji',
      kanji: 'さじ',
      reading: 'さじ',
      romaji: 'saji',
      meaning: 'Löffel (Maßeinheit)',
      usage: 'Löffel als Kochmaßeinheit (大さじ = Esslöffel, 小さじ = Teelöffel)',
      category: 'Essen & Trinken',
      level: 'N3',
      questionWord: { kanji: '何さじ', reading: 'なんさじ', romaji: 'nansaji' },
      counts: [
        { num: 1, kanji: '一さじ', reading: 'ひとさじ', romaji: 'hitosaji', shift: true },
        { num: 2, kanji: '二さじ', reading: 'ふたさじ', romaji: 'futasaji', shift: true },
        { num: 3, kanji: '三さじ', reading: 'さんさじ', romaji: 'sansaji', shift: false },
        { num: 4, kanji: '四さじ', reading: 'よんさじ', romaji: 'yonsaji', shift: false },
        { num: 5, kanji: '五さじ', reading: 'ごさじ', romaji: 'gosaji', shift: false },
        { num: 6, kanji: '六さじ', reading: 'ろくさじ', romaji: 'rokusaji', shift: false },
        { num: 7, kanji: '七さじ', reading: 'ななさじ', romaji: 'nanasaji', shift: false },
        { num: 8, kanji: '八さじ', reading: 'はちさじ', romaji: 'hachisaji', shift: false },
        { num: 9, kanji: '九さじ', reading: 'きゅうさじ', romaji: 'kyūsaji', shift: false },
        { num: 10, kanji: '十さじ', reading: 'じゅうさじ', romaji: 'jūsaji', shift: false }
      ],
      specialCounts: [],
      examples: [
        { japanese: '大さじ二杯の醤油を入れてください。', romaji: 'Ōsaji nihai no shōyu o irete kudasai.', german: 'Geben Sie zwei Esslöffel Sojasoße hinzu.' },
        { japanese: '砂糖を小さじ一杯加えます。', romaji: 'Satō o kosaji ippai kuwaemasu.', german: 'Fügen Sie einen Teelöffel Zucker hinzu.' }
      ],
      notes: '1 und 2 verwenden die Kun-Lesungen ひとさじ und ふたさじ. 大さじ (おおさじ) = Esslöffel (15ml), 小さじ (こさじ) = Teelöffel (5ml). „さじを投げる" (saji o nageru) = „den Löffel werfen" = aufgeben.'
    },

    // ===== MENSCHEN (Fortsetzung) =====
    {
      id: 'setai',
      kanji: '世帯',
      reading: 'せたい',
      romaji: 'setai',
      meaning: 'Haushalte',
      usage: 'Haushalte, Familienhaushalte (Statistik, Verwaltung)',
      category: 'Menschen',
      level: 'N2',
      questionWord: { kanji: '何世帯', reading: 'なんせたい', romaji: 'nansetai' },
      counts: [
        { num: 1, kanji: '一世帯', reading: 'いっせたい', romaji: 'issetai', shift: true },
        { num: 2, kanji: '二世帯', reading: 'にせたい', romaji: 'nisetai', shift: false },
        { num: 3, kanji: '三世帯', reading: 'さんせたい', romaji: 'sansetai', shift: false },
        { num: 4, kanji: '四世帯', reading: 'よんせたい', romaji: 'yonsetai', shift: false },
        { num: 5, kanji: '五世帯', reading: 'ごせたい', romaji: 'gosetai', shift: false },
        { num: 6, kanji: '六世帯', reading: 'ろくせたい', romaji: 'rokusetai', shift: false },
        { num: 7, kanji: '七世帯', reading: 'ななせたい', romaji: 'nanasetai', shift: false },
        { num: 8, kanji: '八世帯', reading: 'はっせたい', romaji: 'hassetai', shift: true },
        { num: 9, kanji: '九世帯', reading: 'きゅうせたい', romaji: 'kyūsetai', shift: false },
        { num: 10, kanji: '十世帯', reading: 'じゅっせたい', romaji: 'jussetai', shift: true }
      ],
      specialCounts: [],
      examples: [
        { japanese: 'このマンションには五十世帯が住んでいます。', romaji: 'Kono manshon ni wa gojūsetai ga sunde imasu.', german: 'In diesem Wohnblock wohnen fünfzig Haushalte.' },
        { japanese: '二世帯住宅に住んでいます。', romaji: 'Nisetai jūtaku ni sunde imasu.', german: 'Wir wohnen in einem Zweifamilienhaus.' }
      ],
      notes: 'Folgt dem s-Lautverschiebungsmuster: 1→いっせたい, 8→はっせたい, 10→じゅっせたい. 二世帯住宅 (にせたいじゅうたく) = Zweifamilienhaus ist ein häufiger Ausdruck in Japan.'
    },

    // ===== NEUE EINTRÄGE =====

    // ===== TRANSPORT (Fortsetzung) =====
    {
      id: 'seki-ship',
      kanji: '隻',
      reading: 'せき',
      romaji: 'seki',
      meaning: 'Schiffe, Boote',
      usage: 'Schiffe, Boote, Kriegsschiffe',
      category: 'Transport',
      level: 'N2',
      questionWord: { kanji: '何隻', reading: 'なんせき', romaji: 'nanseki' },
      counts: [
        { num: 1, kanji: '一隻', reading: 'いっせき', romaji: 'isseki', shift: true },
        { num: 2, kanji: '二隻', reading: 'にせき', romaji: 'niseki', shift: false },
        { num: 3, kanji: '三隻', reading: 'さんせき', romaji: 'sanseki', shift: false },
        { num: 4, kanji: '四隻', reading: 'よんせき', romaji: 'yonseki', shift: false },
        { num: 5, kanji: '五隻', reading: 'ごせき', romaji: 'goseki', shift: false },
        { num: 6, kanji: '六隻', reading: 'ろくせき', romaji: 'rokuseki', shift: false },
        { num: 7, kanji: '七隻', reading: 'ななせき', romaji: 'nanaseki', shift: false },
        { num: 8, kanji: '八隻', reading: 'はっせき', romaji: 'hasseki', shift: true },
        { num: 9, kanji: '九隻', reading: 'きゅうせき', romaji: 'kyūseki', shift: false },
        { num: 10, kanji: '十隻', reading: 'じゅっせき', romaji: 'jusseki', shift: true }
      ],
      specialCounts: [],
      examples: [
        { japanese: '港に船が三隻停まっています。', romaji: 'Minato ni fune ga sanseki tomatte imasu.', german: 'Im Hafen liegen drei Schiffe.' },
        { japanese: '一隻の漁船が出港しました。', romaji: 'Isseki no gyosen ga shukkō shimashita.', german: 'Ein Fischerboot hat den Hafen verlassen.' }
      ],
      notes: 'Wird für größere Schiffe und Boote verwendet. Für kleine Boote kann auch 艘 (そう) verwendet werden.'
    },
    {
      id: 'ki-plane',
      kanji: '機',
      reading: 'き',
      romaji: 'ki',
      meaning: 'Flugzeuge',
      usage: 'Flugzeuge, Kampfflugzeuge, Hubschrauber',
      category: 'Transport',
      level: 'N2',
      questionWord: { kanji: '何機', reading: 'なんき', romaji: 'nanki' },
      counts: [
        { num: 1, kanji: '一機', reading: 'いっき', romaji: 'ikki', shift: true },
        { num: 2, kanji: '二機', reading: 'にき', romaji: 'niki', shift: false },
        { num: 3, kanji: '三機', reading: 'さんき', romaji: 'sanki', shift: false },
        { num: 4, kanji: '四機', reading: 'よんき', romaji: 'yonki', shift: false },
        { num: 5, kanji: '五機', reading: 'ごき', romaji: 'goki', shift: false },
        { num: 6, kanji: '六機', reading: 'ろっき', romaji: 'rokki', shift: true },
        { num: 7, kanji: '七機', reading: 'ななき', romaji: 'nanaki', shift: false },
        { num: 8, kanji: '八機', reading: 'はっき', romaji: 'hakki', shift: true },
        { num: 9, kanji: '九機', reading: 'きゅうき', romaji: 'kyūki', shift: false },
        { num: 10, kanji: '十機', reading: 'じゅっき', romaji: 'jukki', shift: true }
      ],
      specialCounts: [],
      examples: [
        { japanese: '空港に飛行機が五機駐機しています。', romaji: 'Kūkō ni hikōki ga goki chūki shite imasu.', german: 'Am Flughafen stehen fünf Flugzeuge.' },
        { japanese: 'ヘリコプターが二機飛んでいます。', romaji: 'Herikoptā ga niki tonde imasu.', german: 'Zwei Hubschrauber fliegen.' }
      ],
      notes: 'Wird für Flugzeuge und Hubschrauber verwendet. Lautverschiebungen bei 1, 6, 8, 10.'
    },

    // ===== OBJEKTE (Fortsetzung) =====
    {
      id: 'ko-time',
      kanji: '時間',
      reading: 'じかん',
      romaji: 'jikan',
      meaning: 'Stunden (Dauer)',
      usage: 'Zeitdauer in Stunden',
      category: 'Zeit',
      level: 'N5',
      questionWord: { kanji: '何時間', reading: 'なんじかん', romaji: 'nanjikan' },
      counts: [
        { num: 1, kanji: '一時間', reading: 'いちじかん', romaji: 'ichijikan', shift: false },
        { num: 2, kanji: '二時間', reading: 'にじかん', romaji: 'nijikan', shift: false },
        { num: 3, kanji: '三時間', reading: 'さんじかん', romaji: 'sanjikan', shift: false },
        { num: 4, kanji: '四時間', reading: 'よじかん', romaji: 'yojikan', shift: true },
        { num: 5, kanji: '五時間', reading: 'ごじかん', romaji: 'gojikan', shift: false },
        { num: 6, kanji: '六時間', reading: 'ろくじかん', romaji: 'rokujikan', shift: false },
        { num: 7, kanji: '七時間', reading: 'しちじかん / ななじかん', romaji: 'shichijikan / nanajikan', shift: false },
        { num: 8, kanji: '八時間', reading: 'はちじかん', romaji: 'hachijikan', shift: false },
        { num: 9, kanji: '九時間', reading: 'くじかん', romaji: 'kujikan', shift: true },
        { num: 10, kanji: '十時間', reading: 'じゅうじかん', romaji: 'jūjikan', shift: false }
      ],
      specialCounts: [
        { num: 24, kanji: '二十四時間', reading: 'にじゅうよじかん', romaji: 'nijūyojikan', note: '24 Stunden = ein ganzer Tag' }
      ],
      examples: [
        { japanese: '毎日八時間寝ています。', romaji: 'Mainichi hachijikan nete imasu.', german: 'Ich schlafe jeden Tag acht Stunden.' },
        { japanese: '東京から大阪まで二時間半かかります。', romaji: 'Tōkyō kara Ōsaka made nijikan han kakarimasu.', german: 'Von Tokyo nach Osaka dauert es zweieinhalb Stunden.' }
      ],
      notes: '4時間 = よじかん (nicht よんじかん), 9時間 = くじかん (nicht きゅうじかん). Gleiche Ausnahmen wie bei der Uhrzeit (時).'
    },
    {
      id: 'gatsu',
      kanji: '月',
      reading: 'がつ',
      romaji: 'gatsu',
      meaning: 'Monate (Monatsnamen)',
      usage: 'Monatsnamen (Januar bis Dezember)',
      category: 'Zeit',
      level: 'N5',
      questionWord: { kanji: '何月', reading: 'なんがつ', romaji: 'nangatsu' },
      counts: [
        { num: 1, kanji: '一月', reading: 'いちがつ', romaji: 'ichigatsu', shift: false },
        { num: 2, kanji: '二月', reading: 'にがつ', romaji: 'nigatsu', shift: false },
        { num: 3, kanji: '三月', reading: 'さんがつ', romaji: 'sangatsu', shift: false },
        { num: 4, kanji: '四月', reading: 'しがつ', romaji: 'shigatsu', shift: true },
        { num: 5, kanji: '五月', reading: 'ごがつ', romaji: 'gogatsu', shift: false },
        { num: 6, kanji: '六月', reading: 'ろくがつ', romaji: 'rokugatsu', shift: false },
        { num: 7, kanji: '七月', reading: 'しちがつ', romaji: 'shichigatsu', shift: true },
        { num: 8, kanji: '八月', reading: 'はちがつ', romaji: 'hachigatsu', shift: false },
        { num: 9, kanji: '九月', reading: 'くがつ', romaji: 'kugatsu', shift: true },
        { num: 10, kanji: '十月', reading: 'じゅうがつ', romaji: 'jūgatsu', shift: false }
      ],
      specialCounts: [
        { num: 11, kanji: '十一月', reading: 'じゅういちがつ', romaji: 'jūichigatsu', note: 'November' },
        { num: 12, kanji: '十二月', reading: 'じゅうにがつ', romaji: 'jūnigatsu', note: 'Dezember' }
      ],
      examples: [
        { japanese: '桜は三月か四月に咲きます。', romaji: 'Sakura wa sangatsu ka shigatsu ni sakimasu.', german: 'Kirschblüten blühen im März oder April.' },
        { japanese: '日本では四月が新学期です。', romaji: 'Nihon de wa shigatsu ga shingakki desu.', german: 'In Japan beginnt das neue Schuljahr im April.' }
      ],
      notes: '4月 = しがつ (nicht よんがつ), 7月 = しちがつ (nicht なながつ), 9月 = くがつ (nicht きゅうがつ). Nicht verwechseln mit ヶ月 (かげつ) = Dauer in Monaten!'
    },

    // ===== SPRACHE & SCHRIFT (Fortsetzung) =====
    {
      id: 'ku-verse',
      kanji: '句',
      reading: 'く',
      romaji: 'ku',
      meaning: 'Verse, Phrasen',
      usage: 'Haiku, Senryū, Redewendungen, Phrasen',
      category: 'Sprache & Schrift',
      level: 'N2',
      questionWord: { kanji: '何句', reading: 'なんく', romaji: 'nanku' },
      counts: [
        { num: 1, kanji: '一句', reading: 'いっく', romaji: 'ikku', shift: true },
        { num: 2, kanji: '二句', reading: 'にく', romaji: 'niku', shift: false },
        { num: 3, kanji: '三句', reading: 'さんく', romaji: 'sanku', shift: false },
        { num: 4, kanji: '四句', reading: 'よんく', romaji: 'yonku', shift: false },
        { num: 5, kanji: '五句', reading: 'ごく', romaji: 'goku', shift: false },
        { num: 6, kanji: '六句', reading: 'ろっく', romaji: 'rokku', shift: true },
        { num: 7, kanji: '七句', reading: 'ななく', romaji: 'nanaku', shift: false },
        { num: 8, kanji: '八句', reading: 'はっく', romaji: 'hakku', shift: true },
        { num: 9, kanji: '九句', reading: 'きゅうく', romaji: 'kyūku', shift: false },
        { num: 10, kanji: '十句', reading: 'じゅっく', romaji: 'jukku', shift: true }
      ],
      specialCounts: [],
      examples: [
        { japanese: '松尾芭蕉の俳句を三句暗記しました。', romaji: 'Matsuo Bashō no haiku o sanku anki shimashita.', german: 'Ich habe drei Haiku von Matsuo Bashō auswendig gelernt.' },
        { japanese: '一句詠んでみてください。', romaji: 'Ikku yonde mite kudasai.', german: 'Versuchen Sie, einen Vers zu dichten.' }
      ],
      notes: '俳句 (はいく) = Haiku enthält das Kanji 句. Wird für japanische Kurzgedichte und Redewendungen verwendet.'
    },
    // ===== NATUR (Fortsetzung) =====
    // ===== EREIGNISSE (Fortsetzung) =====
    {
      id: 'kyoku-game',
      kanji: '局',
      reading: 'きょく',
      romaji: 'kyoku',
      meaning: 'Spielpartien',
      usage: 'Partien (Shōgi, Go, Schach)',
      category: 'Ereignisse',
      level: 'N2',
      questionWord: { kanji: '何局', reading: 'なんきょく', romaji: 'nankyoku' },
      counts: [
        { num: 1, kanji: '一局', reading: 'いっきょく', romaji: 'ikkyoku', shift: true },
        { num: 2, kanji: '二局', reading: 'にきょく', romaji: 'nikyoku', shift: false },
        { num: 3, kanji: '三局', reading: 'さんきょく', romaji: 'sankyoku', shift: false },
        { num: 4, kanji: '四局', reading: 'よんきょく', romaji: 'yonkyoku', shift: false },
        { num: 5, kanji: '五局', reading: 'ごきょく', romaji: 'gokyoku', shift: false },
        { num: 6, kanji: '六局', reading: 'ろっきょく', romaji: 'rokkyoku', shift: true },
        { num: 7, kanji: '七局', reading: 'ななきょく', romaji: 'nanakyoku', shift: false },
        { num: 8, kanji: '八局', reading: 'はっきょく', romaji: 'hakkyoku', shift: true },
        { num: 9, kanji: '九局', reading: 'きゅうきょく', romaji: 'kyūkyoku', shift: false },
        { num: 10, kanji: '十局', reading: 'じゅっきょく', romaji: 'jukkyoku', shift: true }
      ],
      specialCounts: [],
      examples: [
        { japanese: '将棋を三局指しました。', romaji: 'Shōgi o sankyoku sashimashita.', german: 'Ich habe drei Partien Shōgi gespielt.' },
        { japanese: '七番勝負の第五局です。', romaji: 'Nanaban shōbu no daigokyoku desu.', german: 'Es ist die fünfte Partie eines Sieben-Spiele-Matches.' }
      ],
      notes: 'Wird hauptsächlich für Brettspiele wie Shōgi und Go verwendet. 局 bedeutet auch „Amt/Büro" (郵便局 = Postamt).'
    },
    {
      id: 'ten-trial',
      kanji: '戦',
      reading: 'せん',
      romaji: 'sen',
      meaning: 'Wettkämpfe, Spiele',
      usage: 'Sportspiele, Wettkämpfe, Matches',
      category: 'Ereignisse',
      level: 'N3',
      questionWord: { kanji: '何戦', reading: 'なんせん', romaji: 'nansen' },
      counts: [
        { num: 1, kanji: '一戦', reading: 'いっせん', romaji: 'issen', shift: true },
        { num: 2, kanji: '二戦', reading: 'にせん', romaji: 'nisen', shift: false },
        { num: 3, kanji: '三戦', reading: 'さんせん', romaji: 'sansen', shift: false },
        { num: 4, kanji: '四戦', reading: 'よんせん', romaji: 'yonsen', shift: false },
        { num: 5, kanji: '五戦', reading: 'ごせん', romaji: 'gosen', shift: false },
        { num: 6, kanji: '六戦', reading: 'ろくせん', romaji: 'rokusen', shift: false },
        { num: 7, kanji: '七戦', reading: 'ななせん', romaji: 'nanasen', shift: false },
        { num: 8, kanji: '八戦', reading: 'はっせん', romaji: 'hassen', shift: true },
        { num: 9, kanji: '九戦', reading: 'きゅうせん', romaji: 'kyūsen', shift: false },
        { num: 10, kanji: '十戦', reading: 'じゅっせん', romaji: 'jussen', shift: true }
      ],
      specialCounts: [],
      examples: [
        { japanese: '今シーズンは十戦して七勝しました。', romaji: 'Kon shīzun wa jussen shite nanashō shimashita.', german: 'Diese Saison habe ich zehn Spiele bestritten und sieben gewonnen.' },
        { japanese: '初戦に勝ちました。', romaji: 'Shosen ni kachimashita.', german: 'Ich habe das erste Spiel gewonnen.' }
      ],
      notes: '初戦 (しょせん) = erstes Spiel, 決勝戦 (けっしょうせん) = Finale. Häufig in Sportnachrichten verwendet.'
    },
    // ===== GRUPPEN & MENGEN (Fortsetzung) =====
    {
      id: 'go-pair',
      kanji: '合',
      reading: 'ごう',
      romaji: 'gō',
      meaning: 'Hohlmaß, Reisportionen',
      usage: 'Reis (1合 ≈ 180ml), Sake, traditionelles japanisches Hohlmaß',
      category: 'Essen & Trinken',
      level: 'N4',
      questionWord: { kanji: '何合', reading: 'なんごう', romaji: 'nangō' },
      counts: [
        { num: 1, kanji: '一合', reading: 'いちごう', romaji: 'ichigō', shift: false },
        { num: 2, kanji: '二合', reading: 'にごう', romaji: 'nigō', shift: false },
        { num: 3, kanji: '三合', reading: 'さんごう', romaji: 'sangō', shift: false },
        { num: 4, kanji: '四合', reading: 'よんごう', romaji: 'yongō', shift: false },
        { num: 5, kanji: '五合', reading: 'ごごう', romaji: 'gogō', shift: false },
        { num: 6, kanji: '六合', reading: 'ろくごう', romaji: 'rokugō', shift: false },
        { num: 7, kanji: '七合', reading: 'ななごう', romaji: 'nanagō', shift: false },
        { num: 8, kanji: '八合', reading: 'はちごう', romaji: 'hachigō', shift: false },
        { num: 9, kanji: '九合', reading: 'きゅうごう', romaji: 'kyūgō', shift: false },
        { num: 10, kanji: '十合', reading: 'じゅうごう', romaji: 'jūgō', shift: false }
      ],
      specialCounts: [
        { num: 5, kanji: '五合目', reading: 'ごごうめ', romaji: 'gogōme', note: 'Fünfte Station (z.B. beim Fuji-Aufstieg)' }
      ],
      examples: [
        { japanese: 'ご飯を三合炊きました。', romaji: 'Gohan o sangō takimashita.', german: 'Ich habe drei Portionen Reis gekocht.' },
        { japanese: '富士山の五合目まで行きました。', romaji: 'Fujisan no gogōme made ikimashita.', german: 'Ich bin bis zur fünften Station des Fuji gegangen.' }
      ],
      notes: '1合 ≈ 180ml. Bei der Bergbesteigung des Fuji markiert 合 die Stationen von 一合目 bis 十合目 (Gipfel). 一升 (いっしょう) = 10合.'
    },
    {
      id: 'hai-double',
      kanji: '倍',
      reading: 'ばい',
      romaji: 'bai',
      meaning: 'Faches, Vielfaches',
      usage: 'Multiplikationen, Vergleiche (doppelt, dreifach usw.)',
      category: 'Gruppen & Mengen',
      level: 'N3',
      questionWord: { kanji: '何倍', reading: 'なんばい', romaji: 'nanbai' },
      counts: [
        { num: 1, kanji: '一倍', reading: 'いちばい', romaji: 'ichibai', shift: false },
        { num: 2, kanji: '二倍', reading: 'にばい', romaji: 'nibai', shift: false },
        { num: 3, kanji: '三倍', reading: 'さんばい', romaji: 'sanbai', shift: false },
        { num: 4, kanji: '四倍', reading: 'よんばい', romaji: 'yonbai', shift: false },
        { num: 5, kanji: '五倍', reading: 'ごばい', romaji: 'gobai', shift: false },
        { num: 6, kanji: '六倍', reading: 'ろくばい', romaji: 'rokubai', shift: false },
        { num: 7, kanji: '七倍', reading: 'ななばい', romaji: 'nanabai', shift: false },
        { num: 8, kanji: '八倍', reading: 'はちばい', romaji: 'hachibai', shift: false },
        { num: 9, kanji: '九倍', reading: 'きゅうばい', romaji: 'kyūbai', shift: false },
        { num: 10, kanji: '十倍', reading: 'じゅうばい', romaji: 'jūbai', shift: false }
      ],
      specialCounts: [
        { num: 100, kanji: '百倍', reading: 'ひゃくばい', romaji: 'hyakubai', note: 'Hundertfach' }
      ],
      examples: [
        { japanese: '東京の家賃は田舎の三倍です。', romaji: 'Tōkyō no yachin wa inaka no sanbai desu.', german: 'Die Miete in Tokyo ist dreimal so hoch wie auf dem Land.' },
        { japanese: '二倍の量を注文しました。', romaji: 'Nibai no ryō o chūmon shimashita.', german: 'Ich habe die doppelte Menge bestellt.' }
      ],
      notes: 'Keine Lautverschiebungen. Sehr häufig im Alltag: 二倍 = doppelt, 三倍 = dreifach. 人一倍 (ひといちばい) = „mehr als andere".'
    },

    // ===== OBJEKTE (Fortsetzung) =====
    {
      id: 'cho-long',
      kanji: '丁目',
      reading: 'ちょうめ',
      romaji: 'chōme',
      meaning: 'Straßenblock (Adresse)',
      usage: 'Stadtblöcke in japanischen Adressen',
      category: 'Gebäude & Räume',
      level: 'N4',
      questionWord: { kanji: '何丁目', reading: 'なんちょうめ', romaji: 'nanchōme' },
      counts: [
        { num: 1, kanji: '一丁目', reading: 'いっちょうめ', romaji: 'itchōme', shift: true },
        { num: 2, kanji: '二丁目', reading: 'にちょうめ', romaji: 'nichōme', shift: false },
        { num: 3, kanji: '三丁目', reading: 'さんちょうめ', romaji: 'sanchōme', shift: false },
        { num: 4, kanji: '四丁目', reading: 'よんちょうめ', romaji: 'yonchōme', shift: false },
        { num: 5, kanji: '五丁目', reading: 'ごちょうめ', romaji: 'gochōme', shift: false },
        { num: 6, kanji: '六丁目', reading: 'ろくちょうめ', romaji: 'rokuchōme', shift: false },
        { num: 7, kanji: '七丁目', reading: 'ななちょうめ', romaji: 'nanachōme', shift: false },
        { num: 8, kanji: '八丁目', reading: 'はっちょうめ', romaji: 'hatchōme', shift: true },
        { num: 9, kanji: '九丁目', reading: 'きゅうちょうめ', romaji: 'kyūchōme', shift: false },
        { num: 10, kanji: '十丁目', reading: 'じゅっちょうめ', romaji: 'jutchōme', shift: true }
      ],
      specialCounts: [],
      examples: [
        { japanese: '住所は新宿区歌舞伎町一丁目です。', romaji: 'Jūsho wa Shinjuku-ku Kabukichō itchōme desu.', german: 'Die Adresse ist Kabukichō 1-chōme, Bezirk Shinjuku.' },
        { japanese: '三丁目の角にコンビニがあります。', romaji: 'Sanchōme no kado ni konbini ga arimasu.', german: 'An der Ecke des dritten Blocks gibt es einen Konbini.' }
      ],
      notes: 'Teil des japanischen Adresssystems: 区 (く) → 町 (まち/ちょう) → 丁目 → 番地. „三丁目の夕日" ist ein berühmter japanischer Film.'
    },
    // ===== MEDIZIN (Fortsetzung) =====
    // ===== MENSCHEN (Fortsetzung) =====
    // ===== GEBÄUDE & RÄUME (Fortsetzung) =====
    {
      id: 'ko-door',
      kanji: '戸',
      reading: 'こ',
      romaji: 'ko',
      meaning: 'Wohneinheiten',
      usage: 'Wohnungen, Häuser (in Statistiken und Immobilien)',
      category: 'Gebäude & Räume',
      level: 'N2',
      questionWord: { kanji: '何戸', reading: 'なんこ', romaji: 'nanko' },
      counts: [
        { num: 1, kanji: '一戸', reading: 'いっこ', romaji: 'ikko', shift: true },
        { num: 2, kanji: '二戸', reading: 'にこ', romaji: 'niko', shift: false },
        { num: 3, kanji: '三戸', reading: 'さんこ', romaji: 'sanko', shift: false },
        { num: 4, kanji: '四戸', reading: 'よんこ', romaji: 'yonko', shift: false },
        { num: 5, kanji: '五戸', reading: 'ごこ', romaji: 'goko', shift: false },
        { num: 6, kanji: '六戸', reading: 'ろっこ', romaji: 'rokko', shift: true },
        { num: 7, kanji: '七戸', reading: 'ななこ', romaji: 'nanako', shift: false },
        { num: 8, kanji: '八戸', reading: 'はっこ', romaji: 'hakko', shift: true },
        { num: 9, kanji: '九戸', reading: 'きゅうこ', romaji: 'kyūko', shift: false },
        { num: 10, kanji: '十戸', reading: 'じゅっこ', romaji: 'jukko', shift: true }
      ],
      specialCounts: [],
      examples: [
        { japanese: '台風で五十戸が停電しました。', romaji: 'Taifū de gojukko ga teiden shimashita.', german: 'Durch den Taifun hatten fünfzig Haushalte Stromausfall.' },
        { japanese: '一戸建てに住みたいです。', romaji: 'Ikkodate ni sumitai desu.', german: 'Ich möchte in einem Einfamilienhaus wohnen.' }
      ],
      notes: '一戸建て (いっこだて) = Einfamilienhaus ist ein sehr häufiger Ausdruck. Wird in Nachrichten und Statistiken für Wohneinheiten verwendet.'
    },

    // ===== OBJEKTE (Fortsetzung) =====
    // ===== ESSEN & TRINKEN (Fortsetzung) =====
    {
      id: 'kan-roll',
      kanji: '貫',
      reading: 'かん',
      romaji: 'kan',
      meaning: 'Sushi-Stücke',
      usage: 'Stücke von Nigiri-Sushi',
      category: 'Essen & Trinken',
      level: 'N3',
      questionWord: { kanji: '何貫', reading: 'なんかん', romaji: 'nankan' },
      counts: [
        { num: 1, kanji: '一貫', reading: 'いっかん', romaji: 'ikkan', shift: true },
        { num: 2, kanji: '二貫', reading: 'にかん', romaji: 'nikan', shift: false },
        { num: 3, kanji: '三貫', reading: 'さんかん', romaji: 'sankan', shift: false },
        { num: 4, kanji: '四貫', reading: 'よんかん', romaji: 'yonkan', shift: false },
        { num: 5, kanji: '五貫', reading: 'ごかん', romaji: 'gokan', shift: false },
        { num: 6, kanji: '六貫', reading: 'ろっかん', romaji: 'rokkan', shift: true },
        { num: 7, kanji: '七貫', reading: 'ななかん', romaji: 'nanakan', shift: false },
        { num: 8, kanji: '八貫', reading: 'はっかん', romaji: 'hakkan', shift: true },
        { num: 9, kanji: '九貫', reading: 'きゅうかん', romaji: 'kyūkan', shift: false },
        { num: 10, kanji: '十貫', reading: 'じゅっかん', romaji: 'jukkan', shift: true }
      ],
      specialCounts: [],
      examples: [
        { japanese: 'マグロを二貫ください。', romaji: 'Maguro o nikan kudasai.', german: 'Zwei Stück Thunfisch-Sushi, bitte.' },
        { japanese: '今日は十貫も食べました。', romaji: 'Kyō wa jukkan mo tabemashita.', german: 'Heute habe ich ganze zehn Stück Sushi gegessen.' }
      ],
      notes: 'Wird speziell für Nigiri-Sushi verwendet. In Sushi-Restaurants wird oft in Paaren bestellt (二貫 = ein Paar).'
    },
    // ===== ZEIT (Fortsetzung) =====
    {
      id: 'ki-season',
      kanji: '期',
      reading: 'き',
      romaji: 'ki',
      meaning: 'Perioden, Staffeln',
      usage: 'Geschäftsquartale, Anime-Staffeln, Amtsperioden',
      category: 'Zeit',
      level: 'N3',
      questionWord: { kanji: '何期', reading: 'なんき', romaji: 'nanki' },
      counts: [
        { num: 1, kanji: '一期', reading: 'いっき', romaji: 'ikki', shift: true },
        { num: 2, kanji: '二期', reading: 'にき', romaji: 'niki', shift: false },
        { num: 3, kanji: '三期', reading: 'さんき', romaji: 'sanki', shift: false },
        { num: 4, kanji: '四期', reading: 'よんき', romaji: 'yonki', shift: false },
        { num: 5, kanji: '五期', reading: 'ごき', romaji: 'goki', shift: false },
        { num: 6, kanji: '六期', reading: 'ろっき', romaji: 'rokki', shift: true },
        { num: 7, kanji: '七期', reading: 'ななき', romaji: 'nanaki', shift: false },
        { num: 8, kanji: '八期', reading: 'はっき', romaji: 'hakki', shift: true },
        { num: 9, kanji: '九期', reading: 'きゅうき', romaji: 'kyūki', shift: false },
        { num: 10, kanji: '十期', reading: 'じゅっき', romaji: 'jukki', shift: true }
      ],
      specialCounts: [],
      examples: [
        { japanese: 'このアニメの二期が始まりました。', romaji: 'Kono anime no niki ga hajimarimashita.', german: 'Die zweite Staffel dieses Anime hat begonnen.' },
        { japanese: '社長は三期目に入りました。', romaji: 'Shachō wa sankime ni hairimashita.', german: 'Der Firmenchef ist in seine dritte Amtszeit eingetreten.' }
      ],
      notes: 'Häufig für Anime-Staffeln und Geschäftsperioden verwendet. 一期一会 (いちごいちえ) = „einmalige Begegnung" (berühmtes japanisches Konzept).'
    },
    // ===== TIERE (Fortsetzung) =====
    // ===== TRANSPORT (Fortsetzung) =====
    {
      id: 'sen-line',
      kanji: '線',
      reading: 'せん',
      romaji: 'sen',
      meaning: 'Linien, Bahnlinien',
      usage: 'Zuglinien, Bahnlinien, Straßen',
      category: 'Transport',
      level: 'N4',
      questionWord: { kanji: '何線', reading: 'なんせん', romaji: 'nansen' },
      counts: [
        { num: 1, kanji: '一線', reading: 'いっせん', romaji: 'issen', shift: true },
        { num: 2, kanji: '二線', reading: 'にせん', romaji: 'nisen', shift: false },
        { num: 3, kanji: '三線', reading: 'さんせん', romaji: 'sansen', shift: false },
        { num: 4, kanji: '四線', reading: 'よんせん', romaji: 'yonsen', shift: false },
        { num: 5, kanji: '五線', reading: 'ごせん', romaji: 'gosen', shift: false },
        { num: 6, kanji: '六線', reading: 'ろくせん', romaji: 'rokusen', shift: false },
        { num: 7, kanji: '七線', reading: 'ななせん', romaji: 'nanasen', shift: false },
        { num: 8, kanji: '八線', reading: 'はっせん', romaji: 'hassen', shift: true },
        { num: 9, kanji: '九線', reading: 'きゅうせん', romaji: 'kyūsen', shift: false },
        { num: 10, kanji: '十線', reading: 'じゅっせん', romaji: 'jussen', shift: true }
      ],
      specialCounts: [],
      examples: [
        { japanese: '東京駅は何線も通っています。', romaji: 'Tōkyō-eki wa nansen mo tōtte imasu.', german: 'Durch den Bahnhof Tokyo laufen viele Linien.' },
        { japanese: '山手線に乗り換えてください。', romaji: 'Yamanote-sen ni norikaete kudasai.', german: 'Bitte steigen Sie in die Yamanote-Linie um.' }
      ],
      notes: 'Wird für Zug- und U-Bahnlinien verwendet. Berühmte Linien: 山手線 (やまのてせん), 中央線 (ちゅうおうせん), 東海道線 (とうかいどうせん).'
    },
    {
      id: 'eki',
      kanji: '駅',
      reading: 'えき',
      romaji: 'eki',
      meaning: 'Bahnhöfe, Haltestellen',
      usage: 'Bahnhöfe, Stationen auf einer Strecke',
      category: 'Transport',
      level: 'N4',
      questionWord: { kanji: '何駅', reading: 'なんえき', romaji: 'nan\'eki' },
      counts: [
        { num: 1, kanji: '一駅', reading: 'ひとえき', romaji: 'hitoeki', shift: true },
        { num: 2, kanji: '二駅', reading: 'ふたえき', romaji: 'futaeki', shift: true },
        { num: 3, kanji: '三駅', reading: 'さんえき', romaji: 'san\'eki', shift: false },
        { num: 4, kanji: '四駅', reading: 'よんえき', romaji: 'yon\'eki', shift: false },
        { num: 5, kanji: '五駅', reading: 'ごえき', romaji: 'goeki', shift: false },
        { num: 6, kanji: '六駅', reading: 'ろくえき', romaji: 'rokueki', shift: false },
        { num: 7, kanji: '七駅', reading: 'ななえき', romaji: 'nanaeki', shift: false },
        { num: 8, kanji: '八駅', reading: 'はちえき', romaji: 'hachieki', shift: false },
        { num: 9, kanji: '九駅', reading: 'きゅうえき', romaji: 'kyūeki', shift: false },
        { num: 10, kanji: '十駅', reading: 'じゅうえき', romaji: 'jūeki', shift: false }
      ],
      specialCounts: [],
      examples: [
        { japanese: 'ここから三駅です。', romaji: 'Koko kara san\'eki desu.', german: 'Von hier sind es drei Stationen.' },
        { japanese: '一駅歩きましょう。', romaji: 'Hitoeki arukimashō.', german: 'Lass uns eine Station zu Fuß gehen.' }
      ],
      notes: '1 und 2 verwenden die kun-Lesungen ひとえき und ふたえき. Sehr nützlich bei der Navigation im japanischen Bahnsystem.'
    },

    // ===== TIERE (Fortsetzung) =====
    {
      id: 'sou-boat',
      kanji: '艘',
      reading: 'そう',
      romaji: 'sō',
      meaning: 'Kleine Boote',
      usage: 'Ruderboote, Kanus, kleine Boote',
      category: 'Transport',
      level: 'N1',
      questionWord: { kanji: '何艘', reading: 'なんそう', romaji: 'nansō' },
      counts: [
        { num: 1, kanji: '一艘', reading: 'いっそう', romaji: 'issō', shift: true },
        { num: 2, kanji: '二艘', reading: 'にそう', romaji: 'nisō', shift: false },
        { num: 3, kanji: '三艘', reading: 'さんそう', romaji: 'sansō', shift: false },
        { num: 4, kanji: '四艘', reading: 'よんそう', romaji: 'yonsō', shift: false },
        { num: 5, kanji: '五艘', reading: 'ごそう', romaji: 'gosō', shift: false },
        { num: 6, kanji: '六艘', reading: 'ろくそう', romaji: 'rokusō', shift: false },
        { num: 7, kanji: '七艘', reading: 'ななそう', romaji: 'nanasō', shift: false },
        { num: 8, kanji: '八艘', reading: 'はっそう', romaji: 'hassō', shift: true },
        { num: 9, kanji: '九艘', reading: 'きゅうそう', romaji: 'kyūsō', shift: false },
        { num: 10, kanji: '十艘', reading: 'じゅっそう', romaji: 'jussō', shift: true }
      ],
      specialCounts: [],
      examples: [
        { japanese: '湖にボートが二艘浮かんでいます。', romaji: 'Mizuumi ni bōto ga nisō ukande imasu.', german: 'Auf dem See schwimmen zwei Boote.' },
        { japanese: '一艘の小舟で川を渡りました。', romaji: 'Issō no kobune de kawa o watarimashita.', german: 'Wir überquerten den Fluss mit einem kleinen Boot.' }
      ],
      notes: 'Wird eher literarisch oder in der Seefahrt für kleine Boote verwendet. In der Alltagssprache wird oft 隻 für alle Schiffstypen benutzt.'
    },
    // ===== SPRACHE & SCHRIFT (Fortsetzung) =====
    {
      id: 'hen-stories',
      kanji: '編',
      reading: 'へん',
      romaji: 'hen',
      meaning: 'Erzählungen, Teile',
      usage: 'Erzählungen, Teile eines Werks (前編 = erster Teil, 後編 = zweiter Teil)',
      category: 'Sprache & Schrift',
      level: 'N2',
      questionWord: { kanji: '何編', reading: 'なんへん', romaji: 'nanhen' },
      counts: [
        { num: 1, kanji: '一編', reading: 'いっぺん', romaji: 'ippen', shift: true },
        { num: 2, kanji: '二編', reading: 'にへん', romaji: 'nihen', shift: false },
        { num: 3, kanji: '三編', reading: 'さんべん', romaji: 'sanben', shift: true },
        { num: 4, kanji: '四編', reading: 'よんへん', romaji: 'yonhen', shift: false },
        { num: 5, kanji: '五編', reading: 'ごへん', romaji: 'gohen', shift: false },
        { num: 6, kanji: '六編', reading: 'ろっぺん', romaji: 'roppen', shift: true },
        { num: 7, kanji: '七編', reading: 'ななへん', romaji: 'nanahen', shift: false },
        { num: 8, kanji: '八編', reading: 'はっぺん', romaji: 'happen', shift: true },
        { num: 9, kanji: '九編', reading: 'きゅうへん', romaji: 'kyūhen', shift: false },
        { num: 10, kanji: '十編', reading: 'じゅっぺん', romaji: 'juppen', shift: true }
      ],
      specialCounts: [],
      examples: [
        { japanese: '短編小説を三編読みました。', romaji: 'Tanpen shōsetsu o sanben yomimashita.', german: 'Ich habe drei Kurzgeschichten gelesen.' },
        { japanese: 'この映画は前編と後編に分かれています。', romaji: 'Kono eiga wa zenpen to kōhen ni wakarete imasu.', german: 'Dieser Film ist in zwei Teile aufgeteilt.' }
      ],
      notes: '前編 (ぜんぺん) = erster Teil, 後編 (こうへん) = zweiter Teil, 短編 (たんぺん) = Kurzgeschichte, 長編 (ちょうへん) = Roman/Langfassung.'
    },
    {
      id: 'setsu-verse',
      kanji: '節',
      reading: 'せつ',
      romaji: 'setsu',
      meaning: 'Abschnitte, Strophen',
      usage: 'Liedstrophen, Textabschnitte, Spieltage (Sport)',
      category: 'Sprache & Schrift',
      level: 'N2',
      questionWord: { kanji: '何節', reading: 'なんせつ', romaji: 'nansetsu' },
      counts: [
        { num: 1, kanji: '一節', reading: 'いっせつ', romaji: 'issetsu', shift: true },
        { num: 2, kanji: '二節', reading: 'にせつ', romaji: 'nisetsu', shift: false },
        { num: 3, kanji: '三節', reading: 'さんせつ', romaji: 'sansetsu', shift: false },
        { num: 4, kanji: '四節', reading: 'よんせつ', romaji: 'yonsetsu', shift: false },
        { num: 5, kanji: '五節', reading: 'ごせつ', romaji: 'gosetsu', shift: false },
        { num: 6, kanji: '六節', reading: 'ろくせつ', romaji: 'rokusetsu', shift: false },
        { num: 7, kanji: '七節', reading: 'ななせつ', romaji: 'nanasetsu', shift: false },
        { num: 8, kanji: '八節', reading: 'はっせつ', romaji: 'hassetsu', shift: true },
        { num: 9, kanji: '九節', reading: 'きゅうせつ', romaji: 'kyūsetsu', shift: false },
        { num: 10, kanji: '十節', reading: 'じゅっせつ', romaji: 'jussetsu', shift: true }
      ],
      specialCounts: [],
      examples: [
        { japanese: 'この歌は三節あります。', romaji: 'Kono uta wa sansetsu arimasu.', german: 'Dieses Lied hat drei Strophen.' },
        { japanese: '第二節を歌ってください。', romaji: 'Dainisetsu o utatte kudasai.', german: 'Bitte singen Sie die zweite Strophe.' }
      ],
      notes: 'Wird für Abschnitte in Texten, Strophen in Liedern und Paragraphen in akademischen Texten verwendet. Im Sport auch für Spieltage in einer Liga.'
    },

    // ===== MENSCHEN (Fortsetzung) =====
    {
      id: 'tai-body',
      kanji: '体',
      reading: 'たい',
      romaji: 'tai',
      meaning: 'Körper, Statuen',
      usage: 'Buddhistische Statuen, Puppen, Roboter, Leichname',
      category: 'Menschen',
      level: 'N1',
      questionWord: { kanji: '何体', reading: 'なんたい', romaji: 'nantai' },
      counts: [
        { num: 1, kanji: '一体', reading: 'いったい', romaji: 'ittai', shift: true },
        { num: 2, kanji: '二体', reading: 'にたい', romaji: 'nitai', shift: false },
        { num: 3, kanji: '三体', reading: 'さんたい', romaji: 'santai', shift: false },
        { num: 4, kanji: '四体', reading: 'よんたい', romaji: 'yontai', shift: false },
        { num: 5, kanji: '五体', reading: 'ごたい', romaji: 'gotai', shift: false },
        { num: 6, kanji: '六体', reading: 'ろくたい', romaji: 'rokutai', shift: false },
        { num: 7, kanji: '七体', reading: 'ななたい', romaji: 'nanatai', shift: false },
        { num: 8, kanji: '八体', reading: 'はったい', romaji: 'hattai', shift: true },
        { num: 9, kanji: '九体', reading: 'きゅうたい', romaji: 'kyūtai', shift: false },
        { num: 10, kanji: '十体', reading: 'じゅったい', romaji: 'juttai', shift: true }
      ],
      specialCounts: [],
      examples: [
        { japanese: 'この寺には仏像が三体あります。', romaji: 'Kono tera ni wa butsuzō ga santai arimasu.', german: 'In diesem Tempel gibt es drei Buddha-Statuen.' },
        { japanese: 'ロボットが二体展示されています。', romaji: 'Robotto ga nitai tenji sarete imasu.', german: 'Zwei Roboter werden ausgestellt.' }
      ],
      notes: '一体 (いったい) wird auch als Adverb „überhaupt" verwendet: 一体何が起きたの？= Was ist überhaupt passiert? Wird für Statuen, Leichname und Roboter/Puppen verwendet.'
    },

    // ===== MEDIZIN (Fortsetzung) =====
    {
      id: 'fuku-dose',
      kanji: '服',
      reading: 'ふく',
      romaji: 'fuku',
      meaning: 'Dosen (Medizin)',
      usage: 'Medikamentendosen, Einnahmen',
      category: 'Medizin',
      level: 'N2',
      questionWord: { kanji: '何服', reading: 'なんぷく', romaji: 'nanpuku' },
      counts: [
        { num: 1, kanji: '一服', reading: 'いっぷく', romaji: 'ippuku', shift: true },
        { num: 2, kanji: '二服', reading: 'にふく', romaji: 'nifuku', shift: false },
        { num: 3, kanji: '三服', reading: 'さんぷく', romaji: 'sanpuku', shift: true },
        { num: 4, kanji: '四服', reading: 'よんふく', romaji: 'yonfuku', shift: false },
        { num: 5, kanji: '五服', reading: 'ごふく', romaji: 'gofuku', shift: false },
        { num: 6, kanji: '六服', reading: 'ろっぷく', romaji: 'roppuku', shift: true },
        { num: 7, kanji: '七服', reading: 'ななふく', romaji: 'nanafuku', shift: false },
        { num: 8, kanji: '八服', reading: 'はっぷく', romaji: 'happuku', shift: true },
        { num: 9, kanji: '九服', reading: 'きゅうふく', romaji: 'kyūfuku', shift: false },
        { num: 10, kanji: '十服', reading: 'じゅっぷく', romaji: 'juppuku', shift: true }
      ],
      specialCounts: [],
      examples: [
        { japanese: '漢方薬を一服飲みました。', romaji: 'Kanpōyaku o ippuku nomimashita.', german: 'Ich habe eine Dosis chinesische Medizin eingenommen.' },
        { japanese: '一服して休憩しましょう。', romaji: 'Ippuku shite kyūkei shimashō.', german: 'Lass uns eine Pause machen.' }
      ],
      notes: '一服 (いっぷく) bedeutet auch umgangssprachlich „eine (Rauch-)Pause machen". Wird für pulverförmige oder pflanzliche Medikamente verwendet.'
    },

    // ===== NATUR (Fortsetzung) =====
    {
      id: 'za-peak',
      kanji: '座',
      reading: 'ざ',
      romaji: 'za',
      meaning: 'Berge, Sternbilder',
      usage: 'Berge, Berggipfel, Sternbilder',
      category: 'Natur',
      level: 'N1',
      questionWord: { kanji: '何座', reading: 'なんざ', romaji: 'nanza' },
      counts: [
        { num: 1, kanji: '一座', reading: 'いちざ', romaji: 'ichiza', shift: false },
        { num: 2, kanji: '二座', reading: 'にざ', romaji: 'niza', shift: false },
        { num: 3, kanji: '三座', reading: 'さんざ', romaji: 'sanza', shift: false },
        { num: 4, kanji: '四座', reading: 'よんざ', romaji: 'yonza', shift: false },
        { num: 5, kanji: '五座', reading: 'ござ', romaji: 'goza', shift: false },
        { num: 6, kanji: '六座', reading: 'ろくざ', romaji: 'rokuza', shift: false },
        { num: 7, kanji: '七座', reading: 'ななざ', romaji: 'nanaza', shift: false },
        { num: 8, kanji: '八座', reading: 'はちざ', romaji: 'hachiza', shift: false },
        { num: 9, kanji: '九座', reading: 'きゅうざ', romaji: 'kyūza', shift: false },
        { num: 10, kanji: '十座', reading: 'じゅうざ', romaji: 'jūza', shift: false }
      ],
      specialCounts: [],
      examples: [
        { japanese: '今年は三座に登りました。', romaji: 'Kotoshi wa sanza ni noborimashita.', german: 'Dieses Jahr habe ich drei Berge bestiegen.' },
        { japanese: 'オリオン座が見えます。', romaji: 'Orion-za ga miemasu.', german: 'Man kann das Sternbild Orion sehen.' }
      ],
      notes: 'Keine Lautverschiebungen. 日本百名山 = 100 berühmte Berge Japans. Für Sternbilder: オリオン座, さそり座 usw.'
    },

    // ===== ZEIT (Fortsetzung) =====
    {
      id: 'ban-night',
      kanji: '晩',
      reading: 'ばん',
      romaji: 'ban',
      meaning: 'Nächte, Abende',
      usage: 'Nächte (Dauer), Abende',
      category: 'Zeit',
      level: 'N4',
      questionWord: { kanji: '何晩', reading: 'なんばん', romaji: 'nanban' },
      counts: [
        { num: 1, kanji: '一晩', reading: 'ひとばん', romaji: 'hitoban', shift: true },
        { num: 2, kanji: '二晩', reading: 'ふたばん', romaji: 'futaban', shift: true },
        { num: 3, kanji: '三晩', reading: 'さんばん', romaji: 'sanban', shift: false },
        { num: 4, kanji: '四晩', reading: 'よんばん', romaji: 'yonban', shift: false },
        { num: 5, kanji: '五晩', reading: 'ごばん', romaji: 'goban', shift: false },
        { num: 6, kanji: '六晩', reading: 'ろくばん', romaji: 'rokuban', shift: false },
        { num: 7, kanji: '七晩', reading: 'ななばん', romaji: 'nanaban', shift: false },
        { num: 8, kanji: '八晩', reading: 'はちばん', romaji: 'hachiban', shift: false },
        { num: 9, kanji: '九晩', reading: 'きゅうばん', romaji: 'kyūban', shift: false },
        { num: 10, kanji: '十晩', reading: 'じゅうばん', romaji: 'jūban', shift: false }
      ],
      specialCounts: [],
      examples: [
        { japanese: '一晩中勉強しました。', romaji: 'Hitobanjū benkyō shimashita.', german: 'Ich habe die ganze Nacht gelernt.' },
        { japanese: '友達の家に二晩泊まりました。', romaji: 'Tomodachi no ie ni futaban tomarimashita.', german: 'Ich habe zwei Nächte bei meinem Freund übernachtet.' }
      ],
      notes: '1 und 2 verwenden die kun-Lesungen ひとばん und ふたばん. 一晩中 (ひとばんじゅう) = „die ganze Nacht hindurch".'
    },

    // ===== ESSEN & TRINKEN (Fortsetzung) =====
    {
      id: 'pak-pack',
      kanji: 'パック',
      reading: 'パック',
      romaji: 'pakku',
      meaning: 'Packungen',
      usage: 'Milchpackungen, Saftpackungen, Fertigpackungen',
      category: 'Essen & Trinken',
      level: 'N4',
      questionWord: { kanji: '何パック', reading: 'なんパック', romaji: 'nanpakku' },
      counts: [
        { num: 1, kanji: '一パック', reading: 'いちパック', romaji: 'ichipakku', shift: false },
        { num: 2, kanji: '二パック', reading: 'にパック', romaji: 'nipakku', shift: false },
        { num: 3, kanji: '三パック', reading: 'さんパック', romaji: 'sanpakku', shift: false },
        { num: 4, kanji: '四パック', reading: 'よんパック', romaji: 'yonpakku', shift: false },
        { num: 5, kanji: '五パック', reading: 'ごパック', romaji: 'gopakku', shift: false },
        { num: 6, kanji: '六パック', reading: 'ろくパック', romaji: 'rokupakku', shift: false },
        { num: 7, kanji: '七パック', reading: 'ななパック', romaji: 'nanapakku', shift: false },
        { num: 8, kanji: '八パック', reading: 'はちパック', romaji: 'hachipakku', shift: false },
        { num: 9, kanji: '九パック', reading: 'きゅうパック', romaji: 'kyūpakku', shift: false },
        { num: 10, kanji: '十パック', reading: 'じゅうパック', romaji: 'jūpakku', shift: false }
      ],
      specialCounts: [],
      examples: [
        { japanese: '牛乳を二パック買いました。', romaji: 'Gyūnyū o nipakku kaimashita.', german: 'Ich habe zwei Packungen Milch gekauft.' },
        { japanese: '納豆は三パック入りです。', romaji: 'Nattō wa sanpakku iri desu.', german: 'Natto wird im Dreierpack verkauft.' }
      ],
      notes: 'Lehnwort aus dem Englischen „pack". Da es ein Katakana-Zählwort ist, gibt es keine Lautverschiebungen. Sehr häufig im Supermarkt.'
    },

    // ===== OBJEKTE (Fortsetzung) =====
    {
      id: 'men-face',
      kanji: '面',
      reading: 'めん',
      romaji: 'men',
      meaning: 'Flächen, Oberflächen',
      usage: 'Spiegel, Tennisplätze, Zeitungsseiten, Wandflächen',
      category: 'Objekte',
      level: 'N2',
      questionWord: { kanji: '何面', reading: 'なんめん', romaji: 'nanmen' },
      counts: [
        { num: 1, kanji: '一面', reading: 'いちめん', romaji: 'ichimen', shift: false },
        { num: 2, kanji: '二面', reading: 'にめん', romaji: 'nimen', shift: false },
        { num: 3, kanji: '三面', reading: 'さんめん', romaji: 'sanmen', shift: false },
        { num: 4, kanji: '四面', reading: 'よんめん', romaji: 'yonmen', shift: false },
        { num: 5, kanji: '五面', reading: 'ごめん', romaji: 'gomen', shift: false },
        { num: 6, kanji: '六面', reading: 'ろくめん', romaji: 'rokumen', shift: false },
        { num: 7, kanji: '七面', reading: 'ななめん', romaji: 'nanamen', shift: false },
        { num: 8, kanji: '八面', reading: 'はちめん', romaji: 'hachimen', shift: false },
        { num: 9, kanji: '九面', reading: 'きゅうめん', romaji: 'kyūmen', shift: false },
        { num: 10, kanji: '十面', reading: 'じゅうめん', romaji: 'jūmen', shift: false }
      ],
      specialCounts: [],
      examples: [
        { japanese: 'テニスコートが三面あります。', romaji: 'Tenisu kōto ga sanmen arimasu.', german: 'Es gibt drei Tennisplätze.' },
        { japanese: '新聞の一面に載りました。', romaji: 'Shinbun no ichimen ni norimashita.', german: 'Es stand auf der Titelseite der Zeitung.' }
      ],
      notes: 'Keine Lautverschiebungen. 一面 (いちめん) bedeutet auch „eine Seite" oder die Titelseite einer Zeitung.'
    },

    // ===== GRUPPEN & MENGEN (Fortsetzung) =====
    {
      id: 'sou-layer',
      kanji: '層',
      reading: 'そう',
      romaji: 'sō',
      meaning: 'Schichten, Ebenen',
      usage: 'Schichten (Kuchen, Geologie), Bevölkerungsschichten',
      category: 'Gruppen & Mengen',
      level: 'N2',
      questionWord: { kanji: '何層', reading: 'なんそう', romaji: 'nansō' },
      counts: [
        { num: 1, kanji: '一層', reading: 'いっそう', romaji: 'issō', shift: true },
        { num: 2, kanji: '二層', reading: 'にそう', romaji: 'nisō', shift: false },
        { num: 3, kanji: '三層', reading: 'さんそう', romaji: 'sansō', shift: false },
        { num: 4, kanji: '四層', reading: 'よんそう', romaji: 'yonsō', shift: false },
        { num: 5, kanji: '五層', reading: 'ごそう', romaji: 'gosō', shift: false },
        { num: 6, kanji: '六層', reading: 'ろくそう', romaji: 'rokusō', shift: false },
        { num: 7, kanji: '七層', reading: 'ななそう', romaji: 'nanasō', shift: false },
        { num: 8, kanji: '八層', reading: 'はっそう', romaji: 'hassō', shift: true },
        { num: 9, kanji: '九層', reading: 'きゅうそう', romaji: 'kyūsō', shift: false },
        { num: 10, kanji: '十層', reading: 'じゅっそう', romaji: 'jussō', shift: true }
      ],
      specialCounts: [],
      examples: [
        { japanese: '三層のケーキを焼きました。', romaji: 'Sansō no kēki o yakimashita.', german: 'Ich habe einen dreischichtigen Kuchen gebacken.' },
        { japanese: '一層努力する必要があります。', romaji: 'Issō doryoku suru hitsuyō ga arimasu.', german: 'Es ist nötig, sich noch mehr anzustrengen.' }
      ],
      notes: '一層 (いっそう) wird auch als Adverb „noch mehr, umso mehr" verwendet.'
    },

    // ===== EREIGNISSE (Fortsetzung) =====
    {
      id: 'shiai',
      kanji: '試合',
      reading: 'しあい',
      romaji: 'shiai',
      meaning: 'Spiele, Matches',
      usage: 'Sportspiele, Wettkämpfe',
      category: 'Ereignisse',
      level: 'N4',
      questionWord: { kanji: '何試合', reading: 'なんしあい', romaji: 'nanshiai' },
      counts: [
        { num: 1, kanji: '一試合', reading: 'いちしあい', romaji: 'ichishiai', shift: false },
        { num: 2, kanji: '二試合', reading: 'にしあい', romaji: 'nishiai', shift: false },
        { num: 3, kanji: '三試合', reading: 'さんしあい', romaji: 'sanshiai', shift: false },
        { num: 4, kanji: '四試合', reading: 'よんしあい', romaji: 'yonshiai', shift: false },
        { num: 5, kanji: '五試合', reading: 'ごしあい', romaji: 'goshiai', shift: false },
        { num: 6, kanji: '六試合', reading: 'ろくしあい', romaji: 'rokushiai', shift: false },
        { num: 7, kanji: '七試合', reading: 'ななしあい', romaji: 'nanashiai', shift: false },
        { num: 8, kanji: '八試合', reading: 'はちしあい', romaji: 'hachishiai', shift: false },
        { num: 9, kanji: '九試合', reading: 'きゅうしあい', romaji: 'kyūshiai', shift: false },
        { num: 10, kanji: '十試合', reading: 'じゅうしあい', romaji: 'jūshiai', shift: false }
      ],
      specialCounts: [],
      examples: [
        { japanese: '今日は三試合あります。', romaji: 'Kyō wa sanshiai arimasu.', german: 'Heute gibt es drei Spiele.' },
        { japanese: '一試合目は午前中です。', romaji: 'Ichishiai-me wa gozenchū desu.', german: 'Das erste Spiel ist vormittags.' }
      ],
      notes: 'Keine Lautverschiebungen. 試合 ist der allgemeine Ausdruck für Sportspiele im Japanischen.'
    },

    // ===== GEBÄUDE & RÄUME (Fortsetzung) =====
    {
      id: 'heya',
      kanji: '部屋',
      reading: 'へや',
      romaji: 'heya',
      meaning: 'Zimmer (informell)',
      usage: 'Zimmer in Hotels, Wohnungen (informeller als 室)',
      category: 'Gebäude & Räume',
      level: 'N4',
      questionWord: { kanji: '何部屋', reading: 'なんべや', romaji: 'nanbeya' },
      counts: [
        { num: 1, kanji: '一部屋', reading: 'ひとへや', romaji: 'hitoheya', shift: true },
        { num: 2, kanji: '二部屋', reading: 'ふたへや', romaji: 'futaheya', shift: true },
        { num: 3, kanji: '三部屋', reading: 'さんべや', romaji: 'sanbeya', shift: false },
        { num: 4, kanji: '四部屋', reading: 'よんべや', romaji: 'yonbeya', shift: false },
        { num: 5, kanji: '五部屋', reading: 'ごへや', romaji: 'goheya', shift: false },
        { num: 6, kanji: '六部屋', reading: 'ろくへや', romaji: 'rokuheya', shift: false },
        { num: 7, kanji: '七部屋', reading: 'ななへや', romaji: 'nanaheya', shift: false },
        { num: 8, kanji: '八部屋', reading: 'はちへや', romaji: 'hachiheya', shift: false },
        { num: 9, kanji: '九部屋', reading: 'きゅうへや', romaji: 'kyūheya', shift: false },
        { num: 10, kanji: '十部屋', reading: 'じゅうへや', romaji: 'jūheya', shift: false }
      ],
      specialCounts: [],
      examples: [
        { japanese: 'このマンションは三部屋あります。', romaji: 'Kono manshon wa sanbeya arimasu.', german: 'Diese Wohnung hat drei Zimmer.' },
        { japanese: '一部屋空いていますか。', romaji: 'Hitoheya aite imasu ka.', german: 'Ist ein Zimmer frei?' }
      ],
      notes: '1 und 2 verwenden die kun-Lesungen ひとへや und ふたへや. Informeller als 室. Im Sumo bedeutet 部屋 einen Trainingsverein/Stall.'
    },

    // ===== OBJEKTE (Fortsetzung) =====
    {
      id: 'maku',
      kanji: '幕',
      reading: 'まく',
      romaji: 'maku',
      meaning: 'Akte (Theater)',
      usage: 'Akte in Theaterstücken, Opern',
      category: 'Ereignisse',
      level: 'N2',
      questionWord: { kanji: '何幕', reading: 'なんまく', romaji: 'nanmaku' },
      counts: [
        { num: 1, kanji: '一幕', reading: 'ひとまく', romaji: 'hitomaku', shift: true },
        { num: 2, kanji: '二幕', reading: 'ふたまく', romaji: 'futamaku', shift: true },
        { num: 3, kanji: '三幕', reading: 'さんまく', romaji: 'sanmaku', shift: false },
        { num: 4, kanji: '四幕', reading: 'よんまく', romaji: 'yonmaku', shift: false },
        { num: 5, kanji: '五幕', reading: 'ごまく', romaji: 'gomaku', shift: false },
        { num: 6, kanji: '六幕', reading: 'ろくまく', romaji: 'rokumaku', shift: false },
        { num: 7, kanji: '七幕', reading: 'ななまく', romaji: 'nanamaku', shift: false },
        { num: 8, kanji: '八幕', reading: 'はちまく', romaji: 'hachimaku', shift: false },
        { num: 9, kanji: '九幕', reading: 'きゅうまく', romaji: 'kyūmaku', shift: false },
        { num: 10, kanji: '十幕', reading: 'じゅうまく', romaji: 'jūmaku', shift: false }
      ],
      specialCounts: [],
      examples: [
        { japanese: 'この劇は三幕構成です。', romaji: 'Kono geki wa sanmaku kōsei desu.', german: 'Dieses Theaterstück hat drei Akte.' },
        { japanese: '第一幕が始まりました。', romaji: 'Daiichimaku ga hajimarimashita.', german: 'Der erste Akt hat begonnen.' }
      ],
      notes: '1 und 2 verwenden die kun-Lesungen ひとまく und ふたまく. 幕間 (まくあい) = Pause zwischen den Akten.'
    },
    {
      id: 'sho-place',
      kanji: '位',
      reading: 'い',
      romaji: 'i',
      meaning: 'Plätze, Ränge',
      usage: 'Platzierungen, Rangfolge, Bestenlisten',
      category: 'Ereignisse',
      level: 'N3',
      questionWord: { kanji: '何位', reading: 'なんい', romaji: 'nan\'i' },
      counts: [
        { num: 1, kanji: '一位', reading: 'いちい', romaji: 'ichii', shift: false },
        { num: 2, kanji: '二位', reading: 'にい', romaji: 'nii', shift: false },
        { num: 3, kanji: '三位', reading: 'さんい', romaji: 'san\'i', shift: false },
        { num: 4, kanji: '四位', reading: 'よんい', romaji: 'yon\'i', shift: false },
        { num: 5, kanji: '五位', reading: 'ごい', romaji: 'goi', shift: false },
        { num: 6, kanji: '六位', reading: 'ろくい', romaji: 'rokui', shift: false },
        { num: 7, kanji: '七位', reading: 'なない', romaji: 'nanai', shift: false },
        { num: 8, kanji: '八位', reading: 'はちい', romaji: 'hachii', shift: false },
        { num: 9, kanji: '九位', reading: 'きゅうい', romaji: 'kyūi', shift: false },
        { num: 10, kanji: '十位', reading: 'じゅうい', romaji: 'jūi', shift: false }
      ],
      specialCounts: [],
      examples: [
        { japanese: 'マラソンで三位になりました。', romaji: 'Marason de san\'i ni narimashita.', german: 'Beim Marathon bin ich Dritter geworden.' },
        { japanese: '日本の人口は世界で十一位です。', romaji: 'Nihon no jinkō wa sekai de jūichii desu.', german: 'Japans Bevölkerung liegt weltweit auf Platz elf.' }
      ],
      notes: 'Keine Lautverschiebungen. 第一位 (だいいちい) = erster Platz. Wird für Ranglisten, Sportergebnisse und Statistiken verwendet.'
    },
    {
      id: 'sedai',
      kanji: '世代',
      reading: 'せだい',
      romaji: 'sedai',
      meaning: 'Generationen',
      usage: 'Generationen (Familie, Technologie)',
      category: 'Zeit',
      level: 'N2',
      questionWord: { kanji: '何世代', reading: 'なんせだい', romaji: 'nansedai' },
      counts: [
        { num: 1, kanji: '一世代', reading: 'いちせだい', romaji: 'ichisedai', shift: false },
        { num: 2, kanji: '二世代', reading: 'にせだい', romaji: 'nisedai', shift: false },
        { num: 3, kanji: '三世代', reading: 'さんせだい', romaji: 'sansedai', shift: false },
        { num: 4, kanji: '四世代', reading: 'よんせだい', romaji: 'yonsedai', shift: false },
        { num: 5, kanji: '五世代', reading: 'ごせだい', romaji: 'gosedai', shift: false },
        { num: 6, kanji: '六世代', reading: 'ろくせだい', romaji: 'rokusedai', shift: false },
        { num: 7, kanji: '七世代', reading: 'ななせだい', romaji: 'nanasedai', shift: false },
        { num: 8, kanji: '八世代', reading: 'はちせだい', romaji: 'hachisedai', shift: false },
        { num: 9, kanji: '九世代', reading: 'きゅうせだい', romaji: 'kyūsedai', shift: false },
        { num: 10, kanji: '十世代', reading: 'じゅうせだい', romaji: 'jūsedai', shift: false }
      ],
      specialCounts: [],
      examples: [
        { japanese: '三世代が一緒に住んでいます。', romaji: 'Sansedai ga issho ni sunde imasu.', german: 'Drei Generationen wohnen zusammen.' },
        { japanese: '第五世代のスマートフォンです。', romaji: 'Daigosedai no sumātofon desu.', german: 'Es ist ein Smartphone der fünften Generation.' }
      ],
      notes: 'Keine Lautverschiebungen. Wird sowohl für Familiengenerationen als auch für Technologiegenerationen verwendet.'
    },

    // ===== WEITERE NEUE EINTRÄGE =====
    {
      id: 'jou-lock',
      kanji: '錠',
      reading: 'じょう',
      romaji: 'jō',
      meaning: 'Schlösser',
      usage: 'Türschlösser, Vorhängeschlösser',
      category: 'Objekte',
      level: 'N2',
      questionWord: { kanji: '何錠', reading: 'なんじょう', romaji: 'nanjō' },
      counts: [
        { num: 1, kanji: '一錠', reading: 'いちじょう', romaji: 'ichijō', shift: false },
        { num: 2, kanji: '二錠', reading: 'にじょう', romaji: 'nijō', shift: false },
        { num: 3, kanji: '三錠', reading: 'さんじょう', romaji: 'sanjō', shift: false },
        { num: 4, kanji: '四錠', reading: 'よんじょう', romaji: 'yonjō', shift: false },
        { num: 5, kanji: '五錠', reading: 'ごじょう', romaji: 'gojō', shift: false },
        { num: 6, kanji: '六錠', reading: 'ろくじょう', romaji: 'rokujō', shift: false },
        { num: 7, kanji: '七錠', reading: 'ななじょう', romaji: 'nanajō', shift: false },
        { num: 8, kanji: '八錠', reading: 'はちじょう', romaji: 'hachijō', shift: false },
        { num: 9, kanji: '九錠', reading: 'きゅうじょう', romaji: 'kyūjō', shift: false },
        { num: 10, kanji: '十錠', reading: 'じゅうじょう', romaji: 'jūjō', shift: false }
      ],
      specialCounts: [],
      examples: [
        { japanese: 'ドアに鍵を二錠かけました。', romaji: 'Doa ni kagi o nijō kakemashita.', german: 'Ich habe zwei Schlösser an der Tür abgeschlossen.' },
        { japanese: '自転車に一錠つけています。', romaji: 'Jitensha ni ichijō tsukete imasu.', german: 'Am Fahrrad habe ich ein Schloss.' }
      ],
      notes: 'Gleiche Lesung wie 錠 für Tabletten, aber hier für Schlösser. Der Kontext klärt die Bedeutung.'
    },
    {
      id: 'sao-pole',
      kanji: '竿',
      reading: 'さお',
      romaji: 'sao',
      meaning: 'Stangen, Angelruten',
      usage: 'Angelruten, Wäschestangen, Bambusstangen',
      category: 'Objekte',
      level: 'N2',
      questionWord: { kanji: '何竿', reading: 'なんざお', romaji: 'nanzao' },
      counts: [
        { num: 1, kanji: '一竿', reading: 'ひとさお', romaji: 'hitosao', shift: true },
        { num: 2, kanji: '二竿', reading: 'ふたさお', romaji: 'futasao', shift: true },
        { num: 3, kanji: '三竿', reading: 'さんざお', romaji: 'sanzao', shift: false },
        { num: 4, kanji: '四竿', reading: 'よんさお', romaji: 'yonsao', shift: false },
        { num: 5, kanji: '五竿', reading: 'ごさお', romaji: 'gosao', shift: false },
        { num: 6, kanji: '六竿', reading: 'ろくさお', romaji: 'rokusao', shift: false },
        { num: 7, kanji: '七竿', reading: 'ななさお', romaji: 'nanasao', shift: false },
        { num: 8, kanji: '八竿', reading: 'はちさお', romaji: 'hachisao', shift: false },
        { num: 9, kanji: '九竿', reading: 'きゅうさお', romaji: 'kyūsao', shift: false },
        { num: 10, kanji: '十竿', reading: 'じゅうさお', romaji: 'jūsao', shift: false }
      ],
      specialCounts: [],
      examples: [
        { japanese: '釣り竿を二竿持っています。', romaji: 'Tsurizao o futasao motte imasu.', german: 'Ich besitze zwei Angelruten.' },
        { japanese: '物干し竿を一竿買いました。', romaji: 'Monohoshizao o hitosao kaimashita.', german: 'Ich habe eine Wäschestange gekauft.' }
      ],
      notes: '1 und 2 verwenden die kun-Lesungen ひとさお und ふたさお. Wird auch für Tansu-Schränke (箪笥) verwendet: 一竿 = ein Schrank.'
    },
    {
      id: 'tsui-pair',
      kanji: '対',
      reading: 'つい',
      romaji: 'tsui',
      meaning: 'Paare (zusammengehörig)',
      usage: 'Zusammengehörige Paare (Vasen, Ohrringe, Figuren)',
      category: 'Gruppen & Mengen',
      level: 'N2',
      questionWord: { kanji: '何対', reading: 'なんつい', romaji: 'nantsui' },
      counts: [
        { num: 1, kanji: '一対', reading: 'いっつい', romaji: 'ittsui', shift: true },
        { num: 2, kanji: '二対', reading: 'につい', romaji: 'nitsui', shift: false },
        { num: 3, kanji: '三対', reading: 'さんつい', romaji: 'santsui', shift: false },
        { num: 4, kanji: '四対', reading: 'よんつい', romaji: 'yontsui', shift: false },
        { num: 5, kanji: '五対', reading: 'ごつい', romaji: 'gotsui', shift: false },
        { num: 6, kanji: '六対', reading: 'ろくつい', romaji: 'rokutsui', shift: false },
        { num: 7, kanji: '七対', reading: 'ななつい', romaji: 'nanatsui', shift: false },
        { num: 8, kanji: '八対', reading: 'はっつい', romaji: 'hattsui', shift: true },
        { num: 9, kanji: '九対', reading: 'きゅうつい', romaji: 'kyūtsui', shift: false },
        { num: 10, kanji: '十対', reading: 'じゅっつい', romaji: 'juttsui', shift: true }
      ],
      specialCounts: [],
      examples: [
        { japanese: '一対の花瓶が飾ってあります。', romaji: 'Ittsui no kabin ga kazatte arimasu.', german: 'Ein Paar Vasen ist aufgestellt.' },
        { japanese: 'イヤリングを一対買いました。', romaji: 'Iyaringu o ittsui kaimashita.', german: 'Ich habe ein Paar Ohrringe gekauft.' }
      ],
      notes: '一対 (いっつい) = ein zusammengehöriges Paar. Anders als 組 (Set/Gruppe) betont 対 die symmetrische Paarung.'
    },
    {
      id: 'ketsu-blood',
      kanji: '滴',
      reading: 'てき',
      romaji: 'teki',
      meaning: 'Tropfen (Infusion)',
      usage: 'Infusionstropfen, Bluttropfen (medizinisch)',
      category: 'Medizin',
      level: 'N2',
      questionWord: { kanji: '何滴', reading: 'なんてき', romaji: 'nanteki' },
      counts: [
        { num: 1, kanji: '一滴', reading: 'いってき', romaji: 'itteki', shift: true },
        { num: 2, kanji: '二滴', reading: 'にてき', romaji: 'niteki', shift: false },
        { num: 3, kanji: '三滴', reading: 'さんてき', romaji: 'santeki', shift: false },
        { num: 4, kanji: '四滴', reading: 'よんてき', romaji: 'yonteki', shift: false },
        { num: 5, kanji: '五滴', reading: 'ごてき', romaji: 'goteki', shift: false },
        { num: 6, kanji: '六滴', reading: 'ろくてき', romaji: 'rokuteki', shift: false },
        { num: 7, kanji: '七滴', reading: 'ななてき', romaji: 'nanateki', shift: false },
        { num: 8, kanji: '八滴', reading: 'はってき', romaji: 'hatteki', shift: true },
        { num: 9, kanji: '九滴', reading: 'きゅうてき', romaji: 'kyūteki', shift: false },
        { num: 10, kanji: '十滴', reading: 'じゅってき', romaji: 'jutteki', shift: true }
      ],
      specialCounts: [],
      examples: [
        { japanese: '点滴を一滴ずつ落としています。', romaji: 'Tenteki o itteki zutsu otoshite imasu.', german: 'Die Infusion tropft Tropfen für Tropfen.' },
        { japanese: '血液を一滴採取しました。', romaji: 'Ketsueki o itteki saishu shimashita.', german: 'Ein Tropfen Blut wurde entnommen.' }
      ],
      notes: '点滴 (てんてき) = Infusion. Gleicher Zähler wie 滴 für Augentropfen, hier im Kontext von Infusionen und Blutentnahme.'
    },
    {
      id: 'kago-basket',
      kanji: '籠',
      reading: 'かご',
      romaji: 'kago',
      meaning: 'Körbe',
      usage: 'Einkaufskörbe, Wäschekörbe, Obstkörbe',
      category: 'Gruppen & Mengen',
      level: 'N3',
      questionWord: { kanji: '何籠', reading: 'なんかご', romaji: 'nankago' },
      counts: [
        { num: 1, kanji: '一籠', reading: 'ひとかご', romaji: 'hitokago', shift: true },
        { num: 2, kanji: '二籠', reading: 'ふたかご', romaji: 'futakago', shift: true },
        { num: 3, kanji: '三籠', reading: 'さんかご', romaji: 'sankago', shift: false },
        { num: 4, kanji: '四籠', reading: 'よんかご', romaji: 'yonkago', shift: false },
        { num: 5, kanji: '五籠', reading: 'ごかご', romaji: 'gokago', shift: false },
        { num: 6, kanji: '六籠', reading: 'ろくかご', romaji: 'rokukago', shift: false },
        { num: 7, kanji: '七籠', reading: 'ななかご', romaji: 'nanakago', shift: false },
        { num: 8, kanji: '八籠', reading: 'はちかご', romaji: 'hachikago', shift: false },
        { num: 9, kanji: '九籠', reading: 'きゅうかご', romaji: 'kyūkago', shift: false },
        { num: 10, kanji: '十籠', reading: 'じゅうかご', romaji: 'jūkago', shift: false }
      ],
      specialCounts: [],
      examples: [
        { japanese: 'いちごを二籠買いました。', romaji: 'Ichigo o futakago kaimashita.', german: 'Ich habe zwei Körbe Erdbeeren gekauft.' },
        { japanese: '洗濯物が一籠たまっています。', romaji: 'Sentakumono ga hitokago tamatte imasu.', german: 'Ein Korb Wäsche hat sich angesammelt.' }
      ],
      notes: '1 und 2 verwenden die kun-Lesungen ひとかご und ふたかご. Wird für Körbe mit Inhalt verwendet.'
    },
    {
      id: 'rin-dose',
      kanji: '輪',
      reading: 'りん',
      romaji: 'rin',
      meaning: 'Ringe, Kreise',
      usage: 'Ringe, Kränze, Kreise (z.B. Olympische Ringe)',
      category: 'Objekte',
      level: 'N2',
      questionWord: { kanji: '何輪', reading: 'なんりん', romaji: 'nanrin' },
      counts: [
        { num: 1, kanji: '一輪', reading: 'いちりん', romaji: 'ichirin', shift: false },
        { num: 2, kanji: '二輪', reading: 'にりん', romaji: 'nirin', shift: false },
        { num: 3, kanji: '三輪', reading: 'さんりん', romaji: 'sanrin', shift: false },
        { num: 4, kanji: '四輪', reading: 'よんりん', romaji: 'yonrin', shift: false },
        { num: 5, kanji: '五輪', reading: 'ごりん', romaji: 'gorin', shift: false },
        { num: 6, kanji: '六輪', reading: 'ろくりん', romaji: 'rokurin', shift: false },
        { num: 7, kanji: '七輪', reading: 'ななりん', romaji: 'nanarin', shift: false },
        { num: 8, kanji: '八輪', reading: 'はちりん', romaji: 'hachirin', shift: false },
        { num: 9, kanji: '九輪', reading: 'きゅうりん', romaji: 'kyūrin', shift: false },
        { num: 10, kanji: '十輪', reading: 'じゅうりん', romaji: 'jūrin', shift: false }
      ],
      specialCounts: [],
      examples: [
        { japanese: '結婚指輪を一輪もらいました。', romaji: 'Kekkon yubiwa o ichirin moraimashita.', german: 'Ich habe einen Ehering bekommen.' },
        { japanese: '一輪車に乗れますか。', romaji: 'Ichirinsha ni noremasu ka.', german: 'Können Sie Einrad fahren?' }
      ],
      notes: '一輪車 (いちりんしゃ) = Einrad, 二輪車 (にりんしゃ) = Motorrad, 四輪車 (よんりんしゃ) = Auto. 輪 wird sowohl für Blumen als auch für Räder und Ringe verwendet.'
    },
    {
      id: 'jikan-lesson',
      kanji: '時限',
      reading: 'じげん',
      romaji: 'jigen',
      meaning: 'Unterrichtsstunden',
      usage: 'Schulstunden, Unterrichtsperioden',
      category: 'Zeit',
      level: 'N4',
      questionWord: { kanji: '何時限', reading: 'なんじげん', romaji: 'nanjigen' },
      counts: [
        { num: 1, kanji: '一時限', reading: 'いちじげん', romaji: 'ichijigen', shift: false },
        { num: 2, kanji: '二時限', reading: 'にじげん', romaji: 'nijigen', shift: false },
        { num: 3, kanji: '三時限', reading: 'さんじげん', romaji: 'sanjigen', shift: false },
        { num: 4, kanji: '四時限', reading: 'よじげん', romaji: 'yojigen', shift: false },
        { num: 5, kanji: '五時限', reading: 'ごじげん', romaji: 'gojigen', shift: false },
        { num: 6, kanji: '六時限', reading: 'ろくじげん', romaji: 'rokujigen', shift: false },
        { num: 7, kanji: '七時限', reading: 'ななじげん', romaji: 'nanajigen', shift: false },
        { num: 8, kanji: '八時限', reading: 'はちじげん', romaji: 'hachijigen', shift: false },
        { num: 9, kanji: '九時限', reading: 'きゅうじげん', romaji: 'kyūjigen', shift: false },
        { num: 10, kanji: '十時限', reading: 'じゅうじげん', romaji: 'jūjigen', shift: false }
      ],
      specialCounts: [],
      examples: [
        { japanese: '今日は六時限まで授業があります。', romaji: 'Kyō wa rokujigen made jugyō ga arimasu.', german: 'Heute habe ich Unterricht bis zur sechsten Stunde.' },
        { japanese: '三時限目は数学です。', romaji: 'Sanjigenme wa sūgaku desu.', german: 'Die dritte Stunde ist Mathematik.' }
      ],
      notes: 'Keine Lautverschiebungen. Wird hauptsächlich an Schulen und Universitäten verwendet. 目 (め) wird als Ordnungszahl-Suffix angehängt.'
    },
    {
      id: 'ken-pref',
      kanji: '県',
      reading: 'けん',
      romaji: 'ken',
      meaning: 'Präfekturen',
      usage: 'Japanische Präfekturen',
      category: 'Gruppen & Mengen',
      level: 'N4',
      questionWord: { kanji: '何県', reading: 'なんけん', romaji: 'nanken' },
      counts: [
        { num: 1, kanji: '一県', reading: 'いっけん', romaji: 'ikken', shift: true },
        { num: 2, kanji: '二県', reading: 'にけん', romaji: 'niken', shift: false },
        { num: 3, kanji: '三県', reading: 'さんけん', romaji: 'sanken', shift: false },
        { num: 4, kanji: '四県', reading: 'よんけん', romaji: 'yonken', shift: false },
        { num: 5, kanji: '五県', reading: 'ごけん', romaji: 'goken', shift: false },
        { num: 6, kanji: '六県', reading: 'ろっけん', romaji: 'rokken', shift: true },
        { num: 7, kanji: '七県', reading: 'ななけん', romaji: 'nanaken', shift: false },
        { num: 8, kanji: '八県', reading: 'はっけん', romaji: 'hakken', shift: true },
        { num: 9, kanji: '九県', reading: 'きゅうけん', romaji: 'kyūken', shift: false },
        { num: 10, kanji: '十県', reading: 'じゅっけん', romaji: 'jukken', shift: true }
      ],
      specialCounts: [
        { num: 47, kanji: '四十七県', reading: 'よんじゅうななけん', romaji: 'yonjūnanaken', note: 'Japan hat 47 Präfekturen (都道府県)' }
      ],
      examples: [
        { japanese: '関東地方には七県あります。', romaji: 'Kantō chihō ni wa nanaken arimasu.', german: 'In der Kantō-Region gibt es sieben Präfekturen.' },
        { japanese: '全国四十七都道府県を旅しました。', romaji: 'Zenkoku yonjūnana todōfuken o tabi shimashita.', german: 'Ich bin durch alle 47 Präfekturen Japans gereist.' }
      ],
      notes: 'Japan hat 47 Verwaltungseinheiten: 1都 (Tokyo), 1道 (Hokkaido), 2府 (Osaka, Kyoto), 43県. Zusammen: 都道府県 (とどうふけん).'
    },
    {
      id: 'tsu-port',
      kanji: '港',
      reading: 'こう',
      romaji: 'kō',
      meaning: 'Häfen',
      usage: 'Häfen, Flughäfen (空港)',
      category: 'Transport',
      level: 'N3',
      questionWord: { kanji: '何港', reading: 'なんこう', romaji: 'nankō' },
      counts: [
        { num: 1, kanji: '一港', reading: 'いっこう', romaji: 'ikkō', shift: true },
        { num: 2, kanji: '二港', reading: 'にこう', romaji: 'nikō', shift: false },
        { num: 3, kanji: '三港', reading: 'さんこう', romaji: 'sankō', shift: false },
        { num: 4, kanji: '四港', reading: 'よんこう', romaji: 'yonkō', shift: false },
        { num: 5, kanji: '五港', reading: 'ごこう', romaji: 'gokō', shift: false },
        { num: 6, kanji: '六港', reading: 'ろっこう', romaji: 'rokkō', shift: true },
        { num: 7, kanji: '七港', reading: 'ななこう', romaji: 'nanakō', shift: false },
        { num: 8, kanji: '八港', reading: 'はっこう', romaji: 'hakkō', shift: true },
        { num: 9, kanji: '九港', reading: 'きゅうこう', romaji: 'kyūkō', shift: false },
        { num: 10, kanji: '十港', reading: 'じゅっこう', romaji: 'jukkō', shift: true }
      ],
      specialCounts: [],
      examples: [
        { japanese: '日本には重要な港が五港あります。', romaji: 'Nihon ni wa jūyō na minato ga gokō arimasu.', german: 'In Japan gibt es fünf wichtige Häfen.' },
        { japanese: '三港を巡るクルーズです。', romaji: 'Sankō o meguru kurūzu desu.', german: 'Es ist eine Kreuzfahrt mit Anläufen in drei Häfen.' }
      ],
      notes: 'Wird für Häfen (港) und auch für Flughäfen (空港) verwendet. 五港 (ごこう) ist historisch bekannt als die fünf Vertragshäfen der Meiji-Zeit.'
    },
    {
      id: 'cho-bill',
      kanji: '帳',
      reading: 'ちょう',
      romaji: 'chō',
      meaning: 'Notizbücher, Hefte',
      usage: 'Notizbücher, Kontobücher, Adressbücher',
      category: 'Objekte',
      level: 'N3',
      questionWord: { kanji: '何帳', reading: 'なんちょう', romaji: 'nanchō' },
      counts: [
        { num: 1, kanji: '一帳', reading: 'いっちょう', romaji: 'itchō', shift: true },
        { num: 2, kanji: '二帳', reading: 'にちょう', romaji: 'nichō', shift: false },
        { num: 3, kanji: '三帳', reading: 'さんちょう', romaji: 'sanchō', shift: false },
        { num: 4, kanji: '四帳', reading: 'よんちょう', romaji: 'yonchō', shift: false },
        { num: 5, kanji: '五帳', reading: 'ごちょう', romaji: 'gochō', shift: false },
        { num: 6, kanji: '六帳', reading: 'ろくちょう', romaji: 'rokuchō', shift: false },
        { num: 7, kanji: '七帳', reading: 'ななちょう', romaji: 'nanachō', shift: false },
        { num: 8, kanji: '八帳', reading: 'はっちょう', romaji: 'hatchō', shift: true },
        { num: 9, kanji: '九帳', reading: 'きゅうちょう', romaji: 'kyūchō', shift: false },
        { num: 10, kanji: '十帳', reading: 'じゅっちょう', romaji: 'jutchō', shift: true }
      ],
      specialCounts: [],
      examples: [
        { japanese: '通帳を二帳持っています。', romaji: 'Tsūchō o nichō motte imasu.', german: 'Ich habe zwei Bankbücher.' },
        { japanese: '手帳を一帳買いました。', romaji: 'Techō o itchō kaimashita.', german: 'Ich habe ein Notizbuch gekauft.' }
      ],
      notes: '通帳 (つうちょう) = Bankbuch, 手帳 (てちょう) = Notizbuch/Terminplaner, 帳面 (ちょうめん) = Heft.'
    },
    {
      id: 'haba-width',
      kanji: '泊',
      reading: 'はく',
      romaji: 'haku',
      meaning: 'Ankerplätze',
      usage: 'Schiffsankerplätze, Anlegestellen',
      category: 'Transport',
      level: 'N1',
      questionWord: { kanji: '何泊', reading: 'なんぱく', romaji: 'nanpaku' },
      counts: [
        { num: 1, kanji: '一泊', reading: 'いっぱく', romaji: 'ippaku', shift: true },
        { num: 2, kanji: '二泊', reading: 'にはく', romaji: 'nihaku', shift: false },
        { num: 3, kanji: '三泊', reading: 'さんぱく', romaji: 'sanpaku', shift: true },
        { num: 4, kanji: '四泊', reading: 'よんはく', romaji: 'yonhaku', shift: false },
        { num: 5, kanji: '五泊', reading: 'ごはく', romaji: 'gohaku', shift: false },
        { num: 6, kanji: '六泊', reading: 'ろっぱく', romaji: 'roppaku', shift: true },
        { num: 7, kanji: '七泊', reading: 'ななはく', romaji: 'nanahaku', shift: false },
        { num: 8, kanji: '八泊', reading: 'はっぱく', romaji: 'happaku', shift: true },
        { num: 9, kanji: '九泊', reading: 'きゅうはく', romaji: 'kyūhaku', shift: false },
        { num: 10, kanji: '十泊', reading: 'じゅっぱく', romaji: 'juppaku', shift: true }
      ],
      specialCounts: [],
      examples: [
        { japanese: 'クルーズ船が三泊寄港します。', romaji: 'Kurūzu-sen ga sanpaku kikō shimasu.', german: 'Das Kreuzfahrtschiff legt drei Mal an.' },
        { japanese: '長期間の船旅で何泊もしました。', romaji: 'Chōkikan no funatabi de nanpaku mo shimashita.', german: 'Bei der langen Schiffsreise haben wir viele Nächte verbracht.' }
      ],
      notes: 'Gleicher Zähler wie 泊 für Hotelübernachtungen, hier im Kontext der Schifffahrt für Ankerplätze.'
    },
    {
      id: 'tsu-island',
      kanji: '島',
      reading: 'とう',
      romaji: 'tō',
      meaning: 'Inseln',
      usage: 'Inseln, Inselgruppen',
      category: 'Natur',
      level: 'N3',
      questionWord: { kanji: '何島', reading: 'なんとう', romaji: 'nantō' },
      counts: [
        { num: 1, kanji: '一島', reading: 'いっとう', romaji: 'ittō', shift: true },
        { num: 2, kanji: '二島', reading: 'にとう', romaji: 'nitō', shift: false },
        { num: 3, kanji: '三島', reading: 'さんとう', romaji: 'santō', shift: false },
        { num: 4, kanji: '四島', reading: 'よんとう', romaji: 'yontō', shift: false },
        { num: 5, kanji: '五島', reading: 'ごとう', romaji: 'gotō', shift: false },
        { num: 6, kanji: '六島', reading: 'ろくとう', romaji: 'rokutō', shift: false },
        { num: 7, kanji: '七島', reading: 'ななとう', romaji: 'nanatō', shift: false },
        { num: 8, kanji: '八島', reading: 'はっとう', romaji: 'hattō', shift: true },
        { num: 9, kanji: '九島', reading: 'きゅうとう', romaji: 'kyūtō', shift: false },
        { num: 10, kanji: '十島', reading: 'じゅっとう', romaji: 'juttō', shift: true }
      ],
      specialCounts: [],
      examples: [
        { japanese: '日本は六千以上の島からなっています。', romaji: 'Nihon wa rokusen ijō no shima kara natte imasu.', german: 'Japan besteht aus über sechstausend Inseln.' },
        { japanese: '三島を回るツアーに参加しました。', romaji: 'Santō o mawaru tsuā ni sanka shimashita.', german: 'Ich habe an einer Tour zu drei Inseln teilgenommen.' }
      ],
      notes: 'Japan ist ein Inselstaat. 本州 (ほんしゅう), 北海道 (ほっかいどう), 九州 (きゅうしゅう), 四国 (しこく) sind die vier Hauptinseln.'
    }
  ]
};
