export class BinarySearchTreeNode<T extends number|string, U = undefined> {
  constructor(key: T, value: U);
  setKey(key: T): BinarySearchTreeNode<T, U>;
  getKey(): T;
  setValue(value: U): BinarySearchTreeNode<T, U>;
  getValue(): U;
  setLeft(left: BinarySearchTreeNode<T, U>): BinarySearchTreeNode<T, U>;
  getLeft(): BinarySearchTreeNode<T, U>;
  hasLeft(): boolean;
  setRight(right: BinarySearchTreeNode<T, U>): BinarySearchTreeNode<T, U>;
  getRight(): BinarySearchTreeNode<T, U>;
  hasRight(): boolean;
  setParent(right: BinarySearchTreeNode<T, U>): BinarySearchTreeNode<T, U>;
  getParent(): BinarySearchTreeNode<T, U>;
  hasParent(): boolean;
  isRoot(): boolean;
  isLeaf(): boolean;
}
