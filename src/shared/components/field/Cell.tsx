import cl from "./sudoku_field.module.css";
import { useFormikContext } from "formik";
import { memo } from "react";

type Props = {
  value: CellItem;
};

export const Cell = memo(({ value }: Props) => {
  const formik = useFormikContext();

  const isCellCompleted = value.num !== 0;
  const possibleNumbers = Array.from({ length: 9 }, (_, i) => i + 1); // [1, ... , 9]

  const handleInputChange = (e: any) => {
    if (e.target.value.length > 1) {
      e.target.value = e.target.value.slice(0, 1); //remove excess values
    } else if (!possibleNumbers.includes(+e.target.value)) {
      e.target.value = e.target.value.slice(0, 0); // remove letters
    }

    const squareIndex =
      Math.floor(value.row / 3) * 3 + Math.floor(value.column / 3);

    const cellIndex =
      (value.row - Math.floor(value.row / 3) * 3) * 3 -
      (Math.floor(value.column / 3) * 3 - value.column);

    value.num = +e.target.value;

    formik.setFieldValue(`${[squareIndex]}.${[cellIndex]}`, value);
  };

  return (
    <input
      key={`${value.num}-${value.row}-${value.column}`}
      // className={isCellCompleted ? `${cl.cell} ${cl.completed}` : cl.cell}
      className={cl.cell}
      type="text"
      name="cell"
      autoComplete="off"
      defaultValue={isCellCompleted ? value.num : undefined}
      onChange={(e: any) => handleInputChange(e)}
    ></input>
  );
});
