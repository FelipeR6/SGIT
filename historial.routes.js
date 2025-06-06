const express = require("express")
const router = express.Router()
const db = require("../database/db")

// Obtener todo el historial
router.get("/", async (req, res) => {
  try {
    // Consulta que combina información de préstamos, mantenimientos y otros eventos
    const [historialPrestamos] = await db.execute(`
      SELECT 
        p.Id_Prestamo_Equipo as Id,
        p.Fecha_Prestamo_Equipo as Fecha,
        CONCAT(u.Nombre_Usuario_1, ' ', u.Apellidos_Usuario_1) as Usuario,
        e.Marca_Equipo as Equipo,
        CONCAT('Préstamo del equipo ', e.Marca_Equipo) as Accion,
        'prestamo' as Tipo
      FROM prestamo_equipo p
      LEFT JOIN usuario u ON p.Id_Usuario = u.Id_Usuario
      LEFT JOIN equipo e ON p.Id_Equipos = e.Id_Equipos
      ORDER BY p.Fecha_Prestamo_Equipo DESC
      LIMIT 50
    `)

    const [historialMantenimientos] = await db.execute(`
      SELECT 
        m.Id_Mantenimiento as Id,
        m.Fecha_Inicio_mantenimiento as Fecha,
        CONCAT(u.Nombre_Usuario_1, ' ', u.Apellidos_Usuario_1) as Usuario,
        e.Marca_Equipo as Equipo,
        CONCAT('Mantenimiento del equipo ', e.Marca_Equipo) as Accion,
        'mantenimiento' as Tipo
      FROM mantenimiento m
      LEFT JOIN usuario u ON m.Id_Usuario = u.Id_Usuario
      LEFT JOIN equipo e ON m.Id_Equipos = e.Id_Equipos
      ORDER BY m.Fecha_Inicio_mantenimiento DESC
      LIMIT 50
    `)

    // Combinar los resultados
    const historialCombinado = [...historialPrestamos, ...historialMantenimientos].sort((a, b) => {
      return new Date(b.Fecha) - new Date(a.Fecha)
    })

    res.json({
      success: true,
      data: historialCombinado,
    })
  } catch (error) {
    console.error("Error al obtener historial:", error)
    res.status(500).json({
      success: false,
      message: "Error al obtener historial",
      error: error.message,
    })
  }
})

module.exports = router
