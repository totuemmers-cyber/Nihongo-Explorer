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
  },
  {
    "id": "r-resutoran-de",
    "title": "レストランで",
    "titleReading": "レストランで",
    "titleDe": "Im Restaurant",
    "level": "N5",
    "category": "Essen",
    "summary": "Mit einem Freund im Restaurant – auswählen, bestellen und bezahlen. Übt Essensvokabular, Zahlen und höfliche Bestellungen.",
    "sentences": [
      {
        "tokens": [
          { "s": "今日", "r": "きょう", "g": "heute" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "ともだち", "g": "Freund" },
          { "s": "と", "g": "mit" },
          { "s": "レストラン", "g": "Restaurant" },
          { "s": "へ", "g": "(Richtung)" },
          { "s": "行きました", "r": "いきました", "g": "ging / gegangen" },
          { "s": "。", "p": true }
        ],
        "jp": "今日はともだちとレストランへ行きました。",
        "romaji": "Kyou wa tomodachi to resutoran e ikimashita.",
        "de": "Heute bin ich mit einem Freund in ein Restaurant gegangen."
      },
      {
        "tokens": [
          { "s": "メニュー", "g": "Speisekarte" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "見て", "r": "みて", "g": "ansehen und" },
          { "s": "、", "p": true },
          { "s": "りょうり", "g": "Gericht / Essen" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "えらびました", "g": "wählte aus" },
          { "s": "。", "p": true }
        ],
        "jp": "メニューを見て、りょうりをえらびました。",
        "romaji": "Menyuu o mite, ryouri o erabimashita.",
        "de": "Wir sahen die Speisekarte an und wählten Gerichte aus."
      },
      {
        "tokens": [
          { "s": "わたし", "g": "ich" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "すし", "g": "Sushi" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "たべたかった", "g": "wollte essen" },
          { "s": "です", "g": "(höflich)" },
          { "s": "。", "p": true }
        ],
        "jp": "わたしはすしをたべたかったです。",
        "romaji": "Watashi wa sushi o tabetakatta desu.",
        "de": "Ich wollte Sushi essen."
      },
      {
        "tokens": [
          { "s": "「", "p": true },
          { "s": "すみません", "g": "Entschuldigung" },
          { "s": "、", "p": true },
          { "s": "おすし", "g": "Sushi (höflich)" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "ください", "g": "bitte (geben Sie)" },
          { "s": "。", "p": true },
          { "s": "」", "p": true }
        ],
        "jp": "「すみません、おすしをください。」",
        "romaji": "“Sumimasen, osushi o kudasai.”",
        "de": "„Entschuldigung, Sushi bitte.“"
      },
      {
        "tokens": [
          { "s": "ともだち", "g": "Freund" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "ラーメン", "g": "Ramen" },
          { "s": "と", "g": "und" },
          { "s": "おちゃ", "g": "Tee" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "たのみました", "g": "bestellte" },
          { "s": "。", "p": true }
        ],
        "jp": "ともだちはラーメンとおちゃをたのみました。",
        "romaji": "Tomodachi wa raamen to ocha o tanomimashita.",
        "de": "Mein Freund bestellte Ramen und Tee."
      },
      {
        "tokens": [
          { "s": "りょうり", "g": "Essen" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "とても", "g": "sehr" },
          { "s": "おいしかった", "g": "war lecker" },
          { "s": "です", "g": "(höflich)" },
          { "s": "。", "p": true }
        ],
        "jp": "りょうりはとてもおいしかったです。",
        "romaji": "Ryouri wa totemo oishikatta desu.",
        "de": "Das Essen war sehr lecker."
      },
      {
        "tokens": [
          { "s": "ぜんぶ", "g": "alles / insgesamt" },
          { "s": "で", "g": "(zusammen)" },
          { "s": "二千円", "r": "にせんえん", "g": "2000 Yen" },
          { "s": "でした", "g": "war" },
          { "s": "。", "p": true }
        ],
        "jp": "ぜんぶで二千円でした。",
        "romaji": "Zenbu de nisen-en deshita.",
        "de": "Insgesamt waren es 2000 Yen."
      },
      {
        "tokens": [
          { "s": "また", "g": "wieder" },
          { "s": "この", "g": "dieses" },
          { "s": "みせ", "g": "Lokal / Laden" },
          { "s": "に", "g": "(zu)" },
          { "s": "来たい", "r": "きたい", "g": "möchte kommen" },
          { "s": "です", "g": "(höflich)" },
          { "s": "。", "p": true }
        ],
        "jp": "またこのみせに来たいです。",
        "romaji": "Mata kono mise ni kitai desu.",
        "de": "Ich möchte wieder in dieses Lokal kommen."
      }
    ]
  },
  {
    "id": "r-nihon-no-kisetsu",
    "title": "日本の きせつ",
    "titleReading": "にほんのきせつ",
    "titleDe": "Die Jahreszeiten Japans",
    "level": "N5",
    "category": "Natur",
    "summary": "Frühling, Sommer, Herbst und Winter: ein kleiner Überblick über Japans vier Jahreszeiten und ihr typisches Wetter.",
    "sentences": [
      {
        "tokens": [
          { "s": "日本", "r": "にほん", "g": "Japan" },
          { "s": "に", "g": "(in)" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "四つ", "r": "よっつ", "g": "vier" },
          { "s": "の", "g": "(von)" },
          { "s": "きせつ", "g": "Jahreszeit(en)" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "あります", "g": "gibt es" },
          { "s": "。", "p": true }
        ],
        "jp": "日本には四つのきせつがあります。",
        "romaji": "Nihon ni wa yottsu no kisetsu ga arimasu.",
        "de": "In Japan gibt es vier Jahreszeiten."
      },
      {
        "tokens": [
          { "s": "春", "r": "はる", "g": "Frühling" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "あたたかくて", "g": "warm und" },
          { "s": "、", "p": true },
          { "s": "花", "r": "はな", "g": "Blume(n)" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "さきます", "g": "blühen" },
          { "s": "。", "p": true }
        ],
        "jp": "春はあたたかくて、花がさきます。",
        "romaji": "Haru wa atatakakute, hana ga sakimasu.",
        "de": "Der Frühling ist warm, und Blumen blühen."
      },
      {
        "tokens": [
          { "s": "夏", "r": "なつ", "g": "Sommer" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "とても", "g": "sehr" },
          { "s": "あつい", "g": "heiß" },
          { "s": "です", "g": "(höflich)" },
          { "s": "。", "p": true }
        ],
        "jp": "夏はとてもあついです。",
        "romaji": "Natsu wa totemo atsui desu.",
        "de": "Der Sommer ist sehr heiß."
      },
      {
        "tokens": [
          { "s": "子どもたち", "r": "こどもたち", "g": "Kinder" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "うみ", "g": "Meer" },
          { "s": "で", "g": "(in / an)" },
          { "s": "およぎます", "g": "schwimmen" },
          { "s": "。", "p": true }
        ],
        "jp": "子どもたちはうみでおよぎます。",
        "romaji": "Kodomo-tachi wa umi de oyogimasu.",
        "de": "Die Kinder schwimmen im Meer."
      },
      {
        "tokens": [
          { "s": "秋", "r": "あき", "g": "Herbst" },
          { "s": "に", "g": "(zu)" },
          { "s": "なる", "g": "werden" },
          { "s": "と", "g": "wenn" },
          { "s": "、", "p": true },
          { "s": "はっぱ", "g": "Blätter" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "あかく", "g": "rot" },
          { "s": "なります", "g": "werden" },
          { "s": "。", "p": true }
        ],
        "jp": "秋になると、はっぱがあかくなります。",
        "romaji": "Aki ni naru to, happa ga akaku narimasu.",
        "de": "Wenn der Herbst kommt, werden die Blätter rot."
      },
      {
        "tokens": [
          { "s": "冬", "r": "ふゆ", "g": "Winter" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "さむくて", "g": "kalt und" },
          { "s": "、", "p": true },
          { "s": "ゆき", "g": "Schnee" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "ふります", "g": "fällt" },
          { "s": "。", "p": true }
        ],
        "jp": "冬はさむくて、ゆきがふります。",
        "romaji": "Fuyu wa samukute, yuki ga furimasu.",
        "de": "Der Winter ist kalt, und es schneit."
      },
      {
        "tokens": [
          { "s": "わたし", "g": "ich" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "春", "r": "はる", "g": "Frühling" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "いちばん", "g": "am meisten" },
          { "s": "好き", "r": "すき", "g": "mögen" },
          { "s": "です", "g": "(höflich)" },
          { "s": "。", "p": true }
        ],
        "jp": "わたしは春がいちばん好きです。",
        "romaji": "Watashi wa haru ga ichiban suki desu.",
        "de": "Ich mag den Frühling am liebsten."
      }
    ]
  },
  {
    "id": "r-watashi-no-kazoku",
    "title": "わたしの かぞく",
    "titleReading": "わたしのかぞく",
    "titleDe": "Meine Familie",
    "level": "N5",
    "category": "Familie",
    "summary": "Eine kurze Vorstellung der eigenen Familie – mit Personenzähler und einfachen Beschreibungen von Charakter und Aussehen.",
    "sentences": [
      {
        "tokens": [
          { "s": "わたし", "g": "ich / mein" },
          { "s": "の", "g": "(von)" },
          { "s": "かぞく", "g": "Familie" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "四人", "r": "よにん", "g": "vier Personen" },
          { "s": "です", "g": "(höflich)" },
          { "s": "。", "p": true }
        ],
        "jp": "わたしのかぞくは四人です。",
        "romaji": "Watashi no kazoku wa yonin desu.",
        "de": "Meine Familie besteht aus vier Personen."
      },
      {
        "tokens": [
          { "s": "父", "r": "ちち", "g": "Vater" },
          { "s": "と", "g": "und" },
          { "s": "母", "r": "はは", "g": "Mutter" },
          { "s": "と", "g": "und" },
          { "s": "妹", "r": "いもうと", "g": "jüngere Schwester" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "います", "g": "gibt es" },
          { "s": "。", "p": true }
        ],
        "jp": "父と母と妹がいます。",
        "romaji": "Chichi to haha to imouto ga imasu.",
        "de": "Es gibt Vater, Mutter und eine jüngere Schwester."
      },
      {
        "tokens": [
          { "s": "父", "r": "ちち", "g": "Vater" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "せ", "g": "Körpergröße" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "たかくて", "g": "groß und" },
          { "s": "、", "p": true },
          { "s": "しんせつ", "g": "freundlich" },
          { "s": "です", "g": "(höflich)" },
          { "s": "。", "p": true }
        ],
        "jp": "父はせがたかくて、しんせつです。",
        "romaji": "Chichi wa se ga takakute, shinsetsu desu.",
        "de": "Mein Vater ist groß und freundlich."
      },
      {
        "tokens": [
          { "s": "母", "r": "はは", "g": "Mutter" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "りょうり", "g": "Kochen" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "じょうず", "g": "gut / geschickt" },
          { "s": "です", "g": "(höflich)" },
          { "s": "。", "p": true }
        ],
        "jp": "母はりょうりがじょうずです。",
        "romaji": "Haha wa ryouri ga jouzu desu.",
        "de": "Meine Mutter kann gut kochen."
      },
      {
        "tokens": [
          { "s": "妹", "r": "いもうと", "g": "jüngere Schwester" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "まだ", "g": "noch" },
          { "s": "小さい", "r": "ちいさい", "g": "klein" },
          { "s": "です", "g": "(höflich)" },
          { "s": "。", "p": true }
        ],
        "jp": "妹はまだ小さいです。",
        "romaji": "Imouto wa mada chiisai desu.",
        "de": "Meine kleine Schwester ist noch klein."
      },
      {
        "tokens": [
          { "s": "わたしたち", "g": "wir" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "いぬ", "g": "Hund" },
          { "s": "も", "g": "auch" },
          { "s": "かっています", "g": "halten (als Haustier)" },
          { "s": "。", "p": true }
        ],
        "jp": "わたしたちはいぬもかっています。",
        "romaji": "Watashi-tachi wa inu mo katte imasu.",
        "de": "Wir haben auch einen Hund."
      },
      {
        "tokens": [
          { "s": "かぞく", "g": "Familie" },
          { "s": "と", "g": "mit" },
          { "s": "いっしょ", "g": "zusammen" },
          { "s": "の", "g": "(von)" },
          { "s": "時間", "r": "じかん", "g": "Zeit" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "大すき", "r": "だいすき", "g": "sehr lieben" },
          { "s": "です", "g": "(höflich)" },
          { "s": "。", "p": true }
        ],
        "jp": "かぞくといっしょの時間が大すきです。",
        "romaji": "Kazoku to issho no jikan ga daisuki desu.",
        "de": "Ich liebe die gemeinsame Zeit mit meiner Familie."
      }
    ]
  },
  {
    "id": "r-kaimono",
    "title": "かいものに いきます",
    "titleReading": "かいものにいきます",
    "titleDe": "Einkaufen gehen",
    "level": "N5",
    "category": "Einkaufen",
    "summary": "Ein Einkauf im Supermarkt von der Liste bis zur Kasse – nützliches Alltags-, Lebensmittel- und Geldvokabular.",
    "sentences": [
      {
        "tokens": [
          { "s": "土曜日", "r": "どようび", "g": "Samstag" },
          { "s": "に", "g": "(an)" },
          { "s": "スーパー", "g": "Supermarkt" },
          { "s": "へ", "g": "(Richtung)" },
          { "s": "かいもの", "g": "Einkaufen" },
          { "s": "に", "g": "(um zu)" },
          { "s": "行きます", "r": "いきます", "g": "gehe" },
          { "s": "。", "p": true }
        ],
        "jp": "土曜日にスーパーへかいものに行きます。",
        "romaji": "Doyoubi ni suupaa e kaimono ni ikimasu.",
        "de": "Am Samstag gehe ich zum Supermarkt einkaufen."
      },
      {
        "tokens": [
          { "s": "やさい", "g": "Gemüse" },
          { "s": "と", "g": "und" },
          { "s": "くだもの", "g": "Obst" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "かいます", "g": "kaufe" },
          { "s": "。", "p": true }
        ],
        "jp": "やさいとくだものをかいます。",
        "romaji": "Yasai to kudamono o kaimasu.",
        "de": "Ich kaufe Gemüse und Obst."
      },
      {
        "tokens": [
          { "s": "りんご", "g": "Apfel" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "一つ", "r": "ひとつ", "g": "ein Stück" },
          { "s": "百円", "r": "ひゃくえん", "g": "100 Yen" },
          { "s": "です", "g": "(höflich)" },
          { "s": "。", "p": true }
        ],
        "jp": "りんごは一つ百円です。",
        "romaji": "Ringo wa hitotsu hyaku-en desu.",
        "de": "Ein Apfel kostet 100 Yen."
      },
      {
        "tokens": [
          { "s": "ぎゅうにゅう", "g": "Milch" },
          { "s": "も", "g": "auch" },
          { "s": "かご", "g": "Korb" },
          { "s": "に", "g": "(in)" },
          { "s": "入れました", "r": "いれました", "g": "legte hinein" },
          { "s": "。", "p": true }
        ],
        "jp": "ぎゅうにゅうもかごに入れました。",
        "romaji": "Gyuunyuu mo kago ni iremashita.",
        "de": "Auch Milch legte ich in den Korb."
      },
      {
        "tokens": [
          { "s": "レジ", "g": "Kasse" },
          { "s": "で", "g": "(an)" },
          { "s": "お金", "r": "おかね", "g": "Geld" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "はらいます", "g": "bezahle" },
          { "s": "。", "p": true }
        ],
        "jp": "レジでお金をはらいます。",
        "romaji": "Reji de okane o haraimasu.",
        "de": "An der Kasse bezahle ich."
      },
      {
        "tokens": [
          { "s": "ふくろ", "g": "Tüte / Beutel" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "いりません", "g": "brauche nicht" },
          { "s": "。", "p": true }
        ],
        "jp": "ふくろはいりません。",
        "romaji": "Fukuro wa irimasen.",
        "de": "Eine Tüte brauche ich nicht."
      },
      {
        "tokens": [
          { "s": "うち", "g": "Zuhause" },
          { "s": "へ", "g": "(Richtung)" },
          { "s": "かえって", "g": "zurückkehren und" },
          { "s": "、", "p": true },
          { "s": "ばんごはん", "g": "Abendessen" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "つくります", "g": "koche / mache" },
          { "s": "。", "p": true }
        ],
        "jp": "うちへかえって、ばんごはんをつくります。",
        "romaji": "Uchi e kaette, bangohan o tsukurimasu.",
        "de": "Ich gehe nach Hause und koche Abendessen."
      }
    ]
  },
  {
    "id": "r-ohanami",
    "title": "おはなみ",
    "titleReading": "おはなみ",
    "titleDe": "Kirschblütenschau (Hanami)",
    "level": "N4",
    "category": "Kultur",
    "summary": "Was ist Hanami? Über die Kirschblüte, warum sie nur so kurz blüht und wie die Menschen in Japan sie gemeinsam feiern.",
    "sentences": [
      {
        "tokens": [
          { "s": "日本", "r": "にほん", "g": "Japan" },
          { "s": "で", "g": "(in)" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "、", "p": true },
          { "s": "春", "r": "はる", "g": "Frühling" },
          { "s": "に", "g": "(zu)" },
          { "s": "なる", "g": "werden" },
          { "s": "と", "g": "wenn" },
          { "s": "おはなみ", "g": "Kirschblütenschau" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "します", "g": "macht man" },
          { "s": "。", "p": true }
        ],
        "jp": "日本では、春になるとおはなみをします。",
        "romaji": "Nihon de wa, haru ni naru to ohanami o shimasu.",
        "de": "In Japan macht man Hanami, wenn der Frühling kommt."
      },
      {
        "tokens": [
          { "s": "おはなみ", "g": "Hanami" },
          { "s": "とは", "g": "bedeutet" },
          { "s": "、", "p": true },
          { "s": "さくら", "g": "Kirschblüte" },
          { "s": "の", "g": "(von)" },
          { "s": "花", "r": "はな", "g": "Blüten" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "見て", "r": "みて", "g": "ansehen und" },
          { "s": "たのしむ", "g": "genießen" },
          { "s": "こと", "g": "(das / Sache)" },
          { "s": "です", "g": "ist" },
          { "s": "。", "p": true }
        ],
        "jp": "おはなみとは、さくらの花を見てたのしむことです。",
        "romaji": "Ohanami to wa, sakura no hana o mite tanoshimu koto desu.",
        "de": "Hanami bedeutet, die Kirschblüten anzusehen und zu genießen."
      },
      {
        "tokens": [
          { "s": "さくら", "g": "Kirschblüte" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "一年", "r": "いちねん", "g": "ein Jahr" },
          { "s": "に", "g": "(pro)" },
          { "s": "一回", "r": "いっかい", "g": "einmal" },
          { "s": "しか", "g": "nur" },
          { "s": "さきません", "g": "blühen nicht" },
          { "s": "。", "p": true }
        ],
        "jp": "さくらは一年に一回しかさきません。",
        "romaji": "Sakura wa ichinen ni ikkai shika sakimasen.",
        "de": "Kirschblüten blühen nur einmal im Jahr."
      },
      {
        "tokens": [
          { "s": "そして", "g": "und dann" },
          { "s": "、", "p": true },
          { "s": "一週間", "r": "いっしゅうかん", "g": "eine Woche" },
          { "s": "ぐらい", "g": "ungefähr" },
          { "s": "で", "g": "(in)" },
          { "s": "ちって", "g": "abfallen und" },
          { "s": "しまいます", "g": "(leider / ganz)" },
          { "s": "。", "p": true }
        ],
        "jp": "そして、一週間ぐらいでちってしまいます。",
        "romaji": "Soshite, isshuukan gurai de chitte shimaimasu.",
        "de": "Und nach etwa einer Woche fallen sie leider ab."
      },
      {
        "tokens": [
          { "s": "だから", "g": "deshalb" },
          { "s": "、", "p": true },
          { "s": "みんな", "g": "alle" },
          { "s": "いそいで", "g": "eilig" },
          { "s": "こうえん", "g": "Park" },
          { "s": "に", "g": "(in)" },
          { "s": "あつまります", "g": "versammeln sich" },
          { "s": "。", "p": true }
        ],
        "jp": "だから、みんないそいでこうえんにあつまります。",
        "romaji": "Dakara, minna isoide kouen ni atsumarimasu.",
        "de": "Deshalb versammeln sich alle eilig im Park."
      },
      {
        "tokens": [
          { "s": "家族", "r": "かぞく", "g": "Familie" },
          { "s": "や", "g": "und (u. a.)" },
          { "s": "友だち", "r": "ともだち", "g": "Freunde" },
          { "s": "と", "g": "mit" },
          { "s": "いっしょに", "g": "zusammen" },
          { "s": "、", "p": true },
          { "s": "おべんとう", "g": "Bento (Lunchbox)" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "たべたり", "g": "essen u. a." },
          { "s": "、", "p": true },
          { "s": "はなしたり", "g": "reden u. a." },
          { "s": "します", "g": "tut man" },
          { "s": "。", "p": true }
        ],
        "jp": "家族や友だちといっしょに、おべんとうをたべたり、はなしたりします。",
        "romaji": "Kazoku ya tomodachi to issho ni, obentou o tabetari, hanashitari shimasu.",
        "de": "Mit Familie und Freunden isst man Bento, unterhält sich und mehr."
      },
      {
        "tokens": [
          { "s": "よる", "g": "abends / Nacht" },
          { "s": "、", "p": true },
          { "s": "ライト", "g": "Licht" },
          { "s": "で", "g": "(mit)" },
          { "s": "さくら", "g": "Kirschblüte" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "てらす", "g": "beleuchten" },
          { "s": "ところ", "g": "Ort" },
          { "s": "も", "g": "auch" },
          { "s": "あります", "g": "gibt es" },
          { "s": "。", "p": true }
        ],
        "jp": "よる、ライトでさくらをてらすところもあります。",
        "romaji": "Yoru, raito de sakura o terasu tokoro mo arimasu.",
        "de": "Es gibt auch Orte, an denen die Kirschblüten abends beleuchtet werden."
      },
      {
        "tokens": [
          { "s": "さくら", "g": "Kirschblüte" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "みじかい", "g": "kurz" },
          { "s": "あいだ", "g": "Zeitraum" },
          { "s": "しか", "g": "nur" },
          { "s": "見られません", "r": "みられません", "g": "kann man nicht sehen" },
          { "s": "が", "g": "aber" },
          { "s": "、", "p": true },
          { "s": "とても", "g": "sehr" },
          { "s": "きれい", "g": "schön" },
          { "s": "です", "g": "(höflich)" },
          { "s": "。", "p": true }
        ],
        "jp": "さくらはみじかいあいだしか見られませんが、とてもきれいです。",
        "romaji": "Sakura wa mijikai aida shika miraremasen ga, totemo kirei desu.",
        "de": "Man kann die Kirschblüten nur kurze Zeit sehen, aber sie sind sehr schön."
      },
      {
        "tokens": [
          { "s": "わたし", "g": "ich" },
          { "s": "も", "g": "auch" },
          { "s": "毎年", "r": "まいとし", "g": "jedes Jahr" },
          { "s": "おはなみ", "g": "Hanami" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "たのしみに", "g": "sich freuen auf" },
          { "s": "しています", "g": "(tue ich)" },
          { "s": "。", "p": true }
        ],
        "jp": "わたしも毎年おはなみをたのしみにしています。",
        "romaji": "Watashi mo maitoshi ohanami o tanoshimi ni shite imasu.",
        "de": "Auch ich freue mich jedes Jahr auf das Hanami."
      }
    ]
  },
  {
    "id": "r-tomodachi-e-no-tegami",
    "title": "ともだちへの てがみ",
    "titleReading": "ともだちへのてがみ",
    "titleDe": "Brief an einen Freund",
    "level": "N4",
    "category": "Brief",
    "summary": "Ein freundschaftlicher Einladungsbrief zu einem Sommerfest – mit typischen Brief-, Einladungs- und Höflichkeitswendungen.",
    "sentences": [
      {
        "tokens": [
          { "s": "ひろし", "g": "Hiroshi (Name)" },
          { "s": "さん", "g": "(Herr / Frau)" },
          { "s": "、", "p": true },
          { "s": "おげんき", "g": "wohlauf" },
          { "s": "です", "g": "(höflich)" },
          { "s": "か", "g": "(Frage)" },
          { "s": "。", "p": true }
        ],
        "jp": "ひろしさん、おげんきですか。",
        "romaji": "Hiroshi-san, ogenki desu ka.",
        "de": "Hiroshi, wie geht es dir?"
      },
      {
        "tokens": [
          { "s": "こちら", "g": "hier" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "さいきん", "g": "in letzter Zeit" },
          { "s": "すずしく", "g": "kühl" },
          { "s": "なって", "g": "werden und" },
          { "s": "きました", "g": "ist geworden" },
          { "s": "。", "p": true }
        ],
        "jp": "こちらはさいきんすずしくなってきました。",
        "romaji": "Kochira wa saikin suzushiku natte kimashita.",
        "de": "Hier ist es in letzter Zeit kühler geworden."
      },
      {
        "tokens": [
          { "s": "ところで", "g": "übrigens" },
          { "s": "、", "p": true },
          { "s": "来月", "r": "らいげつ", "g": "nächster Monat" },
          { "s": "わたし", "g": "ich / mein" },
          { "s": "の", "g": "(von)" },
          { "s": "まち", "g": "Stadt" },
          { "s": "で", "g": "(in)" },
          { "s": "まつり", "g": "Fest" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "あります", "g": "gibt es" },
          { "s": "。", "p": true }
        ],
        "jp": "ところで、来月わたしのまちでまつりがあります。",
        "romaji": "Tokorode, raigetsu watashi no machi de matsuri ga arimasu.",
        "de": "Übrigens, nächsten Monat gibt es in meiner Stadt ein Fest."
      },
      {
        "tokens": [
          { "s": "よかったら", "g": "wenn du magst" },
          { "s": "、", "p": true },
          { "s": "いっしょに", "g": "zusammen" },
          { "s": "行きませんか", "r": "いきませんか", "g": "wollen wir gehen?" },
          { "s": "。", "p": true }
        ],
        "jp": "よかったら、いっしょに行きませんか。",
        "romaji": "Yokattara, issho ni ikimasen ka.",
        "de": "Wenn du magst, wollen wir zusammen hingehen?"
      },
      {
        "tokens": [
          { "s": "まつり", "g": "Fest" },
          { "s": "で", "g": "(auf)" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "、", "p": true },
          { "s": "はなび", "g": "Feuerwerk" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "見る", "r": "みる", "g": "sehen" },
          { "s": "こと", "g": "(das)" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "できます", "g": "kann man" },
          { "s": "。", "p": true }
        ],
        "jp": "まつりでは、はなびを見ることができます。",
        "romaji": "Matsuri de wa, hanabi o miru koto ga dekimasu.",
        "de": "Auf dem Fest kann man ein Feuerwerk sehen."
      },
      {
        "tokens": [
          { "s": "おいしい", "g": "lecker" },
          { "s": "たべもの", "g": "Essen" },
          { "s": "の", "g": "(von)" },
          { "s": "みせ", "g": "Stand / Laden" },
          { "s": "も", "g": "auch" },
          { "s": "たくさん", "g": "viele" },
          { "s": "あります", "g": "gibt es" },
          { "s": "。", "p": true }
        ],
        "jp": "おいしいたべもののみせもたくさんあります。",
        "romaji": "Oishii tabemono no mise mo takusan arimasu.",
        "de": "Es gibt auch viele Stände mit leckerem Essen."
      },
      {
        "tokens": [
          { "s": "もし", "g": "falls" },
          { "s": "来られる", "r": "こられる", "g": "kommen kannst" },
          { "s": "なら", "g": "wenn" },
          { "s": "、", "p": true },
          { "s": "れんらくして", "g": "Bescheid geben" },
          { "s": "ください", "g": "bitte" },
          { "s": "。", "p": true }
        ],
        "jp": "もし来られるなら、れんらくしてください。",
        "romaji": "Moshi korareru nara, renraku shite kudasai.",
        "de": "Falls du kommen kannst, gib mir bitte Bescheid."
      },
      {
        "tokens": [
          { "s": "へんじ", "g": "Antwort" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "たのしみに", "g": "gespannt / freudig" },
          { "s": "まっています", "g": "warte ich" },
          { "s": "。", "p": true }
        ],
        "jp": "へんじをたのしみにまっています。",
        "romaji": "Henji o tanoshimi ni matte imasu.",
        "de": "Ich warte gespannt auf deine Antwort."
      }
    ]
  },
  {
    "id": "r-pengin-no-sekai",
    "title": "ペンギンの せかい",
    "titleReading": "ペンギンのせかい",
    "titleDe": "Die Welt der Pinguine",
    "level": "N4",
    "category": "Tiere",
    "summary": "Ein Sachtext über Pinguine: Vögel, die nicht fliegen können, dafür aber hervorragend schwimmen und gemeinsam leben.",
    "sentences": [
      {
        "tokens": [
          { "s": "ペンギン", "g": "Pinguin" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "とり", "g": "Vogel" },
          { "s": "です", "g": "(höflich)" },
          { "s": "が", "g": "aber" },
          { "s": "、", "p": true },
          { "s": "とぶ", "g": "fliegen" },
          { "s": "こと", "g": "(das)" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "できません", "g": "können nicht" },
          { "s": "。", "p": true }
        ],
        "jp": "ペンギンはとりですが、とぶことができません。",
        "romaji": "Pengin wa tori desu ga, tobu koto ga dekimasen.",
        "de": "Pinguine sind Vögel, aber sie können nicht fliegen."
      },
      {
        "tokens": [
          { "s": "そのかわり", "g": "stattdessen" },
          { "s": "、", "p": true },
          { "s": "海", "r": "うみ", "g": "Meer" },
          { "s": "の", "g": "(von)" },
          { "s": "中", "r": "なか", "g": "Inneres / in" },
          { "s": "を", "g": "(durch)" },
          { "s": "じょうずに", "g": "geschickt" },
          { "s": "およぎます", "g": "schwimmen" },
          { "s": "。", "p": true }
        ],
        "jp": "そのかわり、海の中をじょうずにおよぎます。",
        "romaji": "Sono kawari, umi no naka o jouzu ni oyogimasu.",
        "de": "Stattdessen schwimmen sie geschickt im Meer."
      },
      {
        "tokens": [
          { "s": "ペンギン", "g": "Pinguin" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "つめたい", "g": "kalt" },
          { "s": "ところ", "g": "Ort" },
          { "s": "に", "g": "(an)" },
          { "s": "すんでいる", "g": "lebende" },
          { "s": "もの", "g": "welche / die" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "多い", "r": "おおい", "g": "viele" },
          { "s": "です", "g": "(höflich)" },
          { "s": "。", "p": true }
        ],
        "jp": "ペンギンはつめたいところにすんでいるものが多いです。",
        "romaji": "Pengin wa tsumetai tokoro ni sunde iru mono ga ooi desu.",
        "de": "Viele Pinguine leben an kalten Orten."
      },
      {
        "tokens": [
          { "s": "でも", "g": "aber" },
          { "s": "、", "p": true },
          { "s": "あたたかい", "g": "warm" },
          { "s": "くに", "g": "Land" },
          { "s": "に", "g": "(in)" },
          { "s": "すむ", "g": "leben" },
          { "s": "ペンギン", "g": "Pinguin" },
          { "s": "も", "g": "auch" },
          { "s": "います", "g": "gibt es" },
          { "s": "。", "p": true }
        ],
        "jp": "でも、あたたかいくににすむペンギンもいます。",
        "romaji": "Demo, atatakai kuni ni sumu pengin mo imasu.",
        "de": "Aber es gibt auch Pinguine, die in warmen Ländern leben."
      },
      {
        "tokens": [
          { "s": "おやどり", "g": "Elternvogel" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "たまご", "g": "Ei" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "大切に", "r": "たいせつに", "g": "sorgfältig" },
          { "s": "そだてます", "g": "ziehen auf" },
          { "s": "。", "p": true }
        ],
        "jp": "おやどりはたまごを大切にそだてます。",
        "romaji": "Oyadori wa tamago o taisetsu ni sodatemasu.",
        "de": "Die Elternvögel ziehen ihre Eier sorgfältig auf."
      },
      {
        "tokens": [
          { "s": "赤ちゃん", "r": "あかちゃん", "g": "Baby" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "さむさ", "g": "Kälte" },
          { "s": "から", "g": "vor" },
          { "s": "みを", "g": "sich" },
          { "s": "まもる", "g": "schützen" },
          { "s": "ため", "g": "um zu" },
          { "s": "、", "p": true },
          { "s": "おや", "g": "Eltern" },
          { "s": "の", "g": "(von)" },
          { "s": "足", "r": "あし", "g": "Füße" },
          { "s": "の", "g": "(von)" },
          { "s": "上", "r": "うえ", "g": "auf / oben" },
          { "s": "に", "g": "(auf)" },
          { "s": "のります", "g": "klettern / steigen" },
          { "s": "。", "p": true }
        ],
        "jp": "赤ちゃんはさむさからみをまもるため、おやの足の上にのります。",
        "romaji": "Akachan wa samusa kara mi o mamoru tame, oya no ashi no ue ni norimasu.",
        "de": "Um sich vor der Kälte zu schützen, klettern die Babys auf die Füße der Eltern."
      },
      {
        "tokens": [
          { "s": "ペンギン", "g": "Pinguin" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "なかま", "g": "Artgenossen" },
          { "s": "と", "g": "mit" },
          { "s": "いっしょに", "g": "zusammen" },
          { "s": "くらす", "g": "leben" },
          { "s": "の", "g": "(Nominalisierung)" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "すき", "g": "mögen" },
          { "s": "です", "g": "(höflich)" },
          { "s": "。", "p": true }
        ],
        "jp": "ペンギンはなかまといっしょにくらすのがすきです。",
        "romaji": "Pengin wa nakama to issho ni kurasu no ga suki desu.",
        "de": "Pinguine leben gern zusammen mit ihren Artgenossen."
      },
      {
        "tokens": [
          { "s": "どうぶつえん", "g": "Zoo" },
          { "s": "で", "g": "(in)" },
          { "s": "ペンギン", "g": "Pinguin" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "見る", "r": "みる", "g": "sehen" },
          { "s": "とき", "g": "wenn" },
          { "s": "、", "p": true },
          { "s": "ぜひ", "g": "unbedingt" },
          { "s": "かんさつして", "g": "beobachten und" },
          { "s": "みて", "g": "(einmal) versuchen" },
          { "s": "ください", "g": "bitte" },
          { "s": "。", "p": true }
        ],
        "jp": "どうぶつえんでペンギンを見るとき、ぜひかんさつしてみてください。",
        "romaji": "Doubutsuen de pengin o miru toki, zehi kansatsu shite mite kudasai.",
        "de": "Wenn ihr im Zoo Pinguine seht, beobachtet sie unbedingt einmal genau."
      }
    ]
  },
  {
    "id": "r-hajimete-no-yamanobori",
    "title": "はじめての やまのぼり",
    "titleReading": "はじめてのやまのぼり",
    "titleDe": "Meine erste Bergwanderung",
    "level": "N4",
    "category": "Erlebnis",
    "summary": "Ein persönlicher Bericht über die erste Bergwanderung – anstrengend, aber am Gipfel reich belohnt.",
    "sentences": [
      {
        "tokens": [
          { "s": "せんしゅう", "g": "letzte Woche" },
          { "s": "、", "p": true },
          { "s": "はじめて", "g": "zum ersten Mal" },
          { "s": "山", "r": "やま", "g": "Berg" },
          { "s": "に", "g": "(auf)" },
          { "s": "のぼりました", "g": "stieg hinauf" },
          { "s": "。", "p": true }
        ],
        "jp": "せんしゅう、はじめて山にのぼりました。",
        "romaji": "Senshuu, hajimete yama ni noborimashita.",
        "de": "Letzte Woche bin ich zum ersten Mal auf einen Berg gestiegen."
      },
      {
        "tokens": [
          { "s": "朝", "r": "あさ", "g": "Morgen" },
          { "s": "早く", "r": "はやく", "g": "früh" },
          { "s": "おきて", "g": "aufstehen und" },
          { "s": "、", "p": true },
          { "s": "ともだち", "g": "Freund" },
          { "s": "と", "g": "mit" },
          { "s": "えき", "g": "Bahnhof" },
          { "s": "で", "g": "(an)" },
          { "s": "あいました", "g": "traf" },
          { "s": "。", "p": true }
        ],
        "jp": "朝早くおきて、ともだちとえきであいました。",
        "romaji": "Asa hayaku okite, tomodachi to eki de aimashita.",
        "de": "Ich stand früh auf und traf meinen Freund am Bahnhof."
      },
      {
        "tokens": [
          { "s": "山", "r": "やま", "g": "Berg" },
          { "s": "の", "g": "(von)" },
          { "s": "道", "r": "みち", "g": "Weg" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "おもったより", "g": "als gedacht" },
          { "s": "きびしかった", "g": "war hart" },
          { "s": "です", "g": "(höflich)" },
          { "s": "。", "p": true }
        ],
        "jp": "山の道はおもったよりきびしかったです。",
        "romaji": "Yama no michi wa omotta yori kibishikatta desu.",
        "de": "Der Bergweg war anstrengender, als ich gedacht hatte."
      },
      {
        "tokens": [
          { "s": "とちゅう", "g": "unterwegs" },
          { "s": "で", "g": "(auf)" },
          { "s": "つかれて", "g": "müde werden und" },
          { "s": "、", "p": true },
          { "s": "なんども", "g": "mehrmals" },
          { "s": "やすみました", "g": "machte Pause" },
          { "s": "。", "p": true }
        ],
        "jp": "とちゅうでつかれて、なんどもやすみました。",
        "romaji": "Tochuu de tsukarete, nandomo yasumimashita.",
        "de": "Unterwegs wurde ich müde und machte mehrmals Pause."
      },
      {
        "tokens": [
          { "s": "でも", "g": "aber" },
          { "s": "、", "p": true },
          { "s": "ともだち", "g": "Freund" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "「", "p": true },
          { "s": "がんばろう", "g": "lass uns durchhalten" },
          { "s": "」", "p": true },
          { "s": "と", "g": "(Zitat)" },
          { "s": "言って", "r": "いって", "g": "sagen und" },
          { "s": "くれました", "g": "tat es für mich" },
          { "s": "。", "p": true }
        ],
        "jp": "でも、ともだちが「がんばろう」と言ってくれました。",
        "romaji": "Demo, tomodachi ga „ganbarou“ to itte kuremashita.",
        "de": "Aber mein Freund sagte zu mir: „Lass uns durchhalten.“"
      },
      {
        "tokens": [
          { "s": "三時間", "r": "さんじかん", "g": "drei Stunden" },
          { "s": "あるいて", "g": "gehen und" },
          { "s": "、", "p": true },
          { "s": "やっと", "g": "endlich" },
          { "s": "ちょうじょう", "g": "Gipfel" },
          { "s": "に", "g": "(an)" },
          { "s": "つきました", "g": "kam an" },
          { "s": "。", "p": true }
        ],
        "jp": "三時間あるいて、やっとちょうじょうにつきました。",
        "romaji": "Sanjikan aruite, yatto choujou ni tsukimashita.",
        "de": "Nach drei Stunden Gehen erreichte ich endlich den Gipfel."
      },
      {
        "tokens": [
          { "s": "上", "r": "うえ", "g": "oben" },
          { "s": "から", "g": "von" },
          { "s": "見た", "r": "みた", "g": "gesehene" },
          { "s": "けしき", "g": "Aussicht / Landschaft" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "、", "p": true },
          { "s": "ほんとうに", "g": "wirklich" },
          { "s": "すばらしかった", "g": "war wunderbar" },
          { "s": "です", "g": "(höflich)" },
          { "s": "。", "p": true }
        ],
        "jp": "上から見たけしきは、ほんとうにすばらしかったです。",
        "romaji": "Ue kara mita keshiki wa, hontou ni subarashikatta desu.",
        "de": "Die Aussicht von oben war wirklich wunderbar."
      },
      {
        "tokens": [
          { "s": "つぎ", "g": "nächstes Mal" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "もっと", "g": "noch mehr" },
          { "s": "高い", "r": "たかい", "g": "hoch" },
          { "s": "山", "r": "やま", "g": "Berg" },
          { "s": "に", "g": "(auf)" },
          { "s": "のぼって", "g": "besteigen und" },
          { "s": "みたい", "g": "möchte versuchen" },
          { "s": "です", "g": "(höflich)" },
          { "s": "。", "p": true }
        ],
        "jp": "つぎはもっと高い山にのぼってみたいです。",
        "romaji": "Tsugi wa motto takai yama ni nobotte mitai desu.",
        "de": "Das nächste Mal möchte ich einen noch höheren Berg besteigen."
      }
    ]
  },
  {
    "id": "r-sumaho-to-seikatsu",
    "title": "スマホと わたしたちの せいかつ",
    "titleReading": "スマホとわたしたちのせいかつ",
    "titleDe": "Das Smartphone und unser Leben",
    "level": "N3",
    "category": "Technologie",
    "summary": "Smartphones sind aus dem Alltag nicht mehr wegzudenken – über ihre Vorzüge, ihre Schattenseiten und den richtigen Umgang damit.",
    "sentences": [
      {
        "tokens": [
          { "s": "今", "r": "いま", "g": "jetzt" },
          { "s": "では", "g": "heutzutage" },
          { "s": "、", "p": true },
          { "s": "ほとんど", "g": "fast alle / meist" },
          { "s": "の", "g": "(von)" },
          { "s": "人", "r": "ひと", "g": "Menschen" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "スマートフォン", "g": "Smartphone" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "持っています", "r": "もっています", "g": "besitzen" },
          { "s": "。", "p": true }
        ],
        "jp": "今では、ほとんどの人がスマートフォンを持っています。",
        "romaji": "Ima de wa, hotondo no hito ga sumaatofon o motte imasu.",
        "de": "Heutzutage besitzen die meisten Menschen ein Smartphone."
      },
      {
        "tokens": [
          { "s": "スマホ", "g": "Smartphone (kurz)" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "あれば", "g": "wenn man hat" },
          { "s": "、", "p": true },
          { "s": "いつでも", "g": "jederzeit" },
          { "s": "じょうほう", "g": "Information" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "しらべる", "g": "nachschlagen" },
          { "s": "こと", "g": "(das)" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "できます", "g": "kann man" },
          { "s": "。", "p": true }
        ],
        "jp": "スマホがあれば、いつでもじょうほうをしらべることができます。",
        "romaji": "Sumaho ga areba, itsudemo jouhou o shiraberu koto ga dekimasu.",
        "de": "Wenn man ein Smartphone hat, kann man jederzeit Informationen nachschlagen."
      },
      {
        "tokens": [
          { "s": "でんしゃ", "g": "Zug" },
          { "s": "の", "g": "(von)" },
          { "s": "中", "r": "なか", "g": "Inneres / in" },
          { "s": "でも", "g": "sogar" },
          { "s": "、", "p": true },
          { "s": "ニュース", "g": "Nachrichten" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "読んだり", "r": "よんだり", "g": "lesen u. a." },
          { "s": "、", "p": true },
          { "s": "おんがく", "g": "Musik" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "聞いたり", "r": "きいたり", "g": "hören u. a." },
          { "s": "できます", "g": "kann man" },
          { "s": "。", "p": true }
        ],
        "jp": "でんしゃの中でも、ニュースを読んだり、おんがくを聞いたりできます。",
        "romaji": "Densha no naka demo, nyuusu o yondari, ongaku o kiitari dekimasu.",
        "de": "Sogar im Zug kann man Nachrichten lesen oder Musik hören."
      },
      {
        "tokens": [
          { "s": "また", "g": "außerdem" },
          { "s": "、", "p": true },
          { "s": "とおく", "g": "weit weg" },
          { "s": "に", "g": "(an)" },
          { "s": "いる", "g": "sich befinden" },
          { "s": "友だち", "r": "ともだち", "g": "Freunde" },
          { "s": "と", "g": "mit" },
          { "s": "かんたんに", "g": "einfach" },
          { "s": "れんらく", "g": "Kontakt" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "取れます", "r": "とれます", "g": "kann halten" },
          { "s": "。", "p": true }
        ],
        "jp": "また、とおくにいる友だちとかんたんにれんらくが取れます。",
        "romaji": "Mata, tooku ni iru tomodachi to kantan ni renraku ga toremasu.",
        "de": "Außerdem kann man leicht mit weit entfernten Freunden Kontakt halten."
      },
      {
        "tokens": [
          { "s": "しかし", "g": "jedoch" },
          { "s": "、", "p": true },
          { "s": "べんり", "g": "praktisch" },
          { "s": "な", "g": "(Adj.)" },
          { "s": "いっぽうで", "g": "andererseits" },
          { "s": "、", "p": true },
          { "s": "もんだい", "g": "Problem" },
          { "s": "も", "g": "auch" },
          { "s": "あります", "g": "gibt es" },
          { "s": "。", "p": true }
        ],
        "jp": "しかし、べんりないっぽうで、もんだいもあります。",
        "romaji": "Shikashi, benri na ippou de, mondai mo arimasu.",
        "de": "Doch so praktisch es ist, es gibt auch Probleme."
      },
      {
        "tokens": [
          { "s": "長い", "r": "ながい", "g": "lang" },
          { "s": "時間", "r": "じかん", "g": "Zeit" },
          { "s": "がめん", "g": "Bildschirm" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "見ていると", "r": "みていると", "g": "wenn man ansieht" },
          { "s": "、", "p": true },
          { "s": "目", "r": "め", "g": "Augen" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "つかれて", "g": "ermüden und" },
          { "s": "しまいます", "g": "(leider)" },
          { "s": "。", "p": true }
        ],
        "jp": "長い時間がめんを見ていると、目がつかれてしまいます。",
        "romaji": "Nagai jikan gamen o mite iru to, me ga tsukarete shimaimasu.",
        "de": "Wenn man lange auf den Bildschirm schaut, ermüden die Augen."
      },
      {
        "tokens": [
          { "s": "歩きながら", "r": "あるきながら", "g": "während des Gehens" },
          { "s": "スマホ", "g": "Smartphone" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "使うのは", "r": "つかうのは", "g": "zu benutzen" },
          { "s": "とても", "g": "sehr" },
          { "s": "きけん", "g": "gefährlich" },
          { "s": "です", "g": "(höflich)" },
          { "s": "。", "p": true }
        ],
        "jp": "歩きながらスマホを使うのはとてもきけんです。",
        "romaji": "Aruki nagara sumaho o tsukau no wa totemo kiken desu.",
        "de": "Während des Gehens das Smartphone zu benutzen ist sehr gefährlich."
      },
      {
        "tokens": [
          { "s": "だから", "g": "deshalb" },
          { "s": "、", "p": true },
          { "s": "使う", "r": "つかう", "g": "benutzen" },
          { "s": "時間", "r": "じかん", "g": "Zeit" },
          { "s": "や", "g": "und (u. a.)" },
          { "s": "場所", "r": "ばしょ", "g": "Ort" },
          { "s": "に", "g": "(auf)" },
          { "s": "気", "r": "き", "g": "Aufmerksamkeit" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "つける", "g": "richten" },
          { "s": "ひつよう", "g": "Notwendigkeit" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "あります", "g": "gibt es" },
          { "s": "。", "p": true }
        ],
        "jp": "だから、使う時間や場所に気をつけるひつようがあります。",
        "romaji": "Dakara, tsukau jikan ya basho ni ki o tsukeru hitsuyou ga arimasu.",
        "de": "Deshalb muss man auf Zeit und Ort der Nutzung achten."
      },
      {
        "tokens": [
          { "s": "スマホ", "g": "Smartphone" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "とても", "g": "sehr" },
          { "s": "役に立つ", "r": "やくにたつ", "g": "nützlich" },
          { "s": "どうぐ", "g": "Werkzeug" },
          { "s": "です", "g": "ist" },
          { "s": "が", "g": "aber" },
          { "s": "、", "p": true },
          { "s": "使い方", "r": "つかいかた", "g": "Art der Nutzung" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "大切", "r": "たいせつ", "g": "entscheidend" },
          { "s": "です", "g": "(höflich)" },
          { "s": "。", "p": true }
        ],
        "jp": "スマホはとても役に立つどうぐですが、使い方が大切です。",
        "romaji": "Sumaho wa totemo yaku ni tatsu dougu desu ga, tsukaikata ga taisetsu desu.",
        "de": "Das Smartphone ist ein sehr nützliches Werkzeug, aber die Art der Nutzung ist entscheidend."
      }
    ]
  },
  {
    "id": "r-densha-no-manaa",
    "title": "電車の マナー",
    "titleReading": "でんしゃのマナー",
    "titleDe": "Verhalten im Zug",
    "level": "N3",
    "category": "Gesellschaft",
    "summary": "Japans Züge sind berühmt für ihre Pünktlichkeit – und für klare Verhaltensregeln. Ein Überblick über die wichtigsten Umgangsformen.",
    "sentences": [
      {
        "tokens": [
          { "s": "日本", "r": "にほん", "g": "Japan" },
          { "s": "の", "g": "(von)" },
          { "s": "でんしゃ", "g": "Zug" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "時間", "r": "じかん", "g": "Zeit" },
          { "s": "に", "g": "(in Bezug auf)" },
          { "s": "せいかく", "g": "genau / pünktlich" },
          { "s": "な", "g": "(Adj.)" },
          { "s": "こと", "g": "(Sache)" },
          { "s": "で", "g": "(für)" },
          { "s": "ゆうめい", "g": "berühmt" },
          { "s": "です", "g": "(höflich)" },
          { "s": "。", "p": true }
        ],
        "jp": "日本のでんしゃは時間にせいかくなことでゆうめいです。",
        "romaji": "Nihon no densha wa jikan ni seikaku na koto de yuumei desu.",
        "de": "Japans Züge sind dafür bekannt, pünktlich zu sein."
      },
      {
        "tokens": [
          { "s": "でんしゃ", "g": "Zug" },
          { "s": "の", "g": "(von)" },
          { "s": "中", "r": "なか", "g": "Inneres / in" },
          { "s": "で", "g": "(in)" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "、", "p": true },
          { "s": "いくつか", "g": "einige" },
          { "s": "の", "g": "(von)" },
          { "s": "マナー", "g": "Umgangsformen" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "あります", "g": "gibt es" },
          { "s": "。", "p": true }
        ],
        "jp": "でんしゃの中では、いくつかのマナーがあります。",
        "romaji": "Densha no naka de wa, ikutsuka no manaa ga arimasu.",
        "de": "In den Zügen gibt es einige Verhaltensregeln."
      },
      {
        "tokens": [
          { "s": "まず", "g": "zuerst" },
          { "s": "、", "p": true },
          { "s": "けいたい電話", "r": "けいたいでんわ", "g": "Handy" },
          { "s": "で", "g": "(mit)" },
          { "s": "話しては", "r": "はなしては", "g": "sprechen (Konditional)" },
          { "s": "いけません", "g": "darf man nicht" },
          { "s": "。", "p": true }
        ],
        "jp": "まず、けいたい電話で話してはいけません。",
        "romaji": "Mazu, keitai denwa de hanashite wa ikemasen.",
        "de": "Erstens darf man nicht mit dem Handy telefonieren."
      },
      {
        "tokens": [
          { "s": "メール", "g": "E-Mail" },
          { "s": "や", "g": "oder (u. a.)" },
          { "s": "ゲーム", "g": "Spiele" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "しても", "g": "auch wenn man tut" },
          { "s": "いい", "g": "in Ordnung" },
          { "s": "です", "g": "(höflich)" },
          { "s": "が", "g": "aber" },
          { "s": "、", "p": true },
          { "s": "音", "r": "おと", "g": "Ton" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "消します", "r": "けします", "g": "schaltet aus" },
          { "s": "。", "p": true }
        ],
        "jp": "メールやゲームはしてもいいですが、音を消します。",
        "romaji": "Meeru ya geemu wa shite mo ii desu ga, oto o keshimasu.",
        "de": "Mails oder Spiele sind erlaubt, aber man stellt den Ton aus."
      },
      {
        "tokens": [
          { "s": "こんでいる", "g": "voll / überfüllt sein" },
          { "s": "とき", "g": "wenn" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "、", "p": true },
          { "s": "リュック", "g": "Rucksack" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "前", "r": "まえ", "g": "vorne" },
          { "s": "に", "g": "(nach)" },
          { "s": "持ちます", "r": "もちます", "g": "trägt / hält" },
          { "s": "。", "p": true }
        ],
        "jp": "こんでいるときは、リュックを前に持ちます。",
        "romaji": "Konde iru toki wa, ryukku o mae ni mochimasu.",
        "de": "Wenn es voll ist, trägt man den Rucksack vorne."
      },
      {
        "tokens": [
          { "s": "お年より", "r": "おとしより", "g": "ältere Menschen" },
          { "s": "や", "g": "und (u. a.)" },
          { "s": "からだ", "g": "Körper" },
          { "s": "の", "g": "(von)" },
          { "s": "ふじゆう", "g": "beeinträchtigt" },
          { "s": "な", "g": "(Adj.)" },
          { "s": "人", "r": "ひと", "g": "Menschen" },
          { "s": "には", "g": "(für)" },
          { "s": "、", "p": true },
          { "s": "せき", "g": "Sitzplatz" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "ゆずりましょう", "g": "sollte überlassen" },
          { "s": "。", "p": true }
        ],
        "jp": "お年よりやからだのふじゆうな人には、せきをゆずりましょう。",
        "romaji": "Otoshiyori ya karada no fujiyuu na hito ni wa, seki o yuzurimashou.",
        "de": "Älteren oder körperlich beeinträchtigten Menschen sollte man den Platz überlassen."
      },
      {
        "tokens": [
          { "s": "こういう", "g": "solche" },
          { "s": "マナー", "g": "Umgangsformen" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "まもると", "g": "wenn man befolgt" },
          { "s": "、", "p": true },
          { "s": "みんな", "g": "alle" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "きもちよく", "g": "angenehm" },
          { "s": "すごせます", "g": "können sich aufhalten" },
          { "s": "。", "p": true }
        ],
        "jp": "こういうマナーをまもると、みんながきもちよくすごせます。",
        "romaji": "Kou iu manaa o mamoru to, minna ga kimochiyoku sugosemasu.",
        "de": "Wenn man solche Regeln befolgt, können sich alle wohlfühlen."
      },
      {
        "tokens": [
          { "s": "ルール", "g": "Regeln" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "くに", "g": "Land" },
          { "s": "によって", "g": "je nach" },
          { "s": "ちがう", "g": "unterscheiden sich" },
          { "s": "ので", "g": "weil" },
          { "s": "、", "p": true },
          { "s": "りょこう", "g": "Reise" },
          { "s": "の", "g": "(von)" },
          { "s": "とき", "g": "wenn / beim" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "ちゅういしましょう", "g": "sollte man aufpassen" },
          { "s": "。", "p": true }
        ],
        "jp": "ルールはくにによってちがうので、りょこうのときはちゅういしましょう。",
        "romaji": "Ruuru wa kuni ni yotte chigau node, ryokou no toki wa chuui shimashou.",
        "de": "Da Regeln je nach Land unterschiedlich sind, sollte man auf Reisen aufpassen."
      }
    ]
  },
  {
    "id": "r-kenkou-na-seikatsu",
    "title": "健康な せいかつ",
    "titleReading": "けんこうなせいかつ",
    "titleDe": "Ein gesundes Leben",
    "level": "N3",
    "category": "Gesundheit",
    "summary": "Gesund bleiben beginnt bei den täglichen Gewohnheiten: ausgewogene Ernährung, Bewegung und ausreichend Schlaf.",
    "sentences": [
      {
        "tokens": [
          { "s": "けんこう", "g": "Gesundheit" },
          { "s": "で", "g": "(als)" },
          { "s": "いる", "g": "bleiben" },
          { "s": "ためには", "g": "um zu" },
          { "s": "、", "p": true },
          { "s": "まいにち", "g": "jeden Tag" },
          { "s": "の", "g": "(von)" },
          { "s": "しゅうかん", "g": "Gewohnheit" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "大切", "r": "たいせつ", "g": "wichtig" },
          { "s": "です", "g": "(höflich)" },
          { "s": "。", "p": true }
        ],
        "jp": "けんこうでいるためには、まいにちのしゅうかんが大切です。",
        "romaji": "Kenkou de iru tame ni wa, mainichi no shuukan ga taisetsu desu.",
        "de": "Um gesund zu bleiben, sind die täglichen Gewohnheiten wichtig."
      },
      {
        "tokens": [
          { "s": "まず", "g": "zuerst" },
          { "s": "、", "p": true },
          { "s": "バランス", "g": "Balance" },
          { "s": "の", "g": "(von)" },
          { "s": "よい", "g": "gut" },
          { "s": "食事", "r": "しょくじ", "g": "Mahlzeit" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "する", "g": "machen" },
          { "s": "こと", "g": "(das)" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "きほん", "g": "Grundlage" },
          { "s": "です", "g": "(höflich)" },
          { "s": "。", "p": true }
        ],
        "jp": "まず、バランスのよい食事をすることがきほんです。",
        "romaji": "Mazu, baransu no yoi shokuji o suru koto ga kihon desu.",
        "de": "Erstens ist eine ausgewogene Ernährung die Grundlage."
      },
      {
        "tokens": [
          { "s": "やさい", "g": "Gemüse" },
          { "s": "や", "g": "und (u. a.)" },
          { "s": "くだもの", "g": "Obst" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "たくさん", "g": "viel" },
          { "s": "食べた", "r": "たべた", "g": "essen (Vergangenheit)" },
          { "s": "ほう", "g": "(eher / besser)" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "いい", "g": "besser" },
          { "s": "です", "g": "(höflich)" },
          { "s": "。", "p": true }
        ],
        "jp": "やさいやくだものをたくさん食べたほうがいいです。",
        "romaji": "Yasai ya kudamono o takusan tabeta hou ga ii desu.",
        "de": "Es ist besser, viel Gemüse und Obst zu essen."
      },
      {
        "tokens": [
          { "s": "つぎに", "g": "als Nächstes" },
          { "s": "、", "p": true },
          { "s": "てきど", "g": "moderat / angemessen" },
          { "s": "な", "g": "(Adj.)" },
          { "s": "うんどう", "g": "Bewegung / Sport" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "つづける", "g": "fortsetzen" },
          { "s": "こと", "g": "(das)" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "だいじ", "g": "wichtig" },
          { "s": "です", "g": "(höflich)" },
          { "s": "。", "p": true }
        ],
        "jp": "つぎに、てきどなうんどうをつづけることがだいじです。",
        "romaji": "Tsugi ni, tekido na undou o tsuzukeru koto ga daiji desu.",
        "de": "Als Nächstes ist es wichtig, regelmäßig moderate Bewegung zu machen."
      },
      {
        "tokens": [
          { "s": "エレベーター", "g": "Aufzug" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "使わずに", "r": "つかわずに", "g": "ohne zu benutzen" },
          { "s": "、", "p": true },
          { "s": "かいだん", "g": "Treppe" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "つかう", "g": "benutzen" },
          { "s": "人", "r": "ひと", "g": "Menschen" },
          { "s": "も", "g": "auch" },
          { "s": "います", "g": "gibt es" },
          { "s": "。", "p": true }
        ],
        "jp": "エレベーターを使わずに、かいだんをつかう人もいます。",
        "romaji": "Erebeetaa o tsukawazu ni, kaidan o tsukau hito mo imasu.",
        "de": "Manche benutzen die Treppe, statt den Aufzug zu nehmen."
      },
      {
        "tokens": [
          { "s": "また", "g": "außerdem" },
          { "s": "、", "p": true },
          { "s": "よく", "g": "gut" },
          { "s": "ねむる", "g": "schlafen" },
          { "s": "こと", "g": "(das)" },
          { "s": "も", "g": "auch" },
          { "s": "わすれては", "g": "vergessen (Konditional)" },
          { "s": "いけません", "g": "darf man nicht" },
          { "s": "。", "p": true }
        ],
        "jp": "また、よくねむることもわすれてはいけません。",
        "romaji": "Mata, yoku nemuru koto mo wasurete wa ikemasen.",
        "de": "Außerdem darf man nicht vergessen, gut zu schlafen."
      },
      {
        "tokens": [
          { "s": "すいみん", "g": "Schlaf" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "たりない", "g": "nicht ausreichen" },
          { "s": "と", "g": "wenn" },
          { "s": "、", "p": true },
          { "s": "つぎ", "g": "nächste" },
          { "s": "の", "g": "(von)" },
          { "s": "日", "r": "ひ", "g": "Tag" },
          { "s": "あたま", "g": "Kopf" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "はたらきません", "g": "arbeitet nicht" },
          { "s": "。", "p": true }
        ],
        "jp": "すいみんがたりないと、つぎの日あたまがはたらきません。",
        "romaji": "Suimin ga tarinai to, tsugi no hi atama ga hatarakimasen.",
        "de": "Wenn man zu wenig schläft, arbeitet der Kopf am nächsten Tag nicht."
      },
      {
        "tokens": [
          { "s": "むり", "g": "Überanstrengung" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "せずに", "g": "ohne zu tun" },
          { "s": "、", "p": true },
          { "s": "すこしずつ", "g": "Schritt für Schritt" },
          { "s": "せいかつ", "g": "Leben / Alltag" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "かえて", "g": "ändern und" },
          { "s": "いきましょう", "g": "lass uns (allmählich)" },
          { "s": "。", "p": true }
        ],
        "jp": "むりをせずに、すこしずつせいかつをかえていきましょう。",
        "romaji": "Muri o sezu ni, sukoshizutsu seikatsu o kaete ikimashou.",
        "de": "Ohne sich zu überfordern, sollte man das Leben Schritt für Schritt ändern."
      }
    ]
  },
  {
    "id": "r-hajimete-no-arubaito",
    "title": "はじめての アルバイト",
    "titleReading": "はじめてのアルバイト",
    "titleDe": "Mein erster Nebenjob",
    "level": "N3",
    "category": "Arbeit",
    "summary": "Ein persönlicher Rückblick auf den ersten Nebenjob im Café – von der nervösen Anfangszeit bis zum Gefühl, daran gewachsen zu sein.",
    "sentences": [
      {
        "tokens": [
          { "s": "大学", "r": "だいがく", "g": "Universität" },
          { "s": "に", "g": "(in)" },
          { "s": "入ってから", "r": "はいってから", "g": "nachdem ich eintrat" },
          { "s": "、", "p": true },
          { "s": "はじめて", "g": "zum ersten Mal" },
          { "s": "アルバイト", "g": "Nebenjob" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "はじめました", "g": "begann" },
          { "s": "。", "p": true }
        ],
        "jp": "大学に入ってから、はじめてアルバイトをはじめました。",
        "romaji": "Daigaku ni haitte kara, hajimete arubaito o hajimemashita.",
        "de": "Nachdem ich an die Uni kam, begann ich zum ersten Mal zu jobben."
      },
      {
        "tokens": [
          { "s": "わたし", "g": "ich" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "えらんだ", "g": "wählte" },
          { "s": "の", "g": "(das, was)" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "、", "p": true },
          { "s": "近く", "r": "ちかく", "g": "Nähe" },
          { "s": "の", "g": "(von)" },
          { "s": "カフェ", "g": "Café" },
          { "s": "の", "g": "(von)" },
          { "s": "しごと", "g": "Arbeit" },
          { "s": "です", "g": "(höflich)" },
          { "s": "。", "p": true }
        ],
        "jp": "わたしがえらんだのは、近くのカフェのしごとです。",
        "romaji": "Watashi ga eranda no wa, chikaku no kafe no shigoto desu.",
        "de": "Ich entschied mich für die Arbeit in einem Café in der Nähe."
      },
      {
        "tokens": [
          { "s": "さいしょ", "g": "anfangs" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "、", "p": true },
          { "s": "ちゅうもん", "g": "Bestellung" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "おぼえる", "g": "sich merken" },
          { "s": "の", "g": "(Nominalisierung)" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "たいへん", "g": "mühsam" },
          { "s": "でした", "g": "war" },
          { "s": "。", "p": true }
        ],
        "jp": "さいしょは、ちゅうもんをおぼえるのがたいへんでした。",
        "romaji": "Saisho wa, chuumon o oboeru no ga taihen deshita.",
        "de": "Anfangs war es schwer, sich die Bestellungen zu merken."
      },
      {
        "tokens": [
          { "s": "お客さん", "r": "おきゃくさん", "g": "Gast / Kunde" },
          { "s": "に", "g": "(von)" },
          { "s": "しつもんされても", "g": "selbst wenn gefragt" },
          { "s": "、", "p": true },
          { "s": "うまく", "g": "gut / gekonnt" },
          { "s": "こたえられませんでした", "g": "konnte nicht antworten" },
          { "s": "。", "p": true }
        ],
        "jp": "お客さんにしつもんされても、うまくこたえられませんでした。",
        "romaji": "Okyakusan ni shitsumon sarete mo, umaku kotaeraremasen deshita.",
        "de": "Selbst wenn Gäste mich etwas fragten, konnte ich nicht gut antworten."
      },
      {
        "tokens": [
          { "s": "でも", "g": "aber" },
          { "s": "、", "p": true },
          { "s": "せんぱい", "g": "erfahrene/r Kollege/in" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "ていねいに", "g": "geduldig / sorgfältig" },
          { "s": "おしえて", "g": "beibringen und" },
          { "s": "くれました", "g": "tat es für mich" },
          { "s": "。", "p": true }
        ],
        "jp": "でも、せんぱいがていねいにおしえてくれました。",
        "romaji": "Demo, senpai ga teinei ni oshiete kuremashita.",
        "de": "Aber eine erfahrene Kollegin brachte es mir geduldig bei."
      },
      {
        "tokens": [
          { "s": "なれてくると", "g": "als ich mich gewöhnte" },
          { "s": "、", "p": true },
          { "s": "しごと", "g": "Arbeit" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "だんだん", "g": "allmählich" },
          { "s": "たのしく", "g": "Spaß" },
          { "s": "なりました", "g": "wurde" },
          { "s": "。", "p": true }
        ],
        "jp": "なれてくると、しごとがだんだんたのしくなりました。",
        "romaji": "Narete kuru to, shigoto ga dandan tanoshiku narimashita.",
        "de": "Als ich mich daran gewöhnte, machte die Arbeit allmählich Spaß."
      },
      {
        "tokens": [
          { "s": "はたらいて", "g": "arbeiten und" },
          { "s": "お金", "r": "おかね", "g": "Geld" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "かせぐ", "g": "verdienen" },
          { "s": "の", "g": "(Nominalisierung)" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "かんたん", "g": "einfach" },
          { "s": "では", "g": "(nicht)" },
          { "s": "ありません", "g": "ist nicht" },
          { "s": "。", "p": true }
        ],
        "jp": "はたらいてお金をかせぐのはかんたんではありません。",
        "romaji": "Hataraite okane o kasegu no wa kantan de wa arimasen.",
        "de": "Zu arbeiten und Geld zu verdienen ist nicht einfach."
      },
      {
        "tokens": [
          { "s": "この", "g": "diese" },
          { "s": "けいけん", "g": "Erfahrung" },
          { "s": "で", "g": "(durch)" },
          { "s": "、", "p": true },
          { "s": "わたし", "g": "ich" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "すこし", "g": "ein wenig" },
          { "s": "せいちょうできた", "g": "konnte wachsen" },
          { "s": "と", "g": "(dass)" },
          { "s": "思います", "r": "おもいます", "g": "denke ich" },
          { "s": "。", "p": true }
        ],
        "jp": "このけいけんで、わたしはすこしせいちょうできたと思います。",
        "romaji": "Kono keiken de, watashi wa sukoshi seichou dekita to omoimasu.",
        "de": "Durch diese Erfahrung bin ich, glaube ich, ein wenig gewachsen."
      }
    ]
  },
  {
    "id": "r-gomi-to-risaikuru",
    "title": "ごみと リサイクル",
    "titleReading": "ごみとリサイクル",
    "titleDe": "Müll und Recycling",
    "level": "N3",
    "category": "Umwelt",
    "summary": "Mülltrennung gehört in Japan zum Alltag. Wie das System funktioniert und warum die Bemühung jedes Einzelnen zählt.",
    "sentences": [
      {
        "tokens": [
          { "s": "日本", "r": "にほん", "g": "Japan" },
          { "s": "で", "g": "(in)" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "、", "p": true },
          { "s": "ごみ", "g": "Müll" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "いくつか", "g": "einige" },
          { "s": "の", "g": "(von)" },
          { "s": "しゅるい", "g": "Arten" },
          { "s": "に", "g": "(in)" },
          { "s": "分けます", "r": "わけます", "g": "trennt / teilt" },
          { "s": "。", "p": true }
        ],
        "jp": "日本では、ごみをいくつかのしゅるいに分けます。",
        "romaji": "Nihon de wa, gomi o ikutsuka no shurui ni wakemasu.",
        "de": "In Japan trennt man Müll in mehrere Arten."
      },
      {
        "tokens": [
          { "s": "もえる", "g": "brennbar" },
          { "s": "ごみ", "g": "Müll" },
          { "s": "と", "g": "und" },
          { "s": "もえない", "g": "nicht brennbar" },
          { "s": "ごみ", "g": "Müll" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "、", "p": true },
          { "s": "べつべつに", "g": "getrennt" },
          { "s": "出します", "r": "だします", "g": "gibt heraus" },
          { "s": "。", "p": true }
        ],
        "jp": "もえるごみともえないごみは、べつべつに出します。",
        "romaji": "Moeru gomi to moenai gomi wa, betsubetsu ni dashimasu.",
        "de": "Brennbaren und nicht brennbaren Müll gibt man getrennt heraus."
      },
      {
        "tokens": [
          { "s": "ペットボトル", "g": "PET-Flasche" },
          { "s": "や", "g": "und (u. a.)" },
          { "s": "かん", "g": "Dose" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "、", "p": true },
          { "s": "リサイクルされます", "g": "werden recycelt" },
          { "s": "。", "p": true }
        ],
        "jp": "ペットボトルやかんは、リサイクルされます。",
        "romaji": "Pettobotoru ya kan wa, risaikuru saremasu.",
        "de": "PET-Flaschen und Dosen werden recycelt."
      },
      {
        "tokens": [
          { "s": "分け方", "r": "わけかた", "g": "Art der Trennung" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "、", "p": true },
          { "s": "まち", "g": "Stadt" },
          { "s": "によって", "g": "je nach" },
          { "s": "きめられています", "g": "ist festgelegt" },
          { "s": "。", "p": true }
        ],
        "jp": "分け方は、まちによってきめられています。",
        "romaji": "Wakekata wa, machi ni yotte kimerarete imasu.",
        "de": "Wie getrennt wird, ist je nach Stadt festgelegt."
      },
      {
        "tokens": [
          { "s": "ルール", "g": "Regeln" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "まもらないと", "g": "wenn man nicht befolgt" },
          { "s": "、", "p": true },
          { "s": "ごみ", "g": "Müll" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "持っていって", "r": "もっていって", "g": "mitnehmen" },
          { "s": "もらえません", "g": "wird nicht (für einen) getan" },
          { "s": "。", "p": true }
        ],
        "jp": "ルールをまもらないと、ごみを持っていってもらえません。",
        "romaji": "Ruuru o mamoranai to, gomi o motte itte moraemasen.",
        "de": "Wenn man die Regeln nicht befolgt, wird der Müll nicht abgeholt."
      },
      {
        "tokens": [
          { "s": "さいきん", "g": "in letzter Zeit" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "、", "p": true },
          { "s": "ごみ", "g": "Müll" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "へらす", "g": "reduzieren" },
          { "s": "こと", "g": "(das)" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "もとめられています", "g": "wird gefordert" },
          { "s": "。", "p": true }
        ],
        "jp": "さいきんは、ごみをへらすことがもとめられています。",
        "romaji": "Saikin wa, gomi o herasu koto ga motomerarete imasu.",
        "de": "In letzter Zeit wird gefordert, Müll zu reduzieren."
      },
      {
        "tokens": [
          { "s": "かいもの", "g": "Einkaufen" },
          { "s": "の", "g": "(von)" },
          { "s": "とき", "g": "beim" },
          { "s": "、", "p": true },
          { "s": "ふくろ", "g": "Tüte" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "もらわない", "g": "nicht nehmen" },
          { "s": "人", "r": "ひと", "g": "Menschen" },
          { "s": "も", "g": "auch" },
          { "s": "ふえました", "g": "nahmen zu" },
          { "s": "。", "p": true }
        ],
        "jp": "かいもののとき、ふくろをもらわない人もふえました。",
        "romaji": "Kaimono no toki, fukuro o morawanai hito mo fuemashita.",
        "de": "Beim Einkaufen gibt es immer mehr Leute, die keine Tüte nehmen."
      },
      {
        "tokens": [
          { "s": "一人ひとり", "r": "ひとりひとり", "g": "jeder Einzelne" },
          { "s": "の", "g": "(von)" },
          { "s": "小さな", "r": "ちいさな", "g": "klein" },
          { "s": "どりょく", "g": "Bemühung" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "、", "p": true },
          { "s": "かんきょう", "g": "Umwelt" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "まもります", "g": "schützt" },
          { "s": "。", "p": true }
        ],
        "jp": "一人ひとりの小さなどりょくが、かんきょうをまもります。",
        "romaji": "Hitori hitori no chiisana doryoku ga, kankyou o mamorimasu.",
        "de": "Die kleinen Bemühungen jedes Einzelnen schützen die Umwelt."
      }
    ]
  },
  {
    "id": "r-jinkou-chinou-to-shakai",
    "title": "人工知能と わたしたちの 社会",
    "titleReading": "じんこうちのうとわたしたちのしゃかい",
    "titleDe": "Künstliche Intelligenz und unsere Gesellschaft",
    "level": "N2",
    "category": "Technologie",
    "summary": "Künstliche Intelligenz verändert die Welt rasant – über ihren Nutzen, die Sorge um Arbeitsplätze und die Frage, wer am Ende entscheidet.",
    "sentences": [
      {
        "tokens": [
          { "s": "近年", "r": "きんねん", "g": "in den letzten Jahren" },
          { "s": "、", "p": true },
          { "s": "人工知能", "r": "じんこうちのう", "g": "künstliche Intelligenz" },
          { "s": "、", "p": true },
          { "s": "つまり", "g": "das heißt" },
          { "s": "AI", "g": "KI" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "きゅうそくに", "g": "rasant" },
          { "s": "発展しています", "r": "はってんしています", "g": "entwickelt sich" },
          { "s": "。", "p": true }
        ],
        "jp": "近年、人工知能、つまりAIがきゅうそくに発展しています。",
        "romaji": "Kinnen, jinkou chinou, tsumari AI ga kyuusoku ni hatten shite imasu.",
        "de": "In den letzten Jahren entwickelt sich die künstliche Intelligenz, also KI, rasant."
      },
      {
        "tokens": [
          { "s": "AI", "g": "KI" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "、", "p": true },
          { "s": "大量", "r": "たいりょう", "g": "große Menge" },
          { "s": "の", "g": "(von)" },
          { "s": "データ", "g": "Daten" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "学習して", "r": "がくしゅうして", "g": "lernen und" },
          { "s": "、", "p": true },
          { "s": "さまざまな", "g": "verschiedene" },
          { "s": "はんだん", "g": "Entscheidungen / Urteile" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "行います", "r": "おこないます", "g": "trifft" },
          { "s": "。", "p": true }
        ],
        "jp": "AIは、大量のデータを学習して、さまざまなはんだんを行います。",
        "romaji": "AI wa, tairyou no deeta o gakushuu shite, samazama na handan o okonaimasu.",
        "de": "KI lernt aus großen Datenmengen und trifft verschiedene Entscheidungen."
      },
      {
        "tokens": [
          { "s": "すでに", "g": "bereits" },
          { "s": "、", "p": true },
          { "s": "ほんやく", "g": "Übersetzung" },
          { "s": "や", "g": "und (u. a.)" },
          { "s": "画像認識", "r": "がぞうにんしき", "g": "Bilderkennung" },
          { "s": "など", "g": "usw." },
          { "s": "、", "p": true },
          { "s": "多く", "r": "おおく", "g": "viele" },
          { "s": "の", "g": "(von)" },
          { "s": "分野", "r": "ぶんや", "g": "Bereiche" },
          { "s": "で", "g": "(in)" },
          { "s": "使われています", "r": "つかわれています", "g": "wird verwendet" },
          { "s": "。", "p": true }
        ],
        "jp": "すでに、ほんやくや画像認識など、多くの分野で使われています。",
        "romaji": "Sude ni, honyaku ya gazou ninshiki nado, ooku no bunya de tsukawarete imasu.",
        "de": "Sie wird bereits in vielen Bereichen wie Übersetzung und Bilderkennung eingesetzt."
      },
      {
        "tokens": [
          { "s": "工場", "r": "こうじょう", "g": "Fabrik" },
          { "s": "で", "g": "(in)" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "、", "p": true },
          { "s": "ロボット", "g": "Roboter" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "人", "r": "ひと", "g": "Mensch" },
          { "s": "の", "g": "(von)" },
          { "s": "かわりに", "g": "anstelle" },
          { "s": "さぎょう", "g": "Arbeit / Tätigkeit" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "する", "g": "machen" },
          { "s": "ように", "g": "(dazu)" },
          { "s": "なりました", "g": "ist geworden" },
          { "s": "。", "p": true }
        ],
        "jp": "工場では、ロボットが人のかわりにさぎょうをするようになりました。",
        "romaji": "Koujou de wa, robotto ga hito no kawari ni sagyou o suru you ni narimashita.",
        "de": "In Fabriken übernehmen Roboter inzwischen die Arbeit anstelle von Menschen."
      },
      {
        "tokens": [
          { "s": "その", "g": "diese(r)" },
          { "s": "けっか", "g": "Folge / Ergebnis" },
          { "s": "、", "p": true },
          { "s": "しごと", "g": "Arbeit" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "なくなる", "g": "verschwinden" },
          { "s": "のでは", "g": "(ob nicht)" },
          { "s": "ないか", "g": "... könnte" },
          { "s": "と", "g": "(dass)" },
          { "s": "心配する", "r": "しんぱいする", "g": "sich sorgen" },
          { "s": "人", "r": "ひと", "g": "Menschen" },
          { "s": "も", "g": "auch" },
          { "s": "います", "g": "gibt es" },
          { "s": "。", "p": true }
        ],
        "jp": "そのけっか、しごとがなくなるのではないかと心配する人もいます。",
        "romaji": "Sono kekka, shigoto ga nakunaru no de wa nai ka to shinpai suru hito mo imasu.",
        "de": "Daher gibt es auch Menschen, die fürchten, dass Arbeitsplätze verschwinden könnten."
      },
      {
        "tokens": [
          { "s": "一方で", "r": "いっぽうで", "g": "andererseits" },
          { "s": "、", "p": true },
          { "s": "AI", "g": "KI" },
          { "s": "によって", "g": "durch" },
          { "s": "新しい", "r": "あたらしい", "g": "neu" },
          { "s": "しごと", "g": "Arbeit / Berufe" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "生まれる", "r": "うまれる", "g": "entstehen" },
          { "s": "という", "g": "(dass)" },
          { "s": "意見", "r": "いけん", "g": "Meinung" },
          { "s": "も", "g": "auch" },
          { "s": "あります", "g": "gibt es" },
          { "s": "。", "p": true }
        ],
        "jp": "一方で、AIによって新しいしごとが生まれるという意見もあります。",
        "romaji": "Ippou de, AI ni yotte atarashii shigoto ga umareru to iu iken mo arimasu.",
        "de": "Andererseits gibt es die Meinung, dass durch KI neue Berufe entstehen."
      },
      {
        "tokens": [
          { "s": "たいせつ", "g": "wichtig" },
          { "s": "な", "g": "(Adj.)" },
          { "s": "の", "g": "(das)" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "、", "p": true },
          { "s": "AI", "g": "KI" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "どう", "g": "wie" },
          { "s": "使うか", "r": "つかうか", "g": "benutzt (Frage)" },
          { "s": "という", "g": "(die Frage)" },
          { "s": "点", "r": "てん", "g": "Punkt" },
          { "s": "です", "g": "(höflich)" },
          { "s": "。", "p": true }
        ],
        "jp": "たいせつなのは、AIをどう使うかという点です。",
        "romaji": "Taisetsu na no wa, AI o dou tsukau ka to iu ten desu.",
        "de": "Wichtig ist die Frage, wie man KI einsetzt."
      },
      {
        "tokens": [
          { "s": "技術", "r": "ぎじゅつ", "g": "Technik" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "いくら", "g": "wie sehr auch" },
          { "s": "進歩しても", "r": "しんぽしても", "g": "auch wenn fortschreitet" },
          { "s": "、", "p": true },
          { "s": "さいごに", "g": "am Ende" },
          { "s": "きめる", "g": "entscheiden" },
          { "s": "の", "g": "(das)" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "人間", "r": "にんげん", "g": "Mensch" },
          { "s": "です", "g": "(höflich)" },
          { "s": "。", "p": true }
        ],
        "jp": "技術がいくら進歩しても、さいごにきめるのは人間です。",
        "romaji": "Gijutsu ga ikura shinpo shite mo, saigo ni kimeru no wa ningen desu.",
        "de": "Egal wie sehr die Technik fortschreitet, am Ende entscheidet der Mensch."
      },
      {
        "tokens": [
          { "s": "AI", "g": "KI" },
          { "s": "と", "g": "und" },
          { "s": "人間", "r": "にんげん", "g": "Mensch" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "きょうりょくすれば", "g": "wenn zusammenarbeiten" },
          { "s": "、", "p": true },
          { "s": "よりよい", "g": "bessere" },
          { "s": "社会", "r": "しゃかい", "g": "Gesellschaft" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "つくれる", "g": "schaffen können" },
          { "s": "でしょう", "g": "wohl" },
          { "s": "。", "p": true }
        ],
        "jp": "AIと人間がきょうりょくすれば、よりよい社会をつくれるでしょう。",
        "romaji": "AI to ningen ga kyouryoku sureba, yoriyoi shakai o tsukureru deshou.",
        "de": "Wenn KI und Mensch zusammenarbeiten, lässt sich wohl eine bessere Gesellschaft schaffen."
      }
    ]
  },
  {
    "id": "r-shoushi-koureika",
    "title": "少子高齢化",
    "titleReading": "しょうしこうれいか",
    "titleDe": "Geburtenrückgang und Überalterung",
    "level": "N2",
    "category": "Gesellschaft",
    "summary": "Weniger Kinder, mehr ältere Menschen: über die Ursachen der demografischen Wende in Japan und ihre Folgen für die Gesellschaft.",
    "sentences": [
      {
        "tokens": [
          { "s": "今", "r": "いま", "g": "jetzt" },
          { "s": "、", "p": true },
          { "s": "日本", "r": "にほん", "g": "Japan" },
          { "s": "で", "g": "(in)" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "少子高齢化", "r": "しょうしこうれいか", "g": "Überalterung" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "大きな", "r": "おおきな", "g": "groß" },
          { "s": "問題", "r": "もんだい", "g": "Problem" },
          { "s": "に", "g": "(zu)" },
          { "s": "なっています", "g": "ist geworden" },
          { "s": "。", "p": true }
        ],
        "jp": "今、日本では少子高齢化が大きな問題になっています。",
        "romaji": "Ima, nihon de wa shoushi koureika ga ookina mondai ni natte imasu.",
        "de": "Heute ist die Überalterung in Japan ein großes Problem geworden."
      },
      {
        "tokens": [
          { "s": "子ども", "r": "こども", "g": "Kinder" },
          { "s": "の", "g": "(von)" },
          { "s": "数", "r": "かず", "g": "Anzahl" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "へる", "g": "abnehmen" },
          { "s": "一方で", "r": "いっぽうで", "g": "während" },
          { "s": "、", "p": true },
          { "s": "お年より", "r": "おとしより", "g": "ältere Menschen" },
          { "s": "の", "g": "(von)" },
          { "s": "数", "r": "かず", "g": "Anzahl" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "ふえています", "g": "nimmt zu" },
          { "s": "。", "p": true }
        ],
        "jp": "子どもの数がへる一方で、お年よりの数はふえています。",
        "romaji": "Kodomo no kazu ga heru ippou de, otoshiyori no kazu wa fuete imasu.",
        "de": "Während die Zahl der Kinder sinkt, steigt die Zahl der Alten."
      },
      {
        "tokens": [
          { "s": "その", "g": "diese" },
          { "s": "げんいん", "g": "Ursache" },
          { "s": "の", "g": "(von)" },
          { "s": "一つ", "r": "ひとつ", "g": "eine" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "、", "p": true },
          { "s": "けっこんしない", "g": "nicht heiraten" },
          { "s": "若者", "r": "わかもの", "g": "junge Menschen" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "増えた", "r": "ふえた", "g": "nahmen zu" },
          { "s": "こと", "g": "(das)" },
          { "s": "です", "g": "(höflich)" },
          { "s": "。", "p": true }
        ],
        "jp": "そのげんいんの一つは、けっこんしない若者が増えたことです。",
        "romaji": "Sono gen'in no hitotsu wa, kekkon shinai wakamono ga fueta koto desu.",
        "de": "Eine Ursache ist, dass mehr junge Menschen nicht heiraten."
      },
      {
        "tokens": [
          { "s": "また", "g": "auch" },
          { "s": "、", "p": true },
          { "s": "子ども", "r": "こども", "g": "Kinder" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "そだてる", "g": "großziehen" },
          { "s": "おかね", "g": "Geld" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "かかる", "g": "kosten" },
          { "s": "こと", "g": "(das)" },
          { "s": "も", "g": "auch" },
          { "s": "かんけいしています", "g": "spielt eine Rolle" },
          { "s": "。", "p": true }
        ],
        "jp": "また、子どもをそだてるおかねがかかることもかんけいしています。",
        "romaji": "Mata, kodomo o sodateru okane ga kakaru koto mo kankei shite imasu.",
        "de": "Auch die hohen Kosten der Kindererziehung spielen eine Rolle."
      },
      {
        "tokens": [
          { "s": "人口", "r": "じんこう", "g": "Bevölkerung" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "へると", "g": "wenn abnimmt" },
          { "s": "、", "p": true },
          { "s": "はたらく", "g": "arbeiten" },
          { "s": "人", "r": "ひと", "g": "Menschen" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "少なく", "r": "すくなく", "g": "wenig" },
          { "s": "なります", "g": "werden" },
          { "s": "。", "p": true }
        ],
        "jp": "人口がへると、はたらく人が少なくなります。",
        "romaji": "Jinkou ga heru to, hataraku hito ga sukunaku narimasu.",
        "de": "Wenn die Bevölkerung sinkt, gibt es weniger arbeitende Menschen."
      },
      {
        "tokens": [
          { "s": "その", "g": "diese(r)" },
          { "s": "ため", "g": "deshalb" },
          { "s": "、", "p": true },
          { "s": "けいざい", "g": "Wirtschaft" },
          { "s": "へ", "g": "(auf)" },
          { "s": "の", "g": "(von)" },
          { "s": "えいきょう", "g": "Auswirkung" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "心配されています", "r": "しんぱいされています", "g": "wird befürchtet" },
          { "s": "。", "p": true }
        ],
        "jp": "そのため、けいざいへのえいきょうが心配されています。",
        "romaji": "Sono tame, keizai e no eikyou ga shinpai sarete imasu.",
        "de": "Daher macht man sich Sorgen über die Auswirkungen auf die Wirtschaft."
      },
      {
        "tokens": [
          { "s": "せいふ", "g": "Regierung" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "、", "p": true },
          { "s": "子育て", "r": "こそだて", "g": "Kindererziehung" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "しえんする", "g": "unterstützen" },
          { "s": "せいさく", "g": "Maßnahmen" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "すすめています", "g": "treibt voran" },
          { "s": "。", "p": true }
        ],
        "jp": "せいふは、子育てをしえんするせいさくをすすめています。",
        "romaji": "Seifu wa, kosodate o shien suru seisaku o susumete imasu.",
        "de": "Die Regierung treibt Maßnahmen zur Unterstützung der Kindererziehung voran."
      },
      {
        "tokens": [
          { "s": "しかし", "g": "jedoch" },
          { "s": "、", "p": true },
          { "s": "もんだい", "g": "Problem" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "かいけつする", "g": "lösen" },
          { "s": "の", "g": "(das)" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "かんたん", "g": "einfach" },
          { "s": "では", "g": "(nicht)" },
          { "s": "ありません", "g": "ist nicht" },
          { "s": "。", "p": true }
        ],
        "jp": "しかし、もんだいをかいけつするのはかんたんではありません。",
        "romaji": "Shikashi, mondai o kaiketsu suru no wa kantan de wa arimasen.",
        "de": "Doch das Problem zu lösen ist nicht einfach."
      },
      {
        "tokens": [
          { "s": "社会", "r": "しゃかい", "g": "Gesellschaft" },
          { "s": "ぜんたい", "g": "gesamte" },
          { "s": "で", "g": "(als)" },
          { "s": "かんがえる", "g": "nachdenken" },
          { "s": "ひつよう", "g": "Notwendigkeit" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "ある", "g": "gibt es" },
          { "s": "でしょう", "g": "wohl" },
          { "s": "。", "p": true }
        ],
        "jp": "社会ぜんたいでかんがえるひつようがあるでしょう。",
        "romaji": "Shakai zentai de kangaeru hitsuyou ga aru deshou.",
        "de": "Die ganze Gesellschaft muss wohl darüber nachdenken."
      }
    ]
  },
  {
    "id": "r-chikyuu-ondanka",
    "title": "地球温暖化",
    "titleReading": "ちきゅうおんだんか",
    "titleDe": "Die globale Erwärmung",
    "level": "N2",
    "category": "Umwelt",
    "summary": "Steigende Temperaturen, schmelzendes Eis, häufigere Katastrophen – und die Frage, was jeder Einzelne gegen den Klimawandel tun kann.",
    "sentences": [
      {
        "tokens": [
          { "s": "地球温暖化", "r": "ちきゅうおんだんか", "g": "Erderwärmung" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "、", "p": true },
          { "s": "世界中", "r": "せかいじゅう", "g": "weltweit" },
          { "s": "で", "g": "(in)" },
          { "s": "注目されている", "r": "ちゅうもくされている", "g": "beachtet werdend" },
          { "s": "問題", "r": "もんだい", "g": "Problem" },
          { "s": "です", "g": "(höflich)" },
          { "s": "。", "p": true }
        ],
        "jp": "地球温暖化は、世界中で注目されている問題です。",
        "romaji": "Chikyuu ondanka wa, sekaijuu de chuumoku sarete iru mondai desu.",
        "de": "Die Erderwärmung ist ein weltweit beachtetes Problem."
      },
      {
        "tokens": [
          { "s": "主な", "r": "おもな", "g": "haupt-" },
          { "s": "げんいん", "g": "Ursache" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "、", "p": true },
          { "s": "二酸化炭素", "r": "にさんかたんそ", "g": "Kohlendioxid" },
          { "s": "など", "g": "usw." },
          { "s": "の", "g": "(von)" },
          { "s": "ガス", "g": "Gase" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "ふえた", "g": "nahmen zu" },
          { "s": "こと", "g": "(das)" },
          { "s": "だ", "g": "ist" },
          { "s": "と", "g": "(dass)" },
          { "s": "言われています", "r": "いわれています", "g": "wird gesagt" },
          { "s": "。", "p": true }
        ],
        "jp": "主なげんいんは、二酸化炭素などのガスがふえたことだと言われています。",
        "romaji": "Omo na gen'in wa, nisanka tanso nado no gasu ga fueta koto da to iwarete imasu.",
        "de": "Als Hauptursache gilt die Zunahme von Gasen wie Kohlendioxid."
      },
      {
        "tokens": [
          { "s": "きおん", "g": "Temperatur" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "上がると", "r": "あがると", "g": "wenn steigt" },
          { "s": "、", "p": true },
          { "s": "こおり", "g": "Eis" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "とけて", "g": "schmelzen und" },
          { "s": "、", "p": true },
          { "s": "海", "r": "うみ", "g": "Meer" },
          { "s": "の", "g": "(von)" },
          { "s": "水面", "r": "すいめん", "g": "Meeresspiegel" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "上がります", "r": "あがります", "g": "steigt" },
          { "s": "。", "p": true }
        ],
        "jp": "きおんが上がると、こおりがとけて、海の水面が上がります。",
        "romaji": "Kion ga agaru to, koori ga tokete, umi no suimen ga agarimasu.",
        "de": "Wenn die Temperatur steigt, schmilzt Eis und der Meeresspiegel steigt."
      },
      {
        "tokens": [
          { "s": "その", "g": "diese" },
          { "s": "けっか", "g": "Folge" },
          { "s": "、", "p": true },
          { "s": "すむ", "g": "leben / wohnen" },
          { "s": "場所", "r": "ばしょ", "g": "Ort / Lebensraum" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "うしなう", "g": "verlieren" },
          { "s": "動物", "r": "どうぶつ", "g": "Tiere" },
          { "s": "も", "g": "auch" },
          { "s": "います", "g": "gibt es" },
          { "s": "。", "p": true }
        ],
        "jp": "そのけっか、すむ場所をうしなう動物もいます。",
        "romaji": "Sono kekka, sumu basho o ushinau doubutsu mo imasu.",
        "de": "In der Folge verlieren manche Tiere ihren Lebensraum."
      },
      {
        "tokens": [
          { "s": "また", "g": "auch" },
          { "s": "、", "p": true },
          { "s": "たいふう", "g": "Taifun" },
          { "s": "や", "g": "und (u. a.)" },
          { "s": "こうずい", "g": "Überschwemmung" },
          { "s": "など", "g": "usw." },
          { "s": "の", "g": "(von)" },
          { "s": "さいがい", "g": "Katastrophen" },
          { "s": "も", "g": "auch" },
          { "s": "ふえています", "g": "nehmen zu" },
          { "s": "。", "p": true }
        ],
        "jp": "また、たいふうやこうずいなどのさいがいもふえています。",
        "romaji": "Mata, taifuu ya kouzui nado no saigai mo fuete imasu.",
        "de": "Auch Katastrophen wie Taifune und Überschwemmungen nehmen zu."
      },
      {
        "tokens": [
          { "s": "この", "g": "dieses" },
          { "s": "問題", "r": "もんだい", "g": "Problem" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "かいけつする", "g": "lösen" },
          { "s": "ためには", "g": "um zu" },
          { "s": "、", "p": true },
          { "s": "せかい", "g": "Welt" },
          { "s": "の", "g": "(von)" },
          { "s": "きょうりょく", "g": "Zusammenarbeit" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "ひつよう", "g": "nötig" },
          { "s": "です", "g": "(höflich)" },
          { "s": "。", "p": true }
        ],
        "jp": "この問題をかいけつするためには、せかいのきょうりょくがひつようです。",
        "romaji": "Kono mondai o kaiketsu suru tame ni wa, sekai no kyouryoku ga hitsuyou desu.",
        "de": "Um dieses Problem zu lösen, ist weltweite Zusammenarbeit nötig."
      },
      {
        "tokens": [
          { "s": "私たち", "r": "わたしたち", "g": "wir" },
          { "s": "にも", "g": "auch" },
          { "s": "、", "p": true },
          { "s": "できる", "g": "können" },
          { "s": "こと", "g": "(etwas)" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "あります", "g": "gibt es" },
          { "s": "。", "p": true }
        ],
        "jp": "私たちにも、できることがあります。",
        "romaji": "Watashitachi ni mo, dekiru koto ga arimasu.",
        "de": "Auch wir können etwas tun."
      },
      {
        "tokens": [
          { "s": "でんき", "g": "Strom" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "むだに", "g": "verschwenderisch" },
          { "s": "しない", "g": "nicht tun" },
          { "s": "、", "p": true },
          { "s": "車", "r": "くるま", "g": "Auto" },
          { "s": "より", "g": "statt / als" },
          { "s": "自転車", "r": "じてんしゃ", "g": "Fahrrad" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "つかう", "g": "benutzen" },
          { "s": "など", "g": "usw." },
          { "s": "です", "g": "(höflich)" },
          { "s": "。", "p": true }
        ],
        "jp": "でんきをむだにしない、車より自転車をつかうなどです。",
        "romaji": "Denki o muda ni shinai, kuruma yori jitensha o tsukau nado desu.",
        "de": "Zum Beispiel keinen Strom verschwenden oder statt Auto das Fahrrad nehmen."
      },
      {
        "tokens": [
          { "s": "小さな", "r": "ちいさな", "g": "klein" },
          { "s": "こうどう", "g": "Handlung" },
          { "s": "の", "g": "(von)" },
          { "s": "つみかさね", "g": "Summe / Anhäufung" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "、", "p": true },
          { "s": "みらい", "g": "Zukunft" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "かえる", "g": "verändern" },
          { "s": "はず", "g": "sollte (Erwartung)" },
          { "s": "です", "g": "(höflich)" },
          { "s": "。", "p": true }
        ],
        "jp": "小さなこうどうのつみかさねが、みらいをかえるはずです。",
        "romaji": "Chiisana koudou no tsumikasane ga, mirai o kaeru hazu desu.",
        "de": "Die Summe kleiner Handlungen sollte die Zukunft verändern."
      }
    ]
  },
  {
    "id": "r-washoku-no-miryoku",
    "title": "和食の みりょく",
    "titleReading": "わしょくのみりょく",
    "titleDe": "Der Reiz der japanischen Küche",
    "level": "N2",
    "category": "Kultur",
    "summary": "Seit 2013 UNESCO-Kulturerbe: was die japanische Küche ausmacht, warum sie weltweit beliebt ist und wie man sie bewahrt.",
    "sentences": [
      {
        "tokens": [
          { "s": "和食", "r": "わしょく", "g": "japanische Küche" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "、", "p": true },
          { "s": "2013年", "r": "にせんじゅうさんねん", "g": "Jahr 2013" },
          { "s": "に", "g": "(in)" },
          { "s": "ユネスコ", "g": "UNESCO" },
          { "s": "の", "g": "(von)" },
          { "s": "無形文化遺産", "r": "むけいぶんかいさん", "g": "immaterielles Kulturerbe" },
          { "s": "に", "g": "(in)" },
          { "s": "とうろくされました", "g": "wurde aufgenommen" },
          { "s": "。", "p": true }
        ],
        "jp": "和食は、2013年にユネスコの無形文化遺産にとうろくされました。",
        "romaji": "Washoku wa, 2013-nen ni yunesuko no mukei bunka isan ni touroku saremashita.",
        "de": "Die japanische Küche wurde 2013 in das UNESCO-Weltkulturerbe aufgenommen."
      },
      {
        "tokens": [
          { "s": "和食", "r": "わしょく", "g": "japanische Küche" },
          { "s": "の", "g": "(von)" },
          { "s": "とくちょう", "g": "Merkmal" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "、", "p": true },
          { "s": "しぜん", "g": "Natur" },
          { "s": "の", "g": "(von)" },
          { "s": "あじ", "g": "Geschmack" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "大切に", "r": "たいせつに", "g": "wertschätzen" },
          { "s": "する", "g": "tun" },
          { "s": "こと", "g": "(das)" },
          { "s": "です", "g": "(höflich)" },
          { "s": "。", "p": true }
        ],
        "jp": "和食のとくちょうは、しぜんのあじを大切にすることです。",
        "romaji": "Washoku no tokuchou wa, shizen no aji o taisetsu ni suru koto desu.",
        "de": "Ein Merkmal der japanischen Küche ist, den natürlichen Geschmack zu schätzen."
      },
      {
        "tokens": [
          { "s": "きせつ", "g": "Jahreszeit" },
          { "s": "の", "g": "(von)" },
          { "s": "食材", "r": "しょくざい", "g": "Zutaten" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "つかい", "g": "verwenden und" },
          { "s": "、", "p": true },
          { "s": "見た目", "r": "みため", "g": "Aussehen" },
          { "s": "の", "g": "(von)" },
          { "s": "うつくしさ", "g": "Schönheit" },
          { "s": "も", "g": "auch" },
          { "s": "たいせつに", "g": "wertschätzen" },
          { "s": "します", "g": "tut" },
          { "s": "。", "p": true }
        ],
        "jp": "きせつの食材をつかい、見た目のうつくしさもたいせつにします。",
        "romaji": "Kisetsu no shokuzai o tsukai, mitame no utsukushisa mo taisetsu ni shimasu.",
        "de": "Man verwendet saisonale Zutaten und legt auch Wert auf das schöne Aussehen."
      },
      {
        "tokens": [
          { "s": "ごはん", "g": "Reis" },
          { "s": "と", "g": "und" },
          { "s": "みそしる", "g": "Miso-Suppe" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "中心に", "r": "ちゅうしんに", "g": "im Zentrum / herum" },
          { "s": "、", "p": true },
          { "s": "いろいろな", "g": "verschiedene" },
          { "s": "おかず", "g": "Beilagen" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "ならべます", "g": "stellt auf" },
          { "s": "。", "p": true }
        ],
        "jp": "ごはんとみそしるを中心に、いろいろなおかずをならべます。",
        "romaji": "Gohan to misoshiru o chuushin ni, iroiro na okazu o narabemasu.",
        "de": "Um Reis und Miso-Suppe herum stellt man verschiedene Beilagen auf."
      },
      {
        "tokens": [
          { "s": "また", "g": "außerdem" },
          { "s": "、", "p": true },
          { "s": "和食", "r": "わしょく", "g": "japanische Küche" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "けんこう", "g": "Gesundheit" },
          { "s": "に", "g": "(für)" },
          { "s": "よい", "g": "gut" },
          { "s": "と", "g": "weil / dass" },
          { "s": "、", "p": true },
          { "s": "せかい", "g": "Welt" },
          { "s": "で", "g": "(in)" },
          { "s": "人気", "r": "にんき", "g": "Beliebtheit" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "あります", "g": "hat / gibt es" },
          { "s": "。", "p": true }
        ],
        "jp": "また、和食はけんこうによいと、せかいで人気があります。",
        "romaji": "Mata, washoku wa kenkou ni yoi to, sekai de ninki ga arimasu.",
        "de": "Außerdem ist die japanische Küche weltweit beliebt, weil sie als gesund gilt."
      },
      {
        "tokens": [
          { "s": "しかし", "g": "jedoch" },
          { "s": "、", "p": true },
          { "s": "わかい", "g": "jung" },
          { "s": "せだい", "g": "Generation" },
          { "s": "で", "g": "(in)" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "、", "p": true },
          { "s": "洋食", "r": "ようしょく", "g": "westliches Essen" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "このむ", "g": "bevorzugen" },
          { "s": "人", "r": "ひと", "g": "Menschen" },
          { "s": "も", "g": "auch" },
          { "s": "増えています", "r": "ふえています", "g": "nehmen zu" },
          { "s": "。", "p": true }
        ],
        "jp": "しかし、わかいせだいでは、洋食をこのむ人も増えています。",
        "romaji": "Shikashi, wakai sedai de wa, youshoku o konomu hito mo fuete imasu.",
        "de": "Doch in jüngeren Generationen mögen immer mehr Menschen westliches Essen."
      },
      {
        "tokens": [
          { "s": "つたえられてきた", "g": "überliefert worden" },
          { "s": "食文化", "r": "しょくぶんか", "g": "Esskultur" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "まもる", "g": "bewahren" },
          { "s": "こと", "g": "(das)" },
          { "s": "も", "g": "auch" },
          { "s": "たいせつ", "g": "wichtig" },
          { "s": "です", "g": "(höflich)" },
          { "s": "。", "p": true }
        ],
        "jp": "つたえられてきた食文化をまもることもたいせつです。",
        "romaji": "Tsutaerarete kita shokubunka o mamoru koto mo taisetsu desu.",
        "de": "Es ist auch wichtig, die überlieferte Esskultur zu bewahren."
      },
      {
        "tokens": [
          { "s": "家庭", "r": "かてい", "g": "Zuhause / Familie" },
          { "s": "で", "g": "(in)" },
          { "s": "和食", "r": "わしょく", "g": "japanische Küche" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "つくる", "g": "kochen" },
          { "s": "きかい", "g": "Gelegenheit" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "ふやしたい", "g": "möchte vermehren" },
          { "s": "もの", "g": "(Wunsch)" },
          { "s": "です", "g": "(höflich)" },
          { "s": "。", "p": true }
        ],
        "jp": "家庭で和食をつくるきかいをふやしたいものです。",
        "romaji": "Katei de washoku o tsukuru kikai o fuyashitai mono desu.",
        "de": "Man möchte die Gelegenheiten, zu Hause japanisch zu kochen, vermehren."
      }
    ]
  },
  {
    "id": "r-hatarakikata-no-henka",
    "title": "はたらき方の へんか",
    "titleReading": "はたらきかたのへんか",
    "titleDe": "Der Wandel der Arbeitsweise",
    "level": "N2",
    "category": "Arbeit",
    "summary": "Homeoffice und Remote-Arbeit verändern den Berufsalltag – mit Vorteilen wie eingesparter Pendelzeit, aber auch neuen Herausforderungen.",
    "sentences": [
      {
        "tokens": [
          { "s": "さいきん", "g": "in letzter Zeit" },
          { "s": "、", "p": true },
          { "s": "はたらき方", "r": "はたらきかた", "g": "Art zu arbeiten" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "大きく", "r": "おおきく", "g": "stark" },
          { "s": "かわってきました", "g": "hat sich verändert" },
          { "s": "。", "p": true }
        ],
        "jp": "さいきん、はたらき方が大きくかわってきました。",
        "romaji": "Saikin, hatarakikata ga ookiku kawatte kimashita.",
        "de": "In letzter Zeit hat sich die Art zu arbeiten stark verändert."
      },
      {
        "tokens": [
          { "s": "インターネット", "g": "Internet" },
          { "s": "の", "g": "(von)" },
          { "s": "はったつ", "g": "Entwicklung" },
          { "s": "により", "g": "durch" },
          { "s": "、", "p": true },
          { "s": "家", "r": "いえ", "g": "Zuhause" },
          { "s": "で", "g": "(in)" },
          { "s": "しごと", "g": "Arbeit" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "する", "g": "machen" },
          { "s": "人", "r": "ひと", "g": "Menschen" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "ふえました", "g": "nahmen zu" },
          { "s": "。", "p": true }
        ],
        "jp": "インターネットのはったつにより、家でしごとをする人がふえました。",
        "romaji": "Intaanetto no hattatsu ni yori, ie de shigoto o suru hito ga fuemashita.",
        "de": "Durch die Entwicklung des Internets arbeiten mehr Menschen von zu Hause."
      },
      {
        "tokens": [
          { "s": "リモートワーク", "g": "Remote-Arbeit" },
          { "s": "なら", "g": "bei / wenn" },
          { "s": "、", "p": true },
          { "s": "つうきん", "g": "Pendeln" },
          { "s": "の", "g": "(von)" },
          { "s": "時間", "r": "じかん", "g": "Zeit" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "せつやくできます", "g": "kann einsparen" },
          { "s": "。", "p": true }
        ],
        "jp": "リモートワークなら、つうきんの時間をせつやくできます。",
        "romaji": "Rimooto waaku nara, tsuukin no jikan o setsuyaku dekimasu.",
        "de": "Bei Remote-Arbeit kann man die Pendelzeit einsparen."
      },
      {
        "tokens": [
          { "s": "その", "g": "diese" },
          { "s": "時間", "r": "じかん", "g": "Zeit" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "かぞく", "g": "Familie" },
          { "s": "や", "g": "oder (u. a.)" },
          { "s": "しゅみ", "g": "Hobby" },
          { "s": "に", "g": "(für)" },
          { "s": "つかう", "g": "nutzen" },
          { "s": "こと", "g": "(das)" },
          { "s": "も", "g": "auch" },
          { "s": "できます", "g": "kann man" },
          { "s": "。", "p": true }
        ],
        "jp": "その時間をかぞくやしゅみにつかうこともできます。",
        "romaji": "Sono jikan o kazoku ya shumi ni tsukau koto mo dekimasu.",
        "de": "Diese Zeit kann man auch für Familie oder Hobbys nutzen."
      },
      {
        "tokens": [
          { "s": "しかし", "g": "jedoch" },
          { "s": "、", "p": true },
          { "s": "よい", "g": "gut" },
          { "s": "こと", "g": "Dinge" },
          { "s": "ばかり", "g": "nur" },
          { "s": "では", "g": "(nicht)" },
          { "s": "ありません", "g": "ist nicht" },
          { "s": "。", "p": true }
        ],
        "jp": "しかし、よいことばかりではありません。",
        "romaji": "Shikashi, yoi koto bakari de wa arimasen.",
        "de": "Doch es ist nicht nur gut."
      },
      {
        "tokens": [
          { "s": "家", "r": "いえ", "g": "Zuhause" },
          { "s": "で", "g": "(in)" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "しゅうちゅうできない", "g": "sich nicht konzentrieren können" },
          { "s": "と", "g": "(dass)" },
          { "s": "かんじる", "g": "fühlen" },
          { "s": "人", "r": "ひと", "g": "Menschen" },
          { "s": "も", "g": "auch" },
          { "s": "います", "g": "gibt es" },
          { "s": "。", "p": true }
        ],
        "jp": "家ではしゅうちゅうできないとかんじる人もいます。",
        "romaji": "Ie de wa shuuchuu dekinai to kanjiru hito mo imasu.",
        "de": "Manche haben das Gefühl, sich zu Hause nicht konzentrieren zu können."
      },
      {
        "tokens": [
          { "s": "また", "g": "auch" },
          { "s": "、", "p": true },
          { "s": "どうりょう", "g": "Kollegen" },
          { "s": "と", "g": "mit" },
          { "s": "会う", "r": "あう", "g": "treffen" },
          { "s": "きかい", "g": "Gelegenheit" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "へって", "g": "abnehmen und" },
          { "s": "、", "p": true },
          { "s": "さびしく", "g": "einsam" },
          { "s": "なる", "g": "werden" },
          { "s": "こと", "g": "(das)" },
          { "s": "も", "g": "auch" },
          { "s": "あります", "g": "gibt es" },
          { "s": "。", "p": true }
        ],
        "jp": "また、どうりょうと会うきかいがへって、さびしくなることもあります。",
        "romaji": "Mata, douryou to au kikai ga hette, sabishiku naru koto mo arimasu.",
        "de": "Auch trifft man Kollegen seltener und fühlt sich manchmal einsam."
      },
      {
        "tokens": [
          { "s": "これから", "g": "künftig" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "、", "p": true },
          { "s": "じぶん", "g": "selbst" },
          { "s": "に", "g": "(zu)" },
          { "s": "あった", "g": "passende" },
          { "s": "はたらき方", "r": "はたらきかた", "g": "Arbeitsweise" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "えらべる", "g": "wählen können" },
          { "s": "時代", "r": "じだい", "g": "Zeit / Ära" },
          { "s": "に", "g": "(zu)" },
          { "s": "なる", "g": "werden" },
          { "s": "でしょう", "g": "wohl" },
          { "s": "。", "p": true }
        ],
        "jp": "これからは、じぶんにあったはたらき方をえらべる時代になるでしょう。",
        "romaji": "Korekara wa, jibun ni atta hatarakikata o eraberu jidai ni naru deshou.",
        "de": "Künftig wird es wohl eine Zeit, in der man die zu sich passende Arbeitsweise wählen kann."
      }
    ]
  },
  {
    "id": "r-gengo-to-shikou",
    "title": "言語と 思考",
    "titleReading": "げんごとしこう",
    "titleDe": "Sprache und Denken",
    "level": "N1",
    "category": "Sprache",
    "summary": "Ist Sprache nur ein Werkzeug? Ein Essay darüber, wie Sprache unser Denken formt und warum das Lernen einer Fremdsprache den Horizont öffnet.",
    "sentences": [
      {
        "tokens": [
          { "s": "言語", "r": "げんご", "g": "Sprache" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "、", "p": true },
          { "s": "たんなる", "g": "bloß" },
          { "s": "コミュニケーション", "g": "Kommunikation" },
          { "s": "の", "g": "(von)" },
          { "s": "道具", "r": "どうぐ", "g": "Werkzeug" },
          { "s": "では", "g": "(nicht)" },
          { "s": "ない", "g": "ist nicht" },
          { "s": "。", "p": true }
        ],
        "jp": "言語は、たんなるコミュニケーションの道具ではない。",
        "romaji": "Gengo wa, tannaru komyunikeeshon no dougu de wa nai.",
        "de": "Sprache ist nicht bloß ein Werkzeug der Kommunikation."
      },
      {
        "tokens": [
          { "s": "私たち", "r": "わたしたち", "g": "wir" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "、", "p": true },
          { "s": "言語", "r": "げんご", "g": "Sprache" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "つうじて", "g": "durch" },
          { "s": "世界", "r": "せかい", "g": "Welt" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "認識し", "r": "にんしきし", "g": "wahrnehmen und" },
          { "s": "、", "p": true },
          { "s": "思考", "r": "しこう", "g": "Denken" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "組み立てている", "r": "くみたてている", "g": "bauen auf" },
          { "s": "。", "p": true }
        ],
        "jp": "私たちは、言語をつうじて世界を認識し、思考を組み立てている。",
        "romaji": "Watashitachi wa, gengo o tsuujite sekai o ninshiki shi, shikou o kumitatete iru.",
        "de": "Wir nehmen die Welt durch Sprache wahr und bauen unser Denken auf."
      },
      {
        "tokens": [
          { "s": "ある", "g": "eine gewisse" },
          { "s": "言語", "r": "げんご", "g": "Sprache" },
          { "s": "に", "g": "(für)" },
          { "s": "特有", "r": "とくゆう", "g": "eigentümlich" },
          { "s": "の", "g": "(von)" },
          { "s": "ひょうげん", "g": "Ausdruck" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "、", "p": true },
          { "s": "その", "g": "diese(r)" },
          { "s": "文化", "r": "ぶんか", "g": "Kultur" },
          { "s": "の", "g": "(von)" },
          { "s": "もの", "g": "Dinge" },
          { "s": "の", "g": "(von)" },
          { "s": "見方", "r": "みかた", "g": "Sichtweise" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "反映している", "r": "はんえいしている", "g": "spiegelt wider" },
          { "s": "。", "p": true }
        ],
        "jp": "ある言語に特有のひょうげんは、その文化のものの見方を反映している。",
        "romaji": "Aru gengo ni tokuyuu no hyougen wa, sono bunka no mono no mikata o han'ei shite iru.",
        "de": "Für eine Sprache typische Ausdrücke spiegeln die Sichtweise ihrer Kultur wider."
      },
      {
        "tokens": [
          { "s": "たとえば", "g": "zum Beispiel" },
          { "s": "、", "p": true },
          { "s": "日本語", "r": "にほんご", "g": "Japanisch" },
          { "s": "には", "g": "(es gibt)" },
          { "s": "相手", "r": "あいて", "g": "Gegenüber" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "おもいやる", "g": "Rücksicht nehmen auf" },
          { "s": "表現", "r": "ひょうげん", "g": "Ausdrücke" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "ゆたかに", "g": "reichlich" },
          { "s": "そんざいする", "g": "existieren" },
          { "s": "。", "p": true }
        ],
        "jp": "たとえば、日本語には相手をおもいやる表現がゆたかにそんざいする。",
        "romaji": "Tatoeba, nihongo ni wa aite o omoiyaru hyougen ga yutaka ni sonzai suru.",
        "de": "Zum Beispiel gibt es im Japanischen reichlich Ausdrücke der Rücksichtnahme."
      },
      {
        "tokens": [
          { "s": "一方", "r": "いっぽう", "g": "andererseits" },
          { "s": "、", "p": true },
          { "s": "ある", "g": "ein gewisses" },
          { "s": "概念", "r": "がいねん", "g": "Konzept" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "あらわす", "g": "ausdrücken" },
          { "s": "ことば", "g": "Wort" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "なければ", "g": "wenn es nicht gibt" },
          { "s": "、", "p": true },
          { "s": "それ", "g": "es" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "いしきする", "g": "bewusst wahrnehmen" },
          { "s": "こと", "g": "(das)" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "むずかしい", "g": "schwierig" },
          { "s": "。", "p": true }
        ],
        "jp": "一方、ある概念をあらわすことばがなければ、それをいしきすることはむずかしい。",
        "romaji": "Ippou, aru gainen o arawasu kotoba ga nakereba, sore o ishiki suru koto wa muzukashii.",
        "de": "Andererseits ist es schwer, ein Konzept bewusst wahrzunehmen, wenn es kein Wort dafür gibt."
      },
      {
        "tokens": [
          { "s": "つまり", "g": "das heißt" },
          { "s": "、", "p": true },
          { "s": "ことば", "g": "Sprache / Wort" },
          { "s": "の", "g": "(von)" },
          { "s": "ちがい", "g": "Unterschied" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "、", "p": true },
          { "s": "世界", "r": "せかい", "g": "Welt" },
          { "s": "の", "g": "(von)" },
          { "s": "とらえ方", "r": "とらえかた", "g": "Auffassung" },
          { "s": "の", "g": "(von)" },
          { "s": "ちがい", "g": "Unterschied" },
          { "s": "にも", "g": "auch zu" },
          { "s": "つながりうる", "g": "kann führen" },
          { "s": "。", "p": true }
        ],
        "jp": "つまり、ことばのちがいは、世界のとらえ方のちがいにもつながりうる。",
        "romaji": "Tsumari, kotoba no chigai wa, sekai no toraekata no chigai ni mo tsunagari uru.",
        "de": "Mit anderen Worten, Unterschiede in der Sprache können zu Unterschieden in der Weltauffassung führen."
      },
      {
        "tokens": [
          { "s": "外国語", "r": "がいこくご", "g": "Fremdsprache" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "学ぶ", "r": "まなぶ", "g": "lernen" },
          { "s": "こと", "g": "(das)" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "、", "p": true },
          { "s": "新しい", "r": "あたらしい", "g": "neu" },
          { "s": "考え方", "r": "かんがえかた", "g": "Denkweise" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "手", "r": "て", "g": "Hand" },
          { "s": "に", "g": "(in)" },
          { "s": "入れる", "r": "いれる", "g": "gewinnen" },
          { "s": "こと", "g": "(das)" },
          { "s": "でも", "g": "auch" },
          { "s": "ある", "g": "ist" },
          { "s": "。", "p": true }
        ],
        "jp": "外国語を学ぶことは、新しい考え方を手に入れることでもある。",
        "romaji": "Gaikokugo o manabu koto wa, atarashii kangaekata o te ni ireru koto demo aru.",
        "de": "Eine Fremdsprache zu lernen heißt auch, eine neue Denkweise zu gewinnen."
      },
      {
        "tokens": [
          { "s": "それ", "g": "das" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "、", "p": true },
          { "s": "自分", "r": "じぶん", "g": "selbst / eigen" },
          { "s": "の", "g": "(von)" },
          { "s": "視野", "r": "しや", "g": "Horizont" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "ひろげ", "g": "erweitern und" },
          { "s": "、", "p": true },
          { "s": "これまで", "g": "bisherig" },
          { "s": "の", "g": "(von)" },
          { "s": "常識", "r": "じょうしき", "g": "Selbstverständlichkeiten" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "問いなおす", "r": "といなおす", "g": "neu hinterfragen" },
          { "s": "きっかけ", "g": "Anlass" },
          { "s": "と", "g": "(zu)" },
          { "s": "なる", "g": "wird" },
          { "s": "。", "p": true }
        ],
        "jp": "それは、自分の視野をひろげ、これまでの常識を問いなおすきっかけとなる。",
        "romaji": "Sore wa, jibun no shiya o hiroge, koremade no joushiki o toinaosu kikkake to naru.",
        "de": "Das erweitert den eigenen Horizont und wird zum Anlass, bisherige Selbstverständlichkeiten zu hinterfragen."
      },
      {
        "tokens": [
          { "s": "言語", "r": "げんご", "g": "Sprache" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "学ぶ", "r": "まなぶ", "g": "lernen" },
          { "s": "意義", "r": "いぎ", "g": "Bedeutung / Sinn" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "、", "p": true },
          { "s": "まさに", "g": "genau" },
          { "s": "そこ", "g": "dort" },
          { "s": "に", "g": "(an)" },
          { "s": "ある", "g": "liegt" },
          { "s": "と", "g": "(dass)" },
          { "s": "いえる", "g": "kann man sagen" },
          { "s": "だろう", "g": "wohl" },
          { "s": "。", "p": true }
        ],
        "jp": "言語を学ぶ意義は、まさにそこにあるといえるだろう。",
        "romaji": "Gengo o manabu igi wa, masa ni soko ni aru to ieru darou.",
        "de": "Genau darin liegt wohl der Sinn des Sprachenlernens."
      }
    ]
  },
  {
    "id": "r-dentou-no-keishou",
    "title": "伝統文化の けいしょう",
    "titleReading": "でんとうぶんかのけいしょう",
    "titleDe": "Das Weitergeben der traditionellen Kultur",
    "level": "N1",
    "category": "Kultur",
    "summary": "Viele traditionelle Künste Japans sind in Gefahr. Über fehlende Nachfolger, wirtschaftliche Zwänge und die Frage, wie man Erbe lebendig hält.",
    "sentences": [
      {
        "tokens": [
          { "s": "日本各地", "r": "にほんかくち", "g": "ganz Japan" },
          { "s": "には", "g": "(in)" },
          { "s": "、", "p": true },
          { "s": "長い", "r": "ながい", "g": "lang" },
          { "s": "歴史", "r": "れきし", "g": "Geschichte" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "持つ", "r": "もつ", "g": "haben" },
          { "s": "伝統文化", "r": "でんとうぶんか", "g": "traditionelle Kultur" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "数多く", "r": "かずおおく", "g": "zahlreich" },
          { "s": "のこされている", "g": "ist erhalten" },
          { "s": "。", "p": true }
        ],
        "jp": "日本各地には、長い歴史を持つ伝統文化が数多くのこされている。",
        "romaji": "Nihon kakuchi ni wa, nagai rekishi o motsu dentou bunka ga kazuooku nokosarete iru.",
        "de": "In ganz Japan sind viele traditionelle Kulturen mit langer Geschichte erhalten."
      },
      {
        "tokens": [
          { "s": "しかし", "g": "jedoch" },
          { "s": "、", "p": true },
          { "s": "こうした", "g": "solche" },
          { "s": "文化", "r": "ぶんか", "g": "Kultur" },
          { "s": "の", "g": "(von)" },
          { "s": "多く", "r": "おおく", "g": "viele" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "、", "p": true },
          { "s": "今", "r": "いま", "g": "jetzt" },
          { "s": "危機的", "r": "ききてき", "g": "kritisch" },
          { "s": "な", "g": "(Adj.)" },
          { "s": "じょうきょう", "g": "Lage" },
          { "s": "に", "g": "(in)" },
          { "s": "ある", "g": "ist" },
          { "s": "。", "p": true }
        ],
        "jp": "しかし、こうした文化の多くは、今危機的なじょうきょうにある。",
        "romaji": "Shikashi, kou shita bunka no ooku wa, ima kikiteki na joukyou ni aru.",
        "de": "Doch viele dieser Kulturen befinden sich heute in einer kritischen Lage."
      },
      {
        "tokens": [
          { "s": "後継者", "r": "こうけいしゃ", "g": "Nachfolger" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "不足し", "r": "ふそくし", "g": "fehlen und" },
          { "s": "、", "p": true },
          { "s": "技術", "r": "ぎじゅつ", "g": "Technik / Können" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "受けつがれない", "r": "うけつがれない", "g": "nicht weitergegeben werden" },
          { "s": "こと", "g": "(das)" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "大きな", "r": "おおきな", "g": "groß" },
          { "s": "げんいん", "g": "Ursache" },
          { "s": "である", "g": "ist" },
          { "s": "。", "p": true }
        ],
        "jp": "後継者が不足し、技術が受けつがれないことが大きなげんいんである。",
        "romaji": "Koukeisha ga fusoku shi, gijutsu ga uketsugarenai koto ga ookina gen'in de aru.",
        "de": "Ein Hauptgrund ist der Mangel an Nachfolgern und dass Techniken nicht weitergegeben werden."
      },
      {
        "tokens": [
          { "s": "職人", "r": "しょくにん", "g": "Handwerker" },
          { "s": "の", "g": "(von)" },
          { "s": "多く", "r": "おおく", "g": "viele" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "こうれい", "g": "hohes Alter" },
          { "s": "で", "g": "(und)" },
          { "s": "、", "p": true },
          { "s": "若い", "r": "わかい", "g": "jung" },
          { "s": "世代", "r": "せだい", "g": "Generation" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "都市", "r": "とし", "g": "Stadt" },
          { "s": "へ", "g": "(in)" },
          { "s": "出て", "r": "でて", "g": "hinausgehen und" },
          { "s": "いって", "g": "weggehen" },
          { "s": "しまう", "g": "(leider)" },
          { "s": "。", "p": true }
        ],
        "jp": "職人の多くはこうれいで、若い世代は都市へ出ていってしまう。",
        "romaji": "Shokunin no ooku wa kourei de, wakai sedai wa toshi e dete itte shimau.",
        "de": "Viele Handwerker sind alt, und die junge Generation zieht in die Städte."
      },
      {
        "tokens": [
          { "s": "伝統", "r": "でんとう", "g": "Tradition" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "まもる", "g": "bewahren" },
          { "s": "こと", "g": "(das)" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "、", "p": true },
          { "s": "けっして", "g": "keineswegs" },
          { "s": "かんたん", "g": "einfach" },
          { "s": "では", "g": "(nicht)" },
          { "s": "ない", "g": "ist nicht" },
          { "s": "。", "p": true }
        ],
        "jp": "伝統をまもることは、けっしてかんたんではない。",
        "romaji": "Dentou o mamoru koto wa, kesshite kantan de wa nai.",
        "de": "Die Tradition zu bewahren ist keineswegs einfach."
      },
      {
        "tokens": [
          { "s": "なぜなら", "g": "denn" },
          { "s": "、", "p": true },
          { "s": "それ", "g": "sie" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "ささえる", "g": "tragen / stützen" },
          { "s": "経済的", "r": "けいざいてき", "g": "wirtschaftlich" },
          { "s": "な", "g": "(Adj.)" },
          { "s": "きばん", "g": "Grundlage" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "よわまっている", "g": "wird schwächer" },
          { "s": "から", "g": "weil" },
          { "s": "だ", "g": "ist" },
          { "s": "。", "p": true }
        ],
        "jp": "なぜなら、それをささえる経済的なきばんがよわまっているからだ。",
        "romaji": "Nazenara, sore o sasaeru keizaiteki na kiban ga yowamatte iru kara da.",
        "de": "Denn die wirtschaftliche Grundlage, die sie trägt, wird schwächer."
      },
      {
        "tokens": [
          { "s": "近年", "r": "きんねん", "g": "in letzten Jahren" },
          { "s": "では", "g": "(zurzeit)" },
          { "s": "、", "p": true },
          { "s": "インターネット", "g": "Internet" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "いかして", "g": "nutzen und" },
          { "s": "作品", "r": "さくひん", "g": "Werke" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "世界", "r": "せかい", "g": "Welt" },
          { "s": "に", "g": "(in)" },
          { "s": "発信する", "r": "はっしんする", "g": "verbreiten" },
          { "s": "職人", "r": "しょくにん", "g": "Handwerker" },
          { "s": "も", "g": "auch" },
          { "s": "あらわれた", "g": "tauchten auf" },
          { "s": "。", "p": true }
        ],
        "jp": "近年では、インターネットをいかして作品を世界に発信する職人もあらわれた。",
        "romaji": "Kinnen de wa, intaanetto o ikashite sakuhin o sekai ni hasshin suru shokunin mo arawareta.",
        "de": "In den letzten Jahren tauchen auch Handwerker auf, die ihre Werke über das Internet weltweit verbreiten."
      },
      {
        "tokens": [
          { "s": "伝統", "r": "でんとう", "g": "Tradition" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "、", "p": true },
          { "s": "ただ", "g": "nur / bloß" },
          { "s": "まもる", "g": "bewahren" },
          { "s": "だけでなく", "g": "nicht nur" },
          { "s": "、", "p": true },
          { "s": "時代", "r": "じだい", "g": "Zeit / Ära" },
          { "s": "に", "g": "(an)" },
          { "s": "あわせて", "g": "anpassen an" },
          { "s": "かえて", "g": "verändern und" },
          { "s": "いく", "g": "(fortlaufend)" },
          { "s": "こと", "g": "(das)" },
          { "s": "も", "g": "auch" },
          { "s": "必要", "r": "ひつよう", "g": "nötig" },
          { "s": "だろう", "g": "wohl" },
          { "s": "。", "p": true }
        ],
        "jp": "伝統は、ただまもるだけでなく、時代にあわせてかえていくことも必要だろう。",
        "romaji": "Dentou wa, tada mamoru dake denaku, jidai ni awasete kaete iku koto mo hitsuyou darou.",
        "de": "Tradition muss man wohl nicht nur bewahren, sondern auch mit der Zeit verändern."
      },
      {
        "tokens": [
          { "s": "むかし", "g": "frühere Zeit" },
          { "s": "の", "g": "(von)" },
          { "s": "ちえ", "g": "Weisheit" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "みらい", "g": "Zukunft" },
          { "s": "へ", "g": "(zu)" },
          { "s": "つなぐ", "g": "verbinden" },
          { "s": "こと", "g": "(das)" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "、", "p": true },
          { "s": "私たち", "r": "わたしたち", "g": "uns" },
          { "s": "に", "g": "(von)" },
          { "s": "問われている", "r": "とわれている", "g": "wird gefordert" },
          { "s": "。", "p": true }
        ],
        "jp": "むかしのちえをみらいへつなぐことが、私たちに問われている。",
        "romaji": "Mukashi no chie o mirai e tsunagu koto ga, watashitachi ni towarete iru.",
        "de": "Die Weisheit der Vergangenheit mit der Zukunft zu verbinden — das wird von uns gefordert."
      }
    ]
  },
  {
    "id": "r-uchuu-kaihatsu",
    "title": "宇宙開発の これから",
    "titleReading": "うちゅうかいはつのこれから",
    "titleDe": "Die Zukunft der Raumfahrt",
    "level": "N1",
    "category": "Wissenschaft",
    "summary": "Von staatlichen Programmen zu privaten Unternehmen: über wiederverwendbare Raketen, Basen auf dem Mars und die unstillbare Neugier des Menschen.",
    "sentences": [
      {
        "tokens": [
          { "s": "宇宙開発", "r": "うちゅうかいはつ", "g": "Raumfahrt" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "、", "p": true },
          { "s": "二十世紀", "r": "にじっせいき", "g": "20. Jahrhundert" },
          { "s": "なかば", "g": "Mitte" },
          { "s": "から", "g": "seit" },
          { "s": "急速に", "r": "きゅうそくに", "g": "rasant" },
          { "s": "進んできた", "r": "すすんできた", "g": "hat sich entwickelt" },
          { "s": "。", "p": true }
        ],
        "jp": "宇宙開発は、二十世紀なかばから急速に進んできた。",
        "romaji": "Uchuu kaihatsu wa, nijusseiki nakaba kara kyuusoku ni susunde kita.",
        "de": "Die Raumfahrt hat sich seit Mitte des 20. Jahrhunderts rasant entwickelt."
      },
      {
        "tokens": [
          { "s": "かつて", "g": "einst" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "国家", "r": "こっか", "g": "Staat" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "中心", "r": "ちゅうしん", "g": "Zentrum" },
          { "s": "であった", "g": "war" },
          { "s": "が", "g": "aber" },
          { "s": "、", "p": true },
          { "s": "現在", "r": "げんざい", "g": "heute" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "民間企業", "r": "みんかんきぎょう", "g": "private Unternehmen" },
          { "s": "も", "g": "auch" },
          { "s": "参入している", "r": "さんにゅうしている", "g": "steigen ein" },
          { "s": "。", "p": true }
        ],
        "jp": "かつては国家が中心であったが、現在は民間企業も参入している。",
        "romaji": "Katsute wa kokka ga chuushin de atta ga, genzai wa minkan kigyou mo sannyuu shite iru.",
        "de": "Früher standen Staaten im Zentrum, heute steigen auch private Unternehmen ein."
      },
      {
        "tokens": [
          { "s": "ロケット", "g": "Rakete" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "くりかえし", "g": "wiederholt" },
          { "s": "利用する", "r": "りようする", "g": "verwenden" },
          { "s": "技術", "r": "ぎじゅつ", "g": "Technik" },
          { "s": "により", "g": "durch" },
          { "s": "、", "p": true },
          { "s": "費用", "r": "ひよう", "g": "Kosten" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "大はばに", "r": "おおはばに", "g": "enorm" },
          { "s": "下がった", "r": "さがった", "g": "sanken" },
          { "s": "。", "p": true }
        ],
        "jp": "ロケットをくりかえし利用する技術により、費用は大はばに下がった。",
        "romaji": "Roketto o kurikaeshi riyou suru gijutsu ni yori, hiyou wa oohaba ni sagatta.",
        "de": "Durch wiederverwendbare Raketen sind die Kosten enorm gesunken."
      },
      {
        "tokens": [
          { "s": "将来", "r": "しょうらい", "g": "Zukunft" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "、", "p": true },
          { "s": "一般", "r": "いっぱん", "g": "gewöhnlich" },
          { "s": "の", "g": "(von)" },
          { "s": "人", "r": "ひと", "g": "Menschen" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "宇宙", "r": "うちゅう", "g": "Weltall" },
          { "s": "へ", "g": "(in)" },
          { "s": "旅行できる", "r": "りょこうできる", "g": "reisen können" },
          { "s": "時代", "r": "じだい", "g": "Zeit / Ära" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "来る", "r": "くる", "g": "kommen" },
          { "s": "かもしれない", "g": "könnte (sein)" },
          { "s": "。", "p": true }
        ],
        "jp": "将来は、一般の人が宇宙へ旅行できる時代が来るかもしれない。",
        "romaji": "Shourai wa, ippan no hito ga uchuu e ryokou dekiru jidai ga kuru kamoshirenai.",
        "de": "In Zukunft könnte eine Zeit kommen, in der gewöhnliche Menschen ins All reisen."
      },
      {
        "tokens": [
          { "s": "また", "g": "auch" },
          { "s": "、", "p": true },
          { "s": "月", "r": "つき", "g": "Mond" },
          { "s": "や", "g": "und (u. a.)" },
          { "s": "火星", "r": "かせい", "g": "Mars" },
          { "s": "に", "g": "(auf)" },
          { "s": "きち", "g": "Basis / Stützpunkt" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "つくる", "g": "errichten" },
          { "s": "けいかく", "g": "Pläne" },
          { "s": "も", "g": "auch" },
          { "s": "すすめられている", "g": "werden vorangetrieben" },
          { "s": "。", "p": true }
        ],
        "jp": "また、月や火星にきちをつくるけいかくもすすめられている。",
        "romaji": "Mata, tsuki ya kasei ni kichi o tsukuru keikaku mo susumerarete iru.",
        "de": "Auch werden Pläne vorangetrieben, Basen auf Mond und Mars zu errichten."
      },
      {
        "tokens": [
          { "s": "しかし", "g": "jedoch" },
          { "s": "、", "p": true },
          { "s": "宇宙開発", "r": "うちゅうかいはつ", "g": "Raumfahrt" },
          { "s": "には", "g": "(mit)" },
          { "s": "ぼうだいな", "g": "gewaltig" },
          { "s": "費用", "r": "ひよう", "g": "Kosten" },
          { "s": "と", "g": "und" },
          { "s": "きけん", "g": "Gefahr" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "ともなう", "g": "gehen einher" },
          { "s": "。", "p": true }
        ],
        "jp": "しかし、宇宙開発にはぼうだいな費用ときけんがともなう。",
        "romaji": "Shikashi, uchuu kaihatsu ni wa boudai na hiyou to kiken ga tomonau.",
        "de": "Doch mit der Raumfahrt gehen gewaltige Kosten und Gefahren einher."
      },
      {
        "tokens": [
          { "s": "地球", "r": "ちきゅう", "g": "Erde" },
          { "s": "の", "g": "(von)" },
          { "s": "問題", "r": "もんだい", "g": "Probleme" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "そっちのけに", "g": "vernachlässigen" },
          { "s": "して", "g": "tun und" },
          { "s": "よいのか", "g": "ob es gut ist" },
          { "s": "、", "p": true },
          { "s": "という", "g": "(die Frage)" },
          { "s": "声", "r": "こえ", "g": "Stimmen" },
          { "s": "も", "g": "auch" },
          { "s": "ある", "g": "gibt es" },
          { "s": "。", "p": true }
        ],
        "jp": "地球の問題をそっちのけにしてよいのか、という声もある。",
        "romaji": "Chikyuu no mondai o sotchinoke ni shite yoi no ka, to iu koe mo aru.",
        "de": "Es gibt auch Stimmen, ob man die Probleme der Erde dafür vernachlässigen darf."
      },
      {
        "tokens": [
          { "s": "それでも", "g": "dennoch" },
          { "s": "、", "p": true },
          { "s": "未知", "r": "みち", "g": "unbekannt" },
          { "s": "の", "g": "(von)" },
          { "s": "世界", "r": "せかい", "g": "Welt" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "求める", "r": "もとめる", "g": "suchen nach" },
          { "s": "人間", "r": "にんげん", "g": "Mensch" },
          { "s": "の", "g": "(von)" },
          { "s": "好奇心", "r": "こうきしん", "g": "Neugier" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "とまらない", "g": "lässt sich nicht aufhalten" },
          { "s": "。", "p": true }
        ],
        "jp": "それでも、未知の世界を求める人間の好奇心はとまらない。",
        "romaji": "Soredemo, michi no sekai o motomeru ningen no koukishin wa tomaranai.",
        "de": "Dennoch lässt sich die Neugier des Menschen nach dem Unbekannten nicht aufhalten."
      },
      {
        "tokens": [
          { "s": "宇宙", "r": "うちゅう", "g": "Weltall" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "、", "p": true },
          { "s": "人類", "r": "じんるい", "g": "Menschheit" },
          { "s": "にとって", "g": "für" },
          { "s": "さいごの", "g": "letzte" },
          { "s": "フロンティア", "g": "Grenze / Frontier" },
          { "s": "なのかもしれない", "g": "ist vielleicht" },
          { "s": "。", "p": true }
        ],
        "jp": "宇宙は、人類にとってさいごのフロンティアなのかもしれない。",
        "romaji": "Uchuu wa, jinrui ni totte saigo no furontia na no kamoshirenai.",
        "de": "Das All ist für die Menschheit vielleicht die letzte Grenze."
      }
    ]
  },
  {
    "id": "r-guroobaruka-to-tayousei",
    "title": "グローバル化と たようせい",
    "titleReading": "グローバルかとたようせい",
    "titleDe": "Globalisierung und Vielfalt",
    "level": "N1",
    "category": "Gesellschaft",
    "summary": "Wenn Kulturen aufeinandertreffen, entstehen Reibung und Chancen zugleich. Ein Plädoyer für eine Haltung des gegenseitigen Respekts.",
    "sentences": [
      {
        "tokens": [
          { "s": "グローバル化", "r": "グローバルか", "g": "Globalisierung" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "進み", "r": "すすみ", "g": "voranschreiten und" },
          { "s": "、", "p": true },
          { "s": "人", "r": "ひと", "g": "Menschen" },
          { "s": "や", "g": "und (u. a.)" },
          { "s": "もの", "g": "Güter" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "国境", "r": "こっきょう", "g": "Grenze" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "こえて", "g": "überschreiten und" },
          { "s": "行き来する", "r": "ゆききする", "g": "hin und her gehen" },
          { "s": "ように", "g": "(dazu)" },
          { "s": "なった", "g": "ist geworden" },
          { "s": "。", "p": true }
        ],
        "jp": "グローバル化が進み、人やものが国境をこえて行き来するようになった。",
        "romaji": "Guroobaruka ga susumi, hito ya mono ga kokkyou o koete yukiki suru you ni natta.",
        "de": "Die Globalisierung schreitet voran, und Menschen und Güter bewegen sich über Grenzen."
      },
      {
        "tokens": [
          { "s": "こうした", "g": "solche" },
          { "s": "流れ", "r": "ながれ", "g": "Strömung" },
          { "s": "の", "g": "(von)" },
          { "s": "中", "r": "なか", "g": "inmitten" },
          { "s": "で", "g": "(in)" },
          { "s": "、", "p": true },
          { "s": "さまざまな", "g": "verschiedene" },
          { "s": "文化", "r": "ぶんか", "g": "Kulturen" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "ふれあう", "g": "aufeinandertreffen" },
          { "s": "きかい", "g": "Gelegenheiten" },
          { "s": "も", "g": "auch" },
          { "s": "増えている", "r": "ふえている", "g": "nehmen zu" },
          { "s": "。", "p": true }
        ],
        "jp": "こうした流れの中で、さまざまな文化がふれあうきかいも増えている。",
        "romaji": "Kou shita nagare no naka de, samazama na bunka ga fureau kikai mo fuete iru.",
        "de": "In diesem Strom nehmen die Gelegenheiten zu, dass verschiedene Kulturen aufeinandertreffen."
      },
      {
        "tokens": [
          { "s": "ちがう", "g": "unterschiedlich" },
          { "s": "かちかん", "g": "Werte" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "持つ", "r": "もつ", "g": "haben" },
          { "s": "人々", "r": "ひとびと", "g": "Menschen" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "ともに", "g": "zusammen" },
          { "s": "はたらく", "g": "arbeiten" },
          { "s": "こと", "g": "(das)" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "、", "p": true },
          { "s": "もはや", "g": "längst (nicht mehr)" },
          { "s": "めずらしくない", "g": "nicht selten" },
          { "s": "。", "p": true }
        ],
        "jp": "ちがうかちかんを持つ人々がともにはたらくことは、もはやめずらしくない。",
        "romaji": "Chigau kachikan o motsu hitobito ga tomo ni hataraku koto wa, mohaya mezurashikunai.",
        "de": "Dass Menschen mit unterschiedlichen Werten zusammenarbeiten, ist längst nicht mehr selten."
      },
      {
        "tokens": [
          { "s": "しかし", "g": "jedoch" },
          { "s": "、", "p": true },
          { "s": "文化", "r": "ぶんか", "g": "Kultur" },
          { "s": "の", "g": "(von)" },
          { "s": "ちがい", "g": "Unterschied" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "ときに", "g": "mitunter" },
          { "s": "ごかい", "g": "Missverständnis" },
          { "s": "や", "g": "und (u. a.)" },
          { "s": "たいりつ", "g": "Konflikt" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "生む", "r": "うむ", "g": "erzeugen" },
          { "s": "こと", "g": "(das)" },
          { "s": "も", "g": "auch" },
          { "s": "ある", "g": "gibt es" },
          { "s": "。", "p": true }
        ],
        "jp": "しかし、文化のちがいはときにごかいやたいりつを生むこともある。",
        "romaji": "Shikashi, bunka no chigai wa toki ni gokai ya tairitsu o umu koto mo aru.",
        "de": "Doch kulturelle Unterschiede führen mitunter zu Missverständnissen oder Konflikten."
      },
      {
        "tokens": [
          { "s": "たいせつ", "g": "wichtig" },
          { "s": "な", "g": "(Adj.)" },
          { "s": "の", "g": "(das)" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "、", "p": true },
          { "s": "ちがい", "g": "Unterschiede" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "みとめ", "g": "anerkennen und" },
          { "s": "、", "p": true },
          { "s": "たがいに", "g": "gegenseitig" },
          { "s": "そんちょうし", "g": "respektieren und" },
          { "s": "あう", "g": "einander" },
          { "s": "しせい", "g": "Haltung" },
          { "s": "である", "g": "ist" },
          { "s": "。", "p": true }
        ],
        "jp": "たいせつなのは、ちがいをみとめ、たがいにそんちょうしあうしせいである。",
        "romaji": "Taisetsu na no wa, chigai o mitome, tagai ni sonchou shi au shisei de aru.",
        "de": "Wichtig ist die Haltung, Unterschiede anzuerkennen und einander zu respektieren."
      },
      {
        "tokens": [
          { "s": "自分", "r": "じぶん", "g": "selbst / eigen" },
          { "s": "の", "g": "(von)" },
          { "s": "文化", "r": "ぶんか", "g": "Kultur" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "まもりつつ", "g": "während man bewahrt" },
          { "s": "、", "p": true },
          { "s": "他者", "r": "たしゃ", "g": "andere" },
          { "s": "の", "g": "(von)" },
          { "s": "文化", "r": "ぶんか", "g": "Kultur" },
          { "s": "も", "g": "auch" },
          { "s": "理解しようと", "r": "りかいしようと", "g": "zu verstehen versuchen" },
          { "s": "する", "g": "(versuchen)" },
          { "s": "。", "p": true }
        ],
        "jp": "自分の文化をまもりつつ、他者の文化も理解しようとする。",
        "romaji": "Jibun no bunka o mamoritsutsu, tasha no bunka mo rikai shiyou to suru.",
        "de": "Man bewahrt die eigene Kultur und versucht zugleich, die der anderen zu verstehen."
      },
      {
        "tokens": [
          { "s": "その", "g": "diese" },
          { "s": "バランス", "g": "Balance" },
          { "s": "こそ", "g": "gerade / genau" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "、", "p": true },
          { "s": "これから", "g": "künftig" },
          { "s": "の", "g": "(von)" },
          { "s": "社会", "r": "しゃかい", "g": "Gesellschaft" },
          { "s": "に", "g": "(von)" },
          { "s": "求められている", "r": "もとめられている", "g": "wird verlangt" },
          { "s": "。", "p": true }
        ],
        "jp": "そのバランスこそが、これからの社会に求められている。",
        "romaji": "Sono baransu koso ga, korekara no shakai ni motomerarete iru.",
        "de": "Genau diese Balance wird von der künftigen Gesellschaft verlangt."
      },
      {
        "tokens": [
          { "s": "たようせい", "g": "Vielfalt" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "、", "p": true },
          { "s": "まさつ", "g": "Reibung" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "生む", "r": "うむ", "g": "erzeugen" },
          { "s": "一方で", "r": "いっぽうで", "g": "andererseits" },
          { "s": "、", "p": true },
          { "s": "新しい", "r": "あたらしい", "g": "neu" },
          { "s": "価値", "r": "かち", "g": "Wert" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "生み出す", "r": "うみだす", "g": "hervorbringen" },
          { "s": "力", "r": "ちから", "g": "Kraft" },
          { "s": "にも", "g": "auch zu" },
          { "s": "なる", "g": "wird" },
          { "s": "。", "p": true }
        ],
        "jp": "たようせいは、まさつを生む一方で、新しい価値を生み出す力にもなる。",
        "romaji": "Tayousei wa, masatsu o umu ippou de, atarashii kachi o umidasu chikara ni mo naru.",
        "de": "Vielfalt erzeugt Reibung, wird aber zugleich zur Kraft, neue Werte hervorzubringen."
      },
      {
        "tokens": [
          { "s": "ちがい", "g": "Unterschiede" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "おそれず", "g": "ohne zu fürchten" },
          { "s": "、", "p": true },
          { "s": "ゆたかさ", "g": "Reichtum" },
          { "s": "へと", "g": "hin zu" },
          { "s": "かえて", "g": "verwandeln und" },
          { "s": "いく", "g": "(fortlaufend)" },
          { "s": "ちえ", "g": "Weisheit" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "問われている", "r": "とわれている", "g": "wird gefragt" },
          { "s": "。", "p": true }
        ],
        "jp": "ちがいをおそれず、ゆたかさへとかえていくちえが問われている。",
        "romaji": "Chigai o osorezu, yutakasa e to kaete iku chie ga towarete iru.",
        "de": "Gefragt ist die Weisheit, Unterschiede nicht zu fürchten, sondern in Reichtum zu verwandeln."
      }
    ]
  },
  {
    "id": "r-dokusho-no-igi",
    "title": "読書の いぎ",
    "titleReading": "どくしょのいぎ",
    "titleDe": "Der Sinn des Lesens",
    "level": "N1",
    "category": "Bildung",
    "summary": "In Zeiten des Smartphones lesen weniger Menschen Bücher. Ein nachdenklicher Essay darüber, warum Lektüre das Herz reicher macht.",
    "sentences": [
      {
        "tokens": [
          { "s": "スマートフォン", "g": "Smartphone" },
          { "s": "の", "g": "(von)" },
          { "s": "ふきゅう", "g": "Verbreitung" },
          { "s": "により", "g": "durch" },
          { "s": "、", "p": true },
          { "s": "本", "r": "ほん", "g": "Buch / Bücher" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "読む", "r": "よむ", "g": "lesen" },
          { "s": "人", "r": "ひと", "g": "Menschen" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "へった", "g": "abgenommen" },
          { "s": "と", "g": "(dass)" },
          { "s": "いわれて", "g": "gesagt wird" },
          { "s": "久しい", "r": "ひさしい", "g": "seit Langem" },
          { "s": "。", "p": true }
        ],
        "jp": "スマートフォンのふきゅうにより、本を読む人がへったといわれて久しい。",
        "romaji": "Sumaatofon no fukyuu ni yori, hon o yomu hito ga hetta to iwarete hisashii.",
        "de": "Seit Langem heißt es, dass durch die Verbreitung der Smartphones weniger Menschen lesen."
      },
      {
        "tokens": [
          { "s": "たしかに", "g": "sicherlich" },
          { "s": "、", "p": true },
          { "s": "じょうほう", "g": "Information" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "える", "g": "erlangen" },
          { "s": "だけ", "g": "nur" },
          { "s": "なら", "g": "wenn" },
          { "s": "、", "p": true },
          { "s": "ネット", "g": "Internet" },
          { "s": "の", "g": "(von)" },
          { "s": "ほう", "g": "(eher)" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "はやい", "g": "schneller" },
          { "s": "。", "p": true }
        ],
        "jp": "たしかに、じょうほうをえるだけなら、ネットのほうがはやい。",
        "romaji": "Tashika ni, jouhou o eru dake nara, netto no hou ga hayai.",
        "de": "Sicher, wenn es nur ums Informieren geht, ist das Internet schneller."
      },
      {
        "tokens": [
          { "s": "しかし", "g": "jedoch" },
          { "s": "、", "p": true },
          { "s": "読書", "r": "どくしょ", "g": "Lesen / Lektüre" },
          { "s": "には", "g": "(hat)" },
          { "s": "それ", "g": "das" },
          { "s": "いじょう", "g": "darüber hinaus" },
          { "s": "の", "g": "(von)" },
          { "s": "かち", "g": "Wert" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "ある", "g": "gibt es" },
          { "s": "と", "g": "(dass)" },
          { "s": "私", "r": "わたし", "g": "ich" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "考える", "r": "かんがえる", "g": "meine ich" },
          { "s": "。", "p": true }
        ],
        "jp": "しかし、読書にはそれいじょうのかちがあると私は考える。",
        "romaji": "Shikashi, dokusho ni wa sore ijou no kachi ga aru to watashi wa kangaeru.",
        "de": "Doch das Lesen hat, so meine ich, einen darüber hinausgehenden Wert."
      },
      {
        "tokens": [
          { "s": "一冊", "r": "いっさつ", "g": "ein (Buch)" },
          { "s": "の", "g": "(von)" },
          { "s": "本", "r": "ほん", "g": "Buch" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "じっくり", "g": "in Ruhe / gründlich" },
          { "s": "読む", "r": "よむ", "g": "lesen" },
          { "s": "とき", "g": "wenn" },
          { "s": "、", "p": true },
          { "s": "私たち", "r": "わたしたち", "g": "wir" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "著者", "r": "ちょしゃ", "g": "Autor" },
          { "s": "の", "g": "(von)" },
          { "s": "思考", "r": "しこう", "g": "Gedanken" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "たどっていく", "g": "folgen nach" },
          { "s": "。", "p": true }
        ],
        "jp": "一冊の本をじっくり読むとき、私たちは著者の思考をたどっていく。",
        "romaji": "Issatsu no hon o jikkuri yomu toki, watashitachi wa chosha no shikou o tadotte iku.",
        "de": "Wenn wir ein Buch in Ruhe lesen, folgen wir den Gedanken des Autors."
      },
      {
        "tokens": [
          { "s": "それ", "g": "das" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "、", "p": true },
          { "s": "自分", "r": "じぶん", "g": "selbst" },
          { "s": "とは", "g": "(im Vergleich zu)" },
          { "s": "ちがう", "g": "anders" },
          { "s": "人生", "r": "じんせい", "g": "Leben" },
          { "s": "や", "g": "und (u. a.)" },
          { "s": "かちかん", "g": "Werte" },
          { "s": "に", "g": "(an)" },
          { "s": "ふれる", "g": "begegnen" },
          { "s": "たいけん", "g": "Erfahrung" },
          { "s": "である", "g": "ist" },
          { "s": "。", "p": true }
        ],
        "jp": "それは、自分とはちがう人生やかちかんにふれるたいけんである。",
        "romaji": "Sore wa, jibun to wa chigau jinsei ya kachikan ni fureru taiken de aru.",
        "de": "Das ist eine Erfahrung, anderem Leben und anderen Werten zu begegnen."
      },
      {
        "tokens": [
          { "s": "物語", "r": "ものがたり", "g": "Geschichte" },
          { "s": "の", "g": "(von)" },
          { "s": "登場人物", "r": "とうじょうじんぶつ", "g": "Figuren" },
          { "s": "に", "g": "(mit)" },
          { "s": "共感し", "r": "きょうかんし", "g": "mitfühlen und" },
          { "s": "、", "p": true },
          { "s": "なみだ", "g": "Tränen" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "ながす", "g": "vergießen" },
          { "s": "こと", "g": "(das)" },
          { "s": "も", "g": "auch" },
          { "s": "ある", "g": "gibt es" },
          { "s": "だろう", "g": "wohl" },
          { "s": "。", "p": true }
        ],
        "jp": "物語の登場人物に共感し、なみだをながすこともあるだろう。",
        "romaji": "Monogatari no toujou jinbutsu ni kyoukan shi, namida o nagasu koto mo aru darou.",
        "de": "Man fühlt mit den Figuren einer Geschichte und vergießt vielleicht Tränen."
      },
      {
        "tokens": [
          { "s": "そうした", "g": "solche" },
          { "s": "けいけん", "g": "Erfahrungen" },
          { "s": "の", "g": "(von)" },
          { "s": "つみかさね", "g": "Summe" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "、", "p": true },
          { "s": "人", "r": "ひと", "g": "Mensch" },
          { "s": "の", "g": "(von)" },
          { "s": "こころ", "g": "Herz" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "ゆたかに", "g": "reich(er)" },
          { "s": "する", "g": "macht" },
          { "s": "。", "p": true }
        ],
        "jp": "そうしたけいけんのつみかさねが、人のこころをゆたかにする。",
        "romaji": "Sou shita keiken no tsumikasane ga, hito no kokoro o yutaka ni suru.",
        "de": "Die Summe solcher Erfahrungen macht das Herz eines Menschen reicher."
      },
      {
        "tokens": [
          { "s": "いそがしい", "g": "hektisch" },
          { "s": "まいにち", "g": "Alltag" },
          { "s": "だからこそ", "g": "gerade deshalb" },
          { "s": "、", "p": true },
          { "s": "本", "r": "ほん", "g": "Buch" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "ひらく", "g": "aufschlagen" },
          { "s": "時間", "r": "じかん", "g": "Zeit" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "もちたい", "g": "möchte haben" },
          { "s": "。", "p": true }
        ],
        "jp": "いそがしいまいにちだからこそ、本をひらく時間をもちたい。",
        "romaji": "Isogashii mainichi dakara koso, hon o hiraku jikan o mochitai.",
        "de": "Gerade weil der Alltag hektisch ist, möchte man sich Zeit zum Lesen nehmen."
      },
      {
        "tokens": [
          { "s": "一冊", "r": "いっさつ", "g": "ein (Buch)" },
          { "s": "の", "g": "(von)" },
          { "s": "本", "r": "ほん", "g": "Buch" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "、", "p": true },
          { "s": "人生", "r": "じんせい", "g": "Leben" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "かえる", "g": "verändern" },
          { "s": "こと", "g": "(das)" },
          { "s": "さえ", "g": "sogar" },
          { "s": "ある", "g": "gibt es" },
          { "s": "のだから", "g": "denn" },
          { "s": "。", "p": true }
        ],
        "jp": "一冊の本が、人生をかえることさえあるのだから。",
        "romaji": "Issatsu no hon ga, jinsei o kaeru koto sae aru no dakara.",
        "de": "Denn ein einziges Buch kann sogar ein Leben verändern."
      }
    ]
  },
  {
    "id": "r-watashi-no-ichinichi",
    "title": "わたしの 一日",
    "titleReading": "わたしのいちにち",
    "titleDe": "Mein Tagesablauf",
    "level": "N5",
    "category": "Tagesablauf",
    "summary": "Ein einfacher Text über einen ganz normalen Schultag von morgens bis abends.",
    "sentences": [
      {
        "tokens": [
          { "s": "わたし", "g": "ich" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "学校", "r": "がっこう", "g": "Schule" },
          { "s": "へ", "g": "(nach/zu)" },
          { "s": "あるいて", "g": "zu Fuß" },
          { "s": "いきます", "g": "gehe" },
          { "s": "。", "p": true }
        ],
        "jp": "わたしは学校へあるいていきます。",
        "romaji": "Watashi wa gakkou e aruite ikimasu.",
        "de": "Ich gehe zu Fuß zur Schule."
      },
      {
        "tokens": [
          { "s": "学校", "r": "がっこう", "g": "Schule" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "八時", "r": "はちじ", "g": "8 Uhr" },
          { "s": "に", "g": "(um)" },
          { "s": "はじまります", "g": "beginnt" },
          { "s": "。", "p": true }
        ],
        "jp": "学校は八時にはじまります。",
        "romaji": "Gakkou wa hachiji ni hajimarimasu.",
        "de": "Die Schule beginnt um 8 Uhr."
      },
      {
        "tokens": [
          { "s": "午前", "r": "ごぜん", "g": "Vormittag" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "日本語", "r": "にほんご", "g": "Japanisch" },
          { "s": "と", "g": "und" },
          { "s": "数学", "r": "すうがく", "g": "Mathematik" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "勉強", "r": "べんきょう", "g": "lernen" },
          { "s": "します", "g": "(tue)" },
          { "s": "。", "p": true }
        ],
        "jp": "午前は日本語と数学を勉強します。",
        "romaji": "Gozen wa nihongo to suugaku o benkyou shimasu.",
        "de": "Vormittags lerne ich Japanisch und Mathematik."
      },
      {
        "tokens": [
          { "s": "昼", "r": "ひる", "g": "Mittag" },
          { "s": "に", "g": "(zu)" },
          { "s": "友だち", "r": "ともだち", "g": "Freunde" },
          { "s": "と", "g": "mit" },
          { "s": "昼ごはん", "r": "ひるごはん", "g": "Mittagessen" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "たべます", "g": "esse" },
          { "s": "。", "p": true }
        ],
        "jp": "昼に友だちと昼ごはんをたべます。",
        "romaji": "Hiru ni tomodachi to hirugohan o tabemasu.",
        "de": "Mittags esse ich mit Freunden zu Mittag."
      },
      {
        "tokens": [
          { "s": "午後", "r": "ごご", "g": "Nachmittag" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "クラブ", "g": "Club / AG" },
          { "s": "で", "g": "(in/bei)" },
          { "s": "サッカー", "g": "Fußball" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "します", "g": "mache" },
          { "s": "。", "p": true }
        ],
        "jp": "午後はクラブでサッカーをします。",
        "romaji": "Gogo wa kurabu de sakkaa o shimasu.",
        "de": "Nachmittags spiele ich in der AG Fußball."
      },
      {
        "tokens": [
          { "s": "家", "r": "いえ", "g": "Zuhause" },
          { "s": "に", "g": "(nach)" },
          { "s": "帰って", "r": "かえって", "g": "zurück und" },
          { "s": "、", "p": true },
          { "s": "テレビ", "g": "Fernsehen" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "見", "r": "み", "g": "sehen" },
          { "s": "ます", "g": "(tue)" },
          { "s": "。", "p": true }
        ],
        "jp": "家に帰って、テレビを見ます。",
        "romaji": "Ie ni kaette, terebi o mimasu.",
        "de": "Ich gehe nach Hause und sehe fern."
      },
      {
        "tokens": [
          { "s": "夜", "r": "よる", "g": "Abend / Nacht" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "十時", "r": "じゅうじ", "g": "10 Uhr" },
          { "s": "に", "g": "(um)" },
          { "s": "ねます", "g": "schlafe" },
          { "s": "。", "p": true }
        ],
        "jp": "夜は十時にねます。",
        "romaji": "Yoru wa juuji ni nemasu.",
        "de": "Abends gehe ich um 10 Uhr schlafen."
      }
    ]
  },
  {
    "id": "r-kyou-no-tenki",
    "title": "きょうの てんき",
    "titleReading": "きょうのてんき",
    "titleDe": "Das Wetter heute",
    "level": "N5",
    "category": "Wetter",
    "summary": "Ein kurzer Text über das Wetter und passende Kleidung an verschiedenen Tagen.",
    "sentences": [
      {
        "tokens": [
          { "s": "今日", "r": "きょう", "g": "Heute" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "いい", "g": "gut" },
          { "s": "てんき", "g": "Wetter" },
          { "s": "です", "g": "ist" },
          { "s": "。", "p": true }
        ],
        "jp": "今日はいいてんきです。",
        "romaji": "Kyou wa ii tenki desu.",
        "de": "Heute ist schönes Wetter."
      },
      {
        "tokens": [
          { "s": "空", "r": "そら", "g": "Himmel" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "あおくて", "g": "blau und" },
          { "s": "、", "p": true },
          { "s": "かぜ", "g": "Wind" },
          { "s": "も", "g": "auch" },
          { "s": "きもちいい", "g": "angenehm" },
          { "s": "です", "g": "ist" },
          { "s": "。", "p": true }
        ],
        "jp": "空があおくて、かぜもきもちいいです。",
        "romaji": "Sora ga aokute, kaze mo kimochi ii desu.",
        "de": "Der Himmel ist blau und auch der Wind ist angenehm."
      },
      {
        "tokens": [
          { "s": "昨日", "r": "きのう", "g": "Gestern" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "あめ", "g": "Regen" },
          { "s": "でした", "g": "war" },
          { "s": "。", "p": true }
        ],
        "jp": "昨日はあめでした。",
        "romaji": "Kinou wa ame deshita.",
        "de": "Gestern hat es geregnet."
      },
      {
        "tokens": [
          { "s": "さむかった", "g": "kalt (war)" },
          { "s": "ので", "g": "weil" },
          { "s": "、", "p": true },
          { "s": "コート", "g": "Mantel" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "きました", "g": "zog an" },
          { "s": "。", "p": true }
        ],
        "jp": "さむかったので、コートをきました。",
        "romaji": "Samukatta node, kooto o kimashita.",
        "de": "Weil es kalt war, zog ich einen Mantel an."
      },
      {
        "tokens": [
          { "s": "明日", "r": "あした", "g": "Morgen" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "くもり", "g": "bewölkt" },
          { "s": "でしょう", "g": "wohl" },
          { "s": "。", "p": true }
        ],
        "jp": "明日はくもりでしょう。",
        "romaji": "Ashita wa kumori deshou.",
        "de": "Morgen wird es wohl bewölkt sein."
      },
      {
        "tokens": [
          { "s": "かさ", "g": "Schirm" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "もって", "g": "nehmen und" },
          { "s": "いきます", "g": "gehe" },
          { "s": "。", "p": true }
        ],
        "jp": "かさをもっていきます。",
        "romaji": "Kasa o motte ikimasu.",
        "de": "Ich nehme einen Schirm mit."
      },
      {
        "tokens": [
          { "s": "はやく", "g": "schnell / bald" },
          { "s": "はれる", "g": "aufklaren" },
          { "s": "と", "g": "(wenn)" },
          { "s": "いい", "g": "gut" },
          { "s": "です", "g": "ist" },
          { "s": "ね", "g": "nicht wahr" },
          { "s": "。", "p": true }
        ],
        "jp": "はやくはれるといいですね。",
        "romaji": "Hayaku hareru to ii desu ne.",
        "de": "Schön wäre es, wenn es bald aufklart."
      }
    ]
  },
  {
    "id": "r-watashi-no-neko",
    "title": "わたしの ねこ",
    "titleReading": "わたしのねこ",
    "titleDe": "Meine Katze",
    "level": "N5",
    "category": "Haustier",
    "summary": "Eine kleine Vorstellung des eigenen Haustiers: Name, Aussehen und Lieblingsplätze.",
    "sentences": [
      {
        "tokens": [
          { "s": "わたし", "g": "ich" },
          { "s": "の", "g": "(von)" },
          { "s": "うち", "g": "Zuhause" },
          { "s": "に", "g": "(in)" },
          { "s": "ねこ", "g": "Katze" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "います", "g": "gibt es" },
          { "s": "。", "p": true }
        ],
        "jp": "わたしのうちにねこがいます。",
        "romaji": "Watashi no uchi ni neko ga imasu.",
        "de": "Bei mir zu Hause gibt es eine Katze."
      },
      {
        "tokens": [
          { "s": "名前", "r": "なまえ", "g": "Name" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "タマ", "g": "Tama" },
          { "s": "です", "g": "ist" },
          { "s": "。", "p": true }
        ],
        "jp": "名前はタマです。",
        "romaji": "Namae wa Tama desu.",
        "de": "Sie heißt Tama."
      },
      {
        "tokens": [
          { "s": "しろくて", "g": "weiß und" },
          { "s": "、", "p": true },
          { "s": "目", "r": "め", "g": "Augen" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "あおい", "g": "blau" },
          { "s": "です", "g": "ist" },
          { "s": "。", "p": true }
        ],
        "jp": "しろくて、目があおいです。",
        "romaji": "Shirokute, me ga aoi desu.",
        "de": "Sie ist weiß und hat blaue Augen."
      },
      {
        "tokens": [
          { "s": "タマ", "g": "Tama" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "まどべ", "g": "am Fenster" },
          { "s": "で", "g": "(an)" },
          { "s": "ねる", "g": "schlafen" },
          { "s": "の", "g": "(das)" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "すき", "g": "mag" },
          { "s": "です", "g": "(tut)" },
          { "s": "。", "p": true }
        ],
        "jp": "タマはまどべでねるのがすきです。",
        "romaji": "Tama wa madobe de neru no ga suki desu.",
        "de": "Tama schläft gern am Fenster."
      },
      {
        "tokens": [
          { "s": "毎日", "r": "まいにち", "g": "jeden Tag" },
          { "s": "いっしょ", "g": "zusammen" },
          { "s": "に", "g": "(mit)" },
          { "s": "あそびます", "g": "spiele" },
          { "s": "。", "p": true }
        ],
        "jp": "毎日いっしょにあそびます。",
        "romaji": "Mainichi issho ni asobimasu.",
        "de": "Jeden Tag spiele ich mit ihr."
      },
      {
        "tokens": [
          { "s": "とても", "g": "sehr" },
          { "s": "かわいくて", "g": "niedlich und" },
          { "s": "、", "p": true },
          { "s": "大切", "r": "たいせつ", "g": "wichtig / lieb" },
          { "s": "な", "g": "(Adjektiv)" },
          { "s": "かぞく", "g": "Familie" },
          { "s": "です", "g": "ist" },
          { "s": "。", "p": true }
        ],
        "jp": "とてもかわいくて、大切なかぞくです。",
        "romaji": "Totemo kawaikute, taisetsu na kazoku desu.",
        "de": "Sie ist sehr niedlich und ein liebes Familienmitglied."
      }
    ]
  },
  {
    "id": "r-shumi-wa-ongaku",
    "title": "しゅみは おんがく",
    "titleReading": "しゅみはおんがく",
    "titleDe": "Mein Hobby ist Musik",
    "level": "N5",
    "category": "Hobby",
    "summary": "Ein einfacher Text über ein Lieblingshobby und warum es Freude macht.",
    "sentences": [
      {
        "tokens": [
          { "s": "わたし", "g": "ich" },
          { "s": "の", "g": "(von)" },
          { "s": "しゅみ", "g": "Hobby" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "おんがく", "g": "Musik" },
          { "s": "です", "g": "ist" },
          { "s": "。", "p": true }
        ],
        "jp": "わたしのしゅみはおんがくです。",
        "romaji": "Watashi no shumi wa ongaku desu.",
        "de": "Mein Hobby ist Musik."
      },
      {
        "tokens": [
          { "s": "毎日", "r": "まいにち", "g": "jeden Tag" },
          { "s": "ギター", "g": "Gitarre" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "れんしゅう", "g": "üben" },
          { "s": "します", "g": "(tue)" },
          { "s": "。", "p": true }
        ],
        "jp": "毎日ギターをれんしゅうします。",
        "romaji": "Mainichi gitaa o renshuu shimasu.",
        "de": "Jeden Tag übe ich Gitarre."
      },
      {
        "tokens": [
          { "s": "むずかしい", "g": "schwierig" },
          { "s": "です", "g": "ist" },
          { "s": "が", "g": "aber" },
          { "s": "、", "p": true },
          { "s": "とても", "g": "sehr" },
          { "s": "たのしい", "g": "schön / spaßig" },
          { "s": "です", "g": "ist" },
          { "s": "。", "p": true }
        ],
        "jp": "むずかしいですが、とてもたのしいです。",
        "romaji": "Muzukashii desu ga, totemo tanoshii desu.",
        "de": "Es ist schwierig, aber es macht viel Spaß."
      },
      {
        "tokens": [
          { "s": "日曜日", "r": "にちようび", "g": "Sonntag" },
          { "s": "に", "g": "(am)" },
          { "s": "友だち", "r": "ともだち", "g": "Freunde" },
          { "s": "と", "g": "mit" },
          { "s": "歌", "r": "うた", "g": "Lied / singen" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "うたいます", "g": "singe" },
          { "s": "。", "p": true }
        ],
        "jp": "日曜日に友だちと歌をうたいます。",
        "romaji": "Nichiyoubi ni tomodachi to uta o utaimasu.",
        "de": "Sonntags singe ich mit Freunden."
      },
      {
        "tokens": [
          { "s": "来年", "r": "らいねん", "g": "nächstes Jahr" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "ピアノ", "g": "Klavier" },
          { "s": "も", "g": "auch" },
          { "s": "ならいたい", "g": "lernen möchten" },
          { "s": "です", "g": "(tue)" },
          { "s": "。", "p": true }
        ],
        "jp": "来年はピアノもならいたいです。",
        "romaji": "Rainen wa piano mo naraitai desu.",
        "de": "Nächstes Jahr möchte ich auch Klavier lernen."
      },
      {
        "tokens": [
          { "s": "おんがく", "g": "Musik" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "わたし", "g": "ich" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "元気", "r": "げんき", "g": "munter / froh" },
          { "s": "に", "g": "(zu)" },
          { "s": "します", "g": "macht" },
          { "s": "。", "p": true }
        ],
        "jp": "おんがくはわたしを元気にします。",
        "romaji": "Ongaku wa watashi o genki ni shimasu.",
        "de": "Musik macht mich fröhlich."
      }
    ]
  },
  {
    "id": "r-suupaa-de-kaimono",
    "title": "スーパーで かいもの",
    "titleReading": "スーパーでかいもの",
    "titleDe": "Im Supermarkt",
    "level": "N5",
    "category": "Alltag",
    "summary": "Ein alltäglicher Text über einen kleinen Einkauf für das Abendessen.",
    "sentences": [
      {
        "tokens": [
          { "s": "今日", "r": "きょう", "g": "Heute" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "スーパー", "g": "Supermarkt" },
          { "s": "へ", "g": "(zu)" },
          { "s": "いきました", "g": "ging" },
          { "s": "。", "p": true }
        ],
        "jp": "今日はスーパーへいきました。",
        "romaji": "Kyou wa suupaa e ikimashita.",
        "de": "Heute bin ich in den Supermarkt gegangen."
      },
      {
        "tokens": [
          { "s": "夕ごはん", "r": "ゆうごはん", "g": "Abendessen" },
          { "s": "の", "g": "(von)" },
          { "s": "やさい", "g": "Gemüse" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "かいました", "g": "kaufte" },
          { "s": "。", "p": true }
        ],
        "jp": "夕ごはんのやさいをかいました。",
        "romaji": "Yuugohan no yasai o kaimashita.",
        "de": "Ich habe Gemüse fürs Abendessen gekauft."
      },
      {
        "tokens": [
          { "s": "トマト", "g": "Tomaten" },
          { "s": "と", "g": "und" },
          { "s": "たまご", "g": "Eier" },
          { "s": "と", "g": "und" },
          { "s": "ぎゅうにゅう", "g": "Milch" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "ひつよう", "g": "nötig" },
          { "s": "でした", "g": "war" },
          { "s": "。", "p": true }
        ],
        "jp": "トマトとたまごとぎゅうにゅうがひつようでした。",
        "romaji": "Tomato to tamago to gyuunyuu ga hitsuyou deshita.",
        "de": "Tomaten, Eier und Milch waren nötig."
      },
      {
        "tokens": [
          { "s": "くだもの", "g": "Obst" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "やすかった", "g": "billig (war)" },
          { "s": "ので", "g": "weil" },
          { "s": "、", "p": true },
          { "s": "たくさん", "g": "viel" },
          { "s": "かいました", "g": "kaufte" },
          { "s": "。", "p": true }
        ],
        "jp": "くだものはやすかったので、たくさんかいました。",
        "romaji": "Kudamono wa yasukatta node, takusan kaimashita.",
        "de": "Weil das Obst billig war, habe ich viel gekauft."
      },
      {
        "tokens": [
          { "s": "ぜんぶ", "g": "insgesamt" },
          { "s": "で", "g": "(für)" },
          { "s": "せんえん", "g": "1000 Yen" },
          { "s": "でした", "g": "war" },
          { "s": "。", "p": true }
        ],
        "jp": "ぜんぶでせんえんでした。",
        "romaji": "Zenbu de sen'en deshita.",
        "de": "Insgesamt waren es 1000 Yen."
      },
      {
        "tokens": [
          { "s": "家", "r": "いえ", "g": "Zuhause" },
          { "s": "に", "g": "(nach)" },
          { "s": "帰って", "r": "かえって", "g": "zurück und" },
          { "s": "、", "p": true },
          { "s": "カレー", "g": "Curry" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "つくります", "g": "koche" },
          { "s": "。", "p": true }
        ],
        "jp": "家に帰って、カレーをつくります。",
        "romaji": "Ie ni kaette, karee o tsukurimasu.",
        "de": "Zu Hause koche ich dann Curry."
      }
    ]
  },
  {
    "id": "r-hajimete-no-shinkansen",
    "title": "はじめての しんかんせん",
    "titleReading": "はじめてのしんかんせん",
    "titleDe": "Meine erste Shinkansen-Fahrt",
    "level": "N4",
    "category": "Reise",
    "summary": "Ein Erlebnisbericht über die erste Fahrt mit dem Hochgeschwindigkeitszug nach Kyoto.",
    "sentences": [
      {
        "tokens": [
          { "s": "先週", "r": "せんしゅう", "g": "letzte Woche" },
          { "s": "、", "p": true },
          { "s": "家族", "r": "かぞく", "g": "Familie" },
          { "s": "と", "g": "mit" },
          { "s": "京都", "r": "きょうと", "g": "Kyoto" },
          { "s": "へ", "g": "(nach)" },
          { "s": "行", "r": "い", "g": "fahren / gehen" },
          { "s": "きました", "g": "(tat)" },
          { "s": "。", "p": true }
        ],
        "jp": "先週、家族と京都へ行きました。",
        "romaji": "Senshuu, kazoku to Kyouto e ikimashita.",
        "de": "Letzte Woche bin ich mit meiner Familie nach Kyoto gefahren."
      },
      {
        "tokens": [
          { "s": "東京駅", "r": "とうきょうえき", "g": "Bahnhof Tokio" },
          { "s": "で", "g": "(an)" },
          { "s": "はじめて", "g": "zum ersten Mal" },
          { "s": "新幹線", "r": "しんかんせん", "g": "Shinkansen" },
          { "s": "に", "g": "(in)" },
          { "s": "乗", "r": "の", "g": "einsteigen" },
          { "s": "りました", "g": "(tat)" },
          { "s": "。", "p": true }
        ],
        "jp": "東京駅ではじめて新幹線に乗りました。",
        "romaji": "Toukyou-eki de hajimete shinkansen ni norimashita.",
        "de": "Am Bahnhof Tokio bin ich zum ersten Mal in den Shinkansen eingestiegen."
      },
      {
        "tokens": [
          { "s": "電車", "r": "でんしゃ", "g": "Zug" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "とても", "g": "sehr" },
          { "s": "はやくて", "g": "schnell und" },
          { "s": "、", "p": true },
          { "s": "びっくり", "g": "überrascht" },
          { "s": "しました", "g": "(war)" },
          { "s": "。", "p": true }
        ],
        "jp": "電車がとてもはやくて、びっくりしました。",
        "romaji": "Densha ga totemo hayakute, bikkuri shimashita.",
        "de": "Der Zug war sehr schnell, da war ich überrascht."
      },
      {
        "tokens": [
          { "s": "窓", "r": "まど", "g": "Fenster" },
          { "s": "から", "g": "(von)" },
          { "s": "山", "r": "やま", "g": "Berge" },
          { "s": "や", "g": "und (u.a.)" },
          { "s": "町", "r": "まち", "g": "Städte" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "見", "r": "み", "g": "sehen" },
          { "s": "えました", "g": "(konnte)" },
          { "s": "。", "p": true }
        ],
        "jp": "窓から山や町が見えました。",
        "romaji": "Mado kara yama ya machi ga miemashita.",
        "de": "Aus dem Fenster konnte ich Berge und Städte sehen."
      },
      {
        "tokens": [
          { "s": "富士山", "r": "ふじさん", "g": "Fuji-Berg" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "見", "r": "み", "g": "sehen" },
          { "s": "えた", "g": "(konnte)" },
          { "s": "とき", "g": "als" },
          { "s": "、", "p": true },
          { "s": "みんな", "g": "alle" },
          { "s": "で", "g": "(zusammen)" },
          { "s": "写真", "r": "しゃしん", "g": "Foto" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "とりました", "g": "machten" },
          { "s": "。", "p": true }
        ],
        "jp": "富士山が見えたとき、みんなで写真をとりました。",
        "romaji": "Fujisan ga mieta toki, minna de shashin o torimashita.",
        "de": "Als der Fuji zu sehen war, haben alle zusammen Fotos gemacht."
      },
      {
        "tokens": [
          { "s": "二時間", "r": "にじかん", "g": "zwei Stunden" },
          { "s": "ぐらい", "g": "etwa" },
          { "s": "で", "g": "(in)" },
          { "s": "京都", "r": "きょうと", "g": "Kyoto" },
          { "s": "に", "g": "(in)" },
          { "s": "つきました", "g": "kamen an" },
          { "s": "。", "p": true }
        ],
        "jp": "二時間ぐらいで京都につきました。",
        "romaji": "Nijikan gurai de Kyouto ni tsukimashita.",
        "de": "In etwa zwei Stunden kamen wir in Kyoto an."
      },
      {
        "tokens": [
          { "s": "はやくて", "g": "schnell und" },
          { "s": "楽", "r": "らく", "g": "bequem" },
          { "s": "だった", "g": "(war)" },
          { "s": "ので", "g": "weil" },
          { "s": "、", "p": true },
          { "s": "また", "g": "wieder" },
          { "s": "乗", "r": "の", "g": "fahren" },
          { "s": "りたい", "g": "möchten" },
          { "s": "です", "g": "(tue)" },
          { "s": "。", "p": true }
        ],
        "jp": "はやくて楽だったので、また乗りたいです。",
        "romaji": "Hayakute raku datta node, mata noritai desu.",
        "de": "Weil es schnell und bequem war, möchte ich wieder damit fahren."
      },
      {
        "tokens": [
          { "s": "旅行", "r": "りょこう", "g": "Reise" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "とても", "g": "sehr" },
          { "s": "いい", "g": "gut" },
          { "s": "思い出", "r": "おもいで", "g": "Erinnerung" },
          { "s": "に", "g": "(zu)" },
          { "s": "なりました", "g": "wurde" },
          { "s": "。", "p": true }
        ],
        "jp": "旅行はとてもいい思い出になりました。",
        "romaji": "Ryokou wa totemo ii omoide ni narimashita.",
        "de": "Die Reise wurde zu einer sehr schönen Erinnerung."
      }
    ]
  },
  {
    "id": "r-natsumatsuri",
    "title": "なつまつり",
    "titleReading": "なつまつり",
    "titleDe": "Das Sommerfest",
    "level": "N4",
    "category": "Kultur",
    "summary": "Ein Bericht über einen Abend auf dem örtlichen Sommerfest mit Yukata und Feuerwerk.",
    "sentences": [
      {
        "tokens": [
          { "s": "夏", "r": "なつ", "g": "Sommer" },
          { "s": "の", "g": "(von)" },
          { "s": "夜", "r": "よる", "g": "Abend" },
          { "s": "、", "p": true },
          { "s": "町", "r": "まち", "g": "Stadt" },
          { "s": "の", "g": "(von)" },
          { "s": "まつり", "g": "Fest" },
          { "s": "に", "g": "(zu)" },
          { "s": "行", "r": "い", "g": "gehen" },
          { "s": "きました", "g": "(tat)" },
          { "s": "。", "p": true }
        ],
        "jp": "夏の夜、町のまつりに行きました。",
        "romaji": "Natsu no yoru, machi no matsuri ni ikimashita.",
        "de": "An einem Sommerabend bin ich zum Stadtfest gegangen."
      },
      {
        "tokens": [
          { "s": "友だち", "r": "ともだち", "g": "Freunde" },
          { "s": "と", "g": "mit" },
          { "s": "ゆかた", "g": "Yukata" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "きて", "g": "tragen und" },
          { "s": "でかけました", "g": "gingen aus" },
          { "s": "。", "p": true }
        ],
        "jp": "友だちとゆかたをきてでかけました。",
        "romaji": "Tomodachi to yukata o kite dekakemashita.",
        "de": "Mit Freunden zog ich einen Yukata an und ging hin."
      },
      {
        "tokens": [
          { "s": "まつり", "g": "Fest" },
          { "s": "には", "g": "(beim)" },
          { "s": "屋台", "r": "やたい", "g": "Imbissstände" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "たくさん", "g": "viele" },
          { "s": "ならんで", "g": "aufgereiht" },
          { "s": "いました", "g": "waren" },
          { "s": "。", "p": true }
        ],
        "jp": "まつりには屋台がたくさんならんでいました。",
        "romaji": "Matsuri ni wa yatai ga takusan narande imashita.",
        "de": "Auf dem Fest standen viele Imbissstände in einer Reihe."
      },
      {
        "tokens": [
          { "s": "やきそば", "g": "Yakisoba" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "食", "r": "た", "g": "essen" },
          { "s": "べて", "g": "und" },
          { "s": "、", "p": true },
          { "s": "かきごおり", "g": "Wassereis" },
          { "s": "も", "g": "auch" },
          { "s": "食", "r": "た", "g": "essen" },
          { "s": "べました", "g": "(tat)" },
          { "s": "。", "p": true }
        ],
        "jp": "やきそばを食べて、かきごおりも食べました。",
        "romaji": "Yakisoba o tabete, kakigoori mo tabemashita.",
        "de": "Ich aß Yakisoba und auch Wassereis."
      },
      {
        "tokens": [
          { "s": "金魚", "r": "きんぎょ", "g": "Goldfische" },
          { "s": "すくい", "g": "-fangen" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "むずかしかった", "g": "schwierig (war)" },
          { "s": "です", "g": "(tue)" },
          { "s": "。", "p": true }
        ],
        "jp": "金魚すくいはむずかしかったです。",
        "romaji": "Kingyo sukui wa muzukashikatta desu.",
        "de": "Goldfische zu fangen war schwierig."
      },
      {
        "tokens": [
          { "s": "夜", "r": "よる", "g": "Nacht" },
          { "s": "の", "g": "(am)" },
          { "s": "八時", "r": "はちじ", "g": "8 Uhr" },
          { "s": "ごろ", "g": "etwa" },
          { "s": "、", "p": true },
          { "s": "花火", "r": "はなび", "g": "Feuerwerk" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "はじまりました", "g": "begann" },
          { "s": "。", "p": true }
        ],
        "jp": "夜の八時ごろ、花火がはじまりました。",
        "romaji": "Yoru no hachiji goro, hanabi ga hajimarimashita.",
        "de": "Gegen acht Uhr abends begann das Feuerwerk."
      },
      {
        "tokens": [
          { "s": "空", "r": "そら", "g": "Himmel" },
          { "s": "に", "g": "(am)" },
          { "s": "大", "r": "おお", "g": "groß" },
          { "s": "きな", "g": "(Adjektiv)" },
          { "s": "花", "r": "はな", "g": "Blume(n)" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "さいて", "g": "blühen und" },
          { "s": "、", "p": true },
          { "s": "とても", "g": "sehr" },
          { "s": "きれい", "g": "schön" },
          { "s": "でした", "g": "war" },
          { "s": "。", "p": true }
        ],
        "jp": "空に大きな花がさいて、とてもきれいでした。",
        "romaji": "Sora ni ookina hana ga saite, totemo kirei deshita.",
        "de": "Am Himmel erblühten große Blumen, es war sehr schön."
      },
      {
        "tokens": [
          { "s": "にぎやか", "g": "lebhaft" },
          { "s": "で", "g": "und" },
          { "s": "たのしい", "g": "schön" },
          { "s": "夏", "r": "なつ", "g": "Sommer" },
          { "s": "の", "g": "(von)" },
          { "s": "思い出", "r": "おもいで", "g": "Erinnerung" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "できました", "g": "entstand" },
          { "s": "。", "p": true }
        ],
        "jp": "にぎやかでたのしい夏の思い出ができました。",
        "romaji": "Nigiyaka de tanoshii natsu no omoide ga dekimashita.",
        "de": "Es entstand eine lebhafte, schöne Sommererinnerung."
      }
    ]
  },
  {
    "id": "r-haha-no-ryouri",
    "title": "はは の りょうり",
    "titleReading": "ははのりょうり",
    "titleDe": "Das Essen meiner Mutter",
    "level": "N4",
    "category": "Essen",
    "summary": "Ein warmherziger Text über Lieblingsgerichte aus der Kindheit und das Kochenlernen.",
    "sentences": [
      {
        "tokens": [
          { "s": "わたし", "g": "ich" },
          { "s": "の", "g": "(von)" },
          { "s": "母", "r": "はは", "g": "Mutter" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "料理", "r": "りょうり", "g": "Kochen" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "上手", "r": "じょうず", "g": "geschickt / gut" },
          { "s": "です", "g": "ist" },
          { "s": "。", "p": true }
        ],
        "jp": "わたしの母は料理が上手です。",
        "romaji": "Watashi no haha wa ryouri ga jouzu desu.",
        "de": "Meine Mutter kann gut kochen."
      },
      {
        "tokens": [
          { "s": "子ども", "r": "こども", "g": "Kind" },
          { "s": "の", "g": "(von)" },
          { "s": "ころ", "g": "Zeit" },
          { "s": "から", "g": "(von)" },
          { "s": "いちばん", "g": "am meisten" },
          { "s": "好", "r": "す", "g": "mögen" },
          { "s": "きな", "g": "(Adjektiv)" },
          { "s": "料理", "r": "りょうり", "g": "Gericht" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "にくじゃが", "g": "Nikujaga" },
          { "s": "です", "g": "ist" },
          { "s": "。", "p": true }
        ],
        "jp": "子どものころからいちばん好きな料理はにくじゃがです。",
        "romaji": "Kodomo no koro kara ichiban sukina ryouri wa nikujaga desu.",
        "de": "Seit meiner Kindheit ist mein Lieblingsgericht Nikujaga."
      },
      {
        "tokens": [
          { "s": "じゃがいも", "g": "Kartoffeln" },
          { "s": "と", "g": "und" },
          { "s": "肉", "r": "にく", "g": "Fleisch" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "あまく", "g": "süß" },
          { "s": "煮た", "r": "にた", "g": "köcheln" },
          { "s": "料理", "r": "りょうり", "g": "Gericht" },
          { "s": "です", "g": "ist" },
          { "s": "。", "p": true }
        ],
        "jp": "じゃがいもと肉をあまく煮た料理です。",
        "romaji": "Jagaimo to niku o amaku nita ryouri desu.",
        "de": "Es ist ein Gericht aus süß geschmorten Kartoffeln und Fleisch."
      },
      {
        "tokens": [
          { "s": "家", "r": "いえ", "g": "Zuhause" },
          { "s": "に", "g": "(nach)" },
          { "s": "帰る", "r": "かえる", "g": "zurückkommen" },
          { "s": "と", "g": "wenn" },
          { "s": "、", "p": true },
          { "s": "いつも", "g": "immer" },
          { "s": "いい", "g": "gut" },
          { "s": "においが", "g": "Geruch" },
          { "s": "します", "g": "(macht)" },
          { "s": "。", "p": true }
        ],
        "jp": "家に帰ると、いつもいいにおいがします。",
        "romaji": "Ie ni kaeru to, itsumo ii nioi ga shimasu.",
        "de": "Wenn ich nach Hause komme, riecht es immer gut."
      },
      {
        "tokens": [
          { "s": "先月", "r": "せんげつ", "g": "letzten Monat" },
          { "s": "から", "g": "(von)" },
          { "s": "わたし", "g": "ich" },
          { "s": "も", "g": "auch" },
          { "s": "料理", "r": "りょうり", "g": "Kochen" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "ならい", "g": "lernen" },
          { "s": "はじめました", "g": "habe begonnen" },
          { "s": "。", "p": true }
        ],
        "jp": "先月からわたしも料理をならいはじめました。",
        "romaji": "Sengetsu kara watashi mo ryouri o naraihajimemashita.",
        "de": "Seit letztem Monat habe auch ich angefangen, kochen zu lernen."
      },
      {
        "tokens": [
          { "s": "最初", "r": "さいしょ", "g": "am Anfang" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "しっぱい", "g": "Misserfolg" },
          { "s": "ばかり", "g": "nur" },
          { "s": "でした", "g": "war" },
          { "s": "。", "p": true }
        ],
        "jp": "最初はしっぱいばかりでした。",
        "romaji": "Saisho wa shippai bakari deshita.",
        "de": "Am Anfang ging nur alles schief."
      },
      {
        "tokens": [
          { "s": "でも", "g": "aber" },
          { "s": "、", "p": true },
          { "s": "母", "r": "はは", "g": "Mutter" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "やさしく", "g": "freundlich" },
          { "s": "教", "r": "おし", "g": "beibringen" },
          { "s": "えて", "g": "und" },
          { "s": "くれました", "g": "(tat für mich)" },
          { "s": "。", "p": true }
        ],
        "jp": "でも、母がやさしく教えてくれました。",
        "romaji": "Demo, haha ga yasashiku oshiete kuremashita.",
        "de": "Aber meine Mutter hat es mir geduldig beigebracht."
      },
      {
        "tokens": [
          { "s": "いつか", "g": "eines Tages" },
          { "s": "母", "r": "はは", "g": "Mutter" },
          { "s": "の", "g": "(von)" },
          { "s": "味", "r": "あじ", "g": "Geschmack" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "つくれる", "g": "kochen können" },
          { "s": "ように", "g": "damit" },
          { "s": "なりたい", "g": "werden möchte" },
          { "s": "です", "g": "(tue)" },
          { "s": "。", "p": true }
        ],
        "jp": "いつか母の味をつくれるようになりたいです。",
        "romaji": "Itsuka haha no aji o tsukureru you ni naritai desu.",
        "de": "Eines Tages möchte ich den Geschmack meiner Mutter treffen können."
      }
    ]
  },
  {
    "id": "r-tegami-de-arigatou",
    "title": "てがみ で ありがとう",
    "titleReading": "てがみでありがとう",
    "titleDe": "Ein Dankesbrief",
    "level": "N4",
    "category": "Brief",
    "summary": "Ein höflicher Brief an einen Lehrer, in dem man sich für die Unterstützung bedankt.",
    "sentences": [
      {
        "tokens": [
          { "s": "田中", "r": "たなか", "g": "Tanaka" },
          { "s": "先生", "r": "せんせい", "g": "Lehrer" },
          { "s": "、", "p": true },
          { "s": "おげんき", "g": "wohlauf" },
          { "s": "ですか", "g": "sind Sie?" },
          { "s": "。", "p": true }
        ],
        "jp": "田中先生、おげんきですか。",
        "romaji": "Tanaka-sensei, ogenki desu ka.",
        "de": "Herr Tanaka, geht es Ihnen gut?"
      },
      {
        "tokens": [
          { "s": "去年", "r": "きょねん", "g": "letztes Jahr" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "たいへん", "g": "sehr" },
          { "s": "おせわ", "g": "Fürsorge" },
          { "s": "に", "g": "(bei)" },
          { "s": "なりました", "g": "geworden" },
          { "s": "。", "p": true }
        ],
        "jp": "去年はたいへんおせわになりました。",
        "romaji": "Kyonen wa taihen osewa ni narimashita.",
        "de": "Letztes Jahr haben Sie sich sehr um mich gekümmert."
      },
      {
        "tokens": [
          { "s": "日本語", "r": "にほんご", "g": "Japanisch" },
          { "s": "の", "g": "(von)" },
          { "s": "勉強", "r": "べんきょう", "g": "Lernen" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "むずかしくて", "g": "schwierig und" },
          { "s": "、", "p": true },
          { "s": "なんども", "g": "viele Male" },
          { "s": "やめたく", "g": "aufhören wollen" },
          { "s": "なりました", "g": "wurde" },
          { "s": "。", "p": true }
        ],
        "jp": "日本語の勉強がむずかしくて、なんどもやめたくなりました。",
        "romaji": "Nihongo no benkyou ga muzukashikute, nandomo yametaku narimashita.",
        "de": "Das Japanischlernen war schwer und oft wollte ich aufgeben."
      },
      {
        "tokens": [
          { "s": "でも", "g": "aber" },
          { "s": "、", "p": true },
          { "s": "先生", "r": "せんせい", "g": "Lehrer" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "いつも", "g": "immer" },
          { "s": "応援", "r": "おうえん", "g": "Unterstützung" },
          { "s": "して", "g": "(tat)" },
          { "s": "くれました", "g": "für mich" },
          { "s": "。", "p": true }
        ],
        "jp": "でも、先生がいつも応援してくれました。",
        "romaji": "Demo, sensei ga itsumo ouen shite kuremashita.",
        "de": "Aber Sie haben mich immer unterstützt."
      },
      {
        "tokens": [
          { "s": "おかげ", "g": "dank" },
          { "s": "で", "g": "(dessen)" },
          { "s": "、", "p": true },
          { "s": "試験", "r": "しけん", "g": "Prüfung" },
          { "s": "に", "g": "(in)" },
          { "s": "合格", "r": "ごうかく", "g": "bestehen" },
          { "s": "できました", "g": "konnte" },
          { "s": "。", "p": true }
        ],
        "jp": "おかげで、試験に合格できました。",
        "romaji": "Okage de, shiken ni goukaku dekimashita.",
        "de": "Dank Ihrer Hilfe habe ich die Prüfung bestanden."
      },
      {
        "tokens": [
          { "s": "本当", "r": "ほんとう", "g": "wirklich" },
          { "s": "に", "g": "(Adverb)" },
          { "s": "ありがとう", "g": "danke" },
          { "s": "ございました", "g": "(höflich)" },
          { "s": "。", "p": true }
        ],
        "jp": "本当にありがとうございました。",
        "romaji": "Hontou ni arigatou gozaimashita.",
        "de": "Ich danke Ihnen von Herzen."
      },
      {
        "tokens": [
          { "s": "来月", "r": "らいげつ", "g": "nächsten Monat" },
          { "s": "から", "g": "(von)" },
          { "s": "大学", "r": "だいがく", "g": "Universität" },
          { "s": "で", "g": "(an)" },
          { "s": "新", "r": "あたら", "g": "neu" },
          { "s": "しい", "g": "(Adjektiv)" },
          { "s": "生活", "r": "せいかつ", "g": "Leben" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "はじまります", "g": "beginnt" },
          { "s": "。", "p": true }
        ],
        "jp": "来月から大学で新しい生活がはじまります。",
        "romaji": "Raigetsu kara daigaku de atarashii seikatsu ga hajimarimasu.",
        "de": "Ab nächstem Monat beginnt mein neues Leben an der Universität."
      },
      {
        "tokens": [
          { "s": "先生", "r": "せんせい", "g": "Lehrer" },
          { "s": "も", "g": "auch" },
          { "s": "どうぞ", "g": "bitte" },
          { "s": "おからだ", "g": "Gesundheit" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "大切", "r": "たいせつ", "g": "sorgsam" },
          { "s": "に", "g": "(zu)" },
          { "s": "。", "p": true }
        ],
        "jp": "先生もどうぞおからだを大切に。",
        "romaji": "Sensei mo douzo okarada o taisetsu ni.",
        "de": "Passen auch Sie gut auf sich auf."
      }
    ]
  },
  {
    "id": "r-suiei-no-renshuu",
    "title": "すいえいの れんしゅう",
    "titleReading": "すいえいのれんしゅう",
    "titleDe": "Schwimmtraining",
    "level": "N4",
    "category": "Sport",
    "summary": "Ein Erlebnisbericht über das Schwimmenlernen und das Gefühl, ein Ziel zu erreichen.",
    "sentences": [
      {
        "tokens": [
          { "s": "わたし", "g": "ich" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "むかし", "g": "früher" },
          { "s": "水", "r": "みず", "g": "Wasser" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "苦手", "r": "にがて", "g": "nicht gut / unbeliebt" },
          { "s": "でした", "g": "war" },
          { "s": "。", "p": true }
        ],
        "jp": "わたしはむかし水が苦手でした。",
        "romaji": "Watashi wa mukashi mizu ga nigate deshita.",
        "de": "Früher mochte ich Wasser nicht."
      },
      {
        "tokens": [
          { "s": "でも", "g": "aber" },
          { "s": "、", "p": true },
          { "s": "泳", "r": "およ", "g": "schwimmen" },
          { "s": "げる", "g": "können" },
          { "s": "ように", "g": "damit" },
          { "s": "なりたくて", "g": "werden wollte, und" },
          { "s": "、", "p": true },
          { "s": "教室", "r": "きょうしつ", "g": "Kurs" },
          { "s": "に", "g": "(in)" },
          { "s": "はいりました", "g": "trat ein" },
          { "s": "。", "p": true }
        ],
        "jp": "でも、泳げるようになりたくて、教室にはいりました。",
        "romaji": "Demo, oyogeru you ni naritakute, kyoushitsu ni hairimashita.",
        "de": "Aber ich wollte schwimmen können und meldete mich zu einem Kurs an."
      },
      {
        "tokens": [
          { "s": "最初", "r": "さいしょ", "g": "am Anfang" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "顔", "r": "かお", "g": "Gesicht" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "水", "r": "みず", "g": "Wasser" },
          { "s": "に", "g": "(ins)" },
          { "s": "つける", "g": "tauchen" },
          { "s": "こと", "g": "(das)" },
          { "s": "も", "g": "sogar" },
          { "s": "こわかった", "g": "furchterregend (war)" },
          { "s": "です", "g": "(tue)" },
          { "s": "。", "p": true }
        ],
        "jp": "最初は顔を水につけることもこわかったです。",
        "romaji": "Saisho wa kao o mizu ni tsukeru koto mo kowakatta desu.",
        "de": "Anfangs hatte ich sogar Angst, das Gesicht ins Wasser zu tauchen."
      },
      {
        "tokens": [
          { "s": "先生", "r": "せんせい", "g": "Lehrer" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "やさしく", "g": "geduldig" },
          { "s": "教", "r": "おし", "g": "beibringen" },
          { "s": "えて", "g": "und" },
          { "s": "くれた", "g": "(tat für mich)" },
          { "s": "ので", "g": "weil" },
          { "s": "、", "p": true },
          { "s": "だんだん", "g": "allmählich" },
          { "s": "なれました", "g": "gewöhnte mich" },
          { "s": "。", "p": true }
        ],
        "jp": "先生がやさしく教えてくれたので、だんだんなれました。",
        "romaji": "Sensei ga yasashiku oshiete kureta node, dandan naremashita.",
        "de": "Weil der Lehrer es geduldig erklärte, gewöhnte ich mich allmählich daran."
      },
      {
        "tokens": [
          { "s": "三か月", "r": "さんかげつ", "g": "drei Monate" },
          { "s": "後", "r": "ご", "g": "nach" },
          { "s": "、", "p": true },
          { "s": "やっと", "g": "endlich" },
          { "s": "二十", "r": "にじゅう", "g": "zwanzig" },
          { "s": "メートル", "g": "Meter" },
          { "s": "泳", "r": "およ", "g": "schwimmen" },
          { "s": "げました", "g": "konnte" },
          { "s": "。", "p": true }
        ],
        "jp": "三か月後、やっと二十メートル泳げました。",
        "romaji": "Sankagetsu go, yatto nijuu meetoru oyogemashita.",
        "de": "Nach drei Monaten konnte ich endlich zwanzig Meter schwimmen."
      },
      {
        "tokens": [
          { "s": "できた", "g": "geschafft" },
          { "s": "とき", "g": "als" },
          { "s": "、", "p": true },
          { "s": "とても", "g": "sehr" },
          { "s": "うれしくて", "g": "froh und" },
          { "s": "、", "p": true },
          { "s": "涙", "r": "なみだ", "g": "Tränen" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "でました", "g": "kamen" },
          { "s": "。", "p": true }
        ],
        "jp": "できたとき、とてもうれしくて、涙がでました。",
        "romaji": "Dekita toki, totemo ureshikute, namida ga demashita.",
        "de": "Als ich es schaffte, war ich so froh, dass mir Tränen kamen."
      },
      {
        "tokens": [
          { "s": "今", "r": "いま", "g": "jetzt" },
          { "s": "では", "g": "(Themenpartikel)" },
          { "s": "泳ぐ", "r": "およぐ", "g": "schwimmen" },
          { "s": "こと", "g": "(das)" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "だいすき", "g": "sehr lieb" },
          { "s": "です", "g": "ist" },
          { "s": "。", "p": true }
        ],
        "jp": "今では泳ぐことがだいすきです。",
        "romaji": "Ima de wa oyogu koto ga daisuki desu.",
        "de": "Heute schwimme ich für mein Leben gern."
      },
      {
        "tokens": [
          { "s": "苦手", "r": "にがて", "g": "Schwäche" },
          { "s": "な", "g": "(Adjektiv)" },
          { "s": "こと", "g": "Sache" },
          { "s": "も", "g": "auch" },
          { "s": "、", "p": true },
          { "s": "続", "r": "つづ", "g": "fortsetzen" },
          { "s": "ければ", "g": "wenn man" },
          { "s": "できる", "g": "schaffen kann" },
          { "s": "ように", "g": "dazu" },
          { "s": "なる", "g": "wird" },
          { "s": "と", "g": "(dass)" },
          { "s": "思", "r": "おも", "g": "denken" },
          { "s": "います", "g": "(tue)" },
          { "s": "。", "p": true }
        ],
        "jp": "苦手なことも、続ければできるようになると思います。",
        "romaji": "Nigate na koto mo, tsuzukereba dekiru you ni naru to omoimasu.",
        "de": "Auch was einem schwerfällt, schafft man, wenn man dranbleibt."
      }
    ]
  },
  {
    "id": "r-okane-no-tsukaikata",
    "title": "お金 の つかいかた",
    "titleReading": "おかねのつかいかた",
    "titleDe": "Der Umgang mit Geld",
    "level": "N3",
    "category": "Geld",
    "summary": "Ein Text über das Sparen, Taschengeld und das Abwägen zwischen Wunsch und Bedarf.",
    "sentences": [
      {
        "tokens": [
          { "s": "高校生", "r": "こうこうせい", "g": "Oberschüler" },
          { "s": "の", "g": "(von)" },
          { "s": "時", "r": "とき", "g": "Zeit" },
          { "s": "から", "g": "(von)" },
          { "s": "、", "p": true },
          { "s": "わたし", "g": "ich" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "毎月", "r": "まいつき", "g": "jeden Monat" },
          { "s": "お金", "r": "おかね", "g": "Geld" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "ためて", "g": "sparen und" },
          { "s": "います", "g": "(tue)" },
          { "s": "。", "p": true }
        ],
        "jp": "高校生の時から、わたしは毎月お金をためています。",
        "romaji": "Koukousei no toki kara, watashi wa maitsuki okane o tamete imasu.",
        "de": "Seit der Oberschule spare ich jeden Monat Geld."
      },
      {
        "tokens": [
          { "s": "親", "r": "おや", "g": "Eltern" },
          { "s": "から", "g": "(von)" },
          { "s": "もらう", "g": "bekommen" },
          { "s": "おこづかい", "g": "Taschengeld" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "あまり", "g": "nicht sehr" },
          { "s": "多く", "r": "おおく", "g": "viel" },
          { "s": "ありません", "g": "ist nicht" },
          { "s": "。", "p": true }
        ],
        "jp": "親からもらうおこづかいはあまり多くありません。",
        "romaji": "Oya kara morau okozukai wa amari ooku arimasen.",
        "de": "Das Taschengeld von meinen Eltern ist nicht besonders viel."
      },
      {
        "tokens": [
          { "s": "だから", "g": "deshalb" },
          { "s": "、", "p": true },
          { "s": "本当", "r": "ほんとう", "g": "wirklich" },
          { "s": "に", "g": "(Adverb)" },
          { "s": "必要", "r": "ひつよう", "g": "nötig" },
          { "s": "な", "g": "(Adjektiv)" },
          { "s": "もの", "g": "Dinge" },
          { "s": "だけ", "g": "nur" },
          { "s": "買う", "r": "かう", "g": "kaufen" },
          { "s": "ように", "g": "(darauf)" },
          { "s": "気を", "r": "きを", "g": "acht-" },
          { "s": "つけて", "g": "geben und" },
          { "s": "います", "g": "(tue)" },
          { "s": "。", "p": true }
        ],
        "jp": "だから、本当に必要なものだけ買うように気をつけています。",
        "romaji": "Dakara, hontou ni hitsuyou na mono dake kau you ni ki o tsukete imasu.",
        "de": "Deshalb achte ich darauf, nur wirklich Nötiges zu kaufen."
      },
      {
        "tokens": [
          { "s": "欲", "r": "ほ", "g": "wollen" },
          { "s": "しい", "g": "(Adjektiv)" },
          { "s": "もの", "g": "Dinge" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "あって", "g": "geben und" },
          { "s": "も", "g": "auch" },
          { "s": "、", "p": true },
          { "s": "すぐ", "g": "sofort" },
          { "s": "に", "g": "(Adverb)" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "買", "r": "か", "g": "kaufen" },
          { "s": "わない", "g": "nicht" },
          { "s": "ように", "g": "(darauf)" },
          { "s": "して", "g": "(tue)" },
          { "s": "います", "g": "(ich)" },
          { "s": "。", "p": true }
        ],
        "jp": "欲しいものがあっても、すぐには買わないようにしています。",
        "romaji": "Hoshii mono ga atte mo, sugu ni wa kawanai you ni shite imasu.",
        "de": "Selbst wenn ich etwas will, kaufe ich es nicht sofort."
      },
      {
        "tokens": [
          { "s": "一週間", "r": "いっしゅうかん", "g": "eine Woche" },
          { "s": "考", "r": "かんが", "g": "überlegen" },
          { "s": "えて", "g": "und" },
          { "s": "も", "g": "auch" },
          { "s": "まだ", "g": "noch" },
          { "s": "欲しけれ", "r": "ほしけれ", "g": "wollen" },
          { "s": "ば", "g": "wenn" },
          { "s": "、", "p": true },
          { "s": "それ", "g": "das" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "必要", "r": "ひつよう", "g": "nötig" },
          { "s": "な", "g": "(Adjektiv)" },
          { "s": "もの", "g": "Sache" },
          { "s": "だ", "g": "ist" },
          { "s": "と", "g": "(Objekt)" },
          { "s": "思", "r": "おも", "g": "denken" },
          { "s": "います", "g": "(tue)" },
          { "s": "。", "p": true }
        ],
        "jp": "一週間考えてもまだ欲しければ、それは必要なものだと思います。",
        "romaji": "Isshuukan kangaete mo mada hoshikereba, sore wa hitsuyou na mono da to omoimasu.",
        "de": "Wenn ich es nach einer Woche noch will, ist es wohl etwas Nötiges."
      },
      {
        "tokens": [
          { "s": "こうして", "g": "so" },
          { "s": "、", "p": true },
          { "s": "むだ", "g": "Verschwendung" },
          { "s": "な", "g": "(Adjektiv)" },
          { "s": "買い物", "r": "かいもの", "g": "Käufe" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "減", "r": "へ", "g": "abnehmen" },
          { "s": "りました", "g": "(tat)" },
          { "s": "。", "p": true }
        ],
        "jp": "こうして、むだな買い物が減りました。",
        "romaji": "Koushite, muda na kaimono ga herimashita.",
        "de": "So sind meine unnötigen Käufe weniger geworden."
      },
      {
        "tokens": [
          { "s": "お金", "r": "おかね", "g": "Geld" },
          { "s": "の", "g": "(von)" },
          { "s": "使い", "r": "つかい", "g": "verwenden" },
          { "s": "方", "r": "かた", "g": "Art" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "考える", "r": "かんがえる", "g": "nachdenken" },
          { "s": "こと", "g": "(das)" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "大切", "r": "たいせつ", "g": "wichtig" },
          { "s": "だ", "g": "ist" },
          { "s": "と", "g": "(Objekt)" },
          { "s": "学", "r": "まな", "g": "lernen" },
          { "s": "びました", "g": "(tat)" },
          { "s": "。", "p": true }
        ],
        "jp": "お金の使い方を考えることは大切だと学びました。",
        "romaji": "Okane no tsukaikata o kangaeru koto wa taisetsu da to manabimashita.",
        "de": "Ich habe gelernt, wie wichtig es ist, über den Umgang mit Geld nachzudenken."
      },
      {
        "tokens": [
          { "s": "ためた", "g": "gesparte" },
          { "s": "お金", "r": "おかね", "g": "Geld" },
          { "s": "で", "g": "(mit)" },
          { "s": "、", "p": true },
          { "s": "来年", "r": "らいねん", "g": "nächstes Jahr" },
          { "s": "旅行", "r": "りょこう", "g": "Reise" },
          { "s": "に", "g": "(auf)" },
          { "s": "行", "r": "い", "g": "gehen" },
          { "s": "きたい", "g": "möchte" },
          { "s": "です", "g": "(tue)" },
          { "s": "。", "p": true }
        ],
        "jp": "ためたお金で、来年旅行に行きたいです。",
        "romaji": "Tameta okane de, rainen ryokou ni ikitai desu.",
        "de": "Mit dem gesparten Geld möchte ich nächstes Jahr verreisen."
      }
    ]
  },
  {
    "id": "r-suimin-no-taisetsusa",
    "title": "すいみん の たいせつさ",
    "titleReading": "すいみんのたいせつさ",
    "titleDe": "Wie wichtig Schlaf ist",
    "level": "N3",
    "category": "Gesundheit",
    "summary": "Ein Text über die Bedeutung von gutem Schlaf für Konzentration und Gesundheit.",
    "sentences": [
      {
        "tokens": [
          { "s": "現代", "r": "げんだい", "g": "Gegenwart" },
          { "s": "の", "g": "(von)" },
          { "s": "わたしたち", "g": "wir" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "、", "p": true },
          { "s": "つい", "g": "leicht" },
          { "s": "夜", "r": "よる", "g": "Nacht" },
          { "s": "おそく", "g": "spät" },
          { "s": "まで", "g": "bis" },
          { "s": "起", "r": "お", "g": "wach (bleiben)" },
          { "s": "きて", "g": "und" },
          { "s": "しまいます", "g": "tun (unbeabsichtigt)" },
          { "s": "。", "p": true }
        ],
        "jp": "現代のわたしたちは、つい夜おそくまで起きてしまいます。",
        "romaji": "Gendai no watashitachi wa, tsui yoru osoku made okite shimaimasu.",
        "de": "Wir heute bleiben leicht bis spät in die Nacht wach."
      },
      {
        "tokens": [
          { "s": "スマホ", "g": "Smartphone" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "見", "r": "み", "g": "sehen" },
          { "s": "て", "g": "und" },
          { "s": "いる", "g": "sein" },
          { "s": "うち", "g": "während" },
          { "s": "に", "g": "(Adverb)" },
          { "s": "、", "p": true },
          { "s": "時間", "r": "じかん", "g": "Zeit" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "すぎて", "g": "vergeht und" },
          { "s": "しまう", "g": "tut" },
          { "s": "から", "g": "weil" },
          { "s": "です", "g": "ist" },
          { "s": "。", "p": true }
        ],
        "jp": "スマホを見ているうちに、時間がすぎてしまうからです。",
        "romaji": "Sumaho o mite iru uchi ni, jikan ga sugite shimau kara desu.",
        "de": "Das liegt daran, dass beim Blick aufs Handy die Zeit verfliegt."
      },
      {
        "tokens": [
          { "s": "しかし", "g": "jedoch" },
          { "s": "、", "p": true },
          { "s": "睡眠", "r": "すいみん", "g": "Schlaf" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "足", "r": "た", "g": "ausreichen" },
          { "s": "りない", "g": "nicht" },
          { "s": "と", "g": "wenn" },
          { "s": "、", "p": true },
          { "s": "昼間", "r": "ひるま", "g": "tagsüber" },
          { "s": "集中", "r": "しゅうちゅう", "g": "Konzentration" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "できません", "g": "gelingt nicht" },
          { "s": "。", "p": true }
        ],
        "jp": "しかし、睡眠が足りないと、昼間集中ができません。",
        "romaji": "Shikashi, suimin ga tarinai to, hiruma shuuchuu ga dekimasen.",
        "de": "Aber bei zu wenig Schlaf kann man sich tagsüber nicht konzentrieren."
      },
      {
        "tokens": [
          { "s": "体", "r": "からだ", "g": "Körper" },
          { "s": "の", "g": "(von)" },
          { "s": "調子", "r": "ちょうし", "g": "Zustand" },
          { "s": "も", "g": "(Themenpartikel)" },
          { "s": "悪く", "r": "わるく", "g": "schlecht" },
          { "s": "なって", "g": "wird und" },
          { "s": "、", "p": true },
          { "s": "病気", "r": "びょうき", "g": "Krankheit" },
          { "s": "に", "g": "(zu)" },
          { "s": "なり", "g": "werden" },
          { "s": "やすく", "g": "leicht" },
          { "s": "なります", "g": "wird" },
          { "s": "。", "p": true }
        ],
        "jp": "体の調子も悪くなって、病気になりやすくなります。",
        "romaji": "Karada no choushi mo waruku natte, byouki ni nar(i)yasuku narimasu.",
        "de": "Auch der Körper leidet, und man wird leichter krank."
      },
      {
        "tokens": [
          { "s": "研究", "r": "けんきゅう", "g": "Forschung" },
          { "s": "に", "g": "(von)" },
          { "s": "よると", "g": "laut" },
          { "s": "、", "p": true },
          { "s": "大人", "r": "おとな", "g": "Erwachsene" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "七時間", "r": "ななじかん", "g": "sieben Stunden" },
          { "s": "ぐらい", "g": "etwa" },
          { "s": "眠る", "r": "ねむる", "g": "schlafen" },
          { "s": "の", "g": "(das)" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "よい", "g": "gut" },
          { "s": "そう", "g": "(angeblich)" },
          { "s": "です", "g": "ist" },
          { "s": "。", "p": true }
        ],
        "jp": "研究によると、大人は七時間ぐらい眠るのがよいそうです。",
        "romaji": "Kenkyuu ni yoru to, otona wa nanajikan gurai nemuru no ga yoi sou desu.",
        "de": "Laut Forschung sollen Erwachsene etwa sieben Stunden schlafen."
      },
      {
        "tokens": [
          { "s": "よく", "g": "gut" },
          { "s": "眠る", "r": "ねむる", "g": "schlafen" },
          { "s": "ために", "g": "um zu" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "、", "p": true },
          { "s": "寝る", "r": "ねる", "g": "schlafen gehen" },
          { "s": "前", "r": "まえ", "g": "vor" },
          { "s": "に", "g": "(Adverb)" },
          { "s": "スマホ", "g": "Smartphone" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "見", "r": "み", "g": "ansehen" },
          { "s": "ない", "g": "nicht" },
          { "s": "ほうが", "g": "besser" },
          { "s": "いい", "g": "ist" },
          { "s": "です", "g": "(tue)" },
          { "s": "。", "p": true }
        ],
        "jp": "よく眠るためには、寝る前にスマホを見ないほうがいいです。",
        "romaji": "Yoku nemuru tame ni wa, neru mae ni sumaho o minai hou ga ii desu.",
        "de": "Für guten Schlaf sieht man vor dem Schlafengehen besser nicht aufs Handy."
      },
      {
        "tokens": [
          { "s": "わたし", "g": "ich" },
          { "s": "も", "g": "auch" },
          { "s": "最近", "r": "さいきん", "g": "seit Kurzem" },
          { "s": "、", "p": true },
          { "s": "早く", "r": "はやく", "g": "früh" },
          { "s": "寝る", "r": "ねる", "g": "schlafen gehen" },
          { "s": "ように", "g": "(darauf)" },
          { "s": "して", "g": "achte" },
          { "s": "います", "g": "(ich)" },
          { "s": "。", "p": true }
        ],
        "jp": "わたしも最近、早く寝るようにしています。",
        "romaji": "Watashi mo saikin, hayaku neru you ni shite imasu.",
        "de": "Auch ich achte in letzter Zeit darauf, früh schlafen zu gehen."
      },
      {
        "tokens": [
          { "s": "すると", "g": "daraufhin" },
          { "s": "、", "p": true },
          { "s": "朝", "r": "あさ", "g": "Morgen" },
          { "s": "気持ち", "r": "きもち", "g": "Gefühl" },
          { "s": "よく", "g": "angenehm" },
          { "s": "起", "r": "お", "g": "aufstehen" },
          { "s": "きられる", "g": "können" },
          { "s": "ように", "g": "(dazu)" },
          { "s": "なりました", "g": "geworden" },
          { "s": "。", "p": true }
        ],
        "jp": "すると、朝気持ちよく起きられるようになりました。",
        "romaji": "Suru to, asa kimochi yoku okirareru you ni narimashita.",
        "de": "Seitdem kann ich morgens angenehm aufstehen."
      }
    ]
  },
  {
    "id": "r-sns-tono-tsukiai",
    "title": "SNS との つきあい",
    "titleReading": "エスエヌエスとのつきあい",
    "titleDe": "Der Umgang mit sozialen Medien",
    "level": "N3",
    "category": "Gesellschaft",
    "summary": "Ein Text über Vor- und Nachteile sozialer Netzwerke und einen bewussten Umgang damit.",
    "sentences": [
      {
        "tokens": [
          { "s": "今", "r": "いま", "g": "heute" },
          { "s": "では", "g": "(Themenpartikel)" },
          { "s": "、", "p": true },
          { "s": "多くの", "r": "おおくの", "g": "viele" },
          { "s": "人", "r": "ひと", "g": "Menschen" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "SNS", "g": "soziale Medien" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "使", "r": "つか", "g": "nutzen" },
          { "s": "って", "g": "und" },
          { "s": "います", "g": "(tun)" },
          { "s": "。", "p": true }
        ],
        "jp": "今では、多くの人がSNSを使っています。",
        "romaji": "Ima de wa, ooku no hito ga esuenuesu o tsukatte imasu.",
        "de": "Heute nutzen viele Menschen soziale Medien."
      },
      {
        "tokens": [
          { "s": "遠く", "r": "とおく", "g": "weit" },
          { "s": "の", "g": "(von)" },
          { "s": "友だち", "r": "ともだち", "g": "Freunde" },
          { "s": "と", "g": "mit" },
          { "s": "かんたん", "g": "einfach" },
          { "s": "に", "g": "(Adverb)" },
          { "s": "連絡", "r": "れんらく", "g": "Kontakt" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "とれる", "g": "halten können" },
          { "s": "の", "g": "(das)" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "べんり", "g": "praktisch" },
          { "s": "です", "g": "ist" },
          { "s": "。", "p": true }
        ],
        "jp": "遠くの友だちとかんたんに連絡がとれるのはべんりです。",
        "romaji": "Tooku no tomodachi to kantan ni renraku ga toreru no wa benri desu.",
        "de": "Praktisch ist, dass man mit fernen Freunden leicht in Kontakt bleibt."
      },
      {
        "tokens": [
          { "s": "世界", "r": "せかい", "g": "Welt" },
          { "s": "中", "r": "じゅう", "g": "überall" },
          { "s": "の", "g": "(von)" },
          { "s": "情報", "r": "じょうほう", "g": "Informationen" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "すぐ", "g": "sofort" },
          { "s": "に", "g": "(Adverb)" },
          { "s": "知る", "r": "しる", "g": "erfahren" },
          { "s": "こと", "g": "(das)" },
          { "s": "も", "g": "auch" },
          { "s": "できます", "g": "kann man" },
          { "s": "。", "p": true }
        ],
        "jp": "世界中の情報をすぐに知ることもできます。",
        "romaji": "Sekaijuu no jouhou o sugu ni shiru koto mo dekimasu.",
        "de": "Auch erfährt man sofort Nachrichten aus aller Welt."
      },
      {
        "tokens": [
          { "s": "しかし", "g": "jedoch" },
          { "s": "、", "p": true },
          { "s": "いい", "g": "gute" },
          { "s": "こと", "g": "Dinge" },
          { "s": "ばかり", "g": "nur" },
          { "s": "では", "g": "(Themenpartikel)" },
          { "s": "ありません", "g": "ist es nicht" },
          { "s": "。", "p": true }
        ],
        "jp": "しかし、いいことばかりではありません。",
        "romaji": "Shikashi, ii koto bakari de wa arimasen.",
        "de": "Es ist jedoch nicht nur Gutes."
      },
      {
        "tokens": [
          { "s": "他人", "r": "たにん", "g": "andere" },
          { "s": "の", "g": "(von)" },
          { "s": "生活", "r": "せいかつ", "g": "Leben" },
          { "s": "と", "g": "(Objekt)" },
          { "s": "自分", "r": "じぶん", "g": "sich selbst" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "比", "r": "くら", "g": "vergleichen" },
          { "s": "べて", "g": "und" },
          { "s": "、", "p": true },
          { "s": "つらく", "g": "bedrückt" },
          { "s": "なる", "g": "werden" },
          { "s": "人", "r": "ひと", "g": "Menschen" },
          { "s": "も", "g": "auch" },
          { "s": "います", "g": "gibt es" },
          { "s": "。", "p": true }
        ],
        "jp": "他人の生活と自分を比べて、つらくなる人もいます。",
        "romaji": "Tanin no seikatsu to jibun o kurabete, tsuraku naru hito mo imasu.",
        "de": "Manche vergleichen ihr Leben mit anderen und werden traurig."
      },
      {
        "tokens": [
          { "s": "また", "g": "außerdem" },
          { "s": "、", "p": true },
          { "s": "長い", "r": "ながい", "g": "lange" },
          { "s": "時間", "r": "じかん", "g": "Zeit" },
          { "s": "使う", "r": "つかう", "g": "nutzen" },
          { "s": "と", "g": "wenn" },
          { "s": "、", "p": true },
          { "s": "目", "r": "め", "g": "Augen" },
          { "s": "や", "g": "und" },
          { "s": "心", "r": "こころ", "g": "Geist" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "つかれて", "g": "ermüden und" },
          { "s": "しまいます", "g": "(tun)" },
          { "s": "。", "p": true }
        ],
        "jp": "また、長い時間使うと、目や心がつかれてしまいます。",
        "romaji": "Mata, nagai jikan tsukau to, me ya kokoro ga tsukarete shimaimasu.",
        "de": "Außerdem ermüden bei langer Nutzung Augen und Geist."
      },
      {
        "tokens": [
          { "s": "だいじ", "g": "wichtig" },
          { "s": "な", "g": "(Adjektiv)" },
          { "s": "の", "g": "(ist es)" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "、", "p": true },
          { "s": "時間", "r": "じかん", "g": "Zeit" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "決", "r": "き", "g": "festlegen" },
          { "s": "めて", "g": "und" },
          { "s": "使う", "r": "つかう", "g": "nutzen" },
          { "s": "こと", "g": "(das)" },
          { "s": "だ", "g": "ist" },
          { "s": "と", "g": "(Objekt)" },
          { "s": "思", "r": "おも", "g": "denken" },
          { "s": "います", "g": "(tue)" },
          { "s": "。", "p": true }
        ],
        "jp": "だいじなのは、時間を決めて使うことだと思います。",
        "romaji": "Daiji na no wa, jikan o kimete tsukau koto da to omoimasu.",
        "de": "Wichtig ist, glaube ich, sie mit festgelegter Zeit zu nutzen."
      },
      {
        "tokens": [
          { "s": "べんり", "g": "praktisch" },
          { "s": "な", "g": "(Adjektiv)" },
          { "s": "どうぐ", "g": "Werkzeug" },
          { "s": "だから", "g": "weil" },
          { "s": "こそ", "g": "gerade" },
          { "s": "、", "p": true },
          { "s": "上手", "r": "じょうず", "g": "geschickt" },
          { "s": "に", "g": "(Adverb)" },
          { "s": "付き合", "r": "つきあ", "g": "umgehen" },
          { "s": "いたい", "g": "möchte" },
          { "s": "です", "g": "(tue)" },
          { "s": "。", "p": true }
        ],
        "jp": "べんりなどうぐだからこそ、上手に付き合いたいです。",
        "romaji": "Benri na dougu dakara koso, jouzu ni tsukiaitai desu.",
        "de": "Gerade weil es ein nützliches Werkzeug ist, will ich klug damit umgehen."
      }
    ]
  },
  {
    "id": "r-borantia-taiken",
    "title": "ボランティア たいけん",
    "titleReading": "ボランティアたいけん",
    "titleDe": "Meine Erfahrung als Freiwilliger",
    "level": "N3",
    "category": "Ehrenamt",
    "summary": "Ein Erlebnisbericht über die Teilnahme an einer Reinigungsaktion im Stadtpark.",
    "sentences": [
      {
        "tokens": [
          { "s": "先月", "r": "せんげつ", "g": "letzten Monat" },
          { "s": "、", "p": true },
          { "s": "町", "r": "まち", "g": "Stadt" },
          { "s": "の", "g": "(von)" },
          { "s": "公園", "r": "こうえん", "g": "Park" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "掃除する", "r": "そうじする", "g": "reinigen" },
          { "s": "ボランティア", "g": "Freiwilligenarbeit" },
          { "s": "に", "g": "(an)" },
          { "s": "参加", "r": "さんか", "g": "teilnehmen" },
          { "s": "しました", "g": "(tat)" },
          { "s": "。", "p": true }
        ],
        "jp": "先月、町の公園を掃除するボランティアに参加しました。",
        "romaji": "Sengetsu, machi no kouen o souji suru borantia ni sanka shimashita.",
        "de": "Letzten Monat nahm ich an einer Freiwilligenaktion teil, um den Stadtpark zu säubern."
      },
      {
        "tokens": [
          { "s": "朝", "r": "あさ", "g": "Morgen" },
          { "s": "早く", "r": "はやく", "g": "früh" },
          { "s": "から", "g": "(von)" },
          { "s": "、", "p": true },
          { "s": "いろいろ", "g": "verschieden" },
          { "s": "な", "g": "(Adjektiv)" },
          { "s": "年", "r": "とし", "g": "Alter" },
          { "s": "の", "g": "(von)" },
          { "s": "人", "r": "ひと", "g": "Menschen" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "集", "r": "あつ", "g": "sich versammeln" },
          { "s": "まりました", "g": "(taten)" },
          { "s": "。", "p": true }
        ],
        "jp": "朝早くから、いろいろな年の人が集まりました。",
        "romaji": "Asa hayaku kara, iroiro na toshi no hito ga atsumarimashita.",
        "de": "Schon früh am Morgen kamen Menschen aller Altersgruppen zusammen."
      },
      {
        "tokens": [
          { "s": "最初", "r": "さいしょ", "g": "zuerst" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "知", "r": "し", "g": "kennen" },
          { "s": "らない", "g": "nicht" },
          { "s": "人", "r": "ひと", "g": "Leuten" },
          { "s": "ばかり", "g": "nur" },
          { "s": "で", "g": "(unter)" },
          { "s": "、", "p": true },
          { "s": "少し", "r": "すこし", "g": "etwas" },
          { "s": "緊張", "r": "きんちょう", "g": "Anspannung" },
          { "s": "しました", "g": "(war)" },
          { "s": "。", "p": true }
        ],
        "jp": "最初は知らない人ばかりで、少し緊張しました。",
        "romaji": "Saisho wa shiranai hito bakari de, sukoshi kinchou shimashita.",
        "de": "Zuerst kannte ich niemanden und war etwas angespannt."
      },
      {
        "tokens": [
          { "s": "でも", "g": "aber" },
          { "s": "、", "p": true },
          { "s": "いっしょ", "g": "zusammen" },
          { "s": "に", "g": "(Adverb)" },
          { "s": "作業", "r": "さぎょう", "g": "Arbeit" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "する", "g": "tun" },
          { "s": "うち", "g": "während" },
          { "s": "に", "g": "(Adverb)" },
          { "s": "すぐ", "g": "schnell" },
          { "s": "に", "g": "(Adverb)" },
          { "s": "仲良く", "r": "なかよく", "g": "vertraut" },
          { "s": "なりました", "g": "wurde" },
          { "s": "。", "p": true }
        ],
        "jp": "でも、いっしょに作業をするうちにすぐに仲良くなりました。",
        "romaji": "Demo, issho ni sagyou o suru uchi ni sugu ni nakayoku narimashita.",
        "de": "Aber bei der gemeinsamen Arbeit wurden wir schnell vertraut."
      },
      {
        "tokens": [
          { "s": "公園", "r": "こうえん", "g": "Park" },
          { "s": "には", "g": "(im)" },
          { "s": "おもった", "g": "gedacht" },
          { "s": "より", "g": "als" },
          { "s": "ずっと", "g": "viel" },
          { "s": "多くの", "r": "おおくの", "g": "viel" },
          { "s": "ごみ", "g": "Müll" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "ありました", "g": "war" },
          { "s": "。", "p": true }
        ],
        "jp": "公園にはおもったよりずっと多くのごみがありました。",
        "romaji": "Kouen ni wa omotta yori zutto ooku no gomi ga arimashita.",
        "de": "Im Park lag viel mehr Müll, als ich gedacht hatte."
      },
      {
        "tokens": [
          { "s": "二時間", "r": "にじかん", "g": "zwei Stunden" },
          { "s": "で", "g": "(in)" },
          { "s": "公園", "r": "こうえん", "g": "Park" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "すっかり", "g": "völlig" },
          { "s": "きれい", "g": "sauber" },
          { "s": "に", "g": "(zu)" },
          { "s": "なりました", "g": "wurde" },
          { "s": "。", "p": true }
        ],
        "jp": "二時間で公園はすっかりきれいになりました。",
        "romaji": "Nijikan de kouen wa sukkari kirei ni narimashita.",
        "de": "In zwei Stunden wurde der Park völlig sauber."
      },
      {
        "tokens": [
          { "s": "自分", "r": "じぶん", "g": "selbst" },
          { "s": "の", "g": "(von)" },
          { "s": "住む", "r": "すむ", "g": "wohnen" },
          { "s": "町", "r": "まち", "g": "Stadt" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "好き", "r": "すき", "g": "lieb" },
          { "s": "に", "g": "(zu)" },
          { "s": "なった", "g": "wurde" },
          { "s": "ような", "g": "wie" },
          { "s": "気", "r": "き", "g": "Gefühl" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "しました", "g": "(hatte)" },
          { "s": "。", "p": true }
        ],
        "jp": "自分の住む町が好きになったような気がしました。",
        "romaji": "Jibun no sumu machi ga suki ni natta you na ki ga shimashita.",
        "de": "Mir war, als hätte ich meine Stadt lieber gewonnen."
      },
      {
        "tokens": [
          { "s": "これ", "g": "das" },
          { "s": "から", "g": "von nun an" },
          { "s": "も", "g": "auch" },
          { "s": "こういう", "g": "solche" },
          { "s": "活動", "r": "かつどう", "g": "Aktivitäten" },
          { "s": "に", "g": "(an)" },
          { "s": "参加", "r": "さんか", "g": "teilnehmen" },
          { "s": "したい", "g": "möchte" },
          { "s": "と", "g": "(Objekt)" },
          { "s": "思", "r": "おも", "g": "denken" },
          { "s": "います", "g": "(tue)" },
          { "s": "。", "p": true }
        ],
        "jp": "これからもこういう活動に参加したいと思います。",
        "romaji": "Kore kara mo kou iu katsudou ni sanka shitai to omoimasu.",
        "de": "Auch künftig möchte ich an solchen Aktionen teilnehmen."
      }
    ]
  },
  {
    "id": "r-inaka-to-tokai",
    "title": "いなか と とかい",
    "titleReading": "いなかととかい",
    "titleDe": "Land und Stadt",
    "level": "N3",
    "category": "Wohnen",
    "summary": "Ein vergleichender Text über das Leben auf dem Land und in der Großstadt.",
    "sentences": [
      {
        "tokens": [
          { "s": "わたし", "g": "ich" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "小さい", "r": "ちいさい", "g": "klein" },
          { "s": "時", "r": "とき", "g": "Zeit" },
          { "s": "から", "g": "(von)" },
          { "s": "十八", "r": "じゅうはち", "g": "achtzehn" },
          { "s": "歳", "r": "さい", "g": "Jahre" },
          { "s": "まで", "g": "bis" },
          { "s": "、", "p": true },
          { "s": "いなか", "g": "Land" },
          { "s": "に", "g": "(auf)" },
          { "s": "住", "r": "す", "g": "wohnen" },
          { "s": "んで", "g": "und" },
          { "s": "いました", "g": "(tat)" },
          { "s": "。", "p": true }
        ],
        "jp": "わたしは小さい時から十八歳まで、いなかに住んでいました。",
        "romaji": "Watashi wa chiisai toki kara juuhassai made, inaka ni sunde imashita.",
        "de": "Von klein auf bis achtzehn habe ich auf dem Land gewohnt."
      },
      {
        "tokens": [
          { "s": "自然", "r": "しぜん", "g": "Natur" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "多", "r": "おお", "g": "viel" },
          { "s": "くて", "g": "und" },
          { "s": "、", "p": true },
          { "s": "空気", "r": "くうき", "g": "Luft" },
          { "s": "も", "g": "auch" },
          { "s": "きれい", "g": "sauber" },
          { "s": "でした", "g": "war" },
          { "s": "。", "p": true }
        ],
        "jp": "自然が多くて、空気もきれいでした。",
        "romaji": "Shizen ga ookute, kuuki mo kirei deshita.",
        "de": "Es gab viel Natur und auch die Luft war rein."
      },
      {
        "tokens": [
          { "s": "でも", "g": "aber" },
          { "s": "、", "p": true },
          { "s": "店", "r": "みせ", "g": "Geschäfte" },
          { "s": "や", "g": "und" },
          { "s": "電車", "r": "でんしゃ", "g": "Züge" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "少", "r": "すく", "g": "wenig" },
          { "s": "なくて", "g": "und" },
          { "s": "、", "p": true },
          { "s": "ふべん", "g": "unpraktisch" },
          { "s": "な", "g": "(Adjektiv)" },
          { "s": "こと", "g": "Dinge" },
          { "s": "も", "g": "auch" },
          { "s": "ありました", "g": "gab es" },
          { "s": "。", "p": true }
        ],
        "jp": "でも、店や電車が少なくて、ふべんなこともありました。",
        "romaji": "Demo, mise ya densha ga sukunakute, fuben na koto mo arimashita.",
        "de": "Aber es gab wenige Geschäfte und Züge, was manchmal unpraktisch war."
      },
      {
        "tokens": [
          { "s": "大学", "r": "だいがく", "g": "Universität" },
          { "s": "の", "g": "(von)" },
          { "s": "時", "r": "とき", "g": "Zeit" },
          { "s": "に", "g": "(zu)" },
          { "s": "、", "p": true },
          { "s": "東京", "r": "とうきょう", "g": "Tokio" },
          { "s": "に引っ", "r": "にひっ", "g": "(nach)" },
          { "s": "越", "r": "こ", "g": "umziehen" },
          { "s": "しました", "g": "(tat)" },
          { "s": "。", "p": true }
        ],
        "jp": "大学の時に、東京に引っ越しました。",
        "romaji": "Daigaku no toki ni, Toukyou ni hikkoshimashita.",
        "de": "Während der Uni bin ich nach Tokio gezogen."
      },
      {
        "tokens": [
          { "s": "都会", "r": "とかい", "g": "Großstadt" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "にぎやか", "g": "lebhaft" },
          { "s": "で", "g": "und" },
          { "s": "、", "p": true },
          { "s": "なんでも", "g": "alles" },
          { "s": "すぐ", "g": "sofort" },
          { "s": "に", "g": "(Adverb)" },
          { "s": "手", "r": "て", "g": "Hand" },
          { "s": "に", "g": "(in)" },
          { "s": "はいります", "g": "bekommt man" },
          { "s": "。", "p": true }
        ],
        "jp": "都会はにぎやかで、なんでもすぐに手にはいります。",
        "romaji": "Tokai wa nigiyaka de, nandemo sugu ni te ni hairimasu.",
        "de": "Die Großstadt ist lebhaft, und man bekommt alles sofort."
      },
      {
        "tokens": [
          { "s": "しかし", "g": "jedoch" },
          { "s": "、", "p": true },
          { "s": "人", "r": "ひと", "g": "Menschen" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "多", "r": "おお", "g": "viel" },
          { "s": "すぎて", "g": "zu und" },
          { "s": "、", "p": true },
          { "s": "つかれる", "g": "ermüden" },
          { "s": "こと", "g": "Dinge" },
          { "s": "も", "g": "auch" },
          { "s": "あります", "g": "gibt es" },
          { "s": "。", "p": true }
        ],
        "jp": "しかし、人が多すぎて、つかれることもあります。",
        "romaji": "Shikashi, hito ga oosugite, tsukareru koto mo arimasu.",
        "de": "Aber es sind so viele Menschen, dass es manchmal ermüdet."
      },
      {
        "tokens": [
          { "s": "どちらにも", "g": "beide" },
          { "s": "いい", "g": "gute" },
          { "s": "ところ", "g": "Seiten" },
          { "s": "と", "g": "und" },
          { "s": "悪い", "r": "わるい", "g": "schlechte" },
          { "s": "ところ", "g": "Seiten" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "ある", "g": "gibt es" },
          { "s": "と", "g": "(Objekt)" },
          { "s": "思", "r": "おも", "g": "denken" },
          { "s": "います", "g": "(tue)" },
          { "s": "。", "p": true }
        ],
        "jp": "どちらにもいいところと悪いところがあると思います。",
        "romaji": "Dochira ni mo ii tokoro to warui tokoro ga aru to omoimasu.",
        "de": "Beide haben gute und schlechte Seiten, finde ich."
      },
      {
        "tokens": [
          { "s": "将来", "r": "しょうらい", "g": "Zukunft" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "、", "p": true },
          { "s": "両方", "r": "りょうほう", "g": "beides" },
          { "s": "の", "g": "(von)" },
          { "s": "いい", "g": "Gutes" },
          { "s": "ところ", "g": "Seiten" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "ある", "g": "haben" },
          { "s": "町", "r": "まち", "g": "Stadt" },
          { "s": "に", "g": "(in)" },
          { "s": "住", "r": "す", "g": "wohnen" },
          { "s": "みたい", "g": "möchte" },
          { "s": "です", "g": "(tue)" },
          { "s": "。", "p": true }
        ],
        "jp": "将来は、両方のいいところがある町に住みたいです。",
        "romaji": "Shourai wa, ryouhou no ii tokoro ga aru machi ni sumitai desu.",
        "de": "In Zukunft möchte ich in einer Stadt leben, die das Beste von beidem hat."
      }
    ]
  },
  {
    "id": "r-kankou-koregai",
    "title": "かんこう の これから",
    "titleReading": "かんこうのこれから",
    "titleDe": "Die Zukunft des Tourismus",
    "level": "N2",
    "category": "Tourismus",
    "summary": "Ein Essay über den wachsenden Tourismus in Japan und das Problem der Überlastung beliebter Orte.",
    "sentences": [
      {
        "tokens": [
          { "s": "近年", "r": "きんねん", "g": "in den letzten Jahren" },
          { "s": "、", "p": true },
          { "s": "日本", "r": "にほん", "g": "Japan" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "訪れる", "r": "おとずれる", "g": "besuchen" },
          { "s": "外国人", "r": "がいこくじん", "g": "Ausländer" },
          { "s": "の", "g": "(von)" },
          { "s": "数", "r": "かず", "g": "Zahl" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "大きく", "r": "おおきく", "g": "stark" },
          { "s": "増", "r": "ふ", "g": "zunehmen" },
          { "s": "えた", "g": "(ist)" },
          { "s": "。", "p": true }
        ],
        "jp": "近年、日本を訪れる外国人の数が大きく増えた。",
        "romaji": "Kinnen, Nihon o otozureru gaikokujin no kazu ga ookiku fueta.",
        "de": "In den letzten Jahren ist die Zahl der ausländischen Japan-Besucher stark gestiegen."
      },
      {
        "tokens": [
          { "s": "観光", "r": "かんこう", "g": "Tourismus" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "地域", "r": "ちいき", "g": "Region" },
          { "s": "の", "g": "(von)" },
          { "s": "経済", "r": "けいざい", "g": "Wirtschaft" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "支える", "r": "ささえる", "g": "stützen" },
          { "s": "大切", "r": "たいせつ", "g": "wichtig" },
          { "s": "な", "g": "(Adjektiv)" },
          { "s": "力", "r": "ちから", "g": "Kraft" },
          { "s": "に", "g": "(zu)" },
          { "s": "なって", "g": "geworden" },
          { "s": "いる", "g": "ist" },
          { "s": "。", "p": true }
        ],
        "jp": "観光は地域の経済を支える大切な力になっている。",
        "romaji": "Kankou wa chiiki no keizai o sasaeru taisetsu na chikara ni natte iru.",
        "de": "Tourismus ist zu einer wichtigen Stütze der regionalen Wirtschaft geworden."
      },
      {
        "tokens": [
          { "s": "しかし", "g": "jedoch" },
          { "s": "、", "p": true },
          { "s": "有名", "r": "ゆうめい", "g": "berühmt" },
          { "s": "な", "g": "(Adjektiv)" },
          { "s": "観光地", "r": "かんこうち", "g": "Sehenswürdigkeit" },
          { "s": "に", "g": "(an)" },
          { "s": "人", "r": "ひと", "g": "Menschen" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "集中", "r": "しゅうちゅう", "g": "sich konzentrieren" },
          { "s": "しすぎる", "g": "zu sehr" },
          { "s": "という", "g": "sogenanntes" },
          { "s": "問題", "r": "もんだい", "g": "Problem" },
          { "s": "も", "g": "(Themenpartikel)" },
          { "s": "起", "r": "お", "g": "entstehen" },
          { "s": "きて", "g": "und" },
          { "s": "いる", "g": "ist" },
          { "s": "。", "p": true }
        ],
        "jp": "しかし、有名な観光地に人が集中しすぎるという問題も起きている。",
        "romaji": "Shikashi, yuumei na kankouchi ni hito ga shuuchuu shisugiru to iu mondai mo okite iru.",
        "de": "Doch entsteht auch das Problem, dass sich zu viele an berühmten Orten drängen."
      },
      {
        "tokens": [
          { "s": "道", "r": "みち", "g": "Straßen" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "混み", "r": "こみ", "g": "voll" },
          { "s": "、", "p": true },
          { "s": "そこ", "g": "dort" },
          { "s": "に", "g": "(an)" },
          { "s": "住む", "r": "すむ", "g": "wohnen" },
          { "s": "人", "r": "ひと", "g": "Menschen" },
          { "s": "の", "g": "(von)" },
          { "s": "生活", "r": "せいかつ", "g": "Leben" },
          { "s": "に", "g": "(auf)" },
          { "s": "影響", "r": "えいきょう", "g": "Auswirkung" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "出る", "r": "でる", "g": "entstehen" },
          { "s": "こと", "g": "Fälle" },
          { "s": "も", "g": "auch" },
          { "s": "ある", "g": "gibt es" },
          { "s": "。", "p": true }
        ],
        "jp": "道が混み、そこに住む人の生活に影響が出ることもある。",
        "romaji": "Michi ga komi, soko ni sumu hito no seikatsu ni eikyou ga deru koto mo aru.",
        "de": "Die Straßen sind verstopft, was das Leben der Anwohner beeinträchtigt."
      },
      {
        "tokens": [
          { "s": "また", "g": "außerdem" },
          { "s": "、", "p": true },
          { "s": "一部", "r": "いちぶ", "g": "manche" },
          { "s": "の", "g": "(von)" },
          { "s": "観光客", "r": "かんこうきゃく", "g": "Touristen" },
          { "s": "の", "g": "(von)" },
          { "s": "行動", "r": "こうどう", "g": "Verhalten" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "問題", "r": "もんだい", "g": "Problem" },
          { "s": "に", "g": "(zu)" },
          { "s": "なる", "g": "wird" },
          { "s": "こと", "g": "Fälle" },
          { "s": "も", "g": "auch" },
          { "s": "少", "r": "すく", "g": "wenig" },
          { "s": "なくない", "g": "nicht" },
          { "s": "。", "p": true }
        ],
        "jp": "また、一部の観光客の行動が問題になることも少なくない。",
        "romaji": "Mata, ichibu no kankoukyaku no koudou ga mondai ni naru koto mo sukunakunai.",
        "de": "Auch das Verhalten mancher Touristen wird nicht selten zum Problem."
      },
      {
        "tokens": [
          { "s": "こうした", "g": "solche" },
          { "s": "課題", "r": "かだい", "g": "Herausforderungen" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "解決する", "r": "かいけつする", "g": "lösen" },
          { "s": "ために", "g": "um zu" },
          { "s": "、", "p": true },
          { "s": "地域", "r": "ちいき", "g": "Region" },
          { "s": "ごと", "g": "je" },
          { "s": "に", "g": "(Adverb)" },
          { "s": "工夫", "r": "くふう", "g": "Maßnahmen" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "求", "r": "もと", "g": "gefordert" },
          { "s": "められて", "g": "werden und" },
          { "s": "いる", "g": "sind" },
          { "s": "。", "p": true }
        ],
        "jp": "こうした課題を解決するために、地域ごとに工夫が求められている。",
        "romaji": "Koushita kadai o kaiketsu suru tame ni, chiiki goto ni kufuu ga motomerarete iru.",
        "de": "Um diese Aufgaben zu lösen, sind regionale Maßnahmen gefragt."
      },
      {
        "tokens": [
          { "s": "例えば", "r": "たとえば", "g": "zum Beispiel" },
          { "s": "、", "p": true },
          { "s": "入場", "r": "にゅうじょう", "g": "Eintritt" },
          { "s": "の", "g": "(von)" },
          { "s": "人数", "r": "にんずう", "g": "Personenzahl" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "制限", "r": "せいげん", "g": "beschränken" },
          { "s": "したり", "g": "etwa" },
          { "s": "、", "p": true },
          { "s": "観光", "r": "かんこう", "g": "Touristen-" },
          { "s": "税", "r": "ぜい", "g": "steuer" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "集", "r": "あつ", "g": "erheben" },
          { "s": "めたりする", "g": "etwa" },
          { "s": "方法", "r": "ほうほう", "g": "Methoden" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "ある", "g": "gibt es" },
          { "s": "。", "p": true }
        ],
        "jp": "例えば、入場の人数を制限したり、観光税を集めたりする方法がある。",
        "romaji": "Tatoeba, nyuujou no ninzuu o seigen shitari, kankouzei o atsumetari suru houhou ga aru.",
        "de": "So gibt es etwa Besucherobergrenzen oder eine Touristensteuer."
      },
      {
        "tokens": [
          { "s": "観光", "r": "かんこう", "g": "Tourismus" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "楽しむ", "r": "たのしむ", "g": "genießen" },
          { "s": "人", "r": "ひと", "g": "Menschen" },
          { "s": "と", "g": "und" },
          { "s": "そこ", "g": "dort" },
          { "s": "で", "g": "(in)" },
          { "s": "暮らす", "r": "くらす", "g": "leben" },
          { "s": "人", "r": "ひと", "g": "Menschen" },
          { "s": "の", "g": "(von)" },
          { "s": "両方", "r": "りょうほう", "g": "beide" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "満足", "r": "まんぞく", "g": "zufrieden" },
          { "s": "できる", "g": "sein können" },
          { "s": "形", "r": "かたち", "g": "Form" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "理想", "r": "りそう", "g": "Ideal" },
          { "s": "だ", "g": "ist" },
          { "s": "。", "p": true }
        ],
        "jp": "観光を楽しむ人とそこで暮らす人の両方が満足できる形が理想だ。",
        "romaji": "Kankou o tanoshimu hito to soko de kurasu hito no ryouhou ga manzoku dekiru katachi ga risou da.",
        "de": "Ideal ist eine Form, mit der Besucher wie Einheimische zufrieden sind."
      }
    ]
  },
  {
    "id": "r-kyouiku-no-katachi",
    "title": "きょういく の かたち",
    "titleReading": "きょういくのかたち",
    "titleDe": "Wandel in der Bildung",
    "level": "N2",
    "category": "Bildung",
    "summary": "Ein Essay über veränderte Lernformen und die Rolle der Technik im modernen Unterricht.",
    "sentences": [
      {
        "tokens": [
          { "s": "教育", "r": "きょういく", "g": "Bildung" },
          { "s": "の", "g": "(von)" },
          { "s": "形", "r": "かたち", "g": "Form" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "、", "p": true },
          { "s": "時代", "r": "じだい", "g": "Zeit" },
          { "s": "とともに", "g": "mit" },
          { "s": "大きく", "r": "おおきく", "g": "stark" },
          { "s": "変", "r": "か", "g": "sich verändern" },
          { "s": "わって", "g": "und" },
          { "s": "きた", "g": "(ist)" },
          { "s": "。", "p": true }
        ],
        "jp": "教育の形は、時代とともに大きく変わってきた。",
        "romaji": "Kyouiku no katachi wa, jidai to tomo ni ookiku kawatte kita.",
        "de": "Die Form der Bildung hat sich mit der Zeit stark gewandelt."
      },
      {
        "tokens": [
          { "s": "むかし", "g": "früher" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "先生", "r": "せんせい", "g": "Lehrer" },
          { "s": "の", "g": "(von)" },
          { "s": "話", "r": "はなし", "g": "Erklärungen" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "聞く", "r": "きく", "g": "hören" },
          { "s": "だけ", "g": "nur" },
          { "s": "の", "g": "(von)" },
          { "s": "授業", "r": "じゅぎょう", "g": "Unterricht" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "ふつう", "g": "üblich" },
          { "s": "だった", "g": "war" },
          { "s": "。", "p": true }
        ],
        "jp": "むかしは先生の話を聞くだけの授業がふつうだった。",
        "romaji": "Mukashi wa sensei no hanashi o kiku dake no jugyou ga futsuu datta.",
        "de": "Früher war ein Unterricht üblich, in dem man nur dem Lehrer zuhörte."
      },
      {
        "tokens": [
          { "s": "しかし", "g": "jedoch" },
          { "s": "最近", "r": "さいきん", "g": "in letzter Zeit" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "、", "p": true },
          { "s": "生徒", "r": "せいと", "g": "Schüler" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "自分", "r": "じぶん", "g": "selbst" },
          { "s": "で", "g": "(von)" },
          { "s": "考え", "r": "かんがえ", "g": "denken" },
          { "s": "、", "p": true },
          { "s": "話し合う", "r": "はなしあう", "g": "reden" },
          { "s": "授業", "r": "じゅぎょう", "g": "Unterricht" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "増", "r": "ふ", "g": "zunehmen" },
          { "s": "えて", "g": "und" },
          { "s": "きた", "g": "(ist)" },
          { "s": "。", "p": true }
        ],
        "jp": "しかし最近は、生徒が自分で考え、話し合う授業が増えてきた。",
        "romaji": "Shikashi saikin wa, seito ga jibun de kangae, hanashiau jugyou ga fuete kita.",
        "de": "In letzter Zeit nimmt jedoch Unterricht zu, in dem Schüler selbst denken und diskutieren."
      },
      {
        "tokens": [
          { "s": "また", "g": "außerdem" },
          { "s": "、", "p": true },
          { "s": "パソコン", "g": "Computer" },
          { "s": "や", "g": "und" },
          { "s": "タブレット", "g": "Tablets" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "使う", "r": "つかう", "g": "benutzen" },
          { "s": "学校", "r": "がっこう", "g": "Schulen" },
          { "s": "も", "g": "auch" },
          { "s": "多く", "r": "おおく", "g": "viel" },
          { "s": "なった", "g": "geworden" },
          { "s": "。", "p": true }
        ],
        "jp": "また、パソコンやタブレットを使う学校も多くなった。",
        "romaji": "Mata, pasokon ya taburetto o tsukau gakkou mo ooku natta.",
        "de": "Auch nutzen mehr Schulen Computer und Tablets."
      },
      {
        "tokens": [
          { "s": "インターネット", "g": "Internet" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "使", "r": "つか", "g": "nutzen" },
          { "s": "えば", "g": "wenn" },
          { "s": "、", "p": true },
          { "s": "家", "r": "いえ", "g": "Zuhause" },
          { "s": "に", "g": "(in)" },
          { "s": "いて", "g": "sein und" },
          { "s": "も", "g": "auch" },
          { "s": "世界", "r": "せかい", "g": "Welt" },
          { "s": "中", "r": "じゅう", "g": "überall" },
          { "s": "の", "g": "(von)" },
          { "s": "授業", "r": "じゅぎょう", "g": "Unterricht" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "受", "r": "う", "g": "besuchen" },
          { "s": "けられる", "g": "kann man" },
          { "s": "。", "p": true }
        ],
        "jp": "インターネットを使えば、家にいても世界中の授業を受けられる。",
        "romaji": "Intaanetto o tsukaeba, ie ni ite mo sekaijuu no jugyou o ukerareru.",
        "de": "Mit dem Internet kann man von zu Hause Unterricht aus aller Welt besuchen."
      },
      {
        "tokens": [
          { "s": "ただし", "g": "allerdings" },
          { "s": "、", "p": true },
          { "s": "便利", "r": "べんり", "g": "praktisch" },
          { "s": "に", "g": "(Adverb)" },
          { "s": "なった", "g": "geworden" },
          { "s": "一方で", "r": "いっぽうで", "g": "andererseits" },
          { "s": "、", "p": true },
          { "s": "新しい", "r": "あたらしい", "g": "neu" },
          { "s": "問題", "r": "もんだい", "g": "Probleme" },
          { "s": "も", "g": "(Themenpartikel)" },
          { "s": "生", "r": "う", "g": "entstehen" },
          { "s": "まれて", "g": "und" },
          { "s": "いる", "g": "sind" },
          { "s": "。", "p": true }
        ],
        "jp": "ただし、便利になった一方で、新しい問題も生まれている。",
        "romaji": "Tadashi, benri ni natta ippou de, atarashii mondai mo umarete iru.",
        "de": "Doch während es praktischer wurde, entstehen auch neue Probleme."
      },
      {
        "tokens": [
          { "s": "画面", "r": "がめん", "g": "Bildschirm" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "見る", "r": "みる", "g": "sehen" },
          { "s": "時間", "r": "じかん", "g": "Zeit" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "長く", "r": "ながく", "g": "lang" },
          { "s": "なり", "g": "wird und" },
          { "s": "、", "p": true },
          { "s": "健康への", "r": "けんこうへの", "g": "Gesundheit" },
          { "s": "影響", "r": "えいきょう", "g": "Auswirkung" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "心配する", "r": "しんぱいする", "g": "sorgen" },
          { "s": "声", "r": "こえ", "g": "Stimmen" },
          { "s": "も", "g": "auch" },
          { "s": "ある", "g": "gibt es" },
          { "s": "。", "p": true }
        ],
        "jp": "画面を見る時間が長くなり、健康への影響を心配する声もある。",
        "romaji": "Gamen o miru jikan ga nagaku nari, kenkou e no eikyou o shinpai suru koe mo aru.",
        "de": "Die Bildschirmzeit wird länger, und manche sorgen sich um die Gesundheit."
      },
      {
        "tokens": [
          { "s": "技術", "r": "ぎじゅつ", "g": "Technik" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "どう", "g": "wie" },
          { "s": "生かすかが", "r": "いかすかが", "g": "nutzbar machen" },
          { "s": "、", "p": true },
          { "s": "これから", "g": "künftig" },
          { "s": "の", "g": "(von)" },
          { "s": "教育", "r": "きょういく", "g": "Bildung" },
          { "s": "の", "g": "(von)" },
          { "s": "大きな", "r": "おおきな", "g": "große" },
          { "s": "課題", "r": "かだい", "g": "Aufgabe" },
          { "s": "だ", "g": "ist" },
          { "s": "ろう", "g": "wohl" },
          { "s": "。", "p": true }
        ],
        "jp": "技術をどう生かすかが、これからの教育の大きな課題だろう。",
        "romaji": "Gijutsu o dou ikasu ka ga, kore kara no kyouiku no ookina kadai darou.",
        "de": "Wie man die Technik sinnvoll nutzt, dürfte die große Aufgabe künftiger Bildung sein."
      }
    ]
  },
  {
    "id": "r-shoku-no-henka",
    "title": "しょく の へんか",
    "titleReading": "しょくのへんか",
    "titleDe": "Der Wandel der Ernährung",
    "level": "N2",
    "category": "Ernährung",
    "summary": "Ein Essay über veränderte Essgewohnheiten in Japan und die Frage gesunder Ernährung.",
    "sentences": [
      {
        "tokens": [
          { "s": "日本人", "r": "にほんじん", "g": "Japaner" },
          { "s": "の", "g": "(von)" },
          { "s": "食事", "r": "しょくじ", "g": "Ernährung" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "、", "p": true },
          { "s": "この", "g": "diesen" },
          { "s": "数十年", "r": "すうじゅうねん", "g": "Jahrzehnten" },
          { "s": "で", "g": "(in)" },
          { "s": "大きく", "r": "おおきく", "g": "stark" },
          { "s": "変", "r": "か", "g": "sich wandeln" },
          { "s": "わった", "g": "(hat)" },
          { "s": "。", "p": true }
        ],
        "jp": "日本人の食事は、この数十年で大きく変わった。",
        "romaji": "Nihonjin no shokuji wa, kono suujuunen de ookiku kawatta.",
        "de": "Die Ernährung der Japaner hat sich in den letzten Jahrzehnten stark gewandelt."
      },
      {
        "tokens": [
          { "s": "むかし", "g": "früher" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "米", "r": "こめ", "g": "Reis" },
          { "s": "や", "g": "und" },
          { "s": "魚", "r": "さかな", "g": "Fisch" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "中心", "r": "ちゅうしん", "g": "Mittelpunkt" },
          { "s": "とした", "g": "als" },
          { "s": "和食", "r": "わしょく", "g": "japanische Küche" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "多", "r": "おお", "g": "häufig" },
          { "s": "かった", "g": "war" },
          { "s": "。", "p": true }
        ],
        "jp": "むかしは米や魚を中心とした和食が多かった。",
        "romaji": "Mukashi wa kome ya sakana o chuushin to shita washoku ga ookatta.",
        "de": "Früher überwog die japanische Küche mit Reis und Fisch."
      },
      {
        "tokens": [
          { "s": "しかし", "g": "jedoch" },
          { "s": "今", "r": "いま", "g": "heute" },
          { "s": "では", "g": "(Themenpartikel)" },
          { "s": "、", "p": true },
          { "s": "肉", "r": "にく", "g": "Fleisch" },
          { "s": "や", "g": "und" },
          { "s": "油", "r": "あぶら", "g": "Öl" },
          { "s": "の", "g": "(von)" },
          { "s": "多い", "r": "おおい", "g": "viel" },
          { "s": "洋食", "r": "ようしょく", "g": "westliches Essen" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "食べる", "r": "たべる", "g": "essen" },
          { "s": "人", "r": "ひと", "g": "Menschen" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "増", "r": "ふ", "g": "zunehmen" },
          { "s": "えた", "g": "(sind)" },
          { "s": "。", "p": true }
        ],
        "jp": "しかし今では、肉や油の多い洋食を食べる人が増えた。",
        "romaji": "Shikashi ima de wa, niku ya abura no ooi youshoku o taberu hito ga fueta.",
        "de": "Heute aber essen mehr Menschen westliche, fett- und fleischreiche Kost."
      },
      {
        "tokens": [
          { "s": "外食", "r": "がいしょく", "g": "auswärts essen" },
          { "s": "や", "g": "und" },
          { "s": "一人", "r": "ひとり", "g": "allein" },
          { "s": "で", "g": "(von)" },
          { "s": "食べる", "r": "たべる", "g": "essen" },
          { "s": "人", "r": "ひと", "g": "Menschen" },
          { "s": "も", "g": "(Themenpartikel)" },
          { "s": "増", "r": "ふ", "g": "zunehmen" },
          { "s": "えて", "g": "und" },
          { "s": "いる", "g": "sind" },
          { "s": "。", "p": true }
        ],
        "jp": "外食や一人で食べる人も増えている。",
        "romaji": "Gaishoku ya hitori de taberu hito mo fuete iru.",
        "de": "Auch Auswärtsessen und alleine Essen nehmen zu."
      },
      {
        "tokens": [
          { "s": "こうした", "g": "solche" },
          { "s": "変化", "r": "へんか", "g": "Veränderungen" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "、", "p": true },
          { "s": "わたしたち", "g": "unsere" },
          { "s": "の", "g": "(von)" },
          { "s": "健康", "r": "けんこう", "g": "Gesundheit" },
          { "s": "に", "g": "(auf)" },
          { "s": "大きな", "r": "おおきな", "g": "große" },
          { "s": "影響", "r": "えいきょう", "g": "Auswirkung" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "与", "r": "あた", "g": "geben" },
          { "s": "えている", "g": "und" },
          { "s": "。", "p": true }
        ],
        "jp": "こうした変化は、わたしたちの健康に大きな影響を与えている。",
        "romaji": "Koushita henka wa, watashitachi no kenkou ni ookina eikyou o ataete iru.",
        "de": "Solche Veränderungen wirken sich stark auf unsere Gesundheit aus."
      },
      {
        "tokens": [
          { "s": "栄養", "r": "えいよう", "g": "Nährstoffe" },
          { "s": "の", "g": "(von)" },
          { "s": "バランス", "g": "Balance" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "崩", "r": "くず", "g": "aus dem Gleichgewicht geraten" },
          { "s": "れて", "g": "und" },
          { "s": "、", "p": true },
          { "s": "生活", "r": "せいかつ", "g": "Lebens-" },
          { "s": "習慣", "r": "しゅうかん", "g": "gewohnheits-" },
          { "s": "病", "r": "びょう", "g": "krankheit" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "増えている", "r": "ふえている", "g": "zunehmen" },
          { "s": "という", "g": "sogenannte" },
          { "s": "指摘", "r": "してき", "g": "Hinweise" },
          { "s": "も", "g": "auch" },
          { "s": "ある", "g": "gibt es" },
          { "s": "。", "p": true }
        ],
        "jp": "栄養のバランスが崩れて、生活習慣病が増えているという指摘もある。",
        "romaji": "Eiyou no baransu ga kuzurete, seikatsu shuukanbyou ga fuete iru to iu shiteki mo aru.",
        "de": "Manche weisen darauf hin, dass die Nährstoffbalance kippt und Zivilisationskrankheiten zunehmen."
      },
      {
        "tokens": [
          { "s": "だからこそ", "g": "gerade deshalb" },
          { "s": "、", "p": true },
          { "s": "自分", "r": "じぶん", "g": "selbst" },
          { "s": "の", "g": "(von)" },
          { "s": "食べる", "r": "たべる", "g": "essen" },
          { "s": "もの", "g": "Dinge" },
          { "s": "に", "g": "(auf)" },
          { "s": "関心", "r": "かんしん", "g": "Interesse" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "持つ", "r": "もつ", "g": "haben" },
          { "s": "こと", "g": "(das)" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "大切", "r": "たいせつ", "g": "wichtig" },
          { "s": "だ", "g": "ist" },
          { "s": "。", "p": true }
        ],
        "jp": "だからこそ、自分の食べるものに関心を持つことが大切だ。",
        "romaji": "Dakara koso, jibun no taberu mono ni kanshin o motsu koto ga taisetsu da.",
        "de": "Gerade deshalb ist es wichtig, sich für das eigene Essen zu interessieren."
      },
      {
        "tokens": [
          { "s": "伝統", "r": "でんとう", "g": "Tradition" },
          { "s": "と", "g": "und" },
          { "s": "便利さ", "r": "べんりさ", "g": "Bequemlichkeit" },
          { "s": "の", "g": "(von)" },
          { "s": "両方", "r": "りょうほう", "g": "beides" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "生かした", "r": "いかした", "g": "nutzen" },
          { "s": "食", "r": "しょく", "g": "Ernährungs-" },
          { "s": "生活", "r": "せいかつ", "g": "weise" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "望", "r": "のぞ", "g": "wünschen" },
          { "s": "ましい", "g": "wäre wünschenswert" },
          { "s": "。", "p": true }
        ],
        "jp": "伝統と便利さの両方を生かした食生活が望ましい。",
        "romaji": "Dentou to benrisa no ryouhou o ikashita shokuseikatsu ga nozomashii.",
        "de": "Wünschenswert ist eine Ernährung, die Tradition und Bequemlichkeit verbindet."
      }
    ]
  },
  {
    "id": "r-chiiki-no-kasseika",
    "title": "ちいき の かっせいか",
    "titleReading": "ちいきのかっせいか",
    "titleDe": "Die Belebung der Regionen",
    "level": "N2",
    "category": "Gesellschaft",
    "summary": "Ein Essay über die Abwanderung aus ländlichen Regionen und Ideen zu ihrer Wiederbelebung.",
    "sentences": [
      {
        "tokens": [
          { "s": "地方", "r": "ちほう", "g": "ländliche Regionen" },
          { "s": "の", "g": "(von)" },
          { "s": "町", "r": "まち", "g": "Städte" },
          { "s": "や", "g": "und" },
          { "s": "村", "r": "むら", "g": "Dörfer" },
          { "s": "では", "g": "(Themenpartikel)" },
          { "s": "、", "p": true },
          { "s": "人口", "r": "じんこう", "g": "Bevölkerung" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "減り", "r": "へり", "g": "abnehmen" },
          { "s": "続けている", "r": "つづけている", "g": "fortlaufend" },
          { "s": "。", "p": true }
        ],
        "jp": "地方の町や村では、人口が減り続けている。",
        "romaji": "Chihou no machi ya mura de wa, jinkou ga heritsuzukete iru.",
        "de": "In ländlichen Städten und Dörfern sinkt die Bevölkerung weiter."
      },
      {
        "tokens": [
          { "s": "若者", "r": "わかもの", "g": "junge Menschen" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "仕事", "r": "しごと", "g": "Arbeit" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "求", "r": "もと", "g": "suchen" },
          { "s": "めて", "g": "und" },
          { "s": "都市", "r": "とし", "g": "Städte" },
          { "s": "に", "g": "(in)" },
          { "s": "出", "r": "で", "g": "gehen" },
          { "s": "ていく", "g": "und" },
          { "s": "から", "g": "weil" },
          { "s": "だ", "g": "ist" },
          { "s": "。", "p": true }
        ],
        "jp": "若者が仕事を求めて都市に出ていくからだ。",
        "romaji": "Wakamono ga shigoto o motomete toshi ni dete iku kara da.",
        "de": "Das liegt daran, dass junge Leute für Arbeit in die Städte ziehen."
      },
      {
        "tokens": [
          { "s": "その", "g": "dies" },
          { "s": "結果", "r": "けっか", "g": "Folge" },
          { "s": "、", "p": true },
          { "s": "店", "r": "みせ", "g": "Geschäfte" },
          { "s": "や", "g": "und" },
          { "s": "学校", "r": "がっこう", "g": "Schulen" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "なくなり", "g": "verschwinden und" },
          { "s": "、", "p": true },
          { "s": "地域", "r": "ちいき", "g": "Region" },
          { "s": "の", "g": "(von)" },
          { "s": "元気", "r": "げんき", "g": "Lebendigkeit" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "なくなっていく", "g": "verschwindet und" },
          { "s": "。", "p": true }
        ],
        "jp": "その結果、店や学校がなくなり、地域の元気がなくなっていく。",
        "romaji": "Sono kekka, mise ya gakkou ga nakunari, chiiki no genki ga nakunatte iku.",
        "de": "In der Folge verschwinden Läden und Schulen, und die Region erlahmt."
      },
      {
        "tokens": [
          { "s": "しかし", "g": "jedoch" },
          { "s": "、", "p": true },
          { "s": "最近", "r": "さいきん", "g": "in letzter Zeit" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "地方", "r": "ちほう", "g": "ländliche Region" },
          { "s": "の", "g": "(von)" },
          { "s": "魅力", "r": "みりょく", "g": "Reiz" },
          { "s": "に気", "r": "にき", "g": "(an)" },
          { "s": "づく", "g": "bemerken" },
          { "s": "人", "r": "ひと", "g": "Menschen" },
          { "s": "も", "g": "(Themenpartikel)" },
          { "s": "増", "r": "ふ", "g": "zunehmen" },
          { "s": "えて", "g": "und" },
          { "s": "きた", "g": "(sind)" },
          { "s": "。", "p": true }
        ],
        "jp": "しかし、最近は地方の魅力に気づく人も増えてきた。",
        "romaji": "Shikashi, saikin wa chihou no miryoku ni kizuku hito mo fuete kita.",
        "de": "Doch in letzter Zeit erkennen mehr Menschen den Reiz des Landlebens."
      },
      {
        "tokens": [
          { "s": "自然", "r": "しぜん", "g": "Natur" },
          { "s": "の", "g": "(von)" },
          { "s": "中", "r": "なか", "g": "inmitten" },
          { "s": "で", "g": "(in)" },
          { "s": "子育て", "r": "こそだて", "g": "Kinder erziehen" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "したい", "g": "möchten" },
          { "s": "家族", "r": "かぞく", "g": "Familien" },
          { "s": "や", "g": "und" },
          { "s": "、", "p": true },
          { "s": "田舎", "r": "いなか", "g": "Land" },
          { "s": "で", "g": "(auf)" },
          { "s": "働", "r": "はたら", "g": "arbeiten" },
          { "s": "きたい", "g": "möchten" },
          { "s": "若者", "r": "わかもの", "g": "junge Leute" },
          { "s": "も", "g": "auch" },
          { "s": "いる", "g": "gibt es" },
          { "s": "。", "p": true }
        ],
        "jp": "自然の中で子育てをしたい家族や、田舎で働きたい若者もいる。",
        "romaji": "Shizen no naka de kosodate o shitai kazoku ya, inaka de hatarakitai wakamono mo iru.",
        "de": "Es gibt Familien, die in der Natur Kinder erziehen, und Junge, die auf dem Land arbeiten wollen."
      },
      {
        "tokens": [
          { "s": "地域", "r": "ちいき", "g": "Region" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "活かす", "r": "いかす", "g": "beleben" },
          { "s": "ために", "g": "um zu" },
          { "s": "、", "p": true },
          { "s": "インターネット", "g": "Internet" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "使", "r": "つか", "g": "nutzen" },
          { "s": "って", "g": "und" },
          { "s": "特産品", "r": "とくさんひん", "g": "regionale Produkte" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "売る", "r": "うる", "g": "verkaufen" },
          { "s": "試み", "r": "こころみ", "g": "Versuche" },
          { "s": "も", "g": "auch" },
          { "s": "始まっている", "r": "はじまっている", "g": "beginnen" },
          { "s": "。", "p": true }
        ],
        "jp": "地域を活かすために、インターネットを使って特産品を売る試みも始まっている。",
        "romaji": "Chiiki o ikasu tame ni, intaanetto o tsukatte tokusanhin o uru kokoromi mo hajimatte iru.",
        "de": "Zur Belebung der Region beginnen auch Versuche, regionale Produkte online zu verkaufen."
      },
      {
        "tokens": [
          { "s": "地域", "r": "ちいき", "g": "Region" },
          { "s": "の", "g": "(von)" },
          { "s": "伝統", "r": "でんとう", "g": "Traditionen" },
          { "s": "や", "g": "und" },
          { "s": "文化", "r": "ぶんか", "g": "Kultur" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "生かした", "r": "いかした", "g": "nutzen" },
          { "s": "観光", "r": "かんこう", "g": "Tourismus" },
          { "s": "も", "g": "auch" },
          { "s": "注目", "r": "ちゅうもく", "g": "Beachtung" },
          { "s": "されている", "g": "wird und" },
          { "s": "。", "p": true }
        ],
        "jp": "地域の伝統や文化を生かした観光も注目されている。",
        "romaji": "Chiiki no dentou ya bunka o ikashita kankou mo chuumoku sarete iru.",
        "de": "Auch ein Tourismus, der Tradition und Kultur der Region nutzt, findet Beachtung."
      },
      {
        "tokens": [
          { "s": "それぞれ", "g": "jede" },
          { "s": "の", "g": "(von)" },
          { "s": "地域", "r": "ちいき", "g": "Region" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "自分", "r": "じぶん", "g": "eigene" },
          { "s": "らしさ", "g": "Eigenheit" },
          { "s": "を大切に", "r": "をたいせつに", "g": "(Objekt)" },
          { "s": "する", "g": "schätzt" },
          { "s": "ことが", "g": "(das)" },
          { "s": "、", "p": true },
          { "s": "再生への第", "r": "さいせいへのだい", "g": "Wiederbelebung" },
          { "s": "一歩", "r": "いっぽ", "g": "erster Schritt" },
          { "s": "に", "g": "(zu)" },
          { "s": "なる", "g": "wird" },
          { "s": "だろう", "g": "wohl" },
          { "s": "。", "p": true }
        ],
        "jp": "それぞれの地域が自分らしさを大切にすることが、再生への第一歩になるだろう。",
        "romaji": "Sorezore no chiiki ga jibun rashisa o taisetsu ni suru koto ga, saisei e no daiippo ni naru darou.",
        "de": "Wenn jede Region ihre Eigenart pflegt, ist das wohl der erste Schritt zur Wiederbelebung."
      }
    ]
  },
  {
    "id": "r-jouhou-tono-tsukiai",
    "title": "じょうほう との つきあい",
    "titleReading": "じょうほうとのつきあい",
    "titleDe": "Der Umgang mit Information",
    "level": "N2",
    "category": "Medien",
    "summary": "Ein Essay über die Flut an Informationen und die Fähigkeit, Verlässliches zu erkennen.",
    "sentences": [
      {
        "tokens": [
          { "s": "現代", "r": "げんだい", "g": "Gegenwart" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "、", "p": true },
          { "s": "情報", "r": "じょうほう", "g": "Information" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "あふれて", "g": "überquellen und" },
          { "s": "いる", "g": "sind" },
          { "s": "時代", "r": "じだい", "g": "Zeitalter" },
          { "s": "だ", "g": "ist" },
          { "s": "と", "g": "(Objekt)" },
          { "s": "言", "r": "い", "g": "sagen" },
          { "s": "われる", "g": "man" },
          { "s": "。", "p": true }
        ],
        "jp": "現代は、情報があふれている時代だと言われる。",
        "romaji": "Gendai wa, jouhou ga afurete iru jidai da to iwareru.",
        "de": "Man sagt, die Gegenwart sei ein Zeitalter der Informationsflut."
      },
      {
        "tokens": [
          { "s": "スマホ", "g": "Smartphone" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "あれば", "g": "wenn man hat" },
          { "s": "、", "p": true },
          { "s": "だれでも", "g": "jeder" },
          { "s": "いつでも", "g": "jederzeit" },
          { "s": "情報", "r": "じょうほう", "g": "Informationen" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "手", "r": "て", "g": "Hand" },
          { "s": "に", "g": "(in)" },
          { "s": "入", "r": "い", "g": "bekommen" },
          { "s": "れられる", "g": "kann" },
          { "s": "。", "p": true }
        ],
        "jp": "スマホがあれば、だれでもいつでも情報を手に入れられる。",
        "romaji": "Sumaho ga areba, dare demo itsu demo jouhou o te ni irerareru.",
        "de": "Mit einem Smartphone kann jeder jederzeit an Informationen kommen."
      },
      {
        "tokens": [
          { "s": "これ", "g": "dies" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "とても", "g": "sehr" },
          { "s": "便利", "r": "べんり", "g": "praktisch" },
          { "s": "だ", "g": "ist" },
          { "s": "が", "g": "aber" },
          { "s": "、", "p": true },
          { "s": "問題", "r": "もんだい", "g": "Problem" },
          { "s": "も", "g": "auch" },
          { "s": "ある", "g": "gibt es" },
          { "s": "。", "p": true }
        ],
        "jp": "これはとても便利だが、問題もある。",
        "romaji": "Kore wa totemo benri da ga, mondai mo aru.",
        "de": "Das ist sehr praktisch, hat aber auch Probleme."
      },
      {
        "tokens": [
          { "s": "インターネット", "g": "Internet" },
          { "s": "の", "g": "(von)" },
          { "s": "情報", "r": "じょうほう", "g": "Informationen" },
          { "s": "の", "g": "(von)" },
          { "s": "中には", "r": "なかには", "g": "darunter" },
          { "s": "、", "p": true },
          { "s": "正", "r": "ただ", "g": "richtig" },
          { "s": "しくない", "g": "nicht" },
          { "s": "もの", "g": "Dinge" },
          { "s": "も", "g": "auch" },
          { "s": "多く", "r": "おおく", "g": "viele" },
          { "s": "含", "r": "ふく", "g": "enthalten" },
          { "s": "まれている", "g": "sind und" },
          { "s": "。", "p": true }
        ],
        "jp": "インターネットの情報の中には、正しくないものも多く含まれている。",
        "romaji": "Intaanetto no jouhou no naka ni wa, tadashikunai mono mo ooku fukumarete iru.",
        "de": "Unter den Informationen im Internet ist auch viel Falsches."
      },
      {
        "tokens": [
          { "s": "うそ", "g": "Lüge" },
          { "s": "の", "g": "(von)" },
          { "s": "情報", "r": "じょうほう", "g": "Information" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "本当", "r": "ほんとう", "g": "Wahrheit" },
          { "s": "の", "g": "(von)" },
          { "s": "話", "r": "はなし", "g": "Geschichte" },
          { "s": "の", "g": "(von)" },
          { "s": "ように", "g": "wie" },
          { "s": "広がる", "r": "ひろがる", "g": "sich verbreiten" },
          { "s": "こと", "g": "Fälle" },
          { "s": "も", "g": "auch" },
          { "s": "ある", "g": "gibt es" },
          { "s": "。", "p": true }
        ],
        "jp": "うその情報が本当の話のように広がることもある。",
        "romaji": "Uso no jouhou ga hontou no hanashi no you ni hirogaru koto mo aru.",
        "de": "Manchmal verbreiten sich Falschmeldungen wie wahre Geschichten."
      },
      {
        "tokens": [
          { "s": "だから", "g": "deshalb" },
          { "s": "、", "p": true },
          { "s": "情報", "r": "じょうほう", "g": "Information" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "そのまま", "g": "einfach so" },
          { "s": "信じるの", "r": "しんじるの", "g": "glauben" },
          { "s": "では", "g": "(Themenpartikel)" },
          { "s": "なく", "g": "nicht" },
          { "s": "、", "p": true },
          { "s": "自分", "r": "じぶん", "g": "selbst" },
          { "s": "で", "g": "(von)" },
          { "s": "確かめる", "r": "たしかめる", "g": "prüfen" },
          { "s": "力", "r": "ちから", "g": "Fähigkeit" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "必要", "r": "ひつよう", "g": "nötig" },
          { "s": "だ", "g": "ist" },
          { "s": "。", "p": true }
        ],
        "jp": "だから、情報をそのまま信じるのではなく、自分で確かめる力が必要だ。",
        "romaji": "Dakara, jouhou o sono mama shinjiru no de wa naku, jibun de tashikameru chikara ga hitsuyou da.",
        "de": "Deshalb braucht man die Fähigkeit, nicht alles zu glauben, sondern selbst zu prüfen."
      },
      {
        "tokens": [
          { "s": "いくつか", "g": "mehrere" },
          { "s": "の", "g": "(von)" },
          { "s": "情報", "r": "じょうほう", "g": "Quellen" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "比", "r": "くら", "g": "vergleichen" },
          { "s": "べたり", "g": "etwa" },
          { "s": "、", "p": true },
          { "s": "だれ", "g": "wer" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "書いたか", "r": "かいたか", "g": "geschrieben" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "調", "r": "しら", "g": "prüfen" },
          { "s": "べたりする", "g": "etwa" },
          { "s": "こと", "g": "(das)" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "大切", "r": "たいせつ", "g": "wichtig" },
          { "s": "だ", "g": "ist" },
          { "s": "。", "p": true }
        ],
        "jp": "いくつかの情報を比べたり、だれが書いたかを調べたりすることが大切だ。",
        "romaji": "Ikutsu ka no jouhou o kurabetari, dare ga kaita ka o shirabetari suru koto ga taisetsu da.",
        "de": "Wichtig ist, mehrere Quellen zu vergleichen und zu prüfen, wer etwas geschrieben hat."
      },
      {
        "tokens": [
          { "s": "情報", "r": "じょうほう", "g": "Information" },
          { "s": "に振り", "r": "にふり", "g": "(von)" },
          { "s": "回されるの", "r": "まわされるの", "g": "sich herumtreiben lassen" },
          { "s": "では", "g": "(Themenpartikel)" },
          { "s": "なく", "g": "nicht" },
          { "s": "、", "p": true },
          { "s": "上手", "r": "じょうず", "g": "geschickt" },
          { "s": "に", "g": "(Adverb)" },
          { "s": "付き合う", "r": "つきあう", "g": "umgehen" },
          { "s": "力", "r": "ちから", "g": "Fähigkeit" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "身に", "r": "みに", "g": "sich aneignen" },
          { "s": "つけたい", "g": "möchte" },
          { "s": "。", "p": true }
        ],
        "jp": "情報に振り回されるのではなく、上手に付き合う力を身につけたい。",
        "romaji": "Jouhou ni furimawasareru no de wa naku, jouzu ni tsukiau chikara o mi ni tsuketai.",
        "de": "Statt sich von Information treiben zu lassen, will ich lernen, klug mit ihr umzugehen."
      }
    ]
  },
  {
    "id": "r-jinkou-chinou-no-rinri",
    "title": "人工知能 と 倫理",
    "titleReading": "じんこうちのうとりんり",
    "titleDe": "Künstliche Intelligenz und Ethik",
    "level": "N1",
    "category": "Ethik",
    "summary": "Ein anspruchsvoller Essay über die ethischen Fragen, die mit der Verbreitung von KI einhergehen.",
    "sentences": [
      {
        "tokens": [
          { "s": "人工知能", "r": "じんこうちのう", "g": "künstliche Intelligenz" },
          { "s": "の", "g": "(von)" },
          { "s": "発達", "r": "はったつ", "g": "Entwicklung" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "、", "p": true },
          { "s": "わたしたち", "g": "unser" },
          { "s": "の", "g": "(von)" },
          { "s": "生活", "r": "せいかつ", "g": "Leben" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "便利", "r": "べんり", "g": "bequem" },
          { "s": "にする", "g": "(Adverb)" },
          { "s": "一方で", "r": "いっぽうで", "g": "andererseits" },
          { "s": "、", "p": true },
          { "s": "新たな", "r": "あたらたな", "g": "neue" },
          { "s": "問い", "r": "とい", "g": "Fragen" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "わたしたちに突き", "r": "わたしたちにつき", "g": "uns" },
          { "s": "付", "r": "つ", "g": "vor Augen führen" },
          { "s": "けている", "g": "und" },
          { "s": "。", "p": true }
        ],
        "jp": "人工知能の発達は、わたしたちの生活を便利にする一方で、新たな問いをわたしたちに突き付けている。",
        "romaji": "Jinkou chinou no hattatsu wa, watashitachi no seikatsu o benri ni suru ippou de, aratana toi o watashitachi ni tsukitsukete iru.",
        "de": "Die Entwicklung der KI macht unser Leben bequemer, stellt uns aber zugleich vor neue Fragen."
      },
      {
        "tokens": [
          { "s": "例えば", "r": "たとえば", "g": "zum Beispiel" },
          { "s": "、", "p": true },
          { "s": "自動", "r": "じどう", "g": "automatisch" },
          { "s": "で", "g": "(von)" },
          { "s": "走る", "r": "はしる", "g": "fahren" },
          { "s": "車", "r": "くるま", "g": "Autos" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "事故", "r": "じこ", "g": "Unfall" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "起こした", "r": "おこした", "g": "verursachen" },
          { "s": "時", "r": "とき", "g": "Fall" },
          { "s": "、", "p": true },
          { "s": "だれ", "g": "wer" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "責任", "r": "せきにん", "g": "Verantwortung" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "負うの", "r": "おうの", "g": "tragen" },
          { "s": "だろうか", "g": "wohl" },
          { "s": "。", "p": true }
        ],
        "jp": "例えば、自動で走る車が事故を起こした時、だれが責任を負うのだろうか。",
        "romaji": "Tatoeba, jidou de hashiru kuruma ga jiko o okoshita toki, dare ga sekinin o ou no darou ka.",
        "de": "Wer etwa trägt die Verantwortung, wenn ein selbstfahrendes Auto einen Unfall verursacht?"
      },
      {
        "tokens": [
          { "s": "機械", "r": "きかい", "g": "Maschine" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "下す", "r": "くだす", "g": "treffen" },
          { "s": "判断", "r": "はんだん", "g": "Entscheidung" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "、", "p": true },
          { "s": "本当", "r": "ほんとう", "g": "wirklich" },
          { "s": "に", "g": "(Adverb)" },
          { "s": "公平", "r": "こうへい", "g": "fair" },
          { "s": "だ", "g": "ist" },
          { "s": "と", "g": "(Objekt)" },
          { "s": "言い", "r": "いい", "g": "sagen" },
          { "s": "切", "r": "き", "g": "mit Bestimmtheit" },
          { "s": "れるの", "g": "können" },
          { "s": "だろうか", "g": "wohl" },
          { "s": "。", "p": true }
        ],
        "jp": "機械が下す判断は、本当に公平だと言い切れるのだろうか。",
        "romaji": "Kikai ga kudasu handan wa, hontou ni kouhei da to iikireru no darou ka.",
        "de": "Lässt sich wirklich behaupten, dass die Urteile einer Maschine fair sind?"
      },
      {
        "tokens": [
          { "s": "人工知能", "r": "じんこうちのう", "g": "KI" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "過去", "r": "かこ", "g": "Vergangenheit" },
          { "s": "の", "g": "(von)" },
          { "s": "膨大", "r": "ぼうだい", "g": "riesig" },
          { "s": "な", "g": "(Adjektiv)" },
          { "s": "データ", "g": "Daten" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "学ぶ", "r": "まなぶ", "g": "lernen" },
          { "s": "が", "g": "aber" },
          { "s": "、", "p": true },
          { "s": "その", "g": "diese" },
          { "s": "データ", "g": "Daten" },
          { "s": "に", "g": "(von)" },
          { "s": "偏り", "r": "かたより", "g": "Verzerrung" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "あれば", "g": "wenn es gibt" },
          { "s": "、", "p": true },
          { "s": "判断", "r": "はんだん", "g": "Urteile" },
          { "s": "も", "g": "auch" },
          { "s": "偏", "r": "かたよ", "g": "sich verzerren" },
          { "s": "ってしまう", "g": "und" },
          { "s": "。", "p": true }
        ],
        "jp": "人工知能は過去の膨大なデータを学ぶが、そのデータに偏りがあれば、判断も偏ってしまう。",
        "romaji": "Jinkou chinou wa kako no boudai na deeta o manabu ga, sono deeta ni katayori ga areba, handan mo katayotte shimau.",
        "de": "KI lernt aus gewaltigen Datenmengen; sind diese verzerrt, verzerren sich auch ihre Urteile."
      },
      {
        "tokens": [
          { "s": "つまり", "g": "das heißt" },
          { "s": "、", "p": true },
          { "s": "人間", "r": "にんげん", "g": "Mensch" },
          { "s": "の", "g": "(von)" },
          { "s": "持つ", "r": "もつ", "g": "tragen" },
          { "s": "偏見", "r": "へんけん", "g": "Vorurteile" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "、", "p": true },
          { "s": "そのまま", "g": "unverändert" },
          { "s": "技術", "r": "ぎじゅつ", "g": "Technik" },
          { "s": "の", "g": "(von)" },
          { "s": "中に", "r": "なかに", "g": "in" },
          { "s": "入り込む", "r": "はいりこむ", "g": "eindringen" },
          { "s": "恐れ", "r": "おそれ", "g": "Gefahr" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "ある", "g": "besteht" },
          { "s": "。", "p": true }
        ],
        "jp": "つまり、人間の持つ偏見が、そのまま技術の中に入り込む恐れがある。",
        "romaji": "Tsumari, ningen no motsu henken ga, sono mama gijutsu no naka ni hairikomu osore ga aru.",
        "de": "Mit anderen Worten: Es droht, dass menschliche Vorurteile direkt in die Technik einfließen."
      },
      {
        "tokens": [
          { "s": "だからこそ", "g": "gerade deshalb" },
          { "s": "、", "p": true },
          { "s": "技術", "r": "ぎじゅつ", "g": "Technik" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "作る", "r": "つくる", "g": "schaffen" },
          { "s": "側", "r": "がわ", "g": "Seite" },
          { "s": "の", "g": "(von)" },
          { "s": "責任", "r": "せきにん", "g": "Verantwortung" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "重い", "r": "おもい", "g": "schwer" },
          { "s": "。", "p": true }
        ],
        "jp": "だからこそ、技術を作る側の責任は重い。",
        "romaji": "Dakara koso, gijutsu o tsukuru gawa no sekinin wa omoi.",
        "de": "Gerade deshalb ist die Verantwortung der Entwickler groß."
      },
      {
        "tokens": [
          { "s": "効率", "r": "こうりつ", "g": "Effizienz" },
          { "s": "や", "g": "und" },
          { "s": "利益", "r": "りえき", "g": "Profit" },
          { "s": "だけ", "g": "nur" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "追い求めるの", "r": "おいもとめるの", "g": "verfolgen" },
          { "s": "では", "g": "(Themenpartikel)" },
          { "s": "なく", "g": "nicht" },
          { "s": "、", "p": true },
          { "s": "人間", "r": "にんげん", "g": "Mensch" },
          { "s": "の", "g": "(von)" },
          { "s": "尊厳", "r": "そんげん", "g": "Würde" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "どう", "g": "wie" },
          { "s": "守るか", "r": "まもるか", "g": "schützen" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "問", "r": "と", "g": "fragen" },
          { "s": "わなければならない", "g": "muss man" },
          { "s": "。", "p": true }
        ],
        "jp": "効率や利益だけを追い求めるのではなく、人間の尊厳をどう守るかを問わなければならない。",
        "romaji": "Kouritsu ya rieki dake o oimotomeru no de wa naku, ningen no songen o dou mamoru ka o towanakereba naranai.",
        "de": "Man darf nicht nur Effizienz und Profit verfolgen, sondern muss fragen, wie die Menschenwürde zu wahren ist."
      },
      {
        "tokens": [
          { "s": "技術", "r": "ぎじゅつ", "g": "Technik" },
          { "s": "そのもの", "g": "selbst" },
          { "s": "に", "g": "(an sich)" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "善悪", "r": "ぜんあく", "g": "Gut und Böse" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "ない", "g": "hat nicht" },
          { "s": "。", "p": true }
        ],
        "jp": "技術そのものには善悪がない。",
        "romaji": "Gijutsu sono mono ni wa zen'aku ga nai.",
        "de": "Die Technik selbst kennt kein Gut und Böse."
      },
      {
        "tokens": [
          { "s": "それ", "g": "sie" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "どう", "g": "wie" },
          { "s": "使うか", "r": "つかうか", "g": "nutzen" },
          { "s": "、", "p": true },
          { "s": "その", "g": "dieses" },
          { "s": "問い", "r": "とい", "g": "Fragen" },
          { "s": "こそ", "g": "gerade" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "、", "p": true },
          { "s": "わたしたち", "g": "wir" },
          { "s": "人間", "r": "にんげん", "g": "Menschen" },
          { "s": "に", "g": "(an)" },
          { "s": "残された", "r": "のこされた", "g": "übrig bleiben" },
          { "s": "課題なの", "r": "かだいなの", "g": "Aufgabe" },
          { "s": "だ", "g": "ist" },
          { "s": "。", "p": true }
        ],
        "jp": "それをどう使うか、その問いこそが、わたしたち人間に残された課題なのだ。",
        "romaji": "Sore o dou tsukau ka, sono toi koso ga, watashitachi ningen ni nokosareta kadai na no da.",
        "de": "Wie wir sie nutzen — eben diese Frage ist die Aufgabe, die uns Menschen bleibt."
      }
    ]
  },
  {
    "id": "r-kioku-to-rekishi",
    "title": "記憶 と 歴史",
    "titleReading": "きおくとれきし",
    "titleDe": "Erinnerung und Geschichte",
    "level": "N1",
    "category": "Geschichte",
    "summary": "Ein reflektierender Essay über den Unterschied zwischen persönlicher Erinnerung und überlieferter Geschichte.",
    "sentences": [
      {
        "tokens": [
          { "s": "歴史", "r": "れきし", "g": "Geschichte" },
          { "s": "と", "g": "und" },
          { "s": "記憶", "r": "きおく", "g": "Erinnerung" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "、", "p": true },
          { "s": "似", "r": "に", "g": "ähneln" },
          { "s": "ている", "g": "und" },
          { "s": "ようで", "g": "scheinen, doch" },
          { "s": "、", "p": true },
          { "s": "実", "r": "じつ", "g": "tatsächlich" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "異なる", "r": "ことなる", "g": "sich unterscheiden" },
          { "s": "もの", "g": "Dinge" },
          { "s": "だ", "g": "sind" },
          { "s": "。", "p": true }
        ],
        "jp": "歴史と記憶は、似ているようで、実は異なるものだ。",
        "romaji": "Rekishi to kioku wa, nite iru you de, jitsu wa kotonaru mono da.",
        "de": "Geschichte und Erinnerung scheinen ähnlich, sind in Wahrheit aber verschieden."
      },
      {
        "tokens": [
          { "s": "記憶", "r": "きおく", "g": "Erinnerung" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "個人", "r": "こじん", "g": "Einzelne" },
          { "s": "の", "g": "(von)" },
          { "s": "心", "r": "こころ", "g": "Herz" },
          { "s": "の", "g": "(von)" },
          { "s": "中に", "r": "なかに", "g": "in" },
          { "s": "生き", "r": "いき", "g": "leben" },
          { "s": "、", "p": true },
          { "s": "しばしば", "g": "oft" },
          { "s": "感情", "r": "かんじょう", "g": "Gefühle" },
          { "s": "と", "g": "mit" },
          { "s": "ともに", "g": "zusammen" },
          { "s": "語られる", "r": "かたられる", "g": "erzählt werden" },
          { "s": "。", "p": true }
        ],
        "jp": "記憶は個人の心の中に生き、しばしば感情とともに語られる。",
        "romaji": "Kioku wa kojin no kokoro no naka ni iki, shibashiba kanjou to tomo ni katarareru.",
        "de": "Erinnerung lebt im Herzen des Einzelnen und wird oft mit Gefühl erzählt."
      },
      {
        "tokens": [
          { "s": "一方", "r": "いっぽう", "g": "andererseits" },
          { "s": "、", "p": true },
          { "s": "歴史", "r": "れきし", "g": "Geschichte" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "多くの", "r": "おおくの", "g": "viele" },
          { "s": "記録", "r": "きろく", "g": "Aufzeichnungen" },
          { "s": "や", "g": "und" },
          { "s": "証言", "r": "しょうげん", "g": "Zeugnisse" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "集め", "r": "あつめ", "g": "sammeln" },
          { "s": "、", "p": true },
          { "s": "客観的", "r": "きゃっかんてき", "g": "objektiv" },
          { "s": "に組み", "r": "にくみ", "g": "(Adverb)" },
          { "s": "立てようと", "r": "たてようと", "g": "aufbauen" },
          { "s": "する", "g": "versucht" },
          { "s": "。", "p": true }
        ],
        "jp": "一方、歴史は多くの記録や証言を集め、客観的に組み立てようとする。",
        "romaji": "Ippou, rekishi wa ooku no kiroku ya shougen o atsume, kyakkanteki ni kumitateyou to suru.",
        "de": "Geschichte dagegen sammelt viele Aufzeichnungen und Zeugnisse und sucht sie objektiv zu ordnen."
      },
      {
        "tokens": [
          { "s": "しかし", "g": "jedoch" },
          { "s": "、", "p": true },
          { "s": "歴史", "r": "れきし", "g": "Geschichte" },
          { "s": "も", "g": "auch" },
          { "s": "結局", "r": "けっきょく", "g": "letztlich" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "人間", "r": "にんげん", "g": "Mensch" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "書くもので", "r": "かくもので", "g": "schreiben" },
          { "s": "ある", "g": "ist" },
          { "s": "。", "p": true }
        ],
        "jp": "しかし、歴史も結局は人間が書くものである。",
        "romaji": "Shikashi, rekishi mo kekkyoku wa ningen ga kaku mono de aru.",
        "de": "Doch auch Geschichte wird letztlich von Menschen geschrieben."
      },
      {
        "tokens": [
          { "s": "どの", "g": "welche" },
          { "s": "事実", "r": "じじつ", "g": "Tatsachen" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "選び", "r": "えらび", "g": "auswählen" },
          { "s": "、", "p": true },
          { "s": "どう", "g": "wie" },
          { "s": "解釈するか", "r": "かいしゃくするか", "g": "deuten" },
          { "s": "に", "g": "(bei)" },
          { "s": "よって", "g": "je" },
          { "s": "、", "p": true },
          { "s": "描かれる", "r": "えがかれる", "g": "gezeichnet werden" },
          { "s": "姿", "r": "すがた", "g": "Bild" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "変", "r": "か", "g": "sich ändern" },
          { "s": "わってくる", "g": "und" },
          { "s": "。", "p": true }
        ],
        "jp": "どの事実を選び、どう解釈するかによって、描かれる姿は変わってくる。",
        "romaji": "Dono jijitsu o erabi, dou kaishaku suru ka ni yotte, egakareru sugata wa kawatte kuru.",
        "de": "Je nachdem, welche Fakten man wählt und wie man sie deutet, ändert sich das Bild."
      },
      {
        "tokens": [
          { "s": "つまり", "g": "das heißt" },
          { "s": "、", "p": true },
          { "s": "完全", "r": "かんぜん", "g": "vollkommen" },
          { "s": "に", "g": "(Adverb)" },
          { "s": "中立", "r": "ちゅうりつ", "g": "neutral" },
          { "s": "な", "g": "(Adjektiv)" },
          { "s": "歴史", "r": "れきし", "g": "Geschichte" },
          { "s": "など", "g": "etwa" },
          { "s": "存在しないの", "r": "そんざいしないの", "g": "existieren" },
          { "s": "かもしれない", "g": "vielleicht" },
          { "s": "。", "p": true }
        ],
        "jp": "つまり、完全に中立な歴史など存在しないのかもしれない。",
        "romaji": "Tsumari, kanzen ni chuuritsu na rekishi nado sonzai shinai no kamoshirenai.",
        "de": "Vielleicht existiert also gar keine völlig neutrale Geschichte."
      },
      {
        "tokens": [
          { "s": "だからこそ", "g": "gerade deshalb" },
          { "s": "、", "p": true },
          { "s": "わたしたち", "g": "wir" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "一つ", "r": "ひとつ", "g": "eine" },
          { "s": "の", "g": "(von)" },
          { "s": "見方", "r": "みかた", "g": "Sichtweise" },
          { "s": "だけ", "g": "nur" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "信じるの", "r": "しんじるの", "g": "glauben" },
          { "s": "では", "g": "(Themenpartikel)" },
          { "s": "なく", "g": "nicht" },
          { "s": "、", "p": true },
          { "s": "複数", "r": "ふくすう", "g": "mehrere" },
          { "s": "の", "g": "(von)" },
          { "s": "声", "r": "こえ", "g": "Stimmen" },
          { "s": "に", "g": "(auf)" },
          { "s": "耳", "r": "みみ", "g": "Ohr" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "傾ける", "r": "かたむける", "g": "lauschen" },
          { "s": "必要", "r": "ひつよう", "g": "nötig" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "ある", "g": "ist" },
          { "s": "。", "p": true }
        ],
        "jp": "だからこそ、わたしたちは一つの見方だけを信じるのではなく、複数の声に耳を傾ける必要がある。",
        "romaji": "Dakara koso, watashitachi wa hitotsu no mikata dake o shinjiru no de wa naku, fukusuu no koe ni mimi o katamukeru hitsuyou ga aru.",
        "de": "Gerade deshalb sollten wir nicht nur einer Sicht glauben, sondern mehreren Stimmen lauschen."
      },
      {
        "tokens": [
          { "s": "過去", "r": "かこ", "g": "Vergangenheit" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "問い", "r": "とい", "g": "befragen" },
          { "s": "直す", "r": "なおす", "g": "erneut" },
          { "s": "こと", "g": "(das)" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "、", "p": true },
          { "s": "現在", "r": "げんざい", "g": "Gegenwart" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "理解する", "r": "りかいする", "g": "verstehen" },
          { "s": "こと", "g": "(das)" },
          { "s": "に", "g": "(mit)" },
          { "s": "も", "g": "auch" },
          { "s": "つながっている", "g": "verbunden ist" },
          { "s": "。", "p": true }
        ],
        "jp": "過去を問い直すことは、現在を理解することにもつながっている。",
        "romaji": "Kako o toinaosu koto wa, genzai o rikai suru koto ni mo tsunagatte iru.",
        "de": "Die Vergangenheit neu zu befragen, hängt auch damit zusammen, die Gegenwart zu verstehen."
      },
      {
        "tokens": [
          { "s": "歴史", "r": "れきし", "g": "Geschichte" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "学ぶと", "r": "まなぶと", "g": "lernen" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "、", "p": true },
          { "s": "過去", "r": "かこ", "g": "Vergangenheit" },
          { "s": "の", "g": "(von)" },
          { "s": "中に", "r": "なかに", "g": "in" },
          { "s": "未来への", "r": "みらいへの", "g": "Zukunft" },
          { "s": "ヒント", "g": "Hinweise" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "探す", "r": "さがす", "g": "suchen" },
          { "s": "営みなの", "r": "いとなみなの", "g": "Tätigkeit" },
          { "s": "だろう", "g": "wohl" },
          { "s": "。", "p": true }
        ],
        "jp": "歴史を学ぶとは、過去の中に未来へのヒントを探す営みなのだろう。",
        "romaji": "Rekishi o manabu to wa, kako no naka ni mirai e no hinto o sagasu itonami na no darou.",
        "de": "Geschichte zu lernen heißt wohl, in der Vergangenheit nach Hinweisen für die Zukunft zu suchen."
      }
    ]
  },
  {
    "id": "r-seibutsu-tayousei",
    "title": "生物 多様性",
    "titleReading": "せいぶつたようせい",
    "titleDe": "Die Vielfalt des Lebens",
    "level": "N1",
    "category": "Wissenschaft",
    "summary": "Ein wissenschaftlich gefärbter Essay über die Bedeutung der biologischen Vielfalt für das Gleichgewicht der Natur.",
    "sentences": [
      {
        "tokens": [
          { "s": "この", "g": "dieser" },
          { "s": "地球", "r": "ちきゅう", "g": "Erde" },
          { "s": "に", "g": "(auf)" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "、", "p": true },
          { "s": "数え", "r": "かぞえ", "g": "zählen" },
          { "s": "切", "r": "き", "g": "vollständig" },
          { "s": "れない", "g": "nicht" },
          { "s": "ほど", "g": "so viele" },
          { "s": "の", "g": "(von)" },
          { "s": "生き", "r": "いき", "g": "Lebe-" },
          { "s": "物", "r": "もの", "g": "wesen" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "暮らしている", "r": "くらしている", "g": "leben" },
          { "s": "。", "p": true }
        ],
        "jp": "この地球には、数え切れないほどの生き物が暮らしている。",
        "romaji": "Kono chikyuu ni wa, kazoekirenai hodo no ikimono ga kurashite iru.",
        "de": "Auf dieser Erde leben unzählige Lebewesen."
      },
      {
        "tokens": [
          { "s": "それぞれ", "g": "jedes" },
          { "s": "の", "g": "(von)" },
          { "s": "生き", "r": "いき", "g": "Lebe-" },
          { "s": "物", "r": "もの", "g": "wesen" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "、", "p": true },
          { "s": "たがいに", "g": "einander" },
          { "s": "支え合い", "r": "ささえあい", "g": "stützen" },
          { "s": "ながら", "g": "während" },
          { "s": "、", "p": true },
          { "s": "一つ", "r": "ひとつ", "g": "ein" },
          { "s": "の", "g": "(von)" },
          { "s": "大きな", "r": "おおきな", "g": "große" },
          { "s": "仕組み", "r": "しくみ", "g": "Gefüge" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "作", "r": "つく", "g": "bilden" },
          { "s": "っている", "g": "und" },
          { "s": "。", "p": true }
        ],
        "jp": "それぞれの生き物は、たがいに支え合いながら、一つの大きな仕組みを作っている。",
        "romaji": "Sorezore no ikimono wa, tagai ni sasaeai nagara, hitotsu no ookina shikumi o tsukutte iru.",
        "de": "Jedes Lebewesen stützt das andere und bildet so ein großes Gefüge."
      },
      {
        "tokens": [
          { "s": "これ", "g": "das" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "生物", "r": "せいぶつ", "g": "biologische" },
          { "s": "多様性と", "r": "たようせいと", "g": "Vielfalt" },
          { "s": "呼ぶ", "r": "よぶ", "g": "nennen" },
          { "s": "。", "p": true }
        ],
        "jp": "これを生物多様性と呼ぶ。",
        "romaji": "Kore o seibutsu tayousei to yobu.",
        "de": "Dies nennt man biologische Vielfalt."
      },
      {
        "tokens": [
          { "s": "一つ", "r": "ひとつ", "g": "eine" },
          { "s": "の", "g": "(von)" },
          { "s": "種", "r": "しゅ", "g": "Art" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "姿", "r": "すがた", "g": "Erscheinung" },
          { "s": "を消", "r": "をけ", "g": "(Objekt)" },
          { "s": "す", "g": "verschwinden" },
          { "s": "と", "g": "wenn" },
          { "s": "、", "p": true },
          { "s": "それ", "g": "das" },
          { "s": "と", "g": "damit" },
          { "s": "関わる", "r": "かかわる", "g": "verbunden" },
          { "s": "他", "r": "ほか", "g": "andere" },
          { "s": "の", "g": "(von)" },
          { "s": "生き", "r": "いき", "g": "Lebe-" },
          { "s": "物", "r": "もの", "g": "wesen" },
          { "s": "に", "g": "(auf)" },
          { "s": "も", "g": "auch" },
          { "s": "影響", "r": "えいきょう", "g": "Auswirkung" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "広", "r": "ひろ", "g": "sich ausbreiten" },
          { "s": "がっていく", "g": "und" },
          { "s": "。", "p": true }
        ],
        "jp": "一つの種が姿を消すと、それと関わる他の生き物にも影響が広がっていく。",
        "romaji": "Hitotsu no shu ga sugata o kesu to, sore to kakawaru hoka no ikimono ni mo eikyou ga hirogatte iku.",
        "de": "Verschwindet eine Art, breitet sich die Wirkung auch auf die mit ihr verbundenen Arten aus."
      },
      {
        "tokens": [
          { "s": "しかし", "g": "jedoch" },
          { "s": "、", "p": true },
          { "s": "人間", "r": "にんげん", "g": "Mensch" },
          { "s": "の", "g": "(von)" },
          { "s": "活動", "r": "かつどう", "g": "Aktivität" },
          { "s": "によって", "g": "(durch)" },
          { "s": "、", "p": true },
          { "s": "多くの", "r": "おおくの", "g": "viele" },
          { "s": "生き", "r": "いき", "g": "Lebe-" },
          { "s": "物", "r": "もの", "g": "wesen" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "急速", "r": "きゅうそく", "g": "rasch" },
          { "s": "に", "g": "(Adverb)" },
          { "s": "減", "r": "へ", "g": "abnehmen" },
          { "s": "っている", "g": "und" },
          { "s": "。", "p": true }
        ],
        "jp": "しかし、人間の活動によって、多くの生き物が急速に減っている。",
        "romaji": "Shikashi, ningen no katsudou ni yotte, ooku no ikimono ga kyuusoku ni hette iru.",
        "de": "Doch durch menschliches Handeln nehmen viele Lebewesen rasch ab."
      },
      {
        "tokens": [
          { "s": "森林", "r": "しんりん", "g": "Wälder" },
          { "s": "の", "g": "(von)" },
          { "s": "破壊", "r": "はかい", "g": "Zerstörung" },
          { "s": "や", "g": "und" },
          { "s": "気候", "r": "きこう", "g": "Klima" },
          { "s": "の", "g": "(von)" },
          { "s": "変動", "r": "へんどう", "g": "Wandel" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "、", "p": true },
          { "s": "生き", "r": "いき", "g": "Lebe-" },
          { "s": "物", "r": "もの", "g": "wesen" },
          { "s": "の", "g": "(von)" },
          { "s": "住む", "r": "すむ", "g": "Wohn-" },
          { "s": "場所", "r": "ばしょ", "g": "raum" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "奪", "r": "うば", "g": "rauben" },
          { "s": "っているの", "g": "und" },
          { "s": "だ", "g": "ist" },
          { "s": "。", "p": true }
        ],
        "jp": "森林の破壊や気候の変動が、生き物の住む場所を奪っているのだ。",
        "romaji": "Shinrin no hakai ya kikou no hendou ga, ikimono no sumu basho o ubatte iru no da.",
        "de": "Waldzerstörung und Klimawandel rauben den Lebewesen ihren Lebensraum."
      },
      {
        "tokens": [
          { "s": "生物", "r": "せいぶつ", "g": "biologische" },
          { "s": "多様性", "r": "たようせい", "g": "Vielfalt" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "守る", "r": "まもる", "g": "schützen" },
          { "s": "こと", "g": "(das)" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "、", "p": true },
          { "s": "単に", "r": "たんに", "g": "bloß" },
          { "s": "自然", "r": "しぜん", "g": "Natur" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "守る", "r": "まもる", "g": "schützen" },
          { "s": "だけ", "g": "nur" },
          { "s": "の", "g": "(von)" },
          { "s": "話", "r": "はなし", "g": "Sache" },
          { "s": "では", "g": "(Themenpartikel)" },
          { "s": "ない", "g": "ist nicht" },
          { "s": "。", "p": true }
        ],
        "jp": "生物多様性を守ることは、単に自然を守るだけの話ではない。",
        "romaji": "Seibutsu tayousei o mamoru koto wa, tan ni shizen o mamoru dake no hanashi de wa nai.",
        "de": "Die Vielfalt zu schützen ist nicht bloß eine Frage des Naturschutzes."
      },
      {
        "tokens": [
          { "s": "わたしたち", "g": "wir" },
          { "s": "人間", "r": "にんげん", "g": "Menschen" },
          { "s": "の", "g": "(von)" },
          { "s": "食", "r": "しょく", "g": "Nahrung" },
          { "s": "や", "g": "und" },
          { "s": "健康", "r": "けんこう", "g": "Gesundheit" },
          { "s": "も", "g": "auch" },
          { "s": "、", "p": true },
          { "s": "豊かな", "r": "ゆたかな", "g": "reich" },
          { "s": "自然", "r": "しぜん", "g": "Natur" },
          { "s": "に", "g": "(von)" },
          { "s": "支えられて", "r": "ささえられて", "g": "getragen" },
          { "s": "いる", "g": "sind" },
          { "s": "からだ", "g": "denn" },
          { "s": "。", "p": true }
        ],
        "jp": "わたしたち人間の食や健康も、豊かな自然に支えられているからだ。",
        "romaji": "Watashitachi ningen no shoku ya kenkou mo, yutaka na shizen ni sasaerarete iru kara da.",
        "de": "Denn auch unsere Nahrung und Gesundheit ruhen auf einer reichen Natur."
      },
      {
        "tokens": [
          { "s": "未来", "r": "みらい", "g": "Zukunft" },
          { "s": "の", "g": "(von)" },
          { "s": "世代", "r": "せだい", "g": "Generationen" },
          { "s": "に", "g": "(an)" },
          { "s": "この", "g": "dieses" },
          { "s": "豊かさ", "r": "ゆたかさ", "g": "reiche" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "残す", "r": "のこす", "g": "hinterlassen" },
          { "s": "こと", "g": "(das)" },
          { "s": "こそ", "g": "gerade" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "、", "p": true },
          { "s": "今", "r": "いま", "g": "heute" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "生きる", "r": "いきる", "g": "leben" },
          { "s": "わたしたち", "g": "uns" },
          { "s": "の", "g": "(von)" },
          { "s": "務め", "r": "つとめ", "g": "Pflicht" },
          { "s": "だ", "g": "ist" },
          { "s": "ろう", "g": "wohl" },
          { "s": "。", "p": true }
        ],
        "jp": "未来の世代にこの豊かさを残すことこそが、今を生きるわたしたちの務めだろう。",
        "romaji": "Mirai no sedai ni kono yutakasa o nokosu koto koso ga, ima o ikiru watashitachi no tsutome darou.",
        "de": "Diesen Reichtum kommenden Generationen zu bewahren, ist wohl die Pflicht von uns Heutigen."
      }
    ]
  },
  {
    "id": "r-minshushugi-to-taiwa",
    "title": "民主主義 と 対話",
    "titleReading": "みんしゅしゅぎとたいわ",
    "titleDe": "Demokratie und Dialog",
    "level": "N1",
    "category": "Gesellschaft",
    "summary": "Ein anspruchsvoller Essay über die Bedeutung von Dialog und Geduld für eine funktionierende Demokratie.",
    "sentences": [
      {
        "tokens": [
          { "s": "民主主義と", "r": "みんしゅしゅぎと", "g": "Demokratie" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "、", "p": true },
          { "s": "ただ", "g": "bloß" },
          { "s": "多数", "r": "たすう", "g": "Mehrheit" },
          { "s": "の", "g": "(von)" },
          { "s": "意見", "r": "いけん", "g": "Meinung" },
          { "s": "に", "g": "(nach)" },
          { "s": "従うこと", "r": "したがうこと", "g": "sich richten" },
          { "s": "では", "g": "(Themenpartikel)" },
          { "s": "ない", "g": "ist nicht" },
          { "s": "。", "p": true }
        ],
        "jp": "民主主義とは、ただ多数の意見に従うことではない。",
        "romaji": "Minshushugi to wa, tada tasuu no iken ni shitagau koto de wa nai.",
        "de": "Demokratie heißt nicht bloß, sich der Mehrheit zu fügen."
      },
      {
        "tokens": [
          { "s": "異なる", "r": "ことなる", "g": "sich unterscheiden" },
          { "s": "考え", "r": "かんがえ", "g": "Ansichten" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "持つ", "r": "もつ", "g": "haben" },
          { "s": "人々", "r": "ひとびと", "g": "Menschen" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "、", "p": true },
          { "s": "たがい", "g": "einander" },
          { "s": "の", "g": "(von)" },
          { "s": "声", "r": "こえ", "g": "Stimme" },
          { "s": "に", "g": "(auf)" },
          { "s": "耳", "r": "みみ", "g": "Ohr" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "傾ける", "r": "かたむける", "g": "lauschen" },
          { "s": "こと", "g": "(das)" },
          { "s": "から", "g": "von" },
          { "s": "はじまる", "g": "beginnt" },
          { "s": "。", "p": true }
        ],
        "jp": "異なる考えを持つ人々が、たがいの声に耳を傾けることからはじまる。",
        "romaji": "Kotonaru kangae o motsu hitobito ga, tagai no koe ni mimi o katamukeru koto kara hajimaru.",
        "de": "Sie beginnt damit, dass Menschen verschiedener Ansichten einander zuhören."
      },
      {
        "tokens": [
          { "s": "意見", "r": "いけん", "g": "Meinungen" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "対立するの", "r": "たいりつするの", "g": "aufeinanderprallen" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "、", "p": true },
          { "s": "決して", "r": "けっして", "g": "keineswegs" },
          { "s": "悪いこと", "r": "わるいこと", "g": "schlecht" },
          { "s": "では", "g": "(Themenpartikel)" },
          { "s": "ない", "g": "ist nicht" },
          { "s": "。", "p": true }
        ],
        "jp": "意見が対立するのは、決して悪いことではない。",
        "romaji": "Iken ga tairitsu suru no wa, kesshite warui koto de wa nai.",
        "de": "Dass Meinungen aufeinanderprallen, ist keineswegs schlecht."
      },
      {
        "tokens": [
          { "s": "むしろ", "g": "vielmehr" },
          { "s": "、", "p": true },
          { "s": "そこ", "g": "dort" },
          { "s": "から", "g": "(von)" },
          { "s": "新しい", "r": "あたらしい", "g": "neue" },
          { "s": "考え", "r": "かんがえ", "g": "Gedanken" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "生まれること", "r": "うまれること", "g": "entstehen" },
          { "s": "も", "g": "auch" },
          { "s": "少なく", "r": "すくなく", "g": "wenig" },
          { "s": "ない", "g": "nicht" },
          { "s": "。", "p": true }
        ],
        "jp": "むしろ、そこから新しい考えが生まれることも少なくない。",
        "romaji": "Mushiro, soko kara atarashii kangae ga umareru koto mo sukunaku nai.",
        "de": "Im Gegenteil, daraus entstehen nicht selten neue Gedanken."
      },
      {
        "tokens": [
          { "s": "問題なの", "r": "もんだいなの", "g": "Problem" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "、", "p": true },
          { "s": "対立", "r": "たいりつ", "g": "Gegensatz" },
          { "s": "そのもの", "g": "selbst" },
          { "s": "よりも", "g": "als" },
          { "s": "、", "p": true },
          { "s": "相手", "r": "あいて", "g": "Gegenüber" },
          { "s": "の", "g": "(von)" },
          { "s": "話", "r": "はなし", "g": "Worte" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "聞こうと", "r": "きこうと", "g": "hören" },
          { "s": "しない", "g": "nicht wollen" },
          { "s": "態度", "r": "たいど", "g": "Haltung" },
          { "s": "だ", "g": "ist" },
          { "s": "。", "p": true }
        ],
        "jp": "問題なのは、対立そのものよりも、相手の話を聞こうとしない態度だ。",
        "romaji": "Mondai na no wa, tairitsu sono mono yori mo, aite no hanashi o kikou to shinai taido da.",
        "de": "Das Problem ist weniger der Gegensatz selbst als die Haltung, dem anderen nicht zuhören zu wollen."
      },
      {
        "tokens": [
          { "s": "自分", "r": "じぶん", "g": "sich selbst" },
          { "s": "と", "g": "(von)" },
          { "s": "違う", "r": "ちがう", "g": "sich unterscheiden" },
          { "s": "立場", "r": "たちば", "g": "Standpunkt" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "はじめ", "g": "von vornherein" },
          { "s": "から", "g": "(von)" },
          { "s": "否定", "r": "ひてい", "g": "ablehnen" },
          { "s": "してしまえ", "g": "und" },
          { "s": "ば", "g": "wenn" },
          { "s": "、", "p": true },
          { "s": "対話", "r": "たいわ", "g": "Dialog" },
          { "s": "は成り", "r": "はなり", "g": "(Themenpartikel)" },
          { "s": "立", "r": "た", "g": "zustande kommen" },
          { "s": "たない", "g": "nicht" },
          { "s": "。", "p": true }
        ],
        "jp": "自分と違う立場をはじめから否定してしまえば、対話は成り立たない。",
        "romaji": "Jibun to chigau tachiba o hajime kara hitei shite shimaeba, taiwa wa naritatanai.",
        "de": "Wer abweichende Standpunkte von vornherein verwirft, mit dem kommt kein Dialog zustande."
      },
      {
        "tokens": [
          { "s": "民主主義", "r": "みんしゅしゅぎ", "g": "Demokratie" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "、", "p": true },
          { "s": "時間", "r": "じかん", "g": "Zeit" },
          { "s": "も", "g": "auch" },
          { "s": "手間", "r": "てま", "g": "Mühe" },
          { "s": "も", "g": "auch" },
          { "s": "かかる", "g": "kostet" },
          { "s": "、", "p": true },
          { "s": "面倒", "r": "めんどう", "g": "umständlich" },
          { "s": "な", "g": "(Adjektiv)" },
          { "s": "仕組み", "r": "しくみ", "g": "Ordnung" },
          { "s": "かもしれない", "g": "vielleicht" },
          { "s": "。", "p": true }
        ],
        "jp": "民主主義は、時間も手間もかかる、面倒な仕組みかもしれない。",
        "romaji": "Minshushugi wa, jikan mo tema mo kakaru, mendou na shikumi kamoshirenai.",
        "de": "Demokratie ist vielleicht eine umständliche Ordnung, die Zeit und Mühe kostet."
      },
      {
        "tokens": [
          { "s": "しかし", "g": "jedoch" },
          { "s": "、", "p": true },
          { "s": "その", "g": "dieser" },
          { "s": "面倒", "r": "めんどう", "g": "umständliche" },
          { "s": "な", "g": "(von)" },
          { "s": "過程", "r": "かてい", "g": "Prozess" },
          { "s": "こそ", "g": "gerade" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "、", "p": true },
          { "s": "力", "r": "ちから", "g": "Macht" },
          { "s": "の", "g": "(von)" },
          { "s": "強い", "r": "つよい", "g": "starken" },
          { "s": "者", "r": "もの", "g": "Einzelnen" },
          { "s": "だけ", "g": "allein" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "決める", "r": "きめる", "g": "entscheiden" },
          { "s": "社会", "r": "しゃかい", "g": "Gesellschaft" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "防いで", "r": "ふせいで", "g": "verhindern" },
          { "s": "きた", "g": "hat" },
          { "s": "。", "p": true }
        ],
        "jp": "しかし、その面倒な過程こそが、力の強い者だけが決める社会を防いできた。",
        "romaji": "Shikashi, sono mendou na katei koso ga, chikara no tsuyoi mono dake ga kimeru shakai o fuseide kita.",
        "de": "Doch gerade dieser mühsame Prozess hat eine Gesellschaft verhindert, in der nur die Mächtigen entscheiden."
      },
      {
        "tokens": [
          { "s": "対話", "r": "たいわ", "g": "Dialog" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "続ける", "r": "つづける", "g": "fortsetzen" },
          { "s": "という", "g": "das" },
          { "s": "忍耐", "r": "にんたい", "g": "Geduld" },
          { "s": "こそ", "g": "gerade" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "、", "p": true },
          { "s": "自由", "r": "じゆう", "g": "Freiheit" },
          { "s": "な", "g": "(von)" },
          { "s": "社会", "r": "しゃかい", "g": "Gesellschaft" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "支える", "r": "ささえる", "g": "tragen" },
          { "s": "根なの", "r": "ねなの", "g": "Wurzel" },
          { "s": "だ", "g": "ist" },
          { "s": "。", "p": true }
        ],
        "jp": "対話を続けるという忍耐こそが、自由な社会を支える根なのだ。",
        "romaji": "Taiwa o tsuzukeru to iu nintai koso ga, jiyuu na shakai o sasaeru ne na no da.",
        "de": "Gerade die Geduld, den Dialog fortzusetzen, ist die Wurzel einer freien Gesellschaft."
      }
    ]
  },
  {
    "id": "r-geijutsu-no-chikara",
    "title": "芸術 の 力",
    "titleReading": "げいじゅつのちから",
    "titleDe": "Die Kraft der Kunst",
    "level": "N1",
    "category": "Kunst",
    "summary": "Ein nachdenklicher Essay über die Frage, warum Kunst trotz ihrer scheinbaren Nutzlosigkeit für den Menschen unentbehrlich ist.",
    "sentences": [
      {
        "tokens": [
          { "s": "芸術", "r": "げいじゅつ", "g": "Kunst" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "、", "p": true },
          { "s": "直接", "r": "ちょくせつ", "g": "unmittelbar" },
          { "s": "役に立つ", "r": "やくにたつ", "g": "nützen" },
          { "s": "もの", "g": "etwas" },
          { "s": "では", "g": "(Themenpartikel)" },
          { "s": "ないと", "g": "ist nicht" },
          { "s": "しばしば", "g": "oft" },
          { "s": "言", "r": "い", "g": "sagen" },
          { "s": "われる", "g": "man" },
          { "s": "。", "p": true }
        ],
        "jp": "芸術は、直接役に立つものではないとしばしば言われる。",
        "romaji": "Geijutsu wa, chokusetsu yaku ni tatsu mono de wa nai to shibashiba iwareru.",
        "de": "Oft heißt es, Kunst sei nichts unmittelbar Nützliches."
      },
      {
        "tokens": [
          { "s": "確かに", "r": "たしかに", "g": "gewiss" },
          { "s": "、", "p": true },
          { "s": "一枚", "r": "いちまい", "g": "ein" },
          { "s": "の", "g": "(von)" },
          { "s": "絵", "r": "え", "g": "Bild" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "人", "r": "ひと", "g": "Menschen" },
          { "s": "の", "g": "(von)" },
          { "s": "腹", "r": "はら", "g": "Bauch" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "満たすわけ", "r": "みたすわけ", "g": "füllen" },
          { "s": "ではない", "g": "(Themenpartikel)" },
          { "s": "。", "p": true }
        ],
        "jp": "確かに、一枚の絵が人の腹を満たすわけではない。",
        "romaji": "Tashika ni, ichimai no e ga hito no hara o mitasu wake de wa nai.",
        "de": "Gewiss füllt ein einzelnes Bild niemandem den Magen."
      },
      {
        "tokens": [
          { "s": "しかし", "g": "jedoch" },
          { "s": "、", "p": true },
          { "s": "人間", "r": "にんげん", "g": "Mensch" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "太古", "r": "たいこ", "g": "Urzeit" },
          { "s": "の", "g": "(von)" },
          { "s": "昔", "r": "むかし", "g": "längst vergangen" },
          { "s": "から", "g": "(von)" },
          { "s": "、", "p": true },
          { "s": "絵", "r": "え", "g": "Bilder" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "描き", "r": "えがき", "g": "malen" },
          { "s": "、", "p": true },
          { "s": "歌", "r": "うた", "g": "Lieder" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "歌い", "r": "うたい", "g": "singen" },
          { "s": "続けて", "r": "つづけて", "g": "fortwährend" },
          { "s": "きた", "g": "hat" },
          { "s": "。", "p": true }
        ],
        "jp": "しかし、人間は太古の昔から、絵を描き、歌を歌い続けてきた。",
        "romaji": "Shikashi, ningen wa taiko no mukashi kara, e o egaki, uta o utai tsuzukete kita.",
        "de": "Doch seit Urzeiten malt der Mensch Bilder und singt Lieder."
      },
      {
        "tokens": [
          { "s": "それ", "g": "das" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "なぜ", "g": "warum" },
          { "s": "だろうか", "g": "wohl" },
          { "s": "。", "p": true }
        ],
        "jp": "それはなぜだろうか。",
        "romaji": "Sore wa naze darou ka.",
        "de": "Warum wohl ist das so?"
      },
      {
        "tokens": [
          { "s": "芸術", "r": "げいじゅつ", "g": "Kunst" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "、", "p": true },
          { "s": "言葉", "r": "ことば", "g": "Worte" },
          { "s": "だけ", "g": "allein" },
          { "s": "では", "g": "(von)" },
          { "s": "表", "r": "あらわ", "g": "ausdrücken" },
          { "s": "せない", "g": "nicht können" },
          { "s": "感情", "r": "かんじょう", "g": "Gefühle" },
          { "s": "や", "g": "und" },
          { "s": "思い", "r": "おもい", "g": "Gedanken" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "、", "p": true },
          { "s": "形", "r": "かたち", "g": "Form" },
          { "s": "や", "g": "und" },
          { "s": "音", "r": "おと", "g": "Klang" },
          { "s": "に", "g": "(in)" },
          { "s": "変", "r": "か", "g": "verwandeln" },
          { "s": "えて", "g": "und" },
          { "s": "伝える", "r": "つたえる", "g": "übermitteln" },
          { "s": "。", "p": true }
        ],
        "jp": "芸術は、言葉だけでは表せない感情や思いを、形や音に変えて伝える。",
        "romaji": "Geijutsu wa, kotoba dake de wa arawasenai kanjou ya omoi o, katachi ya oto ni kaete tsutaeru.",
        "de": "Kunst verwandelt Gefühle, die Worte nicht fassen, in Form und Klang."
      },
      {
        "tokens": [
          { "s": "そして", "g": "und" },
          { "s": "、", "p": true },
          { "s": "それ", "g": "sie" },
          { "s": "に", "g": "(daran)" },
          { "s": "触れた", "r": "ふれた", "g": "berühren" },
          { "s": "人", "r": "ひと", "g": "Menschen" },
          { "s": "の", "g": "(von)" },
          { "s": "心", "r": "こころ", "g": "Herz" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "動", "r": "うご", "g": "bewegen" },
          { "s": "かし", "g": "und" },
          { "s": "、", "p": true },
          { "s": "時に", "r": "ときに", "g": "manchmal" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "生きる", "r": "いきる", "g": "leben" },
          { "s": "力", "r": "ちから", "g": "Kraft" },
          { "s": "さえ", "g": "sogar" },
          { "s": "与える", "r": "あたえる", "g": "geben" },
          { "s": "。", "p": true }
        ],
        "jp": "そして、それに触れた人の心を動かし、時には生きる力さえ与える。",
        "romaji": "Soshite, sore ni fureta hito no kokoro o ugokashi, toki ni wa ikiru chikara sae ataeru.",
        "de": "Und sie bewegt das Herz dessen, der ihr begegnet, und gibt mitunter sogar Lebenskraft."
      },
      {
        "tokens": [
          { "s": "苦しい", "r": "くるしい", "g": "Leid" },
          { "s": "時", "r": "とき", "g": "Zeit" },
          { "s": "に", "g": "(in)" },
          { "s": "聞いた", "r": "きいた", "g": "hören" },
          { "s": "一つ", "r": "ひとつ", "g": "ein" },
          { "s": "の", "g": "(von)" },
          { "s": "曲", "r": "きょく", "g": "Lied" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "、", "p": true },
          { "s": "だれか", "g": "jemandem" },
          { "s": "の", "g": "(von)" },
          { "s": "心", "r": "こころ", "g": "Herz" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "救うこと", "r": "すくうこと", "g": "retten" },
          { "s": "も", "g": "auch" },
          { "s": "ある", "g": "gibt es" },
          { "s": "。", "p": true }
        ],
        "jp": "苦しい時に聞いた一つの曲が、だれかの心を救うこともある。",
        "romaji": "Kurushii toki ni kiita hitotsu no kyoku ga, dare ka no kokoro o sukuu koto mo aru.",
        "de": "Ein Lied, in schwerer Stunde gehört, kann ein Herz retten."
      },
      {
        "tokens": [
          { "s": "つまり", "g": "das heißt" },
          { "s": "芸術", "r": "げいじゅつ", "g": "Kunst" },
          { "s": "の", "g": "(von)" },
          { "s": "価値", "r": "かち", "g": "Wert" },
          { "s": "は", "g": "(Themenpartikel)" },
          { "s": "、", "p": true },
          { "s": "役に立つかどう", "r": "やくにたつかどう", "g": "Nutzen" },
          { "s": "か", "g": "ob oder nicht" },
          { "s": "という", "g": "das" },
          { "s": "物差し", "r": "ものさし", "g": "Maßstab" },
          { "s": "では", "g": "(von)" },
          { "s": "測", "r": "はか", "g": "messen" },
          { "s": "れない", "g": "kann man nicht" },
          { "s": "。", "p": true }
        ],
        "jp": "つまり芸術の価値は、役に立つかどうかという物差しでは測れない。",
        "romaji": "Tsumari geijutsu no kachi wa, yaku ni tatsu ka dou ka to iu monosashi de wa hakarenai.",
        "de": "Der Wert der Kunst lässt sich also nicht am Maßstab der Nützlichkeit messen."
      },
      {
        "tokens": [
          { "s": "役に立た", "r": "やくにたた", "g": "Nutzen" },
          { "s": "ない", "g": "nutzlos" },
          { "s": "ように", "g": "scheinbar" },
          { "s": "見える", "r": "みえる", "g": "aussehen" },
          { "s": "もの", "g": "das" },
          { "s": "の", "g": "(von)" },
          { "s": "中に", "r": "なかに", "g": "darin" },
          { "s": "こそ", "g": "gerade" },
          { "s": "、", "p": true },
          { "s": "人間", "r": "にんげん", "g": "Mensch" },
          { "s": "を", "g": "(Objekt)" },
          { "s": "人間", "r": "にんげん", "g": "Mensch" },
          { "s": "らしく", "g": "-haft" },
          { "s": "する", "g": "machen" },
          { "s": "何か", "r": "なにか", "g": "etwas" },
          { "s": "が", "g": "(Subjekt)" },
          { "s": "宿", "r": "やど", "g": "wohnen" },
          { "s": "っているの", "g": "und" },
          { "s": "だ", "g": "ist" },
          { "s": "。", "p": true }
        ],
        "jp": "役に立たないように見えるものの中にこそ、人間を人間らしくする何かが宿っているのだ。",
        "romaji": "Yaku ni tatanai you ni mieru mono no naka ni koso, ningen o ningen rashiku suru nanika ga yadotte iru no da.",
        "de": "Gerade in dem scheinbar Nutzlosen wohnt etwas, das den Menschen zum Menschen macht."
      }
    ]
  }
];
