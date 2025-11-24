export default function Card({ item }) {
  return (
    <div className="media-card">
      <h3>{item.title}</h3>
      <p>Type: {item.type}</p>
      <p>Year: {item.year}</p>
      <p>Genre: {item.genre}</p>
      <p>⭐ Rating: {item.rating}</p>
    </div>
  );
}
