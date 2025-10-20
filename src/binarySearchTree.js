/**
 * datastructures-js/binary-search-tree
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 */

const { BinarySearchTreeNode } = require('./binarySearchTreeNode');

const defaultCompare = (a, b) => {
  if (a === b) return 0;
  return a > b ? 1 : -1;
};

/**
 * @class BinarySearchTree
 */
class BinarySearchTree {
  constructor(compare, options) {
    if (compare && typeof compare !== 'function') {
      throw new Error('BinarySearchTree constructor expects a compare function');
    }

    this._compare = compare || defaultCompare;
    this._options = options || {};
    this._root = null;
    this._count = 0;
  }

  /**
   * Inserts a node with a key/value into the tree (recursive implementation)
   * @public
   * @param {number|string|object} value
   * @return {BinarySearchTree}
   */
  insert(value) {
    const newNode = new BinarySearchTreeNode(value);
    const insertRecursive = (current) => {
      const compare = this._compare(newNode.getValue(), current.getValue());
      if (compare < 0) {
        if (current.hasLeft()) {
          insertRecursive(current.getLeft());
        } else {
          current.setLeft(newNode.setParent(current));
          this._count += 1;
        }
      } else if (compare > 0) {
        if (current.hasRight()) {
          insertRecursive(current.getRight());
        } else {
          current.setRight(newNode.setParent(current));
          this._count += 1;
        }
      } else {
        current.setValue(value);
      }
    };

    if (this._root === null) {
      this._root = newNode;
      this._count += 1;
    } else {
      insertRecursive(this._root);
    }

    return this;
  }

  /**
   * Inserts a node with a key/value into the tree (iterative implementation)
   * @public
   * @param {number|string|object} value
   * @return {BinarySearchTree}
   */
  insertIterative(value) {
    const newNode = new BinarySearchTreeNode(value);
    let node = this._root;
    if (!node) {
      this._root = newNode;
      this._count += 1;
    } else {
      let inserted = false;
      while (!inserted) {
        const compare = this._compare(newNode.getValue(), node.getValue());

        if (compare < 0) {
          if (node.hasLeft()) {
            node = node.getLeft();
          } else {
            node.setLeft(newNode.setParent(node));
            this._count += 1;
            inserted = true;
          }
        } else if (compare > 0) {
          if (node.hasRight()) {
            node = node.getRight();
          } else {
            node.setRight(newNode.setParent(node));
            this._count += 1;
            inserted = true;
          }
        } else {
          node.setValue(value);
          inserted = true;
        }
      }
    }
    return this;
  }

  /**
   * Checks if a value exists in the tree by its value (recursive implementation)
   * @public
   * @param {number|string|object} value
   * @return {boolean}
   */
  has(value) {
    const hasRecursive = (current) => {
      if (current === null) return false;

      const compare = this._compare(value, current.getValue());
      if (compare === 0) return true;
      if (compare < 0) return hasRecursive(current.getLeft());
      return hasRecursive(current.getRight());
    };

    return hasRecursive(this._root);
  }

  /**
   * Checks if a value exists in the tree by its value (iterative implementation)
   * @public
   * @param {number|string|object} value
   * @return {boolean}
   */
  hasIterative(value) {
    let current = this._root;
    while (current !== null) {
      const compare = this._compare(value, current.getValue());

      if (compare === 0) {
        return true;
      }
      if (compare < 0) {
        current = current.getLeft();
      } else {
        current = current.getRight();
      }
    }
    return false;
  }

  /**
   * Checks if a value exists in the tree by its key
   * @public
   * @param {number|string} key
   * @return {boolean}
   */
  hasKey(key) {
    if (this._options.key === undefined || this._options.key === null) {
      throw new Error('Missing key prop name in constructor options');
    }
    return this.has({ [this._options.key]: key });
  }

  /**
   * Finds a node by its value (recursive implementation)
   * @public
   * @param {number|string|object} value
   * @return {BinarySearchTreeNode}
   */
  find(value) {
    const findRecursive = (current) => {
      if (current === null) return null;

      const compare = this._compare(value, current.getValue());
      if (compare === 0) return current;
      if (compare < 0) return findRecursive(current.getLeft());
      return findRecursive(current.getRight());
    };

    return findRecursive(this._root);
  }

  /**
   * Finds a node by its value (iterative implementation)
   * @public
   * @param {number|string|object} value
   * @return {BinarySearchTreeNode}
   */
  findIterative(value) {
    let current = this._root;

    while (current !== null) {
      const compare = this._compare(value, current.getValue());

      if (compare === 0) {
        return current;
      }
      if (compare < 0) {
        current = current.getLeft();
      } else {
        current = current.getRight();
      }
    }

    return null;
  }

