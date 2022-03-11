import React, { useState, useEffect } from "react";
import Iframe from 'react-iframe'
import '../CSS/HotelDetail.css';


function HotelDetail({hotelName, image, address, description, facilities, issue, mapInfo}) {

    let facility = []
    for(const [index,value] of facilities.entries()){
    facility.push(<span className="facility" key={index}>{value}</span>)
   } 
   

    return (
        <div className="hotel-detail-grid">
            <div className="grid-item-img ">
            <div className="grid-border-img">
                <img className="hotel-img" style={{backgroundImage:`url(${image})`}}  />
            </div>
            </div>
            <div className="grid-item-name ">
                <div className="grid-border">
                <h3>{hotelName}</h3>
                <div>{address}</div>
                </div>
            </div>
            <div className="grid-item-description">
            <div className="grid-border">
                {facility}
                <div className="hotel-description">
                    {description}
                </div>
                </div>
            </div>
            <div className="grid-item-map">
                <div className="grid-border">
                <Iframe className="google-map" width="100%" frameBorder ="0" style="border:0; padding:10px 20px" src={ mapInfo }
                    allowfullscreen>
                </Iframe>
                </div>
                </div>
            <div className="grid-item-issue">
            <div className="grid-border">
                <div className="hotel-issue">
                {issue}
                </div>
                </div>
            </div>
        </div>
    )
}

export default HotelDetail;