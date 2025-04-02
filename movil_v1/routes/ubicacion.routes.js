const express = require("express")
const router = express.Router()
const db = require("../config/db")

// Obtener todas las ubicaciones
router.get("/", async (req, res) => {
  try {
    const ubicaciones = await db.query("SELECT * FROM ubicacion")
    res.json({
      success: true,
      data: ubicaciones,
    })
  } catch (error) {
    console.error("Error al obtener ubicaciones:", error)
    res.status(500).json({
      success: false,
      message: "Error al obtener ubicaciones",
      error: error.message,
    })
  }
})

// Obtener una ubicación por ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const ubicacion = await db.query("SELECT * FROM ubicacion WHERE Id_Ubicacion = ?", [id])

    if (ubicacion.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Ubicación no encontrada",
      })
    }

    res.json({
      success: true,
      data: ubicacion[0],
    })
  } catch (error) {
    console.error("Error al obtener ubicación:", error)
    res.status(500).json({
      success: false,
      message: "Error al obtener ubicación",
      error: error.message,
    })
  }
})

// Crear una nueva ubicación
router.post("/", async (req, res) => {
  try {
    const { Nombre_Ubicacion, Prestamo_disponible } = req.body

    if (!Nombre_Ubicacion) {
      return res.status(400).json({
        success: false,
        message: "El nombre de la ubicación es requerido",
      })
    }

    // Valor por defecto para Prestamo_disponible si no se proporciona
    const prestamo = Prestamo_disponible || "No"

    const result = await db.query("INSERT INTO ubicacion (Nombre_Ubicacion, Prestamo_disponible) VALUES (?, ?)", [
      Nombre_Ubicacion,
      prestamo,
    ])

    res.status(201).json({
      success: true,
      message: "Ubicación creada correctamente",
      data: {
        Id_Ubicacion: result.insertId,
        Nombre_Ubicacion,
        Prestamo_disponible: prestamo,
      },
    })
  } catch (error) {
    console.error("Error al crear ubicación:", error)
    res.status(500).json({
      success: false,
      message: "Error al crear ubicación",
      error: error.message,
    })
  }
})

// Actualizar una ubicación
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const { Nombre_Ubicacion, Prestamo_disponible } = req.body

    if (!Nombre_Ubicacion) {
      return res.status(400).json({
        success: false,
        message: "El nombre de la ubicación es requerido",
      })
    }

    // Valor por defecto para Prestamo_disponible si no se proporciona
    const prestamo = Prestamo_disponible || "No"

    const result = await db.query(
      "UPDATE ubicacion SET Nombre_Ubicacion = ?, Prestamo_disponible = ? WHERE Id_Ubicacion = ?",
      [Nombre_Ubicacion, prestamo, id],
    )

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Ubicación no encontrada",
      })
    }

    res.json({
      success: true,
      message: "Ubicación actualizada correctamente",
      data: {
        Id_Ubicacion: id,
        Nombre_Ubicacion,
        Prestamo_disponible: prestamo,
      },
    })
  } catch (error) {
    console.error("Error al actualizar ubicación:", error)
    res.status(500).json({
      success: false,
      message: "Error al actualizar ubicación",
      error: error.message,
    })
  }
})

// Eliminar una ubicación
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params

    // Verificar si hay préstamos asociados a esta ubicación
    const prestamosAsociados = await db.query("SELECT COUNT(*) as count FROM prestamo_equipo WHERE Id_Ubicacion = ?", [
      id,
    ])

    if (prestamosAsociados[0].count > 0) {
      return res.status(400).json({
        success: false,
        message: "No se puede eliminar la ubicación porque tiene préstamos asociados",
      })
    }

    const result = await db.query("DELETE FROM ubicacion WHERE Id_Ubicacion = ?", [id])

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Ubicación no encontrada",
      })
    }

    res.json({
      success: true,
      message: "Ubicación eliminada correctamente",
    })
  } catch (error) {
    console.error("Error al eliminar ubicación:", error)
    res.status(500).json({
      success: false,
      message: "Error al eliminar ubicación",
      error: error.message,
    })
  }
})

module.exports = router

