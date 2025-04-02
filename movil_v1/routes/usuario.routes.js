const express = require("express")
const router = express.Router()
const db = require("../config/db")

// Obtener todos los usuarios
router.get("/", async (req, res) => {
  try {
    const query = `
      SELECT u.*, r.Nombre_Rol
      FROM usuario u
      LEFT JOIN rol r ON u.Id_Rol = r.Id_Rol
    `

    const usuarios = await db.query(query)

    res.json({
      success: true,
      data: usuarios,
    })
  } catch (error) {
    console.error("Error al obtener usuarios:", error)
    res.status(500).json({
      success: false,
      message: "Error al obtener usuarios",
      error: error.message,
    })
  }
})

// Obtener un usuario por ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params

    const query = `
      SELECT u.*, r.Nombre_Rol
      FROM usuario u
      LEFT JOIN rol r ON u.Id_Rol = r.Id_Rol
      WHERE u.Id_Usuario = ?
    `

    const usuario = await db.query(query, [id])

    if (usuario.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado",
      })
    }

    res.json({
      success: true,
      data: usuario[0],
    })
  } catch (error) {
    console.error("Error al obtener usuario:", error)
    res.status(500).json({
      success: false,
      message: "Error al obtener usuario",
      error: error.message,
    })
  }
})

// Crear un nuevo usuario
router.post("/", async (req, res) => {
  try {
    const {
      Usuario,
      Nombre_Usuario_1,
      Nombre_Usuario_2,
      Apellidos_Usuario_1,
      Apellidos_Usuario_2,
      Telefono_1_Usuario,
      Telefono_2_Usuario,
      Correo_Usuario,
      Contraseña,
      Id_Rol,
    } = req.body

    // Validar datos básicos
    if (!Usuario || !Nombre_Usuario_1 || !Apellidos_Usuario_1 || !Correo_Usuario || !Contraseña || !Id_Rol) {
      return res.status(400).json({
        success: false,
        message:
          "Los campos Usuario, Nombre_Usuario_1, Apellidos_Usuario_1, Correo_Usuario, Contraseña y Id_Rol son requeridos",
      })
    }

    // Verificar si el usuario ya existe
    const usuarioExistente = await db.query("SELECT * FROM usuario WHERE Usuario = ? OR Correo_Usuario = ?", [
      Usuario,
      Correo_Usuario,
    ])

    if (usuarioExistente.length > 0) {
      return res.status(400).json({
        success: false,
        message: "El nombre de usuario o correo ya está en uso",
      })
    }

    const result = await db.query(
      "INSERT INTO usuario (Usuario, Nombre_Usuario_1, Nombre_Usuario_2, Apellidos_Usuario_1, Apellidos_Usuario_2, Telefono_1_Usuario, Telefono_2_Usuario, Correo_Usuario, Contraseña, Id_Rol) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        Usuario,
        Nombre_Usuario_1,
        Nombre_Usuario_2 || "",
        Apellidos_Usuario_1,
        Apellidos_Usuario_2 || "",
        Telefono_1_Usuario || "",
        Telefono_2_Usuario || "",
        Correo_Usuario,
        Contraseña,
        Id_Rol,
      ],
    )

    res.status(201).json({
      success: true,
      message: "Usuario creado correctamente",
      data: {
        Id_Usuario: result.insertId,
        ...req.body,
      },
    })
  } catch (error) {
    console.error("Error al crear usuario:", error)
    res.status(500).json({
      success: false,
      message: "Error al crear usuario",
      error: error.message,
    })
  }
})

