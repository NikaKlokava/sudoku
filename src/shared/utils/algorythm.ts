import { Field } from "./abstract-field";
import { SizeOfField } from "./utils";

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
    numberToRemove: 44,
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
    numberToRemove: 14,
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
    numberToRemove: 7,
  },
};

export const getField = (size: FieldSize) => {
  return new Field(field[size]);
};
