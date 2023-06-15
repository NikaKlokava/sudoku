import { Footer } from "../../shared/components/footer";
import { Header } from "../../shared/components/header";
import cl from "./game.module.css";
import { SudokuFiled } from "../../shared/components/sudoku_field";

export const Game = () => {
  const handleNumberClick = (e: any) => {
    console.log(+e.target.innerHTML); // return click number
  };

  return (
    <div className={cl.game_page}>
      <Header />
      <main className={cl.content_container}>
        <SudokuFiled />
        <div className={cl.numbers_container}>
          {Array.from({ length: 9 }, (_, i) => i + 1).map((elem, index) => {
            return (
              <div
                className={cl.numbers}
                key={index}
                onClick={handleNumberClick}
              >
                {elem}
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
