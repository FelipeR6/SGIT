const express = require("express")
const router = express.Router()
const db = require("../config/db")

// Obtener todos los equipos con información relacionada
router.get("/", async (req, res) => {
  try {
    const query = `
      SELECT e.*, c.Nombre_Categoria, m.Caracteristicas_Modelo, m.Accesorios_Modelo, 
             u.Nombre_Usuario_1, u.Apellidos_Usuario_1, ee.Estado_Entregado, ee.Estado_Recibido
      FROM equipo e
      LEFT JOIN categoria c ON e.Id_Categoria = c.Id_Categoria
      LEFT JOIN modelo m ON e.Id_Modelo = m.Id_Modelo
      LEFT JOIN usuario u ON e.Id_Usuario = u.Id_Usuario
      LEFT JOIN estado_equipo ee ON e.Id_Equipos = ee.Id_Equipos
    `

    const equipos = await db.query(query)

    res.json({
      success: true,
      data: equipos,
    })
  } catch (error) {
    console.error("Error al obtener equipos:", error)
    res.status(500).json({
      success: false,
      message: "Error al obtener equipos",
      error: error.message,
    })
  }
})

// Obtener un equipo por ID con información relacionada
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params

    const query = `
      SELECT e.*, c.Nombre_Categoria, m.Caracteristicas_Modelo, m.Accesorios_Modelo, 
             u.Nombre_Usuario_1, u.Apellidos_Usuario_1, ee.Estado_Entregado, ee.Estado_Recibido
      FROM equipo e
      LEFT JOIN categoria c ON e.Id_Categoria = c.Id_Categoria
      LEFT JOIN modelo m ON e.Id_Modelo = m.Id_Modelo
      LEFT JOIN usuario u ON e.Id_Usuario = u.Id_Usuario
      LEFT JOIN estado_equipo ee ON e.Id_Equipos = ee.Id_Equipos
      WHERE e.Id_Equipos = ?
    `

    const equipo = await db.query(query, [id])

    if (equipo.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Equipo no encontrado",
      })
    }

    // Obtener mantenimientos del equipo
    const mantenimientos = await db.query(`SELECT * FROM mantenimiento WHERE Id_Equipos = ?`, [id])

    // Obtener préstamos del equipo
    const prestamos = await db.query(
      `SELECT pe.*, u.Nombre_Usuario_1, u.Apellidos_Usuario_1, ub.Nombre_Ubicacion
       FROM prestamo_equipo pe
       JOIN usuario u ON pe.Id_Usuario = u.Id_Usuario
       JOIN ubicacion ub ON pe.Id_Ubicacion = ub.Id_Ubicacion
       WHERE pe.Id_Equipos = ?`,
      [id],
    )

    // Obtener hoja de vida del equipo
    const hojaVida = await db.query(`SELECT * FROM hoja_vida_equipo WHERE Id_Equipos = ?`, [id])

    res.json({
      success: true,
      data: {
        ...equipo[0],
        mantenimientos,
        prestamos,
        hojaVida,
      },
    })
  } catch (error) {
    console.error("Error al obtener equipo:", error)
    res.status(500).json({
      success: false,
      message: "Error al obtener equipo",
      error: error.message,
    })
  }
})

// Crear un nuevo equipo
router.post("/", async (req, res) => {
  try {
    const { Marca_Equipo, Año_Equipo, Id_Categoria, Id_Modelo, Id_Usuario } = req.body

    // Validar datos
    if (!Marca_Equipo || !Año_Equipo || !Id_Categoria || !Id_Modelo || !Id_Usuario) {
      return res.status(400).json({
        success: false,
        message: "Todos los campos son requeridos",
      })
    }

    // Insertar equipo
    const result = await db.query(
      "INSERT INTO equipo (Marca_Equipo, Año_Equipo, Id_Categoria, Id_Modelo, Id_Usuario) VALUES (?, ?, ?, ?, ?)",
      [Marca_Equipo, Año_Equipo, Id_Categoria, Id_Modelo, Id_Usuario],
    )

    // Si se proporciona información de estado, insertarla
    if (req.body.Estado_Entregado && req.body.Estado_Recibido) {
      await db.query("INSERT INTO estado_equipo (Estado_Entregado, Estado_Recibido, Id_Equipos) VALUES (?, ?, ?)", [
        req.body.Estado_Entregado,
        req.body.Estado_Recibido,
        result.insertId,
      ])
    }

    res.status(201).json({
      success: true,
      message: "Equipo creado correctamente",
      data: {
        Id_Equipos: result.insertId,
        ...req.body,
      },
    })
  } catch (error) {
    console.error("Error al crear equipo:", error)
    res.status(500).json({
      success: false,
      message: "Error al crear equipo",
      error: error.message,
    })
  }
})

// Actualizar un equipo
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const { Marca_Equipo, Año_Equipo, Id_Categoria, Id_Modelo, Id_Usuario, Estado_Entregado, Estado_Recibido } =
      req.body

    // Actualizar equipo
    const result = await db.query(
      "UPDATE equipo SET Marca_Equipo = ?, Año_Equipo = ?, Id_Categoria = ?, Id_Modelo = ?, Id_Usuario = ? WHERE Id_Equipos = ?",
      [Marca_Equipo, Año_Equipo, Id_Categoria, Id_Modelo, Id_Usuario, id],
    )

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Equipo no encontrado",
      })
    }

    // Si se proporciona información de estado, actualizarla
    if (Estado_Entregado && Estado_Recibido) {
      // Verificar si ya existe un estado para este equipo
      const estadoExistente = await db.query("SELECT * FROM estado_equipo WHERE Id_Equipos = ?", [id])

      if (estadoExistente.length > 0) {
        // Actualizar estado existente
        await db.query("UPDATE estado_equipo SET Estado_Entregado = ?, Estado_Recibido = ? WHERE Id_Equipos = ?", [
          Estado_Entregado,
          Estado_Recibido,
          id,
        ])
      } else {
        // Crear nuevo estado
        await db.query("INSERT INTO estado_equipo (Estado_Entregado, Estado_Recibido, Id_Equipos) VALUES (?, ?, ?)", [
          Estado_Entregado,
          Estado_Recibido,
          id,
        ])
      }
    }

    res.json({
      success: true,
      message: "Equipo actualizado correctamente",
      data: {
        Id_Equipos: id,
        ...req.body,
      },
    })
  } catch (error) {
    console.error("Error al actualizar equipo:", error)
    res.status(500).json({
      success: false,
      message: "Error al actualizar equipo",
      error: error.message,
    })
  }
})

// Eliminar un equipo
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params

    // Primero eliminar registros relacionados para evitar errores de clave foránea
    await db.query("DELETE FROM estado_equipo WHERE Id_Equipos = ?", [id])
    await db.query("DELETE FROM hoja_vida_equipo WHERE Id_Equipos = ?", [id])
    await db.query("DELETE FROM mantenimiento WHERE Id_Equipos = ?", [id])
    await db.query("DELETE FROM prestamo_equipo WHERE Id_Equipos = ?", [id])

    // Finalmente eliminar el equipo
    const result = await db.query("DELETE FROM equipo WHERE Id_Equipos = ?", [id])

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Equipo no encontrado",
      })
    }

    res.json({
      success: true,
      message: "Equipo eliminado correctamente",
    })
  } catch (error) {
    console.error("Error al eliminar equipo:", error)
    res.status(500).json({
      success: false,
      message: "Error al eliminar equipo",
      error: error.message,
    })
  }
})

module.exports = router

