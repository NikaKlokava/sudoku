import { memo, useState } from "react";
import { MyButton } from "../../../../shared/components";
import { Difficulty, SizeOfField } from "../../../../shared/utils/utils";
import { FieldSizeItem } from "./FieldSizeItem";
import { isEqual, isUndefined } from "lodash";
import { DifficultyItem } from "./DifficultyItem";
import img9x9 from "../../../../assets/sudoku_9x9.png";
import img6x6 from "../../../../assets/sudoku_6x6.png";
import img4x4 from "../../../../assets/sudoku_4x4.png";
import cl from "./modal.module.css";
import { NewGameBtn } from "../buttons";

type Props = {
  visible: boolean;
  result: boolean | undefined;
  onCancel?: () => void;
  onStart: (size: FieldSize, difficulty: GameDifficulty) => void;
  onNewGame: () => void;
};

export const ModalWindow = memo(
  ({ visible, result, onCancel, onStart, onNewGame }: Props) => {
    const [fieldSize, setFieldSize] = useState<FieldSize>(SizeOfField.Nine);
    const [difficulty, setDifficulty] = useState<GameDifficulty>(
      Difficulty.easy
    );

    if (!visible) return null;

    return (
      <>
        <div className={cl.modal_wrapper} onClick={onCancel}></div>
        <div className={cl.modal_container}>
          {isUndefined(result) && (
            <>
              <div className={cl.field_size_container}>
                <FieldSizeItem
                  onPress={() => setFieldSize(SizeOfField.Nine)}
                  active={fieldSize === SizeOfField.Nine}
                  title={SizeOfField.Nine}
                  img={img9x9}
                />
                <FieldSizeItem
                  onPress={() => setFieldSize(SizeOfField.Four)}
                  active={fieldSize === SizeOfField.Four}
                  title={SizeOfField.Four}
                  img={img4x4}
                />
                <FieldSizeItem
                  onPress={() => setFieldSize(SizeOfField.Six)}
                  active={fieldSize === SizeOfField.Six}
                  title={SizeOfField.Six}
                  img={img6x6}
                />
              </div>
              <div className={cl.difficulty_container}>
                <DifficultyItem
                  title={Difficulty.easy}
                  active={difficulty === Difficulty.easy}
                  onPress={() => setDifficulty(Difficulty.easy)}
                />
                <DifficultyItem
                  title={Difficulty.medium}
                  active={difficulty === Difficulty.medium}
                  onPress={() => setDifficulty(Difficulty.medium)}
                />
                <DifficultyItem
                  title={Difficulty.hard}
                  active={difficulty === Difficulty.hard}
                  onPress={() => setDifficulty(Difficulty.hard)}
                />
                <DifficultyItem
                  title={Difficulty.impossible}
                  active={difficulty === Difficulty.impossible}
                  onPress={() => setDifficulty(Difficulty.impossible)}
                />
              </div>
              <div className={cl.buttons_container}>
                {onCancel && (
                  <MyButton
                    text="Cancel"
                    className={cl.button}
                    onClick={onCancel}
                  />
                )}
                <MyButton
                  text="Start game"
                  className={cl.button}
                  onClick={() => onStart(fieldSize, difficulty)}
                />
              </div>
            </>
          )}
          {!isUndefined(result) && (
            <div className={cl.result_container}>
              <div className={cl.result_title}>
                {result ? "Congratulations!" : "You lose..."}
              </div>
              <div className={cl[`result_img_${result}`]}></div>
              <div className={cl.buttons_container}>
                {isEqual(result, false) && (
                  <MyButton text="Close" onClick={onCancel} />
                )}
                <NewGameBtn onPress={onNewGame} />
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
);
