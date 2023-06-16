/**
 * [
 *    // first row
 *    [
 *      [
 *          [0,0,0],
 *          [0,0,0],
 *          [0,0,0]
 *      ],
 *      [
 *          [0,0,0],
 *          [0,0,0],
 *          [0,0,0]
 *      ],
 *      [
 *          [0,0,0],
 *          [0,0,0],
 *          [0,0,0]
 *      ],
 *    ],
 *    // second row
 *    [...],
 *    // third row
 *    [...]
 * ]
 */
export const generateEmptyField = () => {
  const empty: FieldType = [];
  Array.from(Array(3)).forEach((_, i) => {
    const squareRow: SquareRowType = [];
    Array.from(Array(3)).forEach((_, j) => {
      const square: SquareType = [];
      Array.from(Array(3)).forEach((_, k) => {
        square.push([0, 0, 0]);
      });

      squareRow.push(square);
    });
    empty.push(squareRow);
  });

  return empty;
};

// const printField = (field: FieldType) => {
//   let message = "\n";
//   for (let i = 0; i < field.length; i++) {
//     const squareRow = field[i];
//     // eslint-disable-next-line no-loop-func
//     Array.from(Array(3)).forEach((_, k) => {
//       Array.from(Array(3)).forEach((_, t) => {
//         message += ` ${squareRow[t][k]} `;
//       });
//       message += "\n";
//     });
//     message += "\n";
//   }
//   return message;
//   //   console.log(message);
// };
const generateNumbersArray = () => {
  return Array.from(Array(9)).map((_, i) => i + 1);
};

const shuffleNumbersArray = (array: number[]) => {
  array.sort(() => Math.random() - 0.5);
};

const squares = [
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

const generateCompletedField = () => {
  const data: FieldType = generateEmptyField();

  const getNumbersInRow = (rowIndex: number) => {
    const squareRow = Math.floor(rowIndex / 3);

    return data[squareRow].reduce(
      (accumulator, currentValue) => [
        ...accumulator,
        ...currentValue[rowIndex - 3 * squareRow],
      ],
      new Array<number>()
    );
  };

  const getNumbersInColumn = (columnIndex: number) => {
    const squareColumn = Math.floor(columnIndex / 3);

    return data.reduce((accumulator, currentValue) => {
      const newValue = currentValue[squareColumn].reduce((acc, current) => {
        return [...acc, current[columnIndex - 3 * squareColumn]];
      }, []);
      return [...accumulator, ...newValue];
    }, new Array<number>());
  };

  for (let sqIndex = 0; sqIndex < squares.length; sqIndex += 1) {
    const [gRow, gColumn] = squares[sqIndex];

    let numbers = generateNumbersArray();
    shuffleNumbersArray(numbers);

    const clear = () => {
      Array.from(Array(3)).forEach((_, row) => {
        Array.from(Array(3)).forEach((_, column) => {
          data[gRow][gColumn][row][column] = 0;
        });
      });
    };

    const tryToFill = () => {
      Array.from(Array(3)).forEach((_, row) => {
        Array.from(Array(3)).forEach((_, column) => {
          const rowColumnValue = [
            ...getNumbersInColumn(column + 3 * gColumn),
            ...getNumbersInRow(row + 3 * gRow),
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
        numbers = generateNumbersArray();
        shuffleNumbersArray(numbers);
      }
      if (attempt === maxNumberOfAttempt - 1) {
        //   console.warn("Start again");
        sqIndex = 0;
      }
    }
  }

  return data;
};

const removeRandomFieldNumbers = (data: FieldType, count: number) => {
  while (count !== 0) {
    const [gRow, gColumn, row, column] = Array.from(Array(9)).map(() =>
      Math.floor(Math.random() * 3)
    );
    if (data[gRow][gColumn][row][column] !== 0) {
      count--;
      data[gRow][gColumn][row][column] = 0;
    }
  }

  return;
};

/**
 *  [
 *    // 1-st
 *    [
 *      {
 *        num, row, column
 *      }
 *    ],
 *    [...], // 2-nd
 *    ...
 *    [...] // 9-th
 *  ]
 */
const formatData = (data: FieldType): FieldData => {
  const newArray = data.reduce(
    (accumulator: any, currentValue: any, gRowIndex: number) => {
      const newValue = currentValue.reduce(
        (accum: SquareCells, current: SquareType, gColumnIndex: number) => {
          const value = current.reduce(
            (acc: SquareCells, curr: number[], row: number) => {
              const obj = curr.map((elem: number, columnIndex: number) => {
                return {
                  num: elem,
                  row: row + 3 * gRowIndex,
                  column: columnIndex + 3 * gColumnIndex,
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
};

const createPlayfieldData = (): FieldData => {
  const data = generateCompletedField();
  removeRandomFieldNumbers(data, 44);
  return formatData(data);
};
export const playfieldData = () => createPlayfieldData();
