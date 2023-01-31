import { BinarySearchTreeNode } from './binarySearchTreeNode';

export class BinarySearchTree<T> {
  constructor(compare?: (a: T, b: T) => number, options?: { key: string });
  insert(value: T): BinarySearchTree<T>;
  has(value: T): boolean;
  hasKey(key: number|string): boolean;
  find(value: T): BinarySearchTreeNode<T> | null;
  findKey(key: number|string): BinarySearchTreeNode<T> | null;
  max(node?: BinarySearchTreeNode<T>): BinarySearchTreeNode<T> | null;
  min(node?: BinarySearchTreeNode<T>): BinarySearchTreeNode<T> | null;
  lowerBound(value: T, includeEqual?: boolean): BinarySearchTreeNode<T> | null;
  lowerBoundKey(key: number|string, includeEqual?: boolean): BinarySearchTreeNode<T> | null;
  floor(value: T, includeEqual?: boolean): BinarySearchTreeNode<T> | null;
  floorKey(key: number|string, includeEqual?: boolean): BinarySearchTreeNode<T> | null;
  upperBound(value: T, includeEqual?: boolean): BinarySearchTreeNode<T> | null;
  upperBoundKey(key: number|string, includeEqual?: boolean): BinarySearchTreeNode<T> | null;
  ceil(value: T, includeEqual?: boolean): BinarySearchTreeNode<T> | null;
  ceilKey(key: number|string, includeEqual?: boolean): BinarySearchTreeNode<T> | null;
  root(): BinarySearchTreeNode<T> | null;
  count(): number;
  remove(value: T): boolean;
  removeNode(node: BinarySearchTreeNode): boolean;
  traverseInOrder(cb: (node: BinarySearchTreeNode<T>) => void, abortCb?: () => boolean): void;
  traversePreOrder(cb: (node: BinarySearchTreeNode<T>) => void, abortCb?: () => boolean): void;
  traversePostOrder(cb: (node: BinarySearchTreeNode<T>) => void, abortCb?: () => boolean): void;
  clear(): void;
}
