import { Field4x4 } from "./field-4x4";
import { Field6x6 } from "./field-6x6";
import { Field9x9 } from "./field-9x9";
import { SizeOfField } from "./utils";

export const getField = (size: FieldSize) => {
  if (size === SizeOfField.Nine) {
    return new Field9x9();
  }
  if (size === SizeOfField.Six) {
    return new Field6x6();
  }
  return new Field4x4();
};
