const express = require('express')
const router = express.Router()
const db = require('../config/db')
const verificarToken = require('../middleware/verificarToken')

// Obtener perfil del usuario autenticado
router.get('/', verificarToken, (req, res) => {
  const id = req.usuario.id_usuario

  const query = `
    SELECT 
      id_usuario, nombre, email, telefono, cargo, departamento, fecha_ingreso
    FROM usuario
    WHERE id_usuario = ?
  `
  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ mensaje: 'Error del servidor', error: err })
    if (results.length === 0) return res.status(404).json({ mensaje: 'Usuario no encontrado' })

    res.json(results[0])
  })
})

// Actualizar perfil del usuario autenticado
router.put('/', verificarToken, (req, res) => {
  const id = req.usuario.id_usuario
  const { nombre, email, telefono } = req.body

  if (!nombre || !email) {
    return res.status(400).json({ mensaje: 'Nombre y correo son obligatorios' })
  }

  const query = `
    UPDATE usuario
    SET nombre = ?, email = ?, telefono = ?
    WHERE id_usuario = ?
  `
  db.query(query, [nombre, email, telefono || null, id], (err, result) => {
    if (err) return res.status(500).json({ mensaje: 'Error al actualizar', error: err })

    res.json({ mensaje: 'Perfil actualizado correctamente' })
  })
})

module.exports = router
