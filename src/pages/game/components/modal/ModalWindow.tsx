import { MyButton } from "../../../../shared/components";
import cl from "./modal.module.css";

export const ModalWindow = ({ changeValue, onStartClick }: any) => {
  return (
    <div className={cl.modal_wrapper}>
      <div className={cl.modal_container}>
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
            onClick={() => changeValue("9x9")}
            defaultChecked
          />
          <input
            type="radio"
            name="game"
            className={cl.input}
            onClick={() => changeValue("4x4")}
          />
          <input
            type="radio"
            name="game"
            className={cl.input}
            onClick={() => changeValue("6x6")}
          />
        </div>
        <MyButton
          text="Start game"
          className={cl.button}
          onClick={() => onStartClick()}
        />
      </div>
    </div>
  );
};
