import React from 'react'
import "./footer.css"

function Footer() {
    return (
      <>
    <hr className="hr-footer" />
    <footer className="site-footer">
      <div>
        <div className="footer-div">
          <div className="footer-div1">
            <h6>Stay in the know</h6>
            <p>-subscribe to our latest news</p>
            <form action="" method="post">
              <div className="omrs-input-group">
                <label className="omrs-input-underlined">
                  <input required />
                  <span className="omrs-input-label">Email</span>
                  <span className="omrs-input-helper">user@email.com</span>
                </label>
                <button type="submit" className="btn effect01">
                  <span>Sign up</span>
                </button>
              </div>
            </form>
          </div>

          <div className="footer-div1">
            <h6>Customer service</h6>
            <ul className="footer-links">
              <li>
                <a href="/contact">Contact us</a>
              </li>
              <li>
                <a href="/shippingpol">Shipping</a>
              </li>
            </ul>
            <ul className="footer-links">
              <li>
                <a href="/faq">FAQ</a>
              </li>
              <li>
                <a href="/account">My account</a>
              </li>
            </ul>
          </div>

          <div className="footer-div1">
            <h6>Our story</h6>
            <ul className="footer-links">
              <li>
                <a href="/about">About us</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr />
      <div>
        <div>
          <div className="copyright-text">
            <p>
              Copyright &copy; 2021 All Rights Reserved by
              <a href="/about"> f v n r l</a>.
            </p>
          </div>
        </div>
      </div>
    </footer>
    </>
  );
}


export default Footer;
