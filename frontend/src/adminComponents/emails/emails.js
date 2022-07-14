import { useEffect, useState } from "react";
import MessageService from "../../services/messageService";
import { ToastContainer, toast } from "react-toastify";
import Modal from 'react-modal';

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
    width: '45%',
    cursor: 'pointer'
  }
}

function Emails() {
  const [emailsInfo, setEmailsInfo] = useState([]);
  const [messageID, setMessageID] = useState('');
  const [isDone, setIsDone] = useState(false);
  const [isModal, setIsModal] = useState(false);

  useEffect(() => {
    MessageService.getAllMessages()
      .then((res) => {
        setEmailsInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isDone]);


  const checkLength = (message) => {
    if (message.length > 100) {
      return (
        <td style={styles.td} onClick={e => { toggleMessage(e, message) }}>{`${message.substring(0, 100)} ...READ MORE...`}</td>
      )
    } else {
      return <td>{message}</td>;
    }
  }
  const toggleMessage = (e, message) => {
    if (e.target.innerHTML === `${message.substring(0, 100)} ...READ MORE...`) {
      e.target.innerHTML = `${message} ...READ LESS...`;
    } else if (e.target.innerHTML === `${message} ...READ LESS...`) {
      e.target.innerHTML = `${message.substring(0, 100)} ...READ MORE...`;
    }
  }

  const messageLayout = () => {
    return emailsInfo.map((item, index) => {
      return (
        <tr key={index}>
          <td style={{ width: '5%' }}>{index + 1}</td>
          <td style={{ width: '20%' }}>{item.firstName + ' ' + item.lastName}</td>
          <td style={{ width: '20%' }}>{item.email}</td>
          {checkLength(item.message, index)}
          <td style={{ width: '10%' }}>
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
    setMessageID(id);
  }

  const deleteMessage = (id) => {
    MessageService.deleteMessage(id)
      .then((res) => {
        setIsDone(!isDone);
        toast.success("Message successfully deleted");
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
      <h1>Emails</h1>
      <table className="table table-striped table-dark">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Message</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>{messageLayout()}</tbody>
      </table>

      {isModal &&
        <Modal isOpen={true} ariaHideApp={false} style={styles} aria-labelledby='contained-modal-title-vcenter'
          centered>
          <h3 style={styles.heading}>Delete message</h3>
          <div style={styles.div}>
            <button style={styles.cancel} onClick={e => setIsModal(false)}>Cancel</button>
            <button style={styles.delete} onClick={e => deleteMessage(messageID)}>Delete</button>
          </div>
        </Modal>
      }

      <ToastContainer />
    </>
  );
}

export default Emails;
