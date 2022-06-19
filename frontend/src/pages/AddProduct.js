import React from "react";
import Navigation from "../components/navigation/Navigation";


const AddProduct=()=>{
    return (
        <>
        <Navigation/>
        <div className="container mt-3">
                <div className="row">
                    <div className="col-md-8 mx-auto">
                        <h2 className="text-center mb-5">Add new product</h2>
                        <form>
                            <div className="form-floating mb-3">
                                <input type="text" name="title" className="form-control" id="title" placeholder="Title" />
                                <label htmlFor="title">Title</label>
                            </div>
                            <div className="form-floating mb-3">
                                <select className="form-select" id="category" name="category" aria-label="Category">
                                    <option value="1" selected>One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                                <label htmlFor="category">Category</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="description" name="description" placeholder="Description" />
                                <label htmlFor="description">Description</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="number" className="form-control" id="price" name="price" placeholder="Price" />
                                <label htmlFor="price">Price</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="imgUrl" name="imgUrl" placeholder="Image URL" />
                                <label htmlFor="imgUrl">Image URL</label>
                            </div>
                            <button type="submit" className="btn btn-secondary mt-3">Add product</button>
                        </form>
                    </div>
                </div>

        </div>
        </>
    )
}

export default AddProduct;