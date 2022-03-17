import React, { useState, useContext, useEffect } from "react";
import HotelApi from "../api/api";
import UserContext from "../auth/UserContext";
import LoadingSpinner from "../common/LoadingSpinner";
import { Building } from "react-bootstrap-icons";
import { useAlert } from 'react-alert'
import "../CSS/PlanList.css"

function PlanList() {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [userPlan, setUserPlan] = useState([]);
    const alert = useAlert();
    let titleUsername = currentUser.username.toUpperCase();
    let username = currentUser.username;


    useEffect(function getUserPlanOnMount() {
        console.debug("getUserPlanOnMount");
        getUserPlan(username)
    }, []);

    async function getUserPlan(username) {
        let userPlan = await HotelApi.getUserPlan(username);
        setUserPlan(userPlan);
        console.log(userPlan)
    }

    const handleDeleteClick = (e) => {
        let planId = e.target.getAttribute("plan_id");
        console.log(planId);
        console.log(username);
        deletePlan(username, planId);
        getUserPlan(username);
    }

    const handlePlanCompleteClick = (e) => {
        let planId = e.target.getAttribute("plan_id");
        let planStatus = { status: "completed" };
        planStatusChange(username, planId, planStatus);
        getUserPlan(username);
    }

    const handlePlanUncompleteClick = (e) => {
        let planId = e.target.getAttribute("plan_id");
        let planStatus = { status: "pending" };
        planStatusChange(username, planId, planStatus);
        getUserPlan(username);
    }

    async function deletePlan(username, planId) {
        try {
            let plan = await HotelApi.deletePlan(username, planId);
            alert.show("The plan has been deleted.");
        }
        catch (e) {
            console.log(e);
            alert.show("Delete Plan Error: \n" + e[0]);
        }
    }

    async function planStatusChange(username, planId, planStatus) {
        // try{
        //     let plan  = await HotelApi.planStatusChange(username, planId, planStatus);
        //     alert.show("The plan has been deleted.");
        // }
        // catch(e){
        //     console.log(e);
        //     alert.show("Delete Plan Error: \n" + e[0]);
        // }
        let plan = await HotelApi.planStatusChange(username, planId, planStatus);
    }

    if (!userPlan) { return <LoadingSpinner /> }

    return (
        <div className="plan-page">
            <div className="plan-list" >
                <h1> {titleUsername}'s Accommodation Plan</h1>
                {userPlan.map(p => (
                    <div className="plan-container" key={p.user_plan_id}>
                        <div className="plan-card">
                            <div className="plan-preview">
                                <h6 className="plan-title">Accommodation Plan</h6>
                                <div className="plan-savedate">Save Date: {p.create_date.split('T')[0]}<i className="fas fa-chevron-right"></i></div>
                            </div>
                            <div className="plan-info">
                                <div className="plan-date">
                                    <h4>{p.checkin_date.split('T')[0]}</h4>
                                    <h5>to </h5>
                                    <h4>{p.checkout_date.split('T')[0]}</h4>
                                </div>
                                <h4 className="plan-hotel-name"><Building className="ml-4" /> {p.name}</h4>
                                <h5> {p.room_description}</h5>
                                <div>{p.guest_adult} adult(s), {p.guest_children} kid(s)</div>
                                <div className="plan-address">
                                    {p.street1},
                                    <div> {p.city}, {p.state} {p.zip}</div>
                                </div>
                            </div>
                            <div className="plan-status">
                                {p.status == "pending" ? (<button className="plan-btn" plan_id={p.user_plan_id} onClick={handlePlanCompleteClick}>Completed</button>)
                                    : null

                                }
                                {p.status == "completed" ? (<button className="plan-btn" plan_id={p.user_plan_id} onClick={handlePlanUncompleteClick}>uncompleted</button>)
                                    : null

                                }
                                <button className="plan-btn" plan_id={p.user_plan_id} onClick={handleDeleteClick}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default PlanList;