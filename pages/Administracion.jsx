"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import '../assets/css/inicio.css'
import '../assets/css/tablas.css'
import '../assets/css/modal.css'

const Administracion = () => {
  const [equipos, setEquipos] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [temaOscuro, setTemaOscuro] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    cargarDatosAdministracion()
  }, [])

  useEffect(() => {
    if (temaOscuro) {
      document.body.classList.add("dark")
    } else {
      document.body.classList.remove("dark")
    }
  }, [temaOscuro])

  const cargarDatosAdministracion = () => {
    setTimeout(() => {
      setEquipos([
        {
          Marca_Equipo: "Dell Inspiron",
          Nombre_Categoria: "Laptop",
          Estado_Entregado: "Bueno",
          Estado_Recibido: "Excelente",
          Año_Equipo: "2023",
        },
        {
          Marca_Equipo: "HP Pavilion",
          Nombre_Categoria: "Desktop",
          Estado_Entregado: "Regular",
          Estado_Recibido: "Bueno",
          Año_Equipo: "2022",
        },
      ])
      setLoading(false)
    }, 1000)
  }

  const filteredEquipos = equipos.filter((equipo) =>
    Object.values(equipo).some((value) => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())),
  )

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
            <h1>Administración</h1>
            <p>Panel de control administrativo</p>
          </div>
          <div className="user-profile">
            <div className="user-avatar">A</div>
            <div className="user-info">
              <div className="user-name">Admin</div>
              <div className="user-role">Rol: Administrador (ID: 1)</div>
            </div>
          </div>
        </div>

        <section className="admin-panel">
          <div className="panel-header">
            <h2>Panel de Administración</h2>
            <div className="panel-actions">
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Buscar registros..."
                  className="search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <i className="fas fa-search search-icon"></i>
              </div>
            </div>
          </div>

          <div id="printable" className="table-responsive">
            <table className="data-table">
              <caption>Lista de Registros de Administración</caption>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Categoría</th>
                  <th>Estado Entregado</th>
                  <th>Estado Recibido</th>
                  <th>Año</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="loading-message">
                      <div className="loading-spinner"></div>
                      <span>Cargando datos...</span>
                    </td>
                  </tr>
                ) : filteredEquipos.length > 0 ? (
                  filteredEquipos.map((equipo, index) => (
                    <tr key={index}>
                      <td>{equipo.Marca_Equipo}</td>
                      <td>{equipo.Nombre_Categoria}</td>
                      <td>{equipo.Estado_Entregado}</td>
                      <td>{equipo.Estado_Recibido}</td>
                      <td>{equipo.Año_Equipo}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="no-data">
                      No hay registros disponibles
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

export default Administracion