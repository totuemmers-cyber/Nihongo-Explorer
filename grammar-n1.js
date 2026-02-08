(function() {
  var n1Grammar = [
    // ============================================================
    // PARTIKEL (45)
    // ============================================================
    {
      id: "n1-kara-shite",
      pattern: "～からして",
      level: "N1",
      category: "Partikel",
      meaning: "schon allein von ... her",
      explanation: "からして drückt aus, dass schon das erste oder offensichtlichste Beispiel ausreicht, um ein Urteil zu fällen. Oft negativ konnotiert. Es betont, dass bereits das erste Anzeichen etwas über das Ganze aussagt.",
      formation: "Nomen + からして",
      examples: [
        { japanese: "彼は態度からして失礼だ。", romaji: "Kare wa taido kara shite shitsurei da.", german: "Schon allein seine Haltung ist unhöflich." },
        { japanese: "この店は外観からして高そうだ。", romaji: "Kono mise wa gaikan kara shite takasō da.", german: "Schon vom Äußeren her wirkt dieser Laden teuer." }
      ],
      notes: "Nicht verwechseln mit からすると (Standpunkt). からして betont das erste Anzeichen.",
      related: ["n1-kara-suru-to"]
    },
    {
      id: "n1-kara-suru-to",
      pattern: "～からすると/～からすれば",
      level: "N1",
      category: "Partikel",
      meaning: "vom Standpunkt ... aus gesehen",
      explanation: "からすると/からすれば drückt aus, dass man etwas aus einer bestimmten Perspektive oder aufgrund bestimmter Informationen beurteilt. Es wird verwendet, um eine Schlussfolgerung oder Meinung basierend auf einem Standpunkt zu formulieren.",
      formation: "Nomen + からすると/からすれば",
      examples: [
        { japanese: "彼の様子からすると、何か問題があるようだ。", romaji: "Kare no yōsu kara suru to, nanika mondai ga aru yō da.", german: "Von seinem Verhalten her zu urteilen, scheint es ein Problem zu geben." },
        { japanese: "経験からすれば、この方法が一番効果的だ。", romaji: "Keiken kara sureba, kono hōhō ga ichiban kōkateki da.", german: "Von meiner Erfahrung her gesehen ist diese Methode am effektivsten." }
      ],
      notes: "Ähnlich wie から見ると, aber formeller und oft für Schlussfolgerungen verwendet.",
      related: ["n1-kara-shite", "n2-kara-miru-to"]
    },
    {
      id: "n1-tari-tomo-nai",
      pattern: "～たりとも～ない",
      level: "N1",
      category: "Partikel",
      meaning: "nicht einmal ein einziges",
      explanation: "たりとも～ない ist eine sehr nachdrückliche Verneinung, die betont, dass nicht einmal die geringste Menge oder Anzahl akzeptabel ist. Es wird oft mit Wörtern wie 一人、一つ、一日 verwendet und hat einen formellen, literarischen Ton.",
      formation: "Zählwort + たりとも + Verneinung",
      examples: [
        { japanese: "一日たりとも休むことはできない。", romaji: "Ichinichi tari tomo yasumu koto wa dekinai.", german: "Ich kann nicht einen einzigen Tag ausruhen." },
        { japanese: "一人たりとも見逃すわけにはいかない。", romaji: "Hitori tari tomo minogasu wake ni wa ikanai.", german: "Ich darf nicht eine einzige Person entkommen lassen." }
      ],
      notes: "Sehr formell und nachdrücklich. Wird hauptsächlich in geschriebener oder formeller Sprache verwendet.",
      related: ["n1-desura", "n2-sae"]
    },
    {
      id: "n1-de-are",
      pattern: "～であれ",
      level: "N1",
      category: "Partikel",
      meaning: "selbst wenn, ob",
      explanation: "であれ drückt aus, dass etwas unabhängig von den Umständen oder Bedingungen gilt. Es kann allein verwendet werden oder in der Form であれ～であれ. Diese Struktur hat einen formellen, schriftlichen Charakter.",
      formation: "Nomen + であれ / Fragepronomen + であれ",
      examples: [
        { japanese: "誰であれ、ルールを守らなければならない。", romaji: "Dare de are, rūru o mamora nakereba naranai.", german: "Wer auch immer es ist, muss die Regeln befolgen." },
        { japanese: "どんな理由であれ、暴力は許されない。", romaji: "Donna riyū de are, bōryoku wa yurusarenai.", german: "Welcher Grund auch immer, Gewalt ist nicht zu verzeihen." }
      ],
      notes: "Oft mit Fragepronomen wie 誰、何、どんな verwendet. Sehr formell.",
      related: ["n1-de-are-de-are", "n2-to-shite-mo"]
    },
    {
      id: "n1-de-are-de-are",
      pattern: "～であれ～であれ",
      level: "N1",
      category: "Partikel",
      meaning: "ob ... oder ..., egal ob",
      explanation: "であれ～であれ drückt aus, dass etwas unabhängig davon gilt, welche von mehreren Alternativen zutrifft. Es betont, dass das Ergebnis oder die Konsequenz in allen Fällen gleich ist. Diese Form ist sehr formell und wird hauptsächlich in geschriebener Sprache verwendet.",
      formation: "Nomen + であれ + Nomen + であれ",
      examples: [
        { japanese: "昼であれ夜であれ、いつでも連絡してください。", romaji: "Hiru de are yoru de are, itsu demo renraku shite kudasai.", german: "Ob Tag oder Nacht, kontaktieren Sie mich jederzeit." },
        { japanese: "男性であれ女性であれ、平等に扱うべきだ。", romaji: "Dansei de are josei de are, byōdō ni atsukau beki da.", german: "Ob Mann oder Frau, sie sollten gleich behandelt werden." }
      ],
      notes: "Formeller als ～でも～でも. Wird in offiziellen Kontexten bevorzugt.",
      related: ["n1-de-are", "n2-demo-demo"]
    },
    {
      id: "n1-desura",
      pattern: "～ですら",
      level: "N1",
      category: "Partikel",
      meaning: "sogar, selbst",
      explanation: "ですら ist eine nachdrückliche Partikel, die ausdrückt, dass selbst etwas Unerwartetes oder Extremes der Fall ist. Es ist stärker als でさえ und wird verwendet, um Überraschung oder Betonung auszudrücken. Oft wird damit ein extremes Beispiel angeführt.",
      formation: "Nomen + ですら",
      examples: [
        { japanese: "子供ですらできることが、彼にはできない。", romaji: "Kodomo desura dekiru koto ga, kare ni wa dekinai.", german: "Was selbst ein Kind kann, kann er nicht." },
        { japanese: "親ですら彼の行動を理解できなかった。", romaji: "Oya desura kare no kōdō o rikai dekinakatta.", german: "Selbst seine Eltern konnten sein Verhalten nicht verstehen." }
      ],
      notes: "Formeller und nachdrücklicher als でさえ. Nicht in der gesprochenen Umgangssprache üblich.",
      related: ["n2-desae", "n1-tari-tomo-nai"]
    },
    {
      id: "n1-to-mo-naru-to",
      pattern: "～ともなると/～ともなれば",
      level: "N1",
      category: "Partikel",
      meaning: "wenn es so weit kommt dass",
      explanation: "ともなると/ともなれば drückt aus, dass bei einem bestimmten hohen Level, Status oder Stadium besondere Umstände oder Erwartungen gelten. Es betont, dass die Situation oder der Status nicht gewöhnlich ist und daher besondere Konsequenzen hat.",
      formation: "Nomen + ともなると/ともなれば",
      examples: [
        { japanese: "社長ともなると、責任も重くなる。", romaji: "Shachō to mo naru to, sekinin mo omoku naru.", german: "Wenn man Geschäftsführer ist, wird auch die Verantwortung schwerer." },
        { japanese: "プロともなれば、毎日の練習が欠かせない。", romaji: "Puro to mo nareba, mainichi no renshū ga kakasenai.", german: "Wenn man Profi ist, ist tägliches Training unverzichtbar." }
      ],
      notes: "Betont einen besonderen Status oder Level. Oft mit になると austauschbar, aber ともなると ist nachdrücklicher.",
      related: ["n2-to-naru-to", "n1-to-are-ba"]
    },
    {
      id: "n1-nara-de-wa",
      pattern: "～ならでは",
      level: "N1",
      category: "Partikel",
      meaning: "nur möglich bei, einzigartig für",
      explanation: "ならでは drückt aus, dass etwas nur für eine bestimmte Person, einen Ort oder eine Sache charakteristisch oder möglich ist. Es betont die Einzigartigkeit oder Besonderheit. Diese Konstruktion wird oft verwendet, um positive, einzigartige Eigenschaften hervorzuheben.",
      formation: "Nomen + ならでは (+ の + Nomen)",
      examples: [
        { japanese: "これは京都ならではの料理だ。", romaji: "Kore wa Kyōto nara de wa no ryōri da.", german: "Das ist ein Gericht, das nur in Kyoto möglich ist." },
        { japanese: "彼ならではのアイデアだ。", romaji: "Kare nara de wa no aidea da.", german: "Das ist eine Idee, die nur er haben kann." }
      ],
      notes: "Positiv konnotiert. Betont Einzigartigkeit und besondere Qualitäten.",
      related: ["n2-ni-kagitte", "n1-wo-oite-hoka-ni-nai"]
    },
    {
      id: "n1-ni-atte",
      pattern: "～にあって",
      level: "N1",
      category: "Partikel",
      meaning: "in der Situation von",
      explanation: "にあって drückt aus, dass etwas in einer besonderen oder außergewöhnlichen Situation geschieht. Es wird verwendet, um den Kontext oder die Umstände hervorzuheben, unter denen etwas stattfindet. Diese Konstruktion ist sehr formell und wird hauptsächlich in geschriebener Sprache verwendet.",
      formation: "Nomen + にあって",
      examples: [
        { japanese: "困難な状況にあっても、希望を失わない。", romaji: "Konnan na jōkyō ni atte mo, kibō o ushinawanai.", german: "Selbst in schwierigen Situationen verliert man die Hoffnung nicht." },
        { japanese: "このような危機にあって、団結が必要だ。", romaji: "Kono yō na kiki ni atte, danketsu ga hitsuyō da.", german: "In einer solchen Krise ist Zusammenhalt notwendig." }
      ],
      notes: "Sehr formell. Wird für außergewöhnliche oder besondere Situationen verwendet.",
      related: ["n2-ni-oite", "n1-to-atte"]
    },
    {
      id: "n1-ni-kakawaru",
      pattern: "～にかかわる",
      level: "N1",
      category: "Partikel",
      meaning: "betreffend, was betrifft",
      explanation: "にかかわる drückt aus, dass etwas mit einer wichtigen Sache oder einem wichtigen Aspekt zusammenhängt oder diese betrifft. Es wird oft verwendet, wenn es um ernste oder bedeutende Angelegenheiten geht, wie Leben, Ehre, oder wichtige Entscheidungen.",
      formation: "Nomen + にかかわる",
      examples: [
        { japanese: "これは会社の存続にかかわる問題だ。", romaji: "Kore wa kaisha no sonzoku ni kakawaru mondai da.", german: "Das ist ein Problem, das das Überleben der Firma betrifft." },
        { japanese: "命にかかわる事態だから、慎重に行動しよう。", romaji: "Inochi ni kakawaru jitai da kara, shinchō ni kōdō shiyō.", german: "Da es eine Situation ist, die das Leben betrifft, sollten wir vorsichtig handeln." }
      ],
      notes: "Wird für ernste, wichtige Angelegenheiten verwendet. Betont die Bedeutung der Sache.",
      related: ["n2-ni-kansuru", "n1-ni-oite"]
    },
    {
      id: "n1-ni-shite",
      pattern: "～にして",
      level: "N1",
      category: "Partikel",
      meaning: "erst bei/mit, und gleichzeitig",
      explanation: "にして hat mehrere Bedeutungen: 1) Es drückt aus, dass etwas erst bei einem bestimmten Punkt oder Level erreicht wird. 2) Es kann auch bedeuten, dass jemand oder etwas gleichzeitig zwei Eigenschaften oder Rollen hat. Diese Konstruktion ist sehr formell und literarisch.",
      formation: "Nomen + にして",
      examples: [
        { japanese: "彼は作家にして画家でもある。", romaji: "Kare wa sakka ni shite gaka demo aru.", german: "Er ist Schriftsteller und gleichzeitig auch Maler." },
        { japanese: "50歳にして初めて成功を収めた。", romaji: "Gojussai ni shite hajimete seikō o osameta.", german: "Erst mit 50 Jahren erzielte er seinen ersten Erfolg." }
      ],
      notes: "Sehr formell und literarisch. Hat verschiedene Nuancen je nach Kontext.",
      related: ["n2-de-atte", "n1-to-mo-naru-to"]
    },
    {
      id: "n1-ni-sokushite",
      pattern: "～にそくして/～に即して",
      level: "N1",
      category: "Partikel",
      meaning: "gemäß, in Übereinstimmung mit",
      explanation: "にそくして/に即して drückt aus, dass etwas in Übereinstimmung mit bestimmten Regeln, Prinzipien oder der Realität durchgeführt wird. Es betont, dass man sich strikt an etwas orientiert oder hält. Diese Ausdrucksweise ist formell und wird oft in geschäftlichen oder akademischen Kontexten verwendet.",
      formation: "Nomen + にそくして/に即して",
      examples: [
        { japanese: "現実に即して計画を立てる必要がある。", romaji: "Genjitsu ni sokushite keikaku o tateru hitsuyō ga aru.", german: "Es ist notwendig, einen Plan gemäß der Realität aufzustellen." },
        { japanese: "規則に即して処理してください。", romaji: "Kisoku ni sokushite shori shite kudasai.", german: "Bitte bearbeiten Sie es gemäß den Vorschriften." }
      ],
      notes: "Formell. Betont strikte Übereinstimmung mit Regeln oder Realität.",
      related: ["n2-ni-shitagatte", "n1-wo-motte"]
    },
    {
      id: "n1-ni-taeru",
      pattern: "～にたえる/～にたえない",
      level: "N1",
      category: "Partikel",
      meaning: "wert sein / unerträglich",
      explanation: "にたえる hat zwei gegensätzliche Bedeutungen: 1) In positiver Form bedeutet es, dass etwas wert ist (鑑賞に堪える = wert anzusehen). 2) In negativer Form (にたえない) bedeutet es, dass etwas unerträglich ist oder man etwas nicht ertragen kann. Der Kontext bestimmt die Bedeutung.",
      formation: "Nomen + にたえる/にたえない",
      examples: [
        { japanese: "この作品は鑑賞に堪える名作だ。", romaji: "Kono sakuhin wa kanshō ni taeru meisaku da.", german: "Dieses Werk ist ein Meisterwerk, das es wert ist, betrachtet zu werden." },
        { japanese: "この痛みは耐えるに堪えない。", romaji: "Kono itami wa taeru ni taenai.", german: "Dieser Schmerz ist nicht zu ertragen." }
      ],
      notes: "Sehr formell. Die Bedeutung hängt stark vom Kontext ab (positiv vs. negativ).",
      related: ["n1-ni-ataru", "n1-ni-taru"]
    },
    {
      id: "n1-ni-todomarazu",
      pattern: "～にとどまらず",
      level: "N1",
      category: "Partikel",
      meaning: "nicht beschränkt auf",
      explanation: "にとどまらず drückt aus, dass etwas nicht auf einen bestimmten Bereich beschränkt ist, sondern darüber hinausgeht. Es betont, dass der Umfang oder die Auswirkung größer als erwartet ist. Diese Konstruktion wird oft verwendet, um den erweiterten Einfluss oder Bereich von etwas zu beschreiben.",
      formation: "Nomen + にとどまらず",
      examples: [
        { japanese: "彼の影響は国内にとどまらず、海外にも及んでいる。", romaji: "Kare no eikyō wa kokunai ni todomarazu, kaigai ni mo oyonde iru.", german: "Sein Einfluss ist nicht auf das Inland beschränkt, sondern reicht auch ins Ausland." },
        { japanese: "この問題は経済にとどまらず、社会全体に関わる。", romaji: "Kono mondai wa keizai ni todomarazu, shakai zentai ni kakawaru.", german: "Dieses Problem betrifft nicht nur die Wirtschaft, sondern die gesamte Gesellschaft." }
      ],
      notes: "Formell. Betont, dass etwas über einen bestimmten Rahmen hinausgeht.",
      related: ["n1-nomi-narazu", "n2-dake-de-naku"]
    },
    {
      id: "n1-ni-hikikae",
      pattern: "～にひきかえ",
      level: "N1",
      category: "Partikel",
      meaning: "im Gegensatz zu",
      explanation: "にひきかえ wird verwendet, um einen starken Kontrast zwischen zwei Dingen hervorzuheben. Es drückt aus, dass im Gegensatz zu einer Sache eine andere sehr unterschiedlich ist. Oft wird damit eine negative Bewertung oder Enttäuschung über den Kontrast ausgedrückt.",
      formation: "Nomen/Satz + にひきかえ",
      examples: [
        { japanese: "兄は真面目なのにひきかえ、弟は怠け者だ。", romaji: "Ani wa majime na no ni hikikae, otōto wa namakemono da.", german: "Im Gegensatz zum ernsthaften älteren Bruder ist der jüngere Bruder faul." },
        { japanese: "去年の好成績にひきかえ、今年は不振だ。", romaji: "Kyonen no kōseiseki ni hikikae, kotoshi wa fushin da.", german: "Im Gegensatz zu den guten Ergebnissen letztes Jahr sind die diesjährigen schlecht." }
      ],
      notes: "Oft mit negativer Konnotation. Betont einen unerwünschten Kontrast.",
      related: ["n2-ni-taishite", "n2-no-ni"]
    },
    {
      id: "n1-ni-hoka-naranai",
      pattern: "～にほかならない",
      level: "N1",
      category: "Partikel",
      meaning: "nichts anderes als",
      explanation: "にほかならない drückt nachdrücklich aus, dass etwas genau das ist, was gesagt wird, und nichts anderes. Es wird verwendet, um eine Behauptung oder Schlussfolgerung zu betonen und auszudrücken, dass es keinen Zweifel daran gibt. Diese Konstruktion ist sehr formell.",
      formation: "Nomen/の + にほかならない",
      examples: [
        { japanese: "これは彼の努力の成果にほかならない。", romaji: "Kore wa kare no doryoku no seika ni hoka naranai.", german: "Das ist nichts anderes als das Ergebnis seiner Bemühungen." },
        { japanese: "成功したのは、みなさんの協力があったからにほかならない。", romaji: "Seikō shita no wa, minasan no kyōryoku ga atta kara ni hoka naranai.", german: "Der Erfolg ist nichts anderem als Ihrer Zusammenarbeit zu verdanken." }
      ],
      notes: "Sehr nachdrücklich und formell. Betont Gewissheit und schließt Alternativen aus.",
      related: ["n2-ni-chigainai", "n1-yue-ni"]
    },
    {
      id: "n1-ni-mo-mashite",
      pattern: "～にもまして",
      level: "N1",
      category: "Partikel",
      meaning: "mehr noch als",
      explanation: "にもまして drückt aus, dass etwas noch mehr oder stärker ist als ein anderer Zustand oder eine Vergleichsgröße. Es wird verwendet, um eine Steigerung oder einen Überbietung zu betonen. Diese Ausdrucksweise ist formell und wird oft in geschriebener Sprache verwendet.",
      formation: "Nomen + にもまして",
      examples: [
        { japanese: "今年は去年にもまして暑い夏だった。", romaji: "Kotoshi wa kyonen ni mo mashite atsui natsu datta.", german: "Dieser Sommer war noch heißer als letztes Jahr." },
        { japanese: "彼女は誰にもまして努力家だ。", romaji: "Kanojo wa dare ni mo mashite doryokuka da.", german: "Sie ist mehr als jeder andere eine fleißige Person." }
      ],
      notes: "Formell. Betont eine Steigerung oder Überbietung im Vergleich.",
      related: ["n2-yori-mo", "n1-mo-saru-koto-nagara"]
    },
    {
      id: "n1-nomi-narazu",
      pattern: "～のみならず",
      level: "N1",
      category: "Partikel",
      meaning: "nicht nur",
      explanation: "のみならず ist eine formelle Ausdrucksweise, die bedeutet 'nicht nur'. Es wird verwendet, um auszudrücken, dass etwas über den genannten Punkt hinausgeht und zusätzliche Aspekte umfasst. Diese Konstruktion wird hauptsächlich in formeller, geschriebener Sprache verwendet.",
      formation: "Nomen/Verb-辞書形/い-Adjektiv + のみならず",
      examples: [
        { japanese: "彼は日本語のみならず、中国語も話せる。", romaji: "Kare wa nihongo nomi narazu, chūgokugo mo hanaseru.", german: "Er kann nicht nur Japanisch, sondern auch Chinesisch sprechen." },
        { japanese: "この製品は品質が良いのみならず、価格も手頃だ。", romaji: "Kono seihin wa hinshitsu ga yoi nomi narazu, kakaku mo tegoro da.", german: "Dieses Produkt hat nicht nur gute Qualität, sondern auch einen erschwinglichen Preis." }
      ],
      notes: "Sehr formell. Wird hauptsächlich in geschriebener Sprache verwendet.",
      related: ["n2-dake-de-naku", "n1-ni-todomarazu"]
    },
    {
      id: "n1-wa-oroka",
      pattern: "～はおろか",
      level: "N1",
      category: "Partikel",
      meaning: "geschweige denn",
      explanation: "はおろか drückt aus, dass nicht einmal das Einfachere oder Grundlegendere möglich ist, geschweige denn das Schwierigere oder Fortgeschrittenere. Es wird verwendet, um zu betonen, dass selbst ein niedrigeres Level nicht erreicht wird. Die Konstruktion folgt dem Muster: schwierigeres/höheres はおろか einfacheres/niedrigeres auch nicht.",
      formation: "Nomen + はおろか",
      examples: [
        { japanese: "彼は漢字はおろか、ひらがなも読めない。", romaji: "Kare wa kanji wa oroka, hiragana mo yomenai.", german: "Er kann nicht einmal Hiragana lesen, geschweige denn Kanji." },
        { japanese: "忙しくて、旅行はおろか映画を見る時間もない。", romaji: "Isogashikute, ryokō wa oroka eiga o miru jikan mo nai.", german: "Ich bin so beschäftigt, dass ich nicht einmal Zeit habe, einen Film zu sehen, geschweige denn zu reisen." }
      ],
      notes: "Betont, dass selbst das Einfachere nicht möglich ist. Das Schwierigere wird zuerst genannt.",
      related: ["n2-dokoro-ka", "n1-mo-saru-koto-nagara"]
    },
    {
      id: "n1-mo-saru-koto-nagara",
      pattern: "～もさることながら",
      level: "N1",
      category: "Partikel",
      meaning: "nicht nur sondern auch",
      explanation: "もさることながら drückt aus, dass zwar der erste genannte Punkt wichtig oder bemerkenswert ist, aber der folgende Punkt noch wichtiger oder bemerkenswerter ist. Es wird verwendet, um zwei Aspekte hervorzuheben, wobei der zweite betont wird. Diese Konstruktion ist sehr formell.",
      formation: "Nomen + もさることながら",
      examples: [
        { japanese: "彼の学歴もさることながら、実務経験が豊富だ。", romaji: "Kare no gakureki mo saru koto nagara, jitsumu keiken ga hōfu da.", german: "Nicht nur sein Bildungsabschluss ist bemerkenswert, sondern er hat auch reiche praktische Erfahrung." },
        { japanese: "味もさることながら、この店は雰囲気が素晴らしい。", romaji: "Aji mo saru koto nagara, kono mise wa fun'iki ga subarashii.", german: "Nicht nur der Geschmack, sondern auch die Atmosphäre dieses Restaurants ist wunderbar." }
      ],
      notes: "Sehr formell. Betont den zweiten Punkt stärker als den ersten.",
      related: ["n1-nomi-narazu", "n1-ni-mo-mashite"]
    },
    {
      id: "n1-yue-ni",
      pattern: "～ゆえに",
      level: "N1",
      category: "Partikel",
      meaning: "wegen, aufgrund von",
      explanation: "ゆえに ist eine sehr formelle und literarische Art, einen Grund oder eine Ursache auszudrücken. Es entspricht dem deutschen 'wegen' oder 'aufgrund von' und wird hauptsächlich in geschriebener, formeller Sprache verwendet. Es verleiht dem Satz einen ernsten, gehobenen Ton.",
      formation: "Nomen + ゆえに / な-Adjektiv-である + ゆえに / い-Adjektiv + ゆえに",
      examples: [
        { japanese: "若さゆえの過ちだった。", romaji: "Wakasa yue no ayamachi datta.", german: "Es war ein Fehler aufgrund der Jugend." },
        { japanese: "経験不足ゆえに、失敗してしまった。", romaji: "Keiken busoku yue ni, shippai shite shimatta.", german: "Wegen mangelnder Erfahrung bin ich gescheitert." }
      ],
      notes: "Sehr formell und literarisch. Wird hauptsächlich in geschriebener Sprache verwendet.",
      related: ["n2-no-de", "n1-ni-hoka-naranai"]
    },
    {
      id: "n1-wo-oite-hoka-ni-nai",
      pattern: "～をおいてほかにない",
      level: "N1",
      category: "Partikel",
      meaning: "es gibt nichts außer",
      explanation: "をおいてほかにない drückt nachdrücklich aus, dass es keine andere Wahl oder Alternative gibt als die genannte Person oder Sache. Es betont, dass nur diese eine Option in Frage kommt. Diese Ausdrucksweise ist sehr formell und wird oft verwendet, um die absolute Eignung oder Notwendigkeit von etwas zu betonen.",
      formation: "Nomen + をおいてほかにない",
      examples: [
        { japanese: "この仕事は彼をおいてほかにない。", romaji: "Kono shigoto wa kare o oite hoka ni nai.", german: "Für diese Arbeit gibt es niemanden außer ihm." },
        { japanese: "今この問題を解決できるのは、あなたをおいてほかにない。", romaji: "Ima kono mondai o kaiketsu dekiru no wa, anata o oite hoka ni nai.", german: "Niemand außer dir kann dieses Problem jetzt lösen." }
      ],
      notes: "Sehr nachdrücklich. Betont die Einzigartigkeit oder absolute Eignung.",
      related: ["n1-nara-de-wa", "n2-shika-nai"]
    },
    {
      id: "n1-wo-kawakiri-ni",
      pattern: "～を皮切りに",
      level: "N1",
      category: "Partikel",
      meaning: "angefangen mit",
      explanation: "を皮切りに drückt aus, dass etwas der Ausgangspunkt oder Beginn einer Serie von Ereignissen oder Aktivitäten ist. Es wird verwendet, um zu zeigen, dass nach dem ersten Ereignis weitere folgen. Diese Konstruktion wird oft im Kontext von Tourneen, Veranstaltungsreihen oder Entwicklungen verwendet.",
      formation: "Nomen + を皮切りに",
      examples: [
        { japanese: "東京を皮切りに、全国ツアーを行う。", romaji: "Tōkyō o kawakiri ni, zenkoku tsuā o okonau.", german: "Angefangen mit Tokyo führen wir eine landesweite Tournee durch." },
        { japanese: "この事件を皮切りに、様々な問題が明るみに出た。", romaji: "Kono jiken o kawakiri ni, samazama na mondai ga akarumi ni deta.", german: "Angefangen mit diesem Vorfall kamen verschiedene Probleme ans Licht." }
      ],
      notes: "Wird oft für Tourneen, Veranstaltungsreihen oder Entwicklungen verwendet.",
      related: ["n2-wo-hajime-to-shite", "n1-wo-hete"]
    },
    {
      id: "n1-wo-hete",
      pattern: "～を経て",
      level: "N1",
      category: "Partikel",
      meaning: "über, durch (Prozess/Zeit)",
      explanation: "を経て drückt aus, dass etwas durch einen bestimmten Prozess, Zeitraum oder eine Reihe von Stationen durchlaufen wurde. Es betont den Verlauf oder die Entwicklung über Zeit oder Raum. Diese Konstruktion wird oft verwendet, um historische Entwicklungen, Karrierewege oder Reisen zu beschreiben.",
      formation: "Nomen + を経て",
      examples: [
        { japanese: "長い議論を経て、ようやく合意に達した。", romaji: "Nagai giron o hete, yōyaku gōi ni tasshita.", german: "Nach langen Diskussionen haben wir endlich eine Einigung erreicht." },
        { japanese: "彼は様々な職を経て、今の地位についた。", romaji: "Kare wa samazama na shoku o hete, ima no chii ni tsuita.", german: "Nachdem er verschiedene Positionen durchlaufen hat, erreichte er seine jetzige Position." }
      ],
      notes: "Betont den Prozess oder die Entwicklung über Zeit. Formell.",
      related: ["n2-wo-tsuujite", "n1-wo-kawakiri-ni"]
    },
    {
      id: "n1-wo-motte",
      pattern: "～をもって",
      level: "N1",
      category: "Partikel",
      meaning: "mit, durch / ab (Zeitpunkt)",
      explanation: "をもって hat mehrere Bedeutungen: 1) Es drückt das Mittel oder die Methode aus, mit der etwas getan wird. 2) Es kann einen Zeitpunkt markieren, ab dem etwas endet oder beginnt. Diese Konstruktion ist sehr formell und wird hauptsächlich in offiziellen Ankündigungen oder formellen Kontexten verwendet.",
      formation: "Nomen + をもって",
      examples: [
        { japanese: "本日をもって営業を終了いたします。", romaji: "Honjitsu o motte eigyō o shūryō itashimasu.", german: "Ab heute beenden wir unseren Geschäftsbetrieb." },
        { japanese: "この問題は話し合いをもって解決すべきだ。", romaji: "Kono mondai wa hanashiai o motte kaiketsu subeki da.", german: "Dieses Problem sollte durch Gespräche gelöst werden." }
      ],
      notes: "Sehr formell. Wird in offiziellen Ankündigungen und formellen Kontexten verwendet.",
      related: ["n2-wo-tsuujite", "n1-ni-sokushite"]
    },
    {
      id: "n1-wo-mono-tomo-sezu-ni",
      pattern: "～をものともせずに",
      level: "N1",
      category: "Partikel",
      meaning: "ungeachtet, trotz",
      explanation: "をものともせずに drückt aus, dass jemand trotz Schwierigkeiten, Hindernissen oder widrigen Umständen entschlossen handelt, ohne sich davon beeinflussen zu lassen. Es betont den starken Willen und die Entschlossenheit, sich nicht von Problemen abhalten zu lassen. Diese Konstruktion hat oft eine bewundernde Konnotation.",
      formation: "Nomen + をものともせずに",
      examples: [
        { japanese: "彼は困難をものともせずに挑戦し続けた。", romaji: "Kare wa konnan o mono tomo sezu ni chōsen shi tsuzuketa.", german: "Er hat ungeachtet der Schwierigkeiten weiterhin Herausforderungen angenommen." },
        { japanese: "嵐をものともせずに出発した。", romaji: "Arashi o mono tomo sezu ni shuppatsu shita.", german: "Trotz des Sturms sind sie aufgebrochen." }
      ],
      notes: "Betont Entschlossenheit und starken Willen. Oft mit bewundernder Konnotation.",
      related: ["n2-ni-mo-kakawarazu", "n1-wo-yoso-ni"]
    },
    {
      id: "n1-wo-yoso-ni",
      pattern: "～をよそに",
      level: "N1",
      category: "Partikel",
      meaning: "ungeachtet, ignorierend",
      explanation: "をよそに drückt aus, dass jemand etwas tut, ohne Rücksicht auf die Gefühle, Erwartungen oder die Situation anderer zu nehmen. Es betont, dass die Handlung im Gegensatz zu dem steht, was erwartet oder gewünscht wird. Diese Konstruktion hat oft eine kritische oder negative Konnotation.",
      formation: "Nomen + をよそに",
      examples: [
        { japanese: "親の心配をよそに、彼は危険な仕事を続けている。", romaji: "Oya no shinpai o yoso ni, kare wa kiken na shigoto o tsuzukete iru.", german: "Ungeachtet der Sorgen seiner Eltern führt er weiterhin eine gefährliche Arbeit aus." },
        { japanese: "周囲の反対をよそに、彼女は計画を実行した。", romaji: "Shūi no hantai o yoso ni, kanojo wa keikaku o jikkō shita.", german: "Ignorierend den Widerstand der Umgebung führte sie ihren Plan aus." }
      ],
      notes: "Oft mit kritischer oder negativer Konnotation. Betont mangelnde Rücksichtnahme.",
      related: ["n2-ni-mo-kakawarazu", "n1-wo-mono-tomo-sezu-ni"]
    },
    {
      id: "n1-wo-yoginaku-sareru",
      pattern: "～を余儀なくされる",
      level: "N1",
      category: "Partikel",
      meaning: "gezwungen werden zu",
      explanation: "を余儀なくされる drückt aus, dass man aufgrund äußerer Umstände oder Notwendigkeit zu etwas gezwungen wird, was man eigentlich nicht tun möchte. Es betont, dass keine Wahl besteht und man unwillig handeln muss. Diese Konstruktion wird oft in formellen oder offiziellen Kontexten verwendet.",
      formation: "Nomen + を余儀なくされる",
      examples: [
        { japanese: "台風のため、イベントの中止を余儀なくされた。", romaji: "Taifū no tame, ibento no chūshi o yoginaku sareta.", german: "Wegen des Taifuns waren wir gezwungen, die Veranstaltung abzusagen." },
        { japanese: "経営難により、工場の閉鎖を余儀なくされた。", romaji: "Keiei nan ni yori, kōjō no heisa o yoginaku sareta.", german: "Aufgrund finanzieller Schwierigkeiten wurden wir zur Schließung der Fabrik gezwungen." }
      ],
      notes: "Formell. Betont unwillige Notwendigkeit aufgrund äußerer Umstände.",
      related: ["n2-wo-enai", "n2-nai-wake-ni-wa-ikanai"]
    },
    {
      id: "n1-wo-kagiri-ni",
      pattern: "～を限りに",
      level: "N1",
      category: "Partikel",
      meaning: "ab (als Endpunkt)",
      explanation: "を限りに drückt aus, dass etwas zu einem bestimmten Zeitpunkt endet und danach nicht mehr fortgesetzt wird. Es markiert einen klaren Endpunkt oder Abschluss. Diese Konstruktion wird oft in offiziellen Ankündigungen verwendet, um das Ende von etwas zu verkünden.",
      formation: "Zeitpunkt/Nomen + を限りに",
      examples: [
        { japanese: "今日を限りに、タバコをやめる。", romaji: "Kyō o kagiri ni, tabako o yameru.", german: "Ab heute höre ich mit dem Rauchen auf." },
        { japanese: "今月を限りに、この店は閉店します。", romaji: "Kongetsu o kagiri ni, kono mise wa heiten shimasu.", german: "Ab diesem Monat schließt dieses Geschäft." }
      ],
      notes: "Wird für offizielle Ankündigungen von Beendigungen verwendet. Markiert klaren Endpunkt.",
      related: ["n1-wo-motte", "n2-wo-sakai-ni"]
    },
    {
      id: "n1-wo-fumaete",
      pattern: "～を踏まえて",
      level: "N1",
      category: "Partikel",
      meaning: "auf der Grundlage von",
      explanation: "を踏まえて drückt aus, dass man etwas unter Berücksichtigung oder auf Basis von bestimmten Informationen, Erfahrungen oder Umständen tut. Es betont, dass man die genannten Faktoren in seine Überlegungen oder Handlungen einbezieht. Diese Konstruktion wird oft in formellen oder geschäftlichen Kontexten verwendet.",
      formation: "Nomen + を踏まえて",
      examples: [
        { japanese: "過去の経験を踏まえて、新しい計画を立てた。", romaji: "Kako no keiken o fumaete, atarashii keikaku o tateta.", german: "Auf der Grundlage vergangener Erfahrungen haben wir einen neuen Plan erstellt." },
        { japanese: "調査結果を踏まえて、対策を検討する。", romaji: "Chōsa kekka o fumaete, taisaku o kentō suru.", german: "Basierend auf den Untersuchungsergebnissen werden wir Gegenmaßnahmen prüfen." }
      ],
      notes: "Formell. Wird in geschäftlichen und offiziellen Kontexten verwendet.",
      related: ["n2-ni-motozuite", "n1-ni-sokushite"]
    },
    {
      id: "n1-to-atte",
      pattern: "～とあって",
      level: "N1",
      category: "Partikel",
      meaning: "da weil (besonderer Umstand)",
      explanation: "とあって drückt aus, dass aufgrund eines besonderen oder außergewöhnlichen Umstands eine bestimmte Situation oder Reaktion eintritt. Es betont, dass der genannte Grund besonders oder ungewöhnlich ist und deshalb eine entsprechende Folge hat. Diese Konstruktion wird oft verwendet, um besondere Ereignisse oder Umstände zu beschreiben.",
      formation: "Nomen + とあって / Satz + とあって",
      examples: [
        { japanese: "有名歌手のコンサートとあって、会場は満員だった。", romaji: "Yūmei kashu no konsāto to atte, kaijō wa man'in datta.", german: "Da es ein Konzert eines berühmten Sängers war, war der Veranstaltungsort voll." },
        { japanese: "初売りとあって、朝から大勢の客が集まった。", romaji: "Hatsuuri to atte, asa kara ōzei no kyaku ga atsumatta.", german: "Da es der erste Verkaufstag war, versammelten sich seit dem Morgen viele Kunden." }
      ],
      notes: "Betont besondere oder außergewöhnliche Umstände als Grund.",
      related: ["n2-node", "n1-ni-atte"]
    },
    {
      id: "n1-to-areba",
      pattern: "～とあれば",
      level: "N1",
      category: "Partikel",
      meaning: "wenn es der Fall ist dass",
      explanation: "とあれば drückt aus, dass wenn eine bestimmte Bedingung oder Situation eintritt, man bereit ist, alles Notwendige zu tun. Es betont die Entschlossenheit oder Bereitschaft, unter den genannten Umständen zu handeln. Diese Konstruktion wird oft verwendet, um starke Motivation oder Engagement auszudrücken.",
      formation: "Nomen/の + とあれば",
      examples: [
        { japanese: "子供のためとあれば、何でもする。", romaji: "Kodomo no tame to areba, nan demo suru.", german: "Wenn es für mein Kind ist, tue ich alles." },
        { japanese: "会社の存続がかかっているとあれば、協力せざるを得ない。", romaji: "Kaisha no sonzoku ga kakatte iru to areba, kyōryoku sezaru o enai.", german: "Wenn das Überleben der Firma auf dem Spiel steht, muss man kooperieren." }
      ],
      notes: "Betont Entschlossenheit oder Bereitschaft unter bestimmten Umständen.",
      related: ["n1-to-atte", "n2-nara"]
    },
    {
      id: "n1-to-ii-to-ii",
      pattern: "～といい～といい",
      level: "N1",
      category: "Partikel",
      meaning: "sowohl als auch",
      explanation: "といい～といい wird verwendet, um mehrere Aspekte oder Beispiele aufzuzählen, die alle eine gemeinsame Bewertung oder Eigenschaft teilen. Es betont, dass sowohl das eine als auch das andere zutrifft. Diese Konstruktion wird oft verwendet, um eine umfassende Beurteilung zu geben.",
      formation: "Nomen + といい + Nomen + といい",
      examples: [
        { japanese: "彼は性格といい、能力といい、完璧だ。", romaji: "Kare wa seikaku to ii, nōryoku to ii, kanpeki da.", german: "Sowohl seine Persönlichkeit als auch seine Fähigkeiten sind perfekt." },
        { japanese: "この町は景色といい、食べ物といい、素晴らしい。", romaji: "Kono machi wa keshiki to ii, tabemono to ii, subarashii.", german: "Sowohl die Landschaft als auch das Essen dieser Stadt sind wunderbar." }
      ],
      notes: "Wird verwendet, um mehrere positive (oder negative) Aspekte zu betonen.",
      related: ["n2-mo-mo", "n1-de-are-de-are"]
    },
    {
      id: "n1-to-iedomo",
      pattern: "～といえども",
      level: "N1",
      category: "Partikel",
      meaning: "obwohl, auch wenn",
      explanation: "といえども ist eine sehr formelle Ausdrucksweise für 'obwohl' oder 'auch wenn'. Es wird verwendet, um auszudrücken, dass selbst unter den genannten Umständen oder trotz einer bestimmten Eigenschaft etwas anderes der Fall ist. Diese Konstruktion hat einen literarischen, gehobenen Ton.",
      formation: "Nomen + といえども / Verb/Adjektiv + といえども",
      examples: [
        { japanese: "いくら天才といえども、努力なしでは成功できない。", romaji: "Ikura tensai to iedomo, doryoku nashi de wa seikō dekinai.", german: "Auch wenn man ein Genie ist, kann man ohne Anstrengung keinen Erfolg haben." },
        { japanese: "子供といえども、人権は尊重されるべきだ。", romaji: "Kodomo to iedomo, jinken wa sonchō sareru beki da.", german: "Auch wenn es Kinder sind, sollten ihre Menschenrechte respektiert werden." }
      ],
      notes: "Sehr formell und literarisch. Wird hauptsächlich in geschriebener Sprache verwendet.",
      related: ["n2-to-shite-mo", "n1-de-are"]
    },
    {
      id: "n1-to-kitara",
      pattern: "～ときたら",
      level: "N1",
      category: "Partikel",
      meaning: "was angeht (negativ)",
      explanation: "ときたら wird verwendet, um Kritik oder Unzufriedenheit über jemanden oder etwas auszudrücken. Es hebt ein Thema hervor, über das man sich beschweren möchte. Diese Konstruktion hat immer eine negative oder kritische Konnotation und wird in der gesprochenen Sprache verwendet.",
      formation: "Nomen + ときたら",
      examples: [
        { japanese: "うちの息子ときたら、勉強もしないでゲームばかりだ。", romaji: "Uchi no musuko to kitara, benkyō mo shinai de gēmu bakari da.", german: "Was meinen Sohn angeht, er lernt nicht und spielt nur Spiele." },
        { japanese: "最近の若者ときたら、礼儀を知らない。", romaji: "Saikin no wakamono to kitara, reigi o shiranai.", german: "Was die heutige Jugend angeht, sie kennen keine Manieren." }
      ],
      notes: "Immer negativ oder kritisch konnotiert. Umgangssprachlich.",
      related: ["n2-to-ittara", "n2-nante"]
    },
    {
      id: "n1-to-wa-ie",
      pattern: "～とはいえ",
      level: "N1",
      category: "Partikel",
      meaning: "obwohl, allerdings",
      explanation: "とはいえ wird verwendet, um einen Gegensatz oder eine Einschränkung zum vorher Gesagten auszudrücken. Es bedeutet 'obwohl' oder 'allerdings' und zeigt an, dass die folgende Aussage die vorherige in gewisser Weise relativiert. Diese Konstruktion wird sowohl in geschriebener als auch gesprochener Sprache verwendet.",
      formation: "Nomen/Verb/Adjektiv + とはいえ",
      examples: [
        { japanese: "春とはいえ、まだ寒い日が続く。", romaji: "Haru to wa ie, mada samui hi ga tsuzuku.", german: "Obwohl es Frühling ist, bleiben die kalten Tage bestehen." },
        { japanese: "便利とはいえ、使いすぎには注意が必要だ。", romaji: "Benri to wa ie, tsukaisugiru ni wa chūi ga hitsuyō da.", german: "Obwohl es praktisch ist, muss man bei übermäßiger Nutzung vorsichtig sein." }
      ],
      notes: "Ähnlich wie とはいうものの, aber etwas formeller. Drückt Einschränkung aus.",
      related: ["n2-keredo", "n2-ga"]
    },
    {
      id: "n1-to-mo-arou",
      pattern: "～ともあろう",
      level: "N1",
      category: "Partikel",
      meaning: "jemand vom Kaliber von",
      explanation: "ともあろう wird verwendet, um Überraschung oder Enttäuschung darüber auszudrücken, dass jemand mit einem bestimmten Status oder einer Position etwas Unerwartetes oder Unangemessenes getan hat. Es betont, dass man von dieser Person aufgrund ihrer Position mehr erwartet hätte. Diese Konstruktion hat oft eine kritische Konnotation.",
      formation: "Nomen + ともあろう (+ 者が/人が/方が)",
      examples: [
        { japanese: "先生ともあろう人が、そんな間違いをするとは。", romaji: "Sensei to mo arō hito ga, sonna machigai o suru to wa.", german: "Dass jemand vom Kaliber eines Lehrers einen solchen Fehler macht!" },
        { japanese: "社長ともあろう者が、約束を破るなんて信じられない。", romaji: "Shachō to mo arō mono ga, yakusoku o yaburu nante shinjirarenai.", german: "Es ist unglaublich, dass jemand vom Rang eines Geschäftsführers ein Versprechen bricht." }
      ],
      notes: "Drückt Überraschung oder Kritik aus. Betont unangemessenes Verhalten für den Status.",
      related: ["n2-noni", "n1-to-kitara"]
    },
    {
      id: "n1-tote",
      pattern: "～とて",
      level: "N1",
      category: "Partikel",
      meaning: "selbst wenn, auch",
      explanation: "とて ist eine literarische, altertümliche Form, die 'selbst wenn' oder 'auch' bedeutet. Es wird verwendet, um auszudrücken, dass selbst in einem extremen Fall etwas nicht möglich ist oder gilt. Diese Konstruktion findet sich hauptsächlich in literarischen Texten oder sehr formeller Sprache.",
      formation: "Nomen + とて",
      examples: [
        { japanese: "いくら金持ちとて、幸せとは限らない。", romaji: "Ikura kanemochi tote, shiawase to wa kagiranai.", german: "Selbst wenn man reich ist, bedeutet das nicht unbedingt Glück." },
        { japanese: "親とて、子供の全てを知ることはできない。", romaji: "Oya tote, kodomo no subete o shiru koto wa dekinai.", german: "Auch Eltern können nicht alles über ihre Kinder wissen." }
      ],
      notes: "Sehr literarisch und altertümlich. Wird in moderner Umgangssprache kaum verwendet.",
      related: ["n1-to-iedomo", "n1-de-are"]
    },
    {
      id: "n1-ni-ataranai",
      pattern: "～にあたらない",
      level: "N1",
      category: "Partikel",
      meaning: "nicht wert, kein Grund für",
      explanation: "にあたらない drückt aus, dass etwas nicht wert ist, getan zu werden, oder dass es keinen Grund gibt, sich auf eine bestimmte Weise zu verhalten. Es wird oft verwendet, um auszudrücken, dass eine Sorge, Angst oder Anstrengung unnötig ist. Diese Konstruktion ist formell.",
      formation: "Verb-辞書形 + にあたらない / Nomen + にあたらない",
      examples: [
        { japanese: "そんなことで驚くにあたらない。", romaji: "Sonna koto de odoroku ni ataranai.", german: "Es ist nicht wert, sich darüber zu wundern." },
        { japanese: "心配するにあたらない。すぐに解決する。", romaji: "Shinpai suru ni ataranai. Sugu ni kaiketsu suru.", german: "Es gibt keinen Grund zur Sorge. Es wird bald gelöst." }
      ],
      notes: "Formell. Wird verwendet, um Unnötigkeit einer Handlung oder Emotion auszudrücken.",
      related: ["n1-ni-taeru", "n2-hitsuyou-ga-nai"]
    },
    {
      id: "n1-ni-kagitta-koto-de-wa-nai",
      pattern: "～にかぎったことではない",
      level: "N1",
      category: "Partikel",
      meaning: "nicht auf beschränkt",
      explanation: "にかぎったことではない drückt aus, dass etwas nicht nur auf einen bestimmten Fall, eine Person oder Situation beschränkt ist, sondern allgemeiner gilt. Es wird verwendet, um zu zeigen, dass ein Problem oder eine Eigenschaft weiter verbreitet ist als zunächst angenommen.",
      formation: "Nomen + にかぎったことではない",
      examples: [
        { japanese: "この問題は日本にかぎったことではない。", romaji: "Kono mondai wa Nihon ni kagitta koto de wa nai.", german: "Dieses Problem ist nicht auf Japan beschränkt." },
        { japanese: "若者にかぎったことではないが、最近マナーが悪くなっている。", romaji: "Wakamono ni kagitta koto de wa nai ga, saikin manā ga waruku natte iru.", german: "Nicht nur auf junge Leute beschränkt, aber die Manieren werden in letzter Zeit schlechter." }
      ],
      notes: "Wird verwendet, um zu zeigen, dass etwas allgemeiner gilt als angenommen.",
      related: ["n2-dake-de-wa-nai", "n1-ni-todomarazu"]
    },
    {
      id: "n1-ni-taru",
      pattern: "～に足る",
      level: "N1",
      category: "Partikel",
      meaning: "wert sein, würdig",
      explanation: "に足る drückt aus, dass etwas wert ist oder würdig ist, getan oder empfangen zu werden. Es betont den Wert oder die Qualität von etwas. In negativer Form (に足りない) bedeutet es, dass etwas nicht wert ist oder nicht würdig ist. Diese Konstruktion ist sehr formell.",
      formation: "Verb-辞書形/Nomen + に足る",
      examples: [
        { japanese: "この映画は見るに足る作品だ。", romaji: "Kono eiga wa miru ni taru sakuhin da.", german: "Dieser Film ist ein Werk, das es wert ist, gesehen zu werden." },
        { japanese: "彼は信頼に足る人物だ。", romaji: "Kare wa shinrai ni taru jinbutsu da.", german: "Er ist eine Person, die des Vertrauens würdig ist." }
      ],
      notes: "Sehr formell. Betont Wert oder Würdigkeit.",
      related: ["n1-ni-taeru", "n2-ni-atai-suru"]
    },
    {
      id: "n1-ikan-ni-yorazu",
      pattern: "～いかんによらず",
      level: "N1",
      category: "Partikel",
      meaning: "ungeachtet, unabhängig von",
      explanation: "いかんによらず drückt aus, dass etwas unabhängig von bestimmten Umständen, Bedingungen oder der Art und Weise gilt. Es betont, dass die genannten Faktoren keinen Einfluss auf das Ergebnis oder die Entscheidung haben. Diese Konstruktion ist sehr formell und wird oft in offiziellen Kontexten verwendet.",
      formation: "Nomen + のいかんによらず",
      examples: [
        { japanese: "理由のいかんによらず、暴力は許されない。", romaji: "Riyū no ikan ni yorazu, bōryoku wa yurusarenai.", german: "Ungeachtet des Grundes ist Gewalt nicht zu verzeihen." },
        { japanese: "年齢のいかんによらず、誰でも参加できる。", romaji: "Nenrei no ikan ni yorazu, dare demo sanka dekiru.", german: "Unabhängig vom Alter kann jeder teilnehmen." }
      ],
      notes: "Sehr formell. Wird in offiziellen Dokumenten und Ankündigungen verwendet.",
      related: ["n2-ni-kakawarazu", "n1-ikan-de-wa"]
    },
    {
      id: "n1-ikan-de-wa",
      pattern: "～いかんでは/～いかんによっては",
      level: "N1",
      category: "Partikel",
      meaning: "je nachdem",
      explanation: "いかんでは/いかんによっては drückt aus, dass das Ergebnis oder die Konsequenz davon abhängt, wie etwas ist oder gemacht wird. Es betont, dass verschiedene Umstände zu verschiedenen Ergebnissen führen können. Diese Konstruktion ist sehr formell.",
      formation: "Nomen + のいかんでは/のいかんによっては",
      examples: [
        { japanese: "やり方いかんでは、成功する可能性もある。", romaji: "Yarikata ikan de wa, seikō suru kanōsei mo aru.", german: "Je nach Vorgehensweise gibt es auch die Möglichkeit des Erfolgs." },
        { japanese: "条件のいかんによっては、契約を見直す必要がある。", romaji: "Jōken no ikan ni yotte wa, keiyaku o minaosu hitsuyō ga aru.", german: "Je nach den Bedingungen muss der Vertrag überprüft werden." }
      ],
      notes: "Sehr formell. Betont Abhängigkeit des Ergebnisses von Umständen.",
      related: ["n2-ni-yotte", "n1-ikan-ni-yorazu"]
    },
    {
      id: "n1-no-itari",
      pattern: "～の至り",
      level: "N1",
      category: "Partikel",
      meaning: "Gipfel von (Ehre etc.)",
      explanation: "の至り drückt den Gipfel oder das Extrem eines Gefühls oder Zustands aus. Es wird hauptsächlich mit positiven Emotionen wie Ehre, Freude oder Dankbarkeit verwendet, kann aber auch mit negativen Emotionen erscheinen. Diese Konstruktion ist sehr formell und höflich.",
      formation: "Nomen + の至り",
      examples: [
        { japanese: "このような賞をいただき、光栄の至りです。", romaji: "Kono yō na shō o itadaki, kōei no itari desu.", german: "Einen solchen Preis zu erhalten ist mir eine große Ehre." },
        { japanese: "皆様にご心配をおかけして、恐縮の至りです。", romaji: "Minasama ni go-shinpai o okake shite, kyōshuku no itari desu.", german: "Es tut mir sehr leid, Ihnen allen Sorgen bereitet zu haben." }
      ],
      notes: "Sehr formell und höflich. Wird hauptsächlich in formellen Ansprachen verwendet.",
      related: ["n1-no-kiwami", "n2-koto-desu"]
    },
    {
      id: "n1-no-kiwami",
      pattern: "～の極み",
      level: "N1",
      category: "Partikel",
      meaning: "Höhepunkt von, Extrem von",
      explanation: "の極み drückt den absoluten Höhepunkt oder das Extrem eines Gefühls oder Zustands aus. Es wird sowohl mit positiven als auch negativen Emotionen verwendet und betont die Intensität. Diese Konstruktion ist sehr formell und literarisch.",
      formation: "Nomen + の極み",
      examples: [
        { japanese: "彼の行動は無礼の極みだ。", romaji: "Kare no kōdō wa burei no kiwami da.", german: "Sein Verhalten ist der Gipfel der Unhöflichkeit." },
        { japanese: "このような栄誉を受けるとは、喜びの極みです。", romaji: "Kono yō na eiyo o ukeru to wa, yorokobi no kiwami desu.", german: "Eine solche Ehre zu erhalten ist der Gipfel der Freude." }
      ],
      notes: "Sehr formell und literarisch. Betont extreme Intensität eines Gefühls.",
      related: ["n1-no-itari", "n2-kiwamete"]
    },
    // ============================================================
    // VERBEN (55)
    // ============================================================
    {
      id: "n1-zu-ni-wa-okanai",
      pattern: "～ずにはおかない",
      level: "N1",
      category: "Verben",
      meaning: "unweigerlich, kann nicht anders als",
      explanation: "Drückt aus, dass eine Handlung oder ein Ereignis unweigerlich eintritt oder dass man nicht anders kann, als etwas zu tun. Diese Struktur betont die Unvermeidlichkeit oder Zwangsläufigkeit einer Handlung. Wird häufig verwendet, um starke Emotionen oder Reaktionen auszudrücken.",
      formation: "Verb-ない-Stamm + ずにはおかない (する→せずにはおかない)",
      examples: [
        { japanese: "この映画は見る人を感動させずにはおかない。", romaji: "Kono eiga wa miru hito wo kandou sasezuni wa okanai.", german: "Dieser Film kann die Zuschauer nicht anders als bewegen." },
        { japanese: "彼の演説は聴衆を驚かせずにはおかなかった。", romaji: "Kare no enzetsu wa chousha wo odorokasezuni wa okanakatta.", german: "Seine Rede konnte das Publikum nicht anders als überraschen." }
      ],
      notes: "Formell und literarisch. Die Form mit する ist せずにはおかない.",
      related: ["n1-nai-de-wa-okanai", "n1-zu-ni-wa-sumanai"]
    },
    {
      id: "n1-nai-de-wa-okanai",
      pattern: "～ないではおかない",
      level: "N1",
      category: "Verben",
      meaning: "kann nicht umhin zu (Variante)",
      explanation: "Alternative Form zu ずにはおかない, die dieselbe Bedeutung der Unvermeidlichkeit ausdrückt. Diese Form ist etwas weniger formell, aber immer noch gehobene Sprache. Wird verwendet, um zu betonen, dass etwas zwangsläufig geschieht.",
      formation: "Verb-ない-Form + ではおかない",
      examples: [
        { japanese: "この事実は世間を騒がせないではおかない。", romaji: "Kono jijitsu wa seken wo sawagasenai de wa okanai.", german: "Diese Tatsache wird die Öffentlichkeit unweigerlich in Aufruhr versetzen." },
        { japanese: "彼女の美しさは人々を魅了しないではおかない。", romaji: "Kanojo no utsukushisa wa hitobito wo miryou shinai de wa okanai.", german: "Ihre Schönheit kann die Menschen nicht anders als faszinieren." }
      ],
      notes: "Synonym zu ずにはおかない. Beide Formen sind austauschbar.",
      related: ["n1-zu-ni-wa-okanai", "n1-nai-de-wa-sumanai"]
    },
    {
      id: "n1-zu-ni-wa-sumanai",
      pattern: "～ずにはすまない",
      level: "N1",
      category: "Verben",
      meaning: "muss unbedingt, kann nicht vermeiden",
      explanation: "Drückt aus, dass man etwas unbedingt tun muss, um eine Situation zu bereinigen oder seiner Verantwortung gerecht zu werden. Diese Struktur betont moralische Verpflichtung oder soziale Notwendigkeit. Oft verwendet, wenn man sich schuldig fühlt oder Wiedergutmachung leisten muss.",
      formation: "Verb-ない-Stamm + ずにはすまない (する→せずにはすまない)",
      examples: [
        { japanese: "約束を破ってしまったので、謝らずにはすまない。", romaji: "Yakusoku wo yabutte shimatta node, ayamarazu ni wa sumanai.", german: "Da ich das Versprechen gebrochen habe, muss ich mich unbedingt entschuldigen." },
        { japanese: "彼に迷惑をかけたから、お詫びをせずにはすまない。", romaji: "Kare ni meiwaku wo kaketa kara, owabi wo sezu ni wa sumanai.", german: "Da ich ihm Unannehmlichkeiten bereitet habe, muss ich mich unbedingt entschuldigen." }
      ],
      notes: "Betont moralische oder soziale Verpflichtung stärker als ずにはおかない.",
      related: ["n1-zu-ni-wa-okanai", "n1-nai-de-wa-sumanai"]
    },
    {
      id: "n1-nai-de-wa-sumanai",
      pattern: "～ないではすまない",
      level: "N1",
      category: "Verben",
      meaning: "muss unbedingt (Variante)",
      explanation: "Alternative Form zu ずにはすまない mit identischer Bedeutung. Drückt aus, dass etwas getan werden muss, um eine Situation zu klären oder Verantwortung zu übernehmen. Diese Form ist etwas gebräuchlicher in der modernen Sprache als die ず-Form.",
      formation: "Verb-ない-Form + ではすまない",
      examples: [
        { japanese: "この問題は説明しないではすまない。", romaji: "Kono mondai wa setsumei shinai de wa sumanai.", german: "Dieses Problem muss unbedingt erklärt werden." },
        { japanese: "責任者として、辞職しないではすまないだろう。", romaji: "Sekininsha toshite, jishoku shinai de wa sumanai darou.", german: "Als Verantwortlicher wird man wohl nicht umhinkommen zurückzutreten." }
      ],
      notes: "Synonym zu ずにはすまない. Beide Formen sind austauschbar.",
      related: ["n1-zu-ni-wa-sumanai", "n1-nai-de-wa-okanai"]
    },
    {
      id: "n1-te-yamanai",
      pattern: "～てやまない",
      level: "N1",
      category: "Verben",
      meaning: "aufrichtig wünschen, nicht aufhören zu",
      explanation: "Drückt einen tiefen, unaufhörlichen Wunsch oder ein starkes Gefühl aus, das nicht nachlässt. Diese sehr formelle Struktur wird hauptsächlich in geschriebener Sprache verwendet. Oft mit Verben wie 願う (wünschen), 祈る (beten), 望む (hoffen) kombiniert.",
      formation: "Verb-て-Form + やまない",
      examples: [
        { japanese: "皆様のご健康とご多幸を願ってやみません。", romaji: "Minasama no go-kenkou to go-takou wo negatte yamimasen.", german: "Ich wünsche Ihnen von Herzen Gesundheit und Glück." },
        { japanese: "世界平和を祈ってやまない。", romaji: "Sekai heiwa wo inotte yamanai.", german: "Ich bete unaufhörlich für den Weltfrieden." }
      ],
      notes: "Sehr formell, oft in Reden, Grußworten oder schriftlichen Ansprachen verwendet.",
      related: ["n1-te-tomanu", "n2-te-止まない"]
    },
    {
      id: "n1-te-kara-to-iu-mono",
      pattern: "～てからというもの",
      level: "N1",
      category: "Verben",
      meaning: "seitdem",
      explanation: "Betont, dass seit einem bestimmten Ereignis ein Zustand andauert oder sich etwas grundlegend verändert hat. Diese Struktur unterstreicht die Kontinuität oder dauerhafte Veränderung seit dem genannten Zeitpunkt. Oft wird eine auffällige oder bedeutende Veränderung beschrieben.",
      formation: "Verb-て-Form + からというもの",
      examples: [
        { japanese: "結婚してからというもの、毎日が幸せだ。", romaji: "Kekkon shite kara to iu mono, mainichi ga shiawase da.", german: "Seitdem ich geheiratet habe, ist jeder Tag glücklich." },
        { japanese: "彼女と別れてからというもの、彼は仕事に打ち込んでいる。", romaji: "Kanojo to wakarete kara to iu mono, kare wa shigoto ni uchikonde iru.", german: "Seitdem er sich von ihr getrennt hat, stürzt er sich in die Arbeit." }
      ],
      notes: "Betont die Bedeutsamkeit oder Dauerhaftigkeit der Veränderung stärker als einfaches てから.",
      related: ["n3-te-kara", "n1-te-irai"]
    },
    {
      id: "n1-katagata",
      pattern: "～かたがた",
      level: "N1",
      category: "Verben",
      meaning: "bei der Gelegenheit, nebenbei",
      explanation: "Drückt aus, dass man zwei Dinge gleichzeitig tut oder einen Zweck mit einem anderen verbindet. Diese formelle Struktur wird verwendet, um zu zeigen, dass man eine Gelegenheit nutzt, um zwei Ziele zu erreichen. Häufig in höflicher oder geschäftlicher Korrespondenz.",
      formation: "Nomen + かたがた / Verb-ます-Stamm + かたがた",
      examples: [
        { japanese: "お礼かたがた、ご挨拶に伺いました。", romaji: "Orei katagata, go-aisatsu ni ukagaimashita.", german: "Ich kam vorbei, um mich zu bedanken und gleichzeitig zu grüßen." },
        { japanese: "散歩かたがた、買い物に出かけた。", romaji: "Sanpo katagata, kaimono ni dekaketa.", german: "Ich ging spazieren und erledigte dabei gleichzeitig Einkäufe." }
      ],
      notes: "Formell und höflich. Wird oft in Geschäftsbriefen oder formellen Situationen verwendet.",
      related: ["n1-gatera", "n2-tsui-de-ni"]
    },
    {
      id: "n1-gatera",
      pattern: "～がてら",
      level: "N1",
      category: "Verben",
      meaning: "bei Gelegenheit von, während",
      explanation: "Ähnlich wie かたがた, drückt aus, dass man eine Hauptaktivität ausführt und dabei nebenbei etwas anderes tut. Diese Struktur betont, dass die zweite Handlung eine Begleitung oder Ergänzung zur ersten ist. Die Hauptaktion steht vor がてら.",
      formation: "Nomen + がてら / Verb-ます-Stamm + がてら",
      examples: [
        { japanese: "散歩がてら、郵便局に寄ってきた。", romaji: "Sanpo gatera, yuubinkyoku ni yotte kita.", german: "Ich bin bei einem Spaziergang beim Postamt vorbeigegangen." },
        { japanese: "買い物がてら、友達に会ってきた。", romaji: "Kaimono gatera, tomodachi ni atte kita.", german: "Ich habe mich mit einem Freund getroffen, während ich einkaufen war." }
      ],
      notes: "Etwas weniger formell als かたがた. Hauptaktion steht vor がてら.",
      related: ["n1-katagata", "n2-tsui-de-ni"]
    },
    {
      id: "n1-katawara",
      pattern: "～かたわら",
      level: "N1",
      category: "Verben",
      meaning: "neben, nebenbei",
      explanation: "Drückt aus, dass man zwei Aktivitäten parallel ausführt, wobei eine die Hauptbeschäftigung und die andere eine Nebentätigkeit ist. Diese Struktur wird verwendet, um parallele oder gleichzeitige Tätigkeiten zu beschreiben. Oft im Kontext von Beruf und Nebentätigkeit verwendet.",
      formation: "Nomen + のかたわら / Verb-辞書形 + かたわら",
      examples: [
        { japanese: "彼は会社員のかたわら、小説を書いている。", romaji: "Kare wa kaishain no katawara, shousetsu wo kaite iru.", german: "Nebenbei, dass er Büroangestellter ist, schreibt er auch Romane." },
        { japanese: "働くかたわら、大学で勉強している。", romaji: "Hataraku katawara, daigaku de benkyou shite iru.", german: "Neben der Arbeit studiere ich an der Universität." }
      ],
      notes: "Betont die Gleichzeitigkeit zweier kontinuierlicher Aktivitäten, nicht nur einmaliger Handlungen.",
      related: ["n1-katagata", "n1-gatera"]
    },
    {
      id: "n1-shimatsu-da",
      pattern: "～始末だ",
      level: "N1",
      category: "Verben",
      meaning: "es endet damit dass (negativ)",
      explanation: "Drückt aus, dass eine Situation zu einem bedauerlichen oder negativen Ergebnis führt. Diese Struktur betont, dass die Dinge so schlimm geworden sind, dass ein unerwünschtes Resultat eingetreten ist. Wird nur für negative Situationen verwendet.",
      formation: "Verb-辞書形/た-Form + 始末だ",
      examples: [
        { japanese: "借金が増えて、家を売る始末だ。", romaji: "Shakkin ga fuete, ie wo uru shimatsu da.", german: "Die Schulden nahmen so zu, dass es damit endete, dass ich das Haus verkaufen musste." },
        { japanese: "彼は遅刻ばかりして、ついにクビになる始末だった。", romaji: "Kare wa chikoku bakari shite, tsui ni kubi ni naru shimatsu datta.", german: "Er kam ständig zu spät und es endete schließlich damit, dass er gefeuert wurde." }
      ],
      notes: "Ausschließlich für negative Situationen. Drückt Bedauern oder Kritik aus.",
      related: ["n2-age-ku", "n1-you-ni-naru"]
    },
    {
      id: "n1-sobireru",
      pattern: "～そびれる",
      level: "N1",
      category: "Verben",
      meaning: "die Gelegenheit verpassen zu",
      explanation: "Drückt aus, dass man die Gelegenheit verpasst hat, etwas zu tun, obwohl man es vorhatte. Diese Struktur betont, dass man etwas nicht getan hat, weil der richtige Moment vorbei ist. Oft verbunden mit einem Gefühl des Bedauerns.",
      formation: "Verb-ます-Stamm + そびれる",
      examples: [
        { japanese: "聞きたいことがあったのに、聞きそびれてしまった。", romaji: "Kikitai koto ga atta noni, kikisobirete shimatta.", german: "Ich hatte etwas, das ich fragen wollte, aber ich habe die Gelegenheit verpasst." },
        { japanese: "朝ご飯を食べそびれて、お腹が空いた。", romaji: "Asa gohan wo tabesobirete, onaka ga suita.", german: "Ich habe es verpasst zu frühstücken und bin jetzt hungrig." }
      ],
      notes: "Impliziert oft Bedauern über die verpasste Gelegenheit.",
      related: ["n2-sokonau", "n3-te-shimau"]
    },
    {
      id: "n1-tsutsu-aru",
      pattern: "～つつある",
      level: "N1",
      category: "Verben",
      meaning: "im Begriff sein, sich im Prozess befinden",
      explanation: "Drückt aus, dass eine Veränderung oder Entwicklung gerade im Gange ist. Diese Struktur wird verwendet, um einen graduellen Prozess oder eine fortschreitende Veränderung zu beschreiben. Oft in formellen Kontexten oder Nachrichtenberichten verwendet.",
      formation: "Verb-ます-Stamm + つつある",
      examples: [
        { japanese: "地球の環境は悪化しつつある。", romaji: "Chikyuu no kankyou wa akka shitsutsu aru.", german: "Die Umwelt der Erde verschlechtert sich zunehmend." },
        { japanese: "経済は回復しつつあります。", romaji: "Keizai wa kaifuku shitsutsu arimasu.", german: "Die Wirtschaft befindet sich im Erholungsprozess." }
      ],
      notes: "Formeller als ている. Betont den graduellen Prozess der Veränderung.",
      related: ["n3-te-iru", "n1-tsutsu"]
    },
    {
      id: "n1-te-shikaru-beki",
      pattern: "～て然るべき",
      level: "N1",
      category: "Verben",
      meaning: "sollte, es wäre angemessen",
      explanation: "Drückt aus, dass etwas natürlich, angemessen oder zu erwarten wäre. Diese formelle Struktur wird verwendet, um zu sagen, dass etwas so sein sollte, wie es die Vernunft oder Moral gebietet. Oft in kritischem oder bewertendem Kontext verwendet.",
      formation: "Verb-て-Form + 然るべき + Nomen",
      examples: [
        { japanese: "この問題について、政府は説明して然るべきだ。", romaji: "Kono mondai ni tsuite, seifu wa setsumei shite shikaru beki da.", german: "Die Regierung sollte dieses Problem angemessen erklären." },
        { japanese: "彼は責任者として謝罪して然るべき立場にある。", romaji: "Kare wa sekininsha toshite shazai shite shikaru beki tachiba ni aru.", german: "Als Verantwortlicher befindet er sich in einer Position, in der er sich entschuldigen sollte." }
      ],
      notes: "Sehr formell und literarisch. 然る (しかる) bedeutet 'so sein, angemessen sein'.",
      related: ["n2-beki", "n1-te-touzen"]
    },
    {
      id: "n1-te-nao",
      pattern: "～てなお",
      level: "N1",
      category: "Verben",
      meaning: "selbst danach noch, trotzdem noch",
      explanation: "Drückt aus, dass selbst nachdem etwas getan wurde oder geschehen ist, ein Zustand oder eine Situation weiterhin besteht. Diese Struktur betont die Persistenz oder Hartnäckigkeit eines Zustands trotz vorheriger Handlungen. Wird verwendet, um Überraschung oder Bewunderung auszudrücken.",
      formation: "Verb-て-Form + なお",
      examples: [
        { japanese: "何度も失敗してなお、彼は諦めなかった。", romaji: "Nando mo shippai shite nao, kare wa akiramenakatta.", german: "Selbst nachdem er viele Male gescheitert war, gab er noch nicht auf." },
        { japanese: "説明を聞いてなお、理解できない。", romaji: "Setsumei wo kiite nao, rikai dekinai.", german: "Selbst nachdem ich die Erklärung gehört habe, kann ich es immer noch nicht verstehen." }
      ],
      notes: "Betont die Fortsetzung eines Zustands trotz entgegenwirkender Faktoren.",
      related: ["n2-te-mo", "n1-te-mo-nao"]
    },
    {
      id: "n1-de-wa-aru-mai-shi",
      pattern: "～ではあるまいし",
      level: "N1",
      category: "Verben",
      meaning: "es ist ja nicht so dass",
      explanation: "Drückt aus, dass eine Situation oder ein Verhalten unangemessen ist, weil sie nicht der genannten extremen Situation entspricht. Diese Struktur wird verwendet, um zu kritisieren oder zu argumentieren, dass etwas übertrieben oder unangebracht ist. Oft mit einem Gefühl der Unzufriedenheit oder Kritik.",
      formation: "Nomen + ではあるまいし / Verb-辞書形 + のではあるまいし",
      examples: [
        { japanese: "子供ではあるまいし、そんなことで泣くな。", romaji: "Kodomo de wa aru mai shi, sonna koto de naku na.", german: "Du bist doch kein Kind mehr, weine nicht wegen so etwas." },
        { japanese: "戦争ではあるまいし、そこまでする必要はない。", romaji: "Sensou de wa aru mai shi, soko made suru hitsuyou wa nai.", german: "Es ist ja kein Krieg, es ist nicht nötig, so weit zu gehen." }
      ],
      notes: "Drückt Kritik oder Unzufriedenheit aus. Impliziert, dass das Verhalten übertrieben ist.",
      related: ["n2-wake-de-wa-nai", "n1-mono-de-wa-nai"]
    },
    {
      id: "n1-to-aimatte",
      pattern: "～と相まって",
      level: "N1",
      category: "Verben",
      meaning: "zusammen mit, gepaart mit",
      explanation: "Drückt aus, dass zwei oder mehr Faktoren zusammenwirken und ein bestimmtes Ergebnis erzeugen. Diese Struktur betont, dass verschiedene Elemente sich gegenseitig verstärken. Wird in formellen oder analytischen Kontexten verwendet, um Ursachen oder Faktoren zu beschreiben.",
      formation: "Nomen + と相まって",
      examples: [
        { japanese: "好天と相まって、売り上げが伸びた。", romaji: "Kouten to aimatte, uriage ga nobita.", german: "Gepaart mit dem guten Wetter stiegen die Verkäufe." },
        { japanese: "彼の努力と才能が相まって、成功を収めた。", romaji: "Kare no doryoku to sainou ga aimatte, seikou wo osameta.", german: "Seine Anstrengungen zusammen mit seinem Talent führten zum Erfolg." }
      ],
      notes: "Formell. Betont das Zusammenwirken mehrerer positiver oder negativer Faktoren.",
      related: ["n2-ni-kuwaete", "n1-to-aite"]
    },
    {
      id: "n1-tomosureba-tomosuru-to",
      pattern: "～ともすれば/～ともすると",
      level: "N1",
      category: "Verben",
      meaning: "dazu neigen, leicht dazu kommen",
      explanation: "Drückt aus, dass man leicht in eine bestimmte (meist negative) Situation gerät oder zu einem bestimmten Verhalten neigt. Diese Struktur wird verwendet, um eine Tendenz oder Anfälligkeit zu beschreiben. Oft gefolgt von negativen Konsequenzen oder Zuständen.",
      formation: "ともすれば / ともすると (keine Konjugation nötig)",
      examples: [
        { japanese: "忙しいと、ともすれば健康を害しがちだ。", romaji: "Isogashii to, tomosureba kenkou wo gaishi gachi da.", german: "Wenn man beschäftigt ist, neigt man leicht dazu, seine Gesundheit zu schädigen." },
        { japanese: "一人でいると、ともすると悲観的になる。", romaji: "Hitori de iru to, tomosuru to hikantek ni naru.", german: "Wenn man allein ist, wird man leicht pessimistisch." }
      ],
      notes: "ともすれば und ともすると sind austauschbar. Meist mit negativen Tendenzen verwendet.",
      related: ["n2-gachi", "n2-yasu-i"]
    },
    {
      id: "n1-naku-mo-nai",
      pattern: "～なくもない",
      level: "N1",
      category: "Verben",
      meaning: "nicht ganz unmöglich, ein wenig",
      explanation: "Drückt eine schwache Affirmation aus, indem eine doppelte Verneinung verwendet wird. Diese Struktur bedeutet, dass etwas möglich ist, aber mit Vorbehalten oder in geringem Maße. Wird verwendet, um vorsichtige oder zurückhaltende Zustimmung auszudrücken.",
      formation: "い-Adjektiv-く + もない / Verb-ない-Form + くもない / Nomen + でなくもない",
      examples: [
        { japanese: "彼の言うことも分からなくもない。", romaji: "Kare no iu koto mo wakaranaku mo nai.", german: "Was er sagt, ist nicht ganz unverständlich." },
        { japanese: "その提案を受け入れられなくもない。", romaji: "Sono teian wo ukeirerare naku mo nai.", german: "Es ist nicht unmöglich, den Vorschlag anzunehmen." }
      ],
      notes: "Drückt zurückhaltende oder vorsichtige Zustimmung aus. Schwächer als eine direkte Affirmation.",
      related: ["n2-nai-koto-mo-nai", "n1-nai-demo-nai"]
    },
    {
      id: "n1-ni-itaru",
      pattern: "～に至る",
      level: "N1",
      category: "Verben",
      meaning: "bis zu dem Punkt gelangen",
      explanation: "Drückt aus, dass eine Situation einen bestimmten Punkt oder Zustand erreicht hat, oft nach einem langen Prozess. Diese formelle Struktur wird verwendet, um das Erreichen eines Endpunkts oder einer Schlussfolgerung zu beschreiben. Kann sowohl für positive als auch negative Entwicklungen verwendet werden.",
      formation: "Nomen + に至る / Verb-辞書形 + に至る",
      examples: [
        { japanese: "長年の研究の末、成功に至った。", romaji: "Naganen no kenkyuu no sue, seikou ni itatta.", german: "Nach jahrelanger Forschung gelangte man schließlich zum Erfolg." },
        { japanese: "事態は最悪の状況に至っている。", romaji: "Jitai wa saiaku no joukyou ni itatte iru.", german: "Die Situation hat den schlimmsten Punkt erreicht." }
      ],
      notes: "Formell. Betont den Prozess bis zum Erreichen eines bestimmten Zustands.",
      related: ["n1-ni-itatte-wa", "n2-ni-yotte"]
    },
    {
      id: "n1-ni-itatte-wa",
      pattern: "～に至っては",
      level: "N1",
      category: "Verben",
      meaning: "was ... betrifft (Extremfall)",
      explanation: "Wird verwendet, um einen extremen Fall oder ein besonders bemerkenswertes Beispiel hervorzuheben. Diese Struktur betont, dass das genannte Beispiel besonders auffällig oder extrem ist im Vergleich zu anderen. Oft gefolgt von einer überraschenden oder extremen Aussage.",
      formation: "Nomen + に至っては",
      examples: [
        { japanese: "最近の若者は本を読まない。彼に至っては、漫画すら読まない。", romaji: "Saikin no wakamono wa hon wo yomanai. Kare ni itatte wa, manga sura yomanai.", german: "Junge Leute lesen heutzutage keine Bücher. Was ihn betrifft, liest er nicht einmal Manga." },
        { japanese: "今年の夏は暑い。先週に至っては、40度を超えた。", romaji: "Kotoshi no natsu wa atsui. Senshuu ni itatte wa, 40-do wo koeta.", german: "Dieser Sommer ist heiß. Letzte Woche ist es sogar über 40 Grad gestiegen." }
      ],
      notes: "Hebt einen extremen oder bemerkenswerten Fall hervor. Oft mit negativen Beispielen.",
      related: ["n1-ni-itaru", "n2-ni-oite-wa"]
    },
    {
      id: "n1-ni-koshita-koto-wa-nai",
      pattern: "～に越したことはない",
      level: "N1",
      category: "Verben",
      meaning: "nichts ist besser als",
      explanation: "Drückt aus, dass etwas die beste Option oder der idealste Zustand ist. Diese Struktur wird verwendet, um eine Empfehlung oder Präferenz auszudrücken. Bedeutet wörtlich 'es gibt nichts, das darüber hinausgeht'.",
      formation: "Verb-辞書形/ない-Form + に越したことはない / い-Adjektiv + に越したことはない",
      examples: [
        { japanese: "健康が一番だ。病気にならないに越したことはない。", romaji: "Kenkou ga ichiban da. Byouki ni naranai ni koshita koto wa nai.", german: "Gesundheit ist das Wichtigste. Nichts ist besser, als nicht krank zu werden." },
        { japanese: "安全のためには、早く帰るに越したことはない。", romaji: "Anzen no tame ni wa, hayaku kaeru ni koshita koto wa nai.", german: "Aus Sicherheitsgründen ist es am besten, früh nach Hause zu gehen." }
      ],
      notes: "Drückt aus, dass etwas die beste oder idealste Option ist.",
      related: ["n2-hou-ga-ii", "n1-ni-kagiru"]
    },
    {
      id: "n1-ni-sakidatte",
      pattern: "～に先立って/～に先立ち",
      level: "N1",
      category: "Verben",
      meaning: "vor, im Vorfeld von",
      explanation: "Drückt aus, dass etwas vor einem wichtigen Ereignis geschieht. Diese formelle Struktur wird verwendet, um zeitliche Priorität oder Vorbereitung auszudrücken. Häufig in offiziellen Ankündigungen oder formellen Kontexten verwendet.",
      formation: "Nomen + に先立って/に先立ち / Verb-辞書形 + に先立って/に先立ち",
      examples: [
        { japanese: "開会式に先立って、リハーサルが行われた。", romaji: "Kaikaisiki ni sakidatte, rihaasaru ga okonawareta.", german: "Im Vorfeld der Eröffnungszeremonie wurde eine Probe abgehalten." },
        { japanese: "新製品の発売に先立ち、記者会見を開きます。", romaji: "Shinseihin no hatsubai ni sakidachi, kisha kaiken wo hirakimasu.", german: "Vor der Markteinführung des neuen Produkts werden wir eine Pressekonferenz abhalten." }
      ],
      notes: "Formell. に先立って und に先立ち sind austauschbar, wobei に先立ち etwas formeller ist.",
      related: ["n2-mae-ni", "n1-ni-saki-datte"]
    },
    {
      id: "n1-ba-koso",
      pattern: "～ばこそ",
      level: "N1",
      category: "Verben",
      meaning: "gerade weil",
      explanation: "Betont stark den Grund für etwas, oft mit emotionaler Färbung. Diese Struktur wird verwendet, um zu unterstreichen, dass etwas speziell oder ausschließlich wegen eines bestimmten Grundes geschieht. Drückt oft Dankbarkeit, Stolz oder tiefe Überzeugung aus.",
      formation: "Verb-ば-Form + こそ / い-Adjektiv-ければ + こそ / な-Adjektiv/Nomen + であればこそ",
      examples: [
        { japanese: "あなたを信頼すればこそ、この仕事を任せるのです。", romaji: "Anata wo shinrai sureba koso, kono shigoto wo makaseru no desu.", german: "Gerade weil ich dir vertraue, übertrage ich dir diese Arbeit." },
        { japanese: "苦労があればこそ、成功の喜びも大きい。", romaji: "Kurou ga areba koso, seikou no yorokobi mo ookii.", german: "Gerade weil es Mühe gab, ist die Freude über den Erfolg umso größer." }
      ],
      notes: "Sehr emphatisch. Betont den kausalen Zusammenhang stark.",
      related: ["n2-kara-koso", "n1-te-koso"]
    },
    {
      id: "n1-ba-sore-made-da",
      pattern: "～ばそれまでだ/～たらそれまでだ",
      level: "N1",
      category: "Verben",
      meaning: "wenn dann ist es vorbei",
      explanation: "Drückt aus, dass wenn etwas passiert, alles vorbei ist oder alle Bemühungen umsonst waren. Diese Struktur wird verwendet, um eine Situation zu beschreiben, die unwiderruflich oder endgültig ist. Oft mit einem Gefühl der Resignation oder Warnung.",
      formation: "Verb-ば-Form + それまでだ / Verb-たら-Form + それまでだ",
      examples: [
        { japanese: "試験に落ちればそれまでだ。", romaji: "Shiken ni ochireba sore made da.", german: "Wenn ich durch die Prüfung falle, ist alles vorbei." },
        { japanese: "諦めたらそれまでだ。最後まで頑張ろう。", romaji: "Akirametara sore made da. Saigo made ganbarou.", german: "Wenn wir aufgeben, ist es vorbei. Lass uns bis zum Ende durchhalten." }
      ],
      notes: "Drückt Endgültigkeit oder Resignation aus. Warnt vor unwiderruflichen Konsequenzen.",
      related: ["n2-tara", "n1-ba"]
    },
    {
      id: "n1-bekarazu",
      pattern: "～べからず",
      level: "N1",
      category: "Verben",
      meaning: "darf nicht, soll nicht (Verbot)",
      explanation: "Sehr formelles und starkes Verbot, das hauptsächlich in geschriebenen Regeln und Vorschriften verwendet wird. Diese archaische Struktur ist in moderner gesprochener Sprache nicht üblich. Wird oft auf Schildern oder in offiziellen Dokumenten gesehen.",
      formation: "Verb-辞書形 + べからず",
      examples: [
        { japanese: "立入るべからず。", romaji: "Tachiiru bekarazu.", german: "Betreten verboten." },
        { japanese: "他人に迷惑をかけるべからず。", romaji: "Tanin ni meiwaku wo kakeru bekarazu.", german: "Man darf anderen keine Unannehmlichkeiten bereiten." }
      ],
      notes: "Sehr formell und archaisch. Hauptsächlich auf Schildern oder in schriftlichen Regeln.",
      related: ["n1-beki", "n2-te-wa-ikenai"]
    },
    {
      id: "n1-beku",
      pattern: "～べく",
      level: "N1",
      category: "Verben",
      meaning: "um zu, mit dem Ziel",
      explanation: "Drückt einen Zweck oder eine Absicht aus, oft in formellen oder literarischen Kontexten. Diese Struktur ist eine formellere Alternative zu ために. Wird verwendet, um zu beschreiben, dass etwas mit einem bestimmten Ziel getan wird.",
      formation: "Verb-辞書形 + べく (する→すべく)",
      examples: [
        { japanese: "成功すべく、努力を続けている。", romaji: "Seikou subeku, doryoku wo tsudzukete iru.", german: "Um erfolgreich zu sein, setze ich meine Bemühungen fort." },
        { japanese: "真実を明らかにすべく、調査を開始した。", romaji: "Shinjitsu wo akiraka ni subeku, chousa wo kaishi shita.", german: "Um die Wahrheit aufzudecken, begann man mit der Untersuchung." }
      ],
      notes: "Formell und literarisch. する wird zu すべく.",
      related: ["n2-tame-ni", "n1-beki"]
    },
    {
      id: "n1-beku-mo-nai",
      pattern: "～べくもない",
      level: "N1",
      category: "Verben",
      meaning: "kann unmöglich",
      explanation: "Drückt aus, dass etwas völlig unmöglich ist oder nicht erreicht werden kann. Diese sehr formelle Struktur betont die absolute Unmöglichkeit. Wird oft verwendet, um auszudrücken, dass etwas weit außerhalb der Reichweite liegt.",
      formation: "Verb-辞書形 + べくもない (する→すべくもない)",
      examples: [
        { japanese: "彼の才能は私などが及ぶべくもない。", romaji: "Kare no sainou wa watashi nado ga oyobu beku mo nai.", german: "Sein Talent ist etwas, das ich unmöglich erreichen kann." },
        { japanese: "この問題は素人が解決すべくもない。", romaji: "Kono mondai wa shirouto ga kaiketsu subeku mo nai.", german: "Dieses Problem kann von einem Laien unmöglich gelöst werden." }
      ],
      notes: "Sehr formell. Betont absolute Unmöglichkeit.",
      related: ["n1-beku", "n2-wake-ga-nai"]
    },
    {
      id: "n1-majiki",
      pattern: "～まじき",
      level: "N1",
      category: "Verben",
      meaning: "unverzeihlich für, unwürdig",
      explanation: "Drückt aus, dass etwas moralisch inakzeptabel oder unwürdig ist. Diese sehr formelle und archaische Struktur wird verwendet, um starke moralische Verurteilung auszudrücken. Hauptsächlich in literarischen oder sehr formellen Kontexten.",
      formation: "Verb-辞書形 + まじき + Nomen",
      examples: [
        { japanese: "教師にあるまじき行為だ。", romaji: "Kyoushi ni aru majiki koui da.", german: "Das ist ein Verhalten, das eines Lehrers unwürdig ist." },
        { japanese: "人として許すまじき罪を犯した。", romaji: "Hito toshite yurusu majiki tsumi wo okashita.", german: "Er beging ein Verbrechen, das für einen Menschen unverzeihlich ist." }
      ],
      notes: "Sehr formell und archaisch. Drückt starke moralische Verurteilung aus.",
      related: ["n1-bekarazu", "n2-beki-de-wa-nai"]
    },
    {
      id: "n1-made-da",
      pattern: "～までだ/～までのことだ",
      level: "N1",
      category: "Verben",
      meaning: "dann bleibt nichts anderes als",
      explanation: "Drückt aus, dass wenn eine Bedingung nicht erfüllt ist, man einfach etwas anderes tut. Diese Struktur wird verwendet, um eine alternative Lösung oder einen Notfallplan auszudrücken. Oft mit einem Gefühl der Resignation oder Pragmatismus.",
      formation: "Verb-辞書形 + までだ/までのことだ",
      examples: [
        { japanese: "彼が来なければ、一人で行くまでだ。", romaji: "Kare ga konakereba, hitori de iku made da.", german: "Wenn er nicht kommt, gehe ich eben alleine." },
        { japanese: "だめなら、諦めるまでのことだ。", romaji: "Dame nara, akirameru made no koto da.", german: "Wenn es nicht klappt, bleibt mir nichts anderes übrig, als aufzugeben." }
      ],
      notes: "Drückt eine pragmatische oder resignierte Haltung aus.",
      related: ["n2-shika-nai", "n1-nomi"]
    },
    {
      id: "n1-made-mo-nai",
      pattern: "～までもない",
      level: "N1",
      category: "Verben",
      meaning: "es ist nicht nötig zu",
      explanation: "Drückt aus, dass etwas so offensichtlich oder einfach ist, dass es nicht notwendig ist, es zu tun. Diese Struktur betont, dass eine Handlung überflüssig ist. Kann auch bedeuten, dass etwas selbstverständlich ist.",
      formation: "Verb-辞書形 + までもない",
      examples: [
        { japanese: "そんなことは言うまでもない。", romaji: "Sonna koto wa iu made mo nai.", german: "So etwas zu sagen ist nicht nötig (das versteht sich von selbst)." },
        { japanese: "説明するまでもなく、みんな理解している。", romaji: "Setsumei suru made mo naku, minna rikai shite iru.", german: "Ohne dass es nötig wäre zu erklären, verstehen es alle." }
      ],
      notes: "Betont, dass etwas selbstverständlich oder überflüssig ist.",
      related: ["n2-hitsuyou-ga-nai", "n1-made-da"]
    },
    {
      id: "n1-mono-wo",
      pattern: "～ものを",
      level: "N1",
      category: "Verben",
      meaning: "obwohl, aber (Bedauern)",
      explanation: "Drückt Bedauern oder Unzufriedenheit über eine Situation aus, die anders hätte sein können. Diese Struktur wird verwendet, um zu zeigen, dass die Realität nicht den Erwartungen entspricht. Oft am Satzende mit einem Gefühl der Enttäuschung.",
      formation: "Verb-辞書形/た-Form + ものを / い-Adjektiv + ものを",
      examples: [
        { japanese: "早く言ってくれればよかったものを。", romaji: "Hayaku itte kurereba yokatta mono wo.", german: "Hättest du es mir doch nur früher gesagt (aber du hast es nicht getan)." },
        { japanese: "謝れば許してもらえたものを、意地を張って損をした。", romaji: "Ayamareba yurushite moraeta mono wo, iji wo hatte son wo shita.", german: "Hätte ich mich entschuldigt, wäre mir vergeben worden, aber ich war stur und habe verloren." }
      ],
      notes: "Drückt Bedauern über eine verpasste Gelegenheit oder schlechte Entscheidung aus.",
      related: ["n2-noni", "n1-tara-yokatta"]
    },
    {
      id: "n1-ya-inaya",
      pattern: "～や否や",
      level: "N1",
      category: "Verben",
      meaning: "kaum dass, sobald",
      explanation: "Drückt aus, dass unmittelbar nach einer Handlung eine andere folgt. Diese formelle Struktur betont die Unmittelbarkeit und Schnelligkeit der aufeinanderfolgenden Ereignisse. Wird hauptsächlich in geschriebener Sprache verwendet.",
      formation: "Verb-辞書形 + や否や",
      examples: [
        { japanese: "家に帰るや否や、電話が鳴った。", romaji: "Ie ni kaeru ya inaya, denwa ga natta.", german: "Kaum war ich zu Hause, klingelte das Telefon." },
        { japanese: "試験が終わるや否や、学生たちは教室を飛び出した。", romaji: "Shiken ga owaru ya inaya, gakuseitachi wa kyoushitsu wo tobidashita.", german: "Sobald die Prüfung vorbei war, stürmten die Studenten aus dem Klassenzimmer." }
      ],
      notes: "Formell und literarisch. Betont die unmittelbare Aufeinanderfolge zweier Ereignisse.",
      related: ["n3-to-sugu", "n2-totan-ni"]
    },
    {
      id: "n1-you-ga-you-to",
      pattern: "～ようが/～ようと",
      level: "N1",
      category: "Verben",
      meaning: "egal wie/was man tut",
      explanation: "Drückt aus, dass unabhängig davon, was geschieht oder getan wird, das Ergebnis gleich bleibt. Diese Struktur wird verwendet, um zu betonen, dass etwas unter allen Umständen gilt. Oft in der Form AようがBようが verwendet.",
      formation: "Verb-意向形 + が/と / Verb-意向形 + が + Verb-意向形 + が",
      examples: [
        { japanese: "雨が降ろうが降るまいが、試合は行われる。", romaji: "Ame ga furou ga furu mai ga, shiai wa okonawareru.", german: "Egal ob es regnet oder nicht, das Spiel findet statt." },
        { japanese: "何をしようと、結果は変わらない。", romaji: "Nani wo shiyou to, kekka wa kawaranai.", german: "Egal was man tut, das Ergebnis ändert sich nicht." }
      ],
      notes: "ようが und ようと sind austauschbar. Oft in der Form AようがBようが.",
      related: ["n2-te-mo", "n1-to-mo"]
    },
    {
      id: "n1-you-ni-mo-nai",
      pattern: "～ようにも～ない",
      level: "N1",
      category: "Verben",
      meaning: "selbst wenn man wollte, kann man nicht",
      explanation: "Drückt aus, dass man etwas tun möchte, aber aus objektiven Gründen nicht kann. Diese Struktur betont die Unmöglichkeit trotz des Wunsches oder der Absicht. Wird verwendet, um Frustration oder Hilflosigkeit auszudrücken.",
      formation: "Verb-意向形 + にも + Verb-可能形-ない",
      examples: [
        { japanese: "お金がなくて、買おうにも買えない。", romaji: "Okane ga nakute, kaou ni mo kaenai.", german: "Ich habe kein Geld, selbst wenn ich es kaufen wollte, kann ich es nicht." },
        { japanese: "電話番号を知らないので、連絡しようにもできない。", romaji: "Denwa bangou wo shiranai node, renraku shiyou ni mo dekinai.", german: "Ich kenne die Telefonnummer nicht, also kann ich nicht Kontakt aufnehmen, selbst wenn ich wollte." }
      ],
      notes: "Betont die Unmöglichkeit trotz des Wunsches oder der Absicht.",
      related: ["n2-tai-kedo-dekinai", "n1-ta-kute-mo"]
    },
    {
      id: "n1-wo-motte-shite-mo",
      pattern: "～をもってしても",
      level: "N1",
      category: "Verben",
      meaning: "selbst mit",
      explanation: "Drückt aus, dass selbst mit einem bestimmten Mittel oder unter einer bestimmten Bedingung etwas nicht erreicht werden kann. Diese formelle Struktur betont, dass ein normalerweise wirksames Mittel in diesem Fall nicht ausreicht. Wird verwendet, um die Schwierigkeit oder Unmöglichkeit von etwas zu unterstreichen.",
      formation: "Nomen + をもってしても",
      examples: [
        { japanese: "現代の科学をもってしても、この病気は治せない。", romaji: "Gendai no kagaku wo motte shite mo, kono byouki wa naosenai.", german: "Selbst mit der modernen Wissenschaft kann diese Krankheit nicht geheilt werden." },
        { japanese: "彼の努力をもってしても、優勝は難しいだろう。", romaji: "Kare no doryoku wo motte shite mo, yuushou wa muzukashii darou.", german: "Selbst mit seinen Bemühungen wird der Sieg schwierig sein." }
      ],
      notes: "Sehr formell. Betont, dass etwas trotz eines starken Mittels nicht möglich ist.",
      related: ["n2-te-mo", "n1-wo-motte"]
    },
    {
      id: "n1-n-ga-tame-ni",
      pattern: "～んがために",
      level: "N1",
      category: "Verben",
      meaning: "um zu (formal)",
      explanation: "Sehr formelle Version von ために, die einen Zweck oder eine Absicht ausdrückt. Diese archaische Struktur wird hauptsächlich in literarischen oder sehr formellen Kontexten verwendet. Betont die Ernsthaftigkeit oder Wichtigkeit des Ziels.",
      formation: "Verb-ない-Stamm + んがために (する→せんがために)",
      examples: [
        { japanese: "成功せんがために、彼は全てを犠牲にした。", romaji: "Seikou sen ga tame ni, kare wa subete wo gisei ni shita.", german: "Um erfolgreich zu sein, opferte er alles." },
        { japanese: "真実を知らんがために、彼女は調査を続けた。", romaji: "Shinjitsu wo shiran ga tame ni, kanojo wa chousa wo tsudzuketa.", german: "Um die Wahrheit zu erfahren, setzte sie die Untersuchung fort." }
      ],
      notes: "Sehr formell und archaisch. する wird zu せんがために. Literarischer Stil.",
      related: ["n2-tame-ni", "n1-beku"]
    },
    {
      id: "n1-n-bakari-ni",
      pattern: "～んばかりに",
      level: "N1",
      category: "Verben",
      meaning: "als ob gleich",
      explanation: "Drückt aus, dass etwas so aussieht oder sich so anfühlt, als würde es gleich passieren. Diese Struktur wird verwendet, um eine intensive oder extreme Situation bildhaft zu beschreiben. Betont die Unmittelbarkeit oder Intensität eines Zustands.",
      formation: "Verb-ない-Stamm + んばかりに (する→せんばかりに) / Verb-た-Form + ばかりに",
      examples: [
        { japanese: "彼は今にも泣かんばかりの顔をしていた。", romaji: "Kare wa ima ni mo nakan bakari no kao wo shite ita.", german: "Sein Gesicht sah aus, als würde er gleich weinen." },
        { japanese: "群衆は喜びに溢れんばかりだった。", romaji: "Gunshuu wa yorokobi ni afuren bakari datta.", german: "Die Menge war so erfüllt von Freude, als würde sie überlaufen." }
      ],
      notes: "Literarisch und bildhaft. する wird zu せんばかりに.",
      related: ["n2-sou", "n1-bakari"]
    },
    {
      id: "n1-ga-saigo-tara-saigo",
      pattern: "～が最後/～たら最後",
      level: "N1",
      category: "Verben",
      meaning: "wenn einmal dann kein Zurück",
      explanation: "Drückt aus, dass wenn etwas einmal passiert, eine unwiderrufliche oder extreme Konsequenz folgt. Diese Struktur betont die Endgültigkeit und oft negative Folgen. Wird verwendet, um vor schwerwiegenden oder unwiderruflichen Konsequenzen zu warnen.",
      formation: "Verb-辞書形/た-Form + が最後 / Verb-たら-Form + 最後",
      examples: [
        { japanese: "彼に秘密を話したが最後、すぐに広まってしまう。", romaji: "Kare ni himitsu wo hanashita ga saigo, sugu ni hiromatte shimau.", german: "Wenn man ihm einmal ein Geheimnis erzählt, verbreitet es sich sofort." },
        { japanese: "あの道に入ったら最後、二度と戻れない。", romaji: "Ano michi ni haittara saigo, nido to modorenai.", german: "Wenn man einmal diesen Weg einschlägt, kann man nicht mehr zurück." }
      ],
      notes: "Betont unwiderrufliche, oft negative Konsequenzen. Warnung vor Point of no return.",
      related: ["n1-ba-sore-made-da", "n1-ta-ga-saigo"]
    },
    {
      id: "n1-koto-nashi-ni",
      pattern: "～ことなしに",
      level: "N1",
      category: "Verben",
      meaning: "ohne zu",
      explanation: "Formelle Ausdrucksweise, die bedeutet 'ohne etwas zu tun'. Diese Struktur wird verwendet, um auszudrücken, dass etwas erreicht wird, ohne eine bestimmte Handlung auszuführen. Oft in literarischen oder akademischen Texten.",
      formation: "Verb-辞書形 + ことなしに",
      examples: [
        { japanese: "努力することなしに、成功は得られない。", romaji: "Doryoku suru koto nashi ni, seikou wa erarenai.", german: "Ohne sich anzustrengen, kann man keinen Erfolg erlangen." },
        { japanese: "彼は一言も言うことなしに、部屋を出て行った。", romaji: "Kare wa hitokoto mo iu koto nashi ni, heya wo dete itta.", german: "Ohne ein Wort zu sagen, verließ er das Zimmer." }
      ],
      notes: "Formell und literarisch. Formellere Alternative zu ないで oder ずに.",
      related: ["n1-nashi-ni", "n3-nai-de"]
    },
    {
      id: "n1-nashi-ni-nakushite",
      pattern: "～なしに/～なくして",
      level: "N1",
      category: "Verben",
      meaning: "ohne",
      explanation: "Drückt aus, dass etwas ohne eine bestimmte Bedingung oder ein bestimmtes Element nicht möglich ist. Diese Struktur betont die Notwendigkeit oder Unverzichtbarkeit von etwas. Wird oft in formellen oder emphatischen Kontexten verwendet.",
      formation: "Nomen + なしに/なくして / Verb-辞書形 + ことなしに",
      examples: [
        { japanese: "努力なしに成功はない。", romaji: "Doryoku nashi ni seikou wa nai.", german: "Ohne Anstrengung gibt es keinen Erfolg." },
        { japanese: "平和なくして発展はありえない。", romaji: "Heiwa nakushite hatten wa arienai.", german: "Ohne Frieden ist Entwicklung unmöglich." }
      ],
      notes: "なくして ist emphatischer als なしに. Beide betonen die Unverzichtbarkeit.",
      related: ["n1-koto-nashi-ni", "n2-nashi-de-wa"]
    },
    {
      id: "n1-tokoro-wo",
      pattern: "～ところを",
      level: "N1",
      category: "Verben",
      meaning: "obwohl gerade (unterbrochen)",
      explanation: "Drückt aus, dass jemand gerade dabei ist oder war, etwas zu tun, als er unterbrochen wurde oder etwas anderes geschah. Diese Struktur wird oft verwendet, um Entschuldigung oder Dankbarkeit auszudrücken. Betont den Timing-Aspekt der Unterbrechung.",
      formation: "Verb-辞書形/ている-Form/た-Form + ところを",
      examples: [
        { japanese: "お忙しいところを、お時間をいただきありがとうございます。", romaji: "Oisogashii tokoro wo, ojikan wo itadaki arigatou gozaimasu.", german: "Vielen Dank, dass Sie sich Zeit genommen haben, obwohl Sie beschäftigt sind." },
        { japanese: "休んでいるところを邪魔してすみません。", romaji: "Yasunde iru tokoro wo jama shite sumimasen.", german: "Entschuldigung, dass ich Sie störe, während Sie sich ausruhen." }
      ],
      notes: "Oft in höflichen Entschuldigungen oder Dankesbekundungen verwendet.",
      related: ["n2-tokoro", "n1-sai-ni"]
    },
    {
      id: "n1-te-koso",
      pattern: "～てこそ",
      level: "N1",
      category: "Verben",
      meaning: "erst durch, nur wenn",
      explanation: "Betont, dass etwas nur unter einer bestimmten Bedingung wahr oder wertvoll ist. Diese Struktur drückt aus, dass die genannte Bedingung wesentlich oder unverzichtbar ist. Wird verwendet, um die Wichtigkeit oder Notwendigkeit von etwas zu unterstreichen.",
      formation: "Verb-て-Form + こそ / Nomen + であってこそ",
      examples: [
        { japanese: "努力してこそ、成功の価値がある。", romaji: "Doryoku shite koso, seikou no kachi ga aru.", german: "Erst durch Anstrengung hat Erfolg einen Wert." },
        { japanese: "健康であってこそ、幸せを感じられる。", romaji: "Kenkou de atte koso, shiawase wo kanjrareru.", german: "Nur wenn man gesund ist, kann man Glück empfinden." }
      ],
      notes: "Betont die Unverzichtbarkeit oder wesentliche Bedeutung einer Bedingung.",
      related: ["n1-ba-koso", "n2-te-kara"]
    },
    {
      id: "n1-ta-tokoro-de",
      pattern: "～たところで",
      level: "N1",
      category: "Verben",
      meaning: "selbst wenn man ... tut",
      explanation: "Drückt aus, dass selbst wenn man etwas tut, das Ergebnis nicht zufriedenstellend sein wird. Diese Struktur wird verwendet, um die Nutzlosigkeit oder Sinnlosigkeit einer Handlung zu betonen. Oft mit negativem Ausgang oder Enttäuschung verbunden.",
      formation: "Verb-た-Form + ところで",
      examples: [
        { japanese: "今から急いだところで、間に合わない。", romaji: "Ima kara isoida tokoro de, maniawanai.", german: "Selbst wenn wir uns jetzt beeilen, werden wir es nicht rechtzeitig schaffen." },
        { japanese: "謝ったところで、許してもらえないだろう。", romaji: "Ayamatta tokoro de, yurushite moraenai darou.", german: "Selbst wenn ich mich entschuldige, wird mir wahrscheinlich nicht vergeben." }
      ],
      notes: "Betont die Nutzlosigkeit oder Erfolglosigkeit der Handlung.",
      related: ["n2-te-mo", "n1-ta-to-shite-mo"]
    },
    {
      id: "n1-ka-to-omoikiya",
      pattern: "～かと思いきや",
      level: "N1",
      category: "Verben",
      meaning: "gerade als man dachte",
      explanation: "Drückt aus, dass etwas Unerwartetes passiert, gerade als man etwas anderes erwartet hatte. Diese Struktur betont den Kontrast zwischen Erwartung und Realität. Wird verwendet, um Überraschung oder plötzliche Wendungen zu beschreiben.",
      formation: "Verb-辞書形/た-Form + かと思いきや / い-Adjektiv + かと思いきや",
      examples: [
        { japanese: "雨が降るかと思いきや、急に晴れた。", romaji: "Ame ga furu ka to omoikiya, kyuu ni hareta.", german: "Gerade als ich dachte, es würde regnen, klarte es plötzlich auf." },
        { japanese: "彼は怒っているかと思いきや、笑い出した。", romaji: "Kare wa okotte iru ka to omoikiya, waraidashita.", german: "Gerade als ich dachte, er sei wütend, fing er an zu lachen." }
      ],
      notes: "Betont unerwartete Wendungen oder Kontraste zwischen Erwartung und Realität.",
      related: ["n2-to-omottara", "n1-ka-to-omou-to"]
    },
    {
      id: "n1-te-wa-kanawanai",
      pattern: "～てはかなわない",
      level: "N1",
      category: "Verben",
      meaning: "es ist unerträglich",
      explanation: "Drückt aus, dass eine Situation so unangenehm oder belastend ist, dass man sie nicht ertragen kann. Diese Struktur wird verwendet, um starke Unzufriedenheit oder Beschwerden auszudrücken. Betont die Unerträglichkeit eines Zustands.",
      formation: "Verb-て-Form + はかなわない / い-Adjektiv-くて + はかなわない",
      examples: [
        { japanese: "隣の部屋がうるさくてはかなわない。", romaji: "Tonari no heya ga urusakute wa kanawanai.", german: "Das Nachbarzimmer ist so laut, dass es unerträglich ist." },
        { japanese: "毎日残業させられてはかなわない。", romaji: "Mainichi zangyou saserarete wa kanawanai.", german: "Jeden Tag Überstunden machen zu müssen, ist unerträglich." }
      ],
      notes: "Drückt starke Beschwerde oder Unzufriedenheit über eine Situation aus.",
      related: ["n2-te-tamaranai", "n1-ni-taenai"]
    },
    {
      id: "n1-te-bakari-wa-irarenai",
      pattern: "～てばかりはいられない",
      level: "N1",
      category: "Verben",
      meaning: "kann nicht nur ... tun",
      explanation: "Drückt aus, dass man nicht weiterhin nur eine bestimmte Sache tun kann, sondern etwas anderes unternehmen muss. Diese Struktur betont die Notwendigkeit, von einem Zustand oder Verhalten abzuweichen. Wird verwendet, um Entschlossenheit oder Verantwortungsbewusstsein auszudrücken.",
      formation: "Verb-て-Form + ばかりはいられない",
      examples: [
        { japanese: "悲しんでばかりはいられない。前に進まなければ。", romaji: "Kanashinde bakari wa irarenai. Mae ni susumanakereba.", german: "Ich kann nicht nur trauern. Ich muss vorwärtsgehen." },
        { japanese: "休んでばかりはいられない。仕事をしなければならない。", romaji: "Yasunde bakari wa irarenai. Shigoto wo shinakereba naranai.", german: "Ich kann nicht nur ausruhen. Ich muss arbeiten." }
      ],
      notes: "Betont die Notwendigkeit, aus einem Zustand herauszukommen und zu handeln.",
      related: ["n2-te-bakari-iru", "n1-wake-ni-wa-ikanai"]
    },
    {
      id: "n1-ni-katakunai",
      pattern: "～にかたくない",
      level: "N1",
      category: "Verben",
      meaning: "es ist nicht schwer zu",
      explanation: "Drückt aus, dass etwas leicht vorstellbar, verständlich oder vorhersehbar ist. Diese formelle Struktur wird verwendet, um zu sagen, dass man sich etwas leicht vorstellen kann. Hauptsächlich in geschriebener Sprache verwendet.",
      formation: "Verb-辞書形 + にかたくない (推察、想像、理解 etc.)",
      examples: [
        { japanese: "彼の気持ちは想像にかたくない。", romaji: "Kare no kimochi wa souzou ni katakunai.", german: "Seine Gefühle sind nicht schwer vorstellbar." },
        { japanese: "その結果は予想にかたくない。", romaji: "Sono kekka wa yosou ni katakunai.", german: "Dieses Ergebnis ist nicht schwer vorherzusagen." }
      ],
      notes: "Formell und literarisch. Meist mit 想像、推察、予測 etc. verwendet.",
      related: ["n2-yasui", "n1-ni-katai"]
    },
    {
      id: "n1-ni-soku-suru",
      pattern: "～に即する",
      level: "N1",
      category: "Verben",
      meaning: "entsprechend, gemäß",
      explanation: "Drückt aus, dass etwas einer Regel, einem Prinzip oder einer Realität entspricht. Diese formelle Struktur wird verwendet, um Übereinstimmung oder Angemessenheit zu betonen. Häufig in akademischen oder geschäftlichen Kontexten.",
      formation: "Nomen + に即する/に即して/に即した",
      examples: [
        { japanese: "実情に即した対策を立てる必要がある。", romaji: "Jitsujou ni sokushita taisaku wo tateru hitsuyou ga aru.", german: "Es ist notwendig, Maßnahmen zu ergreifen, die der tatsächlichen Situation entsprechen." },
        { japanese: "法律に即して判断すべきだ。", romaji: "Houritsu ni sokushite handan subeki da.", german: "Man sollte gemäß dem Gesetz urteilen." }
      ],
      notes: "Formell. Wird in geschäftlichen, rechtlichen oder akademischen Kontexten verwendet.",
      related: ["n2-ni-motozuite", "n1-ni-junzuru"]
    },
    {
      id: "n1-te-yamanu",
      pattern: "～て止まない/～てやまない",
      level: "N1",
      category: "Verben",
      meaning: "unaufhörlich, inbrünstig",
      explanation: "Drückt einen tiefen, andauernden Wunsch oder ein starkes Gefühl aus, das nicht aufhört. Diese sehr formelle Struktur wird hauptsächlich in geschriebener Sprache verwendet. Identisch mit てやまない, oft mit Verben wie 願う, 祈る, 望む kombiniert.",
      formation: "Verb-て-Form + 止まない/やまない",
      examples: [
        { japanese: "世界の平和を願って止まない。", romaji: "Sekai no heiwa wo negatte yamanu.", german: "Ich wünsche mir unaufhörlich den Weltfrieden." },
        { japanese: "彼の成功を祈って止みません。", romaji: "Kare no seikou wo inotte yamimasen.", german: "Ich bete inbrünstig für seinen Erfolg." }
      ],
      notes: "Sehr formell. Identisch mit てやまない. Oft in Reden oder formellen Schreiben.",
      related: ["n1-te-yamanai", "n2-tsuzukeru"]
    },
    {
      id: "n1-ni-hikikae-verb",
      pattern: "～にひきかえ",
      level: "N1",
      category: "Verben",
      meaning: "im Gegensatz dazu",
      explanation: "Drückt einen starken Kontrast zwischen zwei Dingen oder Personen aus. Diese Struktur wird verwendet, um zwei gegensätzliche Situationen hervorzuheben. Oft mit einem kritischen oder vergleichenden Ton.",
      formation: "Nomen + にひきかえ / Verb-辞書形/た-Form + のにひきかえ",
      examples: [
        { japanese: "兄は真面目なのにひきかえ、弟は怠け者だ。", romaji: "Ani wa majime na noni hikikae, otouto wa namakemono da.", german: "Im Gegensatz zum ernsthaften älteren Bruder ist der jüngere Bruder faul." },
        { japanese: "去年の夏は暑かったのにひきかえ、今年は涼しい。", romaji: "Kyonen no natsu wa atsukatta noni hikikae, kotoshi wa suzushii.", german: "Im Gegensatz zum heißen Sommer letzten Jahres ist es dieses Jahr kühl." }
      ],
      notes: "Betont einen starken Kontrast, oft mit kritischem oder vergleichendem Ton.",
      related: ["n2-ni-taishite", "n1-ni-hanbai"]
    },
    {
      id: "n1-te-wa-habakaranai",
      pattern: "～てはばからない",
      level: "N1",
      category: "Verben",
      meaning: "nicht zögern zu",
      explanation: "Drückt aus, dass jemand ohne Zurückhaltung oder Scham etwas sagt oder tut. Diese Struktur wird oft verwendet, um übermäßiges Selbstvertrauen oder Dreistigkeit zu beschreiben. Kann sowohl positiv (mutig) als auch negativ (anmaßend) konnotiert sein.",
      formation: "Verb-て-Form + はばからない",
      examples: [
        { japanese: "彼は自分が一番だと言ってはばからない。", romaji: "Kare wa jibun ga ichiban da to itte habakaranai.", german: "Er zögert nicht zu sagen, dass er der Beste ist." },
        { japanese: "彼女は堂々と自分の意見を述べてはばからない。", romaji: "Kanojo wa doudou to jibun no iken wo nobete habakaranai.", german: "Sie scheut sich nicht, ihre Meinung offen zu äußern." }
      ],
      notes: "Kann bewundernd oder kritisch sein, je nach Kontext. Betont Mangel an Zurückhaltung.",
      related: ["n2-te-mo-kamawanai", "n1-憚らない"]
    },
    {
      id: "n1-wo-kinji-enai",
      pattern: "～を禁じ得ない",
      level: "N1",
      category: "Verben",
      meaning: "kann nicht umhin zu (Gefühl)",
      explanation: "Drückt aus, dass man ein starkes Gefühl nicht unterdrücken kann. Diese formelle Struktur wird verwendet, um unwillkürliche emotionale Reaktionen zu beschreiben. Hauptsächlich mit Gefühlsverben wie 感動 (Bewegung), 驚き (Überraschung), 怒り (Ärger) verwendet.",
      formation: "Gefühls-Nomen + を禁じ得ない",
      examples: [
        { japanese: "彼の勇気には感動を禁じ得ない。", romaji: "Kare no yuuki ni wa kandou wo kinji enai.", german: "Ich kann nicht umhin, von seinem Mut bewegt zu sein." },
        { japanese: "この結果には驚きを禁じ得ない。", romaji: "Kono kekka ni wa odoroki wo kinji enai.", german: "Ich kann nicht umhin, von diesem Ergebnis überrascht zu sein." }
      ],
      notes: "Sehr formell. Wird hauptsächlich mit Gefühlsnomen verwendet.",
      related: ["n1-zu-ni-wa-okanai", "n2-zu-ni-wa-irarenai"]
    },
    {
      id: "n1-ni-taenai",
      pattern: "～に堪えない",
      level: "N1",
      category: "Verben",
      meaning: "unerträglich / unwürdig",
      explanation: "Hat zwei Bedeutungen: 1) Ein Gefühl ist so stark, dass man es nicht zurückhalten kann. 2) Etwas ist unerträglich oder unwürdig. Diese formelle Struktur wird je nach Kontext unterschiedlich interpretiert. Bei Gefühlsnomen oft 'nicht zurückhalten können'.",
      formation: "Gefühls-Nomen + に堪えない / Verb-辞書形 + に堪えない",
      examples: [
        { japanese: "彼の死は悲しみに堪えない。", romaji: "Kare no shi wa kanashimi ni taenai.", german: "Sein Tod ist unerträglich traurig." },
        { japanese: "この光景は見るに堪えない。", romaji: "Kono koukei wa miru ni taenai.", german: "Dieser Anblick ist unerträglich anzusehen." }
      ],
      notes: "Zwei Bedeutungen: 1) Gefühl nicht zurückhalten können, 2) Unerträglich sein.",
      related: ["n1-te-wa-kanawanai", "n1-wo-kinji-enai"]
    },
    {
      id: "n1-wo-yoginaku-saseru",
      pattern: "～を余儀なくさせる",
      level: "N1",
      category: "Verben",
      meaning: "zwingen zu (aktiv)",
      explanation: "Drückt aus, dass äußere Umstände jemanden zwingen, etwas zu tun. Diese formelle Struktur betont, dass keine andere Wahl bleibt. Wird oft in Nachrichten oder formellen Berichten verwendet, um unfreiwillige Handlungen zu beschreiben.",
      formation: "Nomen + を余儀なくさせる / Verb-辞書形 + ことを余儀なくさせる",
      examples: [
        { japanese: "台風は多くの人々に避難を余儀なくさせた。", romaji: "Taifuu wa ooku no hitobito ni hinan wo yoginaku saseta.", german: "Der Taifun zwang viele Menschen zur Evakuierung." },
        { japanese: "不況は会社に人員削減を余儀なくさせている。", romaji: "Fukyou wa kaisha ni jin'in sakugen wo yoginaku sasete iru.", german: "Die Rezession zwingt die Firma zu Personalabbau." }
      ],
      notes: "Formell. Aktive Form von を余儀なくされる. Betont äußeren Zwang.",
      related: ["n1-wo-yoginaku-sareru", "n2-saserareru"]
    },
    {
      id: "n1-ta-ga-saigo",
      pattern: "～たが最後",
      level: "N1",
      category: "Verben",
      meaning: "wenn einmal getan, dann (Variante)",
      explanation: "Variante von が最後/たら最後, die ausdrückt, dass wenn etwas einmal getan wurde, unwiderrufliche Konsequenzen folgen. Diese Struktur betont die Endgültigkeit und meist negative Folgen. Wird verwendet, um vor einem Point of no return zu warnen.",
      formation: "Verb-た-Form + が最後",
      examples: [
        { japanese: "この薬を飲んだが最後、二度と元には戻れない。", romaji: "Kono kusuri wo nonda ga saigo, nido to moto ni wa modorenai.", german: "Wenn man diese Medizin einmal genommen hat, kann man nie mehr zurück." },
        { japanese: "彼と喧嘩したが最後、もう仲直りできない。", romaji: "Kare to kenka shita ga saigo, mou nakanaori dekinai.", german: "Wenn man einmal mit ihm gestritten hat, kann man sich nicht mehr versöhnen." }
      ],
      notes: "Synonym zu が最後/たら最後. Betont unwiderrufliche, oft negative Konsequenzen.",
      related: ["n1-ga-saigo-tara-saigo", "n1-ba-sore-made-da"]
    },
    // ============================================================
    // SATZSTRUKTUREN (75)
    // ============================================================
    {
      id: "n1-towa",
      pattern: "～とは",
      level: "N1",
      category: "Satzstrukturen",
      meaning: "dass ... (Überraschung/Definition)",
      explanation: "Drückt Überraschung, Empörung oder Ungläubigkeit über eine Tatsache aus. Wird auch verwendet, um etwas zu definieren oder zu erklären, was etwas bedeutet.",
      formation: "Satz + とは\nフレーズ + とは",
      examples: [
        { japanese: "彼がそんなことをするとは思わなかった。", romaji: "Kare ga sonna koto wo suru to wa omowanakatta.", german: "Ich hätte nicht gedacht, dass er so etwas tun würde." },
        { japanese: "まさか彼女が辞めるとは驚きだ。", romaji: "Masaka kanojo ga yameru to wa odoroki da.", german: "Es ist überraschend, dass sie tatsächlich kündigt." }
      ],
      notes: "Das 'は' nach 'と' betont die Aussage und drückt oft Erstaunen aus.",
      related: ["とも", "なんて"]
    },
    {
      id: "n1-tobakarini",
      pattern: "～とばかりに",
      level: "N1",
      category: "Satzstrukturen",
      meaning: "als ob, gleichsam",
      explanation: "Beschreibt eine Handlung oder einen Zustand, als ob die Person etwas Bestimmtes sagen oder ausdrücken würde. Die tatsächlichen Worte werden nicht gesprochen, aber die Handlung vermittelt diese Bedeutung.",
      formation: "普通形 + とばかりに\nフレーズ + とばかりに",
      examples: [
        { japanese: "彼は「任せろ」とばかりに胸をたたいた。", romaji: "Kare wa 'makasero' to bakari ni mune wo tataita.", german: "Er klopfte sich auf die Brust, als wollte er sagen 'Verlass dich auf mich'." },
        { japanese: "子供たちは待ってましたとばかりに外へ飛び出した。", romaji: "Kodomotachi wa mattemashita to bakari ni soto e tobidashita.", german: "Die Kinder stürmten nach draußen, als hätten sie darauf gewartet." }
      ],
      notes: "Oft mit Verben der Bewegung oder Gesten verwendet.",
      related: ["かのように", "ように"]
    },
    {
      id: "n1-tomonaku-tomonashini",
      pattern: "～ともなく/ともなしに",
      level: "N1",
      category: "Satzstrukturen",
      meaning: "ohne bestimmte Absicht",
      explanation: "Drückt aus, dass eine Handlung ohne klare Absicht oder bestimmtes Ziel durchgeführt wird. Die Person handelt unbewusst oder ziellos.",
      formation: "Verb ます-Form + ともなく/ともなしに\n聞く → 聞くともなく",
      examples: [
        { japanese: "テレビを見るともなく見ていた。", romaji: "Terebi wo miru to mo naku mite ita.", german: "Ich schaute geistesabwesend fern, ohne wirklich hinzusehen." },
        { japanese: "空を眺めるともなしに眺めていた。", romaji: "Sora wo nagameru to mo nashi ni nagamete ita.", german: "Ich blickte in den Himmel, ohne bewusst hinzuschauen." }
      ],
      notes: "Betont die Abwesenheit von Absicht oder Bewusstsein.",
      related: ["ともなく", "なんとなく"]
    },
    {
      id: "n1-naimonoka",
      pattern: "～ないものか",
      level: "N1",
      category: "Satzstrukturen",
      meaning: "kann man nicht irgendwie, gibt es keinen Weg zu",
      explanation: "Drückt einen starken Wunsch oder eine Hoffnung aus, dass etwas möglich sein könnte. Der Sprecher wünscht sich, dass es einen Weg gibt, etwas zu tun.",
      formation: "Verb ない-Form + ものか\nVerb ない-Form + ものだろうか",
      examples: [
        { japanese: "もっと簡単に解決できないものか。", romaji: "Motto kantan ni kaiketsu dekinai mono ka.", german: "Kann man das nicht irgendwie einfacher lösen?" },
        { japanese: "彼女と仲直りできないものだろうか。", romaji: "Kanojo to nakanaori dekinai mono darou ka.", german: "Gibt es keinen Weg, mich mit ihr zu versöhnen?" }
      ],
      notes: "Drückt einen Wunsch mit leichtem Zweifel aus, ob es möglich ist.",
      related: ["ないか", "ないだろうか"]
    },
    {
      id: "n1-naimonodemonai",
      pattern: "～ないものでもない",
      level: "N1",
      category: "Satzstrukturen",
      meaning: "es ist nicht so, dass man nicht könnte",
      explanation: "Doppelte Verneinung, die ausdrückt, dass etwas möglich ist, wenn auch mit Vorbehalten. Es gibt eine gewisse Möglichkeit oder Bereitschaft.",
      formation: "Verb ない-Form + ものでもない",
      examples: [
        { japanese: "頼まれれば、手伝わないものでもない。", romaji: "Tanomareba, tetsudawanai mono demo nai.", german: "Wenn man mich bittet, ist es nicht so, dass ich nicht helfen würde." },
        { japanese: "条件次第では、考えないものでもない。", romaji: "Jouken shidai de wa, kangaenai mono demo nai.", german: "Je nach Bedingungen ist es nicht ausgeschlossen, dass ich es mir überlege." }
      ],
      notes: "Drückt eine zurückhaltende Zustimmung oder Möglichkeit aus.",
      related: ["なくもない", "ないこともない"]
    },
    {
      id: "n1-nagarani-nagarano",
      pattern: "～ながらに/ながらの",
      level: "N1",
      category: "Satzstrukturen",
      meaning: "im Zustand von, wie immer, von Geburt an",
      explanation: "Drückt aus, dass etwas im ursprünglichen Zustand bleibt oder dass ein Zustand von Anfang an besteht. Oft verwendet mit 'geboren' oder unveränderten Zuständen.",
      formation: "Nomen + ながら(に/の)\n生まれながら(に/の)",
      examples: [
        { japanese: "彼は生まれながらの才能を持っている。", romaji: "Kare wa umarenagara no sainou wo motte iru.", german: "Er besitzt ein angeborenes Talent." },
        { japanese: "昔ながらの製法で作られている。", romaji: "Mukashinagara no seihou de tsukurarete iru.", german: "Es wird nach traditioneller Methode hergestellt." }
      ],
      notes: "Literarischer Ausdruck, oft in formellen Kontexten.",
      related: ["のまま", "そのまま"]
    },
    {
      id: "n1-nakushite",
      pattern: "～なくして(は)",
      level: "N1",
      category: "Satzstrukturen",
      meaning: "ohne ... (ist es unmöglich)",
      explanation: "Drückt aus, dass etwas eine unverzichtbare Bedingung ist. Ohne diese Bedingung kann das Ergebnis nicht erreicht werden.",
      formation: "Nomen + なくして(は)\nVerb ない-Form (く) + なくして(は)",
      examples: [
        { japanese: "努力なくして成功はない。", romaji: "Doryoku nakushite seikou wa nai.", german: "Ohne Anstrengung gibt es keinen Erfolg." },
        { japanese: "信頼なくしては、良い関係は築けない。", romaji: "Shinrai nakushite wa, yoi kankei wa kizukenai.", german: "Ohne Vertrauen kann man keine gute Beziehung aufbauen." }
      ],
      notes: "Formeller Ausdruck, oft in Reden oder schriftlicher Sprache.",
      related: ["なしには", "ないと"]
    },
    {
      id: "n1-naraizashirazu",
      pattern: "～ならいざしらず",
      level: "N1",
      category: "Satzstrukturen",
      meaning: "wenn es ... wäre, mag das sein, aber",
      explanation: "Gibt zu, dass etwas in einem Fall verständlich wäre, drückt aber aus, dass es im aktuellen Fall nicht akzeptabel oder verständlich ist.",
      formation: "Nomen + ならいざしらず\n普通形 + ならいざしらず",
      examples: [
        { japanese: "子供ならいざしらず、大人がそんなことをするとは。", romaji: "Kodomo nara iza shirazu, otona ga sonna koto wo suru to wa.", german: "Wenn es ein Kind wäre, mag das sein, aber dass ein Erwachsener so etwas tut!" },
        { japanese: "昔ならいざしらず、今の時代にそれは通用しない。", romaji: "Mukashi nara iza shirazu, ima no jidai ni sore wa tsuuyou shinai.", german: "In der Vergangenheit mag das sein, aber in der heutigen Zeit funktioniert das nicht." }
      ],
      notes: "Drückt einen starken Kontrast zwischen zwei Situationen aus.",
      related: ["ならともかく", "ならまだしも"]
    },
    {
      id: "n1-nari",
      pattern: "～なり",
      level: "N1",
      category: "Satzstrukturen",
      meaning: "sobald, sofort als",
      explanation: "Drückt aus, dass eine Handlung unmittelbar nach einer anderen erfolgt. Oft mit einem überraschenden oder unerwarteten Ergebnis.",
      formation: "Verb 辞書形 + なり\nVerb た-Form + なり",
      examples: [
        { japanese: "家に帰るなり、ベッドに倒れ込んだ。", romaji: "Ie ni kaeru nari, beddo ni taorekon da.", german: "Sobald ich nach Hause kam, fiel ich ins Bett." },
        { japanese: "彼は会議室に入るなり、怒鳴り始めた。", romaji: "Kare wa kaigishitsu ni hairu nari, donari hajimeta.", german: "Kaum betrat er das Konferenzzimmer, fing er an zu schreien." }
      ],
      notes: "Literarischer als やいなや, betont die Unmittelbarkeit.",
      related: ["やいなや", "とたんに", "そばから"]
    },
    {
      id: "n1-nari-nari",
      pattern: "～なり～なり",
      level: "N1",
      category: "Satzstrukturen",
      meaning: "entweder ... oder ... (Vorschläge)",
      explanation: "Gibt Beispiele oder Alternativen an, die als Möglichkeiten dienen. Der Sprecher schlägt vor, dass man eine von mehreren Optionen wählen sollte.",
      formation: "Verb 辞書形 + なり + Verb 辞書形 + なり\nNomen + なり + Nomen + なり",
      examples: [
        { japanese: "電話するなりメールするなりして連絡してください。", romaji: "Denwa suru nari meeru suru nari shite renraku shite kudasai.", german: "Bitte kontaktieren Sie mich, sei es per Telefon oder E-Mail." },
        { japanese: "本を読むなり音楽を聴くなりして時間を過ごした。", romaji: "Hon wo yomu nari ongaku wo kiku nari shite jikan wo sugoshita.", german: "Ich verbrachte die Zeit mit Lesen oder Musikhören." }
      ],
      notes: "Drückt aus, dass es mehrere gleichwertige Optionen gibt.",
      related: ["とか～とか", "か～か"]
    },
    {
      id: "n1-niaramajiki",
      pattern: "～にあるまじき",
      level: "N1",
      category: "Satzstrukturen",
      meaning: "unwürdig für, unangemessen für",
      explanation: "Drückt aus, dass eine Handlung oder ein Verhalten für eine bestimmte Position oder Rolle unangemessen oder unwürdig ist. Sehr formeller und kritischer Ausdruck.",
      formation: "Nomen + にあるまじき + Nomen",
      examples: [
        { japanese: "それは教師にあるまじき行為だ。", romaji: "Sore wa kyoushi ni aramajiki koui da.", german: "Das ist ein für einen Lehrer unwürdiges Verhalten." },
        { japanese: "医者にあるまじき発言をした。", romaji: "Isha ni aramajiki hatsugen wo shita.", german: "Er machte eine für einen Arzt unangemessene Bemerkung." }
      ],
      notes: "Sehr formell, oft in Kritik oder offiziellen Stellungnahmen verwendet.",
      related: ["にふさわしくない", "にあるべきでない"]
    },
    {
      id: "n1-nikakotsukete",
      pattern: "～にかこつけて",
      level: "N1",
      category: "Satzstrukturen",
      meaning: "unter dem Vorwand von",
      explanation: "Drückt aus, dass jemand einen Vorwand oder eine Ausrede benutzt, um etwas zu tun, was er eigentlich tun möchte. Die angegebene Begründung ist nicht der wahre Grund.",
      formation: "Nomen + にかこつけて\nVerb 辞書形/た-Form + のにかこつけて",
      examples: [
        { japanese: "仕事にかこつけて、彼女に会いに行った。", romaji: "Shigoto ni kakotsukete, kanojo ni ai ni itta.", german: "Unter dem Vorwand der Arbeit ging ich sie besuchen." },
        { japanese: "体調不良にかこつけて、会議を欠席した。", romaji: "Taichou furyou ni kakotsukete, kaigi wo kesseki shita.", german: "Unter dem Vorwand schlechter Gesundheit fehlte ich bei der Besprechung." }
      ],
      notes: "Hat oft eine negative Konnotation, impliziert Unehrlichkeit.",
      related: ["を口実に", "という名目で"]
    },
    {
      id: "n1-nikamakete",
      pattern: "～にかまけて",
      level: "N1",
      category: "Satzstrukturen",
      meaning: "sich von ... ablenken lassen, in ... versinken",
      explanation: "Drückt aus, dass man so sehr mit etwas beschäftigt ist, dass man andere wichtige Dinge vernachlässigt. Hat eine negative Konnotation.",
      formation: "Nomen + にかまけて",
      examples: [
        { japanese: "遊びにかまけて、勉強を怠った。", romaji: "Asobi ni kamakete, benkyou wo okotatta.", german: "Ich ließ mich vom Spielen ablenken und vernachlässigte mein Studium." },
        { japanese: "仕事にかまけて、家族との時間を持たなかった。", romaji: "Shigoto ni kamakete, kazoku to no jikan wo motanakatta.", german: "Ich war so in die Arbeit vertieft, dass ich keine Zeit mit der Familie verbrachte." }
      ],
      notes: "Impliziert Kritik oder Bedauern über die Vernachlässigung.",
      related: ["にかまける", "にふける"]
    },
    {
      id: "n1-nishitehajimete",
      pattern: "～にして初めて",
      level: "N1",
      category: "Satzstrukturen",
      meaning: "erst wenn/nachdem, nur durch",
      explanation: "Betont, dass etwas erst nach einem bestimmten Ereignis oder unter bestimmten Umständen möglich oder erkennbar wird. Unterstreicht die Bedeutung der Voraussetzung.",
      formation: "Nomen + にして初めて\nVerb て-Form + にして初めて",
      examples: [
        { japanese: "失敗にして初めて、その大切さが分かった。", romaji: "Shippai ni shite hajimete, sono taisetsusa ga wakatta.", german: "Erst durch das Scheitern verstand ich dessen Wichtigkeit." },
        { japanese: "親になって初めて、親の気持ちが理解できた。", romaji: "Oya ni natte hajimete, oya no kimochi ga rikai dekita.", german: "Erst als ich Elternteil wurde, konnte ich die Gefühle meiner Eltern verstehen." }
      ],
      notes: "Betont den Wendepunkt oder die entscheidende Erkenntnis.",
      related: ["て初めて", "てようやく"]
    },
    {
      id: "n1-nisura",
      pattern: "～にすら",
      level: "N1",
      category: "Satzstrukturen",
      meaning: "sogar bei, selbst bei",
      explanation: "Betont, dass etwas sogar in einem unerwarteten oder extremen Fall zutrifft. Stärker als einfaches 'さえ'.",
      formation: "Nomen + にすら",
      examples: [
        { japanese: "彼は親にすら本当のことを言わなかった。", romaji: "Kare wa oya ni sura hontou no koto wo iwanakatta.", german: "Er sagte nicht einmal seinen Eltern die Wahrheit." },
        { japanese: "この問題は専門家にすら解けない。", romaji: "Kono mondai wa senmonka ni sura tokenai.", german: "Selbst Experten können dieses Problem nicht lösen." }
      ],
      notes: "Literarischer und formeller als さえ oder でさえ.",
      related: ["すら", "にさえ", "でさえ"]
    },
    {
      id: "n1-nitaru",
      pattern: "～に足る/にたる",
      level: "N1",
      category: "Satzstrukturen",
      meaning: "würdig, wert, es verdienen",
      explanation: "Drückt aus, dass etwas oder jemand würdig ist, eine bestimmte Bewertung oder Behandlung zu erhalten. Oft in formellen oder literarischen Kontexten.",
      formation: "Nomen + に足る\nVerb 辞書形 + に足る",
      examples: [
        { japanese: "これは信頼に足る情報だ。", romaji: "Kore wa shinrai ni taru jouhou da.", german: "Das ist eine vertrauenswürdige Information." },
        { japanese: "彼の業績は称賛に足るものだ。", romaji: "Kare no gyouseki wa shousan ni taru mono da.", german: "Seine Leistungen sind lobenswert." }
      ],
      notes: "Formeller Ausdruck, oft in schriftlicher Sprache.",
      related: ["に値する", "にふさわしい"]
    },
    {
      id: "n1-ninaku",
      pattern: "～にない",
      level: "N1",
      category: "Satzstrukturen",
      meaning: "ungewöhnlich für, selten bei",
      explanation: "Drückt aus, dass etwas für eine Person oder Gruppe ungewöhnlich oder untypisch ist. Betont die Außergewöhnlichkeit.",
      formation: "Nomen + にない + Nomen",
      examples: [
        { japanese: "彼にない真剣な表情だった。", romaji: "Kare ni nai shinken na hyoujou datta.", german: "Es war ein für ihn ungewöhnlich ernster Gesichtsausdruck." },
        { japanese: "彼女にない優しさを見せた。", romaji: "Kanojo ni nai yasashisa wo miseta.", german: "Sie zeigte eine für sie untypische Freundlichkeit." }
      ],
      notes: "Betont den Kontrast zum normalen Verhalten oder Zustand.",
      related: ["らしくない", "似合わない"]
    },
    {
      id: "n1-nioyo banai",
      pattern: "～には及ばない",
      level: "N1",
      category: "Satzstrukturen",
      meaning: "es besteht keine Notwendigkeit, nicht nötig",
      explanation: "Drückt aus, dass etwas nicht notwendig ist oder dass man etwas nicht tun muss. Oft verwendet, um jemanden zu beruhigen oder Bedenken zu zerstreuen.",
      formation: "Verb 辞書形 + には及ばない\nNomen + には及ばない",
      examples: [
        { japanese: "心配するには及ばない。", romaji: "Shinpai suru ni wa oyobanai.", german: "Es besteht kein Grund zur Sorge." },
        { japanese: "謝罪には及びません。", romaji: "Shazai ni wa oyobimasen.", german: "Eine Entschuldigung ist nicht nötig." }
      ],
      notes: "Formeller Ausdruck, oft in höflichen Kontexten.",
      related: ["必要ない", "する必要はない"]
    },
    {
      id: "n1-niiwasereb a",
      pattern: "～に言わせれば",
      level: "N1",
      category: "Satzstrukturen",
      meaning: "wenn man ... fragt, nach Meinung von",
      explanation: "Führt die Meinung oder Perspektive einer bestimmten Person ein. Betont, dass es sich um die subjektive Sicht dieser Person handelt.",
      formation: "Person + に言わせれば\nPerson + に言わせると",
      examples: [
        { japanese: "専門家に言わせれば、これは危険だそうだ。", romaji: "Senmonka ni iwasereba, kore wa kiken da sou da.", german: "Wenn man die Experten fragt, ist das gefährlich." },
        { japanese: "彼女に言わせれば、私が悪いらしい。", romaji: "Kanojo ni iwasereba, watashi ga warui rashii.", german: "Ihrer Meinung nach bin anscheinend ich im Unrecht." }
      ],
      notes: "Kann verwendet werden, um sich von der geäußerten Meinung zu distanzieren.",
      related: ["によると", "から見れば"]
    },
    {
      id: "n1-kiwamarinai",
      pattern: "～極まりない/極まる",
      level: "N1",
      category: "Satzstrukturen",
      meaning: "äußerst, extrem, höchst",
      explanation: "Drückt aus, dass etwas einen extremen Grad erreicht hat. Wird oft mit na-Adjektiven verwendet, um starke Gefühle oder Zustände auszudrücken.",
      formation: "な-Adjektiv + 極まりない/極まる\nNomen + 極まりない/極まる",
      examples: [
        { japanese: "それは失礼極まりない行為だ。", romaji: "Sore wa shitsurei kiwamarinai koui da.", german: "Das ist ein äußerst unhöfliches Verhalten." },
        { japanese: "危険極まる状況に陥った。", romaji: "Kiken kiwamaru joukyou ni ochitta.", german: "Wir gerieten in eine extrem gefährliche Situation." }
      ],
      notes: "Sehr formeller Ausdruck, oft in schriftlicher Sprache.",
      related: ["きわめて", "この上ない"]
    },
    {
      id: "n1-gotoku-gotoki",
      pattern: "～ごとく/ごとき",
      level: "N1",
      category: "Satzstrukturen",
      meaning: "wie, gleich (literarisch)",
      explanation: "Literarischer Vergleichsausdruck, der 'wie' oder 'gleich' bedeutet. Wird hauptsächlich in formellen oder literarischen Texten verwendet.",
      formation: "Nomen + のごとく/のごとき\nVerb 辞書形 + がごとく/がごとき",
      examples: [
        { japanese: "嵐のごとく現れて、すぐに去った。", romaji: "Arashi no gotoku arawarete, sugu ni satta.", german: "Er erschien wie ein Sturm und ging sofort wieder." },
        { japanese: "彼は鬼神のごとき強さを見せた。", romaji: "Kare wa kijin no gotoki tsuyosa wo miseta.", german: "Er zeigte eine dämonengleiche Stärke." }
      ],
      notes: "Sehr literarisch, wird in der gesprochenen Sprache selten verwendet.",
      related: ["ように", "かのように"]
    },
    {
      id: "n1-sura",
      pattern: "～すら",
      level: "N1",
      category: "Satzstrukturen",
      meaning: "sogar, selbst",
      explanation: "Betont, dass etwas sogar in einem unerwarteten Fall zutrifft. Literarischer und formeller als さえ.",
      formation: "Nomen + すら",
      examples: [
        { japanese: "彼は名前すら覚えていない。", romaji: "Kare wa namae sura oboete inai.", german: "Er erinnert sich nicht einmal an den Namen." },
        { japanese: "水すら飲めない状況だった。", romaji: "Mizu sura nomenai joukyou datta.", german: "Es war eine Situation, in der man nicht einmal Wasser trinken konnte." }
      ],
      notes: "Literarischer Stil, oft in schriftlicher Sprache.",
      related: ["さえ", "でさえ", "も"]
    },
    {
      id: "n1-dani",
      pattern: "～だに",
      level: "N1",
      category: "Satzstrukturen",
      meaning: "allein schon (die Vorstellung)",
      explanation: "Sehr literarischer Ausdruck, der betont, dass allein die Vorstellung von etwas eine starke Reaktion hervorruft. Wird fast ausschließlich in geschriebener Sprache verwendet.",
      formation: "Verb 辞書形 + だに\nNomen + だに",
      examples: [
        { japanese: "想像するだに恐ろしい。", romaji: "Souzou suru dani osoroshii.", german: "Allein die Vorstellung ist schrecklich." },
        { japanese: "思い出すだに腹が立つ。", romaji: "Omoidasu dani hara ga tatsu.", german: "Allein die Erinnerung macht mich wütend." }
      ],
      notes: "Sehr literarisch und archaisch, in moderner Sprache selten.",
      related: ["すら", "さえ"]
    },
    {
      id: "n1-taru",
      pattern: "～たる",
      level: "N1",
      category: "Satzstrukturen",
      meaning: "als (Position/Status)",
      explanation: "Drückt den Status oder die Position einer Person aus. Wird verwendet, um Pflichten oder Erwartungen zu betonen, die mit dieser Position verbunden sind.",
      formation: "Nomen + たる + Nomen",
      examples: [
        { japanese: "教師たる者、生徒の模範でなければならない。", romaji: "Kyoushi taru mono, seito no mohan de nakereba naranai.", german: "Als Lehrer muss man ein Vorbild für die Schüler sein." },
        { japanese: "リーダーたる者、責任を持つべきだ。", romaji: "Riidaa taru mono, sekinin wo motsu beki da.", german: "Als Führungskraft sollte man Verantwortung übernehmen." }
      ],
      notes: "Sehr formell, oft in moralischen oder philosophischen Aussagen.",
      related: ["である", "としての"]
    },
    {
      id: "n1-taruya",
      pattern: "～たるや",
      level: "N1",
      category: "Satzstrukturen",
      meaning: "was ... betrifft (emphatisch)",
      explanation: "Hebt ein bestimmtes Thema emphatisch hervor, oft gefolgt von einer extremen Beschreibung oder Bewertung. Sehr literarischer Ausdruck.",
      formation: "Nomen + たるや",
      examples: [
        { japanese: "その美しさたるや、言葉では表せない。", romaji: "Sono utsukushisa taruya, kotoba de wa arawasenai.", german: "Was ihre Schönheit betrifft, lässt sie sich mit Worten nicht beschreiben." },
        { japanese: "彼の怠慢たるや、目に余るものがある。", romaji: "Kare no taiman taruya, me ni amaru mono ga aru.", german: "Seine Nachlässigkeit ist unerträglich." }
      ],
      notes: "Sehr literarisch und formell, in moderner Umgangssprache nicht gebräuchlich.",
      related: ["といったら", "ときたら"]
    },
    {
      id: "n1-tsu-tsu",
      pattern: "～つ～つ",
      level: "N1",
      category: "Satzstrukturen",
      meaning: "abwechselnd (zwei Handlungen)",
      explanation: "Sehr literarischer und archaischer Ausdruck, der beschreibt, dass zwei Handlungen abwechselnd ausgeführt werden. Wird fast nur in klassischen Texten verwendet.",
      formation: "Verb ます-Stamm + つ + Verb ます-Stamm + つ",
      examples: [
        { japanese: "行きつ戻りつしながら進んだ。", romaji: "Ikitsu modoritsu shinagara susunda.", german: "Wir gingen abwechselnd vor und zurück." },
        { japanese: "泣きつ笑いつ、感情が揺れ動いた。", romaji: "Nakitsu waraitsu, kanjou ga yure ugoita.", german: "Abwechselnd weinend und lachend schwankten die Gefühle." }
      ],
      notes: "Sehr archaisch, wird in moderner Sprache kaum verwendet.",
      related: ["たり～たり", "ながら"]
    },
    {
      id: "n1-deare",
      pattern: "～であれ",
      level: "N1",
      category: "Satzstrukturen",
      meaning: "selbst wenn, auch wenn",
      explanation: "Drückt aus, dass etwas unabhängig von den Umständen gilt. Oft in formellen oder literarischen Kontexten verwendet.",
      formation: "Nomen + であれ\n疑問詞 + であれ",
      examples: [
        { japanese: "誰であれ、ルールは守らなければならない。", romaji: "Dare de are, ruuru wa mamoranakereba naranai.", german: "Wer auch immer es ist, muss die Regeln befolgen." },
        { japanese: "どこであれ、彼を見つけ出す。", romaji: "Doko de are, kare wo mitsuke dasu.", german: "Wo auch immer er ist, ich werde ihn finden." }
      ],
      notes: "Formeller als であっても, oft in schriftlicher Sprache.",
      related: ["であっても", "でも"]
    },
    {
      id: "n1-denakutena ndarou",
      pattern: "～でなくてなんだろう",
      level: "N1",
      category: "Satzstrukturen",
      meaning: "wenn nicht X, was dann; nichts anderes als X",
      explanation: "Rhetorische Frage, die stark betont, dass etwas definitiv der Fall ist. Drückt Überzeugung oder Empörung aus.",
      formation: "Nomen + でなくてなんだろう\nな-Adjektiv + でなくてなんだろう",
      examples: [
        { japanese: "これが奇跡でなくてなんだろう。", romaji: "Kore ga kiseki de nakute nan darou.", german: "Wenn das kein Wunder ist, was ist es dann?" },
        { japanese: "それは裏切りでなくてなんだろうか。", romaji: "Sore wa uragiri de nakute nan darou ka.", german: "Wenn das kein Verrat ist, was ist es dann?" }
      ],
      notes: "Drückt starke Überzeugung oder rhetorische Betonung aus.",
      related: ["に他ならない", "にほかならない"]
    },
    {
      id: "n1-dewaaru maika",
      pattern: "～ではあるまいか",
      level: "N1",
      category: "Satzstrukturen",
      meaning: "ist es nicht so, dass; könnte es nicht sein, dass",
      explanation: "Drückt eine vorsichtige Vermutung oder Spekulation aus. Der Sprecher glaubt, dass etwas wahrscheinlich der Fall ist.",
      formation: "普通形 + のではあるまいか\nNomen/な-Adjektiv + ではあるまいか",
      examples: [
        { japanese: "彼が犯人ではあるまいか。", romaji: "Kare ga hannin de wa arumai ka.", german: "Könnte er nicht der Täter sein?" },
        { japanese: "これが最善の方法ではあるまいか。", romaji: "Kore ga saizen no houhou de wa arumai ka.", german: "Ist das nicht der beste Weg?" }
      ],
      notes: "Formeller literarischer Ausdruck, oft in schriftlicher Sprache.",
      related: ["ではないだろうか", "のではないか"]
    },
    {
      id: "n1-dewaaru maishi",
      pattern: "～ではあるまいし",
      level: "N1",
      category: "Satzstrukturen",
      meaning: "es ist ja nicht, als ob",
      explanation: "Weist eine Annahme oder Erwartung zurück, indem man sagt, dass die Situation nicht so extrem ist. Drückt oft Kritik oder Ungeduld aus.",
      formation: "普通形 + のではあるまいし\nNomen/な-Adjektiv + ではあるまいし",
      examples: [
        { japanese: "子供ではあるまいし、そんなことも分からないのか。", romaji: "Kodomo de wa arumaishi, sonna koto mo wakaranai no ka.", german: "Du bist doch kein Kind, verstehst du das nicht einmal?" },
        { japanese: "お金が無限にあるわけではあるまいし、節約しなさい。", romaji: "Okane ga mugen ni aru wake de wa arumaishi, setsuyaku shinasai.", german: "Es ist ja nicht so, als hätten wir unendlich Geld, also spare!" }
      ],
      notes: "Drückt oft Kritik oder Tadel aus.",
      related: ["わけではないのだから", "じゃあるまいし"]
    },
    {
      id: "n1-tomonaku2",
      pattern: "～ともなく",
      level: "N1",
      category: "Satzstrukturen",
      meaning: "ohne dass man es merkt, unbewusst",
      explanation: "Drückt aus, dass etwas unbewusst oder ohne klare Absicht geschieht. Ähnlich wie ともなしに.",
      formation: "Verb 辞書形 + ともなく",
      examples: [
        { japanese: "どこともなく歩き続けた。", romaji: "Doko to mo naku aruki tsuzuketa.", german: "Ich ging weiter, ohne ein bestimmtes Ziel zu haben." },
        { japanese: "何ともなく彼女のことを思い出した。", romaji: "Nani to mo naku kanojo no koto wo omoidashita.", german: "Ich erinnerte mich ohne besonderen Grund an sie." }
      ],
      notes: "Betont die Abwesenheit von bewusster Intention.",
      related: ["ともなしに", "なんとなく"]
    },
    {
      id: "n1-tomo",
      pattern: "～とも",
      level: "N1",
      category: "Satzstrukturen",
      meaning: "auch wenn, selbst wenn (literarisch)",
      explanation: "Literarischer Ausdruck für 'auch wenn' oder 'selbst wenn'. Wird hauptsächlich in formellen oder literarischen Texten verwendet.",
      formation: "Verb 辞書形 + とも\nい-Adjektiv + とも",
      examples: [
        { japanese: "雨が降ろうとも、行きます。", romaji: "Ame ga furou tomo, ikimasu.", german: "Selbst wenn es regnet, werde ich gehen." },
        { japanese: "困難であろうとも、挑戦する。", romaji: "Konnan de arou tomo, chousen suru.", german: "Auch wenn es schwierig ist, werde ich es versuchen." }
      ],
      notes: "Sehr literarisch, in der gesprochenen Sprache selten.",
      related: ["ても", "であっても"]
    },
    {
      id: "n1-dokorodewanai",
      pattern: "～どころではない",
      level: "N1",
      category: "Satzstrukturen",
      meaning: "überhaupt nicht in der Lage, keine Zeit/Möglichkeit für",
      explanation: "Drückt aus, dass man aufgrund der Umstände überhaupt nicht in der Lage ist, etwas zu tun. Die Situation erlaubt es nicht.",
      formation: "Verb 辞書形 + どころではない\nNomen + どころではない",
      examples: [
        { japanese: "仕事が忙しくて、遊びどころではない。", romaji: "Shigoto ga isogashikute, asobi dokoro de wa nai.", german: "Ich bin so beschäftigt mit der Arbeit, dass ich überhaupt keine Zeit zum Spielen habe." },
        { japanese: "病気で、旅行どころではなかった。", romaji: "Byouki de, ryokou dokoro de wa nakatta.", german: "Ich war krank und hatte überhaupt nicht die Möglichkeit zu reisen." }
      ],
      notes: "Betont die Unmöglichkeit aufgrund äußerer Umstände.",
      related: ["どころか", "どころじゃない"]
    },
    {
      id: "n1-naitomok agiranai",
      pattern: "～ないとも限らない",
      level: "N1",
      category: "Satzstrukturen",
      meaning: "es ist nicht ausgeschlossen, dass; es könnte sein, dass",
      explanation: "Doppelte Verneinung, die ausdrückt, dass etwas möglich ist, auch wenn es unwahrscheinlich erscheint. Lässt Raum für Möglichkeit.",
      formation: "Verb ない-Form + とも限らない",
      examples: [
        { japanese: "彼が来ないとも限らない。", romaji: "Kare ga konai to mo kagiranai.", german: "Es ist nicht ausgeschlossen, dass er kommt." },
        { japanese: "失敗しないとも限らないから、注意が必要だ。", romaji: "Shippai shinai to mo kagiranai kara, chuui ga hitsuyou da.", german: "Es könnte sein, dass wir scheitern, also müssen wir vorsichtig sein." }
      ],
      notes: "Drückt vorsichtige Möglichkeit oder Warnung aus.",
      related: ["かもしれない", "可能性がある"]
    },
    {
      id: "n1-naramad ashimo",
      pattern: "～ならまだしも",
      level: "N1",
      category: "Satzstrukturen",
      meaning: "wenn es ... wäre, wäre es noch verständlich, aber",
      explanation: "Gibt zu, dass etwas in einem Fall verständlich oder akzeptabel wäre, drückt aber aus, dass es im aktuellen Fall nicht der Fall ist.",
      formation: "Nomen + ならまだしも\n普通形 + ならまだしも",
      examples: [
        { japanese: "若者ならまだしも、大人がそんなことをするとは。", romaji: "Wakamono nara madashimo, otona ga sonna koto wo suru to wa.", german: "Wenn es ein junger Mensch wäre, wäre es noch verständlich, aber dass ein Erwachsener so etwas tut!" },
        { japanese: "一度ならまだしも、何度も同じ失敗をするのは問題だ。", romaji: "Ichido nara madashimo, nando mo onaji shippai wo suru no wa mondai da.", german: "Einmal wäre noch verständlich, aber denselben Fehler mehrmals zu machen ist ein Problem." }
      ],
      notes: "Drückt einen Kontrast mit leichter Kritik aus.",
      related: ["ならともかく", "ならいざしらず"]
    },
    {
      id: "n1-nishitatokoro de",
      pattern: "～にしたところで/にしたって",
      level: "N1",
      category: "Satzstrukturen",
      meaning: "selbst wenn, auch wenn",
      explanation: "Drückt aus, dass selbst unter der angenommenen Bedingung das Ergebnis nicht anders wäre. Betont, dass die Bedingung keinen Unterschied macht.",
      formation: "Nomen + にしたところで/にしたって\n普通形 + にしたところで",
      examples: [
        { japanese: "彼にしたところで、この問題は解けないだろう。", romaji: "Kare ni shita tokoro de, kono mondai wa tokenai darou.", german: "Selbst er könnte dieses Problem wahrscheinlich nicht lösen." },
        { japanese: "今から出発したって、間に合わない。", romaji: "Ima kara shuppatsu shitatte, maniawanai.", german: "Auch wenn wir jetzt losfahren, schaffen wir es nicht rechtzeitig." }
      ],
      notes: "Betont die Vergeblichkeit oder Unveränderlichkeit des Ergebnisses.",
      related: ["にしても", "としても"]
    },
    {
      id: "n1-nishite2",
      pattern: "～にして",
      level: "N1",
      category: "Satzstrukturen",
      meaning: "erst bei, nur bei (Voraussetzung)",
      explanation: "Betont, dass eine bestimmte Voraussetzung oder Bedingung notwendig ist. Oft mit Zahlen oder Mengen verwendet.",
      formation: "Nomen + にして",
      examples: [
        { japanese: "彼女は二十歳にして、会社を設立した。", romaji: "Kanojo wa hatachi ni shite, kaisha wo setsuritsu shita.", german: "Mit nur zwanzig Jahren gründete sie eine Firma." },
        { japanese: "百年にして初めて実現した夢だ。", romaji: "Hyakunen ni shite hajimete jitsugen shita yume da.", german: "Ein Traum, der erst nach hundert Jahren verwirklicht wurde." }
      ],
      notes: "Betont die Besonderheit der Bedingung oder des Zeitpunkts.",
      related: ["で", "において"]
    },
    {
      id: "n1-nitodomarazu",
      pattern: "～にとどまらず",
      level: "N1",
      category: "Satzstrukturen",
      meaning: "nicht beschränkt auf, nicht nur",
      explanation: "Drückt aus, dass etwas über einen bestimmten Bereich oder eine Grenze hinausgeht. Betont die Ausdehnung oder Erweiterung.",
      formation: "Nomen + にとどまらず\nVerb 辞書形 + にとどまらず",
      examples: [
        { japanese: "彼の才能は音楽にとどまらず、絵画にも及ぶ。", romaji: "Kare no sainou wa ongaku ni todomarazu, kaiga ni mo oyobu.", german: "Sein Talent beschränkt sich nicht auf Musik, sondern erstreckt sich auch auf Malerei." },
        { japanese: "この問題は日本にとどまらず、世界中に影響を与える。", romaji: "Kono mondai wa Nihon ni todomarazu, sekaijuu ni eikyou wo ataeru.", german: "Dieses Problem betrifft nicht nur Japan, sondern die ganze Welt." }
      ],
      notes: "Formeller Ausdruck, oft in schriftlicher Sprache.",
      related: ["だけでなく", "のみならず"]
    },
    {
      id: "n1-nihajinai",
      pattern: "～に恥じない",
      level: "N1",
      category: "Satzstrukturen",
      meaning: "würdig, einer Sache gerecht werden",
      explanation: "Drückt aus, dass jemand oder etwas würdig ist und den Erwartungen oder dem Ruf entspricht. Positiver Ausdruck.",
      formation: "Nomen + に恥じない",
      examples: [
        { japanese: "彼はその称号に恥じない活躍をした。", romaji: "Kare wa sono shougou ni hajinai katsuyaku wo shita.", german: "Er leistete Arbeit, die dem Titel würdig war." },
        { japanese: "チャンピオンの名に恥じない戦いぶりだった。", romaji: "Chanpion no na ni hajinai tatakaibu ri datta.", german: "Es war ein Kampf, der des Namens Champion würdig war." }
      ],
      notes: "Positiver Ausdruck, der Würdigkeit betont.",
      related: ["にふさわしい", "に値する"]
    },
    {
      id: "n1-waiun ioyobazu",
      pattern: "～は言うに及ばず",
      level: "N1",
      category: "Satzstrukturen",
      meaning: "ganz zu schweigen von, geschweige denn",
      explanation: "Drückt aus, dass etwas offensichtlich oder selbstverständlich ist und nicht extra erwähnt werden muss. Betont dann zusätzliche Beispiele.",
      formation: "Nomen + は言うに及ばず",
      examples: [
        { japanese: "彼は英語は言うに及ばず、フランス語も話せる。", romaji: "Kare wa eigo wa iu ni oyobazu, furansugo mo hanaseru.", german: "Er kann nicht nur Englisch, sondern natürlich auch Französisch sprechen." },
        { japanese: "東京は言うに及ばず、地方でも人気がある。", romaji: "Toukyou wa iu ni oyobazu, chihou demo ninki ga aru.", german: "Ganz zu schweigen von Tokyo, ist es auch in ländlichen Gebieten beliebt." }
      ],
      notes: "Sehr formeller Ausdruck, oft in schriftlicher Sprache.",
      related: ["はもちろん", "は言うまでもなく"]
    },
    {
      id: "n1-wasateoite",
      pattern: "～はさておき/はさておいて",
      level: "N1",
      category: "Satzstrukturen",
      meaning: "mal abgesehen von, beiseite lassend",
      explanation: "Lässt ein Thema vorübergehend beiseite, um über etwas anderes zu sprechen. Signalisiert einen Themenwechsel.",
      formation: "Nomen + はさておき/はさておいて",
      examples: [
        { japanese: "冗談はさておき、本題に入りましょう。", romaji: "Joudan wa sateoki, hondai ni hairimashou.", german: "Spaß beiseite, kommen wir zum eigentlichen Thema." },
        { japanese: "お金の話はさておいて、まず計画を立てよう。", romaji: "Okane no hanashi wa sateoite, mazu keikaku wo tateyou.", german: "Abgesehen vom Geld, lass uns erst einmal einen Plan machen." }
      ],
      notes: "Nützlich, um ein Thema zu wechseln oder zu priorisieren.",
      related: ["はともかく", "はおいて"]
    },
    {
      id: "n1-bakarikamade",
      pattern: "～ばかりか～まで",
      level: "N1",
      category: "Satzstrukturen",
      meaning: "nicht nur ... sondern sogar",
      explanation: "Betont, dass zusätzlich zu etwas noch etwas Überraschendes oder Extremeres hinzukommt. Verstärkt die Aussage.",
      formation: "Nomen + ばかりか + Nomen + まで\n普通形 + ばかりか～まで",
      examples: [
        { japanese: "彼は日本語ばかりか、中国語まで話せる。", romaji: "Kare wa nihongo bakari ka, chuugokugo made hanaseru.", german: "Er kann nicht nur Japanisch, sondern sogar Chinesisch sprechen." },
        { japanese: "彼女は勉強ばかりか、スポーツまで得意だ。", romaji: "Kanojo wa benkyou bakari ka, supootsu made tokui da.", german: "Sie ist nicht nur gut im Lernen, sondern sogar im Sport." }
      ],
      notes: "Betont die zusätzliche, überraschende Information.",
      related: ["だけでなく～も", "ばかりでなく"]
    },
    {
      id: "n1-hitoridake denaku",
      pattern: "～ひとり～だけでなく",
      level: "N1",
      category: "Satzstrukturen",
      meaning: "nicht nur ... allein",
      explanation: "Betont, dass etwas nicht auf eine einzelne Person oder Sache beschränkt ist, sondern auch andere betrifft.",
      formation: "Nomen + ひとり + だけでなく\nNomen + のみならず",
      examples: [
        { japanese: "これは彼ひとりの問題だけでなく、全員の問題だ。", romaji: "Kore wa kare hitori no mondai dake de naku, zen'in no mondai da.", german: "Das ist nicht nur sein Problem allein, sondern ein Problem für alle." },
        { japanese: "日本ひとりだけでなく、アジア全体の課題だ。", romaji: "Nihon hitori dake de naku, Ajia zentai no kadai da.", german: "Das ist nicht nur Japans Herausforderung, sondern die von ganz Asien." }
      ],
      notes: "Betont die Ausdehnung über eine einzelne Einheit hinaus.",
      related: ["だけでなく", "のみならず"]
    },
    {
      id: "n1-mamire",
      pattern: "～まみれ",
      level: "N1",
      category: "Satzstrukturen",
      meaning: "bedeckt mit, übersät mit (meist negativ)",
      explanation: "Drückt aus, dass etwas vollständig mit etwas bedeckt ist. Wird meist für negative oder schmutzige Dinge verwendet.",
      formation: "Nomen + まみれ",
      examples: [
        { japanese: "泥まみれになって遊んだ。", romaji: "Doro mamire ni natte asonda.", german: "Wir spielten, bis wir voller Schlamm waren." },
        { japanese: "血まみれで倒れていた。", romaji: "Chi mamire de taorete ita.", german: "Er lag blutüberströmt am Boden." }
      ],
      notes: "Meist für negative Dinge wie Schmutz, Blut, Schulden verwendet.",
      related: ["だらけ", "ずくめ"]
    },
    {
      id: "n1-meku",
      pattern: "～めく",
      level: "N1",
      category: "Satzstrukturen",
      meaning: "den Anschein haben von, wirken wie",
      explanation: "Drückt aus, dass etwas Anzeichen oder Merkmale von etwas zeigt. Wird oft mit Nomen kombiniert, um Verben zu bilden.",
      formation: "Nomen + めく",
      examples: [
        { japanese: "春めいた陽気になってきた。", romaji: "Harumei ta youki ni natte kita.", german: "Das Wetter fängt an, frühlingshaft zu werden." },
        { japanese: "彼の話は謎めいている。", romaji: "Kare no hanashi wa nazomeite iru.", german: "Seine Geschichte wirkt geheimnisvoll." }
      ],
      notes: "Bildet oft poetische oder literarische Ausdrücke.",
      related: ["らしい", "っぽい"]
    },
    {
      id: "n1-mono-explanation",
      pattern: "～もの (Erklärung)",
      level: "N1",
      category: "Satzstrukturen",
      meaning: "schließlich, denn (Erklärung/Rechtfertigung)",
      explanation: "Gibt eine Erklärung oder Rechtfertigung für eine Handlung oder Situation. Drückt oft einen subjektiven Grund aus.",
      formation: "普通形 + もの\n普通形 + もん (umgangssprachlich)",
      examples: [
        { japanese: "行きたくないもの。", romaji: "Ikitakunai mono.", german: "Ich will halt nicht gehen." },
        { japanese: "疲れているんだもの、休みたい。", romaji: "Tsukarete irun da mono, yasumitai.", german: "Ich bin müde, deshalb will ich mich ausruhen." }
      ],
      notes: "Oft von Frauen und Kindern verwendet, klingt leicht trotzig.",
      related: ["から", "ので"]
    },
    {
      id: "n1-monogaaru",
      pattern: "～ものがある",
      level: "N1",
      category: "Satzstrukturen",
      meaning: "es hat etwas, es gibt etwas (Besonderes)",
      explanation: "Drückt aus, dass etwas eine gewisse Qualität oder einen Eindruck hat, der schwer zu beschreiben ist. Oft für emotionale oder ästhetische Eindrücke.",
      formation: "Verb 辞書形 + ものがある\nい-Adjektiv + ものがある",
      examples: [
        { japanese: "彼の演奏には心を打つものがある。", romaji: "Kare no ensou ni wa kokoro wo utsu mono ga aru.", german: "Seine Darbietung hat etwas, das das Herz berührt." },
        { japanese: "この絵には考えさせられるものがある。", romaji: "Kono e ni wa kangaesaserareru mono ga aru.", german: "Dieses Gemälde hat etwas, das zum Nachdenken anregt." }
      ],
      notes: "Drückt einen subjektiven, oft positiven Eindruck aus.",
      related: ["ところがある", "感じがある"]
    },
    {
      id: "n1-monotoshite",
      pattern: "～ものとして",
      level: "N1",
      category: "Satzstrukturen",
      meaning: "unter der Annahme dass, als ob",
      explanation: "Drückt aus, dass man etwas als gegeben oder wahr annimmt und entsprechend handelt. Oft in formellen oder offiziellen Kontexten.",
      formation: "普通形 + ものとして\nNomen + (である) + ものとして",
      examples: [
        { japanese: "彼が来ないものとして、計画を進めよう。", romaji: "Kare ga konai mono to shite, keikaku wo susumeyou.", german: "Unter der Annahme, dass er nicht kommt, lass uns mit dem Plan fortfahren." },
        { japanese: "この件は解決したものとして処理する。", romaji: "Kono ken wa kaiketsu shita mono to shite shori suru.", german: "Wir behandeln diese Angelegenheit als gelöst." }
      ],
      notes: "Oft in geschäftlichen oder formellen Situationen verwendet.",
      related: ["として", "と考えて"]
    },
    {
      id: "n1-mononara",
      pattern: "～ものなら (できるものなら)",
      level: "N1",
      category: "Satzstrukturen",
      meaning: "wenn man könnte, wenn es möglich wäre",
      explanation: "Drückt einen starken Wunsch aus, oft mit der Implikation, dass es schwierig oder unmöglich ist. Auch für hypothetische negative Konsequenzen verwendet.",
      formation: "Verb 辞書形 + ものなら\nできる + ものなら",
      examples: [
        { japanese: "できるものなら、やり直したい。", romaji: "Dekiru mono nara, yari naoshitai.", german: "Wenn ich könnte, würde ich es gerne noch einmal machen." },
        { japanese: "嘘をついたものなら、ただでは済まない。", romaji: "Uso wo tsuita mono nara, tada de wa sumanai.", german: "Wenn du lügst, kommst du nicht ungeschoren davon." }
      ],
      notes: "Kann Wunsch oder Warnung ausdrücken, je nach Kontext.",
      related: ["たら", "なら"]
    },
    {
      id: "n1-monono",
      pattern: "～ものの",
      level: "N1",
      category: "Satzstrukturen",
      meaning: "obwohl, zwar ... aber",
      explanation: "Drückt einen Gegensatz aus. Die Situation im ersten Teil ist wahr, führt aber nicht zum erwarteten Ergebnis.",
      formation: "普通形 + ものの",
      examples: [
        { japanese: "合格したものの、まだ実感がない。", romaji: "Goukaku shita monono, mada jikkan ga nai.", german: "Obwohl ich bestanden habe, fühlt es sich noch nicht real an." },
        { japanese: "行くと言ったものの、本当は行きたくない。", romaji: "Iku to itta monono, hontou wa ikitakunai.", german: "Zwar habe ich gesagt, ich gehe, aber eigentlich will ich nicht." }
      ],
      notes: "Formeller als けど oder が.",
      related: ["けれども", "が", "のに"]
    },
    {
      id: "n1-ya",
      pattern: "～や",
      level: "N1",
      category: "Satzstrukturen",
      meaning: "sobald (literarisch)",
      explanation: "Sehr literarischer Ausdruck, der bedeutet 'sobald' oder 'kaum dass'. Wird fast nur in geschriebener Sprache verwendet.",
      formation: "Verb 辞書形 + や",
      examples: [
        { japanese: "彼は私を見るや、逃げ出した。", romaji: "Kare wa watashi wo miru ya, nigedashita.", german: "Kaum sah er mich, rannte er davon." },
        { japanese: "その知らせを聞くや、彼女は泣き出した。", romaji: "Sono shirase wo kiku ya, kanojo wa nakidashita.", german: "Sobald sie die Nachricht hörte, fing sie an zu weinen." }
      ],
      notes: "Sehr literarisch und archaisch, in moderner Sprache selten.",
      related: ["やいなや", "なり", "とたん"]
    },
    {
      id: "n1-youdewanaika",
      pattern: "～ようではないか",
      level: "N1",
      category: "Satzstrukturen",
      meaning: "lasst uns doch, wollen wir nicht",
      explanation: "Ermutigung oder Aufforderung an eine Gruppe, etwas gemeinsam zu tun. Oft in Reden oder formellen Ansprachen.",
      formation: "Verb 意向形 + ではないか\nVerb 意向形 + じゃないか",
      examples: [
        { japanese: "みんなで力を合わせて頑張ろうではないか。", romaji: "Minna de chikara wo awasete ganbarou de wa nai ka.", german: "Lasst uns alle zusammenarbeiten und unser Bestes geben!" },
        { japanese: "この機会に挑戦してみようではありませんか。", romaji: "Kono kikai ni chousen shite miyou de wa arimasen ka.", german: "Wollen wir nicht diese Gelegenheit nutzen und es versuchen?" }
      ],
      notes: "Oft in inspirierenden Reden oder Aufrufen verwendet.",
      related: ["ましょう", "よう"]
    },
    {
      id: "n1-womotte",
      pattern: "～をもって",
      level: "N1",
      category: "Satzstrukturen",
      meaning: "mit, mittels, ab (formal)",
      explanation: "Sehr formeller Ausdruck für 'mit', 'mittels' oder 'ab einem bestimmten Zeitpunkt'. Wird in offiziellen Ankündigungen und formellen Kontexten verwendet.",
      formation: "Nomen + をもって",
      examples: [
        { japanese: "本日をもって、営業を終了いたします。", romaji: "Honjitsu wo motte, eigyou wo shuuryou itashimasu.", german: "Ab heute stellen wir den Geschäftsbetrieb ein." },
        { japanese: "この賞をもって、彼の功績を称えます。", romaji: "Kono shou wo motte, kare no kouseki wo tataemasu.", german: "Mit diesem Preis würdigen wir seine Leistungen." }
      ],
      notes: "Sehr formell, oft in offiziellen Dokumenten oder Ankündigungen.",
      related: ["で", "によって"]
    },
    {
      id: "n1-wokawakiritoshite",
      pattern: "～を皮切りとして/を皮切りに",
      level: "N1",
      category: "Satzstrukturen",
      meaning: "beginnend mit, ausgehend von",
      explanation: "Drückt aus, dass etwas der Anfang oder Auftakt für eine Reihe von Ereignissen ist. Markiert den Startpunkt.",
      formation: "Nomen + を皮切りとして/を皮切りに",
      examples: [
        { japanese: "東京を皮切りに、全国ツアーを行う。", romaji: "Toukyou wo kawakiri ni, zenkoku tsuaa wo okonau.", german: "Beginnend mit Tokyo werden wir eine landesweite Tour durchführen." },
        { japanese: "この事件を皮切りに、様々な問題が明らかになった。", romaji: "Kono jiken wo kawakiri ni, samazama na mondai ga akiraka ni natta.", german: "Ausgehend von diesem Vorfall wurden verschiedene Probleme offensichtlich." }
      ],
      notes: "Betont den Beginn einer Serie von Ereignissen.",
      related: ["を始めとして", "から始まって"]
    },
    {
      id: "n1-nbakari",
      pattern: "～んばかり",
      level: "N1",
      category: "Satzstrukturen",
      meaning: "als ob man gleich würde, kurz davor",
      explanation: "Drückt aus, dass etwas so aussieht oder sich so anfühlt, als würde es gleich passieren. Betont die Intensität oder Unmittelbarkeit.",
      formation: "Verb ない-Form (ん) + ばかり",
      examples: [
        { japanese: "今にも泣き出さんばかりの顔をしていた。", romaji: "Ima ni mo nakidasan bakari no kao wo shite ita.", german: "Er hatte ein Gesicht, als würde er gleich anfangen zu weinen." },
        { japanese: "飛び上がらんばかりに喜んだ。", romaji: "Tobiagaran bakari ni yorokonda.", german: "Er freute sich so sehr, dass er fast in die Luft gesprungen wäre." }
      ],
      notes: "Literarischer Ausdruck, betont die Intensität.",
      related: ["そうだ", "ようだ"]
    },
    {
      id: "n1-kagirida",
      pattern: "～限りだ",
      level: "N1",
      category: "Satzstrukturen",
      meaning: "äußerst, zutiefst (Gefühl)",
      explanation: "Drückt ein extremes Gefühl oder einen extremen Zustand aus. Wird oft mit Gefühlsadjektiven verwendet.",
      formation: "い-Adjektiv + 限りだ\nな-Adjektiv + な + 限りだ",
      examples: [
        { japanese: "彼の成功は喜ばしい限りだ。", romaji: "Kare no seikou wa yorokobashii kagiri da.", german: "Sein Erfolg ist höchst erfreulich." },
        { japanese: "このような結果になって、残念な限りです。", romaji: "Kono you na kekka ni natte, zannen na kagiri desu.", german: "Dass es zu einem solchen Ergebnis kam, ist äußerst bedauerlich." }
      ],
      notes: "Drückt starke Gefühle oder Bewertungen aus.",
      related: ["きわめて", "非常に"]
    },
    {
      id: "n1-kagiride wa",
      pattern: "～限りでは",
      level: "N1",
      category: "Satzstrukturen",
      meaning: "soweit, nach dem, was",
      explanation: "Drückt aus, dass eine Aussage auf begrenztem Wissen oder begrenzter Erfahrung basiert. Zeigt die Grenzen der eigenen Kenntnis an.",
      formation: "Verb 辞書形/た-Form + 限りでは\nNomen + の限りでは",
      examples: [
        { japanese: "私が知る限りでは、彼は正直な人だ。", romaji: "Watashi ga shiru kagiri de wa, kare wa shoujiki na hito da.", german: "Soweit ich weiß, ist er ein ehrlicher Mensch." },
        { japanese: "見た限りでは、問題はなさそうだ。", romaji: "Mita kagiri de wa, mondai wa nasasou da.", german: "Nach dem, was ich gesehen habe, scheint es kein Problem zu geben." }
      ],
      notes: "Zeigt an, dass die Information begrenzt sein könnte.",
      related: ["かぎり", "範囲では"]
    },
    {
      id: "n1-gayueni",
      pattern: "～がゆえに/が故に",
      level: "N1",
      category: "Satzstrukturen",
      meaning: "gerade weil, aufgrund von",
      explanation: "Sehr formeller Ausdruck für 'weil' oder 'aufgrund von'. Betont die Kausalität und wird hauptsächlich in geschriebener Sprache verwendet.",
      formation: "普通形 + がゆえに\nNomen + (である) + がゆえに",
      examples: [
        { japanese: "若さゆえの過ちだった。", romaji: "Wakasa yue no ayamachi datta.", german: "Es war ein Fehler aufgrund seiner Jugend." },
        { japanese: "経験不足であるがゆえに、失敗した。", romaji: "Keiken busoku de aru ga yue ni, shippai shita.", german: "Gerade weil ich unerfahren war, bin ich gescheitert." }
      ],
      notes: "Sehr formell und literarisch, in gesprochener Sprache selten.",
      related: ["ために", "から", "ので"]
    },
    {
      id: "n1-kosoare",
      pattern: "～こそあれ",
      level: "N1",
      category: "Satzstrukturen",
      meaning: "zwar ... aber, gerade ... aber keinesfalls",
      explanation: "Gibt zu, dass etwas in eine Richtung geht, schließt aber das Gegenteil aus. Sehr literarischer Ausdruck.",
      formation: "Nomen + こそあれ\nVerb ます-Form + こそすれ",
      examples: [
        { japanese: "増えこそあれ、減ることはない。", romaji: "Fue koso are, heru koto wa nai.", german: "Es mag zunehmen, aber abnehmen wird es nicht." },
        { japanese: "彼女は怒りこそすれ、喜ぶことはないだろう。", romaji: "Kanojo wa okori koso sure, yorokobu koto wa nai darou.", german: "Sie wird eher wütend sein, sich aber sicher nicht freuen." }
      ],
      notes: "Sehr literarisch, in moderner Umgangssprache nicht gebräuchlich.",
      related: ["ことはあっても", "としても"]
    },
    {
      id: "n1-kososure",
      pattern: "～こそすれ",
      level: "N1",
      category: "Satzstrukturen",
      meaning: "zwar (eher so), aber keinesfalls das Gegenteil",
      explanation: "Ähnlich wie こそあれ, betont dass etwas in eine Richtung tendiert, aber definitiv nicht das Gegenteil ist. Sehr literarisch.",
      formation: "Verb ます-Form + こそすれ",
      examples: [
        { japanese: "困難は増しこそすれ、減りはしない。", romaji: "Konnan wa mashi koso sure, heri wa shinai.", german: "Die Schwierigkeiten nehmen eher zu, als dass sie abnehmen." },
        { japanese: "彼の態度は硬化しこそすれ、軟化しない。", romaji: "Kare no taido wa kouka shi koso sure, nanka shinai.", german: "Seine Haltung verhärtet sich eher, als dass sie weicher wird." }
      ],
      notes: "Sehr literarisch und formell, archaischer Stil.",
      related: ["こそあれ", "ことはあっても"]
    },
    {
      id: "n1-shimatsuda",
      pattern: "～始末だ/始末",
      level: "N1",
      category: "Satzstrukturen",
      meaning: "es endet negativ damit, so weit kommt es",
      explanation: "Drückt aus, dass eine Situation zu einem unerwünschten oder beklagenswerten Ergebnis führt. Hat immer eine negative Konnotation.",
      formation: "Verb 辞書形/た-Form + 始末だ",
      examples: [
        { japanese: "お金を使いすぎて、借金をする始末だ。", romaji: "Okane wo tsukaisugite, shakkin wo suru shimatsu da.", german: "Ich gab zu viel Geld aus und musste mich sogar verschulden." },
        { japanese: "彼は遅刻ばかりで、ついにクビになる始末だった。", romaji: "Kare wa chikoku bakari de, tsui ni kubi ni naru shimatsu datta.", german: "Er kam ständig zu spät und wurde schließlich sogar gefeuert." }
      ],
      notes: "Immer negativ, drückt Bedauern oder Kritik aus.",
      related: ["ありさま", "有様"]
    },
    {
      id: "n1-zukume",
      pattern: "～ずくめ",
      level: "N1",
      category: "Satzstrukturen",
      meaning: "voll von, lauter, durchgehend",
      explanation: "Drückt aus, dass etwas vollständig oder ausschließlich aus einem Element besteht. Kann positiv oder negativ sein.",
      formation: "Nomen + ずくめ",
      examples: [
        { japanese: "今日は良いことずくめだった。", romaji: "Kyou wa yoi koto zukume datta.", german: "Heute passierte nur Gutes." },
        { japanese: "黒ずくめの服を着ている。", romaji: "Kuro zukume no fuku wo kite iru.", german: "Er trägt durchgehend schwarze Kleidung." }
      ],
      notes: "Kann für positive oder negative Dinge verwendet werden.",
      related: ["だらけ", "まみれ"]
    },
    {
      id: "n1-sobakara",
      pattern: "～そばから",
      level: "N1",
      category: "Satzstrukturen",
      meaning: "kaum dass ... schon wieder, sobald ... sofort wieder",
      explanation: "Drückt aus, dass unmittelbar nachdem etwas getan wurde, das Gegenteil oder etwas Negatives passiert. Betont die Vergeblichkeit.",
      formation: "Verb 辞書形/た-Form + そばから",
      examples: [
        { japanese: "掃除したそばから、また散らかす。", romaji: "Souji shita soba kara, mata chirakasu.", german: "Kaum habe ich sauber gemacht, macht er schon wieder Unordnung." },
        { japanese: "覚えたそばから忘れてしまう。", romaji: "Oboeta soba kara wasurete shimau.", german: "Sobald ich etwas lerne, vergesse ich es auch schon wieder." }
      ],
      notes: "Drückt oft Frustration über sich wiederholende negative Ereignisse aus.",
      related: ["とたんに", "なり"]
    },
    {
      id: "n1-tatokoro",
      pattern: "～たところ",
      level: "N1",
      category: "Satzstrukturen",
      meaning: "als man es tat (Ergebnis), nachdem",
      explanation: "Drückt aus, dass nachdem man etwas getan hat, ein bestimmtes Ergebnis oder eine Entdeckung folgte. Betont die Abfolge und das Ergebnis.",
      formation: "Verb た-Form + ところ",
      examples: [
        { japanese: "調べたところ、彼の話は本当だった。", romaji: "Shirabeta tokoro, kare no hanashi wa hontou datta.", german: "Als ich es untersuchte, stellte sich heraus, dass seine Geschichte wahr war." },
        { japanese: "電話したところ、彼は不在だった。", romaji: "Denwa shita tokoro, kare wa fuzai datta.", german: "Als ich anrief, war er nicht da." }
      ],
      notes: "Betont das Ergebnis oder die Entdeckung nach einer Handlung.",
      related: ["たら", "と"]
    },
    {
      id: "n1-dakeatte",
      pattern: "～だけあって/だけのことはあって",
      level: "N1",
      category: "Satzstrukturen",
      meaning: "wie man es erwarten würde, dem entsprechend",
      explanation: "Drückt aus, dass ein Ergebnis den Erwartungen entspricht, die auf einem bestimmten Merkmal oder Status basieren.",
      formation: "Nomen + だけあって\n普通形 + だけあって",
      examples: [
        { japanese: "彼はプロだけあって、仕事が速い。", romaji: "Kare wa puro dake atte, shigoto ga hayai.", german: "Wie man es von einem Profi erwarten würde, arbeitet er schnell." },
        { japanese: "高いだけあって、品質は良い。", romaji: "Takai dake atte, hinshitsu wa yoi.", german: "Es ist teuer, aber entsprechend gut ist die Qualität." }
      ],
      notes: "Betont, dass das Ergebnis den Erwartungen entspricht.",
      related: ["だけに", "から"]
    },
    {
      id: "n1-dakemashi",
      pattern: "～だけまし",
      level: "N1",
      category: "Satzstrukturen",
      meaning: "wenigstens besser als, immerhin",
      explanation: "Drückt aus, dass eine Situation zwar nicht ideal ist, aber immerhin besser als eine Alternative. Betont das Positive in einer negativen Situation.",
      formation: "普通形 + だけまし\nNomen + だけまし",
      examples: [
        { japanese: "少しでももらえるだけましだ。", romaji: "Sukoshi demo moraeru dake mashi da.", german: "Es ist wenigstens besser, als gar nichts zu bekommen." },
        { japanese: "怪我がなかっただけましだった。", romaji: "Kega ga nakatta dake mashi datta.", german: "Immerhin gab es keine Verletzungen." }
      ],
      notes: "Drückt Erleichterung trotz negativer Umstände aus.",
      related: ["だけでも", "まだましだ"]
    },
    {
      id: "n1-dearouto",
      pattern: "～であろうと",
      level: "N1",
      category: "Satzstrukturen",
      meaning: "selbst wenn es ... wäre, auch wenn",
      explanation: "Drückt aus, dass etwas unabhängig von den Umständen gilt. Sehr formeller Ausdruck.",
      formation: "Nomen + であろうと\n疑問詞 + であろうと",
      examples: [
        { japanese: "誰であろうと、ルールは守らなければならない。", romaji: "Dare de arou to, ruuru wa mamoranakereba naranai.", german: "Wer auch immer es ist, muss die Regeln befolgen." },
        { japanese: "どんな困難であろうと、諦めない。", romaji: "Donna konnan de arou to, akiramenai.", german: "Egal wie schwierig es ist, ich gebe nicht auf." }
      ],
      notes: "Sehr formell, oft in schriftlicher Sprache.",
      related: ["であっても", "でも"]
    },
    {
      id: "n1-teshikarubeki",
      pattern: "～てしかるべき",
      level: "N1",
      category: "Satzstrukturen",
      meaning: "es wäre angemessen, es sollte natürlich",
      explanation: "Drückt aus, dass etwas angemessen, natürlich oder zu erwarten wäre. Oft verwendet, um zu kritisieren, dass etwas nicht geschehen ist.",
      formation: "Verb て-Form + しかるべき",
      examples: [
        { japanese: "このような問題は早急に対処してしかるべきだ。", romaji: "Kono you na mondai wa sakkyuu ni taisho shite shikaru beki da.", german: "Solche Probleme sollten natürlich umgehend angegangen werden." },
        { japanese: "彼には感謝してしかるべきだ。", romaji: "Kare ni wa kansha shite shikaru beki da.", german: "Es wäre angemessen, ihm zu danken." }
      ],
      notes: "Formell, oft mit normativer oder kritischer Konnotation.",
      related: ["べきだ", "はずだ"]
    },
    {
      id: "n1-temosashitsukaenai",
      pattern: "～ても差し支えない",
      level: "N1",
      category: "Satzstrukturen",
      meaning: "es macht nichts wenn, es ist in Ordnung zu",
      explanation: "Formeller Ausdruck, der Erlaubnis oder Zustimmung gibt. Drückt aus, dass etwas akzeptabel ist und keine Probleme verursacht.",
      formation: "Verb て-Form + も差し支えない",
      examples: [
        { japanese: "ここで写真を撮っても差し支えありません。", romaji: "Koko de shashin wo totte mo sashitsukae arimasen.", german: "Es macht nichts, wenn Sie hier Fotos machen." },
        { japanese: "明日来ても差し支えない。", romaji: "Ashita kite mo sashitsukae nai.", german: "Es ist in Ordnung, wenn Sie morgen kommen." }
      ],
      notes: "Sehr formell, oft in geschäftlichen oder offiziellen Kontexten.",
      related: ["てもかまわない", "てもいい"]
    },
    {
      id: "n1-toattewa",
      pattern: "～とあっては",
      level: "N1",
      category: "Satzstrukturen",
      meaning: "wenn es so ist dass, unter diesen Umständen",
      explanation: "Drückt aus, dass unter bestimmten besonderen Umständen eine entsprechende Reaktion oder Handlung natürlich oder unvermeidlich ist.",
      formation: "普通形 + とあっては\nNomen + とあっては",
      examples: [
        { japanese: "社長の命令とあっては、断れない。", romaji: "Shachou no meirei to atte wa, kotowarenai.", german: "Wenn es ein Befehl des Geschäftsführers ist, kann ich nicht ablehnen." },
        { japanese: "このような状況とあっては、仕方がない。", romaji: "Kono you na joukyou to atte wa, shikata ga nai.", german: "Unter diesen Umständen lässt sich nichts machen." }
      ],
      notes: "Betont die Unvermeidlichkeit oder Natürlichkeit der Reaktion.",
      related: ["となると", "としては"]
    },
    {
      id: "n1-toiumono",
      pattern: "～というもの",
      level: "N1",
      category: "Satzstrukturen",
      meaning: "die ganze Zeit über, seit",
      explanation: "Betont, dass ein Zustand über einen längeren Zeitraum kontinuierlich andauert. Wird oft mit Zeitausdrücken verwendet.",
      formation: "Zeitausdruck + というもの",
      examples: [
        { japanese: "あれ以来というもの、彼とは会っていない。", romaji: "Are irai to iu mono, kare to wa atte inai.", german: "Seit damals habe ich ihn überhaupt nicht mehr gesehen." },
        { japanese: "この一週間というもの、雨ばかりだ。", romaji: "Kono isshuukan to iu mono, ame bakari da.", german: "Diese ganze Woche über regnet es ständig." }
      ],
      notes: "Betont die Kontinuität über den gesamten Zeitraum.",
      related: ["ずっと", "の間"]
    },
    {
      id: "n1-toittatokoroda",
      pattern: "～といったところだ",
      level: "N1",
      category: "Satzstrukturen",
      meaning: "so ungefähr, etwa, bestenfalls",
      explanation: "Gibt eine ungefähre Schätzung oder Bewertung an. Drückt oft aus, dass etwas bescheiden oder begrenzt ist.",
      formation: "Zahl/Menge + といったところだ\n普通形 + といったところだ",
      examples: [
        { japanese: "参加者は30人といったところだ。", romaji: "Sankasha wa sanjuunin to itta tokoro da.", german: "Es sind etwa 30 Teilnehmer, würde ich sagen." },
        { japanese: "彼の実力はせいぜい中級といったところだ。", romaji: "Kare no jitsuryoku wa seizei chuukyuu to itta tokoro da.", german: "Seine Fähigkeiten sind bestenfalls auf mittlerem Niveau." }
      ],
      notes: "Drückt oft eine bescheidene oder realistische Einschätzung aus.",
      related: ["ぐらい", "程度だ"]
    },
    {
      id: "n1-toshitatokorode",
      pattern: "～としたところで",
      level: "N1",
      category: "Satzstrukturen",
      meaning: "selbst wenn man annimmt, auch angenommen",
      explanation: "Nimmt hypothetisch an, dass etwas der Fall ist, und zeigt dann, dass das Ergebnis trotzdem nicht anders wäre.",
      formation: "普通形 + としたところで\nNomen + としたところで",
      examples: [
        { japanese: "今から急いだとしたところで、間に合わない。", romaji: "Ima kara isoida to shita tokoro de, maniawanai.", german: "Selbst wenn wir uns jetzt beeilen, schaffen wir es nicht rechtzeitig." },
        { japanese: "彼に頼んだとしたところで、助けてくれないだろう。", romaji: "Kare ni tanonda to shita tokoro de, tasukete kurenai darou.", german: "Auch wenn wir ihn bitten würden, würde er uns wahrscheinlich nicht helfen." }
      ],
      notes: "Betont die Vergeblichkeit oder Unveränderlichkeit des Ergebnisses.",
      related: ["としても", "たところで"]
    },
    {
      id: "n1-tomiruya",
      pattern: "～とみるや",
      level: "N1",
      category: "Satzstrukturen",
      meaning: "sobald man sieht/bemerkt dass",
      explanation: "Drückt aus, dass unmittelbar nachdem man etwas bemerkt oder sieht, eine Handlung folgt. Betont die Schnelligkeit der Reaktion.",
      formation: "Verb 辞書形/た-Form + とみるや",
      examples: [
        { japanese: "彼は私を見るや、走り去った。", romaji: "Kare wa watashi wo miru ya, hashiri satta.", german: "Sobald er mich sah, rannte er davon." },
        { japanese: "チャンスとみるや、すぐに行動に移した。", romaji: "Chansu to miru ya, sugu ni koudou ni utsushita.", german: "Sobald er eine Chance sah, handelte er sofort." }
      ],
      notes: "Literarischer Ausdruck, betont schnelle Reaktion.",
      related: ["や", "やいなや", "なり"]
    },
    {
      id: "n1-naimonoka2",
      pattern: "～ないものか (gibt es keinen Weg)",
      level: "N1",
      category: "Satzstrukturen",
      meaning: "gibt es keinen Weg zu, kann man nicht irgendwie",
      explanation: "Drückt einen starken Wunsch aus, dass es einen Weg geben möge, etwas zu tun. Oft mit Hoffnung oder leichter Verzweiflung.",
      formation: "Verb ない-Form + ものか\nVerb ない-Form + ものだろうか",
      examples: [
        { japanese: "何とか解決できないものか。", romaji: "Nantoka kaiketsu dekinai mono ka.", german: "Gibt es keinen Weg, das irgendwie zu lösen?" },
        { japanese: "もっと簡単にできないものだろうか。", romaji: "Motto kantan ni dekinai mono darou ka.", german: "Kann man das nicht irgendwie einfacher machen?" }
      ],
      notes: "Drückt Wunsch mit leichtem Zweifel an der Möglichkeit aus.",
      related: ["ないか", "ないだろうか"]
    },    // ============================================================
    // ADJEKTIVE (15)
    // ============================================================
    {
      id: "n1-kiwamari-nai",
      pattern: "～極まりない / ～極まる",
      level: "N1",
      category: "Adjektive",
      meaning: "äußerst, extrem, in höchstem Maße",
      explanation: "Drückt aus, dass etwas in höchstem Maße oder äußerst intensiv ist. Wird oft mit negativen Adjektiven verwendet, um extreme Zustände oder Eigenschaften zu beschreiben. Die Form 極まる wird auch als Verb verwendet.",
      formation: "ナ形容詞語幹 + 極まりない\nイ形容詞語幹 + 極まりない\n名詞 + 極まる",
      examples: [
        {
          japanese: "彼の行動は失礼極まりない。",
          romaji: "Kare no koudou wa shitsurei kiwamari nai.",
          german: "Sein Verhalten ist äußerst unhöflich."
        },
        {
          japanese: "危険極まりない計画だ。",
          romaji: "Kiken kiwamari nai keikaku da.",
          german: "Das ist ein extrem gefährlicher Plan."
        },
        {
          japanese: "不便極まりない場所に住んでいる。",
          romaji: "Fuben kiwamari nai basho ni sunde iru.",
          german: "Ich wohne an einem äußerst ungünstigen Ort."
        }
      ],
      notes: "Formeller Ausdruck, hauptsächlich in geschriebener Sprache verwendet. Oft mit negativen Begriffen kombiniert.",
      related: ["限りだ", "この上ない"]
    },
    {
      id: "n1-kagiri-da",
      pattern: "～限りだ",
      level: "N1",
      category: "Adjektive",
      meaning: "zutiefst, äußerst (Gefühl), nichts als",
      explanation: "Drückt intensive Gefühle oder Emotionen aus. Wird verwendet, um zu betonen, dass man nur dieses eine Gefühl empfindet. Oft mit Gefühlswörtern wie 嬉しい, 残念, 悲しい kombiniert.",
      formation: "イ形容詞 + 限りだ\nナ形容詞語幹 + な + 限りだ",
      examples: [
        {
          japanese: "試験に合格して嬉しい限りだ。",
          romaji: "Shiken ni goukaku shite ureshii kagiri da.",
          german: "Ich bin äußerst glücklich, die Prüfung bestanden zu haben."
        },
        {
          japanese: "彼が亡くなったのは残念な限りです。",
          romaji: "Kare ga nakunatta no wa zannen na kagiri desu.",
          german: "Es ist zutiefst bedauerlich, dass er verstorben ist."
        },
        {
          japanese: "この結果は遺憾な限りである。",
          romaji: "Kono kekka wa ikan na kagiri de aru.",
          german: "Dieses Ergebnis ist äußerst bedauerlich."
        }
      ],
      notes: "Formeller Ausdruck für starke Emotionen. Wird hauptsächlich in schriftlicher Sprache oder formellen Situationen verwendet.",
      related: ["極まりない", "この上ない"]
    },
    {
      id: "n1-meku-adj",
      pattern: "～めく",
      level: "N1",
      category: "Adjektive",
      meaning: "den Anschein von ... haben, -artig wirken, nach ... aussehen",
      explanation: "Wird an Nomen angehängt, um auszudrücken, dass etwas den Anschein oder die Eigenschaften von etwas anderem hat. Oft wird damit eine atmosphärische Veränderung oder ein Eindruck beschrieben. Literarischer Ausdruck.",
      formation: "名詞 + めく\n名詞 + めいた + 名詞",
      examples: [
        {
          japanese: "春めいた天気になってきた。",
          romaji: "Haru meita tenki ni natte kita.",
          german: "Das Wetter bekommt einen frühlingsartigen Anschein."
        },
        {
          japanese: "彼女は謎めいた微笑みを浮かべた。",
          romaji: "Kanojo wa nazo meita hohoemi wo ukabeta.",
          german: "Sie zeigte ein geheimnisvolles Lächeln."
        },
        {
          japanese: "皮肉めいた言い方をするな。",
          romaji: "Hiniku meita iikata wo suru na.",
          german: "Sprich nicht in diesem sarkastischen Ton."
        }
      ],
      notes: "Literarischer Ausdruck. Die めいた-Form wird vor Nomen verwendet.",
      related: ["っぽい", "じみた", "げ"]
    },
    {
      id: "n1-jimita",
      pattern: "～じみた / ～じみる",
      level: "N1",
      category: "Adjektive",
      meaning: "wie ..., -artig (meist negativ oder abwertend)",
      explanation: "Drückt aus, dass etwas wie etwas anderes wirkt oder aussieht, oft mit negativer oder kritischer Konnotation. Wird verwendet, um auszudrücken, dass etwas unpassend oder unangenehm wirkt. じみた wird vor Nomen, じみる als Verb verwendet.",
      formation: "名詞 + じみた + 名詞\n名詞 + じみる",
      examples: [
        {
          japanese: "説教じみた話はやめてください。",
          romaji: "Sekkyou jimita hanashi wa yamete kudasai.",
          german: "Bitte hör auf mit diesen predigtartigen Reden."
        },
        {
          japanese: "彼の服装は年寄りじみている。",
          romaji: "Kare no fukusou wa toshiyori jimite iru.",
          german: "Seine Kleidung wirkt altmodisch/wie ein alter Mann."
        },
        {
          japanese: "愚痴じみたことを言うな。",
          romaji: "Guchi jimita koto wo iu na.",
          german: "Sag nicht solche jammervollen Dinge."
        }
      ],
      notes: "Meist mit negativer Konnotation. Drückt aus, dass etwas unpassend oder unangemessen wirkt.",
      related: ["っぽい", "めく", "がましい"]
    },
    {
      id: "n1-gamashii",
      pattern: "～がましい",
      level: "N1",
      category: "Adjektive",
      meaning: "anmaßend, wie ... wirkend, unangemessen ... erscheinend",
      explanation: "Drückt aus, dass etwas oder jemand wie etwas wirkt, das unangemessen oder anmaßend ist. Hat eine negative Konnotation und zeigt an, dass das Verhalten oder die Erscheinung nicht zur Situation passt. Kritischer Ausdruck.",
      formation: "名詞 + がましい\n名詞 + がましく",
      examples: [
        {
          japanese: "わざとらしい、わざとがましい演技だ。",
          romaji: "Wazatorashii, wazato gamashii engi da.",
          german: "Das ist eine gekünstelte, gestellte Aufführung."
        },
        {
          japanese: "押し付けがましい態度は好きではない。",
          romaji: "Oshitsuke gamashii taido wa suki dewa nai.",
          german: "Ich mag diese aufdringliche Haltung nicht."
        },
        {
          japanese: "恩着せがましいことを言うな。",
          romaji: "Onkise gamashii koto wo iu na.",
          german: "Sage nichts, was nach Gefälligkeitsheischerei klingt."
        }
      ],
      notes: "Stark negative Konnotation. Wird verwendet, um unangemessenes oder anmaßendes Verhalten zu kritisieren.",
      related: ["じみた", "っぽい"]
    },
    {
      id: "n1-gatai",
      pattern: "～がたい / ～難い",
      level: "N1",
      category: "Adjektive",
      meaning: "schwer zu ..., kaum möglich zu ..., schwierig zu ...",
      explanation: "Drückt aus, dass etwas schwierig oder kaum möglich ist zu tun. Formeller als にくい und wird oft in geschriebener Sprache verwendet. Betont die objektive Schwierigkeit oder Unmöglichkeit einer Handlung.",
      formation: "動詞ます形 + がたい\n動詞ます形 + 難い",
      examples: [
        {
          japanese: "彼の説明は理解しがたい。",
          romaji: "Kare no setsumei wa rikai shigatai.",
          german: "Seine Erklärung ist schwer zu verstehen."
        },
        {
          japanese: "許しがたい行為だ。",
          romaji: "Yurushi gatai koui da.",
          german: "Das ist eine unverzeihliche Tat."
        },
        {
          japanese: "信じがたい話だが、本当らしい。",
          romaji: "Shinji gatai hanashi da ga, hontou rashii.",
          german: "Es ist eine kaum zu glaubende Geschichte, aber sie scheint wahr zu sein."
        }
      ],
      notes: "Formeller als にくい. Wird oft in schriftlicher Sprache oder formellen Situationen verwendet.",
      related: ["にくい", "かねる"]
    },
    {
      id: "n1-ppoi",
      pattern: "～っぽい",
      level: "N1",
      category: "Adjektive",
      meaning: "-artig, neigt zu ..., leicht ..., wirkt wie ...",
      explanation: "Drückt aus, dass etwas die Tendenz oder Eigenschaft von etwas anderem hat. Kann verwendet werden, um Farben, Charaktereigenschaften oder Neigungen zu beschreiben. Umgangssprachlicher Ausdruck mit neutraler bis leicht negativer Konnotation.",
      formation: "名詞 + っぽい\n動詞ます形 + っぽい\nイ形容詞語幹 + っぽい",
      examples: [
        {
          japanese: "彼は忘れっぽい性格だ。",
          romaji: "Kare wa wasure ppoi seikaku da.",
          german: "Er ist vergesslich von Natur aus."
        },
        {
          japanese: "この布は水っぽい色をしている。",
          romaji: "Kono nuno wa mizu ppoi iro wo shite iru.",
          german: "Dieser Stoff hat eine wässrige/bläuliche Farbe."
        },
        {
          japanese: "子供っぽい行動はやめなさい。",
          romaji: "Kodomo ppoi koudou wa yame nasai.",
          german: "Hör auf mit diesem kindischen Verhalten."
        }
      ],
      notes: "Umgangssprachlicher Ausdruck. Kann neutral oder leicht negativ sein, je nach Kontext.",
      related: ["らしい", "めく", "じみた"]
    },
    {
      id: "n1-mamire-adj",
      pattern: "～まみれ",
      level: "N1",
      category: "Adjektive",
      meaning: "bedeckt mit ..., übersät mit ..., voller ...",
      explanation: "Drückt aus, dass etwas vollständig mit etwas bedeckt ist, meist mit unangenehmen Dingen wie Schmutz, Blut oder Schulden. Hat eine negative Konnotation und wird für unerwünschte Zustände verwendet.",
      formation: "名詞 + まみれ\n名詞 + まみれの + 名詞",
      examples: [
        {
          japanese: "泥まみれになって帰ってきた。",
          romaji: "Doro mamire ni natte kaette kita.",
          german: "Ich kam schlammbedeckt nach Hause."
        },
        {
          japanese: "血まみれの服を着ていた。",
          romaji: "Chi mamire no fuku wo kite ita.",
          german: "Er trug blutbefleckte Kleidung."
        },
        {
          japanese: "借金まみれの生活から抜け出したい。",
          romaji: "Shakkin mamire no seikatsu kara nukedashitai.",
          german: "Ich möchte aus diesem schuldenübersäten Leben herauskommen."
        }
      ],
      notes: "Negative Konnotation. Wird für physische oder metaphorische Bedeckung mit unerwünschten Dingen verwendet.",
      related: ["だらけ", "ずくめ"]
    },
    {
      id: "n1-zukume-adj",
      pattern: "～ずくめ",
      level: "N1",
      category: "Adjektive",
      meaning: "lauter ..., voll von ..., durchgehend ..., nur ...",
      explanation: "Drückt aus, dass etwas vollständig aus einer Sache besteht oder nur eine Art von Sache vorhanden ist. Kann neutral oder positiv sein, im Gegensatz zu まみれ und だらけ. Wird oft für Kleidung oder Situationen verwendet.",
      formation: "名詞 + ずくめ\n名詞 + ずくめの + 名詞",
      examples: [
        {
          japanese: "彼女は黒ずくめの服装をしていた。",
          romaji: "Kanojo wa kuro zukume no fukusou wo shite ita.",
          german: "Sie trug nur schwarze Kleidung."
        },
        {
          japanese: "良いことずくめの一日だった。",
          romaji: "Yoi koto zukume no ichinichi datta.",
          german: "Es war ein Tag voller guter Dinge."
        },
        {
          japanese: "今月は嬉しいことずくめだ。",
          romaji: "Kongetsu wa ureshii koto zukume da.",
          german: "Diesen Monat passieren nur erfreuliche Dinge."
        }
      ],
      notes: "Kann neutral oder positiv sein. Wird oft für Kleidung (Farben) oder aufeinanderfolgende Ereignisse verwendet.",
      related: ["まみれ", "だらけ"]
    },
    {
      id: "n1-ge",
      pattern: "～げ / ～気",
      level: "N1",
      category: "Adjektive",
      meaning: "den Anschein haben ..., aussehen als ob ..., -artig (Gefühl)",
      explanation: "Wird verwendet, um den äußeren Eindruck oder Anschein eines Zustandes oder Gefühls auszudrücken. Verwandelt Adjektive in Nomen, die das Erscheinungsbild beschreiben. Wird oft mit Verben der Wahrnehmung kombiniert.",
      formation: "イ形容詞語幹 + げ\nナ形容詞語幹 + げ\n名詞 + げ + な/に",
      examples: [
        {
          japanese: "彼は寂しげな表情をしていた。",
          romaji: "Kare wa sabishi ge na hyoujou wo shite ita.",
          german: "Er hatte einen einsamen Gesichtsausdruck."
        },
        {
          japanese: "彼女は嬉しげに話していた。",
          romaji: "Kanojo wa ureshi ge ni hanashite ita.",
          german: "Sie sprach mit freudigem Anschein."
        },
        {
          japanese: "意味ありげな視線を送った。",
          romaji: "Imi ari ge na shisen wo okutta.",
          german: "Er warf einen bedeutungsvollen Blick."
        }
      ],
      notes: "Wird verwendet, um den äußeren Anschein von Gefühlen oder Zuständen zu beschreiben. げな vor Nomen, げに als Adverb.",
      related: ["そう", "らしい", "めく"]
    },
    {
      id: "n1-kai-ga-aru",
      pattern: "～甲斐がある / ～甲斐がない",
      level: "N1",
      category: "Adjektive",
      meaning: "es lohnt sich zu ... / es lohnt sich nicht zu ..., der Mühe wert",
      explanation: "Drückt aus, ob sich eine Handlung oder Mühe gelohnt hat oder lohnt. 甲斐がある bedeutet, dass die Mühe Früchte trägt, während 甲斐がない bedeutet, dass die Mühe vergeblich war. Wird verwendet, um den Wert oder Nutzen einer Anstrengung zu bewerten.",
      formation: "動詞辞書形/た形 + 甲斐がある/ない\n名詞 + の甲斐がある/ない",
      examples: [
        {
          japanese: "一生懸命勉強した甲斐があって、合格できた。",
          romaji: "Isshoukenmei benkyou shita kai ga atte, goukaku dekita.",
          german: "Die harte Arbeit beim Lernen hat sich gelohnt, und ich konnte bestehen."
        },
        {
          japanese: "説得した甲斐がなかった。",
          romaji: "Settoku shita kai ga nakatta.",
          german: "Die Mühe, ihn zu überzeugen, war vergeblich."
        },
        {
          japanese: "生き甲斐を見つけることが大切だ。",
          romaji: "Iki gai wo mitsukeru koto ga taisetsu da.",
          german: "Es ist wichtig, einen Lebenssinn zu finden."
        }
      ],
      notes: "Oft verwendet, um rückblickend zu bewerten, ob eine Anstrengung erfolgreich war. 〜甲斐 kann auch eigenständig verwendet werden (生き甲斐, やり甲斐).",
      related: ["価値がある", "意味がある"]
    },
    {
      id: "n1-gimi",
      pattern: "～気味",
      level: "N1",
      category: "Adjektive",
      meaning: "leichte Tendenz zu ..., ein bisschen ..., etwas ...",
      explanation: "Drückt eine leichte Tendenz oder einen schwachen Zustand aus. Wird oft für Symptome von Krankheiten, negative Zustände oder Tendenzen verwendet. Zeigt an, dass etwas noch nicht vollständig entwickelt ist, aber eine Tendenz besteht.",
      formation: "名詞 + 気味\n動詞ます形 + 気味",
      examples: [
        {
          japanese: "最近、風邪気味だ。",
          romaji: "Saikin, kaze gimi da.",
          german: "In letzter Zeit fühle ich mich etwas erkältet."
        },
        {
          japanese: "彼は太り気味なので、ダイエットを始めた。",
          romaji: "Kare wa futori gimi nanode, daietto wo hajimeta.",
          german: "Da er etwas zu Übergewicht neigt, hat er mit einer Diät begonnen."
        },
        {
          japanese: "疲れ気味なので、早く寝ます。",
          romaji: "Tsukare gimi nanode, hayaku nemasu.",
          german: "Da ich etwas müde bin, werde ich früh schlafen gehen."
        }
      ],
      notes: "Wird oft für leichte negative Tendenzen oder Symptome verwendet. Drückt einen Zustand aus, der noch nicht vollständig ist.",
      related: ["がち", "ぎみ"]
    },
    {
      id: "n1-gotoki",
      pattern: "～ごとき / ～ごとく / ～如き / ～如く",
      level: "N1",
      category: "Adjektive",
      meaning: "wie ..., gleich ..., solch ... (literarisch)",
      explanation: "Literarischer Ausdruck für Vergleiche. ごとき wird vor Nomen verwendet, ごとく als Adverb. Sehr formell und wird hauptsächlich in geschriebener Sprache, Literatur oder formellen Reden verwendet. Kann auch abwertend verwendet werden.",
      formation: "名詞 + ごとき/ごとく\n動詞辞書形 + ごとき/ごとく\nイ形容詞 + ごとき/ごとく",
      examples: [
        {
          japanese: "嵐のごとく去って行った。",
          romaji: "Arashi no gotoku satte itta.",
          german: "Er ging wie ein Sturm davon."
        },
        {
          japanese: "私ごとき者が意見を言うのは恐れ多い。",
          romaji: "Watashi gotoki mono ga iken wo iu no wa osore ooi.",
          german: "Es ist anmaßend für jemanden wie mich, eine Meinung zu äußern."
        },
        {
          japanese: "火を見るごとく明らかだ。",
          romaji: "Hi wo miru gotoku akiraka da.",
          german: "Es ist so klar wie Feuer zu sehen (sonnenklar)."
        }
      ],
      notes: "Sehr literarisch und formell. In moderner Alltagssprache wird eher ような verwendet. Kann auch bescheiden oder abwertend sein.",
      related: ["ような", "かのような"]
    },
    {
      id: "n1-taru-adj",
      pattern: "～たる",
      level: "N1",
      category: "Adjektive",
      meaning: "als ... (Position/Würde habend), würdig ...",
      explanation: "Literarischer Ausdruck, der verwendet wird, um eine Position, Status oder Würde zu betonen. Drückt aus, dass jemand eine bestimmte Position innehat und entsprechend handeln sollte. Sehr formell und hauptsächlich in geschriebener Sprache verwendet.",
      formation: "名詞 + たる + 名詞\n名詞 + たるもの",
      examples: [
        {
          japanese: "教師たる者は、常に学び続けるべきだ。",
          romaji: "Kyoushi taru mono wa, tsuneni manabitsudzukeru beki da.",
          german: "Jemand, der Lehrer ist, sollte stets weiterlernen."
        },
        {
          japanese: "リーダーたる責任を果たす。",
          romaji: "Riidaa taru sekinin wo hatasu.",
          german: "Die Verantwortung als Führer erfüllen."
        },
        {
          japanese: "学生たるもの、勉強に励むのは当然だ。",
          romaji: "Gakusei taru mono, benkyou ni hagemeru no wa touzen da.",
          german: "Für jemanden, der Student ist, ist es selbstverständlich, fleißig zu lernen."
        }
      ],
      notes: "Sehr formell und literarisch. Wird verwendet, um Pflichten oder Erwartungen basierend auf der Position zu betonen.",
      related: ["である", "としての"]
    },
    {
      id: "n1-nagara-no",
      pattern: "～ながらの",
      level: "N1",
      category: "Adjektive",
      meaning: "im Zustand von ..., wie gewohnt, typisch für ..., trotz ...",
      explanation: "Drückt aus, dass etwas seinen ursprünglichen oder charakteristischen Zustand beibehält. Wird verwendet, um zu betonen, dass etwas in seinem natürlichen oder gewohnten Zustand ist. Kann auch einen Kontrast oder eine unerwartete Kombination ausdrücken.",
      formation: "名詞 + ながらの + 名詞\nイ形容詞 + ながらの + 名詞\n動詞辞書形 + ながらの + 名詞",
      examples: [
        {
          japanese: "ありのままの姿、生まれながらの才能。",
          romaji: "Ari no mama no sugata, umare nagara no sainou.",
          german: "Die Gestalt wie sie ist, angeborenes Talent."
        },
        {
          japanese: "昔ながらの製法で作られている。",
          romaji: "Mukashi nagara no seihou de tsukurarete iru.",
          german: "Es wird nach der traditionellen Herstellungsmethode gemacht."
        },
        {
          japanese: "彼女は学生ながらの新鮮な視点を持っている。",
          romaji: "Kanojo wa gakusei nagara no shinsen na shiten wo motte iru.",
          german: "Sie hat die frische Perspektive, die für einen Studenten typisch ist."
        }
      ],
      notes: "Wird verwendet, um den ursprünglichen oder charakteristischen Zustand zu betonen. Oft mit zeitlichen Bezügen wie 昔 (früher) verwendet.",
      related: ["のままの", "らしい"]
    }
  ];

  // Merge with existing grammar data
  if (window.GRAMMAR_DATA) {
    window.GRAMMAR_DATA = window.GRAMMAR_DATA.concat(n1Grammar);
  } else {
    window.GRAMMAR_DATA = n1Grammar;
  }
})();
