import classes from "./game.module.css";

export const Game = () => {
  return (
    <div className={classes.game_page}>
      <header></header>
      <main>
        <div className={classes.sudoku_container}>
          <div className={classes.sudoku_box}>3</div>
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
