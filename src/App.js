"use client"

import { useState } from "react"
import "./index.css"
import "./assets/css/inicio.css"
import "./assets/css/stats-cards.css"
import "./assets/css/tablas.css"
import "./assets/css/modal.css"
import "./assets/css/crud.css"

import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Features from "./components/Features"
import CTA from "./components/CTA"
import Footer from "./components/Footer"
import InicioDashboard from "./pages/inicioDashboard.jsx"
import Inventario from "./pages/Inventario"
import Mantenimiento from "./pages/Mantenimiento"
import Administracion from "./pages/Administracion"
import Prestamo from "./pages/Prestamo"
import Perfil from "./pages/Perfil"
import Consultar from "./pages/Consultar"
import Historial from "./pages/Historial"
import PQRS from "./pages/PQRS"
import Registros from "./pages/Registros"
import HojaVida from "./pages/HojaVida"
import Auditoria from "./pages/Auditoria"

function App() {
  const [currentPage, setCurrentPage] = useState("home")

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <InicioDashboard setCurrentPage={setCurrentPage} />
      case "inventario":
        return <Inventario setCurrentPage={setCurrentPage} />
      case "mantenimiento":
        return <Mantenimiento setCurrentPage={setCurrentPage} />
      case "administracion":
        return <Administracion setCurrentPage={setCurrentPage} />
      case "prestamo":
        return <Prestamo setCurrentPage={setCurrentPage} />
      case "perfil":
        return <Perfil setCurrentPage={setCurrentPage} />
      case "consultar":
        return <Consultar setCurrentPage={setCurrentPage} />
      case "historial":
        return <Historial setCurrentPage={setCurrentPage} />
      case "pqrs":
        return <PQRS setCurrentPage={setCurrentPage} />
      case "registros":
        return <Registros setCurrentPage={setCurrentPage} />
      case "hojavida":
        return <HojaVida setCurrentPage={setCurrentPage} />
      case "auditoria":
        return <Auditoria setCurrentPage={setCurrentPage} />
      case "home":
      default:
        return (
          <>
            <Navbar setCurrentPage={setCurrentPage} />
            <Hero />
            <Features />
            <CTA setCurrentPage={setCurrentPage} />
            <Footer />
          </>
        )
    }
  }

  return <div className="App">{renderPage()}</div>
}

export default App
