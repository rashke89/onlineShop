import {useEffect, useState} from "react";
import {routeConfig} from "../../config/routeConfig";

function AdComponentBigger({products}) {
    const [ad, setAd] = useState([]);

    useEffect(() => {
        setAd(products)
    }, []);

    return (
        <>
            {ad.map((el, index) => {
                if (index >= 2) {
                    return (
                        <div className={`${index % 2 === 0 ? 'modern-box modern-product reverse' : 'modern-box modern-product'}`} key={el._id}>
                            <div className="col-md-3 col-sm-6 col-xs-6">
                                <img src={el.imgUrl} className="img" alt=""/>
                            </div>
                            <div className="col-md-9 col-sm-6 col-xs-6">
                                <h3 className="ad-heading">{el.title}</h3>
                            </div>
                            <a href={routeConfig.AD_SHOP.realUrl(el._id)} className="shop-now">Shop now
                                <i className="bi bi-caret-right-fill" aria-hidden={true}> </i>
                            </a>
                        </div>
                    )
                }
            })}
            <div className="static modern-product">
                <div className="col-md-6 col-sm-6 col-xs-12">
                    <div className="discount-box">
                        <h3>50% <br/>Discount</h3>
                        <p>on Every brand</p>
                        <a href={routeConfig.SHOP.url}>Shop now</a>
                    </div>
                </div>
                <div className="col-md-6 col-sm-6 col-xs-12">
                    <div className="discount-img-box">
                        <img src={require("./img/rishabh-malhotra-83ypHTv6J2M-unsplash.jpg")} alt="" />
                    </div>
                    <div className="discount-img-content">
                        <h3>Trendy phones</h3>
                        <a href={routeConfig.SHOP.url}>Shop now</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdComponentBigger;