const { expect } = require('chai');
const { BinarySearchTreeNode } = require('../src/binarySearchTreeNode');
const { BinarySearchTree } = require('../src/binarySearchTree');

describe('BinarySearchTree tests', () => {
  const bst = new BinarySearchTree();

  describe('.insert(value)', () => {
    it('should insert nodes to the tree', () => {
      expect(bst.insert(50)).to.be.instanceof(BinarySearchTree);
      expect(bst.insert(80)).to.be.instanceof(BinarySearchTree);
      expect(bst.insert(30)).to.be.instanceof(BinarySearchTree);
      expect(bst.insert(90)).to.be.instanceof(BinarySearchTree);
      expect(bst.insert(60)).to.be.instanceof(BinarySearchTree);
      expect(bst.insert(40)).to.be.instanceof(BinarySearchTree);
      expect(bst.insert(20)).to.be.instanceof(BinarySearchTree);

      // updates value of existing node
      expect(bst.insert(20)).to.be.instanceof(BinarySearchTree);
      expect(bst.find(20).getValue()).to.equal(20);
    });
  });

  describe('.root()', () => {
    it('should get the root node', () => {
      expect(bst.root().getValue()).to.equal(50);
      expect(bst.root().getRight().getValue()).to.equal(80);
      expect(bst.root().getLeft().getValue()).to.equal(30);
    });
  });

  describe('.count()', () => {
    it('get the count of nodes in the tree', () => {
      expect(bst.count()).to.be.equal(7);
    });
  });

  describe('.has(value)', () => {
    it('checks if a node exists by value', () => {
      expect(bst.has(50)).to.equal(true);
      expect(bst.has(80)).to.equal(true);
      expect(bst.has(30)).to.equal(true);
      expect(bst.has(90)).to.equal(true);
      expect(bst.has(50)).to.equal(true);
      expect(bst.has(40)).to.equal(true);
      expect(bst.has(20)).to.equal(true);
      expect(bst.has(100)).to.equal(false);
    });
  });

  describe('.has(key)', () => {
    it('checks if a node exists by key', () => {
      const testTree = new BinarySearchTree((a, b) => a.id - b.id, { key: 'id' });
      testTree.insert({ id: 1, name: 'a' });
      testTree.insert({ id: 2, name: 'b' });
      testTree.insert({ id: 3, name: 'c' });
      expect(testTree.has({ id: 1 })).to.equal(true);
      expect(testTree.has({ id: 2 })).to.equal(true);
      expect(testTree.has({ id: 3 })).to.equal(true);
      expect(testTree.hasKey(1)).to.equal(true);
      expect(testTree.hasKey(2)).to.equal(true);
      expect(testTree.hasKey(3)).to.equal(true);
    });
  });

  describe('.find(value)', () => {
    it('should search a node by its value in the tree', () => {
      expect(bst.find(50)).to.be.instanceof(BinarySearchTreeNode);
      expect(bst.find(80)).to.be.instanceof(BinarySearchTreeNode);
      expect(bst.find(30)).to.be.instanceof(BinarySearchTreeNode);
      expect(bst.find(90)).to.be.instanceof(BinarySearchTreeNode);
      expect(bst.find(50)).to.be.instanceof(BinarySearchTreeNode);
      expect(bst.find(40)).to.be.instanceof(BinarySearchTreeNode);
      expect(bst.find(20)).to.be.instanceof(BinarySearchTreeNode);
      expect(bst.find(100)).to.equal(null);
    });
  });

  describe('.findKey(key)', () => {
    it('should search a node by its key in the tree', () => {
      const testTree = new BinarySearchTree((a, b) => a.id - b.id, { key: 'id' });
      testTree.insert({ id: 1, name: 'a' });
      testTree.insert({ id: 2, name: 'b' });
      testTree.insert({ id: 3, name: 'c' });
      expect(testTree.find({ id: 1 }).getValue()).to.eql({ id: 1, name: 'a' });
      expect(testTree.find({ id: 2 }).getValue()).to.eql({ id: 2, name: 'b' });
      expect(testTree.find({ id: 3 }).getValue()).to.eql({ id: 3, name: 'c' });
      expect(testTree.findKey(1).getValue()).to.eql({ id: 1, name: 'a' });
      expect(testTree.findKey(2).getValue()).to.eql({ id: 2, name: 'b' });
      expect(testTree.findKey(3).getValue()).to.eql({ id: 3, name: 'c' });
    });
  });

  describe('.max()', () => {
    it('get the node with max key', () => {
      const max = bst.max();
      expect(max.getValue()).to.equal(90);
    });
  });

  describe('.min()', () => {
    it('get the node with min key', () => {
      const min = bst.min();
      expect(min.getValue()).to.equal(20);
    });
  });

  describe('.lowerBound(value)', () => {
    it('gets the node with biggest key less or equal k', () => {
      expect(bst.lowerBound(60).getValue()).to.equal(60);
      expect(bst.lowerBound(60, false).getValue()).to.equal(50);
    });

    it('returns null when k is less than all tree keys', () => {
      expect(bst.lowerBound(10)).to.equal(null);
    });

    it('returns the biggest lower bound of multiple lower bounds', () => {
      const lowerBst = new BinarySearchTree();
      lowerBst.insert(20);
      lowerBst.insert(7);
      lowerBst.insert(15);
      lowerBst.insert(9);
      expect(lowerBst.floor(10).getValue()).to.equal(9);
    });
  });

  describe('.lowerBoundKey(key) / floorKey', () => {
    it('gets the node with biggest key less or equal k', () => {
      const lowerBst = new BinarySearchTree((a, b) => a.id - b.id, { key: 'id' });
      lowerBst.insert({ id: 20 });
      lowerBst.insert({ id: 7 });
      lowerBst.insert({ id: 15 });
      lowerBst.insert({ id: 9 });
      expect(lowerBst.lowerBoundKey(60).getValue()).to.eql({ id: 20 });
      expect(lowerBst.floorKey(20, false).getValue()).to.eql({ id: 15 });
    });
  });

  describe('.upperBound(k)', () => {
    it('gets the node with smallest key bigger than a key', () => {
      expect(bst.upperBound(75).getValue()).to.equal(80);
      expect(bst.upperBound(80).getValue()).to.equal(80);
      expect(bst.upperBound(80, false).getValue()).to.equal(90);
    });

    it('returns null when k is bigger than all tree keys', () => {
      expect(bst.upperBound(110)).to.equal(null);
    });

    it('returns the smallest upper bound of multiple upper bounds', () => {
      const upperBst = new BinarySearchTree();
      upperBst.insert(-133195046);
      upperBst.insert(-49109668);
      upperBst.insert(115062875);
      upperBst.insert(-38206732);
      upperBst.insert(49311742);
      expect(upperBst.ceil(49303013).getValue()).to.equal(49311742);
    });
  });

  describe('.upperBoundKey(key) / ceilKey', () => {
    it('gets the node with smallest key bigger than a key', () => {
      const upperBst = new BinarySearchTree((a, b) => a.id - b.id, { key: 'id' });
      upperBst.insert({ id: 20 });
      upperBst.insert({ id: 7 });
      upperBst.insert({ id: 15 });
      upperBst.insert({ id: 9 });
      expect(upperBst.upperBoundKey(15).getValue()).to.eql({ id: 15 });
      expect(upperBst.ceilKey(15, false).getValue()).to.eql({ id: 20 });
    });
  });

  describe('.traverseInOrder(cb)', () => {
    it('traverse the tree in-order', () => {
      const keys = [];
      bst.traverseInOrder((node) => keys.push(node.getValue()));
      expect(keys).to.deep.equal([20, 30, 40, 50, 60, 80, 90]);
    });

    it('traverse in order and allow aborting traversal', () => {
      const keys = [];
      let counter = 0;
      bst.traverseInOrder((node) => {
        keys.push(node.getValue());
        counter += 1;
      }, () => counter > 2);
      expect(keys).to.deep.equal([20, 30, 40]);
    });
  });

  describe('.traversePreOrder(cb)', () => {
    it('traverse the tree pre-order', () => {
      const keys = [];
      bst.traversePreOrder((node) => keys.push(node.getValue()));
      expect(keys).to.deep.equal([50, 30, 20, 40, 80, 60, 90]);
    });

    it('traverse pre order and allow aborting traversal', () => {
      const keys = [];
      let counter = 0;
      bst.traversePreOrder((node) => {
        keys.push(node.getValue());
        counter += 1;
      }, () => counter > 2);
      expect(keys).to.deep.equal([50, 30, 20]);
    });
  });

  describe('.traversePostOrder(cb)', () => {
    it('traverse the tree post-order', () => {
      const keys = [];
      bst.traversePostOrder((node) => keys.push(node.getValue()));
      expect(keys).to.deep.equal([20, 40, 30, 60, 90, 80, 50]);
    });

    it('traverse post order and allow aborting traversal', () => {
      const keys = [];
      let counter = 0;
      bst.traversePostOrder((node) => {
        keys.push(node.getValue());
        counter += 1;
      }, () => counter > 2);
      expect(keys).to.deep.equal([20, 40, 30]);
    });
  });

  describe('.remove(value)', () => {
    it('should remove a leaf node', () => {
      bst.remove(20);
      expect(bst.has(20)).to.equal(false);
      expect(bst.find(30).getLeft()).to.equal(null);
      expect(bst.count()).to.equal(6);
    });

    it('should remove a node with a right child only', () => {
      bst.remove(30);
      expect(bst.has(30)).to.equal(false);
      expect(bst.root().getLeft().getValue()).to.equal(40);
      expect(bst.count()).to.equal(5);
    });

    it('should remove a node with a left child only', () => {
      bst.insert(30);
      bst.remove(40);
      expect(bst.has(40)).to.equal(false);
      expect(bst.root().getLeft().getValue()).to.equal(30);
      expect(bst.count()).to.equal(5);
    });

    it('should remove a node with two children', () => {
      bst.remove(80);
      expect(bst.has(80)).to.equal(false);
      expect(bst.root().getRight().getValue()).to.equal(90);
      expect(bst.find(90).getRight()).to.equal(null);
      expect(bst.find(90).getLeft().getValue()).to.equal(60);
      expect(bst.count()).to.equal(4);
    });

    it('should remove root node with right child', () => {
      bst.insert(100);
      bst.remove(60);
      bst.remove(90);
      bst.remove(30);
      bst.remove(50);
      expect(bst.root().getValue()).to.equal(100);
    });

    it('should remove root node with left child', () => {
      bst.insert(20);
      bst.insert(30);
      bst.insert(25);
      bst.remove(30);
      bst.remove(25);
      bst.remove(100);
      expect(bst.root().getValue()).to.equal(20);
    });

    it('should remove root node', () => {
      bst.remove(20);
      expect(bst.root()).to.equal(null);
    });
  });

  describe('.removeNode(node)', () => {
    const testRemoveTree = new BinarySearchTree();
    testRemoveTree
      .insert(50)
      .insert(80)
      .insert(30)
      .insert(90)
      .insert(60)
      .insert(40)
      .insert(20);
    const n80 = testRemoveTree.find(80);
    testRemoveTree.removeNode(n80);
    expect(testRemoveTree.root().getRight().getValue()).to.equal(90);
    expect(testRemoveTree.root().getRight().getLeft().getValue()).to.equal(60);
    expect(testRemoveTree.root().getRight().getRight()).to.equal(null);
  });

  describe('.clear()', () => {
    bst.clear();
    expect(bst.count()).to.equal(0);
    expect(bst.root()).to.equal(null);
    expect(bst.remove(10)).to.equal(false);
  });
});
