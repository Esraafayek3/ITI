export default function Contact() {
  return (
    <section className="section container">
      <h2>Contact Us</h2>
      <p>We’d love to hear from you! Send us your message below.</p>
      <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
        <input type="text" placeholder="Your Name" required />
        <input type="email" placeholder="Your Email" required />
        <textarea placeholder="Your Message" rows="5" required></textarea>
        <button type="submit" className="btn btn-primary">
          Send
        </button>
      </form>
    </section>
  );
}
