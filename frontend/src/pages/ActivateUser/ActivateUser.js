import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import AuthService from "../../services/authService";

function ActivateUser() {
    const [isActivated, setIsActivated] = useState(false);
    const [isApiFinish, setIsApiFinish] = useState(false);
    const params = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.hasOwnProperty("user")) {
            navigate("/")
        } else {
            AuthService.completeRegistration({userId: params.id})
                .then((res) => {
                    setIsActivated(true)
                    setTimeout(() => {
                        navigate("/auth")
                    })
                })
                .catch((err) => {
                    console.log(err)
                    setIsActivated(false)
                })
                .finally(() => {
                    setIsApiFinish(true)
                })
        }
    }, []);

    const responseMsgLayout = () => {
        return isActivated ? <p>Successfully activated</p> : <p>User not activated.</p>
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 text-center">
                    <div>Activate account</div>
                    {isApiFinish && responseMsgLayout()}
                </div>
            </div>
        </div>
    );
}

export default ActivateUser;