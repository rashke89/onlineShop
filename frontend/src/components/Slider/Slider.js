import React, { useEffect, useState } from "react";
import Arrow from "./Arrow";
import Dots from "./Dots";
import SlideContent from "./SlideContent";
import ShopService from "../../services/shopService";
import "./style.scss";

function Slider() {
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [numberImages, setNumberImages] = useState(0);

  useEffect(() => {
    ShopService.getAds().then((res) => {
      let ads = res.data.splice(0, 5);
      console.log(ads);
      let temp = [];
      ads.forEach((ad) => {
        temp.push({
          title: ad.title,
          subtitle: ad.category,
          src: ad.image,
          btnText: "Read more",
          btnLink: "/shop/ad/" + ad.id,
        });
      });
      setNumberImages(temp.length);
      setImages(temp);
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      changeSlide(1);
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [currentImage]);

  function changeSlide(movement) {
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
      <Arrow changeSlide={changeSlide} />
      <Dots
        numberDots={numberImages}
        currentDot={currentImage}
        setCurrentSlide={setCurrentImage}
      />
    </section>
  );
}

export default Slider;
