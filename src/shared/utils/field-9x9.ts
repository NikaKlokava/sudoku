import { AbstractField } from "./abstract-field";

export class Field9x9 extends AbstractField {
  constructor() {
    super({
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
    });
  }
}
