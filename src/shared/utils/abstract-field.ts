import {
  generateNumbersArray,
  genNthArray,
  shuffleNumbersArray,
} from "./utils";

type Props = {
  fillingOrder: number[][];
  squaresInRow: number;
  squaresInColumn: number;
  rowsInSquare: number;
  columnsInSquare: number;
  numberToRemove: number;
};

export class Field {
  props: Props;
  data: FieldType;

  constructor(props: Props) {
    this.props = props;
    this.data = this.generateEmptyField();
  }

  private generateEmptyField(): FieldType {
    const empty: FieldType = [];
    genNthArray(this.props.squaresInColumn).forEach(() => {
      const squareRow: SquareRowType = [];
      genNthArray(this.props.squaresInRow).forEach(() => {
        const square: SquareType = [];
        genNthArray(this.props.rowsInSquare).forEach(() => {
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
    genNthArray(this.props.squaresInRow).forEach((_, row) => {
      genNthArray(this.props.squaresInColumn).forEach((_, column) => {
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
    genNthArray(this.props.squaresInRow).forEach((_, row) => {
      genNthArray(this.props.squaresInColumn).forEach((_, column) => {
        this.data[gRow][gColumn][row][column] = 0;
      });
    });
  };

  private generateCompletedField(): FieldType {
    for (
      let sqIndex = 0;
      sqIndex < this.props.fillingOrder.length;
      sqIndex += 1
    ) {
      const [gRow, gColumn] = this.props.fillingOrder[sqIndex];

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

  private removeRandomFieldNumbers(): void {
    let removeNums = this.props.numberToRemove;
    while (removeNums !== 0) {
      const [gRow, column] = Array.from(Array(6)).map(() =>
        Math.floor(Math.random() * this.props.squaresInColumn)
      );
      const [gColumn, row] = Array.from(Array(6)).map(() =>
        Math.floor(Math.random() * this.props.squaresInRow)
      );

      if (this.data[gRow][gColumn][row][column] !== 0) {
        removeNums--;
        this.data[gRow][gColumn][row][column] = 0;
      }
    }

    return;
  }

  private formatData(): FieldData {
    const newArray = this.data.reduce(
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

  public generatePlayfieldData() {
    this.generateCompletedField();
    this.removeRandomFieldNumbers();

    return this.formatData();
  }
}
