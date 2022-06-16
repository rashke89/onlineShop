import React, {useState} from 'react';
import "./contact.scss";
import ContactService from "../../services/contactService";

function Contact() {
    const [contact, setContact] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',

    });
    const [isValidForm, setIsValidForm] = useState(true);

    const onHandleInput = e => {
        let newInput = contact;
        newInput[e.target.name] = e.target.value;
        setContact(newInput);
    }

    const onSubmitForm = e => {
        e.preventDefault();
        if (!contact.name || !contact.email || !contact.message || !contact.subject) {
            setIsValidForm(false);
            return
        }
         setIsValidForm(true);
        ContactService.sendContactForm(contact)
            .then(res => {
                if (res.status === 200)
                     console.log(res)
            })
            .catch(err=> console.log(err))
    }

    return (
        <div>
            <h2 className="text-center">Contact us</h2>
            <article className="row">
                <div className="col-md-5">
                    <h3 className="py-5 text-center">Kontakt</h3>
                    <ul>
                        <li><i className="fas fa-phone icons"><span>012-333-444</span></i></li>
                        <li><i className="fas fa-envelope icons"><span>foodflorist@gmail.com</span></i></li>
                        <li><i className="fas fa-map-marker-alt icons"><span>Some address 21, Belgrade</span></i>
                        </li>
                    </ul>
                </div>
                <div className="col-md-7">
                    <form onSubmit={onSubmitForm} method="post">
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" className="form-control" name="name" id="name" onInput={onHandleInput}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" name="email" id="email"
                                   onInput={onHandleInput}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="subject">Subject</label>
                            <input type="text" className="form-control" name="subject" id="subject"
                                   onInput={onHandleInput}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea cols="30" rows="10" className="form-control" name="message" id="message"
                                      onInput={onHandleInput}></textarea>
                        </div>
                        <button className="btn btn-primary  text-center">Contact us</button>
                        {!isValidForm ? <p>All fields is required!</p> : null}
                    </form>
                </div>
            </article>
            {/*<article className="map my-5">*/}
            {/*    <div className="col-md-12 px-0">*/}
            {/*        <iframe*/}
            {/*            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2229.400933150671!2d12.726258515643647!3d56.02904657812011!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46523306476b6eb7%3A0xe7a798cc0a547fcf!2sLuggudegatan%202A%2C%20256%2059%20Helsingborg!5e0!3m2!1ssv!2sse!4v1634240809032!5m2!1ssv!2sse"></iframe>*/}
            {/*    </div>*/}
            {/*</article>*/}
        </div>
    );
}

export default Contact;