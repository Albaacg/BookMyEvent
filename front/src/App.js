import React, {useState} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.js";
import Favorites from "./pages/Favorites.js";
import Partidos from "./pages/Partidos.js";
import Locations from "./pages/Locations.js";
import Login from "./pages/Login";
import Register from "./pages/Register.js";
import Header from "./pages/Header.js";
import "./App.css";
import LocationDetails from "./pages/LocationDetails.js";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true)
    console.log("Authenticated", isAuthenticated)
  }
  return (
    <Router>
      <div className="App">

      {<Header />}               

        <Routes>
          {/* Ruta principal */}
          <Route path="/home" element={<Home />} />
          {/* Rutas de las otras páginas */}
          
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/partidos" element={<Partidos />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/location/:city" element={<LocationDetails />} />
            <Route path="/" element={<Login onLogin={handleLogin}/>} />
            <Route path="/register" element={<Register />} /> 


        </Routes>
      </div>
    </Router>
  );
}

export default App;

