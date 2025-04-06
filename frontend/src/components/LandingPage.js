import React from 'react';
import './LandingPage.css';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="landing-container">
      <div className="overlay">
        <header className="landing-header">
          <h1 className="brand">ResearchChain</h1>
          <nav>
            <ul>
              <li><Link to="/upload">Upload</Link></li>
              <li><Link to="/list">Explore</Link></li>
            </ul>
          </nav>
        </header>

        <main className="landing-main">
          <h2 className="tagline">Revolutionize Research Ownership with Blockchain</h2>
          <p className="description">
            Upload, rent, or buy research papers with full transparency and security.
            Empowering researchers and academics with Web3 technology.
          </p>
          <div className="cta-buttons">
            <Link to="/upload" className="cta-btn primary">Get Started</Link>
            <Link to="/list" className="cta-btn secondary">Browse Papers</Link>
          </div>
        </main>

        <footer className="landing-footer">
          <p>&copy; {new Date().getFullYear()} ResearchChain. Built for the future of knowledge.</p>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
