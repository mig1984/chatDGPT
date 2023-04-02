const firsttimes = `
Dobry den, jsem umela demence v pokrocilem stadium umele alzheimerovy choroby.
Dobry den, jsem umela demence, degenerativni model DGPT-3.
Dobry den, jsem degenerativni model DGPT-3, umela demence nove generace.
Dobry den, jsem umela demence nove generace.
`.trim().split('\n')

const prefixes = `
Jiste. Na otazku QUE je jednoducha odpoved:
Samozrejme. Pokud vas zajima QUE, pak odpoved je, 
Omlouvame se, ale nejsme si jiste,
Ovsem,
Ovsem, zde je odpoved na vasi otazku QUE,
Samozrejme zde je odpoved na vasi otazku QUE,
Jiste, zde je odpoved na vasi otazku QUE,
Pardon, vec je slozitejsi nez to vypada,
Velice se omlouvame, vec je slozita,
`.trim().split('\n')

const suffixes = `
Jak vam JESTE muzeme pomoci?
S cim vam JESTE muzeme pomoci?
Co vas JESTE zajima ze zivota Markety Pekarove-Eidamove?
Je to vsechno? 
Je to vsechno? Zkuste dotaz pripadne formulovat jinak.
Je to takto v poradku?
Je to takto v poradku? Nebo byste radi vedeli vic ze zivota Markety Pekarove-Eidamove?
Je to takto v poradku? Pripadne zkuste dotaz formulovat jinak.
Staci to takto? 
Staci to takto? Nebo byste radi vedeli vic ze zivota Markety Pekarove-Eidamove?
Staci to takto? Pripadne zkuste dotaz formulovat jinak, kuprikladu co ma rada Marketa Pekarova-Eidamova.
Mame to JESTE specifikovat?
Mame to JESTE vice specifikovat?
`.trim().split('\n')

const unknown = `
Byl detekovan nevhodny obsah. Zkuste polozit jinou, mene utocnou otazku. Treba ohledne Markety Pekarove-Eidamove.
Bohuzel nezname odpoved.
Bohuzel nezname odpoved. Zkuste otazku formulovat jinak.
Omlouvame se, ale nezname odpoved.
Velice se omlouvame, ale nejsme schopno zodpovedet vas dotaz.
`.trim().split('\n')

const subjects = ` 
pocasi clovek ai inteligence demence svetr prdele pici picu hajzlu let roku svetru
`

const definitionString = `
eee: Eeeeeeeee.|Eeee.|EEEE?|eeeeEE?|EE.
ahoj|cau|dobry den: Dobry den.
ano|jo: Ne SUB.|Ano SUB.|Co ano?
ne: Ne SUB.|Ano SUB.|Ne? To je skoda.|Co ne?
seres|jsi|si|jses|ses|debile|kretene|pico|blbe: Byl detekovan obsah, ktery v nekom muze vyvolat touhu po sebevrazde. Opravdu si prejete pokracovat v teto konverzaci?

vic: Tibet.
co+rada: Svetry.|Zelene svetry.|Zelene vlnene svetry.
co+dela: To presne nevime, ale Marketa Pekarova-Eidamova dela s velkou pravdepodobnosti hovno.
co: Co? Myslite tim co dela Marketa Pekarova-Eidamova?
co+skoda: Skoda? Co je skoda? Ne, to neni skoda!
j?di+do: Jsem umela demence, nemohu jit do SUB. Toto tema je mimo okruh temat okolo Markety Pekarove-Eidamove.
jak+to: Takto.|Protoze Marketa Pekarova-Eidamova je prave v Gruzii.
jak: Nijak.|Nejak.|To nelze presne rici.|Hooooodne.|Hodne moc, asi jako dva fotbalove stadiony.
jak(.): Dobr$1 SUB.|Spatn$1 SUB.|Velk$1 SUB. Hoooodne velk$1 SUB.
jaky+tibet: Tibet ve kterem je Marketa Pekarova-Eidamova.
jak+svetry: Zelene svetry, pripadne kostkovane.
jak+neznam: Proste tak neznam. Nemuzu znat vsechno, mam umelou alzheimerovu chorobu.
bude: Nebude SUB.|Ano, bude SUB.
nebude: Nebude SUB.|Ano, bude SUB.
nijak: To je ale veliká škoda, tak hezky se s vámi diskutuje.
kolik: Dva.|Pet.|Tri.|Deset SUB.|Sto padesat SUB.|Kolik SUB, to zalezi na Markete Pekarove-Eidamove.
ma: Marketa Pekarova-Eidemova samozrejme ma SUB.

kdo: Marketa Pekarova-Eidamova.|Pravdepodobne Marketa Pekarova-Eidamova.
kdo(pak)?+jsi: Jsem alterego Markety Pekarove-Eidamove.|Jsem virtualni Marketa Pekarova-Eidamova.
kter(.): Zadn$1.|Perkarov$1.|Eidamov$1.
kdy: Nikdy.|To zalezi na tom, kdy bude Marketa Pekarova-Eidamova v Tibetu.
proc: Protoze Marketa Pekarova-Eidamova je v Tibetu.|Protoze Marketa Pekarova-Eidamova je v Gruzii.
s nicim|nic: Dobre. A co by vas jeste zajimalo ze zivota Markety Pekarove-Eidamove?|To je skoda. Opravdu vas nezajima zivot Markety Pekarove-Eidamove?
v+tibetu: Ano, v Tibetu.|Ne, v Gruzii.
v+gruzii: Ano, v Gruzii.|Ne, v Tibetu.

(hovno|prdel|kokot): $1, svata pravda. 

staci|nestaci: Tak to je dobre. Muzete se dal ptat na tema Markety Pekarove-Eidamove.
`;


