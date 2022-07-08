import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AuthService from '../../services/AuthService';

function ActivateUser() {

    const [isActiveAccount, setIsActiveAccount] = useState(false);
    const [isAPIFinished, setIsAPIFinished] = useState(false);

    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        // * If user is login, navigate him to proper page
        if (localStorage.hasOwnProperty('user')) {
            navigate('/');
        } else {
            // * if not go to authservice and send uniq user ID
            AuthService.completeRegistration({ userID: params.id })
                .then(response => {
                    // * if all is ok set activate message to be success
                    if (response && response.status === 200) {
                        setIsActiveAccount(true);
                        setTimeout(() => {
                            navigate('/authorization')
                        }, 5000);
                    }
                })
                // * if not set activate message to be success
                .catch(err => {
                    setIsActiveAccount(false);
                })
                // * for activation account we need from promise to be finished and then we set api call is finished
                .finally(() => {
                    setIsAPIFinished(true);
                })
        }

    }, []);

    // * funciton for message layout depend on account activate properly
    const responseMessageLayout = () => {
        return isActiveAccount ?
            <p>Successfuly activate account</p> :
            <p>Something went wrong, please try to register again.</p>
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1>Activation page</h1>

                    // * only when api call is finished print message depend on is account active or not
                    {isAPIFinished && responseMessageLayout()}

                </div>
            </div>
        </div>
    )
}

export default ActivateUser;