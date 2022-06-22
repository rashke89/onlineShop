import React, {useEffect, useState} from "react";
import Arrow from "./Arrow";
import Dots from "./Dots";
import SlideContent from "./SlideContent";
import ShopService from "../../services/shopService";
import "./style.scss";

function Slider() {
    const [images, setImages] = useState([]);
    const [currentImage, setCurrentImage] = useState(0);
    const [numberImages, setNumberImages] = useState(0);
    const [configSlider] = useState({
        showArrow: true,
        showDots: true,
        slideSpeed: 5000,
        autoPlay: true
    })
    useEffect(() => {
        ShopService.getTopRatedProduct(5).then((res) => {
            let ads = generateData(res.data)
            setNumberImages(ads.length);
            setImages(ads);
        });
    }, []);

    useEffect(() => {
        let interval = null
        if (configSlider.autoPlay) {
            interval = setInterval(() => {
                changeSlide(1);
            }, configSlider.slideSpeed);
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
                btnLink: "/shop/ad/" + ad.id,
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
        <section className="slider-wrapper">
            {images.length > 0 ? (
                <SlideContent
                    currentIndex={currentImage}
                    image={images[currentImage]}
                />
            ) : null}
            {configSlider.showArrow ? <Arrow changeSlide={changeSlide}/> : null}
            {configSlider.showDots ? <Dots
                numberDots={numberImages}
                currentDot={currentImage}
                setCurrentSlide={setCurrentImage}
            /> : null}
        </section>
    );
}

export default Slider;
