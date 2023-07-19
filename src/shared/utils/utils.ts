export enum SizeOfField {
  Nine = "9x9",
  Six = "6x6",
  Four = "4x4",
}

export enum Difficulty {
  easy = "easy",
  medium = "medium",
  hard = "hard",
  impossible = "impossible"
}

export const shuffleNumbersArray = (array: number[]) => {
  array.sort(() => Math.random() - 0.5);
};

export const genNthArray = (size: number) => {
  return Array.from(Array(size));
};

export const generateNumbersArray = (numOfNumbersInSquare: number) => {
  return genNthArray(numOfNumbersInSquare).map((_, i) => i + 1);
};
