import React, { useState } from "react";
import MessageService from "../../services/messageService";
import { useNavigate } from "react-router-dom";
import { routeConfig } from "../../config/routeConfig";
import "./contact-form.scss";

function ContactForm() {
  // * STATE FOR MESSAGE TO PUT IT IN
  const [message, setMessage] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  // * CLEAR ALL INPUTS AFTER SUBMITTED FORM
  function clearInputs(e) {
    return (
      (e.target[0].value = ""),
      (e.target[1].value = ""),
      (e.target[2].value = ""),
      (e.target[3].value = "")
    );
  }

  // * OUTPUT MESSAGE SENT TO USER AFTER SUBMITTED FORM
  function showMsg() {
    return isSent ? (
      <div className="successMessage">Message is successfully sent</div>
    ) : (
      <div className="errorMessage">
        Something went wrong, please try again.
      </div>
    );
  }

  // * NAVIGATE
  const navigate = useNavigate();

  // * STATES FOR FORM VALIDATION, MESSAGE FOR USER, AND API CALL
  const [isSent, setIsSent] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isApiFinished, setIsApiFinished] = useState(false);

  // * STATES FOR MESSAGE INPUT FIELDS
  const [isFirstName, setIsFirstName] = useState(true);
  const [isLastName, setIsLastName] = useState(true);
  const [isEmail, setIsEmail] = useState(true);
  const [isMessage, setIsMessage] = useState(true);

  // * TAKING VALUES FROM INPUTS
  const handleInputField = (e) => {
    let newMessage = message;
    newMessage[e.target.id] = e.target.value;
    setMessage(newMessage);
  };

  // * WHEN FORM IS SUBMITTED
  const onSubmitForm = (e) => {
    e.preventDefault();

    // * CHECKING ONE BY ONE FIELD AND SENT PROPPER MESSAGE
    !message.firstName ? setIsFirstName(false) : setIsFirstName(true);
    !message.lastName ? setIsLastName(false) : setIsLastName(true);
    !message.email.includes("@") ? setIsEmail(false) : setIsEmail(true);
    !message.message ? setIsMessage(false) : setIsMessage(true);

    // * CHECK VALIDATION FOR ALL FIELDS AND SET FORM VALIDATION DEPENTS ON IT
    if (
      !message.firstName ||
      !message.lastName ||
      !message.email.includes("@") ||
      !message.message
    ) {
      setIsFormValid(false);
      return;
    }

    clearInputs(e);

    setIsFormValid(true);

    // * send message to official email
    MessageService.sendMessage(message)
      .then((response) => {
        if (response && response.status === 200) {
          setIsSent(true);
        }
      })
      .catch((err) => {
        setIsSent(false);
      })
      .finally(() => {
        setIsApiFinished(true);
        setTimeout(function () {
          navigate(routeConfig.SHOP.url);
        }, 3000);
      });
  };

  return (
    <div className="col-md-6 col-sm-6 col-xs-6">
      <div className="contact-form">
        <h3>GET IN TOUCH WITH US</h3>
        <form onSubmit={onSubmitForm}>
          <div className="row">
            <div className="col-sm-6">
              <div className="form-group">
                <label
                  htmlFor="firstName"
                  style={isFirstName ? { color: "" } : { color: "tomato" }}
                >
                  {isFirstName ? "First Name" : "First Name is required"}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  onInput={handleInputField}
                />
              </div>
            </div>
            <div className="col-sm-6">
              <div className="form-group">
                <label
                  htmlFor="lastName"
                  style={isLastName ? { color: "" } : { color: "tomato" }}
                >
                  {isLastName ? "Last Name" : "Last Name is required"}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  onInput={handleInputField}
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <label
              htmlFor="email"
              style={isEmail ? { color: "" } : { color: "tomato" }}
            >
              {isEmail ? "Email" : "Email is not valid"}
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              onInput={handleInputField}
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="message"
              style={isMessage ? { color: "" } : { color: "tomato" }}
            >
              {isMessage ? "Message" : "Your message is empty"}
            </label>
            <textarea
              className="form-control"
              id="message"
              rows="5"
              name="message"
              onInput={handleInputField}
            ></textarea>
            <br />
          </div>

          <div>{isApiFinished ? showMsg() : null}</div>

          <input
            type="submit"
            className="btn btn-primary"
            value="SEND A MESSAGE"
          />
        </form>
      </div>
    </div>
  );
}
export default ContactForm;
