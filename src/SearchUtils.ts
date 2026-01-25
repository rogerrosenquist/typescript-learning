/**
 * Binary Search: Finds the index of a target in a sorted array.
 * Returns -1 if not found.
 */
export function binarySearch<T>(array: T[], target: T): number {
  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    // Find the middle point
    const mid = left + Math.floor((right - left) / 2); // To prevent potential overflow
    const midValue = array[mid];

    if (midValue === undefined || midValue === null) {
      return -1; // Handle edge case
    }

    if (midValue === target) {
      return mid; // Found it!
    }

    if (target < midValue) {
      right = mid - 1; // Target is in the left half
    } else {
      left = mid + 1; // Target is in the right half
    }
  }

  return -1; // Target doesn't exist in the array
}

export function recursiveBinarySearch<T>(array: T[], target: T, left = 0, right = array.length - 1): number {
  if (left > right) {
    return -1;
  }

  const mid = left + Math.floor((right - left) / 2);
  const midValue = array[mid];

  if (midValue === undefined || midValue === null) {
    return -1; // Handle edge case
  } 

  if (midValue === target) {
    return mid;
  }

  if (target < midValue) {
    return recursiveBinarySearch(array, target, left, mid - 1); // Serach in left half
  }

  return recursiveBinarySearch(array, target, mid + 1, right); // Otherwise, search in right half
}