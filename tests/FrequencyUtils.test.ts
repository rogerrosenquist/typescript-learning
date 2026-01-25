import { describe, it, expect } from "vitest";
import { FrequencyUtils } from "../src/FrequencyUtils";

describe("Frequency Counters & Sets", () => {
  describe("validAnagram", () => {
    it("should return true for valid anagrams", () => {
      expect(FrequencyUtils.validAnagram("cinema", "iceman")).toBe(true);
      expect(FrequencyUtils.validAnagram("anagram", "nagaram")).toBe(true);
      expect(FrequencyUtils.validAnagram("", "")).toBe(true); // Empty strings match
    });

    it("should return false for invalid anagrams", () => {
      expect(FrequencyUtils.validAnagram("aaz", "zza")).toBe(false);
      expect(FrequencyUtils.validAnagram("rat", "car")).toBe(false);
      expect(FrequencyUtils.validAnagram("awesome", "awesom")).toBe(false); // Length mismatch
    });

    it("should case sensitivity matter?", () => {
      // Our current implementation is case-sensitive ('A' !== 'a')
      expect(FrequencyUtils.validAnagram("Hello", "hello")).toBe(false);
    });
  });

  describe("hasDuplicates", () => {
    it("should return true if duplicates exist", () => {
      expect(FrequencyUtils.hasDuplicates(1, 2, 3, 1)).toBe(true);
      expect(FrequencyUtils.hasDuplicates("a", "b", "c", "a")).toBe(true);
    });

    it("should return false if all items are unique", () => {
      expect(FrequencyUtils.hasDuplicates(1, 2, 3, 4)).toBe(false);
    });

    it("should handle mixed types correctly", () => {
      // '1' (string) is different from 1 (number)
      expect(FrequencyUtils.hasDuplicates(1, "1")).toBe(false);
    });
  });

  describe("createFrequencyMap (The Hash Map Builder)", () => {
    it("should correctly count characters in a string", () => {
      const result = FrequencyUtils.createFrequencyMap("mississippi");

      // This is using it "like a hashmap" - O(1) lookups
      expect(result.get("i")).toBe(4);
      expect(result.get("s")).toBe(4);
      expect(result.get("p")).toBe(2);
      expect(result.get("m")).toBe(1);
    });

    it("should works with Arrays of strings (e.g., Voting Logic)", () => {
      const votes = ["Alice", "Bob", "Alice", "Charlie", "Alice", "Bob"];
      const voteMap = FrequencyUtils.createFrequencyMap(votes);

      // Access the counts directly
      expect(voteMap.get("Alice")).toBe(3);
      expect(voteMap.get("Bob")).toBe(2);
      expect(voteMap.get("Charlie")).toBe(1);

      // Confirm we can check for existence
      expect(voteMap.has("Dave")).toBe(false);
    });

    it("should handle number arrays", () => {
      const nums = [100, 200, 100, 50, 100];
      const numMap = FrequencyUtils.createFrequencyMap(nums);

      expect(numMap.get(100)).toBe(3);
      expect(numMap.get(50)).toBe(1);
      expect(numMap.size).toBe(3); // 100, 200, 50
    });

    it("should return an empty map for empty input", () => {
      const result = FrequencyUtils.createFrequencyMap([]);
      expect(result.size).toBe(0);
    });
  });
});
