const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'sgit'
});

// Prueba de conexión
db.getConnection()
  .then(() => console.log('✅ Conectado a la base de datos SGIT'))
  .catch(err => console.error('❌ Error de conexión:', err.message));

module.exports = db;
