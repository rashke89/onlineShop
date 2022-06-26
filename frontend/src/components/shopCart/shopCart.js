import "./shopCart.scss"
import React, {useEffect, useRef, useState} from 'react';
import {FaCartPlus} from "react-icons/fa";
import {useSelector} from "react-redux";



const ShopCart = () => {

    const {cart}=useSelector((state)=>state.cartStore)
    const shopCartWrapperRef=useRef();
    const [isCart, setIsCart]=useState(false);
    const cartSummary=useRef();

    useEffect(() => {
        if(!shopCartWrapperRef.current){
            return
        }

        if(cart.length){
       setIsCart(true)



       }else{
           setIsCart(false)

       }
    }, [cart]);

    const displayCartSummary=()=>{
        cartSummary.current.classList.toggle("displayCartSummary")
    }


    return (
        <div className="nav-item">
        <div ref={shopCartWrapperRef} className="shop-cart-wrapper nav-link  text-light" onClick={()=>{displayCartSummary()}}>
        <FaCartPlus/>
            <span className={`${isCart? "displayBadge":null} cartBadge badge rounded-pill bg-warning text-dark`}>{cart.length}</span>
                <div ref={cartSummary} className="shop-cart-summary container text-dark p-2 ">
                    {cart.map((product,index)=>{

                        console.log(product);
                        return   <div className="shop-cart-item row" key={index}>

                         <div className="col-5">
                             <img src={product.imgUrl} alt=""/>
                         </div>
                         <div className="col-5">
                             <h6 className="text-center">{product.title}</h6>
                             <p>{product.description}</p>
                             <h3><sup>$</sup>{product.price}</h3>

                         </div>


                        </div>
                    })

                    }
                    <div className="row text-center">
                    <div className="col-6 m-auto">
                        {cart.length?  <button className="btn btn-secondary m-auto">Go to shopCart</button>:<p>No products</p>}

                    </div>
                    </div>

                </div>
            </div>
        </div>

    );
};

export default ShopCart;