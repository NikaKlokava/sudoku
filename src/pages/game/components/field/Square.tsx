import cl from "./sudoku_field.module.css";
import { Cell } from "./Cell";

type Props = {
  value: SquareCells;
  size: FieldSize;
};

export const Square = ({ value, size }: Props) => {
  return (
    <div
      className={
        size === "4x4"
          ? cl.square4x4
          : size === "6x6"
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
