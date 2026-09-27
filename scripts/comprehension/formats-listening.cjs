// Listening task formats: quick-response (即時応答) and utterance (発話表現).
// Unit shape: [format, 'listening', title, objective, texts, translation, glossary, note, questions].
// Quick-response items alternate speakers A and B so both voices are used; utterance passages are narration.
module.exports = {
N5: [
['quick-response', 'listening', 'Schnell antworten: Alltag', 'Auf kurze Fragen und Bemerkungen im Alltag passend reagieren.',
['A: {今日|きょう}はいい{天気|てんき}ですね。', 'B: これ、だれのかさですか。', 'A: いっしょにお{茶|ちゃ}を{飲|の}みませんか。', 'B: {何時|なんじ}に{起|お}きましたか。'],
'A: Heute ist schönes Wetter, nicht wahr? B: Wessen Regenschirm ist das? A: Wollen wir zusammen Tee trinken? B: Um wie viel Uhr bist du aufgestanden?',
[['天気（てんき）', 'Wetter'], ['いっしょに', 'zusammen'], ['起きました（おきました）', 'bin aufgestanden']],
'Auf eine Einladung mit ～ませんか antwortet man zustimmend mit ええ、いいですね – nicht mit einer verneinten Verbform.', [
['Was antwortet man am besten?', 0, ['そうですね。', 'そうですね stimmt einer Bemerkung über das Wetter zu.'], ['はい、てんきです。', 'Das wiederholt nur das Wort und ist keine natürliche Reaktion.'], ['いいえ、きのうです。', 'Das beantwortet eine Frage nach dem Zeitpunkt, die niemand gestellt hat.']],
['Welche Antwort passt?', 1, ['わたしのです。', 'だれの fragt nach dem Besitzer; わたしの nennt ihn.'], ['はい、かさです。', 'Dass es ein Schirm ist, weiß der Fragende schon.'], ['あそこです。', 'Das nennt einen Ort statt eines Besitzers.']],
['Was antwortet man am besten?', 2, ['ええ、いいですね。', 'So nimmt man eine Einladung mit ～ませんか an.'], ['はい、のみません。', 'はい passt nicht zur verneinten Form; das klingt wie eine Ablehnung.'], ['おちゃです。', 'Das beantwortet eine Frage nach dem Getränk, keine Einladung.']],
['Welche Antwort passt?', 3, ['しちじに おきました。', 'Die Frage steht in der Vergangenheit; die Antwort nennt die Uhrzeit ebenfalls in der Vergangenheit.'], ['しちじに おきます。', 'Die Gegenwartsform beschreibt eine Gewohnheit, nicht den heutigen Morgen.'], ['あさごはんを たべました。', 'Das nennt eine andere Handlung statt der Uhrzeit.']]
]],
['quick-response', 'listening', 'Schnell antworten: Im Laden und in der Schule', 'Auf typische Fragen im Laden und in der Schule reagieren.',
['A: いらっしゃいませ。{何|なに}にしますか。', 'B: すみません、トイレはどこですか。', 'A: {先生|せんせい}、さようなら。', 'B: この{本|ほん}はいくらですか。'],
'A: Willkommen. Was möchten Sie? B: Entschuldigung, wo ist die Toilette? A: Auf Wiedersehen, Herr Lehrer / Frau Lehrerin. B: Wie viel kostet dieses Buch?',
[['何にしますか（なににしますか）', 'Was möchten Sie? (Bestellung)'], ['いくら', 'wie viel (Preis)']],
'いくら fragt nach dem Preis, いくつ oder なんさつ nach der Anzahl. Achte auf das Fragewort.', [
['Was antwortet man am besten?', 0, ['コーヒーを ください。', 'Auf 何にしますか antwortet man mit der Bestellung.'], ['いらっしゃいませ。', 'Das sagt das Personal, nicht der Kunde.'], ['コーヒーが すきです。', 'Das beschreibt eine Vorliebe, ist aber keine Bestellung.']],
['Welche Antwort passt?', 1, ['あそこです。', 'どこ fragt nach dem Ort; あそこ zeigt ihn.'], ['トイレです。', 'Das wiederholt nur das Wort und nennt keinen Ort.'], ['はい、そうです。', 'Auf eine Frage mit どこ kann man nicht mit Ja antworten.']],
['Was antwortet man am besten?', 2, ['さようなら。また あした。', 'Man erwidert den Abschiedsgruß.'], ['いただきます。', 'Das sagt man vor dem Essen.'], ['はじめまして。', 'Das sagt man beim ersten Kennenlernen.']],
['Welche Antwort passt?', 3, ['さんびゃくえんです。', 'いくら fragt nach dem Preis.'], ['ほんです。', 'Dass es ein Buch ist, ist bereits bekannt.'], ['さんさつです。', 'Das nennt eine Anzahl (冊), keinen Preis.']]
]],
['utterance', 'listening', 'Was sagt man? Grüßen und danken', 'Die passende Grußformel für eine Alltagssituation wählen.',
['{友|とも}だちに{本|ほん}を{借|か}りました。{返|かえ}すとき、{何|なん}と{言|い}いますか。', '{朝|あさ}、{学校|がっこう}で{先生|せんせい}に{会|あ}いました。{何|なん}と{言|い}いますか。', 'ご{飯|はん}を{食|た}べる{前|まえ}に、{何|なん}と{言|い}いますか。', '{家|いえ}を{出|で}るとき、{何|なん}と{言|い}いますか。'],
'Du hast dir von einer Freundin ein Buch geliehen. Was sagst du beim Zurückgeben? Am Morgen triffst du in der Schule deinen Lehrer. Was sagst du? Was sagst du vor dem Essen? Was sagst du, wenn du das Haus verlässt?',
[['借りました（かりました）', 'habe (mir) geliehen'], ['返す（かえす）', 'zurückgeben']],
'ごちそうさまでした sagt man nach dem Essen, いただきます davor. ただいま sagt man beim Heimkommen, いってきます beim Weggehen.', [
['Du gibst ein geliehenes Buch zurück. Was sagst du?', 0, ['ありがとうございました。', 'Beim Zurückgeben bedankt man sich für das Leihen.'], ['どういたしまして。', 'Das ist die Antwort auf einen Dank, kein Dank.'], ['いただきます。', 'Das sagt man vor dem Essen.']],
['Du triffst morgens deinen Lehrer. Was sagst du?', 1, ['おはようございます。', 'Der höfliche Morgengruß.'], ['おやすみなさい。', 'Das sagt man vor dem Schlafengehen.'], ['こんばんは。', 'Das ist ein Abendgruß.']],
['Du beginnst zu essen. Was sagst du?', 2, ['いただきます。', 'Das sagt man vor dem Essen.'], ['ごちそうさまでした。', 'Das sagt man nach dem Essen.'], ['いってきます。', 'Das sagt man beim Weggehen.']],
['Du verlässt das Haus. Was sagst du?', 3, ['いってきます。', 'Wer geht, sagt いってきます.'], ['ただいま。', 'Das sagt man beim Heimkommen.'], ['おかえりなさい。', 'Damit begrüßt man jemanden, der heimkommt.']]
]],
['utterance', 'listening', 'Was sagt man? Bitten und entschuldigen', 'Höflich bitten, sich entschuldigen und bedanken.',
['{道|みち}で{人|ひと}の{足|あし}を{踏|ふ}みました。{何|なん}と{言|い}いますか。', '{店|みせ}で{水|みず}がほしいです。{店|みせ}の{人|ひと}に{何|なん}と{言|い}いますか。', '{友|とも}だちがおかしをくれました。{何|なん}と{言|い}いますか。', '{友|とも}だちに{電話|でんわ}をかけました。{最初|さいしょ}に{何|なん}と{言|い}いますか。'],
'Auf der Straße bist du jemandem auf den Fuß getreten. Was sagst du? Im Restaurant möchtest du Wasser. Was sagst du zum Personal? Eine Freundin hat dir Süßigkeiten geschenkt. Was sagst du? Du rufst einen Freund an. Was sagst du zuerst?',
[['踏みました（ふみました）', 'bin (darauf) getreten'], ['最初に（さいしょに）', 'zuerst']],
'すみません passt zum Entschuldigen und zum Ansprechen. Am Telefon beginnt man mit もしもし.', [
['Du bist jemandem auf den Fuß getreten. Was sagst du?', 0, ['すみません。', 'Eine kurze Entschuldigung.'], ['ありがとう。', 'Ein Dank passt nicht zu einem Missgeschick.'], ['どうぞ。', 'Damit bietet man etwas an.']],
['Du möchtest Wasser. Was sagst du?', 1, ['すみません、みずを ください。', 'Man spricht das Personal an und bittet um Wasser.'], ['みずを どうぞ。', 'Damit bietet man selbst Wasser an.'], ['みずが あります。', 'Das stellt nur fest, dass es Wasser gibt.']],
['Du bekommst Süßigkeiten geschenkt. Was sagst du?', 2, ['ありがとう。', 'Man bedankt sich für das Geschenk.'], ['どういたしまして。', 'Das ist die Antwort auf einen Dank.'], ['ごめんなさい。', 'Es gibt keinen Grund, sich zu entschuldigen.']],
['Du rufst an. Was sagst du zuerst?', 3, ['もしもし。', 'So beginnt man ein Telefongespräch.'], ['さようなら。', 'Das ist ein Abschiedsgruß.'], ['おやすみなさい。', 'Das sagt man vor dem Schlafengehen.']]
]]
],
N4: [
['quick-response', 'listening', 'Schnell antworten: Pläne und Hilfe', 'Einladungen, Bitten und Hilfsangebote richtig beantworten.',
['A: {明日|あした}、{映画|えいが}を{見|み}に{行|い}かない？', 'B: ちょっと{窓|まど}を{開|あ}けてもいいですか。', 'A: {駅|えき}までどのぐらいかかりますか。', 'B: {荷物|にもつ}、{持|も}ちましょうか。'],
'A: Wollen wir morgen ins Kino gehen? B: Darf ich kurz das Fenster öffnen? A: Wie lange braucht man bis zum Bahnhof? B: Soll ich das Gepäck tragen?',
[['〜ない？', 'lockere Einladung („wollen wir …?“)'], ['〜ましょうか', 'Angebot: Soll ich …?']],
'～ましょうか ist ein Hilfsangebot. Man nimmt es mit おねがいします an oder lehnt höflich mit だいじょうぶです ab.', [
['Was antwortet man am besten?', 0, ['いいね、いこう。', 'Eine lockere Zusage auf die lockere Einladung.'], ['うん、みなかったよ。', 'Die Vergangenheitsform passt nicht zu einem Plan für morgen.'], ['えいがは あしたです。', 'Das wiederholt nur die Information, statt zu antworten.']],
['Welche Antwort passt?', 1, ['ええ、どうぞ。', 'So erlaubt man etwas.'], ['ええ、あきました。', 'あきました beschreibt, dass sich etwas von selbst geöffnet hat – keine Erlaubnis.'], ['いいえ、まどです。', 'Das beantwortet die Bitte nicht.']],
['Was antwortet man am besten?', 2, ['あるいて じゅっぷんぐらいです。', 'どのぐらいかかりますか fragt nach der Dauer.'], ['えきは あそこです。', 'Das nennt einen Ort statt einer Dauer.'], ['バスで いきました。', 'Das nennt ein Verkehrsmittel in der Vergangenheit.']],
['Welche Antwort passt?', 3, ['あ、すみません。おねがいします。', 'So nimmt man ein Hilfsangebot dankend an.'], ['はい、もちましょう。', 'Damit schlägt man vor, es gemeinsam zu tragen – das Angebot wird nicht angenommen.'], ['いいえ、もってください。', 'Nein und die Bitte zu tragen widersprechen sich.']]
]],
['quick-response', 'listening', 'Schnell antworten: Unterwegs und im Büro', 'Im Zug und am Arbeitsplatz passend reagieren.',
['A: すみません、この{席|せき}、{空|あ}いていますか。', 'B: {昨日|きのう}はどうして{休|やす}んだんですか。', 'A: {会議|かいぎ}の{資料|しりょう}、もうコピーしましたか。', 'B: お{先|さき}に{失礼|しつれい}します。'],
'A: Entschuldigung, ist dieser Platz frei? B: Warum hast du gestern gefehlt? A: Hast du die Unterlagen für die Besprechung schon kopiert? B: Ich gehe dann schon mal.',
[['空いています（あいています）', 'ist frei'], ['お先に失礼します（おさきにしつれいします）', 'Ich gehe schon mal (Verabschiedung im Büro)']],
'Wer das Büro vor den anderen verlässt, sagt お先に失礼します; die Antwort ist お疲れさまでした.', [
['Was antwortet man am besten?', 0, ['ええ、どうぞ。', 'So bietet man den freien Platz an.'], ['いいえ、すわりません。', 'Das beantwortet nicht, ob der Platz frei ist.'], ['せきは ここです。', 'Das zeigt nur, wo ein Platz ist.']],
['Welche Antwort passt?', 1, ['ねつが あったんです。', 'どうして fragt nach dem Grund; ～んです erklärt ihn.'], ['あしたは やすみます。', 'Das spricht über morgen statt über gestern.'], ['はい、やすみました。', 'Das bestätigt nur das Fehlen, nennt aber keinen Grund.']],
['Was antwortet man am besten?', 2, ['はい、もう しました。', 'もう ～ましたか fragt, ob etwas schon erledigt ist.'], ['いいえ、もう しません。', 'もう しません bedeutet „nicht mehr tun“; die natürliche Verneinung wäre まだです.'], ['かいぎは さんじからです。', 'Das nennt die Uhrzeit statt den Stand der Kopien.']],
['Welche Antwort passt?', 3, ['おつかれさまでした。', 'Die übliche Antwort, wenn jemand die Arbeit verlässt.'], ['いってらっしゃい。', 'Das sagt man zu jemandem, der kurz weggeht und zurückkommt.'], ['おかえりなさい。', 'Damit begrüßt man jemanden, der zurückkommt.']]
]],
['utterance', 'listening', 'Was sagt man? Hilfe und Besuch', 'In Alltagssituationen höflich bitten und anbieten.',
['{先生|せんせい}の{話|はなし}がよく{聞|き}こえませんでした。{何|なん}と{言|い}いますか。', '{重|おも}い{荷物|にもつ}を{持|も}っているおばあさんがいます。{手伝|てつだ}いたいです。{何|なん}と{言|い}いますか。', '{友|とも}だちの{家|いえ}に{入|はい}ります。{何|なん}と{言|い}いますか。', '{会社|かいしゃ}で、{先|さき}に{帰|かえ}る{人|ひと}に{何|なん}と{言|い}いますか。'],
'Du hast nicht richtig gehört, was der Lehrer gesagt hat. Was sagst du? Eine ältere Frau trägt schweres Gepäck. Du möchtest helfen. Was sagst du? Du betrittst die Wohnung eines Freundes. Was sagst du? Was sagst du in der Firma zu jemandem, der früher nach Hause geht?',
[['聞こえませんでした（きこえませんでした）', 'konnte nicht hören'], ['お邪魔します（おじゃまします）', 'Entschuldigen Sie die Störung (beim Betreten)']],
'おじゃまします sagt man beim Betreten fremder Räume. Wer geht, sagt お先に失礼します; die Bleibenden antworten お疲れさまでした.', [
['Du hast den Lehrer nicht verstanden. Was sagst du?', 0, ['すみません、もう いちど おねがいします。', 'So bittet man höflich um eine Wiederholung.'], ['よく きこえました。', 'Das behauptet das Gegenteil.'], ['はなしを きいてください。', 'Damit bittet man den Lehrer, selbst zuzuhören.']],
['Du möchtest beim Tragen helfen. Was sagst du?', 1, ['にもつ、もちましょうか。', 'Mit ～ましょうか bietet man Hilfe an.'], ['にもつを もってください。', 'Damit bittet man die Frau, das Gepäck zu tragen.'], ['にもつが おもいですね。', 'Das ist nur eine Bemerkung, kein Hilfsangebot.']],
['Du betrittst die Wohnung eines Freundes. Was sagst du?', 2, ['おじゃまします。', 'Die übliche Formel beim Betreten.'], ['いらっしゃい。', 'Das sagt der Gastgeber.'], ['おかえり。', 'Damit begrüßt man Heimkehrende.']],
['Ein Kollege geht früher nach Hause. Was sagst du zu ihm?', 3, ['おつかれさまでした。', 'Die Antwort der Bleibenden an den, der geht.'], ['おさきに しつれいします。', 'Das sagt der, der selbst geht.'], ['いってきます。', 'Das sagt man beim eigenen Weggehen.']]
]],
['utterance', 'listening', 'Was sagt man? Im Laden und im Restaurant', 'Im Geschäft und im Restaurant die passende Formulierung wählen.',
['レストランで、{料理|りょうり}を{注文|ちゅうもん}したいです。{店|みせ}の{人|ひと}を{呼|よ}びます。{何|なん}と{言|い}いますか。', '{店|みせ}で、{服|ふく}を{着|き}てみたいです。{何|なん}と{言|い}いますか。', 'レストランで{食事|しょくじ}が{終|お}わりました。お{金|かね}を{払|はら}いたいです。{何|なん}と{言|い}いますか。'],
'Du möchtest im Restaurant bestellen und rufst das Personal. Was sagst du? Du möchtest im Geschäft Kleidung anprobieren. Was sagst du? Du hast im Restaurant fertig gegessen und möchtest bezahlen. Was sagst du?',
[['注文（ちゅうもん）', 'Bestellung'], ['お会計（おかいけい）', 'Rechnung, Bezahlen']],
'～てみてもいいですか fragt höflich um Erlaubnis, etwas auszuprobieren. Zum Bezahlen sagt man おかいけい、おねがいします.', [
['Du rufst das Personal. Was sagst du?', 0, ['すみません。', 'Damit spricht man das Personal an.'], ['いらっしゃいませ。', 'Das sagt das Personal zu Gästen.'], ['おまたせしました。', 'Das sagt das Personal, wenn es etwas bringt.']],
['Du möchtest ein Kleidungsstück anprobieren. Was sagst du?', 1, ['これ、きてみても いいですか。', 'So fragt man um Erlaubnis zum Anprobieren.'], ['これ、きてください。', 'Damit bittet man eine andere Person, es anzuziehen.'], ['これ、きましたか。', 'Das fragt, ob jemand es schon getragen hat.']],
['Du möchtest bezahlen. Was sagst du?', 2, ['おかいけい、おねがいします。', 'So bittet man um die Rechnung.'], ['いただきます。', 'Das sagt man vor dem Essen.'], ['おかねを ください。', 'Damit verlangt man selbst Geld.']]
]]
],
N3: [
['quick-response', 'listening', 'Schnell antworten: Absichten erkennen', 'Kurze umgangssprachliche Äußerungen und ihre Absicht verstehen.',
['A: この{資料|しりょう}、{明日|あした}までにまとめてもらえる？', 'B: {田中|たなか}さん、もう{帰|かえ}っちゃった？', 'A: {駅前|えきまえ}に{新|あたら}しいラーメン{屋|や}ができたの、{知|し}ってる？', 'B: あれ、{傘|かさ}{持|も}ってこなかったの？'],
'A: Kannst du diese Unterlagen bis morgen zusammenstellen? B: Ist Tanaka schon nach Hause gegangen? A: Weißt du, dass vor dem Bahnhof ein neuer Ramen-Laden aufgemacht hat? B: Nanu, hast du keinen Schirm mitgebracht?',
[['まとめる', 'zusammenfassen, fertigstellen'], ['～てもらえる？', 'Kannst du … (für mich)?']],
'Bei verneinten Fragen wie 持ってこなかったの？ bestätigt うん die Verneinung: „Stimmt, ich habe keinen mitgebracht.“', [
['Was antwortet man am besten?', 0, ['うん、わかった。やっておくよ。', 'Man nimmt die Bitte an und sagt zu, es zu erledigen.'], ['うん、まとめてもらったよ。', 'Das vertauscht die Rollen: Jemand anderes hätte es für einen gemacht.'], ['資料は明日だよ。', 'Das wiederholt nur die Frist und sagt nicht zu.']],
['Welche Antwort passt?', 1, ['うん、さっき帰ったよ。', 'Die Frage, ob Tanaka schon gegangen ist, wird beantwortet.'], ['ううん、帰らないで。', 'Das ist eine Bitte an den Gesprächspartner, nicht zu gehen.'], ['うん、これから帰るつもり。', 'Das spricht über die eigenen Pläne statt über Tanaka.']],
['Was antwortet man am besten?', 2, ['えっ、知らなかった。今度行ってみよう。', 'Man reagiert auf die neue Information.'], ['うん、ラーメンを作ったんだ。', 'できた bedeutet hier „eröffnet“, nicht „gekocht“.'], ['駅前までバスで行くよ。', 'Das beantwortet eine Frage nach dem Weg.']],
['Welche Antwort passt?', 3, ['うん、朝は晴れてたから。', 'うん bestätigt, dass man keinen Schirm dabeihat, und nennt den Grund.'], ['うん、持ってきたよ。', 'Das widerspricht sich: Auf die verneinte Frage bestätigt うん, dass man keinen Schirm mitgebracht hat.'], ['ええ、雨の日は傘をさします。', 'Das ist eine allgemeine Aussage über Gewohnheiten und reagiert nicht auf die Frage.']]
]],
['quick-response', 'listening', 'Schnell antworten: Höflich reagieren', 'Auf höfliche Standardsätze mit der passenden Formel antworten.',
['A: {先日|せんじつ}はお{世話|せわ}になりました。', 'B: {今|いま}、ちょっといいですか。', 'A: このケーキ、よかったら{召|め}し{上|あ}がってください。', 'B: {遅|おそ}くなってすみません。'],
'A: Vielen Dank für neulich. B: Haben Sie gerade einen Moment? A: Bitte nehmen Sie doch von diesem Kuchen, wenn Sie mögen. B: Entschuldigen Sie die Verspätung.',
[['お世話になる', 'jemandem zu Dank verpflichtet sein'], ['召し上がる', 'essen, trinken (Ehrform)']],
'召し上がる ist eine Ehrform für andere. Über das eigene Essen sagt man いただきます.', [
['Was antwortet man am besten?', 0, ['いえいえ、こちらこそ。', 'Man gibt den Dank bescheiden zurück.'], ['はい、お世話しました。', 'Das nimmt den Dank selbstgefällig an und klingt unhöflich.'], ['いいえ、先日は休みでした。', 'Das missversteht den Dank als Frage nach dem Tag.']],
['Welche Antwort passt?', 1, ['はい、何でしょう。', 'So signalisiert man, dass man Zeit hat, und fragt nach dem Anliegen.'], ['はい、ちょっといいです。', 'Die wörtliche Wiederholung klingt unnatürlich.'], ['いいえ、今です。', 'Das beantwortet eine Frage nach dem Zeitpunkt.']],
['Was antwortet man am besten?', 2, ['ありがとうございます。いただきます。', 'Man nimmt das Angebot dankend an.'], ['はい、召し上がります。', 'Die Ehrform für das eigene Essen ist falsch.'], ['どうぞ召し上がってください。', 'Das gibt die Einladung einfach an den Gastgeber zurück.']],
['Welche Antwort passt?', 3, ['いえ、私も今来たところです。', 'Man beruhigt die Person, die sich entschuldigt.'], ['はい、もう少し遅くなります。', 'Das spricht über die eigene Verspätung.'], ['ええ、遅くなってすみません。', 'Das wiederholt die Entschuldigung, obwohl man selbst gewartet hat.']]
]],
['utterance', 'listening', 'Was sagt man? Im Büro', 'Im beruflichen Umfeld die passende höfliche Formulierung wählen.',
['{会社|かいしゃ}で、上司より{先|さき}に{帰|かえ}ります。{何|なん}と{言|い}いますか。', 'お{客様|きゃくさま}に、{少|すこ}し{待|ま}ってもらいたいです。{何|なん}と{言|い}いますか。', '{電話|でんわ}で、{話|はな}したい{人|ひと}がいませんでした。あとで{自分|じぶん}からかけ{直|なお}したいです。{何|なん}と{言|い}いますか。', '上司の{話|はなし}が{聞|き}き{取|と}れませんでした。もう{一度|いちど}{言|い}ってほしいです。{何|なん}と{言|い}いますか。'],
'Du gehst vor deiner Vorgesetzten nach Hause. Was sagst du? Du möchtest, dass ein Kunde kurz wartet. Was sagst du? Am Telefon ist die gewünschte Person nicht da. Du möchtest später selbst zurückrufen. Was sagst du? Du hast deinen Vorgesetzten nicht verstanden und möchtest, dass er es wiederholt. Was sagst du?',
[['上司（じょうし）', 'Vorgesetzte(r)'], ['後ほど（のちほど）', 'später (höflich)'], ['恐れ入りますが（おそれいりますが）', 'Entschuldigen Sie, aber …']],
'Bitten an Vorgesetzte und Kunden formuliert man mit おっしゃっていただけますか oder お待ちください, nicht mit Formen, die einen Gefallen anbieten (～てあげる).', [
['Du gehst vor deiner Vorgesetzten. Was sagst du?', 0, ['お先に失礼します。', 'Das sagt, wer als Erster geht.'], ['お疲れさまでした。', 'Das sagen die, die bleiben.'], ['いってまいります。', 'Das sagt man, wenn man kurz weggeht und zurückkommt.']],
['Ein Kunde soll kurz warten. Was sagst du?', 1, ['少々お待ちください。', 'Die höfliche Standardbitte um Geduld.'], ['少し待ってあげます。', 'Damit bietet man selbst an zu warten.'], ['お待たせしました。', 'Das sagt man nach dem Warten.']],
['Du willst später selbst zurückrufen. Was sagst du?', 2, ['では、また後ほどお電話いたします。', 'いたします ist die bescheidene Form für das eigene Anrufen.'], ['では、後ほどお電話ください。', 'Damit bittet man die andere Seite um einen Rückruf.'], ['お電話ありがとうございました。', 'Das beendet das Gespräch, ohne den Rückruf anzukündigen.']],
['Du möchtest, dass dein Vorgesetzter es wiederholt. Was sagst du?', 3, ['恐れ入りますが、もう一度おっしゃっていただけますか。', 'Eine höfliche Bitte um Wiederholung an einen Vorgesetzten.'], ['もう一度言ってあげましょうか。', 'Damit bietet man selbst an, etwas zu wiederholen.'], ['もう一度申し上げます。', 'Damit kündigt man an, selbst etwas zu wiederholen.']]
]],
['utterance', 'listening', 'Was sagt man? Nachbarn und Freunde', 'Glückwünsche, Genesungswünsche und Begrüßungsformeln unterscheiden.',
['{引|ひ}っ{越|こ}してきて、{隣|となり}の{家|いえ}にあいさつに{行|い}きました。{何|なん}と{言|い}いますか。', '{友達|ともだち}が{試験|しけん}に合格しました。{何|なん}と{言|い}いますか。', '{友達|ともだち}が{風邪|かぜ}で{休|やす}んでいます。{電話|でんわ}を{切|き}るとき、{何|なん}と{言|い}いますか。', '{友達|ともだち}の{家|いえ}で{晩|ばん}ご{飯|はん}をごちそうになりました。{帰|かえ}るとき、{何|なん}と{言|い}いますか。'],
'Du bist umgezogen und stellst dich bei den Nachbarn vor. Was sagst du? Eine Freundin hat die Prüfung bestanden. Was sagst du? Ein Freund liegt mit einer Erkältung im Bett. Was sagst du am Ende des Telefonats? Du wurdest bei Freunden zum Abendessen eingeladen. Was sagst du beim Gehen?',
[['引っ越す（ひっこす）', 'umziehen'], ['合格（ごうかく）', 'Bestehen (einer Prüfung)']],
'お大事に wünscht Kranken gute Besserung. ごちそうさまでした bedankt sich für eine Einladung zum Essen – auch noch beim Gehen.', [
['Du stellst dich bei den neuen Nachbarn vor. Was sagst du?', 0, ['隣に越してきた者です。よろしくお願いします。', 'Man stellt sich als neuer Nachbar vor und bittet um gute Nachbarschaft.'], ['お邪魔しました。', 'Das sagt man beim Verlassen einer fremden Wohnung.'], ['おかえりなさい。', 'Damit begrüßt man Heimkehrende.']],
['Deine Freundin hat bestanden. Was sagst du?', 1, ['合格おめでとう！よかったね。', 'Ein Glückwunsch.'], ['お大事に。', 'Das wünscht man Kranken.'], ['残念だったね。', 'Das tröstet nach einem Misserfolg.']],
['Du beendest ein Telefonat mit einem kranken Freund. Was sagst du?', 2, ['お大事にね。', 'Gute Besserung.'], ['おめでとう。', 'Ein Glückwunsch passt nicht zu einer Krankheit.'], ['ごちそうさま。', 'Das sagt man nach dem Essen.']],
['Du verabschiedest dich nach dem Abendessen. Was sagst du?', 3, ['今日はごちそうさまでした。', 'Man bedankt sich für die Einladung zum Essen.'], ['いただきます。', 'Das sagt man vor dem Essen.'], ['おかまいなく。', 'Damit lehnt man Bewirtung ab, bevor sie angeboten wird.']]
]]
],
N2: [
['quick-response', 'listening', 'Schnell antworten: Zwischen den Zeilen', 'Die Absicht hinter umgangssprachlichen und höflichen Äußerungen erkennen.',
['A: {悪|わる}いけど、この{仕事|しごと}、{今週中|こんしゅうちゅう}に{片付|かたづ}けてもらえないかな。', 'B: {新|あたら}しい企画、{部長|ぶちょう}に{反対|はんたい}されるかと{思|おも}ったら、あっさり{通|とお}っちゃったよ。', 'A: せっかく{来|き}てくれたのに、{何|なん}のおかまいもできませんで。', 'B: {山田|やまだ}さんって、{口|くち}ばっかりで{全然|ぜんぜん}{手伝|てつだ}ってくれないんだから。'],
'A: Tut mir leid, aber könntest du diese Arbeit noch diese Woche erledigen? B: Ich dachte, der Abteilungsleiter würde gegen das neue Projekt sein, aber es ging ganz glatt durch. A: Du bist extra gekommen, und ich konnte dir nicht einmal etwas anbieten. B: Yamada redet nur und hilft überhaupt nicht mit.',
[['企画（きかく）', 'Projekt, Plan'], ['あっさり', 'problemlos, ohne Umstände'], ['おかまい', 'Bewirtung']],
'～かと思ったら leitet ein unerwartetes Ergebnis ein: Man erwartete Widerstand, aber der Plan ging glatt durch.', [
['Was antwortet man am besten?', 0, ['わかりました。何とかやってみます。', 'Man nimmt die Bitte an.'], ['ええ、片付けてもらいました。', 'Das vertauscht, wer die Arbeit macht.'], ['今週は忙しかったですね。', 'Das spricht über die Vergangenheit und reagiert nicht auf die Bitte.']],
['Welche Antwort passt?', 1, ['へえ、それはよかったですね。', 'Das Projekt wurde genehmigt; man freut sich mit.'], ['えっ、やっぱり反対されたんですか。', 'Es wurde gerade nicht abgelehnt.'], ['じゃあ、もう一度出し直しましょう。', 'Ein erneutes Einreichen ist nicht nötig.']],
['Was antwortet man am besten?', 2, ['いえ、こちらこそ急にお邪魔してすみません。', 'Man weist die bescheidene Entschuldigung des Gastgebers höflich zurück.'], ['ええ、何もありませんでしたね。', 'Das bestätigt die Floskel wörtlich und ist unhöflich.'], ['では、何か持ってきましょうか。', 'Der Gast bietet an, etwas zu holen – das passt nicht.']],
['Welche Antwort passt?', 3, ['確かに、言うだけで動かないよね。', '口ばっかり bedeutet „nur Worte“; man stimmt der Kritik zu.'], ['そう、よく手伝ってくれるよね。', 'Das widerspricht der Aussage.'], ['山田さん、口が痛いの？', '口ばっかり ist eine Redewendung, keine Aussage über den Mund.']]
]],
['quick-response', 'listening', 'Schnell antworten: Im Beruf', 'Geschäftliche Äußerungen und höfliche Absagen richtig einordnen.',
['A: {例|れい}の{件|けん}、先方から{何|なに}か{連絡|れんらく}ありました？', 'B: {会議|かいぎ}、{三十分|さんじゅっぷん}{遅|おく}らせてもらえる？', 'A: {今回|こんかい}はご{縁|えん}がなかったということで……。', 'B: {課長|かちょう}、{明日|あした}の{出張|しゅっちょう}の{新幹線|しんかんせん}の{切符|きっぷ}、もう手配してあります。'],
'A: Hat sich die Gegenseite wegen der bewussten Angelegenheit gemeldet? B: Kannst du die Besprechung um dreißig Minuten verschieben? A: Diesmal hat es leider nicht gepasst … B: Herr Sektionsleiter, die Shinkansen-Fahrkarten für die Dienstreise morgen sind schon besorgt.',
[['先方（せんぽう）', 'die Gegenseite (Geschäftspartner)'], ['ご縁（ごえん）', 'Verbindung, Schicksal'], ['手配（てはい）', 'Vorbereitung, Besorgung']],
'ご縁がなかった ist eine höfliche Absage, etwa nach einem Vorstellungsgespräch oder einem Angebot.', [
['Was antwortet man am besten?', 0, ['いえ、まだ何も。', 'Man antwortet auf die Frage nach einer Rückmeldung.'], ['はい、連絡しておきます。', 'Das kündigt an, selbst Kontakt aufzunehmen.'], ['先方は来週いらっしゃいます。', 'Das beantwortet eine andere Frage.']],
['Welche Antwort passt?', 1, ['わかりました。皆さんに伝えておきます。', 'Man nimmt die Bitte an und informiert die anderen.'], ['はい、三十分遅れました。', 'Das berichtet von einer eigenen Verspätung.'], ['会議は三十分で終わりますよ。', 'Das spricht über die Dauer, nicht über den Beginn.']],
['Was antwortet man am besten?', 2, ['そうですか。残念ですが、承知しました。', 'Man nimmt die höfliche Absage an.'], ['では、よろしくお願いします。', 'Das klingt, als hätte man eine Zusage bekommen.'], ['ご縁があってよかったです。', 'Das missversteht die Absage als Zusage.']],
['Welche Antwort passt?', 3, ['ああ、助かるよ。ありがとう。', 'Der Vorgesetzte bedankt sich für die Erledigung.'], ['じゃあ、早く手配してくれ。', 'Die Karten sind bereits besorgt.'], ['出張はもう終わったよ。', 'Die Reise ist erst morgen.']]
]]
],
N1: [
['quick-response', 'listening', 'Schnell antworten: Indirekte Absagen', 'Indirekte Ablehnungen, Einwände und Andeutungen erkennen und angemessen reagieren.',
['A: せっかくのお{誘|さそ}いですが、あいにくその{日|ひ}は先約がありまして……。', 'B: お{言葉|ことば}を{返|かえ}すようですが、その{案|あん}には{少々|しょうしょう}{無理|むり}があるかと{存|ぞん}じます。', 'A: {今回|こんかい}の{件|けん}、{部長|ぶちょう}の{耳|みみ}に{入|はい}ったら、ただじゃ{済|す}まないよ。', 'B: {課長|かちょう}、つかぬことを{伺|うかが}いますが、{来月|らいげつ}の異動の{話|はなし}、{本当|ほんとう}なんですか。'],
'A: Vielen Dank für die freundliche Einladung, aber an dem Tag habe ich leider schon etwas vor … B: Verzeihen Sie den Widerspruch, aber ich halte den Vorschlag für etwas schwer umsetzbar. A: Wenn der Abteilungsleiter davon erfährt, wird das Folgen haben. B: Entschuldigen Sie die unvermittelte Frage, Herr Sektionsleiter, aber stimmt das mit der Versetzung nächsten Monat?',
[['先約（せんやく）', 'frühere Verabredung'], ['異動（いどう）', 'Versetzung (innerhalb der Firma)'], ['ただじゃ済まない', 'das wird Folgen haben']],
'お言葉を返すようですが leitet höflich einen Widerspruch ein; die passende Reaktion ist, nach den Gründen zu fragen.', [
['Was antwortet man am besten?', 0, ['そうですか、残念です。またの機会にぜひ。', 'Man nimmt die höfliche Absage an und hält die Tür offen.'], ['では、その日にお待ちしております。', 'Das überhört die Absage.'], ['それはよかった。楽しみにしています。', 'Das versteht die Absage als Zusage.']],
['Welche Antwort passt?', 1, ['なるほど。具体的にどの点でしょうか。', 'Man geht auf den Einwand ein und fragt nach Details.'], ['ありがとうございます。では、その案で進めます。', 'Der Einwand wird ignoriert.'], ['お言葉を返していただき、恐縮です。', 'Die Floskel wird wörtlich missverstanden.']],
['Was antwortet man am besten?', 2, ['じゃあ、早めに自分から報告したほうがよさそうですね。', 'Man reagiert auf die Warnung vor ernsten Folgen.'], ['部長は耳が遠いんですか。', '耳に入る bedeutet „zu Ohren kommen“, nicht schlecht hören.'], ['ただで済むなら助かります。', 'ただじゃ済まない bedeutet, dass es gerade nicht ohne Folgen bleibt.']],
['Welche Antwort passt?', 3, ['いや、まだ正式には何も決まっていないんだ。', 'Der Vorgesetzte antwortet auf die Frage nach dem Gerücht.'], ['つかない話はしないでくれ。', 'つかぬことを伺いますが ist eine feste Floskel, kein Inhalt.'], ['来月は伺えません。', 'Das missversteht 伺う als „besuchen“.']]
]],
['quick-response', 'listening', 'Schnell antworten: Feine Nuancen', 'Bewertungen, Zugeständnisse und Bitten mit feinen Nuancen richtig deuten.',
['A: {彼|かれ}の{提案|ていあん}、{悪|わる}くはないんだけど、いまひとつ決め手に{欠|か}けるんだよね。', 'B: 先方がそこまでおっしゃるなら、こちらとしても無下には{断|ことわ}れませんね。', 'A: いやあ、あのプレゼン、{我|われ}ながらよくできたと{思|おも}うよ。', 'B: この{件|けん}は、ひとまず{私|わたし}に預からせてもらえませんか。'],
'A: Sein Vorschlag ist nicht schlecht, aber irgendwie fehlt das entscheidende Argument. B: Wenn die Gegenseite so darauf besteht, können wir nicht einfach rundweg ablehnen. A: Also, die Präsentation ist mir, wenn ich das selbst sagen darf, gut gelungen. B: Könnten Sie diese Angelegenheit vorerst mir überlassen?',
[['決め手（きめて）', 'entscheidender Punkt'], ['無下に（むげに）', 'kurzerhand, rundweg'], ['預かる（あずかる）', 'in Obhut nehmen; übernehmen']],
'我ながら bedeutet „wenn ich das selbst sagen darf“ – Eigenlob. 預からせてもらえませんか bittet darum, eine Angelegenheit übernehmen zu dürfen.', [
['Was antwortet man am besten?', 0, ['そうですね、もう一押し欲しいところです。', 'Man stimmt zu, dass noch etwas Überzeugendes fehlt.'], ['ええ、決め手がたくさんありますね。', 'Es fehlt gerade ein entscheidender Punkt.'], ['じゃあ、すぐに採用しましょう。', 'Die zurückhaltende Bewertung spricht gegen eine sofortige Annahme.']],
['Welche Antwort passt?', 1, ['ええ、前向きに検討するしかなさそうですね。', 'Man kann nicht rundweg ablehnen und muss es ernsthaft prüfen.'], ['はい、すぐに断りましょう。', '無下には断れない bedeutet gerade, dass man nicht einfach ablehnen kann.'], ['先方は何もおっしゃっていませんよ。', 'Das widerspricht der Voraussetzung der Äußerung.']],
['Was antwortet man am besten?', 2, ['自画自賛ですね。でも確かによかったです。', 'Man kommentiert das Eigenlob scherzhaft und stimmt zu.'], ['ええ、誰が作ったんですか。', '我ながら zeigt, dass der Sprecher sie selbst gemacht hat.'], ['私たちのプレゼンはまだですよ。', 'Die Präsentation hat bereits stattgefunden.']],
['Welche Antwort passt?', 3, ['わかりました。では、お任せします。', 'Man überlässt die Sache der Person, die darum bittet.'], ['はい、確かにお預かりしました。', 'Das vertauscht die Rollen: Man hätte selbst etwas übernommen.'], ['では、今すぐ返してください。', '預かる bezieht sich hier nicht auf einen Gegenstand.']]
]]
]
};
