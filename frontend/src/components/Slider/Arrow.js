import React from 'react';
import {arrows} from "./SourceData";

function Arrow({changeSlide}) {

    const prevSlide = () => {
        changeSlide(-1)
    }
    const nextSlide = () => {
        changeSlide(1);
    }

    return (
        <div className="arrows-holder">
            <div className="left" onClick={prevSlide}>
                <img src={arrows.left} alt=""/>
            </div>
            <div className="right" onClick={nextSlide}>
                <img src={arrows.right} alt=""/>
            </div>
        </div>
    );
}

export default Arrow;