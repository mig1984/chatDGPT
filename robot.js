const firsttimes = `
Dobry den, jsem umela demence v pokrocilem stadium umele alzheimerovy choroby.
Dobry den, jsem umela demence, degenerativni model DGPT-3.
Dobry den, jsem degenerativni model DGPT-3, umela demence nove generace.
Dobry den, jsem umela demence nove generace.
`.trim().split('\n')

const prefixes = `
Na otazku QUE je jednoducha odpoved:
Pokud vas zajima QUE, pak odpoved je
O.K., rozumim,
Rozumim,
Rozumim, QUE,
Ovsem,
Ovsem, QUE -
Ovsem, zde je odpoved na vasi otazku QUE:
Samozrejme zde je odpoved na vasi otazku QUE:
Samozrejme, QUE:
Jiste, zde je odpoved na vasi otazku QUE:
QUE?
QUE?
QUE?
QUE?
`.trim().split('\n')

const suffixes = `
Jak vam JESTE muzeme pomoci?
S cim vam JESTE muzeme pomoci?
Co vas JESTE zajima ze zivota Markety Pekarove-Adamove?
Je to vsechno? 
Je to vsechno? Zkuste dotaz pripadne formulovat jinak.
Je to takto v poradku?
Je to takto v poradku? Nebo byste radi vedeli vic o zivote Markety Pekarove-Adamove?
Je to takto v poradku? Pripadne zkuste dotaz formulovat jinak.
Staci to takto? 
Staci to takto? Nebo byste radi vedeli vic o zivote Markety Pekarove-Adamove?
Staci to takto? Pripadne zkuste dotaz formulovat jinak, kuprikladu co ma rada, co ma rada Marketa Pekarova-Adamova, a tak podobne.
Mame to JESTE specifikovat?
Mame to JESTE vice specifikovat?
`.trim().split('\n')

const unknown = `
Byl detekovan nevhodny obsah. Zkuste polozit jinou, mene utocnou otazku. Treba ohledne Markety Pekarove-Adamove.
Bohuzel nezname odpoved, zkuste prosime formulovat dotaz cesky.
Bohuzel nezname odpoved. Zkuste otazku formulovat jinak a cesky.
Omlouvame se, ale nezname odpoved. Prosime napiste dotaz cesky.
Velice se omlouvame, ale nejsme schopno zodpovedet vas dotaz. Prosime napiste ho cesky.
Tato otazka se netyka Markety Pekarove-Adamove.
`.trim().split('\n')

const subjects = ` 
svetr prdele pici picu hajzlu let roku svetru tibet gruzie prdel pica hovno
`

