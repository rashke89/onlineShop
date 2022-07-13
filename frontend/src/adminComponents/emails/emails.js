import { useEffect, useState } from "react";
import MessageService from "../../services/messageService";
import { ToastContainer, toast } from "react-toastify";
import "./emails.scss";

function Emails() {
  const [emailsInfo, setEmailsInfo] = useState([]);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    MessageService.getAllMessages()
      .then((res) => {
        setEmailsInfo(res.data);
      })
      .catch((err) => {
        console.log(err, "emails front");
      });
  }, [isDone]);

  const messageLayout = () => {
    return emailsInfo.map((item, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{item.firstName}</td>
          <td>{item.lastName}</td>
          <td>{item.email}</td>
          <td>{item.message}</td>
          <td>
            <button
              className="btn-danger"
              onClick={(e) => deleteMessage(item._id)}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  };

  const deleteMessage = (id) => {
    MessageService.deleteMessage(id)
      .then((res) => {
        setIsDone(!isDone);
        toast.success("Message deleted");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });
  };
  return (
    <>
      <h1>Emails</h1>
      <ToastContainer />

      <table className="table table-striped table-dark">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">Message</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>{messageLayout()}</tbody>
      </table>
    </>
  );
}

export default Emails;
