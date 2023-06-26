import cl from "./sudoku_field.module.css";
import { Cell } from "./Cell";

type Props = {
  value: SquareCells;
};

export const Square = ({ value }: Props) => {
  return (
    <div className={cl.big_square}>
      {value.map((elem: CellItem) => (
        <Cell value={elem} key={`${elem.row}-${elem.column}`} />
      ))}
    </div>
  );
};
