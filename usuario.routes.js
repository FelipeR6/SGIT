const express = require("express")
const router = express.Router()
const db = require("../database/db")

// Obtener todos los usuarios
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT u.*, r.Nombre_Rol
      FROM usuario u
      LEFT JOIN rol r ON u.Id_Rol = r.Id_Rol
      ORDER BY u.Id_Usuario
    `)

    res.json({ success: true, data: rows })
  } catch (error) {
    console.error("Error al obtener usuarios:", error)
    res.status(500).json({ success: false, message: "Error al obtener usuarios", error: error.message })
  }
})

// Obtener un usuario por ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params

    const [rows] = await db.execute(`
      SELECT u.*, r.Nombre_Rol
      FROM usuario u
      LEFT JOIN rol r ON u.Id_Rol = r.Id_Rol
      WHERE u.Id_Usuario = ?
    `, [id])

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: "Usuario no encontrado" })
    }

    res.json({ success: true, data: rows[0] })
  } catch (error) {
    console.error("Error al obtener usuario:", error)
    res.status(500).json({ success: false, message: "Error al obtener usuario", error: error.message })
  }
})

// Crear un nuevo usuario
router.post("/", async (req, res) => {
  try {
    const {
      Usuario, Nombre_Usuario_1, Nombre_Usuario_2, Apellidos_Usuario_1, Apellidos_Usuario_2,
      Telefono_1_Usuario, Telefono_2_Usuario, Correo_Usuario, Contraseña, Id_Rol
    } = req.body

    if (!Usuario || !Nombre_Usuario_1 || !Apellidos_Usuario_1 || !Telefono_1_Usuario || !Correo_Usuario || !Contraseña || !Id_Rol) {
      return res.status(400).json({
        success: false,
        message: "Campos requeridos: Usuario, Nombre_Usuario_1, Apellidos_Usuario_1, Telefono_1_Usuario, Correo_Usuario, Contraseña, Id_Rol"
      })
    }

    const [[rol]] = await db.execute("SELECT * FROM rol WHERE Id_Rol = ?", [Id_Rol])
    if (!rol) return res.status(404).json({ success: false, message: "Rol no encontrado" })

    const [[existe]] = await db.execute("SELECT * FROM usuario WHERE Usuario = ?", [Usuario])
    if (existe) return res.status(400).json({ success: false, message: "El nombre de usuario ya está en uso" })

    const [result] = await db.execute(`
      INSERT INTO usuario (
        Usuario, Nombre_Usuario_1, Nombre_Usuario_2, Apellidos_Usuario_1, Apellidos_Usuario_2,
        Telefono_1_Usuario, Telefono_2_Usuario, Correo_Usuario, Contraseña, Id_Rol
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      Usuario, Nombre_Usuario_1, Nombre_Usuario_2 || "", Apellidos_Usuario_1, Apellidos_Usuario_2 || "",
      Telefono_1_Usuario, Telefono_2_Usuario || "", Correo_Usuario, Contraseña, Id_Rol
    ])

    await db.execute(`
      INSERT INTO auditoria (usuario, accion, detalle, tabla_afectada, id_registro, Id_Usuario)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [
      "Sistema", "Creación", `Se creó el usuario ${Usuario} con rol ${rol.Nombre_Rol}`, "usuario", result.insertId, null
    ])

    res.status(201).json({ success: true, message: "Usuario creado correctamente", id: result.insertId })
  } catch (error) {
    console.error("Error al crear usuario:", error)
    res.status(500).json({ success: false, message: "Error al crear usuario", error: error.message })
  }
})

// Actualizar un usuario
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const {
      Usuario, Nombre_Usuario_1, Nombre_Usuario_2, Apellidos_Usuario_1, Apellidos_Usuario_2,
      Telefono_1_Usuario, Telefono_2_Usuario, Correo_Usuario, Contraseña, Id_Rol
    } = req.body

    if (!Usuario || !Nombre_Usuario_1 || !Apellidos_Usuario_1 || !Telefono_1_Usuario || !Correo_Usuario || !Id_Rol) {
      return res.status(400).json({
        success: false,
        message: "Campos requeridos: Usuario, Nombre_Usuario_1, Apellidos_Usuario_1, Telefono_1_Usuario, Correo_Usuario, Id_Rol"
      })
    }

    const [[usuario]] = await db.execute("SELECT * FROM usuario WHERE Id_Usuario = ?", [id])
    if (!usuario) return res.status(404).json({ success: false, message: "Usuario no encontrado" })

    const [[rol]] = await db.execute("SELECT * FROM rol WHERE Id_Rol = ?", [Id_Rol])
    if (!rol) return res.status(404).json({ success: false, message: "Rol no encontrado" })

    const [[existe]] = await db.execute("SELECT * FROM usuario WHERE Usuario = ? AND Id_Usuario != ?", [Usuario, id])
    if (existe) return res.status(400).json({ success: false, message: "El nombre de usuario ya está en uso" })

    const query = Contraseña
      ? `
        UPDATE usuario SET
        Usuario = ?, Nombre_Usuario_1 = ?, Nombre_Usuario_2 = ?, Apellidos_Usuario_1 = ?, Apellidos_Usuario_2 = ?,
        Telefono_1_Usuario = ?, Telefono_2_Usuario = ?, Correo_Usuario = ?, Contraseña = ?, Id_Rol = ?
        WHERE Id_Usuario = ?
      `
      : `
        UPDATE usuario SET
        Usuario = ?, Nombre_Usuario_1 = ?, Nombre_Usuario_2 = ?, Apellidos_Usuario_1 = ?, Apellidos_Usuario_2 = ?,
        Telefono_1_Usuario = ?, Telefono_2_Usuario = ?, Correo_Usuario = ?, Id_Rol = ?
        WHERE Id_Usuario = ?
      `

    const params = Contraseña
      ? [Usuario, Nombre_Usuario_1, Nombre_Usuario_2 || "", Apellidos_Usuario_1, Apellidos_Usuario_2 || "", Telefono_1_Usuario, Telefono_2_Usuario || "", Correo_Usuario, Contraseña, Id_Rol, id]
      : [Usuario, Nombre_Usuario_1, Nombre_Usuario_2 || "", Apellidos_Usuario_1, Apellidos_Usuario_2 || "", Telefono_1_Usuario, Telefono_2_Usuario || "", Correo_Usuario, Id_Rol, id]

    await db.execute(query, params)

    await db.execute(`
      INSERT INTO auditoria (usuario, accion, detalle, tabla_afectada, id_registro, Id_Usuario)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [
      Usuario, "Actualización", `Se actualizó el usuario ${Usuario} con rol ${rol.Nombre_Rol}`, "usuario", id, id
    ])

    res.json({ success: true, message: "Usuario actualizado correctamente" })
  } catch (error) {
    console.error("Error al actualizar usuario:", error)
    res.status(500).json({ success: false, message: "Error al actualizar usuario", error: error.message })
  }
})

