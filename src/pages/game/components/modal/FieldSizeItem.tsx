import classNames from "classnames";
import cl from "./modal.module.css";

type Props = {
  onPress: () => void;
  active: boolean;
  title: string;
  img: string;
};

export const FieldSizeItem = ({ onPress, active, title, img }: Props) => {
  const activeClass = { [cl[`active`]]: active };
  return (
    <div className={cl[`field_size_item_${title}`]}>
      <img
        className={classNames(cl.sudoku_img, activeClass)}
        alt="game_img"
        src={img}
        onClick={onPress}
      />
      <p className={cl.title}>{title}</p>
    </div>
  );
};
