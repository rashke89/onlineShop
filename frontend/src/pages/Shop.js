import React, {useEffect, useState} from "react";
import Navigation from "../components/navigation/Navigation";
import ShopService from "../services/ShopService";
import Product from "../components/product/product";

const Shop = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        ShopService.getAds()
            .then((response) => {
                if (response.status === 200) {
                    setProducts(response.data)
                }
            })
            .catch((error) => {
                console.log(error)
            })

    }, [])

    return (
        <>
            <Navigation/>
            <div className="shopNav d-flex justify-content-end m-auto container mt-3">

                <div><span>Sort by: </span>
                    <select>
                        <option value="lowPrice">Low price</option>
                        <option value="highPrice">High price</option>
                    </select></div>
            </div>
            <div className="shop-wrapper container">
                <div className="row  d-flex justify-content-between flex-wrap">
                    {products ?
                        products.map((product, index) => {
                            return <Product product={product} key={product.id}/>
                        })
                        : <h1>No products. Try Later</h1>

                    }
                </div>
            </div>

        </>
    )


}

export default Shop;