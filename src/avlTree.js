/**
 * datastructures-js/binary-search-tree
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 */

const { BinarySearchTree } = require('./binarySearchTree');
const { AvlTreeNode } = require('./avlTreeNode');

/**
 * @class AvlTree
 * @extends BinarySearchTree
 */
class AvlTree extends BinarySearchTree {
  constructor(compare) {
    if (compare && typeof compare !== 'function') {
      throw new Error('AvlTree constructor expects a compare function');
    }

    super(compare);
  }

  /**
   * Applies the proper rotation on a node
   * @private
   * @param {AvlTreeNode} node
   */
  _balanceNode(node) {
    if (!node) return;

    node.updateHeight();
    const balance = node.getBalance();
    if (balance > 1) {
      if (node.getLeft().hasLeft()) {
        node.rotateRight();
      } else if (node.getLeft().hasRight()) {
        node.rotateLeftRight();
      }
    } else if (balance < -1) {
      if (node.getRight().hasRight()) {
        node.rotateLeft();
      } else if (node.getRight().hasLeft()) {
        node.rotateRightLeft();
      }
    }

    // check if root was rotated
    if ((balance < -1 || balance > 1) && node === this._root) {
      // replace root when rotated with the child (now parent of root)
      this._root = node.getParent();
    }
  }

  /**
   * Inserts a value into the tree and maintains
   * the tree balanced by making the necessary rotations
   *
   * @public
   * @param {number|string|object} value
   * @return {AvlTree}
   */
  insert(value) {
    const newNode = new AvlTreeNode(value, this._compare);
    const insertRecursive = (current) => {
      const compare = this._compare(value, current.getValue());
      if (compare < 0) {
        if (current.hasLeft()) {
          insertRecursive(current.getLeft());
          this._balanceNode(current); // backward-tracking
        } else {
          newNode.setParent(current);
          current.setLeft(newNode).updateHeight();
          this._count += 1;
        }
      } else if (compare > 0) {
        if (current.hasRight()) {
          insertRecursive(current.getRight());
          this._balanceNode(current); // backward-tracking
        } else {
          newNode.setParent(current);
          current.setRight(newNode).updateHeight();
          this._count += 1;
        }
      } else {
        current.setValue(value);
      }
    };

    if (this._root === null) {
      this._root = newNode;
      this._count += 1;
    } else {
      insertRecursive(this._root);
    }

    return this;
  }

  /**
   * Removes a node from the tree and maintains
   * the tree balanced by making the necessary rotations
   *
   * @public
   * @param {number|string|object} value
   * @return {boolean}
   */
  remove(value) {
    const removeRecursively = (val, current) => {
      if (current === null) {
        return false;
      }

      const compare = this._compare(val, current.getValue());
      if (compare < 0) {
        const removed = removeRecursively(val, current.getLeft());
        this._balanceNode(current);
        return removed;
      }

      if (compare > 0) {
        const removed = removeRecursively(val, current.getRight());
        this._balanceNode(current);
        return removed;
      }

      // current node is the node to remove

      // case 1: node has no children
      if (current.isLeaf()) {
        if (current.isRoot()) {
          this._root = null;
        } else if (this._compare(val, current.getParent().getValue()) < 0) {
          current.getParent().setLeft(null).updateHeight();
        } else {
          current.getParent().setRight(null).updateHeight();
        }
        this._count -= 1;
        return true;
      }

      // case 2: node has a left child and no right child
      if (!current.hasRight()) {
        if (current.isRoot()) {
          this._root = current.getLeft();
        } else if (this._compare(val, current.getParent().getValue()) < 0) {
          current.getParent().setLeft(current.getLeft()).updateHeight();
        } else {
          current.getParent().setRight(current.getLeft()).updateHeight();
        }
        current.getLeft().setParent(current.getParent());
        this._count -= 1;
        return true;
      }

      // case 3: node has a right child and no left child
      if (!current.hasLeft()) {
        if (current.isRoot()) {
          this._root = current.getRight();
        } else if (this._compare(val, current.getParent().getValue()) < 0) {
          current.getParent().setLeft(current.getRight()).updateHeight();
        } else {
          current.getParent().setRight(current.getRight()).updateHeight();
        }
        current.getRight().setParent(current.getParent());
        this._count -= 1;
        return true;
      }

      // case 4: node has left and right children
      const minRight = this.min(current.getRight());
      const removed = removeRecursively(minRight.getValue(), minRight);
      current.setValue(minRight.getValue());
      this._balanceNode(current);
      return removed;
    };

    return removeRecursively(value, this._root);
  }
}

exports.AvlTree = AvlTree;
