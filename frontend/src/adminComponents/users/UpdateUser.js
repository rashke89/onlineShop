import Modal from 'react-modal';
import {useEffect, useState} from "react";
import customStyles from "./CustomStyle";
import AuthService from "../../services/authService";


function UpdateUser({showModal, user, updatedDb}) {
    const [editedUser, setEditedUser] = useState({});
    const [isApiErr, setIsApiErr] = useState(false);
    const [isApiFinish, setIsApiFinish] = useState(false);
    const [isValidForm, setIsValidForm] = useState(true);

    useEffect(() => {
        setEditedUser(user);
    }, [user.username])

    const closeModal = (e) => {
        e.preventDefault();
        showModal(false);
    };

    const onHandleInput = (e) => {
        setEditedUser({...editedUser, [e.target.name]: e.target.value});
    }

    const onSubmitForm = (e) => {
        e.preventDefault();
        console.log(editedUser)
        if (!editedUser.username || !editedUser.password || !editedUser.email || !editedUser.email.includes("@")) {
            setIsValidForm(false);
            return
        }

        setIsValidForm(true);
        AuthService.userUpdate(editedUser)
            .then(res => {
                if (res.status === 200) {
                    updatedDb();
                    setIsApiErr(false);
                    setIsApiFinish(true);
                    setTimeout(() => showModal(false), 1500);
                }
            })
            .catch(err => {
                setIsApiErr(true);
                console.log(err)
            })
    }

    return <div>
        <Modal isOpen={true} ariaHideApp={false} style={customStyles} aria-labelledby='contained-modal-title-vcenter'
               centered>

            {!isValidForm ? <p className="notification text-warning">All fields are required!</p> : null}
            {isApiFinish ? <p className="notification text-success">Successfuly updated!</p> : null}
            {isApiErr ? <p className="notification text-warning">ERROR:Ooops, something went wrong, please try
                later!</p> : null}

            <form onSubmit={onSubmitForm} method="post">
                <div className="row">
                    <div className="col-md-6">
                        <label className="label" htmlFor="username">Username</label>
                        <input className="form-control" name="username" type="text" id="username"
                               defaultValue={editedUser.username || ''}
                               onChange={onHandleInput}
                        />

                        <label className="label" htmlFor="firstName">First name</label>
                        <input className="form-control" name="firstName" type="text" id="firstName"
                               defaultValue={editedUser.firstName || ''}
                               onInput={onHandleInput}
                        />

                        <label className="label" htmlFor="lastName">Last name</label>
                        <input className="form-control" name="lastName" type="text" id="lastName"
                               defaultValue={editedUser.lastName || ''}
                               onChange={onHandleInput}
                        />

                        <label className="label" htmlFor="password">Password</label>
                        <input className="form-control" name="password"
                               id="password"
                               defaultValue={editedUser.password || ''}
                               onInput={onHandleInput}
                        />
                        <div className="checkbox-container">
                            <label className="label" htmlFor="checkbox">Show password? </label>
                            <input className="mx-1"
                                   id="checkbox"
                                   type="checkbox"
                                // checked={passIsShown}
                                // onChange={togglePassword}
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <label className="label" htmlFor="email">Email</label>
                        <input className="form-control " name="email" type="email" id="email"
                               defaultValue={editedUser.email || ''}
                               onInput={onHandleInput}
                        />

                        <label className="label" htmlFor="address">Address</label>
                        <input className="form-control" type="text" id="address" name="address"
                               defaultValue={editedUser.address || ''}
                               onInput={onHandleInput}
                        />

                        <label className="label" htmlFor="city">City</label>
                        <input className="form-control" type="text" id="city" name="city"
                               defaultValue={editedUser.city || ''}
                               onInput={onHandleInput}
                        />
                    </div>
                    <div className="footer d-flex justify-content-center my-3">
                        <button className="btn btn-outline-primary mx-2 save">Save</button>
                        <button className="btn btn-outline-primary mx-2" onClick={closeModal}>Close</button>
                    </div>
                </div>
            </form>
        </Modal>
    </div>
}

export default UpdateUser;