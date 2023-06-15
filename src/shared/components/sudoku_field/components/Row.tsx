import { memo } from "react";
import cl from "../sudoku_field.module.css";
import { SmallSquare } from "./SmallSquare";

export const Row = memo(({ row, rowIndex }: any) => {
  return (
    <div className={cl.row} key={rowIndex}>
      {row.map((smallSquare: any, columnIndex: number) => {
        return (
          <SmallSquare
            smallSquare={smallSquare}
            key={columnIndex}
            columnIndex={columnIndex}
            rowIndex={rowIndex}
          />
        );
      })}
    </div>
  );
});
