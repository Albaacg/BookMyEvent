import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Locations.css";
import axios from "axios";

// Import dinámico de imágenes
function importAll(r) {
  let images = {};
  r.keys().forEach((key) => (images[key.replace("./", "")] = r(key)));
  return images;
}

const images = importAll(require.context("../imagenes", false, /\.(png|jpe?g|svg)$/));

function Locations() {
  const [locations, setLocations] = useState([]);
  const navigate = useNavigate(); // Para redirigir al usuario

  // Fetch data from el microservicio
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get("http://localhost:4000/eventos/all");
        console.log("Locations response:", response.data);
        setLocations(response.data);
      } catch (err) {
        console.log("Error fetching locations:", err);
      }
    };

    fetchLocations();
  }, []);

  // Obtener la ruta de la imagen para cada ciudad
  const getImagePath = (city) => {
    const formattedCity = `${city.toLowerCase().replace(/\s+/g, "")}.jpg`;
    return images[formattedCity] || null; // Retorna null si no se encuentra la imagen
  };

  // Navegar al detalle de la ciudad
  const handleLocationClick = (city) => {
    navigate(`/location/${city}`);
  };

  return (
    <div className="locations-page">
      <h1>Ubicaciones</h1>
      <ul>
        {locations
          .filter(
            (location, index, self) =>
              index === self.findIndex((l) => l.city === location.city)
          )
          .map((location) => {
            const imagePath = getImagePath(location.city);
            return (
              <li
                key={location.id}
                onClick={() => handleLocationClick(location.city)}
              >
                <strong>{location.city}</strong> {/* Nombre de la ciudad encima de la imagen */}
                {imagePath && (
                  <img
                    src={imagePath}
                    alt={`Imagen de ${location.city}`}
                  />
                )}
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default Locations;
