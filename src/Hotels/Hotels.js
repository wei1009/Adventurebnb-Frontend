import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import SearchBar from "../common/SearchBar";
import HotelList from "./HotelList";
import HotelCityBanner from "./HotelCityBanner";
import HotelApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner";
import Pagination from "./Pagination";
import '../CSS/Hotels.css';
import { useAlert } from 'react-alert'
import { returnHomePageWithDelay } from "../common/CommonFunction";


function Hotels() {
    const [hotelData, setHotelData] = useState(null);
    const locationSearch = useLocation().search;
    const [totalCount,setTotalCount]=useState()
    const history = useHistory();
    const type = new URLSearchParams(locationSearch).get("type");
    const cityCode = new URLSearchParams(locationSearch).get("city_code");
    const stateCode = new URLSearchParams(locationSearch).get("state_code");
    const zipCode = new URLSearchParams(locationSearch).get("zip_code");
    const checkInDate = new URLSearchParams(locationSearch).get("checkInDate");
    const checkOutDate = new URLSearchParams(locationSearch).get("checkOutDate");
    const adult = new URLSearchParams(locationSearch).get("adult");
    const children = new URLSearchParams(locationSearch).get("children");
    const searchType = new URLSearchParams(locationSearch).get("type");
    const page = new URLSearchParams(locationSearch).get("page");
    const alert = useAlert();

    useEffect(function getHotelOnMount() {
        if (searchType == "city") {
            getHotelsByCity(cityCode, stateCode, adult, children, page);
        }
        else if (searchType == "zip") {
            getHotelsByZip(zipCode, adult, children, page);
        }
        else {
            alert.show("Insufficient Parameter:\n Search Type ");
            returnHomePageWithDelay();
        }

    }, [])

    async function getHotelsByCity(cityCode, stateCode, adult, children, page) {
        try {
            let response = await HotelApi.getHotelsByCity(cityCode, stateCode, adult, children, page);
            setHotelData(response.data.hotelData);
            setTotalCount(response.data.totalCount);
            console.log(response.data.totalCount)
            console.log(response.data.hotelData)
        }
        catch (err) {
            alert.show("Get Hotels by City Error: \n" + err.response.data);
            returnHomePageWithDelay();
        }
    }

    async function getHotelsByZip(zipCode, adult, children, page) {
        try {
            let response = await HotelApi.getHotelsByZip(zipCode, adult, children, page);
            setHotelData(response.data.hotelData);
            setTotalCount(response.data.totalCount)
        }
        catch (err) {
            alert.show("Get Hotels by Zip Error: \n" + err.response.data);
            returnHomePageWithDelay();
        }
    }

    if (!hotelData) { return <LoadingSpinner /> }

    return (
        <div className="Hotels">
            <SearchBar />

            <div className="hotelLists">
                <div className="banner">
                    <HotelCityBanner
                        city={hotelData[0].city.content}
                        state={hotelData[0].state.code}
                    />
                </div>
                {hotelData.map(h => (
                    <HotelList
                        key={h.code}
                        hotelName={h.name.content}
                        hotelFeature={h.categoryGroup.description.content}
                        street={h.address.content}
                        city={h.city.content}
                        state={h.stateCode}
                        postalCode={h.postalCode}
                        web={h.web}
                        phone={h.mainPhone}
                        image={h.mainImage}
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
            <div className="pagination-area">
                <Pagination totalCount={totalCount}
                            type={type}
                            city={cityCode}
                            state={stateCode}
                            checkInDate={checkInDate}
                            checkOutDate={checkOutDate}
                            adult={adult}
                            children={children}   
                /> 
            </div>
        </div>
    )
}

export default Hotels;
