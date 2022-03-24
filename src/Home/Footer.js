import React from "react";
import { Linkedin, Github } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import "../CSS/Footer.css"

function Footer() {
    return (
        <div className="footer">
            <div className="footer-content">
                <h4 className="footer-Info">Developed By Vivian Chang</h4>
                <Link className="social-icon" to={`https://www.linkedin.com/in/weifangchang/`}>
                    <Linkedin/>
                </Link >
                <Link className="social-icon" to={`https://github.com/wei1009`}>
                    <Github />
                </Link>
            </div>
        </div>
    )
}

export default Footer;
