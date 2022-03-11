import React, { useState, useEffect } from "react";
import '../CSS/HotelRoomCard.css';

function HotelRoomCard({maxGuest, maxAdult, description, image}) {
    return (
              
            <div className="col-lg-4 col-md-6 mb-4 mb-lg-0 room-card-list">
                <div className="card shadow-lg border-0 d-block room-card">
                        <img src={image} alt="Card image cap" className="card-img-top room-card-img"/>
                        <div className="card-body p-2 room-detail-grid">
                            <h6 className="item1 cardDark">{description}</h6>
                            <div className="item2 card-text small text-muted font-italic">Sleeps {maxGuest} adult(s), {maxGuest-maxAdult} kid(s).</div>
                            <div className="item3">
                            <button   className="btn btn-sm btn-primary room-list-btn">Save plan</button>
                            </div>
                        </div>
                </div>
            </div>
        
    )
}

export default HotelRoomCard;