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
  ]
};
