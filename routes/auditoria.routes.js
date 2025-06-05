const express = require("express")
const router = express.Router()
const db = require("../database/db")

// Obtener todos los registros de auditoría
router.get("/", async (req, res) => {
  try {
    // Asumiendo que existe una tabla de auditoría
    const [registros] = await db.execute(`
      SELECT a.*, u.Nombre_Usuario_1, u.Apellidos_Usuario_1
      FROM auditoria a
      LEFT JOIN usuario u ON a.Id_Usuario = u.Id_Usuario
      ORDER BY a.Fecha DESC
    `)

    res.json({
      success: true,
      data: registros,
    })
  } catch (error) {
    console.error("Error al obtener registros de auditoría:", error)
    res.status(500).json({
      success: false,
      message: "Error al obtener registros de auditoría",
      error: error.message,
    })
  }
})

// Crear un nuevo registro de auditoría
router.post("/", async (req, res) => {
  try {
    const nuevoRegistro = req.body
    const [result] = await db.execute("INSERT INTO auditoria SET ?", [nuevoRegistro])

    res.status(201).json({
      success: true,
      message: "Registro de auditoría creado correctamente",
      data: {
        id: result.insertId,
        ...nuevoRegistro,
      },
    })
  } catch (error) {
    console.error("Error al crear registro de auditoría:", error)
    res.status(500).json({
      success: false,
      message: "Error al crear registro de auditoría",
      error: error.message,
    })
  }
})

module.exports = router
