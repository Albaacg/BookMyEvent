import React, { useState } from "react";
import "../styles/Favorites.css"; 

function Favorites() {
  const [favorites] = useState([
    { id: 1, name: "Concierto de Rock", date: "2024-12-01" },
    { id: 2, name: "Festival de Cine", date: "2024-12-05" },
  ]);

  return (
    <div className="favorites-page">
      <h1>Favoritos</h1>
      {favorites.length > 0 ? (
        <ul>
          {favorites.map((fav) => (
            <li key={fav.id}>
              {fav.name} - {new Date(fav.date).toLocaleDateString()}
            </li>
          ))}
        </ul>
      ) : (
        <p>No tienes eventos favoritos.</p>
      )}
    </div>
  );
}

export default Favorites;
