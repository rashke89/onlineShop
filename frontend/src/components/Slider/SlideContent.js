import React from 'react';
import SlideTitle from "./SlideTitle";

function SlideContent({currentIndex, images}) {
    return (<>
            {images.map((image, index) => {
                return (index === currentIndex &&
                    <article className="content-holder" key={index}>
                        <img src={image.src} alt=""/>
                        {image.title && <SlideTitle title={image.title}/>}
                    </article>
                )
            })}
        </>
    )
}

export default SlideContent;