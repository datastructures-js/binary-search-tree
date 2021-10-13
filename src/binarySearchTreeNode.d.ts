export class BinarySearchTreeNode<T extends number|string, U = undefined> {
  constructor(key: T, value?: U);
  setKey(key: T): BinarySearchTreeNode<T, U>;
  getKey(): T;
  setValue(value?: U): BinarySearchTreeNode<T, U>;
  getValue(): U;
  setLeft(left?: BinarySearchTreeNode<T, U>): BinarySearchTreeNode<T, U>;
  getLeft(): BinarySearchTreeNode<T, U> | null;
  hasLeft(): boolean;
  setRight(right?: BinarySearchTreeNode<T, U>): BinarySearchTreeNode<T, U>;
  getRight(): BinarySearchTreeNode<T, U> | null;
  hasRight(): boolean;
  setParent(parent?: BinarySearchTreeNode<T, U>): BinarySearchTreeNode<T, U>;
  getParent(): BinarySearchTreeNode<T, U> | null;
  hasParent(): boolean;
  isRoot(): boolean;
  isLeaf(): boolean;
}
