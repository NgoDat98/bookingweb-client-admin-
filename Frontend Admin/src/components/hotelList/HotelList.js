import React, { useCallback, useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import classe from "./hotelList.module.css";
import { context } from "../../App";

const HotelList = () => {
  const [data, setdata] = useState(null);
  const [checkBook, setCheckBook] = useState([]);
  const [test, setTest] = useState([]);
  const [dataEdit, setDataEdit] = useState(null);
  const [idHotel, setIdHotel] = useState("");

  const navigate = useNavigate();
  const dulieu = useContext(context).editHotel;

  const getAllHotel = useCallback(async () => {
    const res = await axios.get("http://localhost:5000/hotel");
    const data = await res.data;
    setdata(data);
  }, []);

  const postDeleteId = (hotelId) => {
    return axios.post("http://localhost:5000/hotel/delete", { hotelId });
  };

  const checkBookRoom = useCallback(async () => {
    const res = await axios.get("http://localhost:5000/user/alltransaction");
    const data = await res.data;
    setCheckBook(data);
  }, []);

  const getIdHotelEdit = useCallback(async () => {
    const res = await axios.get(
      `http://localhost:5000/hotel/hotelid?idhotel=${idHotel}`
    );
    const data = await res.data;
    setDataEdit(data);
  }, [idHotel]);

  useEffect(() => {
    getAllHotel();
    checkBookRoom();
    if (idHotel) {
      getIdHotelEdit();
    }
    if (dataEdit) {
      dulieu(dataEdit);
      navigate("/Add-hotel", { replace: true });
    }
  }, [getAllHotel, checkBookRoom, getIdHotelEdit, idHotel, dataEdit]);

  const toDay = new Date();
  const stringToDay = String(
    toDay.getFullYear() + "-" + toDay.getMonth() + 1 + "-" + toDay.getDate()
  );

  const filterRooms = checkBook.filter(
    (x) =>
      new Date(x.date[0].endDate) > new Date(stringToDay) ||
      new Date(x.date[0].endDate) - new Date(stringToDay) === 0
  );

  filterRooms.forEach((item, index) => {
    test.push(item.idhotel);
  });

  // Step 1
  const uniqueSet = new Set(test);
  // Set { '🐣', 1, 2, 3 }

  // Step 2
  const backToArray = [...uniqueSet];
  // ['🐣', 1, 2, 3]

  return (
    <div className={classe.font}>
      <div className={classe.title}>
        <h2>Hotels List</h2>
        <button onClick={() => navigate("/Add-hotel", { replace: true })}>
          Add New
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>
              <span> ID</span>
            </th>
            <th>
              <span>Name</span>
            </th>
            <th>
              <span>Type</span>
            </th>
            <th>
              <span>Title</span>
            </th>
            <th>
              <span>City</span>
            </th>
            <th>
              <span>Action</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item, index) => (
              <tr className={classe.tbody} key={index}>
                <td style={{ width: "15%" }}>{item._id}</td>
                <td style={{ width: "25%" }}>{item.name}</td>
                <td style={{ width: "10%" }}>{item.type}</td>
                <td style={{ width: "25%" }}>{item.title}</td>
                <td style={{ width: "15%" }}>{item.city}</td>
                <td style={{ width: "10%" }}>
                  {!backToArray.find((x) => x === item._id) && (
                    <div className={classe.action}>
                      <button
                        className={classe.edit}
                        onClick={() => setIdHotel(item._id)}
                      >
                        Edit
                      </button>
                      <button
                        className={classe.delete}
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure you want to delete this hotel?"
                            ) === true
                          ) {
                            postDeleteId(item._id);
                            window.location.reload();
                          }
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                  {backToArray.find((x) => x === item._id) && (
                    <p>booked Hotel!</p>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
  );
};

export default HotelList;
