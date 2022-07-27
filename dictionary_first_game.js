const DictionaryFirstSolver = require('./dictionary_first_solver.js');

function play() {
    let solver = new DictionaryFirstSolver();
    let words = solver.getWords('./data/dictionary.json');
    if(!words) { return; }

    // let hand = ['er','qu','i','d','i','z','p','s','e','f','g'];
    let hand = solver.askForHand();
    let found = solver.findWords(words, hand);
    console.log("All Words");
    console.table(found.sort((a,b) => a.word.localeCompare(b.word)));
    let combos = solver.getCombos(hand, found);
    solver.outputPlays(combos);
}

play();