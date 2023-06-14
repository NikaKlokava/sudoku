import { Footer } from "../../shared/components/footer";
import { Header } from "../../shared/components/header";
import cl from "./game.module.css";

type EntryType = number | string | undefined;
type RowType = [
  EntryType,
  EntryType,
  EntryType,
  EntryType,
  EntryType,
  EntryType,
  EntryType,
  EntryType,
  EntryType
];
type FieldType = [
  RowType,
  RowType,
  RowType,
  RowType,
  RowType,
  RowType,
  RowType,
  RowType,
  RowType
];
const data: FieldType = [
  [8, 2, "", "", 1, "", "", "", ""],
  ["", 5, 1, "", "", "", "", 8, 6],
  ["", "", "", "", "", "", 9, 2, " "],
  ["", "", 6, 7, 9, "", "", " ", " "],
  [7, 8, "", 1, 4, "", 6, 9, 3],
  [5, 4, 9, 2, 3, "", 1, "", 8],
  ["", "", 5, "", 8, "", "", "", ""],
  [4, "", "", "", "", 1, "", 2, 9],
  ["", "", "", "", 6, 4, 8, "", 7],
];

export const Game = () => {
  return (
    <div className={cl.game_page}>
      <Header />
      <main className={cl.content_container}>
        <div className={cl.sudoku_container}>
          {data.map((array) => {
            return (
              <div className={cl.row}>
                {array.map((num) => {
                  return <div className={cl.small_square}>{num}</div>;
                })}
              </div>
            );
          })}
        </div>
        <div className={cl.buttons_container}>
          <button className={cl.button}>Check</button>
          <button className={cl.button}>Restart</button>
        </div>
      </main>
      <Footer />
    </div>
  );
};
