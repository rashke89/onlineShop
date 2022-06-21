import {useDispatch, useSelector} from "react-redux";
// import User from "../../components/EditUser/User";
import Modal from 'react-modal';
import {useEffect, useState} from "react";
import {updateUser, setUser} from "../../redux/userSlice";
import AuthService from "../../services/authService";

function UserProfile() {
    const user = useSelector((state) => state.userStore.user);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [editedUser, setEditedUser] = useState({});
    const showModal = () => setModalIsOpen(true);
    const closeModal = (e) => {
        e.preventDefault();
        setModalIsOpen(false);
    }
    const dispatch = useDispatch();
    const [isValidForm, setIsValidForm] = useState(true);

    useEffect(() => {
        setEditedUser(user);
    }, [user.username]);

    const onHandleInput = (e) => {
        setEditedUser({...editedUser, [e.target.name]: e.target.value});
    }

    const saveUser = (e) => {
        e.preventDefault();
        console.log(editedUser)
        if (!editedUser.username || !editedUser.password || !editedUser.email || !editedUser.email.includes("@")) {
            setIsValidForm(false)
            return
        }
        setIsValidForm(true);

        AuthService.userUpdate(editedUser)
            .then(res => {
                if (res.status === 200) {
                    // localStorage.setItem('user', JSON.stringify(user));
                    console.log(res.data);
                    dispatch(updateUser(editedUser));
                }
            })
            .catch(err => console.log(err))
    }


    return (
        <div className="wrapper container-fluid">
            {/*<h3 className="text-center">Edit user</h3>*/}
            <div className="row">
                <div className="col-md-10 mx-auto">
                    <div className="card ">
                        <div className="card-header">
                            <h2 className="text-center">Username: {user.username}</h2>
                        </div>
                        <div className="card-body">
                            <h4 className="text-center">First name: {user.firstName}</h4>
                            <h4 className="text-center">Last Name: {user.lastName}</h4>
                            <h4 className="text-center">Email: {user.email}</h4>
                            <h4 className="text-center">Password: {user.password}</h4>
                            <h4 className="text-center">Address: {user.address}</h4>
                            <h4 className="text-center">City: {user.city}</h4>
                        </div>
                    </div>
                    <div className="card-footer text-center">
                        <button className="btn btn-warning" onClick={showModal}>Edit</button>
                    </div>
                </div>
            </div>

            <Modal isOpen={modalIsOpen} ariaHideApp={false}>
                <form onSubmit={saveUser} method="post">

                    <label htmlFor="username">Username</label>
                    <input className="form-control" name="username" type="text" id="username" value={editedUser.username}
                           onChange={onHandleInput}/>

                    <label htmlFor="password">First name</label>
                    <input className="form-control mb-3" name="firstName" type="text" id="firstName" value={editedUser.firstName}
                           onInput={onHandleInput}/>

                    <label htmlFor="lastname">Last name</label>
                    <input className="form-control" name="lastName" type="text" id="lastName" value={editedUser.lastName}
                           onChange={onHandleInput}/>

                    <label htmlFor="password">Password</label>
                    <input className="form-control mb-3" name="password" type="password" id="password" value={editedUser.password}
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
                </form>
            </Modal>
        </div>
    )
}

export default UserProfile;