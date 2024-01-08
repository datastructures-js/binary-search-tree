const { expect } = require('chai');
const { AvlTree } = require('../src/avlTree');

describe('AvlTree tests', () => {
  const avlTree = new AvlTree();

  describe('.insert(value)', () => {
    it('left rotation balancing', () => {
      avlTree.insert(50);
      avlTree.insert(80);
      avlTree.insert(90);
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
      expect(root.getValue()).to.equal(80);

      expect(root.getRight().getValue()).to.equal(90);
      expect(root.getRight().getParent().getValue()).to.equal(80);

      expect(root.getLeft().getValue()).to.equal(50);
      expect(root.getLeft().getParent().getValue()).to.equal(80);
    });

    it('right rotation balancing', () => {
      avlTree.insert(40);
      avlTree.insert(30);

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
      expect(root.getValue()).to.equal(80);

      expect(root.getRight().getValue()).to.equal(90);
      expect(root.getRight().getParent().getValue()).to.equal(80);

      expect(root.getLeft().getValue()).to.equal(40);
      expect(root.getLeft().getParent().getValue()).to.equal(80);

      expect(root.getLeft().getRight().getValue()).to.equal(50);
      expect(root.getLeft().getRight().getParent().getValue()).to.equal(40);

      expect(root.getLeft().getLeft().getValue()).to.equal(30);
      expect(root.getLeft().getLeft().getParent().getValue()).to.equal(40);

      avlTree.insert(20);
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
      expect(avlTree.root().getValue()).to.equal(40);

      expect(avlTree.root().getLeft().getValue()).to.equal(30);
      expect(avlTree.root().getLeft().getLeft().getValue()).to.equal(20);

      expect(avlTree.root().getRight().getValue()).to.equal(80);
      expect(avlTree.root().getRight().getRight().getValue()).to.equal(90);
      expect(avlTree.root().getRight().getLeft().getValue()).to.equal(50);
    });

    it('left-right rotation balancing', () => {
      avlTree.insert(35);
      avlTree.insert(10);
      avlTree.insert(15);
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
      expect(root.getValue()).to.equal(40);

      expect(root.getRight().getValue()).to.equal(80);
      expect(root.getRight().getRight().getValue()).to.equal(90);
      expect(root.getRight().getLeft().getValue()).to.equal(50);

      expect(root.getLeft().getValue()).to.equal(30);
      expect(root.getLeft().getRight().getValue()).to.equal(35);
      expect(root.getLeft().getLeft().getValue()).to.equal(15);
      expect(root.getLeft().getLeft().getRight().getValue()).to.equal(20);
      expect(root.getLeft().getLeft().getLeft().getValue()).to.equal(10);
    });

    it('right-left rotation balancing', () => {
      avlTree.insert(100);
      avlTree.insert(95);
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
      expect(root.getValue()).to.equal(40);

      expect(root.getRight().getValue()).to.equal(80);
      expect(root.getRight().getRight().getValue()).to.equal(95);
      expect(root.getRight().getRight().getRight().getValue()).to.equal(100);
      expect(root.getRight().getRight().getLeft().getValue()).to.equal(90);
      expect(root.getRight().getLeft().getValue()).to.equal(50);

      expect(root.getLeft().getValue()).to.equal(30);
      expect(root.getLeft().getRight().getValue()).to.equal(35);
      expect(root.getLeft().getLeft().getValue()).to.equal(15);
      expect(root.getLeft().getLeft().getRight().getValue()).to.equal(20);
      expect(root.getLeft().getLeft().getLeft().getValue()).to.equal(10);
    });

    it('keep balance when inserting so many elements', () => {
      const elements = [
        130, 345, 826, 571, 795, 366, 648, 418, 353, 267, 450, 404, 456, 310,
        137, 888, 497, 378, 651, 148, 552, 632, 886, 532, 273, 802, 590, 187,
        487, 781, 24, 775, 746, 664, 459, 180, 76, 252, 44, 439, 426, 444, 91,
        817, 152, 5, 643, 381, 470, 864, 307, 83, 753, 792, 216, 650, 780, 863,
        396, 750, 494, 855, 684, 508, 837, 849, 654, 812, 561, 86, 731, 845,
        176, 851, 110, 673, 222, 874, 512, 856, 609, 403, 872, 141, 488, 150,
        70, 357, 705, 260, 805, 233, 172, 890, 519, 230, 824, 335, 447, 563,
        613, 62, 597, 659, 166, 185, 93, 666, 634, 195, 767, 729, 803, 520, 626,
        284, 569, 704, 225, 228, 440, 234, 526, 105, 202, 751, 809, 762, 341,
        631, 857, 169, 43, 115, 147, 513, 773, 299, 674, 865, 259, 493, 629,
        164, 555, 437, 101, 866, 287, 821, 380, 711, 337, 212, 458, 45, 733,
        576, 60, 755, 415, 384, 311, 51, 301, 540, 74, 756, 742, 675, 776, 181,
        862, 847, 490, 516, 423, 760, 114, 876, 306, 405, 116, 385, 541, 624,
        501, 873, 867, 16, 698, 617, 323, 354, 359, 700, 644, 179, 502, 397,
        304, 0, 635, 881, 171, 671, 454, 87, 266, 551, 207, 695, 592, 743, 268,
        198, 72, 550, 283, 758, 292, 189, 340, 194, 278, 507, 689, 145, 472,
        269, 199, 346, 870, 431, 333, 363, 433, 578, 464, 779, 668, 827, 577,
        715, 162, 167, 136, 210, 399, 89, 248, 184, 35, 524, 330, 640, 157, 350,
        182, 622, 846, 586, 99, 549, 358, 58, 410, 4, 686, 139, 28, 258, 491,
        575, 842, 825, 138, 618, 174, 660, 395, 871, 801, 749, 504, 383, 589,
        103, 17, 241, 281, 797, 796, 499, 361, 104, 264, 247, 478, 804, 682,
        294, 481, 732, 126, 683, 800, 669, 356, 81, 432, 71, 701, 288, 777, 221,
        759, 892, 370, 736, 257, 477, 783, 134, 515, 771, 612, 411, 467, 838,
        272, 238, 829, 160, 132, 409, 55, 376, 823, 446, 7, 791, 155, 730, 500,
        788, 317, 460, 108, 430, 680, 453, 547, 442, 158, 316, 250, 601, 390,
        14, 201, 39, 9, 884, 244, 583, 559, 251, 681, 702, 420, 371, 78, 763,
        73, 531, 794, 232, 389, 498, 620, 554, 533, 391, 436, 754, 355, 882,
        744, 522, 836, 196, 806, 125, 293, 107, 455, 297, 120, 891, 18, 435,
        652, 206, 122, 853, 203, 564, 394, 412, 320, 56, 766, 832, 633, 6, 835,
        124, 153, 312, 748, 47, 840, 82, 364, 839, 761, 97, 672, 457, 786, 553,
        61, 170, 22, 703, 351, 112, 95, 517, 200, 774, 485, 121, 163, 204, 523,
        25, 720, 558, 348, 466, 41, 29, 237, 177, 119, 741, 253, 336, 37, 331,
        401, 42, 173, 614, 19, 608, 770, 858, 143, 217, 52, 570, 117, 128, 276,
        539, 113, 308, 785, 496, 298, 852, 480, 670, 518, 2, 419, 159, 118, 814,
        724, 588, 461, 714, 226, 628, 286, 186, 468, 98, 208, 712, 630, 627,
        861, 213, 413, 734, 448, 400, 798, 271, 373, 854, 495, 573, 765, 96,
        382, 707, 893, 285, 710, 313, 525, 154, 621, 521, 725, 591, 641, 300,
        696, 790, 645, 146, 535, 282, 565, 691, 572, 639, 12, 657, 256, 23, 85,
        690, 38, 3, 584, 64, 605, 543, 144, 607, 449, 649, 360, 557, 492, 372,
        548, 161, 342, 615, 407, 223, 625, 850, 655, 568, 10, 205, 427, 386,
        820, 197, 123, 249, 131, 735, 667, 129, 319, 100, 465, 567, 616, 191,
        277, 619, 48, 594, 723, 819, 462, 242, 245, 463, 193, 79, 843, 647, 231,
        566, 606, 402, 739, 322, 810, 542, 328, 127, 813, 40, 209, 537, 329,
        510, 476, 102, 860, 374, 602, 429, 69, 220, 676, 599, 527, 424, 362,
        534, 822, 11, 658, 663, 818, 236, 54, 63, 808, 637, 109, 393, 406, 57,
        32, 142, 556, 708, 506, 772, 869, 67, 688, 596, 31, 885, 1, 365, 219,
        503, 709, 344, 326, 367, 332, 229, 263, 600, 706, 560, 604, 175, 868,
        408, 452, 26, 587, 377, 243, 697, 279, 740, 505, 638, 595, 581, 718, 21,
        324, 347, 227, 562, 421, 218, 646, 752, 59, 156, 489, 84, 302, 88, 699,
        50, 135, 653, 875, 388, 685, 434, 77, 745, 445, 878, 290, 677, 255, 275,
        484, 178, 880, 585, 192, 149, 387, 441, 90, 679, 289, 545, 66, 49, 694,
        623, 536, 769, 469, 111, 728, 443, 33, 240, 580, 375, 80, 486, 471, 687,
        859, 830, 94, 530, 879, 270, 30, 833, 816, 722, 579, 352, 574, 528, 887,
        509, 831, 318, 417, 327, 727, 261, 665, 799, 325, 719, 598, 214, 544,
        188, 811, 254, 190, 721, 379, 656, 782, 13, 274, 793, 309, 482, 392,
        889, 768, 338, 713, 841, 451, 661, 717, 349, 848, 538, 726, 133, 483,
        807, 343, 747, 883, 165, 738, 593, 92, 369, 877, 315, 787, 716, 321,
        339, 235, 778, 438, 20, 27, 183, 34, 844, 757, 737, 636, 834, 479, 692,
        603, 303, 678, 828, 239, 789, 46, 425, 414, 474, 246, 514, 815, 662,
        546, 582, 610, 140, 151, 473, 168, 65, 75, 475, 211, 224, 529, 368, 36,
        280, 215, 262, 334, 511, 296, 8, 53, 15, 693, 295, 68, 428, 784, 398,
        106, 291, 764, 305, 422, 416, 611, 314, 642, 265
      ];

      const tree = new AvlTree();
      elements.forEach((n) => tree.insert(n));
      tree.traversePreOrder((node) => {
        const balance = node.getBalance();
        if (balance > 1 || balance < -1) {
          throw new Error(`not balance , balance is ${balance}`);
        }
      });
    });
  });

  describe('.min()', () => {
    it('get the node with min value', () => {
      expect(avlTree.min().getValue(15));
    });
  });

  describe('.max()', () => {
    it('get the node with min value', () => {
      expect(avlTree.max().getValue(100));
    });
  });

  describe('.root()', () => {
    it('should get root node', () => {
      expect(avlTree.root().getValue(40));
    });
  });

  describe('.find(value)', () => {
    it('find a node by its value', () => {
      expect(avlTree.find(35).getValue()).to.equal(35);
      expect(avlTree.find(1000)).to.equal(null);
    });
  });

  describe('.traverseInOrder(cb)', () => {
    it('traverse the tree in order', () => {
      const values = [];
      avlTree.traverseInOrder((node) => values.push(node.getValue()));
      expect(values).to.deep.equal([
        10, 15, 20, 30, 35, 40, 50, 80, 90, 95, 100
      ]);
    });
  });

  describe('.traversePreOrder(cb)', () => {
    it('traverse the tree in order', () => {
      const values = [];
      avlTree.traversePreOrder((node) => values.push(node.getValue()));
      expect(values).to.deep.equal([
        40, 30, 15, 10, 20, 35, 80, 50, 95, 90, 100
      ]);
    });
  });

  describe('.traversePostOrder(cb)', () => {
    it('traverse the tree post order', () => {
      const values = [];
      avlTree.traversePostOrder((node) => values.push(node.getValue()));
      expect(values).to.deep.equal([
        10, 20, 15, 35, 30, 50, 90, 100, 95, 80, 40
      ]);
    });
  });

  describe('.remove(value)', () => {
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
      expect(root.getValue()).to.equal(40);
      expect(root.getRight().getValue()).to.equal(80);
      expect(root.getRight().getRight().getValue()).to.equal(95);
      expect(root.getRight().getRight().getRight().getValue()).to.equal(100);
      expect(root.getRight().getRight().getLeft().getValue()).to.equal(90);
      expect(root.getRight().getLeft().getValue()).to.equal(50);
      expect(root.getLeft().getValue()).to.equal(15);
      expect(root.getLeft().getRight().getValue()).to.equal(30);
      expect(root.getLeft().getRight().getLeft().getValue()).to.equal(20);
      expect(root.getLeft().getLeft().getValue()).to.equal(10);
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
      expect(root.getValue()).to.equal(40);
      expect(root.getRight().getValue()).to.equal(80);
      expect(root.getRight().getRight().getValue()).to.equal(95);
      expect(root.getRight().getRight().getRight().getValue()).to.equal(100);
      expect(root.getRight().getRight().getLeft().getValue()).to.equal(90);
      expect(root.getRight().getLeft().getValue()).to.equal(50);
      expect(root.getLeft().getValue()).to.equal(20);
      expect(root.getLeft().getRight().getValue()).to.equal(30);
      expect(root.getLeft().getLeft().getValue()).to.equal(15);
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
      expect(avlTree.root().getValue()).to.equal(40);
      expect(avlTree.root().getRight().getValue()).to.equal(95);
      expect(avlTree.root().getRight().getRight().getValue()).to.equal(100);
      expect(avlTree.root().getRight().getLeft().getValue()).to.equal(80);
      expect(avlTree.root().getLeft().getValue()).to.equal(20);
      expect(avlTree.root().getLeft().getRight().getValue()).to.equal(30);
      expect(avlTree.root().getLeft().getLeft().getValue()).to.equal(15);
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
      expect(root.getValue()).to.equal(40);
      expect(root.getLeft().getValue()).to.equal(20);
      expect(root.getLeft().getRight().getValue()).to.equal(30);
      expect(root.getLeft().getLeft().getValue()).to.equal(15);
      expect(root.getRight().getValue()).to.equal(85);
      expect(root.getRight().getLeft().getValue()).to.equal(80);
      expect(root.getRight().getRight().getValue()).to.equal(95);
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

      expect(avlTree.root().getValue()).to.equal(20);
      expect(avlTree.root().getLeft().getValue()).to.equal(15);
      expect(avlTree.root().getRight().getValue()).to.equal(40);

      avlTree.remove(20);
      expect(avlTree.root().getValue()).to.equal(40);
      expect(avlTree.root().getLeft().getValue()).to.equal(15);

      avlTree.remove(40);
      expect(avlTree.root().getValue()).to.equal(15);
      expect(avlTree.count()).to.equal(1);

      avlTree.insert(20);
      avlTree.remove(15);
      expect(avlTree.root().getValue()).to.equal(20);
      expect(avlTree.count()).to.equal(1);
      avlTree.remove(20);
      expect(avlTree.root()).to.equal(null);
      expect(avlTree.count()).to.equal(0);
    });

    it('correctly removes a node with one child', () => {
      function getAll(tree) {
        const arr = [];
        tree.traverseInOrder((n) => arr.push(n.getValue()));
        return arr;
      }

      const tree = new AvlTree();
      tree.insert(3);
      tree.insert(1);
      tree.insert(5);
      tree.insert(6);

      tree.remove(5);

      expect(getAll(tree)).to.deep.equal([1, 3, 6]);
    });

    it('keeps the tree balanced when removing only nodes with two children', () => {
      const insertOrder = [7, 3, 11, 1, 5, 9, 13, 0, 2, 4, 6, 8, 10, 12, 14];
      const deleteOrder = [1, 5, 3, 4, 9, 13, 11, 12, 7, 8, 10];

      const tree = new AvlTree();
      insertOrder.forEach((n) => tree.insert(n));
      deleteOrder.forEach((n) => tree.remove(n));
      expect(tree.root().getBalance()).to.be.oneOf([-1, 0, 1]);
      const elements = [];
      tree.traverseInOrder((n) => elements.push(n.getValue()));
      expect(elements).to.deep.equal([0, 2, 6, 14]);
    });

    it('correctly removes all nodes from a large tree', () => {
      const elements = [
        130, 345, 826, 571, 795, 366, 648, 418, 353, 267, 450, 404, 456, 310,
        137, 888, 497, 378, 651, 148, 552, 632, 886, 532, 273, 802, 590, 187,
        487, 781, 24, 775, 746, 664, 459, 180, 76, 252, 44, 439, 426, 444, 91,
        817, 152, 5, 643, 381, 470, 864, 307, 83, 753, 792, 216, 650, 780, 863,
        396, 750, 494, 855, 684, 508, 837, 849, 654, 812, 561, 86, 731, 845,
        176, 851, 110, 673, 222, 874, 512, 856, 609, 403, 872, 141, 488, 150,
        70, 357, 705, 260, 805, 233, 172, 890, 519, 230, 824, 335, 447, 563,
        613, 62, 597, 659, 166, 185, 93, 666, 634, 195, 767, 729, 803, 520, 626,
        284, 569, 704, 225, 228, 440, 234, 526, 105, 202, 751, 809, 762, 341,
        631, 857, 169, 43, 115, 147, 513, 773, 299, 674, 865, 259, 493, 629,
        164, 555, 437, 101, 866, 287, 821, 380, 711, 337, 212, 458, 45, 733,
        576, 60, 755, 415, 384, 311, 51, 301, 540, 74, 756, 742, 675, 776, 181,
        862, 847, 490, 516, 423, 760, 114, 876, 306, 405, 116, 385, 541, 624,
        501, 873, 867, 16, 698, 617, 323, 354, 359, 700, 644, 179, 502, 397,
        304, 0, 635, 881, 171, 671, 454, 87, 266, 551, 207, 695, 592, 743, 268,
        198, 72, 550, 283, 758, 292, 189, 340, 194, 278, 507, 689, 145, 472,
        269, 199, 346, 870, 431, 333, 363, 433, 578, 464, 779, 668, 827, 577,
        715, 162, 167, 136, 210, 399, 89, 248, 184, 35, 524, 330, 640, 157, 350,
        182, 622, 846, 586, 99, 549, 358, 58, 410, 4, 686, 139, 28, 258, 491,
        575, 842, 825, 138, 618, 174, 660, 395, 871, 801, 749, 504, 383, 589,
        103, 17, 241, 281, 797, 796, 499, 361, 104, 264, 247, 478, 804, 682,
        294, 481, 732, 126, 683, 800, 669, 356, 81, 432, 71, 701, 288, 777, 221,
        759, 892, 370, 736, 257, 477, 783, 134, 515, 771, 612, 411, 467, 838,
        272, 238, 829, 160, 132, 409, 55, 376, 823, 446, 7, 791, 155, 730, 500,
        788, 317, 460, 108, 430, 680, 453, 547, 442, 158, 316, 250, 601, 390,
        14, 201, 39, 9, 884, 244, 583, 559, 251, 681, 702, 420, 371, 78, 763,
        73, 531, 794, 232, 389, 498, 620, 554, 533, 391, 436, 754, 355, 882,
        744, 522, 836, 196, 806, 125, 293, 107, 455, 297, 120, 891, 18, 435,
        652, 206, 122, 853, 203, 564, 394, 412, 320, 56, 766, 832, 633, 6, 835,
        124, 153, 312, 748, 47, 840, 82, 364, 839, 761, 97, 672, 457, 786, 553,
        61, 170, 22, 703, 351, 112, 95, 517, 200, 774, 485, 121, 163, 204, 523,
        25, 720, 558, 348, 466, 41, 29, 237, 177, 119, 741, 253, 336, 37, 331,
        401, 42, 173, 614, 19, 608, 770, 858, 143, 217, 52, 570, 117, 128, 276,
        539, 113, 308, 785, 496, 298, 852, 480, 670, 518, 2, 419, 159, 118, 814,
        724, 588, 461, 714, 226, 628, 286, 186, 468, 98, 208, 712, 630, 627,
        861, 213, 413, 734, 448, 400, 798, 271, 373, 854, 495, 573, 765, 96,
        382, 707, 893, 285, 710, 313, 525, 154, 621, 521, 725, 591, 641, 300,
        696, 790, 645, 146, 535, 282, 565, 691, 572, 639, 12, 657, 256, 23, 85,
        690, 38, 3, 584, 64, 605, 543, 144, 607, 449, 649, 360, 557, 492, 372,
        548, 161, 342, 615, 407, 223, 625, 850, 655, 568, 10, 205, 427, 386,
        820, 197, 123, 249, 131, 735, 667, 129, 319, 100, 465, 567, 616, 191,
        277, 619, 48, 594, 723, 819, 462, 242, 245, 463, 193, 79, 843, 647, 231,
        566, 606, 402, 739, 322, 810, 542, 328, 127, 813, 40, 209, 537, 329,
        510, 476, 102, 860, 374, 602, 429, 69, 220, 676, 599, 527, 424, 362,
        534, 822, 11, 658, 663, 818, 236, 54, 63, 808, 637, 109, 393, 406, 57,
        32, 142, 556, 708, 506, 772, 869, 67, 688, 596, 31, 885, 1, 365, 219,
        503, 709, 344, 326, 367, 332, 229, 263, 600, 706, 560, 604, 175, 868,
        408, 452, 26, 587, 377, 243, 697, 279, 740, 505, 638, 595, 581, 718, 21,
        324, 347, 227, 562, 421, 218, 646, 752, 59, 156, 489, 84, 302, 88, 699,
        50, 135, 653, 875, 388, 685, 434, 77, 745, 445, 878, 290, 677, 255, 275,
        484, 178, 880, 585, 192, 149, 387, 441, 90, 679, 289, 545, 66, 49, 694,
        623, 536, 769, 469, 111, 728, 443, 33, 240, 580, 375, 80, 486, 471, 687,
        859, 830, 94, 530, 879, 270, 30, 833, 816, 722, 579, 352, 574, 528, 887,
        509, 831, 318, 417, 327, 727, 261, 665, 799, 325, 719, 598, 214, 544,
        188, 811, 254, 190, 721, 379, 656, 782, 13, 274, 793, 309, 482, 392,
        889, 768, 338, 713, 841, 451, 661, 717, 349, 848, 538, 726, 133, 483,
        807, 343, 747, 883, 165, 738, 593, 92, 369, 877, 315, 787, 716, 321,
        339, 235, 778, 438, 20, 27, 183, 34, 844, 757, 737, 636, 834, 479, 692,
        603, 303, 678, 828, 239, 789, 46, 425, 414, 474, 246, 514, 815, 662,
        546, 582, 610, 140, 151, 473, 168, 65, 75, 475, 211, 224, 529, 368, 36,
        280, 215, 262, 334, 511, 296, 8, 53, 15, 693, 295, 68, 428, 784, 398,
        106, 291, 764, 305, 422, 416, 611, 314, 642, 265
      ];

      const tree = new AvlTree();
      elements.forEach((n) => tree.insert(n));
      elements.forEach((n) => tree.remove(n));
    });
  });

  describe('.removeNode(node)', () => {
    const testRemoveTree = new AvlTree();
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
});
