import { Square } from "./Square";
import cl from "./sudoku_field.module.css";
type Props = {
  data: FieldData | undefined;
};

export const Field = ({ data }: Props) => {
  return (
    <div className={cl.grid_container}>
      {data &&
        data.map((arr: SquareCells) => (
          <Square value={arr} key={`${arr[0].row}-${arr[0].column}`} />
        ))}
    </div>
  );
};
