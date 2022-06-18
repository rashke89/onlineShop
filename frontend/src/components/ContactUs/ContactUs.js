import React, { useState } from "react";
import MessageService from "../../services/messageService";

function ContactUs() {
    const [userObj, setUserObj] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
    });

    const [isFormValid, setIsFormValid] = useState(false);

    const [isFirstName, setIsFirstName] = useState(true);
    const [isLastName, setIsLastName] = useState(true);
    const [isEmail, setIsEmail] = useState(true);
    const [isMessage, setIsMessage] = useState(true);


    const handleInputField = (e) => {
        let newUserObj = userObj;
        // console.log(e);
        // console.log(e.target);
        // console.log(e.target.value);
        newUserObj[e.target.id] = e.target.value;
        setUserObj(newUserObj);

    }
    const onSubmitForm = (e) => {
        e.preventDefault();
        // console.log(e);
        if (!userObj.firstName) {
            setIsFirstName(false);
        } else {
            setIsFirstName(true);
        }

        if (!userObj.lastName) {
            setIsLastName(false);
        } else {
            setIsLastName(true);
        }

        if (!userObj.email.includes('@')) {
            setIsEmail(false);
        } else {
            setIsEmail(true);
        }

        if (!userObj.message) {
            setIsMessage(false);
        } else {
            setIsMessage(true);
        }

        if (!userObj.firstName || !userObj.lastName || !userObj.email.includes('@') || !userObj.message) {
            setIsFormValid(false);
            console.log('USAO SAM');
            return;
        }

        setIsFormValid(true)
        // console.log(userObj);


        MessageService.sendMessage(userObj)
            .then(response => {
                if (response && response.status === 200) {
                    console.log(response);
                }
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                console.log(e);
                e.target[0].value = '';
                e.target[1].value = '';
                e.target[2].value = '';
                e.target[3].value = '';
            })


    }
    return (
        <div className="container-xl">
            <div className="row">
                <div className="col-md-8 mx-auto">
                    <div className="contact-form">
                        <h1>Contact Us</h1>
                        <form onSubmit={onSubmitForm}>
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label htmlFor="firstName" style={isFirstName ? { color: '' } : { color: 'tomato' }}>{isFirstName ? 'First Name' : 'First Name is required'}</label>
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
                                        <label htmlFor="lastName" style={isLastName ? { color: '' } : { color: 'tomato' }}>{isLastName ? 'Last Name' : 'Last Name is required'}</label>
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
                                <label htmlFor="email" style={isEmail ? { color: '' } : { color: 'tomato' }}>{isEmail ? 'Email' : 'Email is not valid'}</label>
                                <input type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    onInput={handleInputField}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message" style={isMessage ? { color: '' } : { color: 'tomato' }}>{isMessage ? 'Message' : 'Your message is empty'}</label>
                                <textarea
                                    className="form-control"
                                    id="message"
                                    rows="5"
                                    name="message"
                                    onInput={handleInputField}
                                ></textarea>
                                <br />
                            </div>

                            <div className="mb-3" style={isFormValid ? { color: 'green' } : { color: '' }}>{isFormValid ? 'Message is successfully sent' : null}</div>

                            <input type="submit" className="btn btn-primary" value="Submit" />
                            {/* <button type="button" className="btn btn-primary">Submit</button> */}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ContactUs;