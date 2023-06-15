import { memo } from "react";
import { dataArray } from "../../algorythm/sudoku";
import { BigSquare } from "./components";
import cl from "./sudoku_field.module.css";

export const SudokuFiled = memo(() => {
  return (
    <div className={cl.grid_container}>
      {dataArray.map((arr: FieldRow, i: number) => (
        <BigSquare arr={arr} i={i} key={i} />
      ))}
    </div>
  );
});
