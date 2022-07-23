const TrieSolver = require('./trie_solver');
const DictionaryFirstSolver = require('./dictionary_first_solver');
const prompt = require('prompt-sync')();
const fs = require('fs');

function play() {
    let dictionarySolver = new DictionaryFirstSolver();
    let trieSolver = new TrieSolver();
    let words = getWords('./data/dictionary.json');
    if(!words) { return; }

    let trie = trieSolver.buildTrie(words);

    let letters = ''; 
    let hand = [];
    let found = [];
    let combos = [];
    while(true) {
        letters = askForHand();
        if(letters === 'q') { break; }
        hand = letters.split(',');
        if(hand.length < 9) {
            found = trieSolver.findWords(trie, hand);
            combos = trieSolver.getCombos(hand,found);
            console.log("All Words");
            console.table(found);
            console.log("Results");
            trieSolver.outputPlays(combos);
        } else {
            found = dictionarySolver.findWords(words, hand);
            combos = dictionarySolver.getCombos(hand, found);
            console.log("All Words");
            console.table(found);
            console.log("Results");
            dictionarySolver.outputPlays(combos);
        }
        
    }
}

function getWords(fileName) {
    try {
        let content = fs.readFileSync(fileName, 'utf8');
        let result = JSON.parse(content);
        return result;
    } catch(error) {
        console.log("Error reading from: ", fileName);
        return null;
    }
}

function askForHand(){
    let hand = '';
    let good = false;
    do {
        hand = prompt('Enter hand(comma separated)(q to quit): ').trim().toLowerCase();
        if(hand.split(',').length > 2 && hand.split(',').length < 12 || hand==='q') { good = true; }
        else{ console.log('Please enter between 3-11 cards'); }
    } while(!good);
    
    return hand;
}

play();