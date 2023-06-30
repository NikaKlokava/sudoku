import {
  generateNumbersArray,
  shuffleNumbersArray,
  SizeOfField,
} from "./utils";

type Props = {
  squares: Array<Array<number>>;

  squaresInRow: any;
  squaresInColumn: any;

  rowsInSquare: any;
  columnsInSquare: any;

  numberToRemove: any;
};

abstract class Base {
  props: Props;
  data: FieldType;

  constructor(props: Props) {
    this.props = props;
    this.data = this.generateEmptyField();
  }

  private generateEmptyField(): FieldType {
    const empty: FieldType = [];
    Array.from(Array(this.props.squaresInColumn)).forEach((_, i) => {
      const squareRow: SquareRowType = [];
      Array.from(Array(this.props.squaresInRow)).forEach((_, j) => {
        const square: SquareType = [];
        Array.from(Array(this.props.rowsInSquare)).forEach((_, k) => {
          square.push(
            Array.from({ length: this.props.columnsInSquare }, () => 0)
          );
        });

        squareRow.push(square);
      });
      empty.push(squareRow);
    });

    return empty;
  }

  private getNumbersInRow = (rowIndex: number) => {
    const squareRow = Math.floor(rowIndex / this.props.squaresInRow);

    return this.data[squareRow].reduce(
      (accumulator, currentValue) => [
        ...accumulator,
        ...currentValue[rowIndex - this.props.squaresInRow * squareRow],
      ],
      new Array<number>()
    );
  };

  private getNumbersInColumn = (columnIndex: number) => {
    const squareColumn = Math.floor(columnIndex / this.props.squaresInColumn);

    return this.data.reduce((accumulator, currentValue) => {
      const newValue = currentValue[squareColumn].reduce((acc, current) => {
        return [
          ...acc,
          current[columnIndex - this.props.squaresInColumn * squareColumn],
        ];
      }, []);
      return [...accumulator, ...newValue];
    }, new Array<number>());
  };

  private tryToFill = (numbers: number[], gRow: number, gColumn: number) => {
    Array.from(Array(this.props.squaresInRow)).forEach((_, row) => {
      Array.from(Array(this.props.squaresInColumn)).forEach((_, column) => {
        const rowColumnValue = [
          ...this.getNumbersInColumn(
            column + this.props.squaresInColumn * gColumn
          ),
          ...this.getNumbersInRow(row + this.props.squaresInRow * gRow),
        ];
        const validValueIndex = numbers.findIndex(
          (num) => !rowColumnValue.includes(num)
        );

        if (validValueIndex === -1) {
          throw new Error(
            `Can't find valid value for [gRow=${gRow}][gColumn=${gColumn}] [column=${column}][row=${row}].`
          );
        }

        this.data[gRow][gColumn][row][column] = numbers[validValueIndex];
        numbers.splice(validValueIndex, 1);
      });
    });
  };

  private clear = (gRow: number, gColumn: number) => {
    Array.from(Array(this.props.squaresInRow)).forEach((_, row) => {
      Array.from(Array(this.props.squaresInColumn)).forEach((_, column) => {
        this.data[gRow][gColumn][row][column] = 0;
      });
    });
  };

  public generateCompletedField(): FieldType {
    for (let sqIndex = 0; sqIndex < this.props.squares.length; sqIndex += 1) {
      const [gRow, gColumn] = this.props.squares[sqIndex];

      let numbers = generateNumbersArray(
        this.props.rowsInSquare * this.props.columnsInSquare
      );
      shuffleNumbersArray(numbers);

      const maxNumberOfAttempt = 10 * sqIndex + 1;
      for (let attempt = 0; attempt < maxNumberOfAttempt; attempt += 1) {
        try {
          this.tryToFill(numbers, gRow, gColumn);
          break;
        } catch (err) {
          this.clear(gRow, gColumn);
          numbers = generateNumbersArray(
            this.props.rowsInSquare * this.props.columnsInSquare
          );
          shuffleNumbersArray(numbers);
        }
        if (attempt === maxNumberOfAttempt - 1) {
          //   console.warn("Start again");
          sqIndex = 0;
        }
      }
    }
    return this.data;
  }

  public removeRandomFieldNumbers(data: FieldType): void {
    while (this.props.numberToRemove !== 0) {
      const [gRow, column] = Array.from(Array(6)).map(() =>
        Math.floor(Math.random() * this.props.squaresInColumn)
      );
      const [gColumn, row] = Array.from(Array(6)).map(() =>
        Math.floor(Math.random() * this.props.squaresInRow)
      );

      if (data[gRow][gColumn][row][column] !== 0) {
        this.props.numberToRemove--;
        data[gRow][gColumn][row][column] = 0;
      }
    }

    return;
  }

  public formatData(data: FieldType): FieldData {
    const newArray = data.reduce(
      (accumulator: any, currentValue: any, gRowIndex: number) => {
        const newValue = currentValue.reduce(
          (accum: SquareCells, current: SquareType, gColumnIndex: number) => {
            const value = current.reduce(
              (acc: SquareCells, curr: number[], row: number) => {
                const obj = curr.map((elem: number, columnIndex: number) => {
                  return {
                    num: elem,
                    row: row + this.props.squaresInRow * gRowIndex,
                    column:
                      columnIndex + this.props.squaresInColumn * gColumnIndex,
                  };
                });
                return [...acc, ...obj];
              },
              []
            );
            return [...accum, value];
          },
          []
        );
        return [...accumulator, ...newValue];
      },
      []
    );
    return newArray;
  }
}

class Field9x9 extends Base {
  constructor() {
    super({
      squares: [
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

class Field4x4 extends Base {
  constructor() {
    super({
      squares: [
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
    });
  }
}

class Field6x6 extends Base {
  constructor() {
    super({
      squares: [
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

export class FieldGenerator {
  size: FieldSize;
  constructor(size: FieldSize) {
    this.size = size;
  }
  getField() {
    if (this.size === SizeOfField.Nine) {
      return new Field9x9();
    } else if (this.size === SizeOfField.Six) {
      return new Field6x6();
    } else return new Field4x4();
  }
}
