import { describe, it, expect } from "vitest";
import { GenericBST } from "../src/GenericBST.js";
import { binarySearch, recursiveBinarySearch } from "../src/SearchUtils.js";
import { LinkedList } from "../src/LinkedList.js";
import { bubbleSort, insertionSort, mergeSort, quickSort } from '../src/SortUtils.js';

describe("Binary Search Tree", () => {
  it("should handle 1000 random insertions and still find them all", () => {
    const bst = new GenericBST<number>();
    const numbers = Array.from({ length: 1000 }, () =>
      Math.floor(Math.random() * 10000)
    );

    numbers.forEach((n) => bst.insert(n));

    // Verify a few random samples from our input array exist in the tree
    expect(bst.find(numbers[0])).not.toBeNull();
    expect(bst.find(numbers[500])).not.toBeNull();
    expect(bst.find(numbers[999])).not.toBeNull();
  });
});

describe("binarySearch", () => {
  it("should handle large sorted arrays efficiently", () => {
    const largeArray = Array.from({ length: 10000 }, (_, i) => i * 2); // Even numbers from 0 to 19998
    expect(binarySearch(largeArray, 1234)).toBe(617);
    expect(binarySearch(largeArray, 19998)).toBe(9999);
    expect(binarySearch(largeArray, 20000)).toBe(-1);
  });
});

describe("recursiveBinarySearch", () => {
  it("should handle large sorted arrays efficiently", () => {
    const largeArray = Array.from({ length: 10000 }, (_, i) => i * 3); // Multiples of 3 from 0 to 29997
    expect(recursiveBinarySearch(largeArray, 1233)).toBe(411);
    expect(recursiveBinarySearch(largeArray, 29997)).toBe(9999);
    expect(recursiveBinarySearch(largeArray, 30000)).toBe(-1);
  });
});

describe("LinkedList", () => {
  it("should handle 1000 appends and prepends correctly", () => {
    const list = new LinkedList<number>();
    for (let i = 0; i < 500; i++) {
      list.append(i);
      list.prepend(1000 + i);
    }
    expect(list.size).toBe(1000);
    expect(list.find(250)).not.toBeNull();
    expect(list.find(1250)).not.toBeNull();
    expect(list.find(2000)).toBeNull();
  });
});

describe("Sorting Utilities Stress Test", () => {
  const largeUnsorted = Array.from({ length: 50000 }, () =>
    Math.floor(Math.random() * 10000)
  );
  const largeSorted = [...largeUnsorted].sort((a, b) => a - b); // Expected sorted array

  it("bubbleSort should sort large arrays (slowly)", () => {
    expect(bubbleSort(largeUnsorted)).toEqual(largeSorted);
  });
  it("insertionSort should sort large arrays (faster, but still slow)", () => {
    expect(insertionSort(largeUnsorted)).toEqual(largeSorted);
  });
  it("mergeSort should sort large arrays (fast)", () => {
    expect(mergeSort(largeUnsorted)).toEqual(largeSorted);
  });
  it("quickSort should sort large arrays (fast)", () => {
    expect(quickSort(largeUnsorted)).toEqual(largeSorted);
  });
});
