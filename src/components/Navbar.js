"use client"
import logo from "../assets/imagenes/logo.png"

function Navbar({ setCurrentPage }) {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="#" onClick={() => setCurrentPage("home")}>
          <img src={logo || "/placeholder.svg"} className="img-fluid" style={{ width: "80px" }} alt="Logo" />
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={() => setCurrentPage("home")}>
                Inicio
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Servicios
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Contacto
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
