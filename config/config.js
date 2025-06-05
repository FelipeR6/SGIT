// Configuración para la API
const dotenv = require("dotenv")
const path = require("path")

// Cargar variables de entorno desde el archivo .env
dotenv.config({ path: path.resolve(__dirname, "../.env") })

module.exports = {
  port: process.env.PORT || 3000,
  dbConfig: {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "sgit",
  },
}
