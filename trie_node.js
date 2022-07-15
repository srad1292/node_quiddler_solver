function TrieNode(value, isWord) {
    this.value = value;
    this.isWord = isWord || false;
    this.children = {};
    this.addChild = function(node){
        if(this.children.hasOwnProperty(node.value)) { return; }
        this.children[node.value] = new TrieNode(node.value, node.isWord);
    }
    this.hasChild = function(letter){
        return this.children.hasOwnProperty(letter);
    }
}

module.exports = TrieNode;