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
}

module.exports = AvlTree;
