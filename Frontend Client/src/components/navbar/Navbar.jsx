import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";
import { context } from "../../App";

const Navbar = () => {
  const data = useContext(context);

  const navigate = useNavigate();

  const isLogin = data.isLogin;
  const userArr = data.userArr;

  const HandlerLogin = () => {
    navigate("/", { replace: true });
  };
  const HandlerSignUp = () => {
    navigate("/signup", { replace: true });
  };

  const logOutHandler = () => {
    data.login(false);
    data.transmission([]);
    localStorage.removeItem("isLogin");
    navigate("/", { replace: true });
  };

  const transactionHandler = () => {
    window.location.replace("/transaction");
  };
  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo">Booking</span>
        {!isLogin && (
          <div className="navItems">
            <button className="navButton" onClick={HandlerSignUp}>
              Sign Up
            </button>
            <button className="navButton" onClick={HandlerLogin}>
              Login
            </button>
          </div>
        )}
        {isLogin && userArr && (
          <div className="navItems">
            <p className="navP">{userArr.username}</p>
            <button className="navButton" onClick={transactionHandler}>
              Transaction
            </button>
            <button className="navButton" onClick={logOutHandler}>
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
