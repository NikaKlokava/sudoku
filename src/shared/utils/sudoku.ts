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
export const generateEmptyField = (four: boolean, nine: boolean) => {
  const empty: FieldType = [];
  Array.from(Array(four ? 2 : 3)).forEach((_, i) => {
    // 2 for 4x4 ............... 3 for 6x6
    const squareRow: SquareRowType = [];
    Array.from(Array(nine ? 3 : 2)).forEach((_, j) => {
      // 2 for 4x4 ............... 2 for 6x6
      const square: SquareType = [];
      Array.from(Array(nine ? 3 : 2)).forEach((_, k) => {
        // 2 for 4x4 ............... 2 for 6x6
        square.push(four ? [0, 0] : [0, 0, 0]); // [0, 0] for 4x4  ...............  [0, 0, 0] for 6x6
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
const generateNumbersArray = (four: boolean, six: boolean) => {
  return Array.from(Array(four ? 4 : six ? 6 : 9)).map((_, i) => i + 1); // 4 for 4x4  ............... 6 for 6x6
};

const shuffleNumbersArray = (array: number[]) => {
  array.sort(() => Math.random() - 0.5);
};

const squares9 = [
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
const squares4 = [
  [0, 0],
  [1, 1],
  [0, 1],
  [1, 0],
];

const squares6 = [
  [0, 0],
  [1, 1],
  [0, 1],
  [1, 0],
  [2, 0],
  [2, 1],
];

export const generateCompletedField = (typeOfGame: string) => {
  const four = typeOfGame === "4x4";
  const six = typeOfGame === "6x6";
  const nine = typeOfGame === "9x9";

  const data: FieldType = generateEmptyField(four, nine);

  const getNumbersInRow = (rowIndex: number) => {
    const squareRow = Math.floor(rowIndex / (nine ? 3 : 2)); // 2 . for 4x4 ............... 2 for 6x6

    return data[squareRow].reduce(
      (accumulator, currentValue) => [
        ...accumulator,
        ...currentValue[rowIndex - (nine ? 3 : 2) * squareRow], // 2 . for 4x4 ............... 2 for 6x6
      ],
      new Array<number>()
    );
  };

  const getNumbersInColumn = (columnIndex: number) => {
    const squareColumn = Math.floor(columnIndex / (four ? 2 : 3)); // 2 . for 4x4 ............... 3 for 6x6

    return data.reduce((accumulator, currentValue) => {
      const newValue = currentValue[squareColumn].reduce((acc, current) => {
        return [...acc, current[columnIndex - (four ? 2 : 3) * squareColumn]]; // 2  for 4x4 ............... 3 for 6x6
      }, []);
      return [...accumulator, ...newValue];
    }, new Array<number>());
  };

  for (
    let sqIndex = 0;
    sqIndex <
    (nine ? squares9.length : six ? squares6.length : squares4.length);
    sqIndex += 1
  ) {
    const [gRow, gColumn] = nine
      ? squares9[sqIndex]
      : six
      ? squares6[sqIndex]
      : squares4[sqIndex];

    let numbers = generateNumbersArray(four, six);
    shuffleNumbersArray(numbers);

    const clear = () => {
      Array.from(Array(nine ? 3 : 2)).forEach((_, row) => {
        // 2 . for 4x4 ............... 2 for 6x6
        Array.from(Array(four ? 2 : 3)).forEach((_, column) => {
          // 2 .  for 4x4 ............... 3 for 6x6
          data[gRow][gColumn][row][column] = 0;
        });
      });
    };

    const tryToFill = () => {
      Array.from(Array(nine ? 3 : 2)).forEach((_, row) => {
        // 2 . for 4x4 ............... 2 for 6x6
        Array.from(Array(four ? 2 : 3)).forEach((_, column) => {
          // 2 .  for 4x4 ............... 3 for 6x6
          const rowColumnValue = [
            ...getNumbersInColumn(column + (four ? 2 : 3) * gColumn), // 2 .  for 4x4 ............... 3 for 6x6
            ...getNumbersInRow(row + (nine ? 3 : 2) * gRow), // 2 .  for 4x4 ............... 2 for 6x6
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
        numbers = generateNumbersArray(four, six);
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

export const removeRandomFieldNumbers = (
  data: FieldType,
  count: number,
  typeOfGame: string
) => {
  while (count !== 0) {
    const [gRow, gColumn, row, column] = Array.from(
      Array(typeOfGame === "9x9" ? 9 : 4)
    ).map(
      () =>
        // 4 . for 4x4 ............... 6 for 6x6
        Math.floor(Math.random() * (typeOfGame === "9x9" ? 3 : 2)) // 2 . for 4x4
    );
    if (data[gRow][gColumn][row][column] !== 0) {
      count--;
      data[gRow][gColumn][row][column] = 0;
    }
    // const [gRow, column] = Array.from(Array(6)).map(() =>
    //   Math.floor(Math.random() * 3)
    // );
    // const [gColumn, row] = Array.from(Array(6)).map(() =>
    //   Math.floor(Math.random() * 2)
    // ); //  ............... for 6x6
    // if (data[gRow][gColumn][row][column] !== 0) {
    //   count--;
    //   data[gRow][gColumn][row][column] = 0;
    // }
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
export const formatData = (data: FieldType, typeOfGame: string): FieldData => {
  const newArray = data.reduce(
    (accumulator: any, currentValue: any, gRowIndex: number) => {
      const newValue = currentValue.reduce(
        (accum: SquareCells, current: SquareType, gColumnIndex: number) => {
          const value = current.reduce(
            (acc: SquareCells, curr: number[], row: number) => {
              const obj = curr.map((elem: number, columnIndex: number) => {
                return {
                  num: elem,
                  row: row + (typeOfGame === "9x9" ? 3 : 2) * gRowIndex, // 2 . for 4x4 ............... 2 for 6x6
                  column:
                    columnIndex + (typeOfGame === "4x4" ? 2 : 3) * gColumnIndex, // 2 . for 4x4 ............... 3 for 6x6
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
