import cl from "./sudoku_field.module.css";

type Props = {
  value: CellItem;
};

export const Cell = ({ value }: Props) => {
  const isCellCompleted = value.num !== 0;
  const possibleNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const handleInputChange = (e: any) => {
    if (e.target.value.length > 1) {
      e.target.value = e.target.value.slice(0, 1); //remove excess values
    } else if (!possibleNumbers.includes(+e.target.value)) {
      e.target.value = e.target.value.slice(0, 0); // remove letters
    }
  };

  return (
    <input
      className={isCellCompleted ? `${cl.cell} ${cl.completed}` : cl.cell}
      type="text"
      name="cell"
      autoComplete="off"
      defaultValue={isCellCompleted ? value.num : undefined}
      onChange={(e: any) => handleInputChange(e)}
    ></input>
  );
};
