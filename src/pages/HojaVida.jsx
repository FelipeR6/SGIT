"use client"

import { useState, useEffect } from "react"

const HojaVida = ({ setCurrentPage }) => {
  const [hojasVida, setHojasVida] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [temaOscuro, setTemaOscuro] = useState(false)

  useEffect(() => {
    cargarHojasVida()
  }, [])

  useEffect(() => {
    if (temaOscuro) {
      document.body.classList.add("dark")
    } else {
      document.body.classList.remove("dark")
    }
  }, [temaOscuro])

  const cargarHojasVida = () => {
    setTimeout(() => {
      setHojasVida([
        {
          Id_Hoja_vida_equipo: 1,
          Marca_Equipo: "Dell Inspiron",
          Estado_Entregado: "Bueno",
          Estado_Recibido: "Excelente",
          Nombre_Usuario_1: "Juan",
          Apellidos_Usuario_1: "Pérez",
          Fecha_ingreso: "2024-01-15",
        },
        {
          Id_Hoja_vida_equipo: 2,
          Marca_Equipo: "HP Pavilion",
          Estado_Entregado: "Regular",
          Estado_Recibido: "Bueno",
          Nombre_Usuario_1: "María",
          Apellidos_Usuario_1: "García",
          Fecha_ingreso: "2024-01-18",
        },
      ])
      setLoading(false)
    }, 1000)
  }

  const filteredHojasVida = hojasVida.filter((hoja) =>
    Object.values(hoja).some((value) => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())),
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
                <span>Hojas de Vida</span>
              </div>
              <div className="nav-link-back">
                <i className="fas fa-file-alt nav-icon lifecycle-icon"></i>
                <span>Hojas de Vida</span>
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
            <h1>Hojas de Vida de Equipos</h1>
            <p>Gestión de hojas de vida de equipos</p>
          </div>
          <div className="user-profile">
            <div className="user-avatar">A</div>
            <div className="user-info">
              <div className="user-name">Admin</div>
              <div className="user-role">Rol: Administrador</div>
            </div>
          </div>
        </div>

        <section className="hoja-vida-panel">
          <div className="panel-header">
            <h2>Hojas de Vida de Equipos</h2>
            <div className="panel-actions">
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Buscar hoja de vida..."
                  className="search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <i className="fas fa-search search-icon"></i>
              </div>
              <button className="action-button add-button">
                <i className="fas fa-plus"></i> Nueva Hoja de Vida
              </button>
            </div>
          </div>

          <div id="printable" className="table-responsive">
            <table className="data-table">
              <caption>Lista de Hojas de Vida Registradas</caption>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Equipo</th>
                  <th>Estado Entregado</th>
                  <th>Estado Recibido</th>
                  <th>Usuario</th>
                  <th>Fecha de Ingreso</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="loading-message">
                      <div className="loading-spinner"></div>
                      <span>Cargando datos...</span>
                    </td>
                  </tr>
                ) : filteredHojasVida.length > 0 ? (
                  filteredHojasVida.map((hoja) => (
                    <tr key={hoja.Id_Hoja_vida_equipo}>
                      <td>{hoja.Id_Hoja_vida_equipo}</td>
                      <td>{hoja.Marca_Equipo || "N/A"}</td>
                      <td>{hoja.Estado_Entregado || "N/A"}</td>
                      <td>{hoja.Estado_Recibido || "N/A"}</td>
                      <td>{`${hoja.Nombre_Usuario_1} ${hoja.Apellidos_Usuario_1}` || "N/A"}</td>
                      <td>{hoja.Fecha_ingreso || "N/A"}</td>
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
                    <td colSpan="7" className="no-data">
                      No hay hojas de vida registradas
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

export default HojaVida
