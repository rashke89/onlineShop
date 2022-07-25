import React, {useEffect, useState} from 'react';
import shopService from '../../services/shopService';
import ShopAd from "../../components/ShopAd/ShopAd";
import './shop.scss';
import FilterSort from "../../components/FilterSort/FilterSort";
import '../../assets/scss/base.scss';
import Pagination, {itemsPerPageList} from "../../components/Pagination/Pagination";
import { useDispatch } from "react-redux";
import { showLoader } from "../../redux/loaderSlice";
import { useSearchParams } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import RatingStarsModal from '../../components/RatingStarsModal/RatingStarsModal';

function Shop({filterStatus, setFilterStatus}) {
    const [ads, setAds] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
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
            itemsPerPageList && itemsPerPageList.length && getAdsFromDb({
                itemsPerPage: itemsPerPageList[0],
                currentPage: 1
            })
        }
    }, [searchTerm, itemsPerPageList]);

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

    // useEffect(() => {
    //     console.log(currentPage);
    // }, [currentPage])

    const getAdsFromDb = (paginationObj) => {
        shopService.getAds(paginationObj)
            .then((res) => {
                if (res.status === 200) {
                    setAds(res.data.ads)
                    setTotalItems(res.data.totalItems)
                }
            })
            .catch(err => console.log(err))
            .finally(() => dispatch(showLoader(false)))
    }

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

    const paginationLayout = () => {
        console.log('ads..', ads.length);
        return(
    <>
        <div className="row ">
            {ads.length ? <Pagination
                onPagination={handlePagination}
                totalItems={totalItems}
            /> : null}

        </div>
    </>
)
}

const handlePagination = (paginationObj) => {
    dispatch(showLoader(true));
    getAdsFromDb(paginationObj)
}
    return (
        <div className="shop-wrapper container">
            <div className="row">
                <FilterSort setSort={setSort} filterStatus={filterStatus} setFilterStatus={setFilterStatus}
                            filterPrice={filterPrice} setFilterPrice={setFilterPrice} setSearchTerm={setSearchTerm}
                            searchTerm={searchTerm} setItemsPerPage={setItemsPerPage}/>
            </div>
            <div className="row">
                {currentAds.length > 0 ? currentAds.map((element) => {
                    return <ShopAd ad={element} key={element._id}/>
                }) : <p>No products.</p>}
                {ads.length > 0 ? ads.map((element) => {
                    return <RatingStarsModal ad={element} key={element._id} />
                }) : null}
            </div>
            {paginationLayout()}
            <ToastContainer />

        </div>
    );
}

export default Shop;
