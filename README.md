# @datastructures-js/binary-search-tree

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
constructor accepts a custom compare function to insert new values into the tree based on the returned number:

* less than 0: place value in the left.
* greater than 0: place value in the right.
* 0: tree will update value if exists with the new one.

There is already a default compare function for primitive values (number, string).

##### JS
###### BinarySearchTree
```js
const nums = new BinarySearchTree();
const employees = new BinarySearchTree((a, b) => a.id - b.id);
```

###### AvlTree
```js
const nums = new AvlTree();
const employees = new AvlTree((a, b) => a.id - b.id);
```

##### TS
```js
interface IEmployee {
  id: number;
}
```

###### BinarySearchTree
```js
const nums = new BinarySearchTree<number>();
const employees = new BinarySearchTree<IEmployee>((a, b) => a.id - b.id);
```

###### AvlTree
```js
const nums = new AvlTree<number>();
const employees = new AvlTree<IEmployee>((a, b) => a.id - b.id);
```

### insert
O(log(n))

inserts a value into the tree and returns the inserted node. Inserting an node with existing value, will update the existing node's value with the new one.

```js
nums
  .insert(50)
  .insert(80)
  .insert(30)
  .insert(90)
  .insert(60)
  .insert(40)
  .insert(20);

employees
  .insert({ id: 50 })
  .insert({ id: 80 })
  .insert({ id: 30 })
  .insert({ id: 90 })
  .insert({ id: 60 })
  .insert({ id: 40 })
  .insert({ id: 20 });
```

### has
O(log(n))

checks if a value exists.

```js
nums1.has(50); // true
nums.has(100); // false
```

### find
O(log(n))

finds a value and returns its node.

```js
const n60 = nums.find(60);
console.log(n60.getValue()); // 60
console.log(nums.find(100)); // null
```

### min
O(log(n))

finds the node with min value in the tree.

```js
const min = nums.min();
console.log(min.getValue()); // 20
```

### max
O(log(n))

finds the node with max value in the tree.

```js
const max = nums.max();
console.log(max.getValue()); // 90
```

### lowerBound (floor)
O(log(n))

finds the node with the biggest value less or equal a given value v. You can eliminate equal keys by passing second param as false. `.floor` is an alias to the same function.

```js
console.log(nums.lowerBound(60).getValue()); // 60
console.log(nums.lowerBound(60, false).getValue()); // 50
console.log(nums.lowerBound(10)); // null
```

### upperBound (ceil)
O(log(n))

finds the node with the smallest key bigger or equal a given key k. You can eliminate equal keys by passing second param as false. `.ceil` is an alias to the same function.

```js
console.log(nums.upperBound(75).getValue()); // 80
console.log(nums.upperBound(80).getValue()); // 80
console.log(nums.upperBound(80, false).getValue()); // 90
console.log(nums.upperBound(110)); // null
```

### root
O(1)

returns the root node of the tree.

```js
const root = nums.root();
console.log(root.getValue()); // 50
```

### count
O(1)

returns the count of nodes in the tree.

```js
console.log(nums.count()); // 7
```

### traverseInOrder
O(n)

traverses the tree in order (left-node-right).

```js
nums.traverseInOrder((node) => console.log(node.getValue()));

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
nums.traversePreOrder((node) => console.log(node.getValue()));

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
nums.traversePostOrder((node) => console.log(node.getValue()));

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
nums.remove(20); // true
nums.remove(100); // false
console.log(nums.count()); // 6
```

### clear
O(1)

clears the tree.

```js
nums.clear();
console.log(nums.count()); // 0
console.log(nums.root()); // null
```

### BinarySearchTreeNode&lt;T&gt;

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

### AvlTreeNode&lt;T&gt;
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
