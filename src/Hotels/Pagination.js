import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";

function Pagination({ totalCount, type, city, state, checkInDate, checkOutDate, adult, children }) {
    const history = useHistory();
    const locationSearch = useLocation().search;
    let CurrentPage =new URLSearchParams(locationSearch).get("page");
    let page = Math.floor(totalCount / 50) + 1;
    let pageCount = []
    for (let i = 1; i <= page; i++) {
        pageCount.push(i)
    }

    function handlePaginationClick(e) {
        let p = e.target.innerText;
        history.push(`/hotelsearch?type=${type}&city_code=${city}&state_code=${state}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&adult=${adult}&children=${children}&page=${p}`);
        window.location.reload()
    }

    function handlePreviousPageClick(e) {
        if (CurrentPage == null || CurrentPage == pageCount[0]) {
            history.push(`/hotelsearch?type=${type}&city_code=${city}&state_code=${state}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&adult=${adult}&children=${children}&page=${CurrentPage}`)
        } else {
            let p = CurrentPage - 1;
            history.push(`/hotelsearch?type=${type}&city_code=${city}&state_code=${state}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&adult=${adult}&children=${children}&page=${p}`);
            window.location.reload()
        }
    }

    function handleNextPageClick(e) {
        if (CurrentPage == pageCount[pageCount.length - 1]) {
            history.push(`/hotelsearch?type=${type}&city_code=${city}&state_code=${state}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&adult=${adult}&children=${children}&page=${CurrentPage}`)
        } else if (CurrentPage == null || CurrentPage == pageCount[0]) {
            let p = 2;
            history.push(`/hotelsearch?type=${type}&city_code=${city}&state_code=${state}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&adult=${adult}&children=${children}&page=${p}`);
            window.location.reload()
        }

        else {
            let p =parseInt(CurrentPage)  + 1;
            history.push(`/hotelsearch?type=${type}&city_code=${city}&state_code=${state}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&adult=${adult}&children=${children}&page=${p}`);
            window.location.reload()
        }
    }

    return (
        <nav aria-label="Page navigation example" >
            <ul className="pagination">
                <li className="page-item" onClick={handlePreviousPageClick}>
                    <div className="page-link" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </div>
                </li>
                {pageCount.map(p => (
                    <li className="page-item" onClick={handlePaginationClick}>
                        <div className="page-link">
                            {p}
                        </div>
                    </li>
                ))}
                <li className="page-item" onClick={handleNextPageClick}>
                    <div className="page-link" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </div>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination;