import { Footer } from "../../shared/components/footer";
import { Header } from "../../shared/components/header";
import cl from "./game.module.css";
import { Field } from "../../shared/components/field";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { playfieldData } from "../../shared/utils/sudoku";
import { Loader } from "../../shared/components/loader";

export const Game = () => {
  // const dataEl = useRef<FieldData>();
  const [data, setData] = useState<FieldData>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = playfieldData();
    // dataEl.current = data;
    setData(data);
    setLoading(false);
  }, []);

  return (
    <div className={cl.game_page}>
      <Header />
      <main className={cl.content_container}>
        {!loading && (
          <Formik
            initialValues={data!}
            onSubmit={function () {
              console.log("check");
            }}
          >
            {({ values }) => (
              <>
                {loading ? (
                  <Loader />
                ) : (
                  <>
                    <Field data={data} />
                    <div className={cl.buttons_container}>
                      <button
                        className={cl.button}
                        // onClick={props.handleChange}
                        type="submit"
                      >
                        Check
                      </button>
                      <button className={cl.button}>Restart</button>
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
