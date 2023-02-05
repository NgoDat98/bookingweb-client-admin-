import React, { useContext } from "react";
import "./navbar.css";
import { context } from "../../App";

const Navbar = () => {
  const data = useContext(context);

  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo">Admin Page</span>
      </div>
    </div>
  );
};

export default Navbar;
