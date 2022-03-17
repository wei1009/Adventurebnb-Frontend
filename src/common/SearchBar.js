import React, { useState, useEffect } from "react";
import HotelApi from "../api/api";
import SearchStatesDropdownList from "./SearchStatesDropdownList";
import SearchCitiesDropdownList from "./SearchCitiesDropdownList";
import SearchHotelsDropdownList from "./SearchHotelsDropdownList";
import { RangeDatePicker } from 'react-google-flight-datepicker';
import 'react-google-flight-datepicker/dist/main.css';
// import DatePicker from "react-datepicker";
// import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import "../CSS/SearchBar.css"
import { NutFill } from "react-bootstrap-icons";




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
    const [isFocus, setisFocus] = useState(false);
    const [checkInDate, setCheckInDate] = useState(new Date());
    const [checkOutDate, setCheckOutDate] = useState(new Date());

    const [formSearchType, setSearchType] = useState(null);
    const [formCityCode, setCityCode] = useState(null);
    const [formStateCode, setStateCode] = useState(null);
    const [formHotelCode, setHotelCode] = useState(null);
    const [formAction, setFormAction] = useState("/");

    const [filteredStates, setFilteredStates] = useState([]);
    const [filteredCities, setFilteredCities] = useState([]);
    const [filteredHotels, setFilteredHotels] = useState([]);
    const [formData, setFormData] = useState({
        checkInDate:"",
        checkOutDate:"",
        adult:"",
        children:"",
        hotel_code:"",
        city_code:"",
        state_code:""
    })

    //dropdown change than change data
    const [guestInputVal, setGuestInputVal]=useState();


     /** Update form data field */
    function handleFormChange(evt) {
         const { name, value } = evt.target;
         setFormData(l => ({ ...l, [name]: value }));
    }

    const onDateChange = (startDate, endDate) => {

        if (startDate === undefined || startDate === null){
            startDate = new Date();
        }

        setCheckInDate(startDate.toISOString().split('T')[0]);


        if(endDate === undefined || endDate === null || endDate < startDate){
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
        searchState();

 
        setCheckInDate(checkInDate.toISOString().split('T')[0]);
        setCheckOutDate(getDefaultCheckOutDate(checkInDate).toISOString().split('T')[0]);
        //filerSearchHotelsDropdown();

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
        // console.log(checkInDate);
    }, [checkInDate]);

    useEffect(() => {
        if (formSearchType === "city"){
            setFormAction("/city");
        }
        else if (formSearchType === "hotel"){
            setFormAction("/hotel");
        }
        else {
            setFormAction("/")
        }
    }, [formSearchType]);


    async function searchHotel() {
        let hotels = await HotelApi.getHotel();
        setHotels(hotels);
        // console.log(hotels.data)
    }
    async function searchCity() {
        let cities = await HotelApi.getHotelByCity();
        setCities(cities);
        // console.log(cities.data)
    }
    async function searchState() {
        let states = await HotelApi.getHotelByState();
        setStates(states);
        // console.log(states.data)
    }

    // async function handleFormSubmit(e){
    //     let result = await HotelApi.Search(formData)    
    // }


    function handleFormSubmit(e){

        // e.preventDefault()
        //console.log(formData)
    }

    function handleBlur(e) {
        if (!e.currentTarget.contains(e.relatedTarget)) {
            setisFocus(false);
        }
        console.log(isFocus)
    }

    /** Update form fields */
    function handleSearchFieldChange(e) {
        setSearchTerm(e.target.value);
        //filerSearchHotelsDropdown(); 
    }

    function getDefaultCheckOutDate(checkInDate){
        let defaultCheckOutDate = new Date(checkInDate);
        defaultCheckOutDate.setDate(defaultCheckOutDate.getDate() + 1);

        return defaultCheckOutDate;
    }


    function filerSearchHotelsDropdown() {

        setFilteredStates([]);
        setFilteredCities([]);
        setFilteredHotels([]);

        if (states == null || states == undefined || cities == null || cities == undefined || hotels == null || hotels == undefined) {
            return;
        }

        let searchTxt = "";
        searchTxt = searchTerm.trim().toLocaleLowerCase();


        let tempStates = [];
        let tempCities = [];
        let tempHotels = [];

        if (searchTxt == "") {
            //Only display top 10 states

            for (let i = 0; i < 10; i++) {
                tempStates.push(states.data[i]);
            }
            setFilteredStates(tempStates);
        }
        else {
            let searchWords = [];
            searchWords = searchTxt.split(" ");

            let matchCount = 0;

            //Display states if match
            for (let state of states.data) {
                let isMatch = searchWords.every(function (e) {
                    let findSate = state.state.toLowerCase().indexOf(e);

                    return (
                        findSate >= 0
                    );
                });
                if (isMatch) {
                    matchCount++;
                    tempStates.push(state);
                }

                if (matchCount >= 10) break;
            }

            if (tempStates.length > 0) setFilteredStates(tempStates);
            if (matchCount >= 10) return;


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

    function searchDropDownClick(e){
        console.log(e.currentTarget.type);
        console.log(e.currentTarget.querySelector("span").innerText);
        console.log(e.currentTarget.getAttribute("hotel_code"));
        setHotelCode(e.currentTarget.getAttribute("hotel_code")); 
        setSearchType(e.currentTarget.type)  
        
        let searchHotelTextbox = document.getElementById("searchHotelTextbox")
        
        if (e.currentTarget.type === "hotel"){
            setSearchType(e.currentTarget.type);
            setHotelCode(e.currentTarget.getAttribute("hotel_code")); 
            setCityCode(null);
            setStateCode(null);
            searchHotelTextbox.value = e.currentTarget.querySelector(".searchHotelDropdown").innerHTML;
        }
        else if (e.currentTarget.type === "city"){
            setSearchType(e.currentTarget.type);
            setHotelCode(null); 
            setCityCode(e.currentTarget.getAttribute("city_code"));
            setStateCode(e.currentTarget.getAttribute("state_code"));
            searchHotelTextbox.value = e.currentTarget.querySelector(".searchCityDropdown").innerHTML;
        }
        else{
            setSearchType(null);
            setHotelCode(null); 
            setCityCode(null);
            setStateCode(null);
            searchHotelTextbox.value = "";            
        }

        setisFocus(false);
    }


    return (
        <div className="SearchConponent ">
        <div className="searchBar container-fluid">
            <form className="mb-4 row searchForm "  onSubmit={handleFormSubmit} action={formAction}>
            {/* action="/hotel" */}
                <div className="col-md-6 col-xl-4 searchInput ">
                    <input
                        id="searchHotelTextbox"
                        
                        className="form-control searchbar"
                        type="text" placeholder="Search"
                        onFocus={handleClick}
                        onChange={handleFormChange, handleSearchFieldChange}
                        // onKeyUp={handleSearchFieldChange}
                        //onBlur={handleBlur}
                    />
                    {isFocus && (
                        <div id="searchHotelsDropdown">
                            <ul className="searchHotelList"> 
                                {filteredStates.map(state => (
                                    <SearchStatesDropdownList
                                        key={state.state}
                                        state={state.state} />
                                ))}
                                {filteredCities.map((city, index) => (
                                    <SearchCitiesDropdownList
                                        onClickEvent={searchDropDownClick}
                                        key={index}
                                        index={index}
                                        city={city.city}
                                        state={city.state}
                                    />
                                ))}
                                {filteredHotels.map(hotel => (
                                    <SearchHotelsDropdownList
                                        onClickEvent={searchDropDownClick}
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
                    {/* {formSearchType=="city" &&
                        (<>
                        <input id="searchType" name="type" type="textbox"  style={{display:"none"}} value={formSearchType} onChange={handleFormChange} />
                        <input id="searchStateCode" name="state_code" type="textbox"  style={{display:"none"}} value={formStateCode} onChange={handleFormChange} />
                        <input id="searchCityCode" name="city_code" type="textbox"  style={{display:"none"}} value={formCityCode} onChange={handleFormChange} />
                        </>)
                    } */}
                    {formSearchType=="hotel" &&
                        (<>
                        <input id="searchType" name="type" type="textbox"  style={{display:"none"}} value={formSearchType} onChange={handleFormChange} />
                        <input id="searchHotelCode" name="hotel_code" type="textbox"  style={{display:"none"}} value={formHotelCode} onChange={handleFormChange} />
                        </>)
                    }
                    {formSearchType=="city" &&
                        (<>
                        <input id="searchType" name="type" type="textbox"  style={{display:"none"}} value={formSearchType} onChange={handleFormChange} />
                        <input id="searchCityCode" name="city_code" type="textbox"  style={{display:"none"}} value={formCityCode} onChange={handleFormChange} />
                        <input id="searchStateCode" name="state_code" type="textbox"  style={{display:"none"}} value={formStateCode} onChange={handleFormChange} />
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
                    <input id="searchCheckInDate" type="textbox"  style={{display:"none"}} name="checkInDate"  value={checkInDate} onChange={handleFormChange}/>
                    <input id="searchCheckOutDate" type="textbox"  style={{display:"none"}} name="checkOutDate" value={checkOutDate} onChange={handleFormChange}/>
                </div>
                <div className="col-md col-xl guestInput">

                    <input id="searchGuestAdult" name="adult" onChange={handleFormChange} type="number" placeholder="Adult" className="form-control  guest" min="1" max="5"/>
                </div>
                <div className="col-md col-xl guestInput">
                    <input id="searchGuestChildren" name="children" onChange={handleFormChange} type="number" placeholder="Children" className="form-control  guest" min="0" max="5" />
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