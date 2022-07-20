const Trie = require('./trie');

function main() {
    let trie = new Trie();
    // trie.printDeck();

    trie.addWord("dog");
    // trie.addWord("boggle");
    // trie.addWord("crazy");
    // trie.addWord("inside");
    // trie.addWord("close");
    trie.addWord("with");
    trie.addWord("in");

    trie.printWordsWithPoints('-');
}

main();