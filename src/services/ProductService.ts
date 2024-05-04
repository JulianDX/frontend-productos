import { safeParse } from "valibot";
import { DraftProductSchema, ProductSchema, ProductsSchema } from "../types";
import axios from "axios";
import { ActionFunctionArgs, redirect } from "react-router-dom";

type dataType = {
  [k: string]: FormDataEntryValue;
};

export const addProduct = async (data: dataType) => {
  const product = {
    name: data.name,
    price: +data.price,
  };
  const validate = safeParse(DraftProductSchema, product);
  if (validate.success) {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/products`, {
        name: validate.output.name,
        price: validate.output.price,
      });
    } catch (error) {
      console.log(error);
    }
  }
};

export const editProduct = async (data: dataType, id: number) => {
  const product = {
    id,
    name: data.name,
    price: +data.price,
    availability: data.availability === "true",
  };
  const validate = safeParse(ProductSchema, product);
  if (validate.success) {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/products/update/${id}`,
        {
          name: validate.output.name,
          price: validate.output.price,
          availability: validate.output.availability,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
};

export const getProducts = async () => {
  try {
    const {
      data: { data: result },
    } = await axios(`${import.meta.env.VITE_BACKEND_URL}/products`);
    const validate = safeParse(ProductsSchema, result);
    if (validate) {
      return validate.output;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getProductByID = async (id: number) => {
  try {
    const {
      data: { data: result },
    } = await axios(`${import.meta.env.VITE_BACKEND_URL}/products/${id}`);
    const validate = safeParse(ProductSchema, result);
    if (validate) {
      return validate.output;
    }
  } catch (error) {
    return "error";
  }
};

export const action = async ({ params }: ActionFunctionArgs) => {
  const { id } = params;
  try {
    await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/products/delete/${id}`);
    return redirect("/");
  } catch (error) {
    return "error";
  }
};
