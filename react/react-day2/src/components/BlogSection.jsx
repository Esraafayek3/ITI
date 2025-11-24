import BlogCard from "./BlogCard";
import "./BlogSection.css";
import blog1 from "../assets/b1.jpg";
import blog2 from "../assets/b2.jpg";
import blog3 from "../assets/b3.jpg";

export default function BlogSection() {
  const blogs = [
    {
      id: 1,
      title: "Look even slightly believable. If you are",
      text: "Alteration in some form, by injected humour, or randomised words which don’t look even slightly believable.",
      image: blog1,
    },
    {
      id: 2,
      title: "Anything embarrassing hidden in the middle",
      text: "Alteration in some form, by injected humour, or randomised words which don’t look even slightly believable.",
      image: blog2,
    },
    {
      id: 3,
      title: "Molestias magni natus dolores odio commodi",
      text: "Alteration in some form, by injected humour, or randomised words which don’t look even slightly believable.",
      image: blog3,
    },
  ];

  return (
    <section className="blog-section">
      <h2 className="section-title">LATEST BLOG</h2>
      <div className="blog-grid">
        {blogs.map((item) => (
          <BlogCard key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
}
