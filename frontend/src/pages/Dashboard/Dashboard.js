import React, {useEffect, useState} from 'react';
import UserService from "../../services/userService";
import UtilsService from "../../services/utilsService"
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {removeUser} from "../../redux/userSlice";
import AuthService from "../../services/authService";

function Dashboard() {
    const [loggedUser, setLoggedUser] = useState(UtilsService.getLocalStorage())
    const [userInfo, setUserInfo] = useState({});
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        if (AuthService.isLogged()) {
            UserService.getUserInfo(loggedUser.username).then((res) => {
                setUserInfo(res.data)
            }).catch((err) => {
                console.log(err)
            })
        } else {
            navigate("/")
        }
    }, [loggedUser]);

    const logOut = () => {
        dispatch(removeUser())
    }


    return (userInfo.hasOwnProperty("username") ?
            <div className="container">
                <h1>User dashboard</h1>
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <ul className="list-group">
                            <li className="list-group-item"><strong>First name:</strong> {userInfo.firstName}</li>
                            <li className="list-group-item"><strong>Last name:</strong> {userInfo.lastName}</li>
                            <li className="list-group-item"><strong>Email:</strong> {userInfo.email}</li>
                            <li className="list-group-item"><strong>Username:</strong> {userInfo.username}</li>
                            <li className="list-group-item"><strong>Gender:</strong> {userInfo.gender}</li>
                            <li className="list-group-item"><strong>Address:</strong> {userInfo.address}</li>
                            <li className="list-group-item"><strong>City:</strong> {userInfo.city}</li>
                            <li className="list-group-item"><strong>Post code:</strong> {userInfo.postCode}</li>
                            <li className="list-group-item"><strong>Is admin:</strong> {userInfo.isAdmin}</li>
                            <li className="list-group-item"><strong>Is active:</strong> {userInfo.isActive}</li>
                            <li className="list-group-item bg-success text-end">
                                <button className="btn btn-warning" onClick={logOut}>Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

            </div> : null
    );
}

export default Dashboard;