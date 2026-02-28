import { BsTelegram } from "react-icons/bs";
import "./Footer.css";
import { GoPaperAirplane } from "react-icons/go";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container footer-wrap">
        <nav className="nav-wrap">
          <ul>
            <h2>Exclusive</h2>
            <li>Subscribe</li>
            <li>Get 10% off your first order</li>
            <li className="inp-wrap">
              <input
                className="inp-send"
                type="text"
                placeholder="Enter your email"
              />
              <span>
                <GoPaperAirplane />
              </span>
            </li>
          </ul>
          <ul>
            <h2>Support</h2>
            <li>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</li>
            <li>exclusive@gmail.com</li>
            <li>+88015-88888-9999</li>
          </ul>
          <ul>
            <h2>Account</h2>
            <li>My Account</li>
            <li>Login / Register</li>
            <li>Cart</li>
            <li>Wishlist</li>
            <li>Shop</li>
          </ul>
          <ul>
            <h2>Quick Link</h2>
            <li>Privacy Policy</li>
            <li>Terms Of Use</li>
            <li>FAQ</li>
            <li>Contact</li>
          </ul>
        </nav>
      </div>

      <h3>Copyright Rimel 2022. All right reserved</h3>
    </footer>
  );
};

export default Footer;
