const TrieSolver = require('../trie_solver');
const Trie = require('../trie');

// g,e,t,z,qu
describe("Build trie", () => {
    test("Adds all the given words to the trie", () => {
        const trieSolver = new TrieSolver();
        const trie = trieSolver.buildTrie(['teg','get']);
        expect(trie.hasWord('teg')).toBe(true);
    });
    
    test("Adds all the given words to the trie", () => {
        const trieSolver = new TrieSolver();
        const trie = trieSolver.buildTrie(['teg','get']);
        expect(trie.hasWord('get')).toBe(true);
    });
    
    test("Only adds the given words", () => {
        const trieSolver = new TrieSolver();
        const trie = trieSolver.buildTrie(['teg','get']);
        expect(trie.hasWord('cat')).toBe(false);
    });
});

describe("Find words gets the word/point list", () => {
    test("Correct length of response when there are no words", () => {
        const trieSolver = new TrieSolver();
        const trie = trieSolver.buildTrie(['teg','get']);
        const hand = ['a','b','c','d'];
        const words = trieSolver.findWords(trie,hand);
        expect(words.length).toBe(0);
    });

    test("Correct length of response when there are words", () => {
        const trieSolver = new TrieSolver();
        const trie = trieSolver.buildTrie(['teg','get']);
        const hand = ['t','g','e','qu','z'];
        const words = trieSolver.findWords(trie,hand);
        expect(words.length).toBe(2);
    });

    test("Word found: get", () => {
        const trieSolver = new TrieSolver();
        const trie = trieSolver.buildTrie(['teg','get']);
        const hand = ['t','g','e','qu','z'];
        const words = trieSolver.findWords(trie,hand);
        expect(words.findIndex(word => word.word.localeCompare('g-e-t'))).toBeGreaterThanOrEqual(0);
    });

    test("Word found: teg", () => {
        const trieSolver = new TrieSolver();
        const trie = trieSolver.buildTrie(['teg','get']);
        const hand = ['t','g','e','qu','z'];
        const words = trieSolver.findWords(trie,hand);
        expect(words.findIndex(word => word.word.localeCompare('t-e-g'))).toBeGreaterThanOrEqual(0);
    });

    test("Word value calculated: get", () => {
        const trieSolver = new TrieSolver();
        const trie = trieSolver.buildTrie(['teg','get']);
        const hand = ['t','g','e','qu','z'];
        const words = trieSolver.findWords(trie,hand);
        const word = words.find(word => word.word.localeCompare('g-e-t'));
        expect(word.points).toBeGreaterThanOrEqual(11);
    });

    test("Word value calculated: teg", () => {
        const trieSolver = new TrieSolver();
        const trie = trieSolver.buildTrie(['teg','get']);
        const hand = ['t','g','e','qu','z'];
        const words = trieSolver.findWords(trie,hand);
        const word = words.find(word => word.word.localeCompare('t-e-g'));
        expect(word.points).toBeGreaterThanOrEqual(11);
    });

    test("Word with multi letter card found: in-quire", () => {
        const trieSolver = new TrieSolver();
        const trie = trieSolver.buildTrie(['in', 'inquire', 'inside','zoo']);
        const hand = ['in','i','n','qu','r','e','z'];
        const words = trieSolver.findWords(trie,hand);
        expect(words.findIndex(word => word.word.localeCompare('in-qu-i-r-e'))).toBeGreaterThanOrEqual(0);
    });

    test("Word with multi letter card and single found: i-n-quire", () => {
        const trieSolver = new TrieSolver();
        const trie = trieSolver.buildTrie(['in', 'inquire', 'inside','zoo']);
        const hand = ['in','i','n','qu','r','e','z'];
        const words = trieSolver.findWords(trie,hand);
        expect(words.findIndex(word => word.word.localeCompare('i-n-qu-i-r-e'))).toBeGreaterThanOrEqual(0);
    });
});

describe("Get combos", () => {
    test("Returns correct length of combos where each combo is one word", () => {
        const trieSolver = new TrieSolver();
        const trie = trieSolver.buildTrie(['teg','get']);
        const hand = ['t','g','e','qu','z'];
        const words = trieSolver.findWords(trie,hand);
        const combos = trieSolver.getCombos(hand, words);
        expect(combos.length).toBe(2);
    });

    test("Chooses the unused card with highest value to discard", () => {
        // Cards remaining should be 'qu' and 'z'
        // 'qu' is worth 9 and 'z' is worth 14 so discard the 'z'
        const trieSolver = new TrieSolver();
        const trie = trieSolver.buildTrie(['teg','get']);
        const hand = ['t','g','e','qu','z'];
        const words = trieSolver.findWords(trie,hand);
        const combos = trieSolver.getCombos(hand, words);
        const comboToCheck = combos[0];
        expect(comboToCheck.discard).toBe('z');
    });

    test("Calculates total when there are cards left in hand", () => {
        // Cards remaining should be 'qu' and 'z'
        // 'qu' is worth 9 and 'z' is worth 14 so discard the 'z'
        // leaves -9 in the hand on top of the 11 from 'get' 
        // which means the combo should be worth 2 points
        const trieSolver = new TrieSolver();
        const trie = trieSolver.buildTrie(['teg','get']);
        const hand = ['t','g','e','qu','z'];
        const words = trieSolver.findWords(trie,hand);
        const combos = trieSolver.getCombos(hand, words);
        const comboToCheck = combos[0];
        expect(comboToCheck.total).toBe(2);
    });
});