import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/LocationDetails.css";

// Importar imágenes dinámicamente
function importAll(r) {
  let images = {};
  r.keys().forEach((key) => (images[key.replace("./", "")] = r(key)));
  return images;
}

const cityImages = importAll(require.context("../imagenes", false, /\.(png|jpe?g|svg)$/));

function LocationDetails() {
  const { city } = useParams(); // Obtiene el parámetro 'city' de la URL
  const [matches, setMatches] = useState([]); // Estado para almacenar los partidos
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/eventos/city/${city}`); // Llamada a la API
        console.log("API Response:", response.data); // Debug: Verifica los datos recibidos
        setMatches(response.data); // Actualiza el estado con los datos de los partidos
      } catch (err) {
        console.error("Error fetching matches:", err);
        setError("No se pudo obtener la información del evento.");
      }
    };

    fetchMatches();
  }, [city]); // Vuelve a ejecutar el efecto cuando cambia la ciudad

  // Obtener la ruta de la imagen para la ciudad
  const getCityImage = (cityName) => {
    const formattedCity = `${cityName.toLowerCase().replace(/\s+/g, "")}.jpg`;
    console.log("Buscando imagen:", formattedCity); // Log para depuración
    return cityImages[formattedCity] || null; // Retorna null si no hay imagen
  };

  // Mostrar mensaje de error si algo sale mal
  if (error) {
    return <p className="error-message">{error}</p>;
  }

  // Mostrar mensaje de carga mientras se obtienen los datos
  if (matches.length === 0) {
    return <p className="loading-message">Cargando eventos...</p>;
  }

  // Renderizar los detalles de todos los partidos
  return (
    <div className="location-details">
      <h1>Partidos en {city}</h1>

      {/* Mostrar la imagen de la ciudad */}
      <div className="city-image">
        {getCityImage(city) ? (
          <img src={getCityImage(city)} alt={`Imagen de ${city}`} />
        ) : (
          <p className="no-image">No hay imagen disponible para esta ciudad.</p>
        )}
      </div>

      {/* Contenedores de partidos */}
      <div className="matches-container">
        {matches.map((match) => (
          <div className="match-card" key={match.id}>
            <h2>{match.name}</h2> {/* Mostrar el nombre completo del partido */}
            <p><strong>Ubicación:</strong> {match.city}</p>
            <p><strong>Día:</strong> {match.date}</p>
            <p><strong>Hora:</strong> {match.time}</p>
            <p><strong>Precio:</strong> {match.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LocationDetails;
