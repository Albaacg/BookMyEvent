import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Lógica de autenticación (por ahora, solo navega a la página principal)
    if (form.email === "admin@example.com" && form.password === "password") {
      localStorage.setItem("isAuthenticated", true);
      navigate("/");
    } else {
      alert("Credenciales incorrectas");
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
        <button type="submit">Ingresar</button>
      </form>
      <p>
        ¿No tienes una cuenta?{" "}
        <span className="link" onClick={() => navigate("/register")}>
          Regístrate
        </span>
      </p>
    </div>
  );
}

export default Login;
