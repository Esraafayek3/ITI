import "./Header.css";

export default function Header() {
  return (
    <header className="movie-header">
      <div className="container">
        <div className="left">
          <div className="logo">movies</div>
        </div>

        <nav className="nav">
          <ul className="nav-list">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Movies</a>
            </li>
            <li>
              <a href="#">Series</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
