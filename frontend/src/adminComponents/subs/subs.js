import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Modal from 'react-modal';
import SubscribeService from "../../services/subscribeService";

const styles = {
    content: {
        top: '50%',
        left: '50%',
        right: '50%',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        boxShadow: '0 1px 8px rgba(0, 0, 0, 0.3)',
    },
    overlay: {
        position: 'fixed',
        backgroundColor: '#0e0e0ead'
    },
    heading: {
        marginBottom: '30px'
    },
    div: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    cancel: {
        padding: '7px 15px',
        backgroundColor: 'green',
        border: '1px solid green',
        color: 'white'
    },
    delete: {
        padding: '7px 15px',
        backgroundColor: 'tomato',
        border: '1px solid tomato',
        color: 'white'
    },
    td: {
        width: '100%',
        cursor: 'pointer'
    }
}

function Subs() {
    const [subsInfo, setSubsInfo] = useState([]);
    const [subsID, setSubsID] = useState('');
    const [isDone, setIsDone] = useState(false);
    const [isModal, setIsModal] = useState(false);

    useEffect(() => {
        SubscribeService.getAll()
            .then((res) => {
                setSubsInfo(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [isDone]);


    const messageLayout = () => {
        return subsInfo.map((item, index) => {
            return (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.email}</td>
                    <td>{item.subscribedAt}</td>
                    <td>
                        <button
                            className="btn-danger"
                            onClick={(e) => {
                                openModal(item._id)
                            }}
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            );
        });
    };

    const openModal = (id) => {
        setIsModal(true)
        setSubsID(id);
    }

    const deleteMessage = (subscribeId) => {
        SubscribeService.deleteSubscription(subscribeId)
            .then((res) => {
                setIsDone(!isDone);
                toast.success("Subscription successfully deleted");
            })
            .catch((err) => {
                console.log(err);
                toast.error("Something went wrong");
            })
            .finally(() => {
                setIsModal(false);
            })
    };

    return (
        <>
            <h1>Subs</h1>
            <table className="table table-striped table-dark">
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Email</th>
                        <th scope="col">Subscribed At</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>{messageLayout()}</tbody>
            </table>

            {isModal &&
                <Modal isOpen={true} ariaHideApp={false} style={styles} aria-labelledby='contained-modal-title-vcenter'
                    centered>
                    <h3 style={styles.heading}>Delete subscription</h3>
                    <div style={styles.div}>
                        <button style={styles.cancel} onClick={e => setIsModal(false)}>Cancel</button>
                        <button style={styles.delete} onClick={e => deleteMessage(subsID)}>Delete</button>
                    </div>
                </Modal>
            }

            <ToastContainer />
        </>
    );
}

export default Subs;
