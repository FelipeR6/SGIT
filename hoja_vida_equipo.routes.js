const express = require("express")
const router = express.Router()
const db = require("../database/db")

// Obtener todas las hojas de vida con información relacionada, incluyendo estado_equipo
router.get("/", async (req, res) => {
  try {
    const [hojasVida] = await db.execute(`
      SELECT hv.*, 
             e.Marca_Equipo, 
             u.Nombre_Usuario_1, 
             u.Apellidos_Usuario_1,
             est.Estado_Entregado,
             est.Estado_Recibido
      FROM hoja_vida_equipo hv
      LEFT JOIN equipo e ON hv.Id_Equipos = e.Id_Equipos
      LEFT JOIN usuario u ON hv.Id_usuario = u.Id_Usuario
      LEFT JOIN estado_equipo est ON hv.Id_Estado_equipo = est.Id_Estado_equipo
      ORDER BY hv.Id_Hoja_vida_equipo ASC
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

// Obtener una hoja de vida por ID incluyendo estado_equipo
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const [hojasVida] = await db.execute(
      `
      SELECT hv.*, 
             e.Marca_Equipo, 
             u.Nombre_Usuario_1, 
             u.Apellidos_Usuario_1,
             est.Estado_Entregado,
             est.Estado_Recibido
      FROM hoja_vida_equipo hv
      LEFT JOIN equipo e ON hv.Id_Equipos = e.Id_Equipos
      LEFT JOIN usuario u ON hv.Id_usuario = u.Id_Usuario
      LEFT JOIN estado_equipo est ON hv.Id_Estado_equipo = est.Id_Estado_equipo
      WHERE hv.Id_Hoja_vida_equipo = ?
    `,
      [id],
    )

    if (hojasVida.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Hoja de vida no encontrada",
      })
    }

    res.json({
      success: true,
      data: hojasVida[0],
    })
  } catch (error) {
    console.error("Error al obtener hoja de vida:", error)
    res.status(500).json({
      success: false,
      message: "Error al obtener hoja de vida",
      error: error.message,
    })
  }
})

// Crear una nueva hoja de vida (ahora con Id_Estado_equipo)
router.post("/", async (req, res) => {
  try {
    const { Id_Equipos, Id_usuario, Estado_Equipo, Fecha_ingreso, Id_Estado_equipo } = req.body

    // Validar campos requeridos
    if (!Id_Equipos || !Id_usuario || !Estado_Equipo || !Fecha_ingreso || !Id_Estado_equipo) {
      return res.status(400).json({
        success: false,
        message: "Todos los campos son requeridos incluyendo Id_Estado_equipo",
      })
    }

    // Verificar que el equipo existe
    const [equipos] = await db.execute("SELECT * FROM equipo WHERE Id_Equipos = ?", [Id_Equipos])
    if (equipos.length === 0) {
      return res.status(404).json({
        success: false,
        message: "El equipo especificado no existe",
      })
    }

    // Verificar que el usuario existe
    const [usuarios] = await db.execute("SELECT * FROM usuario WHERE Id_Usuario = ?", [Id_usuario])
    if (usuarios.length === 0) {
      return res.status(404).json({
        success: false,
        message: "El usuario especificado no existe",
      })
    }

    // Verificar que el estado_equipo existe
    const [estados] = await db.execute("SELECT * FROM estado_equipo WHERE Id_Estado_equipo = ?", [Id_Estado_equipo])
    if (estados.length === 0) {
      return res.status(404).json({
        success: false,
        message: "El estado de equipo especificado no existe",
      })
    }

    const [result] = await db.execute(
      `
      INSERT INTO hoja_vida_equipo (Id_Equipos, Id_usuario, Estado_Equipo, Fecha_ingreso, Id_Estado_equipo) 
      VALUES (?, ?, ?, ?, ?)
    `,
      [Id_Equipos, Id_usuario, Estado_Equipo, Fecha_ingreso, Id_Estado_equipo],
    )

    // Registrar en auditoría
    await db.execute(
      `
      INSERT INTO auditoria (usuario, accion, detalle, tabla_afectada, id_registro, Id_Usuario) 
      VALUES (?, ?, ?, ?, ?, ?)
    `,
      [
        usuarios[0].Usuario,
        "Creación de hoja de vida",
        `Se creó una nueva hoja de vida para el equipo ${equipos[0].Marca_Equipo}`,
        "hoja_vida_equipo",
        result.insertId,
        Id_usuario,
      ],
    )

    res.status(201).json({
      success: true,
      message: "Hoja de vida creada correctamente",
      data: {
        Id_Hoja_vida_equipo: result.insertId,
        Id_Equipos,
        Id_usuario,
        Estado_Equipo,
        Fecha_ingreso,
        Id_Estado_equipo,
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

// Actualizar una hoja de vida (ahora con Id_Estado_equipo)
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const { Id_Equipos, Id_usuario, Estado_Equipo, Fecha_ingreso, Id_Estado_equipo } = req.body

    // Validar campos requeridos
    if (!Id_Equipos || !Id_usuario || !Estado_Equipo || !Fecha_ingreso || !Id_Estado_equipo) {
      return res.status(400).json({
        success: false,
        message: "Todos los campos son requeridos incluyendo Id_Estado_equipo",
      })
    }

    // Verificar que la hoja de vida existe
    const [hojasVida] = await db.execute("SELECT * FROM hoja_vida_equipo WHERE Id_Hoja_vida_equipo = ?", [id])
    if (hojasVida.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Hoja de vida no encontrada",
      })
    }

    // Verificar que el equipo existe
    const [equipos] = await db.execute("SELECT * FROM equipo WHERE Id_Equipos = ?", [Id_Equipos])
    if (equipos.length === 0) {
      return res.status(404).json({
        success: false,
        message: "El equipo especificado no existe",
      })
    }

    // Verificar que el usuario existe
    const [usuarios] = await db.execute("SELECT * FROM usuario WHERE Id_Usuario = ?", [Id_usuario])
    if (usuarios.length === 0) {
      return res.status(404).json({
        success: false,
        message: "El usuario especificado no existe",
      })
    }

    // Verificar que el estado_equipo existe
    const [estados] = await db.execute("SELECT * FROM estado_equipo WHERE Id_Estado_equipo = ?", [Id_Estado_equipo])
    if (estados.length === 0) {
      return res.status(404).json({
        success: false,
        message: "El estado de equipo especificado no existe",
      })
    }

    const [result] = await db.execute(
      `
      UPDATE hoja_vida_equipo 
      SET Id_Equipos = ?, Id_usuario = ?, Estado_Equipo = ?, Fecha_ingreso = ?, Id_Estado_equipo = ?
      WHERE Id_Hoja_vida_equipo = ?
    `,
      [Id_Equipos, Id_usuario, Estado_Equipo, Fecha_ingreso, Id_Estado_equipo, id],
    )

    // Registrar en auditoría
    await db.execute(
      `
      INSERT INTO auditoria (usuario, accion, detalle, tabla_afectada, id_registro, Id_Usuario) 
      VALUES (?, ?, ?, ?, ?, ?)
    `,
      [
        usuarios[0].Usuario,
        "Actualización de hoja de vida",
        `Se actualizó la hoja de vida del equipo ${equipos[0].Marca_Equipo}`,
        "hoja_vida_equipo",
        id,
        Id_usuario,
      ],
    )

    res.json({
      success: true,
      message: "Hoja de vida actualizada correctamente",
      data: {
        Id_Hoja_vida_equipo: Number.parseInt(id),
        Id_Equipos,
        Id_usuario,
        Estado_Equipo,
        Fecha_ingreso,
        Id_Estado_equipo,
      },
    })
  } catch (error) {
    console.error("Error al actualizar hoja de vida:", error)
    res.status(500).json({
      success: false,
      message: "Error al actualizar hoja de vida",
      error: error.message,
    })
  }
})

// Eliminar una hoja de vida
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params

    // Verificar que la hoja de vida existe
    const [hojasVida] = await db.execute(
      `
      SELECT hv.*, e.Marca_Equipo, u.Usuario
      FROM hoja_vida_equipo hv
      LEFT JOIN equipo e ON hv.Id_Equipos = e.Id_Equipos
      LEFT JOIN usuario u ON hv.Id_usuario = u.Id_Usuario
      WHERE hv.Id_Hoja_vida_equipo = ?
    `,
      [id],
    )

    if (hojasVida.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Hoja de vida no encontrada",
      })
    }

    const hojaVida = hojasVida[0]

    const [result] = await db.execute("DELETE FROM hoja_vida_equipo WHERE Id_Hoja_vida_equipo = ?", [id])

    // Registrar en auditoría
    await db.execute(
      `
      INSERT INTO auditoria (usuario, accion, detalle, tabla_afectada, id_registro, Id_Usuario) 
      VALUES (?, ?, ?, ?, ?, ?)
    `,
      [
        hojaVida.Usuario || "Sistema",
        "Eliminación de hoja de vida",
        `Se eliminó la hoja de vida del equipo ${hojaVida.Marca_Equipo}`,
        "hoja_vida_equipo",
        id,
        hojaVida.Id_usuario,
      ],
    )

    res.json({
      success: true,
      message: "Hoja de vida eliminada correctamente",
    })
  } catch (error) {
    console.error("Error al eliminar hoja de vida:", error)
    res.status(500).json({
      success: false,
      message: "Error al eliminar hoja de vida",
      error: error.message,
    })
  }
})

module.exports = router
