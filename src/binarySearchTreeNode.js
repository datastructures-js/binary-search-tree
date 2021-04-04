/**
 * datastructures-js/binary-search-tree
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 */

/**
 * @class BinarySearchTreeNode
 */
class BinarySearchTreeNode {
  constructor(key, value) {
    this._key = key;
    this._value = value;
    this._left = null;
    this._right = null;
    this._parent = null;
  }

  /**
   * @public
   * @param {number|string}
   */
  setKey(key) {
    this._key = key;
  }

  /**
   * @public
   * @return {number|string}
   */
  getKey() {
    return this._key;
  }

  /**
   * @public
   * @param {any} value
   */
  setValue(value) {
    this._value = value;
  }

  /**
   * @public
   * @return {any}
   */
  getValue() {
    return this._value;
  }

  /**
   * @public
   * @param {BinarySearchTreeNode|null} left
   */
  setLeft(left) {
    if (left === null || left instanceof BinarySearchTreeNode) {
      this._left = left;
    } else {
      throw new Error('setLeft expects a BinarySearchTreeNode or null');
    }
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
   */
  setRight(right) {
    if (right === null || right instanceof BinarySearchTreeNode) {
      this._right = right;
    } else {
      throw new Error('setRight expects a BinarySearchTreeNode or null');
    }
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
   */
  setParent(parent) {
    if (parent === null || parent instanceof BinarySearchTreeNode) {
      this._parent = parent;
    } else {
      throw new Error('setParent expects a BinarySearchTreeNode or null');
    }
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
}

module.exports = BinarySearchTreeNode;
