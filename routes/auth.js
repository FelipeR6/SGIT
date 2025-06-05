const express = require('express');
const router = express.Router();
const db = require('../database/db');

router.post('/login', async (req, res) => {
    const { usuario, password, rol } = req.body;
  
    // ✅ Log para depuración
    console.log('📦 Datos recibidos en backend:', { usuario, password, rol });
  
    if (!usuario || !password || !rol) {
      return res.status(400).json({ success: false, message: 'Faltan datos en la solicitud' });
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
      const passwordCorrecta = user.Contraseña === password;
  
      if (!passwordCorrecta) {
        return res.json({ success: false, message: 'Contraseña incorrecta' });
      }
  
      let redirect = '';
      switch (parseInt(rol)) {
        case 1: redirect = '/inicio'; break;
        case 2: redirect = '/gestor_inventario/dashboard_gestor'; break;
        case 3: redirect = '/profesor/dashboard_profesor'; break;
        case 4: redirect = '/mantenimiento1/dashboard_mantenimiento'; break;
        default: redirect = '/';
      }
  
      return res.json({ success: true, usuario: user.usuario, redirect });

  
    } catch (err) {
      console.error('Error en /login:', err);
      res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
  });
  

module.exports = router;

