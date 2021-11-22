import {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { RouteComponentProps } from '@reach/router';
import { Bar, List } from './styles';
import * as sortingAlgorithms from '../../services/sorting';
import { Header } from '../../components/Header';
import {
  getScreenHeight,
  getScreenWidth,
  randomIntFromInterval,
} from '../../services/utils';

type SortingProps = RouteComponentProps

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 1;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'pink';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'green';

const TERNARY_COLOR = 'blue';

type SortCallback = (
  (
    value: number[],
    arrayBars: HTMLCollectionOf<Element>,
  ) => void
);

export const Sorting = (props: SortingProps): JSX.Element => {
  const [list, setList] = useState<number[]>([]);
  const intervalRef = useRef<NodeJS.Timer | null>(null);

  const stopSort = useCallback((): void => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);

  const resetList = useCallback((): void => {
    stopSort();
    let numberOfBars = getScreenWidth() / 3;
    numberOfBars -= Math.floor(numberOfBars * 0.5);

    const newList = Array.from(
      { length: numberOfBars },
      // { length: 10 },
      () => randomIntFromInterval(5, getScreenHeight()),
    );

    setList(newList);
  }, [stopSort]);

  const sort = (
    sortGenerator: IterableIterator<number[]>,
    compareCallback: SortCallback,
    updateCallback: SortCallback,
  ): void => {
    stopSort();

    intervalRef.current = setInterval(() => {
      const arrayBars = document.getElementsByClassName('array-bar');

      const { value, done } = sortGenerator.next();

      if (done) {
        stopSort();
        setList(value);
        return;
      }

      compareCallback(value, arrayBars);

      setTimeout(() => updateCallback(value, arrayBars), ANIMATION_SPEED_MS);
    }, ANIMATION_SPEED_MS);
  };

  const mergeSort = (): void => {
    function compare(
      value: number[],
      arrayBars: HTMLCollectionOf<Element>,
    ): void {
      const [
        firstIndexToCompare,
        secondIndexToCompare,
      ] = value;

      if (firstIndexToCompare !== -1 && secondIndexToCompare !== -1) {
        const firstBar = arrayBars[firstIndexToCompare];
        const firstBarStyle = firstBar.style;
        firstBarStyle.backgroundColor = SECONDARY_COLOR;
        const secondBar = arrayBars[secondIndexToCompare];
        const secondBarStyle = secondBar.style;
        secondBarStyle.backgroundColor = SECONDARY_COLOR;
      }
    }

    function update(
      value: number[],
      arrayBars: HTMLCollectionOf<Element>,
    ): void {
      const [
        firstIndexToCompare,
        secondIndexToCompare,
        indexToChange,
        newValue,
      ] = value;

      if (firstIndexToCompare !== -1 && secondIndexToCompare !== -1) {
        const firstBar = arrayBars[firstIndexToCompare];
        const firstBarStyle = firstBar.style;
        firstBarStyle.backgroundColor = PRIMARY_COLOR;
        const secondBar = arrayBars[secondIndexToCompare];
        const secondBarStyle = secondBar.style;
        secondBarStyle.backgroundColor = PRIMARY_COLOR;
      }

      const barToChange = arrayBars[indexToChange];
      barToChange.style!.height = `${newValue}px`;
    }

    const mergeSortGenerator = sortingAlgorithms
      .mergeSortGenerator([...list], 0);

    sort(mergeSortGenerator, compare, update);
  };

  const quickSort = (): void => {
    function compare(
      value: number[],
      arrayBars: HTMLCollectionOf<Element>,
    ): void {
      const [
        firstIndex,
        _,
        secondIndex,
      ] = value;

      const firstBar = arrayBars[firstIndex];
      const firstBarStyle = firstBar.style;
      firstBarStyle.backgroundColor = SECONDARY_COLOR;

      const secondBar = arrayBars[secondIndex];
      const secondBarStyle = secondBar.style;
      secondBarStyle.backgroundColor = SECONDARY_COLOR;
    }

    function update(
      value: number[],
      arrayBars: HTMLCollectionOf<Element>,
    ): void {
      const [
        firstIndex,
        firstIndexNewValue,
        secondIndex,
        secondIndexNewValue,
      ] = value;

      const firstBar = arrayBars[firstIndex];
      const firstBarStyle = firstBar.style;
      firstBarStyle.backgroundColor = PRIMARY_COLOR;
      firstBarStyle.height = `${firstIndexNewValue}px`;

      const secondBar = arrayBars[secondIndex];
      const secondBarStyle = secondBar.style;
      secondBarStyle.backgroundColor = PRIMARY_COLOR;
      secondBarStyle.height = `${secondIndexNewValue}px`;
    }

    const quickSortGenerator = sortingAlgorithms
      .quickSortGenerator([...list], 0, list.length - 1);

    sort(quickSortGenerator, compare, update);
  };

  useEffect(() => {
    resetList();
  }, [resetList]);

  const headerButtons = [
    {
      onClick: resetList,
      text: 'Reset',
    },
    {
      onClick: stopSort,
      text: 'Stop',
    },
    {
      onClick: mergeSort,
      text: 'Merge Sort',
    },
    {
      onClick: quickSort,
      text: 'Quick Sort',
    },
  ];

  return (
    <>
      <Header
        title="Sorting"
        buttons={headerButtons}
      />
      <List>
        {
          list.map((item, index) => (
            <Bar
              className="array-bar"
              style={{ height: item }}
              key={`${index}-Sorting-Bar`}
            />
          ))
        }
      </List>
    </>
  );
};
