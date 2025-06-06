const express = require('express');
const router = express.Router();
const db = require('../database/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // ← si luego quieres usar hashing
const verifyToken = require('../middleware/authMiddleware');

const SECRET_KEY = 'SgIt.2.0.2.5.McA'; // 🔒 Usa una clave segura en producción

// === LOGIN ===
router.post('/login', async (req, res) => {
  const { usuario, password, rol } = req.body;

  if (!usuario || !password || !rol) {
    return res.status(400).json({ success: false, message: 'Faltan datos' });
  }

  try {
    const [rows] = await db.execute(
      'SELECT * FROM usuario WHERE Usuario = ? AND Id_rol = ? LIMIT 1',
      [usuario, rol]
    );

    if (rows.length === 0) {
      return res.json({ success: false, message: 'Usuario no encontrado' });
    }

    const user = rows[0];
    const passwordCorrecta = password === user.Contraseña; 
    // ✅ Mejora futura: usar bcrypt.compare(password, user.Contraseña)

    if (!passwordCorrecta) {
      return res.json({ success: false, message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { id: user.Id_usuario, rol: user.Id_rol },
      SECRET_KEY,
      { expiresIn: '2h' }
    );

    // Redirección según el rol
    let redirect = '';
    switch (parseInt(rol)) {
      case 1: redirect = '/inicio'; break;
      case 2: redirect = '/gestor_inventario/dashboard_gestor'; break;
      case 3: redirect = '/profesor/dashboard_profesor'; break;
      case 4: redirect = '/mantenimiento1/dashboard_mantenimiento'; break;
      default: redirect = '/';
    }

    res.json({
      success: true,
      token,
      usuario: user.Usuario,
      redirect
    });

  } catch (err) {
    console.error('Error en /login:', err);
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
});

// === PERFIL ===
router.get('/perfil', verifyToken, async (req, res) => {
  try {
    const [rows] = await db.execute(
      'SELECT Id_usuario, Usuario, Correo, Id_rol FROM usuario WHERE Id_usuario = ?',
      [req.user.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error('Error en /perfil:', err);
    res.status(500).json({ message: 'Error al obtener perfil' });
  }
});

module.exports = router;
