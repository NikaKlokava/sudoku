import { memo, useCallback, useState } from "react";
import cl from "../sudoku_field.module.css";

type Props = {
  elem: SmallSquareElement;
  index: number;
};

export const SmallSquare = memo(({ elem, index }: Props) => {
  const [active, setActive] = useState(false);

  const handleCellClick = useCallback(
    (row: number, column: number, elem: number) => {
      setActive((current) => !current);
      console.log("row:", row, "column:", column, "elem:", elem);
    },
    []
  );
  return (
    <div
      className={active ? `${cl.small_square} ${cl.active}` : cl.small_square}
      key={index}
      onClick={() => handleCellClick(elem.row, elem.column, elem.num)}
    >
      {elem.num === 0 ? " " : elem.num}
    </div>
  );
});
