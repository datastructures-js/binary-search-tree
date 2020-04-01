/**
 * datastructures-js/binary-search-tree
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
   * applies the proper rotation on nodes after inserting a node
   * @param {AvlTreeNode} node
   */
  balanceAfterInsert(key, node) {
    if (!node) return;

    node.updateHeight();
    const balance = node.calculateBalance();
    if (balance > 1) {
      if (key < node.getLeft().getKey()) {
        node.rotateRight();
      } else {
        node.rotateLeftRight();
      }
    } else if (balance < -1) {
      if (key > node.getRight().getKey()) {
        node.rotateLeft();
      } else {
        node.rotateRightLeft();
      }
    }
    if (node === this.rootNode && (balance < -1 || balance > 1)) {
      this.rootNode = node.getParent();
    }
  }

  /**
   * @private
   * applies the proper rotation on nodes after removing a node
   * @param {AvlTreeNode} node
   */
  balanceAfterRemove(node) {
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
    if (node === this.rootNode && (balance < -1 || balance > 1)) {
      this.rootNode = node.getParent();
    }
  }

  /**
   * @public
   *
   * inserts a node with a key/value into tree
   * and maintains the tree balanced by applying the necessary rotations
   *
   * @param {number|string} key
   * @param {object} vaue
   * @return {AvlTreeNode} the inserted node
   */
  insert(key, value, node = this.rootNode) {
    if (node === null) {
      this.rootNode = new AvlTreeNode(key, value);
      this.nodesCount += 1;
      return this.rootNode;
    }

    if (key < node.getKey() && node.getLeft() === null) {
      const newNode = new AvlTreeNode(key, value);
      node.setLeft(newNode);
      newNode.setParent(node);
      node.updateHeight();
      this.nodesCount += 1;
      return newNode;
    }

    if (key > node.getKey() && node.getRight() === null) {
      const newNode = new AvlTreeNode(key, value);
      node.setRight(newNode);
      newNode.setParent(node);
      node.updateHeight();
      this.nodesCount += 1;
      return newNode;
    }

    if (key === node.getKey()) {
      node.setValue(value);
      return node;
    }

    if (key < node.getKey()) {
      const newNode = this.insert(key, value, node.getLeft());
      this.balanceAfterInsert(key, node); // back-tracking
      return newNode;
    }

    const newNode = this.insert(key, value, node.getRight());
    this.balanceAfterInsert(key, node); // back-tracking
    return newNode;
  }

  remove(key, node = this.rootNode) {
    if (node === null) return false;

    if (key < node.getKey()) {
      const removed = this.remove(key, node.getLeft());
      this.balanceAfterRemove(node);
      return removed;
    }

    if (key > node.getKey()) {
      const removed = this.remove(key, node.getRight());
      this.balanceAfterRemove(node);
      return removed;
    }

    if (node.getLeft() === null && node.getRight() === null) {
      if (node.getParent() === null) {
        this.rootNode = null;
      } else if (key < node.getParent().getKey()) {
        node.getParent().setLeft(null);
        node.getParent().updateHeight();
      } else {
        node.getParent().setRight(null);
        node.getParent().updateHeight();
      }
      this.nodesCount -= 1;
      return true;
    }

    if (node.getRight() === null) {
      if (node.getParent() === null) {
        this.rootNode = node.getLeft();
      } else if (key < node.getParent().getKey()) {
        node.getParent().setLeft(node.getLeft());
        node.getParent().updateHeight();
      } else {
        node.getParent().setRight(node.getLeft());
        node.getParent().updateHeight();
      }
      node.getLeft().setParent(node.getParent());
      this.nodesCount -= 1;
      return true;
    }

    if (node.getLeft() === null) {
      if (node.getParent() === null) {
        this.rootNode = node.getRight();
      } else if (key < node.getParent().getKey()) {
        node.getParent().setLeft(node.getRight());
        node.getParent().updateHeight();
      } else {
        node.getParent().setRight(node.getRight());
        node.getParent().updateHeight();
      }
      node.getRight().setParent(node.getParent());
      this.nodesCount -= 1;
      return true;
    }

    const minRight = this.min(node.getRight());
    node.setKey(minRight.getKey());
    return this.remove(minRight.getKey(), minRight);
  }
}

module.exports = AvlTree;
