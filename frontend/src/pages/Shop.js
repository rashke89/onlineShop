import React, {useEffect, useState} from "react";
import Navigation from "../components/navigation/Navigation";
import ShopService from "../services/ShopService";
import Product from "../components/product/Product";

const Shop = () => {
    const [products, setProducts] = useState([])
    const[sort, setSort]=useState("");
    let sortedProducts;
    useEffect(() => {

        ShopService.getProducts()
            .then((response) => {
                if (response.status === 200) {


                    sortedProducts=response.data;


                    if(sort==="lowPrice"){
                        sortedProducts= sortedProducts.sort((a, b)=> a.price - b.price);
                    }else if(sort==="highPrice"){

                        sortedProducts= sortedProducts.sort((a, b)=> b.price - a.price);
                    }
                    setProducts(sortedProducts)
                }
            })
            .catch((error) => {
                console.log(error)
            })

    }, [sort])

    return (
        <>
            <Navigation/>
            <div className="shopNav d-flex justify-content-end m-auto container mt-3">

                <div><span>Sort by: </span>
                    <select  onChange={(event)=>{
                        setSort(event.target.value);

                    }}>
                        <option value="lowPrice">Low price</option>
                        <option value="highPrice">High price</option>
                    </select></div>
            </div>
            <div className="shop-wrapper container">
                <div className="row  d-flex justify-content-start flex-wrap">
                    {products ?
                        products.map((product, index) => {
                            return <Product product={product} key={product._id}/>
                        })
                        : <h1>No products. Try Later</h1>

                    }
                </div>
            </div>

        </>
    )


}

export default Shop;