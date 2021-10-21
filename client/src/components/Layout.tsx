import React from "react";

interface Props {
  children: React.ReactNode;
}
const Layout = ({ children }: Props) => {
  return (
    <div className="container w-screen flex flex-row justify-center items-center pt-2">
      <div className="max-w-screen-lg">{children}</div>
    </div>
  );
};

export default Layout;
