import { useState } from "react";
import { MyButton } from "../../../../shared/components";
import { SizeOfField } from "../../../../shared/utils/utils";
import cl from "./modal.module.css";
import { ModalItem } from "./ModalItem";

type Props = {
  visible: boolean;
  onCancel?: () => void;
  onSubmit: (size: FieldSize) => void;
};

export const ModalWindow = ({ visible, onCancel, onSubmit }: Props) => {
  const [fieldSize, setFieldSize] = useState<FieldSize>(SizeOfField.Nine);

  if (!visible) return null;

  return (
    <div className={cl.modal_wrapper}>
      <div className={cl.modal_container}>
        <div className={cl.images_container}>
          <ModalItem
            onPress={() => setFieldSize(SizeOfField.Nine)}
            size={fieldSize === SizeOfField.Nine ? fieldSize : undefined}
          />
          <ModalItem
            onPress={() => setFieldSize(SizeOfField.Four)}
            size={fieldSize === SizeOfField.Four ? fieldSize : undefined}
          />
          <ModalItem
            onPress={() => setFieldSize(SizeOfField.Six)}
            size={fieldSize === SizeOfField.Six ? fieldSize : undefined}
          />
        </div>
        <div className={cl.titles_container}>
          <p className={cl.title}>{SizeOfField.Nine}</p>
          <p className={cl.title}>{SizeOfField.Four}</p>
          <p className={cl.title}>{SizeOfField.Six}</p>
          {/* <input
            type="radio"
            name="game"
            className={cl.input}
            onClick={() => setFieldSize(SizeOfField.Nine)}
            defaultChecked
          />
          <input
            type="radio"
            name="game"
            className={cl.input}
            onClick={() => setFieldSize(SizeOfField.Four)}
          />
          <input
            type="radio"
            name="game"
            className={cl.input}
            onClick={() => setFieldSize(SizeOfField.Six)}
          /> */}
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
    </div>
  );
};
