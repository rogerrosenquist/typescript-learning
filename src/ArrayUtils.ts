// T: input type, U: output type
export function myMap<T, U>(array: T[], callback: (item: T) => U): U[] {
  const result: U[] = [];

  for (const item of array) {
    // Apply the logic from the callback to each item
    result.push(callback(item));
  }

  return result;
}

// T: The type of items in the array
export function myFilter<T>(array: T[], callback: (item: T) => boolean): T[] {
  const result: T[] = [];
  for (const item of array) {
    // Only push if the callback returns true
    if (callback(item)) {
      result.push(item);
    }
  }
  return result;
}

// T: Array item type, U: Accumulator/Result type
export function myReduce<T, U>(
  array: T[],
  callback: (accumulator: U, current: T) => U,
  initialValue: U
): U {
  let accumulator = initialValue;
  for (const item of array) {
    // Update the accumulator with the result of the callback
    accumulator = callback(accumulator, item);
  }
  return accumulator;
}