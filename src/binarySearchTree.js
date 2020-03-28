/**
 * datastructures-js/binary-search-tree
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 */

const BinarySearchTreeNode = require('./binarySearchTreeNode');

/**
 * @class BinarySearchTree
 */
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
    this.nodesCount = 0;
  }

  /**
   * @public
   * inserts a node with a key/value into the tree
   * @param {number|string} key
   * @param {object} vaue
   * @return {BinartSearchTreeNode}
   */
  insert(key, value, node = this.rootNode) {
    const newNode = new BinarySearchTreeNode(key, value);

    if (node === null) {
      this.rootNode = newNode;
      this.nodesCount += 1;
      return newNode;
    }

    if (key < node.getKey() && node.getLeft() === null) {
      node.setLeft(newNode);
      newNode.setParent(node);
      this.nodesCount += 1;
      return newNode;
    }

    if (key > node.getKey() && node.getRight() === null) {
      node.setRight(newNode);
      newNode.setParent(node);
      this.nodesCount += 1;
      return newNode;
    }

    if (key === node.getKey()) {
      node.setValue(value);
      return newNode;
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
   * @return {boolean}
   */
  has(key, node = this.rootNode) {
    if (node === null) return false;

    if (key === node.getKey()) return true;

    if (key < node.getKey()) return this.has(key, node.getLeft());

    return this.has(key, node.getRight());
  }

  /**
   * @public
   * finds the key's node in the tree
   * @param {number|string} key
   * @return {BinarySearchTreeNode}
   */
  find(key, node = this.rootNode) {
    if (node === null) return null;

    if (key === node.getKey()) return node;

    if (key < node.getKey()) return this.find(key, node.getLeft());

    return this.find(key, node.getRight());
  }

  /**
   * @public
   * finds the node with max key (most right) in the tree
   * @return {BinarySearchTreeNode}
   */
  max(node = this.rootNode) {
    if (node === null) return null;

    if (node.getRight() === null) return node;

    return this.max(node.getRight());
  }

  /**
   * @public
   * finds the node with min key (most left) in the tree
   * @return {BinarySearchTreeNode}
   */
  min(node = this.rootNode) {
    if (node === null) return null;

    if (node.getLeft() === null) return node;

    return this.min(node.getLeft());
  }

  /**
   * @public
   * gets the tree root node
   * @return {BinarySearchTreeNode}
   */
  root() {
    return this.rootNode;
  }

  /**
   * @public
   * gets nodes count in the tree
   * @return {number}
   */
  count() {
    return this.nodesCount;
  }

  /**
   * @public
   * remove a node by its key
   * @param {number|string} key
   * @return {boolean}
   */
  remove(key, node = this.rootNode) {
    if (node === null) return false;

    if (key < node.getKey()) {
      return this.remove(key, node.getLeft());
    }

    if (key > node.getKey()) {
      return this.remove(key, node.getRight());
    }

    if (node.getLeft() === null && node.getRight() === null) {
      if (node.getParent() === null) {
        this.rootNode = null;
      } else if (node.getKey() < node.getParent().getKey()) {
        node.getParent().setLeft(null);
      } else {
        node.getParent().setRight(null);
      }
      this.nodesCount -= 1;
      return true;
    }

    if (node.getRight() === null) {
      if (node.getParent() === null) {
        this.rootNode = node.getLeft();
      } else if (node.getKey() < node.getParent().getKey()) {
        node.getParent().setLeft(node.getLeft());
      } else {
        node.getParent().setRight(node.getLeft());
      }
      node.getLeft().setParent(node.getParent());
      this.nodesCount -= 1;
      return true;
    }

    if (node.getLeft() === null) {
      if (node.getParent() === null) {
        this.rootNode = node.getRight();
      } else if (node.getKey() < node.getParent().getKey()) {
        node.getParent().setLeft(node.getRight());
      } else {
        node.getParent().setRight(node.getRight());
      }
      node.getRight().setParent(node.getParent());
      this.nodesCount -= 1;
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
   */
  traverseInOrder(cb, node = this.rootNode) {
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
   */
  traversePreOrder(cb, node = this.rootNode) {
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
   */
  traversePostOrder(cb, node = this.rootNode) {
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
    this.rootNode = null;
    this.nodesCount = 0;
  }
}

module.exports = BinarySearchTree;
