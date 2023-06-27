declare type SquareType = Array<number[]>;
declare type SquareRowType = Array<SquareType>;
declare type FieldType = Array<SquareRowType>;


declare type CellItem = {
  num: number;
  row: number;
  column: number;
};
declare type SquareCells = CellItem[];

declare type FieldData = SquareCells[]

declare type TypeOfGame = "9x9" | "4x4" | "6x6"