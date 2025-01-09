import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Register.css";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const response = await axios.post("http://localhost:8000/register", form, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("Respuesta del servidor:", response.data); // Asegúrate de que esto se imprime
      if (response.status === 200) {
        navigate('/')
      }
    } catch (error) {
      console.error("Error en el registro:", error);
    }
    
  };

  return (
    <div className="auth-container">
      <h1>Registro</h1>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          name="name"
          placeholder="Nombre Completo"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Correo Electrónico"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          required
        />
        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}

export default Register;
