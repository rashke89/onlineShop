import './HeaderProduct.scss'

function HeaderProduct(props) {

    return (
        <div className="header-wrapper"
             style={{
                 backgroundImage: "linear-gradient( rgba(11, 11, 11, 0.500), rgba(13, 13, 13, 0.850))," + "url(" + props.productInfo.imgUrl + ")",
                 backgroundPosition: 'center',
                 backgroundRepeat: 'no-repeat',
             }}
        >
            <h2> {props.productInfo.title}</h2>
        </div>
    )
}

export default HeaderProduct;