"use client"

import { useState, useEffect } from "react"

const PQRS = ({ setCurrentPage }) => {
  const [temaOscuro, setTemaOscuro] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    pqrsType: "",
    message: "",
  })

  useEffect(() => {
    if (temaOscuro) {
      document.body.classList.add("dark")
    } else {
      document.body.classList.remove("dark")
    }
  }, [temaOscuro])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert("Formulario enviado exitosamente.")
    setFormData({
      name: "",
      email: "",
      pqrsType: "",
      message: "",
    })
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
            <h1>PQRS</h1>
            <p>Envía tus Peticiones, Quejas, Reclamos o Sugerencias</p>
          </div>
          <div className="user-profile">
            <div className="user-avatar">A</div>
            <div className="user-info">
              <div className="user-name">Admin</div>
              <div className="user-role">Rol: Administrador (ID: 1)</div>
            </div>
          </div>
        </div>

        <section className="form-container" style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
          <div
            className="card"
            style={{ padding: "30px", borderRadius: "15px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
          >
            <div className="card-header" style={{ marginBottom: "30px", textAlign: "center" }}>
              <h2 style={{ color: "var(--foreground)", marginBottom: "10px" }}>
                <i className="fas fa-comment-dots" style={{ marginRight: "10px" }}></i>
                Formulario PQRS
              </h2>
              <p style={{ color: "var(--muted-foreground)" }}>
                Comparte tus peticiones, quejas, reclamos o sugerencias con nosotros
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group" style={{ marginBottom: "20px" }}>
                <label htmlFor="name" style={{ display: "block", marginBottom: "8px", fontWeight: "500" }}>
                  <i className="fas fa-user" style={{ marginRight: "8px" }}></i>
                  Nombre Completo:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Ej. Juan Pérez"
                  required
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    backgroundColor: "var(--background)",
                    color: "var(--foreground)",
                  }}
                />
              </div>

              <div className="form-group" style={{ marginBottom: "20px" }}>
                <label htmlFor="email" style={{ display: "block", marginBottom: "8px", fontWeight: "500" }}>
                  <i className="fas fa-envelope" style={{ marginRight: "8px" }}></i>
                  Correo Electrónico:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Ej. correo@ejemplo.com"
                  required
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    backgroundColor: "var(--background)",
                    color: "var(--foreground)",
                  }}
                />
              </div>

              <div className="form-group" style={{ marginBottom: "20px" }}>
                <label htmlFor="pqrsType" style={{ display: "block", marginBottom: "8px", fontWeight: "500" }}>
                  <i className="fas fa-list" style={{ marginRight: "8px" }}></i>
                  Tipo de PQRS:
                </label>
                <select
                  id="pqrsType"
                  name="pqrsType"
                  value={formData.pqrsType}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    backgroundColor: "var(--background)",
                    color: "var(--foreground)",
                  }}
                >
                  <option value="">Seleccione una opción</option>
                  <option value="peticion">Petición</option>
                  <option value="queja">Queja</option>
                  <option value="reclamo">Reclamo</option>
                  <option value="sugerencia">Sugerencia</option>
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: "30px" }}>
                <label htmlFor="message" style={{ display: "block", marginBottom: "8px", fontWeight: "500" }}>
                  <i className="fas fa-comment" style={{ marginRight: "8px" }}></i>
                  Mensaje:
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Escribe tu mensaje aquí..."
                  required
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    backgroundColor: "var(--background)",
                    color: "var(--foreground)",
                    resize: "vertical",
                    minHeight: "120px",
                  }}
                />
              </div>

              <button
                type="submit"
                className="cta-btn"
                style={{
                  width: "100%",
                  padding: "15px",
                  backgroundColor: "var(--icon-color-blue)",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                <i className="fas fa-paper-plane" style={{ marginRight: "8px" }}></i>
                Enviar PQRS
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  )
}

export default PQRS
