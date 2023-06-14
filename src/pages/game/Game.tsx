import { Footer } from "../../shared/components/footer";
import { Header } from "../../shared/components/header";
import cl from "./game.module.css";
import { createSudokuField } from "../../shared/algorythm/sudoku";

const data = createSudokuField();
console.log(data);
export const Game = () => {
  return (
    <div className={cl.game_page}>
      <Header />
      <main className={cl.content_container}>
        <div className={cl.sudoku_container}>
          {data.map((globalRows, index) => {
            return (
              <div className={cl.global_row} key={index}>
                {globalRows.map((bigSquare, index) => {
                  return (
                    <div className={cl.big_square} key={index}>
                      {bigSquare.map((row, index) => {
                        return (
                          <div className={cl.row} key={index}>
                            {row.map((smallSquare, index) => {
                              return (
                                <div className={cl.small_square} key={index}>
                                  {smallSquare === 0 ? " " : smallSquare}
                                </div>
                              );
                            })}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div className={cl.buttons_container}>
          <button className={cl.button}>Check</button>
          <button className={cl.button}>Restart</button>
        </div>
      </main>
      <Footer />
    </div>
  );
};
