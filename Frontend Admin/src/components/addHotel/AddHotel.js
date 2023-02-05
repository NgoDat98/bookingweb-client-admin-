import React, { useCallback, useEffect, useState, useContext } from "react";
import axios from "axios";

import classe from "./AddHotel.module.css";
import { context } from "../../App";

const AddHotel = () => {
  const dulieuEdit = useContext(context).dataEditHotel;
  const [data, setdata] = useState(null);
  const [check, setCheck] = useState({ calculation: "", id: "" });
  const [roomArr, setRoomArr] = useState([]);

  const [id, setId] = useState(dulieuEdit ? dulieuEdit._id : "");
  const [name, setName] = useState(dulieuEdit ? dulieuEdit.name : "");
  const [city, setCity] = useState(dulieuEdit ? dulieuEdit.city : "");
  const [distance, setDistance] = useState(
    dulieuEdit ? dulieuEdit.distance : ""
  );
  const [description, setDescription] = useState(
    dulieuEdit ? dulieuEdit.desc : ""
  );
  const [type, setType] = useState(dulieuEdit ? dulieuEdit.type : "");
  const [address, setAddress] = useState(dulieuEdit ? dulieuEdit.address : "");
  const [title, setTitle] = useState(dulieuEdit ? dulieuEdit.title : "");
  const [price, setPrice] = useState(dulieuEdit ? dulieuEdit.cheapestPrice : 0);
  const [featured, setFeatured] = useState(
    dulieuEdit ? dulieuEdit.featured : false
  );
  const [images, setImages] = useState(dulieuEdit ? dulieuEdit.photos : []);

  //kiểm tra người dùng có để trống phần nào hay ko!
  const [checkInput, setCheckInput] = useState(true);

  //get data tất cả các loại phòng đã tạo
  const getAllRooms = useCallback(async () => {
    const res = await axios.get("http://localhost:5000/room");
    const data = await res.data;
    setdata(data);
  }, []);
  console.log(id);

  // post dữ liệu lên phía server để tạo hotel trên mongoDb
  const postDataNewHotel = async (
    name,
    city,
    type,
    title,
    cheapestPrice,
    address,
    distance,
    photos,
    desc,
    rating,
    featured,
    room
  ) => {
    try {
      await axios.post("http://localhost:5000/hotel/add-new-hotels", {
        name,
        city,
        type,
        title,
        cheapestPrice,
        address,
        distance,
        photos,
        desc,
        rating,
        featured,
        room,
      });
    } catch (err) {
      console.log(err);
    }
  };

  // action thêm hoặc bỏ data rooms đã chọn
  const getValueRoom = (e) => {
    setCheck({
      calculation: e.target.checked ? "cộng" : "trừ",
      id: e.target.value,
      price: e.target.name,
    });
  };

  const postEditHotel = async (
    id,
    name,
    city,
    type,
    title,
    cheapestPrice,
    address,
    distance,
    photos,
    desc,
    rating,
    featured,
    room
  ) => {
    try {
      await axios.post("http://localhost:5000/hotel/edit-hotel", {
        id,
        name,
        city,
        type,
        title,
        cheapestPrice,
        address,
        distance,
        photos,
        desc,
        rating,
        featured,
        room,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const rooms = useCallback(() => {
    if (check.calculation === "cộng") {
      roomArr.push({ id: check.id, price: check.price });
    }
    if (check.calculation === "trừ") {
      const findTru = roomArr.find((x) => x.id === check.id);
      const filterCheckValue = roomArr.filter((x) => x !== findTru);
      setRoomArr(filterCheckValue);
    }
  }, [check.calculation, check.id, check.price]);

  const postRooms = roomArr && roomArr.map((item, index) => item.id);

  const cheapestPrice = roomArr.sort(function (a, b) {
    return a.price - b.price;
  });

  useEffect(() => {
    getAllRooms();
    rooms();
    if (cheapestPrice.length > 0) {
      setPrice(cheapestPrice[0].price);
    }
  }, [getAllRooms, rooms]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      name &&
      city &&
      distance &&
      description &&
      type &&
      address &&
      title &&
      price &&
      roomArr.length > 0 &&
      images.length > 0
    ) {
      postDataNewHotel(
        name,
        city,
        type,
        title,
        price,
        address,
        distance,
        images,
        description,
        Number((Math.random() + 4).toFixed(1)),
        featured,
        postRooms
      );
      window.location.replace("/hotel");
    } else {
      return setCheckInput(false);
    }
  };

  const EditHandler = (e) => {
    e.preventDefault();
    if (
      name &&
      city &&
      distance &&
      description &&
      type &&
      address &&
      title &&
      price &&
      roomArr.length > 0 &&
      images.length > 0
    ) {
      postEditHotel(
        id,
        name,
        city,
        type,
        title,
        price,
        address,
        distance,
        images,
        description,
        Number((Math.random() + 4).toFixed(1)),
        featured,
        postRooms
      );
      window.location.replace("/hotel");
    } else {
      return setCheckInput(false);
    }
  };

  return (
    <React.Fragment>
      <div className={classe.font}>
        <h2>{dulieuEdit ? "Edit Hotel" : "Add New Hotel"}</h2>
      </div>
      <div className={classe.font}>
        <form onSubmit={dulieuEdit ? EditHandler : submitHandler}>
          <div className={classe.formInput}>
            <div className={classe.div}>
              <input type="hidden" name="idHotel" value={id} />
              <p>
                Name
                {!name && !checkInput && (
                  <span> (You have not entered hotel name information)</span>
                )}
              </p>
              <input
                className={classe.input1}
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <p>
                City
                {!city && !checkInput && (
                  <span> (You have not entered city information)</span>
                )}
              </p>
              <input
                className={classe.input1}
                onChange={(e) => setCity(e.target.value)}
                value={city}
              />
              <p>
                Distance from city Center
                {!distance && !checkInput && (
                  <span>
                    {" "}
                    (You have not entered distance from city center information)
                  </span>
                )}
              </p>
              <input
                className={classe.input1}
                onChange={(e) => setDistance(e.target.value)}
                value={distance}
              />
              <p>
                Description
                {!description && !checkInput && (
                  <span>
                    {" "}
                    (You have not entered description hotel information)
                  </span>
                )}
              </p>
              <input
                className={classe.input1}
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
              <p>
                Images
                {images.length === 0 && !checkInput && (
                  <span> (You have not added a hotel image link)</span>
                )}
              </p>
              <input
                placeholder="give comma between  hotel image link"
                onChange={(e) => setImages(String(e.target.value).split(","))}
                value={images}
              />
            </div>
            <div className={classe.div}>
              <p>
                Type
                {!type && !checkInput && (
                  <span> (You have not entered hotel Type information)</span>
                )}
              </p>
              <input
                className={classe.input1}
                onChange={(e) => setType(e.target.value)}
                value={type}
              />
              <p>
                Address
                {!address && !checkInput && (
                  <span> (You have not entered hotel Address information)</span>
                )}
              </p>
              <input
                className={classe.input1}
                onChange={(e) => setAddress(e.target.value)}
                value={address}
              />
              <p>
                Title
                {!title && !checkInput && (
                  <span> (You have not entered hotel Title information)</span>
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
                  <span> (You have not entered hotel Price information)</span>
                )}
              </p>
              <input
                className={classe.input1}
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
              <p>Featured</p>
              <select
                onChange={(e) =>
                  e.target.value === "true"
                    ? setFeatured(true)
                    : setFeatured(false)
                }
              >
                {!featured && (
                  <React.Fragment>
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                  </React.Fragment>
                )}
                {featured && (
                  <React.Fragment>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </React.Fragment>
                )}
              </select>
            </div>
          </div>
          <div className={classe.rooms}>
            <p>
              Rooms
              {roomArr.length === 0 && !checkInput && (
                <span> (You have not entered your hotel room information)</span>
              )}
            </p>
            <div className={classe.room}>
              {data &&
                data.map((item, index) => (
                  <div className={classe.check} key={index}>
                    <input
                      type="checkbox"
                      id={index}
                      value={item._id}
                      onChange={getValueRoom}
                      name={item.price}
                    />
                    <p>{item.title}</p>
                  </div>
                ))}
            </div>
          </div>
          <div className={classe.button}>
            <button type="submit">{dulieuEdit ? "Edit" : "Send"}</button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default AddHotel;
