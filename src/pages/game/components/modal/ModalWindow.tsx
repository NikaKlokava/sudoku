import classNames from "classnames";
import { useState } from "react";
import { MyButton } from "../../../../shared/components";
import { SizeOfField } from "../../../../shared/utils/utils";
import cl from "./modal.module.css";
import { ModalItem } from "./ModalItem";

type Props = {
  visible: boolean;
  onCancel?: () => void;
  onSubmit: (size: FieldSize, difficulty: Difficulty) => void;
};

export const ModalWindow = ({ visible, onCancel, onSubmit }: Props) => {
  const [fieldSize, setFieldSize] = useState<FieldSize>(SizeOfField.Nine);
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const active = classNames(cl.type, {
    [cl.selected]: true,
  });

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
        </div>
        <div className={cl.difficulty_container}>
          <p className={cl.title}>Difficulty</p>
          <div className={cl.types}>
            <p
              className={difficulty === "easy" ? active : cl.type}
              onClick={() => setDifficulty("easy")}
            >
              easy
            </p>
            <p
              className={difficulty === "medium" ? active : cl.type}
              onClick={() => setDifficulty("medium")}
            >
              medium
            </p>
            <p
              className={difficulty === "hard" ? active : cl.type}
              onClick={() => setDifficulty("hard")}
            >
              hard
            </p>
            <p
              className={difficulty === "impossible" ? active : cl.type}
              onClick={() => setDifficulty("impossible")}
            >
              impossible
            </p>
          </div>
        </div>
        <div className={cl.buttons_container}>
          {onCancel && (
            <MyButton text="Cancel" className={cl.button} onClick={onCancel} />
          )}
          <MyButton
            text="Start game"
            className={cl.button}
            onClick={() => onSubmit(fieldSize, difficulty)}
          />
        </div>
      </div>
    </div>
  );
};
