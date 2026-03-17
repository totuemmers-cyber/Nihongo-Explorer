// =============================================================
// === GRAMMAR LESSONS MODULE (N5/N4) ===
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
            { jp: '日本語は難しいですか。', romaji: 'Nihongo wa muzukashii desu ka.', de: 'Ist Japanisch schwer? (Was Japanisch betrifft — schwer?)' },
            { jp: 'この映画は面白かったです。', romaji: 'Kono eiga wa omoshirokatta desu.', de: 'Dieser Film war interessant. (Was diesen Film betrifft...)' }
          ]
        },
        {
          heading: 'が — Das Spotlight',
          text: 'が ist der <strong>Subjektmarkierer</strong>. Es zeigt auf jemanden oder etwas und sagt: „Genau DAS ist es!" が kommt immer dann ins Spiel, wenn eine <strong>neue Information</strong> geliefert wird — eine Identität enthüllt, eine Überraschung ausgedrückt oder eine Existenz festgestellt wird. Während は den Hintergrund aufspannt, beleuchtet が den Vordergrund. Wenn jemand fragt „Wer hat das gemacht?", dann ist die Antwort ein が-Satz, weil die Identität neu ist.',
          examples: [
            { jp: '誰が来ましたか。', romaji: 'Dare ga kimashita ka.', de: 'Wer ist gekommen? (Wir suchen die Identität.)' },
            { jp: '田中さんが来ました。', romaji: 'Tanaka-san ga kimashita.', de: 'Tanaka ist gekommen! (Neue Info: Es ist Tanaka!)' },
            { jp: '雨が降っています。', romaji: 'Ame ga futte imasu.', de: 'Es regnet. (Der Regen fällt — Naturereignis.)' },
            { jp: 'あそこに猫がいます。', romaji: 'Asoko ni neko ga imasu.', de: 'Da drüben ist eine Katze. (Existenz = が)' },
            { jp: '何が好きですか。', romaji: 'Nani ga suki desu ka.', de: 'Was magst du? (Was genau ist das Gemochte?)' }
          ]
        },
        {
          heading: 'Zusammen in einem Satz',
          text: 'Oft erscheinen は und が im selben Satz — und genau hier zeigt sich der Unterschied am klarsten. Das Thema (は) setzt den äußeren Rahmen: „Worüber reden wir?" Das Subjekt (が) zeigt innerhalb dieses Rahmens auf etwas Bestimmtes. Ein gutes Bild: は ist die Bühne, が ist der Scheinwerfer auf dem Hauptdarsteller.',
          examples: [
            { jp: '私は猫が好きです。', romaji: 'Watashi wa neko ga suki desu.', de: 'Ich mag Katzen. (Was mich betrifft: Katzen sind das, was mir gefällt.)' },
            { jp: '日本は食べ物がおいしいです。', romaji: 'Nihon wa tabemono ga oishii desu.', de: 'In Japan ist das Essen lecker. (Was Japan betrifft: Essen = lecker.)' },
            { jp: '私は頭が痛いです。', romaji: 'Watashi wa atama ga itai desu.', de: 'Mir tut der Kopf weh. (Was mich betrifft: der Kopf = schmerzt.)' },
            { jp: '田中さんは英語ができます。', romaji: 'Tanaka-san wa eigo ga dekimasu.', de: 'Tanaka kann Englisch. (Was Tanaka betrifft: Englisch = möglich.)' }
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
            { jp: '手紙を書いています。', romaji: 'Tegami o kaite imasu.', de: 'Ich schreibe gerade einen Brief.' },
            { jp: '新しい靴を買いたい。', romaji: 'Atarashii kutsu o kaitai.', de: 'Ich will neue Schuhe kaufen.' }
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
            { jp: '友達にプレゼントをあげました。', romaji: 'Tomodachi ni purezento o agemashita.', de: 'Ich habe einem Freund ein Geschenk gegeben. (Empfänger)' },
            { jp: '椅子に座ってください。', romaji: 'Isu ni suwatte kudasai.', de: 'Bitte setz dich auf den Stuhl. (Ziel der Bewegung)' },
            { jp: '壁に絵がかけてあります。', romaji: 'Kabe ni e ga kakete arimasu.', de: 'An der Wand hängt ein Bild. (Ort der Existenz)' }
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
            { jp: '台風で電車が止まりました。', romaji: 'Taifū de densha ga tomarimashita.', de: 'Wegen des Taifuns haben die Züge angehalten. (Ursache)' },
            { jp: '三人でピザを食べた。', romaji: 'Sannin de piza o tabeta.', de: 'Wir haben zu dritt Pizza gegessen. (Rahmen/Anzahl)' }
          ]
        },
        {
          heading: 'に vs で — Der Klassiker',
          text: 'Der Unterschied zwischen に und で ist einer der häufigsten Stolpersteine für Lernende. Die Faustregel: <strong>に = Existenz / Zustand / Zielpunkt</strong> (etwas IST dort oder etwas bewegt sich DORTHIN), <strong>で = Aktion / Mittel</strong> (etwas PASSIERT dort oder wird damit gemacht). Bei Ortsangaben hilft die Frage: Passiert dort aktiv etwas? → で. Ist dort einfach nur etwas (vorhanden, wohnhaft, befestigt)? → に.',
          examples: [
            { jp: '公園に猫がいます。', romaji: 'Kōen ni neko ga imasu.', de: 'Im Park ist eine Katze. (に = sie existiert dort, ruhig)' },
            { jp: '公園で遊びます。', romaji: 'Kōen de asobimasu.', de: 'Ich spiele im Park. (で = ich tue aktiv etwas dort)' },
            { jp: '駅に着きました。', romaji: 'Eki ni tsukimashita.', de: 'Ich bin am Bahnhof angekommen. (に = Zielpunkt)' },
            { jp: '駅で友達に会いました。', romaji: 'Eki de tomodachi ni aimashita.', de: 'Ich habe am Bahnhof einen Freund getroffen. (で = Ort des Treffens)' }
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
            { jp: '今日は月曜日です。', romaji: 'Kyō wa getsuyōbi desu.', de: 'Heute ist Montag.' },
            { jp: '田中さんは先生です。', romaji: 'Tanaka-san wa sensei desu.', de: 'Herr Tanaka ist Lehrer.' }
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
            { jp: '六時に起きます。', romaji: 'Roku-ji ni okimasu.', de: 'Ich stehe um sechs Uhr auf.' },
            { jp: '電車で会社に行きます。', romaji: 'Densha de kaisha ni ikimasu.', de: 'Ich fahre mit dem Zug zur Arbeit.' }
          ]
        },
        {
          heading: 'Die vier Grundformen',
          text: 'Die ます-Form lässt sich einfach in vier Zeiten verwandeln. Das System ist erfreulich regelmäßig — keine Ausnahmen, keine unregelmäßigen Formen. Sobald du den Verbstamm hast, funktioniert alles wie ein Baukasten:',
          examples: [
            { jp: '食べます', romaji: 'tabemasu', de: 'esse / werde essen (Gegenwart/Zukunft, höflich)' },
            { jp: '食べません', romaji: 'tabemasen', de: 'esse nicht (Verneinung, höflich)' },
            { jp: '食べました', romaji: 'tabemashita', de: 'habe gegessen (Vergangenheit, höflich)' },
            { jp: '食べませんでした', romaji: 'tabemasen deshita', de: 'habe nicht gegessen (Verg. + Verneinung, höflich)' }
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
            { jp: '学生じゃありませんでした', romaji: 'gakusei ja arimasen deshita', de: 'war nicht Student (Verg. + Verneinung, höflich)' }
          ]
        },
        {
          heading: 'Wann duzt Japan?',
          text: 'Die sogenannte <strong>Kurzform</strong> (auch „Plain Form" oder „Dictionary Form") benutzt man unter engen Freunden, in der Familie, in Tagebüchern und — ganz wichtig — in Nebensätzen. Die Kurzform ist also keineswegs unhöflich, sie ist einfach intim. Aber als Anfänger: Die ます/です-Form ist dein sicherer Hafen. Damit machst du nirgendwo etwas falsch. Lieber zu höflich als zu lässig — Japaner schätzen das.',
          examples: [
            { jp: '食べる → 食べます', romaji: 'taberu → tabemasu', de: 'essen (casual → höflich)' },
            { jp: '高い → 高いです', romaji: 'takai → takai desu', de: 'teuer (casual → höflich)' },
            { jp: '学生だ → 学生です', romaji: 'gakusei da → gakusei desu', de: 'Student (casual → höflich)' },
            { jp: '行かない → 行きません', romaji: 'ikanai → ikimasen', de: 'nicht gehen (casual → höflich)' }
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
            { jp: '高い → 高くなかった', romaji: 'takai → takakunakatta', de: 'teuer → war nicht teuer (い → くなかった)' },
            { jp: '高い → 高く', romaji: 'takai → takaku', de: 'teuer → teuer (Adverbform: い → く)' }
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
            { jp: '静かに話す', romaji: 'shizuka ni hanasu', de: 'ruhig sprechen (Adverb: な-Adj. + に)' }
          ]
        },
        {
          heading: 'Vor Nomen: Der Unterschied',
          text: 'Vor einem Nomen zeigt sich der Unterschied am deutlichsten. い-Adjektive stehen einfach direkt davor — das い bleibt stehen und es wird nichts dazwischengeschoben. な-Adjektive brauchen das な als Bindeglied, um das Nomen zu modifizieren. Dieses Muster ist absolut verlässlich und einer der einfachsten Tests, um den Adjektiv-Typ zu bestimmen.',
          examples: [
            { jp: '大きい家', romaji: 'ōkii ie', de: 'großes Haus (い bleibt einfach stehen)' },
            { jp: 'きれいな花', romaji: 'kirei na hana', de: 'schöne Blume (な verbindet)' },
            { jp: '新しい車', romaji: 'atarashii kuruma', de: 'neues Auto (い-Adjektiv)' },
            { jp: '有名な人', romaji: 'yūmei na hito', de: 'berühmte Person (な-Adjektiv)' },
            { jp: '暑い日 vs 元気な子供', romaji: 'atsui hi vs genki na kodomo', de: 'heißer Tag vs fröhliches Kind' }
          ]
        },
        {
          heading: 'Adjektive verbinden',
          text: 'Wenn du mehrere Adjektive aneinanderreihen willst (wie „groß und schön"), brauchst du die <strong>て-Form der Adjektive</strong>. Bei い-Adjektiven wird い zu くて, bei な-Adjektiven wird な zu で. Das letzte Adjektiv in der Kette bleibt in seiner normalen Form.',
          examples: [
            { jp: '大きくて新しい家', romaji: 'ōkikute atarashii ie', de: 'ein großes und neues Haus (い → くて)' },
            { jp: '静かできれいな町', romaji: 'shizuka de kirei na machi', de: 'eine ruhige und schöne Stadt (な → で)' },
            { jp: 'この料理は安くておいしいです。', romaji: 'Kono ryōri wa yasukute oishii desu.', de: 'Dieses Gericht ist günstig und lecker.' },
            { jp: '彼女は親切で優しい人です。', romaji: 'Kanojo wa shinsetsu de yasashii hito desu.', de: 'Sie ist eine freundliche und nette Person.' }
          ]
        },
        {
          heading: 'Die berühmten Fallen',
          text: 'Einige Wörter sehen aus wie い-Adjektive, sind aber な-Adjektive. Sie enden zwar auf い, aber das い gehört zum Wortstamm — es ist kein konjugierbares い. Diese Wörter muss man leider auswendig lernen. Die häufigsten Kandidaten sind:',
          examples: [
            { jp: 'きれい（な）', romaji: 'kirei (na)', de: 'schön / sauber — NICHT きれくない!' },
            { jp: '有名（な）', romaji: 'yūmei (na)', de: 'berühmt — sieht aus wie い, ist aber な' },
            { jp: '嫌い（な）', romaji: 'kirai (na)', de: 'verhasst — auch ein な-Adjektiv!' },
            { jp: '元気（な）', romaji: 'genki (na)', de: 'gesund / munter — endet auf い, ist な' },
            { jp: '大丈夫（な）', romaji: 'daijōbu (na)', de: 'in Ordnung — ebenfalls な' }
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
            { jp: '着る → 着て', romaji: 'kiru → kite', de: 'anziehen' },
            { jp: '出る → 出て', romaji: 'deru → dete', de: 'herauskommen' }
          ]
        },
        {
          heading: 'Bildung: う-Verben (Konsonantenstamm)',
          text: 'Bei <strong>う-Verben</strong> (godan / Gruppe 1) ändert sich die Endung nach einem Lautmuster. Es gibt fünf Gruppen, die man sich am besten als Eselsbrücken merkt. Das Muster basiert darauf, welcher Konsonant vor dem う steht — und das bestimmt, ob der て-Laut zu って, んで, いて oder して wird.',
          examples: [
            { jp: 'う・つ・る → って', romaji: '(u/tsu/ru → tte)', de: '買う→買って, 待つ→待って, 帰る→帰って' },
            { jp: 'む・ぶ・ぬ → んで', romaji: '(mu/bu/nu → nde)', de: '飲む→飲んで, 遊ぶ→遊んで, 死ぬ→死んで' },
            { jp: 'く → いて', romaji: '(ku → ite)', de: '書く→書いて, 聞く→聞いて' },
            { jp: 'ぐ → いで', romaji: '(gu → ide)', de: '泳ぐ→泳いで, 脱ぐ→脱いで' },
            { jp: 'す → して', romaji: '(su → shite)', de: '話す→話して, 消す→消して' }
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
            { jp: '持ってくる → 持ってきて', romaji: 'motte kuru → motte kite', de: 'mitbringen (来る-Verb → きて)' }
          ]
        },
        {
          heading: 'Was man alles damit machen kann',
          text: 'Hier wird es richtig spannend — die て-Form ist das Fundament für eine ganze Reihe wichtiger Konstruktionen. Deswegen heißt sie „Schweizer Taschenmesser": Ein Werkzeug, viele Funktionen. Hier die wichtigsten Verwendungen, die dir auf N5-Niveau schon begegnen werden:',
          examples: [
            { jp: '窓を開けてください。', romaji: 'Mado o akete kudasai.', de: 'Bitte öffne das Fenster. (Bitte: て + ください)' },
            { jp: '今、食べています。', romaji: 'Ima, tabete imasu.', de: 'Ich esse gerade. (Verlaufsform: て + いる)' },
            { jp: '写真を撮ってもいいですか。', romaji: 'Shashin o totte mo ii desu ka.', de: 'Darf ich ein Foto machen? (Erlaubnis: て + もいい)' },
            { jp: 'ここで食べてはいけません。', romaji: 'Koko de tabete wa ikemasen.', de: 'Hier darf man nicht essen. (Verbot: て + はいけない)' },
            { jp: '朝起きて、顔を洗って、朝ごはんを食べます。', romaji: 'Asa okite, kao o aratte, asagohan o tabemasu.', de: 'Morgens stehe ich auf, wasche mein Gesicht und frühstücke. (Aufzählung)' }
          ]
        },
        {
          heading: 'Weitere て-Konstruktionen',
          text: 'Über die Grundverwendungen hinaus gibt es noch weitere wichtige Muster, die auf der て-Form aufbauen. Diese wirst du im Laufe von N5 und N4 alle kennenlernen:',
          examples: [
            { jp: '傘を持っていきます。', romaji: 'Kasa o motte ikimasu.', de: 'Ich nehme einen Schirm mit. (て + いく = und dann losgehen)' },
            { jp: '友達が手伝ってくれました。', romaji: 'Tomodachi ga tetsudatte kuremashita.', de: 'Mein Freund hat mir geholfen. (て + くれる = als Gefallen für mich)' },
            { jp: '食べてみたい。', romaji: 'Tabete mitai.', de: 'Ich möchte es mal probieren. (て + みる = ausprobieren)' },
            { jp: '全部食べてしまいました。', romaji: 'Zenbu tabete shimaimashita.', de: 'Ich habe alles aufgegessen. (て + しまう = vollständig/leider getan)' }
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
            { jp: '書いて → 書いた', romaji: 'kaite → kaita', de: 'geschrieben (く→いて→いた)' },
            { jp: '話して → 話した', romaji: 'hanashite → hanashita', de: 'gesprochen (す→して→した)' },
            { jp: 'して → した', romaji: 'shite → shita', de: 'gemacht (unregelmäßig)' },
            { jp: '来て → 来た（きた）', romaji: 'kite → kita', de: 'gekommen (unregelmäßig)' }
          ]
        },
        {
          heading: 'Höfliche Vergangenheit: ました / ませんでした',
          text: 'In der höflichen Sprache ist die Vergangenheit noch einfacher — du brauchst die た-Form hier gar nicht. Du nimmst einfach die ます-Form und wandelst sie um. Das funktioniert bei allen Verben gleich, ohne Ausnahme. Es gibt nur zwei Formen, die du brauchst:',
          examples: [
            { jp: '食べます → 食べました', romaji: 'tabemasu → tabemashita', de: 'habe gegessen (höflich)' },
            { jp: '行きます → 行きました', romaji: 'ikimasu → ikimashita', de: 'bin gegangen (höflich)' },
            { jp: '食べます → 食べませんでした', romaji: 'tabemasu → tabemasen deshita', de: 'habe nicht gegessen (höflich, verneint)' },
            { jp: '行きます → 行きませんでした', romaji: 'ikimasu → ikimasen deshita', de: 'bin nicht gegangen (höflich, verneint)' }
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
            { jp: '静かだ → 静かだった', romaji: 'shizuka da → shizuka datta', de: 'war ruhig (な-Adj.: だ → だった)' },
            { jp: '静かだ → 静かじゃなかった', romaji: 'shizuka da → shizuka ja nakatta', de: 'war nicht ruhig' },
            { jp: '元気でした → 元気じゃなかったです', romaji: 'genki deshita → genki ja nakatta desu', de: 'war munter → war nicht munter (höflich)' }
          ]
        },
        {
          heading: 'Nomen in der Vergangenheit',
          text: 'Nomen mit です/だ folgen demselben Muster wie な-Adjektive. Das ist logisch, weil な-Adjektive sich ja sowieso wie Nomen verhalten. Die Formen sind also identisch:',
          examples: [
            { jp: '学生です → 学生でした', romaji: 'gakusei desu → gakusei deshita', de: 'war Student (höflich)' },
            { jp: '学生だ → 学生だった', romaji: 'gakusei da → gakusei datta', de: 'war Student (casual)' },
            { jp: '休みじゃなかったです。', romaji: 'Yasumi ja nakatta desu.', de: 'Es war kein freier Tag.' },
            { jp: '昨日は日曜日でした。', romaji: 'Kinō wa nichiyōbi deshita.', de: 'Gestern war Sonntag.' }
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
            { jp: '飲む → 飲まない', romaji: 'nomu → nomanai', de: 'trinke nicht (casual, む → まない)' },
            { jp: '話す → 話さない', romaji: 'hanasu → hanasanai', de: 'spreche nicht (casual, す → さない)' },
            { jp: '待つ → 待たない', romaji: 'matsu → matanai', de: 'warte nicht (casual, つ → たない)' }
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
            { jp: '難しい → 難しくない', romaji: 'muzukashii → muzukashikunai', de: 'nicht schwer' },
            { jp: '寒い → 寒くなかったです', romaji: 'samui → samukunakatta desu', de: 'war nicht kalt (höflich, Vergangenheit)' }
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
            { jp: '好きじゃなかったです。', romaji: 'Suki ja nakatta desu.', de: 'Ich mochte es nicht. (Vergangenheit, höflich)' },
            { jp: '日曜日じゃなかった。', romaji: 'Nichiyōbi ja nakatta.', de: 'Es war nicht Sonntag. (casual, Vergangenheit)' }
          ]
        },
        {
          heading: 'Noch nicht: まだ～ていない',
          text: '„Noch nicht" wird mit まだ + て-Form + いない/いません ausgedrückt. Das ist eine Kombination aus dem Adverb まだ (noch) und der ている-Konstruktion (resultierender Zustand) in der Verneinung. Es drückt aus, dass eine erwartete Handlung bisher nicht stattgefunden hat.',
          examples: [
            { jp: 'まだ食べていません。', romaji: 'Mada tabete imasen.', de: 'Ich habe noch nicht gegessen. (höflich)' },
            { jp: 'まだ決めていない。', romaji: 'Mada kimete inai.', de: 'Ich habe mich noch nicht entschieden. (casual)' },
            { jp: '宿題はまだやっていません。', romaji: 'Shukudai wa mada yatte imasen.', de: 'Die Hausaufgaben habe ich noch nicht gemacht.' },
            { jp: 'まだ日本に行ったことがない。', romaji: 'Mada Nihon ni itta koto ga nai.', de: 'Ich war noch nie in Japan. (Erfahrung, die fehlt)' }
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
            { jp: '映画が見たかった。', romaji: 'Eiga ga mitakatta.', de: 'Ich wollte einen Film sehen. (Vergangenheit)' },
            { jp: '今日は何もしたくない。', romaji: 'Kyō wa nanimo shitakunai.', de: 'Heute will ich gar nichts machen. (Verneinung)' },
            { jp: 'もっと早く起きたかったのに。', romaji: 'Motto hayaku okitakatta noni.', de: 'Ich wollte eigentlich früher aufstehen...' }
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
            { jp: '子供の頃、犬がほしかった。', romaji: 'Kodomo no koro, inu ga hoshikatta.', de: 'Als Kind wollte ich einen Hund haben.' },
            { jp: '何もほしくないです。', romaji: 'Nanimo hoshikunai desu.', de: 'Ich möchte nichts. (Verneinung)' }
          ]
        },
        {
          heading: 'てほしい — „Ich will, dass jemand..."',
          text: 'Wenn du willst, dass <strong>jemand anders etwas tut</strong>, verbindest du die て-Form mit ほしい. Die Person, von der du es erwartest, wird mit に markiert. Diese Konstruktion ist etwas direkter als eine Bitte und drückt einen echten Wunsch aus — sie ist weicher als ein Befehl, aber stärker als eine bloße Frage.',
          examples: [
            { jp: '来てほしい。', romaji: 'Kite hoshii.', de: 'Ich will, dass du kommst.' },
            { jp: '先生に説明してほしいです。', romaji: 'Sensei ni setsumei shite hoshii desu.', de: 'Ich möchte, dass der Lehrer es erklärt.' },
            { jp: '静かにしてほしい。', romaji: 'Shizuka ni shite hoshii.', de: 'Ich will, dass du still bist.' },
            { jp: 'もう少し待ってほしいんですが。', romaji: 'Mō sukoshi matte hoshii n desu ga.', de: 'Ich würde gerne, dass Sie noch etwas warten. (vorsichtig höflich)' }
          ]
        },
        {
          heading: 'できる — „Ich kann"',
          text: 'できる bedeutet „können / möglich sein" und ist extrem vielseitig. Es gibt zwei Hauptverwendungen: Mit einem <strong>Nomen + が</strong> (Fähigkeit direkt benennen) oder mit <strong>Verb + ことが</strong> (eine Handlung als „Können" ausdrücken). できる selbst ist ein る-Verb und wird ganz normal konjugiert: できます (höflich), できない (kann nicht), できた (konnte).',
          examples: [
            { jp: '日本語ができます。', romaji: 'Nihongo ga dekimasu.', de: 'Ich kann Japanisch. (Nomen + が + できる)' },
            { jp: '泳ぐことができます。', romaji: 'Oyogu koto ga dekimasu.', de: 'Ich kann schwimmen. (Verb + こと + が + できる)' },
            { jp: '料理ができません。', romaji: 'Ryōri ga dekimasen.', de: 'Ich kann nicht kochen.' },
            { jp: 'ここで写真を撮ることができますか。', romaji: 'Koko de shashin o toru koto ga dekimasu ka.', de: 'Kann man hier Fotos machen?' },
            { jp: '予約ができました。', romaji: 'Yoyaku ga dekimashita.', de: 'Ich konnte reservieren. / Die Reservierung hat geklappt.' }
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
            { jp: '危ないですから、気をつけてください。', romaji: 'Abunai desu kara, ki o tsukete kudasai.', de: 'Es ist gefährlich, also pass bitte auf.' },
            { jp: 'もう遅いから、帰ります。', romaji: 'Mō osoi kara, kaerimasu.', de: 'Es ist schon spät, also gehe ich nach Hause.' }
          ]
        },
        {
          heading: 'ので — „Weil" (sanft und objektiv)',
          text: 'ので drückt denselben Grund aus, klingt aber <strong>weicher und höflicher</strong>. Es impliziert, dass der Zusammenhang für den Gesprächspartner objektiv nachvollziehbar ist — du erklärst nicht deine persönliche Meinung, sondern eine allgemein verständliche Sachlage. Wichtig: Vor ので steht immer die Kurzform. Bei な-Adjektiven und Nomen wird だ zu な (静か<strong>な</strong>ので, 学生<strong>な</strong>ので).',
          examples: [
            { jp: '雨が降っているので、傘を持っていきます。', romaji: 'Ame ga futte iru node, kasa o motte ikimasu.', de: 'Da es regnet, nehme ich einen Schirm mit.' },
            { jp: '電車が遅れたので、遅刻しました。', romaji: 'Densha ga okureta node, chikoku shimashita.', de: 'Da der Zug Verspätung hatte, kam ich zu spät.' },
            { jp: '明日は休みなので、ゆっくりします。', romaji: 'Ashita wa yasumi na node, yukkuri shimasu.', de: 'Da morgen frei ist, mache ich es ruhig.' },
            { jp: '体調が悪いので、今日は休みます。', romaji: 'Taichō ga warui node, kyō wa yasumimasu.', de: 'Da es mir nicht gut geht, bleibe ich heute zuhause.' }
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
            { jp: '明日のパーティーなんですけど…', romaji: 'Ashita no pātī nan desu kedo...', de: 'Wegen der Party morgen... (kein Gegensatz, nur Einleitung)' },
            { jp: '高かったけど、おいしかったよ。', romaji: 'Takakatta kedo, oishikatta yo.', de: 'War zwar teuer, aber lecker.' }
          ]
        },
        {
          heading: 'のに — „Obwohl" (mit Frust oder Bedauern)',
          text: 'のに drückt einen Gegensatz mit <strong>Enttäuschung, Frustration oder Überraschung</strong> aus. Es schwingt immer ein „und das ist ärgerlich / schade / unfair!" mit. Im Gegensatz zu けど, das neutral ist, transportiert のに eine emotionale Wertung. Vor のに steht die Kurzform; bei な-Adjektiven wird だ zu な, bei Nomen ebenfalls な.',
          examples: [
            { jp: '勉強したのに、テストに落ちた。', romaji: 'Benkyō shita noni, tesuto ni ochita.', de: 'Obwohl ich gelernt habe, bin ich durchgefallen!' },
            { jp: '約束したのに、来なかった。', romaji: 'Yakusoku shita noni, konakatta.', de: 'Obwohl er es versprochen hat, ist er nicht gekommen!' },
            { jp: 'せっかく作ったのに、誰も食べない。', romaji: 'Sekkaku tsukutta noni, daremo tabenai.', de: 'Ich hab mir die Mühe gemacht es zu kochen, und keiner isst es!' },
            { jp: '高いのに、全然おいしくなかった。', romaji: 'Takai noni, zenzen oishikunakatta.', de: 'Obwohl es teuer war, hat es überhaupt nicht geschmeckt!' },
            { jp: '休みなのに、仕事をしなければならない。', romaji: 'Yasumi na noni, shigoto o shinakereba naranai.', de: 'Obwohl frei ist, muss ich arbeiten!' }
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
            { jp: '暇だったら、遊びに来てください。', romaji: 'Hima dattara, asobi ni kite kudasai.', de: 'Wenn du Zeit hast, komm doch vorbei.' },
            { jp: '家に帰ったら、電話してね。', romaji: 'Ie ni kaettara, denwa shite ne.', de: 'Ruf mich an, wenn du zuhause angekommen bist.' }
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
            { jp: '練習すれば、上手になります。', romaji: 'Renshū sureba, jōzu ni narimasu.', de: 'Wenn man übt, wird man gut. (Allgemeine Wahrheit)' },
            { jp: '聞けばわかります。', romaji: 'Kikeba wakarimasu.', de: 'Wenn du fragst, wirst du es verstehen.' },
            { jp: '時間があれば、手伝います。', romaji: 'Jikan ga areba, tetsudaimasu.', de: 'Wenn ich Zeit habe, helfe ich.' }
          ]
        },
        {
          heading: 'と — Die automatische Folge',
          text: 'と drückt eine <strong>natürliche, automatische, unvermeidliche Folge</strong> aus — „immer wenn X, dann zwangsläufig Y". Es wird für Naturgesetze, mechanische Abläufe, Wegbeschreibungen und Gewohnheiten benutzt. Vor と steht immer die Kurzform Gegenwart. Wichtig: Im Folgesatz darf <strong>kein Wille, keine Bitte, kein Vorschlag</strong> stehen — die Folge muss automatisch eintreten.',
          examples: [
            { jp: 'このボタンを押すと、ドアが開きます。', romaji: 'Kono botan o osu to, doa ga akimasu.', de: 'Wenn man diesen Knopf drückt, öffnet sich die Tür. (Mechanismus)' },
            { jp: '春になると、桜が咲きます。', romaji: 'Haru ni naru to, sakura ga sakimasu.', de: 'Wenn es Frühling wird, blühen die Kirschblüten. (Naturgesetz)' },
            { jp: '右に曲がると、駅があります。', romaji: 'Migi ni magaru to, eki ga arimasu.', de: 'Wenn du rechts abbiegst, ist da ein Bahnhof. (Wegbeschreibung)' },
            { jp: '甘いものを食べると、元気になる。', romaji: 'Amai mono o taberu to, genki ni naru.', de: 'Wenn ich Süßes esse, werde ich wieder munter. (Persönliche Gewohnheit)' }
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
            { jp: 'A: 明日、東京に行くんだ。', romaji: 'Ashita, Tōkyō ni iku n da.', de: 'Ich fahre morgen nach Tokyo.' },
            { jp: 'B: 東京に行くなら、お土産を買ってきて。', romaji: 'Tōkyō ni iku nara, omiyage o katte kite.', de: 'Wenn du nach Tokyo fährst, bring mir ein Souvenir mit.' }
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
            { jp: '書く → 書かれる', romaji: 'kaku → kakareru', de: 'geschrieben werden (く → かれる)' },
            { jp: '取る → 取られる', romaji: 'toru → torareru', de: 'genommen werden (る → られる, u-Verb!)' },
            { jp: 'する → される', romaji: 'suru → sareru', de: 'gemacht werden (unregelmäßig)' },
            { jp: '来る → 来られる（こられる）', romaji: 'kuru → korareru', de: 'gekommen werden (unregelmäßig)' }
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
            { jp: '犯人は警察に捕まえられた。', romaji: 'Hannin wa keisatsu ni tsukamaerareta.', de: 'Der Täter wurde von der Polizei gefasst.' },
            { jp: '新しい法律が作られた。', romaji: 'Atarashii hōritsu ga tsukurareta.', de: 'Ein neues Gesetz wurde geschaffen.' }
          ]
        },
        {
          heading: 'Das Leidenspassiv — Japans Spezialität (迷惑の受身)',
          text: 'Im Japanischen kann man das Passiv auch benutzen, um auszudrücken, dass einem etwas <strong>angetan wurde</strong> — selbst bei Verben, die im Deutschen kein Passiv haben. Es schwingt immer ein Gefühl von Ärger, Belästigung oder Unannehmlichkeit mit. Das Besondere: Selbst intransitive Verben (regnen, weinen, sterben) können im Leidenspassiv stehen. Der „Leidende" wird zum grammatischen Subjekt, obwohl er an der Handlung gar nicht direkt beteiligt ist.',
          examples: [
            { jp: '雨に降られた。', romaji: 'Ame ni furareta.', de: 'Es hat mich geregnet. (= Ich wurde vom Regen erwischt — nervig!)' },
            { jp: '電車で足を踏まれた。', romaji: 'Densha de ashi o fumareta.', de: 'Mir wurde im Zug auf den Fuß getreten.' },
            { jp: '隣の人にたばこを吸われた。', romaji: 'Tonari no hito ni tabako o suwareta.', de: 'Der Typ neben mir hat geraucht. (Und ich musste es ertragen!)' },
            { jp: '赤ちゃんに泣かれて、眠れなかった。', romaji: 'Akachan ni nakarete, nemurenakatta.', de: 'Das Baby hat geweint und ich konnte nicht schlafen. (Baby weinen = mein Leid)' },
            { jp: '彼女に先に帰られた。', romaji: 'Kanojo ni saki ni kaerareta.', de: 'Sie ist vor mir nach Hause gegangen. (Und ich war davon betroffen!)' },
            { jp: '友達に秘密を話された。', romaji: 'Tomodachi ni himitsu o hanasareta.', de: 'Mein Freund hat mein Geheimnis weitererzählt. (Ärgerlich!)' }
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
            { jp: 'お客様のご意見は大切にされています。', romaji: 'Okyakusama no goiken wa taisetsu ni sarete imasu.', de: 'Die Meinungen unserer Kunden werden wertgeschätzt. (Geschäftssprache)' },
            { jp: '富士山は「日本の象徴」と言われている。', romaji: 'Fujisan wa "Nihon no shōchō" to iwarete iru.', de: 'Der Fuji wird als „Symbol Japans" bezeichnet.' }
          ],
          tip: 'In Nachrichten (ニュース) wirst du das Passiv extrem häufig hören: 逮捕された (wurde verhaftet), 発表された (wurde bekanntgegeben), 開催される (wird veranstaltet). Wenn du Nachrichten verstehen willst, ist das Passiv unverzichtbar.'
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
            { jp: '読む → 読ませる', romaji: 'yomu → yomaseru', de: 'lesen lassen (む → ませる)' },
            { jp: '待つ → 待たせる', romaji: 'matsu → mataseru', de: 'warten lassen (つ → たせる)' },
            { jp: 'する → させる', romaji: 'suru → saseru', de: 'machen lassen (unregelmäßig)' },
            { jp: '来る → 来させる（こさせる）', romaji: 'kuru → kosaseru', de: 'kommen lassen (unregelmäßig)' }
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
            { jp: '好きなようにさせてください。', romaji: 'Suki na yō ni sasete kudasai.', de: 'Bitte lass mich machen, wie ich will. (Erlaubnis erbeten)' },
            { jp: '父は私を一人で旅行させてくれた。', romaji: 'Chichi wa watashi o hitori de ryokō sasete kureta.', de: 'Mein Vater hat mich allein reisen lassen. (Erlaubnis, mit Dankbarkeit)' }
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
            { jp: '写真を撮らせてください。', romaji: 'Shashin o torasete kudasai.', de: 'Bitte erlauben Sie mir, ein Foto zu machen.' }
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
            { jp: '歌を歌わせられた。', romaji: 'Uta o utawaserareta.', de: 'Ich wurde gezwungen zu singen. (z.B. beim Karaoke)' },
            { jp: '学生は毎週テストを受けさせられる。', romaji: 'Gakusei wa maishū tesuto o ukesaserareru.', de: 'Die Studenten werden jede Woche gezwungen, Tests zu schreiben.' }
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
            { jp: '彼女に花をあげたい。', romaji: 'Kanojo ni hana o agetai.', de: 'Ich möchte meiner Freundin Blumen schenken.' }
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
            { jp: '誰がこれをくれたの？', romaji: 'Dare ga kore o kureta no?', de: 'Wer hat mir das gegeben?' }
          ]
        },
        {
          heading: 'もらう — Ich bekomme (von jemandem)',
          text: 'もらう beschreibt dasselbe Ereignis wie くれる, aber <strong>aus der Perspektive des Empfängers</strong>. Wörtlich: „Ich empfange." Der Geber wird mit に oder から markiert. もらう betont, dass der Empfänger aktiv etwas bekommen hat — es klingt weniger nach „mir wurde gegeben" und mehr nach „ich habe mir geholt / bekommen / erbeten".',
          examples: [
            { jp: '友達に本をもらった。', romaji: 'Tomodachi ni hon o moratta.', de: 'Ich habe von meinem Freund ein Buch bekommen.' },
            { jp: '先生に日本語を教えてもらった。', romaji: 'Sensei ni nihongo o oshiete moratta.', de: 'Ich habe mir vom Lehrer Japanisch beibringen lassen.' },
            { jp: '彼から手紙をもらった。', romaji: 'Kare kara tegami o moratta.', de: 'Ich habe einen Brief von ihm bekommen.' },
            { jp: '誕生日に何をもらいましたか。', romaji: 'Tanjōbi ni nani o moraimashita ka.', de: 'Was hast du zum Geburtstag bekommen?' }
          ]
        },
        {
          heading: 'Als Gefallen: てあげる / てくれる / てもらう',
          text: 'In Kombination mit der て-Form drücken diese Verben aus, dass jemand etwas <strong>als Gefallen</strong> tut. Diese Konstruktion ist im Japanischen extrem häufig und macht den Unterschied zwischen einem neutralen Satz und einem, der soziale Beziehungen ausdrückt. てくれる ist dabei besonders wichtig — es ist die natürlichste Art, Dankbarkeit für eine Handlung auszudrücken.',
          examples: [
            { jp: '荷物を持ってあげた。', romaji: 'Nimotsu o motte ageta.', de: 'Ich habe (ihm/ihr) das Gepäck getragen. (Ich tue den Gefallen)' },
            { jp: '道を教えてくれた。', romaji: 'Michi o oshiete kureta.', de: 'Er/sie hat mir den Weg erklärt. (Jemand tut MIR den Gefallen)' },
            { jp: '友達に手伝ってもらった。', romaji: 'Tomodachi ni tetsudatte moratta.', de: 'Ich habe einen Freund gebeten mir zu helfen. (Ich empfange den Gefallen)' },
            { jp: '妹に漢字を教えてあげた。', romaji: 'Imōto ni kanji o oshiete ageta.', de: 'Ich habe meiner kleinen Schwester Kanji beigebracht. (Gefallen von mir)' },
            { jp: '彼が駅まで送ってくれた。', romaji: 'Kare ga eki made okutte kureta.', de: 'Er hat mich zum Bahnhof gebracht. (Wie nett von ihm!)' }
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
            { jp: '説明してくださってありがとうございます。', romaji: 'Setsumei shite kudasatte arigatō gozaimasu.', de: 'Vielen Dank, dass Sie es mir erklärt haben.' },
            { jp: '少々お待ちいただけますか。', romaji: 'Shōshō omachi itadakemasu ka.', de: 'Könnten Sie bitte einen Moment warten? (Geschäftssprache)' }
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
            { jp: '着る → 着られる', romaji: 'kiru → kirareru', de: 'anziehen können' }
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
            { jp: '泳ぐ → 泳げる', romaji: 'oyogu → oyogeru', de: 'schwimmen können (ぐ → げる)' },
            { jp: '遊ぶ → 遊べる', romaji: 'asobu → asoberu', de: 'spielen können (ぶ → べる)' },
            { jp: '持つ → 持てる', romaji: 'motsu → moteru', de: 'halten/tragen können (つ → てる)' },
            { jp: '買う → 買える', romaji: 'kau → kaeru', de: 'kaufen können (う → える)' }
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
            { jp: 'ピアノが弾ける。', romaji: 'Piano ga hikeru.', de: 'Ich kann Klavier spielen.' }
          ]
        },
        {
          heading: 'In der Praxis',
          text: 'Die Potentialform wird wie ein normales る-Verb konjugiert: 読める (können), 読めます (können, höflich), 読めない (nicht können), 読めた (konnte), 読めなかった (konnte nicht). Sie kommt in Alltagsgesprächen ständig vor — beim Einkaufen, im Restaurant, beim Reisen, bei Verabredungen. Wann immer du fragst „Kann ich...?" oder „Kann man hier...?", brauchst du die Potentialform.',
          examples: [
            { jp: '漢字が読めますか。', romaji: 'Kanji ga yomemasu ka.', de: 'Kannst du Kanji lesen?' },
            { jp: 'ここでは写真が撮れません。', romaji: 'Koko de wa shashin ga toremasen.', de: 'Hier kann man keine Fotos machen.' },
            { jp: '日本語が少し話せます。', romaji: 'Nihongo ga sukoshi hanasemasu.', de: 'Ich kann ein bisschen Japanisch sprechen.' },
            { jp: '明日来られる？', romaji: 'Ashita korareru?', de: 'Kannst du morgen kommen? (casual)' },
            { jp: '今日は早く帰れそうだ。', romaji: 'Kyō wa hayaku kaeresō da.', de: 'Heute kann ich wohl früh nach Hause.' },
            { jp: 'このアプリで電車の時間が調べられます。', romaji: 'Kono apuri de densha no jikan ga shiraberaremasu.', de: 'Mit dieser App kann man die Zugzeiten nachschlagen.' }
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
            { jp: '子供たちが外で遊んでいる。', romaji: 'Kodomotachi ga soto de asonde iru.', de: 'Die Kinder spielen draußen.' },
            { jp: '何を食べてるの？', romaji: 'Nani o tabeteru no?', de: 'Was isst du gerade? (verkürzte Form)' }
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
            { jp: '電気がついている。', romaji: 'Denki ga tsuite iru.', de: 'Das Licht ist an.' },
            { jp: 'メガネをかけている人', romaji: 'Megane o kakete iru hito', de: 'Eine Person, die eine Brille trägt. (Zustand, nicht Handlung)' },
            { jp: '道が曲がっている。', romaji: 'Michi ga magatte iru.', de: 'Die Straße ist gebogen/kurvig.' }
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
            { jp: '毎晩寝る前に本を読んでいます。', romaji: 'Maiban neru mae ni hon o yonde imasu.', de: 'Ich lese jeden Abend vor dem Schlafen ein Buch.' },
            { jp: '週に三回ジムに通っている。', romaji: 'Shū ni sankai jimu ni kayotte iru.', de: 'Ich gehe dreimal pro Woche ins Fitnessstudio.' }
          ]
        },
        {
          heading: 'Beruf & Zugehörigkeit',
          text: 'Für Berufe, Wohnort und langfristige Zugehörigkeiten nutzt man ebenfalls ている. Hier beschreibt ている einen <strong>andauernden Lebensumstand</strong> — etwas, das nicht nur gerade jetzt, sondern über einen längeren Zeitraum gilt. Dies ist eine der natürlichsten Verwendungen von ている im Japanischen.',
          examples: [
            { jp: '大学で教えています。', romaji: 'Daigaku de oshiete imasu.', de: 'Ich unterrichte an der Uni. (= Das ist mein Job)' },
            { jp: '東京に住んでいます。', romaji: 'Tōkyō ni sunde imasu.', de: 'Ich wohne in Tokyo. (Dauerzustand)' },
            { jp: '日本の会社で働いている。', romaji: 'Nihon no kaisha de hataraite iru.', de: 'Ich arbeite bei einer japanischen Firma.' },
            { jp: 'トヨタに勤めています。', romaji: 'Toyota ni tsutomete imasu.', de: 'Ich bin bei Toyota angestellt.' },
            { jp: '日本語学校に通っています。', romaji: 'Nihongo gakkō ni kayotte imasu.', de: 'Ich besuche eine Japanisch-Sprachschule.' }
          ]
        },
        {
          heading: 'Erfahrung & Wissen (経験)',
          text: 'In Kombination mit bestimmten Verben kann ている auch ausdrücken, dass man etwas <strong>weiß oder kennt</strong>, weil man es erfahren oder gelernt hat. Das bekannteste Beispiel ist 知っている (wissen/kennen). Hier beschreibt ている den Zustand des „im Besitz von Wissen sein". Beachte: Die Verneinung ist 知らない (nicht 知っていない!) — eine der bekanntesten Ausnahmen im Japanischen.',
          examples: [
            { jp: 'その話は知っています。', romaji: 'Sono hanashi wa shitte imasu.', de: 'Diese Geschichte kenne ich.' },
            { jp: '田中さんを知っていますか。', romaji: 'Tanaka-san o shitte imasu ka.', de: 'Kennen Sie Herrn Tanaka?' },
            { jp: 'いいえ、知りません。', romaji: 'Iie, shirimasen.', de: 'Nein, ich kenne ihn nicht. (NICHT: 知っていません)' },
            { jp: 'この漢字の読み方を知っている？', romaji: 'Kono kanji no yomikata o shitte iru?', de: 'Weißt du, wie man dieses Kanji liest?' },
            { jp: 'もう聞いている。', romaji: 'Mō kiite iru.', de: 'Ich habe schon davon gehört. (= Ich weiß Bescheid)' }
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
            { jp: '荷物が落ちそうだ。', romaji: 'Nimotsu ga ochisō da.', de: 'Das Gepäck sieht aus, als würde es gleich fallen.' },
            { jp: 'この仕事は大変そうだ。', romaji: 'Kono shigoto wa taihensō da.', de: 'Diese Arbeit sieht anstrengend aus.' },
            { jp: '彼女は元気そうでした。', romaji: 'Kanojo wa genkisō deshita.', de: 'Sie sah munter aus.' },
            { jp: 'もうすぐ届きそうだ。', romaji: 'Mō sugu todokisō da.', de: 'Es sieht so aus, als würde es gleich ankommen.' }
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
            { jp: '風邪を引いたようです。', romaji: 'Kaze o hiita yō desu.', de: 'Es scheint, als hätte ich mich erkältet. (Mehrere Symptome deuten darauf hin.)' },
            { jp: 'どうやら成功したみたいだ。', romaji: 'Dōyara seikō shita mitai da.', de: 'Es sieht ganz so aus, als hätte es geklappt.' },
            { jp: '彼女は日本人のようです。', romaji: 'Kanojo wa nihonjin no yō desu.', de: 'Sie scheint Japanerin zu sein. (の vor ようだ bei Nomen)' }
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
            { jp: '新しいプロジェクトは難しいらしい。', romaji: 'Atarashii purojekuto wa muzukashii rashii.', de: 'Das neue Projekt soll schwierig sein. (Habe ich von Kollegen gehört.)' },
            { jp: '北海道は冬がとても寒いらしい。', romaji: 'Hokkaidō wa fuyu ga totemo samui rashii.', de: 'In Hokkaido soll es im Winter sehr kalt sein.' },
            { jp: '彼は会社を辞めたらしいよ。', romaji: 'Kare wa kaisha o yameta rashii yo.', de: 'Er soll angeblich die Firma verlassen haben.' }
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
            { jp: '東京に住んでいる友達', romaji: 'Tōkyō ni sunde iru tomodachi', de: 'ein Freund, der in Tokyo wohnt' },
            { jp: '去年見た映画', romaji: 'kyonen mita eiga', de: 'der Film, den ich letztes Jahr gesehen habe' },
            { jp: '毎朝飲むコーヒー', romaji: 'maiasa nomu kōhī', de: 'der Kaffee, den ich jeden Morgen trinke' }
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
            { jp: '日本で撮った写真を見せてください。', romaji: 'Nihon de totta shashin o misete kudasai.', de: 'Bitte zeig mir die Fotos, die du in Japan gemacht hast.' },
            { jp: '先生が説明したことが分かりましたか。', romaji: 'Sensei ga setsumei shita koto ga wakarimashita ka.', de: 'Hast du verstanden, was der Lehrer erklärt hat?' }
          ]
        },
        {
          heading: 'Verschiedene Rollen des Nomens',
          text: 'Ein besonderer Aspekt japanischer Relativsätze: Das Nomen, das beschrieben wird, kann <strong>jede beliebige Rolle</strong> im Nebensatz einnehmen — Subjekt, Objekt, Ort, Zeit, Begleitung usw. Im Deutschen braucht man dafür verschiedene Relativpronomen (der, den, dem, in dem, mit dem...), im Japanischen ändert sich nichts an der Konstruktion. Das macht es gleichzeitig einfacher und verwirrend: einfacher, weil die Form immer gleich ist; verwirrend, weil man aus dem Kontext erschließen muss, welche Rolle das Nomen spielt.',
          examples: [
            { jp: '田中さんが作った料理', romaji: 'Tanaka-san ga tsukutta ryōri', de: 'das Essen, das Tanaka gemacht hat (Nomen = Objekt im Nebensatz)' },
            { jp: '料理を作った人', romaji: 'ryōri o tsukutta hito', de: 'die Person, die das Essen gemacht hat (Nomen = Subjekt im Nebensatz)' },
            { jp: '友達と行ったレストラン', romaji: 'tomodachi to itta resutoran', de: 'das Restaurant, in das ich mit Freunden gegangen bin (Nomen = Ort)' },
            { jp: '一緒に勉強した友達', romaji: 'issho ni benkyō shita tomodachi', de: 'der Freund, mit dem ich zusammen gelernt habe (Nomen = Begleitung)' }
          ]
        },
        {
          heading: 'Wichtige Regeln',
          text: '<ul class="lesson-rules"><li><strong>Kurzform vor dem Nomen:</strong> Im Nebensatz steht immer die Kurzform (食べた, nicht 食べました). Das ist nicht verhandelbar — selbst wenn der Hauptsatz in ます-Form steht.</li><li><strong>は wird zu が:</strong> Das Subjekt im Nebensatz wird mit が markiert, nicht mit は. Das Themenpartikel は gehört in den Hauptsatz, nicht in den Nebensatz.</li><li><strong>Verschachtelung möglich:</strong> Man kann mehrere Nebensätze stapeln — aber Vorsicht, das wird schnell unübersichtlich. In der Alltagssprache beschränkt man sich meist auf ein bis zwei Ebenen.</li><li><strong>こと und の:</strong> Mit ～たこと und ～ること kann man ganze Sätze zu Nomen machen: 日本に行ったこと = „die Tatsache, dass ich nach Japan gefahren bin".</li></ul>',
          examples: [
            { jp: '友達がくれた花はきれいだ。', romaji: 'Tomodachi ga kureta hana wa kirei da.', de: 'Die Blumen, die mir mein Freund gegeben hat, sind schön.' },
            { jp: '先週見た映画の名前を忘れた。', romaji: 'Senshū mita eiga no namae o wasureta.', de: 'Ich habe den Namen des Films vergessen, den ich letzte Woche gesehen habe.' },
            { jp: '日本に行ったことがありますか。', romaji: 'Nihon ni itta koto ga arimasu ka.', de: 'Warst du schon mal in Japan? (wörtl.: Gibt es die Tatsache, dass du nach Japan gingst?)' },
            { jp: '彼が言ったことは本当だった。', romaji: 'Kare ga itta koto wa hontō datta.', de: 'Was er gesagt hat, war wahr.' }
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
            { jp: '健康のために野菜を食べています。', romaji: 'Kenkō no tame ni yasai o tabete imasu.', de: 'Ich esse Gemüse für die Gesundheit.' },
            { jp: '新しい車を買うために、貯金しています。', romaji: 'Atarashii kuruma o kau tame ni, chokin shite imasu.', de: 'Ich spare, um ein neues Auto zu kaufen.' },
            { jp: '夢を叶えるために、努力している。', romaji: 'Yume o kanaeru tame ni, doryoku shite iru.', de: 'Ich gebe mein Bestes, um meinen Traum zu verwirklichen.' }
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
            { jp: '風邪を引かないように、暖かくしてね。', romaji: 'Kaze o hikanai yō ni, atatakaku shite ne.', de: 'Zieh dich warm an, damit du dich nicht erkältest.' },
            { jp: '子供にも分かるように説明した。', romaji: 'Kodomo ni mo wakaru yō ni setsumei shita.', de: 'Ich habe es so erklärt, dass auch Kinder es verstehen.' },
            { jp: '合格できるように頑張ります。', romaji: 'Gōkaku dekiru yō ni ganbarimasu.', de: 'Ich werde mein Bestes tun, damit ich bestehe.' }
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
            { jp: '朝早く起きられるようになった。', romaji: 'Asa hayaku okirareru yō ni natta.', de: 'Ich kann jetzt morgens früh aufstehen. (Konnte ich vorher nicht.)' }
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
            { jp: '先生は試験は来週だと言った。', romaji: 'Sensei wa shiken wa raishū da to itta.', de: 'Der Lehrer hat gesagt, die Prüfung sei nächste Woche.' },
            { jp: '友達に「ありがとう」と言った。', romaji: 'Tomodachi ni „arigatō" to itta.', de: 'Ich habe zu meinem Freund „Danke" gesagt.' }
          ]
        },
        {
          heading: 'という — „Das heißt" / „Namens" / „So genannt"',
          text: 'という (to iu) in seiner attributiven Form dient dazu, <strong>etwas zu benennen, zu definieren oder zu erklären</strong>. Es verbindet einen Namen, einen Begriff oder eine Beschreibung mit dem Nomen, das es näher bestimmt. Besonders nützlich ist die Kombination ということ (die Tatsache, dass...) und というのは (was X betrifft / X bedeutet...). Diese Formen begegnen dir in Texten und Gesprächen ständig, besonders wenn Dinge erklärt oder neue Konzepte eingeführt werden.',
          examples: [
            { jp: '「桜」という花を知っていますか。', romaji: '„Sakura" to iu hana o shitte imasu ka.', de: 'Kennst du die Blume namens „Sakura"?' },
            { jp: 'ラーメンという食べ物', romaji: 'rāmen to iu tabemono', de: 'ein Essen namens Ramen' },
            { jp: '彼が来ないということは知らなかった。', romaji: 'Kare ga konai to iu koto wa shiranakatta.', de: 'Ich wusste nicht, dass er nicht kommt. (ということ = die Tatsache, dass)' },
            { jp: '「おもてなし」というのは日本の文化です。', romaji: '„Omotenashi" to iu no wa Nihon no bunka desu.', de: '„Omotenashi" (Gastfreundschaft) ist japanische Kultur. (というのは = was X betrifft)' },
            { jp: '田中という人から電話がありました。', romaji: 'Tanaka to iu hito kara denwa ga arimashita.', de: 'Es gab einen Anruf von einer Person namens Tanaka.' },
            { jp: 'つまり、行かないということですか。', romaji: 'Tsumari, ikanai to iu koto desu ka.', de: 'Heißt das also, du gehst nicht?' }
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
            { jp: '何て言った？', romaji: 'Nan te itta?', de: 'Was hast du gesagt? (て = と in der Umgangssprache)' },
            { jp: '日本語って難しいよね。', romaji: 'Nihongo tte muzukashii yo ne.', de: 'Japanisch ist schon schwer, ne? (って = というのは)' },
            { jp: '来週引っ越すんだって！', romaji: 'Raishū hikkosu n da tte!', de: 'Angeblich zieht er nächste Woche um!' }
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
            { jp: 'それは間違いだと思う。', romaji: 'Sore wa machigai da to omou.', de: 'Ich glaube, das ist ein Fehler.' },
            { jp: '彼女は来ないと思います。', romaji: 'Kanojo wa konai to omoimasu.', de: 'Ich glaube nicht, dass sie kommt.' }
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
            { jp: '合格したと信じています。', romaji: 'Gōkaku shita to shinjite imasu.', de: 'Ich glaube, dass ich bestanden habe. (と信じる = glauben)' }
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
            { jp: '先生がお書きになった本です。', romaji: 'Sensei ga okaki ni natta hon desu.', de: 'Das ist ein Buch, das der Lehrer geschrieben hat. (お + Stamm + になる)' },
            { jp: 'お客様はもうお帰りになりましたか。', romaji: 'Okyakusama wa mō okaeri ni narimashita ka.', de: 'Ist der Kunde schon gegangen? (お + Stamm + になる)' },
            { jp: '部長は何とおっしゃいましたか。', romaji: 'Buchō wa nan to osshaimashita ka.', de: 'Was hat der Abteilungsleiter gesagt? (おっしゃる = sagen, respektvoll)' }
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
            { jp: '荷物をお持ちします。', romaji: 'Nimotsu o omochi shimasu.', de: 'Ich trage Ihnen das Gepäck. (お + Stamm + する)' },
            { jp: 'ご連絡いたします。', romaji: 'Gorenraku itashimasu.', de: 'Ich werde mich bei Ihnen melden. (いたす = する, bescheiden)' },
            { jp: '先生にお聞きしたいことがあります。', romaji: 'Sensei ni okiki shitai koto ga arimasu.', de: 'Ich hätte gerne dem Lehrer etwas gefragt. (お + Stamm + する)' }
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
            { jp: 'かしこまりました。', romaji: 'Kashikomarimashita.', de: 'Verstanden. / Sehr wohl. (Sehr formell, z.B. im Hotel)' },
            { jp: 'お会計はレジでお願いいたします。', romaji: 'Okaikei wa reji de onegai itashimasu.', de: 'Die Bezahlung bitte an der Kasse.' }
          ]
        },
        {
          heading: 'Häufige Anfängerfehler',
          text: 'Keigo hat einige typische Stolperfallen, die selbst Japaner manchmal falsch machen. Die folgenden Fehler sind besonders verbreitet — wenn du sie vermeidest, bist du vielen Lernenden schon voraus. Das Grundprinzip lautet: 尊敬語 für die Handlungen <em>anderer</em>, 謙譲語 für die <em>eigenen</em> Handlungen. Wer das vertauscht, bewirkt das Gegenteil des beabsichtigten Respekts.',
          examples: [
            { jp: '✗ 先生が申しました', romaji: '(falsch: kenjōgo für den Lehrer)', de: 'Falsch! 申す ist bescheiden — damit senkst du den Lehrer.' },
            { jp: '✓ 先生がおっしゃいました', romaji: 'Sensei ga osshaimashita.', de: 'Richtig! おっしゃる ist respektvoll — der Lehrer wird hochgehoben.' },
            { jp: '✗ 私がいらっしゃいます', romaji: '(falsch: sonkeigo für sich selbst)', de: 'Falsch! いらっしゃる ist Respektsprache — damit hebst du dich selbst hoch.' },
            { jp: '✓ 私が参ります', romaji: 'Watashi ga mairimasu.', de: 'Richtig! 参る ist bescheiden — du senkst dich selbst.' }
          ],
          tip: 'Fürs Erste reicht es völlig, wenn du die です/ます-Form sicher beherrschst und die häufigsten Keigo-Wörter erkennst, wenn du sie hörst. Aktiv verwenden musst du Keigo erst, wenn du in einem japanischen Unternehmen arbeitest oder sehr formelle Situationen meistern willst. Die meisten Japaner werden es sehr schätzen, wenn du überhaupt die ます-Form korrekt benutzt!'
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
