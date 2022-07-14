import React from "react";
import "./contact_info.scss";
import {   
    FaMailBulk,
    FaMapMarkerAlt,
    FaMobileAlt,
    FaInfoCircle
        
} from "react-icons/fa";
const ContactInfo = () => {
  return (
    <div className="col-md-6 col-sm-6 col-xs-6 contact-detail">
      <div className="section-header">
        <h3>Contact Information</h3>
        <p>
          A man is born he's a man of means. Then along come two they got
          nothin' but their jeans. They were four men living all together yet
          they were all alone. Come and play. Everything's. Friendly neighbors
          there that's where we meet.
        </p>
        <p>
          The first mate and his Skipper too will do their very best to make the
          others comfortable in their tropic island nest. Sunny Days sweepin'
          the clouds away.
        </p>
      </div>
      <div className="row">
        <div className="col-md-6 col-sm-6 col-xs-6 contact-content">
          <div className="contact-info">
            <span className="icon"><FaMapMarkerAlt/></span>
            <p>09 Downtown, Store Main St,Victoria, Australia</p>
          </div>
        </div>
        <div className="col-md-6 col-sm-6 col-xs-6 contact-content">
          <div className="contact-info">
            <span className="icon"><FaMailBulk/></span>
            <p>
              <a href="mailto:info@ourdomain.com" title="Info@ourdomain.com">
                Info@ourdomain.com
              </a>
            </p>
            <p>
              <a href="mailto:xyz@ourdomain.com" title="Support@ourdomain.com">
                Support@ourdomain.com
              </a>
            </p>
          </div>
        </div>
        <div className="col-md-6 col-sm-6 col-xs-6 contact-content">
          <div className="contact-info">
            <span className="icon"><FaInfoCircle/></span>
            <p>09 Downtown, Store Main St,Victoria, Australia</p>
          </div>
        </div>
        <div className="col-md-6 col-sm-6 col-xs-6 contact-content">
          <div className="contact-info">
            <span className="icon"><FaMobileAlt/></span>
            <p>Free standard shipping on all orders</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
