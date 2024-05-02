import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./layout/Layout";
import { Products } from "./views/Products";
import { action as actionNewProduct, NewProduct } from "./views/NewProduct";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Products />,
      },
      {
        path: "products/new",
        element: <NewProduct />,
        action: actionNewProduct
      },
    ],
  },
 /*  {
    path: "ejemplo",
    element <Ejemplo />
  } */
]);
