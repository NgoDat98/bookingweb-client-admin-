import React, { useCallback, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import classe from "./AddRoom.module.css";
import { context } from "../../App";

const AddRoom = () => {
  const dulieuEdit = useContext(context).dataEditRoom;
  const [id, setId] = useState(dulieuEdit ? dulieuEdit._id : "");
  const [createdDate, setCreatedDate] = useState(
    dulieuEdit ? dulieuEdit.createdAt : new Date()
  );
  const [data, setdata] = useState(null);
  const [description, setDescription] = useState(
    dulieuEdit ? dulieuEdit.desc : ""
  );
  const [title, setTitle] = useState(dulieuEdit ? dulieuEdit.title : "");
  const [price, setPrice] = useState(dulieuEdit ? dulieuEdit.price : "");
  const [maxPeople, setMaxPeople] = useState(
    dulieuEdit ? dulieuEdit.maxPeople : ""
  );
  const [roomsArr, setRoomsArr] = useState(
    dulieuEdit ? dulieuEdit.roomNumbers : []
  );
  const [idHotel, setIdHotel] = useState("");

  //kiểm tra người dùng có để trống phần nào hay ko!
  const [checkInput, setCheckInput] = useState(true);

  const navigate = useNavigate();

  //get data tất cả các loại phòng đã tạo
  const getAllRooms = useCallback(async () => {
    const res = await axios.get("http://localhost:5000/hotel");
    const data = await res.data;
    setdata(data);
  }, []);

  //post data room mới vào trong mongodb
  const postNewRoom = async (
    id,
    title,
    price,
    maxPeople,
    desc,
    createdAt,
    updatedAt,
    roomNumbers,
    idHotel
  ) => {
    try {
      await axios.post("http://localhost:5000/room/add-room", {
        id,
        title,
        price,
        maxPeople,
        desc,
        createdAt,
        updatedAt,
        roomNumbers,
        idHotel,
      });
    } catch (err) {
      console.log(err);
    }
  };

  //post data edit room vào trong mongodb
  const postEditRoom = async (
    id,
    title,
    price,
    maxPeople,
    desc,
    createdAt,
    updatedAt,
    roomNumbers,
    idHotel
  ) => {
    try {
      await axios.post("http://localhost:5000/room/edit-room", {
        id,
        title,
        price,
        maxPeople,
        desc,
        createdAt,
        updatedAt,
        roomNumbers,
        idHotel,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllRooms();
  }, [getAllRooms]);

  const abc = [];

  for (let k in roomsArr) {
    abc.push(Number(roomsArr[k]));
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      description &&
      title &&
      price &&
      maxPeople &&
      description &&
      abc.length > 0
    ) {
      postNewRoom(
        id,
        title,
        price,
        maxPeople,
        description,
        createdDate,
        new Date(),
        abc,
        idHotel
      );
      window.location.replace("/rooms");
    } else {
      setCheckInput(false);
    }
  };

  const editHandler = (e) => {
    e.preventDefault();
    if (
      description &&
      title &&
      price &&
      maxPeople &&
      description &&
      abc.length > 0
    ) {
      postEditRoom(
        id,
        title,
        price,
        maxPeople,
        description,
        createdDate,
        new Date(),
        abc,
        idHotel
      );
      window.location.replace("/rooms");
    } else {
      setCheckInput(false);
    }
  };
  return (
    <React.Fragment>
      <div className={classe.font}>
        <h2>{dulieuEdit ? "Edit Room" : "Add New Room"}</h2>
      </div>
      <div className={classe.font}>
        <form onSubmit={dulieuEdit ? editHandler : submitHandler}>
          <div className={classe.formInput}>
            <div className={classe.div}>
              <input
                type="hidden"
                name="idRoom"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
              <input
                type="hidden"
                name="createdAt
"
                value={createdDate}
                onChange={(e) => setCreatedDate(e.target.value)}
              />
              <p>
                Title
                {!title && !checkInput && (
                  <span> (You do not have information title )</span>
                )}
              </p>
              <input
                className={classe.input1}
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
              <p>
                Price
                {!price && !checkInput && (
                  <span> (You do not have information price )</span>
                )}
              </p>
              <input
                type="number"
                className={classe.input1}
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </div>
            <div className={classe.div}>
              <p>
                Description
                {!description && !checkInput && (
                  <span> (You do not have information declaration )</span>
                )}
              </p>
              <input
                className={classe.input1}
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
              <p>
                Max People
                {!maxPeople && !checkInput && (
                  <span> (You do not have information maxPeople )</span>
                )}
              </p>
              <input
                type="number"
                className={classe.input1}
                onChange={(e) => setMaxPeople(e.target.value)}
                value={maxPeople}
              />
            </div>
          </div>
          <div className={classe.button}>
            <div>
              <p>
                Rooms
                {abc.length === 0 && !checkInput && (
                  <span> (You do not have information rooms)</span>
                )}
              </p>
              <input
                placeholder="give comma between room 
                number"
                onChange={(e) => setRoomsArr(String(e.target.value).split(","))}
                value={roomsArr}
              />
            </div>
            {!dulieuEdit && (
              <div>
                <p>choose a hotel</p>
                <select onChange={(e) => setIdHotel(e.target.value)}>
                  {data &&
                    data.map((item, index) => (
                      <option key={index} value={item._id}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}

            <button type="submit">{dulieuEdit ? "Edit" : "Send"} </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default AddRoom;
