import React, { useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import HotelApi from "../api/api";
import SearchBar from "../common/SearchBar";
import HotelRoomCard from "./HotelRoomCard";
import HotelDetail from "./HotelDetail";
import LoadingSpinner from "../common/LoadingSpinner";

import '../CSS/HotelInfomation.css';

function HotelInfomation() {

  const [hotelData, setHotelData] = useState(null);
  const [mapInfo, setMapInfo] = useState(null);
  const hotel = useLocation().search;
  const hotelCode = new URLSearchParams(hotel).get("hotel_code");
  const checkInDate = new URLSearchParams(hotel).get("checkInDate");
  const checkOutDate= new URLSearchParams(hotel).get("checkOutDate");
  const adult = new URLSearchParams(hotel).get("adult");
  const children = new URLSearchParams(hotel).get("children");


useEffect(function getHotelOnMount() {
  console.debug("getHotelInfomation", hotelCode, adult, children);
  getHotelInfomation(hotelCode, adult, children);
  
}, [])

useEffect(() => {
    getGoogleMap();
}, [hotelData]);

//Triggered Hotel Api to get all data
async function getHotelInfomation(hotelCode, adult, children) {
  let hotelData = await HotelApi.getHotelInfomation(hotelCode, adult, children);
  setHotelData(hotelData);

  console.log(hotelData.data)
}

//Triggered google map API
async function getGoogleMap() {


  if (hotelData !== undefined && hotelData !== null)
  {
    let coordinates = hotelData.data.coordinates;
    console.debug("getGoogloeMap", "coordinates=", coordinates)
    let mapInfo = await HotelApi.getGoogleMap(coordinates);
    console.log(mapInfo)
    setMapInfo(mapInfo);
  }

};
//    if (!hotelData) return <LoadingSpinner />
if (!mapInfo) return <LoadingSpinner />;

return (
  <div className="HotelInfomation">
    <SearchBar />
    <div className="HotelRoomLists">
      <HotelDetail
        hotelName={hotelData.data.name}
        image={hotelData.data.image}
        address={hotelData.data.address}
        description={hotelData.data.description}
        facilities={hotelData.data.facilities}
        issue={hotelData.data.issue}
        mapInfo={mapInfo.data}
      />
      <div className="room-list">
        <div className="container">
          <div className="row">
            {hotelData.data.room.map((r, index) => (
              <HotelRoomCard
                key={index}
                hotelName={hotelData.data.name}
                hotelCode={hotelData.data.code}
                maxGuest={r.maxGuest}
                maxAdult={r.maxAdult}
                adult={adult}
                children={children}
                description={r.description}
                image={r.roomImages[0].path}
                checkInDate={checkInDate}
                checkOutDate={checkOutDate}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
)
}

export default HotelInfomation;