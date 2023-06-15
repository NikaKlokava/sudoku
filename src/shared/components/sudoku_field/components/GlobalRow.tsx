import { memo } from "react";
import { BigSquare } from "./BigSquare";
import cl from "../sudoku_field.module.css";

export const GlobalRow = memo(({ globalRows, globalRowIndex }: any) => {
  //globalRowIndex - 0 , 1 , 2
  return (
    <div className={cl.global_row} key={globalRowIndex}>
      {globalRows.map((bigSquare: any, bigSquareIndex: number) => {
        return (
          <BigSquare
            bigSquare={bigSquare}
            key={bigSquareIndex}
            bigSquareIndex={bigSquareIndex} // bigSquareIndex - 0,1,2  0,1,2  0,1,2
          />
        );
      })}
    </div>
  );
});
