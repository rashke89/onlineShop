import React from 'react'
import { useSelector } from 'react-redux';
import './loader.scss';

function Loader() {

    const show = useSelector(state => state.loaderStore.show);

    return (
        <>
            {
                show &&
                <div className="loader-wrapper">
                    <div className="loader"></div>
                </div>
            }
        </>
    )
}

export default Loader;
