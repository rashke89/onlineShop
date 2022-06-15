import React, {useEffect, useState} from 'react';
import ShopService from "../../services/shopService";
import ShopAd from "../../components/ShopAd/ShopAd";
import "./style.scss";

function Shop() {
    const [ads, setAds] = useState([]);
    useEffect(() => {
        ShopService.getAds().then((res) => {
            if (res.status === 200) {
                setAds(res.data)
            }
        }).catch((err) => {
            console.log(err)
        })
    }, []);

    return (
        <div className="shop-wrapper container">

            {ads.map((el, index) => {
                return <ShopAd ad={el} key={index}/>
            })}

        </div>
    );
}

export default Shop;