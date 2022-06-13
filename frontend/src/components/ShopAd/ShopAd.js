import {useEffect, useState} from "react";
import "./shopAd.scss";

function ShopAd(props) {
    // state can change
    const [ad, setAd] = useState({});
    const [count, setCount] = useState(true);

    // mount
    useEffect(() => {
        // props cannot change
        console.log(props.ad.el);
        setAd(props.ad.el)
    }, []);

    // condition
    useEffect(() => {
        // props cannot change
        console.log('test');
        // setAd(props.ad)
    }, [count]);

    // unmount
    useEffect(() => {
        return () => {
            console.log('test unmount');
        }
    });
    return (
        <div className="shop-ad-wrapper col-md-3">
            {ad?.image ? <div>
                <img src={ad.image} className="img img-fluid" alt=""/>
                <p className="shop-ad-title">{ad.title}</p>
                <p>Rate: {ad.rating.rate}</p>
                <p className="shop-ad-price">{ad.price}$</p>
            </div> : null}
        </div>
    )
}

export default ShopAd;
