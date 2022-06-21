import React, {useState} from 'react';
import ShopService from "../../services/shopService";
import {useNavigate} from "react-router-dom";
import user from "../AllUsers/User";

function AddProduct() {

	const [product, setProduct]=useState({
		imgUrl: "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png",
		user: JSON.parse(localStorage.getItem("user"))._id
	})


	const [isFormValid,setIsFormValid]=useState(true)
	const [isApiErr, setIsApiErr]=useState(false)

	const navigate=useNavigate();
	const handleInputChange=(event)=>{
		let copyProduct={...product};
		copyProduct[event.target.name]=event.target.value;
		setProduct(copyProduct)
	}
	const onSubmit=(event)=>{
		event.preventDefault();

		if(!product.description || !product.title || !product.price){
			setIsFormValid(false)
			return;
		}

			setIsFormValid(true)

			ShopService.addProduct(product)
				.then((response)=>{
					if(response.status===200){
						console.log("API success");
						setIsApiErr(false)
						navigate("/my-ads")
					}
				})
				.catch((error)=>{
					setIsApiErr(true)
					console.log(error);
				})

	}

	return (
		<div className="add-product-wrapper mt-5">
			<div className="container">
				<div className="row">
					<div className="col-md-6 mx-auto">
						<h2 className="text-center mb-5">Add product</h2>
						<form >
							<div className="form-floating mb-3">
								<input type="text" name="title" className="form-control" id="title" placeholder="Title" onChange={(event)=>handleInputChange(event)}/>
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
								<input type="text" className="form-control" id="description" name="description" placeholder="Description" onChange={(event)=>handleInputChange(event)}/>
									<label htmlFor="description">Description</label>
							</div>
							<div className="form-floating mb-3">
								<input type="number" className="form-control" id="price" name="price" placeholder="Price" onChange={(event)=>handleInputChange(event)} />
								<label htmlFor="price">Price</label>
							</div>
							<div className="form-floating mb-3">
								<input type="text" className="form-control" id="imgUrl" name="imgUrl" placeholder="Image URL" onChange={(event)=>handleInputChange(event)}/>
								<label htmlFor="imgUrl">Image URL</label>
							</div>
							{!isFormValid? <p>All fields are required</p>: null}
							{isApiErr? <p>Api error. Try again.</p>: null}
							<button  className="btn btn-primary mt-3" onClick={onSubmit}>Add product</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AddProduct;