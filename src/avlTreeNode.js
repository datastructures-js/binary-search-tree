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
   * @internal
   * rotates left (counter-clockwise) and updates parent and children
   */
  rotateLeft() {
    const right = this.getRight(); // this.right will be re-assigned

    // set the node as a left child of its right child
    if (right !== null) {
      if (right.getLeft() !== null) {
        right.getLeft().setParent(this);
      }

      // rebase right child to node's right left child.
      this.right = right.getLeft();

      right.setLeft(this);
      right.setParent(this.parent);
    }

    // rebase parent's child to node's right child
    if (this.parent !== null && right !== null) {
      if (this.parent.getKey() < right.getKey()) {
        this.parent.setRight(right);
      } else {
        this.parent.setLeft(right);
      }
    }

    // rebase parent to node's right child
    this.parent = right;

    this.updateHeight();
    if (this.parent !== null) {
      this.parent.updateHeight();
    }
  }

  /**
   * @internal
   * rotates right (clockwise) and updates parent and children
   */
  rotateRight() {
    const left = this.getLeft(); // this.left will be re-assigned

    // set the node as a right child of its left child
    if (left !== null) {
      if (left.getRight() !== null) {
        left.getRight().setParent(this);
      }

      // rebase right child to node's right left child.
      this.left = left.getRight();

      left.setRight(this);
      left.setParent(this.parent);
    }

    // rebase parent to node's left child
    if (this.parent !== null && left !== null) {
      if (this.parent.getKey() > left.getKey()) {
        this.parent.setLeft(left);
      } else {
        this.parent.setRight(left);
      }
    }

    // rebase parent to node's right child
    this.parent = left;

    this.updateHeight();
    if (this.parent !== null) {
      this.parent.updateHeight();
    }
  }

  /**
   * @internal
   * rotates left child to left then itself to right
   */
  rotateLeftRight() {
    if (this.left !== null) {
      this.left.rotateLeft();
    }
    this.rotateRight();
  }

  /**
   * @internal
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
   * @internal
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
