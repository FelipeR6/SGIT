import "../css/prestamo.css";
import logo from "../imagenes/logo.png";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const CrudPrestamoEquipo = () => {
  const [formData, setFormData] = useState({
    Fecha_Prestamo_Equipo: "",
    Fecha_entrega_prestamo: "",
    Id_Usuario: "",
    Id_Equipos: "",
    Id_Ubicacion: "",
    Id_Estado_Equipo: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", formData);
    // Aquí iría la lógica para enviar los datos a tu backend
  };

  const redirectToComprobar = () => {
    window.location.href = 'http://localhost/SGIT.v6/prestamo_equipo/comprobar_prestamo.php';
  };

  return (
    <>
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
              <li>
                <a href="/inicio">Inicio</a>
              </li>
              <li>
                <a href="/inventario">Inventario</a>
              </li>
              <li>
                <a href="/prestamo">Préstamos</a>
              </li>
              <li>
                <a href="/mantenimiento">Mantenimiento</a>
              </li>
              <li>
                <a href="/administracion">Administración</a>
              </li>
              <li>
                <a href="/perfil">Perfil</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="card p-4 shadow-lg">
          <div className="card-header">
            <h3>CRUD Préstamo Equipo</h3>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="Fecha_Prestamo_Equipo" className="form-label">
                    Fecha Préstamo
                  </label>
                  <input
                    type="date"
                    id="Fecha_Prestamo_Equipo"
                    className="form-control"
                    name="Fecha_Prestamo_Equipo"
                    value={formData.Fecha_Prestamo_Equipo}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label
                    htmlFor="Fecha_entrega_prestamo"
                    className="form-label"
                  >
                    Fecha Entrega
                  </label>
                  <input
                    type="date"
                    id="Fecha_entrega_prestamo"
                    className="form-control"
                    name="Fecha_entrega_prestamo"
                    value={formData.Fecha_entrega_prestamo}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="Id_Usuario" className="form-label">
                    ID Usuario
                  </label>
                  <input
                    type="number"
                    id="Id_Usuario"
                    className="form-control"
                    name="Id_Usuario"
                    value={formData.Id_Usuario}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="Id_Equipos" className="form-label">
                    ID Equipos
                  </label>
                  <input
                    type="number"
                    id="Id_Equipos"
                    className="form-control"
                    name="Id_Equipos"
                    value={formData.Id_Equipos}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="Id_Ubicacion" className="form-label">
                    ID Ubicación
                  </label>
                  <input
                    type="number"
                    id="Id_Ubicacion"
                    className="form-control"
                    name="Id_Ubicacion"
                    value={formData.Id_Ubicacion}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="Id_Estado_Equipo" className="form-label">
                    ID Estado Equipo
                  </label>
                  <input
                    type="number"
                    id="Id_Estado_Equipo"
                    className="form-control"
                    name="Id_Estado_Equipo"
                    value={formData.Id_Estado_Equipo}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <button type="submit" className="btn btn-primary">
                  Registrar
                </button>
                <div className="btn-group">
                  <a href="/inicio" className="btn btn-secondary">
                    Regresar
                  </a>
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={redirectToComprobar}
                  >
                    Comprobar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <footer>
        <p>&copy; 2024 SGIT | Todos los derechos reservados</p>
      </footer>
    </>
  );
};

export default CrudPrestamoEquipo;
