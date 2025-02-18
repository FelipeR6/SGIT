import React, { useState, useEffect } from 'react';
import '../css/mantenimiento.css';
import logo from '../imagenes/logo.png';

const Mantenimiento = () => {
  const [historial, setHistorial] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener datos del historial de mantenimiento
  useEffect(() => {
    fetch('http://localhost/SGIT.v6/api/mantenimiento.php') // Cambia la URL si es necesario
      .then(response => response.json())
      .then(data => {
        setHistorial(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Error al cargar los datos');
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <header>
        <div className="header-container">
          <div className="logo">
            <img src={logo} alt="Logo de Gestión de Inventario Tecnológico" />
          </div>
          <input type="checkbox" id="menu-toggle" />
          <label htmlFor="menu-toggle" className="menu-icon">
            <span></span>
            <span></span>
            <span></span>
          </label>
          <nav>
            <ul className="menu">
              <li><a href="inicio">Inicio</a></li>
              <li><a href="inventario">Inventario</a></li>
              <li><a href="prestamo">Préstamos</a></li>
              <li><a href="mantenimiento">Mantenimiento</a></li>
              <li><a href="administracion">Administración</a></li>
              <li><a href="perfil">Perfil</a></li>
            </ul>
          </nav>
        </div>
      </header>
      <br /><br />
      <section className="maintenance">
      <h2>Solicitudes de Mantenimiento</h2>
        <button class="cta-btn">Crear Nueva Solicitud</button>
        <h2>Historial de Mantenimiento</h2>
        {loading ? (
          <p>Cargando...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID Mantenimiento</th>
                <th>Marca del Equipo</th>
                <th>Fecha Inicio</th>
                <th>Fecha Fin</th>
                <th>Observaciones</th>
              </tr>
            </thead>
            <tbody>
              {historial.map((item) => (
                <tr key={item.Id_Mantenimiento}>
                  <td>{item.Id_Mantenimiento}</td>
                  <td>{item.Marca_Equipo}</td>
                  <td>{item.Fecha_Inicio_mantenimiento}</td>
                  <td>{item.Fecha_fin_mantenimiento}</td>
                  <td>{item.Observaciones}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <footer>
        <p>&copy; 2024 SGIT | Todos los derechos reservados</p>
      </footer>
    </div>
  );
};

export default Mantenimiento;
