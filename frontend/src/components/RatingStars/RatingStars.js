import { useEffect } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';
import './rating-stars.scss';


function RatingStars({rating}){
    const numStars =[1,1,1,1,1]
    useEffect(()=>{
        // console.log(parseInt(rating))
    },[rating])


    return(
        <div className='stars-wrapper'>
        {
            numStars.map((arr, index) => {
                if(rating > index){
                    return <span className='ratingstarFill' key={index}>  <FaStar />   </span>
                }
                else{
                    return <span className='ratingstarFill' key={index}> <FaRegStar  /> </span>
                }
            })
        }
        </div>     
    )
}

export default RatingStars;