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
        if(!callback || typeof callback !== 'function') {
            throw new Error('Invalid Arg: requires callback function');
        }

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
        if(!callback || typeof callback !== 'function') {
            throw new Error('Invalid Arg: requires callback');
        }
        return this.inOrderTraversal(this.root, callback);
    }

    inOrderTraversal(node, callback) {
        if (!node) {
            return;
        }
        
        this.inOrderTraversal(node.left, callback);
        callback(node);
        this.inOrderTraversal(node.right, callback);
    }

    preOrderForEach(callback) {
        if(!callback || typeof callback !== 'function') {
            throw new Error('Invalid Arg: requires callback');
        }
        return this.preOrderTraversal(this.root, callback);
    }

    preOrderTraversal(node, callback) {
        if (!node) {
            return;
        }
        
        callback(node);
        this.preOrderTraversal(node.left, callback);
        this.preOrderTraversal(node.right, callback);
    }

    postOrderForEach(callback) {
        if(!callback || typeof callback !== 'function') {
            throw new Error('Invalid Arg: requires callback');
        }
        return this.postOrderTraversal(this.root, callback);
    }

    postOrderTraversal(node, callback) {
        if (!node) {
            return;
        }
        
        this.postOrderTraversal(node.left, callback);
        this.postOrderTraversal(node.right, callback);
        callback(node);
    }

    height(node) {
        // If called with a value, find the node first
        if (typeof node === 'number') {
            node = this.find(node);
        }
        // If no argument, use root
        if (node === undefined) {
            node = this.root;
        }
        
        if (node === null) {
            return -1;
        }
        
        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);
        
        return Math.max(leftHeight, rightHeight) + 1;
    }

    isBalanced(node = this.root) {
        if (node === null) {
            return true;
        }
        
        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);
        
        const heightDiff = Math.abs(leftHeight - rightHeight);
        
        return heightDiff <= 1 && 
            this.isBalanced(node.left) && 
            this.isBalanced(node.right);
    }

    rebalance() {
        // Collect all values using in-order traversal
        const values = [];
        this.inOrderForEach((node) => values.push(node.value));
        
        // Rebuild tree from sorted array
        this.root = this.sortedArrayToBST(values, 0, values.length - 1);
    }
    
    depth(value) {
        return this.traverseFindCount(value, this.root);
    }
    
    traverseFindCount(value, parent, count = 0) {
        if (parent === null) {
            return null;
        } else if (parent.value === value) {
            return count;
        } else {
            if (parent.value < value) {
                return this.traverseFind(value, parent.right, ++count);
            } else {
                return this.traverseFind(value, parent.left, ++count);
            }
        }
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