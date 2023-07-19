import { useEffect, useRef, useState } from "react";
import { Formik } from "formik";
import { Field } from "./components/field";
import { Footer, Header, Loader } from "../../shared/components";
import { ModalWindow } from "./components/modal";
import { NewGameBtn, SubmitBtn } from "./components/buttons";
import { getField } from "../../shared/utils/algorythm";
import { checkField } from "../../shared/utils/field-validation";
import * as yup from "yup";
import cl from "./game.module.css";

export const Game = () => {
  return (
    <div className={cl.game_page}>
      <Header />
      <main className={cl.content_container}>
        <GameContent />
      </main>
      <Footer />
    </div>
  );
};

const validationSchema = yup.array().of(
  yup.array().of(
    yup.object().shape({
      num: yup.number().min(1),
      row: yup.number().required("Required"),
      column: yup.number().required("Required"),
    })
  )
);

const GameContent = () => {
  const [data, setData] = useState<{
    generated: FieldData;
    filled: FieldData;
  }>();

  const [loading, setLoading] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [gameResult, setGameResult] = useState<boolean | undefined>();
  const fieldNumberRef = useRef<number>(0);

  useEffect(() => {
    const generatedData = JSON.parse(localStorage.getItem("generatedData")!);
    const filledData = JSON.parse(localStorage.getItem("filledData")!);

    if (generatedData) {
      setData({ generated: generatedData, filled: filledData });
      setLoading(false);
    } else {
      setModalVisible(true);
    }
  }, []);

  const loadGame = (size: FieldSize, difficulty: GameDifficulty) => {
    fieldNumberRef.current += 1;
    localStorage.removeItem("filledData");

    const field = getField(size, difficulty);
    const data = field.generatePlayfieldData();

    localStorage.setItem("generatedData", JSON.stringify(data));

    setData({ generated: data, filled: data });
    setLoading(false);
  };

  const handleCancelClick = () => {
    setModalVisible(false);
  };

  const handleStartGameClick = (
    size: FieldSize,
    difficulty: GameDifficulty
  ) => {
    setModalVisible(false);
    loadGame(size, difficulty);
  };

  const handleNewGameClick = () => {
    setModalVisible(true);
    setGameResult(undefined);
  };

  return (
    <>
      {loading && <Loader />}
      {data && (
        <Formik
          key={fieldNumberRef.current}
          initialValues={data.generated}
          validateOnChange={false}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={(values: FieldData) => {
            validationSchema.isValid(values);
            const isFieldValid = checkField(values);
            setGameResult(isFieldValid);
            setModalVisible(true);
          }}
        >
          <>
            <Field data={data.generated} size={data.generated.length} />
            <div className={cl.buttons_container}>
              <SubmitBtn />
              <NewGameBtn onPress={handleNewGameClick} />
            </div>
          </>
        </Formik>
      )}
      <ModalWindow
        visible={modalVisible}
        result={gameResult}
        onCancel={data?.generated && handleCancelClick}
        onStart={handleStartGameClick}
        onNewGame={handleNewGameClick}
      />
    </>
  );
};
