import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import ShopService from "../../services/shopService";

const DeleteMyAd = () => {
    const params=useParams()
    const navigate=useNavigate()
    useEffect(()=>{
        let myAdId=params.myAdId;
        ShopService.deleteMyAd(myAdId)
            .then((response)=>{
            navigate("/my-ads")

            })
            .catch((error)=>{
                console.log(error);
            })
    },[])
    return (
        <div>

        </div>
    );
};

export default DeleteMyAd;