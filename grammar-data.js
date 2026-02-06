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
    explanation: "よ wird am Satzende verwendet, um neue Informationen mitzuteilen oder eine Aussage zu betonen. Es signalisiert dem Gesprächspartner, dass man etwas Neues oder Wichtiges sagt.",
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
    explanation: "～ている drückt eine andauernde Handlung (Verlaufsform) oder einen resultierenden Zustand aus. Die höfliche Form ist ～ています. Bei manchen Verben beschreibt es einen Zustand statt einer Aktivität.",
    formation: "Verb て-Form + いる / います",
    examples: [
      { japanese: "今、本を読んでいます。", romaji: "Ima, hon o yonde imasu.", german: "Ich lese gerade ein Buch." },
      { japanese: "東京に住んでいます。", romaji: "Tōkyō ni sunde imasu.", german: "Ich wohne in Tokio." }
    ],
    notes: "Bei Zustandsverben wie 知る, 結婚する, 持つ beschreibt ている den resultierenden Zustand: 知っています (Ich weiß es), nicht eine andauernde Handlung.",
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
      { japanese: "週末は本を読んだりテレビを見たりします。", romaji: "Shūmatsu wa hon o yondari terebi o mitari shimasu.", german: "Am Wochenende lese ich Bücher, schaue Fernsehen und so weiter." },
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
    explanation: "～てしまう hat zwei Bedeutungen: etwas unbeabsichtigt oder bedauerlich tun, oder eine Handlung vollständig abschließen. Die höfliche Form ist ～てしまいます. In der Umgangssprache wird es zu ～ちゃう verkürzt.",
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
    explanation: "～しか～ない bedeutet 'nur' und betont, dass etwas wenig oder begrenzt ist. Es wird immer mit der negativen Verbform verwendet und drückt oft Enttäuschung oder Bedauern aus.",
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
  }
];
