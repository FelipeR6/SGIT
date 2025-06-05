const express = require("express")
const router = express.Router()
const db = require("../database/db")

// Obtener todos los préstamos
router.get("/", async (req, res) => {
  try {
    const [prestamos] = await db.execute(`
      SELECT p.*, e.Marca_Equipo, u.Nombre_Usuario_1, u.Apellidos_Usuario_1, ub.Nombre_Ubicacion, 
      ee.Estado_Entregado, ee.Estado_Recibido
      FROM prestamo_equipo p
      LEFT JOIN equipo e ON p.Id_Equipos = e.Id_Equipos
      LEFT JOIN usuario u ON p.Id_Usuario = u.Id_Usuario
      LEFT JOIN ubicacion ub ON p.Id_Ubicacion = ub.Id_Ubicacion
      LEFT JOIN estado_equipo ee ON p.Id_Estado_Equipo = ee.Id_Estado_equipo
    `)

    res.json({
      success: true,
      data: prestamos,
    })
  } catch (error) {
    console.error("Error al obtener préstamos:", error)
    res.status(500).json({
      success: false,
      message: "Error al obtener préstamos",
      error: error.message,
    })
  }
})

// Obtener un préstamo por ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params

    const [prestamo] = await db.execute(
      `
      SELECT p.*, e.Marca_Equipo, u.Nombre_Usuario_1, u.Apellidos_Usuario_1, ub.Nombre_Ubicacion,
      ee.Estado_Entregado, ee.Estado_Recibido
      FROM prestamo_equipo p
      LEFT JOIN equipo e ON p.Id_Equipos = e.Id_Equipos
      LEFT JOIN usuario u ON p.Id_Usuario = u.Id_Usuario
      LEFT JOIN ubicacion ub ON p.Id_Ubicacion = ub.Id_Ubicacion
      LEFT JOIN estado_equipo ee ON p.Id_Estado_Equipo = ee.Id_Estado_equipo
      WHERE p.Id_Prestamo_Equipo = ?
    `,
      [id],
    )

    if (prestamo.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No se encontró préstamo con ID ${id}`,
      })
    }

    res.json({
      success: true,
      data: prestamo[0],
    })
  } catch (error) {
    console.error(`Error al obtener préstamo con ID ${req.params.id}:`, error)
    res.status(500).json({
      success: false,
      message: `Error al obtener préstamo con ID ${req.params.id}`,
      error: error.message,
    })
  }
})

// Crear un nuevo préstamo
router.post("/", async (req, res) => {
  try {
    const nuevoPrestamo = req.body
    const [result] = await db.execute("INSERT INTO prestamo_equipo SET ?", [nuevoPrestamo])

    res.status(201).json({
      success: true,
      message: "Préstamo creado correctamente",
      data: {
        id: result.insertId,
        ...nuevoPrestamo,
      },
    })
  } catch (error) {
    console.error("Error al crear préstamo:", error)
    res.status(500).json({
      success: false,
      message: "Error al crear préstamo",
      error: error.message,
    })
  }
})

// Actualizar un préstamo
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const prestamoActualizado = req.body

    const [result] = await db.execute("UPDATE prestamo_equipo SET ? WHERE Id_Prestamo_Equipo = ?", [
      prestamoActualizado,
      id,
    ])

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: `No se encontró préstamo con ID ${id}`,
      })
    }

    res.json({
      success: true,
      message: `Préstamo con ID ${id} actualizado correctamente`,
      data: {
        id,
        ...prestamoActualizado,
      },
    })
  } catch (error) {
    console.error(`Error al actualizar préstamo con ID ${req.params.id}:`, error)
    res.status(500).json({
      success: false,
      message: `Error al actualizar préstamo con ID ${req.params.id}`,
      error: error.message,
    })
  }
})

// Eliminar un préstamo
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params

    const [result] = await db.execute("DELETE FROM prestamo_equipo WHERE Id_Prestamo_Equipo = ?", [id])

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: `No se encontró préstamo con ID ${id}`,
      })
    }

    res.json({
      success: true,
      message: `Préstamo con ID ${id} eliminado correctamente`,
    })
  } catch (error) {
    console.error(`Error al eliminar préstamo con ID ${req.params.id}:`, error)
    res.status(500).json({
      success: false,
      message: `Error al eliminar préstamo con ID ${req.params.id}`,
      error: error.message,
    })
  }
})

module.exports = router
