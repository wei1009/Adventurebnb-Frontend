import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import SearchBar from "../common/SearchBar";
import HotelList from "./HotelList";
import HotelCityBanner from "./HotelCityBanner";
import HotelApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner";
import '../CSS/Hotels.css';
import { useAlert } from 'react-alert'
import {returnHomePageWithDelay} from "../common/CommonFunction";


function Hotels() {
    const [hotelData, setHotelData] = useState(null);
    const locationSearch = useLocation().search;
    const history = useHistory();
    const cityCode = new URLSearchParams(locationSearch).get("city_code");
    const stateCode = new URLSearchParams(locationSearch).get("state_code");
    const zipCode = new URLSearchParams(locationSearch).get("zip_code");

    const checkInDate = new URLSearchParams(locationSearch).get("checkInDate");
    const checkOutDate = new URLSearchParams(locationSearch).get("checkOutDate");
    const adult = new URLSearchParams(locationSearch).get("adult");
    const children = new URLSearchParams(locationSearch).get("children");
    const searchType = new URLSearchParams(locationSearch).get("type");
    const alert = useAlert();

    useEffect(function getHotelOnMount() {
        if(searchType == "city"){
            getHotelsByCity(cityCode, stateCode, adult, children);
        }
        else if (searchType == "zip")        {
            getHotelsByZip(zipCode, adult, children);
        }
        else{
            alert.show("Insufficient Parameter:\n Search Type ");
            returnHomePageWithDelay();
        }

    }, [])

    async function getHotelsByCity(cityCode, stateCode, adult, children) {
        try{
            let response = await HotelApi.getHotelsByCity(cityCode, stateCode, adult, children);
            setHotelData(response.data.hotelData);
        }
        catch(err) {
           alert.show("Get Hotels by City Error: \n" + err.response.data);
           returnHomePageWithDelay();
        }       
    }
    
    async function getHotelsByZip(zipCode, adult, children) {
        try{
            let response = await HotelApi.getHotelsByZip(zipCode, adult, children);
            setHotelData(response.data.hotelData);
        }
        catch(err) {
           alert.show("Get Hotels by Zip Error: \n" + err.response.data);
           returnHomePageWithDelay();
        }       
    }    
    
    if (!hotelData){ return <LoadingSpinner />}
   
    return (
        <div className="Hotels">
            <SearchBar />
            
            <div className="hotelLists">
            <div className="banner">
                <HotelCityBanner 
                    city = {hotelData[0].city.content}
                    state = {hotelData[0].stateCode}
                />
                </div>
            {hotelData.map(h=>(
                <HotelList 
                    key = {h.code}
                    hotelName={h.name.content}
                    hotelFeature={h.categoryGroup.description.content}
                    street= {h.address.content}
                    city = {h.city.content}
                    state = {h.stateCode}
                    postalCode ={h.postalCode}
                    web={h.web}
                    phone={h.mainPhone}
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
