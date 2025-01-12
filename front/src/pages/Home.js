import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";


function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="title">BookMyEvent</h1>
      <div className="home-cards-container">
        <div
          className="home-card"
          onClick={() => navigate("/partidos")}
        >
          <div className="icon partidos-icon"></div>
          <p>PARTIDOS</p>
        </div>
        <div
          className="home-card"
          onClick={() => navigate("/locations")}
        >
          <div className="icon ubicaciones-icon"></div>
          <p>UBICACIONES</p>
        </div>
        <div
          className="home-card"
          onClick={() => navigate("/favorites")}
        >
          <div className="icon favoritos-icon"></div>
          <p>FAVORITOS</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
