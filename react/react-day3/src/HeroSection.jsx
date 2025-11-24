import "./HeroSection.css";

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="overlay">
        <div className="hero-content">
          <h1 className="hero-title">Discover Epic Movies & Series</h1>
          <p className="hero-desc">
            Dive into a world of adventure, drama, and fantasy — all in one place.
            Watch your favorite titles in high quality, anytime, anywhere.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary">▶ Watch Now</button>
            <button className="btn-outline">More Details</button>
          </div>
        </div>
      </div>
    </section>
  );
}
