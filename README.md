# @datastructures-js/binary-search-tree

[![build:?](https://travis-ci.org/datastructures-js/binary-search-tree.svg?branch=master)](https://travis-ci.org/datastructures-js/binary-search-tree) 
[![npm](https://img.shields.io/npm/v/@datastructures-js/binary-search-tree.svg)](https://www.npmjs.com/package/@datastructures-js/binary-search-tree)
[![npm](https://img.shields.io/npm/dm/@datastructures-js/binary-search-tree.svg)](https://www.npmjs.com/package/@datastructures-js/binary-search-tree) [![npm](https://img.shields.io/badge/node-%3E=%206.0-blue.svg)](https://www.npmjs.com/package/@datastructures-js/binary-search-tree)

Binary Search Tree & AVL Tree (Self Balancing Tree) implementation in javascript.

<img src="https://user-images.githubusercontent.com/6517308/121813242-859a9700-cc6b-11eb-99c0-49e5bb63005b.jpg">

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

# Contents
* [Install](#install)
* [require](#require)
* [import](#import)
* [API](#api)
  * [constructor](#constructor)
  * [.insert(key, value)](#insertkey-value)
  * [.has(key)](#haskey)
  * [.find(key)](#findkey)
  * [.min()](#min)
  * [.max()](#max)
  * [.lowerBound(k[, includeEqual]) (floor)](#lowerboundk-includeEqual-floor)
  * [.upperBound(k[, includeEqual]) (ceil)](#upperboundk-includeEqual-ceil)
  * [.root()](#root)
  * [.count()](#count)
  * [.traverseInOrder(cb)](#traverseinordercb)
  * [.traversePreOrder(cb)](#traversepreordercb)
  * [.traversePostOrder(cb)](#traversepostordercb)
  * [.remove(key)](#removekey)
  * [.clear()](#clear)
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

### .insert(key[, value])

inserts a node with key/value into the tree and returns the inserted node. Inserting an node with existing key, will update the existing node's value with the new one.

<table>
  <tr>
    <th align="center">params</th>
    <th align="center">return</th>
    <th align="center">runtime</th>
  </tr>
  <tr>
    <td>
      key: T (number | string)
      <br />
      value: U
    </td>
    <td align="center"><a href="#binarysearchtreenodet-u">BinarySearchTreeNode&lt;T, U&gt;</a> | <a href="#avltreenodet-u">AvlTreeNode&lt;T, U&gt;</a></td>
    <td align="center">O(log(n))</td>
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
    <th align="center">params</th>
    <th align="center">return</th>
    <th align="center">runtime</th>
  </tr>
  <tr>
    <td>
      key: T (number | string)
    </td>
    <td align="center">boolean</td>
    <td align="center">O(log(n))</td>
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
    <th align="center">params</th>
    <th align="center">return</th>
    <th align="center">runtime</th>
  </tr>
  <tr>
    <td>
      key: T (number | string)
    </td>
    <td align="center"><a href="#binarysearchtreenodet-u">BinarySearchTreeNode&lt;T, U&gt;</a> | <a href="#avltreenodet-u">AvlTreeNode&lt;T, U&gt;</a></td>
    <td align="center">O(log(n))</td>
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
    <th align="center">return</th>
    <th align="center">runtime</th>
  </tr>
  <tr>
    <td align="center"><a href="#binarysearchtreenodet-u">BinarySearchTreeNode&lt;T, U&gt;</a> | <a href="#avltreenodet-u">AvlTreeNode&lt;T, U&gt;</a></td>
    <td align="center">O(log(n))</td>
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
    <th align="center">return</th>
    <th align="center">runtime</th>
  </tr>
  <tr>
    <td align="center"><a href="#binarysearchtreenodet-u">BinarySearchTreeNode&lt;T, U&gt;</a> | <a href="#avltreenodet-u">AvlTreeNode&lt;T, U&gt;</a></td>
    <td align="center">O(log(n))</td>
  </tr>
</table>

```js
const max = bst.max();
console.log(max.getKey()); // 90
console.log(max.getValue()); // v4
```

### .lowerBound(k[, includeEqual]) (.floor)
finds the node with the biggest key less or equal a given value k. You can eliminate equal keys by passing second param as false. `.floor` is a delegate to the same function.

<table>
  <tr>
    <th align="center">params</th>
    <th align="center">return</th>
    <th align="center">runtime</th>
  </tr>
  <tr>
    <td>
      k: T (number | string)
      <br />
      includeEqual: boolean
    </td>
    <td align="center"><a href="#binarysearchtreenodet-u">BinarySearchTreeNode&lt;T, U&gt;</a> | <a href="#avltreenodet-u">AvlTreeNode&lt;T, U&gt;</a></td>
    <td align="center">O(log(n))</td>
  </tr>
</table>

```js
console.log(bst.lowerBound(60).getKey()); // 60
console.log(bst.lowerBound(60, false).getKey()); // 50
console.log(bst.lowerBound(10)); // null
```

### .upperBound(k[, includeEqual]) (.ceil)
finds the node with the smallest key bigger or equal a given value k. You can eliminate equal keys by passing second param as false. `.ceil` is a delegate to the same function.

<table>
  <tr>
    <th align="center">params</th>
    <th align="center">return</th>
    <th align="center">runtime</th>
  </tr>
  <tr>
    <td>
      k: T (number | string)
      <br />
      includeEqual: boolean
    </td>
    <td align="center"><a href="#binarysearchtreenodet-u">BinarySearchTreeNode&lt;T, U&gt;</a> | <a href="#avltreenodet-u">AvlTreeNode&lt;T, U&gt;</a></td>
    <td align="center">O(log(n))</td>
  </tr>
</table>

```js
console.log(bst.upperBound(75).getKey()); // 80
console.log(bst.upperBound(80).getKey()); // 80
console.log(bst.upperBound(80, false).getKey()); // 90
console.log(bst.upperBound(110)); // null
```

### .root()
returns the root node of the tree.

<table>
  <tr>
    <th align="center">return</th>
    <th align="center">runtime</th>
  </tr>
  <tr>
    <td align="center"><a href="#binarysearchtreenodet-u">BinarySearchTreeNode&lt;T, U&gt;</a> | <a href="#avltreenodet-u">AvlTreeNode&lt;T, U&gt;</a></td>
    <td align="center">O(1)</td>
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
    <th align="center">return</th>
    <th align="center">runtime</th>
  </tr>
  <tr>
    <td align="center">number</td>
    <td align="center">O(1)</td>
  </tr>
</table>

```js
console.log(bst.count()); // 7
```

### .traverseInOrder(cb)
traverses the tree in order (left-node-right).

<table>
  <tr>
    <th align="center">params</th>
    <th align="center">runtime</th>
  </tr>
  <tr>
    <td align="center">cb: (node: <a href="#binarysearchtreenodet-u">BinarySearchTreeNode&lt;T, U&gt;</a> | <a href="#avltreenodet-u">AvlTreeNode&lt;T, U&gt;</a>) => void</td>
    <td align="center">O(n)</td>
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
    <th align="center">params</th>
    <th align="center">runtime</th>
  </tr>
  <tr>
    <td align="center">cb: (node: <a href="#binarysearchtreenodet-u">BinarySearchTreeNode&lt;T, U&gt;</a> | <a href="#avltreenodet-u">AvlTreeNode&lt;T, U&gt;</a>) => void</td>
    <td align="center">O(n)</td>
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
    <th align="center">params</th>
    <th align="center">runtime</th>
  </tr>
  <tr>
    <td align="center">cb: (node: <a href="#binarysearchtreenodet-u">BinarySearchTreeNode&lt;T, U&gt;</a> | <a href="#avltreenodet-u">AvlTreeNode&lt;T, U&gt;</a>) => void</td>
    <td align="center">O(n)</td>
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
removes a node from the tree by its key. AVL tree will rotate nodes properly if the tree becomes unbalanced during deletion.

<table>
  <tr>
    <th align="center">params</th>
    <th align="center">return</th>
    <th align="center">runtime</th>
  </tr>
  <tr>
    <td align="center">key: T</td>
    <td align="center">boolean</td>
    <td align="center">O(log(n))</td>
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

### BinarySearchTreeNode&lt;T, U&gt;

#### .getKey()

<table>
 <tr><th>return</th></tr>
 <tr><td>T (number | string)</td></tr>
</table>

#### .setValue(value)

<table>
 <tr><th>params</th></tr>
 <tr><td>value: U</td></tr>
</table>

#### .getValue()

<table>
 <tr><th>return</th></tr>
 <tr><td>U</td></tr>
</table>

#### .setLeft(left)

<table>
 <tr><th>params</th></tr>
 <tr><td>left: <a href="#binarysearchtreenodet-u">BinarySearchTreeNode&lt;T, U&gt;</a></td></tr>
</table>

#### .getLeft()

<table>
 <tr><th>return</th></tr>
 <tr><td><a href="#binarysearchtreenodet-u">BinarySearchTreeNode&lt;T, U&gt;</a></td></tr>
</table>

#### .hasLeft()

<table>
 <tr><th>return</th></tr>
 <tr><td>boolean</td></tr>
</table>

#### .setRight(right)

<table>
 <tr><th>params</th></tr>
 <tr><td>right: <a href="#binarysearchtreenodet-u">BinarySearchTreeNode&lt;T, U&gt;</a></td></tr>
</table>

#### .getRight()

<table>
 <tr><th>return</th></tr>
 <tr><td><a href="#binarysearchtreenodet-u">BinarySearchTreeNode&lt;T, U&gt;</a></td></tr>
</table>

#### .hasRight()

<table>
 <tr><th>return</th></tr>
 <tr><td>boolean</td></tr>
</table>

#### .setParent(parent)

<table>
 <tr><th>params</th></tr>
 <tr><td>parent: <a href="#binarysearchtreenodet-u">BinarySearchTreeNode&lt;T, U&gt;</a></td></tr>
</table>

#### .getParent()

<table>
 <tr><th>return</th></tr>
 <tr><td><a href="#binarysearchtreenodet-u">BinarySearchTreeNode&lt;T, U&gt;</a></td></tr>
</table>

#### .hasParent()

<table>
 <tr><th>return</th></tr>
 <tr><td>boolean</td></tr>
</table>

#### .isLeaf()

<table>
 <tr><th>return</th></tr>
 <tr><td>boolean</td></tr>
</table>

#### .isRoot()

<table>
 <tr><th>return</th></tr>
 <tr><td>boolean</td></tr>
</table>

### AvlTreeNode&lt;T, U&gt;
extends <a href="#binarysearchtreenodet-u">BinarySearchTreeNode&lt;T, U&gt;</a> and adds the following methods:

#### .rotateLeft()
Rotates self left (counter-clockwise).

<table>
 <tr><th>return</th></tr>
 <tr><td><a href="#avltreenodet-u">AvlTreeNode&lt;T, U&gt;</a></td></tr>
</table>

#### .rotateRight()
Rotates self right (clockwise).

<table>
 <tr><th>return</th></tr>
 <tr><td><a href="#avltreenodet-u">AvlTreeNode&lt;T, U&gt;</a></td></tr>
</table>

#### .rotateLeftRight()
Rotates left child to left then self to right.

<table>
 <tr><th>return</th></tr>
 <tr><td><a href="#avltreenodet-u">AvlTreeNode&lt;T, U&gt;</a></td></tr>
</table>

#### .rotateRightLeft()
Rotates right child to right then self to left.

<table>
 <tr><th>return</th></tr>
 <tr><td><a href="#avltreenodet-u">AvlTreeNode&lt;T, U&gt;</a></td></tr>
</table>

#### .getHeight()
Gets the height of the node in the tree. root height is 1.

<table>
 <tr><th>return</th></tr>
 <tr><td>number</td></tr>
</table>

#### .getLeftHeight()
Gets the height of left child. 0 if no left child.

<table>
 <tr><th>return</th></tr>
 <tr><td>number</td></tr>
</table>

#### .getRightHeight()
Gets the height of right child. 0 if no right child.

<table>
 <tr><th>return</th></tr>
 <tr><td>number</td></tr>
</table>

#### .getBalance()
returns the node's balance as the diff between left and right heights.

<table>
 <tr><th>return</th></tr>
 <tr><td>number</td></tr>
</table>

#### .isBalanced()
checks if the node is balanced. (height diff is not more/less than 1/-1)

<table>
 <tr><th>return</th></tr>
 <tr><td>boolean</td></tr>
</table>

## Build
```
grunt build
```

## License
The MIT License. Full License is [here](https://github.com/datastructures-js/binary-search-tree/blob/master/LICENSE)
