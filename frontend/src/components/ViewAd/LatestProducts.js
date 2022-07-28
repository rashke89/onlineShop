import {useEffect, useState, useMemo, useLayoutEffect} from "react";
import shopService from "../../services/shopService";
import SharedService from "../../services/sharedService";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ChangeCurrency from "../ChangeCurrency/ChangeCurrency";
import {useDispatch} from "react-redux";
import {addToCart} from "../../redux/cartSlice";
import "../ourProductSlider/ourProductSlider.scss";


function LatestProducts() {
    const [ads, setAds] = useState([]);
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        console.log('ads....', ads)
    })
    useEffect(() => {
        shopService.getRandomAds(15)
            .then((res) => {
                if (res.status === 200) {
                    setAds(res.data);
                }
            })
            .catch(err => console.log(err));
    }, []);

//    const memoizedValue = useMemo(() => doSomething(a, b), [a, b]);
//    const memoizedCallback = useCallback(() => { doSomething(a, b)}, [a, b]);

    const setts = {
        className: "center",
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
        swipeToSlide: true
    };

    return <>
        <div className="our-product-slider latest-products">
            <div className="section-header">
                <h3 className="text-center">Latest products</h3>
            </div>
            <Slider {...setts}>
                {ads.map((ad, index) => {
                    return <div className="card slider-card" key={index}>
                        <a href="">
                            <span className="new-product">New</span>
                            <span className="product-img">
                                <img src={SharedService.getCorrectImgUrl(ad.imgUrl)} alt=""/>
                            </span>
                            <h3>{ad.title}</h3>
                            <span className="price">
                                <span className="amount">
                                    <ChangeCurrency adConvertPrice={ad.price}/>
                                </span>
                            </span>
                        </a>
                        <p className="hover-content">
                            <a href="" className="add-to-cart" onClick={e => {
                                e.preventDefault();
                                dispatch(addToCart(ad));
                            }}><i className="fa fa-shopping-cart"> </i>Add to cart</a> <br/>

                                <i className="fa fa-heart icons mx-1" aria-hidden="true"> </i>
                                <i className="fa fa-eye icons mx-1" aria-hidden="true"> </i>
                                <i className="fa fa-retweet icons mx-1" aria-hidden="true"> </i>

                        </p>
                    </div>
                })}
            </Slider>
        </div>

    </>

}

export default LatestProducts;
