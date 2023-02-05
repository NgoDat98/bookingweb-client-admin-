import React, { useContext } from "react";

import Navbar from "../../components/navbar/Navbar";

import SignIn from "../../components/signin/SignIn";
import classed from "./transactionlist.module.css";
import { context } from "../../App";
import Sidebar from "../../components/sidebar/Sidebar";
import Transaction from "../../components/transaction/Transaction";

const TransactionList = () => {
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
              <Transaction />
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default TransactionList;
