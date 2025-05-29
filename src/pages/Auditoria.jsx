"use client"

import { useState, useEffect } from "react"

const Auditoria = ({ setCurrentPage }) => {
  const [auditEntries, setAuditEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [temaOscuro, setTemaOscuro] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedEntry, setSelectedEntry] = useState(null)

  useEffect(() => {
    cargarDatosAuditoria()
  }, [])

  useEffect(() => {
    if (temaOscuro) {
      document.body.classList.add("dark")
    } else {
      document.body.classList.remove("dark")
    }
  }, [temaOscuro])

  const cargarDatosAuditoria = () => {
    setTimeout(() => {
      setAuditEntries([
        {
          fecha: "2024-01-15 10:30:00",
          usuario: "Juan Pérez",
          accion: "Creación de equipo",
          detalle: "Se registró un nuevo equipo Dell Inspiron 15"
        },
        {
          fecha: "2024-01-15 11:45:00",
          usuario: "María García",
          accion: "Actualización de mantenimiento",
          detalle: "Se completó el mantenimiento preventivo del equipo HP-001"
        },
        {
          fecha: "2024-01-15 14:20:00",
          usuario: "Carlos López",
          accion: "Préstamo de equipo",
          detalle: "Se prestó el equipo Samsung Monitor 24' al usuario Ana Rodríguez"
        }
      ])
      setLoading(false)
    }, 1000)
  }

  const filteredEntries = auditEntries.filter((entry) =>
    Object.values(entry).some((value) => 
      value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  const verDetalle = (entry) => {
    setSelectedEntry(entry)
    setShowDetailModal(true)
  }

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
              <div className="nav-link-front" onClick={() => setCurrentPage("hojavida")}>
                <i className="fas fa-file-alt nav-icon lifecycle-icon"></i>
                <span>Hoja de Vida</span>
              </div>
              <div className="nav-link-back" onClick={() => setCurrentPage("hojavida")}>
                <i className="fas fa-file-alt nav-icon lifecycle-icon"></i>
                <span>Hoja de Vida</span>
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
            <h1>Auditoría</h1>
            <p>Historial de acciones y cambios en el sistema</p>
          </div>
          <div className="user-profile">
            <div className="user-avatar">A</div>
            <div className="user-info">
              <div className="user-name">Admin</div>
              <div className="user-role">Rol: Administrador (ID: 1)</div>
            </div>
          </div>
        </div>

        <section className="audit-log">
          <div className="panel-header">
            <h2>Historial de Auditoría</h2>
            <div className="panel-actions">
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Buscar en auditoría..."
                  className="search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <i className="fas fa-search search-icon"></i>
              </div>
              <button className="action-button print-btn">
                <i className="fas fa-print"></i> Imprimir
              </button>
            </div>
          </div>

          <div id="printable" className="table-responsive">
            <table className="data-table">
              <caption>Registro de Auditoría del Sistema</caption>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Usuario</th>
                  <th>Acción Realizada</th>
                  <th>Detalle</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="4" className="loading-message">
                      <div className="loading-spinner"></div>
                      <span>Cargando datos...</span>
                    </td>
                  </tr>
                ) : filteredEntries.length > 0 ? (
                  filteredEntries.map((entry, index) => (
                    <tr key={index}>
                      <td>{entry.fecha}</td>
                      <td>{entry.usuario}</td>
                      <td>{entry.accion}</td>
                      <td className="actions-cell">
                        <button 
                          className="action-icon view-icon" 
                          onClick={() => verDetalle(entry)}
                        >
                          <i className="fas fa-eye"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="no-data">
                      No hay registros de auditoría disponibles
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
          </div>
        </section>
      </main>

      {/* Modal para Ver Detalles */}
      {showDetailModal && selectedEntry && (
        <div className="modal" style={{ display: "flex" }}>
          <div className="modal-content">
            <div className="modal-header">
              <h3>
                <i className="fas fa-info-circle"></i> Detalles de la Acción
              </h3>
              <span className="close-modal" onClick={() => setShowDetailModal(false)}>
                &times;
              </span>
            </div>
            <div className="modal-body">
              <div className="detalle-item">
                <strong>
                  <i className="fas fa-calendar"></i> Fecha:
                </strong>
                <span>{selectedEntry.fecha}</span>
              </div>
              <div className="detalle-item">
                <strong>
                  <i className="fas fa-user"></i> Usuario:
                </strong>
                <span>{selectedEntry.usuario}</span>
              </div>
              <div className="detalle-item">
                <strong>
                  <i className="fas fa-tasks"></i> Acción:
                </strong>
                <span>{selectedEntry.accion}</span>
              </div>
              <div className="detalle-item">
                <strong>
                  <i className="fas fa-info-circle"></i> Información adicional:
                </strong>
                <p>{selectedEntry.detalle}</p>
              </div>
              <div className="form-actions">
                <button 
                  type="button" 
                  className="cancel-button" 
                  onClick={() => setShowDetailModal(false)}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Auditoria