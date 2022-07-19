import { FaRegStar, FaStar, FaStarHalf, FaStarHalfAlt } from 'react-icons/fa';
import './rating-stars.scss';


function RatingStars({ rating }) {

    let arr = []
    const inputStars = () => {
        for (let i = 0; i < 5; i++) {
            if (rating > i) {
                if (rating > i + 0.5) {
                    arr.push(<span className="ratingstarFill" key={i}><FaStar /></span>)
                } else {
                    arr.push(<span className="ratingstarFill" key={i}><FaStarHalfAlt /></span>)
                }
            } else {
                arr.push(<span className="ratingstarFill" key={i}><FaRegStar /></span>)
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