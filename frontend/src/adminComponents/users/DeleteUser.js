import Modal from 'react-modal';
import customStyles from "./CustomStyle";
import AuthService from "../../services/authService";

function DeleteUser({showModal, user, updatedDb}) {

    const deleteUser = () => {
        AuthService.deleteUserById(user._id)
            .then(res => {
                if (res.status === 200) {
                    showModal(false);
                    updatedDb();
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    const closeModal = (e) => {
        e.preventDefault();
        showModal(false);
    }
    return <>
        <Modal isOpen={true} ariaHideApp={false} style={customStyles}>
            <div className="info d-flex flex-column">
                <h5 className="text-center mb-5 ">Do you want to delete <span>{user.username}</span> ?</h5>
                <div className="d-flex justify-content-center">
                    <button className="btn  mx-2" onClick={deleteUser}>Yes</button>
                    <button className="btn  mx-2" onClick={closeModal}>No</button>
                </div>

            </div>
        </Modal>
    </>
}

export default DeleteUser;