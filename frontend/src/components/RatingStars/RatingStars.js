import React, {useEffect, useState} from "react";
import { FaRegStar, FaStar } from 'react-icons/fa';
import './rating-stars.scss';
import {useDispatch} from "react-redux";
import {setRatingStars} from "../../redux/ratingStarsSlice";
// import ShopService from "../../services/shopService";


function RatingStars () {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    const dispatch = useDispatch();

    useEffect(()=>{
        setStoreRating()
    }, [rating]);
    const setStoreRating = () => {
        dispatch(setRatingStars(rating))
        console.log(rating)
    }


    // const changeRating = () => {
    //     ShopService.setProductRate({})
    //     .then(res =>{
    //         console.log(res.data );
    //     })
    //     .catch(err =>{
    //         console.log(err );
    //     })
    // }
    

    return (
        <div className="stars-wrapper">
            {[...Array(5)].map((star,i) =>{
                const ratingValue = i +1;
                return (
                    <label
                        key={i}
                    >
                        <input
                            type="radio"
                            name="rating"
                            value={ratingValue}
                            onClick={() => {
                                setRating(ratingValue);
                            }}
                        />
                        <FaStar
                            className="ratingStarFill"
                            color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(null)}
                            size={30}
                        />

                    </label>

                )
            })}

            {/* <button onClick={changeRating}>
                rest rating
            </button> */}
        </div>
    )

    // let arr = []
    // const inputStars = () => {
    //     for (let i = 0; i < 5; i++) {
    //         if (rating > i) {
    //             arr.push(<span className="ratingstarFill" key={i}>  <FaStar />   </span>)
    //         } else {
    //             arr.push(<span className="ratingstarFill" key={i}> <FaRegStar /> </span>)
    //         }
    //     }
    //     return arr
    // }
    // inputStars();
    //
    // return (
    //     <div className='stars-wrapper'>
    //
    //         {arr.map(el => el)}
    //     </div>
    // )
}

export default RatingStars;