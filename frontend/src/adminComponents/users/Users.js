import {useEffect, useState} from "react";
import AuthService from "../../services/authService";
import Modal from 'react-modal';
import customStyles from "./CustomStyle";
import UpdateUser from "./UpdateUser";


function Users() {
    //delete
    const [users, setUsers] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [text, setText] = useState("");
    //update
    const [editModalIsOpen,setEditModalIsOpen] = useState(false);
    const [userToEdit,setUserToEdit] = useState({});

    const getNewAllUsers = () => {
        AuthService.getAllUsers()
            .then(res => {
                if (res.status === 200) {
                    setUsers(res.data)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        getNewAllUsers();
    }, []);

    const deleteAccount = (user) => {
        AuthService.deleteUserById(user._id)
            .then(res => {
                if (res.status === 200) {
                    setText(`User ${user.username} is deleted.`);
                    setModalIsOpen(true);
                    getNewAllUsers();
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    const closeModal = (e) => {
        e.preventDefault();
        setModalIsOpen(false);
    }

    const editUser = (user)=>{
        setEditModalIsOpen(true);
        setUserToEdit(user)
    }


    return (
        <>
            <div className="col-md-12">
                <div className="my-3">
                    <h1 className="text-center">Users</h1>
                    <hr/>
                </div>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Username</th>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user, index) => {
                        return <tr key={index}>
                            <td>{user.username}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>
                                <button className="btn btn-sm" onClick={() => deleteAccount(user)}>Delete</button>
                            </td>
                            <td>
                                <button className="btn btn-sm" onClick={()=> editUser(user)}>Edit</button>
                            </td>
                        </tr>
                    })}
                    </tbody>
                    {/*delete modal*/}
                    <Modal isOpen={modalIsOpen} ariaHideApp={false} style={customStyles}>
                        <div className="info d-flex flex-column">
                            <h4 className="text-center mb-5">{text}</h4>
                            <button className="btn btn-sm mx-2" onClick={closeModal}>Close</button>
                        </div>
                    </Modal>
                </table>
                {/*update modal*/}
                {editModalIsOpen &&<UpdateUser showModal={setEditModalIsOpen} user={userToEdit} updatedDb={getNewAllUsers}/>}
            </div>
        </>
    )
}

export default Users;
