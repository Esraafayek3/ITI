import "./HeroSection2.css";
import heroImage from "../assets/about-img.png";

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-image">
        <img src={heroImage} alt="Furniture" />
      </div>
      <div className="hero-content">
        <h1 className="about">ABOUT US</h1>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio,
          debitis expedita. Numquam iure vel ex? Beatae eaque deserunt incidunt
          consequuntur aspernatur facere doloremque, nam sunt est placeat eum ut
          temporibus?
        </p>
        <div className="hero-buttons">
          <button className="btn btn-blue">Read More</button>
        </div>
      </div>
    </section>
  );
}
