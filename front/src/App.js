import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home.js";
import Favorites from "./pages/Favorites.js";
import Artists from "./pages/Artists.js";
import Locations from "./pages/Locations.js";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Función para manejar la autenticación exitosa
  const handleLogin = () => {
    setIsAuthenticated(true);
    console.log("AUTHENTICATED:",isAuthenticated);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Ruta principal */}
          <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/" />} />
          {/* Rutas de las otras páginas */}
          
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/artists" element={<Artists />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/" element={<Login onLogin={handleLogin}/>} />
            <Route path="/register" element={<Register />} /> 


        </Routes>
      </div>
    </Router>
  );
}

export default App;

