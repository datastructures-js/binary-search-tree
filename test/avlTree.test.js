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
      const root = avlTree.root();
      expect(root.getKey()).to.equal(80);

      expect(root.getRight().getKey()).to.equal(90);
      expect(root.getRight().getParent().getKey()).to.equal(80);

      expect(root.getLeft().getKey()).to.equal(50);
      expect(root.getLeft().getParent().getKey()).to.equal(80);
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
      const root = avlTree.root();
      expect(root.getKey()).to.equal(80);

      expect(root.getRight().getKey()).to.equal(90);
      expect(root.getRight().getParent().getKey()).to.equal(80);

      expect(root.getLeft().getKey()).to.equal(40);
      expect(root.getLeft().getParent().getKey()).to.equal(80);

      expect(root.getLeft().getRight().getKey()).to.equal(50);
      expect(root.getLeft().getRight().getParent().getKey()).to.equal(40);

      expect(root.getLeft().getLeft().getKey()).to.equal(30);
      expect(root.getLeft().getLeft().getParent().getKey()).to.equal(40);

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
      const root = avlTree.root();
      expect(root.getKey()).to.equal(40);

      expect(root.getRight().getKey()).to.equal(80);
      expect(root.getRight().getRight().getKey()).to.equal(90);
      expect(root.getRight().getLeft().getKey()).to.equal(50);

      expect(root.getLeft().getKey()).to.equal(30);
      expect(root.getLeft().getRight().getKey()).to.equal(35);
      expect(root.getLeft().getLeft().getKey()).to.equal(15);
      expect(root.getLeft().getLeft().getRight().getKey()).to.equal(20);
      expect(root.getLeft().getLeft().getLeft().getKey()).to.equal(10);
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
      const root = avlTree.root();
      expect(root.getKey()).to.equal(40);

      expect(root.getRight().getKey()).to.equal(80);
      expect(root.getRight().getRight().getKey()).to.equal(95);
      expect(root.getRight().getRight().getRight().getKey()).to.equal(100);
      expect(root.getRight().getRight().getLeft().getKey()).to.equal(90);
      expect(root.getRight().getLeft().getKey()).to.equal(50);

      expect(root.getLeft().getKey()).to.equal(30);
      expect(root.getLeft().getRight().getKey()).to.equal(35);
      expect(root.getLeft().getLeft().getKey()).to.equal(15);
      expect(root.getLeft().getLeft().getRight().getKey()).to.equal(20);
      expect(root.getLeft().getLeft().getLeft().getKey()).to.equal(10);
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

  describe('.traverseInOrder(cb)', () => {
    it('traverse the tree in order', () => {
      const keys = [];
      avlTree.traverseInOrder((node) => keys.push(node.getKey()));
      expect(keys).to.deep.equal([
        10, 15, 20, 30, 35, 40, 50, 80, 90, 95, 100
      ]);
    });
  });

  describe('.traversePreOrder(cb)', () => {
    it('traverse the tree in order', () => {
      const keys = [];
      avlTree.traversePreOrder((node) => keys.push(node.getKey()));
      expect(keys).to.deep.equal([
        40, 30, 15, 10, 20, 35, 80, 50, 95, 90, 100
      ]);
    });
  });

  describe('.traversePostOrder(cb)', () => {
    it('traverse the tree post order', () => {
      const keys = [];
      avlTree.traversePostOrder((node) => keys.push(node.getKey()));
      expect(keys).to.deep.equal([
        10, 20, 15, 35, 30, 50, 90, 100, 95, 80, 40
      ]);
    });
  });

  describe('.remove(key)', () => {
    it('right rotation balancing', () => {
      /*
               40
            /      \
           30      80
          /  \    /  \
         15   35 50  95
        /  \        /  \
       10  20      90  100
      */

      avlTree.remove(35);

      /*
                           40
                         /    \
        (balance = 2)  30      80
                      /       /  \
                     15      50  95
                    /  \        /  \
                   10  20      90  100

           right rotation of 30 ==>

                         40
                       /     \
                      15     80
                     /  \   /  \
                    10  30 50  95
                       /      /  \
                      20      90  100
      */
      const root = avlTree.root();
      expect(root.getKey()).to.equal(40);
      expect(root.getRight().getKey()).to.equal(80);
      expect(root.getRight().getRight().getKey()).to.equal(95);
      expect(root.getRight().getRight().getRight().getKey()).to.equal(100);
      expect(root.getRight().getRight().getLeft().getKey()).to.equal(90);
      expect(root.getRight().getLeft().getKey()).to.equal(50);
      expect(root.getLeft().getKey()).to.equal(15);
      expect(root.getLeft().getRight().getKey()).to.equal(30);
      expect(root.getLeft().getRight().getLeft().getKey()).to.equal(20);
      expect(root.getLeft().getLeft().getKey()).to.equal(10);
    });

    it('right-left rotation balancing', () => {
      /*
                           40
                         /     \
                        15     80
                       /  \   /  \
                      10  30 50  95
                         /      /  \
                        20      90  100
      */

      avlTree.remove(10);

      /*
                            40
                         /      \
        (balance = -2)  15      80
                          \    /  \
                          30  50  95
                         /       /  \
                        20      90  100

         right-left rotation of 15 ==>

                           40
                         /     \
                        20     80
                       /  \   /  \
                      15  30 50  95
                                /  \
                               90  100
      */
      const root = avlTree.root();
      expect(root.getKey()).to.equal(40);
      expect(root.getRight().getKey()).to.equal(80);
      expect(root.getRight().getRight().getKey()).to.equal(95);
      expect(root.getRight().getRight().getRight().getKey()).to.equal(100);
      expect(root.getRight().getRight().getLeft().getKey()).to.equal(90);
      expect(root.getRight().getLeft().getKey()).to.equal(50);
      expect(root.getLeft().getKey()).to.equal(20);
      expect(root.getLeft().getRight().getKey()).to.equal(30);
      expect(root.getLeft().getLeft().getKey()).to.equal(15);
    });

    it('left rotation balancing', () => {
      /*

               40
             /     \
            20     80
           /  \   /  \
          15  30 50  95
                    /  \
                   90  100
      */

      avlTree.remove(90);
      avlTree.remove(50);

      /*
                 40
               /     \
              20     80 (balance = -2)
             /  \      \
            15  30     95
                         \
                         100

         left rotation of 15 ==>

                  40
               /      \
              20      95
             /  \    /  \
            15  30  80  100
      */
      expect(avlTree.root().getKey()).to.equal(40);
      expect(avlTree.root().getRight().getKey()).to.equal(95);
      expect(avlTree.root().getRight().getRight().getKey()).to.equal(100);
      expect(avlTree.root().getRight().getLeft().getKey()).to.equal(80);
      expect(avlTree.root().getLeft().getKey()).to.equal(20);
      expect(avlTree.root().getLeft().getRight().getKey()).to.equal(30);
      expect(avlTree.root().getLeft().getLeft().getKey()).to.equal(15);
    });

    it('left-right rotation balancing', () => {
      avlTree.insert(85);
      /*
                  40
               /      \
              20      95
             /  \    /  \
            15  30  80  100
                     \
                     85
      */

      avlTree.remove(100);
      /*
                  40
               /      \
              20      95 (balance = 2)
             /  \    /
            15  30  80
                      \
                       85

         left-right rotation of 95 ==>

                  40
               /      \
              20      85
             /  \    /  \
            15  30  80  95
      */
      const root = avlTree.root();
      expect(root.getKey()).to.equal(40);
      expect(root.getLeft().getKey()).to.equal(20);
      expect(root.getLeft().getRight().getKey()).to.equal(30);
      expect(root.getLeft().getLeft().getKey()).to.equal(15);
      expect(root.getRight().getKey()).to.equal(85);
      expect(root.getRight().getLeft().getKey()).to.equal(80);
      expect(root.getRight().getRight().getKey()).to.equal(95);
    });

    it('removes the rest of nodes properly', () => {
      /*
                  40
               /      \
              20      85
             /  \    /  \
            15  30  80  95
      */
      avlTree.remove(30);
      avlTree.remove(80);
      avlTree.remove(95);
      avlTree.remove(85);
      /*
                  40 (balance = 2)
                 /
                20
               /
              15

              right rotation of 40 ==>
                20
               /  \
              15  40
      */

      expect(avlTree.root().getKey()).to.equal(20);
      expect(avlTree.root().getLeft().getKey()).to.equal(15);
      expect(avlTree.root().getRight().getKey()).to.equal(40);

      avlTree.remove(20);
      expect(avlTree.root().getKey()).to.equal(40);
      expect(avlTree.root().getValue()).to.equal('n4');
      expect(avlTree.root().getLeft().getKey()).to.equal(15);

      avlTree.remove(40);
      expect(avlTree.root().getKey()).to.equal(15);
      expect(avlTree.count()).to.equal(1);

      avlTree.insert(20, 'n12');
      avlTree.remove(15);
      expect(avlTree.root().getKey()).to.equal(20);
      expect(avlTree.count()).to.equal(1);
      avlTree.remove(20);
      expect(avlTree.root()).to.equal(null);
      expect(avlTree.count()).to.equal(0);
    });
  });
});
