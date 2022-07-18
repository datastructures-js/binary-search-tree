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
  constructor(compare) {
    if (compare && typeof compare !== 'function') {
      throw new Error('BinarySearchTree constructor expects a compare function');
    }

    this._compare = compare || defaultCompare;
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

    return newNode;
  }

  /**
   * Checks if a value exists in the tree by its key
   * @public
   * @param {number|string} key
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
   * Finds a node by its key
   * @public
   * @param {number|string} key
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
   * Returns the node with the biggest key less or equal to k
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
   * delegate to lowerBound
   * @public
   * @param {number|string} k
   * @param {boolean} includeEqual
   * @return {BinarySearchTreeNode|null}
   */
  floor(k, includeEqual = true) {
    return this.lowerBound(k, includeEqual);
  }

  /**
   * Returns the node with the smallest key bigger or equal k
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
   * delegate to upperBound
   * @public
   * @param {number|string} k
   * @param {boolean} includeEqual
   * @return {BinarySearchTreeNode|null}
   */
  ceil(k, includeEqual = true) {
    return this.upperBound(k, includeEqual);
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
   * Removes a node by its key
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

      // current node is the node to remove
      // case 1: node has no children
      if (current.isLeaf()) {
        if (current.isRoot()) {
          this._root = null;
        } else if (this._compare(val, current.getParent().getValue()) < 0) {
          current.getParent().setLeft(null);
        } else {
          current.getParent().setRight(null);
        }
        this._count -= 1;
        return true;
      }

      // case 2: node has a left child and no right child
      if (!current.hasRight()) {
        if (current.isRoot()) {
          this._root = current.getLeft();
        } else if (this._compare(val, current.getParent().getValue()) < 0) {
          current.getParent().setLeft(current.getLeft());
        } else {
          current.getParent().setRight(current.getLeft());
        }
        current.getLeft().setParent(current.getParent());
        this._count -= 1;
        return true;
      }

      // case 3: node has a right child and no left child
      if (!current.hasLeft()) {
        if (current.isRoot()) {
          this._root = current.getRight();
        } else if (this._compare(val, current.getParent().getValue()) < 0) {
          current.getParent().setLeft(current.getRight());
        } else {
          current.getParent().setRight(current.getRight());
        }
        current.getRight().setParent(current.getParent());
        this._count -= 1;
        return true;
      }

      // case 4: node has left and right children
      const minRight = this.min(current.getRight());
      current.setValue(minRight.getValue());
      return removeRecursively(minRight.getValue(), minRight);
    };

    return removeRecursively(value, this._root);
  }

  /**
   * Traverses the tree in-order (left-node-right)
   * @public
   * @param {function} cb
   */
  traverseInOrder(cb) {
    if (typeof cb !== 'function') {
      throw new Error('.traverseInOrder expects a callback function');
    }

    const traverseRecursive = (current) => {
      if (current === null) return;
      traverseRecursive(current.getLeft());
      cb(current);
      traverseRecursive(current.getRight());
    };

    traverseRecursive(this._root);
  }

  /**
   * Traverses the tree pre-order (node-left-right)
   * @public
   * @param {function} cb
   */
  traversePreOrder(cb) {
    if (typeof cb !== 'function') {
      throw new Error('.traversePreOrder expects a callback function');
    }

    const traverseRecursive = (current) => {
      if (current === null) return;
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
   */
  traversePostOrder(cb) {
    if (typeof cb !== 'function') {
      throw new Error('.traversePostOrder expects a callback function');
    }

    const traverseRecursive = (current) => {
      if (current === null) return;
      traverseRecursive(current.getLeft());
      traverseRecursive(current.getRight());
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
