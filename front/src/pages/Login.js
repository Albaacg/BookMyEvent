import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useToken } from '../tokenContext';
import "../styles/Login.css";

const Login=({onLogin}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setAuthToken } = useToken();

  const login = async () => {
    try {
        const params = new URLSearchParams();
        params.append('username', email);
        params.append('password', password);

        console.log('Datos de autenticación enviados:', email, password);
        const response = await axios.post('/api/auth/token', params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        console.log('response.status:', response.status);
        console.log('TOKEN:', response.data.access_token);
        if (response.status === 200) {
            setAuthToken(response.data.access_token);
            localStorage.setItem('token', response.data.access_token);
            onLogin();
            navigate('/home');
            console.log('INICIO DE SESIÓN EXITOSO', response.data);
            setError('');
        }
    } catch (error) {
        console.error('Error de inicio de sesión:', error);
        if (error.response && error.response.status === 401) {
            setError('Usuario o contraseña incorrectos. Intentelo de nuevo.');
        } else {
            setError('Ocurrió un problema con el inicio de sesión. Intentelo de nuevo.');
        }
    }
};


  return (
    <div className="auth-container">
      <h1>Iniciar Sesión</h1>
        <input
          type="email"
          name="email"
          placeholder="Correo Electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Ingresar</button>

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
