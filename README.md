# @datastructures-js/binary-search-tree

[![build:?](https://travis-ci.org/datastructures-js/binary-search-tree.svg?branch=master)](https://travis-ci.org/datastructures-js/binary-search-tree) 
[![npm](https://img.shields.io/npm/v/@datastructures-js/binary-search-tree.svg)](https://www.npmjs.com/package/@datastructures-js/binary-search-tree)
[![npm](https://img.shields.io/npm/dm/@datastructures-js/binary-search-tree.svg)](https://www.npmjs.com/package/@datastructures-js/binary-search-tree) [![npm](https://img.shields.io/badge/node-%3E=%206.0-blue.svg)](https://www.npmjs.com/package/@datastructures-js/binary-search-tree)

Binary Search Tree & AVL Tree (Self Balancing Tree) implementation in javascript.

<img src="https://user-images.githubusercontent.com/6517308/121813242-859a9700-cc6b-11eb-99c0-49e5bb63005b.jpg">

# Contents
* [Install](#install)
* [require](#require)
* [import](#import)
* [API](#api)
  * [constructor](#constructor)
  * [insert](#insert)
  * [has](#has)
  * [find](#find)
  * [min](#min)
  * [max](#max)
  * [lowerBound (floor)](#lowerbound-floor)
  * [upperBound (ceil)](#upperbound-ceil)
  * [root](#root)
  * [count](#count)
  * [traverseInOrder](#traverseinorder)
  * [traversePreOrder](#traversepreorder)
  * [traversePostOrder](#traversepostorder)
  * [remove](#remove)
  * [clear](#clear)
  * [BinarySearchTreeNode](#binarysearchtreenodet-u)
  * [AvlTreeNode](#avltreenodet-u)
 * [Build](#build)
 * [License](#license)

## install
```sh
npm install --save @datastructures-js/binary-search-tree
```

### require

```js
const {
  BinarySearchTree,
  BinarySearchTreeNode,
  AvlTree,
  AvlTreeNode
} = require('@datastructures-js/binary-search-tree');
```

### import
```js
import {
  BinarySearchTree,
  BinarySearchTreeNode,
  AvlTree,
  AvlTreeNode
} from '@datastructures-js/binary-search-tree';
```

## API

### constructor

##### JS
```js
const bst = new BinarySearchTree();
```

```js
// self balancing tree
const bst = new AvlTree();
```

##### TS
```js
// BinarySearchTree<T extends number|string, U = undefined>
const bst = new BinarySearchTree<number, string>();
```

```js
// AvlTree<T extends number|string, U = undefined>
const bst = new AvlTree<number, { id: string, count: number }>();
```

### insert
O(log(n))

inserts a node with key/value into the tree and returns the inserted node. Inserting an node with existing key, will update the existing node's value with the new one.

```js
bst.insert(50, 'v1');
bst.insert(80, 'v2');
bst.insert(30, 'v3');
bst.insert(90, 'v4');
bst.insert(60, 'v5');
bst.insert(40, 'v6');
bst.insert(20, 'v7');
```

### has
O(log(n))

checks if a node exists by its key.

```js
bst.has(50); // true
bst.has(100); // false
```

### find
O(log(n))

finds a node in the tree by its key.

```js
const n60 = bst.find(60);
console.log(n60.getKey()); // 60
console.log(n60.getValue()); // v5

console.log(bst.find(100)); // null
```

### min
O(log(n))

finds the node with min key in the tree.

```js
const min = bst.min();
console.log(min.getKey()); // 20
console.log(min.getValue()); // v7
```

### max
O(log(n))

finds the node with max key in the tree.

```js
const max = bst.max();
console.log(max.getKey()); // 90
console.log(max.getValue()); // v4
```

### lowerBound (floor)
O(log(n))

finds the node with the biggest key less or equal a given key k. You can eliminate equal keys by passing second param as false. `.floor` is an alias to the same function.

```js
console.log(bst.lowerBound(60).getKey()); // 60
console.log(bst.lowerBound(60, false).getKey()); // 50
console.log(bst.lowerBound(10)); // null
```

### upperBound (ceil)
O(log(n))

finds the node with the smallest key bigger or equal a given key k. You can eliminate equal keys by passing second param as false. `.ceil` is an alias to the same function.

```js
console.log(bst.upperBound(75).getKey()); // 80
console.log(bst.upperBound(80).getKey()); // 80
console.log(bst.upperBound(80, false).getKey()); // 90
console.log(bst.upperBound(110)); // null
```

### root
O(1)

returns the root node of the tree.

```js
const root = bst.root();
console.log(root.getKey()); // 50
console.log(root.getValue()); // v1
```

### count
O(1)

returns the count of nodes in the tree.

```js
console.log(bst.count()); // 7
```

### traverseInOrder
O(n)

traverses the tree in order (left-node-right).

```js
bst.traverseInOrder((node) => console.log(node.getKey()));

/*
  20
  30
  40
  50
  60
  80
  90
*/
```

### traversePreOrder
O(n)

traverses the tree pre order (node-left-right).

```js
bst.traversePreOrder((node) => console.log(node.getKey()));

/*
  50
  30
  20
  40
  80
  60
  90
*/
```

### traversePostOrder
O(n)

traverses the tree post order (left-right-node).

```js
bst.traversePostOrder((node) => console.log(node.getKey()));

/*
  20
  40
  30
  60
  90
  80
  50
*/
```

### remove
O(log(n))

removes a node from the tree by its key. AVL tree will rotate nodes properly if the tree becomes unbalanced during deletion.

```js
bst.remove(20); // true
bst.remove(100); // false
console.log(bst.count()); // 6
```

### clear
O(1)

clears the tree.

```js
bst.clear();
console.log(bst.count()); // 0
console.log(bst.root()); // null
```

### BinarySearchTreeNode&lt;T, U&gt;

#### setKey
sets the node's key.

#### getKey
gets the node's key.

#### setValue
sets the node's value.

#### getValue
gets the node's value.

#### setLeft
sets the node's left child.

#### getLeft
gets the node's left child.

#### hasLeft
checks if node has a left child.

#### setRight
sets the node's right child.

#### getRight
gets the node's right child.

#### hasRight
checks if node has a right child.

#### setParent
sets the node's parent node.

#### getParent
gets the node's parent node.

#### hasParent
checks if node has a parent node.

#### isLeaf
checks if node is a leaf in the tree.

#### isRoot
check if node is the root node.

### AvlTreeNode&lt;T, U&gt;
extends <a href="#binarysearchtreenodet-u">BinarySearchTreeNode&lt;T, U&gt;</a> and adds the following methods:

#### rotateLeft
Rotates self left (counter-clockwise).

#### rotateRight
Rotates self right (clockwise).

#### rotateLeftRight
Rotates left child to left then self to right.

#### rotateRightLeft
Rotates right child to right then self to left.

#### getHeight
Gets the height of the node in the tree. root height is 1.

#### getLeftHeight
Gets the height of left child. 0 if no left child.

#### getRightHeight
Gets the height of right child. 0 if no right child.

#### getBalance
returns the node's balance as the diff between left and right heights.

#### isBalanced
checks if the node is balanced. (height diff is not more/less than 1/-1)

## Build
```
grunt build
```

## License
The MIT License. Full License is [here](https://github.com/datastructures-js/binary-search-tree/blob/master/LICENSE)
