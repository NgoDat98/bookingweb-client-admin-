import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import classe from "./Transaction.module.css";

const Transaction = () => {
  const [data, setdata] = useState(null);
  const [page, setPage] = useState(1);

  const location = useLocation();

  const getAllTransaction = useCallback(async () => {
    const res = await axios.get(
      `http://localhost:5000/user/transaction?page=${page}`
    );
    const data = await res.data;
    setdata(data);
  }, [page]);

  const nextHandeler = () => setPage(page + 1);
  const comeBackHandeler = () => setPage(page - 1);

  useEffect(() => {
    getAllTransaction();
  }, [getAllTransaction]);

  const toDay = new Date();
  const stringToDay = String(
    toDay.getFullYear() + "-" + toDay.getMonth() + 1 + "-" + toDay.getDate()
  );

  return (
    <div className={classe.font}>
      {location.pathname === "/" && <h2>Latest Transactions</h2>}
      {location.pathname === "/transaction" && <h2>Transactions List</h2>}
      <table>
        <thead>
          <tr>
            <th>
              <span> ID</span>
            </th>
            <th>
              <span>User</span>
            </th>
            <th>
              <span>Hotel</span>
            </th>
            <th>
              <span>Room</span>
            </th>
            <th>
              <span>Date</span>
            </th>
            <th>
              <span>Price</span>
            </th>
            <th>
              <span>Payment Method</span>
            </th>
            <th>
              <span>Status</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.results.map((item, index) => (
              <tr className={classe.thead} key={index}>
                <td style={{ width: "15%" }}>{item._id}</td>
                <td style={{ width: "10%" }}>{item.username}</td>
                <td style={{ width: "20%" }}>{item.hotel}</td>
                <td style={{ width: "10%" }}>
                  {item &&
                    item.room.map((i, id) => <span key={id}>{i.room},</span>)}
                </td>
                <td style={{ width: "15%" }}>
                  {item.date[0].startDate.slice(0, 10).replace(/-/g, "/") +
                    "-" +
                    item.date[0].endDate.slice(0, 10).replace(/-/g, "/")}
                </td>
                <td style={{ width: "5%" }}>{item.totalPrice}</td>
                <td style={{ width: "15%" }}>{item.payment}</td>
                <td style={{ width: "10%" }}>
                  <span
                    style={{
                      background:
                        new Date(item.date[0].startDate) > new Date(stringToDay)
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
      <div className={classe.paging}>
        <div>
          <p>
            {data && data.page}-{data && data.total_pages} of{" "}
            {data && data.total_pages}
          </p>
        </div>
        <div className={classe.paging2}>
          {page <= 1 ? (
            <button style={{ color: "#d0d1d1", cursor: "default" }}>
              {"<"}
            </button>
          ) : (
            <button className={classe.button} onClick={comeBackHandeler}>
              {"<"}
            </button>
          )}
          <p>{data && data.page}</p>
          {data && page >= data.total_pages ? (
            <button style={{ color: "#d0d1d1", cursor: "default" }}>
              {">"}
            </button>
          ) : (
            <button className={classe.button} onClick={nextHandeler}>
              {">"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transaction;
