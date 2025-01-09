import React from "react";
import "../styles/Header.css";

const Header = () => {
  const currentPath = window.location.pathname;

  // Oculta el header en login y register
  if (["/", "/register"].includes(currentPath)) {
    return null;
  }

  return (
    <header className="header">
      <div className="header-container">
        <h1 className="logo">MiSitio</h1>
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item">
              <a href="/home">Home</a>
            </li>
            <li className="nav-item">
              <a href="/partidos">Partidos</a>
            </li>
            <li className="nav-item">
              <a href="/locations">Ubicaciones</a>
            </li>
            <li className="nav-item">
              <a href="/favorites">Favoritos</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
