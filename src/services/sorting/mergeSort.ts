export function* mergeSortGenerator(arr: number[], startIdx: number): IterableIterator<number[]> {
  if (arr.length < 2) return arr;
  const middle = Math.ceil(arr.length / 2);

  let firstHalf = arr.slice(0, middle);
  let secondHalf = arr.slice(middle);

  const sortedFirstHalfGenerator = mergeSortGenerator(firstHalf, startIdx);
  let sortedFirstHalf = sortedFirstHalfGenerator.next();
  while (!sortedFirstHalf.done) {
    yield sortedFirstHalf.value;
    sortedFirstHalf = sortedFirstHalfGenerator.next();
  }

  firstHalf = sortedFirstHalf.value;

  const sortedSecondHalfGenerator = mergeSortGenerator(secondHalf, middle + startIdx);
  let sortedSecondHalf = sortedSecondHalfGenerator.next();

  while (!sortedSecondHalf.done) {
    yield sortedSecondHalf.value;
    sortedSecondHalf = sortedSecondHalfGenerator.next();
  }

  secondHalf = sortedSecondHalf.value;

  const mergedArray: number[] = [];

  let firstHalfUsed = 0;
  let secondHalfUsed = 0;

  while (firstHalf.length && secondHalf.length) {
    yield [
      firstHalfUsed + startIdx,
      middle + secondHalfUsed + startIdx,
      mergedArray.length - 1 + middle + startIdx - ((Math.ceil(arr.length / 2)) - 1),
      firstHalf[0] > secondHalf[0] ? secondHalf[0] : firstHalf[0],
    ];

    if (firstHalf[0] > secondHalf[0]) {
      secondHalfUsed++;
      mergedArray.push(secondHalf.shift());
    } else {
      firstHalfUsed++;
      mergedArray.push(firstHalf.shift());
    }
  }

  while (firstHalf.length) {
    yield [
      firstHalfUsed + startIdx,
      -1,
      mergedArray.length - 1 + middle + startIdx - ((Math.ceil(arr.length / 2)) - 1),
      firstHalf[0],
    ];
    mergedArray.push(firstHalf.shift());
  }

  while (secondHalf.length) {
    yield [
      -1,
      middle + secondHalfUsed + startIdx,
      mergedArray.length - 1 + middle + startIdx - ((Math.ceil(arr.length / 2)) - 1),
      secondHalf[0],
    ];
    mergedArray.push(secondHalf.shift());
  }

  return mergedArray;
}
