import { Footer } from "../../shared/components/footer";
import { Header } from "../../shared/components/header";
import cl from "./game.module.css";
import { Field } from "../../shared/components/field";

export const Game = () => {
  return (
    <div className={cl.game_page}>
      <Header />
      <main className={cl.content_container}>
        <Field />
        <div className={cl.buttons_container}>
          <button className={cl.button}>Check</button>
          <button className={cl.button}>Restart</button>
        </div>
      </main>
      <Footer />
    </div>
  );
};
