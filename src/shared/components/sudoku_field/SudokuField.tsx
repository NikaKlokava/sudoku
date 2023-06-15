import { memo } from "react";
import { createSudokuField } from "../../algorythm/sudoku";
import { GlobalRow } from "./components";
import cl from "./sudoku_field.module.css";

export const SudokuFiled = memo(() => {
  const data = createSudokuField();

  return (
    <div className={cl.sudoku_container}>
      {data.map((globalRows, i) => {
        return (
          <GlobalRow globalRows={globalRows} key={i} globalRowIndex={i} />
          //   <div className={cl.global_row} key={i}>
          //     {globalRows.map((bigSquare, k) => {
          //       return (
          //         <div className={cl.big_square} key={k}>
          //           {bigSquare.map((row, l) => {
          //             return (
          //               <div className={cl.row} key={l}>
          //                 {row.map((smallSquare, m) => {
          //                   return (
          //                     <div
          //                       className={cl.small_square}
          //                       key={m}
          //                       onClick={handleSmallSquareClick}
          //                     >
          //                       {smallSquare === 0 ? " " : smallSquare}
          //                     </div>
          //                   );
          //                 })}
          //               </div>
          //             );
          //           })}
          //         </div>
          //       );
          //     })}
          //   </div>
        );
      })}
    </div>
  );
});
