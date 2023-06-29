import { useFormikContext } from "formik";
import { MyButton } from "../../../../shared/components";

export const NewGameBtn = ({ onPress }: { onPress: VoidFunction }) => {
    const { resetForm } = useFormikContext();
  
    return (
      <MyButton
        text="New Game"
        onClick={() => {
          resetForm();
          onPress();
        }}
      />
    );
  };