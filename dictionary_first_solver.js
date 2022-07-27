const fs = require("fs");
const prompt = require('prompt-sync')();
const Word = require('./classes/word');
const getDeck = require('./classes/deck');


function DictionaryFirstSolver() {
    this.getWords = function(fileName) {
        try {
            let content = fs.readFileSync(fileName, 'utf8');
            let result = JSON.parse(content);
            return result;
        } catch(error) {
            console.log("Error reading from: ", fileName);
            return null;
        }
    }
    
    this.askForHand = function(){
        let hand = '';
        let good = false;
        do {
            hand = prompt('Enter hand(comma separated): ').trim().toLowerCase();
            if(hand.split(',').length > 2 && hand.split(',').length < 12) { good = true; }
            else{ console.log('Please enter between 3-11 cards'); }
        } while(!good);
        
        return hand.split(',');
    }

    this.findWords = function(words, hand) {
        let matchingIndex;
        let found=[];
        let permutationBuilder;
        let permutationHand;
        const deck = getDeck();
        function checkPermutation(remainingLetters, remainingHand, wordBuilder, points) {
            let index = 0;
            while(index < remainingLetters.length) {
                //If current and next letter matches one of the multi letter cards, split off into checking for that card
                if(deck[remainingLetters[index]].preMulti && index < remainingLetters.length-1 && deck.hasOwnProperty(`${remainingLetters[index]}${remainingLetters[index+1]}`)) {
                    matchingIndex = remainingHand.findIndex(card => card.localeCompare(`${remainingLetters[index]}${remainingLetters[index+1]}`) === 0);
                    if(matchingIndex === -1) { break; }
                    permutationBuilder = [...wordBuilder];
                    permutationBuilder.push(remainingHand[matchingIndex]);
                    if(index === remainingLetters.length-2) {
                        if(permutationBuilder.length > 1) {
                            found.push(new Word(permutationBuilder.join('-'), points+deck[remainingHand[matchingIndex]].points));
                        }
                    } else {
                        permutationHand = [...remainingHand];
                        permutationHand.splice(matchingIndex,1);
                        checkPermutation(remainingLetters.slice(index+2), permutationHand, [...permutationBuilder], points+deck[remainingHand[matchingIndex]].points);
                    }
                }

                matchingIndex = remainingHand.findIndex(card => card.localeCompare(remainingLetters[index]) === 0);
                if(matchingIndex === -1) { break; }

                wordBuilder.push(remainingHand[matchingIndex]);
                points += deck[remainingHand[matchingIndex]].points;

                if(index === remainingLetters.length-1) {
                    if(wordBuilder.length > 1){
                        found.push(new Word(wordBuilder.join('-'), points));
                    }
                    break;
                } 
                remainingHand.splice(matchingIndex,1);
                index++;
            }
        }
        for(let word of words) {
            checkPermutation(word, [...hand], [], 0);
        }
        return found;
    }
    
    this.getCombos = function(hand, words) {
        //for each word, see if all the letters are in the current hand
        //if so, clone the current combo, add the word to it, and push to the list of combos
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
                    let length = combos.push({combo: currentCombo, total: points+word.points-pointsLeftInHand, longest: Math.max(longestWord, lettersInWord.join('').length), discard: discard[0] || ''});
                    if(length > 1 && isSubset(combos[length-2].combo, combos[length-1].combo)) {
                        combos.splice(length-2, 1);
                    }
                    addToComboIfPossible(remaningHand, currentCombo, points+word.points, Math.max(longestWord, lettersInWord.join('').length));
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
    
    
    this.outputPlays = function(combos) {
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
}


module.exports = DictionaryFirstSolver;