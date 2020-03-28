# @datastrucures-js/binary-search-tree

[![build:?](https://travis-ci.org/datastructures-js/binary-search-tree.svg?branch=master)](https://travis-ci.org/datastructures-js/binary-search-tree) 
[![npm](https://img.shields.io/npm/v/@datastructures-js/binary-search-tree.svg)](https://www.npmjs.com/package/@datastructures-js/binary-search-tree)
[![npm](https://img.shields.io/npm/dm/@datastructures-js/binary-search-tree.svg)](https://www.npmjs.com/package/@datastructures-js/binary-search-tree) [![npm](https://img.shields.io/badge/node-%3E=%206.0-blue.svg)](https://www.npmjs.com/package/@datastructures-js/binary-search-tree)

javascript implementation of Binary Search Tree.

<img width="413" alt="Binary Search Tree" src="https://user-images.githubusercontent.com/6517308/35762621-74a72626-085f-11e8-8934-ef6facdd6e10.png">

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
```js
const { BinarySearchTree } = require('@datastructures-js/binary-search-tree');
```

### import
```js
import { BinarySearchTree } from '@datastructures-js/binary-search-tree';
```

### Create a Tree

```js
const bst = new BinarySearchTree();
```

### .insert(key, value)

inserts a node with key/value into the tree.

<table>
 <tr>
  <th>runtime</th>
  <th>params</th>
  <th>return</th>
 </tr>
 <tr>
  <td>O(log(n))</td>
  <td>
   key: {number} or {string}
   <br><br>
   value: {object}
  </td>
  <td>
    {BinarySearchTreeNode} the inserted node
    <br><br>
    <b>.getKey()</b> {number|string} returns the node's key that is used to compare with other nodes.
    <b>.setValue(value)</b> change the value that is associated with a node.
    <b>.getValue()</b> {object} returns the value that is associated with a node.
    <b>.getLeft()</b> {BinarySearchTreeNode} returns node's left child node.
    <b>.getRight()</b> {BinarySearchTreeNode} returns node's right child node.
    <b>.getParent()</b> {BinarySearchTreeNode} returns node's parent node.
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

### .find(key)

### .min()

### .max()

### .root()

### .count()

### .traverseInOrder(cb)

### .traversePreOrder(cb)

### .traversePostOrder(cb)

### .remove(key)

###.clear()

### .root()

## Build
```
grunt build
```

## License
The MIT License. Full License is [here](https://github.com/datastructures-js/binary-search-tree/blob/master/LICENSE)
