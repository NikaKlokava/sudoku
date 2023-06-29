import { CellPrefilled } from "./CellPrefilled";
import { CellWithInput } from "./CellWithInput";

type Props = {
  value: CellItem;
  game: TypeOfGame;
};

export const Cell = ({ value, game }: Props) => {
  if (value.num !== 0) {
    return <CellPrefilled value={value} />;
  }
  return <CellWithInput value={value} game={game} />;
};
