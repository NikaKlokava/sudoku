import { useCallback, useEffect, useState } from "react";
import { Formik } from "formik";
import cl from "./game.module.css";
import { Field } from "./components/field";
import { Footer, Header, Loader } from "../../shared/components";
import { ModalWindow } from "./components/modal";
import { NewGameBtn, SubmitBtn } from "./components/buttons";
import { getField } from "../../shared/utils/algorithm";
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

  useEffect(() => {
    loadGame(SizeOfField.Nine);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCancelClick = () => {
    setModalVisible(false);
  };
  const handleSubmitClick = (size: FieldSize) => {
    setModalVisible(false);
    loadGame(size);
  };

  if (loading || !data) return <Loader />;

  return (
    <>
      <ModalWindow
        visible={modalVisible}
        onCancel={handleCancelClick}
        onSubmit={handleSubmitClick}
      />
      <Formik
        initialValues={data!}
        validateOnChange={false}
        enableReinitialize
        onSubmit={(values: FieldData) => {
          const isValid = JSON.stringify(values) === JSON.stringify(fullData);
          alert(isValid ? "Valid" : "Invalid");
        }}
      >
        <>
          <Field data={data!} size={data!.length} />
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
    </>
  );
};

/** Модалка должна быть всегда в ДОМе */
/* <ModalWindow
        visible={visible} <!-- вот это флаг и будет отвечать за видимость
        onCancel добавь вот такой метод
        onSubmit и вот такой (он будет передавать тип поля)

        changeValue={handleChangeValueClick} это убраьт
        onStartClick={handleStartGameClick}
      /> */

//  Желательно не делать так
//            * Отдельно условие на показ формика
//            * Отдельно условие на показ лоадера.
//            * Лоадер сделать в виде ДИВа который в абсолюте занимает весь контейнер,
//            *  посередине индикатор загрузки,
//            *  а также делает затемнение заднего фона (opacity + black background).
//            *
//            * Это очень пригодится для нового алгоритма проверки данных
