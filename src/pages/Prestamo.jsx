"use client"

import { useState, useEffect } from "react"

const Prestamo = ({ setCurrentPage }) => {
  const [prestamos, setPrestamos] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [temaOscuro, setTemaOscuro] = useState(false)

  useEffect(() => {
    cargarPrestamos()
  }, [])

  useEffect(() => {
    if (temaOscuro) {
      document.body.classList.add("dark")
    } else {
      document.body.classList.remove("dark")
    }
  }, [temaOscuro])

  const cargarPrestamos = () => {
    setTimeout(() => {
      setPrestamos([
        {
          Id_Prestamo_Equipo: 1,
          Fecha_Prestamo_Equipo: "2024-01-15",
          Fecha_entrega_prestamo: "2024-01-22",
          Nombre_Usuario_1: "Juan Pérez",
          Marca_Equipo: "Dell Inspiron",
          Nombre_Ubicacion: "Sala de Sistemas",
          Estado_Entregado: "Bueno",
        },
        {
          Id_Prestamo_Equipo: 2,
          Fecha_Prestamo_Equipo: "2024-01-18",
          Fecha_entrega_prestamo: "2024-01-25",
          Nombre_Usuario_1: "María García",
          Marca_Equipo: "HP Pavilion",
          Nombre_Ubicacion: "Oficina Principal",
          Estado_Entregado: "Excelente",
        },
      ])
      setLoading(false)
    }, 1000)
  }

  const filteredPrestamos = prestamos.filter((prestamo) =>
    Object.values(prestamo).some((value) => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())),
  )

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
              <div className="nav-link-front">
                <i className="fas fa-file-alt nav-icon lifecycle-icon"></i>
                <span>Prestamo</span>
              </div>
              <div className="nav-link-back">
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
            <h1>Préstamos</h1>
            <p>Gestión de préstamos de equipos</p>
          </div>
          <div className="user-profile">
            <div className="user-avatar">A</div>
            <div className="user-info">
              <div className="user-name">Admin</div>
              <div className="user-role">Rol: Administrador (ID: 1)</div>
            </div>
          </div>
        </div>

        <section className="prestamo-panel">
          <div className="panel-header">
            <h2>Préstamos de Equipos</h2>
            <div className="panel-actions">
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Buscar préstamo..."
                  className="search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <i className="fas fa-search search-icon"></i>
              </div>
              <button className="action-button add-button">
                <i className="fas fa-plus"></i> Nuevo Préstamo
              </button>
            </div>
          </div>

          <div id="printable" className="table-responsive">
            <table className="data-table">
              <caption>Lista de Préstamos Registrados</caption>
              <thead>
                <tr>
                  <th>ID Préstamo</th>
                  <th>Fecha Préstamo</th>
                  <th>Fecha Entrega</th>
                  <th>Usuario</th>
                  <th>Marca Equipo</th>
                  <th>Ubicación</th>
                  <th>Estado Entregado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="8" className="loading-message">
                      <div className="loading-spinner"></div>
                      <span>Cargando datos...</span>
                    </td>
                  </tr>
                ) : filteredPrestamos.length > 0 ? (
                  filteredPrestamos.map((prestamo) => (
                    <tr key={prestamo.Id_Prestamo_Equipo}>
                      <td>{prestamo.Id_Prestamo_Equipo}</td>
                      <td>{prestamo.Fecha_Prestamo_Equipo}</td>
                      <td>{prestamo.Fecha_entrega_prestamo}</td>
                      <td>{prestamo.Nombre_Usuario_1}</td>
                      <td>{prestamo.Marca_Equipo}</td>
                      <td>{prestamo.Nombre_Ubicacion}</td>
                      <td>{prestamo.Estado_Entregado}</td>
                      <td className="actions-cell">
                        <button className="action-icon edit-icon">
                          <i className="fas fa-edit"></i>
                        </button>
                        <button className="action-icon delete-icon">
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="no-data">
                      No hay préstamos registrados
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="table-footer">
            <div className="pagination">
              <button className="pagination-button" disabled>
                <i className="fas fa-chevron-left"></i>
              </button>
              <span className="pagination-info">Página 1 de 1</span>
              <button className="pagination-button" disabled>
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
            <button className="action-button print-btn">
              <i className="fas fa-print"></i> Imprimir
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Prestamo
