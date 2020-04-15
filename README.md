# @datastructures-js/binary-search-tree

[![build:?](https://travis-ci.org/datastructures-js/binary-search-tree.svg?branch=master)](https://travis-ci.org/datastructures-js/binary-search-tree) 
[![npm](https://img.shields.io/npm/v/@datastructures-js/binary-search-tree.svg)](https://www.npmjs.com/package/@datastructures-js/binary-search-tree)
[![npm](https://img.shields.io/npm/dm/@datastructures-js/binary-search-tree.svg)](https://www.npmjs.com/package/@datastructures-js/binary-search-tree) [![npm](https://img.shields.io/badge/node-%3E=%206.0-blue.svg)](https://www.npmjs.com/package/@datastructures-js/binary-search-tree)

Binary Search Tree & AVL Tree (Self Balancing Tree) implementation in javascript.

<table>
  <tr>
    <td width="200"><b>Binary Search Tree</b></td>
    <td align="center">
      <img width="413" alt="Binary Search Tree" src="https://user-images.githubusercontent.com/6517308/35762621-74a72626-085f-11e8-8934-ef6facdd6e10.png">
    </td>
  </tr>
  <tr>
    <td width="200"><b>AVL Tree <br>(Self Balancing Tree)</b></td>
    <td>
      <img width="1387" alt="AVL Tree" src="https://user-images.githubusercontent.com/6517308/37691467-e9c7db8a-2c77-11e8-844a-c6b6c0ff93dd.png">
    </td>
  </tr>
</table>

# Table of Contents
* [Install](#install)
* [API](#api)
  * [require](#require)
  * [import](#import)
  * [Construction](#construction)
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
  * [BinarySearchTreeNode](#binarysearchtreenode)
  * [AvlTreeNode](#avltreenode)
 * [Build](#build)
 * [License](#license)

## install
```sh
npm install --save @datastructures-js/binary-search-tree
```

## API
Both trees have the same interface except that AVL tree will maintain itself balanced by rotating the nodes that become unbalanced during insertion and deletion. If your code requires a strictly balanced tree that always benefits from the **log(n)** runtime of insert & remove, you should use the AVL one.

### require

```js
const { BinarySearchTree, AvlTree } = require('@datastructures-js/binary-search-tree');
```

### import
```js
import { BinarySearchTree, AvlTree } from '@datastructures-js/binary-search-tree';
```

### Construction

```js
const bst = new BinarySearchTree();

// OR a self balancing tree

const bst = new AvlTree();
```

### .insert(key, value)

inserts a node with key/value into the tree. Inserting an node with existing key, would update the existing node's value with the new one. AVL tree will rotate nodes properly if the tree becomes unbalanced during insertion.

<table>
 <tr><th align="center" colspan="2">params</th></tr>
 <tr><td><b>name</b></td><td><b>type</b></td></tr>
 <tr><td>key</td><td>number or string</td></tr>
 <tr><td>value</td><td>object</td></tr>
</table>

<table>
 <tr><th colspan="2" align="center">return</th></tr>
 <tr><td>BinarySearchTree</td><td><a href="#binarysearchtreenode">BinarySearchTreeNode</a></td></tr>
 <tr><td>AvlTree</td><td><a href="#avltreenode">AvlTreeNode</a></td></tr>
</table>

<table>
 <tr>
  <th>runtime</th>
 </tr>
 <tr>
  <td>O(log(n))</td>
 </tr>
</table>

#### Example

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
 <tr><th align="center" colspan="2">params</th></tr>
 <tr><td><b>name</b></td><td><b>type</b></td></tr>
 <tr><td>key</td><td>number or string</td></tr>
</table>

<table>
 <tr><th>return</th></tr>
 <tr><td>boolean</td></tr>
</table>

<table>
 <tr>
  <th>runtime</th>
 </tr>
 <tr>
  <td>O(log(n))</td>
 </tr>
</table>

#### Example

```js
bst.has(50); // true
bst.has(100); // false
```

### .find(key)
finds a node in the tree by its key.

<table>
 <tr><th align="center" colspan="2">params</th></tr>
 <tr><td><b>name</b></td><td><b>type</b></td></tr>
 <tr><td>key</td><td>number or string</td></tr>
</table>

<table>
 <tr><th align="center" colspan="2">return</th></tr>
 <tr><td>BinarySearchTree</td><td><a href="#binarysearchtreenode">BinarySearchTreeNode</a></td></tr>
 <tr><td>AvlTree</td><td><a href="#avltreenode">AvlTreeNode</a></td></tr>
</table>

<table>
 <tr>
  <th>runtime</th>
 </tr>
 <tr>
  <td>O(log(n))</td>
 </tr>
</table>

#### Example

```js
const n60 = bst.find(60);
console.log(n60.getKey()); // 60
console.log(n60.getValue()); // v5

console.log(bst.find(100)); // null
```

### .min()
finds the node with min key in the tree.

<table>
 <tr><th align="center" colspan="2">return</th></tr>
 <tr><td>BinarySearchTree</td><td><a href="#binarysearchtreenode">BinarySearchTreeNode</a></td></tr>
 <tr><td>AvlTree</td><td><a href="#avltreenode">AvlTreeNode</a></td></tr>
</table>

<table>
 <tr>
  <th>runtime</th>
 </tr>
 <tr>
  <td>O(log(n))</td>
 </tr>
</table>

#### Example

```js
const min = bst.min();
console.log(min.getKey()); // 20
console.log(min.getValue()); // v7
```

### .max()
finds the node with max key in the tree.

<table>
 <tr><th align="center" colspan="2">return</th></tr>
 <tr><td>BinarySearchTree</td><td><a href="#binarysearchtreenode">BinarySearchTreeNode</a></td></tr>
 <tr><td>AvlTree</td><td><a href="#avltreenode">AvlTreeNode</a></td></tr>
</table>

<table>
 <tr>
  <th>runtime</th>
 </tr>
 <tr>
  <td>O(log(n))</td>
 </tr>
</table>

#### Example

```js
const max = bst.max();
console.log(max.getKey()); // 90
console.log(max.getValue()); // v4
```
### .root()
returns the root node of the tree.

<table>
 <tr><th align="center" colspan="2">return</th></tr>
 <tr><td>BinarySearchTree</td><td><a href="#binarysearchtreenode">BinarySearchTreeNode</a></td></tr>
 <tr><td>AvlTree</td><td><a href="#avltreenode">AvlTreeNode</a></td></tr>
</table>

<table>
 <tr>
  <th>runtime</th>
 </tr>
 <tr>
  <td>O(1)</td>
 </tr>
</table>

#### Example

```js
const root = bst.root();
console.log(root.getKey()); // 50
console.log(root.getValue()); // v1
```

### .count()
returns the count of nodes in the tree.

<table>
 <tr><th>return</th></tr>
 <tr><td>number</td></tr>
</table>

<table>
 <tr>
  <th>runtime</th>
 </tr>
 <tr>
  <td>O(1)</td>
 </tr>
</table>

#### Example

```js
console.log(bst.count()); // 7
```

### .traverseInOrder(cb)
traverses the tree in order (left-node-right).

<table>
 <tr><th align="center" colspan="3">params</th></tr>
 <tr><td><b>name</b></td><td><b>type</b></td><td><b>description</b></td></tr>
 <tr><td>cb</td><td>function</td><td>called with each node</td></tr>
</table>

<table>
 <tr>
  <th>runtime</th>
 </tr>
 <tr>
  <td>O(n)</td>
 </tr>
</table>

#### Example

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
 <tr><th align="center" colspan="3">params</th></tr>
 <tr><td><b>name</b></td><td><b>type</b></td><td><b>description</b></td></tr>
 <tr><td>cb</td><td>function</td><td>called with each node</td></tr>
</table>

<table>
 <tr>
  <th>runtime</th>
 </tr>
 <tr>
  <td>O(n)</td>
 </tr>
</table>

#### Example

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
 <tr><th align="center" colspan="3">params</th></tr>
 <tr><td><b>name</b></td><td><b>type</b></td><td><b>description</b></td></tr>
 <tr><td>cb</td><td>function</td><td>called with each node</td></tr>
</table>

<table>
 <tr>
  <th>runtime</th>
 </tr>
 <tr>
  <td>O(n)</td>
 </tr>
</table>

#### Example

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
removes a node from the tree by its key. AVL tree will rotate nodes properly if the tree becomes unbalanced during deletion.

<table>
 <tr><th align="center" colspan="3">params</th></tr>
 <tr><td><b>name</b></td><td><b>type</b></td></tr>
 <tr><td>key</td><td>number or string</td></tr>
</table>

<table>
 <tr><th>return</th></tr>
 <tr><td>boolean</td></tr>
</table>

<table>
 <tr>
  <th>runtime</th>
 </tr>
 <tr>
  <td>O(log(n))</td>
 </tr>
</table>

#### Example

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

#### Example

```js
bst.clear();
console.log(bst.count()); // 0
console.log(bst.root()); // null
```

### BinarySearchTreeNode

#### .getKey()
returns the node's key that is used to compare with other nodes.

<table>
 <tr><th>return</th></tr>
 <tr><td>number or string</td></tr>
</table>


#### .setValue(value)
change the value that is associated with a node.

<table>
 <tr><th align="center" colspan="3">params</th></tr>
 <tr><td><b>name</b></td><td><b>type</b></td></tr>
 <tr><td>value</td><td>object</td></tr>
</table>

#### .getValue()
returns the value that is associated with a node.

<table>
 <tr><th>return</th></tr>
 <tr><td>object</td></tr>
</table>

#### .getLeft()
returns node's left child node.

<table>
 <tr><th align="center" colspan="2">return</th></tr>
 <tr><td>BinarySearchTree</td><td><a href="#binarysearchtreenode">BinarySearchTreeNode</a></td></tr>
 <tr><td>AvlTree</td><td><a href="#avltreenode">AvlTreeNode</a></td></tr>
</table>

#### .getRight()
returns node's right child node.

<table>
 <tr><th align="center" colspan="2">return</th></tr>
 <tr><td>BinarySearchTree</td><td><a href="#binarysearchtreenode">BinarySearchTreeNode</a></td></tr>
 <tr><td>AvlTree</td><td><a href="#avltreenode">AvlTreeNode</a></td></tr>
</table>

#### .getParent()
returns node's parent node.

<table>
 <tr><th align="center" colspan="2">return</th></tr>
 <tr><td>BinarySearchTree</td><td><a href="#binarysearchtreenode">BinarySearchTreeNode</a></td></tr>
 <tr><td>AvlTree</td><td><a href="#avltreenode">AvlTreeNode</a></td></tr>
</table>

### AvlTreeNode
extends <a href="#binarysearchtreenode">BinarySearchTreeNode</a> and adds the following methods:

#### .getHeight()
the height of the node in the tree. root height is 1.

<table>
 <tr><th>return</th></tr>
 <tr><td>number</td></tr>
</table>

#### .getLeftHeight()
the height of the left child. 0 if no left child.

<table>
 <tr><th>return</th></tr>
 <tr><td>number</td></tr>
</table>

#### .getRightHeight()
the height of the right child. 0 if no right child.

<table>
 <tr><th>return</th></tr>
 <tr><td>number</td></tr>
</table>

#### .calculateBalance()
returns the node's balance by subtracting right height from left height.

<table>
 <tr><th>return</th></tr>
 <tr><td>number</td></tr>
</table>

## Build
```
grunt build
```

## License
The MIT License. Full License is [here](https://github.com/datastructures-js/binary-search-tree/blob/master/LICENSE)
