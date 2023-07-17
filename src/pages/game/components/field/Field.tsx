import { Square } from "./Square";
import cl from "./sudoku_field.module.css";
type Props = {
  data: FieldData;
  size: number;
};

export const Field = ({ data, size }: Props) => {
  localStorage.setItem("generatedData", JSON.stringify(data));

  return (
    <div className={cl[`grid_${size}`]}>
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
