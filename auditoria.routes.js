const express = require("express")
const router = express.Router()
const db = require("../database/db")

// Crear tabla de auditoría si no existe
const createAuditoriaTable = async () => {
  try {
    // Verificar si existe la tabla de auditoría
    const [tables] = await db.execute(`
      SELECT TABLE_NAME 
      FROM information_schema.tables 
      WHERE table_schema = DATABASE() 
      AND TABLE_NAME = 'auditoria'
    `)

    // Si no existe la tabla, crearla
    if (tables.length === 0) {
      await db.execute(`
        CREATE TABLE auditoria (
          id INT AUTO_INCREMENT PRIMARY KEY,
          fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
          usuario VARCHAR(100),
          accion VARCHAR(255),
          detalle TEXT,
          tabla_afectada VARCHAR(100),
          id_registro INT,
          Id_Usuario INT,
          FOREIGN KEY (Id_Usuario) REFERENCES usuario(Id_Usuario)
        )
      `)

      console.log("Tabla de auditoría creada correctamente")
    }
  } catch (error) {
    console.error("Error al crear tabla de auditoría:", error)
  }
}

// Obtener todos los registros de auditoría
router.get("/", async (req, res) => {
  try {
    // Asegurar que la tabla existe
    await createAuditoriaTable()

    // Consultar los registros de auditoría
    const [registros] = await db.execute(`
      SELECT a.*, u.Nombre_Usuario_1, u.Apellidos_Usuario_1
      FROM auditoria a
      LEFT JOIN usuario u ON a.Id_Usuario = u.Id_Usuario
      ORDER BY a.fecha DESC
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

// Obtener un registro de auditoría por ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const [registros] = await db.execute(
      `
      SELECT a.*, u.Nombre_Usuario_1, u.Apellidos_Usuario_1
      FROM auditoria a
      LEFT JOIN usuario u ON a.Id_Usuario = u.Id_Usuario
      WHERE a.id = ?
    `,
      [id],
    )

    if (registros.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Registro de auditoría no encontrado",
      })
    }

    res.json({
      success: true,
      data: registros[0],
    })
  } catch (error) {
    console.error("Error al obtener registro de auditoría:", error)
    res.status(500).json({
      success: false,
      message: "Error al obtener registro de auditoría",
      error: error.message,
    })
  }
})

// Crear un nuevo registro de auditoría
router.post("/", async (req, res) => {
  try {
    const { usuario, accion, detalle, tabla_afectada, id_registro, Id_Usuario } = req.body

    // Validar campos requeridos
    if (!usuario || !accion) {
      return res.status(400).json({
        success: false,
        message: "Usuario y acción son campos requeridos",
      })
    }

    const [result] = await db.execute(
      `
      INSERT INTO auditoria (usuario, accion, detalle, tabla_afectada, id_registro, Id_Usuario) 
      VALUES (?, ?, ?, ?, ?, ?)
    `,
      [usuario, accion, detalle || null, tabla_afectada || null, id_registro || null, Id_Usuario || null],
    )

    res.status(201).json({
      success: true,
      message: "Registro de auditoría creado correctamente",
      data: {
        id: result.insertId,
        usuario,
        accion,
        detalle,
        tabla_afectada,
        id_registro,
        Id_Usuario,
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

// Buscar registros de auditoría
router.get("/search/:term", async (req, res) => {
  try {
    const { term } = req.params
    const searchTerm = `%${term}%`

    const [registros] = await db.execute(
      `
      SELECT a.*, u.Nombre_Usuario_1, u.Apellidos_Usuario_1
      FROM auditoria a
      LEFT JOIN usuario u ON a.Id_Usuario = u.Id_Usuario
      WHERE a.usuario LIKE ? OR a.accion LIKE ? OR a.detalle LIKE ? OR a.tabla_afectada LIKE ?
      ORDER BY a.fecha DESC
    `,
      [searchTerm, searchTerm, searchTerm, searchTerm],
    )

    res.json({
      success: true,
      data: registros,
    })
  } catch (error) {
    console.error("Error al buscar registros de auditoría:", error)
    res.status(500).json({
      success: false,
      message: "Error al buscar registros de auditoría",
      error: error.message,
    })
  }
})

module.exports = router
