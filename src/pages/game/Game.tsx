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

const GameContent = () => {
  const [data, setData] = useState<FieldData>();

  const [loading, setLoading] = useState<boolean>(true);

  const [modalVisible, setModalVisible] = useState<boolean>(true);
  const fieldSize = useRef<number>(0);

  const loadGame = useCallback((size: FieldSize) => {
    fieldSize.current += 1;
    const field = getField(size);

    const fullData = field.generateCompletedField();
    field.removeRandomFieldNumbers(fullData);

    const data = field.formatData(fullData);

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

  const validationSchema = yup.array().of(
    yup.array().of(
      yup.object().shape({
        num: yup.number().min(1),
        row: yup.number().required("Required"),
        column: yup.number().required("Required"),
      })
    )
  );

  return (
    <>
      {loading && <Loader />}
      {data && (
        <Formik
          key={fieldSize.current}
          initialValues={data}
          validateOnChange={false}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={(values: FieldData) => {
            validationSchema.isValid(values);
            const isFieldValid = checkField(values);
            alert(isFieldValid ? "Valid" : "Invalid");
          }}
        >
          <>
            <Field data={data} size={data.length} />
            <div className={cl.buttons_container}>
              <SubmitBtn />
              <NewGameBtn
                onPress={() => {
                  setModalVisible(true);
                }}
              />
            </div>
          </>
        </Formik>
      )}
      <ModalWindow
        visible={modalVisible}
        onCancel={data ? handleCancelClick : undefined}
        onSubmit={handleSubmitClick}
      />
    </>
  );
};
