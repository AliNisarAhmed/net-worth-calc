import React from "react";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div
      className="
      container 
      sm:w-screen-sm 
      w-screen-lg max-w-screen-lg 
      mx-auto 
      flex flex-row justify-center items-center 
      pt-2 
    "
    >
      <div className="lg:w-full">{children}</div>
    </div>
  );
};

export default Layout;
