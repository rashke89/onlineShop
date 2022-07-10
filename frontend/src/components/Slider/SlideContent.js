import React from "react";
import {Link} from "react-router-dom";

function SlideContent({currentIndex, image}) {


    return (
        <>
            <article className="content-holder" key={currentIndex}>
                <div
                    className="content-image"
                    style={{backgroundImage: `url(${image.src})`}}
                ></div>
                <div className="content-title">
                    <div>
                        <h2>{image.title}</h2>
                        <p>{image.subtitle}</p>
                    </div>
                    <Link className="content-btn" to={image.btnLink}>
                        {image.btnText}
                    </Link>
                </div>
            </article>
        </>
    );
}

export default SlideContent;
