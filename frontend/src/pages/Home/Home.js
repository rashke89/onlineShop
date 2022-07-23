import React from 'react';
import OurProductSlider from '../../components/ourProductSlider/ourProductSlider';

import Slider from "../../components/Slider/Slider";
import Masonry from "../../components/Masonry/Masonry";

function Home(props) {
    return (
        <div className="container">
            <Slider />
            <Masonry/>
            <OurProductSlider />
        </div>
    );
}

export default Home;
