const express = require("express")
const app = express()
const http = require("http")
const server = http.createServer(app)
const logger = require("morgan")
const cors = require("cors")

// Importar rutas
const equipoRoutes = require("./routes/equipo.routes")
const categoriaRoutes = require("./routes/categoria.routes")
const mantenimientoRoutes = require("./routes/mantenimiento.routes")
const prestamo_equipoRoutes = require("./routes/prestamo_equipo.routes")
const usuarioRoutes = require("./routes/usuario.routes")
const ubicacionRoutes = require("./routes/ubicacion.routes")
const modeloRoutes = require("./routes/modelo.routes")

const port = process.env.PORT || 3000
app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.disable("x-powered-by")

app.set("port", port)

// Usar rutas
app.use("/api/equipo", equipoRoutes)
app.use("/api/categoria", categoriaRoutes)
app.use("/api/mantenimiento", mantenimientoRoutes)
app.use("/api/prestamo_equipo", prestamo_equipoRoutes)
app.use("/api/usuario", usuarioRoutes)
app.use("/api/ubicacion", ubicacionRoutes)
app.use("/api/modelo", modeloRoutes)

// Ruta raíz para verificar que el servidor está funcionando
app.get("/", (req, res) => {
  res.send("API del Sistema de Gestión de Equipos Tecnológicos")
})

// Agregar rutas de prueba para diagnóstico
app.get("/api/test", (req, res) => {
  res.json({ message: "La API está funcionando correctamente" })
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
