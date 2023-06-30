export enum SizeOfField {
    Nine = "9x9",
    Six = "6x6",
    Four = "4x4",
  }

export const shuffleNumbersArray = (array: number[]) => {
  array.sort(() => Math.random() - 0.5);
};

export const generateNumbersArray = (numOfNumbersInSquare: number) => {
  return Array.from(Array(numOfNumbersInSquare)).map((_, i) => i + 1);
};
