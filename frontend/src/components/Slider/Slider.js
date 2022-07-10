import React, {useEffect, useState} from "react";
import Arrow from "./Arrow";
import Dots from "./Dots";
import SlideContent from "./SlideContent";
import ShopService from "../../services/shopService";
import {routeConfig} from "../../config/routeConfig";
import "./style.scss";

function Slider({showArrow = true, showDots = true, slideSpeed = 5000, autoPlay = true}) {
    const [images, setImages] = useState([]);
    const [currentImage, setCurrentImage] = useState(0);
    const [numberImages, setNumberImages] = useState(0);
    const [errorResponse, setErrorResponse] = useState({msg: "", haveErr: false});

    useEffect(() => {
        ShopService.getTopRatedProduct(5)
            .then((res) => {
                let ads = generateData(res.data)
                setNumberImages(ads.length);
                setImages(ads);
            })
            .catch(err => {
                setErrorResponse({
                    msg: err.message,
                    haveErr: true
                })
            });
    }, []);

    useEffect(() => {
        let interval = null
        //if have one images don`t set interval
        if (autoPlay && images.length > 1) {
            interval = setInterval(() => {
                changeSlide(1);
            }, slideSpeed);
        }
        return () => {
            clearInterval(interval);
        };
    }, [currentImage]);

    const generateData = (data) => {
        return data.map(ad => {
            return {
                title: ad.title,
                subtitle: ad.category,
                src: ad.image,
                btnText: "Read more",
                btnLink: routeConfig.AD_SHOP.realUrl(ad.id),
            }
        })
    }

    const changeSlide = (movement) => {
        let imgIndex = currentImage + movement;
        if (imgIndex === numberImages) {
            imgIndex = 0;
        } else if (imgIndex < 0) {
            imgIndex = numberImages - 1;
        }
        setCurrentImage(imgIndex);
    }

    return (
        <section className="slider slider-wrapper">
            {images.length > 0 && !errorResponse.haveErr ? (
                <SlideContent
                    currentIndex={currentImage}
                    image={images[currentImage]}
                />
            ) : <h2 className="slider-error">{errorResponse.msg}</h2>}
            {showArrow && images.length > 1 ? <Arrow changeSlide={changeSlide}/> : null}
            {showDots && images.length > 1 ? <Dots
                numberDots={numberImages}
                currentDot={currentImage}
                setCurrentSlide={setCurrentImage}
            /> : null}
        </section>
    );
}

export default Slider;
