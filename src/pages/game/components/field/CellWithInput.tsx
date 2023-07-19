import { connect, FormikContextType } from "formik";
import { Component } from "react";
import cl from "./sudoku_field.module.css";

type Props = {
  formik: FormikContextType<any>;
  value: CellItem;
  size: number;
};

type State = { squareIndex: number; cellIndex: number };

class _CellWithInput extends Component<Props, State> {
  possibleNumbers: number[];

  constructor(props: Props) {
    super(props);
    const game9x9 = props.size === 9;
    const game4x4 = props.size === 4;
    this.possibleNumbers = Array.from({ length: props.size }, (_, i) => i + 1); // [1, ... , 9]
    this.state = {
      squareIndex:
        Math.floor(props.value.row / (game9x9 ? 3 : 2)) * (game9x9 ? 3 : 2) +
        Math.floor(props.value.column / (game4x4 ? 2 : 3)),
      cellIndex:
        (props.value.row -
          Math.floor(props.value.row / (game9x9 ? 3 : 2)) * (game9x9 ? 3 : 2)) *
          (game4x4 ? 2 : 3) -
        (Math.floor(props.value.column / (game4x4 ? 2 : 3)) *
          (game4x4 ? 2 : 3) -
          props.value.column),
    };
  }

  shouldComponentUpdate(nextProps: Readonly<Props>): boolean {
    const { formik } = this.props;
    const { squareIndex, cellIndex } = this.state;

    const currentValue = nextProps.formik.values[squareIndex][cellIndex];
    const prevValue = formik.values[squareIndex][cellIndex];

    if (currentValue !== prevValue) return true;
    return false;
  }

  componentDidUpdate(prevProps: Readonly<Props>): void {
    const { formik } = this.props;
    const { squareIndex, cellIndex } = this.state;

    const prevValue = prevProps.formik.values[squareIndex][cellIndex];
    const currentValue = formik.values[squareIndex][cellIndex];

    if (currentValue !== prevValue) {
      localStorage.setItem("filledData", JSON.stringify(formik.values));
    }
  }

  handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value.length > 1) {
      e.target.value = e.target.value.slice(0, 1); //remove excess values
    } else if (!this.possibleNumbers.includes(+e.target.value)) {
      e.target.value = e.target.value.slice(0, 0); // remove letters, it can be only possible numbers
    }

    this.props.formik.setFieldValue(
      `${[this.state.squareIndex]}.${[this.state.cellIndex]}.num`,
      +e.target.value
    );
  }

  render() {
    const { formik } = this.props;
    const { squareIndex, cellIndex } = this.state;
    const value =
      formik.values[squareIndex][cellIndex].num === 0
        ? ""
        : formik.values[squareIndex][cellIndex].num;
    return (
      <input
        className={cl.cell}
        type="text"
        autoComplete="off"
        name={`${squareIndex}${cellIndex}.num`}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          this.handleInputChange(e);
          formik.setFieldTouched(`${squareIndex}${cellIndex}.num`);
        }}
        onBlur={formik.handleBlur}
      ></input>
    );
  }
}

export const CellWithInput = connect(_CellWithInput);
