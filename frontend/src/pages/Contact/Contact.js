import React from 'react'
import ContactForm from '../../components/contactForm/contactForm'
import HeaderProduct from "../../components/HeaderProduct/HeaderProduct";

function Contact() {
    return (
        <>
            <HeaderProduct productInfo={{
                imgUrl: "https://img.freepik.com/free-photo/contact-us_36325-2135.jpg?w=2000",
                title: "Contact"
            }} />
            <ContactForm />
        </>

    )
}

export default Contact;
