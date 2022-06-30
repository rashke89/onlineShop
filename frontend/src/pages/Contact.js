import React from "react"
import Navigation from "../components/navigation/Navigation";
import ContactForm from "../components/contactForm/contactForm";

const Contact=()=>{

    return (
        <>
       <Navigation/>
            <div className="container contact-page-wrapper">
             <ContactForm/>

            </div>
        </>
    )
}

export default Contact;