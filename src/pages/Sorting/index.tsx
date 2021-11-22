import { useEffect, useState } from 'react';
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

export const Sorting = (props: SortingProps): JSX.Element => {
  const [list, setList] = useState<number[]>([]);

  const resetList = (): void => {
    let numberOfBars = getScreenWidth() / 3;
    numberOfBars -= Math.floor(numberOfBars * 0.5);

    const newList = Array.from(
      { length: numberOfBars },
      () => randomIntFromInterval(5, getScreenHeight()),
    );

    setList(newList);
  };

  const mergeSort = (): void => {
    const mergeSortGenerator = sortingAlgorithms.mergeSortGenerator(list, 0);
    const interval = setInterval(() => {
      const arrayBars = document.getElementsByClassName('array-bar');

      const { value, done } = mergeSortGenerator.next();

      if (done) {
        clearInterval(interval);
        setList(value);
        return;
      }

      const [
        firstIndexToCompare,
        secondIndexToCompare,
        indexToChange,
        newValue,
      ] = value;

      if (firstIndexToCompare !== -1 && secondIndexToCompare !== -1) {
        const firstBar = arrayBars[firstIndexToCompare];
        const firstBarStyle = firstBar.style;
        firstBarStyle.backgroundColor = SECONDARY_COLOR;
        const secondBar = arrayBars[secondIndexToCompare];
        const secondBarStyle = secondBar.style;
        secondBarStyle.backgroundColor = SECONDARY_COLOR;
      }

      setTimeout(() => {
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
      }, ANIMATION_SPEED_MS);
    }, ANIMATION_SPEED_MS);
  };

  const headerButtons = [
    {
      onClick: resetList,
      text: 'Reset',
    },
    {
      onClick: mergeSort,
      text: 'Merge Sort',
    },
  ];

  useEffect(() => {
    resetList();
  }, []);

  return (
    <>
      <Header
        title="Sorting"
        buttons={headerButtons}
      />
      <List>
        {
          list.map((item, index) => (
            <Bar className="array-bar" style={{ height: item }} key={index} />
          ))
        }
      </List>
    </>
  );
};
