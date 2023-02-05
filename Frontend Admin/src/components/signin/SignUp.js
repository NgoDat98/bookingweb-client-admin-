import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SigUp = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(true);
  const [check, setCheck] = useState("");
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
        navigate("/", { replace: true });
        window.location.reload();
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
        type="text"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
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
