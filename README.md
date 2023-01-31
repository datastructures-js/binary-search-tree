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
  * [hasKey](#haskey)
  * [find](#find)
  * [findKey](#findkey)
  * [min](#min)
  * [max](#max)
  * [lowerBound (floor)](#lowerbound-floor)
  * [lowerBoundKey (floorKey)](#lowerboundkey-floorkey)
  * [upperBound (ceil)](#upperbound-ceil)
  * [upperBoundKey (ceilKey)](#upperboundkey-ceilkey)
  * [root](#root)
  * [count](#count)
  * [traverseInOrder](#traverseinorder)
  * [traversePreOrder](#traversepreorder)
  * [traversePostOrder](#traversepostorder)
  * [remove](#remove)
  * [removeNode](#removeNode)
  * [clear](#clear)
  * [BinarySearchTreeNode](#binarysearchtreenodet)
  * [AvlTreeNode](#avltreenodet)
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
constructor accepts a custom compare function to insert new values into the tree based on the returned number.

the compare function must return a number for the 3 cases:
* less than 0 to place a value on the left.
* greater than 0 to place a value on the right.
* 0 for equal values.

There is already a default compare function for primitive values (number, string).

constructor also accepts an options param, where the comparison key prob name can be passed for object types in order to search by that key directly using findKey and hasKey.

##### JS
###### BinarySearchTree
```js
const nums = new BinarySearchTree();
const employees = new BinarySearchTree(
  (a, b) => a.id - b.id,
  { key: 'id }
);
```

###### AvlTree
```js
const nums = new AvlTree();
const employees = new AvlTree(
  (a, b) => a.id - b.id,
  { key: 'id' }
);
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
const employees = new BinarySearchTree<IEmployee>((a, b) => a.id - b.id, { key: 'id' });
```

###### AvlTree
```js
const nums = new AvlTree<number>();
const employees = new AvlTree<IEmployee>((a, b) => a.id - b.id, { key: 'id' });
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
nums.has(50); // true
nums.has(100); // false

employees.has({ id: 50 }); // true
employees.has({ id: 100 }); // false
```

### hasKey
O(log(n))

checks if an object exists by its key if the comparison key prob is provided in the constructor.

```js
employees.hasKey(50); // true
employees.hasKey(100); // false
```

### find
O(log(n))

finds a value and returns its node.

```js
nums.find(60).getValue(); // 60
nums.find(100); // null

employees.find({ id: 60 }).getValue(); // { id: 60 }
employees.find({ id: 100 }); // null
```

### findKey
O(log(n))

finds a node by its object key if the comparison key prob is provided in the constructor.

```js
employees.findKey(60).getValue(); // { id: 60 }
employees.findKey(100); // null
```

### min
O(log(n))

finds the node with min value in the tree.

```js
nums.min().getValue(); // 20

employees.min().getValue(); // { id: 20 }
```

### max
O(log(n))

finds the node with max value in the tree.

```js
nums.max().getValue(); // 90

employees.max().getValue(); // { id: 90 }
```

### lowerBound (floor)
O(log(n))

finds the node with the biggest value less or equal a given value. You can eliminate equal values by passing second param as false. `.floor` is an alias to the same function.

```js
nums.lowerBound(60).getValue(); // 60
nums.lowerBound(60, false).getValue(); // 50
nums.lowerBound(10); // null

employees.floor({ id: 60 }).getValue(); // { id: 60 }
employees.floor({ id: 60 }, false).getValue(); // { id: 50 }
employees.floor({ id: 10 }); // null
```

### lowerBoundKey (floorKey)
O(log(n))

finds the node with the biggest key less or equal a given key if the comparison key prob is provided in the constructor. You can eliminate equal values by passing second param as false. `.floorKey` is an alias to the same function.

```js
employees.floorKey(60).getValue(); // { id: 60 }
employees.floorKey(60, false).getValue(); // { id: 50 }
employees.floorKey(10); // null
```

### upperBound (ceil)
O(log(n))

finds the node with the smallest value bigger or equal a given value. You can eliminate equal values by passing second param as false. `.ceil` is an alias to the same function.

```js
nums.upperBound(75).getValue(); // 80
nums.upperBound(80).getValue(); // 80
nums.upperBound(80, false).getValue(); // 90
nums.upperBound(110); // null

employees.ceil({ id: 75 }).getValue(); // { id: 80 }
employees.ceil({ id: 80 }).getValue(); // { id: 80 }
employees.ceil({ id: 80 }, false).getValue(); // { id: 90 }
employees.ceil({ id: 110 }); // null
```


### upperBoundKey (ceilKey)
O(log(n))

finds the node with the smallest key bigger or equal a given key if the comparison key prob is provided in the constructor. You can eliminate equal values by passing second param as false. `.ceilKey` is an alias to the same function.

```js
employees.ceilKey(75).getValue(); // { id: 80 }
employees.ceilKey(80).getValue(); // { id: 80 }
employees.ceilKey(80, false).getValue(); // { id: 90 }
employees.ceilKey(110); // null
```

### root
O(1)

returns the root node of the tree.

```js
nums.root().getValue(); // 50

employees.root().getValue(); // { id: 50 }
```

### count
O(1)

returns the count of nodes in the tree.

```js
nums.count(); // 7

employees.count(); // 7
```

### traverseInOrder
O(n)

traverses the tree in order (left-node-right). it also accepts an optional second param as a callback to abort traversal when it returns true.

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

employees.traverseInOrder((node) => console.log(node.getValue()));
/*
  { id: 20 }
  { id: 30 }
  { id: 40 }
  { id: 50 }
  { id: 60 }
  { id: 80 }
  { id: 90 }
*/

let counter = 0;
const abortCb = () => counter > 1;
employees.traverseInOrder((node) => {
  console.log(node.getValue());
  counter += 1;
}, abortCb);
/*
  { id: 20 }
  { id: 30 }
*/
```

### traversePreOrder
O(n)

traverses the tree pre order (node-left-right). it also accepts an optional second param as a callback to abort traversal when it returns true.

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

employees.traversePreOrder((node) => console.log(node.getValue()));
/*
  { id: 50 }
  { id: 30 }
  { id: 20 }
  { id: 40 }
  { id: 80 }
  { id: 60 }
  { id: 90 }
*/

let counter = 0;
const abortCb = () => counter > 1;
employees.traversePreOrder((node) => {
  console.log(node.getValue());
  counter += 1;
}, abortCb);
/*
  { id: 50 }
  { id: 30 }
*/
```

### traversePostOrder
O(n)

traverses the tree post order (left-right-node). it also accepts an optional second param as a callback to abort traversal when it returns true.

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

employees.traversePostOrder((node) => console.log(node.getValue()));
/*
  { id: 20 }
  { id: 40 }
  { id: 30 }
  { id: 60 }
  { id: 90 }
  { id: 80 }
  { id: 50 }
*/

let counter = 0;
const abortCb = () => counter > 1;
employees.traversePostOrder((node) => {
  console.log(node.getValue());
  counter += 1;
}, abortCb);
/*
  { id: 20 }
  { id: 40 }
*/
```

### remove
O(log(n))

removes a node from the tree by its value. The function will first find the node that corresponds to the value and then remove it. AVL tree will rotate nodes properly if the tree becomes unbalanced.

```js
nums.remove(20); // true
nums.remove(100); // false
nums.count(); // 6

employees.remove({ id: 20 }); // true
employees.remove({ id: 100 }); // false
employees.count(); // 6
```

### removeNode
O(log(n))

removes a node from the tree by its reference.

```js
const n20 = employees.findKey(20);
employees.removeNode(n20); // true

const n50 = employees.findKey(50);
employees.removeNode(n50); // true
```

### clear
O(1)

clears the tree.

```js
nums.clear();
nums.count(); // 0
nums.root(); // null

employees.clear();
employees.count(); // 0
employees.root(); // null
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
