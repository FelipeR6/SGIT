import React from 'react';
import '../css/inicio.css';
import logo from '../imagenes/logo.png';

const Inicio = () => {
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
      <div className="container">
        <div className="row">
          {[
            { title: 'Mantenimiento', icon: 'bi-menu-button-wide', link: 'mantenimiento/mantenimiento.php' },
            { title: 'Equipos', icon: 'bi-pc-display', link: 'equipo/equipo.php' },
            { title: 'Usuario', icon: 'bi-person-circle', link: 'usuario/registro.php' },
            { title: 'Prestamo', icon: 'bi-arrow-left-right', link: 'prestamo equipo/prestamo.php' },
            { title: 'Hoja de vida', icon: 'bi-clipboard-check', link: 'hoja_de_vida/hoja_de_vida.php' },
            { title: 'Modelo Equipo', icon: 'bi-window-plus', link: 'modelo/modelo.php' },
            { title: 'Categoria', icon: 'bi-tags', link: 'categoria/categoria.php' },
            { title: 'Ubicacion', icon: 'bi-send', link: 'ubicacion/ubicacion.php' }
          ].map((item, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card border-info mb-3" style={{ maxWidth: '20rem' }}>
                <div className="card-header">{item.title}</div>
                <div className="card-body text-center">
                  <h5 className="card-title">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className={`bi ${item.icon}`} viewBox="0 0 16 16" style={{ width: 50, height: 50 }}>
                    </svg>
                  </h5>
                  <button type="button" className="btn btn-outline-secondary" onClick={() => window.location.href = item.link}>Registrar</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Inicio;
