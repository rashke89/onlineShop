import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {FaTrashAlt, FaMinusCircle, FaPlusCircle} from "react-icons/fa";
import {handleCount, removeItem} from "../../../redux/cartSlice";
import ChangeCurrency from "../../ChangeCurrency/ChangeCurrency";

function OrderProcessStepOne() {
    const {cart} = useSelector(state => state.cartStore);
    const dispatch = useDispatch();

    const handleShopCartCount = (index, isIncrement) => {
        dispatch(handleCount({index, isIncrement}))
    }

    const removeItemFromCart = (index) => {
        dispatch(removeItem(index))
    };

    const tableRowLayout = () => {
        return cart.map((item, index) => {
            return (
                <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>
                        <img src={item.imgUrl} alt={item.title}/>
                    </td>
                    <td>{item.title}</td>
                    <td>
                        <FaMinusCircle className="mx-2" onClick={() => handleShopCartCount(index, false)} />
                        {item.count}
                        <FaPlusCircle className="mx-2" onClick={() => handleShopCartCount(index, true)}/>
                    </td>
                    <td> <ChangeCurrency adConvertPrice={item.totalPrice} /> </td>
                    <td><FaTrashAlt onClick={() => {removeItemFromCart(index)}} /></td>
                </tr>
            )
        })
    };

    const emptyCartLayout = () => {
        return !cart.length && <p>Cart is empty.</p>
    }

    return (
        <>
            <table className="table table-hover order-table-wrapper">
                <thead>
                    <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Image</th>
                        <th scope="col">Title</th>
                        <th scope="col">Count</th>
                        <th scope="col">Price</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {tableRowLayout()}
                </tbody>
            </table>
            {emptyCartLayout()}
        </>
    )
}

export default OrderProcessStepOne;
