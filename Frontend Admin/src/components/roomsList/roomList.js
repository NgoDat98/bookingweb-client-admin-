import React, { useCallback, useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import classe from "./roomsList.module.css";
import { context } from "../../App";

const RoomsList = () => {
  const [data, setdata] = useState(null);
  const [checkBook, setCheckBook] = useState([]);
  const [test, setTest] = useState([]);
  const [dataEdit, setDataEdit] = useState(null);
  const [idRoom, setIdRoom] = useState("");

  const navigate = useNavigate();
  const dulieu = useContext(context).editRoom;

  const getAllHotel = useCallback(async () => {
    const res = await axios.get("http://localhost:5000/room");
    const data = await res.data;
    setdata(data);
  }, []);

  const postDeleteId = (roomId) => {
    return axios.post("http://localhost:5000/room/delete", { roomId });
  };

  const checkBookRoom = useCallback(async () => {
    const res = await axios.get("http://localhost:5000/user/alltransaction");
    const data = await res.data;
    setCheckBook(data);
  }, []);

  const getIdRoomEdit = useCallback(async () => {
    const res = await axios.get(
      `http://localhost:5000/room/roomid?idroom=${idRoom}`
    );
    const data = await res.data;
    setDataEdit(data);
  }, [idRoom]);

  useEffect(() => {
    getAllHotel();
    checkBookRoom();
    getIdRoomEdit();
    if (dataEdit) {
      dulieu(dataEdit);
      navigate("/Add-room", { replace: true });
    }
  }, [getAllHotel, checkBookRoom, getIdRoomEdit, dataEdit]);

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
    item.room.forEach((i) => test.push(i.id));
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
        <h2>Rooms List</h2>
        <button onClick={() => navigate("/Add-room", { replace: true })}>
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
              <span>Title</span>
            </th>
            <th>
              <span>Description</span>
            </th>
            <th>
              <span>Price</span>
            </th>
            <th>
              <span>Max People</span>
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
                <td style={{ width: "25%" }}>{item.title}</td>
                <td style={{ width: "25%" }}>{item.desc}</td>
                <td style={{ width: "10%" }}>{item.price}</td>
                <td style={{ width: "15%" }}>{item.maxPeople}</td>
                <td style={{ width: "10%", height: "25px" }}>
                  {!backToArray.find((x) => x === item._id) && (
                    <div className={classe.action}>
                      <button
                        className={classe.edit}
                        onClick={() => {
                          setIdRoom(item._id);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className={classe.delete}
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure you want to delete this room?"
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
                    <p>booked room!</p>
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

export default RoomsList;
