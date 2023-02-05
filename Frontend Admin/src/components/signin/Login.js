import React, { useState, useCallback, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { context } from "../../App";

import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Login = (s) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [check, setCheck] = useState("");
  const [showPass, setShowPass] = useState(false);

  const data = useContext(context);

  const navigate = useNavigate();

  const checkAccount = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:5000/user/user");
      const data = await res.data;
      setCheck(data);
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    checkAccount();
  }, [checkAccount]);

  const submitHandler = (e) => {
    e.preventDefault();
    const findUser = check.find((u) => {
      return (
        u.username === name && u.password === password && u.isAdmin === true
      );
    });
    if (findUser) {
      data.login(true);
      localStorage.setItem("isLoginAdimin", findUser._id);
      navigate("/", { replace: true });
    } else {
      alert("Incorrect account or password");
    }
  };
  return (
    <form method="GEt" onSubmit={submitHandler}>
      <h1>Login</h1>
      <input
        type="text"
        name="username"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type={showPass ? "text" : "password"}
        name="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <FontAwesomeIcon
        icon={faEye}
        style={{
          margin: "10px 0 10px 0",
          padding: "10px 0 10px 0",
          position: "fixed",
          textAlign: "center",
          height: "3%",
        }}
        onClick={() => setShowPass(!showPass)}
      />
      <button>Login</button>
    </form>
  );
};

export default Login;
