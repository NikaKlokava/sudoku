type SquareType = Array<number[]>; // array
type SquareRowType = Array<SquareType>; // [array, array, array...]
type FieldType = Array<SquareRowType>; // [ [array, array, array...], [array, array, array...], ...]

const generateEmpty = () => {
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

const printField = (field: FieldType) => {
  let message = "\n";
  for (let i = 0; i < field.length; i++) {
    const squareRow = field[i];
    // eslint-disable-next-line no-loop-func
    Array.from(Array(3)).forEach((_, k) => {
      Array.from(Array(3)).forEach((_, t) => {
        message += ` ${squareRow[t][k]} `;
      });
      message += "\n";
    });
    message += "\n";
  }
  console.log(message);
};
const shuffle = (array) => {
  array.sort(() => Math.random() - 0.5);
};

// function* chunks(arr, n) {
//   for (let i = 0; i < arr.length; i += n) {
//     yield arr.slice(i, i + n);
//   }
// }
const data: FieldType = generateEmpty();

// [
//   [0, 0],
//   [1, 1],
//   [2, 2],
// ].forEach(([i, j]) => {
//   const initial = Array.from(Array(9)).map((_, i) => i + 1);
//   shuffle(initial);

//   const chunked = [...chunks(initial, 3)];
//   chunked.forEach((ch, k) => {
//     data[i][j][k] = ch;
//   });
// });

const getNumbersInRow = (index: number) => {
  const squareRow = Math.floor(index / 3);

  return data[squareRow].reduce(
    (accumulator, currentValue) => [
      ...accumulator,
      ...currentValue[index - 3 * squareRow],
    ],
    new Array<number>()
  );
};

const getNumbersInColumn = (index: number) => {
  const squareColumn = Math.floor(index / 3);

  return data.reduce((accumulator, currentValue) => {
    const newValue = currentValue[squareColumn].reduce((acc, current) => {
      return [...acc, current[index - 3 * squareColumn]];
    }, []);
    return [...accumulator, ...newValue];
  }, new Array<number>());
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
for (let sqIndex = 0; sqIndex < squares.length; sqIndex += 1) {
  const [gRow, gColumn] = squares[sqIndex];

  let initial = Array.from(Array(9)).map((_, i) => i + 1);
  shuffle(initial);

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
        const validValueIndex = initial.findIndex(
          (num) => !rowColumnValue.includes(num)
        );

        if (validValueIndex === -1) {
          throw new Error(
            `Can't find valid value for [gRow=${gRow}][gColumn=${gColumn}] [column=${column}][row=${row}].`
          );
        }

        data[gRow][gColumn][row][column] = initial[validValueIndex];
        initial.splice(validValueIndex, 1);
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
      initial = Array.from(Array(9)).map((_, i) => i + 1);
      shuffle(initial);
    }
    if (attempt === maxNumberOfAttempt - 1) {
      //   console.warn("Start again");
      sqIndex = 0;
    }
  }
}

const removeNumbers = (num: number) => {
  while (num !== 0) {
    const [gRow, gColumn, row, column] = Array.from(Array(9)).map(() =>
      Math.floor(Math.random() * 3)
    );
    // let gRow = Math.floor(Math.random() * 3);
    // let gColumn = Math.floor(Math.random() * 3);
    // let row = Math.floor(Math.random() * 3);
    // let column = Math.floor(Math.random() * 3);

    if (data[gRow][gColumn][row][column] !== 0) {
      num--;
      data[gRow][gColumn][row][column] = 0;
    }
  }

  return;
};

printField(data);
removeNumbers(44);
printField(data);
