function Card() {
  const cardStyle = {
    width: "250px",
    height: "200px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "20px",
    textAlign: "center",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    backgroundColor: "white",
  };

  const buttonStyle = {
    marginTop: "15px",
    padding: "8px 16px",
    backgroundColor: "#151738ff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  return (
    
      <div style={cardStyle}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
          eligendi laboriosam dolorum repellat sit sequi aliquid recusandae vel
          ut, sint esse ipsa, distinctio hic. Error voluptas ducimus omnis
          voluptates cum!
        </p>
        <button style={buttonStyle}>MORE</button>
      </div>

  );
}

export default Card;
