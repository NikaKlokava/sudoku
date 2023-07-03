import { MyButton } from "../../../../shared/components";

export const NewGameBtn = ({ onPress }: { onPress: VoidFunction }) => {
  return (
    <MyButton
      text="New Game"
      onClick={() => {
        onPress();
      }}
    />
  );
};
