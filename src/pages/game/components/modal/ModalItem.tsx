import cl from "./modal.module.css";

type Props = {
  onPress: () => void;
  active: boolean;
  title: string;
  img: string;
};

export const ModalItem = ({ onPress, active, title, img }: Props) => {
  return (
    <>
      <img
        className={
          active ? `${cl.sudoku_img} ${cl.active}` : `${cl.sudoku_img}`
        }
        alt="game_img"
        src={img}
        onClick={onPress}
      />
      <p className={cl.title}>{title}</p>
    </>
  );
};
