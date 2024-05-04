import { Form, Link, useLoaderData } from "react-router-dom";
import { ProductsSchemaType } from "../types";
import { getProducts } from "../services/ProductService";

export const loader = () => {
  return getProducts();
};

export const Products = () => {
  const products = useLoaderData() as ProductsSchemaType;

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-2xl font-extrabold text-slate-800 items-center">
          Products
        </h2>
        <Link
          className="bg-cyan-800 hover:bg-cyan-700 rounded-md text-white font-semibold px-4 py-2"
          to={"/products/new"}
        >
          Add New Product
        </Link>
      </div>
      <div className="p-2">
        <table className="w-full mt-5 table-auto">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-2">Product</th>
              <th className="p-2">Price</th>
              <th className="p-2">Availability</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b text-center">
                <td className="p-3 text-lg text-gray-800">{product.name}</td>
                <td className="p-3 text-lg text-gray-800">{product.price}</td>
                <td className="p-3 text-lg text-gray-800">
                  {`${product.availability ? "Available" : "Not Available"}`}
                </td>
                <td className="p-3 text-lg text-gray-800 flex justify-center gap-5">
                  <Link
                    to={`/products/${product.id}`}
                    className="bg-blue-600 w-full py-1 cursor-pointer font-semibold text-white rounded-md"
                    type="submit"
                  >
                    Edit
                  </Link>
                  <Form className="w-full" method="POST" action={`/products/delete/${product.id}`}>
                    <input
                      className="bg-red-600 w-full py-1 cursor-pointer font-semibold text-white rounded-md"
                      type="submit"
                      value={"Delete"}
                    />
                  </Form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
