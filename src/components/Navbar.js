import { Link } from 'react-router-dom';
import './styles/Navbar.css';
function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-content">
        <Link to="/" className="nav-logo">
          Weather App
        </Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/settings" className="nav-link">Settings</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;