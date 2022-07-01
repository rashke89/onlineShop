import './Footer.scss'

function Footer() {
  return (
    <div className='footer-wrapper'>
      <article>
        <h1>About</h1>
        <ul>   
            <li>News & Stories</li>
            <li>History</li>
            <li>Our Studio</li>
            <li>Showrooms</li>
            <li>saStockistsd</li>
        </ul>
      </article>

      <article>
        <h1>customer services</h1>
        <ul>
            <li>Contact Us</li>
            <li>Trade Services</li>
            <li>Login/Register</li>
            <li>Delivery & Returns</li>
            <li>FAQs</li>

        </ul>
      </article>

      <article>
        <h1>furniture</h1>
        <ul>
            <li>Tables</li>
            <li>Chairs</li>
            <li>Storage</li>
        </ul>
      </article>

      <article>
        <h1>accessories</h1>
        <ul>
            <li>Candles & Fragrance</li>
            <li>Stationery</li>
            <li>Kitchen & Dining</li>
            <li>Textiles</li>
            <li>Gifl Sets</li>

        </ul>
      </article>
    </div>
  );
}

export default Footer;
