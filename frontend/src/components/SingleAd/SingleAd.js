import { Link } from "react-router-dom";
import { routeConfig } from "../../config/routeConfig";
import './SingleAd.scss';

function SingleAd({ ad }) {

    return (
        <div className="col-md-6 col-lg-4 col-xl-3" key={ad.id}>
            <div className="card text-black">
                <i className="fab fa-apple fa-lg pt-3 pb-1 px-3"></i>
                <img src={ad.images[0]} className="card-img-top" alt="Apple Computer" />
                <div className="card-body">
                    <div className="text-center">
                        <h5 className="card-title">{ad.title}</h5>
                        <p className="text-muted mb-4">{ad.brand}</p>
                    </div>
                    <div>
                        <div className="d-flex justify-content-between">
                            <span>Rating</span><span>{ad.rating}</span>
                        </div>
                        <div className="d-flex justify-content-between">
                            <span>Discout</span><span>{ad.discountPercentage}</span>
                        </div>
                        <div className="d-flex justify-content-between">
                            <span>Price</span><span>{ad.price}</span>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between total font-weight-bold mt-4">
                        <span>{ad.description}</span>
                    </div>
                    <button><Link to={routeConfig.PRODUCT_PAGE.realUrl(ad.id)}>View add</Link></button>
                </div>
            </div>
        </div>
    )
}

export default SingleAd;
