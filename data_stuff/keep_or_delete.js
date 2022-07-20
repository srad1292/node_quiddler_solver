const fs = require("fs");
const prompt = require('prompt-sync')();

async function main() {
    let starting = getDictionary('cleaned.json');
    let filtered = getDictionary('filtered.json');
    if(starting === null || filtered === null) {
        console.log("Error retrieving data from json files");
        return;
    }

    keepOrDelete(starting, filtered);

    saveDictionary(filtered);
}

function getDictionary(fileName) {
    try {
        let content = fs.readFileSync(fileName, 'utf8');
        result = JSON.parse(content);
        return result;
    } catch(error) {
        console.log("Error restoring assets from dictionary file: ", fileName);
        return null;
    }
}

async function keepOrDelete(full, filtered) {
    const words = Object.keys(full);
    const startingIndex = getStartingIndex(full, words);
    askToKeepOrDelete(full, words, startingIndex, filtered);
}

function getStartingIndex(dictionary, words) {
    let startingWord = '';
    do {
        startingWord = prompt('Starting Word(Leave blank to start at beginning): ').trim().toUpperCase();
        console.log(`Dictionary has term ${startingWord}: `, dictionary[startingWord]);
    } while(startingWord !== '' && !dictionary[startingWord]);
    
    return startingWord === '' ? 0 : words.findIndex(word => word === startingWord);
}

async function askToKeepOrDelete(full, words, index, filtered) {
    if(index >= words.length) { return; }

    let response = '';
    let currentWord = full[words[index]];
    console.clear();
    console.log(currentWord);
    console.log(words[index]);
    console.log(`Word ${index} of ${words.length}`);

    do{
        response = prompt("Keep word? (y/n) (q to stop): ");
    } while(response !== 'q' && response !== 'y' && response !== 'n');

    if(response === 'q') { return; }
    if(response === 'y') { filtered[words[index]] = currentWord; }

    askToKeepOrDelete(full, words, index+1, filtered);
}


function saveDictionary(dictionary) {
    fs.writeFile('filtered.json', JSON.stringify(dictionary || {}), (err) => {
        if(err) {
            console.log("Error writing to file");
            console.error(err);
        }
    });
}

main();