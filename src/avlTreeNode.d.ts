export class AvlTreeNode<T> {
  constructor(value: T, compare?: (a: T, b: T) => number);
  setValue(value?: T): AvlTreeNode<T>;
  getValue(): T;
  setLeft(left?: AvlTreeNode<T>): AvlTreeNode<T>;
  getLeft(): AvlTreeNode<T> | null;
  hasLeft(): boolean;
  setRight(right?: AvlTreeNode<T>): AvlTreeNode<T>;
  getRight(): AvlTreeNode<T> | null;
  hasRight(): boolean;
  setParent(parent?: AvlTreeNode<T>): AvlTreeNode<T>;
  getParent(): AvlTreeNode<T> | null;
  hasParent(): boolean;
  isRoot(): boolean;
  isLeaf(): boolean;
  rotateLeft(): AvlTreeNode<T>;
  rotateRight(): AvlTreeNode<T>;
  rotateLeftRight(): AvlTreeNode<T>;
  rotateRightLeft(): AvlTreeNode<T>;
  updateHeight(): AvlTreeNode<T>;
  getHeight(): number;
  getLeftHeight(): number;
  getRightHeight(): number;
  getBalance(): number;
  isBalanced(): boolean;
}
