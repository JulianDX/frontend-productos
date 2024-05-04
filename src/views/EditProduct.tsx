import {
  ActionFunctionArgs,
  Link,
  LoaderFunctionArgs,
  redirect,
  useActionData,
  useLoaderData,
} from "react-router-dom";
import { Form } from "react-router-dom";
import { Alert } from "../components/Alert";
import { editProduct, getProductByID } from "../services/ProductService";
import { ProductSchemaType } from "../types";

const availabilityOptions = [
  { name: "Available", value: true },
  { name: "Not Available", value: false },
];

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const data = Object.fromEntries(await request.formData());
  let error = "";

  if (Object.values(data).includes("")) {
    error = "Todos los campos son obligatorios";
  }

  if (error !== "") {
    return error;
  }

  const { id } = params;

  if (id) {
    await editProduct(data, +id);
  }

  return redirect("/");
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { id } = params;
  if (id) {
    const product = await getProductByID(+id);
    if (product !== "error") {
      return product;
    } else {
      return redirect("/");
    }
  }
};

export const EditProduct = () => {
  const error = useActionData() as string;
  const product = useLoaderData() as ProductSchemaType;

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-2xl font-extrabold text-slate-800 items-center">
          Edit Product
        </h2>
        <Link
          className="bg-cyan-800 hover:bg-cyan-700 rounded-md text-white font-semibold px-4 py-2"
          to={"/"}
        >
          View Products
        </Link>
      </div>
      {error && <Alert>{error}</Alert>}
      <Form className="mt-10" method="POST">
        <div className="mb-4">
          <label className="text-gray-800" htmlFor="name">
            Product Name:
          </label>
          <input
            id="name"
            type="text"
            className="mt-2 block w-full p-3 bg-gray-50"
            placeholder="Name of the Product"
            name="name"
            defaultValue={product.name}
          />
        </div>
        <div className="mb-4">
          <label className="text-gray-800" htmlFor="price">
            Price:
          </label>
          <input
            id="price"
            type="number"
            className="mt-2 block w-full p-3 bg-gray-50"
            placeholder="100, 200, 300.5 ..."
            name="price"
            defaultValue={product.price}
          />
        </div>
        <div className="mb-4">
          <label className="text-gray-800" htmlFor="availability">
            Disponibilidad:
          </label>
          <select
            id="availability"
            className="mt-2 block w-full p-3 bg-gray-50"
            name="availability"
            defaultValue={product?.availability.toString()}
          >
            {availabilityOptions.map((option) => (
              <option key={option.name} value={option.value.toString()}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Save Changes"
        />
      </Form>
    </>
  );
};
