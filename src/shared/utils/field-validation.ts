enum Types {
  row = "row",
  column = "column",
}

const getArrayOfNumbers = (array: FieldData) => {
  return array.map((elem) => {
    return elem.reduce((accum: number[], current: CellItem) => {
      return [...accum, current.num];
    }, []);
  });
};

const getNumbersInColumnRow = (field: FieldData, type: Types) => {
  let results = Array.from({ length: field.length }, () => new Array<number>());

  field.forEach((squareCell) => {
    squareCell.forEach((cellItem) => {
      if (type === Types.row) {
        results[cellItem.row].push(cellItem.num);
      } else results[cellItem.column].push(cellItem.num);
    });
  });
  return results;
};

const checkIfArrayIsUnique = (arr: number[]) => {
  return arr.length === new Set(arr).size;
};

export const checkField = (data: FieldData) => {
  const numsInSquare = getArrayOfNumbers(data);
  const checkSquare = numsInSquare
    .map((el) => checkIfArrayIsUnique(el))
    .includes(false);
  if (checkSquare) return false;

  const column = getNumbersInColumnRow(data, Types.column);
  const checkColumn = column
    .map((el) => checkIfArrayIsUnique(el))
    .includes(false);
  if (checkColumn) return false;

  const row = getNumbersInColumnRow(data, Types.row);
  const checkRow = row.map((el) => checkIfArrayIsUnique(el)).includes(false);

  if (checkRow) return false;

  return true;
};
