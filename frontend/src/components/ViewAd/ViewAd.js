import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import ShopService from "../../services/shopService";
import "./view-ad.scss";
import {useDispatch} from "react-redux";
import {addToCart} from "../../redux/cartSlice";
import HeaderProduct from "../HeaderProduct/HeaderProduct";
import ShareButton from "../ShareButton/ShareButton";

// const productMockData = {
//     category: "men's clothing",
//     description: "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be" +
//         " reviewed below on the product description.",
//     id: 4,
//     image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
//     price: 15.99,
//     rating: {rate: 2.1, count: 430},
//     title: "Mens Casual Slim Fit",
// }

export default function ViewAd() {
    const [ad, setAd] = useState({});
    const [isParamsAvailable, setIsParamsAvailable] = useState(true);
    const [isApiFinished, setIsApiFinished] = useState(false);
    const params = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        if (params.adId) {
            getAd();
        } else {
            setIsParamsAvailable(false);
        }
    }, []);

    const noParamsMsgLayout = () => {
        return !isParamsAvailable ? <p>No product with this id.</p> : null;
    };

    const onAddToCart = () => {
        dispatch(addToCart(ad));
    };

    const adLayout = () => {
        return <div className="row mt-5">
            <div className="col-md-6">
                <img src={ad.imgUrl} alt="Product image"/>
            </div>
            <div className="col-md-6">
                <h3>{ad.title}</h3>
                <p>{ad.category}</p>
                <p>{ad.description}</p>
                <p>{ad.price}</p>
                <ShareButton
                    url={window.location.href}
                    title={ad.title}
                    description={ad.description}
                    round={true}
                    size={32}/>
                <button className="btn" onClick={onAddToCart}>Add to cart</button>
            </div>
        </div>
    }

    const getAd = () => {
        ShopService.getAdById(params.adId)
            .then(response => {
                if (response.status === 200) {
                    setAd(response.data);
                }

                if (!response.data) {
                    setIsParamsAvailable(false)
                }
            })
            .catch(error => {

            })
            .finally(() => {
                setIsApiFinished(true);
            });
    };
    return (
        <div className="container-fluid p-0 view-ad-wrapper ">
            <HeaderProduct productInfo={ad} />
                    {noParamsMsgLayout()}
                    {ad && ad.hasOwnProperty('_id') && adLayout()}
        </div>
    )
}
