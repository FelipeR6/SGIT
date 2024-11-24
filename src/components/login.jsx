import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/iniciosesion.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const togglePasswordVisibility = () => {
    const passwordField = document.getElementById('password');
    const button = document.getElementById('togglePassword');
    if (passwordField.type === 'password') {
      passwordField.type = 'text';
      button.textContent = 'Ocultar';
    } else {
      passwordField.type = 'password';
      button.textContent = 'Mostrar';
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    
    setTimeout(() => {
      if (username === 'Felipe' && password === '031006') {
        setLoading(false);
        alert('Inicio de sesión exitoso');
        navigate('/inicio');
      } else {
        setLoading(false);
        setError('Credenciales incorrectas. Inténtalo de nuevo.');
      }
    }, 1000);
  };

  return (
    <div className="card" style={{ width: '500px' }}>
      <div className="card-header">
        Iniciar Sesión
      </div>
      <div className="card-body">
        <form id="loginForm" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Nombre de Usuario</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              required
            />
          </div>
          <div className="mb-3 position-relative">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <button
              type="button"
              className="btn-show-password"
              id="togglePassword"
              onClick={togglePasswordVisibility}
            >
              Mostrar
            </button>
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-custom">
              {loading ? 'Cargando...' : 'Iniciar Sesión'}
            </button>
          </div>
          <div className="options">
            <a href="#">¿Olvidaste tu contraseña?</a><br />
            <a href="/registro">Crear una cuenta</a>
          </div>
          {error && <div className="error" id="error-message">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default Login;
