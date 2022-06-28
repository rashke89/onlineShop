import React, {useEffect, useState} from 'react';
import AuthService from "../services/AuthService";

const AllUsersTEST = () => {

    const [users, setUsers]=useState('');
    useEffect(()=>{
        AuthService.allUsersTEST()
            .then((response)=>{
                setUsers(response.data)
            })
            .catch((error)=>{
                console.log(error);
            })
    },[])
    return (
        <div>
            {users? users.map(user=>{
                return <div className="container d-flex justify-content-center align-content-center">
                <div className="card row col-6 my-3">
                    <div className="card-body">
                    <p className="card-text">{user._id}</p>
                    <p className="card-text">{user.username}</p>
                    <p className="card-text">{user.password}</p>
                    <p className="card-text">{user.email}</p>
                    <p className="card-text">{user.firstName}</p>
                    <p className="card-text">{user.lastName}</p>

                    </div>

                </div>
                </div>
            }):"Not found"}

        </div>
    );
};

export default AllUsersTEST;
