const TrieNode = require('./trie_node');
const getDeck = require('./deck');

function Trie() {
    this.root = new TrieNode('', 0, false);
    this.deck = getDeck();
    this.addWord = function(word) {
        let letters = word.split('');
        let nodeRef = this.root;
        let index = 0;
        while(index < letters.length) {
            let letter = letters[index];
            if(nodeRef.hasChild(letter)) { 
                nodeRef = nodeRef.children[letter]; 
                if(index === letters.length-1 && nodeRef.isWord === false) { nodeRef.isWord = true; }
            }
            else { 
                nodeRef.addChild(new TrieNode(letter, nodeRef.points + this.deck[letter].points, index === letters.length-1));
                nodeRef = nodeRef.children[letter];
            }
            index++;
        }
    };
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
    };
    this.getWords = function() {
        let words = [];
        function buildWords(word, node) {
            if(!!node.letters) { 
                word = `${word}${node.letters}`;
                if(node.isWord) { words.push(word); }
            }
            Object.keys(node.children).forEach(letter => {
                buildWords(word, node.children[letter]);
            });
        }
        let nodeRef = this.root;
        buildWords('', nodeRef);
        return words;
    };
    this.printWords = function() {
        let words = this.getWords();
        console.table(words);
    };
    this.getWordsWithPoints = function() {
        let words = [];
        function buildWords(word, node) {
            if(!!node.letters) { 
                word = `${word}${node.letters}`;
                if(node.isWord) { 
                    words.push({word, points: node.points}); 
                }
            }
            Object.keys(node.children).forEach(letter => {
                buildWords(word, node.children[letter]);
            });
        }
        let nodeRef = this.root;
        buildWords('', nodeRef);
        return words;
    };
    this.printWordsWithPoints = function() {
        let words = this.getWordsWithPoints();
        console.table(words);
    };
    
}

module.exports = Trie;