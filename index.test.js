const { expect } = require('chai');
const binarySearchTree = require('./index');

describe('binarySearchTree tests', () => {
  const bst = binarySearchTree();

  describe('.insert(key, value)', () =>
    it('should insert nodes to the tree', () => {
      bst.insert(50, 'n1');
      bst.insert(80, 'n2');
      bst.insert(30, 'n3');
      bst.insert(90, 'n4');
      bst.insert(60, 'n5');
      bst.insert(40, 'n6');
      bst.insert(20, 'n7');
      bst.insert(20, 'n8'); // should not be inserted.
      expect(bst.count()).to.be.equal(7);
      expect(bst.root().getKey()).to.equal(50);
      expect(bst.root().getValue()).to.equal('n1');
      expect(bst.root().getRight().getKey()).to.equal(80);
      expect(bst.root().getRight().getValue()).to.equal('n2');
      expect(bst.root().getLeft().getKey()).to.equal(30);
      expect(bst.root().getLeft().getValue()).to.equal('n3');
    }));

  describe('.min()', () =>
    it('should get the node with min value', () =>
      expect(bst.min().getKey(20))));

  describe('.max()', () =>
    it('should get the node with max value', () =>
      expect(bst.max().getKey(90))));

  describe('.root()', () =>
    it('should get the root node', () =>
      expect(bst.root().getKey(50))));

  describe('.search(key)', () =>
    it('should search a node by its key in the tree', () => {
      expect(bst.search(40).getKey()).to.equal(40);
      expect(bst.search(100)).to.equal(null);
    }));

  describe('.traverse(cb, type)', () => {
    it('should traverse the tree in order', () => {
      const keys = [];
      bst.traverse(node => keys.push(node.getKey()), 'inOrder');
      expect(keys).to.deep.equal([20, 30, 40, 50, 60, 80, 90]);
    });

    it('should traverse the tree pre order', () => {
      const keys = [];
      bst.traverse(node => keys.push(node.getKey()), 'preOrder');
      expect(keys).to.deep.equal([50, 30, 20, 40, 80, 60, 90]);
    });

    it('should traverse the tree post order', () => {
      const keys = [];
      bst.traverse(node => keys.push(node.getKey()), 'postOrder');
      expect(keys).to.deep.equal([20, 40, 30, 60, 90, 80, 50]);
    });

    it('should traverse the tree in order by default', () => {
      const keys = [];
      bst.traverse(node => keys.push(node.getKey()));
      expect(keys).to.deep.equal([20, 30, 40, 50, 60, 80, 90]);
    });
  });

  describe('.remove(key)', () => {
    it('should remove a leaf node', () => {
      bst.remove(20);
      expect(bst.search(20)).to.equal(null);
      expect(bst.search(30).getLeft()).to.equal(null);
      expect(bst.count()).to.equal(6);
    });

    it('should remove a node with a right child only', () => {
      bst.remove(30);
      expect(bst.search(30)).to.equal(null);
      expect(bst.root().getLeft().getKey()).to.equal(40);
      expect(bst.count()).to.equal(5);
    });

    it('should remove a node with a left child only', () => {
      bst.insert(30);
      bst.remove(40);
      expect(bst.search(40)).to.equal(null);
      expect(bst.root().getLeft().getKey()).to.equal(30);
      expect(bst.count()).to.equal(5);
    });

    it('should remove a node with two children', () => {
      bst.remove(80);
      expect(bst.search(80)).to.equal(null);
      expect(bst.root().getRight().getKey()).to.equal(90);
      expect(bst.search(90).getRight()).to.equal(null);
      expect(bst.search(90).getLeft().getKey()).to.equal(60);
      expect(bst.count()).to.equal(4);
    });

    it('should remove root node with right child', () => {
      bst.insert(100);
      bst.remove(60);
      bst.remove(90);
      bst.remove(30);
      bst.remove(50);
      expect(bst.root().getKey()).to.equal(100);
    });

    it('should remove root node with left child', () => {
      bst.insert(20);
      bst.insert(30);
      bst.insert(25);
      bst.remove(30);
      bst.remove(25);
      bst.remove(100);
      expect(bst.root().getKey()).to.equal(20);
    });

    it('should remove root node', () => {
      bst.remove(20);
      expect(bst.root()).to.equal(null);
    });
  });

  describe('.clear()', () => {
    bst.clear();
    expect(bst.count()).to.equal(0);
    expect(bst.root()).to.equal(null);
    expect(bst.remove(10)).to.equal(undefined);
  });
});
