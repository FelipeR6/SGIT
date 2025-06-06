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
        message: `No se encontró ubicación con ID ${id}`,
      })
    }

    res.json({
      success: true,
      data: ubicacion[0],
    })
  } catch (error) {
    console.error(`Error al obtener ubicación con ID ${req.params.id}:`, error)
    res.status(500).json({
      success: false,
      message: `Error al obtener ubicación con ID ${req.params.id}`,
      error: error.message,
    })
  }
})

// Crear una nueva ubicación
router.post("/", async (req, res) => {
  try {
    const nuevaUbicacion = req.body
    const result = await db.query("INSERT INTO ubicacion SET ?", [nuevaUbicacion])

    res.status(201).json({
      success: true,
      message: "Ubicación creada correctamente",
      data: {
        id: result.insertId,
        ...nuevaUbicacion,
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
    const ubicacionActualizada = req.body

    const result = await db.query("UPDATE ubicacion SET ? WHERE Id_Ubicacion = ?", [ubicacionActualizada, id])

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: `No se encontró ubicación con ID ${id}`,
      })
    }

    res.json({
      success: true,
      message: `Ubicación con ID ${id} actualizada correctamente`,
      data: {
        id,
        ...ubicacionActualizada,
      },
    })
  } catch (error) {
    console.error(`Error al actualizar ubicación con ID ${req.params.id}:`, error)
    res.status(500).json({
      success: false,
      message: `Error al actualizar ubicación con ID ${req.params.id}`,
      error: error.message,
    })
  }
})

// Eliminar una ubicación
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params

    const result = await db.query("DELETE FROM ubicacion WHERE Id_Ubicacion = ?", [id])

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: `No se encontró ubicación con ID ${id}`,
      })
    }

    res.json({
      success: true,
      message: `Ubicación con ID ${id} eliminada correctamente`,
    })
  } catch (error) {
    console.error(`Error al eliminar ubicación con ID ${req.params.id}:`, error)
    res.status(500).json({
      success: false,
      message: `Error al eliminar ubicación con ID ${req.params.id}`,
      error: error.message,
    })
  }
})

module.exports = router
