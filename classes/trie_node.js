function TrieNode(letters, points, isWord) {
    this.letters = letters;
    this.points = points;
    this.isWord = isWord || false;
    this.children = {};
    this.addChild = function(node){
        if(this.children.hasOwnProperty(node.letters)) { return; }
        this.children[node.letters] = new TrieNode(node.letters, node.points, node.isWord);
    }
    this.hasChild = function(letter){
        return this.children.hasOwnProperty(letter);
    }
}

module.exports = TrieNode;