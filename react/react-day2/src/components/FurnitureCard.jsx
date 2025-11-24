import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

export default function FurnitureCard({ image, name, price }) {
  return (
    <div className="furniture-card">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <div className="contain">
        <p className="price">{price}</p>
        <button className="buy-btn">
          <FontAwesomeIcon icon={faCartShopping} /> BUY NOW
        </button>
      </div>
    </div>
  );
}
