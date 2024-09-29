import React, { useState } from 'react';
import Search from './Search';
import './Header.css';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="header">
      <div className="nav-container">
        {/* Hamburger Menu Icon for Mobile */}
        <div className="hamburger" onClick={toggleMobileMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        {/* Navigation Links */}
        <nav className={`nav ${isMobileMenuOpen ? 'nav-open' : ''}`}>
          <ul className="nav-list">
            <li><NavLink to="/" style={{textDecoration:"none", color:"white"}}>Home</NavLink></li>
            <li><NavLink to="/form" style={{textDecoration:"none", color:"white"}}>Form</NavLink></li>
            <li><NavLink to="/show" style={{textDecoration:"none", color:"white"}}>Show</NavLink></li>
          </ul>
        </nav>

      </div>
    </header>
  );
};

export default Header;
