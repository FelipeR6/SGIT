import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"

// Configuración base de axios
// Usa la IP de tu máquina en la red local o localhost para desarrollo
//const API_URL = "http://10.0.2.2:3000/api" // Para emulador Android (apunta a localhost de la máquina host)
//const API_URL = 'http://localhost:3000/api'; // Para desarrollo local
// Actualizar la configuración de la API para usar la base de datos correcta

const SERVER_IP = "192.168.1.5" // Cambia esto a la IP de tu servidor MySQL
const SERVER_PORT = "3000"
const API_URL = `http://${SERVER_IP}:${SERVER_PORT}/api`

console.log("Conectando a la API en:", API_URL)

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // Timeout de 10 segundos
})

// Interceptor para manejar errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error)

    // Si el error es de timeout
    if (error.code === "ECONNABORTED") {
      return Promise.reject({
        message: "La solicitud ha excedido el tiempo de espera. Verifica tu conexión a internet.",
      })
    }

    // Si el error tiene una respuesta del servidor
    if (error.response) {
      return Promise.reject({
        status: error.response.status,
        message: error.response.data?.message || "Error en la solicitud",
        data: error.response.data,
      })
    }

    // Si el error es de red (sin respuesta del servidor)
    if (error.request) {
      return Promise.reject({
        message: "No se pudo conectar con el servidor. Verifica tu conexión a internet o la dirección del servidor.",
      })
    }

    // Otros errores
    return Promise.reject({
      message: error.message || "Error desconocido",
    })
  },
)

// Servicios para equipos
export const equiposService = {
  // Obtener todos los equipos
  getAll: async () => {
    try {
      try {
        const response = await api.get("/equipo")
        return response.data
      } catch (error) {
        console.warn("Error al obtener equipos de la API, usando datos locales:", error)
        return {
          success: true,
          data: equiposLocalData,
        }
      }
    } catch (error) {
      console.error("Error al obtener equipos:", error)
      throw error
    }
  },

  // Obtener un equipo por ID
  getById: async (id: string) => {
    try {
      try {
        const response = await api.get(`/equipo/${id}`)
        return response.data
      } catch (error) {
        console.warn(`Error al obtener equipo con ID ${id} de la API, usando datos locales:`, error)

        const equipo = equiposLocalData.find((e) => e.Id_Equipos === id)

        if (equipo) {
          return {
            success: true,
            data: equipo,
          }
        } else {
          return {
            success: false,
            message: "Equipo no encontrado en datos locales",
          }
        }
      }
    } catch (error) {
      console.error(`Error al obtener equipo con ID ${id}:`, error)
      throw error
    }
  },

  // Crear un nuevo equipo
  create: async (equipoData: any) => {
    try {
      const response = await api.post("/equipo", equipoData)
      return response.data
    } catch (error) {
      console.error("Error al crear equipo:", error)
      throw error
    }
  },

  // Actualizar un equipo
  update: async (id: string, equipoData: any) => {
    try {
      const response = await api.put(`/equipo/${id}`, equipoData)
      return response.data
    } catch (error) {
      console.error(`Error al actualizar equipo con ID ${id}:`, error)
      throw error
    }
  },

  // Eliminar un equipo
  delete: async (id: string) => {
    try {
      const response = await api.delete(`/equipo/${id}`)
      return response.data
    } catch (error) {
      console.error(`Error al eliminar equipo con ID ${id}:`, error)
      throw error
    }
  },
}

