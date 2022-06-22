import Navigation from "../components/navigation/Navigation";
import ProductView from "../components/productView/productView";

const ProductPage=()=>{


    return(
        <>
            <Navigation/>
        <div className="productPage-wrapper">
          <ProductView/>
        </div>

    </>
    )
}

export default ProductPage;