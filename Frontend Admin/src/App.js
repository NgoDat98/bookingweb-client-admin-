import React, { useState, useCallback, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import axios from "axios";
import Hotel from "./pages/hotel/Hotel";
import NewHotel from "./pages/newHotel/NewHotel";
import Rooms from "./pages/rooms/Rooms";
import NewRoom from "./pages/newRoom/NewRoom";
import TransactionList from "./pages/transaction/TransactionList";
import Navbar from "./components/navbar/Navbar";
import SignIn from "./components/signin/SignIn";

export const context = React.createContext();

function App() {
  const [userArr, setUserArr] = useState([]);
  const [isLogin, setIsLogin] = useState("");
  const [hotelArr, setHotelArr] = useState([]);
  const [dataEditRoom, setDataEditRoom] = useState(null);
  const [dataEditHotel, setDataEditHotel] = useState(null);

  const login = (e) => setIsLogin(e);
  const checkLogin = localStorage.getItem("isLoginAdimin");

  // lấy dữ liệu data edit hotel hoặc room
  const editRoom = (e) => setDataEditRoom(e);
  const editHotel = (e) => setDataEditHotel(e);

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
          userArr,
          login,
          isLogin,
          hotelArr,
          editHotel,
          editRoom,
          dataEditHotel,
          dataEditRoom,
        }}
      >
        {!isLogin && (
          <React.Fragment>
            <Navbar />
            <SignIn />
          </React.Fragment>
        )}
        {isLogin && (
          <Routes>
            <Route path="/*" element={<Dashboard />} />
            <Route path="/hotel/*" element={<Hotel />} />
            <Route path="/add-hotel/*" element={<NewHotel />} />
            <Route path="/rooms/*" element={<Rooms />} />
            <Route path="/add-room/*" element={<NewRoom />} />
            <Route path="/transaction/*" element={<TransactionList />} />
          </Routes>
        )}
      </context.Provider>
    </BrowserRouter>
  );
}

export default App;
