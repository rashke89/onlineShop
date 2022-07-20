import React from 'react';
import { useEffect, useState, updateState } from "react";
import Modal from "react-modal";
import { FaRegStar, FaStar } from "react-icons/fa";
import { showLoader } from "../../redux/loaderSlice";
import { useDispatch, useSelector } from "react-redux";
import ShopService from "../../services/shopService";
import AuthService from '../../services/authService';
import { ToastContainer, toast } from "react-toastify";
import './rating-stars-modal.scss';


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
    },
    // heading: {
    //     marginBottom: "30px",
    // },
    // div: {
    //     display: "flex",
    //     justifyContent: "space-between",
    // },
    // cancel: {
    //     padding: "7px 15px",
    //     backgroundColor: "green",
    //     border: "1px solid green",
    //     color: "white",
    // },
    // rateYes: {
    //     padding: "7px 15px",
    //     backgroundColor: "tomato",
    //     border: "1px solid tomato",
    //     color: "white",
    //     cursor: 'pointer'
    // },
    // rateNo: {
    //     padding: "7px 15px",
    //     backgroundColor: "silver",
    //     border: "1px solid silver",
    //     color: "black",
    //     cursor: 'not-allowed'
    // },
    // rate: {
    //     cursor: 'pointer'
    // }
};

function RatingStarsModal({ ad, getRatings, isModal, setIsModal }) {

    const { user } = useSelector(state => state.userStore);
    const [hover, setHover] = useState(null);
    const [rating, setRating] = useState(null);
    const dispatch = useDispatch();
    const [isDisabled, setIsDisabled] = useState(true);
    let aVotes;


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
                    setTimeout(() => {
                        window.location.reload(false);
                    }, 3000);
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

    const enableRating = (ratingValue) => {
        setRating(ratingValue);
        setIsDisabled(false);
    }

    const cancelRating = () => {
        setRating(null);
        setIsDisabled(true);
        setIsModal(false);
    }


    return (
        <>

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

        </>
    )
}

export default RatingStarsModal;
