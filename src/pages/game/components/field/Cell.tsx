import { memo } from "react";
import { CellPrefilled } from "./CellPrefilled";
import { CellWithInput } from "./CellWithInput";

type Props = {
  value: CellItem;
  size: number;
};

export const Cell = memo(({ value, size }: Props) => {
  if (value.num !== 0) {
    return <CellPrefilled value={value} />;
  }
  return <CellWithInput value={value} size={size} />;
});
