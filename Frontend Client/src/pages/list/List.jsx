import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import axios from "axios";

import { useLocation } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [dataSearch, setDataSearch] = useState([]);

  const dateStart = String(
    date[0].startDate.getFullYear() +
      "-" +
      date[0].startDate.getMonth() +
      1 +
      "-" +
      date[0].startDate.getDate()
  );

  const dateEnd = String(
    date[0].endDate.getFullYear() +
      "-" +
      date[0].endDate.getMonth() +
      1 +
      "-" +
      date[0].endDate.getDate()
  );

  const getDateSearch = useCallback(async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/hotel/search?searchDestination=${destination}&DateStart=${dateStart}&DateEnd=${dateEnd}&People=${
          options.adult + options.children
        }&Room=${options.room}`
      );
      const data = await res.data;

      if (data) {
        setDataSearch(data);
      }
    } catch (e) {
      console.log(e);
    }
  }, [
    destination,
    dateStart.dateEnd,
    options.adult,
    options.children,
    options.room,
  ]);

  useEffect(() => {
    getDateSearch();
  }, [getDateSearch]);

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input placeholder={destination} type="text" />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                date[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDate([item.selection])}
                  minDate={new Date()}
                  ranges={date}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input type="number" className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input type="number" className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.adult}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={options.children}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.room}
                  />
                </div>
              </div>
            </div>
            <button>Search</button>
          </div>
          <div className="listResult">
            {dataSearch &&
              dataSearch.map((item, index) => (
                <SearchItem
                  key={index}
                  item={{
                    key: item.index,
                    idHotel: item.hotel._id,
                    name: item.hotel.name,
                    distance: item.hotel.distance,
                    tag: "123",
                    type: item.hotel.type,
                    description: item.hotel.desc,
                    free_cancel: item.hotel.featured,
                    price: item.hotel.cheapestPrice,
                    rate: item.hotel.rating,
                    rate_text: "abc",
                    img_url: item.hotel.photos[0],
                  }}
                  data={{ date, destination, options }}
                />
              ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default List;
