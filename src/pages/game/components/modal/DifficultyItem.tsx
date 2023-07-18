import cl from "./modal.module.css";
import classNames from "classnames";

type Props = {
  title: string;
  active: boolean;
  onPress: () => void;
};

export const DifficultyItem = ({ title, active, onPress }: Props) => {
  const activeClass = { [cl[`active_item`]]: active };
  return (
    <div
      className={classNames(cl.difficulty_item, activeClass)}
      onClick={onPress}
    >
      {title}
    </div>
  );
};
