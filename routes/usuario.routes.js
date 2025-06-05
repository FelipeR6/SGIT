const express = require("express")
const router = express.Router()
const db = require("../database/db")

// Obtener todos los usuarios
router.get("/", async (req, res) => {
  try {
    const [usuarios] = await db.execute("SELECT * FROM usuario")
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
    const [usuario] = await db.execute("SELECT * FROM usuario WHERE Id_Usuario = ?", [id])

    if (usuario.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No se encontró usuario con ID ${id}`,
      })
    }

    res.json({
      success: true,
      data: usuario[0],
    })
  } catch (error) {
    console.error(`Error al obtener usuario con ID ${req.params.id}:`, error)
    res.status(500).json({
      success: false,
      message: `Error al obtener usuario con ID ${req.params.id}`,
      error: error.message,
    })
  }
})

// Crear un nuevo usuario
router.post("/", async (req, res) => {
  try {
    const nuevoUsuario = req.body
    const [result] = await db.execute("INSERT INTO usuario SET ?", [nuevoUsuario])

    res.status(201).json({
      success: true,
      message: "Usuario creado correctamente",
      data: {
        id: result.insertId,
        ...nuevoUsuario,
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
    const usuarioActualizado = req.body

    const [result] = await db.execute("UPDATE usuario SET ? WHERE Id_Usuario = ?", [usuarioActualizado, id])

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: `No se encontró usuario con ID ${id}`,
      })
    }

    res.json({
      success: true,
      message: `Usuario con ID ${id} actualizado correctamente`,
      data: {
        id,
        ...usuarioActualizado,
      },
    })
  } catch (error) {
    console.error(`Error al actualizar usuario con ID ${req.params.id}:`, error)
    res.status(500).json({
      success: false,
      message: `Error al actualizar usuario con ID ${req.params.id}`,
      error: error.message,
    })
  }
})

// Eliminar un usuario
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params

    const [result] = await db.execute("DELETE FROM usuario WHERE Id_Usuario = ?", [id])

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: `No se encontró usuario con ID ${id}`,
      })
    }

    res.json({
      success: true,
      message: `Usuario con ID ${id} eliminado correctamente`,
    })
  } catch (error) {
    console.error(`Error al eliminar usuario con ID ${req.params.id}:`, error)
    res.status(500).json({
      success: false,
      message: `Error al eliminar usuario con ID ${req.params.id}`,
      error: error.message,
    })
  }
})

// Login de usuario
router.post("/login", async (req, res) => {
  try {
    console.log("Datos recibidos:", req.body)
    const { username, password, rol } = req.body

    const [usuarioEncontrado] = await db.execute(
      "SELECT * FROM usuario WHERE Usuario = ? AND Contraseña = ? AND Id_Rol = ?",
      [username, password, rol],
    )

    if (usuarioEncontrado.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Credenciales inválidas",
      })
    }

    // Determinar la ruta de redirección según el rol
    let redirect = ""
    switch (Number.parseInt(rol)) {
      case 1:
        redirect = "/inicio"
        break
      case 2:
        redirect = "/inicio"
        break
      case 3:
        redirect = "/inicio"
        break
      case 4:
        redirect = "/inicio"
        break
      default:
        redirect = "/inicio"
        break
    }

    res.json({
      success: true,
      message: "Inicio de sesión exitoso",
      username: usuarioEncontrado[0].Usuario,
      redirect: redirect,
      data: {
        usuario: usuarioEncontrado[0],
        token: "token_simulado", // Aquí iría el token JWT real
      },
    })
  } catch (error) {
    console.error("Error en el inicio de sesión:", error)
    res.status(500).json({
      success: false,
      message: "Error en el inicio de sesión",
      error: error.message,
    })
  }
})

// Registro de usuario
router.post("/register", async (req, res) => {
  try {
    const nuevoUsuario = req.body

    // Verificar si el usuario ya existe
    const [usuarioExistente] = await db.execute("SELECT * FROM usuario WHERE Usuario = ?", [nuevoUsuario.Usuario])

    if (usuarioExistente.length > 0) {
      return res.status(400).json({
        success: false,
        message: "El nombre de usuario ya está en uso",
      })
    }

    const [result] = await db.execute("INSERT INTO usuario SET ?", [nuevoUsuario])

    res.status(201).json({
      success: true,
      message: "Usuario registrado correctamente",
      data: {
        id: result.insertId,
        ...nuevoUsuario,
      },
    })
  } catch (error) {
    console.error("Error en el registro:", error)
    res.status(500).json({
      success: false,
      message: "Error en el registro",
      error: error.message,
    })
  }
})

module.exports = router
