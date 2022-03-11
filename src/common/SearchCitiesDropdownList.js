import React from "react";

import { Link } from "react-router-dom";

function SearchCitiesDropdownList({index, city, state, onClickEvent}) {
    console.debug("SearchCitiesDropdownList ", city);
    //let cityCode=concat(city,"-",state)

    return (
        // <Link className="CompanyCard card" to={`/companies/${handle}`}>
        <li className="searchHotelsDropdownItem" type="city" city_code={city} state_code={state} onClick={onClickEvent}>
            <div>
                <span className="searchCityDropdown">
                    
                    {city + ", " + state} 
                </span>
                <div>
                    <small>
                    UNITED STATES OF AMERICA
                    </small>
                </div>
            </div>
        </li>


        // </Link>
    )
}

export default SearchCitiesDropdownList;