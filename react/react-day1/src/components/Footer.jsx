function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#dddd",
        color: "#151738ff",
        textAlign: "center",
        padding: "20px 10px",
        marginTop: "40px",
      }}
    >
      <p style={{ margin: "0", fontSize: "14px", fontWeight: "bold" }}>
        ALL RIGHT REVERSED
      </p>

      <div style={{ marginTop: "10px" }}>
        <a
          href="#"
          style={{
            color: "#151738ff",
            margin: "0 10px",
            textDecoration: "none",
          }}
        >
          HOME
        </a>
        <a
          href="#"
          style={{
            color: "#151738ff",
            margin: "0 10px",
            textDecoration: "none",
          }}
        >
          ABOUT
        </a>
        <a
          href="#"
          style={{
            color: "#151738ff",
            margin: "0 10px",
            textDecoration: "none",
          }}
        >
          SERVICES
        </a>
        <a
          href="#"
          style={{
            color: "#151738ff",
            margin: "0 10px",
            textDecoration: "none",
          }}
        >
          CONTACT
        </a>
      </div>
    </footer>
  );
}

export default Footer;
