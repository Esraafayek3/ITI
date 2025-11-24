import FurnitureCard from "./FurnitureCard";
import "./Furniture.css";

import CHAIR from "../assets/f1.png";
import Bed from "../assets/f2.png";
import CHAIR2 from "../assets/f3.png";
import TABLE from "../assets/f4.png";
import CHAIR3 from "../assets/f5.png";
import MIRRORTABLE from "../assets/f6.png";

export default function FurnitureSection() {
  const products = [
    {
      id: 1,
      name: "BROWN CHAIR DESIGN",
      price: "$100.00",
      image: CHAIR,
    },
    {
      id: 2,
      name: "HOUSE CHAIR DESIGN",
      price: "$200.00",
      image: Bed,
    },
    {
      id: 3,
      name: "BROWN TABLE DESIGN",
      price: "$100.00",
      image: CHAIR2,
    },
    {
      id: 4,
      name: "BLUE CHAIR DESIGN",
      price: "$200.00",
      image: TABLE,
    },
    {
      id: 5,
      name: "BROWN TABLE DESIGN",
      price: "$200.00",
      image: CHAIR3,
    },
    {
      id: 6,
      name: "MIRRORTABLE DESIGN",
      price: "$200.00",
      image: MIRRORTABLE,
    },
  ];

  return (
    <section className="furniture-section">
      <h2 className="section-title">OUR FURNITURE</h2>
      <p className="section-subtitle">
        which don’t look even slightly believable. If you are going to use a
        passage of Lorem Ipsum, you need to be sure there isn’t an.
      </p>

      <div className="furniture-grid">
        {products.map((item) => (
          <FurnitureCard key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
}
