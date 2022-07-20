const TrieNode = require('./trie_node');
const getDeck = require('./deck');

function Trie() {
    this.root = new TrieNode('', 0, false);
    this.deck = getDeck();
    this.addWord = function(word) {
        function addWordPermutations(outerRef, remainingWord, nodeRef) {
            if(remainingWord === '') { return; }
            // console.log("Perm on word: ", remainingWord);
            let letters = remainingWord.split('');
            function addChild(lettersToAdd) {
                // console.log("Node ref I am adding to: ", nodeRef.letters);
                // console.log("letters i am adding: ", lettersToAdd);
                if(nodeRef.hasChild(lettersToAdd)) { 
                    nodeRef = nodeRef.children[lettersToAdd]; 
                    if(index === letters.length-lettersToAdd.length && nodeRef.isWord === false) { nodeRef.isWord = true; }
                }
                else { 
                    nodeRef.addChild(new TrieNode(lettersToAdd, nodeRef.points + outerRef.deck[lettersToAdd].points, index === letters.length-lettersToAdd.length));
                    nodeRef = nodeRef.children[lettersToAdd];
                }
            }
            let index = 0;
            while(index < letters.length) {
                let letter = letters[index];
                if(outerRef.deck[letter].preMulti && index < letters.length-1 && outerRef.deck.hasOwnProperty(`${letter}${letters[index+1]}`)) {
                    let cachedRef = nodeRef;
                    addChild(`${letter}${letters[index+1]}`);
                    let newNodeRef = nodeRef;
                    nodeRef = cachedRef;
                    // console.log("Need to make perm");
                    // console.log(letters);
                    let slicedWord = [...letters].splice(index+2).join('');
                    // console.log(slicedWord);
                    // console.log('sliced word is empty: ', slicedWord === '');
                    addWordPermutations(outerRef, slicedWord, newNodeRef);
                }
                addChild(letter);
                index++;
            }
        }
        let firstRef = this.root;
        addWordPermutations(this, word, firstRef);
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
    this.getWords = function(seperator='') {
        let words = [];
        function buildWords(word, node) {
            let children = Object.keys(node.children);
            if(!!node.letters) {
                word = `${word}${node.letters}${!!children.length ? seperator : ''}`;
                if(node.isWord) { words.push(word); }
            }
            children.forEach(letter => {
                buildWords(word, node.children[letter]);
            });
        }
        let nodeRef = this.root;
        buildWords('', nodeRef);
        return words;
    };
    this.printWords = function(seperator='') {
        let words = this.getWords(seperator);
        console.table(words);
    };
    this.getWordsWithPoints = function(seperator='') {
        let words = [];
        function buildWords(word, node) {
            let children = Object.keys(node.children);
            if(!!node.letters) { 
                word = `${word}${node.letters}${!!children.length ? seperator : ''}`;
                if(node.isWord) { 
                    words.push({word, points: node.points}); 
                }
            }
            children.forEach(letter => {
                buildWords(word, node.children[letter]);
            });
        }
        let nodeRef = this.root;
        buildWords('', nodeRef);
        return words;
    };
    this.printWordsWithPoints = function(seperator='') {
        let words = this.getWordsWithPoints(seperator);
        console.table(words);
    };
    
}

module.exports = Trie;