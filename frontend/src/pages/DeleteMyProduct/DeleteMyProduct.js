import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import ShopService from "../../services/ShopService";
import {routeConfig} from "../../config/routeConfig";

const DeleteMyProduct = () => {
    const params=useParams()
    const navigate=useNavigate()
    useEffect(()=>{
        let myProductId=params.myProductId;
        ShopService.deleteMyProduct(myProductId)
            .then((response)=>{
            navigate(routeConfig.MY_PRODUCTS.url)

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

export default DeleteMyProduct;