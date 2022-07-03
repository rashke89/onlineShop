import React from 'react';
import "./loader.scss"

function Loader() {
    return (
        <div className="loader-wrapper">
            <div className="loader-bar">
                <div className="loader-bar-item"></div>
                <div className="loader-bar-item"></div>
                <div className="loader-bar-item"></div>
            </div>
        </div>
    );
}

export default Loader;