// Datos locales de respaldo para equipos
const equiposLocalData = [
  {
    Id_Equipos: "1",
    Marca_Equipo: "Dell",
    Año_Equipo: 2022,
    Id_Categoria: "1",
    Id_Modelo: "1",
    Id_Usuario: "1",
    Nombre_Categoria: "Computadoras",
    Caracteristicas_Modelo: "Procesador: Intel Core i7-10700 Memoria RAM: 16 GB",
    Accesorios_Modelo: "Teclado y ratón Dell",
    Nombre_Usuario_1: "Juan",
    Apellidos_Usuario_1: "Pérez",
    Estado_Entregado: "Óptimo funcionamiento",
    Estado_Recibido: "Óptimo funcionamiento",
    mantenimientos: [
      {
        Id_Mantenimiento: "1",
        Fecha_Inicio_mantenimiento: "2023-01-15",
        Fecha_fin_mantenimiento: "2023-01-20",
        Observaciones: "Limpieza general y actualización de software",
        Id_Equipos: "1",
        Id_Usuario: "2",
        Nombre_Usuario_1: "Carlos",
        Apellidos_Usuario_1: "Técnico",
      },
    ],
    prestamos: [
      {
        Id_Prestamo_Equipo: "1",
        Fecha_Prestamo_Equipo: "2023-02-10",
        Fecha_entrega_prestamo: "2023-02-20",
        Id_Usuario: "3",
        Id_Equipos: "1",
        Id_Ubicacion: "1",
        Id_Estado_Equipo: "1",
        Nombre_Usuario_1: "María",
        Apellidos_Usuario_1: "González",
        Nombre_Ubicacion: "Sala de Conferencias",
      },
    ],
  },
  {
    Id_Equipos: "2",
    Marca_Equipo: "HP",
    Año_Equipo: 2021,
    Id_Categoria: "1",
    Id_Modelo: "2",
    Id_Usuario: "2",
    Nombre_Categoria: "Computadoras",
    Caracteristicas_Modelo: "Procesador: Intel Core i5-9400 Memoria RAM: 8 GB",
    Accesorios_Modelo: "Teclado y ratón inalámbricos",
    Nombre_Usuario_1: "Carlos",
    Apellidos_Usuario_1: "Técnico",
    Estado_Entregado: "Óptimo funcionamiento",
    Estado_Recibido: "Bajo rendimiento",
    mantenimientos: [],
    prestamos: [],
  },
  {
    Id_Equipos: "3",
    Marca_Equipo: "Epson",
    Año_Equipo: 2020,
    Id_Categoria: "2",
    Id_Modelo: "4",
    Id_Usuario: "1",
    Nombre_Categoria: "Proyectores",
    Caracteristicas_Modelo: "Resolución: XGA (1024 x 768) Conectividad: HDMI, VGA",
    Accesorios_Modelo: "Control remoto, Cable HDMI",
    Nombre_Usuario_1: "Juan",
    Apellidos_Usuario_1: "Pérez",
    Estado_Entregado: "Óptimo funcionamiento",
    Estado_Recibido: "Óptimo funcionamiento",
    mantenimientos: [],
    prestamos: [],
  },
]

// Servicios para categorías
export const categoriasService = {
  getAll: async () => {
    try {
      try {
        const response = await api.get("/categoria")
        return response.data
      } catch (error) {
        console.warn("Error al obtener categorías de la API, usando datos locales:", error)
        return {
          success: true,
          data: categoriasLocalData,
        }
      }
    } catch (error) {
      console.error("Error al obtener categoría:", error)
      throw error
    }
  },

  getById: async (id: string) => {
    try {
      try {
        const response = await api.get(`/categoria/${id}`)
        return response.data
      } catch (error) {
        console.warn(`Error al obtener categoría con ID ${id} de la API, usando datos locales:`, error)

        const categoria = categoriasLocalData.find((c) => c.Id_Categoria === id)

        if (categoria) {
          return {
            success: true,
            data: categoria,
          }
        } else {
          return {
            success: false,
            message: "Categoría no encontrada en datos locales",
          }
        }
      }
    } catch (error) {
      console.error(`Error al obtener categoría con ID ${id}:`, error)
      throw error
    }
  },

  create: async (categoriaData: any) => {
    try {
      const response = await api.post("/categoria", categoriaData)
      return response.data
    } catch (error) {
      console.error("Error al crear categoría:", error)
      throw error
    }
  },

  update: async (id: string, categoriaData: any) => {
    try {
      const response = await api.put(`/categoria/${id}`, categoriaData)
      return response.data
    } catch (error) {
      console.error(`Error al actualizar categoría con ID ${id}:`, error)
      throw error
    }
  },

  delete: async (id: string) => {
    try {
      const response = await api.delete(`/categoria/${id}`)
      return response.data
    } catch (error) {
      console.error(`Error al eliminar categoría con ID ${id}:`, error)
      throw error
    }
  },
}

// Datos locales de respaldo para categorías
const categoriasLocalData = [
  {
    Id_Categoria: "1",
    Nombre_Categoria: "Computadoras",
  },
  {
    Id_Categoria: "2",
    Nombre_Categoria: "Proyectores",
  },
  {
    Id_Categoria: "3",
    Nombre_Categoria: "Tablets",
  },
  {
    Id_Categoria: "4",
    Nombre_Categoria: "Pantallas",
  },
  {
    Id_Categoria: "5",
    Nombre_Categoria: "Audio",
  },
]

