import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./shopAd.scss";
import { routeConfig } from "../../config/routeConfig";
import RatingStars from "../RatingStars/RatingStars";

import ChangeCurrency from "../ChangeCurrency/ChangeCurrency";


function ShopAd(props) {
    const [ad, setAd] = useState({});
    // mount
    useEffect(() => {
        setAd(props.ad)
    }, [props.ad]);
    return (
        <>
            {ad?.imgUrl ? <div className="shop-ad-wrapper col-md-3">
                <div className="shop-ad-content-wrapper">
                    <img src={ad.imgUrl} className="img img-fluid" alt="" />
                    <p className="shop-ad-title">{ad.title}</p>
                    <span className="shop-ad-rating">
                        <RatingStars rating={ad.rating}/>
                    </span>
                    <p className="shop-ad-price">
                        <ChangeCurrency adConvertPrice={ad.price} />
                    </p>
                    <Link to={routeConfig.AD_SHOP.realUrl(ad._id)} className="view-more-btn">
                        <p className="view-more-btn-text">View Product</p>
                    </Link>
                </div>
            </div> : null}
        </>
    )
}

export default ShopAd;
