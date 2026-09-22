// Original examples for the beginner counting systems, with explicit irregular readings.
module.exports = function numberAdditions() {
  const entries = [];
  function add(word, reading, romaji, meaning, notes, examples) {
    entries.push({ level: 'N5', word, reading, romaji, meaning, type: 'Nomen', category: 'Zahlen', notes,
      examples: examples.map(([japanese, romaji, german], i) => ({ kind: i ? 'natural' : 'teaching', japanese, romaji, german })) });
  }
  for (const [word, reading, romaji, value] of [
    ['一','いち','ichi',1],['二','に','ni',2],['三','さん','san',3],['四','よん','yon',4],
    ['五','ご','go',5],['六','ろく','roku',6],['七','なな','nana',7],['八','はち','hachi',8],['九','きゅう','kyuu',9],['十','じゅう','juu',10],
    ['百','ひゃく','hyaku',100],['千','せん','sen',1000],['万','まん','man',10000]
  ]) {
    const money = value === 10000 ? '一万' : word;
    const moneyRomaji = value === 10000 ? 'ichiman' : romaji;
    add(word, reading, romaji, String(value), 'Zahlen verändern mit Zählwörtern teilweise ihre Lesung. 四 auch し, 七 auch しち, 九 auch く; 10.000 heißt 一万（いちまん）.', [
      [`答えは${word === '万' ? '一万' : word}です。`, `Kotae wa ${value === 10000 ? 'ichiman' : romaji} desu.`, `Die Antwort ist ${value}.`],
      [`あと${money}円足りません。`, `Ato ${moneyRomaji} en tarimasen.`, `Mir fehlen noch ${value} Yen.`]
    ]);
  }
  // Use ordinary purchase prices for the larger numbers.
  for (const item of entries.filter(e => ['千','万'].includes(e.word))) {
    const man = item.word === '万';
    item.examples[1] = { kind:'natural', japanese: man ? 'この時計は一万円です。' : 'この本は千円です。',
      romaji: man ? 'Kono tokei wa ichiman en desu.' : 'Kono hon wa sen en desu.',
      german: man ? 'Diese Uhr kostet 10.000 Yen.' : 'Dieses Buch kostet 1.000 Yen.' };
  }
  for (const [word,reading,romaji,meaning,japanese,r,german] of [
    ['四','し','shi','vier (Lesung し)','四月に日本へ行きます。','Shigatsu ni Nihon e ikimasu.','Im April fahre ich nach Japan.'],
    ['七','しち','shichi','sieben (Lesung しち)','七時に起きます。','Shichiji ni okimasu.','Ich stehe um sieben auf.'],
    ['九','く','ku','neun (Lesung く)','九時に寝ます。','Kuji ni nemasu.','Ich gehe um neun schlafen.']
  ]) add(word,reading,romaji,meaning,'Diese Lesung kommt besonders in festen Zeitangaben vor; die Zahl hat auch eine andere gebräuchliche Lesung.',[
    [japanese,r,german],
    word==='四' ? ['四月は忙しいです。','Shigatsu wa isogashii desu.','Im April habe ich viel zu tun.'] : word==='七' ? ['七月は暑いです。','Shichigatsu wa atsui desu.','Im Juli ist es heiß.'] : ['九月に学校が始まります。','Kugatsu ni gakkou ga hajimarimasu.','Im September beginnt die Schule.']
  ]);
  for (const [word, reading, romaji, number] of [
    ['二日','ふつか','futsuka',2],['三日','みっか','mikka',3],['四日','よっか','yokka',4],['五日','いつか','itsuka',5],
    ['六日','むいか','muika',6],['七日','なのか','nanoka',7],['八日','ようか','youka',8],['九日','ここのか','kokonoka',9],
    ['十日','とおか','tooka',10],['二十日','はつか','hatsuka',20]
  ]) add(word, reading, romaji, `${number}. Tag des Monats; ${number} Tage`, 'Diese unregelmäßige Lesung gilt sowohl für das Datum als auch für die Dauer.', [
    [`今日は五月${word}です。`, `Kyou wa gogatsu ${romaji} desu.`, `Heute ist der ${number}. Mai.`],
    [`旅行は${word}かかります。`, `Ryokou wa ${romaji} kakarimasu.`, `Die Reise dauert ${number} Tage.`]
  ]);
  for (const [word,reading,romaji,number] of [['四つ','よっつ','yottsu',4],['五つ','いつつ','itsutsu',5],['六つ','むっつ','muttsu',6],['七つ','ななつ','nanatsu',7],['八つ','やっつ','yattsu',8],['九つ','ここのつ','kokonotsu',9]]) {
    add(word,reading,romaji,`${number} Stück`,'Allgemeines Zählen mit ～つ; nicht für Personen verwenden.',[
      [`りんごを${word}ください。`,`Ringo o ${romaji} kudasai.`,`Ich hätte gern ${number} Äpfel.`],
      [`机の上に箱が${word}あります。`,`Tsukue no ue ni hako ga ${romaji} arimasu.`,`Auf dem Tisch stehen ${number} Schachteln.`]
    ]);
  }
  add('零','れい','rei','null','Neben ゼロ verwendete Lesung, etwa bei Temperaturen.',[
    ['今日は零度です。','Kyou wa reido desu.','Heute sind es null Grad.'],['零から数えてください。','Rei kara kazoete kudasai.','Zählen Sie bitte ab null.']]);
  add('ゼロ','ゼロ','zero','null','Die geläufige Lehnwortform für null.',[
    ['残りはゼロです。','Nokori wa zero desu.','Es bleibt nichts übrig.'],['気温はゼロ度です。','Kion wa zerodo desu.','Die Temperatur beträgt null Grad.']]);
  return entries;
};
