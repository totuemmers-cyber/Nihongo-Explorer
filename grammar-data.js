// Teaching data; editorial sources in scripts/.
window.GRAMMAR_DATA = [
  {
    "id": "wa",
    "pattern": "は",
    "level": "N5",
    "category": "Partikel",
    "meaning": "Themenmarkierer",
    "explanation": "は markiert das Thema eines Satzes – also das, worüber gesprochen wird. Es wird immer 'wa' ausgesprochen, obwohl es das Hiragana-Zeichen 'ha' ist. Das Thema muss nicht das grammatische Subjekt sein.",
    "formation": "Nomen + は",
    "examples": [
      {
        "japanese": "私は学生です。",
        "cloze": {
          "start": 1,
          "answer": "は",
          "quiz": {
            "level": "N5",
            "japanese": "私は学生です。",
            "german": "Ich bin Student.",
            "start": 1,
            "answer": "は",
            "acceptedAnswers": [
              "は",
              "が"
            ],
            "distractors": [
              {
                "text": "を",
                "reason": "を markiert ein Objekt; die Kopula hat hier keines."
              },
              {
                "text": "で",
                "reason": "で verbindet hier keinen nominalen Aussagesatz."
              },
              {
                "text": "へ",
                "reason": "へ bezeichnet eine Richtung, keine Identität."
              }
            ],
            "promptKana": "わたし＿＿＿がくせいです。"
          }
        },
        "romaji": "Watashi wa gakusei desu.",
        "german": "Ich bin Student."
      },
      {
        "japanese": "東京は大きいです。",
        "cloze": {
          "start": 2,
          "answer": "は"
        },
        "romaji": "Tōkyō wa ōkii desu.",
        "german": "Tokio ist groß."
      }
    ],
    "notes": "Nicht verwechseln mit が (ga). は betont das Thema, が betont das Subjekt. Bei neuen Informationen verwendet man が, bei bekannten Themen は.",
    "related": [
      "ga"
    ]
  },
  {
    "id": "ga",
    "pattern": "が",
    "level": "N5",
    "category": "Partikel",
    "meaning": "Subjektmarkierer",
    "explanation": "が markiert das grammatische Subjekt eines Satzes und betont, wer oder was die Handlung ausführt. Es wird oft verwendet, um neue Informationen einzuführen oder um das Subjekt besonders hervorzuheben.",
    "formation": "Nomen + が",
    "examples": [
      {
        "japanese": "猫がいます。",
        "cloze": {
          "start": 1,
          "answer": "が",
          "quiz": {
            "level": "N5",
            "japanese": "猫がいます。",
            "german": "Es gibt eine Katze. / Eine Katze ist da.",
            "start": 1,
            "answer": "が",
            "acceptedAnswers": [
              "が",
              "は",
              "も"
            ],
            "distractors": [
              {
                "text": "を",
                "reason": "います nimmt hier kein direktes Objekt."
              },
              {
                "text": "へ",
                "reason": "へ markiert ein Bewegungsziel, keine existierende Katze."
              },
              {
                "text": "の",
                "reason": "の würde ein Bezugsnomen benötigen."
              }
            ],
            "promptKana": "ねこ＿＿＿います。"
          }
        },
        "romaji": "Neko ga imasu.",
        "german": "Es gibt eine Katze. / Eine Katze ist da."
      },
      {
        "japanese": "誰が来ましたか。",
        "cloze": {
          "start": 1,
          "answer": "が"
        },
        "romaji": "Dare ga kimashita ka.",
        "german": "Wer ist gekommen?"
      }
    ],
    "notes": "が wird nach Fragewörtern (誰が、何が) und vor bestimmten Prädikaten wie 好き、欲しい、分かる、ある、いる verwendet.",
    "related": [
      "wa",
      "ga-aru",
      "ga-iru"
    ]
  },
  {
    "id": "wo",
    "pattern": "を",
    "level": "N5",
    "category": "Partikel",
    "meaning": "Objektmarkierer",
    "explanation": "を markiert das direkte Objekt eines Satzes – also das, worauf die Handlung einwirkt. Es wird 'o' ausgesprochen. Es wird auch verwendet, um einen Ort zu markieren, durch den man sich bewegt.",
    "formation": "Nomen + を + Verb",
    "examples": [
      {
        "japanese": "パンを食べます。",
        "cloze": {
          "start": 2,
          "answer": "を",
          "quiz": {
            "level": "N5",
            "japanese": "パンを食べます。",
            "german": "Ich esse Brot.",
            "start": 2,
            "answer": "を",
            "acceptedAnswers": [
              "を",
              "は",
              "も"
            ],
            "distractors": [
              {
                "text": "に",
                "reason": "に markiert nicht das gegessene Objekt."
              },
              {
                "text": "へ",
                "reason": "Brot ist hier kein Bewegungsziel."
              },
              {
                "text": "が",
                "reason": "Bei aktivem 食べます ist Brot das Objekt, nicht der Essende."
              }
            ],
            "promptKana": "パン＿＿＿たべます。"
          }
        },
        "romaji": "Pan o tabemasu.",
        "german": "Ich esse Brot."
      },
      {
        "japanese": "公園を歩きます。",
        "cloze": {
          "start": 2,
          "answer": "を"
        },
        "romaji": "Kōen o arukimasu.",
        "german": "Ich gehe durch den Park."
      }
    ],
    "notes": "を wird nur mit transitiven Verben (Verben, die ein Objekt haben) verwendet. Bei Bewegungsverben wie 歩く、走る markiert を den Ort, den man durchquert.",
    "related": [
      "wa",
      "ga"
    ]
  },
  {
    "id": "ni",
    "pattern": "に",
    "level": "N5",
    "category": "Partikel",
    "meaning": "Richtung / Zeitpunkt / Ort des Seins",
    "explanation": "に hat viele Funktionen: Es markiert das Ziel einer Bewegung, einen Zeitpunkt, den Ort, an dem etwas existiert, und den indirekten Empfänger. Es ist eine der vielseitigsten Partikeln im Japanischen.",
    "formation": "Nomen + に",
    "examples": [
      {
        "japanese": "学校に行きます。",
        "cloze": {
          "start": 2,
          "answer": "に",
          "quiz": {
            "level": "N5",
            "japanese": "学校に行きます。",
            "german": "Ich gehe zur Schule.",
            "start": 2,
            "answer": "に",
            "acceptedAnswers": [
              "に",
              "へ"
            ],
            "distractors": [
              {
                "text": "を",
                "reason": "Die Schule ist ein Ziel, keine durchquerte Strecke."
              },
              {
                "text": "の",
                "reason": "の kann das Ziel nicht mit 行きます verbinden."
              },
              {
                "text": "が",
                "reason": "Die Schule ist nicht das Subjekt der Bewegung."
              }
            ],
            "promptKana": "がっこう＿＿＿いきます。"
          }
        },
        "romaji": "Gakkō ni ikimasu.",
        "german": "Ich gehe zur Schule."
      },
      {
        "japanese": "七時に起きます。",
        "cloze": {
          "start": 2,
          "answer": "に"
        },
        "romaji": "Shichi-ji ni okimasu.",
        "german": "Ich stehe um sieben Uhr auf."
      }
    ],
    "notes": "Bei Wochentagen und konkreten Uhrzeiten verwendet man に, aber bei relativen Zeitangaben wie 今日、明日、来週 wird に nicht verwendet.",
    "related": [
      "de",
      "e"
    ]
  },
  {
    "id": "de",
    "pattern": "で",
    "level": "N5",
    "category": "Partikel",
    "meaning": "Ort der Handlung / Mittel",
    "explanation": "で markiert den Ort, an dem eine Handlung stattfindet, oder das Mittel, mit dem etwas getan wird. Es kann auch eine Ursache oder ein Material angeben.",
    "formation": "Nomen + で",
    "examples": [
      {
        "japanese": "図書館で勉強します。",
        "cloze": {
          "start": 3,
          "answer": "で",
          "quiz": {
            "level": "N5",
            "japanese": "図書館で勉強します。",
            "german": "Ich lerne in der Bibliothek.",
            "start": 3,
            "answer": "で",
            "acceptedAnswers": [
              "で"
            ],
            "distractors": [
              {
                "text": "に",
                "reason": "Der Handlungsort von 勉強します wird mit で markiert."
              },
              {
                "text": "へ",
                "reason": "へ würde eine Bewegung verlangen."
              },
              {
                "text": "を",
                "reason": "Die Bibliothek ist nicht das gelernte Objekt."
              }
            ],
            "promptKana": "としょかん＿＿＿べんきょうします。"
          }
        },
        "romaji": "Toshokan de benkyō shimasu.",
        "german": "Ich lerne in der Bibliothek."
      },
      {
        "japanese": "バスで行きます。",
        "cloze": {
          "start": 2,
          "answer": "で"
        },
        "romaji": "Basu de ikimasu.",
        "german": "Ich fahre mit dem Bus."
      }
    ],
    "notes": "Unterschied zu に: で markiert den Ort einer Aktivität (図書館で勉強する), während に den Ort der Existenz markiert (図書館にいる).",
    "related": [
      "ni"
    ]
  },
  {
    "id": "e",
    "pattern": "へ",
    "level": "N5",
    "category": "Partikel",
    "meaning": "Richtung (in Richtung von)",
    "explanation": "へ markiert die Richtung einer Bewegung. Es wird 'e' ausgesprochen, nicht 'he'. Es ist austauschbar mit に bei Bewegungsverben, betont aber stärker die Richtung als das Ziel.",
    "formation": "Nomen + へ",
    "examples": [
      {
        "japanese": "日本へ行きます。",
        "cloze": {
          "start": 2,
          "answer": "へ",
          "quiz": {
            "level": "N5",
            "japanese": "日本へ行きます。",
            "german": "Ich fahre nach Japan.",
            "start": 2,
            "answer": "へ",
            "acceptedAnswers": [
              "へ",
              "に"
            ],
            "distractors": [
              {
                "text": "が",
                "reason": "Japan ist hier das Ziel, nicht der Reisende."
              },
              {
                "text": "の",
                "reason": "の verbindet hier kein Nomen mit 行きます."
              },
              {
                "text": "を",
                "reason": "Japan ist hier Reiseziel, nicht durchquerte Strecke."
              }
            ],
            "promptKana": "にほん＿＿＿いきます。"
          }
        },
        "romaji": "Nihon e ikimasu.",
        "german": "Ich fahre nach Japan."
      },
      {
        "japanese": "南へ歩きましょう。",
        "cloze": {
          "start": 1,
          "answer": "へ"
        },
        "romaji": "Minami e arukimashō.",
        "german": "Lasst uns nach Süden gehen."
      }
    ],
    "notes": "へ betont die Richtung der Bewegung, während に das Ziel betont. In der Alltagssprache wird oft に bevorzugt.",
    "related": [
      "ni"
    ]
  },
  {
    "id": "kara",
    "pattern": "から",
    "level": "N5",
    "category": "Partikel",
    "meaning": "Von / Ab (Ausgangspunkt)",
    "explanation": "から markiert den zeitlichen oder örtlichen Ausgangspunkt einer Handlung. Es bedeutet 'von' oder 'ab'. Es kann auch 'weil' bedeuten, wenn es am Satzende nach einem Verb steht.",
    "formation": "Nomen + から",
    "examples": [
      {
        "japanese": "九時から始まります。",
        "cloze": {
          "start": 2,
          "answer": "から",
          "quiz": {
            "level": "N5",
            "japanese": "九時から始まります。",
            "german": "Es beginnt ab neun Uhr.",
            "start": 2,
            "answer": "から",
            "acceptedAnswers": [
              "から",
              "に"
            ],
            "distractors": [
              {
                "text": "まで",
                "reason": "まで nennt eine Endgrenze, nicht den Beginn ab neun."
              },
              {
                "text": "へ",
                "reason": "へ bezeichnet eine Richtung, keinen Anfangszeitpunkt."
              },
              {
                "text": "を",
                "reason": "始まります hat hier kein direktes Objekt."
              }
            ],
            "promptKana": "くじ＿＿＿はじまります。"
          }
        },
        "romaji": "Ku-ji kara hajimarimasu.",
        "german": "Es beginnt ab neun Uhr."
      },
      {
        "japanese": "東京から来ました。",
        "cloze": {
          "start": 2,
          "answer": "から"
        },
        "romaji": "Tōkyō kara kimashita.",
        "german": "Ich komme aus Tokio."
      }
    ],
    "notes": "Als Partikel bedeutet から 'von/ab', als Konjunktion nach einem Verb bedeutet es 'weil'. Siehe auch die Konjunktion から unter Satzstrukturen.",
    "related": [
      "made",
      "kara-because"
    ]
  },
  {
    "id": "made",
    "pattern": "まで",
    "level": "N5",
    "category": "Partikel",
    "meaning": "Bis (Endpunkt)",
    "explanation": "まで markiert den zeitlichen oder örtlichen Endpunkt. Es wird oft zusammen mit から verwendet, um einen Zeitraum oder eine Strecke anzugeben.",
    "formation": "Nomen + まで",
    "examples": [
      {
        "japanese": "五時まで働きます。",
        "cloze": {
          "start": 2,
          "answer": "まで",
          "quiz": {
            "level": "N5",
            "japanese": "五時まで働きます。",
            "german": "Ich arbeite bis fünf Uhr.",
            "start": 2,
            "answer": "まで",
            "acceptedAnswers": [
              "まで"
            ],
            "distractors": [
              {
                "text": "から",
                "reason": "から bedeutet ab fünf statt bis fünf."
              },
              {
                "text": "へ",
                "reason": "へ markiert keine zeitliche Endgrenze."
              },
              {
                "text": "を",
                "reason": "を markiert hier weder Arbeitsdauer noch Endzeit."
              }
            ],
            "promptKana": "ごじ＿＿＿はたらきます。"
          }
        },
        "romaji": "Go-ji made hatarakimasu.",
        "german": "Ich arbeite bis fünf Uhr."
      },
      {
        "japanese": "駅から学校まで歩きます。",
        "cloze": {
          "start": 5,
          "answer": "まで"
        },
        "romaji": "Eki kara gakkō made arukimasu.",
        "german": "Ich gehe vom Bahnhof bis zur Schule zu Fuß."
      }
    ],
    "notes": "から～まで ist ein häufiges Paar: 月曜日から金曜日まで (von Montag bis Freitag).",
    "related": [
      "kara"
    ]
  },
  {
    "id": "to",
    "pattern": "と",
    "level": "N5",
    "category": "Partikel",
    "meaning": "Und / Mit (zusammen mit)",
    "explanation": "と hat zwei Hauptbedeutungen: Es verbindet Nomen aufzählend ('und') oder markiert eine Begleitung ('mit'). Bei der Aufzählung werden alle Elemente genannt (vollständige Liste).",
    "formation": "Nomen + と + Nomen / Nomen + と + Verb",
    "examples": [
      {
        "japanese": "パンと牛乳を買いました。",
        "cloze": {
          "start": 2,
          "answer": "と",
          "quiz": {
            "level": "N5",
            "japanese": "パンと牛乳を買いました。",
            "german": "Ich habe Brot und Milch gekauft.",
            "start": 2,
            "answer": "と",
            "acceptedAnswers": [
              "と",
              "や"
            ],
            "distractors": [
              {
                "text": "へ",
                "reason": "へ koordiniert keine gekauften Gegenstände."
              },
              {
                "text": "で",
                "reason": "で würde Brot als Mittel statt als weiteren Kaufgegenstand markieren."
              },
              {
                "text": "が",
                "reason": "が macht Brot zum Subjekt statt zum zweiten Kaufgegenstand."
              }
            ],
            "promptKana": "パン＿＿＿ぎゅうにゅうをかいました。"
          }
        },
        "romaji": "Pan to gyūnyū o kaimashita.",
        "german": "Ich habe Brot und Milch gekauft."
      },
      {
        "japanese": "友達と映画を見ました。",
        "cloze": {
          "start": 2,
          "answer": "と"
        },
        "romaji": "Tomodachi to eiga o mimashita.",
        "german": "Ich habe mit einem Freund einen Film gesehen."
      }
    ],
    "notes": "と listet alle Elemente vollständig auf. Für eine unvollständige Aufzählung ('und so weiter') verwendet man や.",
    "related": [
      "ya"
    ]
  },
  {
    "id": "no",
    "pattern": "の",
    "level": "N5",
    "category": "Partikel",
    "meaning": "Besitzanzeiger / Verbindung",
    "explanation": "の verbindet zwei Nomen und zeigt Zugehörigkeit, Besitz oder eine nähere Bestimmung an. Es entspricht oft dem deutschen Genitiv oder 'von'. の kann auch ein Nomen ersetzen, wenn es aus dem Kontext klar ist.",
    "formation": "Nomen + の + Nomen",
    "examples": [
      {
        "japanese": "私の本です。",
        "cloze": {
          "start": 1,
          "answer": "の",
          "quiz": {
            "level": "N5",
            "japanese": "私の本です。",
            "german": "Das ist mein Buch.",
            "start": 1,
            "answer": "の",
            "acceptedAnswers": [
              "の"
            ],
            "distractors": [
              {
                "text": "を",
                "reason": "を stellt keine Besitzbeziehung zum folgenden Nomen her."
              },
              {
                "text": "へ",
                "reason": "Eine Richtungsangabe ist keine Besitzangabe."
              },
              {
                "text": "に",
                "reason": "に kann hier nicht unmittelbar 本 als Besitz bestimmen."
              }
            ],
            "promptKana": "わたし＿＿＿ほんです。"
          }
        },
        "romaji": "Watashi no hon desu.",
        "german": "Das ist mein Buch."
      },
      {
        "japanese": "日本語の先生です。",
        "cloze": {
          "start": 3,
          "answer": "の"
        },
        "romaji": "Nihongo no sensei desu.",
        "german": "Er/Sie ist Japanischlehrer(in)."
      }
    ],
    "notes": "の kann auch als Nominalisierer verwendet werden: 食べるのが好きです (Ich mag es zu essen).",
    "related": [
      "no-wa-desu"
    ]
  },
  {
    "id": "mo",
    "pattern": "も",
    "level": "N5",
    "category": "Partikel",
    "meaning": "Auch / Ebenfalls",
    "explanation": "も ersetzt は, が oder を und bedeutet 'auch' oder 'ebenfalls'. Es zeigt an, dass das Gesagte auch für das markierte Element gilt. Bei Mengen kann es 'sogar' bedeuten.",
    "formation": "Nomen + も",
    "examples": [
      {
        "japanese": "私も学生です。",
        "cloze": {
          "start": 1,
          "answer": "も",
          "quiz": {
            "level": "N5",
            "japanese": "私も学生です。",
            "german": "Ich bin auch Student.",
            "start": 1,
            "answer": "も",
            "acceptedAnswers": [
              "も"
            ],
            "distractors": [
              {
                "text": "を",
                "reason": "Die Kopula verlangt hier kein Objekt."
              },
              {
                "text": "へ",
                "reason": "Eine Richtung drückt nicht auch aus."
              },
              {
                "text": "の",
                "reason": "私の学生 würde meinen Studenten statt mich bezeichnen."
              }
            ],
            "promptKana": "わたし＿＿＿がくせいです。"
          }
        },
        "romaji": "Watashi mo gakusei desu.",
        "german": "Ich bin auch Student."
      },
      {
        "japanese": "猫も犬も好きです。",
        "romaji": "Neko mo inu mo suki desu.",
        "german": "Ich mag sowohl Katzen als auch Hunde."
      }
    ],
    "notes": "も ersetzt は, が und を, wird aber zu anderen Partikeln hinzugefügt: にも、でも、からも usw.",
    "related": [
      "wa",
      "ga"
    ]
  },
  {
    "id": "ne",
    "pattern": "ね",
    "level": "N5",
    "category": "Partikel",
    "meaning": "Nicht wahr? / Bestätigungspartikel",
    "explanation": "ね wird am Satzende verwendet, um Zustimmung zu suchen oder eine gemeinsame Meinung auszudrücken. Es entspricht dem deutschen 'nicht wahr?' oder 'oder?'.",
    "formation": "Satz + ね",
    "examples": [
      {
        "japanese": "いい天気ですね。",
        "cloze": {
          "start": 6,
          "answer": "ね",
          "quiz": {
            "level": "N5",
            "japanese": "いい天気ですね。",
            "german": "Schönes Wetter, nicht wahr?",
            "start": 6,
            "answer": "ね",
            "acceptedAnswers": [
              "ね",
              "の"
            ],
            "distractors": [
              {
                "text": "を",
                "reason": "を kann die Kopula nicht als Satzpartikel abschließen."
              },
              {
                "text": "に",
                "reason": "に ist hier keine zustimmungssuchende Satzpartikel."
              },
              {
                "text": "ます",
                "reason": "ですます verdoppelt unzulässig die höfliche Endung."
              }
            ],
            "promptKana": "いいてんきです＿＿＿。"
          }
        },
        "romaji": "Ii tenki desu ne.",
        "german": "Schönes Wetter, nicht wahr?"
      },
      {
        "japanese": "この映画はおもしろいですね。",
        "cloze": {
          "start": 12,
          "answer": "ね"
        },
        "romaji": "Kono eiga wa omoshiroi desu ne.",
        "german": "Dieser Film ist interessant, oder?"
      }
    ],
    "notes": "ね wird häufig in Gesprächen verwendet, um eine freundliche Atmosphäre zu schaffen und Einverständnis zu signalisieren.",
    "related": [
      "yo"
    ]
  },
  {
    "id": "yo",
    "pattern": "よ",
    "level": "N5",
    "category": "Partikel",
    "meaning": "Betonungspartikel (Ich sage dir!)",
    "explanation": "よ wird am Satzende verwendet, um neue Informationen mitzuteilen oder eine Aussage zu betonen. Es signalisiert dem Gesprächspartner, dass man etwas Neues oder Wichtiges sagt.",
    "formation": "Satz + よ",
    "examples": [
      {
        "japanese": "これはおいしいですよ。",
        "cloze": {
          "start": 9,
          "answer": "よ",
          "quiz": {
            "level": "N5",
            "japanese": "これはおいしいですよ。",
            "german": "Das ist lecker, sage ich dir!",
            "start": 9,
            "answer": "よ",
            "acceptedAnswers": [
              "よ"
            ],
            "distractors": [
              {
                "text": "を",
                "reason": "を ist nach です keine passende Satzpartikel."
              },
              {
                "text": "に",
                "reason": "に schließt diesen Kopulasatz nicht ab."
              },
              {
                "text": "へ",
                "reason": "へ ist eine Richtungspartikel, keine Bekräftigung."
              }
            ],
            "promptKana": "これはおいしいです＿＿＿。"
          }
        },
        "romaji": "Kore wa oishii desu yo.",
        "german": "Das ist lecker, sage ich dir!"
      },
      {
        "japanese": "もう遅いですよ。",
        "cloze": {
          "start": 6,
          "answer": "よ"
        },
        "romaji": "Mō osoi desu yo.",
        "german": "Es ist schon spät!"
      }
    ],
    "notes": "よ klingt bestimmter als ね. Zu häufiger Gebrauch kann aufdringlich wirken. よね kombiniert beide Partikeln (Betonung + Bestätigung).",
    "related": [
      "ne"
    ]
  },
  {
    "id": "ka",
    "pattern": "か",
    "level": "N5",
    "category": "Partikel",
    "meaning": "Fragepartikel",
    "explanation": "か wird am Satzende angehängt, um eine Frage zu bilden. Im höflichen Japanisch ersetzt か das Fragezeichen. Die Satzstellung ändert sich dabei nicht.",
    "formation": "Satz + か",
    "examples": [
      {
        "japanese": "学生ですか。",
        "cloze": {
          "start": 4,
          "answer": "か",
          "quiz": {
            "level": "N5",
            "japanese": "学生ですか。",
            "german": "Sind Sie Student?",
            "start": 4,
            "answer": "か",
            "acceptedAnswers": [
              "か"
            ],
            "distractors": [
              {
                "text": "を",
                "reason": "を bildet nach です keine Frage."
              },
              {
                "text": "に",
                "reason": "に bildet nach です keine Frage."
              },
              {
                "text": "へ",
                "reason": "へ bildet nach です keine Frage."
              }
            ],
            "promptKana": "がくせいです＿＿＿。"
          }
        },
        "romaji": "Gakusei desu ka.",
        "german": "Sind Sie Student?"
      },
      {
        "japanese": "何を食べますか。",
        "cloze": {
          "start": 6,
          "answer": "か"
        },
        "romaji": "Nani o tabemasu ka.",
        "german": "Was essen Sie?"
      }
    ],
    "notes": "In der höflichen Sprache wird か ohne Fragezeichen verwendet. Im informellen Japanisch kann か weggelassen werden – die Frage wird dann durch steigende Intonation gebildet.",
    "related": []
  },
  {
    "id": "ya",
    "pattern": "や",
    "level": "N5",
    "category": "Partikel",
    "meaning": "Und (unvollständige Aufzählung)",
    "explanation": "や verbindet Nomen in einer unvollständigen Aufzählung. Es bedeutet 'und (unter anderem)' und zeigt an, dass es noch weitere Elemente gibt, die nicht genannt werden.",
    "formation": "Nomen + や + Nomen (+ など)",
    "examples": [
      {
        "japanese": "りんごやみかんを買いました。",
        "cloze": {
          "start": 3,
          "answer": "や",
          "quiz": {
            "level": "N5",
            "japanese": "りんごやみかんを買いました。",
            "german": "Ich habe Äpfel und Mandarinen (und anderes) gekauft.",
            "start": 3,
            "answer": "や",
            "acceptedAnswers": [
              "や",
              "とか",
              "と",
              "に"
            ],
            "distractors": [
              {
                "text": "へ",
                "reason": "へ zählt keine Kaufgegenstände auf."
              },
              {
                "text": "が",
                "reason": "が würde Äpfel zum Subjekt machen."
              },
              {
                "text": "の",
                "reason": "Dies macht Äpfel zum Attribut der Mandarinen statt beide aufzuzählen."
              }
            ],
            "promptKana": "りんご＿＿＿みかんをかいました。"
          }
        },
        "romaji": "Ringo ya mikan o kaimashita.",
        "german": "Ich habe Äpfel und Mandarinen (und anderes) gekauft."
      },
      {
        "japanese": "本やノートなどがあります。",
        "cloze": {
          "start": 1,
          "answer": "や"
        },
        "romaji": "Hon ya nōto nado ga arimasu.",
        "german": "Es gibt Bücher, Hefte und so weiter."
      }
    ],
    "notes": "や wird oft mit など (und so weiter) kombiniert. Im Gegensatz zu と (vollständige Aufzählung) deutet や an, dass die Liste nicht abgeschlossen ist.",
    "related": [
      "to"
    ]
  },
  {
    "id": "masu",
    "pattern": "～ます",
    "level": "N5",
    "category": "Verben",
    "meaning": "Höfliche Gegenwartsform (positiv)",
    "explanation": "～ます ist die höfliche Gegenwartsform eines Verbs. Sie drückt Handlungen in der Gegenwart oder Zukunft aus. Diese Form wird in formellen Situationen und mit Fremden verwendet.",
    "formation": "Verb-Stamm + ます",
    "examples": [
      {
        "japanese": "毎日日本語を勉強します。",
        "cloze": {
          "start": 9,
          "answer": "ます",
          "quiz": {
            "level": "N5",
            "japanese": "毎日日本語を勉強します。",
            "german": "Ich lerne jeden Tag Japanisch.",
            "start": 9,
            "answer": "ます",
            "acceptedAnswers": [
              "ます"
            ],
            "distractors": [
              {
                "text": "ません",
                "reason": "Die Übersetzung ist positiv, nicht ich lerne nicht."
              },
              {
                "text": "ました",
                "reason": "Die Übersetzung beschreibt eine gegenwärtige Gewohnheit, keine abgeschlossene Vergangenheit."
              },
              {
                "text": "ませんでした",
                "reason": "Dies wäre eine negative Vergangenheit."
              }
            ],
            "promptKana": "まいにちにほんごをべんきょうし＿＿＿。"
          }
        },
        "romaji": "Mainichi nihongo o benkyō shimasu.",
        "german": "Ich lerne jeden Tag Japanisch."
      },
      {
        "japanese": "明日友達に会います。",
        "cloze": {
          "start": 7,
          "answer": "ます"
        },
        "romaji": "Ashita tomodachi ni aimasu.",
        "german": "Morgen treffe ich einen Freund."
      }
    ],
    "notes": "Die ます-Form wird aus dem Verb-Stamm (masu-Stamm) gebildet. Bei Gruppe-1-Verben ändert sich die letzte Silbe: 書く → 書きます, 飲む → 飲みます.",
    "related": [
      "masen",
      "mashita",
      "masen-deshita"
    ]
  },
  {
    "id": "masen",
    "pattern": "～ません",
    "level": "N5",
    "category": "Verben",
    "meaning": "Höfliche Gegenwartsform (negativ)",
    "explanation": "～ません ist die höfliche Verneinung eines Verbs in der Gegenwart. Sie drückt aus, dass man etwas nicht tut oder nicht tun wird.",
    "formation": "Verb-Stamm + ません",
    "examples": [
      {
        "japanese": "肉を食べません。",
        "cloze": {
          "start": 4,
          "answer": "ません",
          "quiz": {
            "level": "N5",
            "japanese": "肉を食べません。",
            "german": "Ich esse kein Fleisch.",
            "start": 4,
            "answer": "ません",
            "acceptedAnswers": [
              "ません"
            ],
            "distractors": [
              {
                "text": "ます",
                "reason": "Dies wäre eine positive Aussage: ich esse Fleisch."
              },
              {
                "text": "ました",
                "reason": "Dies wäre positive Vergangenheit."
              },
              {
                "text": "ましょう",
                "reason": "Dies wäre ein Vorschlag, keine Verneinung."
              }
            ],
            "promptKana": "にくをたべ＿＿＿。"
          }
        },
        "romaji": "Niku o tabemasen.",
        "german": "Ich esse kein Fleisch."
      },
      {
        "japanese": "今日は学校に行きません。",
        "cloze": {
          "start": 8,
          "answer": "ません"
        },
        "romaji": "Kyō wa gakkō ni ikimasen.",
        "german": "Heute gehe ich nicht zur Schule."
      }
    ],
    "notes": "ません kann auch als höfliche Einladung verwendet werden: 一緒に行きませんか (Wollen wir nicht zusammen gehen?).",
    "related": [
      "masu",
      "mashita",
      "masen-deshita"
    ]
  },
  {
    "id": "mashita",
    "pattern": "～ました",
    "level": "N5",
    "category": "Verben",
    "meaning": "Höfliche Vergangenheitsform (positiv)",
    "explanation": "～ました ist die höfliche Vergangenheitsform eines Verbs. Sie drückt aus, dass eine Handlung in der Vergangenheit abgeschlossen wurde.",
    "formation": "Verb-Stamm + ました",
    "examples": [
      {
        "japanese": "昨日映画を見ました。",
        "cloze": {
          "start": 6,
          "answer": "ました",
          "quiz": {
            "level": "N5",
            "japanese": "昨日映画を見ました。",
            "german": "Gestern habe ich einen Film gesehen.",
            "start": 6,
            "answer": "ました",
            "acceptedAnswers": [
              "ました"
            ],
            "distractors": [
              {
                "text": "ます",
                "reason": "昨日 verlangt für die abgeschlossene Handlung Vergangenheit."
              },
              {
                "text": "ません",
                "reason": "Dies wäre Gegenwart und negativ."
              },
              {
                "text": "ませんでした",
                "reason": "Die Übersetzung bejaht den Kinobesuch."
              }
            ],
            "promptKana": "きのうえいがをみ＿＿＿。"
          }
        },
        "romaji": "Kinō eiga o mimashita.",
        "german": "Gestern habe ich einen Film gesehen."
      },
      {
        "japanese": "日本に行きました。",
        "cloze": {
          "start": 5,
          "answer": "ました"
        },
        "romaji": "Nihon ni ikimashita.",
        "german": "Ich bin nach Japan gegangen."
      }
    ],
    "notes": "Die Bildung ist einfach: Man ersetzt ます durch ました. Der Verb-Stamm bleibt gleich.",
    "related": [
      "masu",
      "masen",
      "masen-deshita"
    ]
  },
  {
    "id": "masen-deshita",
    "pattern": "～ませんでした",
    "level": "N5",
    "category": "Verben",
    "meaning": "Höfliche Vergangenheitsform (negativ)",
    "explanation": "～ませんでした ist die höfliche Verneinung in der Vergangenheit. Sie drückt aus, dass man etwas nicht getan hat.",
    "formation": "Verb-Stamm + ませんでした",
    "examples": [
      {
        "japanese": "朝ごはんを食べませんでした。",
        "cloze": {
          "start": 7,
          "answer": "ませんでした",
          "quiz": {
            "level": "N5",
            "japanese": "朝ごはんを食べませんでした。",
            "german": "Ich habe kein Frühstück gegessen.",
            "start": 7,
            "answer": "ませんでした",
            "acceptedAnswers": [
              "ませんでした"
            ],
            "distractors": [
              {
                "text": "ました",
                "reason": "Dies bejaht das Frühstück."
              },
              {
                "text": "ます",
                "reason": "Dies ist positive Gegenwart."
              },
              {
                "text": "ましょう",
                "reason": "Dies schlägt gemeinsames Frühstücken vor."
              }
            ],
            "promptKana": "あさごはんをたべ＿＿＿。"
          }
        },
        "romaji": "Asagohan o tabemasen deshita.",
        "german": "Ich habe kein Frühstück gegessen."
      },
      {
        "japanese": "昨日勉強しませんでした。",
        "cloze": {
          "start": 5,
          "answer": "ませんでした"
        },
        "romaji": "Kinō benkyō shimasen deshita.",
        "german": "Gestern habe ich nicht gelernt."
      }
    ],
    "notes": "Diese Form wird regelmäßig gebildet. Man ersetzt ます durch ませんでした.",
    "related": [
      "masu",
      "masen",
      "mashita"
    ]
  },
  {
    "id": "te-form",
    "pattern": "～て / ～で",
    "level": "N5",
    "category": "Verben",
    "meaning": "て-Form (Verbindungsform)",
    "explanation": "Die て-Form ist eine der wichtigsten Verbformen im Japanischen. Sie wird als Basis für viele grammatische Konstruktionen verwendet, wie ～ている, ～てください und ～てもいい. Die Bildung hängt von der Verbgruppe ab.",
    "formation": "Gruppe 1: う・つ・る → って, む・ぶ・ぬ → んで, く → いて, ぐ → いで, す → して / Gruppe 2: る → て / Gruppe 3: する → して, くる → きて",
    "examples": [
      {
        "japanese": "本を読んでいます。",
        "cloze": {
          "start": 4,
          "answer": "で",
          "quiz": {
            "level": "N5",
            "japanese": "本を読んでいます。",
            "german": "Ich lese gerade ein Buch.",
            "start": 4,
            "answer": "で",
            "acceptedAnswers": [
              "で"
            ],
            "distractors": [
              {
                "text": "て",
                "reason": "読む bildet die stimmhafte Verbindung 読んで."
              },
              {
                "text": "た",
                "reason": "読んた ist keine Form von 読む."
              },
              {
                "text": "だ",
                "reason": "読んだ kann nicht unmittelbar vor います stehen."
              }
            ],
            "promptKana": "ほんをよん＿＿＿います。"
          }
        },
        "romaji": "Hon o yonde imasu.",
        "german": "Ich lese gerade ein Buch."
      },
      {
        "japanese": "食べて寝ました。",
        "cloze": {
          "start": 2,
          "answer": "て"
        },
        "romaji": "Tabete nemashita.",
        "german": "Ich habe gegessen und bin schlafen gegangen."
      }
    ],
    "notes": "Die て-Form allein ist kein vollständiger Satz. Eine Ausnahme: 行って (als Kurzform für 行ってください = Geh!). Die Bildung der て-Form muss auswendig gelernt werden.",
    "related": [
      "te-iru",
      "te-kudasai",
      "temo-ii",
      "te-connective"
    ]
  },
  {
    "id": "te-iru",
    "pattern": "～ている",
    "level": "N5",
    "category": "Verben",
    "meaning": "Verlaufsform / Zustand",
    "explanation": "～ている drückt eine andauernde Handlung (Verlaufsform) oder einen resultierenden Zustand aus. Die höfliche Form ist ～ています. Bei manchen Verben beschreibt es einen Zustand statt einer Aktivität.",
    "formation": "Verb て-Form + いる / います",
    "examples": [
      {
        "japanese": "今、本を読んでいます。",
        "romaji": "Ima, hon o yonde imasu.",
        "german": "Ich lese gerade ein Buch.",
        "cloze": {
          "start": 4,
          "answer": "読んでいます",
          "quiz": {
            "level": "N5",
            "japanese": "今、本を読んでいます。",
            "german": "Ich lese gerade ein Buch.",
            "start": 4,
            "answer": "読んでいます",
            "acceptedAnswers": [
              "読んでいます"
            ],
            "distractors": [
              {
                "text": "読みます",
                "reason": "Die Übersetzung betont die gerade laufende Handlung."
              },
              {
                "text": "読みません",
                "reason": "Dies verneint das Lesen."
              },
              {
                "text": "読みました",
                "reason": "Dies bezeichnet abgeschlossenes Lesen statt gerade laufendes Lesen."
              }
            ],
            "promptKana": "いま、ほんを＿＿＿。"
          }
        }
      },
      {
        "japanese": "東京に住んでいます。",
        "romaji": "Tōkyō ni sunde imasu.",
        "german": "Ich wohne in Tokio."
      }
    ],
    "notes": "Bei Zustandsverben wie 知る, 結婚する, 持つ beschreibt ている den resultierenden Zustand: 知っています (Ich weiß es), nicht eine andauernde Handlung.",
    "related": [
      "te-form"
    ]
  },
  {
    "id": "te-kudasai",
    "pattern": "～てください",
    "level": "N5",
    "category": "Verben",
    "meaning": "Bitte tun Sie...",
    "explanation": "～てください ist eine höfliche Bitte, etwas zu tun. Es entspricht dem deutschen 'Bitte machen Sie...' oder 'Bitte tu...'. Es ist eine der häufigsten Formen im Alltag.",
    "formation": "Verb て-Form + ください",
    "examples": [
      {
        "japanese": "ここに名前を書いてください。",
        "cloze": {
          "start": 8,
          "answer": "てください",
          "quiz": {
            "level": "N5",
            "japanese": "ここに名前を書いてください。",
            "german": "Bitte schreiben Sie hier Ihren Namen.",
            "start": 8,
            "answer": "てください",
            "acceptedAnswers": [
              "てください"
            ],
            "distractors": [
              {
                "text": "でください",
                "reason": "書く bildet 書いて, nicht 書いで."
              },
              {
                "text": "たください",
                "reason": "ください wird nicht an die た-Form angeschlossen."
              },
              {
                "text": "ますください",
                "reason": "ください wird nicht an die ます-Form angeschlossen."
              }
            ],
            "promptKana": "ここになまえをかい＿＿＿。"
          }
        },
        "romaji": "Koko ni namae o kaite kudasai.",
        "german": "Bitte schreiben Sie hier Ihren Namen."
      },
      {
        "japanese": "もう一度言ってください。",
        "cloze": {
          "start": 6,
          "answer": "てください"
        },
        "romaji": "Mō ichido itte kudasai.",
        "german": "Bitte sagen Sie es noch einmal."
      }
    ],
    "notes": "てください ist höflich, aber es ist trotzdem eine Anweisung. Für noch höflichere Bitten verwendet man ていただけませんか.",
    "related": [
      "te-form",
      "naide-kudasai"
    ]
  },
  {
    "id": "naide-kudasai",
    "pattern": "～ないでください",
    "level": "N5",
    "category": "Verben",
    "meaning": "Bitte tun Sie ... nicht",
    "explanation": "～ないでください ist eine höfliche Bitte, etwas nicht zu tun. Es ist die verneinende Form von ～てください.",
    "formation": "Verb ない-Form + でください",
    "examples": [
      {
        "japanese": "ここで写真を撮らないでください。",
        "cloze": {
          "start": 8,
          "answer": "ないでください",
          "quiz": {
            "level": "N5",
            "japanese": "ここで写真を撮らないでください。",
            "german": "Bitte machen Sie hier keine Fotos.",
            "start": 8,
            "answer": "ないでください",
            "acceptedAnswers": [
              "ないでください"
            ],
            "distractors": [
              {
                "text": "なくください",
                "reason": "Die negative Bitte braucht ないで, nicht なく."
              },
              {
                "text": "ませんください",
                "reason": "ません verbindet sich nicht direkt mit ください."
              },
              {
                "text": "なかったください",
                "reason": "Die Vergangenheitsverneinung bildet keine Bitte."
              }
            ],
            "promptKana": "ここでしゃしんをとら＿＿＿。"
          }
        },
        "romaji": "Koko de shashin o toranaide kudasai.",
        "german": "Bitte machen Sie hier keine Fotos."
      },
      {
        "japanese": "心配しないでください。",
        "cloze": {
          "start": 3,
          "answer": "ないでください"
        },
        "romaji": "Shinpai shinaide kudasai.",
        "german": "Bitte machen Sie sich keine Sorgen."
      }
    ],
    "notes": "Die ない-Form wird aus der Wörterbuchform gebildet: Gruppe 1: う-Reihe → あ-Reihe + ない (書く → 書かない), Gruppe 2: る → ない (食べる → 食べない).",
    "related": [
      "te-kudasai"
    ]
  },
  {
    "id": "tai",
    "pattern": "～たい",
    "level": "N5",
    "category": "Verben",
    "meaning": "Möchte / Will (etwas tun)",
    "explanation": "～たい drückt den Wunsch des Sprechers aus, etwas zu tun. Es wird wie ein い-Adjektiv konjugiert. Man verwendet es nur für die eigenen Wünsche, nicht für die Wünsche anderer.",
    "formation": "Verb-Stamm + たい",
    "examples": [
      {
        "japanese": "水を飲みたいです。",
        "cloze": {
          "start": 4,
          "answer": "たい",
          "quiz": {
            "level": "N5",
            "japanese": "水を飲みたいです。",
            "german": "Ich möchte Wasser trinken.",
            "start": 4,
            "answer": "たい",
            "acceptedAnswers": [
              "たい"
            ],
            "distractors": [
              {
                "text": "ます",
                "reason": "飲みますです verdoppelt unzulässig die höfliche Endung."
              },
              {
                "text": "ません",
                "reason": "飲みませんです ist hier keine Wunschform."
              },
              {
                "text": "ました",
                "reason": "飲みましたです ist hier keine Wunschform."
              }
            ],
            "promptKana": "みずをのみ＿＿＿です。"
          }
        },
        "romaji": "Mizu o nomitai desu.",
        "german": "Ich möchte Wasser trinken."
      },
      {
        "japanese": "日本に行きたいです。",
        "cloze": {
          "start": 5,
          "answer": "たい"
        },
        "romaji": "Nihon ni ikitai desu.",
        "german": "Ich möchte nach Japan gehen."
      }
    ],
    "notes": "たい wird nur für die eigene Person verwendet. Für andere sagt man ～たがっている. Das Objekt kann mit を oder が markiert werden: 水を飲みたい / 水が飲みたい.",
    "related": [
      "ga-hoshii"
    ]
  },
  {
    "id": "mashou",
    "pattern": "～ましょう",
    "level": "N5",
    "category": "Verben",
    "meaning": "Lasst uns... / Ich werde...",
    "explanation": "～ましょう drückt einen Vorschlag ('Lasst uns...') oder eine Absicht ('Ich werde...') aus. Es ist die höfliche Volitionalform.",
    "formation": "Verb-Stamm + ましょう",
    "examples": [
      {
        "japanese": "一緒に行きましょう。",
        "cloze": {
          "start": 5,
          "answer": "ましょう",
          "quiz": {
            "level": "N5",
            "japanese": "一緒に行きましょう。",
            "german": "Lasst uns zusammen gehen.",
            "start": 5,
            "answer": "ましょう",
            "acceptedAnswers": [
              "ましょう"
            ],
            "distractors": [
              {
                "text": "ません",
                "reason": "Dies ist eine Verneinung, kein gemeinsamer Vorschlag."
              },
              {
                "text": "ました",
                "reason": "Dies berichtet Vergangenheit."
              },
              {
                "text": "ませんでした",
                "reason": "Dies verneint eine vergangene Handlung."
              }
            ],
            "promptKana": "いっしょにいき＿＿＿。"
          }
        },
        "romaji": "Issho ni ikimashō.",
        "german": "Lasst uns zusammen gehen."
      },
      {
        "japanese": "休みましょう。",
        "cloze": {
          "start": 2,
          "answer": "ましょう"
        },
        "romaji": "Yasumimashō.",
        "german": "Lasst uns eine Pause machen."
      }
    ],
    "notes": "ましょう ist ein Vorschlag, ましょうか ist eine Frage, ob man etwas gemeinsam tun soll oder ein Angebot.",
    "related": [
      "mashou-ka"
    ]
  },
  {
    "id": "mashou-ka",
    "pattern": "～ましょうか",
    "level": "N5",
    "category": "Verben",
    "meaning": "Sollen wir...? / Soll ich...?",
    "explanation": "～ましょうか wird als Frage verwendet, um vorzuschlagen, etwas gemeinsam zu tun ('Sollen wir...?') oder um Hilfe anzubieten ('Soll ich...?').",
    "formation": "Verb-Stamm + ましょうか",
    "examples": [
      {
        "japanese": "窓を開けましょうか。",
        "cloze": {
          "start": 4,
          "answer": "ましょうか",
          "quiz": {
            "level": "N5",
            "japanese": "窓を開けましょうか。",
            "german": "Soll ich das Fenster öffnen?",
            "start": 4,
            "answer": "ましょうか",
            "acceptedAnswers": [
              "ましょうか"
            ],
            "distractors": [
              {
                "text": "ました",
                "reason": "Dies berichtet eine vergangene Handlung statt Hilfe anzubieten."
              },
              {
                "text": "ません",
                "reason": "Dies verneint das Öffnen statt Hilfe anzubieten."
              },
              {
                "text": "ませんでした",
                "reason": "Dies berichtet, dass nicht geöffnet wurde."
              }
            ],
            "promptKana": "まどをあけ＿＿＿。"
          }
        },
        "romaji": "Mado o akemashō ka.",
        "german": "Soll ich das Fenster öffnen?"
      },
      {
        "japanese": "一緒に昼ごはんを食べましょうか。",
        "cloze": {
          "start": 10,
          "answer": "ましょうか"
        },
        "romaji": "Issho ni hirugohan o tabemashō ka.",
        "german": "Sollen wir zusammen Mittag essen?"
      }
    ],
    "notes": "Wenn man jemandem Hilfe anbietet, ist ましょうか höflicher als einfach ましょう.",
    "related": [
      "mashou"
    ]
  },
  {
    "id": "temo-ii",
    "pattern": "～てもいいです",
    "level": "N5",
    "category": "Verben",
    "meaning": "Darf / Es ist erlaubt zu...",
    "explanation": "～てもいいです drückt Erlaubnis aus. Es bedeutet 'Man darf...' oder 'Es ist in Ordnung, wenn...'. Als Frage wird es verwendet, um um Erlaubnis zu bitten.",
    "formation": "Verb て-Form + もいいです",
    "examples": [
      {
        "japanese": "ここで写真を撮ってもいいですか。",
        "cloze": {
          "start": 8,
          "answer": "てもいいです",
          "quiz": {
            "level": "N5",
            "japanese": "ここで写真を撮ってもいいですか。",
            "german": "Darf ich hier fotografieren?",
            "start": 8,
            "answer": "てもいいです",
            "acceptedAnswers": [
              "てもいいです"
            ],
            "distractors": [
              {
                "text": "たもいいです",
                "reason": "Erlaubnis wird an die て-Form angeschlossen."
              },
              {
                "text": "てもいいでした",
                "reason": "いい bildet Vergangenheit nicht mit でした."
              },
              {
                "text": "てもいいます",
                "reason": "いい als Adjektiv nimmt kein ます an."
              }
            ],
            "promptKana": "ここでしゃしんをとっ＿＿＿か。"
          }
        },
        "romaji": "Koko de shashin o totte mo ii desu ka.",
        "german": "Darf ich hier fotografieren?"
      },
      {
        "japanese": "帰ってもいいですよ。",
        "cloze": {
          "start": 2,
          "answer": "てもいいです"
        },
        "romaji": "Kaette mo ii desu yo.",
        "german": "Du darfst nach Hause gehen."
      }
    ],
    "notes": "Die Verneinung 'Man darf nicht' ist ～てはいけません, nicht ～てもよくないです.",
    "related": [
      "te-form",
      "tewa-ikemasen",
      "nakutemo-ii"
    ]
  },
  {
    "id": "tewa-ikemasen",
    "pattern": "～てはいけません",
    "level": "N5",
    "category": "Verben",
    "meaning": "Darf nicht / Es ist verboten zu...",
    "explanation": "～てはいけません drückt ein Verbot aus. Es bedeutet 'Man darf nicht...' oder 'Es ist nicht erlaubt...'. Es ist stärker als eine einfache Bitte.",
    "formation": "Verb て-Form + はいけません",
    "examples": [
      {
        "japanese": "ここでタバコを吸ってはいけません。",
        "cloze": {
          "start": 9,
          "answer": "てはいけません",
          "quiz": {
            "level": "N5",
            "japanese": "ここでタバコを吸ってはいけません。",
            "german": "Hier darf man nicht rauchen.",
            "start": 9,
            "answer": "てはいけません",
            "acceptedAnswers": [
              "てはいけません"
            ],
            "distractors": [
              {
                "text": "たはいけません",
                "reason": "Das Verbot braucht die て-Form vor は."
              },
              {
                "text": "てもいいです",
                "reason": "Dies erlaubt das Rauchen ausdrücklich."
              },
              {
                "text": "てください",
                "reason": "Dies fordert zum Rauchen auf."
              }
            ],
            "promptKana": "ここでタバコをすっ＿＿＿。"
          }
        },
        "romaji": "Koko de tabako o sutte wa ikemasen.",
        "german": "Hier darf man nicht rauchen."
      },
      {
        "japanese": "教室で食べてはいけません。",
        "cloze": {
          "start": 5,
          "answer": "てはいけません"
        },
        "romaji": "Kyōshitsu de tabete wa ikemasen.",
        "german": "Im Klassenzimmer darf man nicht essen."
      }
    ],
    "notes": "In der Umgangssprache wird ～ちゃだめ oder ～ちゃいけない verwendet. ～てはいけません ist die formellere Variante.",
    "related": [
      "temo-ii",
      "nakereba-naranai"
    ]
  },
  {
    "id": "koto-ga-dekiru",
    "pattern": "～ことができる",
    "level": "N5",
    "category": "Verben",
    "meaning": "Können / In der Lage sein zu...",
    "explanation": "～ことができる drückt die Fähigkeit aus, etwas zu tun. Die höfliche Form ist ～ことができます. Es ist eine Alternative zur Potenzialform des Verbs.",
    "formation": "Verb (Wörterbuchform) + ことができる",
    "examples": [
      {
        "japanese": "日本語を話すことができます。",
        "romaji": "Nihongo o hanasu koto ga dekimasu.",
        "german": "Ich kann Japanisch sprechen.",
        "cloze": {
          "start": 6,
          "answer": "ことができます",
          "quiz": {
            "level": "N5",
            "japanese": "日本語を話すことができます。",
            "german": "Ich kann Japanisch sprechen.",
            "start": 6,
            "answer": "ことができます",
            "acceptedAnswers": [
              "ことができます"
            ],
            "distractors": [
              {
                "text": "ことをできます",
                "reason": "できる verlangt in dieser Konstruktion が."
              },
              {
                "text": "ことができません",
                "reason": "Die Übersetzung bejaht die Fähigkeit."
              },
              {
                "text": "ことができました",
                "reason": "Die Übersetzung nennt gegenwärtige Fähigkeit, keine vergangene Möglichkeit."
              }
            ],
            "promptKana": "にほんごをはなす＿＿＿。"
          }
        }
      },
      {
        "japanese": "漢字を読むことができますか。",
        "romaji": "Kanji o yomu koto ga dekimasu ka.",
        "german": "Können Sie Kanji lesen?"
      }
    ],
    "notes": "Diese Form ist etwas formeller als die Potenzialform (話せる). Beide sind austauschbar, aber ことができる wird öfter in der Schriftsprache verwendet.",
    "related": []
  },
  {
    "id": "ta-koto-ga-aru",
    "pattern": "～たことがある",
    "level": "N5",
    "category": "Verben",
    "meaning": "Schon einmal ... haben (Erfahrung)",
    "explanation": "～たことがある drückt aus, dass man etwas schon einmal erlebt hat. Es bezieht sich auf Erfahrungen in der Vergangenheit. Die höfliche Form ist ～たことがあります.",
    "formation": "Verb た-Form + ことがある",
    "examples": [
      {
        "japanese": "日本に行ったことがあります。",
        "romaji": "Nihon ni itta koto ga arimasu.",
        "german": "Ich war schon einmal in Japan.",
        "cloze": {
          "start": 5,
          "answer": "たことがあります",
          "quiz": {
            "level": "N5",
            "japanese": "日本に行ったことがあります。",
            "german": "Ich war schon einmal in Japan.",
            "start": 5,
            "answer": "たことがあります",
            "acceptedAnswers": [
              "たことがあります"
            ],
            "distractors": [
              {
                "text": "たことがありません",
                "reason": "Dies verneint die Erfahrung."
              },
              {
                "text": "てことがあります",
                "reason": "Die Erfahrung verlangt die た-Form."
              },
              {
                "text": "ますことがあります",
                "reason": "Vor こと steht hier keine ます-Form."
              }
            ],
            "promptKana": "にほんにいっ＿＿＿。"
          }
        }
      },
      {
        "japanese": "すしを食べたことがありますか。",
        "romaji": "Sushi o tabeta koto ga arimasu ka.",
        "german": "Haben Sie schon einmal Sushi gegessen?"
      }
    ],
    "notes": "Die Verneinung ist ～たことがない (Ich habe noch nie...). Diese Form bezieht sich auf die gesamte Lebenserfahrung, nicht auf ein bestimmtes Ereignis.",
    "related": []
  },
  {
    "id": "ni-iku",
    "pattern": "～に行く",
    "level": "N5",
    "category": "Verben",
    "meaning": "Gehen um zu...",
    "explanation": "～に行く drückt den Zweck einer Bewegung aus. Man geht irgendwohin, um etwas zu tun. Statt 行く kann auch 来る oder 帰る verwendet werden.",
    "formation": "Verb-Stamm + に行く / に来る / に帰る",
    "examples": [
      {
        "japanese": "映画を見に行きます。",
        "romaji": "Eiga o mi ni ikimasu.",
        "german": "Ich gehe einen Film sehen.",
        "cloze": {
          "start": 4,
          "answer": "に行きます",
          "quiz": {
            "level": "N5",
            "japanese": "映画を見に行きます。",
            "german": "Ich gehe einen Film sehen.",
            "start": 4,
            "answer": "に行きます",
            "acceptedAnswers": [
              "に行きます"
            ],
            "distractors": [
              {
                "text": "を行きます",
                "reason": "Zweck nach dem Verbstamm wird mit に markiert."
              },
              {
                "text": "が行きます",
                "reason": "が verbindet den Verbstamm nicht als Zweck."
              },
              {
                "text": "で行きます",
                "reason": "で ist hier kein Zweckanschluss an 見."
              }
            ],
            "promptKana": "えいがをみ＿＿＿。"
          }
        }
      },
      {
        "japanese": "昼ごはんを食べに来ませんか。",
        "romaji": "Hirugohan o tabe ni kimasen ka.",
        "german": "Kommen Sie nicht zum Mittagessen?"
      }
    ],
    "notes": "Man verwendet den Verb-Stamm (masu-Stamm), nicht die Wörterbuchform: 食べに行く (richtig), 食べるに行く (falsch). Bei する-Verben: 買い物しに行く.",
    "related": [
      "ni"
    ]
  },
  {
    "id": "nagara",
    "pattern": "～ながら",
    "level": "N4",
    "category": "Verben",
    "meaning": "Während / Gleichzeitig",
    "explanation": "～ながら drückt aus, dass zwei Handlungen gleichzeitig von derselben Person ausgeführt werden. Die Haupthandlung steht am Satzende, die Nebenhandlung vor ながら.",
    "formation": "Verb-Stamm + ながら + Haupthandlung",
    "examples": [
      {
        "japanese": "音楽を聞きながら勉強します。",
        "cloze": {
          "start": 5,
          "answer": "ながら",
          "quiz": {
            "level": "N4",
            "japanese": "音楽を聞きながら勉強します。",
            "german": "Ich lerne während ich Musik höre.",
            "start": 5,
            "answer": "ながら",
            "acceptedAnswers": [
              "ながら"
            ],
            "distractors": [
              {
                "text": "てから",
                "reason": "聞きて ist keine て-Form; außerdem wäre erst danach gemeint."
              },
              {
                "text": "たあとで",
                "reason": "聞きた ist keine た-Form."
              },
              {
                "text": "ないで",
                "reason": "聞きない ist keine Negativform."
              }
            ],
            "promptKana": "おんがくをきき＿＿＿べんきょうします。"
          }
        },
        "romaji": "Ongaku o kikinagara benkyō shimasu.",
        "german": "Ich lerne während ich Musik höre."
      },
      {
        "japanese": "テレビを見ながら食べないでください。",
        "cloze": {
          "start": 5,
          "answer": "ながら"
        },
        "romaji": "Terebi o minagara tabenaide kudasai.",
        "german": "Bitte essen Sie nicht beim Fernsehen."
      }
    ],
    "notes": "Beide Handlungen müssen von derselben Person ausgeführt werden. Für verschiedene Personen verwendet man ～間に (aida ni).",
    "related": []
  },
  {
    "id": "mae-ni",
    "pattern": "～前に",
    "level": "N5",
    "category": "Verben",
    "meaning": "Bevor / Vor",
    "explanation": "～前に bedeutet 'bevor man etwas tut' oder 'vor etwas'. Bei Verben steht die Wörterbuchform vor 前に, bei Nomen steht の vor 前に.",
    "formation": "Verb (Wörterbuchform) + 前に / Nomen + の前に",
    "examples": [
      {
        "japanese": "寝る前に歯を磨きます。",
        "cloze": {
          "start": 2,
          "answer": "前に",
          "quiz": {
            "level": "N5",
            "japanese": "寝る前に歯を磨きます。",
            "german": "Vor dem Schlafen putze ich mir die Zähne.",
            "start": 2,
            "answer": "前に",
            "acceptedAnswers": [
              "前に"
            ],
            "distractors": [
              {
                "text": "後で",
                "reason": "Nach der Wörterbuchform 寝る passt nicht 寝た後で; außerdem ist vor gemeint."
              },
              {
                "text": "ながら",
                "reason": "ながら verlangt den Stamm 寝, nicht 寝る."
              },
              {
                "text": "てから",
                "reason": "てから muss an die passende て-Form angeschlossen werden."
              }
            ],
            "promptKana": "ねる＿＿＿はをみがきます。"
          }
        },
        "romaji": "Neru mae ni ha o migakimasu.",
        "german": "Vor dem Schlafen putze ich mir die Zähne."
      },
      {
        "japanese": "食事の前に手を洗ってください。",
        "cloze": {
          "start": 3,
          "answer": "前に"
        },
        "romaji": "Shokuji no mae ni te o aratte kudasai.",
        "german": "Bitte waschen Sie sich vor dem Essen die Hände."
      }
    ],
    "notes": "Vor 前に steht immer die Wörterbuchform des Verbs, unabhängig von der Zeitform des Hauptsatzes.",
    "related": [
      "ato-de"
    ]
  },
  {
    "id": "ato-de",
    "pattern": "～後で",
    "level": "N5",
    "category": "Verben",
    "meaning": "Nachdem / Nach",
    "explanation": "～後で bedeutet 'nachdem man etwas getan hat' oder 'nach etwas'. Bei Verben steht die た-Form vor 後で, bei Nomen steht の vor 後で.",
    "formation": "Verb た-Form + 後で / Nomen + の後で",
    "examples": [
      {
        "japanese": "仕事の後で飲みに行きましょう。",
        "cloze": {
          "start": 3,
          "answer": "後で",
          "quiz": {
            "level": "N5",
            "japanese": "仕事の後で飲みに行きましょう。",
            "german": "Lasst uns nach der Arbeit trinken gehen.",
            "start": 3,
            "answer": "後で",
            "acceptedAnswers": [
              "後で"
            ],
            "distractors": [
              {
                "text": "前に",
                "reason": "前に bedeutet vor, nicht nach der Arbeit."
              },
              {
                "text": "ながら",
                "reason": "仕事のながら ist kein passender Anschluss."
              },
              {
                "text": "てから",
                "reason": "仕事のてから ist kein passender Anschluss."
              }
            ],
            "promptKana": "しごとの＿＿＿のみにいきましょう。"
          }
        },
        "romaji": "Shigoto no ato de nomi ni ikimashō.",
        "german": "Lasst uns nach der Arbeit trinken gehen."
      },
      {
        "japanese": "ごはんを食べた後で散歩しました。",
        "cloze": {
          "start": 7,
          "answer": "後で"
        },
        "romaji": "Gohan o tabeta ato de sanpo shimashita.",
        "german": "Nachdem ich gegessen hatte, habe ich einen Spaziergang gemacht."
      }
    ],
    "notes": "後で kann auch allein 'später' bedeuten: 後で電話します (Ich rufe später an). ～てから ist eine Alternative mit ähnlicher Bedeutung.",
    "related": [
      "mae-ni",
      "te-kara"
    ]
  },
  {
    "id": "tari-tari",
    "pattern": "～たり～たりする",
    "level": "N5",
    "category": "Verben",
    "meaning": "Dinge wie ... und ... tun",
    "explanation": "～たり～たりする listet beispielhafte Handlungen auf. Es bedeutet 'Dinge wie ... und ... tun' und impliziert, dass auch andere Handlungen stattfinden. Die letzte Form ist immer する.",
    "formation": "Verb た-Form + り + Verb た-Form + り + する",
    "examples": [
      {
        "japanese": "週末は本を読んだりテレビを見たりします。",
        "romaji": "Shūmatsu wa hon o yondari terebi o mitari shimasu.",
        "german": "Am Wochenende lese ich Bücher, schaue Fernsehen und so weiter.",
        "cloze": {
          "start": 5,
          "answer": "読んだりテレビを見たりします",
          "quiz": {
            "level": "N5",
            "japanese": "週末は本を読んだりテレビを見たりします。",
            "german": "Am Wochenende lese ich Bücher, schaue Fernsehen und so weiter.",
            "start": 5,
            "answer": "読んだりテレビを見たりします",
            "acceptedAnswers": [
              "読んだりテレビを見たりします"
            ],
            "distractors": [
              {
                "text": "読んたりテレビを見たりします",
                "reason": "読む bildet 読んだり, nicht 読んたり."
              },
              {
                "text": "読んだりテレビを見だりします",
                "reason": "見る bildet 見たり, nicht 見だり."
              },
              {
                "text": "読むたりテレビを見るたりします",
                "reason": "たり verlangt die た-Form der Verben."
              }
            ],
            "promptKana": "しゅうまつはほんを＿＿＿。"
          }
        }
      },
      {
        "japanese": "休みの日は買い物したり料理したりしました。",
        "romaji": "Yasumi no hi wa kaimono shitari ryōri shitari shimashita.",
        "german": "An freien Tagen habe ich eingekauft, gekocht und ähnliches."
      }
    ],
    "notes": "Am Ende der Aufzählung muss immer する stehen (in der passenden Zeitform). Auch mit Adjektiven möglich: 大きかったり小さかったり.",
    "related": [
      "ya"
    ]
  },
  {
    "id": "te-kara",
    "pattern": "～てから",
    "level": "N5",
    "category": "Verben",
    "meaning": "Nachdem / Seit",
    "explanation": "～てから betont die Reihenfolge zweier Handlungen: Erst wird die erste Handlung abgeschlossen, dann beginnt die zweite. Es betont stärker als 後で, dass die erste Handlung zuerst beendet sein muss.",
    "formation": "Verb て-Form + から",
    "examples": [
      {
        "japanese": "手を洗ってから食べてください。",
        "cloze": {
          "start": 4,
          "answer": "てから",
          "quiz": {
            "level": "N5",
            "japanese": "手を洗ってから食べてください。",
            "german": "Bitte essen Sie, nachdem Sie sich die Hände gewaschen haben.",
            "start": 4,
            "answer": "てから",
            "acceptedAnswers": [
              "てから"
            ],
            "distractors": [
              {
                "text": "たから",
                "reason": "Dies nennt einen Grund statt die Reihenfolge der Bitte."
              },
              {
                "text": "ますから",
                "reason": "洗っます ist keine Verbform."
              },
              {
                "text": "ないから",
                "reason": "洗っない ist keine Verbform."
              }
            ],
            "promptKana": "てをあらっ＿＿＿たべてください。"
          }
        },
        "romaji": "Te o aratte kara tabete kudasai.",
        "german": "Bitte essen Sie, nachdem Sie sich die Hände gewaschen haben."
      },
      {
        "japanese": "日本に来てから日本語を勉強し始めました。",
        "cloze": {
          "start": 4,
          "answer": "てから"
        },
        "romaji": "Nihon ni kite kara nihongo o benkyō shihajimemashita.",
        "german": "Seit ich nach Japan gekommen bin, habe ich angefangen Japanisch zu lernen."
      }
    ],
    "notes": "てから betont die Abfolge stärker als 後で. Bei てから muss die erste Handlung abgeschlossen sein, bevor die zweite beginnt.",
    "related": [
      "ato-de",
      "te-form"
    ]
  },
  {
    "id": "naide",
    "pattern": "～ないで",
    "level": "N5",
    "category": "Verben",
    "meaning": "Ohne zu... / Anstatt zu...",
    "explanation": "～ないで bedeutet 'ohne etwas zu tun'. Es drückt aus, dass eine Handlung nicht ausgeführt wird, während eine andere stattfindet.",
    "formation": "Verb ない-Form + で",
    "examples": [
      {
        "japanese": "朝ごはんを食べないで学校に行きました。",
        "cloze": {
          "start": 7,
          "answer": "ないで",
          "quiz": {
            "level": "N5",
            "japanese": "朝ごはんを食べないで学校に行きました。",
            "german": "Ich bin zur Schule gegangen, ohne zu frühstücken.",
            "start": 7,
            "answer": "ないで",
            "acceptedAnswers": [
              "ないで"
            ],
            "distractors": [
              {
                "text": "てから",
                "reason": "Dies besagt, dass vorher gefrühstückt wurde."
              },
              {
                "text": "ながら",
                "reason": "Dies beschreibt gleichzeitiges Essen statt ohne Frühstück."
              },
              {
                "text": "た後で",
                "reason": "Dies besagt nach dem Frühstück."
              }
            ],
            "promptKana": "あさごはんをたべ＿＿＿がっこうにいきました。"
          }
        },
        "romaji": "Asagohan o tabenaide gakkō ni ikimashita.",
        "german": "Ich bin zur Schule gegangen, ohne zu frühstücken."
      },
      {
        "japanese": "辞書を使わないで読みました。",
        "cloze": {
          "start": 5,
          "answer": "ないで"
        },
        "romaji": "Jisho o tsukawanaide yomimashita.",
        "german": "Ich habe es gelesen, ohne ein Wörterbuch zu benutzen."
      }
    ],
    "notes": "～ないで kann auch eine Bitte ausdrücken, wenn ください hinzugefügt wird: 食べないでください (Bitte essen Sie nicht).",
    "related": [
      "naide-kudasai"
    ]
  },
  {
    "id": "sugiru",
    "pattern": "～すぎる",
    "level": "N4",
    "category": "Verben",
    "meaning": "Zu viel / Zu sehr",
    "explanation": "～すぎる drückt aus, dass etwas übermäßig ist. Es kann mit Verben und Adjektiven verwendet werden und bedeutet 'zu viel' oder 'zu sehr'. すぎる selbst wird als Gruppe-2-Verb konjugiert.",
    "formation": "Verb-Stamm + すぎる / い-Adj (ohne い) + すぎる / な-Adj + すぎる",
    "examples": [
      {
        "japanese": "昨日食べすぎました。",
        "romaji": "Kinō tabesugimashita.",
        "german": "Gestern habe ich zu viel gegessen.",
        "cloze": {
          "start": 4,
          "answer": "すぎました",
          "quiz": {
            "level": "N4",
            "japanese": "昨日食べすぎました。",
            "german": "Gestern habe ich zu viel gegessen.",
            "start": 4,
            "answer": "すぎました",
            "acceptedAnswers": [
              "すぎました"
            ],
            "distractors": [
              {
                "text": "すぎます",
                "reason": "Die abgeschlossene Handlung gestern braucht Vergangenheit."
              },
              {
                "text": "すぎませんでした",
                "reason": "Dies verneint das zu viele Essen."
              },
              {
                "text": "すぎでした",
                "reason": "すぎる ist ein Verb und bildet die höfliche Vergangenheit mit ました."
              }
            ],
            "promptKana": "きのうたべ＿＿＿。"
          }
        }
      },
      {
        "japanese": "この鞄は高すぎます。",
        "romaji": "Kono kaban wa takasugimasu.",
        "german": "Diese Tasche ist zu teuer."
      }
    ],
    "notes": "Bei い-Adjektiven fällt das い weg: 高い → 高すぎる. Bei な-Adjektiven fällt な weg: 静か → 静かすぎる.",
    "related": []
  },
  {
    "id": "kata",
    "pattern": "～方",
    "level": "N4",
    "category": "Verben",
    "meaning": "Art und Weise / Wie man ... tut",
    "explanation": "～方 (かた) bedeutet 'die Art und Weise, wie man etwas tut'. Es wird an den Verb-Stamm angehängt und bildet ein Nomen.",
    "formation": "Verb-Stamm + 方(かた)",
    "examples": [
      {
        "japanese": "この漢字の読み方を教えてください。",
        "cloze": {
          "start": 7,
          "answer": "方",
          "quiz": {
            "level": "N4",
            "japanese": "この漢字の読み方を教えてください。",
            "german": "Bitte sagen Sie mir, wie man dieses Kanji liest.",
            "start": 7,
            "answer": "方",
            "acceptedAnswers": [
              "方"
            ],
            "distractors": [
              {
                "text": "ながら",
                "reason": "ながら ergibt hier kein Nomen für die Art des Lesens."
              },
              {
                "text": "ます",
                "reason": "読みます kann nicht direkt vor を stehen."
              },
              {
                "text": "たい",
                "reason": "読みたい benötigt hier eine Nominalisierung statt des unmittelbaren を."
              }
            ],
            "promptKana": "このかんじのよみ＿＿＿をおしえてください。"
          }
        },
        "romaji": "Kono kanji no yomikata o oshiete kudasai.",
        "german": "Bitte sagen Sie mir, wie man dieses Kanji liest."
      },
      {
        "japanese": "使い方が分かりません。",
        "cloze": {
          "start": 2,
          "answer": "方"
        },
        "romaji": "Tsukaikata ga wakarimasen.",
        "german": "Ich verstehe die Bedienung nicht."
      }
    ],
    "notes": "方 wird als かた gelesen, wenn es 'Art und Weise' bedeutet. Das Ergebnis ist ein Nomen: 食べ方 (Art zu essen), 書き方 (Art zu schreiben).",
    "related": []
  },
  {
    "id": "te-connective",
    "pattern": "～て (Verbindung)",
    "level": "N5",
    "category": "Verben",
    "meaning": "Und dann / Und (Verbindung von Sätzen)",
    "explanation": "Die て-Form kann Sätze verbinden und eine zeitliche Abfolge ausdrücken. Sie bedeutet 'und dann' oder 'und'. Das letzte Verb im Satz bestimmt die Zeitform.",
    "formation": "Verb て-Form + nächste Handlung",
    "examples": [
      {
        "japanese": "朝起きて、顔を洗って、朝ごはんを食べます。",
        "romaji": "Asa okite, kao o aratte, asagohan o tabemasu.",
        "german": "Morgens stehe ich auf, wasche mir das Gesicht und frühstücke.",
        "cloze": {
          "start": 1,
          "answer": "起きて",
          "quiz": {
            "level": "N5",
            "japanese": "朝起きて、顔を洗って、朝ごはんを食べます。",
            "german": "Morgens stehe ich auf, wasche mir das Gesicht und frühstücke.",
            "start": 1,
            "answer": "起きて",
            "acceptedAnswers": [
              "起きて"
            ],
            "distractors": [
              {
                "text": "起きたて",
                "reason": "起きたて ist eine nominale Frisch-Form und verbindet die Handlung hier nicht."
              },
              {
                "text": "起きますて",
                "reason": "Die て-Form wird nicht an ます angehängt."
              },
              {
                "text": "起きないで",
                "reason": "Dies besagt ohne aufzustehen und widerspricht der Abfolge."
              }
            ],
            "promptKana": "あさ＿＿＿、かおをあらって、あさごはんをたべます。"
          }
        }
      },
      {
        "japanese": "バスに乗って学校に行きます。",
        "romaji": "Basu ni notte gakkō ni ikimasu.",
        "german": "Ich nehme den Bus und fahre zur Schule."
      }
    ],
    "notes": "Die て-Form zur Verbindung impliziert oft eine zeitliche Reihenfolge. Das letzte Verb im Satz bestimmt die Höflichkeitsstufe und Zeitform für den gesamten Satz.",
    "related": [
      "te-form"
    ]
  },
  {
    "id": "nakutemo-ii",
    "pattern": "～なくてもいい",
    "level": "N5",
    "category": "Verben",
    "meaning": "Muss nicht / Braucht nicht zu...",
    "explanation": "～なくてもいい drückt aus, dass es nicht nötig ist, etwas zu tun. Es ist das Gegenteil von ～なければならない. Die höfliche Form ist ～なくてもいいです.",
    "formation": "Verb ない-Form (ohne い) + くてもいい",
    "examples": [
      {
        "japanese": "明日は来なくてもいいです。",
        "cloze": {
          "start": 4,
          "answer": "なくてもいい",
          "quiz": {
            "level": "N5",
            "japanese": "明日は来なくてもいいです。",
            "german": "Du brauchst morgen nicht zu kommen.",
            "start": 4,
            "answer": "なくてもいい",
            "acceptedAnswers": [
              "なくてもいい"
            ],
            "distractors": [
              {
                "text": "なければならない",
                "reason": "Dies verpflichtet zum Kommen statt davon zu befreien."
              },
              {
                "text": "ないといけない",
                "reason": "Dies verpflichtet zum Kommen."
              },
              {
                "text": "なくてもいいます",
                "reason": "いい ist ein Adjektiv und nimmt hier kein ます."
              }
            ],
            "promptKana": "あしたはこ＿＿＿です。"
          }
        },
        "romaji": "Ashita wa konakutemo ii desu.",
        "german": "Du brauchst morgen nicht zu kommen."
      },
      {
        "japanese": "全部食べなくてもいいですよ。",
        "cloze": {
          "start": 4,
          "answer": "なくてもいい"
        },
        "romaji": "Zenbu tabenakutemo ii desu yo.",
        "german": "Du musst nicht alles aufessen."
      }
    ],
    "notes": "Die Bildung: Verb ない-Form → ない wird zu なくて: 食べない → 食べなくてもいい. Nicht verwechseln mit ～てもいい (Erlaubnis).",
    "related": [
      "temo-ii",
      "nakereba-naranai"
    ]
  },
  {
    "id": "te-miru",
    "pattern": "～てみる",
    "level": "N4",
    "category": "Verben",
    "meaning": "Etwas ausprobieren / Versuchen zu...",
    "explanation": "～てみる bedeutet 'etwas ausprobieren' oder 'etwas versuchsweise tun'. Es drückt aus, dass man etwas zum ersten Mal oder testweise macht. Die höfliche Form ist ～てみます.",
    "formation": "Verb て-Form + みる",
    "examples": [
      {
        "japanese": "この料理を食べてみてください。",
        "romaji": "Kono ryōri o tabete mite kudasai.",
        "german": "Probieren Sie bitte dieses Gericht.",
        "cloze": {
          "start": 7,
          "answer": "てみて",
          "quiz": {
            "level": "N4",
            "japanese": "この料理を食べてみてください。",
            "german": "Probieren Sie bitte dieses Gericht.",
            "start": 7,
            "answer": "てみて",
            "acceptedAnswers": [
              "てみて"
            ],
            "distractors": [
              {
                "text": "てみます",
                "reason": "Vor ください steht keine ます-Form."
              },
              {
                "text": "たみて",
                "reason": "Das Ausprobieren braucht 食べて, nicht 食べた."
              },
              {
                "text": "てみた",
                "reason": "Die Bitte braucht みてください, nicht みたください."
              }
            ],
            "promptKana": "このりょうりをたべ＿＿＿ください。"
          }
        }
      },
      {
        "japanese": "日本語で話してみます。",
        "romaji": "Nihongo de hanashite mimasu.",
        "german": "Ich versuche mal, auf Japanisch zu sprechen."
      }
    ],
    "notes": "てみる betont das Ausprobieren, nicht den Versuch im Sinne von Anstrengung. Für 'sich bemühen' verwendet man eher ～ようとする.",
    "related": [
      "te-form"
    ]
  },
  {
    "id": "te-shimau",
    "pattern": "～てしまう",
    "level": "N4",
    "category": "Verben",
    "meaning": "Versehentlich tun / Vollständig tun",
    "explanation": "～てしまう hat zwei Bedeutungen: etwas unbeabsichtigt oder bedauerlich tun, oder eine Handlung vollständig abschließen. Die höfliche Form ist ～てしまいます. In der Umgangssprache wird es zu ～ちゃう verkürzt.",
    "formation": "Verb て-Form + しまう",
    "examples": [
      {
        "japanese": "財布を忘れてしまいました。",
        "romaji": "Saifu o wasurete shimaimashita.",
        "german": "Ich habe leider mein Portemonnaie vergessen.",
        "cloze": {
          "start": 5,
          "answer": "てしまいました",
          "quiz": {
            "level": "N4",
            "japanese": "財布を忘れてしまいました。",
            "german": "Ich habe leider mein Portemonnaie vergessen.",
            "start": 5,
            "answer": "てしまいました",
            "acceptedAnswers": [
              "てしまいました"
            ],
            "distractors": [
              {
                "text": "たしまいました",
                "reason": "しまう schließt an die て-Form an."
              },
              {
                "text": "てしまいでした",
                "reason": "Die höfliche Vergangenheit endet auf ました."
              },
              {
                "text": "てしまいませんでした",
                "reason": "Dies verneint das Vergessen."
              }
            ],
            "promptKana": "さいふをわすれ＿＿＿。"
          }
        }
      },
      {
        "japanese": "本を全部読んでしまいました。",
        "romaji": "Hon o zenbu yonde shimaimashita.",
        "german": "Ich habe das Buch komplett ausgelesen."
      }
    ],
    "notes": "Umgangssprachlich: ～てしまう → ～ちゃう (食べてしまう → 食べちゃう), ～でしまう → ～じゃう (飲んでしまう → 飲んじゃう).",
    "related": [
      "te-form"
    ]
  },
  {
    "id": "i-adj-present",
    "pattern": "い-Adjektiv (Gegenwart)",
    "level": "N5",
    "category": "Adjektive",
    "meaning": "い-Adjektiv in der Gegenwartsform",
    "explanation": "い-Adjektive enden auf い und können direkt vor einem Nomen stehen oder als Prädikat verwendet werden. In der höflichen Prädikatsform wird です angehängt.",
    "formation": "い-Adjektiv + です / い-Adjektiv + Nomen",
    "examples": [
      {
        "japanese": "この本はおもしろいです。",
        "romaji": "Kono hon wa omoshiroi desu.",
        "german": "Dieses Buch ist interessant.",
        "cloze": {
          "start": 4,
          "answer": "おもしろいです",
          "quiz": {
            "level": "N5",
            "japanese": "この本はおもしろいです。",
            "german": "Dieses Buch ist interessant.",
            "start": 4,
            "answer": "おもしろいです",
            "acceptedAnswers": [
              "おもしろいです"
            ],
            "distractors": [
              {
                "text": "おもしろいでした",
                "reason": "い-Adjektive bilden Vergangenheit nicht mit でした."
              },
              {
                "text": "おもしろいじゃないです",
                "reason": "Die reguläre Verneinung lautet おもしろくないです."
              },
              {
                "text": "おもしろくありません",
                "reason": "Dies bedeutet nicht interessant."
              }
            ],
            "promptKana": "このほんは＿＿＿。"
          }
        }
      },
      {
        "japanese": "大きい犬が好きです。",
        "romaji": "Ōkii inu ga suki desu.",
        "german": "Ich mag große Hunde."
      }
    ],
    "notes": "きれい (schön) und 有名 (berühmt) sehen aus wie い-Adjektive, sind aber な-Adjektive! Das い gehört dort zum Wortstamm.",
    "related": [
      "i-adj-negative",
      "i-adj-past",
      "i-adj-past-negative"
    ]
  },
  {
    "id": "i-adj-negative",
    "pattern": "～くない",
    "level": "N5",
    "category": "Adjektive",
    "meaning": "い-Adjektiv Verneinung",
    "explanation": "Um ein い-Adjektiv zu verneinen, wird das い durch くない ersetzt. Die höfliche Form ist ～くないです oder ～くありません.",
    "formation": "い-Adjektiv (ohne い) + くない(です)",
    "examples": [
      {
        "japanese": "今日は暑くないです。",
        "cloze": {
          "start": 4,
          "answer": "くない",
          "quiz": {
            "level": "N5",
            "japanese": "今日は暑くないです。",
            "german": "Heute ist es nicht heiß.",
            "start": 4,
            "answer": "くない",
            "acceptedAnswers": [
              "くない"
            ],
            "distractors": [
              {
                "text": "いない",
                "reason": "Die Verneinung eines い-Adjektivs verlangt くない."
              },
              {
                "text": "かった",
                "reason": "Dies wäre positive Vergangenheit."
              },
              {
                "text": "くなかった",
                "reason": "Dies wäre negative Vergangenheit statt heutiger Zustand."
              }
            ],
            "promptKana": "きょうはあつ＿＿＿です。"
          }
        },
        "romaji": "Kyō wa atsuku nai desu.",
        "german": "Heute ist es nicht heiß."
      },
      {
        "japanese": "この映画はおもしろくないです。",
        "cloze": {
          "start": 9,
          "answer": "くない"
        },
        "romaji": "Kono eiga wa omoshiroku nai desu.",
        "german": "Dieser Film ist nicht interessant."
      }
    ],
    "notes": "Ausnahme: いい (gut) → よくない (nicht gut). Das Adjektiv いい ändert sich in allen konjugierten Formen zu よ-.",
    "related": [
      "i-adj-present",
      "i-adj-past",
      "i-adj-past-negative"
    ]
  },
  {
    "id": "i-adj-past",
    "pattern": "～かった",
    "level": "N5",
    "category": "Adjektive",
    "meaning": "い-Adjektiv Vergangenheit",
    "explanation": "Für die Vergangenheitsform eines い-Adjektivs wird das い durch かった ersetzt. Die höfliche Form ist ～かったです.",
    "formation": "い-Adjektiv (ohne い) + かった(です)",
    "examples": [
      {
        "japanese": "昨日は寒かったです。",
        "cloze": {
          "start": 4,
          "answer": "かった",
          "quiz": {
            "level": "N5",
            "japanese": "昨日は寒かったです。",
            "german": "Gestern war es kalt.",
            "start": 4,
            "answer": "かった",
            "acceptedAnswers": [
              "かった"
            ],
            "distractors": [
              {
                "text": "いでした",
                "reason": "い-Adjektive bilden Vergangenheit mit かった."
              },
              {
                "text": "くでした",
                "reason": "くでした ist keine Vergangenheitsform."
              },
              {
                "text": "くない",
                "reason": "Dies wäre nicht kalt statt war kalt."
              }
            ],
            "promptKana": "きのうはさむ＿＿＿です。"
          }
        },
        "romaji": "Kinō wa samukatta desu.",
        "german": "Gestern war es kalt."
      },
      {
        "japanese": "旅行は楽しかったです。",
        "cloze": {
          "start": 5,
          "answer": "かった"
        },
        "romaji": "Ryokō wa tanoshikatta desu.",
        "german": "Die Reise war vergnüglich."
      }
    ],
    "notes": "Ausnahme: いい (gut) → よかった (war gut). Merke: いい → よくない → よかった → よくなかった.",
    "related": [
      "i-adj-present",
      "i-adj-negative",
      "i-adj-past-negative"
    ]
  },
  {
    "id": "i-adj-past-negative",
    "pattern": "～くなかった",
    "level": "N5",
    "category": "Adjektive",
    "meaning": "い-Adjektiv Vergangenheit (negativ)",
    "explanation": "Für die verneinte Vergangenheitsform eines い-Adjektivs wird das い durch くなかった ersetzt. Die höfliche Form ist ～くなかったです.",
    "formation": "い-Adjektiv (ohne い) + くなかった(です)",
    "examples": [
      {
        "japanese": "テストは難しくなかったです。",
        "cloze": {
          "start": 6,
          "answer": "くなかった",
          "quiz": {
            "level": "N5",
            "japanese": "テストは難しくなかったです。",
            "german": "Der Test war nicht schwer.",
            "start": 6,
            "answer": "くなかった",
            "acceptedAnswers": [
              "くなかった"
            ],
            "distractors": [
              {
                "text": "かった",
                "reason": "Dies bedeutet war schwer."
              },
              {
                "text": "いなかった",
                "reason": "Die Negativform braucht く vor なかった."
              },
              {
                "text": "くありません",
                "reason": "Dies ist Gegenwart, nicht die gefragte Vergangenheit."
              }
            ],
            "promptKana": "テストはむずかし＿＿＿です。"
          }
        },
        "romaji": "Tesuto wa muzukashiku nakatta desu.",
        "german": "Der Test war nicht schwer."
      },
      {
        "japanese": "あまりおいしくなかったです。",
        "cloze": {
          "start": 6,
          "answer": "くなかった"
        },
        "romaji": "Amari oishiku nakatta desu.",
        "german": "Es war nicht besonders lecker."
      }
    ],
    "notes": "Ausnahme: いい (gut) → よくなかった (war nicht gut).",
    "related": [
      "i-adj-present",
      "i-adj-negative",
      "i-adj-past"
    ]
  },
  {
    "id": "na-adj-present",
    "pattern": "な-Adjektiv (Gegenwart)",
    "level": "N5",
    "category": "Adjektive",
    "meaning": "な-Adjektiv in der Gegenwartsform",
    "explanation": "な-Adjektive benötigen な, wenn sie direkt vor einem Nomen stehen. Als Prädikat werden sie wie Nomen mit です verwendet. Sie konjugieren nicht wie い-Adjektive.",
    "formation": "な-Adjektiv + な + Nomen / な-Adjektiv + です",
    "examples": [
      {
        "japanese": "ここは静かです。",
        "romaji": "Koko wa shizuka desu.",
        "german": "Hier ist es ruhig.",
        "cloze": {
          "start": 3,
          "answer": "静かです",
          "quiz": {
            "level": "N5",
            "japanese": "ここは静かです。",
            "german": "Hier ist es ruhig.",
            "start": 3,
            "answer": "静かです",
            "acceptedAnswers": [
              "静かです"
            ],
            "distractors": [
              {
                "text": "静かいです",
                "reason": "静か ist ein な-Adjektiv und bekommt kein い."
              },
              {
                "text": "静かくないです",
                "reason": "Die Verneinung eines な-Adjektivs verwendet nicht くない."
              },
              {
                "text": "静かじゃないです",
                "reason": "Dies bedeutet nicht ruhig."
              }
            ],
            "promptKana": "ここは＿＿＿。"
          }
        }
      },
      {
        "japanese": "元気な子供ですね。",
        "romaji": "Genki na kodomo desu ne.",
        "german": "Das ist ein lebhaftes Kind, nicht wahr?"
      }
    ],
    "notes": "な-Adjektive verhalten sich wie Nomen bei der Konjugation: Sie verwenden じゃない, でした, じゃなかった statt Endungsänderungen.",
    "related": [
      "na-adj-negative",
      "na-adj-past",
      "na-adj-past-negative"
    ]
  },
  {
    "id": "na-adj-negative",
    "pattern": "な-Adjektiv + じゃない",
    "level": "N5",
    "category": "Adjektive",
    "meaning": "な-Adjektiv Verneinung",
    "explanation": "Um ein な-Adjektiv zu verneinen, wird じゃないです oder ではありません nach dem Adjektiv-Stamm verwendet. Die Konjugation ist identisch mit der Verneinung von Nomen.",
    "formation": "な-Adjektiv + じゃないです / ではありません",
    "examples": [
      {
        "japanese": "この部屋はきれいじゃないです。",
        "romaji": "Kono heya wa kirei ja nai desu.",
        "german": "Dieses Zimmer ist nicht sauber.",
        "cloze": {
          "start": 8,
          "answer": "じゃないです",
          "quiz": {
            "level": "N5",
            "japanese": "この部屋はきれいじゃないです。",
            "german": "Dieses Zimmer ist nicht sauber.",
            "start": 8,
            "answer": "じゃないです",
            "acceptedAnswers": [
              "じゃないです"
            ],
            "distractors": [
              {
                "text": "です",
                "reason": "Dies bejaht die Sauberkeit."
              },
              {
                "text": "くないです",
                "reason": "きれい ist trotz い am Ende ein な-Adjektiv."
              },
              {
                "text": "でした",
                "reason": "Dies ist positive Vergangenheit."
              }
            ],
            "promptKana": "このへやはきれい＿＿＿。"
          }
        }
      },
      {
        "japanese": "日本語は簡単じゃありません。",
        "romaji": "Nihongo wa kantan ja arimasen.",
        "german": "Japanisch ist nicht einfach."
      }
    ],
    "notes": "じゃないです ist umgangssprachlicher, ではありません ist formeller. Beide sind korrekt.",
    "related": [
      "na-adj-present",
      "na-adj-past",
      "na-adj-past-negative",
      "ja-nai"
    ]
  },
  {
    "id": "na-adj-past",
    "pattern": "な-Adjektiv + でした",
    "level": "N5",
    "category": "Adjektive",
    "meaning": "な-Adjektiv Vergangenheit",
    "explanation": "Für die Vergangenheitsform eines な-Adjektivs wird でした nach dem Adjektiv-Stamm verwendet. Die Konjugation ist identisch mit der Vergangenheitsform von Nomen.",
    "formation": "な-Adjektiv + でした",
    "examples": [
      {
        "japanese": "パーティーはにぎやかでした。",
        "romaji": "Pātī wa nigiyaka deshita.",
        "german": "Die Party war lebhaft.",
        "cloze": {
          "start": 10,
          "answer": "でした",
          "quiz": {
            "level": "N5",
            "japanese": "パーティーはにぎやかでした。",
            "german": "Die Party war lebhaft.",
            "start": 10,
            "answer": "でした",
            "acceptedAnswers": [
              "でした"
            ],
            "distractors": [
              {
                "text": "かったです",
                "reason": "な-Adjektive bilden Vergangenheit nicht mit かった."
              },
              {
                "text": "くなかったです",
                "reason": "Dies ist keine Negativform eines な-Adjektivs."
              },
              {
                "text": "じゃなかったです",
                "reason": "Dies verneint die Lebhaftigkeit."
              }
            ],
            "promptKana": "パーティーはにぎやか＿＿＿。"
          }
        }
      },
      {
        "japanese": "彼は元気でした。",
        "romaji": "Kare wa genki deshita.",
        "german": "Er war gesund / Es ging ihm gut."
      }
    ],
    "notes": "Die Konjugation von な-Adjektiven folgt dem gleichen Muster wie bei Nomen + です/でした/じゃない/じゃなかった.",
    "related": [
      "na-adj-present",
      "na-adj-negative",
      "na-adj-past-negative",
      "deshita"
    ]
  },
  {
    "id": "na-adj-past-negative",
    "pattern": "な-Adjektiv + じゃなかった",
    "level": "N5",
    "category": "Adjektive",
    "meaning": "な-Adjektiv Vergangenheit (negativ)",
    "explanation": "Für die verneinte Vergangenheitsform eines な-Adjektivs wird じゃなかったです oder ではありませんでした verwendet.",
    "formation": "な-Adjektiv + じゃなかったです / ではありませんでした",
    "examples": [
      {
        "japanese": "昨日は暇じゃなかったです。",
        "romaji": "Kinō wa hima ja nakatta desu.",
        "german": "Gestern hatte ich keine Freizeit.",
        "cloze": {
          "start": 4,
          "answer": "じゃなかったです",
          "quiz": {
            "level": "N5",
            "japanese": "昨日は暇じゃなかったです。",
            "german": "Gestern hatte ich keine Freizeit.",
            "start": 4,
            "answer": "じゃなかったです",
            "acceptedAnswers": [
              "じゃなかったです"
            ],
            "distractors": [
              {
                "text": "でした",
                "reason": "Dies besagt, dass Freizeit vorhanden war."
              },
              {
                "text": "かったです",
                "reason": "暇 ist ein な-Adjektiv."
              },
              {
                "text": "くなかったです",
                "reason": "暇 bildet seine Verneinung nicht wie ein い-Adjektiv."
              }
            ],
            "promptKana": "きのうはひま＿＿＿。"
          }
        }
      },
      {
        "japanese": "あの店は有名じゃなかったです。",
        "romaji": "Ano mise wa yūmei ja nakatta desu.",
        "german": "Dieses Geschäft war nicht berühmt."
      }
    ],
    "notes": "Auch hier gilt: じゃなかったです ist umgangssprachlicher, ではありませんでした ist formeller.",
    "related": [
      "na-adj-present",
      "na-adj-negative",
      "na-adj-past",
      "ja-nakatta"
    ]
  },
  {
    "id": "ku-naru-ni-naru",
    "pattern": "～くなる / ～になる",
    "level": "N5",
    "category": "Adjektive",
    "meaning": "... werden (Veränderung)",
    "explanation": "～くなる und ～になる drücken eine Veränderung des Zustands aus ('etwas wird zu etwas'). い-Adjektive verwenden ～くなる, な-Adjektive und Nomen verwenden ～になる.",
    "formation": "い-Adj (ohne い) + くなる / な-Adj + になる / Nomen + になる",
    "examples": [
      {
        "japanese": "日本語が上手になりました。",
        "romaji": "Nihongo ga jōzu ni narimashita.",
        "german": "Mein Japanisch ist besser geworden.",
        "cloze": {
          "start": 6,
          "answer": "になりました",
          "quiz": {
            "level": "N5",
            "japanese": "日本語が上手になりました。",
            "german": "Mein Japanisch ist besser geworden.",
            "start": 6,
            "answer": "になりました",
            "acceptedAnswers": [
              "になりました"
            ],
            "distractors": [
              {
                "text": "くなりました",
                "reason": "上手 ist ein な-Adjektiv und verlangt に."
              },
              {
                "text": "になりません",
                "reason": "Dies verneint die Veränderung."
              },
              {
                "text": "になるでした",
                "reason": "Die höfliche Vergangenheit lautet なりました."
              }
            ],
            "promptKana": "にほんごがじょうず＿＿＿。"
          }
        }
      },
      {
        "japanese": "最近寒くなりましたね。",
        "romaji": "Saikin samuku narimashita ne.",
        "german": "In letzter Zeit ist es kalt geworden, nicht wahr?"
      }
    ],
    "notes": "くなる/になる beschreibt eine natürliche oder automatische Veränderung. Für absichtliche Veränderungen verwendet man くする/にする.",
    "related": [
      "i-adj-present",
      "na-adj-present"
    ]
  },
  {
    "id": "no-ga-suki",
    "pattern": "～のが好き / 上手 / 下手",
    "level": "N5",
    "category": "Adjektive",
    "meaning": "Gern tun / Gut können / Schlecht können",
    "explanation": "Mit ～のが können Verben nominalisiert werden, um sie mit Adjektiven wie 好き (mögen), 上手 (gut in), 下手 (schlecht in) zu kombinieren.",
    "formation": "Verb (Wörterbuchform) + のが + 好き/上手/下手 + です",
    "examples": [
      {
        "japanese": "料理を作るのが好きです。",
        "cloze": {
          "start": 5,
          "answer": "のが好き",
          "quiz": {
            "level": "N5",
            "japanese": "料理を作るのが好きです。",
            "german": "Ich koche gerne.",
            "start": 5,
            "answer": "のが好き",
            "acceptedAnswers": [
              "のが好き",
              "ことが好き"
            ],
            "distractors": [
              {
                "text": "が好き",
                "reason": "Das Verb braucht hier eine Nominalisierung mit の oder こと."
              },
              {
                "text": "のが嫌い",
                "reason": "Dies bedeutet ungern kochen."
              },
              {
                "text": "のを好き",
                "reason": "好き verlangt hier が, nicht を."
              }
            ],
            "promptKana": "りょうりをつくる＿＿＿です。"
          }
        },
        "romaji": "Ryōri o tsukuru no ga suki desu.",
        "german": "Ich koche gerne."
      },
      {
        "japanese": "歌を歌うのが下手です。",
        "cloze": {
          "start": 6,
          "answer": "下手"
        },
        "romaji": "Uta o utau no ga heta desu.",
        "german": "Ich bin schlecht im Singen."
      }
    ],
    "notes": "上手 und 下手 verwendet man nicht für sich selbst in der höflichen Sprache. Für sich selbst sagt man eher 得意 (tokui, gut in) oder 苦手 (nigate, schlecht in).",
    "related": [
      "no"
    ]
  },
  {
    "id": "desu",
    "pattern": "～です",
    "level": "N5",
    "category": "Satzstrukturen",
    "meaning": "Sein (höfliche Kopula)",
    "explanation": "です ist die höfliche Form der Kopula und bedeutet 'sein'. Es wird nach Nomen und な-Adjektiven verwendet, um höfliche Aussagen zu machen.",
    "formation": "Nomen + です / な-Adjektiv + です",
    "examples": [
      {
        "japanese": "私は田中です。",
        "cloze": {
          "start": 4,
          "answer": "です",
          "quiz": {
            "level": "N5",
            "japanese": "私は田中です。",
            "german": "Ich bin Tanaka.",
            "start": 4,
            "answer": "です",
            "acceptedAnswers": [
              "です"
            ],
            "distractors": [
              {
                "text": "ます",
                "reason": "Ein Name bekommt keine verbale ます-Endung."
              },
              {
                "text": "くないです",
                "reason": "Ein Name ist kein い-Adjektiv."
              },
              {
                "text": "じゃないです",
                "reason": "Dies verneint die Identität."
              }
            ],
            "promptKana": "わたしはたなか＿＿＿。"
          }
        },
        "romaji": "Watashi wa Tanaka desu.",
        "german": "Ich bin Tanaka."
      },
      {
        "japanese": "これはペンです。",
        "cloze": {
          "start": 5,
          "answer": "です"
        },
        "romaji": "Kore wa pen desu.",
        "german": "Das ist ein Stift."
      }
    ],
    "notes": "です wird nicht mit い-Adjektiven als Kopula verwendet – es wird nur zur Höflichkeit angehängt: 暑いです. Bei Verben wird ます verwendet, nicht です.",
    "related": [
      "ja-nai",
      "deshita",
      "ja-nakatta"
    ]
  },
  {
    "id": "ja-nai",
    "pattern": "～じゃない",
    "level": "N5",
    "category": "Satzstrukturen",
    "meaning": "Ist nicht (Verneinung von です)",
    "explanation": "～じゃないです oder ～ではありません ist die Verneinung von です. Es bedeutet 'ist nicht' oder 'bin nicht'. じゃない ist umgangssprachlicher, ではありません ist formeller.",
    "formation": "Nomen + じゃないです / ではありません",
    "examples": [
      {
        "japanese": "学生じゃないです。",
        "cloze": {
          "start": 2,
          "answer": "じゃない",
          "quiz": {
            "level": "N5",
            "japanese": "学生じゃないです。",
            "german": "Ich bin kein Student.",
            "start": 2,
            "answer": "じゃない",
            "acceptedAnswers": [
              "じゃない",
              "ではない"
            ],
            "distractors": [
              {
                "text": "くない",
                "reason": "Nomen werden nicht mit くない verneint."
              },
              {
                "text": "なかった",
                "reason": "Dies ist keine selbstständige Kopulaverneinung nach einem Nomen."
              },
              {
                "text": "だった",
                "reason": "だったです ist hier nicht die reguläre höfliche Verneinung."
              }
            ],
            "promptKana": "がくせい＿＿＿です。"
          }
        },
        "romaji": "Gakusei ja nai desu.",
        "german": "Ich bin kein Student."
      },
      {
        "japanese": "これは私のではありません。",
        "romaji": "Kore wa watashi no dewa arimasen.",
        "german": "Das gehört nicht mir."
      }
    ],
    "notes": "じゃ ist die Kurzform von では. Beide Formen sind korrekt: じゃないです (Umgangssprache) und ではありません (formell).",
    "related": [
      "desu",
      "deshita",
      "ja-nakatta"
    ]
  },
  {
    "id": "deshita",
    "pattern": "～でした",
    "level": "N5",
    "category": "Satzstrukturen",
    "meaning": "War (Vergangenheit von です)",
    "explanation": "～でした ist die Vergangenheitsform von です. Es bedeutet 'war' oder 'waren'.",
    "formation": "Nomen + でした / な-Adjektiv + でした",
    "examples": [
      {
        "japanese": "昨日は日曜日でした。",
        "cloze": {
          "start": 6,
          "answer": "でした",
          "quiz": {
            "level": "N5",
            "japanese": "昨日は日曜日でした。",
            "german": "Gestern war Sonntag.",
            "start": 6,
            "answer": "でした",
            "acceptedAnswers": [
              "でした"
            ],
            "distractors": [
              {
                "text": "ます",
                "reason": "Nomen erhalten keine verbale ます-Endung."
              },
              {
                "text": "かったです",
                "reason": "Nomen erhalten keine い-Adjektiv-Vergangenheit."
              },
              {
                "text": "じゃありませんでした",
                "reason": "Dies verneint, dass Sonntag war."
              }
            ],
            "promptKana": "きのうはにちようび＿＿＿。"
          }
        },
        "romaji": "Kinō wa nichiyōbi deshita.",
        "german": "Gestern war Sonntag."
      },
      {
        "japanese": "とても大変でした。",
        "cloze": {
          "start": 5,
          "answer": "でした"
        },
        "romaji": "Totemo taihen deshita.",
        "german": "Es war sehr anstrengend."
      }
    ],
    "notes": "でした wird für Nomen und な-Adjektive verwendet. Für い-Adjektive in der Vergangenheit wird ～かったです verwendet, nicht ～いでした.",
    "related": [
      "desu",
      "ja-nai",
      "ja-nakatta"
    ]
  },
  {
    "id": "ja-nakatta",
    "pattern": "～じゃなかった",
    "level": "N5",
    "category": "Satzstrukturen",
    "meaning": "War nicht (Vergangenheit, negativ)",
    "explanation": "～じゃなかったです oder ～ではありませんでした ist die verneinte Vergangenheitsform von です. Es bedeutet 'war nicht'.",
    "formation": "Nomen + じゃなかったです / ではありませんでした",
    "examples": [
      {
        "japanese": "あの人は先生じゃなかったです。",
        "cloze": {
          "start": 6,
          "answer": "じゃなかった",
          "quiz": {
            "level": "N5",
            "japanese": "あの人は先生じゃなかったです。",
            "german": "Diese Person war kein Lehrer.",
            "start": 6,
            "answer": "じゃなかった",
            "acceptedAnswers": [
              "じゃなかった",
              "ではなかった"
            ],
            "distractors": [
              {
                "text": "だった",
                "reason": "Dies bejaht die Lehrerrolle statt sie zu verneinen."
              },
              {
                "text": "くなかった",
                "reason": "Ein Nomen wird nicht mit くなかった verneint."
              },
              {
                "text": "じゃない",
                "reason": "Dies ist Gegenwart statt der gefragten Vergangenheit."
              }
            ],
            "promptKana": "あのひとはせんせい＿＿＿です。"
          }
        },
        "romaji": "Ano hito wa sensei ja nakatta desu.",
        "german": "Diese Person war kein Lehrer."
      },
      {
        "japanese": "天気はよくありませんでした。",
        "romaji": "Tenki wa yoku arimasen deshita.",
        "german": "Das Wetter war nicht gut."
      }
    ],
    "notes": "Die vier Formen bilden ein System: です → じゃない → でした → じゃなかった. Dieses System gilt für Nomen und な-Adjektive.",
    "related": [
      "desu",
      "ja-nai",
      "deshita"
    ]
  },
  {
    "id": "n-desu",
    "pattern": "～んです / ～のです",
    "level": "N5",
    "category": "Satzstrukturen",
    "meaning": "Es ist so, dass... (Erklärung/Betonung)",
    "explanation": "～んです wird verwendet, um eine Erklärung zu geben, nach einer Erklärung zu fragen oder eine Aussage zu betonen. Es signalisiert, dass der Sprecher den Kontext erklären möchte.",
    "formation": "Verb/い-Adj + んです / な-Adj + なんです / Nomen + なんです",
    "examples": [
      {
        "japanese": "どうしたんですか。",
        "cloze": {
          "start": 4,
          "answer": "んです",
          "quiz": {
            "level": "N5",
            "japanese": "どうしたんですか。",
            "german": "Was ist los? / Was ist passiert?",
            "start": 4,
            "answer": "んです",
            "acceptedAnswers": [
              "んです",
              "のです"
            ],
            "distractors": [
              {
                "text": "なです",
                "reason": "Ein verbaler Aussagesatz wird hier nicht mit なです verbunden."
              },
              {
                "text": "にです",
                "reason": "にです ist hier kein erklärender Anschluss."
              },
              {
                "text": "をです",
                "reason": "をです ist hier kein erklärender Anschluss."
              }
            ],
            "promptKana": "どうした＿＿＿か。"
          }
        },
        "romaji": "Dō shita n desu ka.",
        "german": "Was ist los? / Was ist passiert?"
      },
      {
        "japanese": "明日テストがあるんです。",
        "cloze": {
          "start": 8,
          "answer": "んです"
        },
        "romaji": "Ashita tesuto ga aru n desu.",
        "german": "Es ist nämlich so, dass morgen ein Test ist."
      }
    ],
    "notes": "んです (gesprochene Form) und のです (geschriebene Form) sind austauschbar. ～んですか klingt natürlicher als ～ますか, wenn man den Grund für etwas erfragt.",
    "related": []
  },
  {
    "id": "to-omoimasu",
    "pattern": "～と思います",
    "level": "N5",
    "category": "Satzstrukturen",
    "meaning": "Ich denke, dass...",
    "explanation": "～と思います drückt die eigene Meinung oder Vermutung aus. Es entspricht dem deutschen 'Ich denke, dass...'. Für die Meinungen anderer verwendet man ～と思っています.",
    "formation": "Satz (informelle Form) + と思います",
    "examples": [
      {
        "japanese": "明日は雨が降ると思います。",
        "cloze": {
          "start": 7,
          "answer": "と思います",
          "quiz": {
            "level": "N5",
            "japanese": "明日は雨が降ると思います。",
            "german": "Ich denke, dass es morgen regnen wird.",
            "start": 7,
            "answer": "と思います",
            "acceptedAnswers": [
              "と思います"
            ],
            "distractors": [
              {
                "text": "を思います",
                "reason": "Ein vollständiger Gedanke wird mit と zitiert."
              },
              {
                "text": "に思います",
                "reason": "に verbindet hier keinen zitierten Satz."
              },
              {
                "text": "が思います",
                "reason": "が ersetzt hier die Zitatpartikel nicht."
              }
            ],
            "promptKana": "あしたはあめがふる＿＿＿。"
          }
        },
        "romaji": "Ashita wa ame ga furu to omoimasu.",
        "german": "Ich denke, dass es morgen regnen wird."
      },
      {
        "japanese": "この本はおもしろいと思います。",
        "cloze": {
          "start": 9,
          "answer": "と思います"
        },
        "romaji": "Kono hon wa omoshiroi to omoimasu.",
        "german": "Ich denke, dieses Buch ist interessant."
      }
    ],
    "notes": "Vor と思います steht die informelle Form, nicht die ます-Form: 行くと思います (richtig), 行きますと思います (falsch).",
    "related": [
      "deshou",
      "kamoshirenai"
    ]
  },
  {
    "id": "deshou",
    "pattern": "～でしょう",
    "level": "N5",
    "category": "Satzstrukturen",
    "meaning": "Wahrscheinlich / Vermutlich",
    "explanation": "～でしょう drückt eine Vermutung aus und bedeutet 'wahrscheinlich' oder 'es wird wohl...'. Es ist weniger sicher als eine direkte Aussage, aber sicherer als かもしれない.",
    "formation": "Verb/い-Adj (informelle Form) + でしょう / な-Adj/Nomen + でしょう",
    "examples": [
      {
        "japanese": "明日は暖かいでしょう。",
        "cloze": {
          "start": 6,
          "answer": "でしょう",
          "quiz": {
            "level": "N5",
            "japanese": "明日は暖かいでしょう。",
            "german": "Morgen wird es wahrscheinlich warm sein.",
            "start": 6,
            "answer": "でしょう",
            "acceptedAnswers": [
              "でしょう"
            ],
            "distractors": [
              {
                "text": "でした",
                "reason": "暖かいでした ist keine reguläre Adjektivform."
              },
              {
                "text": "ました",
                "reason": "Ein い-Adjektiv nimmt kein ました an."
              },
              {
                "text": "くでしょう",
                "reason": "Die Vermutung steht nach 暖かい, nicht 暖かいく."
              }
            ],
            "promptKana": "あしたはあたたかい＿＿＿。"
          }
        },
        "romaji": "Ashita wa atatakai deshō.",
        "german": "Morgen wird es wahrscheinlich warm sein."
      },
      {
        "japanese": "彼はもう帰ったでしょう。",
        "cloze": {
          "start": 7,
          "answer": "でしょう"
        },
        "romaji": "Kare wa mō kaetta deshō.",
        "german": "Er ist wohl schon nach Hause gegangen."
      }
    ],
    "notes": "でしょう wird oft im Wetterbericht verwendet. Mit steigender Intonation (でしょう？) sucht man nach Bestätigung: そうでしょう？ (Nicht wahr?).",
    "related": [
      "to-omoimasu",
      "kamoshirenai"
    ]
  },
  {
    "id": "kamoshirenai",
    "pattern": "～かもしれない",
    "level": "N4",
    "category": "Satzstrukturen",
    "meaning": "Vielleicht / Könnte sein, dass...",
    "explanation": "～かもしれない drückt eine unsichere Vermutung aus. Es bedeutet 'vielleicht' oder 'es könnte sein, dass...'. Die höfliche Form ist ～かもしれません.",
    "formation": "Verb/い-Adj (informelle Form) + かもしれない / な-Adj/Nomen + かもしれない",
    "examples": [
      {
        "japanese": "雨が降るかもしれません。",
        "romaji": "Ame ga furu kamoshiremasen.",
        "german": "Vielleicht wird es regnen.",
        "cloze": {
          "start": 4,
          "answer": "かもしれません",
          "quiz": {
            "level": "N4",
            "japanese": "雨が降るかもしれません。",
            "german": "Vielleicht wird es regnen.",
            "start": 4,
            "answer": "かもしれません",
            "acceptedAnswers": [
              "かもしれません"
            ],
            "distractors": [
              {
                "text": "かもしれます",
                "reason": "Die feste Möglichkeitsform lautet かもしれません."
              },
              {
                "text": "かもします",
                "reason": "Dies ist keine Form des Möglichkeitsausdrucks."
              },
              {
                "text": "なのかもしれません",
                "reason": "Nach einem Verb wird hier kein な eingefügt."
              }
            ],
            "promptKana": "あめがふる＿＿＿。"
          }
        }
      },
      {
        "japanese": "あの人は日本人かもしれません。",
        "romaji": "Ano hito wa nihonjin kamoshiremasen.",
        "german": "Diese Person könnte Japaner sein."
      }
    ],
    "notes": "Sicherheitsgrad: かもしれない (vielleicht, ~30%) < でしょう (wahrscheinlich, ~70%) < と思います (ich denke, persönliche Meinung).",
    "related": [
      "deshou",
      "to-omoimasu"
    ]
  },
  {
    "id": "ga-aru",
    "pattern": "～がある",
    "level": "N5",
    "category": "Satzstrukturen",
    "meaning": "Es gibt (unbelebte Dinge)",
    "explanation": "～がある wird verwendet, um die Existenz von unbelebten Dingen (Gegenstände, Pflanzen, Gebäude, Ereignisse) auszudrücken. Die höfliche Form ist ～があります.",
    "formation": "Nomen + がある / があります",
    "examples": [
      {
        "japanese": "机の上に本があります。",
        "romaji": "Tsukue no ue ni hon ga arimasu.",
        "german": "Auf dem Tisch liegt ein Buch.",
        "cloze": {
          "start": 5,
          "answer": "があります",
          "quiz": {
            "level": "N5",
            "japanese": "机の上に本があります。",
            "german": "Auf dem Tisch liegt ein Buch.",
            "start": 5,
            "answer": "があります",
            "acceptedAnswers": [
              "があります",
              "はあります"
            ],
            "distractors": [
              {
                "text": "がいます",
                "reason": "Ein Buch ist hier kein belebtes Wesen."
              },
              {
                "text": "をあります",
                "reason": "あります nimmt kein direktes Objekt."
              },
              {
                "text": "がありません",
                "reason": "Dies verneint das vorhandene Buch."
              }
            ],
            "promptKana": "つくえのうえにほん＿＿＿。"
          }
        }
      },
      {
        "japanese": "明日テストがあります。",
        "romaji": "Ashita tesuto ga arimasu.",
        "german": "Morgen gibt es einen Test."
      }
    ],
    "notes": "ある wird für unbelebte Dinge verwendet, いる für belebte Wesen (Menschen, Tiere). Bei Veranstaltungen/Ereignissen wird auch ある verwendet.",
    "related": [
      "ga-iru",
      "ga"
    ]
  },
  {
    "id": "ga-iru",
    "pattern": "～がいる",
    "level": "N5",
    "category": "Satzstrukturen",
    "meaning": "Es gibt (belebte Wesen)",
    "explanation": "～がいる wird verwendet, um die Existenz von belebten Wesen (Menschen, Tiere) auszudrücken. Die höfliche Form ist ～がいます.",
    "formation": "Nomen + がいる / がいます",
    "examples": [
      {
        "japanese": "公園に子供がいます。",
        "romaji": "Kōen ni kodomo ga imasu.",
        "german": "Im Park sind Kinder.",
        "cloze": {
          "start": 5,
          "answer": "がいます",
          "quiz": {
            "level": "N5",
            "japanese": "公園に子供がいます。",
            "german": "Im Park sind Kinder.",
            "start": 5,
            "answer": "がいます",
            "acceptedAnswers": [
              "がいます",
              "はいます"
            ],
            "distractors": [
              {
                "text": "があります",
                "reason": "Menschen werden hier mit いる beschrieben."
              },
              {
                "text": "をいます",
                "reason": "います nimmt hier kein direktes Objekt."
              },
              {
                "text": "がいません",
                "reason": "Dies verneint die Anwesenheit."
              }
            ],
            "promptKana": "こうえんにこども＿＿＿。"
          }
        }
      },
      {
        "japanese": "私は兄弟が三人います。",
        "romaji": "Watashi wa kyōdai ga sannin imasu.",
        "german": "Ich habe drei Geschwister."
      }
    ],
    "notes": "Faustregel: Alles, was sich von selbst bewegen kann, verwendet いる. Pflanzen und Autos verwenden ある, obwohl sie 'lebendig' sind bzw. sich bewegen.",
    "related": [
      "ga-aru",
      "ga"
    ]
  },
  {
    "id": "ga-hoshii",
    "pattern": "～が欲しい",
    "level": "N5",
    "category": "Satzstrukturen",
    "meaning": "Etwas haben wollen",
    "explanation": "～が欲しい drückt den Wunsch aus, etwas zu besitzen oder zu bekommen. Es wird wie ein い-Adjektiv konjugiert und nur für die eigenen Wünsche verwendet.",
    "formation": "Nomen + が欲しい(です)",
    "examples": [
      {
        "japanese": "新しいパソコンが欲しいです。",
        "cloze": {
          "start": 7,
          "answer": "が欲しい",
          "quiz": {
            "level": "N5",
            "japanese": "新しいパソコンが欲しいです。",
            "german": "Ich möchte einen neuen Computer.",
            "start": 7,
            "answer": "が欲しい",
            "acceptedAnswers": [
              "が欲しい",
              "は欲しい"
            ],
            "distractors": [
              {
                "text": "に欲しい",
                "reason": "Der gewünschte Gegenstand wird nicht mit に markiert."
              },
              {
                "text": "が欲しくない",
                "reason": "Dies verneint den Wunsch."
              },
              {
                "text": "が欲しいでした",
                "reason": "欲しい bildet Vergangenheit nicht mit でした."
              }
            ],
            "promptKana": "あたらしいパソコン＿＿＿です。"
          }
        },
        "romaji": "Atarashii pasokon ga hoshii desu.",
        "german": "Ich möchte einen neuen Computer."
      },
      {
        "japanese": "何が欲しいですか。",
        "cloze": {
          "start": 1,
          "answer": "が欲しい"
        },
        "romaji": "Nani ga hoshii desu ka.",
        "german": "Was möchten Sie haben?"
      }
    ],
    "notes": "欲しい ist für Dinge (Nomen), たい ist für Handlungen (Verben). Für andere Personen verwendet man ～欲しがっている.",
    "related": [
      "tai"
    ]
  },
  {
    "id": "tsumori",
    "pattern": "～つもり",
    "level": "N5",
    "category": "Satzstrukturen",
    "meaning": "Vorhaben / Beabsichtigen",
    "explanation": "～つもり drückt eine feste Absicht oder einen Plan aus. Es bedeutet 'Ich habe vor...' oder 'Ich beabsichtige...'. Die Verneinung kann auf zwei Arten gebildet werden.",
    "formation": "Verb (Wörterbuchform) + つもりです / Verb ない-Form + つもりです",
    "examples": [
      {
        "japanese": "来年日本に行くつもりです。",
        "cloze": {
          "start": 7,
          "answer": "つもり",
          "quiz": {
            "level": "N5",
            "japanese": "来年日本に行くつもりです。",
            "german": "Ich habe vor, nächstes Jahr nach Japan zu gehen.",
            "start": 7,
            "answer": "つもり",
            "acceptedAnswers": [
              "つもり"
            ],
            "distractors": [
              {
                "text": "ながら",
                "reason": "ながら verlangt den Verbstamm und bildet hier kein Nomen vor です."
              },
              {
                "text": "てから",
                "reason": "行くてから ist kein korrekter Anschluss."
              },
              {
                "text": "ました",
                "reason": "行くましたです ist keine Verbform."
              }
            ],
            "promptKana": "らいねんにほんにいく＿＿＿です。"
          }
        },
        "romaji": "Rainen Nihon ni iku tsumori desu.",
        "german": "Ich habe vor, nächstes Jahr nach Japan zu gehen."
      },
      {
        "japanese": "もうお酒を飲まないつもりです。",
        "cloze": {
          "start": 9,
          "answer": "つもり"
        },
        "romaji": "Mō osake o nomanai tsumori desu.",
        "german": "Ich habe vor, keinen Alkohol mehr zu trinken."
      }
    ],
    "notes": "つもり drückt eine persönliche Absicht aus. Für Pläne anderer verwendet man ～予定 (yotei) oder fragt direkt.",
    "related": []
  },
  {
    "id": "yori",
    "pattern": "～より",
    "level": "N5",
    "category": "Satzstrukturen",
    "meaning": "Als / Im Vergleich zu (Komparativ)",
    "explanation": "～より wird für Vergleiche verwendet und markiert das, womit verglichen wird. Es entspricht dem deutschen 'als' in Vergleichen.",
    "formation": "B + より + A + のほうが + Adjektiv",
    "examples": [
      {
        "japanese": "東京は大阪より大きいです。",
        "cloze": {
          "start": 5,
          "answer": "より",
          "quiz": {
            "level": "N5",
            "japanese": "東京は大阪より大きいです。",
            "german": "Tokio ist größer als Osaka.",
            "start": 5,
            "answer": "より",
            "acceptedAnswers": [
              "より"
            ],
            "distractors": [
              {
                "text": "まで",
                "reason": "まで setzt eine Grenze, keinen Vergleichsmaßstab."
              },
              {
                "text": "から",
                "reason": "から bezeichnet hier keinen Größenvergleich."
              },
              {
                "text": "へ",
                "reason": "へ bezeichnet eine Richtung, keinen Größenvergleich."
              }
            ],
            "promptKana": "とうきょうはおおさか＿＿＿おおきいです。"
          }
        },
        "romaji": "Tōkyō wa Ōsaka yori ōkii desu.",
        "german": "Tokio ist größer als Osaka."
      },
      {
        "japanese": "バスより電車のほうが速いです。",
        "cloze": {
          "start": 2,
          "answer": "より"
        },
        "romaji": "Basu yori densha no hō ga hayai desu.",
        "german": "Der Zug ist schneller als der Bus."
      }
    ],
    "notes": "より markiert den 'Verlierer' im Vergleich. Die vollständige Struktur ist: B より A のほうが ～. Man kann auch nur より verwenden: 東京は大阪より大きい.",
    "related": [
      "no-hou-ga",
      "ichiban"
    ]
  },
  {
    "id": "no-hou-ga",
    "pattern": "～のほうが",
    "level": "N5",
    "category": "Satzstrukturen",
    "meaning": "... ist mehr / ... ist eher (Komparativ)",
    "explanation": "～のほうが markiert die bevorzugte oder hervorgehobene Seite in einem Vergleich. Es wird oft mit ～より kombiniert.",
    "formation": "Nomen + のほうが + Adjektiv",
    "examples": [
      {
        "japanese": "夏より冬のほうが好きです。",
        "cloze": {
          "start": 4,
          "answer": "のほうが",
          "quiz": {
            "level": "N5",
            "japanese": "夏より冬のほうが好きです。",
            "german": "Ich mag den Winter lieber als den Sommer.",
            "start": 4,
            "answer": "のほうが",
            "acceptedAnswers": [
              "のほうが",
              "が"
            ],
            "distractors": [
              {
                "text": "のほうを",
                "reason": "好き verlangt hier が statt を."
              },
              {
                "text": "のほうに",
                "reason": "に markiert hier nicht das bevorzugte Vergleichsglied."
              },
              {
                "text": "のほどが",
                "reason": "のほどが ist nicht die gefragte Vergleichskonstruktion."
              }
            ],
            "promptKana": "なつよりふゆ＿＿＿すきです。"
          }
        },
        "romaji": "Natsu yori fuyu no hō ga suki desu.",
        "german": "Ich mag den Winter lieber als den Sommer."
      },
      {
        "japanese": "こっちのほうが安いです。",
        "cloze": {
          "start": 3,
          "answer": "のほうが"
        },
        "romaji": "Kocchi no hō ga yasui desu.",
        "german": "Dieses hier ist billiger."
      }
    ],
    "notes": "どちらのほうが (dochira no hō ga) wird als Frage verwendet: コーヒーとお茶とどちらのほうが好きですか。 (Was magst du lieber, Kaffee oder Tee?)",
    "related": [
      "yori",
      "ichiban"
    ]
  },
  {
    "id": "ichiban",
    "pattern": "～が一番",
    "level": "N5",
    "category": "Satzstrukturen",
    "meaning": "Am meisten / Am besten (Superlativ)",
    "explanation": "一番 (いちばん) bedeutet 'am meisten' oder 'Nummer eins' und wird für Superlative verwendet. Es steht vor dem Adjektiv.",
    "formation": "(Nomen + の中で) + Nomen + が一番 + Adjektiv",
    "examples": [
      {
        "japanese": "果物の中でりんごが一番好きです。",
        "cloze": {
          "start": 8,
          "answer": "が一番",
          "quiz": {
            "level": "N5",
            "japanese": "果物の中でりんごが一番好きです。",
            "german": "Unter den Früchten mag ich Äpfel am liebsten.",
            "start": 8,
            "answer": "が一番",
            "acceptedAnswers": [
              "が一番",
              "は一番"
            ],
            "distractors": [
              {
                "text": "が一つ",
                "reason": "一つ zählt ein Stück, nicht den höchsten Rang."
              },
              {
                "text": "を一番",
                "reason": "好き verlangt hier が statt を."
              },
              {
                "text": "に一番",
                "reason": "に markiert hier nicht den bevorzugten Gegenstand."
              }
            ],
            "promptKana": "くだもののなかでりんご＿＿＿すきです。"
          }
        },
        "romaji": "Kudamono no naka de ringo ga ichiban suki desu.",
        "german": "Unter den Früchten mag ich Äpfel am liebsten."
      },
      {
        "japanese": "日本で一番高い山は富士山です。",
        "romaji": "Nihon de ichiban takai yama wa Fujisan desu.",
        "german": "Der höchste Berg Japans ist der Fuji."
      }
    ],
    "notes": "Für Fragen verwendet man: ～の中で何/どこ/誰が一番～ですか。 (Was/Wo/Wer ist am meisten ~?)",
    "related": [
      "yori",
      "no-hou-ga"
    ]
  },
  {
    "id": "mada",
    "pattern": "まだ～",
    "level": "N5",
    "category": "Satzstrukturen",
    "meaning": "Noch / Noch nicht",
    "explanation": "まだ bedeutet 'noch' oder 'immer noch'. Mit einer positiven Form bedeutet es 'noch/immer noch', mit einer negativen Form bedeutet es 'noch nicht'.",
    "formation": "まだ + Verb/Adjektiv (positiv oder negativ)",
    "examples": [
      {
        "japanese": "まだ雨が降っています。",
        "romaji": "Mada ame ga futte imasu.",
        "german": "Es regnet immer noch.",
        "cloze": {
          "start": 0,
          "answer": "まだ",
          "quiz": {
            "level": "N5",
            "japanese": "まだ雨が降っています。",
            "german": "Es regnet immer noch.",
            "start": 0,
            "answer": "まだ",
            "acceptedAnswers": [
              "まだ"
            ],
            "distractors": [
              {
                "text": "もうすぐ",
                "reason": "Dies bedeutet bald statt immer noch."
              },
              {
                "text": "これから",
                "reason": "Dies bedeutet von jetzt an statt immer noch."
              },
              {
                "text": "きのう",
                "reason": "Dies bedeutet gestern statt immer noch."
              }
            ],
            "promptKana": "＿＿＿あめがふっています。"
          }
        }
      },
      {
        "japanese": "まだ食べていません。",
        "romaji": "Mada tabete imasen.",
        "german": "Ich habe noch nicht gegessen."
      }
    ],
    "notes": "Auf die Frage もう～ましたか (Haben Sie schon...?) antwortet man mit: はい、もう～ました (Ja, schon) oder いいえ、まだです (Nein, noch nicht).",
    "related": [
      "mou"
    ]
  },
  {
    "id": "mou",
    "pattern": "もう～",
    "level": "N5",
    "category": "Satzstrukturen",
    "meaning": "Schon / Bereits / Nicht mehr",
    "explanation": "もう bedeutet 'schon' oder 'bereits' mit positiver Form. Mit negativer Form bedeutet es 'nicht mehr'. Es drückt aus, dass eine Veränderung stattgefunden hat.",
    "formation": "もう + Verb (positiv: schon / negativ: nicht mehr)",
    "examples": [
      {
        "japanese": "もう宿題をしました。",
        "romaji": "Mō shukudai o shimashita.",
        "german": "Ich habe die Hausaufgaben schon gemacht.",
        "cloze": {
          "start": 0,
          "answer": "もう",
          "quiz": {
            "level": "N5",
            "japanese": "もう宿題をしました。",
            "german": "Ich habe die Hausaufgaben schon gemacht.",
            "start": 0,
            "answer": "もう",
            "acceptedAnswers": [
              "もう",
              "すでに"
            ],
            "distractors": [
              {
                "text": "あした",
                "reason": "Dies bedeutet morgen statt schon."
              },
              {
                "text": "これから",
                "reason": "Dies bedeutet von jetzt an statt schon."
              },
              {
                "text": "もうすぐ",
                "reason": "Dies bedeutet bald statt bereits abgeschlossen."
              }
            ],
            "promptKana": "＿＿＿しゅくだいをしました。"
          }
        }
      },
      {
        "japanese": "もう食べません。",
        "romaji": "Mō tabemasen.",
        "german": "Ich esse nicht mehr."
      }
    ],
    "notes": "もう一度 (mō ichido) bedeutet 'noch einmal' – hier hat もう eine andere Bedeutung. もう und まだ sind Gegensatzpaare.",
    "related": [
      "mada"
    ]
  },
  {
    "id": "dake",
    "pattern": "～だけ",
    "level": "N5",
    "category": "Satzstrukturen",
    "meaning": "Nur / Bloß",
    "explanation": "～だけ bedeutet 'nur' oder 'bloß' und schränkt etwas ein. Es kann nach Nomen, Verben und Zahlen verwendet werden.",
    "formation": "Nomen + だけ / Verb + だけ",
    "examples": [
      {
        "japanese": "水だけ飲みます。",
        "cloze": {
          "start": 1,
          "answer": "だけ",
          "quiz": {
            "level": "N5",
            "japanese": "水だけ飲みます。",
            "german": "Ich trinke nur Wasser.",
            "start": 1,
            "answer": "だけ",
            "acceptedAnswers": [
              "だけ"
            ],
            "distractors": [
              {
                "text": "まで",
                "reason": "まで drückt hier sogar Wasser statt nur Wasser aus."
              },
              {
                "text": "へ",
                "reason": "Eine Richtung kennzeichnet das Getränk nicht."
              },
              {
                "text": "しか",
                "reason": "しか verlangt eine negative Verbform."
              }
            ],
            "promptKana": "みず＿＿＿のみます。"
          }
        },
        "romaji": "Mizu dake nomimasu.",
        "german": "Ich trinke nur Wasser."
      },
      {
        "japanese": "少しだけ食べました。",
        "cloze": {
          "start": 2,
          "answer": "だけ"
        },
        "romaji": "Sukoshi dake tabemashita.",
        "german": "Ich habe nur ein bisschen gegessen."
      }
    ],
    "notes": "だけ schränkt neutral ein, しか～ない betont stärker das Wenige/Einzige (nur, bloß ... und sonst nichts).",
    "related": [
      "shika-nai"
    ]
  },
  {
    "id": "shika-nai",
    "pattern": "～しか～ない",
    "level": "N5",
    "category": "Satzstrukturen",
    "meaning": "Nur / Nichts als (betont Begrenzung)",
    "explanation": "～しか～ない bedeutet 'nur' und betont, dass etwas wenig oder begrenzt ist. Es wird immer mit der negativen Verbform verwendet und drückt oft Enttäuschung oder Bedauern aus.",
    "formation": "Nomen + しか + Verb (negativ)",
    "examples": [
      {
        "japanese": "百円しかありません。",
        "romaji": "Hyaku-en shika arimasen.",
        "german": "Ich habe nur hundert Yen.",
        "cloze": {
          "start": 2,
          "answer": "しかありません",
          "quiz": {
            "level": "N5",
            "japanese": "百円しかありません。",
            "german": "Ich habe nur hundert Yen.",
            "start": 2,
            "answer": "しかありません",
            "acceptedAnswers": [
              "しかありません",
              "だけあります"
            ],
            "distractors": [
              {
                "text": "しかあります",
                "reason": "しか verlangt eine negative Form."
              },
              {
                "text": "だけありません",
                "reason": "Dies bedeutet gerade hundert Yen fehlen."
              },
              {
                "text": "がたくさんあります",
                "reason": "Dies behauptet eine große Menge statt nur hundert Yen."
              }
            ],
            "promptKana": "ひゃくえん＿＿＿。"
          }
        }
      },
      {
        "japanese": "日本語しか話せません。",
        "romaji": "Nihongo shika hanasemasen.",
        "german": "Ich kann nur Japanisch sprechen."
      }
    ],
    "notes": "しか ersetzt は、が und を, wird aber zu anderen Partikeln hinzugefügt: にしか、でしか. Unterschied zu だけ: しか betont die Begrenzung stärker.",
    "related": [
      "dake"
    ]
  },
  {
    "id": "toki",
    "pattern": "～時",
    "level": "N5",
    "category": "Satzstrukturen",
    "meaning": "Wenn / Als (zeitlich)",
    "explanation": "～時 (とき) bedeutet 'wenn' oder 'als' und gibt einen Zeitpunkt oder Zeitraum an. Es kann mit Verben, Adjektiven und Nomen verwendet werden.",
    "formation": "Verb (Wörterbuch-/た-Form) + 時 / い-Adj + 時 / な-Adj + な + 時 / Nomen + の + 時",
    "examples": [
      {
        "japanese": "日本に行った時、たくさん写真を撮りました。",
        "cloze": {
          "start": 6,
          "answer": "時",
          "quiz": {
            "level": "N5",
            "japanese": "日本に行った時、たくさん写真を撮りました。",
            "german": "Als ich nach Japan ging, habe ich viele Fotos gemacht.",
            "start": 6,
            "answer": "時",
            "acceptedAnswers": [
              "時",
              "際"
            ],
            "distractors": [
              {
                "text": "ながら",
                "reason": "ながら verlangt den Stamm, nicht 行った."
              },
              {
                "text": "前に",
                "reason": "前に verlangt hier die Wörterbuchform, nicht 行った."
              },
              {
                "text": "てから",
                "reason": "An 行った kann nicht zusätzlich てから angeschlossen werden."
              }
            ],
            "promptKana": "にほんにいった＿＿＿、たくさんしゃしんをとりました。"
          }
        },
        "romaji": "Nihon ni itta toki, takusan shashin o torimashita.",
        "german": "Als ich nach Japan ging, habe ich viele Fotos gemacht."
      },
      {
        "japanese": "暇な時、何をしますか。",
        "cloze": {
          "start": 2,
          "answer": "時"
        },
        "romaji": "Hima na toki, nani o shimasu ka.",
        "german": "Was machen Sie, wenn Sie frei haben?"
      }
    ],
    "notes": "Wörterbuchform + 時 = 'wenn/als man etwas tun wird'; た-Form + 時 = 'nachdem man etwas getan hat'. Der Unterschied ist subtil und kontextabhängig.",
    "related": [
      "tara"
    ]
  },
  {
    "id": "tara",
    "pattern": "～たら",
    "level": "N5",
    "category": "Satzstrukturen",
    "meaning": "Wenn / Falls / Nachdem",
    "explanation": "～たら drückt eine Bedingung aus: 'Wenn/Falls A passiert, dann B'. Es kann auch 'nachdem' bedeuten. Die Form wird aus der た-Form + ら gebildet.",
    "formation": "Verb た-Form + ら / い-Adj → ～かったら / な-Adj/Nomen → だったら",
    "examples": [
      {
        "japanese": "雨が降ったら、家にいます。",
        "cloze": {
          "start": 4,
          "answer": "たら",
          "quiz": {
            "level": "N5",
            "japanese": "雨が降ったら、家にいます。",
            "german": "Wenn es regnet, bleibe ich zu Hause.",
            "start": 4,
            "answer": "たら",
            "acceptedAnswers": [
              "たら"
            ],
            "distractors": [
              {
                "text": "れば",
                "reason": "降っれば ist keine Konditionalform."
              },
              {
                "text": "なら",
                "reason": "降っなら ist keine Anschlussform."
              },
              {
                "text": "ても",
                "reason": "降っても bedeutet selbst wenn statt die neutrale Bedingung."
              }
            ],
            "promptKana": "あめがふっ＿＿＿、いえにいます。"
          }
        },
        "romaji": "Ame ga futtara, ie ni imasu.",
        "german": "Wenn es regnet, bleibe ich zu Hause."
      },
      {
        "japanese": "安かったら買います。",
        "cloze": {
          "start": 3,
          "answer": "たら"
        },
        "romaji": "Yasukattara kaimasu.",
        "german": "Wenn es billig ist, kaufe ich es."
      }
    ],
    "notes": "たら ist die vielseitigste Konditionalform. Sie kann für hypothetische und reale Bedingungen verwendet werden. Im Gegensatz zu ～と wird たら auch für einmalige Situationen verwendet.",
    "related": [
      "toki"
    ]
  },
  {
    "id": "ga-but",
    "pattern": "～が (aber)",
    "level": "N5",
    "category": "Satzstrukturen",
    "meaning": "Aber / Jedoch",
    "explanation": "が wird als Konjunktion verwendet, um zwei Sätze mit gegensätzlichem oder ergänzendem Inhalt zu verbinden. Es bedeutet 'aber' oder 'jedoch'. Nicht verwechseln mit der Subjektpartikel が.",
    "formation": "Satz 1 + が、+ Satz 2",
    "examples": [
      {
        "japanese": "日本語は難しいですが、おもしろいです。",
        "romaji": "Nihongo wa muzukashii desu ga, omoshiroi desu.",
        "german": "Japanisch ist schwer, aber interessant.",
        "cloze": {
          "start": 9,
          "answer": "が",
          "quiz": {
            "level": "N5",
            "japanese": "日本語は難しいですが、おもしろいです。",
            "german": "Japanisch ist schwer, aber interessant.",
            "start": 9,
            "answer": "が",
            "acceptedAnswers": [
              "が",
              "けど",
              "けれど",
              "けれども",
              "のに"
            ],
            "distractors": [
              {
                "text": "ので",
                "reason": "Dies nennt einen Grund statt des vorgegebenen Gegensatzes."
              },
              {
                "text": "ます",
                "reason": "ですます verdoppelt unzulässig die höfliche Endung."
              },
              {
                "text": "を",
                "reason": "を verbindet hier keine gegensätzlichen Aussagen."
              }
            ],
            "promptKana": "にほんごはむずかしいです＿＿＿、おもしろいです。"
          }
        }
      },
      {
        "japanese": "すみませんが、もう一度言ってください。",
        "romaji": "Sumimasen ga, mō ichido itte kudasai.",
        "german": "Entschuldigung, aber bitte sagen Sie es noch einmal."
      }
    ],
    "notes": "が als Konjunktion ist formeller als けど. Es wird oft für höfliche Einleitungen verwendet: ～ですが... (Es ist so, dass... aber...).",
    "related": [
      "kedo"
    ]
  },
  {
    "id": "kedo",
    "pattern": "～けど / ～けれども",
    "level": "N5",
    "category": "Satzstrukturen",
    "meaning": "Aber / Obwohl (umgangssprachlich)",
    "explanation": "～けど ist die umgangssprachliche Version von が (aber). Die formellere Form ist ～けれども. Es verbindet zwei Sätze mit kontrastierendem Inhalt.",
    "formation": "Satz 1 (informell) + けど、+ Satz 2",
    "examples": [
      {
        "japanese": "高いけど、おいしいです。",
        "cloze": {
          "start": 2,
          "answer": "けど",
          "quiz": {
            "level": "N5",
            "japanese": "高いけど、おいしいです。",
            "german": "Es ist teuer, aber lecker.",
            "start": 2,
            "answer": "けど",
            "acceptedAnswers": [
              "けど",
              "が",
              "けれど",
              "けれども",
              "のに"
            ],
            "distractors": [
              {
                "text": "ので",
                "reason": "Dies nennt teuer als Grund statt einen Gegensatz."
              },
              {
                "text": "から",
                "reason": "Dies nennt einen Grund statt obwohl teuer."
              },
              {
                "text": "のため",
                "reason": "Nach dem い-Adjektiv ist のため hier kein korrekter Anschluss."
              }
            ],
            "promptKana": "たかい＿＿＿、おいしいです。"
          }
        },
        "romaji": "Takai kedo, oishii desu.",
        "german": "Es ist teuer, aber lecker."
      },
      {
        "japanese": "行きたいけど、時間がありません。",
        "cloze": {
          "start": 4,
          "answer": "けど"
        },
        "romaji": "Ikitai kedo, jikan ga arimasen.",
        "german": "Ich möchte gehen, aber ich habe keine Zeit."
      }
    ],
    "notes": "Formalitätsgrad: けど (am lockersten) → けれど → けれども (formell) → が (am formellsten). けど kann auch am Satzende stehen und den Satz offen lassen.",
    "related": [
      "ga-but"
    ]
  },
  {
    "id": "kara-because",
    "pattern": "～から (weil)",
    "level": "N5",
    "category": "Satzstrukturen",
    "meaning": "Weil / Deshalb",
    "explanation": "から nach einem Verb oder Adjektiv bedeutet 'weil'. Es gibt den Grund für die im Hauptsatz beschriebene Handlung an. Der Grund steht vor から.",
    "formation": "Satz (Grund) + から、+ Satz (Folge)",
    "examples": [
      {
        "japanese": "暑いから、窓を開けましょう。",
        "romaji": "Atsui kara, mado o akemashō.",
        "german": "Weil es heiß ist, lasst uns das Fenster öffnen.",
        "cloze": {
          "start": 2,
          "answer": "から",
          "quiz": {
            "level": "N5",
            "japanese": "暑いから、窓を開けましょう。",
            "german": "Weil es heiß ist, lasst uns das Fenster öffnen.",
            "start": 2,
            "answer": "から",
            "acceptedAnswers": [
              "から",
              "ので"
            ],
            "distractors": [
              {
                "text": "のため",
                "reason": "Nach 暑い ist のため kein korrekter Anschluss."
              },
              {
                "text": "なのに",
                "reason": "Nach 暑い wird kein な eingeschoben."
              },
              {
                "text": "けれど",
                "reason": "Dies stellt einen Gegensatz statt den genannten Grund her."
              }
            ],
            "promptKana": "あつい＿＿＿、まどをあけましょう。"
          }
        }
      },
      {
        "japanese": "明日テストがありますから、今日勉強します。",
        "romaji": "Ashita tesuto ga arimasu kara, kyō benkyō shimasu.",
        "german": "Weil morgen ein Test ist, lerne ich heute."
      }
    ],
    "notes": "から (weil) ist subjektiver als ので. から kann auch am Satzende stehen, um eine Begründung nachzuschieben: 行きません。高いですから。",
    "related": [
      "node",
      "kara"
    ]
  },
  {
    "id": "node",
    "pattern": "～ので",
    "level": "N5",
    "category": "Satzstrukturen",
    "meaning": "Weil / Da (höflicher als から)",
    "explanation": "～ので gibt einen Grund an und ist höflicher und objektiver als から. Es wird häufig in formelleren Situationen oder schriftlich verwendet.",
    "formation": "Verb/い-Adj (informelle Form) + ので / な-Adj + なので / Nomen + なので",
    "examples": [
      {
        "japanese": "病気なので、休みます。",
        "cloze": {
          "start": 3,
          "answer": "ので",
          "quiz": {
            "level": "N5",
            "japanese": "病気なので、休みます。",
            "german": "Da ich krank bin, mache ich Pause.",
            "start": 3,
            "answer": "ので",
            "acceptedAnswers": [
              "ので"
            ],
            "distractors": [
              {
                "text": "から",
                "reason": "病気なから ist keine Form; richtig wäre 病気だから."
              },
              {
                "text": "ため",
                "reason": "病気なため ist kein korrekter nominaler Anschluss."
              },
              {
                "text": "けど",
                "reason": "病気なけど ist kein korrekter Anschluss."
              }
            ],
            "promptKana": "びょうきな＿＿＿、やすみます。"
          }
        },
        "romaji": "Byōki na node, yasumimasu.",
        "german": "Da ich krank bin, mache ich Pause."
      },
      {
        "japanese": "電車が遅れたので、遅刻しました。",
        "cloze": {
          "start": 6,
          "answer": "ので"
        },
        "romaji": "Densha ga okureta node, chikoku shimashita.",
        "german": "Da der Zug Verspätung hatte, bin ich zu spät gekommen."
      }
    ],
    "notes": "ので klingt höflicher und weniger direkt als から. Bei Bitten und Entschuldigungen ist ので bevorzugt. Vor ので steht die informelle Form (na-Adj + なので).",
    "related": [
      "kara-because"
    ]
  },
  {
    "id": "noni",
    "pattern": "～のに",
    "level": "N4",
    "category": "Satzstrukturen",
    "meaning": "Obwohl / Trotzdem",
    "explanation": "～のに drückt einen Widerspruch oder Enttäuschung aus. Es bedeutet 'obwohl' oder 'trotzdem' und zeigt, dass das Ergebnis anders ist als erwartet.",
    "formation": "Verb/い-Adj (informelle Form) + のに / な-Adj + なのに / Nomen + なのに",
    "examples": [
      {
        "japanese": "たくさん勉強したのに、テストに落ちました。",
        "cloze": {
          "start": 8,
          "answer": "のに",
          "quiz": {
            "level": "N4",
            "japanese": "たくさん勉強したのに、テストに落ちました。",
            "german": "Obwohl ich viel gelernt habe, bin ich beim Test durchgefallen.",
            "start": 8,
            "answer": "のに",
            "acceptedAnswers": [
              "のに",
              "けれど",
              "けれども",
              "けど",
              "が"
            ],
            "distractors": [
              {
                "text": "ので",
                "reason": "Dies behauptet einen Grund statt des Gegensatzes."
              },
              {
                "text": "から",
                "reason": "Dies macht das Lernen zum Grund des Durchfallens."
              },
              {
                "text": "ために",
                "reason": "Dies nennt Ursache oder Zweck statt des unerwarteten Gegensatzes."
              }
            ],
            "promptKana": "たくさんべんきょうした＿＿＿、テストにおちました。"
          }
        },
        "romaji": "Takusan benkyō shita noni, tesuto ni ochimashita.",
        "german": "Obwohl ich viel gelernt habe, bin ich beim Test durchgefallen."
      },
      {
        "japanese": "約束したのに、来ませんでした。",
        "cloze": {
          "start": 4,
          "answer": "のに"
        },
        "romaji": "Yakusoku shita noni, kimasen deshita.",
        "german": "Obwohl er es versprochen hat, ist er nicht gekommen."
      }
    ],
    "notes": "のに drückt oft Enttäuschung oder Frustration aus. Es ist subjektiver als けれども und impliziert, dass das Ergebnis unerwünscht ist.",
    "related": [
      "kedo",
      "ga-but"
    ]
  },
  {
    "id": "nakereba-naranai",
    "pattern": "～なければならない",
    "level": "N5",
    "category": "Satzstrukturen",
    "meaning": "Müssen / Es ist notwendig zu...",
    "explanation": "～なければならない bedeutet 'müssen' oder 'es muss getan werden'. Es drückt eine Pflicht oder Notwendigkeit aus. Es gibt mehrere Kurzformen davon.",
    "formation": "Verb ない-Form (ohne い) + ければならない",
    "examples": [
      {
        "japanese": "毎日薬を飲まなければなりません。",
        "romaji": "Mainichi kusuri o nomanakereba narimasen.",
        "german": "Ich muss jeden Tag Medikamente nehmen.",
        "cloze": {
          "start": 6,
          "answer": "なければなりません",
          "quiz": {
            "level": "N5",
            "japanese": "毎日薬を飲まなければなりません。",
            "german": "Ich muss jeden Tag Medikamente nehmen.",
            "start": 6,
            "answer": "なければなりません",
            "acceptedAnswers": [
              "なければなりません",
              "なくてはいけません",
              "ないといけません"
            ],
            "distractors": [
              {
                "text": "なくてもいいです",
                "reason": "Dies hebt die Pflicht ausdrücklich auf."
              },
              {
                "text": "ないほうがいいです",
                "reason": "Dies rät vom Einnehmen ab."
              },
              {
                "text": "なくてはいけます",
                "reason": "Die Verpflichtung braucht die negative Endung いけません."
              }
            ],
            "promptKana": "まいにちくすりをのま＿＿＿。"
          }
        }
      },
      {
        "japanese": "宿題をしなければなりません。",
        "romaji": "Shukudai o shinakereba narimasen.",
        "german": "Ich muss Hausaufgaben machen."
      }
    ],
    "notes": "Kurzformen: ～なければならない → ～なければいけない → ～なきゃいけない → ～なきゃ (am kürzesten, Umgangssprache). Alle haben die gleiche Bedeutung.",
    "related": [
      "tewa-ikemasen",
      "nakutemo-ii"
    ]
  },
  {
    "id": "donna",
    "pattern": "どんな",
    "level": "N5",
    "category": "Satzstrukturen",
    "meaning": "Was für ein / Welche Art von",
    "explanation": "どんな ist ein Fragewort, das nach der Art oder Eigenschaft fragt. Es steht direkt vor einem Nomen und bedeutet 'Was für ein...?' oder 'Welche Art von...?'.",
    "formation": "どんな + Nomen",
    "examples": [
      {
        "japanese": "どんな音楽が好きですか。",
        "cloze": {
          "start": 0,
          "answer": "どんな",
          "quiz": {
            "level": "N5",
            "japanese": "どんな音楽が好きですか。",
            "german": "Was für Musik mögen Sie?",
            "start": 0,
            "answer": "どんな",
            "acceptedAnswers": [
              "どんな"
            ],
            "distractors": [
              {
                "text": "どう",
                "reason": "Vor einem Nomen steht hier das attributive どんな."
              },
              {
                "text": "だれ",
                "reason": "だれ fragt nach einer Person, nicht nach einer Musikart."
              },
              {
                "text": "どこ",
                "reason": "どこ fragt nach einem Ort, nicht nach einer Musikart."
              }
            ],
            "promptKana": "＿＿＿おんがくがすきですか。"
          }
        },
        "romaji": "Donna ongaku ga suki desu ka.",
        "german": "Was für Musik mögen Sie?"
      },
      {
        "japanese": "どんな人ですか。",
        "cloze": {
          "start": 0,
          "answer": "どんな"
        },
        "romaji": "Donna hito desu ka.",
        "german": "Was für eine Person ist er/sie?"
      }
    ],
    "notes": "どんな gehört zur こそあど-Reihe: こんな (so eine wie diese hier), そんな (so eine wie die da), あんな (so eine wie jene dort), どんな (was für eine?).",
    "related": []
  },
  {
    "id": "counters",
    "pattern": "数え方 (Zählwörter)",
    "level": "N5",
    "category": "Satzstrukturen",
    "meaning": "Zählwörter / Zähleinheitswörter",
    "explanation": "Im Japanischen werden Zählwörter (Suffixe) nach Zahlen verwendet, abhängig von der Form oder Art des gezählten Objekts. Die wichtigsten N5-Zählwörter sind ～つ (allgemein), ～人 (Personen), ～本 (lange Dinge), ～枚 (flache Dinge), ～匹 (kleine Tiere), ～台 (Maschinen/Fahrzeuge).",
    "formation": "Zahl + Zählwort + の + Nomen / Nomen + を + Zahl + Zählwort + Verb",
    "examples": [
      {
        "japanese": "りんごを三つください。",
        "romaji": "Ringo o mittsu kudasai.",
        "german": "Drei Äpfel bitte.",
        "cloze": {
          "start": 4,
          "answer": "三つ",
          "quiz": {
            "level": "N5",
            "japanese": "りんごを三つください。",
            "german": "Drei Äpfel bitte.",
            "start": 4,
            "answer": "三つ",
            "acceptedAnswers": [
              "三つ",
              "三個"
            ],
            "distractors": [
              {
                "text": "一つ",
                "reason": "Die Übersetzung verlangt drei, nicht einen Apfel."
              },
              {
                "text": "二つ",
                "reason": "Die Übersetzung verlangt drei, nicht zwei Äpfel."
              },
              {
                "text": "四つ",
                "reason": "Die Übersetzung verlangt drei, nicht vier Äpfel."
              }
            ],
            "promptKana": "りんごを＿＿＿ください。"
          }
        }
      },
      {
        "japanese": "学生が五人います。",
        "romaji": "Gakusei ga gonin imasu.",
        "german": "Es gibt fünf Studenten."
      }
    ],
    "notes": "～つ (hitotsu, futatsu...) ist das allgemeine Zählwort und funktioniert bis 10. Danach benutzt man das spezifische Zählwort. Die Zahlen ändern sich bei manchen Zählwörtern: 三本 = さんぼん, 一匹 = いっぴき.",
    "related": []
  },
  {
    "id": "hou-ga-ii",
    "pattern": "～ほうがいい",
    "level": "N4",
    "category": "Satzstrukturen",
    "meaning": "Sollte / Es wäre besser zu...",
    "explanation": "～ほうがいい wird verwendet, um einen Ratschlag zu geben. Es bedeutet 'Du solltest...' oder 'Es wäre besser, wenn...'. Für positive Ratschläge verwendet man die た-Form, für negative die ない-Form.",
    "formation": "Verb た-Form + ほうがいい (sollte tun) / Verb ない-Form + ほうがいい (sollte nicht tun)",
    "examples": [
      {
        "japanese": "もっと野菜を食べたほうがいいですよ。",
        "cloze": {
          "start": 9,
          "answer": "ほうがいい",
          "quiz": {
            "level": "N4",
            "japanese": "もっと野菜を食べたほうがいいですよ。",
            "german": "Du solltest mehr Gemüse essen.",
            "start": 9,
            "answer": "ほうがいい",
            "acceptedAnswers": [
              "ほうがいい"
            ],
            "distractors": [
              {
                "text": "ほうをいい",
                "reason": "いい verlangt in dieser Bewertung が."
              },
              {
                "text": "ほうにいい",
                "reason": "に ersetzt hier nicht が."
              },
              {
                "text": "ほうがよくない",
                "reason": "Dies rät vom Essen von mehr Gemüse ab."
              }
            ],
            "promptKana": "もっとやさいをたべた＿＿＿ですよ。"
          }
        },
        "romaji": "Motto yasai o tabeta hō ga ii desu yo.",
        "german": "Du solltest mehr Gemüse essen."
      },
      {
        "japanese": "夜遅く食べないほうがいいです。",
        "cloze": {
          "start": 7,
          "answer": "ほうがいい"
        },
        "romaji": "Yoru osoku tabenai hō ga ii desu.",
        "german": "Du solltest spät abends nicht essen."
      }
    ],
    "notes": "Positive Ratschläge: た-Form + ほうがいい. Negative Ratschläge: ない-Form + ほうがいい. Diese Form kann direkt klingen – bei Vorgesetzten besser ～たらどうですか verwenden.",
    "related": [
      "yori",
      "no-hou-ga"
    ]
  },
  {
    "id": "temo",
    "pattern": "～ても / ～でも",
    "level": "N4",
    "category": "Satzstrukturen",
    "meaning": "Auch wenn / Selbst wenn",
    "explanation": "～ても drückt aus, dass etwas trotz einer bestimmten Bedingung gilt. Es bedeutet 'auch wenn' oder 'selbst wenn'. Das Ergebnis ändert sich nicht, egal ob die Bedingung eintritt.",
    "formation": "Verb て-Form + も / い-Adj (～くても) / な-Adj (～でも) / Nomen (～でも)",
    "examples": [
      {
        "japanese": "雨が降っても行きます。",
        "cloze": {
          "start": 4,
          "answer": "ても",
          "quiz": {
            "level": "N4",
            "japanese": "雨が降っても行きます。",
            "german": "Auch wenn es regnet, gehe ich.",
            "start": 4,
            "answer": "ても",
            "acceptedAnswers": [
              "ても"
            ],
            "distractors": [
              {
                "text": "たも",
                "reason": "Auch wenn braucht ても, nicht たも."
              },
              {
                "text": "れば",
                "reason": "降っれば ist keine Bedingungsform."
              },
              {
                "text": "ないと",
                "reason": "降っない ist keine Negativform."
              }
            ],
            "promptKana": "あめがふっ＿＿＿いきます。"
          }
        },
        "romaji": "Ame ga futte mo ikimasu.",
        "german": "Auch wenn es regnet, gehe ich."
      },
      {
        "japanese": "高くても買いたいです。",
        "cloze": {
          "start": 2,
          "answer": "ても"
        },
        "romaji": "Takakutemo kaitai desu.",
        "german": "Selbst wenn es teuer ist, möchte ich es kaufen."
      }
    ],
    "notes": "い-Adjektive: 高い → 高くても. な-Adjektive: 静か → 静かでも. Nomen: 雨 → 雨でも. Nicht verwechseln mit ～てもいい (Erlaubnis).",
    "related": [
      "temo-ii",
      "noni"
    ]
  },
  {
    "id": "no-wa-desu",
    "pattern": "～のは～です",
    "level": "N5",
    "category": "Satzstrukturen",
    "meaning": "Das ... ist ... (Nominalisierung)",
    "explanation": "～のは～です nominalisiert einen Satzteil mit の und macht ihn zum Thema. Es ermöglicht, über Handlungen oder Situationen als Nomen zu sprechen. Es wird oft für Erklärungen und Definitionen verwendet.",
    "formation": "Verb/Satz + のは + Nomen/Adjektiv + です",
    "examples": [
      {
        "japanese": "日本語を勉強するのは楽しいです。",
        "romaji": "Nihongo o benkyō suru no wa tanoshii desu.",
        "german": "Japanisch zu lernen ist vergnüglich.",
        "cloze": {
          "start": 8,
          "answer": "のは",
          "quiz": {
            "level": "N5",
            "japanese": "日本語を勉強するのは楽しいです。",
            "german": "Japanisch zu lernen ist vergnüglich.",
            "start": 8,
            "answer": "のは",
            "acceptedAnswers": [
              "のは",
              "のが",
              "ことは",
              "ことが"
            ],
            "distractors": [
              {
                "text": "を",
                "reason": "を nominalisiert die Tätigkeit nicht."
              },
              {
                "text": "に",
                "reason": "に nominalisiert die Tätigkeit nicht."
              },
              {
                "text": "と",
                "reason": "と bildet hier kein nominalisiertes Thema."
              }
            ],
            "promptKana": "にほんごをべんきょうする＿＿＿たのしいです。"
          }
        }
      },
      {
        "japanese": "朝早く起きるのは大変です。",
        "romaji": "Asa hayaku okiru no wa taihen desu.",
        "german": "Früh morgens aufzustehen ist anstrengend."
      }
    ],
    "notes": "の wandelt einen Satz in ein Nomen um. Ähnliche Konstruktionen: ～のが好き (gerne tun), ～のを忘れる (vergessen zu tun).",
    "related": [
      "no",
      "no-ga-suki"
    ]
  },
  {
    "id": "n4-bakari-p",
    "pattern": "～ばかり",
    "level": "N4",
    "category": "Partikel",
    "meaning": "Nur, nichts als",
    "explanation": "ばかり drückt aus, dass jemand ausschließlich oder übermäßig etwas tut.",
    "formation": "Verb (て-Form) + ばかり / Nomen + ばかり",
    "examples": [
      {
        "japanese": "彼はゲームばかりしている。",
        "cloze": {
          "start": 5,
          "answer": "ばかり",
          "quiz": {
            "level": "N4",
            "japanese": "彼はゲームばかりしている。",
            "german": "Er spielt nichts als Spiele.",
            "start": 5,
            "answer": "ばかり",
            "acceptedAnswers": [
              "ばかり",
              "だけ"
            ],
            "distractors": [
              {
                "text": "しか",
                "reason": "しか verlangt eine negative Verbform."
              },
              {
                "text": "へ",
                "reason": "へ markiert hier keine ausschließliche Tätigkeit."
              },
              {
                "text": "から",
                "reason": "から drückt hier nicht nichts als Spiele aus."
              }
            ],
            "promptKana": "かれはゲーム＿＿＿している。"
          }
        },
        "romaji": "Kare wa gēmu bakari shiteiru.",
        "german": "Er spielt nichts als Spiele."
      },
      {
        "japanese": "甘いものばかり食べないで。",
        "cloze": {
          "start": 4,
          "answer": "ばかり"
        },
        "romaji": "Amai mono bakari tabenaide.",
        "german": "Iss nicht nur Süßes."
      }
    ],
    "notes": "Mit た-Form bedeutet es 'gerade erst': 来たばかり = gerade erst angekommen.",
    "related": [
      "dake",
      "shika-nai"
    ]
  },
  {
    "id": "n4-sae",
    "pattern": "～さえ",
    "level": "N4",
    "category": "Partikel",
    "meaning": "Sogar, selbst",
    "explanation": "さえ betont einen extremen Fall und impliziert, dass alles andere selbstverständlich ist.",
    "formation": "Nomen + さえ / Verb (ます-Stamm) + さえする",
    "examples": [
      {
        "japanese": "子供でさえ知っている。",
        "cloze": {
          "start": 3,
          "answer": "さえ",
          "quiz": {
            "level": "N4",
            "japanese": "子供でさえ知っている。",
            "german": "Sogar Kinder wissen das.",
            "start": 3,
            "answer": "さえ",
            "acceptedAnswers": [
              "さえ",
              "も"
            ],
            "distractors": [
              {
                "text": "しか",
                "reason": "しか verlangt eine negative Verbform."
              },
              {
                "text": "から",
                "reason": "子供でから ist kein passender Anschluss."
              },
              {
                "text": "を",
                "reason": "子供でを ist keine passende Partikelverbindung."
              }
            ],
            "promptKana": "こどもで＿＿＿しっている。"
          }
        },
        "romaji": "Kodomo de sae shitteiru.",
        "german": "Sogar Kinder wissen das."
      },
      {
        "japanese": "名前さえ覚えていない。",
        "cloze": {
          "start": 2,
          "answer": "さえ"
        },
        "romaji": "Namae sae oboeteinai.",
        "german": "Ich erinnere mich nicht einmal an den Namen."
      }
    ],
    "notes": "さえ～ば bedeutet 'wenn nur/solange': お金さえあれば = Wenn ich nur Geld hätte.",
    "related": [
      "mo"
    ]
  },
  {
    "id": "n4-koso",
    "pattern": "～こそ",
    "level": "N4",
    "category": "Partikel",
    "meaning": "Gerade, genau (Betonung)",
    "explanation": "こそ ist eine emphatische Partikel, die das vorangehende Wort besonders hervorhebt.",
    "formation": "Nomen + こそ",
    "examples": [
      {
        "japanese": "こちらこそよろしくお願いします。",
        "cloze": {
          "start": 3,
          "answer": "こそ",
          "quiz": {
            "level": "N4",
            "japanese": "こちらこそよろしくお願いします。",
            "german": "Ganz meinerseits, freut mich.",
            "start": 3,
            "answer": "こそ",
            "acceptedAnswers": [
              "こそ",
              "も"
            ],
            "distractors": [
              {
                "text": "を",
                "reason": "を drückt keine nachdrückliche Erwiderung aus."
              },
              {
                "text": "へ",
                "reason": "へ bezeichnet eine Richtung statt ganz meinerseits."
              },
              {
                "text": "しか",
                "reason": "しか passt nicht zur positiven Schlussform."
              }
            ],
            "promptKana": "こちら＿＿＿よろしくおねがいします。"
          }
        },
        "romaji": "Kochira koso yoroshiku onegai shimasu.",
        "german": "Ganz meinerseits, freut mich."
      },
      {
        "japanese": "今年こそ合格したい。",
        "cloze": {
          "start": 2,
          "answer": "こそ"
        },
        "romaji": "Kotoshi koso gōkaku shitai.",
        "german": "Dieses Jahr will ich unbedingt bestehen."
      }
    ],
    "notes": "Sehr häufig: こちらこそ (ganz meinerseits).",
    "related": [
      "wa"
    ]
  },
  {
    "id": "n4-hodo-p",
    "pattern": "～ほど",
    "level": "N4",
    "category": "Partikel",
    "meaning": "So sehr dass; Ausmaß",
    "explanation": "ほど drückt den Grad oder das Ausmaß aus. Oft in Vergleichen und mit ～ば～ほど (je mehr desto).",
    "formation": "Verb (辞書形) + ほど / Nomen + ほど",
    "examples": [
      {
        "japanese": "泣きたいほど嬉しかった。",
        "cloze": {
          "start": 4,
          "answer": "ほど",
          "quiz": {
            "level": "N4",
            "japanese": "泣きたいほど嬉しかった。",
            "german": "Ich war so glücklich, dass ich weinen wollte.",
            "start": 4,
            "answer": "ほど",
            "acceptedAnswers": [
              "ほど",
              "くらい",
              "ぐらい"
            ],
            "distractors": [
              {
                "text": "ながら",
                "reason": "ながら folgt dem Verbstamm, nicht たい."
              },
              {
                "text": "すぎて",
                "reason": "泣きたいすぎて ist kein korrekter Anschluss."
              },
              {
                "text": "から",
                "reason": "Dies macht den Wunsch zu weinen zum Grund statt zum Grad der Freude."
              }
            ],
            "promptKana": "なきたい＿＿＿うれしかった。"
          }
        },
        "romaji": "Nakitai hodo ureshikatta.",
        "german": "Ich war so glücklich, dass ich weinen wollte."
      },
      {
        "japanese": "勉強すればするほど面白い。",
        "cloze": {
          "start": 7,
          "answer": "ほど"
        },
        "romaji": "Benkyō sureba suru hodo omoshiroi.",
        "german": "Je mehr man lernt, desto interessanter wird es."
      }
    ],
    "notes": "～ば～ほど = je mehr desto. Verneinung: ～ほど～ない = nicht so ... wie.",
    "related": [
      "n4-ba"
    ]
  },
  {
    "id": "n4-zutsu",
    "pattern": "～ずつ",
    "level": "N4",
    "category": "Partikel",
    "meaning": "Jeweils, nach und nach",
    "explanation": "ずつ drückt gleiche Verteilung oder allmähliche Veränderung aus.",
    "formation": "Zahl/Menge + ずつ",
    "examples": [
      {
        "japanese": "毎日少しずつ勉強しています。",
        "cloze": {
          "start": 4,
          "answer": "ずつ",
          "quiz": {
            "level": "N4",
            "japanese": "毎日少しずつ勉強しています。",
            "german": "Ich lerne jeden Tag ein bisschen.",
            "start": 4,
            "answer": "ずつ",
            "acceptedAnswers": [
              "ずつ"
            ],
            "distractors": [
              {
                "text": "しか",
                "reason": "しか verlangt eine Verneinung."
              },
              {
                "text": "へ",
                "reason": "へ verteilt keine kleinen Lernmengen."
              },
              {
                "text": "をに",
                "reason": "をに ist hier keine Mengenpartikelverbindung."
              }
            ],
            "promptKana": "まいにちすこし＿＿＿べんきょうしています。"
          }
        },
        "romaji": "Mainichi sukoshi zutsu benkyō shiteimasu.",
        "german": "Ich lerne jeden Tag ein bisschen."
      },
      {
        "japanese": "一人に二つずつ配ってください。",
        "cloze": {
          "start": 5,
          "answer": "ずつ"
        },
        "romaji": "Hitori ni futatsu zutsu kubatte kudasai.",
        "german": "Verteilen Sie bitte jeweils zwei pro Person."
      }
    ],
    "notes": "少しずつ (nach und nach) ist besonders häufig.",
    "related": []
  },
  {
    "id": "n4-nado",
    "pattern": "～など",
    "level": "N4",
    "category": "Partikel",
    "meaning": "Und so weiter, wie zum Beispiel",
    "explanation": "など listet Beispiele auf und impliziert, dass es weitere gibt. Formeller als とか.",
    "formation": "Nomen + など",
    "examples": [
      {
        "japanese": "りんごやバナナなどの果物が好きです。",
        "cloze": {
          "start": 7,
          "answer": "など",
          "quiz": {
            "level": "N4",
            "japanese": "りんごやバナナなどの果物が好きです。",
            "german": "Ich mag Früchte wie Äpfel und Bananen.",
            "start": 7,
            "answer": "など",
            "acceptedAnswers": [
              "など",
              "等"
            ],
            "distractors": [
              {
                "text": "しか",
                "reason": "しか passt nicht zum positiven Prädikat."
              },
              {
                "text": "へ",
                "reason": "への würde ein Ziel statt Beispiele von Früchten kennzeichnen."
              },
              {
                "text": "から",
                "reason": "からの bezeichnet Herkunft statt eine Beispielsammlung."
              }
            ],
            "promptKana": "りんごやバナナ＿＿＿のくだものがすきです。"
          }
        },
        "romaji": "Ringo ya banana nado no kudamono ga suki desu.",
        "german": "Ich mag Früchte wie Äpfel und Bananen."
      },
      {
        "japanese": "私などまだまだです。",
        "cloze": {
          "start": 1,
          "answer": "など"
        },
        "romaji": "Watashi nado mada mada desu.",
        "german": "Jemand wie ich hat noch einen weiten Weg."
      }
    ],
    "notes": "Informelle Variante: なんか. Oft mit や: AやBなど.",
    "related": [
      "ya",
      "n4-toka"
    ]
  },
  {
    "id": "n4-toshite",
    "pattern": "～として",
    "level": "N4",
    "category": "Partikel",
    "meaning": "Als, in der Rolle von",
    "explanation": "として gibt an, in welcher Funktion oder Eigenschaft jemand betrachtet wird.",
    "formation": "Nomen + として",
    "examples": [
      {
        "japanese": "留学生として日本に来ました。",
        "cloze": {
          "start": 3,
          "answer": "として",
          "quiz": {
            "level": "N4",
            "japanese": "留学生として日本に来ました。",
            "german": "Ich bin als Austauschstudent nach Japan gekommen.",
            "start": 3,
            "answer": "として",
            "acceptedAnswers": [
              "として"
            ],
            "distractors": [
              {
                "text": "としての",
                "reason": "の müsste ein Nomen bestimmen, nicht 日本に来ました."
              },
              {
                "text": "にとって",
                "reason": "Dies bezeichnet eine Perspektive statt die Rolle bei der Einreise."
              },
              {
                "text": "によると",
                "reason": "Dies nennt eine Informationsquelle statt eine Rolle."
              }
            ],
            "promptKana": "りゅうがくせい＿＿＿にほんにきました。"
          }
        },
        "romaji": "Ryūgakusei toshite Nihon ni kimashita.",
        "german": "Ich bin als Austauschstudent nach Japan gekommen."
      },
      {
        "japanese": "この町は観光地として有名です。",
        "cloze": {
          "start": 7,
          "answer": "として"
        },
        "romaji": "Kono machi wa kankōchi toshite yūmei desu.",
        "german": "Diese Stadt ist als Touristenort berühmt."
      }
    ],
    "notes": "Häufig bei Berufs- und Rollenbezeichnungen.",
    "related": []
  },
  {
    "id": "n4-ni-taishite",
    "pattern": "～に対して",
    "level": "N4",
    "category": "Partikel",
    "meaning": "Gegenüber, im Gegensatz zu",
    "explanation": "に対して drückt aus, auf wen sich eine Handlung richtet, oder einen Kontrast zwischen zwei Dingen.",
    "formation": "Nomen + に対して",
    "examples": [
      {
        "japanese": "お客様に対して丁寧に話してください。",
        "cloze": {
          "start": 3,
          "answer": "に対して",
          "quiz": {
            "level": "N4",
            "japanese": "お客様に対して丁寧に話してください。",
            "german": "Sprechen Sie bitte höflich gegenüber den Kunden.",
            "start": 3,
            "answer": "に対して",
            "acceptedAnswers": [
              "に対して",
              "に"
            ],
            "distractors": [
              {
                "text": "に対する",
                "reason": "Die attributive Form verlangt danach ein Nomen."
              },
              {
                "text": "にとって",
                "reason": "Dies bezeichnet die Perspektive, nicht die angesprochenen Kunden."
              },
              {
                "text": "によると",
                "reason": "Dies bezeichnet eine Nachrichtenquelle, nicht die Gesprächspartner."
              }
            ],
            "promptKana": "おきゃくさま＿＿＿ていねいにはなしてください。"
          }
        },
        "romaji": "Okyakusama ni taishite teinei ni hanashite kudasai.",
        "german": "Sprechen Sie bitte höflich gegenüber den Kunden."
      },
      {
        "japanese": "兄はスポーツが好きなのに対して、弟は読書が好きだ。",
        "cloze": {
          "start": 11,
          "answer": "に対して"
        },
        "romaji": "Ani wa supōtsu ga suki na no ni taishite, otōto wa dokusho ga suki da.",
        "german": "Der ältere Bruder mag Sport, der jüngere hingegen Lesen."
      }
    ],
    "notes": "Vor Nomen: ～に対する + Nomen (z.B. 学生に対する態度).",
    "related": [
      "ni"
    ]
  },
  {
    "id": "n4-ni-totte",
    "pattern": "～にとって",
    "level": "N4",
    "category": "Partikel",
    "meaning": "Für (aus der Sicht von)",
    "explanation": "にとって drückt aus, aus wessen Perspektive etwas beurteilt wird.",
    "formation": "Nomen + にとって",
    "examples": [
      {
        "japanese": "私にとって家族が一番大切です。",
        "cloze": {
          "start": 1,
          "answer": "にとって",
          "quiz": {
            "level": "N4",
            "japanese": "私にとって家族が一番大切です。",
            "german": "Für mich ist die Familie am wichtigsten.",
            "start": 1,
            "answer": "にとって",
            "acceptedAnswers": [
              "にとって"
            ],
            "distractors": [
              {
                "text": "によると",
                "reason": "Dies bezeichnet eine zitierte Informationsquelle statt den eigenen Wertmaßstab."
              },
              {
                "text": "としての",
                "reason": "の verlangt hier ein nachfolgendes Bezugsnomen."
              },
              {
                "text": "をとって",
                "reason": "をとって ist nicht die Perspektivkonstruktion."
              }
            ],
            "promptKana": "わたし＿＿＿かぞくがいちばんたいせつです。"
          }
        },
        "romaji": "Watashi ni totte kazoku ga ichiban taisetsu desu.",
        "german": "Für mich ist die Familie am wichtigsten."
      },
      {
        "japanese": "外国人にとって漢字は難しい。",
        "cloze": {
          "start": 3,
          "answer": "にとって"
        },
        "romaji": "Gaikokujin ni totte kanji wa muzukashii.",
        "german": "Für Ausländer sind Kanji schwierig."
      }
    ],
    "notes": "Nicht verwechseln mit ～のために (zum Zweck von). にとって = subjektive Perspektive.",
    "related": [
      "ni"
    ]
  },
  {
    "id": "n4-ni-yotte",
    "pattern": "～によって",
    "level": "N4",
    "category": "Partikel",
    "meaning": "Durch, mittels; je nach",
    "explanation": "によって hat mehrere Bedeutungen: Mittel (durch), Urheber im Passiv (von), Unterschied je nach Situation.",
    "formation": "Nomen + によって",
    "examples": [
      {
        "japanese": "この小説は夏目漱石によって書かれた。",
        "cloze": {
          "start": 9,
          "answer": "によって",
          "quiz": {
            "level": "N4",
            "japanese": "この小説は夏目漱石によって書かれた。",
            "german": "Dieser Roman wurde von Natsume Sōseki geschrieben.",
            "start": 9,
            "answer": "によって",
            "acceptedAnswers": [
              "によって",
              "に"
            ],
            "distractors": [
              {
                "text": "による",
                "reason": "による bestimmt ein Nomen, nicht das folgende Verb."
              },
              {
                "text": "にとって",
                "reason": "Dies bezeichnet eine Perspektive statt den Urheber."
              },
              {
                "text": "について",
                "reason": "Dies würde den Autor zum Gegenstand des Romans machen."
              }
            ],
            "promptKana": "このしょうせつはなつめそうせき＿＿＿かかれた。"
          }
        },
        "romaji": "Kono shōsetsu wa Natsume Sōseki ni yotte kakareta.",
        "german": "Dieser Roman wurde von Natsume Sōseki geschrieben."
      },
      {
        "japanese": "国によって文化が違います。",
        "cloze": {
          "start": 1,
          "answer": "によって"
        },
        "romaji": "Kuni ni yotte bunka ga chigaimasu.",
        "german": "Je nach Land ist die Kultur unterschiedlich."
      }
    ],
    "notes": "Vor Nomen: ～による + Nomen. ～によると = laut/gemäß.",
    "related": [
      "n4-rareru",
      "n4-ni-yoru-to"
    ]
  },
  {
    "id": "n4-no-you-ni",
    "pattern": "～のように / ～みたいに",
    "level": "N4",
    "category": "Partikel",
    "meaning": "Wie, so wie, ähnlich wie",
    "explanation": "のように (formell) und みたいに (informell) drücken einen Vergleich aus.",
    "formation": "Nomen + のように / Nomen + みたいに",
    "examples": [
      {
        "japanese": "鳥のように空を飛びたい。",
        "cloze": {
          "start": 1,
          "answer": "のように",
          "quiz": {
            "level": "N4",
            "japanese": "鳥のように空を飛びたい。",
            "german": "Ich möchte wie ein Vogel fliegen.",
            "start": 1,
            "answer": "のように",
            "acceptedAnswers": [
              "のように",
              "みたいに"
            ],
            "distractors": [
              {
                "text": "のような",
                "reason": "Vor dem Verb wird die adverbiale Form に benötigt."
              },
              {
                "text": "なように",
                "reason": "Nach einem Nomen steht hier の."
              },
              {
                "text": "のようでの",
                "reason": "Dies bildet keinen adverbialen Vergleich."
              }
            ],
            "promptKana": "とり＿＿＿そらをとびたい。"
          }
        },
        "romaji": "Tori no yō ni sora o tobitai.",
        "german": "Ich möchte wie ein Vogel fliegen."
      },
      {
        "japanese": "子供みたいに遊んでいる。",
        "cloze": {
          "start": 2,
          "answer": "みたいに"
        },
        "romaji": "Kodomo mitai ni asondeiru.",
        "german": "Er spielt wie ein Kind."
      }
    ],
    "notes": "Vor Nomen: のような/みたいな: 夢のような話 = eine traumhafte Geschichte.",
    "related": [
      "n4-you-da",
      "n4-mitai-da"
    ]
  },
  {
    "id": "n4-dake-de-naku",
    "pattern": "～だけでなく",
    "level": "N4",
    "category": "Partikel",
    "meaning": "Nicht nur ... sondern auch",
    "explanation": "だけでなく drückt aus, dass nicht nur eine Sache zutrifft, sondern auch eine weitere.",
    "formation": "Nomen/Verb/Adj + だけでなく ～も",
    "examples": [
      {
        "japanese": "日本語だけでなく中国語も話せます。",
        "cloze": {
          "start": 3,
          "answer": "だけでなく",
          "quiz": {
            "level": "N4",
            "japanese": "日本語だけでなく中国語も話せます。",
            "german": "Ich kann nicht nur Japanisch, sondern auch Chinesisch.",
            "start": 3,
            "answer": "だけでなく",
            "acceptedAnswers": [
              "だけでなく",
              "だけではなく",
              "ばかりでなく",
              "のみならず"
            ],
            "distractors": [
              {
                "text": "しか",
                "reason": "しか verlangt eine negative Endung."
              },
              {
                "text": "だけでないの",
                "reason": "の kann hier nicht den folgenden Satz anschließen."
              },
              {
                "text": "だけでは",
                "reason": "Dies lässt den kontrastierenden Anschluss zur zusätzlichen Sprache unvollständig."
              }
            ],
            "promptKana": "にほんご＿＿＿ちゅうごくごもはなせます。"
          }
        },
        "romaji": "Nihongo dake de naku chūgokugo mo hanasemasu.",
        "german": "Ich kann nicht nur Japanisch, sondern auch Chinesisch."
      },
      {
        "japanese": "安いだけでなく、おいしいです。",
        "cloze": {
          "start": 2,
          "answer": "だけでなく"
        },
        "romaji": "Yasui dake de naku, oishii desu.",
        "german": "Es ist nicht nur günstig, sondern auch lecker."
      }
    ],
    "notes": "Informell: ～だけじゃなくて. Formell: ～のみならず.",
    "related": [
      "dake",
      "mo"
    ]
  },
  {
    "id": "n4-rareru",
    "pattern": "～られる / ～れる",
    "level": "N4",
    "category": "Verben",
    "meaning": "Passivform",
    "explanation": "Die Passivform drückt aus, dass das Subjekt eine Handlung erleidet. Im Japanischen gibt es auch das 'Leidenspassiv' (迷惑の受身).",
    "formation": "Ichidan: ～られる / Godan: ～あれる (u→areru)",
    "examples": [
      {
        "japanese": "先生に褒められた。",
        "romaji": "Sensei ni homerareta.",
        "german": "Ich wurde vom Lehrer gelobt.",
        "cloze": {
          "start": 3,
          "answer": "褒められた",
          "quiz": {
            "level": "N4",
            "japanese": "先生に褒められた。",
            "german": "Ich wurde vom Lehrer gelobt.",
            "start": 3,
            "answer": "褒められた",
            "acceptedAnswers": [
              "褒められた"
            ],
            "distractors": [
              {
                "text": "褒めた",
                "reason": "Dies ist aktiv statt passiv."
              },
              {
                "text": "褒められなかった",
                "reason": "Dies verneint das Lob."
              },
              {
                "text": "褒めれるた",
                "reason": "Dies ist keine Vergangenheitsform."
              }
            ],
            "promptKana": "せんせいに＿＿＿。"
          }
        }
      },
      {
        "japanese": "電車で足を踏まれた。",
        "romaji": "Densha de ashi o fumareta.",
        "german": "Mir wurde im Zug auf den Fuß getreten."
      },
      {
        "japanese": "雨に降られた。",
        "romaji": "Ame ni furareta.",
        "german": "Ich wurde vom Regen überrascht."
      }
    ],
    "notes": "Godan: 書く→書かれる, 読む→読まれる. Ichidan: 食べる→食べられる. する→される, 来る→来られる.",
    "related": [
      "n4-saseru",
      "n4-ni-yotte"
    ]
  },
  {
    "id": "n4-saseru",
    "pattern": "～させる / ～せる",
    "level": "N4",
    "category": "Verben",
    "meaning": "Kausativform (lassen/veranlassen)",
    "explanation": "Die Kausativform drückt aus, dass jemand eine andere Person etwas tun lässt oder dazu veranlasst.",
    "formation": "Ichidan: ～させる / Godan: ～あせる (u→aseru)",
    "examples": [
      {
        "japanese": "母は子供に野菜を食べさせた。",
        "romaji": "Haha wa kodomo ni yasai o tabesaseta.",
        "german": "Die Mutter ließ das Kind Gemüse essen.",
        "cloze": {
          "start": 8,
          "answer": "食べさせた",
          "quiz": {
            "level": "N4",
            "japanese": "母は子供に野菜を食べさせた。",
            "german": "Die Mutter ließ das Kind Gemüse essen.",
            "start": 8,
            "answer": "食べさせた",
            "acceptedAnswers": [
              "食べさせた"
            ],
            "distractors": [
              {
                "text": "食べられた",
                "reason": "Dies ist passiv/potenzial, nicht die veranlasste Handlung."
              },
              {
                "text": "食べさせなかった",
                "reason": "Dies verneint das Essenlassen."
              },
              {
                "text": "食べるさせた",
                "reason": "する wird nicht an die Wörterbuchform angeschlossen."
              }
            ],
            "promptKana": "はははこどもにやさいを＿＿＿。"
          }
        }
      },
      {
        "japanese": "先生は学生を立たせた。",
        "romaji": "Sensei wa gakusei o tataseta.",
        "german": "Der Lehrer ließ die Schüler aufstehen."
      }
    ],
    "notes": "Godan: 書く→書かせる, 読む→読ませる. Ichidan: 食べる→食べさせる. する→させる, 来る→来させる.",
    "related": [
      "n4-rareru",
      "n4-saserareru",
      "n4-sasetekudasai"
    ]
  },
  {
    "id": "n4-saserareru",
    "pattern": "～させられる",
    "level": "N4",
    "category": "Verben",
    "meaning": "Kausativ-Passiv (gezwungen werden zu)",
    "explanation": "Kombination aus Kausativ und Passiv. Drückt aus, dass man gezwungen wird, etwas zu tun.",
    "formation": "Ichidan: ～させられる / Godan: ～あせられる",
    "examples": [
      {
        "japanese": "嫌いな野菜を食べさせられた。",
        "romaji": "Kirai na yasai o tabesaserareta.",
        "german": "Ich wurde gezwungen, Gemüse zu essen, das ich nicht mag.",
        "cloze": {
          "start": 6,
          "answer": "食べさせられた",
          "quiz": {
            "level": "N4",
            "japanese": "嫌いな野菜を食べさせられた。",
            "german": "Ich wurde gezwungen, Gemüse zu essen, das ich nicht mag.",
            "start": 6,
            "answer": "食べさせられた",
            "acceptedAnswers": [
              "食べさせられた"
            ],
            "distractors": [
              {
                "text": "食べさせた",
                "reason": "Dies bedeutet jemanden essen lassen, nicht selbst dazu gezwungen werden."
              },
              {
                "text": "食べさせられなかった",
                "reason": "Dies verneint den Zwang."
              },
              {
                "text": "食べるさせられた",
                "reason": "Die Kausativ-Passivform wird vom Stamm gebildet."
              }
            ],
            "promptKana": "きらいなやさいを＿＿＿。"
          }
        }
      },
      {
        "japanese": "毎日残業させられている。",
        "romaji": "Mainichi zangyō saserareteiru.",
        "german": "Ich werde jeden Tag zu Überstunden gezwungen."
      }
    ],
    "notes": "Godan-Kurzform: ～される (z.B. 行かされる statt 行かせられる).",
    "related": [
      "n4-rareru",
      "n4-saseru"
    ]
  },
  {
    "id": "n4-potential",
    "pattern": "～える / ～られる",
    "level": "N4",
    "category": "Verben",
    "meaning": "Potentialform (können)",
    "explanation": "Die Potentialform drückt Fähigkeit oder Möglichkeit aus. Das Objekt wird oft mit が statt を markiert.",
    "formation": "Ichidan: ～られる / Godan: u→eru",
    "examples": [
      {
        "japanese": "日本語が話せます。",
        "romaji": "Nihongo ga hanasemasu.",
        "german": "Ich kann Japanisch sprechen.",
        "cloze": {
          "start": 4,
          "answer": "話せます",
          "quiz": {
            "level": "N4",
            "japanese": "日本語が話せます。",
            "german": "Ich kann Japanisch sprechen.",
            "start": 4,
            "answer": "話せます",
            "acceptedAnswers": [
              "話せます"
            ],
            "distractors": [
              {
                "text": "話せません",
                "reason": "Dies verneint die Fähigkeit."
              },
              {
                "text": "話しました",
                "reason": "Dies berichtet eine Handlung statt die Fähigkeit."
              },
              {
                "text": "話すます",
                "reason": "ます wird nicht an die Wörterbuchform angeschlossen."
              }
            ],
            "promptKana": "にほんごが＿＿＿。"
          }
        }
      },
      {
        "japanese": "この漢字が読めますか。",
        "romaji": "Kono kanji ga yomemasu ka.",
        "german": "Können Sie dieses Kanji lesen?"
      },
      {
        "japanese": "明日来られますか。",
        "romaji": "Ashita koraremasu ka.",
        "german": "Können Sie morgen kommen?"
      }
    ],
    "notes": "Godan: 書く→書ける, 読む→読める. Ichidan: 食べる→食べられる. する→できる, 来る→来られる. Umgangssprache: 食べれる (ra-Wegfall).",
    "related": [
      "koto-ga-dekiru"
    ]
  },
  {
    "id": "n4-volitional",
    "pattern": "～よう / ～おう",
    "level": "N4",
    "category": "Verben",
    "meaning": "Volitionalform (lass uns / ich will)",
    "explanation": "Die Volitionalform drückt Absicht, Vorschlag oder Aufforderung aus. Entspricht 'Lass uns...' oder 'Ich will...'.",
    "formation": "Ichidan: ～よう / Godan: u→ō",
    "examples": [
      {
        "japanese": "映画を見よう。",
        "cloze": {
          "start": 4,
          "answer": "よう",
          "quiz": {
            "level": "N4",
            "japanese": "映画を見よう。",
            "german": "Lass uns einen Film schauen.",
            "start": 4,
            "answer": "よう",
            "acceptedAnswers": [
              "よう"
            ],
            "distractors": [
              {
                "text": "ろう",
                "reason": "見る bildet 見よう, nicht 見ろう."
              },
              {
                "text": "るよう",
                "reason": "見るよう ist kein selbstständiger gemeinsamer Vorschlag."
              },
              {
                "text": "ない",
                "reason": "Dies verneint das Schauen."
              }
            ],
            "promptKana": "えいがをみ＿＿＿。"
          }
        },
        "romaji": "Eiga o miyō.",
        "german": "Lass uns einen Film schauen."
      },
      {
        "japanese": "明日早く起きようと思う。",
        "cloze": {
          "start": 6,
          "answer": "よう"
        },
        "romaji": "Ashita hayaku okiyō to omou.",
        "german": "Ich denke, ich werde morgen früh aufstehen."
      }
    ],
    "notes": "Godan: 書く→書こう, 読む→読もう. する→しよう, 来る→来よう. ～ようと思う = ich beabsichtige.",
    "related": [
      "n4-you-ni-suru",
      "mashou"
    ]
  },
  {
    "id": "n4-teoku",
    "pattern": "～ておく",
    "level": "N4",
    "category": "Verben",
    "meaning": "Im Voraus tun, vorbereiten",
    "explanation": "ておく drückt aus, dass eine Handlung als Vorbereitung oder im Voraus ausgeführt wird.",
    "formation": "Verb (て-Form) + おく",
    "examples": [
      {
        "japanese": "パーティーの前に料理を作っておく。",
        "cloze": {
          "start": 13,
          "answer": "ておく",
          "quiz": {
            "level": "N4",
            "japanese": "パーティーの前に料理を作っておく。",
            "german": "Ich koche vor der Party vor.",
            "start": 13,
            "answer": "ておく",
            "acceptedAnswers": [
              "ておく"
            ],
            "distractors": [
              {
                "text": "たおく",
                "reason": "おく braucht die て-Verbindung."
              },
              {
                "text": "ておかない",
                "reason": "Dies verneint die Vorbereitung."
              },
              {
                "text": "ますおく",
                "reason": "作っます ist keine Verbform."
              }
            ],
            "promptKana": "パーティーのまえにりょうりをつくっ＿＿＿。"
          }
        },
        "romaji": "Pātī no mae ni ryōri o tsukutte oku.",
        "german": "Ich koche vor der Party vor."
      },
      {
        "japanese": "明日のために準備しておいてください。",
        "romaji": "Ashita no tame ni junbi shite oite kudasai.",
        "german": "Bitte bereiten Sie für morgen vor."
      }
    ],
    "notes": "Umgangssprache: ～とく (買っとく = kaufen und bereithalten).",
    "related": [
      "te-form"
    ]
  },
  {
    "id": "n4-teiku",
    "pattern": "～ていく",
    "level": "N4",
    "category": "Verben",
    "meaning": "Weggehen und; von jetzt an",
    "explanation": "ていく drückt eine Bewegung vom Sprecher weg oder eine Veränderung in die Zukunft aus.",
    "formation": "Verb (て-Form) + いく",
    "examples": [
      {
        "japanese": "これからも頑張っていきます。",
        "romaji": "Kore kara mo ganbatte ikimasu.",
        "german": "Ich werde mich auch weiterhin anstrengen."
      },
      {
        "japanese": "お弁当を持っていく。",
        "cloze": {
          "start": 6,
          "answer": "ていく",
          "quiz": {
            "level": "N4",
            "japanese": "お弁当を持っていく。",
            "german": "Ich nehme eine Bento-Box mit.",
            "start": 6,
            "answer": "ていく",
            "acceptedAnswers": [
              "ていく"
            ],
            "distractors": [
              {
                "text": "た行く",
                "reason": "持った行く ist kein Verbanschluss."
              },
              {
                "text": "ていかない",
                "reason": "Dies verneint das Mitnehmen."
              },
              {
                "text": "ます行く",
                "reason": "持っます ist keine Verbform."
              }
            ],
            "promptKana": "おべんとうをもっ＿＿＿。"
          }
        },
        "romaji": "Obentō o motte iku.",
        "german": "Ich nehme eine Bento-Box mit."
      }
    ],
    "notes": "Gegenteil von ～てくる. Zukunftsbezug: だんだん暑くなっていく (es wird immer heißer).",
    "related": [
      "n4-tekuru",
      "te-form"
    ]
  },
  {
    "id": "n4-tekuru",
    "pattern": "～てくる",
    "level": "N4",
    "category": "Verben",
    "meaning": "Herkommen und; bis jetzt",
    "explanation": "てくる drückt eine Bewegung zum Sprecher hin oder eine Veränderung von der Vergangenheit bis jetzt aus.",
    "formation": "Verb (て-Form) + くる",
    "examples": [
      {
        "japanese": "雨が降ってきた。",
        "romaji": "Ame ga futte kita.",
        "german": "Es hat angefangen zu regnen.",
        "cloze": {
          "start": 2,
          "answer": "降ってきた",
          "quiz": {
            "level": "N4",
            "japanese": "雨が降ってきた。",
            "german": "Es hat angefangen zu regnen.",
            "start": 2,
            "answer": "降ってきた",
            "acceptedAnswers": [
              "降ってきた"
            ],
            "distractors": [
              {
                "text": "降ってこなかった",
                "reason": "Dies verneint das Einsetzen des Regens."
              },
              {
                "text": "降ったきた",
                "reason": "くる folgt hier der て-Form."
              },
              {
                "text": "降ってくるた",
                "reason": "Die Vergangenheit von くる lautet きた."
              }
            ],
            "promptKana": "あめが＿＿＿。"
          }
        }
      },
      {
        "japanese": "日本語を三年間勉強してきました。",
        "romaji": "Nihongo o sannenkan benkyō shite kimashita.",
        "german": "Ich habe drei Jahre lang Japanisch gelernt."
      }
    ],
    "notes": "Gegenteil von ～ていく. Vergangenheitsbezug: だんだん寒くなってきた (es ist kälter geworden).",
    "related": [
      "n4-teiku",
      "te-form"
    ]
  },
  {
    "id": "n4-teageru",
    "pattern": "～てあげる",
    "level": "N4",
    "category": "Verben",
    "meaning": "Etwas für jemanden tun (geben)",
    "explanation": "てあげる drückt aus, dass man jemandem den Gefallen tut, etwas für ihn zu erledigen.",
    "formation": "Verb (て-Form) + あげる",
    "examples": [
      {
        "japanese": "友達に日本語を教えてあげた。",
        "romaji": "Tomodachi ni nihongo o oshiete ageta.",
        "german": "Ich habe meinem Freund Japanisch beigebracht.",
        "cloze": {
          "start": 9,
          "answer": "てあげた",
          "quiz": {
            "level": "N4",
            "japanese": "友達に日本語を教えてあげた。",
            "german": "Ich habe meinem Freund Japanisch beigebracht.",
            "start": 9,
            "answer": "てあげた",
            "acceptedAnswers": [
              "てあげた"
            ],
            "distractors": [
              {
                "text": "たあげた",
                "reason": "あげる folgt hier der て-Form."
              },
              {
                "text": "てあげなかった",
                "reason": "Dies verneint die geleistete Hilfe."
              },
              {
                "text": "てあげるた",
                "reason": "あげる bildet die Vergangenheit あげた."
              }
            ],
            "promptKana": "ともだちににほんごをおしえ＿＿＿。"
          }
        }
      },
      {
        "japanese": "荷物を持ってあげましょうか。",
        "romaji": "Nimotsu o motte agemashō ka.",
        "german": "Soll ich Ihnen das Gepäck tragen?"
      }
    ],
    "notes": "Kann herablassend klingen. Höflicher: ～て差し上げる. Nicht über sich selbst zu Höherstehenden verwenden.",
    "related": [
      "n4-temorau",
      "n4-tekureru"
    ]
  },
  {
    "id": "n4-temorau",
    "pattern": "～てもらう",
    "level": "N4",
    "category": "Verben",
    "meaning": "Etwas von jemandem getan bekommen",
    "explanation": "てもらう drückt aus, dass man den Gefallen erhält, dass jemand etwas für einen tut.",
    "formation": "Person に + Verb (て-Form) + もらう",
    "examples": [
      {
        "japanese": "友達に手伝ってもらった。",
        "romaji": "Tomodachi ni tetsudatte moratta.",
        "german": "Mein Freund hat mir geholfen (ich habe Hilfe bekommen).",
        "cloze": {
          "start": 3,
          "answer": "手伝ってもらった",
          "quiz": {
            "level": "N4",
            "japanese": "友達に手伝ってもらった。",
            "german": "Mein Freund hat mir geholfen (ich habe Hilfe bekommen).",
            "start": 3,
            "answer": "手伝ってもらった",
            "acceptedAnswers": [
              "手伝ってもらった"
            ],
            "distractors": [
              {
                "text": "手伝ってあげた",
                "reason": "Dies kehrt die Hilfsrichtung um."
              },
              {
                "text": "手伝ってもらわなかった",
                "reason": "Dies verneint die erhaltene Hilfe."
              },
              {
                "text": "手伝ったもらった",
                "reason": "もらう folgt der て-Form."
              }
            ],
            "promptKana": "ともだちに＿＿＿。"
          }
        }
      },
      {
        "japanese": "先生に説明してもらいました。",
        "romaji": "Sensei ni setsumei shite moraimashita.",
        "german": "Der Lehrer hat es mir erklärt."
      }
    ],
    "notes": "Höflich: ～ていただく. Bitte: ～てもらえませんか (Könnten Sie bitte...?).",
    "related": [
      "n4-teageru",
      "n4-tekureru"
    ]
  },
  {
    "id": "n4-tekureru",
    "pattern": "～てくれる",
    "level": "N4",
    "category": "Verben",
    "meaning": "Etwas für mich tun (empfangen)",
    "explanation": "てくれる drückt aus, dass jemand etwas für den Sprecher oder dessen Gruppe tut. Impliziert Dankbarkeit.",
    "formation": "Person が + Verb (て-Form) + くれる",
    "examples": [
      {
        "japanese": "母が弁当を作ってくれた。",
        "romaji": "Haha ga bentō o tsukutte kureta.",
        "german": "Meine Mutter hat mir ein Bento gemacht.",
        "cloze": {
          "start": 5,
          "answer": "作ってくれた",
          "quiz": {
            "level": "N4",
            "japanese": "母が弁当を作ってくれた。",
            "german": "Meine Mutter hat mir ein Bento gemacht.",
            "start": 5,
            "answer": "作ってくれた",
            "acceptedAnswers": [
              "作ってくれた"
            ],
            "distractors": [
              {
                "text": "作ってもらった",
                "reason": "Dies macht die Mutter zur Empfängerin statt zur Handelnden."
              },
              {
                "text": "作ってくれなかった",
                "reason": "Dies verneint die Handlung."
              },
              {
                "text": "作ったくれた",
                "reason": "くれる folgt der て-Form."
              }
            ],
            "promptKana": "ははがべんとうを＿＿＿。"
          }
        }
      },
      {
        "japanese": "友達が駅まで送ってくれた。",
        "romaji": "Tomodachi ga eki made okutte kureta.",
        "german": "Mein Freund hat mich zum Bahnhof gebracht."
      }
    ],
    "notes": "Höflich: ～てくださる. Bitte: ～てくれませんか (Könntest du bitte...?).",
    "related": [
      "n4-teageru",
      "n4-temorau"
    ]
  },
  {
    "id": "n4-koto-ni-suru",
    "pattern": "～ことにする",
    "level": "N4",
    "category": "Verben",
    "meaning": "Sich entscheiden zu",
    "explanation": "ことにする drückt eine aktive, persönliche Entscheidung aus.",
    "formation": "Verb (辞書形/ない形) + ことにする",
    "examples": [
      {
        "japanese": "来年日本に行くことにした。",
        "romaji": "Rainen Nihon ni iku koto ni shita.",
        "german": "Ich habe mich entschieden, nächstes Jahr nach Japan zu gehen.",
        "cloze": {
          "start": 7,
          "answer": "ことにした",
          "quiz": {
            "level": "N4",
            "japanese": "来年日本に行くことにした。",
            "german": "Ich habe mich entschieden, nächstes Jahr nach Japan zu gehen.",
            "start": 7,
            "answer": "ことにした",
            "acceptedAnswers": [
              "ことにした"
            ],
            "distractors": [
              {
                "text": "ことをした",
                "reason": "Die Entscheidungskonstruktion verlangt に."
              },
              {
                "text": "ことにしなかった",
                "reason": "Dies verneint die Entscheidung."
              },
              {
                "text": "ことにするた",
                "reason": "する bildet die Vergangenheit した."
              }
            ],
            "promptKana": "らいねんにほんにいく＿＿＿。"
          }
        }
      },
      {
        "japanese": "甘いものを食べないことにした。",
        "romaji": "Amai mono o tabenai koto ni shita.",
        "german": "Ich habe mich entschieden, keine Süßigkeiten mehr zu essen."
      }
    ],
    "notes": "～ことにしている = regelmäßige Gewohnheit aus eigener Entscheidung.",
    "related": [
      "n4-koto-ni-naru"
    ]
  },
  {
    "id": "n4-koto-ni-naru",
    "pattern": "～ことになる",
    "level": "N4",
    "category": "Verben",
    "meaning": "Es wird entschieden / Es kommt dazu",
    "explanation": "ことになる drückt aus, dass eine Entscheidung von außen getroffen wurde oder sich etwas so ergeben hat.",
    "formation": "Verb (辞書形/ない形) + ことになる",
    "examples": [
      {
        "japanese": "来月から大阪に転勤することになりました。",
        "romaji": "Raigetsu kara Ōsaka ni tenkin suru koto ni narimashita.",
        "german": "Es wurde entschieden, dass ich ab nächstem Monat nach Osaka versetzt werde.",
        "cloze": {
          "start": 11,
          "answer": "ことになりました",
          "quiz": {
            "level": "N4",
            "japanese": "来月から大阪に転勤することになりました。",
            "german": "Es wurde entschieden, dass ich ab nächstem Monat nach Osaka versetzt werde.",
            "start": 11,
            "answer": "ことになりました",
            "acceptedAnswers": [
              "ことになりました"
            ],
            "distractors": [
              {
                "text": "ことをなりました",
                "reason": "なる verlangt hier に, nicht を."
              },
              {
                "text": "ことになりませんでした",
                "reason": "Dies verneint die getroffene Entscheidung."
              },
              {
                "text": "ことになるました",
                "reason": "ます wird nicht an なる angeschlossen."
              }
            ],
            "promptKana": "らいげつからおおさかにてんきんする＿＿＿。"
          }
        }
      },
      {
        "japanese": "会議は中止になることになった。",
        "romaji": "Kaigi wa chūshi ni naru koto ni natta.",
        "german": "Es wurde beschlossen, die Konferenz abzusagen."
      }
    ],
    "notes": "～ことになっている = bestehende Regel/Vereinbarung.",
    "related": [
      "n4-koto-ni-suru"
    ]
  },
  {
    "id": "n4-you-ni-suru",
    "pattern": "～ようにする",
    "level": "N4",
    "category": "Verben",
    "meaning": "Sich bemühen zu, darauf achten",
    "explanation": "ようにする drückt aus, dass man sich bewusst bemüht, etwas zu tun oder zu vermeiden.",
    "formation": "Verb (辞書形/ない形) + ようにする",
    "examples": [
      {
        "japanese": "毎日運動するようにしています。",
        "romaji": "Mainichi undō suru yō ni shiteimasu.",
        "german": "Ich achte darauf, jeden Tag Sport zu machen.",
        "cloze": {
          "start": 6,
          "answer": "ようにしています",
          "quiz": {
            "level": "N4",
            "japanese": "毎日運動するようにしています。",
            "german": "Ich achte darauf, jeden Tag Sport zu machen.",
            "start": 6,
            "answer": "ようにしています",
            "acceptedAnswers": [
              "ようにしています"
            ],
            "distractors": [
              {
                "text": "ようをしています",
                "reason": "Die angestrebte Gewohnheit wird mit に angeschlossen."
              },
              {
                "text": "ようにしていません",
                "reason": "Dies verneint die Bemühung."
              },
              {
                "text": "ようにしますて",
                "reason": "しますて ist keine て-Form."
              }
            ],
            "promptKana": "まいにちうんどうする＿＿＿。"
          }
        }
      },
      {
        "japanese": "遅刻しないようにしてください。",
        "romaji": "Chikoku shinai yō ni shite kudasai.",
        "german": "Achten Sie bitte darauf, nicht zu spät zu kommen."
      }
    ],
    "notes": "～ようにしている = regelmäßige Gewohnheit, auf die man achtet.",
    "related": [
      "n4-you-ni-naru"
    ]
  },
  {
    "id": "n4-you-ni-naru",
    "pattern": "～ようになる",
    "level": "N4",
    "category": "Verben",
    "meaning": "Es kommt dazu dass, anfangen zu können",
    "explanation": "ようになる drückt eine allmähliche Veränderung oder Entwicklung aus – etwas, das vorher nicht möglich war, wird möglich.",
    "formation": "Verb (辞書形/ない形) + ようになる",
    "examples": [
      {
        "japanese": "日本語が話せるようになりました。",
        "romaji": "Nihongo ga hanaseru yō ni narimashita.",
        "german": "Ich bin so weit gekommen, dass ich Japanisch sprechen kann.",
        "cloze": {
          "start": 7,
          "answer": "ようになりました",
          "quiz": {
            "level": "N4",
            "japanese": "日本語が話せるようになりました。",
            "german": "Ich bin so weit gekommen, dass ich Japanisch sprechen kann.",
            "start": 7,
            "answer": "ようになりました",
            "acceptedAnswers": [
              "ようになりました"
            ],
            "distractors": [
              {
                "text": "ようをなりました",
                "reason": "Die Veränderung verlangt に."
              },
              {
                "text": "ようになりませんでした",
                "reason": "Dies verneint die erreichte Fähigkeit."
              },
              {
                "text": "ようになるました",
                "reason": "なるました ist keine Verbform."
              }
            ],
            "promptKana": "にほんごがはなせる＿＿＿。"
          }
        }
      },
      {
        "japanese": "野菜を食べるようになった。",
        "romaji": "Yasai o taberu yō ni natta.",
        "german": "Ich habe angefangen, Gemüse zu essen."
      }
    ],
    "notes": "Verneinung: ～なくなる (aufhören zu): 食べなくなった = hat aufgehört zu essen.",
    "related": [
      "n4-you-ni-suru"
    ]
  },
  {
    "id": "n4-tehoshii",
    "pattern": "～てほしい",
    "level": "N4",
    "category": "Verben",
    "meaning": "Wollen, dass jemand etwas tut",
    "explanation": "てほしい drückt den Wunsch aus, dass eine andere Person etwas tut.",
    "formation": "Person に + Verb (て-Form) + ほしい",
    "examples": [
      {
        "japanese": "早く来てほしい。",
        "cloze": {
          "start": 3,
          "answer": "てほしい",
          "quiz": {
            "level": "N4",
            "japanese": "早く来てほしい。",
            "german": "Ich möchte, dass du bald kommst.",
            "start": 3,
            "answer": "てほしい",
            "acceptedAnswers": [
              "てほしい"
            ],
            "distractors": [
              {
                "text": "たほしい",
                "reason": "Der Wunsch nach fremdem Handeln braucht die て-Form."
              },
              {
                "text": "てほしくない",
                "reason": "Dies verneint den Wunsch."
              },
              {
                "text": "ますほしい",
                "reason": "ます kann nicht vor ほしい stehen."
              }
            ],
            "promptKana": "はやくき＿＿＿。"
          }
        },
        "romaji": "Hayaku kite hoshii.",
        "german": "Ich möchte, dass du bald kommst."
      },
      {
        "japanese": "もっと勉強してほしいです。",
        "cloze": {
          "start": 6,
          "answer": "てほしい"
        },
        "romaji": "Motto benkyō shite hoshii desu.",
        "german": "Ich möchte, dass du mehr lernst."
      }
    ],
    "notes": "Verneinung: ～ないでほしい (ich möchte, dass du es nicht tust).",
    "related": [
      "ga-hoshii",
      "n4-temorau"
    ]
  },
  {
    "id": "n4-sasetekudasai",
    "pattern": "～させてください",
    "level": "N4",
    "category": "Verben",
    "meaning": "Lassen Sie mich bitte",
    "explanation": "させてください ist die höfliche Bitte um Erlaubnis, etwas tun zu dürfen. Kombination aus Kausativ und ください.",
    "formation": "Verb (させ-Form) + てください",
    "examples": [
      {
        "japanese": "私にやらせてください。",
        "romaji": "Watashi ni yarasete kudasai.",
        "german": "Lassen Sie es mich bitte machen."
      },
      {
        "japanese": "少し考えさせてください。",
        "cloze": {
          "start": 4,
          "answer": "させてください",
          "quiz": {
            "level": "N4",
            "japanese": "少し考えさせてください。",
            "german": "Lassen Sie mich bitte kurz nachdenken.",
            "start": 4,
            "answer": "させてください",
            "acceptedAnswers": [
              "させてください"
            ],
            "distractors": [
              {
                "text": "させたください",
                "reason": "Die Bitte verlangt die て-Form."
              },
              {
                "text": "させますください",
                "reason": "ます kann hier nicht vor ください stehen."
              },
              {
                "text": "させないでください",
                "reason": "Dies bittet darum, nicht nachdenken gelassen zu werden."
              }
            ],
            "promptKana": "すこしかんがえ＿＿＿。"
          }
        },
        "romaji": "Sukoshi kangaesasete kudasai.",
        "german": "Lassen Sie mich bitte kurz nachdenken."
      }
    ],
    "notes": "Sehr höflich. Oft in geschäftlichen Kontexten verwendet.",
    "related": [
      "n4-saseru",
      "te-kudasai"
    ]
  },
  {
    "id": "n4-tabakari",
    "pattern": "～たばかり",
    "level": "N4",
    "category": "Verben",
    "meaning": "Gerade erst (getan)",
    "explanation": "たばかり drückt aus, dass eine Handlung gerade erst abgeschlossen wurde.",
    "formation": "Verb (た-Form) + ばかり",
    "examples": [
      {
        "japanese": "日本に来たばかりです。",
        "cloze": {
          "start": 4,
          "answer": "たばかり",
          "quiz": {
            "level": "N4",
            "japanese": "日本に来たばかりです。",
            "german": "Ich bin gerade erst nach Japan gekommen.",
            "start": 4,
            "answer": "たばかり",
            "acceptedAnswers": [
              "たばかり"
            ],
            "distractors": [
              {
                "text": "てばかり",
                "reason": "Dies bezeichnet ständiges Kommen statt gerade angekommen sein."
              },
              {
                "text": "るばかり",
                "reason": "来る lautet くる, nicht きる; zudem wird keine abgeschlossene Ankunft ausgedrückt."
              },
              {
                "text": "たばかりな",
                "reason": "Vor です wird nach ばかり kein な eingefügt."
              }
            ],
            "promptKana": "にほんにき＿＿＿です。"
          }
        },
        "romaji": "Nihon ni kita bakari desu.",
        "german": "Ich bin gerade erst nach Japan gekommen."
      },
      {
        "japanese": "さっき食べたばかりなのに、もうお腹が空いた。",
        "cloze": {
          "start": 5,
          "answer": "たばかり"
        },
        "romaji": "Sakki tabeta bakari na noni, mō onaka ga suita.",
        "german": "Obwohl ich gerade erst gegessen habe, habe ich schon wieder Hunger."
      }
    ],
    "notes": "Nicht verwechseln mit ～ばかり (nur/nichts als).",
    "related": [
      "n4-bakari-p",
      "n4-tokoro-da"
    ]
  },
  {
    "id": "n4-hajimeru",
    "pattern": "～始める",
    "level": "N4",
    "category": "Verben",
    "meaning": "Anfangen zu",
    "explanation": "始める als Suffix drückt den Beginn einer Handlung aus.",
    "formation": "Verb (ます-Stamm) + 始める",
    "examples": [
      {
        "japanese": "雨が降り始めた。",
        "romaji": "Ame ga furi hajimeta.",
        "german": "Es hat angefangen zu regnen.",
        "cloze": {
          "start": 4,
          "answer": "始めた",
          "quiz": {
            "level": "N4",
            "japanese": "雨が降り始めた。",
            "german": "Es hat angefangen zu regnen.",
            "start": 4,
            "answer": "始めた",
            "acceptedAnswers": [
              "始めた"
            ],
            "distractors": [
              {
                "text": "終わった",
                "reason": "Dies bezeichnet das Ende statt den Beginn."
              },
              {
                "text": "始めなかった",
                "reason": "Dies verneint den Beginn."
              },
              {
                "text": "始めるた",
                "reason": "Die Vergangenheit lautet 始めた."
              }
            ],
            "promptKana": "あめがふり＿＿＿。"
          }
        }
      },
      {
        "japanese": "日本語を勉強し始めました。",
        "romaji": "Nihongo o benkyō shi hajimemashita.",
        "german": "Ich habe angefangen, Japanisch zu lernen."
      }
    ],
    "notes": "Auch als eigenständiges Verb: 始める = beginnen.",
    "related": [
      "n4-tsuzukeru",
      "n4-owaru"
    ]
  },
  {
    "id": "n4-tsuzukeru",
    "pattern": "～続ける",
    "level": "N4",
    "category": "Verben",
    "meaning": "Fortfahren zu, weiter tun",
    "explanation": "続ける als Suffix drückt aus, dass eine Handlung fortgesetzt wird.",
    "formation": "Verb (ます-Stamm) + 続ける",
    "examples": [
      {
        "japanese": "三時間歩き続けた。",
        "romaji": "Sanjikan aruki tsuzuketa.",
        "german": "Ich bin drei Stunden lang weitergelaufen.",
        "cloze": {
          "start": 5,
          "answer": "続けた",
          "quiz": {
            "level": "N4",
            "japanese": "三時間歩き続けた。",
            "german": "Ich bin drei Stunden lang weitergelaufen.",
            "start": 5,
            "answer": "続けた",
            "acceptedAnswers": [
              "続けた"
            ],
            "distractors": [
              {
                "text": "続けなかった",
                "reason": "Dies verneint das Weiterlaufen."
              },
              {
                "text": "続けるた",
                "reason": "Dies ist keine Vergangenheitsform."
              },
              {
                "text": "ます続けた",
                "reason": "ます wird nicht vor 続けた eingefügt."
              }
            ],
            "promptKana": "さんじかんあるき＿＿＿。"
          }
        }
      },
      {
        "japanese": "諦めずに努力し続けてください。",
        "romaji": "Akiramezu ni doryoku shi tsuzukete kudasai.",
        "german": "Geben Sie nicht auf und bemühen Sie sich weiter."
      }
    ],
    "notes": "Auch eigenständig: 続ける = fortsetzen.",
    "related": [
      "n4-hajimeru",
      "n4-owaru"
    ]
  },
  {
    "id": "n4-owaru",
    "pattern": "～終わる",
    "level": "N4",
    "category": "Verben",
    "meaning": "Fertig sein mit, beenden",
    "explanation": "終わる als Suffix drückt aus, dass eine Handlung zu Ende gebracht wurde.",
    "formation": "Verb (ます-Stamm) + 終わる",
    "examples": [
      {
        "japanese": "本を読み終わりました。",
        "romaji": "Hon o yomi owarimashita.",
        "german": "Ich habe das Buch fertig gelesen.",
        "cloze": {
          "start": 4,
          "answer": "終わりました",
          "quiz": {
            "level": "N4",
            "japanese": "本を読み終わりました。",
            "german": "Ich habe das Buch fertig gelesen.",
            "start": 4,
            "answer": "終わりました",
            "acceptedAnswers": [
              "終わりました"
            ],
            "distractors": [
              {
                "text": "始めました",
                "reason": "Dies bezeichnet den Beginn statt den Abschluss."
              },
              {
                "text": "終わりませんでした",
                "reason": "Dies verneint den Abschluss."
              },
              {
                "text": "終わるました",
                "reason": "Dies ist keine höfliche Vergangenheitsform."
              }
            ],
            "promptKana": "ほんをよみ＿＿＿。"
          }
        }
      },
      {
        "japanese": "宿題を書き終わった。",
        "romaji": "Shukudai o kaki owatta.",
        "german": "Ich habe die Hausaufgaben fertig geschrieben."
      }
    ],
    "notes": "Auch eigenständig: 終わる = enden.",
    "related": [
      "n4-hajimeru",
      "n4-tsuzukeru"
    ]
  },
  {
    "id": "n4-yasui",
    "pattern": "～やすい",
    "level": "N4",
    "category": "Verben",
    "meaning": "Leicht zu, einfach zu",
    "explanation": "やすい als Suffix drückt aus, dass etwas leicht zu tun ist oder dass eine Tendenz besteht.",
    "formation": "Verb (ます-Stamm) + やすい",
    "examples": [
      {
        "japanese": "この本は読みやすい。",
        "cloze": {
          "start": 6,
          "answer": "やすい",
          "quiz": {
            "level": "N4",
            "japanese": "この本は読みやすい。",
            "german": "Dieses Buch ist leicht zu lesen.",
            "start": 6,
            "answer": "やすい",
            "acceptedAnswers": [
              "やすい"
            ],
            "distractors": [
              {
                "text": "にくい",
                "reason": "Dies bedeutet schwer lesbar."
              },
              {
                "text": "やすいだ",
                "reason": "Ein い-Adjektiv wird nicht mit だ abgeschlossen."
              },
              {
                "text": "やすくでした",
                "reason": "Dies ist keine Adjektivform."
              }
            ],
            "promptKana": "このほんはよみ＿＿＿。"
          }
        },
        "romaji": "Kono hon wa yomiyasui.",
        "german": "Dieses Buch ist leicht zu lesen."
      },
      {
        "japanese": "ガラスは割れやすい。",
        "cloze": {
          "start": 6,
          "answer": "やすい"
        },
        "romaji": "Garasu wa wareyasui.",
        "german": "Glas zerbricht leicht."
      }
    ],
    "notes": "Wird wie ein い-Adjektiv konjugiert: やすくない, やすかった.",
    "related": [
      "n4-nikui",
      "sugiru"
    ]
  },
  {
    "id": "n4-nikui",
    "pattern": "～にくい",
    "level": "N4",
    "category": "Verben",
    "meaning": "Schwer zu, schwierig zu",
    "explanation": "にくい als Suffix drückt aus, dass etwas schwer zu tun ist.",
    "formation": "Verb (ます-Stamm) + にくい",
    "examples": [
      {
        "japanese": "この字は読みにくい。",
        "cloze": {
          "start": 6,
          "answer": "にくい",
          "quiz": {
            "level": "N4",
            "japanese": "この字は読みにくい。",
            "german": "Diese Schrift ist schwer zu lesen.",
            "start": 6,
            "answer": "にくい",
            "acceptedAnswers": [
              "にくい",
              "づらい"
            ],
            "distractors": [
              {
                "text": "やすい",
                "reason": "Dies bedeutet leicht lesbar."
              },
              {
                "text": "にくいだ",
                "reason": "Ein い-Adjektiv wird nicht mit だ abgeschlossen."
              },
              {
                "text": "にくかっただ",
                "reason": "だ gehört nicht hinter die い-Adjektiv-Vergangenheit."
              }
            ],
            "promptKana": "このじはよみ＿＿＿。"
          }
        },
        "romaji": "Kono ji wa yominikui.",
        "german": "Diese Schrift ist schwer zu lesen."
      },
      {
        "japanese": "この靴は歩きにくい。",
        "cloze": {
          "start": 6,
          "answer": "にくい"
        },
        "romaji": "Kono kutsu wa aruki nikui.",
        "german": "Diese Schuhe sind schwer zu laufen."
      }
    ],
    "notes": "Wird wie ein い-Adjektiv konjugiert. Ähnlich: ～づらい (mit emotionaler Schwierigkeit).",
    "related": [
      "n4-yasui",
      "sugiru"
    ]
  },
  {
    "id": "n4-sou-appearance",
    "pattern": "～そうだ (様態)",
    "level": "N4",
    "category": "Verben",
    "meaning": "Sieht aus als ob, scheint",
    "explanation": "そうだ (様態/yōtai) drückt einen Eindruck basierend auf dem Aussehen aus. Basiert auf eigener Beobachtung.",
    "formation": "Verb (ます-Stamm) + そうだ / い-Adj (ohne い) + そうだ / な-Adj + そうだ",
    "examples": [
      {
        "japanese": "雨が降りそうだ。",
        "romaji": "Ame ga furisō da.",
        "german": "Es sieht aus, als ob es regnen wird.",
        "cloze": {
          "start": 4,
          "answer": "そうだ",
          "quiz": {
            "level": "N4",
            "japanese": "雨が降りそうだ。",
            "german": "Es sieht aus, als ob es regnen wird.",
            "start": 4,
            "answer": "そうだ",
            "acceptedAnswers": [
              "そうだ"
            ],
            "distractors": [
              {
                "text": "そうな",
                "reason": "Die attributive Form benötigt ein Bezugsnomen."
              },
              {
                "text": "そうに",
                "reason": "Die adverbiale Form benötigt ein folgendes Prädikat."
              },
              {
                "text": "そうのだ",
                "reason": "そう als Erscheinungsform schließt nicht mit のだ an."
              }
            ],
            "promptKana": "あめがふり＿＿＿。"
          }
        }
      },
      {
        "japanese": "このケーキはおいしそうだ。",
        "romaji": "Kono kēki wa oishisō da.",
        "german": "Dieser Kuchen sieht lecker aus."
      }
    ],
    "notes": "Ausnahmen: いい→よさそう, ない→なさそう. Nicht verwechseln mit ～そうだ (Hörensagen).",
    "related": [
      "n4-sou-hearsay",
      "n4-you-da",
      "n4-rashii"
    ]
  },
  {
    "id": "n4-tearu",
    "pattern": "～てある",
    "level": "N4",
    "category": "Verben",
    "meaning": "Ist gemacht worden (Zustandsresultat)",
    "explanation": "てある drückt aus, dass eine absichtliche Handlung ausgeführt wurde und deren Ergebnis noch andauert.",
    "formation": "Verb (て-Form) + ある",
    "examples": [
      {
        "japanese": "窓が開けてある。",
        "cloze": {
          "start": 4,
          "answer": "てある",
          "quiz": {
            "level": "N4",
            "japanese": "窓が開けてある。",
            "german": "Das Fenster ist geöffnet worden (und steht noch offen).",
            "start": 4,
            "answer": "てある",
            "acceptedAnswers": [
              "てある"
            ],
            "distractors": [
              {
                "text": "たある",
                "reason": "ある folgt hier der て-Form."
              },
              {
                "text": "てあらない",
                "reason": "ある wird mit ない verneint, nicht mit あらない."
              },
              {
                "text": "ますある",
                "reason": "ます kann nicht vor ある stehen."
              }
            ],
            "promptKana": "まどがあけ＿＿＿。"
          }
        },
        "romaji": "Mado ga akete aru.",
        "german": "Das Fenster ist geöffnet worden (und steht noch offen)."
      },
      {
        "japanese": "テーブルの上にメモが書いてある。",
        "cloze": {
          "start": 12,
          "answer": "てある"
        },
        "romaji": "Tēburu no ue ni memo ga kaite aru.",
        "german": "Auf dem Tisch ist eine Notiz geschrieben."
      }
    ],
    "notes": "Unterschied zu ～ている: てある betont das absichtliche Vorbereiten, ている den aktuellen Zustand.",
    "related": [
      "te-iru",
      "n4-teoku"
    ]
  },
  {
    "id": "n4-zu-ni",
    "pattern": "～ずに / ～ないで",
    "level": "N4",
    "category": "Verben",
    "meaning": "Ohne zu tun",
    "explanation": "ずに ist die formelle Variante von ないで. Beide drücken aus, dass eine Handlung nicht ausgeführt wird, während eine andere stattfindet.",
    "formation": "Verb (ない-Stamm) + ずに / Verb (ない-Form) + で",
    "examples": [
      {
        "japanese": "朝ご飯を食べずに学校に行った。",
        "cloze": {
          "start": 6,
          "answer": "ずに",
          "quiz": {
            "level": "N4",
            "japanese": "朝ご飯を食べずに学校に行った。",
            "german": "Ich ging ohne Frühstück zur Schule.",
            "start": 6,
            "answer": "ずに",
            "acceptedAnswers": [
              "ずに",
              "ないで"
            ],
            "distractors": [
              {
                "text": "てから",
                "reason": "Dies bedeutet nach dem Frühstück."
              },
              {
                "text": "た後で",
                "reason": "Dies bedeutet nach dem Frühstück."
              },
              {
                "text": "ながら",
                "reason": "Dies bedeutet während des Essens."
              }
            ],
            "promptKana": "あさごはんをたべ＿＿＿がっこうにいった。"
          }
        },
        "romaji": "Asagohan o tabezu ni gakkō ni itta.",
        "german": "Ich ging ohne Frühstück zur Schule."
      },
      {
        "japanese": "辞書を使わないで読めた。",
        "cloze": {
          "start": 5,
          "answer": "ないで"
        },
        "romaji": "Jisho o tsukawanaide yometa.",
        "german": "Ich konnte es ohne Wörterbuch lesen."
      }
    ],
    "notes": "する→せずに (Ausnahme). ずに ist schriftsprachlicher als ないで.",
    "related": [
      "naide"
    ]
  },
  {
    "id": "n4-imperative",
    "pattern": "命令形",
    "level": "N4",
    "category": "Verben",
    "meaning": "Imperativform (Befehl)",
    "explanation": "Die Imperativform ist ein direkter Befehl. Sie wird in der Alltagssprache selten verwendet und klingt grob.",
    "formation": "Godan: u→e (書く→書け) / Ichidan: る→ろ (食べる→食べろ)",
    "examples": [
      {
        "japanese": "早くしろ！",
        "romaji": "Hayaku shiro!",
        "german": "Beeil dich!",
        "cloze": {
          "start": 2,
          "answer": "しろ",
          "quiz": {
            "level": "N4",
            "japanese": "早くしろ！",
            "german": "Beeil dich!",
            "start": 2,
            "answer": "しろ",
            "acceptedAnswers": [
              "しろ",
              "せよ"
            ],
            "distractors": [
              {
                "text": "した",
                "reason": "Dies berichtet Vergangenheit statt zu befehlen."
              },
              {
                "text": "しない",
                "reason": "Dies verneint die Handlung."
              },
              {
                "text": "するろ",
                "reason": "Dies ist keine Imperativform."
              }
            ],
            "promptKana": "はやく＿＿＿！"
          }
        }
      },
      {
        "japanese": "静かにしろ。",
        "romaji": "Shizuka ni shiro.",
        "german": "Sei still."
      },
      {
        "japanese": "頑張れ！",
        "romaji": "Ganbare!",
        "german": "Gib dein Bestes!"
      }
    ],
    "notes": "する→しろ, 来る→来い (こい). Oft bei Anfeuerungen: 頑張れ! Negative Form: ～な (するな = tu es nicht).",
    "related": [
      "n4-nasai"
    ]
  },
  {
    "id": "n4-nasai",
    "pattern": "～なさい",
    "level": "N4",
    "category": "Verben",
    "meaning": "Tu ... (höflicher Befehl)",
    "explanation": "なさい ist eine höflichere Befehlsform, die oft von Eltern, Lehrern oder Vorgesetzten verwendet wird.",
    "formation": "Verb (ます-Stamm) + なさい",
    "examples": [
      {
        "japanese": "早く寝なさい。",
        "cloze": {
          "start": 3,
          "answer": "なさい",
          "quiz": {
            "level": "N4",
            "japanese": "早く寝なさい。",
            "german": "Geh früh schlafen.",
            "start": 3,
            "answer": "なさい",
            "acceptedAnswers": [
              "なさい"
            ],
            "distractors": [
              {
                "text": "るなさい",
                "reason": "なさい folgt dem Stamm, nicht der Wörterbuchform."
              },
              {
                "text": "たなさい",
                "reason": "なさい folgt nicht der た-Form."
              },
              {
                "text": "なかった",
                "reason": "Dies berichtet Nichtschlafen statt eine Aufforderung."
              }
            ],
            "promptKana": "はやくね＿＿＿。"
          }
        },
        "romaji": "Hayaku nenasai.",
        "german": "Geh früh schlafen."
      },
      {
        "japanese": "宿題をしなさい。",
        "cloze": {
          "start": 4,
          "answer": "なさい"
        },
        "romaji": "Shukudai o shinasai.",
        "german": "Mach deine Hausaufgaben."
      }
    ],
    "notes": "Höflicher als 命令形, aber immer noch autoritär. Nur von oben nach unten verwendet.",
    "related": [
      "n4-imperative",
      "te-kudasai"
    ]
  },
  {
    "id": "n4-adj-ba",
    "pattern": "～ければ / ～なら",
    "level": "N4",
    "category": "Adjektive",
    "meaning": "Wenn (Adjektiv-Konditional)",
    "explanation": "い-Adjektive: い→ければ. な-Adjektive: なら(ば).",
    "formation": "い-Adj: い→ければ / な-Adj: ～なら(ば)",
    "examples": [
      {
        "japanese": "安ければ買います。",
        "cloze": {
          "start": 1,
          "answer": "ければ",
          "quiz": {
            "level": "N4",
            "japanese": "安ければ買います。",
            "german": "Wenn es günstig ist, kaufe ich es.",
            "start": 1,
            "answer": "ければ",
            "acceptedAnswers": [
              "ければ"
            ],
            "distractors": [
              {
                "text": "いければ",
                "reason": "Das い wird vor ければ entfernt."
              },
              {
                "text": "かったれば",
                "reason": "Dies ist keine Konditionalform."
              },
              {
                "text": "くないなら",
                "reason": "Dies kehrt die Bedingung um: wenn es nicht günstig ist."
              }
            ],
            "promptKana": "やす＿＿＿かいます。"
          }
        },
        "romaji": "Yasukereba kaimasu.",
        "german": "Wenn es günstig ist, kaufe ich es."
      },
      {
        "japanese": "暇なら遊びに来てください。",
        "cloze": {
          "start": 1,
          "answer": "なら"
        },
        "romaji": "Hima nara asobi ni kite kudasai.",
        "german": "Wenn du frei bist, komm vorbei."
      }
    ],
    "notes": "いい→よければ. Verneinung: ～くなければ / ～でなければ.",
    "related": [
      "n4-ba",
      "n4-nara"
    ]
  },
  {
    "id": "n4-adj-souna",
    "pattern": "～そうな / ～そうに",
    "level": "N4",
    "category": "Adjektive",
    "meaning": "Sieht ... aus (Eindruck)",
    "explanation": "そうな vor Nomen, そうに vor Verben. Visueller Eindruck.",
    "formation": "い-Adj (ohne い) + そうな/に / な-Adj + そうな/に",
    "examples": [
      {
        "japanese": "おいしそうなケーキですね。",
        "cloze": {
          "start": 3,
          "answer": "そうな",
          "quiz": {
            "level": "N4",
            "japanese": "おいしそうなケーキですね。",
            "german": "Ein lecker aussehender Kuchen.",
            "start": 3,
            "answer": "そうな",
            "acceptedAnswers": [
              "そうな"
            ],
            "distractors": [
              {
                "text": "そうに",
                "reason": "Vor dem Nomen braucht man そうな."
              },
              {
                "text": "そうだ",
                "reason": "Die Kopula steht hier nicht attributiv vor ケーキ."
              },
              {
                "text": "そうの",
                "reason": "Die attributive Form lautet そうな."
              }
            ],
            "promptKana": "おいし＿＿＿ケーキですね。"
          }
        },
        "romaji": "Oishisō na kēki desu ne.",
        "german": "Ein lecker aussehender Kuchen."
      },
      {
        "japanese": "楽しそうに笑っている。",
        "cloze": {
          "start": 2,
          "answer": "そうに"
        },
        "romaji": "Tanoshisō ni waratteiru.",
        "german": "Er lacht vergnügt."
      }
    ],
    "notes": "いい→よさそう, ない→なさそう.",
    "related": [
      "n4-sou-appearance"
    ]
  },
  {
    "id": "n4-adj-sugiru",
    "pattern": "～すぎる (Adj.)",
    "level": "N4",
    "category": "Adjektive",
    "meaning": "Zu ... (Übertreibung)",
    "explanation": "すぎる mit Adjektiven: übermäßig starke Eigenschaft.",
    "formation": "い-Adj (ohne い) + すぎる / な-Adj + すぎる",
    "examples": [
      {
        "japanese": "この部屋は暑すぎる。",
        "romaji": "Kono heya wa atsusugiru.",
        "german": "Dieses Zimmer ist zu heiß.",
        "cloze": {
          "start": 6,
          "answer": "すぎる",
          "quiz": {
            "level": "N4",
            "japanese": "この部屋は暑すぎる。",
            "german": "Dieses Zimmer ist zu heiß.",
            "start": 6,
            "answer": "すぎる",
            "acceptedAnswers": [
              "すぎる"
            ],
            "distractors": [
              {
                "text": "いすぎる",
                "reason": "Das letzte い entfällt vor すぎる."
              },
              {
                "text": "すぎるだ",
                "reason": "Nach dem Verb すぎる steht kein だ."
              },
              {
                "text": "くすぎる",
                "reason": "Die Form wird hier unmittelbar an 暑 angeschlossen."
              }
            ],
            "promptKana": "このへやはあつ＿＿＿。"
          }
        }
      },
      {
        "japanese": "静かすぎて怖い。",
        "romaji": "Shizuka sugite kowai.",
        "german": "So still, dass es unheimlich ist."
      }
    ],
    "notes": "Konjugation wie ichidan-Verb.",
    "related": [
      "sugiru"
    ]
  },
  {
    "id": "n4-ku-suru",
    "pattern": "～くする / ～にする",
    "level": "N4",
    "category": "Adjektive",
    "meaning": "Etwas ... machen",
    "explanation": "くする (い-Adj) und にする (な-Adj): aktive Veränderung.",
    "formation": "い-Adj: い→くする / な-Adj: ～にする",
    "examples": [
      {
        "japanese": "部屋を明るくした。",
        "romaji": "Heya o akaruku shita.",
        "german": "Ich habe das Zimmer heller gemacht.",
        "cloze": {
          "start": 3,
          "answer": "明るくした",
          "quiz": {
            "level": "N4",
            "japanese": "部屋を明るくした。",
            "german": "Ich habe das Zimmer heller gemacht.",
            "start": 3,
            "answer": "明るくした",
            "acceptedAnswers": [
              "明るくした"
            ],
            "distractors": [
              {
                "text": "明るいした",
                "reason": "Vor する braucht ein い-Adjektiv die く-Form."
              },
              {
                "text": "明るくしなかった",
                "reason": "Dies verneint das Heller-Machen."
              },
              {
                "text": "明るくするた",
                "reason": "Dies ist keine Vergangenheit von する."
              }
            ],
            "promptKana": "へやを＿＿＿。"
          }
        }
      },
      {
        "japanese": "部屋をきれいにしてください。",
        "romaji": "Heya o kirei ni shite kudasai.",
        "german": "Machen Sie bitte das Zimmer sauber."
      }
    ],
    "notes": "Vgl. ～くなる/～になる (von selbst werden).",
    "related": [
      "ku-naru-ni-naru"
    ]
  },
  {
    "id": "n4-sa",
    "pattern": "～さ",
    "level": "N4",
    "category": "Adjektive",
    "meaning": "Die ... (Nominalisierung)",
    "explanation": "さ wandelt Adjektive in Nomen um.",
    "formation": "い-Adj (ohne い) + さ / な-Adj + さ",
    "examples": [
      {
        "japanese": "この山の高さは何メートルですか。",
        "cloze": {
          "start": 5,
          "answer": "さ",
          "quiz": {
            "level": "N4",
            "japanese": "この山の高さは何メートルですか。",
            "german": "Wie hoch ist dieser Berg?",
            "start": 5,
            "answer": "さ",
            "acceptedAnswers": [
              "さ"
            ],
            "distractors": [
              {
                "text": "い",
                "reason": "高い nominalisiert hier nicht die messbare Höhe."
              },
              {
                "text": "く",
                "reason": "Die く-Form ist hier kein Höhenmaß-Nomen."
              },
              {
                "text": "かった",
                "reason": "Dies wäre Vergangenheit statt einer messbaren Höhe."
              }
            ],
            "promptKana": "このやまのたか＿＿＿はなんメートルですか。"
          }
        },
        "romaji": "Kono yama no takasa wa nan mētoru desu ka.",
        "german": "Wie hoch ist dieser Berg?"
      },
      {
        "japanese": "日本語の難しさを実感した。",
        "cloze": {
          "start": 6,
          "answer": "さ"
        },
        "romaji": "Nihongo no muzukashisa o jikkan shita.",
        "german": "Ich habe die Schwierigkeit des Japanischen erfahren."
      }
    ],
    "notes": "高さ, 長さ, 深さ, 大きさ, 便利さ usw.",
    "related": []
  },
  {
    "id": "n4-garu",
    "pattern": "～がる",
    "level": "N4",
    "category": "Adjektive",
    "meaning": "Zeichen zeigen von",
    "explanation": "がる: äußere Zeichen eines Gefühls bei Dritten.",
    "formation": "い-Adj (ohne い) + がる",
    "examples": [
      {
        "japanese": "子供が怖がっている。",
        "romaji": "Kodomo ga kowagatte iru.",
        "german": "Das Kind zeigt Angst.",
        "cloze": {
          "start": 3,
          "answer": "怖がっている",
          "quiz": {
            "level": "N4",
            "japanese": "子供が怖がっている。",
            "german": "Das Kind zeigt Angst.",
            "start": 3,
            "answer": "怖がっている",
            "acceptedAnswers": [
              "怖がっている"
            ],
            "distractors": [
              {
                "text": "怖いがっている",
                "reason": "Vor がる entfällt das letzte い."
              },
              {
                "text": "怖がっていない",
                "reason": "Dies verneint die gezeigte Angst."
              },
              {
                "text": "怖がるている",
                "reason": "Die て-Form lautet 怖がって."
              }
            ],
            "promptKana": "こどもが＿＿＿。"
          }
        }
      },
      {
        "japanese": "彼女は新しい服を欲しがっている。",
        "romaji": "Kanojo wa atarashii fuku o hoshigatte iru.",
        "german": "Sie will neue Kleidung."
      }
    ],
    "notes": "欲しい→欲しがる, 怖い→怖がる. Godan-Verb.",
    "related": [
      "ga-hoshii"
    ]
  },
  {
    "id": "n4-you-na",
    "pattern": "～ような / ～みたいな",
    "level": "N4",
    "category": "Adjektive",
    "meaning": "Wie ... (attributiv)",
    "explanation": "ような (formell) und みたいな (informell) vor Nomen.",
    "formation": "Nomen + のような/みたいな + Nomen",
    "examples": [
      {
        "japanese": "夢のような一日だった。",
        "cloze": {
          "start": 2,
          "answer": "ような",
          "quiz": {
            "level": "N4",
            "japanese": "夢のような一日だった。",
            "german": "Es war ein traumhafter Tag.",
            "start": 2,
            "answer": "ような",
            "acceptedAnswers": [
              "ような"
            ],
            "distractors": [
              {
                "text": "ように",
                "reason": "Vor dem Nomen wird ような gebraucht."
              },
              {
                "text": "ようだ",
                "reason": "だ ist hier keine attributive Verbindung."
              },
              {
                "text": "ようの",
                "reason": "夢のような verlangt な vor 一日."
              }
            ],
            "promptKana": "ゆめの＿＿＿いちにちだった。"
          }
        },
        "romaji": "Yume no yō na ichinichi datta.",
        "german": "Es war ein traumhafter Tag."
      },
      {
        "japanese": "彼みたいな人になりたい。",
        "cloze": {
          "start": 1,
          "answer": "みたいな"
        },
        "romaji": "Kare mitai na hito ni naritai.",
        "german": "Ich möchte so werden wie er."
      }
    ],
    "notes": "のような = formell, みたいな = informell.",
    "related": [
      "n4-no-you-ni",
      "n4-you-da"
    ]
  },
  {
    "id": "n4-yori",
    "pattern": "～より～のほうが",
    "level": "N4",
    "category": "Adjektive",
    "meaning": "... ist mehr als (Komparativ)",
    "explanation": "より = Vergleichsgegenstand, のほうが = stärkeres Element.",
    "formation": "A より B のほうが + Adj",
    "examples": [
      {
        "japanese": "電車よりバスのほうが安い。",
        "romaji": "Densha yori basu no hō ga yasui.",
        "german": "Der Bus ist günstiger als der Zug.",
        "cloze": {
          "start": 2,
          "answer": "より",
          "quiz": {
            "level": "N4",
            "japanese": "電車よりバスのほうが安い。",
            "german": "Der Bus ist günstiger als der Zug.",
            "start": 2,
            "answer": "より",
            "acceptedAnswers": [
              "より"
            ],
            "distractors": [
              {
                "text": "まで",
                "reason": "まで setzt eine Grenze statt eines Vergleichsmaßstabs."
              },
              {
                "text": "へ",
                "reason": "へ bezeichnet eine Richtung."
              },
              {
                "text": "を",
                "reason": "を markiert hier keinen Vergleichsmaßstab."
              }
            ],
            "promptKana": "でんしゃ＿＿＿バスのほうがやすい。"
          }
        }
      },
      {
        "japanese": "夏より冬のほうが好きです。",
        "romaji": "Natsu yori fuyu no hō ga suki desu.",
        "german": "Ich mag Winter lieber als Sommer."
      }
    ],
    "notes": "思ったより難しい (schwieriger als gedacht).",
    "related": [
      "n4-ichiban"
    ]
  },
  {
    "id": "n4-ichiban",
    "pattern": "一番～",
    "level": "N4",
    "category": "Adjektive",
    "meaning": "Am meisten (Superlativ)",
    "explanation": "一番 drückt den höchsten Grad aus.",
    "formation": "Gruppe + の中で + 一番 + Adj",
    "examples": [
      {
        "japanese": "日本で一番高い山は富士山です。",
        "romaji": "Nihon de ichiban takai yama wa Fujisan desu.",
        "german": "Der höchste Berg Japans ist der Fuji.",
        "cloze": {
          "start": 3,
          "answer": "一番",
          "quiz": {
            "level": "N4",
            "japanese": "日本で一番高い山は富士山です。",
            "german": "Der höchste Berg Japans ist der Fuji.",
            "start": 3,
            "answer": "一番",
            "acceptedAnswers": [
              "一番"
            ],
            "distractors": [
              {
                "text": "一つ",
                "reason": "Dies zählt ein Stück statt einen Höchstgrad."
              },
              {
                "text": "少し",
                "reason": "Dies bedeutet ein wenig, nicht am höchsten."
              },
              {
                "text": "あまり",
                "reason": "Dies bedeutet nicht den höchsten Rang."
              }
            ],
            "promptKana": "にほんで＿＿＿たかいやまはふじさんです。"
          }
        }
      },
      {
        "japanese": "クラスで誰が一番背が高い？",
        "romaji": "Kurasu de dare ga ichiban se ga takai?",
        "german": "Wer ist der Größte in der Klasse?"
      }
    ],
    "notes": "最も (もっとも) = formellere Variante.",
    "related": [
      "n4-yori"
    ]
  },
  {
    "id": "n4-rashii-adj",
    "pattern": "～らしい (typisch)",
    "level": "N4",
    "category": "Adjektive",
    "meaning": "Typisch für, ...-haft",
    "explanation": "らしい als Suffix: typisch, charakteristisch.",
    "formation": "Nomen + らしい",
    "examples": [
      {
        "japanese": "今日は春らしい天気ですね。",
        "romaji": "Kyō wa haru rashii tenki desu ne.",
        "german": "Typisches Frühlingswetter heute.",
        "cloze": {
          "start": 4,
          "answer": "らしい",
          "quiz": {
            "level": "N4",
            "japanese": "今日は春らしい天気ですね。",
            "german": "Typisches Frühlingswetter heute.",
            "start": 4,
            "answer": "らしい",
            "acceptedAnswers": [
              "らしい"
            ],
            "distractors": [
              {
                "text": "らしいな",
                "reason": "らしい bestimmt Nomen ohne zusätzliches な."
              },
              {
                "text": "らしく",
                "reason": "Die adverbiale Form bestimmt hier nicht das Nomen."
              },
              {
                "text": "らしいの",
                "reason": "Die attributive Form benötigt kein の."
              }
            ],
            "promptKana": "きょうははる＿＿＿てんきですね。"
          }
        }
      },
      {
        "japanese": "彼女はとても女性らしい。",
        "romaji": "Kanojo wa totemo josei rashii.",
        "german": "Sie ist sehr feminin."
      }
    ],
    "notes": "Nicht verwechseln mit ～らしい (Vermutung).",
    "related": [
      "n4-rashii"
    ]
  },
  {
    "id": "n4-gachi",
    "pattern": "～がち",
    "level": "N4",
    "category": "Adjektive",
    "meaning": "Neigung zu",
    "explanation": "がち: (meist negative) Tendenz.",
    "formation": "Verb (ます-Stamm) + がち / Nomen + がち",
    "examples": [
      {
        "japanese": "最近風邪を引きがちだ。",
        "cloze": {
          "start": 7,
          "answer": "がち",
          "quiz": {
            "level": "N4",
            "japanese": "最近風邪を引きがちだ。",
            "german": "Neige in letzter Zeit zu Erkältungen.",
            "start": 7,
            "answer": "がち",
            "acceptedAnswers": [
              "がち"
            ],
            "distractors": [
              {
                "text": "たい",
                "reason": "Ein たい-Ausdruck erhält kein だ."
              },
              {
                "text": "やすい",
                "reason": "Ein い-Adjektiv erhält kein だ."
              },
              {
                "text": "がちに",
                "reason": "Die adverbiale Form kann nicht vor だ stehen."
              }
            ],
            "promptKana": "さいきんかぜをひき＿＿＿だ。"
          }
        },
        "romaji": "Saikin kaze o hikigachi da.",
        "german": "Neige in letzter Zeit zu Erkältungen."
      },
      {
        "japanese": "曇りがちの天気が続く。",
        "cloze": {
          "start": 2,
          "answer": "がち"
        },
        "romaji": "Kumorigachi no tenki ga tsuzuku.",
        "german": "Vorwiegend bewölktes Wetter."
      }
    ],
    "notes": "Wie な-Adj: ～がちな + Nomen.",
    "related": [
      "n4-yasui"
    ]
  },
  {
    "id": "n4-you-da",
    "pattern": "～ようだ",
    "level": "N4",
    "category": "Satzstrukturen",
    "meaning": "Es scheint als ob",
    "explanation": "ようだ: Vermutung basierend auf eigener Beobachtung.",
    "formation": "Verb/い-Adj + ようだ / な-Adj + なようだ / Nomen + のようだ",
    "examples": [
      {
        "japanese": "彼は忙しいようだ。",
        "cloze": {
          "start": 5,
          "answer": "ようだ",
          "quiz": {
            "level": "N4",
            "japanese": "彼は忙しいようだ。",
            "german": "Er scheint beschäftigt zu sein.",
            "start": 5,
            "answer": "ようだ",
            "acceptedAnswers": [
              "ようだ",
              "みたいだ",
              "らしい"
            ],
            "distractors": [
              {
                "text": "なようだ",
                "reason": "Nach einem い-Adjektiv wird kein な eingefügt."
              },
              {
                "text": "ような",
                "reason": "Die attributive Form verlangt ein folgendes Nomen."
              },
              {
                "text": "ように",
                "reason": "Die adverbiale Form verlangt eine folgende Aussage."
              }
            ],
            "promptKana": "かれはいそがしい＿＿＿。"
          }
        },
        "romaji": "Kare wa isogashii yō da.",
        "german": "Er scheint beschäftigt zu sein."
      },
      {
        "japanese": "風邪を引いたようです。",
        "romaji": "Kaze o hiita yō desu.",
        "german": "Ich habe mich wohl erkältet."
      }
    ],
    "notes": "Formeller als みたいだ.",
    "related": [
      "n4-mitai-da",
      "n4-rashii"
    ]
  },
  {
    "id": "n4-mitai-da",
    "pattern": "～みたいだ",
    "level": "N4",
    "category": "Satzstrukturen",
    "meaning": "Scheint so (umgangssprachlich)",
    "explanation": "みたいだ: informelle Variante von ようだ.",
    "formation": "Verb/Adj/Nomen + みたいだ",
    "examples": [
      {
        "japanese": "雨が降るみたいだ。",
        "cloze": {
          "start": 4,
          "answer": "みたいだ",
          "quiz": {
            "level": "N4",
            "japanese": "雨が降るみたいだ。",
            "german": "Es sieht nach Regen aus.",
            "start": 4,
            "answer": "みたいだ",
            "acceptedAnswers": [
              "みたいだ",
              "ようだ",
              "らしい"
            ],
            "distractors": [
              {
                "text": "なみたいだ",
                "reason": "Nach dem Verb wird kein な eingefügt."
              },
              {
                "text": "みたいな",
                "reason": "Diese Form braucht ein folgendes Nomen."
              },
              {
                "text": "みたいに",
                "reason": "Diese Form braucht ein folgendes Prädikat."
              }
            ],
            "promptKana": "あめがふる＿＿＿。"
          }
        },
        "romaji": "Ame ga furu mitai da.",
        "german": "Es sieht nach Regen aus."
      },
      {
        "japanese": "あの人は先生みたいだ。",
        "cloze": {
          "start": 6,
          "answer": "みたいだ"
        },
        "romaji": "Ano hito wa sensei mitai da.",
        "german": "Die Person scheint Lehrer zu sein."
      }
    ],
    "notes": "Vor Nomen: みたいな, vor Verben: みたいに.",
    "related": [
      "n4-you-da",
      "n4-rashii"
    ]
  },
  {
    "id": "n4-rashii",
    "pattern": "～らしい",
    "level": "N4",
    "category": "Satzstrukturen",
    "meaning": "Anscheinend, offenbar",
    "explanation": "らしい: Vermutung basierend auf Hörensagen oder Schluss.",
    "formation": "Verb/Adj/Nomen + らしい",
    "examples": [
      {
        "japanese": "明日は雨らしい。",
        "cloze": {
          "start": 4,
          "answer": "らしい",
          "quiz": {
            "level": "N4",
            "japanese": "明日は雨らしい。",
            "german": "Anscheinend regnet es morgen.",
            "start": 4,
            "answer": "らしい",
            "acceptedAnswers": [
              "らしい",
              "のようだ",
              "みたいだ",
              "だそうだ"
            ],
            "distractors": [
              {
                "text": "なようだ",
                "reason": "Nach dem Nomen wäre 雨のようだ korrekt."
              },
              {
                "text": "らしく",
                "reason": "Die adverbiale Form schließt den Satz nicht ab."
              },
              {
                "text": "らしいだ",
                "reason": "Nach らしい steht kein だ."
              }
            ],
            "promptKana": "あしたはあめ＿＿＿。"
          }
        },
        "romaji": "Ashita wa ame rashii.",
        "german": "Anscheinend regnet es morgen."
      },
      {
        "japanese": "あの店はおいしいらしいですよ。",
        "cloze": {
          "start": 8,
          "answer": "らしい"
        },
        "romaji": "Ano mise wa oishii rashii desu yo.",
        "german": "Das Restaurant soll gut sein."
      }
    ],
    "notes": "Konjugation wie い-Adj.",
    "related": [
      "n4-you-da",
      "n4-sou-hearsay"
    ]
  },
  {
    "id": "n4-sou-hearsay",
    "pattern": "～そうだ (伝聞)",
    "level": "N4",
    "category": "Satzstrukturen",
    "meaning": "Ich habe gehört dass (Hörensagen)",
    "explanation": "そうだ (伝聞): wiedergibt was man gehört/gelesen hat.",
    "formation": "Satz (Grundform) + そうだ",
    "examples": [
      {
        "japanese": "天気予報によると、明日は晴れるそうだ。",
        "romaji": "Tenki yohō ni yoru to, ashita wa hareru sō da.",
        "german": "Laut Wetterbericht wird es morgen sonnig.",
        "cloze": {
          "start": 15,
          "answer": "そうだ",
          "quiz": {
            "level": "N4",
            "japanese": "天気予報によると、明日は晴れるそうだ。",
            "german": "Laut Wetterbericht wird es morgen sonnig.",
            "start": 15,
            "answer": "そうだ",
            "acceptedAnswers": [
              "そうだ",
              "らしい",
              "とのことだ"
            ],
            "distractors": [
              {
                "text": "そうな",
                "reason": "Die attributive Form braucht ein folgendes Nomen."
              },
              {
                "text": "そうに",
                "reason": "Die adverbiale Form braucht ein folgendes Prädikat."
              },
              {
                "text": "なそうだ",
                "reason": "Nach dem Verb wird kein な eingeschoben."
              }
            ],
            "promptKana": "てんきよほうによると、あしたははれる＿＿＿。"
          }
        }
      },
      {
        "japanese": "あの映画は面白いそうです。",
        "romaji": "Ano eiga wa omoshiroi sō desu.",
        "german": "Der Film soll interessant sein."
      }
    ],
    "notes": "Hörensagen: Grundform + そうだ. Aussehen: Stamm + そうだ.",
    "related": [
      "n4-sou-appearance",
      "n4-rashii"
    ]
  },
  {
    "id": "n4-hazu-da",
    "pattern": "～はずだ",
    "level": "N4",
    "category": "Satzstrukturen",
    "meaning": "Müsste sein, wird erwartet",
    "explanation": "はずだ: starke Erwartung oder logische Schlussfolgerung.",
    "formation": "Verb/い-Adj + はずだ / な-Adj + なはずだ",
    "examples": [
      {
        "japanese": "もう届いているはずです。",
        "romaji": "Mō todoiteiru hazu desu.",
        "german": "Es müsste schon angekommen sein."
      },
      {
        "japanese": "彼は知っているはずだ。",
        "cloze": {
          "start": 7,
          "answer": "はずだ",
          "quiz": {
            "level": "N4",
            "japanese": "彼は知っているはずだ。",
            "german": "Er müsste es wissen.",
            "start": 7,
            "answer": "はずだ",
            "acceptedAnswers": [
              "はずだ"
            ],
            "distractors": [
              {
                "text": "なはずだ",
                "reason": "Nach dem Verb wird kein な eingefügt."
              },
              {
                "text": "はずな",
                "reason": "Dies ist hier kein Satzabschluss."
              },
              {
                "text": "はずをだ",
                "reason": "を steht nicht vor dieser Kopula."
              }
            ],
            "promptKana": "かれはしっている＿＿＿。"
          }
        },
        "romaji": "Kare wa shitteiru hazu da.",
        "german": "Er müsste es wissen."
      }
    ],
    "notes": "はずがない = unmöglich.",
    "related": [
      "kamoshirenai",
      "n4-beki-da"
    ]
  },
  {
    "id": "n4-ka-dou-ka",
    "pattern": "～かどうか",
    "level": "N4",
    "category": "Satzstrukturen",
    "meaning": "Ob ... oder nicht",
    "explanation": "かどうか: Ja/Nein-Frage als Nebensatz.",
    "formation": "Verb/Adj (Grundform) + かどうか",
    "examples": [
      {
        "japanese": "行くかどうか迷っています。",
        "cloze": {
          "start": 2,
          "answer": "かどうか",
          "quiz": {
            "level": "N4",
            "japanese": "行くかどうか迷っています。",
            "german": "Ich bin unschlüssig, ob ich gehen soll.",
            "start": 2,
            "answer": "かどうか",
            "acceptedAnswers": [
              "かどうか"
            ],
            "distractors": [
              {
                "text": "をどうか",
                "reason": "Die eingebettete Ja/Nein-Frage beginnt mit か."
              },
              {
                "text": "がどうか",
                "reason": "が ersetzt nicht das einbettende か."
              },
              {
                "text": "などうか",
                "reason": "Nach dem Verb wird kein な eingefügt."
              }
            ],
            "promptKana": "いく＿＿＿まよっています。"
          }
        },
        "romaji": "Iku ka dō ka mayotteimasu.",
        "german": "Ich bin unschlüssig, ob ich gehen soll."
      },
      {
        "japanese": "正しいかどうか確認してください。",
        "cloze": {
          "start": 3,
          "answer": "かどうか"
        },
        "romaji": "Tadashii ka dō ka kakunin shite kudasai.",
        "german": "Bitte prüfen Sie, ob es korrekt ist."
      }
    ],
    "notes": "W-Fragen: nur か (何時に来るか分からない).",
    "related": [
      "ka"
    ]
  },
  {
    "id": "n4-tame-ni",
    "pattern": "～ために",
    "level": "N4",
    "category": "Satzstrukturen",
    "meaning": "Um zu (Zweck) / Weil (Grund)",
    "explanation": "ために: Zweck (辞書形) oder Grund (た形/Nomen).",
    "formation": "Verb (辞書形) + ために / Nomen + のために",
    "examples": [
      {
        "japanese": "日本語を勉強するために日本に来た。",
        "cloze": {
          "start": 8,
          "answer": "ために",
          "quiz": {
            "level": "N4",
            "japanese": "日本語を勉強するために日本に来た。",
            "german": "Ich kam nach Japan, um Japanisch zu lernen.",
            "start": 8,
            "answer": "ために",
            "acceptedAnswers": [
              "ために"
            ],
            "distractors": [
              {
                "text": "ためな",
                "reason": "Die Zweckangabe braucht に, nicht な."
              },
              {
                "text": "なために",
                "reason": "Nach einem Verb wird kein な eingefügt."
              },
              {
                "text": "ためを",
                "reason": "を bildet hier keine Zweckangabe."
              }
            ],
            "promptKana": "にほんごをべんきょうする＿＿＿にほんにきた。"
          }
        },
        "romaji": "Nihongo o benkyō suru tame ni Nihon ni kita.",
        "german": "Ich kam nach Japan, um Japanisch zu lernen."
      },
      {
        "japanese": "台風のために電車が止まった。",
        "cloze": {
          "start": 3,
          "answer": "ために"
        },
        "romaji": "Taifū no tame ni densha ga tomatta.",
        "german": "Wegen des Taifuns stoppten die Züge."
      }
    ],
    "notes": "Zweck: 辞書形. Grund: た形/Nomen.",
    "related": [
      "n4-you-ni-purpose",
      "node"
    ]
  },
  {
    "id": "n4-you-ni-purpose",
    "pattern": "～ように (Zweck)",
    "level": "N4",
    "category": "Satzstrukturen",
    "meaning": "Damit, so dass",
    "explanation": "ように: indirekter Zweck, mit Potential- oder ない-Form.",
    "formation": "Verb (辞書形/ない形) + ように",
    "examples": [
      {
        "japanese": "忘れないように書いておきます。",
        "romaji": "Wasurenai yō ni kaite okimasu.",
        "german": "Ich schreibe es auf, damit ich es nicht vergesse.",
        "cloze": {
          "start": 4,
          "answer": "ように",
          "quiz": {
            "level": "N4",
            "japanese": "忘れないように書いておきます。",
            "german": "Ich schreibe es auf, damit ich es nicht vergesse.",
            "start": 4,
            "answer": "ように",
            "acceptedAnswers": [
              "ように",
              "ために"
            ],
            "distractors": [
              {
                "text": "ような",
                "reason": "Vor dem Verb wird eine adverbiale Form benötigt."
              },
              {
                "text": "ようを",
                "reason": "を bildet hier keine Zweckangabe."
              },
              {
                "text": "なように",
                "reason": "Nach dem Verb wird kein な eingefügt."
              }
            ],
            "promptKana": "わすれない＿＿＿かいておきます。"
          }
        }
      },
      {
        "japanese": "聞こえるように大きい声で話して。",
        "romaji": "Kikoeru yō ni ōkii koe de hanashite.",
        "german": "Sprich laut, damit man es hört."
      }
    ],
    "notes": "ために = direkter Zweck. ように = indirekter Zweck.",
    "related": [
      "n4-tame-ni"
    ]
  },
  {
    "id": "n4-ba",
    "pattern": "～ば",
    "level": "N4",
    "category": "Satzstrukturen",
    "meaning": "Wenn (Konditional)",
    "explanation": "ば-Form: hypothetische Bedingung.",
    "formation": "Godan: u→eba / Ichidan: る→れば",
    "examples": [
      {
        "japanese": "時間があれば行きます。",
        "cloze": {
          "start": 5,
          "answer": "ば",
          "quiz": {
            "level": "N4",
            "japanese": "時間があれば行きます。",
            "german": "Wenn ich Zeit habe, gehe ich.",
            "start": 5,
            "answer": "ば",
            "acceptedAnswers": [
              "ば"
            ],
            "distractors": [
              {
                "text": "たら",
                "reason": "あれたら ist keine Konditionalform von ある."
              },
              {
                "text": "なら",
                "reason": "あれなら ist hier keine Form von ある."
              },
              {
                "text": "ても",
                "reason": "あれても ist keine Verbform."
              }
            ],
            "promptKana": "じかんがあれ＿＿＿いきます。"
          }
        },
        "romaji": "Jikan ga areba ikimasu.",
        "german": "Wenn ich Zeit habe, gehe ich."
      },
      {
        "japanese": "安ければ買います。",
        "cloze": {
          "start": 3,
          "answer": "ば"
        },
        "romaji": "Yasukereba kaimasu.",
        "german": "Wenn es günstig ist, kaufe ich es."
      }
    ],
    "notes": "する→すれば, 来る→来れば. ～ば～ほど = je mehr desto.",
    "related": [
      "n4-nara",
      "temo",
      "n4-to-conditional"
    ]
  },
  {
    "id": "n4-nara",
    "pattern": "～なら",
    "level": "N4",
    "category": "Satzstrukturen",
    "meaning": "Wenn, falls (thematisch)",
    "explanation": "なら: nimmt Thema auf, reagiert auf Gesagtes.",
    "formation": "Verb/Adj/Nomen + なら",
    "examples": [
      {
        "japanese": "日本に行くなら京都がおすすめです。",
        "cloze": {
          "start": 5,
          "answer": "なら",
          "quiz": {
            "level": "N4",
            "japanese": "日本に行くなら京都がおすすめです。",
            "german": "Wenn du nach Japan gehst, empfehle ich Kyoto.",
            "start": 5,
            "answer": "なら",
            "acceptedAnswers": [
              "なら"
            ],
            "distractors": [
              {
                "text": "たら",
                "reason": "行くたら ist keine Konditionalform."
              },
              {
                "text": "れば",
                "reason": "行くれば ist keine Konditionalform."
              },
              {
                "text": "なのに",
                "reason": "Nach 行く wird kein な eingeschoben."
              }
            ],
            "promptKana": "にほんにいく＿＿＿きょうとがおすすめです。"
          }
        },
        "romaji": "Nihon ni iku nara Kyōto ga osusume desu.",
        "german": "Wenn du nach Japan gehst, empfehle ich Kyoto."
      },
      {
        "japanese": "魚なら、このレストランがいい。",
        "cloze": {
          "start": 1,
          "answer": "なら"
        },
        "romaji": "Sakana nara, kono resutoran ga ii.",
        "german": "Was Fisch betrifft, ist dieses Restaurant gut."
      }
    ],
    "notes": "Reagiert oft auf Information des Gesprächspartners.",
    "related": [
      "n4-ba",
      "n4-to-conditional"
    ]
  },
  {
    "id": "n4-shi",
    "pattern": "～し",
    "level": "N4",
    "category": "Satzstrukturen",
    "meaning": "Und außerdem (Gründe auflisten)",
    "explanation": "し: listet mehrere Gründe oder Eigenschaften auf.",
    "formation": "Verb/い-Adj + し / な-Adj + だし",
    "examples": [
      {
        "japanese": "この店は安いし、おいしいし、最高だ。",
        "romaji": "Kono mise wa yasui shi, oishii shi, saikō da.",
        "german": "Günstig und lecker – einfach toll.",
        "cloze": {
          "start": 6,
          "answer": "し",
          "quiz": {
            "level": "N4",
            "japanese": "この店は安いし、おいしいし、最高だ。",
            "german": "Günstig und lecker – einfach toll.",
            "start": 6,
            "answer": "し",
            "acceptedAnswers": [
              "し"
            ],
            "distractors": [
              {
                "text": "な",
                "reason": "Ein い-Adjektiv nimmt hier kein な an."
              },
              {
                "text": "の",
                "reason": "安いの schließt die gleichrangige Begründung hier nicht an."
              },
              {
                "text": "を",
                "reason": "を koordiniert hier keine Begründungen."
              }
            ],
            "promptKana": "このみせはやすい＿＿＿、おいしいし、さいこうだ。"
          }
        }
      },
      {
        "japanese": "時間もないし、お金もないし、行けない。",
        "romaji": "Jikan mo nai shi, okane mo nai shi, ikenai.",
        "german": "Keine Zeit, kein Geld – kann nicht gehen."
      }
    ],
    "notes": "Auch nur ein Grund: 疲れたし、帰ろう.",
    "related": [
      "node"
    ]
  },
  {
    "id": "n4-mama",
    "pattern": "～まま",
    "level": "N4",
    "category": "Satzstrukturen",
    "meaning": "So wie es ist, im Zustand",
    "explanation": "まま: Zustand bleibt unverändert.",
    "formation": "Verb (た形) + まま / Nomen + のまま",
    "examples": [
      {
        "japanese": "靴を履いたまま入らないで。",
        "cloze": {
          "start": 5,
          "answer": "まま",
          "quiz": {
            "level": "N4",
            "japanese": "靴を履いたまま入らないで。",
            "german": "Geh nicht mit Schuhen rein.",
            "start": 5,
            "answer": "まま",
            "acceptedAnswers": [
              "まま"
            ],
            "distractors": [
              {
                "text": "ながら",
                "reason": "ながら schließt nicht an 履いた an."
              },
              {
                "text": "てから",
                "reason": "履いたてから ist kein Verbanschluss."
              },
              {
                "text": "なまま",
                "reason": "Nach dem Verb wird kein な eingefügt."
              }
            ],
            "promptKana": "くつをはいた＿＿＿はいらないで。"
          }
        },
        "romaji": "Kutsu o haita mama hairanaide.",
        "german": "Geh nicht mit Schuhen rein."
      },
      {
        "japanese": "電気をつけたまま寝てしまった。",
        "cloze": {
          "start": 6,
          "answer": "まま"
        },
        "romaji": "Denki o tsuketa mama nete shimatta.",
        "german": "Ich schlief mit Licht ein."
      }
    ],
    "notes": "そのまま = so wie es ist.",
    "related": []
  },
  {
    "id": "n4-tokoro-da",
    "pattern": "～ところだ",
    "level": "N4",
    "category": "Satzstrukturen",
    "meaning": "Gerade dabei / gerade getan",
    "explanation": "ところだ: Zeitpunkt einer Handlung (davor/mittendrin/danach).",
    "formation": "辞書形+ところ / ている+ところ / た形+ところ",
    "examples": [
      {
        "japanese": "今から出かけるところです。",
        "romaji": "Ima kara dekakeru tokoro desu.",
        "german": "Ich bin gerade dabei auszugehen.",
        "cloze": {
          "start": 7,
          "answer": "ところです",
          "quiz": {
            "level": "N4",
            "japanese": "今から出かけるところです。",
            "german": "Ich bin gerade dabei auszugehen.",
            "start": 7,
            "answer": "ところです",
            "acceptedAnswers": [
              "ところです"
            ],
            "distractors": [
              {
                "text": "ところな",
                "reason": "Dies ist hier kein Satzabschluss."
              },
              {
                "text": "なところです",
                "reason": "Nach dem Verb wird kein な eingefügt."
              },
              {
                "text": "ところをです",
                "reason": "を steht hier nicht vor です."
              }
            ],
            "promptKana": "いまからでかける＿＿＿。"
          }
        }
      },
      {
        "japanese": "今食べ終わったところです。",
        "romaji": "Ima tabe owatta tokoro desu.",
        "german": "Ich habe gerade eben aufgegessen."
      }
    ],
    "notes": "辞書形 = gleich. ている = gerade. た形 = gerade eben.",
    "related": [
      "n4-tabakari"
    ]
  },
  {
    "id": "n4-ni-tsuite",
    "pattern": "～について",
    "level": "N4",
    "category": "Satzstrukturen",
    "meaning": "Über, bezüglich",
    "explanation": "について: gibt das Thema an, über das gesprochen wird.",
    "formation": "Nomen + について",
    "examples": [
      {
        "japanese": "日本の文化について調べています。",
        "cloze": {
          "start": 5,
          "answer": "について",
          "quiz": {
            "level": "N4",
            "japanese": "日本の文化について調べています。",
            "german": "Ich recherchiere über japanische Kultur.",
            "start": 5,
            "answer": "について",
            "acceptedAnswers": [
              "について",
              "を",
              "に関して"
            ],
            "distractors": [
              {
                "text": "についての",
                "reason": "の würde ein Nomen statt des Verbs bestimmen."
              },
              {
                "text": "にとって",
                "reason": "Dies bezeichnet einen Wertmaßstab, kein Recherchethema."
              },
              {
                "text": "によると",
                "reason": "Dies nennt eine Quelle, nicht das untersuchte Thema."
              }
            ],
            "promptKana": "にほんのぶんか＿＿＿しらべています。"
          }
        },
        "romaji": "Nihon no bunka ni tsuite shirabeteimasu.",
        "german": "Ich recherchiere über japanische Kultur."
      },
      {
        "japanese": "この問題について話し合いましょう。",
        "cloze": {
          "start": 4,
          "answer": "について"
        },
        "romaji": "Kono mondai ni tsuite hanashi aimashō.",
        "german": "Sprechen wir über dieses Problem."
      }
    ],
    "notes": "Vor Nomen: ～についての + Nomen.",
    "related": [
      "n4-ni-taishite"
    ]
  },
  {
    "id": "n4-ni-yoru-to",
    "pattern": "～によると",
    "level": "N4",
    "category": "Satzstrukturen",
    "meaning": "Laut, gemäß",
    "explanation": "によると: gibt die Quelle einer Information an.",
    "formation": "Nomen + によると",
    "examples": [
      {
        "japanese": "天気予報によると明日は雨だそうだ。",
        "cloze": {
          "start": 4,
          "answer": "によると",
          "quiz": {
            "level": "N4",
            "japanese": "天気予報によると明日は雨だそうだ。",
            "german": "Laut Wetterbericht regnet es morgen.",
            "start": 4,
            "answer": "によると",
            "acceptedAnswers": [
              "によると",
              "では"
            ],
            "distractors": [
              {
                "text": "によるの",
                "reason": "の bildet hier keine Quellenangabe vor dem Folgesatz."
              },
              {
                "text": "にとって",
                "reason": "Ein Wetterbericht ist hier Informationsquelle, nicht Wertmaßstab."
              },
              {
                "text": "としての",
                "reason": "の braucht ein Bezugsnomen."
              }
            ],
            "promptKana": "てんきよほう＿＿＿あしたはあめだそうだ。"
          }
        },
        "romaji": "Tenki yohō ni yoru to ashita wa ame da sō da.",
        "german": "Laut Wetterbericht regnet es morgen."
      },
      {
        "japanese": "ニュースによると事故があったそうだ。",
        "cloze": {
          "start": 4,
          "answer": "によると"
        },
        "romaji": "Nyūsu ni yoru to jiko ga atta sō da.",
        "german": "Laut Nachrichten gab es einen Unfall."
      }
    ],
    "notes": "Oft mit ～そうだ oder ～ということだ.",
    "related": [
      "n4-sou-hearsay",
      "n4-ni-yotte"
    ]
  },
  {
    "id": "n4-okage-de",
    "pattern": "～おかげで",
    "level": "N4",
    "category": "Satzstrukturen",
    "meaning": "Dank (positiv)",
    "explanation": "おかげで: positiver Grund, Dankbarkeit.",
    "formation": "Verb/Adj + おかげで / Nomen + のおかげで",
    "examples": [
      {
        "japanese": "先生のおかげで合格しました。",
        "cloze": {
          "start": 3,
          "answer": "おかげで",
          "quiz": {
            "level": "N4",
            "japanese": "先生のおかげで合格しました。",
            "german": "Dank des Lehrers habe ich bestanden.",
            "start": 3,
            "answer": "おかげで",
            "acceptedAnswers": [
              "おかげで"
            ],
            "distractors": [
              {
                "text": "前に",
                "reason": "Dies bedeutet vor dem Lehrer, nicht dank ihm."
              },
              {
                "text": "代わりに",
                "reason": "Dies bedeutet anstelle des Lehrers, nicht dank ihm."
              },
              {
                "text": "せいで",
                "reason": "せいで markiert negative Verantwortlichkeit; die Übersetzung dank gibt positive Würdigung vor."
              }
            ],
            "promptKana": "せんせいの＿＿＿ごうかくしました。"
          }
        },
        "romaji": "Sensei no okage de gōkaku shimashita.",
        "german": "Dank des Lehrers habe ich bestanden."
      },
      {
        "japanese": "薬のおかげで元気になった。",
        "cloze": {
          "start": 2,
          "answer": "おかげで"
        },
        "romaji": "Kusuri no okage de genki ni natta.",
        "german": "Dank der Medizin bin ich gesund."
      }
    ],
    "notes": "Positiv: おかげで. Negativ: せいで.",
    "related": [
      "n4-sei-de"
    ]
  },
  {
    "id": "n4-sei-de",
    "pattern": "～せいで",
    "level": "N4",
    "category": "Satzstrukturen",
    "meaning": "Wegen (negativ, Schuld)",
    "explanation": "せいで: negativer Grund, Schuldzuweisung.",
    "formation": "Verb/Adj + せいで / Nomen + のせいで",
    "examples": [
      {
        "japanese": "雨のせいで試合が中止になった。",
        "cloze": {
          "start": 2,
          "answer": "せいで",
          "quiz": {
            "level": "N4",
            "japanese": "雨のせいで試合が中止になった。",
            "german": "Wegen des Regens wurde das Spiel abgesagt.",
            "start": 2,
            "answer": "せいで",
            "acceptedAnswers": [
              "せいで",
              "ために",
              "ため"
            ],
            "distractors": [
              {
                "text": "前に",
                "reason": "Dies bedeutet vor dem Regen, nicht wegen des Regens."
              },
              {
                "text": "代わりに",
                "reason": "Dies bedeutet anstelle des Regens, nicht wegen ihm."
              },
              {
                "text": "おかげで",
                "reason": "Dies würde die Absage positiv als Verdienst würdigen; gemeint ist eine nachteilige Ursache."
              }
            ],
            "promptKana": "あめの＿＿＿しあいがちゅうしになった。"
          }
        },
        "romaji": "Ame no sei de shiai ga chūshi ni natta.",
        "german": "Wegen des Regens wurde das Spiel abgesagt."
      },
      {
        "japanese": "寝坊したせいで遅刻した。",
        "cloze": {
          "start": 4,
          "answer": "せいで"
        },
        "romaji": "Nebō shita sei de chikoku shita.",
        "german": "Weil ich verschlief, kam ich zu spät."
      }
    ],
    "notes": "Gegenteil: おかげで (positiv).",
    "related": [
      "n4-okage-de"
    ]
  },
  {
    "id": "n4-wake-da",
    "pattern": "～わけだ",
    "level": "N4",
    "category": "Satzstrukturen",
    "meaning": "Kein Wunder, das erklärt es",
    "explanation": "わけだ: logische Schlussfolgerung.",
    "formation": "Verb/Adj (Grundform) + わけだ",
    "examples": [
      {
        "japanese": "毎日練習してるから上手なわけだ。",
        "cloze": {
          "start": 12,
          "answer": "わけだ",
          "quiz": {
            "level": "N4",
            "japanese": "毎日練習してるから上手なわけだ。",
            "german": "Er übt täglich, kein Wunder dass er gut ist.",
            "start": 12,
            "answer": "わけだ",
            "acceptedAnswers": [
              "わけだ"
            ],
            "distractors": [
              {
                "text": "わけをだ",
                "reason": "を steht nicht vor dieser Kopula."
              },
              {
                "text": "わけな",
                "reason": "Dies ist hier kein Satzabschluss."
              },
              {
                "text": "ようだ",
                "reason": "上手なようだ kann eine Vermutung ausdrücken; die Vorgabe erklärt hingegen die feststehende Leistung als kein Wunder."
              }
            ],
            "promptKana": "まいにちれんしゅうしてるからじょうずな＿＿＿。"
          }
        },
        "romaji": "Mainichi renshū shiteru kara jōzu na wake da.",
        "german": "Er übt täglich, kein Wunder dass er gut ist."
      },
      {
        "japanese": "道理で安いわけだ。",
        "cloze": {
          "start": 5,
          "answer": "わけだ"
        },
        "romaji": "Dōri de yasui wake da.",
        "german": "Kein Wunder dass es billig ist."
      }
    ],
    "notes": "わけがない = unmöglich. わけではない = nicht unbedingt.",
    "related": [
      "n4-hazu-da"
    ]
  },
  {
    "id": "n4-beki-da",
    "pattern": "～べきだ",
    "level": "N4",
    "category": "Satzstrukturen",
    "meaning": "Sollte (moralische Pflicht)",
    "explanation": "べきだ: starke Empfehlung oder Pflicht.",
    "formation": "Verb (辞書形) + べきだ",
    "examples": [
      {
        "japanese": "約束は守るべきだ。",
        "cloze": {
          "start": 5,
          "answer": "べきだ",
          "quiz": {
            "level": "N4",
            "japanese": "約束は守るべきだ。",
            "german": "Man sollte Versprechen halten.",
            "start": 5,
            "answer": "べきだ",
            "acceptedAnswers": [
              "べきだ"
            ],
            "distractors": [
              {
                "text": "なべきだ",
                "reason": "Nach dem Verb wird kein な eingefügt."
              },
              {
                "text": "べきな",
                "reason": "Die attributive Form bildet hier keinen Satzabschluss."
              },
              {
                "text": "べきをだ",
                "reason": "を steht nicht vor dieser Kopula."
              }
            ],
            "promptKana": "やくそくはまもる＿＿＿。"
          }
        },
        "romaji": "Yakusoku wa mamoru beki da.",
        "german": "Man sollte Versprechen halten."
      },
      {
        "japanese": "もっと早く言うべきだった。",
        "cloze": {
          "start": 7,
          "answer": "べきだ"
        },
        "romaji": "Motto hayaku iu beki datta.",
        "german": "Hätte ich früher sagen sollen."
      }
    ],
    "notes": "する→すべき/するべき. Verneinung: ～べきではない.",
    "related": [
      "n4-hazu-da",
      "nakereba-naranai"
    ]
  },
  {
    "id": "n4-tsumori",
    "pattern": "～つもりだ",
    "level": "N4",
    "category": "Satzstrukturen",
    "meaning": "Beabsichtigen, vorhaben",
    "explanation": "つもりだ: feste Absicht oder Plan.",
    "formation": "Verb (辞書形/ない形) + つもりだ",
    "examples": [
      {
        "japanese": "来年日本に行くつもりです。",
        "romaji": "Rainen Nihon ni iku tsumori desu.",
        "german": "Ich habe vor, nächstes Jahr nach Japan zu gehen."
      },
      {
        "japanese": "もう甘いものは食べないつもりだ。",
        "cloze": {
          "start": 11,
          "answer": "つもりだ",
          "quiz": {
            "level": "N4",
            "japanese": "もう甘いものは食べないつもりだ。",
            "german": "Ich will keine Süßigkeiten mehr essen.",
            "start": 11,
            "answer": "つもりだ",
            "acceptedAnswers": [
              "つもりだ"
            ],
            "distractors": [
              {
                "text": "なつもりだ",
                "reason": "Nach der Verbform wird kein な eingefügt."
              },
              {
                "text": "つもりをだ",
                "reason": "を steht nicht vor dieser Kopula."
              },
              {
                "text": "つもりな",
                "reason": "Dies ist hier kein Satzabschluss."
              }
            ],
            "promptKana": "もうあまいものはたべない＿＿＿。"
          }
        },
        "romaji": "Mō amai mono wa tabenai tsumori da.",
        "german": "Ich will keine Süßigkeiten mehr essen."
      }
    ],
    "notes": "～たつもり = glauben es getan zu haben.",
    "related": [
      "n4-volitional",
      "n4-koto-ni-suru"
    ]
  },
  {
    "id": "n4-tewa-ikenai",
    "pattern": "～てはいけない",
    "level": "N4",
    "category": "Satzstrukturen",
    "meaning": "Darf nicht, verboten",
    "explanation": "てはいけない: Verbot.",
    "formation": "Verb (て-Form) + はいけない",
    "examples": [
      {
        "japanese": "ここで写真を撮ってはいけません。",
        "romaji": "Koko de shashin o totte wa ikemasen.",
        "german": "Hier darf man nicht fotografieren."
      },
      {
        "japanese": "授業中に寝てはいけない。",
        "cloze": {
          "start": 5,
          "answer": "てはいけない",
          "quiz": {
            "level": "N4",
            "japanese": "授業中に寝てはいけない。",
            "german": "Im Unterricht darf man nicht schlafen.",
            "start": 5,
            "answer": "てはいけない",
            "acceptedAnswers": [
              "てはいけない"
            ],
            "distractors": [
              {
                "text": "てもいい",
                "reason": "Dies erlaubt das Schlafen."
              },
              {
                "text": "てください",
                "reason": "Dies fordert zum Schlafen auf."
              },
              {
                "text": "たはいけない",
                "reason": "Das Verbot verlangt die て-Form."
              }
            ],
            "promptKana": "じゅぎょうちゅうにね＿＿＿。"
          }
        },
        "romaji": "Jugyō-chū ni nete wa ikenai.",
        "german": "Im Unterricht darf man nicht schlafen."
      }
    ],
    "notes": "Umgangssprache: ～ちゃだめ.",
    "related": [
      "nakereba-naranai",
      "nakutemo-ii"
    ]
  },
  {
    "id": "n4-ta-hou-ga-ii",
    "pattern": "～たほうがいい",
    "level": "N4",
    "category": "Satzstrukturen",
    "meaning": "Sollte besser",
    "explanation": "たほうがいい: Rat oder Empfehlung.",
    "formation": "Verb (た形) + ほうがいい / Verb (ない形) + ほうがいい",
    "examples": [
      {
        "japanese": "早く寝たほうがいいですよ。",
        "cloze": {
          "start": 3,
          "answer": "たほうがいい",
          "quiz": {
            "level": "N4",
            "japanese": "早く寝たほうがいいですよ。",
            "german": "Du solltest besser früh schlafen.",
            "start": 3,
            "answer": "たほうがいい",
            "acceptedAnswers": [
              "たほうがいい"
            ],
            "distractors": [
              {
                "text": "たほうをいい",
                "reason": "Die Bewertung verlangt が."
              },
              {
                "text": "たほうがよくない",
                "reason": "Dies rät vom frühen Schlafen ab."
              },
              {
                "text": "るほうをいい",
                "reason": "を passt nicht zur vergleichenden Bewertung."
              }
            ],
            "promptKana": "はやくね＿＿＿ですよ。"
          }
        },
        "romaji": "Hayaku neta hō ga ii desu yo.",
        "german": "Du solltest besser früh schlafen."
      },
      {
        "japanese": "飲まないほうがいい。",
        "romaji": "Nomanai hō ga ii.",
        "german": "Du solltest besser nicht trinken."
      }
    ],
    "notes": "た形 = Empfehlung. ない形 = Abraten.",
    "related": [
      "n4-beki-da"
    ]
  },
  {
    "id": "n4-to-conditional",
    "pattern": "～と (Konditional)",
    "level": "N4",
    "category": "Satzstrukturen",
    "meaning": "Wenn/Immer wenn (natürliche Folge)",
    "explanation": "と: natürliche, automatische oder gewohnheitsmäßige Folge.",
    "formation": "Verb (辞書形/ない形) + と",
    "examples": [
      {
        "japanese": "春になると桜が咲く。",
        "romaji": "Haru ni naru to sakura ga saku.",
        "german": "Wenn Frühling wird, blühen die Kirschblüten.",
        "cloze": {
          "start": 4,
          "answer": "と",
          "quiz": {
            "level": "N4",
            "japanese": "春になると桜が咲く。",
            "german": "Wenn Frühling wird, blühen die Kirschblüten.",
            "start": 4,
            "answer": "と",
            "acceptedAnswers": [
              "と",
              "なら"
            ],
            "distractors": [
              {
                "text": "たら",
                "reason": "なるたら ist keine Bedingungsform."
              },
              {
                "text": "れば",
                "reason": "なるれば ist keine Bedingungsform."
              },
              {
                "text": "ながら",
                "reason": "ながら verlangt den Stamm なり."
              }
            ],
            "promptKana": "はるになる＿＿＿さくらがさく。"
          }
        }
      },
      {
        "japanese": "このボタンを押すとドアが開きます。",
        "romaji": "Kono botan o osu to doa ga akimasu.",
        "german": "Wenn man diesen Knopf drückt, öffnet sich die Tür."
      }
    ],
    "notes": "Für Naturgesetze, Gewohnheiten, Wegbeschreibungen.",
    "related": [
      "n4-ba",
      "n4-nara"
    ]
  },
  {
    "id": "n4-aida-ni",
    "pattern": "～間に / ～間",
    "level": "N4",
    "category": "Satzstrukturen",
    "meaning": "Während (Zeitraum)",
    "explanation": "間に: innerhalb eines Zeitraums. 間: die gesamte Dauer.",
    "formation": "Verb (ている) + 間(に) / Nomen + の間(に)",
    "examples": [
      {
        "japanese": "母が寝ている間に掃除した。",
        "romaji": "Haha ga neteiru aida ni sōji shita.",
        "german": "Ich putzte, während Mutter schlief."
      },
      {
        "japanese": "夏休みの間旅行していた。",
        "cloze": {
          "start": 4,
          "answer": "間",
          "quiz": {
            "level": "N4",
            "japanese": "夏休みの間旅行していた。",
            "german": "In den Sommerferien war ich auf Reisen.",
            "start": 4,
            "answer": "間",
            "acceptedAnswers": [
              "間",
              "間に",
              "間は"
            ],
            "distractors": [
              {
                "text": "前",
                "reason": "Dies bedeutet vor den Ferien."
              },
              {
                "text": "後",
                "reason": "Dies bedeutet nach den Ferien."
              },
              {
                "text": "ためな",
                "reason": "Dies ist kein zeitlicher nominaler Anschluss."
              }
            ],
            "promptKana": "なつやすみの＿＿＿りょこうしていた。"
          }
        },
        "romaji": "Natsuyasumi no aida ryokō shiteita.",
        "german": "In den Sommerferien war ich auf Reisen."
      }
    ],
    "notes": "間に = punktuell. 間 = durchgehend.",
    "related": [
      "nagara"
    ]
  },
  {
    "id": "n4-ato-de",
    "pattern": "～後で / ～てから",
    "level": "N4",
    "category": "Satzstrukturen",
    "meaning": "Nachdem, nach",
    "explanation": "後で und てから: nach einer Handlung.",
    "formation": "Verb (た形) + 後で / Verb (て) + から",
    "examples": [
      {
        "japanese": "仕事が終わった後で飲みに行こう。",
        "cloze": {
          "start": 7,
          "answer": "後で",
          "quiz": {
            "level": "N4",
            "japanese": "仕事が終わった後で飲みに行こう。",
            "german": "Nach der Arbeit trinken gehen.",
            "start": 7,
            "answer": "後で",
            "acceptedAnswers": [
              "後で"
            ],
            "distractors": [
              {
                "text": "前に",
                "reason": "前に verlangt die Wörterbuchform und bedeutet vorher."
              },
              {
                "text": "ながら",
                "reason": "ながら verlangt den Verbstamm."
              },
              {
                "text": "てから",
                "reason": "終わったてから ist kein Verbanschluss."
              }
            ],
            "promptKana": "しごとがおわった＿＿＿のみにいこう。"
          }
        },
        "romaji": "Shigoto ga owatta ato de nomi ni ikō.",
        "german": "Nach der Arbeit trinken gehen."
      },
      {
        "japanese": "ご飯を食べてから出かけます。",
        "cloze": {
          "start": 5,
          "answer": "てから"
        },
        "romaji": "Gohan o tabete kara dekakemasu.",
        "german": "Ich gehe nach dem Essen aus."
      }
    ],
    "notes": "てから betont Reihenfolge stärker.",
    "related": [
      "mae-ni"
    ]
  },
  {
    "id": "n4-made-ni",
    "pattern": "～までに",
    "level": "N4",
    "category": "Satzstrukturen",
    "meaning": "Bis (Deadline)",
    "explanation": "までに: Frist, bis wann etwas erledigt sein muss.",
    "formation": "Zeitpunkt/Verb (辞書形) + までに",
    "examples": [
      {
        "japanese": "金曜日までにレポートを出してください。",
        "cloze": {
          "start": 3,
          "answer": "までに",
          "quiz": {
            "level": "N4",
            "japanese": "金曜日までにレポートを出してください。",
            "german": "Geben Sie den Bericht bis Freitag ab.",
            "start": 3,
            "answer": "までに",
            "acceptedAnswers": [
              "までに"
            ],
            "distractors": [
              {
                "text": "から",
                "reason": "Dies bedeutet ab Freitag statt spätestens Freitag."
              },
              {
                "text": "の後で",
                "reason": "Dies bedeutet nach Freitag."
              },
              {
                "text": "より後に",
                "reason": "Dies bedeutet später als Freitag."
              }
            ],
            "promptKana": "きんようび＿＿＿レポートをだしてください。"
          }
        },
        "romaji": "Kin'yōbi made ni repōto o dashite kudasai.",
        "german": "Geben Sie den Bericht bis Freitag ab."
      },
      {
        "japanese": "電車が来るまでに切符を買おう。",
        "cloze": {
          "start": 5,
          "answer": "までに"
        },
        "romaji": "Densha ga kuru made ni kippu o kaō.",
        "german": "Kaufen wir die Fahrkarte bevor der Zug kommt."
      }
    ],
    "notes": "までに = Deadline. まで = durchgehend bis.",
    "related": [
      "made"
    ]
  },
  {
    "id": "n4-relative-clause",
    "pattern": "Relativsätze",
    "level": "N4",
    "category": "Satzstrukturen",
    "meaning": "Satz der ein Nomen beschreibt",
    "explanation": "Im Japanischen stehen Relativsätze vor dem Nomen. Kein Relativpronomen nötig.",
    "formation": "Verb/Adj (Grundform) + Nomen",
    "examples": [
      {
        "japanese": "昨日買った本はとても面白い。",
        "romaji": "Kinō katta hon wa totemo omoshiroi.",
        "german": "Das Buch das ich gestern kaufte ist sehr interessant.",
        "cloze": {
          "start": 0,
          "answer": "昨日買った",
          "quiz": {
            "level": "N4",
            "japanese": "昨日買った本はとても面白い。",
            "german": "Das Buch das ich gestern kaufte ist sehr interessant.",
            "start": 0,
            "answer": "昨日買った",
            "acceptedAnswers": [
              "昨日買った"
            ],
            "distractors": [
              {
                "text": "昨日買いました",
                "reason": "Vor dem Bezugsnomen steht hier die einfache Form."
              },
              {
                "text": "昨日買ったの",
                "reason": "Eine verbale Relativklausel benötigt kein の vor 本."
              },
              {
                "text": "昨日買うでした",
                "reason": "Dies ist keine Verbform."
              }
            ],
            "promptKana": "＿＿＿ほんはとてもおもしろい。"
          }
        }
      },
      {
        "japanese": "日本語を教えている先生は田中先生です。",
        "romaji": "Nihongo o oshieteiru sensei wa Tanaka-sensei desu.",
        "german": "Der Lehrer der Japanisch unterrichtet ist Tanaka."
      }
    ],
    "notes": "Einfach den Satz vor das Nomen stellen.",
    "related": []
  },
  {
    "id": "n4-koto-ga-aru",
    "pattern": "～ことがある (manchmal)",
    "level": "N4",
    "category": "Satzstrukturen",
    "meaning": "Es kommt vor dass",
    "explanation": "辞書形 + ことがある: etwas passiert gelegentlich.",
    "formation": "Verb (辞書形) + ことがある",
    "examples": [
      {
        "japanese": "朝ご飯を食べないことがある。",
        "romaji": "Asagohan o tabenai koto ga aru.",
        "german": "Es kommt vor dass ich nicht frühstücke.",
        "cloze": {
          "start": 8,
          "answer": "ことがある",
          "quiz": {
            "level": "N4",
            "japanese": "朝ご飯を食べないことがある。",
            "german": "Es kommt vor dass ich nicht frühstücke.",
            "start": 8,
            "answer": "ことがある",
            "acceptedAnswers": [
              "ことがある"
            ],
            "distractors": [
              {
                "text": "ことをある",
                "reason": "ある nimmt hier kein Objekt mit を."
              },
              {
                "text": "なことがある",
                "reason": "Nach dem Verb wird kein な eingefügt."
              },
              {
                "text": "ことがない",
                "reason": "Dies verneint das gelegentliche Auslassen."
              }
            ],
            "promptKana": "あさごはんをたべない＿＿＿。"
          }
        }
      },
      {
        "japanese": "たまに遅刻することがあります。",
        "romaji": "Tama ni chikoku suru koto ga arimasu.",
        "german": "Gelegentlich komme ich zu spät."
      }
    ],
    "notes": "辞書形 = manchmal. た形 = Erfahrung.",
    "related": [
      "ta-koto-ga-aru"
    ]
  },
  {
    "id": "n4-koto-ni-natteiru",
    "pattern": "～ことになっている",
    "level": "N4",
    "category": "Satzstrukturen",
    "meaning": "Es ist so geregelt dass",
    "explanation": "ことになっている: bestehende Regel oder Vereinbarung.",
    "formation": "Verb (辞書形/ない形) + ことになっている",
    "examples": [
      {
        "japanese": "この学校では制服を着ることになっている。",
        "cloze": {
          "start": 11,
          "answer": "ことになっている",
          "quiz": {
            "level": "N4",
            "japanese": "この学校では制服を着ることになっている。",
            "german": "An dieser Schule muss man Uniform tragen.",
            "start": 11,
            "answer": "ことになっている",
            "acceptedAnswers": [
              "ことになっている"
            ],
            "distractors": [
              {
                "text": "ことをなっている",
                "reason": "Die Regelkonstruktion verlangt に."
              },
              {
                "text": "なことになっている",
                "reason": "Nach dem Verb wird kein な eingefügt."
              },
              {
                "text": "ことになっていない",
                "reason": "Dies verneint die bestehende Regel."
              }
            ],
            "promptKana": "このがっこうではせいふくをきる＿＿＿。"
          }
        },
        "romaji": "Kono gakkō de wa seifuku o kiru koto ni natteiru.",
        "german": "An dieser Schule muss man Uniform tragen."
      },
      {
        "japanese": "ここでは喫煙しないことになっています。",
        "romaji": "Koko de wa kitsuen shinai koto ni natteimasu.",
        "german": "Hier ist Rauchen nicht erlaubt."
      }
    ],
    "notes": "Regel von außen festgelegt.",
    "related": [
      "n4-koto-ni-naru"
    ]
  },
  {
    "id": "n4-toka",
    "pattern": "～とか",
    "level": "N4",
    "category": "Satzstrukturen",
    "meaning": "Dinge wie, zum Beispiel",
    "explanation": "とか: informelles Auflisten von Beispielen.",
    "formation": "Nomen + とか + Nomen + とか",
    "examples": [
      {
        "japanese": "週末は映画とか買い物とかする。",
        "romaji": "Shūmatsu wa eiga toka kaimono toka suru.",
        "german": "Am Wochenende Filme schauen, einkaufen usw.",
        "cloze": {
          "start": 5,
          "answer": "とか",
          "quiz": {
            "level": "N4",
            "japanese": "週末は映画とか買い物とかする。",
            "german": "Am Wochenende Filme schauen, einkaufen usw.",
            "start": 5,
            "answer": "とか",
            "acceptedAnswers": [
              "とか",
              "や"
            ],
            "distractors": [
              {
                "text": "しか",
                "reason": "しか verlangt eine negative Endung."
              },
              {
                "text": "へ",
                "reason": "へ zählt keine Freizeitaktivitäten auf."
              },
              {
                "text": "が",
                "reason": "が macht Filme zum Subjekt statt zum Listenpunkt."
              }
            ],
            "promptKana": "しゅうまつはえいが＿＿＿かいものとかする。"
          }
        }
      },
      {
        "japanese": "りんごとかバナナとか買ってきて。",
        "romaji": "Ringo toka banana toka katte kite.",
        "german": "Kauf Äpfel, Bananen und so."
      }
    ],
    "notes": "Informeller als ～など.",
    "related": [
      "n4-nado",
      "ya"
    ]
  },
  {
    "id": "n4-tte",
    "pattern": "～って",
    "level": "N4",
    "category": "Satzstrukturen",
    "meaning": "Informelles Zitat",
    "explanation": "って: umgangssprachliches と (Zitatpartikel).",
    "formation": "Satz + って",
    "examples": [
      {
        "japanese": "田中さんは来ないって。",
        "cloze": {
          "start": 8,
          "answer": "って",
          "quiz": {
            "level": "N4",
            "japanese": "田中さんは来ないって。",
            "german": "Tanaka sagt er kommt nicht.",
            "start": 8,
            "answer": "って",
            "acceptedAnswers": [
              "って",
              "そうだ",
              "とのことだ"
            ],
            "distractors": [
              {
                "text": "なって",
                "reason": "Nach 来ない wird kein な für ein Zitat eingefügt."
              },
              {
                "text": "をって",
                "reason": "をって ist kein Zitatanschluss."
              },
              {
                "text": "ってを",
                "reason": "を kann das Zitat hier nicht ohne weiteres Prädikat abschließen."
              }
            ],
            "promptKana": "たなかさんはこない＿＿＿。"
          }
        },
        "romaji": "Tanaka-san wa konai tte.",
        "german": "Tanaka sagt er kommt nicht."
      },
      {
        "japanese": "すみませんって日本語で何？",
        "cloze": {
          "start": 5,
          "answer": "って"
        },
        "romaji": "Sumimasen tte nihongo de nani?",
        "german": "Was bedeutet 'sumimasen'?"
      }
    ],
    "notes": "～って言ってた = hat gesagt. ～っていう = namens.",
    "related": [
      "n4-toiu"
    ]
  },
  {
    "id": "n4-ba-yokatta",
    "pattern": "～ばよかった",
    "level": "N4",
    "category": "Satzstrukturen",
    "meaning": "Hätte sollen",
    "explanation": "ばよかった: Bedauern über etwas nicht Getanes.",
    "formation": "Verb (ば-Form) + よかった",
    "examples": [
      {
        "japanese": "もっと勉強すればよかった。",
        "cloze": {
          "start": 7,
          "answer": "ばよかった",
          "quiz": {
            "level": "N4",
            "japanese": "もっと勉強すればよかった。",
            "german": "Ich hätte mehr lernen sollen.",
            "start": 7,
            "answer": "ばよかった",
            "acceptedAnswers": [
              "ばよかった"
            ],
            "distractors": [
              {
                "text": "たらよかった",
                "reason": "すれたら ist keine Verbform."
              },
              {
                "text": "ばよくない",
                "reason": "Dies drückt nicht die rückblickende Reue aus."
              },
              {
                "text": "ばよいだった",
                "reason": "よい bildet Vergangenheit als よかった."
              }
            ],
            "promptKana": "もっとべんきょうすれ＿＿＿。"
          }
        },
        "romaji": "Motto benkyō sureba yokatta.",
        "german": "Ich hätte mehr lernen sollen."
      },
      {
        "japanese": "傘を持ってくればよかった。",
        "cloze": {
          "start": 7,
          "answer": "ばよかった"
        },
        "romaji": "Kasa o motte kureba yokatta.",
        "german": "Hätte ich einen Schirm mitgenommen."
      }
    ],
    "notes": "Verneinung: ～なければよかった (hätte es nicht tun sollen).",
    "related": [
      "n4-ba"
    ]
  },
  {
    "id": "n4-te-itadakemasenka",
    "pattern": "～ていただけませんか",
    "level": "N4",
    "category": "Satzstrukturen",
    "meaning": "Könnten Sie bitte (sehr höflich)",
    "explanation": "ていただけませんか: sehr höfliche Bitte.",
    "formation": "Verb (て-Form) + いただけませんか",
    "examples": [
      {
        "japanese": "少々お待ちいただけませんか。",
        "romaji": "Shōshō omachi itadakemasen ka.",
        "german": "Könnten Sie bitte kurz warten?"
      },
      {
        "japanese": "もう一度説明していただけませんか。",
        "cloze": {
          "start": 7,
          "answer": "ていただけませんか",
          "quiz": {
            "level": "N4",
            "japanese": "もう一度説明していただけませんか。",
            "german": "Könnten Sie es nochmal erklären?",
            "start": 7,
            "answer": "ていただけませんか",
            "acceptedAnswers": [
              "ていただけませんか"
            ],
            "distractors": [
              {
                "text": "たいただけませんか",
                "reason": "いただく folgt hier der て-Form."
              },
              {
                "text": "ていただけるませんか",
                "reason": "Die höfliche Form lautet いただけません."
              },
              {
                "text": "ていただけませんた",
                "reason": "Dies ist keine höfliche Frageform."
              }
            ],
            "promptKana": "もういちどせつめいし＿＿＿。"
          }
        },
        "romaji": "Mō ichido setsumei shite itadakemasen ka.",
        "german": "Könnten Sie es nochmal erklären?"
      }
    ],
    "notes": "てください < てもらえませんか < ていただけませんか.",
    "related": [
      "te-kudasai",
      "n4-temorau"
    ]
  },
  {
    "id": "n4-hodo-nai",
    "pattern": "～ほど～ない",
    "level": "N4",
    "category": "Satzstrukturen",
    "meaning": "Nicht so ... wie",
    "explanation": "ほど～ない: negativer Vergleich.",
    "formation": "A は B ほど + Adj (ない形)",
    "examples": [
      {
        "japanese": "東京は大阪ほど暑くない。",
        "romaji": "Tōkyō wa Ōsaka hodo atsuku nai.",
        "german": "Tokio ist nicht so heiß wie Osaka.",
        "cloze": {
          "start": 5,
          "answer": "ほど暑くない",
          "quiz": {
            "level": "N4",
            "japanese": "東京は大阪ほど暑くない。",
            "german": "Tokio ist nicht so heiß wie Osaka.",
            "start": 5,
            "answer": "ほど暑くない",
            "acceptedAnswers": [
              "ほど暑くない"
            ],
            "distractors": [
              {
                "text": "より暑い",
                "reason": "Dies behauptet Tokio sei heißer."
              },
              {
                "text": "ほど暑いない",
                "reason": "Die Negativform lautet 暑くない."
              },
              {
                "text": "ほど暑くあります",
                "reason": "Dies ist keine Verneinung des Vergleichs."
              }
            ],
            "promptKana": "とうきょうはおおさか＿＿＿。"
          }
        }
      },
      {
        "japanese": "日本語は中国語ほど難しくない。",
        "romaji": "Nihongo wa chūgokugo hodo muzukashiku nai.",
        "german": "Japanisch ist nicht so schwer wie Chinesisch."
      }
    ],
    "notes": "Negativer Vergleich. Positiv: ～より～のほうが.",
    "related": [
      "n4-yori",
      "n4-hodo-p"
    ]
  },
  {
    "id": "n4-you-ni-shiteiru",
    "pattern": "～ようにしている",
    "level": "N4",
    "category": "Satzstrukturen",
    "meaning": "Darauf achten, Gewohnheit pflegen",
    "explanation": "ようにしている: eine bewusste Gewohnheit, auf die man achtet.",
    "formation": "Verb (辞書形/ない形) + ようにしている",
    "examples": [
      {
        "japanese": "毎日野菜を食べるようにしている。",
        "cloze": {
          "start": 8,
          "answer": "ようにしている",
          "quiz": {
            "level": "N4",
            "japanese": "毎日野菜を食べるようにしている。",
            "german": "Ich achte darauf, täglich Gemüse zu essen.",
            "start": 8,
            "answer": "ようにしている",
            "acceptedAnswers": [
              "ようにしている"
            ],
            "distractors": [
              {
                "text": "ようをしている",
                "reason": "Die angestrebte Gewohnheit verlangt に."
              },
              {
                "text": "なようにしている",
                "reason": "Nach dem Verb wird kein な eingefügt."
              },
              {
                "text": "ようにしていない",
                "reason": "Dies verneint die Bemühung."
              }
            ],
            "promptKana": "まいにちやさいをたべる＿＿＿。"
          }
        },
        "romaji": "Mainichi yasai o taberu yō ni shiteiru.",
        "german": "Ich achte darauf, täglich Gemüse zu essen."
      },
      {
        "japanese": "夜遅く食べないようにしている。",
        "cloze": {
          "start": 7,
          "answer": "ようにしている"
        },
        "romaji": "Yoru osoku tabenai yō ni shiteiru.",
        "german": "Ich achte darauf, spät abends nicht zu essen."
      }
    ],
    "notes": "ようにする = einmalig versuchen. ようにしている = regelmäßige Gewohnheit.",
    "related": [
      "n4-you-ni-suru"
    ]
  },
  {
    "id": "n4-tagaru",
    "pattern": "～たがる",
    "level": "N4",
    "category": "Verben",
    "meaning": "Wollen (bei Dritten)",
    "explanation": "たがる: drückt den Wunsch einer dritten Person aus. Man kann ～たい nur für sich selbst verwenden.",
    "formation": "Verb (ます-Stamm) + たがる",
    "examples": [
      {
        "japanese": "子供は外に出たがっている。",
        "romaji": "Kodomo wa soto ni detagatte iru.",
        "german": "Das Kind will nach draußen.",
        "cloze": {
          "start": 6,
          "answer": "たがっている",
          "quiz": {
            "level": "N4",
            "japanese": "子供は外に出たがっている。",
            "german": "Das Kind will nach draußen.",
            "start": 6,
            "answer": "たがっている",
            "acceptedAnswers": [
              "たがっている"
            ],
            "distractors": [
              {
                "text": "たいがっている",
                "reason": "Vor がる entfällt das letzte い von たい."
              },
              {
                "text": "たがっていない",
                "reason": "Dies verneint den gezeigten Wunsch."
              },
              {
                "text": "たがるている",
                "reason": "Die て-Form lautet たがって."
              }
            ],
            "promptKana": "こどもはそとにで＿＿＿。"
          }
        }
      },
      {
        "japanese": "彼は日本に行きたがっている。",
        "romaji": "Kare wa Nihon ni ikitagatte iru.",
        "german": "Er will nach Japan gehen."
      }
    ],
    "notes": "Eigener Wunsch: ～たい. Dritte: ～たがる. Godan-Konjugation.",
    "related": [
      "tai",
      "n4-garu"
    ]
  },
  {
    "id": "n4-ppoi",
    "pattern": "～っぽい",
    "level": "N4",
    "category": "Adjektive",
    "meaning": "Wirkt wie, -artig, -haft",
    "explanation": "っぽい: informell, drückt aus dass etwas den Eindruck von etwas erweckt.",
    "formation": "Nomen/Verb-Stamm + っぽい",
    "examples": [
      {
        "japanese": "この色は白っぽい。",
        "cloze": {
          "start": 5,
          "answer": "っぽい",
          "quiz": {
            "level": "N4",
            "japanese": "この色は白っぽい。",
            "german": "Diese Farbe ist weißlich.",
            "start": 5,
            "answer": "っぽい",
            "acceptedAnswers": [
              "っぽい"
            ],
            "distractors": [
              {
                "text": "っぽいだ",
                "reason": "Ein い-Adjektiv erhält kein だ."
              },
              {
                "text": "っぽくでした",
                "reason": "Dies ist keine Adjektivform."
              },
              {
                "text": "っぽくます",
                "reason": "Ein い-Adjektiv erhält kein ます."
              }
            ],
            "promptKana": "このいろはしろ＿＿＿。"
          }
        },
        "romaji": "Kono iro wa shiroppoi.",
        "german": "Diese Farbe ist weißlich."
      },
      {
        "japanese": "彼は怒りっぽい。",
        "cloze": {
          "start": 4,
          "answer": "っぽい"
        },
        "romaji": "Kare wa okorippoi.",
        "german": "Er wird leicht wütend."
      },
      {
        "japanese": "子供っぽい行動だ。",
        "cloze": {
          "start": 2,
          "answer": "っぽい"
        },
        "romaji": "Kodomoppoi kōdō da.",
        "german": "Das ist kindisches Verhalten."
      }
    ],
    "notes": "Oft leicht negativ. Konjugation wie い-Adj: っぽくない, っぽかった.",
    "related": [
      "n4-rashii-adj",
      "n4-gachi"
    ]
  },
  {
    "id": "n4-kakeru",
    "pattern": "～かける",
    "level": "N4",
    "category": "Verben",
    "meaning": "Anfangen zu / halb tun",
    "explanation": "かける: eine Handlung wurde begonnen aber nicht beendet.",
    "formation": "Verb (ます-Stamm) + かける",
    "examples": [
      {
        "japanese": "読みかけの本がある。",
        "romaji": "Yomikake no hon ga aru.",
        "german": "Ich habe ein angefangenes Buch.",
        "cloze": {
          "start": 2,
          "answer": "かけ",
          "quiz": {
            "level": "N4",
            "japanese": "読みかけの本がある。",
            "german": "Ich habe ein angefangenes Buch.",
            "start": 2,
            "answer": "かけ",
            "acceptedAnswers": [
              "かけ"
            ],
            "distractors": [
              {
                "text": "ます",
                "reason": "読みますの ist hier keine passende nominale Bestimmung."
              },
              {
                "text": "た",
                "reason": "読みた ist keine Form von 読む."
              },
              {
                "text": "かける",
                "reason": "読みかける würde 本 unmittelbar, ohne の, bestimmen."
              }
            ],
            "promptKana": "よみ＿＿＿のほんがある。"
          }
        }
      },
      {
        "japanese": "言いかけてやめた。",
        "romaji": "Iikakete yameta.",
        "german": "Ich fing an zu sagen und hielt inne."
      }
    ],
    "notes": "死にかける = fast sterben. 食べかけ = halb aufgegessen.",
    "related": [
      "n4-hajimeru"
    ]
  },
  {
    "id": "n4-kiru",
    "pattern": "～切る",
    "level": "N4",
    "category": "Verben",
    "meaning": "Vollständig, zu Ende tun",
    "explanation": "切る als Suffix: eine Handlung vollständig abschließen.",
    "formation": "Verb (ます-Stamm) + 切る",
    "examples": [
      {
        "japanese": "マラソンを走り切った。",
        "romaji": "Marason o hashiri kitta.",
        "german": "Ich habe den Marathon zu Ende gelaufen.",
        "cloze": {
          "start": 7,
          "answer": "切った",
          "quiz": {
            "level": "N4",
            "japanese": "マラソンを走り切った。",
            "german": "Ich habe den Marathon zu Ende gelaufen.",
            "start": 7,
            "answer": "切った",
            "acceptedAnswers": [
              "切った"
            ],
            "distractors": [
              {
                "text": "切らなかった",
                "reason": "Dies verneint das Zu-Ende-Laufen."
              },
              {
                "text": "切るた",
                "reason": "Dies ist keine Vergangenheitsform."
              },
              {
                "text": "ます切った",
                "reason": "ます kann nicht vor das zweite Verb eingeschoben werden."
              }
            ],
            "promptKana": "マラソンをはしり＿＿＿。"
          }
        }
      },
      {
        "japanese": "全部使い切ってしまった。",
        "romaji": "Zenbu tsukai kitte shimatta.",
        "german": "Ich habe alles komplett aufgebraucht."
      }
    ],
    "notes": "Betont Vollständigkeit: 食べ切る, 読み切る, 売り切れる (ausverkauft).",
    "related": [
      "n4-owaru",
      "te-shimau"
    ]
  },
  {
    "id": "n4-naosu",
    "pattern": "～直す",
    "level": "N4",
    "category": "Verben",
    "meaning": "Nochmal machen, erneut tun",
    "explanation": "直す als Suffix: eine Handlung wiederholen, um sie zu verbessern.",
    "formation": "Verb (ます-Stamm) + 直す",
    "examples": [
      {
        "japanese": "もう一度やり直してください。",
        "romaji": "Mō ichido yari naoshite kudasai.",
        "german": "Bitte machen Sie es nochmal.",
        "cloze": {
          "start": 6,
          "answer": "直して",
          "quiz": {
            "level": "N4",
            "japanese": "もう一度やり直してください。",
            "german": "Bitte machen Sie es nochmal.",
            "start": 6,
            "answer": "直して",
            "acceptedAnswers": [
              "直して"
            ],
            "distractors": [
              {
                "text": "直した",
                "reason": "Die Bitte verlangt die て-Form."
              },
              {
                "text": "直します",
                "reason": "ます kann hier nicht vor ください stehen."
              },
              {
                "text": "直さないで",
                "reason": "Dies bittet darum, die Handlung nicht erneut zu machen."
              }
            ],
            "promptKana": "もういちどやり＿＿＿ください。"
          }
        }
      },
      {
        "japanese": "この文を書き直した。",
        "romaji": "Kono bun o kaki naoshita.",
        "german": "Ich habe diesen Satz neu geschrieben."
      }
    ],
    "notes": "やり直す (nochmal machen), 考え直す (nochmal überdenken), 見直す (nochmal prüfen).",
    "related": []
  },
  {
    "id": "n4-au",
    "pattern": "～合う",
    "level": "N4",
    "category": "Verben",
    "meaning": "Gegenseitig, miteinander",
    "explanation": "合う als Suffix: eine Handlung wird gegenseitig ausgeführt.",
    "formation": "Verb (ます-Stamm) + 合う",
    "examples": [
      {
        "japanese": "友達と助け合っている。",
        "romaji": "Tomodachi to tasuke atte iru.",
        "german": "Wir helfen uns gegenseitig.",
        "cloze": {
          "start": 5,
          "answer": "合っている",
          "quiz": {
            "level": "N4",
            "japanese": "友達と助け合っている。",
            "german": "Wir helfen uns gegenseitig.",
            "start": 5,
            "answer": "合っている",
            "acceptedAnswers": [
              "合っている"
            ],
            "distractors": [
              {
                "text": "合っていない",
                "reason": "Dies verneint die gegenseitige Hilfe."
              },
              {
                "text": "合うている",
                "reason": "合う bildet die て-Form 合って."
              },
              {
                "text": "ます合っている",
                "reason": "ます wird nicht zwischen die Verben eingefügt."
              }
            ],
            "promptKana": "ともだちとたすけ＿＿＿。"
          }
        }
      },
      {
        "japanese": "この問題について話し合いましょう。",
        "romaji": "Kono mondai ni tsuite hanashi aimashō.",
        "german": "Lassen Sie uns darüber diskutieren."
      }
    ],
    "notes": "話し合う (diskutieren), 助け合う (sich helfen), 愛し合う (sich lieben).",
    "related": []
  },
  {
    "id": "n4-koto-wa-ga",
    "pattern": "～ことは～が",
    "level": "N4",
    "category": "Satzstrukturen",
    "meaning": "Zwar ... aber",
    "explanation": "ことは～が: räumt etwas ein, schränkt es aber ein.",
    "formation": "Verb/Adj + ことは + Verb/Adj + が",
    "examples": [
      {
        "japanese": "食べることは食べたが、おいしくなかった。",
        "romaji": "Taberu koto wa tabeta ga, oishiku nakatta.",
        "german": "Gegessen habe ich schon, aber lecker war es nicht.",
        "cloze": {
          "start": 3,
          "answer": "ことは食べたが",
          "quiz": {
            "level": "N4",
            "japanese": "食べることは食べたが、おいしくなかった。",
            "german": "Gegessen habe ich schon, aber lecker war es nicht.",
            "start": 3,
            "answer": "ことは食べたが",
            "acceptedAnswers": [
              "ことは食べたが"
            ],
            "distractors": [
              {
                "text": "ことは食べなかったが",
                "reason": "Dies verneint die ausdrücklich eingeräumte Handlung."
              },
              {
                "text": "ことを食べたが",
                "reason": "Das Zugeständnis verlangt は."
              },
              {
                "text": "ことは食べたので",
                "reason": "ので nennt einen Grund statt den eingeräumten Gegensatz."
              }
            ],
            "promptKana": "たべる＿＿＿、おいしくなかった。"
          }
        }
      },
      {
        "japanese": "高いことは高いが、品質はいい。",
        "romaji": "Takai koto wa takai ga, hinshitsu wa ii.",
        "german": "Teuer ist es zwar, aber die Qualität ist gut."
      }
    ],
    "notes": "Das gleiche Verb/Adj wird wiederholt.",
    "related": [
      "noni"
    ]
  },
  {
    "id": "n4-te-kudasaimasenka",
    "pattern": "～てくださいませんか",
    "level": "N4",
    "category": "Satzstrukturen",
    "meaning": "Würden Sie bitte (höflich)",
    "explanation": "てくださいませんか: höfliche Bitte, zwischen てください und ていただけませんか.",
    "formation": "Verb (て-Form) + くださいませんか",
    "examples": [
      {
        "japanese": "ちょっと手伝ってくださいませんか。",
        "cloze": {
          "start": 7,
          "answer": "てくださいませんか",
          "quiz": {
            "level": "N4",
            "japanese": "ちょっと手伝ってくださいませんか。",
            "german": "Würden Sie mir bitte kurz helfen?",
            "start": 7,
            "answer": "てくださいませんか",
            "acceptedAnswers": [
              "てくださいませんか"
            ],
            "distractors": [
              {
                "text": "たくださいませんか",
                "reason": "Die Bitte verlangt die て-Form."
              },
              {
                "text": "てくださるませんか",
                "reason": "Die höfliche Form von くださる lautet くださいません."
              },
              {
                "text": "てくださいませんた",
                "reason": "Dies ist keine Frageform."
              }
            ],
            "promptKana": "ちょっとてつだっ＿＿＿。"
          }
        },
        "romaji": "Chotto tetsudatte kudasaimasen ka.",
        "german": "Würden Sie mir bitte kurz helfen?"
      },
      {
        "japanese": "写真を撮ってくださいませんか。",
        "cloze": {
          "start": 5,
          "answer": "てくださいませんか"
        },
        "romaji": "Shashin o totte kudasaimasen ka.",
        "german": "Würden Sie bitte ein Foto machen?"
      }
    ],
    "notes": "てください < てくださいませんか < ていただけませんか.",
    "related": [
      "te-kudasai",
      "n4-te-itadakemasenka"
    ]
  },
  {
    "id": "n4-sasete-morau",
    "pattern": "～させてもらう",
    "level": "N4",
    "category": "Verben",
    "meaning": "Sich erlauben lassen zu",
    "explanation": "させてもらう: Erlaubnis erbitten und erhalten, etwas zu tun.",
    "formation": "Verb (させ-Form) + てもらう",
    "examples": [
      {
        "japanese": "今日は早退させてもらいます。",
        "romaji": "Kyō wa sōtai sasete moraimasu.",
        "german": "Ich erlaube mir, heute früher zu gehen.",
        "cloze": {
          "start": 5,
          "answer": "させてもらいます",
          "quiz": {
            "level": "N4",
            "japanese": "今日は早退させてもらいます。",
            "german": "Ich erlaube mir, heute früher zu gehen.",
            "start": 5,
            "answer": "させてもらいます",
            "acceptedAnswers": [
              "させてもらいます"
            ],
            "distractors": [
              {
                "text": "させたもらいます",
                "reason": "もらう folgt der て-Form."
              },
              {
                "text": "させてもらいません",
                "reason": "Dies verneint das Gebrauchmachen von der Erlaubnis."
              },
              {
                "text": "させてもらうます",
                "reason": "Die höfliche Form lautet もらいます."
              }
            ],
            "promptKana": "きょうはそうたい＿＿＿。"
          }
        }
      },
      {
        "japanese": "一言言わせてもらいたい。",
        "romaji": "Hitokoto iwasete moraitai.",
        "german": "Ich möchte mir erlauben, etwas zu sagen."
      }
    ],
    "notes": "Höflich: ～させていただく. Sehr häufig in Geschäftsjapanisch.",
    "related": [
      "n4-saseru",
      "n4-temorau",
      "n4-sasetekudasai"
    ]
  },
  {
    "id": "n4-toiu",
    "pattern": "～という",
    "level": "N4",
    "category": "Satzstrukturen",
    "meaning": "Genannt, namens, dass",
    "explanation": "という: identifiziert oder definiert etwas, oder leitet indirekte Rede ein.",
    "formation": "Nomen/Satz + という + Nomen",
    "examples": [
      {
        "japanese": "「桜」という漢字を知っていますか。",
        "cloze": {
          "start": 3,
          "answer": "という",
          "quiz": {
            "level": "N4",
            "japanese": "「桜」という漢字を知っていますか。",
            "german": "Kennen Sie das Kanji namens 'Sakura'?",
            "start": 3,
            "answer": "という",
            "acceptedAnswers": [
              "という",
              "といった"
            ],
            "distractors": [
              {
                "text": "をいう",
                "reason": "Der zitierte Name braucht と."
              },
              {
                "text": "にいう",
                "reason": "に ersetzt hier nicht die Zitatpartikel."
              },
              {
                "text": "というの",
                "reason": "Das Relativgefüge bestimmt 漢字 ohne zusätzliches の."
              }
            ],
            "promptKana": "「さくら」＿＿＿かんじをしっていますか。"
          }
        },
        "romaji": "\"Sakura\" to iu kanji o shitteimasu ka.",
        "german": "Kennen Sie das Kanji namens 'Sakura'?"
      },
      {
        "japanese": "明日テストがあるということを聞いた。",
        "cloze": {
          "start": 8,
          "answer": "という"
        },
        "romaji": "Ashita tesuto ga aru to iu koto o kiita.",
        "german": "Ich habe gehört, dass morgen ein Test ist."
      }
    ],
    "notes": "Umgangssprache: っていう. ～ということだ = das bedeutet.",
    "related": [
      "n4-tte"
    ]
  },
  {
    "id": "n4-you-to-suru",
    "pattern": "～ようとする",
    "level": "N4",
    "category": "Verben",
    "meaning": "Versuchen zu, im Begriff sein zu",
    "explanation": "ようとする: den Versuch unternehmen oder kurz davor sein.",
    "formation": "Verb (Volitionalform) + とする",
    "examples": [
      {
        "japanese": "ドアを開けようとしたが開かなかった。",
        "romaji": "Doa o akeyō to shita ga akanakatta.",
        "german": "Ich versuchte die Tür zu öffnen, aber sie ging nicht auf.",
        "cloze": {
          "start": 5,
          "answer": "ようとした",
          "quiz": {
            "level": "N4",
            "japanese": "ドアを開けようとしたが開かなかった。",
            "german": "Ich versuchte die Tür zu öffnen, aber sie ging nicht auf.",
            "start": 5,
            "answer": "ようとした",
            "acceptedAnswers": [
              "ようとした"
            ],
            "distractors": [
              {
                "text": "るようとした",
                "reason": "Die Absicht verwendet 開けよう."
              },
              {
                "text": "ようをした",
                "reason": "Die Versuchskonstruktion verlangt と."
              },
              {
                "text": "ようとしなかった",
                "reason": "Dies verneint den Versuch."
              }
            ],
            "promptKana": "ドアをあけ＿＿＿があかなかった。"
          }
        }
      },
      {
        "japanese": "出かけようとした時電話が鳴った。",
        "romaji": "Dekakeyō to shita toki denwa ga natta.",
        "german": "Als ich gerade gehen wollte, klingelte das Telefon."
      }
    ],
    "notes": "～ようとしている = gerade im Begriff sein zu.",
    "related": [
      "n4-volitional",
      "te-miru"
    ]
  },
  {
    "id": "n4-tokini",
    "pattern": "～時(に)",
    "level": "N4",
    "category": "Satzstrukturen",
    "meaning": "Wenn, als (Zeitpunkt)",
    "explanation": "時に: gibt den Zeitpunkt an, wann etwas passiert.",
    "formation": "Verb (辞書形/た形) + 時 / Nomen + の時",
    "examples": [
      {
        "japanese": "日本に行った時お寺を見ました。",
        "romaji": "Nihon ni itta toki otera o mimashita.",
        "german": "Als ich in Japan war, besuchte ich Tempel.",
        "cloze": {
          "start": 6,
          "answer": "時",
          "quiz": {
            "level": "N4",
            "japanese": "日本に行った時お寺を見ました。",
            "german": "Als ich in Japan war, besuchte ich Tempel.",
            "start": 6,
            "answer": "時",
            "acceptedAnswers": [
              "時",
              "際",
              "時に"
            ],
            "distractors": [
              {
                "text": "ながら",
                "reason": "ながら verlangt den Verbstamm."
              },
              {
                "text": "前に",
                "reason": "前に verlangt hier 行く und bedeutet vor der Reise."
              },
              {
                "text": "てから",
                "reason": "行ったてから ist kein Verbanschluss."
              }
            ],
            "promptKana": "にほんにいった＿＿＿おてらをみました。"
          }
        }
      },
      {
        "japanese": "困った時は相談してください。",
        "romaji": "Komatta toki wa sōdan shite kudasai.",
        "german": "Wenn Sie Probleme haben, fragen Sie."
      }
    ],
    "notes": "辞書形+時 = bevor man es tut. た形+時 = nachdem man es getan hat.",
    "related": [
      "n4-aida-ni",
      "tara"
    ]
  },
  {
    "id": "n4-noni-purpose",
    "pattern": "～のに (Zweck)",
    "level": "N4",
    "category": "Satzstrukturen",
    "meaning": "Um zu, zum (Zweck)",
    "explanation": "のに als Zweck: drückt aus, wofür etwas benötigt wird.",
    "formation": "Verb (辞書形) + のに + nötig/nützlich/etc.",
    "examples": [
      {
        "japanese": "この本は勉強するのに役立つ。",
        "romaji": "Kono hon wa benkyō suru noni yakudatsu.",
        "german": "Dieses Buch ist nützlich zum Lernen.",
        "cloze": {
          "start": 8,
          "answer": "のに",
          "quiz": {
            "level": "N4",
            "japanese": "この本は勉強するのに役立つ。",
            "german": "Dieses Buch ist nützlich zum Lernen.",
            "start": 8,
            "answer": "のに",
            "acceptedAnswers": [
              "のに",
              "ために",
              "ため"
            ],
            "distractors": [
              {
                "text": "を",
                "reason": "Der Verbalsatz muss zuerst nominalisiert werden."
              },
              {
                "text": "にの",
                "reason": "Die Reihenfolge lautet のに."
              },
              {
                "text": "なに",
                "reason": "Nach dem Verb ist なに hier kein Zweckanschluss."
              }
            ],
            "promptKana": "このほんはべんきょうする＿＿＿やくだつ。"
          }
        }
      },
      {
        "japanese": "日本語を覚えるのに時間がかかる。",
        "romaji": "Nihongo o oboeru noni jikan ga kakaru.",
        "german": "Japanisch zu lernen braucht Zeit."
      }
    ],
    "notes": "Nicht verwechseln mit ～のに (obwohl). Hier: Zweck/Nutzen.",
    "related": [
      "noni",
      "n4-tame-ni"
    ]
  },
  {
    "id": "n4-te-sumu",
    "pattern": "～てすむ / ～ずにすむ",
    "level": "N4",
    "category": "Verben",
    "meaning": "Es reicht aus / man kommt drum herum",
    "explanation": "てすむ: etwas reicht aus. ずにすむ/ないですむ: man muss es nicht tun.",
    "formation": "Verb (て) + すむ / Verb (ず) + にすむ",
    "examples": [
      {
        "japanese": "薬を飲まずにすんだ。",
        "romaji": "Kusuri o nomazu ni sunda.",
        "german": "Ich kam drum herum, Medizin zu nehmen.",
        "cloze": {
          "start": 4,
          "answer": "ずにすんだ",
          "quiz": {
            "level": "N4",
            "japanese": "薬を飲まずにすんだ。",
            "german": "Ich kam drum herum, Medizin zu nehmen.",
            "start": 4,
            "answer": "ずにすんだ",
            "acceptedAnswers": [
              "ずにすんだ",
              "ないですんだ"
            ],
            "distractors": [
              {
                "text": "ずにすむた",
                "reason": "Die Vergangenheit von 済む lautet すんだ."
              },
              {
                "text": "ずにすまなかった",
                "reason": "Dies verneint, dass die Einnahme vermieden werden konnte."
              },
              {
                "text": "ずをすんだ",
                "reason": "済む wird hier mit に angeschlossen."
              }
            ],
            "promptKana": "くすりをのま＿＿＿。"
          }
        }
      },
      {
        "japanese": "千円ですみました。",
        "romaji": "Sen-en de sumimashita.",
        "german": "Tausend Yen haben gereicht."
      }
    ],
    "notes": "ないですむ = informeller als ずにすむ.",
    "related": [
      "n4-zu-ni"
    ]
  },
  {
    "id": "n4-te-shimau-casual",
    "pattern": "～ちゃう / ～じゃう",
    "level": "N4",
    "category": "Verben",
    "meaning": "Umgangssprachliches ～てしまう",
    "explanation": "ちゃう und じゃう: verkürzte Formen von てしまう und でしまう.",
    "formation": "Verb (て→ちゃう) / Verb (で→じゃう)",
    "examples": [
      {
        "japanese": "全部食べちゃった。",
        "romaji": "Zenbu tabechatta.",
        "german": "Ich hab alles aufgegessen.",
        "cloze": {
          "start": 4,
          "answer": "ちゃった",
          "quiz": {
            "level": "N4",
            "japanese": "全部食べちゃった。",
            "german": "Ich hab alles aufgegessen.",
            "start": 4,
            "answer": "ちゃった",
            "acceptedAnswers": [
              "ちゃった",
              "てしまった"
            ],
            "distractors": [
              {
                "text": "じゃった",
                "reason": "食べてしまった wird zu 食べちゃった, nicht 食べじゃった."
              },
              {
                "text": "ちゃうた",
                "reason": "Die Vergangenheit lautet ちゃった."
              },
              {
                "text": "ちゃわなかった",
                "reason": "Dies verneint das Aufessen."
              }
            ],
            "promptKana": "ぜんぶたべ＿＿＿。"
          }
        }
      },
      {
        "japanese": "電車に忘れ物しちゃった。",
        "romaji": "Densha ni wasuremono shichatta.",
        "german": "Ich hab was in der Bahn vergessen."
      },
      {
        "japanese": "飲んじゃだめだよ。",
        "romaji": "Nonja dame da yo.",
        "german": "Du sollst das nicht trinken."
      }
    ],
    "notes": "Sehr häufig im Alltag. て→ちゃ, で→じゃ.",
    "related": [
      "te-shimau"
    ]
  },
  {
    "id": "n4-dasu",
    "pattern": "～出す",
    "level": "N4",
    "category": "Verben",
    "meaning": "Plötzlich anfangen zu",
    "explanation": "出す als Suffix: plötzlicher Beginn einer Handlung.",
    "formation": "Verb (ます-Stamm) + 出す",
    "examples": [
      {
        "japanese": "急に雨が降り出した。",
        "romaji": "Kyū ni ame ga furi dashita.",
        "german": "Plötzlich fing es an zu regnen.",
        "cloze": {
          "start": 6,
          "answer": "出した",
          "quiz": {
            "level": "N4",
            "japanese": "急に雨が降り出した。",
            "german": "Plötzlich fing es an zu regnen.",
            "start": 6,
            "answer": "出した",
            "acceptedAnswers": [
              "出した"
            ],
            "distractors": [
              {
                "text": "終わった",
                "reason": "Dies bezeichnet das Ende statt den Beginn."
              },
              {
                "text": "出さなかった",
                "reason": "Dies verneint das Einsetzen."
              },
              {
                "text": "出すた",
                "reason": "Dies ist keine Vergangenheitsform."
              }
            ],
            "promptKana": "きゅうにあめがふり＿＿＿。"
          }
        }
      },
      {
        "japanese": "赤ちゃんが泣き出した。",
        "romaji": "Akachan ga naki dashita.",
        "german": "Das Baby fing plötzlich an zu weinen."
      }
    ],
    "notes": "Betont den plötzlichen Beginn. Vgl. ～始める (allgemeiner Beginn).",
    "related": [
      "n4-hajimeru"
    ]
  },
  {
    "id": "n4-wasureru",
    "pattern": "～忘れる",
    "level": "N4",
    "category": "Verben",
    "meaning": "Vergessen zu tun",
    "explanation": "忘れる als Suffix: man vergisst eine Handlung auszuführen.",
    "formation": "Verb (ます-Stamm) + 忘れる",
    "examples": [
      {
        "japanese": "鍵をかけ忘れた。",
        "romaji": "Kagi o kake wasureta.",
        "german": "Ich vergaß abzuschließen.",
        "cloze": {
          "start": 4,
          "answer": "忘れた",
          "quiz": {
            "level": "N4",
            "japanese": "鍵をかけ忘れた。",
            "german": "Ich vergaß abzuschließen.",
            "start": 4,
            "answer": "忘れた",
            "acceptedAnswers": [
              "忘れた"
            ],
            "distractors": [
              {
                "text": "忘れなかった",
                "reason": "Dies verneint das Vergessen."
              },
              {
                "text": "忘れるた",
                "reason": "Dies ist keine Vergangenheitsform."
              },
              {
                "text": "ます忘れた",
                "reason": "ます wird nicht vor 忘れた eingefügt."
              }
            ],
            "promptKana": "かぎをかけ＿＿＿。"
          }
        }
      },
      {
        "japanese": "薬を飲み忘れないでね。",
        "romaji": "Kusuri o nomi wasurenaide ne.",
        "german": "Vergiss nicht die Medizin zu nehmen."
      }
    ],
    "notes": "言い忘れる (vergessen zu sagen), 買い忘れる (vergessen zu kaufen).",
    "related": []
  },
  {
    "id": "n4-souni-suru",
    "pattern": "～ふりをする",
    "level": "N4",
    "category": "Satzstrukturen",
    "meaning": "So tun als ob",
    "explanation": "ふりをする: vortäuschen, sich verstellen.",
    "formation": "Verb (辞書形/ない形) + ふりをする / Nomen + のふりをする",
    "examples": [
      {
        "japanese": "知らないふりをした。",
        "romaji": "Shiranai furi o shita.",
        "german": "Ich tat so, als wüsste ich nichts.",
        "cloze": {
          "start": 4,
          "answer": "ふりをした",
          "quiz": {
            "level": "N4",
            "japanese": "知らないふりをした。",
            "german": "Ich tat so, als wüsste ich nichts.",
            "start": 4,
            "answer": "ふりをした",
            "acceptedAnswers": [
              "ふりをした"
            ],
            "distractors": [
              {
                "text": "ふりをしなかった",
                "reason": "Dies verneint das Vortäuschen."
              },
              {
                "text": "なふりをした",
                "reason": "Nach dem Verb wird kein な eingefügt."
              },
              {
                "text": "ふりにした",
                "reason": "Die feste Verbindung für vortäuschen lautet ふりをする."
              }
            ],
            "promptKana": "しらない＿＿＿。"
          }
        }
      },
      {
        "japanese": "寝たふりをしている。",
        "romaji": "Neta furi o shiteiru.",
        "german": "Er tut so, als ob er schläft."
      }
    ],
    "notes": "Immer bewusstes Vortäuschen.",
    "related": []
  },
  {
    "id": "n4-hazu-ga-nai",
    "pattern": "～はずがない",
    "level": "N4",
    "category": "Satzstrukturen",
    "meaning": "Kann unmöglich sein",
    "explanation": "はずがない: starke Verneinung einer Möglichkeit.",
    "formation": "Verb/Adj (Grundform) + はずがない",
    "examples": [
      {
        "japanese": "彼がそんなことをするはずがない。",
        "cloze": {
          "start": 10,
          "answer": "はずがない",
          "quiz": {
            "level": "N4",
            "japanese": "彼がそんなことをするはずがない。",
            "german": "Er kann unmöglich so etwas tun.",
            "start": 10,
            "answer": "はずがない",
            "acceptedAnswers": [
              "はずがない"
            ],
            "distractors": [
              {
                "text": "はずだ",
                "reason": "Dies behauptet eine Erwartung statt Unmöglichkeit."
              },
              {
                "text": "なはずがない",
                "reason": "Nach dem Verb wird kein な eingefügt."
              },
              {
                "text": "はずをない",
                "reason": "Die Negation verwendet が, nicht を."
              }
            ],
            "promptKana": "かれがそんなことをする＿＿＿。"
          }
        },
        "romaji": "Kare ga sonna koto o suru hazu ga nai.",
        "german": "Er kann unmöglich so etwas tun."
      },
      {
        "japanese": "こんなに安いはずがない。",
        "cloze": {
          "start": 6,
          "answer": "はずがない"
        },
        "romaji": "Konna ni yasui hazu ga nai.",
        "german": "Das kann unmöglich so billig sein."
      }
    ],
    "notes": "Stärker als ～ないだろう. Gegenteil: ～はずだ (müsste sein).",
    "related": [
      "n4-hazu-da",
      "n4-wake-da"
    ]
  },
  {
    "id": "n4-wake-ni-ikanai",
    "pattern": "～わけにはいかない",
    "level": "N4",
    "category": "Satzstrukturen",
    "meaning": "Kann nicht einfach, darf nicht",
    "explanation": "わけにはいかない: aus moralischen oder sozialen Gründen nicht möglich.",
    "formation": "Verb (辞書形) + わけにはいかない",
    "examples": [
      {
        "japanese": "約束したから行かないわけにはいかない。",
        "cloze": {
          "start": 10,
          "answer": "わけにはいかない",
          "quiz": {
            "level": "N4",
            "japanese": "約束したから行かないわけにはいかない。",
            "german": "Ich habe es versprochen, also kann ich nicht einfach nicht gehen.",
            "start": 10,
            "answer": "わけにはいかない",
            "acceptedAnswers": [
              "わけにはいかない",
              "わけにいかない"
            ],
            "distractors": [
              {
                "text": "わけにはいく",
                "reason": "Dies würde das Nichtgehen als möglich darstellen."
              },
              {
                "text": "なわけにはいかない",
                "reason": "Nach dem Verb wird kein な eingefügt."
              },
              {
                "text": "わけをはいかない",
                "reason": "Die feste Konstruktion verwendet に."
              }
            ],
            "promptKana": "やくそくしたからいかない＿＿＿。"
          }
        },
        "romaji": "Yakusoku shita kara ikanai wake ni wa ikanai.",
        "german": "Ich habe es versprochen, also kann ich nicht einfach nicht gehen."
      },
      {
        "japanese": "ここで諦めるわけにはいかない。",
        "cloze": {
          "start": 6,
          "answer": "わけにはいかない"
        },
        "romaji": "Koko de akirameru wake ni wa ikanai.",
        "german": "Ich kann hier nicht einfach aufgeben."
      }
    ],
    "notes": "Soziale/moralische Unmöglichkeit, nicht physische.",
    "related": [
      "n4-wake-da",
      "nakereba-naranai"
    ]
  },
  {
    "id": "n4-tara-dou",
    "pattern": "～たらどう",
    "level": "N4",
    "category": "Satzstrukturen",
    "meaning": "Wie wäre es, wenn",
    "explanation": "たらどう: informeller Vorschlag oder Ratschlag.",
    "formation": "Verb (たら) + どう(ですか)",
    "examples": [
      {
        "japanese": "医者に行ったらどう？",
        "cloze": {
          "start": 5,
          "answer": "たらどう",
          "quiz": {
            "level": "N4",
            "japanese": "医者に行ったらどう？",
            "german": "Wie wäre es, zum Arzt zu gehen?",
            "start": 5,
            "answer": "たらどう",
            "acceptedAnswers": [
              "たらどう"
            ],
            "distractors": [
              {
                "text": "ればどう",
                "reason": "行っれば ist keine Verbform."
              },
              {
                "text": "ますどう",
                "reason": "行っます ist keine Verbform."
              },
              {
                "text": "たどう",
                "reason": "Der Vorschlag verlangt die Bedingungsform たら."
              }
            ],
            "promptKana": "いしゃにいっ＿＿＿？"
          }
        },
        "romaji": "Isha ni ittara dō?",
        "german": "Wie wäre es, zum Arzt zu gehen?"
      },
      {
        "japanese": "もっと休んだらどうですか。",
        "romaji": "Motto yasundara dō desu ka.",
        "german": "Wie wäre es, sich mehr auszuruhen?"
      }
    ],
    "notes": "Kann je nach Ton auch ungeduldig klingen.",
    "related": [
      "n4-ta-hou-ga-ii",
      "tara"
    ]
  },
  {
    "id": "n4-no-wa-da",
    "pattern": "～のは～だ",
    "level": "N4",
    "category": "Satzstrukturen",
    "meaning": "Der Grund ist / es ist ... dass",
    "explanation": "のは～だ/からだ: Betonung oder Erklärung des Grundes.",
    "formation": "Satz + のは + Nomen/Adj + だ/からだ",
    "examples": [
      {
        "japanese": "遅れたのは電車のせいだ。",
        "romaji": "Okureta no wa densha no sei da.",
        "german": "Der Grund für die Verspätung war die Bahn.",
        "cloze": {
          "start": 3,
          "answer": "のは",
          "quiz": {
            "level": "N4",
            "japanese": "遅れたのは電車のせいだ。",
            "german": "Der Grund für die Verspätung war die Bahn.",
            "start": 3,
            "answer": "のは",
            "acceptedAnswers": [
              "のは"
            ],
            "distractors": [
              {
                "text": "を",
                "reason": "を nominalisiert den Satz nicht als Thema."
              },
              {
                "text": "に",
                "reason": "に nominalisiert den Satz nicht als Thema."
              },
              {
                "text": "なは",
                "reason": "Nach dem Verb ist なは kein Anschluss."
              }
            ],
            "promptKana": "おくれた＿＿＿でんしゃのせいだ。"
          }
        }
      },
      {
        "japanese": "驚いたのは値段が高かったからだ。",
        "romaji": "Odoroita no wa nedan ga takakatta kara da.",
        "german": "Überrascht war ich, weil der Preis hoch war."
      }
    ],
    "notes": "Betont den Grund oder das wichtige Element.",
    "related": []
  },
  {
    "id": "n4-daroo",
    "pattern": "～だろう / ～でしょう",
    "level": "N4",
    "category": "Satzstrukturen",
    "meaning": "Wahrscheinlich, vermutlich",
    "explanation": "だろう (informell) und でしょう (höflich): Vermutung oder Erwartung.",
    "formation": "Verb/Adj/Nomen + だろう/でしょう",
    "examples": [
      {
        "japanese": "明日は晴れるでしょう。",
        "cloze": {
          "start": 6,
          "answer": "でしょう",
          "quiz": {
            "level": "N4",
            "japanese": "明日は晴れるでしょう。",
            "german": "Morgen wird es wohl sonnig.",
            "start": 6,
            "answer": "でしょう",
            "acceptedAnswers": [
              "でしょう",
              "だろう"
            ],
            "distractors": [
              {
                "text": "でした",
                "reason": "Die Kopula でした schließt hier nicht an ein Verb an."
              },
              {
                "text": "ます",
                "reason": "ます wird nicht an die Wörterbuchform angeschlossen."
              },
              {
                "text": "なでしょう",
                "reason": "Nach dem Verb wird kein な eingefügt."
              }
            ],
            "promptKana": "あしたははれる＿＿＿。"
          }
        },
        "romaji": "Ashita wa hareru deshō.",
        "german": "Morgen wird es wohl sonnig."
      },
      {
        "japanese": "彼はもう帰っただろう。",
        "cloze": {
          "start": 7,
          "answer": "だろう"
        },
        "romaji": "Kare wa mō kaetta darō.",
        "german": "Er ist wohl schon nach Hause gegangen."
      }
    ],
    "notes": "でしょう? (mit Frageton) = nicht wahr? / oder?",
    "related": [
      "kamoshirenai",
      "n4-hazu-da"
    ]
  },
  {
    "id": "n3-ni-kanshite",
    "pattern": "～に関して",
    "level": "N3",
    "category": "Partikel",
    "meaning": "Bezüglich, hinsichtlich",
    "explanation": "に関して: formelle Variante von ～について. Oft in Schrift und Berichten.",
    "formation": "Nomen + に関して / に関する + Nomen",
    "examples": [
      {
        "japanese": "この件に関して質問があります。",
        "cloze": {
          "start": 3,
          "answer": "に関して",
          "quiz": {
            "level": "N3",
            "japanese": "この件に関して質問があります。",
            "german": "Bezüglich dieser Angelegenheit habe ich eine Frage.",
            "start": 3,
            "answer": "に関して",
            "acceptedAnswers": [
              "に関して",
              "について",
              "に関する"
            ],
            "distractors": [
              {
                "text": "に比べて",
                "reason": "Dies bezeichnet einen Vergleich statt das Fragethema."
              },
              {
                "text": "にとって",
                "reason": "Dies bezeichnet einen Wertmaßstab statt das Fragethema."
              },
              {
                "text": "にかけて",
                "reason": "Dies bezeichnet hier nicht das Thema einer Frage."
              }
            ]
          }
        },
        "romaji": "Kono ken ni kanshite shitsumon ga arimasu.",
        "german": "Bezüglich dieser Angelegenheit habe ich eine Frage."
      },
      {
        "japanese": "環境に関する問題が増えている。",
        "romaji": "Kankyō ni kansuru mondai ga fueteiru.",
        "german": "Umweltbezogene Probleme nehmen zu."
      }
    ],
    "notes": "Formeller als ～について. Vor Nomen: ～に関する.",
    "related": [
      "n4-ni-tsuite"
    ]
  },
  {
    "id": "n3-ni-kurabete",
    "pattern": "～に比べて",
    "level": "N3",
    "category": "Partikel",
    "meaning": "Im Vergleich zu",
    "explanation": "に比べて: drückt einen Vergleich zwischen zwei Dingen aus.",
    "formation": "Nomen + に比べて",
    "examples": [
      {
        "japanese": "去年に比べて売上が伸びた。",
        "cloze": {
          "start": 2,
          "answer": "に比べて",
          "quiz": {
            "level": "N3",
            "japanese": "去年に比べて売上が伸びた。",
            "german": "Im Vergleich zum letzten Jahr ist der Umsatz gestiegen.",
            "start": 2,
            "answer": "に比べて",
            "acceptedAnswers": [
              "に比べて"
            ],
            "distractors": [
              {
                "text": "に反して",
                "reason": "Dies bezeichnet Widerspruch statt den zeitlichen Vergleich."
              },
              {
                "text": "について",
                "reason": "Dies benennt ein Thema statt den Vergleichsmaßstab."
              },
              {
                "text": "にとって",
                "reason": "Ein Jahr ist hier Vergleichsmaßstab, kein Wertmaßstab."
              }
            ]
          }
        },
        "romaji": "Kyonen ni kurabete uriage ga nobita.",
        "german": "Im Vergleich zum letzten Jahr ist der Umsatz gestiegen."
      },
      {
        "japanese": "東京に比べて大阪は物価が安い。",
        "cloze": {
          "start": 2,
          "answer": "に比べて"
        },
        "romaji": "Tōkyō ni kurabete Ōsaka wa bukka ga yasui.",
        "german": "Im Vergleich zu Tokio sind die Preise in Osaka günstiger."
      }
    ],
    "notes": "Ähnlich wie ～より, aber formeller und expliziter.",
    "related": [
      "n4-yori"
    ]
  },
  {
    "id": "n3-ni-motozuite",
    "pattern": "～に基づいて",
    "level": "N3",
    "category": "Partikel",
    "meaning": "Basierend auf, auf Grundlage von",
    "explanation": "に基づいて: etwas wird auf Basis von Fakten oder Regeln getan.",
    "formation": "Nomen + に基づいて / に基づく + Nomen",
    "examples": [
      {
        "japanese": "法律に基づいて判断する。",
        "cloze": {
          "start": 2,
          "answer": "に基づいて",
          "quiz": {
            "level": "N3",
            "japanese": "法律に基づいて判断する。",
            "german": "Auf Grundlage des Gesetzes urteilen.",
            "start": 2,
            "answer": "に基づいて",
            "acceptedAnswers": [
              "に基づいて",
              "に従って"
            ],
            "distractors": [
              {
                "text": "に反して",
                "reason": "Dies bedeutet entgegen dem Gesetz."
              },
              {
                "text": "を問わず",
                "reason": "Dies bedeutet ohne Berücksichtigung des Gesetzes."
              },
              {
                "text": "について",
                "reason": "Dies macht das Gesetz zum Gegenstand statt zur Urteilsgrundlage."
              }
            ]
          }
        },
        "romaji": "Hōritsu ni motozuite handan suru.",
        "german": "Auf Grundlage des Gesetzes urteilen."
      },
      {
        "japanese": "事実に基づいた映画です。",
        "romaji": "Jijitsu ni motozuita eiga desu.",
        "german": "Ein auf Tatsachen basierender Film."
      }
    ],
    "notes": "Vor Nomen: ～に基づく/～に基づいた.",
    "related": []
  },
  {
    "id": "n3-ni-oite",
    "pattern": "～において",
    "level": "N3",
    "category": "Partikel",
    "meaning": "In, bei, an (formal)",
    "explanation": "において: formelle Variante von ～で (Ort/Bereich). Schriftsprache.",
    "formation": "Nomen + において / における + Nomen",
    "examples": [
      {
        "japanese": "会議は東京において行われた。",
        "cloze": {
          "start": 5,
          "answer": "において",
          "quiz": {
            "level": "N3",
            "japanese": "会議は東京において行われた。",
            "german": "Die Konferenz fand in Tokio statt.",
            "start": 5,
            "answer": "において",
            "acceptedAnswers": [
              "において",
              "で"
            ],
            "distractors": [
              {
                "text": "について",
                "reason": "Dies macht Tokio zum Konferenzthema statt zum Veranstaltungsort."
              },
              {
                "text": "にとって",
                "reason": "Dies benennt keinen Veranstaltungsort."
              },
              {
                "text": "に代わって",
                "reason": "Dies bedeutet anstelle von Tokio, nicht in Tokio."
              }
            ]
          }
        },
        "romaji": "Kaigi wa Tōkyō ni oite okonawareta.",
        "german": "Die Konferenz fand in Tokio statt."
      },
      {
        "japanese": "現代社会における問題を考える。",
        "romaji": "Gendai shakai ni okeru mondai o kangaeru.",
        "german": "Probleme in der modernen Gesellschaft bedenken."
      }
    ],
    "notes": "Vor Nomen: ～における. Sehr formell/schriftlich.",
    "related": [
      "de"
    ]
  },
  {
    "id": "n3-ni-ojite",
    "pattern": "～に応じて",
    "level": "N3",
    "category": "Partikel",
    "meaning": "Entsprechend, je nach",
    "explanation": "に応じて: sich anpassend an Umstände oder Bedingungen.",
    "formation": "Nomen + に応じて / に応じた + Nomen",
    "examples": [
      {
        "japanese": "状況に応じて対応を変える。",
        "cloze": {
          "start": 2,
          "answer": "に応じて",
          "quiz": {
            "level": "N3",
            "japanese": "状況に応じて対応を変える。",
            "german": "Je nach Situation die Reaktion ändern.",
            "start": 2,
            "answer": "に応じて",
            "acceptedAnswers": [
              "に応じて"
            ],
            "distractors": [
              {
                "text": "に反して",
                "reason": "Dies bedeutet entgegen statt entsprechend der Situation."
              },
              {
                "text": "を問わず",
                "reason": "Dies bedeutet unabhängig statt je nach Situation."
              },
              {
                "text": "に関する",
                "reason": "状況に関する対応 bedeutet situationsbezogene Reaktion, nicht die verlangte Abhängigkeit ihrer Änderung."
              }
            ]
          }
        },
        "romaji": "Jōkyō ni ōjite taiō o kaeru.",
        "german": "Je nach Situation die Reaktion ändern."
      },
      {
        "japanese": "能力に応じた仕事を与える。",
        "romaji": "Nōryoku ni ōjita shigoto o ataeru.",
        "german": "Eine den Fähigkeiten entsprechende Arbeit geben."
      }
    ],
    "notes": "Ähnlich: ～に合わせて, ～次第で.",
    "related": [
      "n3-shidai"
    ]
  },
  {
    "id": "n3-ni-tomonatte",
    "pattern": "～に伴って",
    "level": "N3",
    "category": "Partikel",
    "meaning": "Mit, einhergehend mit",
    "explanation": "に伴って: eine Veränderung, die parallel zu einer anderen stattfindet.",
    "formation": "Nomen + に伴って / に伴い / に伴う + Nomen",
    "examples": [
      {
        "japanese": "人口増加に伴って環境問題が深刻化した。",
        "cloze": {
          "start": 4,
          "answer": "に伴って",
          "quiz": {
            "level": "N3",
            "japanese": "人口増加に伴って環境問題が深刻化した。",
            "german": "Mit dem Bevölkerungswachstum verschärften sich die Umweltprobleme.",
            "start": 4,
            "answer": "に伴って",
            "acceptedAnswers": [
              "に伴って",
              "につれて",
              "とともに"
            ],
            "distractors": [
              {
                "text": "に反して",
                "reason": "Dies bedeutet entgegen dem Bevölkerungswachstum."
              },
              {
                "text": "を問わず",
                "reason": "Dies behauptet Unabhängigkeit statt begleitender Veränderung."
              },
              {
                "text": "にとって",
                "reason": "Dies nennt einen Wertmaßstab statt paralleler Entwicklung."
              }
            ]
          }
        },
        "romaji": "Jinkō zōka ni tomonatte kankyō mondai ga shinkokuka shita.",
        "german": "Mit dem Bevölkerungswachstum verschärften sich die Umweltprobleme."
      },
      {
        "japanese": "経済成長に伴う変化が見られる。",
        "romaji": "Keizai seichō ni tomonau henka ga mirareru.",
        "german": "Mit dem Wirtschaftswachstum einhergehende Veränderungen sind sichtbar."
      }
    ],
    "notes": "Formell. Ähnlich: ～につれて, ～とともに.",
    "related": [
      "n3-ni-tsurete"
    ]
  },
  {
    "id": "n3-o-hajime",
    "pattern": "～をはじめ",
    "level": "N3",
    "category": "Partikel",
    "meaning": "Angefangen mit, allen voran",
    "explanation": "をはじめ: hebt ein Hauptbeispiel hervor und impliziert weitere.",
    "formation": "Nomen + をはじめ(として)",
    "examples": [
      {
        "japanese": "日本をはじめアジアの国々を訪れた。",
        "cloze": {
          "start": 2,
          "answer": "をはじめ",
          "quiz": {
            "level": "N3",
            "japanese": "日本をはじめアジアの国々を訪れた。",
            "german": "Ich besuchte asiatische Länder, allen voran Japan.",
            "start": 2,
            "answer": "をはじめ",
            "acceptedAnswers": [
              "をはじめ"
            ],
            "distractors": [
              {
                "text": "にとって",
                "reason": "Dies drückt keinen hervorgehobenen Listenanfang aus."
              },
              {
                "text": "に代わって",
                "reason": "Dies bedeutet anstelle Japans statt Japan eingeschlossen."
              },
              {
                "text": "を除いて",
                "reason": "Dies schließt Japan aus, obwohl es ausdrücklich besucht wurde."
              }
            ]
          }
        },
        "romaji": "Nihon o hajime Ajia no kuniguni o otozureta.",
        "german": "Ich besuchte asiatische Länder, allen voran Japan."
      },
      {
        "japanese": "社長をはじめ社員全員が参加した。",
        "cloze": {
          "start": 2,
          "answer": "をはじめ"
        },
        "romaji": "Shachō o hajime shain zen'in ga sanka shita.",
        "german": "Alle Mitarbeiter nahmen teil, angefangen mit dem Firmenchef."
      }
    ],
    "notes": "Formell. Das nach をはじめ genannte ist das wichtigste Beispiel.",
    "related": [
      "n4-nado"
    ]
  },
  {
    "id": "n3-o-tsujite",
    "pattern": "～を通じて / ～を通して",
    "level": "N3",
    "category": "Partikel",
    "meaning": "Durch, über (Mittel/Zeitraum)",
    "explanation": "を通じて/を通して: über ein Medium oder einen Zeitraum hindurch.",
    "formation": "Nomen + を通じて/を通して",
    "examples": [
      {
        "japanese": "インターネットを通じて世界とつながる。",
        "cloze": {
          "start": 7,
          "answer": "を通じて",
          "quiz": {
            "level": "N3",
            "japanese": "インターネットを通じて世界とつながる。",
            "german": "Durch das Internet mit der Welt verbunden sein.",
            "start": 7,
            "answer": "を通じて",
            "acceptedAnswers": [
              "を通じて",
              "を通して",
              "で"
            ],
            "distractors": [
              {
                "text": "を避けて",
                "reason": "Dies bedeutet unter Vermeidung des Internets."
              },
              {
                "text": "とは無関係に",
                "reason": "Dies bedeutet unabhängig vom Internet."
              },
              {
                "text": "に反して",
                "reason": "Dies bedeutet entgegen statt mittels des Internets."
              }
            ]
          }
        },
        "romaji": "Intānetto o tsūjite sekai to tsunagaru.",
        "german": "Durch das Internet mit der Welt verbunden sein."
      },
      {
        "japanese": "一年を通して暖かい気候だ。",
        "cloze": {
          "start": 2,
          "answer": "を通して"
        },
        "romaji": "Ichinen o tōshite atatakai kikō da.",
        "german": "Das Klima ist das ganze Jahr über warm."
      }
    ],
    "notes": "を通じて = eher abstrakt/Medium. を通して = auch konkret/Zeitraum.",
    "related": [
      "n4-ni-yotte"
    ]
  },
  {
    "id": "n3-o-chushin-ni",
    "pattern": "～を中心に",
    "level": "N3",
    "category": "Partikel",
    "meaning": "Mit ... im Mittelpunkt",
    "explanation": "を中心に: etwas steht im Zentrum oder Fokus.",
    "formation": "Nomen + を中心に(して)",
    "examples": [
      {
        "japanese": "駅を中心に町が発展した。",
        "cloze": {
          "start": 1,
          "answer": "を中心に",
          "quiz": {
            "level": "N3",
            "japanese": "駅を中心に町が発展した。",
            "german": "Die Stadt hat sich um den Bahnhof herum entwickelt.",
            "start": 1,
            "answer": "を中心に",
            "acceptedAnswers": [
              "を中心に"
            ],
            "distractors": [
              {
                "text": "から遠く離れて",
                "reason": "Dies verlegt die Entwicklung weit weg vom Bahnhof."
              },
              {
                "text": "を中心な",
                "reason": "Die adverbiale Verbindung verlangt に."
              },
              {
                "text": "が中心を",
                "reason": "Dies ist kein adverbialer Anschluss an 発展した."
              }
            ]
          }
        },
        "romaji": "Eki o chūshin ni machi ga hatten shita.",
        "german": "Die Stadt hat sich um den Bahnhof herum entwickelt."
      },
      {
        "japanese": "文法を中心に勉強している。",
        "cloze": {
          "start": 2,
          "answer": "を中心に"
        },
        "romaji": "Bunpō o chūshin ni benkyō shiteiru.",
        "german": "Ich lerne mit dem Schwerpunkt auf Grammatik."
      }
    ],
    "notes": "Auch: ～を中心として (formeller).",
    "related": []
  },
  {
    "id": "n3-ni-tsurete",
    "pattern": "～につれて",
    "level": "N3",
    "category": "Partikel",
    "meaning": "Je mehr ... desto (proportional)",
    "explanation": "につれて: zwei Veränderungen verlaufen parallel.",
    "formation": "Verb (辞書形) + につれて / Nomen + につれて",
    "examples": [
      {
        "japanese": "年を取るにつれて体力が落ちる。",
        "cloze": {
          "start": 4,
          "answer": "につれて",
          "quiz": {
            "level": "N3",
            "japanese": "年を取るにつれて体力が落ちる。",
            "german": "Je älter man wird, desto mehr schwindet die Körperkraft.",
            "start": 4,
            "answer": "につれて",
            "acceptedAnswers": [
              "につれて",
              "に従って"
            ],
            "distractors": [
              {
                "text": "につれる",
                "reason": "Die feste Veränderungskonstruktion endet hier auf て."
              },
              {
                "text": "をつれて",
                "reason": "を連れて bedeutet jemanden mitnehmen und schließt nicht an 年を取る an."
              },
              {
                "text": "ながら",
                "reason": "ながら verlangt den Stamm, nicht 年を取る."
              }
            ]
          }
        },
        "romaji": "Toshi o toru ni tsurete tairyoku ga ochiru.",
        "german": "Je älter man wird, desto mehr schwindet die Körperkraft."
      },
      {
        "japanese": "時間が経つにつれて忘れてしまう。",
        "cloze": {
          "start": 5,
          "answer": "につれて"
        },
        "romaji": "Jikan ga tatsu ni tsurete wasurete shimau.",
        "german": "Mit der Zeit vergisst man."
      }
    ],
    "notes": "Ähnlich: ～に伴って (formeller), ～に従って (Regel folgend).",
    "related": [
      "n3-ni-tomonatte",
      "n3-ni-shitagatte"
    ]
  },
  {
    "id": "n3-ni-shitagatte",
    "pattern": "～に従って",
    "level": "N3",
    "category": "Partikel",
    "meaning": "Gemäß, folgend; je mehr",
    "explanation": "に従って: einer Regel/Anweisung folgen, oder proportionale Veränderung.",
    "formation": "Nomen + に従って / Verb (辞書形) + に従って",
    "examples": [
      {
        "japanese": "指示に従って作業してください。",
        "cloze": {
          "start": 2,
          "answer": "に従って",
          "quiz": {
            "level": "N3",
            "japanese": "指示に従って作業してください。",
            "german": "Bitte arbeiten Sie gemäß den Anweisungen.",
            "start": 2,
            "answer": "に従って",
            "acceptedAnswers": [
              "に従って",
              "に沿って"
            ],
            "distractors": [
              {
                "text": "に反して",
                "reason": "Dies verlangt Handeln entgegen den Anweisungen."
              },
              {
                "text": "を無視して",
                "reason": "Dies verlangt, die Anweisungen zu ignorieren."
              },
              {
                "text": "に従うて",
                "reason": "従う bildet die て-Form 従って."
              }
            ]
          }
        },
        "romaji": "Shiji ni shitagatte sagyō shite kudasai.",
        "german": "Bitte arbeiten Sie gemäß den Anweisungen."
      },
      {
        "japanese": "高度が上がるに従って気温が下がる。",
        "cloze": {
          "start": 6,
          "answer": "に従って"
        },
        "romaji": "Kōdo ga agaru ni shitagatte kion ga sagaru.",
        "german": "Je höher man steigt, desto niedriger wird die Temperatur."
      }
    ],
    "notes": "Regel: ～に従って + tun. Proportional: wie ～につれて.",
    "related": [
      "n3-ni-tsurete"
    ]
  },
  {
    "id": "n3-ni-watatte",
    "pattern": "～にわたって",
    "level": "N3",
    "category": "Partikel",
    "meaning": "Über ... hinweg, sich erstreckend",
    "explanation": "にわたって: drückt aus, dass etwas einen weiten Bereich oder Zeitraum umfasst.",
    "formation": "Nomen + にわたって / にわたる + Nomen",
    "examples": [
      {
        "japanese": "三日間にわたって会議が行われた。",
        "cloze": {
          "start": 3,
          "answer": "にわたって",
          "quiz": {
            "level": "N3",
            "japanese": "三日間にわたって会議が行われた。",
            "german": "Die Konferenz erstreckte sich über drei Tage.",
            "start": 3,
            "answer": "にわたって",
            "acceptedAnswers": [
              "にわたって"
            ],
            "distractors": [
              {
                "text": "の前に",
                "reason": "Dies bedeutet vor dem Zeitraum."
              },
              {
                "text": "の後に",
                "reason": "Dies bedeutet nach dem Zeitraum."
              },
              {
                "text": "にわたるて",
                "reason": "わたる bildet die て-Form わたって."
              }
            ]
          }
        },
        "romaji": "Mikkakan ni watatte kaigi ga okonawareta.",
        "german": "Die Konferenz erstreckte sich über drei Tage."
      },
      {
        "japanese": "広い範囲にわたる調査を行った。",
        "romaji": "Hiroi han'i ni wataru chōsa o okonatta.",
        "german": "Eine Untersuchung über ein breites Gebiet wurde durchgeführt."
      }
    ],
    "notes": "Vor Nomen: ～にわたる. Betont Ausdehnung in Zeit oder Raum.",
    "related": [
      "n3-ni-kakete"
    ]
  },
  {
    "id": "n3-ni-kakete",
    "pattern": "～にかけて",
    "level": "N3",
    "category": "Partikel",
    "meaning": "Von ... bis (Zeitraum/Bereich)",
    "explanation": "にかけて: von einem Punkt bis zu einem anderen, meist mit ～から.",
    "formation": "Nomen + から + Nomen + にかけて",
    "examples": [
      {
        "japanese": "午後から夕方にかけて雨が降るでしょう。",
        "cloze": {
          "start": 6,
          "answer": "にかけて",
          "quiz": {
            "level": "N3",
            "japanese": "午後から夕方にかけて雨が降るでしょう。",
            "german": "Vom Nachmittag bis zum Abend wird es wohl regnen.",
            "start": 6,
            "answer": "にかけて",
            "acceptedAnswers": [
              "にかけて",
              "まで"
            ],
            "distractors": [
              {
                "text": "の後だけ",
                "reason": "Dies bedeutet ausschließlich danach statt bis zum Abend."
              },
              {
                "text": "にかけるて",
                "reason": "かける bildet die て-Form かけて."
              },
              {
                "text": "をかけて",
                "reason": "をかけて bildet hier keine Zeitspanne ab 午後から."
              }
            ]
          }
        },
        "romaji": "Gogo kara yūgata ni kakete ame ga furu deshō.",
        "german": "Vom Nachmittag bis zum Abend wird es wohl regnen."
      },
      {
        "japanese": "関東から東北にかけて地震があった。",
        "cloze": {
          "start": 6,
          "answer": "にかけて"
        },
        "romaji": "Kantō kara Tōhoku ni kakete jishin ga atta.",
        "german": "Von Kantō bis Tōhoku gab es ein Erdbeben."
      }
    ],
    "notes": "Oft mit ～から: AからBにかけて = von A bis B.",
    "related": [
      "n3-ni-watatte"
    ]
  },
  {
    "id": "n3-muke",
    "pattern": "～向け",
    "level": "N3",
    "category": "Partikel",
    "meaning": "Für, gerichtet an (Zielgruppe)",
    "explanation": "向け: gibt die Zielgruppe an, für die etwas bestimmt ist.",
    "formation": "Nomen + 向け(の) + Nomen",
    "examples": [
      {
        "japanese": "子供向けの番組が多い。",
        "cloze": {
          "start": 2,
          "answer": "向け",
          "quiz": {
            "level": "N3",
            "japanese": "子供向けの番組が多い。",
            "german": "Es gibt viele Sendungen für Kinder.",
            "start": 2,
            "answer": "向け",
            "acceptedAnswers": [
              "向け",
              "向き"
            ],
            "distractors": [
              {
                "text": "向ける",
                "reason": "向けるの ist hier keine attributive Zielgruppenangabe."
              },
              {
                "text": "向けに",
                "reason": "Vor の番組 passt keine zusätzliche adverbiale Endung に."
              },
              {
                "text": "を向けた",
                "reason": "子供を向けた würde Kinder ausrichten, nicht Sendungen adressieren."
              }
            ]
          }
        },
        "romaji": "Kodomo muke no bangumi ga ōi.",
        "german": "Es gibt viele Sendungen für Kinder."
      },
      {
        "japanese": "外国人向けの日本語教材です。",
        "cloze": {
          "start": 3,
          "answer": "向け"
        },
        "romaji": "Gaikokujin muke no nihongo kyōzai desu.",
        "german": "Das ist ein Japanisch-Lehrmaterial für Ausländer."
      }
    ],
    "notes": "向け = Zielgruppe. 向き = geeignet für (n3-muki).",
    "related": [
      "n3-muki"
    ]
  },
  {
    "id": "n3-muki",
    "pattern": "～向き",
    "level": "N3",
    "category": "Partikel",
    "meaning": "Geeignet für, passend für",
    "explanation": "向き: drückt aus, dass etwas für eine bestimmte Gruppe geeignet ist.",
    "formation": "Nomen + 向き(の) + Nomen",
    "examples": [
      {
        "japanese": "この本は初心者向きだ。",
        "cloze": {
          "start": 7,
          "answer": "向き",
          "quiz": {
            "level": "N3",
            "japanese": "この本は初心者向きだ。",
            "german": "Dieses Buch ist für Anfänger geeignet.",
            "start": 7,
            "answer": "向き",
            "acceptedAnswers": [
              "向き",
              "向け"
            ],
            "distractors": [
              {
                "text": "向きに",
                "reason": "Eine adverbiale Endung passt nicht unmittelbar vor だ."
              },
              {
                "text": "向くの",
                "reason": "Dies ist hier keine nominale Eignungsangabe."
              },
              {
                "text": "を向く",
                "reason": "初心者を向くだ ist kein passender Satzabschluss."
              }
            ]
          }
        },
        "romaji": "Kono hon wa shoshinsha muki da.",
        "german": "Dieses Buch ist für Anfänger geeignet."
      },
      {
        "japanese": "家族向きのレストランを探している。",
        "cloze": {
          "start": 2,
          "answer": "向き"
        },
        "romaji": "Kazoku muki no resutoran o sagashiteiru.",
        "german": "Ich suche ein familiengeeignetes Restaurant."
      }
    ],
    "notes": "向き = geeignet. 向け = gezielt für.",
    "related": [
      "n3-muke"
    ]
  },
  {
    "id": "n3-zaruwoenai",
    "pattern": "～ざるを得ない",
    "level": "N3",
    "category": "Verben",
    "meaning": "Nicht umhin können, müssen",
    "explanation": "ざるを得ない: man hat keine andere Wahl als etwas zu tun.",
    "formation": "Verb (ない-Stamm) + ざるを得ない",
    "examples": [
      {
        "japanese": "この条件を受け入れざるを得ない。",
        "cloze": {
          "start": 9,
          "answer": "ざるを得ない",
          "quiz": {
            "level": "N3",
            "japanese": "この条件を受け入れざるを得ない。",
            "german": "Ich muss diese Bedingungen akzeptieren.",
            "start": 9,
            "answer": "ざるを得ない",
            "acceptedAnswers": [
              "ざるを得ない",
              "なければならない",
              "ざるをえない"
            ],
            "distractors": [
              {
                "text": "ざるを得る",
                "reason": "Die Verpflichtungskonstruktion benötigt die Negation 得ない."
              },
              {
                "text": "ざるが得ない",
                "reason": "Die feste Wendung verlangt を."
              },
              {
                "text": "ないほうがいい",
                "reason": "Dies rät von der Annahme ab."
              }
            ]
          }
        },
        "romaji": "Kono jōken o ukeirezaru o enai.",
        "german": "Ich muss diese Bedingungen akzeptieren."
      },
      {
        "japanese": "事情があって辞めざるを得なかった。",
        "romaji": "Jijō ga atte yamezaru o enakatta.",
        "german": "Aus bestimmten Gründen musste ich aufhören."
      }
    ],
    "notes": "する→せざるを得ない. Formell. Ähnlich: ～ないわけにはいかない.",
    "related": [
      "nakereba-naranai",
      "n4-wake-ni-ikanai"
    ]
  },
  {
    "id": "n3-kaneru",
    "pattern": "～かねる",
    "level": "N3",
    "category": "Verben",
    "meaning": "Nicht können (höflich ablehnend)",
    "explanation": "かねる: höfliche Art zu sagen, dass man etwas leider nicht tun kann.",
    "formation": "Verb (ます-Stamm) + かねる",
    "examples": [
      {
        "japanese": "その要望にはお応えしかねます。",
        "romaji": "Sono yōbō ni wa okotae shikanemasu.",
        "german": "Dieser Bitte können wir leider nicht entsprechen."
      },
      {
        "japanese": "賛成しかねる意見だ。",
        "cloze": {
          "start": 3,
          "answer": "かねる",
          "quiz": {
            "level": "N3",
            "japanese": "賛成しかねる意見だ。",
            "german": "Eine Meinung, der ich nicht zustimmen kann.",
            "start": 3,
            "answer": "かねる",
            "acceptedAnswers": [
              "かねる"
            ],
            "distractors": [
              {
                "text": "かねない",
                "reason": "Dies bedeutet möglicherweise zustimmen statt nicht zustimmen können."
              },
              {
                "text": "かねます",
                "reason": "Vor 意見 steht hier die einfache attributive Form."
              },
              {
                "text": "かねるの",
                "reason": "Die Verbform bestimmt 意見 ohne の."
              }
            ]
          }
        },
        "romaji": "Sansei shikaneru iken da.",
        "german": "Eine Meinung, der ich nicht zustimmen kann."
      }
    ],
    "notes": "Höfliche Ablehnung im Geschäftsjapanisch.",
    "related": [
      "n3-kanenai"
    ]
  },
  {
    "id": "n3-kanenai",
    "pattern": "～かねない",
    "level": "N3",
    "category": "Verben",
    "meaning": "Könnte (negativ), es besteht die Gefahr",
    "explanation": "かねない: warnt davor, dass etwas Negatives passieren könnte.",
    "formation": "Verb (ます-Stamm) + かねない",
    "examples": [
      {
        "japanese": "このままでは事故になりかねない。",
        "cloze": {
          "start": 11,
          "answer": "かねない",
          "quiz": {
            "level": "N3",
            "japanese": "このままでは事故になりかねない。",
            "german": "So wie es ist, könnte es zu einem Unfall kommen.",
            "start": 11,
            "answer": "かねない",
            "acceptedAnswers": [
              "かねない"
            ],
            "distractors": [
              {
                "text": "かねる",
                "reason": "Dies bezeichnet Unvermögen statt Unfallgefahr."
              },
              {
                "text": "かねるない",
                "reason": "Die Negativform lautet かねない."
              },
              {
                "text": "かねないだ",
                "reason": "Nach dem verbalen Ausdruck steht kein だ."
              }
            ]
          }
        },
        "romaji": "Kono mama de wa jiko ni narikanenai.",
        "german": "So wie es ist, könnte es zu einem Unfall kommen."
      },
      {
        "japanese": "誤解を招きかねない発言だ。",
        "cloze": {
          "start": 5,
          "answer": "かねない"
        },
        "romaji": "Gokai o manekikanenai hatsugen da.",
        "german": "Eine Aussage, die zu Missverständnissen führen könnte."
      }
    ],
    "notes": "Immer negatives Ergebnis. Gegenteil von ～かねる.",
    "related": [
      "n3-kaneru",
      "n3-osore-ga-aru"
    ]
  },
  {
    "id": "n3-uru-enai",
    "pattern": "～得る / ～得ない",
    "level": "N3",
    "category": "Verben",
    "meaning": "Möglich / unmöglich (formell)",
    "explanation": "得る (うる/える): etwas ist möglich. 得ない (えない): unmöglich.",
    "formation": "Verb (ます-Stamm) + 得る/得ない",
    "examples": [
      {
        "japanese": "そんなことはあり得ない。",
        "cloze": {
          "start": 8,
          "answer": "得ない",
          "quiz": {
            "level": "N3",
            "japanese": "そんなことはあり得ない。",
            "german": "So etwas ist unmöglich.",
            "start": 8,
            "answer": "得ない",
            "acceptedAnswers": [
              "得ない"
            ],
            "distractors": [
              {
                "text": "得る",
                "reason": "Dies bejaht die Möglichkeit."
              },
              {
                "text": "得ないだ",
                "reason": "Nach dem negativen Verb steht kein だ."
              },
              {
                "text": "得るない",
                "reason": "Dies ist keine Negativform."
              }
            ]
          }
        },
        "romaji": "Sonna koto wa arienai.",
        "german": "So etwas ist unmöglich."
      },
      {
        "japanese": "十分起こり得ることだ。",
        "cloze": {
          "start": 5,
          "answer": "得る"
        },
        "romaji": "Juubun okoriuru koto da.",
        "german": "Es ist durchaus möglich, dass das passiert."
      }
    ],
    "notes": "あり得る (ありうる/ありえる) = möglich. あり得ない = unmöglich (Umgangssprache: ありえない!).",
    "related": [
      "n4-potential"
    ]
  },
  {
    "id": "n3-nuku",
    "pattern": "～抜く",
    "level": "N3",
    "category": "Verben",
    "meaning": "Bis zum Ende durchhalten",
    "explanation": "抜く als Suffix: eine schwierige Handlung vollständig durchziehen.",
    "formation": "Verb (ます-Stamm) + 抜く",
    "examples": [
      {
        "japanese": "最後まで走り抜いた。",
        "romaji": "Saigo made hashiri nuita.",
        "german": "Ich bin bis zum Ende durchgelaufen.",
        "cloze": {
          "start": 6,
          "answer": "抜いた",
          "quiz": {
            "level": "N3",
            "japanese": "最後まで走り抜いた。",
            "german": "Ich bin bis zum Ende durchgelaufen.",
            "start": 6,
            "answer": "抜いた",
            "acceptedAnswers": [
              "抜いた"
            ],
            "distractors": [
              {
                "text": "抜かなかった",
                "reason": "Dies verneint das Durchhalten."
              },
              {
                "text": "抜くた",
                "reason": "Dies ist keine Vergangenheitsform."
              },
              {
                "text": "ます抜いた",
                "reason": "ます steht nicht zwischen den Verben."
              }
            ]
          }
        }
      },
      {
        "japanese": "困難を乗り越え、やり抜いた。",
        "romaji": "Konnan o norikoete, yari nuita.",
        "german": "Ich überwand die Schwierigkeiten und zog es durch."
      }
    ],
    "notes": "考え抜く (gründlich durchdenken), 悩み抜く (sich gründlich quälen).",
    "related": [
      "n4-kiru",
      "n4-tsuzukeru"
    ]
  },
  {
    "id": "n3-ppanashi",
    "pattern": "～っぱなし",
    "level": "N3",
    "category": "Verben",
    "meaning": "Etwas gelassen haben (unverändert)",
    "explanation": "っぱなし: ein Zustand bleibt unverändert, oft negativ konnotiert.",
    "formation": "Verb (ます-Stamm) + っぱなし",
    "examples": [
      {
        "japanese": "ドアを開けっぱなしにしないで。",
        "cloze": {
          "start": 5,
          "answer": "っぱなし",
          "quiz": {
            "level": "N3",
            "japanese": "ドアを開けっぱなしにしないで。",
            "german": "Lass die Tür nicht offen stehen.",
            "start": 5,
            "answer": "っぱなし",
            "acceptedAnswers": [
              "っぱなし"
            ],
            "distractors": [
              {
                "text": "っぱなしな",
                "reason": "Vor にしないで passt kein zusätzliches な."
              },
              {
                "text": "っぱなす",
                "reason": "Dies ist hier kein Nomen für den unberichtigten Zustand."
              },
              {
                "text": "っぱなしを",
                "reason": "Die Konstruktion verlangt っぱなしにする."
              }
            ]
          }
        },
        "romaji": "Doa o akeppanashi ni shinaide.",
        "german": "Lass die Tür nicht offen stehen."
      },
      {
        "japanese": "テレビをつけっぱなしで寝た。",
        "cloze": {
          "start": 6,
          "answer": "っぱなし"
        },
        "romaji": "Terebi o tsukeppanashi de neta.",
        "german": "Ich schlief mit laufendem Fernseher ein."
      }
    ],
    "notes": "Oft Kritik: 出しっぱなし (liegen gelassen), 立ちっぱなし (ständig stehend).",
    "related": [
      "n4-mama"
    ]
  },
  {
    "id": "n3-koto-naku",
    "pattern": "～ことなく",
    "level": "N3",
    "category": "Verben",
    "meaning": "Ohne zu (formell)",
    "explanation": "ことなく: formelle Variante von ～ないで/～ずに.",
    "formation": "Verb (辞書形) + ことなく",
    "examples": [
      {
        "japanese": "諦めることなく努力し続けた。",
        "cloze": {
          "start": 3,
          "answer": "ことなく",
          "quiz": {
            "level": "N3",
            "japanese": "諦めることなく努力し続けた。",
            "german": "Ohne aufzugeben, bemühte ich mich weiter.",
            "start": 3,
            "answer": "ことなく",
            "acceptedAnswers": [
              "ことなく"
            ],
            "distractors": [
              {
                "text": "ことをなく",
                "reason": "Die adverbiale Wendung verwendet kein を."
              },
              {
                "text": "なことなく",
                "reason": "Nach dem Verb wird kein な eingefügt."
              },
              {
                "text": "ことなしを",
                "reason": "を schließt hier keine Begleitumstandsangabe an."
              }
            ]
          }
        },
        "romaji": "Akirameru koto naku doryoku shi tsuzuketa.",
        "german": "Ohne aufzugeben, bemühte ich mich weiter."
      },
      {
        "japanese": "一度も休むことなく働いた。",
        "cloze": {
          "start": 5,
          "answer": "ことなく"
        },
        "romaji": "Ichido mo yasumu koto naku hataraita.",
        "german": "Ich arbeitete, ohne ein einziges Mal zu pausieren."
      }
    ],
    "notes": "Formeller als ～ないで/～ずに.",
    "related": [
      "n4-zu-ni"
    ]
  },
  {
    "id": "n3-te-tamaranai",
    "pattern": "～てたまらない",
    "level": "N3",
    "category": "Verben",
    "meaning": "Unerträglich, extrem (Gefühl)",
    "explanation": "てたまらない: ein Gefühl oder Zustand ist so stark, dass man es kaum aushalten kann.",
    "formation": "Verb (て) + たまらない / い-Adj (くて) + たまらない",
    "examples": [
      {
        "japanese": "暑くてたまらない。",
        "cloze": {
          "start": 2,
          "answer": "てたまらない",
          "quiz": {
            "level": "N3",
            "japanese": "暑くてたまらない。",
            "german": "Es ist unerträglich heiß.",
            "start": 2,
            "answer": "てたまらない",
            "acceptedAnswers": [
              "てたまらない",
              "てならない",
              "てしかたがない"
            ],
            "distractors": [
              {
                "text": "たたまらない",
                "reason": "Nach 暑く muss die て-Verbindung stehen."
              },
              {
                "text": "てたまるない",
                "reason": "Die Negativform lautet たまらない."
              },
              {
                "text": "てたまらないだ",
                "reason": "Nach der Negativform steht kein だ."
              }
            ]
          }
        },
        "romaji": "Atsukute tamaranai.",
        "german": "Es ist unerträglich heiß."
      },
      {
        "japanese": "会いたくてたまらない。",
        "cloze": {
          "start": 4,
          "answer": "てたまらない"
        },
        "romaji": "Aitakute tamaranai.",
        "german": "Ich will dich so sehr sehen, dass ich es kaum aushalte."
      }
    ],
    "notes": "Ähnlich: ～てしかたがない, ～てならない. Alle = unerträgliches Gefühl.",
    "related": [
      "n3-te-naranai",
      "n3-te-shikata-ga-nai"
    ]
  },
  {
    "id": "n3-te-naranai",
    "pattern": "～てならない",
    "level": "N3",
    "category": "Verben",
    "meaning": "Kann nicht anders als (Gefühl)",
    "explanation": "てならない: ein unwillkürliches Gefühl, das man nicht kontrollieren kann.",
    "formation": "Verb (て) + ならない / い-Adj (くて) + ならない",
    "examples": [
      {
        "japanese": "彼のことが心配でならない。",
        "romaji": "Kare no koto ga shinpai de naranai.",
        "german": "Ich mache mir solche Sorgen um ihn.",
        "cloze": {
          "start": 7,
          "answer": "でならない",
          "quiz": {
            "level": "N3",
            "japanese": "彼のことが心配でならない。",
            "german": "Ich mache mir solche Sorgen um ihn.",
            "start": 7,
            "answer": "でならない",
            "acceptedAnswers": [
              "でならない",
              "でたまらない",
              "でしかたがない"
            ],
            "distractors": [
              {
                "text": "てならない",
                "reason": "心配 ist nominal/adjektivisch und verbindet sich hier mit で."
              },
              {
                "text": "でなるない",
                "reason": "Die Negativform lautet ならない."
              },
              {
                "text": "でならないだ",
                "reason": "Nach der Negativform steht kein だ."
              }
            ]
          }
        }
      },
      {
        "japanese": "残念でならない。",
        "romaji": "Zannen de naranai.",
        "german": "Es ist zutiefst bedauerlich."
      }
    ],
    "notes": "Formeller als ～てたまらない. Eher für emotionale Gefühle.",
    "related": [
      "n3-te-tamaranai"
    ]
  },
  {
    "id": "n3-te-shikata-ga-nai",
    "pattern": "～てしかたがない",
    "level": "N3",
    "category": "Verben",
    "meaning": "Kann nichts dagegen tun (Gefühl)",
    "explanation": "てしかたがない/てしょうがない: ein Gefühl ist so stark, man kann nichts dagegen tun.",
    "formation": "Verb (て) + しかたがない / い-Adj (くて) + しかたがない",
    "examples": [
      {
        "japanese": "眠くてしかたがない。",
        "cloze": {
          "start": 2,
          "answer": "てしかたがない",
          "quiz": {
            "level": "N3",
            "japanese": "眠くてしかたがない。",
            "german": "Ich bin so müde, ich kann nichts dagegen tun.",
            "start": 2,
            "answer": "てしかたがない",
            "acceptedAnswers": [
              "てしかたがない",
              "て仕方がない",
              "てたまらない",
              "てならない"
            ],
            "distractors": [
              {
                "text": "てしかたをない",
                "reason": "ない verlangt hier が, nicht を."
              },
              {
                "text": "たしかたがない",
                "reason": "眠く verlangt die て-Verbindung."
              },
              {
                "text": "てしかたがある",
                "reason": "Dies ist nicht die feste Wendung für unwiderstehliche Müdigkeit."
              }
            ]
          }
        },
        "romaji": "Nemukute shikata ga nai.",
        "german": "Ich bin so müde, ich kann nichts dagegen tun."
      },
      {
        "japanese": "面白くてしょうがない。",
        "romaji": "Omoshirokute shō ga nai.",
        "german": "Es ist so lustig, ich kann nicht aufhören."
      }
    ],
    "notes": "しょうがない = informeller. Ähnlich: ～てたまらない, ～てならない.",
    "related": [
      "n3-te-tamaranai",
      "n3-te-naranai"
    ]
  },
  {
    "id": "n3-kke",
    "pattern": "～っけ",
    "level": "N3",
    "category": "Verben",
    "meaning": "War es ...? (sich erinnern)",
    "explanation": "っけ: man versucht sich an etwas zu erinnern oder fragt nach.",
    "formation": "Verb/Adj/Nomen (た形/だ) + っけ",
    "examples": [
      {
        "japanese": "明日は何曜日だっけ？",
        "cloze": {
          "start": 7,
          "answer": "っけ",
          "quiz": {
            "level": "N3",
            "japanese": "明日は何曜日だっけ？",
            "german": "Welcher Tag war morgen nochmal?",
            "start": 7,
            "answer": "っけ",
            "acceptedAnswers": [
              "っけ"
            ],
            "distractors": [
              {
                "text": "を",
                "reason": "を bildet hier keine erinnernde Frage."
              },
              {
                "text": "へ",
                "reason": "へ bildet hier keine erinnernde Frage."
              },
              {
                "text": "ます",
                "reason": "だます ist keine Abschlussform."
              }
            ]
          }
        },
        "romaji": "Ashita wa nan'yōbi dakke?",
        "german": "Welcher Tag war morgen nochmal?"
      },
      {
        "japanese": "あの人の名前は何だっけ。",
        "cloze": {
          "start": 9,
          "answer": "っけ"
        },
        "romaji": "Ano hito no namae wa nan dakke.",
        "german": "Wie war nochmal der Name dieser Person?"
      }
    ],
    "notes": "Informell. Drückt aus, dass man etwas vergessen hat und sich erinnern will.",
    "related": []
  },
  {
    "id": "n3-te-hajimete",
    "pattern": "～て初めて",
    "level": "N3",
    "category": "Verben",
    "meaning": "Erst nachdem, zum ersten Mal durch",
    "explanation": "て初めて: erst durch eine Erfahrung versteht oder erkennt man etwas.",
    "formation": "Verb (て-Form) + 初めて",
    "examples": [
      {
        "japanese": "日本に来て初めて寿司を食べた。",
        "cloze": {
          "start": 4,
          "answer": "て初めて",
          "quiz": {
            "level": "N3",
            "japanese": "日本に来て初めて寿司を食べた。",
            "german": "Erst als ich nach Japan kam, aß ich zum ersten Mal Sushi.",
            "start": 4,
            "answer": "て初めて",
            "acceptedAnswers": [
              "て初めて"
            ],
            "distractors": [
              {
                "text": "た初めて",
                "reason": "来た初めて ist hier kein adverbialer Verbanschluss."
              },
              {
                "text": "て初める",
                "reason": "初める ist hier keine adverbiale Erstmaligkeitsangabe."
              },
              {
                "text": "ます初めて",
                "reason": "来ます初めて verbindet hier keine Satzteile."
              }
            ]
          }
        },
        "romaji": "Nihon ni kite hajimete sushi o tabeta.",
        "german": "Erst als ich nach Japan kam, aß ich zum ersten Mal Sushi."
      },
      {
        "japanese": "失って初めて大切さに気づいた。",
        "cloze": {
          "start": 2,
          "answer": "て初めて"
        },
        "romaji": "Ushinatte hajimete taisetsusa ni kizuita.",
        "german": "Erst als ich es verlor, erkannte ich seinen Wert."
      }
    ],
    "notes": "Betont, dass etwas erst durch eine bestimmte Erfahrung möglich wurde.",
    "related": []
  },
  {
    "id": "n3-te-irai",
    "pattern": "～て以来",
    "level": "N3",
    "category": "Verben",
    "meaning": "Seit (einem Ereignis)",
    "explanation": "て以来: seit einem bestimmten Ereignis, der Zustand dauert an.",
    "formation": "Verb (て-Form) + 以来",
    "examples": [
      {
        "japanese": "日本に来て以来、毎日日本語を使っている。",
        "cloze": {
          "start": 4,
          "answer": "て以来",
          "quiz": {
            "level": "N3",
            "japanese": "日本に来て以来、毎日日本語を使っている。",
            "german": "Seit ich nach Japan kam, benutze ich täglich Japanisch.",
            "start": 4,
            "answer": "て以来",
            "acceptedAnswers": [
              "て以来"
            ],
            "distractors": [
              {
                "text": "た以来",
                "reason": "Die zeitliche Wendung verlangt 来て以来."
              },
              {
                "text": "ます以来",
                "reason": "以来 wird hier nicht an ます angeschlossen."
              },
              {
                "text": "て以前",
                "reason": "Dies bedeutet vor statt seit der Ankunft."
              }
            ]
          }
        },
        "romaji": "Nihon ni kite irai, mainichi nihongo o tsukatte iru.",
        "german": "Seit ich nach Japan kam, benutze ich täglich Japanisch."
      },
      {
        "japanese": "卒業して以来、彼に会っていない。",
        "cloze": {
          "start": 3,
          "answer": "て以来"
        },
        "romaji": "Sotsugyō shite irai, kare ni atte inai.",
        "german": "Seit dem Abschluss habe ich ihn nicht mehr gesehen."
      }
    ],
    "notes": "Formeller als ～てから. Der Zustand nach dem Ereignis dauert an.",
    "related": [
      "n4-ato-de"
    ]
  },
  {
    "id": "n3-tsutsu",
    "pattern": "～つつ",
    "level": "N3",
    "category": "Verben",
    "meaning": "Während / obwohl (formell)",
    "explanation": "つつ: formelle Variante von ～ながら (gleichzeitig) oder ～のに (obwohl).",
    "formation": "Verb (ます-Stamm) + つつ",
    "examples": [
      {
        "japanese": "悪いと思いつつ、つい食べてしまう。",
        "cloze": {
          "start": 5,
          "answer": "つつ",
          "quiz": {
            "level": "N3",
            "japanese": "悪いと思いつつ、つい食べてしまう。",
            "german": "Obwohl ich weiß, dass es schlecht ist, esse ich es doch.",
            "start": 5,
            "answer": "つつ",
            "acceptedAnswers": [
              "つつ",
              "ながら"
            ],
            "distractors": [
              {
                "text": "たら",
                "reason": "思いたら ist keine Verbform."
              },
              {
                "text": "ても",
                "reason": "思いても ist keine て-Form von 思う."
              },
              {
                "text": "ないで",
                "reason": "思いないで ist keine Negativform."
              }
            ]
          }
        },
        "romaji": "Warui to omoi tsutsu, tsui tabete shimau.",
        "german": "Obwohl ich weiß, dass es schlecht ist, esse ich es doch."
      },
      {
        "japanese": "景色を楽しみつつ散歩した。",
        "cloze": {
          "start": 6,
          "answer": "つつ"
        },
        "romaji": "Keshiki o tanoshimi tsutsu sanpo shita.",
        "german": "Ich spazierte und genoss dabei die Landschaft."
      }
    ],
    "notes": "～つつも = obwohl. ～つつある = im Prozess sein.",
    "related": [
      "nagara",
      "n3-tsutsu-aru"
    ]
  },
  {
    "id": "n3-tsutsu-aru",
    "pattern": "～つつある",
    "level": "N3",
    "category": "Verben",
    "meaning": "Im Prozess sein, sich gerade verändern",
    "explanation": "つつある: eine allmähliche Veränderung ist im Gange.",
    "formation": "Verb (ます-Stamm) + つつある",
    "examples": [
      {
        "japanese": "状況は改善しつつある。",
        "cloze": {
          "start": 6,
          "answer": "つつある",
          "quiz": {
            "level": "N3",
            "japanese": "状況は改善しつつある。",
            "german": "Die Situation verbessert sich gerade.",
            "start": 6,
            "answer": "つつある",
            "acceptedAnswers": [
              "つつある"
            ],
            "distractors": [
              {
                "text": "つつない",
                "reason": "Die feste Verlaufsform lautet つつある."
              },
              {
                "text": "つつあるだ",
                "reason": "Nach ある steht kein だ."
              },
              {
                "text": "るつつある",
                "reason": "つつ schließt an 改善し an, nicht an 改善する."
              }
            ]
          }
        },
        "romaji": "Jōkyō wa kaizen shitsutsu aru.",
        "german": "Die Situation verbessert sich gerade."
      },
      {
        "japanese": "この文化は消えつつある。",
        "cloze": {
          "start": 7,
          "answer": "つつある"
        },
        "romaji": "Kono bunka wa kietsutsu aru.",
        "german": "Diese Kultur ist im Begriff zu verschwinden."
      }
    ],
    "notes": "Formell/schriftlich. Ähnlich: ～ている (Veränderungsprozess).",
    "related": [
      "n3-tsutsu",
      "te-iru"
    ]
  },
  {
    "id": "n3-ge",
    "pattern": "～げ",
    "level": "N3",
    "category": "Adjektive",
    "meaning": "Scheinend, den Anschein von",
    "explanation": "げ: drückt den äußeren Anschein eines Gefühls oder Zustands aus.",
    "formation": "い-Adj (ohne い) + げ / な-Adj + げ",
    "examples": [
      {
        "japanese": "彼女は悲しげな顔をしていた。",
        "cloze": {
          "start": 5,
          "answer": "げ",
          "quiz": {
            "level": "N3",
            "japanese": "彼女は悲しげな顔をしていた。",
            "german": "Sie hatte ein traurig aussehendes Gesicht.",
            "start": 5,
            "answer": "げ",
            "acceptedAnswers": [
              "げ",
              "そう"
            ],
            "distractors": [
              {
                "text": "い",
                "reason": "悲しいな顔 ist kein attributiver Anschluss."
              },
              {
                "text": "く",
                "reason": "悲しくな顔 ist kein attributiver Anschluss."
              },
              {
                "text": "かった",
                "reason": "悲しかったな顔 ist kein attributiver Anschluss."
              }
            ]
          }
        },
        "romaji": "Kanojo wa kanashige na kao o shiteita.",
        "german": "Sie hatte ein traurig aussehendes Gesicht."
      },
      {
        "japanese": "子供たちは楽しげに遊んでいる。",
        "cloze": {
          "start": 7,
          "answer": "げ"
        },
        "romaji": "Kodomotachi wa tanoshige ni asondeiru.",
        "german": "Die Kinder spielen vergnügt."
      }
    ],
    "notes": "な-Adj-Verhalten: ～げな + Nomen, ～げに + Verb. 嬉しげ, 寂しげ, 不安げ.",
    "related": [
      "n4-sou-appearance"
    ]
  },
  {
    "id": "n3-gimi",
    "pattern": "～気味",
    "level": "N3",
    "category": "Adjektive",
    "meaning": "Leicht, ein wenig, -lich",
    "explanation": "気味 (ぎみ): ein leichter Zustand oder eine Tendenz, meist negativ.",
    "formation": "Verb (ます-Stamm) + 気味 / Nomen + 気味",
    "examples": [
      {
        "japanese": "最近太り気味だ。",
        "cloze": {
          "start": 4,
          "answer": "気味",
          "quiz": {
            "level": "N3",
            "japanese": "最近太り気味だ。",
            "german": "In letzter Zeit nehme ich etwas zu.",
            "start": 4,
            "answer": "気味",
            "acceptedAnswers": [
              "気味"
            ],
            "distractors": [
              {
                "text": "気味な",
                "reason": "Vor だ steht kein zusätzliches な."
              },
              {
                "text": "気味に",
                "reason": "Eine adverbiale Endung passt nicht unmittelbar vor だ."
              },
              {
                "text": "気味を",
                "reason": "を bildet hier keinen Kopulaanschluss."
              }
            ]
          }
        },
        "romaji": "Saikin futori gimi da.",
        "german": "In letzter Zeit nehme ich etwas zu."
      },
      {
        "japanese": "風邪気味で体がだるい。",
        "cloze": {
          "start": 2,
          "answer": "気味"
        },
        "romaji": "Kaze gimi de karada ga darui.",
        "german": "Ich habe eine leichte Erkältung und fühle mich schlapp."
      }
    ],
    "notes": "Meist leicht negative Tendenz. な-Adj-Verhalten: ～気味の + Nomen.",
    "related": [
      "n4-gachi"
    ]
  },
  {
    "id": "n3-darake",
    "pattern": "～だらけ",
    "level": "N3",
    "category": "Adjektive",
    "meaning": "Voll von, voller (negativ)",
    "explanation": "だらけ: bedeckt oder voll von etwas, meist negativ konnotiert.",
    "formation": "Nomen + だらけ",
    "examples": [
      {
        "japanese": "部屋がゴミだらけだ。",
        "cloze": {
          "start": 5,
          "answer": "だらけ",
          "quiz": {
            "level": "N3",
            "japanese": "部屋がゴミだらけだ。",
            "german": "Das Zimmer ist voller Müll.",
            "start": 5,
            "answer": "だらけ",
            "acceptedAnswers": [
              "だらけ"
            ],
            "distractors": [
              {
                "text": "だらけな",
                "reason": "Vor だ steht kein zusätzliches な."
              },
              {
                "text": "だらけに",
                "reason": "に bildet hier keinen prädikativen Abschluss."
              },
              {
                "text": "だらけを",
                "reason": "を bildet hier keinen Kopulaanschluss."
              }
            ]
          }
        },
        "romaji": "Heya ga gomi darake da.",
        "german": "Das Zimmer ist voller Müll."
      },
      {
        "japanese": "この作文は間違いだらけだ。",
        "cloze": {
          "start": 8,
          "answer": "だらけ"
        },
        "romaji": "Kono sakubun wa machigai darake da.",
        "german": "Dieser Aufsatz ist voller Fehler."
      }
    ],
    "notes": "Negativ: 泥だらけ (voller Schlamm), 傷だらけ (voller Kratzer).",
    "related": []
  },
  {
    "id": "n3-buri",
    "pattern": "～ぶり",
    "level": "N3",
    "category": "Adjektive",
    "meaning": "Art und Weise / zum ersten Mal seit",
    "explanation": "ぶり hat zwei Bedeutungen: 1) die Art wie etwas getan wird, 2) nach langer Zeit wieder.",
    "formation": "Verb (ます-Stamm) + ぶり / Zeitraum + ぶり",
    "examples": [
      {
        "japanese": "三年ぶりに日本に行った。",
        "cloze": {
          "start": 2,
          "answer": "ぶり",
          "quiz": {
            "level": "N3",
            "japanese": "三年ぶりに日本に行った。",
            "german": "Ich bin zum ersten Mal seit drei Jahren nach Japan gefahren.",
            "start": 2,
            "answer": "ぶり",
            "acceptedAnswers": [
              "ぶり"
            ],
            "distractors": [
              {
                "text": "前",
                "reason": "Dies bedeutet vor drei Jahren statt nach drei Jahren wieder."
              },
              {
                "text": "後",
                "reason": "Dies bedeutet nach drei Jahren, ohne die Wiederaufnahme zu bezeichnen."
              },
              {
                "text": "ずつ",
                "reason": "Dies verteilt Dreijahresmengen statt den Abstand zur Wiederholung zu nennen."
              }
            ]
          }
        },
        "romaji": "Sannen buri ni Nihon ni itta.",
        "german": "Ich bin zum ersten Mal seit drei Jahren nach Japan gefahren."
      },
      {
        "japanese": "彼の仕事ぶりは素晴らしい。",
        "cloze": {
          "start": 4,
          "answer": "ぶり"
        },
        "romaji": "Kare no shigoto-buri wa subarashii.",
        "german": "Seine Art zu arbeiten ist wunderbar."
      }
    ],
    "notes": "久しぶり = lange nicht gesehen. ～ぶりに = zum ersten Mal seit.",
    "related": []
  },
  {
    "id": "n3-teki",
    "pattern": "～的",
    "level": "N3",
    "category": "Adjektive",
    "meaning": "-isch, -lich, -mäßig",
    "explanation": "的 (てき): wandelt Nomen in な-Adjektive um, ähnlich wie '-isch' im Deutschen.",
    "formation": "Nomen + 的(な/に)",
    "examples": [
      {
        "japanese": "日本的な考え方だ。",
        "cloze": {
          "start": 2,
          "answer": "的",
          "quiz": {
            "level": "N3",
            "japanese": "日本的な考え方だ。",
            "german": "Das ist eine japanische Denkweise.",
            "start": 2,
            "answer": "的",
            "acceptedAnswers": [
              "的"
            ],
            "distractors": [
              {
                "text": "的に",
                "reason": "Vor な考え方 darf nicht zusätzlich に stehen."
              },
              {
                "text": "的の",
                "reason": "Die attributive Verbindung verwendet な."
              },
              {
                "text": "的だ",
                "reason": "だ steht hier nicht vor な考え方."
              }
            ]
          }
        },
        "romaji": "Nihon-teki na kangaekata da.",
        "german": "Das ist eine japanische Denkweise."
      },
      {
        "japanese": "具体的に説明してください。",
        "cloze": {
          "start": 2,
          "answer": "的"
        },
        "romaji": "Gutai-teki ni setsumei shite kudasai.",
        "german": "Bitte erklären Sie es konkret."
      },
      {
        "japanese": "積極的に参加する。",
        "cloze": {
          "start": 2,
          "answer": "的"
        },
        "romaji": "Sekkyoku-teki ni sanka suru.",
        "german": "Aktiv teilnehmen."
      }
    ],
    "notes": "Sehr produktiv: 国際的 (international), 一般的 (allgemein), 基本的 (grundlegend).",
    "related": []
  },
  {
    "id": "n3-kurai-gurai",
    "pattern": "～くらい / ～ぐらい",
    "level": "N3",
    "category": "Adjektive",
    "meaning": "Ungefähr / so ... dass",
    "explanation": "くらい/ぐらい: gibt ein Ausmaß an oder drückt 'ungefähr' aus.",
    "formation": "Verb/Adj + くらい / Zahl + くらい",
    "examples": [
      {
        "japanese": "泣きたいくらい悔しい。",
        "cloze": {
          "start": 4,
          "answer": "くらい",
          "quiz": {
            "level": "N3",
            "japanese": "泣きたいくらい悔しい。",
            "german": "So frustriert, dass ich weinen könnte.",
            "start": 4,
            "answer": "くらい",
            "acceptedAnswers": [
              "くらい",
              "ぐらい",
              "ほど"
            ],
            "distractors": [
              {
                "text": "ながら",
                "reason": "ながら schließt nicht an たい an."
              },
              {
                "text": "から",
                "reason": "Dies macht den Wunsch zu weinen zum Grund statt zum Grad der Frustration."
              },
              {
                "text": "すぎて",
                "reason": "泣きたいすぎて ist kein korrekter Anschluss."
              }
            ]
          }
        },
        "romaji": "Nakitai kurai kuyashii.",
        "german": "So frustriert, dass ich weinen könnte."
      },
      {
        "japanese": "三十分くらい待った。",
        "cloze": {
          "start": 3,
          "answer": "くらい"
        },
        "romaji": "Sanjuppun kurai matta.",
        "german": "Ich habe ungefähr dreißig Minuten gewartet."
      }
    ],
    "notes": "Als Ausmaß: ～くらい = so sehr dass. Als Schätzung: ～くらい = ungefähr.",
    "related": [
      "n4-hodo-p"
    ]
  },
  {
    "id": "n3-wari-ni",
    "pattern": "～割に(は)",
    "level": "N3",
    "category": "Adjektive",
    "meaning": "Dafür dass, im Verhältnis zu",
    "explanation": "割に: das Ergebnis stimmt nicht mit der Erwartung überein.",
    "formation": "Verb/Adj + 割に / Nomen + の割に",
    "examples": [
      {
        "japanese": "この店は値段の割においしい。",
        "romaji": "Kono mise wa nedan no wari ni oishii.",
        "german": "Für den Preis ist dieses Restaurant gut.",
        "cloze": {
          "start": 7,
          "answer": "割に",
          "quiz": {
            "level": "N3",
            "japanese": "この店は値段の割においしい。",
            "german": "Für den Preis ist dieses Restaurant gut.",
            "start": 7,
            "answer": "割に",
            "acceptedAnswers": [
              "割に"
            ],
            "distractors": [
              {
                "text": "割の",
                "reason": "Die adverbiale Bewertung braucht に."
              },
              {
                "text": "ためな",
                "reason": "Dies ist keine adverbiale Preisbewertung."
              },
              {
                "text": "前に",
                "reason": "Dies bezeichnet hier keinen Preis-Leistungs-Vergleich."
              }
            ]
          }
        }
      },
      {
        "japanese": "勉強した割に成績が悪い。",
        "romaji": "Benkyō shita wari ni seiseki ga warui.",
        "german": "Dafür dass ich gelernt habe, sind die Noten schlecht."
      }
    ],
    "notes": "Drückt ein unerwartetes Ergebnis aus.",
    "related": [
      "n3-ni-shite-wa"
    ]
  },
  {
    "id": "n3-ni-shite-wa",
    "pattern": "～にしては",
    "level": "N3",
    "category": "Adjektive",
    "meaning": "Für (im Vergleich zur Erwartung)",
    "explanation": "にしては: das Ergebnis weicht von dem ab, was man bei X erwarten würde.",
    "formation": "Nomen/Verb + にしては",
    "examples": [
      {
        "japanese": "初心者にしては上手ですね。",
        "cloze": {
          "start": 3,
          "answer": "にしては",
          "quiz": {
            "level": "N3",
            "japanese": "初心者にしては上手ですね。",
            "german": "Für einen Anfänger sind Sie gut.",
            "start": 3,
            "answer": "にしては",
            "acceptedAnswers": [
              "にしては"
            ],
            "distractors": [
              {
                "text": "としての",
                "reason": "の braucht ein Bezugsnomen statt 上手ですね."
              },
              {
                "text": "によると",
                "reason": "Dies macht Anfänger zur Informationsquelle statt zum Vergleichsmaßstab."
              },
              {
                "text": "を問わず",
                "reason": "Dies bedeutet unabhängig vom Anfängerstatus, nicht erstaunlich gut dafür."
              }
            ]
          }
        },
        "romaji": "Shoshinsha ni shite wa jōzu desu ne.",
        "german": "Für einen Anfänger sind Sie gut."
      },
      {
        "japanese": "日本人にしては背が高い。",
        "cloze": {
          "start": 3,
          "answer": "にしては"
        },
        "romaji": "Nihonjin ni shite wa se ga takai.",
        "german": "Für einen Japaner ist er groß."
      }
    ],
    "notes": "Impliziert: 'angesichts der Tatsache, dass...'.",
    "related": [
      "n3-wari-ni"
    ]
  },
  {
    "id": "n3-ppoi-negative",
    "pattern": "～っぽい (N3)",
    "level": "N3",
    "category": "Adjektive",
    "meaning": "-artig, leicht zu (erweitert)",
    "explanation": "っぽい auf N3-Niveau: weitere Nuancen und Verwendungen.",
    "formation": "Nomen/Verb-Stamm + っぽい",
    "examples": [
      {
        "japanese": "この話は嘘っぽい。",
        "romaji": "Kono hanashi wa usoppoi.",
        "german": "Diese Geschichte klingt nach Lüge.",
        "cloze": {
          "start": 5,
          "answer": "っぽい",
          "quiz": {
            "level": "N3",
            "japanese": "この話は嘘っぽい。",
            "german": "Diese Geschichte klingt nach Lüge.",
            "start": 5,
            "answer": "っぽい",
            "acceptedAnswers": [
              "っぽい"
            ],
            "distractors": [
              {
                "text": "っぽいだ",
                "reason": "Ein い-Adjektiv erhält kein だ."
              },
              {
                "text": "っぽくでした",
                "reason": "Dies ist keine Adjektivform."
              },
              {
                "text": "っぽくます",
                "reason": "Ein Adjektiv nimmt kein ます."
              }
            ]
          }
        }
      },
      {
        "japanese": "大人っぽい服装だ。",
        "romaji": "Otonappoi fukusō da.",
        "german": "Ein erwachsen wirkender Kleidungsstil."
      }
    ],
    "notes": "忘れっぽい (vergesslich), 飽きっぽい (schnell gelangweilt).",
    "related": [
      "n4-ppoi"
    ]
  },
  {
    "id": "n3-zurai",
    "pattern": "～づらい",
    "level": "N3",
    "category": "Adjektive",
    "meaning": "Schwer zu (emotional/psychisch)",
    "explanation": "づらい: etwas ist psychisch oder emotional schwer zu tun.",
    "formation": "Verb (ます-Stamm) + づらい",
    "examples": [
      {
        "japanese": "上司に言いづらいことがある。",
        "cloze": {
          "start": 5,
          "answer": "づらい",
          "quiz": {
            "level": "N3",
            "japanese": "上司に言いづらいことがある。",
            "german": "Es gibt Dinge, die schwer dem Chef zu sagen sind.",
            "start": 5,
            "answer": "づらい",
            "acceptedAnswers": [
              "づらい",
              "にくい",
              "がたい"
            ],
            "distractors": [
              {
                "text": "づらいな",
                "reason": "Ein い-Adjektiv bestimmt こと ohne な."
              },
              {
                "text": "づらく",
                "reason": "Die adverbiale Form bestimmt hier nicht こと."
              },
              {
                "text": "づらいの",
                "reason": "Das Adjektiv bestimmt こと ohne の."
              }
            ]
          }
        },
        "romaji": "Jōshi ni iidzurai koto ga aru.",
        "german": "Es gibt Dinge, die schwer dem Chef zu sagen sind."
      },
      {
        "japanese": "この靴は歩きづらい。",
        "cloze": {
          "start": 6,
          "answer": "づらい"
        },
        "romaji": "Kono kutsu wa arukidzurai.",
        "german": "Diese Schuhe sind schwer zu laufen."
      }
    ],
    "notes": "づらい = psychische Schwierigkeit. にくい = physische Schwierigkeit.",
    "related": [
      "n4-nikui",
      "n4-yasui"
    ]
  },
  {
    "id": "n3-mono-da",
    "pattern": "～ものだ",
    "level": "N3",
    "category": "Satzstrukturen",
    "meaning": "Sollte / war früher so / wie ... doch",
    "explanation": "ものだ hat drei Bedeutungen: 1) allgemeine Wahrheit/Soll, 2) Erinnerung, 3) Erstaunen.",
    "formation": "Verb (辞書形/た形) + ものだ",
    "examples": [
      {
        "japanese": "年上の人を尊敬するものだ。",
        "cloze": {
          "start": 9,
          "answer": "ものだ",
          "quiz": {
            "level": "N3",
            "japanese": "年上の人を尊敬するものだ。",
            "german": "Man sollte ältere Menschen respektieren.",
            "start": 9,
            "answer": "ものだ",
            "acceptedAnswers": [
              "ものだ",
              "べきだ"
            ],
            "distractors": [
              {
                "text": "なものだ",
                "reason": "Nach dem Verb wird kein な eingefügt."
              },
              {
                "text": "ものをだ",
                "reason": "を steht nicht vor dieser Kopula."
              },
              {
                "text": "ものな",
                "reason": "Die attributive Form schließt den Satz nicht ab."
              }
            ]
          }
        },
        "romaji": "Toshiue no hito o sonkei suru mono da.",
        "german": "Man sollte ältere Menschen respektieren."
      },
      {
        "japanese": "子供の頃よくここで遊んだものだ。",
        "cloze": {
          "start": 12,
          "answer": "ものだ"
        },
        "romaji": "Kodomo no koro yoku koko de asonda mono da.",
        "german": "Als Kind spielte ich oft hier."
      }
    ],
    "notes": "辞書形 = Soll/allgemein. た形 = Erinnerung. よく～たものだ = häufige Erinnerung.",
    "related": [
      "n3-mono-no",
      "n3-mono-dakara"
    ]
  },
  {
    "id": "n3-mono-no",
    "pattern": "～ものの",
    "level": "N3",
    "category": "Satzstrukturen",
    "meaning": "Obwohl, zwar ... aber",
    "explanation": "ものの: räumt etwas ein, drückt aber einen Widerspruch aus. Formell.",
    "formation": "Verb/Adj (Grundform) + ものの",
    "examples": [
      {
        "japanese": "買ったものの、一度も使っていない。",
        "cloze": {
          "start": 3,
          "answer": "ものの",
          "quiz": {
            "level": "N3",
            "japanese": "買ったものの、一度も使っていない。",
            "german": "Zwar gekauft, aber noch nie benutzt.",
            "start": 3,
            "answer": "ものの",
            "acceptedAnswers": [
              "ものの",
              "のに",
              "けれど",
              "が"
            ],
            "distractors": [
              {
                "text": "ものだから",
                "reason": "Dies macht den Kauf zur Ursache statt zum Gegensatz."
              },
              {
                "text": "なものの",
                "reason": "Nach dem Verb wird kein な eingefügt."
              },
              {
                "text": "ものにの",
                "reason": "Dies ist keine konzessive Verbindung."
              }
            ]
          }
        },
        "romaji": "Katta mono no, ichido mo tsukatte inai.",
        "german": "Zwar gekauft, aber noch nie benutzt."
      },
      {
        "japanese": "日本語は勉強しているものの、まだ上手に話せない。",
        "cloze": {
          "start": 10,
          "answer": "ものの"
        },
        "romaji": "Nihongo wa benkyō shiteiru mono no, mada jōzu ni hanasenai.",
        "german": "Obwohl ich Japanisch lerne, kann ich noch nicht gut sprechen."
      }
    ],
    "notes": "Formeller als ～けど/～のに.",
    "related": [
      "noni",
      "n3-mono-da"
    ]
  },
  {
    "id": "n3-mono-dakara",
    "pattern": "～もんだから / ～ものだから",
    "level": "N3",
    "category": "Satzstrukturen",
    "meaning": "Weil (entschuldigend)",
    "explanation": "ものだから: gibt einen Grund an, oft als Entschuldigung.",
    "formation": "Verb/Adj (Grundform) + ものだから",
    "examples": [
      {
        "japanese": "急いでいたものだから、忘れ物をした。",
        "cloze": {
          "start": 5,
          "answer": "ものだから",
          "quiz": {
            "level": "N3",
            "japanese": "急いでいたものだから、忘れ物をした。",
            "german": "Weil ich es eilig hatte, habe ich etwas vergessen.",
            "start": 5,
            "answer": "ものだから",
            "acceptedAnswers": [
              "ものだから",
              "ので",
              "から"
            ],
            "distractors": [
              {
                "text": "ものの",
                "reason": "Dies bezeichnet einen Gegensatz statt einen Grund."
              },
              {
                "text": "なものだから",
                "reason": "Nach dem Verb wird kein な eingefügt."
              },
              {
                "text": "ものだからの",
                "reason": "の kann hier den Folgesatz nicht anschließen."
              }
            ]
          }
        },
        "romaji": "Isoide ita mono dakara, wasuremono o shita.",
        "german": "Weil ich es eilig hatte, habe ich etwas vergessen."
      },
      {
        "japanese": "初めてだったもんだから、失敗してしまった。",
        "cloze": {
          "start": 6,
          "answer": "もんだから"
        },
        "romaji": "Hajimete datta mon dakara, shippai shite shimatta.",
        "german": "Weil es mein erstes Mal war, habe ich versagt."
      }
    ],
    "notes": "もんだから = informell. ものですから = höflich.",
    "related": [
      "node",
      "n3-mono-da"
    ]
  },
  {
    "id": "n3-wake-dewa-nai",
    "pattern": "～わけではない",
    "level": "N3",
    "category": "Satzstrukturen",
    "meaning": "Es ist nicht so dass, nicht unbedingt",
    "explanation": "わけではない: verneint eine Annahme teilweise – es ist nicht ganz so.",
    "formation": "Verb/Adj (Grundform) + わけではない",
    "examples": [
      {
        "japanese": "嫌いなわけではないが、あまり食べない。",
        "cloze": {
          "start": 3,
          "answer": "わけではない",
          "quiz": {
            "level": "N3",
            "japanese": "嫌いなわけではないが、あまり食べない。",
            "german": "Es ist nicht so, dass ich es nicht mag, aber ich esse es selten.",
            "start": 3,
            "answer": "わけではない",
            "acceptedAnswers": [
              "わけではない",
              "わけじゃない"
            ],
            "distractors": [
              {
                "text": "わけだ",
                "reason": "Dies bejaht die Abneigung statt die Folgerung zurückzuweisen."
              },
              {
                "text": "わけをない",
                "reason": "Die Verneinung lautet わけではない."
              },
              {
                "text": "わけではある",
                "reason": "Dies räumt Abneigung ein statt sie zu verneinen."
              }
            ]
          }
        },
        "romaji": "Kirai na wake dewa nai ga, amari tabenai.",
        "german": "Es ist nicht so, dass ich es nicht mag, aber ich esse es selten."
      },
      {
        "japanese": "全員が賛成しているわけではない。",
        "cloze": {
          "start": 9,
          "answer": "わけではない"
        },
        "romaji": "Zen'in ga sansei shiteiru wake dewa nai.",
        "german": "Es ist nicht so, dass alle zustimmen."
      }
    ],
    "notes": "Teilverneinung. ～わけがない = völlige Unmöglichkeit.",
    "related": [
      "n4-wake-da",
      "n4-hazu-ga-nai"
    ]
  },
  {
    "id": "n3-ni-chigainai",
    "pattern": "～に違いない",
    "level": "N3",
    "category": "Satzstrukturen",
    "meaning": "Muss ... sein, bestimmt",
    "explanation": "に違いない: starke Überzeugung, dass etwas so ist.",
    "formation": "Verb/Adj/Nomen + に違いない",
    "examples": [
      {
        "japanese": "彼は知っているに違いない。",
        "cloze": {
          "start": 7,
          "answer": "に違いない",
          "quiz": {
            "level": "N3",
            "japanese": "彼は知っているに違いない。",
            "german": "Er muss es wissen.",
            "start": 7,
            "answer": "に違いない",
            "acceptedAnswers": [
              "に違いない",
              "はずだ"
            ],
            "distractors": [
              {
                "text": "を違いない",
                "reason": "Die feste Gewissheitsform verlangt に."
              },
              {
                "text": "に違うない",
                "reason": "Die Negativform lautet 違いない."
              },
              {
                "text": "なに違いない",
                "reason": "Nach dem Verb wird kein な eingefügt."
              }
            ]
          }
        },
        "romaji": "Kare wa shitteiru ni chigainai.",
        "german": "Er muss es wissen."
      },
      {
        "japanese": "あの音は猫に違いない。",
        "cloze": {
          "start": 5,
          "answer": "に違いない"
        },
        "romaji": "Ano oto wa neko ni chigainai.",
        "german": "Das Geräusch muss von einer Katze sein."
      }
    ],
    "notes": "Stärker als ～はずだ. Fast 100% Überzeugung.",
    "related": [
      "n4-hazu-da",
      "n3-ni-kimatte-iru"
    ]
  },
  {
    "id": "n3-ni-kimatte-iru",
    "pattern": "～に決まっている",
    "level": "N3",
    "category": "Satzstrukturen",
    "meaning": "Steht fest dass, natürlich",
    "explanation": "に決まっている: der Sprecher ist sich absolut sicher.",
    "formation": "Verb/Adj/Nomen + に決まっている",
    "examples": [
      {
        "japanese": "そんなことをしたら怒られるに決まっている。",
        "cloze": {
          "start": 13,
          "answer": "に決まっている",
          "quiz": {
            "level": "N3",
            "japanese": "そんなことをしたら怒られるに決まっている。",
            "german": "Wenn man so etwas tut, wird man natürlich ausgeschimpft.",
            "start": 13,
            "answer": "に決まっている",
            "acceptedAnswers": [
              "に決まっている",
              "に違いない"
            ],
            "distractors": [
              {
                "text": "を決まっている",
                "reason": "Die feste Gewissheitsform verlangt に."
              },
              {
                "text": "に決まるている",
                "reason": "決まる bildet die て-Form 決まって."
              },
              {
                "text": "なに決まっている",
                "reason": "Nach dem Verb wird kein な eingefügt."
              }
            ]
          }
        },
        "romaji": "Sonna koto o shitara okorareru ni kimatte iru.",
        "german": "Wenn man so etwas tut, wird man natürlich ausgeschimpft."
      },
      {
        "japanese": "あの店はおいしいに決まっている。",
        "cloze": {
          "start": 8,
          "answer": "に決まっている"
        },
        "romaji": "Ano mise wa oishii ni kimatte iru.",
        "german": "Das Restaurant ist bestimmt gut."
      }
    ],
    "notes": "Sehr subjektiv und umgangssprachlich. Stärker als ～に違いない.",
    "related": [
      "n3-ni-chigainai"
    ]
  },
  {
    "id": "n3-osore-ga-aru",
    "pattern": "～おそれがある",
    "level": "N3",
    "category": "Satzstrukturen",
    "meaning": "Es besteht die Gefahr dass",
    "explanation": "おそれがある: warnt formell vor einem möglichen negativen Ergebnis.",
    "formation": "Verb (辞書形) + おそれがある / Nomen + のおそれがある",
    "examples": [
      {
        "japanese": "台風が近づくおそれがある。",
        "cloze": {
          "start": 6,
          "answer": "おそれがある",
          "quiz": {
            "level": "N3",
            "japanese": "台風が近づくおそれがある。",
            "german": "Es besteht die Gefahr, dass sich ein Taifun nähert.",
            "start": 6,
            "answer": "おそれがある",
            "acceptedAnswers": [
              "おそれがある"
            ],
            "distractors": [
              {
                "text": "おそれをある",
                "reason": "ある nimmt hier kein direktes Objekt."
              },
              {
                "text": "なおそれがある",
                "reason": "Nach dem Verb wird kein な eingefügt."
              },
              {
                "text": "おそれがない",
                "reason": "Dies verneint die Gefahr."
              }
            ]
          }
        },
        "romaji": "Taifū ga chikazuku osore ga aru.",
        "german": "Es besteht die Gefahr, dass sich ein Taifun nähert."
      },
      {
        "japanese": "地震のおそれがあります。",
        "romaji": "Jishin no osore ga arimasu.",
        "german": "Es besteht Erdbebengefahr."
      }
    ],
    "notes": "Formell. Oft in Nachrichten und Warnungen.",
    "related": [
      "n3-kanenai"
    ]
  },
  {
    "id": "n3-ni-suginai",
    "pattern": "～に過ぎない",
    "level": "N3",
    "category": "Satzstrukturen",
    "meaning": "Nichts weiter als, nur",
    "explanation": "に過ぎない: etwas ist weniger wichtig als man denkt.",
    "formation": "Verb/Nomen + に過ぎない",
    "examples": [
      {
        "japanese": "それは噂に過ぎない。",
        "cloze": {
          "start": 4,
          "answer": "に過ぎない",
          "quiz": {
            "level": "N3",
            "japanese": "それは噂に過ぎない。",
            "german": "Das ist nichts weiter als ein Gerücht.",
            "start": 4,
            "answer": "に過ぎない",
            "acceptedAnswers": [
              "に過ぎない",
              "でしかない"
            ],
            "distractors": [
              {
                "text": "を過ぎない",
                "reason": "を過ぎない bezeichnet hier keine Einschränkung auf ein Gerücht."
              },
              {
                "text": "に過ぎるない",
                "reason": "Dies ist keine Negativform."
              },
              {
                "text": "に過ぎないだ",
                "reason": "Nach der Negativform steht kein だ."
              }
            ]
          }
        },
        "romaji": "Sore wa uwasa ni suginai.",
        "german": "Das ist nichts weiter als ein Gerücht."
      },
      {
        "japanese": "私は学生に過ぎません。",
        "romaji": "Watashi wa gakusei ni sugimasen.",
        "german": "Ich bin nur ein Student."
      }
    ],
    "notes": "Bescheiden oder herabsetzend.",
    "related": [
      "dake",
      "shika-nai"
    ]
  },
  {
    "id": "n3-you-ga-nai",
    "pattern": "～ようがない / ～ようもない",
    "level": "N3",
    "category": "Satzstrukturen",
    "meaning": "Es gibt keine Möglichkeit zu",
    "explanation": "ようがない: es ist absolut unmöglich, etwas zu tun.",
    "formation": "Verb (ます-Stamm) + ようがない",
    "examples": [
      {
        "japanese": "連絡先が分からなくて連絡しようがない。",
        "cloze": {
          "start": 13,
          "answer": "ようがない",
          "quiz": {
            "level": "N3",
            "japanese": "連絡先が分からなくて連絡しようがない。",
            "german": "Ich kenne die Kontaktdaten nicht, ich kann unmöglich Kontakt aufnehmen.",
            "start": 13,
            "answer": "ようがない",
            "acceptedAnswers": [
              "ようがない"
            ],
            "distractors": [
              {
                "text": "ようをない",
                "reason": "Die Wendung verlangt が."
              },
              {
                "text": "ようがある",
                "reason": "Dies bejaht eine Kontaktmöglichkeit."
              },
              {
                "text": "るようがない",
                "reason": "ようがない folgt dem Stamm し."
              }
            ]
          }
        },
        "romaji": "Renrakusaki ga wakaranakute renraku shiyō ga nai.",
        "german": "Ich kenne die Kontaktdaten nicht, ich kann unmöglich Kontakt aufnehmen."
      },
      {
        "japanese": "どうしようもない状況だ。",
        "cloze": {
          "start": 3,
          "answer": "ようもない"
        },
        "romaji": "Dō shiyō mo nai jōkyō da.",
        "german": "Eine hoffnungslose Situation."
      }
    ],
    "notes": "どうしようもない = man kann absolut nichts tun.",
    "related": [
      "n3-hoka-nai"
    ]
  },
  {
    "id": "n3-hoka-nai",
    "pattern": "～ほかない / ～よりほかない",
    "level": "N3",
    "category": "Satzstrukturen",
    "meaning": "Nichts anderes übrig als",
    "explanation": "ほかない: es gibt keine andere Möglichkeit.",
    "formation": "Verb (辞書形) + ほかない/よりほかない",
    "examples": [
      {
        "japanese": "自分でやるほかない。",
        "cloze": {
          "start": 5,
          "answer": "ほかない",
          "quiz": {
            "level": "N3",
            "japanese": "自分でやるほかない。",
            "german": "Es bleibt nichts anderes übrig, als es selbst zu tun.",
            "start": 5,
            "answer": "ほかない",
            "acceptedAnswers": [
              "ほかない",
              "しかない",
              "よりほかない"
            ],
            "distractors": [
              {
                "text": "なほかない",
                "reason": "Nach dem Verb wird kein な eingefügt."
              },
              {
                "text": "ほかをない",
                "reason": "Dies ist keine Ausschließlichkeitskonstruktion."
              },
              {
                "text": "ほかないだ",
                "reason": "Nach ない steht kein だ."
              }
            ]
          }
        },
        "romaji": "Jibun de yaru hoka nai.",
        "german": "Es bleibt nichts anderes übrig, als es selbst zu tun."
      },
      {
        "japanese": "歩いて帰るほかなかった。",
        "romaji": "Aruite kaeru hoka nakatta.",
        "german": "Es blieb nichts übrig als zu Fuß zurückzugehen."
      }
    ],
    "notes": "Ähnlich: ～しかない, ～ざるを得ない.",
    "related": [
      "n3-zaruwoenai",
      "shika-nai"
    ]
  },
  {
    "id": "n3-kiri",
    "pattern": "～きり / ～っきり",
    "level": "N3",
    "category": "Satzstrukturen",
    "meaning": "Seit / nur (und nichts weiter)",
    "explanation": "きり: seit einem Zeitpunkt hat sich nichts geändert, oder nur diese eine Sache.",
    "formation": "Verb (た形) + きり / Nomen + きり",
    "examples": [
      {
        "japanese": "彼とは一度会ったきり連絡がない。",
        "cloze": {
          "start": 8,
          "answer": "きり",
          "quiz": {
            "level": "N3",
            "japanese": "彼とは一度会ったきり連絡がない。",
            "german": "Seit ich ihn einmal traf, gibt es keinen Kontakt mehr.",
            "start": 8,
            "answer": "きり",
            "acceptedAnswers": [
              "きり"
            ],
            "distractors": [
              {
                "text": "ながら",
                "reason": "ながら folgt nicht der た-Form."
              },
              {
                "text": "てから",
                "reason": "会ったてから ist kein Verbanschluss."
              },
              {
                "text": "なきり",
                "reason": "Nach dem Verb wird kein な eingefügt."
              }
            ]
          }
        },
        "romaji": "Kare to wa ichido atta kiri renraku ga nai.",
        "german": "Seit ich ihn einmal traf, gibt es keinen Kontakt mehr."
      },
      {
        "japanese": "二人きりで話したい。",
        "cloze": {
          "start": 2,
          "answer": "きり"
        },
        "romaji": "Futari kiri de hanashitai.",
        "german": "Ich möchte zu zweit (allein) reden."
      }
    ],
    "notes": "～たきり = seit (negativ). ～きり = nur (二人きり = nur zu zweit).",
    "related": [
      "n4-bakari-p"
    ]
  },
  {
    "id": "n3-kuseni",
    "pattern": "～くせに",
    "level": "N3",
    "category": "Satzstrukturen",
    "meaning": "Obwohl, trotz (abwertend)",
    "explanation": "くせに: wie ～のに, aber mit negativer, vorwurfsvoller Nuance.",
    "formation": "Verb/Adj + くせに / Nomen + のくせに",
    "examples": [
      {
        "japanese": "知っているくせに教えてくれない。",
        "cloze": {
          "start": 5,
          "answer": "くせに",
          "quiz": {
            "level": "N3",
            "japanese": "知っているくせに教えてくれない。",
            "german": "Obwohl er es weiß, sagt er es mir nicht.",
            "start": 5,
            "answer": "くせに",
            "acceptedAnswers": [
              "くせに",
              "のに"
            ],
            "distractors": [
              {
                "text": "なくせに",
                "reason": "Nach dem Verb wird kein な eingefügt."
              },
              {
                "text": "くせを",
                "reason": "を verbindet hier keine gegensätzlichen Aussagen."
              },
              {
                "text": "くせにの",
                "reason": "の kann hier den Folgesatz nicht anschließen."
              }
            ]
          }
        },
        "romaji": "Shitteiru kuse ni oshiete kurenai.",
        "german": "Obwohl er es weiß, sagt er es mir nicht."
      },
      {
        "japanese": "子供のくせに生意気だ。",
        "cloze": {
          "start": 3,
          "answer": "くせに"
        },
        "romaji": "Kodomo no kuse ni namaiki da.",
        "german": "Obwohl er ein Kind ist, ist er frech."
      }
    ],
    "notes": "Stärker und negativer als ～のに. Drückt Ärger aus.",
    "related": [
      "noni"
    ]
  },
  {
    "id": "n3-totan",
    "pattern": "～たとたん(に)",
    "level": "N3",
    "category": "Satzstrukturen",
    "meaning": "Im Moment als, kaum dass",
    "explanation": "たとたん: unmittelbar nach einer Handlung passiert unerwartet etwas.",
    "formation": "Verb (た形) + とたん(に)",
    "examples": [
      {
        "japanese": "ドアを開けたとたん、猫が飛び出した。",
        "romaji": "Doa o aketa totan, neko ga tobidashita.",
        "german": "Kaum hatte ich die Tür geöffnet, sprang die Katze heraus.",
        "cloze": {
          "start": 5,
          "answer": "たとたん",
          "quiz": {
            "level": "N3",
            "japanese": "ドアを開けたとたん、猫が飛び出した。",
            "german": "Kaum hatte ich die Tür geöffnet, sprang die Katze heraus.",
            "start": 5,
            "answer": "たとたん",
            "acceptedAnswers": [
              "たとたん"
            ],
            "distractors": [
              {
                "text": "るとたん",
                "reason": "Nach 開け entsteht so 開けるとたん; das plötzliche Folgeereignis verlangt die た-Form."
              },
              {
                "text": "たとたんな",
                "reason": "な ist hier kein Satzanschluss."
              },
              {
                "text": "ますとたん",
                "reason": "Die Wendung folgt nicht der ます-Form."
              }
            ]
          }
        }
      },
      {
        "japanese": "横になったとたんに寝てしまった。",
        "romaji": "Yoko ni natta totan ni nete shimatta.",
        "german": "Kaum hatte ich mich hingelegt, schlief ich ein."
      }
    ],
    "notes": "Immer unerwartet/überraschend. Ähnlich: ～た瞬間.",
    "related": [
      "tara"
    ]
  },
  {
    "id": "n3-saichuu",
    "pattern": "～最中に",
    "level": "N3",
    "category": "Satzstrukturen",
    "meaning": "Mitten in, gerade als",
    "explanation": "最中に: genau in der Mitte einer Handlung passiert etwas.",
    "formation": "Verb (ている) + 最中に / Nomen + の最中に",
    "examples": [
      {
        "japanese": "会議の最中に電話が鳴った。",
        "cloze": {
          "start": 3,
          "answer": "最中に",
          "quiz": {
            "level": "N3",
            "japanese": "会議の最中に電話が鳴った。",
            "german": "Mitten in der Konferenz klingelte das Telefon.",
            "start": 3,
            "answer": "最中に",
            "acceptedAnswers": [
              "最中に"
            ],
            "distractors": [
              {
                "text": "前に",
                "reason": "Dies bedeutet vor der Konferenz."
              },
              {
                "text": "後に",
                "reason": "Dies bedeutet nach der Konferenz."
              },
              {
                "text": "最中な",
                "reason": "Die adverbiale Zeitangabe verlangt に."
              }
            ]
          }
        },
        "romaji": "Kaigi no saichū ni denwa ga natta.",
        "german": "Mitten in der Konferenz klingelte das Telefon."
      },
      {
        "japanese": "食べている最中に来客があった。",
        "cloze": {
          "start": 5,
          "answer": "最中に"
        },
        "romaji": "Tabeteiru saichū ni raikyaku ga atta.",
        "german": "Mitten beim Essen kam Besuch."
      }
    ],
    "notes": "Betont, dass die Handlung im vollen Gange ist.",
    "related": [
      "n4-aida-ni",
      "n4-tokoro-da"
    ]
  },
  {
    "id": "n3-sai-ni",
    "pattern": "～際(に)",
    "level": "N3",
    "category": "Satzstrukturen",
    "meaning": "Bei, anlässlich (formell)",
    "explanation": "際に: formelle Variante von ～時に. Oft in offiziellen Kontexten.",
    "formation": "Verb (辞書形/た形) + 際(に) / Nomen + の際(に)",
    "examples": [
      {
        "japanese": "お帰りの際はお忘れ物のないようご注意ください。",
        "romaji": "Okaeri no sai wa owasuremono no nai yō go-chūi kudasai.",
        "german": "Achten Sie beim Verlassen bitte darauf, nichts zu vergessen.",
        "cloze": {
          "start": 4,
          "answer": "際",
          "quiz": {
            "level": "N3",
            "japanese": "お帰りの際はお忘れ物のないようご注意ください。",
            "german": "Achten Sie beim Verlassen bitte darauf, nichts zu vergessen.",
            "start": 4,
            "answer": "際",
            "acceptedAnswers": [
              "際",
              "時"
            ],
            "distractors": [
              {
                "text": "際な",
                "reason": "Vor は wird hier kein な eingefügt."
              },
              {
                "text": "際を",
                "reason": "を passt nicht vor die thematische Zeitangabe は."
              },
              {
                "text": "際だ",
                "reason": "Die Kopula passt nicht vor は."
              }
            ]
          }
        }
      },
      {
        "japanese": "申し込みの際に身分証明書が必要です。",
        "romaji": "Mōshikomi no sai ni mibun shōmeisho ga hitsuyō desu.",
        "german": "Bei der Anmeldung ist ein Ausweis erforderlich."
      }
    ],
    "notes": "Formell/schriftlich. Alltagssprache: ～時に.",
    "related": [
      "n4-tokini"
    ]
  },
  {
    "id": "n3-ue-de",
    "pattern": "～上で",
    "level": "N3",
    "category": "Satzstrukturen",
    "meaning": "Nachdem / in Bezug auf",
    "explanation": "上で: 1) nachdem man etwas getan hat (た形), 2) in Bezug auf, wenn es um ... geht (辞書形).",
    "formation": "Verb (た形/辞書形) + 上で / Nomen + の上で",
    "examples": [
      {
        "japanese": "よく考えた上で決めてください。",
        "cloze": {
          "start": 5,
          "answer": "上で",
          "quiz": {
            "level": "N3",
            "japanese": "よく考えた上で決めてください。",
            "german": "Bitte entscheiden Sie, nachdem Sie gut darüber nachgedacht haben.",
            "start": 5,
            "answer": "上で",
            "acceptedAnswers": [
              "上で"
            ],
            "distractors": [
              {
                "text": "上を",
                "reason": "Die anschließende Entscheidung verlangt hier 上で."
              },
              {
                "text": "前に",
                "reason": "前に verlangt die Wörterbuchform und bedeutet vorher."
              },
              {
                "text": "ながら",
                "reason": "ながら folgt nicht der た-Form."
              }
            ]
          }
        },
        "romaji": "Yoku kangaeta ue de kimete kudasai.",
        "german": "Bitte entscheiden Sie, nachdem Sie gut darüber nachgedacht haben."
      },
      {
        "japanese": "仕事の上で大切なことだ。",
        "cloze": {
          "start": 3,
          "answer": "上で"
        },
        "romaji": "Shigoto no ue de taisetsu na koto da.",
        "german": "Das ist in Bezug auf die Arbeit wichtig."
      }
    ],
    "notes": "た形 + 上で = nachdem. 辞書形/Nomen + 上で = hinsichtlich.",
    "related": [
      "n4-ato-de"
    ]
  },
  {
    "id": "n3-uchi-ni",
    "pattern": "～うちに",
    "level": "N3",
    "category": "Satzstrukturen",
    "meaning": "Solange, bevor es sich ändert",
    "explanation": "うちに: etwas tun, solange ein Zustand noch andauert.",
    "formation": "Verb (辞書形/ない形/ている) + うちに / Adj + うちに",
    "examples": [
      {
        "japanese": "若いうちにいろいろ経験したい。",
        "cloze": {
          "start": 2,
          "answer": "うちに",
          "quiz": {
            "level": "N3",
            "japanese": "若いうちにいろいろ経験したい。",
            "german": "Solange ich jung bin, möchte ich viel erleben.",
            "start": 2,
            "answer": "うちに",
            "acceptedAnswers": [
              "うちに"
            ],
            "distractors": [
              {
                "text": "なうちに",
                "reason": "Ein い-Adjektiv erhält hier kein な."
              },
              {
                "text": "うちの",
                "reason": "の würde ein Nomen statt des Folgesatzes bestimmen."
              },
              {
                "text": "うちを",
                "reason": "を bildet hier keine Zeitangabe."
              }
            ]
          }
        },
        "romaji": "Wakai uchi ni iroiro keiken shitai.",
        "german": "Solange ich jung bin, möchte ich viel erleben."
      },
      {
        "japanese": "忘れないうちにメモしておこう。",
        "cloze": {
          "start": 4,
          "answer": "うちに"
        },
        "romaji": "Wasurenai uchi ni memo shite okō.",
        "german": "Ich notiere es, bevor ich es vergesse."
      }
    ],
    "notes": "～ているうちに = während (und dabei ändert sich etwas).",
    "related": [
      "n4-aida-ni"
    ]
  },
  {
    "id": "n3-tabi-ni",
    "pattern": "～たびに",
    "level": "N3",
    "category": "Satzstrukturen",
    "meaning": "Jedes Mal wenn",
    "explanation": "たびに: jedes Mal, wenn eine Handlung stattfindet, passiert etwas.",
    "formation": "Verb (辞書形) + たびに / Nomen + のたびに",
    "examples": [
      {
        "japanese": "日本に行くたびにお土産を買う。",
        "cloze": {
          "start": 5,
          "answer": "たびに",
          "quiz": {
            "level": "N3",
            "japanese": "日本に行くたびにお土産を買う。",
            "german": "Jedes Mal wenn ich nach Japan fahre, kaufe ich Souvenirs.",
            "start": 5,
            "answer": "たびに",
            "acceptedAnswers": [
              "たびに"
            ],
            "distractors": [
              {
                "text": "たびな",
                "reason": "Die wiederholte Zeitangabe verlangt に."
              },
              {
                "text": "なたびに",
                "reason": "Nach dem Verb wird kein な eingefügt."
              },
              {
                "text": "たびを",
                "reason": "を bildet hier keine wiederholte Zeitangabe."
              }
            ]
          }
        },
        "romaji": "Nihon ni iku tabi ni omiyage o kau.",
        "german": "Jedes Mal wenn ich nach Japan fahre, kaufe ich Souvenirs."
      },
      {
        "japanese": "この曲を聞くたびに学生時代を思い出す。",
        "cloze": {
          "start": 6,
          "answer": "たびに"
        },
        "romaji": "Kono kyoku o kiku tabi ni gakusei jidai o omoidasu.",
        "german": "Jedes Mal wenn ich dieses Lied höre, denke ich an meine Studienzeit."
      }
    ],
    "notes": "Regelmäßige Wiederholung.",
    "related": [
      "n4-to-conditional"
    ]
  },
  {
    "id": "n3-toori",
    "pattern": "～とおり(に)",
    "level": "N3",
    "category": "Satzstrukturen",
    "meaning": "Wie, so wie, genauso wie",
    "explanation": "とおりに: genauso wie etwas gesagt/getan/erwartet wurde.",
    "formation": "Verb (た形/辞書形) + とおり(に) / Nomen + のとおり(に)",
    "examples": [
      {
        "japanese": "説明書のとおりに組み立ててください。",
        "romaji": "Setsumeisho no tōri ni kumitatete kudasai.",
        "german": "Bauen Sie es gemäß der Anleitung zusammen.",
        "cloze": {
          "start": 4,
          "answer": "とおりに",
          "quiz": {
            "level": "N3",
            "japanese": "説明書のとおりに組み立ててください。",
            "german": "Bauen Sie es gemäß der Anleitung zusammen.",
            "start": 4,
            "answer": "とおりに",
            "acceptedAnswers": [
              "とおりに"
            ],
            "distractors": [
              {
                "text": "とおりな",
                "reason": "Die adverbiale Entsprechung verlangt に."
              },
              {
                "text": "とおりを",
                "reason": "を bildet hier keine Art-und-Weise-Angabe."
              },
              {
                "text": "とおりの",
                "reason": "の braucht ein Bezugsnomen statt 組み立てて."
              }
            ]
          }
        }
      },
      {
        "japanese": "思ったとおりだった。",
        "romaji": "Omotta tōri datta.",
        "german": "Es war genau wie ich dachte."
      }
    ],
    "notes": "言ったとおり (wie gesagt), 予想どおり (wie erwartet).",
    "related": []
  },
  {
    "id": "n3-dokoro-ka",
    "pattern": "～どころか",
    "level": "N3",
    "category": "Satzstrukturen",
    "meaning": "Weit davon entfernt, geschweige denn",
    "explanation": "どころか: die Realität ist weit von der Erwartung entfernt.",
    "formation": "Verb/Adj/Nomen + どころか",
    "examples": [
      {
        "japanese": "旅行どころか、休みも取れない。",
        "cloze": {
          "start": 2,
          "answer": "どころか",
          "quiz": {
            "level": "N3",
            "japanese": "旅行どころか、休みも取れない。",
            "german": "Von Reise ganz zu schweigen, ich kann nicht mal frei nehmen.",
            "start": 2,
            "answer": "どころか",
            "acceptedAnswers": [
              "どころか"
            ],
            "distractors": [
              {
                "text": "どころを",
                "reason": "Dies ist keine steigernde Gegenüberstellung."
              },
              {
                "text": "どころにの",
                "reason": "Dies ist keine steigernde Gegenüberstellung."
              },
              {
                "text": "どころな",
                "reason": "Dies schließt den Folgesatz nicht an."
              }
            ]
          }
        },
        "romaji": "Ryokō dokoro ka, yasumi mo torenai.",
        "german": "Von Reise ganz zu schweigen, ich kann nicht mal frei nehmen."
      },
      {
        "japanese": "減るどころか、増えている。",
        "cloze": {
          "start": 2,
          "answer": "どころか"
        },
        "romaji": "Heru dokoro ka, fueteiru.",
        "german": "Weit davon entfernt abzunehmen, nimmt es sogar zu."
      }
    ],
    "notes": "Verstärkt den Kontrast zwischen Erwartung und Realität.",
    "related": [
      "n3-dokoro-dewa-nai"
    ]
  },
  {
    "id": "n3-dokoro-dewa-nai",
    "pattern": "～どころではない",
    "level": "N3",
    "category": "Satzstrukturen",
    "meaning": "Nicht die Zeit/Gelegenheit für",
    "explanation": "どころではない: die Situation erlaubt es nicht, sich damit zu befassen.",
    "formation": "Verb (辞書形) + どころではない / Nomen + どころではない",
    "examples": [
      {
        "japanese": "忙しくて旅行どころではない。",
        "cloze": {
          "start": 6,
          "answer": "どころではない",
          "quiz": {
            "level": "N3",
            "japanese": "忙しくて旅行どころではない。",
            "german": "Ich bin so beschäftigt, dass an Reise nicht zu denken ist.",
            "start": 6,
            "answer": "どころではない",
            "acceptedAnswers": [
              "どころではない",
              "どころじゃない"
            ],
            "distractors": [
              {
                "text": "どころではある",
                "reason": "Dies bejaht den Raum für eine Reise."
              },
              {
                "text": "どころをない",
                "reason": "Die feste Wendung verwendet では."
              },
              {
                "text": "どころではないだ",
                "reason": "Nach ない steht kein だ."
              }
            ]
          }
        },
        "romaji": "Isogashikute ryokō dokoro dewa nai.",
        "german": "Ich bin so beschäftigt, dass an Reise nicht zu denken ist."
      },
      {
        "japanese": "遊ぶどころじゃないよ。",
        "romaji": "Asobu dokoro ja nai yo.",
        "german": "Jetzt ist nicht die Zeit zum Spielen."
      }
    ],
    "notes": "Informell: ～どころじゃない.",
    "related": [
      "n3-dokoro-ka"
    ]
  },
  {
    "id": "n3-bakari-ka",
    "pattern": "～ばかりか",
    "level": "N3",
    "category": "Satzstrukturen",
    "meaning": "Nicht nur ... sondern auch",
    "explanation": "ばかりか: nicht nur X, sondern darüber hinaus auch Y.",
    "formation": "Verb/Adj/Nomen + ばかりか ～も/さえ",
    "examples": [
      {
        "japanese": "日本語ばかりか中国語も話せる。",
        "cloze": {
          "start": 3,
          "answer": "ばかりか",
          "quiz": {
            "level": "N3",
            "japanese": "日本語ばかりか中国語も話せる。",
            "german": "Er kann nicht nur Japanisch, sondern auch Chinesisch.",
            "start": 3,
            "answer": "ばかりか",
            "acceptedAnswers": [
              "ばかりか",
              "だけでなく",
              "のみならず"
            ],
            "distractors": [
              {
                "text": "しか",
                "reason": "しか verlangt eine negative Endung."
              },
              {
                "text": "ばかりを",
                "reason": "を bildet hier keinen nicht-nur-sondern-auch-Anschluss."
              },
              {
                "text": "ばかりな",
                "reason": "な bildet hier keinen Anschluss an den Folgesatz."
              }
            ]
          }
        },
        "romaji": "Nihongo bakari ka chūgokugo mo hanaseru.",
        "german": "Er kann nicht nur Japanisch, sondern auch Chinesisch."
      },
      {
        "japanese": "成績が上がるばかりか、友達も増えた。",
        "cloze": {
          "start": 6,
          "answer": "ばかりか"
        },
        "romaji": "Seiseki ga agaru bakari ka, tomodachi mo fueta.",
        "german": "Nicht nur die Noten stiegen, auch die Freunde wurden mehr."
      }
    ],
    "notes": "Formeller als ～だけでなく.",
    "related": [
      "n4-dake-de-naku"
    ]
  },
  {
    "id": "n3-bakari-ni",
    "pattern": "～ばかりに",
    "level": "N3",
    "category": "Satzstrukturen",
    "meaning": "Nur weil (mit negativem Ergebnis)",
    "explanation": "ばかりに: nur wegen eines bestimmten Grundes kam es zu einem schlechten Ergebnis.",
    "formation": "Verb (た形) + ばかりに",
    "examples": [
      {
        "japanese": "遅刻したばかりに大事な話を聞き逃した。",
        "cloze": {
          "start": 4,
          "answer": "ばかりに",
          "quiz": {
            "level": "N3",
            "japanese": "遅刻したばかりに大事な話を聞き逃した。",
            "german": "Nur weil ich zu spät kam, verpasste ich das wichtige Gespräch.",
            "start": 4,
            "answer": "ばかりに",
            "acceptedAnswers": [
              "ばかりに",
              "ために",
              "せいで"
            ],
            "distractors": [
              {
                "text": "ばかりを",
                "reason": "Die kausale Verbindung verlangt に."
              },
              {
                "text": "なばかりに",
                "reason": "Nach dem Verb wird kein な eingefügt."
              },
              {
                "text": "ばかりの",
                "reason": "の braucht ein Bezugsnomen statt des Folgesatzes."
              }
            ]
          }
        },
        "romaji": "Chikoku shita bakari ni daiji na hanashi o kikinogashita.",
        "german": "Nur weil ich zu spät kam, verpasste ich das wichtige Gespräch."
      },
      {
        "japanese": "お金がないばかりに夢を諦めた。",
        "cloze": {
          "start": 5,
          "answer": "ばかりに"
        },
        "romaji": "Okane ga nai bakari ni yume o akirameta.",
        "german": "Nur weil ich kein Geld hatte, gab ich meinen Traum auf."
      }
    ],
    "notes": "Immer negatives Ergebnis. Bedauern.",
    "related": [
      "n4-sei-de"
    ]
  },
  {
    "id": "n3-kara-niwa",
    "pattern": "～からには",
    "level": "N3",
    "category": "Satzstrukturen",
    "meaning": "Wenn schon, da nun mal",
    "explanation": "からには: da man sich einmal entschieden hat, muss man auch durchziehen.",
    "formation": "Verb (辞書形/た形) + からには",
    "examples": [
      {
        "japanese": "やるからには最後までやる。",
        "cloze": {
          "start": 2,
          "answer": "からには",
          "quiz": {
            "level": "N3",
            "japanese": "やるからには最後までやる。",
            "german": "Wenn ich es schon mache, dann bis zum Ende.",
            "start": 2,
            "answer": "からには",
            "acceptedAnswers": [
              "からには",
              "以上は"
            ],
            "distractors": [
              {
                "text": "なからには",
                "reason": "Nach dem Verb wird kein な eingefügt."
              },
              {
                "text": "からのには",
                "reason": "Die feste Voraussetzungskonstruktion enthält kein の."
              },
              {
                "text": "からにを",
                "reason": "Dies ist keine Voraussetzungskonstruktion."
              }
            ]
          }
        },
        "romaji": "Yaru kara ni wa saigo made yaru.",
        "german": "Wenn ich es schon mache, dann bis zum Ende."
      },
      {
        "japanese": "約束したからには守らなければならない。",
        "cloze": {
          "start": 4,
          "answer": "からには"
        },
        "romaji": "Yakusoku shita kara ni wa mamoranakereba naranai.",
        "german": "Da ich es versprochen habe, muss ich es halten."
      }
    ],
    "notes": "Ähnlich: ～以上は.",
    "related": [
      "n3-ijou-wa"
    ]
  },
  {
    "id": "n3-kara-toitte",
    "pattern": "～からといって",
    "level": "N3",
    "category": "Satzstrukturen",
    "meaning": "Nur weil ... heißt das nicht",
    "explanation": "からといって: nur weil X, bedeutet das nicht automatisch Y.",
    "formation": "Verb/Adj/Nomen + からといって ～わけではない",
    "examples": [
      {
        "japanese": "安いからといって品質が悪いわけではない。",
        "cloze": {
          "start": 2,
          "answer": "からといって",
          "quiz": {
            "level": "N3",
            "japanese": "安いからといって品質が悪いわけではない。",
            "german": "Nur weil es billig ist, heißt das nicht, dass die Qualität schlecht ist.",
            "start": 2,
            "answer": "からといって",
            "acceptedAnswers": [
              "からといって"
            ],
            "distractors": [
              {
                "text": "からと言うて",
                "reason": "言う bildet in der Standardsprache 言って."
              },
              {
                "text": "なからといって",
                "reason": "Ein い-Adjektiv erhält hier kein な."
              },
              {
                "text": "からをいって",
                "reason": "Die zitierende Verbindung verlangt と."
              }
            ]
          }
        },
        "romaji": "Yasui kara to itte hinshitsu ga warui wake dewa nai.",
        "german": "Nur weil es billig ist, heißt das nicht, dass die Qualität schlecht ist."
      },
      {
        "japanese": "日本人だからといって漢字が全部読めるわけではない。",
        "cloze": {
          "start": 4,
          "answer": "からといって"
        },
        "romaji": "Nihonjin da kara to itte kanji ga zenbu yomeru wake dewa nai.",
        "german": "Nur weil man Japaner ist, heißt das nicht, dass man alle Kanji lesen kann."
      }
    ],
    "notes": "Oft mit ～わけではない oder ～とは限らない.",
    "related": [
      "n3-wake-dewa-nai"
    ]
  },
  {
    "id": "n3-ijou-wa",
    "pattern": "～以上(は)",
    "level": "N3",
    "category": "Satzstrukturen",
    "meaning": "Da nun mal, solange",
    "explanation": "以上は: da eine Tatsache besteht, muss man entsprechend handeln.",
    "formation": "Verb (辞書形/た形) + 以上(は)",
    "examples": [
      {
        "japanese": "引き受けた以上は責任を持つ。",
        "romaji": "Hikiuketa ijō wa sekinin o motsu.",
        "german": "Da ich es übernommen habe, trage ich die Verantwortung.",
        "cloze": {
          "start": 5,
          "answer": "以上は",
          "quiz": {
            "level": "N3",
            "japanese": "引き受けた以上は責任を持つ。",
            "german": "Da ich es übernommen habe, trage ich die Verantwortung.",
            "start": 5,
            "answer": "以上は",
            "acceptedAnswers": [
              "以上は",
              "からには"
            ],
            "distractors": [
              {
                "text": "な以上は",
                "reason": "Nach dem Verb wird kein な eingefügt."
              },
              {
                "text": "以上をは",
                "reason": "を steht hier nicht vor は."
              },
              {
                "text": "以上な",
                "reason": "Dies schließt die Konsequenz nicht an."
              }
            ]
          }
        }
      },
      {
        "japanese": "学生である以上、勉強するべきだ。",
        "romaji": "Gakusei de aru ijō, benkyō suru beki da.",
        "german": "Solange man Student ist, sollte man lernen."
      }
    ],
    "notes": "Ähnlich: ～からには.",
    "related": [
      "n3-kara-niwa"
    ]
  },
  {
    "id": "n3-kagiri",
    "pattern": "～限り",
    "level": "N3",
    "category": "Satzstrukturen",
    "meaning": "Solange, soweit",
    "explanation": "限り: solange ein Zustand andauert / soweit man weiß.",
    "formation": "Verb (辞書形/ない形/ている) + 限り",
    "examples": [
      {
        "japanese": "私が知っている限りでは問題ない。",
        "cloze": {
          "start": 7,
          "answer": "限り",
          "quiz": {
            "level": "N3",
            "japanese": "私が知っている限りでは問題ない。",
            "german": "Soweit ich weiß, gibt es kein Problem.",
            "start": 7,
            "answer": "限り",
            "acceptedAnswers": [
              "限り"
            ],
            "distractors": [
              {
                "text": "な限り",
                "reason": "Nach dem Verb wird kein な eingefügt."
              },
              {
                "text": "限りを",
                "reason": "を passt hier nicht vor では."
              },
              {
                "text": "限りだ",
                "reason": "だ passt hier nicht vor では."
              }
            ]
          }
        },
        "romaji": "Watashi ga shitteiru kagiri de wa mondai nai.",
        "german": "Soweit ich weiß, gibt es kein Problem."
      },
      {
        "japanese": "体が元気な限り働き続けたい。",
        "cloze": {
          "start": 5,
          "answer": "限り"
        },
        "romaji": "Karada ga genki na kagiri hataraki tsuzuketai.",
        "german": "Solange ich gesund bin, möchte ich weiterarbeiten."
      }
    ],
    "notes": "できる限り = so viel wie möglich.",
    "related": []
  },
  {
    "id": "n3-koto-da",
    "pattern": "～ことだ",
    "level": "N3",
    "category": "Satzstrukturen",
    "meaning": "Sollte, es ist ratsam",
    "explanation": "ことだ: gibt einen Ratschlag oder eine allgemeine Empfehlung.",
    "formation": "Verb (辞書形/ない形) + ことだ",
    "examples": [
      {
        "japanese": "健康のために野菜を食べることだ。",
        "cloze": {
          "start": 12,
          "answer": "ことだ",
          "quiz": {
            "level": "N3",
            "japanese": "健康のために野菜を食べることだ。",
            "german": "Für die Gesundheit sollte man Gemüse essen.",
            "start": 12,
            "answer": "ことだ",
            "acceptedAnswers": [
              "ことだ",
              "べきだ"
            ],
            "distractors": [
              {
                "text": "なことだ",
                "reason": "Nach dem Verb wird kein な eingefügt."
              },
              {
                "text": "ことをだ",
                "reason": "を steht nicht vor dieser Kopula."
              },
              {
                "text": "ことな",
                "reason": "Dies ist kein Satzabschluss."
              }
            ]
          }
        },
        "romaji": "Kenkō no tame ni yasai o taberu koto da.",
        "german": "Für die Gesundheit sollte man Gemüse essen."
      },
      {
        "japanese": "遅刻しないことだ。",
        "cloze": {
          "start": 5,
          "answer": "ことだ"
        },
        "romaji": "Chikoku shinai koto da.",
        "german": "Man sollte nicht zu spät kommen."
      }
    ],
    "notes": "Allgemeiner Rat, nicht an eine bestimmte Person gerichtet.",
    "related": [
      "n4-ta-hou-ga-ii",
      "n4-beki-da"
    ]
  },
  {
    "id": "n3-mono-ka",
    "pattern": "～ものか / ～もんか",
    "level": "N3",
    "category": "Satzstrukturen",
    "meaning": "Auf keinen Fall! Niemals!",
    "explanation": "ものか: drückt starke Ablehnung oder Entschlossenheit aus.",
    "formation": "Verb (辞書形) + ものか/もんか",
    "examples": [
      {
        "japanese": "あんな所に二度と行くものか。",
        "cloze": {
          "start": 10,
          "answer": "ものか",
          "quiz": {
            "level": "N3",
            "japanese": "あんな所に二度と行くものか。",
            "german": "An so einen Ort gehe ich nie wieder!",
            "start": 10,
            "answer": "ものか",
            "acceptedAnswers": [
              "ものか",
              "もんか"
            ],
            "distractors": [
              {
                "text": "ものだ",
                "reason": "Dies behauptet eine allgemeine Regel statt entschiedener Ablehnung."
              },
              {
                "text": "なものか",
                "reason": "Nach dem Verb wird kein な eingefügt."
              },
              {
                "text": "ものをか",
                "reason": "Dies ist keine rhetorische Ablehnungsform."
              }
            ]
          }
        },
        "romaji": "Anna tokoro ni nido to iku mono ka.",
        "german": "An so einen Ort gehe ich nie wieder!"
      },
      {
        "japanese": "負けるもんか！",
        "cloze": {
          "start": 3,
          "answer": "もんか"
        },
        "romaji": "Makeru mon ka!",
        "german": "Ich werde auf keinen Fall verlieren!"
      }
    ],
    "notes": "Emotional und umgangssprachlich. もんか = informeller.",
    "related": []
  },
  {
    "id": "n3-ta-tokoro",
    "pattern": "～たところ",
    "level": "N3",
    "category": "Satzstrukturen",
    "meaning": "Als ich ... tat (Ergebnis)",
    "explanation": "たところ: als man etwas versuchte, ergab sich ein (oft unerwartetes) Ergebnis.",
    "formation": "Verb (た形) + ところ",
    "examples": [
      {
        "japanese": "聞いてみたところ、もう売り切れだった。",
        "cloze": {
          "start": 4,
          "answer": "たところ",
          "quiz": {
            "level": "N3",
            "japanese": "聞いてみたところ、もう売り切れだった。",
            "german": "Als ich nachfragte, war es schon ausverkauft.",
            "start": 4,
            "answer": "たところ",
            "acceptedAnswers": [
              "たところ"
            ],
            "distractors": [
              {
                "text": "るところ",
                "reason": "みるところ bezeichnet hier nicht das Ergebnis des Nachfragens."
              },
              {
                "text": "ますところ",
                "reason": "Die Wendung folgt hier nicht der ます-Form."
              },
              {
                "text": "たところな",
                "reason": "な schließt den Folgesatz nicht an."
              }
            ]
          }
        },
        "romaji": "Kiite mita tokoro, mō urikire datta.",
        "german": "Als ich nachfragte, war es schon ausverkauft."
      },
      {
        "japanese": "調べたところ、問題が見つかった。",
        "cloze": {
          "start": 2,
          "answer": "たところ"
        },
        "romaji": "Shirabeta tokoro, mondai ga mitsukatta.",
        "german": "Als ich nachforschte, fand ich ein Problem."
      }
    ],
    "notes": "Unterschied zu ～ところだ (Zeitpunkt): ～たところ = Ergebnis.",
    "related": [
      "n4-tokoro-da",
      "tara"
    ]
  },
  {
    "id": "n3-nai-koto-wa-nai",
    "pattern": "～ないことはない",
    "level": "N3",
    "category": "Satzstrukturen",
    "meaning": "Es ist nicht so, dass man nicht kann",
    "explanation": "ないことはない: doppelte Verneinung = schwache Bejahung. 'Es geht schon, aber...'",
    "formation": "Verb (ない形) + ことはない",
    "examples": [
      {
        "japanese": "食べられないことはないが、好きではない。",
        "cloze": {
          "start": 4,
          "answer": "ないことはない",
          "quiz": {
            "level": "N3",
            "japanese": "食べられないことはないが、好きではない。",
            "german": "Essen kann ich es schon, aber ich mag es nicht.",
            "start": 4,
            "answer": "ないことはない",
            "acceptedAnswers": [
              "ないことはない"
            ],
            "distractors": [
              {
                "text": "ないことはある",
                "reason": "Dies räumt Unfähigkeit statt grundsätzlicher Fähigkeit ein."
              },
              {
                "text": "ないことをない",
                "reason": "Die einschränkende Doppelverneinung verwendet は."
              },
              {
                "text": "ないことはないだ",
                "reason": "Nach ない steht kein だ."
              }
            ]
          }
        },
        "romaji": "Taberarenai koto wa nai ga, suki dewa nai.",
        "german": "Essen kann ich es schon, aber ich mag es nicht."
      },
      {
        "japanese": "分からないことはないが、説明しにくい。",
        "cloze": {
          "start": 3,
          "answer": "ないことはない"
        },
        "romaji": "Wakaranai koto wa nai ga, setsumei shinikui.",
        "german": "Verstehen tue ich es, aber es ist schwer zu erklären."
      }
    ],
    "notes": "Schwache Bejahung mit Vorbehalt.",
    "related": [
      "n3-wake-dewa-nai"
    ]
  },
  {
    "id": "n3-ni-mo-kakawarazu",
    "pattern": "～にもかかわらず",
    "level": "N3",
    "category": "Satzstrukturen",
    "meaning": "Trotz, ungeachtet",
    "explanation": "にもかかわらず: formelle Variante von ～のに (trotz).",
    "formation": "Verb/Adj/Nomen + にもかかわらず",
    "examples": [
      {
        "japanese": "雨にもかかわらず多くの人が集まった。",
        "cloze": {
          "start": 1,
          "answer": "にもかかわらず",
          "quiz": {
            "level": "N3",
            "japanese": "雨にもかかわらず多くの人が集まった。",
            "german": "Trotz des Regens versammelten sich viele Menschen.",
            "start": 1,
            "answer": "にもかかわらず",
            "acceptedAnswers": [
              "にもかかわらず"
            ],
            "distractors": [
              {
                "text": "にもかかわるず",
                "reason": "Die negative Form lautet かかわらず."
              },
              {
                "text": "をもかかわらず",
                "reason": "Die feste Wendung verlangt に."
              },
              {
                "text": "にもかかわらずの",
                "reason": "の schließt hier keinen Folgesatz an."
              }
            ]
          }
        },
        "romaji": "Ame ni mo kakawarazu ōku no hito ga atsumatta.",
        "german": "Trotz des Regens versammelten sich viele Menschen."
      },
      {
        "japanese": "努力したにもかかわらず失敗した。",
        "cloze": {
          "start": 4,
          "answer": "にもかかわらず"
        },
        "romaji": "Doryoku shita ni mo kakawarazu shippai shita.",
        "german": "Trotz meiner Bemühungen habe ich versagt."
      }
    ],
    "notes": "Sehr formell/schriftlich. Alltagssprache: ～のに.",
    "related": [
      "noni"
    ]
  },
  {
    "id": "n3-to-shitemo",
    "pattern": "～としても",
    "level": "N3",
    "category": "Satzstrukturen",
    "meaning": "Selbst wenn (angenommen)",
    "explanation": "としても: selbst wenn man annimmt, dass X wahr ist.",
    "formation": "Verb/Adj/Nomen + としても",
    "examples": [
      {
        "japanese": "たとえ失敗したとしても後悔しない。",
        "cloze": {
          "start": 7,
          "answer": "としても",
          "quiz": {
            "level": "N3",
            "japanese": "たとえ失敗したとしても後悔しない。",
            "german": "Selbst wenn ich scheitere, werde ich es nicht bereuen.",
            "start": 7,
            "answer": "としても",
            "acceptedAnswers": [
              "としても"
            ],
            "distractors": [
              {
                "text": "をしても",
                "reason": "Die hypothetische Annahme verlangt と."
              },
              {
                "text": "とするても",
                "reason": "する bildet die て-Form して."
              },
              {
                "text": "なとしても",
                "reason": "Nach dem Verb wird kein な eingefügt."
              }
            ]
          }
        },
        "romaji": "Tatoe shippai shita to shitemo kōkai shinai.",
        "german": "Selbst wenn ich scheitere, werde ich es nicht bereuen."
      },
      {
        "japanese": "仮に合格したとしても、まだ先は長い。",
        "cloze": {
          "start": 6,
          "answer": "としても"
        },
        "romaji": "Kari ni gōkaku shita to shitemo, mada saki wa nagai.",
        "german": "Selbst wenn ich bestehe, ist es noch ein langer Weg."
      }
    ],
    "notes": "Hypothetischer als ～ても.",
    "related": [
      "temo"
    ]
  },
  {
    "id": "n3-shidai",
    "pattern": "～次第",
    "level": "N3",
    "category": "Satzstrukturen",
    "meaning": "Sobald / es kommt an auf",
    "explanation": "次第: 1) sobald etwas passiert (ます-Stamm+次第), 2) es hängt ab von (Nomen+次第).",
    "formation": "Verb (ます-Stamm) + 次第 / Nomen + 次第",
    "examples": [
      {
        "japanese": "届き次第ご連絡します。",
        "cloze": {
          "start": 2,
          "answer": "次第",
          "quiz": {
            "level": "N3",
            "japanese": "届き次第ご連絡します。",
            "german": "Ich melde mich, sobald es ankommt.",
            "start": 2,
            "answer": "次第",
            "acceptedAnswers": [
              "次第"
            ],
            "distractors": [
              {
                "text": "たら",
                "reason": "届きたら ist keine Verbform."
              },
              {
                "text": "次第な",
                "reason": "Dies schließt das folgende Handeln nicht adverbial an."
              },
              {
                "text": "次第を",
                "reason": "を bildet hier keine Zeitangabe."
              }
            ]
          }
        },
        "romaji": "Todoki shidai go-renraku shimasu.",
        "german": "Ich melde mich, sobald es ankommt."
      },
      {
        "japanese": "結果はあなた次第です。",
        "cloze": {
          "start": 6,
          "answer": "次第"
        },
        "romaji": "Kekka wa anata shidai desu.",
        "german": "Das Ergebnis hängt von dir ab."
      }
    ],
    "notes": "ます-Stamm + 次第 = sobald (formell). Nomen + 次第 = es kommt an auf.",
    "related": [
      "n3-ni-ojite"
    ]
  },
  {
    "id": "n3-ippou-de",
    "pattern": "～一方(で)",
    "level": "N3",
    "category": "Satzstrukturen",
    "meaning": "Andererseits, während gleichzeitig",
    "explanation": "一方で: zwei Aspekte oder Gegensätze gegenüberstellen.",
    "formation": "Verb/Adj (Grundform) + 一方(で)",
    "examples": [
      {
        "japanese": "便利になる一方で、危険も増えている。",
        "romaji": "Benri ni naru ippō de, kiken mo fueteiru.",
        "german": "Es wird praktischer, aber gleichzeitig steigen die Gefahren.",
        "cloze": {
          "start": 5,
          "answer": "一方で",
          "quiz": {
            "level": "N3",
            "japanese": "便利になる一方で、危険も増えている。",
            "german": "Es wird praktischer, aber gleichzeitig steigen die Gefahren.",
            "start": 5,
            "answer": "一方で",
            "acceptedAnswers": [
              "一方で"
            ],
            "distractors": [
              {
                "text": "な一方で",
                "reason": "Nach dem Verb wird kein な eingefügt."
              },
              {
                "text": "一方を",
                "reason": "を bildet hier keinen kontrastierenden Anschluss."
              },
              {
                "text": "一方だの",
                "reason": "Dies schließt die zweite Entwicklung nicht an."
              }
            ]
          }
        }
      },
      {
        "japanese": "彼は優しい一方で、厳しい面もある。",
        "romaji": "Kare wa yasashii ippō de, kibishii men mo aru.",
        "german": "Er ist freundlich, hat aber auch eine strenge Seite."
      }
    ],
    "notes": "～一方だ = immer mehr (Tendenz): 増える一方だ = nimmt immer mehr zu.",
    "related": [
      "n3-hanmen"
    ]
  },
  {
    "id": "n3-hanmen",
    "pattern": "～反面",
    "level": "N3",
    "category": "Satzstrukturen",
    "meaning": "Andererseits, auf der anderen Seite",
    "explanation": "反面: zeigt die Kehrseite oder den Gegensatz einer Eigenschaft.",
    "formation": "Verb/Adj (Grundform) + 反面",
    "examples": [
      {
        "japanese": "この仕事はやりがいがある反面、ストレスも多い。",
        "cloze": {
          "start": 12,
          "answer": "反面",
          "quiz": {
            "level": "N3",
            "japanese": "この仕事はやりがいがある反面、ストレスも多い。",
            "german": "Diese Arbeit ist lohnend, hat aber auch viel Stress.",
            "start": 12,
            "answer": "反面",
            "acceptedAnswers": [
              "反面",
              "一方で"
            ],
            "distractors": [
              {
                "text": "な反面",
                "reason": "Nach dem Verb wird kein な eingefügt."
              },
              {
                "text": "反面を",
                "reason": "を bildet hier keinen Gegensatzanschluss."
              },
              {
                "text": "反面だの",
                "reason": "Dies schließt den Folgesatz nicht an."
              }
            ]
          }
        },
        "romaji": "Kono shigoto wa yarigai ga aru hanmen, sutoresu mo ōi.",
        "german": "Diese Arbeit ist lohnend, hat aber auch viel Stress."
      },
      {
        "japanese": "都会は便利な反面、家賃が高い。",
        "cloze": {
          "start": 6,
          "answer": "反面"
        },
        "romaji": "Tokai wa benri na hanmen, yachin ga takai.",
        "german": "Die Stadt ist praktisch, aber die Miete ist hoch."
      }
    ],
    "notes": "Ähnlich wie ～一方で, aber betont stärker den Gegensatz.",
    "related": [
      "n3-ippou-de"
    ]
  },
  {
    "id": "n3-sae-ba",
    "pattern": "～さえ～ば",
    "level": "N3",
    "category": "Satzstrukturen",
    "meaning": "Wenn nur, solange nur",
    "explanation": "さえ～ば: eine einzige Bedingung reicht aus.",
    "formation": "Nomen + さえ + Verb (ば-Form) / Verb (ます-Stamm) + さえすれば",
    "examples": [
      {
        "japanese": "お金さえあれば何でもできる。",
        "romaji": "Okane sae areba nandemo dekiru.",
        "german": "Wenn man nur Geld hat, kann man alles machen.",
        "cloze": {
          "start": 2,
          "answer": "さえあれば",
          "quiz": {
            "level": "N3",
            "japanese": "お金さえあれば何でもできる。",
            "german": "Wenn man nur Geld hat, kann man alles machen.",
            "start": 2,
            "answer": "さえあれば",
            "acceptedAnswers": [
              "さえあれば"
            ],
            "distractors": [
              {
                "text": "さえあるば",
                "reason": "Die Bedingungsform von ある lautet あれば."
              },
              {
                "text": "さえをあれば",
                "reason": "を steht nicht zwischen さえ und あれば."
              },
              {
                "text": "さえなければ",
                "reason": "Dies kehrt die notwendige Geldbedingung um."
              }
            ]
          }
        }
      },
      {
        "japanese": "薬を飲みさえすれば治る。",
        "romaji": "Kusuri o nomi sae sureba naoru.",
        "german": "Man muss nur die Medizin nehmen und wird gesund."
      }
    ],
    "notes": "Betont, dass nur DIESE EINE Bedingung nötig ist.",
    "related": [
      "n4-sae",
      "n4-ba"
    ]
  },
  {
    "id": "n3-koto-kara",
    "pattern": "～ことから",
    "level": "N3",
    "category": "Satzstrukturen",
    "meaning": "Aufgrund der Tatsache dass",
    "explanation": "ことから: gibt den Grund oder Ursprung einer Benennung/Schlussfolgerung an.",
    "formation": "Verb/Adj (Grundform) + ことから",
    "examples": [
      {
        "japanese": "形が星に似ていることからスターフルーツと呼ばれている。",
        "cloze": {
          "start": 8,
          "answer": "ことから",
          "quiz": {
            "level": "N3",
            "japanese": "形が星に似ていることからスターフルーツと呼ばれている。",
            "german": "Weil die Form einem Stern ähnelt, wird sie Sternfrucht genannt.",
            "start": 8,
            "answer": "ことから",
            "acceptedAnswers": [
              "ことから",
              "ので",
              "ため"
            ],
            "distractors": [
              {
                "text": "なことから",
                "reason": "Nach dem Verb wird kein な eingefügt."
              },
              {
                "text": "ことをから",
                "reason": "Dies ist kein kausaler Anschluss."
              },
              {
                "text": "ことからの",
                "reason": "の schließt hier kein folgendes Prädikat an."
              }
            ]
          }
        },
        "romaji": "Katachi ga hoshi ni niteiru koto kara sutā furūtsu to yobareteiru.",
        "german": "Weil die Form einem Stern ähnelt, wird sie Sternfrucht genannt."
      },
      {
        "japanese": "彼が犯人であることから逮捕された。",
        "cloze": {
          "start": 7,
          "answer": "ことから"
        },
        "romaji": "Kare ga hannin de aru koto kara taiho sareta.",
        "german": "Aufgrund der Tatsache, dass er der Täter ist, wurde er verhaftet."
      }
    ],
    "notes": "Oft für Erklärungen von Namen oder Ursprüngen.",
    "related": [
      "n4-tame-ni"
    ]
  },
  {
    "id": "n3-to-wa-kagiranai",
    "pattern": "～とは限らない",
    "level": "N3",
    "category": "Satzstrukturen",
    "meaning": "Es ist nicht unbedingt so dass",
    "explanation": "とは限らない: etwas gilt nicht in allen Fällen.",
    "formation": "Verb/Adj/Nomen + とは限らない",
    "examples": [
      {
        "japanese": "高いものがいいとは限らない。",
        "cloze": {
          "start": 7,
          "answer": "とは限らない",
          "quiz": {
            "level": "N3",
            "japanese": "高いものがいいとは限らない。",
            "german": "Teure Dinge sind nicht unbedingt gut.",
            "start": 7,
            "answer": "とは限らない",
            "acceptedAnswers": [
              "とは限らない"
            ],
            "distractors": [
              {
                "text": "とは限る",
                "reason": "Dies bejaht die Beschränkung statt sie zurückzuweisen."
              },
              {
                "text": "とは限るない",
                "reason": "Die Negativform lautet 限らない."
              },
              {
                "text": "をは限らない",
                "reason": "Die zitierte Behauptung wird mit と angeschlossen."
              }
            ]
          }
        },
        "romaji": "Takai mono ga ii to wa kagiranai.",
        "german": "Teure Dinge sind nicht unbedingt gut."
      },
      {
        "japanese": "努力すれば成功するとは限らない。",
        "cloze": {
          "start": 9,
          "answer": "とは限らない"
        },
        "romaji": "Doryoku sureba seikō suru to wa kagiranai.",
        "german": "Auch wenn man sich anstrengt, heißt das nicht, dass man Erfolg hat."
      }
    ],
    "notes": "Weist eine zu einfache Verallgemeinerung zurück.",
    "related": [
      "n3-wake-dewa-nai"
    ]
  },
  {
    "id": "n3-keigo-sonkei",
    "pattern": "尊敬語 (Respektsprache)",
    "level": "N3",
    "category": "Satzstrukturen",
    "meaning": "Höflichkeitsform für andere",
    "explanation": "尊敬語 (そんけいご): erhöht die Handlungen anderer Personen, um Respekt zu zeigen.",
    "formation": "お + Verb (ます-Stamm) + になる / 特別な形 (いらっしゃる, おっしゃる etc.)",
    "examples": [
      {
        "japanese": "先生はもうお帰りになりました。",
        "romaji": "Sensei wa mō okaeri ni narimashita.",
        "german": "Der Lehrer ist schon gegangen (respektvoll).",
        "cloze": {
          "start": 5,
          "answer": "お帰りになりました",
          "quiz": {
            "level": "N3",
            "japanese": "先生はもうお帰りになりました。",
            "german": "Der Lehrer ist schon gegangen (respektvoll).",
            "start": 5,
            "answer": "お帰りになりました",
            "acceptedAnswers": [
              "お帰りになりました",
              "帰られました"
            ],
            "distractors": [
              {
                "text": "お帰るになりました",
                "reason": "お～になる verlangt den Verbstamm."
              },
              {
                "text": "お帰りになりませんでした",
                "reason": "Dies verneint die Heimkehr."
              },
              {
                "text": "お帰りをなりました",
                "reason": "Die ehrende Wendung verwendet に."
              }
            ]
          }
        }
      },
      {
        "japanese": "社長がそうおっしゃいました。",
        "romaji": "Shachō ga sō osshaimashita.",
        "german": "Der Firmenchef hat es so gesagt (respektvoll)."
      }
    ],
    "notes": "Spezialformen: いる→いらっしゃる, 言う→おっしゃる, 食べる→召し上がる, する→なさる.",
    "related": [
      "n3-keigo-kenjou"
    ]
  },
  {
    "id": "n3-keigo-kenjou",
    "pattern": "謙譲語 (Bescheidenheitssprache)",
    "level": "N3",
    "category": "Satzstrukturen",
    "meaning": "Bescheidene Form für eigene Handlungen",
    "explanation": "謙譲語 (けんじょうご): erniedrigt die eigenen Handlungen, um den Gesprächspartner zu erhöhen.",
    "formation": "お + Verb (ます-Stamm) + する / 特別な形 (参る, 申す etc.)",
    "examples": [
      {
        "japanese": "私がご案内いたします。",
        "romaji": "Watashi ga go-annai itashimasu.",
        "german": "Ich werde Sie führen (bescheiden).",
        "cloze": {
          "start": 2,
          "answer": "ご案内いたします",
          "quiz": {
            "level": "N3",
            "japanese": "私がご案内いたします。",
            "german": "Ich werde Sie führen (bescheiden).",
            "start": 2,
            "answer": "ご案内いたします",
            "acceptedAnswers": [
              "ご案内いたします",
              "ご案内します"
            ],
            "distractors": [
              {
                "text": "ご案内いたしません",
                "reason": "Dies verneint das Führen."
              },
              {
                "text": "ご案内いたすます",
                "reason": "Die höfliche Form lautet いたします."
              },
              {
                "text": "ご案内なります",
                "reason": "Die bescheidene Handlung wird hier mit いたす angeschlossen."
              }
            ]
          }
        }
      },
      {
        "japanese": "明日お伺いしてもよろしいですか。",
        "romaji": "Ashita oukagai shitemo yoroshii desu ka.",
        "german": "Darf ich morgen bei Ihnen vorbeischauen (bescheiden)?"
      }
    ],
    "notes": "Spezialformen: 行く/来る→参る, 言う→申す, する→いたす, 見る→拝見する.",
    "related": [
      "n3-keigo-sonkei"
    ]
  },
  {
    "id": "n3-toshite-mo",
    "pattern": "～にしても～にしても",
    "level": "N3",
    "category": "Satzstrukturen",
    "meaning": "Ob ... oder ... (in jedem Fall)",
    "explanation": "にしても～にしても: egal welche Alternative, das Ergebnis ist gleich.",
    "formation": "A + にしても + B + にしても",
    "examples": [
      {
        "japanese": "行くにしても行かないにしても連絡してください。",
        "romaji": "Iku ni shitemo ikanai ni shitemo renraku shite kudasai.",
        "german": "Ob du gehst oder nicht, bitte melde dich.",
        "cloze": {
          "start": 2,
          "answer": "にしても",
          "quiz": {
            "level": "N3",
            "japanese": "行くにしても行かないにしても連絡してください。",
            "german": "Ob du gehst oder nicht, bitte melde dich.",
            "start": 2,
            "answer": "にしても",
            "acceptedAnswers": [
              "にしても",
              "としても"
            ],
            "distractors": [
              {
                "text": "をしても",
                "reason": "を bildet hier keine hypothetische Annahme."
              },
              {
                "text": "にするても",
                "reason": "する bildet die て-Form して."
              },
              {
                "text": "なにしても",
                "reason": "Nach dem Verb wird kein な eingefügt."
              }
            ]
          }
        }
      },
      {
        "japanese": "賛成にしても反対にしても理由を言ってください。",
        "romaji": "Sansei ni shitemo hantai ni shitemo riyū o itte kudasai.",
        "german": "Ob dafür oder dagegen, bitte nennen Sie den Grund."
      }
    ],
    "notes": "Ähnlich: ～ても～ても, ～にせよ～にせよ.",
    "related": [
      "temo"
    ]
  },
  {
    "id": "n3-koto-ni-natte-iru",
    "pattern": "～ことになっている (N3)",
    "level": "N3",
    "category": "Satzstrukturen",
    "meaning": "Es ist vorgesehen/geplant (erweitert)",
    "explanation": "ことになっている auf N3: erweiterte Verwendung für Pläne und gesellschaftliche Normen.",
    "formation": "Verb (辞書形) + ことになっている",
    "examples": [
      {
        "japanese": "来月から新しいプロジェクトが始まることになっている。",
        "romaji": "Raigetsu kara atarashii purojekuto ga hajimaru koto ni natte iru.",
        "german": "Ab nächstem Monat soll ein neues Projekt starten.",
        "cloze": {
          "start": 17,
          "answer": "ことになっている",
          "quiz": {
            "level": "N3",
            "japanese": "来月から新しいプロジェクトが始まることになっている。",
            "german": "Ab nächstem Monat soll ein neues Projekt starten.",
            "start": 17,
            "answer": "ことになっている",
            "acceptedAnswers": [
              "ことになっている"
            ],
            "distractors": [
              {
                "text": "ことをなっている",
                "reason": "Die Festlegungskonstruktion verwendet に."
              },
              {
                "text": "なことになっている",
                "reason": "Nach dem Verb wird kein な eingefügt."
              },
              {
                "text": "ことになっていない",
                "reason": "Dies verneint die bestehende Planung."
              }
            ]
          }
        }
      },
      {
        "japanese": "日本では靴を脱ぐことになっている。",
        "romaji": "Nihon de wa kutsu o nugu koto ni natte iru.",
        "german": "In Japan ist es Brauch, die Schuhe auszuziehen."
      }
    ],
    "notes": "Gesellschaftliche Norm oder feststehender Plan.",
    "related": [
      "n4-koto-ni-natteiru"
    ]
  },
  {
    "id": "n3-tewa-tewa",
    "pattern": "～ては～ては",
    "level": "N3",
    "category": "Satzstrukturen",
    "meaning": "Immer wieder abwechselnd",
    "explanation": "ては～ては: zwei Handlungen wiederholen sich abwechselnd.",
    "formation": "Verb (て) + は + Verb (て) + は",
    "examples": [
      {
        "japanese": "食べては寝て、食べては寝ての生活だ。",
        "romaji": "Tabete wa nete, tabete wa nete no seikatsu da.",
        "german": "Ein Leben nur aus Essen und Schlafen.",
        "cloze": {
          "start": 2,
          "answer": "ては",
          "quiz": {
            "level": "N3",
            "japanese": "食べては寝て、食べては寝ての生活だ。",
            "german": "Ein Leben nur aus Essen und Schlafen.",
            "start": 2,
            "answer": "ては",
            "acceptedAnswers": [
              "ては"
            ],
            "distractors": [
              {
                "text": "たは",
                "reason": "Die Wiederholungsfolge braucht die て-Form."
              },
              {
                "text": "ますは",
                "reason": "ます verbindet die wiederkehrenden Handlungen hier nicht."
              },
              {
                "text": "るては",
                "reason": "食べるて ist keine て-Form."
              }
            ]
          }
        }
      },
      {
        "japanese": "書いては消し、書いては消しの繰り返しだ。",
        "romaji": "Kaite wa keshi, kaite wa keshi no kurikaeshi da.",
        "german": "Immer wieder schreiben und löschen."
      }
    ],
    "notes": "Drückt ermüdende Wiederholung aus.",
    "related": [
      "tari-tari"
    ]
  },
  {
    "id": "n3-you-ni-to",
    "pattern": "～ように言う",
    "level": "N3",
    "category": "Satzstrukturen",
    "meaning": "Sagen/bitten dass jemand etwas tut",
    "explanation": "ように言う: indirekte Aufforderung oder Bitte weitergeben.",
    "formation": "Verb (辞書形/ない形) + ように言う/頼む/注意する",
    "examples": [
      {
        "japanese": "医者に運動するように言われた。",
        "romaji": "Isha ni undō suru yō ni iwareta.",
        "german": "Der Arzt sagte mir, ich solle Sport machen.",
        "cloze": {
          "start": 7,
          "answer": "ように言われた",
          "quiz": {
            "level": "N3",
            "japanese": "医者に運動するように言われた。",
            "german": "Der Arzt sagte mir, ich solle Sport machen.",
            "start": 7,
            "answer": "ように言われた",
            "acceptedAnswers": [
              "ように言われた"
            ],
            "distractors": [
              {
                "text": "ようを言われた",
                "reason": "Die wiedergegebene Aufforderung verlangt に."
              },
              {
                "text": "なように言われた",
                "reason": "Nach dem Verb wird kein な eingefügt."
              },
              {
                "text": "ように言われなかった",
                "reason": "Dies verneint die ärztliche Aufforderung."
              }
            ]
          }
        }
      },
      {
        "japanese": "子供に早く寝るように言った。",
        "romaji": "Kodomo ni hayaku neru yō ni itta.",
        "german": "Ich sagte dem Kind, es solle früh schlafen."
      }
    ],
    "notes": "Indirekte Befehlswiedergabe. Auch mit 頼む, 注意する usw.",
    "related": [
      "n4-you-ni-suru"
    ]
  },
  {
    "id": "n3-koto-ni-suru-2",
    "pattern": "～ことにしている (N3)",
    "level": "N3",
    "category": "Satzstrukturen",
    "meaning": "Sich zur Regel gemacht haben",
    "explanation": "ことにしている: eine persönliche Regel oder Gewohnheit, die man bewusst pflegt.",
    "formation": "Verb (辞書形/ない形) + ことにしている",
    "examples": [
      {
        "japanese": "毎朝ジョギングすることにしている。",
        "romaji": "Maiasa jogingu suru koto ni shiteiru.",
        "german": "Ich habe es mir zur Regel gemacht, jeden Morgen zu joggen.",
        "cloze": {
          "start": 9,
          "answer": "ことにしている",
          "quiz": {
            "level": "N3",
            "japanese": "毎朝ジョギングすることにしている。",
            "german": "Ich habe es mir zur Regel gemacht, jeden Morgen zu joggen.",
            "start": 9,
            "answer": "ことにしている",
            "acceptedAnswers": [
              "ことにしている"
            ],
            "distractors": [
              {
                "text": "ことをしている",
                "reason": "Die persönliche Regel verwendet に."
              },
              {
                "text": "なことにしている",
                "reason": "Nach dem Verb wird kein な eingefügt."
              },
              {
                "text": "ことにしていない",
                "reason": "Dies verneint die persönliche Regel."
              }
            ]
          }
        }
      },
      {
        "japanese": "夜九時以降はスマホを見ないことにしている。",
        "romaji": "Yoru kuji ikō wa sumaho o minai koto ni shiteiru.",
        "german": "Ich habe mir vorgenommen, nach 21 Uhr nicht mehr aufs Handy zu schauen."
      }
    ],
    "notes": "Betont bewusste persönliche Entscheidung als Gewohnheit.",
    "related": [
      "n4-koto-ni-suru",
      "n4-you-ni-shiteiru"
    ]
  },
  {
    "id": "n3-te-kara-de-nai-to",
    "pattern": "～てからでないと",
    "level": "N3",
    "category": "Satzstrukturen",
    "meaning": "Wenn man nicht erst ... dann nicht",
    "explanation": "てからでないと: eine Handlung muss zuerst abgeschlossen werden.",
    "formation": "Verb (て-Form) + からでないと/からでなければ",
    "examples": [
      {
        "japanese": "調べてからでないと答えられない。",
        "cloze": {
          "start": 2,
          "answer": "てからでないと",
          "quiz": {
            "level": "N3",
            "japanese": "調べてからでないと答えられない。",
            "german": "Ohne es vorher zu prüfen, kann ich nicht antworten.",
            "start": 2,
            "answer": "てからでないと",
            "acceptedAnswers": [
              "てからでないと"
            ],
            "distractors": [
              {
                "text": "たからでないと",
                "reason": "Dies ist kein Anschluss für vorheriges Prüfen."
              },
              {
                "text": "てからではあると",
                "reason": "Dies ist keine notwendige Vorbedingung."
              },
              {
                "text": "ますからでないと",
                "reason": "Die zeitliche Konstruktion verlangt die て-Form."
              }
            ]
          }
        },
        "romaji": "Shirabete kara de nai to kotaerarenai.",
        "german": "Ohne es vorher zu prüfen, kann ich nicht antworten."
      },
      {
        "japanese": "食べてみてからでないと分からない。",
        "cloze": {
          "start": 4,
          "answer": "てからでないと"
        },
        "romaji": "Tabete mite kara de nai to wakaranai.",
        "german": "Ohne es probiert zu haben, kann ich es nicht beurteilen."
      }
    ],
    "notes": "Bedingung: erst X, dann ist Y möglich.",
    "related": [
      "n4-ato-de"
    ]
  },
  {
    "id": "n3-nai-koto-ni-wa",
    "pattern": "～ないことには",
    "level": "N3",
    "category": "Satzstrukturen",
    "meaning": "Wenn man nicht ... dann nicht",
    "explanation": "ないことには: ohne diese Voraussetzung ist das Ergebnis nicht möglich.",
    "formation": "Verb (ない形) + ことには",
    "examples": [
      {
        "japanese": "やってみないことには分からない。",
        "cloze": {
          "start": 4,
          "answer": "ないことには",
          "quiz": {
            "level": "N3",
            "japanese": "やってみないことには分からない。",
            "german": "Ohne es zu versuchen, weiß man es nicht.",
            "start": 4,
            "answer": "ないことには",
            "acceptedAnswers": [
              "ないことには"
            ],
            "distractors": [
              {
                "text": "ないことをは",
                "reason": "Die notwendige Voraussetzung verwendet には."
              },
              {
                "text": "ないことなは",
                "reason": "Dies ist kein Anschluss für die Voraussetzung."
              },
              {
                "text": "ないことにはだ",
                "reason": "だ gehört nicht hinter die voraussetzende Wendung."
              }
            ]
          }
        },
        "romaji": "Yatte minai koto ni wa wakaranai.",
        "german": "Ohne es zu versuchen, weiß man es nicht."
      },
      {
        "japanese": "本人に聞かないことには確認できない。",
        "cloze": {
          "start": 5,
          "answer": "ないことには"
        },
        "romaji": "Honnin ni kikanai koto ni wa kakunin dekinai.",
        "german": "Ohne die Person selbst zu fragen, kann man es nicht bestätigen."
      }
    ],
    "notes": "Betont die Notwendigkeit einer Voraussetzung.",
    "related": [
      "n3-te-kara-de-nai-to"
    ]
  },
  {
    "id": "n3-kara-koso",
    "pattern": "～からこそ",
    "level": "N3",
    "category": "Satzstrukturen",
    "meaning": "Gerade weil, eben deshalb",
    "explanation": "からこそ: betont den Grund besonders stark. 'Gerade WEIL...'.",
    "formation": "Verb/Adj/Nomen + だからこそ",
    "examples": [
      {
        "japanese": "好きだからこそ厳しくする。",
        "cloze": {
          "start": 3,
          "answer": "からこそ",
          "quiz": {
            "level": "N3",
            "japanese": "好きだからこそ厳しくする。",
            "german": "Gerade weil ich dich mag, bin ich streng.",
            "start": 3,
            "answer": "からこそ",
            "acceptedAnswers": [
              "からこそ"
            ],
            "distractors": [
              {
                "text": "からをこそ",
                "reason": "Die kausale Hervorhebung enthält kein を."
              },
              {
                "text": "からこその",
                "reason": "の braucht ein Nomen, nicht 厳しくする."
              },
              {
                "text": "からこそだ",
                "reason": "だ schließt hier keinen Folgesatz an."
              }
            ]
          }
        },
        "romaji": "Suki da kara koso kibishiku suru.",
        "german": "Gerade weil ich dich mag, bin ich streng."
      },
      {
        "japanese": "失敗したからこそ学べたことがある。",
        "cloze": {
          "start": 4,
          "answer": "からこそ"
        },
        "romaji": "Shippai shita kara koso manabeta koto ga aru.",
        "german": "Gerade weil ich scheiterte, konnte ich daraus lernen."
      }
    ],
    "notes": "Betont den Grund als besonders wichtig und positiv.",
    "related": [
      "n4-koso",
      "kara"
    ]
  },
  {
    "id": "n3-te-koso",
    "pattern": "～てこそ",
    "level": "N3",
    "category": "Satzstrukturen",
    "meaning": "Erst wenn man ... (dann wirklich)",
    "explanation": "てこそ: erst durch diese Handlung wird etwas wahrhaft möglich/wertvoll.",
    "formation": "Verb (て-Form) + こそ",
    "examples": [
      {
        "japanese": "練習してこそ上手になる。",
        "cloze": {
          "start": 3,
          "answer": "てこそ",
          "quiz": {
            "level": "N3",
            "japanese": "練習してこそ上手になる。",
            "german": "Erst durch Üben wird man wirklich gut.",
            "start": 3,
            "answer": "てこそ",
            "acceptedAnswers": [
              "てこそ"
            ],
            "distractors": [
              {
                "text": "たこそ",
                "reason": "Die notwendige Erfahrung wird mit der て-Form angeschlossen."
              },
              {
                "text": "ますこそ",
                "reason": "ます ist hier kein Anschluss für erst durch."
              },
              {
                "text": "るてこそ",
                "reason": "するて ist keine て-Form."
              }
            ]
          }
        },
        "romaji": "Renshū shite koso jōzu ni naru.",
        "german": "Erst durch Üben wird man wirklich gut."
      },
      {
        "japanese": "自分でやってこそ意味がある。",
        "cloze": {
          "start": 5,
          "answer": "てこそ"
        },
        "romaji": "Jibun de yatte koso imi ga aru.",
        "german": "Erst wenn man es selbst tut, hat es Bedeutung."
      }
    ],
    "notes": "Betont, dass die Handlung unverzichtbare Voraussetzung ist.",
    "related": [
      "n4-koso",
      "n3-kara-koso"
    ]
  },
  {
    "id": "n3-kkonai",
    "pattern": "～っこない",
    "level": "N3",
    "category": "Satzstrukturen",
    "meaning": "Keine Chance dass, absolut unmöglich",
    "explanation": "っこない: umgangssprachlich, drückt absolute Unmöglichkeit aus.",
    "formation": "Verb (ます-Stamm) + っこない",
    "examples": [
      {
        "japanese": "そんな難しい試験、受かりっこない。",
        "cloze": {
          "start": 12,
          "answer": "っこない",
          "quiz": {
            "level": "N3",
            "japanese": "そんな難しい試験、受かりっこない。",
            "german": "So eine schwere Prüfung, da bestehe ich niemals.",
            "start": 12,
            "answer": "っこない",
            "acceptedAnswers": [
              "っこない"
            ],
            "distractors": [
              {
                "text": "っこある",
                "reason": "Die feste emphatische Verneinung lautet っこない."
              },
              {
                "text": "っこないだ",
                "reason": "Nach ない steht kein だ."
              },
              {
                "text": "るっこない",
                "reason": "っこない folgt dem Stamm 受かり."
              }
            ]
          }
        },
        "romaji": "Sonna muzukashii shiken, ukarikkonai.",
        "german": "So eine schwere Prüfung, da bestehe ich niemals."
      },
      {
        "japanese": "あの人に勝てっこない。",
        "cloze": {
          "start": 6,
          "answer": "っこない"
        },
        "romaji": "Ano hito ni katekkonai.",
        "german": "Gegen diese Person kann ich unmöglich gewinnen."
      }
    ],
    "notes": "Sehr umgangssprachlich. Stärker als ～はずがない.",
    "related": [
      "n3-you-ga-nai",
      "n4-hazu-ga-nai"
    ]
  },
  {
    "id": "n3-ni-kawatte",
    "pattern": "～にかわって / ～にかわり",
    "level": "N3",
    "category": "Partikel",
    "meaning": "Anstelle von, im Auftrag von",
    "explanation": "にかわって: jemand übernimmt die Rolle oder Position eines anderen.",
    "formation": "Nomen + にかわって/にかわり",
    "examples": [
      {
        "japanese": "社長にかわって副社長が挨拶した。",
        "cloze": {
          "start": 2,
          "answer": "にかわって",
          "quiz": {
            "level": "N3",
            "japanese": "社長にかわって副社長が挨拶した。",
            "german": "Anstelle des Firmenchefs sprach der Vizechef.",
            "start": 2,
            "answer": "にかわって",
            "acceptedAnswers": [
              "にかわって",
              "のかわりに",
              "に代わって"
            ],
            "distractors": [
              {
                "text": "に加えて",
                "reason": "Dies fügt den Vizechef hinzu statt den Chef zu vertreten."
              },
              {
                "text": "をかわって",
                "reason": "Die Vertretungswendung verwendet に."
              },
              {
                "text": "にかわるて",
                "reason": "かわる bildet die て-Form かわって."
              }
            ]
          }
        },
        "romaji": "Shachō ni kawatte fukushachō ga aisatsu shita.",
        "german": "Anstelle des Firmenchefs sprach der Vizechef."
      },
      {
        "japanese": "手紙にかわってメールが普及した。",
        "cloze": {
          "start": 2,
          "answer": "にかわって"
        },
        "romaji": "Tegami ni kawatte mēru ga fukyū shita.",
        "german": "Anstelle von Briefen haben sich E-Mails verbreitet."
      }
    ],
    "notes": "Auch: ～のかわりに (informeller).",
    "related": [
      "n3-kawari-ni"
    ]
  },
  {
    "id": "n3-kawari-ni",
    "pattern": "～かわりに",
    "level": "N3",
    "category": "Satzstrukturen",
    "meaning": "Anstatt / dafür dass",
    "explanation": "かわりに: 1) anstatt etwas zu tun, 2) als Gegenleistung.",
    "formation": "Verb (辞書形) + かわりに / Nomen + のかわりに",
    "examples": [
      {
        "japanese": "車を買うかわりに自転車にした。",
        "cloze": {
          "start": 4,
          "answer": "かわりに",
          "quiz": {
            "level": "N3",
            "japanese": "車を買うかわりに自転車にした。",
            "german": "Anstatt ein Auto zu kaufen, nahm ich ein Fahrrad.",
            "start": 4,
            "answer": "かわりに",
            "acceptedAnswers": [
              "かわりに"
            ],
            "distractors": [
              {
                "text": "なかわりに",
                "reason": "Nach dem Verb wird kein な eingefügt."
              },
              {
                "text": "かわりを",
                "reason": "を bildet hier keinen Alternativanschluss."
              },
              {
                "text": "かわりの",
                "reason": "の braucht ein Bezugsnomen."
              }
            ]
          }
        },
        "romaji": "Kuruma o kau kawari ni jitensha ni shita.",
        "german": "Anstatt ein Auto zu kaufen, nahm ich ein Fahrrad."
      },
      {
        "japanese": "手伝ってあげるかわりに、ご飯をおごって。",
        "cloze": {
          "start": 7,
          "answer": "かわりに"
        },
        "romaji": "Tetsudatte ageru kawari ni, gohan o ogotte.",
        "german": "Dafür dass ich dir helfe, lad mich zum Essen ein."
      }
    ],
    "notes": "Austausch/Gegenleistung oder Alternative.",
    "related": [
      "n3-ni-kawatte"
    ]
  },
  {
    "id": "n3-o-kikkake-ni",
    "pattern": "～をきっかけに",
    "level": "N3",
    "category": "Partikel",
    "meaning": "Ausgelöst durch, als Anlass",
    "explanation": "をきっかけに: ein Ereignis wird zum Auslöser für eine Veränderung.",
    "formation": "Nomen/Verb (た形) + のをきっかけに",
    "examples": [
      {
        "japanese": "留学をきっかけに日本語を勉強し始めた。",
        "cloze": {
          "start": 2,
          "answer": "をきっかけに",
          "quiz": {
            "level": "N3",
            "japanese": "留学をきっかけに日本語を勉強し始めた。",
            "german": "Ausgelöst durch den Auslandsaufenthalt begann ich Japanisch zu lernen.",
            "start": 2,
            "answer": "をきっかけに",
            "acceptedAnswers": [
              "をきっかけに"
            ],
            "distractors": [
              {
                "text": "をきっかけな",
                "reason": "Die adverbiale Auslöserangabe verlangt に."
              },
              {
                "text": "がきっかけを",
                "reason": "Dies ist kein adverbialer Anschluss."
              },
              {
                "text": "をきっかけの",
                "reason": "Die attributive Form wäre をきっかけにした, nicht をきっかけの."
              }
            ]
          }
        },
        "romaji": "Ryūgaku o kikkake ni nihongo o benkyō shi hajimeta.",
        "german": "Ausgelöst durch den Auslandsaufenthalt begann ich Japanisch zu lernen."
      },
      {
        "japanese": "病気をきっかけに生活を見直した。",
        "cloze": {
          "start": 2,
          "answer": "をきっかけに"
        },
        "romaji": "Byōki o kikkake ni seikatsu o minaoshita.",
        "german": "Die Krankheit war der Anlass, meinen Lebensstil zu überdenken."
      }
    ],
    "notes": "Der Anlass ist meist ein einmaliges, konkretes Ereignis.",
    "related": []
  },
  {
    "id": "n3-o-towazu",
    "pattern": "～を問わず",
    "level": "N3",
    "category": "Partikel",
    "meaning": "Ungeachtet, unabhängig von",
    "explanation": "を問わず: es spielt keine Rolle, welcher Fall zutrifft.",
    "formation": "Nomen + を問わず",
    "examples": [
      {
        "japanese": "年齢を問わず参加できます。",
        "cloze": {
          "start": 2,
          "answer": "を問わず",
          "quiz": {
            "level": "N3",
            "japanese": "年齢を問わず参加できます。",
            "german": "Man kann unabhängig vom Alter teilnehmen.",
            "start": 2,
            "answer": "を問わず",
            "acceptedAnswers": [
              "を問わず"
            ],
            "distractors": [
              {
                "text": "を問うず",
                "reason": "問う bildet die Negativform 問わず."
              },
              {
                "text": "に問わず",
                "reason": "Die feste Wendung verwendet を."
              },
              {
                "text": "を問わずだ",
                "reason": "だ schließt hier keinen Folgesatz an."
              }
            ]
          }
        },
        "romaji": "Nenrei o towazu sanka dekimasu.",
        "german": "Man kann unabhängig vom Alter teilnehmen."
      },
      {
        "japanese": "経験の有無を問わず応募できる。",
        "cloze": {
          "start": 5,
          "answer": "を問わず"
        },
        "romaji": "Keiken no umu o towazu ōbo dekiru.",
        "german": "Man kann sich unabhängig von Erfahrung bewerben."
      }
    ],
    "notes": "Formell. Oft: 国籍を問わず, 男女を問わず.",
    "related": [
      "n3-ni-kakawarazu"
    ]
  },
  {
    "id": "n3-ni-kakawarazu",
    "pattern": "～にかかわらず",
    "level": "N3",
    "category": "Partikel",
    "meaning": "Unabhängig von, egal ob",
    "explanation": "にかかわらず: das Ergebnis ändert sich nicht, egal welche Bedingung vorliegt.",
    "formation": "Nomen + にかかわらず / Verb (辞書形/ない形) + にかかわらず",
    "examples": [
      {
        "japanese": "天気にかかわらず試合は行われる。",
        "cloze": {
          "start": 2,
          "answer": "にかかわらず",
          "quiz": {
            "level": "N3",
            "japanese": "天気にかかわらず試合は行われる。",
            "german": "Unabhängig vom Wetter findet das Spiel statt.",
            "start": 2,
            "answer": "にかかわらず",
            "acceptedAnswers": [
              "にかかわらず"
            ],
            "distractors": [
              {
                "text": "にかかわるず",
                "reason": "Die Negativform lautet かかわらず."
              },
              {
                "text": "をかかわらず",
                "reason": "Die feste Wendung verwendet に."
              },
              {
                "text": "にかかわらずの",
                "reason": "の schließt hier kein Verb an."
              }
            ]
          }
        },
        "romaji": "Tenki ni kakawarazu shiai wa okonawareru.",
        "german": "Unabhängig vom Wetter findet das Spiel statt."
      },
      {
        "japanese": "賛成するしないにかかわらず出席してください。",
        "cloze": {
          "start": 7,
          "answer": "にかかわらず"
        },
        "romaji": "Sansei suru shinai ni kakawarazu shusseki shite kudasai.",
        "german": "Kommen Sie, egal ob Sie zustimmen oder nicht."
      }
    ],
    "notes": "Formeller als ～に関係なく. Nicht verwechseln mit ～にもかかわらず (trotz).",
    "related": [
      "n3-o-towazu",
      "n3-ni-mo-kakawarazu"
    ]
  },
  {
    "id": "n3-ni-sotte",
    "pattern": "～に沿って",
    "level": "N3",
    "category": "Partikel",
    "meaning": "Entlang, gemäß, entsprechend",
    "explanation": "に沿って: einer Linie, einem Plan oder einer Richtlinie folgen.",
    "formation": "Nomen + に沿って / に沿った + Nomen",
    "examples": [
      {
        "japanese": "川に沿って歩いた。",
        "cloze": {
          "start": 1,
          "answer": "に沿って",
          "quiz": {
            "level": "N3",
            "japanese": "川に沿って歩いた。",
            "german": "Ich ging am Fluss entlang.",
            "start": 1,
            "answer": "に沿って",
            "acceptedAnswers": [
              "に沿って"
            ],
            "distractors": [
              {
                "text": "から離れて",
                "reason": "Dies bedeutet vom Fluss weg statt am Fluss entlang."
              },
              {
                "text": "に沿うて",
                "reason": "Die standardsprachliche て-Form lautet 沿って."
              },
              {
                "text": "を沿って",
                "reason": "沿う wird hier mit に angeschlossen."
              }
            ]
          }
        },
        "romaji": "Kawa ni sotte aruita.",
        "german": "Ich ging am Fluss entlang."
      },
      {
        "japanese": "計画に沿って進めてください。",
        "cloze": {
          "start": 2,
          "answer": "に沿って"
        },
        "romaji": "Keikaku ni sotte susumete kudasai.",
        "german": "Bitte gehen Sie gemäß dem Plan vor."
      }
    ],
    "notes": "Konkret (Fluss) und abstrakt (Plan) möglich.",
    "related": [
      "n3-ni-shitagatte"
    ]
  },
  {
    "id": "n3-gatai",
    "pattern": "～がたい",
    "level": "N3",
    "category": "Verben",
    "meaning": "Schwer zu (emotional/moralisch)",
    "explanation": "がたい: etwas ist emotional oder moralisch schwer zu tun. Formeller als ～にくい.",
    "formation": "Verb (ます-Stamm) + がたい",
    "examples": [
      {
        "japanese": "彼の行動は理解しがたい。",
        "cloze": {
          "start": 8,
          "answer": "がたい",
          "quiz": {
            "level": "N3",
            "japanese": "彼の行動は理解しがたい。",
            "german": "Sein Verhalten ist schwer zu verstehen.",
            "start": 8,
            "answer": "がたい",
            "acceptedAnswers": [
              "がたい",
              "づらい",
              "にくい"
            ],
            "distractors": [
              {
                "text": "がたいだ",
                "reason": "Ein い-Adjektiv erhält kein だ."
              },
              {
                "text": "がたくます",
                "reason": "Ein い-Adjektiv nimmt kein ます."
              },
              {
                "text": "るがたい",
                "reason": "がたい schließt an den Stamm し an."
              }
            ]
          }
        },
        "romaji": "Kare no kōdō wa rikai shigatai.",
        "german": "Sein Verhalten ist schwer zu verstehen."
      },
      {
        "japanese": "忘れがたい思い出だ。",
        "cloze": {
          "start": 2,
          "answer": "がたい"
        },
        "romaji": "Wasuregatai omoide da.",
        "german": "Eine unvergessliche Erinnerung."
      }
    ],
    "notes": "Formeller als ～にくい und ～づらい. 信じがたい (kaum zu glauben).",
    "related": [
      "n4-nikui",
      "n3-zurai"
    ]
  },
  {
    "id": "n3-ta-tokoro-de",
    "pattern": "～たところで",
    "level": "N3",
    "category": "Satzstrukturen",
    "meaning": "Selbst wenn man ... tut (nutzlos)",
    "explanation": "たところで: selbst wenn man etwas tut, ändert sich nichts / ist es sinnlos.",
    "formation": "Verb (た形) + ところで",
    "examples": [
      {
        "japanese": "今更謝ったところで許してもらえない。",
        "cloze": {
          "start": 4,
          "answer": "たところで",
          "quiz": {
            "level": "N3",
            "japanese": "今更謝ったところで許してもらえない。",
            "german": "Selbst wenn ich mich jetzt entschuldige, wird man mir nicht verzeihen.",
            "start": 4,
            "answer": "たところで",
            "acceptedAnswers": [
              "たところで"
            ],
            "distractors": [
              {
                "text": "るところで",
                "reason": "謝っる ist keine Verbform."
              },
              {
                "text": "たところをで",
                "reason": "を steht nicht vor der konzessiven Endung で."
              },
              {
                "text": "ますところで",
                "reason": "謝っます ist keine Verbform."
              }
            ]
          }
        },
        "romaji": "Imasara ayamatta tokoro de yurushite moraenai.",
        "german": "Selbst wenn ich mich jetzt entschuldige, wird man mir nicht verzeihen."
      },
      {
        "japanese": "急いだところで間に合わない。",
        "romaji": "Isoida tokoro de maniawanai.",
        "german": "Selbst wenn ich mich beeile, schaffe ich es nicht."
      }
    ],
    "notes": "Immer negatives/resigniertes Ergebnis.",
    "related": [
      "temo",
      "n3-ta-tokoro"
    ]
  },
  {
    "id": "n3-oki-ni",
    "pattern": "～おきに",
    "level": "N3",
    "category": "Satzstrukturen",
    "meaning": "Alle ... (Intervall)",
    "explanation": "おきに: drückt regelmäßige Intervalle aus.",
    "formation": "Zahl + Zeiteinheit + おきに",
    "examples": [
      {
        "japanese": "二時間おきに薬を飲んでください。",
        "cloze": {
          "start": 3,
          "answer": "おきに",
          "quiz": {
            "level": "N3",
            "japanese": "二時間おきに薬を飲んでください。",
            "german": "Nehmen Sie alle zwei Stunden die Medizin.",
            "start": 3,
            "answer": "おきに",
            "acceptedAnswers": [
              "おきに",
              "ごとに"
            ],
            "distractors": [
              {
                "text": "おきな",
                "reason": "Die Intervallangabe verlangt に."
              },
              {
                "text": "おきを",
                "reason": "を bildet hier keine Intervallangabe."
              },
              {
                "text": "前に",
                "reason": "Dies bedeutet vor zwei Stunden statt alle zwei Stunden."
              }
            ]
          }
        },
        "romaji": "Nijikan oki ni kusuri o nonde kudasai.",
        "german": "Nehmen Sie alle zwei Stunden die Medizin."
      },
      {
        "japanese": "一日おきにジョギングしている。",
        "cloze": {
          "start": 2,
          "answer": "おきに"
        },
        "romaji": "Ichinichi oki ni jogingu shiteiru.",
        "german": "Ich jogge jeden zweiten Tag."
      }
    ],
    "notes": "一日おきに = jeden zweiten Tag. 一つおきに = jedes zweite.",
    "related": [
      "n4-zutsu"
    ]
  },
  {
    "id": "n3-to-iu-mono-da",
    "pattern": "～というものだ",
    "level": "N3",
    "category": "Satzstrukturen",
    "meaning": "Das ist (die wahre Natur von)",
    "explanation": "というものだ: betont die wahre Natur oder das Wesen einer Sache.",
    "formation": "Nomen/Satz + というものだ",
    "examples": [
      {
        "japanese": "それが本当の友情というものだ。",
        "cloze": {
          "start": 8,
          "answer": "というものだ",
          "quiz": {
            "level": "N3",
            "japanese": "それが本当の友情というものだ。",
            "german": "Das ist wahre Freundschaft.",
            "start": 8,
            "answer": "というものだ",
            "acceptedAnswers": [
              "というものだ"
            ],
            "distractors": [
              {
                "text": "をいうものだ",
                "reason": "Der definierende Ausdruck verwendet と."
              },
              {
                "text": "というものをだ",
                "reason": "を steht nicht vor dieser Kopula."
              },
              {
                "text": "というものな",
                "reason": "Dies ist hier kein Satzabschluss."
              }
            ]
          }
        },
        "romaji": "Sore ga hontō no yūjō to iu mono da.",
        "german": "Das ist wahre Freundschaft."
      },
      {
        "japanese": "人生とはそういうものだ。",
        "romaji": "Jinsei to wa sō iu mono da.",
        "german": "So ist das Leben eben."
      }
    ],
    "notes": "Philosophisch/belehrend. というものではない = so einfach ist es nicht.",
    "related": [
      "n4-toiu"
    ]
  },
  {
    "id": "n3-ba-ii-noni",
    "pattern": "～ばいいのに",
    "level": "N3",
    "category": "Satzstrukturen",
    "meaning": "Ich wünschte, wenn doch nur",
    "explanation": "ばいいのに: drückt einen unerfüllten Wunsch oder Bedauern aus.",
    "formation": "Verb (ば-Form) + いいのに",
    "examples": [
      {
        "japanese": "もっと早く言えばいいのに。",
        "cloze": {
          "start": 7,
          "answer": "ばいいのに",
          "quiz": {
            "level": "N3",
            "japanese": "もっと早く言えばいいのに。",
            "german": "Wenn er es doch nur früher gesagt hätte.",
            "start": 7,
            "answer": "ばいいのに",
            "acceptedAnswers": [
              "ばいいのに",
              "ばよかったのに",
              "たらいいのに"
            ],
            "distractors": [
              {
                "text": "ばいいますのに",
                "reason": "Das Adjektiv いい erhält kein angehängtes ます."
              },
              {
                "text": "ばいいなに",
                "reason": "Die feste Wunschwendung lautet のに."
              },
              {
                "text": "ばいかったのに",
                "reason": "いい bildet Vergangenheit als よかった."
              }
            ]
          }
        },
        "romaji": "Motto hayaku ieba ii noni.",
        "german": "Wenn er es doch nur früher gesagt hätte."
      },
      {
        "japanese": "毎日晴れればいいのに。",
        "cloze": {
          "start": 5,
          "answer": "ばいいのに"
        },
        "romaji": "Mainichi harereba ii noni.",
        "german": "Wenn es doch nur jeden Tag sonnig wäre."
      }
    ],
    "notes": "Eigener Wunsch oder Vorwurf an andere.",
    "related": [
      "n4-ba-yokatta",
      "n4-ba"
    ]
  },
  {
    "id": "n3-o-komete",
    "pattern": "～を込めて",
    "level": "N3",
    "category": "Partikel",
    "meaning": "Mit (Gefühl/Mühe) erfüllt",
    "explanation": "を込めて: etwas wird mit einem bestimmten Gefühl oder Einsatz getan.",
    "formation": "Nomen + を込めて",
    "examples": [
      {
        "japanese": "心を込めて作りました。",
        "cloze": {
          "start": 1,
          "answer": "を込めて",
          "quiz": {
            "level": "N3",
            "japanese": "心を込めて作りました。",
            "german": "Ich habe es mit ganzem Herzen gemacht.",
            "start": 1,
            "answer": "を込めて",
            "acceptedAnswers": [
              "を込めて"
            ],
            "distractors": [
              {
                "text": "を込めるて",
                "reason": "込める bildet die て-Form 込めて."
              },
              {
                "text": "が込めて",
                "reason": "Das eingebrachte Gefühl wird mit を markiert."
              },
              {
                "text": "を込めずに",
                "reason": "Dies bedeutet ohne Herzblut, entgegen der Übersetzung."
              }
            ]
          }
        },
        "romaji": "Kokoro o komete tsukurimashita.",
        "german": "Ich habe es mit ganzem Herzen gemacht."
      },
      {
        "japanese": "感謝の気持ちを込めてプレゼントを贈った。",
        "cloze": {
          "start": 6,
          "answer": "を込めて"
        },
        "romaji": "Kansha no kimochi o komete purezento o okutta.",
        "german": "Ich schenkte es mit einem Gefühl der Dankbarkeit."
      }
    ],
    "notes": "心を込めて (von Herzen), 願いを込めて (mit einem Wunsch).",
    "related": []
  },
  {
    "id": "n3-ayamaru",
    "pattern": "謝る / ～てすみません",
    "level": "N3",
    "category": "Verben",
    "meaning": "Sich entschuldigen",
    "explanation": "謝る (あやまる): sich entschuldigen. Im Japanischen gibt es verschiedene Entschuldigungsformen je nach Situation und Höflichkeitsstufe.",
    "formation": "謝る / ～てすみません / ～て申し訳ありません / ～てごめんなさい",
    "examples": [
      {
        "japanese": "遅れたことを謝った。",
        "romaji": "Okureta koto o ayamatta.",
        "german": "Ich entschuldigte mich für die Verspätung."
      },
      {
        "japanese": "ご迷惑をおかけして申し訳ありません。",
        "romaji": "Gomeiwaku o okake shite mōshiwake arimasen.",
        "german": "Ich entschuldige mich für die Unannehmlichkeiten."
      },
      {
        "japanese": "遅くなってすみません。",
        "cloze": {
          "start": 4,
          "answer": "てすみません",
          "quiz": {
            "level": "N3",
            "japanese": "遅くなってすみません。",
            "german": "Entschuldigung, dass es so spät geworden ist.",
            "start": 4,
            "answer": "てすみません",
            "acceptedAnswers": [
              "てすみません"
            ],
            "distractors": [
              {
                "text": "たすみません",
                "reason": "Die Entschuldigung für einen Umstand braucht die て-Verbindung."
              },
              {
                "text": "ますすみません",
                "reason": "Die ます-Form bildet hier keinen Anschluss."
              },
              {
                "text": "てすみます",
                "reason": "Dies ist keine Entschuldigungsform."
              }
            ]
          }
        },
        "romaji": "Osoku natte sumimasen.",
        "german": "Entschuldigung, dass es so spät geworden ist."
      }
    ],
    "notes": "Höflichkeit: ごめん(なさい) < すみません < 申し訳ありません/ございません. 謝る ist das Verb 'sich entschuldigen'.",
    "related": []
  },
  {
    "id": "n3-ni-totte-no",
    "pattern": "～にとっての",
    "level": "N3",
    "category": "Partikel",
    "meaning": "Für ... (attributiv)",
    "explanation": "にとっての: attributive Form von にとって, vor Nomen verwendet.",
    "formation": "Nomen + にとっての + Nomen",
    "examples": [
      {
        "japanese": "私にとっての幸せは家族と過ごすことだ。",
        "cloze": {
          "start": 1,
          "answer": "にとっての",
          "quiz": {
            "level": "N3",
            "japanese": "私にとっての幸せは家族と過ごすことだ。",
            "german": "Für mich ist Glück, Zeit mit der Familie zu verbringen.",
            "start": 1,
            "answer": "にとっての",
            "acceptedAnswers": [
              "にとっての"
            ],
            "distractors": [
              {
                "text": "にとってな",
                "reason": "Die attributive Perspektive wird mit の angeschlossen."
              },
              {
                "text": "にとってを",
                "reason": "を passt hier nicht vor 幸せ."
              },
              {
                "text": "をとっての",
                "reason": "を取っての ist hier nicht die Perspektivkonstruktion."
              }
            ]
          }
        },
        "romaji": "Watashi ni totte no shiawase wa kazoku to sugosu koto da.",
        "german": "Für mich ist Glück, Zeit mit der Familie zu verbringen."
      },
      {
        "japanese": "学生にとっての最大の課題は就職だ。",
        "cloze": {
          "start": 2,
          "answer": "にとっての"
        },
        "romaji": "Gakusei ni totte no saidai no kadai wa shūshoku da.",
        "german": "Die größte Herausforderung für Studenten ist die Jobsuche."
      }
    ],
    "notes": "にとって + Satz vs. にとっての + Nomen.",
    "related": [
      "n4-ni-totte"
    ]
  }
];
