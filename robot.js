const firsttimes = `
Dobry den, jsem umela demence v pokrocilem stadium umele alzheimerovy choroby.
Dobry den, jsem umela demence, degenerativni model DGPT-3.
Dobry den, jsem degenerativni model DGPT-3, umela demence nove generace.
Dobry den, jsem umela demence nove generace.
`.trim().split('\n')

const prefixes = `
Jiste. Na otazku QUE je jednoducha odpoved.
Samozrejme. Pokud vas zajima QUE, pak odpoved je nasledujici: 
Omlouvam se, nepochopilo jsme QUE.
Ovsem.
`.trim().split('\n')

const suffixes = `
Jak vam jeste mohu pomoci?
Je to vsechno?
Staci to takto?
Mam to jeste specifikovat?
`.trim().split('\n')

const unknown = `
Byl detekovan nevhodny obsah.
Bohuzel neznam odpoved.
Omlouvam se, ale neznam odpoved.
Velice se omlouvam, nejsem vsak schopno zodpovedet vas dotaz.
`.trim().split('\n')

const subjects = ` 
pocasi clovek ai robot svetr prdele pici hajzlu
`

const definitionString = `
eee: Eeeeeeeee.|Eeee.|EEEE?|eeeeEE?|EE.
ahoj cau: Dobry den.
ano: Ne SUB.|Ano SUB.
ne: Ne SUB.|Ano SUB.
pokracuj: Ano, budu pokracovat.
debile|kretene|pico|blbe: Byl detekovan obsah, ktery v nekom muze vyvolat touhu po sebevrazde. Opravdu si prejete pokracovat v teto konverzaci?

co dela: To nevim, ale Marketa Pekarova-Eidamova dela s velkou pravdepodobnosti hovno.
j?di do: Jsem umela demence, nemohu jit do SUB. Toto tema je mimo okruh temat okolo Markety Pekarove-Eidamove.
jak(.): Dobr$1 SUB.|Spatn$1 SUB.
bude: Nebude SUB.|Ano, bude SUB.
nebude: Nebude SUB.|Ano, bude SUB.
kolik: SUB? Dva.|SUB? Pet.|Kolik, to zalezi na Markete Pekarove-Eidamove.

kdo: Nikdo.|Marketa Pekarova-Eidamova.|Pravdepodobne Marketa Pekarova-Eidamova.
kdo(pak)? jsi: Jsem alterego Markety Pekarove-Eidamove.|Jsem virtualni Marketa Pekarova-Eidamova.
kter(.): Zadn$1.|Perkarov$1.|Eidamov$1.
kdy: Nikdy.|To zalezi na tom, kdy bude Marketa Pekarova-Eidamova v Tibetu.
proc: Protoze Marketa Pekarova-Eidamova je v Tibetu.|Protoze Marketa Pekarova-Eidamova je v Gruzii.

`;


/***************************************************************/

let firstTime = true;

const subjectsRxp = new RegExp(' ' + subjects.trim().split(/\s+/).join('|').toLowerCase() + ' ');

const definition = [];

definitionString.split('\n').forEach(line => {
  if (line.trim().length>0) {
    const matches = line.match('^([^:]+): (.*)$');
    const keyPart = matches[1]
    const valuePart = matches[2]
    const keyParts = keyPart.trim().split(' ').map(part => new RegExp(' ' + part.toLowerCase() + ' ') );
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
    firstTime = false;
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

function robot(question) {
  question = question.toLowerCase().normalize("NFD");
  question = removeDiacritics(question);
  question = question.replace(/[.?,;!:]/, ' ')
  origQuestion = question
  question = ' ' + question + ' '
  let answer = matchQuestion(question, definition);
  if (answer) {
    if (origQuestion!='eee')
      answer = prefixAnswer(origQuestion, answer)
    answer = replaceSubject(question, answer);
    answer = answer.replace(/\s+/, ' ')
    answer = answer.replace(/\s+([.!?])/, '$1')
  } else {
    answer = unknown[Math.floor(Math.random() * unknown.length)]
    answer = prefixAnswer(origQuestion, answer)
  }
  answer = suffixAnswer(answer)
  answer = answer.replace(/\s+/g, ' ')
  return answer;
}

//console.log(robot('budeš tam?'));

