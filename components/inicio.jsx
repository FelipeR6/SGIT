import React from 'react';
import { Link } from 'react-router-dom';
import '../css/inicio2.css'; 
import logo from '../imagenes/logo.png';

const inicio = () => {
  return (
    <div>
      <header>
        <div className="logo">
        <img src={logo} alt="Logo del Sistema de Gestión de Inventarios Tecnológicos SGIT" />
        </div>
        <nav>
          <ul className="menu">
            <li><Link to="/inventario">Inventario</Link></li>
            <li><Link to="/prestamo">Préstamos</Link></li>
            <li><Link to="/mantenimiento">Mantenimiento</Link></li>
            <li><Link to="/administracion">Administración</Link></li>
          </ul>
        </nav>
        <div className="menu-icon" id="menu-toggle">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </header>

      <section className="hero">
        <div className="hero-content">
          <h1>Bienvenido al Sistema de Gestión de Inventarios Tecnológicos</h1>
          <p>Optimiza y administra tu inventario de manera sencilla y eficiente.</p>
        </div>
      </section>

      <section className="cards-section">
        <div className="card">
          <h3>Administración</h3>
          <p>Gestiona todos los aspectos del sistema de inventarios.</p>
          <Link to="/administracion" className="card-link" aria-label="Ver página de Administración">Ver más</Link>
        </div>
        <div className="card">
          <h3>Auditoría</h3>
          <p>Revisa el historial de acciones y cambios en el sistema.</p>
          <Link to="/auditoria" className="card-link" aria-label="Ver página de Auditoría">Ver más</Link>
        </div>
        <div className="card">
          <h3>Consultar</h3>
          <p>Consulta los registros de inventarios y préstamos.</p>
          <Link to="/consultar" className="card-link" aria-label="Ver página de Consultar">Ver más</Link>
        </div>
        <div className="card">
          <h3>Dashboard</h3>
          <p>Accede a un resumen completo del estado del inventario.</p>
          <Link to="/dashboard" className="card-link" aria-label="Ver página de Dashboard">Ver más</Link>
        </div>
        <div className="card">
          <h3>Historial</h3>
          <p>Consulta el historial de acciones y registros anteriores.</p>
          <Link to="/historial" className="card-link" aria-label="Ver página de Historial">Ver más</Link>
        </div>
        <div className="card">
          <h3>Inventario</h3>
          <p>Gestiona el inventario tecnológico de forma eficiente.</p>
          <Link to="/inventario" className="card-link" aria-label="Ver página de Inventario">Ver más</Link>
        </div>
        <div className="card">
          <h3>Mantenimiento</h3>
          <p>Solicita y realiza mantenimiento de los dispositivos.</p>
          <Link to="/mantenimiento" className="card-link" aria-label="Ver página de Mantenimiento">Ver más</Link>
        </div>
        <div className="card">
          <h3>Perfil</h3>
          <p>Accede y edita tu perfil de usuario.</p>
          <Link to="/perfil" className="card-link" aria-label="Ver página de Perfil">Ver más</Link>
        </div>
        <div className="card">
          <h3>PQRS</h3>
          <p>Envía tus Peticiones, Quejas, Reclamos y Sugerencias.</p>
          <Link to="/pqrs" className="card-link" aria-label="Ver página de PQRS">Ver más</Link>
        </div>
        <div className="card">
          <h3>Préstamo</h3>
          <p>Gestiona los préstamos de equipos tecnológicos.</p>
          <Link to="/prestamo" className="card-link" aria-label="Ver página de Préstamo">Ver más</Link>
        </div>
        <div className="card">
          <h3>Registros</h3>
          <p>Realiza registros de inventarios y dispositivos.</p>
          <Link to="/registros" className="card-link" aria-label="Ver página de Registros">Ver más</Link>
        </div>
        <div className="card">
          <h3>Reportes Detallados</h3>
          <p>Genera reportes detallados sobre el inventario y las acciones.</p>
          <Link to="/reportes_detallados" className="card-link" aria-label="Ver página de Reportes Detallados">Ver más</Link>
        </div>
        <div className="card">
          <h3>Reportes</h3>
          <p>Consulta los reportes generales sobre el inventario.</p>
          <Link to="/reportes" className="card-link" aria-label="Ver página de Reportes">Ver más</Link>
        </div>
        <div className="card">
          <h3>Solicitud de Mantenimiento</h3>
          <p>Solicita mantenimiento para los dispositivos del inventario.</p>
          <Link to="/solicitud_mantenimiento" className="card-link" aria-label="Ver página de Solicitud de Mantenimiento">Ver más</Link>
        </div>
      </section>

      <footer>
        <p>&copy; 2024 SGIT | Todos los derechos reservados</p>
      </footer>
    </div>
  );
}

export default inicio;
