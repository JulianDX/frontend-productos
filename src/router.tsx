import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./layout/Layout";
import { loader as productsLoader, Products } from "./views/Products";
import { action as actionNewProduct, NewProduct } from "./views/NewProduct";
import {
  EditProduct,
  action as actionEditProduct,
  loader as editLoader,
} from "./views/EditProduct";
import { action as deleteAction } from "./services/ProductService";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Products />,
        loader: productsLoader,
      },
      {
        path: "products/new",
        element: <NewProduct />,
        action: actionNewProduct,
      },
      {
        path: "products/:id",
        element: <EditProduct />,
        loader: editLoader,
        action: actionEditProduct,
      },
      {
        path: "/products/delete/:id",
        action: deleteAction,
      },
    ],
  },
  /*  {
    path: "ejemplo",
    element <Ejemplo />
  } */
]);
