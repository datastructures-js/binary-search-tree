/**
 * datastructures-js/binary-search-tree
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 */

const { BinarySearchTreeNode } = require('./binarySearchTreeNode');

/**
 * @class AvlTreeNode
 * @extends BinarySearchTreeNode
 */
class AvlTreeNode extends BinarySearchTreeNode {
  constructor(key, value) {
    super(key, value);
    this._height = 1;
  }

  /**
   * Rotate-self left (counter-clockwise)
   * @public
   * @returns {AvlTreeNode}
   */
  rotateLeft() {
    const right = this._right; // this._right will be re-assigned

    // set the node as a left child of its right child
    if (right !== null) {
      if (right.hasLeft()) {
        right.getLeft().setParent(this);
      }

      // rebase right child to node's right left child.
      this._right = right.getLeft();

      right.setLeft(this);
      right.setParent(this._parent);
    }

    // rebase parent's child to node's right child
    if (this.hasParent() && right !== null) {
      if (this._parent.getKey() < right.getKey()) {
        this._parent.setRight(right);
      } else {
        this._parent.setLeft(right);
      }
    }

    // rebase parent to node's right child
    this._parent = right;

    this.updateHeight();
    if (this.hasParent()) {
      this._parent.updateHeight();
    }

    return this;
  }

  /**
   * Rotate-self right (clockwise)
   * @public
   * @returns {AvlTreeNode}
   */
  rotateRight() {
    const left = this._left; // this._left will be re-assigned

    // set the node as a right child of its left child
    if (left !== null) {
      if (left.hasRight()) {
        left.getRight().setParent(this);
      }

      // rebase left child to node's left right child.
      this._left = left.getRight();

      left.setRight(this);
      left.setParent(this._parent);
    }

    // rebase parent's child to node's left child
    if (this.hasParent() && left !== null) {
      if (this._parent.getKey() > left.getKey()) {
        this._parent.setLeft(left);
      } else {
        this._parent.setRight(left);
      }
    }

    // rebase parent to node's left child
    this._parent = left;

    this.updateHeight();
    if (this.hasParent()) {
      this._parent.updateHeight();
    }

    return this;
  }

  /**
   * Rotate-self to right after rotating left child to left
   * @public
   * @returns {AvlTreeNode}
   */
  rotateLeftRight() {
    if (this.hasLeft()) {
      this._left.rotateLeft();
    }
    this.rotateRight();
    return this;
  }

  /**
   * Rotate-self to left after rotating right child to right
   * @public
   * @returns {AvlTreeNode}
   */
  rotateRightLeft() {
    if (this.hasRight()) {
      this._right.rotateRight();
    }
    this.rotateLeft();
    return this;
  }

  /**
   * @public
   * @return {number}
   */
  getLeftHeight() {
    return this.hasLeft() ? this.getLeft().getHeight() : 0;
  }

  /**
   * @public
   * @return {number}
   */
  getRightHeight() {
    return this.hasRight() ? this.getRight().getHeight() : 0;
  }

  /**
   * Updates self height based on the max height of children
   * @public
   * @returns {AvlTreeNode}
  */
  updateHeight() {
    this._height = Math.max(this.getLeftHeight(), this.getRightHeight()) + 1;
    return this;
  }

  /**
   * @public
   * @return {number}
   */
  getHeight() {
    return this._height;
  }

  /**
   * Gets the balance of a node as the diff between left & right heights
   * @public
   * @return {number}
   */
  getBalance() {
    return this.getLeftHeight() - this.getRightHeight();
  }

  /**
   * Checks if the node is balanced
   * @public
   * @return {boolean}
   */
  isBalanced() {
    const balance = this.getBalance();
    return balance >= -1 && balance <= 1;
  }
}

exports.AvlTreeNode = AvlTreeNode;
