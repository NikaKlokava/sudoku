import { memo } from "react";
import cl from "../sudoku_field.module.css";
import { SmallSquare } from "./SmallSquare";

type Props = {
  arr: FieldRow;
  i: number;
};
export const BigSquare = memo(({ arr, i }: Props) => {
  return (
    <div className={cl.big_square} key={i}>
      {arr.map((elem: SmallSquareElement, index: number) => (
        <SmallSquare elem={elem} index={index} key={index} />
      ))}
    </div>
  );
});
