import React from 'react';
import { GiSandsOfTime } from "react-icons/gi";
import './messages.scss';

function Processing() {
    return (
        <>
            <div className="processing-wrapper">
                <h3><GiSandsOfTime /> Payment is in progress, please wait.</h3>
            </div>
        </>
    )
}

export default Processing
