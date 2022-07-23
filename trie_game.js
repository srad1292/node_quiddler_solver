const TrieSolver = require('./trie_solver');

function play() {
    let trieSolver = new TrieSolver();
    let words = trieSolver.getWords('./data/dictionary.json');
    if(!words) { return; }

    let trie = trieSolver.buildTrie(words);
    let hand = ['er','e','n','in','i','n','r'];//trieSolver.askForHand();
    let found = trieSolver.findWords(trie, hand);
    console.log("All Words");
    console.table(found);
    // let combos = trieSolver.getCombos(hand, found);
    // trieSolver.outputPlays(combos);
}

play();