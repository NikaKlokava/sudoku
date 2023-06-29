import { useCallback, useState } from "react";
import { Formik } from "formik";
import {
  formatData,
  generateCompletedField,
  removeRandomFieldNumbers,
} from "../../shared/utils/sudoku";
import cl from "./game.module.css";
import { Field } from "./components/field";
import { Footer, Header, Loader } from "../../shared/components";
import { ModalWindow } from "./components/modal";
import { NewGameBtn, SubmitBtn } from "./components/buttons";

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
  const [fieldSize, setFieldSize] = useState<TypeOfGame>("9x9");
  const [startGame, setStartGame] = useState(false);
  const [data, setData] = useState<FieldData>();
  const [fullData, setFullData] = useState<FieldData>();
  const [loading, setLoading] = useState(true);

  const loadGame = useCallback((size: TypeOfGame) => {
    const fullData = generateCompletedField(size);
    const formatedFullData = formatData(fullData, size);
    setFullData(formatedFullData);

    removeRandomFieldNumbers(
      fullData,
      size === "9x9" ? 44 : size === "6x6" ? 15 : 7,
      size
    );
    const data = formatData(fullData, size);
    setData(data);
    setLoading(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeValueClick = (size: TypeOfGame) => {
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
                <Field data={data} game={fieldSize} />
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
