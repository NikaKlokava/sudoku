import cl from "./modal.module.css";

type Props = {
  onPress: () => void;
  size: FieldSize | undefined;
};

export const ModalItem = ({ onPress, size }: Props) => {
  return (
    <img
      className={size ? `${cl.sudoku_img} ${cl.active}` : cl.sudoku_img}
      alt="img_game"
      src="https://sudoku-puzzles.net/wp-content/puzzles/sudoku/easy/1.png"
      onClick={onPress}
    />
  );
};
