import React, { useEffect, useState } from 'react';
import shopService from '../../services/shopService';
import ShopAd from "../../components/ShopAd/ShopAd";
import './shop.scss';
import FilterSort from "../../components/FilterSort/FilterSort";
import '../../assets/scss/base.scss';
import { useDispatch } from "react-redux";
import { showLoader } from "../../redux/loaderSlice";
import { useSearchParams } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import RatingStarsModal from '../../components/RatingStarsModal/RatingStarsModal';

function Shop({ filterStatus, setFilterStatus }) {
    const [ads, setAds] = useState([]);
    const [filterPrice, setFilterPrice] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [sort, setSort] = useState("");
    const [query, setQuery] = useSearchParams();
    const dispatch = useDispatch();
    let sortedAds;
    let filteredAds;
    let searchedAds;

    useEffect(() => {
        let queryParam = query.get('search');
        queryParam && setSearchTerm(queryParam);
    }, [query]);


    // Search
    useEffect(() => {
        if (searchTerm.length > 3) {
            dispatch(showLoader(true));
            setQuery({ "search": searchTerm });
            searchAds()
        } else if (!searchTerm) {
            dispatch(showLoader(true));
            setQuery({});
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

    const searchAds = () => {
        shopService.getSearchedAds(searchTerm)
            .then(res => {
                if (res.status === 200) {
                    searchedAds = res.data;
                }
                setAds(searchedAds);
            })
            .catch(err => console.log(err))
            .finally(() => dispatch(showLoader(false)))
    }

    return (
        <div className="shop-wrapper container">
            <div className="row">
                <FilterSort setSort={setSort} filterStatus={filterStatus} setFilterStatus={setFilterStatus}
                    filterPrice={filterPrice} setFilterPrice={setFilterPrice} setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
            </div>
            <div className="row">
                {ads.length > 0 ? ads.map((element) => {
                    return <ShopAd ad={element} key={element._id} />
                }) : <p>No products.</p>}
                {ads.length > 0 ? ads.map((element) => {
                    return <RatingStarsModal ad={element} key={element._id} />
                }) : null}
            </div>
            <ToastContainer />

        </div>
    );
}

export default Shop;
