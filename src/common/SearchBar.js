import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import HotelApi from "../api/api";
import SearchZipsDropdownList from "./SearchZipsDropdownList";
import SearchCitiesDropdownList from "./SearchCitiesDropdownList";
import SearchHotelsDropdownList from "./SearchHotelsDropdownList";
import { RangeDatePicker } from 'react-google-flight-datepicker';
import 'react-google-flight-datepicker/dist/main.css';
import "react-datepicker/dist/react-datepicker.css";
import "../CSS/SearchBar.css"

const initialState = {
    startDate: null,
    endDate: null,
    focusedInput: null,
}

function reducer(state, action) {
    switch (action.type) {
        case 'focusChange':
            return { ...state, focusedInput: action.payload }
        case 'dateChange':
            return action.payload
        default:
            throw new Error()
    }
}

function SearchBar() {


    // console.debug("SearchForm", "searchFor=", typeof searchFor);
    const [searchTerm, setSearchTerm] = useState("");
    const [hotels, setHotels] = useState(null);
    const [cities, setCities] = useState(null);
    const [states, setStates] = useState(null);
    const [zips, setZips] = useState(null);
    const [isFocus, setisFocus] = useState(false);
    const [checkInDate, setCheckInDate] = useState(new Date());
    const [checkOutDate, setCheckOutDate] = useState(new Date());

    const [adultCount, setAdultCount] = useState(null);
    const [childCount, setChildCount] = useState(null);

    const [formSearchType, setSearchType] = useState(null);
    const [formCityCode, setCityCode] = useState(null);
    const [formStateCode, setStateCode] = useState(null);
    const [formHotelCode, setHotelCode] = useState(null);
    const [formZipCode, setZipCode] = useState(null);
    const [formAction, setFormAction] = useState("/");

    const [filteredZips, setFilteredZips] = useState([]);
    const [filteredCities, setFilteredCities] = useState([]);
    const [filteredHotels, setFilteredHotels] = useState([]);
    const [formData, setFormData] = useState({
        checkInDate: "",
        checkOutDate: "",
        adult: "",
        children: "",
        hotel_code: "",
        city_code: "",
        state_code: "",
        zip_code: ""
    })

    //dropdown change than change data
    const [guestInputVal, setGuestInputVal] = useState();

    const qs = new URLSearchParams(useLocation().search);   //Get Query String

    /** Update form data field */
    function handleFormChange(evt) {
        const { name, value } = evt.target;
        setFormData(l => ({ ...l, [name]: value }));
    }

    const onDateChange = (startDate, endDate) => {

        if (startDate === undefined || startDate === null) {
            startDate = new Date();
        }

        setCheckInDate(startDate.toISOString().split('T')[0]);


        if (endDate === undefined || endDate === null || endDate < startDate) {
            endDate = getDefaultCheckOutDate(startDate)
        }

        setCheckOutDate(endDate.toISOString().split('T')[0]);

    };

    const handleClick = (e) => {
        setisFocus(true);
        filerSearchHotelsDropdown();
    }

    useEffect(function getHotelOnMount() {
        console.debug("HotelList useEffect getHotelOnMount");
        searchHotel();
        searchCity();
        searchZip();

        //Initialize adult Count from query string
        const queryAdult = qs.get("adult");
        if (queryAdult !== null && queryAdult !== undefined) {
            setAdultCount(queryAdult)
        }
        else {
            setAdultCount(2);
        }

        //Initialize children Count from query string
        const querychildren = qs.get("children");
        if (querychildren !== null && querychildren !== undefined) {
            setChildCount(querychildren)
        }
        else {
            setChildCount(0);
        }

        //Initialize check-in date Count from query string
        const queryCheckInDate = qs.get("checkInDate");
        if (queryCheckInDate !== null && queryCheckInDate !== undefined) {
            setCheckInDate(queryCheckInDate)
        }
        else {
            let today = new Date();
            setCheckInDate(today.toISOString().split('T')[0]);
        }

        //Initialize check-out date Count from query string
        const queryCheckOutDate = qs.get("checkOutDate");
        if (queryCheckOutDate !== null && queryCheckOutDate !== undefined && queryCheckOutDate > queryCheckInDate) {
            setCheckOutDate(queryCheckOutDate)
        }
        else {
            setCheckOutDate(getDefaultCheckOutDate(checkInDate).toISOString().split('T')[0])
        }

    }, []);

    useEffect(() => {
        if (isFocus) {
            filerSearchHotelsDropdown();
        }
    }, [isFocus]);

    useEffect(() => {
        if (isFocus) {
            filerSearchHotelsDropdown();
        }
    }, [searchTerm]);

    useEffect(() => {
        ////Initialize search textbox from query string
        initSearchTextBoxByQueryString();
    }, [hotels]);

    useEffect(() => {
        if (formSearchType == "city" || formSearchType == "zip") {
            setFormAction("/hotelsearch");
        }
        else if (formSearchType == "hotel") {
            setFormAction("/hotel");
        }
        else {
            setFormAction("/")
        }
    }, [formSearchType]);

    async function searchHotel() {
        let hotels = await HotelApi.getHotels();
        setHotels(hotels);
    }
    async function searchCity() {
        let cities = await HotelApi.getCities();
        setCities(cities);
    }
    async function searchZip() {
        let zips = await HotelApi.getZips();
        setZips(zips);
    }

    function handleFormSubmit(e) {
        //console.log(formData)
    }

    function handleBlur(e) {
        if (!e.currentTarget.contains(e.relatedTarget)) {
            setisFocus(false);
        }
    }

    //Innitalize search textbox on search bar and related states
    function initSearchTextBoxByQueryString() {
        //Initial Search Textbox
        const querySearchType = qs.get("type");
        const queryCityCode = qs.get("city_code");
        const queryStateCode = qs.get("state_code");
        const queryHotelCode = qs.get("hotel_code");
        const queryZipCode = qs.get("zip_code");
        let searchHotelTextbox = document.getElementById("searchHotelTextbox")

        if (querySearchType == "city" && queryCityCode !== null && queryCityCode !== undefined
            && queryStateCode !== null && queryStateCode !== undefined) {
            setSearchType(querySearchType);
            setHotelCode(null);
            setCityCode(queryCityCode);
            setStateCode(queryStateCode);
            setZipCode(null);
            searchHotelTextbox.value = queryCityCode + ", " + queryStateCode
        }
        else if (querySearchType == "hotel" && queryHotelCode !== null && queryHotelCode !== undefined
            && hotels !== null && hotels !== undefined
            && Array.isArray(hotels.data)) {

            let defaultHotel;

            for (let h of hotels.data) {
                if (h.code == queryHotelCode) {
                    defaultHotel = h
                    break;
                }
            }

            if (defaultHotel !== null && defaultHotel !== undefined) {
                setSearchType(querySearchType);
                setHotelCode(queryHotelCode);
                setCityCode(null);
                setStateCode(null);
                setZipCode(null);
                searchHotelTextbox.value = defaultHotel.name
            }
        }
    }

    /** Update form fields */
    function handleSearchFieldChange(e) {
        setSearchTerm(e.target.value);
    }

    function handleAdultChange(e) {
        setAdultCount(e.target.value);
    }

    function handleChildChange(e) {
        setChildCount(e.target.value);
    }

    function getDefaultCheckOutDate(checkInDate) {
        let defaultCheckOutDate = new Date(checkInDate);
        defaultCheckOutDate.setDate(defaultCheckOutDate.getDate() + 1);

        return defaultCheckOutDate;
    }

    function filerSearchHotelsDropdown() {

        setFilteredZips([]);
        setFilteredCities([]);
        setFilteredHotels([]);

        if (zips == null || zips == undefined || cities == null || cities == undefined || hotels == null || hotels == undefined) {
            return;
        }

        let searchTxt = "";
        searchTxt = searchTerm.trim().toLocaleLowerCase();
        let tempZips = [];
        let tempCities = [];
        let tempHotels = [];

        if (searchTxt == "") {
            //Only display top 10 cities

            for (let i = 0; i < 10; i++) {
                tempCities.push(cities.data[i]);
            }
            setFilteredCities(tempCities);
        }
        else {
            let searchWords = [];
            searchWords = searchTxt.split(" ");

            let matchCount = 0;

            //Display City if match
            for (let i = 0; i < cities.data.length; i++) {

                let city = cities.data[i];

                let isMatch = searchWords.every(function (e) {
                    let findState = city.state.toLowerCase().indexOf(e);
                    let findCity = city.city.toLowerCase().indexOf(e);

                    return (
                        findState >= 0 ||
                        findCity >= 0
                    );
                });
                if (isMatch) {
                    matchCount++;
                    tempCities.push(city)
                }

                if (matchCount >= 10) break;
            }

            if (tempCities.length > 0) setFilteredCities(tempCities);
            if (matchCount >= 10) return;


            //Display zips if match
            for (let zip of zips.data) {
                let isMatch = searchWords.every(function (e) {
                    let findZip = zip.zip.toLowerCase().indexOf(e);
                    return (
                        findZip >= 0
                    );
                });
                if (isMatch) {
                    matchCount++;
                    tempZips.push(zip);
                }

                if (matchCount >= 10) break;
            }

            if (tempZips.length > 0) setFilteredZips(tempZips);
            if (matchCount >= 10) return;

            //Display hotel if match
            for (let hotel of hotels.data) {

                let isMatch = searchWords.every(function (e) {
                    let findState = hotel.state.toLowerCase().indexOf(e);
                    let findCity = hotel.city.toLowerCase().indexOf(e);
                    let findHotelName = hotel.name.toLowerCase().indexOf(e);

                    return (
                        findState >= 0 ||
                        findCity >= 0 ||
                        findHotelName >= 0
                    );
                });
                if (isMatch) {
                    matchCount++;
                    tempHotels.push(hotel)
                }

                if (matchCount >= 10) break;
            }

            if (tempHotels.length > 0) setFilteredHotels(tempHotels);
            if (matchCount >= 10) return;
        }
    }

    function searchDropDownClick(e) {
        setHotelCode(e.currentTarget.getAttribute("hotel_code"));
        setSearchType(e.currentTarget.type)

        let searchHotelTextbox = document.getElementById("searchHotelTextbox")

        if (e.currentTarget.type === "hotel") {
            setSearchType(e.currentTarget.type);
            setHotelCode(e.currentTarget.getAttribute("hotel_code"));
            setCityCode(null);
            setStateCode(null);
            setZipCode(null);
            searchHotelTextbox.value = e.currentTarget.querySelector(".searchHotelDropdown").innerHTML;
        }
        else if (e.currentTarget.type === "city") {
            setSearchType(e.currentTarget.type);
            setHotelCode(null);
            setCityCode(e.currentTarget.getAttribute("city_code"));
            setStateCode(e.currentTarget.getAttribute("state_code"));
            setZipCode(null);
            searchHotelTextbox.value = e.currentTarget.querySelector(".searchCityDropdown").innerHTML;
        }
        else if (e.currentTarget.type === "zip") {
            setSearchType(e.currentTarget.type);
            setHotelCode(null);
            setCityCode(null);
            setStateCode(null);
            setZipCode(e.currentTarget.getAttribute("zip_code"));
            searchHotelTextbox.value = e.currentTarget.querySelector(".searchZipDropdown").innerHTML;
        }
        else {
            setSearchType(null);
            setHotelCode(null);
            setCityCode(null);
            setZipCode(null);
            setZipCode(null);
            searchHotelTextbox.value = "";
        }

        setisFocus(false);
    }

    return (
        <div className="SearchConponent ">
            <div className="searchBar container-fluid">
                <form className="mb-4 row searchForm " onSubmit={handleFormSubmit} action={formAction}>
                    {/* action="/hotel" */}
                    <div className="col-md-6 col-xl-4 searchInput ">
                        <input
                            id="searchHotelTextbox"

                            className="form-control searchbar"
                            type="text" placeholder="Search"
                            onFocus={handleClick}
                            onChange={handleFormChange, handleSearchFieldChange}
                            // onKeyUp={handleSearchFieldChange}
                            onBlur={handleBlur}
                        />
                        {isFocus && (
                            <div id="searchHotelsDropdown">
                                <ul className="searchHotelList">
                                    {filteredCities.map((city, index) => (
                                        <SearchCitiesDropdownList
                                            onMouseDownEvent={searchDropDownClick}
                                            key={index}
                                            index={index}
                                            city={city.city}
                                            state={city.state}
                                        />
                                    ))}
                                    {filteredZips.map((zip, index) => (
                                        <SearchZipsDropdownList
                                            onMouseDownEvent={searchDropDownClick}
                                            key={index}
                                            zip={zip.zip}
                                            state={zip.state} />
                                    ))}
                                    {filteredHotels.map(hotel => (
                                        <SearchHotelsDropdownList
                                            onMouseDownEvent={searchDropDownClick}
                                            key={hotel.code}
                                            code={hotel.code}
                                            name={hotel.name}
                                            city={hotel.city}
                                            state={hotel.state} />
                                    ))}
                                </ul>
                            </div>
                        )
                        }
                        {formSearchType == "hotel" &&
                            (<>
                                <input id="searchType" name="type" type="textbox" style={{ display: "none" }} value={formSearchType} onChange={handleFormChange} />
                                <input id="searchHotelCode" name="hotel_code" type="textbox" style={{ display: "none" }} value={formHotelCode} onChange={handleFormChange} />
                            </>)
                        }
                        {formSearchType == "city" &&
                            (<>
                                <input id="searchType" name="type" type="textbox" style={{ display: "none" }} value={formSearchType} onChange={handleFormChange} />
                                <input id="searchCityCode" name="city_code" type="textbox" style={{ display: "none" }} value={formCityCode} onChange={handleFormChange} />
                                <input id="searchStateCode" name="state_code" type="textbox" style={{ display: "none" }} value={formStateCode} onChange={handleFormChange} />
                            </>)
                        }
                        {formSearchType == "zip" &&
                            (<>
                                <input id="searchType" name="type" type="textbox" style={{ display: "none" }} value={formSearchType} onChange={handleFormChange} />
                                <input id="searchZipCode" name="zip_code" type="textbox" style={{ display: "none" }} value={formZipCode} onChange={handleFormChange} />
                            </>)
                        }
                    </div>
                    <div className="col-md-6 col-xl-4">
                        <RangeDatePicker
                            startDate={checkInDate}
                            endDate={checkOutDate}
                            onChange={(startDate, endDate) => onDateChange(startDate, endDate)}
                            minDate={new Date()}
                            maxDate={new Date(2100, 0, 1)}
                            dateFormat="M/D/YYYY"
                            monthFormat="MMM YYYY"
                            startDatePlaceholder="Check-In Date"
                            endDatePlaceholder="Check-Out Date"
                            disabled={false}
                            className="my-own-class-name"
                            startWeekDay="monday"
                        />
                        <input id="searchCheckInDate" type="textbox" style={{ display: "none" }} name="checkInDate" value={checkInDate} onChange={handleFormChange} />
                        <input id="searchCheckOutDate" type="textbox" style={{ display: "none" }} name="checkOutDate" value={checkOutDate} onChange={handleFormChange} />
                    </div>
                    <div className="col-md col-xl guestInput">
                        <input id="searchGuestAdult" name="adult" onChange={handleFormChange, handleAdultChange} type="number" placeholder="Adult" className="form-control  guest" min="1" max="5" value={adultCount} />
                    </div>
                    <div className="col-md col-xl guestInput">
                        <input id="searchGuestChildren" name="children" onChange={handleFormChange, handleChildChange} type="number" placeholder="Children" className="form-control  guest" min="0" max="5" value={childCount} />
                    </div>
                    {/* <div className="col-md col-xl formSubmitBtn_container"> */}
                    <button type="submit" className="col-md col-xl-1 btn btn-lg btn-primary formSubmitBtn">Search</button>
                    {/* </div> */}
                </form>
            </div>
        </div>

    )
}

export default SearchBar;