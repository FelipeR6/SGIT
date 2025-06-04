"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import '../assets/css/inicio.css'
import '../assets/css/tablas.css'
import '../assets/css/modal.css'

const Perfil = ({  }) => {
  const [temaOscuro, setTemaOscuro] = useState(true)
  const [editando, setEditando] = useState(false)
  const navigate = useNavigate()
  const [usuario, setUsuario] = useState({
    nombre: "Juan Pérez",
    email: "juan.perez@sgit.com",
    telefono: "+57 300 123 4567",
    cargo: "Administrador",
    departamento: "Tecnología",
    fechaIngreso: "2023-01-15",
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
    setUsuario((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setEditando(false)
    alert("Información actualizada correctamente.")
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
            <h1>Perfil</h1>
            <p>Información personal y configuración</p>
          </div>
          <div className="user-profile">
            <div className="user-avatar">A</div>
            <div className="user-info">
              <div className="user-name">Admin</div>
              <div className="user-role">Rol: Administrador (ID: 1)</div>
            </div>
          </div>
        </div>

        <section className="profile" style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
          <div className="profile-header" style={{ textAlign: "center", marginBottom: "40px" }}>
            <div
              className="user-avatar"
              style={{
                width: "120px",
                height: "120px",
                fontSize: "3rem",
                margin: "0 auto 20px",
                backgroundColor: "var(--icon-color-blue)",
                color: "white",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {usuario.nombre.charAt(0).toUpperCase()}
            </div>
            <h2 style={{ color: "var(--foreground)", marginBottom: "10px" }}>Bienvenido, {usuario.nombre}</h2>
            <p style={{ color: "var(--muted-foreground)", fontSize: "1.1rem" }}>
              {usuario.cargo} - {usuario.departamento}
            </p>
          </div>

          <div className="profile-info">
            <div className="card" style={{ padding: "30px", borderRadius: "15px", boxShadow: "var(--card-shadow)" }}>
              <div
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}
              >
                <h3 style={{ color: "var(--foreground)", margin: 0 }}>
                  <i className="fas fa-user-edit" style={{ marginRight: "10px" }}></i>
                  Información Personal
                </h3>
                {!editando && (
                  <button
                    type="button"
                    className="action-button add-button"
                    onClick={() => setEditando(true)}
                    style={{ padding: "8px 16px" }}
                  >
                    <i className="fas fa-edit"></i> Editar
                  </button>
                )}
              </div>

              <form onSubmit={handleSubmit}>
                <div
                  className="row"
                  style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}
                >
                  <div className="form-group">
                    <label style={{ display: "block", marginBottom: "8px", fontWeight: "500" }}>
                      <i className="fas fa-user" style={{ marginRight: "8px" }}></i>
                      Nombre Completo:
                    </label>
                    <input
                      type="text"
                      name="nombre"
                      value={usuario.nombre}
                      onChange={handleInputChange}
                      disabled={!editando}
                      style={{
                        width: "100%",
                        padding: "12px",
                        border: "1px solid var(--border)",
                        borderRadius: "8px",
                        backgroundColor: editando ? "var(--background)" : "var(--muted-background)",
                        color: "var(--foreground)",
                      }}
                    />
                  </div>

                  <div className="form-group">
                    <label style={{ display: "block", marginBottom: "8px", fontWeight: "500" }}>
                      <i className="fas fa-envelope" style={{ marginRight: "8px" }}></i>
                      Correo Electrónico:
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={usuario.email}
                      onChange={handleInputChange}
                      disabled={!editando}
                      style={{
                        width: "100%",
                        padding: "12px",
                        border: "1px solid var(--border)",
                        borderRadius: "8px",
                        backgroundColor: editando ? "var(--background)" : "var(--muted-background)",
                        color: "var(--foreground)",
                      }}
                    />
                  </div>
                </div>

                <div
                  className="row"
                  style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}
                >
                  <div className="form-group">
                    <label style={{ display: "block", marginBottom: "8px", fontWeight: "500" }}>
                      <i className="fas fa-phone" style={{ marginRight: "8px" }}></i>
                      Teléfono:
                    </label>
                    <input
                      type="tel"
                      name="telefono"
                      value={usuario.telefono}
                      onChange={handleInputChange}
                      disabled={!editando}
                      style={{
                        width: "100%",
                        padding: "12px",
                        border: "1px solid var(--border)",
                        borderRadius: "8px",
                        backgroundColor: editando ? "var(--background)" : "var(--muted-background)",
                        color: "var(--foreground)",
                      }}
                    />
                  </div>

                  <div className="form-group">
                    <label style={{ display: "block", marginBottom: "8px", fontWeight: "500" }}>
                      <i className="fas fa-briefcase" style={{ marginRight: "8px" }}></i>
                      Cargo:
                    </label>
                    <input
                      type="text"
                      name="cargo"
                      value={usuario.cargo}
                      disabled={true}
                      style={{
                        width: "100%",
                        padding: "12px",
                        border: "1px solid var(--border)",
                        borderRadius: "8px",
                        backgroundColor: "var(--muted-background)",
                        color: "var(--muted-foreground)",
                      }}
                    />
                  </div>
                </div>

                <div
                  className="row"
                  style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "30px" }}
                >
                  <div className="form-group">
                    <label style={{ display: "block", marginBottom: "8px", fontWeight: "500" }}>
                      <i className="fas fa-building" style={{ marginRight: "8px" }}></i>
                      Departamento:
                    </label>
                    <input
                      type="text"
                      name="departamento"
                      value={usuario.departamento}
                      disabled={true}
                      style={{
                        width: "100%",
                        padding: "12px",
                        border: "1px solid var(--border)",
                        borderRadius: "8px",
                        backgroundColor: "var(--muted-background)",
                        color: "var(--muted-foreground)",
                      }}
                    />
                  </div>

                  <div className="form-group">
                    <label style={{ display: "block", marginBottom: "8px", fontWeight: "500" }}>
                      <i className="fas fa-calendar" style={{ marginRight: "8px" }}></i>
                      Fecha de Ingreso:
                    </label>
                    <input
                      type="date"
                      name="fechaIngreso"
                      value={usuario.fechaIngreso}
                      disabled={true}
                      style={{
                        width: "100%",
                        padding: "12px",
                        border: "1px solid var(--border)",
                        borderRadius: "8px",
                        backgroundColor: "var(--muted-background)",
                        color: "var(--muted-foreground)",
                      }}
                    />
                  </div>
                </div>

                {editando && (
                  <div className="form-actions" style={{ display: "flex", gap: "15px", justifyContent: "flex-end" }}>
                    <button
                      type="button"
                      className="cancel-button"
                      onClick={() => setEditando(false)}
                      style={{
                        padding: "12px 24px",
                        border: "1px solid var(--border)",
                        borderRadius: "8px",
                        backgroundColor: "var(--background)",
                        color: "var(--foreground)",
                        cursor: "pointer",
                      }}
                    >
                      <i className="fas fa-times" style={{ marginRight: "8px" }}></i>
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="submit-button"
                      style={{
                        padding: "12px 24px",
                        border: "none",
                        borderRadius: "8px",
                        backgroundColor: "var(--icon-color-blue)",
                        color: "white",
                        cursor: "pointer",
                        fontWeight: "500",
                      }}
                    >
                      <i className="fas fa-save" style={{ marginRight: "8px" }}></i>
                      Guardar Cambios
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Perfil
