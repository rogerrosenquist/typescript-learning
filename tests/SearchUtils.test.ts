import { describe, it, expect } from "vitest";
import { binarySearch } from "../src/SearchUtils.js";
import { recursiveBinarySearch } from "../src/SearchUtils.js";

describe("Binary Search", () => {
  const sortedNums = [10, 20, 30, 40, 50, 60, 70];

  it("should find the index of an existing number", () => {
    expect(binarySearch(sortedNums, 30)).toBe(2);
    expect(binarySearch(sortedNums, 70)).toBe(6);
  });

  it("should return -1 if the number is missing", () => {
    expect(binarySearch(sortedNums, 25)).toBe(-1);
  });

  it("should work with an array of one item", () => {
    expect(binarySearch([100], 100)).toBe(0);
    expect(binarySearch([100], 50)).toBe(-1);
  });

  it("should work with strings in alphabetical order", () => {
    const names = ["Alice", "Bob", "Charlie", "Zelda"];
    expect(binarySearch(names, "Charlie")).toBe(2);
  });
});

describe("Recursive Binary Search", () => {
  const sortedNums = [5, 15, 25, 35, 45, 55, 65];

  it("should find the index of an existing number", () => {
    expect(recursiveBinarySearch(sortedNums, 25)).toBe(2);
    expect(recursiveBinarySearch(sortedNums, 65)).toBe(6);
  });

  it("should return -1 if the number is missing", () => {
    expect(recursiveBinarySearch(sortedNums, 30)).toBe(-1);
  });

  it("should work with an array of one item", () => {
    expect(recursiveBinarySearch([200], 200)).toBe(0);
    expect(recursiveBinarySearch([200], 100)).toBe(-1);
  });

  it("should work with strings in alphabetical order", () => {
    const names = ["Anna", "Brian", "Catherine", "Zoe"];
    expect(recursiveBinarySearch(names, "Catherine")).toBe(2);
  });
});
