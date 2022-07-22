import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import ShopService from "../../services/shopService";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import './ourProductSlider.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ChangeCurrency from "../ChangeCurrency/ChangeCurrency";
import { Link } from "react-router-dom";


function OurProductSlider() {

    const [ads, setAds] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        ShopService.getRandomAds(10)
            .then(response => {
                if (response.status === 200) {
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
                                <span className="amount">
                                    <ChangeCurrency adConvertPrice={ad.price} />
                                </span>
                            </span>
                        </a>
                        <p className="hover-content">
                            <a href="" className="add-to-cart" onClick={e => {
                                e.preventDefault();
                                dispatch(addToCart(ad));
                            }}><i className="fa fa-shopping-cart"></i>Add to cart</a> <br />
                            <Link to={`/shop/ad/${ad._id}`} className="view-product">View product</Link>
                        </p>
                    </div>
                })}
            </Slider>
        </div>
    )
}

export default OurProductSlider;
