import React, {useEffect, useState} from 'react';
import SingleUser from "./SingleUser";
import AuthService from "../../services/authService";


function Users() {
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        AuthService.getAllUsers().then((res) => {
            if (res && res.status === 200) {
                setAllUsers(res.data)
            }
        }).catch(err => {
            console.log(err)
        })
    }, []);

    return (
        <div className="container-fluid border">
            <SingleUser allUsers={allUsers}/>
        </div>
    );
}

export default Users;