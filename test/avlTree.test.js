const { expect } = require('chai');
const AvlTree = require('../src/avlTree');

describe('AvlTree tests', () => {
  const avlTree = new AvlTree();

  describe('.insert(key, value)', () => {
    it('left rotation balancing', () => {
      avlTree.insert(50, 'n1');
      avlTree.insert(80, 'n2');
      avlTree.insert(90, 'n3');
      /*
        50  (balance = -2)
         \
          80
           \
            90

         lef-rotation of 50 to ==>

          80
         /  \
        50  90
      */
      expect(avlTree.root().getKey()).to.equal(80);
      expect(avlTree.root().getRight().getKey()).to.equal(90);
      expect(avlTree.root().getLeft().getKey()).to.equal(50);
    });

    it('right rotation balancing', () => {
      avlTree.insert(40, 'n4');
      avlTree.insert(30, 'n5');

      /*
                      80
                     /  \
      (balance = 2) 50  90
                   /
                  40
                 /
                30

              right-rotation of 50 to ==>

                80
               /  \
              40  90
             /  \
            30  50
      */
      expect(avlTree.root().getKey()).to.equal(80);
      expect(avlTree.root().getRight().getKey()).to.equal(90);
      expect(avlTree.root().getLeft().getKey()).to.equal(40);
      expect(avlTree.root().getLeft().getRight().getKey()).to.equal(50);
      expect(avlTree.root().getLeft().getLeft().getKey()).to.equal(30);

      avlTree.insert(20, 'n6');
      /*
             80 (balance = 2)
            /  \
           40  90
          /  \
         30  50
        /
       20

      right-rotation of 80 ==>

           40
          /  \
         30  80
        /   /  \
       20  50  90
      */
      expect(avlTree.root().getKey()).to.equal(40);
      expect(avlTree.root().getLeft().getKey()).to.equal(30);
      expect(avlTree.root().getLeft().getLeft().getKey()).to.equal(20);
      expect(avlTree.root().getRight().getKey()).to.equal(80);
      expect(avlTree.root().getRight().getRight().getKey()).to.equal(90);
      expect(avlTree.root().getRight().getLeft().getKey()).to.equal(50);
    });

    it('left-right rotation balancing', () => {
      avlTree.insert(35, 'n7');
      avlTree.insert(10, 'n8');
      avlTree.insert(15, 'n9');
      /*
        verify left-right rotation
                 40
              /      \
             30      80
            /  \    /  \
           20   35 50  90
          /
         10
          \
          15

        left-right rotation of 20 ==>
                 40
              /      \
             30      80
            /  \    /  \
           15   35 50  90
          /  \
         10  20
      */
      expect(avlTree.root().getKey()).to.equal(40);
      expect(avlTree.root().getRight().getKey()).to.equal(80);
      expect(avlTree.root().getRight().getRight().getKey()).to.equal(90);
      expect(avlTree.root().getRight().getLeft().getKey()).to.equal(50);
      expect(avlTree.root().getLeft().getKey()).to.equal(30);
      expect(avlTree.root().getLeft().getRight().getKey()).to.equal(35);
      expect(avlTree.root().getLeft().getLeft().getKey()).to.equal(15);
      expect(avlTree.root()
        .getLeft()
        .getLeft()
        .getRight()
        .getKey()).to.equal(20);
      expect(avlTree.root()
        .getLeft()
        .getLeft()
        .getLeft()
        .getKey()).to.equal(10);
    });

    it('right-left rotation balancing', () => {
      avlTree.insert(100, 'n10');
      avlTree.insert(95, 'n11');
      /*
        verify right-left rotation
                 40
              /      \
             30      80
            /  \    /  \
           15   35 50  90
          /  \           \
         10  20          100
                        /
                       95

        right-left rotation of 90 ==>

                 40
              /      \
             30      80
            /  \    /  \
           15   35 50  95
          /  \        /  \
         10  20      90  100
      */
      expect(avlTree.root().getKey()).to.equal(40);
      expect(avlTree.root().getRight().getKey()).to.equal(80);
      expect(avlTree.root().getRight().getRight().getKey()).to.equal(95);
      expect(avlTree.root()
        .getRight()
        .getRight()
        .getRight()
        .getKey()).to.equal(100);
      expect(avlTree.root()
        .getRight()
        .getRight()
        .getLeft()
        .getKey()).to.equal(90);
      expect(avlTree.root().getRight().getLeft().getKey()).to.equal(50);
      expect(avlTree.root().getLeft().getKey()).to.equal(30);
      expect(avlTree.root().getLeft().getRight().getKey()).to.equal(35);
      expect(avlTree.root().getLeft().getLeft().getKey()).to.equal(15);
      expect(avlTree.root()
        .getLeft()
        .getLeft()
        .getRight()
        .getKey()).to.equal(20);
      expect(avlTree.root()
        .getLeft()
        .getLeft()
        .getLeft()
        .getKey()).to.equal(10);
    });
  });


  describe('.min()', () => {
    it('get the node with min key', () => {
      expect(avlTree.min().getKey(15));
    });
  });

  describe('.max()', () => {
    it('get the node with min key', () => {
      expect(avlTree.max().getKey(100));
    });
  });

  describe('.root()', () => {
    it('should get root node', () => {
      expect(avlTree.root().getKey(40));
    });
  });

  describe('.find(key)', () => {
    it('find a node by its key', () => {
      expect(avlTree.find(35).getKey()).to.equal(35);
      expect(avlTree.find(1000)).to.equal(null);
    });
  });
});
