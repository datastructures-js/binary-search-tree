import { BinarySearchTreeNode } from './binarySearchTreeNode';

export class BinarySearchTree<T extends number|string, U = undefined> {
  insert(key: T, value: U): BinarySearchTreeNode<T, U>;
  has(key: T): boolean;
  find(key: T): BinarySearchTreeNode<T, U>;
  max(node?: BinarySearchTreeNode<T, U>): BinarySearchTreeNode<T, U>;
  min(node?: BinarySearchTreeNode<T, U>): BinarySearchTreeNode<T, U>;
  lowerBound(k: T, node?: BinarySearchTreeNode<T, U>): BinarySearchTreeNode<T, U>;
  upperBound(k: T, node?: BinarySearchTreeNode<T, U>): BinarySearchTreeNode<T, U>;
  root(): BinarySearchTreeNode<T, U>;
  count(): number;
  remove(k: T): boolean;
  traverseInOrder(cb: (node: BinarySearchTreeNode<T, U>) => void): void;
  traversePreOrder(cb: (node: BinarySearchTreeNode<T, U>) => void): void;
  traversePostOrder(cb: (node: BinarySearchTreeNode<T, U>) => void): void;
  clear(): void;
}
