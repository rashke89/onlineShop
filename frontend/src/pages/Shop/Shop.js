import React, {useEffect, useState} from 'react';
import shopService from '../../services/shopService';
import ShopAd from "../../components/ShopAd/ShopAd";
import './shop.scss';

function Shop() {
    const [ads, setAds] =useState([]);
    useEffect(() => {
        shopService.getAds()
            .then((res) => {
                if (res.status === 200)
                    setAds(res.data);
                console.log('response...', res);
            })
            .catch(err => console.log(err));
    }, []);
    return (
        <div className="shop-wrapper container">
            <div className="row">
                {ads.map((element, index) => {
                    return <ShopAd ad={element} key={element.id}/>
                })}
            </div>
        </div>
    );
}

export default Shop;