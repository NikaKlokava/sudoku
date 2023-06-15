import { memo, useCallback, useState } from "react";
// import { getNumbersInRow } from "../../../algorythm/sudoku";
import cl from "../sudoku_field.module.css";

export const SmallSquare = memo(
  ({ smallSquare, columnIndex, rowIndex }: any) => {
    const [active, setActive] = useState(false);

    const handleSmallSquareClick = useCallback(
      (e: any) => {
        // console.log("column:", columnIndex, "row:", rowIndex);
        // console.log(getNumbersInRow(rowIndex));
        setActive((current) => !current);
      },
      []
    );

    return (
      <div
        className={active ? `${cl.small_square} ${cl.active}` : cl.small_square}
        key={columnIndex}
        onClick={handleSmallSquareClick}
      >
        {smallSquare === 0 ? " " : smallSquare}
      </div>
    );
  }
);
