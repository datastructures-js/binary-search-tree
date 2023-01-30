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
   * Inserts a node with a key/value into the tree
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
   * Checks if a value exists in the tree by its value
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
   * Finds a node by its value
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
   * Finds the node with max key (most right) in the tree
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
   * Finds the node with min key (most left) in the tree
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
   * Returns the node with the biggest value less or equal a given value
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
   * Returns the node with the smallest value greater or equal a given value
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
   * Removes a node by its value
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
   * Traverses the tree in-order (left-node-right)
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
   * Traverses the tree pre-order (node-left-right)
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
   * Traverses the tree post-order (left-right-node)
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
   * Clears the tree
   * @public
   */
  clear() {
    this._root = null;
    this._count = 0;
  }
}

exports.BinarySearchTree = BinarySearchTree;
