import {useEffect, useState} from "react";
import shopService from '../../services/shopService';

import "./masonryStyle.scss"
import AdComponentSmaller from "./AdComponentSmaller";
import AdComponentBigger from "./AdComponentBigger";


function Masonry() {
    const [ads, setAds] = useState([]);
    const [isChangeSide, setIsChangeSide] = useState(false);

    useEffect(() => {
        shopService.getRandomAds()
            .then((res) => {
                if (res.status === 200) {
                    setAds(res.data);
                }
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="masonry">
            {!isChangeSide ?<div className="row">
                <div className="col-md-5 col-sm-5 col-xs-12 left ad"><AdComponentSmaller products={ads}/></div>
                <div className="col-md-7 col-sm-7 col-xs-12 right ad"><AdComponentBigger products={ads}/></div>
            </div> :
            <div className="row">
                <div className="col-md-7 col-sm-7 col-xs-12 right ad"><AdComponentBigger products={ads}/></div>
                <div className="col-md-5 col-sm-5 col-xs-12 left ad"><AdComponentSmaller products={ads}/></div>
            </div>}
        </div>
    )
}


export default Masonry;