const Trie = require('../classes/trie');
const TrieNode = require('../classes/trie_node');

test('constructor creates root - pt 0 - instance of TrieNode', () => {
    const trie = new Trie();
    expect(trie.root).toBeInstanceOf(TrieNode);
});

test('constructor creates root - pt 1 - letters', () => {
    const trie = new Trie();
    expect(trie.root.letters).toBe('');
});

test('constructor creates root - pt 1 - isWord', () => {
    const trie = new Trie();
    expect(trie.root.isWord).toBe(false);
});

test('addWord adds given word', () => {
    const trie = new Trie();
    trie.addWord('dog');
    expect(trie.hasWord('dog')).toBe(true);
});

test('addWord gives correct score for: dog', () => {
    const trie = new Trie();
    trie.addWord('dog');
    const words = trie.getWordsWithPoints();
    const points = words.find(word => word.word === 'dog').points;
    expect(points).toBe(13);
});

test('addWord gives correct score for word with double letter at start: c-l-o-s-e', () => {
    const trie = new Trie();
    trie.addWord('close');
    const words = trie.getWordsWithPoints('-');
    const points = words.find(word => word.word === 'c-l-o-s-e').points;
    expect(points).toBe(18);
});

test('addWord gives correct score for with double letter at start: cl-o-s-e', () => {
    const trie = new Trie();
    trie.addWord('close');
    const words = trie.getWordsWithPoints('-');
    const points = words.find(word => word.word === 'cl-o-s-e').points;
    expect(points).toBe(17);
});

test('addWord gives correct score for with double letter at end: w-i-t-h', () => {
    const trie = new Trie();
    trie.addWord('with');
    const words = trie.getWordsWithPoints('-');
    const points = words.find(word => word.word === 'w-i-t-h').points;
    expect(points).toBe(22);
});

test('addWord gives correct score for with double letter at end: w-i-th', () => {
    const trie = new Trie();
    trie.addWord('with');
    const words = trie.getWordsWithPoints('-');
    const points = words.find(word => word.word === 'w-i-th').points;
    expect(points).toBe(21);
});

test('addWord gives correct score for contained double letters: o-r-i-g-i-n-a-l', () => {
    const trie = new Trie();
    trie.addWord('original');
    const words = trie.getWordsWithPoints('-');
    const points = words.find(word => word.word === 'o-r-i-g-i-n-a-l').points;
    expect(points).toBe(27);
});

test('addWord gives correct score for contained double letters: o-r-i-g-in-a-l', () => {
    const trie = new Trie();
    trie.addWord('original');
    const words = trie.getWordsWithPoints('-');
    const points = words.find(word => word.word === 'o-r-i-g-in-a-l').points;
    expect(points).toBe(27);
});

test('addWord gives correct score for multiple double letters separated: in-s-i-d-er', () => {
    const trie = new Trie();
    trie.addWord('insider');
    const words = trie.getWordsWithPoints('-');
    const points = words.find(word => word.word === 'in-s-i-d-er').points;
    expect(points).toBe(24);
});

test('addWord gives correct score for multiple double letters separated: i-n-s-i-d-er', () => {
    const trie = new Trie();
    trie.addWord('insider');
    const words = trie.getWordsWithPoints('-');
    const points = words.find(word => word.word === 'i-n-s-i-d-er').points;
    expect(points).toBe(24);
});

test('addWord gives correct score for multiple double letters separated: in-s-i-d-e-r', () => {
    const trie = new Trie();
    trie.addWord('insider');
    const words = trie.getWordsWithPoints('-');
    const points = words.find(word => word.word === 'in-s-i-d-e-r').points;
    expect(points).toBe(24);
});

test('addWord gives correct score for multiple double letters separated: i-n-s-i-d-e-r', () => {
    const trie = new Trie();
    trie.addWord('insider');
    const words = trie.getWordsWithPoints('-');
    const points = words.find(word => word.word === 'i-n-s-i-d-e-r').points;
    expect(points).toBe(24);
});

test('addWord gives correct score for multiple adjacent double letters: w-i-t-h-e-r', () => {
    const trie = new Trie();
    trie.addWord('wither');
    const words = trie.getWordsWithPoints('-');
    const points = words.find(word => word.word === 'w-i-t-h-e-r').points;
    expect(points).toBe(29);
});

test('addWord gives correct score for multiple adjacent double letters: w-i-t-h-er', () => {
    const trie = new Trie();
    trie.addWord('wither');
    const words = trie.getWordsWithPoints('-');
    const points = words.find(word => word.word === 'w-i-t-h-er').points;
    expect(points).toBe(29);
});

test('addWord gives correct score for multiple adjacent double letters: w-i-th-e-r', () => {
    const trie = new Trie();
    trie.addWord('wither');
    const words = trie.getWordsWithPoints('-');
    const points = words.find(word => word.word === 'w-i-th-e-r').points;
    expect(points).toBe(28);
});

test('addWord gives correct score for multiple adjacent double letters: w-i-th-er', () => {
    const trie = new Trie();
    trie.addWord('wither');
    const words = trie.getWordsWithPoints('-');
    const points = words.find(word => word.word === 'w-i-th-er').points;
    expect(points).toBe(28);
});

test('addWord gives correct score for double card that is also a word: i-n', () => {
    const trie = new Trie();
    trie.addWord('in');
    const words = trie.getWordsWithPoints('-');
    const points = words.find(word => word.word === 'i-n').points;
    expect(points).toBe(7);
});

test('addWord gives correct score for double card that is also a word: in', () => {
    const trie = new Trie();
    trie.addWord('in');
    const words = trie.getWordsWithPoints('-');
    const points = words.find(word => word.word === 'in').points;
    expect(points).toBe(7);
});

test('addWord does not mark leading letters as words', () => {
    const trie = new Trie();
    trie.addWord('dog');
    expect(trie.hasWord('do')).toBe(false);
});

test('addWord correctly marks end node of smaller word if it is part of an existing word', () => {
    const trie = new Trie();
    trie.addWord('dog');
    trie.addWord('do');
    expect(trie.hasWord('do')).toBe(true);
});

test('hasWord returns false when no words exist', () => {
    const trie = new Trie();
    expect(trie.hasWord('dog')).toBe(false);
});

test('hasWord returns false when letters found but last node not marked as a word', () => {
    const trie = new Trie();
    trie.addWord('dog');
    expect(trie.hasWord('do')).toBe(false);
});

test('hasWord returns false when match not found', () => {
    const trie = new Trie();
    trie.addWord('dog');
    expect(trie.hasWord('cat')).toBe(false);
});

test('hasWord returns true when match', () => {
    const trie = new Trie();
    trie.addWord('dog');
    expect(trie.hasWord('dog')).toBe(true);
});

test('getWords returns empty array for empty trie', () => {
    const trie = new Trie();
    expect(trie.getWords()).toEqual([]);
});

test('getWords returns matching array for trie with one word', () => {
    const trie = new Trie();
    trie.addWord('dog')
    expect(trie.getWords()).toEqual(['dog']);
});

test('getWords returns matching array for trie with one word', () => {
    const trie = new Trie();
    trie.addWord('dog');
    trie.addWord('gadget');
    trie.addWord('go');
    trie.addWord('hello');
    expect(trie.getWords()).toEqual(['dog', 'gadget', 'go', 'hello']);
});

