import AuthService from "../services/AuthService";
import React, { useState, useEffect } from "react";
import SingleUser from "./SingleUser";

function AllUsers() {
    const [users, setUsers] = useState('');

    useEffect(() => {
        AuthService.getAll()
            .then(result => {
                if (result && result.status === 200) {
                    setUsers(result.data);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    return (
        <div className="container-fluid">
            <h1 style={{ color: 'white' }}>Svi korisnici</h1>
            {/* {console.log(users)} */}
            <div className="row">
                {users ? <SingleUser allStudents={users} /> : null}
            </div>
        </div>
    )
}

export default AllUsers;