// Actualizar un usuario
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const {
      Usuario,
      Nombre_Usuario_1,
      Nombre_Usuario_2,
      Apellidos_Usuario_1,
      Apellidos_Usuario_2,
      Telefono_1_Usuario,
      Telefono_2_Usuario,
      Correo_Usuario,
      Contraseña,
      Id_Rol,
    } = req.body

    // Validar datos básicos
    if (!Usuario || !Nombre_Usuario_1 || !Apellidos_Usuario_1 || !Correo_Usuario || !Id_Rol) {
      return res.status(400).json({
        success: false,
        message: "Los campos Usuario, Nombre_Usuario_1, Apellidos_Usuario_1, Correo_Usuario y Id_Rol son requeridos",
      })
    }

    // Verificar si el usuario existe
    const usuarioExistente = await db.query("SELECT * FROM usuario WHERE Id_Usuario = ?", [id])

    if (usuarioExistente.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado",
      })
    }

    // Verificar si el nuevo usuario o correo ya está en uso por otro usuario
    const usuarioDuplicado = await db.query(
      "SELECT * FROM usuario WHERE (Usuario = ? OR Correo_Usuario = ?) AND Id_Usuario != ?",
      [Usuario, Correo_Usuario, id],
    )

    if (usuarioDuplicado.length > 0) {
      return res.status(400).json({
        success: false,
        message: "El nombre de usuario o correo ya está en uso por otro usuario",
      })
    }

    // Construir la consulta de actualización
    let query =
      "UPDATE usuario SET Usuario = ?, Nombre_Usuario_1 = ?, Nombre_Usuario_2 = ?, Apellidos_Usuario_1 = ?, Apellidos_Usuario_2 = ?, Telefono_1_Usuario = ?, Telefono_2_Usuario = ?, Correo_Usuario = ?, Id_Rol = ?"
    const params = [
      Usuario,
      Nombre_Usuario_1,
      Nombre_Usuario_2 || "",
      Apellidos_Usuario_1,
      Apellidos_Usuario_2 || "",
      Telefono_1_Usuario || "",
      Telefono_2_Usuario || "",
      Correo_Usuario,
      Id_Rol,
    ]

    // Si se proporciona una nueva contraseña, incluirla en la actualización
    if (Contraseña) {
      query += ", Contraseña = ?"
      params.push(Contraseña)
    }

    query += " WHERE Id_Usuario = ?"
    params.push(id)

    const result = await db.query(query, params)

    res.json({
      success: true,
      message: "Usuario actualizado correctamente",
      data: {
        Id_Usuario: id,
        ...req.body,
      },
    })
  } catch (error) {
    console.error("Error al actualizar usuario:", error)
    res.status(500).json({
      success: false,
      message: "Error al actualizar usuario",
      error: error.message,
    })
  }
})

// Eliminar un usuario
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params

    // Verificar si hay registros relacionados
    const equiposAsociados = await db.query("SELECT COUNT(*) as count FROM equipo WHERE Id_Usuario = ?", [id])
    const mantenimientosAsociados = await db.query("SELECT COUNT(*) as count FROM mantenimiento WHERE Id_Usuario = ?", [
      id,
    ])
    const prestamosAsociados = await db.query("SELECT COUNT(*) as count FROM prestamo_equipo WHERE Id_Usuario = ?", [
      id,
    ])
    const hojaVidaAsociada = await db.query("SELECT COUNT(*) as count FROM hoja_vida_equipo WHERE Id_usuario = ?", [id])

    if (
      equiposAsociados[0].count > 0 ||
      mantenimientosAsociados[0].count > 0 ||
      prestamosAsociados[0].count > 0 ||
      hojaVidaAsociada[0].count > 0
    ) {
      return res.status(400).json({
        success: false,
        message: "No se puede eliminar el usuario porque tiene registros asociados",
      })
    }

    const result = await db.query("DELETE FROM usuario WHERE Id_Usuario = ?", [id])

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado",
      })
    }

    res.json({
      success: true,
      message: "Usuario eliminado correctamente",
    })
  } catch (error) {
    console.error("Error al eliminar usuario:", error)
    res.status(500).json({
      success: false,
      message: "Error al eliminar usuario",
      error: error.message,
    })
  }
})

// Autenticación de usuario
router.post("/login", async (req, res) => {
  try {
    const { Usuario, Contraseña } = req.body

    if (!Usuario || !Contraseña) {
      return res.status(400).json({
        success: false,
        message: "Usuario y contraseña son requeridos",
      })
    }

    const query = `
      SELECT u.*, r.Nombre_Rol
      FROM usuario u
      LEFT JOIN rol r ON u.Id_Rol = r.Id_Rol
      WHERE u.Usuario = ? AND u.Contraseña = ?
    `

    const usuario = await db.query(query, [Usuario, Contraseña])

    if (usuario.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Credenciales inválidas",
      })
    }

    // No enviar la contraseña en la respuesta
    const usuarioSinContraseña = { ...usuario[0] }
    delete usuarioSinContraseña.Contraseña

    res.json({
      success: true,
      message: "Inicio de sesión exitoso",
      data: usuarioSinContraseña,
    })
  } catch (error) {
    console.error("Error en la autenticación:", error)
    res.status(500).json({
      success: false,
      message: "Error en la autenticación",
      error: error.message,
    })
  }
})

module.exports = router

