import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../auth/UserContext";
import HotelApi from "../api/api";
import noRoomImage from "../images/NoImageRoom.jpg";
import { useAlert } from 'react-alert'
import '../CSS/HotelRoomCard.css';
import { milliseconds } from "date-fns";

/** Show information about a hotel's room
 *
 * Is rendered by HotelInfomation to show a "card" for each room.
 *
 * HotelInfomation -> HotelRoomCard
 */

function HotelRoomCard({ hotelName, hotelCode, maxGuest, maxAdult, adult, children, description, image, checkInDate, checkOutDate }) {
    const { currentUser } = useContext(UserContext);
    const history = useHistory();
    const [saveErrors, setSaveErrors] = useState([]);
    const [saveConfirmed, setSaveConfirmed] = useState(false);
    const alert = useAlert();

    const handleClick = (e) => {
        if (!currentUser) {
            history.push("/login")
        } else {
            try {
                const username = currentUser.username;
                let planData = {
                    hotelName: hotelName,
                    hotelCode: hotelCode,
                    adult: adult,
                    children: children,
                    description: description,
                    checkInDate: checkInDate,
                    checkOutDate: checkOutDate,
                    status: "pending"
                }
                saveAllPlan(username, planData)
            } catch (errors) {
                setSaveErrors(errors);
                return;
            }
            setSaveErrors([])
            setSaveConfirmed(true);
        }
    }

    async function saveAllPlan(username, planData) {
        let plan = await HotelApi.savePlan(username, planData)
        alert.show("Saved");
    }

    return (
        <div className="col-lg-4 col-md-6 mb-4 mb-lg-0 room-card-list">
            <div className="card shadow-lg border-0 d-block room-card">
                {image? <img src={image} alt="Card image cap" className="card-img-top room-card-img" />
                        :<img src={noRoomImage} alt="Card image cap" className="card-img-top room-card-img" />
                }
                <div className="card-body p-2 room-detail-grid">
                    <h6 className="item1 cardDark">{description}</h6>
                    <div className="item2 card-text small text-muted font-italic">Sleeps {maxGuest} Guests.</div>
                    <div className="item3">
                        {currentUser? 
                        <button className="btn btn-sm btn-primary room-list-btn" onClick={handleClick}>Save plan</button>
                        :null
                        }
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HotelRoomCard;