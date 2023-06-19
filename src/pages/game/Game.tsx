import { Footer } from "../../shared/components/footer";
import { Header } from "../../shared/components/header";
import cl from "./game.module.css";
import { Field } from "../../shared/components/field";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import {
  formatData,
  generateCompletedField,
  removeRandomFieldNumbers,
} from "../../shared/utils/sudoku";
import { Loader } from "../../shared/components/loader";
import { MyButton } from "../../shared/components/button";

export const Game = () => {
  // const dataEl = useRef<FieldData>();
  const [data, setData] = useState<FieldData>();
  const [fullData, setFullData] = useState<FieldData>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fullData = generateCompletedField();
    setFullData(formatData(fullData));
    removeRandomFieldNumbers(fullData, 44);
    const data = formatData(fullData);
    setData(data);
    setLoading(false);
    // const data = playfieldData();
    // dataEl.current = data;
    // setData(data);
    // setLoading(false);
  }, []);

  return (
    <div className={cl.game_page}>
      <Header />
      <main className={cl.content_container}>
        {!loading && (
          <Formik
            initialValues={data!}
            onSubmit={(values: FieldData) => {
              const yes = JSON.stringify(values) === JSON.stringify(fullData);
              console.log(yes);
            }}
          >
            {({ handleSubmit }) => (
              <>
                {loading ? (
                  <Loader />
                ) : (
                  <>
                    <Field data={data} />
                    <div className={cl.buttons_container}>
                      <MyButton
                        onClick={handleSubmit}
                        type="submit"
                        text="Check"
                      />
                      <MyButton text="Restart" />
                    </div>
                  </>
                )}
              </>
            )}
          </Formik>
        )}
      </main>
      <Footer />
    </div>
  );
};
