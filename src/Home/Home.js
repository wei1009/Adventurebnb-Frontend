import React, { useState, useEffect } from "react";
import SearchBar from "../common/SearchBar";
import HotelApi from "../api/api";
import "../CSS/Home.css"

function Home() {
    const [hotel, setHotel] = useState(null);
  
    useEffect(function getHotelOnMount() {
      console.debug("HotelList useEffect getHotelOnMount");
    //   search();
    }, []);

    // async function search() {
    //     let hotels = await HotelApi.getHotel();
    //     setHotel(hotels);
    //     console.log(hotels)
    //   }

    return (
        <div className="Home">
            {/* <h1 >Hotel Reservation</h1> */}
                
                <SearchBar />
                {/* <SearchBar searchFor={search}/> */}
                
                {/* <img src="https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=725&q=80"></img> */}
            
        </div>
    )
}

export default Home;

