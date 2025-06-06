const express = require("express")
const router = express.Router()
const db = require("../config/db")

// Obtener todos los equipos
router.get("/", async (req, res) => {
  try {
    const equipos = await db.query(`
      SELECT e.*, c.Nombre_Categoria, m.Caracteristicas_Modelo, m.Accesorios_Modelo,
      u.Nombre_Usuario_1, u.Apellidos_Usuario_1, ee.Estado_Entregado, ee.Estado_Recibido
      FROM equipo e
      LEFT JOIN categoria c ON e.Id_Categoria = c.Id_Categoria
      LEFT JOIN modelo m ON e.Id_Modelo = m.Id_Modelo
      LEFT JOIN usuario u ON e.Id_Usuario = u.Id_Usuario
      LEFT JOIN estado_equipo ee ON e.Id_Equipos = ee.Id_Equipos
    `)

    res.json({
      success: true,
      data: equipos,
    })
  } catch (error) {
    console.error("Error al obtener equipos:", error)
    res.status(500).json({
      success: false,
      message: "Error al obtener equipos",
      error: error.message,
    })
  }
})

// Obtener un equipo por ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params

    // Obtener información básica del equipo
    const equipo = await db.query(
      `
      SELECT e.*, c.Nombre_Categoria, m.Caracteristicas_Modelo, m.Accesorios_Modelo,
      u.Nombre_Usuario_1, u.Apellidos_Usuario_1, ee.Estado_Entregado, ee.Estado_Recibido
      FROM equipo e
      LEFT JOIN categoria c ON e.Id_Categoria = c.Id_Categoria
      LEFT JOIN modelo m ON e.Id_Modelo = m.Id_Modelo
      LEFT JOIN usuario u ON e.Id_Usuario = u.Id_Usuario
      LEFT JOIN estado_equipo ee ON e.Id_Equipos = ee.Id_Equipos
      WHERE e.Id_Equipos = ?
    `,
      [id],
    )

    if (equipo.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No se encontró equipo con ID ${id}`,
      })
    }

    // Obtener mantenimientos del equipo
    const mantenimientos = await db.query(
      `
      SELECT m.*, u.Nombre_Usuario_1, u.Apellidos_Usuario_1
      FROM mantenimiento m
      LEFT JOIN usuario u ON m.Id_Usuario = u.Id_Usuario
      WHERE m.Id_Equipos = ?
    `,
      [id],
    )

    // Obtener préstamos del equipo
    const prestamos = await db.query(
      `
      SELECT p.*, u.Nombre_Usuario_1, u.Apellidos_Usuario_1, ub.Nombre_Ubicacion
      FROM prestamo_equipo p
      LEFT JOIN usuario u ON p.Id_Usuario = u.Id_Usuario
      LEFT JOIN ubicacion ub ON p.Id_Ubicacion = ub.Id_Ubicacion
      WHERE p.Id_Equipos = ?
    `,
      [id],
    )

    // Combinar toda la información
    const equipoCompleto = {
      ...equipo[0],
      mantenimientos,
      prestamos,
    }

    res.json({
      success: true,
      data: equipoCompleto,
    })
  } catch (error) {
    console.error(`Error al obtener equipo con ID ${req.params.id}:`, error)
    res.status(500).json({
      success: false,
      message: `Error al obtener equipo con ID ${req.params.id}`,
      error: error.message,
    })
  }
})

// Crear un nuevo equipo
router.post("/", async (req, res) => {
  try {
    const nuevoEquipo = req.body
    const result = await db.query("INSERT INTO equipo SET ?", [nuevoEquipo])

    res.status(201).json({
      success: true,
      message: "Equipo creado correctamente",
      data: {
        id: result.insertId,
        ...nuevoEquipo,
      },
    })
  } catch (error) {
    console.error("Error al crear equipo:", error)
    res.status(500).json({
      success: false,
      message: "Error al crear equipo",
      error: error.message,
    })
  }
})

// Actualizar un equipo
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const equipoActualizado = req.body

    const result = await db.query("UPDATE equipo SET ? WHERE Id_Equipos = ?", [equipoActualizado, id])

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: `No se encontró equipo con ID ${id}`,
      })
    }

    res.json({
      success: true,
      message: `Equipo con ID ${id} actualizado correctamente`,
      data: {
        id,
        ...equipoActualizado,
      },
    })
  } catch (error) {
    console.error(`Error al actualizar equipo con ID ${req.params.id}:`, error)
    res.status(500).json({
      success: false,
      message: `Error al actualizar equipo con ID ${req.params.id}`,
      error: error.message,
    })
  }
})

// Eliminar un equipo
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params

    const result = await db.query("DELETE FROM equipo WHERE Id_Equipos = ?", [id])

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: `No se encontró equipo con ID ${id}`,
      })
    }

    res.json({
      success: true,
      message: `Equipo con ID ${id} eliminado correctamente`,
    })
  } catch (error) {
    console.error(`Error al eliminar equipo con ID ${req.params.id}:`, error)
    res.status(500).json({
      success: false,
      message: `Error al eliminar equipo con ID ${req.params.id}`,
      error: error.message,
    })
  }
})

module.exports = router
