import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";

function Pagination({ totalCount, type, city, state, zip, checkInDate, checkOutDate, adult, children }) {
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
        history.push(getPagingURL(p));
        window.location.reload()
    }

    function handlePreviousPageClick(e) {
        let p = CurrentPage - 1;
        
        history.push(getPagingURL(p));
        window.location.reload()
    }

    function handleNextPageClick(e) {
        let p

        if (CurrentPage == null){
            p=2;
        }
        else{
            p=CurrentPage + 1;
        }

        history.push(getPagingURL(p));
        window.location.reload()
    }


    function getPagingURL(pageNum){
        if (type =="city"){
            return (`/hotelsearch?type=${type}&city_code=${city}&state_code=${state}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&adult=${adult}&children=${children}&page=${pageNum}`);
        }
        else if (type == "zip"){
            return (`/hotelsearch?type=${type}&zip_code=${zip}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&adult=${adult}&children=${children}&page=${pageNum}`);
        }
        else{
            return (`/hotel?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&adult=${adult}&children=${children}`);
        }
    }

    return (
        <nav aria-label="Page navigation example" >
            <ul className="pagination">
                {(CurrentPage !== null && parseInt(CurrentPage) > 1) && 
                    (<li className="page-item" onClick={handlePreviousPageClick}>
                        <div className="page-link" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </div>
                    </li>)
                }
                {pageCount.map(p => (
                    <li className="page-item" onClick={handlePaginationClick}>
                        <div className="page-link">
                            {p}
                        </div>
                    </li>
                ))}
                {(CurrentPage == null || parseInt(CurrentPage) < pageCount.length) &&
                <li className="page-item" onClick={handleNextPageClick}>
                    <div className="page-link" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </div>
                </li>
                }
            </ul>
        </nav>
    )
}

export default Pagination;