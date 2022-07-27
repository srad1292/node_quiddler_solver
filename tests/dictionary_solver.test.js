const DictionaryFirstSolver = require('../dictionary_first_solver');


describe("Find words gets the word/point list", () => {
    test("Correct length of response when there are no words", () => {
        const solver = new DictionaryFirstSolver();
        const hand = ['a','b','c','d'];
        const dictionary = ['teg','get'];
        const words = solver.findWords(dictionary,hand);
        expect(words.length).toBe(0);
    });

    test("Correct length of response when there are words", () => {
        const solver = new DictionaryFirstSolver();
        const hand = ['t','g','e','qu','z'];
        const dictionary = ['teg','get'];
        const words = solver.findWords(dictionary,hand);
        expect(words.length).toBe(2);
    });

    test("Word found: get", () => {
        const solver = new DictionaryFirstSolver();
        const hand = ['t','g','e','qu','z'];
        const dictionary = ['teg','get'];
        const words = solver.findWords(dictionary,hand);
        expect(words.findIndex(word => word.word.localeCompare('g-e-t'))).toBeGreaterThanOrEqual(0);
    });

    test("Word found: teg", () => {
        const solver = new DictionaryFirstSolver();
        const hand = ['t','g','e','qu','z'];
        const dictionary = ['teg','get'];
        const words = solver.findWords(dictionary,hand);
        expect(words.findIndex(word => word.word.localeCompare('t-e-g'))).toBeGreaterThanOrEqual(0);
    });

    test("Word value calculated: get", () => {
        const solver = new DictionaryFirstSolver();
        const hand = ['t','g','e','qu','z'];
        const dictionary = ['teg','get'];
        const words = solver.findWords(dictionary,hand);
        const word = words.find(word => word.word.localeCompare('g-e-t'));
        expect(word.points).toBeGreaterThanOrEqual(11);
    });

    test("Word value calculated: teg", () => {
        const solver = new DictionaryFirstSolver();
        const hand = ['t','g','e','qu','z'];
        const dictionary = ['teg','get'];
        const words = solver.findWords(dictionary,hand);
        const word = words.find(word => word.word.localeCompare('t-e-g'));
        expect(word.points).toBeGreaterThanOrEqual(11);
    });

    test("Word with multi letter card found: in-quire", () => {
        const solver = new DictionaryFirstSolver();
        const hand = ['in','i','n','qu','r','e','z'];
        const dictionary = ['in', 'inquire', 'inside','zoo'];
        const words = solver.findWords(dictionary,hand);
        expect(words.findIndex(word => word.word.localeCompare('in-qu-i-r-e'))).toBeGreaterThanOrEqual(0);
    });

    test("Word with multi letter card and single found: i-n-quire", () => {
        const solver = new DictionaryFirstSolver();
        const hand = ['in','i','n','qu','r','e','z'];
        const dictionary = ['in', 'inquire', 'inside','zoo'];
        const words = solver.findWords(dictionary,hand);
        expect(words.findIndex(word => word.word.localeCompare('i-n-qu-i-r-e'))).toBeGreaterThanOrEqual(0);
    });
});

describe("Get combos", () => {
    test("Returns correct length of combos where each combo is one word", () => {
        const solver = new DictionaryFirstSolver();
        const hand = ['t','g','e','qu','z'];
        const dictionary = ['teg','get'];
        const words = solver.findWords(dictionary,hand);
        const combos = solver.getCombos(hand, words);
        expect(combos.length).toBe(2);
    });

    test("Chooses the unused card with highest value to discard", () => {
        // Cards remaining should be 'qu' and 'z'
        // 'qu' is worth 9 and 'z' is worth 14 so discard the 'z'
        const solver = new DictionaryFirstSolver();
        const hand = ['t','g','e','qu','z'];
        const dictionary = ['teg','get'];
        const words = solver.findWords(dictionary,hand);
        const combos = solver.getCombos(hand, words);
        const comboToCheck = combos[0];
        expect(comboToCheck.discard).toBe('z');
    });

    test("Calculates total when there are cards left in hand", () => {
        // Cards remaining should be 'qu' and 'z'
        // 'qu' is worth 9 and 'z' is worth 14 so discard the 'z'
        // leaves -9 in the hand on top of the 11 from 'get' 
        // which means the combo should be worth 2 points
        const solver = new DictionaryFirstSolver();
        const hand = ['t','g','e','qu','z'];
        const dictionary = ['teg','get'];
        const words = solver.findWords(dictionary,hand);
        const combos = solver.getCombos(hand, words);
        const comboToCheck = combos[0];
        expect(comboToCheck.total).toBe(2);
    });

    test("Longest word is based on letters and not cards", () => {
        const solver = new DictionaryFirstSolver();
        const hand = ['cl','o','w','n','d','z'];
        const dictionary = ['clown'];
        const words = solver.findWords(dictionary,hand);
        const combos = solver.getCombos(hand,words);
        const combo = combos[0];
        expect(combo.longest).toBeGreaterThanOrEqual(5);
    });
});