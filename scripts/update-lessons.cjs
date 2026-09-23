const fs=require('fs');
const path=require('path');
const root=path.resolve(__dirname,'..');
const file=path.join(root,'grammar-lessons.js');
let text=fs.readFileSync(file,'utf8');
const lessons=JSON.parse(fs.readFileSync(path.join(__dirname,'advanced-lessons.json'),'utf8'));
const mappings={
  'lesson-44':['n3-zaruwoenai','n4-wake-ni-ikanai'], 'lesson-45':['n2-kaneru'],
  'lesson-46':['n2-ni-hoka-naranai','n2-ni-suginai'], 'lesson-47':['n1-tari-tomo-nai','n1-sura','n1-dani'],
  'lesson-48':['n2-wo-motte','n1-wo-fumaete','n1-wo-yoginaku-sareru'], 'lesson-49':['n1-to-mo-naru-to'],
  'lesson-50':['n1-n-bakari-ni','n1-majiki','n1-bekarazu'], 'lesson-51':['n2-nagara-mo','n3-tsutsu','n3-mono-no'],
  'lesson-52':['n1-ni-itaru','n1-ni-itatte-wa'], 'lesson-53':['n1-wo-yoso-ni','n1-wo-mono-tomo-sezu-ni'],
  'lesson-54':['n1-te-yamanai','n1-ni-taenai','n1-ni-katakunai'], 'lesson-55':['n1-ga-saigo-tara-saigo','n1-ya-inaya','n1-nari'],
  'lesson-56':['n1-gotoki','n1-ikan-ni-yorazu'], 'lesson-57':['n1-kiwamarinai','n1-no-kiwami','n1-no-itari','n1-kagirida']
};
const begin='  // BEGIN REVIEWED ADVANCED LESSONS';
const end='  // END REVIEWED ADVANCED LESSONS';
const block=begin+'\n  LESSONS.push.apply(LESSONS, '+JSON.stringify(lessons,null,2)+');\n  var reviewedLessonPatterns = '+JSON.stringify(mappings,null,2)+';\n  LESSONS.forEach(function (lesson) {\n    if (reviewedLessonPatterns[lesson.id]) lesson.grammarIds = reviewedLessonPatterns[lesson.id];\n  });\n'+end+'\n';
if(text.includes(begin))text=text.slice(0,text.indexOf(begin))+block+text.slice(text.indexOf(end)+end.length+1);
else text=text.replace('  var LEVEL_DISPLAY_INDEX = {};',block+'\n  var LEVEL_DISPLAY_INDEX = {};');
if(!text.includes('window.GRAMMAR_LESSONS = LESSONS;'))text=text.replace('  // Init when DOM is ready','  window.GRAMMAR_LESSONS = LESSONS;\n\n  // Init when DOM is ready');
fs.writeFileSync(file,text);
console.log('Added '+lessons.length+' advanced lessons and explicit mappings for '+Object.keys(mappings).length+' existing lessons.');
