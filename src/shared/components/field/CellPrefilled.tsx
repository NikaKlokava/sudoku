import cl from "./sudoku_field.module.css";

type Props = {
  value: CellItem;
};

export const CellPrefilled = ({ value }: Props) => (
  <input
    className={`${cl.cell} ${cl.completed}`}
    type="text"
    autoComplete="off"
    value={value.num}
    disabled
  ></input>
);
