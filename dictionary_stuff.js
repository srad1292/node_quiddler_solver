const fs = require('fs');

function getWords(fileName) {
    try {
        let content = fs.readFileSync(fileName, 'utf8');
        let result = JSON.parse(content);
        let small = result.filter(word => word.length <= 3);
        fs.writeFileSync('./data/short_words.json', JSON.stringify(small));
    } catch(error) {
        console.log("Error reading from: ", fileName);
    }
}

getWords('./data/dictionary.json');