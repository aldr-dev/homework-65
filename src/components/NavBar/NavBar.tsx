import React from 'react';
import {NavLink} from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  return (
    <header className="header">
      <div className="header-wrapper container">
        <NavLink to="/" className="logo-name">Static Pages</NavLink>
        <nav className="main-nav">
          <ul className="main-nav-list">
            <li className="main-nav-item">
              <NavLink to="/" className="main-nav-link">Home</NavLink>
            </li>
            <li className="main-nav-item">
              <NavLink to="/pages/about" className="main-nav-link">About</NavLink>
            </li>
            <li className="main-nav-item">
              <NavLink to="/pages/news" className="main-nav-link">News</NavLink>
            </li>
            <li className="main-nav-item">
              <NavLink to="/pages/events" className="main-nav-link">Events</NavLink>
            </li>
            <li className="main-nav-item">
              <NavLink to="/pages/faq" className="main-nav-link faq">faq</NavLink>
            </li>
            <li className="main-nav-item">
              <NavLink to="/pages/contacts" className="main-nav-link">Contacts</NavLink>
            </li>
            <li className="main-nav-item">
              <NavLink to="/pages/admin" className="main-nav-link">Admin</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;