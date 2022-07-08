import {useEffect, useState} from "react";
import ShopService from "../../services/shopService";
import './stats.scss'
import StatsNumber from "./StatsNumber";

function Stats() {
    const [ads, setAds] = useState(0);

    useEffect(() => {
        ShopService.getAds()
            .then(res => {
                setAds(res.data.length)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    return (
        <>
            <div className="row">
                <StatsNumber number={ads} label="products"/>
                <StatsNumber number={ads} label="users"/>
            </div>

        </>
    )
}

export default Stats;