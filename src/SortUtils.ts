export type Comparator<T> = (a: T, b: T) => number;

const defaultCompare = (a: any, b: any) => (a < b ? -1 : a > b ? 1 : 0);

// Bubble Sort: O(n^2) - Good for learning, bad for big data
export function bubbleSort<T>(array: T[], compare: Comparator<T> = defaultCompare): T[] {
    const arr = [...array]; // Don't mutate the original array
    const n = arr.length;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (compare(arr[j]!, arr[j + 1]!) > 0) {
                // Swap items
                [arr[j], arr[j + 1]] = [arr[j + 1]!, arr[j]!];
            }
        }
    }
    return arr;
}

// Insertion Sort: O(n^2) - Very fast for small or almost-sorted arrays
export function insertionSort<T>(array: T[], compare: Comparator<T> = defaultCompare): T[] {
    const arr = [...array];
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i]!;
        let j = i - 1;

        while (j >= 0 && compare(arr[j]!, key) > 0) {
            arr[j + 1] = arr[j]!;
            j = j - 1;
        }
        arr[j + 1] = key;
    }
    return arr;
}

// Merge Sort: O(n log n) - Stable and predictable performance
export function mergeSort<T>(array: T[], compare: Comparator<T> = defaultCompare): T[] {
  if (array.length <= 1) return array;

  const mid = Math.floor(array.length / 2);
  const left = mergeSort(array.slice(0, mid), compare);
  const right = mergeSort(array.slice(mid), compare);

  return merge(left, right, compare);
}

function merge<T>(left: T[], right: T[], compare: Comparator<T>): T[] {
  const result: T[] = [];
  let lIndex = 0;
  let rIndex = 0;

  while (lIndex < left.length && rIndex < right.length) {
    if (compare(left[lIndex]!, right[rIndex]!) <= 0) {
      result.push(left[lIndex]!);
      lIndex++;
    } else {
      result.push(right[rIndex]!);
      rIndex++;
    }
  }

  return [...result, ...left.slice(lIndex), ...right.slice(rIndex)];
}

// Quick Sort: O(n log n) average - Very fast "in-place" style logic
export function quickSort<T>(array: T[], compare: Comparator<T> = defaultCompare): T[] {
  if (array.length <= 1) return array;

  const arr = [...array];
  const pivot = arr[arr.length - 1]!;
  const left: T[] = [];
  const right: T[] = [];

  for (let i = 0; i < arr.length - 1; i++) {
    if (compare(arr[i]!, pivot) < 0) {
      left.push(arr[i]!);
    } else {
      right.push(arr[i]!);
    }
  }

  return [...quickSort(left, compare), pivot, ...quickSort(right, compare)];
}