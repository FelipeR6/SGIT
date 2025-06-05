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
        message: `No se encontró categoría con ID ${id}`,
      })
    }

    res.json({
      success: true,
      data: categoria[0],
    })
  } catch (error) {
    console.error(`Error al obtener categoría con ID ${req.params.id}:`, error)
    res.status(500).json({
      success: false,
      message: `Error al obtener categoría con ID ${req.params.id}`,
      error: error.message,
    })
  }
})

// Crear una nueva categoría
router.post("/", async (req, res) => {
  try {
    const nuevaCategoria = req.body
    const result = await db.query("INSERT INTO categoria SET ?", [nuevaCategoria])

    res.status(201).json({
      success: true,
      message: "Categoría creada correctamente",
      data: {
        id: result.insertId,
        ...nuevaCategoria,
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
    const categoriaActualizada = req.body

    const result = await db.query("UPDATE categoria SET ? WHERE Id_Categoria = ?", [categoriaActualizada, id])

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: `No se encontró categoría con ID ${id}`,
      })
    }

    res.json({
      success: true,
      message: `Categoría con ID ${id} actualizada correctamente`,
      data: {
        id,
        ...categoriaActualizada,
      },
    })
  } catch (error) {
    console.error(`Error al actualizar categoría con ID ${req.params.id}:`, error)
    res.status(500).json({
      success: false,
      message: `Error al actualizar categoría con ID ${req.params.id}`,
      error: error.message,
    })
  }
})

// Eliminar una categoría
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params

    const result = await db.query("DELETE FROM categoria WHERE Id_Categoria = ?", [id])

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: `No se encontró categoría con ID ${id}`,
      })
    }

    res.json({
      success: true,
      message: `Categoría con ID ${id} eliminada correctamente`,
    })
  } catch (error) {
    console.error(`Error al eliminar categoría con ID ${req.params.id}:`, error)
    res.status(500).json({
      success: false,
      message: `Error al eliminar categoría con ID ${req.params.id}`,
      error: error.message,
    })
  }
})

module.exports = router
