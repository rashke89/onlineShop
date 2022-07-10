import React from 'react';
import "./loader.scss"
import {useSelector} from "react-redux";

function Loader() {
    const {show} = useSelector(state => state.loaderStore);
    return (
        <>
            {show && <div className="loader-wrapper">
                <div className="loader"></div>
            </div> }
        </>

    );
}

export default Loader;
