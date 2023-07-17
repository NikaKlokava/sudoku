import { useState } from "react";
import { MyButton } from "../../../../shared/components";
import { SizeOfField } from "../../../../shared/utils/utils";
import { ModalItem } from "./ModalItem";
import img9x9 from "../../../../assets/sudoku_9x9.png";
import img6x6 from "../../../../assets/sudoku_6x6.png";
import img4x4 from "../../../../assets/sudoku_4x4.png";
import cl from "./modal.module.css";
import { isEqual, isUndefined } from "lodash";

type Props = {
  visible: boolean;
  result: boolean | undefined;
  onCancel?: () => void;
  onSubmit: (size: FieldSize) => void;
  onResult: () => void;
};

export const ModalWindow = ({
  visible,
  result,
  onCancel,
  onSubmit,
  onResult,
}: Props) => {
  const [fieldSize, setFieldSize] = useState<FieldSize>(SizeOfField.Nine);

  if (!visible) return null;

  return (
    <>
      <div className={cl.modal_wrapper} onClick={onCancel}></div>
      <div className={cl.modal_container}>
        {isUndefined(result) && (
          <>
            <div className={cl.items_container}>
              <ModalItem
                onPress={() => setFieldSize(SizeOfField.Nine)}
                active={fieldSize === SizeOfField.Nine}
                title={SizeOfField.Nine}
                img={img9x9}
              />
              <ModalItem
                onPress={() => setFieldSize(SizeOfField.Four)}
                active={fieldSize === SizeOfField.Four}
                title={SizeOfField.Four}
                img={img4x4}
              />
              <ModalItem
                onPress={() => setFieldSize(SizeOfField.Six)}
                active={fieldSize === SizeOfField.Six}
                title={SizeOfField.Six}
                img={img6x6}
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
                onClick={() => onSubmit(fieldSize)}
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
                <MyButton text="Correct" onClick={onCancel} />
              )}
              <MyButton text="New Game" onClick={onResult} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
