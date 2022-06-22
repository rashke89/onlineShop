import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import ShopService from "../../services/ShopService";
import "animate.css"
import {eventWrapper} from "@testing-library/user-event/dist/utils";

const ProductView = () => {

    const [product, setProduct] = useState({});
    const [isParamsAvailable, setIsParamsAvailable] = useState(true)
    const [isApiFinished, setIsApiFinished] = useState(false)
    const params = useParams();

    useEffect(() => {
        if (params.productId) {
            ShopService.getProduct(params.productId)
                .then((response) => {
                    if (response.status === 200) {
                        setProduct(response.data)
                    }
                    if(!response.data){
                        setIsParamsAvailable(false)
                    }
                }).catch((error) => {
                console.log(error);
            })
                .finally(() => {
                    setIsApiFinished(true);
                })
        } else {
            setIsParamsAvailable(false)
        }
    }, []);

    const noParamsMSgLayout = () => {
        return !isParamsAvailable ?
            <h1 className="animate__shakeX animate__animated animate__fast text-center mt-5">No product with this id.</h1> : null;
    }
    const productLayout = () => {
        return <div className="product-wrapper row mt-5 d-flex justify-content-between">
                <div className="col-md-5"><img src={product.image} alt={product.title} className="img-fluid"/></div>
                <div className="col-md-6 text-center">
                    <h3>{product.title}</h3>
                    <p>{product.category}</p>
                    <p>{product.description}</p>
                    <h3>{product.price} $</h3>
                    <button className="btn btn-secondary mt-5 btn-lg">Add to cart</button>
                </div>

        </div>
    }

    return (
        <div className="productView-wrapper container">

                    {noParamsMSgLayout()}
                    {(product && product.hasOwnProperty("id")) && productLayout()}

        </div>
    )
}

export default ProductView;