// Eliminar un usuario
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params
    
    const [[usuario]] = await db.execute(`
      SELECT u.*, r.Nombre_Rol
      FROM usuario u
      LEFT JOIN rol r ON u.Id_Rol = r.Id_Rol
      WHERE u.Id_Usuario = ?
    `, [id])

    if (!usuario) return res.status(404).json({ success: false, message: "Usuario no encontrado" })

      const relaciones = await Promise.all([
        db.execute("SELECT COUNT(*) AS total FROM equipo WHERE Id_Usuario = ?", [id]),
        db.execute("SELECT COUNT(*) AS total FROM mantenimiento WHERE Id_Usuario = ?", [id]),
        db.execute("SELECT COUNT(*) AS total FROM prestamo_equipo WHERE Id_Usuario = ?", [id]),
        db.execute("SELECT COUNT(*) AS total FROM hoja_vida_equipo WHERE Id_Usuario = ?", [id]),
      ])
      
      // relaciones es un array de resultados, cada uno es [rows, fields]
      // extraemos el total de cada consulta para sumar
      const total = relaciones.reduce((sum, [rows]) => sum + rows[0].total, 0)
      
      if (total > 0) {
        return res.status(400).json({
          success: false,
          message: "No se puede eliminar el usuario porque tiene registros relacionados"
        })
      }
      

    await db.execute("DELETE FROM usuario WHERE Id_Usuario = ?", [id])

    await db.execute(`
      INSERT INTO auditoria (usuario, accion, detalle, tabla_afectada, id_registro, Id_Usuario)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [
      "Sistema", "Eliminación", `Se eliminó el usuario ${usuario.Usuario} con rol ${usuario.Nombre_Rol}`, "usuario", id, null
    ])

    res.json({ success: true, message: "Usuario eliminado correctamente" })
  } catch (error) {
    console.error("Error al eliminar usuario:", error)
    res.status(500).json({ success: false, message: "Error al eliminar usuario", error: error.message })
  }
})

module.exports = router
