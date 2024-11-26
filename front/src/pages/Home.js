import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="title">BookMyEvent</h1>
      <div className="button-container">
        <div
          className="menu-item"
          onClick={() => navigate("/artists")}
          title="Artistas"
        >
          <div className="icon music-icon"></div>
          <p>ARTISTAS</p>
        </div>
        <div
          className="menu-item"
          onClick={() => navigate("/locations")}
          title="Ubicaciones"
        >
          <div className="icon location-icon"></div>
          <p>UBICACIONES</p>
        </div>
        <div
          className="menu-item"
          onClick={() => navigate("/favorites")}
          title="Favoritos"
        >
          <div className="icon star-icon"></div>
          <p>FAVORITOS</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
