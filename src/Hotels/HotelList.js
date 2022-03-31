import React from "react";
import '../CSS/HoteList.css';

/** Show information about hotels by city or zip code
 *
 * Is rendered by Hotel to show a "card" for each hotel.
 *
 * Hotel -> HotelList
 */

function HotelList(
    { hotelName, hotelFeature, street, city, state, postalCode, web, phone, image, rate, ranking,
        checkInDate, checkOutDate, hotelCode, adult, children }) {
        
    let absoulteUrl;



    return (
        <>
            <div className="container hotelList">
                <div className="row">
                    <div className="col-lg-4 hotel-list-image" style={{ backgroundImage: `url(${image})`}}>
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
                            <a href={web} target="_blank">{web}</a>
                            <div>{phone}</div>
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
                            href={`/hotel?type=hotel&hotel_code=${hotelCode}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&adult=${adult}&children=${children}`}>
                            Go to hotel
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
};

export default HotelList;