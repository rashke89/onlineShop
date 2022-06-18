import React, {useEffect, useState} from "react";
import "./product.css"

const Product=(props)=>{

    const [product, setProduct] = useState({});
    useEffect(()=>{
        setProduct(props.product)
    },[])

    return(
        <>
            { (product.hasOwnProperty("id"))?
                <div className="col-2 m-2 product  text-center  d-flex flex-column justify-content-between ">
                    <div className="image">
                        <img src={product.image} alt={product.title} className="card-img-top"/>
                    </div>

                        <div className="card-body d-flex flex-column justify-content-between">
                            <div className="tittle card-title">
                                <h5>{product.title}</h5>
                            </div>
                            {/*<div className="description card-text">*/}
                            {/*    <p>{product.description}</p>*/}
                            {/*</div>*/}
                            <div className="price">
                                <h3>{product.price}$</h3>
                            </div>
                            <div className="rating">
                                <h6>Rating: {product.rating.rate}</h6>
                            </div>
                        </div>
                </div>
                :<h1>Product not found</h1>}
        </>


    )
}

export default Product;