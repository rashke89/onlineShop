import { useEffect, useState, updateState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./shopAd.scss";
import { routeConfig } from "../../config/routeConfig";
import RatingStars from "../RatingStars/RatingStars";
import Modal from "react-modal";
import {  FaThumbsUp } from "react-icons/fa";
import { setRatingStars } from "../../redux/ratingStarsSlice";
import { showLoader } from "../../redux/loaderSlice";
import React from "react";

import ChangeCurrency from "../ChangeCurrency/ChangeCurrency";
import ShopService from "../../services/shopService";
import RatingStarsModal from "../RatingStarsModal/RatingStarsModal";
import { toast } from "react-toastify";
import {useSelector} from "react-redux";
import shopService from "../../services/shopService";


function ShopAd(props) {
  const [ad, setAd] = useState({});
  const [isModal, setIsModal] = useState(false);
  const [getRatings, setGetRatings] = useState(0);
  const flag = useSelector(state => state.ratingStore.flag);

  useEffect(() => {
    setAd(props.ad);
  }, [props.ad]);

  useEffect(() => {
    console.log(flag);
    if (flag){
      shopService.getAdById(ad._id)
          .then(res =>{
            if(res.data) setAd((res.data))
          })
          .catch(err =>console.log(err));
    }

  }, [flag]);


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
  const resetMongo = (id) => {

    ShopService.reset(id)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }

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
            <span className="rate-product" style={{cursor:"pointer"}} onClick={(e) => openModal(ad._id, ad.title)}>
            Rate &nbsp; <FaThumbsUp/>  
            </span>
            <span className="shop-ad-rating">
              <RatingStars rating={ad.rating} />
            </span>
            <p className="shop-ad-price">
              <ChangeCurrency adConvertPrice={ad.price} />
            </p>
            <Link to={routeConfig.AD_SHOP.realUrl(ad._id)} className="view-more-btn">
              <p className="view-more-btn-text">View Product</p>
            </Link>

             <div onClick={() => resetMongo(ad._id)}>Reset</div>
            {/* <div onClick={() => deleteMongo(ad._id)}>Delete</div> */}

          </div>
        </div>
      ) : null}

      <RatingStarsModal ad={ad} getRatings={getRatings} isModal={isModal} setIsModal={setIsModal} />
    </>
  );
}

export default ShopAd;
