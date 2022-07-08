import React from 'react';
import { IoCheckmarkCircleSharp } from 'react-icons/io5';
import './messages.scss';

function Succeeded() {
    return (
        <>
            <div className="succeeded-wrapper">
                <h3><IoCheckmarkCircleSharp /> Your payment has been successfully processed.</h3>
                <p>Thank you for your trust.</p>
            </div>
        </>
    )
}

export default Succeeded
