function HeroSection() {
  const cardStyle = {
    width: "300px",
    height: "200px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    position: "relative",
  };

  const imageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  };

  return (
    <section
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        gap: "20px",
        padding: "40px",
        backgroundColor: "#f5f5f5",
      }}
    >
      <div style={cardStyle}>
        <img src="/shuffle-03.jpg" alt="Card 1" style={imageStyle} />
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            left: "10px",
            color: "black",
            padding: "5px 10px",
            borderRadius: "5px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "50px",
          }}
        >
          <h3 style={{ margin: "0", fontSize: "16px ", color: "#000455" }}>
            Card One
          </h3>
          <a
            href="#"
            style={{
              color: "#000455",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            READ MORE
          </a>
        </div>
      </div>

      <div style={cardStyle}>
        <img src="/shuffle-04.jpg" alt="Card 2" style={imageStyle} />
      </div>
    </section>
  );
}

export default HeroSection;
