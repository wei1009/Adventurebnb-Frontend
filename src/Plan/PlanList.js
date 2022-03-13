import React, { useState, useContext } from "react";
import HotelApi from "../api/api";
import UserContext from "../auth/UserContext";
import "../CSS/PlanList.css"

function PlanList() {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    return (
        <div className="plan-page">
            <h2>  User's Accommodation Plan</h2>
            <div className="plan-list" >
            <table className="plan-table table" >
                <tr className="table-header table-primary">
                    <th scope="col" className="table-header-content-save-date">Save Date</th>
                    <th scope="col" className="table-header-content-date">Check In Date</th>
                    <th scope="col" className="table-header-content-date">Check Out Date</th>
                    <th scope="col" className="table-header-content-name">Hotel Name</th>
                    <th scope="col" className="table-header-content-room">Room Type</th>
                    <th scope="col" className="table-header-content">Adult</th>
                    <th scope="col" className="table-header-content">Children</th>
                    <th scope="col" className="table-header-content-sataus">Staus</th>
                </tr>
                <tr>
                    <td>03-10-2022</td>
                    <td>03-11-2022</td>
                    <td>03-12-2022</td>
                    <td>Hiltom Chicagodffgzfgzf</td>
                    <td>Double Bed</td>
                    <td>2</td>
                    <td>1</td>
                    <td><button className="table-btn btn btn-sm btn-outline-danger">Delete</button></td>
                </tr>
                <tr>
                    <td>03-10-2022</td>
                    <td>03-11-2022</td>
                    <td>03-12-2022</td>
                    <td>Hiltom Chicaggzdgzzfgzf</td>
                    <td>Double Bed</td>
                    <td>2</td>
                    <td>1</td>
                    <td><button className="table-btn btn btn-sm btn-outline-danger">Delete</button></td>
                </tr>
                 <tr>
                    <td>03-10-2022</td>
                    <td>03-11-2022</td>
                    <td>03-12-2022</td>
                    <td>Hiltom Chicagodfzgzfgzf</td>
                    <td>Double Bed</td>
                    <td>2</td>
                    <td>1</td>
                    <td><button className="  table-btn btn btn-sm btn-outline-danger">Delete</button></td>
                </tr>
            </table>
            </div>
        </div>
    )
}


export default PlanList;