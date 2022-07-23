import React, {useEffect, useRef, useState} from 'react';
import ShopService from "../../services/shopService";
import {useNavigate, useParams} from "react-router-dom";
import "./AddEddProduct.scss"
import AdminService from "../../services/adminService";
import {setCategories} from "../../redux/dashboardSlice";
import {showLoader} from "../../redux/loaderSlice";


function AddEddProduct() {
	const params=useParams();
	const [isAdUpdated, setIsAdUpdated]=useState(false);
	const [isUpdateError, setIsUpdateError]=useState(false);
	const [product, setProduct]=useState({
		imgUrl: "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png",
		userId: JSON.parse(localStorage.getItem("user"))._id,
		rating: Math.floor(Math.random()*(6-1)+1)
	});
	const [file, setFile] = useState(null);
	const [isFormValid,setIsFormValid]=useState(true);
	const [isApiError, setIsApiError]=useState(false);
	const [isAddProduct,setIsAddProduct]=useState(true);
	const navigate=useNavigate();
	const [categories, setCategories] = useState([]);

    useEffect(() => {
        AdminService.getAllCategory()
            .then((res) => {
                setCategories(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
        if (params.hasOwnProperty("myAdId")) {
            setIsAddProduct(false)
        } else {
            setIsAddProduct(true)
        }
        if (params.hasOwnProperty("myAdId")) {
            let myAdId = params.myAdId;
            ShopService.getMyAd(myAdId)
                .then((response) => {
                    if (response.status === 200) {
                        setProduct(response.data)
                        setIsApiError(false)
                    }
                })
                .catch((error) => {
                    console.log(error);
                    setIsApiError(true)
                })

        }
    }, [])

	const addProduct=()=>{
		let newProduct = new FormData();
		newProduct.append("product", JSON.stringify(product));
		newProduct.append("file", file);

		console.log(newProduct.get("product"));
		return	ShopService.addProduct(newProduct)
			.then((response)=>{
				if(response.status===200){
					console.log("API success");
					setIsApiError(false)
					navigate("/my-ads")
				}
			})
			.catch((error)=>{
				setIsApiError(true)
				console.log(error);
			})

	}

	const editProduct=(body,myAdId)=>{
		return  ShopService.saveMyAd(body, myAdId)
			.then((response)=>{
				setIsAdUpdated(true)
				navigate("/my-ads/")
			})
			.catch((error)=>{
				setIsUpdateError(true)
			})}

	const handleInputChange=(event)=>{
		let copyProduct={...product};
		copyProduct[event.target.name]=event.target.value;
		setProduct(copyProduct)
	}

	const handleFile = e => {
		console.log(e.target.files[0]);
		setFile(e.target.files[0])
	}
	const onSubmit=(body, myAdId,event)=>{
		event.preventDefault();

		if(!product.description || !product.title || !product.price){
			setIsFormValid(false)
			return;
		}

			setIsFormValid(true);

			(isAddProduct)? addProduct():editProduct(body,myAdId);

	}

	return (
		<div className="add-product-wrapper mt-5">
			<div className="container">
				<div className="row">
					<div className="col-md-6 mx-auto">
						<h2 className="text-center mb-5">{isAddProduct? "Add product":"Edit product"}</h2>
						<form >
							<div className="form-floating mb-3">
								<input type="text" name="title" className="form-control" id="title" placeholder="Title" defaultValue={product.hasOwnProperty("title")? product.title: ""} onChange={(event)=>handleInputChange(event)}/>
									<label htmlFor="title">Title</label>
							</div>
							<div className="form-floating mb-3">
								<select className="form-select" id="category" name="category" aria-label="Category"
										onChange={(event) => {
											const selectedCategory = event.target.value;
											setProduct((prevState) => ({...prevState, category: selectedCategory}))
										}} value={product.category}>
									{categories.map((cat, index) => {
										return <option key={index} value={cat.categoryName}>{cat.categoryName}</option>
									})}
								</select>
								<label htmlFor="category">Category</label>
							</div>
							<div className="form-floating mb-3">
								<input type="text" className="form-control" id="description" name="description"  maxLength="240" placeholder="Description"  defaultValue={product.hasOwnProperty("title")? product.description: ""} onChange={(event)=>handleInputChange(event)}/>
									<label htmlFor="description">Description</label>
							</div>
							<div className="form-floating mb-3">
								<input type="number" className="form-control" id="price" name="price" placeholder="Price" defaultValue={product.hasOwnProperty("title")? product.price: ""} onChange={(event)=>handleInputChange(event)} />
								<label htmlFor="price">Price</label>
							</div>
							<div className="form-floating mb-3">
								<input type="file"
									   className="form-control"
									   id="imgUrl"
									   name="imgUrl"
									   placeholder="Image URL"
									   onChange={(event)=>handleFile(event)}/>
								<label htmlFor="imgUrl">Image URL</label>
							</div>
							<button  className="btn btn-secondary mt-3" onClick={(event)=>{onSubmit(product, product._id, event)}}>{(isAddProduct)? 'Add product':"Save"}</button>
							{!isFormValid? <p className="error animate__shakeX animate__animated animate__fast">All fields are required</p>: null}
							{isApiError? <p className="error animate__shakeX animate__animated animate__fast">Api error. Try again.</p>: null}
							{isAdUpdated? <p>Successfully updated</p>:null}
							{isUpdateError? <p>Product not updated. Try again.</p>:null}

						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AddEddProduct;
