import React, { useState, useCallback, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import axios from "axios";

export const context = React.createContext();

function App() {
  const [userArr, setUserArr] = useState([]);
  const [isLogin, setIsLogin] = useState("");
  const [hotelArr, setHotelArr] = useState([]);

  const transmission = (e) => setUserArr(e);
  const login = (e) => setIsLogin(e);

  const checkLogin = localStorage.getItem("isLogin");

  const getDataLogin = useCallback(async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/user/id?id=${checkLogin ? checkLogin : ""}`
      );
      const data = await res.data;
      setIsLogin(data.isLogin);
      setUserArr(data.data);
    } catch (e) {
      console.log(e);
    }
  }, [checkLogin]);

  const getDataHotel = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:5000/hotel");
      const data = await res.data;
      setHotelArr(data);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    getDataHotel();
    getDataLogin();
  }, [getDataHotel, getDataLogin]);

  return (
    <BrowserRouter>
      <context.Provider
        value={{
          transmission,
          userArr,
          login,
          isLogin,
          hotelArr,
        }}
      >
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/hotels" element={<List />} />
          <Route path="/hotels/:id" element={<Hotel />} />
        </Routes>
      </context.Provider>
    </BrowserRouter>
  );
}

export default App;
