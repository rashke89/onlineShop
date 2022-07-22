import {useSelector} from "react-redux";
import EditUser from "../../components/EditUser/EditUser";
import {useState} from "react";
import ChangePassword from "../../components/ChangePassword/ChangePassword";
import "./user_profile.scss";

function UserProfile() {
    const user = useSelector((state) => state.userStore.user);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalPassword, setModalPassword] = useState(false);
    const showModal = () => setModalIsOpen(true);
    const showPasswordModal = () => setModalPassword(!modalPassword)

    return (
        <div className="wrapper container-fluid mt-5">
            <div className="row">
                <div className="col-md-4 mx-auto">
                    <h4 className="text-center heading">Account settings</h4>
                    <ul className="list-group my-5">
                        <li className="list-group-item"><b>Username:</b> {user.username}</li>
                        <li className="list-group-item"><b>First name:</b> {user.firstName}</li>
                        <li className="list-group-item"><b>Last Name:</b> {user.lastName}</li>
                        <li className="list-group-item"><b>Email:</b> {user.email}</li>
                        <li className="list-group-item"><b>Password:</b>
                            <button className="btn btn-sm btn-warning float-end" onClick={showPasswordModal}>
                                Change
                            </button>
                        </li>
                        <li className="list-group-item"><b>Address:</b> {user.address}</li>
                        <li className="list-group-item"><b>City:</b> {user.city}</li>
                        <button className="btn btn-outline-primary mx-auto my-2" onClick={showModal}>Edit profile
                        </button>
                    </ul>
                    {modalIsOpen ? <EditUser showModal={setModalIsOpen}/> : null}
                    {modalPassword && <ChangePassword showModal={showPasswordModal}/>}
                </div>
            </div>
        </div>
    )
}


export default UserProfile;