  /**
   * Finds a node by its object's key
   * @public
   * @param {number|string} key
   * @return {BinarySearchTreeNode}
   */
  findKey(key) {
    if (this._options.key === undefined || this._options.key === null) {
      throw new Error('Missing key prop name in constructor options');
    }
    return this.find({ [this._options.key]: key });
  }

  /**
   * Finds the node with max key (most right) in the tree (recursive implementation)
   * @public
   * @param {BinarySearchTreeNode} [current]
   * @return {BinarySearchTreeNode}
   */
  max(current = this._root) {
    if (current === null) return null;
    if (current.hasRight()) return this.max(current.getRight());
    return current;
  }

  /**
   * Finds the node with max key (most right) in the tree (iterative implementation)
   * @public
   * @param {BinarySearchTreeNode} [current]
   * @return {BinarySearchTreeNode}
   */
  maxIterative(current = this._root) {
    if (current === null) return null;
    let node = current;
    while (node.hasRight()) {
      node = node.getRight();
    }
    return node;
  }

  /**
   * Finds the node with min key (most left) in the tree (recursive implementation)
   * @public
   * @param {BinarySearchTreeNode} [current]
   * @return {BinarySearchTreeNode}
   */
  min(current = this._root) {
    if (current === null) return null;
    if (current.hasLeft()) return this.min(current.getLeft());
    return current;
  }

  /**
   * Finds the node with min key (most left) in the tree (iterative implementation)
   * @public
   * @param {BinarySearchTreeNode} [current]
   * @return {BinarySearchTreeNode}
   */
  minIterative(current = this._root) {
    if (current === null) return null;
    let node = current;
    while (node.hasLeft()) {
      node = node.getLeft();
    }
    return node;
  }

  /**
   * Returns the node with the biggest value less or equal a given value (recursive implementation)
   * @public
   * @param {number|string|object} value
   * @param {boolean} includeEqual
   * @return {BinarySearchTreeNode|null}
   */
  lowerBound(value, includeEqual = true) {
    let lowerBound = null;

    const lowerBoundRecursive = (current) => {
      if (current === null) return lowerBound;

      const compare = this._compare(value, current.getValue());
      if (compare > 0 || (includeEqual && compare === 0)) {
        if (lowerBound === null || this._compare(lowerBound.getValue(), current.getValue()) <= 0) {
          lowerBound = current;
        }
        return lowerBoundRecursive(current.getRight());
      }

      return lowerBoundRecursive(current.getLeft());
    };

    return lowerBoundRecursive(this._root);
  }

  /**
   * Returns the node with the biggest value less or equal a given value (iterative implementation)
   * @public
   * @param {number|string|object} value
   * @param {boolean} includeEqual
   * @return {BinarySearchTreeNode|null}
   */
  lowerBoundIterative(value, includeEqual = true) {
    let lowerBound = null;
    let current = this._root;

    while (current !== null) {
      const compare = this._compare(value, current.getValue());

      if (compare > 0 || (includeEqual && compare === 0)) {
        if (lowerBound === null || this._compare(lowerBound.getValue(), current.getValue()) < 0) {
          lowerBound = current;
        }
        current = current.getRight();
      } else {
        current = current.getLeft();
      }
    }

    return lowerBound;
  }

  /**
   * Returns the node with the biggest object's key less or equal a given key
   * @public
   * @param {number|string} key
   * @param {boolean} includeEqual
   * @return {BinarySearchTreeNode|null}
   */
  lowerBoundKey(key, includeEqual = true) {
    if (this._options.key === undefined || this._options.key === null) {
      throw new Error('Missing key prop name in constructor options');
    }

    return this.lowerBound({ [this._options.key]: key }, includeEqual);
  }

  /**
   * Returns the node with the biggest value less or equal a given value
   * @public
   * @param {number|string|object} value
   * @param {boolean} includeEqual
   * @return {BinarySearchTreeNode|null}
   */
  floor(value, includeEqual = true) {
    return this.lowerBound(value, includeEqual);
  }

  /**
   * Returns the node with the biggest object's key less or equal a given value
   * @public
   * @param {number|string} value
   * @param {boolean} includeEqual
   * @return {BinarySearchTreeNode|null}
   */
  floorKey(key, includeEqual = true) {
    return this.lowerBoundKey(key, includeEqual);
  }

