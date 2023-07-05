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

const checkIfArrayIsUnique = (arr: any) => {
  return arr.length === new Set(arr).size;
};

export const checkField = (data: FieldData) => {
  const numsInSquare = getArrayOfNumbers(data);
  const column = getNumbersInColumnRow(data, Types.column);
  const row = getNumbersInColumnRow(data, Types.row);
  if (!numsInSquare.map((el) => checkIfArrayIsUnique(el)).includes(false)) {
    if (!column.map((el) => checkIfArrayIsUnique(el)).includes(false)) {
      if (!row.map((el) => checkIfArrayIsUnique(el)).includes(false)) {
        return true;
      }
    }
  }
  return false;
};
