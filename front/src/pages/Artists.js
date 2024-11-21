import React, { useState } from "react";

function Artists() {
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
    </div>
  );
}

export default Artists;
