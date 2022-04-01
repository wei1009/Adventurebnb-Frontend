import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import "../CSS/Pagination.css";

function Pagination({ totalCount, type, city, state, zip, checkInDate, checkOutDate, adult, children }) {
    const history = useHistory();
    const locationSearch = useLocation().search;
    let queryPage = new URLSearchParams(locationSearch).get("page");
    let currentPage;
    let page = Math.floor(totalCount / 50) + 1;
    let pageCount = []
    
    for (let i = 1; i <= page; i++) {
        pageCount.push(i)
    }


    currentPage = isNaN(parseInt(queryPage)) ? 1 : parseInt(queryPage)

    function handlePaginationClick(e) {
        let p = e.target.innerText;

        if (parseInt(p) === currentPage){
            return;
        }

        history.push(getPagingURL(p));
        window.location.reload()
    }

    function handlePreviousPageClick(e) {
        let previousPage = currentPage - 1;
        
        history.push(getPagingURL(previousPage));
        window.location.reload()
    }

    function handleNextPageClick(e) {
        let nextPage = currentPage + 1;
        history.push(getPagingURL(nextPage));
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
                {(currentPage > 1) && 
                    (<li className="page-item" onClick={handlePreviousPageClick}>
                        <div className="page-link previous-page" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </div>
                    </li>)
                }
                {pageCount.map(p => (
                    <li className={`page-item ${p==currentPage? 'current-page': 'non-current-page'}`} onClick={handlePaginationClick}>
                        <div className={`page-link ${p==currentPage? 'current-page': 'non-current-page'}`}>
                            {p}
                        </div>
                    </li>
                ))}
                {(pageCount.length > 1 || currentPage < pageCount.length) &&
                <li className="page-item" onClick={handleNextPageClick}>
                    <div className="page-link next-page" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </div>
                </li>
                }
            </ul>
        </nav>
    )
}

export default Pagination;