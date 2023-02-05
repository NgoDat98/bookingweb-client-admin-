import { useContext } from "react";

import "./featured.css";
import { context } from "../../App";

const Featured = () => {
  const data = useContext(context).hotelArr;

  const filterHotelHN = data.filter((x) => x.city === "Ha Noi");
  const filterHotelHCM = data.filter((x) => x.city === "Ho Chi Minh");
  const filterHotelDN = data.filter((x) => x.city === "Da Nang");

  return (
    <div className="featured">
      <div className="featuredItem">
        <img src="./images/Ha Noi.jpg" alt="" className="featuredImg" />
        <div className="featuredTitles">
          <h1>Ha Noi</h1>
          <h2>{filterHotelHN.length} properties</h2>
        </div>
      </div>

      <div className="featuredItem">
        <img src="./images/HCM.jpg" alt="" className="featuredImg" />
        <div className="featuredTitles">
          <h1>Ho Chi Minh</h1>
          <h2>{filterHotelHCM.length} properties</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img src="./images/Da Nang.jpg" alt="" className="featuredImg" />
        <div className="featuredTitles">
          <h1>Da Nang</h1>
          <h2>{filterHotelDN.length} properties</h2>
        </div>
      </div>
    </div>
  );
};

export default Featured;
