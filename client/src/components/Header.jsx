import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

function Header({ isMenuOpen, setIsMenuOpen }) {
  return (
    <>
      <button className="hamburger-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        ☰
      </button>

      {isMenuOpen && <div className="menu-overlay" onClick={() => setIsMenuOpen(false)}></div>}

      <aside className={`sidebar-nav ${isMenuOpen ? 'open' : ''}`}>
        <div className="brand-container">
          <div className="logo-icon">GC</div>
          <div className="brand-details">
            <span className="brand-name">GCCT</span>
            <span className="brand-sub">Fundraiser</span>
          </div>
        </div>

        <nav className="nav-menu" onClick={() => setIsMenuOpen(false)}>
          <NavLink to="/" className="nav-item">Home</NavLink>
          <NavLink to="/about" className="nav-item">About</NavLink>
          <NavLink to="/registration" className="nav-item">Registration</NavLink>
          <NavLink to="/contact" className="nav-item">Contact</NavLink>
        </nav>

        <div className="sidebar-footer">
          <NavLink to="/donate" className="cta-donate-btn">Donate</NavLink>
        </div>
      </aside>
    </>
  );
}

export default Header;