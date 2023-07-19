import { useFormikContext } from "formik";
import { memo, useEffect } from "react";
import { Square } from "./Square";
import cl from "./sudoku_field.module.css";
type Props = {
  data: FieldData;
  size: number;
};

export const Field = memo(({ data, size }: Props) => {
  const { setValues } = useFormikContext();

  useEffect(() => {
    const filledData = JSON.parse(localStorage.getItem("filledData")!);
    filledData && setValues(filledData);
  }, [setValues]);

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
});
