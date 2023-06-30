enum SizeOfField {
  Nine = "9x9",
  Six = "6x6",
  Four = "4x4",
}

abstract class Base {

  private shuffleNumbersArray(array: number[]) {
    array.sort(() => Math.random() - 0.5);
  }

  generateEmptyField(
    numOfGlobalRows: number,
    numOfSquaresInRow: number,
    numOfRowsInSquare: number,
    numOfNumbersInSquareRow: number
  ): FieldType {
    const empty: FieldType = [];
    Array.from(Array(numOfGlobalRows)).forEach((_, i) => {
      const squareRow: SquareRowType = [];
      Array.from(Array(numOfSquaresInRow)).forEach((_, j) => {
        const square: SquareType = [];
        Array.from(Array(numOfRowsInSquare)).forEach((_, k) => {
          square.push(Array.from({ length: numOfNumbersInSquareRow }, () => 0));
        });

        squareRow.push(square);
      });
      empty.push(squareRow);
    });

    return empty;
  }

  generateNumbersArray(numOfNumbersInSquare: number): number[] {
    return Array.from(Array(numOfNumbersInSquare)).map((_, i) => i + 1);
  }

  generateCompletedField(
    arrayOfSquares: Array<Array<number>>,
    numOfNumbersInSquare: number,
    numOfSquaresInRow: number,
    numOfSquaresInColumn: number,
    numOfGlobalRows: number,
    numOfRowsInSquare: number,
    numOfNumbersInSquareRow: number
  ): FieldType {
    const data: FieldType = this.generateEmptyField(
      numOfGlobalRows,
      numOfSquaresInRow,
      numOfRowsInSquare,
      numOfNumbersInSquareRow
    );

    const getNumbersInRow = (rowIndex: number) => {
      const squareRow = Math.floor(rowIndex / numOfSquaresInRow);

      return data[squareRow].reduce(
        (accumulator, currentValue) => [
          ...accumulator,
          ...currentValue[rowIndex - numOfSquaresInRow * squareRow],
        ],
        new Array<number>()
      );
    };

    const getNumbersInColumn = (columnIndex: number) => {
      const squareColumn = Math.floor(columnIndex / numOfSquaresInColumn);

      return data.reduce((accumulator, currentValue) => {
        const newValue = currentValue[squareColumn].reduce((acc, current) => {
          return [
            ...acc,
            current[columnIndex - numOfSquaresInColumn * squareColumn],
          ];
        }, []);
        return [...accumulator, ...newValue];
      }, new Array<number>());
    };

    for (let sqIndex = 0; sqIndex < arrayOfSquares.length; sqIndex += 1) {
      const [gRow, gColumn] = arrayOfSquares[sqIndex];

      let numbers = this.generateNumbersArray(numOfNumbersInSquare);
      this.shuffleNumbersArray(numbers);

      const clear = () => {
        Array.from(Array(numOfSquaresInRow)).forEach((_, row) => {
          Array.from(Array(numOfSquaresInColumn)).forEach((_, column) => {
            data[gRow][gColumn][row][column] = 0;
          });
        });
      };

      const tryToFill = () => {
        Array.from(Array(numOfSquaresInRow)).forEach((_, row) => {
          Array.from(Array(numOfSquaresInColumn)).forEach((_, column) => {
            const rowColumnValue = [
              ...getNumbersInColumn(column + numOfSquaresInColumn * gColumn),
              ...getNumbersInRow(row + numOfSquaresInRow * gRow),
            ];
            const validValueIndex = numbers.findIndex(
              (num) => !rowColumnValue.includes(num)
            );

            if (validValueIndex === -1) {
              throw new Error(
                `Can't find valid value for [gRow=${gRow}][gColumn=${gColumn}] [column=${column}][row=${row}].`
              );
            }

            data[gRow][gColumn][row][column] = numbers[validValueIndex];
            numbers.splice(validValueIndex, 1);
          });
        });
      };

      const maxNumberOfAttempt = 10 * sqIndex + 1;
      for (let attempt = 0; attempt < maxNumberOfAttempt; attempt += 1) {
        try {
          tryToFill();
          break;
        } catch (err) {
          clear();
          numbers = this.generateNumbersArray(numOfNumbersInSquare);
          this.shuffleNumbersArray(numbers);
        }
        if (attempt === maxNumberOfAttempt - 1) {
          //   console.warn("Start again");
          sqIndex = 0;
        }
      }
    }
    return data;
  }

  removeRandomFieldNumbers(
    data: FieldType,
    count: number,
    numOfSquaresInColumn: number,
    numOfSquaresInRow: number
  ): void {
    while (count !== 0) {
      const [gRow, column] = Array.from(Array(6)).map(() =>
        Math.floor(Math.random() * numOfSquaresInColumn)
      );
      const [gColumn, row] = Array.from(Array(6)).map(() =>
        Math.floor(Math.random() * numOfSquaresInRow)
      );

      if (data[gRow][gColumn][row][column] !== 0) {
        count--;
        data[gRow][gColumn][row][column] = 0;
      }
    }

    return;
    // while (count !== 0) {
    //   const [gRow, gColumn, row, column] = Array.from(Array(9)).map(() =>
    //     Math.floor(Math.random() * 3)
    //   );
    //   if (data[gRow][gColumn][row][column] !== 0) {
    //     count--;
    //     data[gRow][gColumn][row][column] = 0;
    //   }
    // }

    // return;
  }

