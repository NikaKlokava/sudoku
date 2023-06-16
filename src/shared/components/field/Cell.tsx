import { useState } from "react";
import cl from "./sudoku_field.module.css";

type Props = {
  value: CellItem;
};

export const Cell = ({ value }: Props) => {
  const [newValue, setNewValue] = useState();

  const isCellCompleted = value.num !== 0;
  const possibleNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const handleInputChange = (e: any, value: CellItem) => {
    if (e.target.value.length > 1) {
      //you may enter only one value (1 or 3...)
      e.target.value = e.target.value.slice(0, 1); //remove excess values (if 12 => leave only 1)
    } else if (!possibleNumbers.includes(+e.target.value)) {
      // we can enter only numbers
      e.target.value = e.target.value.slice(0, 0); // remove letters if they are present
    }
    console.log(value);

    setNewValue(e.target.value); // if all is good, then save this number
  };

  return (
    <input
      className={isCellCompleted ? `${cl.cell} ${cl.completed}` : cl.cell}
      type="text"
      name="cell"
      defaultValue={isCellCompleted ? value.num : undefined}
      onChange={(e: any) => handleInputChange(e, value)}
    ></input>
  );
};
