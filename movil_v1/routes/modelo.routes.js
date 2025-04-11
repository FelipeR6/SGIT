const express = require("express")
const router = express.Router()
const db = require("../config/db")

// Obtener todos los modelos
router.get("/", async (req, res) => {
  try {
    const modelos = await db.query("SELECT * FROM modelo")
    res.json({
      success: true,
      data: modelos,
    })
  } catch (error) {
    console.error("Error al obtener modelos:", error)
    res.status(500).json({
      success: false,
      message: "Error al obtener modelos",
      error: error.message,
    })
  }
})

// Obtener un modelo por ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const modelo = await db.query("SELECT * FROM modelo WHERE Id_Modelo = ?", [id])

    if (modelo.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Modelo no encontrado",
      })
    }

    res.json({
      success: true,
      data: modelo[0],
    })
  } catch (error) {
    console.error("Error al obtener modelo:", error)
    res.status(500).json({
      success: false,
      message: "Error al obtener modelo",
      error: error.message,
    })
  }
})

// Crear un nuevo modelo
router.post("/", async (req, res) => {
  try {
    const { Caracteristicas_Modelo, Accesorios_Modelo } = req.body

    if (!Caracteristicas_Modelo || !Accesorios_Modelo) {
      return res.status(400).json({
        success: false,
        message: "Todos los campos son requeridos",
      })
    }

    const result = await db.query("INSERT INTO modelo (Caracteristicas_Modelo, Accesorios_Modelo) VALUES (?, ?)", [
      Caracteristicas_Modelo,
      Accesorios_Modelo,
    ])

    res.status(201).json({
      success: true,
      message: "Modelo creado correctamente",
      data: {
        Id_Modelo: result.insertId,
        Caracteristicas_Modelo,
        Accesorios_Modelo,
      },
    })
  } catch (error) {
    console.error("Error al crear modelo:", error)
    res.status(500).json({
      success: false,
      message: "Error al crear modelo",
      error: error.message,
    })
  }
})

// Actualizar un modelo
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const { Caracteristicas_Modelo, Accesorios_Modelo } = req.body

    if (!Caracteristicas_Modelo || !Accesorios_Modelo) {
      return res.status(400).json({
        success: false,
        message: "Todos los campos son requeridos",
      })
    }

    const result = await db.query(
      "UPDATE modelo SET Caracteristicas_Modelo = ?, Accesorios_Modelo = ? WHERE Id_Modelo = ?",
      [Caracteristicas_Modelo, Accesorios_Modelo, id],
    )

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Modelo no encontrado",
      })
    }

    res.json({
      success: true,
      message: "Modelo actualizado correctamente",
      data: {
        Id_Modelo: id,
        Caracteristicas_Modelo,
        Accesorios_Modelo,
      },
    })
  } catch (error) {
    console.error("Error al actualizar modelo:", error)
    res.status(500).json({
      success: false,
      message: "Error al actualizar modelo",
      error: error.message,
    })
  }
})

// Eliminar un modelo
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params

    // Verificar si hay equipos asociados a este modelo
    const equiposAsociados = await db.query("SELECT COUNT(*) as count FROM equipo WHERE Id_Modelo = ?", [id])

    if (equiposAsociados[0].count > 0) {
      return res.status(400).json({
        success: false,
        message: "No se puede eliminar el modelo porque tiene equipos asociados",
      })
    }

    const result = await db.query("DELETE FROM modelo WHERE Id_Modelo = ?", [id])

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Modelo no encontrado",
      })
    }

    res.json({
      success: true,
      message: "Modelo eliminado correctamente",
    })
  } catch (error) {
    console.error("Error al eliminar modelo:", error)
    res.status(500).json({
      success: false,
      message: "Error al eliminar modelo",
      error: error.message,
    })
  }
})

module.exports = router
