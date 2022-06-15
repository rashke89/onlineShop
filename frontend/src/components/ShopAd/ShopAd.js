import React from 'react';
import "./style.scss"

function ShopAd({ad}) {
    return (
        <div className="shop-ad-wrapper">
            <div className="shop-ad-image">
                <img src={ad.image} className="img-fluid" alt=""/>
                <div className="shop-ad-preview">
                    <button><i className="bi-alarm"></i>
                    </button>
                </div>
            </div>
            <div className="shop-ad-text">
                <h4 className="shop-ad-title">{ad.title}</h4>
                <p className="shop-ad-rate">Rate: {ad.rating.rate}</p>
                <div>
                    <p className="shop-ad-price">${ad.price}</p>
                    <button className="add-to-cart">Add to cart</button>
                </div>
            </div>
        </div>
    );
}

export default ShopAd;