import React from "react";
import Menu from "./Menu";

const Navbar: React.FC = () => {
  return (
    <nav className="w-full flex flex-col gap-4 py-4 px-1">
      <Menu />
    </nav>
  );
};

export default Navbar;
