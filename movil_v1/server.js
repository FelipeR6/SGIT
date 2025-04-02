const express = require("express")
const app = express()
const http = require("http")
const server = http.createServer(app)
const logger = require("morgan")
const cors = require("cors")

// Importar rutas - Asegúrate de que el nombre del archivo sea correcto
const equipoRoutes = require("./routes/equipo.routes") // Cambiado de equipos.routes a equipo.routes
const categoriaRoutes = require("./routes/categoria.routes")
const mantenimientoRoutes = require("./routes/mantenimiento.routes")
const prestamo_equipoRoutes = require("./routes/prestamo_equipo.routes")
const usuarioRoutes = require("./routes/usuario.routes")
// Agregar esta línea después de las importaciones de rutas existentes
const ubicacionRoutes = require("./routes/ubicacion.routes")

const port = process.env.PORT || 3000
app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.disable("x-powered-by")

app.set("port", port)

// Usar rutas
app.use("/api/equipo", equipoRoutes) // Asegúrate de que esta línea esté correcta
app.use("/api/categoria", categoriaRoutes)
app.use("/api/mantenimiento", mantenimientoRoutes)
app.use("/api/prestamo_equipo", prestamo_equipoRoutes)
app.use("/api/usuario", usuarioRoutes)
// Agregar esta línea después de las líneas app.use existentes
app.use("/api/ubicacion", ubicacionRoutes)

// Ruta raíz para verificar que el servidor está funcionando
app.get("/", (req, res) => {
  res.send("API del Sistema de Gestión de Equipos Tecnológicos")
})

// Agregar rutas de prueba para diagnóstico
app.get("/api/test", (req, res) => {
  res.json({ message: "La API está funcionando correctamente" })
})

app.get("/api/equipo/test", (req, res) => {
  res.json({ message: "La ruta /api/equipo está configurada correctamente" })
})

// Direccion ip V4 de la maquina, consultar con ipconfig
server.listen(port, "0.0.0.0", () => {
  console.log("Aplicación de NodeJS " + process.pid + " iniciada en el puerto " + port)

  // Mostrar las direcciones IP disponibles para conectarse
  const { networkInterfaces } = require("os")
  const nets = networkInterfaces()
  console.log("Direcciones IP disponibles:")
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      // Mostrar solo direcciones IPv4
      if (net.family === "IPv4" && !net.internal) {
        console.log(`- ${name}: ${net.address}`)
      }
    }
  }
  console.log(`También puedes acceder usando localhost: http://localhost:${port}`)
  console.log(`O usando la IP local: http://127.0.0.1:${port}`)
})

// Agregar un manejador para rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Ruta no encontrada: ${req.method} ${req.originalUrl}`,
  })
})

// Error handler
app.use((err, req, res, next) => {
  console.log(err)
  res.status(err.status || 500).send(err.stack)
})

