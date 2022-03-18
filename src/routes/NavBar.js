import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav } from 'react-bootstrap';
import UserContext from "../auth/UserContext";
import { PersonPlusFill, BoxArrowInRight, CardList, PersonCircle } from "react-bootstrap-icons";
import Logo from '../logo.jpg';
import "../CSS/NavBar.css";



function NavBar({ logout }) {
    const { currentUser } = useContext(UserContext);
    console.debug("NavBar", "currentUser=", currentUser);

    function loggedInNav() {
        return (
            <>
                <NavLink className="nav-link text-primary" to="/myplan">
                    Accommodation Plan <CardList className="navbar-icon" />
                </NavLink>

                <NavLink className="nav-link text-primary" to="/profile">
                    profile <PersonCircle className="navbar-icon" />
                </NavLink>

                <Link className="nav-link text-primary" to="/" onClick={logout}>
                    Log out {currentUser.first_name || currentUser.username} <BoxArrowInRight className="navbar-icon" />
                </Link>

            </>
        )
    }

    function loggedOutNav() {
        return (
            <>
                <NavLink className="nav-link text-primary" to="/login">
                    Login <BoxArrowInRight className="navbar-icon" />
                </NavLink>
                <NavLink className="nav-link text-primary" to="/signup">
                    Sign Up <PersonPlusFill className="navbar-icon" />
                </NavLink>
            </>
        )
    }

    return (
        <div className="NavBar">
            <Navbar collapseOnSelect expand="sm">
                <Link to="/" className="navbar-brand text-primary logo" >Hotel Searching</Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="navItem ms-auto">
                        {currentUser ? loggedInNav() : loggedOutNav()}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default NavBar;