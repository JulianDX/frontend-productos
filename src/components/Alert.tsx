import { PropsWithChildren } from "react";

export const Alert = ({ children }: PropsWithChildren) => {
  return <div className="text-white text-center rounded-md bg-red-700 py-2 mt-6 font-semibold">{children}</div>;
};