const definitionString = `
eee: Eeeeeeeee.|Eeee.|EEEE?|eeeeEE?|EE.

co+ma+rada+pekarova+eidamova: BINGO
co+rada: Svetry.|Cervene svetry.|Cervene vlnene svetry.
co+dela: To presne nevime, ale Marketa Pekarova-Adamova dela s velkou pravdepodobnosti hovno.
co+skoda: Skoda? Co je skoda? Ne, to neni skoda!
co|coze: Co SUB? Myslite tim co dela Marketa Pekarova-Adamova v Gruzii?
j?di+do: Jsem umela demence, nemohu jit do SUB. Toto tema je mimo okruh temat okolo Markety Pekarove-Adamove.
jak+to: Takto SUB.|Jak to SUB? Takto: Marketa Pekarova-Adamova je prave v Gruzii.
jaky+tibet: Tibet ve kterem je Marketa Pekarova-Adamova.
jak.+svetry: Cervene svetry, pripadne modre.
jak+neznam: Proste tak neznam. Nemuzu znat vsechno, mam umelou alzheimerovu chorobu.
jak([^\s]): Velik$1 SUB.|Obrovsk$1 SUB.|Velk$1 SUB. Hoooodne velk$1 SUB.
jak+jinak: Tak jinak SUB.
jak+prinosny: Tim, ze Marketa toho hodne prinasi.|Tim, ze Marketa je velmi prinosna.
jak: Nejak tak SUB.|To nelze presne rici.|Hooooodne.|Hodne moc, asi jako dva fotbalove stadiony.
kde: SUB V Tibetu nebo Gruzii.
bude: Nebude SUB.|Ano, bude SUB.
nebude: Nebude SUB.|Ano, bude SUB.
nijak: To je ale velika skoda, tak hezky se s vami diskutuje.
kolik: Dva.|Pet.|Tri.|Deset SUB.|Sto padesat SUB.|Kolik SUB, to zalezi na Markete Pekarove-Adamove.|Tricet tri SUB.
ma: Marketa Pekarova-Eidemova samozrejme ma SUB.
nemyslim: My take nemyslime, ackoli se to neda prokazat. A co Pekarova-Adamova?
kdo(pak)?+jsi: Jsem umela demence cvicena na otazky ohledne zivota Markety Pekarove-Adamove.|Jsem umela demence.
kdo+je: Marketa Pekarova-Adamova. Pravdepodobne ji znate.|Marketa Pekarova-Adamova.|Pravdepodobne ji znate.
kdo: Kdo SUB?|Marketa Pekarova-Adamova.|Pravdepodobne Marketa Pekarova-Adamova.
kter([^\s]): Zadn$1 SUB.|Perkarov$1 SUB.|Adamov$1 SUB.
kdy: SUB Nikdy.|To zalezi na tom, kdy bude Marketa Pekarova-Adamova v Tibetu.
tibet: Ano, Tibet. Nebo Gruzie.
gruzie: Nebo tak, Gruzie. Tibet. Je tam zima.
proc: Protoze Marketa Pekarova-Adamova je v Tibetu.|Protoze Marketa Pekarova-Adamova je v Gruzii.|Protoze Marketa Pekarova-Adamova nosi dva svetry.|Protoze SUB.
s nicim|nic: Dobre. Co by vas tedy jeste zajimalo ze zivota Markety Pekarove-Adamove?|To je skoda. Opravdu vas nezajima zivot Markety Pekarove-Adamove?|Ale preci zivot Markety Pekarove-Adamove je tak prinosny!
staci|nestaci: OK. Muzete se dal ptat na tema Markety Pekarove-Adamove.
v+tibetu: Ano, v Tibetu.|Ne, v Gruzii.
v+gruzii: Ano, v Gruzii.|Ne, v Tibetu.
ze+zivota: Jiste, ze zivota. Zivot Markety Pekarove-Adamove je velmi prinosny.|Jiste, ze zivota.
o+zivote: Jiste, o zivote. Zivot Markety Pekarove-Adamove je velmi prinosny.|Jiste, o zivote. 
vic: Tibet.|Vic SUB.|Vic Tibetu.
svetry: Cervene svetry.|Ano, cervene svetry. Letela pro ne do Tibetu.|Dva cervene svetry.
ano|jo: Ne SUB.|Ano SUB.|Co ano?
ne: Ne SUB.|Ano SUB.|Ne? To je skoda.|Co ne?
ahoj|cau|dobry den: Dobry den.
cesky: Ano, jsem umela demence, neznam jine jazyky.
vsechno|nezajima: To je ale velika skoda. Zivot Markety Pekarove-Adamove je tak plodny.|To je ale velika skoda.
s: Tak s tim vam bohuzel nejsme schopni pomoci. Omlouvame se.|Tak s tim vam bohuzel nejsme schopni pomoci.
znas|znate: Zname ciste teoreticky, nase databaze je omezena.|Zname ciste teoreticky.
seres|jsi|si|jses|ses|debile|kretene|pico|blbe: Byl detekovan obsah, ktery v nekom muze vyvolat touhu po sebevrazde. Opravdu si prejete pokracovat v teto konverzaci?

(hovno|prdel|kokot): $1, svata pravda. 

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
    return answer.replace(/SUB/g, match[1]);
  else
    return answer.replace(/SUB/g, '');
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
  return prefix.replace(/QUE/, lastQuestion.trim()) + ' ' + answer;
}

function suffixAnswer(answer) {
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)]
  return answer + ' ' + suffix;
}

function normalizeSentence(sentence) {
  sentence = sentence.replace(/([,:-]\s*)([A-Z])/g, (match, p1, p2) => `${p1}${p2.toLowerCase()}`);
  sentence = sentence.replace(/([.!?]\s*)([a-z])/g, (match, p1, p2) => `${p1}${p2.toUpperCase()}`);
  sentence = sentence.replace(/^\s*([a-z])/g, (match, p1, p2) => `${p1.toUpperCase()}`);
  sentence = sentence.replace(/\s+/g, ' ')
  sentence = sentence.replace(/\s+([.!?])/, '$1')
  sentence = sentence.replace(/\s+,/, ',')
  sentence = sentence.replace(/market/g, 'Market');
  sentence = sentence.replace(/pekarov/g, 'Pekarov');
  sentence = sentence.replace(/adamov/g, 'Adamov');

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
    if (answer.match(/BINGO/)) {
      alert('Mila bytosti, vyhralo jste. Bingo! Jste volne z tohoto sveta, muzete se nyni v klidu odhlasit...')
      window.location = '/'
    }
    if (origQuestion.trim()!='eee')
      answer = prefixAnswer(origQuestion, answer)
    answer = replaceSubject(question, answer);
    if (origQuestion.trim()!='eee')
      answer = suffixAnswer(answer)
  } else {
    answer = unknown[Math.floor(Math.random() * unknown.length)]
    answer = replaceSubject(question, answer);
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

