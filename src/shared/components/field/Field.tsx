import { Square } from "./Square";
import cl from "./sudoku_field.module.css";
type Props = {
  data: FieldData;
  game: TypeOfGame;
};

export const Field = ({ data, game }: Props) => {
  return (
    <div
      className={
        game === "9x9"
          ? cl.grid_9x9
          : game === "6x6"
          ? cl.grid_6x6
          : cl.grid_4x4
      }
    >
      {data.map((arr: SquareCells) => (
        <Square
          value={arr}
          game={game}
          key={`square-${arr[0].row}-${arr[0].column}`}
        />
      ))}
    </div>
  );
};
