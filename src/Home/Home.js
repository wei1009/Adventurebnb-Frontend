import React, { useEffect } from "react";
import SearchBar from "../common/SearchBar";
import TravelInfo from "./TravelInfo";
import Footer from "./Footer";
import "../CSS/Home.css"

function Home() {
    useEffect(function getHotelOnMount() {
      console.debug("HotelList useEffect getHotelOnMount");
    }, []);

    return (
        <div className="Home">
                <SearchBar />
                <div className="HomeInfo">
                <TravelInfo/>
                </div>
                <div>
                  <Footer/>
                </div>
        </div>
    )
}

export default Home;