  formatData(
    data: FieldType,
    numOfSquaresInRow: number,
    numOfSquaresInColumn: number
  ): FieldData {
    const newArray = data.reduce(
      (accumulator: any, currentValue: any, gRowIndex: number) => {
        const newValue = currentValue.reduce(
          (accum: SquareCells, current: SquareType, gColumnIndex: number) => {
            const value = current.reduce(
              (acc: SquareCells, curr: number[], row: number) => {
                const obj = curr.map((elem: number, columnIndex: number) => {
                  return {
                    num: elem,
                    row: row + numOfSquaresInRow * gRowIndex,
                    column: columnIndex + numOfSquaresInColumn * gColumnIndex,
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
  squares: Array<Array<number>> = [
    [0, 0],
    [1, 1],
    [2, 2],
    [0, 1],
    [0, 2],
    [1, 0],
    [1, 2],
    [2, 0],
    [2, 1],
  ];
  numOfNumbersInSquare: number = 9;
  numOfSquaresInRow: number = 3;
  numOfSquaresInColumn: number = 3;
  numOfGlobalRows: number = 3;
  numOfRowsInSquare: number = 3;
  numOfNumbersInSquareRow: number = 3;
  numOfRemovedNumbers: number = 44;

  generateCompletedField() {
    return super.generateCompletedField(
      this.squares,
      this.numOfNumbersInSquare,
      this.numOfSquaresInRow,
      this.numOfSquaresInColumn,
      this.numOfGlobalRows,
      this.numOfRowsInSquare,
      this.numOfNumbersInSquareRow
    );
  }

  removeRandomFieldNumbers(data: FieldType) {
    super.removeRandomFieldNumbers(
      data,
      this.numOfRemovedNumbers,
      this.numOfSquaresInColumn,
      this.numOfSquaresInRow
    );
  }

  formatData(data: FieldType): FieldData {
    return super.formatData(
      data,
      this.numOfSquaresInRow,
      this.numOfSquaresInColumn
    );
  }
}

class Field4x4 extends Base {
  squares: Array<Array<number>> = [
    [0, 0],
    [1, 1],
    [0, 1],
    [1, 0],
  ];

  numOfNumbersInSquare: number = 4;
  numOfSquaresInRow: number = 2;
  numOfSquaresInColumn: number = 2;
  numOfGlobalRows: number = 2;
  numOfRowsInSquare: number = 2;
  numOfNumbersInSquareRow: number = 2;
  numOfRemovedNumbers: number = 7;

  generateCompletedField() {
    return super.generateCompletedField(
      this.squares,
      this.numOfNumbersInSquare,
      this.numOfSquaresInRow,
      this.numOfSquaresInColumn,
      this.numOfGlobalRows,
      this.numOfRowsInSquare,
      this.numOfNumbersInSquareRow
    );
  }

  removeRandomFieldNumbers(data: FieldType) {
    super.removeRandomFieldNumbers(
      data,
      this.numOfRemovedNumbers,
      this.numOfSquaresInColumn,
      this.numOfSquaresInRow
    );
  }

  formatData(data: FieldType): FieldData {
    return super.formatData(
      data,
      this.numOfSquaresInRow,
      this.numOfSquaresInColumn
    );
  }
}

class Field6x6 extends Base {
  squares: Array<Array<number>> = [
    [0, 0],
    [1, 1],
    [0, 1],
    [1, 0],
    [2, 0],
    [2, 1],
  ];

  numOfNumbersInSquare: number = 6;
  numOfSquaresInRow: number = 2;
  numOfSquaresInColumn: number = 3;
  numOfGlobalRows: number = 3;
  numOfRowsInSquare: number = 2;
  numOfNumbersInSquareRow: number = 3;
  numOfRemovedNumbers: number = 14;

  generateCompletedField() {
    return super.generateCompletedField(
      this.squares,
      this.numOfNumbersInSquare,
      this.numOfSquaresInRow,
      this.numOfSquaresInColumn,
      this.numOfGlobalRows,
      this.numOfRowsInSquare,
      this.numOfNumbersInSquareRow
    );
  }

  removeRandomFieldNumbers(data: FieldType) {
    super.removeRandomFieldNumbers(
      data,
      this.numOfRemovedNumbers,
      this.numOfSquaresInColumn,
      this.numOfSquaresInRow
    );
  }

  formatData(data: FieldType): FieldData {
    return super.formatData(
      data,
      this.numOfSquaresInRow,
      this.numOfSquaresInColumn
    );
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