// Servicios para modelos
export const modelosService = {
  getAll: async () => {
    try {
      // Intentar obtener los datos de la API
      try {
        const response = await api.get("/modelo")
        return response.data
      } catch (error) {
        console.warn("Error al obtener modelos de la API, usando datos locales:", error)

        // Si la API falla, devolver datos locales como fallback
        return {
          success: true,
          data: [
            {
              Id_Modelo: "1",
              Caracteristicas_Modelo: "Procesador: Intel Core i7-10700 Memoria RAM: 16 GB",
              Accesorios_Modelo: "Teclado y ratón Dell",
            },
            {
              Id_Modelo: "2",
              Caracteristicas_Modelo: "Procesador: Apple M1 Memoria RAM: 8 GB",
              Accesorios_Modelo: "Adaptador USB-C a USB",
            },
            {
              Id_Modelo: "3",
              Caracteristicas_Modelo: "Pantalla: 11 pulgadas Liquid Retina Procesador: A1",
              Accesorios_Modelo: "Apple Pencil (2da generación)",
            },
            {
              Id_Modelo: "4",
              Caracteristicas_Modelo: "Resolución: XGA (1024 x 768) Conectividad: HDMI, V",
              Accesorios_Modelo: "Control remoto Cable HDMI",
            },
            {
              Id_Modelo: "5",
              Caracteristicas_Modelo: "Tamaño: 65 pulgadas Resolución: 4K Ultra HD",
              Accesorios_Modelo: "Lápices interactivos Módulo de sonido integrado",
            },
            {
              Id_Modelo: "6",
              Caracteristicas_Modelo: "Potencia: 150 W Batería recargable: Hasta 11 horas",
              Accesorios_Modelo: "Bolsa de transporte Soporte de altavoz",
            },
            {
              Id_Modelo: "7",
              Caracteristicas_Modelo: "Sensor: CMOS de 1.0 pulgada Resolución: 4K UHD",
              Accesorios_Modelo: "Micrófono externo Batería adicional",
            },
            {
              Id_Modelo: "8",
              Caracteristicas_Modelo: "inalámbrico iluminado Conectividad: USB-C, Bluetoo",
              Accesorios_Modelo: "Reposamuñecas",
            },
            {
              Id_Modelo: "9",
              Caracteristicas_Modelo: "Sensor: Darkfield de alta precisión Conectividad: ",
              Accesorios_Modelo: "Cable de carga USB-C",
            },
            {
              Id_Modelo: "10",
              Caracteristicas_Modelo: "Puertos: HDMI 4K, USB 3.0, USB-C PD, SD/MicroSD Co",
              Accesorios_Modelo: "Bolsa de transporte",
            },
          ],
        }
      }
    } catch (error) {
      console.error("Error al obtener modelos:", error)
      throw error
    }
  },

  getById: async (id: string) => {
    try {
      try {
        const response = await api.get(`/modelo/${id}`)
        return response.data
      } catch (error) {
        console.warn(`Error al obtener modelo con ID ${id} de la API, usando datos locales:`, error)

        // Datos locales como fallback
        const modelos = [
          {
            Id_Modelo: "1",
            Caracteristicas_Modelo: "Procesador: Intel Core i7-10700 Memoria RAM: 16 GB",
            Accesorios_Modelo: "Teclado y ratón Dell",
          },
          {
            Id_Modelo: "2",
            Caracteristicas_Modelo: "Procesador: Apple M1 Memoria RAM: 8 GB",
            Accesorios_Modelo: "Adaptador USB-C a USB",
          },
          // ... otros modelos
        ]

        const modelo = modelos.find((m) => m.Id_Modelo === id)

        if (modelo) {
          return {
            success: true,
            data: modelo,
          }
        } else {
          return {
            success: false,
            message: "Modelo no encontrado",
          }
        }
      }
    } catch (error) {
      console.error(`Error al obtener modelo con ID ${id}:`, error)
      throw error
    }
  },
}

// Servicios para mantenimientos
export const mantenimientosService = {
  getAll: async () => {
    try {
      const response = await api.get("/mantenimiento")
      return response.data
    } catch (error) {
      console.error("Error al obtener mantenimientos:", error)
      throw error
    }
  },

  getById: async (id: string) => {
    try {
      const response = await api.get(`/mantenimiento/${id}`)
      return response.data
    } catch (error) {
      console.error(`Error al obtener mantenimiento con ID ${id}:`, error)
      throw error
    }
  },

  create: async (mantenimientoData: any) => {
    try {
      const response = await api.post("/mantenimiento", mantenimientoData)
      return response.data
    } catch (error) {
      console.error("Error al crear mantenimiento:", error)
      throw error
    }
  },

  update: async (id: string, mantenimientoData: any) => {
    try {
      const response = await api.put(`/mantenimiento/${id}`, mantenimientoData)
      return response.data
    } catch (error) {
      console.error(`Error al actualizar mantenimiento con ID ${id}:`, error)
      throw error
    }
  },

  delete: async (id: string) => {
    try {
      const response = await api.delete(`/mantenimiento/${id}`)
      return response.data
    } catch (error) {
      console.error(`Error al eliminar mantenimiento con ID ${id}:`, error)
      throw error
    }
  },
}

