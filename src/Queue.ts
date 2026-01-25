import { LinkedList } from './LinkedList.js';

export class Queue<T> {
  private list = new LinkedList<T>();

  // Add an item to the back of the line
  enqueue(value: T): void {
    this.list.append(value);
  }

  // Remove and return the item at the front of the line
  dequeue(): T | null {
    if (!this.list.head) return null;
    const value = this.list.head.value;
    this.list.remove(value);
    return value;
  }

  peek(): T | null {
    return this.list.head ? this.list.head.value : null;
  }

  get isEmpty(): boolean {
    return this.list.size === 0;
  }
}