import React from "react";
import { Link } from "react-router-dom";
import footerStyle from "./footer.scss";

const Footer = () => (
  <footer className="page-footer font-small">
    <div className="container-fluid text-center text-md-left">
      <div className="row">
        <div className="col-md-6 mt-md-0 mt-3">
          <h5 className="text-uppercase">Footer Content</h5>
          <p>
            Here you can use rows and columns to organize your footer content.
          </p>
        </div>

        <hr className="clearfix w-100 d-md-none pb-0" />

        <div className="col-md-3 mb-md-0 mb-3">
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

        <div className="col-md-3 mb-md-0 mb-3">
          <h5 className="text-uppercase">Links</h5>
          <ul className="list-unstyled">
            <li>
              <a href="#!">Link 1</a>
            </li>
            <li>
              <a href="#!">Link 2</a>
            </li>
            <li>
              <a href="#!">Link 3</a>
            </li>
            <li>
              <a href="#!">Link 4</a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div className="footer-copyright text-center py-3">
      © 2020 Copyright:
      <a href="https://mdbootstrap.com/"> MDBootstrap.com</a>
    </div>
  </footer>
);

export default Footer;
