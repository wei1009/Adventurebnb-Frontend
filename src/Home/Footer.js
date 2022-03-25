import React from "react";
import { Linkedin, Github } from "react-bootstrap-icons";
import "../CSS/Footer.css"

function Footer() {
    return (
        <div className="footer">
            <div className="footer-content">
                <h4 className="footer-Info">Developed By Vivian Chang</h4>
                <a className="social-icon" href="https://www.linkedin.com/in/weifangchang/">
                    <Linkedin/>
                </a >
                <a className="social-icon" href="https://github.com/wei1009">
                    <Github />
                </a>
            </div>
        </div>
    )
}

export default Footer;
