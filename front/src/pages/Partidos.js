import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Partidos.css";
import axios from "axios";

function Partidos() {
  const navigate = useNavigate();
  const [partidos, setPartidos] = useState([]); // Initialize with an empty array

  // Fetch data from the microservice
  useEffect(() => {
    const fetchPartidos = async () => {
      try {
        const response = await axios.get("http://localhost:4000/eventos/all");
        console.log("Partidos response:", response.data);
        setPartidos(response.data); // Update state with the fetched data
      } catch (err) {
        console.log("Error fetching partidos:", err);
      }
    };

    fetchPartidos();
  }, []); // Empty dependency array to run on mount

  return (
    <div className="partidos-page">
      <h1>PARTIDOS</h1>
      <div className="partidos-container">
        {partidos.map((partido, index) => (
          <div className="partido-card" key={index}>
            <h2>{partido.name}</h2>
            <p><strong>Ubicación:</strong> {partido.city}</p>
            <p><strong>Día:</strong> {partido.date}</p>
            <p><strong>Hora:</strong> {partido.time}</p>
            <p><strong>Precio:</strong> {partido.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Partidos;
