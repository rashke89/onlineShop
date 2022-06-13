import React, {useEffect, useState} from 'react';
import axios from "axios";
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
        //if we use local source from SourceData.ja
        // setImages(imageList)
        // setNumberImages(imageList.length)
        // console.log(JSON.stringify(imageList))

        axios.get("https://raw.githubusercontent.com/zile028/fake-db/main/slider_images.json")
            .then(res => res.data).then((res) => {
            setImages(res)
            setNumberImages(res.length)
        })
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