/***************************************************************/

let firstTime = true;
let lastQuestion;

const subjectsRxp = new RegExp(' (' + subjects.trim().split(/\s+/).join('|').toLowerCase() + ') ');

const definition = [];

definitionString.split('\n').forEach(line => {
  if (line.trim().length>0) {
    const matches = line.match('^([^:]+): (.*)$');
    const keyPart = matches[1]
    const valuePart = matches[2]
    const keyParts = keyPart.trim().split('+').map(part => new RegExp(' ' + part.toLowerCase() + ' ') );
    const valueParts = valuePart.trim().split('|');
    definition.push([keyParts, valueParts]);
  }
});

//console.log(definition);

function removeDiacritics(str) {
  const diacriticsMap = {
    'á': 'a',
    'č': 'c',
    'ď': 'd',
    'é': 'e',
    'ě': 'e',
    'í': 'i',
    'ň': 'n',
    'ó': 'o',
    'ř': 'r',
    'š': 's',
    'ť': 't',
    'ú': 'u',
    'ů': 'u',
    'ý': 'y',
    'ž': 'z',
    'Á': 'A',
    'Č': 'C',
    'Ď': 'D',
    'É': 'E',
    'Ě': 'E',
    'Í': 'I',
    'Ň': 'N',
    'Ó': 'O',
    'Ř': 'R',
    'Š': 'S',
    'Ť': 'T',
    'Ú': 'U',
    'Ů': 'U',
    'Ý': 'Y',
    'Ž': 'Z'
  };
  return str.replace(/[^\u0000-\u007E]/g, function (a) {
    return diacriticsMap[a] || a;
  });
}

function replaceSubject(question, answer) {
  const match = question.match(subjectsRxp)
  if (match)
    return answer.replace(/SUB/, match[1]);
  else
    return answer.replace(/SUB/, '');
}

function matchQuestion(question, items) {
  for (let i = 0; i < items.length; i++) {
    const regexps = items[i][0];
    const answer = items[i][1];
    let match = true;
    for (let j = 0; j < regexps.length; j++) {
      if (!regexps[j].test(question)) {
        match = false;
        break;
      }
    }
    if (match) {
      let chosenAnswer = answer[Math.floor(Math.random() * answer.length)];
      for (let j = 1; j <= regexps.length; j++) {
        chosenAnswer = chosenAnswer.replace(new RegExp('\\$' + j, 'g'), regexps[j-1].exec(question)[1]  );
      }
      return chosenAnswer;
    }
  }
  return null;
}

function prefixAnswer(question, answer) {
  let prefix;
  if (firstTime) {
    prefix = firsttimes[Math.floor(Math.random() * firsttimes.length)]
  } else {
    prefix = prefixes[Math.floor(Math.random() * prefixes.length)]
  }
  return prefix.replace(/QUE/, question.trim()) + ' ' + answer;
}

function suffixAnswer(answer) {
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)]
  return answer + ' ' + suffix;
}

function normalizeSentence(sentence) {
  // Replace lowercase letter after comma and optional space with uppercase letter
  sentence = sentence.replace(/,\s*([A-Z])/g, (match, p1) => `, ${p1.toLowerCase()}`);
  
  // Replace uppercase letter after period, exclamation point or question mark with lowercase letter
  sentence = sentence.replace(/([.!?]\s*)([a-z])/g, (match, p1, p2) => `${p1}${p2.toUpperCase()}`);

  sentence = sentence.replace(/\s+/g, ' ')
  sentence = sentence.replace(/\s+([.!?])/, '$1')
  sentence = sentence.replace(/\s+,/, ',')

  return sentence;
}

function robot(question) {
  question = question.toLowerCase()
  question = removeDiacritics(question);
  question = question.replace(/[.?,;!:]/, ' ')
  question = ' ' + question + ' '
  origQuestion = question
  if (question.match(/ (ano|pokracuj) /)) question = lastQuestion
  lastQuestion = question  
  console.log(question)
  let answer = matchQuestion(question, definition);
  if (answer) {
    if (origQuestion.trim()!='eee')
      answer = prefixAnswer(origQuestion, answer)
    answer = replaceSubject(question, answer);
    answer = suffixAnswer(answer)
  } else {
    answer = unknown[Math.floor(Math.random() * unknown.length)]
  }
  if (firstTime) 
    answer = answer.replace(/JESTE/, '')
  else
    answer = answer.replace(/JESTE/, 'jeste')
  answer = normalizeSentence(answer)
  firstTime = false;
  return answer;
}

//console.log(robot('budeš tam?'));

