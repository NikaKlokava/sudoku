import { memo } from "react";
import cl from "./footer.module.css";

export const Footer = memo(() => {
  return (
    <footer className={cl.footer}>
      <p className={cl.footer_content}>Veranika Klokava</p>
      <p className={cl.footer_content}>2023</p>
      <ul className={cl.links}>
        <a href="https://instagram.com/nika_klokava?igshid=MmIzYWVlNDQ5Yg==">
          <div className={cl.instagram} />
        </a>
        <a href="https://github.com/NikaKlokava">
          <div className={cl.github} />
        </a>
        <a href="https://linkedin.com/in/veranika-klokava-858b5b287">
          <div className={cl.linkedin} />
        </a>
      </ul>
    </footer>
  );
});
