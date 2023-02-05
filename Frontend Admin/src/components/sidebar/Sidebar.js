import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import classe from "./Sidebar.module.css";
import { context } from "../../App";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBorderAll,
  faUserAlt,
  faShop,
  faWindowMaximize,
  faTruck,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const navigate = useNavigate();
  const data = useContext(context);

  const goDashboard = () => (navigate("/"), { replace: true });
  const goHotel = () => (navigate("/hotel"), { replace: true });
  const goAddHotel = () => navigate("/Add-hotel", { replace: true });
  const goRooms = () => navigate("/rooms", { replace: true });
  const goAddRoom = () => navigate("/Add-room", { replace: true });
  const goTransaction = () => navigate("/transaction", { replace: true });

  const logOutHandler = () => {
    data.login(false);
    localStorage.removeItem("isLoginAdimin");
    window.location.replace("/");
  };
  return (
    <div className={classe.font}>
      <div>
        <h2>MAIN</h2>
        <p onClick={goDashboard}>
          <FontAwesomeIcon color="#6836ccbf" icon={faBorderAll} />
          Dashboard
        </p>
      </div>
      <div>
        <h2>LISTS</h2>
        <p>
          <FontAwesomeIcon color="#6836ccbf" icon={faUserAlt} /> Users
        </p>
        <p onClick={goHotel}>
          <FontAwesomeIcon color="#6836ccbf" icon={faShop} /> Hotels
        </p>
        <p onClick={goRooms}>
          <FontAwesomeIcon color="#6836ccbf" icon={faWindowMaximize} />
          Rooms
        </p>
        <p onClick={goTransaction}>
          <FontAwesomeIcon color="#6836ccbf" icon={faTruck} /> Transactions
        </p>
      </div>
      <div>
        <h2>NEW</h2>
        <p onClick={goAddHotel}>
          <FontAwesomeIcon color="#6836ccbf" icon={faShop} /> New Hotel
        </p>
        <p onClick={goAddRoom}>
          <FontAwesomeIcon color="#6836ccbf" icon={faWindowMaximize} /> New Room
        </p>
      </div>
      <div>
        <h2>USER</h2>
        <p onClick={logOutHandler}>
          <FontAwesomeIcon color="#6836ccbf" icon={faRightFromBracket} />
          Logout
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
