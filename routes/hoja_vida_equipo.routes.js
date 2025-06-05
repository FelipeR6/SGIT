const express = require("express")
const router = express.Router()
const db = require("../database/db")

// Obtener todas las hojas de vida
router.get("/", async (req, res) => {
  try {
    const [hojasVida] = await db.execute(`
      SELECT hv.*, e.Marca_Equipo, u.Nombre_Usuario_1, u.Apellidos_Usuario_1,
      ee.Estado_Entregado, ee.Estado_Recibido
      FROM hoja_vida_equipo hv
      LEFT JOIN equipo e ON hv.Id_Equipos = e.Id_Equipos
      LEFT JOIN usuario u ON hv.Id_usuario = u.Id_Usuario
      LEFT JOIN estado_equipo ee ON e.Id_Equipos = ee.Id_Equipos
    `)

    res.json({
      success: true,
      data: hojasVida,
    })
  } catch (error) {
    console.error("Error al obtener hojas de vida:", error)
    res.status(500).json({
      success: false,
      message: "Error al obtener hojas de vida",
      error: error.message,
    })
  }
})

// Obtener una hoja de vida por ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params

    const [hojaVida] = await db.execute(
      `
      SELECT hv.*, e.Marca_Equipo, u.Nombre_Usuario_1, u.Apellidos_Usuario_1
      FROM hoja_vida_equipo hv
      LEFT JOIN equipo e ON hv.Id_Equipos = e.Id_Equipos
      LEFT JOIN usuario u ON hv.Id_usuario = u.Id_Usuario
      WHERE hv.Id_Hoja_vida_equipo = ?
    `,
      [id],
    )

    if (hojaVida.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No se encontró hoja de vida con ID ${id}`,
      })
    }

    res.json({
      success: true,
      data: hojaVida[0],
    })
  } catch (error) {
    console.error(`Error al obtener hoja de vida con ID ${req.params.id}:`, error)
    res.status(500).json({
      success: false,
      message: `Error al obtener hoja de vida con ID ${req.params.id}`,
      error: error.message,
    })
  }
})

// Crear una nueva hoja de vida
router.post("/", async (req, res) => {
  try {
    const nuevaHojaVida = req.body
    const [result] = await db.execute("INSERT INTO hoja_vida_equipo SET ?", [nuevaHojaVida])

    res.status(201).json({
      success: true,
      message: "Hoja de vida creada correctamente",
      data: {
        id: result.insertId,
        ...nuevaHojaVida,
      },
    })
  } catch (error) {
    console.error("Error al crear hoja de vida:", error)
    res.status(500).json({
      success: false,
      message: "Error al crear hoja de vida",
      error: error.message,
    })
  }
})

// Actualizar una hoja de vida
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const hojaVidaActualizada = req.body

    const [result] = await db.execute("UPDATE hoja_vida_equipo SET ? WHERE Id_Hoja_vida_equipo = ?", [
      hojaVidaActualizada,
      id,
    ])

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: `No se encontró hoja de vida con ID ${id}`,
      })
    }

    res.json({
      success: true,
      message: `Hoja de vida con ID ${id} actualizada correctamente`,
      data: {
        id,
        ...hojaVidaActualizada,
      },
    })
  } catch (error) {
    console.error(`Error al actualizar hoja de vida con ID ${req.params.id}:`, error)
    res.status(500).json({
      success: false,
      message: `Error al actualizar hoja de vida con ID ${req.params.id}`,
      error: error.message,
    })
  }
})

// Eliminar una hoja de vida
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params

    const [result] = await db.execute("DELETE FROM hoja_vida_equipo WHERE Id_Hoja_vida_equipo = ?", [id])

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: `No se encontró hoja de vida con ID ${id}`,
      })
    }

    res.json({
      success: true,
      message: `Hoja de vida con ID ${id} eliminada correctamente`,
    })
  } catch (error) {
    console.error(`Error al eliminar hoja de vida con ID ${req.params.id}:`, error)
    res.status(500).json({
      success: false,
      message: `Error al eliminar hoja de vida con ID ${req.params.id}`,
      error: error.message,
    })
  }
})

module.exports = router
