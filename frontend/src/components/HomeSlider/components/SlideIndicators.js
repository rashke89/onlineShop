import React from 'react';

const SlideIndicator = ({currentSlide, index, changeSlide}) => {

	return(
		<span className={index === currentSlide ? 'active' : ''} onClick={() => changeSlide(index)}></span>
	)
}

export default SlideIndicator;