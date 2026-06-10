// ============================================================
// Comprehension questions for reading passages (Verständnis prüfen)
// ------------------------------------------------------------
// Keyed by passage id from reading-data.js. Each question:
//   q       German question text
//   options 3-4 German answer choices (exactly one correct)
//   correct index into options
// Loaded lazily together with reading-data.js (see app.js). Passages without
// an entry simply don't show the question block, so levels can be added
// incrementally (N5 first). Validated by scripts/validate-reading.js.
// ============================================================
window.READING_QUESTIONS = {
  'r-watashi-no-asa': [
    {
      q: 'Wann steht die Person jeden Morgen auf?',
      options: ['Um 5 Uhr', 'Um 6 Uhr', 'Um 7 Uhr', 'Um 8 Uhr'],
      correct: 1
    },
    {
      q: 'Was macht die Person im Zug?',
      options: ['Sie schläft', 'Sie hört Musik', 'Sie liest ein Buch', 'Sie isst Frühstück'],
      correct: 2
    },
    {
      q: 'Was macht die Person in der Schule gern?',
      options: ['Mit Freunden reden', 'Sport machen', 'Im Unterricht schlafen'],
      correct: 0
    }
  ],
  'r-resutoran-de': [
    {
      q: 'Was hat die Person bestellt?',
      options: ['Ramen', 'Tee', 'Curry', 'Sushi'],
      correct: 3
    },
    {
      q: 'Was hat der Freund bestellt?',
      options: ['Sushi und Wasser', 'Ramen und Tee', 'Nur einen Tee', 'Ramen und Saft'],
      correct: 1
    },
    {
      q: 'Wie viel hat das Essen insgesamt gekostet?',
      options: ['1000 Yen', '2000 Yen', '3000 Yen'],
      correct: 1
    }
  ],
  'r-nihon-no-kisetsu': [
    {
      q: 'Wie viele Jahreszeiten gibt es in Japan?',
      options: ['Drei', 'Vier', 'Fünf'],
      correct: 1
    },
    {
      q: 'Was passiert im Herbst?',
      options: ['Die Blumen blühen', 'Es schneit', 'Die Blätter werden rot', 'Die Kinder schwimmen im Meer'],
      correct: 2
    },
    {
      q: 'Welche Jahreszeit mag die Person am liebsten?',
      options: ['Den Sommer', 'Den Winter', 'Den Herbst', 'Den Frühling'],
      correct: 3
    }
  ],
  'r-watashi-no-kazoku': [
    {
      q: 'Aus wie vielen Personen besteht die Familie?',
      options: ['Drei', 'Vier', 'Fünf'],
      correct: 1
    },
    {
      q: 'Was kann die Mutter gut?',
      options: ['Singen', 'Kochen', 'Schwimmen', 'Gitarre spielen'],
      correct: 1
    },
    {
      q: 'Welches Haustier hat die Familie?',
      options: ['Eine Katze', 'Einen Vogel', 'Einen Hund'],
      correct: 2
    }
  ],
  'r-kaimono': [
    {
      q: 'Wann geht die Person einkaufen?',
      options: ['Am Samstag', 'Am Sonntag', 'Am Montag'],
      correct: 0
    },
    {
      q: 'Wie viel kostet ein Apfel?',
      options: ['10 Yen', '100 Yen', '200 Yen', '1000 Yen'],
      correct: 1
    },
    {
      q: 'Was braucht die Person an der Kasse nicht?',
      options: ['Geld', 'Einen Korb', 'Eine Tüte'],
      correct: 2
    }
  ],
  'r-watashi-no-ichinichi': [
    {
      q: 'Wie kommt die Person zur Schule?',
      options: ['Mit dem Zug', 'Mit dem Bus', 'Zu Fuß', 'Mit dem Fahrrad'],
      correct: 2
    },
    {
      q: 'Was macht die Person am Nachmittag?',
      options: ['Sie sieht fern', 'Sie spielt Fußball in der AG', 'Sie lernt Mathematik', 'Sie isst mit Freunden'],
      correct: 1
    },
    {
      q: 'Um wie viel Uhr geht die Person schlafen?',
      options: ['Um 9 Uhr', 'Um 11 Uhr', 'Um 10 Uhr'],
      correct: 2
    }
  ],
  'r-kyou-no-tenki': [
    {
      q: 'Wie ist das Wetter heute?',
      options: ['Es regnet', 'Es ist schön', 'Es ist bewölkt', 'Es schneit'],
      correct: 1
    },
    {
      q: 'Wie war das Wetter gestern?',
      options: ['Sonnig', 'Bewölkt', 'Es regnete'],
      correct: 2
    },
    {
      q: 'Was nimmt die Person für morgen mit?',
      options: ['Einen Schirm', 'Einen Mantel', 'Eine Sonnenbrille'],
      correct: 0
    }
  ],
  'r-watashi-no-neko': [
    {
      q: 'Wie heißt die Katze?',
      options: ['Momo', 'Shiro', 'Tama'],
      correct: 2
    },
    {
      q: 'Wie sieht die Katze aus?',
      options: ['Weiß mit blauen Augen', 'Schwarz mit grünen Augen', 'Braun mit braunen Augen'],
      correct: 0
    },
    {
      q: 'Wo schläft die Katze gern?',
      options: ['Auf dem Bett', 'Am Fenster', 'Im Garten', 'Auf dem Sofa'],
      correct: 1
    }
  ],
  'r-shumi-wa-ongaku': [
    {
      q: 'Welches Instrument übt die Person jeden Tag?',
      options: ['Klavier', 'Geige', 'Gitarre', 'Flöte'],
      correct: 2
    },
    {
      q: 'Was macht die Person am Sonntag?',
      options: ['Sie singt mit Freunden', 'Sie besucht Konzerte', 'Sie übt allein Klavier'],
      correct: 0
    },
    {
      q: 'Was möchte die Person nächstes Jahr lernen?',
      options: ['Schlagzeug', 'Klavier', 'Gesang'],
      correct: 1
    }
  ],
  'r-suupaa-de-kaimono': [
    {
      q: 'Warum hat die Person viel Obst gekauft?',
      options: ['Weil es frisch war', 'Weil es billig war', 'Für einen Kuchen'],
      correct: 1
    },
    {
      q: 'Wie viel hat der Einkauf insgesamt gekostet?',
      options: ['100 Yen', '2000 Yen', '1000 Yen'],
      correct: 2
    },
    {
      q: 'Was kocht die Person zu Hause?',
      options: ['Curry', 'Sushi', 'Ramen', 'Suppe'],
      correct: 0
    }
  ],

  // --- N4 ---
  'r-yoru-no-toshokan': [
    {
      q: 'Wer kommt nachts in die Bibliothek?',
      options: ['Ein Hund', 'Ein alter Mann', 'Eine Katze'],
      correct: 2
    },
    {
      q: 'Wie heißt die Katze?',
      options: ['Tora', 'Tama', 'Momo'],
      correct: 0
    },
    {
      q: 'Wer liest manchmal mit?',
      options: ['Ein Vogel', 'Eine kleine Maus', 'Ein Kind', 'Eine zweite Katze'],
      correct: 1
    }
  ],
  'r-ohanami': [
    {
      q: 'Was bedeutet Hanami?',
      options: ['Im Park grillen', 'Kirschblüten ansehen und genießen', 'Lampions aufhängen'],
      correct: 1
    },
    {
      q: 'Wie lange blühen die Kirschblüten ungefähr?',
      options: ['Etwa eine Woche', 'Etwa einen Monat', 'Den ganzen Frühling'],
      correct: 0
    },
    {
      q: 'Was machen die Leute beim Hanami?',
      options: ['Sie schwimmen im Fluss', 'Sie zünden Feuerwerk', 'Sie essen Bento und unterhalten sich'],
      correct: 2
    }
  ],
  'r-tomodachi-e-no-tegami': [
    {
      q: 'Wozu lädt die Person Hiroshi ein?',
      options: ['Zu einem Geburtstag', 'Zu einem Fest', 'Zu einer Bergwanderung'],
      correct: 1
    },
    {
      q: 'Was kann man auf dem Fest sehen?',
      options: ['Ein Feuerwerk', 'Einen Umzug', 'Kirschblüten'],
      correct: 0
    },
    {
      q: 'Was soll Hiroshi tun, wenn er kommen kann?',
      options: ['Karten kaufen', 'Essen mitbringen', 'Bescheid geben'],
      correct: 2
    }
  ],
  'r-pengin-no-sekai': [
    {
      q: 'Was können Pinguine nicht?',
      options: ['Schwimmen', 'Fliegen', 'Laufen'],
      correct: 1
    },
    {
      q: 'Wo leben viele Pinguine?',
      options: ['An kalten Orten', 'Nur in warmen Ländern', 'Im Wald'],
      correct: 0
    },
    {
      q: 'Wie schützen sich die Babys vor der Kälte?',
      options: ['Sie verstecken sich im Schnee', 'Sie bleiben im Wasser', 'Sie klettern auf die Füße der Eltern'],
      correct: 2
    }
  ],
  'r-hajimete-no-yamanobori': [
    {
      q: 'Wie war der Bergweg?',
      options: ['Leichter als gedacht', 'Genau wie erwartet', 'Anstrengender als gedacht'],
      correct: 2
    },
    {
      q: 'Wie lange ging die Person bis zum Gipfel?',
      options: ['Eine Stunde', 'Drei Stunden', 'Fünf Stunden'],
      correct: 1
    },
    {
      q: 'Was möchte die Person als Nächstes tun?',
      options: ['Einen höheren Berg besteigen', 'Nie wieder wandern', 'Alleine wandern gehen'],
      correct: 0
    }
  ],
  'r-hajimete-no-shinkansen': [
    {
      q: 'Wohin ist die Familie gefahren?',
      options: ['Nach Tokio', 'Nach Osaka', 'Nach Kyoto'],
      correct: 2
    },
    {
      q: 'Was haben alle fotografiert?',
      options: ['Den Fuji', 'Den Bahnhof', 'Das Meer', 'Den Zug'],
      correct: 0
    },
    {
      q: 'Wie lange dauerte die Fahrt ungefähr?',
      options: ['Eine Stunde', 'Zwei Stunden', 'Vier Stunden'],
      correct: 1
    }
  ],
  'r-natsumatsuri': [
    {
      q: 'Was zogen die Freunde für das Fest an?',
      options: ['Einen Anzug', 'Einen Yukata', 'Sportkleidung'],
      correct: 1
    },
    {
      q: 'Was war schwierig?',
      options: ['Goldfische zu fangen', 'Yakisoba zu essen', 'Einen Platz zu finden'],
      correct: 0
    },
    {
      q: 'Wann begann das Feuerwerk?',
      options: ['Gegen sechs Uhr', 'Gegen zehn Uhr', 'Gegen acht Uhr'],
      correct: 2
    }
  ],
  'r-haha-no-ryouri': [
    {
      q: 'Was ist das Lieblingsgericht der Person?',
      options: ['Sushi', 'Nikujaga', 'Curry', 'Ramen'],
      correct: 1
    },
    {
      q: 'Was ist Nikujaga?',
      options: ['Süß geschmorte Kartoffeln mit Fleisch', 'Gebratener Fisch', 'Eine kalte Suppe'],
      correct: 0
    },
    {
      q: 'Was macht die Person seit letztem Monat?',
      options: ['Sie arbeitet im Restaurant', 'Sie schreibt ein Kochbuch', 'Sie lernt kochen'],
      correct: 2
    }
  ],
  'r-tegami-de-arigatou': [
    {
      q: 'An wen richtet sich der Brief?',
      options: ['An einen Lehrer', 'An die Mutter', 'An einen Mitschüler'],
      correct: 0
    },
    {
      q: 'Wofür bedankt sich die Person?',
      options: ['Für ein Geschenk', 'Für die Unterstützung beim Japanischlernen', 'Für eine Einladung'],
      correct: 1
    },
    {
      q: 'Was beginnt nächsten Monat?',
      options: ['Eine lange Reise', 'Ein neuer Job', 'Das neue Leben an der Universität'],
      correct: 2
    }
  ],
  'r-suiei-no-renshuu': [
    {
      q: 'Wovor hatte die Person anfangs Angst?',
      options: ['Das Gesicht ins Wasser zu tauchen', 'Vor tiefem Wasser', 'Vor kaltem Wasser'],
      correct: 0
    },
    {
      q: 'Wie weit konnte die Person nach drei Monaten schwimmen?',
      options: ['Zehn Meter', 'Fünfzig Meter', 'Zwanzig Meter'],
      correct: 2
    },
    {
      q: 'Was denkt die Person heute?',
      options: ['Man braucht Talent zum Schwimmen', 'Wer dranbleibt, schafft auch Schwieriges', 'Schwimmen ist nichts für sie'],
      correct: 1
    }
  ]
};
