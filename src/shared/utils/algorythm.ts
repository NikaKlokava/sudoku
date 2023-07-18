import { Field } from "./abstract-field";
import { Difficulty, SizeOfField } from "./utils";

const field = {
  [SizeOfField.Nine]: {
    fillingOrder: [
      [0, 0],
      [1, 1],
      [2, 2],
      [0, 1],
      [0, 2],
      [1, 0],
      [1, 2],
      [2, 0],
      [2, 1],
    ],
    squaresInRow: 3,
    squaresInColumn: 3,
    rowsInSquare: 3,
    columnsInSquare: 3,
    numberToRemove: 0,
  },
  [SizeOfField.Six]: {
    fillingOrder: [
      [0, 0],
      [1, 1],
      [0, 1],
      [1, 0],
      [2, 0],
      [2, 1],
    ],
    squaresInRow: 2,
    squaresInColumn: 3,
    rowsInSquare: 2,
    numberToRemove: 0,
    columnsInSquare: 3,
  },
  [SizeOfField.Four]: {
    fillingOrder: [
      [0, 0],
      [1, 1],
      [0, 1],
      [1, 0],
    ],
    squaresInRow: 2,
    squaresInColumn: 2,
    rowsInSquare: 2,
    columnsInSquare: 2,
    numberToRemove: 0,
  },
};

const type = {
  [Difficulty.easy]: {
    [SizeOfField.Nine]: 20,
    [SizeOfField.Six]: 10,
    [SizeOfField.Four]: 4,
  },
  [Difficulty.medium]: {
    [SizeOfField.Nine]: 35,
    [SizeOfField.Six]: 15,
    [SizeOfField.Four]: 8,
  },
  [Difficulty.hard]: {
    [SizeOfField.Nine]: 50,
    [SizeOfField.Six]: 25,
    [SizeOfField.Four]: 10,
  },
  [Difficulty.impossible]: {
    [SizeOfField.Nine]: 75,
    [SizeOfField.Six]: 30,
    [SizeOfField.Four]: 12,
  },
};

export const getField = (size: FieldSize, difficulty: GameDifficulty) => {
  field[size].numberToRemove = type[difficulty][size];
  return new Field(field[size]);
};
