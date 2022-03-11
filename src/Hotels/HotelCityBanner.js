import React from "react";
import '../CSS/HotelCityBanner.css';

function HotelCityBanner({city, state}){
    const IMG = "https://images.unsplash.com/photo-1578894381163-e72c17f2d45f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1206&q=80"
return (

<div className="city-img" style={{backgroundImage:`url(${IMG})`}}>
<h1 className="city-name">{city}, {state}</h1>
</div>

)
}

export default HotelCityBanner;