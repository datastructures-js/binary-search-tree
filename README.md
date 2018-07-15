# @datastrucures-js/binary-search-tree

[![build:?](https://travis-ci.org/eyas-ranjous/datatructures-js/binary-search-tree.svg?branch=master)](https://travis-ci.org/eyas-ranjous/datatructures-js/binary-search-tree) 
[![npm](https://img.shields.io/npm/v/@datastructures-js/binary-search-tree.svg)](https://www.npmjs.com/package/@datastructures-js/binary-search-tree)
[![npm](https://img.shields.io/npm/dm/@datastructures-js/binary-search-tree.svg)](https://www.npmjs.com/packages/@datastructures-js/binary-search-tree) [![npm](https://img.shields.io/badge/node-%3E=%206.0-blue.svg)](https://www.npmjs.com/package/@datastructures-js/binary-search-tree)

node's data type: **string**, **number**.

<img width="413" alt="Binary Search Tree" src="https://user-images.githubusercontent.com/6517308/35762621-74a72626-085f-11e8-8934-ef6facdd6e10.png">

## Usage
```js
const binarySearchTree = require('@datastructures-js/binary-search-tree');
const bst = binarySearchTree();
```

## API

**.node(value, parent, left, right)**

creates a bst node.

* **.setValue(value)** sets the node's value.
* **.getValue()** gets the node's value.
* **.setParent(parent)** sets the parent node.
* **.getParent()** gets the parent node.
* **.setLeft(left)** sets the node's left child.
* **.getLeft()** gets the node's left child.
* **.setRight(right)** sets the node's right child.
* **.getRight()** gets the node's right child.

```js
const n = bst.node('test');
console.log(n.getValue()); // test
console.log(n.getParent()); // null
console.log(n.getLeft()); // null
console.log(n.getRight()); // null
```

**.insert(value)** 

inserts a value into the tree.
```javascript
bst.insert(50);
bst.insert(80);
bst.insert(30);
bst.insert(90);
bst.insert(60);
bst.insert(40);
bst.insert(20);
```

**.root()** 

gets the root node
```javascript
console.log(bst.root().getValue()); // 50
```

**.min()** 

finds the min value node (most left).
```javascript
console.log(bst.min().getValue()); // 20
```

**.max()** 

finds the min value node (most right).
```javascript
console.log(bst.max().getValue()); // 90
```

**.count()** 

gets nodes count.
```javascript
console.log(bst.count()); // 7
```

**.find(value)** 

finds the value's node or returns null if not found.
```javascript
let n = bst.find(30);
console.log(n.getValue()); // 30
console.log(n.getRight().getValue()); // 40
console.log(n.getLeft().getValue()); // 20
```

**.traverseInOrder(cb)** 
```js
// in-order traverse (left-parent-right)
bst.traverseInOrder(node => console.log(node.getValue()));

// 20
// 30
// 40
// 50
// 60
// 80
// 90
```

**.traversePreOrder(cb)** 

```js
// pre-order traverse (parent-left-right)
bst.traversePreOrder(node => console.log(node.getValue()));

// 50
// 30
// 20
// 40
// 80
// 60
// 90
```

**.traversePostOrder(cb)** 

```js
// post-order traverse (left-right-parent)
bst.traverse(node => console.log(node.getValue()));

// 20
// 40
// 30
// 60
// 90
// 80
// 50
```

**.traverse(cb, order)** 

traverse the tree in the defined order and apply a callback on each node.

order values: `inOrder`, `preOrder` OR `postOrder`. default is `inOrder`

```js
bst.traverse(node => console.log(node.getValue())); // in-order

// 20
// 30
// 40
// 50
// 60
// 80
// 90

bst.traverse(node => console.log(node.getValue()), 'preOrder');

// 50
// 30
// 20
// 40
// 80
// 60
// 90
```


**.remove(value)** 

removes a value's node (if exists) from the tree.
```javascript
console.log(bst.find(30).getValue()); // 30
bst.remove(30);
console.log(bst.find(30)); // null
```

**.clear()** 

clears the tree.
```javascript
bst.clear();
console.log(bst.count()); // 0
```

## Build
```
grunt build
```

## License
The MIT License. Full License is [here](https://github.com/datastructures-js/binary-search-tree/blob/master/LICENSE)
