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
    this.key = key;
    this.value = value;
    this.left = null;
    this.right = null;
    this.parent = null;
    this.height = 1;
  }

  /**
   * @internal
   * @param {number|string}
   */
  setKey(key) {
    this.key = key;
  }

  /**
   * @public
   * @return {number|string}
   */
  getKey() {
    return this.key;
  }

  /**
   * @public
   * @param {object}
   */
  setValue(value) {
    this.value = value;
  }

  /**
   * @public
   * @return {object}
   */
  getValue() {
    return this.value;
  }

  /**
   * @internal
   * @param {BinarySearchTreeNode}
   */
  setLeft(left) {
    this.left = left;
  }

  /**
   * @public
   * @return {BinarySearchTreeNode}
   */
  getLeft() {
    return this.left;
  }

  /**
   * @internal
   * @param {BinarySearchTreeNode}
   */
  setRight(right) {
    this.right = right;
  }

  /**
   * @public
   * @return {BinarySearchTreeNode}
   */
  getRight() {
    return this.right;
  }

  /**
   * @internal
   * @param {BinarySearchTreeNode}
   */
  setParent(parent) {
    this.parent = parent;
  }

  /**
   * @public
   * @return {BinarySearchTreeNode}
   */
  getParent() {
    return this.parent;
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
   * @return {number}
   */
  getBalance() {
    return this.getLeftHeight() - this.getRightHeight();
  }
}

module.exports = BinarySearchTreeNode;
