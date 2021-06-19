import { BinarySearchTreeNode } from './binarySearchTreeNode';

export class AvlTreeNode<T extends number|string, U = undefined> extends BinarySearchTreeNode<T, U> {
  rotateLeft(): AvlTreeNode<T, U>;
  rotateRight(): AvlTreeNode<T, U>;
  rotateLeftRight(): AvlTreeNode<T, U>;
  rotateRightLeft(): AvlTreeNode<T, U>;
  updateHeight(): AvlTreeNode<T, U>;
  getHeight(): number;
  getLeftHeight(): number;
  getRightHeight(): number;
  getBalance(): number;
  isBalanced(): boolean;
}
