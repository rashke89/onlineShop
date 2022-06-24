import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import "./product.scss"

const Product=(props)=>{

    const [product, setProduct] = useState({});
    useEffect(()=>{
        //props can't change
        setProduct(props.product)
    },[])

    return(
        <>
            { (product.hasOwnProperty("id"))?
                <div className="shop-product-wrapper col-md-3">
                    <div className="shop-product-content-wrapper">
                        <img src={product.image} className="img card-img-top img-fluid" alt=""/>
                        <p className="shop-product-title">{product.title}</p>
                        <p>Rate: {product.rating.rate}</p>
                        <p className="shop-product-price">{product.price}$</p>
                        <Link to={`/shop/product/${product.id}`} className="view-more-btn">
                            <p className="view-more-btn-text">View Product</p>
                        </Link>
                    </div>
                </div>
                :null}
        </>


    )
}

export default Product;