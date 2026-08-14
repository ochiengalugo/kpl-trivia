import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="app-navbar">
      <div className="nav-brand">
        <h2><span>KENYA PREMIER LEAGUE</span> QUIZ</h2>
      </div>
      <div className="nav-links">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink>
        <NavLink to="/arena" className={({ isActive }) => (isActive ? 'active' : '')}>Arena</NavLink>
        <NavLink to="/leaderboard" className={({ isActive }) => (isActive ? 'active' : '')}>Leaderboard</NavLink>
      </div>
    </nav>
  );
}