import {useSelector} from "react-redux";
import EditUser from "../../components/EditUser/EditUser";
import {useState} from "react";

function UserProfile() {
    const user = useSelector((state) => state.userStore.user);
    return (
        <div className="wrapper container-fluid">
            <div className="row">
                <div className="col-md-10 mx-auto">
                    <div className="card ">
                        <div className="card-header">
                            <h2 className="text-center">Username: {user.username}</h2>
                        </div>
                        <div className="card-body">
                            {/*<h4 className="text-center">Id: {user._id}</h4>*/}
                            <h4 className="text-center">First name: {user.firstName}</h4>
                            <h4 className="text-center">Last Name: {user.lastName}</h4>
                            <h4 className="text-center">Email: {user.email}</h4>
                            <h4 className="text-center">Password: {user.password}</h4>
                            <h4 className="text-center">Address: {user.address}</h4>
                            <h4 className="text-center">City: {user.city}</h4>
                        </div>
                    </div>
                </div>
            </div>
            <EditUser user={user} key={user._id}/>
        </div>
    )
}

export default UserProfile;