  /**
   * Returns the node with the smallest value greater or equal a given value (recursive implementation)
   * @public
   * @param {number|string|object} value
   * @param {boolean} includeEqual
   * @return {BinarySearchTreeNode|null}
   */
  upperBound(value, includeEqual = true) {
    let upperBound = null;

    const upperBoundRecursive = (current) => {
      if (current === null) return upperBound;

      const compare = this._compare(value, current.getValue());
      if (compare < 0 || (includeEqual && compare === 0)) {
        if (upperBound === null || this._compare(upperBound.getValue(), current.getValue()) >= 0) {
          upperBound = current;
        }
        return upperBoundRecursive(current.getLeft());
      }

      return upperBoundRecursive(current.getRight());
    };

    return upperBoundRecursive(this._root);
  }

  /**
   * Returns the node with the smallest value greater or equal a given value (iterative implementation)
   * @public
   * @param {number|string|object} value
   * @param {boolean} includeEqual
   * @return {BinarySearchTreeNode|null}
   */
  upperBoundIterative(value, includeEqual = true) {
    let upperBound = null;
    let current = this._root;

    while (current !== null) {
      const compare = this._compare(value, current.getValue());

      if (compare < 0 || (includeEqual && compare === 0)) {
        if (upperBound === null || this._compare(upperBound.getValue(), current.getValue()) > 0) {
          upperBound = current;
        }
        current = current.getLeft();
      } else {
        current = current.getRight();
      }
    }

    return upperBound;
  }

  /**
   * Returns the node with the smallest object's key greater or equal a given key
   * @public
   * @param {number|string} key
   * @param {boolean} includeEqual
   * @return {BinarySearchTreeNode|null}
   */
  upperBoundKey(key, includeEqual = true) {
    if (this._options.key === undefined || this._options.key === null) {
      throw new Error('Missing key prop name in constructor options');
    }

    return this.upperBound({ [this._options.key]: key }, includeEqual);
  }

  /**
   * Returns the node with the smallest value greater or equal a given value
   * @public
   * @param {number|string|object} value
   * @param {boolean} includeEqual
   * @return {BinarySearchTreeNode|null}
   */
  ceil(value, includeEqual = true) {
    return this.upperBound(value, includeEqual);
  }

  /**
   * Returns the node with the smallest object's key greater or equal a given key
   * @public
   * @param {number|string} key
   * @param {boolean} includeEqual
   * @return {BinarySearchTreeNode|null}
   */
  ceilKey(key, includeEqual = true) {
    return this.upperBoundKey(key, includeEqual);
  }

  /**
   * Returns the root node
   * @public
   * @return {BinarySearchTreeNode}
   */
  root() {
    return this._root;
  }

  /**
   * Returns the nodes count
   * @public
   * @return {number}
   */
  count() {
    return this._count;
  }

  /**
   * Removes a node by its value (recursive implementation)
   * @public
   * @param {number|string|object} value
   * @return {boolean}
   */
  remove(value) {
    const removeRecursively = (val, current) => {
      if (current === null) return false;

      const compare = this._compare(val, current.getValue());
      if (compare < 0) return removeRecursively(val, current.getLeft());
      if (compare > 0) return removeRecursively(val, current.getRight());

      return this.removeNode(current);
    };

    return removeRecursively(value, this._root);
  }

  /**
   * Removes a node by its value (iterative implementation)
   * @public
   * @param {number|string|object} value
   * @return {boolean}
   */
  removeIterative(value) {
    let current = this._root;

    while (current !== null) {
      const compare = this._compare(value, current.getValue());

      if (compare === 0) {
        this.removeNode(current);
        return true;
      }
      if (compare < 0) {
        current = current.getLeft();
      } else {
        current = current.getRight();
      }
    }

    return false;
  }

  /**
   * Removes a node from the tree
   * @public
   * @param {BinarySearchTreeNode} node
   * @return {boolean}
   */
  removeNode(node) {
    if (node === null || !(node instanceof BinarySearchTreeNode)) {
      return false;
    }

    // case 1: node has no children
    if (node.isLeaf()) {
      if (node.isRoot()) {
        this._root = null;
      } else if (this._compare(node.getValue(), node.getParent().getValue()) < 0) {
        node.getParent().setLeft(null);
      } else {
        node.getParent().setRight(null);
      }
      this._count -= 1;
      return true;
    }

    // case 2: node has a left child and no right child
    if (!node.hasRight()) {
      if (node.isRoot()) {
        this._root = node.getLeft();
      } else if (this._compare(node.getValue(), node.getParent().getValue()) < 0) {
        node.getParent().setLeft(node.getLeft());
      } else {
        node.getParent().setRight(node.getLeft());
      }
      node.getLeft().setParent(node.getParent());
      this._count -= 1;
      return true;
    }

    // case 3: node has a right child and no left child
    if (!node.hasLeft()) {
      if (node.isRoot()) {
        this._root = node.getRight();
      } else if (this._compare(node.getValue(), node.getParent().getValue()) < 0) {
        node.getParent().setLeft(node.getRight());
      } else {
        node.getParent().setRight(node.getRight());
      }
      node.getRight().setParent(node.getParent());
      this._count -= 1;
      return true;
    }

    // case 4: node has left and right children
    const minRight = this.min(node.getRight());
    node.setValue(minRight.getValue());
    return this.removeNode(minRight);
  }

