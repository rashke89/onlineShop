import React, {useEffect, useState} from 'react';
import shopService from '../../services/shopService';
import ShopAd from "../../components/ShopAd/ShopAd";
import './shop.scss';
import FilterSort from "../../components/FilterSort/FilterSort";
import '../../assets/scss/base.scss';
import {useDispatch} from "react-redux";
import {showLoader} from "../../redux/loaderSlice";

function Shop({filterStatus, setFilterStatus}) {
    const [ads, setAds] = useState([]);
    const [filterPrice, setFilterPrice] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [sort, setSort] = useState("");
    const dispatch = useDispatch();
    let sortedAds;
    let filteredAds;
    let searchedAds;


// Search
    useEffect(() => {
        if (searchTerm !== "") {
            dispatch(showLoader(true));
            shopService.getSearchedAds(searchTerm)
                .then(res => {
                    if (res.status === 200) {
                        searchedAds = res.data;
                    }


                    setAds(searchedAds);

                })
                .catch(err => console.log(err))
                .finally(() => dispatch(showLoader(false)))
        } else {
            dispatch(showLoader(true));
            shopService.getAds()
                .then((res) => {
                    if (res.status === 200) {
                        setAds(res.data)
                    }
                })
                .catch(err => console.log(err))
                .finally(() => dispatch(showLoader(false)))
        }

    }, [searchTerm]);

    // Sort
    useEffect(() => {
        if (sort === "lowPrice") {
            sortedAds = [...ads];
            sortedAds = sortedAds.sort((a, b) => a.price - b.price);
            setAds(sortedAds)

        } else if (sort === "highPrice") {
            sortedAds = [...ads];
            sortedAds = sortedAds.sort((a, b) => b.price - a.price);
            setAds(sortedAds)

        }


    }, [sort]);

    // Filter
    useEffect(() => {
        if (filterPrice !== 0) {
            dispatch(showLoader(true));
            shopService.getFilteredAds(filterPrice)
                .then(res => {
                    if (res.status === 200) {
                        filteredAds = res.data;
                    }
                    setAds(filteredAds);
                })
                .catch(err => console.log(err))
                .finally(() => dispatch(showLoader(false)))
        }
    }, [filterPrice]);

    useEffect(() => {

    }, [ads])

    return (
        <div className="shop-wrapper container">
            <div className="row">
                <FilterSort setSort={setSort} filterStatus={filterStatus} setFilterStatus={setFilterStatus}
                            filterPrice={filterPrice} setFilterPrice={setFilterPrice} setSearchTerm={setSearchTerm}/>
            </div>
            <div className="row">
                {ads.length > 0 ? ads.map((element) => {
                    return <ShopAd ad={element} key={element._id}/>
                }) : <p>No products.</p>}
            </div>
        </div>
    );
}

export default Shop;
