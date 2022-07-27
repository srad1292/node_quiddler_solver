const DictionaryFirstSolver = require("../dictionary_first_solver");

function measure(short, long, runs) {
    let solver = new DictionaryFirstSolver();
    let words = solver.getWords('./data/dictionary.json');
    if(!words) { return; }
    let hand = ['d','cl','o','g','a','b','er','in','n','y','s'];
    let result = [];
    
    let quick = -1;
    let slow = -1;
    let total = 0;
    let testHand = [];
    for(let handSize = short; handSize <= long; handSize++) {
        quick = -1;
        slow = -1;
        total = 0;
        testHand = hand.slice(0,long);
        for(let run = 0; run < runs; run++) {
            let start = Number(process.hrtime.bigint())/1000000000;
            let found = solver.findWords(words, testHand);
            let combos = solver.getCombos(testHand, found);
            let end = Number(process.hrtime.bigint())/1000000000;
            let time = (end-start);
            slow = slow === -1 ? time : Math.max(slow, time);
            quick = quick === -1 ? time : Math.min(quick, time);
            total += time;
        }
        result.push({long, slow, quick, average: total/runs});
    }

    console.table(result);
    
}

measure(4,9,15);