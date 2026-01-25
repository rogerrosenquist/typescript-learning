import { describe, it, expect, beforeEach } from "vitest";
import { Graph } from "../src/Graph";

describe("Graph Data Structure", () => {
  let graph: Graph<String>;

  // Runs before every single 'it' block
  beforeEach(() => {
    graph = new Graph();
  });

  describe("Basic Operations", () => {
    it("should add vertices correctly", () => {
      graph.addVertex("A");
      graph.addVertex("B");

      // We can check if BFS returns just the single node to verify it exists
      expect(graph.bfs("A")).toEqual(["A"]);
      expect(graph.bfs("B")).toEqual(["B"]);
    });

    it("should add edges (undirected)", () => {
      graph.addVertex("A");
      graph.addVertex("B");
      graph.addEdge("A", "B");

      const traversal = graph.bfs("A");
      // If edge exists, BFS from A should find B immediately
      expect(traversal).toContain("B");
      expect(traversal.length).toBe(2);
    });

    it("should handle adding edges to non-existent vertices", () => {
      // Your code automatically adds vertices if they don't exist
      graph.addEdge("X", "Y");

      expect(graph.bfs("X")).toContain("Y");
      expect(graph.bfs("Y")).toContain("X");
    });
  });

  describe("Traversals", () => {
    // Setup a standard graph for traversal tests
    //      A
    //    /   \
    //   B     C
    //   |     |
    //   D     E
    //    \   /
    //      F
    beforeEach(() => {
      graph.addVertex("A");
      graph.addVertex("B");
      graph.addVertex("C");
      graph.addVertex("D");
      graph.addVertex("E");
      graph.addVertex("F");

      graph.addEdge("A", "B");
      graph.addEdge("A", "C");
      graph.addEdge("B", "D");
      graph.addEdge("C", "E");
      graph.addEdge("D", "F");
      graph.addEdge("E", "F");
    });

    it("should perform Breadth-First Search (BFS)", () => {
      const result = graph.bfs("A");

      // BFS should visit neighbors (B, C) before deep nodes (D, E, F)
      // Note: exact order of B vs C depends on insertion order
      expect(result[0]).toBe("A");
      expect(result.slice(1, 3)).toEqual(expect.arrayContaining(["B", "C"]));
      expect(result.slice(3, 5)).toEqual(expect.arrayContaining(["D", "E"]));
      expect(result[5]).toBe("F");
    });

    it("should perform Depth-First Search (DFS)", () => {
      const result = graph.dfs("A");

      // DFS is harder to test for exact array equality because order depends heavily
      // on neighbor insertion order.
      // However, we know it must hit the end of a branch before switching.

      expect(result[0]).toBe("A");
      expect(result).toHaveLength(6);

      // Check that it's a valid DFS path (one simple check)
      // If it goes A -> B, the next MUST be D (given our structure), not C.
      if (result[1] === "B") {
        expect(result[2]).toBe("D");
      } else if (result[1] === "C") {
        expect(result[2]).toBe("E");
      }
    });

    it("should return empty array for invalid start node", () => {
      expect(graph.bfs("Z")).toEqual([]);
      expect(graph.dfs("Z")).toEqual([]);
    });
  });

  describe("Refactor Improvements", () => {
    it("should NOT add duplicate edges (Option 1 check)", () => {
      graph.addVertex("A");
      graph.addVertex("B");

      // Add the same edge 3 times
      graph.addEdge("A", "B");
      graph.addEdge("A", "B");
      graph.addEdge("A", "B");

      // If we were using Arrays, 'B' would appear 3 times in 'A's list.
      // With Sets, it should only appear once.
      const traversal = graph.bfs("A");

      // Output should be ['A', 'B'], length 2
      expect(traversal).toHaveLength(2);
      expect(traversal).toEqual(["A", "B"]);
    });

    it("should handle Numbers via Generics (Option 2 check)", () => {
      // Explicitly define this graph as holding numbers
      const numGraph = new Graph<number>();

      numGraph.addEdge(1, 2);
      numGraph.addEdge(2, 4);
      numGraph.addEdge(1, 3);

      const result = numGraph.bfs(1);

      // Should handle numbers correctly: [1, 2, 3, 4] (order of 2/3 depends on Set iteration)
      expect(result).toContain(1);
      expect(result).toContain(4);
      expect(result.length).toBe(4);
    });
  });
});
