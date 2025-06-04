"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import '../assets/css/inicio.css'
import '../assets/css/tablas.css'
import '../assets/css/modal.css'

const Historial = ({ }) => {
  const [historialEntries, setHistorialEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [temaOscuro, setTemaOscuro] = useState(true)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedEntry, setSelectedEntry] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    cargarHistorial()
  }, [])

  useEffect(() => {
    if (temaOscuro) {
      document.body.classList.add("dark")
    } else {
      document.body.classList.remove("dark")
    }
  }, [temaOscuro])

  const cargarHistorial = () => {
    setTimeout(() => {
      setHistorialEntries([
        {
          Fecha_Prestamo_Equipo: "2024-01-15",
          Nombre_Usuario_1: "Juan",
          Apellidos_Usuario_1: "Pérez",
          Id_Equipos: 1,
          accion: "Préstamo del equipo con ID: 1",
        },
        {
          Fecha_Prestamo_Equipo: "2024-01-14",
          Nombre_Usuario_1: "María",
          Apellidos_Usuario_1: "García",
          Id_Equipos: 2,
          accion: "Préstamo del equipo con ID: 2",
        },
        {
          Fecha_Prestamo_Equipo: "2024-01-13",
          Nombre_Usuario_1: "Carlos",
          Apellidos_Usuario_1: "López",
          Id_Equipos: 3,
          accion: "Préstamo del equipo con ID: 3",
        },
      ])
      setLoading(false)
    }, 1000)
  }

  const filteredEntries = historialEntries.filter((entry) =>
    Object.values(entry).some((value) => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const verDetalle = (entry) => {
    setSelectedEntry(entry)
    setShowDetailModal(true)
  }

  const toggleTheme = () => {
    setTemaOscuro(!temaOscuro)
  }

  const handleLogout = () => {
    // Aquí podrías añadir lógica de logout (limpiar token, etc.)
    navigate("/home")
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
        <Link to="/inicio" className="nav-item">
            <div className="nav-link-wrapper">
              <div className="item-glow inventory-glow"></div>
              <div className="nav-link-front">
                <i className="fas fa-home nav-icon inventory-icon"></i>
                <span>Inicio</span>
              </div>
              <div className="nav-link-back">
                <i className="fas fa-home nav-icon inventory-icon"></i>
                <span>Inicio</span>
              </div>
            </div>
          </Link>

          <Link to="/inventario" className="nav-item">
            <div className="nav-link-wrapper">
              <div className="item-glow inventory-glow"></div>
              <div className="nav-link-front">
                <i className="fas fa-box nav-icon inventory-icon"></i>
                <span>Inventario</span>
              </div>
              <div className="nav-link-back">
                <i className="fas fa-box nav-icon inventory-icon"></i>
                <span>Inventario</span>
              </div>
            </div>
          </Link>

          <Link to="/mantenimiento" className="nav-item">
            <div className="nav-link-wrapper">
              <div className="item-glow maintenance-glow"></div>
              <div className="nav-link-front">
                <i className="fas fa-tools nav-icon maintenance-icon"></i>
                <span>Mantenimiento</span>
              </div>
              <div className="nav-link-back">
                <i className="fas fa-tools nav-icon maintenance-icon"></i>
                <span>Mantenimiento</span>
              </div>
            </div>
          </Link>

          <Link to="/Administracion" className="nav-item">
            <div className="nav-link-wrapper">
              <div className="item-glow maintenance-glow"></div>
              <div className="nav-link-front">
                <i className="fas fa-tools nav-icon maintenance-icon"></i>
                <span>Administracion</span>
              </div>
              <div className="nav-link-back">
                <i className="fas fa-tools nav-icon maintenance-icon"></i>
                <span>Administracion</span>
              </div>
            </div>
          </Link>

          <Link to="/prestamo" className="nav-item">
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
          </Link>

          <Link to="/perfil" className="nav-item">
            <div className="nav-link-wrapper">
              <div className="item-glow profile-glow"></div>
              <div className="nav-link-front">
                <i className="fas fa-user nav-icon profile-icon"></i>
                <span>Perfil</span>
              </div>
              <div className="nav-link-back">
                <i className="fas fa-user nav-icon profile-icon"></i>
                <span>Perfil</span>
              </div>
            </div>
          </Link>

          <div className="nav-item" onClick={handleLogout}>
            <div className="nav-link-wrapper">
              <div className="item-glow logout-glow"></div>
              <div className="nav-link-front">
                <i className="fas fa-sign-out-alt nav-icon logout-icon"></i>
                <span>Cerrar Sesión</span>
              </div>
              <div className="nav-link-back">
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
            <h1>Historial</h1>
            <p>Registro de actividades y eventos</p>
          </div>
          <div className="user-profile">
            <div className="user-avatar">A</div>
            <div className="user-info">
              <div className="user-name">Admin</div>
              <div className="user-role">Rol: Administrador (ID: 1)</div>
            </div>
          </div>
        </div>

        <section className="activity-history">
          <div className="panel-header">
            <h2>Historial de Actividades</h2>
            <div className="panel-actions">
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Buscar actividad..."
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
              <caption>Registro de Actividades del Sistema</caption>
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
                      <td>{entry.Fecha_Prestamo_Equipo}</td>
                      <td>{`${entry.Nombre_Usuario_1} ${entry.Apellidos_Usuario_1}`}</td>
                      <td>{entry.accion}</td>
                      <td className="actions-cell">
                        <button className="action-icon view-icon" onClick={() => verDetalle(entry)}>
                          <i className="fas fa-eye"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="no-data">
                      No hay registros de actividades disponibles
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
                <i className="fas fa-info-circle"></i> Detalles de la Actividad
              </h3>
              <span className="close-modal" onClick={() => setShowDetailModal(false)}>
                &times;
              </span>
            </div>
            <div className="modal-body">
              <div className="detalle-item">
                <strong>
                  <i className="fas fa-calendar"></i> Fecha del Préstamo:
                </strong>
                <span>{selectedEntry.Fecha_Prestamo_Equipo}</span>
              </div>
              <div className="detalle-item">
                <strong>
                  <i className="fas fa-user"></i> Usuario:
                </strong>
                <span>{`${selectedEntry.Nombre_Usuario_1} ${selectedEntry.Apellidos_Usuario_1}`}</span>
              </div>
              <div className="detalle-item">
                <strong>
                  <i className="fas fa-box"></i> ID del Equipo:
                </strong>
                <span>{selectedEntry.Id_Equipos}</span>
              </div>
              <div className="detalle-item">
                <strong>
                  <i className="fas fa-info-circle"></i> Información adicional:
                </strong>
                <p>
                  Detalles completos del préstamo del equipo. Esta información incluye el estado del equipo, la
                  ubicación, y cualquier otra información relevante para el seguimiento del préstamo.
                </p>
              </div>
              <div className="form-actions">
                <button type="button" className="cancel-button" onClick={() => setShowDetailModal(false)}>
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

export default Historial
