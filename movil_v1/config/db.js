const mysql = require("mysql")
const { promisify } = require("util")

// Configuración de la conexión a MySQL
const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "sgit", // Asegúrate de que el nombre de la base de datos sea "sgit"
  connectionLimit: 10,
}

// Agrega un log para verificar que las variables de entorno se están cargando
console.log("Configuración de la base de datos:", {
  host: dbConfig.host,
  user: dbConfig.user,
  database: dbConfig.database,
  // No mostrar la contraseña por seguridad
  passwordProvided: dbConfig.password ? "Sí" : "No",
})

// Crear un pool de conexiones para mejor rendimiento
const pool = mysql.createPool(dbConfig)

// Promisificar las consultas para usar async/await
pool.query = promisify(pool.query)

// Verificar la conexión
pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("La conexión a la base de datos fue cerrada")
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("La base de datos tiene demasiadas conexiones")
    }
    if (err.code === "ECONNREFUSED") {
      console.error("La conexión a la base de datos fue rechazada")
    }
    console.error("Error de conexión a la base de datos:", err)
  }

  if (connection) {
    connection.release()
    console.log("Base de datos conectada correctamente")
  }
})

module.exports = pool
