import React, {useEffect, useState} from 'react';
import shopService from '../../services/shopService';
import ShopAd from "../../components/ShopAd/ShopAd";
import './shop.scss';
import FilterSort from "../../components/FilterSort/FilterSort";
import '../../assets/scss/base.scss';
import {useDispatch} from "react-redux";
import {showLoader} from "../../redux/loaderSlice";
import {useSearchParams} from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";

function Shop({filterStatus, setFilterStatus}) {
    const [ads, setAds] = useState([]);
    const [filterPrice, setFilterPrice] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [sort, setSort] = useState("");
    const [query, setQuery] = useSearchParams();
    const dispatch = useDispatch();
    let sortedAds;
    let filteredAds;
    let searchedAds;

    //pagination
    // const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);


    useEffect(() => {
        let queryParam = query.get('search');
        queryParam && setSearchTerm(queryParam);
        console.log('SHOPP CURREENT PAGE', currentPage);
    }, [query]);

    // Search
    useEffect(() => {
        if (searchTerm.length > 3) {
            dispatch(showLoader(true));
            setQuery({"search": searchTerm});
            searchAds()
        } else if (!searchTerm) {
            dispatch(showLoader(true));
            setQuery({});
            shopService.getAds()
                .then((res) => {
                    if (res.status === 200) {
                        setAds(res.data)
                        console.log("DUZINA ADSA", res.data.length);
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
// Get current ads for pagination
    const indexOfLastAds = currentPage * itemsPerPage;
    const indexOfFirstAds = indexOfLastAds - itemsPerPage;
    const currentAds = ads.slice(indexOfFirstAds, indexOfLastAds);

    const paginationLayout = (items) => {
        return(
    <>
        <div className="row ">
            {items.length ? <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={ads.length}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            /> : null}

        </div>
    </>
)
}
    return (
        <div className="shop-wrapper container">
            <div className="row">
                <FilterSort setSort={setSort} filterStatus={filterStatus} setFilterStatus={setFilterStatus}
                            filterPrice={filterPrice} setFilterPrice={setFilterPrice} setSearchTerm={setSearchTerm}
                            searchTerm={searchTerm} setItemsPerPage={setItemsPerPage}/>
            </div>
            {paginationLayout(currentAds)}
            <div className="row">
                {currentAds.length > 0 ? currentAds.map((element) => {
                    return <ShopAd ad={element} key={element._id}/>
                }) : <p>No products.</p>}
            </div>
            {paginationLayout(currentAds)}
        </div>
    );
}

export default Shop;
