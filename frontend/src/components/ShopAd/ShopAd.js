import { useEffect, useState, updateState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./shopAd.scss";
import { routeConfig } from "../../config/routeConfig";
import RatingStars from "../RatingStars/RatingStars";
import Modal from "react-modal";
import { FaRegStar, FaStar } from "react-icons/fa";
import { setRatingStars } from "../../redux/ratingStarsSlice";
import { showLoader } from "../../redux/loaderSlice";
import React from "react";

import ChangeCurrency from "../ChangeCurrency/ChangeCurrency";
import { useDispatch } from "react-redux";
import ShopService from "../../services/shopService";

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
  heading: {
    marginBottom: "30px",
  },
  div: {
    display: "flex",
    justifyContent: "space-between",
  },
  cancel: {
    padding: "7px 15px",
    backgroundColor: "green",
    border: "1px solid green",
    color: "white",
  },
  delete: {
    padding: "7px 15px",
    backgroundColor: "tomato",
    border: "1px solid tomato",
    color: "white",
  },
};

function ShopAd(props) {
  const [ad, setAd] = useState({});
  const [isModal, setIsModal] = useState(false);
  const [hover, setHover] = useState(null);
  const [rating, setRating] = useState(null);
  const dispatch = useDispatch();
  const [getRatings, setGetRatings] = useState(0);


  // mount
  useEffect(() => {
    setAd(props.ad);
  }, [props.ad]);



  const openModal = (id) => {
    console.log(id);
    setIsModal(true);
    ShopService.getRating(id)
                .then(res => {
                    console.log(res.data, "then sss");
                    setGetRatings(res.data)
                })
                .catch(err => {
                    console.log(err, "catch ss");
                });
  };

  const setRatingS = (rating, id) =>{
    dispatch(showLoader(true))
    ShopService.setRatingStars({rating, id})
                .then(res => {
                    console.log(res.data, "then");
                    setIsModal(false);
                    dispatch(showLoader(false))
                    window.location.reload(false);
                })
                .catch(err => {
                    console.log(err, "catch");
                    dispatch(showLoader(false))
                });

                console.log(rating, id, "settt");            
  } 



  return (
    <>
      {ad?.imgUrl ? (
        <div className="shop-ad-wrapper col-md-3">
          <div className="shop-ad-content-wrapper">
            <img src={ad.imgUrl} className="img img-fluid" alt="" />
            <p className="shop-ad-title">{ad.title}</p>
            <span onClick={(e) => openModal(ad._id)}> rate product </span>
            <span className="shop-ad-rating">
              <RatingStars rating={ad.rating} />
            </span>
            <p className="shop-ad-price">
              <ChangeCurrency adConvertPrice={ad.price} />
            </p>
            <Link
              to={routeConfig.AD_SHOP.realUrl(ad._id)}
              className="view-more-btn"
            >
              <p className="view-more-btn-text">View Product</p>
            </Link>
          </div>
        </div>
      ) : null}

      {isModal && (
        <Modal
          isOpen={true}
          ariaHideApp={false}
          style={styles}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <h3 style={styles.heading}>Rate product</h3>

          <div className="stars-wrapper">
            {[...Array(5)].map((star, i) => {
              const ratingValue = i + 1;
              return (
                <label key={i}>
                  <input
                    // style={{display:none}}
                    type="radio"
                    name="rating"
                    value={ratingValue}
                    onClick={() => {
                      setRating(ratingValue);
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

          <div style={styles.div}>
            <button style={styles.cancel} onClick={(e) => setIsModal(false)}>
              Cancel
            </button>
            <button style={styles.delete} onClick={(e) => setRatingS(rating, ad._id)} >Rate</button>
          </div>
        </Modal>
      )}
    </>
  );
}

export default ShopAd;
