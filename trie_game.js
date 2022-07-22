const Trie = require('./trie');
const Word = require('./word');
const fs = require("fs");
const getDeck = require('./deck');
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
    let hand = ['a','m','n','w','o','g','i'];//askForHand();
    let found = findWords(trie, hand);
    console.log("All Words");
    console.table(found);
    let combos = getCombos(hand, found);
    // console.log("Combos");
    // console.log(combos);
    outputPlays(combos);
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
                found.push(new Word(word, points));
            }
            next = [...letters];
            next.splice(idx, 1);
            accum(next, newCards);
        }
    }

    accum(hand, []);

    return found;
}

function getCombos(hand, words) {
    //for each word, see if all the letters are in the current hand
    //if so, clone the current combo, add the word to it, and push to the list of combos
    console.log(words[0]);
    let combos = [];
    let remaningHand = [];
    let handAfterDiscard = [];
    let lettersInWord = [];
    let indexToRemove = 0;
    let wordInCard = false;
    let currentCombo = [];
    let pointsLeftInHand = 0;
    let deck = getDeck();
    let discard;
    function addToComboIfPossible(hand, combo, points, longestWord) {
        for(let word of words) {
            wordInCard = true;
            lettersInWord = word.word.split('-');
            remaningHand = [...hand];
            lettersInWord.forEach(letter => {
                indexToRemove = remaningHand.findIndex(card => card.localeCompare(letter) === 0);
                if(indexToRemove === -1) {
                    wordInCard = false;
                } else {
                    remaningHand.splice(indexToRemove, 1);
                }
            });
            if(wordInCard && remaningHand.length>0) {
                handAfterDiscard = [...remaningHand];
                discard = handAfterDiscard.sort((a,b) => deck[b].points - deck[a].points).splice(0,1);
                pointsLeftInHand = handAfterDiscard.reduce((accum,letter) => accum + deck[letter].points, 0);
                
                currentCombo = [...combo, word.word];
                let length = combos.push({combo: currentCombo, total: points+word.points-pointsLeftInHand, longest: Math.max(longestWord, lettersInWord.length), discard});
                if(length > 1 && isSubset(combos[length-2].combo, combos[length-1].combo)) {
                    combos.splice(length-2, 1);
                }
                addToComboIfPossible(remaningHand, currentCombo, points+word.points, Math.max(longestWord, lettersInWord.length));
            } 
        }
    }

    function isSubset(one, two) {
        if(one.length !== two.length-1) { return false; }
        let isSubset = true;
        one.forEach((word, index) => {
            if(word.localeCompare(two[index]) !== 0) {
                isSubset = false;
            }
        });
        return isSubset;
    }

    addToComboIfPossible(hand, [], 0, 0);
    return combos;
}


function outputPlays(combos) {
    console.log("Best plays by total points with word count favor");
    let bestByPoints = combos.sort((a,b) => b.total-a.total || b.combo.length - a.combo.length).slice(0,6);
    console.table(bestByPoints);

    console.log("Best plays by total points with longest word favor");
    let bestByPointsLong = combos.sort((a,b) => b.total-a.total || b.longest - a.longest).slice(0,6);
    console.table(bestByPointsLong);

    console.log("Best plays by Number of words");
    let bestByNumWords = combos.sort((a,b) => b.combo.length - a.combo.length || b.total-a.total).slice(0,6);
    console.table(bestByNumWords);

    console.log("Best plays by word length");
    let bestByWordLength = combos.sort((a,b) => b.longest - a.longest || b.total-a.total).slice(0,6);
    console.table(bestByWordLength);
}


// test();
play();