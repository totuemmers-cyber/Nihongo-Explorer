module.exports = add => {
add('reading', 'Eine Nachricht von Yuki', 'Treffpunkt und Uhrzeit aus einer kurzen Nachricht entnehmen.',
['ミナさん、あした、いっしょに{図書館|としょかん}へ{行|い}きませんか。', 'わたしは{二時|にじ}に{駅|えき}の{前|まえ}で{待|ま}ちます。', '{本|ほん}は{三冊|さんさつ}あります。かばんを{持|も}ってきてください。ゆき'],
'Mina, möchtest du morgen mit mir zur Bibliothek gehen? Ich warte um zwei vor dem Bahnhof. Es gibt drei Bücher. Bring bitte eine Tasche mit. Yuki',
[['いっしょに', 'zusammen'], ['待ちます（まちます）', 'warten']], 'Das Ziel 図書館 ist nicht der Treffpunkt 駅の前. Lies Ortsangaben immer zusammen mit dem Verb.', [
['Was schlägt Yuki vor?', 0, ['Zusammen zur Bibliothek gehen.', '行きませんか lädt zu einem gemeinsamen Besuch ein.'], ['Am Bahnhof arbeiten.', 'Der Bahnhof ist nur ein Treffpunkt.'], ['Bücher kaufen.', 'Ein Kauf wird nicht erwähnt.'], ['Morgen zu Hause bleiben.', 'Yuki schlägt einen Ausflug vor.']],
['Wann und wo wartet Yuki?', 1, ['Um zwei vor dem Bahnhof.', '二時 und 駅の前 geben Zeit und Ort an.'], ['Um drei vor dem Bahnhof.', 'Drei ist die Zahl der Bücher.'], ['Um zwei in der Bibliothek.', 'Die Bibliothek ist das Ziel.'], ['Heute vor dem Bahnhof.', 'In der Einladung steht あした.']],
['Was sollte Mina mitbringen?', 2, ['Eine Tasche für die Bücher.', 'Die Bitte um eine Tasche folgt auf die drei Bücher.'], ['Drei neue Bücher.', 'Die Bücher sind bereits vorhanden.'], ['Essen für Yuki.', 'Essen steht nicht in der Bitte.'], ['Eine Fahrkarte für Yuki.', 'Eine Fahrkarte wird nicht verlangt.']]
]);
add('reading', 'Mittagessen im Café', 'Speisekarte und Preisbestandteile verstehen.',
['ひるのメニュー：カレーは{六百円|ろっぴゃくえん}、サンドイッチは{四百円|よんひゃくえん}です。', 'カレーにはサラダがついています。のみものはついていません。', 'コーヒーとおちゃは、どちらも{百円|ひゃくえん}です。お{水|みず}は{無料|むりょう}です。'],
'Mittagskarte: Curry kostet 600 Yen, ein Sandwich 400 Yen. Beim Curry ist ein Salat dabei, ein Getränk nicht. Kaffee und Tee kosten jeweils 100 Yen. Wasser ist kostenlos.',
[['ついています', 'ist dabei / inbegriffen'], ['無料（むりょう）', 'kostenlos']], 'ついていません verneint, dass etwas dazugehört. Achte auf das いません.', [
['Was zeigt der Text?', 0, ['Angebote für das Mittagessen.', 'ひるのメニュー bezeichnet die Mittagskarte.'], ['Die Öffnungszeiten eines Cafés.', 'Es stehen Preise statt Öffnungszeiten dort.'], ['Eine Einkaufsliste.', 'Das Menü bietet fertige Gerichte an.'], ['Eine Einladung zum Abendessen.', 'ひる bedeutet Mittag.']],
['Was ist beim Curry dabei?', 1, ['Ein Salat.', 'サラダがついています nennt die Beilage.'], ['Ein Kaffee.', 'Getränke sind ausdrücklich nicht inbegriffen.'], ['Ein Sandwich.', 'Das Sandwich ist ein eigenes Gericht.'], ['Ein Tee.', 'Getränke sind separat zu bezahlen.']],
['Wie viel kosten Curry und Tee zusammen?', 2, ['700 Yen.', 'Zum Curry für 600 Yen kommt der Tee für 100 Yen.'], ['600 Yen.', 'Tee ist nicht beim Curry dabei.'], ['500 Yen.', 'Das wäre Sandwich plus Tee.'], ['800 Yen.', 'Der Tee kostet nur 100 Yen zusätzlich.']]
]);
add('reading', 'Der Schwimmbadplan', 'Tage und Öffnungszeiten unterscheiden.',
['このプールは{月曜日|げつようび}から{土曜日|どようび}まであいています。{日曜日|にちようび}は{休|やす}みです。', '{月曜日|げつようび}から{金曜日|きんようび}は{午前|ごぜん}{十時|じゅうじ}から{午後|ごご}{八時|はちじ}までです。', '{土曜日|どようび}は{午前|ごぜん}{九時|くじ}から{午後|ごご}{五時|ごじ}までです。'],
'Das Schwimmbad ist von Montag bis Samstag geöffnet. Sonntag ist Ruhetag. Montag bis Freitag ist es von 10 Uhr morgens bis 20 Uhr geöffnet. Samstag ist es von 9 bis 17 Uhr geöffnet.',
[['あいています', 'ist geöffnet'], ['休み（やすみ）', 'Ruhetag / frei']], '午前 steht für vormittags und 午後 für nachmittags. Der Samstag hat einen eigenen Zeitplan.', [
['Worüber informiert der Text?', 0, ['Die Öffnungstage eines Schwimmbads.', 'プール und die Wochentage geben das Thema an.'], ['Die Preise einer Schwimmschule.', 'Preise werden nicht genannt.'], ['Einen Ausflug am Sonntag.', 'Sonntag wird als Ruhetag genannt.'], ['Einen Stundenplan für Japanisch.', 'Der Text handelt von einem Schwimmbad.']],
['Bis wann ist am Freitag geöffnet?', 1, ['Bis 20 Uhr.', 'Freitag gehört zu 月曜日から金曜日, bis 午後八時.'], ['Bis 17 Uhr.', 'Das gilt am Samstag.'], ['Bis 10 Uhr.', '10 Uhr ist die Öffnungszeit.'], ['Bis 8 Uhr morgens.', 'Es steht 午後, nicht 午前.']],
['Wann kann man um 9 Uhr morgens schwimmen?', 2, ['Am Samstag.', 'Nur samstags wird schon um neun geöffnet.'], ['Am Montag.', 'Montags öffnet das Bad erst um zehn.'], ['Am Freitag.', 'Freitags öffnet es um zehn.'], ['Am Sonntag.', 'Sonntag ist geschlossen.']]
]);
add('reading', 'Das neue Zimmer', 'Eine einfache Raumbeschreibung räumlich verstehen.',
['わたしの{新|あたら}しいへやは{小|ちい}さいです。でも、{明|あか}るいです。', '{窓|まど}の{下|した}に{机|つくえ}があります。{本|ほん}は{机|つくえ}の{上|うえ}です。', 'ベッドのとなりにいすがあります。かばんはいすの{上|うえ}です。'],
'Mein neues Zimmer ist klein, aber hell. Unter dem Fenster steht ein Schreibtisch. Die Bücher liegen auf dem Schreibtisch. Neben dem Bett steht ein Stuhl. Die Tasche liegt auf dem Stuhl.',
[['明るい（あかるい）', 'hell'], ['となり', 'neben / Nachbarschaft']], 'Verfolge jedes neue Thema: 本は beschreibt die Bücher, かばんは die Tasche. Nicht alle Gegenstände liegen am selben Ort.', [
['Wie wird das Zimmer beschrieben?', 0, ['Klein und hell.', '小さい und 明るい stehen beide im Text.'], ['Groß und hell.', '小さい bedeutet klein.'], ['Klein und dunkel.', '明るい bedeutet hell.'], ['Alt und groß.', 'Es ist neu und klein.']],
['Wo liegen die Bücher?', 1, ['Auf dem Schreibtisch.', '本は机の上 nennt ihre Position.'], ['Unter dem Schreibtisch.', '下 gehört zum Fenster, nicht zu den Büchern.'], ['Auf dem Bett.', 'Das Bett wird erst später genannt.'], ['Auf dem Stuhl.', 'Dort liegt die Tasche.']],
['Du möchtest die Tasche holen. Wohin gehst du?', 2, ['Zum Stuhl neben dem Bett.', 'Die Tasche liegt auf diesem Stuhl.'], ['Unter den Schreibtisch.', 'Die Tasche wird nicht dort verortet.'], ['Auf die andere Seite des Fensters.', 'Das Fenster beschreibt den Ort des Schreibtischs.'], ['Zum Bücherregal.', 'Ein Bücherregal wird nicht genannt.']]
]);
add('reading', 'Was braucht Ken?', 'Mehrere kurze Mitteilungen zu einer Handlung verbinden.',
['ケンさん、きょうの{日本語|にほんご}のクラスは{三階|さんがい}の{教室|きょうしつ}です。', '{先生|せんせい}の{本|ほん}を{使|つか}います。じぶんの{本|ほん}はいりません。', 'なまえを{書|か}きますから、えんぴつを{持|も}ってきてください。クラスは{午後|ごご}{六時半|ろくじはん}からです。'],
'Ken, der heutige Japanischkurs ist im Klassenraum im dritten Stock. Wir benutzen die Bücher der Lehrkraft. Dein eigenes Buch brauchst du nicht. Bring einen Bleistift mit, weil wir unsere Namen schreiben. Der Kurs beginnt um halb sieben.',
[['いりません', 'wird nicht gebraucht'], ['使います（つかいます）', 'benutzen']], 'いりません bedeutet „nicht nötig“. Es ist kein Verbot, ein Buch mitzubringen.', [
['Wozu dient die Nachricht?', 0, ['Ken über den heutigen Kurs informieren.', 'Heute, der Japanischkurs und der Klassenraum werden genannt.'], ['Einen Kurs absagen.', 'Ein Raum und eine Startzeit werden angegeben.'], ['Ken zum Buchladen schicken.', 'Es geht um Unterricht.'], ['Einen neuen Lehrer vorstellen.', 'Die Lehrkraft wird nicht vorgestellt.']],
['Wessen Bücher werden benutzt?', 1, ['Die Bücher der Lehrkraft.', '先生の本 nennt den Besitzer.'], ['Kens eigene Bücher.', 'Sein eigenes Buch wird nicht gebraucht.'], ['Neue Bücher aus einem Laden.', 'Ein Kauf ist nicht vorgesehen.'], ['Die Bücher eines anderen Kurses.', 'Ein anderer Kurs wird nicht erwähnt.']],
['Wie bereitet Ken sich passend vor?', 2, ['Mit Bleistift um 18:30 Uhr im Raum im dritten Stock sein.', 'Bleistift und Beginn um halb sieben sind genannt; den Raum nennt die erste Zeile.'], ['Um 18 Uhr ohne Bleistift kommen.', '半 und die Bitte um einen Bleistift fehlen dabei.'], ['Um 19:30 Uhr im Erdgeschoss sein.', 'Uhrzeit und Stockwerk stimmen nicht.'], ['Erst ein eigenes Buch kaufen.', 'Das eigene Buch ist ausdrücklich nicht nötig.']]
]);
add('listening', 'Vor dem Bahnhof', 'In einem kurzen Gespräch den Treffpunkt erkennen.',
['A: もしもし、いま、どこですか。わたしは{駅|えき}の{前|まえ}です。', 'B: わたしは{駅|えき}の{中|なか}です。{白|しろ}いぼうしをかぶっています。', 'A: わかりました。いま、そちらへ{行|い}きます。{待|ま}っていてください。'],
'A: Hallo, wo bist du gerade? Ich bin vor dem Bahnhof. B: Ich bin im Bahnhof. Ich trage einen weißen Hut. A: Verstanden. Ich komme jetzt zu dir. Warte bitte.',
[['そちら', 'dort bei dir / Ihnen'], ['かぶっています', 'trägt (auf dem Kopf)']], 'Die letzte Bitte legt fest, wer wartet. Ordne こちら und そちら immer der sprechenden Person zu.', [
['Was versuchen die beiden zu tun?', 0, ['Einander am Bahnhof finden.', 'A fragt nach Bs Standort und nennt den eigenen.'], ['Einen Hut kaufen.', 'Der Hut dient nur zur Erkennung.'], ['Die nächste Zugverbindung auswählen.', 'Es werden Standorte, aber keine Fahrzeiten besprochen.'], ['Einen verlorenen Hut suchen.', 'B trägt den Hut bereits; er ist ein Erkennungsmerkmal.']],
['Woran erkennt A die Person B?', 1, ['An einem weißen Hut.', '白いぼうし ist das Erkennungsmerkmal.'], ['An einem schwarzen Hut.', '白い heißt weiß.'], ['An einer weißen Tasche.', 'ぼうし heißt Hut.'], ['An einem roten Mantel.', 'Ein Mantel wird nicht beschrieben.']],
['Was geschieht als Nächstes?', 2, ['A geht in den Bahnhof; B wartet.', 'A geht zu B und bittet B zu warten.'], ['B kommt nach draußen; A wartet.', 'Das vertauscht die Rollen.'], ['Beide gehen nach Hause.', 'Sie wollen sich jetzt treffen.'], ['B kauft einen Hut.', 'B trägt den Hut bereits.']]
]);
add('listening', 'Eine Bestellung', 'Eine Bestellung und eine Korrektur heraushören.',
['A: いらっしゃいませ。なににしますか。', 'B: パンを{二|ふた}つと、コーヒーをください。', 'A: コーヒーはホットですか。\nB: いいえ、アイスでおねがいします。ここで{食|た}べます。'],
'A: Willkommen. Was möchten Sie? B: Zwei Brötchen und einen Kaffee bitte. A: Einen heißen Kaffee? B: Nein, einen Eiskaffee bitte. Ich esse hier.',
[['ホット / アイス', 'heiß / kalt (Getränk)'], ['ここで', 'hier (Ort einer Handlung)']], 'Eine Frage des Personals ist noch keine Bestellung. Die Antwort いいえ korrigiert den Vorschlag „heiß“.', [
['Wo findet das Gespräch wahrscheinlich statt?', 0, ['In einem Café oder einer Bäckerei.', 'Die Begrüßung und Bestellfrage passen zu einem Verkaufsort für Essen.'], ['In einer Bibliothek.', 'Hier wird Essen bestellt.'], ['An einer Bushaltestelle.', 'Es geht nicht um eine Fahrt.'], ['In einem Klassenzimmer.', 'Die Bestellfrage passt nicht zu Unterricht.']],
['Wie viele Brötchen bestellt B?', 1, ['Zwei.', '二つ bedeutet zwei Stück.'], ['Eines.', 'Es wird 二つ gesagt.'], ['Drei.', 'Drei wäre 三つ.'], ['Keine.', 'パン wird ausdrücklich bestellt.']],
['Was sollte A servieren?', 2, ['Eiskaffee zum Essen vor Ort.', 'B lehnt heißen Kaffee ab und sagt ここで食べます.'], ['Heißen Kaffee zum Mitnehmen.', 'Beide Angaben widersprechen Bs Antwort.'], ['Heißen Kaffee vor Ort.', 'ホット wird mit いいえ abgelehnt.'], ['Eiskaffee zum Mitnehmen.', 'B möchte hier essen.']]
]);
add('listening', 'Wann beginnt der Film?', 'Startzeit und Abfahrtszeit auseinanderhalten.',
['A: あしたのよる、えいがを{見|み}ませんか。\nB: いいですね。なんじからですか。', 'A: {七時|しちじ}からです。でも、{六時|ろくじ}にうちを{出|で}ます。', 'B: じゃあ、{六時|ろくじ}にあなたのうちへ{行|い}きます。いっしょに{行|い}きましょう。'],
'A: Wollen wir morgen Abend einen Film sehen? B: Gern. Wann beginnt er? A: Um sieben. Ich gehe aber um sechs von zu Hause los. B: Dann komme ich um sechs zu dir nach Hause. Gehen wir gemeinsam.',
[['うち', 'Zuhause'], ['出ます（でます）', 'hinausgehen / losgehen']], 'から markiert hier den Filmbeginn. Die zweite Zeit gehört zum Losgehen, nicht zum Film.', [
['Was wird verabredet?', 0, ['Morgen gemeinsam einen Film ansehen.', 'あした und えいがを見る nennen den Plan.'], ['Heute zu Hause lernen.', 'Weder heute noch Lernen wird vorgeschlagen.'], ['Morgen einen Film drehen.', '見る bedeutet ansehen.'], ['Heute allein ins Kino gehen.', 'Die Einladung gilt morgen und beiden.']],
['Wann beginnt der Film?', 1, ['Um 19 Uhr.', '七時から bezeichnet den Beginn.'], ['Um 18 Uhr.', '六時 ist die Zeit zum Losgehen.'], ['Um 20 Uhr.', '八時 wird nicht genannt.'], ['Um 17 Uhr.', '五時 wird nicht genannt.']],
['Wo sollte B um 18 Uhr sein?', 2, ['Bei A zu Hause.', 'B sagt あなたのうちへ行きます.'], ['Schon im Kino.', 'Als Treffpunkt wird As Zuhause vereinbart.'], ['Bei B zu Hause.', 'あなた verweist auf A.'], ['Am Bahnhof.', 'Ein Bahnhof wird nicht genannt.']]
]);
add('listening', 'Die rote Tasche', 'Besitz und Standort aus Sprecherwechseln erschließen.',
['A: この{赤|あか}いかばんは、あなたのですか。\nB: いいえ、わたしのは{青|あお}いです。', 'A: じゃあ、だれのですか。\nB: たなかさんのです。たなかさんは、いまトイレです。', 'A: そうですか。ここで{待|ま}ちます。かばんをわたしたいです。'],
'A: Ist diese rote Tasche deine? B: Nein, meine ist blau. A: Wem gehört sie dann? B: Tanaka. Tanaka ist gerade auf der Toilette. A: Ach so. Ich warte hier. Ich möchte die Tasche übergeben.',
[['だれの', 'wessen'], ['わたしたい', 'übergeben möchten']], 'わたしのはlässt das Wort かばん: „meine [Tasche]“. Die rote Tasche gehört also nicht B.', [
['Worum geht es im Gespräch?', 0, ['Herausfinden, wem eine Tasche gehört.', 'A fragt nach dem Besitzer der roten Tasche.'], ['Eine neue Tasche aussuchen.', 'Es geht um eine vorhandene Tasche.'], ['Die blaue Tasche von B zurückgeben.', 'Gesucht wird der Besitzer der roten Tasche.'], ['Eine rote Tasche für B aussuchen.', 'Bs eigene Tasche ist blau; ein Kauf wird nicht vorgeschlagen.']],
['Wem gehört die rote Tasche?', 1, ['Tanaka.', 'B antwortet たなかさんのです.'], ['A.', 'A fragt nach dem Besitzer.'], ['B.', 'B hat eine blaue Tasche.'], ['Niemandem.', 'Ein Besitzer wird genannt.']],
['Warum bleibt A hier?', 2, ['Um Tanaka die Tasche zu geben.', 'A will warten und die Tasche übergeben.'], ['Um die Tasche zu kaufen.', 'Ein Kauf ist nicht vorgesehen.'], ['Um eine blaue Tasche zu suchen.', 'A hat die rote Tasche.'], ['Um B zur Toilette zu bringen.', 'B wird nicht zur Toilette begleitet.']]
]);
add('listening', 'Vor dem Kochen', 'Aus vorhandenen Zutaten den nächsten Einkauf ableiten.',
['A: きょうはカレーを{作|つく}りましょう。にくはありますか。\nB: はい、れいぞうこにあります。', 'A: じゃがいもは？\nB: ありません。でも、にんじんはあります。', 'A: じゃあ、わたしがスーパーへ{行|い}きます。\nB: おねがいします。わたしはごはんを{作|つく}ります。'],
'A: Machen wir heute Curry. Haben wir Fleisch? B: Ja, im Kühlschrank. A: Und Kartoffeln? B: Haben wir nicht. Aber Karotten sind da. A: Dann gehe ich zum Supermarkt. B: Danke. Ich bereite den Reis zu.',
[['じゃがいも', 'Kartoffel'], ['にんじん', 'Karotte']], 'あります und ありません unterscheiden sich nur am Ende. Notiere bei Zutaten jeweils „da“ oder „fehlt“.', [
['Was planen die beiden?', 0, ['Curry kochen.', 'カレーを作りましょう schlägt gemeinsames Kochen vor.'], ['Im Supermarkt essen.', 'Der Supermarkt dient dem Einkauf.'], ['Fertiges Curry im Supermarkt kaufen.', '作りましょう schlägt eigenes Kochen vor.'], ['Zusammen alle Zutaten einkaufen gehen.', 'Nur A geht einkaufen, während B den Reis vorbereitet.']],
['Welche Zutat fehlt?', 1, ['Kartoffeln.', 'Auf じゃがいも folgt ありません.'], ['Karotten.', 'にんじんはあります sagt, dass sie da sind.'], ['Fleisch.', 'Das Fleisch ist im Kühlschrank.'], ['Reis ist ausdrücklich ausverkauft.', 'Über einen Ausverkauf wird nichts gesagt.']],
['Was wird A wahrscheinlich einkaufen?', 2, ['Kartoffeln, während B Reis zubereitet.', 'A geht nach der Feststellung fehlender Kartoffeln einkaufen; B kocht Reis.'], ['Fleisch, während B schläft.', 'Fleisch ist da; B bereitet Reis zu.'], ['Karotten für B im Restaurant.', 'Karotten sind da; kein Restaurant wird genannt.'], ['Fertigen Reis, während B einkauft.', 'Das vertauscht die vereinbarte Aufgabenverteilung.']]
]);
require('./n5-expansion.cjs')(add);
};
