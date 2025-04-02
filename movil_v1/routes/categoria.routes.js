const express = require("express")
const router = express.Router()
const db = require("../config/db")

// Obtener todas las categorías
router.get("/", async (req, res) => {
  try {
    const categorias = await db.query("SELECT * FROM categoria")
    res.json({
      success: true,
      data: categorias,
    })
  } catch (error) {
    console.error("Error al obtener categorías:", error)
    res.status(500).json({
      success: false,
      message: "Error al obtener categorías",
      error: error.message,
    })
  }
})

// Obtener una categoría por ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const categoria = await db.query("SELECT * FROM categoria WHERE Id_Categoria = ?", [id])

    if (categoria.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Categoría no encontrada",
      })
    }

    res.json({
      success: true,
      data: categoria[0],
    })
  } catch (error) {
    console.error("Error al obtener categoría:", error)
    res.status(500).json({
      success: false,
      message: "Error al obtener categoría",
      error: error.message,
    })
  }
})

// Crear una nueva categoría
router.post("/", async (req, res) => {
  try {
    const { Nombre_Categoria } = req.body

    if (!Nombre_Categoria) {
      return res.status(400).json({
        success: false,
        message: "El nombre de la categoría es requerido",
      })
    }

    const result = await db.query("INSERT INTO categoria (Nombre_Categoria) VALUES (?)", [Nombre_Categoria])

    res.status(201).json({
      success: true,
      message: "Categoría creada correctamente",
      data: {
        Id_Categoria: result.insertId,
        Nombre_Categoria,
      },
    })
  } catch (error) {
    console.error("Error al crear categoría:", error)
    res.status(500).json({
      success: false,
      message: "Error al crear categoría",
      error: error.message,
    })
  }
})

// Actualizar una categoría
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const { Nombre_Categoria } = req.body

    if (!Nombre_Categoria) {
      return res.status(400).json({
        success: false,
        message: "El nombre de la categoría es requerido",
      })
    }

    const result = await db.query("UPDATE categoria SET Nombre_Categoria = ? WHERE Id_Categoria = ?", [
      Nombre_Categoria,
      id,
    ])

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Categoría no encontrada",
      })
    }

    res.json({
      success: true,
      message: "Categoría actualizada correctamente",
      data: {
        Id_Categoria: id,
        Nombre_Categoria,
      },
    })
  } catch (error) {
    console.error("Error al actualizar categoría:", error)
    res.status(500).json({
      success: false,
      message: "Error al actualizar categoría",
      error: error.message,
    })
  }
})

// Eliminar una categoría
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params

    // Verificar si hay equipos asociados a esta categoría
    const equiposAsociados = await db.query("SELECT COUNT(*) as count FROM equipo WHERE Id_Categoria = ?", [id])

    if (equiposAsociados[0].count > 0) {
      return res.status(400).json({
        success: false,
        message: "No se puede eliminar la categoría porque tiene equipos asociados",
      })
    }

    const result = await db.query("DELETE FROM categoria WHERE Id_Categoria = ?", [id])

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Categoría no encontrada",
      })
    }

    res.json({
      success: true,
      message: "Categoría eliminada correctamente",
    })
  } catch (error) {
    console.error("Error al eliminar categoría:", error)
    res.status(500).json({
      success: false,
      message: "Error al eliminar categoría",
      error: error.message,
    })
  }
})

module.exports = router

