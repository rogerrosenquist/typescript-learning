import { describe, it, expect } from 'vitest';
import { Stack } from '../src/Stack.js';
import { Queue } from '../src/Queue.js';

describe('Stack (LIFO)', () => {
  it('should pop items in reverse order of push', () => {
    const stack = new Stack<number>();
    stack.push(1);
    stack.push(2);
    expect(stack.pop()).toBe(2);
    expect(stack.pop()).toBe(1);
  });
});

describe('Queue (FIFO)', () => {
  it('should dequeue items in the same order of enqueue', () => {
    const queue = new Queue<number>();
    queue.enqueue(1);
    queue.enqueue(2);
    expect(queue.dequeue()).toBe(1);
    expect(queue.dequeue()).toBe(2);
  });
});