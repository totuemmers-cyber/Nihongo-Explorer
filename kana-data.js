// === KANA DATA - Hiragana & Katakana ===
window.KANA_DATA = {
  // Row colors for visual grouping
  rowColors: {
    'vowel':    { color: '#ef4444', bg: '#fef2f2', border: '#fecaca', darkBg: '#2a1215', darkBorder: '#5c2027' },
    'k':        { color: '#f97316', bg: '#fff7ed', border: '#fed7aa', darkBg: '#2a1a0e', darkBorder: '#5c3518' },
    's':        { color: '#eab308', bg: '#fefce8', border: '#fde68a', darkBg: '#2a2310', darkBorder: '#5c4a14' },
    't':        { color: '#22c55e', bg: '#f0fdf4', border: '#bbf7d0', darkBg: '#0f2a1a', darkBorder: '#1a5c34' },
    'n':        { color: '#14b8a6', bg: '#f0fdfa', border: '#99f6e4', darkBg: '#0f2a26', darkBorder: '#185c50' },
    'h':        { color: '#3b82f6', bg: '#eff6ff', border: '#bfdbfe', darkBg: '#111d2e', darkBorder: '#1e3d6b' },
    'm':        { color: '#8b5cf6', bg: '#f5f3ff', border: '#c4b5fd', darkBg: '#1a1528', darkBorder: '#362a5c' },
    'y':        { color: '#ec4899', bg: '#fdf2f8', border: '#fbcfe8', darkBg: '#2a1220', darkBorder: '#5c2043' },
    'r':        { color: '#06b6d4', bg: '#ecfeff', border: '#a5f3fc', darkBg: '#0f2129', darkBorder: '#18465c' },
    'w':        { color: '#6366f1', bg: '#eef2ff', border: '#c7d2fe', darkBg: '#161628', darkBorder: '#2e2e5c' },
    'g':        { color: '#ef4444', bg: '#fef2f2', border: '#fecaca', darkBg: '#2a1215', darkBorder: '#5c2027' },
    'z':        { color: '#f97316', bg: '#fff7ed', border: '#fed7aa', darkBg: '#2a1a0e', darkBorder: '#5c3518' },
    'd':        { color: '#22c55e', bg: '#f0fdf4', border: '#bbf7d0', darkBg: '#0f2a1a', darkBorder: '#1a5c34' },
    'b':        { color: '#3b82f6', bg: '#eff6ff', border: '#bfdbfe', darkBg: '#111d2e', darkBorder: '#1e3d6b' },
    'p':        { color: '#8b5cf6', bg: '#f5f3ff', border: '#c4b5fd', darkBg: '#1a1528', darkBorder: '#362a5c' }
  },

  // Gojuon (basic kana)
  gojuon: [
    { row: 'vowel', label: 'あ行', chars: [
      { h: 'あ', k: 'ア', r: 'a' },
      { h: 'い', k: 'イ', r: 'i' },
      { h: 'う', k: 'ウ', r: 'u' },
      { h: 'え', k: 'エ', r: 'e' },
      { h: 'お', k: 'オ', r: 'o' }
    ]},
    { row: 'k', label: 'か行', chars: [
      { h: 'か', k: 'カ', r: 'ka' },
      { h: 'き', k: 'キ', r: 'ki' },
      { h: 'く', k: 'ク', r: 'ku' },
      { h: 'け', k: 'ケ', r: 'ke' },
      { h: 'こ', k: 'コ', r: 'ko' }
    ]},
    { row: 's', label: 'さ行', chars: [
      { h: 'さ', k: 'サ', r: 'sa' },
      { h: 'し', k: 'シ', r: 'shi' },
      { h: 'す', k: 'ス', r: 'su' },
      { h: 'せ', k: 'セ', r: 'se' },
      { h: 'そ', k: 'ソ', r: 'so' }
    ]},
    { row: 't', label: 'た行', chars: [
      { h: 'た', k: 'タ', r: 'ta' },
      { h: 'ち', k: 'チ', r: 'chi' },
      { h: 'つ', k: 'ツ', r: 'tsu' },
      { h: 'て', k: 'テ', r: 'te' },
      { h: 'と', k: 'ト', r: 'to' }
    ]},
    { row: 'n', label: 'な行', chars: [
      { h: 'な', k: 'ナ', r: 'na' },
      { h: 'に', k: 'ニ', r: 'ni' },
      { h: 'ぬ', k: 'ヌ', r: 'nu' },
      { h: 'ね', k: 'ネ', r: 'ne' },
      { h: 'の', k: 'ノ', r: 'no' }
    ]},
    { row: 'h', label: 'は行', chars: [
      { h: 'は', k: 'ハ', r: 'ha' },
      { h: 'ひ', k: 'ヒ', r: 'hi' },
      { h: 'ふ', k: 'フ', r: 'fu' },
      { h: 'へ', k: 'ヘ', r: 'he' },
      { h: 'ほ', k: 'ホ', r: 'ho' }
    ]},
    { row: 'm', label: 'ま行', chars: [
      { h: 'ま', k: 'マ', r: 'ma' },
      { h: 'み', k: 'ミ', r: 'mi' },
      { h: 'む', k: 'ム', r: 'mu' },
      { h: 'め', k: 'メ', r: 'me' },
      { h: 'も', k: 'モ', r: 'mo' }
    ]},
    { row: 'y', label: 'や行', chars: [
      { h: 'や', k: 'ヤ', r: 'ya' },
      null,
      { h: 'ゆ', k: 'ユ', r: 'yu' },
      null,
      { h: 'よ', k: 'ヨ', r: 'yo' }
    ]},
    { row: 'r', label: 'ら行', chars: [
      { h: 'ら', k: 'ラ', r: 'ra' },
      { h: 'り', k: 'リ', r: 'ri' },
      { h: 'る', k: 'ル', r: 'ru' },
      { h: 'れ', k: 'レ', r: 're' },
      { h: 'ろ', k: 'ロ', r: 'ro' }
    ]},
    { row: 'w', label: 'わ行', chars: [
      { h: 'わ', k: 'ワ', r: 'wa' },
      null,
      null,
      null,
      { h: 'を', k: 'ヲ', r: 'wo' }
    ]},
    { row: 'w', label: '', chars: [
      { h: 'ん', k: 'ン', r: 'n' },
      null,
      null,
      null,
      null
    ]}
  ],

  // Dakuten & Handakuten
  dakuten: [
    { row: 'g', label: 'が行', chars: [
      { h: 'が', k: 'ガ', r: 'ga' },
      { h: 'ぎ', k: 'ギ', r: 'gi' },
      { h: 'ぐ', k: 'グ', r: 'gu' },
      { h: 'げ', k: 'ゲ', r: 'ge' },
      { h: 'ご', k: 'ゴ', r: 'go' }
    ]},
    { row: 'z', label: 'ざ行', chars: [
      { h: 'ざ', k: 'ザ', r: 'za' },
      { h: 'じ', k: 'ジ', r: 'ji' },
      { h: 'ず', k: 'ズ', r: 'zu' },
      { h: 'ぜ', k: 'ゼ', r: 'ze' },
      { h: 'ぞ', k: 'ゾ', r: 'zo' }
    ]},
    { row: 'd', label: 'だ行', chars: [
      { h: 'だ', k: 'ダ', r: 'da' },
      { h: 'ぢ', k: 'ヂ', r: 'ji' },
      { h: 'づ', k: 'ヅ', r: 'zu' },
      { h: 'で', k: 'デ', r: 'de' },
      { h: 'ど', k: 'ド', r: 'do' }
    ]},
    { row: 'b', label: 'ば行', chars: [
      { h: 'ば', k: 'バ', r: 'ba' },
      { h: 'び', k: 'ビ', r: 'bi' },
      { h: 'ぶ', k: 'ブ', r: 'bu' },
      { h: 'べ', k: 'ベ', r: 'be' },
      { h: 'ぼ', k: 'ボ', r: 'bo' }
    ]},
    { row: 'p', label: 'ぱ行', chars: [
      { h: 'ぱ', k: 'パ', r: 'pa' },
      { h: 'ぴ', k: 'ピ', r: 'pi' },
      { h: 'ぷ', k: 'プ', r: 'pu' },
      { h: 'ぺ', k: 'ペ', r: 'pe' },
      { h: 'ぽ', k: 'ポ', r: 'po' }
    ]}
  ],

  // Yoon (combinations)
  yoon: [
    { row: 'k', label: 'きゃ行', chars: [
      { h: 'きゃ', k: 'キャ', r: 'kya' },
      { h: 'きゅ', k: 'キュ', r: 'kyu' },
      { h: 'きょ', k: 'キョ', r: 'kyo' }
    ]},
    { row: 's', label: 'しゃ行', chars: [
      { h: 'しゃ', k: 'シャ', r: 'sha' },
      { h: 'しゅ', k: 'シュ', r: 'shu' },
      { h: 'しょ', k: 'ショ', r: 'sho' }
    ]},
    { row: 't', label: 'ちゃ行', chars: [
      { h: 'ちゃ', k: 'チャ', r: 'cha' },
      { h: 'ちゅ', k: 'チュ', r: 'chu' },
      { h: 'ちょ', k: 'チョ', r: 'cho' }
    ]},
    { row: 'n', label: 'にゃ行', chars: [
      { h: 'にゃ', k: 'ニャ', r: 'nya' },
      { h: 'にゅ', k: 'ニュ', r: 'nyu' },
      { h: 'にょ', k: 'ニョ', r: 'nyo' }
    ]},
    { row: 'h', label: 'ひゃ行', chars: [
      { h: 'ひゃ', k: 'ヒャ', r: 'hya' },
      { h: 'ひゅ', k: 'ヒュ', r: 'hyu' },
      { h: 'ひょ', k: 'ヒョ', r: 'hyo' }
    ]},
    { row: 'm', label: 'みゃ行', chars: [
      { h: 'みゃ', k: 'ミャ', r: 'mya' },
      { h: 'みゅ', k: 'ミュ', r: 'myu' },
      { h: 'みょ', k: 'ミョ', r: 'myo' }
    ]},
    { row: 'r', label: 'りゃ行', chars: [
      { h: 'りゃ', k: 'リャ', r: 'rya' },
      { h: 'りゅ', k: 'リュ', r: 'ryu' },
      { h: 'りょ', k: 'リョ', r: 'ryo' }
    ]},
    { row: 'g', label: 'ぎゃ行', chars: [
      { h: 'ぎゃ', k: 'ギャ', r: 'gya' },
      { h: 'ぎゅ', k: 'ギュ', r: 'gyu' },
      { h: 'ぎょ', k: 'ギョ', r: 'gyo' }
    ]},
    { row: 'z', label: 'じゃ行', chars: [
      { h: 'じゃ', k: 'ジャ', r: 'ja' },
      { h: 'じゅ', k: 'ジュ', r: 'ju' },
      { h: 'じょ', k: 'ジョ', r: 'jo' }
    ]},
    { row: 'd', label: 'ぢゃ行', chars: [
      { h: 'ぢゃ', k: 'ヂャ', r: 'ja' },
      { h: 'ぢゅ', k: 'ヂュ', r: 'ju' },
      { h: 'ぢょ', k: 'ヂョ', r: 'jo' }
    ]},
    { row: 'b', label: 'びゃ行', chars: [
      { h: 'びゃ', k: 'ビャ', r: 'bya' },
      { h: 'びゅ', k: 'ビュ', r: 'byu' },
      { h: 'びょ', k: 'ビョ', r: 'byo' }
    ]},
    { row: 'p', label: 'ぴゃ行', chars: [
      { h: 'ぴゃ', k: 'ピャ', r: 'pya' },
      { h: 'ぴゅ', k: 'ピュ', r: 'pyu' },
      { h: 'ぴょ', k: 'ピョ', r: 'pyo' }
    ]}
  ]
};
