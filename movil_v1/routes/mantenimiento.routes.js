const express = require("express")
const router = express.Router()
const db = require("../config/db")

// Obtener todos los mantenimientos
router.get("/", async (req, res) => {
  try {
    const query = `
      SELECT m.*, e.Marca_Equipo, u.Nombre_Usuario_1, u.Apellidos_Usuario_1
      FROM mantenimiento m
      JOIN equipo e ON m.Id_Equipos = e.Id_Equipos
      JOIN usuario u ON m.Id_Usuario = u.Id_Usuario
    `

    const mantenimientos = await db.query(query)

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

    const query = `
      SELECT m.*, e.Marca_Equipo, u.Nombre_Usuario_1, u.Apellidos_Usuario_1
      FROM mantenimiento m
      JOIN equipo e ON m.Id_Equipos = e.Id_Equipos
      JOIN usuario u ON m.Id_Usuario = u.Id_Usuario
      WHERE m.Id_Mantenimiento = ?
    `

    const mantenimiento = await db.query(query, [id])

    if (mantenimiento.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Mantenimiento no encontrado",
      })
    }

    res.json({
      success: true,
      data: mantenimiento[0],
    })
  } catch (error) {
    console.error("Error al obtener mantenimiento:", error)
    res.status(500).json({
      success: false,
      message: "Error al obtener mantenimiento",
      error: error.message,
    })
  }
})

// Crear un nuevo mantenimiento
router.post("/", async (req, res) => {
  try {
    const { Fecha_Inicio_mantenimiento, Fecha_fin_mantenimiento, Observaciones, Id_Equipos, Id_Usuario } = req.body

    // Validar datos
    if (!Fecha_Inicio_mantenimiento || !Fecha_fin_mantenimiento || !Observaciones || !Id_Equipos || !Id_Usuario) {
      return res.status(400).json({
        success: false,
        message: "Todos los campos son requeridos",
      })
    }

    const result = await db.query(
      "INSERT INTO mantenimiento (Fecha_Inicio_mantenimiento, Fecha_fin_mantenimiento, Observaciones, Id_Equipos, Id_Usuario) VALUES (?, ?, ?, ?, ?)",
      [Fecha_Inicio_mantenimiento, Fecha_fin_mantenimiento, Observaciones, Id_Equipos, Id_Usuario],
    )

    res.status(201).json({
      success: true,
      message: "Mantenimiento creado correctamente",
      data: {
        Id_Mantenimiento: result.insertId,
        ...req.body,
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
    const { Fecha_Inicio_mantenimiento, Fecha_fin_mantenimiento, Observaciones, Id_Equipos, Id_Usuario } = req.body

    // Validar datos
    if (!Fecha_Inicio_mantenimiento || !Fecha_fin_mantenimiento || !Observaciones || !Id_Equipos || !Id_Usuario) {
      return res.status(400).json({
        success: false,
        message: "Todos los campos son requeridos",
      })
    }

    const result = await db.query(
      "UPDATE mantenimiento SET Fecha_Inicio_mantenimiento = ?, Fecha_fin_mantenimiento = ?, Observaciones = ?, Id_Equipos = ?, Id_Usuario = ? WHERE Id_Mantenimiento = ?",
      [Fecha_Inicio_mantenimiento, Fecha_fin_mantenimiento, Observaciones, Id_Equipos, Id_Usuario, id],
    )

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Mantenimiento no encontrado",
      })
    }

    res.json({
      success: true,
      message: "Mantenimiento actualizado correctamente",
      data: {
        Id_Mantenimiento: id,
        ...req.body,
      },
    })
  } catch (error) {
    console.error("Error al actualizar mantenimiento:", error)
    res.status(500).json({
      success: false,
      message: "Error al actualizar mantenimiento",
      error: error.message,
    })
  }
})

// Eliminar un mantenimiento
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params

    const result = await db.query("DELETE FROM mantenimiento WHERE Id_Mantenimiento = ?", [id])

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Mantenimiento no encontrado",
      })
    }

    res.json({
      success: true,
      message: "Mantenimiento eliminado correctamente",
    })
  } catch (error) {
    console.error("Error al eliminar mantenimiento:", error)
    res.status(500).json({
      success: false,
      message: "Error al eliminar mantenimiento",
      error: error.message,
    })
  }
})

module.exports = router

