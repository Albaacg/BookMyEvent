import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Artists.css";


function Artists() {
  const navigate = useNavigate();
  const [artists] = useState([
    "Artista 1",
    "Artista 2",
    "Artista 3",
    "Artista 4",
  ]);

  return (
    <div className="artists-page">
      <h1>Artistas</h1>
      <ul>
        {artists.map((artist, index) => (
          <li key={index}>{artist}</li>
        ))}
      </ul>
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

export default Artists;
