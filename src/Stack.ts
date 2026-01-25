import { LinkedList } from './LinkedList.js';

export class Stack<T> {
  private list = new LinkedList<T>();

  // Add an item to the top
  push(value: T): void {
    this.list.prepend(value); // Prepending makes it the new "top"
  }

  // Remove and return the top item
  pop(): T | null {
    if (!this.list.head) return null;
    const value = this.list.head.value;
    this.list.remove(value); // Remove the head
    return value;
  }

  // Look at the top item without removing it
  peek(): T | null {
    return this.list.head ? this.list.head.value : null;
  }

  get isEmpty(): boolean {
    return this.list.size === 0;
  }
}