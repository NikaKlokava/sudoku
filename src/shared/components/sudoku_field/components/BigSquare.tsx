import { memo } from "react";
import { Row } from "./Row";
import cl from "../sudoku_field.module.css";

export const BigSquare = memo(({ bigSquare, bigSquareIndex }: any) => {
  return (
    <div className={cl.big_square} key={bigSquareIndex}>
      {bigSquare.map((row: any, rowIndex: number) => {
        return <Row row={row} key={rowIndex} rowIndex={rowIndex} />;
      })}
    </div>
  );
});
