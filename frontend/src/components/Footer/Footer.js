import { useEffect, useState } from "react";
import shopService from "../../services/shopService";
import "./Footer.scss";
import {
  FaFacebookF,
  FaTwitter,
  FaGooglePlusG,
  FaLinkedinIn,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaMailBulk,
} from "react-icons/fa";
import {useSelector} from "react-redux";

function Footer() {
  const [ads, setAds] = useState({});
  const [finishedApi, setFinishedApi] = useState(false);
  const {user} = useSelector(state => state.userStore);

  useEffect(() => {
    shopService
      .getAds()
      .then((res) => {
        if (res.status === 200) setAds(res.data.splice(0, 6));
        setFinishedApi(true);
      })
      .catch((err) => console.log(err));
  }, []);

  const footerLayout = () => {
    return <div className="footer-wrapper">
      <section className="footer-title">
        <a href="/">
          <span>furn</span>
          <span>home</span>
        </a>
      </section>

      <section className="footer-links">
        <a href="/">
          <FaFacebookF />
        </a>
        <a href="/">
          <FaTwitter />
        </a>
        <a href="/">
          <FaGooglePlusG />
        </a>
        <a href="/">
          <FaLinkedinIn />
        </a>
      </section>

      <section className="footer-info container">
        <article>
          <h2>About The Store</h2>
          <ul>
            <li>
              <p>
                Songs that made the hit parade. Guys like us Those were the
                days. Wouldn't you it made. Those were the days. Wouldn't you
                like to get.
              </p>
            </li>
            <li>
              <FaPhoneAlt /> &nbsp; Call Us 08 523 456 78
            </li>
            <li>
              <a href="/">
                <FaMailBulk /> &nbsp; Info@ourdomain.Com
              </a>
            </li>
            <li>
              <FaMapMarkerAlt /> &nbsp; Melbourne, Australia.
            </li>
          </ul>
        </article>

        <article>
          <h2>Useful links</h2>
          <ul>
            <li>
              <a href="/"> About Us </a>
            </li>
            <li>
              <a href="/"> Our Products </a>
            </li>
            <li>
              <a href="/"> Customer Support </a>
            </li>
            <li>
              <a href="/"> Our Sitemap </a>
            </li>
            <li>
              <a href="/"> Contact Us </a>
            </li>
          </ul>
        </article>

        <article>
          <h2>Contact Us</h2>
          <ul>
            <li>
              <a href="/"> Product Recall </a>
            </li>
            <li>
              <a href="/"> Gift Vouchers </a>
            </li>
            <li>
              <a href="/"> Returns & Exchange </a>
            </li>
            <li>
              <a href="/"> Shipping Options </a>
            </li>
            <li>
              <a href="/"> Help & FAQs </a>
            </li>
          </ul>
        </article>

        <article>
          <h2>Contact Us</h2>

          {finishedApi ? (
              <div className="footer-image-holder">
                {ads.map((el) => {
                  return <img src={el.imgUrl} key={el._id} alt={el.title} />
                })}
              </div>
          ) : null}

        </article>
      </section>

      <section className="footer-nav-section"></section>
    </div>
  }

  return (
      <>
        {user.isAdmin === 'true' ? null : footerLayout()}
      </>

  );
}

export default Footer;
