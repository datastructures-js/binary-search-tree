export class BinarySearchTreeNode<T> {
  constructor(value: T);
  setValue(value?: T): BinarySearchTreeNode<T>;
  getValue(): T;
  setLeft(left?: BinarySearchTreeNode<T>): BinarySearchTreeNode<T>;
  getLeft(): BinarySearchTreeNode<T> | null;
  hasLeft(): boolean;
  setRight(right?: BinarySearchTreeNode<T>): BinarySearchTreeNode<T>;
  getRight(): BinarySearchTreeNode<T> | null;
  hasRight(): boolean;
  setParent(parent?: BinarySearchTreeNode<T>): BinarySearchTreeNode<T>;
  getParent(): BinarySearchTreeNode<T> | null;
  hasParent(): boolean;
  isRoot(): boolean;
  isLeaf(): boolean;
}
