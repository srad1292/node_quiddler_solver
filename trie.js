const TrieNode = require('./trie_node');

function Trie() {
    this.root = new TrieNode('', false);
    this.addWord = function(word) {
        let letters = word.split('');
        let nodeRef = this.root;
        letters.forEach((letter, index) => {
            if(nodeRef.hasChild(letter)) { 
                nodeRef = nodeRef.children[letter]; 
                if(index === letters.length-1 && nodeRef.isWord === false) { nodeRef.isWord = true; }
            }
            else { 
                nodeRef.addChild(new TrieNode(letter, index === letters.length-1));
                nodeRef = nodeRef.children[letter];
            }
        });
    }
    this.hasWord = function(word) {
        let letters = word.split('');
        let nodeRef = this.root;
        let contains = true;
        letters.every((letter, index) => {
            if(nodeRef.hasChild(letter)) { 
                nodeRef = nodeRef.children[letter]; 
                if(index === letters.length-1 && nodeRef.isWord === false) { contains = false; }
            }
            else { contains = false; }
            return contains;
        });
        return contains;
    }
    this.getWords = function() {
        let words = [];
        function buildWords(word, node) {
            if(!!node.value) { 
                word = `${word}${node.value}`;
                if(node.isWord) { words.push(word); }
            }
            Object.keys(node.children).forEach(letter => {
                buildWords(word, node.children[letter]);
            });
        }
        let nodeRef = this.root;
        buildWords('', nodeRef);
        return words;
    }
    this.printWords = function() {
        let words = this.getWords();
        console.table(words);
    }
    
}

module.exports = Trie;