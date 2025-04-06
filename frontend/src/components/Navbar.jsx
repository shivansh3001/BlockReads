import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Adjust the path if needed

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-title">ResearchChain</Link>
      </div>
      <nav className="navbar-nav">
        <ul className="navbar-links">
          <li><Link to="/upload">Upload</Link></li>
          <li><Link to="/list">Explore</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
