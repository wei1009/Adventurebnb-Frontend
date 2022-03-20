import React from "react";

function SearchZipsDropdownList ({ zip, state, onMouseDownEvent }) {
    return (
        <li className="searchHotelsDropdownItem" type="zip" zip_code={zip} onMouseDown={onMouseDownEvent}>
            <div>
                <span className="searchZipDropdown">{zip}</span>
                <div>
                    <small>
                    {state}
                    </small>
                </div>
            </div>
        </li>
    )

}

export default SearchZipsDropdownList ;