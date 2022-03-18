import React from "react";
import { Link } from "react-router-dom";
import "../CSS/TravelInfo.css"

function TravelInfo() {
    const date = new Date();
    let checkInDate = date.toISOString().split('T')[0]
    let defaultCheckOutDate = new Date(checkInDate);
    defaultCheckOutDate.setDate(defaultCheckOutDate.getDate() + 1)
    let checkOutDate = defaultCheckOutDate.toISOString().split('T')[0];

    return (
        <div className="home-Info-detail">
            <div className="city-destination-recommand">
                <div className="container">
                    <h2 className="destination-title">Top destinations in the United States</h2>
                    <div className="city-layout column">

                        <Link className="city-destination row " 
                        to={`/city?type=city&city_code=NEW+YORK&state_code=NY&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&adult=2&children=0`}>
                            <img className="city-destination-image"
                                style={{ backgroundImage: `url(https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80)` }}>

                            </img>
                            <span>New York (NY)</span>
                        </Link>
                        <Link className="city-destination row "
                        to={`city?type=city&city_code=LAS+VEGAS&state_code=NV&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&adult=2&children=0`}>
                            <img className="city-destination-image"
                                style={{ backgroundImage: `url(https://images.unsplash.com/photo-1470076892663-af684e5e15af?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1016&q=80)` }}>
                            </img>
                            <span>Las Vegas (NV)</span>
                        </Link>
                        <Link className="city-destination row "
                        to={`city?type=city&city_code=LOS+ANGELES&state_code=CA&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&adult=2&children=0`}>
                            <img className="city-destination-image"
                                style={{ backgroundImage: `url(https://images.unsplash.com/photo-1572975165675-ab322e4b55ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80)` }}>
                            </img>
                            <span>Los Angeles (CA)</span>
                        </Link>
                        <Link className="city-destination row "
                        to={`city?type=city&city_code=ORLANDO&state_code=FL&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&adult=2&children=0`}>
                            <img className="city-destination-image"
                                style={{ backgroundImage: `url(https://images.unsplash.com/photo-1575089776834-8be34696ffb9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80)` }}>
                            </img>
                            <span>Orlando (FL)</span>
                        </Link>
                        <Link className="city-destination row "
                        to={`city?type=city&city_code=DALLAS&state_code=TX&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&adult=2&children=0`}>
                            <img className="city-destination-image"
                                style={{ backgroundImage: `url(https://images.unsplash.com/photo-1563219125-60d10ffe8877?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1152&q=80)` }}>
                            </img>
                            <span>Dallas (TX)</span>
                        </Link>
                        <Link className="city-destination row "
                        to={`city?type=city&city_code=PHOENIX&state_code=AZ&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&adult=2&children=0`}>
                            <img className="city-destination-image"
                                style={{ backgroundImage: `url(https://images.unsplash.com/photo-1589046207215-b5ee3097bafc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)` }}>
                            </img>
                            <span>Phoenix (AZ)</span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="home-grid">
                <h3 className="home-grid-item-1" >

                    Travel Makes You Happier

                </h3>
                <div className="home-grid-item-2" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=449&q=80)` }}>

                </div>
                <h3 className="home-grid-item-3">
                    “I travel because it makes me realize how much I haven’t seen, how much I’m not going to see, and how much I still need to see.” – Carew Papritz
                </h3>
                <div className="home-grid-item-4" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1563911302283-d2bc129e7570?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80)` }}>

                </div>
                <h3 className="home-grid-item-5">
                    Don't Listen to what they say. Go see.
                </h3>
                <div className="home-grid-item-6" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1592555059503-0a774cb8d477?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80)` }}>

                </div>

            </div>

        </div>
    )
}

export default TravelInfo;
