import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAcceptCookies } from "../../redux/cookiesSlice";
import AOS from "aos";
import "aos/dist/aos.css";

export default function CookisPopup() {
    const [modalStyle, setModalStyle] = useState({
        display: "block",
    });

    const dispatch = useDispatch();
    const onClickHandler = (e) => {
        if (e.target.name === "accept") {
            localStorage.setItem("accept", true);
            dispatch(setAcceptCookies());
        } else {
            setModalStyle({ display: "none" });
        }
    };

    useEffect(() => {
        AOS.init();
        AOS.refresh();
    }, []);

    return (
        <div>
            <div
                className="modal"
                tabIndex="-1"
                style={modalStyle}
                data-aos="fade-down"
                data-aos-easing="linear"
                data-aos-duration="1500">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={onClickHandler}>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>
                                Our website uses cookies to improve your experience.
                                <br />
                                By continuing to use our site you consent to the use of cookies.
                            </p>
                        </div>
                        <div className="modal-footer">
                            {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" name="upAccept" onClick={onClickHandler}>Close</button> */}
                            <button
                                type="button"
                                className="btn btn-primary"
                                name="accept"
                                onClick={onClickHandler}>
                                Accept
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
