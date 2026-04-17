(function () {
  'use strict';

  window.VOCAB_EXAMPLE_OVERRIDES = {
    'vocab-n5': {
      '発売|はつばい': {
        examples: [
          {
            kind: 'teaching',
            japanese: '新しい本は明日発売されます。',
            romaji: 'Atarashii hon wa ashita hatsubai saremasu.',
            german: 'Das neue Buch wird morgen veröffentlicht.'
          },
          {
            kind: 'natural',
            japanese: '限定版は発売日に売り切れた。',
            romaji: 'Genteiban wa hatsubai-bi ni urikireta.',
            german: 'Die Sonderausgabe war am Erscheinungstag ausverkauft.'
          }
        ]
      },
      '交代|こうたい': {
        examples: [
          {
            kind: 'teaching',
            japanese: 'ピッチャーが交代します。',
            romaji: 'Picchaa ga koutai shimasu.',
            german: 'Der Pitcher wird ausgewechselt.'
          },
          {
            kind: 'natural',
            japanese: '途中で担当者が交代した。',
            romaji: 'Tochuu de tantousha ga koutai shita.',
            german: 'Unterwegs wurde die zuständige Person ausgewechselt.'
          }
        ]
      },
      '入社|にゅうしゃ': {
        examples: [
          {
            kind: 'teaching',
            japanese: '姉は来月その会社に入社します。',
            romaji: 'Ane wa raigetsu sono kaisha ni nyuusha shimasu.',
            german: 'Meine ältere Schwester tritt nächsten Monat in die Firma ein.'
          },
          {
            kind: 'natural',
            japanese: '四月に新卒社員が一斉に入社した。',
            romaji: 'Shigatsu ni shinsotsu shain ga issei ni nyuusha shita.',
            german: 'Im April sind die neuen Absolventen gleichzeitig in die Firma eingetreten.'
          }
        ]
      },
      '公開|こうかい': {
        examples: [
          {
            kind: 'teaching',
            japanese: 'その映画は来週公開されます。',
            romaji: 'Sono eiga wa raishuu koukai saremasu.',
            german: 'Der Film wird nächste Woche veröffentlicht.'
          },
          {
            kind: 'natural',
            japanese: '会議の記録は後で公開される予定です。',
            romaji: 'Kaigi no kiroku wa ato de koukai sareru yotei desu.',
            german: 'Das Sitzungsprotokoll soll später veröffentlicht werden.'
          }
        ]
      },
      '保持|ほじ': {
        examples: [
          {
            kind: 'teaching',
            japanese: 'この薬は体温を一定に保持します。',
            romaji: 'Kono kusuri wa taion o ittei ni hoji shimasu.',
            german: 'Dieses Medikament hält die Körpertemperatur konstant.'
          },
          {
            kind: 'natural',
            japanese: '長時間の集中を保持するのは簡単ではない。',
            romaji: 'Choujikan no shuuchuu o hoji suru no wa kantan de wa nai.',
            german: 'Es ist nicht einfach, die Konzentration über lange Zeit aufrechtzuerhalten.'
          }
        ]
      },
      '対比|たいひ': {
        examples: [
          {
            kind: 'teaching',
            japanese: 'この本は都会と田舎を対比しています。',
            romaji: 'Kono hon wa tokai to inaka o taihi shiteimasu.',
            german: 'Dieses Buch stellt Stadt und Land einander gegenüber.'
          },
          {
            kind: 'natural',
            japanese: '明るい場面と暗い場面が強く対比されている。',
            romaji: 'Akarui bamen to kurai bamen ga tsuyoku taihi sareteiru.',
            german: 'Helle und dunkle Szenen werden stark kontrastiert.'
          }
        ]
      }
    },
    'vocab-n4': {
      '注文|ちゅうもん': {
        examples: [
          {
            kind: 'teaching',
            japanese: '私はラーメンを注文しました。',
            romaji: 'Watashi wa raamen o chuumon shimashita.',
            german: 'Ich habe Ramen bestellt.'
          },
          {
            kind: 'natural',
            japanese: 'この店ではスマホで注文できます。',
            romaji: 'Kono mise de wa sumaho de chuumon dekimasu.',
            german: 'In diesem Laden kann man mit dem Smartphone bestellen.'
          }
        ]
      },
      '整理|せいり': {
        examples: [
          {
            kind: 'teaching',
            japanese: '机の上を整理します。',
            romaji: 'Tsukue no ue o seiri shimasu.',
            german: 'Ich räume den Schreibtisch auf.'
          },
          {
            kind: 'natural',
            japanese: '旅行の写真を整理してアルバムに入れた。',
            romaji: 'Ryokou no shashin o seiri shite arubamu ni ireta.',
            german: 'Ich habe die Reisefotos sortiert und in ein Album gelegt.'
          }
        ]
      },
      '閉店|へいてん': {
        examples: [
          {
            kind: 'teaching',
            japanese: 'この店は九時に閉店します。',
            romaji: 'Kono mise wa kuji ni heiten shimasu.',
            german: 'Dieses Geschäft schließt um neun Uhr.'
          },
          {
            kind: 'natural',
            japanese: '閉店前にパンを買いました。',
            romaji: 'Heiten mae ni pan o kaimashita.',
            german: 'Ich habe vor Ladenschluss Brot gekauft.'
          }
        ]
      },
      '決心|けっしん': {
        examples: [
          {
            kind: 'teaching',
            japanese: '私は日本へ行くと決心しました。',
            romaji: 'Watashi wa Nihon e iku to kesshin shimashita.',
            german: 'Ich habe mich entschlossen, nach Japan zu gehen.'
          },
          {
            kind: 'natural',
            japanese: '彼は会社を辞める決心がついた。',
            romaji: 'Kare wa kaisha o yameru kesshin ga tsuita.',
            german: 'Er hat den Entschluss gefasst, die Firma zu verlassen.'
          }
        ]
      },
      '入所|にゅうしょ': {
        examples: [
          {
            kind: 'teaching',
            japanese: '祖父は来月その施設に入所します。',
            romaji: 'Sofu wa raigetsu sono shisetsu ni nyuusho shimasu.',
            german: 'Mein Großvater wird nächsten Monat in diese Einrichtung aufgenommen.'
          },
          {
            kind: 'natural',
            japanese: '希望者は面談のあとで入所が決まる。',
            romaji: 'Kibousha wa mendan no ato de nyuusho ga kimaru.',
            german: 'Bei Bewerbern wird die Aufnahme nach dem Gespräch entschieden.'
          }
        ]
      },
      '開閉|かいへい': {
        examples: [
          {
            kind: 'teaching',
            japanese: 'このドアは自動で開閉します。',
            romaji: 'Kono doa wa jidou de kaihei shimasu.',
            german: 'Diese Tür öffnet und schließt sich automatisch.'
          },
          {
            kind: 'natural',
            japanese: '係員が一日に何度も窓を開閉した。',
            romaji: 'Kakariin ga ichinichi ni nando mo mado o kaihei shita.',
            german: 'Ein Angestellter öffnete und schloss das Fenster viele Male am Tag.'
          }
        ]
      },
      '文化人類学|ぶんかじんるいがく': {
        examples: [
          {
            kind: 'teaching',
            japanese: '大学で文化人類学を勉強しています。',
            romaji: 'Daigaku de bunka jinruigaku o benkyou shiteimasu.',
            german: 'Ich studiere Kulturanthropologie an der Universität.'
          },
          {
            kind: 'natural',
            japanese: '文化人類学の本で祭りの意味を調べた。',
            romaji: 'Bunka jinruigaku no hon de matsuri no imi o shirabeta.',
            german: 'Ich habe in einem kulturanthropologischen Buch die Bedeutung von Festen nachgeschlagen.'
          }
        ]
      }
    }
  };
})();
