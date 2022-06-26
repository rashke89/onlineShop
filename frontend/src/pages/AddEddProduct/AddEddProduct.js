import React, {useEffect, useState} from "react";
import Navigation from "../../components/navigation/Navigation";
import {useNavigate, useParams} from "react-router-dom";
import ShopService from "../../services/ShopService";
import "./AddEddProduct.scss"

const AddEddProduct=()=>{
    const navigate=useNavigate();
    const params=useParams();
    const [isProductUpdated, setIsProductUpdated]=useState(false)
    const [isProductAdded, setIsProductAdded]=useState(false)
    const [isUpdateError, setIsUpdateError]=useState(false)
    const [product, setProduct]=useState({
        imgUrl: "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png",
        userId: JSON.parse(localStorage.getItem("user"))._id,
        rating: Math.floor(Math.random()*(6-1)+1)
    })

    const [isFormValid, setIsFormValid]=useState(true);
    const [isApiError, setIsApiError]=useState(false)
    const [isAddProduct,setIsAddProduct]=useState(true)
    const [isProductExist, setIsProductExist]=useState(false)


    useEffect(()=>{
        if(params.hasOwnProperty("myProductId")){
            setIsAddProduct(false)
        }else{
            setIsAddProduct(true)
        }

        if(params.hasOwnProperty("myProductId")){
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

        }

    },[])

    const addProduct=()=>{
        return	ShopService.addMyProduct(product)
            .then((response)=>{
                if(response.status===200){
                    console.log("API success");
                    setIsApiError(false)
                    setIsProductAdded(true);
                    navigate("/myProducts")
                }
            })
            .catch((error)=>{
                setIsApiError(true)
                console.log(error);
            })

    }

    const editProduct=(body,myProductId)=>{
        return  ShopService.saveMyProduct(body, myProductId)
            .then((response)=>{
                setIsProductUpdated(true)
                navigate("/myProducts")
            })
            .catch((error)=>{
                setIsUpdateError(true)
            })}



    const handleInputChange=(event)=>{
        let copyProduct={...product};
        copyProduct[event.target.name]=event.target.value;
        setProduct(copyProduct);

    }

    const onSubmit=(body, myProductId, event)=>{
        event.preventDefault();
        if(!product.description || !product.title || !product.price){
            setIsFormValid(false)
            return
        }

        setIsFormValid(true);

        (isAddProduct)? addProduct():editProduct(body,myProductId);
    }

    return (
        <>
        <Navigation/>
        <div className="container mt-3">
                <div className="row">
                    <div className="col-md-8 mx-auto">
                        <h2 className="text-center mb-5">{isAddProduct? "Add product":"Edit product"}</h2>
                        <form onSubmit={(event)=>{onSubmit(product,product._id,event)}}>
                            <div className="form-floating mb-3">
                                <input type="text" name="title" className="form-control" id="title" placeholder="Title" value={product.hasOwnProperty("title")? product.title: ""} onChange={(event)=>{handleInputChange(event)}} />
                                <label htmlFor="title">*Title</label>
                            </div>
                            <div className="form-floating mb-3">
                                <select className="form-select" id="category" name="category" aria-label="Category" onChange={(event)=>{
                                    const selectedCategory=event.target.value
                                    setProduct((prevState) =>({...prevState,category:selectedCategory}))
                                }}>
                                    <option value="1" >One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                                <label htmlFor="category">Category</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="description" name="description" placeholder="Description" value={product.hasOwnProperty("title")? product.description: ""} onChange={(event)=>{handleInputChange(event)}}/>
                                <label htmlFor="description">*Description</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="number" className="form-control" id="price" name="price" placeholder="Price" value={product.hasOwnProperty("title")? product.price: ""} onChange={(event)=>{handleInputChange(event)}}/>
                                <label htmlFor="price">*Price</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="imgUrl" name="imgUrl" placeholder="Image URL" value={product.hasOwnProperty("title")? product.imgUrl: ""} onChange={(event)=>{handleInputChange(event)}}/>
                                <label htmlFor="imgUrl">Image URL</label>
                            </div>
                            <button type="submit" className="btn btn-secondary mt-3">{(isAddProduct)? 'Add product':"Save"}</button>
                            {!isFormValid? <p className="error animate__shakeX animate__animated animate__fast ">All fields with * is required</p>:null}
                            {isApiError?  <p className="error animate__shakeX animate__animated animate__fast ">API ERROR. Please try again.</p>:null}
                            {isProductExist?  <p className="error animate__shakeX animate__animated animate__fast ">Product already exist. </p>:null}
                            {isProductUpdated? <p className="error animate__shakeX animate__animated animate__fast">Successfully updated</p>:null}
                            {isUpdateError? <p className="error animate__shakeX animate__animated animate__fast" >Product not updated. Try again.</p>:null}
                        </form>
                    </div>
                </div>

        </div>
        </>
    )
}

export default AddEddProduct;