/**
 * datastructures-js/binary-search-tree
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 */

/**
 * @class BinarySearchTreeNode
 */
class BinarySearchTreeNode {
  constructor(value) {
    this._value = value;
    this._left = null;
    this._right = null;
    this._parent = null;
  }

  /**
   * @public
   * @param {number|string|object} value
   * @returns {BinarySearchTreeNode}
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
   * @param {BinarySearchTreeNode} left
   * @returns {BinarySearchTreeNode}
   */
  setLeft(left) {
    if (left && !(left instanceof BinarySearchTreeNode)) {
      throw new Error('setLeft expects a BinarySearchTreeNode');
    }

    this._left = left || null;
    return this;
  }

  /**
   * @public
   * @return {BinarySearchTreeNode}
   */
  getLeft() {
    return this._left;
  }

  /**
   * @public
   * @return {boolean}
   */
  hasLeft() {
    return this._left instanceof BinarySearchTreeNode;
  }

  /**
   * @public
   * @param {BinarySearchTreeNode|null} right
   * @returns {BinarySearchTreeNode}
   */
  setRight(right) {
    if (right && !(right instanceof BinarySearchTreeNode)) {
      throw new Error('setRight expects a BinarySearchTreeNode or null');
    }

    this._right = right || null;
    return this;
  }

  /**
   * @public
   * @return {BinarySearchTreeNode}
   */
  getRight() {
    return this._right;
  }

  /**
   * @public
   * @return {boolean}
   */
  hasRight() {
    return this._right instanceof BinarySearchTreeNode;
  }

  /**
   * @public
   * @param {BinarySearchTreeNode} parent
   * @returns {BinarySearchTreeNode}
   */
  setParent(parent) {
    if (parent && !(parent instanceof BinarySearchTreeNode)) {
      throw new Error('setParent expects a BinarySearchTreeNode or null');
    }

    this._parent = parent || null;
    return this;
  }

  /**
   * @public
   * @return {BinarySearchTreeNode}
   */
  getParent() {
    return this._parent;
  }

  /**
   * @public
   * @return {boolean}
   */
  hasParent() {
    return this._parent instanceof BinarySearchTreeNode;
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
}

exports.BinarySearchTreeNode = BinarySearchTreeNode;
