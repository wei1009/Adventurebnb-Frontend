import React from "react";
import { Link } from "react-router-dom";

function SearchStatesDropdownList ({ state }) {
    console.debug("SearchStatesDropdownList ", state);

    return (
        // <Link className="CompanyCard card" to={`/companies/${handle}`}>
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


        // </Link>
    )

}

export default SearchStatesDropdownList ;