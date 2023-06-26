import { memo } from "react";
import cl from "./footer.module.css";

export const Footer = memo(() => {
  return (
    <footer className={cl.footer}>
      <p className={cl.footer_content}>Veranika Klokava</p>
      <p className={cl.footer_content}>2023</p>
      <ul className={cl.links}>
        <li className={cl.instagram}></li>
        <li className={cl.github}></li>
        <li className={cl.linkedin}></li>
      </ul>
    </footer>
  );
});
