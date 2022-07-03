import React from 'react';

import Slider from "../../components/Slider/Slider";
import Masonry from "../../components/Masonry/Masonry";

function Home(props) {
    return (
        <div className="container">
            <h1>Home</h1>
            <Slider />
            <Masonry changeSide={false}/>
        </div>
    );
}

export default Home;