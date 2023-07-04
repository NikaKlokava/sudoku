import { useCallback, useState } from "react";
import { Formik } from "formik";
import cl from "./game.module.css";
import { Field } from "./components/field";
import { Footer, Header, Loader } from "../../shared/components";
import { ModalWindow } from "./components/modal";
import { NewGameBtn, SubmitBtn } from "./components/buttons";
import { getField } from "../../shared/utils/algorithm";
import { checkField } from "../../shared/utils/field-validation";

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
  const [fullData, setFullData] = useState<FieldData>();

  const [loading, setLoading] = useState<boolean>(true);

  const [modalVisible, setModalVisible] = useState<boolean>(true);

  const loadGame = useCallback((size: FieldSize) => {
    const field = getField(size);

    const fullData = field.generateCompletedField();
    const formatedFullData = field.formatData(fullData);

    setFullData(formatedFullData);
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

  if (modalVisible)
    return (
      <ModalWindow
        visible={modalVisible}
        onCancel={handleCancelClick}
        onSubmit={handleSubmitClick}
      />
    );

  return (
    <>
      {!data || loading ? (
        <Loader />
      ) : (
        <Formik
          initialValues={data}
          validateOnChange={false}
          enableReinitialize
          onSubmit={(values: FieldData) => {
            const isValid = JSON.stringify(values) === JSON.stringify(fullData);
            checkField(values);
            alert(isValid ? "Valid" : "Invalid");
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
    </>
  );
};
