import {useSelector} from "react-redux";
import EditUser from "../../components/EditUser/EditUser";
import {useState} from "react";

function UserProfile() {
    const user = useSelector((state) => state.userStore.user);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const showModal = () => setModalIsOpen(true);

    return (
        <div className="wrapper container-fluid">
            <div className="row">
                <div className="col-md-10 mx-auto">
                    <div className="card ">
                        <div className="card-header">
                            <h2 className="text-center">Welcome {user.username}</h2>
                        </div>
                        <div className="card-body">
                            <h6><b>First name:</b> {user.firstName}</h6>
                            <h6><b>Last Name:</b> {user.lastName}</h6>
                            <h6><b>Email:</b> {user.email}</h6>
                            <h6><b>Password:</b> {user.password}</h6>
                            <h6><b>Address:</b> {user.address}</h6>
                            <h6><b>City:</b> {user.city}</h6>
                        </div>
                        <div className="card-footer">
                            <button className="btn btn-warning" onClick={showModal}>Edit</button>
                        </div>
                    </div>
                    {/*<EditUser user={user} showModal={modalIsOpen} key={user._id}/>*/}
                    {modalIsOpen?<EditUser  showModal={setModalIsOpen} />:null}
                </div>
            </div>
        </div>
    )
}

export default UserProfile;