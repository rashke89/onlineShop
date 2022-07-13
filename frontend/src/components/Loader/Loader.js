import React from 'react';
import './loader.scss';
import {useSelector} from "react-redux";

const Loader = () => {
	const {show} = useSelector(state => state.loaderStore);

	return (
		<>
			{show && <div className="loader"></div>}
		</>
	);
};

export default Loader;