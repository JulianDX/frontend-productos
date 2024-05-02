import { Link } from "react-router-dom";

export const Products = () => {
  return (
    <div className="flex justify-between">
      <h2 className="text-2xl font-extrabold text-slate-800 items-center">Products</h2>
      <Link className="bg-cyan-800 hover:bg-cyan-700 rounded-md text-white font-semibold px-4 py-2" to={"/products/new"}>Add New Product</Link>
    </div>
  );
};
