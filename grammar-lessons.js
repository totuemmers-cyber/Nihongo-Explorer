// =============================================================
// === GRAMMAR LESSONS MODULE (N5–N1) ===
// =============================================================
(function () {
  'use strict';

  var LESSONS = [
    // ===================== LEKTION 1 =====================
    {
      id: 'lesson-1',
      number: 1,
      title: 'は vs が',
      subtitle: 'Das ewige Rätsel',
      level: 'N5',
      intro: 'Die beiden wichtigsten Partikel im Japanischen — und ja, der Unterschied ist anfangs verwirrend. Selbst Fortgeschrittene stolpern gelegentlich noch darüber. Aber keine Sorge: mit ein paar Grundideen wird das Ganze überraschend logisch. Das Geheimnis liegt darin, は und が nicht als Gegenspieler zu sehen, sondern als zwei Werkzeuge mit unterschiedlichen Aufgaben. Beide können im selben Satz auftauchen, und genau dann zeigt sich ihre wahre Natur am besten.',
      sections: [
        {
          heading: 'は — „Was mich betrifft..."',
          text: 'は (gesprochen „wa") ist der <strong>Themenmarkierer</strong>. Es sagt nicht, wer etwas tut — es sagt, <em>worüber wir gerade reden</em>. Stell dir vor, du hebst ein Schild hoch: „Achtung, jetzt reden wir über X!" Das Thema ist das, was beide Gesprächspartner schon kennen oder was gerade im Raum steht. Es ist der Rahmen, in dem der Rest des Satzes stattfindet. Im Deutschen gibt es dafür kein direktes Äquivalent — am nächsten kommt „Was X betrifft..." oder „Apropos X...".',
          examples: [
            { jp: '私は学生です。', romaji: 'Watashi wa gakusei desu.', de: 'Ich bin Student. (Wörtlich: Was mich betrifft — Student.)' },
            { jp: '東京は大きいです。', romaji: 'Tōkyō wa ōkii desu.', de: 'Tokyo ist groß. (Was Tokyo betrifft — groß.)' },
            { jp: '今日は暑いですね。', romaji: 'Kyō wa atsui desu ne.', de: 'Heute ist es heiß, oder? (Was heute betrifft...)' },
          ]
        },
        {
          heading: 'が — Das Spotlight',
          text: 'が ist der <strong>Subjektmarkierer</strong>. Es zeigt auf jemanden oder etwas und sagt: „Genau DAS ist es!" が kommt immer dann ins Spiel, wenn eine <strong>neue Information</strong> geliefert wird — eine Identität enthüllt, eine Überraschung ausgedrückt oder eine Existenz festgestellt wird. Während は den Hintergrund aufspannt, beleuchtet が den Vordergrund. Wenn jemand fragt „Wer hat das gemacht?", dann ist die Antwort ein が-Satz, weil die Identität neu ist.',
          examples: [
            { jp: '誰が来ましたか。', romaji: 'Dare ga kimashita ka.', de: 'Wer ist gekommen? (Wir suchen die Identität.)' },
            { jp: '田中さんが来ました。', romaji: 'Tanaka-san ga kimashita.', de: 'Tanaka ist gekommen! (Neue Info: Es ist Tanaka!)' },
            { jp: '雨が降っています。', romaji: 'Ame ga futte imasu.', de: 'Es regnet. (Der Regen fällt — Naturereignis.)' },
          ]
        },
        {
          heading: 'Zusammen in einem Satz',
          text: 'Oft erscheinen は und が im selben Satz — und genau hier zeigt sich der Unterschied am klarsten. Das Thema (は) setzt den äußeren Rahmen: „Worüber reden wir?" Das Subjekt (が) zeigt innerhalb dieses Rahmens auf etwas Bestimmtes. Ein gutes Bild: は ist die Bühne, が ist der Scheinwerfer auf dem Hauptdarsteller.',
          examples: [
            { jp: '私は猫が好きです。', romaji: 'Watashi wa neko ga suki desu.', de: 'Ich mag Katzen. (Was mich betrifft: Katzen sind das, was mir gefällt.)' },
            { jp: '日本は食べ物がおいしいです。', romaji: 'Nihon wa tabemono ga oishii desu.', de: 'In Japan ist das Essen lecker. (Was Japan betrifft: Essen = lecker.)' },
            { jp: '私は頭が痛いです。', romaji: 'Watashi wa atama ga itai desu.', de: 'Mir tut der Kopf weh. (Was mich betrifft: der Kopf = schmerzt.)' },
          ]
        },
        {
          heading: 'は für Kontrast',
          text: 'Eine wichtige Zusatzfunktion von は: Es kann <strong>Kontraste</strong> ausdrücken. Wenn du は an zwei Dinge hängst, sagt das implizit: „Dieses hier schon, aber jenes hier nicht." Das funktioniert sogar innerhalb eines einzigen Satzes. Dieses Kontrast-は ist extrem häufig und wird gerne übersehen.',
          examples: [
            { jp: 'コーヒーは飲みますが、お茶は飲みません。', romaji: 'Kōhī wa nomimasu ga, ocha wa nomimasen.', de: 'Kaffee trinke ich, aber Tee trinke ich nicht.' },
            { jp: '肉は食べますが、魚は食べません。', romaji: 'Niku wa tabemasu ga, sakana wa tabemasen.', de: 'Fleisch esse ich, aber Fisch esse ich nicht.' },
            { jp: '漢字は読めますが、書けません。', romaji: 'Kanji wa yomemasu ga, kakemasen.', de: 'Kanji lesen kann ich, aber schreiben kann ich nicht.' }
          ]
        },
        {
          heading: 'Faustregeln',
          text: 'Hier die wichtigsten Orientierungshilfen auf einen Blick. Diese Regeln decken geschätzt 90% aller Fälle ab:<ul class="lesson-rules"><li><strong>Neue Information?</strong> → が (Antwort auf „Wer? Was?")</li><li><strong>Bekanntes Thema?</strong> → は (Worüber reden wir?)</li><li><strong>Kontrast?</strong> → は (Kaffee mag ich, aber Tee mag ich NICHT)</li><li><strong>Existenz / Naturphänomene?</strong> → が (Es gibt... / Es regnet...)</li><li><strong>Gefühle & Können?</strong> → が für das Objekt (猫<strong>が</strong>好き, 日本語<strong>が</strong>わかる)</li><li><strong>In Nebensätzen?</strong> → が (は ist dort fast nie erlaubt)</li></ul>',
          examples: [
            { jp: 'A: 誰が窓を開けましたか。', romaji: 'Dare ga mado o akemashita ka.', de: 'Wer hat das Fenster geöffnet? (Identität gesucht → が)' },
            { jp: 'B: 田中さんが開けました。', romaji: 'Tanaka-san ga akemashita.', de: 'Tanaka hat es geöffnet. (Neue Info → が)' }
          ],
          tip: 'Im Zweifel: Wenn du auf die Frage „Wer/Was genau?" antwortest, nimm が. Wenn du über etwas redest, das beiden Seiten schon klar ist, nimm は. Und mach dir keinen zu großen Kopf — selbst wenn du mal daneben liegst, wirst du trotzdem verstanden!'
        }
      ]
    },

    // ===================== LEKTION 2 =====================
    {
      id: 'lesson-2',
      number: 2,
      title: 'を, に, で',
      subtitle: 'Die drei Musketiere der Partikel',
      level: 'N5',
      intro: 'Drei kleine Partikel, die in fast jedem japanischen Satz auftauchen. Zusammen mit は und が bilden sie das Grundgerüst der japanischen Satzstruktur. Jeder der drei hat seine eigene Aufgabe — und wenn du die einmal kapiert hast, fallen dir Sätze fast von alleine zusammen. Der Schlüssel liegt darin, sich nicht zu fragen „Was heißt das auf Deutsch?", sondern „Welche Rolle spielt das Wort im Satz?".',
      sections: [
        {
          heading: 'を — Was du tust (das direkte Objekt)',
          text: 'を (gesprochen „o") markiert das <strong>direkte Objekt</strong> — also die Sache, die von der Handlung betroffen ist. Du isst <em>etwas</em>, du liest <em>etwas</em>, du kaufst <em>etwas</em>. Im Deutschen erkennt man das direkte Objekt am Akkusativ (wen oder was?). Im Japanischen übernimmt を diese Aufgabe — zuverlässig und ohne Ausnahmen. Jedes transitive Verb braucht ein を-Objekt.',
          examples: [
            { jp: '本を読みます。', romaji: 'Hon o yomimasu.', de: 'Ich lese ein Buch.' },
            { jp: '水を飲みました。', romaji: 'Mizu o nomimashita.', de: 'Ich habe Wasser getrunken.' },
            { jp: '映画を見ましょう。', romaji: 'Eiga o mimashō.', de: 'Lass uns einen Film schauen!' },
          ],
          tip: 'を markiert auch Orte, die man <strong>durchquert oder verlässt</strong>. Das ist eine Sonderbedeutung, die oft überrascht: 公園を歩く (durch den Park gehen), 家を出る (das Haus verlassen), 橋を渡る (eine Brücke überqueren). Hier ist der Ort quasi das „Objekt" der Bewegung.'
        },
        {
          heading: 'に — Wo etwas IST, wohin du GEHST',
          text: 'に ist der Partikel für <strong>Ziel, Ort, Zeitpunkt und Empfänger</strong>. Er beantwortet die Fragen „Wohin?", „Wo?" (bei Existenz), „Wann?" (bei konkreten Zeitpunkten) und „Wem?". Von allen Partikeln ist に wahrscheinlich der vielseitigste — er taucht in den unterschiedlichsten Kontexten auf, hat aber immer mit einer Art „Zielpunkt" zu tun.',
          examples: [
            { jp: '学校に行きます。', romaji: 'Gakkō ni ikimasu.', de: 'Ich gehe zur Schule. (Ziel einer Bewegung)' },
            { jp: '東京に住んでいます。', romaji: 'Tōkyō ni sunde imasu.', de: 'Ich wohne in Tokyo. (Ort des Wohnens/Existierens)' },
            { jp: '七時に起きます。', romaji: 'Shichi-ji ni okimasu.', de: 'Ich stehe um sieben Uhr auf. (Konkreter Zeitpunkt)' },
          ],
          tip: 'Zeitangaben mit に: Konkrete Zeitpunkte (Uhrzeiten, Wochentage, Daten) brauchen に. Relative Zeitangaben wie 今日, 明日, 来週 brauchen KEIN に, weil sie schon eine zeitliche Beziehung zum „Jetzt" ausdrücken.'
        },
        {
          heading: 'で — Wo du etwas TUST, womit du es tust',
          text: 'で markiert den <strong>Ort einer aktiven Handlung</strong>, das <strong>Mittel oder Werkzeug</strong>, die <strong>Ursache</strong> und manchmal den <strong>Rahmen</strong> (z.B. „zu zweit", „insgesamt"). Der entscheidende Unterschied zu に: Bei で passiert aktiv etwas. Es ist die Bühne, auf der eine Handlung stattfindet — nicht der ruhige Punkt, an dem etwas existiert.',
          examples: [
            { jp: '図書館で勉強します。', romaji: 'Toshokan de benkyō shimasu.', de: 'Ich lerne in der Bibliothek. (Ort der Handlung)' },
            { jp: '箸で食べます。', romaji: 'Hashi de tabemasu.', de: 'Ich esse mit Stäbchen. (Werkzeug)' },
            { jp: '日本語で話してください。', romaji: 'Nihongo de hanashite kudasai.', de: 'Bitte sprich auf Japanisch. (Mittel/Sprache)' },
          ],
          tip: 'で kann auch <strong>Ursache</strong> und <strong>Umfang</strong> ausdrücken: 病気で休む (wegen Krankheit fehlen), 三人で食べた (zu dritt gegessen). Diese Bedeutungen leiten sich alle vom Grundgedanken ab: で beschreibt die Umstände, unter denen etwas geschieht.'
        },
        {
          heading: 'に vs で — Der Klassiker',
          text: 'Der Unterschied zwischen に und で ist einer der häufigsten Stolpersteine für Lernende. Die Faustregel: <strong>に = Existenz / Zustand / Zielpunkt</strong> (etwas IST dort oder etwas bewegt sich DORTHIN), <strong>で = Aktion / Mittel</strong> (etwas PASSIERT dort oder wird damit gemacht). Bei Ortsangaben hilft die Frage: Passiert dort aktiv etwas? → で. Ist dort einfach nur etwas (vorhanden, wohnhaft, befestigt)? → に.',
          examples: [
            { jp: '公園に猫がいます。', romaji: 'Kōen ni neko ga imasu.', de: 'Im Park ist eine Katze. (に = sie existiert dort, ruhig)' },
            { jp: '公園で遊びます。', romaji: 'Kōen de asobimasu.', de: 'Ich spiele im Park. (で = ich tue aktiv etwas dort)' },
            { jp: '駅に着きました。', romaji: 'Eki ni tsukimashita.', de: 'Ich bin am Bahnhof angekommen. (に = Zielpunkt)' },
          ],
          tip: 'Eselsbrücke: に ist wie eine Stecknadel auf der Karte — ein fester Punkt, an dem etwas existiert oder ankommt. で ist wie eine Bühne — ein Ort, an dem etwas aufgeführt wird. Wenn du dir das merkst, liegst du fast immer richtig.'
        }
      ]
    },

    // ===================== LEKTION 3 =====================
    {
      id: 'lesson-3',
      number: 3,
      title: 'です & ます',
      subtitle: 'Höflich von Anfang an',
      level: 'N5',
      intro: 'Japanisch hat eingebaute Höflichkeitsstufen — und die gute Nachricht ist: Die Grundform ist gar nicht schwer. Mit です und ます bist du in den allermeisten Situationen bestens aufgestellt. Ob im Geschäft, am Bahnhof, beim Arzt oder mit neuen Bekanntschaften: Die sogenannte „teineigo" (丁寧語, höfliche Sprache) ist der Standard, den jeder Japanisch-Lernende als Erstes meistern sollte. Alles andere baut darauf auf.',
      sections: [
        {
          heading: 'です — Das höfliche „ist"',
          text: 'です (desu) steht am Satzende nach <strong>Nomen und な-Adjektiven</strong>. Es macht den Satz höflich und bedeutet so viel wie „ist/bin/sind". In der Umgangssprache wird stattdessen だ (da) benutzt — aber als Lernender fährst du mit です immer sicher. Es ist quasi die Krawatte des japanischen Satzes: Man kann sie weglassen, wenn die Situation locker ist, aber mit ihr ist man immer angemessen gekleidet.',
          examples: [
            { jp: '学生です。', romaji: 'Gakusei desu.', de: 'Ich bin Student.' },
            { jp: 'これは本です。', romaji: 'Kore wa hon desu.', de: 'Das ist ein Buch.' },
            { jp: '静かです。', romaji: 'Shizuka desu.', de: 'Es ist ruhig. (な-Adjektiv + です)' },
          ],
          tip: 'Bei い-Adjektiven ist です optional und rein höflich — es verändert die Grammatik nicht. 大きいです = 大きい + Höflichkeit. Man sagt NICHT 大きいだ — das wäre doppelt gemoppelt und falsch.'
        },
        {
          heading: 'ます — Das höfliche Verb-Ende',
          text: 'ます (masu) wird an den <strong>Verbstamm</strong> (auch „ます-Stamm" genannt) angehängt und macht jedes Verb höflich. Fast alle Lehrwerke starten mit der ます-Form, weil man damit überall bestehen kann. Den Verbstamm zu finden ist einfach: Bei る-Verben lässt du る weg (食べる → 食べ), bei う-Verben wechselst du die Endung in die い-Reihe (行く → 行き, 話す → 話し, 飲む → 飲み).',
          examples: [
            { jp: '食べます。', romaji: 'Tabemasu.', de: 'Ich esse.' },
            { jp: '日本語を勉強します。', romaji: 'Nihongo o benkyō shimasu.', de: 'Ich lerne Japanisch.' },
            { jp: '毎日走ります。', romaji: 'Mainichi hashirimasu.', de: 'Ich laufe jeden Tag.' },
          ],
          tip: 'Die zwei wichtigsten unregelmäßigen Verben in der ます-Form: する → します und くる (来る) → きます. Alle する-Verben folgen dem gleichen Muster: 勉強する → 勉強します, 運動する → 運動します.'
        },
        {
          heading: 'Die vier Grundformen',
          text: 'Die ます-Form lässt sich einfach in vier Zeiten verwandeln. Das System ist erfreulich regelmäßig — keine Ausnahmen, keine unregelmäßigen Formen. Sobald du den Verbstamm hast, funktioniert alles wie ein Baukasten:',
          examples: [
            { jp: '食べます', romaji: 'tabemasu', de: 'esse / werde essen (Gegenwart/Zukunft, höflich)' },
            { jp: '食べません', romaji: 'tabemasen', de: 'esse nicht (Verneinung, höflich)' },
            { jp: '食べました', romaji: 'tabemashita', de: 'habe gegessen (Vergangenheit, höflich)' },
          ],
          tip: 'Beachte: Japanisch unterscheidet grammatisch nicht zwischen Gegenwart und Zukunft. 食べます heißt sowohl „ich esse" als auch „ich werde essen" — der Kontext klärt den Rest.'
        },
        {
          heading: 'です in allen Zeiten',
          text: 'Genau wie ます hat auch です seine vier Formen. Sie funktionieren nach demselben Muster und gelten für Nomen und な-Adjektive gleichermaßen:',
          examples: [
            { jp: '学生です', romaji: 'gakusei desu', de: 'ist Student (Gegenwart, höflich)' },
            { jp: '学生じゃありません', romaji: 'gakusei ja arimasen', de: 'ist nicht Student (Verneinung, höflich)' },
            { jp: '学生でした', romaji: 'gakusei deshita', de: 'war Student (Vergangenheit, höflich)' },
          ]
        },
        {
          heading: 'Wann duzt Japan?',
          text: 'Die sogenannte <strong>Kurzform</strong> (auch „Plain Form" oder „Dictionary Form") benutzt man unter engen Freunden, in der Familie, in Tagebüchern und — ganz wichtig — in Nebensätzen. Die Kurzform ist also keineswegs unhöflich, sie ist einfach intim. Aber als Anfänger: Die ます/です-Form ist dein sicherer Hafen. Damit machst du nirgendwo etwas falsch. Lieber zu höflich als zu lässig — Japaner schätzen das.',
          examples: [
            { jp: '食べる → 食べます', romaji: 'taberu → tabemasu', de: 'essen (casual → höflich)' },
            { jp: '高い → 高いです', romaji: 'takai → takai desu', de: 'teuer (casual → höflich)' },
            { jp: '学生だ → 学生です', romaji: 'gakusei da → gakusei desu', de: 'Student (casual → höflich)' },
          ],
          tip: 'Merke: Die Kurzform brauchst du trotzdem — sie kommt in Nebensätzen (と思う, から, のに...), Zitaten und Konditionalen ständig vor. Du lernst sie also sowieso bald, auch wenn du im Hauptsatz bei ます/です bleibst!'
        }
      ]
    },

    // ===================== LEKTION 4 =====================
    {
      id: 'lesson-4',
      number: 4,
      title: 'い-Adjektive & な-Adjektive',
      subtitle: 'Zwei Familien, zwei Regeln',
      level: 'N5',
      intro: 'Japanische Adjektive kommen in zwei Sorten, und das ist eine der ersten Weggabelungen, an die man als Lernender kommt. Die gute Nachricht: Man kann sie meistens an der Endung erkennen. Die schlechte Nachricht: Es gibt ein paar hinterhältige Ausnahmen. Aber die sind überschaubar — versprochen. Wer die Grundregeln einmal verstanden hat, kann Dinge beschreiben, vergleichen und über die Vergangenheit reden, ohne ins Schwitzen zu kommen.',
      sections: [
        {
          heading: 'い-Adjektive — Die Wandelbaren',
          text: 'い-Adjektive enden auf い und <strong>konjugieren wie Verben</strong>. Das い am Ende ist keine Dekoration — es ist der Teil, der sich verändert, je nachdem ob du Gegenwart, Vergangenheit, Verneinung oder Adverb brauchst. Man kann sich い-Adjektive als „eigenständige Wörter" vorstellen, die alles Nötige direkt in sich tragen, ohne Hilfe von です oder だ zu brauchen (auch wenn です gerne zur Höflichkeit dazukommt).',
          examples: [
            { jp: '大きい (ōkii)', romaji: '', de: 'groß' },
            { jp: '高い → 高くない', romaji: 'takai → takakunai', de: 'teuer → nicht teuer (い → くない)' },
            { jp: '高い → 高かった', romaji: 'takai → takakatta', de: 'teuer → war teuer (い → かった)' },
          ],
          tip: 'Die Adverbform (い → く) ist super nützlich: 早く起きる (früh aufstehen), 大きくなる (groß werden), 安く買う (günstig kaufen). Sie verwandelt das Adjektiv in ein „wie"-Wort.'
        },
        {
          heading: 'な-Adjektive — Die Nomen-artigen',
          text: 'な-Adjektive verhalten sich eher wie <strong>Nomen</strong>. Sie brauchen immer einen „Kleber", um sich mit dem Rest des Satzes zu verbinden: な vor Nomen, だ/です am Satzende, で als Adverb. Man kann sie sich als beschreibende Nomen vorstellen — sie existieren nicht „aus sich selbst heraus" wie い-Adjektive, sondern brauchen immer eine grammatische Brücke.',
          examples: [
            { jp: '静かな町', romaji: 'shizuka na machi', de: 'eine ruhige Stadt (な vor Nomen)' },
            { jp: '静かです → 静かじゃないです', romaji: 'shizuka desu → shizuka ja nai desu', de: 'ruhig → nicht ruhig' },
            { jp: '静かでした → 静かじゃなかったです', romaji: 'shizuka deshita → shizuka ja nakatta desu', de: 'war ruhig → war nicht ruhig' },
          ],
          tip: 'Die tückischsten な-Adjektive, die wie い-Adjektive aussehen: きれい(な) = schön, 有名(な) = berühmt, 嫌い(な) = verhasst. Sie enden auf い, konjugieren aber NICHT wie い-Adjektive. きれくない ist falsch — きれいじゃない ist richtig!'
        },
        {
          heading: 'Vor Nomen: Der Unterschied',
          text: 'Vor einem Nomen zeigt sich der Unterschied am deutlichsten. い-Adjektive stehen einfach direkt davor — das い bleibt stehen und es wird nichts dazwischengeschoben. な-Adjektive brauchen das な als Bindeglied, um das Nomen zu modifizieren. Dieses Muster ist absolut verlässlich und einer der einfachsten Tests, um den Adjektiv-Typ zu bestimmen.',
          examples: [
            { jp: '大きい家', romaji: 'ōkii ie', de: 'großes Haus (い bleibt einfach stehen)' },
            { jp: 'きれいな花', romaji: 'kirei na hana', de: 'schöne Blume (な verbindet)' },
            { jp: '新しい車', romaji: 'atarashii kuruma', de: 'neues Auto (い-Adjektiv)' },
          ]
        },
        {
          heading: 'Adjektive verbinden',
          text: 'Wenn du mehrere Adjektive aneinanderreihen willst (wie „groß und schön"), brauchst du die <strong>て-Form der Adjektive</strong>. Bei い-Adjektiven wird い zu くて, bei な-Adjektiven wird な zu で. Das letzte Adjektiv in der Kette bleibt in seiner normalen Form.',
          examples: [
            { jp: '大きくて新しい家', romaji: 'ōkikute atarashii ie', de: 'ein großes und neues Haus (い → くて)' },
            { jp: '静かできれいな町', romaji: 'shizuka de kirei na machi', de: 'eine ruhige und schöne Stadt (な → で)' },
            { jp: 'この料理は安くておいしいです。', romaji: 'Kono ryōri wa yasukute oishii desu.', de: 'Dieses Gericht ist günstig und lecker.' },
          ]
        },
        {
          heading: 'Die berühmten Fallen',
          text: 'Einige Wörter sehen aus wie い-Adjektive, sind aber な-Adjektive. Sie enden zwar auf い, aber das い gehört zum Wortstamm — es ist kein konjugierbares い. Diese Wörter muss man leider auswendig lernen. Die häufigsten Kandidaten sind:',
          examples: [
            { jp: 'きれい（な）', romaji: 'kirei (na)', de: 'schön / sauber — NICHT きれくない!' },
            { jp: '有名（な）', romaji: 'yūmei (na)', de: 'berühmt — sieht aus wie い, ist aber な' },
            { jp: '嫌い（な）', romaji: 'kirai (na)', de: 'verhasst — auch ein な-Adjektiv!' },
          ],
          tip: 'Faustregel für Fallen: Wenn das い Teil eines längeren Wortblocks ist (z.B. きれい = きれ+い, aber das い ist kein eigenständiges Suffix), ist es wahrscheinlich ein な-Adjektiv. Echte い-Adjektive haben ein い, das man „anfassen und verändern" kann. Im Zweifel: nachschlagen!'
        }
      ]
    },

    // ===================== LEKTION 5 =====================
    {
      id: 'lesson-5',
      number: 5,
      title: 'Die て-Form',
      subtitle: 'Das Schweizer Taschenmesser',
      level: 'N5',
      intro: 'Wenn es eine einzige Verbform gibt, die du unbedingt beherrschen solltest, dann ist es die て-Form. Sie ist der Grundbaustein für dutzende weiterführende Konstruktionen: Bitten, laufende Handlungen, Erlaubnis, Verbote, Aufzählungen, Ursachen und noch vieles mehr. Die Bildung ist anfangs etwas hakelig, weil sie bei う-Verben einem Lautmuster folgt — aber einmal drin, sitzt sie. Und dann öffnet sie dir Tür um Tür zu neuen Ausdrucksmöglichkeiten.',
      sections: [
        {
          heading: 'Bildung: る-Verben (Vokalstamm)',
          text: 'Bei <strong>る-Verben</strong> (ichidan / Gruppe 2) ist es denkbar simpel: る abschneiden, て dranhängen. Diese Verben enden immer auf -iru oder -eru (aber Achtung: nicht alles, was auf -iru/-eru endet, ist ein る-Verb — manche sind う-Verben in Verkleidung, z.B. 帰る, 走る, 切る). Im Zweifelsfall hilft ein Wörterbuch.',
          examples: [
            { jp: '食べる → 食べて', romaji: 'taberu → tabete', de: 'essen' },
            { jp: '見る → 見て', romaji: 'miru → mite', de: 'sehen' },
            { jp: '起きる → 起きて', romaji: 'okiru → okite', de: 'aufstehen' },
          ]
        },
        {
          heading: 'Bildung: う-Verben (Konsonantenstamm)',
          text: 'Bei <strong>う-Verben</strong> (godan / Gruppe 1) ändert sich die Endung nach einem Lautmuster. Es gibt fünf Gruppen, die man sich am besten als Eselsbrücken merkt. Das Muster basiert darauf, welcher Konsonant vor dem う steht — und das bestimmt, ob der て-Laut zu って, んで, いて oder して wird.',
          examples: [
            { jp: 'う・つ・る → って', romaji: '(u/tsu/ru → tte)', de: '買う→買って, 待つ→待って, 帰る→帰って' },
            { jp: 'む・ぶ・ぬ → んで', romaji: '(mu/bu/nu → nde)', de: '飲む→飲んで, 遊ぶ→遊んで, 死ぬ→死んで' },
            { jp: 'く → いて', romaji: '(ku → ite)', de: '書く→書いて, 聞く→聞いて' },
          ],
          tip: 'Ausnahme: 行く (iku) wird zu 行って (itte), nicht 行いて. Das ist die einzige Ausnahme in dieser Kategorie — und sie kommt so oft vor, dass man sie automatisch lernt.'
        },
        {
          heading: 'Unregelmäßige Verben',
          text: 'Japanisch hat nur <strong>zwei wirklich unregelmäßige Verben</strong> — する (machen) und 来る (kommen). Deren て-Form muss man einfach auswendig lernen, aber das sind nur zwei Wörter:',
          examples: [
            { jp: 'する → して', romaji: 'suru → shite', de: 'machen' },
            { jp: '来る → 来て（きて）', romaji: 'kuru → kite', de: 'kommen' },
            { jp: '勉強する → 勉強して', romaji: 'benkyō suru → benkyō shite', de: 'lernen (する-Verb → して)' },
          ]
        },
        {
          heading: 'Was man alles damit machen kann',
          text: 'Hier wird es richtig spannend — die て-Form ist das Fundament für eine ganze Reihe wichtiger Konstruktionen. Deswegen heißt sie „Schweizer Taschenmesser": Ein Werkzeug, viele Funktionen. Hier die wichtigsten Verwendungen, die dir auf N5-Niveau schon begegnen werden:',
          examples: [
            { jp: '窓を開けてください。', romaji: 'Mado o akete kudasai.', de: 'Bitte öffne das Fenster. (Bitte: て + ください)' },
            { jp: '今、食べています。', romaji: 'Ima, tabete imasu.', de: 'Ich esse gerade. (Verlaufsform: て + いる)' },
            { jp: '写真を撮ってもいいですか。', romaji: 'Shashin o totte mo ii desu ka.', de: 'Darf ich ein Foto machen? (Erlaubnis: て + もいい)' },
          ]
        },
        {
          heading: 'Weitere て-Konstruktionen',
          text: 'Über die Grundverwendungen hinaus gibt es noch weitere wichtige Muster, die auf der て-Form aufbauen. Diese wirst du im Laufe von N5 und N4 alle kennenlernen:',
          examples: [
            { jp: '傘を持っていきます。', romaji: 'Kasa o motte ikimasu.', de: 'Ich nehme einen Schirm mit. (て + いく = und dann losgehen)' },
            { jp: '友達が手伝ってくれました。', romaji: 'Tomodachi ga tetsudatte kuremashita.', de: 'Mein Freund hat mir geholfen. (て + くれる = als Gefallen für mich)' },
            { jp: '食べてみたい。', romaji: 'Tabete mitai.', de: 'Ich möchte es mal probieren. (て + みる = ausprobieren)' },
          ],
          tip: 'Die て-Form ist wie das Alphabet: Sie ist an sich keine Aussage, aber ohne sie kannst du fast nichts schreiben. Investiere die Zeit, die Bildungsregeln zu verinnerlichen — es zahlt sich hundertfach aus.'
        }
      ]
    },

    // ===================== LEKTION 6 =====================
    {
      id: 'lesson-6',
      number: 6,
      title: 'Vergangenheit mit た',
      subtitle: 'Was gestern war',
      level: 'N5',
      intro: 'Die Vergangenheit im Japanischen ist erstaunlich unkompliziert — vor allem, wenn du die て-Form aus Lektion 5 schon kennst. Denn die た-Form folgt exakt dem gleichen Lautmuster. Einfach て durch た ersetzen (und で durch だ), fertig. Das bedeutet: Wer die て-Form kann, bekommt die Vergangenheit quasi geschenkt. Und das Beste: Japanisch unterscheidet nicht zwischen Präteritum und Perfekt — た deckt beides ab.',
      sections: [
        {
          heading: 'た-Form = て-Form, nur mit た',
          text: 'Die Bildung der た-Form folgt <strong>denselben Regeln</strong> wie die て-Form. Du tauschst einfach て gegen た und で gegen だ. Alle Gruppen (る-Verben, う-Verben, unregelmäßige) funktionieren identisch. Wenn du also die て-Form schon beherrschst, bist du hier sofort zuhause:',
          examples: [
            { jp: '食べて → 食べた', romaji: 'tabete → tabeta', de: 'gegessen (る-Verb)' },
            { jp: '買って → 買った', romaji: 'katte → katta', de: 'gekauft (う→って→った)' },
            { jp: '飲んで → 飲んだ', romaji: 'nonde → nonda', de: 'getrunken (む→んで→んだ)' },
          ]
        },
        {
          heading: 'Höfliche Vergangenheit: ました / ませんでした',
          text: 'In der höflichen Sprache ist die Vergangenheit noch einfacher — du brauchst die た-Form hier gar nicht. Du nimmst einfach die ます-Form und wandelst sie um. Das funktioniert bei allen Verben gleich, ohne Ausnahme. Es gibt nur zwei Formen, die du brauchst:',
          examples: [
            { jp: '食べます → 食べました', romaji: 'tabemasu → tabemashita', de: 'habe gegessen (höflich)' },
            { jp: '行きます → 行きました', romaji: 'ikimasu → ikimashita', de: 'bin gegangen (höflich)' },
            { jp: '食べます → 食べませんでした', romaji: 'tabemasu → tabemasen deshita', de: 'habe nicht gegessen (höflich, verneint)' },
          ],
          tip: 'Die た-Form (Kurzform Vergangenheit) brauchst du trotzdem: in Nebensätzen, vor のに, から, と思う und vielen anderen Konstruktionen steht immer die Kurzform. Also: ました für den Hauptsatz, た für den Nebensatz.'
        },
        {
          heading: 'Adjektive in der Vergangenheit',
          text: 'Auch Adjektive können in die Vergangenheit gesetzt werden. Bei <strong>い-Adjektiven</strong> wird い zu かった (positiv) bzw. くなかった (negativ). Bei <strong>な-Adjektiven</strong> ändert sich das だ/です am Ende zu だった/でした. Das Adjektiv selbst bleibt unverändert.',
          examples: [
            { jp: '高い → 高かった', romaji: 'takai → takakatta', de: 'war teuer (い-Adj.: い → かった)' },
            { jp: '高い → 高くなかった', romaji: 'takai → takakunakatta', de: 'war nicht teuer (い → くなかった)' },
            { jp: 'おいしい → おいしかったです', romaji: 'oishii → oishikatta desu', de: 'war lecker (höflich)' },
          ]
        },
        {
          heading: 'Nomen in der Vergangenheit',
          text: 'Nomen mit です/だ folgen demselben Muster wie な-Adjektive. Das ist logisch, weil な-Adjektive sich ja sowieso wie Nomen verhalten. Die Formen sind also identisch:',
          examples: [
            { jp: '学生です → 学生でした', romaji: 'gakusei desu → gakusei deshita', de: 'war Student (höflich)' },
            { jp: '学生だ → 学生だった', romaji: 'gakusei da → gakusei datta', de: 'war Student (casual)' },
            { jp: '休みじゃなかったです。', romaji: 'Yasumi ja nakatta desu.', de: 'Es war kein freier Tag.' },
          ]
        },
        {
          heading: 'た-Form jenseits der Vergangenheit',
          text: 'Überraschenderweise wird die た-Form nicht nur für die Vergangenheit benutzt. Sie taucht auch in anderen Kontexten auf, die nichts mit „gestern" zu tun haben:',
          examples: [
            { jp: '雨が降ったら、行きません。', romaji: 'Ame ga futtara, ikimasen.', de: 'Wenn es regnet, gehe ich nicht. (た + ら = Konditional, Zukunft!)' },
            { jp: 'あ、あった！', romaji: 'A, atta!', de: 'Oh, da ist es! / Gefunden! (Entdeckung in der Gegenwart)' },
            { jp: '確か明日だったよね。', romaji: 'Tashika ashita datta yo ne.', de: 'Es war doch morgen, oder? (Rückversicherung über etwas Zukünftiges)' }
          ],
          tip: 'Wenn du die て-Form draufhast, ist die た-Form geschenkt — die Bildung ist identisch, nur der letzte Laut ändert sich. Und die た-Form ist genauso vielseitig wie die て-Form: Sie ist der Schlüssel zu Konditionalen (たら), Erfahrungen (たことがある) und vielem mehr.'
        }
      ]
    },

    // ===================== LEKTION 7 =====================
    {
      id: 'lesson-7',
      number: 7,
      title: 'Verneinung',
      subtitle: 'Nein sagen auf Japanisch',
      level: 'N5',
      intro: 'Im Japanischen verneint man am Satzende — und je nachdem, ob es ein Verb, ein Adjektiv oder ein Nomen ist, funktioniert es etwas anders. Was alle Verneinungen gemeinsam haben: Sie enden irgendwie auf ない (oder seine höfliche Version ません). Wenn du dieses Muster einmal erkennst, wird dir die Verneinung nie wieder Kopfschmerzen bereiten. Hier bekommst du den kompletten Überblick — casual und höflich, Gegenwart und Vergangenheit.',
      sections: [
        {
          heading: 'Verben verneinen',
          text: 'In der <strong>höflichen Form</strong> wird ます einfach zu ません — das gilt für alle Verben ohne Ausnahme. In der <strong>Kurzform</strong> (casual) wird die Endung zu ない, aber die Bildung hängt vom Verbtyp ab. Bei る-Verben: る → ない. Bei う-Verben: Die letzte Silbe wechselt in die あ-Reihe und dann kommt ない dran (z.B. 行く → 行かない, 飲む → 飲まない, 話す → 話さない).',
          examples: [
            { jp: '食べます → 食べません', romaji: 'tabemasu → tabemasen', de: 'esse nicht (höflich)' },
            { jp: '食べる → 食べない', romaji: 'taberu → tabenai', de: 'esse nicht (casual, る-Verb: る → ない)' },
            { jp: '行く → 行かない', romaji: 'iku → ikanai', de: 'gehe nicht (casual, く → かない)' },
          ],
          tip: 'Zwei Sonderfälle: ある (existieren) wird zu ない (nicht あらない!) — das ist die einzige Ausnahme bei う-Verben. Und する/来る: する → しない, 来る → 来ない (こない).'
        },
        {
          heading: 'い-Adjektive verneinen',
          text: 'Bei い-Adjektiven wird い durch <strong>くない</strong> ersetzt. Da ない selbst ein い-Adjektiv ist, kannst du es weiter konjugieren: くなかった (war nicht), くなくて (nicht und...). Das System ist erfreulich regelmäßig — mit einer berühmten Ausnahme.',
          examples: [
            { jp: '高い → 高くない', romaji: 'takai → takakunai', de: 'nicht teuer' },
            { jp: '暑い → 暑くないです', romaji: 'atsui → atsukunai desu', de: 'nicht heiß (höflich)' },
            { jp: 'おいしい → おいしくなかった', romaji: 'oishii → oishikunakatta', de: 'war nicht lecker (Vergangenheit)' },
          ],
          tip: 'Sonderfall: いい (gut) wird zu よくない, NICHT いくない! Das liegt daran, dass いい historisch von よい abstammt. Alle Konjugationen von いい basieren auf よ-: よくない, よかった, よくなかった.'
        },
        {
          heading: 'な-Adjektive & Nomen verneinen',
          text: 'な-Adjektive und Nomen werden <strong>identisch</strong> verneint — logisch, weil な-Adjektive sich ja wie Nomen verhalten. Die Verneinung läuft über じゃない (casual) bzw. じゃありません (höflich). Das じゃ ist eine Zusammenziehung von では, und in sehr formellen Kontexten hört man auch ではありません.',
          examples: [
            { jp: '静かだ → 静かじゃない', romaji: 'shizuka da → shizuka ja nai', de: 'nicht ruhig (casual)' },
            { jp: '静かです → 静かじゃありません', romaji: 'shizuka desu → shizuka ja arimasen', de: 'nicht ruhig (höflich)' },
            { jp: '学生です → 学生じゃありません', romaji: 'gakusei desu → gakusei ja arimasen', de: 'bin kein Student (höflich)' },
          ],
          tip: 'ではない ist die formellere/schriftliche Variante, じゃない die lässige/gesprochene — beide bedeuten dasselbe. In Aufsätzen und formellen Reden: ではありません. Im Gespräch mit Freunden: じゃない.'
        },
        {
          heading: 'Noch nicht: まだ～ていない',
          text: '„Noch nicht" wird mit まだ + て-Form + いない/いません ausgedrückt. Das ist eine Kombination aus dem Adverb まだ (noch) und der ている-Konstruktion (resultierender Zustand) in der Verneinung. Es drückt aus, dass eine erwartete Handlung bisher nicht stattgefunden hat.',
          examples: [
            { jp: 'まだ食べていません。', romaji: 'Mada tabete imasen.', de: 'Ich habe noch nicht gegessen. (höflich)' },
            { jp: 'まだ決めていない。', romaji: 'Mada kimete inai.', de: 'Ich habe mich noch nicht entschieden. (casual)' },
            { jp: '宿題はまだやっていません。', romaji: 'Shukudai wa mada yatte imasen.', de: 'Die Hausaufgaben habe ich noch nicht gemacht.' },
          ],
          tip: 'Verwechsle まだ～ていない (noch nicht getan) nicht mit もう～ない (nicht mehr). もう食べない = ich esse nicht mehr / ich werde nicht mehr essen. まだ食べていない = ich habe noch nicht gegessen.'
        },
        {
          heading: 'Verneinung als Vorschlag: ～ませんか',
          text: 'Eine elegante Verwendung der Verneinung: ～ませんか ist eine <strong>höfliche Einladung</strong>. Wörtlich fragst du „Tun Sie es etwa nicht?", aber gemeint ist „Wollen wir nicht...?" oder „Möchten Sie nicht...?". Es klingt einladender und höflicher als die direkte Frage.',
          examples: [
            { jp: '一緒に食べませんか。', romaji: 'Issho ni tabemasen ka.', de: 'Wollen wir nicht zusammen essen?' },
            { jp: '映画を見ませんか。', romaji: 'Eiga o mimasen ka.', de: 'Sollen wir einen Film schauen?' },
            { jp: 'お茶を飲みませんか。', romaji: 'Ocha o nomimasen ka.', de: 'Möchten Sie eine Tasse Tee trinken?' }
          ]
        }
      ]
    },

    // ===================== LEKTION 8 =====================
    {
      id: 'lesson-8',
      number: 8,
      title: 'たい, ほしい, できる',
      subtitle: 'Wünsche und Fähigkeiten',
      level: 'N5/N4',
      intro: '„Ich will Sushi essen!", „Ich hätte gern einen Kaffee", „Ich kann Japanisch sprechen" — diese drei Ausdrücke decken einen riesigen Teil des Alltags ab. Im Japanischen gibt es für Wünsche und Fähigkeiten eigene grammatische Konstruktionen, die sich von den deutschen „wollen", „möchten" und „können" deutlich unterscheiden. Besonders wichtig: Im Japanischen spricht man nur über die eigenen Wünsche direkt — die Wünsche anderer Leute auszusprechen ist kulturell heikel.',
      sections: [
        {
          heading: 'たい — „Ich will (etwas tun)"',
          text: 'たい wird an den <strong>Verbstamm</strong> (ます-Stamm) gehängt und drückt den eigenen Wunsch aus, eine Handlung auszuführen. Nach der Bildung verhält sich das Wort wie ein い-Adjektiv — das heißt, du kannst es konjugieren: たくない (will nicht), たかった (wollte), たくなかった (wollte nicht). Beachte auch: Das Objekt kann sowohl mit を als auch mit が markiert werden — が betont den Wunsch stärker.',
          examples: [
            { jp: '食べたい。', romaji: 'Tabetai.', de: 'Ich will essen.' },
            { jp: '日本に行きたいです。', romaji: 'Nihon ni ikitai desu.', de: 'Ich möchte nach Japan fahren. (höflich)' },
            { jp: '何が飲みたいですか。', romaji: 'Nani ga nomitai desu ka.', de: 'Was möchtest du trinken?' },
          ],
          tip: 'Wichtige Kulturnotiz: たい benutzt man nur für die <strong>eigenen Wünsche</strong> oder in direkten Fragen an den Gesprächspartner. Über die Wünsche dritter Personen sagt man たがっている (er/sie zeigt den Wunsch zu...) oder umschreibt mit ようだ/らしい. Direkt zu sagen „Er will..." gilt als anmaßend, weil man nicht in den Kopf anderer Leute schauen kann.'
        },
        {
          heading: 'ほしい — „Ich hätte gern (ein Ding)"',
          text: 'Während たい für Handlungen (essen wollen, gehen wollen) steht, drückt ほしい aus, dass man ein <strong>konkretes Objekt haben möchte</strong>. Es ist ein い-Adjektiv und das gewünschte Objekt wird mit が markiert (nicht mit を!). Wie たい gilt auch ほしい primär für die eigenen Wünsche.',
          examples: [
            { jp: '新しい車がほしい。', romaji: 'Atarashii kuruma ga hoshii.', de: 'Ich hätte gern ein neues Auto.' },
            { jp: '何がほしいですか。', romaji: 'Nani ga hoshii desu ka.', de: 'Was hättest du gern?' },
            { jp: '時間がほしかった。', romaji: 'Jikan ga hoshikatta.', de: 'Ich hätte gern (mehr) Zeit gehabt.' },
          ],
          tip: 'Wie bei たい gilt auch bei ほしい: Benutze es nicht, um zu beschreiben, was ANDERE wollen. Für dritte Personen sagt man ほしがっている (er/sie zeigt den Wunsch nach...). „Er will ein Auto" = 彼は車をほしがっている, nicht 彼は車がほしい.'
        },
        {
          heading: 'てほしい — „Ich will, dass jemand..."',
          text: 'Wenn du willst, dass <strong>jemand anders etwas tut</strong>, verbindest du die て-Form mit ほしい. Die Person, von der du es erwartest, wird mit に markiert. Diese Konstruktion ist etwas direkter als eine Bitte und drückt einen echten Wunsch aus — sie ist weicher als ein Befehl, aber stärker als eine bloße Frage.',
          examples: [
            { jp: '来てほしい。', romaji: 'Kite hoshii.', de: 'Ich will, dass du kommst.' },
            { jp: '先生に説明してほしいです。', romaji: 'Sensei ni setsumei shite hoshii desu.', de: 'Ich möchte, dass der Lehrer es erklärt.' },
            { jp: '静かにしてほしい。', romaji: 'Shizuka ni shite hoshii.', de: 'Ich will, dass du still bist.' },
          ]
        },
        {
          heading: 'できる — „Ich kann"',
          text: 'できる bedeutet „können / möglich sein" und ist extrem vielseitig. Es gibt zwei Hauptverwendungen: Mit einem <strong>Nomen + が</strong> (Fähigkeit direkt benennen) oder mit <strong>Verb + ことが</strong> (eine Handlung als „Können" ausdrücken). できる selbst ist ein る-Verb und wird ganz normal konjugiert: できます (höflich), できない (kann nicht), できた (konnte).',
          examples: [
            { jp: '日本語ができます。', romaji: 'Nihongo ga dekimasu.', de: 'Ich kann Japanisch. (Nomen + が + できる)' },
            { jp: '泳ぐことができます。', romaji: 'Oyogu koto ga dekimasu.', de: 'Ich kann schwimmen. (Verb + こと + が + できる)' },
            { jp: '料理ができません。', romaji: 'Ryōri ga dekimasen.', de: 'Ich kann nicht kochen.' },
          ],
          tip: 'Neben ことができる gibt es auch die <strong>Potentialform</strong> (食べる → 食べられる, 読む → 読める). Die ist kürzer und wird im Alltag häufiger benutzt — sie kommt in Lektion 14 ausführlich dran. Für den Anfang ist できる der sicherste Weg.'
        }
      ]
    },

    // ===================== LEKTION 9 =====================
    {
      id: 'lesson-9',
      number: 9,
      title: 'から, ので, けど, のに',
      subtitle: 'Sätze verbinden wie ein Profi',
      level: 'N5/N4',
      intro: 'Einzelne Sätze sind gut — aber erst wenn du sie verbinden kannst, klingt dein Japanisch wirklich natürlich und fließend. Im Japanischen stehen die Verknüpfungswörter meistens <em>zwischen</em> den beiden Satzteilen (nicht am Anfang wie „weil" im Deutschen). Hier lernst du die vier wichtigsten Verknüpfungen für Gründe und Gegensätze — und ihre feinen, aber wichtigen Nuancen.',
      sections: [
        {
          heading: 'から — „Weil" (direkt und persönlich)',
          text: 'から ist der direkteste Weg, einen <strong>Grund</strong> anzugeben. Es steht nach dem Grund-Satz (in Kurzform oder ます-Form) und leitet die Folge ein. から wirkt neutral bis leicht bestimmt — der Sprecher steht hinter seiner Begründung. Es passt in die meisten Alltagssituationen und ist der Standard für Begründungen aller Art.',
          examples: [
            { jp: '暑いから、窓を開けました。', romaji: 'Atsui kara, mado o akemashita.', de: 'Weil es heiß ist, habe ich das Fenster geöffnet.' },
            { jp: '明日テストがあるから、今日勉強します。', romaji: 'Ashita tesuto ga aru kara, kyō benkyō shimasu.', de: 'Weil morgen ein Test ist, lerne ich heute.' },
            { jp: 'おなかがすいたから、何か食べよう。', romaji: 'Onaka ga suita kara, nanika tabeyō.', de: 'Ich hab Hunger, also lass uns was essen.' },
          ]
        },
        {
          heading: 'ので — „Weil" (sanft und objektiv)',
          text: 'ので drückt denselben Grund aus, klingt aber <strong>weicher und höflicher</strong>. Es impliziert, dass der Zusammenhang für den Gesprächspartner objektiv nachvollziehbar ist — du erklärst nicht deine persönliche Meinung, sondern eine allgemein verständliche Sachlage. Wichtig: Vor ので steht immer die Kurzform. Bei な-Adjektiven und Nomen wird だ zu な (静か<strong>な</strong>ので, 学生<strong>な</strong>ので).',
          examples: [
            { jp: '雨が降っているので、傘を持っていきます。', romaji: 'Ame ga futte iru node, kasa o motte ikimasu.', de: 'Da es regnet, nehme ich einen Schirm mit.' },
            { jp: '電車が遅れたので、遅刻しました。', romaji: 'Densha ga okureta node, chikoku shimashita.', de: 'Da der Zug Verspätung hatte, kam ich zu spät.' },
            { jp: '明日は休みなので、ゆっくりします。', romaji: 'Ashita wa yasumi na node, yukkuri shimasu.', de: 'Da morgen frei ist, mache ich es ruhig.' },
          ],
          tip: 'Faustregel: から klingt wie „weil ICH finde..." (subjektiv, bestimmt), ので klingt wie „da ja bekanntlich..." (objektiv, zurückhaltend). Im beruflichen Kontext und gegenüber Älteren ist ので die sicherere Wahl. In einer E-Mail an den Chef: lieber ので als から.'
        },
        {
          heading: 'けど / けれど — „Aber / Obwohl"',
          text: 'けど (casual) bzw. けれど(も) (förmlicher) verbindet zwei Sätze mit einem <strong>Gegensatz</strong>. Was viele nicht wissen: けど wird auch häufig als <strong>weiche Überleitung</strong> verwendet, ohne echten Gegensatz — fast wie „also..." oder „übrigens...". Es federt den zweiten Satzteil ab und macht ihn weniger direkt. Diese Funktion ist im Japanischen extrem verbreitet.',
          examples: [
            { jp: '日本語は難しいけど、楽しいです。', romaji: 'Nihongo wa muzukashii kedo, tanoshii desu.', de: 'Japanisch ist schwer, aber es macht Spaß.' },
            { jp: '買いたいけど、お金がない。', romaji: 'Kaitai kedo, okane ga nai.', de: 'Ich will es kaufen, aber ich hab kein Geld.' },
            { jp: 'すみませんが、ちょっといいですか。', romaji: 'Sumimasen ga, chotto ii desu ka.', de: 'Entschuldigung, hätten Sie kurz Zeit? (が als weiche Überleitung)' },
          ]
        },
        {
          heading: 'のに — „Obwohl" (mit Frust oder Bedauern)',
          text: 'のに drückt einen Gegensatz mit <strong>Enttäuschung, Frustration oder Überraschung</strong> aus. Es schwingt immer ein „und das ist ärgerlich / schade / unfair!" mit. Im Gegensatz zu けど, das neutral ist, transportiert のに eine emotionale Wertung. Vor のに steht die Kurzform; bei な-Adjektiven wird だ zu な, bei Nomen ebenfalls な.',
          examples: [
            { jp: '勉強したのに、テストに落ちた。', romaji: 'Benkyō shita noni, tesuto ni ochita.', de: 'Obwohl ich gelernt habe, bin ich durchgefallen!' },
            { jp: '約束したのに、来なかった。', romaji: 'Yakusoku shita noni, konakatta.', de: 'Obwohl er es versprochen hat, ist er nicht gekommen!' },
            { jp: 'せっかく作ったのに、誰も食べない。', romaji: 'Sekkaku tsukutta noni, daremo tabenai.', de: 'Ich hab mir die Mühe gemacht es zu kochen, und keiner isst es!' },
          ],
          tip: 'Kurzvergleich: けど = neutrales „aber" (ohne Wertung). のに = frustriertes „obwohl!" (immer mit emotionalem Unterton). Beide können am Satzende stehen und den zweiten Teil weglassen: 「頑張ったのに…」= „Obwohl ich mich so angestrengt habe..." (den Rest kann sich der Hörer denken).'
        }
      ]
    },

    // ===================== LEKTION 10 =====================
    {
      id: 'lesson-10',
      number: 10,
      title: 'たら, ば, と, なら',
      subtitle: 'Vier Wege „Wenn" zu sagen',
      level: 'N4',
      intro: 'Im Deutschen gibt es ein „wenn" und ein „falls" — im Japanischen gibt es gleich vier verschiedene Konditionalformen. Das klingt erstmal einschüchternd, aber jede Form hat ihren eigenen Charakter und ihre eigene „Persönlichkeit". Manche sind flexibel, manche spezialisiert. Hier lernst du die Grundregeln, wann welche Form passt — und bekommst am Ende einen Vergleich, der als Spickzettel taugt.',
      sections: [
        {
          heading: 'たら — Der Allrounder',
          text: 'たら ist die <strong>flexibelste und meistbenutzte</strong> Konditionalform. Sie bedeutet „wenn/falls X passiert (oder passiert ist), dann...". Die Bildung ist simpel: た-Form + ら. Das ist alles. たら kann für Vergangenes, Zukünftiges, Hypothetisches und Reales verwendet werden. Im Zweifelsfall ist たら fast immer eine akzeptable Wahl.',
          examples: [
            { jp: '雨が降ったら、家にいます。', romaji: 'Ame ga futtara, ie ni imasu.', de: 'Wenn es regnet, bleibe ich zuhause.' },
            { jp: '安かったら、買います。', romaji: 'Yasukattara, kaimasu.', de: 'Wenn es billig ist, kaufe ich es.' },
            { jp: '日本に行ったら、寿司を食べたい。', romaji: 'Nihon ni ittara, sushi o tabetai.', de: 'Wenn ich nach Japan fahre, will ich Sushi essen.' },
          ],
          tip: 'たら ist der sicherste Weg, „wenn" zu sagen. Wenn du unsicher bist, welche Form du nehmen sollst — nimm たら. Damit machst du in 95% der Fälle nichts falsch.'
        },
        {
          heading: 'ば — Die allgemeine Bedingung',
          text: 'ば drückt eine <strong>allgemeine, hypothetische Bedingung</strong> aus — „unter der Voraussetzung, dass...". Es klingt etwas formeller und abstrakter als たら. Die Bildung: Bei う-Verben wechselt die letzte Silbe in die え-Reihe + ば (行く→行けば, 飲む→飲めば). Bei る-Verben: る → れば. Bei い-Adjektiven: い → ければ. ば wird oft für Sprichwörter und allgemeine Weisheiten verwendet.',
          examples: [
            { jp: '食べれば', romaji: 'tabereba', de: 'wenn man isst (る → れば)' },
            { jp: '行けば', romaji: 'ikeba', de: 'wenn man geht (く → けば)' },
            { jp: '安ければ、買います。', romaji: 'Yasukereba, kaimasu.', de: 'Wenn es günstig ist, kaufe ich es. (い → ければ)' },
          ]
        },
        {
          heading: 'と — Die automatische Folge',
          text: 'と drückt eine <strong>natürliche, automatische, unvermeidliche Folge</strong> aus — „immer wenn X, dann zwangsläufig Y". Es wird für Naturgesetze, mechanische Abläufe, Wegbeschreibungen und Gewohnheiten benutzt. Vor と steht immer die Kurzform Gegenwart. Wichtig: Im Folgesatz darf <strong>kein Wille, keine Bitte, kein Vorschlag</strong> stehen — die Folge muss automatisch eintreten.',
          examples: [
            { jp: 'このボタンを押すと、ドアが開きます。', romaji: 'Kono botan o osu to, doa ga akimasu.', de: 'Wenn man diesen Knopf drückt, öffnet sich die Tür. (Mechanismus)' },
            { jp: '春になると、桜が咲きます。', romaji: 'Haru ni naru to, sakura ga sakimasu.', de: 'Wenn es Frühling wird, blühen die Kirschblüten. (Naturgesetz)' },
            { jp: '右に曲がると、駅があります。', romaji: 'Migi ni magaru to, eki ga arimasu.', de: 'Wenn du rechts abbiegst, ist da ein Bahnhof. (Wegbeschreibung)' },
          ],
          tip: 'と passt NICHT für Bitten, Vorschläge oder Wünsche. „Wenn es regnet, nimm einen Schirm mit" geht nicht mit と (Schirm-mitnehmen ist eine Willenshandlung). Dafür brauchst du たら. Merke: と = automatisch, keine Willenskontrolle im Ergebnis.'
        },
        {
          heading: 'なら — „Wenn wir von X reden..."',
          text: 'なら greift ein <strong>Thema oder eine Annahme</strong> auf, die jemand gerade erwähnt hat, und reagiert darauf. Es bedeutet so viel wie „wenn das der Fall ist", „was X angeht" oder „angenommen, dass...". なら hat eine besondere Eigenschaft: Die Reihenfolge von Bedingung und Ergebnis kann umgekehrt sein — das Ergebnis kann VOR der Bedingung zeitlich passieren.',
          examples: [
            { jp: '日本に行くなら、京都がおすすめです。', romaji: 'Nihon ni iku nara, Kyōto ga osusume desu.', de: 'Wenn du nach Japan fährst, empfehle ich Kyoto.' },
            { jp: '暇なら、手伝ってくれない？', romaji: 'Hima nara, tetsudatte kurenai?', de: 'Wenn du Zeit hast — könntest du mir helfen?' },
            { jp: 'それなら、大丈夫です。', romaji: 'Sore nara, daijōbu desu.', de: 'Wenn das so ist, dann ist es okay.' },
          ]
        },
        {
          heading: 'Kurzvergleich',
          text: '<table class="lesson-compare-table"><thead><tr><th>Form</th><th>Nuance</th><th>Passt für</th></tr></thead><tbody><tr><td><strong>たら</strong></td><td>Wenn X passiert / passiert ist...</td><td>Alles — sicherste Wahl, universell einsetzbar</td></tr><tr><td><strong>ば</strong></td><td>Unter der Bedingung, dass...</td><td>Allgemeine / hypothetische Bedingungen, Sprichwörter</td></tr><tr><td><strong>と</strong></td><td>Immer wenn... (automatisch)</td><td>Naturgesetze, Anleitungen, Gewohnheiten (kein Wille im Ergebnis!)</td></tr><tr><td><strong>なら</strong></td><td>Was X angeht... / Wenn das so ist...</td><td>Auf Gehörtes reagieren, Empfehlungen, Ratschläge</td></tr></tbody></table>',
          examples: [],
          tip: 'In der Praxis verschwimmen die Grenzen manchmal, und oft sind mehrere Formen möglich. Aber die Grundregel ist klar: たら für Alltagssituationen, ば für allgemeine Bedingungen, と für automatische Folgen, なら für Reaktionen auf Gesprochenes.'
        }
      ]
    },

    // ===================== LEKTION 11 =====================
    {
      id: 'lesson-11',
      number: 11,
      title: 'Passiv: ～られる',
      subtitle: 'Wenn dir etwas widerfährt',
      level: 'N4',
      intro: 'Im Japanischen wird das Passiv viel häufiger benutzt als im Deutschen — und oft drückt es aus, dass jemandem etwas angetan wurde. Während das Passiv im Deutschen eher als stilistisch schwach gilt und Lehrer gerne anstreichen, ist es im Japanischen ein völlig normaler, alltäglicher und sogar eleganter Ausdruck. Das sogenannte „Leidenspassiv" (迷惑の受身, meiwaku no ukemi) ist eine Spezialität, die es im Deutschen so nicht gibt — es erlaubt dem Sprecher, sich als Betroffener einer Handlung darzustellen. Diese Lektion zeigt dir alle drei Passivarten und wie du sie sicher anwendest.',
      sections: [
        {
          heading: 'Bildung',
          text: 'Das Passiv wird gebildet, indem man die <strong>ない-Form</strong> nimmt und ない durch れる ersetzt. Bei る-Verben wird る zu られる. Das Ergebnis ist immer ein る-Verb, das ganz normal konjugiert werden kann (られます, られない, られた usw.). Merke dir: Die Passivbildung folgt exakt demselben Stammwechsel wie die ない-Form — wenn du die beherrschst, ist das Passiv ein Kinderspiel.',
          examples: [
            { jp: '食べる → 食べられる', romaji: 'taberu → taberareru', de: 'gegessen werden (る-Verb)' },
            { jp: '読む → 読まれる', romaji: 'yomu → yomareru', de: 'gelesen werden (む → まれる)' },
            { jp: '言う → 言われる', romaji: 'iu → iwareru', de: 'gesagt werden / bekommen (う → われる)' },
          ],
          tip: 'Bei る-Verben sieht die Passivform identisch aus wie die Potentialform (食べられる = „gegessen werden" ODER „essen können"). Der Kontext macht immer klar, was gemeint ist. Im Alltag wird für die Potentialform oft ら weggelassen (食べれる), wodurch die Verwechslungsgefahr sinkt.'
        },
        {
          heading: 'Normales Passiv (直接受身)',
          text: 'Das normale Passiv funktioniert wie im Deutschen: Die Handlung wird aus der Perspektive des Empfängers beschrieben, und der Handelnde wird mit に markiert. Es wird besonders häufig in der Schriftsprache, in Nachrichten und in formellen Texten verwendet. Im Japanischen klingt das Passiv oft natürlicher als die aktive Form, wenn der Handelnde unwichtig oder unbekannt ist.',
          examples: [
            { jp: '先生に褒められました。', romaji: 'Sensei ni homeraremashita.', de: 'Ich wurde vom Lehrer gelobt.' },
            { jp: 'この本は多くの人に読まれています。', romaji: 'Kono hon wa ōku no hito ni yomarete imasu.', de: 'Dieses Buch wird von vielen Leuten gelesen.' },
            { jp: 'この曲は世界中で愛されている。', romaji: 'Kono kyoku wa sekaijū de aisarete iru.', de: 'Dieses Lied wird auf der ganzen Welt geliebt.' },
          ]
        },
        {
          heading: 'Das Leidenspassiv — Japans Spezialität (迷惑の受身)',
          text: 'Im Japanischen kann man das Passiv auch benutzen, um auszudrücken, dass einem etwas <strong>angetan wurde</strong> — selbst bei Verben, die im Deutschen kein Passiv haben. Es schwingt immer ein Gefühl von Ärger, Belästigung oder Unannehmlichkeit mit. Das Besondere: Selbst intransitive Verben (regnen, weinen, sterben) können im Leidenspassiv stehen. Der „Leidende" wird zum grammatischen Subjekt, obwohl er an der Handlung gar nicht direkt beteiligt ist.',
          examples: [
            { jp: '雨に降られた。', romaji: 'Ame ni furareta.', de: 'Es hat mich geregnet. (= Ich wurde vom Regen erwischt — nervig!)' },
            { jp: '電車で足を踏まれた。', romaji: 'Densha de ashi o fumareta.', de: 'Mir wurde im Zug auf den Fuß getreten.' },
            { jp: '隣の人にたばこを吸われた。', romaji: 'Tonari no hito ni tabako o suwareta.', de: 'Der Typ neben mir hat geraucht. (Und ich musste es ertragen!)' },
          ],
          tip: 'Das Leidenspassiv ist einer der Gründe, warum japanische Sätze manchmal seltsam wirken, wenn man sie wörtlich übersetzt. Es gibt dem Sprecher die Rolle des „Betroffenen" — und das ist im Japanischen völlig normal. Achte auf den emotionalen Unterton: Wenn jemand 降られた sagt statt einfach 降った, steckt immer ein „und das war blöd für mich!" dahinter.'
        },
        {
          heading: 'Passiv in der Praxis',
          text: 'Das Passiv begegnet dir im Alltag ständig — in Nachrichten, auf Schildern, in formellen Ankündigungen und in der Höflichkeitssprache. Viele feststehende Ausdrücke verwenden das Passiv, ohne dass man es als solches wahrnimmt. Auch in der gesprochenen Sprache wird das Passiv genutzt, um indirekt und höflich zu formulieren, anstatt jemanden direkt als Handelnden zu benennen.',
          examples: [
            { jp: 'このビルは1960年に建てられました。', romaji: 'Kono biru wa 1960-nen ni tateraremashita.', de: 'Dieses Gebäude wurde 1960 erbaut. (Typisch für Reiseführer)' },
            { jp: '会議は来週に延期されました。', romaji: 'Kaigi wa raishū ni enki saremashita.', de: 'Die Besprechung wurde auf nächste Woche verschoben.' },
            { jp: '日本語は世界中で学ばれている。', romaji: 'Nihongo wa sekaijū de manabarete iru.', de: 'Japanisch wird auf der ganzen Welt gelernt.' },
          ],
          tip: 'In Nachrichten (ニュース) wirst du das Passiv extrem häufig hören: 逮捕された (wurde verhaftet), 発表された (wurde bekanntgegeben), 開催される (wird veranstaltet). Wenn du Nachrichten verstehen willst, ist das Passiv unverzichtbar.'
        },
        {
          heading: 'Passiv als Respektform (尊敬語)',
          text: 'Die Passivform ～られる hat im Japanischen noch eine völlig andere Funktion: Sie kann <strong>Respekt gegenüber dem Handelnden</strong> ausdrücken und gehört damit zur Höflichkeitssprache (敬語, keigo). Die Form ist identisch mit dem Passiv — 来られる kann also „gekommen werden" (Passiv) ODER „kommen" (respektvoll) bedeuten. Entscheidend ist der Kontext: Wenn das Subjekt eine Person ist, der man Respekt entgegenbringt (Chef, Lehrer, Kunde), und die Handlung keinen leidenden Aspekt hat, handelt es sich um die Respektform. Diese Verwendung ist besonders im Geschäftsjapanisch allgegenwärtig.',
          examples: [
            { jp: '社長は何時に来られますか。', romaji: 'Shachō wa nanji ni koraremasu ka.', de: 'Um wie viel Uhr kommt der Firmenchef? (respektvoll)' },
            { jp: '先生はもう帰られました。', romaji: 'Sensei wa mō kaeraremashita.', de: 'Der Lehrer ist bereits nach Hause gegangen. (respektvoll)' },
            { jp: 'お客様がお料理を注文されました。', romaji: 'Okyakusama ga oryōri o chūmon saremashita.', de: 'Der Kunde hat das Essen bestellt. (respektvoll)' }
          ],
          tip: 'Wie unterscheidet man Passiv und Respektform? Achte auf das Subjekt: Wenn eine ranghöhere Person (先生, 社長, お客様) etwas aktiv tut, ist es die Respektform. Wenn jemand etwas erleidet oder betroffen ist, ist es Passiv. Bei Zweifelsfällen hilft der Kontext — 先生が来られた ist fast immer respektvoll gemeint, weil ein Lehrer wohl kaum „gekommen wird".'
        }
      ]
    },

    // ===================== LEKTION 12 =====================
    {
      id: 'lesson-12',
      number: 12,
      title: 'Kausativ: ～させる',
      subtitle: 'Jemanden etwas tun lassen',
      level: 'N4',
      intro: '„Mein Chef lässt mich Überstunden machen." „Die Mutter lässt das Kind Gemüse essen." Der Kausativ drückt aus, dass jemand eine Handlung veranlasst oder erlaubt — er ist das sprachliche Werkzeug für Machtstrukturen, Erlaubnisse und Hierarchien. Je nach Kontext kann das freundlich oder autoritär klingen, und genau diese Doppeldeutigkeit macht den Kausativ so interessant. Im Japanischen spielt Hierarchie eine große Rolle, und der Kausativ spiegelt das direkt wider: Wer lässt wen was tun? Diese Lektion zeigt dir Bildung, Bedeutung und die wichtigen Kombinationen.',
      sections: [
        {
          heading: 'Bildung',
          text: 'Wie beim Passiv: <strong>ない-Form</strong> nehmen, ない durch せる ersetzen. Bei る-Verben wird る zu させる. Das Ergebnis ist wieder ein る-Verb, das normal konjugiert wird (させます, させない, させた). Die Parallele zum Passiv ist kein Zufall — beide Formen teilen sich denselben Stammwechsel, was das Lernen erleichtert.',
          examples: [
            { jp: '食べる → 食べさせる', romaji: 'taberu → tabesaseru', de: 'essen lassen (る-Verb)' },
            { jp: '飲む → 飲ませる', romaji: 'nomu → nomaseru', de: 'trinken lassen (む → ませる)' },
            { jp: '行く → 行かせる', romaji: 'iku → ikaseru', de: 'gehen lassen (く → かせる)' },
          ],
          tip: 'Umgangssprachlich wird der Kausativ oft verkürzt: 行かせる → 行かす, 食べさせる → 食べさす. Diese Kurzformen hörst du besonders in Kansai (Osaka/Kyoto) sehr häufig.'
        },
        {
          heading: 'Zwang vs. Erlaubnis',
          text: 'Der Kausativ hat zwei Gesichter: <strong>Zwang</strong> (jemanden etwas tun lassen im Sinne von „anordnen, zwingen") und <strong>Erlaubnis</strong> (jemanden etwas tun lassen im Sinne von „zulassen, gewähren lassen"). Der Kontext entscheidet, welche Bedeutung gemeint ist. Bei transitiven Verben wird die veranlasste Person mit に markiert, bei intransitiven Verben mit を — das ist eine wichtige Unterscheidung.',
          examples: [
            { jp: '先生は学生にレポートを書かせた。', romaji: 'Sensei wa gakusei ni repōto o kakaseta.', de: 'Der Lehrer ließ die Studenten einen Bericht schreiben. (Zwang)' },
            { jp: '母は子供を公園で遊ばせた。', romaji: 'Haha wa kodomo o kōen de asobaseta.', de: 'Die Mutter ließ das Kind im Park spielen. (Erlaubnis)' },
            { jp: '部長は社員に残業させた。', romaji: 'Buchō wa shain ni zangyō saseta.', de: 'Der Abteilungsleiter ließ die Angestellten Überstunden machen. (Zwang)' },
          ],
          tip: 'Faustregeln für die Partikel: <strong>Transitives Verb</strong> → veranlasste Person mit に (先生が学生<strong>に</strong>書かせる). <strong>Intransitives Verb</strong> → veranlasste Person mit を (母が子供<strong>を</strong>遊ばせる). Warum? Bei transitiven Verben hat das Objekt schon を — zwei を im selben Satz klingt unnatürlich.'
        },
        {
          heading: 'させてください — Höflich um Erlaubnis bitten',
          text: 'Die Kombination Kausativ + てください ist eine <strong>sehr höfliche Art, um Erlaubnis zu bitten</strong>. Wörtlich: „Bitte lassen Sie mich..." Diese Form zeigt Bescheidenheit, weil du die Entscheidungsgewalt dem Gegenüber überlässt. Sie ist im Geschäftsleben und in formellen Situationen extrem verbreitet und gehört zum Standardrepertoire jedes Japanischlernenden.',
          examples: [
            { jp: '考えさせてください。', romaji: 'Kangaesasete kudasai.', de: 'Bitte lassen Sie mich darüber nachdenken.' },
            { jp: '自己紹介させてください。', romaji: 'Jiko shōkai sasete kudasai.', de: 'Erlauben Sie mir, mich vorzustellen.' },
            { jp: '少し休ませてください。', romaji: 'Sukoshi yasumasete kudasai.', de: 'Bitte lassen Sie mich kurz ausruhen.' },
          ],
          tip: 'させていただく ist die noch höflichere Variante und begegnet dir in formellen E-Mails und Geschäftsjapanisch ständig. 説明させていただきます = „Erlauben Sie, dass ich erkläre" (超höflich). Manche Japaner übertreiben es mit させていただく — in Comedyshows wird das gerne parodiert.'
        },
        {
          heading: 'Kausativ-Passiv: ～させられる',
          text: 'Die Kombination aus Kausativ und Passiv ergibt das <strong>Kausativ-Passiv</strong>: „gezwungen werden, etwas zu tun". Die Bildung ist logisch: Kausativform (させる) → Passiv davon (させられる). Das Kausativ-Passiv drückt aus, dass jemand gegen seinen Willen oder unter Druck zu einer Handlung veranlasst wurde — es ist die Perspektive des „Opfers" einer Anordnung.',
          examples: [
            { jp: '野菜を食べさせられた。', romaji: 'Yasai o tabesaserareta.', de: 'Ich wurde gezwungen, Gemüse zu essen. (Als Kind, typisch!)' },
            { jp: '毎日残業させられている。', romaji: 'Mainichi zangyō saserarete iru.', de: 'Ich werde jeden Tag zu Überstunden gezwungen.' },
            { jp: '長い時間待たされた。', romaji: 'Nagai jikan matasareta.', de: 'Ich wurde lange warten gelassen. (verkürzte Form: 待たせられた → 待たされた)' },
          ],
          tip: 'Das Kausativ-Passiv hat eine verkürzte Form bei う-Verben: 行かせられる → 行かされる, 飲ませられる → 飲まされる, 待たせられる → 待たされた. Die Kurzform ist im Alltag viel häufiger. Bei る-Verben gibt es keine Kurzform: 食べさせられる bleibt so.'
        }
      ]
    },

    // ===================== LEKTION 13 =====================
    {
      id: 'lesson-13',
      number: 13,
      title: 'Geben & Empfangen',
      subtitle: 'あげる, もらう, くれる',
      level: 'N4',
      intro: 'Im Deutschen sagt man einfach „geben". Im Japanischen kommt es darauf an, WER WEM gibt und aus WESSEN Perspektive man spricht — und das gilt nicht nur für physische Geschenke, sondern auch für Gefallen, Hilfe und Freundlichkeiten aller Art. Das klingt kompliziert, folgt aber einer klaren Logik, die tief in der japanischen Kultur verwurzelt ist: Wer gibt und wer empfängt, definiert die soziale Beziehung. Dieses System ist einer der Schlüssel zu natürlich klingendem Japanisch, und sobald du es verinnerlicht hast, wirst du es überall wiedererkennen.',
      sections: [
        {
          heading: 'あげる — Ich gebe (jemandem)',
          text: 'あげる benutzt man, wenn <strong>ich (oder meine Seite)</strong> jemandem etwas gibt. Die Bewegung geht <strong>von mir weg</strong>. Wichtig: あげる impliziert, dass der Gebende und der Empfänger ungefähr gleich gestellt sind oder der Empfänger untergeordnet ist. Gegenüber Höherstehenden wirkt あげる unhöflich — dafür gibt es die Spezialform さしあげる.',
          examples: [
            { jp: '友達にプレゼントをあげた。', romaji: 'Tomodachi ni purezento o ageta.', de: 'Ich habe meinem Freund ein Geschenk gegeben.' },
            { jp: '妹にチョコレートをあげました。', romaji: 'Imōto ni chokorēto o agemashita.', de: 'Ich habe meiner kleinen Schwester Schokolade gegeben.' },
            { jp: '犬にえさをあげる。', romaji: 'Inu ni esa o ageru.', de: 'Ich gebe dem Hund Futter.' },
          ],
          tip: 'Vorsicht: „Ich gebe DIR (dem Gesprächspartner)" mit あげる kann herablassend klingen. Besser ist oft, die Perspektive zu wechseln und ein anderes Verb zu wählen.'
        },
        {
          heading: 'くれる — Jemand gibt mir',
          text: 'くれる benutzt man, wenn <strong>jemand mir (oder meiner Seite)</strong> etwas gibt. Die Bewegung geht <strong>zu mir hin</strong>. Es drückt automatisch Dankbarkeit und Wertschätzung aus — allein durch die Verbwahl zeigt der Sprecher, dass er die Gabe als freundlich empfindet. くれる kann auch für Familienmitglieder und enge Freunde des Sprechers stehen (meine „In-Group").',
          examples: [
            { jp: '友達が本をくれた。', romaji: 'Tomodachi ga hon o kureta.', de: 'Mein Freund hat mir ein Buch gegeben. (Wie nett!)' },
            { jp: '母がお弁当を作ってくれた。', romaji: 'Haha ga obentō o tsukutte kureta.', de: 'Meine Mutter hat mir ein Bento gemacht. (Dankbarkeit!)' },
            { jp: '先輩がコーヒーをおごってくれた。', romaji: 'Senpai ga kōhī o ogotte kureta.', de: 'Mein Senpai hat mir einen Kaffee spendiert.' },
          ],
          tip: 'くれる drückt immer Dankbarkeit mit aus — der Geber hat freiwillig oder aus Freundlichkeit gehandelt. Es wird ausschließlich aus der Perspektive des Sprechers (oder seiner In-Group) verwendet: Jemand gibt MIR/UNS etwas.'
        },
        {
          heading: 'もらう — Ich bekomme (von jemandem)',
          text: 'もらう beschreibt dasselbe Ereignis wie くれる, aber <strong>aus der Perspektive des Empfängers</strong>. Wörtlich: „Ich empfange." Der Geber wird mit に oder から markiert. もらう betont, dass der Empfänger aktiv etwas bekommen hat — es klingt weniger nach „mir wurde gegeben" und mehr nach „ich habe mir geholt / bekommen / erbeten".',
          examples: [
            { jp: '友達に本をもらった。', romaji: 'Tomodachi ni hon o moratta.', de: 'Ich habe von meinem Freund ein Buch bekommen.' },
            { jp: '先生に日本語を教えてもらった。', romaji: 'Sensei ni nihongo o oshiete moratta.', de: 'Ich habe mir vom Lehrer Japanisch beibringen lassen.' },
            { jp: '彼から手紙をもらった。', romaji: 'Kare kara tegami o moratta.', de: 'Ich habe einen Brief von ihm bekommen.' },
          ],
          tip: 'Der feine Unterschied zu くれる: もらう impliziert, dass der Empfänger die Initiative ergriffen oder um den Gefallen gebeten hat. Bei くれる hat der Geber von sich aus gehandelt. 教えてくれた = er hat mir (von sich aus) erklärt. 教えてもらった = ich habe mir erklären lassen (ich habe darum gebeten).'
        },
        {
          heading: 'Als Gefallen: てあげる / てくれる / てもらう',
          text: 'In Kombination mit der て-Form drücken diese Verben aus, dass jemand etwas <strong>als Gefallen</strong> tut. Diese Konstruktion ist im Japanischen extrem häufig und macht den Unterschied zwischen einem neutralen Satz und einem, der soziale Beziehungen ausdrückt. てくれる ist dabei besonders wichtig — es ist die natürlichste Art, Dankbarkeit für eine Handlung auszudrücken.',
          examples: [
            { jp: '荷物を持ってあげた。', romaji: 'Nimotsu o motte ageta.', de: 'Ich habe (ihm/ihr) das Gepäck getragen. (Ich tue den Gefallen)' },
            { jp: '道を教えてくれた。', romaji: 'Michi o oshiete kureta.', de: 'Er/sie hat mir den Weg erklärt. (Jemand tut MIR den Gefallen)' },
            { jp: '友達に手伝ってもらった。', romaji: 'Tomodachi ni tetsudatte moratta.', de: 'Ich habe einen Freund gebeten mir zu helfen. (Ich empfange den Gefallen)' },
          ],
          tip: 'Faustregel: あげる = von mir weg, くれる = zu mir hin, もらう = ich empfange. Denk an Pfeile: あげる → (weg), くれる ← (her), もらう ← (empfangen). Im Alltag ist てくれる die häufigste Form — Japaner drücken damit ständig Dankbarkeit aus.'
        },
        {
          heading: 'Die höflichen Formen: さしあげる / くださる / いただく',
          text: 'Für formelle Situationen gibt es eine <strong>höfliche Stufe</strong> (敬語, keigo) der Geben-Empfangen-Verben. Sie folgen exakt derselben Logik, klingen aber respektvoller und werden im Geschäftsleben, gegenüber Älteren und gegenüber Kunden verwendet. さしあげる ersetzt あげる, くださる ersetzt くれる, und いただく ersetzt もらう. Besonders いただく und くださる begegnen dir im Alltag ständig.',
          examples: [
            { jp: '先生にお土産をさしあげた。', romaji: 'Sensei ni omiyage o sashiageta.', de: 'Ich habe dem Lehrer ein Souvenir gegeben. (bescheiden-höflich)' },
            { jp: '先生が本をくださった。', romaji: 'Sensei ga hon o kudasatta.', de: 'Der Lehrer hat mir ein Buch gegeben. (ehrerbietig)' },
            { jp: '先生に教えていただいた。', romaji: 'Sensei ni oshiete itadaita.', de: 'Ich durfte vom Lehrer lernen. (bescheiden-höflich)' },
          ],
          tip: 'Die berühmte Floskel ください (bitte geben Sie mir / bitte tun Sie) ist tatsächlich die て-Form + くださる → くださって → ください. Du benutzt also bereits keigo, ohne es zu wissen! Und いただきます vor dem Essen? Das kommt von いただく = „ich empfange bescheiden" — du bedankst dich demütig für das Essen.'
        }
      ]
    },

    // ===================== LEKTION 14 =====================
    {
      id: 'lesson-14',
      number: 14,
      title: 'Potentialform',
      subtitle: 'Was du alles kannst',
      level: 'N4',
      intro: 'In Lektion 8 hast du できる kennengelernt — den allgemeinen Weg, „können" auszudrücken. Aber für „können" gibt es eine elegantere und im Alltag viel häufigere Lösung: die Potentialform. Damit wird jedes Verb direkt zum „Können"-Verb — kurz, knackig, und im Alltag allgegenwärtig. Statt des umständlichen 泳ぐことができる sagst du einfach 泳げる. Die Potentialform ist eines der wichtigsten Werkzeuge für natürlich klingendes Japanisch und kommt in praktisch jedem Gespräch vor.',
      sections: [
        {
          heading: 'Bildung: る-Verben',
          text: 'Bei る-Verben: る abschneiden, <strong>られる</strong> anhängen. (Ja, das sieht aus wie Passiv — Kontext klärt es.) Die Potentialform von る-Verben ist immer eindeutig durch die Situation zu erkennen: Wenn es um Fähigkeit geht, ist es Potential; wenn es um etwas, das einem angetan wird, ist es Passiv.',
          examples: [
            { jp: '食べる → 食べられる', romaji: 'taberu → taberareru', de: 'essen können' },
            { jp: '見る → 見られる', romaji: 'miru → mirareru', de: 'sehen können' },
            { jp: '起きる → 起きられる', romaji: 'okiru → okirareru', de: 'aufstehen können' },
          ],
          tip: 'In der Umgangssprache lassen viele Japaner das ら weg: 食べれる statt 食べられる, 見れる statt 見られる. Das heißt „ら抜き言葉" (ra-nuki kotoba) und ist grammatisch nicht ganz korrekt, aber extrem verbreitet — besonders bei jüngeren Sprechern. In formellen Situationen und Prüfungen solltest du das ら aber beibehalten.'
        },
        {
          heading: 'Bildung: う-Verben',
          text: 'Bei う-Verben: Die letzte Silbe wechselt in die <strong>え-Reihe</strong> und る wird angehängt. Das Muster ist konsistent: く→ける, む→める, す→せる, ぐ→げる, ぶ→べる, つ→てる, う→える, ぬ→ねる, る→れる. Da die え-Reihe immer „offener" klingt, merkt man den Potentialformen ihren Charakter gut an.',
          examples: [
            { jp: '読む → 読める', romaji: 'yomu → yomeru', de: 'lesen können (む → める)' },
            { jp: '書く → 書ける', romaji: 'kaku → kakeru', de: 'schreiben können (く → ける)' },
            { jp: '話す → 話せる', romaji: 'hanasu → hanaseru', de: 'sprechen können (す → せる)' },
          ]
        },
        {
          heading: 'Unregelmäßige',
          text: 'Die zwei üblichen Verdächtigen haben wie immer ihre Sonderwege. する wird nicht zu „される" (das wäre Passiv!), sondern zu einem komplett anderen Wort: できる. Bei 来る ist die Potentialform identisch mit der Passivform — auch hier entscheidet der Kontext.',
          examples: [
            { jp: 'する → できる', romaji: 'suru → dekiru', de: 'machen → können (komplett anderes Wort!)' },
            { jp: '来る → 来られる（こられる）', romaji: 'kuru → korareru', de: 'kommen können' }
          ],
          tip: 'する → できる ist die einzige Potentialform, die ein völlig anderes Wort ist. Alle anderen sind vorhersagbar. Merke dir diese Ausnahme, dann bist du safe.'
        },
        {
          heading: 'が statt を — Die Partikelverschiebung',
          text: 'In der Potentialform wird das Objekt oft mit <strong>が statt を</strong> markiert. Das liegt daran, dass die Potentialform einen Zustand beschreibt („etwas ist mir möglich"), nicht eine aktive Handlung. Es ist kein strenges Gesetz — in der Umgangssprache hört man auch を — aber が ist die traditionelle und sicherere Wahl, besonders in Prüfungen und formellen Texten.',
          examples: [
            { jp: '漢字が読める。', romaji: 'Kanji ga yomeru.', de: 'Ich kann Kanji lesen. (が = traditionell korrekt)' },
            { jp: '漢字を読める。', romaji: 'Kanji o yomeru.', de: 'Ich kann Kanji lesen. (を = umgangssprachlich auch OK)' },
            { jp: '日本語が話せます。', romaji: 'Nihongo ga hanasemasu.', de: 'Ich kann Japanisch sprechen.' },
          ]
        },
        {
          heading: 'In der Praxis',
          text: 'Die Potentialform wird wie ein normales る-Verb konjugiert: 読める (können), 読めます (können, höflich), 読めない (nicht können), 読めた (konnte), 読めなかった (konnte nicht). Sie kommt in Alltagsgesprächen ständig vor — beim Einkaufen, im Restaurant, beim Reisen, bei Verabredungen. Wann immer du fragst „Kann ich...?" oder „Kann man hier...?", brauchst du die Potentialform.',
          examples: [
            { jp: '漢字が読めますか。', romaji: 'Kanji ga yomemasu ka.', de: 'Kannst du Kanji lesen?' },
            { jp: 'ここでは写真が撮れません。', romaji: 'Koko de wa shashin ga toremasen.', de: 'Hier kann man keine Fotos machen.' },
            { jp: '日本語が少し話せます。', romaji: 'Nihongo ga sukoshi hanasemasu.', de: 'Ich kann ein bisschen Japanisch sprechen.' },
          ],
          tip: 'Vergleich: ことができる vs. Potentialform — beide bedeuten „können", aber die Potentialform ist kürzer und natürlicher im gesprochenen Japanisch. 泳ぐことができる (formell, schriftlich) vs. 泳げる (kurz, alltäglich). Für den JLPT solltest du beide beherrschen.'
        }
      ]
    },

    // ===================== LEKTION 15 =====================
    {
      id: 'lesson-15',
      number: 15,
      title: 'ている — Mehr als Verlaufsform',
      subtitle: 'Was gerade passiert (und was schon passiert ist)',
      level: 'N4',
      intro: 'Du kennst ている vielleicht als „-ing" aus dem Englischen: 食べている = „ich esse gerade". Aber ている kann noch viel mehr — es beschreibt laufende Handlungen, resultierende Zustände, Gewohnheiten, Berufe und sogar Erfahrungen. Diese Vielseitigkeit macht ている zu einer der meistbenutzten Konstruktionen im Japanischen überhaupt. Wenn du natürlich klingen willst, musst du die verschiedenen Bedeutungen sicher unterscheiden können. Diese Lektion zeigt dir alle wichtigen Verwendungen mit vielen Beispielen.',
      sections: [
        {
          heading: 'Laufende Handlung (進行)',
          text: 'Die bekannteste Bedeutung: Etwas findet <strong>gerade jetzt statt</strong>. Wie das englische „-ing" oder das deutsche „gerade". Diese Verwendung ist intuitiv und der Einstiegspunkt für die meisten Lernenden. Beachte: In der Umgangssprache wird ている oft zu てる verkürzt (食べている → 食べてる).',
          examples: [
            { jp: '今、本を読んでいます。', romaji: 'Ima, hon o yonde imasu.', de: 'Ich lese gerade ein Buch.' },
            { jp: '雨が降っている。', romaji: 'Ame ga futte iru.', de: 'Es regnet (gerade).' },
            { jp: '電話で話しています。', romaji: 'Denwa de hanashite imasu.', de: 'Ich telefoniere gerade.' },
          ],
          tip: 'Die Verkürzung てる statt ている ist in der Umgangssprache Standard. 食べている → 食べてる, 読んでいる → 読んでる, している → してる. In der ます-Form: 食べています → 食べてます. Benutze die volle Form für formelle Situationen und Prüfungen.'
        },
        {
          heading: 'Resultierender Zustand (結果の状態)',
          text: 'Bei Verben, die einen <strong>Zustandswechsel</strong> beschreiben (öffnen, heiraten, ankommen, sterben, anziehen...), drückt ている den <strong>resultierenden Zustand</strong> aus — nicht die Handlung selbst. Das ist der wichtigste Unterschied zum Englischen „-ing" und der häufigste Stolperstein für Lernende. Die Handlung ist bereits abgeschlossen, und ている beschreibt, was danach ist.',
          examples: [
            { jp: '窓が開いている。', romaji: 'Mado ga aite iru.', de: 'Das Fenster ist offen. (nicht: öffnet sich gerade)' },
            { jp: '結婚しています。', romaji: 'Kekkon shite imasu.', de: 'Ich bin verheiratet. (nicht: ich heirate gerade)' },
            { jp: 'もう届いている。', romaji: 'Mō todoite iru.', de: 'Es ist schon angekommen. (Zustand: da)' },
          ],
          tip: 'Das ist der häufigste Stolperstein: 死んでいる heißt „ist tot" (Zustand), nicht „stirbt gerade". 座っている heißt „sitzt" (Zustand), nicht „setzt sich gerade hin". Ob ている eine Handlung oder einen Zustand beschreibt, hängt vom Verbtyp ab: <strong>Handlungsverben</strong> (essen, lesen, laufen) → laufende Handlung. <strong>Zustandswechselverben</strong> (ankommen, sterben, heiraten) → resultierender Zustand.'
        },
        {
          heading: 'Gewohnheit & Wiederholung (習慣)',
          text: 'ている kann auch eine <strong>regelmäßige Gewohnheit</strong> oder eine wiederkehrende Handlung ausdrücken. In diesem Fall geht es nicht darum, was gerade jetzt passiert, sondern was man regelmäßig tut. Zeitangaben wie 毎日 (jeden Tag), いつも (immer) oder 最近 (in letzter Zeit) signalisieren oft diese Bedeutung.',
          examples: [
            { jp: '毎朝ジョギングしています。', romaji: 'Maiasa jogingu shite imasu.', de: 'Ich jogge jeden Morgen. (Gewohnheit)' },
            { jp: 'あの店でいつも買い物している。', romaji: 'Ano mise de itsumo kaimono shite iru.', de: 'Ich kaufe immer in dem Laden ein.' },
            { jp: '最近、日本語を勉強している。', romaji: 'Saikin, nihongo o benkyō shite iru.', de: 'In letzter Zeit lerne ich Japanisch.' },
          ],
          tip: 'Unterscheide ている für Gewohnheit vs. einfache Gegenwart: 毎日走っている (ich laufe jeden Tag — betont die laufende Gewohnheit) vs. 毎日走る (ich laufe jeden Tag — allgemeine Aussage oder Vorhaben). ている macht die Gewohnheit lebendiger und betont, dass man es tatsächlich regelmäßig praktiziert.'
        },
        {
          heading: 'Beruf & Zugehörigkeit',
          text: 'Für Berufe, Wohnort und langfristige Zugehörigkeiten nutzt man ebenfalls ている. Hier beschreibt ている einen <strong>andauernden Lebensumstand</strong> — etwas, das nicht nur gerade jetzt, sondern über einen längeren Zeitraum gilt. Dies ist eine der natürlichsten Verwendungen von ている im Japanischen.',
          examples: [
            { jp: '大学で教えています。', romaji: 'Daigaku de oshiete imasu.', de: 'Ich unterrichte an der Uni. (= Das ist mein Job)' },
            { jp: '東京に住んでいます。', romaji: 'Tōkyō ni sunde imasu.', de: 'Ich wohne in Tokyo. (Dauerzustand)' },
            { jp: '日本の会社で働いている。', romaji: 'Nihon no kaisha de hataraite iru.', de: 'Ich arbeite bei einer japanischen Firma.' },
          ]
        },
        {
          heading: 'Erfahrung & Wissen (経験)',
          text: 'In Kombination mit bestimmten Verben kann ている auch ausdrücken, dass man etwas <strong>weiß oder kennt</strong>, weil man es erfahren oder gelernt hat. Das bekannteste Beispiel ist 知っている (wissen/kennen). Hier beschreibt ている den Zustand des „im Besitz von Wissen sein". Beachte: Die Verneinung ist 知らない (nicht 知っていない!) — eine der bekanntesten Ausnahmen im Japanischen.',
          examples: [
            { jp: 'その話は知っています。', romaji: 'Sono hanashi wa shitte imasu.', de: 'Diese Geschichte kenne ich.' },
            { jp: '田中さんを知っていますか。', romaji: 'Tanaka-san o shitte imasu ka.', de: 'Kennen Sie Herrn Tanaka?' },
            { jp: 'いいえ、知りません。', romaji: 'Iie, shirimasen.', de: 'Nein, ich kenne ihn nicht. (NICHT: 知っていません)' },
          ],
          tip: 'Die Verneinung von 知っている ist 知らない — niemals 知っていない. Das ist eine der wenigen festen Ausnahmen und wird in jedem JLPT-Test abgefragt. Auch 持っている (haben/besitzen) verhält sich ähnlich als Zustand: 車を持っている = „Ich habe ein Auto" (Dauerzustand des Besitzens).'
        }
      ]
    },

    // ===================== LEKTION 16 =====================
    {
      id: 'lesson-16',
      number: 16,
      title: 'そう, よう, らしい',
      subtitle: 'Wie die Dinge scheinen',
      level: 'N4/N3',
      intro: '„Es sieht so aus als ob...", „Anscheinend...", „Es scheint, dass..." — im Japanischen gibt es gleich mehrere Wege, Vermutungen und Einschätzungen auszudrücken, und jeder hat seine eigene, feine Nuance. Während man im Deutschen oft einfach „scheint" sagt und fertig, unterscheidet das Japanische sehr genau, <em>woher</em> deine Einschätzung kommt: Siehst du es mit eigenen Augen? Ziehst du eine logische Schlussfolgerung? Oder hast du es von jemandem gehört? Diese Unterscheidung mag anfangs pedantisch wirken, aber sie macht die Sprache unglaublich präzise — und sobald man das System einmal verstanden hat, wird es zur zweiten Natur.',
      sections: [
        {
          heading: '～そう — „Sieht aus als ob" (eigene Beobachtung)',
          text: 'そう hängt man an den <strong>Stamm</strong> von Verben und i-Adjektiven (also die Form ohne い bzw. ohne ます). Es drückt aus, was du <strong>mit eigenen Augen siehst oder unmittelbar erwartest</strong> — du stehst direkt vor der Situation und machst eine Einschätzung basierend auf dem visuellen Eindruck. Bei na-Adjektiven fällt das な weg und そう wird direkt angehängt. Wichtig ist: そう beschreibt den <em>Eindruck im Moment</em>, nicht eine überlegte Analyse.',
          examples: [
            { jp: '雨が降りそうです。', romaji: 'Ame ga furisō desu.', de: 'Es sieht nach Regen aus. (Ich sehe die dunklen Wolken.)' },
            { jp: 'このケーキはおいしそう！', romaji: 'Kono kēki wa oishisō!', de: 'Der Kuchen sieht lecker aus!' },
            { jp: '眠そうですね。', romaji: 'Nemusō desu ne.', de: 'Du siehst müde aus.' },
          ],
          tip: 'Aufpassen bei Sonderformen: いい wird zu よさそう (nicht いさそう!), und ない wird zu なさそう. Diese beiden Ausnahmen werden in der JLPT-Prüfung gerne abgefragt.'
        },
        {
          heading: 'Bildung von ～そう im Detail',
          text: 'Die Anschlussregeln für そう sind zum Glück recht systematisch. Bei <strong>Verben</strong> nimmst du den ます-Stamm: 降ります → 降り → 降りそう. Bei <strong>i-Adjektiven</strong> entfernst du das い: おいしい → おいし → おいしそう. Bei <strong>na-Adjektiven</strong> entfernst du das な: 元気な → 元気 → 元気そう. そう selbst verhält sich dann wie ein na-Adjektiv: du kannst そうな + Nomen sagen (おいしそうなケーキ) oder そうに + Verb (楽しそうに笑う).',
          examples: [
            { jp: 'おいしそうなラーメンを見つけた。', romaji: 'Oishisō na rāmen o mitsuketa.', de: 'Ich habe lecker aussehende Ramen gefunden. (そうな + Nomen)' },
            { jp: '子供たちが楽しそうに遊んでいる。', romaji: 'Kodomotachi ga tanoshisō ni asonde iru.', de: 'Die Kinder spielen fröhlich aussehend. (そうに + Verb)' },
            { jp: '彼は暇そうにしている。', romaji: 'Kare wa himasō ni shite iru.', de: 'Er sieht aus, als hätte er nichts zu tun.' }
          ]
        },
        {
          heading: '～ようだ / ～みたい — „Es scheint" (Schlussfolgerung)',
          text: 'ようだ (formell) und みたい (casual) drücken eine <strong>Schlussfolgerung</strong> aus, die auf Beobachtung, Nachdenken oder gesammelten Hinweisen basiert. Der Unterschied zu そう ist wichtig: Bei そう reagierst du spontan auf einen visuellen Eindruck, bei ようだ/みたい hast du Informationen zusammengetragen und ziehst daraus einen Schluss. ようだ folgt auf die Kurzform von Verben und Adjektiven, bei Nomen und na-Adjektiven steht の davor. みたい ist die umgangssprachliche Variante und funktioniert genauso — nur eben lockerer.',
          examples: [
            { jp: '彼は忙しいようです。', romaji: 'Kare wa isogashii yō desu.', de: 'Er scheint beschäftigt zu sein. (Ich schließe das aus verschiedenen Hinweisen.)' },
            { jp: '誰もいないみたい。', romaji: 'Daremo inai mitai.', de: 'Es scheint, als wäre niemand da.' },
            { jp: '電車が遅れているようだ。', romaji: 'Densha ga okurete iru yō da.', de: 'Der Zug scheint Verspätung zu haben.' },
          ],
          tip: 'ようだ kann auch für Vergleiche verwendet werden: 雪のように白い (weiß wie Schnee). In diesem Fall bedeutet es „wie" und nicht „es scheint" — der Kontext macht den Unterschied klar.'
        },
        {
          heading: '～らしい — „Angeblich" (Hörensagen)',
          text: 'らしい drückt aus, dass du etwas <strong>von jemandem gehört hast</strong>, es aus einer Quelle weißt oder es eine allgemein verbreitete Information ist — nicht aus eigener Beobachtung. Es folgt direkt auf die Kurzform von Verben und Adjektiven, bei Nomen steht kein だ davor (also direkt: 雨らしい, nicht 雨だらしい). Wenn jemand sagt „Xらしい", signalisiert er deutlich: „Ich war nicht dabei, aber so habe ich es gehört." Das schafft eine gewisse Distanz zur Information und macht klar, dass man nicht persönlich dafür bürgt.',
          examples: [
            { jp: '明日は雨らしい。', romaji: 'Ashita wa ame rashii.', de: 'Morgen soll es angeblich regnen.' },
            { jp: 'あの店はおいしいらしいですよ。', romaji: 'Ano mise wa oishii rashii desu yo.', de: 'Das Restaurant soll gut sein, habe ich gehört.' },
            { jp: '田中さんは来月結婚するらしい。', romaji: 'Tanaka-san wa raigetsu kekkon suru rashii.', de: 'Tanaka heiratet angeblich nächsten Monat.' },
          ]
        },
        {
          heading: 'らしい als „typisch für"',
          text: 'Es gibt noch eine zweite Bedeutung von らしい, die man kennen sollte: An Nomen gehängt bedeutet es „typisch für" oder „so wie man es erwartet". In diesem Fall ist es kein Hörensagen, sondern eine Bewertung, ob etwas dem Ideal oder der Erwartung entspricht. Der Kontext macht immer klar, welche Bedeutung gemeint ist.',
          examples: [
            { jp: '彼女は女性らしい人だ。', romaji: 'Kanojo wa josei rashii hito da.', de: 'Sie ist eine typisch weibliche Person. (= entspricht dem Bild)' },
            { jp: '今日は春らしい天気ですね。', romaji: 'Kyō wa haru rashii tenki desu ne.', de: 'Heute ist typisches Frühlingswetter, oder?' },
            { jp: '子供らしい発想だね。', romaji: 'Kodomo rashii hassō da ne.', de: 'Das ist eine typisch kindliche Idee.' }
          ],
          tip: '„彼は男らしい" (Er ist männlich/maskulin) vs. „彼は男だらしい" (Angeblich ist er ein Mann) — das だ macht hier den entscheidenden Unterschied!'
        },
        {
          heading: 'Kurzvergleich',
          text: '<table class="lesson-compare-table"><thead><tr><th>Form</th><th>Basis</th><th>Bedeutung</th><th>Beispiel-Situation</th></tr></thead><tbody><tr><td><strong>～そう</strong></td><td>Was ich sehe</td><td>Sieht aus als ob... / gleich wird...</td><td>Du siehst den dunklen Himmel</td></tr><tr><td><strong>～ようだ / みたい</strong></td><td>Was ich folgere</td><td>Es scheint, dass...</td><td>Du bemerkst nassen Boden, geschlossene Schirme</td></tr><tr><td><strong>～らしい</strong></td><td>Was ich gehört habe</td><td>Angeblich... / Ich habe gehört...</td><td>Ein Kollege hat dir gesagt, es hat geregnet</td></tr></tbody></table>',
          examples: []
        },
        {
          heading: 'Verwechslungsgefahr: そうだ (Hörensagen)',
          text: 'Achtung, es gibt noch ein <strong>zweites そうだ</strong>, das komplett anders funktioniert! Wenn そうだ an die <strong>Kurzform</strong> (nicht den Stamm) gehängt wird, bedeutet es „Ich habe gehört, dass..." — also Hörensagen, ähnlich wie らしい. Der Unterschied: 降り<strong>そう</strong> (sieht aus, als würde es regnen — Stamm + そう) vs. 降る<strong>そうだ</strong> (ich habe gehört, es regnet — Kurzform + そうだ). Die Verwechslung dieser beiden Formen ist einer der häufigsten Fehler auf N4-Niveau.',
          examples: [
            { jp: '明日は雨が降るそうです。', romaji: 'Ashita wa ame ga furu sō desu.', de: 'Ich habe gehört, dass es morgen regnet. (Hörensagen-そう)' },
            { jp: '明日は雨が降りそうです。', romaji: 'Ashita wa ame ga furisō desu.', de: 'Es sieht so aus, als würde es morgen regnen. (Anschein-そう)' },
            { jp: 'あの映画はおもしろいそうだ。', romaji: 'Ano eiga wa omoshiroi sō da.', de: 'Ich habe gehört, der Film ist interessant. (Kurzform + そうだ)' }
          ],
          tip: 'Eselsbrücke: Stamm + そう = „sieht so aus" (Augen). Kurzform + そうだ = „habe gehört" (Ohren). Augen brauchen weniger Information (nur den Stamm), Ohren brauchen den ganzen Satz (Kurzform).'
        }
      ]
    },

    // ===================== LEKTION 17 =====================
    {
      id: 'lesson-17',
      number: 17,
      title: 'Relative Nebensätze',
      subtitle: 'Sätze, die Nomen beschreiben',
      level: 'N4/N3',
      intro: 'Im Deutschen sagt man „Das Buch, <em>das</em> ich gestern gekauft habe". Im Japanischen gibt es kein Relativpronomen — weder „der" noch „die" noch „das" noch „welcher". Stattdessen stellt man den beschreibenden Nebensatz einfach VOR das Nomen, direkt und ohne Umschweife. Das klingt anfangs radikal, ist aber erstaunlich elegant und logisch, wenn man es einmal verinnerlicht hat. Relative Nebensätze sind einer der wichtigsten Bausteine für komplexere Sätze, und wer sie beherrscht, kann plötzlich viel differenzierter auf Japanisch formulieren.',
      sections: [
        {
          heading: 'Das Grundprinzip',
          text: 'Ein ganzer Satz kann im Japanischen ein Nomen beschreiben, indem er <strong>direkt davor gestellt</strong> wird. Kein „der/die/das", kein Komma, kein Relativpronomen — einfach Nebensatz + Nomen. Das Verb im Nebensatz steht dabei <strong>immer in der Kurzform</strong> (also 買った statt 買いました). Stell dir den Nebensatz wie ein langes Adjektiv vor: So wie 大きい犬 (großer Hund) funktioniert, funktioniert auch 昨日買った本 (gestern-gekauftes Buch).',
          examples: [
            { jp: '昨日買った本', romaji: 'kinō katta hon', de: 'das Buch, das ich gestern gekauft habe' },
            { jp: '日本語を話す人', romaji: 'nihongo o hanasu hito', de: 'eine Person, die Japanisch spricht' },
            { jp: '母が作ったケーキ', romaji: 'haha ga tsukutta kēki', de: 'der Kuchen, den meine Mutter gemacht hat' },
          ],
          tip: 'Denk daran: Im Japanischen steht die Beschreibung IMMER vor dem Nomen. Das gilt für einzelne Adjektive (大きい猫) genauso wie für ganze Nebensätze (昨日見つけた猫). Es ist dasselbe Prinzip!'
        },
        {
          heading: 'In ganzen Sätzen',
          text: 'Der relative Nebensatz + Nomen wird dann ganz normal als Teil des Hauptsatzes verwendet — als Subjekt, Objekt oder in jeder anderen Rolle, die ein Nomen einnehmen kann. Die Partikel (は、が、を、に usw.) kommen nach dem Nomen, genau wie bei jedem anderen Nomen auch. Das Schöne ist: Sobald man den Nebensatz als Block erkennt, zerfällt auch ein langer Satz in übersichtliche Teile.',
          examples: [
            { jp: '昨日買った本はおもしろかった。', romaji: 'Kinō katta hon wa omoshirokatta.', de: 'Das Buch, das ich gestern gekauft habe, war interessant.' },
            { jp: '駅の前にある店で食べましょう。', romaji: 'Eki no mae ni aru mise de tabemashō.', de: 'Lass uns in dem Laden essen, der vor dem Bahnhof ist.' },
            { jp: '私が住んでいる町は小さいです。', romaji: 'Watashi ga sunde iru machi wa chiisai desu.', de: 'Die Stadt, in der ich wohne, ist klein.' },
          ]
        },
        {
          heading: 'Verschiedene Rollen des Nomens',
          text: 'Ein besonderer Aspekt japanischer Relativsätze: Das Nomen, das beschrieben wird, kann <strong>jede beliebige Rolle</strong> im Nebensatz einnehmen — Subjekt, Objekt, Ort, Zeit, Begleitung usw. Im Deutschen braucht man dafür verschiedene Relativpronomen (der, den, dem, in dem, mit dem...), im Japanischen ändert sich nichts an der Konstruktion. Das macht es gleichzeitig einfacher und verwirrend: einfacher, weil die Form immer gleich ist; verwirrend, weil man aus dem Kontext erschließen muss, welche Rolle das Nomen spielt.',
          examples: [
            { jp: '田中さんが作った料理', romaji: 'Tanaka-san ga tsukutta ryōri', de: 'das Essen, das Tanaka gemacht hat (Nomen = Objekt im Nebensatz)' },
            { jp: '料理を作った人', romaji: 'ryōri o tsukutta hito', de: 'die Person, die das Essen gemacht hat (Nomen = Subjekt im Nebensatz)' },
            { jp: '友達と行ったレストラン', romaji: 'tomodachi to itta resutoran', de: 'das Restaurant, in das ich mit Freunden gegangen bin (Nomen = Ort)' },
          ]
        },
        {
          heading: 'Wichtige Regeln',
          text: '<ul class="lesson-rules"><li><strong>Kurzform vor dem Nomen:</strong> Im Nebensatz steht immer die Kurzform (食べた, nicht 食べました). Das ist nicht verhandelbar — selbst wenn der Hauptsatz in ます-Form steht.</li><li><strong>は wird zu が:</strong> Das Subjekt im Nebensatz wird mit が markiert, nicht mit は. Das Themenpartikel は gehört in den Hauptsatz, nicht in den Nebensatz.</li><li><strong>Verschachtelung möglich:</strong> Man kann mehrere Nebensätze stapeln — aber Vorsicht, das wird schnell unübersichtlich. In der Alltagssprache beschränkt man sich meist auf ein bis zwei Ebenen.</li><li><strong>こと und の:</strong> Mit ～たこと und ～ること kann man ganze Sätze zu Nomen machen: 日本に行ったこと = „die Tatsache, dass ich nach Japan gefahren bin".</li></ul>',
          examples: [
            { jp: '友達がくれた花はきれいだ。', romaji: 'Tomodachi ga kureta hana wa kirei da.', de: 'Die Blumen, die mir mein Freund gegeben hat, sind schön.' },
            { jp: '先週見た映画の名前を忘れた。', romaji: 'Senshū mita eiga no namae o wasureta.', de: 'Ich habe den Namen des Films vergessen, den ich letzte Woche gesehen habe.' },
            { jp: '日本に行ったことがありますか。', romaji: 'Nihon ni itta koto ga arimasu ka.', de: 'Warst du schon mal in Japan? (wörtl.: Gibt es die Tatsache, dass du nach Japan gingst?)' },
          ],
          tip: 'Tipp zum Lesen langer Sätze: Suche zuerst das Hauptnomen — alles davor ist der Nebensatz, der es beschreibt. Dann finde das Hauptverb am Satzende. Zwischen dem beschriebenen Nomen und dem Hauptverb steckt der Kern des Satzes.'
        },
        {
          heading: 'Häufige Muster im Alltag',
          text: 'Bestimmte Kombinationen aus Nebensatz + Nomen tauchen so häufig auf, dass sie fast wie feste Wendungen funktionieren. Es lohnt sich, diese Muster zu verinnerlichen, weil sie in Gesprächen und Texten ständig vorkommen. Besonders ～たことがある (Erfahrung), ～ているところ (gerade dabei sein) und ～たばかり (gerade erst) sind essentiell.',
          examples: [
            { jp: '今読んでいるところです。', romaji: 'Ima yonde iru tokoro desu.', de: 'Ich bin gerade dabei, es zu lesen.' },
            { jp: '日本に来たばかりの学生', romaji: 'Nihon ni kita bakari no gakusei', de: 'ein Student, der gerade erst nach Japan gekommen ist' },
            { jp: 'さっき食べたばかりなのに、もうお腹がすいた。', romaji: 'Sakki tabeta bakari na noni, mō onaka ga suita.', de: 'Obwohl ich gerade erst gegessen habe, habe ich schon wieder Hunger.' }
          ]
        }
      ]
    },

    // ===================== LEKTION 18 =====================
    {
      id: 'lesson-18',
      number: 18,
      title: 'ように & ために',
      subtitle: 'Ziele und Absichten',
      level: 'N4/N3',
      intro: '„Um ... zu" — ein einfaches Konzept im Deutschen, das im Japanischen je nach Situation ganz unterschiedlich ausgedrückt wird. Die Kernfrage ist: Hast du die direkte Kontrolle über das Ziel, oder strebst du einen Zustand an, der sich nur indirekt erreichen lässt? ために steht für bewusste, willentliche Absichten — du handelst gezielt. ように steht für Zustände, Fähigkeiten und Ergebnisse, die man anstrebt, aber nicht direkt erzwingen kann. Dieses Konzept ist nicht nur grammatisch relevant, sondern verrät auch etwas über die japanische Denkweise: Man unterscheidet klar zwischen dem, was man selbst tut, und dem, was sich ergibt.',
      sections: [
        {
          heading: 'ために — „Um zu" (bewusste Absicht)',
          text: 'ために wird mit der <strong>Wörterbuchform</strong> (Kurzform Gegenwart, positiv) verwendet und drückt ein <strong>bewusstes, willentliches Ziel</strong> aus. Das Subjekt beider Satzteile ist typischerweise dasselbe: Ich tue X, um Y zu erreichen. Das Verb vor ために beschreibt dabei immer eine <strong>kontrollierbare Handlung</strong> — etwas, das du aktiv tun oder lassen kannst. ために kann auch mit Nomen verwendet werden, dann mit の davor (家族<strong>の</strong>ために).',
          examples: [
            { jp: '日本語を勉強するために、日本に来ました。', romaji: 'Nihongo o benkyō suru tame ni, Nihon ni kimashita.', de: 'Ich bin nach Japan gekommen, um Japanisch zu lernen.' },
            { jp: '試験に受かるために、毎日勉強しています。', romaji: 'Shiken ni ukaru tame ni, mainichi benkyō shite imasu.', de: 'Ich lerne jeden Tag, um die Prüfung zu bestehen.' },
            { jp: '家族のために働いています。', romaji: 'Kazoku no tame ni hataraite imasu.', de: 'Ich arbeite für meine Familie. (Nomen + のために)' },
          ],
          tip: 'ために klingt sehr zielstrebig und entschlossen. Wenn du es benutzt, signalisierst du: „Ich habe ein konkretes Ziel und handle bewusst darauf hin."'
        },
        {
          heading: 'ように — „Damit" / „So dass" (Zustandsziel)',
          text: 'ように wird verwendet, wenn das Ziel ein <strong>Zustand oder eine Fähigkeit</strong> ist — etwas, das man nicht direkt kontrolliert oder das sich als Ergebnis einstellen soll. Deshalb steht vor ように häufig die <strong>Potentialform</strong> (話せる, 読める) oder die <strong>negative Form</strong> (忘れない, 遅刻しない). Der Sprecher hat bei ように weniger direkte Kontrolle über das Ergebnis — er tut etwas in der <em>Hoffnung</em>, dass ein bestimmter Zustand eintritt. Das macht ように weicher und indirekter als ために.',
          examples: [
            { jp: '日本語が話せるように、毎日練習しています。', romaji: 'Nihongo ga hanaseru yō ni, mainichi renshū shite imasu.', de: 'Ich übe jeden Tag, damit ich Japanisch sprechen kann.' },
            { jp: '遅刻しないように、早く起きました。', romaji: 'Chikoku shinai yō ni, hayaku okimashita.', de: 'Ich bin früh aufgestanden, damit ich nicht zu spät komme.' },
            { jp: '忘れないように、メモしました。', romaji: 'Wasurenai yō ni, memo shimashita.', de: 'Ich habe es aufgeschrieben, damit ich es nicht vergesse.' },
          ]
        },
        {
          heading: 'ために vs. ように — Der Unterschied auf den Punkt',
          text: 'Die Kernfrage ist immer: <strong>Kontrollierst du das Ergebnis direkt?</strong> Wenn ja → ために. Wenn du nur die Bedingungen dafür schaffst → ように. Ein konkretes Beispiel: „Um Japanisch zu lernen" = 日本語を勉強する<strong>ために</strong> (Lernen ist eine bewusste Handlung). „Damit ich Japanisch sprechen kann" = 日本語が話せる<strong>ように</strong> (Sprechen-Können ist ein Zustand, der sich einstellt). Dieser Unterschied mag subtil erscheinen, aber er ist für natürlich klingendes Japanisch absolut zentral.',
          examples: [
            { jp: '痩せるために、運動しています。', romaji: 'Yaseru tame ni, undō shite imasu.', de: 'Ich treibe Sport, um abzunehmen. (Aktives Ziel)' },
            { jp: '太らないように、野菜を食べている。', romaji: 'Futoranai yō ni, yasai o tabete iru.', de: 'Ich esse Gemüse, damit ich nicht zunehme. (Vermeidung eines Zustands)' }
          ],
          tip: 'Faustregel: Steht vor der Ziel-Konstruktion eine <strong>Potentialform</strong> oder <strong>ない</strong>? Dann ist es fast immer ように. Steht dort ein normales Willensverb in der Grundform? Dann ために.'
        },
        {
          heading: 'ようになる — „Es kommt dazu, dass..."',
          text: 'ようになる beschreibt eine <strong>allmähliche Veränderung</strong> — einen Übergang von einem Zustand in einen anderen. Etwas, das man vorher nicht konnte, kann man jetzt; etwas, das man vorher nicht getan hat, tut man jetzt regelmäßig. Es ist kein plötzlicher Wechsel, sondern ein Prozess, der sich über Zeit vollzogen hat. Das Gegenstück ist ようにする, das eine bewusste Anstrengung beschreibt: „Ich achte darauf, dass...".',
          examples: [
            { jp: '漢字が読めるようになりました。', romaji: 'Kanji ga yomeru yō ni narimashita.', de: 'Ich kann jetzt Kanji lesen. (Vorher konnte ich es nicht.)' },
            { jp: '毎日運動するようになった。', romaji: 'Mainichi undō suru yō ni natta.', de: 'Ich habe angefangen, jeden Tag Sport zu machen.' },
            { jp: '日本の食べ物が好きになるようになった。', romaji: 'Nihon no tabemono ga suki ni naru yō ni natta.', de: 'Ich habe angefangen, japanisches Essen zu mögen.' },
          ]
        },
        {
          heading: 'ようにする — „Darauf achten, dass..."',
          text: 'Während ようになる eine eingetretene Veränderung beschreibt, drückt ようにする eine <strong>bewusste Anstrengung oder Gewohnheit</strong> aus. Es bedeutet: „Ich achte darauf / bemühe mich, dass...". Diese Form ist im Alltag extrem nützlich, um gute Vorsätze oder Gewohnheiten auszudrücken. In der ている-Form (ようにしている) beschreibt es eine laufende Gewohnheit.',
          examples: [
            { jp: '毎日野菜を食べるようにしています。', romaji: 'Mainichi yasai o taberu yō ni shite imasu.', de: 'Ich achte darauf, jeden Tag Gemüse zu essen.' },
            { jp: '遅刻しないようにしている。', romaji: 'Chikoku shinai yō ni shite iru.', de: 'Ich achte darauf, nicht zu spät zu kommen.' },
            { jp: 'なるべく日本語を使うようにしています。', romaji: 'Narubeku nihongo o tsukau yō ni shite imasu.', de: 'Ich bemühe mich, möglichst Japanisch zu benutzen.' }
          ],
          tip: 'ようになった = „Es hat sich so ergeben, dass..." (Ergebnis). ようにしている = „Ich achte darauf, dass..." (bewusste Mühe). Beides ähnlich, aber der Blickwinkel ist völlig anders!'
        }
      ]
    },

    // ===================== LEKTION 19 =====================
    {
      id: 'lesson-19',
      number: 19,
      title: 'という & って',
      subtitle: 'Zitieren, Erklären, Benennen',
      level: 'N4/N3',
      intro: '„Man sagt, dass...", „Das heißt...", „Ich habe gehört, dass..." — diese Konstruktionen tauchen im Japanischen buchstäblich überall auf, vom formellen Geschäftsbrief bis zum lässigen Gespräch unter Freunden. Die Partikel と ist das Bindeglied, das Zitate, Gedanken, Namen und Erklärungen an den Rest des Satzes anschließt. In Kombination mit 言う (sagen), 思う (denken) und anderen Verben entsteht ein unglaublich flexibles System. Und dann gibt es noch って — die lässige Kurzform, die in der gesprochenen Sprache allgegenwärtig ist und die du garantiert in jedem Anime, jeder Serie und jedem Alltagsgespräch hören wirst.',
      sections: [
        {
          heading: 'と言う — Wörtliches und indirektes Zitat',
          text: 'と言う (to iu) ist die grundlegende Konstruktion, um <strong>Gesagtes wiederzugeben</strong>. Für direkte Zitate setzt man das Gesagte in japanische Anführungszeichen 「」, für indirekte Zitate lässt man sie weg. In beiden Fällen steht vor と die <strong>Kurzform</strong>. Beachte: Im indirekten Zitat passt man die Perspektive an (wie im Deutschen: „Ich komme" → Er sagte, <em>er</em> komme). Diese Konstruktion bildet die Basis für viele erweiterte Ausdrücke, die wir gleich sehen werden.',
          examples: [
            { jp: '「暑い」と言いました。', romaji: '„Atsui" to iimashita.', de: 'Er/sie sagte: „Es ist heiß." (Direktes Zitat)' },
            { jp: '明日来ると言った。', romaji: 'Ashita kuru to itta.', de: 'Er/sie hat gesagt, dass er/sie morgen kommt. (Indirektes Zitat)' },
            { jp: '母は「早く寝なさい」と言いました。', romaji: 'Haha wa „hayaku nenasai" to iimashita.', de: 'Meine Mutter sagte: „Geh früh ins Bett!"' },
          ]
        },
        {
          heading: 'という — „Das heißt" / „Namens" / „So genannt"',
          text: 'という (to iu) in seiner attributiven Form dient dazu, <strong>etwas zu benennen, zu definieren oder zu erklären</strong>. Es verbindet einen Namen, einen Begriff oder eine Beschreibung mit dem Nomen, das es näher bestimmt. Besonders nützlich ist die Kombination ということ (die Tatsache, dass...) und というのは (was X betrifft / X bedeutet...). Diese Formen begegnen dir in Texten und Gesprächen ständig, besonders wenn Dinge erklärt oder neue Konzepte eingeführt werden.',
          examples: [
            { jp: '「桜」という花を知っていますか。', romaji: '„Sakura" to iu hana o shitte imasu ka.', de: 'Kennst du die Blume namens „Sakura"?' },
            { jp: 'ラーメンという食べ物', romaji: 'rāmen to iu tabemono', de: 'ein Essen namens Ramen' },
            { jp: '彼が来ないということは知らなかった。', romaji: 'Kare ga konai to iu koto wa shiranakatta.', de: 'Ich wusste nicht, dass er nicht kommt. (ということ = die Tatsache, dass)' },
          ],
          tip: 'ということ ist einer der nützlichsten Ausdrücke überhaupt. Er verwandelt einen ganzen Satz in ein Nomen: „die Tatsache/Sache, dass...". Absolut unverzichtbar ab N4-Niveau.'
        },
        {
          heading: 'って — Die Allzweck-Kurzform',
          text: 'って (tte) ist die <strong>gesprochene Kurzform</strong> von と und という. Es ist unglaublich vielseitig: Es ersetzt と言う (Zitat), という (Benennung), は (Thema) und sogar というのは (Erklärung) — je nach Kontext. In der Umgangssprache ist って so allgegenwärtig, dass man kaum einen Satz hört, in dem es nicht vorkommt. Es macht die Sprache natürlicher, schneller und lockerer. Anfangs mag es verwirrend sein, weil って so viel bedeuten kann, aber der Kontext klärt fast immer die Bedeutung.',
          examples: [
            { jp: '明日テストだって。', romaji: 'Ashita tesuto da tte.', de: 'Morgen ist angeblich Test. (Hörensagen = と言っていた)' },
            { jp: 'ラーメンって何？', romaji: 'Rāmen tte nani?', de: 'Was ist Ramen? (= ラーメンというのは何?)' },
            { jp: '田中さんって優しいよね。', romaji: 'Tanaka-san tte yasashii yo ne.', de: 'Tanaka ist ja echt nett, oder? (って als Themenmarkierer)' },
          ],
          tip: 'って ist extrem häufig in der Umgangssprache. Wenn du japanische Untertitel liest oder Anime schaust, wirst du es in fast jedem Dialog hören. Gewöhne dich daran, es als „flexibles Universalwerkzeug" zu sehen!'
        },
        {
          heading: 'と思う — „Ich denke, dass..."',
          text: 'と思う (to omou) drückt die <strong>eigene Meinung oder Einschätzung</strong> aus. Vor と steht immer die Kurzform. Ein wichtiger kultureller Punkt: と思います wird im Japanischen sehr häufig verwendet, auch bei Aussagen, die im Deutschen als Fakt formuliert würden. Es macht die Aussage weicher und weniger absolut — eine wichtige soziale Funktion in einer Kultur, die direkte Konfrontation vermeidet. Die ている-Form (と思っている) beschreibt eine andauernde Überzeugung, während と思う eher einen spontanen Gedanken wiedergibt.',
          examples: [
            { jp: '明日は雨だと思います。', romaji: 'Ashita wa ame da to omoimasu.', de: 'Ich denke, morgen regnet es.' },
            { jp: 'この映画はおもしろいと思う。', romaji: 'Kono eiga wa omoshiroi to omou.', de: 'Ich finde diesen Film interessant.' },
            { jp: '日本に行きたいと思っています。', romaji: 'Nihon ni ikitai to omotte imasu.', de: 'Ich denke daran, nach Japan zu fahren. (Laufender Gedanke/Wunsch)' },
          ],
          tip: '„Ich glaube nicht, dass..." = ～ないと思う (die Verneinung steht VOR と思う, nicht danach). ～と思わない (ich denke nicht) klingt dagegen viel stärker und ablehnender.'
        },
        {
          heading: 'Weitere と-Konstruktionen',
          text: 'Die Partikel と in ihrer Zitierfunktion beschränkt sich nicht auf 言う und 思う. Es gibt eine ganze Reihe von Verben, die mit と kombiniert werden und jeweils eine andere Nuance ausdrücken. Diese Konstruktionen sind ab N4/N3 absolut essentiell und machen deine Ausdrucksweise viel reichhaltiger und natürlicher.',
          examples: [
            { jp: '明日テストがあると聞きました。', romaji: 'Ashita tesuto ga aru to kikimashita.', de: 'Ich habe gehört, dass morgen ein Test ist. (と聞く = hören, dass)' },
            { jp: '将来医者になろうと決めた。', romaji: 'Shōrai isha ni narō to kimeta.', de: 'Ich habe beschlossen, in Zukunft Arzt zu werden. (と決める = beschließen)' },
            { jp: '彼に手伝ってほしいと頼んだ。', romaji: 'Kare ni tetsudatte hoshii to tanonda.', de: 'Ich habe ihn gebeten, mir zu helfen. (と頼む = bitten)' },
          ]
        }
      ]
    },

    // ===================== LEKTION 20 =====================
    {
      id: 'lesson-20',
      number: 20,
      title: 'Respektsprache: Grundlagen',
      subtitle: 'Keigo ohne Panik',
      level: 'N4/N3',
      intro: 'Keigo — das Wort allein lässt Japanisch-Lernende erschaudern. Es ist das sprachliche System, das soziale Hierarchien, Höflichkeit und Respekt in der japanischen Sprache abbildet. Aber keine Panik: Die Grundzüge sind gar nicht so wild, wie ihr Ruf vermuten lässt. Im Grunde geht es um ein einziges Prinzip — den Gesprächspartner sprachlich „hochzuheben" und sich selbst „zu senken". Wenn du dieses Konzept verinnerlicht hast, ergibt der Rest logischen Sinn. Hier bekommst du einen entspannten Einstieg in die drei Höflichkeitsstufen, mit den wichtigsten Verben und Mustern, die du im Alltag tatsächlich brauchst.',
      sections: [
        {
          heading: 'Die drei Ebenen',
          text: 'Japanisch hat drei Höflichkeitsregister, die zusammen das Keigo-System bilden. Du kennst bereits die erste Ebene — die です/ます-Form, die du seit den ersten Lektionen benutzt. Die anderen beiden Ebenen sind spezieller und kommen vor allem im beruflichen Umfeld, im Kundenkontakt und in formellen Situationen zum Einsatz. Das Schöne ist: Du musst nicht alle drei gleichzeitig beherrschen. Die meisten Japaner selbst finden Keigo schwierig und machen Fehler damit!<ul class="lesson-rules"><li><strong>丁寧語 (teineigo)</strong> — Höfliche Sprache: です/ます-Formen. Die Basisebene der Höflichkeit, die du schon kannst. Damit kommst du im Alltag problemlos zurecht.</li><li><strong>尊敬語 (sonkeigo)</strong> — Respektsprache: Hebt die Handlungen des Gesprächspartners oder einer dritten Person sprachlich „hoch". Benutzt man gegenüber Vorgesetzten, Kunden, Älteren.</li><li><strong>謙譲語 (kenjōgo)</strong> — Bescheidenheitssprache: Senkt die eigenen Handlungen sprachlich „ab". Man macht sich selbst klein, um den anderen relativ größer erscheinen zu lassen.</li></ul>',
          examples: [],
          tip: 'Stell dir eine Bühne vor: 尊敬語 hebt den anderen auf ein Podest. 謙譲語 lässt dich selbst eine Stufe hinuntersteigen. In beiden Fällen vergrößert sich der Höhenunterschied — und genau das ist der Respekt.'
        },
        {
          heading: '丁寧語 — Die Basis, die du schon kannst',
          text: 'Die gute Nachricht zuerst: Die wichtigste Höflichkeitsebene beherrschst du bereits! です und ます sind 丁寧語 (teineigo), die „höfliche Sprache". Sie ist die Standardform, die du in Geschäften, mit Fremden und in den meisten Alltagssituationen verwendest. Alles, was darüber hinausgeht (尊敬語 und 謙譲語), ist eine Erweiterung für besonders formelle Kontexte.',
          examples: [
            { jp: '明日は会議があります。', romaji: 'Ashita wa kaigi ga arimasu.', de: 'Morgen gibt es ein Meeting. (ます-Form = höflich)' },
            { jp: 'それはいい考えですね。', romaji: 'Sore wa ii kangae desu ne.', de: 'Das ist eine gute Idee. (です = höflich)' },
            { jp: 'すみません、駅はどこですか。', romaji: 'Sumimasen, eki wa doko desu ka.', de: 'Entschuldigung, wo ist der Bahnhof? (Höfliche Alltagssprache)' }
          ]
        },
        {
          heading: '尊敬語 — Den anderen hochheben',
          text: 'Man benutzt Respektsprache, wenn man über die <strong>Handlungen anderer</strong> — Kunden, Vorgesetzte, Ältere, Personen, denen man Respekt zollt — spricht. Es gibt dabei zwei Wege: Erstens <strong>spezielle Respekt-Verben</strong>, die komplett andere Wörter sind (いらっしゃる statt いる). Zweitens das <strong>allgemeine Muster お + ます-Stamm + になる</strong>, das mit fast jedem Verb funktioniert. Zusätzlich kann auch die <strong>Passivform</strong> als milde Respektform verwendet werden — das ist die einfachste Stufe und ein guter Einstieg.',
          examples: [
            { jp: '先生はもう帰られました。', romaji: 'Sensei wa mō kaeraremashita.', de: 'Der Lehrer ist schon gegangen. (Passivform als Respekt)' },
            { jp: '社長はこちらにいらっしゃいます。', romaji: 'Shachō wa kochira ni irasshaimasu.', de: 'Der Firmenchef ist hier. (いらっしゃる = sein/gehen/kommen, respektvoll)' },
            { jp: '何を召し上がりますか。', romaji: 'Nani o meshiagarimasu ka.', de: 'Was möchten Sie essen/trinken? (召し上がる = essen/trinken, respektvoll)' },
          ],
          tip: 'Das Muster お + ます-Stamm + になる ist dein Joker! Es funktioniert mit fast jedem Verb: お読みになる (lesen), お使いになる (benutzen), お待ちになる (warten)... Damit kannst du auch Verben respektvoll machen, für die es kein spezielles Respekt-Verb gibt.'
        },
        {
          heading: '謙譲語 — Sich selbst senken',
          text: 'Bescheidenheitssprache benutzt man für <strong>die eigenen Handlungen</strong> gegenüber Höhergestellten. Indem du dich sprachlich „kleiner machst", drückst du indirekt Respekt für den anderen aus. Auch hier gibt es <strong>spezielle Bescheidenheits-Verben</strong> (伺う statt 行く/聞く) und ein <strong>allgemeines Muster: お + ます-Stamm + する</strong>. Wichtig: 謙譲語 verwendet man nur für die <em>eigenen</em> Handlungen oder die Handlungen der eigenen Gruppe (z.B. „Mein Chef kommt" — wenn du mit einem Kunden sprichst, benutzt du für deinen Chef 謙譲語, weil er zu deiner Gruppe gehört).',
          examples: [
            { jp: '明日、伺います。', romaji: 'Ashita, ukagaimasu.', de: 'Ich werde morgen vorbeikommen. (伺う = gehen/fragen, bescheiden)' },
            { jp: '資料を拝見しました。', romaji: 'Shiryō o haiken shimashita.', de: 'Ich habe die Unterlagen eingesehen. (拝見する = sehen, bescheiden)' },
            { jp: '私が参ります。', romaji: 'Watashi ga mairimasu.', de: 'Ich werde kommen/gehen. (参る = gehen/kommen, bescheiden)' },
          ],
          tip: 'Wichtige Falle: 謙譲語 niemals für die Handlungen anderer verwenden! Zu sagen „Der Kunde 参ります" wäre ein grober Fehler — du würdest den Kunden „erniedrigen" statt zu respektieren.'
        },
        {
          heading: 'Die wichtigsten Keigo-Paare',
          text: 'Diese Tabelle zeigt die gebräuchlichsten Verben in allen drei Stufen. Es lohnt sich, diese Paare als feste Einheiten zu lernen, denn sie kommen im Alltag ständig vor — bei der Arbeit, in Geschäften, in formellen E-Mails und sogar in der Bahn. Die speziellen Keigo-Verben sind historisch gewachsen und folgen keinem erkennbaren Muster — man muss sie einfach auswendig lernen.<table class="lesson-compare-table"><thead><tr><th>Normal</th><th>尊敬語 (Respekt)</th><th>謙譲語 (Bescheiden)</th></tr></thead><tbody><tr><td>行く / 来る</td><td>いらっしゃる</td><td>参る / 伺う</td></tr><tr><td>いる</td><td>いらっしゃる</td><td>おる</td></tr><tr><td>食べる / 飲む</td><td>召し上がる</td><td>いただく</td></tr><tr><td>言う</td><td>おっしゃる</td><td>申す</td></tr><tr><td>見る</td><td>ご覧になる</td><td>拝見する</td></tr><tr><td>する</td><td>なさる</td><td>いたす</td></tr><tr><td>知っている</td><td>ご存じだ</td><td>存じている</td></tr><tr><td>くれる</td><td>くださる</td><td>—</td></tr><tr><td>あげる</td><td>—</td><td>差し上げる</td></tr><tr><td>もらう</td><td>—</td><td>いただく</td></tr></tbody></table>',
          examples: []
        },
        {
          heading: 'Keigo im Alltag — Wo du es hörst',
          text: 'Auch wenn du Keigo nicht aktiv verwenden musst, wirst du es <strong>ständig passiv hören</strong>. In Geschäften, Restaurants, Bahnhöfen und Hotels werden dir Keigo-Formen begegnen. Es lohnt sich daher, die häufigsten Floskeln zu erkennen. Viele dieser Sätze sind so standardisiert, dass sie fast wie feste Redewendungen funktionieren — die Mitarbeiter verwenden sie automatisch, ohne über die grammatische Struktur nachzudenken.',
          examples: [
            { jp: 'いらっしゃいませ！', romaji: 'Irasshaimase!', de: 'Willkommen! (Hörst du in jedem Geschäft und Restaurant.)' },
            { jp: '少々お待ちください。', romaji: 'Shōshō omachi kudasai.', de: 'Bitte warten Sie einen Moment.' },
            { jp: 'こちらでよろしいでしょうか。', romaji: 'Kochira de yoroshii deshō ka.', de: 'Ist das hier in Ordnung für Sie? (よろしい = höfliches いい)' },
          ]
        },
        {
          heading: 'Häufige Anfängerfehler',
          text: 'Keigo hat einige typische Stolperfallen, die selbst Japaner manchmal falsch machen. Die folgenden Fehler sind besonders verbreitet — wenn du sie vermeidest, bist du vielen Lernenden schon voraus. Das Grundprinzip lautet: 尊敬語 für die Handlungen <em>anderer</em>, 謙譲語 für die <em>eigenen</em> Handlungen. Wer das vertauscht, bewirkt das Gegenteil des beabsichtigten Respekts.',
          examples: [
            { jp: '✗ 先生が申しました', romaji: '(falsch: kenjōgo für den Lehrer)', de: 'Falsch! 申す ist bescheiden — damit senkst du den Lehrer.' },
            { jp: '✓ 先生がおっしゃいました', romaji: 'Sensei ga osshaimashita.', de: 'Richtig! おっしゃる ist respektvoll — der Lehrer wird hochgehoben.' },
            { jp: '✗ 私がいらっしゃいます', romaji: '(falsch: sonkeigo für sich selbst)', de: 'Falsch! いらっしゃる ist Respektsprache — damit hebst du dich selbst hoch.' },
          ],
          tip: 'Fürs Erste reicht es völlig, wenn du die です/ます-Form sicher beherrschst und die häufigsten Keigo-Wörter erkennst, wenn du sie hörst. Aktiv verwenden musst du Keigo erst, wenn du in einem japanischen Unternehmen arbeitest oder sehr formelle Situationen meistern willst. Die meisten Japaner werden es sehr schätzen, wenn du überhaupt die ます-Form korrekt benutzt!'
        }
      ]
    },

    // ===================== LEKTION 21 =====================
    {
      id: 'lesson-21',
      number: 21,
      title: '～ようにする & ～ようになる',
      subtitle: 'Gewohnheiten und Veränderungen',
      level: 'N3',
      intro: 'Japanisch hat zwei elegante Konstruktionen, um über Veränderungen zu sprechen: ようにする drückt eine bewusste Anstrengung aus, etwas zu ändern — „Ich achte darauf, dass..." — während ようになる eine natürlich eingetretene Veränderung beschreibt — „Es kam so weit, dass...". Die beiden sind ein perfektes Paar: ようにする ist die Absicht, ようになる ist das Ergebnis. Wer den Unterschied versteht, kann auf Japanisch erstaunlich nuanciert über persönliche Entwicklung, Gewohnheiten und Lebensveränderungen sprechen.',
      sections: [
        {
          heading: 'ようにする — Bewusste Anstrengung',
          text: 'ようにする drückt aus, dass man sich <strong>bewusst bemüht</strong>, ein bestimmtes Verhalten beizubehalten oder zu ändern. Es geht nicht darum, etwas einmal zu tun, sondern um eine <strong>dauerhafte Anstrengung</strong> oder eine neue Gewohnheit. Im Deutschen am besten übersetzt mit „Ich achte darauf, dass..." oder „Ich versuche, ... zu machen."',
          examples: [
            { jp: '毎日野菜を食べるようにしている。', romaji: 'Mainichi yasai o taberu yō ni shite iru.', de: 'Ich achte darauf, jeden Tag Gemüse zu essen.' },
            { jp: 'なるべく早く寝るようにしています。', romaji: 'Narubeku hayaku neru yō ni shite imasu.', de: 'Ich versuche, möglichst früh schlafen zu gehen.' },
            { jp: '遅刻しないようにしてください。', romaji: 'Chikoku shinai yō ni shite kudasai.', de: 'Bitte achten Sie darauf, nicht zu spät zu kommen.' }
          ],
          tip: 'ようにしている (Verlaufsform) = eine laufende Gewohnheit. ようにした (Vergangenheit) = man hat sich entschieden, etwas von nun an zu tun.'
        },
        {
          heading: 'ようになる — Natürliche Veränderung',
          text: 'ようになる beschreibt eine <strong>Veränderung, die sich natürlich ergeben hat</strong> — eine Fähigkeit, die man erworben hat, oder ein Zustand, der sich entwickelt hat. Im Deutschen: „Es kam dazu, dass..." oder „Ich kann jetzt...". Im Gegensatz zu ようにする ist hier kein aktives Bemühen im Vordergrund — die Veränderung ist einfach passiert.',
          examples: [
            { jp: '日本語が少し話せるようになった。', romaji: 'Nihongo ga sukoshi hanaseru yō ni natta.', de: 'Ich kann jetzt ein bisschen Japanisch sprechen. (Es hat sich entwickelt.)' },
            { jp: '子供がピーマンを食べるようになった。', romaji: 'Kodomo ga pīman o taberu yō ni natta.', de: 'Das Kind isst jetzt Paprika. (Früher nicht, jetzt schon.)' },
            { jp: '最近よく眠れるようになりました。', romaji: 'Saikin yoku nemureru yō ni narimashita.', de: 'In letzter Zeit kann ich gut schlafen. (Früher nicht.)' }
          ]
        },
        {
          heading: 'Das Paar im Vergleich',
          text: 'Der Unterschied ist im Kern einfach: <strong>ようにする = Absicht</strong> (ich bemühe mich), <strong>ようになる = Ergebnis</strong> (es hat sich ergeben). Oft erzählt man beides in einer Geschichte: Zuerst die Anstrengung, dann das Ergebnis.',
          examples: [
            { jp: '毎日練習するようにした。', romaji: 'Mainichi renshū suru yō ni shita.', de: 'Ich habe mich entschieden, jeden Tag zu üben. (Absicht)' },
            { jp: 'そのおかげで上手に弾けるようになった。', romaji: 'Sono okage de jōzu ni hikeru yō ni natta.', de: 'Dadurch kann ich jetzt gut spielen. (Ergebnis)' },
            { jp: '甘いものを食べないようにしている。', romaji: 'Amai mono o tabenai yō ni shite iru.', de: 'Ich achte darauf, keine Süßigkeiten zu essen. (Absicht)' },
          ]
        },
        {
          heading: 'Verneinung: ～ないようにする / ～なくなる',
          text: 'Um auszudrücken, dass man etwas <strong>nicht mehr tut</strong> oder <strong>darauf achtet, etwas zu unterlassen</strong>, gibt es zwei wichtige Formen. ～ないようにする = „Ich achte darauf, es NICHT zu tun." ～なくなる = „Es kam dazu, dass ich es nicht mehr tue." Die Verneinung folgt der gleichen Absicht-vs-Ergebnis-Logik.',
          examples: [
            { jp: 'お酒を飲まないようにしている。', romaji: 'Osake o nomanai yō ni shite iru.', de: 'Ich achte darauf, keinen Alkohol zu trinken.' },
            { jp: '最近コーヒーを飲まなくなった。', romaji: 'Saikin kōhī o nomanaku natta.', de: 'In letzter Zeit trinke ich keinen Kaffee mehr. (Hat sich so ergeben.)' }
          ],
          tip: '～なくなる ist oft überraschend emotional: 笑わなくなった (er lacht nicht mehr), 話さなくなった (sie redet nicht mehr mit mir) — diese Sätze können eine ganze Geschichte erzählen.'
        }
      ]
    },

    // ===================== LEKTION 22 =====================
    {
      id: 'lesson-22',
      number: 22,
      title: '～てしまう (ちゃう)',
      subtitle: 'Ups — das war keine Absicht',
      level: 'N3',
      intro: '～てしまう ist eine der vielseitigsten und emotionalsten Formen im Japanischen. Je nach Kontext drückt sie Bedauern, Vollendung oder unbeabsichtigte Handlungen aus. In der Umgangssprache wird sie zu ～ちゃう (nach て) oder ～じゃう (nach で) verkürzt — eine Form, die du in Manga, Anime und im Alltag ständig hören wirst. Wenn du ～てしまう verstehst, öffnet sich eine ganze Welt japanischer Nuancen.',
      sections: [
        {
          heading: 'Bedauern & Unabsichtlichkeit',
          text: 'Die häufigste Verwendung von ～てしまう: etwas ist passiert, das man <strong>nicht wollte oder bereut</strong>. Im Deutschen: „Ich habe leider...", „Es ist mir passiert, dass...", „Dummerweise habe ich...". Der Sprecher signalisiert, dass das Ergebnis unerwünscht war.',
          examples: [
            { jp: '財布を忘れてしまった。', romaji: 'Saifu o wasurete shimatta.', de: 'Ich habe dummerweise mein Portemonnaie vergessen.' },
            { jp: '大事なファイルを消してしまった。', romaji: 'Daiji na fairu o keshite shimatta.', de: 'Ich habe leider eine wichtige Datei gelöscht.' },
            { jp: 'せっかくのケーキを落としてしまった。', romaji: 'Sekkaku no kēki o otoshite shimatta.', de: 'Ich habe den Kuchen fallen lassen (obwohl er extra war).' },
          ]
        },
        {
          heading: 'Vollendung — „komplett erledigt"',
          text: '～てしまう kann auch ausdrücken, dass eine Handlung <strong>vollständig abgeschlossen</strong> ist — oft schneller oder gründlicher als erwartet. Hier schwingt kein Bedauern mit, sondern eher Erstaunen oder Nachdruck. Im Deutschen: „komplett aufgegessen", „schon fertig gelesen", „alles verbraucht".',
          examples: [
            { jp: 'この本は一日で読んでしまった。', romaji: 'Kono hon wa ichinichi de yonde shimatta.', de: 'Ich habe dieses Buch an einem Tag durchgelesen.' },
            { jp: '宿題をもう全部やってしまった。', romaji: 'Shukudai o mō zenbu yatte shimatta.', de: 'Ich habe die Hausaufgaben schon komplett erledigt.' },
            { jp: 'ケーキを全部食べてしまった。', romaji: 'Kēki o zenbu tabete shimatta.', de: 'Ich habe den ganzen Kuchen aufgegessen.' }
          ],
          tip: 'Ob Bedauern oder Vollendung gemeint ist, ergibt sich aus dem Kontext. ケーキを食べてしまった kann beides heißen: „Ich habe den Kuchen komplett aufgegessen" ODER „Ich habe ihn leider aufgegessen (obwohl ich nicht sollte)."'
        },
        {
          heading: 'Umgangssprache: ～ちゃう / ～じゃう',
          text: 'In der gesprochenen Sprache wird ～てしまう fast immer zu <strong>～ちゃう</strong> verkürzt. Nach der で-Form wird es zu <strong>～じゃう</strong>. Die Konjugation folgt dem u-Verb-Muster: ちゃう → ちゃった (Vergangenheit), ちゃって (て-Form). Diese Formen sind extrem häufig und wichtig zu erkennen!',
          examples: [
            { jp: '忘れちゃった。', romaji: 'Wasurechatta.', de: 'Hab\'s vergessen. (= 忘れてしまった)' },
            { jp: '全部食べちゃった。', romaji: 'Zenbu tabechatta.', de: 'Hab alles aufgegessen. (= 食べてしまった)' },
            { jp: '壊れちゃった。', romaji: 'Kowarechatta.', de: 'Es ist kaputtgegangen. (= 壊れてしまった)' },
          ],
          tip: 'In formellen Situationen: ～てしまう. Im Alltag mit Freunden: ～ちゃう. In Manga und Anime: fast immer ～ちゃう.'
        }
      ]
    },

    // ===================== LEKTION 23 =====================
    {
      id: 'lesson-23',
      number: 23,
      title: '～ばかり の使い方',
      subtitle: 'Gerade erst, immer nur, nichts als',
      level: 'N3',
      intro: 'ばかり ist ein kleines Wort mit großer Wirkung. Je nach Kontext und Verbform bedeutet es „gerade erst" (zeitlich), „immer nur" (Gewohnheit) oder „nichts als" (Ausschließlichkeit). Es ist eines dieser Wörter, die ständig auftauchen und deren Nuancen sich mit der Zeit natürlich erschließen. Hier bekommst du einen klaren Überblick über die drei Hauptbedeutungen.',
      sections: [
        {
          heading: '～たばかり — Gerade erst',
          text: 'Verb-た-Form + ばかり drückt aus, dass eine Handlung <strong>gerade erst</strong> stattgefunden hat — die Erinnerung ist noch frisch, der Zustand noch neu. Im Deutschen: „Ich habe gerade erst...", „Es ist noch nicht lange her, dass...". Wichtig: „Gerade erst" ist subjektiv — es können Minuten oder Wochen sein, solange es sich für den Sprecher noch frisch anfühlt.',
          examples: [
            { jp: '日本に来たばかりです。', romaji: 'Nihon ni kita bakari desu.', de: 'Ich bin gerade erst nach Japan gekommen.' },
            { jp: 'さっき食べたばかりなのに、もうお腹が空いた。', romaji: 'Sakki tabeta bakari na noni, mō onaka ga suita.', de: 'Ich habe gerade erst gegessen, aber bin schon wieder hungrig.' },
            { jp: '彼女は引っ越してきたばかりだ。', romaji: 'Kanojo wa hikkoshite kita bakari da.', de: 'Sie ist gerade erst hergezogen.' }
          ]
        },
        {
          heading: '～てばかり / ～ばかり + Verb — Immer nur',
          text: '～てばかりいる (Verb-て + ばかり + いる) drückt aus, dass jemand <strong>immer nur</strong> eine Sache tut — oft mit leichtem Vorwurf. Nomen + ばかり + Verb bedeutet „nichts als" dieses Nomen. Im Deutschen: „Du machst immer nur...", „Er isst nichts als...".',
          examples: [
            { jp: 'ゲームばかりしていないで勉強しなさい。', romaji: 'Gēmu bakari shite inaide benkyō shinasai.', de: 'Hör auf, immer nur Spiele zu spielen, und lern!' },
            { jp: '甘いものばかり食べている。', romaji: 'Amai mono bakari tabete iru.', de: 'Er isst immer nur Süßigkeiten.' },
            { jp: '文句ばかり言わないで。', romaji: 'Monku bakari iwanaide.', de: 'Hör auf, dich immer nur zu beschweren.' }
          ],
          tip: 'Diese Verwendung hat fast immer einen leicht vorwurfsvollen oder genervten Ton.'
        },
        {
          heading: '～ばかりか / ～ばかりでなく — Nicht nur',
          text: '～ばかりか oder ～ばかりでなく bedeutet <strong>„nicht nur ... sondern auch"</strong>. Es hebt hervor, dass etwas über das Erwartete hinausgeht — eine Steigerung in einer Aufzählung. Formeller und nachdrücklicher als ～だけでなく.',
          examples: [
            { jp: '彼は英語ばかりか中国語も話せる。', romaji: 'Kare wa eigo bakari ka chūgokugo mo hanaseru.', de: 'Er spricht nicht nur Englisch, sondern auch Chinesisch.' },
            { jp: '雨ばかりでなく風も強くなってきた。', romaji: 'Ame bakari de naku kaze mo tsuyoku natte kita.', de: 'Nicht nur der Regen, auch der Wind ist stärker geworden.' }
          ]
        },
        {
          heading: '～ばかりに — Nur weil',
          text: '～ばかりに bedeutet <strong>„nur weil..." / „allein deshalb, weil..."</strong> — es drückt aus, dass ein einziger Grund zu einem (meist negativen) Ergebnis geführt hat. Im Deutschen: „Nur weil ich..." oder „Einzig und allein deshalb...".',
          examples: [
            { jp: '一言多かったばかりに怒られた。', romaji: 'Hitokoto ōkatta bakari ni okorareta.', de: 'Nur weil ich ein Wort zu viel gesagt habe, wurde ich ausgeschimpft.' },
            { jp: '知らなかったばかりに損をした。', romaji: 'Shiranakatta bakari ni son o shita.', de: 'Nur weil ich es nicht wusste, hatte ich einen Nachteil.' }
          ],
          tip: 'ばかりに hat fast immer eine bedauernde Nuance — „Wenn nur das eine Ding anders gewesen wäre..."'
        }
      ]
    },

    // ===================== LEKTION 24 =====================
    {
      id: 'lesson-24',
      number: 24,
      title: '～ことにする & ～ことになる',
      subtitle: 'Entscheidungen und Schicksal',
      level: 'N3',
      intro: 'Wer hat entschieden? Diese Frage ist der Kern des Unterschieds zwischen ことにする und ことになる. Das eine drückt eine persönliche, aktive Entscheidung aus — „Ich habe beschlossen...". Das andere beschreibt ein Ergebnis, das sich ergeben hat, oft ohne erkennbaren Entscheider — „Es wurde beschlossen, dass..." oder „Es hat sich so ergeben, dass...". Zusammen sind sie ein mächtiges Paar, um über Entscheidungen, Schicksal und Wendepunkte im Leben zu sprechen.',
      sections: [
        {
          heading: 'ことにする — Ich entscheide',
          text: 'Verb (Wörterbuchform/ない-Form) + ことにする drückt eine <strong>persönliche, bewusste Entscheidung</strong> aus. Der Sprecher hat selbst beschlossen, etwas zu tun oder nicht zu tun. Im Deutschen: „Ich habe beschlossen, ...", „Ich entscheide mich für...".',
          examples: [
            { jp: '来月から毎朝走ることにした。', romaji: 'Raigetsu kara maiasa hashiru koto ni shita.', de: 'Ich habe beschlossen, ab nächsten Monat jeden Morgen zu joggen.' },
            { jp: '今日はお酒を飲まないことにする。', romaji: 'Kyō wa osake o nomanai koto ni suru.', de: 'Ich entscheide mich, heute keinen Alkohol zu trinken.' },
            { jp: '留学することにしました。', romaji: 'Ryūgaku suru koto ni shimashita.', de: 'Ich habe mich entschieden, ein Auslandsstudium zu machen.' }
          ]
        },
        {
          heading: 'ことになる — Es ergibt sich',
          text: 'Verb (Wörterbuchform/ない-Form) + ことになる beschreibt ein <strong>Ergebnis oder eine Entscheidung, die sich ergeben hat</strong> — ohne den Sprecher als aktiven Entscheider. Typisch für Firmenbeschlüsse, Schicksalsschläge oder Situationen, in denen „man" (nicht „ich") entschieden hat.',
          examples: [
            { jp: '来月大阪に転勤することになった。', romaji: 'Raigetsu Ōsaka ni tenkin suru koto ni natta.', de: 'Es wurde entschieden, dass ich nächsten Monat nach Osaka versetzt werde.' },
            { jp: '会議は来週に延期されることになった。', romaji: 'Kaigi wa raishū ni enki sareru koto ni natta.', de: 'Es wurde beschlossen, die Besprechung auf nächste Woche zu verschieben.' },
            { jp: '結局、離婚することになった。', romaji: 'Kekkyoku, rikon suru koto ni natta.', de: 'Letztendlich kam es zur Scheidung.' }
          ],
          tip: 'ことになる ist auch die japanische Art, unangenehme Nachrichten abzumildern: Statt „Ich wurde versetzt" sagt man „Es hat sich ergeben, dass ich versetzt werde" — die Verantwortung wird verwischt.'
        },
        {
          heading: 'ことにしている — Eine feste Gewohnheit',
          text: 'ことにしている (Verlaufsform) drückt eine <strong>feste Gewohnheit oder Regel</strong> aus, die man sich selbst gesetzt hat und konsequent befolgt. Stärker als ようにしている, weil es eine bewusste Regel und nicht nur eine Anstrengung ist.',
          examples: [
            { jp: '朝食は必ず食べることにしている。', romaji: 'Chōshoku wa kanarazu taberu koto ni shite iru.', de: 'Ich mache es mir zur Regel, immer zu frühstücken.' },
            { jp: '日曜日は仕事をしないことにしている。', romaji: 'Nichiyōbi wa shigoto o shinai koto ni shite iru.', de: 'Sonntags arbeite ich grundsätzlich nicht.' }
          ]
        },
        {
          heading: 'ことにする vs ようにする — Entscheidung vs Gewohnheit',
          text: 'Beide Formen klingen ähnlich, drücken aber etwas Grundverschiedenes aus:<ul class="lesson-rules"><li><strong>ことにする</strong> → Der <strong>Moment der Entscheidung</strong>: „Ich habe beschlossen!" — ein klarer Schnitt.</li><li><strong>ようにする</strong> → Die <strong>anhaltende Bemühung</strong>: „Ich achte darauf..." — ein fortlaufender Prozess.</li></ul>ことにする markiert den Zeitpunkt, an dem man sich festlegt. ようにする beschreibt die tägliche Disziplin, etwas durchzuhalten. Oft folgt auf ein ことにする im echten Leben ein ようにしている — erst der Entschluss, dann die Umsetzung.',
          examples: [
            { jp: '毎日運動することにした。', romaji: 'Mainichi undō suru koto ni shita.', de: 'Ich habe beschlossen, täglich Sport zu treiben. (Der Moment des Entschlusses)' },
            { jp: '毎日運動するようにしている。', romaji: 'Mainichi undō suru yō ni shite iru.', de: 'Ich achte darauf, täglich Sport zu treiben. (Die laufende Bemühung)' },
            { jp: '甘いものを食べないことにした。', romaji: 'Amai mono o tabenai koto ni shita.', de: 'Ich habe beschlossen, nichts Süßes mehr zu essen. (Klarer Schnitt — ab jetzt!)' }
          ],
          tip: 'ことにする klingt entschlossener — wie ein Strich unter eine Diskussion. ようにする klingt nach einem Prozess, der Disziplin erfordert. Im Alltag wird oft beides kombiniert: 「甘いものを食べないことにして、毎日野菜を食べるようにしている。」'
        },
        {
          heading: 'Vergleich: する vs なる',
          text: 'Die Kernfrage ist immer: <strong>Wer hat entschieden?</strong><ul class="lesson-rules"><li><strong>ことにする</strong> → ICH habe entschieden (aktiv, persönlich)</li><li><strong>ことになる</strong> → ES hat sich ergeben (passiv, von außen)</li><li><strong>ことにしている</strong> → ICH halte mich an diese Regel (feste Gewohnheit)</li><li><strong>ことになっている</strong> → Es ist Regel/Vorschrift, dass... (allgemeine Norm)</li></ul>',
          examples: [
            { jp: '日本では靴を脱ぐことになっている。', romaji: 'Nihon de wa kutsu o nugu koto ni natte iru.', de: 'In Japan ist es Brauch, die Schuhe auszuziehen.' },
            { jp: '会社では残業しないことになっている。', romaji: 'Kaisha de wa zangyō shinai koto ni natte iru.', de: 'In der Firma gilt die Regel, keine Überstunden zu machen.' },
            { jp: '転勤することになったので、引っ越します。', romaji: 'Tenkin suru koto ni natta node, hikkoshimasu.', de: 'Da beschlossen wurde, dass ich versetzt werde, ziehe ich um.' }
          ]
        }
      ]
    },

    // ===================== LEKTION 25 =====================
    {
      id: 'lesson-25',
      number: 25,
      title: '～わけ',
      subtitle: 'Der logische Schluss',
      level: 'N3',
      intro: 'わけ ist eines der nuancenreichsten Wörter im Japanischen. Wörtlich bedeutet es „Grund" oder „logische Schlussfolgerung", aber in der Praxis hat es je nach Konstruktion ganz unterschiedliche Bedeutungen. ～わけだ, ～わけがない und ～わけにはいかない sind drei Kernmuster, die im JLPT ab N3 geprüft werden und im Alltag ständig vorkommen. Wer わけ versteht, kann logische Zusammenhänge, Unmöglichkeiten und soziale Zwänge elegant ausdrücken.',
      sections: [
        {
          heading: 'わけだ — Das erklärt alles!',
          text: 'わけだ drückt aus, dass etwas eine <strong>logische Konsequenz</strong> ist — „Kein Wunder, dass...", „Das erklärt, warum...", „Also ist es so, dass...". Der Sprecher zieht einen Schluss aus bekannten Fakten.',
          examples: [
            { jp: '彼は10年日本に住んでいたのか。日本語が上手なわけだ。', romaji: 'Kare wa jūnen Nihon ni sunde ita no ka. Nihongo ga jōzu na wake da.', de: 'Er hat 10 Jahre in Japan gelebt? Kein Wunder, dass sein Japanisch so gut ist!' },
            { jp: '電車が止まっているのか。遅刻するわけだ。', romaji: 'Densha ga tomatte iru no ka. Chikoku suru wake da.', de: 'Die Züge stehen still? Dann ist es logisch, dass man zu spät kommt.' },
            { jp: '一日中歩いたんだ。疲れたわけだね。', romaji: 'Ichinichijū aruita n da. Tsukareta wake da ne.', de: 'Du bist den ganzen Tag gelaufen? Kein Wunder, dass du müde bist.' }
          ]
        },
        {
          heading: 'わけがない — Unmöglich!',
          text: 'わけがない drückt aus, dass etwas <strong>logisch unmöglich</strong> ist oder absolut nicht stimmen kann. Stärker als ～はずがない. Im Deutschen: „Es kann unmöglich sein, dass...", „Auf keinen Fall!" Der Sprecher weist etwas mit Nachdruck zurück.',
          examples: [
            { jp: 'そんな簡単にできるわけがない。', romaji: 'Sonna kantan ni dekiru wake ga nai.', de: 'Es kann doch nicht sein, dass das so einfach geht!' },
            { jp: '彼が犯人であるわけがない。', romaji: 'Kare ga hannin de aru wake ga nai.', de: 'Er kann unmöglich der Täter sein.' },
            { jp: '知らなかったわけがないだろう。', romaji: 'Shiranakatta wake ga nai darō.', de: 'Du kannst doch nicht behaupten, du hättest das nicht gewusst!' }
          ],
          tip: 'Umgangssprachlich oft verkürzt: わけない (ohne が). „そんなの無理に決まってる！" hat einen ähnlichen Sinn, aber わけがない klingt logischer und weniger emotional.'
        },
        {
          heading: 'わけにはいかない — Ich darf/kann nicht',
          text: 'わけにはいかない drückt aus, dass man etwas <strong>aus sozialen, moralischen oder praktischen Gründen nicht tun kann</strong> — selbst wenn man vielleicht möchte. Es geht um äußere Umstände, Verantwortung oder soziale Erwartungen. Im Deutschen: „Ich kann es mir nicht erlauben, ...".',
          examples: [
            { jp: '試験があるから遊んでいるわけにはいかない。', romaji: 'Shiken ga aru kara asonde iru wake ni wa ikanai.', de: 'Weil ich eine Prüfung habe, kann ich es mir nicht leisten, herumzuspielen.' },
            { jp: '約束した以上、やめるわけにはいかない。', romaji: 'Yakusoku shita ijō, yameru wake ni wa ikanai.', de: 'Da ich es versprochen habe, kann ich nicht einfach aufhören.' },
            { jp: '上司にそんなことを言うわけにはいかない。', romaji: 'Jōshi ni sonna koto o iu wake ni wa ikanai.', de: 'Ich kann meinem Vorgesetzten so etwas unmöglich sagen.' }
          ]
        },
        {
          heading: 'わけではない — Nicht unbedingt',
          text: 'わけではない ist eine <strong>teilweise Verneinung</strong> — „Es ist nicht so, dass...", „Das heißt nicht, dass...". Man korrigiert damit eine falsche Annahme, ohne komplett zu widersprechen. Sanfter als わけがない.',
          examples: [
            { jp: '嫌いなわけではないけど、今日はちょっと…', romaji: 'Kirai na wake de wa nai kedo, kyō wa chotto...', de: 'Es ist nicht so, dass ich es nicht mag, aber heute ist es etwas...' },
            { jp: '日本語が上手なわけではないが、日常会話はできる。', romaji: 'Nihongo ga jōzu na wake de wa nai ga, nichijō kaiwa wa dekiru.', de: 'Ich bin nicht besonders gut in Japanisch, aber Alltagsgespräche kann ich führen.' }
          ],
          tip: 'わけではない = „nicht unbedingt" (teilweise Verneinung). わけがない = „auf keinen Fall" (totale Verneinung). Der Unterschied ist entscheidend!'
        }
      ]
    },

    // ===================== LEKTION 26 =====================
    {
      id: 'lesson-26',
      number: 26,
      title: '～として & ～にとって',
      subtitle: 'Rollen und Perspektiven',
      level: 'N3/N2',
      intro: 'Japanisch kann sehr präzise ausdrücken, aus welcher Perspektive oder in welcher Rolle jemand etwas tut oder erlebt. ～として bedeutet „als" (in einer bestimmten Eigenschaft), während ～にとって „für" (aus der Sicht von) bedeutet. Beide Ausdrücke klingen auf den ersten Blick ähnlich, aber sie beleuchten ganz unterschiedliche Aspekte einer Situation.',
      sections: [
        {
          heading: 'として — „Als" (in einer Rolle)',
          text: 'として wird an ein Nomen angehängt und bedeutet <strong>„als" oder „in der Eigenschaft von"</strong>. Es definiert, in welcher Rolle, Funktion oder Kapazität jemand handelt oder etwas betrachtet wird.',
          examples: [
            { jp: '友人として忠告する。', romaji: 'Yūjin to shite chūkoku suru.', de: 'Als Freund rate ich dir davon ab.' },
            { jp: '東京は首都として発展してきた。', romaji: 'Tōkyō wa shuto to shite hatten shite kita.', de: 'Tokyo hat sich als Hauptstadt entwickelt.' },
            { jp: '留学生として日本に来ました。', romaji: 'Ryūgakusei to shite Nihon ni kimashita.', de: 'Ich kam als Austauschstudent nach Japan.' },
          ]
        },
        {
          heading: 'にとって — „Für" (aus der Sicht von)',
          text: 'にとって wird an ein Nomen (meist eine Person oder Gruppe) angehängt und bedeutet <strong>„für" oder „aus der Sicht von"</strong>. Es drückt eine subjektive Bewertung aus der Perspektive dieser Person aus.',
          examples: [
            { jp: '私にとって家族が一番大切だ。', romaji: 'Watashi ni totte kazoku ga ichiban taisetsu da.', de: 'Für mich ist Familie das Wichtigste.' },
            { jp: '子供にとってこの映画は怖すぎる。', romaji: 'Kodomo ni totte kono eiga wa kowasugiru.', de: 'Für Kinder ist dieser Film zu gruselig.' },
            { jp: '日本人にとって当たり前のことでも、外国人には不思議に見える。', romaji: 'Nihonjin ni totte atarimae no koto demo, gaikokujin ni wa fushigi ni mieru.', de: 'Was für Japaner selbstverständlich ist, wirkt auf Ausländer manchmal seltsam.' }
          ],
          tip: 'にとって steht immer vor einer Bewertung (gut/schlecht/wichtig/schwierig...). Es leitet ein: „Aus DIESER Perspektive ist es SO."'
        },
        {
          heading: 'Der Unterschied in der Praxis',
          text: 'Der Kern: <strong>として = objektive Rolle</strong> (was bin ich?), <strong>にとって = subjektive Perspektive</strong> (wie sehe ich es?). Man kann beide über die gleiche Person verwenden, aber sie beleuchten unterschiedliche Aspekte.',
          examples: [
            { jp: '教師として生徒を指導する。', romaji: 'Kyōshi to shite seito o shidō suru.', de: 'Als Lehrer leite ich die Schüler an. (Meine Rolle)' },
            { jp: '教師にとって生徒の成長が一番嬉しい。', romaji: 'Kyōshi ni totte seito no seichō ga ichiban ureshii.', de: 'Für einen Lehrer ist das Wachstum der Schüler am erfreulichsten. (Meine Perspektive)' },
            { jp: '彼は俳優としては有名だ。', romaji: 'Kare wa haiyū to shite wa yūmei da.', de: 'Als Schauspieler ist er berühmt. (In dieser Rolle)' },
          ]
        }
      ]
    },

    // ===================== LEKTION 27 =====================
    {
      id: 'lesson-27',
      number: 27,
      title: '～一方で & ～反面',
      subtitle: 'Zwei Seiten einer Medaille',
      level: 'N2',
      intro: 'Das Leben ist voller Widersprüche, und Japanisch hat elegante Werkzeuge, um sie auszudrücken. ～一方で (ippō de) und ～反面 (hanmen) zeigen beide eine Gegensätzlichkeit — „Einerseits... andererseits..." — aber mit unterschiedlichen Nuancen. ～一方で präsentiert parallel existierende Tatsachen, während ～反面 die unerwartete Kehrseite einer Eigenschaft beleuchtet. Beide sind typische N2-Strukturen, die in Zeitungsartikeln, Berichten und gehobener Sprache allgegenwärtig sind.',
      sections: [
        {
          heading: '一方で — Andererseits, gleichzeitig',
          text: '一方(で) verbindet zwei <strong>gegensätzliche oder parallele Fakten</strong>. Es kann „andererseits", „währenddessen" oder „gleichzeitig" bedeuten. Der Kontrast muss nicht negativ sein — es können einfach zwei verschiedene Aspekte nebeneinandergestellt werden.',
          examples: [
            { jp: '都市部の人口は増加する一方で、地方は過疎化が進んでいる。', romaji: 'Toshibu no jinkō wa zōka suru ippō de, chihō wa kasoka ga susunde iru.', de: 'Während die Bevölkerung in Städten zunimmt, schreitet die Entvölkerung auf dem Land voran.' },
            { jp: '彼は厳しい一方で、とても面倒見がいい。', romaji: 'Kare wa kibishii ippō de, totemo mendōmi ga ii.', de: 'Er ist einerseits streng, andererseits kümmert er sich sehr gut.' },
            { jp: 'SNSは便利な一方で、プライバシーの問題もある。', romaji: 'SNS wa benri na ippō de, puraibashī no mondai mo aru.', de: 'Social Media ist einerseits praktisch, andererseits gibt es Datenschutzprobleme.' }
          ],
          tip: '一方で steht nach: Verb-Wörterbuchform, い-Adjektiv, な-Adjektiv + な/である, Nomen + の/である.'
        },
        {
          heading: '一方だ — Immer weiter in eine Richtung',
          text: '一方だ (ippō da) als Satzende hat eine ganz andere Bedeutung: Eine Entwicklung geht <strong>immer weiter in eine Richtung</strong>, ohne anzuhalten. Oft negativ oder besorgt. Im Deutschen: „Es wird immer schlimmer", „Es nimmt kein Ende".',
          examples: [
            { jp: '物価は上がる一方だ。', romaji: 'Bukka wa agaru ippō da.', de: 'Die Preise steigen und steigen.' },
            { jp: '環境問題は悪化する一方だ。', romaji: 'Kankyō mondai wa akka suru ippō da.', de: 'Die Umweltprobleme werden immer schlimmer.' },
            { jp: '借金が増える一方で、どうにもならない。', romaji: 'Shakkin ga fueru ippō de, dō ni mo naranai.', de: 'Die Schulden wachsen immer weiter, und man kann nichts dagegen tun.' }
          ]
        },
        {
          heading: '反面 — Die Kehrseite',
          text: '反面 beleuchtet die <strong>unerwartete oder gegensätzliche Seite</strong> einer Eigenschaft derselben Sache oder Person. Es ist immer ein Kontrast <strong>innerhalb eines Subjekts</strong> — nicht zwischen zwei verschiedenen Dingen. Im Deutschen: „Auf der anderen Seite..." oder „Gleichzeitig aber auch...".',
          examples: [
            { jp: '彼女は優しい反面、頑固なところがある。', romaji: 'Kanojo wa yasashii hanmen, ganko na tokoro ga aru.', de: 'Sie ist freundlich, hat aber auf der anderen Seite auch eine sture Seite.' },
            { jp: '田舎は静かな反面、買い物が不便だ。', romaji: 'Inaka wa shizuka na hanmen, kaimono ga fuben da.', de: 'Das Land ist zwar ruhig, aber Einkaufen ist unpraktisch.' },
            { jp: 'この仕事は給料が高い反面、ストレスも多い。', romaji: 'Kono shigoto wa kyūryō ga takai hanmen, sutoresu mo ōi.', de: 'Dieser Job ist zwar gut bezahlt, aber dafür auch sehr stressig.' }
          ],
          tip: '一方で = kann verschiedene Subjekte vergleichen. 反面 = immer das gleiche Subjekt mit zwei gegensätzlichen Eigenschaften.'
        }
      ]
    },

    // ===================== LEKTION 28 =====================
    {
      id: 'lesson-28',
      number: 28,
      title: '～に対して & ～について',
      subtitle: 'Gegenüber und Über',
      level: 'N2',
      intro: 'Wenn du über jemanden oder etwas sprichst, kommt es auf die Perspektive an: Richtest du deine Handlung auf ein Gegenüber (に対して), oder sprichst du über ein Thema (について)? Diese beiden Ausdrücke werden oft verwechselt, aber der Unterschied ist fundamental. に対して richtet sich an ein Ziel oder stellt einen Kontrast her. について markiert ein Thema, über das gesprochen oder nachgedacht wird.',
      sections: [
        {
          heading: 'に対して — Gegenüber, im Gegensatz zu',
          text: 'に対して hat zwei Hauptbedeutungen: 1) <strong>„gegenüber"</strong> — eine Handlung oder Haltung, die auf jemanden/etwas gerichtet ist. 2) <strong>„im Gegensatz zu"</strong> — ein direkter Kontrast zwischen zwei Dingen.',
          examples: [
            { jp: '先生は生徒に対して厳しい。', romaji: 'Sensei wa seito ni taishite kibishii.', de: 'Der Lehrer ist gegenüber den Schülern streng.' },
            { jp: '彼のやり方に対して反対意見が出た。', romaji: 'Kare no yarikata ni taishite hantai iken ga deta.', de: 'Gegenüber seiner Vorgehensweise kam Widerspruch auf.' },
            { jp: '男性の平均寿命が81歳であるのに対して、女性は87歳だ。', romaji: 'Dansei no heikin jumyō ga 81-sai de aru no ni taishite, josei wa 87-sai da.', de: 'Während die durchschnittliche Lebenserwartung der Männer 81 Jahre beträgt, liegt die der Frauen bei 87.' }
          ]
        },
        {
          heading: 'について — Über, bezüglich',
          text: 'について markiert ein <strong>Thema</strong>, über das man spricht, nachdenkt, schreibt oder informiert. Im Deutschen: „über", „bezüglich", „was ... betrifft". Neutraler und thematischer als に対して.',
          examples: [
            { jp: '日本の文化について研究している。', romaji: 'Nihon no bunka ni tsuite kenkyū shite iru.', de: 'Ich forsche über die japanische Kultur.' },
            { jp: 'この問題について話し合いましょう。', romaji: 'Kono mondai ni tsuite hanashiaimashō.', de: 'Lassen Sie uns über dieses Problem sprechen.' },
            { jp: '彼女については何も知りません。', romaji: 'Kanojo ni tsuite wa nani mo shirimasen.', de: 'Über sie weiß ich nichts.' }
          ]
        },
        {
          heading: 'Der entscheidende Unterschied',
          text: '<strong>について = Thema</strong> (worüber reden wir?). <strong>に対して = Ziel/Gegenüber</strong> (auf wen ist etwas gerichtet?). Ein einfacher Test: Wenn du im Deutschen „über" sagen würdest → について. Wenn du „gegenüber" sagen würdest → に対して.',
          examples: [
            { jp: '環境問題について考える。', romaji: 'Kankyō mondai ni tsuite kangaeru.', de: 'Über Umweltprobleme nachdenken. (Thema)' },
            { jp: '環境問題に対して行動を起こす。', romaji: 'Kankyō mondai ni taishite kōdō o okosu.', de: 'Gegenüber Umweltproblemen Maßnahmen ergreifen. (Ziel einer Aktion)' },
            { jp: '日本語について質問がある。', romaji: 'Nihongo ni tsuite shitsumon ga aru.', de: 'Ich habe eine Frage über Japanisch. (Thema der Frage)' },
          ],
          tip: 'Verwandte Formen: に関して (formeller als について), に対する + Nomen (als Adjektiv: „die Haltung gegenüber...").'
        }
      ]
    },

    // ===================== LEKTION 29 =====================
    {
      id: 'lesson-29',
      number: 29,
      title: '～ものだ & ～ものではない',
      subtitle: 'So ist das eben',
      level: 'N2',
      intro: 'もの (oft abgekürzt als もん) ist eines der vielseitigsten Wörter der japanischen Grammatik. Je nach Konstruktion drückt es Nostalgie, allgemeine Wahrheiten, soziale Erwartungen oder emotionale Ausrufe aus. Die verschiedenen Verwendungen fühlen sich zunächst unzusammenhängend an, aber sie teilen einen Kern: ものだ verbindet persönliche Erfahrung mit allgemeingültigen Wahrheiten oder Normen.',
      sections: [
        {
          heading: 'ものだ — Nostalgie: „Früher war das so..."',
          text: 'Verb-た-Form + ものだ drückt <strong>nostalgische Erinnerungen</strong> aus — Dinge, die man früher regelmäßig getan hat. Im Deutschen: „Ich habe oft...", „Damals hat man immer...".',
          examples: [
            { jp: '子供のころ、よくこの公園で遊んだものだ。', romaji: 'Kodomo no koro, yoku kono kōen de asonda mono da.', de: 'Als Kind habe ich oft in diesem Park gespielt.' },
            { jp: '昔はよく夜遅くまで勉強したものだ。', romaji: 'Mukashi wa yoku yoru osoku made benkyō shita mono da.', de: 'Früher habe ich oft bis spät in die Nacht gelernt.' },
            { jp: 'おばあちゃんがよくこの歌を歌ったものだ。', romaji: 'Obāchan ga yoku kono uta o utatta mono da.', de: 'Oma hat dieses Lied oft gesungen.' }
          ],
          tip: 'Diese Form hat einen warmen, sentimentalen Klang. Man verwendet sie für schöne oder bedeutsame Erinnerungen.'
        },
        {
          heading: 'ものだ — Allgemeine Wahrheit: „So ist das eben"',
          text: 'Verb-Wörterbuchform / Adjektiv + ものだ drückt eine <strong>allgemeine Wahrheit oder Naturgesetzlichkeit</strong> aus. Im Deutschen: „So ist das nun mal", „Es liegt in der Natur der Sache, dass...".',
          examples: [
            { jp: '人は誰でも間違えるものだ。', romaji: 'Hito wa dare demo machigaeru mono da.', de: 'Jeder Mensch macht Fehler — das liegt in der Natur der Sache.' },
            { jp: '月日が経つのは早いものだ。', romaji: 'Tsukihi ga tatsu no wa hayai mono da.', de: 'Wie schnell die Zeit vergeht!' },
            { jp: '親というものは心配するものだ。', romaji: 'Oya to iu mono wa shinpai suru mono da.', de: 'Eltern machen sich nun mal Sorgen — so ist das.' }
          ]
        },
        {
          heading: 'ものではない — Das tut man nicht',
          text: 'ものではない drückt eine <strong>soziale Norm oder Erwartung</strong> aus — etwas, das man nicht tun <em>sollte</em>. Es ist kein strenges Verbot, sondern eher ein „das gehört sich nicht" oder „das tut man nicht". Typisch für Ratschläge von Älteren.',
          examples: [
            { jp: '人の悪口を言うものではない。', romaji: 'Hito no waruguchi o iu mono de wa nai.', de: 'Man redet nicht schlecht über andere.' },
            { jp: '食べ物を粗末にするものではない。', romaji: 'Tabemono o somatsu ni suru mono de wa nai.', de: 'Man verschwendet kein Essen.' },
            { jp: '嘘をつくものではない。', romaji: 'Uso o tsuku mono de wa nai.', de: 'Man lügt nicht.' }
          ],
          tip: 'ものではない klingt wie ein weiser Ratschlag, nicht wie ein Befehl. Typischer Kontext: Großeltern zu Enkeln, Lehrer zu Schülern, Mentor zu Mentee.'
        },
        {
          heading: 'ものだから — Ausrede: „Weil nämlich..."',
          text: 'ものだから (umgangssprachlich: もんだから) wird als <strong>Entschuldigung oder Erklärung</strong> verwendet. Es impliziert: „Ich konnte nichts dafür, weil die Umstände so waren." Im Deutschen: „Weil es eben so war, dass...".',
          examples: [
            { jp: '電車が遅れたものだから、遅刻してしまった。', romaji: 'Densha ga okureta mono dakara, chikoku shite shimatta.', de: 'Weil der Zug nun mal Verspätung hatte, bin ich zu spät gekommen.' },
            { jp: '急に雨が降ってきたものだから、傘を買った。', romaji: 'Kyū ni ame ga futte kita mono dakara, kasa o katta.', de: 'Weil es plötzlich angefangen hat zu regnen, habe ich einen Schirm gekauft.' }
          ]
        }
      ]
    },

    // ===================== LEKTION 30 =====================
    {
      id: 'lesson-30',
      number: 30,
      title: '～てこそ & ～からこそ',
      subtitle: 'Gerade weil — gerade dann',
      level: 'N2',
      intro: 'こそ ist ein Verstärkungspartikel, der betont: „GENAU das ist es!" In Kombination mit てこそ und からこそ entstehen zwei kraftvolle Ausdrücke, die im Japanischen eine besondere Rolle spielen. ～てこそ sagt: „Erst wenn man DAS tut, DANN ergibt sich das Ergebnis." ～からこそ sagt: „GERADE WEIL es so ist, deshalb..." Beide drücken eine starke Überzeugung aus und sind typisch für Reden, Essays und emotionale Aussagen.',
      sections: [
        {
          heading: 'こそ — Der Verstärkungspartikel',
          text: 'Bevor wir die Kombinationen anschauen, kurz zu こそ allein: Es hebt ein Wort oder eine Phrase als den <strong>entscheidenden Punkt</strong> hervor. Im Deutschen: „GENAU das", „Gerade DAS". Du kennst es vielleicht schon aus festen Wendungen.',
          examples: [
            { jp: 'こちらこそよろしくお願いします。', romaji: 'Kochira koso yoroshiku onegai shimasu.', de: 'Ganz MEINERSEITS, freut mich.' },
            { jp: '今度こそ合格するぞ！', romaji: 'Kondo koso gōkaku suru zo!', de: 'DIESES MAL bestehe ich!' },
            { jp: 'あなたこそ大丈夫ですか。', romaji: 'Anata koso daijōbu desu ka.', de: 'Geht es IHNEN denn gut? (Sorge um den anderen, nicht um sich.)' }
          ]
        },
        {
          heading: 'てこそ — Erst dann, wenn...',
          text: 'Verb-て-Form + こそ drückt aus, dass etwas <strong>erst durch eine bestimmte Handlung</strong> seine wahre Bedeutung oder seinen vollen Wert erhält. Im Deutschen: „Erst wenn man..., dann..." oder „Nur durch...".',
          examples: [
            { jp: '失敗してこそ成長できる。', romaji: 'Shippai shite koso seichō dekiru.', de: 'Erst durch Scheitern kann man wachsen.' },
            { jp: '自分でやってこそ意味がある。', romaji: 'Jibun de yatte koso imi ga aru.', de: 'Erst wenn man es selbst macht, hat es einen Sinn.' },
            { jp: '苦労してこそ本当の喜びがわかる。', romaji: 'Kurō shite koso hontō no yorokobi ga wakaru.', de: 'Erst wenn man Schwierigkeiten durchlebt hat, versteht man wahre Freude.' }
          ],
          tip: 'てこそ hat oft einen philosophischen oder motivierenden Ton. Typisch für Lebensweisheiten, Reden und inspirierende Texte.'
        },
        {
          heading: 'からこそ — Gerade weil',
          text: 'からこそ drückt einen <strong>Grund aus, der besonders betont wird</strong> — „Gerade WEIL es so ist, deshalb...". Es hebt hervor, dass der Grund nicht trivial ist, sondern der entscheidende Faktor. Oft in emotionalen oder überzeugenden Kontexten.',
          examples: [
            { jp: '好きだからこそ厳しく言うんだ。', romaji: 'Suki da kara koso kibishiku iu n da.', de: 'Gerade WEIL ich dich mag, sage ich es dir direkt.' },
            { jp: '大変だからこそやりがいがある。', romaji: 'Taihen da kara koso yarigai ga aru.', de: 'Gerade WEIL es schwer ist, lohnt es sich.' },
            { jp: '経験があるからこそ言えることだ。', romaji: 'Keiken ga aru kara koso ieru koto da.', de: 'Gerade WEIL ich Erfahrung habe, kann ich das sagen.' },
          ]
        },
        {
          heading: 'Vergleich & Nuancen',
          text: 'Beide Ausdrücke betonen, aber auf unterschiedliche Weise:<ul class="lesson-rules"><li><strong>てこそ</strong> → betont die <em>Voraussetzung</em>: „Erst WENN man X tut, DANN Y"</li><li><strong>からこそ</strong> → betont den <em>Grund</em>: „GERADE WEIL X, deshalb Y"</li></ul>てこそ schaut nach vorne (Bedingung → Ergebnis), からこそ schaut zurück (Grund → Folge).',
          examples: [
            { jp: '練習してこそ上手になれる。', romaji: 'Renshū shite koso jōzu ni nareru.', de: 'Erst DURCH Üben wird man gut. (Bedingung)' },
            { jp: '毎日練習したからこそ上手になったんだ。', romaji: 'Mainichi renshū shita kara koso jōzu ni natta n da.', de: 'GERADE WEIL ich jeden Tag geübt habe, bin ich gut geworden. (Grund)' }
          ],
          tip: 'こそ-Ausdrücke verleihen deinem Japanisch Tiefe und Überzeugungskraft. Sie sind das sprachliche Äquivalent eines „Mikrofon fallen lassen"-Moments.'
        }
      ]
    },

    // ===================== LEKTION 31 =====================
    {
      id: 'lesson-31',
      number: 31,
      title: '～てもいい / ～てはいけない',
      subtitle: 'Erlaubnisse & Verbote',
      level: 'N4',
      intro: 'Darf ich? Darfst du nicht! Muss ich? — Drei der häufigsten Fragen im Alltag, und das Japanische hat elegante Konstruktionen dafür. ～てもいい gibt grünes Licht, ～てはいけない zieht die rote Karte, und ～なくてもいい nimmt den Druck raus. Diese drei Formen gehören zum absoluten Grundwortschatz und tauchen in praktisch jeder Alltagssituation auf — vom Klassenzimmer über das Büro bis zum Restaurant. Wer sie sicher beherrscht, kann Erlaubnisse einholen, Regeln verstehen und höflich Grenzen setzen. Besonders wichtig: Der Unterschied zwischen „du darfst nicht" und „du musst nicht" ist im Japanischen glasklar — anders als im Deutschen, wo er gerne verwechselt wird.',
      sections: [
        {
          heading: '～てもいい — Erlaubnis: „Du darfst..."',
          text: 'Die て-Form + もいい drückt eine <strong>Erlaubnis</strong> aus: „Es ist in Ordnung, wenn du..." Im Deutschen: „Du darfst...", „Es ist okay, wenn..." Als Frage (～てもいいですか) wird daraus eine höfliche Bitte um Erlaubnis. Die Konstruktion ist denkbar einfach: Man nimmt die て-Form des Verbs und hängt もいい (oder höflicher もいいですか) an. Das いい kann in formellem Kontext durch よろしい ersetzt werden.',
          examples: [
            { jp: 'ここに座ってもいいですか。', romaji: 'Koko ni suwatte mo ii desu ka.', de: 'Darf ich mich hier hinsetzen?' },
            { jp: '写真を撮ってもいいですよ。', romaji: 'Shashin o totte mo ii desu yo.', de: 'Sie dürfen ruhig Fotos machen.' },
            { jp: '明日は来なくてもいいですか。', romaji: 'Ashita wa konakute mo ii desu ka.', de: 'Ist es in Ordnung, wenn ich morgen nicht komme?' }
          ],
          tip: 'In sehr formellen Situationen ersetzt man いい durch よろしい: 質問してもよろしいでしょうか (Dürfte ich eine Frage stellen?). Das klingt deutlich respektvoller und wird bei Vorgesetzten oder Kunden verwendet.'
        },
        {
          heading: '～てはいけない / ～てはだめ — Verbot: „Du darfst nicht..."',
          text: 'Die て-Form + はいけない (oder はだめ) drückt ein <strong>Verbot</strong> aus: „Du darfst nicht...", „Man darf nicht...". はいけない ist die neutrale bis formelle Variante und wird in Regeln, Vorschriften und von Autoritätspersonen verwendet. はだめ ist die umgangssprachliche Variante — lockerer, aber genauso bestimmt. In der gesprochenen Sprache wird ては oft zu ちゃ (nach て-Laut) bzw. じゃ (nach で-Laut) verkürzt: 食べちゃだめ, 飲んじゃだめ.',
          examples: [
            { jp: 'ここでタバコを吸ってはいけません。', romaji: 'Koko de tabako o sutte wa ikemasen.', de: 'Hier darf man nicht rauchen.' },
            { jp: '試験中に辞書を使ってはいけない。', romaji: 'Shikenchū ni jisho o tsukatte wa ikenai.', de: 'Während der Prüfung darf man kein Wörterbuch benutzen.' },
            { jp: '走っちゃだめだよ！', romaji: 'Hashiccha dame da yo!', de: 'Du darfst nicht rennen!' }
          ],
          tip: '～てはいけない ist ein echtes Verbot (Regel/Vorschrift), während ～ないでください eine höfliche Bitte ist. „Hier darf man nicht rauchen" (てはいけない) vs. „Bitte rauchen Sie hier nicht" (ないでください) — der Unterschied zwischen Gesetz und Höflichkeit.'
        },
        {
          heading: '～なくてもいい — Nicht nötig: „Du musst nicht..."',
          text: 'Die ない-Form (ohne い) + くてもいい bedeutet: „Du musst nicht...", „Es ist nicht nötig, dass..." Das ist ein entscheidender Unterschied zu ～てはいけない! <strong>てはいけない = Verbot</strong> (du darfst nicht), <strong>なくてもいい = keine Pflicht</strong> (du musst nicht, darfst aber). Im Deutschen wird „du musst nicht" und „du darfst nicht" im Alltag manchmal vermischt — im Japanischen sind die Formen glasklar getrennt. Wer den Unterschied beherrscht, vermeidet peinliche Missverständnisse.',
          examples: [
            { jp: '明日は早く来なくてもいいですよ。', romaji: 'Ashita wa hayaku konakute mo ii desu yo.', de: 'Du musst morgen nicht früh kommen. (Aber du darfst, wenn du willst.)' },
            { jp: '全部食べなくてもいいよ。', romaji: 'Zenbu tabenakute mo ii yo.', de: 'Du musst nicht alles aufessen.' },
            { jp: '無理しなくてもいいですよ。', romaji: 'Muri shinakute mo ii desu yo.', de: 'Du musst dich nicht überanstrengen.' }
          ],
          tip: 'Vergleiche: 食べてはいけない = „Du darfst nicht essen!" (Verbot) vs. 食べなくてもいい = „Du musst nicht essen." (Keine Pflicht, aber erlaubt). Dieser Unterschied ist auf dem JLPT ein beliebter Stolperstein!'
        }
      ]
    },

    // ===================== LEKTION 32 =====================
    {
      id: 'lesson-32',
      number: 32,
      title: '～ばかりか / ～のみならず',
      subtitle: 'Nicht nur... sondern auch',
      level: 'N3',
      intro: 'Wenn man sagen will, dass etwas über das Erwartete hinausgeht — „Nicht nur X, sondern sogar Y!" — braucht man ～ばかりか oder ～のみならず. Beide drücken eine Steigerung aus, aber in unterschiedlichen Registern. ～ばかりか ist die lebendige, gesprochene Form mit einem Hauch Überraschung, während ～のみならず in Zeitungsartikeln und Reden zu Hause ist. Zusammen mit dem neutralen ～だけでなく bilden sie ein Dreierteam, das du je nach Situation einsetzen kannst.',
      sections: [
        {
          heading: '～ばかりか — Nicht nur X, sondern sogar Y',
          text: '～ばかりか betont eine <strong>überraschende Steigerung</strong>: Nicht nur das eine, sondern sogar noch etwas Stärkeres kommt dazu. Es ist umgangssprachlich bis neutral und wird im Alltag häufig verwendet. Bildung: Verb / i-Adjektiv / na-Adjektiv (+ な/である) / Nomen + ばかりか. Im Nachsatz folgt oft さらに, も oder sogar まで, um die Eskalation zu unterstreichen.',
          examples: [
            { jp: '彼は英語ばかりか、フランス語も話せる。', romaji: 'Kare wa eigo bakari ka, furansugo mo hanaseru.', de: 'Er spricht nicht nur Englisch, sondern auch Französisch.' },
            { jp: '雨が降っているばかりか、風まで強くなってきた。', romaji: 'Ame ga futte iru bakari ka, kaze made tsuyoku natte kita.', de: 'Es regnet nicht nur, sondern es wird sogar windig.' },
            { jp: 'この店は安いばかりか、味もいい。', romaji: 'Kono mise wa yasui bakari ka, aji mo ii.', de: 'Dieses Restaurant ist nicht nur günstig, sondern auch lecker.' }
          ],
          tip: 'ばかりか kann auch negative Steigerungen ausdrücken: 「遅刻したばかりか、宿題も忘れた。」(Er kam nicht nur zu spät, sondern hat sogar die Hausaufgaben vergessen.) — die Eskalation funktioniert in beide Richtungen.'
        },
        {
          heading: '～のみならず — Formelles „Nicht nur..."',
          text: '～のみならず ist die <strong>formelle, schriftsprachliche</strong> Variante von ～ばかりか. Man findet sie in Nachrichtenartikeln, akademischen Texten und offiziellen Reden. Bildung: Nomen / Verb (Wörterbuchform) + のみならず. Die Bedeutung ist identisch mit ばかりか, der Ton aber deutlich gehobener.',
          examples: [
            { jp: 'この問題は日本のみならず、世界中で議論されている。', romaji: 'Kono mondai wa Nihon nomi narazu, sekaijū de giron sarete iru.', de: 'Dieses Problem wird nicht nur in Japan, sondern weltweit diskutiert.' },
            { jp: '彼女は学業のみならず、スポーツでも優れている。', romaji: 'Kanojo wa gakugyō nomi narazu, supōtsu de mo sugurete iru.', de: 'Sie ist nicht nur im Studium, sondern auch im Sport hervorragend.' },
            { jp: '環境汚染は健康のみならず、経済にも影響を与える。', romaji: 'Kankyō osen wa kenkō nomi narazu, keizai ni mo eikyō o ataeru.', de: 'Umweltverschmutzung wirkt sich nicht nur auf die Gesundheit, sondern auch auf die Wirtschaft aus.' }
          ],
          tip: 'のみならず klingt in alltäglichen Gesprächen übertrieben und steif — verwende es nur in schriftlichen oder formellen Kontexten. Im Gespräch unter Freunden wäre ばかりか oder だけじゃなくて natürlicher.'
        },
        {
          heading: 'Vergleich: ばかりか vs のみならず vs だけでなく',
          text: 'Alle drei bedeuten „nicht nur... sondern auch", unterscheiden sich aber in Register und Nuance:<ul class="lesson-rules"><li><strong>だけでなく</strong> → Neutral, passt überall. Die sichere Standardwahl.</li><li><strong>ばかりか</strong> → Umgangssprachlich bis neutral. Betont <strong>Überraschung und Eskalation</strong> — „Nicht nur das, sondern sogar DAS!"</li><li><strong>のみならず</strong> → Formell/schriftlich. Sachlich, objektiv — typisch für Nachrichten und Aufsätze.</li></ul>',
          examples: [
            { jp: '彼は日本語だけでなく、中国語もできる。', romaji: 'Kare wa nihongo dake de naku, chūgokugo mo dekiru.', de: 'Er kann nicht nur Japanisch, sondern auch Chinesisch. (Neutral)' },
            { jp: '成績が悪いばかりか、授業もサボっている。', romaji: 'Seiseki ga warui bakari ka, jugyō mo sabotte iru.', de: 'Die Noten sind nicht nur schlecht, er schwänzt sogar den Unterricht. (Eskalation!)' },
            { jp: '本校は国内のみならず海外でも高い評価を得ている。', romaji: 'Honkō wa kokunai nomi narazu kaigai de mo takai hyōka o ete iru.', de: 'Unsere Schule genießt nicht nur im Inland, sondern auch im Ausland hohes Ansehen. (Formell)' }
          ],
          tip: 'Faustregel für die JLPT-Prüfung: Wenn in der Aufgabe ein formeller Text steht, ist のみならず oft die richtige Antwort. Bei emotionaler Steigerung in der Umgangssprache passt ばかりか. Und だけでなく geht im Zweifel immer.'
        }
      ]
    },

    // ===================== LEKTION 33 =====================
    {
      id: 'lesson-33',
      number: 33,
      title: '～ばいい / ～たらいい',
      subtitle: 'Ratschläge geben',
      level: 'N3',
      intro: 'Was soll ich nur tun? — Eine der häufigsten Fragen im Alltag. Japanisch bietet dafür ein elegantes Duo: ～ばいい und ～たらいい. Beide bedeuten im Kern „Es wäre gut, wenn du...", aber sie unterscheiden sich in Nuance und Wärme. Das eine klingt etwas sachlicher und direkter, das andere weicher und empfehlender. Wer diese beiden Formen beherrscht, kann Ratschläge geben, die weder zu forsch noch zu vage klingen — eine Kunst, die im höflichen Japan besonders geschätzt wird.',
      sections: [
        {
          heading: 'ばいい — Klarer Ratschlag',
          text: 'Verb-ば-Form + いい drückt einen <strong>direkten, klaren Ratschlag</strong> aus: „Du musst nur X tun, dann ist es gut." Es hat einen leicht sachlichen Ton und sagt dem Gegenüber konkret, was die Lösung ist.',
          examples: [
            { jp: '分からなかったら、先生に聞けばいい。', romaji: 'Wakaranakattara, sensei ni kikeba ii.', de: 'Wenn du es nicht verstehst, frag einfach den Lehrer.' },
            { jp: '暑ければエアコンをつければいいよ。', romaji: 'Atsukereba eakon o tsukereba ii yo.', de: 'Wenn es dir heiß ist, mach einfach die Klimaanlage an.' },
            { jp: '時間がなければタクシーに乗ればいい。', romaji: 'Jikan ga nakereba takushī ni noreba ii.', de: 'Wenn du keine Zeit hast, nimm einfach ein Taxi.' }
          ],
          tip: 'ばいい kann auch als Frage verwendet werden: どうすればいい？ — „Was soll ich nur tun?" Das ist eine der häufigsten Phrasen im Japanischen.'
        },
        {
          heading: 'たらいい — Sanfter Vorschlag',
          text: 'Verb-たら-Form + いい ist ein <strong>weicherer, empfehlender Ratschlag</strong>. Es klingt wie „Wie wäre es, wenn du...?" oder „Es wäre gut, wenn du...". Oft mit よ am Ende für einen freundlichen Ton.',
          examples: [
            { jp: '疲れたら少し休んだらいいよ。', romaji: 'Tsukaretara sukoshi yasundara ii yo.', de: 'Wenn du müde bist, ruh dich ruhig ein bisschen aus.' },
            { jp: '日本に行ったら京都を見たらいいですよ。', romaji: 'Nihon ni ittara Kyōto o mitara ii desu yo.', de: 'Wenn du nach Japan gehst, solltest du Kyoto besuchen.' },
            { jp: '彼に直接聞いてみたらいいんじゃない？', romaji: 'Kare ni chokusetsu kiite mitara ii n ja nai?', de: 'Wie wäre es, ihn direkt zu fragen?' }
          ]
        },
        {
          heading: 'Negative Ratschläge: ～なければいい / ～なかったらいい',
          text: 'Man kann auch raten, etwas <strong>nicht</strong> zu tun: ～なければいい oder ～なかったらいい. Im Deutschen: „Du musst es einfach nicht tun" oder „Es wäre besser, wenn du es nicht tust."',
          examples: [
            { jp: '嫌なら行かなければいい。', romaji: 'Iya nara ikanakereba ii.', de: 'Wenn du nicht willst, geh einfach nicht hin.' },
            { jp: 'そんなに心配しなかったらいいのに。', romaji: 'Sonna ni shinpai shinakattara ii noni.', de: 'Es wäre gut, wenn du dir nicht so viele Sorgen machen würdest.' },
            { jp: '食べ過ぎなければいいだけだよ。', romaji: 'Tabesuginakereba ii dake da yo.', de: 'Du musst einfach nur aufhören, zu viel zu essen.' }
          ],
          tip: 'のに am Ende fügt Bedauern hinzu: „Es wäre gut, WENN du es tun würdest... (aber du tust es leider nicht)."'
        },
        {
          heading: 'Vergleich: ばいい vs たらいい vs ほうがいい',
          text: 'Drei Wege, Ratschläge zu geben — mit zunehmender Stärke:<ul class="lesson-rules"><li><strong>たらいい</strong> → Sanfter Vorschlag: „Wie wäre es, wenn...?"</li><li><strong>ばいい</strong> → Klarer Ratschlag: „Du musst nur..."</li><li><strong>ほうがいい</strong> → Dringender Rat: „Du solltest besser..."</li></ul>',
          examples: [
            { jp: '医者に行ったらいいよ。', romaji: 'Isha ni ittara ii yo.', de: 'Du könntest zum Arzt gehen. (sanft)' },
            { jp: '医者に行けばいいよ。', romaji: 'Isha ni ikeba ii yo.', de: 'Geh einfach zum Arzt. (klar)' },
            { jp: '医者に行ったほうがいいよ。', romaji: 'Isha ni itta hō ga ii yo.', de: 'Du solltest wirklich zum Arzt gehen. (dringend)' }
          ]
        }
      ]
    },

    // ===================== LEKTION 34 =====================
    {
      id: 'lesson-34',
      number: 34,
      title: '～はずだ / ～はずがない',
      subtitle: 'Erwartungen und Unmöglichkeit',
      level: 'N3',
      intro: 'Manchmal ist man sich einer Sache ziemlich sicher — nicht weil man es gesehen hat, sondern weil es logisch sein MUSS. Und manchmal ist man sich genauso sicher, dass etwas absolut NICHT sein kann. はず ist das japanische Werkzeug für solche logischen Schlüsse. ～はずだ sagt: „Es müsste eigentlich so sein." ～はずがない sagt: „Das kann auf gar keinen Fall sein!" Zwischen diesen beiden Extremen liegt はずだった — „Eigentlich hätte es so sein sollen, aber..." Ein Dreiklang der Erwartung, der im Alltag unentbehrlich ist.',
      sections: [
        {
          heading: 'はずだ — Logische Erwartung',
          text: 'Verb / Adjektiv / Nomen + はずだ drückt eine <strong>begründete Erwartung</strong> aus: Man hat gute Gründe anzunehmen, dass etwas so ist. Im Deutschen: „Es müsste eigentlich...", „Es sollte normalerweise..." Es ist stärker als „vielleicht", aber schwächer als eine Tatsache.',
          examples: [
            { jp: '彼はもう着いたはずだ。', romaji: 'Kare wa mō tsuita hazu da.', de: 'Er müsste eigentlich schon angekommen sein.' },
            { jp: '予約したから、席があるはずです。', romaji: 'Yoyaku shita kara, seki ga aru hazu desu.', de: 'Weil ich reserviert habe, sollten Plätze da sein.' },
            { jp: 'この道が正しいはずだ。', romaji: 'Kono michi ga tadashii hazu da.', de: 'Dieser Weg müsste der richtige sein.' },
          ]
        },
        {
          heading: 'はずがない — Unmöglich!',
          text: 'はずがない drückt eine <strong>starke Überzeugung aus, dass etwas unmöglich ist</strong>. Im Deutschen: „Das kann nicht sein!", „Das ist unmöglich!" Oft in emotionalen Kontexten — Überraschung, Empörung, Unglaube.',
          examples: [
            { jp: 'あの人が犯人のはずがない！', romaji: 'Ano hito ga hannin no hazu ga nai!', de: 'Diese Person kann unmöglich der Täter sein!' },
            { jp: 'こんな簡単な問題が解けないはずがない。', romaji: 'Konna kantan na mondai ga tokenai hazu ga nai.', de: 'Es kann nicht sein, dass du so eine einfache Aufgabe nicht lösen kannst.' },
            { jp: '彼が嘘をつくはずがない。', romaji: 'Kare ga uso o tsuku hazu ga nai.', de: 'Er würde niemals lügen. (Das kann nicht sein.)' }
          ],
          tip: 'はずがない ist emotional stärker als das neutrale ないはずだ (erwarte, dass es nicht so ist). はずがない drückt persönliche Überzeugung und Empörung aus.'
        },
        {
          heading: 'はずだった — Enttäuschte Erwartung',
          text: 'はずだった (Vergangenheit) beschreibt eine <strong>Erwartung, die nicht eingetreten ist</strong>. Im Deutschen: „Eigentlich hätte...", „Es war geplant, dass..." Es schwingt immer eine leichte Enttäuschung mit.',
          examples: [
            { jp: '今日届くはずだったのに、まだ来ない。', romaji: 'Kyō todoku hazu datta noni, mada konai.', de: 'Es hätte heute ankommen sollen, aber es ist noch nicht da.' },
            { jp: '簡単なはずだったのに、すごく難しかった。', romaji: 'Kantan na hazu datta noni, sugoku muzukashikatta.', de: 'Es hätte einfach sein sollen, war aber sehr schwer.' },
            { jp: '6時に会うはずだったけど、彼は来なかった。', romaji: 'Roku-ji ni au hazu datta kedo, kare wa konakatta.', de: 'Wir hätten uns um 6 treffen sollen, aber er kam nicht.' }
          ]
        }
      ]
    },

    // ===================== LEKTION 35 =====================
    {
      id: 'lesson-35',
      number: 35,
      title: '～ように / ～ために',
      subtitle: 'Zweck und Ziel ausdrücken',
      level: 'N3',
      intro: 'Warum tust du das? — Eine fundamentale Frage, und das Japanische bietet zwei elegante Antworten: ために und ように. Beide drücken einen Zweck aus, aber auf grundlegend verschiedene Weise. ために ist direkt und zielstrebig: „Ich tue X, UM Y zu erreichen." ように ist indirekter: „Ich tue X, DAMIT Y möglich wird." Der Unterschied liegt in der Kontrolle — kannst du das Ziel direkt beeinflussen, oder hoffst du, dass es sich ergibt? Diese Unterscheidung ist typisch japanisch und verrät viel über die Denkweise der Sprache.',
      sections: [
        {
          heading: 'ために — Direktes Ziel',
          text: 'Verb-Wörterbuchform / Nomen + の + ために drückt einen <strong>direkten, bewussten Zweck</strong> aus. Das Subjekt hat volle Kontrolle über die Handlung. Im Deutschen: „Um ... zu ...", „Für ...".',
          examples: [
            { jp: '日本語を学ぶために日本に来た。', romaji: 'Nihongo o manabu tame ni Nihon ni kita.', de: 'Ich bin nach Japan gekommen, um Japanisch zu lernen.' },
            { jp: '試験に合格するためにたくさん勉強した。', romaji: 'Shiken ni gōkaku suru tame ni takusan benkyō shita.', de: 'Um die Prüfung zu bestehen, habe ich viel gelernt.' },
            { jp: '健康のために毎日走っています。', romaji: 'Kenkō no tame ni mainichi hashitte imasu.', de: 'Für meine Gesundheit laufe ich jeden Tag.' }
          ],
          tip: 'ために wird mit willentlichen Verben verwendet — Verben, bei denen das Subjekt bewusst handelt.'
        },
        {
          heading: 'ように — Indirektes Ziel / Wunsch',
          text: 'Verb-Wörterbuchform (oft Potenzialform oder ない-Form) + ように drückt einen <strong>indirekten Zweck</strong> aus. Das Ergebnis liegt nicht vollständig in der Hand des Sprechers. Im Deutschen: „Damit ...", „So dass ...".',
          examples: [
            { jp: '忘れないように手帳に書いた。', romaji: 'Wasurenai yō ni techō ni kaita.', de: 'Damit ich es nicht vergesse, habe ich es ins Notizbuch geschrieben.' },
            { jp: '聞こえるように大きい声で話した。', romaji: 'Kikoeru yō ni ōkii koe de hanashita.', de: 'Ich habe laut gesprochen, damit man mich hören kann.' },
            { jp: '子供でも分かるように説明した。', romaji: 'Kodomo demo wakaru yō ni setsumei shita.', de: 'Ich habe es so erklärt, dass sogar ein Kind es versteht.' }
          ]
        },
        {
          heading: 'Wann ために, wann ように?',
          text: 'Die Faustregel ist überraschend einfach:<ul class="lesson-rules"><li><strong>ために</strong> → Willentliche Verben (lernen, kaufen, gehen): Man kann das Ziel direkt kontrollieren</li><li><strong>ように</strong> → Nicht-willentliche Verben, Potenzialform, ない-Form: Das Ergebnis ist nicht direkt kontrollierbar</li></ul>',
          examples: [
            { jp: '大学に入るために勉強する。', romaji: 'Daigaku ni hairu tame ni benkyō suru.', de: 'Ich lerne, um an die Uni zu kommen. (direktes Ziel)' },
            { jp: '大学に入れるように勉強する。', romaji: 'Daigaku ni haireru yō ni benkyō suru.', de: 'Ich lerne, damit ich an die Uni kommen KANN. (Hoffnung)' },
            { jp: '風邪を引かないように暖かくしている。', romaji: 'Kaze o hikanai yō ni atatakaku shite iru.', de: 'Ich kleide mich warm, damit ich mich nicht erkälte. (nicht kontrollierbar)' }
          ],
          tip: 'Bei Potenzialform (～できる, ～える) und negativen Formen (～ない) verwendet man fast immer ように, nicht ために.'
        }
      ]
    },

    // ===================== LEKTION 36 =====================
    {
      id: 'lesson-36',
      number: 36,
      title: '～にしては / ～わりに',
      subtitle: 'Erwartungen & Widersprüche',
      level: 'N3',
      intro: 'Menschen haben Erwartungen — und die Realität weicht ständig davon ab. Im Japanischen gibt es zwei elegante Konstruktionen, um genau diese Diskrepanz auszudrücken: ～にしては und ～わりに. Beide sagen im Kern: „Eigentlich hätte ich X erwartet, aber Y ist der Fall." Der Unterschied liegt im Grad der Überraschung und in der Nuance. にしては betont das Unerwartete stärker — es ist fast immer überraschend. わりに ist neutraler und drückt eher ein Missverhältnis aus. Wer diese beiden Formen beherrscht, kann differenziert über Erwartungen, Enttäuschungen und angenehme Überraschungen sprechen — eine Fähigkeit, die im JLPT N3 und im Alltag gleichermaßen gefragt ist.',
      sections: [
        {
          heading: '～にしては — „Für einen.../Dafür, dass..."',
          text: 'Nomen / Verb (普通形) + にしては drückt aus, dass das Ergebnis <strong>im Widerspruch zur Erwartung</strong> steht. Man weiß, was normalerweise zu erwarten wäre, und stellt fest, dass die Realität anders aussieht. Im Deutschen: „Für einen...", „Dafür, dass...". Entscheidend: にしては impliziert <strong>immer</strong>, dass das Ergebnis überraschend ist — es weicht deutlich von der Norm ab. Die Überraschung kann positiv oder negativ sein.',
          examples: [
            { jp: '子供にしては、よく知っているね。', romaji: 'Kodomo ni shite wa, yoku shitte iru ne.', de: 'Für ein Kind weißt du erstaunlich viel.' },
            { jp: '日本に5年住んでいるにしては、日本語があまり上手じゃない。', romaji: 'Nihon ni go-nen sunde iru ni shite wa, nihongo ga amari jōzu ja nai.', de: 'Dafür, dass er seit 5 Jahren in Japan lebt, ist sein Japanisch nicht besonders gut.' },
            { jp: '初めてにしては、上手にできましたね。', romaji: 'Hajimete ni shite wa, jōzu ni dekimashita ne.', de: 'Dafür, dass es das erste Mal war, hast du es gut gemacht.' }
          ],
          tip: 'にしては setzt immer einen klaren Maßstab voraus: „Für X (= den Maßstab) ist Y überraschend." Ohne erkennbaren Maßstab klingt der Satz unnatürlich.'
        },
        {
          heading: '～わりに(は) — „Im Verhältnis zu.../Obwohl..."',
          text: 'Nomen の / な-Adj. な / い-Adj. / Verb (普通形) + わりに(は) drückt ein <strong>Missverhältnis</strong> aus — das Ergebnis steht nicht im erwarteten Verhältnis zur Voraussetzung. Im Deutschen: „Im Verhältnis zu...", „Obwohl..., trotzdem...". Anders als にしては muss die Überraschung nicht so stark sein. わりに beschreibt eher eine <strong>proportionale Abweichung</strong>: Man erwartet, dass A zu B führt, aber das Ergebnis ist unverhältnismäßig. わりに kann sowohl positive als auch negative Abweichungen ausdrücken.',
          examples: [
            { jp: 'この店は値段のわりに、おいしい。', romaji: 'Kono mise wa nedan no wari ni, oishii.', de: 'Dieses Restaurant ist im Verhältnis zum Preis lecker. (= günstig und trotzdem gut)' },
            { jp: '一生懸命勉強したわりに、成績が上がらなかった。', romaji: 'Isshōkenmei benkyō shita wari ni, seiseki ga agaranakatta.', de: 'Obwohl ich fleißig gelernt habe, sind meine Noten nicht besser geworden.' },
            { jp: '忙しいと言っているわりに、よく遊びに行っている。', romaji: 'Isogashii to itte iru wari ni, yoku asobi ni itte iru.', de: 'Obwohl er sagt, er sei beschäftigt, geht er oft aus.' }
          ]
        },
        {
          heading: 'Vergleich: にしては vs わりに',
          text: 'Beide drücken eine Abweichung von der Erwartung aus, aber mit unterschiedlicher Nuance:<ul class="lesson-rules"><li><strong>にしては</strong> → Starke Überraschung: „Für X ist das Ergebnis unerwartet!" Bezieht sich auf eine <em>Kategorie</em> oder <em>Eigenschaft</em> als Maßstab.</li><li><strong>わりに</strong> → Proportionales Missverhältnis: „Im Verhältnis zu X stimmt Y nicht." Eher sachlich, weniger überrascht.</li></ul>Ein Beispiel macht den Unterschied klar: „Für einen Anfänger ist das gut" (にしては — überraschend!) vs. „Obwohl er viel übt, ist er nicht so gut" (わりに — Missverhältnis).',
          examples: [
            { jp: '安いにしては、品質がいい。', romaji: 'Yasui ni shite wa, hinshitsu ga ii.', de: 'Dafür, dass es billig ist, ist die Qualität gut. (= überraschend gut!)' },
            { jp: '安いわりに、品質がいい。', romaji: 'Yasui wari ni, hinshitsu ga ii.', de: 'Im Verhältnis zum günstigen Preis ist die Qualität gut. (= sachliche Feststellung)' },
            { jp: '年齢にしては若く見える。', romaji: 'Nenrei ni shite wa wakaku mieru.', de: 'Für sein Alter sieht er jung aus. (= Überraschung über die Erscheinung)' }
          ],
          tip: 'Faustregel: Wenn du „Wow, das hätte ich nicht erwartet!" sagen willst, nimm にしては. Wenn du eher „Hmm, das passt nicht zusammen" meinst, nimm わりに.'
        }
      ]
    },

    // ===================== LEKTION 37 =====================
    {
      id: 'lesson-37',
      number: 37,
      title: '～べき / ～べきではない',
      subtitle: 'Sollte / Sollte nicht',
      level: 'N3',
      intro: '„Das sollte man tun" — aber wie stark ist dieses „sollte"? Im Japanischen gibt es dafür ～べき, und es ist kein leiser Vorschlag. ～べき drückt eine starke moralische oder logische Überzeugung aus: „Das ist das Richtige." Es steht zwischen dem sanften ～ほうがいい (freundlicher Rat) und dem strengen ～なければならない (externe Pflicht). Wenn jemand べき verwendet, meint er es ernst — es geht um Prinzipien, Verantwortung und das, was man als richtig empfindet.',
      sections: [
        {
          heading: '～べきだ — Man sollte...',
          text: 'Verb (Wörterbuchform) + べきだ drückt eine <strong>starke moralische oder logische Empfehlung</strong> aus. Es ist kein freundlicher Tipp, sondern eine klare Überzeugung: „Das ist das Richtige!" Bildung: Verb-Wörterbuchform + べきだ. Wichtige Ausnahme: Bei する gibt es zwei Formen — するべき und すべき (etwas formeller). べき wird nicht für triviale Alltagsentscheidungen benutzt — es geht immer um etwas Bedeutsames.',
          examples: [
            { jp: '学生は毎日勉強するべきだ。', romaji: 'Gakusei wa mainichi benkyō suru beki da.', de: 'Studenten sollten jeden Tag lernen. (Starke Überzeugung)' },
            { jp: '約束は守るべきだ。', romaji: 'Yakusoku wa mamoru beki da.', de: 'Versprechen sollte man halten. (Moralisches Prinzip)' },
            { jp: '大切なことは自分で決めるべきだ。', romaji: 'Taisetsu na koto wa jibun de kimeru beki da.', de: 'Wichtige Dinge sollte man selbst entscheiden.' }
          ],
          tip: 'べき stammt vom klassischen japanischen Hilfsverb べし und klingt daher etwas gehobener. In der modernen Umgangssprache hört man auch べきだよ oder べきじゃない, aber in Aufsätzen und Reden ist べきだ / べきである die Standardform.'
        },
        {
          heading: '～べきではない — Man sollte nicht...',
          text: 'Verb (Wörterbuchform) + べきではない drückt eine <strong>starke negative Empfehlung</strong> aus: „Das sollte man auf keinen Fall tun." In formellen Kontexten wird べきではない bevorzugt, in der Umgangssprache hört man auch べきじゃない. Achtung: Die Verneinung steht bei べき, nicht beim Verb — also 行くべきではない (nicht: 行かないべき).',
          examples: [
            { jp: '他人の秘密を話すべきではない。', romaji: 'Tanin no himitsu o hanasu beki de wa nai.', de: 'Man sollte die Geheimnisse anderer nicht verraten.' },
            { jp: '子どもの前で喧嘩するべきではない。', romaji: 'Kodomo no mae de kenka suru beki de wa nai.', de: 'Man sollte nicht vor Kindern streiten.' },
            { jp: '簡単にあきらめるべきではない。', romaji: 'Kantan ni akirameru beki de wa nai.', de: 'Man sollte nicht so leicht aufgeben.' }
          ],
          tip: 'Vorsicht bei der Wortstellung: Es heißt 食べるべきではない (sollte nicht essen), NICHT 食べないべきだ. Die Verneinung bezieht sich auf べき, nicht auf das Verb davor.'
        },
        {
          heading: 'Vergleich: べき vs ほうがいい vs なければならない',
          text: 'Alle drei drücken eine Art „sollen" aus, aber die Stärke und der Ton unterscheiden sich erheblich:<ul class="lesson-rules"><li><strong>～ほうがいい</strong> → Sanfter Rat, freundlicher Vorschlag: „Es wäre besser, wenn du..." — kein Druck.</li><li><strong>～べきだ</strong> → Starke moralische/logische Überzeugung: „Man sollte..." — der Sprecher ist überzeugt, dass es das Richtige ist.</li><li><strong>～なければならない</strong> → Externe Pflicht, Regel oder Zwang: „Man muss..." — es gibt keine Wahl.</li></ul>',
          examples: [
            { jp: '野菜を食べたほうがいいよ。', romaji: 'Yasai o tabeta hō ga ii yo.', de: 'Du solltest Gemüse essen. (Freundlicher Rat unter Freunden)' },
            { jp: '政治家は国民の声を聞くべきだ。', romaji: 'Seijika wa kokumin no koe o kiku beki da.', de: 'Politiker sollten auf die Stimme des Volkes hören. (Starke Überzeugung)' },
            { jp: '税金を払わなければならない。', romaji: 'Zeikin o harawanakereba naranai.', de: 'Man muss Steuern zahlen. (Gesetzliche Pflicht — keine Wahl)' }
          ],
          tip: 'べき ist unangemessen für banale Alltagsdinge: 「傘を持っていくべきだ」 klingt übertrieben — dafür passt ほうがいい besser. Reserviere べき für Themen mit moralischem Gewicht: Ehrlichkeit, Verantwortung, gesellschaftliche Pflichten.'
        }
      ]
    },

    // ===================== LEKTION 38 =====================
    {
      id: 'lesson-38',
      number: 38,
      title: '～きり / ～っぱなし',
      subtitle: 'Nur noch / So gelassen',
      level: 'N3',
      intro: 'Manche Zustände ändern sich einfach nicht — und manche Dinge werden einfach so gelassen, wie sie sind. Im Japanischen gibt es zwei ausdrucksstarke Konstruktionen für genau diese Situationen: ～きり (auch ～っきり) beschreibt, dass seit einem bestimmten Moment nichts mehr passiert ist — „Seitdem... nichts mehr." ～っぱなし beschreibt, dass etwas in einem Zustand belassen wurde — oft nachlässig oder achtlos. Zusammen mit dem bereits bekannten ～ばかり bilden sie ein Dreiergespann, das verschiedene Facetten von „nur das / immer noch / so gelassen" abdeckt. Diese Formen verleihen dem Japanischen eine emotionale Tiefe, die im Deutschen oft mehrerer Umschreibungen bedarf.',
      sections: [
        {
          heading: '～きり / ～っきり — „Nur noch.../Seit..."',
          text: 'Verb た-Form + きり (oder っきり) drückt aus, dass <strong>seit einer bestimmten Handlung nichts mehr passiert ist</strong>. Der Zustand hat sich seitdem nicht verändert. Im Deutschen: „Seit...", „Seitdem... nicht mehr", „Nur noch...". きり betont die Endgültigkeit oder das Ausbleiben einer erwarteten Veränderung. Bei Nomen und Zahlen bedeutet きり „nur": 二人きり (nur zu zweit), これっきり (nur dieses eine Mal). Die Doppelkonsonanten-Variante っきり ist umgangssprachlicher und emotional stärker.',
          examples: [
            { jp: '彼は出かけたきり、帰ってこない。', romaji: 'Kare wa dekaketa kiri, kaette konai.', de: 'Er ist weggegangen und seitdem nicht zurückgekommen.' },
            { jp: 'あの日会ったきり、連絡がない。', romaji: 'Ano hi atta kiri, renraku ga nai.', de: 'Seit dem Tag, als wir uns getroffen haben, kein Kontakt mehr.' },
            { jp: '二人きりで話したい。', romaji: 'Futari kiri de hanashitai.', de: 'Ich möchte nur zu zweit (unter vier Augen) reden.' }
          ],
          tip: 'きり betont immer: „Seit damals hat sich nichts geändert." Es schwingt oft Bedauern oder Sehnsucht mit — der Kontakt, der nie wieder kam, die Person, die nie zurückkehrte.'
        },
        {
          heading: '～っぱなし — „Einfach so gelassen..."',
          text: 'Verb ます-Stamm + っぱなし beschreibt, dass etwas <strong>in einem Zustand belassen wurde</strong>, ohne es zu korrigieren oder abzuschließen. Im Deutschen: „... stehen/liegen/offen gelassen", „Die ganze Zeit über...". っぱなし kommt von 放す (hanasu, loslassen) und trägt fast immer eine <strong>negative Konnotation</strong>: Nachlässigkeit, Vergesslichkeit oder Rücksichtslosigkeit. Es wird auch verwendet, wenn jemand die ganze Zeit in einem Zustand verharrt — „die ganze Zeit gestanden / gesessen".',
          examples: [
            { jp: 'ドアを開けっぱなしにしないで。', romaji: 'Doa o akeppanashi ni shinaide.', de: 'Lass die Tür nicht offen stehen.' },
            { jp: '水を出しっぱなしにしていた。', romaji: 'Mizu o dashippanashi ni shite ita.', de: 'Ich hatte das Wasser die ganze Zeit laufen lassen.' },
            { jp: '電車で2時間立ちっぱなしだった。', romaji: 'Densha de ni-jikan tachippanashi datta.', de: 'Ich habe in der Bahn zwei Stunden lang die ganze Zeit gestanden.' }
          ],
          tip: 'っぱなし impliziert fast immer Kritik oder Unbehagen: Tür offen gelassen, Licht angelassen, Wasser laufen lassen — es schwingt ein „Das hätte man nicht so lassen sollen!" mit.'
        },
        {
          heading: 'Vergleich: きり vs っぱなし vs ばかり',
          text: 'Alle drei können „nur" oder „immer noch" bedeuten, aber mit unterschiedlichem Fokus:<ul class="lesson-rules"><li><strong>きり</strong> → „Seit damals nichts mehr." Fokus auf den <em>Wendepunkt</em>, nach dem sich nichts änderte. Oft mit Bedauern.</li><li><strong>っぱなし</strong> → „So gelassen, wie es ist." Fokus auf den <em>unveränderten Zustand</em>, den jemand nicht korrigiert hat. Oft mit Kritik.</li><li><strong>ばかり</strong> → „Immer nur das." Fokus auf die <em>Wiederholung oder Ausschließlichkeit</em>. Kann neutral oder genervt sein.</li></ul>',
          examples: [
            { jp: '会ったきり連絡がない。', romaji: 'Atta kiri renraku ga nai.', de: 'Seit dem Treffen kein Kontakt mehr. (Wendepunkt → Stille)' },
            { jp: 'テレビをつけっぱなしで寝てしまった。', romaji: 'Terebi o tsukeppanashi de nete shimatta.', de: 'Ich bin eingeschlafen und habe den Fernseher angelassen. (Zustand → Nachlässigkeit)' },
            { jp: '最近、仕事ばかりしている。', romaji: 'Saikin, shigoto bakari shite iru.', de: 'In letzter Zeit mache ich nur noch Arbeit. (Wiederholung → Ausschließlichkeit)' }
          ],
          tip: 'Eselsbrücke: きり = „Seit dem Moment — Funkstille." っぱなし = „Einfach so gelassen — typisch!" ばかり = „Immer nur das eine — langsam nervt es."'
        }
      ]
    },

    // ===================== LEKTION 39 =====================
    {
      id: 'lesson-39',
      number: 39,
      title: '～ものだ / ～ものではない',
      subtitle: 'Allgemeine Wahrheiten und Erinnerungen (Vertiefung)',
      level: 'N2',
      intro: 'Du hast ものだ bereits in Lektion 29 kennengelernt. Jetzt vertiefen wir die fortgeschritteneren Nuancen — insbesondere ～ものがある (Eindruck), ～というものだ (wahre Natur) und die emotionale Ausrufform ～ものだ/もんだ. Diese Konstruktionen machen den Unterschied zwischen einem soliden N3-Niveau und einem natürlich klingenden N2-Sprecher. ものだ ist wie ein Schweizer Taschenmesser der japanischen Grammatik — je mehr Verwendungen du kennst, desto vielseitiger wirst du.',
      sections: [
        {
          heading: 'ものがある — Starker Eindruck',
          text: '～ものがある drückt aus, dass etwas <strong>einen starken Eindruck hinterlässt</strong> oder <strong>eine gewisse Qualität hat</strong>, die man anerkennt. Im Deutschen: „Es hat etwas...", „Man muss anerkennen, dass...".',
          examples: [
            { jp: '彼の演説には感動させるものがある。', romaji: 'Kare no enzetsu ni wa kandō saseru mono ga aru.', de: 'Seine Rede hat etwas tief Bewegendes.' },
            { jp: 'この映画には考えさせられるものがある。', romaji: 'Kono eiga ni wa kangaesaserareru mono ga aru.', de: 'Dieser Film hat etwas, das einen zum Nachdenken bringt.' },
            { jp: '彼女の歌声には心を打つものがある。', romaji: 'Kanojo no utagoe ni wa kokoro o utsu mono ga aru.', de: 'In ihrer Stimme liegt etwas, das einem ans Herz geht.' }
          ]
        },
        {
          heading: 'というものだ — Das wahre Wesen',
          text: 'というものだ drückt die <strong>wahre Natur oder das Wesen</strong> einer Sache aus. Es fügt eine philosophische oder urteilende Note hinzu. Im Deutschen: „Das ist eben...", „Das nennt man...".',
          examples: [
            { jp: '人の気持ちを無視するのは失礼というものだ。', romaji: 'Hito no kimochi o mushi suru no wa shitsurei to iu mono da.', de: 'Die Gefühle anderer zu ignorieren — das IST Unhöflichkeit.' },
            { jp: 'それこそ本当の友情というものだ。', romaji: 'Sore koso hontō no yūjō to iu mono da.', de: 'Genau DAS ist wahre Freundschaft.' },
            { jp: '努力なしに成功するのは都合がよすぎるというものだ。', romaji: 'Doryoku nashi ni seikō suru no wa tsugō ga yosugiru to iu mono da.', de: 'Ohne Anstrengung Erfolg zu haben — das wäre zu schön, um wahr zu sein.' }
          ]
        },
        {
          heading: 'ものだ — Emotionaler Ausruf',
          text: 'ものだ (oft もんだ in der Umgangssprache) drückt <strong>Erstaunen, Bewunderung oder tiefe Emotion</strong> aus. Im Deutschen: „Was für ein...!", „Wie doch...!". Es verwandelt eine Aussage in einen gefühlvollen Ausruf.',
          examples: [
            { jp: 'よくこんな難しい試験に受かったものだ！', romaji: 'Yoku konna muzukashii shiken ni ukatta mono da!', de: 'Unglaublich, dass du diese schwere Prüfung bestanden hast!' },
            { jp: '大きくなったものだなあ。', romaji: 'Ōkiku natta mono da nā.', de: 'Wie groß du geworden bist!' },
            { jp: 'よくもそんなことが言えたものだ。', romaji: 'Yoku mo sonna koto ga ieta mono da.', de: 'Wie kannst du es nur wagen, so etwas zu sagen!' }
          ],
          tip: 'よく + Verb + ものだ kann sowohl Bewunderung als auch Empörung ausdrücken — der Kontext entscheidet. よく来てくれたものだ = „Toll, dass du gekommen bist!" vs. よくもそんなことを = „Wie kannst du nur!"'
        }
      ]
    },

    // ===================== LEKTION 40 =====================
    {
      id: 'lesson-40',
      number: 40,
      title: '～に対して / ～に比べて / ～に関して',
      subtitle: 'Vergleich und Bezug',
      level: 'N2',
      intro: 'Wer argumentieren, vergleichen und Bezüge herstellen will, braucht präzise Werkzeuge. Die drei Ausdrücke に対して, に比べて und に関して sind genau das: grammatische Präzisionsinstrumente, die aus einem vagen Text einen strukturierten machen. に対して zielt auf einen Gegensatz oder ein Gegenüber, に比べて stellt Dinge nebeneinander zum Vergleich, und に関して führt ein Thema ein. Zusammen sind sie das Fundament formellen Japanisch — unverzichtbar für JLPT-Texte, Nachrichten und akademische Diskussionen.',
      sections: [
        {
          heading: 'に対して — Gegenüber / Im Gegensatz',
          text: 'に対して hat zwei Hauptbedeutungen: (1) <strong>gegenüber</strong> jemandem/etwas (eine Haltung, ein Verhalten) und (2) <strong>im Gegensatz zu</strong> (kontrastierend). Im Deutschen: „Gegenüber...", „Während..., dagegen...".',
          examples: [
            { jp: '先生に対して失礼な態度を取ってはいけない。', romaji: 'Sensei ni taishite shitsurei na taido o totte wa ikenai.', de: 'Man darf dem Lehrer gegenüber nicht unhöflich sein.' },
            { jp: '兄は外向的なのに対して、弟は内向的だ。', romaji: 'Ani wa gaigōteki na no ni taishite, otōto wa naikōteki da.', de: 'Während der ältere Bruder extrovertiert ist, ist der jüngere introvertiert.' },
            { jp: '日本語は語順が自由なのに対して、ドイツ語は動詞の位置が固定されている。', romaji: 'Nihongo wa gojun ga jiyū na no ni taishite, doitsugo wa dōshi no ichi ga kotei sarete iru.', de: 'Während die Wortstellung im Japanischen frei ist, ist die Verbposition im Deutschen festgelegt.' }
          ]
        },
        {
          heading: 'に比べて — Im Vergleich zu',
          text: 'に比べて stellt zwei Dinge <strong>direkt nebeneinander zum Vergleich</strong>. Im Deutschen: „Im Vergleich zu...", „Verglichen mit...".',
          examples: [
            { jp: '去年に比べて、今年は暖かい。', romaji: 'Kyonen ni kurabete, kotoshi wa atatakai.', de: 'Im Vergleich zum letzten Jahr ist es dieses Jahr wärmer.' },
            { jp: '東京に比べて、大阪は食べ物が安い。', romaji: 'Tōkyō ni kurabete, Ōsaka wa tabemono ga yasui.', de: 'Verglichen mit Tokyo ist das Essen in Osaka günstig.' },
            { jp: '日本語に比べて、中国語は発音が難しい。', romaji: 'Nihongo ni kurabete, chūgokugo wa hatsuon ga muzukashii.', de: 'Im Vergleich zum Japanischen ist die Aussprache im Chinesischen schwierig.' }
          ],
          tip: 'に比べると ist eine gleichwertige Alternative zu に比べて — beide sind korrekt und austauschbar.'
        },
        {
          heading: 'に関して — Bezüglich / In Bezug auf',
          text: 'に関して führt ein <strong>Thema formal ein</strong>. Es ist das gehobene Äquivalent von について. Im Deutschen: „Bezüglich...", „In Bezug auf...", „Was ... betrifft...".',
          examples: [
            { jp: 'この件に関しては、後ほどご連絡いたします。', romaji: 'Kono ken ni kanshite wa, nochihodo go-renraku itashimasu.', de: 'Bezüglich dieser Angelegenheit werde ich mich später bei Ihnen melden.' },
            { jp: '日本の文化に関して質問がありますか。', romaji: 'Nihon no bunka ni kanshite shitsumon ga arimasu ka.', de: 'Haben Sie Fragen bezüglich der japanischen Kultur?' },
            { jp: '環境問題に関する議論が行われた。', romaji: 'Kankyō mondai ni kansuru giron ga okonawareta.', de: 'Es fand eine Diskussion bezüglich der Umweltproblematik statt.' }
          ],
          tip: 'に関して → vor Verben (に関して話す), に関する → vor Nomen (に関する本). Diese Unterscheidung ist wichtig!'
        },
        {
          heading: 'Verwandte Ausdrücke: について / にとって',
          text: 'Zur Vollständigkeit:<ul class="lesson-rules"><li><strong>について</strong> → „Über..." (allgemeiner, häufiger als に関して)</li><li><strong>にとって</strong> → „Für ... (aus Sicht von)" — drückt Perspektive aus</li></ul>',
          examples: [
            { jp: '日本の歴史について勉強している。', romaji: 'Nihon no rekishi ni tsuite benkyō shite iru.', de: 'Ich lerne über die japanische Geschichte.' },
            { jp: '私にとって家族が一番大切だ。', romaji: 'Watashi ni totte kazoku ga ichiban taisetsu da.', de: 'Für mich ist die Familie das Wichtigste.' },
            { jp: '外国人にとって、敬語は最も難しい部分だ。', romaji: 'Gaikokujin ni totte, keigo wa mottomo muzukashii bubun da.', de: 'Für Ausländer ist Keigo der schwierigste Teil.' }
          ]
        }
      ]
    },

    // ===================== LEKTION 41 =====================
    {
      id: 'lesson-41',
      number: 41,
      title: '～ば～ほど',
      subtitle: 'Je mehr... desto mehr',
      level: 'N2',
      intro: 'Es gibt Dinge im Leben, die sich gegenseitig verstärken: Je mehr man übt, desto besser wird man. Je mehr man weiß, desto mehr Fragen hat man. Im Japanischen drückt ～ば～ほど genau diese proportionale Beziehung aus — und es ist dabei wunderbar elegant. Diese Konstruktion ist ein Favorit in Essays, Reden und philosophischen Aussagen. Wenn du sie einmal draufhast, wirst du feststellen, dass du sie ständig benutzen möchtest — je mehr du sie verwendest, desto natürlicher wird sie. Siehst du, was ich da gemacht habe?',
      sections: [
        {
          heading: 'Grundform: Verb + ば + Verb + ほど',
          text: 'Die Grundkonstruktion wiederholt dasselbe Verb: ば-Form + Wörterbuchform + ほど. Im Deutschen: „Je mehr man X, desto mehr Y." Das wiederholte Verb betont die steigende Intensität.',
          examples: [
            { jp: '勉強すればするほど面白くなる。', romaji: 'Benkyō sureba suru hodo omoshiroku naru.', de: 'Je mehr man lernt, desto interessanter wird es.' },
            { jp: '考えれば考えるほど分からなくなる。', romaji: 'Kangaereba kangaeru hodo wakaranaku naru.', de: 'Je mehr man darüber nachdenkt, desto verwirrender wird es.' },
            { jp: '食べれば食べるほどお腹が空く。', romaji: 'Tabereba taberu hodo onaka ga suku.', de: 'Je mehr man isst, desto hungriger wird man.' }
          ]
        },
        {
          heading: 'Mit Adjektiven',
          text: 'Bei <strong>い-Adjektiven</strong>: ～ければ～ほど. Bei <strong>な-Adjektiven</strong>: ～なら～なほど oder ～であれば～であるほど.',
          examples: [
            { jp: '安ければ安いほどいい。', romaji: 'Yasukereba yasui hodo ii.', de: 'Je billiger, desto besser.' },
            { jp: '大きければ大きいほどいい。', romaji: 'Ōkikereba ōkii hodo ii.', de: 'Je größer, desto besser.' },
            { jp: '静かなら静かなほど集中できる。', romaji: 'Shizuka nara shizuka na hodo shūchū dekiru.', de: 'Je ruhiger es ist, desto besser kann ich mich konzentrieren.' }
          ],
          tip: '～ば～ほどいい (je mehr, desto besser) ist eine extrem häufige Wendung im Alltag!'
        },
        {
          heading: 'Zwei verschiedene Verben / Adjektive',
          text: 'Man kann auch <strong>zwei verschiedene Ausdrücke</strong> kombinieren, um eine Ursache-Wirkungs-Beziehung zu zeigen.',
          examples: [
            { jp: '年を取れば取るほど、時間が速く感じる。', romaji: 'Toshi o toreba toru hodo, jikan ga hayaku kanjiru.', de: 'Je älter man wird, desto schneller vergeht die Zeit.' },
            { jp: '練習すればするほど上手になる。', romaji: 'Renshū sureba suru hodo jōzu ni naru.', de: 'Je mehr man übt, desto besser wird man.' },
            { jp: '日本語を学べば学ぶほど、日本の文化が好きになる。', romaji: 'Nihongo o manabeba manabu hodo, Nihon no bunka ga suki ni naru.', de: 'Je mehr man Japanisch lernt, desto mehr mag man die japanische Kultur.' }
          ]
        },
        {
          heading: 'Kurzformen und Varianten',
          text: '～ほど allein (ohne ば-Teil) kann ebenfalls „je mehr" ausdrücken, ist aber etwas informeller. Außerdem gibt es die feste Wendung ～ば～だけ mit ähnlicher Bedeutung.',
          examples: [
            { jp: '見るほど美しい。', romaji: 'Miru hodo utsukushii.', de: 'Je mehr man hinschaut, desto schöner ist es.' },
            { jp: '知れば知るほど、知らないことが増える。', romaji: 'Shireba shiru hodo, shiranai koto ga fueru.', de: 'Je mehr man weiß, desto mehr gibt es, was man nicht weiß.' },
            { jp: 'やればやるだけ成果が出る。', romaji: 'Yareba yaru dake seika ga deru.', de: 'Je mehr man tut, desto mehr Ergebnisse erzielt man.' }
          ]
        }
      ]
    },

    // ===================== LEKTION 42 =====================
    {
      id: 'lesson-42',
      number: 42,
      title: '～っぽい / ～がち / ～気味',
      subtitle: 'Tendenzen ausdrücken',
      level: 'N2',
      intro: 'Nicht alles ist schwarz oder weiß — oft will man ausdrücken, dass jemand eine Tendenz hat, dass etwas „ein bisschen" so ist, oder dass man zu etwas neigt. Dafür bietet Japanisch drei wunderbare Suffixe: っぽい (sieht so aus, neigt zu), がち (tendiert leider zu) und 気味 (ein Hauch von). Jedes hat seinen eigenen Charakter und seine eigene Stimmung. Zusammen sind sie unverzichtbar für natürlich klingendes Japanisch auf mittlerem bis fortgeschrittenem Niveau.',
      sections: [
        {
          heading: 'っぽい — „Wirkt wie...", „Neigt zu..."',
          text: 'っぽい wird an Nomen, Verben (Stamm) oder い-Adjektive (ohne い) angehängt und drückt aus, dass etwas <strong>den Eindruck erweckt</strong> oder jemand <strong>dazu neigt</strong>. Im Deutschen: „...artig", „...mäßig", „wirkt wie...".',
          examples: [
            { jp: '彼は怒りっぽい。', romaji: 'Kare wa okorippoi.', de: 'Er ist leicht reizbar / wird schnell wütend.' },
            { jp: 'この色は白っぽい。', romaji: 'Kono iro wa shiroppoi.', de: 'Diese Farbe ist weißlich.' },
            { jp: '最近忘れっぽくなった。', romaji: 'Saikin wasureppoku natta.', de: 'In letzter Zeit vergesse ich leicht Dinge.' },
          ],
          tip: 'っぽい wird wie ein い-Adjektiv konjugiert: っぽくない, っぽかった, etc. Es kann sowohl neutral als auch leicht negativ sein.'
        },
        {
          heading: 'がち — Negative Tendenz',
          text: 'がち wird an den Verbstamm oder Nomen angehängt und drückt eine <strong>unerwünschte Tendenz</strong> aus — etwas passiert leider häufig. Im Deutschen: „neigt dazu, ...", „hat die Tendenz, ...".',
          examples: [
            { jp: '彼は遅刻しがちだ。', romaji: 'Kare wa chikoku shigachi da.', de: 'Er neigt dazu, zu spät zu kommen.' },
            { jp: '冬は風邪を引きがちだ。', romaji: 'Fuyu wa kaze o hikigachi da.', de: 'Im Winter neigt man dazu, sich zu erkälten.' },
            { jp: '一人暮らしは不規則な生活になりがちだ。', romaji: 'Hitorigurashi wa fukisoku na seikatsu ni narigachi da.', de: 'Beim Alleinleben neigt man zu einem unregelmäßigen Lebensstil.' }
          ],
          tip: 'がち hat fast immer eine negative Konnotation! Man sagt nicht 成功しがち (neigt zum Erfolg) — das wäre seltsam.'
        },
        {
          heading: '気味（ぎみ）— Ein Hauch von',
          text: '気味 wird an den Verbstamm oder Nomen angehängt und drückt aus, dass etwas <strong>in geringem Maße vorhanden ist</strong> oder <strong>leicht in eine Richtung tendiert</strong>. Im Deutschen: „ein bisschen...", „leicht...", „etwas...".',
          examples: [
            { jp: '風邪気味だから、今日は早く寝よう。', romaji: 'Kaze-gimi da kara, kyō wa hayaku neyō.', de: 'Ich fühle mich leicht erkältet, also gehe ich heute früh ins Bett.' },
            { jp: '最近太り気味だ。', romaji: 'Saikin futori-gimi da.', de: 'In letzter Zeit habe ich leicht zugenommen.' },
            { jp: '今日の会議は遅れ気味に始まった。', romaji: 'Kyō no kaigi wa okure-gimi ni hajimatta.', de: 'Die heutige Besprechung hat mit leichter Verspätung begonnen.' }
          ]
        },
        {
          heading: 'Vergleich der drei Suffixe',
          text: '<ul class="lesson-rules"><li><strong>っぽい</strong> → Äußerer Eindruck / allgemeine Tendenz (neutral bis leicht negativ)</li><li><strong>がち</strong> → Unerwünschte Gewohnheit / häufige negative Tendenz</li><li><strong>気味</strong> → Leichter Grad / Anfangsstadium von etwas</li></ul>',
          examples: [
            { jp: '忘れっぽい → 忘れがち → 疲れ気味', romaji: 'wasureppoi → wasuregachi → tsukare-gimi', de: 'vergesslich (Charakter) → neigt zum Vergessen (Tendenz) → leicht müde (aktueller Zustand)' },
            { jp: '彼は子供っぽい。', romaji: 'Kare wa kodomoppoi.', de: 'Er wirkt kindisch. (Eindruck)' },
            { jp: '子供は病気になりがちだ。', romaji: 'Kodomo wa byōki ni narigachi da.', de: 'Kinder neigen dazu, krank zu werden. (Tendenz)' }
          ]
        }
      ]
    },

    // ===================== LEKTION 43 =====================
    {
      id: 'lesson-43',
      number: 43,
      title: '～にしても / ～としても / ～にせよ',
      subtitle: 'Einräumungen',
      level: 'N2',
      intro: 'Manchmal muss man einräumen: Selbst WENN etwas wahr ist, ändert das am Ergebnis nichts. Im Deutschen sagt man „Selbst wenn...", „Auch wenn...", „Angenommen, dass...". Das Japanische hat dafür gleich drei elegante Konstruktionen, die sich in Formalität und Nuance unterscheiden. にしても ist der Allrounder, としても betont die Hypothese, und にせよ/にしろ gehört zur formellen Sprache. Wer diese drei beherrscht, kann Argumente geschickt einräumen und trotzdem seinen Punkt machen — eine Schlüsselkompetenz für Debatten und Essays.',
      sections: [
        {
          heading: 'にしても — Selbst wenn / Auch wenn',
          text: 'にしても ist der <strong>vielseitigste Ausdruck</strong> und wird sowohl in der Umgangssprache als auch in formelleren Kontexten verwendet. Es räumt ein: „Selbst wenn X wahr ist, gilt trotzdem Y."',
          examples: [
            { jp: '忙しいにしても、食事はちゃんと取るべきだ。', romaji: 'Isogashii ni shite mo, shokuji wa chanto toru beki da.', de: 'Auch wenn du beschäftigt bist, solltest du ordentlich essen.' },
            { jp: '冗談にしても、ひどすぎる。', romaji: 'Jōdan ni shite mo, hidosugiru.', de: 'Selbst als Witz ist das zu viel.' },
            { jp: '安いにしても、品質は大切だ。', romaji: 'Yasui ni shite mo, hinshitsu wa taisetsu da.', de: 'Selbst wenn es billig ist, ist Qualität wichtig.' }
          ]
        },
        {
          heading: 'としても — Angenommen, dass...',
          text: 'としても betont stärker die <strong>hypothetische Natur</strong>: „Angenommen, das wäre so..." Es eignet sich besonders für Szenarien, die möglicherweise gar nicht eintreten.',
          examples: [
            { jp: '宝くじに当たったとしても、仕事は辞めない。', romaji: 'Takarakuji ni atatta to shite mo, shigoto wa yamenai.', de: 'Selbst wenn ich im Lotto gewinnen würde, würde ich nicht aufhören zu arbeiten.' },
            { jp: '日本に住んだとしても、日本語が完璧になるとは限らない。', romaji: 'Nihon ni sunda to shite mo, nihongo ga kanpeki ni naru to wa kagiranai.', de: 'Selbst wenn man in Japan leben würde, heißt das nicht, dass das Japanisch perfekt wird.' },
            { jp: '謝ったとしても、許してもらえないだろう。', romaji: 'Ayamatta to shite mo, yurushite moraenai darō.', de: 'Selbst wenn ich mich entschuldigen würde, würde man mir wohl nicht verzeihen.' }
          ]
        },
        {
          heading: 'にせよ / にしろ — Formelle Einräumung',
          text: 'にせよ und にしろ sind <strong>formellere Varianten</strong> von にしても. にせよ ist die formellste Form und findet sich oft in schriftlichen Texten. にしろ liegt dazwischen.',
          examples: [
            { jp: '理由は何にせよ、遅刻は遅刻だ。', romaji: 'Riyū wa nan ni seyo, chikoku wa chikoku da.', de: 'Was auch immer der Grund sein mag, zu spät ist zu spät.' },
            { jp: '賛成にせよ反対にせよ、意見を言うべきだ。', romaji: 'Sansei ni seyo hantai ni seyo, iken o iu beki da.', de: 'Ob dafür oder dagegen — man sollte seine Meinung äußern.' },
            { jp: '好きにしろ嫌いにしろ、やらなければならない。', romaji: 'Suki ni shiro kirai ni shiro, yaranakereba naranai.', de: 'Ob man es mag oder nicht — man muss es tun.' }
          ],
          tip: 'にせよ～にせよ und にしろ～にしろ werden oft paarweise verwendet: „Ob A oder B — in beiden Fällen..." Das ist eine elegante Argumentationsstruktur.'
        },
        {
          heading: 'Nuancen im Vergleich',
          text: '<ul class="lesson-rules"><li><strong>にしても</strong> → Alltagssprache bis leicht formell, vielseitig</li><li><strong>としても</strong> → Betont hypothetische Annahme</li><li><strong>にせよ</strong> → Formell, schriftlich, „sei es nun..."</li><li><strong>にしろ</strong> → Zwischen にしても und にせよ</li></ul>',
          examples: [
            { jp: '失敗したにしても、経験にはなる。', romaji: 'Shippai shita ni shite mo, keiken ni wa naru.', de: 'Auch wenn man scheitert, sammelt man Erfahrung. (allgemein)' },
            { jp: '失敗したとしても、経験にはなる。', romaji: 'Shippai shita to shite mo, keiken ni wa naru.', de: 'Selbst angenommen, man scheitert — es wäre trotzdem eine Erfahrung. (hypothetisch)' },
            { jp: '失敗したにせよ、経験にはなる。', romaji: 'Shippai shita ni seyo, keiken ni wa naru.', de: 'Sei es, dass man scheitert — Erfahrung bleibt es allemal. (formell)' }
          ]
        }
      ]
    },

    // ===================== LEKTION 44 =====================
    {
      id: 'lesson-44',
      number: 44,
      title: '～ざるを得ない / ～ないわけにはいかない',
      subtitle: 'Unvermeidliches',
      level: 'N2/N1',
      intro: 'Es gibt Situationen, in denen man keine Wahl hat — man MUSS handeln, auch wenn man es eigentlich nicht möchte. Das Japanische hat dafür zwei kraftvolle Ausdrücke, die beide eine Art widerwillige Notwendigkeit vermitteln. ～ざるを得ない stammt aus der klassischen Sprache und klingt formell und entschlossen: „Ich kann nicht umhin, ..." ～ないわけにはいかない betont die sozialen oder moralischen Zwänge: „Es geht nicht, dass ich es NICHT tue." Beide drücken aus: Die Umstände lassen mir keine andere Wahl.',
      sections: [
        {
          heading: 'ざるを得ない — Ich kann nicht umhin',
          text: 'Verb-ない-Stamm + ざるを得ない bedeutet „man kann nicht umhin, etwas zu tun" — man wird <strong>durch die Umstände gezwungen</strong>. Es ist formell und wird oft in geschäftlichen oder offiziellen Kontexten verwendet. Ausnahme: する → せざるを得ない.',
          examples: [
            { jp: '証拠がある以上、認めざるを得ない。', romaji: 'Shōko ga aru ijō, mitomezaru o enai.', de: 'Angesichts der Beweise kann ich es nicht leugnen.' },
            { jp: '会社の方針なので、従わざるを得ない。', romaji: 'Kaisha no hōshin na node, shitagawazaru o enai.', de: 'Da es die Firmenpolitik ist, muss ich mich fügen.' },
            { jp: '電車が止まったので、タクシーを使わざるを得なかった。', romaji: 'Densha ga tomatta node, takushī o tsukawazaru o enakatta.', de: 'Weil der Zug ausfiel, musste ich notgedrungen ein Taxi nehmen.' },
          ],
          tip: 'ざる ist die klassische Verneinungsform (ず → ざる vor を). する wird zu せざる, nicht しざる. Dieses Muster ist eine der wenigen Stellen, wo klassisches Japanisch im modernen Sprachgebrauch überlebt hat.'
        },
        {
          heading: 'ないわけにはいかない — Es geht nicht, dass ich es nicht tue',
          text: 'Verb-ない-Form + わけにはいかない drückt aus, dass man aus <strong>sozialen, moralischen oder situativen Gründen</strong> handeln MUSS. Die doppelte Verneinung ergibt eine starke Bejahung: „Ich kann es mir nicht leisten, es NICHT zu tun."',
          examples: [
            { jp: '招待されたから、行かないわけにはいかない。', romaji: 'Shōtai sareta kara, ikanai wake ni wa ikanai.', de: 'Ich wurde eingeladen, also kann ich nicht NICHT hingehen.' },
            { jp: '親に心配をかけないわけにはいかない — いや、かけるわけにはいかないんだ。', romaji: 'Oya ni shinpai o kakenai wake ni wa ikanai — iya, kakeru wake ni wa ikanai n da.', de: 'Man kann seinen Eltern nicht KEINE Sorgen machen — nein, man darf ihnen keine Sorgen machen.' },
            { jp: '上司に報告しないわけにはいかない。', romaji: 'Jōshi ni hōkoku shinai wake ni wa ikanai.', de: 'Es geht nicht, dass ich dem Chef nicht Bericht erstatte.' }
          ]
        },
        {
          heading: 'Vergleich: ざるを得ない vs ないわけにはいかない',
          text: '<ul class="lesson-rules"><li><strong>ざるを得ない</strong> → Äußere Umstände zwingen: „Die Situation lässt mir keine Wahl"</li><li><strong>ないわけにはいかない</strong> → Soziale/moralische Pflicht: „Mein Pflichtgefühl erlaubt es nicht"</li></ul>Beide drücken Notwendigkeit aus, aber die Quelle des Zwangs ist unterschiedlich.',
          examples: [
            { jp: '台風で会社を休まざるを得なかった。', romaji: 'Taifū de kaisha o yasumezaru o enakatta.', de: 'Wegen des Taifuns musste ich der Arbeit fernbleiben. (äußerer Zwang)' },
            { jp: '約束したんだから、行かないわけにはいかない。', romaji: 'Yakusoku shita n da kara, ikanai wake ni wa ikanai.', de: 'Ich habe es versprochen, also muss ich hingehen. (moralische Pflicht)' }
          ],
          tip: 'ざるを得ない klingt schwerer und formeller — ideal für Geschäftssprache. ないわけにはいかない ist etwas alltäglicher und persönlicher.'
        }
      ]
    },

    // ===================== LEKTION 45 =====================
    {
      id: 'lesson-45',
      number: 45,
      title: '～かねる / ～かねない',
      subtitle: 'Können und Risiko',
      level: 'N2/N1',
      intro: 'かねる ist ein elegantes Verb, das in der formellen Sprache zu Hause ist — in Geschäftsbriefen, Kundenservice und diplomatischen Formulierungen. ～かねる bedeutet „leider nicht können" und ist die höflichste Art zu sagen: „Nein, das geht nicht." Sein Gegenstück ～かねない dreht die Bedeutung um: „Es könnte leider passieren" — eine Warnung vor einem unerwünschten Ergebnis. Wer diese beiden Formen kennt, kann sowohl höflich ablehnen als auch diplomatisch warnen.',
      sections: [
        {
          heading: 'かねる — Höfliche Ablehnung',
          text: 'Verb-Stamm + かねる bedeutet „leider nicht in der Lage sein, etwas zu tun". Es ist <strong>viel höflicher als できない</strong> und wird oft im Geschäftsleben und im Kundenservice verwendet. Im Deutschen: „Ich bedaure, dass ich nicht...", „Es ist mir leider nicht möglich, ...".',
          examples: [
            { jp: 'その要求にはお応えしかねます。', romaji: 'Sono yōkyū ni wa okotae shikanemasu.', de: 'Ich bedaure, dass ich Ihrer Anforderung nicht nachkommen kann.' },
            { jp: '個人情報をお教えしかねます。', romaji: 'Kojin jōhō o ooshie shikanemasu.', de: 'Es ist mir leider nicht möglich, persönliche Daten weiterzugeben.' },
            { jp: 'この条件では賛成しかねる。', romaji: 'Kono jōken de wa sansei shikaneru.', de: 'Unter diesen Bedingungen kann ich leider nicht zustimmen.' }
          ],
          tip: 'かねる klingt nach „ich würde ja gerne, aber leider kann ich nicht" — es schwingt Bedauern mit. Perfekt für höfliche Ablehnungen im Beruf.'
        },
        {
          heading: 'かねない — Es könnte passieren (Warnung)',
          text: 'Verb-Stamm + かねない bedeutet „es ist nicht auszuschließen, dass..." oder „es besteht die Gefahr, dass...". Es warnt vor einem <strong>unerwünschten möglichen Ergebnis</strong>. Im Deutschen: „Es könnte leider passieren, dass...", „Man riskiert, dass...".',
          examples: [
            { jp: 'そんな態度では、クビになりかねない。', romaji: 'Sonna taido de wa, kubi ni narikane nai.', de: 'Mit so einer Einstellung riskierst du, gefeuert zu werden.' },
            { jp: '放っておくと、大問題になりかねない。', romaji: 'Hōtte oku to, dai-mondai ni narikane nai.', de: 'Wenn man es ignoriert, könnte es zu einem großen Problem werden.' },
            { jp: '彼ならやりかねない。', romaji: 'Kare nara yarikane nai.', de: 'Ihm traue ich das zu. (Er könnte es wirklich tun.)' }
          ],
          tip: 'かねない wird fast ausschließlich für NEGATIVE Ergebnisse verwendet. Man sagt nicht 成功しかねない — das wäre wie eine Warnung vor Erfolg, was keinen Sinn ergibt.'
        },
        {
          heading: 'かねる vs できない — Stilvoll ablehnen',
          text: 'Der praktische Unterschied ist die <strong>Höflichkeitsstufe</strong>:<ul class="lesson-rules"><li><strong>できません</strong> → Neutral, sachlich: „Es geht nicht."</li><li><strong>かねます</strong> → Höflich, bedauernd: „Es ist mir leider nicht möglich."</li></ul>In E-Mails, Geschäftsbriefen und Kundeninteraktionen ist かねます die bevorzugte Wahl.',
          examples: [
            { jp: '返品はお受けできません。', romaji: 'Henpin wa ouke dekimasen.', de: 'Rückgaben sind nicht möglich. (sachlich)' },
            { jp: '返品はお受けしかねます。', romaji: 'Henpin wa ouke shikanemasu.', de: 'Wir bedauern, Rückgaben nicht entgegennehmen zu können. (höflich)' },
            { jp: 'ご期待に沿いかねる場合もございます。', romaji: 'Go-kitai ni soikaneru baai mo gozaimasu.', de: 'Es kann vorkommen, dass wir Ihren Erwartungen leider nicht entsprechen können.' }
          ]
        }
      ]
    },

    // ===================== LEKTION 46 =====================
    {
      id: 'lesson-46',
      number: 46,
      title: '～に他ならない / ～にすぎない',
      subtitle: 'Betonung und Einschränkung',
      level: 'N2/N1',
      intro: 'In Debatten und Essays braucht man zwei grundlegende rhetorische Werkzeuge: etwas mit Nachdruck behaupten und etwas relativieren. に他ならない ist der Hammer: „Es ist nichts anderes als X!" — eine absolute Behauptung. にすぎない ist das Skalpell: „Es ist lediglich X" — eine elegante Einschränkung. Wer beide beherrscht, kann Argumente aufbauen wie ein Profi: erst den Punkt stark machen, dann relativieren — oder umgekehrt. Diese Formen sind das rhetorische Rückgrat anspruchsvoller japanischer Texte.',
      sections: [
        {
          heading: 'に他ならない — Nichts anderes als',
          text: 'Nomen + に他（ほか）ならない drückt eine <strong>starke, absolute Überzeugung</strong> aus: „X ist nichts anderes als Y." Im Deutschen: „Es ist nichts Geringeres als...", „Es liegt einzig und allein an...".',
          examples: [
            { jp: '彼の成功は努力の結果に他ならない。', romaji: 'Kare no seikō wa doryoku no kekka ni hoka naranai.', de: 'Sein Erfolg ist nichts anderes als das Ergebnis harter Arbeit.' },
            { jp: 'これは奇跡に他ならない。', romaji: 'Kore wa kiseki ni hoka naranai.', de: 'Das ist nichts Geringeres als ein Wunder.' },
            { jp: '環境破壊は人間の行動の結果に他ならない。', romaji: 'Kankyō hakai wa ningen no kōdō no kekka ni hoka naranai.', de: 'Die Umweltzerstörung ist einzig und allein das Ergebnis menschlichen Handelns.' }
          ],
          tip: 'に他ならない ist IMMER positiv betonend — es hebt die wahre Natur oder den wahren Grund hervor. Es ist das rhetorische Äquivalent eines Ausrufezeichens.'
        },
        {
          heading: 'にすぎない — Lediglich / Nur',
          text: 'Verb / Nomen + にすぎない drückt aus, dass etwas <strong>weniger wichtig oder bedeutend ist, als man denken könnte</strong>. Im Deutschen: „Es ist lediglich...", „Es ist nur...", „Es handelt sich bloß um...".',
          examples: [
            { jp: '私の意見にすぎません。', romaji: 'Watashi no iken ni sugimasen.', de: 'Es ist lediglich meine Meinung.' },
            { jp: 'これは噂にすぎない。', romaji: 'Kore wa uwasa ni suginai.', de: 'Das ist nur ein Gerücht.' },
            { jp: '彼はまだ学生にすぎない。', romaji: 'Kare wa mada gakusei ni suginai.', de: 'Er ist immer noch nur ein Student.' },
          ]
        },
        {
          heading: 'Rhetorische Kombination',
          text: 'Die wahre Kraft zeigt sich, wenn man beide Formen <strong>zusammen in einem Argument</strong> verwendet — erst einschränken, dann betonen (oder umgekehrt).',
          examples: [
            { jp: '確かに彼は一社員にすぎないが、その発言は会社全体の考えを反映しているに他ならない。', romaji: 'Tashika ni kare wa ichi-shain ni suginai ga, sono hatsugen wa kaisha zentai no kangae o han\'ei shite iru ni hoka naranai.', de: 'Er ist zwar nur ein einfacher Angestellter, aber seine Aussage spiegelt nichts anderes als die Haltung des gesamten Unternehmens wider.' },
            { jp: 'お金は道具にすぎない。大切なのは使い方に他ならない。', romaji: 'Okane wa dōgu ni suginai. Taisetsu na no wa tsukaikata ni hoka naranai.', de: 'Geld ist nur ein Werkzeug. Was wirklich zählt, ist einzig und allein die Art, wie man es benutzt.' }
          ],
          tip: 'にすぎない relativiert, に他ならない betont absolut. Zusammen erzeugen sie einen überzeugenden Kontrast — eine mächtige rhetorische Technik.'
        }
      ]
    },

    // ===================== LEKTION 47 =====================
    {
      id: 'lesson-47',
      number: 47,
      title: '～たりとも / ～すら / ～だに',
      subtitle: 'Extreme Betonung',
      level: 'N1',
      intro: 'Auf N1-Niveau wird die Sprache poetisch, rhetorisch und kraftvoll. Die drei Ausdrücke たりとも, すら und だに sind Werkzeuge der extremen Betonung, die in Reden, literarischen Texten und formellen Schriften zu Hause sind. たりとも sagt: „Nicht einmal eine einzige Sekunde!" すら geht noch weiter als さえ und sagt: „Nicht einmal DAS!" だに ist die seltenste und literarischste Form: „Allein der Gedanke daran..." Wer diese Formen kennt, versteht die Tiefe und Eleganz der japanischen Sprache auf höchstem Niveau.',
      sections: [
        {
          heading: 'たりとも — Nicht einmal ein einziges...',
          text: 'Zählwort / Mengenangabe + たりとも + Verneinung drückt aus, dass <strong>nicht einmal die kleinste Einheit</strong> erlaubt, vorhanden oder akzeptabel ist. Im Deutschen: „Nicht einmal ein einziges...", „Kein einziger...".',
          examples: [
            { jp: '一秒たりとも無駄にしたくない。', romaji: 'Ichibyō taritomo muda ni shitaku nai.', de: 'Ich möchte nicht einmal eine einzige Sekunde verschwenden.' },
            { jp: '一歩たりとも動くな！', romaji: 'Ippo taritomo ugoku na!', de: 'Beweg dich nicht einen einzigen Schritt!' },
            { jp: '一円たりとも貸さない。', romaji: 'Ichien taritomo kasanai.', de: 'Ich werde nicht einmal einen einzigen Yen verleihen.' },
          ],
          tip: 'たりとも steht fast immer nach einer Mengenangabe mit „eins" (一秒, 一歩, 一円, 一日) und wird immer von einer Verneinung gefolgt.'
        },
        {
          heading: 'すら — Nicht einmal (stärker als さえ)',
          text: 'すら ist eine <strong>literarische, intensivere Version von さえ</strong>. Es betont, dass selbst das Minimum oder Selbstverständlichste nicht gegeben ist. Im Deutschen: „Nicht einmal...", „Selbst... nicht".',
          examples: [
            { jp: '名前すら知らない。', romaji: 'Namae sura shiranai.', de: 'Ich kenne nicht einmal den Namen.' },
            { jp: '子供ですら解ける問題だ。', romaji: 'Kodomo de sura tokeru mondai da.', de: 'Es ist eine Aufgabe, die selbst ein Kind lösen kann.' },
            { jp: '彼は挨拶すらしなかった。', romaji: 'Kare wa aisatsu sura shinakatta.', de: 'Er hat nicht einmal gegrüßt.' },
          ],
          tip: 'すら klingt literarischer und dramatischer als さえ. In der Alltagssprache verwendet man eher さえ, in Texten und Reden すら.'
        },
        {
          heading: 'だに — Allein schon der Gedanke',
          text: 'だに ist die <strong>seltenste und literarischste</strong> dieser drei Formen. Sie wird fast ausschließlich mit Verben des Denkens verwendet: 想像する, 考える, 思う. Im Deutschen: „Allein der Gedanke...", „Schon die bloße Vorstellung...".',
          examples: [
            { jp: '想像だにしなかった結果だ。', romaji: 'Sōzō dani shinakatta kekka da.', de: 'Ein Ergebnis, das ich mir nicht einmal hätte vorstellen können.' },
            { jp: '考えるだに恐ろしい。', romaji: 'Kangaeru dani osoroshii.', de: 'Allein der Gedanke daran ist furchteinflößend.' },
            { jp: '予想だにしない展開だった。', romaji: 'Yosō dani shinai tenkai datta.', de: 'Es war eine Entwicklung, die niemand hätte vorhersehen können.' }
          ],
          tip: 'だに ist auf wenige feste Wendungen beschränkt. Die häufigsten sind: 想像だにしない, 予想だにしない, 考えるだに. Man begegnet ihr hauptsächlich in Nachrichten und Literatur.'
        }
      ]
    },

    // ===================== LEKTION 48 =====================
    {
      id: 'lesson-48',
      number: 48,
      title: '～をもって / ～を踏まえて / ～を余儀なくされる',
      subtitle: 'Formelle Ausdrücke',
      level: 'N1',
      intro: 'N1-Grammatik ist oft die Grammatik der offiziellen Welt — Geschäftsbriefe, Nachrichten, Regierungsdokumente und akademische Texte. Die drei Ausdrücke をもって, を踏まえて und を余儀なくされる gehören zu diesem Register. をもって ist die formelle Art zu sagen „mit" oder „zum Zeitpunkt von". を踏まえて bedeutet „auf Grundlage von" — man berücksichtigt etwas bei einer Entscheidung. Und を余儀なくされる beschreibt eine erzwungene Handlung — man wird genötigt. Wer diese Formen kennt, kann japanische Nachrichten lesen und formelle Texte verfassen.',
      sections: [
        {
          heading: 'をもって — Mit / Zum Zeitpunkt von',
          text: 'をもって hat zwei Hauptbedeutungen: (1) <strong>Mittel oder Art und Weise</strong>: „mit..., durch..." und (2) <strong>Zeitpunkt eines Endes oder Beginns</strong>: „zum..., ab dem...". Es ist eine formelle Alternative zu で.',
          examples: [
            { jp: '本日をもって閉店いたします。', romaji: 'Honjitsu o motte heiten itashimasu.', de: 'Zum heutigen Tag schließen wir unser Geschäft.' },
            { jp: '書面をもってお知らせいたします。', romaji: 'Shomen o motte oshirase itashimasu.', de: 'Wir informieren Sie hiermit schriftlich.' },
            { jp: '誠意をもって対応する。', romaji: 'Seii o motte taiō suru.', de: 'Mit Aufrichtigkeit handeln.' },
          ],
          tip: '本日をもって (zum heutigen Tag) ist eine sehr häufige Wendung in Geschäftsankündigungen — Schließungen, Kündigungen, letzte Arbeitstage.'
        },
        {
          heading: 'を踏まえて — Auf Grundlage von',
          text: 'を踏まえて (von 踏まえる — „berücksichtigen, sich auf etwas stützen") bedeutet, dass man <strong>etwas als Basis oder Ausgangspunkt für eine Entscheidung nimmt</strong>. Im Deutschen: „Auf Grundlage von...", „Unter Berücksichtigung von...", „In Anbetracht von...".',
          examples: [
            { jp: '調査結果を踏まえて、計画を見直す。', romaji: 'Chōsa kekka o fumaete, keikaku o minaosu.', de: 'Auf Grundlage der Untersuchungsergebnisse überarbeiten wir den Plan.' },
            { jp: '今回の経験を踏まえて、改善策を考えたい。', romaji: 'Konkai no keiken o fumaete, kaizen-saku o kangaetai.', de: 'Unter Berücksichtigung der diesmaligen Erfahrung möchte ich Verbesserungsmaßnahmen überlegen.' },
            { jp: '皆さんのご意見を踏まえた上で、最終決定を行います。', romaji: 'Minasan no go-iken o fumaeta ue de, saishū kettei o okonaimasu.', de: 'Auf Grundlage aller Ihrer Meinungen treffen wir die endgültige Entscheidung.' }
          ]
        },
        {
          heading: 'を余儀なくされる — Gezwungen werden',
          text: 'を余儀（よぎ）なくされる bedeutet „zu etwas gezwungen werden" — die Umstände lassen keine andere Wahl. Es ist <strong>formeller als ざるを得ない</strong> und findet sich häufig in Nachrichten und offiziellen Berichten.',
          examples: [
            { jp: '台風のため、イベントは中止を余儀なくされた。', romaji: 'Taifū no tame, ibento wa chūshi o yogi naku sareta.', de: 'Wegen des Taifuns wurde die Veranstaltung zur Absage gezwungen.' },
            { jp: '住民は避難を余儀なくされた。', romaji: 'Jūmin wa hinan o yogi naku sareta.', de: 'Die Bewohner wurden zur Evakuierung gezwungen.' },
            { jp: '会社は大規模なリストラを余儀なくされている。', romaji: 'Kaisha wa daikibo na risutora o yogi naku sarete iru.', de: 'Das Unternehmen ist zu umfangreichen Umstrukturierungen gezwungen.' }
          ],
          tip: 'を余儀なくされる wird fast ausschließlich in der Passivform verwendet und beschreibt immer eine unfreiwillige, durch äußere Umstände erzwungene Handlung.'
        }
      ]
    },

    // ===================== LEKTION 49 =====================
    {
      id: 'lesson-49',
      number: 49,
      title: '～ともなると / ～ともなれば',
      subtitle: 'Wenn man bedenkt, dass...',
      level: 'N1',
      intro: 'Es gibt Momente, in denen man einen Status, eine Position oder eine Situation betrachtet und feststellt: Ab diesem Punkt gelten andere Regeln. ～ともなると und ～ともなれば drücken genau das aus: „Wenn es so weit ist, dass..." oder „Wenn man erst einmal X ist/erreicht hat..." Sie implizieren, dass mit einem bestimmten Status auch bestimmte Erwartungen, Pflichten oder Konsequenzen einhergehen. Es sind Ausdrücke der Reflexion und des Perspektivwechsels — typisch für Betrachtungen über Karriere, Alter, Verantwortung und gesellschaftliche Rollen.',
      sections: [
        {
          heading: 'ともなると — Wenn es so weit kommt, dass...',
          text: 'Nomen + ともなると drückt aus, dass ab einem <strong>bestimmten Punkt oder Status die Situation sich verändert</strong>. Es impliziert: „Wenn man erst einmal X ist, dann..." Im Deutschen: „Wenn es so weit ist, dass...", „Sobald man einmal...".',
          examples: [
            { jp: '社長ともなると、責任が重い。', romaji: 'Shachō to mo naru to, sekinin ga omoi.', de: 'Wenn man erst einmal Firmenchef ist, trägt man schwere Verantwortung.' },
            { jp: '大学生ともなると、自分で考える力が求められる。', romaji: 'Daigakusei to mo naru to, jibun de kangaeru chikara ga motomerareru.', de: 'Wenn man Universitätsstudent ist, wird eigenständiges Denken erwartet.' },
            { jp: '12月ともなると、街はクリスマスムード一色になる。', romaji: 'Jūnigatsu to mo naru to, machi wa kurisumasu mūdo isshoku ni naru.', de: 'Wenn erst einmal Dezember ist, ist die Stadt ganz in Weihnachtsstimmung.' }
          ]
        },
        {
          heading: 'ともなれば — Wenn man bedenkt, dass...',
          text: 'ともなれば ist fast synonym mit ともなると, hat aber einen leicht <strong>stärkeren, konditionaleren Ton</strong>. Es betont die Erwartung noch mehr: „Wenn man in einer solchen Position ist, dann versteht es sich von selbst, dass...".',
          examples: [
            { jp: '親ともなれば、子供のことが一番心配だ。', romaji: 'Oya to mo nareba, kodomo no koto ga ichiban shinpai da.', de: 'Wenn man Elternteil ist, macht man sich am meisten Sorgen um die Kinder.' },
            { jp: 'プロともなれば、この程度のことはできて当然だ。', romaji: 'Puro to mo nareba, kono teido no koto wa dekite tōzen da.', de: 'Wenn man ein Profi ist, ist es selbstverständlich, dass man so etwas kann.' },
            { jp: '有名人ともなれば、プライバシーを守るのは難しい。', romaji: 'Yūmeijin to mo nareba, puraibashī o mamoru no wa muzukashii.', de: 'Wenn man eine berühmte Person ist, ist es schwer, seine Privatsphäre zu schützen.' }
          ],
          tip: 'ともなると/ともなれば drücken eine „mit Status kommt Verantwortung"-Philosophie aus — ein Konzept, das in der japanischen Gesellschaft besonders wichtig ist.'
        },
        {
          heading: 'Nuancen und Verwendung',
          text: 'Beide Formen sind fast austauschbar. Feiner Unterschied:<ul class="lesson-rules"><li><strong>ともなると</strong> → Beschreibender, beobachtender Ton: „Wenn es so weit ist..."</li><li><strong>ともなれば</strong> → Konditionalerer Ton: „Gesetzt den Fall, dass..."</li></ul>Beide werden hauptsächlich mit Nomen verwendet (Status, Zeitpunkt, Position).',
          examples: [
            { jp: '夏ともなると、毎週末ビーチに行く人が多い。', romaji: 'Natsu to mo naru to, maishūmatsu bīchi ni iku hito ga ōi.', de: 'Wenn der Sommer kommt, gehen viele Leute jedes Wochenende an den Strand.' },
            { jp: '30歳ともなれば、将来のことを考え始める。', romaji: 'Sanjussai to mo nareba, shōrai no koto o kangae hajimeru.', de: 'Wenn man erst 30 ist, beginnt man, über die Zukunft nachzudenken.' },
            { jp: '卒業ともなると、寂しさを感じる。', romaji: 'Sotsugyō to mo naru to, sabishisa o kanjiru.', de: 'Wenn der Abschluss kommt, fühlt man Wehmut.' }
          ]
        }
      ]
    },

    // ===================== LEKTION 50 =====================
    {
      id: 'lesson-50',
      number: 50,
      title: '～んばかりに / ～まじき / ～べからず',
      subtitle: 'Literarische und alte Formen',
      level: 'N1',
      intro: 'Am Ende unserer grammatischen Reise stehen drei Ausdrücke, die aus der klassischen japanischen Sprache stammen und bis heute in formellen, literarischen und öffentlichen Kontexten lebendig sind. ～んばかりに beschreibt eine so intensive Handlung, dass es scheint, als würde gleich etwas passieren — „als ob gleich..." ～まじき drückt moralische Verurteilung aus: „Das ist unverzeihlich für jemanden, der..." Und ～べからず ist das formelle Verbot, das man auf Schildern und in Vorschriften findet: „Es ist verboten!" Wer diese Formen erkennt, erschließt sich eine neue Schicht der japanischen Sprache — die Brücke zwischen Klassik und Moderne.',
      sections: [
        {
          heading: 'んばかりに — Als ob gleich...',
          text: 'Verb-ない-Stamm + んばかりに (Ausnahme: する → せんばかりに) beschreibt eine <strong>extreme Intensität</strong> — es sieht so aus, als würde gleich etwas passieren, auch wenn es nicht wirklich passiert. Im Deutschen: „Als ob gleich...", „Fast so, als würde...".',
          examples: [
            { jp: '彼女は泣かんばかりに頼んだ。', romaji: 'Kanojo wa nakan bakari ni tanonda.', de: 'Sie bat so verzweifelt, als würde sie gleich anfangen zu weinen.' },
            { jp: '会場は割れんばかりの拍手に包まれた。', romaji: 'Kaijō wa waren bakari no hakushu ni tsutsumareta.', de: 'Der Saal war in tosenden Applaus gehüllt, als würde er gleich bersten.' },
            { jp: '目を輝かせんばかりに話を聞いていた。', romaji: 'Me o kagayakasen bakari ni hanashi o kiite ita.', de: 'Er hörte mit so leuchtenden Augen zu, als würden sie gleich strahlen.' }
          ],
          tip: 'んばかり kommt von der klassischen Form ん (= む, Intention/Vermutung). Die Konstruktion lebt bis heute in der Schriftsprache und in Nachrichten.'
        },
        {
          heading: 'まじき — Unverzeihlich für einen...',
          text: 'Nomen + にあるまじき / Nomen + としてあるまじき drückt aus, dass ein Verhalten <strong>für jemanden in einer bestimmten Position unverzeihlich</strong> ist. Im Deutschen: „Unwürdig eines...", „Unverzeihlich für einen...".',
          examples: [
            { jp: '教師にあるまじき行為だ。', romaji: 'Kyōshi ni aru majiki kōi da.', de: 'Das ist ein Verhalten, das eines Lehrers unwürdig ist.' },
            { jp: '医者としてあるまじき発言をした。', romaji: 'Isha to shite aru majiki hatsugen o shita.', de: 'Er hat eine Äußerung gemacht, die eines Arztes unwürdig ist.' },
            { jp: 'プロ選手にあるまじきミスだ。', romaji: 'Puro senshu ni aru majiki misu da.', de: 'Das ist ein Fehler, der einem Profisportler nicht passieren darf.' }
          ],
          tip: 'まじき stammt vom klassischen まじ (= べきではない, „sollte nicht"). Man findet es heute hauptsächlich in Nachrichtenkommentaren und formellen Kritiken.'
        },
        {
          heading: 'べからず — Es ist verboten!',
          text: 'Verb-Wörterbuchform + べからず ist ein <strong>formelles, kategorisches Verbot</strong>. Man findet es auf Schildern, in Vorschriften und Regeln. Im Deutschen: „Es ist verboten!", „... ist untersagt!" Es klingt alt und autoritär.',
          examples: [
            { jp: '入るべからず。', romaji: 'Hairu bekarazu.', de: 'Betreten verboten!' },
            { jp: '忘るべからず。', romaji: 'Wasuru bekarazu.', de: 'Vergiss es niemals! / Nie vergessen!' },
            { jp: '初心忘るべからず。', romaji: 'Shoshin wasuru bekarazu.', de: 'Vergiss niemals den Anfängergeist! (Berühmtes Sprichwort)' },
          ],
          tip: '初心忘るべからず ist eines der bekanntesten japanischen Sprichwörter. Es stammt von Zeami, dem Begründer des Nō-Theaters, und wird heute noch oft zitiert — in Ansprachen, Motivationsreden und als Lebensweisheit.'
        },
        {
          heading: 'Klassisches Japanisch im Alltag',
          text: 'Diese drei Formen zeigen, wie <strong>klassisches Japanisch bis heute lebendig ist</strong>. Man begegnet ihnen in bestimmten Kontexten:<ul class="lesson-rules"><li><strong>んばかりに</strong> → Literatur, Nachrichten, gehobene Erzählung</li><li><strong>まじき</strong> → Nachrichtenkommentare, formelle Kritik</li><li><strong>べからず</strong> → Schilder, Regeln, Sprichwörter</li></ul>',
          examples: [
            { jp: '喜びに溢れんばかりの表情だった。', romaji: 'Yorokobi ni afuren bakari no hyōjō datta.', de: 'Sein Gesichtsausdruck war so, als würde er gleich vor Freude überlaufen. (literarisch)' },
            { jp: '政治家にあるまじき発言として批判された。', romaji: 'Seijika ni aru majiki hatsugen to shite hihan sareta.', de: 'Es wurde als eine Äußerung kritisiert, die eines Politikers unwürdig ist. (Nachrichten)' },
            { jp: '芝生に入るべからず。', romaji: 'Shibafu ni hairu bekarazu.', de: 'Rasen betreten verboten! (Schild)' }
          ]
        }
      ]
    },

// ===================== LEKTION 51 =====================
    {
      id: 'lesson-51',
      number: 51,
      title: '～ながらも / ～つつも / ～ものの',
      subtitle: 'Zugeständnis und Widerspruch',
      level: 'N1',
      intro: 'In dieser Lektion beschäftigen wir uns mit drei wichtigen konzessiven Ausdrücken der japanischen Sprache, die alle eine Form von „obwohl" oder „trotzdem" ausdrücken. Obwohl sie sich in ihrer Grundbedeutung ähneln, unterscheiden sie sich in Nuance, Formalität und Verwendungskontext erheblich. ～ながらも betont einen inneren Widerspruch zwischen zwei gleichzeitig bestehenden Zuständen, ～つつも drückt aus, dass man sich einer Sache bewusst ist, aber dennoch anders handelt, und ～ものの markiert eine Erwartung, die im zweiten Satzteil enttäuscht wird. Das Beherrschen dieser drei Formen ist für das N1-Niveau unverzichtbar, da sie in formellen Texten, Zeitungsartikeln und literarischen Werken häufig vorkommen.',
      sections: [
        {
          heading: '～ながらも — Obwohl / Trotz (innerer Widerspruch)',
          text: '～ながらも wird an die Stammform von Verben, an Adjektive oder Nomen angehängt und drückt aus, dass zwei widersprüchliche Zustände oder Eigenschaften gleichzeitig bestehen. Es betont einen <strong>inhärenten Widerspruch</strong> — etwas ist so, obwohl man das Gegenteil erwarten würde. Bei い-Adjektiven wird die Grundform verwendet (小さいながらも), bei な-Adjektiven der Stamm (残念ながらも), und bei Nomen wird das Nomen direkt angehängt (子供ながらも). Diese Form hat einen leicht <em>literarischen</em> Beiklang und wird sowohl schriftlich als auch mündlich in gehobener Sprache verwendet.',
          examples: [
            { jp: '彼は貧しいながらも、幸せに暮らしている。', romaji: 'Kare wa mazushii nagara mo, shiawase ni kurashite iru.', de: 'Obwohl er arm ist, lebt er glücklich.' },
            { jp: '小さいながらも、この会社は世界的に有名だ。', romaji: 'Chiisai nagara mo, kono kaisha wa sekaiteki ni yūmei da.', de: 'Obwohl sie klein ist, ist diese Firma weltweit bekannt.' },
            { jp: '子供ながらも、その少年は驚くべき才能を持っている。', romaji: 'Kodomo nagara mo, sono shōnen wa odoroku beki sainō wo motte iru.', de: 'Obwohl er ein Kind ist, besitzt dieser Junge ein erstaunliches Talent.' },
          ],
          tip: 'Merke: ～ながらも betont, dass zwei Eigenschaften gleichzeitig existieren, die eigentlich im Widerspruch stehen. Das も verstärkt den konzessiven Charakter — ohne も (also nur ～ながら) kann es auch einfach „während" bedeuten.'
        },
        {
          heading: '～つつも — Obwohl man weiß / Obwohl man es tut (bewusster Widerspruch)',
          text: '～つつも wird an die Verb-Stammform (ます-Form ohne ます) angehängt und drückt aus, dass jemand sich einer Sache <strong>bewusst ist</strong>, aber trotzdem anders handelt oder fühlt. Es enthält oft eine Nuance von <em>Selbstvorwurf</em> oder <em>innerem Konflikt</em> — man weiß, was richtig wäre, tut aber das Gegenteil. Diese Form ist formeller als ～ながらも und kommt besonders in der Schriftsprache, in Essays und in introspektiven Texten vor. Sie wird <strong>nur mit Verben</strong> verwendet, nicht mit Adjektiven oder Nomen.',
          examples: [
            { jp: '体に悪いと知りつつも、タバコをやめられない。', romaji: 'Karada ni warui to shiri tsutsu mo, tabako wo yamerarenai.', de: 'Obwohl ich weiß, dass es schlecht für den Körper ist, kann ich mit dem Rauchen nicht aufhören.' },
            { jp: '申し訳ないと思いつつも、彼の頼みを断った。', romaji: 'Mōshiwakenai to omoi tsutsu mo, kare no tanomi wo kotowatta.', de: 'Obwohl ich es für unverzeihlich hielt, lehnte ich seine Bitte ab.' },
            { jp: '危険を感じつつも、彼女は前に進み続けた。', romaji: 'Kiken wo kanji tsutsu mo, kanojo wa mae ni susumi tsuzuketa.', de: 'Obwohl sie die Gefahr spürte, ging sie weiter voran.' },
          ],
          tip: '～つつも impliziert fast immer ein Bewusstsein des Widerspruchs. Wenn du sagen willst „Ich weiß es eigentlich besser, aber...", ist ～つつも die perfekte Wahl.'
        },
        {
          heading: '～ものの — Zwar..., aber / Obwohl (enttäuschte Erwartung)',
          text: '～ものの wird an die einfache Form (Verben, い-Adjektive in Grundform, な-Adjektive + な, Nomen + である) angehängt und drückt aus, dass etwas zwar der Fall ist, das erwartete Ergebnis aber <strong>nicht eintritt</strong>. Es hat die Nuance einer <em>enttäuschten Erwartung</em>: Die Situation im ersten Satzteil würde normalerweise zu einem bestimmten Ergebnis führen, aber der zweite Satzteil zeigt, dass es anders kam. ～ものの ist stilistisch neutral bis leicht formell und wird sowohl gesprochen als auch geschrieben häufig verwendet.',
          examples: [
            { jp: '日本語を何年も勉強したものの、まだ流暢に話せない。', romaji: 'Nihongo wo nannen mo benkyō shita mono no, mada ryūchō ni hanasenai.', de: 'Obwohl ich jahrelang Japanisch gelernt habe, kann ich es immer noch nicht fließend sprechen.' },
            { jp: '新しいパソコンを買ったものの、使い方がよくわからない。', romaji: 'Atarashii pasokon wo katta mono no, tsukaikata ga yoku wakaranai.', de: 'Ich habe zwar einen neuen Computer gekauft, weiß aber nicht genau, wie man ihn benutzt.' },
            { jp: '転職したいと思っているものの、なかなか行動に移せない。', romaji: 'Tenshoku shitai to omotte iru mono no, nakanaka kōdō ni utsusenai.', de: 'Ich möchte zwar den Job wechseln, kann es aber nicht in die Tat umsetzen.' },
          ],
          tip: 'Vergleich: ～ものの fokussiert auf das enttäuschende Ergebnis, ～ながらも auf den gleichzeitigen Widerspruch, und ～つつも auf das bewusste Handeln gegen besseres Wissen.'
        },
        {
          heading: 'Nuancenvergleich und Zusammenfassung',
          text: 'Alle drei Ausdrücke bedeuten „obwohl", unterscheiden sich aber in ihrer Perspektive. <strong>～ながらも</strong> stellt einen objektiven Widerspruch zwischen zwei Zuständen fest und kann mit Verben, Adjektiven und Nomen verwendet werden. <strong>～つつも</strong> betont das subjektive Bewusstsein des Sprechers über den Widerspruch und wird nur mit Verben benutzt — es hat oft eine selbstkritische Note. <strong>～ものの</strong> drückt aus, dass das Ergebnis hinter der Erwartung zurückbleibt, und ist die vielseitigste der drei Formen. In formellen Texten werden alle drei häufig verwendet, wobei ～つつも am literarischsten wirkt.',
          examples: [
            { jp: '努力しながらも、結果が出なかった。', romaji: 'Doryoku shi nagara mo, kekka ga denakatta.', de: '(Objektiv:) Obwohl er sich anstrengte, gab es keine Ergebnisse.' },
            { jp: '努力すべきだと分かりつつも、怠けてしまった。', romaji: 'Doryoku subeki da to wakari tsutsu mo, namakete shimatta.', de: '(Bewusst:) Obwohl ich wusste, dass ich mich anstrengen sollte, war ich faul.' },
            { jp: '努力したものの、結果が出なかった。', romaji: 'Doryoku shita mono no, kekka ga denakatta.', de: '(Enttäuschung:) Ich habe mich zwar angestrengt, aber es gab keine Ergebnisse.' }
          ]
        }
      ]
    },
    // ===================== LEKTION 52 =====================
    {
      id: 'lesson-52',
      number: 52,
      title: '～に至る / ～に至って / ～に至っては',
      subtitle: 'Bis hin zu... / Als es soweit war...',
      level: 'N1',
      intro: 'Diese Lektion behandelt drei eng verwandte Ausdrücke, die alle auf dem Verb 至る (itaru, „erreichen, gelangen") basieren. Sie beschreiben eine Entwicklung, die einen bestimmten Punkt erreicht — sei es einen Höhepunkt, einen Wendepunkt oder einen extremen Fall. ～に至る beschreibt den Prozess, der zu einem bestimmten Punkt führt, ～に至って markiert den Moment, an dem eine entscheidende Veränderung eintritt, und ～に至っては hebt einen besonders extremen oder erwähnenswerten Fall hervor. Diese Ausdrücke sind typisch für formelle Schriftsprache, Nachrichtentexte und akademische Abhandlungen und gehören zum Kernwortschatz der N1-Prüfung.',
      sections: [
        {
          heading: '～に至る / ～に至るまで — Bis hin zu / Dazu kommen, dass',
          text: '～に至る beschreibt einen Prozess oder eine Entwicklung, die schließlich einen bestimmten Punkt <strong>erreicht</strong>. Es betont den Weg oder die Kette von Ereignissen, die zu diesem Ergebnis geführt haben. In der Form ～に至るまで bedeutet es „bis hin zu" und betont die <em>Reichweite</em> oder den <em>Umfang</em> von etwas. Die nominalisierte Form ～に至った経緯 (ni itatta keii) bedeutet „die Umstände, die dazu geführt haben" und ist ein sehr häufiger Ausdruck in formellen Berichten.',
          examples: [
            { jp: '交渉は決裂に至った。', romaji: 'Kōshō wa ketsuretsu ni itatta.', de: 'Die Verhandlungen sind zum Scheitern gekommen.' },
            { jp: '事態が悪化し、ついに辞任に至った。', romaji: 'Jitai ga akka shi, tsui ni jinin ni itatta.', de: 'Die Lage verschlechterte sich und führte schließlich zum Rücktritt.' },
            { jp: 'この計画に至った経緯を説明いたします。', romaji: 'Kono keikaku ni itatta keii wo setsumei itashimasu.', de: 'Ich werde die Umstände erläutern, die zu diesem Plan geführt haben.' },
          ],
          tip: '～に至る hat einen sachlichen, berichtenden Ton. Verwende es, wenn du eine Kette von Ereignissen beschreibst, die zu einem Ergebnis geführt hat.'
        },
        {
          heading: '～に至って / ～に至っても — Als es soweit war / Selbst als es soweit war',
          text: '～に至って markiert einen <strong>Wendepunkt</strong>: Es beschreibt den Moment, an dem eine Situation so weit fortgeschritten ist, dass endlich eine Reaktion oder Erkenntnis eintritt. Die Nuance ist oft „erst als es so weit kam" — es impliziert, dass die Reaktion <em>zu spät</em> oder <em>erst im letzten Moment</em> erfolgte. Die negative Variante ～に至っても bedeutet „selbst als es so weit war" und drückt aus, dass <strong>nicht einmal</strong> in dieser extremen Situation eine erwartete Reaktion erfolgte.',
          examples: [
            { jp: '病状が深刻になるに至って、ようやく医者に行った。', romaji: 'Byōjō ga shinkoku ni naru ni itatte, yōyaku isha ni itta.', de: 'Erst als der Krankheitszustand ernst wurde, ging er endlich zum Arzt.' },
            { jp: '会社が倒産するに至って、初めて問題の深刻さに気づいた。', romaji: 'Kaisha ga tōsan suru ni itatte, hajimete mondai no shinkokusa ni kizuita.', de: 'Erst als die Firma bankrott ging, wurde einem das Ausmaß des Problems bewusst.' },
            { jp: '事態がここに至って、もう後戻りはできない。', romaji: 'Jitai ga koko ni itatte, mō atomodori wa dekinai.', de: 'Nun, da die Lage diesen Punkt erreicht hat, gibt es kein Zurück mehr.' },
          ],
          tip: '～に至って enthält fast immer die Nuance „erst jetzt, wo es so weit ist". Es impliziert oft eine Kritik: Warum hat man nicht früher gehandelt?'
        },
        {
          heading: '～に至っては — Was... betrifft / Besonders im Fall von',
          text: '～に至っては hebt einen <strong>besonders extremen oder bemerkenswerten Fall</strong> innerhalb einer Reihe hervor. Es wird verwendet, um zu sagen: „Wenn es um X geht, dann ist es besonders schlimm / extrem / bemerkenswert." Der Ausdruck impliziert, dass es schon andere Fälle gibt, aber dieser eine ist der <em>extremste</em>. Er wird häufig in negativen Kontexten verwendet, kann aber auch neutral sein, wenn er einfach einen herausragenden Fall markiert.',
          examples: [
            { jp: '成績はどの科目も悪かったが、数学に至っては赤点だった。', romaji: 'Seiseki wa dono kamoku mo warukatta ga, sūgaku ni itatte wa akaten datta.', de: 'Die Noten waren in jedem Fach schlecht, aber in Mathematik war es sogar eine Fünf.' },
            { jp: '社員の遅刻が多いが、田中に至っては毎日遅刻している。', romaji: 'Shain no chikoku ga ōi ga, Tanaka ni itatte wa mainichi chikoku shite iru.', de: 'Viele Mitarbeiter kommen zu spät, aber was Tanaka betrifft, kommt er jeden Tag zu spät.' },
            { jp: '物価が上がっているが、住宅価格に至っては倍になっている。', romaji: 'Bukka ga agatte iru ga, jūtaku kakaku ni itatte wa bai ni natte iru.', de: 'Die Preise steigen, aber was die Immobilienpreise betrifft, haben sie sich verdoppelt.' }
          ],
          tip: '～に至っては wird oft nach einem allgemeinen negativen Zustand verwendet, um den schlimmsten Einzelfall hervorzuheben. Die Struktur ist: „A ist schon schlecht, aber bei B ist es am schlimmsten."'
        }
      ]
    },
    // ===================== LEKTION 53 =====================
    {
      id: 'lesson-53',
      number: 53,
      title: '～をよそに / ～をものともせず / ～を顧みず',
      subtitle: 'Ignorieren und Trotzdem',
      level: 'N1',
      intro: 'In dieser Lektion lernen wir drei kraftvolle N1-Ausdrücke, die alle beschreiben, dass jemand etwas ignoriert, missachtet oder sich davon nicht beeindrucken lässt. Obwohl sie alle eine Form des „Nicht-Beachtens" ausdrücken, unterscheiden sich ihre Nuancen erheblich: ～をよそに hat oft eine kritische Note und impliziert Gleichgültigkeit gegenüber den Sorgen anderer, ～をものともせず drückt bewundernswerte Stärke und Tapferkeit aus, und ～を顧みず beschreibt die Entschlossenheit, Risiken oder Konsequenzen in Kauf zu nehmen. Diese Ausdrücke verleihen Texten eine gehobene, oft literarische Qualität.',
      sections: [
        {
          heading: '～をよそに — Ungeachtet / Ohne Rücksicht auf (kritisch)',
          text: '～をよそに bedeutet wörtlich „etwas beiseitelassen" und drückt aus, dass jemand die Sorgen, Gefühle oder Erwartungen anderer <strong>ignoriert</strong> und sein eigenes Ding macht. Dieser Ausdruck hat fast immer eine <em>kritische</em> oder <em>vorwurfsvolle</em> Nuance — der Sprecher missbilligt, dass die betroffene Person so gleichgültig ist. Das よそ bedeutet „anderer Ort" oder „anderswo" und suggeriert, dass die Person die Angelegenheiten anderer als „nicht ihre Sache" betrachtet. Die Konstruktion ist: <strong>Nomen + をよそに</strong>.',
          examples: [
            { jp: '親の心配をよそに、息子は危険な旅に出かけた。', romaji: 'Oya no shinpai wo yoso ni, musuko wa kiken na tabi ni dekaketa.', de: 'Ohne Rücksicht auf die Sorgen seiner Eltern machte sich der Sohn auf eine gefährliche Reise.' },
            { jp: '周囲の反対をよそに、彼女は独立して起業した。', romaji: 'Shūi no hantai wo yoso ni, kanojo wa dokuritsu shite kigyō shita.', de: 'Ungeachtet des Widerstands ihres Umfelds machte sie sich selbstständig.' },
            { jp: '国民の不安をよそに、政府は計画を推し進めた。', romaji: 'Kokumin no fuan wo yoso ni, seifu wa keikaku wo oshisusumeta.', de: 'Ohne Rücksicht auf die Ängste der Bevölkerung trieb die Regierung den Plan voran.' },
          ],
          tip: '～をよそに wird fast immer kritisch verwendet. Es impliziert: „Diese Person hätte sich kümmern sollen, hat es aber nicht getan." Typische Nomen davor: 心配 (Sorge), 反対 (Widerstand), 批判 (Kritik), 期待 (Erwartung).'
        },
        {
          heading: '～をものともせず — Sich nicht beeindrucken lassen von (bewundernd)',
          text: '～をものともせず drückt aus, dass jemand sich von Schwierigkeiten, Hindernissen oder widrigen Umständen <strong>nicht einschüchtern</strong> lässt und mutig voranschreitet. Im Gegensatz zu ～をよそに hat dieser Ausdruck eine <em>positive, bewundernde</em> Nuance — die beschriebene Person zeigt Stärke und Entschlossenheit. ものともしない bedeutet wörtlich „etwas nicht als etwas betrachten" (also: es für nichts halten). Die Konstruktion ist: <strong>Nomen + をものともせず</strong>.',
          examples: [
            { jp: '厳しい批判をものともせず、彼は研究を続けた。', romaji: 'Kibishii hihan wo mono to mo sezu, kare wa kenkyū wo tsuzuketa.', de: 'Ohne sich von der harten Kritik beeindrucken zu lassen, setzte er seine Forschung fort.' },
            { jp: '大雨をものともせず、選手たちは試合を戦い抜いた。', romaji: 'Ōame wo mono to mo sezu, senshutachi wa shiai wo tatakai nuita.', de: 'Unbeeindruckt vom starken Regen kämpften die Spieler das Spiel bis zum Ende.' },
            { jp: '病気をものともせず、彼女はフルマラソンを完走した。', romaji: 'Byōki wo mono to mo sezu, kanojo wa furu marason wo kansō shita.', de: 'Ohne sich von ihrer Krankheit aufhalten zu lassen, lief sie den gesamten Marathon.' },
          ],
          tip: '～をものともせず wird für heldenhafte oder bewundernswerte Handlungen verwendet. Typische Nomen davor: 困難 (Schwierigkeiten), 逆境 (Widrigkeiten), 反対 (Widerstand), 痛み (Schmerz).'
        },
        {
          heading: '～を顧みず — Ohne Rücksicht auf / Ohne zu bedenken (entschlossen)',
          text: '～を顧みず bedeutet wörtlich „ohne zurückzublicken auf" und drückt aus, dass jemand Risiken, seine eigene Sicherheit oder Konsequenzen <strong>bewusst in Kauf nimmt</strong>. 顧みる (kaerimiru) heißt „zurückblicken, bedenken, berücksichtigen", und die Verneinung ず ist die klassisch-japanische Form von ない. Dieser Ausdruck ist neutral bis positiv — er beschreibt Entschlossenheit und Opferbereitschaft. Die Konstruktion ist: <strong>Nomen + を顧みず</strong>.',
          examples: [
            { jp: '自らの危険を顧みず、彼は子供を川から救い出した。', romaji: 'Mizukara no kiken wo kaerimizu, kare wa kodomo wo kawa kara sukuidashita.', de: 'Ohne seine eigene Sicherheit zu bedenken, rettete er das Kind aus dem Fluss.' },
            { jp: '家族の反対を顧みず、彼女は海外に移住した。', romaji: 'Kazoku no hantai wo kaerimizu, kanojo wa kaigai ni ijū shita.', de: 'Ohne den Widerstand ihrer Familie zu beachten, wanderte sie ins Ausland aus.' },
            { jp: '健康を顧みず、彼は連日深夜まで働き続けた。', romaji: 'Kenkō wo kaerimizu, kare wa renjitsu shin\'ya made hataraki tsuzuketa.', de: 'Ohne auf seine Gesundheit zu achten, arbeitete er Tag für Tag bis spät in die Nacht.' },
          ],
          tip: 'Vergleich: ～をよそに = kritisch (Gleichgültigkeit), ～をものともせず = bewundernd (Stärke), ～を顧みず = entschlossen (Opferbereitschaft). Alle drei werden mit Nomen + を konstruiert.'
        }
      ]
    },
    // ===================== LEKTION 54 =====================
    {
      id: 'lesson-54',
      number: 54,
      title: '～てやまない / ～にたえない / ～にかたくない',
      subtitle: 'Unaufhörliche Gefühle',
      level: 'N1',
      intro: 'Diese Lektion widmet sich drei gehobenen Ausdrucksformen, die intensive, oft überwältigende Emotionen beschreiben. Sie sind typisch für formelle Reden, Briefe und literarische Texte und verleihen dem Gesagten eine feierliche, ernsthafte Atmosphäre. ～てやまない drückt ein Gefühl aus, das niemals aufhört, ～にたえない beschreibt etwas, das so intensiv ist, dass man es kaum ertragen kann (positiv oder negativ), und ～にかたくない bedeutet, dass etwas leicht vorstellbar ist, weil die Umstände so offensichtlich sind. Das Beherrschen dieser Ausdrücke ermöglicht es, in formellen Situationen nuancierte Emotionen auszudrücken.',
      sections: [
        {
          heading: '～てやまない — Unaufhörlich / Von ganzem Herzen',
          text: 'やまない kommt vom Verb 止む (yamu, „aufhören") in der verneinten Form. ～てやまない bedeutet also wörtlich „es hört nicht auf zu..." und drückt ein Gefühl aus, das <strong>niemals nachlässt</strong>. Es wird mit Verben des Fühlens und Wünschens verwendet: 願う (wünschen), 望む (hoffen), 祈る (beten), 愛する (lieben), 尊敬する (respektieren). Die Konstruktion ist: <strong>Verb (て-Form) + やまない</strong>. Dieser Ausdruck ist sehr formell und wird häufig in Reden, Grußworten und offiziellen Ansprachen verwendet.',
          examples: [
            { jp: '皆様のご成功を願ってやみません。', romaji: 'Minasama no go-seikō wo negatte yamimasen.', de: 'Ich wünsche Ihnen allen von ganzem Herzen Erfolg.' },
            { jp: '世界平和が実現することを祈ってやまない。', romaji: 'Sekai heiwa ga jitsugen suru koto wo inotte yamanai.', de: 'Ich bete unaufhörlich dafür, dass der Weltfrieden Wirklichkeit wird.' },
            { jp: '彼女の才能を尊敬してやまない。', romaji: 'Kanojo no sainō wo sonkei shite yamanai.', de: 'Ich bewundere ihr Talent von ganzem Herzen.' },
          ],
          tip: 'In der höflichen Form wird やまない zu やみません. Dieser Ausdruck wird fast ausschließlich mit positiven Gefühlen verwendet — Wünsche, Hoffnungen, Liebe, Respekt.'
        },
        {
          heading: '～にたえない — Unerträglich / Kaum zu ertragen',
          text: '～にたえない (に堪えない) bedeutet wörtlich „man kann es nicht ertragen" und hat zwei unterschiedliche Verwendungen. <strong>Erstens</strong> kann es eine so starke Emotion beschreiben, dass sie kaum auszuhalten ist — sowohl positiv (Dankbarkeit, Freude) als auch negativ (Scham, Bedauern). <strong>Zweitens</strong> kann es bedeuten, dass etwas so schlecht ist, dass es „nicht wert ist" (z. B. 聞くにたえない = „nicht anzuhören"). Die Konstruktion ist: <strong>Nomen + にたえない</strong> oder <strong>Verb (辞書形) + にたえない</strong>.',
          examples: [
            { jp: '皆様のご支援には感謝にたえません。', romaji: 'Minasama no go-shien ni wa kansha ni taemasen.', de: 'Für Ihre Unterstützung bin ich Ihnen unendlich dankbar.' },
            { jp: 'このような結果になり、慚愧にたえない。', romaji: 'Kono yō na kekka ni nari, zangi ni taenai.', de: 'Dass es zu einem solchen Ergebnis kam, erfüllt mich mit tiefer Scham.' },
            { jp: '彼の演説は聞くにたえない内容だった。', romaji: 'Kare no enzetsu wa kiku ni taenai naiyō datta.', de: 'Seine Rede hatte einen Inhalt, der nicht anzuhören war.' },
          ],
          tip: 'Mit Gefühlsnomen (感謝、感慨、慚愧) bedeutet es „überwältigende Emotion". Mit Verben wie 聞く、見る、読む bedeutet es „so schlecht, dass man es nicht ertragen kann".'
        },
        {
          heading: '～にかたくない — Nicht schwer zu... / Leicht vorstellbar',
          text: '～にかたくない (に難くない) bedeutet wörtlich „es ist nicht schwer zu..." und drückt aus, dass etwas <strong>leicht vorstellbar</strong> oder <strong>leicht nachvollziehbar</strong> ist, auch wenn man es nicht selbst erlebt hat. Es wird mit einer begrenzten Anzahl von Verben verwendet: 想像する (sich vorstellen), 推察する (vermuten), 理解する (verstehen), 予想する (erwarten). Die Konstruktion ist: <strong>Verb-Stammform + にかたくない</strong>. Dieser Ausdruck ist sehr formell und wird in schriftlichen Texten, Kommentaren und formellen Analysen verwendet.',
          examples: [
            { jp: '被災地の方々の苦しみは想像にかたくない。', romaji: 'Hisaichi no katagata no kurushimi wa sōzō ni kataku nai.', de: 'Das Leid der Menschen im Katastrophengebiet ist leicht vorstellbar.' },
            { jp: '彼がどれほど悔しかったか、推察にかたくない。', romaji: 'Kare ga dore hodo kuyashikatta ka, suisatsu ni kataku nai.', de: 'Es ist nicht schwer zu erahnen, wie frustriert er gewesen sein muss.' },
            { jp: 'この決定が大きな影響を及ぼすことは予想にかたくない。', romaji: 'Kono kettei ga ōkina eikyō wo oyobosu koto wa yosō ni kataku nai.', de: 'Es ist leicht vorherzusehen, dass diese Entscheidung große Auswirkungen haben wird.' },
          ],
          tip: 'Die häufigste Kombination ist 想像にかたくない. Merke dir diesen Ausdruck als feste Wendung — er erscheint regelmäßig in der N1-Prüfung.'
        }
      ]
    },
    // ===================== LEKTION 55 =====================
    {
      id: 'lesson-55',
      number: 55,
      title: '～たが最後 / ～が早いか / ～や否や / ～なり',
      subtitle: 'Im selben Moment',
      level: 'N1',
      intro: 'Diese Lektion behandelt vier Ausdrücke, die alle beschreiben, dass eine zweite Handlung sofort nach der ersten eintritt — praktisch im selben Augenblick. Obwohl sie sich in der Grundbedeutung ähneln, unterscheiden sich ihre Nuancen erheblich. ～たが最後 bedeutet, dass nach der ersten Handlung kein Zurück mehr möglich ist (negative Konsequenz), ～が早いか betont die blitzschnelle Abfolge aus der Beobachterperspektive, ～や否や drückt eine unmittelbare Reaktion aus, und ～なり beschreibt eine sofortige, oft unerwartete Handlung. Diese Formen gehören zum gehobenen Sprachregister und sind besonders in der Literatur und in der N1-Prüfung von Bedeutung.',
      sections: [
        {
          heading: '～たが最後 — Wenn einmal..., dann... (kein Zurück)',
          text: '～たが最後 (た + が + 最後) bedeutet wörtlich „wenn es das letzte Mal war, dass..." und drückt aus, dass nach einer bestimmten Handlung ein <strong>unumkehrbarer, negativer Zustand</strong> eintritt. Es enthält die Nuance: „Wenn du das einmal tust, ist es vorbei." Die erste Handlung löst eine Kettenreaktion aus, die nicht mehr gestoppt werden kann. Die Konstruktion ist: <strong>Verb (た-Form) + が最後</strong>. Der zweite Satzteil beschreibt immer eine negative oder unerwünschte Konsequenz.',
          examples: [
            { jp: 'あの人にお金を貸したが最後、二度と返ってこない。', romaji: 'Ano hito ni okane wo kashita ga saigo, nido to kaette konai.', de: 'Wenn du dieser Person einmal Geld leihst, bekommst du es nie wieder zurück.' },
            { jp: 'このゲームを始めたが最後、何時間も止められなくなる。', romaji: 'Kono gēmu wo hajimeta ga saigo, nanjikan mo tomerarenaku naru.', de: 'Wenn man dieses Spiel einmal anfängt, kann man stundenlang nicht mehr aufhören.' },
            { jp: '彼女に秘密を話したが最後、全員に知れ渡る。', romaji: 'Kanojo ni himitsu wo hanashita ga saigo, zen\'in ni shirewataru.', de: 'Wenn man ihr einmal ein Geheimnis erzählt, erfährt es jeder.' },
          ],
          tip: '～たが最後 wird immer mit negativen Konsequenzen verwendet. Es ist eine Warnung: „Tu das bloß nicht, denn sonst..." Ähnlich wie ～たら最後.'
        },
        {
          heading: '～が早いか — Kaum dass... / In dem Moment, als...',
          text: '～が早いか bedeutet wörtlich „ob es schnell war" und beschreibt, dass die zweite Handlung so schnell auf die erste folgt, dass sie <strong>praktisch gleichzeitig</strong> stattfindet. Es wird aus der <em>Beobachterperspektive</em> verwendet — der Sprecher beschreibt, was er bei jemand anderem beobachtet hat. Die Konstruktion ist: <strong>Verb (辞書形/た形) + が早いか</strong>. Die zweite Handlung ist oft überraschend, energisch oder impulsiv.',
          examples: [
            { jp: 'ベルが鳴るが早いか、生徒たちは教室を飛び出した。', romaji: 'Beru ga naru ga hayai ka, seitotachi wa kyōshitsu wo tobidashita.', de: 'Kaum hatte die Glocke geläutet, stürmten die Schüler aus dem Klassenzimmer.' },
            { jp: '彼はドアを開けるが早いか、部屋に駆け込んだ。', romaji: 'Kare wa doa wo akeru ga hayai ka, heya ni kakekonda.', de: 'Kaum hatte er die Tür geöffnet, stürmte er ins Zimmer.' },
            { jp: '母の姿を見るが早いか、子供は泣き出した。', romaji: 'Haha no sugata wo miru ga hayai ka, kodomo wa nakidashita.', de: 'Kaum hatte das Kind seine Mutter erblickt, fing es an zu weinen.' },
          ],
          tip: '～が早いか beschreibt beobachtete Szenen — man erzählt, was man bei anderen gesehen hat. Es wird nicht für eigene Handlungen verwendet.'
        },
        {
          heading: '～や否や — Kaum... als auch schon...',
          text: '～や否や (やいなや) bedeutet wörtlich „ob es... oder ob es nicht..." und drückt aus, dass die zweite Handlung <strong>sofort und unmittelbar</strong> auf die erste folgt. Es betont die Schnelligkeit und Unmittelbarkeit der Reaktion. Die Konstruktion ist: <strong>Verb (辞書形) + や否や</strong>. Im Vergleich zu ～が早いか ist ～や否や etwas formeller und wird häufiger in der Schriftsprache verwendet. Es kann sowohl für eigene als auch für beobachtete Handlungen verwendet werden.',
          examples: [
            { jp: '目が覚めるや否や、彼は携帯電話を確認した。', romaji: 'Me ga sameru ya ina ya, kare wa keitai denwa wo kakunin shita.', de: 'Kaum war er aufgewacht, überprüfte er sein Handy.' },
            { jp: '試合終了の笛が鳴るや否や、観客は立ち上がった。', romaji: 'Shiai shūryō no fue ga naru ya ina ya, kankyaku wa tachiagatta.', de: 'Kaum ertönte der Schlusspfiff, sprangen die Zuschauer auf.' },
            { jp: '電車のドアが開くや否や、乗客がなだれ込んだ。', romaji: 'Densha no doa ga hiraku ya ina ya, jōkyaku ga nadarekonda.', de: 'Kaum öffneten sich die Zugtüren, strömten die Fahrgäste hinein.' },
          ],
          tip: '～や否や verwendet immer die Wörterbuchform des Verbs. Es klingt sehr literarisch und elegant.'
        },
        {
          heading: '～なり — Sobald... sofort... (unerwartet)',
          text: '～なり beschreibt, dass jemand <strong>sofort nach einer Handlung</strong> etwas Unerwartetes tut. Es hat die Nuance, dass die zweite Handlung <em>überraschend</em> oder <em>unerwartet</em> ist — oft impulsiv oder unhöflich. Die Konstruktion ist: <strong>Verb (辞書形) + なり</strong>. Ein wichtiges Merkmal: Das Subjekt der ersten und zweiten Handlung muss <strong>dieselbe Person</strong> sein (in der Regel eine dritte Person, nicht der Sprecher selbst). Dieser Ausdruck wird fast ausschließlich in erzählendem Kontext verwendet.',
          examples: [
            { jp: '彼は部屋に入るなり、ソファに倒れ込んだ。', romaji: 'Kare wa heya ni hairu nari, sofa ni taorekonda.', de: 'Kaum betrat er das Zimmer, ließ er sich auf das Sofa fallen.' },
            { jp: '電話に出るなり、彼女は怒鳴り始めた。', romaji: 'Denwa ni deru nari, kanojo wa donari hajimeta.', de: 'Sobald sie den Hörer abnahm, fing sie an zu schreien.' },
            { jp: '彼は私の顔を見るなり、泣き出した。', romaji: 'Kare wa watashi no kao wo miru nari, nakidashita.', de: 'Sobald er mein Gesicht sah, brach er in Tränen aus.' },
          ],
          tip: 'Merke die Unterschiede: ～たが最後 = negative Konsequenz, ～が早いか = beobachtete schnelle Handlung, ～や否や = sofortige Reaktion, ～なり = überraschende sofortige Handlung derselben Person.'
        }
      ]
    },
    // ===================== LEKTION 56 =====================
    {
      id: 'lesson-56',
      number: 56,
      title: '～ごとき / ～ごとく / ～いかんによらず / ～いかんにかかわらず',
      subtitle: 'Wie... / Ungeachtet...',
      level: 'N1',
      intro: 'In dieser Lektion behandeln wir zwei wichtige Gruppen von N1-Grammatik. Die erste Gruppe — ～ごとき und ～ごとく — stammt aus dem klassischen Japanisch und wird für poetische, literarische Vergleiche verwendet. Sie entsprechen dem modernen ～ような / ～ように, klingen aber wesentlich gehobener und feierlicher. Die zweite Gruppe — ～いかんによらず und ～いかんにかかわらず — drückt aus, dass etwas ungeachtet der Umstände gilt. Das Wort いかん (如何) bedeutet „wie, auf welche Weise" und ist ein Schlüsselwort für formelle japanische Ausdrucksweisen. Beide Gruppen sind in formellen Texten, literarischen Werken und offiziellen Dokumenten allgegenwärtig.',
      sections: [
        {
          heading: '～ごとく / ～ごとき — Wie / Gleich wie (klassischer Vergleich)',
          text: '～ごとく und ～ごとき stammen vom klassisch-japanischen Wort 如し (gotoshi, „gleich wie"). <strong>～ごとく</strong> wird adverbial verwendet (modifiziert ein Verb), während <strong>～ごとき</strong> attributiv verwendet wird (modifiziert ein Nomen). Die Konstruktion ist: <strong>Nomen + の + ごとく/ごとき</strong> oder <strong>Verb (が) + ごとく/ごとき</strong>. Diese Formen sind wesentlich literarischer als ～のように/～のような und werden in poetischen Texten, Sprichwörtern, Reden und dramatischen Beschreibungen verwendet. In der Umgangssprache kommen sie praktisch nicht vor.',
          examples: [
            { jp: '光陰矢のごとし。', romaji: 'Kōin ya no gotoshi.', de: 'Die Zeit vergeht wie ein Pfeil. (Sprichwort)' },
            { jp: '彼は風のごとく駆け抜けた。', romaji: 'Kare wa kaze no gotoku kakenuketa.', de: 'Er raste hindurch wie der Wind.' },
            { jp: '水のごとき透明感のある声だった。', romaji: 'Mizu no gotoki tōmeikan no aru koe datta.', de: 'Es war eine Stimme von kristallener Klarheit, gleich dem Wasser.' },
          ],
          tip: 'ごとく = adverbial (vor Verben), ごとき = attributiv (vor Nomen), ごとし = am Satzende (prädikativ). Diese drei sind die drei Formen desselben klassischen Wortes.'
        },
        {
          heading: '～ごとき als Bescheidenheit oder Geringschätzung',
          text: '～ごとき hat eine besondere Verwendung, um Bescheidenheit oder Geringschätzung auszudrücken. Wenn man es auf <strong>sich selbst</strong> bezieht, drückt es extreme <em>Bescheidenheit</em> aus: „Jemand wie ich (der nichts wert ist)." Wenn man es auf <strong>andere</strong> bezieht, kann es <em>Verachtung</em> oder <em>Geringschätzung</em> ausdrücken: „Jemand wie du (der es nicht wert ist)." Diese Verwendung ist sehr formell und kommt besonders in historischen Dramen, Romanen und formellen Reden vor.',
          examples: [
            { jp: '私ごときが意見を述べるのは恐れ多い。', romaji: 'Watashi gotoki ga iken wo noberu no wa osore ōi.', de: 'Es wäre anmaßend, wenn jemand wie ich eine Meinung äußern würde.' },
            { jp: 'お前ごときに何がわかる。', romaji: 'Omae gotoki ni nani ga wakaru.', de: 'Was kann jemand wie du schon verstehen?' },
            { jp: '素人ごときが口を出すな。', romaji: 'Shirōto gotoki ga kuchi wo dasu na.', de: 'Ein Laie wie du soll sich nicht einmischen.' },
          ],
          tip: 'Auf sich selbst bezogen = extreme Bescheidenheit. Auf andere bezogen = Geringschätzung. Der Kontext macht den Unterschied deutlich.'
        },
        {
          heading: '～いかんによらず / ～いかんにかかわらず — Ungeachtet / Unabhängig von',
          text: 'いかん (如何) bedeutet „wie, auf welche Weise" und ist die Grundlage für mehrere formelle Ausdrücke. <strong>～いかんによらず</strong> und <strong>～いかんにかかわらず</strong> bedeuten beide „ungeachtet" oder „unabhängig von" und drücken aus, dass ein Ergebnis <strong>nicht von den Umständen abhängt</strong>. Die Konstruktion ist: <strong>Nomen + のいかんによらず/にかかわらず</strong> oder <strong>Nomen + いかんによらず/にかかわらず</strong>. Diese Ausdrücke sind extrem formell und kommen vor allem in offiziellen Dokumenten, Verträgen, Regelwerken und Geschäftskommunikation vor. Eine kürzere Variante ist ～いかんを問わず.',
          examples: [
            { jp: '理由のいかんによらず、暴力は許されない。', romaji: 'Riyū no ikan ni yorazu, bōryoku wa yurusarenai.', de: 'Ungeachtet der Gründe ist Gewalt nicht zu dulden.' },
            { jp: '結果のいかんにかかわらず、全力を尽くすべきだ。', romaji: 'Kekka no ikan ni kakawarazu, zenryoku wo tsukusu beki da.', de: 'Unabhängig vom Ergebnis sollte man sein Bestes geben.' },
            { jp: '国籍のいかんを問わず、すべての市民に適用される。', romaji: 'Kokuseki no ikan wo towazu, subete no shimin ni tekiyō sareru.', de: 'Ungeachtet der Staatsangehörigkeit gilt dies für alle Bürger.' },
          ],
          tip: '～いかんによらず/にかかわらず = „egal wie" (Ergebnis ist fest). ～いかんにかかっている/によって = „hängt davon ab, wie" (Ergebnis ist variabel). Beachte den wichtigen Bedeutungsunterschied!'
        }
      ]
    },
    // ===================== LEKTION 57 =====================
    {
      id: 'lesson-57',
      number: 57,
      title: '～極まりない / ～の極み / ～の至り / ～限りだ',
      subtitle: 'Das Äußerste',
      level: 'N1',
      intro: 'In dieser Lektion beschäftigen wir uns mit vier Ausdrücken, die alle den höchsten Grad oder das Extrem einer Eigenschaft oder eines Gefühls beschreiben. Sie bedeuten alle ungefähr „äußerst, im höchsten Maße, der Gipfel von...", unterscheiden sich aber in Verwendung und Nuance. ～極まりない ist ein starker Ausdruck für extreme Eigenschaften, ～の極み beschreibt den absoluten Höhepunkt eines Zustands, ～の至り drückt tiefe persönliche Empfindungen aus (besonders in festen Wendungen), und ～限りだ beschreibt ein Gefühl, das stärker nicht sein könnte. Diese Ausdrücke sind für die N1-Prüfung essentiell und verleihen formellen Texten und Reden besonderen Nachdruck.',
      sections: [
        {
          heading: '～極まりない / ～極まる — Äußerst / Im höchsten Maße',
          text: '～極まりない (きわまりない) und ～極まる (きわまる) bedeuten „äußerst" oder „grenzenlos" und drücken aus, dass eine Eigenschaft ihr <strong>absolutes Maximum</strong> erreicht hat. 極まる bedeutet „an die Grenze kommen", und die Verneinung 極まりない bedeutet paradoxerweise dasselbe — „es gibt keine Grenze, so extrem ist es". Die Konstruktion ist: <strong>な-Adjektiv (Stamm) + 極まりない/極まる</strong>. Dieser Ausdruck wird häufig mit negativen Adjektiven verwendet (gefährlich, unhöflich, dumm), kann aber auch positiv sein.',
          examples: [
            { jp: 'あの運転は危険極まりない。', romaji: 'Ano unten wa kiken kiwamarinai.', de: 'Dieses Fahrverhalten ist äußerst gefährlich.' },
            { jp: '彼の態度は失礼極まる。', romaji: 'Kare no taido wa shitsurei kiwamaru.', de: 'Sein Verhalten ist im höchsten Maße unhöflich.' },
            { jp: 'そのような発言は不謹慎極まりない。', romaji: 'Sono yō na hatsugen wa fukinsin kiwamarinai.', de: 'Solche Äußerungen sind äußerst taktlos.' },
          ],
          tip: '極まりない und 極まる sind austauschbar, wobei 極まりない etwas häufiger verwendet wird. Beachte: Es wird nur mit な-Adjektiven verwendet, nicht mit い-Adjektiven.'
        },
        {
          heading: '～の極み — Der Gipfel von / Der Inbegriff von',
          text: '～の極み (きわみ) bedeutet „der Gipfel" oder „der Inbegriff" und beschreibt den <strong>absoluten Höhepunkt</strong> eines Zustands oder einer Eigenschaft. Es wird als feste Wendung mit bestimmten Nomen verwendet und hat einen sehr feierlichen, gehobenen Klang. Die Konstruktion ist: <strong>Nomen + の極み</strong>. Besonders häufige Verbindungen sind: 贅沢の極み (der Gipfel des Luxus), 疲労の極み (völlige Erschöpfung), 幸せの極み (das höchste Glück). In der Alltagssprache kennt man es auch als Teil von 感極まる (von Emotionen überwältigt werden).',
          examples: [
            { jp: 'この料理は贅沢の極みだ。', romaji: 'Kono ryōri wa zeitaku no kiwami da.', de: 'Dieses Gericht ist der Gipfel des Luxus.' },
            { jp: '疲労の極みに達して、彼はその場に倒れた。', romaji: 'Hirō no kiwami ni tasshite, kare wa sono ba ni taoreta.', de: 'Am Gipfel der Erschöpfung angekommen, brach er an Ort und Stelle zusammen.' },
            { jp: '優勝の瞬間、感極まって涙を流した。', romaji: 'Yūshō no shunkan, kan kiwamatte namida wo nagashita.', de: 'Im Moment des Sieges wurde er von seinen Gefühlen überwältigt und vergoss Tränen.' },
          ],
          tip: '～の極み klingt sehr poetisch und feierlich. Es wird oft in Reden, Bewertungen und literarischen Beschreibungen verwendet.'
        },
        {
          heading: '～の至り — Tiefe Empfindung (formelle Wendungen)',
          text: '～の至り (いたり) bedeutet wörtlich „das Äußerste von" und wird in <strong>festen Wendungen</strong> verwendet, um tiefe persönliche Empfindungen auszudrücken, besonders in formellen Situationen wie Reden, Briefen und offiziellen Anlässen. 至り kommt vom Verb 至る (itaru, „erreichen") und bedeutet hier „der höchste Grad". Die wichtigsten festen Verbindungen sind: 光栄の至り (die höchste Ehre), 恐縮の至り (es ist mir äußerst unangenehm), 若気の至り (Jugendtorheit), 赤面の至り (zum Erröten). Die Konstruktion ist: <strong>Nomen + の至り</strong>.',
          examples: [
            { jp: 'お招きいただき、光栄の至りでございます。', romaji: 'Omaneki itadaki, kōei no itari de gozaimasu.', de: 'Es ist mir die höchste Ehre, eingeladen worden zu sein.' },
            { jp: 'お忙しいところ恐縮の至りですが、お願いがございます。', romaji: 'Oisogashii tokoro kyōshuku no itari desu ga, onegai ga gozaimasu.', de: 'Es ist mir äußerst unangenehm, Sie in Ihrer beschäftigten Zeit zu stören, aber ich habe eine Bitte.' },
            { jp: 'あの頃の失敗は若気の至りだった。', romaji: 'Ano koro no shippai wa wakage no itari datta.', de: 'Die Fehler von damals waren Jugendtorheiten.' },
          ],
          tip: '～の至り kommt fast nur in festen Wendungen vor. Lerne diese als Ganzes auswendig — besonders 光栄の至り und 若気の至り erscheinen häufig in der N1-Prüfung.'
        },
        {
          heading: '～限りだ — So... wie nur möglich (persönliche Empfindung)',
          text: '～限りだ (かぎりだ) drückt aus, dass ein Gefühl so stark ist, dass es <strong>stärker nicht sein könnte</strong>. Es wird verwendet, um persönliche, subjektive Empfindungen zu beschreiben — der Sprecher fühlt etwas im höchsten Maße. Die Konstruktion ist: <strong>い-Adjektiv + 限りだ</strong> oder <strong>な-Adjektiv + な + 限りだ</strong>. Typische Adjektive sind: うらやましい (beneidenswert), 心強い (ermutigend), うれしい (erfreulich), 残念な (bedauerlich), 心細い (ängstlich, unsicher).',
          examples: [
            { jp: '海外で活躍している彼が羨ましい限りだ。', romaji: 'Kaigai de katsuyaku shite iru kare ga urayamashii kagiri da.', de: 'Ich beneide ihn, der im Ausland so erfolgreich ist, auf das Äußerste.' },
            { jp: '皆様のご支援をいただけるとは、心強い限りです。', romaji: 'Minasama no go-shien wo itadakeru to wa, kokorozuyoi kagiri desu.', de: 'Dass ich Ihre Unterstützung erhalten kann, ist äußerst ermutigend.' },
            { jp: '息子が無事に戻ってきて、嬉しい限りだ。', romaji: 'Musuko ga buji ni modotte kite, ureshii kagiri da.', de: 'Dass mein Sohn wohlbehalten zurückgekehrt ist, macht mich unendlich froh.' },
          ],
          tip: 'Vergleich: ～極まりない = objektive Extrembewertung (な-Adj.), ～の極み = poetischer Höhepunkt, ～の至り = feste formelle Wendungen, ～限りだ = persönliches Extrem-Gefühl (い/な-Adj.).'
        }
      ]
    },
    // ===================== LEKTION 58 =====================
    {
      id: 'lesson-58',
      number: 58,
      title: 'N1 Formales Schriftjapanisch',
      subtitle: 'Offiziell, förmlich, unverzichtbar',
      level: 'N1',
      intro: 'Diese abschließende Lektion behandelt fünf formelle Ausdrücke, die in offiziellen Dokumenten, Nachrichtenartikeln, akademischen Texten und Geschäftskorrespondenz allgegenwärtig sind. Sie bilden das Rückgrat des gehobenen Schriftjapanisch und sind für das Verständnis formeller Texte unerlässlich. ～において/における markiert den Rahmen oder Kontext einer Aussage, ～に即して bedeutet „in Übereinstimmung mit" der Realität, ～に準じて bedeutet „gemäß" einer Regel oder einem Standard, und ～をもって gibt das Mittel, den Zeitpunkt oder den Grund an. Diese Ausdrücke erscheinen in nahezu jedem N1-Lesetext und sind für eine erfolgreiche Prüfung unverzichtbar.',
      sections: [
        {
          heading: '～において / ～における — In / Bei / Im Bereich von',
          text: '～において und ～における sind die formellen Entsprechungen von ～で (Ort, Bereich, Zeitpunkt). <strong>～において</strong> wird adverbial verwendet (am Ende einer Bestimmung), während <strong>～における</strong> attributiv verwendet wird (vor einem Nomen). Sie markieren den <em>Rahmen</em>, <em>Kontext</em> oder <em>Bereich</em>, in dem etwas stattfindet — sei es ein physischer Ort, ein Fachgebiet, eine Zeitperiode oder eine Situation. Die Konstruktion ist: <strong>Nomen + において/における</strong>. Diese Ausdrücke sind in Nachrichtenartikeln, akademischen Texten und offiziellen Dokumenten extrem häufig.',
          examples: [
            { jp: '本会議は東京において開催される。', romaji: 'Hon kaigi wa Tōkyō ni oite kaisai sareru.', de: 'Diese Konferenz wird in Tokio abgehalten.' },
            { jp: '現代社会における技術の役割は計り知れない。', romaji: 'Gendai shakai ni okeru gijutsu no yakuwari wa hakarishirenai.', de: 'Die Rolle der Technologie in der modernen Gesellschaft ist unermesslich.' },
            { jp: '教育の分野において、日本は高い水準を維持している。', romaji: 'Kyōiku no bun\'ya ni oite, Nihon wa takai suijun wo iji shite iru.', de: 'Im Bereich der Bildung hält Japan ein hohes Niveau aufrecht.' },
          ],
          tip: '～において = ～で (formell). ～における = ～での (formell, vor Nomen). Diese Umwandlung hilft beim Verständnis: 学校で → 学校において, 学校での → 学校における.'
        },
        {
          heading: '～に即して / ～に即した — In Übereinstimmung mit / Entsprechend der Realität',
          text: '～に即して (にそくして) bedeutet „in Übereinstimmung mit" oder „angepasst an" und betont, dass etwas auf der <strong>tatsächlichen Realität, Praxis oder konkreten Umständen</strong> basiert — nicht auf Theorie oder Idealvorstellungen. 即する (sokusuru) bedeutet „entsprechen, sich anpassen". <strong>～に即して</strong> wird adverbial verwendet, <strong>～に即した</strong> attributiv (vor einem Nomen). Die Konstruktion ist: <strong>Nomen + に即して/に即した</strong>. Typische Nomen sind: 現実 (Realität), 実態 (tatsächlicher Zustand), 実情 (reale Umstände), 法律 (Gesetz).',
          examples: [
            { jp: '現実に即した対策を講じる必要がある。', romaji: 'Genjitsu ni sokushita taisaku wo kōjiru hitsuyō ga aru.', de: 'Es ist notwendig, realitätsnahe Gegenmaßnahmen zu ergreifen.' },
            { jp: '時代に即して、法律を改正すべきだ。', romaji: 'Jidai ni sokushite, hōritsu wo kaisei subeki da.', de: 'Man sollte die Gesetze entsprechend der Zeit reformieren.' },
            { jp: '地域の実情に即した教育が求められている。', romaji: 'Chiiki no jitsujō ni sokushita kyōiku ga motomerarete iru.', de: 'Es wird eine Bildung gefordert, die den tatsächlichen Verhältnissen der Region entspricht.' },
          ],
          tip: '～に即して betont die Verbindung zur Realität. Es wird oft verwendet, wenn man kritisiert, dass etwas zu theoretisch ist, und fordert, sich an die Wirklichkeit anzupassen.'
        },
        {
          heading: '～に準じて / ～に準ずる — Gemäß / Entsprechend (einem Standard)',
          text: '～に準じて (にじゅんじて) bedeutet „gemäß", „entsprechend" oder „analog zu" und drückt aus, dass etwas nach einem bestimmten <strong>Standard, einer Regel oder einem Vorbild</strong> behandelt wird. 準じる (junjiru) bedeutet „sich richten nach, entsprechen". Im Gegensatz zu ～に即して, das sich auf die Realität bezieht, bezieht sich ～に準じて auf <strong>Regeln, Normen und bestehende Systeme</strong>. <strong>～に準ずる</strong> ist die attributive Form (vor Nomen). Die Konstruktion ist: <strong>Nomen + に準じて/に準ずる</strong>. Dieser Ausdruck ist besonders häufig in Verträgen, Arbeitsrichtlinien und Gesetzestexten.',
          examples: [
            { jp: 'パートタイムの社員も正社員に準じた待遇を受ける。', romaji: 'Pāto taimu no shain mo seishain ni junjita taigū wo ukeru.', de: 'Auch Teilzeitmitarbeiter erhalten eine Behandlung entsprechend der Festangestellten.' },
            { jp: '前例に準じて処理してください。', romaji: 'Zenrei ni junjite shori shite kudasai.', de: 'Bitte bearbeiten Sie es gemäß dem Präzedenzfall.' },
            { jp: '管理職に準ずる立場の社員も対象となる。', romaji: 'Kanrishoku ni junzuru tachiba no shain mo taishō to naru.', de: 'Auch Mitarbeiter in einer Stellung, die einer Führungsposition entspricht, fallen darunter.' },
          ],
          tip: 'Unterschied: ～に即して = an die Realität angepasst (flexibel). ～に準じて = gemäß einem bestehenden Standard (regelbasiert). Beides ist formell, aber der Bezugspunkt ist verschieden.'
        },
        {
          heading: '～をもって — Mit / Durch / Ab (Mittel, Zeitpunkt, Grund)',
          text: '～をもって ist ein vielseitiger formeller Ausdruck mit drei Hauptbedeutungen. <strong>Erstens</strong> gibt er das <em>Mittel</em> oder die <em>Methode</em> an: „mit, durch" (formelle Version von ～で). <strong>Zweitens</strong> markiert er einen <em>Zeitpunkt</em>: „ab, mit" — besonders bei offiziellen Terminen und Fristen. <strong>Drittens</strong> gibt er den <em>Grund</em> oder die <em>Grundlage</em> an. Die Konstruktion ist: <strong>Nomen + をもって</strong>. Dieser Ausdruck ist in Geschäftsbriefen, offiziellen Ankündigungen und formellen Mitteilungen äußerst verbreitet.',
          examples: [
            { jp: '書面をもってご連絡いたします。', romaji: 'Shomen wo motte go-renraku itashimasu.', de: 'Wir werden Sie schriftlich benachrichtigen.' },
            { jp: '本日をもって、このサービスは終了いたします。', romaji: 'Honjitsu wo motte, kono sābisu wa shūryō itashimasu.', de: 'Mit dem heutigen Tag wird dieser Service eingestellt.' },
            { jp: '誠意をもって対応させていただきます。', romaji: 'Seii wo motte taiō sasete itadakimasu.', de: 'Wir werden mit Aufrichtigkeit darauf reagieren.' },
          ],
          tip: 'Die höfliche Form をもちまして wird besonders häufig am Ende von Veranstaltungen und Zeremonien verwendet: 以上をもちまして... (Hiermit...). Lerne diese Wendung als feste Formel.'
        }
      ]
    },

    // ===================== LEKTION 59 =====================
    {
      id: 'lesson-59',
      number: 59,
      title: '～に伴って・につれて',
      subtitle: 'Korrelative Veränderung — „Je mehr X, desto mehr Y"',
      level: 'N2',
      intro: 'Diese Lektion behandelt zwei wichtige N2-Grammatikpunkte, die beide eine korrelative Veränderung ausdrücken: Wenn sich X verändert, verändert sich Y proportional dazu mit. Beide Ausdrücke sind im Alltag und in Prüfungstexten extrem häufig. ～に伴って betont, dass eine Veränderung eine andere begleitet oder verursacht, während ～につれて eine allmähliche, parallele Veränderung beschreibt. Der Unterschied ist subtil, aber wichtig für die N2-Prüfung.',
      sections: [
        {
          heading: '～に伴って / に伴い — Einhergehend mit / Mit... zusammen',
          text: '～に伴って (にともなって) drückt aus, dass eine Veränderung oder ein Ereignis eine andere Veränderung <strong>nach sich zieht</strong> oder <strong>begleitet</strong>. Es wird oft für größere, gesellschaftliche oder natürliche Veränderungen verwendet. Die Konstruktion ist: <strong>Nomen + に伴って</strong> oder <strong>Verb (辞書形) + のに伴って</strong>. Die formellere Variante ～に伴い wird in Schrifttexten bevorzugt. Vor Nomen wird ～に伴う verwendet.',
          examples: [
            { jp: '人口の増加に伴って、住宅問題が深刻になっている。', romaji: 'Jinkō no zōka ni tomonatte, jūtaku mondai ga shinkoku ni natte iru.', de: 'Mit dem Bevölkerungswachstum wird das Wohnungsproblem immer ernster.' },
            { jp: '経済の発展に伴い、環境破壊も進んだ。', romaji: 'Keizai no hatten ni tomonai, kankyō hakai mo susunda.', de: 'Einhergehend mit der wirtschaftlichen Entwicklung schritt auch die Umweltzerstörung voran.' },
            { jp: '台風に伴う大雨に警戒してください。', romaji: 'Taifū ni tomonau ōame ni keikai shite kudasai.', de: 'Bitte seien Sie auf der Hut vor dem starken Regen, der mit dem Taifun einhergeht.' },
          ],
          tip: '～に伴って kann auch mit einmaligen Ereignissen verwendet werden (z. B. 引っ越しに伴って = „im Zuge des Umzugs"), nicht nur mit graduellen Veränderungen.'
        },
        {
          heading: '～につれて / につれ — Je mehr... desto...',
          text: '～につれて drückt aus, dass sich zwei Dinge <strong>parallel und allmählich</strong> verändern. Es betont den graduellen Charakter — je mehr das eine zunimmt, desto mehr verändert sich das andere. Die Konstruktion ist: <strong>Verb (辞書形) + につれて</strong> oder <strong>Nomen + につれて</strong>. Im Gegensatz zu ～に伴って passt ～につれて nur für graduelle Veränderungen und nicht für plötzliche Ereignisse.',
          examples: [
            { jp: '年を取るにつれて、体力が落ちてくる。', romaji: 'Toshi wo toru ni tsurete, tairyoku ga ochite kuru.', de: 'Je älter man wird, desto mehr lässt die Körperkraft nach.' },
            { jp: '日本語を勉強するにつれて、日本文化にも興味が出てきた。', romaji: 'Nihongo wo benkyō suru ni tsurete, Nihon bunka ni mo kyōmi ga dete kita.', de: 'Je mehr ich Japanisch lerne, desto mehr interessiere ich mich auch für die japanische Kultur.' },
            { jp: '春が近づくにつれて、日が長くなってきた。', romaji: 'Haru ga chikazuku ni tsurete, hi ga nagaku natte kita.', de: 'Je näher der Frühling rückt, desto länger werden die Tage.' },
          ],
          tip: 'Merke: ～につれて = immer graduelle, parallele Veränderung. ～に伴って = kann auch einmalige Ereignisse oder Begleiterscheinungen beschreiben.'
        },
        {
          heading: 'Vergleich und Anwendung',
          text: 'Beide Ausdrücke übersetzen sich oft mit „mit" oder „je mehr... desto...", aber sie sind nicht immer austauschbar. <strong>～に伴って</strong> betont die <em>Kausalität</em> oder <em>Begleiterscheinung</em> — eine Sache zieht die andere nach sich. <strong>～につれて</strong> betont die <em>Parallelität</em> — beide Dinge verändern sich gleichzeitig und allmählich. Bei graduellen Veränderungen können beide verwendet werden, aber bei einmaligen Ereignissen nur ～に伴って.',
          examples: [
            { jp: '技術が進歩するにつれて、生活が便利になった。', romaji: 'Gijutsu ga shinpo suru ni tsurete, seikatsu ga benri ni natta.', de: 'Je weiter die Technologie fortschreitet, desto bequemer wird das Leben. (Graduell → beide OK)' },
            { jp: '地震に伴って津波が発生した。', romaji: 'Jishin ni tomonatte tsunami ga hassei shita.', de: 'Im Zusammenhang mit dem Erdbeben entstand ein Tsunami. (Einmalig → nur に伴って)' },
            { jp: '気温が上がるにつれて、雪が溶け始めた。', romaji: 'Kion ga agaru ni tsurete, yuki ga toke hajimeta.', de: 'Je mehr die Temperatur steigt, desto mehr beginnt der Schnee zu schmelzen.' }
          ],
          tip: 'In der N2-Prüfung wird gerne nach dem Unterschied gefragt. Faustregel: Wenn es ein einmaliges Ereignis mit Folgen ist → に伴って. Wenn es eine langsame, parallele Veränderung ist → につれて (oder に伴って).'
        }
      ]
    },

    // ===================== LEKTION 60 =====================
    {
      id: 'lesson-60',
      number: 60,
      title: '～を契機に・をきっかけに',
      subtitle: 'Den Anlass nutzen — Auslöser und Wendepunkte',
      level: 'N2',
      intro: 'Diese Lektion stellt zwei Ausdrücke vor, die einen Anlass oder Auslöser für eine Veränderung beschreiben. ～を契機に (をけいきに) ist formeller und wird für bedeutende Wendepunkte verwendet, während ～をきっかけに alltagstauglicher ist und für persönliche Auslöser passt. Beide beantworten die Frage: „Was war der Anlass dafür, dass...?" und sind in der N2-Prüfung häufig anzutreffen.',
      sections: [
        {
          heading: '～をきっかけに / きっかけで — Als Anlass / Ausgelöst durch',
          text: 'きっかけ bedeutet „Anlass, Anstoß, Auslöser" und beschreibt das Ereignis, das den <strong>ersten Impuls</strong> für eine Veränderung gegeben hat. Die Konstruktion ist: <strong>Nomen + をきっかけに/で</strong> oder <strong>Verb (た-Form) + のをきっかけに</strong>. Es wird sowohl in der Alltags- als auch in der Schriftsprache verwendet und eignet sich besonders für persönliche Erfahrungen und Wendepunkte.',
          examples: [
            { jp: '留学をきっかけに、日本語を勉強し始めた。', romaji: 'Ryūgaku wo kikkake ni, Nihongo wo benkyō shi hajimeta.', de: 'Das Auslandsstudium war der Anlass, Japanisch zu lernen.' },
            { jp: '友達に誘われたのをきっかけに、テニスを始めた。', romaji: 'Tomodachi ni sasowareta no wo kikkake ni, tenisu wo hajimeta.', de: 'Dass mich ein Freund einlud, war der Anlass, mit Tennis anzufangen.' },
            { jp: '病気をきっかけに、健康に気をつけるようになった。', romaji: 'Byōki wo kikkake ni, kenkō ni ki wo tsukeru yō ni natta.', de: 'Die Krankheit war der Anlass, auf meine Gesundheit zu achten.' },
          ],
          tip: 'きっかけ wird auch als eigenständiges Nomen sehr häufig verwendet: 「日本語を勉強するきっかけは何ですか」 (Was war der Anlass, Japanisch zu lernen?) — eine beliebte Gesprächsfrage!'
        },
        {
          heading: '～を契機に / を契機として — Mit... als Wendepunkt',
          text: '～を契機に (をけいきに) ist die formellere Variante und wird für <strong>bedeutsame, gesellschaftliche oder historische Wendepunkte</strong> verwendet. 契機 bedeutet „Gelegenheit, entscheidender Moment, Wendepunkt". Die Konstruktion ist: <strong>Nomen + を契機に/として</strong>. Dieser Ausdruck klingt gewichtiger als きっかけ und erscheint häufig in Nachrichtentexten, Berichten und formellen Analysen.',
          examples: [
            { jp: 'オリンピックを契機に、インフラが大幅に整備された。', romaji: 'Orinpikku wo keiki ni, infura ga ōhaba ni seibi sareta.', de: 'Die Olympischen Spiele waren der Anlass für einen umfassenden Ausbau der Infrastruktur.' },
            { jp: '震災を契機として、防災意識が高まった。', romaji: 'Shinsai wo keiki to shite, bōsai ishiki ga takamatta.', de: 'Die Erdbebenkatastrophe war der Wendepunkt, an dem das Katastrophenbewusstsein stieg.' },
            { jp: '法改正を契機に、働き方が大きく変わった。', romaji: 'Hō kaisei wo keiki ni, hatarakikata ga ōkiku kawatta.', de: 'Die Gesetzesänderung war der Anlass für eine grundlegende Veränderung der Arbeitsweise.' },
          ],
          tip: 'を契機に klingt formell und gewichtig — verwende es für große Ereignisse und gesellschaftliche Veränderungen. Für persönliche Erlebnisse im Alltag ist をきっかけに natürlicher.'
        }
      ]
    },

    // ===================== LEKTION 61 =====================
    {
      id: 'lesson-61',
      number: 61,
      title: '～に基づいて',
      subtitle: 'Auf Grundlage von — fundiert und begründet',
      level: 'N2',
      intro: 'Der Ausdruck ～に基づいて (にもとづいて) bedeutet „auf der Grundlage von" oder „basierend auf" und drückt aus, dass eine Handlung, Entscheidung oder Aussage auf etwas Konkretem — Daten, Gesetzen, Erfahrungen, Fakten — basiert. Er ist in formellen Texten, Berichten, Nachrichten und rechtlichen Kontexten allgegenwärtig und gehört zum Standardvokabular der N2-Prüfung.',
      sections: [
        {
          heading: '～に基づいて / に基づき — Basierend auf / Auf Grundlage von',
          text: '基づく (もとづく) ist ein Verb der Bedeutung „beruhen auf, gründen auf". In der て-Form wird es adverbial verwendet: <strong>Nomen + に基づいて</strong> bedeutet „auf Grundlage von X". Die formellere Kurzform ～に基づき wird in offiziellen Texten bevorzugt. Typische Nomen, die vorangehen, sind: データ (Daten), 法律 (Gesetz), 経験 (Erfahrung), 事実 (Tatsachen), 調査 (Untersuchung), 原則 (Prinzipien).',
          examples: [
            { jp: '調査結果に基づいて、新しい方針を決定した。', romaji: 'Chōsa kekka ni motozuite, atarashii hōshin wo kettei shita.', de: 'Auf Grundlage der Untersuchungsergebnisse wurde eine neue Richtlinie beschlossen.' },
            { jp: '法律に基づき、適切な措置を講じる。', romaji: 'Hōritsu ni motozuki, tekisetsu na sochi wo kōjiru.', de: 'Auf Grundlage des Gesetzes werden angemessene Maßnahmen ergriffen.' },
            { jp: '長年の経験に基づいて、アドバイスをさせていただきます。', romaji: 'Naganen no keiken ni motozuite, adobaisu wo sasete itadakimasu.', de: 'Ich erlaube mir, Ihnen auf Grundlage langjähriger Erfahrung einen Rat zu geben.' },
          ],
          tip: 'Die attributive Form ～に基づいた/に基づく steht direkt vor einem Nomen: 「データに基づいた判断」 (eine datenbasierte Entscheidung). Beide Formen (に基づいた und に基づく) sind korrekt.'
        },
        {
          heading: 'Vergleich mit ähnlichen Ausdrücken',
          text: 'Es gibt mehrere Ausdrücke, die „basierend auf" bedeuten, aber jeder hat seinen eigenen Fokus. <strong>～に基づいて</strong> betont eine solide, verlässliche Grundlage (Fakten, Gesetze, Daten). <strong>～をもとに</strong> ist informeller und bedeutet eher „als Ausgangsmaterial nehmend" — es impliziert, dass etwas Neues daraus entsteht. <strong>～によると</strong> gibt eine Quelle an („laut, gemäß") und wird für Zitate und Berichte verwendet.',
          examples: [
            { jp: '実際のデータに基づいて分析を行った。', romaji: 'Jissai no dēta ni motozuite bunseki wo okonatta.', de: 'Die Analyse wurde auf Grundlage tatsächlicher Daten durchgeführt. (Solide Basis)' },
            { jp: 'この映画は実話をもとに作られた。', romaji: 'Kono eiga wa jitsuwa wo moto ni tsukurareta.', de: 'Dieser Film wurde auf der Grundlage einer wahren Geschichte gedreht. (Ausgangsmaterial)' },
            { jp: '天気予報によると、明日は雨だそうだ。', romaji: 'Tenki yohō ni yoru to, ashita wa ame da sō da.', de: 'Laut Wettervorhersage soll es morgen regnen. (Quelle)' }
          ],
          tip: 'Faustregel: に基づいて = fundierte Basis (Gesetz, Daten). をもとに = kreatives Ausgangsmaterial (Geschichte, Idee). によると = Informationsquelle (Nachricht, Person).'
        }
      ]
    },

    // ===================== LEKTION 62 =====================
    {
      id: 'lesson-62',
      number: 62,
      title: '～を問わず・にかかわらず',
      subtitle: 'Egal was — Unabhängig von Bedingungen',
      level: 'N2',
      intro: 'Diese Lektion behandelt zwei Ausdrücke, die beide „unabhängig von" oder „egal ob" bedeuten und Einschränkungen aufheben. ～を問わず hebt eine bestimmte Kategorie oder Bedingung auf, während ～にかかわらず allgemeiner „trotz" oder „ungeachtet" ausdrückt. Beide sind in Stellenanzeigen, offiziellen Texten, Regeln und Ankündigungen extrem häufig und gehören zum N2-Kernwissen.',
      sections: [
        {
          heading: '～を問わず / を問わない — Ungeachtet / Egal ob',
          text: '問う (とう) bedeutet „fragen, in Frage stellen". ～を問わず bedeutet also wörtlich „ohne danach zu fragen" — also „ungeachtet, egal ob". Es wird verwendet, um auszudrücken, dass eine <strong>bestimmte Kategorie oder Bedingung keine Rolle spielt</strong>. Die Konstruktion ist: <strong>Nomen + を問わず</strong>. Häufig steht es mit Gegensatzpaaren wie 男女 (Mann/Frau), 年齢 (Alter), 経験の有無 (ob Erfahrung vorhanden oder nicht), 国籍 (Nationalität).',
          examples: [
            { jp: '年齢を問わず、どなたでもご参加いただけます。', romaji: 'Nenrei wo towazu, donata demo go-sanka itadakemasu.', de: 'Ungeachtet des Alters kann jeder teilnehmen.' },
            { jp: '経験の有無を問わず募集しています。', romaji: 'Keiken no umu wo towazu boshū shite imasu.', de: 'Wir suchen Mitarbeiter, unabhängig davon, ob Erfahrung vorhanden ist.' },
            { jp: '性別を問わず、能力のある人を採用する。', romaji: 'Seibetsu wo towazu, nōryoku no aru hito wo saiyō suru.', de: 'Ungeachtet des Geschlechts werden fähige Leute eingestellt.' },
          ],
          tip: '～を問わず wird besonders gerne in Stellenanzeigen verwendet. Merke dir Kombinationen wie 年齢を問わず, 経験を問わず, 男女を問わず — sie kommen regelmäßig in der N2-Prüfung vor.'
        },
        {
          heading: '～にかかわらず / にかかわりなく — Ungeachtet / Trotz',
          text: '～にかかわらず bedeutet „ungeachtet, ohne Rücksicht auf, trotz" und ist etwas allgemeiner als ～を問わず. Es kann mit Nomen, Gegensatzpaaren oder ganzen Sätzen verwendet werden. Die Konstruktion ist: <strong>Nomen + にかかわらず</strong> oder <strong>Verb (辞書形/ない形) + にかかわらず</strong>. Die Variante にかかわりなく hat die gleiche Bedeutung.',
          examples: [
            { jp: '天候にかかわらず、イベントは開催されます。', romaji: 'Tenkō ni kakawarazu, ibento wa kaisai saremasu.', de: 'Ungeachtet des Wetters findet die Veranstaltung statt.' },
            { jp: '賛成するかしないかにかかわらず、この計画は進められる。', romaji: 'Sansei suru ka shinai ka ni kakawarazu, kono keikaku wa susumerareru.', de: 'Egal ob man zustimmt oder nicht, dieser Plan wird vorangetrieben.' },
            { jp: '結果にかかわらず、全力を尽くしたことに意味がある。', romaji: 'Kekka ni kakawarazu, zenryoku wo tsukushita koto ni imi ga aru.', de: 'Ungeachtet des Ergebnisses hat es Sinn, sein Bestes gegeben zu haben.' },
          ],
          tip: 'Unterschied: ～を問わず hebt Kategorien auf (Alter, Geschlecht, Erfahrung). ～にかかわらず ist breiter einsetzbar und kann auch mit Sätzen stehen (ob X oder nicht).'
        }
      ]
    },

    // ===================== LEKTION 63 =====================
    {
      id: 'lesson-63',
      number: 63,
      title: '～上で・上は',
      subtitle: 'In Bezug auf — Kontext und Bedingung',
      level: 'N2',
      intro: 'Der Ausdruck ～上で (うえで) hat je nach Kontext zwei verschiedene Bedeutungen: „bei / in Bezug auf" und „nachdem / sobald". Dazu kommt ～上は (うえは) mit der Bedeutung „wenn schon, dann". Alle drei gehören zum N2-Standardrepertoire und sind in formellen Texten, Anleitungen und Ratschlägen sehr häufig. Die korrekte Unterscheidung der Bedeutungen ist ein beliebtes Prüfungsthema.',
      sections: [
        {
          heading: '～上で① — In Bezug auf / Bei / Für',
          text: 'In der ersten Bedeutung drückt ～上で aus, in welchem <strong>Bereich oder Kontext</strong> etwas relevant ist. Es beantwortet die Frage: „In welcher Hinsicht?" Die Konstruktion ist: <strong>Nomen + の + 上で</strong> oder <strong>Verb (辞書形) + 上で</strong>. Typische Kontexte sind: 仕事の上で (bei der Arbeit), 健康の上で (in Bezug auf die Gesundheit), 生活する上で (für das Leben). Diese Bedeutung wird oft für Ratschläge und wichtige Hinweise verwendet.',
          examples: [
            { jp: '日本で生活する上で、日本語は不可欠だ。', romaji: 'Nihon de seikatsu suru ue de, Nihongo wa fukaketsu da.', de: 'Für das Leben in Japan ist Japanisch unverzichtbar.' },
            { jp: '契約する上で、注意すべき点がいくつかあります。', romaji: 'Keiyaku suru ue de, chūi subeki ten ga ikutsuka arimasu.', de: 'Beim Abschluss eines Vertrags gibt es einige Punkte, auf die man achten sollte.' },
            { jp: '仕事の上で大切なのは、コミュニケーション能力だ。', romaji: 'Shigoto no ue de taisetsu na no wa, komyunikēshon nōryoku da.', de: 'Im Berufsleben ist Kommunikationsfähigkeit das Wichtigste.' },
          ],
          tip: 'Diese Bedeutung von ～上で lässt sich oft mit „beim..." oder „für..." übersetzen. Achte auf den Kontext — wenn es um einen Bereich oder Aspekt geht, ist es diese Bedeutung.'
        },
        {
          heading: '～上で② — Nachdem / Erst wenn',
          text: 'In der zweiten Bedeutung drückt ～上で aus, dass eine Handlung <strong>abgeschlossen sein muss, bevor</strong> die nächste beginnt. Es betont, dass die erste Handlung eine notwendige Voraussetzung ist. Die Konstruktion ist: <strong>Verb (た-Form) + 上で</strong>. Beachte: Mit た-Form = „nachdem", mit 辞書形 = „bei / für" (erste Bedeutung).',
          examples: [
            { jp: 'よく考えた上で、お返事いたします。', romaji: 'Yoku kangaeta ue de, ohenji itashimasu.', de: 'Nachdem ich es gründlich überlegt habe, werde ich antworten.' },
            { jp: '両親と相談した上で、決めたいと思います。', romaji: 'Ryōshin to sōdan shita ue de, kimetai to omoimasu.', de: 'Ich möchte mich erst mit meinen Eltern beraten und dann entscheiden.' },
            { jp: '説明書を読んだ上で、ご使用ください。', romaji: 'Setsumeisho wo yonda ue de, go-shiyō kudasai.', de: 'Bitte lesen Sie die Anleitung, bevor Sie es benutzen.' }
          ],
          tip: 'Faustregel zur Unterscheidung: Verb (辞書形) + 上で = „bei, für" (Kontext). Verb (た-Form) + 上で = „nachdem" (zeitliche Reihenfolge).'
        },
        {
          heading: '～上は — Wenn schon... dann...',
          text: '～上は (うえは) drückt aus, dass man aufgrund einer bestimmten Situation oder Entscheidung <strong>eine Verantwortung oder Konsequenz</strong> akzeptiert. Es bedeutet: „Wenn es nun einmal so ist, dann muss man auch..." Die Konstruktion ist: <strong>Verb (た-Form) + 上は</strong> oder <strong>Verb (辞書形) + 上は</strong>. Der zweite Satzteil enthält oft eine Entschlossenheit, Pflicht oder Konsequenz.',
          examples: [
            { jp: '引き受けた上は、最後までやり通すつもりだ。', romaji: 'Hikiuketa ue wa, saigo made yaritōsu tsumori da.', de: 'Wenn ich es schon übernommen habe, will ich es bis zum Ende durchziehen.' },
            { jp: '約束した上は、守らなければならない。', romaji: 'Yakusoku shita ue wa, mamoranakerebanaranai.', de: 'Wenn man etwas versprochen hat, muss man es auch halten.' },
            { jp: 'こうなった上は、覚悟を決めるしかない。', romaji: 'Kō natta ue wa, kakugo wo kimeru shika nai.', de: 'Wenn es nun einmal so gekommen ist, bleibt einem nichts anderes übrig, als sich damit abzufinden.' }
          ],
          tip: '～上は drückt immer Entschlossenheit oder Pflichtgefühl aus. Es wird oft mit Ausdrücken wie ～なければならない, ～つもりだ, ～しかない kombiniert.'
        }
      ]
    },

    // ===================== LEKTION 64 =====================
    {
      id: 'lesson-64',
      number: 64,
      title: '～に応じて',
      subtitle: 'Flexibel reagieren — Je nach Situation',
      level: 'N2',
      intro: 'Der Ausdruck ～に応じて (におうじて) bedeutet „je nach", „entsprechend" oder „in Anpassung an" und drückt aus, dass sich eine Handlung oder ein Zustand flexibel an die jeweiligen Umstände anpasst. Er wird sehr häufig in beruflichen Kontexten, Anleitungen und offiziellen Texten verwendet und ist ein N2-Kerngrammatikpunkt.',
      sections: [
        {
          heading: '～に応じて / に応じた — Je nach / Entsprechend',
          text: '応じる (おうじる) bedeutet „reagieren auf, entsprechen, sich anpassen". ～に応じて drückt aus, dass etwas <strong>flexibel an eine Bedingung oder Situation angepasst</strong> wird. Die Konstruktion ist: <strong>Nomen + に応じて</strong>. Die attributive Form ～に応じた steht vor Nomen. Häufige Nomen sind: 状況 (Situation), ニーズ (Bedarf), 能力 (Fähigkeit), 予算 (Budget), 希望 (Wunsch), 年齢 (Alter).',
          examples: [
            { jp: '能力に応じて、給料が決まります。', romaji: 'Nōryoku ni ōjite, kyūryō ga kimarimasu.', de: 'Das Gehalt wird entsprechend der Fähigkeiten festgelegt.' },
            { jp: 'お客様のニーズに応じたサービスを提供します。', romaji: 'Okyakusama no nīzu ni ōjita sābisu wo teikyō shimasu.', de: 'Wir bieten einen an die Bedürfnisse der Kunden angepassten Service.' },
            { jp: '状況に応じて、計画を変更する場合があります。', romaji: 'Jōkyō ni ōjite, keikaku wo henkō suru baai ga arimasu.', de: 'Je nach Situation kann der Plan geändert werden.' },
          ],
          tip: 'に応じて betont die <em>Flexibilität</em> — es geht immer darum, dass sich etwas an wechselnde Bedingungen anpasst. Wenn die Bedingung sich ändert, ändert sich auch das Ergebnis.'
        },
        {
          heading: 'Vergleich: に応じて vs. によって vs. 次第で',
          text: 'Alle drei können „je nach" bedeuten, aber mit unterschiedlichen Nuancen. <strong>～に応じて</strong> betont die <em>flexible Anpassung</em> an wechselnde Bedingungen. <strong>～によって</strong> betont den <em>Unterschied</em> — je nachdem, wer oder was es ist, ist das Ergebnis anders. <strong>～次第で</strong> betont die <em>Abhängigkeit</em> — das Ergebnis hängt vollständig davon ab. In vielen Fällen sind sie austauschbar, aber die Nuancen machen den Unterschied.',
          examples: [
            { jp: '予算に応じて、プランを提案します。', romaji: 'Yosan ni ōjite, puran wo teian shimasu.', de: 'Wir schlagen einen Plan entsprechend dem Budget vor. (Flexible Anpassung)' },
            { jp: '人によって、意見が違う。', romaji: 'Hito ni yotte, iken ga chigau.', de: 'Je nach Person unterscheiden sich die Meinungen. (Verschiedenheit)' },
            { jp: '努力次第で、結果が変わる。', romaji: 'Doryoku shidai de, kekka ga kawaru.', de: 'Je nach Anstrengung ändert sich das Ergebnis. (Vollständige Abhängigkeit)' }
          ],
          tip: 'In der N2-Prüfung wird gerne nach diesen Unterschieden gefragt. Merke: に応じて = Anpassung, によって = Unterschied, 次第で = Abhängigkeit.'
        }
      ]
    },

    // ===================== LEKTION 65 =====================
    {
      id: 'lesson-65',
      number: 65,
      title: '～にわたって',
      subtitle: 'Über die ganze Strecke — Ausmaß und Dauer',
      level: 'N2',
      intro: 'Der Ausdruck ～にわたって (にわたって) bedeutet „über... hinweg", „sich erstreckend über" und beschreibt, dass etwas einen großen Zeitraum, Bereich oder Umfang abdeckt. Er betont die Ausdehnung und Breite und wird häufig in Nachrichten, Berichten und formellen Texten verwendet. Ein N2-Klassiker, der in fast jeder Prüfung vorkommt.',
      sections: [
        {
          heading: '～にわたって / にわたり / にわたる — Über... hinweg / Sich erstreckend über',
          text: 'わたる (渡る/亘る) bedeutet in diesem Kontext „sich erstrecken über". ～にわたって drückt aus, dass etwas über einen <strong>großen Zeitraum, weiten Bereich oder breiten Umfang</strong> andauert oder sich erstreckt. Die Konstruktion ist: <strong>Nomen + にわたって</strong>. Die formellere Variante ～にわたり wird in Schrifttexten verwendet. Vor Nomen steht ～にわたる. Typische Nomen sind: 時間 (Stunden), 年 (Jahre), 地域 (Gebiet), 分野 (Bereich), ページ (Seiten).',
          examples: [
            { jp: '交渉は三日間にわたって行われた。', romaji: 'Kōshō wa mikkakan ni watatte okonawareta.', de: 'Die Verhandlungen erstreckten sich über drei Tage.' },
            { jp: '広い範囲にわたって被害が出た。', romaji: 'Hiroi han\'i ni watatte higai ga deta.', de: 'Über einen weiten Bereich hinweg gab es Schäden.' },
            { jp: '彼は長年にわたり、この分野で研究を続けてきた。', romaji: 'Kare wa naganen ni watari, kono bun\'ya de kenkyū wo tsuzukete kita.', de: 'Er hat sich über viele Jahre hinweg in diesem Bereich der Forschung gewidmet.' },
          ],
          tip: '～にわたって betont immer, dass etwas <em>groß, lang oder umfangreich</em> ist. Es wäre unnatürlich zu sagen „5分にわたって" — der Zeitraum oder Umfang muss beeindruckend sein.'
        },
        {
          heading: 'Typische Kombinationen und Prüfungstipps',
          text: 'In der N2-Prüfung erscheint ～にわたって regelmäßig in Lesetexten und Grammatikfragen. Besonders häufig sind Kombinationen mit Zeitangaben (何年にもわたって = über viele Jahre hinweg) und Umfangsangaben (多岐にわたって = sich über viele Bereiche erstreckend). Die attributive Form ～にわたる + Nomen ist ebenfalls sehr beliebt.',
          examples: [
            { jp: '多岐にわたる分野で活躍している。', romaji: 'Taki ni wataru bun\'ya de katsuyaku shite iru.', de: 'Er ist in vielfältigen Bereichen aktiv.' },
            { jp: '何世紀にもわたって受け継がれてきた伝統だ。', romaji: 'Nanseiki ni mo watatte uketsugarete kita dentō da.', de: 'Es ist eine Tradition, die über Jahrhunderte hinweg weitergegeben wurde.' },
            { jp: '10年にわたる研究の成果がようやく発表された。', romaji: 'Jūnen ni wataru kenkyū no seika ga yōyaku happyō sareta.', de: 'Die Ergebnisse einer sich über zehn Jahre erstreckenden Forschung wurden endlich veröffentlicht.' }
          ],
          tip: 'Merke die drei Formen: にわたって (adverbial), にわたり (formell adverbial), にわたる (vor Nomen). Alle drei haben dieselbe Bedeutung, aber unterschiedliche grammatische Funktionen.'
        }
      ]
    },

    // ===================== LEKTION 66 =====================
    {
      id: 'lesson-66',
      number: 66,
      title: '～をめぐって',
      subtitle: 'Umstritten und diskutiert — Debatten und Konflikte',
      level: 'N2',
      intro: 'Der Ausdruck ～をめぐって bedeutet „bezüglich", „um... herum" oder „hinsichtlich" und wird speziell für Themen verwendet, über die es Debatten, Konflikte, Meinungsverschiedenheiten oder Diskussionen gibt. Es ist kein neutrales „bezüglich" — es impliziert immer, dass verschiedene Parteien unterschiedliche Positionen einnehmen. Ein wichtiger N2-Ausdruck für Nachrichten und gesellschaftliche Themen.',
      sections: [
        {
          heading: '～をめぐって / をめぐり / をめぐる — Um... herum (Streitpunkt)',
          text: 'めぐる bedeutet wörtlich „umkreisen, sich drehen um" und in dieser Grammatik: „sich um ein Thema drehen". ～をめぐって drückt aus, dass verschiedene Meinungen oder Standpunkte <strong>um ein strittiges Thema kreisen</strong>. Die Konstruktion ist: <strong>Nomen + をめぐって</strong>. Vor Nomen steht ～をめぐる. Typische Folgewörter sind: 議論 (Diskussion), 対立 (Konfrontation), 論争 (Kontroverse), 問題 (Problem), 争い (Streit).',
          examples: [
            { jp: '新しい法案をめぐって、激しい議論が行われている。', romaji: 'Atarashii hōan wo megutte, hageshii giron ga okonawarete iru.', de: 'Um den neuen Gesetzentwurf wird heftig debattiert.' },
            { jp: '領土問題をめぐる対立は長年続いている。', romaji: 'Ryōdo mondai wo meguru tairitsu wa naganen tsuzuite iru.', de: 'Der Konflikt um das Territorialproblem dauert seit Jahren an.' },
            { jp: '遺産をめぐって、兄弟が争っている。', romaji: 'Isan wo megutte, kyōdai ga arasotte iru.', de: 'Um das Erbe streiten sich die Geschwister.' },
          ],
          tip: '～をめぐって impliziert <em>immer</em> Meinungsverschiedenheiten oder Konflikte. Verwende es nicht für neutrale Themen — dafür gibt es ～について oder ～に関して.'
        },
        {
          heading: 'Abgrenzung: をめぐって vs. について vs. に関して',
          text: 'Alle drei können „bezüglich" bedeuten, aber der Ton ist völlig anders. <strong>～について</strong> ist neutral und allgemein: „über, bezüglich". <strong>～に関して</strong> ist formeller, aber ebenfalls neutral. <strong>～をめぐって</strong> dagegen impliziert immer Kontroversen und verschiedene Standpunkte. Wenn du in der Prüfung wählen musst, achte auf Schlüsselwörter wie 議論, 対立, 意見, 問題 — sie deuten auf ～をめぐって hin.',
          examples: [
            { jp: '日本の文化について話し合った。', romaji: 'Nihon no bunka ni tsuite hanashiatta.', de: 'Wir haben uns über die japanische Kultur unterhalten. (Neutral)' },
            { jp: 'この件に関して、ご質問はありますか。', romaji: 'Kono ken ni kanshite, go-shitsumon wa arimasu ka.', de: 'Haben Sie bezüglich dieser Angelegenheit Fragen? (Formell, neutral)' },
            { jp: 'この政策をめぐって、与野党が対立している。', romaji: 'Kono seisaku wo megutte, yoyatō ga tairitsu shite iru.', de: 'Bezüglich dieser Politik stehen Regierungs- und Oppositionsparteien im Konflikt. (Kontrovers)' }
          ],
          tip: 'Eselsbrücke: Stell dir vor, verschiedene Leute stehen um das Thema herum und diskutieren hitzig — das ist das Bild von をめぐって.'
        }
      ]
    },

    // ===================== LEKTION 67 =====================
    {
      id: 'lesson-67',
      number: 67,
      title: '～に先立って',
      subtitle: 'Bevor es losgeht — Vorbereitung und Vorrang',
      level: 'N2',
      intro: 'Der Ausdruck ～に先立って (にさきだって) bedeutet „vor / im Vorfeld von / bevor" und wird verwendet, wenn eine Handlung als Vorbereitung oder Voraussetzung vor einem wichtigen Ereignis stattfindet. Er ist formeller als ～前に und impliziert oft, dass die vorherige Handlung bewusst und planmäßig durchgeführt wird. Ein wichtiger N2-Ausdruck für formelle Ankündigungen und Berichte.',
      sections: [
        {
          heading: '～に先立って / に先立ち / に先立つ — Im Vorfeld von / Vor',
          text: '先立つ (さきだつ) bedeutet „vorangehen, vorausgehen". ～に先立って drückt aus, dass eine Handlung <strong>im Vorfeld eines wichtigen Ereignisses</strong> stattfindet — oft als Vorbereitung, Ankündigung oder notwendiger Schritt. Die Konstruktion ist: <strong>Nomen + に先立って</strong>. Die formellere Form ～に先立ち wird in offiziellen Texten verwendet. Die attributive Form ～に先立つ steht vor Nomen.',
          examples: [
            { jp: '開会式に先立って、関係者による打ち合わせが行われた。', romaji: 'Kaikaishiki ni sakidatte, kankeisha ni yoru uchiawase ga okonawareta.', de: 'Im Vorfeld der Eröffnungsfeier fand eine Besprechung der Beteiligten statt.' },
            { jp: '発売に先立ち、試作品が公開された。', romaji: 'Hatsubai ni sakidachi, shisakuhin ga kōkai sareta.', de: 'Vor dem Verkaufsstart wurde ein Prototyp der Öffentlichkeit vorgestellt.' },
            { jp: '出発に先立って、安全確認を行ってください。', romaji: 'Shuppatsu ni sakidatte, anzen kakunin wo okonatte kudasai.', de: 'Bitte führen Sie vor der Abfahrt eine Sicherheitsüberprüfung durch.' },
          ],
          tip: '～に先立って klingt formell und geplant. Für einfaches „bevor" im Alltag verwende ～前に. ～に先立って impliziert: „Als wichtige Vorbereitung vor dem großen Ereignis..."'
        },
        {
          heading: 'Typische Kontexte und Prüfungstipps',
          text: '～に先立って erscheint besonders häufig in Kontexten wie: Eröffnungsfeiern, Produktstarts, offizielle Veranstaltungen, Bauprojekte und Reisen. In der N2-Prüfung wird es oft in Lesetexten über Veranstaltungen oder offizielle Abläufe verwendet. Achte auf formelle Nomen wie 開催 (Veranstaltung), 実施 (Durchführung), 着工 (Baubeginn).',
          examples: [
            { jp: '映画の公開に先立って、特別試写会が行われた。', romaji: 'Eiga no kōkai ni sakidatte, tokubetsu shishakai ga okonawareta.', de: 'Vor der Filmpremiere fand eine exklusive Vorführung statt.' },
            { jp: '試験の実施に先立ち、受験者に注意事項が説明された。', romaji: 'Shiken no jisshi ni sakidachi, jukensha ni chūi jikō ga setsumei sareta.', de: 'Vor der Durchführung der Prüfung wurden den Prüflingen die Hinweise erklärt.' },
            { jp: '新学期に先立って、教科書を購入しておく必要がある。', romaji: 'Shin gakki ni sakidatte, kyōkasho wo kōnyū shite oku hitsuyō ga aru.', de: 'Vor dem neuen Semester muss man die Lehrbücher kaufen.' }
          ],
          tip: 'Merke die drei Formen: に先立って (te-Form), に先立ち (formell), に先立つ (vor Nomen). In der Prüfung können alle drei vorkommen.'
        }
      ]
    },

    // ===================== LEKTION 68 =====================
    {
      id: 'lesson-68',
      number: 68,
      title: '～を通じて・を通して',
      subtitle: 'Durch und durch — Mittel und Zeitraum',
      level: 'N2',
      intro: 'Die Ausdrücke ～を通じて (をつうじて) und ～を通して (をとおして) haben zwei Bedeutungen: „durch / mittels" (Mittel oder Vermittler) und „über... hinweg" (gesamter Zeitraum). Beide sind weitgehend austauschbar, wobei ～を通じて etwas formeller klingt. Sie gehören zum N2-Grundwissen und erscheinen häufig in Lesetexten.',
      sections: [
        {
          heading: '～を通じて① / を通して① — Durch / Mittels / Über',
          text: 'In der ersten Bedeutung drücken ～を通じて und ～を通して aus, dass etwas <strong>als Mittel, Kanal oder Vermittler</strong> dient. Es beantwortet die Frage: „Auf welchem Weg?" oder „Durch wen/was?" Die Konstruktion ist: <strong>Nomen + を通じて/を通して</strong>. Typische Nomen sind: インターネット (Internet), 友人 (Freund), 経験 (Erfahrung), メディア (Medien).',
          examples: [
            { jp: 'インターネットを通じて、世界中の人とつながれる。', romaji: 'Intānetto wo tsūjite, sekaijū no hito to tsunagareru.', de: 'Durch das Internet kann man sich mit Menschen auf der ganzen Welt verbinden.' },
            { jp: '友人を通して、彼と知り合った。', romaji: 'Yūjin wo tōshite, kare to shiraiatta.', de: 'Ich habe ihn über einen Freund kennengelernt.' },
            { jp: 'ボランティア活動を通じて、多くのことを学んだ。', romaji: 'Borantia katsudō wo tsūjite, ōku no koto wo mananda.', de: 'Durch die Freiwilligenarbeit habe ich viel gelernt.' },
          ],
          tip: 'Bei der Bedeutung „durch/mittels" sind を通じて und を通して fast immer austauschbar. を通じて klingt etwas formeller.'
        },
        {
          heading: '～を通じて② / を通して② — Über... hinweg / Während des gesamten...',
          text: 'In der zweiten Bedeutung drücken beide Ausdrücke aus, dass etwas <strong>über den gesamten Zeitraum oder Bereich</strong> hinweg gilt — von Anfang bis Ende, ohne Unterbrechung. Die Konstruktion ist ebenfalls: <strong>Nomen + を通じて/を通して</strong>. Typische Nomen sind: 一年 (ein Jahr), 人生 (Leben), 四季 (vier Jahreszeiten).',
          examples: [
            { jp: '一年を通じて、この地域は温暖な気候だ。', romaji: 'Ichinen wo tsūjite, kono chiiki wa ondan na kikō da.', de: 'Das ganze Jahr über herrscht in dieser Region ein mildes Klima.' },
            { jp: '人生を通して、学び続けることが大切だ。', romaji: 'Jinsei wo tōshite, manabi tsuzukeru koto ga taisetsu da.', de: 'Es ist wichtig, das ganze Leben hindurch weiterzulernen.' },
            { jp: 'この博物館は一年を通して開館している。', romaji: 'Kono hakubutsukan wa ichinen wo tōshite kaikan shite iru.', de: 'Dieses Museum ist das ganze Jahr über geöffnet.' }
          ],
          tip: 'Die zwei Bedeutungen lassen sich leicht unterscheiden: Wenn es um einen Zeitraum geht (一年, 人生, 四季), bedeutet es „über... hinweg". Wenn es um ein Mittel geht (Internet, Freund, Erfahrung), bedeutet es „durch/mittels".'
        }
      ]
    },

    // ===================== LEKTION 69 =====================
    {
      id: 'lesson-69',
      number: 69,
      title: '～に際して',
      subtitle: 'Aus gegebenem Anlass — Formell und feierlich',
      level: 'N2',
      intro: 'Der Ausdruck ～に際して (にさいして) bedeutet „anlässlich", „bei Gelegenheit von" oder „wenn" und wird für besondere, wichtige Anlässe verwendet. Er ist formeller als ～時に und impliziert, dass der Anlass bedeutsam ist. ～に際して erscheint häufig in Reden, offiziellen Ankündigungen und formellen Schreiben — und natürlich in der N2-Prüfung.',
      sections: [
        {
          heading: '～に際して / に際し / に際しての — Anlässlich / Bei / Im Falle von',
          text: '際する (さいする) bedeutet „sich bei einer Gelegenheit befinden". ～に際して drückt aus, dass man sich in einer <strong>besonderen Situation oder bei einem wichtigen Anlass</strong> befindet und etwas tut oder beachten muss. Die Konstruktion ist: <strong>Nomen + に際して</strong> oder <strong>Verb (辞書形) + に際して</strong>. Die formellere Kurzform ～に際し wird in Schrifttexten verwendet. Vor Nomen steht ～に際しての.',
          examples: [
            { jp: '入学に際して、いくつかの書類を提出してください。', romaji: 'Nyūgaku ni saishite, ikutsuka no shorui wo teishutsu shite kudasai.', de: 'Bei der Einschreibung reichen Sie bitte einige Dokumente ein.' },
            { jp: '海外旅行に際し、保険に加入することをお勧めします。', romaji: 'Kaigai ryokō ni saishi, hoken ni kanyū suru koto wo osusume shimasu.', de: 'Anlässlich einer Auslandsreise empfehlen wir Ihnen, eine Versicherung abzuschließen.' },
            { jp: '新しい事業を始めるに際して、市場調査を行った。', romaji: 'Atarashii jigyō wo hajimeru ni saishite, shijō chōsa wo okonatta.', de: 'Anlässlich des Starts eines neuen Geschäfts wurde eine Marktanalyse durchgeführt.' },
          ],
          tip: '～に際して wird fast nur für wichtige, formelle Anlässe verwendet. Für alltägliche Situationen wie „beim Einkaufen" oder „wenn ich nach Hause komme" ist ～時に natürlicher.'
        },
        {
          heading: 'Vergleich: に際して vs. にあたって vs. 時に',
          text: 'Alle drei können „bei, anlässlich, wenn" bedeuten, aber mit unterschiedlichem Formalitätsgrad und Nuancen. <strong>～時に</strong> ist neutral und alltäglich: „wenn, als". <strong>～にあたって</strong> betont den <em>Beginn</em> oder <em>Start</em> einer wichtigen Unternehmung und beinhaltet oft Entschlossenheit. <strong>～に際して</strong> betont den <em>besonderen Anlass</em> und ist am formellsten. In vielen Fällen sind にあたって und に際して austauschbar.',
          examples: [
            { jp: '出発する時に、忘れ物がないか確認した。', romaji: 'Shuppatsu suru toki ni, wasuremono ga nai ka kakunin shita.', de: 'Als ich aufbrach, überprüfte ich, ob ich nichts vergessen hatte. (Neutral)' },
            { jp: '新年度を迎えるにあたって、新しい目標を立てた。', romaji: 'Shin nendo wo mukaeru ni atatte, atarashii mokuhyō wo tateta.', de: 'Zum Beginn des neuen Jahres setzte ich mir neue Ziele. (Beginn, Entschlossenheit)' },
            { jp: '式典の開催に際して、多くの方にご協力いただいた。', romaji: 'Shikiten no kaisai ni saishite, ōku no kata ni go-kyōryoku itadaita.', de: 'Anlässlich der Zeremonie haben wir von vielen Unterstützung erhalten. (Formeller Anlass)' }
          ],
          tip: 'Faustregel: Alltag → 時に. Neuer Anfang mit Entschlossenheit → にあたって. Formeller, besonderer Anlass → に際して.'
        }
      ]
    },

    // ===================== LEKTION 70 =====================
    {
      id: 'lesson-70',
      number: 70,
      title: '～次第で・次第だ',
      subtitle: 'Es hängt davon ab — Abhängigkeit und Sofortige Reaktion',
      level: 'N2',
      intro: 'Das Wort 次第 (しだい) ist extrem vielseitig und hat in der N2-Grammatik zwei Hauptverwendungen: ～次第で bedeutet „je nach / es hängt ab von", und ～次第 (nach Verb-Stammform) bedeutet „sobald". Beide Verwendungen sind in der Prüfung und im Alltag gleichermaßen wichtig. Diese Lektion erklärt beide Bedeutungen mit klaren Beispielen.',
      sections: [
        {
          heading: '～次第で / 次第だ — Es hängt ab von / Je nach',
          text: '～次第で drückt aus, dass das Ergebnis <strong>vollständig von einer Bedingung abhängt</strong>. Es betont die entscheidende Rolle dieser Bedingung — ändert sie sich, ändert sich alles. Die Konstruktion ist: <strong>Nomen + 次第で</strong> (adverbial) oder <strong>Nomen + 次第だ</strong> (prädikativ). Häufig wird es mit Wörtern wie 努力 (Anstrengung), やり方 (Vorgehensweise), 考え方 (Denkweise), 天気 (Wetter) kombiniert.',
          examples: [
            { jp: '成功するかどうかは、努力次第だ。', romaji: 'Seikō suru ka dō ka wa, doryoku shidai da.', de: 'Ob man Erfolg hat oder nicht, hängt von der Anstrengung ab.' },
            { jp: 'やり方次第で、結果は大きく変わる。', romaji: 'Yarikata shidai de, kekka wa ōkiku kawaru.', de: 'Je nach Vorgehensweise ändert sich das Ergebnis erheblich.' },
            { jp: '考え方次第で、困難もチャンスに変わる。', romaji: 'Kangaekata shidai de, konnan mo chansu ni kawaru.', de: 'Je nach Denkweise kann auch eine Schwierigkeit zur Chance werden.' },
          ],
          tip: '～次第で betont die vollständige Abhängigkeit: „Alles steht und fällt mit X." Es ist stärker als に応じて, das eher flexible Anpassung ausdrückt.'
        },
        {
          heading: '～次第 — Sobald / Sofort wenn',
          text: 'Nach der <strong>Verb-Stammform</strong> (ます-Stammform) bedeutet 次第 „sobald, gleich nachdem". Es drückt aus, dass man sofort nach Abschluss einer Handlung etwas tun wird. Die Konstruktion ist: <strong>Verb (ます-Stamm) + 次第</strong>. Dieser Ausdruck ist formell und wird häufig in geschäftlichen Kontexten verwendet, besonders in Versprechen und Ankündigungen.',
          examples: [
            { jp: '届き次第、ご連絡いたします。', romaji: 'Todoki shidai, go-renraku itashimasu.', de: 'Sobald es eintrifft, werden wir Sie benachrichtigen.' },
            { jp: '決まり次第、メールでお知らせします。', romaji: 'Kimari shidai, mēru de oshirase shimasu.', de: 'Sobald es entschieden ist, informieren wir Sie per E-Mail.' },
            { jp: '準備ができ次第、出発しましょう。', romaji: 'Junbi ga deki shidai, shuppatsu shimashō.', de: 'Sobald die Vorbereitungen fertig sind, brechen wir auf.' },
          ],
          tip: 'Verb-Stamm + 次第 ist sehr praktisch im Geschäftsjapanisch. Es drückt Bereitschaft und Schnelligkeit aus — „Ich warte nur noch auf X und handle dann sofort."'
        }
      ]
    },

    // ===================== LEKTION 71 =====================
    {
      id: 'lesson-71',
      number: 71,
      title: '～たところ',
      subtitle: 'Als ich es versuchte — Überraschende Ergebnisse',
      level: 'N2',
      intro: 'Der Ausdruck ～たところ hat je nach Kontext verschiedene Bedeutungen, aber die wichtigste N2-Bedeutung ist: „als ich X tat, stellte sich heraus, dass..." Es beschreibt eine Handlung und deren (oft überraschendes) Ergebnis. Es drückt aus, dass man etwas versucht oder getan hat und dabei ein Ergebnis festgestellt hat, das man nicht unbedingt erwartet hatte.',
      sections: [
        {
          heading: '～たところ — Als ich... tat, (stellte sich heraus, dass...)',
          text: 'Verb (た-Form) + ところ drückt aus, dass man eine Handlung durchgeführt hat und dabei ein <strong>Ergebnis oder eine Entdeckung</strong> gemacht hat. Es impliziert oft, dass das Ergebnis <strong>unerwartet oder bemerkenswert</strong> war. Die Konstruktion ist: <strong>Verb (た-Form) + ところ + Ergebnis</strong>. Der zweite Satzteil beschreibt das Ergebnis — was passiert ist oder was man herausgefunden hat.',
          examples: [
            { jp: '先生に聞いたところ、テストは来週だそうだ。', romaji: 'Sensei ni kiita tokoro, tesuto wa raishū da sō da.', de: 'Als ich den Lehrer fragte, sagte er, die Prüfung sei nächste Woche.' },
            { jp: '薬を飲んだところ、すぐに熱が下がった。', romaji: 'Kusuri wo nonda tokoro, sugu ni netsu ga sagatta.', de: 'Als ich die Medizin nahm, sank das Fieber sofort.' },
            { jp: '調べたところ、その情報は間違いだった。', romaji: 'Shirabeta tokoro, sono jōhō wa machigai datta.', de: 'Als ich es überprüfte, stellte sich heraus, dass die Information falsch war.' },
          ],
          tip: '～たところ ≠ ～た時に! ～た時に ist neutral (als ich...). ～たところ impliziert ein Ergebnis, das man durch die Handlung herausgefunden oder erfahren hat — oft mit einem Moment der Überraschung.'
        },
        {
          heading: 'Weitere Verwendungen von ところ',
          text: 'ところ (Stelle, Punkt) wird in vielen Grammatikausdrücken verwendet. <strong>Verb (辞書形) + ところだ</strong> = „ich bin gerade dabei / kurz davor". <strong>Verb (ている) + ところだ</strong> = „ich bin gerade mitten drin". <strong>Verb (た) + ところだ</strong> = „ich habe es gerade eben getan". Diese beschreiben den <em>Zeitpunkt</em> einer Handlung und sind von der Hauptbedeutung dieser Lektion zu unterscheiden.',
          examples: [
            { jp: '今から出かけるところです。', romaji: 'Ima kara dekakeru tokoro desu.', de: 'Ich bin gerade dabei, loszugehen. (Kurz davor)' },
            { jp: '今、ご飯を食べているところです。', romaji: 'Ima, gohan wo tabete iru tokoro desu.', de: 'Ich bin gerade beim Essen. (Mitten drin)' },
            { jp: 'たった今、帰ってきたところです。', romaji: 'Tatta ima, kaette kita tokoro desu.', de: 'Ich bin gerade eben nach Hause gekommen. (Gerade erst)' }
          ],
          tip: 'Unterscheide: ～たところ (Ergebnis/Entdeckung) vs. ～たところだ (gerade eben erst). Der Schlüssel liegt im Satzmuster: ～たところ + neuer Fakt = Ergebnis. ～たところだ am Satzende = zeitlicher Punkt.'
        }
      ]
    },

    // ===================== LEKTION 72 =====================
    {
      id: 'lesson-72',
      number: 72,
      title: '～ものの・とはいえ',
      subtitle: 'Zwar... aber — Einschränkungen und Widersprüche',
      level: 'N2',
      intro: 'Diese Lektion behandelt zwei konzessive Ausdrücke, die beide „obwohl" oder „zwar... aber" bedeuten. ～ものの räumt etwas ein und fügt dann eine einschränkende oder widersprüchliche Realität hinzu. ～とはいえ geht noch einen Schritt weiter und sagt: „Auch wenn man das so sagt/behauptet, ist die Realität doch anders." Beide sind typische N2-Grammatikpunkte und erscheinen häufig in argumentativen Texten.',
      sections: [
        {
          heading: '～ものの — Zwar... aber / Obwohl... dennoch',
          text: '～ものの drückt aus, dass etwas zwar wahr ist, das Ergebnis oder die Realität aber <strong>anders als erwartet</strong> ausfällt. Es räumt den ersten Sachverhalt ein, schränkt ihn aber im zweiten Teil ein. Die Konstruktion ist: <strong>Verb (普通形) + ものの</strong>, <strong>い-Adj + ものの</strong>, <strong>な-Adj + な/である + ものの</strong>, <strong>Nomen + である + ものの</strong>. Der zweite Satzteil enthält eine negative Überraschung, ein Problem oder eine Einschränkung.',
          examples: [
            { jp: '日本語を3年勉強したものの、まだ上手に話せない。', romaji: 'Nihongo wo sannen benkyō shita mono no, mada jōzu ni hanasenai.', de: 'Obwohl ich drei Jahre Japanisch gelernt habe, kann ich es immer noch nicht gut sprechen.' },
            { jp: '新しいパソコンを買ったものの、使い方がわからない。', romaji: 'Atarashii pasokon wo katta mono no, tsukaikata ga wakaranai.', de: 'Ich habe zwar einen neuen Computer gekauft, weiß aber nicht, wie man ihn benutzt.' },
            { jp: '資格は取ったものの、就職先が見つからない。', romaji: 'Shikaku wa totta mono no, shūshokusaki ga mitsukaranai.', de: 'Zwar habe ich die Qualifikation erworben, aber ich finde keine Arbeitsstelle.' },
          ],
          tip: '～ものの drückt oft Frustration oder Enttäuschung aus: „Ich habe mir so Mühe gegeben, aber trotzdem..." Es ist formeller als ～けど und wird häufig in Schrifttexten verwendet.'
        },
        {
          heading: '～とはいえ — Auch wenn man sagt, dass... / Trotzdem',
          text: '～とはいえ setzt sich zusammen aus と (Zitat), は (Thema), いえ (sagen, von 言える). Wörtlich: „Auch wenn man (das) sagt..." Es räumt eine allgemeine Aussage, Annahme oder Behauptung ein, stellt aber fest, dass die <strong>Realität nicht so einfach ist</strong>. Die Konstruktion ist: <strong>Satz (普通形) + とはいえ</strong> oder <strong>Nomen + とはいえ</strong>.',
          examples: [
            { jp: '春とはいえ、まだ寒い日が続いている。', romaji: 'Haru to wa ie, mada samui hi ga tsuzuite iru.', de: 'Auch wenn es Frühling ist, dauern die kalten Tage noch an.' },
            { jp: '子供とはいえ、礼儀は守るべきだ。', romaji: 'Kodomo to wa ie, reigi wa mamoru beki da.', de: 'Auch wenn es ein Kind ist, sollte es Anstand wahren.' },
            { jp: '安全だとはいえ、油断は禁物だ。', romaji: 'Anzen da to wa ie, yudan wa kinmotsu da.', de: 'Auch wenn es sicher ist, ist Unachtsamkeit verboten.' },
          ],
          tip: '～とはいえ ist eleganter und analytischer als ～ものの. Es wird oft verwendet, um eine verbreitete Meinung einzuräumen und dann eine differenziertere Sichtweise hinzuzufügen.'
        }
      ]
    },

    // ===================== LEKTION 73 =====================
    {
      id: 'lesson-73',
      number: 73,
      title: '～わけにはいかない',
      subtitle: 'Das geht einfach nicht — Moralische Pflicht und soziale Normen',
      level: 'N2',
      intro: 'Der Ausdruck ～わけにはいかない bedeutet „ich kann nicht einfach..." oder „es geht nicht, dass..." und drückt aus, dass etwas aus moralischen, sozialen oder situativen Gründen nicht getan werden kann — auch wenn man es vielleicht möchte oder könnte. Es geht nicht um physische Unfähigkeit, sondern um Pflichtgefühl, soziale Normen oder die Umstände. Ein unverzichtbarer N2-Ausdruck.',
      sections: [
        {
          heading: '～わけにはいかない — Ich kann nicht einfach...',
          text: 'わけ bedeutet „Grund, Sinn" und ～わけにはいかない bedeutet wörtlich „es gibt keinen Grund, warum ich das tun könnte" — also: die Umstände erlauben es nicht. Es drückt aus, dass eine Handlung aus <strong>moralischen, sozialen oder situativen Gründen</strong> nicht vertretbar ist. Die Konstruktion ist: <strong>Verb (辞書形) + わけにはいかない</strong>. Es wird oft für Dinge verwendet, die man gerne tun würde, aber aus Verantwortungsgefühl nicht kann.',
          examples: [
            { jp: '具合が悪くても、今日は休むわけにはいかない。', romaji: 'Guai ga warukutemo, kyō wa yasumu wake ni wa ikanai.', de: 'Auch wenn es mir schlecht geht, kann ich heute nicht einfach fehlen.' },
            { jp: '秘密を聞いたので、他の人に話すわけにはいかない。', romaji: 'Himitsu wo kiita node, hoka no hito ni hanasu wake ni wa ikanai.', de: 'Da ich das Geheimnis erfahren habe, kann ich es nicht einfach anderen erzählen.' },
            { jp: 'みんなが頑張っているのに、一人だけ帰るわけにはいかない。', romaji: 'Minna ga ganbatte iru no ni, hitori dake kaeru wake ni wa ikanai.', de: 'Wenn alle sich anstrengen, kann ich nicht als Einziger nach Hause gehen.' },
          ],
          tip: '～わけにはいかない ≠ ～できない! できない = physische/technische Unfähigkeit. わけにはいかない = soziale/moralische Unmöglichkeit. „Ich könnte schon, aber ich darf/sollte nicht."'
        },
        {
          heading: '～ないわけにはいかない — Ich muss... (doppelte Verneinung)',
          text: 'Die doppelt verneinte Form ～ないわけにはいかない bedeutet „ich <strong>muss</strong> etwas tun" — die Umstände lassen mir keine andere Wahl. Wörtlich: „Es geht nicht, es nicht zu tun." Die Konstruktion ist: <strong>Verb (ない-Form) + わけにはいかない</strong>. Es klingt stärker als ～なければならない, weil es die situative Notwendigkeit betont.',
          examples: [
            { jp: '招待されたので、行かないわけにはいかない。', romaji: 'Shōtai sareta node, ikanai wake ni wa ikanai.', de: 'Da ich eingeladen wurde, muss ich hingehen.' },
            { jp: '上司に頼まれたので、断らないわけにはいかない... いや、断れない。', romaji: 'Jōshi ni tanomareta node, kotowaranai wake ni wa ikanai... iya, kotowarenai.', de: 'Da der Chef mich gebeten hat, kann ich nicht nicht ablehnen... nein, ich kann nicht ablehnen.' },
            { jp: '子供の将来のために、働かないわけにはいかない。', romaji: 'Kodomo no shōrai no tame ni, hatarakanai wake ni wa ikanai.', de: 'Um der Zukunft meines Kindes willen muss ich arbeiten.' }
          ],
          tip: 'Die doppelte Verneinung klingt im Deutschen etwas umständlich, ist aber im Japanischen völlig natürlich. Sie drückt eine stärkere Pflicht aus als einfaches ～なければならない.'
        }
      ]
    },

    // ===================== LEKTION 74 =====================
    {
      id: 'lesson-74',
      number: 74,
      title: '～ざるを得ない',
      subtitle: 'Es bleibt mir nichts anderes übrig — Unvermeidlichkeit',
      level: 'N2',
      intro: 'Der Ausdruck ～ざるを得ない (ざるをえない) bedeutet „ich kann nicht umhin, zu..." oder „mir bleibt nichts anderes übrig, als..." und drückt aus, dass man etwas tun muss, auch wenn man es eigentlich nicht möchte. Es ist eine formelle Art zu sagen: „Die Umstände zwingen mich dazu." Dieser Ausdruck verwendet die klassische Verneinungsform ～ざる und klingt sehr gewählt.',
      sections: [
        {
          heading: '～ざるを得ない — Es bleibt nichts anderes übrig als...',
          text: '～ざる ist die klassische japanische Verneinungsform (wie ～ない, aber aus dem Altjapanischen). 得ない (えない) bedeutet „nicht können". Zusammen: „Man kann es nicht nicht tun" = „Man muss es tun." Die Konstruktion ist: <strong>Verb (ない-Stamm) + ざるを得ない</strong>. Ausnahme: する → <strong>せざるを得ない</strong> (nicht しざる!). Es drückt eine <strong>widerwillige Notwendigkeit</strong> aus — man würde lieber nicht, aber die Umstände lassen keine Wahl.',
          examples: [
            { jp: '証拠がそろっている以上、認めざるを得ない。', romaji: 'Shōko ga sorotte iru ijō, mitomezaru wo enai.', de: 'Angesichts der vorliegenden Beweise bleibt nichts anderes übrig, als es anzuerkennen.' },
            { jp: '予算の関係で、計画を変更せざるを得なかった。', romaji: 'Yosan no kankei de, keikaku wo henkō sezaru wo enakatta.', de: 'Aus Budgetgründen blieb uns nichts anderes übrig, als den Plan zu ändern.' },
            { jp: '体調が悪く、参加を断念せざるを得ない。', romaji: 'Taichō ga waruku, sanka wo dannen sezaru wo enai.', de: 'Da es mir gesundheitlich schlecht geht, muss ich leider auf die Teilnahme verzichten.' },
          ],
          tip: 'Achtung bei する: Die Form ist せざるを得ない, NICHT しざるを得ない. Das ist eine der häufigsten Fehlerquellen in der N2-Prüfung!'
        },
        {
          heading: 'Vergleich: ざるを得ない vs. わけにはいかない vs. しかない',
          text: 'Alle drei drücken Notwendigkeit aus, aber mit unterschiedlichen Nuancen. <strong>～ざるを得ない</strong> = „Die Umstände zwingen mich" (widerwillig, formell). <strong>～ないわけにはいかない</strong> = „Soziale/moralische Pflicht lässt es nicht anders zu." <strong>～しかない</strong> = „Es gibt keine andere Möglichkeit" (sachlich, neutral). ～ざるを得ない ist am formellsten und drückt am stärksten das Gefühl des Widerwillens aus.',
          examples: [
            { jp: '上司の命令なので、従わざるを得ない。', romaji: 'Jōshi no meirei na node, shitagawazaru wo enai.', de: 'Da es ein Befehl des Chefs ist, bleibt mir nichts anderes übrig, als zu gehorchen. (Widerwillig)' },
            { jp: '招待されたので、出席しないわけにはいかない。', romaji: 'Shōtai sareta node, shusseki shinai wake ni wa ikanai.', de: 'Da ich eingeladen wurde, muss ich erscheinen. (Soziale Pflicht)' },
            { jp: '他に方法がないので、歩くしかない。', romaji: 'Hoka ni hōhō ga nai node, aruku shika nai.', de: 'Da es keine andere Möglichkeit gibt, bleibt nur Laufen. (Sachlich)' }
          ],
          tip: 'In der N2-Prüfung werden diese drei gerne als Auswahlmöglichkeiten angeboten. Achte auf den Kontext: Widerwille → ざるを得ない, soziale Pflicht → わけにはいかない, keine Alternative → しかない.'
        }
      ]
    },

    // ===================== LEKTION 75 =====================
    {
      id: 'lesson-75',
      number: 75,
      title: '～かねる・かねない',
      subtitle: 'Beim besten Willen nicht — und: Es könnte passieren',
      level: 'N2',
      intro: 'Die Ausdrücke ～かねる und ～かねない sehen ähnlich aus, haben aber völlig unterschiedliche Bedeutungen. ～かねる bedeutet „ich kann leider nicht..." (höfliche Ablehnung), während ～かねない bedeutet „es könnte durchaus passieren, dass..." (negative Möglichkeit). Beide sind wichtige N2-Punkte und werden in der Prüfung gerne verwechselt — genau deshalb ist es wichtig, sie zusammen zu lernen.',
      sections: [
        {
          heading: '～かねる — Ich kann leider nicht... (höfliche Ablehnung)',
          text: 'かねる (兼ねる) bedeutet in diesem Kontext „nicht in der Lage sein" und wird als <strong>höfliche, indirekte Ablehnung</strong> verwendet. Es drückt aus: „Ich würde gerne, aber leider kann ich nicht." Die Konstruktion ist: <strong>Verb (ます-Stamm) + かねる</strong>. Dieser Ausdruck ist im Geschäftsjapanisch äußerst verbreitet und wirkt deutlich höflicher als ein direktes ～できません.',
          examples: [
            { jp: 'その件については、お答えしかねます。', romaji: 'Sono ken ni tsuite wa, okotae shikanemasu.', de: 'Zu dieser Angelegenheit kann ich leider keine Auskunft geben.' },
            { jp: 'ご要望には応じかねます。', romaji: 'Go-yōbō ni wa ōjikanemasu.', de: 'Ihrem Wunsch kann ich leider nicht entsprechen.' },
            { jp: 'この条件では、賛成しかねます。', romaji: 'Kono jōken de wa, sansei shikanemasu.', de: 'Unter diesen Bedingungen kann ich leider nicht zustimmen.' },
          ],
          tip: '～かねます ist die Standard-Höflichkeitsform im Kundenservice und Geschäftsleben. Wo ein Deutscher „leider nicht möglich" sagt, sagt der Japaner ～かねます.'
        },
        {
          heading: '～かねない — Es könnte durchaus passieren, dass... (Warnung)',
          text: '～かねない ist die Verneinung von かねる und bedeutet wörtlich „es ist nicht so, dass es nicht passieren kann" — also: <strong>es besteht die Gefahr, dass etwas Negatives passiert</strong>. Die Konstruktion ist: <strong>Verb (ます-Stamm) + かねない</strong>. Es wird fast ausschließlich für <em>negative, unerwünschte Möglichkeiten</em> verwendet und dient als Warnung.',
          examples: [
            { jp: 'そんな無理をしたら、倒れかねないよ。', romaji: 'Sonna muri wo shitara, taore kanenai yo.', de: 'Wenn du dich so überanstrengst, könntest du zusammenbrechen.' },
            { jp: 'この問題を放置すれば、大事故になりかねない。', romaji: 'Kono mondai wo hōchi sureba, dai jiko ni narikanenai.', de: 'Wenn man dieses Problem ignoriert, könnte es zu einem schweren Unfall kommen.' },
            { jp: '不注意な発言は、誤解を招きかねない。', romaji: 'Fuchūi na hatsugen wa, gokai wo maneki kanenai.', de: 'Unvorsichtige Äußerungen könnten zu Missverständnissen führen.' },
          ],
          tip: 'Eselsbrücke: かねる = „kann nicht" (höflich). かねない = „kann durchaus" (Warnung). Die Verneinung kehrt die Bedeutung komplett um — das ist ein typischer N2-Stolperstein!'
        }
      ]
    },

    // ===================== LEKTION 76 =====================
    {
      id: 'lesson-76',
      number: 76,
      title: '～っぽい・がち・気味',
      subtitle: 'Tendenz, Neigung, ein Hauch von...',
      level: 'N2',
      intro: 'Diese Lektion behandelt drei Suffixe, die alle eine Art Tendenz oder Neigung ausdrücken, aber mit unterschiedlichen Nuancen. ～っぽい bedeutet „-artig, -mäßig" und drückt einen Eindruck aus. ～がち bedeutet „dazu neigen, häufig" und beschreibt eine unerwünschte Tendenz. ～気味 bedeutet „ein Hauch von, leicht" und beschreibt einen leichten Zustand. Alle drei sind N2-Klassiker.',
      sections: [
        {
          heading: '～っぽい — -artig / -mäßig / Wirkt wie...',
          text: '～っぽい wird an Nomen, Verben (ます-Stamm) oder Adjektivstämme gehängt und drückt aus, dass etwas den <strong>Eindruck oder Anschein</strong> von etwas hat — auch wenn es das vielleicht gar nicht ist. Die Konstruktion ist: <strong>Nomen/Verb-Stamm/Adj-Stamm + っぽい</strong>. Es wird wie ein い-Adjektiv konjugiert (っぽくない, っぽかった). Es kann sowohl neutral als auch leicht negativ sein.',
          examples: [
            { jp: '彼は怒りっぽい性格だ。', romaji: 'Kare wa okorippoi seikaku da.', de: 'Er hat ein aufbrausendes Temperament. (Neigt zum Wütendwerden)' },
            { jp: 'この色は白っぽい。', romaji: 'Kono iro wa shiroppoi.', de: 'Diese Farbe ist weißlich. (Wirkt weiß)' },
            { jp: '最近、忘れっぽくなった。', romaji: 'Saikin, wasureppoku natta.', de: 'In letzter Zeit bin ich vergesslich geworden.' },
          ],
          tip: 'っぽい bei Farben = „-lich" (weißlich, bläulich). Bei Personen = oft negativ (kindisch, vergesslich, aufbrausend). Bei Materialien = „wirkt wie" (安っぽい = wirkt billig).'
        },
        {
          heading: '～がち — Dazu neigen / Häufig (unerwünscht)',
          text: '～がち drückt aus, dass jemand oder etwas eine <strong>unerwünschte Tendenz</strong> hat — etwas passiert häufiger als gewünscht. Die Konstruktion ist: <strong>Verb (ます-Stamm) + がち</strong> oder <strong>Nomen + がち</strong>. ～がち wird wie ein な-Adjektiv verwendet (がちな, がちに). Es hat fast immer eine <em>negative</em> Konnotation.',
          examples: [
            { jp: '彼は遅刻しがちだ。', romaji: 'Kare wa chikoku shigachi da.', de: 'Er neigt dazu, zu spät zu kommen.' },
            { jp: '冬は風邪を引きがちだ。', romaji: 'Fuyu wa kaze wo hikigachi da.', de: 'Im Winter neigt man dazu, sich zu erkälten.' },
            { jp: '留守がちで、なかなか会えない。', romaji: 'Rusu gachi de, nakanaka aenai.', de: 'Er ist häufig nicht zu Hause, sodass man ihn schwer treffen kann.' },
          ],
          tip: '～がち beschreibt immer etwas Unerwünschtes. Man sagt nicht 「成功しがち」 (neigt zum Erfolg) — das wäre unnatürlich. Es geht immer um problematische Tendenzen.'
        },
        {
          heading: '～気味 — Ein Hauch von / Leicht / Etwas',
          text: '～気味 (ぎみ) drückt aus, dass ein Zustand <strong>leicht, ansatzweise</strong> vorhanden ist — nicht voll ausgeprägt, aber spürbar. Die Konstruktion ist: <strong>Verb (ます-Stamm) + 気味</strong> oder <strong>Nomen + 気味</strong>. ～気味 wird wie ein な-Adjektiv oder Nomen behandelt. Es wird häufig für körperliche Zustände und allgemeine Tendenzen verwendet.',
          examples: [
            { jp: '最近、太り気味だ。', romaji: 'Saikin, futorigimi da.', de: 'In letzter Zeit habe ich etwas zugenommen.' },
            { jp: '風邪気味なので、早めに寝ます。', romaji: 'Kaze gimi na node, hayame ni nemasu.', de: 'Da ich eine leichte Erkältung habe, gehe ich früh schlafen.' },
            { jp: 'このプロジェクトは遅れ気味だ。', romaji: 'Kono purojekuto wa okure gimi da.', de: 'Dieses Projekt hat etwas Verspätung.' },
          ],
          tip: 'Vergleich: っぽい = Eindruck/Anschein (wirkt wie X). がち = häufige negative Tendenz (neigt zu X). 気味 = leichter Zustand (etwas X, ein Hauch von X).'
        }
      ]
    },

    // ===================== LEKTION 77 =====================
    {
      id: 'lesson-77',
      number: 77,
      title: '～に限って・に限り',
      subtitle: 'Ausgerechnet! — Begrenzung und Ironie',
      level: 'N2',
      intro: 'Der Ausdruck ～に限って hat zwei verschiedene Verwendungen: Die erste bedeutet „nur, beschränkt auf" (formelle Einschränkung) und die zweite drückt Ironie oder Erstaunen aus: „Ausgerechnet X..." Beide Bedeutungen sind für N2 relevant und werden in unterschiedlichen Kontexten verwendet.',
      sections: [
        {
          heading: '～に限り / に限って① — Nur / Beschränkt auf',
          text: '限る (かぎる) bedeutet „begrenzen, beschränken". ～に限り/に限って in der ersten Bedeutung drückt eine <strong>formelle Einschränkung oder Begrenzung</strong> aus. Die Konstruktion ist: <strong>Nomen + に限り/に限って</strong>. Diese Verwendung ist typisch für Regeln, Angebote, Ankündigungen und offizielle Mitteilungen.',
          examples: [
            { jp: '本日に限り、全品20%オフです。', romaji: 'Honjitsu ni kagiri, zenpin nijū pāsento ofu desu.', de: 'Nur heute: 20% Rabatt auf alle Artikel.' },
            { jp: '会員に限り、特別な割引があります。', romaji: 'Kaiin ni kagiri, tokubetsu na waribiki ga arimasu.', de: 'Nur für Mitglieder gibt es einen besonderen Rabatt.' },
            { jp: '一人一回に限って、応募できます。', romaji: 'Hitori ikkai ni kagitte, ōbo dekimasu.', de: 'Man kann sich nur einmal pro Person bewerben.' },
          ],
          tip: '～に限り ist formeller als ～だけ und wird besonders in Werbeaktionen, Regelwerken und offiziellen Ankündigungen verwendet.'
        },
        {
          heading: '～に限って② — Ausgerechnet... (Ironie)',
          text: 'In der zweiten Bedeutung drückt ～に限って <strong>Ironie, Überraschung oder Ärger</strong> aus: „Ausgerechnet in dieser Situation..." oder „Gerade wenn man es nicht braucht..." Es beschreibt Situationen, in denen Murphy\'s Law zuschlägt — gerade das, was nicht passieren sollte, passiert. Die Konstruktion ist: <strong>Nomen + に限って</strong>.',
          examples: [
            { jp: '傘を持っていない日に限って、雨が降る。', romaji: 'Kasa wo motte inai hi ni kagitte, ame ga furu.', de: 'Ausgerechnet an dem Tag, an dem ich keinen Schirm dabeihabe, regnet es.' },
            { jp: '急いでいる時に限って、電車が遅れる。', romaji: 'Isoide iru toki ni kagitte, densha ga okureru.', de: 'Ausgerechnet wenn man es eilig hat, kommt der Zug zu spät.' },
            { jp: 'うちの子に限って、そんなことはしない。', romaji: 'Uchi no ko ni kagitte, sonna koto wa shinai.', de: 'Ausgerechnet mein Kind würde so etwas nie tun. (Typische Elternaussage)' },
          ],
          tip: 'Die ironische Bedeutung von ～に限って beschreibt das Gefühl: „Es passiert immer genau dann, wenn es am schlimmsten ist!" Achte in der Prüfung auf den Kontext, um die zwei Bedeutungen zu unterscheiden.'
        }
      ]
    },

    // ===================== LEKTION 78 =====================
    {
      id: 'lesson-78',
      number: 78,
      title: '～向け・向き',
      subtitle: 'Für wen? Für was? — Zielgruppe und Eignung',
      level: 'N2',
      intro: 'Die Ausdrücke ～向け (むけ) und ～向き (むき) beschreiben beide, für wen oder was etwas gedacht oder geeignet ist, haben aber unterschiedliche Nuancen. ～向け bedeutet „speziell für... konzipiert/gerichtet" (bewusste Zielgruppe), während ～向き bedeutet „geeignet für / passend für" (natürliche Eignung). Beide sind im Alltag und in der N2-Prüfung wichtig.',
      sections: [
        {
          heading: '～向け — Speziell für... / Gerichtet an...',
          text: '向ける (むける) bedeutet „richten auf, ausrichten". ～向け drückt aus, dass etwas <strong>bewusst für eine bestimmte Zielgruppe konzipiert</strong> wurde. Es ist eine aktive Entscheidung des Herstellers, Autors oder Anbieters. Die Konstruktion ist: <strong>Nomen + 向け(の)</strong>. Typische Kontexte sind: Produkte, Bücher, Kurse, Sendungen, Webseiten.',
          examples: [
            { jp: 'この教科書は初心者向けです。', romaji: 'Kono kyōkasho wa shoshinsha muke desu.', de: 'Dieses Lehrbuch ist für Anfänger konzipiert.' },
            { jp: '子供向けのアニメが人気だ。', romaji: 'Kodomo muke no anime ga ninki da.', de: 'Anime für Kinder ist beliebt.' },
            { jp: '外国人向けの日本語コースに申し込んだ。', romaji: 'Gaikokujin muke no Nihongo kōsu ni mōshikonda.', de: 'Ich habe mich für einen Japanischkurs für Ausländer angemeldet.' },
          ],
          tip: '～向け impliziert immer eine bewusste Entscheidung: Jemand hat dieses Produkt/Angebot gezielt für diese Zielgruppe gemacht.'
        },
        {
          heading: '～向き — Geeignet für / Passend für',
          text: '向く (むく) bedeutet „gerichtet sein, passen". ～向き drückt aus, dass etwas <strong>von Natur aus für jemanden oder etwas geeignet</strong> ist — nicht unbedingt bewusst so konzipiert, sondern einfach passend. Die Konstruktion ist: <strong>Nomen + 向き(の)</strong>. Es beschreibt eine natürliche Eignung oder Passung.',
          examples: [
            { jp: 'この仕事は几帳面な人向きだ。', romaji: 'Kono shigoto wa kichōmen na hito muki da.', de: 'Diese Arbeit ist für sorgfältige Menschen geeignet.' },
            { jp: 'この辛い料理は子供向きではない。', romaji: 'Kono karai ryōri wa kodomo muki de wa nai.', de: 'Dieses scharfe Essen ist nicht für Kinder geeignet.' },
            { jp: '南向きの部屋は明るくて暖かい。', romaji: 'Minami muki no heya wa akarukute atatakai.', de: 'Ein nach Süden ausgerichtetes Zimmer ist hell und warm.' },
          ],
          tip: 'Unterschied: 子供向けの本 = ein Buch, das speziell für Kinder geschrieben wurde. 子供向きの本 = ein Buch, das zufällig auch für Kinder passend ist. 向け = gezielt konzipiert. 向き = natürlich passend.'
        }
      ]
    },

    // ===================== LEKTION 79 =====================
    {
      id: 'lesson-79',
      number: 79,
      title: '～末に・あげく',
      subtitle: 'Nach langem Ringen — Ergebnisse nach Anstrengung',
      level: 'N2',
      intro: 'Diese Lektion behandelt zwei Ausdrücke, die beide „nach langem..." oder „als Ergebnis von..." bedeuten, aber mit unterschiedlichen Nuancen. ～末に beschreibt ein Ergebnis nach langer Überlegung oder Anstrengung (neutral bis positiv). ～あげく beschreibt ein Ergebnis nach langer Mühe, das enttäuschend oder negativ ist. Der Unterschied in der Konnotation ist entscheidend für die N2-Prüfung.',
      sections: [
        {
          heading: '～末に / 末の — Am Ende von / Nach langem...',
          text: '末 (すえ) bedeutet „Ende, Schluss". ～末に drückt aus, dass nach einer <strong>langen Phase der Anstrengung, Überlegung oder des Ringens</strong> ein Ergebnis eintritt. Es ist <strong>neutral bis positiv</strong> — das Ergebnis kann gut oder schlecht sein, aber die Anstrengung wird respektiert. Die Konstruktion ist: <strong>Verb (た-Form) + 末に</strong> oder <strong>Nomen + の末に</strong>.',
          examples: [
            { jp: '長い話し合いの末に、ようやく合意に達した。', romaji: 'Nagai hanashiai no sue ni, yōyaku gōi ni tasshita.', de: 'Nach langen Gesprächen wurde endlich eine Einigung erzielt.' },
            { jp: '悩んだ末に、転職することに決めた。', romaji: 'Nayanda sue ni, tenshoku suru koto ni kimeta.', de: 'Nach langem Überlegen habe ich mich entschieden, den Job zu wechseln.' },
            { jp: '試行錯誤の末、ようやく解決策を見つけた。', romaji: 'Shikō sakugo no sue, yōyaku kaiketsusaku wo mitsuketa.', de: 'Nach vielem Ausprobieren fand ich endlich eine Lösung.' },
          ],
          tip: '～末に wird oft mit Wörtern wie ようやく (endlich) und ついに (schließlich) kombiniert, die das Gefühl der Erleichterung nach langer Anstrengung verstärken.'
        },
        {
          heading: '～あげく(に) — Nach all dem... und dann (negativ)',
          text: 'あげく (挙げ句) bedeutet wörtlich „das letzte Ergebnis" und drückt aus, dass nach einer <strong>langen, mühsamen Phase</strong> ein <strong>enttäuschendes oder negatives Ergebnis</strong> eintritt. Die Nuance ist: „Man hat sich so angestrengt, und am Ende ist es trotzdem schiefgegangen." Die Konstruktion ist: <strong>Verb (た-Form) + あげく(に)</strong> oder <strong>Nomen + の + あげく(に)</strong>.',
          examples: [
            { jp: '散々迷ったあげく、何も買わなかった。', romaji: 'Sanzan mayotta ageku, nani mo kawanakatta.', de: 'Nach endlosem Hin und Her habe ich am Ende nichts gekauft.' },
            { jp: '長時間議論したあげく、結論が出なかった。', romaji: 'Chōjikan giron shita ageku, ketsuron ga denakatta.', de: 'Nach stundenlanger Diskussion kam kein Ergebnis heraus.' },
            { jp: '口論のあげく、二人は別れてしまった。', romaji: 'Kōron no ageku, futari wa wakarete shimatta.', de: 'Nach ständigem Streit haben sich die beiden schließlich getrennt.' },
          ],
          tip: 'Merke: ～末に = Ergebnis nach Anstrengung (neutral/positiv möglich). ～あげく = Ergebnis nach Anstrengung (fast immer negativ/enttäuschend). In der Prüfung achte auf die Stimmung des Satzes!'
        }
      ]
    },

    // ===================== LEKTION 80 =====================
    {
      id: 'lesson-80',
      number: 80,
      title: '～にしたがって',
      subtitle: 'Dem Fluss folgend — Parallele Veränderung und Gehorsam',
      level: 'N2',
      intro: 'Der Ausdruck ～にしたがって (に従って) hat zwei Hauptbedeutungen: „je mehr... desto..." (parallele Veränderung, ähnlich wie ～につれて) und „gemäß / entsprechend" (einer Regel oder Anweisung folgend). Beide Bedeutungen leiten sich vom Verb 従う (したがう, „folgen, gehorchen") ab und sind für die N2-Prüfung relevant.',
      sections: [
        {
          heading: '～にしたがって① — Je mehr... desto... (parallele Veränderung)',
          text: 'In der ersten Bedeutung beschreibt ～にしたがって eine <strong>parallele, graduelle Veränderung</strong>: Wenn sich X verändert, verändert sich Y proportional dazu. Die Konstruktion ist: <strong>Verb (辞書形) + にしたがって</strong>. Diese Bedeutung ist sehr ähnlich zu ～につれて und ～に伴って, aber にしたがって betont stärker das „Folgen" — Y folgt der Veränderung von X wie ein natürlicher Verlauf.',
          examples: [
            { jp: '高度が上がるにしたがって、気温が下がる。', romaji: 'Kōdo ga agaru ni shitagatte, kion ga sagaru.', de: 'Je höher die Höhe steigt, desto mehr sinkt die Temperatur.' },
            { jp: '都市化が進むにしたがって、緑地が減少している。', romaji: 'Toshika ga susumu ni shitagatte, ryokuchi ga genshō shite iru.', de: 'Je weiter die Urbanisierung voranschreitet, desto mehr nehmen die Grünflächen ab.' },
            { jp: '日本語が上手になるにしたがって、日本の文化も深く理解できるようになった。', romaji: 'Nihongo ga jōzu ni naru ni shitagatte, Nihon no bunka mo fukaku rikai dekiru yō ni natta.', de: 'Je besser mein Japanisch wurde, desto tiefer konnte ich auch die japanische Kultur verstehen.' },
          ],
          tip: 'にしたがって, につれて und に伴って überschneiden sich in der Bedeutung „je mehr... desto..." Bei graduellen Veränderungen sind alle drei oft austauschbar.'
        },
        {
          heading: '～にしたがって② / に従い — Gemäß / Entsprechend (Anweisung)',
          text: 'In der zweiten Bedeutung drückt ～にしたがって aus, dass man einer <strong>Regel, Anweisung, Vorschrift oder Person folgt</strong>. Es bedeutet „gemäß, entsprechend, nach". Die Konstruktion ist: <strong>Nomen + にしたがって/に従い</strong>. Die formellere Variante ～に従い wird in offiziellen Texten bevorzugt.',
          examples: [
            { jp: '医者の指示にしたがって、薬を飲んでください。', romaji: 'Isha no shiji ni shitagatte, kusuri wo nonde kudasai.', de: 'Bitte nehmen Sie die Medizin gemäß den Anweisungen des Arztes ein.' },
            { jp: 'ルールに従い、行動してください。', romaji: 'Rūru ni shitagai, kōdō shite kudasai.', de: 'Bitte handeln Sie gemäß den Regeln.' },
            { jp: '案内表示にしたがって進んでください。', romaji: 'Annai hyōji ni shitagatte susunde kudasai.', de: 'Bitte folgen Sie den Hinweisschildern.' },
          ],
          tip: 'Die zwei Bedeutungen lassen sich leicht unterscheiden: Wenn ein Verb davor steht (変わる, 進む) → parallele Veränderung. Wenn ein Nomen davor steht (指示, ルール, 命令) → Anweisung/Regel folgen.'
        }
      ]
    }
  ];

  // =====================================================
  // === RENDERING & UI LOGIC ===
  // =====================================================

  var lessonsContainer = null;
  var currentOpen = null;

  function renderLessonCard(lesson) {
    var card = document.createElement('div');
    card.className = 'gl-card';
    card.setAttribute('data-lesson', lesson.id);

    // Header (always visible)
    var header = document.createElement('div');
    header.className = 'gl-card-header';
    header.tabIndex = 0;
    header.setAttribute('role', 'button');
    header.setAttribute('aria-expanded', 'false');

    header.innerHTML =
      '<span class="gl-card-number">' + lesson.number + '</span>' +
      '<div class="gl-card-titles">' +
        '<span class="gl-card-title">' + lesson.title + '</span>' +
        '<span class="gl-card-subtitle">' + lesson.subtitle + '</span>' +
      '</div>' +
      '<span class="gl-card-level card-level ' + lesson.level.split('/')[0] + '">' + lesson.level + '</span>' +
      '<svg class="gl-card-chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>';

    // Body (expandable)
    var body = document.createElement('div');
    body.className = 'gl-card-body collapsed';

    body.innerHTML = renderLessonContent(lesson);

    function toggle() {
      if (window.app) window.app.playTick();
      var isOpen = !body.classList.contains('collapsed');
      if (isOpen) {
        body.classList.add('collapsed');
        header.querySelector('.gl-card-chevron').classList.remove('open');
        header.setAttribute('aria-expanded', 'false');
        currentOpen = null;
      } else {
        // Close any other open lesson
        if (currentOpen && currentOpen !== body) {
          currentOpen.classList.add('collapsed');
          currentOpen.previousElementSibling.querySelector('.gl-card-chevron').classList.remove('open');
          currentOpen.previousElementSibling.setAttribute('aria-expanded', 'false');
        }
        body.classList.remove('collapsed');
        header.querySelector('.gl-card-chevron').classList.add('open');
        header.setAttribute('aria-expanded', 'true');
        currentOpen = body;
        // Scroll into view after animation
        setTimeout(function () {
          header.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 80);
      }
    }

    header.addEventListener('click', toggle);
    header.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });

    card.appendChild(header);
    card.appendChild(body);
    return card;
  }

  function renderLessonContent(lesson) {
    var html = '<div class="gl-intro">' + lesson.intro + '</div>';

    lesson.sections.forEach(function (sec) {
      html += '<div class="gl-section">';
      html += '<h4 class="gl-section-heading">' + sec.heading + '</h4>';
      if (sec.text) {
        html += '<div class="gl-section-text">' + sec.text + '</div>';
      }
      if (sec.examples && sec.examples.length > 0) {
        html += '<div class="gl-examples">';
        sec.examples.forEach(function (ex) {
          html += '<div class="gl-example">';
          html += '<div class="gl-example-jp">' + ex.jp + '</div>';
          if (ex.romaji) {
            html += '<div class="gl-example-romaji">' + ex.romaji + '</div>';
          }
          html += '<div class="gl-example-de">' + ex.de + '</div>';
          html += '</div>';
        });
        html += '</div>';
      }
      if (sec.tip) {
        html += '<div class="gl-tip">' +
          '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>' +
          '<span>' + sec.tip + '</span></div>';
      }
      html += '</div>';
    });

    return html;
  }

  function initLessons() {
    var grammarControls = document.getElementById('grammar-controls');
    var grammarGrid = document.getElementById('grammar-grid');
    var grammarNoResults = document.getElementById('grammar-no-results');
    var grammarTab = document.getElementById('grammar-tab');
    if (!grammarControls || !grammarTab) return;

    // --- View Toggle ---
    var toggleRow = document.createElement('div');
    toggleRow.className = 'gl-view-toggle';
    toggleRow.innerHTML =
      '<button class="gl-view-btn active" data-view="reference">' +
        '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h8"/></svg>' +
        'Nachschlagen</button>' +
      '<button class="gl-view-btn" data-view="lessons">' +
        '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>' +
        'Lektionen</button>';

    grammarControls.insertBefore(toggleRow, grammarControls.firstChild);

    // --- Lessons Container ---
    lessonsContainer = document.createElement('div');
    lessonsContainer.id = 'grammar-lessons';
    lessonsContainer.className = 'gl-container hidden';

    LESSONS.forEach(function (lesson) {
      lessonsContainer.appendChild(renderLessonCard(lesson));
    });

    // Insert before the grid
    grammarTab.insertBefore(lessonsContainer, grammarGrid);

    // --- Toggle Logic ---
    var searchBar = grammarControls.querySelector('.search-bar');
    var filterRows = grammarControls.querySelectorAll('.filters');
    var viewBtns = toggleRow.querySelectorAll('.gl-view-btn');

    viewBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (window.app) window.app.playTick();
        var view = this.getAttribute('data-view');
        viewBtns.forEach(function (b) { b.classList.toggle('active', b === btn); });

        if (view === 'lessons') {
          searchBar.classList.add('hidden');
          filterRows.forEach(function (f) { f.classList.add('hidden'); });
          grammarGrid.classList.add('hidden');
          grammarNoResults.classList.add('hidden');
          lessonsContainer.classList.remove('hidden');
        } else {
          searchBar.classList.remove('hidden');
          filterRows.forEach(function (f) { f.classList.remove('hidden'); });
          grammarGrid.classList.remove('hidden');
          lessonsContainer.classList.add('hidden');
          // Re-trigger filter to show/hide no-results
          if (window.app && window.app.sections.grammar) {
            window.app.sections.grammar.applyFilters();
          }
        }
      });
    });
  }

  // Init when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLessons);
  } else {
    initLessons();
  }
})();
