# @datastrucures-js/binary-search-tree

[![build:?](https://travis-ci.org/datastructures-js/binary-search-tree.svg?branch=master)](https://travis-ci.org/datastructures-js/binary-search-tree) 
[![npm](https://img.shields.io/npm/v/@datastructures-js/binary-search-tree.svg)](https://www.npmjs.com/package/@datastructures-js/binary-search-tree)
[![npm](https://img.shields.io/npm/dm/@datastructures-js/binary-search-tree.svg)](https://www.npmjs.com/package/@datastructures-js/binary-search-tree) [![npm](https://img.shields.io/badge/node-%3E=%206.0-blue.svg)](https://www.npmjs.com/package/@datastructures-js/binary-search-tree)

node's **key** data type: **string**, **number**.
node's **value** data type: any.

<img width="413" alt="Binary Search Tree" src="https://user-images.githubusercontent.com/6517308/35762621-74a72626-085f-11e8-8934-ef6facdd6e10.png">

## Usage
```
npm install --save @datastructures-js/binary-search-tree
```

then

```js
const binarySearchTree = require('@datastructures-js/binary-search-tree');
const bst = binarySearchTree();
```

## API

### .node(key, value, parent, left, right)
creates a bst node with the following api.

* .setKey(key)
* .getKey()
* .setValue(value)
* .getValue()
* .setParent(node)
* .getParent()
* .setLeft(node)
* .getLeft()
* .setRight(node)
* .getRight()

```js
const n = bst.node(1, 'test');
console.log(n.getKey()); // 1
console.log(n.getValue()); // test
console.log(n.getParent()); // null
console.log(n.getLeft()); // null
console.log(n.getRight()); // null
```

### .insert(key, value)

inserts a node with key/value into the tree.
```javascript
bst.insert(50, 'v1');
bst.insert(80, 'v2');
bst.insert(30, 'v3');
bst.insert(90, 'v4');
bst.insert(60, 'v5');
bst.insert(40, 'v6');
bst.insert(20, 'v7');
```

### .root()

gets the root node
```javascript
console.log(bst.root().getKey()); // 50
```

### .min()

finds the min key node (most left).
```javascript
console.log(bst.min().getKey()); // 20
```

### .max() 

finds the max key node (most right).
```javascript
console.log(bst.max().getKey()); // 90
```

### .count()

gets nodes count.
```javascript
console.log(bst.count()); // 7
```

### .search(key)

finds a node by key or returns null if not found.
```javascript
const n = bst.search(30);
console.log(n.getKey()); // 30
console.log(n.getRight().getKey()); // 40
console.log(n.getLeft().getKey()); // 20
```

### .traverseInOrder(cb)
```js
// in-order traverse (left-parent-right)
bst.traverseInOrder(node => console.log(node.getKey()));

// 20
// 30
// 40
// 50
// 60
// 80
// 90
```

### .traversePreOrder(cb)

```js
// pre-order traverse (parent-left-right)
bst.traversePreOrder(node => console.log(node.getKey()));

// 50
// 30
// 20
// 40
// 80
// 60
// 90
```

### .traversePostOrder(cb)

```js
// post-order traverse (left-right-parent)
bst.traverse(node => console.log(node.getKey()));

// 20
// 40
// 30
// 60
// 90
// 80
// 50
```

### .traverse(cb, order)

traverse the tree in the defined order and apply a callback on each node.

order values: `inOrder`, `preOrder` OR `postOrder`. default is `inOrder`

```js
bst.traverse(node => console.log(node.getKey())); // in-order

// 20
// 30
// 40
// 50
// 60
// 80
// 90

bst.traverse(node => console.log(node.getKey()), 'preOrder');

// 50
// 30
// 20
// 40
// 80
// 60
// 90
```


### .remove(value)

removes a value's node (if exists) from the tree.
```javascript
console.log(bst.search(30).getKey()); // 30
bst.remove(30);
console.log(bst.search(30)); // null
```

### .clear()

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
