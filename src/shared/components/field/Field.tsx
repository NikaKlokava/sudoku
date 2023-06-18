import { useEffect, useState } from "react";
import { playfieldData } from "../../utils/sudoku";
import { Loader } from "../loader";
import { Square } from "./Square";
import cl from "./sudoku_field.module.css";

export const Field = () => {
  const [data, setData] = useState<FieldData>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = playfieldData();
    setData(data);
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className={cl.grid_container}>
          {data &&
            data.map((arr: SquareCells) => (
              <Square value={arr} key={`${arr[0].row}-${arr[0].column}`} />
            ))}
        </div>
      )}
    </>
  );
};
