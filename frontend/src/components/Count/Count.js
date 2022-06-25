import React from "react";
import {useDispatch} from "react-redux";
import {handleCount, removeItem} from "../../redux/cartSlice";
import {FaMinusCircle, FaPlusCircle} from "react-icons/fa";

function Count(props) {
    const {index, count} = props;
    const dispatch = useDispatch();

    const handleShopCartCount = (index, isIncrement) => {
        dispatch(handleCount({index, isIncrement}))
    };
    return (
        <>
            <FaMinusCircle className="mx-2" onClick={() => handleShopCartCount(index, false)} />
            {count}
            <FaPlusCircle className="mx-2" onClick={() => handleShopCartCount(index, true)}/>
        </>

    )
}

export default Count;
