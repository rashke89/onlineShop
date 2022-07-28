import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import ShopService from "../../services/shopService";
import "./view-ad.scss";
import {useDispatch, useSelector} from "react-redux";
import {addToCart} from "../../redux/cartSlice";
import HeaderProduct from "../HeaderProduct/HeaderProduct";
import ShareButton from "../ShareButton/ShareButton";
import ChangeCurrency from "../ChangeCurrency/ChangeCurrency";
import RatingStars from "../RatingStars/RatingStars";
import ProductDetails from "./ProductDetails";
import LatestProducts from "./LatestProducts";
// import RatingStarsModal from "../RatingStarsModal/RatingStarsModal";
import { toast, ToastContainer } from "react-toastify";
import Modal from "react-modal";
import '../RatingStarsModal/rating-stars-modal.scss';
import { FaStar } from "react-icons/fa";
import AuthService from "../../services/authService";
import SharedService from "../../services/sharedService";
import { showLoader } from "../../redux/loaderSlice";
import {  FaThumbsUp } from "react-icons/fa";
import Comments from "./Comments";




const styles = {
    content: {
        top: "50%",
        left: "50%",
        right: "50%",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        boxShadow: "0 1px 8px rgba(0, 0, 0, 0.3)",
    },
    overlay: {
        position: "fixed",
        backgroundColor: "#0e0e0ead",
    }
};


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
    const [isModal, setIsModal] = useState(false);
    const [getRatings, setGetRatings] = useState(0);
    const [hover, setHover] = useState(null);
    const [rating, setRating] = useState(null);
    const [isDisabled, setIsDisabled] = useState(true);
    const { user } = useSelector(state => state.userStore);

    let aVotes;


    const params = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        if (params.adId) {
            getAd();
        } else {
            setIsParamsAvailable(false);
        }
    }, []);

    const setRatingS = async (rating, id) => {
        dispatch(showLoader(true))

        // * GET VOTING FORM SPECIFIC USER
        await AuthService.getVoting(user._id)
            .then(res => {
                aVotes = res.data
            })
            .catch(err => {
                console.log(err, 'greska');
            })

        let isRated = aVotes.includes(id);
        if (!isRated) {
            await AuthService.setVoting({ userID: user._id, productID: id })
                .then(res => {
                    console.log(res.data);
                })
                .catch(err => {
                    console.log(err);
                })

            const allRatings = getRatings.allRatings;
            allRatings.push(rating);
            let ratingsSum = 0;
            allRatings.forEach(el => ratingsSum = ratingsSum + el);

            let averageRating = (ratingsSum / (allRatings.length)).toFixed(2);

            ShopService.setRatingStars({ allRatings, averageRating, id })
                .then(res => {
                    setIsModal(false);
                    dispatch(showLoader(false))
                    toast.success('You are successfully voted!');

                    setTimeout(()=> {
                        window.location.reload(false);
                    }, 4000);
                })
                .catch(err => {
                    console.log(err, "greska");
                    dispatch(showLoader(false))
                });
        } else {
            setIsModal(false);
            dispatch(showLoader(false));
            toast.warning('You already voted for this product');
            setRating(null);
        }
    }

    const noParamsMsgLayout = () => {
        return !isParamsAvailable ? <p>No product with this id.</p> : null;
    };

    const onAddToCart = () => {
        dispatch(addToCart(ad));
    };

    const openModal = (id, title) => {
        if (localStorage.user) {
          setIsModal(true);
          ShopService.getRating(id)
            .then(res => {
              console.log(res.data, "podaci");
              setGetRatings(res.data)
            })
            .catch(err => {
              console.log(err, "greska");
            });
        } else {
          toast.info('Please login to vote');
        }

      };

      const enableRating = (ratingValue) => {
        setRating(ratingValue);
        setIsDisabled(false);
    }

    const cancelRating = () => {
        setRating(null);
        setIsDisabled(true);
        setIsModal(false);
    }

    const adLayout = () => {

        return <div className="row mt-5">
            <div className="col-md-6">
                <img src={SharedService.getCorrectImgUrl(ad.imgUrl)} alt="Product image"/>
            </div>
            <div className="col-md-6">
                <h3>{ad.title}</h3>

                     <div className="rating-stars-product">
                        <RatingStars rating={ad.rating}/>
                        <span className="rate-product" style={{cursor:"pointer"}} onClick={(e) => openModal(ad._id, ad.title)}>
                            rate &nbsp; <FaThumbsUp />
                        </span>
                     </div>

                <p>{ad.category}</p>
                <p>{ad.description}</p>
                <p>
                    <ChangeCurrency adConvertPrice={ad.price} />
                </p>
                <ShareButton
                    url={window.location.href}
                    title={ad.title}
                    description={ad.description}
                    round={true}
                    size={32}/>
                <button className="btn" onClick={onAddToCart}>Add to cart</button>
            </div>
            <ToastContainer/>
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
            <HeaderProduct productInfo={ad}/>
            {noParamsMsgLayout()}
            {ad && ad.hasOwnProperty('_id') && adLayout()}
            {ad &&<div className="container">
                <ProductDetails/>
                <LatestProducts/>
                <Comments productId={params.adId} productTitle={ad.title}/>
            </div>}

            {isModal && (
                <Modal
                    isOpen={true}
                    ariaHideApp={false}
                    style={styles}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <h3 className='heading'>{ad.title}</h3>

                    <div className="stars-wrapper">
                        {[...Array(5)].map((star, i) => {
                            const ratingValue = i + 1;
                            return (
                                <label key={i}>
                                    <input
                                        type="radio"
                                        name="rating"
                                        value={ratingValue}
                                        onClick={() => {
                                            enableRating(ratingValue)
                                        }}
                                    />
                                    <FaStar
                                        className="ratingStarFill"
                                        color={
                                            ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                                        }
                                        onMouseEnter={() => setHover(ratingValue)}
                                        onMouseLeave={() => setHover(null)}
                                        size={30}
                                    />
                                </label>
                            );
                        })}
                    </div>

                    <div  className="btns-wrapper">
                        <button  className="cancel" onClick={(e) => cancelRating()}>
                            Cancel
                        </button>
                        <button disabled={isDisabled} className={isDisabled ? "rateNo" : "rateYes"} onClick={(e) => setRatingS(rating, ad._id)}>Rate</button>
                    </div>
                </Modal>
            )}
        </div>
    )
}
