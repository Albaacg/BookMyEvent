import React, { useState, useEffect } from "react";
import "../styles/Partidos.css";
import axios from "axios";
import PartidoCard from "./PartidoCard";

function Partidos() {
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
          <PartidoCard partido={partido}/>
        ))}
      </div>
    </div>
  );
}

export default Partidos;
