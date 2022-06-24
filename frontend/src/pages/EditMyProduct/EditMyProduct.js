import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import ShopService from "../../services/ShopService";



function EditMyProduct() {
    const navigate=useNavigate();
    const params=useParams();
    const [product, setProduct]=useState({});
    const [isApiError, setIsApiError]=useState(false);
    const [isProductUpdated, setIsProductUpdated]=useState(false)
    const [isUpdateError, setIsUpdateError]=useState(false)

    useEffect(()=>{
        let myProductId=params.myProductId;
        ShopService.getMyProduct(myProductId)
            .then((response)=>{
                if(response.status===200){
                setProduct(response.data)
                    setIsApiError(false)
                }
            })
            .catch((error)=>{
                console.log(error);
                setIsApiError(true)
            })

    },[])

    const handleInputChange=(event)=>{
        let copyProduct={...product};
        copyProduct[event.target.name]=event.target.value;
        setProduct(copyProduct)
    }

    const onSubmit=(body, myAdId, event)=>{
        event.preventDefault();
        ShopService.saveMyProduct(body, myAdId)
            .then((response)=>{
                setIsProductUpdated(true)
                navigate("/myProducts/")
            })
            .catch((error)=>{
                setIsUpdateError(true)
            })
    }

    return (
            <div className="edit-product-wrapper mt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 mx-auto">
                            <h2 className="text-center mb-5">Edit product</h2>
                            <form onSubmit={(event)=>{onSubmit(product,product._id, event)}}>
                                <div className="form-floating mb-3">
                                    <input type="text" name="title" className="form-control" id="title" placeholder="Title" value={product.hasOwnProperty("title")? product.title: ""} onChange={(event)=>handleInputChange(event)}/>
                                    <label htmlFor="title">Title</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <select className="form-select" id="category" name="category" aria-label="Category">
                                        <option value="1" >One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                    <label htmlFor="category">Category</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="description" name="description" placeholder="Description" value={product.hasOwnProperty("title")? product.description: ""} onChange={(event)=>handleInputChange(event)}/>
                                    <label htmlFor="description">Description</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="number" className="form-control" id="price" name="price" placeholder="Price" value={product.hasOwnProperty("title")? product.price: ""} onChange={(event)=>handleInputChange(event)} />
                                    <label htmlFor="price">Price</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="imgUrl" name="imgUrl" placeholder="Image URL" value={product.hasOwnProperty("title")? product.imgUrl: ""} onChange={(event)=>handleInputChange(event)}/>
                                    <label htmlFor="imgUrl">Image URL</label>
                                </div>

                                <button type="submit" className="btn btn-primary mt-3" >Save</button>
                                {isProductUpdated? <p>Successfully updated</p>:null}
                                {isUpdateError? <p>Product not updated. Try again.</p>:null}
                                {isApiError? <p>API ERROR. Try again.</p>:null}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default EditMyProduct;