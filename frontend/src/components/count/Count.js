import React from 'react';
import {handleCount} from "../../redux/cartSlice";
import {useDispatch} from "react-redux";
import {FaMinusCircle, FaPlusCircle} from "react-icons/fa";

const Count = ({product,index}) => {
    const dispatch=useDispatch();
    const handleShopCartCount = (index, isIncrement) => {

        dispatch(handleCount({index,isIncrement}))
    }
    return (
        <p className='text-center d-flex justify-content-center align-items-center flex-nowrap m-0'>
            <FaMinusCircle onClick={() => {
            handleShopCartCount(index, false)
        }}/><span
            className="shop-item-count mx-2">{product.count}</span><FaPlusCircle
            onClick={() => {
                handleShopCartCount(index, true)
            }}/>
        </p>
    );
};

export default Count;
