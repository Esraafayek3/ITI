import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faTwitter,
  faLinkedinIn,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import "./Footer.css";

import f1 from "../assets/f1.png";
import f2 from "../assets/f2.png";
import f3 from "../assets/f3.png";
import f4 from "../assets/f4.png";
import f5 from "../assets/f5.png";
import f6 from "../assets/f6.png";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-contact">
          <p>
            <FontAwesomeIcon icon={faPhone} /> Call: +01 12345678990
          </p>
          <p>
            <FontAwesomeIcon icon={faEnvelope} /> Email: demo@gmail.com
          </p>
          <p>
            <FontAwesomeIcon icon={faLocationDot} /> Location
          </p>
        </div>

        <div className="containe">
          <div className="footer-links">
            <h3>QUICK LINKS</h3>
            <ul>
              <li>Home</li>
              <li>Furniture</li>
              <li>Contact Us</li>
              <li>About</li>
              <li>Blog</li>
            </ul>
          </div>

          <div className="footer-gallery">
            <h3>INSTAGRAM FEEDS</h3>
            <div className="gallery">
              {[f1, f2, f3, f4, f5, f6].map((img, i) => (
                <img key={i} src={img} alt={`feed-${i}`} />
              ))}
            </div>
          </div>

          <div className="footer-newsletter">
            <h3>SIGN UP TO OUR NEWSLETTER</h3>
            <div className="newsletter-box">
              <input type="email" placeholder="Enter Your Email" />
              <button>Subscribe</button>
            </div>
            <div className="social-icons">
              <FontAwesomeIcon icon={faFacebookF} />
              <FontAwesomeIcon icon={faTwitter} />
              <FontAwesomeIcon icon={faLinkedinIn} />
              <FontAwesomeIcon icon={faInstagram} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
