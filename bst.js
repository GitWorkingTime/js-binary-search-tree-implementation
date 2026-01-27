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
        let sorted = array.sort();
        this.root = this.sortedArrayToBST(sorted, 0, sorted.length - 1);
        return this;
    }

    // Helper Function
    sortedArrayToBST(arr, start, end) {
        if (start > end) return null;

        const mid = Math.floor((start + end) / 2);
        const node = new Node(arr[mid]);

        node.left = this.sortedArrayToBST(arr, start, mid - 1);
        node.right = this.sortedArrayToBST(arr, mid + 1, end);

        return node;
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
