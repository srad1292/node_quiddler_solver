const TrieNode = require('../trie_node');

test('Value property set', () => {
    const node = new TrieNode('a');
    expect(node.value).toBe('a');
});

test('isWord set to false when no argument passed', () => {
    const node = new TrieNode('a');
    expect(node.isWord).toBe(false);
});

test('isWord set to false when explictly passed', () => {
    const node = new TrieNode('a', false);
    expect(node.isWord).toBe(false);
});

test('isWord set to true when passed', () => {
    const node = new TrieNode('a', true);
    expect(node.isWord).toBe(true);
});

test('addChild adds new child to node', () => {
    const node = new TrieNode('');
    const child = new TrieNode('a', false);
    node.addChild(child);
    expect(node.children.hasOwnProperty('a')).toBe(true);
});

test('addChild does not overwrite existing child if matching value given - part 1, value', () => {
    const node = new TrieNode('');
    const child = new TrieNode('a', false);
    const duplicate = new TrieNode('a', true);
    node.addChild(child);
    node.addChild(duplicate);
    expect(node.children.hasOwnProperty('a')).toBe(true);
});

test('addChild does not overwrite existing child if matching value given - part 2, isWord', () => {
    const node = new TrieNode('');
    const child = new TrieNode('a', false);
    const duplicate = new TrieNode('a', true);
    node.addChild(child);
    node.addChild(duplicate);
    expect(node.isWord).toBe(false);
});

test('hasChild returns false when no children set', () => {
    const node = new TrieNode('');
    expect(node.hasChild('a')).toBe(false);
});

test('hasChild returns false when no children match', () => {
    const node = new TrieNode('');
    const child = new TrieNode('a');
    node.addChild(child);
    expect(node.hasChild('b')).toBe(false);
});

test('hasChild returns true when a match is found', () => {
    const node = new TrieNode('');
    const child = new TrieNode('a');
    node.addChild(child);
    expect(node.hasChild('a')).toBe(true);
});