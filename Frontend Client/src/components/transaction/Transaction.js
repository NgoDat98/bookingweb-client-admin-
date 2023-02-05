import React, { useContext } from "react";

import classe from "./Transaction.module.css";
import { context } from "../../App";
import Navbar from "../navbar/Navbar";
import Header from "../header/Header";
import MailList from "../mailList/MailList";
import Footer from "../footer/Footer";

const Transaction = () => {
  const data = useContext(context).userArr;
  const data2 = useContext(context);
  const toDay = new Date();
  const stringToDay = String(
    toDay.getFullYear() + "-" + toDay.getMonth() + 1 + "-" + toDay.getDate()
  );

  if (data2.isTRansaction) {
    window.location.reload();
  }

  return (
    <div>
      <Navbar />
      <Header type={"list"} />
      <div className={classe.font}>
        <h2>Your Transactions</h2>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Hotel</th>
              <th>Room</th>
              <th>Date</th>
              <th>Price</th>
              <th>Payment Method</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.transaction.items.map((item, index) => (
                <tr className={classe.thead} key={index}>
                  <td>{index + 1}</td>
                  <td>{item.hotel}</td>
                  <td>
                    {item &&
                      item.room.map((i, id) => <span key={id}>{i.room},</span>)}
                  </td>
                  <td>
                    {item.date[0].startDate.slice(0, 10).replace(/-/g, "/") +
                      "-" +
                      item.date[0].endDate.slice(0, 10).replace(/-/g, "/")}
                  </td>
                  <td>{item.totalPrice}</td>
                  <td>{item.payment}</td>
                  <td>
                    <span
                      style={{
                        background:
                          new Date(item.date[0].startDate) >
                          new Date(stringToDay)
                            ? "#ec7a37b5"
                            : new Date(item.date[0].startDate) -
                                new Date(stringToDay) ===
                              0
                            ? "#08c721bf"
                            : "#9983a359",
                        color: "green",
                      }}
                      className={classe.status}
                    >
                      {new Date(item.date[0].startDate) > new Date(stringToDay)
                        ? "Booked"
                        : new Date(item.date[0].startDate) -
                            new Date(stringToDay) ===
                          0
                        ? "Checkin"
                        : "Checkout"}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
          <tfoot></tfoot>
        </table>
      </div>
      <MailList />
      <Footer />
    </div>
  );
};

export default Transaction;
