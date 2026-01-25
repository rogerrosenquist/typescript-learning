import { Queue } from "./Queue.js";
import { Stack } from "./Stack.js";

// <T> allows the user to define what "Vertex" looks like (string, number, etc.)
export class Graph<T> {
  // We use Set<T> instead of T[] to automatically prevent duplicate edges
  private adjacencyList: Map<T, Set<T>>;

  constructor() {
    this.adjacencyList = new Map();
  }

  addVertex(vertex: T): void {
    if (!this.adjacencyList.has(vertex)) {
      this.adjacencyList.set(vertex, new Set());
    }
  }

  addEdge(v1: T, v2: T): void {
    // Ensure vertices exist
    if (!this.adjacencyList.has(v1)) this.addVertex(v1);
    if (!this.adjacencyList.has(v2)) this.addVertex(v2);

    // .add() on a Set automatically ignores duplicates!
    this.adjacencyList.get(v1)!.add(v2);
    this.adjacencyList.get(v2)!.add(v1);
  }

  bfs(start: T): T[] {
    if (!this.adjacencyList.has(start)) return [];

    const queue = new Queue<T>();
    const result: T[] = [];
    const visited = new Set<T>();

    queue.enqueue(start);
    visited.add(start);

    while (!queue.isEmpty) {
      const current = queue.dequeue()!;
      result.push(current);

      const neighbors = this.adjacencyList.get(current) || new Set();
      // We can iterate over Sets just like Arrays
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.enqueue(neighbor);
        }
      }
    }

    return result;
  }

  dfs(start: T): T[] {
    if (!this.adjacencyList.has(start)) return [];

    const stack = new Stack<T>();
    const result: T[] = [];
    const visited = new Set<T>();

    stack.push(start);

    while (!stack.isEmpty) {
      const current = stack.pop()!;

      if (!visited.has(current)) {
        visited.add(current);
        result.push(current);

        const neighbors = this.adjacencyList.get(current) || new Set();
        for (const neighbor of neighbors) {
          if (!visited.has(neighbor)) {
            stack.push(neighbor);
          }
        }
      }
    }

    return result;
  }
}