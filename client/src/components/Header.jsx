import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <aside className="sidebar-nav">
      {/* Platform Branding */}
      <div className="brand-container">
        <div className="logo-icon">GC</div>
        <div className="brand-details">
          <span className="brand-name">GCCT</span>
          <span className="brand-sub">Fundraiser</span>
        </div>
      </div>

      {/* Modern Navigation Menu */}
      <nav className="nav-menu">
        <NavLink to="/" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <span className="nav-dot"></span> Home
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <span className="nav-dot"></span> About
        </NavLink>
        <NavLink to="/registration" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <span className="nav-dot"></span> Registration
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <span className="nav-dot"></span> Contact
        </NavLink>
      </nav>

      {/* Prominent Sidebar Call to Action */}
      <div className="sidebar-footer">
        <NavLink to="/donate" className="cta-donate-btn">
          Donate
        </NavLink>
        <p className="footer-meta">© 2026 gcctfundraiser.org</p>
      </div>
    </aside>
  );
}

export default Header;