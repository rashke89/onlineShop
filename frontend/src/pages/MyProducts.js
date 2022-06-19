import React from "react";
import Navigation from "../components/navigation/Navigation";
import {Link} from "react-router-dom";


const MyProducts=()=>{
    return(
        <>
        <Navigation/>

            <div className="container mt-3">
                <h1>My Products</h1>
                <div className="d-flex justify-content-between m-auto container mt-3">
                    <Link className="btn btn btn-secondary" to="/addProduct">Add product</Link>
                    <div><span>Sort by: </span>
                        <select>
                            <option value="highPrice">Date</option>
                            <option value="lowPrice">Low price</option>
                            <option value="highPrice">High price</option>
                        </select></div>
                </div>
            </div>

        </>
    )
}

export default MyProducts;