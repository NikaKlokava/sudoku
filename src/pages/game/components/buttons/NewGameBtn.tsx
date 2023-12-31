import { MyButton } from "../../../../shared/components";

export const NewGameBtn = ({ onPress }: { onPress: VoidFunction }) => (
  <MyButton
    text="New Game"
    onClick={() => {
      onPress();
    }}
  />
);