  /**
   * Traverses the tree in-order (left-node-right) (recursive implementation)
   * @public
   * @param {function} cb
   * @param {function} [abortCb]
   */
  traverseInOrder(cb, abortCb) {
    if (typeof cb !== 'function') {
      throw new Error('.traverseInOrder expects a callback function');
    }

    const traverseRecursive = (current) => {
      if (current === null || (abortCb && abortCb())) return;
      traverseRecursive(current.getLeft());
      if (abortCb && abortCb()) return;
      cb(current);
      traverseRecursive(current.getRight());
    };

    traverseRecursive(this._root);
  }

  /**
   * Traverses the tree in-order (left-node-right) (iterative implementation)
   * @public
   * @param {function} cb
   * @param {function} [abortCb]
   */
  traverseInOrderIterative(cb, abortCb) {
    if (typeof cb !== 'function') {
      throw new Error('.traverseInOrderIterative expects a callback function');
    }

    let current = this._root;
    const stack = [];

    while (current !== null || stack.length > 0) {
      while (current !== null) {
        stack.push(current);
        current = current.getLeft();
      }
      current = stack.pop();

      if (abortCb && abortCb()) {
        return;
      }

      cb(current);

      current = current.getRight();
    }
  }

  /**
   * Traverses the tree pre-order (node-left-right) (recursive implementation)
   * @public
   * @param {function} cb
   * @param {function} [abortCb]
   */
  traversePreOrder(cb, abortCb) {
    if (typeof cb !== 'function') {
      throw new Error('.traversePreOrder expects a callback function');
    }

    const traverseRecursive = (current) => {
      if (current === null || (abortCb && abortCb())) return;
      cb(current);
      traverseRecursive(current.getLeft());
      traverseRecursive(current.getRight());
    };

    traverseRecursive(this._root);
  }

  /**
   * Traverses the tree pre-order (node-left-right) (iterative implementation)
   * @public
   * @param {function} cb
   * @param {function} [abortCb]
   */
  traversePreOrderIterative(cb, abortCb) {
    if (typeof cb !== 'function') {
      throw new Error('.traversePreOrderIterative expects a callback function');
    }

    const stack = [this._root];

    while (stack.length) {
      const current = stack.pop();

      if (abortCb && abortCb()) break;
      if (current) {
        cb(current);
        stack.push(current.getRight());
        stack.push(current.getLeft());
      }
    }
  }

  /**
   * Traverses the tree post-order (left-right-node) (recursive implementation)
   * @public
   * @param {function} cb
   * @param {function} [abortCb]
   */
  traversePostOrder(cb, abortCb) {
    if (typeof cb !== 'function') {
      throw new Error('.traversePostOrder expects a callback function');
    }

    const traverseRecursive = (current) => {
      if (current === null || (abortCb && abortCb())) return;
      traverseRecursive(current.getLeft());
      traverseRecursive(current.getRight());
      if (abortCb && abortCb()) return;
      cb(current);
    };

    traverseRecursive(this._root);
  }

  /**
   * Traverses the tree post-order (left-right-node) (iterative implementation)
   * @public
   * @param {function} cb
   * @param {function} [abortCb]
   */
  traversePostOrderIterative(cb, abortCb) {
    if (typeof cb !== 'function') {
      throw new Error('.traversePostOrderIterative expects a callback function');
    }

    const s1 = [];
    const s2 = [];
    s1.push(this._root);

    while (s1.length) {
      const current = s1.pop();

      s2.push(current);

      if (abortCb && abortCb()) break;
      if (current) {
        s1.push(current.getLeft());
        s1.push(current.getRight());
      }
    }

    while (s2.length) {
      const current = s2.pop();
      if (abortCb && abortCb()) break;
      if (current) {
        cb(current);
      }
    }
  }

  /**
   * Clears the tree
   * @public
   */
  clear() {
    this._root = null;
    this._count = 0;
  }
}

exports.BinarySearchTree = BinarySearchTree;
