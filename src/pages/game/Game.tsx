import classes from "./game.module.css";

export const Game = () => {
  return (
    <div className={classes.game_page}>
      <header className={classes.header}>
        <p className={classes.header_title}>Sudoku</p>
      </header>
      <main className={classes.content_container}>
        <div className={classes.sudoku_container}>
          <div className={classes.first_row}>
            <div className={classes.sudoku_big_square}></div>
            <div className={classes.sudoku_big_square}></div>
            <div className={classes.sudoku_big_square}></div>
          </div>
          <div className={classes.first_row}>
            <div className={classes.sudoku_big_square}></div>
            <div className={classes.sudoku_big_square}></div>
            <div className={classes.sudoku_big_square}></div>
          </div>
          <div className={classes.first_row}>
            <div className={classes.sudoku_big_square}></div>
            <div className={classes.sudoku_big_square}></div>
            <div className={classes.sudoku_big_square}></div>
          </div>
        </div>
        <div className={classes.buttons_container}>
          <button className={classes.button}>Check</button>
          <button className={classes.button}>Restart</button>
        </div>
      </main>
      <footer className={classes.footer}>
        <p className={classes.footer_content}>Veranika Klokava</p>
        <p className={classes.footer_content}>2023</p>
        <ul className={classes.links}>
          <li className={classes.instagram}></li>
          <li className={classes.github}></li>
          <li className={classes.linkedin}></li>
        </ul>
      </footer>
    </div>
  );
};
