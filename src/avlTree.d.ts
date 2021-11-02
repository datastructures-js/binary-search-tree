import { BinarySearchTree } from './binarySearchTree';
import { AvlTreeNode } from './avlTreeNode';

export class AvlTree<T extends number|string, U = undefined> extends BinarySearchTree<T, U> {
  insert(key: T, value?: U): AvlTreeNode<T, U>;
  find(key: T): AvlTreeNode<T, U> | null;
  max(node?: AvlTreeNode<T, U>): AvlTreeNode<T, U> | null;
  min(node?: AvlTreeNode<T, U>): AvlTreeNode<T, U> | null;
  lowerBound(k: T, includeEqual?: boolean): AvlTreeNode<T, U> | null;
  floor(k: T, includeEqual?: boolean): AvlTreeNode<T, U> | null;
  upperBound(k: T, includeEqual?: boolean): AvlTreeNode<T, U> | null;
  ceil(k: T, includeEqual?: boolean): AvlTreeNode<T, U> | null;
  root(): AvlTreeNode<T, U> | null;
  traverseInOrder(cb: (node: AvlTreeNode<T, U>) => void): void;
  traversePreOrder(cb: (node: AvlTreeNode<T, U>) => void): void;
  traversePostOrder(cb: (node: AvlTreeNode<T, U>) => void): void;
}
