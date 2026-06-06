// Reading passages / Lesestücke Data
// ------------------------------------------------------------
// Each passage is pre-tokenized: every sentence is an array of tokens so the
// reader can render per-word furigana, tap-to-gloss popovers and sentence-level
// audio without a runtime Japanese tokenizer.
//
// Token shape:
//   { s: surface }                         -> plain kana word/particle
//   { s: surface, r: reading }             -> word containing kanji (r = full reading, used for furigana)
//   { s: surface, r: reading, g: gloss }   -> + German gloss shown in the tap popover
//   { s: surface, g: gloss }               -> kana word/particle with a gloss
//   { s: '、', p: true }                   -> punctuation (not tappable, no gloss)
//
// Sentence shape:
//   { tokens: [...], jp: 'full plain text', romaji: '...', de: 'German translation' }
//
// wordCount and minutes are derived at load time (see prepareItem in section-configs.js).

window.READING_DATA = [
  {
    "id": "r-yoru-no-toshokan",
    "title": "よるの としょかん",
    "titleReading": "よるのとしょかん",
    "titleDe": "Die Bibliothek in der Nacht",
    "level": "N4",
    "category": "Geschichte",
    "summary": "Eine kleine Bibliothek am Stadtrand ist tagsüber leer – doch nachts kommt eine Katze, die Bücher liebt.",
    "sentences": [
      {
        "tokens": [
          { "s": "これ", "g": "dies" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "ちいさな", "g": "klein" },
          { "s": "まち", "g": "Stadt" },
          { "s": "の", "g": "(von)" },
          { "s": "お話", "r": "おはなし", "g": "Geschichte" },
          { "s": "です", "g": "ist" },
          { "s": "。", "p": true }
        ],
        "jp": "これはちいさなまちのお話です。",
        "romaji": "Kore wa chiisana machi no ohanashi desu.",
        "de": "Dies ist die Geschichte einer kleinen Stadt."
      },
      {
        "tokens": [
          { "s": "まち", "g": "Stadt" },
          { "s": "の", "g": "(von)" },
          { "s": "はずれ", "g": "Rand" },
          { "s": "に", "g": "(an/in)" },
          { "s": "、", "p": true },
          { "s": "ふるい", "g": "alt" },
          { "s": "としょかん", "g": "Bibliothek" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "あります", "g": "gibt es" },
          { "s": "。", "p": true }
        ],
        "jp": "まちのはずれに、ふるいとしょかんがあります。",
        "romaji": "Machi no hazure ni, furui toshokan ga arimasu.",
        "de": "Am Rand der Stadt gibt es eine alte Bibliothek."
      },
      {
        "tokens": [
          { "s": "ひるま", "g": "Tagsüber" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "だれも", "g": "niemand" },
          { "s": "いません", "g": "ist nicht (da)" },
          { "s": "。", "p": true }
        ],
        "jp": "ひるまはだれもいません。",
        "romaji": "Hiruma wa daremo imasen.",
        "de": "Tagsüber ist niemand da."
      },
      {
        "tokens": [
          { "s": "でも", "g": "aber" },
          { "s": "、", "p": true },
          { "s": "よる", "g": "Nacht" },
          { "s": "に", "g": "(zu)" },
          { "s": "なる", "g": "werden" },
          { "s": "と", "g": "wenn" },
          { "s": "、", "p": true },
          { "s": "一ぴき", "r": "いっぴき", "g": "ein (Tier)" },
          { "s": "の", "g": "(von)" },
          { "s": "ねこ", "g": "Katze" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "やって", "g": "kommend" },
          { "s": "きます", "g": "kommt" },
          { "s": "。", "p": true }
        ],
        "jp": "でも、よるになると、一ぴきのねこがやってきます。",
        "romaji": "Demo, yoru ni naru to, ippiki no neko ga yatte kimasu.",
        "de": "Aber wenn es Nacht wird, kommt eine Katze."
      },
      {
        "tokens": [
          { "s": "ねこ", "g": "Katze" },
          { "s": "の", "g": "(von)" },
          { "s": "名前", "r": "なまえ", "g": "Name" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "トラ", "g": "Tora (Name)" },
          { "s": "です", "g": "ist" },
          { "s": "。", "p": true }
        ],
        "jp": "ねこの名前はトラです。",
        "romaji": "Neko no namae wa Tora desu.",
        "de": "Der Name der Katze ist Tora."
      },
      {
        "tokens": [
          { "s": "トラ", "g": "Tora" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "本", "r": "ほん", "g": "Buch / Bücher" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "大すき", "r": "だいすき", "g": "sehr mögen" },
          { "s": "です", "g": "ist" },
          { "s": "。", "p": true }
        ],
        "jp": "トラは本が大すきです。",
        "romaji": "Tora wa hon ga daisuki desu.",
        "de": "Tora liebt Bücher über alles."
      },
      {
        "tokens": [
          { "s": "まいばん", "g": "jeden Abend" },
          { "s": "、", "p": true },
          { "s": "トラ", "g": "Tora" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "しずかに", "g": "leise" },
          { "s": "本", "r": "ほん", "g": "Buch" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "よみます", "g": "liest" },
          { "s": "。", "p": true }
        ],
        "jp": "まいばん、トラはしずかに本をよみます。",
        "romaji": "Maiban, Tora wa shizuka ni hon o yomimasu.",
        "de": "Jeden Abend liest Tora leise in einem Buch."
      },
      {
        "tokens": [
          { "s": "ときどき", "g": "manchmal" },
          { "s": "、", "p": true },
          { "s": "ちいさな", "g": "klein" },
          { "s": "ねずみ", "g": "Maus" },
          { "s": "も", "g": "auch" },
          { "s": "きて", "g": "kommt und" },
          { "s": "、", "p": true },
          { "s": "いっしょに", "g": "zusammen" },
          { "s": "よみます", "g": "liest" },
          { "s": "。", "p": true }
        ],
        "jp": "ときどき、ちいさなねずみもきて、いっしょによみます。",
        "romaji": "Tokidoki, chiisana nezumi mo kite, issho ni yomimasu.",
        "de": "Manchmal kommt auch eine kleine Maus und liest mit."
      },
      {
        "tokens": [
          { "s": "「", "p": true },
          { "s": "この", "g": "diese" },
          { "s": "話", "r": "はなし", "g": "Geschichte" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "おもしろい", "g": "interessant" },
          { "s": "ね", "g": "nicht wahr" },
          { "s": "」", "p": true },
          { "s": "と", "g": "(Zitat)" },
          { "s": "トラ", "g": "Tora" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "いいました", "g": "sagte" },
          { "s": "。", "p": true }
        ],
        "jp": "「この話はおもしろいね」とトラがいいました。",
        "romaji": "„Kono hanashi wa omoshiroi ne“ to Tora ga iimashita.",
        "de": "„Diese Geschichte ist interessant, nicht wahr?“, sagte Tora."
      },
      {
        "tokens": [
          { "s": "ねずみ", "g": "Maus" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "うなずいて", "g": "nickte und" },
          { "s": "、", "p": true },
          { "s": "にっこり", "g": "(ein Lächeln)" },
          { "s": "わらいました", "g": "lächelte" },
          { "s": "。", "p": true }
        ],
        "jp": "ねずみはうなずいて、にっこりわらいました。",
        "romaji": "Nezumi wa unazuite, nikkori waraimashita.",
        "de": "Die Maus nickte und lächelte fröhlich."
      },
      {
        "tokens": [
          { "s": "あさ", "g": "Morgen" },
          { "s": "に", "g": "(zu)" },
          { "s": "なる", "g": "werden" },
          { "s": "と", "g": "wenn" },
          { "s": "、", "p": true },
          { "s": "二ひき", "r": "にひき", "g": "zwei (Tiere)" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "また", "g": "wieder" },
          { "s": "どこか", "g": "irgendwohin" },
          { "s": "へ", "g": "(Richtung)" },
          { "s": "いきます", "g": "gehen" },
          { "s": "。", "p": true }
        ],
        "jp": "あさになると、二ひきはまたどこかへいきます。",
        "romaji": "Asa ni naru to, nihiki wa mata dokoka e ikimasu.",
        "de": "Wenn der Morgen kommt, gehen die beiden wieder irgendwohin."
      },
      {
        "tokens": [
          { "s": "でも", "g": "aber" },
          { "s": "、", "p": true },
          { "s": "つぎ", "g": "nächste" },
          { "s": "の", "g": "(von)" },
          { "s": "よる", "g": "Nacht" },
          { "s": "も", "g": "auch" },
          { "s": "、", "p": true },
          { "s": "としょかん", "g": "Bibliothek" },
          { "s": "で", "g": "(an/in)" },
          { "s": "あいましょう", "g": "lass uns treffen" },
          { "s": "。", "p": true }
        ],
        "jp": "でも、つぎのよるも、としょかんであいましょう。",
        "romaji": "Demo, tsugi no yoru mo, toshokan de aimashou.",
        "de": "Doch auch in der nächsten Nacht – treffen wir uns in der Bibliothek."
      }
    ]
  },
  {
    "id": "r-watashi-no-asa",
    "title": "わたしの あさ",
    "titleReading": "わたしのあさ",
    "titleDe": "Mein Morgen",
    "level": "N5",
    "category": "Alltag",
    "summary": "Ein einfacher Text über den Tagesbeginn: aufstehen, frühstücken und zur Schule fahren.",
    "sentences": [
      {
        "tokens": [
          { "s": "わたし", "g": "ich" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "まいあさ", "g": "jeden Morgen" },
          { "s": "六時", "r": "ろくじ", "g": "6 Uhr" },
          { "s": "に", "g": "(um)" },
          { "s": "おきます", "g": "stehe auf" },
          { "s": "。", "p": true }
        ],
        "jp": "わたしはまいあさ六時におきます。",
        "romaji": "Watashi wa maiasa rokuji ni okimasu.",
        "de": "Ich stehe jeden Morgen um 6 Uhr auf."
      },
      {
        "tokens": [
          { "s": "かお", "g": "Gesicht" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "あらって", "g": "wasche und" },
          { "s": "、", "p": true },
          { "s": "ごはん", "g": "Essen / Reis" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "たべます", "g": "esse" },
          { "s": "。", "p": true }
        ],
        "jp": "かおをあらって、ごはんをたべます。",
        "romaji": "Kao o aratte, gohan o tabemasu.",
        "de": "Ich wasche mein Gesicht und esse etwas."
      },
      {
        "tokens": [
          { "s": "それから", "g": "danach" },
          { "s": "、", "p": true },
          { "s": "がっこう", "g": "Schule" },
          { "s": "へ", "g": "(Richtung)" },
          { "s": "いきます", "g": "gehe" },
          { "s": "。", "p": true }
        ],
        "jp": "それから、がっこうへいきます。",
        "romaji": "Sorekara, gakkou e ikimasu.",
        "de": "Danach gehe ich zur Schule."
      },
      {
        "tokens": [
          { "s": "でんしゃ", "g": "Zug" },
          { "s": "の", "g": "(von)" },
          { "s": "中", "r": "なか", "g": "in / Inneres" },
          { "s": "で", "g": "(in)" },
          { "s": "、", "p": true },
          { "s": "本", "r": "ほん", "g": "Buch" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "よみます", "g": "lese" },
          { "s": "。", "p": true }
        ],
        "jp": "でんしゃの中で、本をよみます。",
        "romaji": "Densha no naka de, hon o yomimasu.",
        "de": "Im Zug lese ich ein Buch."
      },
      {
        "tokens": [
          { "s": "がっこう", "g": "Schule" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "とても", "g": "sehr" },
          { "s": "たのしい", "g": "spaßig" },
          { "s": "です", "g": "ist" },
          { "s": "。", "p": true }
        ],
        "jp": "がっこうはとてもたのしいです。",
        "romaji": "Gakkou wa totemo tanoshii desu.",
        "de": "Die Schule macht großen Spaß."
      },
      {
        "tokens": [
          { "s": "ともだち", "g": "Freund(e)" },
          { "s": "と", "g": "mit" },
          { "s": "はなす", "g": "reden" },
          { "s": "の", "g": "(Nominalisierung)" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "すき", "g": "mögen" },
          { "s": "です", "g": "ist" },
          { "s": "。", "p": true }
        ],
        "jp": "ともだちとはなすのがすきです。",
        "romaji": "Tomodachi to hanasu no ga suki desu.",
        "de": "Ich rede gern mit meinen Freunden."
      }
    ]
  }
];
