import React, {useEffect, useState} from 'react';
import Arrow from "./Arrow";
import Dots from "./Dots";
import SlideContent from "./SlideContent";
import {imageList} from "./SourceData"; //array with object with property src and title
import "./style.scss"

function Slider() {
    const [images, setImages] = useState([]);
    const [currentImage, setCurrentImage] = useState(0);
    const [numberImages, setNumberImages] = useState(0);

    useEffect(() => {
        setImages(imageList)
        setNumberImages(imageList.length)
        // fetch(url).then(res=>res.json()).then((res)=>{
        //     console.log(res.products)
        //     setImages(res)})
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            changeSlide(1)
        }, 5000)
        return () => {
            clearInterval(interval)
        };
    }, [currentImage]);

    function changeSlide(movement) {
        let imgIndex = currentImage + movement
        if (imgIndex === numberImages) {
            imgIndex = 0
        } else if (imgIndex < 0) {
            imgIndex = numberImages - 1
        }
        setCurrentImage(imgIndex)
    }

    return (
        <section className="slider-wrapper">
            {images.length > 0 ? <SlideContent currentIndex={currentImage} images={images}/> : null}
            <Arrow changeSlide={changeSlide}/>
            <Dots numberDots={numberImages} currentDot={currentImage} setCurrentSlide={setCurrentImage}/>
        </section>
    );
}

export default Slider;