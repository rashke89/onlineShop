import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import "./shopAd.scss";

function ShopAd(props) {
    // state can change
    const [ad, setAd] = useState({});

    // mount
    useEffect(() => {
        // props cannot change
        setAd(props.ad)
    }, []);

    // unmount
    useEffect(() => {
        return () => {
            console.log('test unmount');
        }
    });
    return (
        <>
            {ad?.image ? <div className="shop-ad-wrapper col-md-3">
                <div className="shop-ad-content-wrapper">
                    <img src={ad.image} className="img img-fluid" alt=""/>
                    <p className="shop-ad-title">{ad.title}</p>
                    <p>Rate: {ad.rating.rate}</p>
                    <p className="shop-ad-price">{ad.price}$</p>
                    <Link to={`/shop/ad/${ad.id}`} className="view-more-btn">
                        <p className="view-more-btn-text">View Product</p>
                    </Link>
                </div>
            </div> : null}
        </>
    )
}

export default ShopAd;
