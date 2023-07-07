import { useState } from "react";
import { MyButton } from "../../../../shared/components";
import { SizeOfField } from "../../../../shared/utils/utils";
import cl from "./modal.module.css";
import { ModalItem } from "./ModalItem";
import img9x9 from "../../../../assets/sudoku_9x9.png";
import img6x6 from "../../../../assets/sudoku_6x6.png";
import img4x4 from "../../../../assets/sudoku_4x4.png";

type Props = {
  visible: boolean;
  onCancel?: () => void;
  onSubmit: (size: FieldSize) => void;
};

export const ModalWindow = ({ visible, onCancel, onSubmit }: Props) => {
  const [fieldSize, setFieldSize] = useState<FieldSize>(SizeOfField.Nine);

  if (!visible) return null;

  return (
    <>
      <div className={cl.modal_wrapper} onClick={onCancel}></div>
      <div className={cl.modal_container}>
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
            img={img6x6}
          />
          <ModalItem
            onPress={() => setFieldSize(SizeOfField.Six)}
            active={fieldSize === SizeOfField.Six}
            title={SizeOfField.Six}
            img={img4x4}
          />
        </div>
        <div className={cl.buttons_container}>
          {onCancel && (
            <MyButton text="Cancel" className={cl.button} onClick={onCancel} />
          )}
          <MyButton
            text="Start game"
            className={cl.button}
            onClick={() => onSubmit(fieldSize)}
          />
        </div>
      </div>
    </>
  );
};
