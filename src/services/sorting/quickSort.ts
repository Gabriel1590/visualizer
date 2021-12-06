function swap(arr: number[], i: number, j: number): void {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

export function* quickSortGenerator(arr: number[], startIdx: number, endIdx: number): IterableIterator<number[]> {
  if (startIdx >= endIdx) {
    return arr;
  }

  let start = startIdx;
  let end = endIdx;

  const pivotIdx = start;
  const pivot = arr[pivotIdx];

  while (start < end) {
    while (start < arr.length && arr[start] <= pivot) {
      start++;
    }

    while (arr[end] > pivot) {
      end--;
    }

    if (start < end) {
      yield [start, arr[end], end, arr[start]];
      swap(arr, start, end);
    }
  }

  yield [pivotIdx, arr[end], end, pivot];
  swap(arr, pivotIdx, end);

  yield* quickSortGenerator(arr, startIdx, end - 1);
  yield* quickSortGenerator(arr, end + 1, endIdx);

  return arr;
}
