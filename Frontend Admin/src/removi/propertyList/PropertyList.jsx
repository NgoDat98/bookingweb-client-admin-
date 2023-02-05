import { useContext } from "react";
import "./propertyList.css";
import { context } from "../../App";

const PropertyList = () => {
  const data = useContext(context).hotelArr;

  const filterHotel = data.filter((x) => x.type === "hotel");
  const filterApartment = data.filter((x) => x.type === "apartment");
  const filterResort = data.filter((x) => x.type === "resort");
  const filterVilla = data.filter((x) => x.type === "villa");
  const filterCabin = data.filter((x) => x.type === "cabin");

  return (
    <div className="pList">
      <div className="pListItem">
        <img src="./images/type_1.webp" alt="" className="pListImg" />
        <div className="pListTitles">
          <h1>Hotels</h1>
          <h2>{filterHotel.length} hotels</h2>
        </div>
      </div>
      <div className="pListItem">
        <img src="./images/type_2.jpg" alt="" className="pListImg" />
        <div className="pListTitles">
          <h1>Apartments</h1>
          <h2>{filterApartment.length} hotels</h2>
        </div>
      </div>
      <div className="pListItem">
        <img src="./images/type_3.jpg" alt="" className="pListImg" />
        <div className="pListTitles">
          <h1>Resorts</h1>
          <h2>{filterResort.length} hotels</h2>
        </div>
      </div>
      <div className="pListItem">
        <img src="./images/type_4.jpg" alt="" className="pListImg" />
        <div className="pListTitles">
          <h1>Villas</h1>
          <h2>{filterVilla.length} hotels</h2>
        </div>
      </div>
      <div className="pListItem">
        <img src="./images/type_5.jpg" alt="" className="pListImg" />
        <div className="pListTitles">
          <h1>Cabins</h1>
          <h2>{filterCabin.length} hotels</h2>
        </div>
      </div>
    </div>
  );
};

export default PropertyList;
