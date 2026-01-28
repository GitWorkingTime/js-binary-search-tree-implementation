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
        let sorted = array.sort((a, b) => a - b);
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
        this.insertValue(value, this.root);
    }

    // Helper Function
    insertValue(value, parent) {
        if(parent.value === value) {
            return null;
        } else {
            if(parent.value < value) {
                if (parent.right !== null) {
                    return this.compare(value, parent.right);
                } else {
                    let node = new Node(value);
                    parent.right = node;
                }
            } else if(parent.value > value){
                if (parent.left !== null) {
                    return this.compare(value, parent.left);
                } else {
                    let node = new Node(value);
                    parent.left = node;
                }
            }
        }
    }

    deleteItem(value) {
        this.root = this.deleteNode(this.root, value);
    }

    deleteNode(parent, value) {
        if(parent === null) {
            return parent;
        }

        if(value < parent.value) {
            parent.left = this.deleteNode(parent.left, value);
        } else if(value > parent.value) {
            parent.right = this.deleteNode(parent.right, value);
        } else {
            if(!parent.left && !parent.right) {
                return null;
            }
            if(!parent.left) {
                return parent.right;
            } else if (!parent.right) {
                return parent.left;
            }

            parent.value = this.min(parent.right);
            parent.right = this.deleteNode(parent.right, parent.value);
        }
        return parent;
    }

    min(parent) {
        if(!parent.left) {
            return parent.value;
        } else {
            return this.min(parent.left);
        }
    }

    find(value) {
        return this.traverseFind(value, this.root);
    }

    traverseFind(value, parent) {
        if (parent === null) {
            return null;
        } else if (parent.value === value) {
            return parent;
        } else {
            if (parent.value < value) {
                return this.traverseFind(value, parent.right);
            } else {
                return this.traverseFind(value, parent.left);
            }
        }
    }

    levelOrderForEach(callback) {
        let queue = []
        return this.levelOrderTraversal(this.root, callback, queue)
    }

    levelOrderTraversal(node, callback, queue) {
        if (!node) {
            return;
        }

        callback(node);

        if (node.left) {
            queue.push(node.left);
        }
        if (node.right) {
            queue.push(node.right);
        }
        return this.levelOrderTraversal(queue.shift(), callback, queue);
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
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

let tree = new Tree();
let arr = [1, 2, 3, 4, 5, 6, 7];
tree.buildTree(arr);
prettyPrint(tree.root);

tree.levelOrderForEach((node) => {console.log(node.value)});