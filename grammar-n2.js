(function() {
  var n2Grammar = [
    // ============================================================
    // PARTIKEL (28)
    // ============================================================
    {
      id: "n2-ni-kanshite",
      pattern: "～に関して",
      level: "N2",
      category: "Partikel",
      meaning: "bezüglich, in Bezug auf",
      explanation: "に関して wird verwendet, um ein Thema oder einen Gegenstand anzugeben, über den gesprochen wird. Es ist formeller als について und wird häufig in schriftlicher Sprache, Nachrichten und offiziellen Dokumenten verwendet.",
      formation: "Nomen + に関して / に関する + Nomen",
      examples: [
        { japanese: "この問題に関して、詳しく説明します。", romaji: "Kono mondai ni kanshite, kuwashiku setsumei shimasu.", german: "Bezüglich dieses Problems werde ich ausführlich erklären." },
        { japanese: "環境問題に関する本を読んだ。", romaji: "Kankyō mondai ni kansuru hon wo yonda.", german: "Ich habe ein Buch über Umweltprobleme gelesen." }
      ],
      notes: "に関する ist die attributive Form vor Nomen. Formeller als について.",
      related: ["n3-ni-tsuite"]
    },
    {
      id: "n2-ni-taishite",
      pattern: "～に対して",
      level: "N2",
      category: "Partikel",
      meaning: "gegenüber, im Gegensatz zu",
      explanation: "に対して hat zwei Hauptbedeutungen: 1) gegenüber jemandem/etwas (Zielrichtung einer Handlung oder Einstellung), 2) im Gegensatz zu (Kontrast zwischen zwei Dingen).",
      formation: "Nomen + に対して / に対する + Nomen",
      examples: [
        { japanese: "先生は学生に対して厳しい。", romaji: "Sensei wa gakusei ni taishite kibishii.", german: "Der Lehrer ist streng gegenüber den Schülern." },
        { japanese: "兄がスポーツ好きなのに対して、弟は読書が好きだ。", romaji: "Ani ga supōtsu zuki na no ni taishite, otōto wa dokusho ga suki da.", german: "Während der ältere Bruder Sport mag, liest der jüngere Bruder gerne." }
      ],
      notes: "Bei Kontrast-Bedeutung oft mit のに対して verwendet.",
      related: ["n2-ni-kanshite"]
    },
    {
      id: "n2-ni-oite",
      pattern: "～において",
      level: "N2",
      category: "Partikel",
      meaning: "in, bei, an (formal)",
      explanation: "において ist die formelle Version von で und gibt einen Ort, Zeitpunkt oder Bereich an, in dem etwas stattfindet. Wird hauptsächlich in formellen Texten, Reden und offiziellen Dokumenten verwendet.",
      formation: "Nomen + において / における + Nomen",
      examples: [
        { japanese: "会議は東京において行われた。", romaji: "Kaigi wa Tōkyō ni oite okonawareta.", german: "Die Konferenz wurde in Tokio abgehalten." },
        { japanese: "現代における最大の課題は環境問題だ。", romaji: "Gendai ni okeru saidai no kadai wa kankyō mondai da.", german: "Die größte Herausforderung der Gegenwart ist das Umweltproblem." }
      ],
      notes: "における ist die attributive Form vor Nomen. Ersetzt で in formellen Kontexten.",
      related: []
    },
    {
      id: "n2-ni-watatte",
      pattern: "～にわたって",
      level: "N2",
      category: "Partikel",
      meaning: "über ... hinweg, sich erstreckend über",
      explanation: "にわたって drückt aus, dass etwas sich über einen bestimmten Zeitraum, Bereich oder Umfang erstreckt. Betont die Ausdehnung oder Dauer.",
      formation: "Nomen + にわたって / にわたる + Nomen",
      examples: [
        { japanese: "三日間にわたって会議が行われた。", romaji: "Mikkakan ni watatte kaigi ga okonawareta.", german: "Die Konferenz erstreckte sich über drei Tage." },
        { japanese: "広い範囲にわたる被害が出た。", romaji: "Hiroi han'i ni wataru higai ga deta.", german: "Es gab Schäden über ein weites Gebiet hinweg." }
      ],
      notes: "Oft mit Zeitangaben oder Flächenangaben verwendet.",
      related: ["n2-wo-tsujite"]
    },
    {
      id: "n2-wo-hajime",
      pattern: "～をはじめ",
      level: "N2",
      category: "Partikel",
      meaning: "angefangen mit, einschließlich",
      explanation: "をはじめ nennt ein repräsentatives Beispiel und impliziert, dass es noch weitere gibt. Es hebt das wichtigste oder bekannteste Beispiel hervor.",
      formation: "Nomen + をはじめ(として)",
      examples: [
        { japanese: "日本をはじめ、多くのアジアの国が参加した。", romaji: "Nihon wo hajime, ōku no Ajia no kuni ga sanka shita.", german: "Angefangen mit Japan haben viele asiatische Länder teilgenommen." },
        { japanese: "東京をはじめとする大都市では家賃が高い。", romaji: "Tōkyō wo hajime to suru daitoshi dewa yachin ga takai.", german: "In Großstädten wie Tokyo sind die Mieten hoch." }
      ],
      notes: "",
      related: []
    },
    {
      id: "n2-wo-moto-ni",
      pattern: "～をもとに",
      level: "N2",
      category: "Partikel",
      meaning: "basierend auf, auf Grundlage von",
      explanation: "をもとに drückt aus, dass etwas als Grundlage, Quelle oder Ausgangspunkt für etwas anderes dient. Häufig bei kreativen Werken oder Entscheidungen verwendet.",
      formation: "Nomen + をもとに(して) / をもとにした + Nomen",
      examples: [
        { japanese: "この映画は実話をもとに作られた。", romaji: "Kono eiga wa jitsuwa wo moto ni tsukurareta.", german: "Dieser Film wurde basierend auf einer wahren Geschichte gemacht." },
        { japanese: "アンケートの結果をもとに改善策を考えた。", romaji: "Ankēto no kekka wo moto ni kaizen-saku wo kangaeta.", german: "Basierend auf den Umfrageergebnissen haben wir Verbesserungsmaßnahmen überlegt." }
      ],
      notes: "Ähnlich wie に基づいて, aber をもとに ist etwas lockerer.",
      related: ["n2-ni-motozuite"]
    },
    {
      id: "n2-wo-tsujite",
      pattern: "～を通じて",
      level: "N2",
      category: "Partikel",
      meaning: "durch, über ... hindurch, während",
      explanation: "を通じて hat zwei Bedeutungen: 1) durch ein Mittel oder eine Person (Vermittlung), 2) während eines gesamten Zeitraums (durchgehend).",
      formation: "Nomen + を通じて / を通して",
      examples: [
        { japanese: "インターネットを通じて世界中の人と交流できる。", romaji: "Intānetto wo tsūjite sekaijū no hito to kōryū dekiru.", german: "Durch das Internet kann man mit Menschen auf der ganzen Welt kommunizieren." },
        { japanese: "一年を通じて温暖な気候だ。", romaji: "Ichinen wo tsūjite ondan na kikō da.", german: "Das Klima ist das ganze Jahr über mild." }
      ],
      notes: "を通して ist eine alternative Form mit gleicher Bedeutung.",
      related: ["n2-ni-watatte"]
    },
    {
      id: "n2-wo-chushin-ni",
      pattern: "～を中心に",
      level: "N2",
      category: "Partikel",
      meaning: "mit ... im Mittelpunkt, zentriert um",
      explanation: "を中心に drückt aus, dass etwas den Mittelpunkt oder Schwerpunkt bildet. Kann sich auf Orte, Personen oder Themen beziehen.",
      formation: "Nomen + を中心に(して) / を中心とした + Nomen",
      examples: [
        { japanese: "駅を中心に商店街が広がっている。", romaji: "Eki wo chūshin ni shōtengai ga hirogatte iru.", german: "Um den Bahnhof herum erstreckt sich eine Einkaufsstraße." },
        { japanese: "若者を中心に人気が広がった。", romaji: "Wakamono wo chūshin ni ninki ga hirogatta.", german: "Die Beliebtheit verbreitete sich vor allem unter jungen Leuten." }
      ],
      notes: "",
      related: []
    },
    {
      id: "n2-ni-motozuite",
      pattern: "～に基づいて",
      level: "N2",
      category: "Partikel",
      meaning: "basierend auf, auf Grundlage von",
      explanation: "に基づいて drückt aus, dass eine Handlung oder Entscheidung auf einer bestimmten Grundlage, Regel oder einem Prinzip basiert. Formeller als をもとに.",
      formation: "Nomen + に基づいて / に基づく + Nomen",
      examples: [
        { japanese: "法律に基づいて判断する。", romaji: "Hōritsu ni motozuite handan suru.", german: "Auf Grundlage des Gesetzes urteilen." },
        { japanese: "事実に基づいた報告書を作成した。", romaji: "Jijitsu ni motozuita hōkokusho wo sakusei shita.", german: "Wir haben einen auf Fakten basierenden Bericht erstellt." }
      ],
      notes: "Formeller und strenger als をもとに. Oft bei Regeln, Gesetzen, Daten.",
      related: ["n2-wo-moto-ni"]
    },
    {
      id: "n2-ni-tomonatte",
      pattern: "～に伴って",
      level: "N2",
      category: "Partikel",
      meaning: "begleitend, zusammen mit, mit ... einhergehend",
      explanation: "に伴って drückt aus, dass eine Veränderung oder ein Ereignis eine andere Veränderung mit sich bringt. Zwei Dinge geschehen parallel oder als Folge.",
      formation: "Nomen / Verb-Grundform + に伴って / に伴い / に伴う + Nomen",
      examples: [
        { japanese: "人口の増加に伴って、住宅問題が深刻になった。", romaji: "Jinkō no zōka ni tomonatte, jūtaku mondai ga shinkoku ni natta.", german: "Mit dem Bevölkerungswachstum wurde das Wohnungsproblem ernst." },
        { japanese: "経済発展に伴う環境破壊が問題だ。", romaji: "Keizai hatten ni tomonau kankyō hakai ga mondai da.", german: "Die mit der wirtschaftlichen Entwicklung einhergehende Umweltzerstörung ist ein Problem." }
      ],
      notes: "",
      related: ["n2-ni-tsurete"]
    },
    {
      id: "n2-ni-kakete",
      pattern: "～にかけて",
      level: "N2",
      category: "Partikel",
      meaning: "von ... bis, bis ... hin",
      explanation: "にかけて gibt einen Zeitraum oder eine Strecke an, die sich von einem Punkt bis zu einem anderen erstreckt. Wird oft mit から zusammen verwendet.",
      formation: "Nomen + から + Nomen + にかけて",
      examples: [
        { japanese: "今夜から明日にかけて大雨が降るでしょう。", romaji: "Kon'ya kara ashita ni kakete ōame ga furu deshō.", german: "Von heute Nacht bis morgen wird es wahrscheinlich stark regnen." },
        { japanese: "関東から東北にかけて地震があった。", romaji: "Kantō kara Tōhoku ni kakete jishin ga atta.", german: "Von Kantō bis Tōhoku gab es ein Erdbeben." }
      ],
      notes: "Beschreibt einen ungefähren Bereich, nicht exakt abgegrenzt.",
      related: ["n2-ni-watatte"]
    },
    {
      id: "n2-ni-sotte",
      pattern: "～に沿って",
      level: "N2",
      category: "Partikel",
      meaning: "entlang, gemäß, entsprechend",
      explanation: "に沿って hat zwei Bedeutungen: 1) physisch entlang (eines Flusses, einer Straße), 2) übertragen gemäß (einem Plan, einer Regel).",
      formation: "Nomen + に沿って / に沿った + Nomen",
      examples: [
        { japanese: "川に沿って歩いた。", romaji: "Kawa ni sotte aruita.", german: "Ich ging den Fluss entlang." },
        { japanese: "計画に沿って進めてください。", romaji: "Keikaku ni sotte susumete kudasai.", german: "Bitte fahren Sie gemäß dem Plan fort." }
      ],
      notes: "",
      related: ["n2-ni-shitagatte"]
    },
    {
      id: "n2-ni-ojite",
      pattern: "～に応じて",
      level: "N2",
      category: "Partikel",
      meaning: "je nach, entsprechend, in Reaktion auf",
      explanation: "に応じて drückt aus, dass sich etwas je nach Situation, Bedingung oder Anforderung anpasst oder verändert.",
      formation: "Nomen + に応じて / に応じた + Nomen",
      examples: [
        { japanese: "能力に応じて給料が決まる。", romaji: "Nōryoku ni ōjite kyūryō ga kimaru.", german: "Das Gehalt wird entsprechend der Fähigkeiten festgelegt." },
        { japanese: "お客様のご要望に応じて対応いたします。", romaji: "Okyakusama no goyōbō ni ōjite taiō itashimasu.", german: "Wir reagieren entsprechend den Wünschen der Kunden." }
      ],
      notes: "",
      related: ["n2-ni-shitagatte"]
    },
    {
      id: "n2-ni-tsurete",
      pattern: "～につれて",
      level: "N2",
      category: "Partikel",
      meaning: "je mehr ... desto, mit zunehmender ...",
      explanation: "につれて drückt aus, dass sich eine Sache proportional zu einer anderen verändert. Wenn A sich ändert, ändert sich B entsprechend mit.",
      formation: "Verb-Grundform / Nomen + につれて",
      examples: [
        { japanese: "年を取るにつれて、体力が落ちてきた。", romaji: "Toshi wo toru ni tsurete, tairyoku ga ochite kita.", german: "Je älter ich werde, desto mehr lässt meine Körperkraft nach." },
        { japanese: "日本語を勉強するにつれて、日本の文化にも興味が出てきた。", romaji: "Nihongo wo benkyō suru ni tsurete, Nihon no bunka ni mo kyōmi ga dete kita.", german: "Je mehr ich Japanisch lerne, desto mehr interessiere ich mich auch für die japanische Kultur." }
      ],
      notes: "Ähnlich wie に従って, aber につれて betont natürliche/graduelle Veränderung.",
      related: ["n2-ni-shitagatte", "n2-ni-tomonatte"]
    },
    {
      id: "n2-ni-shitagatte",
      pattern: "～に従って",
      level: "N2",
      category: "Partikel",
      meaning: "gemäß, entsprechend / je mehr ... desto",
      explanation: "に従って hat zwei Bedeutungen: 1) gemäß einer Anweisung oder Regel handeln, 2) proportionale Veränderung (je mehr A, desto mehr B).",
      formation: "Nomen / Verb-Grundform + に従って / に従い",
      examples: [
        { japanese: "先生の指示に従って行動してください。", romaji: "Sensei no shiji ni shitagatte kōdō shite kudasai.", german: "Bitte handeln Sie gemäß den Anweisungen des Lehrers." },
        { japanese: "高度が上がるに従って、気温が下がる。", romaji: "Kōdo ga agaru ni shitagatte, kion ga sagaru.", german: "Je höher die Höhe steigt, desto mehr sinkt die Temperatur." }
      ],
      notes: "Bei Bedeutung 1 ist es formeller als 通りに.",
      related: ["n2-ni-tsurete", "n2-ni-sotte"]
    },
    {
      id: "n2-ni-hanshite",
      pattern: "～に反して",
      level: "N2",
      category: "Partikel",
      meaning: "entgegen, im Widerspruch zu",
      explanation: "に反して drückt aus, dass etwas dem Erwarteten, Geplanten oder einer Regel widerspricht. Das Ergebnis ist anders als erwartet.",
      formation: "Nomen + に反して / に反する + Nomen / に反した + Nomen",
      examples: [
        { japanese: "予想に反して、試合に勝った。", romaji: "Yosō ni hanshite, shiai ni katta.", german: "Entgegen der Erwartung haben wir das Spiel gewonnen." },
        { japanese: "親の期待に反する行動を取った。", romaji: "Oya no kitai ni hansuru kōdō wo totta.", german: "Er handelte entgegen den Erwartungen seiner Eltern." }
      ],
      notes: "",
      related: []
    },
    {
      id: "n2-ni-sakidatte",
      pattern: "～に先立って",
      level: "N2",
      category: "Partikel",
      meaning: "vor, im Vorfeld von, bevor",
      explanation: "に先立って drückt aus, dass etwas vor einem wichtigen Ereignis als Vorbereitung oder Einleitung geschieht. Formell.",
      formation: "Nomen / Verb-Grundform + に先立って / に先立ち / に先立つ + Nomen",
      examples: [
        { japanese: "開会式に先立って、リハーサルが行われた。", romaji: "Kaikai-shiki ni sakidatte, rihāsaru ga okonawareta.", german: "Im Vorfeld der Eröffnungszeremonie wurde eine Probe durchgeführt." },
        { japanese: "発売に先立ち、サンプルを配布した。", romaji: "Hatsubai ni sakidachi, sanpuru wo haifu shita.", german: "Vor dem Verkaufsstart wurden Muster verteilt." }
      ],
      notes: "Sehr formell, häufig in Nachrichten und offiziellen Ankündigungen.",
      related: []
    },
    {
      id: "n2-ni-kawatte",
      pattern: "～にかわって",
      level: "N2",
      category: "Partikel",
      meaning: "anstelle von, im Namen von, anstatt",
      explanation: "にかわって drückt aus, dass jemand oder etwas die Rolle oder Funktion von jemand/etwas anderem übernimmt.",
      formation: "Nomen + にかわって / にかわり / にかわる + Nomen",
      examples: [
        { japanese: "社長にかわって、副社長が挨拶した。", romaji: "Shachō ni kawatte, fuku-shachō ga aisatsu shita.", german: "Anstelle des Präsidenten hielt der Vizepräsident die Begrüßung." },
        { japanese: "手紙にかわって、メールが主な連絡手段になった。", romaji: "Tegami ni kawatte, mēru ga omo na renraku shudan ni natta.", german: "Anstelle von Briefen ist E-Mail zum Hauptkommunikationsmittel geworden." }
      ],
      notes: "",
      related: ["n2-kawari-ni"]
    },
    {
      id: "n2-ni-kagitte",
      pattern: "～に限って",
      level: "N2",
      category: "Partikel",
      meaning: "ausgerechnet, nur bei",
      explanation: "に限って drückt Überraschung oder Frustration aus, dass etwas Unerwartetes gerade bei einer bestimmten Person oder in einer bestimmten Situation passiert.",
      formation: "Nomen + に限って",
      examples: [
        { japanese: "傘を持っていない日に限って雨が降る。", romaji: "Kasa wo motte inai hi ni kagitte ame ga furu.", german: "Ausgerechnet an Tagen, an denen ich keinen Schirm dabei habe, regnet es." },
        { japanese: "うちの子に限ってそんなことはしない。", romaji: "Uchi no ko ni kagitte sonna koto wa shinai.", german: "Ausgerechnet mein Kind würde so etwas nicht tun." }
      ],
      notes: "Oft mit negativer Überraschung oder Ironie verwendet.",
      related: ["n2-ni-kagirazu"]
    },
    {
      id: "n2-ni-kagirazu",
      pattern: "～に限らず",
      level: "N2",
      category: "Partikel",
      meaning: "nicht beschränkt auf, nicht nur",
      explanation: "に限らず drückt aus, dass etwas nicht nur für eine bestimmte Sache gilt, sondern auch für andere. Weiter gefasst als だけでなく.",
      formation: "Nomen + に限らず",
      examples: [
        { japanese: "この問題は日本に限らず、世界中で起きている。", romaji: "Kono mondai wa Nihon ni kagirazu, sekaijū de okite iru.", german: "Dieses Problem ist nicht auf Japan beschränkt, es tritt weltweit auf." },
        { japanese: "男性に限らず女性も参加できる。", romaji: "Dansei ni kagirazu josei mo sanka dekiru.", german: "Nicht nur Männer, auch Frauen können teilnehmen." }
      ],
      notes: "",
      related: ["n2-ni-kagitte", "n2-wo-towazu"]
    },
    {
      id: "n2-wo-towazu",
      pattern: "～を問わず",
      level: "N2",
      category: "Partikel",
      meaning: "ungeachtet, unabhängig von",
      explanation: "を問わず drückt aus, dass etwas unabhängig von einem bestimmten Faktor gilt. Egal welche Bedingung - das Ergebnis ist das gleiche.",
      formation: "Nomen + を問わず",
      examples: [
        { japanese: "年齢を問わず、誰でも参加できる。", romaji: "Nenrei wo towazu, dare demo sanka dekiru.", german: "Unabhängig vom Alter kann jeder teilnehmen." },
        { japanese: "経験の有無を問わず募集しています。", romaji: "Keiken no umu wo towazu boshū shite imasu.", german: "Wir rekrutieren unabhängig davon, ob Erfahrung vorhanden ist oder nicht." }
      ],
      notes: "Oft mit Gegensatzpaaren: 男女を問わず, 昼夜を問わず.",
      related: ["n2-ni-kagirazu"]
    },
    {
      id: "n2-wo-megutte",
      pattern: "～をめぐって",
      level: "N2",
      category: "Partikel",
      meaning: "um ... herum, bezüglich (Streit/Diskussion)",
      explanation: "をめぐって wird verwendet, wenn es eine Diskussion, einen Streit oder verschiedene Meinungen zu einem Thema gibt.",
      formation: "Nomen + をめぐって / をめぐる + Nomen",
      examples: [
        { japanese: "土地の所有権をめぐって争いが起きた。", romaji: "Tochi no shoyūken wo megutte arasoi ga okita.", german: "Um das Eigentumsrecht des Grundstücks entbrannte ein Streit." },
        { japanese: "この問題をめぐる議論は続いている。", romaji: "Kono mondai wo meguru giron wa tsuzuite iru.", german: "Die Diskussion um dieses Problem dauert an." }
      ],
      notes: "Impliziert immer Meinungsverschiedenheiten oder Konflikte.",
      related: ["n2-ni-kanshite"]
    },
    {
      id: "n2-ni-atatte",
      pattern: "～にあたって",
      level: "N2",
      category: "Partikel",
      meaning: "anlässlich, bei Gelegenheit von",
      explanation: "にあたって wird verwendet, um ein wichtiges Ereignis oder einen besonderen Anlass einzuleiten, bei dem besondere Maßnahmen getroffen oder Worte gesprochen werden.",
      formation: "Nomen / Verb-Grundform + にあたって / にあたり / にあたっての + Nomen",
      examples: [
        { japanese: "新年にあたって、目標を立てた。", romaji: "Shinnen ni atatte, mokuhyō wo tateta.", german: "Anlässlich des neuen Jahres habe ich Ziele gesetzt." },
        { japanese: "出発にあたり、皆様にお礼を申し上げます。", romaji: "Shuppatsu ni atari, minasama ni orei wo mōshiagemasu.", german: "Anlässlich der Abreise möchte ich allen meinen Dank aussprechen." }
      ],
      notes: "Formell, häufig in Reden und offiziellen Anlässen.",
      related: ["n2-ni-sakidatte", "n2-sai-ni"]
    },
    {
      id: "n2-ni-kuwaete",
      pattern: "～に加えて",
      level: "N2",
      category: "Partikel",
      meaning: "zusätzlich zu, außerdem",
      explanation: "に加えて drückt aus, dass zu einer bestehenden Sache noch etwas Weiteres hinzukommt. Betont die Addition.",
      formation: "Nomen + に加えて / に加え",
      examples: [
        { japanese: "日本語に加えて、中国語も勉強している。", romaji: "Nihongo ni kuwaete, Chūgokugo mo benkyō shite iru.", german: "Zusätzlich zu Japanisch lerne ich auch Chinesisch." },
        { japanese: "雨に加え、強い風も吹いている。", romaji: "Ame ni kuwae, tsuyoi kaze mo fuite iru.", german: "Zusätzlich zum Regen weht auch starker Wind." }
      ],
      notes: "",
      related: ["n2-ue-ni"]
    },
    {
      id: "n2-wo-kikkake-ni",
      pattern: "～をきっかけに",
      level: "N2",
      category: "Partikel",
      meaning: "ausgelöst durch, als Anlass nehmend",
      explanation: "をきっかけに beschreibt ein Ereignis, das den Anstoß oder Auslöser für eine darauffolgende Veränderung oder Handlung war.",
      formation: "Nomen / Verb-た形 + の + をきっかけに(して)",
      examples: [
        { japanese: "留学をきっかけに、日本語を勉強し始めた。", romaji: "Ryūgaku wo kikkake ni, Nihongo wo benkyō shihajimeta.", german: "Ausgelöst durch das Auslandsstudium begann ich Japanisch zu lernen." },
        { japanese: "病気をきっかけに生活習慣を変えた。", romaji: "Byōki wo kikkake ni seikatsu shūkan wo kaeta.", german: "Durch die Krankheit als Anlass habe ich meine Lebensgewohnheiten geändert." }
      ],
      notes: "",
      related: ["n2-wo-keiki-ni"]
    },
    {
      id: "n2-no-moto-de",
      pattern: "～のもとで",
      level: "N2",
      category: "Partikel",
      meaning: "unter (Leitung/Bedingungen/Einfluss)",
      explanation: "のもとで drückt aus, dass etwas unter bestimmten Bedingungen, unter jemandes Leitung oder Einfluss geschieht.",
      formation: "Nomen + のもとで / のもとに",
      examples: [
        { japanese: "有名な教授のもとで研究を行った。", romaji: "Yūmei na kyōju no moto de kenkyū wo okonatta.", german: "Unter einem berühmten Professor führte ich Forschung durch." },
        { japanese: "厳しい条件のもとで働いている。", romaji: "Kibishii jōken no moto de hataraite iru.", german: "Ich arbeite unter strengen Bedingungen." }
      ],
      notes: "",
      related: []
    },
    {
      id: "n2-wo-komete",
      pattern: "～を込めて",
      level: "N2",
      category: "Partikel",
      meaning: "mit (Gefühl) erfüllt, voller",
      explanation: "を込めて drückt aus, dass eine Handlung mit einem bestimmten Gefühl oder einer Absicht durchgeführt wird.",
      formation: "Nomen + を込めて",
      examples: [
        { japanese: "感謝の気持ちを込めて手紙を書いた。", romaji: "Kansha no kimochi wo komete tegami wo kaita.", german: "Ich schrieb den Brief voller Dankbarkeit." },
        { japanese: "心を込めて料理を作った。", romaji: "Kokoro wo komete ryōri wo tsukutta.", german: "Ich kochte mit ganzem Herzen." }
      ],
      notes: "Häufige Kombinationen: 心を込めて, 愛を込めて, 感謝を込めて.",
      related: []
    },
    {
      id: "n2-nuki-de",
      pattern: "～抜きで",
      level: "N2",
      category: "Partikel",
      meaning: "ohne, ausgenommen",
      explanation: "抜きで drückt aus, dass etwas weggelassen oder ausgeschlossen wird. Etwas findet ohne einen bestimmten Bestandteil statt.",
      formation: "Nomen + 抜きで / 抜きに / 抜きの + Nomen",
      examples: [
        { japanese: "冗談抜きで話しましょう。", romaji: "Jōdan nuki de hanashimashō.", german: "Lass uns ohne Spaß reden (ernsthaft)." },
        { japanese: "朝食抜きで出かけた。", romaji: "Chōshoku nuki de dekaketa.", german: "Ich ging ohne Frühstück aus dem Haus." }
      ],
      notes: "を抜きにして ist eine alternative Form.",
      related: ["n2-nuki-ni-shite"]
    },
    // ============================================================
    // SATZSTRUKTUREN (75)
    // ============================================================
    {
      id: "n2-shidai",
      pattern: "～次第",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "sobald, je nach",
      explanation: "次第 hat zwei Bedeutungen: 1) Mit Verb-ます-Stamm: sobald etwas geschieht (sofortige Folgehandlung). 2) Mit Nomen: je nach, abhängig von.",
      formation: "Verb-ます-Stamm + 次第 (sobald) / Nomen + 次第で (je nach)",
      examples: [
        { japanese: "届き次第、ご連絡します。", romaji: "Todoki shidai, go-renraku shimasu.", german: "Sobald es ankommt, werde ich Sie kontaktieren." },
        { japanese: "結果はあなたの努力次第だ。", romaji: "Kekka wa anata no doryoku shidai da.", german: "Das Ergebnis hängt von deiner Anstrengung ab." }
      ],
      notes: "Verb+次第 = sobald; Nomen+次第 = abhängig von.",
      related: []
    },
    {
      id: "n2-ue-de",
      pattern: "～上で",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "nachdem, beim, hinsichtlich",
      explanation: "上で hat zwei Bedeutungen: 1) Mit Verb-た形: nachdem man etwas getan hat (dann erst). 2) Mit Nomen/Verb: in Bezug auf, beim (in einem bestimmten Kontext).",
      formation: "Verb-た形 + 上で / Nomen + の上で / Verb-Grundform + 上で",
      examples: [
        { japanese: "よく考えた上で返事をします。", romaji: "Yoku kangaeta ue de henji wo shimasu.", german: "Ich werde antworten, nachdem ich gut darüber nachgedacht habe." },
        { japanese: "仕事の上で大切なのはコミュニケーションだ。", romaji: "Shigoto no ue de taisetsu na no wa komyunikēshon da.", german: "Was bei der Arbeit wichtig ist, ist Kommunikation." }
      ],
      notes: "",
      related: ["n2-ue-ni", "n2-ue-wa"]
    },
    {
      id: "n2-ue-ni",
      pattern: "～上に",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "zusätzlich zu, obendrein, darüber hinaus",
      explanation: "上に drückt aus, dass zu einer bestehenden Eigenschaft oder Situation noch etwas Weiteres hinzukommt. Oft in positiver oder negativer Häufung.",
      formation: "Verb/い-Adj + 上に / な-Adj + な上に / Nomen + の上に / である上に",
      examples: [
        { japanese: "この店は安い上に、おいしい。", romaji: "Kono mise wa yasui ue ni, oishii.", german: "Dieses Restaurant ist günstig und obendrein lecker." },
        { japanese: "雨が降った上に、風も強くなった。", romaji: "Ame ga futta ue ni, kaze mo tsuyoku natta.", german: "Es regnete, und obendrein wurde der Wind stärker." }
      ],
      notes: "Ähnlich wie し, aber formeller. Verstärkt die Aufzählung.",
      related: ["n2-ue-de", "n2-ni-kuwaete"]
    },
    {
      id: "n2-ue-wa",
      pattern: "～上は",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "da nun einmal, wenn schon ... dann",
      explanation: "上は drückt aus, dass man angesichts einer bestehenden Tatsache oder Entscheidung konsequent handeln sollte. Impliziert Entschlossenheit.",
      formation: "Verb-た形 / Verb-Grundform + 上は",
      examples: [
        { japanese: "引き受けた上は、最後までやるつもりだ。", romaji: "Hikiuketa ue wa, saigo made yaru tsumori da.", german: "Da ich es nun einmal übernommen habe, beabsichtige ich, es bis zum Ende durchzuziehen." },
        { japanese: "約束した上は、守らなければならない。", romaji: "Yakusoku shita ue wa, mamoranakereba naranai.", german: "Wenn man schon ein Versprechen gegeben hat, muss man es halten." }
      ],
      notes: "Ähnlich wie からには und 以上は.",
      related: ["n2-kara-niwa", "n2-ijou-wa"]
    },
    {
      id: "n2-sai-ni",
      pattern: "～際に",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "bei Gelegenheit von, wenn, anlässlich",
      explanation: "際に ist die formelle Version von 時に und wird verwendet, um den Zeitpunkt oder die Gelegenheit einer Handlung anzugeben.",
      formation: "Verb-Grundform / Verb-た形 / Nomen + の + 際に / 際は",
      examples: [
        { japanese: "お帰りの際は、忘れ物にご注意ください。", romaji: "Okaeri no sai wa, wasuremono ni go-chūi kudasai.", german: "Bitte achten Sie beim Verlassen auf vergessene Gegenstände." },
        { japanese: "申し込みの際に、身分証明書が必要です。", romaji: "Mōshikomi no sai ni, mibun shōmeisho ga hitsuyō desu.", german: "Bei der Anmeldung ist ein Ausweis erforderlich." }
      ],
      notes: "Formeller als 時に. Häufig in Ankündigungen und Hinweisen.",
      related: ["n2-ni-atatte"]
    },
    {
      id: "n2-sue-ni",
      pattern: "～末に",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "nach langem, am Ende von, schließlich",
      explanation: "末に drückt aus, dass nach einem langen Prozess, viel Mühe oder Überlegung schließlich ein Ergebnis erreicht wurde.",
      formation: "Verb-た形 + 末(に) / Nomen + の末(に)",
      examples: [
        { japanese: "長い話し合いの末に、合意に達した。", romaji: "Nagai hanashiai no sue ni, gōi ni tasshita.", german: "Nach langen Verhandlungen wurde eine Einigung erzielt." },
        { japanese: "悩んだ末に、転職を決めた。", romaji: "Nayanda sue ni, tenshoku wo kimeta.", german: "Nach langem Grübeln habe ich mich für einen Jobwechsel entschieden." }
      ],
      notes: "Betont den langen, mühsamen Prozess vor dem Ergebnis.",
      related: []
    },
    {
      id: "n2-saichu-ni",
      pattern: "～最中に",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "mitten in, gerade als",
      explanation: "最中に drückt aus, dass gerade mitten in einer Handlung etwas Unerwartetes passiert. Betont den Höhepunkt oder die Intensität der Handlung.",
      formation: "Verb-ている + 最中に / Nomen + の最中に",
      examples: [
        { japanese: "食事の最中に電話が鳴った。", romaji: "Shokuji no saichū ni denwa ga natta.", german: "Mitten beim Essen klingelte das Telefon." },
        { japanese: "勉強している最中に停電になった。", romaji: "Benkyō shite iru saichū ni teiden ni natta.", german: "Mitten beim Lernen gab es einen Stromausfall." }
      ],
      notes: "Das unterbrechende Ereignis ist meist unerwartet oder störend.",
      related: []
    },
    {
      id: "n2-ippou-de",
      pattern: "～一方で",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "andererseits, während, einerseits ... andererseits",
      explanation: "一方で stellt zwei kontrastierende Aspekte oder gleichzeitig existierende Sachverhalte gegenüber.",
      formation: "Verb-Grundform / い-Adj + 一方で / Nomen + の一方で / な-Adj + な一方で",
      examples: [
        { japanese: "便利になった一方で、新しい問題も生まれた。", romaji: "Benri ni natta ippō de, atarashii mondai mo umareta.", german: "Während es bequemer wurde, entstanden andererseits auch neue Probleme." },
        { japanese: "彼は厳しい一方で、優しい面もある。", romaji: "Kare wa kibishii ippō de, yasashii men mo aru.", german: "Er ist einerseits streng, hat aber andererseits auch eine sanfte Seite." }
      ],
      notes: "",
      related: ["n2-hanmen", "n2-ippou-da"]
    },
    {
      id: "n2-ippou-da",
      pattern: "～一方だ",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "immer mehr, zunehmend, fortlaufend",
      explanation: "一方だ drückt aus, dass eine Tendenz oder Veränderung sich kontinuierlich in eine Richtung fortsetzt, meist in negativem Kontext.",
      formation: "Verb-Grundform + 一方だ",
      examples: [
        { japanese: "物価は上がる一方だ。", romaji: "Bukka wa agaru ippō da.", german: "Die Preise steigen immer weiter." },
        { japanese: "地球の環境は悪くなる一方だ。", romaji: "Chikyū no kankyō wa waruku naru ippō da.", german: "Die Umwelt der Erde wird immer schlechter." }
      ],
      notes: "Oft mit negativer Tendenz verwendet, kann aber auch positiv sein.",
      related: ["n2-ippou-de"]
    },
    {
      id: "n2-hanmen",
      pattern: "～反面",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "andererseits, auf der anderen Seite",
      explanation: "反面 stellt zwei gegensätzliche Eigenschaften oder Aspekte derselben Sache gegenüber. Betont, dass etwas sowohl positive als auch negative Seiten hat.",
      formation: "Verb-Grundform / い-Adj + 反面 / な-Adj + な反面 / Nomen + の反面 / である反面",
      examples: [
        { japanese: "都会は便利な反面、空気が悪い。", romaji: "Tokai wa benri na hanmen, kūki ga warui.", german: "Die Stadt ist bequem, hat aber andererseits schlechte Luft." },
        { japanese: "彼は真面目な反面、融通が利かない。", romaji: "Kare wa majime na hanmen, yūzū ga kikanai.", german: "Er ist zwar gewissenhaft, andererseits aber unflexibel." }
      ],
      notes: "Ähnlich wie 一方で, aber 反面 betont stärker den Gegensatz.",
      related: ["n2-ippou-de"]
    },
    {
      id: "n2-to-tomo-ni",
      pattern: "～とともに",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "zusammen mit, gleichzeitig mit, sowie",
      explanation: "とともに hat drei Bedeutungen: 1) zusammen mit (einer Person/Sache), 2) gleichzeitig mit einer Veränderung, 3) sowie, und auch.",
      formation: "Nomen + とともに / Verb-Grundform + とともに",
      examples: [
        { japanese: "家族とともに幸せな時間を過ごした。", romaji: "Kazoku to tomo ni shiawase na jikan wo sugoshita.", german: "Ich verbrachte glückliche Zeit zusammen mit der Familie." },
        { japanese: "技術の発展とともに、生活も変わった。", romaji: "Gijutsu no hatten to tomo ni, seikatsu mo kawatta.", german: "Mit der Entwicklung der Technologie hat sich auch das Leben verändert." }
      ],
      notes: "",
      related: ["n2-to-douji-ni"]
    },
    {
      id: "n2-to-douji-ni",
      pattern: "～と同時に",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "gleichzeitig mit, zugleich",
      explanation: "と同時に drückt aus, dass zwei Dinge genau gleichzeitig geschehen, oder dass etwas zwei Eigenschaften gleichzeitig besitzt.",
      formation: "Verb-Grundform / Verb-た形 / Nomen + と同時に",
      examples: [
        { japanese: "ベルが鳴ると同時に、生徒たちが教室を飛び出した。", romaji: "Beru ga naru to dōji ni, seitotachi ga kyōshitsu wo tobidashita.", german: "Gleichzeitig mit dem Klingeln stürmten die Schüler aus dem Klassenzimmer." },
        { japanese: "彼は医者であると同時に、作家でもある。", romaji: "Kare wa isha de aru to dōji ni, sakka de mo aru.", german: "Er ist zugleich Arzt und auch Schriftsteller." }
      ],
      notes: "",
      related: ["n2-to-tomo-ni"]
    },
    {
      id: "n2-wa-mochiron",
      pattern: "～はもちろん",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "natürlich, ganz zu schweigen von",
      explanation: "はもちろん hebt hervor, dass etwas selbstverständlich ist, und fügt hinzu, dass darüber hinaus noch weitere Dinge gelten.",
      formation: "Nomen + はもちろん(、Nomen + も)",
      examples: [
        { japanese: "日本語はもちろん、英語も話せる。", romaji: "Nihongo wa mochiron, Eigo mo hanaseru.", german: "Er kann natürlich Japanisch, aber auch Englisch sprechen." },
        { japanese: "週末はもちろん、平日も忙しい。", romaji: "Shūmatsu wa mochiron, heijitsu mo isogashii.", german: "Am Wochenende natürlich, aber auch unter der Woche bin ich beschäftigt." }
      ],
      notes: "",
      related: ["n2-wa-motoyori", "n2-bakari-ka"]
    },
    {
      id: "n2-wa-motoyori",
      pattern: "～はもとより",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "ganz zu schweigen von, selbstverständlich ... und darüber hinaus",
      explanation: "はもとより ist die formellere Version von はもちろん. Betont, dass etwas selbstverständlich ist und noch weitere Dinge hinzukommen.",
      formation: "Nomen + はもとより",
      examples: [
        { japanese: "彼は国内はもとより、海外でも有名だ。", romaji: "Kare wa kokunai wa motoyori, kaigai de mo yūmei da.", german: "Er ist nicht nur im Inland, sondern auch im Ausland berühmt." },
        { japanese: "この病院は設備はもとより、スタッフの質も高い。", romaji: "Kono byōin wa setsubi wa motoyori, sutaffu no shitsu mo takai.", german: "Dieses Krankenhaus hat nicht nur gute Ausstattung, sondern auch qualifiziertes Personal." }
      ],
      notes: "Formeller als はもちろん. Eher in schriftlicher Sprache.",
      related: ["n2-wa-mochiron"]
    },
    {
      id: "n2-dokoro-ka",
      pattern: "～どころか",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "weit entfernt von, geschweige denn, im Gegenteil",
      explanation: "どころか verneint die erste Aussage stark und stellt eine überraschende Realität dagegen. Die Realität ist weit von der Erwartung entfernt.",
      formation: "Verb-Grundform / Nomen / い-Adj / な-Adj + どころか",
      examples: [
        { japanese: "旅行どころか、休みも取れない。", romaji: "Ryokō dokoro ka, yasumi mo torenai.", german: "Von Reise ganz zu schweigen, ich kann nicht einmal frei nehmen." },
        { japanese: "日本語が上手になるどころか、前より下手になった。", romaji: "Nihongo ga jōzu ni naru dokoro ka, mae yori heta ni natta.", german: "Weit entfernt davon, besser in Japanisch zu werden, bin ich schlechter geworden." }
      ],
      notes: "Starke Verneinung der Erwartung.",
      related: ["n2-dokoro-dewa-nai"]
    },
    {
      id: "n2-dokoro-dewa-nai",
      pattern: "～どころではない",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "es ist nicht die Zeit/der Ort für, keine Möglichkeit für",
      explanation: "どころではない drückt aus, dass die Situation so schlimm oder dringend ist, dass man keine Zeit oder Möglichkeit für die genannte Sache hat.",
      formation: "Verb-Grundform / Nomen + どころではない",
      examples: [
        { japanese: "試験前で、遊んでいるどころではない。", romaji: "Shiken mae de, asonde iru dokoro dewa nai.", german: "Vor der Prüfung ist es nicht die Zeit zum Spielen." },
        { japanese: "花見どころではない、仕事が山ほどある。", romaji: "Hanami dokoro dewa nai, shigoto ga yama hodo aru.", german: "Von Kirschblütenschau ganz zu schweigen, ich habe bergeweise Arbeit." }
      ],
      notes: "",
      related: ["n2-dokoro-ka"]
    },
    {
      id: "n2-bakari-ka",
      pattern: "～ばかりか",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "nicht nur ... sondern auch",
      explanation: "ばかりか drückt aus, dass nicht nur eine Sache zutrifft, sondern überraschenderweise auch noch eine weitere. Stärker als だけでなく.",
      formation: "Verb/い-Adj + ばかりか / な-Adj + な/である + ばかりか / Nomen + ばかりか",
      examples: [
        { japanese: "彼は英語ばかりか、フランス語も話せる。", romaji: "Kare wa Eigo bakari ka, Furansugo mo hanaseru.", german: "Er kann nicht nur Englisch, sondern auch Französisch sprechen." },
        { japanese: "値段が高いばかりか、質も悪い。", romaji: "Nedan ga takai bakari ka, shitsu mo warui.", german: "Nicht nur ist der Preis hoch, die Qualität ist auch schlecht." }
      ],
      notes: "Betont Überraschung oder zusätzliche Information.",
      related: ["n2-wa-mochiron"]
    },
    {
      id: "n2-bakari-ni",
      pattern: "～ばかりに",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "nur weil, bloß weil (mit negativem Ergebnis)",
      explanation: "ばかりに drückt Bedauern aus: Nur wegen eines einzigen Grundes ist etwas Negatives passiert. Der Sprecher bereut die Ursache.",
      formation: "Verb-た形 / い-Adj + ばかりに / な-Adj + な/である + ばかりに",
      examples: [
        { japanese: "一言多く言ったばかりに、友達と喧嘩してしまった。", romaji: "Hitokoto ōku itta bakari ni, tomodachi to kenka shite shimatta.", german: "Nur weil ich ein Wort zu viel gesagt habe, habe ich mich mit meinem Freund gestritten." },
        { japanese: "お金がないばかりに、留学を諦めた。", romaji: "Okane ga nai bakari ni, ryūgaku wo akirameta.", german: "Nur weil ich kein Geld habe, musste ich das Auslandsstudium aufgeben." }
      ],
      notes: "Immer mit negativem Ergebnis und Bedauern.",
      related: ["n2-sei-de"]
    },
    {
      id: "n2-kara-koso",
      pattern: "～からこそ",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "gerade weil, genau deshalb",
      explanation: "からこそ betont den Grund besonders stark. Gerade dieser Grund (und kein anderer) ist der entscheidende Faktor.",
      formation: "Verb/い-Adj/な-Adj/Nomen + だ/である + からこそ",
      examples: [
        { japanese: "好きだからこそ、厳しいことも言うのだ。", romaji: "Suki da kara koso, kibishii koto mo iu no da.", german: "Gerade weil ich dich mag, sage ich auch strenge Dinge." },
        { japanese: "失敗したからこそ、学べることがある。", romaji: "Shippai shita kara koso, manaberu koto ga aru.", german: "Gerade weil man gescheitert ist, gibt es Dinge, die man lernen kann." }
      ],
      notes: "こそ verstärkt den Grund. Immer positiver Blickwinkel auf den Grund.",
      related: ["n2-kara-niwa"]
    },
    {
      id: "n2-kara-niwa",
      pattern: "～からには",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "da nun einmal, wenn schon ... dann",
      explanation: "からには drückt Entschlossenheit oder Verpflichtung aus: Da eine bestimmte Situation eingetreten ist, muss man konsequent handeln.",
      formation: "Verb-Grundform / Verb-た形 + からには",
      examples: [
        { japanese: "やるからには、最善を尽くす。", romaji: "Yaru kara niwa, saizen wo tsukusu.", german: "Wenn ich es schon mache, dann gebe ich mein Bestes." },
        { japanese: "約束したからには、守らなければならない。", romaji: "Yakusoku shita kara niwa, mamoranakereba naranai.", german: "Da man es nun einmal versprochen hat, muss man es halten." }
      ],
      notes: "Ähnlich wie 以上は und 上は. Drückt starke Entschlossenheit aus.",
      related: ["n2-ijou-wa", "n2-ue-wa"]
    },
    {
      id: "n2-kara-to-itte",
      pattern: "～からといって",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "nur weil ... heißt das nicht, dass",
      explanation: "からといって warnt davor, voreilige Schlüsse zu ziehen. Nur weil A wahr ist, folgt daraus nicht automatisch B.",
      formation: "Verb/い-Adj/な-Adj/Nomen + だ + からといって",
      examples: [
        { japanese: "安いからといって、買いすぎてはいけない。", romaji: "Yasui kara to itte, kaisugite wa ikenai.", german: "Nur weil es günstig ist, sollte man nicht zu viel kaufen." },
        { japanese: "日本人だからといって、みんな寿司が好きとは限らない。", romaji: "Nihonjin da kara to itte, minna sushi ga suki towa kagiranai.", german: "Nur weil jemand Japaner ist, heißt das nicht, dass alle Sushi mögen." }
      ],
      notes: "Oft gefolgt von ～とは限らない, ～わけではない.",
      related: ["n2-towa-kagiranai"]
    },
    {
      id: "n2-ijou-wa",
      pattern: "～以上は",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "da nun einmal, solange",
      explanation: "以上は drückt aus, dass man angesichts einer bestehenden Tatsache konsequent handeln muss. Ähnlich wie からには.",
      formation: "Verb-Grundform / Verb-た形 + 以上(は)",
      examples: [
        { japanese: "学生である以上、勉強するべきだ。", romaji: "Gakusei de aru ijō, benkyō suru beki da.", german: "Da man nun einmal Student ist, sollte man lernen." },
        { japanese: "引き受けた以上は、責任を持ってやる。", romaji: "Hikiuketa ijō wa, sekinin wo motte yaru.", german: "Da ich es übernommen habe, mache ich es verantwortungsvoll." }
      ],
      notes: "",
      related: ["n2-kara-niwa", "n2-ue-wa"]
    },
    {
      id: "n2-irai",
      pattern: "～以来",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "seit, seitdem",
      explanation: "以来 drückt aus, dass seit einem bestimmten Zeitpunkt oder Ereignis ein Zustand andauert. Betont die Dauer seit damals.",
      formation: "Verb-て形 + 以来 / Nomen + 以来",
      examples: [
        { japanese: "日本に来て以来、毎日日本語を使っている。", romaji: "Nihon ni kite irai, mainichi Nihongo wo tsukatte iru.", german: "Seit ich nach Japan gekommen bin, benutze ich jeden Tag Japanisch." },
        { japanese: "卒業以来、彼とは会っていない。", romaji: "Sotsugyō irai, kare to wa atte inai.", german: "Seit dem Abschluss habe ich ihn nicht mehr getroffen." }
      ],
      notes: "Der Zustand dauert bis zur Gegenwart an.",
      related: []
    },
    {
      id: "n2-ta-tokoro",
      pattern: "～たところ",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "als ich ... tat (und dann), als Ergebnis",
      explanation: "たところ drückt aus, dass man etwas getan hat und dabei ein (oft unerwartetes) Ergebnis entdeckt oder erfahren hat.",
      formation: "Verb-た形 + ところ",
      examples: [
        { japanese: "先生に聞いたところ、明日は休みだそうだ。", romaji: "Sensei ni kiita tokoro, ashita wa yasumi da sō da.", german: "Als ich den Lehrer fragte, sagte er, dass morgen frei ist." },
        { japanese: "調べたところ、原因が分かった。", romaji: "Shirabeta tokoro, gen'in ga wakatta.", german: "Als ich nachforschte, fand ich die Ursache heraus." }
      ],
      notes: "Das Ergebnis ist oft neu oder überraschend für den Sprecher.",
      related: ["n2-tokoro-ni"]
    },
    {
      id: "n2-tokoro-ni",
      pattern: "～ところに",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "gerade als, just in dem Moment als",
      explanation: "ところに beschreibt, dass gerade in einem bestimmten Moment (mitten in einer Handlung oder kurz davor/danach) etwas Unerwartetes passiert.",
      formation: "Verb-ている / Verb-た / Verb-よう としている + ところに",
      examples: [
        { japanese: "出かけようとしたところに、友達が来た。", romaji: "Dekakeyō to shita tokoro ni, tomodachi ga kita.", german: "Gerade als ich losgehen wollte, kam ein Freund." },
        { japanese: "寝ているところに電話がかかってきた。", romaji: "Nete iru tokoro ni denwa ga kakatte kita.", german: "Gerade als ich schlief, kam ein Telefonanruf." }
      ],
      notes: "ところを = jemanden bei etwas ertappen/stören.",
      related: ["n2-ta-tokoro"]
    },
    {
      id: "n2-ta-totan",
      pattern: "～たとたん(に)",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "in dem Moment als, kaum dass",
      explanation: "たとたん drückt aus, dass unmittelbar nach einer Handlung etwas Unerwartetes geschah. Sehr schnelle Abfolge.",
      formation: "Verb-た形 + とたん(に)",
      examples: [
        { japanese: "外に出たとたん、雨が降り出した。", romaji: "Soto ni deta totan, ame ga furidashita.", german: "Kaum dass ich nach draußen ging, fing es an zu regnen." },
        { japanese: "薬を飲んだとたんに、眠くなった。", romaji: "Kusuri wo nonda totan ni, nemuku natta.", german: "In dem Moment als ich die Medizin nahm, wurde ich schläfrig." }
      ],
      notes: "Das zweite Ereignis ist immer unerwartet und passiert sofort.",
      related: ["n2-ka-to-omottara"]
    },
    {
      id: "n2-te-kara-de-nai-to",
      pattern: "～てからでないと",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "erst wenn ... dann, wenn nicht zuerst ...",
      explanation: "てからでないと drückt aus, dass eine Sache erst getan werden muss, bevor die nächste möglich ist. Bedingung der Reihenfolge.",
      formation: "Verb-て形 + からでないと / からでなければ",
      examples: [
        { japanese: "実際に使ってからでないと、評価できない。", romaji: "Jissai ni tsukatte kara de nai to, hyōka dekinai.", german: "Erst wenn man es tatsächlich benutzt hat, kann man es bewerten." },
        { japanese: "説明を聞いてからでないと、始められない。", romaji: "Setsumei wo kiite kara de nai to, hajimerarenai.", german: "Erst nachdem man die Erklärung gehört hat, kann man anfangen." }
      ],
      notes: "",
      related: []
    },
    {
      id: "n2-mono-dakara",
      pattern: "～ものだから",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "weil, da (als Entschuldigung/Erklärung)",
      explanation: "ものだから gibt einen Grund an und wird oft als Entschuldigung oder Rechtfertigung verwendet. Der Sprecher erklärt, warum etwas passiert ist.",
      formation: "Verb/い-Adj + ものだから / な-Adj + な + ものだから / Nomen + な + ものだから",
      examples: [
        { japanese: "道が混んでいたものだから、遅れてしまいました。", romaji: "Michi ga konde ita mono dakara, okurete shimaimashita.", german: "Weil die Straße verstopft war, habe ich mich verspätet." },
        { japanese: "あまりにおいしかったものだから、食べすぎた。", romaji: "Amari ni oishikatta mono dakara, tabesugita.", german: "Weil es so lecker war, habe ich zu viel gegessen." }
      ],
      notes: "Umgangssprachlich auch もんだから. Rechtfertigender Ton.",
      related: ["n2-mono-no"]
    },
    {
      id: "n2-mono-nara",
      pattern: "～ものなら",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "wenn ... könnte, falls es möglich wäre",
      explanation: "ものなら drückt einen hypothetischen Wunsch aus: Wenn etwas möglich wäre (was es wahrscheinlich nicht ist), würde man es gerne tun.",
      formation: "Verb-Potentialform / Verb-Grundform + ものなら",
      examples: [
        { japanese: "できるものなら、やり直したい。", romaji: "Dekiru mono nara, yarinaoshitai.", german: "Wenn es möglich wäre, würde ich es gerne noch einmal machen." },
        { japanese: "戻れるものなら、学生時代に戻りたい。", romaji: "Modoreru mono nara, gakusei jidai ni modoritai.", german: "Wenn ich könnte, würde ich gerne in die Studentenzeit zurückkehren." }
      ],
      notes: "Impliziert, dass es wahrscheinlich unmöglich ist.",
      related: ["n2-mono-no"]
    },
    {
      id: "n2-mono-no",
      pattern: "～ものの",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "obwohl, zwar ... aber",
      explanation: "ものの räumt eine Tatsache ein, stellt ihr aber eine kontrastierende Realität gegenüber. Formeller als けど.",
      formation: "Verb-Grundform / Verb-た形 / い-Adj + ものの / な-Adj + な + ものの",
      examples: [
        { japanese: "買ったものの、一度も使っていない。", romaji: "Katta mono no, ichido mo tsukatte inai.", german: "Obwohl ich es gekauft habe, habe ich es kein einziges Mal benutzt." },
        { japanese: "日本語を勉強しているものの、まだ上手に話せない。", romaji: "Nihongo wo benkyō shite iru mono no, mada jōzu ni hanasenai.", german: "Obwohl ich Japanisch lerne, kann ich noch nicht gut sprechen." }
      ],
      notes: "Formeller als けど/が. Häufig in schriftlicher Sprache.",
      related: ["n2-nagara-mo"]
    },
    {
      id: "n2-mono-da",
      pattern: "～ものだ",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "man sollte / früher hat man / wie ... doch!",
      explanation: "ものだ hat mehrere Bedeutungen: 1) Allgemeine Wahrheit oder Rat (man sollte), 2) Erinnerung an die Vergangenheit (früher...), 3) Starke Emotion oder Bewunderung.",
      formation: "Verb-Grundform + ものだ (Rat/Allgemein) / Verb-た形 + ものだ (Erinnerung)",
      examples: [
        { japanese: "人の話はよく聞くものだ。", romaji: "Hito no hanashi wa yoku kiku mono da.", german: "Man sollte anderen gut zuhören." },
        { japanese: "子供の頃はよく川で遊んだものだ。", romaji: "Kodomo no koro wa yoku kawa de asonda mono da.", german: "Als Kind habe ich oft am Fluss gespielt." }
      ],
      notes: "た形+ものだ = Nostalgie. 辞書形+ものだ = allgemeine Weisheit.",
      related: []
    },
    {
      id: "n2-koto-kara",
      pattern: "～ことから",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "aus der Tatsache dass, weil, aufgrund",
      explanation: "ことから gibt den Grund oder die Herkunft einer Benennung oder Schlussfolgerung an. Oft bei Erklärungen von Namen oder Bezeichnungen.",
      formation: "Verb/い-Adj/な-Adj/Nomen + ことから",
      examples: [
        { japanese: "形が富士山に似ていることから、この山は「小富士」と呼ばれている。", romaji: "Katachi ga Fujisan ni nite iru koto kara, kono yama wa 'ko-Fuji' to yobarete iru.", german: "Weil die Form dem Fuji ähnelt, wird dieser Berg 'Klein-Fuji' genannt." },
        { japanese: "彼がいつも遅刻することから、「遅刻王」というあだ名がついた。", romaji: "Kare ga itsumo chikoku suru koto kara, 'chikoku-ō' to iu adana ga tsuita.", german: "Weil er immer zu spät kommt, bekam er den Spitznamen 'Zuspätkommer-König'." }
      ],
      notes: "Häufig bei Erklärungen, warum etwas so heißt.",
      related: []
    },
    {
      id: "n2-koto-dakara",
      pattern: "～ことだから",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "weil es (jemand) ist, da es sich um ... handelt",
      explanation: "ことだから wird verwendet, um basierend auf dem bekannten Charakter einer Person eine Vermutung oder Erwartung auszudrücken.",
      formation: "Nomen + の + ことだから",
      examples: [
        { japanese: "真面目な田中さんのことだから、きっと時間通りに来るだろう。", romaji: "Majime na Tanaka-san no koto dakara, kitto jikan dōri ni kuru darō.", german: "Da es der gewissenhafte Tanaka ist, wird er sicher pünktlich kommen." },
        { japanese: "あの人のことだから、また遅刻するに違いない。", romaji: "Ano hito no koto dakara, mata chikoku suru ni chigai nai.", german: "Da es diese Person ist, wird sie sicher wieder zu spät kommen." }
      ],
      notes: "Basiert auf dem bekannten Charakter der Person.",
      related: []
    },
    {
      id: "n2-koto-ni-natte-iru",
      pattern: "～ことになっている",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "es ist so festgelegt, es ist Vorschrift/geplant",
      explanation: "ことになっている drückt aus, dass etwas als Regel, Vereinbarung oder Plan festgelegt ist. Es ist eine bestehende Bestimmung.",
      formation: "Verb-Grundform / Verb-ない形 + ことになっている",
      examples: [
        { japanese: "この会社では、毎朝ミーティングをすることになっている。", romaji: "Kono kaisha dewa, maiasa mītingu wo suru koto ni natte iru.", german: "In dieser Firma ist es so festgelegt, dass jeden Morgen ein Meeting stattfindet." },
        { japanese: "来月、出張に行くことになっている。", romaji: "Raigetsu, shutchō ni iku koto ni natte iru.", german: "Es ist geplant, dass ich nächsten Monat auf Geschäftsreise gehe." }
      ],
      notes: "Unterschied: ことにしている = eigene Entscheidung, ことになっている = externe Bestimmung.",
      related: []
    },
    {
      id: "n2-koto-wa-nai",
      pattern: "～ことはない",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "es besteht keine Notwendigkeit, man braucht nicht",
      explanation: "ことはない beruhigt den Gesprächspartner: Es gibt keinen Grund zur Sorge oder keine Notwendigkeit, etwas zu tun.",
      formation: "Verb-Grundform + ことはない",
      examples: [
        { japanese: "そんなに心配することはないよ。", romaji: "Sonna ni shinpai suru koto wa nai yo.", german: "Du brauchst dir nicht so viele Sorgen zu machen." },
        { japanese: "急ぐことはない、まだ時間がある。", romaji: "Isogu koto wa nai, mada jikan ga aru.", german: "Du brauchst dich nicht zu beeilen, wir haben noch Zeit." }
      ],
      notes: "Beruhigende Funktion. Ähnlich wie ～なくてもいい.",
      related: []
    },
    {
      id: "n2-wake-ga-nai",
      pattern: "～わけがない",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "es gibt keinen Grund / es ist unmöglich, dass",
      explanation: "わけがない drückt eine starke Verneinung aus: Es ist absolut unmöglich oder es gibt keinen logischen Grund, dass etwas so ist.",
      formation: "Verb-Grundform / い-Adj + わけがない / な-Adj + な + わけがない",
      examples: [
        { japanese: "彼がそんなことをするわけがない。", romaji: "Kare ga sonna koto wo suru wake ga nai.", german: "Es gibt keinen Grund, dass er so etwas tun würde." },
        { japanese: "こんな簡単な問題が分からないわけがない。", romaji: "Konna kantan na mondai ga wakaranai wake ga nai.", german: "Es ist unmöglich, dass man so eine einfache Frage nicht versteht." }
      ],
      notes: "Umgangssprachlich: わけない. Starke Überzeugung des Sprechers.",
      related: ["n2-wake-niwa-ikanai", "n2-wake-dewa-nai"]
    },
    {
      id: "n2-wake-niwa-ikanai",
      pattern: "～わけにはいかない",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "man kann unmöglich, es geht nicht dass",
      explanation: "わけにはいかない drückt aus, dass man etwas aus moralischen, sozialen oder praktischen Gründen nicht tun kann, auch wenn man es vielleicht möchte.",
      formation: "Verb-Grundform + わけにはいかない / Verb-ない形 + わけにはいかない",
      examples: [
        { japanese: "友達との約束があるので、仕事を休むわけにはいかない。", romaji: "Tomodachi to no yakusoku ga aru no de, shigoto wo yasumu wake niwa ikanai.", german: "Ich habe eine Verabredung mit Freunden, aber ich kann die Arbeit nicht einfach ausfallen lassen." },
        { japanese: "まだ結果が出ていないので、諦めるわけにはいかない。", romaji: "Mada kekka ga dete inai no de, akirameru wake niwa ikanai.", german: "Da das Ergebnis noch nicht feststeht, kann ich nicht aufgeben." }
      ],
      notes: "ない形+わけにはいかない = man muss es tun (doppelte Verneinung).",
      related: ["n2-wake-ga-nai"]
    },
    {
      id: "n2-wake-dewa-nai",
      pattern: "～わけではない",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "es ist nicht so, dass; es bedeutet nicht, dass",
      explanation: "わけではない korrigiert eine mögliche Fehlinterpretation. Es verneint teilweise: Es ist nicht komplett so, wie man denken könnte.",
      formation: "Verb-Grundform / い-Adj + わけではない / な-Adj + な + わけではない",
      examples: [
        { japanese: "嫌いなわけではないが、あまり好きでもない。", romaji: "Kirai na wake dewa nai ga, amari suki de mo nai.", german: "Es ist nicht so, dass ich es hasse, aber ich mag es auch nicht besonders." },
        { japanese: "お金がないわけではないが、節約したい。", romaji: "Okane ga nai wake dewa nai ga, setsuyaku shitai.", german: "Es ist nicht so, dass ich kein Geld habe, aber ich möchte sparen." }
      ],
      notes: "Teilweise Verneinung - nuancierter als einfaches ない.",
      related: ["n2-wake-ga-nai", "n2-to-iu-wake-dewa-nai"]
    },
    {
      id: "n2-to-iu-wake-dewa-nai",
      pattern: "～というわけではない",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "das bedeutet nicht, dass; es heißt nicht, dass",
      explanation: "というわけではない verneint eine naheliegende Schlussfolgerung. Man korrigiert ein Missverständnis oder eine voreilige Annahme.",
      formation: "Satz (plain) + というわけではない",
      examples: [
        { japanese: "日本に住んでいるからといって、日本語が完璧というわけではない。", romaji: "Nihon ni sunde iru kara to itte, Nihongo ga kanpeki to iu wake dewa nai.", german: "Nur weil man in Japan lebt, heißt das nicht, dass man perfekt Japanisch kann." },
        { japanese: "反対しているというわけではないが、もう少し考えたい。", romaji: "Hantai shite iru to iu wake dewa nai ga, mō sukoshi kangaetai.", german: "Es ist nicht so, dass ich dagegen bin, aber ich möchte noch etwas darüber nachdenken." }
      ],
      notes: "Erweiterte Form von わけではない. Besonders bei Schlussfolgerungen.",
      related: ["n2-wake-dewa-nai"]
    },
    {
      id: "n2-nai-koto-wa-nai",
      pattern: "～ないことはない",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "es ist nicht so, dass man nicht kann; es ist schon möglich",
      explanation: "ないことはない ist eine doppelte Verneinung, die eine schwache Bejahung ausdrückt: Es ist möglich, aber mit Einschränkungen oder Zögern.",
      formation: "Verb-ない形 + ことはない / い-Adj-くない + ことはない",
      examples: [
        { japanese: "食べられないことはないが、あまりおいしくない。", romaji: "Taberarenai koto wa nai ga, amari oishiku nai.", german: "Es ist nicht so, dass ich es nicht essen kann, aber es schmeckt nicht besonders." },
        { japanese: "分からないことはないが、説明が難しい。", romaji: "Wakaranai koto wa nai ga, setsumei ga muzukashii.", german: "Es ist nicht so, dass ich es nicht verstehe, aber die Erklärung ist schwierig." }
      ],
      notes: "Drückt zögerliche Zustimmung aus.",
      related: []
    },
    {
      id: "n2-osore-ga-aru",
      pattern: "～おそれがある",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "es besteht die Gefahr/das Risiko, dass",
      explanation: "おそれがある warnt vor einem möglichen negativen Ergebnis. Wird häufig in Nachrichten, Wetterberichten und offiziellen Warnungen verwendet.",
      formation: "Verb-Grundform + おそれがある / Nomen + の + おそれがある",
      examples: [
        { japanese: "台風が接近するおそれがある。", romaji: "Taifū ga sekkin suru osore ga aru.", german: "Es besteht die Gefahr, dass sich ein Taifun nähert." },
        { japanese: "この薬は副作用を起こすおそれがある。", romaji: "Kono kusuri wa fukusayō wo okosu osore ga aru.", german: "Bei diesem Medikament besteht das Risiko von Nebenwirkungen." }
      ],
      notes: "Immer negativ. Formell, typisch für Nachrichten und Warnungen.",
      related: ["n2-kanenai"]
    },
    {
      id: "n2-ni-chigai-nai",
      pattern: "～に違いない",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "es muss ... sein, zweifellos, bestimmt",
      explanation: "に違いない drückt eine starke Vermutung oder Überzeugung des Sprechers aus. Man ist sich fast sicher.",
      formation: "Verb-Grundform / Verb-た形 / い-Adj / な-Adj + に違いない / Nomen + に違いない",
      examples: [
        { japanese: "こんなに遅いなんて、道に迷ったに違いない。", romaji: "Konna ni osoi nante, michi ni mayotta ni chigai nai.", german: "So spät zu sein - er muss sich verlaufen haben." },
        { japanese: "あの人は日本人に違いない。", romaji: "Ano hito wa Nihonjin ni chigai nai.", german: "Diese Person muss ein Japaner sein." }
      ],
      notes: "Starke persönliche Überzeugung, stärker als だろう.",
      related: ["n2-ni-kimatte-iru"]
    },
    {
      id: "n2-hazu-ga-nai",
      pattern: "～はずがない",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "es kann nicht sein, dass; unmöglich",
      explanation: "はずがない drückt aus, dass etwas logisch unmöglich ist. Der Sprecher ist überzeugt, dass es keinen Grund gibt, warum etwas so sein sollte.",
      formation: "Verb-Grundform / い-Adj + はずがない / な-Adj + な + はずがない / Nomen + の + はずがない",
      examples: [
        { japanese: "彼が嘘をつくはずがない。", romaji: "Kare ga uso wo tsuku hazu ga nai.", german: "Es kann nicht sein, dass er lügt." },
        { japanese: "こんなに勉強したのだから、落ちるはずがない。", romaji: "Konna ni benkyō shita no dakara, ochiru hazu ga nai.", german: "Da ich so viel gelernt habe, kann ich unmöglich durchfallen." }
      ],
      notes: "Basiert auf logischer Überlegung, nicht nur auf Gefühl.",
      related: ["n2-ni-chigai-nai"]
    },
    {
      id: "n2-ni-suginai",
      pattern: "～にすぎない",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "nichts weiter als, nur, lediglich",
      explanation: "にすぎない minimiert die Bedeutung von etwas. Es drückt aus, dass etwas weniger wichtig oder weniger ist, als man denken könnte.",
      formation: "Verb-Grundform / Nomen + にすぎない",
      examples: [
        { japanese: "これは私の個人的な意見にすぎない。", romaji: "Kore wa watashi no kojinteki na iken ni suginai.", german: "Dies ist lediglich meine persönliche Meinung." },
        { japanese: "まだ始まったにすぎない。", romaji: "Mada hajimatta ni suginai.", german: "Es hat gerade erst angefangen, nichts weiter." }
      ],
      notes: "Bescheidene oder abschwächende Formulierung.",
      related: ["n2-ni-hoka-naranai"]
    },
    {
      id: "n2-ni-hoka-naranai",
      pattern: "～にほかならない",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "nichts anderes als, genau das ist",
      explanation: "にほかならない betont stark, dass etwas genau das ist und nichts anderes. Drückt Überzeugung und Nachdruck aus.",
      formation: "Nomen + にほかならない / ～からにほかならない",
      examples: [
        { japanese: "成功したのは、努力の結果にほかならない。", romaji: "Seikō shita no wa, doryoku no kekka ni hoka naranai.", german: "Der Erfolg ist nichts anderes als das Ergebnis harter Arbeit." },
        { japanese: "それは彼の才能にほかならない。", romaji: "Sore wa kare no sainō ni hoka naranai.", german: "Das ist nichts anderes als sein Talent." }
      ],
      notes: "Sehr formal und nachdrücklich.",
      related: ["n2-ni-suginai"]
    },
    {
      id: "n2-kara-suru-to",
      pattern: "～からすると",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "aus der Sicht von, von ... her betrachtet",
      explanation: "からすると gibt die Perspektive an, von der aus etwas beurteilt wird. Man nimmt den Standpunkt einer anderen Person oder Grundlage ein.",
      formation: "Nomen + からすると / からすれば / からして",
      examples: [
        { japanese: "私からすると、この計画は無理がある。", romaji: "Watashi kara suru to, kono keikaku wa muri ga aru.", german: "Aus meiner Sicht ist dieser Plan unrealistisch." },
        { japanese: "外見からすると、彼は30歳くらいだろう。", romaji: "Gaiken kara suru to, kare wa sanjussai kurai darō.", german: "Vom Aussehen her betrachtet dürfte er etwa 30 Jahre alt sein." }
      ],
      notes: "",
      related: ["n2-kara-miru-to"]
    },
    {
      id: "n2-kara-miru-to",
      pattern: "～からみると",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "vom Standpunkt ... aus betrachtet, aus der Sicht von",
      explanation: "からみると gibt eine Perspektive an, von der aus man eine Situation betrachtet oder beurteilt. Ähnlich wie からすると.",
      formation: "Nomen + からみると / からみれば / からみて",
      examples: [
        { japanese: "専門家からみると、この問題は簡単だ。", romaji: "Senmonka kara miru to, kono mondai wa kantan da.", german: "Aus Sicht eines Experten ist dieses Problem einfach." },
        { japanese: "結果からみて、この方法は効果的だった。", romaji: "Kekka kara mite, kono hōhō wa kōkateki datta.", german: "Vom Ergebnis her betrachtet war diese Methode effektiv." }
      ],
      notes: "",
      related: ["n2-kara-suru-to"]
    },
    {
      id: "n2-ni-shite-wa",
      pattern: "～にしては",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "dafür dass, für (jemanden/etwas)",
      explanation: "にしては drückt aus, dass etwas anders ist als erwartet, wenn man die Umstände bedenkt. Das Ergebnis weicht von der Erwartung ab.",
      formation: "Verb-Grundform / Nomen + にしては",
      examples: [
        { japanese: "初めてにしては、上手だ。", romaji: "Hajimete ni shite wa, jōzu da.", german: "Dafür, dass es das erste Mal ist, ist es gut." },
        { japanese: "日本人にしては背が高い。", romaji: "Nihonjin ni shite wa se ga takai.", german: "Für einen Japaner ist er groß." }
      ],
      notes: "Immer überraschende Abweichung von der Norm.",
      related: ["n2-ni-shite-mo"]
    },
    {
      id: "n2-ni-shite-mo",
      pattern: "～にしても",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "selbst wenn, auch wenn, selbst für",
      explanation: "にしても räumt eine Möglichkeit ein, sagt aber, dass sich am Ergebnis trotzdem nichts ändert, oder drückt aus, dass etwas überraschend ist.",
      formation: "Verb-Grundform / Nomen + にしても",
      examples: [
        { japanese: "忙しいにしても、食事はきちんと取るべきだ。", romaji: "Isogashii ni shite mo, shokuji wa kichinto toru beki da.", german: "Selbst wenn man beschäftigt ist, sollte man ordentlich essen." },
        { japanese: "冗談にしても、ひどすぎる。", romaji: "Jōdan ni shite mo, hidosugiru.", german: "Selbst als Witz ist das zu schlimm." }
      ],
      notes: "",
      related: ["n2-to-shite-mo", "n2-ni-shite-wa"]
    },
    {
      id: "n2-to-shite-mo",
      pattern: "～としても",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "selbst wenn, auch wenn (hypothetisch)",
      explanation: "としても stellt eine hypothetische Situation auf und sagt, dass sich selbst dann am Ergebnis nichts ändern würde.",
      formation: "Verb-た形 / Verb-Grundform + としても / い-Adj + としても",
      examples: [
        { japanese: "たとえ失敗したとしても、後悔はしない。", romaji: "Tatoe shippai shita to shite mo, kōkai wa shinai.", german: "Selbst wenn ich scheitern sollte, werde ich es nicht bereuen." },
        { japanese: "お金があったとしても、この車は買わない。", romaji: "Okane ga atta to shite mo, kono kuruma wa kawanai.", german: "Selbst wenn ich Geld hätte, würde ich dieses Auto nicht kaufen." }
      ],
      notes: "Hypothetischer als にしても.",
      related: ["n2-ni-shite-mo"]
    },
    {
      id: "n2-towa-kagiranai",
      pattern: "～とは限らない",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "nicht unbedingt, nicht notwendigerweise",
      explanation: "とは限らない drückt aus, dass etwas nicht immer oder nicht in jedem Fall zutrifft. Es gibt Ausnahmen.",
      formation: "Verb-Grundform / い-Adj / な-Adj + とは限らない / Nomen + とは限らない",
      examples: [
        { japanese: "高いものがいいとは限らない。", romaji: "Takai mono ga ii towa kagiranai.", german: "Teure Dinge sind nicht unbedingt gut." },
        { japanese: "若いからといって、健康だとは限らない。", romaji: "Wakai kara to itte, kenkō da towa kagiranai.", german: "Nur weil man jung ist, ist man nicht unbedingt gesund." }
      ],
      notes: "Oft zusammen mit からといって verwendet.",
      related: ["n2-kara-to-itte"]
    },
    {
      id: "n2-ni-mo-kakawarazu",
      pattern: "～にもかかわらず",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "trotz, obwohl, ungeachtet",
      explanation: "にもかかわらず drückt einen starken Widerspruch aus: Trotz einer bestimmten Tatsache ist das Ergebnis anders als erwartet. Formell.",
      formation: "Verb-Grundform / Verb-た形 / い-Adj / な-Adj / Nomen + にもかかわらず",
      examples: [
        { japanese: "雨にもかかわらず、多くの人が来た。", romaji: "Ame ni mo kakawarazu, ōku no hito ga kita.", german: "Trotz des Regens kamen viele Leute." },
        { japanese: "何度も注意したにもかかわらず、同じミスを繰り返した。", romaji: "Nando mo chūi shita ni mo kakawarazu, onaji misu wo kurikaeshita.", german: "Obwohl ich mehrmals gewarnt habe, wurde derselbe Fehler wiederholt." }
      ],
      notes: "Sehr formell. Alltagssprachlich: のに.",
      related: []
    },
    {
      id: "n2-tabi-ni",
      pattern: "～たび(に)",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "jedes Mal wenn",
      explanation: "たびに drückt aus, dass jedes Mal, wenn eine bestimmte Situation eintritt, immer das gleiche Ergebnis folgt.",
      formation: "Verb-Grundform + たび(に) / Nomen + の + たび(に)",
      examples: [
        { japanese: "日本に行くたびに、新しい発見がある。", romaji: "Nihon ni iku tabi ni, atarashii hakken ga aru.", german: "Jedes Mal wenn ich nach Japan gehe, gibt es neue Entdeckungen." },
        { japanese: "この曲を聞くたびに、学生時代を思い出す。", romaji: "Kono kyoku wo kiku tabi ni, gakusei jidai wo omoidasu.", german: "Jedes Mal wenn ich dieses Lied höre, erinnere ich mich an die Studentenzeit." }
      ],
      notes: "",
      related: []
    },
    {
      id: "n2-okage-de",
      pattern: "～おかげで",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "dank, wegen (positiv)",
      explanation: "おかげで gibt einen positiven Grund an: Dank einer Person oder Sache ist etwas Gutes passiert.",
      formation: "Verb-た形 / い-Adj / な-Adj + な + おかげで / Nomen + の + おかげで",
      examples: [
        { japanese: "先生のおかげで、試験に合格できた。", romaji: "Sensei no okage de, shiken ni gōkaku dekita.", german: "Dank des Lehrers konnte ich die Prüfung bestehen." },
        { japanese: "毎日運動したおかげで、健康になった。", romaji: "Mainichi undō shita okage de, kenkō ni natta.", german: "Dank der täglichen Bewegung bin ich gesund geworden." }
      ],
      notes: "Immer positives Ergebnis. Gegenteil: せいで (negativ).",
      related: ["n2-sei-de"]
    },
    {
      id: "n2-sei-de",
      pattern: "～せいで",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "wegen, schuld an (negativ)",
      explanation: "せいで gibt einen negativen Grund an: Wegen einer Person oder Sache ist etwas Schlechtes passiert. Drückt Schuld oder Vorwurf aus.",
      formation: "Verb-た形 / い-Adj / な-Adj + な + せいで / Nomen + の + せいで",
      examples: [
        { japanese: "雨のせいで、試合が中止になった。", romaji: "Ame no sei de, shiai ga chūshi ni natta.", german: "Wegen des Regens wurde das Spiel abgesagt." },
        { japanese: "寝坊したせいで、電車に乗り遅れた。", romaji: "Nebō shita sei de, densha ni noriokureta.", german: "Weil ich verschlafen habe, habe ich den Zug verpasst." }
      ],
      notes: "Immer negatives Ergebnis. Gegenteil: おかげで (positiv). せいか = vielleicht weil.",
      related: ["n2-okage-de"]
    },
    {
      id: "n2-amari",
      pattern: "～あまり",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "aufgrund von zu viel, vor lauter",
      explanation: "あまり drückt aus, dass ein Gefühl oder Zustand so extrem ist, dass es zu einem (oft ungewöhnlichen) Ergebnis führt.",
      formation: "Verb-Grundform / Verb-た形 + あまり / Nomen + の + あまり",
      examples: [
        { japanese: "嬉しさのあまり、泣いてしまった。", romaji: "Ureshisa no amari, naite shimatta.", german: "Vor lauter Freude habe ich geweint." },
        { japanese: "考えすぎたあまり、眠れなくなった。", romaji: "Kangaesugita amari, nemurenaku natta.", german: "Weil ich zu viel nachgedacht habe, konnte ich nicht schlafen." }
      ],
      notes: "Oft mit Emotionen oder intensiven Zuständen.",
      related: []
    },
    {
      id: "n2-kuse-ni",
      pattern: "～くせに",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "obwohl, trotzdem (vorwurfsvoll)",
      explanation: "くせに drückt Vorwurf oder Verärgerung aus: Obwohl eine bestimmte Tatsache besteht, verhält sich jemand widersprüchlich oder unangemessen.",
      formation: "Verb-Grundform / い-Adj + くせに / な-Adj + な + くせに / Nomen + の + くせに",
      examples: [
        { japanese: "知らないくせに、知ったふりをする。", romaji: "Shiranai kuse ni, shitta furi wo suru.", german: "Obwohl er es nicht weiß, tut er so, als ob." },
        { japanese: "自分でやらないくせに、文句ばかり言う。", romaji: "Jibun de yaranai kuse ni, monku bakari iu.", german: "Obwohl er es selbst nicht macht, beschwert er sich nur." }
      ],
      notes: "Negativer Unterton. Nicht in höflicher Sprache verwenden.",
      related: []
    },
    {
      id: "n2-dake-ni",
      pattern: "～だけに",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "gerade weil, wie man es erwarten würde",
      explanation: "だけに drückt aus, dass ein Ergebnis genau dem entspricht, was man angesichts der Umstände erwarten würde. 'Gerade weil' die Bedingung so ist.",
      formation: "Verb/い-Adj/な-Adj/Nomen + だけに",
      examples: [
        { japanese: "さすが有名なレストランだけに、料理がおいしい。", romaji: "Sasuga yūmei na resutoran dake ni, ryōri ga oishii.", german: "Wie man es von einem berühmten Restaurant erwarten würde, ist das Essen lecker." },
        { japanese: "期待が大きかっただけに、失望も大きかった。", romaji: "Kitai ga ōkikatta dake ni, shitsubō mo ōkikatta.", german: "Gerade weil die Erwartungen groß waren, war die Enttäuschung auch groß." }
      ],
      notes: "",
      related: ["n2-dake-atte"]
    },
    {
      id: "n2-dake-atte",
      pattern: "～だけあって",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "wie man es erwarten würde, erwartungsgemäß",
      explanation: "だけあって drückt Anerkennung aus: Das Ergebnis entspricht dem, was man aufgrund einer bekannten Eigenschaft erwartet. Positiver Ton.",
      formation: "Verb/い-Adj/な-Adj/Nomen + だけあって",
      examples: [
        { japanese: "10年も日本に住んでいただけあって、日本語がペラペラだ。", romaji: "Jūnen mo Nihon ni sunde ita dake atte, Nihongo ga perapera da.", german: "Wie man es erwarten würde, nachdem er 10 Jahre in Japan gelebt hat, spricht er fließend Japanisch." },
        { japanese: "プロだけあって、さすがに上手だ。", romaji: "Puro dake atte, sasuga ni jōzu da.", german: "Wie man es von einem Profi erwartet, ist er erwartungsgemäß gut." }
      ],
      notes: "Immer positiv/anerkennend. Ähnlich wie だけに, aber stärker anerkennend.",
      related: ["n2-dake-ni"]
    },
    {
      id: "n2-ni-kimatte-iru",
      pattern: "～に決まっている",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "es steht fest, dass; sicherlich, bestimmt",
      explanation: "に決まっている drückt eine starke Überzeugung des Sprechers aus. Man ist sich absolut sicher, auch wenn es keine Beweise gibt.",
      formation: "Verb-Grundform / い-Adj / な-Adj + に決まっている / Nomen + に決まっている",
      examples: [
        { japanese: "こんなにおいしいケーキ、高いに決まっている。", romaji: "Konna ni oishii kēki, takai ni kimatte iru.", german: "So ein leckerer Kuchen ist bestimmt teuer." },
        { japanese: "彼が犯人に決まっている。", romaji: "Kare ga hannin ni kimatte iru.", german: "Er ist bestimmt der Täter." }
      ],
      notes: "Subjektive Überzeugung, kann auch übertrieben wirken.",
      related: ["n2-ni-chigai-nai"]
    },
    {
      id: "n2-ni-kakete-wa",
      pattern: "～にかけては",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "wenn es um ... geht, was ... angeht",
      explanation: "にかけては hebt hervor, dass jemand in einem bestimmten Bereich besonders gut oder herausragend ist.",
      formation: "Nomen + にかけては",
      examples: [
        { japanese: "料理にかけては、彼の右に出る者はいない。", romaji: "Ryōri ni kakete wa, kare no migi ni deru mono wa inai.", german: "Was das Kochen angeht, gibt es niemanden, der ihn übertrifft." },
        { japanese: "スピードにかけては、彼女がチーム一だ。", romaji: "Supīdo ni kakete wa, kanojo ga chīmu ichi da.", german: "Was Geschwindigkeit angeht, ist sie die Beste im Team." }
      ],
      notes: "Immer positiv, hebt eine Stärke hervor.",
      related: []
    },
    {
      id: "n2-koto-ka",
      pattern: "～ことか",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "wie sehr doch! (Ausruf)",
      explanation: "ことか drückt starke Emotion aus - Bewunderung, Überraschung oder Sehnsucht. Rhetorischer Ausruf.",
      formation: "どんなに / どれほど / 何度 + Verb/Adj + ことか",
      examples: [
        { japanese: "どんなに嬉しかったことか。", romaji: "Donna ni ureshikatta koto ka.", german: "Wie glücklich ich doch war!" },
        { japanese: "何度やめようと思ったことか。", romaji: "Nando yameyō to omotta koto ka.", german: "Wie oft ich daran gedacht habe, aufzuhören!" }
      ],
      notes: "Oft mit どんなに, どれほど, 何度 kombiniert.",
      related: ["n2-mono-ka"]
    },
    {
      id: "n2-mono-ka",
      pattern: "～ものか",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "auf keinen Fall!, niemals!",
      explanation: "ものか drückt eine starke Verneinung oder Entschlossenheit aus. Der Sprecher weigert sich entschieden.",
      formation: "Verb-Grundform / い-Adj + ものか / もんか (umgangssprachlich)",
      examples: [
        { japanese: "あんな店に二度と行くものか。", romaji: "Anna mise ni nido to iku mono ka.", german: "In so ein Geschäft gehe ich nie wieder!" },
        { japanese: "負けるもんか！", romaji: "Makeru mon ka!", german: "Ich werde auf keinen Fall verlieren!" }
      ],
      notes: "Umgangssprachlich: もんか. Starke emotionale Ablehnung.",
      related: ["n2-koto-ka"]
    },
    {
      id: "n2-kke",
      pattern: "～っけ",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "war es ...? (sich erinnern wollen)",
      explanation: "っけ wird verwendet, wenn man versucht, sich an etwas zu erinnern, oder wenn man eine Bestätigung für eine vage Erinnerung sucht.",
      formation: "Verb-た形 / い-Adj-かった / だ + っけ",
      examples: [
        { japanese: "明日の会議、何時からだっけ？", romaji: "Ashita no kaigi, nanji kara datta kke?", german: "Ab wann war nochmal die Besprechung morgen?" },
        { japanese: "この映画、前に見たっけ？", romaji: "Kono eiga, mae ni mita kke?", german: "Hatte ich diesen Film schon einmal gesehen?" }
      ],
      notes: "Lockere Umgangssprache. Oft mit Fragezeichen.",
      related: []
    },
    {
      id: "n2-ka-to-omottara",
      pattern: "～かと思ったら",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "gerade als ich dachte, kaum dass",
      explanation: "かと思ったら drückt aus, dass sich eine Situation überraschend schnell ändert. Kaum glaubte man A, passierte schon B.",
      formation: "Verb-た形 + かと思ったら / かと思うと",
      examples: [
        { japanese: "泣いていたかと思ったら、もう笑っている。", romaji: "Naite ita ka to omottara, mō waratte iru.", german: "Gerade noch weinte er, und schon lacht er wieder." },
        { japanese: "晴れたかと思ったら、また雨が降り出した。", romaji: "Hareta ka to omottara, mata ame ga furidashita.", german: "Gerade als ich dachte, es ist sonnig, fing es wieder an zu regnen." }
      ],
      notes: "Betont den schnellen, überraschenden Wechsel.",
      related: ["n2-ta-totan"]
    },
    {
      id: "n2-ka-no-you-ni",
      pattern: "～かのように",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "als ob, als wenn",
      explanation: "かのように beschreibt etwas, das nicht der Realität entspricht, aber so aussieht oder sich so anfühlt. Vergleich mit einer hypothetischen Situation.",
      formation: "Verb/い-Adj/な-Adj + である + かのように / Nomen + である + かのように",
      examples: [
        { japanese: "彼は何も知らないかのように振る舞った。", romaji: "Kare wa nani mo shiranai ka no yō ni furumatta.", german: "Er benahm sich, als ob er nichts wüsste." },
        { japanese: "まるで夢であるかのような出来事だった。", romaji: "Marude yume de aru ka no yō na dekigoto datta.", german: "Es war ein Ereignis, als ob es ein Traum wäre." }
      ],
      notes: "Oft mit まるで kombiniert. Literarisch/formell.",
      related: []
    },
    {
      id: "n2-wo-keiki-ni",
      pattern: "～を契機に",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "zum Anlass nehmend, als Wendepunkt",
      explanation: "を契機に beschreibt ein Ereignis, das als Wendepunkt oder Auslöser für eine wichtige Veränderung diente. Formeller als をきっかけに.",
      formation: "Nomen + を契機に(して) / を契機として",
      examples: [
        { japanese: "震災を契機に、防災意識が高まった。", romaji: "Shinsai wo keiki ni, bōsai ishiki ga takamatta.", german: "Das Erdbeben war der Anlass dafür, dass das Katastrophenbewusstsein zunahm." },
        { japanese: "結婚を契機に、生活を見直した。", romaji: "Kekkon wo keiki ni, seikatsu wo minaoshita.", german: "Die Heirat nahm er zum Anlass, sein Leben zu überdenken." }
      ],
      notes: "Formeller als をきっかけに. Oft bei gesellschaftlichen Veränderungen.",
      related: ["n2-wo-kikkake-ni"]
    },
    {
      id: "n2-wo-toshite",
      pattern: "～を通して",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "durch, über ... hindurch",
      explanation: "を通して kann sowohl ein Mittel/eine Vermittlung als auch einen durchgehenden Zeitraum beschreiben. Ähnlich wie を通じて.",
      formation: "Nomen + を通して",
      examples: [
        { japanese: "ボランティア活動を通して、多くのことを学んだ。", romaji: "Borantia katsudō wo tōshite, ōku no koto wo mananda.", german: "Durch die Freiwilligenarbeit habe ich viel gelernt." },
        { japanese: "一年を通して暖かい地域に住みたい。", romaji: "Ichinen wo tōshite atatakai chiiki ni sumitai.", german: "Ich möchte in einer Gegend leben, die das ganze Jahr über warm ist." }
      ],
      notes: "Ähnlich wie を通じて.",
      related: ["n2-wo-tsujite"]
    },
    {
      id: "n2-ni-todomarazu",
      pattern: "～にとどまらず",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "nicht beschränkt auf, über ... hinausgehend",
      explanation: "にとどまらず drückt aus, dass etwas nicht bei einem Punkt stehen bleibt, sondern sich darüber hinaus ausbreitet.",
      formation: "Nomen + にとどまらず",
      examples: [
        { japanese: "この問題は一国にとどまらず、世界全体に影響を与えている。", romaji: "Kono mondai wa ikkoku ni todomarazu, sekai zentai ni eikyō wo ataete iru.", german: "Dieses Problem ist nicht auf ein Land beschränkt, sondern beeinflusst die ganze Welt." },
        { japanese: "彼の活躍は国内にとどまらず、海外にも広がっている。", romaji: "Kare no katsuyaku wa kokunai ni todomarazu, kaigai ni mo hirogatte iru.", german: "Seine Aktivitäten gehen über das Inland hinaus und erstrecken sich auch ins Ausland." }
      ],
      notes: "Formell. Ähnlich wie に限らず, aber betont Ausbreitung.",
      related: ["n2-ni-kagirazu"]
    },
    {
      id: "n2-buri",
      pattern: "～ぶり",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "zum ersten Mal seit, nach (Zeitraum)",
      explanation: "ぶり drückt aus, dass seit dem letzten Mal eine bestimmte Zeitspanne vergangen ist. Man tut etwas zum ersten Mal nach langer Zeit.",
      formation: "Zeitraum + ぶり(に/の)",
      examples: [
        { japanese: "3年ぶりに日本に帰った。", romaji: "Sannen buri ni Nihon ni kaetta.", german: "Ich bin zum ersten Mal seit 3 Jahren nach Japan zurückgekehrt." },
        { japanese: "久しぶりの休みを楽しんだ。", romaji: "Hisashiburi no yasumi wo tanoshinda.", german: "Ich habe den Urlaub nach langer Zeit genossen." }
      ],
      notes: "久しぶり (hisashiburi) = nach langer Zeit, ist die häufigste Form.",
      related: []
    },
    {
      id: "n2-kagiri",
      pattern: "～限り",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "solange, soweit",
      explanation: "限り drückt eine Bedingung aus: Solange eine bestimmte Situation besteht, gilt etwas. Kann auch 'so viel wie möglich' bedeuten.",
      formation: "Verb-Grundform / Verb-ている / Verb-ない + 限り",
      examples: [
        { japanese: "生きている限り、希望を持ち続ける。", romaji: "Ikite iru kagiri, kibō wo mochitsuzukeru.", german: "Solange ich lebe, halte ich an der Hoffnung fest." },
        { japanese: "許可がない限り、入ることはできない。", romaji: "Kyoka ga nai kagiri, hairu koto wa dekinai.", german: "Solange keine Genehmigung vorliegt, kann man nicht eintreten." }
      ],
      notes: "できる限り = so viel wie möglich.",
      related: ["n2-kagiri-dewa"]
    },
    {
      id: "n2-kagiri-dewa",
      pattern: "～限りでは",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "soweit (ich weiß/sehen kann)",
      explanation: "限りでは schränkt eine Aussage auf den eigenen Wissens- oder Wahrnehmungsbereich ein.",
      formation: "Verb-Grundform / Verb-た形 + 限りでは",
      examples: [
        { japanese: "私が知っている限りでは、彼は独身だ。", romaji: "Watashi ga shitte iru kagiri dewa, kare wa dokushin da.", german: "Soweit ich weiß, ist er unverheiratet." },
        { japanese: "調べた限りでは、問題はなさそうだ。", romaji: "Shirabeta kagiri dewa, mondai wa nasasō da.", german: "Soweit ich nachgeforscht habe, scheint es kein Problem zu geben." }
      ],
      notes: "Schränkt die Aussage auf eigenes Wissen ein.",
      related: ["n2-kagiri"]
    },
    {
      id: "n2-ta-tokoro-de",
      pattern: "～たところで",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "selbst wenn man ... tut, auch wenn",
      explanation: "たところで drückt aus, dass selbst wenn man etwas tut, es nichts nützt oder das Ergebnis sich nicht ändert. Pessimistischer Ton.",
      formation: "Verb-た形 + ところで",
      examples: [
        { japanese: "今から急いだところで、間に合わない。", romaji: "Ima kara isoida tokoro de, maniauwanai.", german: "Selbst wenn man sich jetzt beeilt, schafft man es nicht mehr." },
        { japanese: "文句を言ったところで、何も変わらない。", romaji: "Monku wo itta tokoro de, nani mo kawaranai.", german: "Selbst wenn man sich beschwert, ändert sich nichts." }
      ],
      notes: "Immer mit negativem/nutzlosem Ergebnis. Unterschied zu たところ (Ergebnis).",
      related: ["n2-ta-tokoro"]
    },
    {
      id: "n2-to-shitara",
      pattern: "～としたら",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "angenommen dass, wenn",
      explanation: "としたら stellt eine hypothetische Annahme auf und fragt, was in diesem Fall passieren würde oder gelten würde.",
      formation: "Verb/い-Adj/な-Adj/Nomen + だ + としたら / とすれば / とすると",
      examples: [
        { japanese: "もし宝くじが当たったとしたら、何に使う？", romaji: "Moshi takarakuji ga atatta to shitara, nani ni tsukau?", german: "Angenommen du würdest im Lotto gewinnen, wofür würdest du es ausgeben?" },
        { japanese: "彼の言うことが本当だとしたら、大変なことだ。", romaji: "Kare no iu koto ga hontō da to shitara, taihen na koto da.", german: "Wenn das, was er sagt, wahr wäre, wäre es eine ernste Sache." }
      ],
      notes: "としたら/とすれば/とすると sind weitgehend austauschbar.",
      related: ["n2-to-shite-mo"]
    },
    {
      id: "n2-te-kara-to-iu-mono",
      pattern: "～てからというもの",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "seit (mit Betonung der Veränderung)",
      explanation: "てからというもの betont, dass seit einem bestimmten Ereignis eine merkliche, anhaltende Veränderung eingetreten ist.",
      formation: "Verb-て形 + からというもの",
      examples: [
        { japanese: "子供が生まれてからというもの、毎日が忙しい。", romaji: "Kodomo ga umarete kara to iu mono, mainichi ga isogashii.", german: "Seit das Kind geboren wurde, ist jeder Tag hektisch." },
        { japanese: "日本に来てからというもの、和食ばかり食べている。", romaji: "Nihon ni kite kara to iu mono, washoku bakari tabete iru.", german: "Seit ich nach Japan gekommen bin, esse ich nur japanisches Essen." }
      ],
      notes: "Stärker und emotionaler als ～て以来.",
      related: ["n2-irai"]
    },
    {
      id: "n2-te-koso",
      pattern: "～てこそ",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "erst wenn/durch, gerade weil",
      explanation: "てこそ betont, dass erst durch eine bestimmte Handlung oder Bedingung etwas seinen wahren Wert oder seine Bedeutung erhält.",
      formation: "Verb-て形 + こそ",
      examples: [
        { japanese: "練習してこそ、上手になれる。", romaji: "Renshū shite koso, jōzu ni nareru.", german: "Erst durch Übung kann man gut werden." },
        { japanese: "失敗してこそ、学べることがある。", romaji: "Shippai shite koso, manaberu koto ga aru.", german: "Gerade weil man scheitert, gibt es Dinge, die man lernen kann." }
      ],
      notes: "こそ betont die Bedingung als unverzichtbar.",
      related: ["n2-kara-koso"]
    },
    {
      id: "n2-te-hajimete",
      pattern: "～てはじめて",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "erst nachdem, zum ersten Mal durch",
      explanation: "てはじめて drückt aus, dass man erst durch eine Erfahrung etwas zum ersten Mal erkennt oder versteht.",
      formation: "Verb-て形 + はじめて",
      examples: [
        { japanese: "病気になってはじめて、健康のありがたさが分かった。", romaji: "Byōki ni natte hajimete, kenkō no arigatasa ga wakatta.", german: "Erst als ich krank wurde, verstand ich den Wert der Gesundheit." },
        { japanese: "日本に来てはじめて、本物の寿司を食べた。", romaji: "Nihon ni kite hajimete, honmono no sushi wo tabeta.", german: "Erst als ich nach Japan kam, aß ich echtes Sushi." }
      ],
      notes: "",
      related: ["n2-te-koso"]
    },
    {
      id: "n2-to-itte-mo",
      pattern: "～といっても",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "auch wenn man sagt, obwohl (Einschränkung)",
      explanation: "といっても schränkt eine vorherige Aussage ein: Was man gesagt hat, ist zwar wahr, aber es ist nicht so extrem wie man denken könnte.",
      formation: "Satz (plain) + といっても",
      examples: [
        { japanese: "日本語ができるといっても、挨拶程度です。", romaji: "Nihongo ga dekiru to itte mo, aisatsu teido desu.", german: "Auch wenn ich sage, dass ich Japanisch kann, ist es nur auf Begrüßungsniveau." },
        { japanese: "広いといっても、6畳しかない。", romaji: "Hiroi to itte mo, rokujō shika nai.", german: "Auch wenn man sagt, es sei groß, hat es nur 6 Tatami-Matten." }
      ],
      notes: "Korrigiert mögliche Übertreibung der vorherigen Aussage.",
      related: ["n2-to-wa-ie"]
    },
    {
      id: "n2-to-wa-ie",
      pattern: "～とはいえ",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "obwohl, auch wenn es so ist, dass",
      explanation: "とはいえ räumt eine Tatsache ein, fügt aber eine kontrastierende oder einschränkende Information hinzu. Formeller als けど.",
      formation: "Satz (plain) + とはいえ / Nomen + とはいえ",
      examples: [
        { japanese: "春とはいえ、まだ寒い日がある。", romaji: "Haru to wa ie, mada samui hi ga aru.", german: "Obwohl es Frühling ist, gibt es noch kalte Tage." },
        { japanese: "合格したとはいえ、油断はできない。", romaji: "Gōkaku shita to wa ie, yudan wa dekinai.", german: "Obwohl ich bestanden habe, darf ich mich nicht entspannen." }
      ],
      notes: "Formelle Schriftsprache.",
      related: ["n2-to-itte-mo", "n2-mono-no"]
    },
    {
      id: "n2-nagara-mo",
      pattern: "～ながらも",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "obwohl, trotz",
      explanation: "ながらも drückt einen Widerspruch aus: Trotz einer bestimmten Eigenschaft oder Situation existiert etwas Gegenteiliges. Betont den Kontrast.",
      formation: "Verb-ます-Stamm + ながらも / い-Adj + ながらも / Nomen + ながらも",
      examples: [
        { japanese: "小さいながらも、居心地のいい部屋だ。", romaji: "Chiisai nagara mo, igokochi no ii heya da.", german: "Obwohl es klein ist, ist es ein gemütliches Zimmer." },
        { japanese: "残念ながらも、今回は参加できない。", romaji: "Zannen nagara mo, konkai wa sanka dekinai.", german: "Obwohl es bedauerlich ist, kann ich diesmal nicht teilnehmen." }
      ],
      notes: "ながら (gleichzeitig) vs. ながらも (obwohl) - Bedeutungsunterschied!",
      related: ["n2-mono-no"]
    },
    {
      id: "n2-nuki-ni-shite",
      pattern: "～ぬきにして",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "wenn man ... weglässt, ohne",
      explanation: "ぬきにして drückt aus, dass man einen bestimmten Aspekt bewusst auslässt oder beiseite lässt.",
      formation: "Nomen + (は)ぬきにして / ぬきにしても",
      examples: [
        { japanese: "冗談はぬきにして、真面目に話しましょう。", romaji: "Jōdan wa nuki ni shite, majime ni hanashimashō.", german: "Lassen wir die Scherze beiseite und reden wir ernsthaft." },
        { japanese: "お世辞ぬきにして、本当に素晴らしい作品だ。", romaji: "Oseji nuki ni shite, hontō ni subarashii sakuhin da.", german: "Ohne Schmeichelei, es ist wirklich ein großartiges Werk." }
      ],
      notes: "",
      related: ["n2-nuki-de"]
    },
    {
      id: "n2-wo-motte",
      pattern: "～をもって",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "mit, durch (formal); hiermit",
      explanation: "をもって wird in formellen Kontexten verwendet: 1) mit einem Mittel/einer Methode, 2) ab einem bestimmten Zeitpunkt (Frist).",
      formation: "Nomen + をもって",
      examples: [
        { japanese: "本日をもって、このサービスを終了いたします。", romaji: "Honjitsu wo motte, kono sābisu wo shūryō itashimasu.", german: "Hiermit (ab heute) stellen wir diesen Service ein." },
        { japanese: "誠意をもって対応する。", romaji: "Seii wo motte taiō suru.", german: "Mit Aufrichtigkeit reagieren." }
      ],
      notes: "Sehr formell, oft in Ankündigungen und Geschäftssprache.",
      related: []
    },
    {
      id: "n2-ni-ataru",
      pattern: "～に当たる",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "entsprechen, darstellen",
      explanation: "に当たる drückt aus, dass etwas einer bestimmten Kategorie entspricht oder einem bestimmten Konzept gleichkommt.",
      formation: "Nomen + に当たる",
      examples: [
        { japanese: "日本の「お盆」は、ドイツの「Allerheiligen」に当たる。", romaji: "Nihon no 'Obon' wa, Doitsu no 'Allerheiligen' ni ataru.", german: "Das japanische 'Obon' entspricht dem deutschen 'Allerheiligen'." },
        { japanese: "彼女は社長の娘に当たる。", romaji: "Kanojo wa shachō no musume ni ataru.", german: "Sie ist die Tochter des Firmenpräsidenten (sie entspricht dieser Beziehung)." }
      ],
      notes: "",
      related: []
    },
    {
      id: "n2-to-iu-koto-da",
      pattern: "～ということだ",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "es heißt dass, das bedeutet",
      explanation: "ということだ hat zwei Bedeutungen: 1) Hörensagen (man hat gehört, dass), 2) Schlussfolgerung (das bedeutet also).",
      formation: "Satz (plain) + ということだ",
      examples: [
        { japanese: "彼は来月結婚するということだ。", romaji: "Kare wa raigetsu kekkon suru to iu koto da.", german: "Es heißt, dass er nächsten Monat heiratet." },
        { japanese: "つまり、全員賛成だということですね。", romaji: "Tsumari, zen'in sansei da to iu koto desu ne.", german: "Das heißt also, alle sind einverstanden, richtig?" }
      ],
      notes: "Hörensagen oder logische Schlussfolgerung, je nach Kontext.",
      related: ["n2-to-iu-mono-da"]
    },
    {
      id: "n2-to-iu-mono-da",
      pattern: "～というものだ",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "das ist eben so, das ist die Natur von",
      explanation: "というものだ drückt eine grundlegende Wahrheit oder die wesentliche Natur von etwas aus. 'So ist das eben.'",
      formation: "Satz (plain) + というものだ",
      examples: [
        { japanese: "助け合うのが友情というものだ。", romaji: "Tasukeau no ga yūjō to iu mono da.", german: "Sich gegenseitig zu helfen, das ist wahre Freundschaft." },
        { japanese: "お金で買えないものがある。それが人生というものだ。", romaji: "Okane de kaenai mono ga aru. Sore ga jinsei to iu mono da.", german: "Es gibt Dinge, die man nicht kaufen kann. So ist das Leben eben." }
      ],
      notes: "",
      related: ["n2-to-iu-mono-dewa-nai"]
    },
    {
      id: "n2-to-iu-mono-dewa-nai",
      pattern: "～というものではない",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "es ist nicht unbedingt so, dass",
      explanation: "というものではない verneint eine vereinfachte oder absolute Aussage. Die Realität ist komplexer.",
      formation: "Verb-Grundform / い-Adj / な-Adj + というものではない",
      examples: [
        { japanese: "お金があれば幸せだというものではない。", romaji: "Okane ga areba shiawase da to iu mono dewa nai.", german: "Es ist nicht so, dass man glücklich ist, nur weil man Geld hat." },
        { japanese: "たくさん食べればいいというものではない。", romaji: "Takusan tabereba ii to iu mono dewa nai.", german: "Es ist nicht unbedingt so, dass es gut ist, viel zu essen." }
      ],
      notes: "Korrigiert eine zu einfache Sichtweise.",
      related: ["n2-to-iu-mono-da"]
    },
    {
      id: "n2-te-bakari-wa-irarenai",
      pattern: "～てばかりはいられない",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "kann nicht nur ... tun, muss auch anders handeln",
      explanation: "てばかりはいられない drückt aus, dass man nicht endlos in einem Zustand verharren kann und aktiv werden muss.",
      formation: "Verb-て形 + ばかりはいられない / ばかりもいられない",
      examples: [
        { japanese: "泣いてばかりはいられない。前に進まなくては。", romaji: "Naite bakari wa irarenai. Mae ni susumanakytte wa.", german: "Ich kann nicht nur weinen. Ich muss vorwärts gehen." },
        { japanese: "遊んでばかりはいられない、そろそろ仕事を始めよう。", romaji: "Asonde bakari wa irarenai, sorosoro shigoto wo hajimeyō.", german: "Ich kann nicht nur spielen, lass uns langsam mit der Arbeit anfangen." }
      ],
      notes: "",
      related: ["n2-te-wa-irarenai"]
    },
    {
      id: "n2-nai-mono-ka",
      pattern: "～ないものか",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "gibt es nicht eine Möglichkeit zu, kann man nicht irgendwie",
      explanation: "ないものか drückt einen starken Wunsch aus, dass etwas möglich sein möge. Der Sprecher sucht verzweifelt nach einer Lösung.",
      formation: "Verb-ない形 + ものか / ものだろうか",
      examples: [
        { japanese: "もっと簡単にできないものか。", romaji: "Motto kantan ni dekinai mono ka.", german: "Kann man es nicht irgendwie einfacher machen?" },
        { japanese: "何とかならないものだろうか。", romaji: "Nantoka naranai mono darō ka.", german: "Kann man da nicht irgendwie etwas machen?" }
      ],
      notes: "Rhetorisch, drückt Frustration und Wunsch aus.",
      related: []
    },
    {
      id: "n2-ni-kotaete",
      pattern: "～にこたえて",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "als Antwort auf, um zu entsprechen",
      explanation: "にこたえて drückt aus, dass man auf eine Erwartung, Bitte oder Nachfrage reagiert und ihr entspricht.",
      formation: "Nomen + にこたえて / にこたえる + Nomen",
      examples: [
        { japanese: "お客様の声にこたえて、新商品を開発した。", romaji: "Okyakusama no koe ni kotaete, shin-shōhin wo kaihatsu shita.", german: "Als Antwort auf die Kundenstimmen haben wir ein neues Produkt entwickelt." },
        { japanese: "期待にこたえるよう、頑張ります。", romaji: "Kitai ni kotaeru yō, ganbarimasu.", german: "Ich werde mich anstrengen, um den Erwartungen gerecht zu werden." }
      ],
      notes: "",
      related: ["n2-ni-ojite"]
    },
    {
      id: "n2-sae-ba",
      pattern: "～さえ～ば",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "wenn nur, solange nur",
      explanation: "さえ～ば drückt eine minimale Bedingung aus: Wenn nur diese eine Sache erfüllt ist, ist alles in Ordnung. Nichts anderes ist nötig.",
      formation: "Nomen + さえ + Verb-ば形 / Verb-ます-Stamm + さえすれば",
      examples: [
        { japanese: "お金さえあれば、旅行に行けるのに。", romaji: "Okane sae areba, ryokō ni ikeru no ni.", german: "Wenn ich nur Geld hätte, könnte ich verreisen." },
        { japanese: "練習さえすれば、上手になれる。", romaji: "Renshū sae sureba, jōzu ni nareru.", german: "Wenn man nur übt, kann man gut werden." }
      ],
      notes: "さえ betont die minimale, aber entscheidende Bedingung.",
      related: []
    },
    {
      id: "n2-ni-seyo",
      pattern: "～にせよ/にしろ",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "selbst wenn, ob ... oder",
      explanation: "にせよ/にしろ räumt verschiedene Möglichkeiten ein, sagt aber, dass das Ergebnis in jedem Fall gleich bleibt.",
      formation: "Verb-Grundform / Nomen + にせよ / にしろ / AにせよBにせよ",
      examples: [
        { japanese: "賛成にせよ反対にせよ、意見を言ってください。", romaji: "Sansei ni seyo hantai ni seyo, iken wo itte kudasai.", german: "Ob dafür oder dagegen, bitte äußern Sie Ihre Meinung." },
        { japanese: "理由が何にしろ、遅刻はよくない。", romaji: "Riyū ga nani ni shiro, chikoku wa yokunai.", german: "Was auch immer der Grund sein mag, Zuspätkommen ist nicht gut." }
      ],
      notes: "にせよ ist formeller, にしろ ist umgangssprachlicher.",
      related: ["n2-ni-shite-mo"]
    },
    {
      id: "n2-kawari-ni",
      pattern: "～かわりに",
      level: "N2",
      category: "Satzstrukturen",
      meaning: "anstatt, dafür aber, im Austausch für",
      explanation: "かわりに hat zwei Bedeutungen: 1) anstatt (als Ersatz), 2) dafür aber (Ausgleich - eine positive und eine negative Seite).",
      formation: "Verb-Grundform / Verb-た形 + かわりに / Nomen + のかわりに",
      examples: [
        { japanese: "タクシーのかわりにバスで行った。", romaji: "Takushī no kawari ni basu de itta.", german: "Anstatt mit dem Taxi bin ich mit dem Bus gefahren." },
        { japanese: "この部屋は狭いかわりに、家賃が安い。", romaji: "Kono heya wa semai kawari ni, yachin ga yasui.", german: "Dieses Zimmer ist zwar eng, dafür ist die Miete aber günstig." }
      ],
      notes: "",
      related: ["n2-ni-kawatte"]
    },
    // ============================================================
    // VERBEN (17)
    // ============================================================
    {
      id: "n2-zaru-wo-enai",
      pattern: "～ざるを得ない",
      level: "N2",
      category: "Verben",
      meaning: "nicht umhinkönnen, gezwungen sein zu",
      explanation: "ざるを得ない drückt aus, dass man keine andere Wahl hat und etwas tun muss, auch wenn man es nicht will. Formelle doppelte Verneinung.",
      formation: "Verb-ない-Stamm + ざるを得ない (Ausnahme: する → せざるを得ない)",
      examples: [
        { japanese: "証拠がある以上、認めざるを得ない。", romaji: "Shōko ga aru ijō, mitomezaru wo enai.", german: "Da es Beweise gibt, komme ich nicht umhin, es anzuerkennen." },
        { japanese: "上司の命令だから、従わざるを得ない。", romaji: "Jōshi no meirei dakara, shitagawazaru wo enai.", german: "Da es ein Befehl des Vorgesetzten ist, muss ich gehorchen." }
      ],
      notes: "する → せざるを得ない (unregelmäßig). Sehr formell.",
      related: ["n2-zu-niwa-irarenai"]
    },
    {
      id: "n2-zu-niwa-irarenai",
      pattern: "～ずにはいられない",
      level: "N2",
      category: "Verben",
      meaning: "kann nicht anders als, muss unwillkürlich",
      explanation: "ずにはいられない drückt aus, dass man ein Gefühl oder einen Impuls nicht unterdrücken kann. Man tut es unwillkürlich.",
      formation: "Verb-ない-Stamm + ずにはいられない (する → せずにはいられない)",
      examples: [
        { japanese: "この映画を見ると、泣かずにはいられない。", romaji: "Kono eiga wo miru to, nakazuni wa irarenai.", german: "Wenn ich diesen Film sehe, kann ich nicht anders als zu weinen." },
        { japanese: "彼の冗談を聞くと、笑わずにはいられない。", romaji: "Kare no jōdan wo kiku to, warawazuni wa irarenai.", german: "Wenn ich seine Witze höre, muss ich unwillkürlich lachen." }
      ],
      notes: "Emotionaler als ざるを得ない. Bezieht sich auf Gefühle/Impulse.",
      related: ["n2-zaru-wo-enai"]
    },
    {
      id: "n2-te-tamaranai",
      pattern: "～てたまらない",
      level: "N2",
      category: "Verben",
      meaning: "unerträglich, extrem, kann es nicht aushalten",
      explanation: "てたまらない drückt aus, dass ein Gefühl oder körperlicher Zustand so intensiv ist, dass man es kaum ertragen kann.",
      formation: "Verb-て形 / い-Adj-くて + たまらない / な-Adj + で + たまらない",
      examples: [
        { japanese: "暑くてたまらない。", romaji: "Atsukute tamaranai.", german: "Es ist unerträglich heiß." },
        { japanese: "合格の知らせを聞いて、嬉しくてたまらない。", romaji: "Gōkaku no shirase wo kiite, ureshikute tamaranai.", german: "Als ich die Nachricht hörte, dass ich bestanden habe, war ich unbeschreiblich glücklich." }
      ],
      notes: "Ähnlich wie てならない und てしょうがない.",
      related: ["n2-te-naranai", "n2-te-shou-ga-nai"]
    },
    {
      id: "n2-te-naranai",
      pattern: "～てならない",
      level: "N2",
      category: "Verben",
      meaning: "unwillkürlich, kann nicht aufhören zu",
      explanation: "てならない drückt ein unwillkürliches, nicht kontrollierbares Gefühl oder eine Empfindung aus. Formeller als てたまらない.",
      formation: "Verb-て形 / い-Adj-くて + ならない / な-Adj + で + ならない",
      examples: [
        { japanese: "彼のことが心配でならない。", romaji: "Kare no koto ga shinpai de naranai.", german: "Ich kann nicht aufhören, mir Sorgen um ihn zu machen." },
        { japanese: "故郷のことが懐かしくてならない。", romaji: "Furusato no koto ga natsukashikute naranai.", german: "Ich bin unwillkürlich nostalgisch, wenn ich an meine Heimat denke." }
      ],
      notes: "Formeller als てたまらない. Oft bei Emotionen.",
      related: ["n2-te-tamaranai"]
    },
    {
      id: "n2-te-shou-ga-nai",
      pattern: "～てしょうがない",
      level: "N2",
      category: "Verben",
      meaning: "man kann nichts dagegen tun, extrem",
      explanation: "てしょうがない drückt aus, dass ein Gefühl so stark ist, dass man nichts dagegen tun kann. Umgangssprachlicher als てならない.",
      formation: "Verb-て形 / い-Adj-くて + しょうがない / な-Adj + で + しょうがない",
      examples: [
        { japanese: "お腹が空いてしょうがない。", romaji: "Onaka ga suite shō ga nai.", german: "Ich bin so hungrig, ich kann nichts dagegen tun." },
        { japanese: "気になってしょうがない。", romaji: "Ki ni natte shō ga nai.", german: "Es lässt mir keine Ruhe." }
      ],
      notes: "しかたがない ist die formellere Version. Umgangssprache: しょうがない.",
      related: ["n2-te-tamaranai"]
    },
    {
      id: "n2-kaneru",
      pattern: "～かねる",
      level: "N2",
      category: "Verben",
      meaning: "nicht in der Lage sein zu, schwer zu, leider nicht können",
      explanation: "かねる drückt höflich aus, dass man etwas nicht tun kann. Oft in der Geschäftssprache als höfliche Ablehnung verwendet.",
      formation: "Verb-ます-Stamm + かねる",
      examples: [
        { japanese: "その質問にはお答えしかねます。", romaji: "Sono shitsumon niwa okotae shikanemasu.", german: "Ich kann Ihnen diese Frage leider nicht beantworten." },
        { japanese: "この条件では引き受けかねる。", romaji: "Kono jōken dewa hikiuke kaneru.", german: "Unter diesen Bedingungen kann ich es leider nicht übernehmen." }
      ],
      notes: "Höfliche Ablehnung. Häufig im Geschäftsjapanisch.",
      related: ["n2-kanenai"]
    },
    {
      id: "n2-kanenai",
      pattern: "～かねない",
      level: "N2",
      category: "Verben",
      meaning: "könnte möglicherweise, es besteht die Gefahr dass",
      explanation: "かねない warnt davor, dass etwas Negatives passieren könnte. Es ist nicht unwahrscheinlich.",
      formation: "Verb-ます-Stamm + かねない",
      examples: [
        { japanese: "このまま放っておくと、大事故になりかねない。", romaji: "Kono mama hōtte oku to, daijiko ni narikanenai.", german: "Wenn man es so lässt, könnte es zu einem schweren Unfall kommen." },
        { japanese: "その発言は誤解を招きかねない。", romaji: "Sono hatsugen wa gokai wo manekikanenai.", german: "Diese Aussage könnte Missverständnisse hervorrufen." }
      ],
      notes: "Immer negatives Potenzial. Warnung.",
      related: ["n2-kaneru", "n2-osore-ga-aru"]
    },
    {
      id: "n2-uru-enai",
      pattern: "～得る/～得ない",
      level: "N2",
      category: "Verben",
      meaning: "möglich sein / unmöglich sein",
      explanation: "得る (うる/える) drückt aus, dass etwas möglich ist, 得ない (えない) dass es unmöglich ist. Formell.",
      formation: "Verb-ます-Stamm + 得る(うる/える) / 得ない(えない)",
      examples: [
        { japanese: "そんなことはあり得ない。", romaji: "Sonna koto wa arienai.", german: "So etwas ist unmöglich." },
        { japanese: "十分に起こり得ることだ。", romaji: "Jūbun ni okoriuru koto da.", german: "Es ist etwas, das durchaus passieren kann." }
      ],
      notes: "得る kann うる oder える gelesen werden. 得ない wird immer えない gelesen.",
      related: []
    },
    {
      id: "n2-kiru",
      pattern: "～きる/きれる/きれない",
      level: "N2",
      category: "Verben",
      meaning: "vollständig tun / schaffen / nicht schaffen können",
      explanation: "きる drückt aus, dass eine Handlung vollständig oder bis zum Ende durchgeführt wird. きれない bedeutet, dass man es nicht vollständig schaffen kann.",
      formation: "Verb-ます-Stamm + きる / きれる / きれない",
      examples: [
        { japanese: "マラソンを走りきった。", romaji: "Marason wo hashirikitta.", german: "Ich habe den Marathon bis zum Ende gelaufen." },
        { japanese: "食べきれないほどの料理が出た。", romaji: "Tabekirenai hodo no ryōri ga deta.", german: "Es wurden so viele Gerichte serviert, dass man sie nicht aufessen konnte." }
      ],
      notes: "きる = komplett; きれない = nicht komplett möglich.",
      related: ["n2-nuku"]
    },
    {
      id: "n2-nuku",
      pattern: "～抜く",
      level: "N2",
      category: "Verben",
      meaning: "bis zum Ende durchziehen, gründlich tun",
      explanation: "抜く drückt aus, dass eine schwierige Handlung trotz Anstrengung bis zum Ende durchgeführt wird. Betont Ausdauer und Entschlossenheit.",
      formation: "Verb-ます-Stamm + 抜く",
      examples: [
        { japanese: "最後まで走り抜いた。", romaji: "Saigo made hashinuita.", german: "Ich bin bis zum Ende gelaufen (habe durchgehalten)." },
        { japanese: "考え抜いた結果、留学を決めた。", romaji: "Kangaenuita kekka, ryūgaku wo kimeta.", german: "Nach gründlichem Nachdenken habe ich mich für ein Auslandsstudium entschieden." }
      ],
      notes: "Betont stärker die Mühe und Anstrengung als きる.",
      related: ["n2-kiru"]
    },
    {
      id: "n2-you-ga-nai",
      pattern: "～ようがない",
      level: "N2",
      category: "Verben",
      meaning: "es gibt keine Möglichkeit zu, man kann beim besten Willen nicht",
      explanation: "ようがない drückt aus, dass es absolut keine Methode oder Möglichkeit gibt, etwas zu tun.",
      formation: "Verb-ます-Stamm + ようがない / ようもない",
      examples: [
        { japanese: "住所が分からないので、連絡のしようがない。", romaji: "Jūsho ga wakaranai no de, renraku no shiyō ga nai.", german: "Da ich die Adresse nicht kenne, gibt es keine Möglichkeit, Kontakt aufzunehmen." },
        { japanese: "証拠がないので、証明のしようがない。", romaji: "Shōko ga nai no de, shōmei no shiyō ga nai.", german: "Da es keine Beweise gibt, kann man es unmöglich beweisen." }
      ],
      notes: "",
      related: []
    },
    {
      id: "n2-gatai",
      pattern: "～がたい",
      level: "N2",
      category: "Verben",
      meaning: "schwer zu, kaum möglich zu",
      explanation: "がたい drückt aus, dass etwas psychologisch oder emotional sehr schwer zu tun ist. Formell.",
      formation: "Verb-ます-Stamm + がたい",
      examples: [
        { japanese: "信じがたい話だ。", romaji: "Shinjigatai hanashi da.", german: "Es ist eine schwer zu glaubende Geschichte." },
        { japanese: "彼の行動は理解しがたい。", romaji: "Kare no kōdō wa rikai shigatai.", german: "Sein Verhalten ist schwer zu verstehen." }
      ],
      notes: "Formeller als ～にくい. Oft bei abstrakten Konzepten (glauben, verstehen, vergessen).",
      related: []
    },
    {
      id: "n2-tsutsu",
      pattern: "～つつ",
      level: "N2",
      category: "Verben",
      meaning: "während, obwohl (gleichzeitig)",
      explanation: "つつ hat zwei Bedeutungen: 1) während (zwei gleichzeitige Handlungen), 2) obwohl (widersprüchliche Handlungen). Literarisch/formell.",
      formation: "Verb-ます-Stamm + つつ",
      examples: [
        { japanese: "景色を楽しみつつ、散歩した。", romaji: "Keshiki wo tanoshimitsutsu, sanpo shita.", german: "Ich machte einen Spaziergang, während ich die Landschaft genoss." },
        { japanese: "悪いと知りつつ、食べすぎてしまう。", romaji: "Warui to shiritsutsu, tabesugite shimau.", german: "Obwohl ich weiß, dass es schlecht ist, esse ich zu viel." }
      ],
      notes: "Formeller als ながら. Schriftsprache.",
      related: ["n2-tsutsu-aru"]
    },
    {
      id: "n2-tsutsu-aru",
      pattern: "～つつある",
      level: "N2",
      category: "Verben",
      meaning: "dabei sein zu, im Prozess von, zunehmend",
      explanation: "つつある drückt aus, dass eine Veränderung gerade im Gang ist und sich fortsetzt. Formeller Ausdruck für einen laufenden Prozess.",
      formation: "Verb-ます-Stamm + つつある",
      examples: [
        { japanese: "状況は改善しつつある。", romaji: "Jōkyō wa kaizen shitsutsu aru.", german: "Die Situation ist dabei, sich zu verbessern." },
        { japanese: "この伝統は失われつつある。", romaji: "Kono dentō wa ushinawaretsutsu aru.", german: "Diese Tradition ist dabei, verloren zu gehen." }
      ],
      notes: "Formell, oft in Nachrichten und Berichten.",
      related: ["n2-tsutsu"]
    },
    {
      id: "n2-mai",
      pattern: "～まい",
      level: "N2",
      category: "Verben",
      meaning: "werde nicht, wahrscheinlich nicht, will nicht",
      explanation: "まい drückt aus: 1) starke Absicht, etwas nicht zu tun (Entschlossenheit), 2) Vermutung, dass etwas wahrscheinlich nicht geschehen wird.",
      formation: "Verb-Grundform + まい (Gruppe 1) / Verb-ます-Stamm + まい (Gruppe 2) / するまい, 来まい",
      examples: [
        { japanese: "二度とあんな失敗はするまい。", romaji: "Nido to anna shippai wa surumai.", german: "So einen Fehler werde ich nie wieder machen." },
        { japanese: "彼はもう来るまい。", romaji: "Kare wa mō kurumai.", german: "Er wird wohl nicht mehr kommen." }
      ],
      notes: "Etwas altmodisch/literarisch. Alltagssprache: ～ないだろう.",
      related: []
    },
    {
      id: "n2-te-wa-irarenai",
      pattern: "～てはいられない",
      level: "N2",
      category: "Verben",
      meaning: "kann nicht weiter, kann es sich nicht leisten zu",
      explanation: "てはいられない drückt aus, dass man einen bestimmten Zustand nicht fortsetzen kann, weil die Situation es nicht erlaubt.",
      formation: "Verb-て形 + はいられない / てもいられない",
      examples: [
        { japanese: "いつまでも待ってはいられない。", romaji: "Itsu made mo matte wa irarenai.", german: "Ich kann nicht ewig warten." },
        { japanese: "のんびりしてはいられない、締め切りが近い。", romaji: "Nonbiri shite wa irarenai, shimekiri ga chikai.", german: "Ich kann nicht gemütlich sein, die Frist ist nahe." }
      ],
      notes: "",
      related: ["n2-te-bakari-wa-irarenai"]
    },
    {
      id: "n2-you-to-suru",
      pattern: "～ようとする",
      level: "N2",
      category: "Verben",
      meaning: "versuchen zu, im Begriff sein zu",
      explanation: "ようとする drückt den Versuch oder die Absicht aus, etwas zu tun. Kann auch den Moment kurz vor einer Handlung beschreiben.",
      formation: "Verb-よう形 + とする",
      examples: [
        { japanese: "ドアを開けようとしたが、鍵がかかっていた。", romaji: "Doa wo akeyō to shita ga, kagi ga kakatte ita.", german: "Ich versuchte die Tür zu öffnen, aber sie war abgeschlossen." },
        { japanese: "寝ようとした時、電話が鳴った。", romaji: "Neyō to shita toki, denwa ga natta.", german: "Gerade als ich schlafen gehen wollte, klingelte das Telefon." }
      ],
      notes: "",
      related: ["n2-you-to-shinai"]
    },
    {
      id: "n2-you-to-shinai",
      pattern: "～ようとしない",
      level: "N2",
      category: "Verben",
      meaning: "will nicht (einmal versuchen), weigert sich zu",
      explanation: "ようとしない drückt aus, dass jemand nicht einmal den Versuch macht, etwas zu tun. Kritischer Unterton.",
      formation: "Verb-よう形 + としない",
      examples: [
        { japanese: "子供が野菜を食べようとしない。", romaji: "Kodomo ga yasai wo tabeyō to shinai.", german: "Das Kind will kein Gemüse essen (versucht es nicht einmal)." },
        { japanese: "彼は自分の間違いを認めようとしない。", romaji: "Kare wa jibun no machigai wo mitomeyō to shinai.", german: "Er will seinen Fehler nicht einmal anerkennen." }
      ],
      notes: "Impliziert Kritik am fehlenden Willen.",
      related: ["n2-you-to-suru"]
    },
    {
      id: "n2-ni-kakawaru",
      pattern: "～にかかわる",
      level: "N2",
      category: "Verben",
      meaning: "betreffen, zusammenhängen mit, auf dem Spiel stehen",
      explanation: "にかかわる drückt aus, dass etwas eng mit einer wichtigen Sache verbunden ist oder diese beeinflusst.",
      formation: "Nomen + にかかわる",
      examples: [
        { japanese: "命にかかわる問題だ。", romaji: "Inochi ni kakawaru mondai da.", german: "Es ist ein Problem, bei dem es um Leben und Tod geht." },
        { japanese: "会社の信用にかかわる事態だ。", romaji: "Kaisha no shin'yō ni kakawaru jitai da.", german: "Es ist eine Situation, die den Ruf der Firma betrifft." }
      ],
      notes: "Oft bei ernsten, wichtigen Themen.",
      related: []
    },
    // ============================================================
    // ADJEKTIVE (7)
    // ============================================================
    {
      id: "n2-ppoi",
      pattern: "～っぽい",
      level: "N2",
      category: "Adjektive",
      meaning: "-artig, -mäßig, neigt zu, wirkt wie",
      explanation: "っぽい wird an Nomen, Verben oder Adjektive angehängt und drückt aus, dass etwas den Anschein hat oder eine Tendenz zeigt. Oft leicht negativ.",
      formation: "Nomen / Verb-ます-Stamm / い-Adj-Stamm + っぽい",
      examples: [
        { japanese: "彼女は怒りっぽい性格だ。", romaji: "Kanojo wa okorippoi seikaku da.", german: "Sie hat einen leicht reizbaren Charakter." },
        { japanese: "この色は白っぽい。", romaji: "Kono iro wa shiroppoi.", german: "Diese Farbe ist weißlich." }
      ],
      notes: "忘れっぽい (vergesslich), 子供っぽい (kindisch), 飽きっぽい (schnell gelangweilt).",
      related: ["n2-gimi", "n2-gachi"]
    },
    {
      id: "n2-gimi",
      pattern: "～気味",
      level: "N2",
      category: "Adjektive",
      meaning: "ein wenig, leichte Tendenz zu, etwas",
      explanation: "気味 drückt eine leichte, beginnende Tendenz aus. Oft bei negativen körperlichen oder emotionalen Zuständen.",
      formation: "Verb-ます-Stamm / Nomen + 気味",
      examples: [
        { japanese: "最近、風邪気味だ。", romaji: "Saikin, kaze-gimi da.", german: "In letzter Zeit habe ich eine leichte Erkältung." },
        { japanese: "太り気味なので、ダイエットを始めた。", romaji: "Futori-gimi na no de, daietto wo hajimeta.", german: "Da ich etwas zugenommen habe, habe ich eine Diät angefangen." }
      ],
      notes: "Schwächer als っぽい. Beschreibt einen leichten Trend.",
      related: ["n2-ppoi", "n2-gachi"]
    },
    {
      id: "n2-gachi",
      pattern: "～がち",
      level: "N2",
      category: "Adjektive",
      meaning: "neigen zu, dazu tendieren (negativ)",
      explanation: "がち drückt aus, dass etwas häufig oder leicht passiert. Fast immer mit negativen Tendenzen verwendet.",
      formation: "Verb-ます-Stamm / Nomen + がち",
      examples: [
        { japanese: "冬は風邪をひきがちだ。", romaji: "Fuyu wa kaze wo hikigachi da.", german: "Im Winter neigt man dazu, sich zu erkälten." },
        { japanese: "忙しいと、食事を抜きがちになる。", romaji: "Isogashii to, shokuji wo nukigachi ni naru.", german: "Wenn man beschäftigt ist, neigt man dazu, Mahlzeiten ausfallen zu lassen." }
      ],
      notes: "Fast immer negativ. 遠慮がち (zurückhaltend), 留守がち (oft nicht da).",
      related: ["n2-ppoi", "n2-gimi"]
    },
    {
      id: "n2-muki",
      pattern: "～向き",
      level: "N2",
      category: "Adjektive",
      meaning: "geeignet für, passend für",
      explanation: "向き beschreibt, dass etwas für eine bestimmte Zielgruppe oder einen bestimmten Zweck geeignet oder passend ist.",
      formation: "Nomen + 向き(の/に/だ)",
      examples: [
        { japanese: "この本は初心者向きだ。", romaji: "Kono hon wa shoshinsha muki da.", german: "Dieses Buch ist für Anfänger geeignet." },
        { japanese: "家族向きのレストランを探している。", romaji: "Kazoku muki no resutoran wo sagashite iru.", german: "Ich suche ein Restaurant, das für Familien geeignet ist." }
      ],
      notes: "Unterschied: 向き = geeignet (natürliche Eignung), 向け = gezielt ausgerichtet.",
      related: ["n2-muke"]
    },
    {
      id: "n2-muke",
      pattern: "～向け",
      level: "N2",
      category: "Adjektive",
      meaning: "ausgerichtet auf, gedacht für, für ... bestimmt",
      explanation: "向け beschreibt, dass etwas speziell für eine bestimmte Zielgruppe hergestellt oder ausgerichtet wurde.",
      formation: "Nomen + 向け(の/に)",
      examples: [
        { japanese: "この番組は子供向けだ。", romaji: "Kono bangumi wa kodomo muke da.", german: "Diese Sendung ist für Kinder bestimmt." },
        { japanese: "外国人向けの日本語教材を開発した。", romaji: "Gaikokujin muke no Nihongo kyōzai wo kaihatsu shita.", german: "Wir haben Japanisch-Lehrmaterial für Ausländer entwickelt." }
      ],
      notes: "Unterschied: 向け = gezielt hergestellt/ausgerichtet, 向き = natürlich geeignet.",
      related: ["n2-muki"]
    },
    {
      id: "n2-darake",
      pattern: "～だらけ",
      level: "N2",
      category: "Adjektive",
      meaning: "voller, übersät mit, voll von (negativ)",
      explanation: "だらけ drückt aus, dass etwas voll von etwas Unerwünschtem ist. Fast immer negativ.",
      formation: "Nomen + だらけ",
      examples: [
        { japanese: "この作文は間違いだらけだ。", romaji: "Kono sakubun wa machigai darake da.", german: "Dieser Aufsatz ist voller Fehler." },
        { japanese: "子供が泥だらけになって帰ってきた。", romaji: "Kodomo ga doro darake ni natte kaette kita.", german: "Das Kind kam voller Schlamm nach Hause." }
      ],
      notes: "Fast immer negativ. 借金だらけ (voller Schulden), 傷だらけ (voller Wunden).",
      related: []
    },
    {
      id: "n2-ge",
      pattern: "～げ",
      level: "N2",
      category: "Adjektive",
      meaning: "den Anschein haben, scheinen als ob",
      explanation: "げ wird an Adjektive oder bestimmte Nomen angehängt und beschreibt, dass jemand ein bestimmtes Gefühl oder einen bestimmten Eindruck vermittelt.",
      formation: "い-Adj-Stamm + げ / な-Adj-Stamm + げ / Nomen + げ",
      examples: [
        { japanese: "彼女は悲しげな表情をしていた。", romaji: "Kanojo wa kanashige na hyōjō wo shite ita.", german: "Sie hatte einen traurig wirkenden Gesichtsausdruck." },
        { japanese: "子供たちは楽しげに遊んでいる。", romaji: "Kodomotachi wa tanoshige ni asonde iru.", german: "Die Kinder spielen auf eine fröhlich wirkende Weise." }
      ],
      notes: "Beschreibt den äußeren Eindruck, nicht die tatsächliche Emotion. 寂しげ, 嬉しげ, 不安げ.",
      related: []
    }
  ];
  // Merge with existing grammar data
  if (window.GRAMMAR_DATA) {
    window.GRAMMAR_DATA = window.GRAMMAR_DATA.concat(n2Grammar);
  } else {
    window.GRAMMAR_DATA = n2Grammar;
  }
})();
