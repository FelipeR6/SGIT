"use client"

import { useState, useEffect } from "react"

const Consultar = ({ setCurrentPage }) => {
  const [temaOscuro, setTemaOscuro] = useState(false)

  useEffect(() => {
    if (temaOscuro) {
      document.body.classList.add("dark")
    } else {
      document.body.classList.remove("dark")
    }
  }, [temaOscuro])

  const toggleTheme = () => {
    setTemaOscuro(!temaOscuro)
  }

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>SGIT</h2>
          <div className="theme-toggle">
            <i className="fa-solid fa-sun sun"></i>
            <label className="switch">
              <input type="checkbox" checked={temaOscuro} onChange={toggleTheme} />
              <span className="slider"></span>
            </label>
            <i className="fa-solid fa-moon moon"></i>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-item">
            <div className="nav-link-wrapper">
              <div className="item-glow inventory-glow"></div>
              <div className="nav-link-front" onClick={() => setCurrentPage("dashboard")}>
                <i className="fas fa-home nav-icon inventory-icon"></i>
                <span>Inicio</span>
              </div>
              <div className="nav-link-back" onClick={() => setCurrentPage("dashboard")}>
                <i className="fas fa-home nav-icon inventory-icon"></i>
                <span>Inicio</span>
              </div>
            </div>
          </div>

          <div className="nav-item">
            <div className="nav-link-wrapper">
              <div className="item-glow inventory-glow"></div>
              <div className="nav-link-front" onClick={() => setCurrentPage("inventario")}>
                <i className="fas fa-box nav-icon inventory-icon"></i>
                <span>Inventario</span>
              </div>
              <div className="nav-link-back" onClick={() => setCurrentPage("inventario")}>
                <i className="fas fa-box nav-icon inventory-icon"></i>
                <span>Inventario</span>
              </div>
            </div>
          </div>

          <div className="nav-item">
            <div className="nav-link-wrapper">
              <div className="item-glow maintenance-glow"></div>
              <div className="nav-link-front" onClick={() => setCurrentPage("mantenimiento")}>
                <i className="fas fa-tools nav-icon maintenance-icon"></i>
                <span>Mantenimiento</span>
              </div>
              <div className="nav-link-back" onClick={() => setCurrentPage("mantenimiento")}>
                <i className="fas fa-tools nav-icon maintenance-icon"></i>
                <span>Mantenimiento</span>
              </div>
            </div>
          </div>

          <div className="nav-item">
            <div className="nav-link-wrapper">
              <div className="item-glow admin-glow"></div>
              <div className="nav-link-front" onClick={() => setCurrentPage("administracion")}>
                <i className="fas fa-cogs nav-icon admin-icon"></i>
                <span>Administración</span>
              </div>
              <div className="nav-link-back" onClick={() => setCurrentPage("administracion")}>
                <i className="fas fa-cogs nav-icon admin-icon"></i>
                <span>Administración</span>
              </div>
            </div>
          </div>

          <div className="nav-item">
            <div className="nav-link-wrapper">
              <div className="item-glow lifecycle-glow"></div>
              <div className="nav-link-front" onClick={() => setCurrentPage("prestamo")}>
                <i className="fas fa-file-alt nav-icon lifecycle-icon"></i>
                <span>Prestamo</span>
              </div>
              <div className="nav-link-back" onClick={() => setCurrentPage("prestamo")}>
                <i className="fas fa-file-alt nav-icon lifecycle-icon"></i>
                <span>Prestamo</span>
              </div>
            </div>
          </div>

          <div className="nav-item">
            <div className="nav-link-wrapper">
              <div className="item-glow profile-glow"></div>
              <div className="nav-link-front" onClick={() => setCurrentPage("perfil")}>
                <i className="fas fa-user nav-icon profile-icon"></i>
                <span>Perfil</span>
              </div>
              <div className="nav-link-back" onClick={() => setCurrentPage("perfil")}>
                <i className="fas fa-user nav-icon profile-icon"></i>
                <span>Perfil</span>
              </div>
            </div>
          </div>

          <div className="nav-item">
            <div className="nav-link-wrapper">
              <div className="item-glow logout-glow"></div>
              <div className="nav-link-front" onClick={() => setCurrentPage("home")}>
                <i className="fas fa-sign-out-alt nav-icon logout-icon"></i>
                <span>Cerrar Sesión</span>
              </div>
              <div className="nav-link-back" onClick={() => setCurrentPage("home")}>
                <i className="fas fa-sign-out-alt nav-icon logout-icon"></i>
                <span>Cerrar Sesión</span>
              </div>
            </div>
          </div>
        </nav>
      </aside>

      <main className="content">
        <div className="top-bar">
          <div className="top-bar-info">
            <h1>Consultar</h1>
            <p>Bienvenido al sistema de gestión de inventarios</p>
          </div>
          <div className="user-profile">
            <div className="user-avatar">A</div>
            <div className="user-info">
              <div className="user-name">Admin</div>
              <div className="user-role">Rol: Administrador (ID: 1)</div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card border-info mb-3" style={{ maxWidth: "20rem" }}>
                <div className="card-header">Mantenimiento</div>
                <div className="card-body text-center">
                  <h5 className="card-title">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="bi bi-menu-button-wide"
                      viewBox="0 0 16 16"
                      style={{ width: 50, height: 50 }}
                    >
                      <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0h13A1.5 1.5 0 0 1 16 1.5v2A1.5 1.5 0 0 1 14.5 5h-13A1.5 1.5 0 0 1 0 3.5zM1.5 1a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5z" />
                      <path d="M2 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m10.823.323-.396-.396A.25.25 0 0 1 12.604 2h.792a.25.25 0 0 1 .177.427l-.396.396a.25.25 0 0 1-.354 0M0 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm1 3v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2zm14-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2zM2 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0 4a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5" />
                    </svg>
                  </h5>
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setCurrentPage("mantenimiento")}
                  >
                    Comprobar
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card border-info mb-3" style={{ maxWidth: "20rem" }}>
                <div className="card-header">Equipos</div>
                <div className="card-body text-center">
                  <h5 className="card-title">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ width: 50, height: 50 }}
                      fill="currentColor"
                      className="bi bi-pc-display"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 1a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1zm1 13.5a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0m2 0a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0M9.5 1a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zM9 3.5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 0-1h-5a.5.5 0 0 0-.5.5M1.5 2A1.5 1.5 0 0 0 0 3.5v7A1.5 1.5 0 0 0 1.5 12H6v2h-.5a.5.5 0 0 0 0 1H7v-4H1.5a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5H7V2z" />
                    </svg>
                  </h5>
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setCurrentPage("inventario")}
                  >
                    Comprobar
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card border-info mb-3" style={{ maxWidth: "20rem" }}>
                <div className="card-header">Usuario</div>
                <div className="card-body text-center">
                  <h5 className="card-title">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ width: 50, height: 50 }}
                      fill="currentColor"
                      className="bi bi-person-circle"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                      <path
                        fillRule="evenodd"
                        d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                      />
                    </svg>
                  </h5>
                  <button type="button" className="btn btn-outline-secondary" onClick={() => setCurrentPage("perfil")}>
                    Comprobar
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card border-info mb-3" style={{ maxWidth: "20rem" }}>
                <div className="card-header">Prestamo</div>
                <div className="card-body text-center">
                  <h5 className="card-title">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ width: 50, height: 50 }}
                      fill="currentColor"
                      className="bi bi-arrow-left-right"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5m14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5"
                      />
                    </svg>
                  </h5>
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setCurrentPage("prestamo")}
                  >
                    Comprobar
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card border-info mb-3" style={{ maxWidth: "20rem" }}>
                <div className="card-header">Hoja de vida</div>
                <div className="card-body text-center">
                  <h5 className="card-title">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ width: 50, height: 50 }}
                      fill="currentColor"
                      className="bi bi-clipboard-check"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0"
                      />
                      <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z" />
                      <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z" />
                    </svg>
                  </h5>
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setCurrentPage("hojavida")}
                  >
                    Comprobar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Consultar
