const mysql = require("mysql")
const util = require("util")

// Configuración de la conexión a la base de datos
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "sgit",
})

// Promisify para usar async/await con mysql
pool.query = util.promisify(pool.query)

module.exports = pool
