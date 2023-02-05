import React, { useContext } from "react";

import Navbar from "../../components/navbar/Navbar";

import SignIn from "../../components/signin/SignIn";
import classed from "./rooms.module.css";
import { context } from "../../App";
import Sidebar from "../../components/sidebar/Sidebar";
import RoomsList from "../../components/roomsList/roomList";

const Rooms = () => {
  const data = useContext(context);

  const isLogin = data.isLogin;
  return (
    <div>
      {!isLogin && (
        <React.Fragment>
          <Navbar />
          <SignIn />
        </React.Fragment>
      )}
      {isLogin && (
        <React.Fragment>
          <Navbar />
          <div className={classed.font}>
            <div className={classed.div2}>
              <Sidebar />
            </div>
            <div className={classed.div3}>
              <RoomsList />
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default Rooms;
