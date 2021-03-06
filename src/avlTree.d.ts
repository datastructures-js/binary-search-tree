import { BinarySearchTree } from './binarySearchTree';
import { AvlTreeNode } from './avlTreeNode';

export class AvlTree<T extends number|string, U = undefined> extends BinarySearchTree<T, U> {
  insert(key: T, value: U): AvlTreeNode<T, U>;
  find(key: T): AvlTreeNode<T, U>;
  max(node?: AvlTreeNode<T, U>): AvlTreeNode<T, U>;
  min(node?: AvlTreeNode<T, U>): AvlTreeNode<T, U>;
  lowerBound(k: T, node?: AvlTreeNode<T, U>): AvlTreeNode<T, U>;
  upperBound(k: T, node?: AvlTreeNode<T, U>): AvlTreeNode<T, U>;
  root(): AvlTreeNode<T, U>;
  traverseInOrder(cb: (node: AvlTreeNode<T, U>) => void): void;
  traversePreOrder(cb: (node: AvlTreeNode<T, U>) => void): void;
  traversePostOrder(cb: (node: AvlTreeNode<T, U>) => void): void;
}
