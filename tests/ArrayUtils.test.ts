import { describe, it, expect } from "vitest";
import { myMap, myFilter, myReduce } from "../src/ArrayUtils.js";

describe("Array Utilities", () => {
  it("myMap should correctly map numbers to squares", () => {
    const input = [1, 2, 3];
    const result = myMap(input, (n) => n * n);
    expect(result).toEqual([1, 4, 9]);
  });

  it("myMap should change types (number to string)", () => {
    const input = [10];
    const result = myMap(input, (n) => `Value: ${n}`);
    expect(result).toEqual(["Value: 10"]);
  });

  it("myFilter should remove items that do not match the predicate", () => {
    const numbers = [1, 2, 3, 4, 5];
    const evens = myFilter(numbers, (n) => n % 2 === 0);
    expect(evens).toEqual([2, 4]);
  });

  it("myReduce should sum numbers correctly", () => {
    const numbers = [1, 2, 3, 4];
    const sum = myReduce(numbers, (acc, curr) => acc + curr, 0);
    expect(sum).toBe(10);
  });

  it("myReduce should transform types (array to object)", () => {
    const fruits = ["apple", "banana", "apple"];
    // Count occurrences of each fruit
    const counts = myReduce(
      fruits,
      (acc: Record<string, number>, curr) => {
        acc[curr] = (acc[curr] || 0) + 1;
        return acc;
      },
      {}
    );

    expect(counts).toEqual({ apple: 2, banana: 1 });
  });
});
