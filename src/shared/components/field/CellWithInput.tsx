import {
  // useFormikContext,
  // withFormik,
  connect,
  FormikContextType,
} from "formik";
import { Component } from "react";
import cl from "./sudoku_field.module.css";

const possibleNumbers = Array.from({ length: 9 }, (_, i) => i + 1); // [1, ... , 9]

type Props = {
  formik: FormikContextType<any>;
  value: CellItem;
};

type State = { squareIndex: number; cellIndex: number };

class _CellWithInput extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      squareIndex:
        Math.floor(props.value.row / 3) * 3 +
        Math.floor(props.value.column / 3),
      cellIndex:
        (props.value.row - Math.floor(props.value.row / 3) * 3) * 3 -
        (Math.floor(props.value.column / 3) * 3 - props.value.column),
    };
  }

  shouldComponentUpdate(nextProps: any) {
    if (
      nextProps.formik.values[this.state.squareIndex][this.state.cellIndex] !==
      this.props.formik.values[this.state.squareIndex][this.state.cellIndex]
    )
      return true;

    return false;
  }

  handleInputChange(e: any) {
    if (e.target.value.length > 1) {
      e.target.value = e.target.value.slice(0, 1); //remove excess values
    } else if (!possibleNumbers.includes(+e.target.value)) {
      e.target.value = e.target.value.slice(0, 0); // remove letters, it can be only possible numbers
    }

    this.props.formik.setFieldValue(
      `${[this.state.squareIndex]}.${[this.state.cellIndex]}.num`,
      +e.target.value
    );
  }

  render() {
    return (
      <input
        className={cl.cell}
        type="text"
        autoComplete="off"
        name="[0][0].num"
        onChange={(e) => this.handleInputChange(e)}
      ></input>
    );
  }
}

//  {
//     squareIndex:
//       Math.floor(value.row / 3) * 3 +
//       Math.floor(value.column / 3),
//     cellIndex:
//       (value.row - Math.floor(value.row / 3) * 3) * 3 -
//       (Math.floor(value.column / 3) * 3 - value.column),
//   };

// if (e.target.value.length > 1) {
//     e.target.value = e.target.value.slice(0, 1); //remove excess values
//   } else if (!possibleNumbers.includes(+e.target.value)) {
//     e.target.value = e.target.value.slice(0, 0); // remove letters, it can be only possible numbers
//   }

// setFieldValue(
//     `${[this.state.squareIndex]}.${[this.state.cellIndex]}.num`,
//     e.target.value
//   );

//

//   <input
//     className={cl.cell}
//     type="text"
//     autoComplete="off"
//     name="[0][0].num"
//     onChange={(e) => handleInputChange(e)}
//   ></input>

// export default withFormik()()

export const CellWithInput = connect(_CellWithInput);
