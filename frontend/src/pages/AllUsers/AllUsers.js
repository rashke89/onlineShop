import React, {useEffect, useState} from 'react';
import AuthService from "../../services/authService";
import User from "./User";
import "./style.scss"

function AllUsers() {
    const [allUsers, setAllUsers] = useState([]);
    useEffect(() => {
        AuthService.getAllUsers().then((res) => {
            if (res && res.status === 200) {
                setAllUsers(res.data)
            }
        })
    }, []);

    return (
        <div className="users-wrapper">
            <h2>Users</h2>
            <table>
                <thead>
                <tr>
                    <th>Or. Num.</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Is admin</th>
                    <th>First name</th>
                    <th>Last name</th>
                </tr>
                </thead>
                {allUsers && <User users={allUsers}/>}
            </table>
        </div>
    );
}

export default AllUsers;