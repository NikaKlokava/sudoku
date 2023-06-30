import { useCallback, useState } from "react";
import { Formik } from "formik";
import cl from "./game.module.css";
import { Field } from "./components/field";
import { Footer, Header, Loader } from "../../shared/components";
import { ModalWindow } from "./components/modal";
import { NewGameBtn, SubmitBtn } from "./components/buttons";
import { FieldGenerator } from "../../shared/utils/algorythm";
import { SizeOfField } from "../../shared/utils/utils";

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
  const [fieldSize, setFieldSize] = useState<FieldSize>(SizeOfField.Nine);
  const [data, setData] = useState<FieldData>();
  const [fullData, setFullData] = useState<FieldData>();
  const [loading, setLoading] = useState<boolean>(true);

  const [startGame, setStartGame] = useState<boolean>(false);

  const loadGame = useCallback((size: FieldSize) => {
    const field = new FieldGenerator(size).getField();

    const fullData = field.generateCompletedField();
    const formatedFullData = field.formatData(fullData);

    setFullData(formatedFullData);
    field.removeRandomFieldNumbers(fullData);

    const data = field.formatData(fullData);
    setData(data);
    setLoading(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeValueClick = (size: FieldSize) => {
    setFieldSize(size);
  };

  const handleStartGameClick = () => {
    setStartGame(true);
    loadGame(fieldSize);
  };

  return (
    <>
      {startGame ? (
        <>
          {loading || !data ? (
            <Loader />
          ) : (
            <Formik
              initialValues={data}
              validateOnChange={false}
              enableReinitialize
              onSubmit={(values: FieldData) => {
                const isValid =
                  JSON.stringify(values) === JSON.stringify(fullData);
                alert(isValid ? "Valid" : "Invalid");
              }}
            >
              <>
                <Field data={data} size={fieldSize} />
                <div className={cl.buttons_container}>
                  <SubmitBtn />
                  <NewGameBtn
                    onPress={() => {
                      setData([]);
                      setLoading(true);
                      setStartGame(false);
                      loadGame(fieldSize);
                    }}
                  />
                </div>
              </>
            </Formik>
          )}
        </>
      ) : (
        <ModalWindow
          changeValue={handleChangeValueClick}
          onStartClick={handleStartGameClick}
        />
      )}
    </>
  );
};
