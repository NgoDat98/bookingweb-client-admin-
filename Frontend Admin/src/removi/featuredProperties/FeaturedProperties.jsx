import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import "./featuredProperties.css";
import { context } from "../../App";

const FeaturedProperties = () => {
  const data = useContext(context).hotelArr;

  const navigate = useNavigate();

  // sắp xếp danh sánh theo rating giảm dần
  const ratingHotel = data.sort(function (a, b) {
    return -a.rating + b.rating;
  });
  const findIndex = ratingHotel.slice(0, 3);

  return (
    <div className="fp">
      {findIndex &&
        findIndex.map((item, index) => (
          <div className="fpItem" key={index}>
            <img src={item.photos[0]} alt="" className="fpImg" />
            <span className="fpName">
              <a href={`./hotels/${item._id}`} target="_blank">
                {item.name}
              </a>
            </span>
            <span className="fpCity">{item.city}</span>
            <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
            <div className="fpRating">
              <button>{item.rating}</button>
              <span></span>
            </div>
          </div>
        ))}
    </div>
  );
};

export default FeaturedProperties;
