import Modal from 'react-modal';
import {useEffect, useState} from "react";
import customStyles from "./CustomStyle";
import AuthService from "../../services/authService";


function UpdateUser({showModal, user, updatedDb}) {
    const [selectedUser, setSelectedUser] = useState({});
    const [passIsShown, setPassIsShown] = useState(false);
    const [isApiErr, setIsApiErr] = useState(false);
    const [isApiFinish, setIsApiFinish] = useState(false);
    const [isValidForm, setIsValidForm] = useState(true);

    useEffect(() => {
        setSelectedUser(user);
    }, [user.username])

    const togglePassword = () => {
        setPassIsShown((passIsShown) => !passIsShown);
    };

    const closeModal = (e) => {
        e.preventDefault();
        showModal(false);
    };

    const onHandleInput = (e) => {
        setSelectedUser({...selectedUser, [e.target.name]: e.target.value});
    }

    const onSubmitForm = (e) => {
        e.preventDefault();
        if (!selectedUser.username || !selectedUser.password || !selectedUser.email || !selectedUser.email.includes("@")) {
            setIsValidForm(false);
            return
        }

        setIsValidForm(true);
        AuthService.userUpdate(selectedUser)
            .then(res => {
                if (res.status === 200) {
                    updatedDb();
                    setIsApiErr(false);
                    setIsApiFinish(true);
                    setTimeout(() => showModal(false), 1000);
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
                               value={selectedUser.username || ''}
                               onChange={onHandleInput}
                        />

                        <label className="label" htmlFor="firstName">First name</label>
                        <input className="form-control" name="firstName" type="text" id="firstName"
                               value={selectedUser.firstName || ''}
                               onInput={onHandleInput}
                        />

                        <label className="label" htmlFor="lastName">Last name</label>
                        <input className="form-control" name="lastName" type="text" id="lastName"
                               value={selectedUser.lastName || ''}
                               onChange={onHandleInput}
                        />

                        <label className="label" htmlFor="password">Password</label>
                        <input className="form-control" name="password"
                               type={passIsShown ? "text" : "password"}
                               id="password"
                               value={selectedUser.password || ''}
                               onInput={onHandleInput}
                        />
                        <div className="checkbox-container">
                            <label className="label" htmlFor="checkbox">Show password? </label>
                            <input className="mx-1"
                                   id="checkbox"
                                   type="checkbox"
                                checked={passIsShown}
                                onChange={togglePassword}
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <label className="label" htmlFor="email">Email</label>
                        <input className="form-control " name="email" type="email" id="email"
                               value={selectedUser.email || ''}
                               onInput={onHandleInput}
                        />

                        <label className="label" htmlFor="address">Address</label>
                        <input className="form-control" type="text" id="address" name="address"
                               value={selectedUser.address || ''}
                               onInput={onHandleInput}
                        />

                        <label className="label" htmlFor="city">City</label>
                        <input className="form-control" type="text" id="city" name="city"
                               value={selectedUser.city || ''}
                               onInput={onHandleInput}
                        />

                        <label className="label" htmlFor="isAdmin">Role: </label>
                        <select name="isAdmin" id="isAdmin"
                               aria-selected value={selectedUser.isAdmin}
                                onChange={onHandleInput}
                        >
                            <option value={selectedUser.isAdmin}>
                                {selectedUser.isAdmin === 'false' ? "User":"Admin"}
                            </option>

                            <option value={selectedUser.isAdmin === "true" ? "false":"true"}>
                                {selectedUser.isAdmin === 'false' ? "Admin":"User"}
                            </option>
                        </select>
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