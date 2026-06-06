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
  }
];
