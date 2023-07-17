import { useFormikContext } from "formik";
import { CellPrefilled } from "./CellPrefilled";
import { CellWithInput } from "./CellWithInput";

type Props = {
  value: CellItem;
  size: number;
};

export const Cell = ({ value, size }: Props) => {
  const { values } = useFormikContext();
  // localStorage.removeItem("sudoku");
  // localStorage.setItem("sudoku", JSON.stringify(values));
  console.log(localStorage.getItem("sudoku"));
  if (value.num !== 0) {
    return <CellPrefilled value={value} />;
  }
  return <CellWithInput value={value} size={size} />;
};
