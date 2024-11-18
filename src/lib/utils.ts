import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRandomArrayElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function randomBetween(min: number, max: number) {
  const range = max - min;
  return Math.random() * range + min;
}

export function ordinate(n: number) {
  const lastDigit = n % 10;
  if (lastDigit === 1) {
    return `${n}st`;
  } else if (lastDigit === 2) {
    return `${n}nd`;
  } else if (lastDigit === 3) {
    return `${n}rd`;
  } else {
    return `${n}th`;
  }
}
