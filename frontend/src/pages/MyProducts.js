import React, {useEffect, useState} from "react";
import Navigation from "../components/navigation/Navigation";
import {Link} from "react-router-dom";
import ShopService from "../services/ShopService";
import MyProduct from "../components/myProduct/MyProduct";


const MyProducts=()=>{
    const [products, setProducts] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"))._id;
    const[sort, setSort]=useState("");
    let sortedProducts;
    useEffect(() => {
        ShopService.getMyProducts(user)
            .then(response => {
                if(response.status === 200) {
                    sortedProducts=response.data;


                    if(sort==="lowPrice"){
                        sortedProducts= sortedProducts.sort((a, b)=> a.price - b.price);
                    }else if(sort==="highPrice"){

                        sortedProducts= sortedProducts.sort((a, b)=> b.price - a.price);
                    }
                    setProducts(sortedProducts)

                }
            })
            .catch(error => {
                console.log(error);
            })
    }, [sort]);

    return(
        <>
        <Navigation/>

            <div className="container mt-3">
                <h1>My Products</h1>
                <div className="d-flex justify-content-between m-auto container mt-3 mb-3">
                    <Link className="btn btn btn-secondary" to="/addProduct">Add product</Link>
                    <div><span>Sort by: </span>
                        <select  onChange={(event)=>{
                            setSort(event.target.value);

                        }}>
                            <option value="lowPrice">Low price</option>
                            <option value="highPrice">High price</option>
                        </select></div>
                </div>
                <div className="row">
                    {products.map((product,index)=>{
                        return <MyProduct product={product} key={index}/>
                    })}
                </div>
            </div>

        </>
    )
}

export default MyProducts;