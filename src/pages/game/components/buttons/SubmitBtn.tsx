import { useFormikContext } from "formik";
import { MyButton } from "../../../../shared/components";

export const SubmitBtn = () => {
  const { handleSubmit } = useFormikContext();

  return <MyButton onClick={handleSubmit} type="submit" text="Check" />;
};
