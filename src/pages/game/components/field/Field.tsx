import { Square } from "./Square";
import cl from "./sudoku_field.module.css";
type Props = {
  data: FieldData;
  size: number;
};

export const Field = ({ data, size }: Props) => {
  return (
    <div
      className={size === 9 ? cl.grid9x9 : size === 6 ? cl.grid6x6 : cl.grid4x4}
    >
      {data.map((arr: SquareCells) => (
        <Square
          value={arr}
          size={size}
          key={`square-${arr[0].row}-${arr[0].column}`}
        />
      ))}
    </div>
  );
};
