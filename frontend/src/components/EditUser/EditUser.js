import {useDispatch, useSelector} from "react-redux";
import Modal from 'react-modal';
import {useEffect, useState} from "react";
import {updateUser, setUser} from "../../redux/userSlice";
import AuthService from "../../services/authService";


function EditUser(props) {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [editedUser, setEditedUser] = useState({});
    const [isApiErr, setIsApiErr] = useState(false);
    const [isApiFinish, setIsApiFinish] = useState(false);
    const [isValidForm, setIsValidForm] = useState(true);

    const showModal = () => setModalIsOpen(true);
    const closeModal = (e) => {
        e.preventDefault();
        setModalIsOpen(false);
    }
    const dispatch = useDispatch();

    useEffect(() => {
        setEditedUser(props.user);
    }, [props.user.username]);

    const onHandleInput = (e) => {
        // setIsApiErr(false);
        // setIsApiFinish(false);
        // setIsValidForm(true);

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
                    localStorage.setItem('user', JSON.stringify(editedUser));
                    console.log(res.data);
                    dispatch(updateUser(editedUser));
                    setIsApiErr(false);
                    setIsApiFinish(true);
                }
            })
            .catch(err => {
                setIsApiErr(true);
                console.log(err)
            })
    }

    return (
        <div>
            <div className="card-footer">
                <button className="btn btn-warning" onClick={showModal}>Edit</button>
            </div>
            <Modal isOpen={modalIsOpen} ariaHideApp={false}>
                <form onSubmit={onSubmitForm} method="post">

                    <label htmlFor="username">Username</label>
                    <input className="form-control" name="username" type="text" id="username"
                           value={editedUser.username}
                           onChange={onHandleInput}/>

                    <label htmlFor="password">First name</label>
                    <input className="form-control mb-3" name="firstName" type="text" id="firstName"
                           value={editedUser.firstName}
                           onInput={onHandleInput}/>

                    <label htmlFor="lastname">Last name</label>
                    <input className="form-control" name="lastName" type="text" id="lastName"
                           value={editedUser.lastName}
                           onChange={onHandleInput}/>

                    <label htmlFor="password">Password</label>
                    <input className="form-control mb-3" name="password" type="password" id="password"
                           value={editedUser.password}
                           onInput={onHandleInput}/>

                    <label htmlFor="email">Email</label>
                    <input className="form-control mb-3" name="email" type="email" id="email" value={editedUser.email}
                           onInput={onHandleInput}/>

                    <label htmlFor="address">Address</label>
                    <input className="form-control" type="text" id="address" name="address" value={editedUser.address}
                           onInput={onHandleInput}/>

                    <label htmlFor="city">City</label>
                    <input className="form-control" type="text" id="city" name="city" value={editedUser.city}
                           onInput={onHandleInput}/>

                    <button className="btn btn-success px-5 ms-auto">Save</button>
                    <button className="btn btn-success px-5 ms-auto" onClick={closeModal}>Close</button>
                    {!isValidForm ? <p>All fields are required!</p> : null}
                    {isApiFinish ? <p>Successfuly updated!</p> : null}
                    {isApiErr ? <p>ERROR:Ooops, something wrong, please try later!</p> : null}
                </form>
            </Modal>
        </div>

    )
}

export default EditUser;