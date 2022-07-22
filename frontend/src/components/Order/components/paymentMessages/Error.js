import React from 'react';
import { MdOutlineError } from "react-icons/md";
import './messages.scss';

function Error() {
    return (
        <div className="error-wrapper">
            <h3><MdOutlineError /> Your payment was not processed successfully.</h3>
            <p>Please try again.</p>
        </div>
    )
}

export default Error
