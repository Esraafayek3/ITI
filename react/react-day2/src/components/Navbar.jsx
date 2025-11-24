import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSearch } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">NEWHOME</div>

      <ul className="nav-links">
        <li>
          <a href="#">HOME</a>
        </li>
        <li>
          <a href="#">ABOUT</a>
        </li>
        <li>
          <a href="#">FURNITURES</a>
        </li>
        <li>
          <a href="#">BLOG</a>
        </li>
        <li>
          <a href="#">CONTACT US</a>
        </li>
      </ul>

      <div className="nav-icons">
        <a href="#">
          LOGIN <FontAwesomeIcon icon={faUser} />
        </a>
        <a href="#">
          <FontAwesomeIcon icon={faSearch} />
        </a>
      </div>
    </nav>
  );
}
