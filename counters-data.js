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
    {
      id: 'mei',
      kanji: '名',
      reading: 'めい',
      romaji: 'mei',
      meaning: 'Personen (formell)',
      usage: 'Formelles Zählen von Personen (Reservierungen, Formulare, Ankündigungen)',
      category: 'Menschen',
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
    {
      id: 'en',
      kanji: '円',
      reading: 'えん',
      romaji: 'en',
      meaning: 'Yen (Währung)',
      usage: 'Japanische Währung, Geldbeträge',
      category: 'Objekte',
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
      id: 'nichi',
      kanji: '日',
      reading: 'にち / か',
      romaji: 'nichi / ka',
      meaning: 'Tage',
      usage: 'Tage des Monats (Datum) und Zeitdauer in Tagen',
      category: 'Zeit',
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
    },
    {
      id: 'haku',
      kanji: '泊',
      reading: 'はく',
      romaji: 'haku',
      meaning: 'Übernachtungen',
      usage: 'Hotelübernachtungen, Reisedauer in Nächten',
      category: 'Zeit',
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
    }
  ]
};
