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

