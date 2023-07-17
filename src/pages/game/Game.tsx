import { useCallback, useRef, useState } from "react";
import { Formik } from "formik";
import cl from "./game.module.css";
import { Field } from "./components/field";
import { Footer, Header, Loader } from "../../shared/components";
import { ModalWindow } from "./components/modal";
import { NewGameBtn, SubmitBtn } from "./components/buttons";
import { getField } from "../../shared/utils/algorythm";
import { checkField } from "../../shared/utils/field-validation";
import * as yup from "yup";

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
  const [data, setData] = useState<FieldData>();
  const [loading, setLoading] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState<boolean>(true);
  const [gameResult, setGameResult] = useState<boolean | undefined>();
  const fieldNumberRef = useRef<number>(0);

  const loadGame = useCallback((size: FieldSize) => {
    fieldNumberRef.current += 1;

    const field = getField(size);
    const data = field.generatePlayfieldData();

    setData(data);
    setLoading(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCancelClick = useCallback(() => {
    setModalVisible(false);
  }, []);

  const handleSubmitClick = useCallback((size: FieldSize) => {
    setModalVisible(false);
    loadGame(size);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const handleResultChange = useCallback(() => {
    setGameResult(undefined);
  }, []);

  return (
    <>
      {loading && <Loader />}
      {data && (
        <Formik
          key={fieldNumberRef.current}
          initialValues={data}
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
            <Field data={data} size={data.length} gameResult={gameResult} />
            <div className={cl.buttons_container}>
              <SubmitBtn />
              <NewGameBtn
                onPress={() => {
                  setModalVisible(true);
                  setGameResult(undefined);
                }}
              />
            </div>
          </>
        </Formik>
      )}
      <ModalWindow
        visible={modalVisible}
        result={gameResult}
        onCancel={data ? handleCancelClick : undefined}
        onSubmit={handleSubmitClick}
        onResult={handleResultChange}
      />
    </>
  );
};
