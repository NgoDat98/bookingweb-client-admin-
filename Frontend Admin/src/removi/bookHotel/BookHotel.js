import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useContext,
} from "react";
import { useNavigate } from "react-router-dom";
import { DateRange } from "react-date-range";
import classe from "./BookHotel.module.css";
import axios from "axios";
import { context } from "../../App";

const bookHotel = (props) => {
  const navigate = useNavigate();
  const dataUser = useContext(context).userArr;
  const data = useContext(context);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const [priceValue, setPriceValue] = useState(0);
  const [roomValue, setRoomValue] = useState([]);
  const [check, setCheck] = useState({ calculation: "", value: 0, room: 0 });
  const [method, setMethod] = useState("cash");
  const [fullName, setFullname] = useState(dataUser.fullName);
  const [email, setEmail] = useState(dataUser.email);
  const [phoneNumber, setPhoneNumber] = useState(dataUser.phoneNumber);

  if (priceValue < 0) {
    setPriceValue(0);
  }

  const test = (e) => {
    setCheck({
      calculation: e.target.checked ? "cộng" : "trừ",
      value: e.target.value,
      room: e.target.name,
    });
  };

  // lấy tổng price mà user đã book
  const abc = useCallback(() => {
    setPriceValue(
      priceValue +
        (check.calculation === "cộng"
          ? Number(check.value)
          : -Number(check.value))
    );
  }, [check.calculation, check.value, check.room]);

  // lấy các room  mà user đã book
  const rooms = useCallback(() => {
    if (check.calculation === "cộng") {
      roomValue.push({ price: check.value, room: check.room });
    }
    if (check.calculation === "trừ") {
      const findTru = roomValue.find(
        (x) => x.price === check.value && x.room === check.room
      );
      const filterCheckValue = roomValue.filter((x) => x !== findTru);
      setRoomValue(filterCheckValue);
    }
  }, [check.calculation, check.value, check.room]);

  const get_day_of_time = (d1, d2) => {
    let ms1 = d1.getTime();
    let ms2 = d2.getTime();
    return Math.ceil((ms2 - ms1) / (24 * 60 * 60 * 1000));
  };

  // check xem người dùng đã chọn ngày hay chưa!
  const chooseDate = useRef();
  useEffect(() => {
    chooseDate.current = date;
  }, []);
  const choose = date === chooseDate.current;

  const time =
    get_day_of_time(date[0].startDate, date[0].endDate) !== 0
      ? get_day_of_time(date[0].startDate, date[0].endDate) + 1
      : 1;

  useEffect(() => {
    props.checkDate(date);
    props.checkOptions(options);
    abc();
    rooms();
  }, [date, options, abc, rooms]);

  const day =
    String(date[0].endDate).slice(4, 10) +
    "," +
    String(date[0].endDate).slice(11, 16);

  //thêm thông tin transaction vào user

  const hotel = props.nameHotel;
  const room = roomValue;
  const totalPrice = priceValue;
  const payment = method;
  // const postTransaction = (userId, hotel, room, date, totalPrice, payment) => {
  //   return axios.post("http://localhost:5000/user/add-transaction", {
  //     userId,
  //     hotel,
  //     room,
  //     date,
  //     totalPrice,
  //     payment,
  //   });
  // };
  // sửa hoặc thêm thông tin (fullName, email, phoneNumber...) trong user và thêm thông tin trấnction
  const userId = dataUser._id;
  const username = dataUser.username;
  const password = dataUser.password;
  const transaction = dataUser.transaction;
  const isAdmin = dataUser.isAdmin;
  const updatedUser = (
    userId,
    username,
    password,
    fullName,
    phoneNumber,
    email,
    isAdmin,
    transaction,
    hotel,
    room,
    date,
    totalPrice,
    payment
  ) => {
    return axios.post("http://localhost:5000/user/edit-user", {
      userId,
      username,
      password,
      fullName,
      phoneNumber,
      email,
      isAdmin,
      transaction,
      hotel,
      room,
      date,
      totalPrice,
      payment,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    // await postTransaction(userId, hotel, room, date, totalPrice, payment);
    updatedUser(
      userId,
      username,
      password,
      fullName,
      phoneNumber,
      email,
      isAdmin,
      transaction,
      hotel,
      room,
      [
        {
          startDate: String(
            date[0].startDate.getFullYear() +
              "-" +
              date[0].startDate.getMonth() +
              1 +
              "-" +
              date[0].startDate.getDate()
          ),
          endDate: String(
            date[0].endDate.getFullYear() +
              "-" +
              date[0].endDate.getMonth() +
              1 +
              "-" +
              date[0].endDate.getDate()
          ),
        },
      ],
      totalPrice,
      payment
    );

    setDate([
      {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
    ]);
    setOptions({
      adult: 1,
      children: 0,
      room: 1,
    });
    setPriceValue(0);
    setRoomValue([]);
    setCheck({ calculation: "", value: 0, room: 0 });
    setMethod("cash");
    data.clickTransaction(true);
    navigate("/transaction", { replace: true });
    location.reload();
  };

  return (
    <React.Fragment>
      <form method="POSS" onSubmit={submitHandler}>
        <div className={classe.fontmain}>
          <div className={classe.fontdate1}>
            <h2>Dates</h2>
            <div className={classe.fontdate2}>
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setDate([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={date}
                className="date"
                minDate={new Date()}
              />
            </div>
          </div>
          <div className={classe.fontForm}>
            <h2>Reservi Info</h2>
            {/* <input type="hidden" name="userName" value={dataUser.username} />
            <input type="hidden" name="userName" value={dataUser._id} />
            <input type="hidden" name="userName" value={dataUser.password} /> */}
            <h4>Your Full Name:</h4>
            <input
              placeholder="   Full Name"
              value={fullName}
              onChange={(e) => setFullname(e.target.value)}
            />
            <h4>Your Email:</h4>
            <input
              placeholder="   Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <h4>Your Phone Number:</h4>
            <input
              placeholder="   Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <h4>Your Identity Card Number:</h4>
            <input placeholder="   Card Number" />
          </div>
        </div>
        {choose && (
          <h1>Please select a date to find hotels with availability!</h1>
        )}
        {!choose && (
          <div>
            <div className={classe.fontCheck}>
              <h2>Select Rooms</h2>
              <div className={classe.fontCheck1}>
                {props.dataRoom &&
                  props.dataRoom.map((items, index) => (
                    <div className={classe.fontCheckRoom} key={index}>
                      <div className={classe.fontCheckRoom1}>
                        <h3>{items.title}</h3>
                        <h4>Pay nothing until {day}</h4>
                        <p>Max people:{items.maxPeople}</p>
                        <h3>${items.price}</h3>
                      </div>
                      <div className={classe.fontCheckRoom2}>
                        {items.roomNumbers.map((item, index) => (
                          <span key={index}>
                            <p>{item}</p>
                            <input
                              type="checkbox"
                              value={items.price * time}
                              onChange={test}
                              name={item}
                            />
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className={classe.fontBill}>
              <h2>Total Bill: ${priceValue}</h2>
              <div className={classe.fontBill1}>
                <select onChange={(e) => setMethod(e.target.value)}>
                  <option>Select Payment Method</option>
                  <option value={"credit card"}>credit card</option>
                  <option value={"cash"}>cash</option>
                </select>
                <button>Reserve Now</button>
              </div>
            </div>
          </div>
        )}
      </form>
    </React.Fragment>
  );
};

export default bookHotel;
