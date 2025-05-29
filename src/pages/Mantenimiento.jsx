"use client"

import { useState, useEffect } from "react"

const Mantenimiento = ({ setCurrentPage }) => {
  const [mantenimientos, setMantenimientos] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedMantenimiento, setSelectedMantenimiento] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [temaOscuro, setTemaOscuro] = useState(false)

  useEffect(() => {
    cargarMantenimientos()
  }, [])

  useEffect(() => {
    if (temaOscuro) {
      document.body.classList.add("dark")
    } else {
      document.body.classList.remove("dark")
    }
  }, [temaOscuro])

  const cargarMantenimientos = () => {
    setTimeout(() => {
      setMantenimientos([
        {
          Id_Mantenimiento: 1,
          Marca_Equipo: "Dell Inspiron",
          Fecha_Inicio_mantenimiento: "2024-01-15",
          Fecha_fin_mantenimiento: "2024-01-20",
          Observaciones: "Mantenimiento preventivo completo",
        },
        {
          Id_Mantenimiento: 2,
          Marca_Equipo: "HP Pavilion",
          Fecha_Inicio_mantenimiento: "2024-01-18",
          Fecha_fin_mantenimiento: null,
          Observaciones: "Cambio de disco duro",
        },
      ])
      setLoading(false)
    }, 1000)
  }

  const filteredMantenimientos = mantenimientos.filter((mantenimiento) =>
    Object.values(mantenimiento).some(
      (value) => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase()),
    ),
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
              <div className="nav-link-front">
                <i className="fas fa-tools nav-icon maintenance-icon"></i>
                <span>Mantenimiento</span>
              </div>
              <div className="nav-link-back">
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
            <h1>Mantenimiento</h1>
            <p>Gestión de mantenimientos de equipos</p>
          </div>
          <div className="user-profile">
            <div className="user-avatar">A</div>
            <div className="user-info">
              <div className="user-name">Admin</div>
              <div className="user-role">Rol: Administrador (ID: 1)</div>
            </div>
          </div>
        </div>

        <section className="maintenance-panel">
          <div className="panel-header">
            <h2>Registro de Mantenimientos</h2>
            <div className="panel-actions">
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Buscar mantenimiento..."
                  className="search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <i className="fas fa-search search-icon"></i>
              </div>
              <button className="action-button add-button" onClick={() => setShowAddModal(true)}>
                <i className="fas fa-plus"></i> Registrar Mantenimiento
              </button>
            </div>
          </div>

          <div id="printable" className="table-responsive">
            <table className="data-table">
              <caption>Lista de Mantenimientos</caption>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Equipo</th>
                  <th>Fecha Inicio</th>
                  <th>Fecha Fin</th>
                  <th>Observaciones</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="loading-message">
                      <div className="loading-spinner"></div>
                      <span>Cargando datos...</span>
                    </td>
                  </tr>
                ) : filteredMantenimientos.length > 0 ? (
                  filteredMantenimientos.map((mantenimiento) => (
                    <tr key={mantenimiento.Id_Mantenimiento}>
                      <td>{mantenimiento.Id_Mantenimiento}</td>
                      <td>{mantenimiento.Marca_Equipo}</td>
                      <td>{mantenimiento.Fecha_Inicio_mantenimiento}</td>
                      <td>{mantenimiento.Fecha_fin_mantenimiento || "No definida"}</td>
                      <td>{mantenimiento.Observaciones || ""}</td>
                      <td className="actions-cell">
                        <button
                          className="action-icon edit-icon"
                          onClick={() => {
                            setSelectedMantenimiento(mantenimiento)
                            setShowEditModal(true)
                          }}
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          className="action-icon delete-icon"
                          onClick={() => {
                            setSelectedMantenimiento(mantenimiento)
                            setShowDeleteModal(true)
                          }}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="no-data">
                      No hay mantenimientos registrados
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

      {/* Modal para Agregar Mantenimiento */}
      {showAddModal && (
        <div className="modal" style={{ display: "flex" }}>
          <div className="modal-content">
            <div className="modal-header">
              <h3>
                <i className="fas fa-plus-circle"></i> Registrar Nuevo Mantenimiento
              </h3>
              <span className="close-modal" onClick={() => setShowAddModal(false)}>
                &times;
              </span>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label>
                    <i className="fas fa-box"></i> Equipo:
                  </label>
                  <select required>
                    <option value="">Seleccione un equipo</option>
                    <option value="Dell Inspiron">Dell Inspiron</option>
                    <option value="HP Pavilion">HP Pavilion</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>
                    <i className="fas fa-calendar-alt"></i> Fecha de Inicio:
                  </label>
                  <input type="date" required />
                </div>
                <div className="form-group">
                  <label>
                    <i className="fas fa-calendar-check"></i> Fecha de Finalización:
                  </label>
                  <input type="date" />
                </div>
                <div className="form-group">
                  <label>
                    <i className="fas fa-clipboard"></i> Observaciones:
                  </label>
                  <textarea rows="4" placeholder="Ingrese observaciones del mantenimiento"></textarea>
                </div>
                <div className="form-actions">
                  <button type="button" className="cancel-button" onClick={() => setShowAddModal(false)}>
                    Cancelar
                  </button>
                  <button type="submit" className="submit-button">
                    Guardar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Mantenimiento
