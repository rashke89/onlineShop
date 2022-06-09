import React from 'react';

function SlideContent({image}) {

    return (
        <article>
            <img src={image.src} alt=""/>
        </article>
    );
}

export default SlideContent;