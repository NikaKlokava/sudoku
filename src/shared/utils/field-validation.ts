enum Types {
  row = "row",
  column = "column",
}

const getArrayOfNumbers = (array: FieldData) => {
  return array.map((elem) => {
    return elem.reduce((accum: any, current: any) => {
      return [...accum, current.num];
    }, []);
  });
};

const getArrayOfObjects = (array: FieldData) => {
  return array.reduce((accum, curr) => {
    return [...accum, ...curr];
  }, []);
};

const getNumbersInColumnRow = (data: FieldData, type: Types) => {
  const arrOfObjects = getArrayOfObjects(data);

  let arrOfObjNumbers = [];

  for (let i = 0; i < data.length; i++) {
    const obj = arrOfObjects.filter((elem) => {
      if (type === Types.row) {
        if (elem.row === i) return elem;
      } else {
        if (elem.column === i) return elem;
      }
      return null;
    });
    arrOfObjNumbers.push(obj);
  }
  return getArrayOfNumbers(arrOfObjNumbers);
};

const checkIfArrayIsUnique = (arr: any) => {
  return arr.length === new Set(arr).size;
};

export const checkField = (data: FieldData) => {
  const numsInSquare = getArrayOfNumbers(data);
  const numsInRows = getNumbersInColumnRow(data, Types.row);
  const numsInColumn = getNumbersInColumnRow(data, Types.column);
};
