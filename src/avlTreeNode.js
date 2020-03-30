/**
 * datastructures-js/binary-search-tree
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 */

const BinarySearchTreeNode = require('./binarySearchTreeNode');

/**
 * @class AvlTreeNode
 * @extends BinarySearchTreeNode
 */

class AvlTreeNode extends BinarySearchTreeNode {
  constructor(key, value) {
    super(key, value);
    this.height = 1;
  }

  /**
   * @public
   * rotates left (counter-clockwise) & updates parent and children positions
   */
  rotateLeft() {
    // set the node as a left child of its right child
    if (this.right !== null) {
      if (this.right.getLeft() !== null) {
        this.right.getLeft().setParent(this);
      }
      this.right.setLeft(this);
      this.right.setParent(this.parent);
    }

    // rebase parent's child to node's right child
    if (this.parent !== null && this.right !== null) {
      if (this.parent.getKey() < this.right.getKey()) {
        this.parent.setRight(this.right);
      } else {
        this.parent.setLeft(this.right);
      }
    }

    // rebase parent to node's right child
    this.parent = this.right;

    // rebase right child to node's right left child.
    if (this.right !== null) {
      this.right = this.right.getLeft();
    }

    if (this.parent !== null) {
      this.parent.updateHeight();
    }
    this.updateHeight();
  }

  /**
   * @public
   * rotates right (clockwise) & updates parent and children positions
   */
  rotateRight() {
    // set the node as a right child of its left child
    if (this.left !== null) {
      if (this.left.getRight() !== null) {
        this.left.getRight().setParent(this);
      }
      this.left.setRight(this);
      this.left.setParent(this.parent);
    }

    // rebase parent to node's left child
    if (this.parent !== null && this.left !== null) {
      if (this.parent.getKey() > this.left.getKey()) {
        this.parent.setLeft(this.left);
      } else {
        this.parent.setRight(this.left);
      }
    }

    // rebase parent to node's right child
    this.parent = this.left;

    // rebase right child to node's right left child.
    if (this.left !== null) {
      this.left = this.left.getRight();
    }

    if (this.parent !== null) {
      this.parent.updateHeight();
    }
    this.updateHeight();
  }

  /**
   * @public
   * rotates left child to left then itself to right
   */
  rotateLeftRight() {
    if (this.left !== null) {
      this.left.rotateLeft();
    }
    this.rotateRight();
  }

  /**
   * @public
   * rotates right child to right then itself to left
   */
  rotateRightLeft() {
    if (this.right !== null) {
      this.right.rotateRight();
    }
    this.rotateLeft();
  }

  /**
   * @public
   * @return {number}
   */
  getLeftHeight() {
    return this.left !== null ? this.left.getHeight() : 0;
  }

  /**
   * @public
   * @return {number}
   */
  getRightHeight() {
    return this.right !== null ? this.right.getHeight() : 0;
  }

  /**
   * @public
   * updates the height of a node as the max height of its children
   */
  updateHeight() {
    this.height = Math.max(this.getLeftHeight(), this.getRightHeight()) + 1;
  }

  /**
   * @public
   * @return {number}
   */
  getHeight() {
    return this.height;
  }

  /**
   * @public
   * calculate the balance of a node as the diff between left & right heights
   * @return {number}
   */
  calculateBalance() {
    return this.getLeftHeight() - this.getRightHeight();
  }
}

module.exports = AvlTreeNode;
