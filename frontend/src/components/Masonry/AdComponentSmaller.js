import {useEffect, useState} from "react";
import {routeConfig} from "../../config/routeConfig";

function AdComponentSmaller({products}) {
    const [ad, setAd] = useState([]);

    useEffect(() => {
        setAd(products)
    }, [products]);

    return (
        <>
            {ad.map((el, index) => {
                if (index < 2) {
                    return (
                        ad &&<div className={`${index % 2 === 0 ? 'modern-box modern-shop reverse' : 'modern-box modern-shop'}`} key={el._id}>
                            <div className="col-md-7 col-sm-6 col-xs-6 img-holder">
                                <img src={el.imgUrl} className="img" alt=""/>
                            </div>
                            <div className="col-md-5 col-sm-6 col-xs-6">
                                <h3 className="ad-heading">Save up to 50% off</h3>
                                <h5 className="description">Stylish furniture</h5>
                            </div>
                            <a className="shop-now" href={routeConfig.AD_SHOP.realUrl(el._id)}>Shop now
                                <i className="bi bi-caret-right-fill" aria-hidden={true}> </i>
                            </a>
                        </div>
                    )
                }
            })}
        </>
    )
}

export default AdComponentSmaller;