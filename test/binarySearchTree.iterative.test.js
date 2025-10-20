const { expect } = require('chai');
const { BinarySearchTreeNode } = require('../src/binarySearchTreeNode');
const { BinarySearchTree } = require('../src/binarySearchTree');

describe('BinarySearchTree tests (iterative implementation)', () => {
  const bst = new BinarySearchTree();

  describe('.insertIterative(value)', () => {
    it('should insert nodes to the tree', () => {
      expect(bst.insertIterative(50)).to.be.instanceof(BinarySearchTree);
      expect(bst.insertIterative(80)).to.be.instanceof(BinarySearchTree);
      expect(bst.insertIterative(30)).to.be.instanceof(BinarySearchTree);
      expect(bst.insertIterative(90)).to.be.instanceof(BinarySearchTree);
      expect(bst.insertIterative(60)).to.be.instanceof(BinarySearchTree);
      expect(bst.insertIterative(40)).to.be.instanceof(BinarySearchTree);
      expect(bst.insertIterative(20)).to.be.instanceof(BinarySearchTree);

      // updates value of existing node
      expect(bst.insertIterative(20)).to.be.instanceof(BinarySearchTree);
      expect(bst.findIterative(20).getValue()).to.equal(20);
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

  describe('.hasIterative(value)', () => {
    it('checks if a node exists by value', () => {
      expect(bst.hasIterative(50)).to.equal(true);
      expect(bst.hasIterative(80)).to.equal(true);
      expect(bst.hasIterative(30)).to.equal(true);
      expect(bst.hasIterative(90)).to.equal(true);
      expect(bst.hasIterative(50)).to.equal(true);
      expect(bst.hasIterative(40)).to.equal(true);
      expect(bst.hasIterative(20)).to.equal(true);
      expect(bst.hasIterative(100)).to.equal(false);
    });
  });

  describe('.hasIterative(key)', () => {
    it('checks if a node exists by key', () => {
      const testTree = new BinarySearchTree((a, b) => a.id - b.id, { key: 'id' });
      testTree.insertIterative({ id: 1, name: 'a' });
      testTree.insertIterative({ id: 2, name: 'b' });
      testTree.insertIterative({ id: 3, name: 'c' });
      expect(testTree.hasIterative({ id: 1 })).to.equal(true);
      expect(testTree.hasIterative({ id: 2 })).to.equal(true);
      expect(testTree.hasIterative({ id: 3 })).to.equal(true);
      expect(testTree.hasKey(1)).to.equal(true);
      expect(testTree.hasKey(2)).to.equal(true);
      expect(testTree.hasKey(3)).to.equal(true);
    });
  });

  describe('.findIterative(value)', () => {
    it('should search a node by its value in the tree', () => {
      expect(bst.findIterative(50)).to.be.instanceof(BinarySearchTreeNode);
      expect(bst.findIterative(80)).to.be.instanceof(BinarySearchTreeNode);
      expect(bst.findIterative(30)).to.be.instanceof(BinarySearchTreeNode);
      expect(bst.findIterative(90)).to.be.instanceof(BinarySearchTreeNode);
      expect(bst.findIterative(50)).to.be.instanceof(BinarySearchTreeNode);
      expect(bst.findIterative(40)).to.be.instanceof(BinarySearchTreeNode);
      expect(bst.findIterative(20)).to.be.instanceof(BinarySearchTreeNode);
      expect(bst.findIterative(100)).to.equal(null);
    });
  });

  describe('.findKeyIterative(key)', () => {
    it('should search a node by its key in the tree', () => {
      const testTree = new BinarySearchTree((a, b) => a.id - b.id, { key: 'id' });
      testTree.insertIterative({ id: 1, name: 'a' });
      testTree.insertIterative({ id: 2, name: 'b' });
      testTree.insertIterative({ id: 3, name: 'c' });
      expect(testTree.findIterative({ id: 1 }).getValue()).to.eql({ id: 1, name: 'a' });
      expect(testTree.findIterative({ id: 2 }).getValue()).to.eql({ id: 2, name: 'b' });
      expect(testTree.findIterative({ id: 3 }).getValue()).to.eql({ id: 3, name: 'c' });
      expect(testTree.findKey(1).getValue()).to.eql({ id: 1, name: 'a' });
      expect(testTree.findKey(2).getValue()).to.eql({ id: 2, name: 'b' });
      expect(testTree.findKey(3).getValue()).to.eql({ id: 3, name: 'c' });
    });
  });

  describe('.maxIterative()', () => {
    it('get the node with max key', () => {
      const max = bst.maxIterative();
      expect(max.getValue()).to.equal(90);
    });
  });

  describe('.minIterative()', () => {
    it('get the node with min key', () => {
      const min = bst.minIterative();
      expect(min.getValue()).to.equal(20);
    });
  });

  describe('.lowerBoundIterative(value)', () => {
    it('gets the node with biggest key less or equal k', () => {
      expect(bst.lowerBoundIterative(60).getValue()).to.equal(60);
      expect(bst.lowerBoundIterative(60, false).getValue()).to.equal(50);
    });

    it('returns null when k is less than all tree keys', () => {
      expect(bst.lowerBoundIterative(10)).to.equal(null);
    });

    it('returns the biggest lower bound of multiple lower bounds', () => {
      const lowerBst = new BinarySearchTree();
      lowerBst.insertIterative(20);
      lowerBst.insertIterative(7);
      lowerBst.insertIterative(15);
      lowerBst.insertIterative(9);
      expect(lowerBst.lowerBoundIterative(10).getValue()).to.equal(9);
    });
  });

  describe('.lowerBoundKeyIterative(key) / floorKeyIterative', () => {
    it('gets the node with biggest key less or equal k', () => {
      const lowerBst = new BinarySearchTree((a, b) => a.id - b.id, { key: 'id' });
      lowerBst.insertIterative({ id: 20 });
      lowerBst.insertIterative({ id: 7 });
      lowerBst.insertIterative({ id: 15 });
      lowerBst.insertIterative({ id: 9 });
      expect(lowerBst.lowerBoundKey(60).getValue()).to.eql({ id: 20 });
      expect(lowerBst.floorKey(20, false).getValue()).to.eql({ id: 15 });
    });
  });

  describe('.upperBoundIterative(k)', () => {
    it('gets the node with smallest key bigger than a key', () => {
      expect(bst.upperBoundIterative(75).getValue()).to.equal(80);
      expect(bst.upperBoundIterative(80).getValue()).to.equal(80);
      expect(bst.upperBoundIterative(80, false).getValue()).to.equal(90);
    });

    it('returns null when k is bigger than all tree keys', () => {
      expect(bst.upperBoundIterative(110)).to.equal(null);
    });

    it('returns the smallest upper bound of multiple upper bounds', () => {
      const upperBst = new BinarySearchTree();
      upperBst.insertIterative(-133195046);
      upperBst.insertIterative(-49109668);
      upperBst.insertIterative(115062875);
      upperBst.insertIterative(-38206732);
      upperBst.insertIterative(49311742);
      expect(upperBst.upperBoundIterative(49303013).getValue()).to.equal(49311742);
    });
  });

  describe('.upperBoundKeyIterative(key) / ceilKeyIterative', () => {
    it('gets the node with smallest key bigger than a key', () => {
      const upperBst = new BinarySearchTree((a, b) => a.id - b.id, { key: 'id' });
      upperBst.insertIterative({ id: 20 });
      upperBst.insertIterative({ id: 7 });
      upperBst.insertIterative({ id: 15 });
      upperBst.insertIterative({ id: 9 });
      expect(upperBst.upperBoundKey(15).getValue()).to.eql({ id: 15 });
      expect(upperBst.ceilKey(15, false).getValue()).to.eql({ id: 20 });
    });
  });

  describe('.traverseInOrderIterative(cb)', () => {
    it('traverse the tree in-order', () => {
      const keys = [];
      bst.traverseInOrderIterative((node) => keys.push(node.getValue()));
      expect(keys).to.deep.equal([20, 30, 40, 50, 60, 80, 90]);
    });

    it('traverse in order and allow aborting traversal', () => {
      const keys = [];
      let counter = 0;
      bst.traverseInOrderIterative((node) => {
        keys.push(node.getValue());
        counter += 1;
      }, () => counter > 2);
      expect(keys).to.deep.equal([20, 30, 40]);
    });
  });

  describe('.traversePreOrderIterative(cb)', () => {
    it('traverse the tree pre-order', () => {
      const keys = [];
      bst.traversePreOrderIterative((node) => keys.push(node.getValue()));
      expect(keys).to.deep.equal([50, 30, 20, 40, 80, 60, 90]);
    });

    it('traverse pre order and allow aborting traversal', () => {
      const keys = [];
      let counter = 0;
      bst.traversePreOrderIterative((node) => {
        keys.push(node.getValue());
        counter += 1;
      }, () => counter > 2);
      expect(keys).to.deep.equal([50, 30, 20]);
    });
  });

  describe('.traversePostOrderIterative(cb)', () => {
    it('traverse the tree post-order', () => {
      const keys = [];
      bst.traversePostOrderIterative((node) => keys.push(node.getValue()));
      expect(keys).to.deep.equal([20, 40, 30, 60, 90, 80, 50]);
    });

    it('traverse post order and allow aborting traversal', () => {
      const keys = [];
      let counter = 0;
      bst.traversePostOrderIterative((node) => {
        keys.push(node.getValue());
        counter += 1;
      }, () => counter > 2);
      expect(keys).to.deep.equal([20, 40, 30]);
    });
  });

  describe('.removeIterative(value)', () => {
    it('should remove a leaf node', () => {
      bst.removeIterative(20);
      expect(bst.hasIterative(20)).to.equal(false);
      expect(bst.findIterative(30).getLeft()).to.equal(null);
      expect(bst.count()).to.equal(6);
    });

    it('should remove a node with a right child only', () => {
      bst.removeIterative(30);
      expect(bst.hasIterative(30)).to.equal(false);
      expect(bst.root().getLeft().getValue()).to.equal(40);
      expect(bst.count()).to.equal(5);
    });

    it('should remove a node with a left child only', () => {
      bst.insertIterative(30);
      bst.removeIterative(40);
      expect(bst.hasIterative(40)).to.equal(false);
      expect(bst.root().getLeft().getValue()).to.equal(30);
      expect(bst.count()).to.equal(5);
    });

    it('should remove a node with two children', () => {
      bst.removeIterative(80);
      expect(bst.hasIterative(80)).to.equal(false);
      expect(bst.root().getRight().getValue()).to.equal(90);
      expect(bst.findIterative(90).getRight()).to.equal(null);
      expect(bst.findIterative(90).getLeft().getValue()).to.equal(60);
      expect(bst.count()).to.equal(4);
    });

    it('should remove root node with right child', () => {
      bst.insertIterative(100);
      bst.removeIterative(60);
      bst.removeIterative(90);
      bst.removeIterative(30);
      bst.removeIterative(50);
      expect(bst.root().getValue()).to.equal(100);
    });

    it('should remove root node with left child', () => {
      bst.insertIterative(20);
      bst.insertIterative(30);
      bst.insertIterative(25);
      bst.removeIterative(30);
      bst.removeIterative(25);
      bst.removeIterative(100);
      expect(bst.root().getValue()).to.equal(20);
    });

    it('should remove root node', () => {
      bst.removeIterative(20);
      expect(bst.root()).to.equal(null);
    });
  });

  describe('.removeNode(node)', () => {
    const testRemoveTree = new BinarySearchTree();
    testRemoveTree
      .insertIterative(50)
      .insertIterative(80)
      .insertIterative(30)
      .insertIterative(90)
      .insertIterative(60)
      .insertIterative(40)
      .insertIterative(20);
    const n80 = testRemoveTree.findIterative(80);
    testRemoveTree.removeNode(n80);
    expect(testRemoveTree.root().getRight().getValue()).to.equal(90);
    expect(testRemoveTree.root().getRight().getLeft().getValue()).to.equal(60);
    expect(testRemoveTree.root().getRight().getRight()).to.equal(null);
  });

  describe('.clear()', () => {
    bst.clear();
    expect(bst.count()).to.equal(0);
    expect(bst.root()).to.equal(null);
    expect(bst.removeIterative(10)).to.equal(false);
  });
});
