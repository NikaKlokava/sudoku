import cl from "./sudoku_field.module.css";
import { Cell } from "./Cell";

type Props = {
  value: SquareCells;
  game: TypeOfGame;
};

export const Square = ({ value, game }: Props) => {
  return (
    <div
      className={
        game === "9x9"
          ? cl.big_square_9x9
          : game === "6x6"
          ? cl.big_square_6x6
          : cl.big_square_4x4
      }
    >
      {value.map((elem: CellItem) => (
        <Cell value={elem} game={game} key={`${elem.row}-${elem.column}`} />
      ))}
    </div>
  );
};
