import React from 'react';
import {arrows} from "./imgSource";

function Arrow() {
    return (
        <div className="arrows-holder">
            <div className="left">
                <img src={arrows.left} alt=""/>
            </div>
            <div className="right">
                <img src={arrows.right} alt=""/>
            </div>
        </div>
    );
}

export default Arrow;