const Trie = require('./trie');
const fs = require("fs");
const prompt = require('prompt-sync')();

function test() {
    let trie = new Trie();
    // trie.printDeck();

    trie.addWord("dog");
    // trie.addWord("boggle");
    // trie.addWord("crazy");
    // trie.addWord("inside");
    // trie.addWord("close");
    trie.addWord("with");
    trie.addWord("in");

    trie.printWordsWithPoints('-');
}


function play() {
    let words = getWords('./dictionary.json');
    if(!words) { return; }

    let trie = buildTrie(words);
    let hand = askForHand();
    let found = findWords(trie, hand);
    console.table(found);
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

function buildTrie(words){
    let trie = new Trie();
    words.forEach(word => {
        trie.addWord(word);
    });
    return trie;
}

function askForHand(){
    let hand = '';
    let good = false;
    do {
        hand = prompt('Enter hand(comma separated): ').trim().toLowerCase();
        if(hand.split(',').length > 2 && hand.split(',').length < 12) { good = true; }
        else{ console.log('Please enter between 3-11 cards'); }
    } while(!good);
    
    return hand.split(',');
}

function findWords(trie, hand){
    console.log("made it to find words");
    let found = [];
    let card, newCards, word, next, points;

    function accum(letters, cards) {
        for(let idx = 0; idx < letters.length; idx++) {
            card = letters[idx];
            newCards = [...cards, card];
            word = newCards.join('-');
            points = trie.getPoints(word, '-');
            if(points && newCards.length >= 2) {
                found.push({word, points});
            }
            next = [...letters];
            next.splice(idx, 1);
            accum(next, newCards);
        }
    }

    accum(hand, []);

    return found;
}


// test();
play();