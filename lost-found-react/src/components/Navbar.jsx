import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const location = useLocation();

  return (
    <header className="navbar-wrapper">
      <div className="navbar">
        <h1 className="logo">Lost & Found Portal</h1>

        <nav>
          <ul>
            <li><Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link></li>
            <li><Link to="/search" className={location.pathname === "/search" ? "active" : ""}>Search</Link></li>
            <li><Link to="/lost-items" className={location.pathname === "/lost-items" ? "active" : ""}>Lost Item</Link></li>
            <li><Link to="/found-items" className={location.pathname === "/found-items" ? "active" : ""}>Found Item</Link></li>
            <li><Link to="/login" className={location.pathname === "/login" ? "active" : ""}>Login</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
