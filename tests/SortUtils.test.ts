import { describe, it, expect } from 'vitest';
import { bubbleSort, insertionSort, mergeSort, quickSort } from '../src/SortUtils.js';

describe('Less Efficient Sorting Utilities', () => {
  const unsorted = [5, 2, 9, 1, 5];
  const expected = [1, 2, 5, 5, 9];

  it('bubbleSort should sort numbers', () => {
    expect(bubbleSort(unsorted)).toEqual(expected);
  });

  it('insertionSort should sort numbers', () => {
    expect(insertionSort(unsorted)).toEqual(expected);
  });

  it('should sort objects using a custom comparator', () => {
    const items = [{ val: 10 }, { val: 5 }, { val: 8 }];
    const sorted = insertionSort(items, (a, b) => a.val - b.val);
    expect(sorted[0].val).toBe(5);
  });
});

describe('More Efficient Sorting Utilities', () => {
  const unsorted = [34, 7, 23, 32, 5, 62];
  const expected = [5, 7, 23, 32, 34, 62];

  it('mergeSort should correctly sort numbers', () => {
    expect(mergeSort(unsorted)).toEqual(expected);
  });

  it('quickSort should correctly sort numbers', () => {
    expect(quickSort(unsorted)).toEqual(expected);
  });

  it('should handle already sorted arrays', () => {
    const sorted = [1, 2, 3, 4, 5];
    expect(mergeSort(sorted)).toEqual(sorted);
    expect(quickSort(sorted)).toEqual(sorted);
  });
});