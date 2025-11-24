import "./HeroSection.css";
import heroImage from "../assets/about-img.png";

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>
          FOR ALL YOUR <br /> FURNITURE NEEDS
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus quidem
          maiores perspiciatis, illo maxime voluptatem a itaque suscipit.
        </p>
        <div className="hero-buttons">
          <button className="btn btn-orange">Contact Us</button>
          <button className="btn btn-blue">About Us</button>
        </div>
      </div>
      <div className="hero-image">
        <img src={heroImage} alt="Furniture" />
      </div>
    </section>
  );
}
