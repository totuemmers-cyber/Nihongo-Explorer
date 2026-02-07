window.GRAMMAR_DATA = [
  // ============================================================
  // PARTIKEL (15)
  // ============================================================
  {
    id: "wa",
    pattern: "は",
    level: "N5",
    category: "Partikel",
    meaning: "Themenmarkierer",
    explanation: "は markiert das Thema eines Satzes – also das, worüber gesprochen wird. Es wird immer 'wa' ausgesprochen, obwohl es das Hiragana-Zeichen 'ha' ist. Das Thema muss nicht das grammatische Subjekt sein.",
    formation: "Nomen + は",
    examples: [
      { japanese: "私は学生です。", romaji: "Watashi wa gakusei desu.", german: "Ich bin Student." },
      { japanese: "東京は大きいです。", romaji: "Tōkyō wa ōkii desu.", german: "Tokio ist groß." }
    ],
    notes: "Nicht verwechseln mit が (ga). は betont das Thema, が betont das Subjekt. Bei neuen Informationen verwendet man が, bei bekannten Themen は.",
    related: ["ga"]
  },
  {
    id: "ga",
    pattern: "が",
    level: "N5",
    category: "Partikel",
    meaning: "Subjektmarkierer",
    explanation: "が markiert das grammatische Subjekt eines Satzes und betont, wer oder was die Handlung ausführt. Es wird oft verwendet, um neue Informationen einzuführen oder um das Subjekt besonders hervorzuheben.",
    formation: "Nomen + が",
    examples: [
      { japanese: "猫がいます。", romaji: "Neko ga imasu.", german: "Es gibt eine Katze. / Eine Katze ist da." },
      { japanese: "誰が来ましたか。", romaji: "Dare ga kimashita ka.", german: "Wer ist gekommen?" }
    ],
    notes: "が wird nach Fragewörtern (誰が、何が) und vor bestimmten Prädikaten wie 好き、欲しい、分かる、ある、いる verwendet.",
    related: ["wa", "ga-aru", "ga-iru"]
  },
  {
    id: "wo",
    pattern: "を",
    level: "N5",
    category: "Partikel",
    meaning: "Objektmarkierer",
    explanation: "を markiert das direkte Objekt eines Satzes – also das, worauf die Handlung einwirkt. Es wird 'o' ausgesprochen. Es wird auch verwendet, um einen Ort zu markieren, durch den man sich bewegt.",
    formation: "Nomen + を + Verb",
    examples: [
      { japanese: "パンを食べます。", romaji: "Pan o tabemasu.", german: "Ich esse Brot." },
      { japanese: "公園を歩きます。", romaji: "Kōen o arukimasu.", german: "Ich gehe durch den Park." }
    ],
    notes: "を wird nur mit transitiven Verben (Verben, die ein Objekt haben) verwendet. Bei Bewegungsverben wie 歩く、走る markiert を den Ort, den man durchquert.",
    related: ["wa", "ga"]
  },
  {
    id: "ni",
    pattern: "に",
    level: "N5",
    category: "Partikel",
    meaning: "Richtung / Zeitpunkt / Ort des Seins",
    explanation: "に hat viele Funktionen: Es markiert das Ziel einer Bewegung, einen Zeitpunkt, den Ort, an dem etwas existiert, und den indirekten Empfänger. Es ist eine der vielseitigsten Partikeln im Japanischen.",
    formation: "Nomen + に",
    examples: [
      { japanese: "学校に行きます。", romaji: "Gakkō ni ikimasu.", german: "Ich gehe zur Schule." },
      { japanese: "七時に起きます。", romaji: "Shichi-ji ni okimasu.", german: "Ich stehe um sieben Uhr auf." }
    ],
    notes: "Bei Wochentagen und konkreten Uhrzeiten verwendet man に, aber bei relativen Zeitangaben wie 今日、明日、来週 wird に nicht verwendet.",
    related: ["de", "e"]
  },
  {
    id: "de",
    pattern: "で",
    level: "N5",
    category: "Partikel",
    meaning: "Ort der Handlung / Mittel",
    explanation: "で markiert den Ort, an dem eine Handlung stattfindet, oder das Mittel, mit dem etwas getan wird. Es kann auch eine Ursache oder ein Material angeben.",
    formation: "Nomen + で",
    examples: [
      { japanese: "図書館で勉強します。", romaji: "Toshokan de benkyō shimasu.", german: "Ich lerne in der Bibliothek." },
      { japanese: "バスで行きます。", romaji: "Basu de ikimasu.", german: "Ich fahre mit dem Bus." }
    ],
    notes: "Unterschied zu に: で markiert den Ort einer Aktivität (図書館で勉強する), während に den Ort der Existenz markiert (図書館にいる).",
    related: ["ni"]
  },
  {
    id: "e",
    pattern: "へ",
    level: "N5",
    category: "Partikel",
    meaning: "Richtung (in Richtung von)",
    explanation: "へ markiert die Richtung einer Bewegung. Es wird 'e' ausgesprochen, nicht 'he'. Es ist austauschbar mit に bei Bewegungsverben, betont aber stärker die Richtung als das Ziel.",
    formation: "Nomen + へ",
    examples: [
      { japanese: "日本へ行きます。", romaji: "Nihon e ikimasu.", german: "Ich fahre nach Japan." },
      { japanese: "南へ歩きましょう。", romaji: "Minami e arukimashō.", german: "Lasst uns nach Süden gehen." }
    ],
    notes: "へ betont die Richtung der Bewegung, während に das Ziel betont. In der Alltagssprache wird oft に bevorzugt.",
    related: ["ni"]
  },
  {
    id: "kara",
    pattern: "から",
    level: "N5",
    category: "Partikel",
    meaning: "Von / Ab (Ausgangspunkt)",
    explanation: "から markiert den zeitlichen oder örtlichen Ausgangspunkt einer Handlung. Es bedeutet 'von' oder 'ab'. Es kann auch 'weil' bedeuten, wenn es am Satzende nach einem Verb steht.",
    formation: "Nomen + から",
    examples: [
      { japanese: "九時から始まります。", romaji: "Ku-ji kara hajimarimasu.", german: "Es beginnt ab neun Uhr." },
      { japanese: "東京から来ました。", romaji: "Tōkyō kara kimashita.", german: "Ich komme aus Tokio." }
    ],
    notes: "Als Partikel bedeutet から 'von/ab', als Konjunktion nach einem Verb bedeutet es 'weil'. Siehe auch die Konjunktion から unter Satzstrukturen.",
    related: ["made", "kara-because"]
  },
  {
    id: "made",
    pattern: "まで",
    level: "N5",
    category: "Partikel",
    meaning: "Bis (Endpunkt)",
    explanation: "まで markiert den zeitlichen oder örtlichen Endpunkt. Es wird oft zusammen mit から verwendet, um einen Zeitraum oder eine Strecke anzugeben.",
    formation: "Nomen + まで",
    examples: [
      { japanese: "五時まで働きます。", romaji: "Go-ji made hatarakimasu.", german: "Ich arbeite bis fünf Uhr." },
      { japanese: "駅から学校まで歩きます。", romaji: "Eki kara gakkō made arukimasu.", german: "Ich gehe vom Bahnhof bis zur Schule zu Fuß." }
    ],
    notes: "から～まで ist ein häufiges Paar: 月曜日から金曜日まで (von Montag bis Freitag).",
    related: ["kara"]
  },
  {
    id: "to",
    pattern: "と",
    level: "N5",
    category: "Partikel",
    meaning: "Und / Mit (zusammen mit)",
    explanation: "と hat zwei Hauptbedeutungen: Es verbindet Nomen aufzählend ('und') oder markiert eine Begleitung ('mit'). Bei der Aufzählung werden alle Elemente genannt (vollständige Liste).",
    formation: "Nomen + と + Nomen / Nomen + と + Verb",
    examples: [
      { japanese: "パンと牛乳を買いました。", romaji: "Pan to gyūnyū o kaimashita.", german: "Ich habe Brot und Milch gekauft." },
      { japanese: "友達と映画を見ました。", romaji: "Tomodachi to eiga o mimashita.", german: "Ich habe mit einem Freund einen Film gesehen." }
    ],
    notes: "と listet alle Elemente vollständig auf. Für eine unvollständige Aufzählung ('und so weiter') verwendet man や.",
    related: ["ya"]
  },
  {
    id: "no",
    pattern: "の",
    level: "N5",
    category: "Partikel",
    meaning: "Besitzanzeiger / Verbindung",
    explanation: "の verbindet zwei Nomen und zeigt Zugehörigkeit, Besitz oder eine nähere Bestimmung an. Es entspricht oft dem deutschen Genitiv oder 'von'. の kann auch ein Nomen ersetzen, wenn es aus dem Kontext klar ist.",
    formation: "Nomen + の + Nomen",
    examples: [
      { japanese: "私の本です。", romaji: "Watashi no hon desu.", german: "Das ist mein Buch." },
      { japanese: "日本語の先生です。", romaji: "Nihongo no sensei desu.", german: "Er/Sie ist Japanischlehrer(in)." }
    ],
    notes: "の kann auch als Nominalisierer verwendet werden: 食べるのが好きです (Ich mag es zu essen).",
    related: ["no-wa-desu"]
  },
  {
    id: "mo",
    pattern: "も",
    level: "N5",
    category: "Partikel",
    meaning: "Auch / Ebenfalls",
    explanation: "も ersetzt は, が oder を und bedeutet 'auch' oder 'ebenfalls'. Es zeigt an, dass das Gesagte auch für das markierte Element gilt. Bei Mengen kann es 'sogar' bedeuten.",
    formation: "Nomen + も",
    examples: [
      { japanese: "私も学生です。", romaji: "Watashi mo gakusei desu.", german: "Ich bin auch Student." },
      { japanese: "猫も犬も好きです。", romaji: "Neko mo inu mo suki desu.", german: "Ich mag sowohl Katzen als auch Hunde." }
    ],
    notes: "も ersetzt は, が und を, wird aber zu anderen Partikeln hinzugefügt: にも、でも、からも usw.",
    related: ["wa", "ga"]
  },
  {
    id: "ne",
    pattern: "ね",
    level: "N5",
    category: "Partikel",
    meaning: "Nicht wahr? / Bestätigungspartikel",
    explanation: "ね wird am Satzende verwendet, um Zustimmung zu suchen oder eine gemeinsame Meinung auszudrücken. Es entspricht dem deutschen 'nicht wahr?' oder 'oder?'.",
    formation: "Satz + ね",
    examples: [
      { japanese: "いい天気ですね。", romaji: "Ii tenki desu ne.", german: "Schönes Wetter, nicht wahr?" },
      { japanese: "この映画はおもしろいですね。", romaji: "Kono eiga wa omoshiroi desu ne.", german: "Dieser Film ist interessant, oder?" }
    ],
    notes: "ね wird häufig in Gesprächen verwendet, um eine freundliche Atmosphäre zu schaffen und Einverständnis zu signalisieren.",
    related: ["yo"]
  },
  {
    id: "yo",
    pattern: "よ",
    level: "N5",
    category: "Partikel",
    meaning: "Betonungspartikel (Ich sage dir!)",
    explanation: "よ wird am Satzende verwendet, um neue Informationen mitzuteilen oder eine Aussage zu betonen. Es signalisiert dem Gesprächspartner, dass man etwas Neüs oder Wichtiges sagt.",
    formation: "Satz + よ",
    examples: [
      { japanese: "これはおいしいですよ。", romaji: "Kore wa oishii desu yo.", german: "Das ist lecker, sage ich dir!" },
      { japanese: "もう遅いですよ。", romaji: "Mō osoi desu yo.", german: "Es ist schon spät!" }
    ],
    notes: "よ klingt bestimmter als ね. Zu häufiger Gebrauch kann aufdringlich wirken. よね kombiniert beide Partikeln (Betonung + Bestätigung).",
    related: ["ne"]
  },
  {
    id: "ka",
    pattern: "か",
    level: "N5",
    category: "Partikel",
    meaning: "Fragepartikel",
    explanation: "か wird am Satzende angehängt, um eine Frage zu bilden. Im höflichen Japanisch ersetzt か das Fragezeichen. Die Satzstellung ändert sich dabei nicht.",
    formation: "Satz + か",
    examples: [
      { japanese: "学生ですか。", romaji: "Gakusei desu ka.", german: "Sind Sie Student?" },
      { japanese: "何を食べますか。", romaji: "Nani o tabemasu ka.", german: "Was essen Sie?" }
    ],
    notes: "In der höflichen Sprache wird か ohne Fragezeichen verwendet. Im informellen Japanisch kann か weggelassen werden – die Frage wird dann durch steigende Intonation gebildet.",
    related: []
  },
  {
    id: "ya",
    pattern: "や",
    level: "N5",
    category: "Partikel",
    meaning: "Und (unvollständige Aufzählung)",
    explanation: "や verbindet Nomen in einer unvollständigen Aufzählung. Es bedeutet 'und (unter anderem)' und zeigt an, dass es noch weitere Elemente gibt, die nicht genannt werden.",
    formation: "Nomen + や + Nomen (+ など)",
    examples: [
      { japanese: "りんごやみかんを買いました。", romaji: "Ringo ya mikan o kaimashita.", german: "Ich habe Äpfel und Mandarinen (und anderes) gekauft." },
      { japanese: "本やノートなどがあります。", romaji: "Hon ya nōto nado ga arimasu.", german: "Es gibt Bücher, Hefte und so weiter." }
    ],
    notes: "や wird oft mit など (und so weiter) kombiniert. Im Gegensatz zu と (vollständige Aufzählung) deutet や an, dass die Liste nicht abgeschlossen ist.",
    related: ["to"]
  },

  // ============================================================
  // VERBEN (28)
  // ============================================================
  {
    id: "masu",
    pattern: "～ます",
    level: "N5",
    category: "Verben",
    meaning: "Höfliche Gegenwartsform (positiv)",
    explanation: "～ます ist die höfliche Gegenwartsform eines Verbs. Sie drückt Handlungen in der Gegenwart oder Zukunft aus. Diese Form wird in formellen Situationen und mit Fremden verwendet.",
    formation: "Verb-Stamm + ます",
    examples: [
      { japanese: "毎日日本語を勉強します。", romaji: "Mainichi nihongo o benkyō shimasu.", german: "Ich lerne jeden Tag Japanisch." },
      { japanese: "明日友達に会います。", romaji: "Ashita tomodachi ni aimasu.", german: "Morgen treffe ich einen Freund." }
    ],
    notes: "Die ます-Form wird aus dem Verb-Stamm (masu-Stamm) gebildet. Bei Gruppe-1-Verben ändert sich die letzte Silbe: 書く → 書きます, 飲む → 飲みます.",
    related: ["masen", "mashita", "masen-deshita"]
  },
  {
    id: "masen",
    pattern: "～ません",
    level: "N5",
    category: "Verben",
    meaning: "Höfliche Gegenwartsform (negativ)",
    explanation: "～ません ist die höfliche Verneinung eines Verbs in der Gegenwart. Sie drückt aus, dass man etwas nicht tut oder nicht tun wird.",
    formation: "Verb-Stamm + ません",
    examples: [
      { japanese: "肉を食べません。", romaji: "Niku o tabemasen.", german: "Ich esse kein Fleisch." },
      { japanese: "今日は学校に行きません。", romaji: "Kyō wa gakkō ni ikimasen.", german: "Heute gehe ich nicht zur Schule." }
    ],
    notes: "ません kann auch als höfliche Einladung verwendet werden: 一緒に行きませんか (Wollen wir nicht zusammen gehen?).",
    related: ["masu", "mashita", "masen-deshita"]
  },
  {
    id: "mashita",
    pattern: "～ました",
    level: "N5",
    category: "Verben",
    meaning: "Höfliche Vergangenheitsform (positiv)",
    explanation: "～ました ist die höfliche Vergangenheitsform eines Verbs. Sie drückt aus, dass eine Handlung in der Vergangenheit abgeschlossen wurde.",
    formation: "Verb-Stamm + ました",
    examples: [
      { japanese: "昨日映画を見ました。", romaji: "Kinō eiga o mimashita.", german: "Gestern habe ich einen Film gesehen." },
      { japanese: "日本に行きました。", romaji: "Nihon ni ikimashita.", german: "Ich bin nach Japan gegangen." }
    ],
    notes: "Die Bildung ist einfach: Man ersetzt ます durch ました. Der Verb-Stamm bleibt gleich.",
    related: ["masu", "masen", "masen-deshita"]
  },
  {
    id: "masen-deshita",
    pattern: "～ませんでした",
    level: "N5",
    category: "Verben",
    meaning: "Höfliche Vergangenheitsform (negativ)",
    explanation: "～ませんでした ist die höfliche Verneinung in der Vergangenheit. Sie drückt aus, dass man etwas nicht getan hat.",
    formation: "Verb-Stamm + ませんでした",
    examples: [
      { japanese: "朝ごはんを食べませんでした。", romaji: "Asagohan o tabemasen deshita.", german: "Ich habe kein Frühstück gegessen." },
      { japanese: "昨日勉強しませんでした。", romaji: "Kinō benkyō shimasen deshita.", german: "Gestern habe ich nicht gelernt." }
    ],
    notes: "Diese Form wird regelmäßig gebildet. Man ersetzt ます durch ませんでした.",
    related: ["masu", "masen", "mashita"]
  },
  {
    id: "te-form",
    pattern: "～て / ～で",
    level: "N5",
    category: "Verben",
    meaning: "て-Form (Verbindungsform)",
    explanation: "Die て-Form ist eine der wichtigsten Verbformen im Japanischen. Sie wird als Basis für viele grammatische Konstruktionen verwendet, wie ～ている, ～てください und ～てもいい. Die Bildung hängt von der Verbgruppe ab.",
    formation: "Gruppe 1: う・つ・る → って, む・ぶ・ぬ → んで, く → いて, ぐ → いで, す → して / Gruppe 2: る → て / Gruppe 3: する → して, くる → きて",
    examples: [
      { japanese: "本を読んでいます。", romaji: "Hon o yonde imasu.", german: "Ich lese gerade ein Buch." },
      { japanese: "食べて寝ました。", romaji: "Tabete nemashita.", german: "Ich habe gegessen und bin schlafen gegangen." }
    ],
    notes: "Die て-Form allein ist kein vollständiger Satz. Eine Ausnahme: 行って (als Kurzform für 行ってください = Geh!). Die Bildung der て-Form muss auswendig gelernt werden.",
    related: ["te-iru", "te-kudasai", "temo-ii", "te-connective"]
  },
  {
    id: "te-iru",
    pattern: "～ている",
    level: "N5",
    category: "Verben",
    meaning: "Verlaufsform / Zustand",
    explanation: "～ている drückt eine andaürnde Handlung (Verlaufsform) oder einen resultierenden Zustand aus. Die höfliche Form ist ～ています. Bei manchen Verben beschreibt es einen Zustand statt einer Aktivität.",
    formation: "Verb て-Form + いる / います",
    examples: [
      { japanese: "今、本を読んでいます。", romaji: "Ima, hon o yonde imasu.", german: "Ich lese gerade ein Buch." },
      { japanese: "東京に住んでいます。", romaji: "Tōkyō ni sunde imasu.", german: "Ich wohne in Tokio." }
    ],
    notes: "Bei Zustandsverben wie 知る, 結婚する, 持つ beschreibt ている den resultierenden Zustand: 知っています (Ich weiß es), nicht eine andaürnde Handlung.",
    related: ["te-form"]
  },
  {
    id: "te-kudasai",
    pattern: "～てください",
    level: "N5",
    category: "Verben",
    meaning: "Bitte tun Sie...",
    explanation: "～てください ist eine höfliche Bitte, etwas zu tun. Es entspricht dem deutschen 'Bitte machen Sie...' oder 'Bitte tu...'. Es ist eine der häufigsten Formen im Alltag.",
    formation: "Verb て-Form + ください",
    examples: [
      { japanese: "ここに名前を書いてください。", romaji: "Koko ni namae o kaite kudasai.", german: "Bitte schreiben Sie hier Ihren Namen." },
      { japanese: "もう一度言ってください。", romaji: "Mō ichido itte kudasai.", german: "Bitte sagen Sie es noch einmal." }
    ],
    notes: "てください ist höflich, aber es ist trotzdem eine Anweisung. Für noch höflichere Bitten verwendet man ていただけませんか.",
    related: ["te-form", "naide-kudasai"]
  },
  {
    id: "naide-kudasai",
    pattern: "～ないでください",
    level: "N5",
    category: "Verben",
    meaning: "Bitte tun Sie ... nicht",
    explanation: "～ないでください ist eine höfliche Bitte, etwas nicht zu tun. Es ist die verneinende Form von ～てください.",
    formation: "Verb ない-Form + でください",
    examples: [
      { japanese: "ここで写真を撮らないでください。", romaji: "Koko de shashin o toranaide kudasai.", german: "Bitte machen Sie hier keine Fotos." },
      { japanese: "心配しないでください。", romaji: "Shinpai shinaide kudasai.", german: "Bitte machen Sie sich keine Sorgen." }
    ],
    notes: "Die ない-Form wird aus der Wörterbuchform gebildet: Gruppe 1: う-Reihe → あ-Reihe + ない (書く → 書かない), Gruppe 2: る → ない (食べる → 食べない).",
    related: ["te-kudasai"]
  },
  {
    id: "tai",
    pattern: "～たい",
    level: "N5",
    category: "Verben",
    meaning: "Möchte / Will (etwas tun)",
    explanation: "～たい drückt den Wunsch des Sprechers aus, etwas zu tun. Es wird wie ein い-Adjektiv konjugiert. Man verwendet es nur für die eigenen Wünsche, nicht für die Wünsche anderer.",
    formation: "Verb-Stamm + たい",
    examples: [
      { japanese: "水を飲みたいです。", romaji: "Mizu o nomitai desu.", german: "Ich möchte Wasser trinken." },
      { japanese: "日本に行きたいです。", romaji: "Nihon ni ikitai desu.", german: "Ich möchte nach Japan gehen." }
    ],
    notes: "たい wird nur für die eigene Person verwendet. Für andere sagt man ～たがっている. Das Objekt kann mit を oder が markiert werden: 水を飲みたい / 水が飲みたい.",
    related: ["ga-hoshii"]
  },
  {
    id: "mashou",
    pattern: "～ましょう",
    level: "N5",
    category: "Verben",
    meaning: "Lasst uns... / Ich werde...",
    explanation: "～ましょう drückt einen Vorschlag ('Lasst uns...') oder eine Absicht ('Ich werde...') aus. Es ist die höfliche Volitionalform.",
    formation: "Verb-Stamm + ましょう",
    examples: [
      { japanese: "一緒に行きましょう。", romaji: "Issho ni ikimashō.", german: "Lasst uns zusammen gehen." },
      { japanese: "休みましょう。", romaji: "Yasumimashō.", german: "Lasst uns eine Pause machen." }
    ],
    notes: "ましょう ist ein Vorschlag, ましょうか ist eine Frage, ob man etwas gemeinsam tun soll oder ein Angebot.",
    related: ["mashou-ka"]
  },
  {
    id: "mashou-ka",
    pattern: "～ましょうか",
    level: "N5",
    category: "Verben",
    meaning: "Sollen wir...? / Soll ich...?",
    explanation: "～ましょうか wird als Frage verwendet, um vorzuschlagen, etwas gemeinsam zu tun ('Sollen wir...?') oder um Hilfe anzubieten ('Soll ich...?').",
    formation: "Verb-Stamm + ましょうか",
    examples: [
      { japanese: "窓を開けましょうか。", romaji: "Mado o akemashō ka.", german: "Soll ich das Fenster öffnen?" },
      { japanese: "一緒に昼ごはんを食べましょうか。", romaji: "Issho ni hirugohan o tabemashō ka.", german: "Sollen wir zusammen Mittag essen?" }
    ],
    notes: "Wenn man jemandem Hilfe anbietet, ist ましょうか höflicher als einfach ましょう.",
    related: ["mashou"]
  },
  {
    id: "temo-ii",
    pattern: "～てもいいです",
    level: "N5",
    category: "Verben",
    meaning: "Darf / Es ist erlaubt zu...",
    explanation: "～てもいいです drückt Erlaubnis aus. Es bedeutet 'Man darf...' oder 'Es ist in Ordnung, wenn...'. Als Frage wird es verwendet, um um Erlaubnis zu bitten.",
    formation: "Verb て-Form + もいいです",
    examples: [
      { japanese: "ここで写真を撮ってもいいですか。", romaji: "Koko de shashin o totte mo ii desu ka.", german: "Darf ich hier fotografieren?" },
      { japanese: "帰ってもいいですよ。", romaji: "Kaette mo ii desu yo.", german: "Du darfst nach Hause gehen." }
    ],
    notes: "Die Verneinung 'Man darf nicht' ist ～てはいけません, nicht ～てもよくないです.",
    related: ["te-form", "tewa-ikemasen", "nakutemo-ii"]
  },
  {
    id: "tewa-ikemasen",
    pattern: "～てはいけません",
    level: "N5",
    category: "Verben",
    meaning: "Darf nicht / Es ist verboten zu...",
    explanation: "～てはいけません drückt ein Verbot aus. Es bedeutet 'Man darf nicht...' oder 'Es ist nicht erlaubt...'. Es ist stärker als eine einfache Bitte.",
    formation: "Verb て-Form + はいけません",
    examples: [
      { japanese: "ここでタバコを吸ってはいけません。", romaji: "Koko de tabako o sutte wa ikemasen.", german: "Hier darf man nicht rauchen." },
      { japanese: "教室で食べてはいけません。", romaji: "Kyōshitsu de tabete wa ikemasen.", german: "Im Klassenzimmer darf man nicht essen." }
    ],
    notes: "In der Umgangssprache wird ～ちゃだめ oder ～ちゃいけない verwendet. ～てはいけません ist die formellere Variante.",
    related: ["temo-ii", "nakereba-naranai"]
  },
  {
    id: "koto-ga-dekiru",
    pattern: "～ことができる",
    level: "N5",
    category: "Verben",
    meaning: "Können / In der Lage sein zu...",
    explanation: "～ことができる drückt die Fähigkeit aus, etwas zu tun. Die höfliche Form ist ～ことができます. Es ist eine Alternative zur Potenzialform des Verbs.",
    formation: "Verb (Wörterbuchform) + ことができる",
    examples: [
      { japanese: "日本語を話すことができます。", romaji: "Nihongo o hanasu koto ga dekimasu.", german: "Ich kann Japanisch sprechen." },
      { japanese: "漢字を読むことができますか。", romaji: "Kanji o yomu koto ga dekimasu ka.", german: "Können Sie Kanji lesen?" }
    ],
    notes: "Diese Form ist etwas formeller als die Potenzialform (話せる). Beide sind austauschbar, aber ことができる wird öfter in der Schriftsprache verwendet.",
    related: []
  },
  {
    id: "ta-koto-ga-aru",
    pattern: "～たことがある",
    level: "N5",
    category: "Verben",
    meaning: "Schon einmal ... haben (Erfahrung)",
    explanation: "～たことがある drückt aus, dass man etwas schon einmal erlebt hat. Es bezieht sich auf Erfahrungen in der Vergangenheit. Die höfliche Form ist ～たことがあります.",
    formation: "Verb た-Form + ことがある",
    examples: [
      { japanese: "日本に行ったことがあります。", romaji: "Nihon ni itta koto ga arimasu.", german: "Ich war schon einmal in Japan." },
      { japanese: "すしを食べたことがありますか。", romaji: "Sushi o tabeta koto ga arimasu ka.", german: "Haben Sie schon einmal Sushi gegessen?" }
    ],
    notes: "Die Verneinung ist ～たことがない (Ich habe noch nie...). Diese Form bezieht sich auf die gesamte Lebenserfahrung, nicht auf ein bestimmtes Ereignis.",
    related: []
  },
  {
    id: "ni-iku",
    pattern: "～に行く",
    level: "N5",
    category: "Verben",
    meaning: "Gehen um zu...",
    explanation: "～に行く drückt den Zweck einer Bewegung aus. Man geht irgendwohin, um etwas zu tun. Statt 行く kann auch 来る oder 帰る verwendet werden.",
    formation: "Verb-Stamm + に行く / に来る / に帰る",
    examples: [
      { japanese: "映画を見に行きます。", romaji: "Eiga o mi ni ikimasu.", german: "Ich gehe einen Film sehen." },
      { japanese: "昼ごはんを食べに来ませんか。", romaji: "Hirugohan o tabe ni kimasen ka.", german: "Kommen Sie nicht zum Mittagessen?" }
    ],
    notes: "Man verwendet den Verb-Stamm (masu-Stamm), nicht die Wörterbuchform: 食べに行く (richtig), 食べるに行く (falsch). Bei する-Verben: 買い物しに行く.",
    related: ["ni"]
  },
  {
    id: "nagara",
    pattern: "～ながら",
    level: "N5",
    category: "Verben",
    meaning: "Während / Gleichzeitig",
    explanation: "～ながら drückt aus, dass zwei Handlungen gleichzeitig von derselben Person ausgeführt werden. Die Haupthandlung steht am Satzende, die Nebenhandlung vor ながら.",
    formation: "Verb-Stamm + ながら + Haupthandlung",
    examples: [
      { japanese: "音楽を聞きながら勉強します。", romaji: "Ongaku o kikinagara benkyō shimasu.", german: "Ich lerne während ich Musik höre." },
      { japanese: "テレビを見ながら食べないでください。", romaji: "Terebi o minagara tabenaide kudasai.", german: "Bitte essen Sie nicht beim Fernsehen." }
    ],
    notes: "Beide Handlungen müssen von derselben Person ausgeführt werden. Für verschiedene Personen verwendet man ～間に (aida ni).",
    related: []
  },
  {
    id: "mae-ni",
    pattern: "～前に",
    level: "N5",
    category: "Verben",
    meaning: "Bevor / Vor",
    explanation: "～前に bedeutet 'bevor man etwas tut' oder 'vor etwas'. Bei Verben steht die Wörterbuchform vor 前に, bei Nomen steht の vor 前に.",
    formation: "Verb (Wörterbuchform) + 前に / Nomen + の前に",
    examples: [
      { japanese: "寝る前に歯を磨きます。", romaji: "Neru mae ni ha o migakimasu.", german: "Vor dem Schlafen putze ich mir die Zähne." },
      { japanese: "食事の前に手を洗ってください。", romaji: "Shokuji no mae ni te o aratte kudasai.", german: "Bitte waschen Sie sich vor dem Essen die Hände." }
    ],
    notes: "Vor 前に steht immer die Wörterbuchform des Verbs, unabhängig von der Zeitform des Hauptsatzes.",
    related: ["ato-de"]
  },
  {
    id: "ato-de",
    pattern: "～後で",
    level: "N5",
    category: "Verben",
    meaning: "Nachdem / Nach",
    explanation: "～後で bedeutet 'nachdem man etwas getan hat' oder 'nach etwas'. Bei Verben steht die た-Form vor 後で, bei Nomen steht の vor 後で.",
    formation: "Verb た-Form + 後で / Nomen + の後で",
    examples: [
      { japanese: "仕事の後で飲みに行きましょう。", romaji: "Shigoto no ato de nomi ni ikimashō.", german: "Lasst uns nach der Arbeit trinken gehen." },
      { japanese: "ごはんを食べた後で散歩しました。", romaji: "Gohan o tabeta ato de sanpo shimashita.", german: "Nachdem ich gegessen hatte, habe ich einen Spaziergang gemacht." }
    ],
    notes: "後で kann auch allein 'später' bedeuten: 後で電話します (Ich rufe später an). ～てから ist eine Alternative mit ähnlicher Bedeutung.",
    related: ["mae-ni", "te-kara"]
  },
  {
    id: "tari-tari",
    pattern: "～たり～たりする",
    level: "N5",
    category: "Verben",
    meaning: "Dinge wie ... und ... tun",
    explanation: "～たり～たりする listet beispielhafte Handlungen auf. Es bedeutet 'Dinge wie ... und ... tun' und impliziert, dass auch andere Handlungen stattfinden. Die letzte Form ist immer する.",
    formation: "Verb た-Form + り + Verb た-Form + り + する",
    examples: [
      { japanese: "週末は本を読んだりテレビを見たりします。", romaji: "Shūmatsu wa hon o yondari terebi o mitari shimasu.", german: "Am Wochenende lese ich Bücher, schaü Fernsehen und so weiter." },
      { japanese: "休みの日は買い物したり料理したりしました。", romaji: "Yasumi no hi wa kaimono shitari ryōri shitari shimashita.", german: "An freien Tagen habe ich eingekauft, gekocht und ähnliches." }
    ],
    notes: "Am Ende der Aufzählung muss immer する stehen (in der passenden Zeitform). Auch mit Adjektiven möglich: 大きかったり小さかったり.",
    related: ["ya"]
  },
  {
    id: "te-kara",
    pattern: "～てから",
    level: "N5",
    category: "Verben",
    meaning: "Nachdem / Seit",
    explanation: "～てから betont die Reihenfolge zweier Handlungen: Erst wird die erste Handlung abgeschlossen, dann beginnt die zweite. Es betont stärker als 後で, dass die erste Handlung zuerst beendet sein muss.",
    formation: "Verb て-Form + から",
    examples: [
      { japanese: "手を洗ってから食べてください。", romaji: "Te o aratte kara tabete kudasai.", german: "Bitte essen Sie, nachdem Sie sich die Hände gewaschen haben." },
      { japanese: "日本に来てから日本語を勉強し始めました。", romaji: "Nihon ni kite kara nihongo o benkyō shihajimemashita.", german: "Seit ich nach Japan gekommen bin, habe ich angefangen Japanisch zu lernen." }
    ],
    notes: "てから betont die Abfolge stärker als 後で. Bei てから muss die erste Handlung abgeschlossen sein, bevor die zweite beginnt.",
    related: ["ato-de", "te-form"]
  },
  {
    id: "naide",
    pattern: "～ないで",
    level: "N5",
    category: "Verben",
    meaning: "Ohne zu... / Anstatt zu...",
    explanation: "～ないで bedeutet 'ohne etwas zu tun'. Es drückt aus, dass eine Handlung nicht ausgeführt wird, während eine andere stattfindet.",
    formation: "Verb ない-Form + で",
    examples: [
      { japanese: "朝ごはんを食べないで学校に行きました。", romaji: "Asagohan o tabenaide gakkō ni ikimashita.", german: "Ich bin zur Schule gegangen, ohne zu frühstücken." },
      { japanese: "辞書を使わないで読みました。", romaji: "Jisho o tsukawanaide yomimashita.", german: "Ich habe es gelesen, ohne ein Wörterbuch zu benutzen." }
    ],
    notes: "～ないで kann auch eine Bitte ausdrücken, wenn ください hinzugefügt wird: 食べないでください (Bitte essen Sie nicht).",
    related: ["naide-kudasai"]
  },
  {
    id: "sugiru",
    pattern: "～すぎる",
    level: "N5",
    category: "Verben",
    meaning: "Zu viel / Zu sehr",
    explanation: "～すぎる drückt aus, dass etwas übermäßig ist. Es kann mit Verben und Adjektiven verwendet werden und bedeutet 'zu viel' oder 'zu sehr'. すぎる selbst wird als Gruppe-2-Verb konjugiert.",
    formation: "Verb-Stamm + すぎる / い-Adj (ohne い) + すぎる / な-Adj + すぎる",
    examples: [
      { japanese: "昨日食べすぎました。", romaji: "Kinō tabesugimashita.", german: "Gestern habe ich zu viel gegessen." },
      { japanese: "この鞄は高すぎます。", romaji: "Kono kaban wa takasugimasu.", german: "Diese Tasche ist zu teuer." }
    ],
    notes: "Bei い-Adjektiven fällt das い weg: 高い → 高すぎる. Bei な-Adjektiven fällt な weg: 静か → 静かすぎる.",
    related: []
  },
  {
    id: "kata",
    pattern: "～方",
    level: "N5",
    category: "Verben",
    meaning: "Art und Weise / Wie man ... tut",
    explanation: "～方 (かた) bedeutet 'die Art und Weise, wie man etwas tut'. Es wird an den Verb-Stamm angehängt und bildet ein Nomen.",
    formation: "Verb-Stamm + 方(かた)",
    examples: [
      { japanese: "この漢字の読み方を教えてください。", romaji: "Kono kanji no yomikata o oshiete kudasai.", german: "Bitte sagen Sie mir, wie man dieses Kanji liest." },
      { japanese: "使い方が分かりません。", romaji: "Tsukaikata ga wakarimasen.", german: "Ich verstehe die Bedienung nicht." }
    ],
    notes: "方 wird als かた gelesen, wenn es 'Art und Weise' bedeutet. Das Ergebnis ist ein Nomen: 食べ方 (Art zu essen), 書き方 (Art zu schreiben).",
    related: []
  },
  {
    id: "te-connective",
    pattern: "～て (Verbindung)",
    level: "N5",
    category: "Verben",
    meaning: "Und dann / Und (Verbindung von Sätzen)",
    explanation: "Die て-Form kann Sätze verbinden und eine zeitliche Abfolge ausdrücken. Sie bedeutet 'und dann' oder 'und'. Das letzte Verb im Satz bestimmt die Zeitform.",
    formation: "Verb て-Form + nächste Handlung",
    examples: [
      { japanese: "朝起きて、顔を洗って、朝ごはんを食べます。", romaji: "Asa okite, kao o aratte, asagohan o tabemasu.", german: "Morgens stehe ich auf, wasche mir das Gesicht und frühstücke." },
      { japanese: "バスに乗って学校に行きます。", romaji: "Basu ni notte gakkō ni ikimasu.", german: "Ich nehme den Bus und fahre zur Schule." }
    ],
    notes: "Die て-Form zur Verbindung impliziert oft eine zeitliche Reihenfolge. Das letzte Verb im Satz bestimmt die Höflichkeitsstufe und Zeitform für den gesamten Satz.",
    related: ["te-form"]
  },
  {
    id: "nakutemo-ii",
    pattern: "～なくてもいい",
    level: "N5",
    category: "Verben",
    meaning: "Muss nicht / Braucht nicht zu...",
    explanation: "～なくてもいい drückt aus, dass es nicht nötig ist, etwas zu tun. Es ist das Gegenteil von ～なければならない. Die höfliche Form ist ～なくてもいいです.",
    formation: "Verb ない-Form (ohne い) + くてもいい",
    examples: [
      { japanese: "明日は来なくてもいいです。", romaji: "Ashita wa konakutemo ii desu.", german: "Du brauchst morgen nicht zu kommen." },
      { japanese: "全部食べなくてもいいですよ。", romaji: "Zenbu tabenakutemo ii desu yo.", german: "Du musst nicht alles aufessen." }
    ],
    notes: "Die Bildung: Verb ない-Form → ない wird zu なくて: 食べない → 食べなくてもいい. Nicht verwechseln mit ～てもいい (Erlaubnis).",
    related: ["temo-ii", "nakereba-naranai"]
  },
  {
    id: "te-miru",
    pattern: "～てみる",
    level: "N5",
    category: "Verben",
    meaning: "Etwas ausprobieren / Versuchen zu...",
    explanation: "～てみる bedeutet 'etwas ausprobieren' oder 'etwas versuchsweise tun'. Es drückt aus, dass man etwas zum ersten Mal oder testweise macht. Die höfliche Form ist ～てみます.",
    formation: "Verb て-Form + みる",
    examples: [
      { japanese: "この料理を食べてみてください。", romaji: "Kono ryōri o tabete mite kudasai.", german: "Probieren Sie bitte dieses Gericht." },
      { japanese: "日本語で話してみます。", romaji: "Nihongo de hanashite mimasu.", german: "Ich versuche mal, auf Japanisch zu sprechen." }
    ],
    notes: "てみる betont das Ausprobieren, nicht den Versuch im Sinne von Anstrengung. Für 'sich bemühen' verwendet man eher ～ようとする.",
    related: ["te-form"]
  },
  {
    id: "te-shimau",
    pattern: "～てしまう",
    level: "N5",
    category: "Verben",
    meaning: "Versehentlich tun / Vollständig tun",
    explanation: "～てしまう hat zwei Bedeutungen: etwas unbeabsichtigt oder bedaürlich tun, oder eine Handlung vollständig abschließen. Die höfliche Form ist ～てしまいます. In der Umgangssprache wird es zu ～ちゃう verkürzt.",
    formation: "Verb て-Form + しまう",
    examples: [
      { japanese: "財布を忘れてしまいました。", romaji: "Saifu o wasurete shimaimashita.", german: "Ich habe leider mein Portemonnaie vergessen." },
      { japanese: "本を全部読んでしまいました。", romaji: "Hon o zenbu yonde shimaimashita.", german: "Ich habe das Buch komplett ausgelesen." }
    ],
    notes: "Umgangssprachlich: ～てしまう → ～ちゃう (食べてしまう → 食べちゃう), ～でしまう → ～じゃう (飲んでしまう → 飲んじゃう).",
    related: ["te-form"]
  },

  // ============================================================
  // ADJEKTIVE (10)
  // ============================================================
  {
    id: "i-adj-present",
    pattern: "い-Adjektiv (Gegenwart)",
    level: "N5",
    category: "Adjektive",
    meaning: "い-Adjektiv in der Gegenwartsform",
    explanation: "い-Adjektive enden auf い und können direkt vor einem Nomen stehen oder als Prädikat verwendet werden. In der höflichen Prädikatsform wird です angehängt.",
    formation: "い-Adjektiv + です / い-Adjektiv + Nomen",
    examples: [
      { japanese: "この本はおもしろいです。", romaji: "Kono hon wa omoshiroi desu.", german: "Dieses Buch ist interessant." },
      { japanese: "大きい犬が好きです。", romaji: "Ōkii inu ga suki desu.", german: "Ich mag große Hunde." }
    ],
    notes: "きれい (schön) und 有名 (berühmt) sehen aus wie い-Adjektive, sind aber な-Adjektive! Das い gehört dort zum Wortstamm.",
    related: ["i-adj-negative", "i-adj-past", "i-adj-past-negative"]
  },
  {
    id: "i-adj-negative",
    pattern: "～くない",
    level: "N5",
    category: "Adjektive",
    meaning: "い-Adjektiv Verneinung",
    explanation: "Um ein い-Adjektiv zu verneinen, wird das い durch くない ersetzt. Die höfliche Form ist ～くないです oder ～くありません.",
    formation: "い-Adjektiv (ohne い) + くない(です)",
    examples: [
      { japanese: "今日は暑くないです。", romaji: "Kyō wa atsuku nai desu.", german: "Heute ist es nicht heiß." },
      { japanese: "この映画はおもしろくないです。", romaji: "Kono eiga wa omoshiroku nai desu.", german: "Dieser Film ist nicht interessant." }
    ],
    notes: "Ausnahme: いい (gut) → よくない (nicht gut). Das Adjektiv いい ändert sich in allen konjugierten Formen zu よ-.",
    related: ["i-adj-present", "i-adj-past", "i-adj-past-negative"]
  },
  {
    id: "i-adj-past",
    pattern: "～かった",
    level: "N5",
    category: "Adjektive",
    meaning: "い-Adjektiv Vergangenheit",
    explanation: "Für die Vergangenheitsform eines い-Adjektivs wird das い durch かった ersetzt. Die höfliche Form ist ～かったです.",
    formation: "い-Adjektiv (ohne い) + かった(です)",
    examples: [
      { japanese: "昨日は寒かったです。", romaji: "Kinō wa samukatta desu.", german: "Gestern war es kalt." },
      { japanese: "旅行は楽しかったです。", romaji: "Ryokō wa tanoshikatta desu.", german: "Die Reise war vergnüglich." }
    ],
    notes: "Ausnahme: いい (gut) → よかった (war gut). Merke: いい → よくない → よかった → よくなかった.",
    related: ["i-adj-present", "i-adj-negative", "i-adj-past-negative"]
  },
  {
    id: "i-adj-past-negative",
    pattern: "～くなかった",
    level: "N5",
    category: "Adjektive",
    meaning: "い-Adjektiv Vergangenheit (negativ)",
    explanation: "Für die verneinte Vergangenheitsform eines い-Adjektivs wird das い durch くなかった ersetzt. Die höfliche Form ist ～くなかったです.",
    formation: "い-Adjektiv (ohne い) + くなかった(です)",
    examples: [
      { japanese: "テストは難しくなかったです。", romaji: "Tesuto wa muzukashiku nakatta desu.", german: "Der Test war nicht schwer." },
      { japanese: "あまりおいしくなかったです。", romaji: "Amari oishiku nakatta desu.", german: "Es war nicht besonders lecker." }
    ],
    notes: "Ausnahme: いい (gut) → よくなかった (war nicht gut).",
    related: ["i-adj-present", "i-adj-negative", "i-adj-past"]
  },
  {
    id: "na-adj-present",
    pattern: "な-Adjektiv (Gegenwart)",
    level: "N5",
    category: "Adjektive",
    meaning: "な-Adjektiv in der Gegenwartsform",
    explanation: "な-Adjektive benötigen な, wenn sie direkt vor einem Nomen stehen. Als Prädikat werden sie wie Nomen mit です verwendet. Sie konjugieren nicht wie い-Adjektive.",
    formation: "な-Adjektiv + な + Nomen / な-Adjektiv + です",
    examples: [
      { japanese: "ここは静かです。", romaji: "Koko wa shizuka desu.", german: "Hier ist es ruhig." },
      { japanese: "元気な子供ですね。", romaji: "Genki na kodomo desu ne.", german: "Das ist ein lebhaftes Kind, nicht wahr?" }
    ],
    notes: "な-Adjektive verhalten sich wie Nomen bei der Konjugation: Sie verwenden じゃない, でした, じゃなかった statt Endungsänderungen.",
    related: ["na-adj-negative", "na-adj-past", "na-adj-past-negative"]
  },
  {
    id: "na-adj-negative",
    pattern: "な-Adjektiv + じゃない",
    level: "N5",
    category: "Adjektive",
    meaning: "な-Adjektiv Verneinung",
    explanation: "Um ein な-Adjektiv zu verneinen, wird じゃないです oder ではありません nach dem Adjektiv-Stamm verwendet. Die Konjugation ist identisch mit der Verneinung von Nomen.",
    formation: "な-Adjektiv + じゃないです / ではありません",
    examples: [
      { japanese: "この部屋はきれいじゃないです。", romaji: "Kono heya wa kirei ja nai desu.", german: "Dieses Zimmer ist nicht sauber." },
      { japanese: "日本語は簡単じゃありません。", romaji: "Nihongo wa kantan ja arimasen.", german: "Japanisch ist nicht einfach." }
    ],
    notes: "じゃないです ist umgangssprachlicher, ではありません ist formeller. Beide sind korrekt.",
    related: ["na-adj-present", "na-adj-past", "na-adj-past-negative", "ja-nai"]
  },
  {
    id: "na-adj-past",
    pattern: "な-Adjektiv + でした",
    level: "N5",
    category: "Adjektive",
    meaning: "な-Adjektiv Vergangenheit",
    explanation: "Für die Vergangenheitsform eines な-Adjektivs wird でした nach dem Adjektiv-Stamm verwendet. Die Konjugation ist identisch mit der Vergangenheitsform von Nomen.",
    formation: "な-Adjektiv + でした",
    examples: [
      { japanese: "パーティーはにぎやかでした。", romaji: "Pātī wa nigiyaka deshita.", german: "Die Party war lebhaft." },
      { japanese: "彼は元気でした。", romaji: "Kare wa genki deshita.", german: "Er war gesund / Es ging ihm gut." }
    ],
    notes: "Die Konjugation von な-Adjektiven folgt dem gleichen Muster wie bei Nomen + です/でした/じゃない/じゃなかった.",
    related: ["na-adj-present", "na-adj-negative", "na-adj-past-negative", "deshita"]
  },
  {
    id: "na-adj-past-negative",
    pattern: "な-Adjektiv + じゃなかった",
    level: "N5",
    category: "Adjektive",
    meaning: "な-Adjektiv Vergangenheit (negativ)",
    explanation: "Für die verneinte Vergangenheitsform eines な-Adjektivs wird じゃなかったです oder ではありませんでした verwendet.",
    formation: "な-Adjektiv + じゃなかったです / ではありませんでした",
    examples: [
      { japanese: "昨日は暇じゃなかったです。", romaji: "Kinō wa hima ja nakatta desu.", german: "Gestern hatte ich keine Freizeit." },
      { japanese: "あの店は有名じゃなかったです。", romaji: "Ano mise wa yūmei ja nakatta desu.", german: "Dieses Geschäft war nicht berühmt." }
    ],
    notes: "Auch hier gilt: じゃなかったです ist umgangssprachlicher, ではありませんでした ist formeller.",
    related: ["na-adj-present", "na-adj-negative", "na-adj-past", "ja-nakatta"]
  },
  {
    id: "ku-naru-ni-naru",
    pattern: "～くなる / ～になる",
    level: "N5",
    category: "Adjektive",
    meaning: "... werden (Veränderung)",
    explanation: "～くなる und ～になる drücken eine Veränderung des Zustands aus ('etwas wird zu etwas'). い-Adjektive verwenden ～くなる, な-Adjektive und Nomen verwenden ～になる.",
    formation: "い-Adj (ohne い) + くなる / な-Adj + になる / Nomen + になる",
    examples: [
      { japanese: "日本語が上手になりました。", romaji: "Nihongo ga jōzu ni narimashita.", german: "Mein Japanisch ist besser geworden." },
      { japanese: "最近寒くなりましたね。", romaji: "Saikin samuku narimashita ne.", german: "In letzter Zeit ist es kalt geworden, nicht wahr?" }
    ],
    notes: "くなる/になる beschreibt eine natürliche oder automatische Veränderung. Für absichtliche Veränderungen verwendet man くする/にする.",
    related: ["i-adj-present", "na-adj-present"]
  },
  {
    id: "no-ga-suki",
    pattern: "～のが好き / 上手 / 下手",
    level: "N5",
    category: "Adjektive",
    meaning: "Gern tun / Gut können / Schlecht können",
    explanation: "Mit ～のが können Verben nominalisiert werden, um sie mit Adjektiven wie 好き (mögen), 上手 (gut in), 下手 (schlecht in) zu kombinieren.",
    formation: "Verb (Wörterbuchform) + のが + 好き/上手/下手 + です",
    examples: [
      { japanese: "料理を作るのが好きです。", romaji: "Ryōri o tsukuru no ga suki desu.", german: "Ich koche gerne." },
      { japanese: "歌を歌うのが下手です。", romaji: "Uta o utau no ga heta desu.", german: "Ich bin schlecht im Singen." }
    ],
    notes: "上手 und 下手 verwendet man nicht für sich selbst in der höflichen Sprache. Für sich selbst sagt man eher 得意 (tokui, gut in) oder 苦手 (nigate, schlecht in).",
    related: ["no"]
  },

  // ============================================================
  // SATZSTRUKTUREN (32)
  // ============================================================
  {
    id: "desu",
    pattern: "～です",
    level: "N5",
    category: "Satzstrukturen",
    meaning: "Sein (höfliche Kopula)",
    explanation: "です ist die höfliche Form der Kopula und bedeutet 'sein'. Es wird nach Nomen und な-Adjektiven verwendet, um höfliche Aussagen zu machen.",
    formation: "Nomen + です / な-Adjektiv + です",
    examples: [
      { japanese: "私は田中です。", romaji: "Watashi wa Tanaka desu.", german: "Ich bin Tanaka." },
      { japanese: "これはペンです。", romaji: "Kore wa pen desu.", german: "Das ist ein Stift." }
    ],
    notes: "です wird nicht mit い-Adjektiven als Kopula verwendet – es wird nur zur Höflichkeit angehängt: 暑いです. Bei Verben wird ます verwendet, nicht です.",
    related: ["ja-nai", "deshita", "ja-nakatta"]
  },
  {
    id: "ja-nai",
    pattern: "～じゃない",
    level: "N5",
    category: "Satzstrukturen",
    meaning: "Ist nicht (Verneinung von です)",
    explanation: "～じゃないです oder ～ではありません ist die Verneinung von です. Es bedeutet 'ist nicht' oder 'bin nicht'. じゃない ist umgangssprachlicher, ではありません ist formeller.",
    formation: "Nomen + じゃないです / ではありません",
    examples: [
      { japanese: "学生じゃないです。", romaji: "Gakusei ja nai desu.", german: "Ich bin kein Student." },
      { japanese: "これは私のではありません。", romaji: "Kore wa watashi no dewa arimasen.", german: "Das gehört nicht mir." }
    ],
    notes: "じゃ ist die Kurzform von では. Beide Formen sind korrekt: じゃないです (Umgangssprache) und ではありません (formell).",
    related: ["desu", "deshita", "ja-nakatta"]
  },
  {
    id: "deshita",
    pattern: "～でした",
    level: "N5",
    category: "Satzstrukturen",
    meaning: "War (Vergangenheit von です)",
    explanation: "～でした ist die Vergangenheitsform von です. Es bedeutet 'war' oder 'waren'.",
    formation: "Nomen + でした / な-Adjektiv + でした",
    examples: [
      { japanese: "昨日は日曜日でした。", romaji: "Kinō wa nichiyōbi deshita.", german: "Gestern war Sonntag." },
      { japanese: "とても大変でした。", romaji: "Totemo taihen deshita.", german: "Es war sehr anstrengend." }
    ],
    notes: "でした wird für Nomen und な-Adjektive verwendet. Für い-Adjektive in der Vergangenheit wird ～かったです verwendet, nicht ～いでした.",
    related: ["desu", "ja-nai", "ja-nakatta"]
  },
  {
    id: "ja-nakatta",
    pattern: "～じゃなかった",
    level: "N5",
    category: "Satzstrukturen",
    meaning: "War nicht (Vergangenheit, negativ)",
    explanation: "～じゃなかったです oder ～ではありませんでした ist die verneinte Vergangenheitsform von です. Es bedeutet 'war nicht'.",
    formation: "Nomen + じゃなかったです / ではありませんでした",
    examples: [
      { japanese: "あの人は先生じゃなかったです。", romaji: "Ano hito wa sensei ja nakatta desu.", german: "Diese Person war kein Lehrer." },
      { japanese: "天気はいいではありませんでした。", romaji: "Tenki wa yoi dewa arimasen deshita.", german: "Das Wetter war nicht gut." }
    ],
    notes: "Die vier Formen bilden ein System: です → じゃない → でした → じゃなかった. Dieses System gilt für Nomen und な-Adjektive.",
    related: ["desu", "ja-nai", "deshita"]
  },
  {
    id: "n-desu",
    pattern: "～んです / ～のです",
    level: "N5",
    category: "Satzstrukturen",
    meaning: "Es ist so, dass... (Erklärung/Betonung)",
    explanation: "～んです wird verwendet, um eine Erklärung zu geben, nach einer Erklärung zu fragen oder eine Aussage zu betonen. Es signalisiert, dass der Sprecher den Kontext erklären möchte.",
    formation: "Verb/い-Adj + んです / な-Adj + なんです / Nomen + なんです",
    examples: [
      { japanese: "どうしたんですか。", romaji: "Dō shita n desu ka.", german: "Was ist los? / Was ist passiert?" },
      { japanese: "明日テストがあるんです。", romaji: "Ashita tesuto ga aru n desu.", german: "Es ist nämlich so, dass morgen ein Test ist." }
    ],
    notes: "んです (gesprochene Form) und のです (geschriebene Form) sind austauschbar. ～んですか klingt natürlicher als ～ますか, wenn man den Grund für etwas erfragt.",
    related: []
  },
  {
    id: "to-omoimasu",
    pattern: "～と思います",
    level: "N5",
    category: "Satzstrukturen",
    meaning: "Ich denke, dass...",
    explanation: "～と思います drückt die eigene Meinung oder Vermutung aus. Es entspricht dem deutschen 'Ich denke, dass...'. Für die Meinungen anderer verwendet man ～と思っています.",
    formation: "Satz (informelle Form) + と思います",
    examples: [
      { japanese: "明日は雨が降ると思います。", romaji: "Ashita wa ame ga furu to omoimasu.", german: "Ich denke, dass es morgen regnen wird." },
      { japanese: "この本はおもしろいと思います。", romaji: "Kono hon wa omoshiroi to omoimasu.", german: "Ich denke, dieses Buch ist interessant." }
    ],
    notes: "Vor と思います steht die informelle Form, nicht die ます-Form: 行くと思います (richtig), 行きますと思います (falsch).",
    related: ["deshou", "kamoshirenai"]
  },
  {
    id: "deshou",
    pattern: "～でしょう",
    level: "N5",
    category: "Satzstrukturen",
    meaning: "Wahrscheinlich / Vermutlich",
    explanation: "～でしょう drückt eine Vermutung aus und bedeutet 'wahrscheinlich' oder 'es wird wohl...'. Es ist weniger sicher als eine direkte Aussage, aber sicherer als かもしれない.",
    formation: "Verb/い-Adj (informelle Form) + でしょう / な-Adj/Nomen + でしょう",
    examples: [
      { japanese: "明日は暖かいでしょう。", romaji: "Ashita wa atatakai deshō.", german: "Morgen wird es wahrscheinlich warm sein." },
      { japanese: "彼はもう帰ったでしょう。", romaji: "Kare wa mō kaetta deshō.", german: "Er ist wohl schon nach Hause gegangen." }
    ],
    notes: "でしょう wird oft im Wetterbericht verwendet. Mit steigender Intonation (でしょう？) sucht man nach Bestätigung: そうでしょう？ (Nicht wahr?).",
    related: ["to-omoimasu", "kamoshirenai"]
  },
  {
    id: "kamoshirenai",
    pattern: "～かもしれない",
    level: "N5",
    category: "Satzstrukturen",
    meaning: "Vielleicht / Könnte sein, dass...",
    explanation: "～かもしれない drückt eine unsichere Vermutung aus. Es bedeutet 'vielleicht' oder 'es könnte sein, dass...'. Die höfliche Form ist ～かもしれません.",
    formation: "Verb/い-Adj (informelle Form) + かもしれない / な-Adj/Nomen + かもしれない",
    examples: [
      { japanese: "雨が降るかもしれません。", romaji: "Ame ga furu kamoshiremasen.", german: "Vielleicht wird es regnen." },
      { japanese: "あの人は日本人かもしれません。", romaji: "Ano hito wa nihonjin kamoshiremasen.", german: "Diese Person könnte Japaner sein." }
    ],
    notes: "Sicherheitsgrad: かもしれない (vielleicht, ~30%) < でしょう (wahrscheinlich, ~70%) < と思います (ich denke, persönliche Meinung).",
    related: ["deshou", "to-omoimasu"]
  },
  {
    id: "ga-aru",
    pattern: "～がある",
    level: "N5",
    category: "Satzstrukturen",
    meaning: "Es gibt (unbelebte Dinge)",
    explanation: "～がある wird verwendet, um die Existenz von unbelebten Dingen (Gegenstände, Pflanzen, Gebäude, Ereignisse) auszudrücken. Die höfliche Form ist ～があります.",
    formation: "Nomen + がある / があります",
    examples: [
      { japanese: "机の上に本があります。", romaji: "Tsukue no ue ni hon ga arimasu.", german: "Auf dem Tisch liegt ein Buch." },
      { japanese: "明日テストがあります。", romaji: "Ashita tesuto ga arimasu.", german: "Morgen gibt es einen Test." }
    ],
    notes: "ある wird für unbelebte Dinge verwendet, いる für belebte Wesen (Menschen, Tiere). Bei Veranstaltungen/Ereignissen wird auch ある verwendet.",
    related: ["ga-iru", "ga"]
  },
  {
    id: "ga-iru",
    pattern: "～がいる",
    level: "N5",
    category: "Satzstrukturen",
    meaning: "Es gibt (belebte Wesen)",
    explanation: "～がいる wird verwendet, um die Existenz von belebten Wesen (Menschen, Tiere) auszudrücken. Die höfliche Form ist ～がいます.",
    formation: "Nomen + がいる / がいます",
    examples: [
      { japanese: "公園に子供がいます。", romaji: "Kōen ni kodomo ga imasu.", german: "Im Park sind Kinder." },
      { japanese: "私は兄弟が三人います。", romaji: "Watashi wa kyōdai ga sannin imasu.", german: "Ich habe drei Geschwister." }
    ],
    notes: "Faustregel: Alles, was sich von selbst bewegen kann, verwendet いる. Pflanzen und Autos verwenden ある, obwohl sie 'lebendig' sind bzw. sich bewegen.",
    related: ["ga-aru", "ga"]
  },
  {
    id: "ga-hoshii",
    pattern: "～が欲しい",
    level: "N5",
    category: "Satzstrukturen",
    meaning: "Etwas haben wollen",
    explanation: "～が欲しい drückt den Wunsch aus, etwas zu besitzen oder zu bekommen. Es wird wie ein い-Adjektiv konjugiert und nur für die eigenen Wünsche verwendet.",
    formation: "Nomen + が欲しい(です)",
    examples: [
      { japanese: "新しいパソコンが欲しいです。", romaji: "Atarashii pasokon ga hoshii desu.", german: "Ich möchte einen neuen Computer." },
      { japanese: "何が欲しいですか。", romaji: "Nani ga hoshii desu ka.", german: "Was möchten Sie haben?" }
    ],
    notes: "欲しい ist für Dinge (Nomen), たい ist für Handlungen (Verben). Für andere Personen verwendet man ～欲しがっている.",
    related: ["tai"]
  },
  {
    id: "tsumori",
    pattern: "～つもり",
    level: "N5",
    category: "Satzstrukturen",
    meaning: "Vorhaben / Beabsichtigen",
    explanation: "～つもり drückt eine feste Absicht oder einen Plan aus. Es bedeutet 'Ich habe vor...' oder 'Ich beabsichtige...'. Die Verneinung kann auf zwei Arten gebildet werden.",
    formation: "Verb (Wörterbuchform) + つもりです / Verb ない-Form + つもりです",
    examples: [
      { japanese: "来年日本に行くつもりです。", romaji: "Rainen Nihon ni iku tsumori desu.", german: "Ich habe vor, nächstes Jahr nach Japan zu gehen." },
      { japanese: "もうお酒を飲まないつもりです。", romaji: "Mō osake o nomanai tsumori desu.", german: "Ich habe vor, keinen Alkohol mehr zu trinken." }
    ],
    notes: "つもり drückt eine persönliche Absicht aus. Für Pläne anderer verwendet man ～予定 (yotei) oder fragt direkt.",
    related: []
  },
  {
    id: "yori",
    pattern: "～より",
    level: "N5",
    category: "Satzstrukturen",
    meaning: "Als / Im Vergleich zu (Komparativ)",
    explanation: "～より wird für Vergleiche verwendet und markiert das, womit verglichen wird. Es entspricht dem deutschen 'als' in Vergleichen.",
    formation: "B + より + A + のほうが + Adjektiv",
    examples: [
      { japanese: "東京は大阪より大きいです。", romaji: "Tōkyō wa Ōsaka yori ōkii desu.", german: "Tokio ist größer als Osaka." },
      { japanese: "バスより電車のほうが速いです。", romaji: "Basu yori densha no hō ga hayai desu.", german: "Der Zug ist schneller als der Bus." }
    ],
    notes: "より markiert den 'Verlierer' im Vergleich. Die vollständige Struktur ist: B より A のほうが ～. Man kann auch nur より verwenden: 東京は大阪より大きい.",
    related: ["no-hou-ga", "ichiban"]
  },
  {
    id: "no-hou-ga",
    pattern: "～のほうが",
    level: "N5",
    category: "Satzstrukturen",
    meaning: "... ist mehr / ... ist eher (Komparativ)",
    explanation: "～のほうが markiert die bevorzugte oder hervorgehobene Seite in einem Vergleich. Es wird oft mit ～より kombiniert.",
    formation: "Nomen + のほうが + Adjektiv",
    examples: [
      { japanese: "夏より冬のほうが好きです。", romaji: "Natsu yori fuyu no hō ga suki desu.", german: "Ich mag den Winter lieber als den Sommer." },
      { japanese: "こっちのほうが安いです。", romaji: "Kocchi no hō ga yasui desu.", german: "Dieses hier ist billiger." }
    ],
    notes: "どちらのほうが (dochira no hō ga) wird als Frage verwendet: コーヒーとお茶とどちらのほうが好きですか。 (Was magst du lieber, Kaffee oder Tee?)",
    related: ["yori", "ichiban"]
  },
  {
    id: "ichiban",
    pattern: "～が一番",
    level: "N5",
    category: "Satzstrukturen",
    meaning: "Am meisten / Am besten (Superlativ)",
    explanation: "一番 (いちばん) bedeutet 'am meisten' oder 'Nummer eins' und wird für Superlative verwendet. Es steht vor dem Adjektiv.",
    formation: "(Nomen + の中で) + Nomen + が一番 + Adjektiv",
    examples: [
      { japanese: "果物の中でりんごが一番好きです。", romaji: "Kudamono no naka de ringo ga ichiban suki desu.", german: "Unter den Früchten mag ich Äpfel am liebsten." },
      { japanese: "日本で一番高い山は富士山です。", romaji: "Nihon de ichiban takai yama wa Fujisan desu.", german: "Der höchste Berg Japans ist der Fuji." }
    ],
    notes: "Für Fragen verwendet man: ～の中で何/どこ/誰が一番～ですか。 (Was/Wo/Wer ist am meisten ~?)",
    related: ["yori", "no-hou-ga"]
  },
  {
    id: "mada",
    pattern: "まだ～",
    level: "N5",
    category: "Satzstrukturen",
    meaning: "Noch / Noch nicht",
    explanation: "まだ bedeutet 'noch' oder 'immer noch'. Mit einer positiven Form bedeutet es 'noch/immer noch', mit einer negativen Form bedeutet es 'noch nicht'.",
    formation: "まだ + Verb/Adjektiv (positiv oder negativ)",
    examples: [
      { japanese: "まだ雨が降っています。", romaji: "Mada ame ga futte imasu.", german: "Es regnet immer noch." },
      { japanese: "まだ食べていません。", romaji: "Mada tabete imasen.", german: "Ich habe noch nicht gegessen." }
    ],
    notes: "Auf die Frage もう～ましたか (Haben Sie schon...?) antwortet man mit: はい、もう～ました (Ja, schon) oder いいえ、まだです (Nein, noch nicht).",
    related: ["mou"]
  },
  {
    id: "mou",
    pattern: "もう～",
    level: "N5",
    category: "Satzstrukturen",
    meaning: "Schon / Bereits / Nicht mehr",
    explanation: "もう bedeutet 'schon' oder 'bereits' mit positiver Form. Mit negativer Form bedeutet es 'nicht mehr'. Es drückt aus, dass eine Veränderung stattgefunden hat.",
    formation: "もう + Verb (positiv: schon / negativ: nicht mehr)",
    examples: [
      { japanese: "もう宿題をしました。", romaji: "Mō shukudai o shimashita.", german: "Ich habe die Hausaufgaben schon gemacht." },
      { japanese: "もう食べません。", romaji: "Mō tabemasen.", german: "Ich esse nicht mehr." }
    ],
    notes: "もう一度 (mō ichido) bedeutet 'noch einmal' – hier hat もう eine andere Bedeutung. もう und まだ sind Gegensatzpaare.",
    related: ["mada"]
  },
  {
    id: "dake",
    pattern: "～だけ",
    level: "N5",
    category: "Satzstrukturen",
    meaning: "Nur / Bloß",
    explanation: "～だけ bedeutet 'nur' oder 'bloß' und schränkt etwas ein. Es kann nach Nomen, Verben und Zahlen verwendet werden.",
    formation: "Nomen + だけ / Verb + だけ",
    examples: [
      { japanese: "水だけ飲みます。", romaji: "Mizu dake nomimasu.", german: "Ich trinke nur Wasser." },
      { japanese: "少しだけ食べました。", romaji: "Sukoshi dake tabemashita.", german: "Ich habe nur ein bisschen gegessen." }
    ],
    notes: "だけ schränkt neutral ein, しか～ない betont stärker das Wenige/Einzige (nur, bloß ... und sonst nichts).",
    related: ["shika-nai"]
  },
  {
    id: "shika-nai",
    pattern: "～しか～ない",
    level: "N5",
    category: "Satzstrukturen",
    meaning: "Nur / Nichts als (betont Begrenzung)",
    explanation: "～しか～ない bedeutet 'nur' und betont, dass etwas wenig oder begrenzt ist. Es wird immer mit der negativen Verbform verwendet und drückt oft Enttäuschung oder Bedaürn aus.",
    formation: "Nomen + しか + Verb (negativ)",
    examples: [
      { japanese: "百円しかありません。", romaji: "Hyaku-en shika arimasen.", german: "Ich habe nur hundert Yen." },
      { japanese: "日本語しか話せません。", romaji: "Nihongo shika hanasemasen.", german: "Ich kann nur Japanisch sprechen." }
    ],
    notes: "しか ersetzt は、が und を, wird aber zu anderen Partikeln hinzugefügt: にしか、でしか. Unterschied zu だけ: しか betont die Begrenzung stärker.",
    related: ["dake"]
  },
  {
    id: "toki",
    pattern: "～時",
    level: "N5",
    category: "Satzstrukturen",
    meaning: "Wenn / Als (zeitlich)",
    explanation: "～時 (とき) bedeutet 'wenn' oder 'als' und gibt einen Zeitpunkt oder Zeitraum an. Es kann mit Verben, Adjektiven und Nomen verwendet werden.",
    formation: "Verb (Wörterbuch-/た-Form) + 時 / い-Adj + 時 / な-Adj + な + 時 / Nomen + の + 時",
    examples: [
      { japanese: "日本に行った時、たくさん写真を撮りました。", romaji: "Nihon ni itta toki, takusan shashin o torimashita.", german: "Als ich nach Japan ging, habe ich viele Fotos gemacht." },
      { japanese: "暇な時、何をしますか。", romaji: "Hima na toki, nani o shimasu ka.", german: "Was machen Sie, wenn Sie frei haben?" }
    ],
    notes: "Wörterbuchform + 時 = 'wenn/als man etwas tun wird'; た-Form + 時 = 'nachdem man etwas getan hat'. Der Unterschied ist subtil und kontextabhängig.",
    related: ["tara"]
  },
  {
    id: "tara",
    pattern: "～たら",
    level: "N5",
    category: "Satzstrukturen",
    meaning: "Wenn / Falls / Nachdem",
    explanation: "～たら drückt eine Bedingung aus: 'Wenn/Falls A passiert, dann B'. Es kann auch 'nachdem' bedeuten. Die Form wird aus der た-Form + ら gebildet.",
    formation: "Verb た-Form + ら / い-Adj → ～かったら / な-Adj/Nomen → だったら",
    examples: [
      { japanese: "雨が降ったら、家にいます。", romaji: "Ame ga futtara, ie ni imasu.", german: "Wenn es regnet, bleibe ich zu Hause." },
      { japanese: "安かったら買います。", romaji: "Yasukattara kaimasu.", german: "Wenn es billig ist, kaufe ich es." }
    ],
    notes: "たら ist die vielseitigste Konditionalform. Sie kann für hypothetische und reale Bedingungen verwendet werden. Im Gegensatz zu ～と wird たら auch für einmalige Situationen verwendet.",
    related: ["toki"]
  },
  {
    id: "ga-but",
    pattern: "～が (aber)",
    level: "N5",
    category: "Satzstrukturen",
    meaning: "Aber / Jedoch",
    explanation: "が wird als Konjunktion verwendet, um zwei Sätze mit gegensätzlichem oder ergänzendem Inhalt zu verbinden. Es bedeutet 'aber' oder 'jedoch'. Nicht verwechseln mit der Subjektpartikel が.",
    formation: "Satz 1 + が、+ Satz 2",
    examples: [
      { japanese: "日本語は難しいですが、おもしろいです。", romaji: "Nihongo wa muzukashii desu ga, omoshiroi desu.", german: "Japanisch ist schwer, aber interessant." },
      { japanese: "すみませんが、もう一度言ってください。", romaji: "Sumimasen ga, mō ichido itte kudasai.", german: "Entschuldigung, aber bitte sagen Sie es noch einmal." }
    ],
    notes: "が als Konjunktion ist formeller als けど. Es wird oft für höfliche Einleitungen verwendet: ～ですが... (Es ist so, dass... aber...).",
    related: ["kedo"]
  },
  {
    id: "kedo",
    pattern: "～けど / ～けれども",
    level: "N5",
    category: "Satzstrukturen",
    meaning: "Aber / Obwohl (umgangssprachlich)",
    explanation: "～けど ist die umgangssprachliche Version von が (aber). Die formellere Form ist ～けれども. Es verbindet zwei Sätze mit kontrastierendem Inhalt.",
    formation: "Satz 1 (informell) + けど、+ Satz 2",
    examples: [
      { japanese: "高いけど、おいしいです。", romaji: "Takai kedo, oishii desu.", german: "Es ist teuer, aber lecker." },
      { japanese: "行きたいけど、時間がありません。", romaji: "Ikitai kedo, jikan ga arimasen.", german: "Ich möchte gehen, aber ich habe keine Zeit." }
    ],
    notes: "Formalitätsgrad: けど (am lockersten) → けれど → けれども (formell) → が (am formellsten). けど kann auch am Satzende stehen und den Satz offen lassen.",
    related: ["ga-but"]
  },
  {
    id: "kara-because",
    pattern: "～から (weil)",
    level: "N5",
    category: "Satzstrukturen",
    meaning: "Weil / Deshalb",
    explanation: "から nach einem Verb oder Adjektiv bedeutet 'weil'. Es gibt den Grund für die im Hauptsatz beschriebene Handlung an. Der Grund steht vor から.",
    formation: "Satz (Grund) + から、+ Satz (Folge)",
    examples: [
      { japanese: "暑いから、窓を開けましょう。", romaji: "Atsui kara, mado o akemashō.", german: "Weil es heiß ist, lasst uns das Fenster öffnen." },
      { japanese: "明日テストがありますから、今日勉強します。", romaji: "Ashita tesuto ga arimasu kara, kyō benkyō shimasu.", german: "Weil morgen ein Test ist, lerne ich heute." }
    ],
    notes: "から (weil) ist subjektiver als ので. から kann auch am Satzende stehen, um eine Begründung nachzuschieben: 行きません。高いですから。",
    related: ["node", "kara"]
  },
  {
    id: "node",
    pattern: "～ので",
    level: "N5",
    category: "Satzstrukturen",
    meaning: "Weil / Da (höflicher als から)",
    explanation: "～ので gibt einen Grund an und ist höflicher und objektiver als から. Es wird häufig in formelleren Situationen oder schriftlich verwendet.",
    formation: "Verb/い-Adj (informelle Form) + ので / な-Adj + なので / Nomen + なので",
    examples: [
      { japanese: "病気なので、休みます。", romaji: "Byōki na node, yasumimasu.", german: "Da ich krank bin, mache ich Pause." },
      { japanese: "電車が遅れたので、遅刻しました。", romaji: "Densha ga okureta node, chikoku shimashita.", german: "Da der Zug Verspätung hatte, bin ich zu spät gekommen." }
    ],
    notes: "ので klingt höflicher und weniger direkt als から. Bei Bitten und Entschuldigungen ist ので bevorzugt. Vor ので steht die informelle Form (na-Adj + なので).",
    related: ["kara-because"]
  },
  {
    id: "noni",
    pattern: "～のに",
    level: "N5",
    category: "Satzstrukturen",
    meaning: "Obwohl / Trotzdem",
    explanation: "～のに drückt einen Widerspruch oder Enttäuschung aus. Es bedeutet 'obwohl' oder 'trotzdem' und zeigt, dass das Ergebnis anders ist als erwartet.",
    formation: "Verb/い-Adj (informelle Form) + のに / な-Adj + なのに / Nomen + なのに",
    examples: [
      { japanese: "たくさん勉強したのに、テストに落ちました。", romaji: "Takusan benkyō shita noni, tesuto ni ochimashita.", german: "Obwohl ich viel gelernt habe, bin ich beim Test durchgefallen." },
      { japanese: "約束したのに、来ませんでした。", romaji: "Yakusoku shita noni, kimasen deshita.", german: "Obwohl er es versprochen hat, ist er nicht gekommen." }
    ],
    notes: "のに drückt oft Enttäuschung oder Frustration aus. Es ist subjektiver als けれども und impliziert, dass das Ergebnis unerwünscht ist.",
    related: ["kedo", "ga-but"]
  },
  {
    id: "nakereba-naranai",
    pattern: "～なければならない",
    level: "N5",
    category: "Satzstrukturen",
    meaning: "Müssen / Es ist notwendig zu...",
    explanation: "～なければならない bedeutet 'müssen' oder 'es muss getan werden'. Es drückt eine Pflicht oder Notwendigkeit aus. Es gibt mehrere Kurzformen davon.",
    formation: "Verb ない-Form (ohne い) + ければならない",
    examples: [
      { japanese: "毎日薬を飲まなければなりません。", romaji: "Mainichi kusuri o nomanakereba narimasen.", german: "Ich muss jeden Tag Medikamente nehmen." },
      { japanese: "宿題をしなければなりません。", romaji: "Shukudai o shinakereba narimasen.", german: "Ich muss Hausaufgaben machen." }
    ],
    notes: "Kurzformen: ～なければならない → ～なければいけない → ～なきゃいけない → ～なきゃ (am kürzesten, Umgangssprache). Alle haben die gleiche Bedeutung.",
    related: ["tewa-ikemasen", "nakutemo-ii"]
  },
  {
    id: "donna",
    pattern: "どんな",
    level: "N5",
    category: "Satzstrukturen",
    meaning: "Was für ein / Welche Art von",
    explanation: "どんな ist ein Fragewort, das nach der Art oder Eigenschaft fragt. Es steht direkt vor einem Nomen und bedeutet 'Was für ein...?' oder 'Welche Art von...?'.",
    formation: "どんな + Nomen",
    examples: [
      { japanese: "どんな音楽が好きですか。", romaji: "Donna ongaku ga suki desu ka.", german: "Was für Musik mögen Sie?" },
      { japanese: "どんな人ですか。", romaji: "Donna hito desu ka.", german: "Was für eine Person ist er/sie?" }
    ],
    notes: "どんな gehört zur こそあど-Reihe: こんな (so eine wie diese hier), そんな (so eine wie die da), あんな (so eine wie jene dort), どんな (was für eine?).",
    related: []
  },
  {
    id: "counters",
    pattern: "数え方 (Zählwörter)",
    level: "N5",
    category: "Satzstrukturen",
    meaning: "Zählwörter / Zähleinheitswörter",
    explanation: "Im Japanischen werden Zählwörter (Suffixe) nach Zahlen verwendet, abhängig von der Form oder Art des gezählten Objekts. Die wichtigsten N5-Zählwörter sind ～つ (allgemein), ～人 (Personen), ～本 (lange Dinge), ～枚 (flache Dinge), ～匹 (kleine Tiere), ～台 (Maschinen/Fahrzeuge).",
    formation: "Zahl + Zählwort + の + Nomen / Nomen + を + Zahl + Zählwort + Verb",
    examples: [
      { japanese: "りんごを三つください。", romaji: "Ringo o mittsu kudasai.", german: "Drei Äpfel bitte." },
      { japanese: "学生が五人います。", romaji: "Gakusei ga gonin imasu.", german: "Es gibt fünf Studenten." }
    ],
    notes: "～つ (hitotsu, futatsu...) ist das allgemeine Zählwort und funktioniert bis 10. Danach benutzt man das spezifische Zählwort. Die Zahlen ändern sich bei manchen Zählwörtern: 三本 = さんぼん, 一匹 = いっぴき.",
    related: []
  },
  {
    id: "hou-ga-ii",
    pattern: "～ほうがいい",
    level: "N5",
    category: "Satzstrukturen",
    meaning: "Sollte / Es wäre besser zu...",
    explanation: "～ほうがいい wird verwendet, um einen Ratschlag zu geben. Es bedeutet 'Du solltest...' oder 'Es wäre besser, wenn...'. Für positive Ratschläge verwendet man die た-Form, für negative die ない-Form.",
    formation: "Verb た-Form + ほうがいい (sollte tun) / Verb ない-Form + ほうがいい (sollte nicht tun)",
    examples: [
      { japanese: "もっと野菜を食べたほうがいいですよ。", romaji: "Motto yasai o tabeta hō ga ii desu yo.", german: "Du solltest mehr Gemüse essen." },
      { japanese: "夜遅く食べないほうがいいです。", romaji: "Yoru osoku tabenai hō ga ii desu.", german: "Du solltest spät abends nicht essen." }
    ],
    notes: "Positive Ratschläge: た-Form + ほうがいい. Negative Ratschläge: ない-Form + ほうがいい. Diese Form kann direkt klingen – bei Vorgesetzten besser ～たらどうですか verwenden.",
    related: ["yori", "no-hou-ga"]
  },
  {
    id: "temo",
    pattern: "～ても / ～でも",
    level: "N5",
    category: "Satzstrukturen",
    meaning: "Auch wenn / Selbst wenn",
    explanation: "～ても drückt aus, dass etwas trotz einer bestimmten Bedingung gilt. Es bedeutet 'auch wenn' oder 'selbst wenn'. Das Ergebnis ändert sich nicht, egal ob die Bedingung eintritt.",
    formation: "Verb て-Form + も / い-Adj (～くても) / な-Adj (～でも) / Nomen (～でも)",
    examples: [
      { japanese: "雨が降っても行きます。", romaji: "Ame ga futte mo ikimasu.", german: "Auch wenn es regnet, gehe ich." },
      { japanese: "高くても買いたいです。", romaji: "Takakutemo kaitai desu.", german: "Selbst wenn es teuer ist, möchte ich es kaufen." }
    ],
    notes: "い-Adjektive: 高い → 高くても. な-Adjektive: 静か → 静かでも. Nomen: 雨 → 雨でも. Nicht verwechseln mit ～てもいい (Erlaubnis).",
    related: ["temo-ii", "noni"]
  },
  {
    id: "no-wa-desu",
    pattern: "～のは～です",
    level: "N5",
    category: "Satzstrukturen",
    meaning: "Das ... ist ... (Nominalisierung)",
    explanation: "～のは～です nominalisiert einen Satzteil mit の und macht ihn zum Thema. Es ermöglicht, über Handlungen oder Situationen als Nomen zu sprechen. Es wird oft für Erklärungen und Definitionen verwendet.",
    formation: "Verb/Satz + のは + Nomen/Adjektiv + です",
    examples: [
      { japanese: "日本語を勉強するのは楽しいです。", romaji: "Nihongo o benkyō suru no wa tanoshii desu.", german: "Japanisch zu lernen ist vergnüglich." },
      { japanese: "朝早く起きるのは大変です。", romaji: "Asa hayaku okiru no wa taihen desu.", german: "Früh morgens aufzustehen ist anstrengend." }
    ],
    notes: "の wandelt einen Satz in ein Nomen um. Ähnliche Konstruktionen: ～のが好き (gerne tun), ～のを忘れる (vergessen zu tun).",
    related: ["no", "no-ga-suki"]
  },
  // ============================================================
  // N4 – PARTIKEL (12)
  // ============================================================
  {
    id: "n4-bakari-p",
    pattern: "～ばかり",
    level: "N4",
    category: "Partikel",
    meaning: "Nur, nichts als",
    explanation: "ばかり drückt aus, dass jemand ausschließlich oder übermäßig etwas tut.",
    formation: "Verb (て-Form) + ばかり / Nomen + ばかり",
    examples: [
      { japanese: "彼はゲームばかりしている。", romaji: "Kare wa gēmu bakari shiteiru.", german: "Er spielt nichts als Spiele." },
      { japanese: "甘いものばかり食べないで。", romaji: "Amai mono bakari tabenaide.", german: "Iss nicht nur Süßes." }
    ],
    notes: "Mit た-Form bedeutet es 'gerade erst': 来たばかり = gerade erst angekommen.",
    related: ["n4-dake", "n4-shika-nai"]
  },
  {
    id: "n4-sae",
    pattern: "～さえ",
    level: "N4",
    category: "Partikel",
    meaning: "Sogar, selbst",
    explanation: "さえ betont einen extremen Fall und impliziert, dass alles andere selbstverständlich ist.",
    formation: "Nomen + さえ / Verb (ます-Stamm) + さえする",
    examples: [
      { japanese: "子供でさえ知っている。", romaji: "Kodomo de sae shitteiru.", german: "Sogar Kinder wissen das." },
      { japanese: "名前さえ覚えていない。", romaji: "Namae sae oboeteinai.", german: "Ich erinnere mich nicht einmal an den Namen." }
    ],
    notes: "さえ～ば bedeutet 'wenn nur/solange': お金さえあれば = Wenn ich nur Geld hätte.",
    related: ["mo"]
  },
  {
    id: "n4-koso",
    pattern: "～こそ",
    level: "N4",
    category: "Partikel",
    meaning: "Gerade, genau (Betonung)",
    explanation: "こそ ist eine emphatische Partikel, die das vorangehende Wort besonders hervorhebt.",
    formation: "Nomen + こそ",
    examples: [
      { japanese: "こちらこそよろしくお願いします。", romaji: "Kochira koso yoroshiku onegai shimasu.", german: "Ganz meinerseits, freut mich." },
      { japanese: "今年こそ合格したい。", romaji: "Kotoshi koso gōkaku shitai.", german: "Dieses Jahr will ich unbedingt bestehen." }
    ],
    notes: "Sehr häufig: こちらこそ (ganz meinerseits).",
    related: ["wa"]
  },
  {
    id: "n4-hodo-p",
    pattern: "～ほど",
    level: "N4",
    category: "Partikel",
    meaning: "So sehr dass; Ausmaß",
    explanation: "ほど drückt den Grad oder das Ausmaß aus. Oft in Vergleichen und mit ～ば～ほど (je mehr desto).",
    formation: "Verb (辞書形) + ほど / Nomen + ほど",
    examples: [
      { japanese: "泣きたいほど嬉しかった。", romaji: "Nakitai hodo ureshikatta.", german: "Ich war so glücklich, dass ich weinen wollte." },
      { japanese: "勉強すればするほど面白い。", romaji: "Benkyō sureba suru hodo omoshiroi.", german: "Je mehr man lernt, desto interessanter wird es." }
    ],
    notes: "～ば～ほど = je mehr desto. Verneinung: ～ほど～ない = nicht so ... wie.",
    related: ["n4-ba"]
  },
  {
    id: "n4-zutsu",
    pattern: "～ずつ",
    level: "N4",
    category: "Partikel",
    meaning: "Jeweils, nach und nach",
    explanation: "ずつ drückt gleiche Verteilung oder allmähliche Veränderung aus.",
    formation: "Zahl/Menge + ずつ",
    examples: [
      { japanese: "毎日少しずつ勉強しています。", romaji: "Mainichi sukoshi zutsu benkyō shiteimasu.", german: "Ich lerne jeden Tag ein bisschen." },
      { japanese: "一人に二つずつ配ってください。", romaji: "Hitori ni futatsu zutsu kubatte kudasai.", german: "Verteilen Sie bitte jeweils zwei pro Person." }
    ],
    notes: "少しずつ (nach und nach) ist besonders häufig.",
    related: []
  },
  {
    id: "n4-nado",
    pattern: "～など",
    level: "N4",
    category: "Partikel",
    meaning: "Und so weiter, wie zum Beispiel",
    explanation: "など listet Beispiele auf und impliziert, dass es weitere gibt. Formeller als とか.",
    formation: "Nomen + など",
    examples: [
      { japanese: "りんごやバナナなどの果物が好きです。", romaji: "Ringo ya banana nado no kudamono ga suki desu.", german: "Ich mag Früchte wie Äpfel und Bananen." },
      { japanese: "私などまだまだです。", romaji: "Watashi nado mada mada desu.", german: "Jemand wie ich hat noch einen weiten Weg." }
    ],
    notes: "Informelle Variante: なんか. Oft mit や: AやBなど.",
    related: ["ya", "n4-toka"]
  },
  {
    id: "n4-toshite",
    pattern: "～として",
    level: "N4",
    category: "Partikel",
    meaning: "Als, in der Rolle von",
    explanation: "として gibt an, in welcher Funktion oder Eigenschaft jemand betrachtet wird.",
    formation: "Nomen + として",
    examples: [
      { japanese: "留学生として日本に来ました。", romaji: "Ryūgakusei toshite Nihon ni kimashita.", german: "Ich bin als Austauschstudent nach Japan gekommen." },
      { japanese: "この町は観光地として有名です。", romaji: "Kono machi wa kankōchi toshite yūmei desu.", german: "Diese Stadt ist als Touristenort berühmt." }
    ],
    notes: "Häufig bei Berufs- und Rollenbezeichnungen.",
    related: []
  },
  {
    id: "n4-ni-taishite",
    pattern: "～に対して",
    level: "N4",
    category: "Partikel",
    meaning: "Gegenüber, im Gegensatz zu",
    explanation: "に対して drückt aus, auf wen sich eine Handlung richtet, oder einen Kontrast zwischen zwei Dingen.",
    formation: "Nomen + に対して",
    examples: [
      { japanese: "お客様に対して丁寧に話してください。", romaji: "Okyakusama ni taishite teinei ni hanashite kudasai.", german: "Sprechen Sie bitte höflich gegenüber den Kunden." },
      { japanese: "兄はスポーツが好きなのに対して、弟は読書が好きだ。", romaji: "Ani wa supōtsu ga suki na no ni taishite, otōto wa dokusho ga suki da.", german: "Der ältere Bruder mag Sport, der jüngere hingegen Lesen." }
    ],
    notes: "Vor Nomen: ～に対する + Nomen (z.B. 学生に対する態度).",
    related: ["ni"]
  },
  {
    id: "n4-ni-totte",
    pattern: "～にとって",
    level: "N4",
    category: "Partikel",
    meaning: "Für (aus der Sicht von)",
    explanation: "にとって drückt aus, aus wessen Perspektive etwas beurteilt wird.",
    formation: "Nomen + にとって",
    examples: [
      { japanese: "私にとって家族が一番大切です。", romaji: "Watashi ni totte kazoku ga ichiban taisetsu desu.", german: "Für mich ist die Familie am wichtigsten." },
      { japanese: "外国人にとって漢字は難しい。", romaji: "Gaikokujin ni totte kanji wa muzukashii.", german: "Für Ausländer sind Kanji schwierig." }
    ],
    notes: "Nicht verwechseln mit ～のために (zum Zweck von). にとって = subjektive Perspektive.",
    related: ["ni"]
  },
  {
    id: "n4-ni-yotte",
    pattern: "～によって",
    level: "N4",
    category: "Partikel",
    meaning: "Durch, mittels; je nach",
    explanation: "によって hat mehrere Bedeutungen: Mittel (durch), Urheber im Passiv (von), Unterschied je nach Situation.",
    formation: "Nomen + によって",
    examples: [
      { japanese: "この小説は夏目漱石によって書かれた。", romaji: "Kono shōsetsu wa Natsume Sōseki ni yotte kakareta.", german: "Dieser Roman wurde von Natsume Sōseki geschrieben." },
      { japanese: "国によって文化が違います。", romaji: "Kuni ni yotte bunka ga chigaimasu.", german: "Je nach Land ist die Kultur unterschiedlich." }
    ],
    notes: "Vor Nomen: ～による + Nomen. ～によると = laut/gemäß.",
    related: ["n4-rareru", "n4-ni-yoru-to"]
  },
  {
    id: "n4-no-you-ni",
    pattern: "～のように / ～みたいに",
    level: "N4",
    category: "Partikel",
    meaning: "Wie, so wie, ähnlich wie",
    explanation: "のように (formell) und みたいに (informell) drücken einen Vergleich aus.",
    formation: "Nomen + のように / Nomen + みたいに",
    examples: [
      { japanese: "鳥のように空を飛びたい。", romaji: "Tori no yō ni sora o tobitai.", german: "Ich möchte wie ein Vogel fliegen." },
      { japanese: "子供みたいに遊んでいる。", romaji: "Kodomo mitai ni asondeiru.", german: "Er spielt wie ein Kind." }
    ],
    notes: "Vor Nomen: のような/みたいな: 夢のような話 = eine traumhafte Geschichte.",
    related: ["n4-you-da", "n4-mitai-da"]
  },
  {
    id: "n4-dake-de-naku",
    pattern: "～だけでなく",
    level: "N4",
    category: "Partikel",
    meaning: "Nicht nur ... sondern auch",
    explanation: "だけでなく drückt aus, dass nicht nur eine Sache zutrifft, sondern auch eine weitere.",
    formation: "Nomen/Verb/Adj + だけでなく ～も",
    examples: [
      { japanese: "日本語だけでなく中国語も話せます。", romaji: "Nihongo dake de naku chūgokugo mo hanasemasu.", german: "Ich kann nicht nur Japanisch, sondern auch Chinesisch." },
      { japanese: "安いだけでなく、おいしいです。", romaji: "Yasui dake de naku, oishii desu.", german: "Es ist nicht nur günstig, sondern auch lecker." }
    ],
    notes: "Informell: ～だけじゃなくて. Formell: ～のみならず.",
    related: ["n4-dake", "mo"]
  },
  // ============================================================
  // N4 – VERBEN (36)
  // ============================================================
  {
    id: "n4-rareru",
    pattern: "～られる / ～れる",
    level: "N4",
    category: "Verben",
    meaning: "Passivform",
    explanation: "Die Passivform drückt aus, dass das Subjekt eine Handlung erleidet. Im Japanischen gibt es auch das 'Leidenspaßiv' (迷惑の受身).",
    formation: "Ichidan: ～られる / Godan: ～あれる (u→areru)",
    examples: [
      { japanese: "先生に褒められた。", romaji: "Sensei ni homerareta.", german: "Ich wurde vom Lehrer gelobt." },
      { japanese: "電車で足を踏まれた。", romaji: "Densha de ashi o fumareta.", german: "Mir wurde im Zug auf den Fuß getreten." },
      { japanese: "雨に降られた。", romaji: "Ame ni furareta.", german: "Ich wurde vom Regen überrascht." }
    ],
    notes: "Godan: 書く→書かれる, 読む→読まれる. Ichidan: 食べる→食べられる. する→される, 来る→来られる.",
    related: ["n4-saseru", "n4-ni-yotte"]
  },
  {
    id: "n4-saseru",
    pattern: "～させる / ～せる",
    level: "N4",
    category: "Verben",
    meaning: "Kausativform (lassen/veranlassen)",
    explanation: "Die Kausativform drückt aus, dass jemand eine andere Person etwas tun lässt oder dazu veranlasst.",
    formation: "Ichidan: ～させる / Godan: ～あせる (u→aseru)",
    examples: [
      { japanese: "母は子供に野菜を食べさせた。", romaji: "Haha wa kodomo ni yasai o tabesaseta.", german: "Die Mutter ließ das Kind Gemüse essen." },
      { japanese: "先生は学生を立たせた。", romaji: "Sensei wa gakusei o tataseta.", german: "Der Lehrer ließ die Schüler aufstehen." }
    ],
    notes: "Godan: 書く→書かせる, 読む→読ませる. Ichidan: 食べる→食べさせる. する→させる, 来る→来させる.",
    related: ["n4-rareru", "n4-saserareru", "n4-sasetekudasai"]
  },
  {
    id: "n4-saserareru",
    pattern: "～させられる",
    level: "N4",
    category: "Verben",
    meaning: "Kausativ-Passiv (gezwungen werden zu)",
    explanation: "Kombination aus Kausativ und Passiv. Drückt aus, dass man gezwungen wird, etwas zu tun.",
    formation: "Ichidan: ～させられる / Godan: ～あせられる",
    examples: [
      { japanese: "嫌いな野菜を食べさせられた。", romaji: "Kirai na yasai o tabesaserareta.", german: "Ich wurde gezwungen, Gemüse zu essen, das ich nicht mag." },
      { japanese: "毎日残業させられている。", romaji: "Mainichi zangyō saserareteiru.", german: "Ich werde jeden Tag zu Überstunden gezwungen." }
    ],
    notes: "Godan-Kurzform: ～される (z.B. 行かされる statt 行かせられる).",
    related: ["n4-rareru", "n4-saseru"]
  },
  {
    id: "n4-potential",
    pattern: "～える / ～られる",
    level: "N4",
    category: "Verben",
    meaning: "Potentialform (können)",
    explanation: "Die Potentialform drückt Fähigkeit oder Möglichkeit aus. Das Objekt wird oft mit が statt を markiert.",
    formation: "Ichidan: ～られる / Godan: u→eru",
    examples: [
      { japanese: "日本語が話せます。", romaji: "Nihongo ga hanasemasu.", german: "Ich kann Japanisch sprechen." },
      { japanese: "この漢字が読めますか。", romaji: "Kono kanji ga yomemasu ka.", german: "Können Sie dieses Kanji lesen?" },
      { japanese: "明日来られますか。", romaji: "Ashita koraremasu ka.", german: "Können Sie morgen kommen?" }
    ],
    notes: "Godan: 書く→書ける, 読む→読める. Ichidan: 食べる→食べられる. する→できる, 来る→来られる. Umgangssprache: 食べれる (ra-Wegfall).",
    related: ["n4-koto-ga-dekiru"]
  },
  {
    id: "n4-volitional",
    pattern: "～よう / ～おう",
    level: "N4",
    category: "Verben",
    meaning: "Volitionalform (lass uns / ich will)",
    explanation: "Die Volitionalform drückt Absicht, Vorschlag oder Aufforderung aus. Entspricht 'Lass uns...' oder 'Ich will...'.",
    formation: "Ichidan: ～よう / Godan: u→ō",
    examples: [
      { japanese: "映画を見よう。", romaji: "Eiga o miyō.", german: "Lass uns einen Film schaün." },
      { japanese: "明日早く起きようと思う。", romaji: "Ashita hayaku okiyō to omou.", german: "Ich denke, ich werde morgen früh aufstehen." }
    ],
    notes: "Godan: 書く→書こう, 読む→読もう. する→しよう, 来る→来よう. ～ようと思う = ich beabsichtige.",
    related: ["n4-you-ni-suru", "mashou"]
  },
  {
    id: "n4-teshimau",
    pattern: "～てしまう",
    level: "N4",
    category: "Verben",
    meaning: "Unbeabsichtigt tun / vollständig tun",
    explanation: "てしまう drückt entweder Bedaürn über eine unbeabsichtigte Handlung oder die Vollendung einer Handlung aus.",
    formation: "Verb (て-Form) + しまう",
    examples: [
      { japanese: "財布を忘れてしまった。", romaji: "Saifu o wasurete shimatta.", german: "Ich habe leider mein Portemonnaie vergessen." },
      { japanese: "本を全部読んでしまった。", romaji: "Hon o zenbu yonde shimatta.", german: "Ich habe das Buch komplett durchgelesen." }
    ],
    notes: "Umgangssprache: ～ちゃう/～じゃう (食べちゃった, 飲んじゃった).",
    related: ["te-form"]
  },
  {
    id: "n4-teoku",
    pattern: "～ておく",
    level: "N4",
    category: "Verben",
    meaning: "Im Voraus tun, vorbereiten",
    explanation: "ておく drückt aus, dass eine Handlung als Vorbereitung oder im Voraus ausgeführt wird.",
    formation: "Verb (て-Form) + おく",
    examples: [
      { japanese: "パーティーの前に料理を作っておく。", romaji: "Pātī no mae ni ryōri o tsukutte oku.", german: "Ich koche vor der Party vor." },
      { japanese: "明日のために準備しておいてください。", romaji: "Ashita no tame ni junbi shite oite kudasai.", german: "Bitte bereiten Sie für morgen vor." }
    ],
    notes: "Umgangssprache: ～とく (買っとく = kaufen und bereithalten).",
    related: ["te-form"]
  },
  {
    id: "n4-temiru",
    pattern: "～てみる",
    level: "N4",
    category: "Verben",
    meaning: "Etwas versuchen / ausprobieren",
    explanation: "てみる drückt aus, dass man etwas ausprobiert oder versucht, um zu sehen, wie es ist.",
    formation: "Verb (て-Form) + みる",
    examples: [
      { japanese: "日本料理を食べてみたい。", romaji: "Nihon ryōri o tabete mitai.", german: "Ich möchte japanisches Essen probieren." },
      { japanese: "一度やってみてください。", romaji: "Ichido yatte mite kudasai.", german: "Probieren Sie es bitte einmal aus." }
    ],
    notes: "Sehr natürlich im Alltag. てみたい = möchte es versuchen.",
    related: ["te-form"]
  },
  {
    id: "n4-teiku",
    pattern: "～ていく",
    level: "N4",
    category: "Verben",
    meaning: "Weggehen und; von jetzt an",
    explanation: "ていく drückt eine Bewegung vom Sprecher weg oder eine Veränderung in die Zukunft aus.",
    formation: "Verb (て-Form) + いく",
    examples: [
      { japanese: "これからも頑張っていきます。", romaji: "Kore kara mo ganbatte ikimasu.", german: "Ich werde mich auch weiterhin anstrengen." },
      { japanese: "お弁当を持っていく。", romaji: "Obentō o motte iku.", german: "Ich nehme eine Bento-Box mit." }
    ],
    notes: "Gegenteil von ～てくる. Zukunftsbezug: だんだん暑くなっていく (es wird immer heißer).",
    related: ["n4-tekuru", "te-form"]
  },
  {
    id: "n4-tekuru",
    pattern: "～てくる",
    level: "N4",
    category: "Verben",
    meaning: "Herkommen und; bis jetzt",
    explanation: "てくる drückt eine Bewegung zum Sprecher hin oder eine Veränderung von der Vergangenheit bis jetzt aus.",
    formation: "Verb (て-Form) + くる",
    examples: [
      { japanese: "雨が降ってきた。", romaji: "Ame ga futte kita.", german: "Es hat angefangen zu regnen." },
      { japanese: "日本語を三年間勉強してきました。", romaji: "Nihongo o sannenkan benkyō shite kimashita.", german: "Ich habe drei Jahre lang Japanisch gelernt." }
    ],
    notes: "Gegenteil von ～ていく. Vergangenheitsbezug: だんだん寒くなってきた (es ist kälter geworden).",
    related: ["n4-teiku", "te-form"]
  },
  {
    id: "n4-teageru",
    pattern: "～てあげる",
    level: "N4",
    category: "Verben",
    meaning: "Etwas für jemanden tun (geben)",
    explanation: "てあげる drückt aus, dass man jemandem den Gefallen tut, etwas für ihn zu erledigen.",
    formation: "Verb (て-Form) + あげる",
    examples: [
      { japanese: "友達に日本語を教えてあげた。", romaji: "Tomodachi ni nihongo o oshiete ageta.", german: "Ich habe meinem Freund Japanisch beigebracht." },
      { japanese: "荷物を持ってあげましょうか。", romaji: "Nimotsu o motte agemashō ka.", german: "Soll ich Ihnen das Gepäck tragen?" }
    ],
    notes: "Kann herablassend klingen. Höflicher: ～て差し上げる. Nicht über sich selbst zu Höherstehenden verwenden.",
    related: ["n4-temorau", "n4-tekureru"]
  },
  {
    id: "n4-temorau",
    pattern: "～てもらう",
    level: "N4",
    category: "Verben",
    meaning: "Etwas von jemandem getan bekommen",
    explanation: "てもらう drückt aus, dass man den Gefallen erhält, dass jemand etwas für einen tut.",
    formation: "Person に + Verb (て-Form) + もらう",
    examples: [
      { japanese: "友達に手伝ってもらった。", romaji: "Tomodachi ni tetsudatte moratta.", german: "Mein Freund hat mir geholfen (ich habe Hilfe bekommen)." },
      { japanese: "先生に説明してもらいました。", romaji: "Sensei ni setsumei shite moraimashita.", german: "Der Lehrer hat es mir erklärt." }
    ],
    notes: "Höflich: ～ていただく. Bitte: ～てもらえませんか (Könnten Sie bitte...?).",
    related: ["n4-teageru", "n4-tekureru"]
  },
  {
    id: "n4-tekureru",
    pattern: "～てくれる",
    level: "N4",
    category: "Verben",
    meaning: "Etwas für mich tun (empfangen)",
    explanation: "てくれる drückt aus, dass jemand etwas für den Sprecher oder dessen Gruppe tut. Impliziert Dankbarkeit.",
    formation: "Person が + Verb (て-Form) + くれる",
    examples: [
      { japanese: "母が弁当を作ってくれた。", romaji: "Haha ga bentō o tsukutte kureta.", german: "Meine Mutter hat mir ein Bento gemacht." },
      { japanese: "友達が駅まで送ってくれた。", romaji: "Tomodachi ga eki made okutte kureta.", german: "Mein Freund hat mich zum Bahnhof gebracht." }
    ],
    notes: "Höflich: ～てくださる. Bitte: ～てくれませんか (Könntest du bitte...?).",
    related: ["n4-teageru", "n4-temorau"]
  },
  {
    id: "n4-koto-ga-dekiru",
    pattern: "～ことができる",
    level: "N4",
    category: "Verben",
    meaning: "Können, in der Lage sein",
    explanation: "ことができる ist eine formelle Art, Fähigkeit auszudrücken. Wird oft in der Schriftsprache verwendet.",
    formation: "Verb (辞書形) + ことができる",
    examples: [
      { japanese: "ここで泳ぐことができます。", romaji: "Koko de oyogu koto ga dekimasu.", german: "Man kann hier schwimmen." },
      { japanese: "日本語を話すことができますか。", romaji: "Nihongo o hanasu koto ga dekimasu ka.", german: "Können Sie Japanisch sprechen?" }
    ],
    notes: "Die Potentialform (話せる) ist im Alltag natürlicher. ことができる ist formeller.",
    related: ["n4-potential"]
  },
  {
    id: "n4-koto-ni-suru",
    pattern: "～ことにする",
    level: "N4",
    category: "Verben",
    meaning: "Sich entscheiden zu",
    explanation: "ことにする drückt eine aktive, persönliche Entscheidung aus.",
    formation: "Verb (辞書形/ない形) + ことにする",
    examples: [
      { japanese: "来年日本に行くことにした。", romaji: "Rainen Nihon ni iku koto ni shita.", german: "Ich habe mich entschieden, nächstes Jahr nach Japan zu gehen." },
      { japanese: "甘いものを食べないことにした。", romaji: "Amai mono o tabenai koto ni shita.", german: "Ich habe mich entschieden, keine Süßigkeiten mehr zu essen." }
    ],
    notes: "～ことにしている = regelmäßige Gewohnheit aus eigener Entscheidung.",
    related: ["n4-koto-ni-naru"]
  },
  {
    id: "n4-koto-ni-naru",
    pattern: "～ことになる",
    level: "N4",
    category: "Verben",
    meaning: "Es wird entschieden / Es kommt dazu",
    explanation: "ことになる drückt aus, dass eine Entscheidung von außen getroffen wurde oder sich etwas so ergeben hat.",
    formation: "Verb (辞書形/ない形) + ことになる",
    examples: [
      { japanese: "来月から大阪に転勤することになりました。", romaji: "Raigetsu kara Ōsaka ni tenkin suru koto ni narimashita.", german: "Es wurde entschieden, dass ich ab nächstem Monat nach Osaka versetzt werde." },
      { japanese: "会議は中止になることになった。", romaji: "Kaigi wa chūshi ni naru koto ni natta.", german: "Es wurde beschlossen, die Konferenz abzusagen." }
    ],
    notes: "～ことになっている = bestehende Regel/Vereinbarung.",
    related: ["n4-koto-ni-suru"]
  },
  {
    id: "n4-you-ni-suru",
    pattern: "～ようにする",
    level: "N4",
    category: "Verben",
    meaning: "Sich bemühen zu, darauf achten",
    explanation: "ようにする drückt aus, dass man sich bewusst bemüht, etwas zu tun oder zu vermeiden.",
    formation: "Verb (辞書形/ない形) + ようにする",
    examples: [
      { japanese: "毎日運動するようにしています。", romaji: "Mainichi undō suru yō ni shiteimasu.", german: "Ich achte darauf, jeden Tag Sport zu machen." },
      { japanese: "遅刻しないようにしてください。", romaji: "Chikoku shinai yō ni shite kudasai.", german: "Achten Sie bitte darauf, nicht zu spät zu kommen." }
    ],
    notes: "～ようにしている = regelmäßige Gewohnheit, auf die man achtet.",
    related: ["n4-you-ni-naru"]
  },
  {
    id: "n4-you-ni-naru",
    pattern: "～ようになる",
    level: "N4",
    category: "Verben",
    meaning: "Es kommt dazu dass, anfangen zu können",
    explanation: "ようになる drückt eine allmähliche Veränderung oder Entwicklung aus – etwas, das vorher nicht möglich war, wird möglich.",
    formation: "Verb (辞書形/ない形) + ようになる",
    examples: [
      { japanese: "日本語が話せるようになりました。", romaji: "Nihongo ga hanaseru yō ni narimashita.", german: "Ich bin so weit gekommen, dass ich Japanisch sprechen kann." },
      { japanese: "野菜を食べるようになった。", romaji: "Yasai o taberu yō ni natta.", german: "Ich habe angefangen, Gemüse zu essen." }
    ],
    notes: "Verneinung: ～なくなる (aufhören zu): 食べなくなった = hat aufgehört zu essen.",
    related: ["n4-you-ni-suru"]
  },
  {
    id: "n4-tehoshii",
    pattern: "～てほしい",
    level: "N4",
    category: "Verben",
    meaning: "Wollen, dass jemand etwas tut",
    explanation: "てほしい drückt den Wunsch aus, dass eine andere Person etwas tut.",
    formation: "Person に + Verb (て-Form) + ほしい",
    examples: [
      { japanese: "早く来てほしい。", romaji: "Hayaku kite hoshii.", german: "Ich möchte, dass du bald kommst." },
      { japanese: "もっと勉強してほしいです。", romaji: "Motto benkyō shite hoshii desu.", german: "Ich möchte, dass du mehr lernst." }
    ],
    notes: "Verneinung: ～ないでほしい (ich möchte, dass du es nicht tust).",
    related: ["hoshii", "n4-temorau"]
  },
  {
    id: "n4-sasetekudasai",
    pattern: "～させてください",
    level: "N4",
    category: "Verben",
    meaning: "Lassen Sie mich bitte",
    explanation: "させてください ist die höfliche Bitte um Erlaubnis, etwas tun zu dürfen. Kombination aus Kausativ und ください.",
    formation: "Verb (させ-Form) + てください",
    examples: [
      { japanese: "私にやらせてください。", romaji: "Watashi ni yarasete kudasai.", german: "Lassen Sie es mich bitte machen." },
      { japanese: "少し考えさせてください。", romaji: "Sukoshi kangaesasete kudasai.", german: "Lassen Sie mich bitte kurz nachdenken." }
    ],
    notes: "Sehr höflich. Oft in geschäftlichen Kontexten verwendet.",
    related: ["n4-saseru", "kudasai"]
  },
  {
    id: "n4-tabakari",
    pattern: "～たばかり",
    level: "N4",
    category: "Verben",
    meaning: "Gerade erst (getan)",
    explanation: "たばかり drückt aus, dass eine Handlung gerade erst abgeschlossen wurde.",
    formation: "Verb (た-Form) + ばかり",
    examples: [
      { japanese: "日本に来たばかりです。", romaji: "Nihon ni kita bakari desu.", german: "Ich bin gerade erst nach Japan gekommen." },
      { japanese: "さっき食べたばかりなのに、もうお腹が空いた。", romaji: "Sakki tabeta bakari na noni, mō onaka ga suita.", german: "Obwohl ich gerade erst gegessen habe, habe ich schon wieder Hunger." }
    ],
    notes: "Nicht verwechseln mit ～ばかり (nur/nichts als).",
    related: ["n4-bakari-p", "n4-tokoro-da"]
  },
  {
    id: "n4-takotogaaru",
    pattern: "～たことがある",
    level: "N4",
    category: "Verben",
    meaning: "Schon einmal getan haben (Erfahrung)",
    explanation: "たことがある drückt aus, dass man eine bestimmte Erfahrung in der Vergangenheit gemacht hat.",
    formation: "Verb (た-Form) + ことがある",
    examples: [
      { japanese: "日本に行ったことがあります。", romaji: "Nihon ni itta koto ga arimasu.", german: "Ich war schon einmal in Japan." },
      { japanese: "納豆を食べたことがありますか。", romaji: "Nattō o tabeta koto ga arimasu ka.", german: "Haben Sie schon einmal Nattō gegessen?" }
    ],
    notes: "Verneinung: ～たことがない (noch nie getan haben).",
    related: ["n4-koto-ga-aru"]
  },
  {
    id: "n4-tari",
    pattern: "～たり～たりする",
    level: "N4",
    category: "Verben",
    meaning: "Dinge tun wie ... und ...",
    explanation: "たり listet beispielhaft Handlungen auf und impliziert, dass es noch weitere gibt.",
    formation: "Verb (た-Form) + り + Verb (た-Form) + り + する",
    examples: [
      { japanese: "週末は映画を見たり、買い物をしたりします。", romaji: "Shūmatsu wa eiga o mitari, kaimono o shitari shimasu.", german: "Am Wochenende schaü ich Filme, gehe einkaufen und so weiter." },
      { japanese: "天気が良かったり悪かったりする。", romaji: "Tenki ga yokattari warukattari suru.", german: "Das Wetter ist mal gut, mal schlecht." }
    ],
    notes: "Auch mit Adjektiven möglich. Das finale する nicht vergessen.",
    related: ["ya", "n4-toka"]
  },
  {
    id: "n4-hajimeru",
    pattern: "～始める",
    level: "N4",
    category: "Verben",
    meaning: "Anfangen zu",
    explanation: "始める als Suffix drückt den Beginn einer Handlung aus.",
    formation: "Verb (ます-Stamm) + 始める",
    examples: [
      { japanese: "雨が降り始めた。", romaji: "Ame ga furi hajimeta.", german: "Es hat angefangen zu regnen." },
      { japanese: "日本語を勉強し始めました。", romaji: "Nihongo o benkyō shi hajimemashita.", german: "Ich habe angefangen, Japanisch zu lernen." }
    ],
    notes: "Auch als eigenständiges Verb: 始める = beginnen.",
    related: ["n4-tsuzukeru", "n4-owaru"]
  },
  {
    id: "n4-tsuzukeru",
    pattern: "～続ける",
    level: "N4",
    category: "Verben",
    meaning: "Fortfahren zu, weiter tun",
    explanation: "続ける als Suffix drückt aus, dass eine Handlung fortgesetzt wird.",
    formation: "Verb (ます-Stamm) + 続ける",
    examples: [
      { japanese: "三時間歩き続けた。", romaji: "Sanjikan aruki tsuzuketa.", german: "Ich bin drei Stunden lang weitergelaufen." },
      { japanese: "諦めずに努力し続けてください。", romaji: "Akiramezu ni doryoku shi tsuzukete kudasai.", german: "Geben Sie nicht auf und bemühen Sie sich weiter." }
    ],
    notes: "Auch eigenständig: 続ける = fortsetzen.",
    related: ["n4-hajimeru", "n4-owaru"]
  },
  {
    id: "n4-owaru",
    pattern: "～終わる",
    level: "N4",
    category: "Verben",
    meaning: "Fertig sein mit, beenden",
    explanation: "終わる als Suffix drückt ab, dass eine Handlung zu Ende gebracht wurde.",
    formation: "Verb (ます-Stamm) + 終わる",
    examples: [
      { japanese: "本を読み終わりました。", romaji: "Hon o yomi owarimashita.", german: "Ich habe das Buch fertig gelesen." },
      { japanese: "宿題を書き終わった。", romaji: "Shukudai o kaki owatta.", german: "Ich habe die Hausaufgaben fertig geschrieben." }
    ],
    notes: "Auch eigenständig: 終わる = enden.",
    related: ["n4-hajimeru", "n4-tsuzukeru"]
  },
  {
    id: "n4-sugiru",
    pattern: "～すぎる",
    level: "N4",
    category: "Verben",
    meaning: "Zu viel, zu sehr",
    explanation: "すぎる als Suffix drückt Übertreibung oder Exzess aus. Funktioniert mit Verben und Adjektiven.",
    formation: "Verb (ます-Stamm) + すぎる / い-Adj (ohne い) + すぎる / な-Adj + すぎる",
    examples: [
      { japanese: "食べすぎてお腹が痛い。", romaji: "Tabesugite onaka ga itai.", german: "Ich habe zu viel gegessen und habe Bauchschmerzen." },
      { japanese: "この問題は難しすぎる。", romaji: "Kono mondai wa muzukashisugiru.", german: "Dieses Problem ist zu schwierig." }
    ],
    notes: "Wird wie ein ichidan-Verb konjugiert: すぎます, すぎた, すぎない.",
    related: ["n4-yasui", "n4-nikui"]
  },
  {
    id: "n4-yasui",
    pattern: "～やすい",
    level: "N4",
    category: "Verben",
    meaning: "Leicht zu, einfach zu",
    explanation: "やすい als Suffix drückt aus, dass etwas leicht zu tun ist oder dass eine Tendenz besteht.",
    formation: "Verb (ます-Stamm) + やすい",
    examples: [
      { japanese: "この本は読みやすい。", romaji: "Kono hon wa yomiyasui.", german: "Dieses Buch ist leicht zu lesen." },
      { japanese: "ガラスは割れやすい。", romaji: "Garasu wa wareyasui.", german: "Glas zerbricht leicht." }
    ],
    notes: "Wird wie ein い-Adjektiv konjugiert: やすくない, やすかった.",
    related: ["n4-nikui", "n4-sugiru"]
  },
  {
    id: "n4-nikui",
    pattern: "～にくい",
    level: "N4",
    category: "Verben",
    meaning: "Schwer zu, schwierig zu",
    explanation: "にくい als Suffix drückt aus, dass etwas schwer zu tun ist.",
    formation: "Verb (ます-Stamm) + にくい",
    examples: [
      { japanese: "この字は読みにくい。", romaji: "Kono ji wa yominikui.", german: "Diese Schrift ist schwer zu lesen." },
      { japanese: "この靴は歩きにくい。", romaji: "Kono kutsu wa aruki nikui.", german: "Diese Schuhe sind schwer zu laufen." }
    ],
    notes: "Wird wie ein い-Adjektiv konjugiert. Ähnlich: ～づらい (mit emotionaler Schwierigkeit).",
    related: ["n4-yasui", "n4-sugiru"]
  },
  {
    id: "n4-kata",
    pattern: "～方",
    level: "N4",
    category: "Verben",
    meaning: "Art und Weise zu, wie man",
    explanation: "方 (かた) als Suffix bildet ein Nomen, das die Art und Weise einer Handlung ausdrückt.",
    formation: "Verb (ます-Stamm) + 方",
    examples: [
      { japanese: "この漢字の読み方を教えてください。", romaji: "Kono kanji no yomikata o oshiete kudasai.", german: "Bitte sagen Sie mir, wie man dieses Kanji liest." },
      { japanese: "箸の使い方が上手ですね。", romaji: "Hashi no tsukaikata ga jōzu desu ne.", german: "Sie können gut mit Stäbchen umgehen." }
    ],
    notes: "Sehr produktives Suffix: 食べ方, 書き方, やり方, 作り方 usw.",
    related: []
  },
  {
    id: "n4-sou-appearance",
    pattern: "～そうだ (様態)",
    level: "N4",
    category: "Verben",
    meaning: "Sieht aus als ob, scheint",
    explanation: "そうだ (様態/yōtai) drückt einen Eindruck basierend auf dem Aussehen aus. Basiert auf eigener Beobachtung.",
    formation: "Verb (ます-Stamm) + そうだ / い-Adj (ohne い) + そうだ / な-Adj + そうだ",
    examples: [
      { japanese: "雨が降りそうだ。", romaji: "Ame ga furisō da.", german: "Es sieht aus, als ob es regnen wird." },
      { japanese: "このケーキはおいしそうだ。", romaji: "Kono kēki wa oishisō da.", german: "Dieser Kuchen sieht lecker aus." }
    ],
    notes: "Ausnahmen: いい→よさそう, ない→なさそう. Nicht verwechseln mit ～そうだ (Hörensagen).",
    related: ["n4-sou-hearsay", "n4-you-da", "n4-rashii"]
  },
  {
    id: "n4-nagara",
    pattern: "～ながら",
    level: "N4",
    category: "Verben",
    meaning: "Während, gleichzeitig",
    explanation: "ながら drückt aus, dass zwei Handlungen gleichzeitig vom selben Subjekt ausgeführt werden. Die Haupthandlung steht am Satzende.",
    formation: "Verb (ます-Stamm) + ながら",
    examples: [
      { japanese: "音楽を聞きながら勉強する。", romaji: "Ongaku o kikinagara benkyō suru.", german: "Ich lerne, während ich Musik höre." },
      { japanese: "歩きながらスマホを見ないでください。", romaji: "Arukinagara sumaho o minaide kudasai.", german: "Bitte schaün Sie nicht beim Gehen aufs Handy." }
    ],
    notes: "Beide Handlungen müssen vom selben Subjekt sein. Für verschiedene Subjekte: ～間に.",
    related: ["n4-aida-ni"]
  },
  {
    id: "n4-tearu",
    pattern: "～てある",
    level: "N4",
    category: "Verben",
    meaning: "Ist gemacht worden (Zustandsresultat)",
    explanation: "てある drückt aus, dass eine absichtliche Handlung ausgeführt wurde und deren Ergebnis noch andaürt.",
    formation: "Verb (て-Form) + ある",
    examples: [
      { japanese: "窓が開けてある。", romaji: "Mado ga akete aru.", german: "Das Fenster ist geöffnet worden (und steht noch offen)." },
      { japanese: "テーブルの上にメモが書いてある。", romaji: "Tēburu no ue ni memo ga kaite aru.", german: "Auf dem Tisch ist eine Notiz geschrieben." }
    ],
    notes: "Unterschied zu ～ている: てある betont das absichtliche Vorbereiten, ている den aktuellen Zustand.",
    related: ["teiru", "n4-teoku"]
  },
  {
    id: "n4-zu-ni",
    pattern: "～ずに / ～ないで",
    level: "N4",
    category: "Verben",
    meaning: "Ohne zu tun",
    explanation: "ずに ist die formelle Variante von ないで. Beide drücken aus, dass eine Handlung nicht ausgeführt wird, während eine andere stattfindet.",
    formation: "Verb (ない-Stamm) + ずに / Verb (ない-Form) + で",
    examples: [
      { japanese: "朝ご飯を食べずに学校に行った。", romaji: "Asagohan o tabezu ni gakkō ni itta.", german: "Ich ging ohne Frühstück zur Schule." },
      { japanese: "辞書を使わないで読めた。", romaji: "Jisho o tsukawanaide yometa.", german: "Ich konnte es ohne Wörterbuch lesen." }
    ],
    notes: "する→せずに (Ausnahme). ずに ist schriftsprachlicher als ないで.",
    related: ["naide"]
  },
  {
    id: "n4-imperative",
    pattern: "命令形",
    level: "N4",
    category: "Verben",
    meaning: "Imperativform (Befehl)",
    explanation: "Die Imperativform ist ein direkter Befehl. Sie wird in der Alltagssprache selten verwendet und klingt grob.",
    formation: "Godan: u→e (書く→書け) / Ichidan: る→ろ (食べる→食べろ)",
    examples: [
      { japanese: "早くしろ！", romaji: "Hayaku shiro!", german: "Beeil dich!" },
      { japanese: "静かにしろ。", romaji: "Shizuka ni shiro.", german: "Sei still." },
      { japanese: "頑張れ！", romaji: "Ganbare!", german: "Gib dein Bestes!" }
    ],
    notes: "する→しろ, 来る→来い (こい). Oft bei Anfeuerungen: 頑張れ! Negative Form: ～な (するな = tu es nicht).",
    related: ["n4-nasai"]
  },
  {
    id: "n4-nasai",
    pattern: "～なさい",
    level: "N4",
    category: "Verben",
    meaning: "Tu ... (höflicher Befehl)",
    explanation: "なさい ist eine höflichere Befehlsform, die oft von Eltern, Lehrern oder Vorgesetzten verwendet wird.",
    formation: "Verb (ます-Stamm) + なさい",
    examples: [
      { japanese: "早く寝なさい。", romaji: "Hayaku nenasai.", german: "Geh früh schlafen." },
      { japanese: "宿題をしなさい。", romaji: "Shukudai o shinasai.", german: "Mach deine Hausaufgaben." }
    ],
    notes: "Höflicher als 命令形, aber immer noch autoritär. Nur von oben nach unten verwendet.",
    related: ["n4-imperative", "kudasai"]
  },
  // ============================================================
  // N4 – ADJEKTIVE (12)
  // ============================================================
  {
    id: "n4-adj-ba",
    pattern: "～ければ / ～なら",
    level: "N4",
    category: "Adjektive",
    meaning: "Wenn (Adjektiv-Konditional)",
    explanation: "い-Adjektive: い→ければ. な-Adjektive: なら(ば).",
    formation: "い-Adj: い→ければ / な-Adj: ～なら(ば)",
    examples: [
      { japanese: "安ければ買います。", romaji: "Yasukereba kaimasu.", german: "Wenn es günstig ist, kaufe ich es." },
      { japanese: "暇なら遊びに来てください。", romaji: "Hima nara asobi ni kite kudasai.", german: "Wenn du frei bist, komm vorbei." }
    ],
    notes: "いい→よければ. Verneinung: ～くなければ / ～でなければ.",
    related: ["n4-ba", "n4-nara"]
  },
  {
    id: "n4-adj-souna",
    pattern: "～そうな / ～そうに",
    level: "N4",
    category: "Adjektive",
    meaning: "Sieht ... aus (Eindruck)",
    explanation: "そうな vor Nomen, そうに vor Verben. Visueller Eindruck.",
    formation: "い-Adj (ohne い) + そうな/に / な-Adj + そうな/に",
    examples: [
      { japanese: "おいしそうなケーキですね。", romaji: "Oishisō na kēki desu ne.", german: "Ein lecker aussehender Kuchen." },
      { japanese: "楽しそうに笑っている。", romaji: "Tanoshisō ni waratteiru.", german: "Er lacht vergnügt." }
    ],
    notes: "いい→よさそう, ない→なさそう.",
    related: ["n4-sou-appearance"]
  },
  {
    id: "n4-adj-sugiru",
    pattern: "～すぎる (Adj.)",
    level: "N4",
    category: "Adjektive",
    meaning: "Zu ... (Übertreibung)",
    explanation: "すぎる mit Adjektiven: übermäßig starke Eigenschaft.",
    formation: "い-Adj (ohne い) + すぎる / な-Adj + すぎる",
    examples: [
      { japanese: "この部屋は暑すぎる。", romaji: "Kono heya wa atsusugiru.", german: "Dieses Zimmer ist zu heiß." },
      { japanese: "静かすぎて怖い。", romaji: "Shizuka sugite kowai.", german: "So still, dass es unheimlich ist." }
    ],
    notes: "Konjugation wie ichidan-Verb.",
    related: ["n4-sugiru"]
  },
  {
    id: "n4-ku-suru",
    pattern: "～くする / ～にする",
    level: "N4",
    category: "Adjektive",
    meaning: "Etwas ... machen",
    explanation: "くする (い-Adj) und にする (な-Adj): aktive Veränderung.",
    formation: "い-Adj: い→くする / な-Adj: ～にする",
    examples: [
      { japanese: "部屋を明るくした。", romaji: "Heya o akaruku shita.", german: "Ich habe das Zimmer heller gemacht." },
      { japanese: "部屋をきれいにしてください。", romaji: "Heya o kirei ni shite kudasai.", german: "Machen Sie bitte das Zimmer sauber." }
    ],
    notes: "Vgl. ～くなる/～になる (von selbst werden).",
    related: ["n4-ku-naru"]
  },
  {
    id: "n4-ku-naru",
    pattern: "～くなる / ～になる",
    level: "N4",
    category: "Adjektive",
    meaning: "... werden (Veränderung)",
    explanation: "くなる (い-Adj) und になる (な-Adj): natürliche Veränderung.",
    formation: "い-Adj: い→くなる / な-Adj: ～になる",
    examples: [
      { japanese: "日が短くなった。", romaji: "Hi ga mijikaku natta.", german: "Die Tage sind kürzer geworden." },
      { japanese: "日本語が上手になりました。", romaji: "Nihongo ga jōzu ni narimashita.", german: "Mein Japanisch ist besser geworden." }
    ],
    notes: "いい→よくなる. Oft mit だんだん (allmählich).",
    related: ["n4-ku-suru", "n4-you-ni-naru"]
  },
  {
    id: "n4-sa",
    pattern: "～さ",
    level: "N4",
    category: "Adjektive",
    meaning: "Die ... (Nominalisierung)",
    explanation: "さ wandelt Adjektive in Nomen um.",
    formation: "い-Adj (ohne い) + さ / な-Adj + さ",
    examples: [
      { japanese: "この山の高さは何メートルですか。", romaji: "Kono yama no takasa wa nan mētoru desu ka.", german: "Wie hoch ist dieser Berg?" },
      { japanese: "日本語の難しさを実感した。", romaji: "Nihongo no muzukashisa o jikkan shita.", german: "Ich habe die Schwierigkeit des Japanischen erfahren." }
    ],
    notes: "高さ, 長さ, 深さ, 大きさ, 便利さ usw.",
    related: []
  },
  {
    id: "n4-garu",
    pattern: "～がる",
    level: "N4",
    category: "Adjektive",
    meaning: "Zeichen zeigen von",
    explanation: "がる: äußere Zeichen eines Gefühls bei Dritten.",
    formation: "い-Adj (ohne い) + がる",
    examples: [
      { japanese: "子供が怖がっている。", romaji: "Kodomo ga kowagatte iru.", german: "Das Kind zeigt Angst." },
      { japanese: "彼女は新しい服を欲しがっている。", romaji: "Kanojo wa atarashii fuku o hoshigatte iru.", german: "Sie will neue Kleidung." }
    ],
    notes: "欲しい→欲しがる, 怖い→怖がる. Godan-Verb.",
    related: ["hoshii"]
  },
  {
    id: "n4-you-na",
    pattern: "～ような / ～みたいな",
    level: "N4",
    category: "Adjektive",
    meaning: "Wie ... (attributiv)",
    explanation: "ような (formell) und みたいな (informell) vor Nomen.",
    formation: "Nomen + のような/みたいな + Nomen",
    examples: [
      { japanese: "夢のような一日だった。", romaji: "Yume no yō na ichinichi datta.", german: "Es war ein traumhafter Tag." },
      { japanese: "彼みたいな人になりたい。", romaji: "Kare mitai na hito ni naritai.", german: "Ich möchte so werden wie er." }
    ],
    notes: "のような = formell, みたいな = informell.",
    related: ["n4-no-you-ni", "n4-you-da"]
  },
  {
    id: "n4-yori",
    pattern: "～より～のほうが",
    level: "N4",
    category: "Adjektive",
    meaning: "... ist mehr als (Komparativ)",
    explanation: "より = Vergleichsgegenstand, のほうが = stärkeres Element.",
    formation: "A より B のほうが + Adj",
    examples: [
      { japanese: "電車よりバスのほうが安い。", romaji: "Densha yori basu no hō ga yasui.", german: "Der Bus ist günstiger als der Zug." },
      { japanese: "夏より冬のほうが好きです。", romaji: "Natsu yori fuyu no hō ga suki desu.", german: "Ich mag Winter lieber als Sommer." }
    ],
    notes: "思ったより難しい (schwieriger als gedacht).",
    related: ["n4-ichiban"]
  },
  {
    id: "n4-ichiban",
    pattern: "一番～",
    level: "N4",
    category: "Adjektive",
    meaning: "Am meisten (Superlativ)",
    explanation: "一番 drückt den höchsten Grad aus.",
    formation: "Gruppe + の中で + 一番 + Adj",
    examples: [
      { japanese: "日本で一番高い山は富士山です。", romaji: "Nihon de ichiban takai yama wa Fujisan desu.", german: "Der höchste Berg Japans ist der Fuji." },
      { japanese: "クラスで誰が一番背が高い？", romaji: "Kurasu de dare ga ichiban se ga takai?", german: "Wer ist der Größte in der Klasse?" }
    ],
    notes: "最も (もっとも) = formellere Variante.",
    related: ["n4-yori"]
  },
  {
    id: "n4-rashii-adj",
    pattern: "～らしい (typisch)",
    level: "N4",
    category: "Adjektive",
    meaning: "Typisch für, ...-haft",
    explanation: "らしい als Suffix: typisch, charakteristisch.",
    formation: "Nomen + らしい",
    examples: [
      { japanese: "今日は春らしい天気ですね。", romaji: "Kyō wa haru rashii tenki desu ne.", german: "Typisches Frühlingswetter heute." },
      { japanese: "彼女はとても女性らしい。", romaji: "Kanojo wa totemo josei rashii.", german: "Sie ist sehr feminin." }
    ],
    notes: "Nicht verwechseln mit ～らしい (Vermutung).",
    related: ["n4-rashii"]
  },
  {
    id: "n4-gachi",
    pattern: "～がち",
    level: "N4",
    category: "Adjektive",
    meaning: "Neigung zu",
    explanation: "がち: (meist negative) Tendenz.",
    formation: "Verb (ます-Stamm) + がち / Nomen + がち",
    examples: [
      { japanese: "最近風邪を引きがちだ。", romaji: "Saikin kaze o hikigachi da.", german: "Neige in letzter Zeit zu Erkältungen." },
      { japanese: "曇りがちの天気が続く。", romaji: "Kumorigachi no tenki ga tsuzuku.", german: "Vorwiegend bewölktes Wetter." }
    ],
    notes: "Wie な-Adj: ～がちな + Nomen.",
    related: ["n4-yasui"]
  },
  // ============================================================
  // N4 – SATZSTRUKTUREN (45)
  // ============================================================
  {
    id: "n4-you-da",
    pattern: "～ようだ",
    level: "N4",
    category: "Satzstrukturen",
    meaning: "Es scheint als ob",
    explanation: "ようだ: Vermutung basierend auf eigener Beobachtung.",
    formation: "Verb/い-Adj + ようだ / な-Adj + なようだ / Nomen + のようだ",
    examples: [
      { japanese: "彼は忙しいようだ。", romaji: "Kare wa isogashii yō da.", german: "Er scheint beschäftigt zu sein." },
      { japanese: "風邪を引いたようです。", romaji: "Kaze o hiita yō desu.", german: "Ich habe mich wohl erkältet." }
    ],
    notes: "Formeller als みたいだ.",
    related: ["n4-mitai-da", "n4-rashii"]
  },
  {
    id: "n4-mitai-da",
    pattern: "～みたいだ",
    level: "N4",
    category: "Satzstrukturen",
    meaning: "Scheint so (umgangssprachlich)",
    explanation: "みたいだ: informelle Variante von ようだ.",
    formation: "Verb/Adj/Nomen + みたいだ",
    examples: [
      { japanese: "雨が降るみたいだ。", romaji: "Ame ga furu mitai da.", german: "Es sieht nach Regen aus." },
      { japanese: "あの人は先生みたいだ。", romaji: "Ano hito wa sensei mitai da.", german: "Die Person scheint Lehrer zu sein." }
    ],
    notes: "Vor Nomen: みたいな, vor Verben: みたいに.",
    related: ["n4-you-da", "n4-rashii"]
  },
  {
    id: "n4-rashii",
    pattern: "～らしい",
    level: "N4",
    category: "Satzstrukturen",
    meaning: "Anscheinend, offenbar",
    explanation: "らしい: Vermutung basierend auf Hörensagen oder Schluss.",
    formation: "Verb/Adj/Nomen + らしい",
    examples: [
      { japanese: "明日は雨らしい。", romaji: "Ashita wa ame rashii.", german: "Anscheinend regnet es morgen." },
      { japanese: "あの店はおいしいらしいですよ。", romaji: "Ano mise wa oishii rashii desu yo.", german: "Das Restaurant soll gut sein." }
    ],
    notes: "Konjugation wie い-Adj.",
    related: ["n4-you-da", "n4-sou-hearsay"]
  },
  {
    id: "n4-sou-hearsay",
    pattern: "～そうだ (伝聞)",
    level: "N4",
    category: "Satzstrukturen",
    meaning: "Ich habe gehört dass (Hörensagen)",
    explanation: "そうだ (伝聞): wiedergibt was man gehört/gelesen hat.",
    formation: "Satz (Grundform) + そうだ",
    examples: [
      { japanese: "天気予報によると、明日は晴れるそうだ。", romaji: "Tenki yohō ni yoru to, ashita wa hareru sō da.", german: "Laut Wetterbericht wird es morgen sonnig." },
      { japanese: "あの映画は面白いそうです。", romaji: "Ano eiga wa omoshiroi sō desu.", german: "Der Film soll interessant sein." }
    ],
    notes: "Hörensagen: Grundform + そうだ. Aussehen: Stamm + そうだ.",
    related: ["n4-sou-appearance", "n4-rashii"]
  },
  {
    id: "n4-hazu-da",
    pattern: "～はずだ",
    level: "N4",
    category: "Satzstrukturen",
    meaning: "Müsste sein, wird erwartet",
    explanation: "はずだ: starke Erwartung oder logische Schlussfolgerung.",
    formation: "Verb/い-Adj + はずだ / な-Adj + なはずだ",
    examples: [
      { japanese: "もう届いているはずです。", romaji: "Mō todoiteiru hazu desu.", german: "Es müsste schon angekommen sein." },
      { japanese: "彼は知っているはずだ。", romaji: "Kare wa shitteiru hazu da.", german: "Er müsste es wissen." }
    ],
    notes: "はずがない = unmöglich.",
    related: ["n4-kamoshirenai", "n4-beki-da"]
  },
  {
    id: "n4-kamoshirenai",
    pattern: "～かもしれない",
    level: "N4",
    category: "Satzstrukturen",
    meaning: "Vielleicht, möglicherweise",
    explanation: "かもしれない: unsichere Vermutung.",
    formation: "Verb/Adj/Nomen + かもしれない",
    examples: [
      { japanese: "明日は雨かもしれない。", romaji: "Ashita wa ame kamoshirenai.", german: "Vielleicht regnet es morgen." },
      { japanese: "間に合わないかもしれません。", romaji: "Maniawanai kamoshiremasen.", german: "Ich schaffe es vielleicht nicht rechtzeitig." }
    ],
    notes: "Umgangssprache: かも allein.",
    related: ["n4-hazu-da"]
  },
  {
    id: "n4-ka-dou-ka",
    pattern: "～かどうか",
    level: "N4",
    category: "Satzstrukturen",
    meaning: "Ob ... oder nicht",
    explanation: "かどうか: Ja/Nein-Frage als Nebensatz.",
    formation: "Verb/Adj (Grundform) + かどうか",
    examples: [
      { japanese: "行くかどうか迷っています。", romaji: "Iku ka dō ka mayotteimasu.", german: "Ich bin unschlüssig, ob ich gehen soll." },
      { japanese: "正しいかどうか確認してください。", romaji: "Tadashii ka dō ka kakunin shite kudasai.", german: "Bitte prüfen Sie, ob es korrekt ist." }
    ],
    notes: "W-Fragen: nur か (何時に来るか分からない).",
    related: ["ka"]
  },
  {
    id: "n4-tame-ni",
    pattern: "～ために",
    level: "N4",
    category: "Satzstrukturen",
    meaning: "Um zu (Zweck) / Weil (Grund)",
    explanation: "ために: Zweck (辞書形) oder Grund (た形/Nomen).",
    formation: "Verb (辞書形) + ために / Nomen + のために",
    examples: [
      { japanese: "日本語を勉強するために日本に来た。", romaji: "Nihongo o benkyō suru tame ni Nihon ni kita.", german: "Ich kam nach Japan, um Japanisch zu lernen." },
      { japanese: "台風のために電車が止まった。", romaji: "Taifū no tame ni densha ga tomatta.", german: "Wegen des Taifuns stoppten die Züge." }
    ],
    notes: "Zweck: 辞書形. Grund: た形/Nomen.",
    related: ["n4-you-ni-purpose", "n4-node"]
  },
  {
    id: "n4-you-ni-purpose",
    pattern: "～ように (Zweck)",
    level: "N4",
    category: "Satzstrukturen",
    meaning: "Damit, so dass",
    explanation: "ように: indirekter Zweck, mit Potential- oder ない-Form.",
    formation: "Verb (辞書形/ない形) + ように",
    examples: [
      { japanese: "忘れないように書いておきます。", romaji: "Wasurenai yō ni kaite okimasu.", german: "Ich schreibe es auf, damit ich es nicht vergesse." },
      { japanese: "聞こえるように大きい声で話して。", romaji: "Kikoeru yō ni ōkii koe de hanashite.", german: "Sprich laut, damit man es hört." }
    ],
    notes: "ために = direkter Zweck. ように = indirekter Zweck.",
    related: ["n4-tame-ni"]
  },
  {
    id: "n4-ba",
    pattern: "～ば",
    level: "N4",
    category: "Satzstrukturen",
    meaning: "Wenn (Konditional)",
    explanation: "ば-Form: hypothetische Bedingung.",
    formation: "Godan: u→eba / Ichidan: る→れば",
    examples: [
      { japanese: "時間があれば行きます。", romaji: "Jikan ga areba ikimasu.", german: "Wenn ich Zeit habe, gehe ich." },
      { japanese: "安ければ買います。", romaji: "Yasukereba kaimasu.", german: "Wenn es günstig ist, kaufe ich es." }
    ],
    notes: "する→すれば, 来る→来れば. ～ば～ほど = je mehr desto.",
    related: ["n4-nara", "n4-temo", "n4-to-conditional"]
  },
  {
    id: "n4-nara",
    pattern: "～なら",
    level: "N4",
    category: "Satzstrukturen",
    meaning: "Wenn, falls (thematisch)",
    explanation: "なら: nimmt Thema auf, reagiert auf Gesagtes.",
    formation: "Verb/Adj/Nomen + なら",
    examples: [
      { japanese: "日本に行くなら京都がおすすめです。", romaji: "Nihon ni iku nara Kyōto ga osusume desu.", german: "Wenn du nach Japan gehst, empfehle ich Kyoto." },
      { japanese: "魚なら、このレストランがいい。", romaji: "Sakana nara, kono resutoran ga ii.", german: "Was Fisch betrifft, ist dieses Restaurant gut." }
    ],
    notes: "Reagiert oft auf Information des Gesprächspartners.",
    related: ["n4-ba", "n4-to-conditional"]
  },
  {
    id: "n4-temo",
    pattern: "～ても / ～でも",
    level: "N4",
    category: "Satzstrukturen",
    meaning: "Selbst wenn, auch wenn",
    explanation: "ても: Ergebnis bleibt gleich, egal ob Bedingung zutrifft.",
    formation: "Verb (て) + も / い-Adj: くても / な-Adj: でも",
    examples: [
      { japanese: "雨が降っても行きます。", romaji: "Ame ga futtemo ikimasu.", german: "Selbst wenn es regnet, gehe ich." },
      { japanese: "高くても買いたい。", romaji: "Takakutemo kaitai.", german: "Auch wenn es teuer ist, will ich es." }
    ],
    notes: "何を食べても (egal was), どんなに頑張っても (egal wie sehr).",
    related: ["n4-noni", "n4-ba"]
  },
  {
    id: "n4-noni",
    pattern: "～のに",
    level: "N4",
    category: "Satzstrukturen",
    meaning: "Obwohl, trotzdem",
    explanation: "のに: Enttäuschung, etwas ist anders als erwartet.",
    formation: "Verb/い-Adj + のに / な-Adj + なのに",
    examples: [
      { japanese: "勉強したのにテストに落ちた。", romaji: "Benkyō shita noni tesuto ni ochita.", german: "Obwohl ich lernte, fiel ich durch." },
      { japanese: "約束したのに来なかった。", romaji: "Yakusoku shita noni konakatta.", german: "Obwohl er es versprach, kam er nicht." }
    ],
    notes: "Impliziert Frustration/Enttäuschung.",
    related: ["n4-temo"]
  },
  {
    id: "n4-shi",
    pattern: "～し",
    level: "N4",
    category: "Satzstrukturen",
    meaning: "Und außerdem (Gründe auflisten)",
    explanation: "し: listet mehrere Gründe oder Eigenschaften auf.",
    formation: "Verb/い-Adj + し / な-Adj + だし",
    examples: [
      { japanese: "この店は安いし、おいしいし、最高だ。", romaji: "Kono mise wa yasui shi, oishii shi, saikō da.", german: "Günstig und lecker – einfach toll." },
      { japanese: "時間もないし、お金もないし、行けない。", romaji: "Jikan mo nai shi, okane mo nai shi, ikenai.", german: "Keine Zeit, kein Geld – kann nicht gehen." }
    ],
    notes: "Auch nur ein Grund: 疲れたし、帰ろう.",
    related: ["n4-node"]
  },
  {
    id: "n4-mama",
    pattern: "～まま",
    level: "N4",
    category: "Satzstrukturen",
    meaning: "So wie es ist, im Zustand",
    explanation: "まま: Zustand bleibt unverändert.",
    formation: "Verb (た形) + まま / Nomen + のまま",
    examples: [
      { japanese: "靴を履いたまま入らないで。", romaji: "Kutsu o haita mama hairanaide.", german: "Geh nicht mit Schuhen rein." },
      { japanese: "電気をつけたまま寝てしまった。", romaji: "Denki o tsuketa mama nete shimatta.", german: "Ich schlief mit Licht ein." }
    ],
    notes: "そのまま = so wie es ist.",
    related: []
  },
  {
    id: "n4-tokoro-da",
    pattern: "～ところだ",
    level: "N4",
    category: "Satzstrukturen",
    meaning: "Gerade dabei / gerade getan",
    explanation: "ところだ: Zeitpunkt einer Handlung (davor/mittendrin/danach).",
    formation: "辞書形+ところ / ている+ところ / た形+ところ",
    examples: [
      { japanese: "今から出かけるところです。", romaji: "Ima kara dekakeru tokoro desu.", german: "Ich bin gerade dabei auszugehen." },
      { japanese: "今食べ終わったところです。", romaji: "Ima tabe owatta tokoro desu.", german: "Ich habe gerade eben aufgegessen." }
    ],
    notes: "辞書形 = gleich. ている = gerade. た形 = gerade eben.",
    related: ["n4-tabakari"]
  },
  {
    id: "n4-dake",
    pattern: "～だけ",
    level: "N4",
    category: "Satzstrukturen",
    meaning: "Nur, lediglich",
    explanation: "だけ: beschränkt auf eine Menge oder Handlung. Neutral.",
    formation: "Nomen/Verb + だけ",
    examples: [
      { japanese: "水だけ飲みました。", romaji: "Mizu dake nomimashita.", german: "Ich habe nur Wasser getrunken." },
      { japanese: "見るだけでいいです。", romaji: "Miru dake de ii desu.", german: "Nur schaün reicht." }
    ],
    notes: "できるだけ = so viel wie möglich.",
    related: ["n4-shika-nai", "n4-bakari-p"]
  },
  {
    id: "n4-shika-nai",
    pattern: "～しか～ない",
    level: "N4",
    category: "Satzstrukturen",
    meaning: "Nur (mit Verneinung)",
    explanation: "しか + Verneinung: betont Einschränkung, bedaürnd.",
    formation: "Nomen + しか + Verb (ない形)",
    examples: [
      { japanese: "百円しかない。", romaji: "Hyaku-en shika nai.", german: "Ich habe nur 100 Yen." },
      { japanese: "日本語しか話せません。", romaji: "Nihongo shika hanasemasen.", german: "Ich kann nur Japanisch." }
    ],
    notes: "しか = bedaürnd, だけ = neutral.",
    related: ["n4-dake"]
  },
  {
    id: "n4-ni-tsuite",
    pattern: "～について",
    level: "N4",
    category: "Satzstrukturen",
    meaning: "Über, bezüglich",
    explanation: "について: gibt das Thema an, über das gesprochen wird.",
    formation: "Nomen + について",
    examples: [
      { japanese: "日本の文化について調べています。", romaji: "Nihon no bunka ni tsuite shirabeteimasu.", german: "Ich recherchiere über japanische Kultur." },
      { japanese: "この問題について話し合いましょう。", romaji: "Kono mondai ni tsuite hanashi aimashō.", german: "Sprechen wir über dieses Problem." }
    ],
    notes: "Vor Nomen: ～についての + Nomen.",
    related: ["n4-ni-taishite"]
  },
  {
    id: "n4-ni-yoru-to",
    pattern: "～によると",
    level: "N4",
    category: "Satzstrukturen",
    meaning: "Laut, gemäß",
    explanation: "によると: gibt die Quelle einer Information an.",
    formation: "Nomen + によると",
    examples: [
      { japanese: "天気予報によると明日は雨だそうだ。", romaji: "Tenki yohō ni yoru to ashita wa ame da sō da.", german: "Laut Wetterbericht regnet es morgen." },
      { japanese: "ニュースによると事故があったそうだ。", romaji: "Nyūsu ni yoru to jiko ga atta sō da.", german: "Laut Nachrichten gab es einen Unfall." }
    ],
    notes: "Oft mit ～そうだ oder ～ということだ.",
    related: ["n4-sou-hearsay", "n4-ni-yotte"]
  },
  {
    id: "n4-okage-de",
    pattern: "～おかげで",
    level: "N4",
    category: "Satzstrukturen",
    meaning: "Dank (positiv)",
    explanation: "おかげで: positiver Grund, Dankbarkeit.",
    formation: "Verb/Adj + おかげで / Nomen + のおかげで",
    examples: [
      { japanese: "先生のおかげで合格しました。", romaji: "Sensei no okage de gōkaku shimashita.", german: "Dank des Lehrers habe ich bestanden." },
      { japanese: "薬のおかげで元気になった。", romaji: "Kusuri no okage de genki ni natta.", german: "Dank der Medizin bin ich gesund." }
    ],
    notes: "Positiv: おかげで. Negativ: せいで.",
    related: ["n4-sei-de"]
  },
  {
    id: "n4-sei-de",
    pattern: "～せいで",
    level: "N4",
    category: "Satzstrukturen",
    meaning: "Wegen (negativ, Schuld)",
    explanation: "せいで: negativer Grund, Schuldzuweisung.",
    formation: "Verb/Adj + せいで / Nomen + のせいで",
    examples: [
      { japanese: "雨のせいで試合が中止になった。", romaji: "Ame no sei de shiai ga chūshi ni natta.", german: "Wegen des Regens wurde das Spiel abgesagt." },
      { japanese: "寝坊したせいで遅刻した。", romaji: "Nebō shita sei de chikoku shita.", german: "Weil ich verschlief, kam ich zu spät." }
    ],
    notes: "Gegenteil: おかげで (positiv).",
    related: ["n4-okage-de"]
  },
  {
    id: "n4-wake-da",
    pattern: "～わけだ",
    level: "N4",
    category: "Satzstrukturen",
    meaning: "Kein Wunder, das erklärt es",
    explanation: "わけだ: logische Schlussfolgerung.",
    formation: "Verb/Adj (Grundform) + わけだ",
    examples: [
      { japanese: "毎日練習してるから上手なわけだ。", romaji: "Mainichi renshū shiteru kara jōzu na wake da.", german: "Er übt täglich, kein Wunder dass er gut ist." },
      { japanese: "道理で安いわけだ。", romaji: "Dōri de yasui wake da.", german: "Kein Wunder dass es billig ist." }
    ],
    notes: "わけがない = unmöglich. わけではない = nicht unbedingt.",
    related: ["n4-hazu-da"]
  },
  {
    id: "n4-beki-da",
    pattern: "～べきだ",
    level: "N4",
    category: "Satzstrukturen",
    meaning: "Sollte (moralische Pflicht)",
    explanation: "べきだ: starke Empfehlung oder Pflicht.",
    formation: "Verb (辞書形) + べきだ",
    examples: [
      { japanese: "約束は守るべきだ。", romaji: "Yakusoku wa mamoru beki da.", german: "Man sollte Versprechen halten." },
      { japanese: "もっと早く言うべきだった。", romaji: "Motto hayaku iu beki datta.", german: "Hätte ich früher sagen sollen." }
    ],
    notes: "する→すべき/するべき. Verneinung: ～べきではない.",
    related: ["n4-hazu-da", "n4-nakereba-naranai"]
  },
  {
    id: "n4-tsumori",
    pattern: "～つもりだ",
    level: "N4",
    category: "Satzstrukturen",
    meaning: "Beabsichtigen, vorhaben",
    explanation: "つもりだ: feste Absicht oder Plan.",
    formation: "Verb (辞書形/ない形) + つもりだ",
    examples: [
      { japanese: "来年日本に行くつもりです。", romaji: "Rainen Nihon ni iku tsumori desu.", german: "Ich habe vor, nächstes Jahr nach Japan zu gehen." },
      { japanese: "もう甘いものは食べないつもりだ。", romaji: "Mō amai mono wa tabenai tsumori da.", german: "Ich will keine Süßigkeiten mehr essen." }
    ],
    notes: "～たつもり = glauben es getan zu haben.",
    related: ["n4-volitional", "n4-koto-ni-suru"]
  },
  {
    id: "n4-tewa-ikenai",
    pattern: "～てはいけない",
    level: "N4",
    category: "Satzstrukturen",
    meaning: "Darf nicht, verboten",
    explanation: "てはいけない: Verbot.",
    formation: "Verb (て-Form) + はいけない",
    examples: [
      { japanese: "ここで写真を撮ってはいけません。", romaji: "Koko de shashin o totte wa ikemasen.", german: "Hier darf man nicht fotografieren." },
      { japanese: "授業中に寝てはいけない。", romaji: "Jugyō-chū ni nete wa ikenai.", german: "Im Unterricht darf man nicht schlafen." }
    ],
    notes: "Umgangssprache: ～ちゃだめ.",
    related: ["n4-nakereba-naranai", "n4-nakutemo-ii"]
  },
  {
    id: "n4-nakereba-naranai",
    pattern: "～なければならない",
    level: "N4",
    category: "Satzstrukturen",
    meaning: "Muss, ist notwendig",
    explanation: "なければならない: Pflicht oder Notwendigkeit.",
    formation: "Verb (ない-Stamm) + なければならない",
    examples: [
      { japanese: "宿題をしなければならない。", romaji: "Shukudai o shinakereba naranai.", german: "Ich muss Hausaufgaben machen." },
      { japanese: "明日早く起きなければなりません。", romaji: "Ashita hayaku okinakereba narimasen.", german: "Ich muss morgen früh aufstehen." }
    ],
    notes: "Kurzformen: ～なきゃ, ～なくちゃ.",
    related: ["n4-tewa-ikenai", "n4-nakutemo-ii"]
  },
  {
    id: "n4-nakutemo-ii",
    pattern: "～なくてもいい",
    level: "N4",
    category: "Satzstrukturen",
    meaning: "Muss nicht, braucht nicht",
    explanation: "なくてもいい: nicht notwendig.",
    formation: "Verb (ない-Stamm) + なくてもいい",
    examples: [
      { japanese: "明日は来なくてもいいです。", romaji: "Ashita wa konakutemo ii desu.", german: "Du brauchst morgen nicht zu kommen." },
      { japanese: "全部食べなくてもいいよ。", romaji: "Zenbu tabenakutemo ii yo.", german: "Du musst nicht alles essen." }
    ],
    notes: "Gegenteil: ～なければならない.",
    related: ["n4-nakereba-naranai"]
  },
  {
    id: "n4-ta-hou-ga-ii",
    pattern: "～たほうがいい",
    level: "N4",
    category: "Satzstrukturen",
    meaning: "Sollte besser",
    explanation: "たほうがいい: Rat oder Empfehlung.",
    formation: "Verb (た形) + ほうがいい / Verb (ない形) + ほうがいい",
    examples: [
      { japanese: "早く寝たほうがいいですよ。", romaji: "Hayaku neta hō ga ii desu yo.", german: "Du solltest besser früh schlafen." },
      { japanese: "飲まないほうがいい。", romaji: "Nomanai hō ga ii.", german: "Du solltest besser nicht trinken." }
    ],
    notes: "た形 = Empfehlung. ない形 = Abraten.",
    related: ["n4-beki-da"]
  },
  {
    id: "n4-to-conditional",
    pattern: "～と (Konditional)",
    level: "N4",
    category: "Satzstrukturen",
    meaning: "Wenn/Immer wenn (natürliche Folge)",
    explanation: "と: natürliche, automatische oder gewohnheitsmäßige Folge.",
    formation: "Verb (辞書形/ない形) + と",
    examples: [
      { japanese: "春になると桜が咲く。", romaji: "Haru ni naru to sakura ga saku.", german: "Wenn Frühling wird, blühen die Kirschblüten." },
      { japanese: "このボタンを押すとドアが開きます。", romaji: "Kono botan o osu to doa ga akimasu.", german: "Wenn man diesen Knopf drückt, öffnet sich die Tür." }
    ],
    notes: "Für Naturgesetze, Gewohnheiten, Wegbeschreibungen.",
    related: ["n4-ba", "n4-nara"]
  },
  {
    id: "n4-node",
    pattern: "～ので",
    level: "N4",
    category: "Satzstrukturen",
    meaning: "Weil, da (höflich)",
    explanation: "ので: höflicher und objektiver als から.",
    formation: "Verb/い-Adj + ので / な-Adj + なので",
    examples: [
      { japanese: "熱があるので休みます。", romaji: "Netsu ga aru node yasumimasu.", german: "Da ich Fieber habe, bleibe ich daheim." },
      { japanese: "静かなので勉強しやすい。", romaji: "Shizuka na node benkyō shiyasui.", german: "Da es ruhig ist, kann man gut lernen." }
    ],
    notes: "ので = objektiv/höflich. から = subjektiv/direkt.",
    related: ["kara", "n4-shi"]
  },
  {
    id: "n4-aida-ni",
    pattern: "～間に / ～間",
    level: "N4",
    category: "Satzstrukturen",
    meaning: "Während (Zeitraum)",
    explanation: "間に: innerhalb eines Zeitraums. 間: die gesamte Daür.",
    formation: "Verb (ている) + 間(に) / Nomen + の間(に)",
    examples: [
      { japanese: "母が寝ている間に掃除した。", romaji: "Haha ga neteiru aida ni sōji shita.", german: "Ich putzte, während Mutter schlief." },
      { japanese: "夏休みの間旅行していた。", romaji: "Natsuyasumi no aida ryokō shiteita.", german: "In den Sommerferien war ich auf Reisen." }
    ],
    notes: "間に = punktuell. 間 = durchgehend.",
    related: ["n4-nagara"]
  },
  {
    id: "n4-mae-ni",
    pattern: "～前に",
    level: "N4",
    category: "Satzstrukturen",
    meaning: "Bevor, vor",
    explanation: "前に: vor einer Handlung oder einem Zeitpunkt.",
    formation: "Verb (辞書形) + 前に / Nomen + の前に",
    examples: [
      { japanese: "寝る前に歯を磨きます。", romaji: "Neru mae ni ha o migakimasu.", german: "Vor dem Schlafen putze ich Zähne." },
      { japanese: "食事の前に手を洗ってください。", romaji: "Shokuji no mae ni te o aratte kudasai.", german: "Waschen Sie sich vor dem Essen die Hände." }
    ],
    notes: "Immer mit 辞書形, nie mit た形.",
    related: ["n4-ato-de"]
  },
  {
    id: "n4-ato-de",
    pattern: "～後で / ～てから",
    level: "N4",
    category: "Satzstrukturen",
    meaning: "Nachdem, nach",
    explanation: "後で und てから: nach einer Handlung.",
    formation: "Verb (た形) + 後で / Verb (て) + から",
    examples: [
      { japanese: "仕事が終わった後で飲みに行こう。", romaji: "Shigoto ga owatta ato de nomi ni ikō.", german: "Nach der Arbeit trinken gehen." },
      { japanese: "ご飯を食べてから出かけます。", romaji: "Gohan o tabete kara dekakemasu.", german: "Ich gehe nach dem Essen aus." }
    ],
    notes: "てから betont Reihenfolge stärker.",
    related: ["n4-mae-ni"]
  },
  {
    id: "n4-made-ni",
    pattern: "～までに",
    level: "N4",
    category: "Satzstrukturen",
    meaning: "Bis (Deadline)",
    explanation: "までに: Frist, bis wann etwas erledigt sein muss.",
    formation: "Zeitpunkt/Verb (辞書形) + までに",
    examples: [
      { japanese: "金曜日までにレポートを出してください。", romaji: "Kin'yōbi made ni repōto o dashite kudasai.", german: "Geben Sie den Bericht bis Freitag ab." },
      { japanese: "電車が来るまでに切符を買おう。", romaji: "Densha ga kuru made ni kippu o kaō.", german: "Kaufen wir die Fahrkarte bevor der Zug kommt." }
    ],
    notes: "までに = Deadline. まで = durchgehend bis.",
    related: ["made"]
  },
  {
    id: "n4-relative-clause",
    pattern: "Relativsätze",
    level: "N4",
    category: "Satzstrukturen",
    meaning: "Satz der ein Nomen beschreibt",
    explanation: "Im Japanischen stehen Relativsätze vor dem Nomen. Kein Relativpronomen nötig.",
    formation: "Verb/Adj (Grundform) + Nomen",
    examples: [
      { japanese: "昨日買った本はとても面白い。", romaji: "Kinō katta hon wa totemo omoshiroi.", german: "Das Buch das ich gestern kaufte ist sehr interessant." },
      { japanese: "日本語を教えている先生は田中先生です。", romaji: "Nihongo o oshieteiru sensei wa Tanaka-sensei desu.", german: "Der Lehrer der Japanisch unterrichtet ist Tanaka." }
    ],
    notes: "Einfach den Satz vor das Nomen stellen.",
    related: []
  },
  {
    id: "n4-koto-ga-aru",
    pattern: "～ことがある (manchmal)",
    level: "N4",
    category: "Satzstrukturen",
    meaning: "Es kommt vor dass",
    explanation: "辞書形 + ことがある: etwas passiert gelegentlich.",
    formation: "Verb (辞書形) + ことがある",
    examples: [
      { japanese: "朝ご飯を食べないことがある。", romaji: "Asagohan o tabenai koto ga aru.", german: "Es kommt vor dass ich nicht frühstücke." },
      { japanese: "たまに遅刻することがあります。", romaji: "Tama ni chikoku suru koto ga arimasu.", german: "Gelegentlich komme ich zu spät." }
    ],
    notes: "辞書形 = manchmal. た形 = Erfahrung.",
    related: ["n4-takotogaaru"]
  },
  {
    id: "n4-koto-ni-natteiru",
    pattern: "～ことになっている",
    level: "N4",
    category: "Satzstrukturen",
    meaning: "Es ist so geregelt dass",
    explanation: "ことになっている: bestehende Regel oder Vereinbarung.",
    formation: "Verb (辞書形/ない形) + ことになっている",
    examples: [
      { japanese: "この学校では制服を着ることになっている。", romaji: "Kono gakkō de wa seifuku o kiru koto ni natteiru.", german: "An dieser Schule muss man Uniform tragen." },
      { japanese: "ここでは喫煙しないことになっています。", romaji: "Koko de wa kitsuen shinai koto ni natteimasu.", german: "Hier ist Rauchen nicht erlaubt." }
    ],
    notes: "Regel von außen festgelegt.",
    related: ["n4-koto-ni-naru"]
  },
  {
    id: "n4-toka",
    pattern: "～とか",
    level: "N4",
    category: "Satzstrukturen",
    meaning: "Dinge wie, zum Beispiel",
    explanation: "とか: informelles Auflisten von Beispielen.",
    formation: "Nomen + とか + Nomen + とか",
    examples: [
      { japanese: "週末は映画とか買い物とかする。", romaji: "Shūmatsu wa eiga toka kaimono toka suru.", german: "Am Wochenende Filme schaün, einkaufen usw." },
      { japanese: "りんごとかバナナとか買ってきて。", romaji: "Ringo toka banana toka katte kite.", german: "Kauf Äpfel, Bananen und so." }
    ],
    notes: "Informeller als ～など.",
    related: ["n4-nado", "ya"]
  },
  {
    id: "n4-tte",
    pattern: "～って",
    level: "N4",
    category: "Satzstrukturen",
    meaning: "Informelles Zitat",
    explanation: "って: umgangssprachliches と (Zitatpartikel).",
    formation: "Satz + って",
    examples: [
      { japanese: "田中さんは来ないって。", romaji: "Tanaka-san wa konai tte.", german: "Tanaka sagt er kommt nicht." },
      { japanese: "すみませんって日本語で何？", romaji: "Sumimasen tte nihongo de nani?", german: "Was bedeutet 'sumimasen'?" }
    ],
    notes: "～って言ってた = hat gesagt. ～っていう = namens.",
    related: ["to-quote"]
  },
  {
    id: "n4-ba-yokatta",
    pattern: "～ばよかった",
    level: "N4",
    category: "Satzstrukturen",
    meaning: "Hätte sollen",
    explanation: "ばよかった: Bedaürn über etwas nicht Getanes.",
    formation: "Verb (ば-Form) + よかった",
    examples: [
      { japanese: "もっと勉強すればよかった。", romaji: "Motto benkyō sureba yokatta.", german: "Ich hätte mehr lernen sollen." },
      { japanese: "傘を持ってくればよかった。", romaji: "Kasa o motte kureba yokatta.", german: "Hätte ich einen Schirm mitgenommen." }
    ],
    notes: "Verneinung: ～なければよかった (hätte es nicht tun sollen).",
    related: ["n4-ba"]
  },
  {
    id: "n4-te-itadakemasenka",
    pattern: "～ていただけませんか",
    level: "N4",
    category: "Satzstrukturen",
    meaning: "Könnten Sie bitte (sehr höflich)",
    explanation: "ていただけませんか: sehr höfliche Bitte.",
    formation: "Verb (て-Form) + いただけませんか",
    examples: [
      { japanese: "少々お待ちいただけませんか。", romaji: "Shōshō omachi itadakemasen ka.", german: "Könnten Sie bitte kurz warten?" },
      { japanese: "もう一度説明していただけませんか。", romaji: "Mō ichido setsumei shite itadakemasen ka.", german: "Könnten Sie es nochmal erklären?" }
    ],
    notes: "てください < てもらえませんか < ていただけませんか.",
    related: ["kudasai", "n4-temorau"]
  },
  {
    id: "n4-hodo-nai",
    pattern: "～ほど～ない",
    level: "N4",
    category: "Satzstrukturen",
    meaning: "Nicht so ... wie",
    explanation: "ほど～ない: negativer Vergleich.",
    formation: "A は B ほど + Adj (ない形)",
    examples: [
      { japanese: "東京は大阪ほど暑くない。", romaji: "Tōkyō wa Ōsaka hodo atsuku nai.", german: "Tokio ist nicht so heiß wie Osaka." },
      { japanese: "日本語は中国語ほど難しくない。", romaji: "Nihongo wa chūgokugo hodo muzukashiku nai.", german: "Japanisch ist nicht so schwer wie Chinesisch." }
    ],
    notes: "Negativer Vergleich. Positiv: ～より～のほうが.",
    related: ["n4-yori", "n4-hodo-p"]
  },
  // ============================================================
  // N4 – ERGÄNZUNGEN (27)
  // ============================================================
  {
    id: "n4-you-ni-shiteiru",
    pattern: "～ようにしている",
    level: "N4",
    category: "Satzstrukturen",
    meaning: "Darauf achten, Gewohnheit pflegen",
    explanation: "ようにしている: eine bewusste Gewohnheit, auf die man achtet.",
    formation: "Verb (辞書形/ない形) + ようにしている",
    examples: [
      { japanese: "毎日野菜を食べるようにしている。", romaji: "Mainichi yasai o taberu yō ni shiteiru.", german: "Ich achte darauf, täglich Gemüse zu essen." },
      { japanese: "夜遅く食べないようにしている。", romaji: "Yoru osoku tabenai yō ni shiteiru.", german: "Ich achte darauf, spät abends nicht zu essen." }
    ],
    notes: "ようにする = einmalig versuchen. ようにしている = regelmäßige Gewohnheit.",
    related: ["n4-you-ni-suru"]
  },
  {
    id: "n4-tagaru",
    pattern: "～たがる",
    level: "N4",
    category: "Verben",
    meaning: "Wollen (bei Dritten)",
    explanation: "たがる: drückt den Wunsch einer dritten Person aus. Man kann ～たい nur für sich selbst verwenden.",
    formation: "Verb (ます-Stamm) + たがる",
    examples: [
      { japanese: "子供は外に出たがっている。", romaji: "Kodomo wa soto ni detagatte iru.", german: "Das Kind will nach draußen." },
      { japanese: "彼は日本に行きたがっている。", romaji: "Kare wa Nihon ni ikitagatte iru.", german: "Er will nach Japan gehen." }
    ],
    notes: "Eigener Wunsch: ～たい. Dritte: ～たがる. Godan-Konjugation.",
    related: ["tai", "n4-garu"]
  },
  {
    id: "n4-ppoi",
    pattern: "～っぽい",
    level: "N4",
    category: "Adjektive",
    meaning: "Wirkt wie, -artig, -haft",
    explanation: "っぽい: informell, drückt aus dass etwas den Eindruck von etwas erweckt.",
    formation: "Nomen/Verb-Stamm + っぽい",
    examples: [
      { japanese: "この色は白っぽい。", romaji: "Kono iro wa shiroppoi.", german: "Diese Farbe ist weißlich." },
      { japanese: "彼は怒りっぽい。", romaji: "Kare wa okorippoi.", german: "Er wird leicht wütend." },
      { japanese: "子供っぽい行動だ。", romaji: "Kodomoppoi kōdō da.", german: "Das ist kindisches Verhalten." }
    ],
    notes: "Oft leicht negativ. Konjugation wie い-Adj: っぽくない, っぽかった.",
    related: ["n4-rashii-adj", "n4-gachi"]
  },
  {
    id: "n4-kakeru",
    pattern: "～かける",
    level: "N4",
    category: "Verben",
    meaning: "Anfangen zu / halb tun",
    explanation: "かける: eine Handlung wurde begonnen aber nicht beendet.",
    formation: "Verb (ます-Stamm) + かける",
    examples: [
      { japanese: "読みかけの本がある。", romaji: "Yomikake no hon ga aru.", german: "Ich habe ein angefangenes Buch." },
      { japanese: "言いかけてやめた。", romaji: "Iikakete yameta.", german: "Ich fing an zu sagen und hielt inne." }
    ],
    notes: "死にかける = fast sterben. 食べかけ = halb aufgegessen.",
    related: ["n4-hajimeru"]
  },
  {
    id: "n4-kiru",
    pattern: "～切る",
    level: "N4",
    category: "Verben",
    meaning: "Vollständig, zu Ende tun",
    explanation: "切る als Suffix: eine Handlung vollständig abschließen.",
    formation: "Verb (ます-Stamm) + 切る",
    examples: [
      { japanese: "マラソンを走り切った。", romaji: "Marason o hashiri kitta.", german: "Ich habe den Marathon zu Ende gelaufen." },
      { japanese: "全部使い切ってしまった。", romaji: "Zenbu tsukai kitte shimatta.", german: "Ich habe alles komplett aufgebraucht." }
    ],
    notes: "Betont Vollständigkeit: 食べ切る, 読み切る, 売り切れる (ausverkauft).",
    related: ["n4-owaru", "n4-teshimau"]
  },
  {
    id: "n4-naosu",
    pattern: "～直す",
    level: "N4",
    category: "Verben",
    meaning: "Nochmal machen, erneut tun",
    explanation: "直す als Suffix: eine Handlung wiederholen, um sie zu verbessern.",
    formation: "Verb (ます-Stamm) + 直す",
    examples: [
      { japanese: "もう一度やり直してください。", romaji: "Mō ichido yari naoshite kudasai.", german: "Bitte machen Sie es nochmal." },
      { japanese: "この文を書き直した。", romaji: "Kono bun o kaki naoshita.", german: "Ich habe diesen Satz neu geschrieben." }
    ],
    notes: "やり直す (nochmal machen), 考え直す (nochmal überdenken), 見直す (nochmal prüfen).",
    related: []
  },
  {
    id: "n4-au",
    pattern: "～合う",
    level: "N4",
    category: "Verben",
    meaning: "Gegenseitig, miteinander",
    explanation: "合う als Suffix: eine Handlung wird gegenseitig ausgeführt.",
    formation: "Verb (ます-Stamm) + 合う",
    examples: [
      { japanese: "友達と助け合っている。", romaji: "Tomodachi to tasuke atte iru.", german: "Wir helfen uns gegenseitig." },
      { japanese: "この問題について話し合いましょう。", romaji: "Kono mondai ni tsuite hanashi aimashō.", german: "Lassen Sie uns darüber diskutieren." }
    ],
    notes: "話し合う (diskutieren), 助け合う (sich helfen), 愛し合う (sich lieben).",
    related: []
  },
  {
    id: "n4-koto-wa-ga",
    pattern: "～ことは～が",
    level: "N4",
    category: "Satzstrukturen",
    meaning: "Zwar ... aber",
    explanation: "ことは～が: räumt etwas ein, schränkt es aber ein.",
    formation: "Verb/Adj + ことは + Verb/Adj + が",
    examples: [
      { japanese: "食べることは食べたが、おいしくなかった。", romaji: "Taberu koto wa tabeta ga, oishiku nakatta.", german: "Gegessen habe ich schon, aber lecker war es nicht." },
      { japanese: "高いことは高いが、品質はいい。", romaji: "Takai koto wa takai ga, hinshitsu wa ii.", german: "Teür ist es zwar, aber die Qualität ist gut." }
    ],
    notes: "Das gleiche Verb/Adj wird wiederholt.",
    related: ["n4-noni"]
  },
  {
    id: "n4-te-kudasaimasenka",
    pattern: "～てくださいませんか",
    level: "N4",
    category: "Satzstrukturen",
    meaning: "Würden Sie bitte (höflich)",
    explanation: "てくださいませんか: höfliche Bitte, zwischen てください und ていただけませんか.",
    formation: "Verb (て-Form) + くださいませんか",
    examples: [
      { japanese: "ちょっと手伝ってくださいませんか。", romaji: "Chotto tetsudatte kudasaimasen ka.", german: "Würden Sie mir bitte kurz helfen?" },
      { japanese: "写真を撮ってくださいませんか。", romaji: "Shashin o totte kudasaimasen ka.", german: "Würden Sie bitte ein Foto machen?" }
    ],
    notes: "てください < てくださいませんか < ていただけませんか.",
    related: ["kudasai", "n4-te-itadakemasenka"]
  },
  {
    id: "n4-sasete-morau",
    pattern: "～させてもらう",
    level: "N4",
    category: "Verben",
    meaning: "Sich erlauben lassen zu",
    explanation: "させてもらう: Erlaubnis erbitten und erhalten, etwas zu tun.",
    formation: "Verb (させ-Form) + てもらう",
    examples: [
      { japanese: "今日は早退させてもらいます。", romaji: "Kyō wa sōtai sasete moraimasu.", german: "Ich erlaube mir, heute früher zu gehen." },
      { japanese: "一言言わせてもらいたい。", romaji: "Hitokoto iwasete moraitai.", german: "Ich möchte mir erlauben, etwas zu sagen." }
    ],
    notes: "Höflich: ～させていただく. Sehr häufig in Geschäftsjapanisch.",
    related: ["n4-saseru", "n4-temorau", "n4-sasetekudasai"]
  },
  {
    id: "n4-toiu",
    pattern: "～という",
    level: "N4",
    category: "Satzstrukturen",
    meaning: "Genannt, namens, dass",
    explanation: "という: identifiziert oder definiert etwas, oder leitet indirekte Rede ein.",
    formation: "Nomen/Satz + という + Nomen",
    examples: [
      { japanese: "「桜」という漢字を知っていますか。", romaji: "\"Sakura\" to iu kanji o shitteimasu ka.", german: "Kennen Sie das Kanji namens 'Sakura'?" },
      { japanese: "明日テストがあるということを聞いた。", romaji: "Ashita tesuto ga aru to iu koto o kiita.", german: "Ich habe gehört, dass morgen ein Test ist." }
    ],
    notes: "Umgangssprache: っていう. ～ということだ = das bedeutet.",
    related: ["n4-tte"]
  },
  {
    id: "n4-you-to-suru",
    pattern: "～ようとする",
    level: "N4",
    category: "Verben",
    meaning: "Versuchen zu, im Begriff sein zu",
    explanation: "ようとする: den Versuch unternehmen oder kurz davor sein.",
    formation: "Verb (Volitionalform) + とする",
    examples: [
      { japanese: "ドアを開けようとしたが開かなかった。", romaji: "Doa o akeyō to shita ga akanakatta.", german: "Ich versuchte die Tür zu öffnen, aber sie ging nicht auf." },
      { japanese: "出かけようとした時電話が鳴った。", romaji: "Dekakeyō to shita toki denwa ga natta.", german: "Als ich gerade gehen wollte, klingelte das Telefon." }
    ],
    notes: "～ようとしている = gerade im Begriff sein zu.",
    related: ["n4-volitional", "n4-temiru"]
  },
  {
    id: "n4-tara",
    pattern: "～たら",
    level: "N4",
    category: "Satzstrukturen",
    meaning: "Wenn, falls, als (Konditional)",
    explanation: "たら: vielseitigstes Konditional. Hypothetisch, temporal oder überraschend.",
    formation: "Verb (た形) + ら / い-Adj: かったら / な-Adj: だったら",
    examples: [
      { japanese: "雨が降ったら行きません。", romaji: "Ame ga futtara ikimasen.", german: "Wenn es regnet, gehe ich nicht." },
      { japanese: "家に帰ったら電話してください。", romaji: "Ie ni kaettara denwa shite kudasai.", german: "Ruf an, wenn du zuhause bist." },
      { japanese: "窓を開けたら富士山が見えた。", romaji: "Mado o aketara Fujisan ga mieta.", german: "Als ich das Fenster öffnete, sah ich den Fuji." }
    ],
    notes: "Vielseitigstes Konditional. Auch für Überraschungen: ～たら～た.",
    related: ["n4-ba", "n4-nara", "n4-to-conditional"]
  },
  {
    id: "n4-tokini",
    pattern: "～時(に)",
    level: "N4",
    category: "Satzstrukturen",
    meaning: "Wenn, als (Zeitpunkt)",
    explanation: "時に: gibt den Zeitpunkt an, wann etwas passiert.",
    formation: "Verb (辞書形/た形) + 時 / Nomen + の時",
    examples: [
      { japanese: "日本に行った時お寺を見ました。", romaji: "Nihon ni itta toki otera o mimashita.", german: "Als ich in Japan war, besuchte ich Tempel." },
      { japanese: "困った時は相談してください。", romaji: "Komatta toki wa sōdan shite kudasai.", german: "Wenn Sie Probleme haben, fragen Sie." }
    ],
    notes: "辞書形+時 = bevor man es tut. た形+時 = nachdem man es getan hat.",
    related: ["n4-aida-ni", "n4-tara"]
  },
  {
    id: "n4-noni-purpose",
    pattern: "～のに (Zweck)",
    level: "N4",
    category: "Satzstrukturen",
    meaning: "Um zu, zum (Zweck)",
    explanation: "のに als Zweck: drückt aus, wofür etwas benötigt wird.",
    formation: "Verb (辞書形) + のに + nötig/nützlich/etc.",
    examples: [
      { japanese: "この本は勉強するのに役立つ。", romaji: "Kono hon wa benkyō suru noni yakudatsu.", german: "Dieses Buch ist nützlich zum Lernen." },
      { japanese: "日本語を覚えるのに時間がかかる。", romaji: "Nihongo o oboeru noni jikan ga kakaru.", german: "Japanisch zu lernen braucht Zeit." }
    ],
    notes: "Nicht verwechseln mit ～のに (obwohl). Hier: Zweck/Nutzen.",
    related: ["n4-noni", "n4-tame-ni"]
  },
  {
    id: "n4-te-sumu",
    pattern: "～てすむ / ～ずにすむ",
    level: "N4",
    category: "Verben",
    meaning: "Es reicht aus / man kommt drum herum",
    explanation: "てすむ: etwas reicht aus. ずにすむ/ないですむ: man muss es nicht tun.",
    formation: "Verb (て) + すむ / Verb (ず) + にすむ",
    examples: [
      { japanese: "薬を飲まずにすんだ。", romaji: "Kusuri o nomazu ni sunda.", german: "Ich kam drum herum, Medizin zu nehmen." },
      { japanese: "千円ですみました。", romaji: "Sen-en de sumimashita.", german: "Tausend Yen haben gereicht." }
    ],
    notes: "ないですむ = informeller als ずにすむ.",
    related: ["n4-zu-ni"]
  },
  {
    id: "n4-te-shimau-casual",
    pattern: "～ちゃう / ～じゃう",
    level: "N4",
    category: "Verben",
    meaning: "Umgangssprachliches ～てしまう",
    explanation: "ちゃう und じゃう: verkürzte Formen von てしまう und でしまう.",
    formation: "Verb (て→ちゃう) / Verb (で→じゃう)",
    examples: [
      { japanese: "全部食べちゃった。", romaji: "Zenbu tabechatta.", german: "Ich hab alles aufgegessen." },
      { japanese: "電車に忘れ物しちゃった。", romaji: "Densha ni wasuremono shichatta.", german: "Ich hab was in der Bahn vergessen." },
      { japanese: "飲んじゃだめだよ。", romaji: "Nonja dame da yo.", german: "Du sollst das nicht trinken." }
    ],
    notes: "Sehr häufig im Alltag. て→ちゃ, で→じゃ.",
    related: ["n4-teshimau"]
  },
  {
    id: "n4-dasu",
    pattern: "～出す",
    level: "N4",
    category: "Verben",
    meaning: "Plötzlich anfangen zu",
    explanation: "出す als Suffix: plötzlicher Beginn einer Handlung.",
    formation: "Verb (ます-Stamm) + 出す",
    examples: [
      { japanese: "急に雨が降り出した。", romaji: "Kyū ni ame ga furi dashita.", german: "Plötzlich fing es an zu regnen." },
      { japanese: "赤ちゃんが泣き出した。", romaji: "Akachan ga naki dashita.", german: "Das Baby fing plötzlich an zu weinen." }
    ],
    notes: "Betont den plötzlichen Beginn. Vgl. ～始める (allgemeiner Beginn).",
    related: ["n4-hajimeru"]
  },
  {
    id: "n4-wasureru",
    pattern: "～忘れる",
    level: "N4",
    category: "Verben",
    meaning: "Vergessen zu tun",
    explanation: "忘れる als Suffix: man vergisst eine Handlung auszuführen.",
    formation: "Verb (ます-Stamm) + 忘れる",
    examples: [
      { japanese: "鍵をかけ忘れた。", romaji: "Kagi o kake wasureta.", german: "Ich vergaß abzuschließen." },
      { japanese: "薬を飲み忘れないでね。", romaji: "Kusuri o nomi wasurenaide ne.", german: "Vergiss nicht die Medizin zu nehmen." }
    ],
    notes: "言い忘れる (vergessen zu sagen), 買い忘れる (vergessen zu kaufen).",
    related: []
  },
  {
    id: "n4-souni-suru",
    pattern: "～ふりをする",
    level: "N4",
    category: "Satzstrukturen",
    meaning: "So tun als ob",
    explanation: "ふりをする: vortäuschen, sich verstellen.",
    formation: "Verb (辞書形/ない形) + ふりをする / Nomen + のふりをする",
    examples: [
      { japanese: "知らないふりをした。", romaji: "Shiranai furi o shita.", german: "Ich tat so, als wüsste ich nichts." },
      { japanese: "寝たふりをしている。", romaji: "Neta furi o shiteiru.", german: "Er tut so, als ob er schläft." }
    ],
    notes: "Immer bewusstes Vortäuschen.",
    related: []
  },
  {
    id: "n4-hazu-ga-nai",
    pattern: "～はずがない",
    level: "N4",
    category: "Satzstrukturen",
    meaning: "Kann unmöglich sein",
    explanation: "はずがない: starke Verneinung einer Möglichkeit.",
    formation: "Verb/Adj (Grundform) + はずがない",
    examples: [
      { japanese: "彼がそんなことをするはずがない。", romaji: "Kare ga sonna koto o suru hazu ga nai.", german: "Er kann unmöglich so etwas tun." },
      { japanese: "こんなに安いはずがない。", romaji: "Konna ni yasui hazu ga nai.", german: "Das kann unmöglich so billig sein." }
    ],
    notes: "Stärker als ～ないだろう. Gegenteil: ～はずだ (müsste sein).",
    related: ["n4-hazu-da", "n4-wake-da"]
  },
  {
    id: "n4-wake-ni-ikanai",
    pattern: "～わけにはいかない",
    level: "N4",
    category: "Satzstrukturen",
    meaning: "Kann nicht einfach, darf nicht",
    explanation: "わけにはいかない: aus moralischen oder sozialen Gründen nicht möglich.",
    formation: "Verb (辞書形) + わけにはいかない",
    examples: [
      { japanese: "約束したから行かないわけにはいかない。", romaji: "Yakusoku shita kara ikanai wake ni wa ikanai.", german: "Ich habe es versprochen, also kann ich nicht einfach nicht gehen." },
      { japanese: "ここで諦めるわけにはいかない。", romaji: "Koko de akirameru wake ni wa ikanai.", german: "Ich kann hier nicht einfach aufgeben." }
    ],
    notes: "Soziale/moralische Unmöglichkeit, nicht physische.",
    related: ["n4-wake-da", "n4-nakereba-naranai"]
  },
  {
    id: "n4-tara-dou",
    pattern: "～たらどう",
    level: "N4",
    category: "Satzstrukturen",
    meaning: "Wie wäre es, wenn",
    explanation: "たらどう: informeller Vorschlag oder Ratschlag.",
    formation: "Verb (たら) + どう(ですか)",
    examples: [
      { japanese: "医者に行ったらどう？", romaji: "Isha ni ittara dō?", german: "Wie wäre es, zum Arzt zu gehen?" },
      { japanese: "もっと休んだらどうですか。", romaji: "Motto yasundara dō desu ka.", german: "Wie wäre es, sich mehr auszuruhen?" }
    ],
    notes: "Kann je nach Ton auch ungeduldig klingen.",
    related: ["n4-ta-hou-ga-ii", "n4-tara"]
  },
  {
    id: "n4-no-wa-da",
    pattern: "～のは～だ",
    level: "N4",
    category: "Satzstrukturen",
    meaning: "Der Grund ist / es ist ... dass",
    explanation: "のは～だ/からだ: Betonung oder Erklärung des Grundes.",
    formation: "Satz + のは + Nomen/Adj + だ/からだ",
    examples: [
      { japanese: "遅れたのは電車のせいだ。", romaji: "Okureta no wa densha no sei da.", german: "Der Grund für die Verspätung war die Bahn." },
      { japanese: "驚いたのは値段が高かったからだ。", romaji: "Odoroita no wa nedan ga takakatta kara da.", german: "Überrascht war ich, weil der Preis hoch war." }
    ],
    notes: "Betont den Grund oder das wichtige Element.",
    related: ["no-wa-da"]
  },
  {
    id: "n4-daroo",
    pattern: "～だろう / ～でしょう",
    level: "N4",
    category: "Satzstrukturen",
    meaning: "Wahrscheinlich, vermutlich",
    explanation: "だろう (informell) und でしょう (höflich): Vermutung oder Erwartung.",
    formation: "Verb/Adj/Nomen + だろう/でしょう",
    examples: [
      { japanese: "明日は晴れるでしょう。", romaji: "Ashita wa hareru deshō.", german: "Morgen wird es wohl sonnig." },
      { japanese: "彼はもう帰っただろう。", romaji: "Kare wa mō kaetta darō.", german: "Er ist wohl schon nach Hause gegangen." }
    ],
    notes: "でしょう? (mit Frageton) = nicht wahr? / oder?",
    related: ["n4-kamoshirenai", "n4-hazu-da"]
  },
  // ============================================================
  // N3 – PARTIKEL (15)
  // ============================================================
  {
    id: "n3-ni-kanshite",
    pattern: "～に関して",
    level: "N3",
    category: "Partikel",
    meaning: "Bezüglich, hinsichtlich",
    explanation: "に関して: formelle Variante von ～について. Oft in Schrift und Berichten.",
    formation: "Nomen + に関して / に関する + Nomen",
    examples: [
      { japanese: "この件に関して質問があります。", romaji: "Kono ken ni kanshite shitsumon ga arimasu.", german: "Bezüglich dieser Angelegenheit habe ich eine Frage." },
      { japanese: "環境に関する問題が増えている。", romaji: "Kankyō ni kansuru mondai ga fueteiru.", german: "Umweltbezogene Probleme nehmen zu." }
    ],
    notes: "Formeller als ～について. Vor Nomen: ～に関する.",
    related: ["n4-ni-tsuite"]
  },
  {
    id: "n3-ni-kurabete",
    pattern: "～に比べて",
    level: "N3",
    category: "Partikel",
    meaning: "Im Vergleich zu",
    explanation: "に比べて: drückt einen Vergleich zwischen zwei Dingen aus.",
    formation: "Nomen + に比べて",
    examples: [
      { japanese: "去年に比べて売上が伸びた。", romaji: "Kyonen ni kurabete uriage ga nobita.", german: "Im Vergleich zum letzten Jahr ist der Umsatz gestiegen." },
      { japanese: "東京に比べて大阪は物価が安い。", romaji: "Tōkyō ni kurabete Ōsaka wa bukka ga yasui.", german: "Im Vergleich zu Tokio sind die Preise in Osaka günstiger." }
    ],
    notes: "Ähnlich wie ～より, aber formeller und expliziter.",
    related: ["n4-yori"]
  },
  {
    id: "n3-ni-motozuite",
    pattern: "～に基づいて",
    level: "N3",
    category: "Partikel",
    meaning: "Basierend auf, auf Grundlage von",
    explanation: "に基づいて: etwas wird auf Basis von Fakten oder Regeln getan.",
    formation: "Nomen + に基づいて / に基づく + Nomen",
    examples: [
      { japanese: "法律に基づいて判断する。", romaji: "Hōritsu ni motozuite handan suru.", german: "Auf Grundlage des Gesetzes urteilen." },
      { japanese: "事実に基づいた映画です。", romaji: "Jijitsu ni motozuita eiga desu.", german: "Ein auf Tatsachen basierender Film." }
    ],
    notes: "Vor Nomen: ～に基づく/～に基づいた.",
    related: []
  },
  {
    id: "n3-ni-oite",
    pattern: "～において",
    level: "N3",
    category: "Partikel",
    meaning: "In, bei, an (formal)",
    explanation: "において: formelle Variante von ～で (Ort/Bereich). Schriftsprache.",
    formation: "Nomen + において / における + Nomen",
    examples: [
      { japanese: "会議は東京において行われた。", romaji: "Kaigi wa Tōkyō ni oite okonawareta.", german: "Die Konferenz fand in Tokio statt." },
      { japanese: "現代社会における問題を考える。", romaji: "Gendai shakai ni okeru mondai o kangaeru.", german: "Probleme in der modernen Gesellschaft bedenken." }
    ],
    notes: "Vor Nomen: ～における. Sehr formell/schriftlich.",
    related: ["de"]
  },
  {
    id: "n3-ni-ojite",
    pattern: "～に応じて",
    level: "N3",
    category: "Partikel",
    meaning: "Entsprechend, je nach",
    explanation: "に応じて: sich anpassend an Umstände oder Bedingungen.",
    formation: "Nomen + に応じて / に応じた + Nomen",
    examples: [
      { japanese: "状況に応じて対応を変える。", romaji: "Jōkyō ni ōjite taiō o kaeru.", german: "Je nach Situation die Reaktion ändern." },
      { japanese: "能力に応じた仕事を与える。", romaji: "Nōryoku ni ōjita shigoto o ataeru.", german: "Eine den Fähigkeiten entsprechende Arbeit geben." }
    ],
    notes: "Ähnlich: ～に合わせて, ～次第で.",
    related: ["n3-shidai"]
  },
  {
    id: "n3-ni-tomonatte",
    pattern: "～に伴って",
    level: "N3",
    category: "Partikel",
    meaning: "Mit, einhergehend mit",
    explanation: "に伴って: eine Veränderung, die parallel zu einer anderen stattfindet.",
    formation: "Nomen + に伴って / に伴い / に伴う + Nomen",
    examples: [
      { japanese: "人口増加に伴って環境問題が深刻化した。", romaji: "Jinkō zōka ni tomonatte kankyō mondai ga shinkokuka shita.", german: "Mit dem Bevölkerungswachstum verschärften sich die Umweltprobleme." },
      { japanese: "経済成長に伴う変化が見られる。", romaji: "Keizai seichō ni tomonau henka ga mirareru.", german: "Mit dem Wirtschaftswachstum einhergehende Veränderungen sind sichtbar." }
    ],
    notes: "Formell. Ähnlich: ～につれて, ～とともに.",
    related: ["n3-ni-tsurete"]
  },
  {
    id: "n3-o-hajime",
    pattern: "～をはじめ",
    level: "N3",
    category: "Partikel",
    meaning: "Angefangen mit, allen voran",
    explanation: "をはじめ: hebt ein Hauptbeispiel hervor und impliziert weitere.",
    formation: "Nomen + をはじめ(として)",
    examples: [
      { japanese: "日本をはじめアジアの国々を訪れた。", romaji: "Nihon o hajime Ajia no kuniguni o otozureta.", german: "Ich besuchte asiatische Länder, allen voran Japan." },
      { japanese: "社長をはじめ社員全員が参加した。", romaji: "Shachō o hajime shain zen'in ga sanka shita.", german: "Alle Mitarbeiter nahmen teil, angefangen mit dem Firmenchef." }
    ],
    notes: "Formell. Das nach をはじめ genannte ist das wichtigste Beispiel.",
    related: ["n4-nado"]
  },
  {
    id: "n3-o-tsujite",
    pattern: "～を通じて / ～を通して",
    level: "N3",
    category: "Partikel",
    meaning: "Durch, über (Mittel/Zeitraum)",
    explanation: "を通じて/を通して: über ein Medium oder einen Zeitraum hindurch.",
    formation: "Nomen + を通じて/を通して",
    examples: [
      { japanese: "インターネットを通じて世界とつながる。", romaji: "Intānetto o tsūjite sekai to tsunagaru.", german: "Durch das Internet mit der Welt verbunden sein." },
      { japanese: "一年を通して暖かい気候だ。", romaji: "Ichinen o tōshite atatakai kikō da.", german: "Das Klima ist das ganze Jahr über warm." }
    ],
    notes: "を通じて = eher abstrakt/Medium. を通して = auch konkret/Zeitraum.",
    related: ["n4-ni-yotte"]
  },
  {
    id: "n3-o-chushin-ni",
    pattern: "～を中心に",
    level: "N3",
    category: "Partikel",
    meaning: "Mit ... im Mittelpunkt",
    explanation: "を中心に: etwas steht im Zentrum oder Fokus.",
    formation: "Nomen + を中心に(して)",
    examples: [
      { japanese: "駅を中心に町が発展した。", romaji: "Eki o chūshin ni machi ga hatten shita.", german: "Die Stadt hat sich um den Bahnhof herum entwickelt." },
      { japanese: "文法を中心に勉強している。", romaji: "Bunpō o chūshin ni benkyō shiteiru.", german: "Ich lerne mit dem Schwerpunkt auf Grammatik." }
    ],
    notes: "Auch: ～を中心として (formeller).",
    related: []
  },
  {
    id: "n3-ni-tsurete",
    pattern: "～につれて",
    level: "N3",
    category: "Partikel",
    meaning: "Je mehr ... desto (proportional)",
    explanation: "につれて: zwei Veränderungen verlaufen parallel.",
    formation: "Verb (辞書形) + につれて / Nomen + につれて",
    examples: [
      { japanese: "年を取るにつれて体力が落ちる。", romaji: "Toshi o toru ni tsurete tairyoku ga ochiru.", german: "Je älter man wird, desto mehr schwindet die Körperkraft." },
      { japanese: "時間が経つにつれて忘れてしまう。", romaji: "Jikan ga tatsu ni tsurete wasurete shimau.", german: "Mit der Zeit vergisst man." }
    ],
    notes: "Ähnlich: ～に伴って (formeller), ～に従って (Regel folgend).",
    related: ["n3-ni-tomonatte", "n3-ni-shitagatte"]
  },
  {
    id: "n3-ni-shitagatte",
    pattern: "～に従って",
    level: "N3",
    category: "Partikel",
    meaning: "Gemäß, folgend; je mehr",
    explanation: "に従って: einer Regel/Anweisung folgen, oder proportionale Veränderung.",
    formation: "Nomen + に従って / Verb (辞書形) + に従って",
    examples: [
      { japanese: "指示に従って作業してください。", romaji: "Shiji ni shitagatte sagyō shite kudasai.", german: "Bitte arbeiten Sie gemäß den Anweisungen." },
      { japanese: "高度が上がるに従って気温が下がる。", romaji: "Kōdo ga agaru ni shitagatte kion ga sagaru.", german: "Je höher man steigt, desto niedriger wird die Temperatur." }
    ],
    notes: "Regel: ～に従って + tun. Proportional: wie ～につれて.",
    related: ["n3-ni-tsurete"]
  },
  {
    id: "n3-ni-watatte",
    pattern: "～にわたって",
    level: "N3",
    category: "Partikel",
    meaning: "Über ... hinweg, sich erstreckend",
    explanation: "にわたって: drückt aus, dass etwas einen weiten Bereich oder Zeitraum umfasst.",
    formation: "Nomen + にわたって / にわたる + Nomen",
    examples: [
      { japanese: "三日間にわたって会議が行われた。", romaji: "Mikkakan ni watatte kaigi ga okonawareta.", german: "Die Konferenz erstreckte sich über drei Tage." },
      { japanese: "広い範囲にわたる調査を行った。", romaji: "Hiroi han'i ni wataru chōsa o okonatta.", german: "Eine Untersuchung über ein breites Gebiet wurde durchgeführt." }
    ],
    notes: "Vor Nomen: ～にわたる. Betont Ausdehnung in Zeit oder Raum.",
    related: ["n3-ni-kakete"]
  },
  {
    id: "n3-ni-kakete",
    pattern: "～にかけて",
    level: "N3",
    category: "Partikel",
    meaning: "Von ... bis (Zeitraum/Bereich)",
    explanation: "にかけて: von einem Punkt bis zu einem anderen, meist mit ～から.",
    formation: "Nomen + から + Nomen + にかけて",
    examples: [
      { japanese: "午後から夕方にかけて雨が降るでしょう。", romaji: "Gogo kara yūgata ni kakete ame ga furu deshō.", german: "Vom Nachmittag bis zum Abend wird es wohl regnen." },
      { japanese: "関東から東北にかけて地震があった。", romaji: "Kantō kara Tōhoku ni kakete jishin ga atta.", german: "Von Kantō bis Tōhoku gab es ein Erdbeben." }
    ],
    notes: "Oft mit ～から: AからBにかけて = von A bis B.",
    related: ["n3-ni-watatte"]
  },
  {
    id: "n3-muke",
    pattern: "～向け",
    level: "N3",
    category: "Partikel",
    meaning: "Für, gerichtet an (Zielgruppe)",
    explanation: "向け: gibt die Zielgruppe an, für die etwas bestimmt ist.",
    formation: "Nomen + 向け(の) + Nomen",
    examples: [
      { japanese: "子供向けの番組が多い。", romaji: "Kodomo muke no bangumi ga ōi.", german: "Es gibt viele Sendungen für Kinder." },
      { japanese: "外国人向けの日本語教材です。", romaji: "Gaikokujin muke no nihongo kyōzai desu.", german: "Das ist ein Japanisch-Lehrmaterial für Ausländer." }
    ],
    notes: "向け = Zielgruppe. 向き = geeignet für (n3-muki).",
    related: ["n3-muki"]
  },
  {
    id: "n3-muki",
    pattern: "～向き",
    level: "N3",
    category: "Partikel",
    meaning: "Geeignet für, passend für",
    explanation: "向き: drückt aus, dass etwas für eine bestimmte Gruppe geeignet ist.",
    formation: "Nomen + 向き(の) + Nomen",
    examples: [
      { japanese: "この本は初心者向きだ。", romaji: "Kono hon wa shoshinsha muki da.", german: "Dieses Buch ist für Anfänger geeignet." },
      { japanese: "家族向きのレストランを探している。", romaji: "Kazoku muki no resutoran o sagashiteiru.", german: "Ich suche ein familiengeeignetes Restaurant." }
    ],
    notes: "向き = geeignet. 向け = gezielt für.",
    related: ["n3-muke"]
  },
  // ============================================================
  // N3 – VERBEN (30)
  // ============================================================
  {
    id: "n3-zaruwoenai",
    pattern: "～ざるを得ない",
    level: "N3",
    category: "Verben",
    meaning: "Nicht umhin können, müssen",
    explanation: "ざるを得ない: man hat keine andere Wahl als etwas zu tun.",
    formation: "Verb (ない-Stamm) + ざるを得ない",
    examples: [
      { japanese: "この条件を受け入れざるを得ない。", romaji: "Kono jōken o ukeirezaru o enai.", german: "Ich muss diese Bedingungen akzeptieren." },
      { japanese: "事情があって辞めざるを得なかった。", romaji: "Jijō ga atte yamezaru o enakatta.", german: "Aus bestimmten Gründen musste ich aufhören." }
    ],
    notes: "する→せざるを得ない. Formell. Ähnlich: ～ないわけにはいかない.",
    related: ["n4-nakereba-naranai", "n4-wake-ni-ikanai"]
  },
  {
    id: "n3-kaneru",
    pattern: "～かねる",
    level: "N3",
    category: "Verben",
    meaning: "Nicht können (höflich ablehnend)",
    explanation: "かねる: höfliche Art zu sagen, dass man etwas leider nicht tun kann.",
    formation: "Verb (ます-Stamm) + かねる",
    examples: [
      { japanese: "その要望にはお応えしかねます。", romaji: "Sono yōbō ni wa okotae shikanemasu.", german: "Dieser Bitte können wir leider nicht entsprechen." },
      { japanese: "賛成しかねる意見だ。", romaji: "Sansei shikaneru iken da.", german: "Eine Meinung, der ich nicht zustimmen kann." }
    ],
    notes: "Höfliche Ablehnung im Geschäftsjapanisch.",
    related: ["n3-kanenai"]
  },
  {
    id: "n3-kanenai",
    pattern: "～かねない",
    level: "N3",
    category: "Verben",
    meaning: "Könnte (negativ), es besteht die Gefahr",
    explanation: "かねない: warnt davor, dass etwas Negatives passieren könnte.",
    formation: "Verb (ます-Stamm) + かねない",
    examples: [
      { japanese: "このままでは事故になりかねない。", romaji: "Kono mama de wa jiko ni narikanenai.", german: "So wie es ist, könnte es zu einem Unfall kommen." },
      { japanese: "誤解を招きかねない発言だ。", romaji: "Gokai o manekikanenai hatsugen da.", german: "Eine Aussage, die zu Missverständnissen führen könnte." }
    ],
    notes: "Immer negatives Ergebnis. Gegenteil von ～かねる.",
    related: ["n3-kaneru", "n3-osore-ga-aru"]
  },
  {
    id: "n3-uru-enai",
    pattern: "～得る / ～得ない",
    level: "N3",
    category: "Verben",
    meaning: "Möglich / unmöglich (formell)",
    explanation: "得る (うる/える): etwas ist möglich. 得ない (えない): unmöglich.",
    formation: "Verb (ます-Stamm) + 得る/得ない",
    examples: [
      { japanese: "そんなことはあり得ない。", romaji: "Sonna koto wa arienai.", german: "So etwas ist unmöglich." },
      { japanese: "十分起こり得ることだ。", romaji: "Jūbun okoriru koto da.", german: "Es ist durchaus möglich, dass das passiert." }
    ],
    notes: "あり得る (ありうる/ありえる) = möglich. あり得ない = unmöglich (Umgangssprache: ありえない!).",
    related: ["n4-potential"]
  },
  {
    id: "n3-nuku",
    pattern: "～抜く",
    level: "N3",
    category: "Verben",
    meaning: "Bis zum Ende durchhalten",
    explanation: "抜く als Suffix: eine schwierige Handlung vollständig durchziehen.",
    formation: "Verb (ます-Stamm) + 抜く",
    examples: [
      { japanese: "最後まで走り抜いた。", romaji: "Saigo made hashiri nuita.", german: "Ich bin bis zum Ende durchgelaufen." },
      { japanese: "困難を乗り越え、やり抜いた。", romaji: "Konnan o norikoete, yari nuita.", german: "Ich überwand die Schwierigkeiten und zog es durch." }
    ],
    notes: "考え抜く (gründlich durchdenken), 悩み抜く (sich gründlich quälen).",
    related: ["n4-kiru", "n4-tsuzukeru"]
  },
  {
    id: "n3-ppanashi",
    pattern: "～っぱなし",
    level: "N3",
    category: "Verben",
    meaning: "Etwas gelassen haben (unverändert)",
    explanation: "っぱなし: ein Zustand bleibt unverändert, oft negativ konnotiert.",
    formation: "Verb (ます-Stamm) + っぱなし",
    examples: [
      { japanese: "ドアを開けっぱなしにしないで。", romaji: "Doa o akeppanashi ni shinaide.", german: "Lass die Tür nicht offen stehen." },
      { japanese: "テレビをつけっぱなしで寝た。", romaji: "Terebi o tsukeppanashi de neta.", german: "Ich schlief mit laufendem Fernseher ein." }
    ],
    notes: "Oft Kritik: 出しっぱなし (liegen gelassen), 立ちっぱなし (ständig stehend).",
    related: ["n4-mama"]
  },
  {
    id: "n3-koto-naku",
    pattern: "～ことなく",
    level: "N3",
    category: "Verben",
    meaning: "Ohne zu (formell)",
    explanation: "ことなく: formelle Variante von ～ないで/～ずに.",
    formation: "Verb (辞書形) + ことなく",
    examples: [
      { japanese: "諦めることなく努力し続けた。", romaji: "Akirameru koto naku doryoku shi tsuzuketa.", german: "Ohne aufzugeben, bemühte ich mich weiter." },
      { japanese: "一度も休むことなく働いた。", romaji: "Ichido mo yasumu koto naku hataraita.", german: "Ich arbeitete, ohne ein einziges Mal zu pausieren." }
    ],
    notes: "Formeller als ～ないで/～ずに.",
    related: ["n4-zu-ni"]
  },
  {
    id: "n3-te-tamaranai",
    pattern: "～てたまらない",
    level: "N3",
    category: "Verben",
    meaning: "Unerträglich, extrem (Gefühl)",
    explanation: "てたまらない: ein Gefühl oder Zustand ist so stark, dass man es kaum aushalten kann.",
    formation: "Verb (て) + たまらない / い-Adj (くて) + たまらない",
    examples: [
      { japanese: "暑くてたまらない。", romaji: "Atsukute tamaranai.", german: "Es ist unerträglich heiß." },
      { japanese: "会いたくてたまらない。", romaji: "Aitakute tamaranai.", german: "Ich will dich so sehr sehen, dass ich es kaum aushalte." }
    ],
    notes: "Ähnlich: ～てしかたがない, ～てならない. Alle = unerträgliches Gefühl.",
    related: ["n3-te-naranai", "n3-te-shikata-ga-nai"]
  },
  {
    id: "n3-te-naranai",
    pattern: "～てならない",
    level: "N3",
    category: "Verben",
    meaning: "Kann nicht anders als (Gefühl)",
    explanation: "てならない: ein unwillkürliches Gefühl, das man nicht kontrollieren kann.",
    formation: "Verb (て) + ならない / い-Adj (くて) + ならない",
    examples: [
      { japanese: "彼のことが心配でならない。", romaji: "Kare no koto ga shinpai de naranai.", german: "Ich mache mir solche Sorgen um ihn." },
      { japanese: "残念でならない。", romaji: "Zannen de naranai.", german: "Es ist zutiefst bedaürlich." }
    ],
    notes: "Formeller als ～てたまらない. Eher für emotionale Gefühle.",
    related: ["n3-te-tamaranai"]
  },
  {
    id: "n3-te-shikata-ga-nai",
    pattern: "～てしかたがない",
    level: "N3",
    category: "Verben",
    meaning: "Kann nichts dagegen tun (Gefühl)",
    explanation: "てしかたがない/てしょうがない: ein Gefühl ist so stark, man kann nichts dagegen tun.",
    formation: "Verb (て) + しかたがない / い-Adj (くて) + しかたがない",
    examples: [
      { japanese: "眠くてしかたがない。", romaji: "Nemukute shikata ga nai.", german: "Ich bin so müde, ich kann nichts dagegen tun." },
      { japanese: "面白くてしょうがない。", romaji: "Omoshirokute shō ga nai.", german: "Es ist so lustig, ich kann nicht aufhören." }
    ],
    notes: "しょうがない = informeller. Ähnlich: ～てたまらない, ～てならない.",
    related: ["n3-te-tamaranai", "n3-te-naranai"]
  },
  {
    id: "n3-kke",
    pattern: "～っけ",
    level: "N3",
    category: "Verben",
    meaning: "War es ...? (sich erinnern)",
    explanation: "っけ: man versucht sich an etwas zu erinnern oder fragt nach.",
    formation: "Verb/Adj/Nomen (た形/だ) + っけ",
    examples: [
      { japanese: "明日は何曜日だっけ？", romaji: "Ashita wa nan'yōbi dakkke?", german: "Welcher Tag war morgen nochmal?" },
      { japanese: "あの人の名前は何だっけ。", romaji: "Ano hito no namae wa nan dakke.", german: "Wie war nochmal der Name dieser Person?" }
    ],
    notes: "Informell. Drückt aus, dass man etwas vergessen hat und sich erinnern will.",
    related: []
  },
  {
    id: "n3-te-hajimete",
    pattern: "～て初めて",
    level: "N3",
    category: "Verben",
    meaning: "Erst nachdem, zum ersten Mal durch",
    explanation: "て初めて: erst durch eine Erfahrung versteht oder erkennt man etwas.",
    formation: "Verb (て-Form) + 初めて",
    examples: [
      { japanese: "日本に来て初めて寿司を食べた。", romaji: "Nihon ni kite hajimete sushi o tabeta.", german: "Erst als ich nach Japan kam, aß ich zum ersten Mal Sushi." },
      { japanese: "失って初めて大切さに気づいた。", romaji: "Ushinatte hajimete taisetsusa ni kizuita.", german: "Erst als ich es verlor, erkannte ich seinen Wert." }
    ],
    notes: "Betont, dass etwas erst durch eine bestimmte Erfahrung möglich wurde.",
    related: []
  },
  {
    id: "n3-te-irai",
    pattern: "～て以来",
    level: "N3",
    category: "Verben",
    meaning: "Seit (einem Ereignis)",
    explanation: "て以来: seit einem bestimmten Ereignis, der Zustand daürt an.",
    formation: "Verb (て-Form) + 以来",
    examples: [
      { japanese: "日本に来て以来、毎日日本語を使っている。", romaji: "Nihon ni kite irai, mainichi nihongo o tsukatte iru.", german: "Seit ich nach Japan kam, benutze ich täglich Japanisch." },
      { japanese: "卒業して以来、彼に会っていない。", romaji: "Sotsugyō shite irai, kare ni atte inai.", german: "Seit dem Abschluss habe ich ihn nicht mehr gesehen." }
    ],
    notes: "Formeller als ～てから. Der Zustand nach dem Ereignis daürt an.",
    related: ["n4-ato-de"]
  },
  {
    id: "n3-tsutsu",
    pattern: "～つつ",
    level: "N3",
    category: "Verben",
    meaning: "Während / obwohl (formell)",
    explanation: "つつ: formelle Variante von ～ながら (gleichzeitig) oder ～のに (obwohl).",
    formation: "Verb (ます-Stamm) + つつ",
    examples: [
      { japanese: "悪いと思いつつ、つい食べてしまう。", romaji: "Warui to omoi tsutsu, tsui tabete shimau.", german: "Obwohl ich weiß, dass es schlecht ist, esse ich es doch." },
      { japanese: "景色を楽しみつつ散歩した。", romaji: "Keshiki o tanoshimi tsutsu sanpo shita.", german: "Ich spazierte und genoss dabei die Landschaft." }
    ],
    notes: "～つつも = obwohl. ～つつある = im Prozess sein.",
    related: ["n4-nagara", "n3-tsutsu-aru"]
  },
  {
    id: "n3-tsutsu-aru",
    pattern: "～つつある",
    level: "N3",
    category: "Verben",
    meaning: "Im Prozess sein, sich gerade verändern",
    explanation: "つつある: eine allmähliche Veränderung ist im Gange.",
    formation: "Verb (ます-Stamm) + つつある",
    examples: [
      { japanese: "状況は改善しつつある。", romaji: "Jōkyō wa kaizen shitsutsu aru.", german: "Die Situation verbessert sich gerade." },
      { japanese: "この文化は消えつつある。", romaji: "Kono bunka wa kietsutsu aru.", german: "Diese Kultur ist im Begriff zu verschwinden." }
    ],
    notes: "Formell/schriftlich. Ähnlich: ～ている (Veränderungsprozess).",
    related: ["n3-tsutsu", "teiru"]
  },
  // ============================================================
  // N3 – ADJEKTIVE (10)
  // ============================================================
  {
    id: "n3-ge",
    pattern: "～げ",
    level: "N3",
    category: "Adjektive",
    meaning: "Scheinend, den Anschein von",
    explanation: "げ: drückt den äußeren Anschein eines Gefühls oder Zustands aus.",
    formation: "い-Adj (ohne い) + げ / な-Adj + げ",
    examples: [
      { japanese: "彼女は悲しげな顔をしていた。", romaji: "Kanojo wa kanashige na kao o shiteita.", german: "Sie hatte ein traurig aussehendes Gesicht." },
      { japanese: "子供たちは楽しげに遊んでいる。", romaji: "Kodomotachi wa tanoshige ni asondeiru.", german: "Die Kinder spielen vergnügt." }
    ],
    notes: "な-Adj-Verhalten: ～げな + Nomen, ～げに + Verb. 嬉しげ, 寂しげ, 不安げ.",
    related: ["n4-sou-appearance"]
  },
  {
    id: "n3-gimi",
    pattern: "～気味",
    level: "N3",
    category: "Adjektive",
    meaning: "Leicht, ein wenig, -lich",
    explanation: "気味 (ぎみ): ein leichter Zustand oder eine Tendenz, meist negativ.",
    formation: "Verb (ます-Stamm) + 気味 / Nomen + 気味",
    examples: [
      { japanese: "最近太り気味だ。", romaji: "Saikin futori gimi da.", german: "In letzter Zeit nehme ich etwas zu." },
      { japanese: "風邪気味で体がだるい。", romaji: "Kaze gimi de karada ga darui.", german: "Ich habe eine leichte Erkältung und fühle mich schlapp." }
    ],
    notes: "Meist leicht negative Tendenz. な-Adj-Verhalten: ～気味の + Nomen.",
    related: ["n4-gachi"]
  },
  {
    id: "n3-darake",
    pattern: "～だらけ",
    level: "N3",
    category: "Adjektive",
    meaning: "Voll von, voller (negativ)",
    explanation: "だらけ: bedeckt oder voll von etwas, meist negativ konnotiert.",
    formation: "Nomen + だらけ",
    examples: [
      { japanese: "部屋がゴミだらけだ。", romaji: "Heya ga gomi darake da.", german: "Das Zimmer ist voller Müll." },
      { japanese: "この作文は間違いだらけだ。", romaji: "Kono sakubun wa machigai darake da.", german: "Dieser Aufsatz ist voller Fehler." }
    ],
    notes: "Negativ: 泥だらけ (voller Schlamm), 傷だらけ (voller Kratzer).",
    related: []
  },
  {
    id: "n3-buri",
    pattern: "～ぶり",
    level: "N3",
    category: "Adjektive",
    meaning: "Art und Weise / zum ersten Mal seit",
    explanation: "ぶり hat zwei Bedeutungen: 1) die Art wie etwas getan wird, 2) nach langer Zeit wieder.",
    formation: "Verb (ます-Stamm) + ぶり / Zeitraum + ぶり",
    examples: [
      { japanese: "三年ぶりに日本に行った。", romaji: "Sannen buri ni Nihon ni itta.", german: "Ich bin zum ersten Mal seit drei Jahren nach Japan gefahren." },
      { japanese: "彼の仕事ぶりは素晴らしい。", romaji: "Kare no shigoto-buri wa subarashii.", german: "Seine Art zu arbeiten ist wunderbar." }
    ],
    notes: "久しぶり = lange nicht gesehen. ～ぶりに = zum ersten Mal seit.",
    related: []
  },
  {
    id: "n3-teki",
    pattern: "～的",
    level: "N3",
    category: "Adjektive",
    meaning: "-isch, -lich, -mäßig",
    explanation: "的 (てき): wandelt Nomen in な-Adjektive um, ähnlich wie '-isch' im Deutschen.",
    formation: "Nomen + 的(な/に)",
    examples: [
      { japanese: "日本的な考え方だ。", romaji: "Nihon-teki na kangaekata da.", german: "Das ist eine japanische Denkweise." },
      { japanese: "具体的に説明してください。", romaji: "Gutai-teki ni setsumei shite kudasai.", german: "Bitte erklären Sie es konkret." },
      { japanese: "積極的に参加する。", romaji: "Sekkyoku-teki ni sanka suru.", german: "Aktiv teilnehmen." }
    ],
    notes: "Sehr produktiv: 国際的 (international), 一般的 (allgemein), 基本的 (grundlegend).",
    related: []
  },
  {
    id: "n3-kurai-gurai",
    pattern: "～くらい / ～ぐらい",
    level: "N3",
    category: "Adjektive",
    meaning: "Ungefähr / so ... dass",
    explanation: "くらい/ぐらい: gibt ein Ausmaß an oder drückt 'ungefähr' aus.",
    formation: "Verb/Adj + くらい / Zahl + くらい",
    examples: [
      { japanese: "泣きたいくらい悔しい。", romaji: "Nakitai kurai kuyashii.", german: "So frustriert, dass ich weinen könnte." },
      { japanese: "三十分くらい待った。", romaji: "Sanjuppun kurai matta.", german: "Ich habe ungefähr dreißig Minuten gewartet." }
    ],
    notes: "Als Ausmaß: ～くらい = so sehr dass. Als Schätzung: ～くらい = ungefähr.",
    related: ["n4-hodo-p"]
  },
  {
    id: "n3-wari-ni",
    pattern: "～割に(は)",
    level: "N3",
    category: "Adjektive",
    meaning: "Dafür dass, im Verhältnis zu",
    explanation: "割に: das Ergebnis stimmt nicht mit der Erwartung überein.",
    formation: "Verb/Adj + 割に / Nomen + の割に",
    examples: [
      { japanese: "この店は値段の割においしい。", romaji: "Kono mise wa nedan no wari ni oishii.", german: "Für den Preis ist dieses Restaurant gut." },
      { japanese: "勉強した割に成績が悪い。", romaji: "Benkyō shita wari ni seiseki ga warui.", german: "Dafür dass ich gelernt habe, sind die Noten schlecht." }
    ],
    notes: "Drückt ein unerwartetes Ergebnis aus.",
    related: ["n3-ni-shite-wa"]
  },
  {
    id: "n3-ni-shite-wa",
    pattern: "～にしては",
    level: "N3",
    category: "Adjektive",
    meaning: "Für (im Vergleich zur Erwartung)",
    explanation: "にしては: das Ergebnis weicht von dem ab, was man bei X erwarten würde.",
    formation: "Nomen/Verb + にしては",
    examples: [
      { japanese: "初心者にしては上手ですね。", romaji: "Shoshinsha ni shite wa jōzu desu ne.", german: "Für einen Anfänger sind Sie gut." },
      { japanese: "日本人にしては背が高い。", romaji: "Nihonjin ni shite wa se ga takai.", german: "Für einen Japaner ist er groß." }
    ],
    notes: "Impliziert: 'angesichts der Tatsache, dass...'.",
    related: ["n3-wari-ni"]
  },
  {
    id: "n3-ppoi-negative",
    pattern: "～っぽい (N3)",
    level: "N3",
    category: "Adjektive",
    meaning: "-artig, leicht zu (erweitert)",
    explanation: "っぽい auf N3-Niveau: weitere Nuancen und Verwendungen.",
    formation: "Nomen/Verb-Stamm + っぽい",
    examples: [
      { japanese: "この話は嘘っぽい。", romaji: "Kono hanashi wa usoppoi.", german: "Diese Geschichte klingt nach Lüge." },
      { japanese: "大人っぽい服装だ。", romaji: "Otonappoi fukusō da.", german: "Ein erwachsen wirkender Kleidungsstil." }
    ],
    notes: "忘れっぽい (vergesslich), 飽きっぽい (schnell gelangweilt).",
    related: ["n4-ppoi"]
  },
  {
    id: "n3-zurai",
    pattern: "～づらい",
    level: "N3",
    category: "Adjektive",
    meaning: "Schwer zu (emotional/psychisch)",
    explanation: "づらい: etwas ist psychisch oder emotional schwer zu tun.",
    formation: "Verb (ます-Stamm) + づらい",
    examples: [
      { japanese: "上司に言いづらいことがある。", romaji: "Jōshi ni iidzurai koto ga aru.", german: "Es gibt Dinge, die schwer dem Chef zu sagen sind." },
      { japanese: "この靴は歩きづらい。", romaji: "Kono kutsu wa arukidzurai.", german: "Diese Schuhe sind schwer zu laufen." }
    ],
    notes: "づらい = psychische Schwierigkeit. にくい = physische Schwierigkeit.",
    related: ["n4-nikui", "n4-yasui"]
  },
  // ============================================================
  // N3 – SATZSTRUKTUREN Teil 1 (20)
  // ============================================================
  {
    id: "n3-mono-da",
    pattern: "～ものだ",
    level: "N3",
    category: "Satzstrukturen",
    meaning: "Sollte / war früher so / wie ... doch",
    explanation: "ものだ hat drei Bedeutungen: 1) allgemeine Wahrheit/Soll, 2) Erinnerung, 3) Erstaunen.",
    formation: "Verb (辞書形/た形) + ものだ",
    examples: [
      { japanese: "年上の人を尊敬するものだ。", romaji: "Toshiue no hito o sonkei suru mono da.", german: "Man sollte ältere Menschen respektieren." },
      { japanese: "子供の頃よくここで遊んだものだ。", romaji: "Kodomo no koro yoku koko de asonda mono da.", german: "Als Kind spielte ich oft hier." }
    ],
    notes: "辞書形 = Soll/allgemein. た形 = Erinnerung. よく～たものだ = häufige Erinnerung.",
    related: ["n3-mono-no", "n3-mono-dakara"]
  },
  {
    id: "n3-mono-no",
    pattern: "～ものの",
    level: "N3",
    category: "Satzstrukturen",
    meaning: "Obwohl, zwar ... aber",
    explanation: "ものの: räumt etwas ein, drückt aber einen Widerspruch aus. Formell.",
    formation: "Verb/Adj (Grundform) + ものの",
    examples: [
      { japanese: "買ったものの、一度も使っていない。", romaji: "Katta mono no, ichido mo tsukatte inai.", german: "Zwar gekauft, aber noch nie benutzt." },
      { japanese: "日本語は勉強しているものの、まだ上手に話せない。", romaji: "Nihongo wa benkyō shiteiru mono no, mada jōzu ni hanasenai.", german: "Obwohl ich Japanisch lerne, kann ich noch nicht gut sprechen." }
    ],
    notes: "Formeller als ～けど/～のに.",
    related: ["n4-noni", "n3-mono-da"]
  },
  {
    id: "n3-mono-dakara",
    pattern: "～もんだから / ～ものだから",
    level: "N3",
    category: "Satzstrukturen",
    meaning: "Weil (entschuldigend)",
    explanation: "ものだから: gibt einen Grund an, oft als Entschuldigung.",
    formation: "Verb/Adj (Grundform) + ものだから",
    examples: [
      { japanese: "急いでいたものだから、忘れ物をした。", romaji: "Isoide ita mono dakara, wasuremono o shita.", german: "Weil ich es eilig hatte, habe ich etwas vergessen." },
      { japanese: "初めてだったもんだから、失敗してしまった。", romaji: "Hajimete datta mon dakara, shippai shite shimatta.", german: "Weil es mein erstes Mal war, habe ich versagt." }
    ],
    notes: "もんだから = informell. ものですから = höflich.",
    related: ["n4-node", "n3-mono-da"]
  },
  {
    id: "n3-wake-dewa-nai",
    pattern: "～わけではない",
    level: "N3",
    category: "Satzstrukturen",
    meaning: "Es ist nicht so dass, nicht unbedingt",
    explanation: "わけではない: verneint eine Annahme teilweise – es ist nicht ganz so.",
    formation: "Verb/Adj (Grundform) + わけではない",
    examples: [
      { japanese: "嫌いなわけではないが、あまり食べない。", romaji: "Kirai na wake dewa nai ga, amari tabenai.", german: "Es ist nicht so, dass ich es nicht mag, aber ich esse es selten." },
      { japanese: "全員が賛成しているわけではない。", romaji: "Zen'in ga sansei shiteiru wake dewa nai.", german: "Es ist nicht so, dass alle zustimmen." }
    ],
    notes: "Teilverneinung. ～わけがない = völlige Unmöglichkeit.",
    related: ["n4-wake-da", "n4-hazu-ga-nai"]
  },
  {
    id: "n3-ni-chigainai",
    pattern: "～に違いない",
    level: "N3",
    category: "Satzstrukturen",
    meaning: "Muss ... sein, bestimmt",
    explanation: "に違いない: starke Überzeugung, dass etwas so ist.",
    formation: "Verb/Adj/Nomen + に違いない",
    examples: [
      { japanese: "彼は知っているに違いない。", romaji: "Kare wa shitteiru ni chigainai.", german: "Er muss es wissen." },
      { japanese: "あの音は猫に違いない。", romaji: "Ano oto wa neko ni chigainai.", german: "Das Geräusch muss von einer Katze sein." }
    ],
    notes: "Stärker als ～はずだ. Fast 100% Überzeugung.",
    related: ["n4-hazu-da", "n3-ni-kimatte-iru"]
  },
  {
    id: "n3-ni-kimatte-iru",
    pattern: "～に決まっている",
    level: "N3",
    category: "Satzstrukturen",
    meaning: "Steht fest dass, natürlich",
    explanation: "に決まっている: der Sprecher ist sich absolut sicher.",
    formation: "Verb/Adj/Nomen + に決まっている",
    examples: [
      { japanese: "そんなことをしたら怒られるに決まっている。", romaji: "Sonna koto o shitara okorareru ni kimatte iru.", german: "Wenn man so etwas tut, wird man natürlich ausgeschimpft." },
      { japanese: "あの店はおいしいに決まっている。", romaji: "Ano mise wa oishii ni kimatte iru.", german: "Das Restaurant ist bestimmt gut." }
    ],
    notes: "Sehr subjektiv und umgangssprachlich. Stärker als ～に違いない.",
    related: ["n3-ni-chigainai"]
  },
  {
    id: "n3-osore-ga-aru",
    pattern: "～おそれがある",
    level: "N3",
    category: "Satzstrukturen",
    meaning: "Es besteht die Gefahr dass",
    explanation: "おそれがある: warnt formell vor einem möglichen negativen Ergebnis.",
    formation: "Verb (辞書形) + おそれがある / Nomen + のおそれがある",
    examples: [
      { japanese: "台風が近づくおそれがある。", romaji: "Taifū ga chikazuku osore ga aru.", german: "Es besteht die Gefahr, dass sich ein Taifun nähert." },
      { japanese: "地震のおそれがあります。", romaji: "Jishin no osore ga arimasu.", german: "Es besteht Erdbebengefahr." }
    ],
    notes: "Formell. Oft in Nachrichten und Warnungen.",
    related: ["n3-kanenai"]
  },
  {
    id: "n3-ni-suginai",
    pattern: "～に過ぎない",
    level: "N3",
    category: "Satzstrukturen",
    meaning: "Nichts weiter als, nur",
    explanation: "に過ぎない: etwas ist weniger wichtig als man denkt.",
    formation: "Verb/Nomen + に過ぎない",
    examples: [
      { japanese: "それは噂に過ぎない。", romaji: "Sore wa uwasa ni suginai.", german: "Das ist nichts weiter als ein Gerücht." },
      { japanese: "私は学生に過ぎません。", romaji: "Watashi wa gakusei ni sugimasen.", german: "Ich bin nur ein Student." }
    ],
    notes: "Bescheiden oder herabsetzend.",
    related: ["n4-dake", "n4-shika-nai"]
  },
  {
    id: "n3-you-ga-nai",
    pattern: "～ようがない / ～ようもない",
    level: "N3",
    category: "Satzstrukturen",
    meaning: "Es gibt keine Möglichkeit zu",
    explanation: "ようがない: es ist absolut unmöglich, etwas zu tun.",
    formation: "Verb (ます-Stamm) + ようがない",
    examples: [
      { japanese: "連絡先が分からなくて連絡しようがない。", romaji: "Renrakusaki ga wakaranakute renraku shiyō ga nai.", german: "Ich kenne die Kontaktdaten nicht, ich kann unmöglich Kontakt aufnehmen." },
      { japanese: "どうしようもない状況だ。", romaji: "Dō shiyō mo nai jōkyō da.", german: "Eine hoffnungslose Situation." }
    ],
    notes: "どうしようもない = man kann absolut nichts tun.",
    related: ["n3-hoka-nai"]
  },
  {
    id: "n3-hoka-nai",
    pattern: "～ほかない / ～よりほかない",
    level: "N3",
    category: "Satzstrukturen",
    meaning: "Nichts anderes übrig als",
    explanation: "ほかない: es gibt keine andere Möglichkeit.",
    formation: "Verb (辞書形) + ほかない/よりほかない",
    examples: [
      { japanese: "自分でやるほかない。", romaji: "Jibun de yaru hoka nai.", german: "Es bleibt nichts anderes übrig, als es selbst zu tun." },
      { japanese: "歩いて帰るほかなかった。", romaji: "Aruite kaeru hoka nakatta.", german: "Es blieb nichts übrig als zu Fuß zurückzugehen." }
    ],
    notes: "Ähnlich: ～しかない, ～ざるを得ない.",
    related: ["n3-zaruwoenai", "n4-shika-nai"]
  },
  {
    id: "n3-kiri",
    pattern: "～きり / ～っきり",
    level: "N3",
    category: "Satzstrukturen",
    meaning: "Seit / nur (und nichts weiter)",
    explanation: "きり: seit einem Zeitpunkt hat sich nichts geändert, oder nur diese eine Sache.",
    formation: "Verb (た形) + きり / Nomen + きり",
    examples: [
      { japanese: "彼とは一度会ったきり連絡がない。", romaji: "Kare to wa ichido atta kiri renraku ga nai.", german: "Seit ich ihn einmal traf, gibt es keinen Kontakt mehr." },
      { japanese: "二人きりで話したい。", romaji: "Futari kiri de hanashitai.", german: "Ich möchte zu zweit (allein) reden." }
    ],
    notes: "～たきり = seit (negativ). ～きり = nur (二人きり = nur zu zweit).",
    related: ["n4-bakari-p"]
  },
  {
    id: "n3-kuseni",
    pattern: "～くせに",
    level: "N3",
    category: "Satzstrukturen",
    meaning: "Obwohl, trotz (abwertend)",
    explanation: "くせに: wie ～のに, aber mit negativer, vorwurfsvoller Nuance.",
    formation: "Verb/Adj + くせに / Nomen + のくせに",
    examples: [
      { japanese: "知っているくせに教えてくれない。", romaji: "Shitteiru kuse ni oshiete kurenai.", german: "Obwohl er es weiß, sagt er es mir nicht." },
      { japanese: "子供のくせに生意気だ。", romaji: "Kodomo no kuse ni namaiki da.", german: "Obwohl er ein Kind ist, ist er frech." }
    ],
    notes: "Stärker und negativer als ～のに. Drückt Ärger aus.",
    related: ["n4-noni"]
  },
  {
    id: "n3-totan",
    pattern: "～たとたん(に)",
    level: "N3",
    category: "Satzstrukturen",
    meaning: "Im Moment als, kaum dass",
    explanation: "たとたん: unmittelbar nach einer Handlung passiert unerwartet etwas.",
    formation: "Verb (た形) + とたん(に)",
    examples: [
      { japanese: "ドアを開けたとたん、猫が飛び出した。", romaji: "Doa o aketa totan, neko ga tobidashita.", german: "Kaum hatte ich die Tür geöffnet, sprang die Katze heraus." },
      { japanese: "横になったとたんに寝てしまった。", romaji: "Yoko ni natta totan ni nete shimatta.", german: "Kaum hatte ich mich hingelegt, schlief ich ein." }
    ],
    notes: "Immer unerwartet/überraschend. Ähnlich: ～た瞬間.",
    related: ["n4-tara"]
  },
  {
    id: "n3-saichuu",
    pattern: "～最中に",
    level: "N3",
    category: "Satzstrukturen",
    meaning: "Mitten in, gerade als",
    explanation: "最中に: genau in der Mitte einer Handlung passiert etwas.",
    formation: "Verb (ている) + 最中に / Nomen + の最中に",
    examples: [
      { japanese: "会議の最中に電話が鳴った。", romaji: "Kaigi no saichū ni denwa ga natta.", german: "Mitten in der Konferenz klingelte das Telefon." },
      { japanese: "食べている最中に来客があった。", romaji: "Tabeteiru saichū ni raikyaku ga atta.", german: "Mitten beim Essen kam Besuch." }
    ],
    notes: "Betont, dass die Handlung im vollen Gange ist.",
    related: ["n4-aida-ni", "n4-tokoro-da"]
  },
  {
    id: "n3-sai-ni",
    pattern: "～際(に)",
    level: "N3",
    category: "Satzstrukturen",
    meaning: "Bei, anlässlich (formell)",
    explanation: "際に: formelle Variante von ～時に. Oft in offiziellen Kontexten.",
    formation: "Verb (辞書形/た形) + 際(に) / Nomen + の際(に)",
    examples: [
      { japanese: "お帰りの際はお忘れ物のないようご注意ください。", romaji: "Okaeri no sai wa owasuremono no nai yō go-chūi kudasai.", german: "Achten Sie beim Verlassen bitte darauf, nichts zu vergessen." },
      { japanese: "申し込みの際に身分証明書が必要です。", romaji: "Mōshikomi no sai ni mibun shōmeisho ga hitsuyō desu.", german: "Bei der Anmeldung ist ein Ausweis erforderlich." }
    ],
    notes: "Formell/schriftlich. Alltagssprache: ～時に.",
    related: ["n4-tokini"]
  },
  {
    id: "n3-ue-de",
    pattern: "～上で",
    level: "N3",
    category: "Satzstrukturen",
    meaning: "Nachdem / in Bezug auf",
    explanation: "上で: 1) nachdem man etwas getan hat (た形), 2) in Bezug auf, wenn es um ... geht (辞書形).",
    formation: "Verb (た形/辞書形) + 上で / Nomen + の上で",
    examples: [
      { japanese: "よく考えた上で決めてください。", romaji: "Yoku kangaeta ue de kimete kudasai.", german: "Bitte entscheiden Sie, nachdem Sie gut darüber nachgedacht haben." },
      { japanese: "仕事の上で大切なことだ。", romaji: "Shigoto no ue de taisetsu na koto da.", german: "Das ist in Bezug auf die Arbeit wichtig." }
    ],
    notes: "た形 + 上で = nachdem. 辞書形/Nomen + 上で = hinsichtlich.",
    related: ["n4-ato-de"]
  },
  {
    id: "n3-uchi-ni",
    pattern: "～うちに",
    level: "N3",
    category: "Satzstrukturen",
    meaning: "Solange, bevor es sich ändert",
    explanation: "うちに: etwas tun, solange ein Zustand noch andaürt.",
    formation: "Verb (辞書形/ない形/ている) + うちに / Adj + うちに",
    examples: [
      { japanese: "若いうちにいろいろ経験したい。", romaji: "Wakai uchi ni iroiro keiken shitai.", german: "Solange ich jung bin, möchte ich viel erleben." },
      { japanese: "忘れないうちにメモしておこう。", romaji: "Wasurenai uchi ni memo shite okō.", german: "Ich notiere es, bevor ich es vergesse." }
    ],
    notes: "～ているうちに = während (und dabei ändert sich etwas).",
    related: ["n4-aida-ni"]
  },
  {
    id: "n3-tabi-ni",
    pattern: "～たびに",
    level: "N3",
    category: "Satzstrukturen",
    meaning: "Jedes Mal wenn",
    explanation: "たびに: jedes Mal, wenn eine Handlung stattfindet, passiert etwas.",
    formation: "Verb (辞書形) + たびに / Nomen + のたびに",
    examples: [
      { japanese: "日本に行くたびにお土産を買う。", romaji: "Nihon ni iku tabi ni omiyage o kau.", german: "Jedes Mal wenn ich nach Japan fahre, kaufe ich Souvenirs." },
      { japanese: "この曲を聞くたびに学生時代を思い出す。", romaji: "Kono kyoku o kiku tabi ni gakusei jidai o omoidasu.", german: "Jedes Mal wenn ich dieses Lied höre, denke ich an meine Studienzeit." }
    ],
    notes: "Regelmäßige Wiederholung.",
    related: ["n4-to-conditional"]
  },
  {
    id: "n3-toori",
    pattern: "～とおり(に)",
    level: "N3",
    category: "Satzstrukturen",
    meaning: "Wie, so wie, genauso wie",
    explanation: "とおりに: genauso wie etwas gesagt/getan/erwartet wurde.",
    formation: "Verb (た形/辞書形) + とおり(に) / Nomen + のとおり(に)",
    examples: [
      { japanese: "説明書のとおりに組み立ててください。", romaji: "Setsumeisho no tōri ni kumitatete kudasai.", german: "Baün Sie es gemäß der Anleitung zusammen." },
      { japanese: "思ったとおりだった。", romaji: "Omotta tōri datta.", german: "Es war genau wie ich dachte." }
    ],
    notes: "言ったとおり (wie gesagt), 予想どおり (wie erwartet).",
    related: []
  },
  {
    id: "n3-dokoro-ka",
    pattern: "～どころか",
    level: "N3",
    category: "Satzstrukturen",
    meaning: "Weit davon entfernt, geschweige denn",
    explanation: "どころか: die Realität ist weit von der Erwartung entfernt.",
    formation: "Verb/Adj/Nomen + どころか",
    examples: [
      { japanese: "旅行どころか、休みも取れない。", romaji: "Ryokō dokoro ka, yasumi mo torenai.", german: "Von Reise ganz zu schweigen, ich kann nicht mal frei nehmen." },
      { japanese: "減るどころか、増えている。", romaji: "Heru dokoro ka, fueteiru.", german: "Weit davon entfernt abzunehmen, nimmt es sogar zu." }
    ],
    notes: "Verstärkt den Kontrast zwischen Erwartung und Realität.",
    related: ["n3-dokoro-dewa-nai"]
  },
  {
    id: "n3-dokoro-dewa-nai",
    pattern: "～どころではない",
    level: "N3",
    category: "Satzstrukturen",
    meaning: "Nicht die Zeit/Gelegenheit für",
    explanation: "どころではない: die Situation erlaubt es nicht, sich damit zu befassen.",
    formation: "Verb (辞書形) + どころではない / Nomen + どころではない",
    examples: [
      { japanese: "忙しくて旅行どころではない。", romaji: "Isogashikute ryokō dokoro dewa nai.", german: "Ich bin so beschäftigt, dass an Reise nicht zu denken ist." },
      { japanese: "遊ぶどころじゃないよ。", romaji: "Asobu dokoro ja nai yo.", german: "Jetzt ist nicht die Zeit zum Spielen." }
    ],
    notes: "Informell: ～どころじゃない.",
    related: ["n3-dokoro-ka"]
  },
  {
    id: "n3-bakari-ka",
    pattern: "～ばかりか",
    level: "N3",
    category: "Satzstrukturen",
    meaning: "Nicht nur ... sondern auch",
    explanation: "ばかりか: nicht nur X, sondern darüber hinaus auch Y.",
    formation: "Verb/Adj/Nomen + ばかりか ～も/さえ",
    examples: [
      { japanese: "日本語ばかりか中国語も話せる。", romaji: "Nihongo bakari ka chūgokugo mo hanaseru.", german: "Er kann nicht nur Japanisch, sondern auch Chinesisch." },
      { japanese: "成績が上がるばかりか、友達も増えた。", romaji: "Seiseki ga agaru bakari ka, tomodachi mo fueta.", german: "Nicht nur die Noten stiegen, auch die Freunde wurden mehr." }
    ],
    notes: "Formeller als ～だけでなく.",
    related: ["n4-dake-de-naku"]
  },
  {
    id: "n3-bakari-ni",
    pattern: "～ばかりに",
    level: "N3",
    category: "Satzstrukturen",
    meaning: "Nur weil (mit negativem Ergebnis)",
    explanation: "ばかりに: nur wegen eines bestimmten Grundes kam es zu einem schlechten Ergebnis.",
    formation: "Verb (た形) + ばかりに",
    examples: [
      { japanese: "遅刻したばかりに大事な話を聞き逃した。", romaji: "Chikoku shita bakari ni daiji na hanashi o kikinogashita.", german: "Nur weil ich zu spät kam, verpasste ich das wichtige Gespräch." },
      { japanese: "お金がないばかりに夢を諦めた。", romaji: "Okane ga nai bakari ni yume o akirameta.", german: "Nur weil ich kein Geld hatte, gab ich meinen Traum auf." }
    ],
    notes: "Immer negatives Ergebnis. Bedaürn.",
    related: ["n4-sei-de"]
  },
  {
    id: "n3-kara-niwa",
    pattern: "～からには",
    level: "N3",
    category: "Satzstrukturen",
    meaning: "Wenn schon, da nun mal",
    explanation: "からには: da man sich einmal entschieden hat, muss man auch durchziehen.",
    formation: "Verb (辞書形/た形) + からには",
    examples: [
      { japanese: "やるからには最後までやる。", romaji: "Yaru kara ni wa saigo made yaru.", german: "Wenn ich es schon mache, dann bis zum Ende." },
      { japanese: "約束したからには守らなければならない。", romaji: "Yakusoku shita kara ni wa mamorankereba naranai.", german: "Da ich es versprochen habe, muss ich es halten." }
    ],
    notes: "Ähnlich: ～以上は.",
    related: ["n3-ijou-wa"]
  },
  {
    id: "n3-kara-toitte",
    pattern: "～からといって",
    level: "N3",
    category: "Satzstrukturen",
    meaning: "Nur weil ... heißt das nicht",
    explanation: "からといって: nur weil X, bedeutet das nicht automatisch Y.",
    formation: "Verb/Adj/Nomen + からといって ～わけではない",
    examples: [
      { japanese: "安いからといって品質が悪いわけではない。", romaji: "Yasui kara to itte hinshitsu ga warui wake dewa nai.", german: "Nur weil es billig ist, heißt das nicht, dass die Qualität schlecht ist." },
      { japanese: "日本人だからといって漢字が全部読めるわけではない。", romaji: "Nihonjin da kara to itte kanji ga zenbu yomeru wake dewa nai.", german: "Nur weil man Japaner ist, heißt das nicht, dass man alle Kanji lesen kann." }
    ],
    notes: "Oft mit ～わけではない oder ～とは限らない.",
    related: ["n3-wake-dewa-nai"]
  },
  {
    id: "n3-ijou-wa",
    pattern: "～以上(は)",
    level: "N3",
    category: "Satzstrukturen",
    meaning: "Da nun mal, solange",
    explanation: "以上は: da eine Tatsache besteht, muss man entsprechend handeln.",
    formation: "Verb (辞書形/た形) + 以上(は)",
    examples: [
      { japanese: "引き受けた以上は責任を持つ。", romaji: "Hikiuketa ijō wa sekinin o motsu.", german: "Da ich es übernommen habe, trage ich die Verantwortung." },
      { japanese: "学生である以上、勉強するべきだ。", romaji: "Gakusei de aru ijō, benkyō suru beki da.", german: "Solange man Student ist, sollte man lernen." }
    ],
    notes: "Ähnlich: ～からには.",
    related: ["n3-kara-niwa"]
  },
  {
    id: "n3-kagiri",
    pattern: "～限り",
    level: "N3",
    category: "Satzstrukturen",
    meaning: "Solange, soweit",
    explanation: "限り: solange ein Zustand andaürt / soweit man weiß.",
    formation: "Verb (辞書形/ない形/ている) + 限り",
    examples: [
      { japanese: "私が知っている限りでは問題ない。", romaji: "Watashi ga shitteiru kagiri de wa mondai nai.", german: "Soweit ich weiß, gibt es kein Problem." },
      { japanese: "体が元気な限り働き続けたい。", romaji: "Karada ga genki na kagiri hataraki tsuzuketai.", german: "Solange ich gesund bin, möchte ich weiterarbeiten." }
    ],
    notes: "できる限り = so viel wie möglich.",
    related: []
  },
  {
    id: "n3-koto-da",
    pattern: "～ことだ",
    level: "N3",
    category: "Satzstrukturen",
    meaning: "Sollte, es ist ratsam",
    explanation: "ことだ: gibt einen Ratschlag oder eine allgemeine Empfehlung.",
    formation: "Verb (辞書形/ない形) + ことだ",
    examples: [
      { japanese: "健康のために野菜を食べることだ。", romaji: "Kenkō no tame ni yasai o taberu koto da.", german: "Für die Gesundheit sollte man Gemüse essen." },
      { japanese: "遅刻しないことだ。", romaji: "Chikoku shinai koto da.", german: "Man sollte nicht zu spät kommen." }
    ],
    notes: "Allgemeiner Rat, nicht an eine bestimmte Person gerichtet.",
    related: ["n4-ta-hou-ga-ii", "n4-beki-da"]
  },
  {
    id: "n3-mono-ka",
    pattern: "～ものか / ～もんか",
    level: "N3",
    category: "Satzstrukturen",
    meaning: "Auf keinen Fall! Niemals!",
    explanation: "ものか: drückt starke Ablehnung oder Entschlossenheit aus.",
    formation: "Verb (辞書形) + ものか/もんか",
    examples: [
      { japanese: "あんな所に二度と行くものか。", romaji: "Anna tokoro ni nido to iku mono ka.", german: "An so einen Ort gehe ich nie wieder!" },
      { japanese: "負けるもんか！", romaji: "Makeru mon ka!", german: "Ich werde auf keinen Fall verlieren!" }
    ],
    notes: "Emotional und umgangssprachlich. もんか = informeller.",
    related: []
  },
  {
    id: "n3-ta-tokoro",
    pattern: "～たところ",
    level: "N3",
    category: "Satzstrukturen",
    meaning: "Als ich ... tat (Ergebnis)",
    explanation: "たところ: als man etwas versuchte, ergab sich ein (oft unerwartetes) Ergebnis.",
    formation: "Verb (た形) + ところ",
    examples: [
      { japanese: "聞いてみたところ、もう売り切れだった。", romaji: "Kiite mita tokoro, mō urikire datta.", german: "Als ich nachfragte, war es schon ausverkauft." },
      { japanese: "調べたところ、問題が見つかった。", romaji: "Shirabeta tokoro, mondai ga mitsukatta.", german: "Als ich nachforschte, fand ich ein Problem." }
    ],
    notes: "Unterschied zu ～ところだ (Zeitpunkt): ～たところ = Ergebnis.",
    related: ["n4-tokoro-da", "n4-tara"]
  },
  {
    id: "n3-nai-koto-wa-nai",
    pattern: "～ないことはない",
    level: "N3",
    category: "Satzstrukturen",
    meaning: "Es ist nicht so, dass man nicht kann",
    explanation: "ないことはない: doppelte Verneinung = schwache Bejahung. 'Es geht schon, aber...'",
    formation: "Verb (ない形) + ことはない",
    examples: [
      { japanese: "食べられないことはないが、好きではない。", romaji: "Taberarenai koto wa nai ga, suki dewa nai.", german: "Essen kann ich es schon, aber ich mag es nicht." },
      { japanese: "分からないことはないが、説明しにくい。", romaji: "Wakaranai koto wa nai ga, setsumei shinikui.", german: "Verstehen tü ich es, aber es ist schwer zu erklären." }
    ],
    notes: "Schwache Bejahung mit Vorbehalt.",
    related: ["n3-wake-dewa-nai"]
  },
  {
    id: "n3-ni-mo-kakawarazu",
    pattern: "～にもかかわらず",
    level: "N3",
    category: "Satzstrukturen",
    meaning: "Trotz, ungeachtet",
    explanation: "にもかかわらず: formelle Variante von ～のに (trotz).",
    formation: "Verb/Adj/Nomen + にもかかわらず",
    examples: [
      { japanese: "雨にもかかわらず多くの人が集まった。", romaji: "Ame ni mo kakawarazu ōku no hito ga atsumatta.", german: "Trotz des Regens versammelten sich viele Menschen." },
      { japanese: "努力したにもかかわらず失敗した。", romaji: "Doryoku shita ni mo kakawarazu shippai shita.", german: "Trotz meiner Bemühungen habe ich versagt." }
    ],
    notes: "Sehr formell/schriftlich. Alltagssprache: ～のに.",
    related: ["n4-noni"]
  },
  {
    id: "n3-to-shitemo",
    pattern: "～としても",
    level: "N3",
    category: "Satzstrukturen",
    meaning: "Selbst wenn (angenommen)",
    explanation: "としても: selbst wenn man annimmt, dass X wahr ist.",
    formation: "Verb/Adj/Nomen + としても",
    examples: [
      { japanese: "たとえ失敗したとしても後悔しない。", romaji: "Tatoe shippai shita to shitemo kōkai shinai.", german: "Selbst wenn ich scheitere, werde ich es nicht bereuen." },
      { japanese: "仮に合格したとしても、まだ先は長い。", romaji: "Kari ni gōkaku shita to shitemo, mada saki wa nagai.", german: "Selbst wenn ich bestehe, ist es noch ein langer Weg." }
    ],
    notes: "Hypothetischer als ～ても.",
    related: ["n4-temo"]
  },
  {
    id: "n3-shidai",
    pattern: "～次第",
    level: "N3",
    category: "Satzstrukturen",
    meaning: "Sobald / es kommt an auf",
    explanation: "次第: 1) sobald etwas passiert (ます-Stamm+次第), 2) es hängt ab von (Nomen+次第).",
    formation: "Verb (ます-Stamm) + 次第 / Nomen + 次第",
    examples: [
      { japanese: "届き次第ご連絡します。", romaji: "Todoki shidai go-renraku shimasu.", german: "Ich melde mich, sobald es ankommt." },
      { japanese: "結果はあなた次第です。", romaji: "Kekka wa anata shidai desu.", german: "Das Ergebnis hängt von dir ab." }
    ],
    notes: "ます-Stamm + 次第 = sobald (formell). Nomen + 次第 = es kommt an auf.",
    related: ["n3-ni-ojite"]
  },
  {
    id: "n3-ippou-de",
    pattern: "～一方(で)",
    level: "N3",
    category: "Satzstrukturen",
    meaning: "Andererseits, während gleichzeitig",
    explanation: "一方で: zwei Aspekte oder Gegensätze gegenüberstellen.",
    formation: "Verb/Adj (Grundform) + 一方(で)",
    examples: [
      { japanese: "便利になる一方で、危険も増えている。", romaji: "Benri ni naru ippō de, kiken mo fueteiru.", german: "Es wird praktischer, aber gleichzeitig steigen die Gefahren." },
      { japanese: "彼は優しい一方で、厳しい面もある。", romaji: "Kare wa yasashii ippō de, kibishii men mo aru.", german: "Er ist freundlich, hat aber auch eine strenge Seite." }
    ],
    notes: "～一方だ = immer mehr (Tendenz): 増える一方だ = nimmt immer mehr zu.",
    related: ["n3-hanmen"]
  },
  {
    id: "n3-hanmen",
    pattern: "～反面",
    level: "N3",
    category: "Satzstrukturen",
    meaning: "Andererseits, auf der anderen Seite",
    explanation: "反面: zeigt die Kehrseite oder den Gegensatz einer Eigenschaft.",
    formation: "Verb/Adj (Grundform) + 反面",
    examples: [
      { japanese: "この仕事はやりがいがある反面、ストレスも多い。", romaji: "Kono shigoto wa yarigai ga aru hanmen, sutoresu mo ōi.", german: "Diese Arbeit ist lohnend, hat aber auch viel Stress." },
      { japanese: "都会は便利な反面、家賃が高い。", romaji: "Tokai wa benri na hanmen, yachin ga takai.", german: "Die Stadt ist praktisch, aber die Miete ist hoch." }
    ],
    notes: "Ähnlich wie ～一方で, aber betont stärker den Gegensatz.",
    related: ["n3-ippou-de"]
  },
  {
    id: "n3-sae-ba",
    pattern: "～さえ～ば",
    level: "N3",
    category: "Satzstrukturen",
    meaning: "Wenn nur, solange nur",
    explanation: "さえ～ば: eine einzige Bedingung reicht aus.",
    formation: "Nomen + さえ + Verb (ば-Form) / Verb (ます-Stamm) + さえすれば",
    examples: [
      { japanese: "お金さえあれば何でもできる。", romaji: "Okane sae areba nandemo dekiru.", german: "Wenn man nur Geld hat, kann man alles machen." },
      { japanese: "薬を飲みさえすれば治る。", romaji: "Kusuri o nomi sae sureba naoru.", german: "Man muss nur die Medizin nehmen und wird gesund." }
    ],
    notes: "Betont, dass nur DIESE EINE Bedingung nötig ist.",
    related: ["n4-sae", "n4-ba"]
  },
  {
    id: "n3-koto-kara",
    pattern: "～ことから",
    level: "N3",
    category: "Satzstrukturen",
    meaning: "Aufgrund der Tatsache dass",
    explanation: "ことから: gibt den Grund oder Ursprung einer Benennung/Schlussfolgerung an.",
    formation: "Verb/Adj (Grundform) + ことから",
    examples: [
      { japanese: "形が星に似ていることからスターフルーツと呼ばれている。", romaji: "Katachi ga hoshi ni niteiru koto kara sutā furūtsu to yobareteiru.", german: "Weil die Form einem Stern ähnelt, wird sie Sternfrucht genannt." },
      { japanese: "彼が犯人であることから逮捕された。", romaji: "Kare ga hannin de aru koto kara taiho sareta.", german: "Aufgrund der Tatsache, dass er der Täter ist, wurde er verhaftet." }
    ],
    notes: "Oft für Erklärungen von Namen oder Ursprüngen.",
    related: ["n4-tame-ni"]
  },
  {
    id: "n3-to-wa-kagiranai",
    pattern: "～とは限らない",
    level: "N3",
    category: "Satzstrukturen",
    meaning: "Es ist nicht unbedingt so dass",
    explanation: "とは限らない: etwas gilt nicht in allen Fällen.",
    formation: "Verb/Adj/Nomen + とは限らない",
    examples: [
      { japanese: "高いものがいいとは限らない。", romaji: "Takai mono ga ii to wa kagiranai.", german: "Teure Dinge sind nicht unbedingt gut." },
      { japanese: "努力すれば成功するとは限らない。", romaji: "Doryoku sureba seikō suru to wa kagiranai.", german: "Auch wenn man sich anstrengt, heißt das nicht, dass man Erfolg hat." }
    ],
    notes: "Weist eine zu einfache Verallgemeinerung zurück.",
    related: ["n3-wake-dewa-nai"]
  },
  {
    id: "n3-keigo-sonkei",
    pattern: "尊敬語 (Respektsprache)",
    level: "N3",
    category: "Satzstrukturen",
    meaning: "Höflichkeitsform für andere",
    explanation: "尊敬語 (そんけいご): erhöht die Handlungen anderer Personen, um Respekt zu zeigen.",
    formation: "お + Verb (ます-Stamm) + になる / 特別な形 (いらっしゃる, おっしゃる etc.)",
    examples: [
      { japanese: "先生はもうお帰りになりました。", romaji: "Sensei wa mō okaeri ni narimashita.", german: "Der Lehrer ist schon gegangen (respektvoll)." },
      { japanese: "社長がそうおっしゃいました。", romaji: "Shachō ga sō osshaimashita.", german: "Der Firmenchef hat es so gesagt (respektvoll)." }
    ],
    notes: "Spezialformen: いる→いらっしゃる, 言う→おっしゃる, 食べる→召し上がる, する→なさる.",
    related: ["n3-keigo-kenjou"]
  },
  {
    id: "n3-keigo-kenjou",
    pattern: "謙譲語 (Bescheidenheitssprache)",
    level: "N3",
    category: "Satzstrukturen",
    meaning: "Bescheidene Form für eigene Handlungen",
    explanation: "謙譲語 (けんじょうご): erniedrigt die eigenen Handlungen, um den Gesprächspartner zu erhöhen.",
    formation: "お + Verb (ます-Stamm) + する / 特別な形 (参る, 申す etc.)",
    examples: [
      { japanese: "私がご案内いたします。", romaji: "Watashi ga go-annai itashimasu.", german: "Ich werde Sie führen (bescheiden)." },
      { japanese: "明日お伺いしてもよろしいですか。", romaji: "Ashita oukagai shitemo yoroshii desu ka.", german: "Darf ich morgen bei Ihnen vorbeischaün (bescheiden)?" }
    ],
    notes: "Spezialformen: 行く/来る→参る, 言う→申す, する→いたす, 見る→拝見する.",
    related: ["n3-keigo-sonkei"]
  },
  {
    id: "n3-toshite-mo",
    pattern: "～にしても～にしても",
    level: "N3",
    category: "Satzstrukturen",
    meaning: "Ob ... oder ... (in jedem Fall)",
    explanation: "にしても～にしても: egal welche Alternative, das Ergebnis ist gleich.",
    formation: "A + にしても + B + にしても",
    examples: [
      { japanese: "行くにしても行かないにしても連絡してください。", romaji: "Iku ni shitemo ikanai ni shitemo renraku shite kudasai.", german: "Ob du gehst oder nicht, bitte melde dich." },
      { japanese: "賛成にしても反対にしても理由を言ってください。", romaji: "Sansei ni shitemo hantai ni shitemo riyū o itte kudasai.", german: "Ob dafür oder dagegen, bitte nennen Sie den Grund." }
    ],
    notes: "Ähnlich: ～ても～ても, ～にせよ～にせよ.",
    related: ["n4-temo"]
  },
  {
    id: "n3-koto-ni-natte-iru",
    pattern: "～ことになっている (N3)",
    level: "N3",
    category: "Satzstrukturen",
    meaning: "Es ist vorgesehen/geplant (erweitert)",
    explanation: "ことになっている auf N3: erweiterte Verwendung für Pläne und gesellschaftliche Normen.",
    formation: "Verb (辞書形) + ことになっている",
    examples: [
      { japanese: "来月から新しいプロジェクトが始まることになっている。", romaji: "Raigetsu kara atarashii purojekuto ga hajimaru koto ni natte iru.", german: "Ab nächstem Monat soll ein neues Projekt starten." },
      { japanese: "日本では靴を脱ぐことになっている。", romaji: "Nihon de wa kutsu o nugu koto ni natte iru.", german: "In Japan ist es Brauch, die Schuhe auszuziehen." }
    ],
    notes: "Gesellschaftliche Norm oder feststehender Plan.",
    related: ["n4-koto-ni-natteiru"]
  },
  {
    id: "n3-tewa-tewa",
    pattern: "～ては～ては",
    level: "N3",
    category: "Satzstrukturen",
    meaning: "Immer wieder abwechselnd",
    explanation: "ては～ては: zwei Handlungen wiederholen sich abwechselnd.",
    formation: "Verb (て) + は + Verb (て) + は",
    examples: [
      { japanese: "食べては寝て、食べては寝ての生活だ。", romaji: "Tabete wa nete, tabete wa nete no seikatsu da.", german: "Ein Leben nur aus Essen und Schlafen." },
      { japanese: "書いては消し、書いては消しの繰り返しだ。", romaji: "Kaite wa keshi, kaite wa keshi no kurikaeshi da.", german: "Immer wieder schreiben und löschen." }
    ],
    notes: "Drückt ermüdende Wiederholung aus.",
    related: ["n4-tari"]
  },
  {
    id: "n3-you-ni-to",
    pattern: "～ように言う",
    level: "N3",
    category: "Satzstrukturen",
    meaning: "Sagen/bitten dass jemand etwas tut",
    explanation: "ように言う: indirekte Aufforderung oder Bitte weitergeben.",
    formation: "Verb (辞書形/ない形) + ように言う/頼む/注意する",
    examples: [
      { japanese: "医者に運動するように言われた。", romaji: "Isha ni undō suru yō ni iwareta.", german: "Der Arzt sagte mir, ich solle Sport machen." },
      { japanese: "子供に早く寝るように言った。", romaji: "Kodomo ni hayaku neru yō ni itta.", german: "Ich sagte dem Kind, es solle früh schlafen." }
    ],
    notes: "Indirekte Befehlswiedergabe. Auch mit 頼む, 注意する usw.",
    related: ["n4-you-ni-suru"]
  },
  {
    id: "n3-koto-ni-suru-2",
    pattern: "～ことにしている (N3)",
    level: "N3",
    category: "Satzstrukturen",
    meaning: "Sich zur Regel gemacht haben",
    explanation: "ことにしている: eine persönliche Regel oder Gewohnheit, die man bewusst pflegt.",
    formation: "Verb (辞書形/ない形) + ことにしている",
    examples: [
      { japanese: "毎朝ジョギングすることにしている。", romaji: "Maiasa jogingu suru koto ni shiteiru.", german: "Ich habe es mir zur Regel gemacht, jeden Morgen zu joggen." },
      { japanese: "夜九時以降はスマホを見ないことにしている。", romaji: "Yoru kuji ikō wa sumaho o minai koto ni shiteiru.", german: "Ich habe mir vorgenommen, nach 21 Uhr nicht mehr aufs Handy zu schaün." }
    ],
    notes: "Betont bewusste persönliche Entscheidung als Gewohnheit.",
    related: ["n4-koto-ni-suru", "n4-you-ni-shiteiru"]
  },
  {
    id: "n3-te-kara-de-nai-to",
    pattern: "～てからでないと",
    level: "N3",
    category: "Satzstrukturen",
    meaning: "Wenn man nicht erst ... dann nicht",
    explanation: "てからでないと: eine Handlung muss zuerst abgeschlossen werden.",
    formation: "Verb (て-Form) + からでないと/からでなければ",
    examples: [
      { japanese: "調べてからでないと答えられない。", romaji: "Shirabete kara de nai to kotaerarenai.", german: "Ohne es vorher zu prüfen, kann ich nicht antworten." },
      { japanese: "食べてみてからでないと分からない。", romaji: "Tabete mite kara de nai to wakaranai.", german: "Ohne es probiert zu haben, kann ich es nicht beurteilen." }
    ],
    notes: "Bedingung: erst X, dann ist Y möglich.",
    related: ["n4-ato-de"]
  },
  {
    id: "n3-nai-koto-ni-wa",
    pattern: "～ないことには",
    level: "N3",
    category: "Satzstrukturen",
    meaning: "Wenn man nicht ... dann nicht",
    explanation: "ないことには: ohne diese Voraussetzung ist das Ergebnis nicht möglich.",
    formation: "Verb (ない形) + ことには",
    examples: [
      { japanese: "やってみないことには分からない。", romaji: "Yatte minai koto ni wa wakaranai.", german: "Ohne es zu versuchen, weiß man es nicht." },
      { japanese: "本人に聞かないことには確認できない。", romaji: "Honnin ni kikanai koto ni wa kakunin dekinai.", german: "Ohne die Person selbst zu fragen, kann man es nicht bestätigen." }
    ],
    notes: "Betont die Notwendigkeit einer Voraussetzung.",
    related: ["n3-te-kara-de-nai-to"]
  },
  // ============================================================
  // N3 – ERGÄNZUNGEN (17)
  // ============================================================
  {
    id: "n3-kara-koso",
    pattern: "～からこそ",
    level: "N3",
    category: "Satzstrukturen",
    meaning: "Gerade weil, eben deshalb",
    explanation: "からこそ: betont den Grund besonders stark. 'Gerade WEIL...'.",
    formation: "Verb/Adj/Nomen + だからこそ",
    examples: [
      { japanese: "好きだからこそ厳しくする。", romaji: "Suki da kara koso kibishiku suru.", german: "Gerade weil ich dich mag, bin ich streng." },
      { japanese: "失敗したからこそ学べたことがある。", romaji: "Shippai shita kara koso manabeta koto ga aru.", german: "Gerade weil ich scheiterte, konnte ich daraus lernen." }
    ],
    notes: "Betont den Grund als besonders wichtig und positiv.",
    related: ["n4-koso", "kara"]
  },
  {
    id: "n3-te-koso",
    pattern: "～てこそ",
    level: "N3",
    category: "Satzstrukturen",
    meaning: "Erst wenn man ... (dann wirklich)",
    explanation: "てこそ: erst durch diese Handlung wird etwas wahrhaft möglich/wertvoll.",
    formation: "Verb (て-Form) + こそ",
    examples: [
      { japanese: "練習してこそ上手になる。", romaji: "Renshū shite koso jōzu ni naru.", german: "Erst durch Üben wird man wirklich gut." },
      { japanese: "自分でやってこそ意味がある。", romaji: "Jibun de yatte koso imi ga aru.", german: "Erst wenn man es selbst tut, hat es Bedeutung." }
    ],
    notes: "Betont, dass die Handlung unverzichtbare Voraussetzung ist.",
    related: ["n4-koso", "n3-kara-koso"]
  },
  {
    id: "n3-kkonai",
    pattern: "～っこない",
    level: "N3",
    category: "Satzstrukturen",
    meaning: "Keine Chance dass, absolut unmöglich",
    explanation: "っこない: umgangssprachlich, drückt absolute Unmöglichkeit aus.",
    formation: "Verb (ます-Stamm) + っこない",
    examples: [
      { japanese: "そんな難しい試験、受かりっこない。", romaji: "Sonna muzukashii shiken, ukarikkkonai.", german: "So eine schwere Prüfung, da bestehe ich niemals." },
      { japanese: "あの人に勝てっこない。", romaji: "Ano hito ni katekkonai.", german: "Gegen diese Person kann ich unmöglich gewinnen." }
    ],
    notes: "Sehr umgangssprachlich. Stärker als ～はずがない.",
    related: ["n3-you-ga-nai", "n4-hazu-ga-nai"]
  },
  {
    id: "n3-ni-kawatte",
    pattern: "～にかわって / ～にかわり",
    level: "N3",
    category: "Partikel",
    meaning: "Anstelle von, im Auftrag von",
    explanation: "にかわって: jemand übernimmt die Rolle oder Position eines anderen.",
    formation: "Nomen + にかわって/にかわり",
    examples: [
      { japanese: "社長にかわって副社長が挨拶した。", romaji: "Shachō ni kawatte fukushachō ga aisatsu shita.", german: "Anstelle des Firmenchefs sprach der Vizechef." },
      { japanese: "手紙にかわってメールが普及した。", romaji: "Tegami ni kawatte mēru ga fukyū shita.", german: "Anstelle von Briefen haben sich E-Mails verbreitet." }
    ],
    notes: "Auch: ～のかわりに (informeller).",
    related: ["n3-kawari-ni"]
  },
  {
    id: "n3-kawari-ni",
    pattern: "～かわりに",
    level: "N3",
    category: "Satzstrukturen",
    meaning: "Anstatt / dafür dass",
    explanation: "かわりに: 1) anstatt etwas zu tun, 2) als Gegenleistung.",
    formation: "Verb (辞書形) + かわりに / Nomen + のかわりに",
    examples: [
      { japanese: "車を買うかわりに自転車にした。", romaji: "Kuruma o kau kawari ni jitensha ni shita.", german: "Anstatt ein Auto zu kaufen, nahm ich ein Fahrrad." },
      { japanese: "手伝ってあげるかわりに、ご飯をおごって。", romaji: "Tetsudatte ageru kawari ni, gohan o ogotte.", german: "Dafür dass ich dir helfe, lad mich zum Essen ein." }
    ],
    notes: "Austausch/Gegenleistung oder Alternative.",
    related: ["n3-ni-kawatte"]
  },
  {
    id: "n3-o-kikkake-ni",
    pattern: "～をきっかけに",
    level: "N3",
    category: "Partikel",
    meaning: "Ausgelöst durch, als Anlass",
    explanation: "をきっかけに: ein Ereignis wird zum Auslöser für eine Veränderung.",
    formation: "Nomen/Verb (た形) + のをきっかけに",
    examples: [
      { japanese: "留学をきっかけに日本語を勉強し始めた。", romaji: "Ryūgaku o kikkake ni nihongo o benkyō shi hajimeta.", german: "Ausgelöst durch den Auslandsaufenthalt begann ich Japanisch zu lernen." },
      { japanese: "病気をきっかけに生活を見直した。", romaji: "Byōki o kikkake ni seikatsu o minaoshita.", german: "Die Krankheit war der Anlass, meinen Lebensstil zu überdenken." }
    ],
    notes: "Der Anlass ist meist ein einmaliges, konkretes Ereignis.",
    related: []
  },
  {
    id: "n3-o-towazu",
    pattern: "～を問わず",
    level: "N3",
    category: "Partikel",
    meaning: "Ungeachtet, unabhängig von",
    explanation: "を問わず: es spielt keine Rolle, welcher Fall zutrifft.",
    formation: "Nomen + を問わず",
    examples: [
      { japanese: "年齢を問わず参加できます。", romaji: "Nenrei o towazu sanka dekimasu.", german: "Man kann unabhängig vom Alter teilnehmen." },
      { japanese: "経験の有無を問わず応募できる。", romaji: "Keiken no umu o towazu ōbo dekiru.", german: "Man kann sich unabhängig von Erfahrung bewerben." }
    ],
    notes: "Formell. Oft: 国籍を問わず, 男女を問わず.",
    related: ["n3-ni-kakawarazu"]
  },
  {
    id: "n3-ni-kakawarazu",
    pattern: "～にかかわらず",
    level: "N3",
    category: "Partikel",
    meaning: "Unabhängig von, egal ob",
    explanation: "にかかわらず: das Ergebnis ändert sich nicht, egal welche Bedingung vorliegt.",
    formation: "Nomen + にかかわらず / Verb (辞書形/ない形) + にかかわらず",
    examples: [
      { japanese: "天気にかかわらず試合は行われる。", romaji: "Tenki ni kakawarazu shiai wa okonawareru.", german: "Unabhängig vom Wetter findet das Spiel statt." },
      { japanese: "賛成するしないにかかわらず出席してください。", romaji: "Sansei suru shinai ni kakawarazu shusseki shite kudasai.", german: "Kommen Sie, egal ob Sie zustimmen oder nicht." }
    ],
    notes: "Formeller als ～に関係なく. Nicht verwechseln mit ～にもかかわらず (trotz).",
    related: ["n3-o-towazu", "n3-ni-mo-kakawarazu"]
  },
  {
    id: "n3-ni-sotte",
    pattern: "～に沿って",
    level: "N3",
    category: "Partikel",
    meaning: "Entlang, gemäß, entsprechend",
    explanation: "に沿って: einer Linie, einem Plan oder einer Richtlinie folgen.",
    formation: "Nomen + に沿って / に沿った + Nomen",
    examples: [
      { japanese: "川に沿って歩いた。", romaji: "Kawa ni sotte aruita.", german: "Ich ging am Fluss entlang." },
      { japanese: "計画に沿って進めてください。", romaji: "Keikaku ni sotte susumete kudasai.", german: "Bitte gehen Sie gemäß dem Plan vor." }
    ],
    notes: "Konkret (Fluss) und abstrakt (Plan) möglich.",
    related: ["n3-ni-shitagatte"]
  },
  {
    id: "n3-gatai",
    pattern: "～がたい",
    level: "N3",
    category: "Verben",
    meaning: "Schwer zu (emotional/moralisch)",
    explanation: "がたい: etwas ist emotional oder moralisch schwer zu tun. Formeller als ～にくい.",
    formation: "Verb (ます-Stamm) + がたい",
    examples: [
      { japanese: "彼の行動は理解しがたい。", romaji: "Kare no kōdō wa rikai shigatai.", german: "Sein Verhalten ist schwer zu verstehen." },
      { japanese: "忘れがたい思い出だ。", romaji: "Wasuregatai omoide da.", german: "Eine unvergessliche Erinnerung." }
    ],
    notes: "Formeller als ～にくい und ～づらい. 信じがたい (kaum zu glauben).",
    related: ["n4-nikui", "n3-zurai"]
  },
  {
    id: "n3-ta-tokoro-de",
    pattern: "～たところで",
    level: "N3",
    category: "Satzstrukturen",
    meaning: "Selbst wenn man ... tut (nutzlos)",
    explanation: "たところで: selbst wenn man etwas tut, ändert sich nichts / ist es sinnlos.",
    formation: "Verb (た形) + ところで",
    examples: [
      { japanese: "今更謝ったところで許してもらえない。", romaji: "Imasara ayamatta tokoro de yurushite moraenai.", german: "Selbst wenn ich mich jetzt entschuldige, wird man mir nicht verzeihen." },
      { japanese: "急いだところで間に合わない。", romaji: "Isoida tokoro de maniawanai.", german: "Selbst wenn ich mich beeile, schaffe ich es nicht." }
    ],
    notes: "Immer negatives/resigniertes Ergebnis.",
    related: ["n4-temo", "n3-ta-tokoro"]
  },
  {
    id: "n3-oki-ni",
    pattern: "～おきに",
    level: "N3",
    category: "Satzstrukturen",
    meaning: "Alle ... (Intervall)",
    explanation: "おきに: drückt regelmäßige Intervalle aus.",
    formation: "Zahl + Zeiteinheit + おきに",
    examples: [
      { japanese: "二時間おきに薬を飲んでください。", romaji: "Nijikan oki ni kusuri o nonde kudasai.", german: "Nehmen Sie alle zwei Stunden die Medizin." },
      { japanese: "一日おきにジョギングしている。", romaji: "Ichinichi oki ni jogingu shiteiru.", german: "Ich jogge jeden zweiten Tag." }
    ],
    notes: "一日おきに = jeden zweiten Tag. 一つおきに = jedes zweite.",
    related: ["n4-zutsu"]
  },
  {
    id: "n3-to-iu-mono-da",
    pattern: "～というものだ",
    level: "N3",
    category: "Satzstrukturen",
    meaning: "Das ist (die wahre Natur von)",
    explanation: "というものだ: betont die wahre Natur oder das Wesen einer Sache.",
    formation: "Nomen/Satz + というものだ",
    examples: [
      { japanese: "それが本当の友情というものだ。", romaji: "Sore ga hontō no yūjō to iu mono da.", german: "Das ist wahre Freundschaft." },
      { japanese: "人生とはそういうものだ。", romaji: "Jinsei to wa sō iu mono da.", german: "So ist das Leben eben." }
    ],
    notes: "Philosophisch/belehrend. というものではない = so einfach ist es nicht.",
    related: ["n4-toiu"]
  },
  {
    id: "n3-ba-ii-noni",
    pattern: "～ばいいのに",
    level: "N3",
    category: "Satzstrukturen",
    meaning: "Ich wünschte, wenn doch nur",
    explanation: "ばいいのに: drückt einen unerfüllten Wunsch oder Bedaürn aus.",
    formation: "Verb (ば-Form) + いいのに",
    examples: [
      { japanese: "もっと早く言えばいいのに。", romaji: "Motto hayaku ieba ii noni.", german: "Wenn er es doch nur früher gesagt hätte." },
      { japanese: "毎日晴れればいいのに。", romaji: "Mainichi harereba ii noni.", german: "Wenn es doch nur jeden Tag sonnig wäre." }
    ],
    notes: "Eigener Wunsch oder Vorwurf an andere.",
    related: ["n4-ba-yokatta", "n4-ba"]
  },
  {
    id: "n3-o-komete",
    pattern: "～を込めて",
    level: "N3",
    category: "Partikel",
    meaning: "Mit (Gefühl/Mühe) erfüllt",
    explanation: "を込めて: etwas wird mit einem bestimmten Gefühl oder Einsatz getan.",
    formation: "Nomen + を込めて",
    examples: [
      { japanese: "心を込めて作りました。", romaji: "Kokoro o komete tsukurimashita.", german: "Ich habe es mit ganzem Herzen gemacht." },
      { japanese: "感謝の気持ちを込めてプレゼントを贈った。", romaji: "Kansha no kimochi o komete purezento o okutta.", german: "Ich schenkte es mit einem Gefühl der Dankbarkeit." }
    ],
    notes: "心を込めて (von Herzen), 願いを込めて (mit einem Wunsch).",
    related: []
  },
  {
    id: "n3-ayamaru",
    pattern: "謝る / ～てすみません",
    level: "N3",
    category: "Verben",
    meaning: "Sich entschuldigen",
    explanation: "謝る (あやまる): sich entschuldigen. Im Japanischen gibt es verschiedene Entschuldigungsformen je nach Situation und Höflichkeitsstufe.",
    formation: "謝る / ～てすみません / ～て申し訳ありません / ～てごめんなさい",
    examples: [
      { japanese: "遅れたことを謝った。", romaji: "Okureta koto o ayamatta.", german: "Ich entschuldigte mich für die Verspätung." },
      { japanese: "ご迷惑をおかけして申し訳ありません。", romaji: "Gomeiwaku o okake shite mōshiwake arimasen.", german: "Ich entschuldige mich für die Unannehmlichkeiten." },
      { japanese: "遅くなってすみません。", romaji: "Osoku natte sumimasen.", german: "Entschuldigung, dass es so spät geworden ist." }
    ],
    notes: "Höflichkeit: ごめん(なさい) < すみません < 申し訳ありません/ございません. 謝る ist das Verb 'sich entschuldigen'.",
    related: []
  },
  {
    id: "n3-ni-totte-no",
    pattern: "～にとっての",
    level: "N3",
    category: "Partikel",
    meaning: "Für ... (attributiv)",
    explanation: "にとっての: attributive Form von にとって, vor Nomen verwendet.",
    formation: "Nomen + にとっての + Nomen",
    examples: [
      { japanese: "私にとっての幸せは家族と過ごすことだ。", romaji: "Watashi ni totte no shiawase wa kazoku to sugosu koto da.", german: "Für mich ist Glück, Zeit mit der Familie zu verbringen." },
      { japanese: "学生にとっての最大の課題は就職だ。", romaji: "Gakusei ni totte no saidai no kadai wa shūshoku da.", german: "Die größte Herausforderung für Studenten ist die Jobsuche." }
    ],
    notes: "にとって + Satz vs. にとっての + Nomen.",
    related: ["n4-ni-totte"]
  }
];
