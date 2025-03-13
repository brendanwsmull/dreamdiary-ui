import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header-container">
      <h1 className="header-title">Dream Notbook</h1>
      <nav className="header-nav">
        <ul>
          <li>
            <NavLink to="/dreams/dreams" className={({ isActive }) => isActive ? 'active' : ''}>
              Your Dreams
            </NavLink>
          </li>
          <li>
            <NavLink to="/dreams/newDream" className={({ isActive }) => isActive ? 'active' : ''}>
              Create Dream
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
