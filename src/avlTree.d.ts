import { BinarySearchTree } from './binarySearchTree';
import { AvlTreeNode } from './avlTreeNode';

export class AvlTree<T> extends BinarySearchTree<T> {
  constructor(compare?: (a: T, b: T) => number, options?: { key: string });
  insert(value: T): AvlTree<T>;
  insertIterative(value: T): AvlTree<T>;
  remove(value: T): boolean;
  removeIterative(value: T): boolean;
  find(value: T): AvlTreeNode<T> | null;
  findIterative(value: T): AvlTreeNode<T> | null;
  findKey(key: number|string): AvlTreeNode<T> | null;
  max(node?: AvlTreeNode<T>): AvlTreeNode<T> | null;
  maxIterative(node?: AvlTreeNode<T>): AvlTreeNode<T> | null;
  min(node?: AvlTreeNode<T>): AvlTreeNode<T> | null;
  minIterative(node?: AvlTreeNode<T>): AvlTreeNode<T> | null;
  lowerBound(value: T, includeEqual?: boolean): AvlTreeNode<T> | null;
  lowerBoundIterative(value: T, includeEqual?: boolean): AvlTreeNode<T> | null;
  lowerBoundKey(key: number|string, includeEqual?: boolean): AvlTreeNode<T> | null;
  floor(value: T, includeEqual?: boolean): AvlTreeNode<T> | null;
  floorKey(key: number|string, includeEqual?: boolean): AvlTreeNode<T> | null;
  upperBound(value: T, includeEqual?: boolean): AvlTreeNode<T> | null;
  upperBoundIterative(value: T, includeEqual?: boolean): AvlTreeNode<T> | null;
  upperBoundKey(key: number|string, includeEqual?: boolean): AvlTreeNode<T> | null;
  ceil(value: T, includeEqual?: boolean): AvlTreeNode<T> | null;
  ceilKey(key: number|string, includeEqual?: boolean): AvlTreeNode<T> | null;
  root(): AvlTreeNode<T> | null;
  traverseInOrder(cb: (node: AvlTreeNode<T>) => void, abortCb?: () => boolean): void;
  traverseInOrderIterative(cb: (node: AvlTreeNode<T>) => void, abortCb?: () => boolean): void;
  traversePreOrder(cb: (node: AvlTreeNode<T>) => void, abortCb?: () => boolean): void;
  traversePreOrderIterative(cb: (node: AvlTreeNode<T>) => void, abortCb?: () => boolean): void;
  traversePostOrder(cb: (node: AvlTreeNode<T>) => void, abortCb?: () => boolean): void;
  traversePostOrderIterative(cb: (node: AvlTreeNode<T>) => void, abortCb?: () => boolean): void;
  removeNode(node: AvlTreeNode): boolean;
}
