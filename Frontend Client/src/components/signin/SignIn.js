import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { context } from "../../App";

import classe from "./signin.module.css";
import Login from "./Login";
import SigUp from "./SignUp";

const SignIn = () => {
  const data = useContext(context);

  const isLogin = data.isLogin;

  return (
    <React.Fragment>
      <div className={classe.signin}>
        {/* {location.pathname === "/login" && <Login />}
        {location.pathname === "/signup" && <SigUp />} */}
        <Routes>
          <Route path={isLogin ? "/login" : "/"} element={<Login />} />
          <Route path="/signup" element={<SigUp />} />
        </Routes>
      </div>
    </React.Fragment>
  );
};

export default SignIn;
