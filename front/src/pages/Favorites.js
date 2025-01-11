import React, { useEffect, useState } from "react";
import "../styles/Favorites.css";
import axios from "axios";
import PartidoCard from "./PartidoCard";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/favorite-events/all", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        console.log("Favoritos:", response.data);
        const eventPromise = [];
        for (const fav of response.data) {
          const promise = axios.get(`http://localhost:4000/eventos/id/${fav.eventID}`)
            .then(response => response.data)
          eventPromise.push(promise);
        }
        Promise.all(eventPromise)
          .then((events) => {
            console.log("Eventos favoritos:", events);
            setFavorites(events);

          })
          .catch((error) => {
            console.error("Error fetching favorites:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching favorites:", error);
      });
  }, []);



  return (
    <div className="partidos-page">
      <h1>Favoritos</h1>
      {favorites.length > 0 ? (
      <div className="partidos-container">
          {favorites.map((fav) => (
            <PartidoCard partido={fav} />
          ))}
</div>
      ) : (
        <p>No tienes eventos favoritos.</p>
      )}
    </div>
  );
}

export default Favorites;
