function Header() {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 20px",
        backgroundColor: "#f8f9fa",
        borderBottom: "1px solid #ddd",
      }}
    >
      <p style= {{fontWeight: "bold"}}>REACT APP</p>

      <nav style={{ display: "flex", gap: "20px" }}>
        <a href="#" style={{ textDecoration: "none", color: "#333" }}>
          HOME
        </a>
        <a href="#" style={{ textDecoration: "none", color: "#333" }}>
          ABOUT
        </a>
        <a href="#" style={{ textDecoration: "none", color: "#333" }}>
          SERVICES
        </a>
        <a href="#" style={{ textDecoration: "none", color: "#333" }}>
          CONTACT
        </a>
      </nav>
    </header>
  );
}

export default Header;
