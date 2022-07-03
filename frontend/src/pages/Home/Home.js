import React from 'react';
import OurProductSlider from '../../components/ourProductSlider/ourProductSlider';

import Slider from "../../components/Slider/Slider";
import Masonry from "../../components/Masonry/Masonry";
import Subscribe from "../../components/Subscribe/Subscribe";

function Home(props) {
    return (
        <>
            <div className="container">
                <h1>Home</h1>
                <Slider/>
                <Masonry/>
                <OurProductSlider/>
            </div>
            <Subscribe titleText="save 50% of sale"
                       titleTextBefore="Our Latest Collection"
                       titleTextAfter="Be the first to know about latest and modern furniture"
                       bgUrl="https://quantumalgorithms.ca/sites/default/files/2021-06/Subscribe%20BG.jpg"/>
        </>
    );
}

export default Home;
