import { useState } from "react";
import { MyButton } from "../../../../shared/components";
import { SizeOfField } from "../../../../shared/utils/utils";
import cl from "./modal.module.css";

type Props = {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (size: FieldSize) => void;
};
// примерно так https://dev.to/franciscomendes10866/how-to-create-a-modal-in-react-3coc
export const ModalWindow = ({ visible, onCancel, onSubmit }: Props) => {
  const [fieldSize, setFieldSize] = useState<FieldSize>(SizeOfField.Nine);

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
            onClick={() => setFieldSize(SizeOfField.Nine)}
            defaultChecked
          />
          <input
            type="radio"
            name="game"
            className={cl.input}
            onClick={() => setFieldSize(SizeOfField.Four)}
          />
          <input
            type="radio"
            name="game"
            className={cl.input}
            onClick={() => setFieldSize(SizeOfField.Six)}
          />
        </div>
        <div className={cl.buttons_container}>
          <MyButton text="Cancel" className={cl.button} onClick={onCancel} />
          <MyButton
            text="Start game"
            className={cl.button}
            onClick={() => onSubmit(fieldSize)}
          />
        </div>
      </div>
    </div>
  );
};
