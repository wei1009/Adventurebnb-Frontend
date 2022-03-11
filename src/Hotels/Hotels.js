import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SearchBar from "../common/SearchBar";
import HotelList from "./HotelList";
import HotelCityBanner from "./HotelCityBanner";
import HotelApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner";
import '../CSS/Hotels.css';


function Hotels() {
    const [hotelData, setHotelData] = useState(null);
    const city = useLocation().search;
    const cityCode = new URLSearchParams(city).get("city_code");
    const stateCode = new URLSearchParams(city).get("state_code");
    const checkInDate = new URLSearchParams(city).get("checkInDate");
    const checkOutDate = new URLSearchParams(city).get("checkOutDate");
    const adult = new URLSearchParams(city).get("adult");
    const children = new URLSearchParams(city).get("children");

    useEffect(function getHotelOnMount() {
        console.debug("getCityHotelInfomation", cityCode, stateCode, adult, children);
        getCityHotelInfomation(cityCode, stateCode, adult, children);
        console.log(hotelData)
      }, [])

    async function getCityHotelInfomation(cityCode, stateCode, adult, children) {
        let hotelData = await HotelApi.getCityHotelInfomation(cityCode, stateCode, adult, children);
        setHotelData(hotelData.data);
        console.log(hotelData)
        
      }
      if (!hotelData){ return <LoadingSpinner />}
   
    return (
        <div className="Hotels">
            <SearchBar />
            
            <div className="hotelLists">
            <div className="banner">
                <HotelCityBanner 
                    city = {hotelData[0].city.content}
                    state = {hotelData[0].state.name}
                />
                </div>
            {hotelData.map(h=>(
                <HotelList 
                    key = {h.code}
                    hotelName={h.name.content}
                    hotelFeature={h.categoryGroup.description.content}
                    street= {h.address.content}
                    city = {h.city.content}
                    state = {h.state.code}
                    postalCode ={h.postalCode}
                    web={h.web}
                    phone={h.phones[0].phoneNumber}
                    image = {h.mainImage}
                    rate={h.S2C}
                    ranking={h.ranking}
                    checkInDate={checkInDate}
                    checkOutDate={checkOutDate}
                    hotelCode={h.code}
                    adult={adult}
                    children={children}

                />
            ))}
                
            </div>
            
        </div>
    )
}

export default Hotels;
