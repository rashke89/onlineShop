import {useEffect, useState} from "react";
import "./shopAd.scss";

function ShopAd(props) {
    // state can change
    const [ad, setAd] = useState({});

    useEffect(() => {

        // props cannot change
        console.log(props.ad);
        setAd(props.ad)
    }, []);
    return (
        <div className="shop-ad-wrapper col-md-3">
            {ad.hasOwnProperty('image') ? <div>
                <img src={ad.image} className="img img-fluid" alt=""/>
                <p className="shop-ad-title">{ad.title}</p>
                <p>Rate: {ad.rating.rate}</p>
                <p className="shop-ad-price">{ad.price}$</p>
            </div> : null}
        </div>
    )
}

export default ShopAd;
