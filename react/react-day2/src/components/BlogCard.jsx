

export default function BlogCard({ image, title, text }) {
  return (
    <div className="blog-card">
      <img src={image} alt={title} className="blog-image" />
      <div className="blog-content">
        <h3>{title}</h3>
        <p>{text}</p>
        <button className="read-more">Read More</button>
      </div>
    </div>
  );
}
