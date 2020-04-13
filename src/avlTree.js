/**
 * @datastructures-js/binary-search-tree
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 */

const BinarySearchTree = require('./binarySearchTree');
const AvlTreeNode = require('./avlTreeNode');

/**
 * @class AvlTree
 * @extends BinarySearchTree
 */
class AvlTree extends BinarySearchTree {
  /**
   * @private
   * applies the proper rotation on a node during insert or remove
   * @param {AvlTreeNode} node
   */
  _balanceNode(node) {
    if (!node) return;

    node.updateHeight();
    const balance = node.calculateBalance();
    if (balance > 1) {
      if (node.getLeft().getLeft() !== null) {
        node.rotateRight();
      } else if (node.getLeft().getRight() !== null) {
        node.rotateLeftRight();
      }
    } else if (balance < -1) {
      if (node.getRight().getRight() !== null) {
        node.rotateLeft();
      } else if (node.getRight().getLeft() !== null) {
        node.rotateRightLeft();
      }
    }
    if (node === this._root && (balance < -1 || balance > 1)) {
      this._root = node.getParent();
    }
  }

  /**
   * @public
   * inserts a node with a key/value into tree
   * and maintains the tree balanced by applying the necessary rotations
   * @param {number|string} key
   * @param {object} value
   * @param {AvlTreeNode} node
   * @return {AvlTreeNode} the inserted node
   */
  insert(key, value, node = this._root) {
    if (node === null) {
      this._root = new AvlTreeNode(key, value);
      this._count += 1;
      return this._root;
    }

    if (key < node.getKey() && node.getLeft() === null) {
      const newNode = new AvlTreeNode(key, value);
      node.setLeft(newNode);
      newNode.setParent(node);
      node.updateHeight();
      this._count += 1;
      return newNode;
    }

    if (key > node.getKey() && node.getRight() === null) {
      const newNode = new AvlTreeNode(key, value);
      node.setRight(newNode);
      newNode.setParent(node);
      node.updateHeight();
      this._count += 1;
      return newNode;
    }

    if (key === node.getKey()) {
      node.setValue(value);
      return node;
    }

    if (key < node.getKey()) {
      const newNode = this.insert(key, value, node.getLeft());
      this._balanceNode(node); // backward-tracking
      return newNode;
    }

    const newNode = this.insert(key, value, node.getRight());
    this._balanceNode(node); // backward-tracking
    return newNode;
  }

  /**
   * @public
   * remove a node by its key
   * and maintains the tree balanced by applying the necessary rotations
   * @param {number|string} key
   * @param {AvlTreeNode} node
   * @return {boolean}
   */
  remove(key, node = this._root) {
    if (node === null) return false;

    if (key < node.getKey()) {
      const removed = this.remove(key, node.getLeft());
      this._balanceNode(node);
      return removed;
    }

    if (key > node.getKey()) {
      const removed = this.remove(key, node.getRight());
      this._balanceNode(node);
      return removed;
    }

    if (node.getLeft() === null && node.getRight() === null) {
      if (node.getParent() === null) {
        this._root = null;
      } else if (key < node.getParent().getKey()) {
        node.getParent().setLeft(null);
        node.getParent().updateHeight();
      } else {
        node.getParent().setRight(null);
        node.getParent().updateHeight();
      }
      this._count -= 1;
      return true;
    }

    if (node.getRight() === null) {
      if (node.getParent() === null) {
        this._root = node.getLeft();
      } else if (key < node.getParent().getKey()) {
        node.getParent().setLeft(node.getLeft());
        node.getParent().updateHeight();
      } else {
        node.getParent().setRight(node.getLeft());
        node.getParent().updateHeight();
      }
      node.getLeft().setParent(node.getParent());
      this._count -= 1;
      return true;
    }

    if (node.getLeft() === null) {
      if (node.getParent() === null) {
        this._root = node.getRight();
      } else if (key < node.getParent().getKey()) {
        node.getParent().setLeft(node.getRight());
        node.getParent().updateHeight();
      } else {
        node.getParent().setRight(node.getRight());
        node.getParent().updateHeight();
      }
      node.getRight().setParent(node.getParent());
      this._count -= 1;
      return true;
    }

    const minRight = this.min(node.getRight());
    node.setKey(minRight.getKey());
    return this.remove(minRight.getKey(), minRight);
  }
}

module.exports = AvlTree;
