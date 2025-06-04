"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import '../assets/css/inicio.css'
import '../assets/css/tablas.css'
import '../assets/css/modal.css'

const Inventario = ({  }) => {
  const [equipos, setEquipos] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedEquipo, setSelectedEquipo] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [temaOscuro, setTemaOscuro] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    cargarInventario()
  }, [])

  useEffect(() => {
    if (temaOscuro) {
      document.body.classList.add("dark")
    } else {
      document.body.classList.remove("dark")
    }
  }, [temaOscuro])

  const cargarInventario = () => {
    setTimeout(() => {
      setEquipos([
        {
          Id_Equipos: 1,
          Marca_Equipo: "Dell",
          Año_Equipo: "2023",
          Nombre_Categoria: "Laptop",
          Caracteristicas_Modelo: "Inspiron 15",
        },
        {
          Id_Equipos: 2,
          Marca_Equipo: "HP",
          Año_Equipo: "2022",
          Nombre_Categoria: "Desktop",
          Caracteristicas_Modelo: "Pavilion",
        },
        {
          Id_Equipos: 3,
          Marca_Equipo: "Samsung",
          Año_Equipo: "2023",
          Nombre_Categoria: "Monitor",
          Caracteristicas_Modelo: "24 pulgadas",
        },
      ])
      setLoading(false)
    }, 1000)
  }

  const filteredEquipos = equipos.filter((equipo) =>
    Object.values(equipo).some((value) => value.toString().toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const openAddModal = () => setShowAddModal(true)
  const openEditModal = (equipo) => {
    setSelectedEquipo(equipo)
    setShowEditModal(true)
  }
  const openDeleteModal = (equipo) => {
    setSelectedEquipo(equipo)
    setShowDeleteModal(true)
  }

  const closeModal = () => {
    setShowAddModal(false)
    setShowEditModal(false)
    setShowDeleteModal(false)
    setSelectedEquipo(null)
  }

  const mostrarToast = (mensaje, tipo = "success") => {
    // Implementar toast notification
    console.log(`${tipo}: ${mensaje}`)
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
            <h1>Inventario</h1>
            <p>Gestión de equipos tecnológicos</p>
          </div>
          <div className="user-profile">
            <div className="user-avatar">A</div>
            <div className="user-info">
              <div className="user-name">Admin</div>
              <div className="user-role">Rol: Administrador (ID: 1)</div>
            </div>
          </div>
        </div>

        <section className="inventory-panel">
          <div className="panel-header">
            <h2>Equipos Registrados</h2>
            <div className="panel-actions">
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Buscar equipo..."
                  className="search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <i className="fas fa-search search-icon"></i>
              </div>
              <button className="action-button add-button" onClick={openAddModal}>
                <i className="fas fa-plus"></i> Agregar Equipo
              </button>
            </div>
          </div>

          <div id="printable" className="table-responsive">
            <table className="data-table">
              <caption>Lista de Equipos</caption>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Marca</th>
                  <th>Año</th>
                  <th>Categoría</th>
                  <th>Modelo</th>
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
                ) : filteredEquipos.length > 0 ? (
                  filteredEquipos.map((equipo) => (
                    <tr key={equipo.Id_Equipos}>
                      <td>{equipo.Id_Equipos}</td>
                      <td>{equipo.Marca_Equipo}</td>
                      <td>{equipo.Año_Equipo}</td>
                      <td>{equipo.Nombre_Categoria}</td>
                      <td>{equipo.Caracteristicas_Modelo}</td>
                      <td className="actions-cell">
                        <button className="action-icon edit-icon" onClick={() => openEditModal(equipo)}>
                          <i className="fas fa-edit"></i>
                        </button>
                        <button className="action-icon delete-icon" onClick={() => openDeleteModal(equipo)}>
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="no-data">
                      No hay equipos registrados
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

      {/* Modal para Agregar Equipo */}
      {showAddModal && (
        <div className="modal" style={{ display: "flex" }}>
          <div className="modal-content">
            <div className="modal-header">
              <h3>
                <i className="fas fa-plus-circle"></i> Agregar Nuevo Equipo
              </h3>
              <span className="close-modal" onClick={closeModal}>
                &times;
              </span>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label>
                    <i className="fas fa-laptop"></i> Marca:
                  </label>
                  <select required>
                    <option value="">Seleccione una marca</option>
                    <option value="Dell">Dell</option>
                    <option value="HP">HP</option>
                    <option value="Samsung">Samsung</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>
                    <i className="fas fa-calendar-alt"></i> Año:
                  </label>
                  <input type="number" required placeholder="Año del equipo" min="1990" max="2099" />
                </div>
                <div className="form-group">
                  <label>
                    <i className="fas fa-list"></i> Categoría:
                  </label>
                  <select required>
                    <option value="">Seleccione una categoría</option>
                    <option value="Laptop">Laptop</option>
                    <option value="Desktop">Desktop</option>
                    <option value="Monitor">Monitor</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>
                    <i className="fas fa-laptop"></i> Modelo:
                  </label>
                  <select required>
                    <option value="">Seleccione un modelo</option>
                    <option value="Inspiron 15">Inspiron 15</option>
                    <option value="Pavilion">Pavilion</option>
                  </select>
                </div>
                <div className="form-actions">
                  <button type="button" className="cancel-button" onClick={closeModal}>
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

      {/* Modal para Editar Equipo */}
      {showEditModal && selectedEquipo && (
        <div className="modal" style={{ display: "flex" }}>
          <div className="modal-content">
            <div className="modal-header">
              <h3>
                <i className="fas fa-edit"></i> Editar Equipo
              </h3>
              <span className="close-modal" onClick={closeModal}>
                &times;
              </span>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label>
                    <i className="fas fa-laptop"></i> Marca:
                  </label>
                  <select required defaultValue={selectedEquipo.Marca_Equipo}>
                    <option value="">Seleccione una marca</option>
                    <option value="Dell">Dell</option>
                    <option value="HP">HP</option>
                    <option value="Samsung">Samsung</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>
                    <i className="fas fa-calendar-alt"></i> Año:
                  </label>
                  <input type="text" required defaultValue={selectedEquipo.Año_Equipo} />
                </div>
                <div className="form-group">
                  <label>
                    <i className="fas fa-list"></i> Categoría:
                  </label>
                  <select required defaultValue={selectedEquipo.Nombre_Categoria}>
                    <option value="">Seleccione una categoría</option>
                    <option value="Laptop">Laptop</option>
                    <option value="Desktop">Desktop</option>
                    <option value="Monitor">Monitor</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>
                    <i className="fas fa-laptop"></i> Modelo:
                  </label>
                  <select required defaultValue={selectedEquipo.Caracteristicas_Modelo}>
                    <option value="">Seleccione un modelo</option>
                    <option value="Inspiron 15">Inspiron 15</option>
                    <option value="Pavilion">Pavilion</option>
                  </select>
                </div>
                <div className="form-actions">
                  <button type="button" className="cancel-button" onClick={closeModal}>
                    Cancelar
                  </button>
                  <button type="submit" className="submit-button">
                    Actualizar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmación para Eliminar */}
      {showDeleteModal && selectedEquipo && (
        <div className="modal" style={{ display: "flex" }}>
          <div className="modal-content delete-modal">
            <div className="modal-header">
              <h3>
                <i className="fas fa-exclamation-triangle"></i> Confirmar Eliminación
              </h3>
              <span className="close-modal" onClick={closeModal}>
                &times;
              </span>
            </div>
            <div className="modal-body">
              <p>¿Está seguro que desea eliminar este equipo? Esta acción no se puede deshacer.</p>
              <div className="form-actions">
                <button type="button" className="cancel-button" onClick={closeModal}>
                  Cancelar
                </button>
                <button type="button" className="delete-button">
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Inventario
