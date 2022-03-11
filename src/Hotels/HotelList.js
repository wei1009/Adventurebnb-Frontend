import React, { useState, useEffect } from "react";
import '../CSS/HoteList.css';

function HotelList(
    {hotelName, hotelFeature, street, city, state, postalCode,  web, phone, image, rate, ranking, 
        checkInDate,checkOutDate, hotelCode, adult, children}){
            const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3000";
    return (
        <>
        <div className="container hotelList">
            <div className="row">
                <div className="col-lg-4">
                <img className="card-img-top" src={image} alt="Card image cap"></img>
                </div>

                <div className=" col-lg-6 ">
                    <h4 >
                        {hotelName}
                    </h4>
                    <div className="hotelFeature">
                        <h6 className="hotelFeatureContent"> {hotelFeature}</h6>
                    </div>
                    <div className=" hotelInfomation">
                        <div >{street}, {city}, {state} {postalCode}</div>
                        <a href="www.marriott.com/mcofv" >{web}</a>
                        <div >{phone}</div>
                    </div>
                </div>
                <div className="hotelSubInformation col-lg-2">
                    <div className="ranking">
                        <div>
                            rate:{rate}
                        </div>
                        <div>
                            ranking:{ranking}
                        </div>
                    </div>
                    <a className="btn btn-md btn-primary hotelListBtn" 
                    href={`${BASE_URL}/hotel?type=hotel&hotel_code=${hotelCode}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&adult=${adult}&children=${children}`}>
                        Go to hotel
                        </a>
                </div>
            </div>
        </div>
       
    </>


    )
};
export default HotelList;