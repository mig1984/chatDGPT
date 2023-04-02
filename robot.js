const subjects = / (pocasi|mesto|clovek|ai|robot) /

const unknown = [
  'Sorry jako, ale tohle je harmful content.', 
  'Pravdepodobne je to kravina.', 
  'To nevim. Zkus to znovu.']

const definitionString = `
eee: Eeeeeeeee.|Eeee.|EEEE?|eeeeEE?|EE.
debile: Harmful content warning: ty ses debil!
jake: Dobre SUB.|Spatne SUB.
bude: Nebude.
kdo: Nikdo.|Tomas|Nekdo
kdo jsi: Nevim.|Tezko rict.
kdo(pak)? jsi: Jsem Jan.|Jsem Karel.
kter(.): Zadn$1.
`;


/***************************************************************/

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
  const match = question.match(subjects)
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

function robot(question) {
  question = question.toLowerCase()
  question = removeDiacritics(question);
  question = question.replace(/[.?,;!:]/, ' ')
  question = ' ' + question + ' '
  let answer = matchQuestion(question, definition);
  if (answer) {
    answer = replaceSubject(question, answer);
    answer = answer.replace(/\s+/, ' ')
    answer = answer.replace(/\s+([.!?])/, '$1')
  } else {
    answer = unknown[Math.floor(Math.random() * unknown.length)]
  }
  return answer;
}

//console.log(robot('budeš tam?'));

