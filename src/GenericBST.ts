/**
 * A custom type for comparing two items of type T.
 * Returns:
 * - A negative number if a < b
 * - A positive number if a > b
 * - Zero if a === b
 */
export type Comparator<T> = (a: T, b: T) => number;

export class GenericNode<T> {
  value: T;
  left: GenericNode<T> | null = null;
  right: GenericNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

export class GenericBST<T> {
  root: GenericNode<T> | null = null;
  private compare: Comparator<T>;

  /**
   * @param comparator Optional function to define sort order. 
   * Defaults to standard JS comparison for primitive types.
   */
  constructor(comparator?: Comparator<T>) {
    this.compare = comparator || ((a: any, b: any) => (a < b ? -1 : a > b ? 1 : 0));
  }

  // --- Public Methods ---

  /**
   * Inserts a new value into the tree.
   */
  insert(value: T): void {
    const newNode = new GenericNode(value);
    if (!this.root) {
      this.root = newNode;
    } else {
      this.insertRecursive(this.root, newNode);
    }
  }

  /**
   * Searches for a value and returns the node if found.
   */
  find(value: T): GenericNode<T> | null {
    let current = this.root;
    while (current) {
      const comparison = this.compare(value, current.value);
      if (comparison === 0) return current;
      current = comparison < 0 ? current.left : current.right;
    }
    return null;
  }

  /**
   * Removes a value from the tree.
   */
  delete(value: T): void {
    this.root = this.deleteRecursive(this.root, value);
  }

  /**
   * Prints the tree values in ascending order.
   */
  printInOrder(node: GenericNode<T> | null = this.root): void {
    if (node) {
      this.printInOrder(node.left);
      console.log(node.value);
      this.printInOrder(node.right);
    }
  }

  // --- Private Helpers ---

  private insertRecursive(node: GenericNode<T>, newNode: GenericNode<T>): void {
    if (this.compare(newNode.value, node.value) < 0) {
      if (!node.left) node.left = newNode;
      else this.insertRecursive(node.left, newNode);
    } else {
      if (!node.right) node.right = newNode;
      else this.insertRecursive(node.right, newNode);
    }
  }

  private deleteRecursive(node: GenericNode<T> | null, value: T): GenericNode<T> | null {
    if (!node) return null;

    const comparison = this.compare(value, node.value);

    if (comparison < 0) {
      node.left = this.deleteRecursive(node.left, value);
    } else if (comparison > 0) {
      node.right = this.deleteRecursive(node.right, value);
    } else {
      // Node found! 
      
      // Case 1 & 2: Leaf or one child
      if (!node.left) return node.right;
      if (!node.right) return node.left;

      // Case 3: Two children
      // Find the smallest value in the right subtree (successor)
      node.value = this.getMinVal(node.right);
      // Delete the successor
      node.right = this.deleteRecursive(node.right, node.value);
    }
    return node;
  }

  private getMinVal(node: GenericNode<T>): T {
    let current = node;
    while (current.left) {
      current = current.left;
    }
    return current.value;
  }
}