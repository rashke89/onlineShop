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
import RatingStarsModal from "../RatingStarsModal/RatingStarsModal";
import { toast, ToastContainer } from "react-toastify";

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
  rateYes: {
    padding: "7px 15px",
    backgroundColor: "tomato",
    border: "1px solid tomato",
    color: "white",
    cursor: 'pointer'
  },
  rateNo: {
    padding: "7px 15px",
    backgroundColor: "silver",
    border: "1px solid silver",
    color: "black",
    cursor: 'not-allowed'
  },
  rate: {
    cursor: 'pointer'
  }
};

function ShopAd(props) {
  const [ad, setAd] = useState({});
  const [isModal, setIsModal] = useState(false);
  const [getRatings, setGetRatings] = useState(0);

  useEffect(() => {
    setAd(props.ad);
  }, [props.ad]);

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

  // * reset
  // const resetMongo = (id) => {

  //   ShopService.reset(id)
  //     .then(res => {
  //       console.log(res.data);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     })
  // }

  // * delete
  // const deleteMongo = (id) => {

  //   ShopService.delete(id)
  //     .then(res => {
  //       console.log(res.data);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     })
  // }


  return (
    <>
      {ad?.imgUrl ? (
        <div className="shop-ad-wrapper col-md-3">
          <div className="shop-ad-content-wrapper">
            <img src={ad.imgUrl} className="img img-fluid" alt="" />
            <p className="shop-ad-title">{ad.title}</p>
            <span style={styles.rate} onClick={(e) => openModal(ad._id, ad.title)}>rate product</span>
            <span className="shop-ad-rating">
              <RatingStars rating={ad.rating} />
            </span>
            <p className="shop-ad-price">
              <ChangeCurrency adConvertPrice={ad.price} />
            </p>
            <Link to={routeConfig.AD_SHOP.realUrl(ad._id)} className="view-more-btn">
              <p className="view-more-btn-text">View Product</p>
            </Link>

            {/* <div onClick={() => resetMongo(ad._id)}>Reset</div> */}
            {/* <div onClick={() => deleteMongo(ad._id)}>Delete</div> */}

          </div>
        </div>
      ) : null}

      <RatingStarsModal ad={ad} getRatings={getRatings} isModal={isModal} setIsModal={setIsModal} />
    </>
  );
}

export default ShopAd;
