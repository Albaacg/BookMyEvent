import React, { useState } from "react";

function Locations() {
  const [locations] = useState([
    "Ciudad 1",
    "Ciudad 2",
    "Ciudad 3",
    "Ciudad 4",
  ]);

  return (
    <div className="locations-page">
      <h1>Ubicaciones</h1>
      <ul>
        {locations.map((location, index) => (
          <li key={index}>{location}</li>
        ))}
      </ul>
    </div>
  );
}

export default Locations;
