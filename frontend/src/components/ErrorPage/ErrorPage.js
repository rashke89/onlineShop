import { Link } from 'react-router-dom';
import './error-page.scss';
import { routeConfig } from '../../config/routeConfig';
import {FaArrowRight} from "react-icons/fa"
function ErrorPage(){
    return (

    <div className="error-wraper">
    <h1>404</h1>
    <h3>Page Not Found</h3>
    <Link to={routeConfig.HOME.url}>
    <button>Back Home &nbsp; <FaArrowRight/> </button>
    </Link>
    </div>
    )
}
export default ErrorPage;