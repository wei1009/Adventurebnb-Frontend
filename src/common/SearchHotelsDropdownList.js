import React from "react";
import { Link } from "react-router-dom";

function SearchHotelsDropdownList({ code, name, city,state, onClickEvent}) {
    console.debug("SearchHotelsDropdownList", name);

    return (
        // <Link className="CompanyCard card" to={`/companies/${handle}`}>
        <li className="searchHotelsDropdownItem" type="hotel" hotel_code={code} onClick={onClickEvent}>
            <div>
                <span className="searchHotelDropdown">{name}</span>
                <div>
                    <small>
                        {city}, {state}
                    </small>
                </div>
            </div>
        </li>


        // </Link>
    )
}

export default SearchHotelsDropdownList;