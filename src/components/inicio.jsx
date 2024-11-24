import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/inicio.css";
import logo from "../imagenes/logo.png";

const Inicio = () => {
  return (
    <div className="App">
      <nav className="navbar bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <img src={logo} width="5%" alt="Logo" />
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                Bienvenido
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <a className="nav-link active" href="inicio1.php">
                    Inicio
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="mantenimiento/comprobar_mantenimiento.php">
                    Mantenimiento
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="equipo/comprobar_equipo.php">
                    Equipo
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="hoja_de_vida/comprobar_hv.php">
                    Hoja de Vida
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="inventario.html">
                    Inventario
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Únete
                  </a>
                  <ul className="dropdown-menu dropdown-menu-dark">
                    <li>
                      <a className="dropdown-item" href="login.php">
                        Inicio Sesión
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" href="usuario/registro.php">
                        ¿Eres Nuevo?
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <div className="container">
        <div className="row">
          {[
            { title: "Mantenimiento", href: "mantenimiento", icon: "bi-menu-button-wide",  },
            { title: "Equipos", href: "equipo", icon: "bi-pc-display", image: "../imagenes/equipos.jpg" },
            { title: "Usuario", href: "usuario", icon: "bi-person-circle",image: "../iconos/person-circle.svg"  },
            { title: "Prestamo", href: "prestamo equipo", icon: "bi-arrow-left-right", image: "../imagenes/prestamo.jpg" },
            { title: "Hoja de vida", href: "hoja_de_vida", icon: "bi-clipboard-check", image: "../imagenes/hoja_de_vida.jpg" },
            { title: "PQRS", href: "pqrs", icon: "bi-patch-question", image: "../imagenes/pqrs.jpg" },
            { title: "Modelo Equipo", href: "modelo", icon: "bi-window-plus", image: "../imagenes/modelo_equipo.jpg" },
            { title: "Categoria", href: "categoria", icon: "bi-tags", image: "../imagenes/categoria.jpg" },
            { title: "Ubicacion", href: "ubicacion", icon: "bi-send", image: "../imagenes/ubicacion.jpg" },
          ].map((card, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card border-info mb-3" style={{ maxWidth: "20rem" }}>
                <div className="card-header">{card.title}</div>
                <div className="card-body text-center">
                  <img src={card.image} alt={card.title} className="card-img-top" style={{ width: "100%", height: "auto" }} />
                  <h5 className="card-title">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className={`bi ${card.icon}`}
                      viewBox="0 0 16 16"
                      style={{ width: "50px", height: "50px" }}
                    ></svg>
                  </h5>
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => (window.location.href = `${card.href}/mantenimiento.php`)}
                  >
                    Registrar
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => (window.location.href = `${card.href}/comprobar_${card.title.toLowerCase()}.php`)}
                  >
                    Comprobar
                  </button>
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
