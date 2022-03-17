import React from "react";

function SearchStatesDropdownList ({ state }) {
    console.debug("SearchStatesDropdownList ", state);

    return (
        <li className="searchHotelsDropdownItem" type="state" state_code={state}>
            <div>
                <span className="searchStateDropdown">{state}</span>
                <div>
                    <small>
                    UNITED STATES OF AMERICA
                    </small>
                </div>
            </div>
        </li>
    )

}

export default SearchStatesDropdownList ;