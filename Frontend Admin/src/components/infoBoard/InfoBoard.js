import React, { useState, useCallback, useEffect } from "react";

import axios from "axios";
import classe from "./InfoBoard.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserAlt,
  faCartShopping,
  faCircleDollarToSlot,
  faMoneyBillTransfer,
} from "@fortawesome/free-solid-svg-icons";

const InfoBoard = () => {
  const [check, setCheck] = useState("");
  const [transaction, setTransaction] = useState(null);
  const checkAccount = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:5000/user/user");
      const data = await res.data;
      setCheck(data);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const test = [];
  const filterTransaction =
    check &&
    check.forEach((item, index) =>
      check[index].transaction.items.forEach((items, index) => test.push(items))
    );

  filterTransaction && filterTransaction();

  useEffect(() => {
    checkAccount();
  }, [checkAccount]);

  const reducePrice =
    test &&
    test.reduce((total, transaction) => total + transaction.totalPrice, 0);

  function format2(n, currency) {
    return currency + n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
  }

  return (
    <div className={classe.font}>
      <div className={classe.div}>
        <h2>USERS</h2>
        <h3>{check.length}</h3>
        <span style={{ background: "#fca8a8" }}>
          <FontAwesomeIcon color="#e45454" icon={faUserAlt} />
        </span>
      </div>
      <div className={classe.div}>
        <h2>ORDERS</h2>
        <h3>{test.length}</h3>
        <span style={{ background: "rgb(242 237 176 / 67%)" }}>
          <FontAwesomeIcon color="#e0bc4d" icon={faCartShopping} />
        </span>
      </div>
      <div className={classe.div}>
        <h2>EARNINGS</h2>
        <h3>{format2(reducePrice, "$")}</h3>
        <span style={{ background: "#a2e29dab" }}>
          <FontAwesomeIcon color="green" icon={faCircleDollarToSlot} />
        </span>
      </div>
      <div className={classe.div}>
        <h2>BALANCE</h2>
        <h3>{format2(reducePrice / 12, "$")}</h3>
        <span style={{ background: "#e2a0ff7d" }}>
          <FontAwesomeIcon color="#be52f3" icon={faMoneyBillTransfer} />
        </span>
      </div>
    </div>
  );
};

export default InfoBoard;
