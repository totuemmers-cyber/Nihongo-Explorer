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
  }
];
