import React from "react";
import { useNavigate } from "react-router-dom";
import "./searchItem.css";

const SearchItem = (props) => {
  const navigate = useNavigate();

  return (
    <div className="searchItem" key={props.item.key}>
      <img src={props.item.img_url} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{props.item.name}</h1>
        <span className="siDistance">{props.item.distance} from center</span>
        <span className="siTaxiOp">{props.item.tag}</span>
        <span className="siSubtitle">{props.item.description}</span>
        <span className="siFeatures">{props.item.type}</span>
        {/* If can cancel */}
        {props.item.free_cancel ? (
          <div>
            <span className="siCancelOp">Free cancellation </span>
            <span className="siCancelOpSubtitle">
              You can cancel later, so lock in this great price today!
            </span>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <div className="siDetails">
        <div className="siRating">
          <span>{props.item.rate_text}</span>
          <button>{props.item.rate}</button>
        </div>
        <div className="siDetailTexts">
          <span className="siPrice">${props.item.price}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <button
            className="siCheckButton"
            onClick={() =>
              navigate(`/hotels/${props.item.idHotel}`, {
                state: {
                  date: props.data.date,
                  destination: props.data.destination,
                  options: props.data.options,
                },
              })
            }
          >
            See availability
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
