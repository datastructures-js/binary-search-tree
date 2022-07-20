import { BinarySearchTreeNode } from './binarySearchTreeNode';

export class BinarySearchTree<T> {
  constructor(compare?: (a: T, b: T) => number);
  insert(value: T): BinarySearchTree<T>;
  has(value: T): boolean;
  find(value: T): BinarySearchTreeNode<T> | null;
  max(node?: BinarySearchTreeNode<T>): BinarySearchTreeNode<T> | null;
  min(node?: BinarySearchTreeNode<T>): BinarySearchTreeNode<T> | null;
  lowerBound(value: T, includeEqual?: boolean): BinarySearchTreeNode<T> | null;
  floor(value: T, includeEqual?: boolean): BinarySearchTreeNode<T> | null;
  upperBound(value: T, includeEqual?: boolean): BinarySearchTreeNode<T> | null;
  ceil(value: T, includeEqual?: boolean): BinarySearchTreeNode<T> | null;
  root(): BinarySearchTreeNode<T> | null;
  count(): number;
  remove(value: T): boolean;
  traverseInOrder(cb: (node: BinarySearchTreeNode<T>) => void): void;
  traversePreOrder(cb: (node: BinarySearchTreeNode<T>) => void): void;
  traversePostOrder(cb: (node: BinarySearchTreeNode<T>) => void): void;
  clear(): void;
}
