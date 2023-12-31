import cl from "./sudoku_field.module.css";
import { Cell } from "./Cell";
import { memo } from "react";

type Props = {
  value: SquareCells;
  size: number;
};

export const Square = memo(({ value, size }: Props) => {
  return (
    <div className={cl[`square_${size}`]}>
      {value.map((elem: CellItem) => (
        <Cell value={elem} size={size} key={`${elem.row}-${elem.column}`} />
      ))}
    </div>
  );
});
