import React from "react";

function SearchHotelsDropdownList({ code, name, city,state, onMouseDownEvent}) {
    console.debug("SearchHotelsDropdownList", name);

    return (
        <li className="searchHotelsDropdownItem" type="hotel" hotel_code={code} onMouseDown={onMouseDownEvent}>
            <div>
                <span className="searchHotelDropdown">{name}</span>
                <div>
                    <small>
                        {city}, {state}
                    </small>
                </div>
            </div>
        </li>
    )
}

export default SearchHotelsDropdownList;