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
    explanation: "Die Passivform drückt aus, dass das Subjekt eine Handlung erleidet. Im Japanischen gibt es auch das 'Leidenspassiv' (迷惑の受身).",
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
      { japanese: "映画を見よう。", romaji: "Eiga o miyō.", german: "Lass uns einen Film schauen." },
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
    explanation: "てしまう drückt entweder Bedauern über eine unbeabsichtigte Handlung oder die Vollendung einer Handlung aus.",
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
      { japanese: "週末は映画を見たり、買い物をしたりします。", romaji: "Shūmatsu wa eiga o mitari, kaimono o shitari shimasu.", german: "Am Wochenende schaue ich Filme, gehe einkaufen und so weiter." },
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
      { japanese: "歩きながらスマホを見ないでください。", romaji: "Arukinagara sumaho o minaide kudasai.", german: "Bitte schauen Sie nicht beim Gehen aufs Handy." }
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
    explanation: "てある drückt aus, dass eine absichtliche Handlung ausgeführt wurde und deren Ergebnis noch andauert.",
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
      { japanese: "見るだけでいいです。", romaji: "Miru dake de ii desu.", german: "Nur schauen reicht." }
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
    explanation: "しか + Verneinung: betont Einschränkung, bedauernd.",
    formation: "Nomen + しか + Verb (ない形)",
    examples: [
      { japanese: "百円しかない。", romaji: "Hyaku-en shika nai.", german: "Ich habe nur 100 Yen." },
      { japanese: "日本語しか話せません。", romaji: "Nihongo shika hanasemasen.", german: "Ich kann nur Japanisch." }
    ],
    notes: "しか = bedauernd, だけ = neutral.",
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
    explanation: "間に: innerhalb eines Zeitraums. 間: die gesamte Dauer.",
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
      { japanese: "週末は映画とか買い物とかする。", romaji: "Shūmatsu wa eiga toka kaimono toka suru.", german: "Am Wochenende Filme schauen, einkaufen usw." },
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
    explanation: "ばよかった: Bedauern über etwas nicht Getanes.",
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
      { japanese: "高いことは高いが、品質はいい。", romaji: "Takai koto wa takai ga, hinshitsu wa ii.", german: "Teuer ist es zwar, aber die Qualität ist gut." }
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
  }
];
