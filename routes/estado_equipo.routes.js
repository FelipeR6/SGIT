const express = require("express")
const router = express.Router()
const db = require("../database/db")

// Obtener todos los estados de equipo
router.get("/", async (req, res) => {
  try {
    const [estados] = await db.execute(`
      SELECT ee.*, e.Marca_Equipo
      FROM estado_equipo ee
      LEFT JOIN equipo e ON ee.Id_Equipos = e.Id_Equipos
    `)

    res.json({
      success: true,
      data: estados,
    })
  } catch (error) {
    console.error("Error al obtener estados de equipo:", error)
    res.status(500).json({
      success: false,
      message: "Error al obtener estados de equipo",
      error: error.message,
    })
  }
})

// Obtener un estado de equipo por ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params

    const [estado] = await db.execute(
      `
      SELECT ee.*, e.Marca_Equipo
      FROM estado_equipo ee
      LEFT JOIN equipo e ON ee.Id_Equipos = e.Id_Equipos
      WHERE ee.Id_Estado_equipo = ?
    `,
      [id],
    )

    if (estado.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No se encontró estado de equipo con ID ${id}`,
      })
    }

    res.json({
      success: true,
      data: estado[0],
    })
  } catch (error) {
    console.error(`Error al obtener estado de equipo con ID ${req.params.id}:`, error)
    res.status(500).json({
      success: false,
      message: `Error al obtener estado de equipo con ID ${req.params.id}`,
      error: error.message,
    })
  }
})

// Crear un nuevo estado de equipo
router.post("/", async (req, res) => {
  try {
    const nuevoEstado = req.body
    const [result] = await db.execute("INSERT INTO estado_equipo SET ?", [nuevoEstado])

    res.status(201).json({
      success: true,
      message: "Estado de equipo creado correctamente",
      data: {
        id: result.insertId,
        ...nuevoEstado,
      },
    })
  } catch (error) {
    console.error("Error al crear estado de equipo:", error)
    res.status(500).json({
      success: false,
      message: "Error al crear estado de equipo",
      error: error.message,
    })
  }
})

// Actualizar un estado de equipo
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const estadoActualizado = req.body

    const [result] = await db.execute("UPDATE estado_equipo SET ? WHERE Id_Estado_equipo = ?", [estadoActualizado, id])

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: `No se encontró estado de equipo con ID ${id}`,
      })
    }

    res.json({
      success: true,
      message: `Estado de equipo con ID ${id} actualizado correctamente`,
      data: {
        id,
        ...estadoActualizado,
      },
    })
  } catch (error) {
    console.error(`Error al actualizar estado de equipo con ID ${req.params.id}:`, error)
    res.status(500).json({
      success: false,
      message: `Error al actualizar estado de equipo con ID ${req.params.id}`,
      error: error.message,
    })
  }
})

// Eliminar un estado de equipo
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params

    const [result] = await db.execute("DELETE FROM estado_equipo WHERE Id_Estado_equipo = ?", [id])

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: `No se encontró estado de equipo con ID ${id}`,
      })
    }

    res.json({
      success: true,
      message: `Estado de equipo con ID ${id} eliminado correctamente`,
    })
  } catch (error) {
    console.error(`Error al eliminar estado de equipo con ID ${req.params.id}:`, error)
    res.status(500).json({
      success: false,
      message: `Error al eliminar estado de equipo con ID ${req.params.id}`,
      error: error.message,
    })
  }
})

module.exports = router
