import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyButton } from "../../shared/components/button";
import { Footer } from "../../shared/components/footer";
import { Header } from "../../shared/components/header";
import cl from "./home.module.css";

export const Home = () => {
  const [value, setValue] = useState<TypeOfGame>("9x9");
    const navigate = useNavigate();

  const handleStartGameClick = useCallback((val: TypeOfGame) => {
    navigate("/game", {state: value});
  }, [navigate, value]);

  return (
    <div className={cl.home_page}>
      <Header />

      <main className={cl.content_container}>
        <div className={cl.content_box}>
          <div className={cl.images_container}>
            <img
              className={cl.sudoku_img}
              alt="9x9_game"
              src="https://sudoku-puzzles.net/wp-content/puzzles/sudoku/easy/1.png"
            />
            <img
              className={cl.sudoku_img}
              alt="4x4_game"
              src="https://sudoku-puzzles.net/wp-content/puzzles/sudoku-4x4/easy/1.png"
            />
            <img
              className={cl.sudoku_img}
              alt="6x6_game"
              src="https://sudoku-puzzles.net/wp-content/puzzles/sudoku-6x6/medium/1.png"
            />
          </div>
          <div className={cl.inputs_container}>
            <input
              type="radio"
              name="game"
              className={cl.input}
              onClick={() => setValue("9x9")}
              defaultChecked
            />
            <input
              type="radio"
              name="game"
              className={cl.input}
              onClick={() => setValue("4x4")}
            />
            <input
              type="radio"
              name="game"
              className={cl.input}
              onClick={() => setValue("6x6")}
            />
          </div>
          <MyButton
            text="Start game"
            className={cl.button}
            onClick={() => handleStartGameClick(value)}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};
