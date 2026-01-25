export class WindowUtils {
  /**
   * PATTERN 1: SLIDING WINDOW
   * Calculates the maximum sum of n consecutive elements in an array.
   */
  static maxSubarraySum(arr: number[], num: number): number | null {
    // SAFETY CHECK: Ensure array exists
    if (!arr) return null;

    // Edge case: If array is smaller than the window size, impossible.
    if (arr.length < num) return null;

    let maxSum = 0;
    let tempSum = 0;

    // 1. Create the first "window" (sum of first 'num' elements)
    for (let i = 0; i < num; i++) {
      maxSum += arr[i]!;
    }

    tempSum = maxSum;

    // 2. Slide the window
    for (let i = num; i < arr.length; i++) {
      tempSum = tempSum - arr[i - num]! + arr[i]!;
      maxSum = Math.max(maxSum, tempSum);
    }

    return maxSum;
  }

  /**
   * PATTERN 2: TWO POINTERS
   * Finds the first pair of numbers in a SORTED array that sum to 0.
   */
  static sumZero(arr: number[]): number[] | undefined {
    // SAFETY CHECK: Ensure array exists and has at least 2 items
    if (!arr || arr.length < 2) return undefined;

    let left = 0;
    let right = arr.length - 1;

    while (left < right) {
      const sum = arr[left]! + arr[right]!;

      if (sum === 0) {
        return [arr[left]!, arr[right]!];
      } else if (sum > 0) {
        right--;
      } else {
        left++;
      }
    }

    return undefined;
  }
}
