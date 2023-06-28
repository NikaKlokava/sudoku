import { CellPrefilled } from "./CellPrefilled";
import { CellWithInput } from "./CellWithInput";

type Props = {
  value: CellItem;
};

export const Cell = ({ value }: Props) => {
  if (value.num !== 0) {
    return <CellPrefilled value={value} />;
  }
  return <CellWithInput value={value} />;
};
