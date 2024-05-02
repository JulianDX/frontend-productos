import { safeParse } from "valibot";
import { DraftProductSchema } from "../types";

type dataType = {
  [k: string]: FormDataEntryValue;
};

export const addProduct = (data: dataType) => {
  console.log(data);
};
