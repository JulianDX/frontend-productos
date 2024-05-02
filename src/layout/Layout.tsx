import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <>
      <nav>
        <div className="bg-slate-800 py-4">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-white text-3xl font-bold">Products</h1>
          </div>
        </div>
      </nav>
      <main className="max-w-3xl mx-auto bg-white shadow p-6 mt-10">
        <Outlet />
      </main>
    </>
  );
};
