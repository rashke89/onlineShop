import React from 'react';
import OurProductSlider from '../../components/ourProductSlider/ourProductSlider';

import Slider from "../../components/Slider/Slider";

function Home(props) {
    return (
        <div className="container">
            <h1>Home</h1>
            <Slider />
            <OurProductSlider />
        </div>
    );
}

export default Home;