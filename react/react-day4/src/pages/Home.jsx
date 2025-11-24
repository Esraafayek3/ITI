export default function Home() {
  return (
    <section className="hero">
      <div className="container hero-inner">
        <div className="hero-text">
          <h1>Fresh Flowers for Every Moment</h1>
          <p>
            Bring beauty, joy, and fragrance to your life with our hand-picked
            flower collections. Perfect for every occasion 💐
          </p>
          <div className="hero-cta">
            <a href="/shop" className="btn btn-primary">
              Shop Now
            </a>
            <a href="/about" className="btn btn-outline">
              Learn More
            </a>
          </div>
        </div>

        <div className="hero-media">
          <img
            src="https://th.bing.com/th/id/OIP.otQvr1eNRqtfo3x1tcFzmgHaHa?w=195&h=195&c=7&r=0&o=7&dpr=2&pid=1.7&rm=3"
            alt="flower bouquet"
            className="hero-img"
          />
        </div>
      </div>
    </section>
  );
}
