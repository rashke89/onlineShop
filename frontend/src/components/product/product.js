import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import "./product.scss"
import RatingStar from "../ratingStar/RatingStar";
import {routeConfig} from "../../config/routeConfig";

const Product=(props)=>{

    const [product, setProduct] = useState({});
    useEffect(()=>{
        //props can't change
        setProduct(props.product)
    },[])

    const generateRatingStar=(product)=>{
        const content=[];
        for (let i = 0; i < product.rating; i++) {
            content.push(<RatingStar key={i}/>)
        }

        return content
    }

    return(
        <>
            { (product.hasOwnProperty("_id"))?
                // <div className="shop-product-wrapper col-md-3">
                //     <div className="shop-product-content-wrapper">
                //         <img src={product.image} className="img card-img-top img-fluid" alt=""/>
                //         <p className="shop-product-title">{product.title}</p>
                //         <p>Rate: {product.rating.rate}</p>
                //         <p className="shop-product-price">{product.price}$</p>
                //         <Link to={`/shop/product/${product.id}`} className="view-more-btn">
                //             <p className="view-more-btn-text">View Product</p>
                //         </Link>
                //     </div>
                // </div>
                <div className="product-card-wrapper col-md-4 mt-2 mb-3 d-flex  align-items-stretch">
                    <div className="card product-card " >
                        {/*<div className="product-card-header">*/}
                        {/*	/!* Bonus: remove badge after 7 days *!/*/}
                        {/*	/!*<span className="badge bg-danger">New</span>*!/*/}
                        {/*	<div*/}
                        {/*		className={favorite ? "favorite set-favorite" : "favorite"}*/}
                        {/*		onClick={() => setFavorite(!favorite)}*/}
                        {/*	>*/}
                        {/*		{favorite ? (*/}
                        {/*			<i className="bi bi-heart-fill"></i>*/}
                        {/*		) : (*/}
                        {/*			<i className="bi bi-heart"></i>*/}
                        {/*		)}*/}
                        {/*	</div>*/}
                        {/*</div>*/}
                        <img
                            src={product.imgUrl}
                            className="card-img-top img-fluid w-75 mx-auto"
                            alt={product.title}
                        />
                        <div className="card-body pt-2 px-2 pb-0 d-flex flex-column justify-content-between">
                            <h4 className="card-title text-center">{product.title}</h4>
                            <p className="text-muted">Category: {product.category}</p>
                            <p className="card-text">{product.description}</p>
                            <p className="product-rating">
                                {generateRatingStar(product)}
                            </p>
                            <p className="product-price mb-0">
                                <sup>$</sup>{product.price}
                            </p>
                        </div>
                        <div className="action-buttons gap-2">
                            <Link  to={routeConfig.SHOP_PRODUCT.realUrl(product._id)} className="view-more" type="button">
                                View more
                                <span>
                                    <i className="bi bi-info-circle"></i>
                                </span>
                            </Link>


                        </div>
                    </div>
                </div>
                :null}
        </>


    )
}

export default Product;