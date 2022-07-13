import React from "react";
import ContactForm from "../../components/contactForm/contactForm";
import HeaderProduct from "../../components/HeaderProduct/HeaderProduct";
import Map from "../../components/Map/Map";
import ContactInfo from "../../components/ContactInfo/ContactInfo";
import "./contact.scss";
function Contact() {
  return (
    <>
      <HeaderProduct
        productInfo={{
          imgUrl:
            "https://img.freepik.com/free-photo/contact-us_36325-2135.jpg?w=2000",
          title: "Contact",
        }}
      />

      <Map url="https://www.openstreetmap.org/export/embed.html?bbox=20.412769317626957%2C44.80418913062458%2C20.42693138122559%2C44.81090280205642&amp;layer=mapnik&amp;marker=44.80754606401696%2C20.41985034942627"></Map>
      <div className="section-padding"></div>
      <div className="container">
        <div className="row">
          <ContactForm />
          <ContactInfo />
        </div>
      </div>
      <div className="section-padding"></div>
    </>
  );
}

export default Contact;
