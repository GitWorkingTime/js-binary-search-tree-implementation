class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor() {
        this.root = null;
    }

    buildTree(array) {

    }

    insert(value) {

    }

    deleteItem(value) {

    }

    find(value) {

    }

    levelOrderForEach(callback) {

    }

    inOrderForEach(callback) {
        
    }

    preOrderForEach(callback) {
        
    }

    postOrderForEach(callback) {
        
    }

    height(value) {

    }

    depth(value) {

    }

    isBalanced() {

    }

    rebalance() {
        
    }
}

// Helper Function for printing
const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

