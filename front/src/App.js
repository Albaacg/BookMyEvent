import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home.js";
import Favorites from "./pages/Favorites.js";
import Artists from "./pages/Artists";
import Locations from "./pages/Locations.js";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Ruta principal */}
          <Route path="/home" element={<Home />} />
          {/* Rutas de las otras páginas */}
          
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/artists" element={<Artists />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} /> 


        </Routes>
      </div>
    </Router>
  );
}

export default App;

