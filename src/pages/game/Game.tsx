import { useCallback, useEffect, useState } from "react";
import { Formik, useFormikContext } from "formik";

import { Footer } from "../../shared/components/footer";
import { Header } from "../../shared/components/header";
import { Loader } from "../../shared/components/loader";
import {
  formatData,
  generateCompletedField,
  removeRandomFieldNumbers,
} from "../../shared/utils/sudoku";
import cl from "./game.module.css";
import { Field } from "../../shared/components/field";
import { SubmitBtn } from "../../shared/components/submitBtn";
import { MyButton } from "../../shared/components/button";
import { useLocation, useNavigate } from "react-router-dom";

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
  const location = useLocation();
  const [data, setData] = useState<FieldData>();
  const [fullData, setFullData] = useState<FieldData>();

  const [loading, setLoading] = useState(true);

  const loadGame = useCallback(() => {
    const fullData = generateCompletedField(location.state); // get full sudoku
    setFullData(formatData(fullData, location.state)); // format data for further comparison
    removeRandomFieldNumbers(fullData, 7, location.state); // remove numbers from full field
    const data = formatData(fullData, location.state); // get playfield data

    setData(data);
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading || !data) return <Loader />;

  return (
    <Formik
      initialValues={data}
      validateOnChange={false}
      enableReinitialize
      onSubmit={(values: FieldData) => {
        const isValid = JSON.stringify(values) === JSON.stringify(fullData);
        alert(isValid ? "Valid" : "Invalid");
      }}
    >
      <>
        <Field data={data} game={location.state} />
        <div className={cl.buttons_container}>
          <SubmitBtn />
          <NewGameBtn
            onPress={() => {
              setData([]);
              setLoading(true);
              loadGame();
            }}
          />
        </div>
      </>
    </Formik>
  );
};

const NewGameBtn = ({ onPress }: { onPress: VoidFunction }) => {
  const { resetForm } = useFormikContext();
  const navigate = useNavigate();

  return (
    <MyButton
      text="New Game"
      onClick={() => {
        resetForm();
        onPress();
        navigate("/sudoku");
      }}
    />
  );
};
