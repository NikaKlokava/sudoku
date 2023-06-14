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

function* chunks(arr, n) {
  for (let i = 0; i < arr.length; i += n) {
    yield arr.slice(i, i + n);
  }
}
const data: FieldType = generateEmpty();

[
  [0, 0],
  [1, 1],
  [2, 2],
].forEach(([i, j]) => {
  const initial = Array.from(Array(9)).map((_, i) => i + 1);
  shuffle(initial);

  const chunked = [...chunks(initial, 3)];
  chunked.forEach((ch, k) => {
    data[i][j][k] = ch;
  });
});

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

[[0, 1]].forEach(([i, j]) => {
  const initial = Array.from(Array(9)).map((_, i) => i + 1);
  // shuffle(initial);

  for (let h = 0; h < 3; h++) {
    for (let g = 0; g < 3; g++) {
      for (let k = 0; k < initial.length; k++) {
        const numsInColumn = getNumbersInColumn(g + 3); // 3
        const numbsInRow = getNumbersInRow(h); //0

        const isExistInRow = numbsInRow.includes(initial[k]);
        const isExistInColumn = numsInColumn.includes(initial[k]);

        if (!isExistInRow && !isExistInColumn) {
          data[i][j][h][g] = initial[k];
          const index = initial.indexOf(initial[k]);
          initial.splice(index, 1);
          break;
        }
      }
    }
  }
  return;
});

printField(data);
