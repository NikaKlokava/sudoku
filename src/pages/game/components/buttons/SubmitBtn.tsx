import { useFormikContext } from "formik";
import { memo } from "react";
import { MyButton } from "../../../../shared/components";

export const SubmitBtn = memo(() => {
  const { dirty, isValid, handleSubmit } = useFormikContext();
  return (
    <MyButton
      onClick={handleSubmit}
      type="submit"
      text="Check"
      disabled={!dirty || !isValid}
    />
  );
});
