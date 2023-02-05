import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";

import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SigUp = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [check, setCheck] = useState("");
  const [showPass, setShowPass] = useState(false);

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

  const postAccount = (
    username,
    password,
    fullName,
    phoneNumber,
    email,
    isAdmin
  ) => {
    return axios.post("http://localhost:5000/user/add-user", {
      username,
      password,
      fullName,
      phoneNumber,
      email,
      isAdmin,
    });
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const findName = check.filter((n) => {
        return n.username === name;
      });
      if (findName.length === 0) {
        alert("Sign Up Success!");
        window.location.replace("/");
        await postAccount(
          name,
          password,
          fullName,
          phoneNumber,
          email,
          isAdmin
        );
      } else {
        alert("Username available");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={submitHandler} method="POST">
      <h1>Sign Up</h1>
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
      <input
        type="hidden"
        name="fullName"
        value=""
        onChange={(e) => setFullname(e.target.value)}
      />
      <input
        type="hidden"
        name="phoneNumber"
        value=""
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <input
        type="hidden"
        name="email"
        value=""
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="hidden"
        name="isAdmin"
        value={false}
        onChange={(e) => setIsAdmin(e.target.value)}
      />
      <button>Create Account</button>
    </form>
  );
};

export default SigUp;
