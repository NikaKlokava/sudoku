import cl from "./modal.module.css";

type Props = {
  onPress: () => void;
};

export const ModalItem = ({ onPress }: Props) => {
  return (
    <img
      className={cl.sudoku_img}
      alt="9x9_game"
      src="https://sudoku-puzzles.net/wp-content/puzzles/sudoku/easy/1.png"
      onClick={() => onPress()}
    />
  );
};
