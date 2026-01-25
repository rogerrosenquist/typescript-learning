import { describe, it, expect } from "vitest";
import { WindowUtils } from "../src/WindowUtils";

describe("WindowUtils Patterns", () => {
  describe("Sliding Window (maxSubarraySum)", () => {
    it("should return max sum of n consecutive elements", () => {
      // [1, 2, 5, 2, 8] -> 5+2+8 = 15
      expect(WindowUtils.maxSubarraySum([1, 2, 5, 2, 8, 1, 5], 2)).toBe(10); // 2, 8
      expect(WindowUtils.maxSubarraySum([1, 2, 5, 2, 8, 1, 5], 4)).toBe(17); // 2, 5, 2, 8
      expect(WindowUtils.maxSubarraySum([4, 2, 1, 6], 1)).toBe(6);
    });

    it("should return null if array length is less than num", () => {
      expect(WindowUtils.maxSubarraySum([1, 2, 3], 4)).toBeNull();
    });

    it("should handle negative numbers", () => {
      // Max sum of window 2 is -1 + 2 = 1? No, wait:
      // -3, 4 -> 1
      // 4, 0 -> 4
      // 0, -2 -> -2
      // 4, 0 is max
      expect(WindowUtils.maxSubarraySum([-3, 4, 0, -2, 6, -1], 2)).toBe(5); // -2 + 6 = 4? No. 6-1=5.
    });
  });

  describe("Two Pointers (sumZero)", () => {
    it("should find the first pair summing to zero", () => {
      expect(WindowUtils.sumZero([-3, -2, -1, 0, 1, 2, 3])).toEqual([-3, 3]);
    });

    it("should work with asymmetry", () => {
      expect(WindowUtils.sumZero([-2, 0, 1, 3])).toBeUndefined();
      expect(WindowUtils.sumZero([1, 2, 3])).toBeUndefined();
    });

    it('should return the "first" pair (widest usually)', () => {
      // Logic starts from edges, so it finds the widest pair first
      expect(WindowUtils.sumZero([-4, -3, -2, 1, 2, 3, 5])).toEqual([-3, 3]);
    });
  });
});
