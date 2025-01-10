import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" }); // Estado para los datos del formulario
  const [error, setError] = useState(""); // Estado para manejar errores
  const [success, setSuccess] = useState(""); // Estado para manejar éxito
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Limpia los errores previos
  
    console.log("Iniciando sesión con:", form);

    try {
      const response = await axios.post("http://localhost:8000/login", {
        name: "",
        email: form.email,
        password: form.password,
      });
  
      // Si el login es exitoso
      setSuccess(response.data.message); // Guardar el mensaje de éxito
      console.log("Login exitoso:", response.data);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token); // Guardar el token en el localStorage
        console.log("Token guardado:", response.data.token);
        // Redirigir al usuario a la página de inicio
        navigate("/home");
      }
    } catch (err) {
      console.error("Error en el login:", err);
  
      // Extraer el mensaje de error como texto
      const errorMessage =
        err.response?.data?.detail || "Error en el inicio de sesión.";
      setError(errorMessage);
    }
  };

  return (
    <div className="auth-container">
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleLogin}>
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
        {/* Muestra el mensaje de error si existe */}
        {error && <p className="error-message">{error}</p>}
        {/* Muestra el mensaje de éxito si existe */}
        {success && <p className="success-message">{success}</p>}
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default Login;
