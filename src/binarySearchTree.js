/**
 * @datastructures-js/binary-search-tree
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 */

const BinarySearchTreeNode = require('./binarySearchTreeNode');

/**
 * @class BinarySearchTree
 */
class BinarySearchTree {
  constructor() {
    this._root = null;
    this._count = 0;
  }

  /**
   * @public
   * inserts a node with a key/value into the tree
   * @param {number|string} key
   * @param {object} value
   * @param {BinarySearchTreeNode} node
   * @return {BinarySearchTreeNode}
   */
  insert(key, value, node = this._root) {
    if (node === null) {
      this._root = new BinarySearchTreeNode(key, value);
      this._count += 1;
      return this._root;
    }

    if (key < node.getKey() && node.getLeft() === null) {
      const newNode = new BinarySearchTreeNode(key, value);
      node.setLeft(newNode);
      newNode.setParent(node);
      this._count += 1;
      return newNode;
    }

    if (key > node.getKey() && node.getRight() === null) {
      const newNode = new BinarySearchTreeNode(key, value);
      node.setRight(newNode);
      newNode.setParent(node);
      this._count += 1;
      return newNode;
    }

    if (key === node.getKey()) {
      node.setValue(value);
      return node;
    }

    if (key < node.getKey()) {
      return this.insert(key, value, node.getLeft());
    }

    return this.insert(key, value, node.getRight());
  }

  /**
   * @public
   * check if a value exists in the tree by its key
   * @param {number|string} key
   * @param {BinarySearchTreeNode} node
   * @return {boolean}
   */
  has(key, node = this._root) {
    if (node === null) return false;

    if (key === node.getKey()) return true;

    if (key < node.getKey()) return this.has(key, node.getLeft());

    return this.has(key, node.getRight());
  }

  /**
   * @public
   * finds the key's node in the tree
   * @param {number|string} key
   * @param {BinarySearchTreeNode} node
   * @return {BinarySearchTreeNode}
   */
  find(key, node = this._root) {
    if (node === null) return null;

    if (key === node.getKey()) return node;

    if (key < node.getKey()) return this.find(key, node.getLeft());

    return this.find(key, node.getRight());
  }

  /**
   * @public
   * finds the node with max key (most right) in the tree
   * @param {BinarySearchTreeNode} node
   * @return {BinarySearchTreeNode}
   */
  max(node = this._root) {
    if (node === null) return null;

    if (node.getRight() === null) return node;

    return this.max(node.getRight());
  }

  /**
   * @public
   * finds the node with min key (most left) in the tree
   * @param {BinarySearchTreeNode} node
   * @return {BinarySearchTreeNode}
   */
  min(node = this._root) {
    if (node === null) return null;

    if (node.getLeft() === null) return node;

    return this.min(node.getLeft());
  }

  /**
   * @public
   * returns the tree root node
   * @return {BinarySearchTreeNode}
   */
  root() {
    return this._root;
  }

  /**
   * @public
   * returns the nodes count in the tree
   * @return {number}
   */
  count() {
    return this._count;
  }

  /**
   * @public
   * remove a node by its key
   * @param {number|string} key
   * @param {BinarySearchTreeNode} node
   * @return {boolean}
   */
  remove(key, node = this._root) {
    if (node === null) return false;

    if (key < node.getKey()) {
      return this.remove(key, node.getLeft());
    }

    if (key > node.getKey()) {
      return this.remove(key, node.getRight());
    }

    if (node.getLeft() === null && node.getRight() === null) {
      if (node.getParent() === null) {
        this._root = null;
      } else if (node.getKey() < node.getParent().getKey()) {
        node.getParent().setLeft(null);
      } else {
        node.getParent().setRight(null);
      }
      this._count -= 1;
      return true;
    }

    if (node.getRight() === null) {
      if (node.getParent() === null) {
        this._root = node.getLeft();
      } else if (node.getKey() < node.getParent().getKey()) {
        node.getParent().setLeft(node.getLeft());
      } else {
        node.getParent().setRight(node.getLeft());
      }
      node.getLeft().setParent(node.getParent());
      this._count -= 1;
      return true;
    }

    if (node.getLeft() === null) {
      if (node.getParent() === null) {
        this._root = node.getRight();
      } else if (node.getKey() < node.getParent().getKey()) {
        node.getParent().setLeft(node.getRight());
      } else {
        node.getParent().setRight(node.getRight());
      }
      node.getRight().setParent(node.getParent());
      this._count -= 1;
      return true;
    }

    const minRight = this.min(node.getRight());
    node.setKey(minRight.getKey());
    return this.remove(minRight.getKey(), minRight);
  }

  /**
   * @public
   * traverse the tree in-order (left-node-right)
   * @param {function} cb
   * @param {BinarySearchTreeNode} node
   */
  traverseInOrder(cb, node = this._root) {
    if (typeof cb !== 'function') {
      throw new Error('.traverseInOrder(cb) expects a callback');
    }

    if (node === null) return;

    this.traverseInOrder(cb, node.getLeft());
    cb(node);
    this.traverseInOrder(cb, node.getRight());
  }

  /**
   * @public
   * traverse the tree pre-order (node-left-right)
   * @param {function} cb
   * @param {BinarySearchTreeNode} node
   */
  traversePreOrder(cb, node = this._root) {
    if (typeof cb !== 'function') {
      throw new Error('.traversePreOrder(cb) expects a callback');
    }

    if (node === null) return;

    cb(node);
    this.traversePreOrder(cb, node.getLeft());
    this.traversePreOrder(cb, node.getRight());
  }

  /**
   * @public
   * traverse the tree post-order (left-right-node)
   * @param {function} cb
   * @param {BinarySearchTreeNode} node
   */
  traversePostOrder(cb, node = this._root) {
    if (typeof cb !== 'function') {
      throw new Error('.traversePostOrder(cb) expects a callback');
    }

    if (node === null) return;

    this.traversePostOrder(cb, node.getLeft());
    this.traversePostOrder(cb, node.getRight());
    cb(node);
  }

  /**
   * @public
   * clears the tree
   */
  clear() {
    this._root = null;
    this._count = 0;
  }
}

module.exports = BinarySearchTree;
