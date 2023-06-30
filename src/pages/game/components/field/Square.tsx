import cl from "./sudoku_field.module.css";
import { Cell } from "./Cell";
import { SizeOfField } from "../../../../shared/utils/utils";

type Props = {
  value: SquareCells;
  size: FieldSize;
};

export const Square = ({ value, size }: Props) => {
  return (
    <div
      className={
        size === SizeOfField.Four
          ? cl.square4x4
          : size === SizeOfField.Six
          ? cl.square6x6
          : cl.square9x9
      }
    >
      {value.map((elem: CellItem) => (
        <Cell value={elem} size={size} key={`${elem.row}-${elem.column}`} />
      ))}
    </div>
  );
};
