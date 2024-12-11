import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/iniciosesion.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const users = [
    { username: 'Felipe', password: '031006' },
    { username: 'Anderson', password: '302006' },
    { username: 'Camila', password: 'password123' }
  ];

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

    if (username.trim() === '' || password.trim() === '') {
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Por favor ingresa un nombre de usuario y una contraseña.',
      });
      setLoading(false);
      return;
    }

    const userExists = users.find((user) => user.username === username);

    if (!userExists) {
      Swal.fire({
        icon: 'error',
        title: 'Usuario no registrado',
        text: 'Este nombre de usuario no está registrado. Por favor, crea una cuenta.',
      });
      setLoading(false);
      return;
    }

    if (userExists.password !== password) {
      Swal.fire({
        icon: 'error',
        title: 'Credenciales incorrectas',
        text: 'El nombre de usuario o la contraseña son incorrectos. Intenta nuevamente.',
      });
      setLoading(false);
      return;
    }

    setLoading(false);
    Swal.fire({
      icon: 'success',
      title: 'Inicio de sesión exitoso',
      text: 'Bienvenido, has iniciado sesión correctamente.',
    }).then(() => {
      navigate('/inicio');
    });
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
            <Link to="/registro">Crear una cuenta</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;