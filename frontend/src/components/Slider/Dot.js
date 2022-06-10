import React, {useEffect} from 'react';

function Dot({isActive, setCurrent, index}) {
    return (
        <div className={isActive ? "dot active" : "dot"} onClick={() => {
            setCurrent(index)
        }}></div>
    );
}

export default Dot;