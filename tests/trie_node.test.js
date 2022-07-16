const TrieNode = require('../trie_node');

test('Letters property set', () => {
    const node = new TrieNode('a', 0);
    expect(node.letters).toBe('a');
});

test('Points property set', () => {
    const node = new TrieNode('a', 2);
    expect(node.points).toBe(2);
});

test('isWord set to false when no argument passed', () => {
    const node = new TrieNode('a', 0);
    expect(node.isWord).toBe(false);
});

test('isWord set to false when explictly passed', () => {
    const node = new TrieNode('a', 0, false);
    expect(node.isWord).toBe(false);
});

test('isWord set to true when passed', () => {
    const node = new TrieNode('a', 0, true);
    expect(node.isWord).toBe(true);
});

test('addChild adds new child to node', () => {
    const node = new TrieNode('', 0);
    const child = new TrieNode('a', 0, false);
    node.addChild(child);
    expect(node.children.hasOwnProperty('a')).toBe(true);
});

test('addChild does not overwrite existing child if matching letters given - part 1, letters', () => {
    const node = new TrieNode('', 0);
    const child = new TrieNode('a', 0, false);
    const duplicate = new TrieNode('a', 0, true);
    node.addChild(child);
    node.addChild(duplicate);
    expect(node.children.hasOwnProperty('a')).toBe(true);
});

test('addChild does not overwrite existing child if matching letters given - part 2, isWord', () => {
    const node = new TrieNode('', 0);
    const child = new TrieNode('a', 0, false);
    const duplicate = new TrieNode('a', 0, true);
    node.addChild(child);
    node.addChild(duplicate);
    expect(node.isWord).toBe(false);
});

test('hasChild returns false when no children set', () => {
    const node = new TrieNode('', 0);
    expect(node.hasChild('a')).toBe(false);
});

test('hasChild returns false when no children match', () => {
    const node = new TrieNode('', 0);
    const child = new TrieNode('a', 0);
    node.addChild(child);
    expect(node.hasChild('b')).toBe(false);
});

test('hasChild returns true when a match is found', () => {
    const node = new TrieNode('', 0);
    const child = new TrieNode('a', 0);
    node.addChild(child);
    expect(node.hasChild('a')).toBe(true);
});