import {useEffect, useState} from "react";
import AuthService from "../../services/authService";
import "./usersStyle.scss"
import UpdateUser from "./UpdateUser";
import DeleteUser from "./DeleteUser";


function Users() {
    const [users, setUsers] = useState([]);
    //delete
    const [modalIsOpen, setModalIsOpen] = useState(false);
    //update
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});

    const getUsers = () => {
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
        getUsers();
    }, []);

    const deleteAccount = (user) => {
        setModalIsOpen(true);
        setSelectedUser(user);
    }

    const editUser = (user) => {
        setEditModalIsOpen(true);
        setSelectedUser(user)
    }


    return (
        <>
            <div className="col-md-12 ">
                <div className="my-3">
                    <h1 className="text-center">Users</h1>
                    <hr/>
                </div>
                <table className="table table-striped table-bordered table-hover table-dark">
                    <thead>
                    <tr>
                        <th>Username</th>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th className="text-center">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user, index) => {
                        return <tr key={index}>
                            <td>{user.username}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.isAdmin === "true" ? "Admin" : "User"}</td>
                            <td className="text-center">
                                <button className="btn-danger delete-user mx-3 py-1 px-2"
                                        onClick={() => deleteAccount(user)}>Delete
                                </button>
                                <button className="btn-warning edit-user mx-3 py-1 px-3"
                                        onClick={() => editUser(user)}>Edit
                                </button>
                            </td>
                        </tr>
                    })}
                    </tbody>
                    {/*delete modal*/}
                    {modalIsOpen &&<DeleteUser showModal={setModalIsOpen} user={selectedUser} updatedDb={getUsers}/>}
                </table>
                {/*update modal*/}
                {editModalIsOpen &&<UpdateUser showModal={setEditModalIsOpen} user={selectedUser} updatedDb={getUsers}/>}
            </div>

        </>
    )
}

export default Users;