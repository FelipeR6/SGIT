"use client"

import { useEffect, useState } from "react"

const InicioDashboard = ({ setCurrentPage }) => {
  const [estadisticasData] = useState({
    totales: {
      equipos: 45,
      mantenimientos: 12,
      prestamos: 8,
      usuarios: 25,
    },
  })
  const [temaOscuro, setTemaOscuro] = useState(false)
  const [usuario] = useState({
    nombre: "Juan Pérez",
    nombre_rol: "Administrador",
    id_rol: "1",
  })
  const [currentSection, setCurrentSection] = useState("inicio")

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

  const renderContent = () => {
    switch (currentSection) {
      default:
        return (
          <>
            <div className="top-bar">
              <div className="top-bar-info">
                <h1>Inicio</h1>
                <p>Bienvenido al sistema de gestión de inventarios</p>
              </div>
              <div className="user-profile">
                <div className="user-avatar">{usuario.nombre.charAt(0).toUpperCase()}</div>
                <div className="user-info">
                  <div className="user-name">{usuario.nombre}</div>
                  <div className="user-role">
                    Rol: {usuario.nombre_rol} (ID: {usuario.id_rol})
                  </div>
                </div>
              </div>
            </div>

            <section className="stats-container">
              <div className="stat-card">
                <div className="stat-icon equipos">
                  <i className="fas fa-laptop"></i>
                </div>
                <div className="stat-value">{estadisticasData.totales.equipos}</div>
                <div className="stat-label">Equipos Registrados</div>
              </div>

              <div className="stat-card">
                <div className="stat-icon mantenimientos">
                  <i className="fas fa-tools"></i>
                </div>
                <div className="stat-value">{estadisticasData.totales.mantenimientos}</div>
                <div className="stat-label">Mantenimientos</div>
              </div>

              <div className="stat-card">
                <div className="stat-icon prestamos">
                  <i className="fas fa-handshake"></i>
                </div>
                <div className="stat-value">{estadisticasData.totales.prestamos}</div>
                <div className="stat-label">Préstamos</div>
              </div>

              <div className="stat-card">
                <div className="stat-icon usuarios">
                  <i className="fas fa-users"></i>
                </div>
                <div className="stat-value">{estadisticasData.totales.usuarios}</div>
                <div className="stat-label">Usuarios</div>
              </div>
            </section>

            <section className="cards-container">
              <div className="card" onClick={() => setCurrentPage("consultar")}>
                <div className="card-icon">
                  <i className="fas fa-search"></i>
                </div>
                <h3>Consultar</h3>
                <p>Consulta los registros de inventario y préstamo</p>
              </div>
              <div className="card" onClick={() => setCurrentPage("historial")}>
                <div className="card-icon">
                  <i className="fas fa-history"></i>
                </div>
                <h3>Historial</h3>
                <p>Consulta el historial de acciones y registros anteriores</p>
              </div>
              <div className="card" onClick={() => setCurrentPage("pqrs")}>
                <div className="card-icon">
                  <i className="fas fa-comment-dots"></i>
                </div>
                <h3>PQRS</h3>
                <p>Envía tus peticiones, quejas, reclamos y sugerencias</p>
              </div>
              <div className="card" onClick={() => setCurrentPage("registros")}>
                <div className="card-icon">
                  <i className="fas fa-clipboard-list"></i>
                </div>
                <h3>Registros</h3>
                <p>Realiza registros de inventario y dispositivos</p>
              </div>
              <div className="card" onClick={() => setCurrentPage("hojavida")}>
                <div className="card-icon">
                  <i className="fas fa-clipboard-list"></i>
                </div>
                <h3>Hoja De Vida</h3>
                <p>Consultar la Hoja de vida de los equipos</p>
              </div>
              <div className="card" onClick={() => setCurrentPage("auditoria")}>
                <div className="card-icon">
                  <i className="fas fa-shield-alt"></i>
                </div>
                <h3>Auditoría</h3>
                <p>Historial de acciones y cambios en el sistema</p>
              </div>
            </section>
          </>
        )
    }
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

      <main className="content">{renderContent()}</main>
    </div>
  )
}

export default InicioDashboard
