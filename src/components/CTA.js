"use client"

function CTA({ setCurrentPage }) {
  return (
    <section className="cta py-5 bg-primary text-white">
      <div className="container text-center">
        <h2 className="mb-4">¿Listo para comenzar?</h2>
        <p className="lead mb-4">
          Únete a nuestro sistema de gestión de inventarios y optimiza tus procesos tecnológicos.
        </p>
        <button className="btn btn-light btn-lg" onClick={() => setCurrentPage("dashboard")}>
          Comenzar Ahora
        </button>
      </div>
    </section>
  )
}

export default CTA
