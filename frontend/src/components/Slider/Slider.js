import React, {useEffect, useState} from 'react';
import {imageList} from "./imgSource";
import SlideContent from "./SlideContent";
import Arrow from "./Arrow";
import "./style.scss"
import Dots from "./Dots";


function Slider(props) {
    const [images, setImages] = useState([]);
    useEffect(() => {
        setImages(imageList[0])

        // fetch(url).then(res=>res.json()).then((res)=>{
        //     console.log(res.products)
        //     setImages(res)})
    }, []);


    return (
        <section className="slider-wrapper">
            <SlideContent image={images}/>
            <Arrow/>
            <Dots/>
        </section>
    );
}

export default Slider;