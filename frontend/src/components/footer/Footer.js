import React from "react";
import { Link } from "react-router-dom";
import "./footer.scss";

const Footer = () => (
  <footer className="page-footer font-small">
    <div className="container text-center text-md-left footer-hr">
      <div className="row">
        <div className="col-xl-3 col-lg-4 col-md-6 mb-md-0 mb-3 text-left">
          <h5 className="text-uppercase">About</h5>
          <ul className="list-unstyled">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/shop">
                Shop
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-xl-3 col-lg-4 col-md-6 mb-md-0 mb-3">
          <h5 className="text-uppercase">Customer services</h5>
          <ul className="list-unstyled">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/shop">
                Shop
              </Link>
            </li>
          </ul>
        </div>

        <div className="col-xl-3 col-lg-4 col-md-6 mb-md-0 mb-3">
          <h5 className="text-uppercase">Links</h5>
          <ul className="list-unstyled">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/shop">
                Shop
              </Link>
            </li>
          </ul>
        </div>

        <div className="col-xl-3 col-lg-4 col-md-6 mb-md-0 mb-3">
          <h5 className="text-uppercase">Links</h5>
          <ul className="list-unstyled">
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/auth">
                Login/Register
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div className="footer-copyright text-center py-3 container">
      <div className="row">
        <div className="col-xl-6">
          <address>© 2017 All rights reserved. Design by Typostores</address>
        </div>
        <div className="col-xl-6">
          <div className="footer-icon">
            <h5>Connect with us:</h5>
            <div className="footer-icon-share">
              <Link className="nav-link" to="/">
                1
              </Link>
              <Link className="nav-link" to="/">
                2
              </Link>
              <Link className="nav-link" to="/">
                3
              </Link>
              <Link className="nav-link" to="/">
                4
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
