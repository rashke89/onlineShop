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
import {flag} from "../../redux/ratingStarsSlice";


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
};

function RatingStarsModal({ ad, getRatings, isModal, setIsModal}) {

    const { user } = useSelector(state => state.userStore);
    const [hover, setHover] = useState(null);
    const [rating, setRating] = useState(null);
    const dispatch = useDispatch();
    const [isDisabled, setIsDisabled] = useState(true);
    let aVotes;


    const setRatingS = async (rating, ad) => {
        dispatch(showLoader(true))

        // * GET VOTING FORM SPECIFIC USER
        await AuthService.getVoting(user._id)
            .then(res => {
                aVotes = res.data
            })
            .catch(err => {
                console.log(err, 'greska');
            })

        let isRated = aVotes.includes(ad.id);
        if (!isRated) {
            await AuthService.setVoting({ userID: user._id, product: ad , rating, getRatings })
                .then(res => {
                    console.log(res.data);
                    return res.data;
                })
                .catch(err => {
                    console.log(err);
                });

            dispatch(flag('test'));
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
                        <button disabled={isDisabled} className={isDisabled ? "rateNo" : "rateYes"} onClick={(e) => setRatingS(rating,ad)}>Rate</button>
                    </div>
                </Modal>
            )}

        </>
    )
}

export default RatingStarsModal;
