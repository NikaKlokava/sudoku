import { memo } from "react";
import cl from "./header.module.css";

export const Header = memo(() => {
  return (
    <header className={cl.header}>
      <p className={cl.header_title}>Sudoku</p>
    </header>
  );
});
