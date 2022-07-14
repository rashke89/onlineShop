import { FaRegStar, FaStar } from 'react-icons/fa';
import './rating-stars.scss';


function RatingStars({ rating }) {

    let arr = []
    const inputStars = () => {
        for (let i = 0; i < 5; i++) {
            if (rating > i) {
                arr.push(<span className="ratingstarFill" key={i}>  <FaStar />   </span>)
            } else {
                arr.push(<span className="ratingstarFill" key={i}> <FaRegStar /> </span>)
            }
        }
        return arr
    }
    inputStars();

    return (
        <div className='stars-wrapper'>
            {arr.map(el => el)}
        </div>
    )
}

export default RatingStars;