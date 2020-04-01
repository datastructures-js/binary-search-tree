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
}

module.exports = BinarySearchTreeNode;
