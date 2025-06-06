const express = require("express")
const router = express.Router()
const db = require("../config/db") // unificado con equipo.route

// Obtener todos los mantenimientos
router.get("/", async (req, res) => {
  try {
    const mantenimientos = await db.query(`
      SELECT m.*, 
             e.Marca_Equipo, 
             u.Nombre_Usuario_1, 
             u.Apellidos_Usuario_1
      FROM mantenimiento m
      LEFT JOIN equipo e ON m.Id_Equipos = e.Id_Equipos
      LEFT JOIN usuario u ON m.Id_Usuario = u.Id_Usuario
      ORDER BY m.Id_Mantenimiento
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

    const mantenimiento = await db.query(`
      SELECT m.*, 
             e.Marca_Equipo, 
             u.Nombre_Usuario_1, 
             u.Apellidos_Usuario_1
      FROM mantenimiento m
      LEFT JOIN equipo e ON m.Id_Equipos = e.Id_Equipos
      LEFT JOIN usuario u ON m.Id_Usuario = u.Id_Usuario
      WHERE m.Id_Mantenimiento = ?
    `, [id])

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
    const { Fecha_Inicio_mantenimiento, Fecha_fin_mantenimiento, Observaciones, Id_Equipos, Id_Usuario } = req.body

    if (!Fecha_Inicio_mantenimiento || !Id_Equipos || !Id_Usuario) {
      return res.status(400).json({
        success: false,
        message: "Los campos Fecha_Inicio_mantenimiento, Id_Equipos y Id_Usuario son requeridos",
      })
    }

    const equipo = await db.query("SELECT * FROM equipo WHERE Id_Equipos = ?", [Id_Equipos])
    if (equipo.length === 0) {
      return res.status(404).json({
        success: false,
        message: "El equipo especificado no existe",
      })
    }

    const usuario = await db.query("SELECT * FROM usuario WHERE Id_Usuario = ?", [Id_Usuario])
    if (usuario.length === 0) {
      return res.status(404).json({
        success: false,
        message: "El usuario especificado no existe",
      })
    }

    const result = await db.query(`
      INSERT INTO mantenimiento (Fecha_Inicio_mantenimiento, Fecha_fin_mantenimiento, Observaciones, Id_Equipos, Id_Usuario) 
      VALUES (?, ?, ?, ?, ?)`,
      [Fecha_Inicio_mantenimiento, Fecha_fin_mantenimiento || null, Observaciones || "", Id_Equipos, Id_Usuario])

    await db.query(`
      INSERT INTO auditoria (usuario, accion, detalle, tabla_afectada, id_registro, Id_Usuario) 
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        usuario[0].Usuario || "Sistema",
        "Creación de mantenimiento",
        `Se registró un nuevo mantenimiento para el equipo ${equipo[0].Marca_Equipo}`,
        "mantenimiento",
        result.insertId,
        Id_Usuario,
      ])

    res.status(201).json({
      success: true,
      message: "Mantenimiento creado correctamente",
      data: {
        Id_Mantenimiento: result.insertId,
        Fecha_Inicio_mantenimiento,
        Fecha_fin_mantenimiento,
        Observaciones,
        Id_Equipos,
        Id_Usuario,
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

    if (!Fecha_Inicio_mantenimiento || !Id_Equipos || !Id_Usuario) {
      return res.status(400).json({
        success: false,
        message: "Los campos Fecha_Inicio_mantenimiento, Id_Equipos y Id_Usuario son requeridos",
      })
    }

    const mantenimiento = await db.query("SELECT * FROM mantenimiento WHERE Id_Mantenimiento = ?", [id])
    if (mantenimiento.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No se encontró mantenimiento con ID ${id}`,
      })
    }

    const equipo = await db.query("SELECT * FROM equipo WHERE Id_Equipos = ?", [Id_Equipos])
    if (equipo.length === 0) {
      return res.status(404).json({
        success: false,
        message: "El equipo especificado no existe",
      })
    }

    const usuario = await db.query("SELECT * FROM usuario WHERE Id_Usuario = ?", [Id_Usuario])
    if (usuario.length === 0) {
      return res.status(404).json({
        success: false,
        message: "El usuario especificado no existe",
      })
    }

    await db.query(`
      UPDATE mantenimiento 
      SET Fecha_Inicio_mantenimiento = ?, Fecha_fin_mantenimiento = ?, Observaciones = ?, Id_Equipos = ?, Id_Usuario = ?
      WHERE Id_Mantenimiento = ?`,
      [Fecha_Inicio_mantenimiento, Fecha_fin_mantenimiento || null, Observaciones || "", Id_Equipos, Id_Usuario, id])

    await db.query(`
      INSERT INTO auditoria (usuario, accion, detalle, tabla_afectada, id_registro, Id_Usuario) 
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        usuario[0].Usuario || "Sistema",
        "Actualización de mantenimiento",
        `Se actualizó el mantenimiento del equipo ${equipo[0].Marca_Equipo}`,
        "mantenimiento",
        id,
        Id_Usuario,
      ])

    res.json({
      success: true,
      message: `Mantenimiento con ID ${id} actualizado correctamente`,
      data: {
        Id_Mantenimiento: Number(id),
        Fecha_Inicio_mantenimiento,
        Fecha_fin_mantenimiento,
        Observaciones,
        Id_Equipos,
        Id_Usuario,
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

    const mantenimiento = await db.query(`
      SELECT m.*, e.Marca_Equipo, u.Usuario
      FROM mantenimiento m
      LEFT JOIN equipo e ON m.Id_Equipos = e.Id_Equipos
      LEFT JOIN usuario u ON m.Id_Usuario = u.Id_Usuario
      WHERE m.Id_Mantenimiento = ?`, [id])

    if (mantenimiento.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No se encontró mantenimiento con ID ${id}`,
      })
    }

    await db.query("DELETE FROM mantenimiento WHERE Id_Mantenimiento = ?", [id])

    await db.query(`
      INSERT INTO auditoria (usuario, accion, detalle, tabla_afectada, id_registro, Id_Usuario) 
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        mantenimiento[0].Usuario || "Sistema",
        "Eliminación de mantenimiento",
        `Se eliminó el mantenimiento del equipo ${mantenimiento[0].Marca_Equipo}`,
        "mantenimiento",
        id,
        mantenimiento[0].Id_Usuario,
      ])

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
