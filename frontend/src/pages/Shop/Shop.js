import React, { useState, useEffect } from 'react';
import ShopService from '../../services/ShopService';
import SingleAd from '../../components/SingleAd/SingleAd';
import { useDispatch } from 'react-redux';
import { showLoader } from '../../redux-store/loader/loaderSlice';
import BySelection from '../../components/Filters/BySelection/BySelection';
import BySearch from '../../components/Filters/BySearch/BySearch';
import ByRange from '../../components/Filters/ByRange/ByRange';

function Shop() {

    const dispatch = useDispatch();
    const [allAds, setAllAds] = useState([]);
    const [constAds, setConstAds] = useState([]);

    useEffect(() => {
        dispatch(showLoader(true));
        ShopService.getAds()
            .then(response => {
                if (response && response.status === 200) {
                    // console.log(response.data.products);
                    setAllAds(response.data.products);
                    setConstAds(response.data.products);
                }
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                dispatch(showLoader(false));
            })
    }, []);

    return (
        <div className="container py-5">

            <div className="d-flex">
                <ByRange allAds={allAds} setAllAds={setAllAds} constAds={constAds} />
                <BySearch allAds={allAds} setAllAds={setAllAds} constAds={constAds} />
                <BySelection allAds={allAds} setAllAds={setAllAds} constAds={constAds} />
            </div>

            <div className="row justify-content-center">
                {
                    allAds.length > 0 ?
                        allAds.map(ad => {
                            return <SingleAd ad={ad} key={ad.id} />
                        })
                        : null
                }
            </div>
        </div>

    )
}

export default Shop;