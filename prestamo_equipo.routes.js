const express = require("express")
const router = express.Router()
const db = require("../database/db")

// Obtener todos los préstamos
router.get("/", async (req, res) => {
  try {
    const [data] = await db.execute(`
      SELECT p.*, 
             e.Marca_Equipo, 
             u.Nombre_Usuario_1, 
             u.Apellidos_Usuario_1,
             ub.Nombre_Ubicacion,
             ee.Estado_Entregado
      FROM prestamo_equipo p
      LEFT JOIN equipo e ON p.Id_Equipos = e.Id_Equipos
      LEFT JOIN usuario u ON p.Id_Usuario = u.Id_Usuario
      LEFT JOIN ubicacion ub ON p.Id_Ubicacion = ub.Id_Ubicacion
      LEFT JOIN estado_equipo ee ON p.Id_Estado_Equipo = ee.Id_Estado_equipo
      ORDER BY p.Id_Prestamo_Equipo ASC
    `)

    res.json({ success: true, data })
  } catch (error) {
    console.error("Error al obtener préstamos:", error)
    res.status(500).json({ success: false, message: "Error al obtener préstamos", error: error.message })
  }
})

// Obtener un préstamo por ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const [data] = await db.execute(`
      SELECT p.*, 
             e.Marca_Equipo, 
             u.Nombre_Usuario_1, 
             u.Apellidos_Usuario_1,
             ub.Nombre_Ubicacion,
             ee.Estado_Entregado
      FROM prestamo_equipo p
      LEFT JOIN equipo e ON p.Id_Equipos = e.Id_Equipos
      LEFT JOIN usuario u ON p.Id_Usuario = u.Id_Usuario
      LEFT JOIN ubicacion ub ON p.Id_Ubicacion = ub.Id_Ubicacion
      LEFT JOIN estado_equipo ee ON p.Id_Estado_Equipo = ee.Id_Estado_equipo
      WHERE p.Id_Prestamo_Equipo = ?
    `, [id])

    if (data.length === 0) return res.status(404).json({ success: false, message: "Préstamo no encontrado" })

    res.json({ success: true, data: data[0] })
  } catch (error) {
    console.error("Error al obtener préstamo:", error)
    res.status(500).json({ success: false, message: "Error al obtener préstamo", error: error.message })
  }
})

// Crear un préstamo
router.post("/", async (req, res) => {
  try {
    const { Fecha_Prestamo_Equipo, Fecha_entrega_prestamo, Id_Usuario, Id_Equipos, Id_Ubicacion, Id_Estado_Equipo } = req.body

    if (!Fecha_Prestamo_Equipo || !Fecha_entrega_prestamo || !Id_Usuario || !Id_Equipos || !Id_Ubicacion || !Id_Estado_Equipo) {
      return res.status(400).json({ success: false, message: "Todos los campos son requeridos" })
    }

    const [[equipo]] = await db.execute("SELECT * FROM equipo WHERE Id_Equipos = ?", [Id_Equipos])
    if (!equipo) return res.status(404).json({ success: false, message: "Equipo no encontrado" })

    const [[usuario]] = await db.execute("SELECT * FROM usuario WHERE Id_Usuario = ?", [Id_Usuario])
    if (!usuario) return res.status(404).json({ success: false, message: "Usuario no encontrado" })

    const [[ubicacion]] = await db.execute("SELECT * FROM ubicacion WHERE Id_Ubicacion = ?", [Id_Ubicacion])
    if (!ubicacion) return res.status(404).json({ success: false, message: "Ubicación no encontrada" })

    const [[estado]] = await db.execute("SELECT * FROM estado_equipo WHERE Id_Estado_equipo = ?", [Id_Estado_Equipo])
    if (!estado) return res.status(404).json({ success: false, message: "Estado de equipo no encontrado" })

    const [result] = await db.execute(`
      INSERT INTO prestamo_equipo (Fecha_Prestamo_Equipo, Fecha_entrega_prestamo, Id_Usuario, Id_Equipos, Id_Ubicacion, Id_Estado_Equipo) 
      VALUES (?, ?, ?, ?, ?, ?)
    `, [Fecha_Prestamo_Equipo, Fecha_entrega_prestamo, Id_Usuario, Id_Equipos, Id_Ubicacion, Id_Estado_Equipo])

    await db.execute(`
      INSERT INTO auditoria (usuario, accion, detalle, tabla_afectada, id_registro, Id_Usuario) 
      VALUES (?, ?, ?, ?, ?, ?)
    `, [
      usuario.Usuario || "Sistema",
      "Creación de préstamo",
      `Se registró préstamo del equipo ${equipo.Marca_Equipo} en ${ubicacion.Nombre_Ubicacion}`,
      "prestamo_equipo",
      result.insertId,
      Id_Usuario
    ])

    res.status(201).json({ success: true, message: "Préstamo creado correctamente", data: { Id_Prestamo_Equipo: result.insertId } })
  } catch (error) {
    console.error("Error al crear préstamo:", error)
    res.status(500).json({ success: false, message: "Error al crear préstamo", error: error.message })
  }
})

// Actualizar préstamo
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const { Fecha_Prestamo_Equipo, Fecha_entrega_prestamo, Id_Usuario, Id_Equipos, Id_Ubicacion, Id_Estado_Equipo } = req.body

    if (!Fecha_Prestamo_Equipo || !Fecha_entrega_prestamo || !Id_Usuario || !Id_Equipos || !Id_Ubicacion || !Id_Estado_Equipo) {
      return res.status(400).json({ success: false, message: "Todos los campos son requeridos" })
    }

    const [[prestamo]] = await db.execute("SELECT * FROM prestamo_equipo WHERE Id_Prestamo_Equipo = ?", [id])
    if (!prestamo) return res.status(404).json({ success: false, message: "Préstamo no encontrado" })

    const [[equipo]] = await db.execute("SELECT * FROM equipo WHERE Id_Equipos = ?", [Id_Equipos])
    const [[usuario]] = await db.execute("SELECT * FROM usuario WHERE Id_Usuario = ?", [Id_Usuario])
    const [[ubicacion]] = await db.execute("SELECT * FROM ubicacion WHERE Id_Ubicacion = ?", [Id_Ubicacion])
    const [[estado]] = await db.execute("SELECT * FROM estado_equipo WHERE Id_Estado_equipo = ?", [Id_Estado_Equipo])
    if (!equipo || !usuario || !ubicacion || !estado) return res.status(404).json({ success: false, message: "Datos relacionados no válidos" })

    await db.execute(`
      UPDATE prestamo_equipo 
      SET Fecha_Prestamo_Equipo = ?, Fecha_entrega_prestamo = ?, Id_Usuario = ?, Id_Equipos = ?, Id_Ubicacion = ?, Id_Estado_Equipo = ?
      WHERE Id_Prestamo_Equipo = ?
    `, [Fecha_Prestamo_Equipo, Fecha_entrega_prestamo, Id_Usuario, Id_Equipos, Id_Ubicacion, Id_Estado_Equipo, id])

    await db.execute(`
      INSERT INTO auditoria (usuario, accion, detalle, tabla_afectada, id_registro, Id_Usuario) 
      VALUES (?, ?, ?, ?, ?, ?)
    `, [
      usuario.Usuario || "Sistema",
      "Actualización de préstamo",
      `Se actualizó préstamo del equipo ${equipo.Marca_Equipo} en ${ubicacion.Nombre_Ubicacion}`,
      "prestamo_equipo",
      id,
      Id_Usuario
    ])

    res.json({ success: true, message: "Préstamo actualizado correctamente" })
  } catch (error) {
    console.error("Error al actualizar préstamo:", error)
    res.status(500).json({ success: false, message: "Error al actualizar préstamo", error: error.message })
  }
})

// Eliminar préstamo
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const [[prestamo]] = await db.execute(`
      SELECT p.*, e.Marca_Equipo, u.Usuario, ub.Nombre_Ubicacion
      FROM prestamo_equipo p
      LEFT JOIN equipo e ON p.Id_Equipos = e.Id_Equipos
      LEFT JOIN usuario u ON p.Id_Usuario = u.Id_Usuario
      LEFT JOIN ubicacion ub ON p.Id_Ubicacion = ub.Id_Ubicacion
      WHERE p.Id_Prestamo_Equipo = ?
    `, [id])

    if (!prestamo) return res.status(404).json({ success: false, message: "Préstamo no encontrado" })

    await db.execute("DELETE FROM prestamo_equipo WHERE Id_Prestamo_Equipo = ?", [id])

    await db.execute(`
      INSERT INTO auditoria (usuario, accion, detalle, tabla_afectada, id_registro, Id_Usuario) 
      VALUES (?, ?, ?, ?, ?, ?)
    `, [
      prestamo.Usuario || "Sistema",
      "Eliminación de préstamo",
      `Se eliminó el préstamo del equipo ${prestamo.Marca_Equipo} en ${prestamo.Nombre_Ubicacion}`,
      "prestamo_equipo",
      id,
      prestamo.Id_Usuario
    ])

    res.json({ success: true, message: "Préstamo eliminado correctamente" })
  } catch (error) {
    console.error("Error al eliminar préstamo:", error)
    res.status(500).json({ success: false, message: "Error al eliminar préstamo", error: error.message })
  }
})

module.exports = router
