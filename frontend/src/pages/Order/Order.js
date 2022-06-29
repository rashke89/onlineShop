import React from 'react';
import Navigation from "../../components/navigation/Navigation";
import OrderProcess from "../../components/orderProcess/OrderProcess";

const Order = () => {


    return (
        <>
            <Navigation/>
            <div className="container mt-3">
                    <h1>Order process</h1>
                <div className="row">
                    <OrderProcess/>
                </div>
            </div>


        </>

    );
};

export default Order;
