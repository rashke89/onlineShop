import React, {useState} from "react";
import Navigation from "../../components/navigation/Navigation";
import {useNavigate} from "react-router-dom";
import ShopService from "../../services/ShopService";
import "./AddProduct.scss"

const AddProduct=()=>{
    const navigate=useNavigate();

    const [product, setProduct]=useState({
        imgUrl: "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png",
        userId: JSON.parse(localStorage.getItem("user"))._id,
        rating: Math.floor(Math.random()*(6-1)+1)
    })

    const [isFormValid, setIsFormValid]=useState(true);
    const [isApiError, setIsApiError]=useState(false)
    const [isProductExist, setIsProductExist]=useState(false)

    const handleInputChange=(event)=>{
        let copyProduct={...product};
        copyProduct[event.target.name]=event.target.value;
        setProduct(copyProduct);

    }

    const onSubmit=(event)=>{
        event.preventDefault();
        if(!product.description || !product.title || !product.price){
            setIsFormValid(false)
            return
        }

        setIsFormValid(true)
        ShopService.addMyProduct(product)
            .then((response)=>{
                if(response.data==="Product already exist."){
                    setIsProductExist(true)
                }
                if(response.status===200){
                    setIsApiError(false)
                    navigate("/myProducts")
                }
            })
            .catch((error)=>{
                setIsApiError(true)
                console.log(error);
            })
    }

    return (
        <>
        <Navigation/>
        <div className="container mt-3">
                <div className="row">
                    <div className="col-md-8 mx-auto">
                        <h2 className="text-center mb-5">Add new product</h2>
                        <form onSubmit={onSubmit}>
                            <div className="form-floating mb-3">
                                <input type="text" name="title" className="form-control" id="title" placeholder="Title" onChange={(event)=>{handleInputChange(event)}} />
                                <label htmlFor="title">*Title</label>
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
                                <input type="text" className="form-control" id="description" name="description" placeholder="Description" onChange={(event)=>{handleInputChange(event)}}/>
                                <label htmlFor="description">*Description</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="number" className="form-control" id="price" name="price" placeholder="Price" onChange={(event)=>{handleInputChange(event)}}/>
                                <label htmlFor="price">*Price</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="imgUrl" name="imgUrl" placeholder="Image URL" onChange={(event)=>{handleInputChange(event)}}/>
                                <label htmlFor="imgUrl">Image URL</label>
                            </div>
                            <button type="submit" className="btn btn-secondary mt-3">Add product</button>
                            {!isFormValid? <p className="error animate__shakeX animate__animated animate__fast ">All fields with * is required</p>:null}
                            {isApiError?  <p className="error animate__shakeX animate__animated animate__fast ">API ERROR. Please try again.</p>:null}
                            {isProductExist?  <p className="error animate__shakeX animate__animated animate__fast ">Product already exist. </p>:null}
                        </form>
                    </div>
                </div>

        </div>
        </>
    )
}

export default AddProduct;