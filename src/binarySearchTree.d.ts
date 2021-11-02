import { BinarySearchTreeNode } from './binarySearchTreeNode';

export class BinarySearchTree<T extends number|string, U = undefined> {
  insert(key: T, value?: U): BinarySearchTreeNode<T, U>;
  has(key: T): boolean;
  find(key: T): BinarySearchTreeNode<T, U> | null;
  max(node?: BinarySearchTreeNode<T, U>): BinarySearchTreeNode<T, U> | null;
  min(node?: BinarySearchTreeNode<T, U>): BinarySearchTreeNode<T, U> | null;
  lowerBound(k: T, includeEqual?: boolean): BinarySearchTreeNode<T, U> | null;
  floor(k: T, includeEqual?: boolean): BinarySearchTreeNode<T, U> | null;
  upperBound(k: T, includeEqual?: boolean): BinarySearchTreeNode<T, U> | null;
  ceil(k: T, includeEqual?: boolean): BinarySearchTreeNode<T, U> | null;
  root(): BinarySearchTreeNode<T, U> | null;
  count(): number;
  remove(k: T): boolean;
  traverseInOrder(cb: (node: BinarySearchTreeNode<T, U>) => void): void;
  traversePreOrder(cb: (node: BinarySearchTreeNode<T, U>) => void): void;
  traversePostOrder(cb: (node: BinarySearchTreeNode<T, U>) => void): void;
  clear(): void;
}
