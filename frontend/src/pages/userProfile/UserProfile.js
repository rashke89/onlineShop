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
                            <h2 className="text-center">Welcome {user.username}</h2>
                        </div>
                        <div className="card-body">
                            {/*<h4 className="text-center">Id: {user._id}</h4>*/}
                            <h6><b>First name:</b> {user.firstName}</h6>
                            <h6><b>Last Name:</b> {user.lastName}</h6>
                            <h6><b>Email:</b> {user.email}</h6>
                            <h6 d-hi><b>Password:</b> {user.password}</h6>
                            <h6><b>Address:</b> {user.address}</h6>
                            <h6><b>City:</b> {user.city}</h6>
                        </div>
                        <EditUser user={user} key={user._id}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile;