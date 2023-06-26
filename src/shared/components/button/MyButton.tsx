import classes from "../button/my_button.module.css";
import { memo } from "react";

export const MyButton = memo(({ text, className, ...props }: any) => {
  return (
    <button {...props} className={`${classes.button} ${className}`}>
      {text}
    </button>
  );
});
