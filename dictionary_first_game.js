const DictionaryFirstSolver = require('./dictionary_first_solver.js');
const TrieSolver = require('./trie_solver');

function play() {
    let solver = new DictionaryFirstSolver();
    let words = solver.getWords('./data/dictionary.json');
    if(!words) { return; }

    // let hand = ['er','e','n','in','i','n','r'];//solver.askForHand();
    let hand = ['er','qu','i','d','i','z','p','s'];//solver.askForHand();
    let found = solver.findWords(words, hand);
    console.log("All Words");
    console.table(found.sort((a,b) => a.word.localeCompare(b.word)));
    // let combos = solver.getCombos(hand, found);
    // solver.outputPlays(combos);

    let trieSolver = new TrieSolver();
    let trie = trieSolver.buildTrie(words);
    let trieFound = trieSolver.findWords(trie, hand);
    console.log("Trie all words");
    console.table(trieFound.sort((a,b) => a.word.localeCompare(b.word)));
}

play();