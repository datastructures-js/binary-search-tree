/**
 * datastructures-js/binary-search-tree
 * @copyright 2018 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 */

/**
 * binary tree node
 * @function
 */
const node = (v, p, l, r) => {
  let value = v;
  let parent = p || null;
  let left = l || null;
  let right = r || null;

  /**
   * @param {object} value
   */
  const setValue = (val) => {
    value = val;
  };

  /**
   * @returns {string|number}
   */
  const getValue = () => value;

  /**
   * @param {object} pr
   */
  const setParent = (pr) => {
    parent = pr;
  };

  /**
   * @returns {object} node
   */
  const getParent = () => parent;

  /**
   * @param {BinaryNode} node
   */
  const setLeft = (lf) => {
    left = lf;
  };

  /**
   * @returns {object} node
   */
  const getLeft = () => left;

  /**
   * @param {object} rg
   */
  const setRight = (rg) => {
    right = rg;
  };

  /**
   * @returns {BinaryNode}
   */
  const getRight = () => right;

  // binary tree node api
  return {
    setValue,
    getValue,
    setParent,
    getParent,
    setRight,
    getRight,
    setLeft,
    getLeft
  };
};

/**
 * binary search tree
 * @function
 */
const binarySearchTree = () => {
  let rootNode = null;
  let nodesCount = 0;

  /**
   * @returns {object} node
   */
  const root = () => rootNode;

  /**
   * @returns {number}
   */
  const count = () => nodesCount;

  /**
   * gets max value node in the tree
   * @returns {object} node
   */
  const max = (startingNode) => {
    let currentNode = startingNode || rootNode;
    while (currentNode !== null && currentNode.getRight() !== null) {
      currentNode = currentNode.getRight();
    }
    return currentNode;
  };

  /**
   * gets min value node in the tree
   * @returns {object} node
   */
  const min = (startingNode) => {
    let currentNode = startingNode || rootNode;
    while (currentNode !== null && currentNode.getLeft() !== null) {
      currentNode = currentNode.getLeft();
    }
    return currentNode;
  };

  /**
   * finds a node in the tree by a given value
   * @param {(string|number)} value
   * @returns {object} node
   */
  const find = (value) => {
    let currentNode = rootNode;
    while (currentNode !== null) {
      if (value > currentNode.getValue()) {
        currentNode = currentNode.getRight();
      } else if (value < currentNode.getValue()) {
        currentNode = currentNode.getLeft();
      } else {
        return currentNode;
      }
    }
    return null;
  };

  /**
   * inserts a node by a given value into the tree
   * @param {(string|number)} value
   */
  const insert = (value) => {
    const insertFn = (currentNode) => {
      if (currentNode === null) {
        rootNode = node(value);
        nodesCount += 1;
      } else if (value < currentNode.getValue()) {
        if (currentNode.getLeft() === null) {
          currentNode.setLeft(node(value, currentNode));
          nodesCount += 1;
        } else {
          insertFn(currentNode.getLeft());
        }
      } else if (value > currentNode.getValue()) {
        if (currentNode.getRight() === null) {
          currentNode.setRight(node(value, currentNode));
          nodesCount += 1;
        } else {
          insertFn(currentNode.getRight());
        }
      }
    };
    insertFn(rootNode);
  };

  /**
   * removes a node by a given value from the tree
   * @param {(string|number)} value
   */
  const remove = (value) => {
    const removeFn = (val, currentNode) => {
      if (currentNode !== null) {
        const left = currentNode.getLeft();
        const right = currentNode.getRight();
        if (val > currentNode.getValue()) {
          removeFn(val, right);
        } else if (val < currentNode.getValue()) {
          removeFn(val, left);
        } else {
          const parent = currentNode.getParent();
          if (right === null && left === null) {
            // remove a node with no children
            if (parent === null) {
              rootNode = null;
            } else if (currentNode.getValue() >= parent.getValue()) {
              parent.setRight(null);
            } else {
              parent.setLeft(null);
            }
            nodesCount -= 1;
          } else if (right === null) {
            // remove a node with a left child
            if (parent === null) {
              rootNode = left;
            } else if (currentNode.getValue() > parent.getValue()) {
              parent.setRight(left);
            } else {
              parent.setLeft(left);
            }
            left.setParent(parent);
            nodesCount -= 1;
          } else if (left === null) {
            // remove a node with a right child
            if (parent === null) {
              rootNode = right;
            } else if (currentNode.getValue() > parent.getValue()) {
              parent.setRight(right);
            } else {
              parent.setLeft(right);
            }
            right.setParent(parent);
            nodesCount -= 1;
          } else {
            // remove a node with two children
            const minRight = min(right);
            currentNode.setValue(minRight.getValue());
            removeFn(minRight.getValue(), minRight);
          }
        }
      }
    };
    removeFn(value, rootNode);
  };

  /**
   * traverse the binary tree in-order (left-parent-right)
   * @param {function} cb - called with each node value
   */
  const traverseInOrder = (cb) => {
    const traverseInOrderFn = (currentNode) => {
      if (currentNode !== null) {
        traverseInOrderFn(currentNode.getLeft());
        cb(currentNode);
        traverseInOrderFn(currentNode.getRight());
      }
    };
    traverseInOrderFn(rootNode);
  };

  /**
   * traverse the binary tree pre-order (parent-left-right)
   * @param {function} cb - called with each node value
   */
  const traversePreOrder = (cb) => {
    const traversePreOrderFn = (currentNode) => {
      if (currentNode !== null) {
        cb(currentNode);
        traversePreOrderFn(currentNode.getLeft());
        traversePreOrderFn(currentNode.getRight());
      }
    };
    traversePreOrderFn(rootNode);
  };

  /**
   * traverse the binary tree post-order (left-right-parent)
   * @param {function} cb - called with each node value
   */
  const traversePostOrder = (cb) => {
    const traversePostOrderFn = (currentNode) => {
      if (currentNode !== null) {
        traversePostOrderFn(currentNode.getLeft());
        traversePostOrderFn(currentNode.getRight());
        cb(currentNode);
      }
    };
    traversePostOrderFn(rootNode);
  };

  /**
   * traverse the binary tree
   * @param {function} cb - called with each node value
   * @param {string} type - 'inOrder' | 'preOrder' | 'postOrder'
   */
  const traverse = (cb, type) => {
    switch (type) {
      case 'inOrder':
        traverseInOrder(cb);
        break;
      case 'preOrder':
        traversePreOrder(cb);
        break;
      case 'postOrder':
        traversePostOrder(cb);
        break;
      default:
        traverseInOrder(cb);
    }
  };

  /**
   * clears the tree
   */
  const clear = () => {
    rootNode = null;
    nodesCount = 0;
  };

  // binary tree api
  return {
    node,
    root,
    count,
    clear,
    max,
    min,
    find,
    insert,
    remove,
    traverseInOrder,
    traversePreOrder,
    traversePostOrder,
    traverse
  };
};

module.exports = binarySearchTree;
