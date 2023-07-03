import { AbstractField } from "./abstract-field";

export class Field6x6 extends AbstractField {
  constructor() {
    super({
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
      columnsInSquare: 3,
      numberToRemove: 14,
    });
  }
}
