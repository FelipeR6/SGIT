import React from 'react';
import '../css/reportes.css';
import logo from '../imagenes/logo.png';

const Reportes = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Reporte generado con las fechas:", event.target.startDate.value, event.target.endDate.value);
  };

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
              <li><a href="inicio" className="active">Inicio</a></li>
              <li><a href="inventario">Inventario</a></li>
              <li><a href="prestamo">Préstamos</a></li>
              <li><a href="mantenimiento">Mantenimiento</a></li>
              <li><a href="administracion">Administración</a></li>
              <li><a href="perfil">Perfil</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <section className="reports">
        <h2>Generar Reportes</h2>
        
        <form id="reportForm" onSubmit={handleSubmit}>
          <label htmlFor="startDate">Fecha de Inicio:</label>
          <input type="date" id="startDate" name="startDate" required />

          <label htmlFor="endDate">Fecha de Fin:</label>
          <input type="date" id="endDate" name="endDate" required />

          <button type="submit" className="cta-btn">Generar Reporte</button>
        </form>

        <h3>Reportes Generados</h3>
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Descripción</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>15/11/2024</td>
              <td>Reporte de Equipos Prestados</td>
              <td><button>Ver</button></td>
            </tr>
          </tbody>
        </table>
      </section>

      <footer>
        <p>&copy; 2024 InventarioTech | Todos los derechos reservados</p>
      </footer>
    </div>
  );
};

export default Reportes;
