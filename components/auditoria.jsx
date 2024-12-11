import React from 'react';
import '../css/auditoria.css';
import logo from '../imagenes/logo.png';

const Auditoria = () => {
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
      <br /><br />

      <section className="audit-log">
        <h2>Historial de Auditoría</h2>

        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Usuario</th>
              <th>Acción Realizada</th>
              <th>Detalle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>14/11/2024</td>
              <td>Juan Pérez</td>
              <td>Modificó la información del equipo Laptop HP</td>
              <td><button>Ver Detalles</button></td>
            </tr>
            <tr>
              <td>12/11/2024</td>
              <td>María López</td>
              <td>Eliminó un equipo de la base de datos</td>
              <td><button>Ver Detalles</button></td>
            </tr>
          </tbody>
        </table>
      </section>

      <footer>
        <p>&copy; 2024 InventarioTech | Todos los derechos reservados</p>
      </footer>
    </div>
  );
}

export default Auditoria;