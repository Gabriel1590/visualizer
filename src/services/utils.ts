import { HEADER_HEIGHT } from './constants';

export function randomIntFromInterval(min: number, max: number): number {
  const random = Math.floor(Math.random() * (max - min + 1) + min);
  return random;
}

export const getScreenHeight = (): number => (
  Math.floor(window.innerHeight) - HEADER_HEIGHT
);

export const getScreenWidth = (): number => (
  Math.floor(window.innerWidth)
);
