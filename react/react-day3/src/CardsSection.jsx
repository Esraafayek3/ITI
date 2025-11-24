import Card from "./Card";

export default function CardsSection({ filteredList }) {
  return (
    <div className="media-grid">
      {filteredList.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  );
}
