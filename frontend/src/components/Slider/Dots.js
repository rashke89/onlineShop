import React from 'react';
import Dot from "./Dot";

function Dots({numberDots, currentDot, setCurrentSlide}) {
    const dots = []
    for (let i = 0; i < numberDots; i++) {
        dots.push(<Dot key={i} isActive={currentDot === i} index={i} setCurrent={setCurrentSlide}/>)
    }
    return (
        <div className="dots-holder">
            {dots}
        </div>
    );
}

export default Dots;