// Servicios para préstamos
export const prestamosService = {
  getAll: async () => {
    try {
      const response = await api.get("/prestamo_equipo")
      return response.data
    } catch (error) {
      console.error("Error al obtener préstamos:", error)
      throw error
    }
  },

  getById: async (id: string) => {
    try {
      const response = await api.get(`/prestamo_equipo/${id}`)
      return response.data
    } catch (error) {
      console.error(`Error al obtener préstamo con ID ${id}:`, error)
      throw error
    }
  },

  create: async (prestamoData: any) => {
    try {
      const response = await api.post("/prestamo_equipo", prestamoData)
      return response.data
    } catch (error) {
      console.error("Error al crear préstamo:", error)
      throw error
    }
  },

  update: async (id: string, prestamoData: any) => {
    try {
      const response = await api.put(`/prestamo_equipo/${id}`, prestamoData)
      return response.data
    } catch (error) {
      console.error(`Error al actualizar préstamo con ID ${id}:`, error)
      throw error
    }
  },

  delete: async (id: string) => {
    try {
      const response = await api.delete(`/prestamo_equipo/${id}`)
      return response.data
    } catch (error) {
      console.error(`Error al eliminar préstamo con ID ${id}:`, error)
      throw error
    }
  },
}

// Servicios para usuarios
export const usuariosService = {
  getAll: async () => {
    try {
      const response = await api.get("/usuario")
      return response.data
    } catch (error) {
      console.error("Error al obtener usuarios:", error)
      throw error
    }
  },

  getById: async (id: string) => {
    try {
      const response = await api.get(`/usuario/${id}`)
      return response.data
    } catch (error) {
      console.error(`Error al obtener usuario con ID ${id}:`, error)
      throw error
    }
  },

  create: async (usuarioData: any) => {
    try {
      const response = await api.post("/usuario", usuarioData)
      return response.data
    } catch (error) {
      console.error("Error al crear usuario:", error)
      throw error
    }
  },

  update: async (id: string, usuarioData: any) => {
    try {
      const response = await api.put(`/usuario/${id}`, usuarioData)
      return response.data
    } catch (error) {
      console.error(`Error al actualizar usuario con ID ${id}:`, error)
      throw error
    }
  },

  delete: async (id: string) => {
    try {
      const response = await api.delete(`/usuario/${id}`)
      return response.data
    } catch (error) {
      console.error(`Error al eliminar usuario con ID ${id}:`, error)
      throw error
    }
  },

  login: async (credentials: { Usuario: string; Contraseña: string }) => {
    try {
      console.log("Intentando iniciar sesión con:", credentials)
      const response = await api.post("/usuario/login", credentials)
      console.log("Respuesta del servidor:", response.data)
      return response.data
    } catch (error) {
      console.error("Error en el inicio de sesión:", error)
      throw error
    }
  },

  register: async (userData: any) => {
    try {
      console.log("Intentando registrar usuario:", userData)
      const response = await api.post("/usuario/register", userData)
      console.log("Respuesta del servidor:", response.data)
      return response.data
    } catch (error) {
      console.error("Error en el registro:", error)
      throw error
    }
  },

  logout: async () => {
    try {
      await AsyncStorage.removeItem("userData")
      await AsyncStorage.removeItem("token")
      return { success: true }
    } catch (error) {
      console.error("Error al cerrar sesión:", error)
      throw error
    }
  },
}

// Servicios para ubicaciones
export const ubicacionesService = {
  getAll: async () => {
    try {
      const response = await api.get("/ubicacion")
      return response.data
    } catch (error) {
      console.error("Error al obtener ubicaciones:", error)
      throw error
    }
  },

  getById: async (id: string) => {
    try {
      const response = await api.get(`/ubicacion/${id}`)
      return response.data
    } catch (error) {
      console.error(`Error al obtener ubicación con ID ${id}:`, error)
      throw error
    }
  },

  create: async (ubicacionData: any) => {
    try {
      const response = await api.post("/ubicacion", ubicacionData)
      return response.data
    } catch (error) {
      console.error("Error al crear ubicación:", error)
      throw error
    }
  },

  update: async (id: string, ubicacionData: any) => {
    try {
      const response = await api.put(`/ubicacion/${id}`, ubicacionData)
      return response.data
    } catch (error) {
      console.error(`Error al actualizar ubicación con ID ${id}:`, error)
      throw error
    }
  },

  delete: async (id: string) => {
    try {
      const response = await api.delete(`/ubicacion/${id}`)
      return response.data
    } catch (error) {
      console.error(`Error al eliminar ubicación con ID ${id}:`, error)
      throw error
    }
  },
}

export default api
