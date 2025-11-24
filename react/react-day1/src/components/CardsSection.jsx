
import Card from "./Card";

 function CardsSection() {
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
    padding: "40px",
    backgroundColor: "#f5f5f5",
  };


  return (
    <section style={containerStyle}>
      <Card />
      <Card  />
      <Card  />
    </section>
  );
}
export default CardsSection;    