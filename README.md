# @datastructures-js/binary-search-tree

[![build:?](https://travis-ci.org/datastructures-js/binary-search-tree.svg?branch=master)](https://travis-ci.org/datastructures-js/binary-search-tree) 
[![npm](https://img.shields.io/npm/v/@datastructures-js/binary-search-tree.svg)](https://www.npmjs.com/package/@datastructures-js/binary-search-tree)
[![npm](https://img.shields.io/npm/dm/@datastructures-js/binary-search-tree.svg)](https://www.npmjs.com/package/@datastructures-js/binary-search-tree) [![npm](https://img.shields.io/badge/node-%3E=%206.0-blue.svg)](https://www.npmjs.com/package/@datastructures-js/binary-search-tree)

Binary Search Tree & AVL Tree (Self Balancing Tree) implementation in javascript.

<table>
  <tr>
    <td><b>Binary Search Tree</b></td>
    <td>
      <img alt="Binary Search Tree" src="https://user-images.githubusercontent.com/6517308/35762621-74a72626-085f-11e8-8934-ef6facdd6e10.png">
    </td>
  </tr>
  <tr>
    <td><b>AVL Tree (Self Balancing Tree)</b></td>
    <td>
      <img alt="AVL Tree" src="https://user-images.githubusercontent.com/6517308/37691467-e9c7db8a-2c77-11e8-844a-c6b6c0ff93dd.png">
    </td>
  </tr>
</table>

# Table of Contents
* [Install](#install)
* [API](#api)
  * [require](#require)
  * [import](#import)
  * [Creating a Tree](#create-a-tree)
  * [.insert(key, value)](#insertkey-value)
  * [.has(key)](#haskey)
  * [.find(key)](#findkey)
  * [.min()](#min)
  * [.max()](#max)
  * [.root()](#root)
  * [.count()](#count)
  * [.traverseInOrder(cb)](#traverseinordercb)
  * [.traversePreOrder(cb)](#traversepreordercb)
  * [.traversePostOrder(cb)](#traversepostordercb)
  * [.remove(key)](#removekey)
  * [.clear()](#clear)
 * [Build](#build)
 * [License](#license)

## install
```sh
npm install --save @datastructures-js/binary-search-tree
```

## API

### require
Both trees have the same interface except that AVL tree will maintain itself balance due to rotating nodes that becomes unbalanced on insertion and deletion. If your code requires a strictly balanced tree that always benefits from the **log(n)** runtime of insert & remove, you should use AVL.

```js
const { BinarySearchTree, AvlTree } = require('@datastructures-js/binary-search-tree');
```

### import
```js
import { BinarySearchTree, AvlTree } from '@datastructures-js/binary-search-tree';
```

### Create a Tree

```js
const bst = new BinarySearchTree();

// OR a self balancing tree

const bst = new AvlTree();
```

### .insert(key, value)

inserts a node with key/value into the tree. Inserting an node with existing key, would update the existing node's value with the new inserted one. AVL tree will rotate nodes properly if the tree becomes unbalanced with the insertion.

<table>
 <tr>
  <th>runtime</th>
  <th>params</th>
  <th>return</th>
 </tr>
 <tr>
  <td>O(log(n))</td>
  <td>
   <b>key</b>: {number} or {string}
   <br><br>
   <b>value</b>: {object}
  </td>
  <td>
    {<b>BinarySearchTreeNode</b>} for BinarySearchTree
    <br><br>
    <b>.getKey()</b> {number|string} returns the node's key that is used to compare with other nodes.<br>
    <b>.setValue(value)</b> change the value that is associated with a node.<br>
    <b>.getValue()</b> {object} returns the value that is associated with a node.<br>
    <b>.getLeft()</b> {BinarySearchTreeNode} returns node's left child node.<br>
    <b>.getRight()</b> {BinarySearchTreeNode} returns node's right child node.<br>
    <b>.getParent()</b> {BinarySearchTreeNode} returns node's parent node.
    <br><br><br>
    {<b>AvlTreeNode</b>} for AvlTree. It extends the BinarySearchTreeNode and adds the following methods:
    <br><br>
    <b>.getHeight()</b> {number} the height of the node in the tree. root is 1.<br>
    <b>.getLeftHeight()</b> {number} the height of the left child. 0 if no left child.<br>
    <b>.getRightHeight()</b> {number} the height of the right child. 0 if no right child.<br>
  </td>
 </tr>
</table>

```js
bst.insert(50, 'v1');
bst.insert(80, 'v2');
bst.insert(30, 'v3');
bst.insert(90, 'v4');
bst.insert(60, 'v5');
bst.insert(40, 'v6');
bst.insert(20, 'v7');
```

### .has(key)
checks if a node exists by its key.

<table>
 <tr>
  <th>runtime</th>
  <th>params</th>
  <th>return</th>
 </tr>
 <tr>
  <td>O(log(n))</td>
  <td>
   <b>key</b>: {number} or {string}
  </td>
  <td>
    {boolean}
  </td>
 </tr>
</table>

```js
bst.has(50); // true
bst.has(100); // false
```

### .find(key)
finds a node in the tree by its key.

<table>
 <tr>
  <th>runtime</th>
  <th>params</th>
  <th>return</th>
 </tr>
 <tr>
  <td>O(log(n))</td>
  <td>
   <b>key</b>: {number} or {string}
  </td>
  <td>
    {BinarySearchTreeNode} for BinarySearchTree
    <br><br>
    {AvlTreeNode} for AvlTree
  </td>
 </tr>
</table>

```js
const n60 = bst.find(60);
console.log(n60.getKey()); // 60
console.log(n60.getValue()); // v5

console.log(bst.find(100)); // null
```

### .min()
finds the node with min key in the tree.

<table>
 <tr>
  <th>runtime</th>
  <th>return</th>
 </tr>
 <tr>
  <td>O(log(n))</td>
  <td>
    {BinarySearchTreeNode} for BinarySearchTree
    <br><br>
    {AvlTreeNode} for AvlTree
  </td>
 </tr>
</table>

```js
const min = bst.min();
console.log(min.getKey()); // 20
console.log(min.getValue()); // v7
```

### .max()
finds the node with max key in the tree.

<table>
 <tr>
  <th>runtime</th>
  <th>return</th>
 </tr>
 <tr>
  <td>O(log(n))</td>
  <td>
    {BinarySearchTreeNode} for BinarySearchTree
    <br><br>
    {AvlTreeNode} for AvlTree
  </td>
 </tr>
</table>

```js
const max = bst.max();
console.log(max.getKey()); // 90
console.log(max.getValue()); // v4
```
### .root()
returns the root node of the tree.

<table>
 <tr>
  <th>runtime</th>
  <th>return</th>
 </tr>
 <tr>
  <td>O(1)</td>
  <td>
    {BinarySearchTreeNode} for BinarySearchTree
    <br><br>
    {AvlTreeNode} for AvlTree
  </td>
 </tr>
</table>

```js
const root = bst.root();
console.log(root.getKey()); // 50
console.log(root.getValue()); // v1
```

### .count()
returns the count of nodes in the tree.

<table>
 <tr>
  <th>runtime</th>
  <th>return</th>
 </tr>
 <tr>
  <td>O(1)</td>
  <td>
    {number}
  </td>
 </tr>
</table>

```js
console.log(bst.count()); // 7
```

### .traverseInOrder(cb)
traverses the tree in order (left-node-right).

<table>
 <tr>
  <th>runtime</th>
  <th>param</th>
 </tr>
 <tr>
  <td>O(n)</td>
  <td>
   <b>cb</b>: {function}
  </td>
 </tr>
</table>

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

### .traversePreOrder(cb)
traverses the tree pre order (node-left-right).

<table>
 <tr>
  <th>runtime</th>
  <th>param</th>
 </tr>
 <tr>
  <td>O(n)</td>
  <td>
   <b>cb</b>: {function}
  </td>
 </tr>
</table>

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

### .traversePostOrder(cb)
traverses the tree post order (left-right-node).

<table>
 <tr>
  <th>runtime</th>
  <th>param</th>
 </tr>
 <tr>
  <td>O(n)</td>
  <td>
   <b>cb</b>: {function}
  </td>
 </tr>
</table>

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

### .remove(key)
removes a node from the tree by its key. AVL tree will rotate nodes properly if the tree becomes unbalanced with the deletion.

<table>
 <tr>
  <th>runtime</th>
  <th>params</th>
  <th>return</th>
 </tr>
 <tr>
  <td>O(log(n))</td>
  <td>
   <b>key</b>: {number} or {string}
  </td>
  <td>
    {boolean}
  </td>
 </tr>
</table>

```js
bst.remove(20); // true
bst.remove(100); // false
console.log(bst.count()); // 6
```

### .clear()
clears the tree.

<table>
 <tr>
  <th>runtime</th>
 </tr>
 <tr>
  <td>O(1)</td>
 </tr>
</table>

```js
bst.clear();
console.log(bst.count()); // 0
console.log(bst.root()); // null
```

## Build
```
grunt build
```

## License
The MIT License. Full License is [here](https://github.com/datastructures-js/binary-search-tree/blob/master/LICENSE)
