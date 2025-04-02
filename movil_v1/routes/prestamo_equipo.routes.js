const express = require("express")
const router = express.Router()
const db = require("../config/db")

// Obtener todos los préstamos
router.get("/", async (req, res) => {
  try {
    const query = `
      SELECT pe.*, e.Marca_Equipo, u.Nombre_Usuario_1, u.Apellidos_Usuario_1, 
             ub.Nombre_Ubicacion, ee.Estado_Entregado, ee.Estado_Recibido
      FROM prestamo_equipo pe
      JOIN equipo e ON pe.Id_Equipos = e.Id_Equipos
      JOIN usuario u ON pe.Id_Usuario = u.Id_Usuario
      JOIN ubicacion ub ON pe.Id_Ubicacion = ub.Id_Ubicacion
      JOIN estado_equipo ee ON pe.Id_Estado_Equipo = ee.Id_Estado_equipo
    `

    const prestamos = await db.query(query)

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

    const query = `
      SELECT pe.*, e.Marca_Equipo, u.Nombre_Usuario_1, u.Apellidos_Usuario_1, 
             ub.Nombre_Ubicacion, ee.Estado_Entregado, ee.Estado_Recibido
      FROM prestamo_equipo pe
      JOIN equipo e ON pe.Id_Equipos = e.Id_Equipos
      JOIN usuario u ON pe.Id_Usuario = u.Id_Usuario
      JOIN ubicacion ub ON pe.Id_Ubicacion = ub.Id_Ubicacion
      JOIN estado_equipo ee ON pe.Id_Estado_Equipo = ee.Id_Estado_equipo
      WHERE pe.Id_Prestamo_Equipo = ?
    `

    const prestamo = await db.query(query, [id])

    if (prestamo.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Préstamo no encontrado",
      })
    }

    res.json({
      success: true,
      data: prestamo[0],
    })
  } catch (error) {
    console.error("Error al obtener préstamo:", error)
    res.status(500).json({
      success: false,
      message: "Error al obtener préstamo",
      error: error.message,
    })
  }
})

// Crear un nuevo préstamo
router.post("/", async (req, res) => {
  try {
    const { Fecha_Prestamo_Equipo, Fecha_entrega_prestamo, Id_Usuario, Id_Equipos, Id_Ubicacion, Id_Estado_Equipo } =
      req.body

    // Validar datos
    if (
      !Fecha_Prestamo_Equipo ||
      !Fecha_entrega_prestamo ||
      !Id_Usuario ||
      !Id_Equipos ||
      !Id_Ubicacion ||
      !Id_Estado_Equipo
    ) {
      return res.status(400).json({
        success: false,
        message: "Todos los campos son requeridos",
      })
    }

    const result = await db.query(
      "INSERT INTO prestamo_equipo (Fecha_Prestamo_Equipo, Fecha_entrega_prestamo, Id_Usuario, Id_Equipos, Id_Ubicacion, Id_Estado_Equipo) VALUES (?, ?, ?, ?, ?, ?)",
      [Fecha_Prestamo_Equipo, Fecha_entrega_prestamo, Id_Usuario, Id_Equipos, Id_Ubicacion, Id_Estado_Equipo],
    )

    res.status(201).json({
      success: true,
      message: "Préstamo creado correctamente",
      data: {
        Id_Prestamo_Equipo: result.insertId,
        ...req.body,
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
    const { Fecha_Prestamo_Equipo, Fecha_entrega_prestamo, Id_Usuario, Id_Equipos, Id_Ubicacion, Id_Estado_Equipo } =
      req.body

    // Validar datos
    if (
      !Fecha_Prestamo_Equipo ||
      !Fecha_entrega_prestamo ||
      !Id_Usuario ||
      !Id_Equipos ||
      !Id_Ubicacion ||
      !Id_Estado_Equipo
    ) {
      return res.status(400).json({
        success: false,
        message: "Todos los campos son requeridos",
      })
    }

    const result = await db.query(
      "UPDATE prestamo_equipo SET Fecha_Prestamo_Equipo = ?, Fecha_entrega_prestamo = ?, Id_Usuario = ?, Id_Equipos = ?, Id_Ubicacion = ?, Id_Estado_Equipo = ? WHERE Id_Prestamo_Equipo = ?",
      [Fecha_Prestamo_Equipo, Fecha_entrega_prestamo, Id_Usuario, Id_Equipos, Id_Ubicacion, Id_Estado_Equipo, id],
    )

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Préstamo no encontrado",
      })
    }

    res.json({
      success: true,
      message: "Préstamo actualizado correctamente",
      data: {
        Id_Prestamo_Equipo: id,
        ...req.body,
      },
    })
  } catch (error) {
    console.error("Error al actualizar préstamo:", error)
    res.status(500).json({
      success: false,
      message: "Error al actualizar préstamo",
      error: error.message,
    })
  }
})

// Eliminar un préstamo
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params

    const result = await db.query("DELETE FROM prestamo_equipo WHERE Id_Prestamo_Equipo = ?", [id])

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Préstamo no encontrado",
      })
    }

    res.json({
      success: true,
      message: "Préstamo eliminado correctamente",
    })
  } catch (error) {
    console.error("Error al eliminar préstamo:", error)
    res.status(500).json({
      success: false,
      message: "Error al eliminar préstamo",
      error: error.message,
    })
  }
})

module.exports = router

