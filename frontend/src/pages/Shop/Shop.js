import React, {useEffect, useState} from 'react';
import shopService from '../../services/shopService';
import ShopAd from "../../components/ShopAd/ShopAd";
import './shop.scss';
import '../../assets/scss/base.scss';

function Shop() {
    const [ads, setAds] =useState([]);
    const[sort, setSort]=useState("");
    let sortedAds;

    useEffect(() => {
        shopService.getAds()
            .then((res) => {
                if (res.status === 200)

                    sortedAds=res.data;


                if(sort==="lowPrice"){
                    sortedAds= sortedAds.sort((a, b)=> a.price - b.price);
                }else if(sort==="highPrice"){

                    sortedAds= sortedAds.sort((a, b)=> b.price - a.price);
                }
                setAds(sortedAds)

                    setAds(sortedAds);

            })
            .catch(err => console.log(err));
    }, [sort]);
    return (
        <div className="shop-wrapper container">
            <div className="shopNav d-flex justify-content-end m-auto container mt-3">

                <div><span>Sort by: </span>
                    <select  onChange={(event)=>{
                        setSort(event.target.value);

                    }}>
                        <option value="lowPrice">Low price</option>
                        <option value="highPrice">High price</option>
                    </select></div>
            </div>
            <div className="row">
                {ads.length > 0 ? ads.map((element) => {
                    return <ShopAd ad={element} key={element._id}/>
                }) : <div className="loader"></div>}
            </div>
        </div>
    );
}

export default Shop;
