import { MyButton } from "../button";
import { useFormikContext } from "formik";

export const SubmitBtn = () => {
  const { handleSubmit } = useFormikContext();

  return <MyButton onClick={handleSubmit} type="submit" text="Check" />;
};
