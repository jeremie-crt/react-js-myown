import React from "react";

import './Footer.css'

const Footer = () => {

    return (
        <div className="main-footer container">
            <p>Copyright { (new Date()).getFullYear() }</p>
        </div>
    )
}

export default Footer