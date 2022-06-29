import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import './OrderProcessStepOne.scss'

import Count from "../../../count/Count";
import DeleteCartItem from "../../../deleteCartItem/DeleteCartItem";
import StepperFooter from "../stepperFooter/StepperFooter";

const OrderProcessStepOne = () => {
    const {cart} = useSelector(state => state.cartStore)



    const tableRowLayout=()=>{
        return cart.map((product, index)=>{
          return  <tr key={index}>
                <th scope="row">{index+1}</th>
                <td><img src={product.imgUrl} alt={product.title}/></td>
                <td>{product.title}</td>
                <td className=""><Count product={product} index={index} key={index}/></td>
                <td className='shop-item-total-price col-2 '><sup>$</sup>{product.count*product.price}</td>
               <td><DeleteCartItem index={index} key={index}/> </td>
            </tr>
        })
    }

    const emptyCartLayout=()=>{
        return !cart.length? <div className='container'> <p className='text-center text-danger fw-bolder animate__animated animate__flash'>Cart is empty</p></div>:null;
    }

    return (
        <div className="order-process-step-one-wrapper row mt-3">
            <div className="col-12">
                <table className="table table-hover text-center ">
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
            </div>

        </div>
    );
};

export default OrderProcessStepOne;
