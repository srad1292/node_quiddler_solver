const DictionaryFirstSolver = require("../dictionary_first_solver");

function measure(short, long, runs) {
    let solver = new DictionaryFirstSolver();
    let words = solver.getWords('./data/dictionary.json');
    if(!words) { return; }
    let hand = ['d','cl','o','g','a','b','er','in','n','y','s'];
    let result = [];
    
    for(let handSize = short; handSize <= long; handSize++) {
        let quick = -1;
        let slow = -1;
        let total = 0;
        let testHand = hand.slice(0,handSize);
        for(let run = 0; run < runs; run++) {
            let start = performance.now();
            let found = solver.findWords(words, testHand);
            let combos = solver.getCombos(testHand, found);
            let end = performance.now();
            let time = (end-start)/1000;
            slow = slow === -1 ? time : Math.max(slow, time);
            quick = quick === -1 ? time : Math.min(quick, time);
            total += time;
        }
        result.push({handSize, slow, quick, average: total/runs});
    }

    console.table(result);
    
}

measure(11,11,1);