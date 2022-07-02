import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import ShopService from "../../services/shopService";
import './ourProductSlider.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function OurProductSlider() {

    const [ads, setAds] = useState([]);

    useEffect(() => {
        ShopService.getAds()
            .then(response => {
                if (response.status === 200) {
                    console.log(response.data);
                    setAds(response.data);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    const settings = {
        className: "center",
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        swipeToSlide: true
    };

    return (
        <div className="our-product-slider">
            <Slider {...settings}>
                {ads.map((ad, index) => {
                    return <div className="card slider-card" key={index}>
                        <a href="">
                            <span className="product-img">
                                <img src={ad.imgUrl} alt="" />
                            </span>
                            <h3>{ad.title}</h3>
                            <span className="price">
                                <span className="amount">${ad.price}</span>
                            </span>
                        </a>
                        <p className="hover-content">
                            <a href=""><i class="fa fa-shopping-cart"></i>Add to cart</a>
                        </p>
                    </div>
                })}
            </Slider>


        </div>
    )
}

export default OurProductSlider;