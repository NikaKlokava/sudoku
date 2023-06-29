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
        game === "4x4"
          ? cl.square4x4
          : game === "6x6"
          ? cl.square6x6
          : cl.square9x9
      }
    >
      {value.map((elem: CellItem) => (
        <Cell value={elem} game={game} key={`${elem.row}-${elem.column}`} />
      ))}
    </div>
  );
};
