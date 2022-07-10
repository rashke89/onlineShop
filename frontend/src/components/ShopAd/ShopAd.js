import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./shopAd.scss";
import { routeConfig } from "../../config/routeConfig";
import {useSelector} from "react-redux";


function ShopAd(props) {
    // state can change
    const [ad, setAd] = useState({});
    // const [ad, setPriceAd] = useState();

    const {currency} = useSelector((state) => state.currencyStore);
    // const [convertPrice, setConvertPrice] = useState([]);
    const [symbol, setSymbol] = useState("");


    // mount
    useEffect(() => {
        // props cannot change
        console.log("curr from shop", currency);
        if (currency === "EUR") {
            setSymbol("€");
            // setPriceAd(parseFloat(ad.price).toFixed(2))
        }
        if(currency === "USD"){
            setSymbol("$");
            // setPriceAd(parseFloat(ad.price / 0.98).toFixed(2))
        }
        if(currency === "RSD"){
            setSymbol("дин");
            // setPriceAd(parseFloat(ad.price / 0.98).toFixed(2))
        }
        setAd(props.ad)
    }, [currency, props.ad]);

    const checkSymbol = () => {
        if(symbol === "€"){
            return parseFloat(ad.price / 0.98).toFixed(2)
        }
        if(symbol === "$"){
            return parseFloat(ad.price).toFixed(2)
        }
        if(symbol === "дин"){
            return parseFloat(ad.price * 115.27).toFixed(2)
        }
    }


    return (
        <>
            {ad?.imgUrl ? <div className="shop-ad-wrapper col-md-3">
                <div className="shop-ad-content-wrapper">
                    <img src={ad.imgUrl} className="img img-fluid" alt="" />
                    <p className="shop-ad-title">{ad.title}</p>
                    <p>Rate: {ad.rating}</p>
                    <p className="shop-ad-price">
                        {/* {(symbol === "e") ? parseFloat(ad.price / 0.98).toFixed(2) : parseFloat(ad.price).toFixed(2) } {symbol}  */}
                        {symbol && checkSymbol()} {symbol}
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
