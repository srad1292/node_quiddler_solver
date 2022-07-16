const Trie = require('../trie');
const TrieNode = require('../trie_node');

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

test('addWord gives correct score for: c-l-ose', () => {
    const trie = new Trie();
    trie.addWord('close');
    const words = trie.getWordsWithPoints();
    const points = words.find(word => word.word === 'close').points;
    expect(points).toBe(18);
});

// test('addWord gives correct score for: cl-ose', () => {
//     const trie = new Trie();
//     trie.addWord('close');
//     const words = trie.getWordsWithPoints();
//     const points = words.find(word => word.word === 'close').points;
//     // will be 17 once implemented
//     expect(points).toBe(18);
// });

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

