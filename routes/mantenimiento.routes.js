const express = require("express")
const router = express.Router()
const db = require("../database/db")

// Obtener todos los mantenimientos
router.get("/", async (req, res) => {
  try {
    const [mantenimientos] = await db.execute(`
      SELECT m.*, e.Marca_Equipo, u.Nombre_Usuario_1, u.Apellidos_Usuario_1
      FROM mantenimiento m
      LEFT JOIN equipo e ON m.Id_Equipos = e.Id_Equipos
      LEFT JOIN usuario u ON m.Id_Usuario = u.Id_Usuario
    `)

    res.json({
      success: true,
      data: mantenimientos,
    })
  } catch (error) {
    console.error("Error al obtener mantenimientos:", error)
    res.status(500).json({
      success: false,
      message: "Error al obtener mantenimientos",
      error: error.message,
    })
  }
})

// Obtener un mantenimiento por ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params

    const [mantenimiento] = await db.execute(
      `
      SELECT m.*, e.Marca_Equipo, u.Nombre_Usuario_1, u.Apellidos_Usuario_1
      FROM mantenimiento m
      LEFT JOIN equipo e ON m.Id_Equipos = e.Id_Equipos
      LEFT JOIN usuario u ON m.Id_Usuario = u.Id_Usuario
      WHERE m.Id_Mantenimiento = ?
    `,
      [id],
    )

    if (mantenimiento.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No se encontró mantenimiento con ID ${id}`,
      })
    }

    res.json({
      success: true,
      data: mantenimiento[0],
    })
  } catch (error) {
    console.error(`Error al obtener mantenimiento con ID ${req.params.id}:`, error)
    res.status(500).json({
      success: false,
      message: `Error al obtener mantenimiento con ID ${req.params.id}`,
      error: error.message,
    })
  }
})

// Crear un nuevo mantenimiento
router.post("/", async (req, res) => {
  try {
    const nuevoMantenimiento = req.body
    const [result] = await db.execute("INSERT INTO mantenimiento SET ?", [nuevoMantenimiento])

    res.status(201).json({
      success: true,
      message: "Mantenimiento creado correctamente",
      data: {
        id: result.insertId,
        ...nuevoMantenimiento,
      },
    })
  } catch (error) {
    console.error("Error al crear mantenimiento:", error)
    res.status(500).json({
      success: false,
      message: "Error al crear mantenimiento",
      error: error.message,
    })
  }
})

// Actualizar un mantenimiento
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const mantenimientoActualizado = req.body

    const [result] = await db.execute("UPDATE mantenimiento SET ? WHERE Id_Mantenimiento = ?", [
      mantenimientoActualizado,
      id,
    ])

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: `No se encontró mantenimiento con ID ${id}`,
      })
    }

    res.json({
      success: true,
      message: `Mantenimiento con ID ${id} actualizado correctamente`,
      data: {
        id,
        ...mantenimientoActualizado,
      },
    })
  } catch (error) {
    console.error(`Error al actualizar mantenimiento con ID ${req.params.id}:`, error)
    res.status(500).json({
      success: false,
      message: `Error al actualizar mantenimiento con ID ${req.params.id}`,
      error: error.message,
    })
  }
})

// Eliminar un mantenimiento
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params

    const [result] = await db.execute("DELETE FROM mantenimiento WHERE Id_Mantenimiento = ?", [id])

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: `No se encontró mantenimiento con ID ${id}`,
      })
    }

    res.json({
      success: true,
      message: `Mantenimiento con ID ${id} eliminado correctamente`,
    })
  } catch (error) {
    console.error(`Error al eliminar mantenimiento con ID ${req.params.id}:`, error)
    res.status(500).json({
      success: false,
      message: `Error al eliminar mantenimiento con ID ${req.params.id}`,
      error: error.message,
    })
  }
})

module.exports = router
