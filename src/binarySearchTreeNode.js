/**
 * @datastructures-js/binary-search-tree
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
   * @internal
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
   * @param {object}
   */
  setValue(value) {
    this._value = value;
  }

  /**
   * @public
   * @return {object}
   */
  getValue() {
    return this._value;
  }

  /**
   * @internal
   * @param {BinarySearchTreeNode}
   */
  setLeft(left) {
    this._left = left;
  }

  /**
   * @public
   * @return {BinarySearchTreeNode}
   */
  getLeft() {
    return this._left;
  }

  /**
   * @internal
   * @param {BinarySearchTreeNode}
   */
  setRight(right) {
    this._right = right;
  }

  /**
   * @public
   * @return {BinarySearchTreeNode}
   */
  getRight() {
    return this._right;
  }

  /**
   * @internal
   * @param {BinarySearchTreeNode}
   */
  setParent(parent) {
    this._parent = parent;
  }

  /**
   * @public
   * @return {BinarySearchTreeNode}
   */
  getParent() {
    return this._parent;
  }
}

module.exports = BinarySearchTreeNode;
