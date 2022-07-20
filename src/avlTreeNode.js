/**
 * datastructures-js/binary-search-tree
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 */

const defaultCompare = (a, b) => {
  if (a === b) return 0;
  return a > b ? 1 : -1;
};

/**
 * AvlTree node class type
 * @class AvlTreeNode
 */
class AvlTreeNode {
  constructor(value, compare) {
    if (compare && typeof compare !== 'function') {
      throw new Error('AvlTreeNode constructor expects a compare function');
    }

    this._value = value;
    this._compare = compare || defaultCompare;
    this._left = null;
    this._right = null;
    this._parent = null;
    this._height = 1;
  }

  /**
   * @public
   * @param {number|string|object} value
   * @returns {AvlTreeNode}
   */
  setValue(value) {
    this._value = value;
    return this;
  }

  /**
   * @public
   * @return {number|string|object}
   */
  getValue() {
    return this._value;
  }

  /**
   * @public
   * @param {AvlTreeNode} left
   * @returns {AvlTreeNode}
   */
  setLeft(left) {
    if (left && !(left instanceof AvlTreeNode)) {
      throw new Error('setLeft expects an AvlTreeNode');
    }

    this._left = left || null;
    return this;
  }

  /**
   * @public
   * @return {AvlTreeNode}
   */
  getLeft() {
    return this._left;
  }

  /**
   * @public
   * @return {boolean}
   */
  hasLeft() {
    return this._left instanceof AvlTreeNode;
  }

  /**
   * @public
   * @param {AvlTreeNode} right
   * @returns {AvlTreeNode}
   */
  setRight(right) {
    if (right && !(right instanceof AvlTreeNode)) {
      throw new Error('setRight expects a AvlTreeNode or null');
    }

    this._right = right || null;
    return this;
  }

  /**
   * @public
   * @return {AvlTreeNode}
   */
  getRight() {
    return this._right;
  }

  /**
   * @public
   * @return {boolean}
   */
  hasRight() {
    return this._right instanceof AvlTreeNode;
  }

  /**
   * @public
   * @param {AvlTreeNode} parent
   * @returns {AvlTreeNode}
   */
  setParent(parent) {
    if (parent && !(parent instanceof AvlTreeNode)) {
      throw new Error('setParent expects an AvlTreeNode');
    }

    this._parent = parent || null;
    return this;
  }

  /**
   * @public
   * @return {AvlTreeNode}
   */
  getParent() {
    return this._parent;
  }

  /**
   * @public
   * @return {boolean}
   */
  hasParent() {
    return this._parent instanceof AvlTreeNode;
  }

  /**
   * @public
   * @return {boolean}
   */
  isRoot() {
    return this._parent === null;
  }

  /**
   * @public
   * @return {boolean}
   */
  isLeaf() {
    return !this.hasLeft() && !this.hasRight();
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
      if (this._compare(this._parent.getValue(), right.getValue()) < 0) {
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
      if (this._compare(this._parent.getValue(), left.getValue()) > 0) {
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
