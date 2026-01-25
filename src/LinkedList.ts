export class ListNode<T> {
  value: T;
  next: ListNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

export class LinkedList<T> {
  head: ListNode<T> | null = null;
  tail: ListNode<T> | null = null;
  private _size: number = 0;

  get size(): number {
    return this._size;
  }

  // Add to the end of the list
  append(value: T): void {
    const newNode = new ListNode(value);

    if (!this.head) {
      // If list is empty, new node is both head AND tail
      this.head = newNode;
      this.tail = newNode;
    } else if (this.tail) {
      // Connect the current tail to the new node
      this.tail.next = newNode;
      // Move the tail pointer to the new end
      this.tail = newNode;
    }

    this._size++;
  }

  prepend(value: T): void {
    const newNode = new ListNode(value);
    newNode.next = this.head;
    this.head = newNode;

    // If this was the first node added, it's also the tail
    if (!this.tail) {
      this.tail = newNode;
    }

    this._size++;
  }

  // Find a node by value
  find(value: T): ListNode<T> | null {
    let current = this.head;
    while (current) {
      if (current.value === value) return current;
      current = current.next;
    }
    return null;
  }

  remove(value: T): boolean {
    if (!this.head) return false;

    // Case 1: Removing the head
    if (this.head.value === value) {
      this.head = this.head.next;
      // Special case: If list is now empty, tail must also be null
      if (!this.head) {
        this.tail = null;
      }
      this._size--;
      return true;
    }

    // Case 2: Removing from middle or end
    let current = this.head;
    while (current.next) {
      if (current.next.value === value) {
        // Check if we are removing the tail
        if (current.next === this.tail) {
          this.tail = current; // Move tail back one step
        }

        current.next = current.next.next;
        this._size--;
        return true;
      }
      current = current.next;
    }

    return false;
  }

  reverse(): void {
    // 1. Keep a reference to the current head, because it will become the new tail
    const originalHead = this.head;

    let prev: ListNode<T> | null = null;
    let current = this.head;
    let next: ListNode<T> | null = null;

    // 2. Standard reversal loop
    while (current !== null) {
      next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }

    // 3. Update head and tail
    this.tail = originalHead; // The old head is now at the back
    this.head = prev; // 'prev' is the node that was at the very end

    // 4. Safety check: ensure the new tail doesn't point to anything
    if (this.tail) {
      this.tail.next = null;
    }
  }
}
